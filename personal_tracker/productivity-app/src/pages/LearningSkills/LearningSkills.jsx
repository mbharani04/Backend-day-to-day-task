import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiBookOpen, FiPlus, FiTrash2, FiEdit2, FiCheckCircle, FiAward } from 'react-icons/fi';
import { v4 as uuidv4 } from 'uuid';
import { useApp } from '../../context/AppContext';

const LearningSkills = () => {
  const { skills, addSkill, updateSkill, deleteSkill } = useApp();

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);

  const [name, setName] = useState('');
  const [level, setLevel] = useState('Intermediate');
  const [targetHours, setTargetHours] = useState(100);
  const [completedHours, setCompletedHours] = useState(0);

  const resetForm = () => {
    setName('');
    setLevel('Intermediate');
    setTargetHours(100);
    setCompletedHours(0);
    setEditingSkill(null);
  };

  const handleOpenEdit = (skill) => {
    setEditingSkill(skill);
    setName(skill.name);
    setLevel(skill.level || 'Intermediate');
    setTargetHours(skill.targetHours || 100);
    setCompletedHours(skill.completedHours || 0);
    setShowAddModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) return;

    if (editingSkill) {
      updateSkill(editingSkill.id, {
        name,
        level,
        targetHours: Number(targetHours),
        completedHours: Number(completedHours),
        completed: Number(completedHours) >= Number(targetHours)
      });
    } else {
      addSkill({
        id: uuidv4(),
        name,
        level,
        targetHours: Number(targetHours),
        completedHours: Number(completedHours),
        completed: Number(completedHours) >= Number(targetHours)
      });
    }
    resetForm();
    setShowAddModal(false);
  };

  const totalMasteryHours = skills.reduce((sum, s) => sum + (s.completedHours || 0), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5">
            <FiBookOpen className="w-7 h-7 text-cyan-500" /> Learning & Skills Mastery
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Track skill roadmaps, logged practice hours, and competency levels
          </p>
        </div>

        <button
          onClick={() => { resetForm(); setShowAddModal(true); }}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold text-xs shadow-lg shadow-cyan-500/25 hover:scale-105 transition-all flex items-center gap-2"
        >
          <FiPlus className="w-4 h-4" /> Add New Skill
        </button>
      </div>

      {/* Overview Card */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-white/10 flex items-center justify-between bg-gradient-to-r from-cyan-500/10 to-blue-500/10">
        <div>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Practice Hours Logged</p>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">{totalMasteryHours} Hours</h2>
          <p className="text-xs text-cyan-400 font-semibold mt-1">across {skills.length} target skills</p>
        </div>
        <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-2xl">
          <FiAward />
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {skills.map(skill => {
          const percentage = Math.min(100, Math.round((skill.completedHours / skill.targetHours) * 100));
          return (
            <motion.div
              key={skill.id}
              layout
              className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-white/10 space-y-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white">{skill.name}</h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400">
                      {skill.level}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Progress: {skill.completedHours} / {skill.targetHours} hours
                  </p>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenEdit(skill)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10"
                  >
                    <FiEdit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteSkill(skill.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 dark:text-slate-400">Mastery Progress</span>
                  <span className="font-bold text-slate-900 dark:text-white">{percentage}%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-white/10 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Add / Edit Skill Modal */}
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
                {editingSkill ? 'Edit Skill Track' : 'Register New Skill'}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Skill Name</label>
                  <input
                    type="text"
                    placeholder="e.g. React 19 Design Systems"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Proficiency Level</label>
                  <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white outline-none"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Target Hours</label>
                    <input
                      type="number"
                      min="1"
                      value={targetHours}
                      onChange={(e) => setTargetHours(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Completed Hours</label>
                    <input
                      type="number"
                      min="0"
                      value={completedHours}
                      onChange={(e) => setCompletedHours(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white outline-none"
                    />
                  </div>
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
                    className="w-1/2 py-2.5 rounded-xl bg-cyan-600 text-white text-xs font-semibold shadow-lg shadow-cyan-500/25"
                  >
                    {editingSkill ? 'Update Skill' : 'Save Skill'}
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

export default LearningSkills;
