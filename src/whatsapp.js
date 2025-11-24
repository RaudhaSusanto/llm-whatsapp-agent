import makeWASocket, {
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
} from "@whiskeysockets/baileys";
import qrcodeTerminal from "qrcode-terminal";
import { runAgent } from "./agent.js";
import Pino from "pino";

export async function startWhatsApp() {
  // Auth state
  const { state, saveCreds } = await useMultiFileAuthState("./auth_info");
  const { version } = await fetchLatestBaileysVersion();

  // Buat socket
  const sock = makeWASocket({
    version,
    auth: state,
    logger: Pino({ level: "silent" }),
  });

  // ---- QR CODE HANDLER ----
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

  // ---- MESSAGE HANDLER (ANTI LOOP + CLEAN) ----
  sock.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0];
    if (!msg || !msg.message) return;

    const from = msg.key.remoteJid;

    // 🛑 Anti Loop: Jangan proses pesan dari bot sendiri
    if (msg.key.fromMe) return;

    // 🛑 Hindari pesan Baileys yang ID-nya "BAE5"
    if (msg.key.id && msg.key.id.startsWith("BAE5")) return;

    // Ambil teks dari berbagai jenis pesan
    const text =
      msg.message.conversation ||
      msg.message.extendedTextMessage?.text ||
      msg.message.imageMessage?.caption ||
      "";

    if (!text) return;

    console.log("📩 Pesan diterima:", text);

    // Jalankan AI Agent
    const reply = await runAgent(text);

    console.log("🤖 Balasan AI:", reply);

    // Kirim balasan
    await sock.sendMessage(from, { text: reply });
  });

  // Simpan kredensial
  sock.ev.on("creds.update", saveCreds);
}
