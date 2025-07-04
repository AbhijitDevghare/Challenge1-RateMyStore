import storeOwnerService from "../services/StoreOwnerService.js";

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
      const ratings = await storeOwnerService.getRatings(req.params.id);
      res.json(ratings);
    } catch (err) {
      next(err);
    }
  }
}

export default new StoreOwnerController();
