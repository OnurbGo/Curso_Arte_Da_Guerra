import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import bcrypt from "bcrypt";
import TeachersModel from "./TeachersModel";

class UserModel extends Model {
  name: string | undefined;
  email: string | undefined;
  CPF: string | undefined;
  password: string | undefined;
  type: "student" | "teacher" | undefined;
  registration_date: Date | undefined;
  updatedBy: number | undefined;
  //id: number | undefined;

  public async hashPassword() {
    this.password = await bcrypt.hash(this.password!, 10);
  }

  public async validatePassword(password: string) {
    return bcrypt.compare(password, this.password!);
  }
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
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    CPF: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    type: {
      type: DataTypes.ENUM("student", "teacher"),
      allowNull: true,
    },
    registration_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updatedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "UserModel",
    tableName: "User",
  }
);

UserModel.beforeCreate(async (user: UserModel) => {
  await user.hashPassword();
});

UserModel.beforeUpdate(async (user: UserModel) => {
  if (user.changed("password")) {
    await user.hashPassword();
  }
});

/*interface GlobalUser {
  id?: number;
}

export const globalUser: GlobalUser = {};

UserModel.afterCreate(async (user: UserModel) => {
  if (user.type === "teacher") {
    await TeachersModel.create({
      user_id: globalUser.id,
      biography: "",
      expertise: "",
    });
  }
});
*/

export default UserModel;
