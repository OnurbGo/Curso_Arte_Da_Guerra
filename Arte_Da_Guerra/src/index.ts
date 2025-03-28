import express from "express";
import sequelize from "./config/database";
import UserRoutes from "./routes/UserRouter";
import TeachersRoutes from "./routes/TeachersRouter";
import ClassRoutes from "./routes/ClassRouter";
import LessonRoutes from "./routes/LessonRouter";
import PaymentRoutes from "./routes/PaymentRouter";
import InscriptionRoutes from "./routes/InscriptionRouter";
import MethodPaymentRoutes from "./routes/MethodPaymentRouter";
import LoginRoutes from "./routes/LoginRouter";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const port = 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

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

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database has been synchronized");
  })
  .catch((error) => {
    console.error("ERROR in Database synchronization:", error.message);
  });

app.listen(port, () => {
  console.log("Server is running on port:", port);
});
