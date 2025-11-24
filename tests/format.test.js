import { runAgent } from "../src/agent.js";

test("Agent should not return undefined", async () => {
  const reply = await runAgent("tes format");
  expect(reply).not.toBeUndefined();
});
