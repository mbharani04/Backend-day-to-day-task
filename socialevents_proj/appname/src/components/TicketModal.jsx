import React from 'react';
import { Modal } from './Modal';
import { Ticket, Calendar, MapPin, CheckCircle2, User, Printer } from 'lucide-react';
import { formatDate } from '../utils/helpers';

export const TicketModal = ({ isOpen, onClose, booking, event }) => {
  if (!booking) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Digital Event Ticket" maxWidth="max-w-lg">
      <div className="space-y-6">
        {/* Ticket Outer Container */}
        <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white rounded-3xl border border-indigo-500/30 p-6 shadow-2xl relative overflow-hidden">
          {/* Top Decorative Banner */}
          <div className="flex items-center justify-between pb-4 border-b border-indigo-500/30 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
                <Ticket className="w-4 h-4" />
              </div>
              <span className="font-black text-sm tracking-wider uppercase text-cyan-400">
                Chennai Public Event Pass
              </span>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              {booking.status}
            </span>
          </div>

          {/* Event Title */}
          <h2 className="text-xl font-extrabold text-white mb-2 leading-snug">
            {booking.eventTitle || event?.title}
          </h2>

          {/* Details Grid */}
          <div className="space-y-3 my-4 text-xs text-indigo-100">
            <div className="flex items-start gap-2.5">
              <Calendar className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] uppercase font-bold text-indigo-300 block">Date & Time</span>
                <span className="font-semibold text-white">
                  {formatDate(booking.eventDate || event?.date)} • {event?.startTime || '09:00 AM'}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] uppercase font-bold text-indigo-300 block">Venue & Location</span>
                <span className="font-semibold text-white">
                  {booking.eventVenue || event?.venue}, {event?.city || 'Chennai'}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <User className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] uppercase font-bold text-indigo-300 block">Attendee</span>
                <span className="font-semibold text-white">
                  {booking.userName} ({booking.userEmail})
                </span>
              </div>
            </div>
          </div>

          {/* Cutout Divider Line */}
          <div className="relative my-5">
            <div className="border-t-2 border-dashed border-indigo-400/30 w-full" />
            <div className="absolute -left-9 -top-3 w-6 h-6 bg-white dark:bg-slate-900 rounded-full" />
            <div className="absolute -right-9 -top-3 w-6 h-6 bg-white dark:bg-slate-900 rounded-full" />
          </div>

          {/* Barcode & Booking Reference */}
          <div className="flex flex-col items-center justify-center pt-2 text-center">
            <span className="text-[10px] uppercase font-mono tracking-widest text-indigo-300 mb-2">
              Booking Reference ID
            </span>
            <div className="font-mono text-lg font-black tracking-widest text-cyan-300 bg-indigo-950/80 px-4 py-2 rounded-xl border border-cyan-500/30 mb-4 shadow-inner">
              {booking.bookingId}
            </div>

            {/* Simulating Barcode Visual */}
            <div className="w-full h-12 bg-white p-2 rounded-lg flex items-center justify-around gap-1">
              {[...Array(32)].map((_, i) => (
                <div
                  key={i}
                  className="h-full bg-slate-950"
                  style={{ width: `${(i % 3) + 1}px` }}
                />
              ))}
            </div>
            <span className="text-[9px] font-mono text-indigo-300 mt-1">Present this pass at entry venue</span>
          </div>
        </div>

        {/* Modal Bottom Buttons */}
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={handlePrint}
            className="flex-1 py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-2 shadow-md transition-all"
          >
            <Printer className="w-4 h-4" />
            Print / Save Ticket
          </button>
          <button
            onClick={onClose}
            className="py-3 px-5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium text-xs rounded-xl transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};
