<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BAZNAS Kota Jambi - Cloud Portal</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        :root { --hijau: #10b981; --gelap: #0b0f1a; --card: #161b2a; }
        body { font-family: 'Inter', sans-serif; background-color: #f8fafc; transition: 0.3s; }
        .dark-mode { background-color: var(--gelap); color: #e5e7eb; }
        .sidebar { background-color: var(--card); width: 260px; height: 100vh; position: fixed; border-right: 1px solid #2d3748; }
        .stat-card { background: var(--card); border: 1px solid #2d3748; border-radius: 1.5rem; padding: 1.5rem; }
        .section-box { background: white; border-radius: 1.5rem; padding: 2rem; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1); }
        .upload-box { border: 2px dashed #cbd5e1; padding: 1.5rem; border-radius: 1rem; text-align: center; cursor: pointer; transition: 0.2s; }
        .upload-box:hover { border-color: var(--hijau); background: #f0fdf4; }
    </style>
</head>
<body id="bodyTag">

    <div id="view-warga" class="pb-20">
        <header class="bg-emerald-800 text-white py-14 text-center shadow-lg">
            <img src="logo-jambi.png" class="h-24 mx-auto mb-4 bg-white p-2 rounded-2xl" onerror="this.src='https://baznas.go.id/assets/img/baznas-logo.png'">
            <h1 class="text-3xl font-black">BAZNAS KOTA JAMBI</h1>
            <p class="opacity-80">Layanan Digital Mustahik v2.1</p>
            <button onclick="openLogin()" class="mt-6 bg-slate-900/50 hover:bg-slate-900 px-6 py-2 rounded-full text-xs font-bold transition">🔑 LOGIN ADMIN</button>
        </header>

        <div class="max-w-xl mx-auto -mt-10 px-4">
            <div class="section-box">
                <h2 class="text-xl font-bold text-emerald-800 mb-6">Formulir Bantuan</h2>
                
                <label class="block text-xs font-bold text-slate-400 mb-1 uppercase">Nama & NIK</label>
                <input type="text" id="nama" placeholder="Nama Lengkap" class="w-full p-3 border rounded-xl mb-3 outline-none focus:ring-2 ring-emerald-500">
                <input type="number" id="nik" placeholder="NIK 16 Digit" class="w-full p-3 border rounded-xl mb-4 outline-none focus:ring-2 ring-emerald-500">

                <label class="block text-xs font-bold text-slate-400 mb-1 uppercase">Unggah KTP (Wajib)</label>
                <div class="upload-box" onclick="document.getElementById('input-ktp').click()">
                    <span id="label-ktp" class="text-slate-500 text-sm">📸 Klik untuk Ambil Foto KTP</span>
                    <input type="file" id="input-ktp" accept="image/*" class="hidden" onchange="previewFile(this)">
                    <img id="img-preview" class="hidden mt-3 max-h-40 mx-auto rounded-lg shadow-md">
                </div>

                <label class="block text-xs font-bold text-slate-400 mb-1 mt-4 uppercase">Program</label>
                <select id="program" class="w-full p-3 border rounded-xl mb-4">
                    <option>Jambi Cerdas (Pendidikan)</option>
                    <option>Jambi Makmur (Usaha)</option>
                    <option>Jambi Sehat (Kesehatan)</option>
                </select>

                <textarea id="alasan" rows="3" placeholder="Ceritakan kondisi Anda..." class="w-full p-3 border rounded-xl mb-6 outline-none focus:ring-2 ring-emerald-500"></textarea>
                
                <button onclick="simpanPengajuan()" class="w-full bg-emerald-600 text-white font-black py-4 rounded-2xl hover:bg-emerald-700 shadow-xl shadow-emerald-200 transition">KIRIM BERKAS</button>
            </div>
        </div>
    </div>

    <div id="view-admin" class="hidden">
        <div class="sidebar p-8 text-white">
            <h2 class="font-black text-emerald-400 text-xl mb-10 text-center uppercase tracking-tighter">Admin Panel</h2>
            <nav class="space-y-4">
                <button class="w-full text-left p-4 bg-emerald-600 rounded-2xl font-bold">📊 Dashboard</button>
                <button onclick="location.reload()" class="w-full text-left p-4 text-slate-400 hover:text-white mt-40">🚪 Keluar</button>
            </nav>
        </div>

        <div class="ml-[260px] p-10">
            <div class="flex justify-between items-center mb-10">
                <h1 class="text-3xl font-bold">Data Pengajuan</h1>
                <button onclick="downloadCSV()" class="bg-emerald-600 text-white px-6 py-2 rounded-xl font-bold">Export CSV</button>
            </div>

            <div class="grid grid-cols-3 gap-8">
                <div class="col-span-1">
                    <div class="stat-card mb-6">
                        <p class="text-xs text-slate-500 font-bold uppercase">Total Berkas</p>
                        <h3 id="count-data" class="text-5xl font-black text-white mt-2">0</h3>
                    </div>
                    <div class="stat-card">
                        <canvas id="chartData"></canvas>
                    </div>
                </div>
                
                <div class="col-span-2 stat-card overflow-hidden">
                    <table class="w-full text-sm text-left">
                        <thead class="text-slate-500 uppercase text-[10px] border-b border-slate-700">
                            <tr><th class="pb-4">Nama Pendaftar</th><th>Program</th><th class="text-right">Aksi</th></tr>
                        </thead>
                        <tbody id="tabel-admin" class="text-slate-300"></tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <div id="modalDetail" class="fixed inset-0 bg-black/90 backdrop-blur-md hidden z-[999] p-6 flex items-center justify-center">
        <div class="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] w-full max-w-4xl flex gap-8">
            <div class="w-1/2">
                <p class="text-[10px] font-bold text-slate-500 uppercase mb-2">Dokumen KTP</p>
                <img id="det-foto" class="w-full rounded-2xl border border-slate-700 aspect-video object-cover bg-slate-800">
            </div>
            <div class="w-1/2 text-white">
                <div class="flex justify-between items-start">
                    <h2 id="det-nama" class="text-3xl font-bold">Nama</h2>
                    <button onclick="closeDetail()" class="text-2xl text-slate-500">&times;</button>
                </div>
                <p id="det-nik" class="text-emerald-500 font-mono mb-6">NIK</p>
                
                <p class="text-[10px] font-bold text-slate-500 uppercase">Alasan Pengajuan</p>
                <p id="det-alasan" class="text-sm text-slate-300 mb-8 bg-slate-800 p-4 rounded-xl italic">Alasan...</p>

                <div class="p-6 bg-emerald-950/20 border border-emerald-500/30 rounded-2xl">
                    <p class="text-[10px] font-bold text-emerald-500 uppercase mb-2">Review AI Smart Amil</p>
                    <p id="det-ai" class="text-xs text-slate-300 leading-relaxed">Silakan jalankan AI untuk analisis.</p>
                    <button id="btn-ai" class="mt-4 w-full bg-emerald-600 py-3 rounded-xl font-bold text-xs uppercase">Jalankan Verifikasi AI</button>
                </div>
            </div>
        </div>
    </div>

    <div id="loginModal" class="fixed inset-0 bg-slate-950/90 hidden z-[1000] flex items-center justify-center">
        <div class="bg-white p-8 rounded-3xl w-80 text-center">
            <h3 class="font-bold text-xl mb-4">Admin Login</h3>
            <input type="password" id="pass" placeholder="Password" class="w-full p-3 border rounded-xl mb-4 text-center outline-none border-2 focus:border-emerald-500">
            <button onclick="auth()" class="w-full bg-emerald-600 text-white py-3 rounded-xl font-bold shadow-lg shadow-emerald-200">MASUK</button>
            <button onclick="closeLogin()" class="mt-4 text-slate-400 text-xs">BATAL</button>
        </div>
    </div>

    <script type="module">
        import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";
        const API_KEY = "AIzaSyA8M6x4ILlSQnlt1uB8PHSxtMtShb4RLRE";
        const genAI = new GoogleGenerativeAI(API_KEY);
        
        let currentKTP = "";

        // --- WARGA ---
        window.previewFile = (input) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                currentKTP = e.target.result;
                document.getElementById('img-preview').src = currentKTP;
                document.getElementById('img-preview').classList.remove('hidden');
                document.getElementById('label-ktp').innerText = "✅ KTP Terpilih";
            };
            reader.readAsDataURL(input.files[0]);
        };

        window.simpanPengajuan = () => {
            const data = {
                nama: document.getElementById('nama').value,
                nik: document.getElementById('nik').value,
                program: document.getElementById('program').value,
                alasan: document.getElementById('alasan').value,
                foto: currentKTP
            };
            if(!data.nama || !currentKTP) return alert("Isi nama dan upload KTP!");
            
            let list = JSON.parse(localStorage.getItem('baznas_cloud') || '[]');
            list.push(data);
            localStorage.setItem('baznas_cloud', JSON.stringify(list));
            alert("Data terkirim ke Cloud BAZNAS Jambi!");
            location.reload();
        };

        // --- ADMIN ---
        window.openLogin = () => document.getElementById('loginModal').classList.remove('hidden');
        window.closeLogin = () => document.getElementById('loginModal').classList.add('hidden');
        window.auth = () => {
            if(document.getElementById('pass').value === '123') {
                document.getElementById('loginModal').classList.add('hidden');
                document.getElementById('view-warga').classList.add('hidden');
                document.getElementById('view-admin').classList.remove('hidden');
                document.getElementById('bodyTag').classList.add('dark-mode');
                refreshTable();
            } else alert("Salah!");
        };

        function refreshTable() {
            const list = JSON.parse(localStorage.getItem('baznas_cloud') || '[]');
            document.getElementById('count-data').innerText = list.length;
            document.getElementById('tabel-admin').innerHTML = list.map((d, i) => `
                <tr class="border-b border-slate-800 hover:bg-slate-800/50 cursor-pointer" onclick="openDetail(${i})">
                    <td class="py-4 font-bold text-white">${d.nama}</td>
                    <td><span class="text-[10px] bg-slate-800 px-2 py-1 rounded text-emerald-400 font-bold uppercase">${d.program}</span></td>
                    <td class="text-right text-emerald-500 font-bold">DETAIL ></td>
                </tr>
            `).join('');
        }

        window.openDetail = (idx) => {
            const list = JSON.parse(localStorage.getItem('baznas_cloud') || '[]');
            const d = list[idx];
            document.getElementById('det-nama').innerText = d.nama;
            document.getElementById('det-nik').innerText = "NIK: " + d.nik;
            document.getElementById('det-alasan').innerText = d.alasan;
            document.getElementById('det-foto').src = d.foto;
            document.getElementById('det-ai').innerText = "Menunggu perintah...";
            document.getElementById('btn-ai').onclick = () => runAI(idx);
            document.getElementById('modalDetail').classList.remove('hidden');
        };

        window.closeDetail = () => document.getElementById('modalDetail').classList.add('hidden');

        window.runAI = async (idx) => {
            const list = JSON.parse(localStorage.getItem('baznas_cloud') || '[]');
            const d = list[idx];
            const aiBox = document.getElementById('det-ai');
            aiBox.innerText = "🤖 Gemini AI sedang menelaah data...";
            
            try {
                const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
                const res = await model.generateContent(`Review bantuan ${d.program} untuk ${d.nama}. Alasan: ${d.alasan}. Berikan saran verifikasi.`);
                aiBox.innerText = res.response.text();
            } catch (e) { aiBox.innerText = "Error AI."; }
        };
    </script>
</body>
</html>
