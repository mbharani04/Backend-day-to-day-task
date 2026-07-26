import React from 'react';
import { Target, Plus, PlusCircle, CheckCircle } from 'lucide-react';
import { useProductivity } from '../../context/ProductivityContext';

export const TodaysTargets = () => {
  const { targets, updateTargetProgress, openQuickAdd } = useProductivity();
  const dailyTargets = targets.filter((t) => t.type === 'Daily');

  return (
    <div className="p-6 rounded-3xl glass-panel border border-white/10 flex flex-col h-full">
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div>
          <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            Today's Targets
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              {dailyTargets.length}
            </span>
          </h3>
          <p className="text-xs text-slate-400">Track daily metrics and goal progress</p>
        </div>

        <button
          onClick={() => openQuickAdd('target')}
          className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-emerald-400 hover:bg-slate-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 mt-4 space-y-3 max-h-80 overflow-y-auto pr-1">
        {dailyTargets.length === 0 ? (
          <div className="py-10 text-center text-slate-400 text-xs flex flex-col items-center justify-center gap-2.5">
            <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 animate-float">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <p className="font-bold text-slate-200 text-sm">No targets created yet 🎯</p>
              <p className="text-slate-400 text-xs mt-0.5">Set your first daily, weekly, or monthly target.</p>
            </div>
            <button
              onClick={() => openQuickAdd('target')}
              className="mt-1 flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-md shadow-emerald-600/30 transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span> Create Target</span>
            </button>
          </div>
        ) : (
          dailyTargets.map((target) => {
            const pct = Math.round((target.currentProgress / target.targetValue) * 100);
            return (
              <div
                key={target.id}
                className="p-3.5 rounded-2xl glass-card border border-white/10 hover:border-emerald-500/30 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-100 truncate max-w-[200px]">
                    {target.title}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-emerald-400">
                      {target.currentProgress} / {target.targetValue} {target.unit}
                    </span>
                    <button
                      onClick={() => updateTargetProgress(target.id, 1)}
                      className="p-1 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/40 transition-colors"
                      title="Add 1 Progress"
                    >
                      <PlusCircle className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="mt-2.5 w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-400 transition-all duration-500"
                    style={{ width: `${Math.min(100, pct)}%` }}
                  />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default TodaysTargets;
