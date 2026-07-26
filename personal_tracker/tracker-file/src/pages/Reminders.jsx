import React, { useState } from 'react';
import { Bell, Plus, Trash2, CheckCircle2, Circle, Clock, ShieldAlert } from 'lucide-react';
import { PageTransition } from '../components/layout/PageTransition';
import { useProductivity } from '../context/ProductivityContext';
import { requestBrowserNotificationPermission } from '../utils/notifications';

export const Reminders = () => {
  const { reminders, toggleReminderCompletion, deleteReminder, openQuickAdd } = useProductivity();
  const [activeSection, setActiveSection] = useState('All'); // All | Today | Tomorrow | Upcoming | Overdue | Completed

  const todayStr = new Date().toISOString().split('T')[0];
  const tomorrowObj = new Date(Date.now() + 86400000);
  const tomorrowStr = tomorrowObj.toISOString().split('T')[0];

  const filteredReminders = reminders.filter((rem) => {
    if (activeSection === 'Today') return rem.date === todayStr && rem.status !== 'Completed';
    if (activeSection === 'Tomorrow') return rem.date === tomorrowStr && rem.status !== 'Completed';
    if (activeSection === 'Upcoming') return rem.date > tomorrowStr && rem.status !== 'Completed';
    if (activeSection === 'Overdue') return rem.date < todayStr && rem.status !== 'Completed';
    if (activeSection === 'Completed') return rem.status === 'Completed';
    return true;
  });

  return (
    <PageTransition>
      <div className="space-y-6 pb-12">
        {/* Header Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl glass-panel border border-white/10">
          <div>
            <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
              <Bell className="w-6 h-6 text-amber-400" />
              Reminders & Notification System
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Time-sensitive alerts that trigger in-app & browser popups
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={requestBrowserNotificationPermission}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-white/10 flex items-center gap-1.5"
            >
              <ShieldAlert className="w-4 h-4 text-cyan-400" />
              <span>Enable Browser Popups</span>
            </button>
            <button
              onClick={() => openQuickAdd('reminder')}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold text-xs shadow-lg shadow-amber-500/25 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>New Reminder</span>
            </button>
          </div>
        </div>

        {/* Section Tabs */}
        <div className="flex overflow-x-auto p-1.5 rounded-2xl glass-panel border border-white/10 gap-1 no-scrollbar">
          {['All', 'Today', 'Tomorrow', 'Upcoming', 'Overdue', 'Completed'].map((sec) => (
            <button
              key={sec}
              onClick={() => setActiveSection(sec)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeSection === sec
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {sec}
            </button>
          ))}
        </div>

        {/* List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredReminders.length === 0 ? (
            <div className="col-span-full py-16 text-center text-slate-400 text-sm glass-panel rounded-3xl">
              No reminders in "{activeSection}" category.
            </div>
          ) : (
            filteredReminders.map((rem) => (
              <div
                key={rem.id}
                className={`p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                  rem.status === 'Completed'
                    ? 'bg-slate-900/30 border-white/5 opacity-60'
                    : 'glass-card border-white/10 hover:border-amber-500/30'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <button
                      onClick={() => toggleReminderCompletion(rem.id)}
                      className="mt-0.5 text-slate-400 hover:text-amber-400 transition-colors"
                    >
                      {rem.status === 'Completed' ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-500 hover:text-amber-400" />
                      )}
                    </button>
                    <div className="flex-1 min-w-0">
                      <h4
                        className={`text-sm font-bold truncate ${
                          rem.status === 'Completed'
                            ? 'line-through text-slate-500'
                            : 'text-slate-100'
                        }`}
                      >
                        {rem.title}
                      </h4>
                      {rem.description && (
                        <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                          {rem.description}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-2 text-xs text-amber-400 font-semibold bg-amber-500/10 p-2 rounded-xl border border-amber-500/20">
                    <Clock className="w-4 h-4 shrink-0" />
                    <span>
                      {rem.date} at {rem.time}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                    {rem.priority || 'Medium'} Priority
                  </span>
                  <button
                    onClick={() => deleteReminder(rem.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800"
                    title="Delete Reminder"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default Reminders;
