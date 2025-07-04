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
        notNull: { msg: "Rating is required" },
        isInt: { msg: "Rating must be an integer" },
        min: {
          args: [1],
          msg: "Rating must be at least 1",
        },
        max: {
          args: [5],
          msg: "Rating must be at most 5",
        },
      },
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        len: {
          args: [0, 1000],
          msg: "Comment must be less than 1000 characters",
        },
        isMeaningful(value) {
          if (value && value.trim().length === 0) {
            throw new Error("Comment cannot be empty or whitespace only");
          }
        },
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "User ID is required" },
        isInt: { msg: "User ID must be an integer" },
      },
    },
    storeOwnerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Store Owner ID is required" },
        isInt: { msg: "Store Owner ID must be an integer" },
      },
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
      beforeUpdate: (rating) => {
        if (rating.comment) {
          rating.comment = rating.comment.trim();
        }
      },
    },
  }
);

export default Rating;
