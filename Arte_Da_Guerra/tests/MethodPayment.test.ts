import app from "../src/app";
import sequelize from "../src/config/database";
import request from "supertest";

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

describe("MethodPayment Endpoint", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test("POST /methodpayment shold create a new methodpayment and return success", async () => {
    const response = await request(app).post("/methodpayment").send({
      name: "pix",
    });

    expect(response.status).toBe(201);
  });

  test("GET /methodpayment should return a list", async () => {
    const response = await request(app).get("/methodpayment");
    expect(response.status).toBe(200);
  });

  test("PUT /methodpayment should update a methodpayment and return success", async () => {
    const response = await request(app).put("/methodpayment/1").send({
      name: "Cartão de debito",
    });
    expect(response.status).toBe(201);
  });

  test("DELETE /methodpayment should delete a methodpayment", async () => {
    const response = await request(app).delete("/methodpayment/1");
    expect(response.status).toBe(204);
  });

  test("DELETE /methodpayment shouldn't to delete a inexistent methodpayment", async () => {
    const response = await request(app).delete("/methodpayment/55");
    expect(response.status).toBe(404);
  });
});
