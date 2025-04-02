import express from "express";
import {
  createLesson,
  destroyLessonById,
  getAll,
  getLessonById,
  getLessonsByClassId,
  updateLesson,
} from "../controllers/LessonController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/lessons", authMiddleware, getAll);
router.get("/lessons/:id", authMiddleware, getLessonById);
router.get("/lessons/class/:class_id", authMiddleware, getLessonsByClassId);
router.post("/lessons", authMiddleware, createLesson);
router.put("/lessons/:id", authMiddleware, updateLesson);
router.delete("/lessons/:id", authMiddleware, destroyLessonById);

export default router;
