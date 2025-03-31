import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

export interface TeacherAttributes {
  id: number;
  user_id: number;
  biography: string | null;
  expertise: string | null;
}

interface TeacherCreationAttributes extends Optional<TeacherAttributes, "id"> {}

class TeachersModel
  extends Model<TeacherAttributes, TeacherCreationAttributes>
  implements TeacherAttributes
{
  public id!: number;
  public user_id!: number;
  public biography!: string | null;
  public expertise!: string | null;
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
        model: "User",
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

export default TeachersModel;
