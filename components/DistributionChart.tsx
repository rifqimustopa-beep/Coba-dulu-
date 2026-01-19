
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { CHART_COLORS } from '../constants';

const data = [
  { name: 'Jambi Cerdas', value: 45 },
  { name: 'Jambi Sehat', value: 25 },
  { name: 'Jambi Makmur', value: 20 },
  { name: 'Jambi Peduli', value: 10 },
];

const DistributionChart: React.FC = () => {
  const total = data.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="h-[280px] w-full relative flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={100}
            paddingAngle={8}
            cornerRadius={10}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} stroke="none" />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '12px', color: '#fff' }}
            itemStyle={{ color: '#fff', fontSize: '12px' }}
            formatter={(value: number) => `${value}%`}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute flex flex-col items-center pointer-events-none">
        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Total</p>
        <p className="text-2xl font-bold text-white">{total}%</p>
      </div>
    </div>
  );
};

export default DistributionChart;
