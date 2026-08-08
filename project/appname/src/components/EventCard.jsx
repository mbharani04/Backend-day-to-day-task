import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Clock, Users, ArrowRight, CheckCircle } from 'lucide-react';
import { formatDate, formatCurrency, getCategoryBadgeStyle, getStatusBadgeStyle } from '../utils/helpers';
import { useAuth } from '../context/AuthContext';
import { getBookings } from '../utils/storage';

export const EventCard = ({ event, onRegisterClick, showStatus = false }) => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  
  // Check if current logged-in user is already registered for this event
  const isRegistered = React.useMemo(() => {
    if (!isAuthenticated || !user) return false;
    const bookings = getBookings();
    return bookings.some(
      (b) => b.userId === user.id && b.eventId === event.id && b.status === 'confirmed'
    );
  }, [isAuthenticated, user, event.id]);

  const availableSeats = Math.max(0, (event.maxParticipants || 0) - (event.registeredCount || 0));
  const isFull = availableSeats === 0;

  return (
    <div className="group bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden transform hover:-translate-y-1">
      {/* Image Header with Badges */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={event.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800'}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />

        {/* Category Pill */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border shadow-sm ${getCategoryBadgeStyle(
              event.category
            )}`}
          >
            {event.category}
          </span>
          {showStatus && event.status && (
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border shadow-sm ${getStatusBadgeStyle(
                event.status
              )}`}
            >
              {event.status}
            </span>
          )}
        </div>

        {/* Price Tag */}
        <div className="absolute bottom-3 right-3">
          <span className="px-3 py-1 rounded-xl text-xs font-black bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-white backdrop-blur-md shadow-lg border border-white/20">
            {formatCurrency(event.price)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Organization */}
          <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-cyan-400 block mb-1">
            {event.organizationName || 'Chennai Events Organization'}
          </span>

          {/* Title */}
          <Link
            to={`/events/${event.id}`}
            className="text-lg font-bold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-cyan-400 line-clamp-2 transition-colors mb-3 leading-snug"
          >
            {event.title}
          </Link>

          {/* Key Details */}
          <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400 mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-indigo-500 shrink-0" />
              <span>{formatDate(event.date)} • {event.startTime || '09:00 AM'}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
              <span className="truncate">{event.venue}, {event.city || 'Chennai'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>
                {isFull ? (
                  <strong className="text-rose-600 dark:text-rose-400 font-bold">Housefull (0 Seats)</strong>
                ) : (
                  <span>
                    <strong className="font-semibold text-slate-900 dark:text-white">{availableSeats}</strong> seats available
                  </span>
                )}
              </span>
            </div>
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
          <Link
            to={`/events/${event.id}`}
            className="flex-1 py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-center text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            View Details
          </Link>

          {isRegistered ? (
            <span className="py-2.5 px-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center justify-center gap-1">
              <CheckCircle className="w-4 h-4" />
              Registered
            </span>
          ) : (
            <button
              onClick={() => {
                if (onRegisterClick) {
                  onRegisterClick(event);
                } else {
                  navigate(`/events/${event.id}`);
                }
              }}
              disabled={isFull}
              className={`py-2.5 px-3.5 rounded-xl text-xs font-bold text-white transition-all flex items-center gap-1 justify-center ${
                isFull
                  ? 'bg-slate-400 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-600/20 hover:shadow-indigo-600/30'
              }`}
            >
              <span>{isFull ? 'Sold Out' : 'Register'}</span>
              {!isFull && <ArrowRight className="w-3.5 h-3.5" />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
