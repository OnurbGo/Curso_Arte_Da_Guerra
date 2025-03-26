import app from "../src/app";
import sequelize from "../src/config/database";
import request from "supertest";
import { authMiddleware } from "../src/middleware/authMiddleware";

jest.mock("../src/middleware/authMiddleware", () => {
  return {
    authMiddleware: (req: any, res: any, next: any) => {
      req.body.user = {
        email: "qualquer",
        password: "1234",
      };

      next();
    },
  };
});

describe("User Endpoint", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test("POST /users shold create a new user and return success V.Teacher", async () => {
    const response = await request(app).post("/users").send({
      name: "jucicleide",
      email: "pindagoiabada@godmail.com",
      password: "1234",
      CPF: "123.456.789-00",
      type: "teacher",
    });

    expect(response.status).toBe(201);
  });

  test("POST /users shold create a new user and return success V.student", async () => {
    const response = await request(app).post("/users").send({
      name: "Paulo Henrique",
      email: "henriquepaulo@gmail.com",
      password: "1234",
      CPF: "009.876.543-21",
      type: "student",
    });

    expect(response.status).toBe(201);
  });

  test("GET /users should return a list", async () => {
    const response = await request(app)
      .get("/users")
      .set({ Authorization: "Secret_key" });

    expect(response.status).toBe(200);
  });
});
