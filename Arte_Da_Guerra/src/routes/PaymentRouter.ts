import express from "express";
import {
  createPayment,
  destroyPaymentById,
  getAll,
  getPaymentById,
  updatePayment,
} from "../controllers/PaymentController";

const router = express.Router();

router.get("/payment", getAll);
router.get("/payment/:id", getPaymentById);
router.post("/payment", createPayment);
router.put("/payment/:id", updatePayment);
router.delete("/payment/:id", destroyPaymentById);

export default router;
