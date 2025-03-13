import jwt from "jsonwebtoken";
import UserModel from "../models/UserModel";

const JWT_SECRET = process.env.JWT_SECRET || "Secret_key";
const JWT_EXPIRES_IN = "7d";

export const generateToken = (user: UserModel): string => {
  return jwt.sign({ user }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};
