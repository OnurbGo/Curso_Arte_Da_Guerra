import express from "express";
import {
  createTeachers,
  destroyTeachersById,
  getAll,
  getTeachersById,
  updateTeachers,
  getTeacherByUserId,
} from "../controllers/TeachersController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/teachers", createTeachers);

router.get("/teachers", authMiddleware, getAll);
router.get("/teachers/by-user/:userId", authMiddleware, getTeacherByUserId);
router.get("/teachers/:id", authMiddleware, getTeachersById);
router.put("/teachers/:id", authMiddleware, updateTeachers);
router.delete("/teachers/:id", authMiddleware, destroyTeachersById);

export default router;
