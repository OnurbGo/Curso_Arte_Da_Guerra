import express from "express";
import {
  createInscription,
  destroyInscriptionById,
  getAll,
  getInscriptionById,
  updateInscription,
} from "../controllers/InscriptionController";

const router = express.Router();

router.get("/inscription", getAll);
router.get("/inscription/:id", getInscriptionById);
router.post("/inscription", createInscription);
router.put("/inscription/:id", updateInscription);
router.delete("/inscription/:id", destroyInscriptionById);

export default router;
