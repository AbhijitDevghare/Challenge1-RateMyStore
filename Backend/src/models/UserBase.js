import dotenv from 'dotenv';
dotenv.config();
import { Model, DataTypes } from "sequelize";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class UserBase extends Model {
  generateJwtToken(role) {
    return jwt.sign(
      { id: this.id, email: this.email, role: role },
      process.env.JWT_SECRET,
      { expiresIn: "168h" }
    );
  }

  async isPasswordMatch(plainPassword) {
    return await bcrypt.compare(plainPassword, this.password);
  }

  static baseFields() {
    return {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: { msg: "Username is required" },
          notEmpty: { msg: "Username cannot be empty" },
          len: {
            args: [3, 100],
            msg: "Username must be between 3 and 100 characters",
          },
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Name is required" },
          notEmpty: { msg: "Name cannot be empty" },
          len: {
            args: [3, 60],
            msg: "Name must be between 3 and 60 characters",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: { msg: "Email is required" },
          notEmpty: { msg: "Email cannot be empty" },
          isEmail: { msg: "Email must be valid" },
        },
      },
      phoneNumber: {
        type: DataTypes.BIGINT, // or STRING if you want leading zeros
        allowNull: false,
        unique: true,
        validate: {
          notNull: { msg: "Phone number is required" },
          notEmpty: { msg: "Phone number cannot be empty" },
          isNumeric: { msg: "Phone number must be numeric" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { 
          notNull: { msg: "Password is required" },
          notEmpty: { msg: "Password cannot be empty" },
          len: {
            args: [8, 16],
            msg: "Password must be between 8 and 16 characters",
          },
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Address is required" },
          notEmpty: { msg: "Address cannot be empty" },
          len: {
            args: [20, 400],
            msg: "Address must be between 20 and 400 characters",
          },
        },
      },
      status: {
        type: DataTypes.ENUM("active", "inactive"),
        defaultValue: "active",
      },
      lastLogin: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    };
  }

  static baseOptions(modelName, tableName, sequelize) {
    return {
      sequelize,
      modelName,
      tableName,
      name: {
        singular: modelName.toLowerCase(),
        plural: modelName.toLowerCase() + 's',
      },
      timestamps: true,
      hooks: {
        beforeCreate: async (user) => {
          if (user.password) {
            user.password = await bcrypt.hash(user.password, 10);
          }
        },
        beforeUpdate: async (user) => {
          if (user.changed("password")) {
            user.password = await bcrypt.hash(user.password, 10);
          }
        },
      },
    };
  }
}

export default UserBase;
