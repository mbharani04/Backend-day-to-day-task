import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiMenu,
  FiSun,
  FiMoon,
  FiBell,
  FiPlus,
  FiSearch,
  FiClock,
  FiUser,
  FiSettings,
  FiLogOut,
  FiCheckCircle,
  FiX
} from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { navigationItems } from '../Sidebar/Sidebar';

const Navbar = ({ onOpenMobileSidebar }) => {
  const { isDark, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const { openQuickAction, reminders, activeTimer, toggleReminderCompleted } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Get active route title
  const currentItem = navigationItems.find(item => item.path === location.pathname);
  const pageTitle = currentItem ? currentItem.name : 'Dashboard';

  const pendingReminders = reminders.filter(r => !r.completed);

  return (
    <header className="sticky top-0 z-30 h-16 glass-panel border-b border-slate-200 dark:border-white/10 px-4 lg:px-8 flex items-center justify-between transition-colors">
      {/* Left: Mobile Toggle & Page Title */}
      <div className="flex items-center gap-4">
        <button
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10"
        >
          <FiMenu className="w-5 h-5" />
        </button>

        <div className="hidden sm:block">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
            {pageTitle}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
          </p>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2.5 sm:gap-4">
        {/* Global Search Button */}
        <button
          onClick={() => setShowSearchModal(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all text-xs font-medium"
        >
          <FiSearch className="w-4 h-4" />
          <span className="hidden md:inline">Search system...</span>
          <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] rounded bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-slate-300">
            ⌘K
          </kbd>
        </button>

        {/* Quick Action Button */}
        <button
          onClick={() => openQuickAction('target')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium text-xs shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:scale-105 active:scale-95 transition-all"
        >
          <FiPlus className="w-4 h-4" />
          <span className="hidden sm:inline">Quick Action</span>
        </button>

        {/* Timer Status Quick Pill */}
        <div
          onClick={() => navigate('/study')}
          className="cursor-pointer hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-indigo-500/10 dark:bg-indigo-500/20 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-semibold hover:bg-indigo-500/20 transition-all"
          title="Open Study Timer"
        >
          <FiClock className="w-4 h-4 animate-spin-slow" />
          <span>Timer Active</span>
        </div>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
          title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {isDark ? <FiSun className="w-5 h-5 text-amber-400" /> : <FiMoon className="w-5 h-5 text-slate-700" />}
        </button>

        {/* Notification Bell Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(prev => !prev)}
            className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
          >
            <FiBell className="w-5 h-5" />
            {pendingReminders.length > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
            )}
            {pendingReminders.length > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-rose-500" />
            )}
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-2 w-80 glass-panel rounded-2xl shadow-2xl p-4 border border-slate-200 dark:border-white/10 z-50"
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10">
                  <h4 className="font-semibold text-sm text-slate-900 dark:text-white">Reminders & Alerts</h4>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 font-medium">
                    {pendingReminders.length} Active
                  </span>
                </div>

                <div className="py-2 max-h-64 overflow-y-auto space-y-2">
                  {pendingReminders.length === 0 ? (
                    <p className="text-xs text-slate-500 dark:text-slate-400 text-center py-4">
                      No pending reminders! You're all caught up 🎉
                    </p>
                  ) : (
                    pendingReminders.map(rem => (
                      <div
                        key={rem.id}
                        className="flex items-start justify-between p-2.5 rounded-xl bg-slate-100/80 dark:bg-white/5 border border-slate-200/50 dark:border-white/5"
                      >
                        <div>
                          <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">{rem.title}</p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400">
                            {rem.date} at {rem.time}
                          </p>
                        </div>
                        <button
                          onClick={() => toggleReminderCompleted(rem.id)}
                          className="p-1 text-emerald-500 hover:bg-emerald-500/10 rounded-lg"
                          title="Mark Complete"
                        >
                          <FiCheckCircle className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  )}
                </div>

                <div className="pt-2 border-t border-slate-200 dark:border-white/10 text-center">
                  <button
                    onClick={() => { setShowNotifications(false); navigate('/reminders'); }}
                    className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    View All Reminders →
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User Profile Avatar Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(prev => !prev)}
            className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
          >
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80'}
              alt={user?.name || 'User'}
              className="w-8 h-8 rounded-xl object-cover ring-2 ring-indigo-500/40"
            />
          </button>

          <AnimatePresence>
            {showUserMenu && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-2 w-56 glass-panel rounded-2xl shadow-2xl p-2 border border-slate-200 dark:border-white/10 z-50"
              >
                <div className="p-3 border-b border-slate-200 dark:border-white/10">
                  <p className="font-semibold text-sm text-slate-900 dark:text-white truncate">{user?.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user?.email}</p>
                </div>

                <div className="py-1 space-y-0.5">
                  <button
                    onClick={() => { setShowUserMenu(false); navigate('/profile'); }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                  >
                    <FiUser className="w-4 h-4" /> Profile Details
                  </button>
                  <button
                    onClick={() => { setShowUserMenu(false); navigate('/settings'); }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                  >
                    <FiSettings className="w-4 h-4" /> System Settings
                  </button>
                </div>

                <div className="pt-1 border-t border-slate-200 dark:border-white/10">
                  <button
                    onClick={logout}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-rose-500 hover:bg-rose-500/10 transition-colors"
                  >
                    <FiLogOut className="w-4 h-4" /> Log Out
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Global Search Modal */}
      <AnimatePresence>
        {showSearchModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-start justify-center pt-20 px-4"
          >
            <motion.div
              initial={{ y: -20, scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: -20, scale: 0.95 }}
              className="w-full max-w-xl glass-panel rounded-2xl shadow-2xl p-4 border border-slate-200 dark:border-white/10 overflow-hidden"
            >
              <div className="flex items-center gap-3 pb-3 border-b border-slate-200 dark:border-white/10">
                <FiSearch className="w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search targets, notes, work entries..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full bg-transparent outline-none text-slate-900 dark:text-white placeholder-slate-400 text-sm"
                />
                <button
                  onClick={() => setShowSearchModal(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              <div className="py-4 text-center">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Type to search across all productivity data modules...
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
