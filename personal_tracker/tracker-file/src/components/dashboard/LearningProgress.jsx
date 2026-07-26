import React from 'react';
import { BookOpen, Plus } from 'lucide-react';
import { useProductivity } from '../../context/ProductivityContext';

export const LearningProgress = () => {
  const { skills, openQuickAdd } = useProductivity();
  const activeSkills = skills.slice(0, 3);

  return (
    <div className="p-6 rounded-3xl glass-panel border border-white/10 flex flex-col h-full">
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div>
          <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            Learning & Skills
          </h3>
          <p className="text-xs text-slate-400">Active skill development goals</p>
        </div>

        <button
          onClick={() => openQuickAdd('skill')}
          className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-purple-400 hover:bg-slate-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 mt-4 space-y-3 max-h-72 overflow-y-auto pr-1">
        {activeSkills.length === 0 ? (
          <div className="py-10 text-center text-slate-400 text-xs flex flex-col items-center justify-center gap-2.5">
            <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20 animate-float">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <p className="font-bold text-slate-200 text-sm">No learning goals yet 🚀</p>
              <p className="text-slate-400 text-xs mt-0.5">Add a skill you want to learn.</p>
            </div>
            <button
              onClick={() => openQuickAdd('skill')}
              className="mt-1 flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs shadow-md shadow-purple-600/30 transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Add Skill</span>
            </button>
          </div>
        ) : (
          activeSkills.map((skill) => (
            <div
              key={skill.id}
              className="p-3.5 rounded-2xl glass-card border border-white/10 hover:border-purple-500/30 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 min-w-0">
                  <BookOpen className="w-4 h-4 text-purple-400 shrink-0" />
                  <span className="text-xs font-bold text-slate-100 truncate">
                    {skill.name}
                  </span>
                </div>
                <span className="text-xs font-bold text-purple-400">{skill.progress}%</span>
              </div>

              <div className="mt-2.5 w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-400 transition-all duration-500"
                  style={{ width: `${skill.progress}%` }}
                />
              </div>

              <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400">
                <span>Target: {skill.targetCompletionDate}</span>
                <span className="px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 font-semibold border border-purple-500/20">
                  {skill.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LearningProgress;
