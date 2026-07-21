// ─── Login Page ───────────────────────────────────────────────────────────────
// Premium animated split-screen login with glassmorphism and floating orbs.

import { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMail, FiLock, FiEye, FiEyeOff, FiZap, FiAlertCircle, FiArrowRight } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login }  = useAuth();
  const navigate   = useNavigate();
  const [form, setForm]               = useState({ email: "", password: "" });
  const [errors, setErrors]           = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading]         = useState(false);
  const [apiError, setApiError]       = useState("");

  const validate = useCallback(() => {
    const e = {};
    if (!form.email.trim())              e.email    = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email.";
    if (!form.password)                  e.password = "Password is required.";
    else if (form.password.length < 6)   e.password = "Min. 6 characters.";
    return e;
  }, [form]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: value }));
    if (errors[name]) setErrors(p => ({ ...p, [name]: "" }));
    setApiError("");
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    const res = login(form.email, form.password);
    setLoading(false);
    if (res.success) navigate("/");
    else setApiError(res.error);
  };

  return (
    <div className="min-h-screen flex overflow-hidden" style={{background:"#020617"}}>

      {/* ── Left panel ── */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col items-center justify-center p-16 overflow-hidden"
        style={{background:"linear-gradient(135deg,rgba(124,58,237,0.2)0%,rgba(6,182,212,0.08)100%)"}}>

        {/* Animated orbs */}
        <div className="absolute top-1/4 left-1/5 w-80 h-80 bg-violet-600/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/5 w-64 h-64 bg-cyan-500/15 rounded-full blur-3xl animate-float" style={{animationDelay:"2s"}} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-violet-500/10 rounded-full blur-2xl animate-slow-spin" />

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5"
          style={{backgroundImage:"linear-gradient(rgba(124,58,237,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(124,58,237,0.5) 1px,transparent 1px)",backgroundSize:"40px 40px"}} />

        <div className="relative z-10 text-center max-w-sm animate-fade-in-up">
          <div className="w-20 h-20 bg-gradient-to-br from-violet-600 to-cyan-500 rounded-3xl flex items-center justify-center mx-auto mb-8 animate-glow">
            <FiZap className="text-white text-3xl" />
          </div>
          <h1 className="text-5xl font-extrabold text-white mb-4" style={{fontFamily:"'Syne',sans-serif"}}>
            Truth<span className="gradient-text">Feed</span>
          </h1>
          <p className="text-slate-300 text-xl font-medium mb-3">Stay Updated.</p>
          <p className="text-slate-300 text-xl font-medium mb-3">Stay Informed.</p>
          <p className="text-violet-300 text-xl font-bold">Stay Ahead.</p>

          <div className="mt-10 grid grid-cols-2 gap-3">
            {["🔴 Live News Feed","🔖 Smart Bookmarks","🌙 Dark Mode","⚡ Infinite Scroll"].map(f => (
              <div key={f} className="glass text-white text-sm px-4 py-3 rounded-2xl text-left font-medium">
                {f}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right panel (form) ── */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-16">
        <div className="w-full max-w-sm animate-slide-right">

          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-10">
            <div className="w-9 h-9 bg-gradient-to-br from-violet-600 to-cyan-500 rounded-xl flex items-center justify-center animate-glow">
              <FiZap className="text-white text-sm" />
            </div>
            <span className="text-white font-bold text-xl" style={{fontFamily:"'Syne',sans-serif"}}>
              Truth<span className="gradient-text">Feed</span>
            </span>
          </div>

          <h2 className="text-3xl font-extrabold text-white mb-1" style={{fontFamily:"'Syne',sans-serif"}}>
            Welcome back
          </h2>
          <p className="text-slate-500 mb-8 text-sm">Sign in to your account</p>

          {/* Error */}
          {apiError && (
            <div className="flex items-center gap-3 bg-rose-500/10 border border-rose-500/30 text-rose-400 rounded-2xl px-4 py-3 mb-6 text-sm animate-bounce-in">
              <FiAlertCircle className="flex-shrink-0" />
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <div className={`flex items-center gap-3 rounded-2xl px-4 py-3.5 transition-all duration-300 border ${
                errors.email
                  ? "bg-rose-500/5 border-rose-500/50"
                  : "bg-slate-800/60 border-slate-700/50 focus-within:border-violet-500/60 focus-within:bg-slate-800/80 focus-within:shadow-lg focus-within:shadow-violet-500/10"
              }`}>
                <FiMail className="text-slate-500 flex-shrink-0" />
                <input
                  id="login-email" name="email" type="email"
                  value={form.email} onChange={handleChange}
                  placeholder="you@example.com"
                  className="flex-1 bg-transparent text-white placeholder-slate-600 text-sm outline-none"
                  autoComplete="email"
                />
              </div>
              {errors.email && (
                <p className="text-rose-400 text-xs mt-1.5 flex items-center gap-1">
                  <FiAlertCircle className="text-xs" /> {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className={`flex items-center gap-3 rounded-2xl px-4 py-3.5 transition-all duration-300 border ${
                errors.password
                  ? "bg-rose-500/5 border-rose-500/50"
                  : "bg-slate-800/60 border-slate-700/50 focus-within:border-violet-500/60 focus-within:bg-slate-800/80 focus-within:shadow-lg focus-within:shadow-violet-500/10"
              }`}>
                <FiLock className="text-slate-500 flex-shrink-0" />
                <input
                  id="login-password" name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password} onChange={handleChange}
                  placeholder="••••••••"
                  className="flex-1 bg-transparent text-white placeholder-slate-600 text-sm outline-none"
                  autoComplete="current-password"
                />
                <button type="button" onClick={() => setShowPassword(p => !p)}
                  className="text-slate-500 hover:text-slate-200 transition-colors">
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {errors.password && (
                <p className="text-rose-400 text-xs mt-1.5 flex items-center gap-1">
                  <FiAlertCircle className="text-xs" /> {errors.password}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              id="login-submit" type="submit" disabled={loading}
              className="btn-glow group w-full flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-bold py-3.5 rounded-2xl mt-2 shadow-xl shadow-violet-500/25 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-slate-500 text-sm mt-6">
            No account?{" "}
            <Link to="/register" className="text-violet-400 hover:text-violet-300 font-semibold transition-colors">
              Create one free →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
