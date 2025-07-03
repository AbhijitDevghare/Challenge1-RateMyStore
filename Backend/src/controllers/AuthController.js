import AuthService from "../services/AuthService.js";
import AppError from "../utils/error.utils.js";

class AuthController {
  async register(req, res, next) {
    try {
      const { role } = req.body;

      if (!role) {
        throw new AppError("Role is required", 400);
      }

      const result = await new AuthService().register(req.body, role);

      res.status(201).json({
        success: true,
        message: `${role} registered successfully`,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
