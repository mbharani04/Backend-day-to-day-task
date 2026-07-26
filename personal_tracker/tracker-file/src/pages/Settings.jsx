import React, { useState } from 'react';
import { Settings as SettingsIcon, Sun, Moon, RotateCcw, Download, ShieldAlert, X } from 'lucide-react';
import { PageTransition } from '../components/layout/PageTransition';
import { useProductivity } from '../context/ProductivityContext';

export const Settings = () => {
  const { theme, toggleTheme, resetApplicationData, addNotification } = useProductivity();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleExportData = () => {
    const data = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith('productivity_')) {
        data[key] = localStorage.getItem(key);
      }
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `productivity-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    addNotification('Data Exported', 'LocalStorage backup downloaded successfully.', 'success');
  };

  const handleConfirmReset = () => {
    resetApplicationData();
    setShowConfirmModal(false);
  };

  return (
    <PageTransition>
      <div className="space-y-6 pb-12">
        {/* Header */}
        <div className="p-6 rounded-3xl glass-panel border border-white/10">
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <SettingsIcon className="w-6 h-6 text-slate-400" />
            Application Settings & Preferences
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage visual theme, data backup export & local storage reset
          </p>
        </div>

        {/* Options Container */}
        <div className="space-y-4 max-w-3xl">
          {/* Theme Option */}
          <div className="p-6 rounded-3xl glass-panel border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-indigo-500/20 text-indigo-400">
                {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5 text-amber-400" />}
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-100">Visual Theme</h3>
                <p className="text-xs text-slate-400">Current: {theme === 'dark' ? 'Dark Mode (Default)' : 'Light Mode'}</p>
              </div>
            </div>

            <button
              onClick={toggleTheme}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-white/10 transition-colors"
            >
              Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
            </button>
          </div>

          {/* Backup & Export */}
          <div className="p-6 rounded-3xl glass-panel border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-cyan-500/20 text-cyan-400">
                <Download className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-100">Export Local Data Backup</h3>
                <p className="text-xs text-slate-400">Download JSON snapshot of your productivity data</p>
              </div>
            </div>

            <button
              onClick={handleExportData}
              className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-colors"
            >
              Export Backup
            </button>
          </div>

          {/* Reset App Option */}
          <div className="p-6 rounded-3xl glass-panel border border-white/10 flex items-center justify-between border-rose-500/20">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-rose-500/20 text-rose-400">
                <RotateCcw className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-100">Reset All Data</h3>
                <p className="text-xs text-slate-400">Delete all local storage collections & start fresh</p>
              </div>
            </div>

            <button
              onClick={() => setShowConfirmModal(true)}
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-colors"
            >
              Reset All Data
            </button>
          </div>
        </div>

        {/* Confirmation Modal */}
        {showConfirmModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="w-full max-w-md rounded-3xl glass-panel border border-rose-500/30 p-6 space-y-4 shadow-2xl bg-slate-900">
              <div className="flex items-start justify-between">
                <div className="p-3 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div>
                <h3 className="text-lg font-extrabold text-slate-100">
                  Are you sure you want to delete all your productivity data?
                </h3>
                <p className="text-xs text-rose-400 font-semibold mt-1">
                  ⚠️ This action cannot be undone. All tasks, targets, notes, and activity history will be permanently removed.
                </p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmReset}
                  className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-extrabold shadow-lg shadow-rose-600/30 transition-all"
                >
                  Reset Everything
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
};

export default Settings;
