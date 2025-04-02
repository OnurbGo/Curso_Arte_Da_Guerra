import express from "express";
import {
  createPayment,
  destroyPaymentById,
  getAll,
  getPaymentById,
  updatePayment,
} from "../controllers/PaymentController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/payment", authMiddleware, getAll);
router.get("/payment/:id", authMiddleware, getPaymentById);
router.post("/payment", authMiddleware, createPayment);
router.put("/payment/:id", authMiddleware, updatePayment);
router.delete("/payment/:id", authMiddleware, destroyPaymentById);

export default router;
