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

  // Confirm password match
  static isPasswordEqualToConfirmPassword(password, confirmPassword) {
    if (password !== confirmPassword) {
      throw new AppError("Passwords do not match", 400);
    }
  }

  // Validate email format + check deliverability via API
  static async isEmailValid(email) {
    if (!emailValidator.validate(email)) {
      throw new AppError("Invalid Email Format", 400);
    }

    const apiKey = process.env.EMAIL_VALIDATION_API_KEY;
    const baseUrl = process.env.EMAIL_VALIDATION_BASE_URL;

    if (!apiKey || !baseUrl) {
      throw new AppError("Email verification service not configured properly", 500);
    }

    const url = `${baseUrl}?api_key=${apiKey}&email=${encodeURIComponent(email)}`;

    console.log(url);
    try {
      const { data: emailResponse } = await axios.get(url);
      if (!emailResponse || emailResponse.deliverability !== "DELIVERABLE") {
        throw new AppError("Invalid or undeliverable email", 400);
      }
    } catch (err) {
      throw new AppError("Email verification failed", 500);
    }
  }

  // Optional: validate required fields dynamically
  static checkRequiredFields(data, requiredFields = []) {
    const missing = requiredFields.filter((field) => !data[field]);
    if (missing.length) {
      throw new AppError(`Missing required fields: ${missing.join(", ")}`, 400);
    }
  }
}

export default AuthStrategy;
