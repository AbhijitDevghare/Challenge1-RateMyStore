// src/models/Rating.js
import { Model, DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

class Rating extends Model {}

Rating.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    storeOwnerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Rating",
    tableName: "ratings",
    timestamps: true,
    hooks: {
      beforeCreate: (rating) => {
        if (rating.comment) {
          rating.comment = rating.comment.trim();
        }
      },
    },
  }
);

export default Rating;
