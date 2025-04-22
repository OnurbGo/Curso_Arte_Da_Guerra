import { Request, Response } from "express";
import UserModel from "../models/UserModel";

const passwordRegex =
  /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const getAll = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error("getAll error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("getUserById error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, CPF, password, type, url_img } = req.body;

    if (!name) return res.status(400).json({ error: "Name is required" });
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return res.status(400).json({ error: "Invalid email format" });
    if (!CPF || !/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(CPF))
      return res
        .status(400)
        .json({ error: "Invalid CPF format (must be XXX.XXX.XXX-XX)" });
    if (!password || !passwordRegex.test(password))
      return res.status(400).json({
        error:
          "The password must have at least 8 characters, one uppercase letter, one number and one special character",
      });
    if (!type) return res.status(400).json({ error: "Type is required" });

    const user = await UserModel.create({
      name,
      email,
      CPF,
      password,
      type,
      url_img: url_img || null,
    });

    res.status(201).json(user);
  } catch (error) {
    console.error("createUser error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateUser = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const user = await UserModel.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const { name, password, url_img } = req.body;

    if (name !== undefined) {
      if (!name.trim()) {
        return res.status(400).json({ error: "Name is required" });
      }
      user.name = name;
    }

    if (password !== undefined && password.trim()) {
      if (!passwordRegex.test(password)) {
        return res.status(400).json({
          error:
            "The password must have at least 8 characters, one uppercase letter, one number and one special character",
        });
      }
      user.password = password;
    }

    if (url_img !== undefined) {
      user.url_img = url_img || null;
    }

    await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.error("updateUser error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const destroyUserById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const user = await UserModel.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await user.destroy();
    res.status(204).send();
  } catch (error) {
    console.error("destroyUserById error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
