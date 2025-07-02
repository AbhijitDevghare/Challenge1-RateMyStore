import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";
import UserBase from "./UserBase.js";

class StoreOwner extends UserBase {}

StoreOwner.init(
  {
    ...UserBase.baseFields(),
    storeName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gstNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  UserBase.baseOptions("StoreOwner", "storeowners", sequelize)
);

export default StoreOwner;
