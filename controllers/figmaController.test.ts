import request from "supertest";
import { app } from "../index";

describe("Figma Routes", () => {
  // Test for /figma-files route
  it("should retrieve a list of Figma files", async () => {
    const res = await request(app).get("/figma-files");
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty("files");
  });

  // Test for /figma-pages/:fileKey/:pageId route
  it("should retrieve the pages of a specific Figma file", async () => {
    // Replace FILE_KEY and PAGE_ID with actual values for testing
    const fileKey = "FILE_KEY";
    const pageId = "PAGE_ID";
    const res = await request(app).get(`/figma-pages/${fileKey}/${pageId}`);
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty("name");
  });
});
