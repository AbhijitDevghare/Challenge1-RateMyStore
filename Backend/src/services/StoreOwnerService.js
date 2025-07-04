import { StoreOwner, Rating } from "../models/index.js";
import BaseService from "./BaseService.js";

class StoreOwnerService extends BaseService {
  async getAll(queryParams) {
    return this.findAllWithPagination(StoreOwner, {
      ...queryParams,
      searchFields: ['username', 'name', 'storeName', 'email'],
      include: ['storeRatings']
    });
  }

  async getById(id) {
    return this.findById(StoreOwner, id, ['storeRatings']);
  }

  async update(id, data) {
    const owner = await this.getById(id);
    return owner.update(data);
  }

  async delete(id) {
    const owner = await this.getById(id);
    return owner.destroy();
  }

  async getRatings(id) {
    const owner = await this.getById(id);
    return Rating.findAll({ where: { storeOwnerId: id }, include: ['user'] });
  }
}

export default new StoreOwnerService();
