import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '../../components/DashboardLayout';
import { StatCard } from '../../components/StatCard';
import { getEvents, getBookings } from '../../utils/storage';
import { useAuth } from '../../context/AuthContext';
import { formatDate, getStatusBadgeStyle } from '../../utils/helpers';
import {
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  Ticket,
  PlusCircle,
  ArrowRight,
  Building2,
  AlertTriangle
} from 'lucide-react';

export const OrganizationDashboard = () => {
  const { user } = useAuth();

  const [orgStats, setOrgStats] = useState({
    totalEvents: 0,
    pendingEvents: 0,
    approvedEvents: 0,
    rejectedEvents: 0,
    totalRegistrations: 0
  });

  const [myEventsList, setMyEventsList] = useState([]);

  useEffect(() => {
    loadOrgData();
  }, [user]);

  const loadOrgData = () => {
    const orgId = user?.organizationId || 'org-chennai-01';
    const allEvents = getEvents();
    const myEvts = allEvents.filter((e) => e.organizationId === orgId || user?.role === 'admin');

    const pending = myEvts.filter((e) => e.status === 'pending');
    const approved = myEvts.filter((e) => e.status === 'approved');
    const rejected = myEvts.filter((e) => e.status === 'rejected');

    const allBookings = getBookings();
    const myBookings = allBookings.filter((b) => b.organizationId === orgId);

    setOrgStats({
      totalEvents: myEvts.length,
      pendingEvents: pending.length,
      approvedEvents: approved.length,
      rejectedEvents: rejected.length,
      totalRegistrations: myBookings.length
    });

    setMyEventsList(myEvts);
  };

  return (
    <DashboardLayout
      title={`Organization Portal • ${user?.name || 'Chennai Events'}`}
      subtitle="Manage your public event listings, monitor attendee registrations, and track admin approval status."
      action={
        <Link
          to="/organization/events/create"
          className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-600/20 transition-all flex items-center gap-1.5"
        >
          <PlusCircle className="w-4 h-4" />
          Create New Event
        </Link>
      }
    >
      <div className="space-y-8">
        {/* Org Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <StatCard
            title="Total Events"
            value={orgStats.totalEvents}
            icon={Calendar}
            color="indigo"
          />
          <StatCard
            title="Approved Events"
            value={orgStats.approvedEvents}
            icon={CheckCircle2}
            color="emerald"
          />
          <StatCard
            title="Pending Approval"
            value={orgStats.pendingEvents}
            icon={Clock}
            color="amber"
          />
          <StatCard
            title="Rejected Events"
            value={orgStats.rejectedEvents}
            icon={XCircle}
            color="rose"
          />
          <StatCard
            title="Total Registrations"
            value={orgStats.totalRegistrations}
            icon={Ticket}
            color="cyan"
          />
        </div>

        {/* My Created Events Summary */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                My Created Events
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Track status and attendee counts for your Chennai public events
              </p>
            </div>
            <Link
              to="/organization/events"
              className="text-xs font-bold text-indigo-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
            >
              Manage All Events
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {myEventsList.length === 0 ? (
            <div className="p-8 text-center bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700">
              <Building2 className="w-10 h-10 text-slate-400 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">No events created yet</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-4">
                Start organizing public workshops, summits, or cultural festivals in Chennai.
              </p>
              <Link
                to="/organization/events/create"
                className="px-4 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl"
              >
                + Create Event Now
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200/80 dark:border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    <th className="py-3 px-4">Event Title</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Registered</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                  {myEventsList.slice(0, 5).map((evt) => (
                    <tr key={evt.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                      <td className="py-3 px-4">
                        <span className="font-bold text-slate-900 dark:text-white block max-w-xs truncate">
                          {evt.title}
                        </span>
                        {evt.status === 'rejected' && evt.rejectionReason && (
                          <span className="text-[10px] text-rose-500 font-medium block truncate max-w-xs">
                            Reason: {evt.rejectionReason}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                        {evt.category}
                      </td>
                      <td className="py-3 px-4 text-slate-500 dark:text-slate-400 whitespace-nowrap">
                        {formatDate(evt.date)}
                      </td>
                      <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                        {evt.registeredCount || 0} / {evt.maxParticipants}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${getStatusBadgeStyle(evt.status)}`}>
                          {evt.status}
                        </span>
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
