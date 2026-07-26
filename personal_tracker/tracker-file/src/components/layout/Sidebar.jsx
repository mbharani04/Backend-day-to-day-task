import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  User,
  Calendar,
  Bell,
  Target,
  BarChart3,
  BookOpen,
  ClipboardCheck,
  PartyPopper,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Zap,
  X,
} from 'lucide-react';
import { useProductivity } from '../../context/ProductivityContext';
import lionAvatar from '../../assets/lion.jpg';

export const Sidebar = ({ isMobileOpen, setIsMobileOpen }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { profile, resetApplicationData } = useProductivity();

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'Profile', icon: User, path: '/profile' },
    { name: 'Calendar', icon: Calendar, path: '/calendar' },
    { name: 'Reminders', icon: Bell, path: '/reminders' },
    { name: 'Targets', icon: Target, path: '/targets' },
    { name: 'Productivity & Improvement', icon: BarChart3, path: '/productivity' },
    { name: 'Learning / Skills', icon: BookOpen, path: '/learning' },
    { name: 'Attendance', icon: ClipboardCheck, path: '/attendance' },
    { name: 'Events', icon: PartyPopper, path: '/events' },
    { name: 'Notes', icon: FileText, path: '/notes' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  const handleResetData = () => {
    if (window.confirm('Are you sure you want to reset all local storage data to initial demo state?')) {
      resetApplicationData();
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen transition-all duration-300 ease-in-out glass-panel border-r border-white/10 flex flex-col justify-between ${
          collapsed ? 'w-20' : 'w-64'
        } ${
          isMobileOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Top Brand Header */}
        <div>
          <div className="flex items-center justify-between h-16 px-4 border-b border-white/10">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-400 text-white font-bold shadow-lg shadow-indigo-500/20 shrink-0">
                <Zap className="w-5 h-5 animate-pulse" />
              </div>
              {!collapsed && (
                <div className="flex flex-col whitespace-nowrap">
                  <span className="font-extrabold text-lg tracking-tight gradient-text">
                    Productivity
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium tracking-wider uppercase">
                    Life OS Dashboard
                  </span>
                </div>
              )}
            </div>

            {/* Desktop Collapse Toggle */}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden lg:flex items-center justify-center w-8 h-8 rounded-lg bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
              title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            >
              {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>

            {/* Mobile Close Button */}
            <button
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden flex items-center justify-center w-8 h-8 rounded-lg bg-slate-800/60 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-140px)]">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileOpen(false)}
                  className={({ isActive }) =>
                    `group relative flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-indigo-500/20 via-purple-500/15 to-transparent text-indigo-400 border border-indigo-500/30 shadow-xs'
                        : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/40'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        className={`w-5 h-5 shrink-0 transition-transform group-hover:scale-110 ${
                          isActive ? 'text-indigo-400' : 'text-slate-400 group-hover:text-cyan-400'
                        }`}
                      />
                      {!collapsed && (
                        <span className="truncate tracking-wide">{item.name}</span>
                      )}

                      {/* Tooltip on Collapsed Sidebar */}
                      {collapsed && (
                        <div className="absolute left-full ml-3 px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-semibold whitespace-nowrap border border-slate-700 shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-50">
                          {item.name}
                        </div>
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* User Profile & Reset Data Bottom Footer */}
        <div className="p-3 border-t border-white/10 bg-slate-900/40">
          {!collapsed ? (
            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-800/40 border border-white/5">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <img
                  src={profile?.profileAvatar || lionAvatar}
                  alt={profile?.name || 'User'}
                  className="w-9 h-9 rounded-full object-cover border border-indigo-400/40"
                />
                <div className="flex flex-col truncate">
                  <span className="text-xs font-bold text-slate-100 truncate">{profile?.name || 'Bharani'}</span>
                  <span className="text-[10px] text-indigo-300 truncate">{profile?.role || 'Full-Stack Developer'}</span>
                </div>
              </div>

              <button
                onClick={handleResetData}
                title="Reset Storage Data"
                className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex justify-center">
              <button
                onClick={handleResetData}
                title="Reset Storage Data"
                className="p-2.5 rounded-xl bg-slate-800/60 text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
