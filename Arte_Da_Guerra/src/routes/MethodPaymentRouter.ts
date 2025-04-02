import express from "express";
import {
  createMethodPayment,
  destroyMethodPaymentById,
  getAll,
  getMethodPaymentById,
  updateMethodPayment,
} from "../controllers/MethodPaymentController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/methodpayment", authMiddleware, getAll);
router.get("/methodpayment/:id", authMiddleware, getMethodPaymentById);
router.post("/methodpayment", authMiddleware, createMethodPayment);
router.put("/methodpayment/:id", authMiddleware, updateMethodPayment);
router.delete("/methodpayment/:id", authMiddleware, destroyMethodPaymentById);

export default router;
