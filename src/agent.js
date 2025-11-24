import dotenv from "dotenv";
import fetch from "node-fetch";
dotenv.config();

export async function runAgent(messageText) {
  try {
    const response = await fetch(`${process.env.OPENAI_API_BASE_URL}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: process.env.MODEL,
        messages: [
          { role: "system", content: "Kamu adalah AI WhatsApp yang ramah dan membantu." },
          { role: "user", content: messageText }
        ],
      }),
    });

    const data = await response.json();

    if (data.error) {
      console.error("Agent Error:", data.error);
      return "Maaf, terjadi kesalahan pada AI Agent.";
    }

    // Ambil balasan pertama
    return data.choices?.[0]?.message?.content || "Maaf, AI tidak memberikan balasan.";
  } catch (err) {
    console.error("Agent Error:", err);
    return "Maaf, terjadi kesalahan pada AI Agent.";
  }
}
