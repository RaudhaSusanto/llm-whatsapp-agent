import dotenv from "dotenv";
dotenv.config();

test("Environment variables should exist", () => {
  expect(process.env.OPENAI_API_KEY).toBeDefined();
  expect(process.env.MODEL).toBeDefined();
});
