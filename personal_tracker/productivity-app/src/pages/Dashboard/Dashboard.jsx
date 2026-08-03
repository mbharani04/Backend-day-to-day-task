import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  FiCheckCircle,
  FiClock,
  FiTarget,
  FiTrendingUp,
  FiBookOpen,
  FiBell,
  FiFileText,
  FiDollarSign,
  FiPieChart,
  FiBriefcase,
  FiShoppingBag,
  FiPlus,
  FiZap,
  FiActivity,
  FiAward
} from 'react-icons/fi';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { formatCurrency, formatDuration } from '../../utils/formatters';

const getLocalDateString = (date) => {
  if (!date) return '';
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    targets = [],
    dailyPlanner = [],
    studySessions = [],
    skills = [],
    work = [],
    salary = [],
    savings = [],
    shopping = [],
    notes = [],
    reminders = [],
    dailyReview = [],
    calendarEvents = [],
    openQuickAction
  } = useApp();

  // Metrics calculation
  const totalTasks = dailyPlanner.length;
  const completedTasks = dailyPlanner.filter(t => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  const totalStudyMinutes = studySessions.reduce((sum, s) => sum + (s.durationMinutes || 0), 0);
  const totalStudyHoursStr = formatDuration(totalStudyMinutes);

  const completedTargetsCount = targets.filter(t => t.completed || t.progress === 100).length;
  const totalSalaryAmount = salary.reduce((sum, s) => sum + (Number(s.amount) || 0), 0);
  const totalSavingsAmount = savings.reduce((sum, s) => sum + (Number(s.amount) || 0), 0);
  const totalWorkMinutes = work.reduce((sum, w) => sum + (w.durationMinutes || 0), 0);
  const totalWishlistItems = shopping.filter(s => !s.purchased).length;
  const pendingRemindersCount = reminders.filter(r => !r.completed).length;

  // Dynamic Streak Calculation based on active logged days
  const activeDates = new Set([
    ...dailyPlanner.filter(t => t.completed).map(t => t.date),
    ...studySessions.map(s => s.date),
    ...work.map(w => w.date),
    ...dailyReview.map(r => r.date),
    ...calendarEvents.filter(c => c.completed).map(c => c.startDate)
  ].filter(Boolean));

  let currentStreak = 0;
  const todayObj = new Date();
  let checkDate = new Date(todayObj);
  
  // Check today or yesterday as start
  const todayStr = getLocalDateString(todayObj);
  const yesterdayObj = new Date(todayObj);
  yesterdayObj.setDate(yesterdayObj.getDate() - 1);
  const yesterdayStr = getLocalDateString(yesterdayObj);

  if (!activeDates.has(todayStr) && activeDates.has(yesterdayStr)) {
    checkDate = yesterdayObj;
  }

  while (true) {
    const dStr = getLocalDateString(checkDate);
    if (activeDates.has(dStr)) {
      currentStreak += 1;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }

  // Chart Data Preparation
  const weeklyProductivityData = [
    { day: 'Mon', study: 3.5, work: 5.0, tasks: 4 },
    { day: 'Tue', study: 4.0, work: 6.0, tasks: 6 },
    { day: 'Wed', study: 2.5, work: 4.5, tasks: 3 },
    { day: 'Thu', study: 5.0, work: 7.0, tasks: 8 },
    { day: 'Fri', study: 4.5, work: 6.5, tasks: 7 },
    { day: 'Sat', study: 6.0, work: 3.0, tasks: 5 },
    { day: 'Sun', study: 3.0, work: 2.0, tasks: 4 }
  ];

  const taskCompletionPieData = [
    { name: 'Completed', value: completedTasks || 1, color: '#10b981' },
    { name: 'Pending', value: pendingTasks || 1, color: '#f59e0b' }
  ];

  const skillProgressData = skills.map(s => ({
    name: s.name.split(' ')[0],
    hours: s.completedHours,
    target: s.targetHours
  }));

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      {/* Hero Welcome Banner */}
      <motion.div
        variants={itemVariants}
        className="glass-panel p-6 lg:p-8 rounded-3xl border border-slate-200 dark:border-white/10 relative overflow-hidden bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-purple-600/10"
      >
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-semibold mb-3">
              <FiZap className="w-3.5 h-3.5" /> High Performance Mode Active
            </div>
            <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Good day, <span className="text-gradient">{user?.name || 'Alex'}</span> 👋
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
              You have completed <strong className="text-emerald-500">{completedTasks} tasks</strong> today with a <strong className="text-indigo-400">{currentStreak}-day focus streak</strong>.
            </p>
          </div>

          {/* Quick Action Triggers */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => openQuickAction('target')}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold shadow-lg shadow-indigo-500/25 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <FiPlus className="w-4 h-4" /> Add Target
            </button>
            <button
              onClick={() => openQuickAction('reminder')}
              className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 text-slate-800 dark:text-white text-xs font-semibold transition-all flex items-center gap-2 border border-slate-200 dark:border-white/10"
            >
              <FiBell className="w-4 h-4 text-indigo-400" /> Set Reminder
            </button>
            <button
              onClick={() => navigate('/study')}
              className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 text-slate-800 dark:text-white text-xs font-semibold transition-all flex items-center gap-2 border border-slate-200 dark:border-white/10"
            >
              <FiClock className="w-4 h-4 text-purple-400" /> Start Study Timer
            </button>
          </div>
        </div>
      </motion.div>

      {/* KPI Cards Grid */}
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {/* Today's Tasks */}
        <motion.div
          variants={itemVariants}
          onClick={() => navigate('/planner')}
          className="glass-panel glass-panel-hover p-5 rounded-2xl cursor-pointer flex items-center justify-between"
        >
          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Today's Tasks</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{totalTasks}</h3>
            <p className="text-[11px] text-emerald-500 font-medium mt-1">
              {completedTasks} completed ({totalTasks ? Math.round((completedTasks/totalTasks)*100) : 0}%)
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
            <FiCheckCircle className="w-6 h-6" />
          </div>
        </motion.div>

        {/* Study Hours */}
        <motion.div
          variants={itemVariants}
          onClick={() => navigate('/study')}
          className="glass-panel glass-panel-hover p-5 rounded-2xl cursor-pointer flex items-center justify-between"
        >
          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Study Hours</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{totalStudyHoursStr}</h3>
            <p className="text-[11px] text-indigo-400 font-medium mt-1">
              {studySessions.length} sessions logged
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
            <FiClock className="w-6 h-6" />
          </div>
        </motion.div>

        {/* Current Streak */}
        <motion.div
          variants={itemVariants}
          className="glass-panel glass-panel-hover p-5 rounded-2xl flex items-center justify-between"
        >
          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Focus Streak</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{currentStreak} Days</h3>
            <p className="text-[11px] text-amber-500 font-medium mt-1">
              {currentStreak > 0 ? '🔥 Top 5% Consistent' : '⚡ Complete tasks to build your streak!'}
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
            <FiAward className="w-6 h-6" />
          </div>
        </motion.div>

        {/* Targets Completed */}
        <motion.div
          variants={itemVariants}
          onClick={() => navigate('/targets')}
          className="glass-panel glass-panel-hover p-5 rounded-2xl cursor-pointer flex items-center justify-between"
        >
          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Active Targets</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{targets.length}</h3>
            <p className="text-[11px] text-purple-400 font-medium mt-1">
              {completedTargetsCount} achieved
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
            <FiTarget className="w-6 h-6" />
          </div>
        </motion.div>
      </motion.div>

      {/* Secondary Metrics Cards */}
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3"
      >
        <div onClick={() => navigate('/skills')} className="glass-panel p-4 rounded-xl cursor-pointer hover:border-cyan-500/30 transition-all">
          <FiBookOpen className="w-4 h-4 text-cyan-400 mb-1" />
          <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Skills</p>
          <p className="text-base font-bold text-slate-900 dark:text-white">{skills.length}</p>
        </div>

        <div onClick={() => navigate('/work')} className="glass-panel p-4 rounded-xl cursor-pointer hover:border-blue-500/30 transition-all">
          <FiBriefcase className="w-4 h-4 text-blue-400 mb-1" />
          <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Work Hours</p>
          <p className="text-base font-bold text-slate-900 dark:text-white">{formatDuration(totalWorkMinutes)}</p>
        </div>

        <div onClick={() => navigate('/salary')} className="glass-panel p-4 rounded-xl cursor-pointer hover:border-emerald-500/30 transition-all">
          <FiDollarSign className="w-4 h-4 text-emerald-400 mb-1" />
          <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Total Income</p>
          <p className="text-base font-bold text-slate-900 dark:text-white">{formatCurrency(totalSalaryAmount)}</p>
        </div>

        <div onClick={() => navigate('/savings')} className="glass-panel p-4 rounded-xl cursor-pointer hover:border-purple-500/30 transition-all">
          <FiPieChart className="w-4 h-4 text-purple-400 mb-1" />
          <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Total Savings</p>
          <p className="text-base font-bold text-slate-900 dark:text-white">{formatCurrency(totalSavingsAmount)}</p>
        </div>

        <div onClick={() => navigate('/notes')} className="glass-panel p-4 rounded-xl cursor-pointer hover:border-pink-500/30 transition-all">
          <FiFileText className="w-4 h-4 text-pink-400 mb-1" />
          <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Notes Saved</p>
          <p className="text-base font-bold text-slate-900 dark:text-white">{notes.length}</p>
        </div>

        <div onClick={() => navigate('/shopping')} className="glass-panel p-4 rounded-xl cursor-pointer hover:border-amber-500/30 transition-all">
          <FiShoppingBag className="w-4 h-4 text-amber-400 mb-1" />
          <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Wishlist Items</p>
          <p className="text-base font-bold text-slate-900 dark:text-white">{totalWishlistItems}</p>
        </div>
      </motion.div>

      {/* Analytics Visualization Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Productivity Chart */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-2 glass-panel p-6 rounded-3xl border border-slate-200 dark:border-white/10"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <FiTrendingUp className="w-4 h-4 text-indigo-400" /> Weekly Productivity Trends
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Study hours vs Work hours comparison</p>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyProductivityData}>
                <defs>
                  <linearGradient id="studyGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="workGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#64748b" fontSize={12} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '0.75rem',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                />
                <Area type="monotone" dataKey="study" stroke="#8b5cf6" fillOpacity={1} fill="url(#studyGrad)" strokeWidth={2} name="Study (hrs)" />
                <Area type="monotone" dataKey="work" stroke="#3b82f6" fillOpacity={1} fill="url(#workGrad)" strokeWidth={2} name="Work (hrs)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Task Completion Breakdown */}
        <motion.div
          variants={itemVariants}
          className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-white/10 flex flex-col justify-between"
        >
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FiActivity className="w-4 h-4 text-emerald-400" /> Task Completion Ratio
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Daily planner performance</p>
          </div>

          <div className="h-48 my-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={taskCompletionPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {taskCompletionPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '0.75rem',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-around border-t border-slate-200 dark:border-white/10 pt-3">
            <div className="text-center">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 mr-1.5" />
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Completed ({completedTasks})</span>
            </div>
            <div className="text-center">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-amber-500 mr-1.5" />
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Pending ({pendingTasks})</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Skill Progress Visualizer Grid */}
      <motion.div
        variants={itemVariants}
        className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-white/10"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FiBookOpen className="w-4 h-4 text-cyan-400" /> Active Learning & Skill Mastery
          </h3>
          <button
            onClick={() => navigate('/skills')}
            className="text-xs font-semibold text-indigo-500 hover:underline"
          >
            Manage Skills →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {skills.slice(0, 4).map(skill => {
            const percentage = Math.min(100, Math.round((skill.completedHours / skill.targetHours) * 100));
            return (
              <div key={skill.id} className="p-4 rounded-2xl bg-slate-100/70 dark:bg-white/5 border border-slate-200/50 dark:border-white/5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 dark:text-white truncate">{skill.name}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 font-semibold">{skill.level}</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-white/10 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-cyan-500 to-indigo-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
                  <span>{skill.completedHours} / {skill.targetHours} hrs</span>
                  <span className="font-semibold">{percentage}%</span>
                </p>
              </div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
