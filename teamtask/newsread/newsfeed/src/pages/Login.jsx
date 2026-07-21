// ─── Login Page ───────────────────────────────────────────────────────────────
// Beautiful glassmorphism login form with validation and localStorage auth.

import { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMail, FiLock, FiEye, FiEyeOff, FiZap, FiAlertCircle } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  // ── Form State ────────────────────────────────────────────────────────────
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  // ── Validation ────────────────────────────────────────────────────────────
  const validate = useCallback(() => {
    const errs = {};
    if (!form.email.trim()) {
      errs.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errs.email = "Please enter a valid email.";
    }
    if (!form.password) {
      errs.password = "Password is required.";
    } else if (form.password.length < 6) {
      errs.password = "Password must be at least 6 characters.";
    }
    return errs;
  }, [form]);

  // ── Handle field change ───────────────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    // Clear field error on type
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
    setApiError("");
  };

  // ── Submit ────────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setLoading(true);
    // Simulate slight delay for UX
    await new Promise((res) => setTimeout(res, 500));

    const result = login(form.email, form.password);
    setLoading(false);

    if (result.success) {
      navigate("/");
    } else {
      setApiError(result.error);
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-950 overflow-hidden">
      {/* ── Left Panel (decorative) ── */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-violet-900 via-slate-900 to-cyan-900 items-center justify-center p-12 overflow-hidden">
        {/* Animated blobs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-violet-600/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl animate-pulse [animation-delay:1s]"></div>

        <div className="relative z-10 text-center max-w-sm">
          <div className="w-16 h-16 bg-gradient-to-br from-violet-600 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-violet-500/50">
            <FiZap className="text-white text-2xl" />
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-4 leading-tight">
            Truth<span className="text-violet-400">Feed</span>
          </h1>
          <p className="text-slate-300 text-lg font-medium mb-2">
            Stay Updated. Stay Informed.
          </p>
          <p className="text-slate-400 text-sm">
            Real news from trusted sources. Personalised. Fast. Beautiful.
          </p>

          {/* Feature badges */}
          <div className="flex flex-wrap gap-2 justify-center mt-8">
            {["Real News API", "Infinite Scroll", "Dark Mode", "Bookmarks"].map((f) => (
              <span
                key={f}
                className="bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs px-3 py-1.5 rounded-full"
              >
                {f}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right Panel (form) ── */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-cyan-500 rounded-xl flex items-center justify-center">
              <FiZap className="text-white text-sm" />
            </div>
            <span className="text-white font-extrabold text-xl">
              Truth<span className="text-violet-400">Feed</span>
            </span>
          </div>

          <h2 className="text-3xl font-extrabold text-white mb-2">Welcome back</h2>
          <p className="text-slate-400 mb-8">Sign in to your account to continue</p>

          {/* API Error */}
          {apiError && (
            <div className="flex items-center gap-3 bg-rose-500/10 border border-rose-500/30 text-rose-400 rounded-xl px-4 py-3 mb-6 text-sm">
              <FiAlertCircle className="flex-shrink-0" />
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* Email */}
            <div>
              <label htmlFor="login-email" className="block text-sm font-medium text-slate-300 mb-2">
                Email Address
              </label>
              <div className={`flex items-center gap-3 bg-slate-800/60 border rounded-xl px-4 py-3 transition-all
                ${errors.email ? "border-rose-500/60" : "border-slate-700/60 focus-within:border-violet-500/70 focus-within:ring-2 focus-within:ring-violet-500/20"}`}>
                <FiMail className="text-slate-400 flex-shrink-0" />
                <input
                  id="login-email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="flex-1 bg-transparent text-white placeholder-slate-500 text-sm outline-none"
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
              <label htmlFor="login-password" className="block text-sm font-medium text-slate-300 mb-2">
                Password
              </label>
              <div className={`flex items-center gap-3 bg-slate-800/60 border rounded-xl px-4 py-3 transition-all
                ${errors.password ? "border-rose-500/60" : "border-slate-700/60 focus-within:border-violet-500/70 focus-within:ring-2 focus-within:ring-violet-500/20"}`}>
                <FiLock className="text-slate-400 flex-shrink-0" />
                <input
                  id="login-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="flex-1 bg-transparent text-white placeholder-slate-500 text-sm outline-none"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="text-slate-400 hover:text-white transition-colors"
                  aria-label="Toggle password visibility"
                >
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
              id="login-submit"
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-violet-500/30 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <p className="text-center text-slate-400 text-sm mt-6">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="text-violet-400 hover:text-violet-300 font-semibold transition-colors"
            >
              Create one
            </Link>
          </p>

          {/* Demo hint */}
          <div className="mt-6 p-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-center">
            <p className="text-slate-500 text-xs">
              New here? <Link to="/register" className="text-violet-400 hover:underline">Register first</Link> to create an account.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
