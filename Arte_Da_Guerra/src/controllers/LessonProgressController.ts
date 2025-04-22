// src/controllers/LessonProgressController.ts
import { Request, Response } from "express";
import { Op } from "sequelize";
import LessonProgressModel from "../models/LessonProgressModel";
import LessonModel from "../models/LessonModel";

export const getProgressByClass = async (req: Request, res: Response) => {
  // Depuração: verifique se req.user foi injetado
  console.log("Req.user in getProgressByClass:", (req as any).user);
  const user = (req as any).user;
  if (!user || !user.id) {
    return res.status(401).json({ error: "Usuário não autenticado" });
  }
  const userId = user.id as number;

  const classId = Number(req.query.class_id);
  if (isNaN(classId)) {
    return res.status(400).json({ error: "class_id inválido" });
  }

  try {
    // Busca ids das lições da classe
    const lessons = await LessonModel.findAll({
      where: { class_id: classId },
      attributes: ["id"],
    });
    const lessonIds = lessons.map((l) => l.get("id") as number);

    // Busca progresso do usuário
    const progress = await LessonProgressModel.findAll({
      where: {
        user_id: userId,
        lesson_id: { [Op.in]: lessonIds },
      },
    });

    const result = progress.map((p) => ({
      lesson_id: p.lesson_id,
      status: p.status,
    }));
    return res.json(result);
  } catch (error) {
    console.error("Erro interno no método getProgressByClass:", error);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
};

export const markDone = async (req: Request, res: Response) => {
  console.log("Req.user in markDone:", (req as any).user);
  const user = (req as any).user;
  if (!user || !user.id) {
    return res.status(401).json({ error: "Usuário não autenticado" });
  }
  const userId = user.id as number;
  const { lesson_id } = req.body as { lesson_id?: number };
  if (!lesson_id) {
    return res.status(400).json({ error: "lesson_id é obrigatório" });
  }

  try {
    const [row, created] = await LessonProgressModel.findOrCreate({
      where: { user_id: userId, lesson_id },
      defaults: { user_id: userId, lesson_id, status: "done" },
    });

    if (!created) {
      row.status = "done";
      await row.save();
    }

    return res
      .status(200)
      .json({ lesson_id: row.lesson_id, status: row.status });
  } catch (error) {
    console.error("Erro interno no método markDone:", error);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
};

export const unmarkDone = async (req: Request, res: Response) => {
  console.log("Req.user in unmarkDone:", (req as any).user);
  const user = (req as any).user;
  if (!user || !user.id) {
    return res.status(401).json({ error: "Usuário não autenticado" });
  }
  const userId = user.id as number;
  const { lesson_id } = req.body as { lesson_id?: number };
  if (!lesson_id) {
    return res.status(400).json({ error: "lesson_id é obrigatório" });
  }

  try {
    const row = await LessonProgressModel.findOne({
      where: { user_id: userId, lesson_id },
    });
    if (!row) {
      return res.status(404).json({ error: "Progresso não encontrado" });
    }

    row.status = "not_done";
    await row.save();

    return res
      .status(200)
      .json({ lesson_id: row.lesson_id, status: row.status });
  } catch (error) {
    console.error("Erro interno no método unmarkDone:", error);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
};
