import { Request, Response } from "express";
import TeachersModel from "../models/TeachersModel";
import UserModel from "../models/UserModel";

export const getAll = async (req: Request, res: Response) => {
  try {
    const teachers = await TeachersModel.findAll({
      include: [
        {
          model: UserModel,
          attributes: ["name"],
        },
      ],
    });
    res.send(teachers);
  } catch (error) {
    res.status(500).json("Erro interno no servidor: " + error);
  }
};

export const getTeachersById = async (
  req: Request<{ id: number }>,
  res: Response
) => {
  try {
    const teacher = await TeachersModel.findByPk(req.params.id, {
      include: [
        {
          model: UserModel,
          attributes: ["name"], // Retorna o campo 'name' do usuário
        },
      ],
    });

    if (!teacher) {
      return res.status(404).json({ error: "Teacher not found" });
    }

    return res.json(teacher);
  } catch (error) {
    return res.status(500).json("Erro interno no servidor: " + error);
  }
};

export const createTeachers = async (req: Request, res: Response) => {
  try {
    const { user_id, biography, expertise } = req.body;

    if (!user_id || user_id === "") {
      return res.status(400).json({ error: "User_id is required" });
    }

    if (!biography || biography === "") {
      return res.status(400).json({ error: "Biography is required" });
    }

    if (!expertise || expertise === "") {
      return res.status(400).json({ error: "Expertise is required" });
    }

    const teacher = await TeachersModel.create({
      user_id,
      biography,
      expertise,
    });
    res.status(201).json(teacher);
  } catch (error) {
    res.status(500).json("Erro interno no Servidor: " + error);
  }
};

export const updateTeachers = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { user_id, biography, expertise } = req.body;
    if (!user_id || user_id === "") {
      return res.status(400).json({ error: "User_id is required" });
    }

    if (!biography || biography === "") {
      return res.status(400).json({ error: "Biography is required" });
    }

    if (!expertise || expertise === "") {
      return res.status(400).json({ error: "Expertise is required" });
    }

    const teacher = await TeachersModel.findByPk(req.params.id);
    if (!teacher) {
      return res.status(404).json({ error: "Teacher not found" });
    }

    teacher.user_id = user_id;
    teacher.biography = biography;
    teacher.expertise = expertise;

    await teacher.save();
    res.status(201).json(teacher);
  } catch (error) {
    res.status(500).json("Erro interno no servidor " + error);
  }
};

export const destroyTeachersById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const teacher = await TeachersModel.findByPk(req.params.id);
    if (!teacher) {
      return res.status(404).json({ error: "User not found" });
    }

    await teacher.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json("Erro interno no servidor " + error);
  }
};
