import app from "../src/app";
import sequelize from "../src/config/database";
import request from "supertest";
import { authMiddleware } from "../src/middleware/authMiddleware";

jest.mock("../src/middleware/authMiddleware", () => {
  return {
    authMiddleware: (req: any, res: any, next: any) => {
      req.body.user = {
        name: "Gustavo Lima",
        email: "qualquer@exemplo.com",
        password: "@senhaBolada714",
        CPF: "000.000.000-00",
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

  test("POST /users should create a new teacher and return success", async () => {
    const response = await request(app).post("/users").send({
      name: "jucicleide",
      email: "pindagoiabada@godmail.com",
      password: "@Juju713",
      CPF: "123.456.789-00",
      type: "teacher",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("name", "jucicleide");
  });

  test("POST /users should create a new student and return success", async () => {
    const response = await request(app)
      .post("/users")
      .send({
        name: "Paulo Henrique",
        email: "henriquepaulo@gmail.com",
        password: "@Juju713",
        CPF: "009.876.543-21",
        type: "student",
      })
      .set({ Authorization: "Secret_key" });

    expect(response.status).toBe(201);
  });

  test("POST /users shouldn't create because is empty", async () => {
    const response = await request(app)
      .post("/users")
      .send({
        name: "",
        email: "",
        password: "",
        CPF: "",
        type: "",
      })
      .set({ Authorization: "Secret_key" });

    expect(response.status).toBe(400);
  });

  test("GET /users should return a list", async () => {
    const response = await request(app)
      .get("/users")
      .set({ Authorization: "Secret_key" });

    expect(response.status).toBe(200);
  });

  test("PUT /users should update a user and return success", async () => {
    const response = await request(app).put("/users/2").send({
      name: "Paulo Gustavo",
      email: "jjjjjjjjquepaulo@gmail.com",
      password: "@Juju713",
      CPF: "009.876.543-21",
      type: "student",
    });
    expect(response.status).toBe(200);
  });

  test("PUT /users shouldn't update because is empty", async () => {
    const response = await request(app).put("/users/2").send({
      name: "",
      email: "",
      password: "",
      CPF: "",
      type: "",
    });
    expect(response.status).toBe(400);
  });

  test("PUT /users shouldn't update because the user dont exist", async () => {
    const response = await request(app).put("/users/55").send({
      name: "Paulo",
      email: "lagostopaulo@gmail.com",
      password: "@Juju713",
      CPF: "009.876.543-21",
      type: "student",
    });
    expect(response.status).toBe(404);
  });

  test("DELETE /users should delete a user", async () => {
    const response = await request(app).delete("/users/2");
    expect(response.status).toBe(204);
  });

  test("DELETE /users shouldn't to delete a inexistent users", async () => {
    const response = await request(app).delete("/users/55");
    expect(response.status).toBe(404);
  });
});
