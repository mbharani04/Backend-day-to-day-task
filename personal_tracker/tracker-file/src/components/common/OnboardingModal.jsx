import React, { useState } from 'react';
import { Sparkles, Zap, ArrowRight } from 'lucide-react';
import { useProductivity } from '../../context/ProductivityContext';
import lionAvatar from '../../assets/lion.jpg';
import pandaAvatar from '../../assets/panda.png';

export const OnboardingModal = () => {
  const { profile, updateProfile } = useProductivity();

  const [form, setForm] = useState({
    name: 'Bharani',
    role: 'Full-Stack Developer',
    mainGoal: 'Master consistent daily focus and deep work',
    profileAvatar: lionAvatar,
  });

  // Show modal only if no profile exists or onboarded is false
  if (profile && profile.onboarded) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;

    updateProfile({
      ...form,
      email: `${form.name.toLowerCase().replace(/\s+/g, '')}@example.com`,
      phone: '+1 (555) 000-0000',
      education: 'Self-Improvement & CS',
      bio: form.mainGoal,
      skills: [],
      onboarded: true,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="w-full max-w-lg rounded-3xl glass-panel border border-indigo-500/30 p-6 lg:p-8 shadow-2xl space-y-6 relative overflow-hidden bg-slate-900/90">
        {/* Ambient Glow */}
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-400 text-white font-bold shadow-lg shadow-indigo-500/30 mb-2">
            <Zap className="w-7 h-7 animate-pulse" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight">
            Welcome to My Productivity 👋
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Let's personalize your life management & productivity OS.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="relative z-10 space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Your Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Bharani"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-800/80 border border-white/10 text-sm text-slate-100 placeholder-slate-500 focus:outline-hidden focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Your Role / Focus</label>
            <input
              type="text"
              placeholder="e.g. Full-Stack Developer & Student"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-800/80 border border-white/10 text-sm text-slate-100 placeholder-slate-500 focus:outline-hidden focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Your Main Goal</label>
            <input
              type="text"
              placeholder="e.g. 100 Days of Deep Work & System Design"
              value={form.mainGoal}
              onChange={(e) => setForm({ ...form, mainGoal: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-800/80 border border-white/10 text-sm text-slate-100 placeholder-slate-500 focus:outline-hidden focus:border-indigo-500"
            />
          </div>

          {/* Avatar Selector */}
          <div>
            <label className="block text-slate-300 font-semibold mb-2">Select Avatar</label>
            <div className="flex items-center gap-4">
              {[
                { url: lionAvatar, label: 'Lion' },
                { url: pandaAvatar, label: 'Panda' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => setForm({ ...form, profileAvatar: item.url })}
                  className={`flex items-center gap-2 p-2 rounded-2xl border-2 cursor-pointer transition-all ${
                    form.profileAvatar === item.url
                      ? 'border-indigo-500 bg-indigo-500/20 scale-105 shadow-md shadow-indigo-500/20'
                      : 'border-slate-700 bg-slate-800/50 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={item.url}
                    alt={item.label}
                    className="w-10 h-10 rounded-xl object-cover"
                  />
                  <span className="text-xs font-bold text-slate-200 pr-2">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-4 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white text-xs font-extrabold uppercase tracking-wider shadow-xl shadow-indigo-500/30 flex items-center justify-center gap-2 transition-all"
          >
            <span>Get Started & Open Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default OnboardingModal;
