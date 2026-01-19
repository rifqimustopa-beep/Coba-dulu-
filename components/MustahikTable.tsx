
import React from 'react';
import { Mustahik, MustahikStatus } from '../types';

interface MustahikTableProps {
  data: Mustahik[];
}

const statusColors: Record<MustahikStatus, string> = {
  [MustahikStatus.PENDING]: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
  [MustahikStatus.APPROVED]: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
  [MustahikStatus.SURVEY]: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  [MustahikStatus.REJECTED]: 'bg-rose-500/10 text-rose-500 border-rose-500/20'
};

const MustahikTable: React.FC<MustahikTableProps> = ({ data }) => {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl animate-in fade-in duration-700">
      <div className="p-6 border-b border-slate-700 flex justify-between items-center bg-slate-800/50 backdrop-blur-sm">
        <div>
          <h3 className="font-bold text-white tracking-tight">Database Mustahik Terdaftar</h3>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Real-time Cloud Records</p>
        </div>
        <div className="flex gap-2">
           <input 
            type="text" 
            placeholder="Cari Mustahik..." 
            className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-900/50 text-slate-500 text-[10px] font-black uppercase tracking-wider border-b border-slate-700">
              <th className="px-6 py-5">Nama & Identitas</th>
              <th className="px-6 py-5">Wilayah</th>
              <th className="px-6 py-5">Kategori Program</th>
              <th className="px-6 py-5">Tgl Input</th>
              <th className="px-6 py-5">Status</th>
              <th className="px-6 py-5 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {data.length > 0 ? data.map((m) => (
              <tr key={m.id} className="hover:bg-slate-700/30 transition-all group">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-700/50 border border-slate-600 rounded-xl flex items-center justify-center font-black text-emerald-500 transition-transform group-hover:scale-110">
                      {m.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white leading-tight">{m.name}</p>
                      <p className="text-[10px] text-slate-500 font-medium mt-0.5">ID: {m.id} | NIK: {m.nik || '---'}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5 text-xs text-slate-400 font-semibold">{m.location}</td>
                <td className="px-6 py-5">
                  <span className="text-[10px] font-black text-emerald-400 bg-emerald-500/5 px-3 py-1 rounded-lg border border-emerald-500/20 uppercase tracking-widest">
                    {m.category}
                  </span>
                </td>
                <td className="px-6 py-5 text-xs text-slate-500 font-bold uppercase">{m.submissionDate}</td>
                <td className="px-6 py-5">
                  <span className={`text-[10px] font-black px-3 py-1.5 rounded-xl border uppercase tracking-widest ${statusColors[m.status]}`}>
                    {m.status}
                  </span>
                </td>
                <td className="px-6 py-5 text-right">
                  <button className="bg-slate-700/50 hover:bg-emerald-600 text-slate-300 hover:text-white px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all">
                    Detail
                  </button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={6} className="py-20 text-center">
                  <div className="text-4xl mb-4">📭</div>
                  <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">Belum ada data pendaftar masuk...</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="p-5 bg-slate-900/30 text-center border-t border-slate-700">
        <button className="text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-emerald-500 transition-colors">Lihat Semua Data Database</button>
      </div>
    </div>
  );
};

export default MustahikTable;
