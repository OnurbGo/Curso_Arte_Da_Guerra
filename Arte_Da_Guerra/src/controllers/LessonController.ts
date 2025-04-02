import { Request, Response } from "express";
import LessonModel from "../models/LessonModel";
import ClassModel from "../models/ClassModel";

export const getAll = async (req: Request, res: Response) => {
  const { class_id } = req.query;
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const offset = (page - 1) * limit;
  try {
    let lessons; 
    if (class_id) {
      lessons = await LessonModel.findAndCountAll({
        where: { class_id: Number(class_id) },
        offset,
        limit,
      });
    } else {
      lessons = await LessonModel.findAndCountAll({ offset, limit });
    }
    res.json({ data: lessons.rows, total: lessons.count });
  } catch (error) {
    res.status(500).json("Erro interno no servidor: " + error);
  }
};

export const getLessonById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const lesson = await LessonModel.findByPk(Number(req.params.id));
    if (!lesson) {
      return res.status(404).json({ error: "Lesson not found" });
    }
    return res.json(lesson);
  } catch (error) {
    res.status(500).json("Erro interno no servidor: " + error);
  }
};

export const getLessonsByClassId = async (
  req: Request<{ class_id: string }>,
  res: Response
) => {
  const { class_id } = req.params;
  try {
    const lessons = await LessonModel.findAll({
      where: { class_id: Number(class_id) },
    });
    if (!lessons.length) {
      return res
        .status(404)
        .json({ error: "Nenhuma lição encontrada para esta classe." });
    }
    res.json(lessons);
  } catch (error) {
    res.status(500).json("Erro interno no servidor: " + error);
  }
};

export const createLesson = async (req: Request, res: Response) => {
  try {
    const { classId } = req.params;
    const { title, description, url_video, url_img } = req.body;

    const classExist = await ClassModel.findByPk(classId);
    if (!classExist) {
      return res.status(404).json({ error: "Class not found" });
    }

    if (!title || title === "") {
      return res.status(400).json({ error: "Title is required" });
    }
    if (!description || description === "") {
      return res.status(400).json({ error: "Description is required" });
    }
    if (!url_video || url_video === "") {
      return res.status(400).json({ error: "Video URL is required" });
    }
    if (!url_img || url_img === "") {
      return res.status(400).json({ error: "Image URL is required" });
    }

    const lesson = await LessonModel.create({
      class_id: classId,
      title,
      description,
      url_video,
      url_img,
    });

    res.status(201).json(lesson);
  } catch (error) {
    res.status(500).json("Erro interno no servidor: " + error);
  }
};

export const updateLesson = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { class_id, title, description, url_video, url_img } = req.body;
    if (!class_id || class_id === "") {
      return res.status(400).json({ error: "Value is required" });
    }
    if (!title || title === "") {
      return res.status(400).json({ error: "Value is required" });
    }
    if (!description || description === "") {
      return res.status(400).json({ error: "Description is required" });
    }
    if (!url_video || url_video === "") {
      return res.status(400).json({ error: "Video url is required" });
    }
    if (!url_img || url_img === "") {
      return res.status(400).json({ error: "Img url is required" });
    }

    const lesson = await LessonModel.findByPk(req.params.id);
    if (!lesson) {
      return res.status(404).json({ error: "Lesson not found" });
    }

    lesson.class_id = class_id;
    lesson.title = title;
    lesson.description = description;
    lesson.url_video = url_video;
    lesson.url_img = url_img;

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
      return res.status(404).json({ error: "Lesson not found" });
    }
    await lesson.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json("Erro interno no servidor " + error);
  }
};
