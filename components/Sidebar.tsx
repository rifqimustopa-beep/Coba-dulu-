
import React from 'react';
import { AppView } from '../types';

interface SidebarProps {
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊', section: 'Main Menu' },
    { id: 'distribution', label: 'Distribusi Zakat', icon: '💰', section: 'Main Menu' },
    { id: 'programs', label: 'Program Unggulan', icon: '📂', section: 'Main Menu' },
    { id: 'mustahik', label: 'Data Mustahik', icon: '👥', section: 'Data & Laporan' },
    { id: 'ai-verifier', label: 'Smart Amil AI', icon: '🤖', section: 'Data & Laporan' },
  ];

  return (
    <div className="w-64 bg-slate-800 border-r border-slate-700 h-screen fixed left-0 top-0 flex flex-col z-30">
      <div className="p-6 flex items-center gap-3 mb-4">
        <div className="bg-white p-2 rounded-lg shadow-xl shadow-emerald-500/10">
           <img 
            src="https://baznas.go.id/assets/img/baznas-logo.png" 
            alt="BAZNAS Logo" 
            className="h-8 w-auto object-contain"
          />
        </div>
        <div>
          <h2 className="font-bold text-lg text-emerald-500 leading-none tracking-tight">BAZNAS</h2>
          <p className="text-[10px] text-slate-500 font-bold tracking-widest uppercase">KOTA JAMBI</p>
        </div>
      </div>

      <nav className="flex-1 px-4 mt-2 space-y-1">
        {['Main Menu', 'Data & Laporan'].map((section) => (
          <div key={section} className="mb-6">
            <p className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">{section}</p>
            {menuItems.filter(i => i.section === section).map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id as AppView)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all text-sm font-semibold group ${
                  currentView === item.id 
                    ? 'bg-emerald-500/10 border-l-4 border-emerald-500 text-emerald-500' 
                    : 'text-slate-400 hover:bg-slate-700/50 hover:text-slate-200'
                }`}
              >
                <span className="text-lg grayscale group-hover:grayscale-0 transition-all">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-700 bg-slate-800/50">
        <div className="flex items-center gap-3 p-3 bg-slate-900/50 rounded-2xl border border-slate-700/50">
          <img src="https://picsum.photos/seed/amil/80/80" className="w-10 h-10 rounded-full border border-slate-700 ring-2 ring-emerald-500/20" alt="Avatar" />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-white truncate">Admin Amil</p>
            <p className="text-[10px] text-emerald-400 flex items-center gap-1 font-semibold">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
              Online
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
