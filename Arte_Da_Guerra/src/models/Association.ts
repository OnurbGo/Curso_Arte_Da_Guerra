import UserModel from "./UserModel";
import TeachersModel from "./TeachersModel";

UserModel.hasOne(TeachersModel, { foreignKey: "user_id" });

TeachersModel.belongsTo(UserModel, { foreignKey: "user_id" });
