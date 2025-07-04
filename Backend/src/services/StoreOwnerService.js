import { StoreOwner, Rating } from "../models/index.js";
import AppError from "../utils/error.utils.js";
import BaseService from "./BaseService.js";

class StoreOwnerService extends BaseService {
  async getAll(queryParams) {
    return this.findAllWithPagination(StoreOwner, {
      ...queryParams,
      searchFields: ['username', 'name', 'storeName', 'email'],
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
    const owner = await this.getById(id); // Will throw 404 if not found
    return Rating.findAll({
    where: { storeOwnerId: id },
    include: [
      {
        association: 'user',
        attributes: ['name'], 
      },
    ],
    attributes: ['id', 'rating', 'comment'], 
  });
  }

  async addRatings(rating, storeOwnerId, userId) {
    try {
      // Prevent duplicate ratings
      const existing = await Rating.findOne({ where: { userId, storeOwnerId } });
      if (existing) {
        throw new AppError("You've already rated this store", 400);
      }

      // 1. Create new rating
      await Rating.create({
        rating,
        storeOwnerId,
        userId,
        comment: ""
      });

      // 2. Fetch all ratings for the store
      const ratings = await Rating.findAll({ where: { storeOwnerId } });

      // 3. Calculate and update average
      const avg = ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length;
      await StoreOwner.update({ averageRating: avg }, { where: { id: storeOwnerId } });

    } catch (error) {
      throw new AppError(error.message || 'Rating error');
    }
  }
}

export default new StoreOwnerService();
