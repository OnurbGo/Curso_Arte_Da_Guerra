import express from "express";
import {
  createLesson,
  destroyLessonById,
  getAll,
  getLessonById,
  updateLesson,
} from "../controllers/LessonController";

const router = express.Router();

router.get("/lesson", getAll);
router.get("/lesson/:id", getLessonById);
router.post("/lesson", createLesson);
router.put("/lesson/:id", updateLesson);
router.delete("/lesson/:id", destroyLessonById);

export default router;
