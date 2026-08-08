import React from 'react';
import { Navigate, Outlet, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldAlert, ArrowLeft, LayoutDashboard } from 'lucide-react';

export const ProtectedRoute = ({ allowedRoles }) => {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Verifying session credentials...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    const getDashboardPath = (role) => {
      switch (role) {
        case 'admin':
          return '/admin/dashboard';
        case 'organization':
          return '/organization/dashboard';
        case 'user':
        default:
          return '/user/dashboard';
      }
    };

    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-12">
        <div className="p-8 max-w-md w-full text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl">
          <div className="w-20 h-20 bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner">
            <ShieldAlert className="w-10 h-10" />
          </div>
          <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50 rounded-full mb-3">
            Error 403
          </span>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Access Denied</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
            You do not have administrative permissions to view this route. You are logged in as{' '}
            <span className="font-semibold capitalize text-indigo-600 dark:text-indigo-400">{user?.role}</span>.
          </p>
          
          <div className="flex flex-col gap-3">
            <Link
              to={getDashboardPath(user?.role)}
              className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 transition-all"
            >
              <LayoutDashboard className="w-4 h-4" />
              Go to My {user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : ''} Dashboard
            </Link>
            <Link
              to="/events"
              className="w-full py-2.5 px-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium rounded-xl flex items-center justify-center gap-2 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Explore Public Events
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <Outlet />;
};

export const UserRoute = () => <ProtectedRoute allowedRoles={['user']} />;
export const AdminRoute = () => <ProtectedRoute allowedRoles={['admin']} />;
export const OrganizationRoute = () => <ProtectedRoute allowedRoles={['organization']} />;
