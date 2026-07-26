import React, { useState, useEffect } from 'react';
import { Sparkles, Calendar as CalendarIcon, Flame } from 'lucide-react';
import { useProductivity } from '../../context/ProductivityContext';
import { getTimeGreeting, formatFullDate } from '../../utils/dateUtils';
import { calculateStreak } from '../../utils/calculations';

export const WelcomeHeader = () => {
  const { profile, activityLogs, tasks, studySessions } = useProductivity();

  const [greeting, setGreeting] = useState(() => getTimeGreeting());

  useEffect(() => {
    const interval = setInterval(() => {
      setGreeting(getTimeGreeting());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const fullDate = formatFullDate();
  const streakStats = calculateStreak(activityLogs, tasks, studySessions);

  const quotes = [
    'Small progress every day creates big results.',
    'Consistency is what transforms average into excellence.',
    'Focus on being productive instead of busy.',
    'Your future self will thank you for the work you do today.',
  ];
  // Select quote based on day
  const quoteIndex = new Date().getDate() % quotes.length;
  const quote = quotes[quoteIndex];

  return (
    <div className="relative overflow-hidden rounded-3xl glass-panel border border-white/10 p-6 lg:p-8 bg-gradient-to-r from-slate-900/90 via-slate-900/80 to-indigo-950/40">
      {/* Background Subtle Glow & Effect */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          {/* Greeting Header */}
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5">
              <CalendarIcon className="w-3.5 h-3.5 text-indigo-400" />
              {fullDate}
            </span>
          </div>

          <h1 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-100">
            {greeting},{' '}
            <span className="gradient-text">{profile?.name || 'Bharani'}</span>
          </h1>

          <p className="mt-2 text-xs sm:text-sm text-slate-400 font-medium flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span>"{quote}"</span>
          </p>
        </div>

        {/* Dynamic Streak Badge Card */}
        <div className="flex items-center gap-4 p-4 rounded-2xl glass-card border border-amber-500/20 bg-amber-500/5">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white font-extrabold shadow-lg shadow-amber-500/30 shrink-0">
            <Flame className="w-6 h-6 animate-bounce" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Active Streak
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-slate-100">
                {streakStats.currentStreak}
              </span>
              <span className="text-xs font-bold text-amber-400">Days Active 🔥</span>
            </div>
            <span className="text-[10px] text-slate-400">Best: {streakStats.longestStreak} Days</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHeader;
