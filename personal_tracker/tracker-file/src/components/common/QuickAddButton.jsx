import React, { useState } from 'react';
import { Plus, CheckSquare, Target, Bell, PartyPopper, FileText, BookOpen } from 'lucide-react';
import { useProductivity } from '../../context/ProductivityContext';

export const QuickAddButton = () => {
  const [open, setOpen] = useState(false);
  const { openQuickAdd } = useProductivity();

  const options = [
    { label: 'Add Task', type: 'task', icon: CheckSquare, color: 'bg-indigo-500' },
    { label: 'Add Target', type: 'target', icon: Target, color: 'bg-emerald-500' },
    { label: 'Add Reminder', type: 'reminder', icon: Bell, color: 'bg-amber-500' },
    { label: 'Add Event', type: 'event', icon: PartyPopper, color: 'bg-pink-500' },
    { label: 'Add Note', type: 'note', icon: FileText, color: 'bg-cyan-500' },
    { label: 'Add Skill', type: 'skill', icon: BookOpen, color: 'bg-purple-500' },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2 group">
      {/* Speed Dial Menu items */}
      {open && (
        <div className="flex flex-col items-end gap-2 mb-2 animate-in fade-in slide-in-from-bottom-5 duration-200">
          {options.map((opt) => {
            const Icon = opt.icon;
            return (
              <button
                key={opt.type}
                onClick={() => {
                  setOpen(false);
                  openQuickAdd(opt.type);
                }}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl glass-panel border border-white/10 text-slate-100 hover:text-white shadow-xl hover:scale-105 transition-all text-xs font-semibold"
              >
                <span>{opt.label}</span>
                <div className={`p-1.5 rounded-lg text-white ${opt.color}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Main Floating Shiny Button */}
      <button
        onClick={() => setOpen(!open)}
        className={`relative flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-400 text-white shadow-2xl shadow-indigo-500/40 hover:scale-110 active:scale-95 transition-all duration-300 ${
          open ? 'rotate-45' : 'rotate-0'
        }`}
        title="Quick Add Menu"
      >
        <Plus className="w-7 h-7" />
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
        </span>
      </button>
    </div>
  );
};

export default QuickAddButton;
