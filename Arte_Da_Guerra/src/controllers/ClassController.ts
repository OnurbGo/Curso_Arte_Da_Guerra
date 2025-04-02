import { Request, Response } from "express";
import { Op } from "sequelize";
import ClassModel from "../models/ClassModel";

export const getAll = async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const offset = (page - 1) * limit;
  const query = req.query.q ? String(req.query.q) : "";
  const field = req.query.field ? String(req.query.field) : "Nome do curso";

  try {
    let whereClause = {};
    if (query) {
      if (field === "Nome do curso") {
        whereClause = { title: { [Op.like]: `%${query}%` } };
      } else if (field === "Descrição do curso") {
        whereClause = { description: { [Op.like]: `%${query}%` } };
      }
    }

    const classes = await ClassModel.findAndCountAll({
      where: whereClause,
      offset,
      limit,
    });
    res.json({ data: classes.rows, total: classes.count });
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor", details: error });
  }
};

export const getClassById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const classItem = await ClassModel.findByPk(req.params.id);
    if (!classItem) {
      return res.status(404).json({ error: "Classe não encontrada" });
    }
    return res.json(classItem);
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor", details: error });
  }
};

export const createClass = async (req: Request, res: Response) => {
  try {
    const { master_id, title, description, url_img, url_img_banner } = req.body;

    if (!master_id) {
      return res.status(400).json({ error: "ID do mestre é obrigatório" });
    }
    if (!title) {
      return res.status(400).json({ error: "Título é obrigatório" });
    }
    if (!description) {
      return res.status(400).json({ error: "Descrição é obrigatória" });
    }
    if (!url_img) {
      return res.status(400).json({ error: "URL da imagem é obrigatória" });
    }
    if (!url_img_banner) {
      return res
        .status(400)
        .json({ error: "URL da imagem do banner é obrigatória" });
    }

    const classItem = await ClassModel.create({
      master_id,
      title,
      description,
      url_img,
      url_img_banner,
    });
    res.status(201).json(classItem);
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor", details: error });
  }
};

export const updateClass = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { master_id, title, description, url_img, url_img_banner } = req.body;

    if (!master_id) {
      return res.status(400).json({ error: "ID do mestre é obrigatório" });
    }
    if (!title) {
      return res.status(400).json({ error: "Título é obrigatório" });
    }
    if (!description) {
      return res.status(400).json({ error: "Descrição é obrigatória" });
    }
    if (!url_img) {
      return res.status(400).json({ error: "URL da imagem é obrigatória" });
    }
    if (!url_img_banner) {
      return res
        .status(400)
        .json({ error: "URL da imagem do banner é obrigatória" });
    }

    const classItem = await ClassModel.findByPk(req.params.id);
    if (!classItem) {
      return res.status(404).json({ error: "Classe não encontrada" });
    }

    classItem.master_id = master_id;
    classItem.title = title;
    classItem.description = description;
    classItem.url_img = url_img;
    classItem.url_img_banner = url_img_banner;

    await classItem.save();
    res.status(200).json(classItem);
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor", details: error });
  }
};

export const destroyClassById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const classItem = await ClassModel.findByPk(req.params.id);
    if (!classItem) {
      return res.status(404).json({ error: "Classe não encontrada" });
    }
    await classItem.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor", details: error });
  }
};
