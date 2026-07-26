import React, { useState } from 'react';
import { PartyPopper, Plus, Trash2, Calendar, Clock, Tag } from 'lucide-react';
import { PageTransition } from '../components/layout/PageTransition';
import { useProductivity } from '../context/ProductivityContext';
import { getCountdownDays } from '../utils/dateUtils';

export const Events = () => {
  const { events, deleteEvent, openQuickAdd } = useProductivity();
  const [filter, setFilter] = useState('All');

  const filteredEvents = events.filter((e) => {
    if (filter !== 'All') return e.category === filter;
    return true;
  });

  return (
    <PageTransition>
      <div className="space-y-6 pb-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl glass-panel border border-white/10">
          <div>
            <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
              <PartyPopper className="w-6 h-6 text-pink-400" />
              Events to Remember & Deadlines
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Countdowns for exams, project deadlines, interviews & personal events
            </p>
          </div>

          <button
            onClick={() => openQuickAdd('event')}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-semibold text-xs shadow-lg shadow-pink-500/25 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Event</span>
          </button>
        </div>

        {/* Categories Bar */}
        <div className="flex overflow-x-auto p-1.5 rounded-2xl glass-panel border border-white/10 gap-1 no-scrollbar">
          {['All', 'Exam', 'Interview', 'Project Deadline', 'Birthday', 'Meeting', 'Other'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                filter === cat
                  ? 'bg-pink-600 text-white shadow-md shadow-pink-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredEvents.length === 0 ? (
            <div className="col-span-full py-16 text-center text-slate-400 text-sm glass-panel rounded-3xl">
              No events found under category "{filter}".
            </div>
          ) : (
            filteredEvents.map((evt) => {
              const countdown = getCountdownDays(evt.date);

              return (
                <div
                  key={evt.id}
                  className="p-5 rounded-3xl glass-card border border-white/10 hover:border-pink-500/30 flex flex-col justify-between transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-pink-500/20 text-pink-300 border border-pink-500/30">
                        {evt.category}
                      </span>
                      <button
                        onClick={() => deleteEvent(evt.id)}
                        className="p-1 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800"
                        title="Delete Event"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <h3 className="mt-3 text-base font-bold text-slate-100">{evt.title}</h3>
                    {evt.description && (
                      <p className="mt-1 text-xs text-slate-400 line-clamp-2">
                        {evt.description}
                      </p>
                    )}

                    <div className="mt-4 flex items-center justify-between text-xs text-slate-300">
                      <span className="flex items-center gap-1.5 text-slate-400">
                        <Calendar className="w-4 h-4 text-pink-400" />
                        {evt.date} at {evt.time}
                      </span>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[10px] text-slate-400">Countdown</span>
                    <span className="px-3 py-1 rounded-xl text-xs font-black bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md shadow-pink-500/20">
                      {countdown}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default Events;
