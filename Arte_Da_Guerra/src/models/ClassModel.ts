import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import TeachersModel from "./TeachersModel";
import UserModel from "./UserModel";

class ClassModel extends Model {
  master_id: number | undefined;
  title: string | undefined;
  description: string | undefined;
  creation_date: Date | undefined;
  url_img: string | undefined;
  url_img_banner: string | undefined;
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
    creation_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    url_img: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url_img_banner: {
      type: DataTypes.STRING,
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
