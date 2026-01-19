
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import StatCard from './components/StatCard';
import DistributionChart from './components/DistributionChart';
import MustahikTable from './components/MustahikTable';
import AIVerifier from './components/AIVerifier';
import ChatAssistant from './components/ChatAssistant';
import CitizenView from './components/CitizenView';
import { AppView, AppMode, Mustahik, MustahikStatus } from './types';
import { MOCK_MUSTAHIK } from './constants';

const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>('citizen');
  const [currentView, setCurrentView] = useState<AppView>('dashboard');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [mustahiks, setMustahiks] = useState<Mustahik[]>(MOCK_MUSTAHIK);

  const handleAddMustahik = (data: Partial<Mustahik>) => {
    const newRecord: Mustahik = {
      id: `MS-${String(mustahiks.length + 1).padStart(3, '0')}`,
      name: data.name || 'Anonymous',
      nik: data.nik || 'N/A',
      category: data.category || 'General',
      reason: data.reason || '',
      status: MustahikStatus.PENDING,
      submissionDate: new Date().toISOString().split('T')[0],
      location: 'Kota Jambi',
    };
    setMustahiks([newRecord, ...mustahiks]);
  };

  const renderAdminContent = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard title="Total Pengajuan" value={mustahiks.length} trend="+12.5%" statusText="bln ini" />
              <StatCard title="Processed / Diterima" value={mustahiks.filter(m => m.status === MustahikStatus.APPROVED).length} trend="+8.3%" statusText="Target tahun ini" />
              <StatCard title="Pending Verifikasi" value={mustahiks.filter(m => m.status === MustahikStatus.PENDING).length} trend="⏳ Sedang Proses" trendUp={false} statusText="Menunggu Survey" />
              <StatCard title="Dalam Survey" value={mustahiks.filter(m => m.status === MustahikStatus.SURVEY).length} trend="📍 Lapangan" statusText="Tim Kota Jambi" />
            </div>

            {/* Middle Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="bg-slate-800/70 border border-slate-700 rounded-2xl p-6 lg:col-span-1 shadow-xl">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-xs uppercase tracking-wider text-emerald-500 flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span> Distribusi Program
                  </h3>
                </div>
                <DistributionChart />
                <div className="mt-8 space-y-4">
                  {[
                    { label: 'Jambi Cerdas', color: 'bg-emerald-500', val: '45%' },
                    { label: 'Jambi Sehat', color: 'bg-blue-500', val: '25%' },
                    { label: 'Jambi Makmur', color: 'bg-amber-500', val: '20%' },
                  ].map((p) => (
                    <div key={p.label} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${p.color}`}></div>
                        <span className="text-xs text-slate-400 font-medium">{p.label}</span>
                      </div>
                      <span className="text-xs font-bold text-white">{p.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="bg-slate-800/70 border border-slate-700 rounded-2xl p-8 h-full flex flex-col shadow-xl">
                  <div className="flex justify-between items-center mb-8">
                    <div>
                      <h3 className="font-bold text-emerald-500 text-xs uppercase tracking-widest mb-1 flex items-center gap-2">
                        <span>🤖</span> Status Verifikasi AI (Smart Amil)
                      </h3>
                      <p className="text-slate-400 text-sm">Automasi Kecerdasan Buatan untuk Validasi Asnaf</p>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 text-xl border border-emerald-500/20">
                      AI
                    </div>
                  </div>
                  
                  <div className="flex-1 bg-slate-900/50 rounded-2xl p-6 border border-slate-700 mb-8">
                    <p className="text-slate-300 italic leading-relaxed text-base font-medium">
                      "Sistem AI Gemini siap menganalisis kelayakan calon penerima manfaat (mustahik) di Kota Jambi berdasarkan standar Asnaf 8 dan database kemiskinan daerah."
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div className="p-5 bg-slate-800/50 rounded-2xl border border-slate-700 hover:border-emerald-500/30 transition-all">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Akurasi Verifikasi</p>
                      <p className="text-2xl font-bold text-emerald-400 tracking-tight">98.2%</p>
                    </div>
                    <div className="p-5 bg-slate-800/50 rounded-2xl border border-slate-700 hover:border-blue-500/30 transition-all">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Kecepatan Analisis</p>
                      <p className="text-2xl font-bold text-blue-400 tracking-tight">1.2s <span className="text-xs font-normal text-slate-500">/berkas</span></p>
                    </div>
                  </div>

                  <button 
                    onClick={() => setCurrentView('ai-verifier')}
                    className="w-full py-4 bg-transparent border-2 border-emerald-500 text-emerald-500 rounded-2xl font-bold hover:bg-emerald-500 hover:text-white transition-all duration-300 uppercase tracking-widest text-xs shadow-lg shadow-emerald-500/10"
                  >
                    Mulai Verifikasi Berkas Massal
                  </button>
                </div>
              </div>
            </div>

            <MustahikTable data={mustahiks} />
          </div>
        );
      case 'ai-verifier':
        return <AIVerifier />;
      case 'mustahik':
        return <MustahikTable data={mustahiks} />;
      default:
        return (
          <div className="h-[60vh] flex flex-col items-center justify-center text-center">
            <div className="text-7xl mb-6">🚧</div>
            <h2 className="text-2xl font-bold text-white mb-2">Halaman Sedang Dikembangkan</h2>
            <p className="text-slate-500 max-w-sm">Tim IT BAZNAS Kota Jambi sedang mengintegrasikan modul data distribusi wilayah.</p>
            <button 
              onClick={() => setCurrentView('dashboard')}
              className="mt-8 bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-emerald-500 transition-all"
            >
              Kembali ke Dashboard
            </button>
          </div>
        );
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-700 ${mode === 'admin' ? 'bg-slate-900 text-slate-200' : 'bg-slate-50 text-slate-800'}`}>
      {/* Mode Navigation Bar */}
      <nav className={`fixed top-0 w-full z-50 border-b backdrop-blur-xl transition-all duration-500 px-8 py-4 flex justify-between items-center ${
        mode === 'admin' ? 'bg-slate-900/80 border-slate-800' : 'bg-white/80 border-slate-200'
      }`}>
        <div className="flex items-center gap-3">
          <div className={`p-1 rounded-lg shadow-sm transition-all duration-500 ${mode === 'admin' ? 'bg-white scale-110' : 'bg-slate-100'}`}>
            <img src="https://baznas.go.id/assets/img/baznas-logo.png" className="h-8" alt="BAZNAS Logo" />
          </div>
          <span className={`font-black tracking-tighter transition-colors duration-500 ${mode === 'admin' ? 'text-white' : 'text-emerald-600'}`}>
            BAZNAS KOTA JAMBI
          </span>
        </div>
        
        <div className={`flex p-1 rounded-full border transition-all duration-500 ${mode === 'admin' ? 'bg-slate-800 border-slate-700' : 'bg-slate-200 border-slate-300'}`}>
          <button 
            onClick={() => setMode('citizen')}
            className={`px-6 py-2 rounded-full font-black text-[10px] uppercase tracking-widest transition-all duration-500 ${
              mode === 'citizen' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Mode Warga
          </button>
          <button 
            onClick={() => setMode('admin')}
            className={`px-6 py-2 rounded-full font-black text-[10px] uppercase tracking-widest transition-all duration-500 ${
              mode === 'admin' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' : 'text-slate-500 hover:text-slate-400'
            }`}
          >
            Mode Admin
          </button>
        </div>
      </nav>

      {mode === 'admin' && <Sidebar currentView={currentView} setCurrentView={setCurrentView} />}
      
      <main className={`transition-all duration-500 pt-24 ${mode === 'admin' ? 'pl-64' : 'pl-0'}`}>
        {mode === 'admin' && (
          <header className="px-8 py-6 flex justify-between items-center border-b border-slate-800/50">
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">
                {currentView === 'dashboard' ? 'Dashboard Admin' : 
                 currentView === 'ai-verifier' ? 'Smart Amil AI Portal' : 
                 currentView === 'mustahik' ? 'Database Mustahik' : 
                 currentView.charAt(0).toUpperCase() + currentView.slice(1)}
              </h1>
              <p className="text-xs text-slate-500 font-medium">Monitoring & Verifikasi Mustahik <span className="text-emerald-500">BAZNAS Kota Jambi</span></p>
            </div>
            <div className="flex gap-4">
              <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-500 transition-colors">🔍</span>
                <input 
                  type="text" 
                  placeholder="Cari Mustahik/NIK..." 
                  className="bg-slate-800 border border-slate-700 rounded-xl py-2.5 pl-11 pr-4 text-sm text-white focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 w-64 transition-all" 
                />
              </div>
              <button 
                onClick={() => window.print()}
                className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-6 py-2.5 rounded-xl transition-all shadow-xl shadow-emerald-500/20 uppercase tracking-widest flex items-center gap-2"
              >
                <span>📤</span> Export Data
              </button>
            </div>
          </header>
        )}

        <div className="p-8">
          {mode === 'citizen' ? <CitizenView onAddMustahik={handleAddMustahik} /> : renderAdminContent()}
        </div>

        <footer className={`p-12 mt-12 border-t text-center transition-colors duration-500 ${mode === 'admin' ? 'border-slate-800/50' : 'border-slate-200'}`}>
          <p className={`text-[10px] font-bold uppercase tracking-widest leading-loose ${mode === 'admin' ? 'text-slate-600' : 'text-slate-400'}`}>
            © 2024 BAZNAS KOTA JAMBI - SISTEM INFORMASI LAYANAN ZAKAT (SILZ)<br/>
            DIDUKUNG OLEH SMART AMIL AI ANALYTICS
          </p>
        </footer>
      </main>

      {/* Floating Chat Bubble */}
      <button 
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full flex items-center justify-center text-2xl shadow-2xl shadow-emerald-500/40 z-50 transition-all hover:scale-110 active:scale-95 group"
        title="Bantuan Amil AI"
      >
        <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-20 pointer-events-none"></div>
        <span className="group-hover:rotate-12 transition-transform">💬</span>
      </button>

      {/* Chat Window */}
      <ChatAssistant isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
};

export default App;
