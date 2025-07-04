import { Rating, StoreOwner } from "../models/index.js";

class RatingService {
  // Fetch all ratings submitted by a specific user, with store details
  async getRatingByUserId(userId) {
    try {
      const ratings = await Rating.findAll({
        where: { userId },
        include: [
          {
            model: StoreOwner,
            as: 'storeOwner',
            attributes: ['id', 'storeName', 'email', 'address', 'averageRating'],
          },
        ],
      });

      return ratings;
    } catch (error) {
      throw new Error(`Failed to fetch user ratings: ${error.message}`);
    }
  }
}

export default new RatingService();
