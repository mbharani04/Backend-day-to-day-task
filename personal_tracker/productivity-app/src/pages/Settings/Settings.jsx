import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { FiSettings, FiSun, FiMoon, FiRotateCcw, FiDownload, FiUpload, FiBell, FiZap } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useTheme } from '../../context/ThemeContext';
import { useApp } from '../../context/AppContext';

const Settings = () => {
  const { isDark, toggleTheme } = useTheme();
  const { settings, setSettings, resetAllData, exportDataJSON, importDataJSON } = useApp();
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        importDataJSON(parsed);
      } catch (err) {
        toast.error('Invalid JSON file format!');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5">
          <FiSettings className="w-7 h-7 text-indigo-500" /> System Settings & Data Control
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Manage system preferences, dark mode styling, backup files, and local data persistence
        </p>
      </div>

      {/* Theme & Visual Preference */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-white/10 space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">Visual Appearance & Animations</h3>

        <div className="flex items-center justify-between py-2 border-b border-slate-200/50 dark:border-white/5">
          <div>
            <p className="text-xs font-bold text-slate-900 dark:text-white">Theme Mode</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Switch between dark glassmorphism and light mode</p>
          </div>
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-white/10 text-xs font-semibold text-slate-900 dark:text-white border border-slate-200 dark:border-white/10"
          >
            {isDark ? <FiSun className="w-4 h-4 text-amber-400" /> : <FiMoon className="w-4 h-4 text-slate-700" />}
            <span>{isDark ? 'Dark Mode Active' : 'Light Mode Active'}</span>
          </button>
        </div>

        <div className="flex items-center justify-between py-2 border-b border-slate-200/50 dark:border-white/5">
          <div>
            <p className="text-xs font-bold text-slate-900 dark:text-white">Framer Motion Animations</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Enable micro-interaction transitions and smooth card hovers</p>
          </div>
          <input
            type="checkbox"
            checked={settings?.animationEnabled ?? true}
            onChange={(e) => setSettings(prev => ({ ...prev, animationEnabled: e.target.checked }))}
            className="w-5 h-5 accent-indigo-600 cursor-pointer"
          />
        </div>

        <div className="flex items-center justify-between py-2">
          <div>
            <p className="text-xs font-bold text-slate-900 dark:text-white">In-App Notification Toasts</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Pop up reminder alerts and action notifications</p>
          </div>
          <input
            type="checkbox"
            checked={settings?.notificationEnabled ?? true}
            onChange={(e) => setSettings(prev => ({ ...prev, notificationEnabled: e.target.checked }))}
            className="w-5 h-5 accent-indigo-600 cursor-pointer"
          />
        </div>
      </div>

      {/* Data Backup & Import/Export */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-white/10 space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">Data Management & Backup</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          All your targets, study logs, work entries, financial records, and notes are saved locally in your browser.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <button
            onClick={exportDataJSON}
            className="flex items-center justify-center gap-2 p-3.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-white/10 transition-all"
          >
            <FiDownload className="w-4 h-4 text-indigo-400" /> Export System Data (JSON)
          </button>

          <button
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
            className="flex items-center justify-center gap-2 p-3.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-white/10 transition-all"
          >
            <FiUpload className="w-4 h-4 text-emerald-400" /> Import Data Backup (JSON)
          </button>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".json"
            className="hidden"
          />
        </div>
      </div>

      {/* Danger Zone */}
      <div className="glass-panel p-6 rounded-3xl border border-rose-500/30 bg-rose-500/5 space-y-4">
        <h3 className="text-base font-bold text-rose-500">Danger Zone</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Resetting will clear all current local storage data and restore initial seed demo data.
        </p>

        <button
          onClick={resetAllData}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-500/20 text-rose-400 hover:bg-rose-500/30 text-xs font-semibold border border-rose-500/30 transition-all"
        >
          <FiRotateCcw className="w-4 h-4" /> Reset All System Data to Default
        </button>
      </div>
    </div>
  );
};

export default Settings;
