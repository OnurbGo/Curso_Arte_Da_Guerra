import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import UserModel from "./UserModel";
import ClassModel from "./ClassModel";

class PaymentModel extends Model {}

PaymentModel.init(
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
    value: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    payment_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "paid", "failed"),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "PaymentModel",
    tableName: "Payment",
  }
);

PaymentModel.belongsTo(UserModel, { foreignKey: "user_id" });
PaymentModel.belongsTo(ClassModel, { foreignKey: "class_id" });

export default PaymentModel;
