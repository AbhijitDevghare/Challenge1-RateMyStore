import User from "../models/User.js";

class UserService {
  async createUser(userData) {
    return await User.create(userData);
  }
}

export default new UserService();
