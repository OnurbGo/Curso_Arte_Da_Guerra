import express from "express";
import {
  createInscription,
  destroyInscriptionById,
  getAll,
  getInscriptionById,
  updateInscription,
} from "../controllers/InscriptionController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/inscription", authMiddleware, getAll);
router.get("/inscription/:id", authMiddleware, getInscriptionById);
router.post("/inscription", authMiddleware, createInscription);
router.put("/inscription/:id", authMiddleware, updateInscription);
router.delete("/inscription/:id", authMiddleware, destroyInscriptionById);

export default router;
