import { Request, Response } from "express";
import ClassModel from "../models/ClassModel";

export const getAll = async (req: Request, res: Response) => {
  const Class = await ClassModel.findAll();
  res.send(Class);
};

export const getClassById = async (
  req: Request<{ id: number }>,
  res: Response
) => {
  const Class = await ClassModel.findByPk(req.params.id);
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
    const { master_id, title, description, url_img, url_img_banner } = req.body;

    if (!master_id || master_id === "") {
      return res.status(400).json({ error: "Master ID is required" });
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

    const Class = await ClassModel.findByPk(req.params.id);
    if (!Class) {
      return res.status(404).json({ error: "Class not found" });
    }

    // Atualiza os campos, incluindo as URLs da imagem e do banner
    Class.title = title;
    Class.description = description;
    Class.url_img = url_img;
    Class.url_img_banner = url_img_banner;

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
