import userService from "../services/UserService.js";

class UserController {
  async getAll(req, res, next) {
    try {
      const result = await userService.getAll(req.query);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  async getById(req, res, next) {
    try {
      const user = await userService.getById(req.params.id);
      res.json(user);
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const updated = await userService.update(req.params.id, req.body);
      res.json(updated);
    } catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    try {
      await userService.delete(req.params.id);
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }

  async rateStoreOwner(req, res, next) {
    try {
      const { rating, comment } = req.body;
      const data = await userService.rateStoreOwner(req.user.id, req.params.id, rating, comment);
      res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  }
}

const userController = new UserController()
export default userController;
