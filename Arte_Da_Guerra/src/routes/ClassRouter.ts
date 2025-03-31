import express from "express";
import {
  createClass,
  destroyClassById,
  getAll,
  getClassById,
  updateClass,
} from "../controllers/ClassController";
import { createLesson } from "../controllers/LessonController";

const router = express.Router();

router.get("/class", getAll);
router.get("/class/:id", getClassById);
router.post("/class", createClass);
router.put("/class/:id", updateClass);
router.delete("/class/:id", destroyClassById);

router.post("/class/:classId/lessons", createLesson);

export default router;
