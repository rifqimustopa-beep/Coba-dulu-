
import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  trend: string;
  trendUp?: boolean;
  statusText?: string;
  isInteractive?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, trend, trendUp = true, statusText }) => {
  return (
    <div className="bg-slate-800/70 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 transition-all hover:border-emerald-500 hover:-translate-y-1 group">
      <div className="flex justify-between items-start mb-4">
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{title}</p>
        <div className={`px-2 py-1 rounded-md text-[10px] font-bold flex items-center gap-1 ${trendUp ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
          {trendUp && <span>↗</span>}
          {trend}
        </div>
      </div>
      <h2 className="text-3xl font-bold text-white group-hover:text-emerald-500 transition-colors tracking-tight">{value}</h2>
      {statusText && (
        <p className="text-[10px] text-slate-500 mt-2 font-semibold">
          {statusText}
        </p>
      )}
    </div>
  );
};

export default StatCard;
