import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '../../components/DashboardLayout';
import { StatCard } from '../../components/StatCard';
import { EventCard } from '../../components/EventCard';
import { TicketModal } from '../../components/TicketModal';
import { getBookings, getEvents, saveBookings, saveEvents } from '../../utils/storage';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { formatDate } from '../../utils/helpers';
import {
  Calendar,
  Ticket,
  CheckCircle2,
  Compass,
  ArrowRight,
  Printer,
  XCircle,
  Sparkles
} from 'lucide-react';

export const UserDashboard = () => {
  const { user } = useAuth();
  const { addToast } = useToast();

  const [userBookings, setUserBookings] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [activeBooking, setActiveBooking] = useState(null);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);

  useEffect(() => {
    loadDashboardData();
  }, [user]);

  const loadDashboardData = () => {
    const bookings = getBookings();
    const myBookings = bookings.filter((b) => b.userId === user?.id);
    setUserBookings(myBookings);

    const events = getEvents();
    setAllEvents(events);
  };

  const activeConfirmedBookings = userBookings.filter((b) => b.status === 'confirmed');
  const approvedEvents = allEvents.filter((e) => e.status === 'approved');

  const handleCancelBooking = (booking) => {
    const bookings = getBookings();
    const updated = bookings.map((b) =>
      b.id === booking.id ? { ...b, status: 'cancelled' } : b
    );
    saveBookings(updated);

    // Decrement event registration count
    const events = getEvents();
    const evtIndex = events.findIndex((e) => e.id === booking.eventId);
    if (evtIndex !== -1 && events[evtIndex].registeredCount > 0) {
      events[evtIndex].registeredCount -= 1;
      saveEvents(events);
    }

    addToast('Booking cancelled successfully.', 'info');
    loadDashboardData();
  };

  return (
    <DashboardLayout
      title={`Good morning, ${user?.name || 'Demo User'} 👋`}
      subtitle="Welcome to your personal public events discovery dashboard."
      action={
        <Link
          to="/events"
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-600/20 transition-all flex items-center gap-1.5"
        >
          <Compass className="w-4 h-4" />
          Explore Events
        </Link>
      }
    >
      <div className="space-y-8">
        {/* Stat Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard
            title="Registered Events"
            value={activeConfirmedBookings.length}
            icon={Ticket}
            color="indigo"
            subtitle="Active passes"
          />
          <StatCard
            title="Total Bookings"
            value={userBookings.length}
            icon={CheckCircle2}
            color="emerald"
            subtitle="Lifetime history"
          />
          <StatCard
            title="Available Events"
            value={approvedEvents.length}
            icon={Calendar}
            color="cyan"
            subtitle="Happenings in Chennai"
          />
          <StatCard
            title="Account Status"
            value="Active"
            icon={Sparkles}
            color="amber"
            subtitle="Verified User"
          />
        </div>

        {/* Registered Upcoming Events Section */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                My Upcoming Registered Events
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Show these passes at the event entrance
              </p>
            </div>
            <Link
              to="/user/bookings"
              className="text-xs font-bold text-indigo-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
            >
              View All Bookings ({userBookings.length})
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {activeConfirmedBookings.length === 0 ? (
            <div className="p-8 text-center bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700">
              <Ticket className="w-10 h-10 text-slate-400 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">No active event registrations</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-4">
                You haven't registered for any Chennai public events yet.
              </p>
              <Link
                to="/events"
                className="px-4 py-2 bg-indigo-600 text-white font-bold text-xs rounded-xl"
              >
                Discover Events Now
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeConfirmedBookings.map((b) => (
                <div
                  key={b.id}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11px] font-bold text-indigo-600 dark:text-cyan-400 bg-indigo-50 dark:bg-slate-900 px-2 py-0.5 rounded">
                        {b.bookingId}
                      </span>
                      <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                        Confirmed
                      </span>
                    </div>

                    <h4 className="font-bold text-slate-900 dark:text-white text-base line-clamp-1">
                      {b.eventTitle}
                    </h4>

                    <div className="text-xs text-slate-500 dark:text-slate-400 space-y-1">
                      <p>📅 <strong>Date:</strong> {formatDate(b.eventDate)}</p>
                      <p>📍 <strong>Venue:</strong> {b.eventVenue}</p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center gap-2">
                    <button
                      onClick={() => {
                        setActiveBooking(b);
                        setIsTicketModalOpen(true);
                      }}
                      className="flex-1 py-2 px-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      View Pass
                    </button>
                    <button
                      onClick={() => handleCancelBooking(b)}
                      className="py-2 px-3 bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 hover:bg-rose-100 font-semibold text-xs rounded-xl flex items-center gap-1"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      Cancel
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recommended Events Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Recommended Events for You
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Popular public events happening around Chennai
              </p>
            </div>
            <Link
              to="/events"
              className="text-xs font-bold text-indigo-600 dark:text-cyan-400 hover:underline"
            >
              See All
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {approvedEvents.slice(0, 3).map((evt) => (
              <EventCard key={evt.id} event={evt} />
            ))}
          </div>
        </div>
      </div>

      <TicketModal
        isOpen={isTicketModalOpen}
        onClose={() => setIsTicketModalOpen(false)}
        booking={activeBooking}
      />
    </DashboardLayout>
  );
};
