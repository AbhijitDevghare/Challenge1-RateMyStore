import { User, StoreOwner, Rating } from "../models/index.js";
import BaseService from "./BaseService.js";
import AppError from "../utils/error.utils.js";

class UserService extends BaseService {
  constructor() {
    super();
    this.Model = User;
    this.ratingModel = Rating;
  }

  async getAll(queryParams) {
    return this.findAllWithPagination(User, {
      ...queryParams,
      searchFields: ['username', 'name', 'email'],
      include: ['ratings']
    });
  }

  async getById(id) {
    return this.findById(User, id, ['ratings']);
  }

  async update(id, data) {
    const user = await this.getById(id);
    return user.update(data);
  }

  async delete(id) {
    const user = await this.getById(id);
    return user.destroy();
  }

  async rateStoreOwner(userId, storeOwnerId, rating, comment) {
    const storeOwner = await this.findById(StoreOwner, storeOwnerId);
    return this.ratingModel.create({ userId, storeOwnerId, rating, comment });
  }
}

export default new UserService();
