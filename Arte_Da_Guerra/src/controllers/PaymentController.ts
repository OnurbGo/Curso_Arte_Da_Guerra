import { Request, Response } from "express";
import PaymentModel from "../models/PaymentModel";

export const getAll = async (req: Request, res: Response) => {
  const payment = await PaymentModel.findAll();
  res.send(payment);
};

export const getPaymentById = async (
  req: Request<{ id: number }>,
  res: Response
) => {
  const payment = await PaymentModel.findByPk(req.params.id);
  return res.json(payment);
};

export const createPayment = async (req: Request, res: Response) => {
  try {
    const { user_id, methodpayment_id, class_id, value, payment_date, status } =
      req.body;

    if (!user_id || user_id === "") {
      return res.status(400).json({ error: "User_id is required" });
    }

    if (!methodpayment_id || methodpayment_id === "") {
      return res.status(400).json({ error: "Methodpayment_id is required" });
    }

    if (!class_id || class_id === "") {
      return res.status(400).json({ error: "Class_id is required" });
    }

    if (!value || value === "") {
      return res.status(400).json({ error: "Value is required" });
    }

    if (!payment_date || payment_date === "") {
      return res.status(400).json({ error: "Paymente_date is required" });
    }

    if (!status || status === "") {
      return res.status(400).json({ error: "Status is required" });
    }

    const payment = await PaymentModel.create({
      user_id,
      methodpayment_id,
      class_id,
      value,
      payment_date,
      status,
    });
    res.status(201).json(payment);
  } catch (error) {
    res.status(500).json("Erro interno no Servidor: " + error);
  }
};

export const updatePayment = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { user_id, methodpayment_id, class_id, value, payment_date, status } =
      req.body;
    if (!user_id || user_id === "") {
      return res.status(400).json({ error: "User_id is required" });
    }

    if (!methodpayment_id || methodpayment_id === "") {
      return res.status(400).json({ error: "Methodpayment_id is required" });
    }

    if (!class_id || class_id === "") {
      return res.status(400).json({ error: "Class_id is required" });
    }

    if (!value || value === "") {
      return res.status(400).json({ error: "Value is required" });
    }

    if (!payment_date || payment_date === "") {
      return res.status(400).json({ error: "Paymente_date is required" });
    }

    if (!status || status === "") {
      return res.status(400).json({ error: "Status is required" });
    }

    const payment = await PaymentModel.findByPk(req.params.id);
    if (!payment) {
      return res.status(404).json({ error: "Payment not found" });
    }

    payment.user_id = user_id;
    payment.methodpayment_id = methodpayment_id;
    payment.class_id = class_id;
    payment.value = value;
    payment.payment_date = payment_date;
    payment.status = status;

    await payment.save();
    res.status(201).json(payment);
  } catch (error) {
    res.status(500).json("Erro interno no servidor " + error);
  }
};

export const destroyPaymentById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const payment = await PaymentModel.findByPk(req.params.id);
    if (!payment) {
      return res.status(404).json({ error: "User not found" });
    }

    await payment.destroy();

    res.status(204).send();
  } catch (error) {
    res.status(500).json("Erro interno no servidor " + error);
  }
};
