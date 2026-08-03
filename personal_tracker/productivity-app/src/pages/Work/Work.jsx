import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiBriefcase, FiPlus, FiClock, FiCheckSquare, FiSquare, FiTrash2, FiSearch } from 'react-icons/fi';
import { v4 as uuidv4 } from 'uuid';
import { useApp } from '../../context/AppContext';
import { formatDuration } from '../../utils/formatters';

const Work = () => {
  const { work, addWorkEntry, toggleWorkEntry, deleteWorkEntry } = useApp();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('13:00');
  const [searchQuery, setSearchQuery] = useState('');

  const calculateMinutes = (start, end) => {
    try {
      const [sH, sM] = start.split(':').map(Number);
      const [eH, eM] = end.split(':').map(Number);
      const diff = (eH * 60 + eM) - (sH * 60 + sM);
      return diff > 0 ? diff : 60;
    } catch {
      return 60;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;
    const minutes = calculateMinutes(startTime, endTime);
    addWorkEntry({
      id: uuidv4(),
      title,
      description,
      date,
      startTime,
      endTime,
      durationMinutes: minutes,
      completed: true
    });
    setTitle('');
    setDescription('');
  };

  const filteredWork = work.filter(w =>
    w.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (w.description && w.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const totalMinutes = work.reduce((sum, w) => sum + (w.durationMinutes || 0), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5">
            <FiBriefcase className="w-7 h-7 text-blue-500" /> Work & Project Sessions
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Log client work, software engineering tasks, and billable duration
          </p>
        </div>

        <div className="glass-panel px-4 py-2 rounded-2xl border border-slate-200 dark:border-white/10 flex items-center gap-3">
          <FiClock className="w-4 h-4 text-blue-400" />
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Work Logged:</span>
          <span className="text-sm font-bold text-slate-900 dark:text-white">{formatDuration(totalMinutes)}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Add Work Entry Form */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-white/10 space-y-4 h-fit">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FiPlus className="w-4 h-4 text-blue-500" /> Log Work Entry
          </h3>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Work Title / Client</label>
              <input
                type="text"
                placeholder="e.g. SaaS Dashboard Refactoring"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Description</label>
              <textarea
                placeholder="Deliverables & notes..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
                className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white outline-none"
              />
            </div>

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

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Start Time</label>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">End Time</label>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white outline-none"
                />
              </div>
            </div>

            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Calculated Duration: <strong className="text-blue-400">{formatDuration(calculateMinutes(startTime, endTime))}</strong>
            </p>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-xs shadow-md shadow-blue-500/20 hover:scale-[1.02] transition-all"
            >
              Save Work Entry
            </button>
          </form>
        </div>

        {/* Right: Work History List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="glass-panel p-3.5 rounded-2xl border border-slate-200 dark:border-white/10 relative">
            <FiSearch className="absolute left-3.5 top-3.5 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search work logs by title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-1.5 rounded-xl bg-slate-100 dark:bg-white/5 text-xs text-slate-900 dark:text-white outline-none"
            />
          </div>

          <div className="space-y-3">
            {filteredWork.map(w => (
              <motion.div
                key={w.id}
                layout
                className="glass-panel p-4 rounded-2xl border border-slate-200 dark:border-white/10 flex items-start justify-between gap-4"
              >
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => toggleWorkEntry(w.id)}
                    className="mt-0.5 text-blue-500 hover:scale-110 transition-transform"
                  >
                    {w.completed ? (
                      <FiCheckSquare className="w-5 h-5 text-emerald-500" />
                    ) : (
                      <FiSquare className="w-5 h-5 text-slate-400" />
                    )}
                  </button>

                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">{w.title}</h4>
                    {w.description && (
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{w.description}</p>
                    )}
                    <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-500 dark:text-slate-400">
                      <span>{w.date}</span>
                      <span>•</span>
                      <span>{w.startTime} - {w.endTime}</span>
                      <span>•</span>
                      <span className="font-bold text-blue-400">{formatDuration(w.durationMinutes)}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => deleteWorkEntry(w.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10"
                >
                  <FiTrash2 className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
