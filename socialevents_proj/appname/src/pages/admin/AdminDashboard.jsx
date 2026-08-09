import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '../../components/DashboardLayout';
import { StatCard } from '../../components/StatCard';
import { getUsers, getOrganizations, getEvents, getBookings, saveEvents } from '../../utils/storage';
import { useToast } from '../../context/ToastContext';
import { formatDate, getStatusBadgeStyle } from '../../utils/helpers';
import {
  Users,
  Building2,
  Calendar,
  Clock,
  CheckCircle2,
  Ticket,
  ArrowRight,
  ShieldCheck,
  Check,
  X
} from 'lucide-react';

export const AdminDashboard = () => {
  const { addToast } = useToast();

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrganizations: 0,
    totalEvents: 0,
    pendingApprovals: 0,
    approvedEvents: 0,
    totalBookings: 0
  });

  const [pendingEventsList, setPendingEventsList] = useState([]);

  useEffect(() => {
    loadAdminStats();
  }, []);

  const loadAdminStats = () => {
    const users = getUsers();
    const orgs = getOrganizations();
    const events = getEvents();
    const bookings = getBookings();

    const pending = events.filter((e) => e.status === 'pending');
    const approved = events.filter((e) => e.status === 'approved');

    setStats({
      totalUsers: users.length,
      totalOrganizations: orgs.length,
      totalEvents: events.length,
      pendingApprovals: pending.length,
      approvedEvents: approved.length,
      totalBookings: bookings.length
    });

    setPendingEventsList(pending);
  };

  const handleQuickApprove = (eventId) => {
    const events = getEvents();
    const updated = events.map((e) =>
      e.id === eventId ? { ...e, status: 'approved' } : e
    );
    saveEvents(updated);
    addToast('Event approved successfully! Published to public discovery.', 'success');
    loadAdminStats();
  };

  return (
    <DashboardLayout
      title="Admin Control Center"
      subtitle="Dynamic SaaS oversight of Chennai platform metrics, users, organizations, and approvals."
    >
      <div className="space-y-8">
        {/* Dynamic Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <StatCard
            title="Total Platform Users"
            value={stats.totalUsers}
            icon={Users}
            color="indigo"
            subtitle="Registered user accounts"
          />
          <StatCard
            title="Registered Organizations"
            value={stats.totalOrganizations}
            icon={Building2}
            color="cyan"
            subtitle="Active event hosts"
          />
          <StatCard
            title="Total Events Created"
            value={stats.totalEvents}
            icon={Calendar}
            color="indigo"
            subtitle="Across all categories"
          />
          <StatCard
            title="Pending Event Approvals"
            value={stats.pendingApprovals}
            icon={Clock}
            color="amber"
            subtitle="Requires admin action"
          />
          <StatCard
            title="Approved Live Events"
            value={stats.approvedEvents}
            icon={CheckCircle2}
            color="emerald"
            subtitle="Publicly discoverable"
          />
          <StatCard
            title="Total Bookings Made"
            value={stats.totalBookings}
            icon={Ticket}
            color="rose"
            subtitle="Confirmed & tickets issued"
          />
        </div>

        {/* Pending Event Approvals Section */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-500" />
                Pending Event Submissions ({stats.pendingApprovals})
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Review host requests before making events public
              </p>
            </div>
            <Link
              to="/admin/events"
              className="text-xs font-bold text-indigo-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
            >
              View Approvals Hub
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {pendingEventsList.length === 0 ? (
            <div className="p-8 text-center bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700">
              <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">All submissions reviewed!</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                There are no pending events waiting for admin approval right now.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200/80 dark:border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    <th className="py-3 px-4">Event</th>
                    <th className="py-3 px-4">Organization</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Proposed Date</th>
                    <th className="py-3 px-4 text-right">Quick Approve</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                  {pendingEventsList.map((evt) => (
                    <tr key={evt.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-slate-900 dark:text-white max-w-xs truncate">
                        {evt.title}
                      </td>
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                        {evt.organizationName}
                      </td>
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                        {evt.category}
                      </td>
                      <td className="py-3 px-4 text-slate-500 dark:text-slate-400">
                        {formatDate(evt.date)}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => handleQuickApprove(evt.id)}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg transition-colors inline-flex items-center gap-1 shadow-sm"
                        >
                          <Check className="w-3.5 h-3.5" />
                          Approve
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};
