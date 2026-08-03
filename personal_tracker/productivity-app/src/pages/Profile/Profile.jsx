import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiBook, FiCode, FiGlobe, FiGithub, FiLinkedin, FiTwitter, FiSave, FiCheckCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';

import lionImg from '../../assets/images/lion.jpg';
import pandaImg from '../../assets/images/panda.png';

const PRESET_AVATARS = [
  { id: 'lion', name: 'Lion Cub', src: lionImg },
  { id: 'panda', name: 'Panda Cub', src: pandaImg }
];

const Profile = () => {
  const { profile, setProfile } = useApp();
  const { updateUserProfile } = useAuth();

  const [name, setName] = useState(profile?.name || '');
  const [email, setEmail] = useState(profile?.email || '');
  const [avatar, setAvatar] = useState(profile?.avatar || lionImg);
  const [degree, setDegree] = useState(profile?.degree || '');
  const [bio, setBio] = useState(profile?.bio || '');
  const [skillsText, setSkillsText] = useState(Array.isArray(profile?.skills) ? profile.skills.join(', ') : '');
  const [github, setGithub] = useState(profile?.socialLinks?.github || '');
  const [linkedin, setLinkedin] = useState(profile?.socialLinks?.linkedin || '');
  const [twitter, setTwitter] = useState(profile?.socialLinks?.twitter || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    const skillsArray = skillsText.split(',').map(s => s.trim()).filter(Boolean);

    const updatedProfile = {
      name,
      email,
      avatar,
      degree,
      bio,
      skills: skillsArray,
      socialLinks: { github, linkedin, twitter }
    };

    setProfile(updatedProfile);
    updateUserProfile(updatedProfile);
    toast.success('Profile details updated and saved locally!');
  };

  const handleClear = () => {
    setName('');
    setEmail('');
    setAvatar(lionImg);
    setDegree('');
    setBio('');
    setSkillsText('');
    setGithub('');
    setLinkedin('');
    setTwitter('');
    toast('Form fields cleared! Ready for new user entries.', { icon: '🧹' });
  };

  const handleResetToSaved = () => {
    setName(profile?.name || '');
    setEmail(profile?.email || '');
    setAvatar(profile?.avatar || lionImg);
    setDegree(profile?.degree || '');
    setBio(profile?.bio || '');
    setSkillsText(Array.isArray(profile?.skills) ? profile.skills.join(', ') : '');
    setGithub(profile?.socialLinks?.github || '');
    setLinkedin(profile?.socialLinks?.linkedin || '');
    setTwitter(profile?.socialLinks?.twitter || '');
    toast('Reset to last saved profile', { icon: '🔄' });
  };

  const parsedSkills = skillsText.split(',').map(s => s.trim()).filter(Boolean);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5">
          <FiUser className="w-7 h-7 text-indigo-500" /> Personal Profile & Identity
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Customize your public avatar, academic background, key skill stacks, and bio
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Preview Card */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-white/10 text-center space-y-4">
          <img
            src={avatar}
            alt={name || 'User Avatar'}
            className="w-28 h-28 mx-auto rounded-3xl object-cover ring-4 ring-indigo-500/30 shadow-2xl transition-all duration-300"
          />
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {name || 'Your Name'}
            </h3>
            <p className="text-xs font-semibold text-indigo-400">
              {degree || 'Your Role / Degree Title'}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {email || 'your.email@domain.com'}
            </p>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 italic pt-2 border-t border-slate-200/50 dark:border-white/5">
            "{bio || 'No bio written yet. Enter your details on the right and click Save Profile!'}"
          </p>

          <div className="flex flex-wrap items-center justify-center gap-1.5 pt-2">
            {parsedSkills.length > 0 ? (
              parsedSkills.map((s, idx) => (
                <span key={idx} className="text-[10px] px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 font-semibold border border-indigo-500/20">
                  {s}
                </span>
              ))
            ) : (
              <span className="text-[10px] text-slate-400 italic">No skills listed</span>
            )}
          </div>

          <div className="flex items-center justify-center gap-4 pt-3 text-slate-400">
            {github && <a href={github} target="_blank" rel="noreferrer" className="hover:text-white"><FiGithub className="w-5 h-5" /></a>}
            {linkedin && <a href={linkedin} target="_blank" rel="noreferrer" className="hover:text-blue-400"><FiLinkedin className="w-5 h-5" /></a>}
            {twitter && <a href={twitter} target="_blank" rel="noreferrer" className="hover:text-cyan-400"><FiTwitter className="w-5 h-5" /></a>}
          </div>
        </div>

        {/* Right Editable Form */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border border-slate-200 dark:border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Edit Profile Details</h3>
            <button
              type="button"
              onClick={handleClear}
              className="text-xs text-rose-400 hover:text-rose-300 underline font-medium cursor-pointer"
            >
              Clear Form
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Choose Avatar Preset */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Choose Avatar Preset
              </label>
              <div className="flex items-center gap-3">
                {PRESET_AVATARS.map((preset) => {
                  const isSelected = avatar === preset.src;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => setAvatar(preset.src)}
                      className={`relative rounded-2xl overflow-hidden p-0.5 border-2 transition-all cursor-pointer ${
                        isSelected
                          ? 'border-indigo-500 ring-2 ring-indigo-500/50 scale-105 shadow-md shadow-indigo-500/30'
                          : 'border-transparent hover:border-slate-400 dark:hover:border-slate-600 opacity-70 hover:opacity-100'
                      }`}
                      title={preset.name}
                    >
                      <img
                        src={preset.src}
                        alt={preset.name}
                        className="w-14 h-14 object-cover rounded-xl"
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500/40"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500/40"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Avatar Image URL / Custom Source</label>
                <input
                  type="text"
                  placeholder="Image URL or preset"
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500/40"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Degree / Role Title</label>
                <input
                  type="text"
                  placeholder="e.g. Software Engineer / B.S. CS"
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500/40"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Skills (Comma-separated)</label>
              <input
                type="text"
                value={skillsText}
                onChange={(e) => setSkillsText(e.target.value)}
                placeholder="React.js, Node.js, System Architecture, UI/UX"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500/40"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Bio</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                placeholder="Write a brief introduction about yourself..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500/40"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">GitHub URL</label>
                <input
                  type="url"
                  placeholder="https://github.com/username"
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500/40"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">LinkedIn URL</label>
                <input
                  type="url"
                  placeholder="https://linkedin.com/in/username"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500/40"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Twitter URL</label>
                <input
                  type="url"
                  placeholder="https://twitter.com/username"
                  value={twitter}
                  onChange={(e) => setTwitter(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500/40"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-white/10">
              <button
                type="button"
                onClick={handleResetToSaved}
                className="px-5 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-700/60 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs transition-all cursor-pointer"
              >
                Reset
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-xs shadow-lg shadow-indigo-500/25 hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
              >
                <FiSave className="w-4 h-4" /> Save Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;

