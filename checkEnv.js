import dotenv from "dotenv";
dotenv.config();

console.log("OPENAI_API_KEY:", process.env.OPENAI_API_KEY ? "TERBACA" : "TIDAK TERBACA");
console.log("MODEL:", process.env.MODEL);
console.log("OPENAI_API_BASE_URL:", process.env.OPENAI_API_BASE_URL);
