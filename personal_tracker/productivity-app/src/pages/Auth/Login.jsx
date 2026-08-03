import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiZap, FiMail, FiLock, FiArrowRight, FiCheckCircle } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('alex.rivera@productivity.io');
  const [password, setPassword] = useState('password123');

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
    navigate('/dashboard');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="glass-panel p-8 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-2xl"
    >
      {/* Brand Header */}
      <div className="text-center mb-8">
        <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-xl shadow-indigo-500/30">
          <FiZap className="w-7 h-7 animate-pulse" />
        </div>
        <h1 className="text-2xl font-bold text-white tracking-tight">
          Welcome to <span className="text-gradient">NexusOS</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          High-performance personal productivity & life management system
        </p>
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email Address</label>
          <div className="relative">
            <FiMail className="absolute left-3.5 top-3.5 text-slate-400 w-4 h-4" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder-slate-500"
              placeholder="bharani@example.com"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Password</label>
          <div className="relative">
            <FiLock className="absolute left-3.5 top-3.5 text-slate-400 w-4 h-4" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder-slate-500"
              placeholder="••••••••"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-semibold text-sm shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group mt-2"
        >
          <span>Sign In to Dashboard</span>
          <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </form>

      {/* Single-Click Demo Access Feature */}
      <div className="mt-6 pt-6 border-t border-white/10 text-center">
        <p className="text-xs text-slate-400 mb-2">Want a 1-click preview with pre-loaded demo data?</p>
        <button
          onClick={() => { login('alex.rivera@productivity.io', 'demo'); navigate('/dashboard'); }}
          className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-indigo-400 hover:text-indigo-300 text-xs font-semibold transition-all flex items-center justify-center gap-2"
        >
          <FiCheckCircle className="w-4 h-4 text-emerald-400" />
          <span>Launch Instant Demo Mode</span>
        </button>
      </div>
    </motion.div>
  );
};

export default Login;
