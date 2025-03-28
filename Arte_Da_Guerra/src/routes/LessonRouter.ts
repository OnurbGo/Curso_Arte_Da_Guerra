import express from "express";
import {
  createLesson,
  destroyLessonById,
  getAll,
  getLessonById,
  getLessonsByClassId,
  updateLesson,
} from "../controllers/LessonController";

const router = express.Router();

router.get("/lessons", getAll);
router.get("/lessons/:id", getLessonById);
router.get("/lessons/class/:class_id", getLessonsByClassId);
router.post("/lessons", createLesson);
router.put("/lessons/:id", updateLesson);
router.delete("/lessons/:id", destroyLessonById);

export default router;
