import { Request, Response } from "express";
import LessonModel from "../models/LessonModel";

export const getAll = async (req: Request, res: Response) => {
  const lesson = await LessonModel.findAll();
  res.send(lesson);
};

export const getLessonById = async (
  req: Request<{ id: number }>,
  res: Response
) => {
  const lesson = await LessonModel.findByPk(req.params.id);
  return res.json(lesson);
};

export const createLesson = async (req: Request, res: Response) => {
  try {
    const { class_id, title, description, video_url, order } = req.body;

    if (!class_id || class_id === "") {
      return res.status(400).json({ error: "Value is required" });
    }

    if (!title || title === "") {
      return res.status(400).json({ error: "Value is required" });
    }

    if (!description || description === "") {
      return res.status(400).json({ error: "Description is required" });
    }

    if (!video_url || video_url === "") {
      return res.status(400).json({ error: "Video_url is required" });
    }

    if (!order || order === "") {
      return res.status(400).json({ error: "Video_url is required" });
    }

    const lesson = await LessonModel.create({
      class_id,
      title,
      description,
      video_url,
      order,
    });
    res.status(201).json(lesson);
  } catch (error) {
    res.status(500).json("Erro interno no Servidor: " + error);
  }
};

export const updateLesson = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { class_id, title, description, video_url, order } = req.body;
    if (!class_id || class_id === "") {
      return res.status(400).json({ error: "Value is required" });
    }

    if (!title || title === "") {
      return res.status(400).json({ error: "Value is required" });
    }

    if (!description || description === "") {
      return res.status(400).json({ error: "Description is required" });
    }

    if (!video_url || video_url === "") {
      return res.status(400).json({ error: "Video_url is required" });
    }

    if (!order || order === "") {
      return res.status(400).json({ error: "Video_url is required" });
    }

    const lesson = await LessonModel.findByPk(req.params.id);
    if (!lesson) {
      return res.status(404).json({ error: "Lesson not found" });
    }

    lesson.class_id = class_id;
    lesson.title = title;
    lesson.description = description;
    lesson.video_url = video_url;
    lesson.order = order;

    await lesson.save();
    res.status(201).json(lesson);
  } catch (error) {
    res.status(500).json("Erro interno no servidor " + error);
  }
};

export const destroyLessonById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const lesson = await LessonModel.findByPk(req.params.id);
    if (!lesson) {
      return res.status(404).json({ error: "User not found" });
    }

    await lesson.destroy();

    res.status(204).send();
  } catch (error) {
    res.status(500).json("Erro interno no servidor " + error);
  }
};
