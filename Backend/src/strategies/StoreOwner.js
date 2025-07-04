import StoreOwner from '../models/StoreOwner.js';
import AppError from '../utils/error.utils.js';
import { loginUser } from "../utils/login.utils.js";
import AuthStrategy from './AuthStrategy.js';


export default class StoreOwnerStrategy extends AuthStrategy {
  async validate(data) {
    const { email, username } = data;

    // ✅ Check if email already exists
    const existing = await StoreOwner.findOne({ where: { email } });
    if (existing) {
      throw new AppError("Store owner already registered", 400);
    }

    // ✅ Check if username already exists
    const existingUsername = await StoreOwner.findOne({ where: { username } });
    if (existingUsername) {
      throw new AppError("Username already taken", 400);
    }
  }

  async register(data) {
    await this.validate(data);

    const {
      username,
      name,
      email,
      password,
      address,
      storeName,
      gstNumber = null,
    } = data;

    const storeOwner = await StoreOwner.create({
      username,
      name,
      email,
      password,
      address,
      storeName,
      gstNumber
    });

    return storeOwner;
  }

  async login(data, role = "store-owner") {
    return loginUser({
      Model: StoreOwner,
      data,
      role,
      notFoundMessage: "Store Owner not found"
    });
  }
}
