import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import UserModel from "./UserModel";
import ClassModel from "./ClassModel";
import MethodPaymentModel from "./MethodPaymentModel";

class PaymentModel extends Model {
  user_id: number | undefined;
  methodpayment_id: number | undefined;
  class_id: number | undefined;
  value: number | undefined;
  payment_date: Date | undefined;
  status: Enumerator | undefined;
}

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
    methodpayment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: MethodPaymentModel,
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

PaymentModel.belongsTo(MethodPaymentModel, { foreignKey: "methodpayment_id" });
MethodPaymentModel.hasMany(PaymentModel, { foreignKey: "methodpayment_id" });

export default PaymentModel;
