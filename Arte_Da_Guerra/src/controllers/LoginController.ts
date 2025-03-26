import { Request, Response } from "express";
import UserModel from "../models/UserModel";
import { generateToken } from "../utils/jwt";

export const LoginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email or Password are required" });
  }

  const user = await UserModel.findOne({ where: { email } });
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const isValidPassword = await user.validatePassword(password);
  if (!isValidPassword) {
    return res.status(400).json({ error: "Email or Password are invalid" });
  }

  const token = generateToken(user);

  res.cookie("authToken", token, {
    httpOnly: true, // Impede que o frontend acesse via JS
    secure: false, // Defina true se estiver rodando em produção com HTTPS
    sameSite: "lax", // Permite envio do cookie apenas em requisições do mesmo domínio
    maxAge: 7 * 24 * 60 * 60 * 1000, // Expira em 7 dias
  });

  res.status(200).json({ menssage: "Login succeful", token });
};
