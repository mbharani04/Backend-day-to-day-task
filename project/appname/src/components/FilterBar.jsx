import React from 'react';
import { Filter, RotateCcw, Calendar, DollarSign } from 'lucide-react';

export const CATEGORIES = [
  'All',
  'Cultural',
  'Sports',
  'Technology',
  'Education',
  'Business',
  'Arts',
  'Government',
  'Entertainment',
  'Exhibition',
  'Workshop'
];

export const FilterBar = ({
  selectedCategory,
  onSelectCategory,
  eventTypeFilter,
  onSelectEventType,
  timelineFilter,
  onSelectTimeline,
  onReset
}) => {
  return (
    <div className="space-y-4 bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm transition-colors">
      {/* Category Pills Header */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-indigo-500" />
            Category Filter
          </span>
          <button
            onClick={onReset}
            className="text-xs font-semibold text-indigo-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" />
            Reset All
          </button>
        </div>

        {/* Scrollable Category Badges */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Secondary Controls: Type (Free/Paid) & Timeline (Upcoming/Past) */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Free / Paid Filter */}
        <div>
          <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1.5 flex items-center gap-1">
            <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
            Ticket Pricing
          </label>
          <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl">
            {['All', 'Free', 'Paid'].map((type) => (
              <button
                key={type}
                onClick={() => onSelectEventType(type)}
                className={`py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  eventTypeFilter === type
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline Filter */}
        <div>
          <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1.5 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-indigo-500" />
            Event Date Timeline
          </label>
          <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl">
            {['All', 'Upcoming', 'Past'].map((tl) => (
              <button
                key={tl}
                onClick={() => onSelectTimeline(tl)}
                className={`py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  timelineFilter === tl
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {tl}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
