import { runAgent } from "../src/agent.js";

test("Agent should generate relevant reply", async () => {
  const question = "Siapa presiden Indonesia?";
  const reply = await runAgent(question);

  expect(typeof reply).toBe("string");
  expect(reply.length).toBeGreaterThan(5);
});
