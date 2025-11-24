import dotenv from "dotenv";
dotenv.config();

import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_API_BASE_URL,
});

// 🔹 System prompt default (bisa berubah kalau mode diganti)
let systemPrompt = `
Kamu adalah AI WhatsApp yang ramah dan membantu.
Jawablah dengan bahasa Indonesia yang jelas.
`;

export async function runAgent(messageText) {
  try {
    // ============================
    // 🔥 COMMAND HANDLER
    // ============================
    if (messageText === "/help") {
      return `
✨ *Daftar Perintah Bot*
/help → Menampilkan daftar perintah
/reset → Reset sistem & mode ke default
/mode santai → Ubah gaya menjadi santai & gaul
/mode formal → Ubah gaya menjadi formal & profesional
      `.trim();
    }

    if (messageText === "/reset") {
      systemPrompt = `
Kamu adalah AI WhatsApp yang ramah dan membantu.
Jawablah dengan bahasa Indonesia yang jelas.
`;
      return "♻️ Sistem telah di-reset ke mode default.";
    }

    if (messageText.startsWith("/mode")) {
      const mode = messageText.split(" ")[1];

      if (mode === "santai") {
        systemPrompt = `
Kamu adalah AI WhatsApp dengan gaya santai, ramah, dan sedikit gaul,
namun tetap sopan dan mudah dipahami.
`;
        return "😎 Mode diubah menjadi: *Santai*";
      }

      if (mode === "formal") {
        systemPrompt = `
Kamu adalah AI WhatsApp dengan gaya formal, profesional,
dan menggunakan bahasa yang baku.
`;
        return "📘 Mode diubah menjadi: *Formal*";
      }

      return "❌ Mode tidak dikenal. Gunakan: /mode santai atau /mode formal";
    }

    // ============================
    // 🔥 MAIN LLM CALL
    // ============================
    const completion = await client.chat.completions.create({
      model: process.env.MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: messageText },
      ],
    });

    return completion.choices[0].message.content;

  } catch (err) {
    console.error("Agent Error:", err);
    return "Maaf, terjadi kesalahan pada AI Agent.";
  }
}
