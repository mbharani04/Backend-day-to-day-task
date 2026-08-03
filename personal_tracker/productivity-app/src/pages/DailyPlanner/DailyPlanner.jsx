import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiClock, FiPlus, FiCheckCircle, FiTrash2, FiCheckSquare, FiSquare } from 'react-icons/fi';
import { v4 as uuidv4 } from 'uuid';
import { useApp } from '../../context/AppContext';

const DailyPlanner = () => {
  const { dailyPlanner, addPlannerTask, togglePlannerTask, deletePlannerTask } = useApp();

  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [task, setTask] = useState('');
  const [time, setTime] = useState('09:00 AM');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task) return;
    addPlannerTask({
      id: uuidv4(),
      date: selectedDate,
      time,
      task,
      description,
      completed: false
    });
    setTask('');
    setDescription('');
  };

  const tasksForSelectedDate = dailyPlanner.filter(t => t.date === selectedDate);
  const completedCount = tasksForSelectedDate.filter(t => t.completed).length;

  return (
    <div className="space-y-6">
      {/* Header & Date Selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5">
            <FiCalendar className="w-7 h-7 text-blue-500" /> Daily Planner & Timeline
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Structure your day into actionable time blocks and stay on track
          </p>
        </div>

        <div className="flex items-center gap-3 glass-panel px-4 py-2 rounded-2xl border border-slate-200 dark:border-white/10">
          <FiCalendar className="w-4 h-4 text-indigo-400" />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="bg-transparent outline-none text-xs font-semibold text-slate-900 dark:text-white"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Add Task Form */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-white/10 space-y-4 h-fit">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FiPlus className="w-4 h-4 text-blue-500" /> Add Schedule Item
          </h3>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Time Slot</label>
              <div className="relative">
                <FiClock className="absolute left-3 top-3 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="e.g. 09:30 AM"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Task Title</label>
              <input
                type="text"
                placeholder="e.g. Deep Work: System Architecture"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Description / Notes</label>
              <textarea
                placeholder="Details or deliverables for this slot..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-xs shadow-md shadow-indigo-500/20 hover:scale-[1.02] transition-all"
            >
              Add To Schedule
            </button>
          </form>
        </div>

        {/* Right: Timeline View */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border border-slate-200 dark:border-white/10 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Timeline for {selectedDate}
            </h3>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400">
              {completedCount} / {tasksForSelectedDate.length} Completed
            </span>
          </div>

          {tasksForSelectedDate.length === 0 ? (
            <div className="text-center py-12">
              <FiCalendar className="w-10 h-10 mx-auto text-slate-400 mb-2 opacity-50" />
              <p className="text-xs text-slate-500 dark:text-slate-400">No scheduled tasks for this date. Add one using the left form!</p>
            </div>
          ) : (
            <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-indigo-500/30">
              {tasksForSelectedDate.map(item => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`relative p-4 rounded-2xl border transition-all ${
                    item.completed
                      ? 'bg-emerald-500/5 border-emerald-500/30 opacity-75'
                      : 'glass-panel border-slate-200 dark:border-white/10'
                  }`}
                >
                  <div className="absolute -left-6 top-5 w-3 h-3 rounded-full bg-indigo-500 ring-4 ring-slate-900" />
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <button
                        onClick={() => togglePlannerTask(item.id)}
                        className="mt-0.5 text-indigo-500 hover:scale-110 transition-transform"
                      >
                        {item.completed ? (
                          <FiCheckSquare className="w-5 h-5 text-emerald-500" />
                        ) : (
                          <FiSquare className="w-5 h-5 text-slate-400" />
                        )}
                      </button>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400">
                            {item.time}
                          </span>
                          <h4 className={`text-sm font-bold text-slate-900 dark:text-white ${item.completed ? 'line-through text-slate-400' : ''}`}>
                            {item.task}
                          </h4>
                        </div>
                        {item.description && (
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{item.description}</p>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => deletePlannerTask(item.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DailyPlanner;
