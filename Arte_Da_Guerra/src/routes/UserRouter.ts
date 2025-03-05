import express from "express";
import {
  createUser,
  destroyUserById,
  getAll,
  getUserById,
  updateUser,
} from "../controllers/UserController";

const router = express.Router();

router.get("/users", getAll);
router.get("/users/:id", getUserById);
router.post("/users", createUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", destroyUserById);

export default router;
