import React from 'react';
import { Activity, CheckCircle2, BookOpen, Sparkles, Award } from 'lucide-react';
import { useProductivity } from '../../context/ProductivityContext';

export const RecentActivity = () => {
  const { activityLogs } = useProductivity();
  const recentLogs = activityLogs.slice(0, 5);

  const getActivityIcon = (type) => {
    switch (type) {
      case 'task_completed':
        return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
      case 'study_session':
        return <BookOpen className="w-4 h-4 text-indigo-400" />;
      case 'target_completed':
        return <Award className="w-4 h-4 text-amber-400" />;
      default:
        return <Sparkles className="w-4 h-4 text-cyan-400" />;
    }
  };

  return (
    <div className="p-6 rounded-3xl glass-panel border border-white/10 flex flex-col h-full">
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div>
          <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            Recent Activity
          </h3>
          <p className="text-xs text-slate-400">Live action & accomplishment feed</p>
        </div>
        <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
          <Activity className="w-4 h-4" />
        </div>
      </div>

      <div className="flex-1 mt-3 space-y-2.5 max-h-72 overflow-y-auto pr-1">
        {recentLogs.length === 0 ? (
          <div className="py-10 text-center text-slate-400 text-xs flex flex-col items-center justify-center gap-2">
            <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20 animate-float">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <p className="font-bold text-slate-200 text-sm">No activity yet ✨</p>
              <p className="text-slate-400 text-xs mt-0.5">Complete a task or timer session to build your streak.</p>
            </div>
          </div>
        ) : (
          recentLogs.map((log) => (
            <div
              key={log.id}
              className="p-3 rounded-2xl bg-slate-900/40 border border-white/5 flex items-center gap-3 text-xs"
            >
              <div className="p-2 rounded-xl bg-slate-800 border border-white/10 shrink-0">
                {getActivityIcon(log.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-200 truncate">{log.title}</p>
                <span className="text-[10px] text-slate-500">{log.date}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentActivity;
