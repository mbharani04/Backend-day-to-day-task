import React, { useState } from 'react';
import { Target as TargetIcon, Plus, Trash2, Edit2, PlusCircle, CheckCircle, AlertTriangle, X } from 'lucide-react';
import { PageTransition } from '../components/layout/PageTransition';
import { useProductivity } from '../context/ProductivityContext';
import { TargetModal } from '../components/common/TargetModal';

export const Targets = () => {
  const { targets, deleteTarget, updateTargetProgress } = useProductivity();
  const [activeTab, setActiveTab] = useState('Daily'); // Daily | Weekly | Monthly

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetToEdit, setTargetToEdit] = useState(null);
  const [targetToDelete, setTargetToDelete] = useState(null);

  const filteredTargets = targets.filter((t) => t.type === activeTab);

  const handleOpenAddModal = () => {
    setTargetToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (target) => {
    setTargetToEdit(target);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (targetToDelete) {
      deleteTarget(targetToDelete.id);
      setTargetToDelete(null);
    }
  };

  const formatTargetDateDisplay = (target) => {
    if (target.type === 'Monthly') {
      const monthName = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      return `Monthly Goal (${monthName})`;
    }
    if (target.type === 'Weekly') {
      return 'End of Week';
    }
    return target.endDate || 'Today';
  };

  return (
    <PageTransition>
      <div className="space-y-6 pb-12">
        {/* Header Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl glass-panel border border-white/10">
          <div>
            <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
              <TargetIcon className="w-6 h-6 text-emerald-400" />
              Targets & Goal Milestones
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Set quantitative daily, weekly, and monthly productivity targets
            </p>
          </div>

          <button
            onClick={handleOpenAddModal}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold text-xs shadow-lg shadow-emerald-500/25 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Create Target</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex justify-center p-1.5 rounded-2xl glass-panel border border-white/10 max-w-md mx-auto">
          {['Daily', 'Weekly', 'Monthly'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === tab
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.toUpperCase()} TARGETS
            </button>
          ))}
        </div>

        {/* Target Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTargets.length === 0 ? (
            <div className="col-span-full py-16 text-center text-slate-400 text-sm glass-panel rounded-3xl flex flex-col items-center justify-center gap-3">
              <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 animate-float">
                <TargetIcon className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-slate-200 text-sm">No {activeTab.toLowerCase()} targets configured yet 🎯</p>
                <p className="text-slate-400 text-xs mt-0.5">Click Create Target above to start setting your milestones.</p>
              </div>
              <button
                onClick={handleOpenAddModal}
                className="mt-1 flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-md shadow-emerald-600/30 transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create Target</span>
              </button>
            </div>
          ) : (
            filteredTargets.map((target) => {
              const pct = Math.round((target.currentProgress / target.targetValue) * 100);
              const remaining = Math.max(0, target.targetValue - target.currentProgress);

              return (
                <div
                  key={target.id}
                  className="p-5 rounded-3xl glass-card border border-white/10 hover:border-emerald-500/30 flex flex-col justify-between transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        {target.category}
                      </span>

                      {/* Edit & Delete Action Buttons */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleOpenEditModal(target)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-slate-800 transition-colors"
                          title="Edit Target"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setTargetToDelete(target)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                          title="Delete Target"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <h3 className="mt-3 text-base font-bold text-slate-100">{target.title}</h3>
                    {target.description && (
                      <p className="mt-1 text-xs text-slate-400">{target.description}</p>
                    )}

                    {/* Metric Display */}
                    <div className="mt-4 flex items-baseline justify-between">
                      <span className="text-2xl font-black text-slate-100">
                        {target.currentProgress}{' '}
                        <span className="text-xs text-slate-400 font-normal">
                          / {target.targetValue} {target.unit}
                        </span>
                      </span>
                      <span className="text-xs font-bold text-emerald-400">{pct}%</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-2.5 w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-400 transition-all duration-500"
                        style={{ width: `${Math.min(100, pct)}%` }}
                      />
                    </div>

                    <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400">
                      <span>Remaining: {remaining} {target.unit}</span>
                      <span>Target: {formatTargetDateDisplay(target)}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        target.status === 'Completed'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-indigo-500/20 text-indigo-400'
                      }`}
                    >
                      {target.status}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateTargetProgress(target.id, 1)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 text-xs font-semibold transition-colors"
                      >
                        <PlusCircle className="w-3.5 h-3.5" />
                        <span>+1 {target.unit}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Target Add / Edit Reusable Modal */}
        <TargetModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          targetToEdit={targetToEdit}
        />

        {/* Delete Confirmation Modal */}
        {targetToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="w-full max-w-sm rounded-3xl glass-panel border border-rose-500/30 p-6 space-y-4 shadow-2xl bg-slate-900">
              <div className="flex items-start justify-between">
                <div className="p-3 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <button
                  onClick={() => setTargetToDelete(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-100">Delete this target?</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Are you sure you want to permanently delete "{targetToDelete.title}"?
                </p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/10">
                <button
                  onClick={() => setTargetToDelete(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-md shadow-rose-600/30 transition-all"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
};

export default Targets;
