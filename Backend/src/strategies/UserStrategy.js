import { User } from '../models/index.js';
import AppError from '../utils/error.utils.js';
import AuthStrategy from './AuthStrategy.js';
import { loginUser } from "../utils/login.utils.js";

export default class UserStrategy extends AuthStrategy {
  async validate(data) {
    const { email, username } = data;

    // Check if email already exists
    const existing = await User.findOne({ where: { email } });
    if (existing) {
      throw new AppError("User already exists", 400);
    }

    // Check if username already exists
    const existingUsername = await User.findOne({ where: { username } });
    if (existingUsername) {
      throw new AppError("Username already taken", 400);
    }
  }

  async register(data) {
    await this.validate(data);

    const { username, name, email, password, address } = data;

    const user = await User.create({
      username,
      name,
      email,
      password,
      address
    });

    return user;
  }

  async login(data, role = "user") {
    return loginUser({
      Model: User,
      data,
      role,
      notFoundMessage: "User not found"
    });
  }
}
