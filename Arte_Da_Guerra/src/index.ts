import express from "express";
import sequelize from "./config/database";
import { error } from "console";
import UserModel from "./models/UserModel";
import UserRoutes from "./routes/UserRouter";
import TeachersModel from "./models/TeachersModel";
import ClassModel from "./models/ClassModel";
import LessonModel from "./models/LessonModel";
import PaymentModel from "./models/PaymentModel";
import InscriptionModel from "./models/InscriptionModel";
import MethodPaymentModel from "./models/MethodPaymentModel";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World !");
});

app.use(express.json());
app.use(UserRoutes);
//app.use(TeachersRoutes);
//app.use(ClassRoutes);
//app.use(LessonRoutes);
//app.use(InscriptionRoutes);
//app.use(PaymentRoutes);

app.get("/teachers", async (req, res) => {
  try {
    const teachers = await TeachersModel.findAll({
      include: {
        model: UserModel,
        attributes: ["id", "name", "email", "type"],
      },
    });
    res.send(teachers);
  } catch (error) {
    console.error("Error Searching For Teachers:", error);
    res.status(500).send("Error Searching For Teachers");
  }
});

app.get("/class", async (req, res) => {
  const clas = await ClassModel.findAll();
  res.send(clas);
});

app.get("/lesson", async (req, res) => {
  const lesson = await LessonModel.findAll();
  res.send(lesson);
});

app.get("/inscription", async (req, res) => {
  const inscription = await InscriptionModel.findAll();
  res.send(inscription);
});

app.get("/payment", async (req, res) => {
  const payment = await PaymentModel.findAll();
  res.send(payment);
});

app.get("/methodpayment", async (req, res) => {
  const payment = await MethodPaymentModel.findAll();
  res.send(payment);
});

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
