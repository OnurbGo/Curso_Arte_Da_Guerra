import app from "../src/app";
import sequelize from "../src/config/database";
import request from "supertest";
import { authMiddleware } from "../src/middleware/authMiddleware";

jest.mock("../src/middleware/authMiddleware", () => {
  return {
    authMiddleware: (req: any, res: any, next: any) => {
      req.body.lesson = {
        class_id: 1,
        title: "golpe do polegar furioso",
        description: "esse golpe mata homens apenas com o polegar",
        url_video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        url_img: "asfagwsgfeavasf",
      };

      next();
    },
  };
});

describe("lesson Endpoint", () => {
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
    await request(app).post("/class").send({
      id: 1,
      master_id: 1,
      title: "aula poggers",
      description: "aula insana com os mestres bolados",
      url_img: "asdgasdga",
      url_img_banner: "asdfgd",
    });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test("POST /lessons should create a new teacher and return success", async () => {
    const response = await request(app)
      .post("/lessons")
      .send({
        class_id: "1",
        title: "golpe do espadachin",
        description:
          "esse golpe faz espadas se moverem tão rapido que o corte só percebivel apenas quando seu corpo está no chão",
        url_video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        url_img: "asfagwsgfeavasf",
      })
      .set({ Authorization: "Secret_key" });

    expect(response.status).toBe(201);
  });

  test("POST /lessons shouldn't create because is empty", async () => {
    const response = await request(app)
      .post("/lessons")
      .send({
        class_id: 1,
        title: "",
        description: "",
        url_video: "",
        url_img: "",
      })
      .set({ Authorization: "Secret_key" });

    expect(response.status).toBe(400);
  });

  test("GET /lessons should return a list", async () => {
    const response = await request(app)
      .get("/lessons")
      .set({ Authorization: "Secret_key" });

    expect(response.status).toBe(200);
  });

  test("PUT /lessons should update a user and return success", async () => {
    const response = await request(app).put("/lessons/1").send({
      class_id: 1,
      title: "aaaaaa",
      description: "aaaaaaa",
      url_video: "aaaaaaaa",
      url_img: "aaaaaaaaa",
    });
    expect(response.status).toBe(201);
  });

  test("PUT /lessons shouldn't update because is empty", async () => {
    const response = await request(app).put("/lessons/1").send({
      class_id: "",
      title: "",
      description: "",
      url_video: "",
      url_img: "",
    });
    expect(response.status).toBe(400);
  });

  test("PUT /lessons shouldn't update because the lesson dont exist", async () => {
    const response = await request(app).put("/lessons/55").send({
      class_id: 1,
      title: "aaaaaa",
      description: "aaaaaaa",
      url_video: "aaaaaaaa",
      url_img: "aaaaaaaaa",
    });
    expect(response.status).toBe(404);
  });

  test("DELETE /lessons should delete a lesson", async () => {
    const response = await request(app).delete("/lessons/1");
    expect(response.status).toBe(204);
  });

  test("DELETE /lessons shouldn't to delete a inexistent lessons", async () => {
    const response = await request(app).delete("/lessons/55");
    expect(response.status).toBe(404);
  });
});
