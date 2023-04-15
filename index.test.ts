import express, { Express } from "express";
import request from "supertest";
import { app, serverInstance } from "./index"; // Make sure to export the 'app' from index.ts

describe("POST /exec", () => {
  let server: Express;

  beforeAll(() => {
    // Set the PORT environment variable to 5001 for the tests
    process.env.PORT = '5001';
  });

  beforeEach(() => {
    server = express();
    server.use(app);
  });

  it("should execute a valid command and return the result", async () => {
    const response = await request(server)
      .post("/exec")
      .send({ command: 'echo "Hello, World!"' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ stdout: "Hello, World!\n", stderr: "" }); // Expect newline character
  });

  it("should return an error for an invalid command", async () => {
    const response = await request(server)
      .post("/exec")
      .send({ command: "invalid-command" });

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty("error");
    expect(response.body).toHaveProperty("stderr");
  });

  afterAll(() => {
    if (serverInstance) {
      serverInstance.close();
    }
  });
});
