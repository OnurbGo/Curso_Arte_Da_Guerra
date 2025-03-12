import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import UserModel from "./UserModel";

class TeachersModel extends Model {
  user_id: number | undefined;
  biography: string | undefined;
  expertise: string | undefined;
}

TeachersModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: UserModel,
        key: "id",
      },
    },
    biography: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    expertise: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "TeachersModel",
    tableName: "Teachers",
  }
);

TeachersModel.belongsTo(UserModel, { foreignKey: "user_id" });
UserModel.hasOne(TeachersModel, { foreignKey: "user_id" });

export default TeachersModel;
