import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { PieChart as PieIcon } from 'lucide-react';
import { useProductivity } from '../../context/ProductivityContext';

export const ProductivityOverview = () => {
  const { tasks } = useProductivity();

  const completedCount = tasks.filter((t) => t.status === 'Completed').length;
  const pendingCount = tasks.filter((t) => t.status === 'Pending').length;
  const overdueCount = tasks.filter((t) => t.status === 'Overdue').length;

  const data = [
    { name: 'Completed', value: completedCount || 1, color: '#10b981' },
    { name: 'Pending', value: pendingCount || 1, color: '#6366f1' },
    { name: 'Overdue', value: overdueCount || 0, color: '#f43f5e' },
  ].filter((d) => d.value > 0);

  const total = completedCount + pendingCount + overdueCount;
  const pct = total > 0 ? Math.round((completedCount / total) * 100) : 0;

  return (
    <div className="p-6 rounded-3xl glass-panel border border-white/10 flex flex-col h-full">
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div>
          <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            Productivity Overview
          </h3>
          <p className="text-xs text-slate-400">Total Task completion ratio</p>
        </div>
        <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400">
          <PieIcon className="w-4 h-4" />
        </div>
      </div>

      {total === 0 ? (
        <div className="relative flex-1 flex flex-col items-center justify-center py-10 text-center text-xs text-slate-400 gap-2">
          <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 animate-float">
            <PieIcon className="w-6 h-6" />
          </div>
          <div>
            <p className="font-bold text-slate-200 text-sm">No productivity data yet</p>
            <p className="text-slate-400 text-xs mt-0.5 max-w-[200px] mx-auto">Complete your first task to start tracking your progress.</p>
          </div>
        </div>
      ) : (
        <div className="relative flex-1 flex flex-col items-center justify-center min-h-[220px]">
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={75}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderColor: 'rgba(255,255,255,0.1)',
                  borderRadius: '0.75rem',
                  color: '#fff',
                  fontSize: '12px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          {/* Center Percentage Display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-2xl font-black text-slate-100">{pct}%</span>
            <span className="text-[10px] font-semibold text-slate-400 uppercase">Rate</span>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="pt-3 border-t border-white/10 flex items-center justify-around text-xs">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          <span className="text-slate-400">Completed ({completedCount})</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
          <span className="text-slate-400">Pending ({pendingCount})</span>
        </div>
      </div>
    </div>
  );
};

export default ProductivityOverview;
