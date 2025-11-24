import fs from "fs";
import path from "path";

/**
 * loadFaq()
 * membaca data/faq.json dan mengembalikan array FAQ
 */
export function loadFaq() {
  const p = path.resolve(process.cwd(), "data", "faq.json");
  const raw = fs.readFileSync(p, "utf8");
  return JSON.parse(raw);
}

/**
 * normalizeText(text)
 * lowercase, hilangkan punctuation sederhana
 */
function normalizeText(text) {
  return (text || "")
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * matchIntent(userText, faqList)
 * mencari FAQ terbaik berdasarkan jumlah token match (simple scoring)
 * mengembalikan matched FAQ object atau null
 */
export function matchIntent(userText, faqList) {
  if (!userText || !userText.trim()) return null;
  const text = normalizeText(userText);
  const tokens = text.split(" ").filter(Boolean);

  let best = null;
  let bestScore = 0;

  for (const faq of faqList) {
    // gabungkan semua keyword / question variations jadi satu string
    const keywords = (faq.question || []).map(k => normalizeText(k)).join(" ");
    const kwTokens = new Set(keywords.split(" ").filter(Boolean));

    // hitung berapa token user ada di kwTokens
    let score = 0;
    for (const t of tokens) {
      if (kwTokens.has(t)) score += 1;
    }

    // slightly reward full phrase match
    if (keywords.includes(text)) score += 1;

    if (score > bestScore) {
      bestScore = score;
      best = faq;
    }
  }

  // threshold minimal: setidaknya 1 token match
  if (bestScore <= 0) return null;
  return best;
}
