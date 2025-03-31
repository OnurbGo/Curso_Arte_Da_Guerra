import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import ClassModel from "./ClassModel";

class LessonModel extends Model {
  class_id: number | undefined;
  title: string | undefined;
  description: string | undefined;
  url_video: string | undefined;
  url_img: string | undefined;
}

LessonModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    class_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: ClassModel,
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
    url_video: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url_img: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "LessonModel",
    tableName: "Lessons",
  }
);

LessonModel.belongsTo(ClassModel, { foreignKey: "class_id" });
ClassModel.hasMany(LessonModel, { foreignKey: "class_id" });

export default LessonModel;
