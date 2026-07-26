import React, { useState, useEffect } from 'react';
import { X, Target as TargetIcon, Sparkles } from 'lucide-react';
import { useProductivity } from '../../context/ProductivityContext';

export const TargetModal = ({ isOpen, onClose, targetToEdit = null }) => {
  const { addTarget, updateTarget } = useProductivity();

  const [form, setForm] = useState({
    title: '',
    description: '',
    category: 'Study',
    type: 'Daily',
    targetValue: 5,
    currentProgress: 0,
    unit: 'Hours',
  });

  useEffect(() => {
    if (targetToEdit) {
      setForm({
        title: targetToEdit.title || '',
        description: targetToEdit.description || '',
        category: targetToEdit.category || 'Study',
        type: targetToEdit.type || 'Daily',
        targetValue: targetToEdit.targetValue || 5,
        currentProgress: targetToEdit.currentProgress || 0,
        unit: targetToEdit.unit || 'Hours',
      });
    } else {
      setForm({
        title: '',
        description: '',
        category: 'Study',
        type: 'Daily',
        targetValue: 5,
        currentProgress: 0,
        unit: 'Hours',
      });
    }
  }, [targetToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;

    // Determine target date label based on type
    let endDateDisplay = 'Today';
    if (form.type === 'Weekly') {
      endDateDisplay = 'End of Week';
    } else if (form.type === 'Monthly') {
      const monthName = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      endDateDisplay = `Monthly Goal (${monthName})`;
    }

    const payload = {
      ...form,
      targetValue: Number(form.targetValue) || 1,
      currentProgress: Number(form.currentProgress) || 0,
      endDate: endDateDisplay,
    };

    if (targetToEdit) {
      updateTarget(targetToEdit.id, payload);
    } else {
      addTarget(payload);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-lg rounded-3xl glass-panel border border-white/10 shadow-2xl overflow-hidden flex flex-col bg-slate-900/95">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10 bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400">
              <TargetIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100">
                {targetToEdit ? 'Edit Target Goal' : 'Create New Target'}
              </h3>
              <p className="text-xs text-slate-400">
                {targetToEdit ? 'Update your target goal milestones' : 'Set quantitative daily, weekly, or monthly goals'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Target Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Target Title <span className="text-emerald-400">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Master Backend Knowledge & APIs"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-white/10 text-sm text-slate-100 placeholder-slate-500 focus:outline-hidden focus:border-emerald-500"
              autoFocus
            />
          </div>

          {/* Category & Type */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-white/10 text-xs text-slate-100 focus:outline-hidden focus:border-emerald-500"
              >
                <option value="Study">Study</option>
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Health">Health</option>
                <option value="Project">Project</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Target Type</label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-white/10 text-xs text-slate-100 focus:outline-hidden focus:border-emerald-500"
              >
                <option value="Daily">Daily Target</option>
                <option value="Weekly">Weekly Target</option>
                <option value="Monthly">Monthly Target</option>
              </select>
            </div>
          </div>

          {/* Target Value, Current Progress & Unit */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Target Value</label>
              <input
                type="number"
                min="1"
                required
                value={form.targetValue}
                onChange={(e) => setForm({ ...form, targetValue: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-white/10 text-xs text-slate-100 focus:outline-hidden focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Current Progress</label>
              <input
                type="number"
                min="0"
                value={form.currentProgress}
                onChange={(e) => setForm({ ...form, currentProgress: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-white/10 text-xs text-slate-100 focus:outline-hidden focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Unit</label>
              <select
                value={form.unit}
                onChange={(e) => setForm({ ...form, unit: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-white/10 text-xs text-slate-100 focus:outline-hidden focus:border-emerald-500"
              >
                <option value="Hours">Hours</option>
                <option value="Tasks">Tasks</option>
                <option value="Pages">Pages</option>
                <option value="Projects">Projects</option>
                <option value="Lessons">Lessons</option>
                <option value="Custom">Custom</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
            <textarea
              rows={2}
              placeholder="Additional details about this goal milestone..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-white/10 text-xs text-slate-100 placeholder-slate-500 focus:outline-hidden focus:border-emerald-500"
            />
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-xs shadow-lg shadow-emerald-500/30 transition-all"
            >
              {targetToEdit ? 'Save Changes' : 'Create Target'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TargetModal;
