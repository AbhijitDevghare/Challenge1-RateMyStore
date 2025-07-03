import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";
import UserBase from "./UserBase.js";

class Admin extends UserBase {}

Admin.init(
  {
    ...UserBase.baseFields(),
    // You can extend with extra fields here if needed
  },
  UserBase.baseOptions("Admin", "admins", sequelize)
);

export default Admin;
