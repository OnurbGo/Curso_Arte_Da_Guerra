import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class MethodPaymentModel extends Model {
  name: string | undefined;
}

MethodPaymentModel.init(
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
  },
  {
    sequelize,
    modelName: "MethodPaymentModel",
    tableName: "MethodPayment",
  }
);

export default MethodPaymentModel;
