import express from "express";
import {
  createClass,
  destroyClassById,
  getAll,
  getClassById,
  updateClass,
} from "../controllers/ClassController";
import { createLesson } from "../controllers/LessonController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/class", authMiddleware, getAll);
router.get("/class/:id", authMiddleware, getClassById);
router.post("/class", authMiddleware, createClass);
router.put("/class/:id", authMiddleware, updateClass);
router.delete("/class/:id", authMiddleware, destroyClassById);

router.post("/class/:classId/lessons", authMiddleware, createLesson);

export default router;
