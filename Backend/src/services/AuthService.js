import authStrategyFactory from "../strategies/strategyFactory.js";
import AppError from "../utils/error.utils.js";

class AuthService {
  async register(data) {
    try {
      const strategy = authStrategyFactory(data.role);
      await strategy.validate(data);
      const result = await strategy.register(data);
      return result;
    } catch (error) {
      throw new AppError(error.message || "Registration failed", error.code || 400);
    }
  }

  async login(data)
  {
    const strategy = authStrategyFactory(data.role); 
    const {user, token, cookieOptions}  = await strategy.login(data);

    return {user, token, cookieOptions};
  }
}

export default new AuthService();
