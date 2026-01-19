
import React, { useState } from 'react';
import { Mustahik } from '../types';

interface CitizenViewProps {
  onAddMustahik: (data: Partial<Mustahik>) => void;
}

const CitizenView: React.FC<CitizenViewProps> = ({ onAddMustahik }) => {
  const [form, setForm] = useState({
    name: '',
    nik: '',
    category: 'Jambi Cerdas',
    reason: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      onAddMustahik(form);
      setForm({ name: '', nik: '', category: 'Jambi Cerdas', reason: '' });
      setIsSubmitting(false);
      alert("Alhamdulillah, berkas Anda telah terkirim ke sistem BAZNAS Kota Jambi.");
    }, 1500);
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center mb-16">
        <span className="bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">Portal Publik</span>
        <h1 className="text-4xl font-black text-slate-800 mt-6 tracking-tight">Layanan Digital Mustahik</h1>
        <p className="text-slate-500 mt-3 font-medium max-w-lg mx-auto leading-relaxed">
          Selesaikan pengajuan bantuan Anda secara transparan dan cepat melalui platform Smart Amil BAZNAS Kota Jambi.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Form Section */}
        <div className="bg-white rounded-[2rem] p-8 shadow-2xl shadow-slate-200 border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500"></div>
          <h3 className="text-xl font-bold text-slate-800 mb-8 flex items-center gap-3">
            <span className="text-2xl">📝</span> Formulir Pengajuan
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nama Lengkap (Sesuai KTP)</label>
              <input 
                type="text" 
                required
                value={form.name}
                onChange={e => setForm({...form, name: e.target.value})}
                placeholder="Masukkan nama lengkap Anda..."
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-700 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-300"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nomor Induk Kependudukan (NIK)</label>
              <input 
                type="text" 
                required
                maxLength={16}
                value={form.nik}
                onChange={e => setForm({...form, nik: e.target.value})}
                placeholder="16 digit nomor NIK..."
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-700 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-300"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Program yang Dibutuhkan</label>
              <select 
                value={form.category}
                onChange={e => setForm({...form, category: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-700 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all"
              >
                <option>Jambi Cerdas (Pendidikan)</option>
                <option>Jambi Sehat (Kesehatan)</option>
                <option>Jambi Makmur (Ekonomi)</option>
                <option>Jambi Peduli (Sosial)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Alasan Pengajuan</label>
              <textarea 
                required
                value={form.reason}
                onChange={e => setForm({...form, reason: e.target.value})}
                placeholder="Ceritakan kondisi Anda saat ini dan mengapa Anda membutuhkan bantuan..."
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-700 h-32 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-300"
              ></textarea>
            </div>

            <button 
              disabled={isSubmitting}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-emerald-600/20 active:scale-95 disabled:bg-slate-300 uppercase tracking-[0.2em] text-xs"
            >
              {isSubmitting ? 'Mengirim Berkas...' : 'Kirim Pengajuan Sekarang'}
            </button>
          </form>
        </div>

        {/* Info Section */}
        <div className="space-y-8">
          <div className="bg-emerald-600 rounded-[2rem] p-10 text-white shadow-2xl shadow-emerald-500/30 relative overflow-hidden group">
            <div className="relative z-10">
              <h3 className="text-2xl font-black mb-4 tracking-tight">Kenapa Lewat Digital?</h3>
              <p className="text-emerald-50/80 leading-relaxed font-medium mb-8">
                BAZNAS Kota Jambi kini menggunakan teknologi Kecerdasan Buatan (AI) untuk mempercepat proses verifikasi data Anda secara objektif dan sesuai syariah.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl">
                  <p className="text-2xl font-black">24/7</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Siap Melayani</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl">
                  <p className="text-2xl font-black">100%</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Transparan</p>
                </div>
              </div>
            </div>
            <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-500"></div>
          </div>

          <div className="bg-slate-100 border border-slate-200 rounded-[2rem] p-8">
            <h4 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full"></span> 
              Alur Pengajuan
            </h4>
            <div className="space-y-6">
              {[
                { n: '01', t: 'Isi Formulir', d: 'Lengkapi data diri dan alasan pengajuan bantuan.' },
                { n: '02', t: 'Verifikasi AI', d: 'Sistem Smart Amil kami akan menganalisis berkas Anda secara otomatis.' },
                { n: '03', t: 'Survey Lapangan', d: 'Tim BAZNAS akan mengunjungi lokasi Anda untuk validasi data.' },
                { n: '04', t: 'Penyaluran', d: 'Bantuan akan disalurkan setelah dinyatakan layak menerima zakat.' }
              ].map((step, i) => (
                <div key={i} className="flex gap-4">
                  <span className="text-lg font-black text-emerald-500/50">{step.n}</span>
                  <div>
                    <p className="font-bold text-slate-800 text-sm">{step.t}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{step.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CitizenView;
