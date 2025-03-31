import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";
import bcrypt from "bcrypt";

export interface UserAttributes {
  id: number;
  name: string;
  email: string;
  CPF: string;
  password: string;
  type: "student" | "teacher";
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

class UserModel
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public name!: string;
  public email!: string;
  public CPF!: string;
  public password!: string;
  public type!: "student" | "teacher";

  public async hashPassword(): Promise<void> {
    if (this.password) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
  }

  public async validatePassword(password: string): Promise<boolean> {
    if (this.password) {
      return await bcrypt.compare(password, this.password);
    }
    return false;
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
  },
  {
    sequelize,
    modelName: "UserModel",
    tableName: "User",
  }
);

UserModel.beforeCreate(async (user: UserModel) => {
  if (user.password) {
    await user.hashPassword();
  }
});

UserModel.beforeUpdate(async (user: UserModel) => {
  if (user.changed("password")) {
    await user.hashPassword();
  }
});

export default UserModel;
