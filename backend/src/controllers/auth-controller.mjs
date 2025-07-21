import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import { catchErrorAsync } from '../utilities/catchErrorAsync.mjs';
import AppError from '../models/blockchain/appError.mjs';
import UserRepository from '../repository/userRepository.mjs';

export const loginUser = catchErrorAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Email and/or password is missing'));
  }

  const user = await new UserRepository().getUserByEmail({
    email,
    login: true,
  });

  console.log(user);
  if (!user || !(await user.checkPassword(password, user.password))) {
    return next(new AppError('Wrong email and/or password', 401));
  }

  const token = createToken(user._id, user.role);

  res.status(200).json({ success: true, statusCode: 200, data: { token } });
});

export const protect = catchErrorAsync(async (req, res, next) => {
  let token;
  console.log('PROTECT ACTIVATED');

  if (
    req.headers.authorization &&
    req.headers.authorization.toLowerCase().startsWith('bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('You need to be logged in', 401));
  }

  const decoded = await verifyToken(token);

  const user = await new UserRepository().getUser(decoded.id);

  req.user = user;
  next();
});

export const authorize = (...role) => {
  return (req, res, next) => {
    console.log('I MADE IT!');
    console.log('role: ', req.user.role);

    console.log('Roles allowed', role);

    if (!role.includes(req.user.role)) {
      return next(new AppError('Peasents not allowed', 403));
    }

    next();
  };
};

const createToken = (userId, userRole) => {
  return jwt.sign({ id: userId, role: userRole }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

const verifyToken = async (token) => {
  return await promisify(jwt.verify)(token, process.env.JWT_SECRET);
};
