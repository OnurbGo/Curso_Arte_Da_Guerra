import { Request, Response } from "express";
import sequelize from "../config/database";
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

export const getTeachersById = async (req: Request, res: Response) => {
  try {
    const teacher = await TeachersModel.findByPk(req.params.id, {
      include: [
        {
          model: UserModel,
          attributes: ["name"],
        },
      ],
    });
    if (!teacher) {
      return res.status(404).json({ error: "Professor não encontrado" });
    }
    res.status(200).json(teacher);
  } catch (error) {
    return res.status(500).json("Erro interno no servidor: " + error);
  }
};

export const createTeachers = async (req: Request, res: Response) => {
  try {
    const { user_id, biography, expertise } = req.body;
    if (!user_id) {
      return res.status(400).json({ error: "User_id é obrigatório" });
    }
    const user = await UserModel.findByPk(user_id);
    if (!user) {
      return res.status(400).json({ error: "Usuário não encontrado" });
    }
    if (user.type !== "teacher") {
      return res.status(400).json({ error: "Este usuário não é um professor" });
    }
    if (!biography) {
      return res.status(400).json({ error: "Biografia é obrigatória" });
    }
    if (!expertise) {
      return res.status(400).json({ error: "Especialização é obrigatória" });
    }
    const teacher = await TeachersModel.create({
      user_id,
      biography,
      expertise,
    });
    res.status(201).json(teacher);
  } catch (error) {
    res.status(500).json("Erro interno no servidor: " + error);
  }
};

export const updateTeachers = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const transaction = await sequelize.transaction();
  try {
    const { name, password, biography, expertise } = req.body;
    if (!name || !biography || !expertise) {
      await transaction.rollback();
      return res
        .status(400)
        .json({ error: "Name, biografia e especialização são obrigatórios" });
    }
    const teacher = await TeachersModel.findByPk(req.params.id, {
      transaction,
    });
    if (!teacher) {
      await transaction.rollback();
      return res.status(404).json({ error: "Professor não encontrado" });
    }
    const user = await UserModel.findByPk(teacher.user_id, { transaction });
    if (!user) {
      await transaction.rollback();
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    user.name = name;
    if (password && password.trim() !== "") {
      user.password = password;
    }
    await user.save({ transaction });
    await teacher.update({ biography, expertise }, { transaction });
    await transaction.commit();
    res.status(200).json({ user, teacher });
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ error: "Erro interno no servidor: " + error });
  }
};

export const destroyTeachersById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const transaction = await sequelize.transaction();
  try {
    const teacher = await TeachersModel.findByPk(req.params.id, {
      transaction,
    });
    if (!teacher) {
      await transaction.rollback();
      return res.status(404).json({ error: "Professor não encontrado" });
    }
    const user = await UserModel.findByPk(teacher.user_id, { transaction });
    if (!user) {
      await transaction.rollback();
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    await teacher.destroy({ transaction });
    await transaction.commit();
    res.status(204).send();
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ error: "Erro interno no servidor: " + error });
  }
};

export const getTeacherByUserId = async (
  req: Request<{ userId: string }>,
  res: Response
) => {
  try {
    const userId = Number(req.params.userId);
    if (isNaN(userId)) {
      return res.status(400).json({ error: "ID de usuário inválido" });
    }
    const teacher = await TeachersModel.findOne({ where: { user_id: userId } });
    if (!teacher) {
      return res.status(404).json({ error: "Professor não encontrado" });
    }
    res.status(200).json(teacher);
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor: " + error });
  }
};