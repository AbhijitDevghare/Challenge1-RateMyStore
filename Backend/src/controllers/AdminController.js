import adminService from "../services/AdminService.js";

class AdminController {
  async getAll(req, res, next) {
    try {
      const result = await adminService.getAll(req.query);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  async getById(req, res, next) {
    try {
      const admin = await adminService.getById(req.params.id);
      res.json(admin);
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const updated = await adminService.update(req.params.id, req.body);
      res.json(updated);
    } catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    try {
      await adminService.delete(req.params.id);
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }
}

export default new AdminController();
