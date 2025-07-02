import UserService from "../services/index.js";

class UserController {
  async createUser(req, res, next) {
    try {
      const { username, password } = req.body;
      const user = await UserService.createUser({ username, password });
      res.status(201).json({ message: "User created", user });
    } catch (error) {
      res.status(500).json({ message: "Failed to create user", error: error.message });
    }
  }
}

export default new UserController();
