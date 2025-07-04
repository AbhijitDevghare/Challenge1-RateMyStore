import { Admin } from '../models/index.js';
import { loginUser } from '../utils/login.utils.js';
import UserStrategy from './UserStrategy.js';

export default class AdminStrategy extends UserStrategy {
  async login(data, role = "admin") {
    console.log("FUCKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK")
    return loginUser({
      Model: Admin,
      data,
      role,
      notFoundMessage: "Admin not found"
    });
  }
}
