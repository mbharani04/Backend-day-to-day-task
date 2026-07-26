import React, { useState } from 'react';
import { User, Mail, Phone, GraduationCap, Briefcase, Award, CheckCircle2, Clock, Flame, BarChart2, Edit3, Save } from 'lucide-react';
import { PageTransition } from '../components/layout/PageTransition';
import { useProductivity } from '../context/ProductivityContext';
import { calculateStudyTimeStats, calculateStreak, calculateProductivityPercentage } from '../utils/calculations';
import lionAvatar from '../assets/lion.jpg';
import pandaAvatar from '../assets/panda.png';

export const Profile = () => {
  const { profile, updateProfile, tasks, studySessions, activityLogs, skills, targets } = useProductivity();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...profile });

  const studyStats = calculateStudyTimeStats(studySessions);
  const streakStats = calculateStreak(activityLogs, tasks, studySessions);
  const prodPct = calculateProductivityPercentage(tasks);
  const completedTasksCount = tasks.filter((t) => t.status === 'Completed').length;
  const masteredSkillsCount = skills.filter((s) => s.status === 'Completed').length;
  const completedTargetsCount = targets.filter((tg) => tg.status === 'Completed').length;

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
  };

  const avatarOptions = [lionAvatar, pandaAvatar];

  return (
    <PageTransition>
      <div className="space-y-6 pb-12">
        {/* Profile Card Header Banner */}
        <div className="relative p-6 lg:p-8 rounded-3xl glass-panel border border-white/10 overflow-hidden bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-indigo-950/40">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <img
              src={profile.profileAvatar}
              alt={profile.name}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover border-2 border-indigo-400/50 shadow-2xl shrink-0"
            />

            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
                    {profile.name}
                  </h1>
                  <p className="text-sm font-semibold text-indigo-400 mt-0.5">{profile.role}</p>
                </div>

                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-white/10 transition-all self-center md:self-start"
                >
                  <Edit3 className="w-4 h-4 text-cyan-400" />
                  <span>{isEditing ? 'Cancel Edit' : 'Edit Profile'}</span>
                </button>
              </div>

              <p className="mt-3 text-xs text-slate-300 max-w-2xl leading-relaxed">
                {profile.bio || 'No biography set yet.'}
              </p>

              <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-3 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-indigo-400" />
                  {profile.email}
                </span>
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-indigo-400" />
                  {profile.phone}
                </span>
                <span className="flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
                  {profile.education}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Lifetime Statistics Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { label: 'Tasks Done', value: completedTasksCount, icon: CheckCircle2, color: 'text-emerald-400' },
            { label: 'Study Hours', value: `${studyStats.weeklyHours}h`, icon: Clock, color: 'text-indigo-400' },
            { label: 'Streak', value: `${streakStats.currentStreak} Days`, icon: Flame, color: 'text-amber-400' },
            { label: 'Productivity', value: `${prodPct}%`, icon: BarChart2, color: 'text-purple-400' },
            { label: 'Skills Mastered', value: masteredSkillsCount, icon: Award, color: 'text-cyan-400' },
            { label: 'Goals Hit', value: completedTargetsCount, icon: Briefcase, color: 'text-pink-400' },
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="p-4 rounded-2xl glass-card border border-white/10 text-center">
                <Icon className={`w-5 h-5 mx-auto ${stat.color}`} />
                <span className="mt-2 text-xl font-black text-slate-100 block">{stat.value}</span>
                <span className="text-[10px] font-semibold text-slate-400 uppercase">{stat.label}</span>
              </div>
            );
          })}
        </div>

        {/* Profile Edit Form Modal / Box */}
        {isEditing && (
          <form onSubmit={handleSubmit} className="p-6 rounded-3xl glass-panel border border-white/10 space-y-4">
            <h3 className="text-lg font-bold text-slate-100 mb-2">Edit Profile Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-white/10 text-slate-100 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Role / Title</label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-white/10 text-slate-100 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-white/10 text-slate-100 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Phone Number</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-white/10 text-slate-100 focus:outline-hidden"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-slate-300 mb-1">Education / Degree</label>
                <input
                  type="text"
                  value={formData.education}
                  onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-white/10 text-slate-100 focus:outline-hidden"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-slate-300 mb-1">Bio</label>
                <textarea
                  rows={3}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-white/10 text-slate-100 focus:outline-hidden"
                />
              </div>

              {/* Avatar Selector */}
              <div className="md:col-span-2">
                <label className="block text-slate-300 mb-2">Choose Avatar Preset</label>
                <div className="flex gap-3">
                  {avatarOptions.map((url, idx) => (
                    <img
                      key={idx}
                      src={url}
                      alt="Preset"
                      onClick={() => setFormData({ ...formData, profileAvatar: url })}
                      className={`w-12 h-12 rounded-xl object-cover cursor-pointer border-2 transition-all ${
                        formData.profileAvatar === url ? 'border-indigo-400 scale-105' : 'border-transparent opacity-60'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5"
              >
                <Save className="w-4 h-4" />
                <span>Save Profile</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </PageTransition>
  );
};

export default Profile;
