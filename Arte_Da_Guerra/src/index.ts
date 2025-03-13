import express from "express";
import sequelize from "./config/database";
import { error } from "console";
import UserRoutes from "./routes/UserRouter";
import TeachersRoutes from "./routes/TeachersRouter";
import ClassRoutes from "./routes/ClassRouter";
import LessonRoutes from "./routes/LessonRouter";
import PaymentRoutes from "./routes/PaymentRouter";
import InscriptionRoutes from "./routes/InscriptionRouter";
import MethodPaymentRoutes from "./routes/MethodPaymentRouter";
import LoginRoutes from "./routes/LoginRouter";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World !");
});

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
    console.error(error.stack);
  });

app.listen(port, () => {
  console.log("Server is running in port:", port);
});
