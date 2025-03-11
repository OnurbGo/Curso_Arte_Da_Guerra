import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import UserModel from "./UserModel";
import ClassModel from "./ClassModel";

class InscriptionModel extends Model {
  user_id: number | undefined;
  inscription_date: Date | undefined;
  status: Enumerator | undefined;
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
    inscription_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("activated", "canceled", "done"),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "InscriptionModel",
    tableName: "Inscription",
  }
);

//colocar um as para definir o nome (as: "nome")
InscriptionModel.belongsTo(UserModel, { foreignKey: "user_id" });
UserModel.hasMany(InscriptionModel, { foreignKey: "user_id" });

InscriptionModel.belongsTo(ClassModel, { foreignKey: "class_id" });
ClassModel.hasMany(InscriptionModel, { foreignKey: "class_id" });

export default InscriptionModel;
