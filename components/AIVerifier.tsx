
import React, { useState } from 'react';
import { analyzeMustahik } from '../services/geminiService';
import { AIAnalysisResult } from '../types';

const AIVerifier: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    income: '',
    dependents: '',
    condition: ''
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AIAnalysisResult | null>(null);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await analyzeMustahik(formData);
      setResult(res);
    } catch (error) {
      console.error(error);
      alert('Error connecting to Smart Amil AI');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center text-xl">
            🤖
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Input Berkas Mustahik</h3>
            <p className="text-xs text-slate-400">Verifikasi otomatis berbasis Sharia Compliance</p>
          </div>
        </div>

        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase mb-1.5 tracking-wider">Nama Calon Mustahik</label>
            <input 
              type="text" 
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500" 
              placeholder="Contoh: Muhammad Yusuf"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase mb-1.5 tracking-wider">Pendapatan (Rp)</label>
              <input 
                type="number" 
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500" 
                placeholder="0"
                value={formData.income}
                onChange={(e) => setFormData({...formData, income: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase mb-1.5 tracking-wider">Jumlah Tanggungan</label>
              <input 
                type="number" 
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500" 
                placeholder="0"
                value={formData.dependents}
                onChange={(e) => setFormData({...formData, dependents: e.target.value})}
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase mb-1.5 tracking-wider">Deskripsi Kondisi</label>
            <textarea 
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white h-24 focus:outline-none focus:border-emerald-500" 
              placeholder="Jelaskan kondisi ekonomi, kesehatan, atau alasan pengajuan bantuan..."
              value={formData.condition}
              onChange={(e) => setFormData({...formData, condition: e.target.value})}
              required
            ></textarea>
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Menganalisis...
              </>
            ) : (
              'Analisis Kelayakan AI'
            )}
          </button>
        </form>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 relative overflow-hidden">
        {result ? (
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-lg font-bold text-white">Laporan Smart Amil</h3>
              <div className="bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                SCORE: {result.eligibilityScore}%
              </div>
            </div>

            <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
              <p className="text-sm font-bold text-emerald-400 mb-1">Rekomendasi Utama:</p>
              <p className="text-white text-base font-medium">{result.recommendation}</p>
            </div>

            <div className="space-y-4 mb-6">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Pertimbangan Utama:</p>
              <ul className="space-y-2">
                {result.reasoning.map((reason, i) => (
                  <li key={i} className="flex gap-3 text-sm text-slate-300">
                    <span className="text-emerald-500">✓</span>
                    {reason}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-slate-900 border border-slate-700 rounded-xl">
              <p className="text-xs font-bold text-slate-500 uppercase mb-2">Program Jambi Unggulan:</p>
              <div className="flex items-center gap-2">
                <span className="text-xl">🌟</span>
                <span className="text-emerald-400 font-bold">{result.suggestedProgram}</span>
              </div>
            </div>
            
            <button className="mt-6 w-full py-2.5 text-xs font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-widest border border-slate-700 rounded-lg hover:bg-slate-700">
              Download PDF Report
            </button>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center p-8 opacity-40">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-slate-400 font-medium italic">"Masukkan data pengajuan di sebelah kiri untuk mendapatkan analisis kelayakan otomatis berbasis asnaf zakat."</p>
          </div>
        )}
        
        {/* Decorative background element */}
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-emerald-600/5 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};

export default AIVerifier;
