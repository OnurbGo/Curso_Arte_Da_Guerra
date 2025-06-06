import express from "express";

import cors from "cors";
import cookieParser from "cookie-parser";

import UserRoutes from "./routes/UserRouter";
import TeachersRoutes from "./routes/TeachersRouter";
import ClassRoutes from "./routes/ClassRouter";
import LessonRoutes from "./routes/LessonRouter";
import PaymentRoutes from "./routes/PaymentRouter";
import InscriptionRoutes from "./routes/InscriptionRouter";
import MethodPaymentRoutes from "./routes/MethodPaymentRouter";
import LessonProgressRouter from "./routes/LessonProgressRouter";
import LoginRoutes from "./routes/LoginRouter";
import "./models/Association";

const app = express();

const FRONT_URL = process.env.FRONT_URL;

app.use(cors());

app.use(cookieParser());
app.use(express.json());

app.use(UserRoutes);
app.use(TeachersRoutes);
app.use(ClassRoutes);
app.use(LessonRoutes);
app.use(InscriptionRoutes);
app.use(PaymentRoutes);
app.use(MethodPaymentRoutes);
app.use(LoginRoutes);
app.use(LessonProgressRouter);

export default app;
