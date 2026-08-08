import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { TicketModal } from '../../components/TicketModal';
import { EmptyState } from '../../components/EmptyState';
import { getBookings, getOrganizations } from '../../utils/storage';
import { formatDate, getStatusBadgeStyle } from '../../utils/helpers';
import { Ticket, Search, Eye } from 'lucide-react';

export const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeBooking, setActiveBooking] = useState(null);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);

  useEffect(() => {
    const allBookings = getBookings();
    const orgs = getOrganizations();

    // Map organization names if missing
    const enriched = allBookings.map((b) => {
      const org = orgs.find((o) => o.id === b.organizationId);
      return {
        ...b,
        orgName: org ? org.name : 'Chennai Events Organization'
      };
    });

    setBookings(enriched);
  }, []);

  const filteredBookings = bookings.filter((b) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      b.bookingId?.toLowerCase().includes(q) ||
      b.userName?.toLowerCase().includes(q) ||
      b.userEmail?.toLowerCase().includes(q) ||
      b.eventTitle?.toLowerCase().includes(q)
    );
  });

  return (
    <DashboardLayout
      title="Global Platform Bookings Log"
      subtitle="Complete administrative record of all digital event pass reservations across Chennai."
    >
      <div className="space-y-6">
        {/* Search */}
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Booking ID, User, or Event title..."
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Total Registrations: <strong className="text-slate-900 dark:text-white">{filteredBookings.length}</strong>
          </span>
        </div>

        {/* Bookings Table */}
        {filteredBookings.length === 0 ? (
          <EmptyState
            icon={Ticket}
            title="No Bookings Recorded"
            description="No digital pass bookings match your current search query."
          />
        ) : (
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200/80 dark:border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    <th className="py-4 px-6">Booking ID</th>
                    <th className="py-4 px-6">Attendee User</th>
                    <th className="py-4 px-6">Event Title</th>
                    <th className="py-4 px-6">Organization</th>
                    <th className="py-4 px-6">Booking Date</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6 text-right">Inspect</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                  {filteredBookings.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="py-4 px-6 font-mono font-bold text-indigo-600 dark:text-cyan-400 whitespace-nowrap">
                        {b.bookingId}
                      </td>
                      <td className="py-4 px-6">
                        <span className="font-bold text-slate-900 dark:text-white block">{b.userName}</span>
                        <span className="text-[10px] text-slate-400">{b.userEmail}</span>
                      </td>
                      <td className="py-4 px-6 font-semibold text-slate-900 dark:text-white max-w-xs truncate">
                        {b.eventTitle}
                      </td>
                      <td className="py-4 px-6 text-slate-600 dark:text-slate-300 max-w-xs truncate">
                        {b.orgName}
                      </td>
                      <td className="py-4 px-6 text-slate-500 dark:text-slate-400 whitespace-nowrap">
                        {formatDate(b.bookingDate)}
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusBadgeStyle(b.status)}`}>
                          {b.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right whitespace-nowrap">
                        <button
                          onClick={() => {
                            setActiveBooking(b);
                            setIsTicketModalOpen(true);
                          }}
                          className="px-3 py-1.5 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-cyan-400 hover:bg-indigo-100 font-bold rounded-lg transition-colors inline-flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          View Ticket
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

      <TicketModal
        isOpen={isTicketModalOpen}
        onClose={() => setIsTicketModalOpen(false)}
        booking={activeBooking}
      />
    </DashboardLayout>
  );
};
