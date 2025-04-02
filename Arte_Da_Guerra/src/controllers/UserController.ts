import { Request, Response } from "express";
import UserModel from "../models/UserModel";

// Regex para validação de email
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Regex para validação de CPF (formato: 000.000.000-00)
const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

const validateUserFields = (
  name: string,
  email: string,
  CPF: string,
  password: string,
  type: string,
  requirePassword: boolean = true
) => {
  if (!name) return { status: 400, error: "Name is required" };
  if (!email || !emailRegex.test(email))
    return { status: 400, error: "Invalid email format" };
  if (!CPF || !cpfRegex.test(CPF))
    return {
      status: 400,
      error: "Invalid CPF format (must be XXX.XXX.XXX-XX)",
    };
  if (requirePassword && (!password || password.trim() === ""))
    return { status: 400, error: "Password is required" };
  if (!type) return { status: 400, error: "Type is required" };
  return null;
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal server error: " + error });
  }
};

export const getUserById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });
    const user = await UserModel.findByPk(id);
    if (!user) return res.status(404).json({ error: "User not found" });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error: " + error });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, CPF, password, type } = req.body;

    const validationError = validateUserFields(
      name,
      email,
      CPF,
      password,
      type
    );
    if (validationError)
      return res
        .status(validationError.status)
        .json({ error: validationError.error });

    const user = await UserModel.create({ name, email, CPF, password, type });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal server error: " + error });
  }
};

export const updateUser = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const user = await UserModel.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Apenas o nome é obrigatório
    const { name, password } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    // Atualiza somente o nome; email, CPF e type permanecem os mesmos
    user.name = name;
    if (password && password.trim() !== "") {
      user.password = password;
    }

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal server error: " + error });
  }
};

export const destroyUserById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const user = await UserModel.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    await user.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Internal server error: " + error });
  }
};
