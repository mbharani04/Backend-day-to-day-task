import React, { useState, useEffect } from 'react';
import { Clock, Calendar, Sun, Moon, Sparkles, CheckCircle2, PartyPopper, Bell, BookOpen } from 'lucide-react';
import { useProductivity } from '../../context/ProductivityContext';

export const TodaysTimelineCard = () => {
  const { tasks, events, reminders, studySessions } = useProductivity();

  const [currentTime, setCurrentTime] = useState(new Date());

  // Real-time clock update every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Formatted date and time strings
  const timeFormatted = currentTime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  const dateFormatted = currentTime.toLocaleDateString([], {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  // Calculate percentage of 24-hour day passed
  const currentSeconds =
    currentTime.getHours() * 3600 + currentTime.getMinutes() * 60 + currentTime.getSeconds();
  const dayProgressPct = ((currentSeconds / 86400) * 100).toFixed(1);

  // Helper to convert HH:MM string (24h or 12h format) to percentage of 24h day
  const timeToPct = (timeStr) => {
    if (!timeStr) return null;
    let hours = 0;
    let minutes = 0;

    // Check 12h format with AM/PM
    if (timeStr.includes('AM') || timeStr.includes('PM')) {
      const match = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
      if (match) {
        hours = parseInt(match[1], 10);
        minutes = parseInt(match[2], 10);
        const isPM = match[3].toUpperCase() === 'PM';
        if (isPM && hours < 12) hours += 12;
        if (!isPM && hours === 12) hours = 0;
      }
    } else {
      // 24h format HH:MM
      const parts = timeStr.split(':');
      if (parts.length >= 2) {
        hours = parseInt(parts[0], 10);
        minutes = parseInt(parts[1], 10);
      }
    }

    const totalMins = hours * 60 + minutes;
    return Math.min(100, Math.max(0, (totalMins / 1440) * 100));
  };

  // Collect real activity markers for today
  const todayStr = new Date().toISOString().split('T')[0];

  const activityMarkers = [];

  // Tasks today
  tasks
    .filter((t) => t.dueDate === todayStr && t.dueTime)
    .forEach((t) => {
      const pct = timeToPct(t.dueTime);
      if (pct !== null) {
        activityMarkers.push({
          id: `task-${t.id}`,
          type: 'task',
          timeStr: t.dueTime,
          pct,
          title: t.title,
          status: t.status,
          icon: CheckCircle2,
          color: 'text-emerald-400',
          bgColor: 'bg-emerald-500/20',
          borderColor: 'border-emerald-500/40',
        });
      }
    });

  // Events today
  events
    .filter((e) => e.date === todayStr && e.time)
    .forEach((e) => {
      const pct = timeToPct(e.time);
      if (pct !== null) {
        activityMarkers.push({
          id: `evt-${e.id}`,
          type: 'event',
          timeStr: e.time,
          pct,
          title: e.title,
          icon: PartyPopper,
          color: 'text-pink-400',
          bgColor: 'bg-pink-500/20',
          borderColor: 'border-pink-500/40',
        });
      }
    });

  // Reminders today
  reminders
    .filter((r) => r.time)
    .forEach((r) => {
      const pct = timeToPct(r.time);
      if (pct !== null) {
        activityMarkers.push({
          id: `rem-${r.id}`,
          type: 'reminder',
          timeStr: r.time,
          pct,
          title: r.title,
          icon: Bell,
          color: 'text-amber-400',
          bgColor: 'bg-amber-500/20',
          borderColor: 'border-amber-500/40',
        });
      }
    });

  // Study Sessions today
  studySessions
    .filter((s) => s.date === todayStr && s.startTime)
    .forEach((s) => {
      const pct = timeToPct(s.startTime);
      if (pct !== null) {
        activityMarkers.push({
          id: `study-${s.id}`,
          type: 'study',
          timeStr: s.startTime,
          pct,
          title: `${s.subject}: ${s.concept}`,
          icon: BookOpen,
          color: 'text-indigo-400',
          bgColor: 'bg-indigo-500/20',
          borderColor: 'border-indigo-500/40',
        });
      }
    });

  const hourLabels = [
    { label: '12 AM', pct: 0 },
    { label: '3 AM', pct: 12.5 },
    { label: '6 AM', pct: 25 },
    { label: '9 AM', pct: 37.5 },
    { label: '12 PM', pct: 50, isNoon: true },
    { label: '3 PM', pct: 62.5 },
    { label: '6 PM', pct: 75 },
    { label: '9 PM', pct: 87.5 },
    { label: '12 AM', pct: 100 },
  ];

  return (
    <div className="p-6 rounded-3xl glass-panel border border-white/10 shadow-2xl bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-indigo-950/40 space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <Clock className="w-5 h-5 text-indigo-400 animate-pulse" />
            Today's Timeline
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">Your 24-hour day at a glance</p>
        </div>

        {/* Live Clock & Date Display */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/30">
            <Calendar className="w-4 h-4 text-indigo-400" />
            <span className="text-xs font-semibold text-slate-200">{dateFormatted}</span>
          </div>

          <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/30">
            <Clock className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-black text-slate-100 font-mono tracking-wider">
              {timeFormatted}
            </span>
          </div>

          {/* Day Progress Indicator */}
          <div className="p-2.5 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-right">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Day Progress
            </span>
            <span className="text-sm font-black text-purple-300 font-mono">
              {dayProgressPct}%
            </span>
          </div>
        </div>
      </div>

      {/* AM / PM Visual Division Banner */}
      <div className="grid grid-cols-2 gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
        <div className="p-2 rounded-xl bg-slate-800/40 border border-indigo-500/20 flex items-center justify-center gap-2 text-indigo-300">
          <Moon className="w-4 h-4 text-indigo-400" />
          <span>🌙 AM (12:00 AM → 12:00 PM)</span>
        </div>

        <div className="p-2 rounded-xl bg-slate-800/40 border border-amber-500/20 flex items-center justify-center gap-2 text-amber-300">
          <Sun className="w-4 h-4 text-amber-400" />
          <span>☀️ PM (12:00 PM → 12:00 AM)</span>
        </div>
      </div>

      {/* 24-HOUR VISUAL TIMELINE */}
      <div className="pt-2 pb-6 px-2 overflow-x-auto no-scrollbar">
        <div className="min-w-[650px] relative pt-10 pb-8">
          {/* Main Horizontal Bar Gradient */}
          <div className="h-4 w-full rounded-full bg-slate-800/80 border border-white/10 relative overflow-hidden flex items-center shadow-inner">
            {/* AM Half */}
            <div className="h-full w-1/2 bg-gradient-to-r from-indigo-900/60 via-purple-900/40 to-slate-900/80 border-r-2 border-indigo-400/80" />
            {/* PM Half */}
            <div className="h-full w-1/2 bg-gradient-to-r from-amber-900/40 via-orange-900/40 to-indigo-950/80" />
          </div>

          {/* 12:00 PM Highlight Marker */}
          <div
            className="absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 flex flex-col items-center pointer-events-none z-20"
          >
            <span className="text-[10px] font-extrabold text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded-full border border-amber-500/40">
              ☀️ 12 PM NOON
            </span>
            <div className="w-0.5 flex-1 bg-amber-400/60 my-1" />
          </div>

          {/* Current Time Marker */}
          <div
            className="absolute top-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30 transition-all duration-1000"
            style={{ left: `${dayProgressPct}%` }}
          >
            <div className="w-4 h-4 rounded-full bg-cyan-400 border-2 border-slate-900 shadow-xl shadow-cyan-400/90 animate-pulse" />
          </div>

          {/* Activity Markers on Timeline */}
          {activityMarkers.map((act) => {
            const Icon = act.icon;
            return (
              <div
                key={act.id}
                className="absolute top-12 transform -translate-x-1/2 group cursor-pointer z-25"
                style={{ left: `${act.pct}%` }}
              >
                <div
                  className={`p-1.5 rounded-full ${act.bgColor} ${act.color} border ${act.borderColor} shadow-md group-hover:scale-125 transition-all`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>

                {/* Tooltip on Hover */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 w-40 p-2 rounded-xl glass-panel border border-white/20 shadow-2xl text-[10px] pointer-events-none bg-slate-900/95 z-40">
                  <div className="flex items-center justify-between font-bold border-b border-white/10 pb-1 mb-1">
                    <span className={act.color}>{act.timeStr}</span>
                    <span className="uppercase">{act.type}</span>
                  </div>
                  <p className="text-slate-100 truncate">{act.title}</p>
                </div>
              </div>
            );
          })}

          {/* Hour Markings Below Timeline */}
          <div className="relative w-full mt-4 flex items-center justify-between text-[11px] font-bold text-slate-400">
            {hourLabels.map((h, i) => (
              <span
                key={i}
                className={`transition-colors ${
                  h.isNoon ? 'text-amber-400 font-extrabold scale-110' : 'text-slate-400'
                }`}
              >
                {h.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Activity Markers Summary List (If User Created Data Exists) */}
      {activityMarkers.length > 0 && (
        <div className="pt-3 border-t border-white/10 space-y-2">
          <span className="text-xs font-bold text-slate-300 block">Today's Scheduled Activities</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {activityMarkers.map((act) => {
              const Icon = act.icon;
              return (
                <div
                  key={act.id}
                  className={`p-2.5 rounded-xl ${act.bgColor} border ${act.borderColor} flex items-center gap-2.5 text-xs truncate`}
                >
                  <Icon className={`w-4 h-4 ${act.color} shrink-0`} />
                  <div className="min-w-0 truncate">
                    <span className="text-[10px] font-bold text-slate-400 block">{act.timeStr}</span>
                    <p className="font-semibold text-slate-100 truncate">{act.title}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default TodaysTimelineCard;
