import fs from "fs";

test("Project should contain src folder", () => {
  const exists = fs.existsSync("./src");
  expect(exists).toBe(true);
});

test("Project should contain whatsapp.js", () => {
  const exists = fs.existsSync("./src/whatsapp.js");
  expect(exists).toBe(true);
});
