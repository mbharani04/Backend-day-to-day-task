// ─── Login Page — Premium split screen ───────────────────────────────────────
import { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMail, FiLock, FiEye, FiEyeOff, FiZap, FiAlertCircle, FiArrowRight } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login }  = useAuth();
  const navigate   = useNavigate();
  const [form, setForm]             = useState({ email: "", password: "" });
  const [errors, setErrors]         = useState({});
  const [showPwd, setShowPwd]       = useState(false);
  const [loading, setLoading]       = useState(false);
  const [apiError, setApiError]     = useState("");

  const validate = useCallback(() => {
    const e = {};
    if (!form.email.trim())              e.email    = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.password)                  e.password = "Password is required";
    else if (form.password.length < 6)   e.password = "Min. 6 characters";
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
    await new Promise(r => setTimeout(r, 500));
    const res = login(form.email, form.password);
    setLoading(false);
    if (res.success) navigate("/");
    else setApiError(res.error);
  };

  const FEATURES = ["🗞️  Real-time news feed", "🔖  Smart bookmarks", "🌙  Beautiful dark mode", "⚡  Infinite scroll"];

  return (
    <div className="min-h-screen flex" style={{ background: "var(--bg-base)" }}>

      {/* Left panel */}
      <div className="hidden lg:flex lg:w-5/12 flex-col items-start justify-between p-12 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(34,211,238,0.06) 100%)", borderRight: "1px solid var(--border)" }}>

        {/* Background blobs */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" style={{ animation: "float 8s ease-in-out infinite" }} />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-cyan-500/8 rounded-full blur-3xl" style={{ animation: "float 10s ease-in-out infinite 2s" }} />

        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-2.5">
          <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-xl flex items-center justify-center">
            <FiZap className="text-white text-sm" />
          </div>
          <span className="text-xl font-bold text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
            Truth<span className="text-gradient">Feed</span>
          </span>
        </div>

        {/* Main content */}
        <div className="relative z-10 space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2 leading-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
              Stay ahead<br />of the news.
            </h1>
            <p className="text-[--text-secondary] text-base leading-relaxed">
              Real-time headlines from trusted sources, personalised just for you.
            </p>
          </div>
          <div className="space-y-2.5">
            {FEATURES.map(f => (
              <div key={f} className="flex items-center gap-3 text-[--text-secondary] text-sm">
                <span>{f}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="relative z-10 text-[--text-muted] text-xs">© 2026 TruthFeed</p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-16">
        <div className="w-full max-w-sm anim-slide-r">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-10">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <FiZap className="text-white text-sm" />
            </div>
            <span className="text-lg font-bold text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
              Truth<span className="text-gradient">Feed</span>
            </span>
          </div>

          <h2 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "'Syne', sans-serif" }}>Welcome back</h2>
          <p className="text-[--text-muted] text-sm mb-7">Sign in to your account</p>

          {/* API error */}
          {apiError && (
            <div className="flex items-center gap-2.5 bg-rose-500/10 border border-rose-500/25 text-rose-400 rounded-xl px-4 py-3 mb-5 text-sm anim-scale-in">
              <FiAlertCircle className="flex-shrink-0 text-base" />
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-[--text-muted] uppercase tracking-wider mb-1.5">Email</label>
              <div className={`flex items-center gap-2.5 rounded-xl px-3.5 py-3 border transition-all ${
                errors.email ? "border-rose-500/50 bg-rose-500/5" : "border-[--border] bg-[--bg-surface] focus-within:border-indigo-500/50 focus-within:shadow-[0_0_0_3px_rgba(99,102,241,0.08)]"
              }`}>
                <FiMail className="text-[--text-muted] text-sm flex-shrink-0" />
                <input
                  id="login-email" name="email" type="email"
                  value={form.email} onChange={handleChange}
                  placeholder="you@example.com"
                  className="flex-1 bg-transparent text-sm text-[--text-primary] placeholder-[--text-muted] outline-none"
                  autoComplete="email"
                />
              </div>
              {errors.email && <p className="text-rose-400 text-xs mt-1.5 flex items-center gap-1"><FiAlertCircle className="text-[10px]" /> {errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-[--text-muted] uppercase tracking-wider mb-1.5">Password</label>
              <div className={`flex items-center gap-2.5 rounded-xl px-3.5 py-3 border transition-all ${
                errors.password ? "border-rose-500/50 bg-rose-500/5" : "border-[--border] bg-[--bg-surface] focus-within:border-indigo-500/50 focus-within:shadow-[0_0_0_3px_rgba(99,102,241,0.08)]"
              }`}>
                <FiLock className="text-[--text-muted] text-sm flex-shrink-0" />
                <input
                  id="login-password" name="password"
                  type={showPwd ? "text" : "password"}
                  value={form.password} onChange={handleChange}
                  placeholder="••••••••"
                  className="flex-1 bg-transparent text-sm text-[--text-primary] placeholder-[--text-muted] outline-none"
                  autoComplete="current-password"
                />
                <button type="button" onClick={() => setShowPwd(p => !p)} className="text-[--text-muted] hover:text-white transition-colors">
                  {showPwd ? <FiEyeOff className="text-sm" /> : <FiEye className="text-sm" />}
                </button>
              </div>
              {errors.password && <p className="text-rose-400 text-xs mt-1.5 flex items-center gap-1"><FiAlertCircle className="text-[10px]" /> {errors.password}</p>}
            </div>

            {/* Submit */}
            <button
              id="login-submit" type="submit" disabled={loading}
              className="btn-primary w-full justify-center py-3 text-sm mt-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <><span className="w-4 h-4 border-2 border-white/25 border-t-white rounded-full" style={{ animation: "spin 0.7s linear infinite" }} /> Signing in...</>
              ) : (
                <>Sign In <FiArrowRight className="text-xs" /></>
              )}
            </button>
          </form>

          <p className="text-center text-[--text-muted] text-sm mt-6">
            No account?{" "}
            <Link to="/register" className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">Create one free →</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
