import StoreOwner from '../models/StoreOwner.js';
import AppError from '../utils/error.utils.js';
import UserStrategy from './UserStrategy.js';

export default class StoreOwnerStrategy extends UserStrategy {
  async validate(data) {
    // Reuse UserStrategy validation first
    await super.validate(data);

    const { storeName, gstNumber, email } = data;

    // Additional required field
    if (!storeName) {
      throw new AppError("storeName is required", 400);
    }

    // Optional GST number format validation
    if (gstNumber && !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(gstNumber)) {
      throw new AppError("Invalid GST number format", 400);
    }

    // Check if already registered as StoreOwner
    const existing = await StoreOwner.findOne({ where: { email } });
    if (existing) {
      throw new AppError("Store owner already registered", 400);
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
}
