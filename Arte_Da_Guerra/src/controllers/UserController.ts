import { Request, Response } from "express";
import UserModel from "../models/UserModel";

export const getAll = async (req: Request, res: Response) => {
  const users = await UserModel.findAll();
  res.send(users);
};

export const getUserById = async (
  req: Request<{ id: number }>,
  res: Response
) => {
  const users = await UserModel.findByPk(req.params.id);
  return res.json(users);
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, CPF, password, type, registration_date } = req.body;

    if (!name || name === "") {
      return res.status(400).json({ error: "Name is Required" });
    }

    if (!email || email === "") {
      return res.status(400).json({ error: "Email is Required" });
    }

    if (!CPF || CPF === "") {
      return res.status(400).json({ error: "CPF is Required" });
    }

    if (!password || password === "") {
      return res.status(400).json({ error: "Password is Required" });
    }

    if (!type || type === "") {
      return res.status(400).json({ error: "Type is Required" });
    }

    const user = await UserModel.create({
      name,
      email,
      CPF,
      password,
      type,
      registration_date,
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json("Erro interno no Servidor: " + error);
  }
};

export const updateUser = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { name, email, CPF, password, type, registration_date } = req.body;
    const loggedUser = req.body.user;
    console.log("logged", loggedUser);

    if (!name || name === "") {
      return res.status(400).json({ error: "Name is required" });
    }

    if (!email || email === "") {
      return res.status(400).json({ error: "Email is required" });
    }

    if (!CPF || CPF === "") {
      return res.status(400).json({ error: "CPF is Required" });
    }

    if (!password || password === "") {
      return res.status(400).json({ error: "Password is required" });
    }

    if (!type || type === "") {
      return res.status(400).json({ error: "Type is required" });
    }

    if (!registration_date || registration_date === "") {
      return res.status(400).json({ error: "Registration_date is required" });
    }

    const user = await UserModel.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.name = name;
    user.email = email;
    user.CPF = CPF;
    user.password = password;
    user.type = type;
    user.registration_date = registration_date;
    user.uptdatedBy = loggedUser.id;

    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json("Erro interno no servidor " + error);
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
    res.status(500).json("Erro interno no servidor " + error);
  }
};
