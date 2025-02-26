import express from "express";
import { createUser, getAll, getUserById } from "../controllers/UserController";

const router = express.Router();

router.get("/users", getAll);
router.get("/users/:id", getUserById);
router.post("/users", createUser);

export default router;
