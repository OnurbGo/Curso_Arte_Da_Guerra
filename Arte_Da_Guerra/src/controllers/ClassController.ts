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
    const { name } = req.body;

    if (!name || name === "") {
      return res.status(400).json({ error: "Name is Required" });
    }

    const Class = await ClassModel.create({
      name,
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
    const { title, description, price, creation_date } = req.body;
    if (!title || title === "") {
      return res.status(400).json({ error: "Title is required" });
    }

    if (!description || description === "") {
      return res.status(400).json({ error: "Description is required" });
    }

    if (!price || price === "") {
      return res.status(400).json({ error: "Price is required" });
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
    Class.price = price;
    Class.creation_date = creation_date;

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
