import { Sequelize } from "sequelize";

const isTest = process.env.NODE_ENV === "test";

const sequelize = new Sequelize(
  isTest ? "test" : "Cursos_Arte_Da_Guerra",
  "root",
  "",

  {
    host: "localhost",
    dialect: "mysql",
    logging: !isTest,
  }
);

export default sequelize;
