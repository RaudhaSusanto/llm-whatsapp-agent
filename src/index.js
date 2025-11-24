import dotenv from "dotenv";
dotenv.config();


import { startWhatsApp } from "./whatsapp.js";

console.log("Menjalankan LLM WhatsApp Agent...");
startWhatsApp();
