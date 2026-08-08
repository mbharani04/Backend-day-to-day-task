import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Modal } from '../components/Modal';
import { TicketModal } from '../components/TicketModal';
import { getEvents, getBookings, saveBookings, saveEvents } from '../utils/storage';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { formatDate, formatCurrency, getCategoryBadgeStyle, generateBookingId } from '../utils/helpers';
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Building2,
  CheckCircle2,
  ArrowLeft,
  Share2,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

export const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { addToast } = useToast();

  const [event, setEvent] = useState(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [activeBooking, setActiveBooking] = useState(null);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);

  useEffect(() => {
    const events = getEvents();
    const found = events.find((e) => e.id === id);
    if (found) {
      setEvent(found);
    }
  }, [id]);

  // Check if current user is already registered
  const userBooking = React.useMemo(() => {
    if (!isAuthenticated || !user || !id) return null;
    const bookings = getBookings();
    return bookings.find(
      (b) => b.userId === user.id && b.eventId === id && b.status === 'confirmed'
    );
  }, [isAuthenticated, user, id, isTicketModalOpen]);

  if (!event) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-8 text-center">
          <div className="max-w-md">
            <AlertCircle className="w-16 h-16 text-rose-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Event Not Found</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
              The event you are looking for does not exist or may have been removed.
            </p>
            <Link
              to="/events"
              className="px-5 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-xl"
            >
              Back to Events Discovery
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const registered = event.registeredCount || 0;
  const total = event.maxParticipants || 100;
  const availableSeats = Math.max(0, total - registered);
  const isFull = availableSeats === 0;
  const fillPercentage = Math.min(100, Math.round((registered / total) * 100));

  const handleRegisterClick = () => {
    if (!isAuthenticated) {
      addToast('Please login to register for this event.', 'info');
      navigate('/login', { state: { from: { pathname: `/events/${id}` } } });
      return;
    }
    setIsConfirmModalOpen(true);
  };

  const confirmRegistration = () => {
    if (!user || !event) return;

    const bookings = getBookings();
    const existing = bookings.find(
      (b) => b.userId === user.id && b.eventId === event.id && b.status === 'confirmed'
    );

    if (existing) {
      addToast('You are already registered for this event!', 'info');
      setIsConfirmModalOpen(false);
      return;
    }

    const newBooking = {
      id: `bk-${Date.now()}`,
      bookingId: generateBookingId(),
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      eventId: event.id,
      eventTitle: event.title,
      eventDate: event.date,
      eventVenue: event.venue,
      organizationId: event.organizationId,
      status: 'confirmed',
      bookingDate: new Date().toISOString().split('T')[0]
    };

    saveBookings([...bookings, newBooking]);

    // Increment registered count
    const allEvents = getEvents();
    const index = allEvents.findIndex((e) => e.id === event.id);
    if (index !== -1) {
      allEvents[index].registeredCount = (allEvents[index].registeredCount || 0) + 1;
      saveEvents(allEvents);
      setEvent(allEvents[index]);
    }

    setIsConfirmModalOpen(false);
    setActiveBooking(newBooking);
    setIsTicketModalOpen(true);
    addToast('Registration successful! Digital pass generated.', 'success');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: `Check out ${event.title} in Chennai!`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      addToast('Event link copied to clipboard!', 'info');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col transition-colors">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {/* Back Link */}
        <Link
          to="/events"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-cyan-400 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Events Discovery
        </Link>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left 2 Columns: Image & Full Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Banner Image */}
            <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-800 shadow-xl border border-slate-200/80 dark:border-slate-800">
              <img
                src={event.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200'}
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider shadow-md ${getCategoryBadgeStyle(event.category)}`}>
                  {event.category}
                </span>
                <span className="px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-slate-900/90 text-white backdrop-blur-md shadow-md border border-white/10">
                  {formatCurrency(event.price)}
                </span>
              </div>
            </div>

            {/* Event Header Information */}
            <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-cyan-400 block mb-2 flex items-center gap-1.5">
                  <Building2 className="w-4 h-4" />
                  Organized by {event.organizationName || 'Chennai Events Organization'}
                </span>
                <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white leading-tight tracking-tight mb-4">
                  {event.title}
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-indigo-500 shrink-0" />
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Date</span>
                      <span className="font-bold text-slate-900 dark:text-white">{formatDate(event.date)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-cyan-500 shrink-0" />
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Timing</span>
                      <span className="font-bold text-slate-900 dark:text-white">{event.startTime || '09:00 AM'} - {event.endTime || '05:00 PM'}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 sm:col-span-2">
                    <MapPin className="w-5 h-5 text-rose-500 shrink-0" />
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Venue & Location</span>
                      <span className="font-bold text-slate-900 dark:text-white">{event.venue}, {event.address}, {event.city || 'Chennai'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">About This Event</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                  {event.description}
                </p>
              </div>

              {/* Registration Deadline & Verified Banner */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-xs">
                <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-medium">
                  <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span>Verified Public Event • Registered by Chennai Metropolitan Events Board</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400 block">Registration Deadline</span>
                  <span className="font-bold text-slate-900 dark:text-white">{formatDate(event.registrationDeadline || event.date)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Registration Card */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-lg sticky top-24 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <span className="text-xs text-slate-400 font-semibold block">Pass Price</span>
                  <span className="text-2xl font-black text-indigo-600 dark:text-cyan-400">
                    {formatCurrency(event.price)}
                  </span>
                </div>
                <button
                  onClick={handleShare}
                  className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                  title="Share Event"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

              {/* Seat Capacity Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-500 dark:text-slate-400">Seat Capacity</span>
                  <span className="text-slate-900 dark:text-white">
                    {registered} / {total} Registered
                  </span>
                </div>
                <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      fillPercentage > 90 ? 'bg-rose-500' : fillPercentage > 70 ? 'bg-amber-500' : 'bg-indigo-600'
                    }`}
                    style={{ width: `${fillPercentage}%` }}
                  />
                </div>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block text-right">
                  {availableSeats} seats remaining
                </span>
              </div>

              {/* Registration Action */}
              <div>
                {userBooking ? (
                  <div className="space-y-3">
                    <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-center">
                      <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                      <span className="font-bold text-emerald-800 dark:text-emerald-300 text-sm block">
                        Already Registered
                      </span>
                      <span className="text-xs text-emerald-600 dark:text-emerald-400">
                        Ref: {userBooking.bookingId}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        setActiveBooking(userBooking);
                        setIsTicketModalOpen(true);
                      }}
                      className="w-full py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 font-bold text-xs rounded-xl transition-all shadow-md"
                    >
                      View Digital Pass Ticket
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleRegisterClick}
                    disabled={isFull}
                    className={`w-full py-4 rounded-2xl font-black text-sm text-white shadow-xl transition-all flex items-center justify-center gap-2 ${
                      isFull
                        ? 'bg-slate-400 cursor-not-allowed'
                        : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/30 hover:shadow-indigo-600/50'
                    }`}
                  >
                    {isFull ? 'Registration Full' : 'Register Now'}
                  </button>
                )}
              </div>

              <div className="text-[11px] text-slate-500 dark:text-slate-400 space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <p className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  Instant confirmation pass saved to your account.
                </p>
                <p className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  Free cancellation available in My Bookings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Confirmation Modal */}
      <Modal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        title="Confirm Registration"
      >
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900">
            <h4 className="font-bold text-slate-900 dark:text-white text-base mb-1">
              {event.title}
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              📅 <strong>Date:</strong> {event.date}
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
              📍 <strong>Venue:</strong> {event.venue}, {event.city}
            </p>
          </div>

          <div className="text-xs text-slate-500 dark:text-slate-400 space-y-1">
            <p>Attendee: <strong className="text-slate-900 dark:text-white">{user?.name}</strong> ({user?.email})</p>
            <p>Fee: <strong className="text-emerald-600 dark:text-emerald-400">{event.price === 0 ? 'Free Entry' : `₹${event.price}`}</strong></p>
          </div>

          <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => setIsConfirmModalOpen(false)}
              className="flex-1 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs rounded-xl"
            >
              Cancel
            </button>
            <button
              onClick={confirmRegistration}
              className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/20"
            >
              Confirm Registration
            </button>
          </div>
        </div>
      </Modal>

      {/* Ticket Pass Modal */}
      <TicketModal
        isOpen={isTicketModalOpen}
        onClose={() => setIsTicketModalOpen(false)}
        booking={activeBooking || userBooking}
        event={event}
      />

      <Footer />
    </div>
  );
};
