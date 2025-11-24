import { startWhatsApp } from "../src/whatsapp.js";

test("WhatsApp module should export a function", () => {
  expect(typeof startWhatsApp).toBe("function");
});
