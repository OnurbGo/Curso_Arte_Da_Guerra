import { Request, Response } from "express";
import InscriptionModel from "../models/InscriptionModel";

export const getAll = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    if (!user || !user.id) {
      return res.status(401).json({ error: "Usuário não autenticado" });
    }
    
    const { class_id } = req.query;
    let inscriptions;
    if (class_id) {
      const c = Number(class_id);
      inscriptions = await InscriptionModel.findAll({
        where: { user_id: user.id, class_id: c },
      });
    } else {
      inscriptions = await InscriptionModel.findAll({
        where: { user_id: user.id },
      });
    }
    return res.json(inscriptions);
  } catch (err: any) {
    return res
      .status(500)
      .json({ error: "Erro interno no servidor: " + err.message });
  }
};

export const getInscriptionById = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    if (!user || !user.id) {
      return res.status(401).json({ error: "Usuário não autenticado" });
    }
    const inscription = await InscriptionModel.findByPk(req.params.id);
    if (!inscription) {
      return res.status(404).json({ error: "Inscription not found" });
    }
    if (inscription.user_id !== user.id) {
      return res.status(403).json({ error: "Acesso negado" });
    }
    return res.json(inscription);
  } catch (err: any) {
    return res
      .status(500)
      .json({ error: "Erro interno no servidor: " + err.message });
  }
};

export const createInscription = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    if (!user || !user.id) {
      return res.status(401).json({ error: "Usuário não autenticado" });
    }
    const { class_id } = req.body;
    if (!class_id) {
      return res.status(400).json({ error: "Class_id is required" });
    }
    const newIns = await InscriptionModel.create({
      user_id: user.id,
      class_id,
    });
    return res.status(201).json(newIns);
  } catch (err: any) {
    return res
      .status(500)
      .json({ error: "Erro interno no servidor: " + err.message });
  }
};

export const updateInscription = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    if (!user || !user.id) {
      return res.status(401).json({ error: "Usuário não autenticado" });
    }
    const { class_id } = req.body;
    if (!class_id) {
      return res.status(400).json({ error: "Class_id is required" });
    }
    const ins = await InscriptionModel.findByPk(req.params.id);
    if (!ins) {
      return res.status(404).json({ error: "Inscription not found" });
    }
    if (ins.user_id !== user.id) {
      return res.status(403).json({ error: "Acesso negado" });
    }
    ins.class_id = class_id;
    await ins.save();
    return res.json(ins);
  } catch (err: any) {
    return res
      .status(500)
      .json({ error: "Erro interno no servidor: " + err.message });
  }
};

export const destroyInscriptionById = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    if (!user || !user.id) {
      return res.status(401).json({ error: "Usuário não autenticado" });
    }
    const ins = await InscriptionModel.findByPk(req.params.id);
    if (!ins) {
      return res.status(404).json({ error: "Inscription not found" });
    }

    if (ins.user_id !== user.id) {
      return res.status(403).json({ error: "Acesso negado" });
    }
    await ins.destroy();
    return res.status(204).send();
  } catch (err: any) {
    return res
      .status(500)
      .json({ error: "Erro interno no servidor: " + err.message });
  }
};
