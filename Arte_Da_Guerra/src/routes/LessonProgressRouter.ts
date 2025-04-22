import express from "express";
import { getProgressByClass, markDone, unmarkDone } from "../controllers/LessonProgressController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.use(authMiddleware);

router.get("/lesson-progress", getProgressByClass);
router.post("/lesson-progress/done", markDone);
router.post("/lesson-progress/undone", unmarkDone);

export default router;