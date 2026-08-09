import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '../../components/DashboardLayout';
import { EmptyState } from '../../components/EmptyState';
import { getEvents, saveEvents } from '../../utils/storage';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { formatDate, getCategoryBadgeStyle, getStatusBadgeStyle } from '../../utils/helpers';
import { Calendar, PlusCircle, Edit3, Trash2, Eye, AlertTriangle } from 'lucide-react';

export const OrganizationEvents = () => {
  const { user } = useAuth();
  const { addToast } = useToast();

  const [myEvents, setMyEvents] = useState([]);

  useEffect(() => {
    loadMyEvents();
  }, [user]);

  const loadMyEvents = () => {
    const orgId = user?.organizationId || 'org-chennai-01';
    const all = getEvents();
    const mine = all.filter((e) => e.organizationId === orgId || user?.role === 'admin');
    setMyEvents(mine);
  };

  const handleDelete = (event) => {
    if (window.confirm(`Are you sure you want to delete '${event.title}'?`)) {
      const all = getEvents();
      const updated = all.filter((e) => e.id !== event.id);
      saveEvents(updated);
      addToast('Event deleted successfully.', 'info');
      loadMyEvents();
    }
  };

  return (
    <DashboardLayout
      title="My Event Listings"
      subtitle="Manage your created public events, track registration volume, and check approval feedback."
      action={
        <Link
          to="/organization/events/create"
          className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-600/20 transition-all flex items-center gap-1.5"
        >
          <PlusCircle className="w-4 h-4" />
          Create Event
        </Link>
      }
    >
      <div className="space-y-6">
        {myEvents.length === 0 ? (
          <EmptyState
            icon={Calendar}
            title="No Events Found"
            description="You haven't submitted any public events yet. Click below to create your first Chennai event."
            actionLabel="+ Create First Event"
            onAction={() => window.location.assign('/organization/events/create')}
          />
        ) : (
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200/80 dark:border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    <th className="py-4 px-6">Event Details</th>
                    <th className="py-4 px-6">Category</th>
                    <th className="py-4 px-6">Event Date</th>
                    <th className="py-4 px-6">Registrations</th>
                    <th className="py-4 px-6">Approval Status</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                  {myEvents.map((evt) => (
                    <tr key={evt.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="py-4 px-6">
                        <span className="font-bold text-slate-900 dark:text-white block max-w-xs truncate">
                          {evt.title}
                        </span>
                        <span className="text-[11px] text-slate-400 truncate max-w-xs block">
                          {evt.venue}, {evt.city}
                        </span>
                        {/* Rejection Alert Banner */}
                        {evt.status === 'rejected' && evt.rejectionReason && (
                          <div className="mt-2 p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-[11px] text-rose-700 dark:text-rose-300 flex items-start gap-1.5">
                            <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                            <span>Rejection Reason: {evt.rejectionReason}</span>
                          </div>
                        )}
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${getCategoryBadgeStyle(evt.category)}`}>
                          {evt.category}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-slate-600 dark:text-slate-300 whitespace-nowrap">
                        {formatDate(evt.date)}
                      </td>
                      <td className="py-4 px-6 font-bold text-slate-900 dark:text-white whitespace-nowrap">
                        {evt.registeredCount || 0} / {evt.maxParticipants}
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusBadgeStyle(evt.status)}`}>
                          {evt.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right whitespace-nowrap space-x-2">
                        <Link
                          to={`/events/${evt.id}`}
                          className="px-2.5 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 font-bold rounded-lg transition-colors inline-flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          View
                        </Link>
                        <Link
                          to={`/organization/events/edit/${evt.id}`}
                          className="px-2.5 py-1.5 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-cyan-400 hover:bg-indigo-100 font-bold rounded-lg transition-colors inline-flex items-center gap-1"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(evt)}
                          className="px-2.5 py-1.5 bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 hover:bg-rose-100 font-bold rounded-lg transition-colors inline-flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};
