import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class UserModel extends Model {
  id: number | undefined;
  name: string | undefined;
  email: string | undefined;
  password: string | undefined;
  type: boolean | undefined;
  //registration_date:date |undefined;
}

UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("student", "teacher"),
      allowNull: false,
    },
    registration_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "UserModel",
    tableName: "User",
  }
);

export default UserModel;
