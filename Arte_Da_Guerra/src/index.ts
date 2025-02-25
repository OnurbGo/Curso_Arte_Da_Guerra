import express from "express";
import sequelize from "./config/database";
import { error } from "console";
import UserModel from "./models/UserModel";
import TeachersModel from "./models/TeachersModel";

const app = express();
const port = 3010;

app.get("/", (req, res) => {
  res.send("Hello World !");
});

app.get("/users", async (req, res) => {
  const users = await UserModel.findAll();
  res.send(users);
});

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

app.get("/teachers", async (req, res) => {
  try {
    const teachers = await TeachersModel.findAll({
      include: {
        model: UserModel,
        attributes: ["id", "name", "email", "type"],
      },
    });

    res.status(200).json(teachers);
  } catch (error) {
    console.error("Error fetching teachers:", error);
    res.status(500).send("Error fetching teachers");
  }
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
