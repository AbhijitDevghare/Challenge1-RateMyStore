// src/models/User.js
import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";
import UserBase from "./UserBase.js";

class User extends UserBase {}

User.init(
  {
    ...UserBase.baseFields(),
    // You can extend with extra fields here if needed
  },
  UserBase.baseOptions("User", "users", sequelize)
  
);

export default User;
