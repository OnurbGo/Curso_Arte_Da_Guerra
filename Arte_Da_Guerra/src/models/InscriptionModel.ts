import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import UserModel from "./UserModel";
import ClassModel from "./ClassModel";

class InscriptionModel extends Model {
  user_id: number | undefined;
  class_id: number | undefined;
}

InscriptionModel.init(
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
    class_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: ClassModel,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "InscriptionModel",
    tableName: "Inscription",
  }
);

// Definindo os relacionamentos
InscriptionModel.belongsTo(UserModel, { foreignKey: "user_id" });
UserModel.hasMany(InscriptionModel, { foreignKey: "user_id" });

InscriptionModel.belongsTo(ClassModel, { foreignKey: "class_id" });
ClassModel.hasMany(InscriptionModel, { foreignKey: "class_id" });

export default InscriptionModel;
