import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";
import UserModel from "./UserModel";
import LessonModel from "./LessonModel";

export interface LessonProgressAttributes {
  id: number;
  user_id: number;
  lesson_id: number;
  status: "done" | "not_done";
}

export interface LessonProgressCreationAttributes
  extends Optional<LessonProgressAttributes, "id"> {}

class LessonProgressModel
  extends Model<LessonProgressAttributes, LessonProgressCreationAttributes>
  implements LessonProgressAttributes
{
  public id!: number;
  public user_id!: number;
  public lesson_id!: number;
  public status!: "done" | "not_done";
}

LessonProgressModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: UserModel, key: "id" },
    },
    lesson_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: LessonModel, key: "id" },
    },
    status: {
      type: DataTypes.ENUM("done", "not_done"),
      allowNull: false,
      defaultValue: "not_done",
    },
  },
  {
    sequelize,
    modelName: "LessonProgressModel",
    tableName: "LessonProgress",
  }
);

LessonProgressModel.belongsTo(UserModel, { foreignKey: "user_id" });
LessonProgressModel.belongsTo(LessonModel, { foreignKey: "lesson_id" });

export default LessonProgressModel;
