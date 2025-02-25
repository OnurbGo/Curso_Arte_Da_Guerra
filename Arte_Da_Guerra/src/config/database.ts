import { Sequelize } from "sequelize";

const sequelize = new Sequelize("Cursos_Arte_Da_Guerra", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default sequelize;
