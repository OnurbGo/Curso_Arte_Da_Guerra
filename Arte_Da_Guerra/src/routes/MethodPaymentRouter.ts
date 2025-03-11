import express from "express";
import {
  createMethodPayment,
  destroyMethodPaymentById,
  getAll,
  getMethodPaymentById,
  updateMethodPayment,
} from "../controllers/MethodPaymentController";

const router = express.Router();

router.get("/methodpayment", getAll);
router.get("/methodpayment/:id", getMethodPaymentById);
router.post("/methodpayment", createMethodPayment);
router.put("/methodpayment/:id", updateMethodPayment);
router.delete("/methodpayment/:id", destroyMethodPaymentById);

export default router;
