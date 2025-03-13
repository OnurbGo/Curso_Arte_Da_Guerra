import express from "express";
import { LoginUser } from "../controllers/LoginController";

const router = express.Router();

router.get("/login", LoginUser);
export default router;
