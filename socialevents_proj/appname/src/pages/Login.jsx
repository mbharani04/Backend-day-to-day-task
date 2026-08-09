import React, { useState, useEffect } from 'react';
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
  UserPlus,
  LogIn,
  Compass
} from 'lucide-react';

export const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, sendOTP, verifyOTP } = useAuth();
  const { addToast } = useToast();

  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [selectedRole, setSelectedRole] = useState('user'); // 'user' | 'admin' | 'organization'
  const [fullName, setFullName] = useState('');
  const [identifier, setIdentifier] = useState('user@example.com');
  const [otpStep, setOtpStep] = useState(false);
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || null;

  // If already authenticated and visiting login page directly, allow quick move to Landing Page
  useEffect(() => {
    if (isAuthenticated && !from) {
      // User is already logged in
    }
  }, [isAuthenticated, from]);

  const handleModeChange = (mode) => {
    setAuthMode(mode);
    setOtpStep(false);
    setOtp('');
    if (mode === 'register') {
      setIdentifier('');
      setFullName('');
    } else {
      populateDemoIdentifier(selectedRole);
    }
  };

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    setOtpStep(false);
    setOtp('');
    if (authMode === 'login') {
      populateDemoIdentifier(role);
    }
  };

  const populateDemoIdentifier = (role) => {
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

    if (authMode === 'register' && !fullName.trim()) {
      addToast('Please enter your full name or organization name.', 'error');
      return;
    }

    setLoading(true);
    try {
      await sendOTP(identifier, selectedRole, authMode);
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
      const res = await verifyOTP(identifier, otp, selectedRole, authMode, fullName);
      addToast(`Authentication successful! Welcome, ${res.user.name}.`, 'success');

      // Navigate directly to Landing Page ('/') after login/register
      if (from && from !== '/login') {
        navigate(from, { replace: true });
      } else {
        navigate('/', { replace: true });
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
          {/* If already logged in banner */}
          {isAuthenticated ? (
            <div className="text-center space-y-4 py-4">
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">Already Authenticated</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                You are currently logged in as <strong className="text-slate-900 dark:text-white">{user?.name}</strong> ({user?.role}).
              </p>
              <div className="flex flex-col gap-2 pt-2">
                <Link
                  to="/"
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-lg flex items-center justify-center gap-2"
                >
                  <Compass className="w-4 h-4" />
                  Proceed to Landing Page
                </Link>
                <Link
                  to={
                    user?.role === 'admin'
                      ? '/admin/dashboard'
                      : user?.role === 'organization'
                      ? '/organization/dashboard'
                      : '/user/dashboard'
                  }
                  className="w-full py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl"
                >
                  Go to {user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : ''} Dashboard
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="text-center mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center text-white mx-auto mb-4 shadow-lg shadow-indigo-600/20">
                  <KeyRound className="w-7 h-7" />
                </div>
                <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                  {authMode === 'register' ? 'Create New Account' : 'Account Login'}
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Please log in or register first to explore Chennai events & dashboards.
                </p>
              </div>

              {/* Login vs Register Mode Toggle */}
              <div className="flex rounded-2xl bg-slate-100 dark:bg-slate-800 p-1 mb-6">
                <button
                  type="button"
                  onClick={() => handleModeChange('login')}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    authMode === 'login'
                      ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-cyan-400 shadow-md font-extrabold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <LogIn className="w-4 h-4" />
                  Existing Login
                </button>
                <button
                  type="button"
                  onClick={() => handleModeChange('register')}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    authMode === 'register'
                      ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-cyan-400 shadow-md font-extrabold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <UserPlus className="w-4 h-4" />
                  New Register
                </button>
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

              {/* Demo Credentials Quick Access (for Login mode) */}
              {authMode === 'login' && (
                <div className="p-3.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/80 mb-6 text-xs text-indigo-900 dark:text-indigo-200 flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-indigo-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-indigo-950 dark:text-cyan-300">
                      Demo Account Ready
                    </span>
                    <p className="text-[11px] mt-0.5 text-indigo-700 dark:text-indigo-300">
                      Email for {selectedRole.toUpperCase()}:{' '}
                      <code className="font-mono bg-indigo-100 dark:bg-indigo-900 px-1 py-0.5 rounded font-bold">
                        {selectedRole === 'admin' ? 'admin@example.com' : selectedRole === 'organization' ? 'org@example.com' : 'user@example.com'}
                      </code>
                    </p>
                  </div>
                </div>
              )}

              {/* Step 1: Form Details */}
              {!otpStep ? (
                <form onSubmit={handleSendOTP} className="space-y-4">
                  {authMode === 'register' && (
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        {selectedRole === 'organization' ? 'Organization Name *' : 'Full Name *'}
                      </label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder={selectedRole === 'organization' ? 'e.g. Chennai Cultural Club' : 'e.g. Anand Ramesh'}
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Email Address or Mobile Number *
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
                    {loading ? 'Sending Demo OTP...' : authMode === 'register' ? 'Register & Send OTP' : 'Send OTP'}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                /* Step 2: OTP Verification Form */
                <form onSubmit={handleVerifyOTP} className="space-y-4">
                  <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-center">
                    <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 block">
                      Demo OTP Code: <strong className="text-lg font-mono text-emerald-600 dark:text-emerald-400">123456</strong>
                    </span>
                    <span className="text-[10px] text-emerald-700 dark:text-emerald-400">Enter code 123456 to authorize and proceed to landing page.</span>
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
                    {loading ? 'Verifying...' : 'Verify OTP & Enter Landing Page'}
                    <CheckCircle2 className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setOtpStep(false)}
                    className="w-full py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors"
                  >
                    ← Back to details
                  </button>
                </form>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};
