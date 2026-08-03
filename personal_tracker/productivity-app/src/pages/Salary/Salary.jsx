import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiDollarSign, FiPlus, FiTrendingUp, FiTrash2, FiCalendar } from 'react-icons/fi';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { v4 as uuidv4 } from 'uuid';
import { useApp } from '../../context/AppContext';
import { formatCurrency } from '../../utils/formatters';

const Salary = () => {
  const { salary, addSalary, deleteSalary } = useApp();

  const [amount, setAmount] = useState('');
  const [source, setSource] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !source) return;
    addSalary({
      id: uuidv4(),
      amount: Number(amount),
      source,
      date
    });
    setAmount('');
    setSource('');
  };

  const totalIncome = salary.reduce((sum, s) => sum + (Number(s.amount) || 0), 0);

  const chartData = salary.map(s => ({
    name: s.source.length > 12 ? s.source.substring(0, 12) + '...' : s.source,
    amount: s.amount
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5">
            <FiDollarSign className="w-7 h-7 text-emerald-500" /> Salary & Income Tracker
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Monitor earnings, consultancy revenue, and recurring paycheck history
          </p>
        </div>

        <div className="glass-panel px-5 py-3 rounded-2xl border border-slate-200 dark:border-white/10 bg-emerald-500/10">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Income Cumulative</p>
          <p className="text-2xl font-extrabold text-emerald-500 mt-0.5">{formatCurrency(totalIncome)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Form */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-white/10 space-y-4 h-fit">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FiPlus className="w-4 h-4 text-emerald-500" /> Log Income Stream
          </h3>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Income Source</label>
              <input
                type="text"
                placeholder="e.g. Senior Frontend Consulting"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Amount ($)</label>
              <input
                type="number"
                placeholder="6500"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-emerald-600 text-white font-semibold text-xs shadow-md shadow-emerald-500/20 hover:scale-[1.02] transition-all"
            >
              Add Salary Entry
            </button>
          </form>
        </div>

        {/* Right Visualizer */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-white/10">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
              <FiTrendingUp className="w-4 h-4 text-emerald-400" /> Income Breakdown Chart
            </h3>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(15, 23, 42, 0.9)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '0.75rem',
                      color: '#fff',
                      fontSize: '12px'
                    }}
                  />
                  <Bar dataKey="amount" fill="#10b981" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-white/10 space-y-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Recent Income History</h3>
            <div className="divide-y divide-slate-200/50 dark:divide-white/5">
              {salary.map(item => (
                <div key={item.id} className="py-3 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">{item.source}</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">{item.date}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-extrabold text-emerald-500">{formatCurrency(item.amount)}</span>
                    <button
                      onClick={() => deleteSalary(item.id)}
                      className="p-1 rounded text-slate-400 hover:text-rose-400"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Salary;
