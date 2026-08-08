import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { Modal } from '../../components/Modal';
import { EmptyState } from '../../components/EmptyState';
import { getEvents, saveEvents } from '../../utils/storage';
import { useToast } from '../../context/ToastContext';
import { formatDate, getCategoryBadgeStyle, getStatusBadgeStyle } from '../../utils/helpers';
import { CheckSquare, Check, X, Eye, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminEvents = () => {
  const { addToast } = useToast();

  const [events, setEvents] = useState([]);
  const [activeTab, setActiveTab] = useState('All'); // All, Pending, Approved, Rejected
  const [rejectingEvent, setRejectingEvent] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = () => {
    const data = getEvents();
    setEvents(data);
  };

  const handleApprove = (event) => {
    const all = getEvents();
    const updated = all.map((e) =>
      e.id === event.id ? { ...e, status: 'approved', rejectionReason: '' } : e
    );
    saveEvents(updated);
    addToast(`Event '${event.title}' approved and published to public feed!`, 'success');
    loadEvents();
  };

  const openRejectModal = (event) => {
    setRejectingEvent(event);
    setRejectionReason('');
    setIsRejectModalOpen(true);
  };

  const handleConfirmReject = (e) => {
    e.preventDefault();
    if (!rejectionReason.trim()) {
      addToast('Please provide a reason for rejecting this event.', 'error');
      return;
    }

    const all = getEvents();
    const updated = all.map((ev) =>
      ev.id === rejectingEvent.id
        ? { ...ev, status: 'rejected', rejectionReason: rejectionReason.trim() }
        : ev
    );
    saveEvents(updated);
    addToast(`Event '${rejectingEvent.title}' rejected.`, 'info');
    setIsRejectModalOpen(false);
    loadEvents();
  };

  const filteredEvents = events.filter((e) => {
    if (activeTab === 'All') return true;
    return e.status?.toLowerCase() === activeTab.toLowerCase();
  });

  return (
    <DashboardLayout
      title="Event Approvals & Moderation"
      subtitle="Review organization submissions, approve live events, or request modifications."
    >
      <div className="space-y-6">
        {/* Status Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-800">
          {['All', 'Pending', 'Approved', 'Rejected'].map((tab) => {
            const count = events.filter(
              (e) => tab === 'All' || e.status?.toLowerCase() === tab.toLowerCase()
            ).length;
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span>{tab}</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Events Table */}
        {filteredEvents.length === 0 ? (
          <EmptyState
            icon={CheckSquare}
            title={`No ${activeTab} Events`}
            description={`There are currently no events matching the '${activeTab}' filter status.`}
          />
        ) : (
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200/80 dark:border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    <th className="py-4 px-6">Event Title</th>
                    <th className="py-4 px-6">Organization</th>
                    <th className="py-4 px-6">Category</th>
                    <th className="py-4 px-6">Event Date</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                  {filteredEvents.map((evt) => (
                    <tr key={evt.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="py-4 px-6">
                        <span className="font-bold text-slate-900 dark:text-white block max-w-xs truncate">
                          {evt.title}
                        </span>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400">
                          {evt.venue}, {evt.city}
                        </span>
                      </td>
                      <td className="py-4 px-6 font-medium text-slate-700 dark:text-slate-300">
                        {evt.organizationName || 'Chennai Org'}
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${getCategoryBadgeStyle(evt.category)}`}>
                          {evt.category}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-slate-600 dark:text-slate-300 whitespace-nowrap">
                        {formatDate(evt.date)}
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusBadgeStyle(evt.status)}`}>
                          {evt.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right whitespace-nowrap space-x-2">
                        <Link
                          to={`/events/${evt.id}`}
                          className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 font-bold rounded-lg transition-colors inline-flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          View
                        </Link>

                        {evt.status !== 'approved' && (
                          <button
                            onClick={() => handleApprove(evt)}
                            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition-colors inline-flex items-center gap-1 shadow-sm"
                          >
                            <Check className="w-3.5 h-3.5" />
                            Approve
                          </button>
                        )}

                        {evt.status !== 'rejected' && (
                          <button
                            onClick={() => openRejectModal(evt)}
                            className="px-3 py-1.5 bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 hover:bg-rose-100 font-bold rounded-lg transition-colors inline-flex items-center gap-1"
                          >
                            <X className="w-3.5 h-3.5" />
                            Reject
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Rejection Modal */}
      {rejectingEvent && (
        <Modal
          isOpen={isRejectModalOpen}
          onClose={() => setIsRejectModalOpen(false)}
          title="Reject Event Submission"
        >
          <form onSubmit={handleConfirmReject} className="space-y-4">
            <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-xs text-rose-900 dark:text-rose-200 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">Rejecting: {rejectingEvent.title}</span>
                <p className="mt-0.5">Please specify why this submission does not comply with Chennai event regulations.</p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Reason for Rejection
              </label>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="e.g. Missing mandatory safety clearance certificates or venue details incomplete..."
                rows={4}
                className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                required
              />
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setIsRejectModalOpen(false)}
                className="flex-1 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-md"
              >
                Confirm Rejection
              </button>
            </div>
          </form>
        </Modal>
      )}
    </DashboardLayout>
  );
};
