import app from "../src/app";
import sequelize from "../src/config/database";
import request from "supertest";

describe("User CPF Validation", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
    await request(app).post("/users").send({
      id: 1,
      name: "Zangief",
      email: "tornadovermelho@godmail.com",
      password: "@Juju713",
      CPF: "123.456.789-00",
      type: "teacher",
    });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test("CPF with formatting", async () => {
    const response = await request(app).post("/users").send({
      name: "Carlinhos",
      email: "gustavo@example.com",
      password: "@Juju713",
      CPF: "009.876.543-21",
      type: "student",
    });

    expect(response.status).toBe(201);
  });

  test("CPF without formatting", async () => {
    const response = await request(app).post("/users").send({
      name: "Invalid User",
      email: "mail@example.com",
      password: "@Juju713",
      CPF: "00000000000",
      type: "student",
    });

    expect(response.status).toBe(400);
  });

  test("CPF is empty", async () => {
    const response = await request(app).post("/users").send({
      name: "Luan Santana",
      email: "mail@godmail.com",
      password: "@Juju713",
      CPF: "",
      type: "student",
    });

    expect(response.status).toBe(400);
  });

  test("CPF already exists", async () => {
    const response = await request(app).post("/users").send({
      name: "Lionel Messi",
      email: "lionelmessi@example.com",
      password: "@Juju713",
      CPF: "123.456.789-00",
      type: "student",
    });

    expect(response.status).toBe(500);
  });
});
