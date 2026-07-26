import React, { useState } from 'react';
import { BookOpen, Plus, Trash2, CheckCircle2, Award, Calendar } from 'lucide-react';
import { PageTransition } from '../components/layout/PageTransition';
import { useProductivity } from '../context/ProductivityContext';

export const Learning = () => {
  const { skills, deleteSkill, updateSkillProgress, openQuickAdd } = useProductivity();

  return (
    <PageTransition>
      <div className="space-y-6 pb-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl glass-panel border border-white/10">
          <div>
            <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-purple-400" />
              Learning New Skills & Goals
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Track multi-day learning objectives, skill masteries & progress bars
            </p>
          </div>

          <button
            onClick={() => openQuickAdd('skill')}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold text-xs shadow-lg shadow-purple-500/25 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Skill Goal</span>
          </button>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {skills.length === 0 ? (
            <div className="col-span-full py-16 text-center text-slate-400 text-sm glass-panel rounded-3xl">
              No learning goals configured yet. Click Add Skill Goal above!
            </div>
          ) : (
            skills.map((skill) => {
              return (
                <div
                  key={skill.id}
                  className="p-5 rounded-3xl glass-card border border-white/10 hover:border-purple-500/30 flex flex-col justify-between transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                        {skill.category}
                      </span>
                      <button
                        onClick={() => deleteSkill(skill.id)}
                        className="p-1 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800"
                        title="Delete Skill"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <h3 className="mt-3 text-base font-bold text-slate-100">{skill.name}</h3>
                    {skill.description && (
                      <p className="mt-1 text-xs text-slate-400">{skill.description}</p>
                    )}

                    {/* Progress Slider / Input */}
                    <div className="mt-4">
                      <div className="flex items-center justify-between text-xs font-semibold mb-1">
                        <span className="text-slate-300">Progress</span>
                        <span className="text-purple-400">{skill.progress}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={skill.progress}
                        onChange={(e) => updateSkillProgress(skill.id, e.target.value)}
                        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                      />
                    </div>

                    <div className="mt-3 flex items-center justify-between text-[10px] text-slate-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-purple-400" />
                        Target: {skill.targetCompletionDate}
                      </span>
                      <span>{skill.durationDays || 30}-Day Goal</span>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        skill.status === 'Completed'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-purple-500/20 text-purple-300'
                      }`}
                    >
                      {skill.status}
                    </span>

                    {skill.status === 'Completed' && (
                      <span className="flex items-center gap-1 text-xs font-bold text-emerald-400">
                        <Award className="w-4 h-4" />
                        Mastered!
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default Learning;
