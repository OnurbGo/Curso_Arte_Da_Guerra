import { Request, Response } from "express";
import MethodPaymentModel from "../models/MethodPaymentModel";

export const getAll = async (req: Request, res: Response) => {
  const methodPayment = await MethodPaymentModel.findAll();
  res.send(methodPayment);
};

export const getMethodPaymentById = async (
  req: Request<{ id: number }>,
  res: Response
) => {
  const methodPayment = await MethodPaymentModel.findByPk(req.params.id);
  return res.json(methodPayment);
};

export const createMethodPayment = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    if (!name || name === "") {
      return res.status(400).json({ error: "Name is Required" });
    }

    const methodPayment = await MethodPaymentModel.create({
      name,
    });
    res.status(201).json(methodPayment);
  } catch (error) {
    res.status(500).json("Erro interno no Servidor: " + error);
  }
};

export const updateMethodPayment = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { name } = req.body;
    if (!name || name === "") {
      return res.status(400).json({ error: "Title is required" });
    }

    const methodPayment = await MethodPaymentModel.findByPk(req.params.id);
    if (!methodPayment) {
      return res.status(404).json({ error: "MethodPayment not found" });
    }

    methodPayment.name = name;

    await methodPayment.save();
    res.status(201).json(methodPayment);
  } catch (error) {
    res.status(500).json("Erro interno no servidor " + error);
  }
};

export const destroyMethodPaymentById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const MethodPayment = await MethodPaymentModel.findByPk(req.params.id);
    if (!MethodPayment) {
      return res.status(404).json({ error: "User not found" });
    }

    await MethodPayment.destroy();

    res.status(204).send();
  } catch (error) {
    res.status(500).json("Erro interno no servidor " + error);
  }
};
