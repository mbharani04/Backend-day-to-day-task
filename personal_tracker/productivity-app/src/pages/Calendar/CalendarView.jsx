import React, { useState, useMemo } from 'react';
import Calendar from 'react-calendar';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiCalendar,
  FiClock,
  FiPlus,
  FiCheck,
  FiEdit2,
  FiTrash2,
  FiCopy,
  FiSearch,
  FiFilter,
  FiX,
  FiChevronLeft,
  FiChevronRight
} from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useApp } from '../../context/AppContext';

const CATEGORIES = ['Study', 'Work', 'Target', 'Reminder', 'Personal', 'Shopping', 'Meeting', 'Other'];
const PRIORITIES = ['High', 'Medium', 'Low'];
const COLORS = [
  { name: 'Blue', bg: 'bg-blue-500', text: 'text-blue-400', border: 'border-blue-500/30' },
  { name: 'Green', bg: 'bg-emerald-500', text: 'text-emerald-400', border: 'border-emerald-500/30' },
  { name: 'Purple', bg: 'bg-purple-500', text: 'text-purple-400', border: 'border-purple-500/30' },
  { name: 'Orange', bg: 'bg-amber-500', text: 'text-amber-400', border: 'border-amber-500/30' },
  { name: 'Red', bg: 'bg-rose-500', text: 'text-rose-400', border: 'border-rose-500/30' },
  { name: 'Pink', bg: 'bg-pink-500', text: 'text-pink-400', border: 'border-pink-500/30' },
  { name: 'Cyan', bg: 'bg-cyan-500', text: 'text-cyan-400', border: 'border-cyan-500/30' }
];

const getColorObj = (colorName) => COLORS.find(c => c.name === colorName) || COLORS[0];

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const getLocalDateString = (date) => {
  if (!date) return '';
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const parseTimeToMinutes = (timeStr) => {
  if (!timeStr) return 0;
  const match = timeStr.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?$/i);
  if (!match) return 0;
  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const period = match[3] ? match[3].toUpperCase() : null;

  if (period === 'PM' && hours < 12) hours += 12;
  if (period === 'AM' && hours === 12) hours = 0;

  return hours * 60 + minutes;
};

const CalendarView = () => {
  const {
    calendarEvents = [],
    addCalendarEvent,
    updateCalendarEvent,
    deleteCalendarEvent,
    toggleCalendarEventCompleted,
    duplicateCalendarEvent
  } = useApp();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeMonth, setActiveMonth] = useState(new Date());
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Form State
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formCategory, setFormCategory] = useState('Meeting');
  const [formStartDate, setFormStartDate] = useState(getLocalDateString(new Date()));
  const [formEndDate, setFormEndDate] = useState(getLocalDateString(new Date()));
  const [formStartTime, setFormStartTime] = useState('09:00 AM');
  const [formEndTime, setFormEndTime] = useState('10:00 AM');
  const [formPriority, setFormPriority] = useState('Medium');
  const [formColor, setFormColor] = useState('Blue');
  const [formCompleted, setFormCompleted] = useState(false);

  // Date Strings
  const selectedDateStr = useMemo(() => {
    return getLocalDateString(selectedDate);
  }, [selectedDate]);

  const todayStr = useMemo(() => {
    return getLocalDateString(new Date());
  }, []);

  // Format Date for Drawer Title
  const formattedDateTitle = useMemo(() => {
    return selectedDate.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  }, [selectedDate]);

  // Active Month stats
  const activeMonthIndex = activeMonth.getMonth();
  const activeYear = activeMonth.getFullYear();

  const monthEvents = useMemo(() => {
    return calendarEvents.filter(evt => {
      if (!evt.startDate) return false;
      const parts = evt.startDate.split('-');
      if (parts.length === 3) {
        const evtYear = parseInt(parts[0], 10);
        const evtMonth = parseInt(parts[1], 10) - 1;
        return evtMonth === activeMonthIndex && evtYear === activeYear;
      }
      return false;
    });
  }, [calendarEvents, activeMonthIndex, activeYear]);

  const monthTotal = monthEvents.length;
  const todayEventsCount = calendarEvents.filter(evt => evt.startDate === todayStr).length;
  const monthCompleted = monthEvents.filter(evt => evt.completed).length;
  const monthPending = monthEvents.filter(evt => !evt.completed).length;
  const studySessionsCount = monthEvents.filter(evt => evt.category === 'Study').length;

  // Filtered Events for Selected Date / Search / Category
  const selectedDateEvents = useMemo(() => {
    return calendarEvents.filter(evt => {
      const matchDate = evt.startDate === selectedDateStr || evt.endDate === selectedDateStr;
      if (!matchDate) return false;

      // Category / Status Filter
      if (categoryFilter !== 'All') {
        if (categoryFilter === 'Completed' && !evt.completed) return false;
        if (categoryFilter === 'Pending' && evt.completed) return false;
        if (categoryFilter === 'High Priority' && evt.priority !== 'High') return false;
        if (!['Completed', 'Pending', 'High Priority'].includes(categoryFilter) && evt.category !== categoryFilter) return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const titleMatch = evt.title?.toLowerCase().includes(q);
        const catMatch = evt.category?.toLowerCase().includes(q);
        const dateMatch = evt.startDate?.includes(q);
        if (!titleMatch && !catMatch && !dateMatch) return false;
      }

      return true;
    }).sort((a, b) => parseTimeToMinutes(a.startTime) - parseTimeToMinutes(b.startTime));
  }, [calendarEvents, selectedDateStr, categoryFilter, searchQuery]);

  // Open Modal for Add
  const handleOpenAddModal = () => {
    setEditingEvent(null);
    setFormTitle('');
    setFormDescription('');
    setFormCategory('Meeting');
    setFormStartDate(selectedDateStr);
    setFormEndDate(selectedDateStr);
    setFormStartTime('09:00 AM');
    setFormEndTime('10:00 AM');
    setFormPriority('Medium');
    setFormColor('Blue');
    setFormCompleted(false);
    setIsModalOpen(true);
  };

  // Open Modal for Edit
  const handleOpenEditModal = (evt) => {
    setEditingEvent(evt);
    setFormTitle(evt.title || '');
    setFormDescription(evt.description || '');
    setFormCategory(evt.category || 'Meeting');
    setFormStartDate(evt.startDate || selectedDateStr);
    setFormEndDate(evt.endDate || evt.startDate || selectedDateStr);
    setFormStartTime(evt.startTime || '09:00 AM');
    setFormEndTime(evt.endTime || '10:00 AM');
    setFormPriority(evt.priority || 'Medium');
    setFormColor(evt.color || 'Blue');
    setFormCompleted(evt.completed || false);
    setIsModalOpen(true);
  };

  // Handle Save Event
  const handleSaveForm = (e) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      toast.error('Event Title is required!');
      return;
    }

    const payload = {
      title: formTitle.trim(),
      description: formDescription.trim(),
      category: formCategory,
      startDate: formStartDate,
      endDate: formEndDate,
      startTime: formStartTime,
      endTime: formEndTime,
      priority: formPriority,
      color: formColor,
      completed: formCompleted
    };

    if (editingEvent) {
      updateCalendarEvent(editingEvent.id, payload);
    } else {
      addCalendarEvent(payload);
    }

    setIsModalOpen(false);
  };

  // Navigation handlers
  const handlePrevMonth = () => {
    setActiveMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setActiveMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const handleTodayClick = () => {
    const today = new Date();
    setSelectedDate(today);
    setActiveMonth(today);
  };

  const handleMonthSelect = (e) => {
    const newMonth = parseInt(e.target.value, 10);
    setActiveMonth(prev => new Date(prev.getFullYear(), newMonth, 1));
  };

  const handleYearSelect = (e) => {
    const newYear = parseInt(e.target.value, 10);
    setActiveMonth(prev => new Date(newYear, prev.getMonth(), 1));
  };

  // Tile Content for Calendar Dots
  const tileContent = ({ date, view }) => {
    if (view !== 'month') return null;
    const dateStr = getLocalDateString(date);

    const dayEvts = calendarEvents.filter(evt => evt.startDate === dateStr || evt.endDate === dateStr);
    if (dayEvts.length === 0) return null;

    const visibleDots = dayEvts.slice(0, 3);
    const extraCount = dayEvts.length - 3;

    return (
      <div className="flex items-center justify-center gap-1 mt-1 flex-wrap">
        {visibleDots.map((evt, idx) => {
          const colorObj = getColorObj(evt.color);
          return (
            <span
              key={idx}
              className={`w-1.5 h-1.5 rounded-full ${colorObj.bg} ring-1 ring-white/20`}
              title={evt.title}
            />
          );
        })}
        {extraCount > 0 && (
          <span className="text-[9px] font-extrabold text-indigo-400 dark:text-indigo-300 leading-none">
            +{extraCount}
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5">
            <FiCalendar className="w-7 h-7 text-indigo-500" /> Event Calendar & Schedule Hub
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Centralized interactive schedule for targets, study sessions, work logs, meetings, and reminders
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="self-start sm:self-auto flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold shadow-lg shadow-indigo-500/25 hover:scale-105 transition-all cursor-pointer"
        >
          <FiPlus className="w-4 h-4" /> Add Event
        </button>
      </div>

      {/* Month Summary Dashboard Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        <div className="glass-panel p-4 rounded-2xl border border-slate-200 dark:border-white/10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold text-lg">
            📅
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Events</p>
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">{monthTotal}</h3>
          </div>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-slate-200 dark:border-white/10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold text-lg">
            ⭐
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Today's Events</p>
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">{todayEventsCount}</h3>
          </div>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-slate-200 dark:border-white/10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-lg">
            ✓
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Completed</p>
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">{monthCompleted}</h3>
          </div>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-slate-200 dark:border-white/10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold text-lg">
            ⏳
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Pending</p>
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">{monthPending}</h3>
          </div>
        </div>

        <div className="col-span-2 sm:col-span-1 glass-panel p-4 rounded-2xl border border-slate-200 dark:border-white/10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold text-lg">
            🎓
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Study Sessions</p>
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">{studySessionsCount}</h3>
          </div>
        </div>
      </div>

      {/* Navigation Header Controls & Search/Filters */}
      <div className="glass-panel p-4 rounded-3xl border border-slate-200 dark:border-white/10 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Navigation Month/Year Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevMonth}
              className="p-2 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:bg-indigo-500/20 transition-colors cursor-pointer"
              title="Previous Month"
            >
              <FiChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleTodayClick}
              className="px-3.5 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold hover:bg-indigo-500/20 transition-colors cursor-pointer"
            >
              Today
            </button>
            <button
              onClick={handleNextMonth}
              className="p-2 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:bg-indigo-500/20 transition-colors cursor-pointer"
              title="Next Month"
            >
              <FiChevronRight className="w-5 h-5" />
            </button>

            {/* Month & Year Select Dropdowns */}
            <select
              value={activeMonthIndex}
              onChange={handleMonthSelect}
              className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-bold text-slate-900 dark:text-white outline-none cursor-pointer"
            >
              {MONTH_NAMES.map((m, idx) => (
                <option key={m} value={idx} className="bg-slate-900 text-white">{m}</option>
              ))}
            </select>

            <select
              value={activeYear}
              onChange={handleYearSelect}
              className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-bold text-slate-900 dark:text-white outline-none cursor-pointer"
            >
              {Array.from({ length: 15 }, (_, i) => 2020 + i).map(y => (
                <option key={y} value={y} className="bg-slate-900 text-white">{y}</option>
              ))}
            </select>
          </div>

          {/* Search Box */}
          <div className="relative flex-1 max-w-xs">
            <FiSearch className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search event title, category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-indigo-500/40"
            />
          </div>
        </div>

        {/* Category Pills Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <span className="text-slate-400 flex items-center gap-1 font-semibold pr-1">
            <FiFilter className="w-3.5 h-3.5" /> Filter:
          </span>
          {['All', ...CATEGORIES, 'Completed', 'Pending', 'High Priority'].map((cat) => {
            const isActive = categoryFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/30'
                    : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Left Calendar Widget & Right Event Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Widget Card */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border border-slate-200 dark:border-white/10 shadow-xl">
          <Calendar
            onChange={(date) => {
              setSelectedDate(date);
              setIsDrawerOpen(true);
            }}
            value={selectedDate}
            activeStartDate={activeMonth}
            onActiveStartDateChange={({ activeStartDate }) => setActiveMonth(activeStartDate)}
            tileContent={tileContent}
          />
        </div>

        {/* Selected Date Event Drawer (Right Side / Bottom Sheet) */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-white/10 space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            {/* Drawer Header */}
            <div className="pb-3 border-b border-slate-200 dark:border-white/10">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                📅 {formattedDateTitle}
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                {selectedDateEvents.length} event(s) scheduled
              </p>
            </div>

            {/* Event Cards List */}
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
              {selectedDateEvents.length === 0 ? (
                <div className="text-center py-12 space-y-3">
                  <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-400">
                    <FiCalendar className="w-6 h-6" />
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    No events scheduled for this date.
                  </p>
                </div>
              ) : (
                selectedDateEvents.map((evt) => {
                  const colorObj = getColorObj(evt.color);
                  return (
                    <motion.div
                      key={evt.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`p-3.5 rounded-2xl bg-slate-100/70 dark:bg-white/5 border ${colorObj.border} space-y-2 hover:bg-slate-100 dark:hover:bg-white/10 transition-all`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleCalendarEventCompleted(evt.id)}
                            className={`w-5 h-5 rounded-lg flex items-center justify-center border transition-all cursor-pointer ${
                              evt.completed
                                ? 'bg-emerald-500 border-emerald-500 text-white'
                                : 'border-slate-400 dark:border-slate-600 hover:border-emerald-500'
                            }`}
                            title={evt.completed ? 'Mark Pending' : 'Mark Complete'}
                          >
                            {evt.completed && <FiCheck className="w-3.5 h-3.5" />}
                          </button>
                          <h4 className={`text-xs font-bold text-slate-900 dark:text-white ${evt.completed ? 'line-through text-slate-400 dark:text-slate-500' : ''}`}>
                            {evt.title}
                          </h4>
                        </div>

                        <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold uppercase ${colorObj.bg} text-white shadow-sm`}>
                          {evt.category}
                        </span>
                      </div>

                      {evt.description && (
                        <p className="text-[11px] text-slate-600 dark:text-slate-300 pl-7">
                          {evt.description}
                        </p>
                      )}

                      <div className="flex items-center justify-between pt-1 text-[11px] text-slate-500 dark:text-slate-400 pl-7">
                        <span className="flex items-center gap-1 font-semibold">
                          <FiClock className="w-3 h-3 text-indigo-400" /> {evt.startTime} - {evt.endTime}
                        </span>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => toggleCalendarEventCompleted(evt.id)}
                            className="p-1 rounded text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer"
                            title="Mark Complete"
                          >
                            <FiCheck className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleOpenEditModal(evt)}
                            className="p-1 rounded text-slate-400 hover:text-blue-400 transition-colors cursor-pointer"
                            title="Edit Event"
                          >
                            <FiEdit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => duplicateCalendarEvent(evt.id)}
                            className="p-1 rounded text-slate-400 hover:text-purple-400 transition-colors cursor-pointer"
                            title="Duplicate Event"
                          >
                            <FiCopy className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => deleteCalendarEvent(evt.id)}
                            className="p-1 rounded text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
                            title="Delete Event"
                          >
                            <FiTrash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>
          </div>

          <button
            onClick={handleOpenAddModal}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs shadow-lg shadow-indigo-500/25 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 mt-4 cursor-pointer"
          >
            <FiPlus className="w-4 h-4" /> Add Event to Schedule
          </button>
        </div>
      </div>

      {/* Add / Edit Event Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-lg glass-panel p-6 rounded-3xl border border-slate-200 dark:border-white/10 shadow-2xl space-y-4 my-8"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10">
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                  <FiCalendar className="w-5 h-5 text-indigo-500" />
                  {editingEvent ? 'Edit Calendar Event' : 'Create New Event'}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveForm} className="space-y-4">
                {/* Event Title */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Event Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Master Framer Motion, Team Sync"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500/40"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Description
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Add details or notes..."
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500/40"
                  />
                </div>

                {/* Category & Priority */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Category
                    </label>
                    <select
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white outline-none cursor-pointer"
                    >
                      {CATEGORIES.map(cat => (
                        <option key={cat} value={cat} className="bg-slate-900 text-white">{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Priority
                    </label>
                    <select
                      value={formPriority}
                      onChange={(e) => setFormPriority(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white outline-none cursor-pointer"
                    >
                      {PRIORITIES.map(p => (
                        <option key={p} value={p} className="bg-slate-900 text-white">{p}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Start Date & End Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={formStartDate}
                      onChange={(e) => setFormStartDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={formEndDate}
                      onChange={(e) => setFormEndDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white outline-none"
                    />
                  </div>
                </div>

                {/* Start Time & End Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Start Time
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 09:00 AM"
                      value={formStartTime}
                      onChange={(e) => setFormStartTime(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      End Time
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 10:00 AM"
                      value={formEndTime}
                      onChange={(e) => setFormEndTime(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white outline-none"
                    />
                  </div>
                </div>

                {/* Color Selector */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Color Indicator
                  </label>
                  <div className="flex items-center gap-2.5">
                    {COLORS.map((c) => {
                      const isSelected = formColor === c.name;
                      return (
                        <button
                          key={c.name}
                          type="button"
                          onClick={() => setFormColor(c.name)}
                          className={`w-7 h-7 rounded-full ${c.bg} flex items-center justify-center transition-all cursor-pointer ${
                            isSelected ? 'ring-4 ring-white/50 scale-110 shadow-lg' : 'opacity-75 hover:opacity-100'
                          }`}
                          title={c.name}
                        >
                          {isSelected && <FiCheck className="w-4 h-4 text-white" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Completed Checkbox */}
                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="completedCheckbox"
                    checked={formCompleted}
                    onChange={(e) => setFormCompleted(e.target.checked)}
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                  />
                  <label htmlFor="completedCheckbox" className="text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
                    Mark as Completed
                  </label>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-white/10">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-700/60 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-300 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold shadow-lg shadow-indigo-500/25 hover:scale-105 transition-all cursor-pointer"
                  >
                    {editingEvent ? 'Save Changes' : 'Save Event'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CalendarView;
