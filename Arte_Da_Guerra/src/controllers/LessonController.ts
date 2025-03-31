import { Request, Response } from "express";
import LessonModel from "../models/LessonModel";
import ClassModel from "../models/ClassModel";

export const getAll = async (req: Request, res: Response) => {
  const { class_id } = req.query;
  try {
    const lessons = class_id
      ? await LessonModel.findAll({ where: { class_id: Number(class_id) } })
      : await LessonModel.findAll();
    res.json(lessons);
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

export const getAllClasses = async (req: Request, res: Response) => {
  const classes = await ClassModel.findAll();
  res.send(classes);
};

export const getClassById = async (
  req: Request<{ id: number }>,
  res: Response
) => {
  const Class = await ClassModel.findByPk(req.params.id);
  if (!Class) {
    return res.status(404).json({ error: "Class not found" });
  }
  return res.json(Class);
};

export const createClass = async (req: Request, res: Response) => {
  try {
    const { master_id, title, description, url_img, url_img_banner } = req.body;

    if (!master_id || master_id === "") {
      return res.status(400).json({ error: "Title is required" });
    }

    if (!title || title === "") {
      return res.status(400).json({ error: "Title is required" });
    }

    if (!description || description === "") {
      return res.status(400).json({ error: "Description is required" });
    }

    if (!url_img || url_img === "") {
      return res.status(400).json({ error: "Url Image is required" });
    }

    if (!url_img_banner || url_img_banner === "") {
      return res.status(400).json({ error: "Url banner Image is required" });
    }

    const Class = await ClassModel.create({
      master_id,
      title,
      description,
      url_img,
      url_img_banner,
    });
    res.status(201).json(Class);
  } catch (error) {
    res.status(500).json("Erro interno no Servidor: " + error);
  }
};

export const updateClass = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { master_id, title, description } = req.body;
    if (!master_id || master_id === "") {
      return res.status(400).json({ error: "Title is required" });
    }

    if (!title || title === "") {
      return res.status(400).json({ error: "Title is required" });
    }

    if (!description || description === "") {
      return res.status(400).json({ error: "Description is required" });
    }

    const Class = await ClassModel.findByPk(req.params.id);
    if (!Class) {
      return res.status(404).json({ error: "Class not found" });
    }

    Class.title = title;
    Class.description = description;

    await Class.save();
    res.status(201).json(Class);
  } catch (error) {
    res.status(500).json("Erro interno no servidor " + error);
  }
};

export const destroyClassById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const Class = await ClassModel.findByPk(req.params.id);
    if (!Class) {
      return res.status(404).json({ error: "User not found" });
    }

    await Class.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json("Erro interno no servidor " + error);
  }
};
