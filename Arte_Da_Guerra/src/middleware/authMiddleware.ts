import { verifyToken } from "../utils/jwt";
import { NextFunction, Request, Response } from "express";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const tokenFromHeader = req.header("Authorization")?.replace("Bearer ", "");
  const tokenFromCookie = req.cookies?.authToken;
  const token = tokenFromHeader || tokenFromCookie;

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token" });
  }

  try {
    const decoded: any = verifyToken(token);
    (req as any).user = decoded;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ msg: "Access denied. Invalid Token: " + error });
  }
};
