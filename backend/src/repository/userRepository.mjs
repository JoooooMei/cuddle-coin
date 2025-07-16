import userModel from '../models/schema/userModel.mjs';

export default class UserRepository {
  async addUser(user) {
    await userModel.create(user);

    return user;
  }
  async addUser(user) {
    const { userName, password, role, email } = user;
    return await userModel.create({ userName, email, password, role });
  }

  async getAllUsers() {
    return await userModel.find();
  }

  async getUser(id) {
    return await userModel.findById(id);
  }

  async deleteUser(id) {
    await userModel.findByIdAndDelete(id);
  }
}
