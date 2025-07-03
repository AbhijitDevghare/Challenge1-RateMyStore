import { User } from '../models/index.js';
import AppError from '../utils/error.utils.js';
import AuthStrategy from './AuthStrategy.js';

export default class UserStrategy extends AuthStrategy {
  async validate(data) {
    const { username, name, email, password, confirmPassword, address } = data;

    // Validate required fields
    AuthStrategy.checkRequiredFields(data, [
      "username",
      "name",
      "email",
      "password",
      "confirmPassword",
      "address"
    ]);

    await AuthStrategy.isEmailValid(email);
    AuthStrategy.isPasswordEqualToConfirmPassword(password, confirmPassword);

    // Check uniqueness
    const existing = await User.findOne({ where: { email } });
    if (existing) {
      throw new AppError("User already exists", 400);
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
}
