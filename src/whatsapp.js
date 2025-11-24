import makeWASocket, {
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
} from "@whiskeysockets/baileys";

import qrcodeTerminal from "qrcode-terminal";
import { runAgent } from "./agent.js";
import { loadFaq, matchIntent } from "./intent.js";
import Pino from "pino";

export async function startWhatsApp() {
  const { state, saveCreds } = await useMultiFileAuthState("./auth_info");
  const { version } = await fetchLatestBaileysVersion();

  const faqList = loadFaq(); // ← LOAD FAQ SEKALI SAJA

  const sock = makeWASocket({
    version,
    auth: state,
    logger: Pino({ level: "silent" }),
  });

  // ---------- QR CODE ----------
  sock.ev.on("connection.update", (update) => {
    const { connection, qr } = update;

    if (qr) {
      console.log("\n📌 Scan QR berikut untuk login WhatsApp:\n");
      qrcodeTerminal.generate(qr, { small: true });
    }

    if (connection === "open") {
      console.log("✅ WhatsApp Bot Connected!");
    }

    if (connection === "close") {
      console.log("❌ Connection closed. Reconnecting...");
      startWhatsApp();
    }
  });

  // ---------- MESSAGE HANDLER ----------
  sock.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0];
    if (!msg || !msg.message) return;

    const from = msg.key.remoteJid;

    // 🛑 Anti-loop: jangan balas pesan kita sendiri
    if (msg.key.fromMe) return;

    // 🛑 Hindari pesan internal Baileys
    if (msg.key.id && msg.key.id.startsWith("BAE5")) return;

    // Ambil text
    const text =
      msg.message.conversation ||
      msg.message.extendedTextMessage?.text ||
      msg.message.imageMessage?.caption ||
      "";

    if (!text) return;

    console.log("📩 Pesan diterima:", text);

    // ---------- Coba Match FAQ ----------
    const matched = matchIntent(text, faqList);

    if (matched) {
      console.log("🔎 Matched FAQ:", matched.id);

      await sock.sendMessage(from, {
        text: matched.answer,
      });

      return; // STOP — jangan lanjut ke LLM
    }

    // ---------- Tidak match, panggil AI ----------
    const reply = await runAgent(text);

    console.log("🤖 Balasan AI:", reply);

    await sock.sendMessage(from, { text: reply });
  });

  sock.ev.on("creds.update", saveCreds);
}
