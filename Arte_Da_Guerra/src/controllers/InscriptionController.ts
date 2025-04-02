import { Request, Response } from "express";
import InscriptionModel from "../models/InscriptionModel";

export const getAll = async (req: Request, res: Response) => {
  const inscription = await InscriptionModel.findAll();
  res.send(inscription);
};

export const getInscriptionById = async (req: Request, res: Response) => {
  try {
    const inscription = await InscriptionModel.findByPk(req.params.id);
    if (!inscription)
      return res.status(404).json({ error: "inscription not found" });
    res.status(200).json(inscription);
  } catch (error) {
    res.status(500).json({ error: "Internal server error: " + error });
  }
};

export const createInscription = async (req: Request, res: Response) => {
  try {
    const { user_id, class_id, status } = req.body;

    if (!user_id || user_id === "") {
      return res.status(400).json({ error: "User_id is Required" });
    }

    if (!class_id || class_id === "") {
      return res.status(400).json({ error: "Class_id is Required" });
    }

    if (!status || status === "") {
      return res.status(400).json({ error: "Status is Required" });
    }

    const inscription = await InscriptionModel.create({
      user_id,
      class_id,
      status,
    });
    res.status(201).json(inscription);
  } catch (error) {
    res.status(500).json("Erro interno no Servidor: " + error);
  }
};

export const updateInscription = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { user_id, class_id, status } = req.body;

    if (!user_id || user_id === "") {
      return res.status(400).json({ error: "User_id is required" });
    }

    if (!class_id || class_id === "") {
      return res.status(400).json({ error: "Class_id is Required" });
    }

    if (!status || status === "") {
      return res.status(400).json({ error: "Status is required" });
    }

    const inscription = await InscriptionModel.findByPk(req.params.id);
    if (!inscription) {
      return res.status(404).json({ error: "Inscription not found" });
    }

    inscription.user_id = user_id;
    inscription.class_id = class_id;
    inscription.status = status;

    await inscription.save();
    res.status(201).json(inscription);
  } catch (error) {
    res.status(500).json("Erro interno no servidor " + error);
  }
};

export const destroyInscriptionById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const inscription = await InscriptionModel.findByPk(req.params.id);
    if (!inscription) {
      return res.status(404).json({ error: "User not found" });
    }

    await inscription.destroy();

    res.status(204).send();
  } catch (error) {
    res.status(500).json("Erro interno no servidor " + error);
  }
};
