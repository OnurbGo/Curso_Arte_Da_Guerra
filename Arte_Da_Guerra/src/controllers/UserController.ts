import { Request, Response } from "express";
import UserModel from "../models/UserModel";

const passwordRegex =
  /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const validateUserFields = (
  name: string,
  email: string,
  CPF: string,
  password: string,
  type: string
) => {
  if (!name) return { status: 400, error: "Name is required" };
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return { status: 400, error: "Invalid email format" };
  if (!CPF || !/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(CPF))
    return {
      status: 400,
      error: "Invalid CPF format (must be XXX.XXX.XXX-XX)",
    };
  if (!password || !passwordRegex.test(password))
    return {
      status: 400,
      error:
        "The password must have at least 8 characters, one saved letter, one number and one special character",
    };
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

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal server error: " + error });
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
    const { name, password } = req.body;
    if (!name) return res.status(400).json({ error: "Name is required" });
    user.name = name;
    if (password && password.trim() !== "") {
      if (!passwordRegex.test(password))
        return res.status(400).json({
          error:
            "The password must have at least 8 characters, one saved letter, one number and one special character",
        });
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
