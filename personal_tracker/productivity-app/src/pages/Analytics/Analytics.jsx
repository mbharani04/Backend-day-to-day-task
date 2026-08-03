import React from 'react';
import { motion } from 'framer-motion';
import { FiBarChart2, FiTrendingUp, FiPieChart, FiActivity, FiBookOpen } from 'react-icons/fi';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { useApp } from '../../context/AppContext';
import { formatCurrency, formatDuration } from '../../utils/formatters';

const Analytics = () => {
  const { targets, dailyPlanner, studySessions, skills, work, salary, savings } = useApp();

  // Metric summaries
  const totalStudyMins = studySessions.reduce((sum, s) => sum + (s.durationMinutes || 0), 0);
  const totalWorkMins = work.reduce((sum, w) => sum + (w.durationMinutes || 0), 0);
  const totalIncome = salary.reduce((sum, s) => sum + (Number(s.amount) || 0), 0);
  const totalSavings = savings.reduce((sum, s) => sum + (Number(s.amount) || 0), 0);

  const completedTargets = targets.filter(t => t.completed || t.progress === 100).length;

  // Chart datasets
  const studyWorkComparison = [
    { name: 'Mon', study: 3.5, work: 5.0 },
    { name: 'Tue', study: 4.0, work: 6.0 },
    { name: 'Wed', study: 2.5, work: 4.5 },
    { name: 'Thu', study: 5.0, work: 7.0 },
    { name: 'Fri', study: 4.5, work: 6.5 },
    { name: 'Sat', study: 6.0, work: 3.0 },
    { name: 'Sun', study: 3.0, work: 2.0 }
  ];

  const savingsSalaryTrend = salary.map((sal, i) => ({
    source: sal.source.substring(0, 10),
    income: sal.amount,
    savings: savings[i] ? savings[i].amount : 0
  }));

  const skillDistributionData = skills.map(s => ({
    name: s.name.split(' ')[0],
    value: s.completedHours || 1
  }));

  const COLORS = ['#3b82f6', '#8b5cf6', '#06b6d4', '#ec4899', '#10b981', '#f59e0b'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5">
          <FiBarChart2 className="w-7 h-7 text-indigo-500" /> Advanced Analytics & Intelligence
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Deep data visualization of study hours, financial growth, target execution, and work metrics
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-white/10">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Study Time</p>
          <p className="text-2xl font-bold text-indigo-400 mt-1">{formatDuration(totalStudyMins)}</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-white/10">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Work Time</p>
          <p className="text-2xl font-bold text-blue-400 mt-1">{formatDuration(totalWorkMins)}</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-white/10">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Achieved Goals</p>
          <p className="text-2xl font-bold text-emerald-400 mt-1">{completedTargets} / {targets.length}</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-white/10">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Financial Surplus</p>
          <p className="text-2xl font-bold text-purple-400 mt-1">{formatCurrency(totalIncome + totalSavings)}</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Study vs Work Area Chart */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-white/10">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
            <FiTrendingUp className="w-4 h-4 text-indigo-400" /> Study vs Work Hours (Weekly)
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={studyWorkComparison}>
                <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '0.75rem',
                    color: '#fff'
                  }}
                />
                <Area type="monotone" dataKey="study" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} name="Study (hrs)" />
                <Area type="monotone" dataKey="work" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} name="Work (hrs)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Financial Income vs Savings Bar Chart */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-white/10">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
            <FiPieChart className="w-4 h-4 text-emerald-400" /> Income vs Savings Distribution
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={savingsSalaryTrend}>
                <XAxis dataKey="source" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '0.75rem',
                    color: '#fff'
                  }}
                />
                <Bar dataKey="income" fill="#10b981" radius={[6, 6, 0, 0]} name="Income ($)" />
                <Bar dataKey="savings" fill="#8b5cf6" radius={[6, 6, 0, 0]} name="Savings ($)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Skill Hours Breakdown Pie Chart */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-white/10">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
            <FiBookOpen className="w-4 h-4 text-cyan-400" /> Skill Practice Time Distribution
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={skillDistributionData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label
                >
                  {skillDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '0.75rem',
                    color: '#fff'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Productivity Consistency Line Chart */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-white/10">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
            <FiActivity className="w-4 h-4 text-purple-400" /> Daily Focus Score Consistency
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={studyWorkComparison}>
                <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '0.75rem',
                    color: '#fff'
                  }}
                />
                <Line type="monotone" dataKey="study" stroke="#ec4899" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
