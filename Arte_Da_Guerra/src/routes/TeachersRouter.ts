import express from "express";
import {
  createTeachers,
  destroyTeachersById,
  getAll,
  getTeachersById,
  updateTeachers,
  getTeacherByUserId,
} from "../controllers/TeachersController";

const router = express.Router();

router.get("/teachers", getAll);
router.get("/teachers/by-user/:userId", getTeacherByUserId);
router.get("/teachers/:id", getTeachersById);
router.post("/teachers", createTeachers);
router.put("/teachers/:id", updateTeachers);
router.delete("/teachers/:id", destroyTeachersById);

export default router;
