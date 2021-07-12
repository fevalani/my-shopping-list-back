import connection from "../src/database";
import supertest from "supertest";
import app from "../src/app";
import { expect, it } from "@jest/globals";

beforeEach(async () => {
  await connection.query(`DELETE FROM list WHERE text = 'testeperfeito'`);
});

afterAll(async () => {
  await connection.query(`DELETE FROM list WHERE text = 'testeperfeito'`);
  connection.end();
});

describe("POST /items", () => {
  it("returns status 400 for empty param", async () => {
    const body = { text: "" };
    const result = await supertest(app).post("/items").send(body);
    expect(result.status).toEqual(400);
  });

  it("return status 201 for valid params", async () => {
    const body = { text: "testeperfeito" };
    const result = await supertest(app).post("/items").send(body);
    expect(result.status).toEqual(201);
  });
});
