import React, { useState } from 'react';
import { ClipboardCheck, Plus, Trash2, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';
import { PageTransition } from '../components/layout/PageTransition';
import { useProductivity } from '../context/ProductivityContext';
import { calculateAttendancePercentage } from '../utils/calculations';

export const Attendance = () => {
  const { attendance, addAttendanceCategory, recordAttendance, deleteAttendance } = useProductivity();

  const [showAddModal, setShowAddModal] = useState(false);
  const [newCat, setNewCat] = useState({
    category: '',
    requiredPercentage: 75,
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newCat.category.trim()) return;
    addAttendanceCategory(newCat);
    setNewCat({ category: '', requiredPercentage: 75 });
    setShowAddModal(false);
  };

  return (
    <PageTransition>
      <div className="space-y-6 pb-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl glass-panel border border-white/10">
          <div>
            <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
              <ClipboardCheck className="w-6 h-6 text-cyan-400" />
              Attendance Tracker
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Log daily presence, track mandatory percentage targets & avoid threshold warnings
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold text-xs shadow-lg shadow-cyan-500/25 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Category</span>
          </button>
        </div>

        {/* Attendance Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {attendance.length === 0 ? (
            <div className="col-span-full py-16 text-center text-slate-400 text-sm glass-panel rounded-3xl">
              No attendance categories set up yet.
            </div>
          ) : (
            attendance.map((item) => {
              const pct = calculateAttendancePercentage(item.present, item.totalClasses);
              const isLow = pct < item.requiredPercentage;

              return (
                <div
                  key={item.id}
                  className={`p-5 rounded-3xl glass-card border transition-all ${
                    isLow ? 'border-amber-500/40 bg-amber-500/5' : 'border-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-100 truncate max-w-[200px]">
                      {item.category}
                    </h3>
                    <button
                      onClick={() => deleteAttendance(item.id)}
                      className="p-1 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Percentage Metric */}
                  <div className="mt-4 flex items-baseline justify-between">
                    <span
                      className={`text-3xl font-black ${
                        isLow ? 'text-amber-400' : 'text-cyan-400'
                      }`}
                    >
                      {pct}%
                    </span>
                    <span className="text-xs text-slate-400 font-semibold">
                      Target: {item.requiredPercentage}%
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-2.5 w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isLow
                          ? 'bg-gradient-to-r from-amber-500 to-rose-500'
                          : 'bg-gradient-to-r from-cyan-500 to-indigo-500'
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>

                  {isLow && (
                    <p className="mt-2 text-[11px] text-amber-400 font-semibold flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                      Attendance is below required target!
                    </p>
                  )}

                  {/* Class Stats */}
                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
                    <div>
                      <span className="block text-[10px] text-slate-400">Present</span>
                      <span className="font-bold text-emerald-400">{item.present}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-slate-400">Absent</span>
                      <span className="font-bold text-rose-400">{item.absent}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-slate-400">Total</span>
                      <span className="font-bold text-slate-100">{item.totalClasses}</span>
                    </div>
                  </div>

                  {/* Log Actions */}
                  <div className="mt-4 flex items-center gap-2">
                    <button
                      onClick={() => recordAttendance(item.id, true)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 text-xs font-bold transition-colors"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Mark Present</span>
                    </button>
                    <button
                      onClick={() => recordAttendance(item.id, false)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 text-xs font-bold transition-colors"
                    >
                      <XCircle className="w-4 h-4" />
                      <span>Mark Absent</span>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Add Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="w-full max-w-md rounded-2xl glass-panel border border-white/10 p-6 space-y-4">
              <h3 className="text-base font-bold text-slate-100">Add Attendance Category</h3>
              <form onSubmit={handleAddSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-300 mb-1">Category Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. College - Computer Networks"
                    value={newCat.category}
                    onChange={(e) => setNewCat({ ...newCat, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-white/10 text-slate-100 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Required Percentage (%)</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={newCat.requiredPercentage}
                    onChange={(e) => setNewCat({ ...newCat, requiredPercentage: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-white/10 text-slate-100 focus:outline-hidden"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-1.5 rounded-xl bg-slate-800 text-slate-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-xl bg-cyan-600 text-white font-semibold"
                  >
                    Add Category
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
};

export default Attendance;
