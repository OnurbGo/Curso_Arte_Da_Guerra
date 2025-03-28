import { Request, Response } from "express";
import LessonModel from "../models/LessonModel";
import ClassModel from "../models/ClassModel";

// Função para pegar todas as lições ou filtrar por class_id (via query string)
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

// Função para pegar uma lição pelo ID
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

// Função para pegar lições de uma classe específica (filtragem por class_id via parâmetro)
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

// Função para criar lição
export const createLesson = async (req: Request, res: Response) => {
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
      return res.status(400).json({ error: "Image url is required" });
    }

    const lesson = await LessonModel.create({
      class_id,
      title,
      description,
      url_video,
      url_img,
    });
    res.status(201).json(lesson);
  } catch (error) {
    res.status(500).json("Erro interno no Servidor: " + error);
  }
};

// Função para atualizar lição
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

// Função para destruir lição por ID
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

// Função para pegar todas as classes
export const getAllClasses = async (req: Request, res: Response) => {
  const classes = await ClassModel.findAll();
  res.send(classes);
};

// Função para pegar uma classe pelo ID
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

// Função para criar classe
export const createClass = async (req: Request, res: Response) => {
  try {
    const {
      master_id,
      title,
      description,
      creation_date,
      url_img,
      url_img_banner,
    } = req.body;

    if (!master_id || master_id === "") {
      return res.status(400).json({ error: "Title is required" });
    }

    if (!title || title === "") {
      return res.status(400).json({ error: "Title is required" });
    }

    if (!description || description === "") {
      return res.status(400).json({ error: "Description is required" });
    }

    if (!creation_date || creation_date === "") {
      return res.status(400).json({ error: "Creation date is required" });
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
      creation_date,
      url_img,
      url_img_banner,
    });
    res.status(201).json(Class);
  } catch (error) {
    res.status(500).json("Erro interno no Servidor: " + error);
  }
};

// Função para atualizar classe
export const updateClass = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { master_id, title, description, creation_date } = req.body;
    if (!master_id || master_id === "") {
      return res.status(400).json({ error: "Title is required" });
    }

    if (!title || title === "") {
      return res.status(400).json({ error: "Title is required" });
    }

    if (!description || description === "") {
      return res.status(400).json({ error: "Description is required" });
    }

    if (!creation_date || creation_date === "") {
      return res.status(400).json({ error: "Creation_date is required" });
    }

    const Class = await ClassModel.findByPk(req.params.id);
    if (!Class) {
      return res.status(404).json({ error: "Class not found" });
    }

    Class.title = title;
    Class.description = description;
    Class.creation_date = creation_date;

    await Class.save();
    res.status(201).json(Class);
  } catch (error) {
    res.status(500).json("Erro interno no servidor " + error);
  }
};

// Função para destruir classe por ID
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
