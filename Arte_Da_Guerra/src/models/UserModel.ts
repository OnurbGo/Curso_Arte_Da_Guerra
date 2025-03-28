import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";
import bcrypt from "bcrypt";
import TeachersModel from "./TeachersModel";

// Definição de tipo para a criação de um novo usuário (sem o `id`)
interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

interface UserAttributes {
  id: number;
  name: string;
  email: string;
  CPF: string;
  password: string;
  type: "student" | "teacher";
  registration_date: Date | null;
  updatedBy: number | null;
}

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
  public registration_date!: Date | null;
  public updatedBy!: number | null;

  public async hashPassword(): Promise<void> {
    this.password = await bcrypt.hash(this.password, 10);
  }

  public async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
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

// Gatilhos (hooks) para hash da senha antes de criar ou atualizar o usuário
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

// Aqui você pode ativar o trecho de código comentado se necessário
/* UserModel.afterCreate(async (user: UserModel) => {
  if (user.type === "teacher") {
    await TeachersModel.create({
      user_id: user.id,  // Corrigido para garantir que o id do usuário seja utilizado corretamente
      biography: "",
      expertise: "",
    });
  }
}); */

export default UserModel;
