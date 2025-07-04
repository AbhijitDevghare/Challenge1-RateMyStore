import emailValidator from "email-validator";
import AppError from "../utils/error.utils.js";
import axios from "axios";
import Admin from "../models/Admin.js";

class AuthStrategy {
  // Abstract methods
  async validate(data) {
    throw new Error("validate() not implemented in subclass");
  }

  async register(data) {
    throw new Error("register() not implemented in subclass");
  }

  async login(data)
  {
    throw new Error("login() not implemented in subclass");
  }

}

export default AuthStrategy;
