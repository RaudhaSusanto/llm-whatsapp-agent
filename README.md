LLM WhatsApp Agent — Baileys + OpenAI

Proyek ini membangun LLM Agent yang terintegrasi dengan WhatsApp menggunakan Baileys sebagai konektor dan OpenAI API sebagai model bahasa.
Agent mampu membalas pesan WhatsApp secara otomatis, memahami konteks, serta dapat dikembangkan dengan berbagai fitur tambahan.

--------------------------------------------------------------------------------------------------
🚀 Fitur Utama

- Integrasi WhatsApp via @whiskeysockets/baileys
- LLM Agent berbasis OpenAI Chat Completion API
- Anti-loop (bot tidak membalas dirinya sendiri)
- Mendukung pesan:
  - teks
  - caption gambar
- Konfigurasi via .env
- Struktur folder rapi + logging
- Siap untuk di-deploy atau dikembangkan

--------------------------------------------------------------------------------------------------
📁 Struktur Folder
llm-whatsapp-agent/

│ .env

│ .env.example

│ .gitignore

│ package.json

│ README.md

│ logs/

│ └── example.log

│ tests/

│ └── agent.test.js

│ auth_info/

│ src/

   ├── index.js
   
   ├── agent.js
   
   └── whatsapp.js

-------------------------------------------------------------------------------------------------
⚙️ Instalasi
1️⃣ Clone Repository
git clone https://github.com/RaudhaSusanto/llm-whatsapp-agent.git
cd llm-whatsapp-agent

2️⃣ Install Dependency
npm install

3️⃣ Buat file .env
Salin dari .env.example:
cp .env.example .env

Lalu isi seperti ini:

OPENAI_API_KEY=isi_api_key_kamu
OPENAI_API_BASE_URL=https://api.openai.com/v1
MODEL=gpt-4o-mini

▶️ Menjalankan Aplikasi (CLI)
npm run dev

Jika berhasil, terminal akan menampilkan QR untuk login WhatsApp.
Scan QR menggunakan WhatsApp → Linked Devices.
Bot akan aktif setelah status:
WhatsApp Bot Connected!
-----------------------------------------------------------------------------------------------
💬 Cara Menguji Bot di WhatsApp
Cukup kirim pesan ke WhatsApp kamu yang terhubung:
Contoh:
User: "Halo"
Bot: "Hai! Ada yang bisa aku bantu?"

🧪 Testing
Folder tests/ sudah disediakan.
Untuk menjalankan test:
npm run test

📝 Contoh .env.example
OPENAI_API_KEY=YOUR_API_KEY_HERE
OPENAI_API_BASE_URL=https://api.openai.com/v1
MODEL=gpt-4o-mini

🖼 Demo
Tambahkan screenshot / GIF berikut:
Proses scan QR
Bot merespon pesan WhatsApp
Contoh:

demo/
 ├── qr-login.png
 
 ├── chat-demo.png

------------------------------------------------------------------------------------------------
📌 Teknologi
Komponen	      Keterangan

Baileys	        WhatsApp Web API unofficial

OpenAI SDK	    Pemanggilan model GPT

Node.js	        Runtime utama

dotenv	        Load konfigurasi

pino	          Logging ringan
------------------------------------------------------------------------------------------------
📚 Cara Kerja Singkat
1. WhatsApp terhubung melalui Baileys.
2. Ketika pesan masuk, file whatsapp.js menangkap event messages.upsert.
3. Pesan diteruskan ke runAgent() di agent.js.
4. OpenAI memproses pesan lalu mengembalikan jawaban.
5. Balasan dikirim kembali ke WhatsApp.
------------------------------------------------------------------------------------------------
🔒 Keamanan
- Jangan upload .env ke GitHub.
- Gunakan .env.example bagi pengguna lain.
- Direktori auth_info/ jangan dipublikasi (session WhatsApp).

