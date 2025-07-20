import userModel from '../models/schema/userModel.mjs';

export default class UserRepository {
  async addUser(user) {
    const addedUser = await userModel.create(user);

    addedUser.password = undefined;

    return addedUser;
  }

  async getAllUsers() {
    return await userModel.find();
  }

  async getUser(id) {
    return await userModel.findById(id);
  }

  async getUserByEmail({ email, login }) {
    return login === true
      ? await userModel.findOne({ email: email }).select('+password')
      : await userModel.findOne({ email: email });
  }

  async deleteUser(id) {
    await userModel.findByIdAndDelete(id);
  }
}
