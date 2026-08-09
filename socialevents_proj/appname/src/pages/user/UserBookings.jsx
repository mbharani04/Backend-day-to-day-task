import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { TicketModal } from '../../components/TicketModal';
import { EmptyState } from '../../components/EmptyState';
import { getBookings, saveBookings, getEvents, saveEvents } from '../../utils/storage';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { formatDate, getStatusBadgeStyle } from '../../utils/helpers';
import { Ticket, Printer, XCircle, Search } from 'lucide-react';

export const UserBookings = () => {
  const { user } = useAuth();
  const { addToast } = useToast();

  const [bookings, setBookings] = useState([]);
  const [activeBooking, setActiveBooking] = useState(null);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');

  useEffect(() => {
    loadBookings();
  }, [user]);

  const loadBookings = () => {
    const all = getBookings();
    const mine = all.filter((b) => b.userId === user?.id);
    setBookings(mine);
  };

  const handleCancelBooking = (booking) => {
    if (booking.status === 'cancelled') return;

    const all = getBookings();
    const updated = all.map((b) =>
      b.id === booking.id ? { ...b, status: 'cancelled' } : b
    );
    saveBookings(updated);

    // Decrement event registered count
    const events = getEvents();
    const evtIndex = events.findIndex((e) => e.id === booking.eventId);
    if (evtIndex !== -1 && events[evtIndex].registeredCount > 0) {
      events[evtIndex].registeredCount -= 1;
      saveEvents(events);
    }

    addToast(`Booking ${booking.bookingId} cancelled.`, 'info');
    loadBookings();
  };

  const filteredBookings = bookings.filter((b) => {
    if (!searchFilter) return true;
    const q = searchFilter.toLowerCase();
    return (
      b.bookingId?.toLowerCase().includes(q) ||
      b.eventTitle?.toLowerCase().includes(q) ||
      b.eventVenue?.toLowerCase().includes(q)
    );
  });

  return (
    <DashboardLayout
      title="My Bookings & Digital Passes"
      subtitle="View your confirmed registrations, download passes, or cancel bookings."
    >
      <div className="space-y-6">
        {/* Search Bar */}
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Search by Booking ID or Event..."
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Total: <strong className="text-slate-900 dark:text-white">{filteredBookings.length}</strong>
          </span>
        </div>

        {filteredBookings.length === 0 ? (
          <EmptyState
            icon={Ticket}
            title="No Bookings Found"
            description="You have not registered for any events yet, or no bookings match your search query."
          />
        ) : (
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200/80 dark:border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    <th className="py-4 px-6">Booking ID</th>
                    <th className="py-4 px-6">Event Title</th>
                    <th className="py-4 px-6">Event Date</th>
                    <th className="py-4 px-6">Venue</th>
                    <th className="py-4 px-6">Booking Date</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                  {filteredBookings.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="py-4 px-6 font-mono font-bold text-indigo-600 dark:text-cyan-400 whitespace-nowrap">
                        {b.bookingId}
                      </td>
                      <td className="py-4 px-6 font-bold text-slate-900 dark:text-white max-w-xs truncate">
                        {b.eventTitle}
                      </td>
                      <td className="py-4 px-6 text-slate-600 dark:text-slate-300 whitespace-nowrap">
                        {formatDate(b.eventDate)}
                      </td>
                      <td className="py-4 px-6 text-slate-600 dark:text-slate-300 max-w-xs truncate">
                        {b.eventVenue}
                      </td>
                      <td className="py-4 px-6 text-slate-500 dark:text-slate-400 whitespace-nowrap">
                        {formatDate(b.bookingDate)}
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusBadgeStyle(b.status)}`}>
                          {b.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right whitespace-nowrap space-x-2">
                        <button
                          onClick={() => {
                            setActiveBooking(b);
                            setIsTicketModalOpen(true);
                          }}
                          className="px-3 py-1.5 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-cyan-400 hover:bg-indigo-100 font-bold rounded-lg transition-colors inline-flex items-center gap-1"
                        >
                          <Printer className="w-3.5 h-3.5" />
                          View Ticket
                        </button>
                        {b.status === 'confirmed' && (
                          <button
                            onClick={() => handleCancelBooking(b)}
                            className="px-3 py-1.5 bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 hover:bg-rose-100 font-bold rounded-lg transition-colors inline-flex items-center gap-1"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                            Cancel
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

      <TicketModal
        isOpen={isTicketModalOpen}
        onClose={() => setIsTicketModalOpen(false)}
        booking={activeBooking}
      />
    </DashboardLayout>
  );
};
