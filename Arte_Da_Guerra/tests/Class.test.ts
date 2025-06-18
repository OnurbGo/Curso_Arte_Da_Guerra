import app from "../src/app";
import sequelize from "../src/config/database";
import request from "supertest";
import { authMiddleware } from "../src/middleware/authMiddleware";

jest.mock("../src/middleware/authMiddleware", () => {
  return {
    authMiddleware: (req: any, res: any, next: any) => {
      req.body.class = {
        master_id: 1,
        title: "aula poggers",
        description: "aula insana com os mestres bolados",
        url_img: "asdgasdga",
        url_img_banner: "asdfgd",
      };

      next();
    },
  };
});

describe("Class Endpoint", () => {
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
    await request(app).post("/teachers").send({
      id: 1,
      user_id: 1,
      biography: "lasanha",
      expertise: "matador de onca",
    });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test("POST /class should create a new class and return success", async () => {
    const response = await request(app).post("/class").send({
      master_id: 1,
      title: "aula mutcho loka",
      description: "aula de lutas com os mestres bolados",
      url_img: "asdgasdga",
      url_img_banner: "asdfgd",
    });

    expect(response.status).toBe(201);
  });

  test("POST /class shouldn't create because is empty", async () => {
    const response = await request(app)
      .post("/class")
      .send({
        master_id: "",
        title: "",
        description: "",
        url_img: "",
        url_img_banner: "",
      })
      .set({ Authorization: "Secret_key" });

    expect(response.status).toBe(400);
  });

  test("GET /class should return a list", async () => {
    const response = await request(app)
      .get("/class")
      .set({ Authorization: "Secret_key" });

    expect(response.status).toBe(200);
  });

  test("PUT /class should update a user and return success", async () => {
    const response = await request(app).put("/class/1").send({
      master_id: 1,
      title: "aaaaaaaa",
      description: "aaaaaaaa",
      url_img: "aaaaaaaaa",
      url_img_banner: "aaaaaaaaa",
    });
    expect(response.status).toBe(200);
  });

  test("PUT /class shouldn't update because is empty", async () => {
    const response = await request(app).put("/class/1").send({
      master_id: "",
      title: "",
      description: "",
      url_img: "",
      url_img_banner: "",
    });
    expect(response.status).toBe(400);
  });

  test("PUT /class shouldn't update because the user dont exist", async () => {
    const response = await request(app).put("/class/55").send({
      master_id: 1,
      title: "asfasdf",
      description: "asfadg",
      url_img: "asfasf",
      url_img_banner: "asfas",
    });
    expect(response.status).toBe(404);
  });

  test("DELETE /class should delete a user", async () => {
    const response = await request(app).delete("/class/1");
    expect(response.status).toBe(204);
  });

  test("DELETE /class shouldn't to delete a inexistent class", async () => {
    const response = await request(app).delete("/class/55");
    expect(response.status).toBe(404);
  });
});
