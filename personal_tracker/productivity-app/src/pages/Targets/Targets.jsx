import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiTarget, FiPlus, FiSearch, FiFilter, FiTrash2, FiEdit2, FiCheckCircle, FiClock, FiAlertCircle } from 'react-icons/fi';
import { v4 as uuidv4 } from 'uuid';
import { useApp } from '../../context/AppContext';

const Targets = () => {
  const { targets, addTarget, updateTarget, deleteTarget } = useApp();

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTarget, setEditingTarget] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('Daily');
  const [priority, setPriority] = useState('High');
  const [progress, setProgress] = useState(0);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setType('Daily');
    setPriority('High');
    setProgress(0);
    setEditingTarget(null);
  };

  const handleOpenEdit = (t) => {
    setEditingTarget(t);
    setTitle(t.title);
    setDescription(t.description || '');
    setType(t.type || 'Daily');
    setPriority(t.priority || 'High');
    setProgress(t.progress || 0);
    setShowAddModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;

    if (editingTarget) {
      updateTarget(editingTarget.id, {
        title,
        description,
        type,
        priority,
        progress: Number(progress),
        completed: Number(progress) === 100
      });
    } else {
      addTarget({
        id: uuidv4(),
        title,
        description,
        type,
        priority,
        progress: Number(progress),
        completed: Number(progress) === 100,
        createdAt: new Date().toISOString().split('T')[0]
      });
    }
    resetForm();
    setShowAddModal(false);
  };

  // Filters
  const filteredTargets = targets.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (t.description && t.description.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = typeFilter === 'All' || t.type === typeFilter;
    const matchesPriority = priorityFilter === 'All' || t.priority === priorityFilter;
    return matchesSearch && matchesType && matchesPriority;
  });

  const totalTargets = targets.length;
  const completedTargets = targets.filter(t => t.completed || t.progress === 100).length;
  const highPriorityCount = targets.filter(t => t.priority === 'High').length;

  return (
    <div className="space-y-6">
      {/* Header & Stats Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5">
            <FiTarget className="w-7 h-7 text-indigo-500" /> Target Management Hub
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Define, track, and execute your high-impact daily, weekly, and monthly goals
          </p>
        </div>

        <button
          onClick={() => { resetForm(); setShowAddModal(true); }}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-xs shadow-lg shadow-indigo-500/25 hover:scale-105 transition-all flex items-center gap-2"
        >
          <FiPlus className="w-4 h-4" /> Create Target
        </button>
      </div>

      {/* Target Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-panel p-4 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Targets</p>
            <p className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">{totalTargets}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
            <FiTarget className="w-5 h-5" />
          </div>
        </div>

        <div className="glass-panel p-4 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Achieved</p>
            <p className="text-xl font-bold text-emerald-500 mt-0.5">{completedTargets}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
            <FiCheckCircle className="w-5 h-5" />
          </div>
        </div>

        <div className="glass-panel p-4 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">High Priority</p>
            <p className="text-xl font-bold text-rose-500 mt-0.5">{highPriorityCount}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center">
            <FiAlertCircle className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Search & Filter Control Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-200 dark:border-white/10 flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <FiSearch className="absolute left-3.5 top-3 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search target title or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white outline-none"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <FiFilter className="w-4 h-4" /> Filter:
          </div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white outline-none"
          >
            <option value="All">All Types</option>
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white outline-none"
          >
            <option value="All">All Priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>

      {/* Target Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTargets.map(t => (
          <motion.div
            key={t.id}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`glass-panel p-5 rounded-2xl border transition-all space-y-3 ${
              t.completed || t.progress === 100
                ? 'border-emerald-500/30 bg-emerald-500/5'
                : 'border-slate-200 dark:border-white/10'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={t.completed || t.progress === 100}
                  onChange={() => updateTarget(t.id, { completed: !(t.completed || t.progress === 100), progress: t.completed ? 50 : 100 })}
                  className="w-5 h-5 rounded-lg accent-indigo-600 cursor-pointer"
                />
                <div>
                  <h3 className={`font-bold text-sm text-slate-900 dark:text-white ${t.completed || t.progress === 100 ? 'line-through text-slate-400' : ''}`}>
                    {t.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{t.description}</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleOpenEdit(t)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-400 hover:bg-indigo-500/10"
                >
                  <FiEdit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteTarget(t.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10"
                >
                  <FiTrash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Badges & Progress Bar */}
            <div className="space-y-2 pt-2 border-t border-slate-200/50 dark:border-white/5">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full font-semibold text-[10px] ${
                    t.priority === 'High' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                    t.priority === 'Medium' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                    'bg-slate-500/20 text-slate-400 border border-slate-500/30'
                  }`}>
                    {t.priority} Priority
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/15 text-indigo-400 text-[10px] font-semibold">
                    {t.type}
                  </span>
                </div>
                <span className="font-bold text-slate-700 dark:text-slate-300">{t.progress || 0}%</span>
              </div>

              <div className="w-full bg-slate-200 dark:bg-white/10 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${t.progress || 0}%` }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Create / Edit Target Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-md glass-panel p-6 rounded-3xl border border-slate-200 dark:border-white/10 shadow-2xl space-y-4"
            >
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {editingTarget ? 'Edit Target' : 'Create Target Goal'}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Target Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Complete System Architecture Module"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Description</label>
                  <textarea
                    placeholder="Describe specific milestones..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={2}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Type</label>
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white outline-none"
                    >
                      <option value="Daily">Daily</option>
                      <option value="Weekly">Weekly</option>
                      <option value="Monthly">Monthly</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Priority</label>
                    <select
                      value={priority}
                      onChange={(e) => setPriority(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white outline-none"
                    >
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <label className="font-semibold text-slate-700 dark:text-slate-300">Completion Progress</label>
                    <span className="font-bold text-indigo-500">{progress}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={progress}
                    onChange={(e) => setProgress(e.target.value)}
                    className="w-full accent-indigo-600"
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="w-1/2 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-600 dark:text-slate-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-1/2 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-semibold shadow-lg shadow-indigo-500/25"
                  >
                    {editingTarget ? 'Update Target' : 'Save Target'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Targets;
