import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import TeachersModel from "./TeachersModel";
import UserModel from "./UserModel";

class ClassModel extends Model {
  master_id: number | undefined;
  title: string | undefined;
  description: string | undefined;
  price: number | undefined;
  creation_date: Date | undefined;
}

ClassModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    master_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: TeachersModel,
        key: "id",
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    creation_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "ClassModel",
    tableName: "Class",
  }
);

ClassModel.belongsTo(TeachersModel, { foreignKey: "master_id" });
TeachersModel.hasMany(ClassModel, { foreignKey: "master_id" });

export default ClassModel;
