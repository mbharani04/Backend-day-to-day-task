import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  Calendar,
  Ticket,
  User,
  PlusCircle,
  Building2,
  Users,
  CheckSquare,
  LogOut,
  Compass,
  FileText,
  BarChart3
} from 'lucide-react';

export const Sidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  const getUserLinks = () => [
    { label: 'Dashboard', path: '/user/dashboard', icon: LayoutDashboard },
    { label: 'Explore Events', path: '/events', icon: Compass },
    { label: 'My Bookings', path: '/user/bookings', icon: Ticket },
    { label: 'Profile Settings', path: '/user/profile', icon: User },
  ];

  const getOrgLinks = () => [
    { label: 'Dashboard', path: '/organization/dashboard', icon: LayoutDashboard },
    { label: 'Create Event', path: '/organization/events/create', icon: PlusCircle, highlight: true },
    { label: 'My Events', path: '/organization/events', icon: Calendar },
    { label: 'Bookings Received', path: '/organization/bookings', icon: Ticket },
    { label: 'Org Profile', path: '/organization/profile', icon: Building2 },
  ];

  const getAdminLinks = () => [
    { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Event Approvals', path: '/admin/events', icon: CheckSquare },
    { label: 'Users Directory', path: '/admin/users', icon: Users },
    { label: 'Organizations', path: '/admin/organizations', icon: Building2 },
    { label: 'Global Bookings', path: '/admin/bookings', icon: Ticket },
  ];

  let navItems = [];
  let roleTitle = 'Portal';

  if (user?.role === 'admin') {
    navItems = getAdminLinks();
    roleTitle = 'Admin Portal';
  } else if (user?.role === 'organization') {
    navItems = getOrgLinks();
    roleTitle = 'Organization Portal';
  } else {
    navItems = getUserLinks();
    roleTitle = 'User Portal';
  }

  return (
    <aside className="w-full md:w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 shrink-0 min-h-[calc(100vh-4rem)] p-4 flex flex-col justify-between transition-colors">
      <div className="space-y-6">
        {/* User Badge Summary */}
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 text-white font-black flex items-center justify-center text-sm shadow-md shadow-indigo-500/20">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div className="overflow-hidden">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">{user?.name}</h4>
            <span className="text-[11px] font-medium capitalize text-indigo-600 dark:text-cyan-400 bg-indigo-50 dark:bg-slate-900 px-2 py-0.5 rounded-md inline-block">
              {user?.role}
            </span>
          </div>
        </div>

        {/* Section Heading */}
        <div>
          <span className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-2">
            {roleTitle} Navigation
          </span>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    active
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20 font-semibold'
                      : item.highlight
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/60'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-white' : ''}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Logout Action */}
      <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-1">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};
