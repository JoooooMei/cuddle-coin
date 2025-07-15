import { catchErrorAsync } from '../utilities/catchErrorAsync.mjs';
import UserRepository from '../repository/userRepository.mjs';

export const addUser = catchErrorAsync(async (req, res, next) => {
  const user = await new UserRepository().addUser(req.body);

  res.status(201).json({ succsess: true, statusCode: 201, data: user });
});

export const getAllUsers = catchErrorAsync(async (req, res, next) => {
  const users = await new UserRepository().getAllUsers();

  res.status(200).json({ success: true, statusCode: 200, data: users });
});

export const getUser = catchErrorAsync(async (req, res, next) => {
  const user = await new UserRepository().getUser(req.params.id);

  res.status(200).json({ success: true, statusCode: 200, data: user });
});

export const deleteUser = catchErrorAsync(async (req, res, next) => {
  const user = await new UserRepository().deleteUser(req.params.id);

  res.status(204).end();
});
