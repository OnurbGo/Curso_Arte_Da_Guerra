import { Request, Response } from "express";
import TeachersModel from "../models/TeachersModel";

export const getAll = async (req: Request, res: Response) => {
  const teachers = await TeachersModel.findAll();
  res.send(teachers);
};

export const getTeachersById = async (
  req: Request<{ id: number }>,
  res: Response
) => {
  const teachers = await TeachersModel.findByPk(req.params.id);
  return res.json(teachers);
};

export const createTeachers = async (req: Request, res: Response) => {
  try {
    const { name, email, password, type, registration_date } = req.body;

    if (!name || name === "") {
      return res.status(400).json({ error: "Name is Required" });
    }

    if (!email || email === "") {
      return res.status(400).json({ error: "Email is Required" });
    }

    if (!password || password === "") {
      return res.status(400).json({ error: "Password is Required" });
    }

    if (!type || type === "") {
      return res.status(400).json({ error: "Type is Required" });
    }

    const teachers = await TeachersModel.create({
      name,
      email,
      password,
      type,
      registration_date,
    });
    res.status(201).json(teachers);
  } catch (error) {
    res.status(500).json("Erro interno no Servidor: " + error);
  }
};

export const updateTeachers = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { biography, expertise } = req.body;
    if (!biography || biography === "") {
      return res.status(400).json({ error: "Biography is required" });
    }

    if (!expertise || expertise === "") {
      return res.status(400).json({ error: "Expertise is required" });
    }

    const teachers = await TeachersModel.findByPk(req.params.id);
    if (!teachers) {
      return res.status(404).json({ error: "Teacher not found" });
    }

    teachers.biography = biography;
    teachers.expertise = expertise;

    await teachers.save();
    res.status(201).json(teachers);
  } catch (error) {
    res.status(500).json("Erro interno no servidor " + error);
  }
};

export const destroyTeachersById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const teachers = await TeachersModel.findByPk(req.params.id);
    if (!teachers) {
      return res.status(404).json({ error: "User not found" });
    }

    await teachers.destroy();

    res.status(204).send();
  } catch (error) {
    res.status(500).json("Erro interno no servidor " + error);
  }
};
