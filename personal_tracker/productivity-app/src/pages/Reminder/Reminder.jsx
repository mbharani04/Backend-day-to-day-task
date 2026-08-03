import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiBell, FiPlus, FiCheckCircle, FiTrash2, FiClock, FiAlertCircle } from 'react-icons/fi';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';
import { useApp } from '../../context/AppContext';

const Reminder = () => {
  const { reminders, addReminder, toggleReminderCompleted, deleteReminder } = useApp();

  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState('18:00');
  const [priority, setPriority] = useState('High');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;
    addReminder({
      id: uuidv4(),
      title,
      date,
      time,
      priority,
      completed: false
    });
    setTitle('');
  };

  const snoozeReminder = (rem) => {
    toast.success(`Snoozed "${rem.title}" for 15 minutes!`);
  };

  const pendingReminders = reminders.filter(r => !r.completed);
  const completedReminders = reminders.filter(r => r.completed);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5">
            <FiBell className="w-7 h-7 text-indigo-500" /> Reminders & Alert Center
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Never miss deadlines, scheduled syncs, or important recurring notifications
          </p>
        </div>

        <div className="glass-panel px-4 py-2 rounded-2xl border border-slate-200 dark:border-white/10 flex items-center gap-3">
          <FiBell className="w-4 h-4 text-rose-400 animate-bounce" />
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Active Alerts:</span>
          <span className="text-sm font-bold text-rose-400">{pendingReminders.length}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Form */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-white/10 space-y-4 h-fit">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FiPlus className="w-4 h-4 text-indigo-500" /> Create Reminder
          </h3>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Reminder Title</label>
              <input
                type="text"
                placeholder="e.g. Weekly Sprint Retrospective"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Time</label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white outline-none"
              >
                <option value="High">High Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="Low">Low Priority</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold text-xs shadow-md shadow-indigo-500/20 hover:scale-[1.02] transition-all"
            >
              Set Reminder
            </button>
          </form>
        </div>

        {/* Right Active & History Lists */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-white/10 space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FiAlertCircle className="w-4 h-4 text-rose-500" /> Pending Reminders ({pendingReminders.length})
            </h3>

            <div className="space-y-3">
              {pendingReminders.map(rem => (
                <div
                  key={rem.id}
                  className="p-4 rounded-2xl bg-slate-100/70 dark:bg-white/5 border border-slate-200/50 dark:border-white/5 flex items-center justify-between gap-4"
                >
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">{rem.title}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      📅 {rem.date} at ⏰ {rem.time}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => snoozeReminder(rem)}
                      className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20"
                    >
                      Snooze 15m
                    </button>
                    <button
                      onClick={() => toggleReminderCompleted(rem.id)}
                      className="p-2 rounded-lg text-emerald-500 hover:bg-emerald-500/10"
                      title="Mark Complete"
                    >
                      <FiCheckCircle className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => deleteReminder(rem.id)}
                      className="p-2 rounded-lg text-slate-400 hover:text-rose-400"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {completedReminders.length > 0 && (
            <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-white/10 space-y-3 opacity-60">
              <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400">Completed Reminders History</h3>
              <div className="divide-y divide-slate-200/50 dark:divide-white/5">
                {completedReminders.map(rem => (
                  <div key={rem.id} className="py-2.5 flex items-center justify-between text-xs">
                    <span className="line-through text-slate-500">{rem.title}</span>
                    <button
                      onClick={() => deleteReminder(rem.id)}
                      className="p-1 text-slate-400 hover:text-rose-400"
                    >
                      <FiTrash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reminder;
