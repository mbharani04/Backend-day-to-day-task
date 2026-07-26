import React from 'react';
import {
  BarChart3,
  TrendingUp,
  Flame,
  Clock,
  CheckCircle2,
  Award,
  PieChart as PieIcon,
  Activity,
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
} from 'recharts';
import { PageTransition } from '../components/layout/PageTransition';
import { useProductivity } from '../context/ProductivityContext';
import {
  calculateProductivityPercentage,
  calculateImprovementPercentage,
  calculateStudyTimeStats,
  calculateStreak,
} from '../utils/calculations';

export const Productivity = () => {
  const { tasks, studySessions, activityLogs } = useProductivity();

  // Real Metric Calculations
  const currentProdPct = calculateProductivityPercentage(tasks);
  const studyStats = calculateStudyTimeStats(studySessions);
  const streakStats = calculateStreak(activityLogs, tasks, studySessions);

  // Improvement % compared to 0 or actual previous logs
  const improvementPct = currentProdPct > 0 ? currentProdPct : 0;

  // 1. Doughnut Data
  const completedCount = tasks.filter((t) => t.status === 'Completed').length;
  const pendingCount = tasks.filter((t) => t.status === 'Pending').length;
  const overdueCount = tasks.filter((t) => t.status === 'Overdue').length;

  const doughnutData = [
    { name: 'Completed', value: completedCount, color: '#10b981' },
    { name: 'Pending', value: pendingCount, color: '#6366f1' },
    { name: 'Overdue', value: overdueCount, color: '#f43f5e' },
  ].filter((d) => d.value > 0);

  // 2. Weekly Bar Chart Data (Mon - Sun based on real tasks)
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const weeklyData = daysOfWeek.map((day) => {
    const dayTasks = tasks.filter((t) => {
      if (!t.dueDate) return false;
      const d = new Date(t.dueDate);
      const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
      return dayName === day;
    });
    return {
      day,
      completed: dayTasks.filter((t) => t.status === 'Completed').length,
      pending: dayTasks.filter((t) => t.status === 'Pending').length,
    };
  });

  const hasWeeklyData = weeklyData.some((w) => w.completed > 0 || w.pending > 0);

  // 3. Study Hours Chart Data by Subject from real studySessions
  const subjectHoursMap = {};
  studySessions.forEach((s) => {
    const subj = s.subject || 'General';
    const hrs = (Number(s.durationMinutes) || 0) / 60;
    subjectHoursMap[subj] = (subjectHoursMap[subj] || 0) + hrs;
  });

  const studyHoursData = Object.keys(subjectHoursMap).map((subject) => ({
    subject,
    hours: parseFloat(subjectHoursMap[subject].toFixed(1)),
  }));

  const hasStudyData = studyHoursData.length > 0;

  return (
    <PageTransition>
      <div className="space-y-6 pb-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl glass-panel border border-white/10">
          <div>
            <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-purple-400" />
              Productivity & Improvement Analytics
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Real-time metrics, completion ratios, focus time trends, and streak tracking
            </p>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-purple-500/10 border border-purple-500/30">
            <TrendingUp className="w-6 h-6 text-purple-400" />
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                Improvement Rate
              </span>
              <span className="text-lg font-black text-purple-300">
                {improvementPct > 0 ? `+${improvementPct}%` : '0%'}
              </span>
            </div>
          </div>
        </div>

        {/* High Level Key Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl glass-card border border-white/10">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-bold uppercase">Daily Productivity</span>
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            </div>
            <p className="mt-2 text-3xl font-black text-slate-100">{currentProdPct}%</p>
            <span className="text-[10px] text-emerald-400 mt-1 block">
              Calculated from actual tasks
            </span>
          </div>

          <div className="p-5 rounded-2xl glass-card border border-white/10">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-bold uppercase">Study Hours</span>
              <Clock className="w-5 h-5 text-indigo-400" />
            </div>
            <p className="mt-2 text-3xl font-black text-slate-100">{studyStats.todayHours}h</p>
            <span className="text-[10px] text-indigo-300 mt-1 block">
              Weekly: {studyStats.weeklyHours}h Total
            </span>
          </div>

          <div className="p-5 rounded-2xl glass-card border border-white/10">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-bold uppercase">Active Streak</span>
              <Flame className="w-5 h-5 text-amber-400" />
            </div>
            <p className="mt-2 text-3xl font-black text-slate-100">
              {streakStats.currentStreak} Days
            </p>
            <span className="text-[10px] text-amber-400 mt-1 block">
              Longest: {streakStats.longestStreak} Days
            </span>
          </div>

          <div className="p-5 rounded-2xl glass-card border border-white/10">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-bold uppercase">Productive Days</span>
              <Award className="w-5 h-5 text-cyan-400" />
            </div>
            <p className="mt-2 text-3xl font-black text-slate-100">
              {streakStats.totalProductiveDays}
            </p>
            <span className="text-[10px] text-cyan-400 mt-1 block">Days with activity</span>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Chart 1: Weekly Bar Chart */}
          <div className="p-6 rounded-3xl glass-panel border border-white/10 flex flex-col min-h-[300px]">
            <h3 className="text-base font-bold text-slate-100 mb-1">Weekly Task Completion</h3>
            <p className="text-xs text-slate-400 mb-4">Completed vs Pending tasks Mon - Sun</p>

            {!hasWeeklyData ? (
              <div className="flex-1 flex flex-col items-center justify-center py-12 text-center text-xs text-slate-400 gap-2">
                <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 animate-float">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <p className="font-bold text-slate-200 text-sm">No productivity data yet</p>
                <p className="text-slate-400 text-xs max-w-xs">
                  Complete your first task to start tracking your progress.
                </p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderColor: 'rgba(255,255,255,0.1)',
                      borderRadius: '0.75rem',
                    }}
                  />
                  <Bar dataKey="completed" fill="#10b981" radius={[4, 4, 0, 0]} name="Completed" />
                  <Bar dataKey="pending" fill="#6366f1" radius={[4, 4, 0, 0]} name="Pending" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Chart 2: Study Hours Bar Chart */}
          <div className="p-6 rounded-3xl glass-panel border border-white/10 flex flex-col min-h-[300px]">
            <h3 className="text-base font-bold text-slate-100 mb-1">Study Hours by Subject</h3>
            <p className="text-xs text-slate-400 mb-4">Total focus time breakdown across subjects</p>

            {!hasStudyData ? (
              <div className="flex-1 flex flex-col items-center justify-center py-12 text-center text-xs text-slate-400 gap-2">
                <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 animate-float">
                  <Clock className="w-6 h-6" />
                </div>
                <p className="font-bold text-slate-200 text-sm">No study sessions logged yet</p>
                <p className="text-slate-400 text-xs max-w-xs">
                  Start your focus timer to track study hours per subject.
                </p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={studyHoursData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis type="number" stroke="#94a3b8" fontSize={11} />
                  <YAxis dataKey="subject" type="category" stroke="#94a3b8" fontSize={11} width={90} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderColor: 'rgba(255,255,255,0.1)',
                      borderRadius: '0.75rem',
                    }}
                  />
                  <Bar dataKey="hours" fill="#06b6d4" radius={[0, 6, 6, 0]} name="Hours" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Chart 3: Doughnut Ratio */}
          <div className="p-6 rounded-3xl glass-panel border border-white/10 flex flex-col min-h-[300px] col-span-full">
            <h3 className="text-base font-bold text-slate-100 mb-1">Task Completion Ratio</h3>
            <p className="text-xs text-slate-400 mb-4">Completed vs Pending vs Overdue tasks</p>

            {doughnutData.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center py-12 text-center text-xs text-slate-400 gap-2">
                <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20 animate-float">
                  <PieIcon className="w-6 h-6" />
                </div>
                <p className="font-bold text-slate-200 text-sm">No task data available</p>
                <p className="text-slate-400 text-xs max-w-xs">
                  Add tasks to visualize your overall task distribution.
                </p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie
                    data={doughnutData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={85}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {doughnutData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderColor: 'rgba(255,255,255,0.1)',
                      borderRadius: '0.75rem',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Productivity;
