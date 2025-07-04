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
      validate: {
        notNull: { msg: "Store name is required" },
        notEmpty: { msg: "Store name cannot be empty" },
        len: {
          args: [3, 100],
          msg: "Store name must be between 3 and 100 characters",
        },
      },
    },
    averageRating: {
      type: DataTypes.INTEGER, 
      allowNull: false,
      validate: {
        min: 1,
        max: 5
      }
    },
    gstNumber: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        is: {
          args: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
          msg: "GST number must be a valid Indian GSTIN format",
        },
      },
    },

  },
  UserBase.baseOptions("StoreOwner", "storeowners", sequelize)
);

export default StoreOwner;
