import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiCheckCircle,
  FiAward,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiX,
  FiSave
} from 'react-icons/fi';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';
import { useApp } from '../../context/AppContext';

const moodEmojis = ['😖', '😕', '😐', '😊', '🚀'];

const DailyReview = () => {
  const {
    dailyPlanner,
    studySessions,
    work,
    dailyReview = [],
    addDailyReview,
    updateDailyReview,
    deleteDailyReview
  } = useApp();

  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [completedSummary, setCompletedSummary] = useState('');
  const [missedSummary, setMissedSummary] = useState('');
  const [tomorrowPriorities, setTomorrowPriorities] = useState('');
  const [moodScore, setMoodScore] = useState(5);

  // Edit Modal State
  const [editingReview, setEditingReview] = useState(null);
  const [editWins, setEditWins] = useState('');
  const [editMissed, setEditMissed] = useState('');
  const [editTomorrow, setEditTomorrow] = useState('');
  const [editMood, setEditMood] = useState(5);

  // Auto-calculated productivity score
  const todayTasks = dailyPlanner.filter(t => t.date === date);
  const completedToday = todayTasks.filter(t => t.completed).length;

  const todayStudyMins = studySessions
    .filter(s => s.date === date)
    .reduce((sum, s) => sum + (s.durationMinutes || 0), 0);

  const todayWorkMins = work
    .filter(w => w.date === date)
    .reduce((sum, w) => sum + (w.durationMinutes || 0), 0);

  const calculatedScore = Math.min(100, Math.round(
    (todayTasks.length ? (completedToday / todayTasks.length) * 50 : 30) +
    (todayStudyMins / 120) * 25 +
    (todayWorkMins / 240) * 25
  ));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!completedSummary) return;

    addDailyReview({
      id: uuidv4(),
      date,
      completedTasksSummary: completedSummary,
      missedTasksSummary: missedSummary || 'None',
      tomorrowPriorities,
      moodScore: Number(moodScore),
      productivityScore: calculatedScore
    });

    setCompletedSummary('');
    setMissedSummary('');
    setTomorrowPriorities('');
  };

  const handleOpenEdit = (rev) => {
    setEditingReview(rev);
    setEditWins(rev.completedTasksSummary || '');
    setEditMissed(rev.missedTasksSummary || '');
    setEditTomorrow(rev.tomorrowPriorities || '');
    setEditMood(rev.moodScore || 5);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editingReview) return;

    updateDailyReview(editingReview.id, {
      completedTasksSummary: editWins,
      missedTasksSummary: editMissed || 'None',
      tomorrowPriorities: editTomorrow,
      moodScore: Number(editMood)
    });

    setEditingReview(null);
  };

  const handleDelete = (id) => {
    deleteDailyReview(id);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5">
            <FiCheckCircle className="w-7 h-7 text-emerald-500" /> Daily Review & Reflection
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            End-of-day retrospective: evaluate wins, identify gaps, set tomorrow's top 3, and track productivity scores
          </p>
        </div>

        <div className="glass-panel px-5 py-3 rounded-2xl border border-slate-200 dark:border-white/10 bg-emerald-500/10">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Calculated Score Today</p>
          <p className="text-2xl font-extrabold text-emerald-400 mt-0.5">{calculatedScore} / 100 ⭐</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Review Submission Form */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border border-slate-200 dark:border-white/10 space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FiPlus className="w-4 h-4 text-emerald-500" /> Submit Today's Reflection ({date})
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                ✅ What did I complete today?
              </label>
              <textarea
                placeholder="Key accomplishments and completed milestones..."
                value={completedSummary}
                onChange={(e) => setCompletedSummary(e.target.value)}
                required
                rows={3}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500/40"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                ❌ What did I miss today?
              </label>
              <textarea
                placeholder="Unfinished tasks or distraction blockers..."
                value={missedSummary}
                onChange={(e) => setMissedSummary(e.target.value)}
                rows={2}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500/40"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                🎯 Top 3 priorities for tomorrow
              </label>
              <textarea
                placeholder="1. Build feature X&#10;2. Study topic Y&#10;3. Client meeting Z"
                value={tomorrowPriorities}
                onChange={(e) => setTomorrowPriorities(e.target.value)}
                required
                rows={3}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500/40"
              />
            </div>

            {/* Mood Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                😊 Mood Rating (1 to 5)
              </label>
              <div className="flex items-center gap-3">
                {[1, 2, 3, 4, 5].map(score => (
                  <button
                    key={score}
                    type="button"
                    onClick={() => setMoodScore(score)}
                    className={`w-12 h-12 rounded-2xl text-2xl flex items-center justify-center transition-all cursor-pointer ${
                      moodScore === score
                        ? 'bg-indigo-600 ring-4 ring-indigo-500/30 scale-110'
                        : 'bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10'
                    }`}
                  >
                    {moodEmojis[score - 1]}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-indigo-600 text-white font-semibold text-xs shadow-lg shadow-emerald-500/25 hover:scale-[1.01] transition-all cursor-pointer"
            >
              Save End-of-Day Review
            </button>
          </form>
        </div>

        {/* Right Reflection Logs History */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-white/10 space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FiAward className="w-4 h-4 text-amber-400" /> Past Daily Reflections
          </h3>

          <div className="space-y-4 max-h-[550px] overflow-y-auto pr-1">
            {dailyReview.length === 0 ? (
              <p className="text-xs text-slate-500 dark:text-slate-400 text-center py-8">
                No reflection entries yet. Submit your first daily reflection!
              </p>
            ) : (
              dailyReview.map(rev => (
                <div key={rev.id} className="p-4 rounded-2xl bg-slate-100/70 dark:bg-white/5 border border-slate-200/50 dark:border-white/5 space-y-2 group relative">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900 dark:text-white">📅 {rev.date}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-base">{moodEmojis[(rev.moodScore || 5) - 1]}</span>
                      <span className="font-bold text-emerald-400">{rev.productivityScore} pts</span>
                      
                      {/* Action Buttons: Edit & Delete */}
                      <div className="flex items-center gap-1 ml-2">
                        <button
                          onClick={() => handleOpenEdit(rev)}
                          className="p-1 rounded-lg text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 transition-colors cursor-pointer"
                          title="Edit Reflection"
                        >
                          <FiEdit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(rev.id)}
                          className="p-1 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
                          title="Delete Reflection"
                        >
                          <FiTrash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-600 dark:text-slate-300 space-y-1">
                    <p><strong className="text-emerald-400">Wins:</strong> {rev.completedTasksSummary}</p>
                    <p><strong className="text-rose-400">Missed:</strong> {rev.missedTasksSummary}</p>
                    <p><strong className="text-indigo-400">Tomorrow:</strong> {rev.tomorrowPriorities}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Edit Reflection Modal */}
      <AnimatePresence>
        {editingReview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-lg glass-panel p-6 rounded-3xl border border-slate-200 dark:border-white/10 shadow-2xl space-y-4 my-8"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10">
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                  <FiEdit2 className="w-5 h-5 text-indigo-500" /> Edit Daily Reflection ({editingReview.date})
                </h3>
                <button
                  onClick={() => setEditingReview(null)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveEdit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    ✅ Completed Wins Summary
                  </label>
                  <textarea
                    value={editWins}
                    onChange={(e) => setEditWins(e.target.value)}
                    required
                    rows={3}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500/40"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    ❌ Missed Tasks Summary
                  </label>
                  <textarea
                    value={editMissed}
                    onChange={(e) => setEditMissed(e.target.value)}
                    rows={2}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500/40"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    🎯 Priorities for Tomorrow
                  </label>
                  <textarea
                    value={editTomorrow}
                    onChange={(e) => setEditTomorrow(e.target.value)}
                    required
                    rows={3}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500/40"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    😊 Mood Rating
                  </label>
                  <div className="flex items-center gap-3">
                    {[1, 2, 3, 4, 5].map(score => (
                      <button
                        key={score}
                        type="button"
                        onClick={() => setEditMood(score)}
                        className={`w-10 h-10 rounded-xl text-xl flex items-center justify-center transition-all cursor-pointer ${
                          editMood === score
                            ? 'bg-indigo-600 ring-4 ring-indigo-500/30 scale-110'
                            : 'bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10'
                        }`}
                      >
                        {moodEmojis[score - 1]}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-white/10">
                  <button
                    type="button"
                    onClick={() => setEditingReview(null)}
                    className="px-5 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-700/60 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-300 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold shadow-lg shadow-indigo-500/25 hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <FiSave className="w-4 h-4" /> Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DailyReview;
