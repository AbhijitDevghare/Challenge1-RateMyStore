import registrationStrategyFactory from "../strategies/strategyFactory.js";
import AppError from "../utils/error.utils.js";

class AuthService {
  async register(data, role) {
    try {
      const strategy = registrationStrategyFactory(role);
      await strategy.validate(data);
      const result = await strategy.register(data);
      return result;
    } catch (error) {
      throw new AppError(error.message || "Registration failed", error.code || 400);
    }
  }
}

export default AuthService;
