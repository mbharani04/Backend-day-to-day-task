import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import {
  User,
  ShieldCheck,
  Building2,
  Lock,
  ArrowRight,
  Sparkles,
  KeyRound,
  CheckCircle2,
  Info
} from 'lucide-react';

export const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { sendOTP, verifyOTP } = useAuth();
  const { addToast } = useToast();

  const [selectedRole, setSelectedRole] = useState('user'); // user | admin | organization
  const [identifier, setIdentifier] = useState('user@example.com');
  const [otpStep, setOtpStep] = useState(false);
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || null;

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    setOtpStep(false);
    setOtp('');
    // Auto populate demo accounts for ease of testing
    if (role === 'admin') setIdentifier('admin@example.com');
    else if (role === 'organization') setIdentifier('org@example.com');
    else setIdentifier('user@example.com');
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    if (!identifier.trim()) {
      addToast('Please enter your email or mobile number.', 'error');
      return;
    }

    setLoading(true);
    try {
      await sendOTP(identifier, selectedRole);
      setOtpStep(true);
      addToast('OTP sent successfully. Demo OTP is 123456.', 'success');
    } catch (err) {
      addToast(err.message || 'Failed to send OTP.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    if (!otp.trim()) {
      addToast('Please enter the 6-digit OTP code.', 'error');
      return;
    }

    setLoading(true);
    try {
      const res = await verifyOTP(identifier, otp, selectedRole);
      addToast(`Welcome back, ${res.user.name}! Login successful.`, 'success');

      // Redirect logic
      if (from) {
        navigate(from, { replace: true });
      } else {
        if (selectedRole === 'admin') navigate('/admin/dashboard');
        else if (selectedRole === 'organization') navigate('/organization/dashboard');
        else navigate('/user/dashboard');
      }
    } catch (err) {
      addToast(err.message || 'OTP verification failed.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col transition-colors">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-2xl overflow-hidden p-6 sm:p-8 transition-colors">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-400 flex items-center justify-center text-white mx-auto mb-4 shadow-lg shadow-indigo-600/20">
              <KeyRound className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              Role-Based Authentication
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              No password required. Login via secure OTP.
            </p>
          </div>

          {/* Role Selector Tabs */}
          <div className="mb-6">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-2">
              Select Your Role
            </span>
            <div className="grid grid-cols-3 gap-1.5 p-1.5 bg-slate-100 dark:bg-slate-800/80 rounded-2xl">
              {[
                { id: 'user', label: 'User', icon: User },
                { id: 'organization', label: 'Org', icon: Building2 },
                { id: 'admin', label: 'Admin', icon: ShieldCheck }
              ].map((r) => {
                const Icon = r.icon;
                const active = selectedRole === r.id;
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => handleRoleChange(r.id)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                      active
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{r.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Demo Credentials Quick-Fill Alert */}
          <div className="p-3.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/80 mb-6 text-xs text-indigo-900 dark:text-indigo-200 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-indigo-600 dark:text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block text-indigo-950 dark:text-cyan-300">
                Demo Mode Quick Access
              </span>
              <p className="text-[11px] mt-0.5 text-indigo-700 dark:text-indigo-300">
                Email for {selectedRole.toUpperCase()}:{' '}
                <code className="font-mono bg-indigo-100 dark:bg-indigo-900 px-1 py-0.5 rounded font-bold">
                  {selectedRole === 'admin' ? 'admin@example.com' : selectedRole === 'organization' ? 'org@example.com' : 'user@example.com'}
                </code>
              </p>
            </div>
          </div>

          {/* Step 1: Request OTP Form */}
          {!otpStep ? (
            <form onSubmit={handleSendOTP} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Email or Mobile Number
                </label>
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="Enter email (e.g. user@example.com)"
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-indigo-600/25 transition-all flex items-center justify-center gap-2"
              >
                {loading ? 'Sending Demo OTP...' : 'Send OTP'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            /* Step 2: Verify OTP Form */
            <form onSubmit={handleVerifyOTP} className="space-y-4">
              {/* Highlight Demo OTP Code Banner */}
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-center">
                <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 block">
                  Demo OTP: <strong className="text-lg font-mono text-emerald-600 dark:text-emerald-400">123456</strong>
                </span>
                <span className="text-[10px] text-emerald-700 dark:text-emerald-400">Enter code 123456 below to authorize.</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Enter 6-Digit OTP Code
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="123456"
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white text-center font-mono text-xl tracking-widest focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  autoFocus
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-600/25 transition-all flex items-center justify-center gap-2"
              >
                {loading ? 'Verifying...' : 'Verify OTP & Login'}
                <CheckCircle2 className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setOtpStep(false)}
                className="w-full py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors"
              >
                ← Edit email / mobile number
              </button>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};
