import React from 'react';
import { PartyPopper, Calendar, Plus } from 'lucide-react';
import { useProductivity } from '../../context/ProductivityContext';
import { getCountdownDays } from '../../utils/dateUtils';

export const UpcomingEvents = () => {
  const { events, openQuickAdd } = useProductivity();

  const sortedEvents = [...events]
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 4);

  return (
    <div className="p-6 rounded-3xl glass-panel border border-white/10 flex flex-col h-full">
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div>
          <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            Events to Remember
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-pink-500/20 text-pink-400 border border-pink-500/30">
              {events.length}
            </span>
          </h3>
          <p className="text-xs text-slate-400">Important dates & exam countdowns</p>
        </div>

        <button
          onClick={() => openQuickAdd('event')}
          className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-pink-400 hover:bg-slate-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 mt-4 space-y-2.5 max-h-72 overflow-y-auto pr-1">
        {sortedEvents.length === 0 ? (
          <div className="py-10 text-center text-slate-400 text-xs flex flex-col items-center justify-center gap-2.5">
            <div className="p-3 rounded-2xl bg-pink-500/10 text-pink-400 border border-pink-500/20 animate-float">
              <PartyPopper className="w-6 h-6" />
            </div>
            <div>
              <p className="font-bold text-slate-200 text-sm">No upcoming events 📅</p>
              <p className="text-slate-400 text-xs mt-0.5">Add an important event to remember.</p>
            </div>
            <button
              onClick={() => openQuickAdd('event')}
              className="mt-1 flex items-center gap-1.5 px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-semibold text-xs shadow-md shadow-pink-600/30 transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span> Add Event</span>
            </button>
          </div>
        ) : (
          sortedEvents.map((evt) => {
            const countdown = getCountdownDays(evt.date);
            return (
              <div
                key={evt.id}
                className="p-3.5 rounded-2xl glass-card border border-white/10 flex items-center justify-between gap-3 hover:border-pink-500/30 transition-all"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2 rounded-xl bg-pink-500/20 text-pink-400 shrink-0">
                    <PartyPopper className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-100 truncate">{evt.title}</p>
                    <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                      <Calendar className="w-3 h-3 text-pink-400" />
                      {evt.date} • {evt.category}
                    </p>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-xl text-[10px] font-extrabold bg-pink-500/20 text-pink-300 border border-pink-500/30 shrink-0">
                  {countdown}
                </span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default UpcomingEvents;
