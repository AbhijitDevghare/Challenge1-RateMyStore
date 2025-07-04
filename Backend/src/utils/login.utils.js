import AppError from './error.utils.js';
import { Op } from 'sequelize';

/**
 * Generic login handler for all user types (User, Admin, StoreOwner, etc.)
 * @param {Object} options
 * @param {Model} options.Model - Sequelize model (User, Admin, StoreOwner)
 * @param {Object} options.data - Login data: { identifier, password }
 * @param {string} options.role - Role name (for JWT payload)
 * @param {string} options.notFoundMessage - Custom error message if not found
 * @returns {Object} { user, token, cookieOptions }
 */
export async function loginUser({ Model, data, role, notFoundMessage = "User not found" }) {
  const { identifier, password } = data;

  if (!identifier || !password) {
    throw new AppError("Both identifier and password are required", 400);
  }

  const user = await Model.findOne({
    where: {
      [Op.or]: [{ email: identifier }, { username: identifier }]
    }
  });

  if (!user) {
    throw new AppError(notFoundMessage, 404);
  }

  const isMatch = await user.isPasswordMatch(password);

  if (!isMatch) {
    throw new AppError("Invalid credentials", 401);
  }

    const date = new Date();
    await user.update({ lastLogin: date });

     const token = await user.generateJwtToken(role);

    user.password = undefined;


    
    const safeUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        username: user.username,
        phoneNumber:user.phoneNumber,
        address:user.address,
        status:user.status,
        role:role,
        lastLogin: user.lastLogin
      };


  const cookieOptions = {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Lax"
  };

  return { safeUser, token, cookieOptions };
}
