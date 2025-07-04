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
          notEmpty: true,
          len: [3, 100],
        },
      },
      name:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true,
            len:[20,60]
        }
      }
      ,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
          notEmpty: true
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [8, 16],
        },
      },
      address:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
          len: [20, 400],
        }

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
      plural: modelName.toLowerCase() + 's'
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
