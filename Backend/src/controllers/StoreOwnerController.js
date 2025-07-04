import {storeOwnerService} from "../services/index.js";

class StoreOwnerController {
  async getAll(req, res, next) {
    try {
      const result = await storeOwnerService.getAll(req.query);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  async getById(req, res, next) {
    try {
      const owner = await storeOwnerService.getById(req.params.id);
      res.json(owner);
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const updated = await storeOwnerService.update(req.params.id, req.body);
      res.json(updated);
    } catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    try {
      await storeOwnerService.delete(req.params.id);
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }

  async getRatings(req, res, next) {
    try {
      const id = await req.user.id;
      console.log("REQUEST USER/ OWNER ID ",id)
      const ratings = await storeOwnerService.getRatings(id);
      res.status(200).json(ratings);
    } catch (err) {
      next(err);
    }
  }

  async addRatings(req,res,next)
  {
    try {
      const userId = req.user.id;
      const { storeOwnerId } = req.params;
      const {rating } = req.body;
      await storeOwnerService.addRatings(rating, storeOwnerId, userId)
      res.status(201).json({
        success:true,
        message:"Store rated successfully"
      })
    } catch (error) {
      next(error)
    }
  }
}

export default new StoreOwnerController();
