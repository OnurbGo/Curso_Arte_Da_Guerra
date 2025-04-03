import app from "../src/app";
import sequelize from "../src/config/database";
import request from "supertest";

describe("Email Validation", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test("Validation email should return invalid email", async () => {
    const response = await request(app).post("/users").send({
      name: "Invalid User",
      email: "akuma @gmail",
      password: "@Juju713",
      CPF: "123.456.789-00",
      type: "student",
    });

    expect(response.status).toBe(400);
  });

  test("Validation email should return valid email", async () => {
    const response = await request(app).post("/users").send({
      name: "Valid User",
      email: "akuma@gmail.com",
      password: "@Juju713",
      CPF: "123.456.789-00",
      type: "teacher",
    });

    expect(response.status).toBe(201);
  });
  test("PUT should not update the email field if provided", async () => {
    const response = await request(app).put("/users/1").send({
      name: "Valid User",
      email: "gurila@gmail.com",
      password: "@Juju713",
      CPF: "123.456.789-00",
      type: "teacher",
    });

    expect(response.status).toBe(401);
  });
});
