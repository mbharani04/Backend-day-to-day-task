import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  CheckSquare,
  Bell,
  PartyPopper,
  Target,
  BookOpen,
} from 'lucide-react';
import { PageTransition } from '../components/layout/PageTransition';
import { useProductivity } from '../context/ProductivityContext';
import { getMonthMatrix } from '../utils/dateUtils';

export const CalendarPage = () => {
  const { tasks, events, reminders, targets, skills, openQuickAdd } = useProductivity();

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDateStr, setSelectedDateStr] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [viewMode, setViewMode] = useState('Month'); // Month | Week | Day

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthMatrix = getMonthMatrix(year, month);

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };
  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const getItemsForDate = (dateStr) => {
    const dayTasks = tasks.filter((t) => t.dueDate === dateStr);
    const dayEvents = events.filter((e) => e.date === dateStr);
    const dayReminders = reminders.filter((r) => r.date === dateStr);
    const dayTargets = targets.filter((tg) => tg.endDate === dateStr);
    const daySkills = skills.filter((s) => s.targetCompletionDate === dateStr);

    return [
      ...dayTasks.map((t) => ({ ...t, type: 'task', title: t.title, color: 'bg-indigo-500' })),
      ...dayEvents.map((e) => ({ ...e, type: 'event', title: e.title, color: 'bg-pink-500' })),
      ...dayReminders.map((r) => ({ ...r, type: 'reminder', title: r.title, color: 'bg-amber-500' })),
      ...dayTargets.map((tg) => ({ ...tg, type: 'target', title: tg.title, color: 'bg-emerald-500' })),
      ...daySkills.map((s) => ({ ...s, type: 'skill', title: s.name, color: 'bg-purple-500' })),
    ];
  };

  const selectedDateItems = getItemsForDate(selectedDateStr);

  const getItemIcon = (type) => {
    switch (type) {
      case 'task':
        return <CheckSquare className="w-3.5 h-3.5 text-indigo-400" />;
      case 'event':
        return <PartyPopper className="w-3.5 h-3.5 text-pink-400" />;
      case 'reminder':
        return <Bell className="w-3.5 h-3.5 text-amber-400" />;
      case 'target':
        return <Target className="w-3.5 h-3.5 text-emerald-400" />;
      default:
        return <BookOpen className="w-3.5 h-3.5 text-purple-400" />;
    }
  };

  return (
    <PageTransition>
      <div className="space-y-6 pb-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl glass-panel border border-white/10">
          <div>
            <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
              <CalendarIcon className="w-6 h-6 text-indigo-400" />
              Interactive Productivity Calendar
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Schedule, track events, tasks, target deadlines & reminders
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => openQuickAdd('event')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add Event</span>
            </button>
          </div>
        </div>

        {/* Calendar Navigation & View Selector */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl glass-panel border border-white/10">
          <div className="flex items-center gap-3">
            <button
              onClick={prevMonth}
              className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-extrabold text-slate-100 min-w-40 text-center">
              {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h2>
            <button
              onClick={nextMonth}
              className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-1">
            {['Month', 'Week', 'Day'].map((m) => (
              <button
                key={m}
                onClick={() => setViewMode(m)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  viewMode === m
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Main Grid & Selected Date Drawer Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Month Calendar View */}
          <div className="lg:col-span-2 p-5 rounded-3xl glass-panel border border-white/10">
            {/* Weekdays */}
            <div className="grid grid-cols-7 text-center font-bold text-xs text-slate-400 pb-3 border-b border-white/10">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                <div key={d}>{d}</div>
              ))}
            </div>

            {/* Matrix */}
            <div className="grid grid-cols-7 gap-1 mt-2">
              {monthMatrix.map((week, wIdx) =>
                week.map((day, dIdx) => {
                  const dayItems = getItemsForDate(day.dateStr);
                  const isToday =
                    day.dateStr === new Date().toISOString().split('T')[0];
                  const isSelected = day.dateStr === selectedDateStr;

                  return (
                    <div
                      key={`${wIdx}-${dIdx}`}
                      onClick={() => setSelectedDateStr(day.dateStr)}
                      className={`min-h-20 p-2 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'border-indigo-500 bg-indigo-500/10 shadow-lg'
                          : isToday
                          ? 'border-cyan-500/60 bg-cyan-500/5'
                          : day.isCurrentMonth
                          ? 'glass-card border-white/5 hover:border-slate-600'
                          : 'bg-slate-900/20 border-transparent text-slate-600'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-xs font-bold ${
                            isToday
                              ? 'text-cyan-400 font-black'
                              : day.isCurrentMonth
                              ? 'text-slate-200'
                              : 'text-slate-600'
                          }`}
                        >
                          {day.dayNumber}
                        </span>
                        {isToday && (
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        )}
                      </div>

                      {/* Dots for items */}
                      <div className="flex flex-wrap gap-1 mt-1">
                        {dayItems.slice(0, 3).map((item, idx) => (
                          <span
                            key={idx}
                            className={`w-2 h-2 rounded-full ${item.color}`}
                            title={item.title}
                          />
                        ))}
                        {dayItems.length > 3 && (
                          <span className="text-[9px] text-slate-400 font-bold">
                            +{dayItems.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Side Drawer for Selected Date Activities */}
          <div className="p-5 rounded-3xl glass-panel border border-white/10 flex flex-col">
            <div className="pb-3 border-b border-white/10 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-100">Selected Date</h3>
                <p className="text-xs text-indigo-400 font-semibold">{selectedDateStr}</p>
              </div>
              <button
                onClick={() => openQuickAdd('task')}
                className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 mt-4 space-y-2.5 max-h-[500px] overflow-y-auto">
              {selectedDateItems.length === 0 ? (
                <div className="py-16 text-center text-slate-400 text-xs">
                  No scheduled activities on this date.
                </div>
              ) : (
                selectedDateItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl glass-card border border-white/10 flex items-center gap-3"
                  >
                    <div className="p-2 rounded-xl bg-slate-800 border border-white/10 shrink-0">
                      {getItemIcon(item.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-slate-100 truncate">{item.title}</p>
                      <span className="text-[10px] text-slate-400 capitalize">
                        {item.type} • {item.category || item.priority || 'Scheduled'}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default CalendarPage;
