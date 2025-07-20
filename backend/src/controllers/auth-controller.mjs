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

  const token = createToken(user._id);

  res.status(200).json({ success: true, statusCode: 200, data: { token } });
});

const createToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};
