import app from "../src/app"; // Importando a aplicação (já deve estar no seu código)
import sequelize from "../src/config/database"; // Configuração do banco de dados
import request from "supertest"; // Importando o supertest para fazer requisições
import { Response } from "supertest"; // Tipagem do Response
import { authMiddleware } from "../src/middleware/authMiddleware";

jest.mock("../src/middleware/authMiddleware", () => {
  return {
    authMiddleware: (req: any, res: any, next: any) => {
      req.body.teacher = {
        user_id: 1,
        biography: "lasanha",
        expertise: "matador de onca",
      };

      next();
    },
  };
});

describe("Teacher Endpoint", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
    await request(app).post("/users").send({
      id: 1,
      name: "Ronaldo",
      email: "pindagoiabada@godmail.com",
      password: "@Juju713",
      CPF: "123.456.789-00",
      type: "teacher",
    });
  });

  afterAll(async () => {
    await sequelize.close(); // Fecha a conexão após os testes
  });

  test("POST /teacher should create a new teacher and return success V.Teacher", async () => {
    const response = await request(app).post("/teachers").send({
      user_id: 1,
      biography: "lasanha",
      expertise: "matador de onca",
    });

    expect(response.status).toBe(201);
  });

  test("GET /teachers should return a list", async () => {
    const response: Response = await request(app).get("/teachers");

    expect(response.status).toBe(200);
  });

  test("PUT /teachers should update a teachers and return success", async () => {
    const response = await request(app).put("/teachers/1").send({
      name: "gustavolima",
      email: "pindagoiabada@godmail.com",
      CPF: "123.456.789-00",
      biography: "xaulin matador de porco",
      expertise: "tapa mata porco",
    });
    expect(response.status).toBe(200);
  });

  test("DELETE /teachers should delete a teachers", async () => {
    const response = await request(app).delete("/teachers/1");
    expect(response.status).toBe(204);
  });

  test("DELETE /teachers shouldn't delete a methodpayment because not exist", async () => {
    const response = await request(app).delete("/teachers/55");
    expect(response.status).toBe(404);
    //console.log(response.body);
  });
});
