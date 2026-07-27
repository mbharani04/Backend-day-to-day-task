import React from 'react';
import { Bell, Plus, CheckCircle, Clock } from 'lucide-react';
import { useProductivity } from '../../context/ProductivityContext';

export const UpcomingReminders = () => {
  const { reminders, toggleReminderCompletion, tasks, toggleTaskCompletion, openQuickAdd } = useProductivity();
  const todayStr = new Date().toISOString().split('T')[0];

  const pendingRemindersList = reminders
    .filter((r) => r.status !== 'Completed')
    .map((r) => ({
      id: r.id,
      title: r.title,
      date: r.date,
      time: r.time,
      isTask: false,
      badgeLabel: r.date < todayStr ? 'Overdue' : 'Pending',
      badgeClass: r.date < todayStr ? 'bg-rose-500/20 text-rose-300 border-rose-500/30' : 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    }));

  const pendingTasksList = tasks
    .filter((t) => t.status !== 'Completed' && !t.completed)
    .map((t) => {
      const isCarried = t.dueDate < todayStr;
      return {
        id: t.id,
        title: t.title,
        date: t.dueDate,
        time: t.dueTime || 'Anytime',
        isTask: true,
        badgeLabel: isCarried ? 'Carried Forward' : 'Pending',
        badgeClass: isCarried ? 'bg-amber-500/20 text-amber-300 border-amber-500/30 font-bold' : 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
      };
    });

  const combinedItems = [...pendingRemindersList, ...pendingTasksList]
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 6);

  return (
    <div className="p-6 rounded-3xl glass-panel border border-white/10 flex flex-col h-full">
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div>
          <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            Pending & Overdue Alerts
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
              {combinedItems.length}
            </span>
          </h3>
          <p className="text-xs text-slate-400">Scheduled reminders & carried-forward tasks</p>
        </div>

        <button
          onClick={() => openQuickAdd('reminder')}
          className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-amber-400 hover:bg-slate-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 mt-4 space-y-2.5 max-h-72 overflow-y-auto pr-1">
        {combinedItems.length === 0 ? (
          <div className="py-10 text-center text-slate-400 text-xs flex flex-col items-center justify-center gap-2.5">
            <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 animate-float">
              <Bell className="w-6 h-6" />
            </div>
            <div>
              <p className="font-bold text-slate-200 text-sm">No upcoming reminders or pending tasks 🔔</p>
              <p className="text-slate-400 text-xs mt-0.5">All alerts and tasks are clear.</p>
            </div>
            <button
              onClick={() => openQuickAdd('reminder')}
              className="mt-1 flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs shadow-md shadow-amber-600/30 transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span> Add Reminder</span>
            </button>
          </div>
        ) : (
          combinedItems.map((item) => (
            <div
              key={item.id}
              className="p-3.5 rounded-2xl glass-card border border-white/10 flex items-center justify-between gap-3 hover:border-amber-500/30 transition-all"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
                  <Bell className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-bold text-slate-100 truncate">{item.title}</p>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded border ${item.badgeClass}`}>
                      {item.badgeLabel}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                    <Clock className="w-3 h-3 text-amber-400" />
                    {item.date === todayStr ? 'Today' : item.date} {item.time ? `at ${item.time}` : ''}
                  </p>
                </div>
              </div>

              <button
                onClick={() => (item.isTask ? toggleTaskCompletion(item.id) : toggleReminderCompletion(item.id))}
                className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10 transition-colors"
                title="Mark Completed"
              >
                <CheckCircle className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UpcomingReminders;
