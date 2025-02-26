import express from "express";
import { getAll, getUserById } from "../controllers/UserController";

const router = express.Router();

router.get("/users", getAll);
router.get("/users/:id", getUserById);

export default router;
