import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiGrid,
  FiTarget,
  FiCalendar,
  FiClock,
  FiBookOpen,
  FiBriefcase,
  FiDollarSign,
  FiPieChart,
  FiShoppingBag,
  FiFileText,
  FiBell,
  FiBarChart2,
  FiUser,
  FiSettings,
  FiCheckCircle,
  FiLogOut,
  FiChevronLeft,
  FiChevronRight,
  FiZap,
  FiX
} from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

export const navigationItems = [
  { name: 'Dashboard', path: '/dashboard', icon: FiGrid, badge: 'Overview' },
  { name: 'Targets', path: '/targets', icon: FiTarget },
  { name: 'Daily Planner', path: '/planner', icon: FiCalendar },
  { name: 'Study Hours', path: '/study', icon: FiClock },
  { name: 'Learning & Skills', path: '/skills', icon: FiBookOpen },
  { name: 'Work', path: '/work', icon: FiBriefcase },
  { name: 'Salary', path: '/salary', icon: FiDollarSign },
  { name: 'Savings', path: '/savings', icon: FiPieChart },
  { name: 'Things To Buy', path: '/shopping', icon: FiShoppingBag },
  { name: 'Notes', path: '/notes', icon: FiFileText },
  { name: 'Reminders', path: '/reminders', icon: FiBell },
  { name: 'Calendar', path: '/calendar', icon: FiCalendar },
  { name: 'Analytics', path: '/analytics', icon: FiBarChart2 },
  { name: 'Daily Review', path: '/daily-review', icon: FiCheckCircle, badge: 'Daily' },
  { name: 'Profile', path: '/profile', icon: FiUser },
  { name: 'Settings', path: '/settings', icon: FiSettings }
];

const Sidebar = ({ isMobileOpen, setIsMobileOpen }) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { logout, user } = useAuth();

  const toggleCollapse = () => setCollapsed(prev => !prev);

  const sidebarVariants = {
    expanded: { width: '260px', transition: { duration: 0.3, ease: 'easeInOut' } },
    collapsed: { width: '80px', transition: { duration: 0.3, ease: 'easeInOut' } }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Main Sidebar */}
      <motion.aside
        variants={sidebarVariants}
        animate={collapsed ? 'collapsed' : 'expanded'}
        className={`fixed top-0 left-0 bottom-0 z-50 glass-panel border-r border-slate-200 dark:border-white/10 flex flex-col justify-between transition-colors ${
          isMobileOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Header Branding */}
        <div>
          <div className="h-16 px-4 flex items-center justify-between border-b border-slate-200 dark:border-white/10">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30 flex-shrink-0">
                <FiZap className="w-5 h-5 animate-pulse" />
              </div>
              {!collapsed && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="whitespace-nowrap"
                >
                  <h1 className="font-bold text-lg text-slate-900 dark:text-white tracking-tight">
                    Nexus<span className="text-gradient">OS</span>
                  </h1>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">
                    Life Management
                  </p>
                </motion.div>
              )}
            </div>

            {/* Mobile Close Button */}
            <button
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10"
            >
              <FiX className="w-5 h-5" />
            </button>

            {/* Desktop Collapse Toggle */}
            <button
              onClick={toggleCollapse}
              className="hidden lg:flex p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white transition-colors"
              title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            >
              {collapsed ? <FiChevronRight className="w-5 h-5" /> : <FiChevronLeft className="w-5 h-5" />}
            </button>
          </div>

          {/* Navigation Links List */}
          <div className="px-3 py-4 overflow-y-auto max-h-[calc(100vh-140px)] space-y-1">
            {navigationItems.map(item => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileOpen(false)}
                  className={({ isActive }) =>
                    `relative flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 group ${
                      isActive
                        ? 'text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md shadow-indigo-500/25'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                    }`
                  }
                >
                  <Icon className={`w-5 h-5 flex-shrink-0 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : ''}`} />
                  {!collapsed && (
                    <span className="truncate flex-1">{item.name}</span>
                  )}
                  {!collapsed && item.badge && !isActive && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <motion.div
                      layoutId="activePill"
                      className="absolute right-2 w-1.5 h-5 rounded-full bg-white shadow-sm"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </NavLink>
              );
            })}
          </div>
        </div>

        {/* Footer User Info & Logout */}
        <div className="p-3 border-t border-slate-200 dark:border-white/10">
          {!collapsed ? (
            <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-slate-100/70 dark:bg-white/5 border border-slate-200/50 dark:border-white/5">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <img
                  src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80'}
                  alt={user?.name || 'User'}
                  className="w-8 h-8 rounded-lg object-cover ring-2 ring-indigo-500/30"
                />
                <div className="truncate">
                  <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                    {user?.name || 'Bharani Kumar'}
                  </p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                    {user?.email || 'bharani@example.com'}
                  </p>
                </div>
              </div>
              <button
                onClick={logout}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
                title="Logout"
              >
                <FiLogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={logout}
              className="w-full flex items-center justify-center p-3 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
              title="Logout"
            >
              <FiLogOut className="w-5 h-5" />
            </button>
          )}
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
