import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPieChart, FiPlus, FiTrendingUp, FiTrash2 } from 'react-icons/fi';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { v4 as uuidv4 } from 'uuid';
import { useApp } from '../../context/AppContext';
import { formatCurrency } from '../../utils/formatters';

const Savings = () => {
  const { savings, addSavings, deleteSavings } = useApp();

  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !reason) return;
    addSavings({
      id: uuidv4(),
      amount: Number(amount),
      reason,
      date
    });
    setAmount('');
    setReason('');
  };

  const totalSavings = savings.reduce((sum, s) => sum + (Number(s.amount) || 0), 0);

  const chartData = savings.map((s, idx) => ({
    name: s.reason.length > 10 ? s.reason.substring(0, 10) + '...' : s.reason,
    amount: s.amount,
    accumulated: savings.slice(0, idx + 1).reduce((acc, curr) => acc + curr.amount, 0)
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5">
            <FiPieChart className="w-7 h-7 text-purple-500" /> Savings & Capital Goals
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Build wealth reserves, emergency funds, and major purchase savings
          </p>
        </div>

        <div className="glass-panel px-5 py-3 rounded-2xl border border-slate-200 dark:border-white/10 bg-purple-500/10">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Savings Reserve</p>
          <p className="text-2xl font-extrabold text-purple-400 mt-0.5">{formatCurrency(totalSavings)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Form */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-white/10 space-y-4 h-fit">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FiPlus className="w-4 h-4 text-purple-500" /> Add Savings Deposit
          </h3>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Savings Goal / Reason</label>
              <input
                type="text"
                placeholder="e.g. Ergonomic Desk & Display Setup"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Amount ($)</label>
              <input
                type="number"
                placeholder="1500"
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
              className="w-full py-3 rounded-xl bg-purple-600 text-white font-semibold text-xs shadow-md shadow-purple-500/20 hover:scale-[1.02] transition-all"
            >
              Deposit Savings
            </button>
          </form>
        </div>

        {/* Right Charts */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-white/10">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
              <FiTrendingUp className="w-4 h-4 text-purple-400" /> Savings Growth Trend
            </h3>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="savGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
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
                  <Area type="monotone" dataKey="accumulated" stroke="#8b5cf6" fillOpacity={1} fill="url(#savGrad)" strokeWidth={2} name="Total Savings ($)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-white/10 space-y-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Savings Allocations</h3>
            <div className="divide-y divide-slate-200/50 dark:divide-white/5">
              {savings.map(item => (
                <div key={item.id} className="py-3 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">{item.reason}</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">{item.date}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-extrabold text-purple-400">{formatCurrency(item.amount)}</span>
                    <button
                      onClick={() => deleteSavings(item.id)}
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

export default Savings;
