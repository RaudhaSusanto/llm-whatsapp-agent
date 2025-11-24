import { runAgent } from "../src/agent.js";

test("AI should return a string response", async () => {
  const reply = await runAgent("halo");
  expect(typeof reply).toBe("string");
});

test("AI should respond with non-empty text", async () => {
  const reply = await runAgent("apa kabar?");
  expect(reply.length).toBeGreaterThan(0);
});
