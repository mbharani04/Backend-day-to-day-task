import React, { useState } from 'react';
import {
  Search,
  Bell,
  Sun,
  Moon,
  Menu,
  CheckCircle2,
  AlertTriangle,
  Info,
  X,
  Trash2,
  User,
  Settings as SettingsIcon,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useProductivity } from '../../context/ProductivityContext';
import { formatDate } from '../../utils/dateUtils';
import lionAvatar from '../../assets/lion.jpg';

export const Header = ({ onOpenMobileMenu }) => {
  const {
    theme,
    toggleTheme,
    profile,
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    clearNotifications,
    setSearchModalOpen,
  } = useProductivity();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const todayFormatted = formatDate(new Date());

  const getNotifIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-amber-400" />;
      case 'error':
        return <AlertTriangle className="w-4 h-4 text-rose-400" />;
      default:
        return <Info className="w-4 h-4 text-cyan-400" />;
    }
  };

  return (
    <header className="sticky top-0 z-30 h-16 glass-panel border-b border-white/10 px-4 lg:px-8 flex items-center justify-between transition-colors">
      {/* Left: Mobile Toggle & Date */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 rounded-xl bg-slate-800/60 text-slate-300 hover:text-white"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:flex flex-col">
          <span className="text-xs text-slate-400 font-medium">Today</span>
          <span className="text-sm font-bold text-slate-100">{todayFormatted}</span>
        </div>
      </div>

      {/* Center: Command Search Trigger */}
      <div className="flex-1 max-w-md mx-4">
        <button
          onClick={() => setSearchModalOpen(true)}
          className="w-full flex items-center justify-between px-4 py-2 rounded-xl bg-slate-800/50 hover:bg-slate-800/80 border border-white/10 text-slate-400 text-sm transition-all duration-200 group"
        >
          <div className="flex items-center gap-2.5">
            <Search className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition-colors" />
            <span className="truncate">Search tasks, events, notes, goals...</span>
          </div>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-mono font-semibold text-slate-400 bg-slate-700/50 rounded-md border border-slate-600">
            Ctrl K
          </kbd>
        </button>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-xl bg-slate-800/60 border border-white/10 text-slate-300 hover:text-amber-400 hover:bg-slate-800 transition-all duration-200"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
          ) : (
            <Moon className="w-4 h-4 text-indigo-400" />
          )}
        </button>

        {/* Notifications Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2.5 rounded-xl bg-slate-800/60 border border-white/10 text-slate-300 hover:text-cyan-400 hover:bg-slate-800 transition-all duration-200"
            title="Notification Center"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 rounded-full bg-indigo-500 text-white text-[10px] font-bold border-2 border-slate-900 animate-bounce">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown Drawer */}
          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 sm:w-96 rounded-2xl glass-panel border border-white/10 shadow-2xl z-50 p-4 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-slate-100">Notifications</span>
                  {unreadCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                      {unreadCount} New
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllNotificationsRead}
                      className="text-xs font-semibold text-indigo-400 hover:underline"
                    >
                      Mark all read
                    </button>
                  )}
                  {notifications.length > 0 && (
                    <button
                      onClick={clearNotifications}
                      className="p-1 rounded-md text-slate-400 hover:text-red-400 hover:bg-slate-800"
                      title="Clear notifications"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="p-1 rounded-md text-slate-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* List */}
              <div className="mt-3 max-h-80 overflow-y-auto space-y-2">
                {notifications.length === 0 ? (
                  <div className="py-8 text-center text-slate-500 text-xs">
                    No notifications yet
                  </div>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => markNotificationRead(n.id)}
                      className={`p-3 rounded-xl border text-xs transition-colors cursor-pointer flex gap-3 ${
                        !n.read
                          ? 'bg-slate-800/80 border-indigo-500/30 text-slate-200'
                          : 'bg-slate-900/40 border-white/5 text-slate-400'
                      }`}
                    >
                      <div className="mt-0.5 shrink-0">{getNotifIcon(n.type)}</div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-slate-100">{n.title}</p>
                        <p className="mt-0.5 text-slate-400 leading-snug">{n.message}</p>
                        <span className="mt-1 block text-[10px] text-slate-500">
                          {new Date(n.timestamp).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Avatar Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-800/60 transition-colors"
          >
            <img
              src={profile?.profileAvatar || lionAvatar}
              alt={profile?.name || 'User'}
              className="w-8 h-8 rounded-xl object-cover border border-indigo-400/40 shadow-xs"
            />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-3 w-56 rounded-2xl glass-panel border border-white/10 shadow-2xl z-50 p-2 text-xs animate-in fade-in zoom-in-95 duration-200">
              <div className="px-3 py-2 border-b border-white/10 mb-1">
                <p className="font-bold text-slate-100 truncate">{profile?.name || 'Bharani'}</p>
                <p className="text-[10px] text-slate-400 truncate">{profile?.email || 'bharani@example.com'}</p>
              </div>
              <NavLink
                to="/profile"
                onClick={() => setShowProfileMenu(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white"
              >
                <User className="w-4 h-4 text-indigo-400" />
                <span>My Profile</span>
              </NavLink>
              <NavLink
                to="/settings"
                onClick={() => setShowProfileMenu(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white"
              >
                <SettingsIcon className="w-4 h-4 text-cyan-400" />
                <span>Settings</span>
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
