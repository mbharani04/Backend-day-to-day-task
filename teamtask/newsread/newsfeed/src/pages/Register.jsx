// ─── Register Page ────────────────────────────────────────────────────────────
// Beautiful registration form with validation, duplicate email check,
// and localStorage persistence.

import { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiUser,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiZap,
  FiAlertCircle,
  FiCheckCircle,
} from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

// Password strength checker
const getPasswordStrength = (pwd) => {
  if (!pwd) return { score: 0, label: "", color: "" };
  let score = 0;
  if (pwd.length >= 8) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;

  const labels = ["", "Weak", "Fair", "Good", "Strong"];
  const colors = ["", "bg-rose-500", "bg-amber-500", "bg-yellow-400", "bg-green-500"];
  return { score, label: labels[score], color: colors[score] };
};

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ fullName: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [success, setSuccess] = useState(false);

  const strength = getPasswordStrength(form.password);

  // ── Validation ────────────────────────────────────────────────────────────
  const validate = useCallback(() => {
    const errs = {};
    if (!form.fullName.trim()) {
      errs.fullName = "Full name is required.";
    } else if (form.fullName.trim().length < 2) {
      errs.fullName = "Name must be at least 2 characters.";
    }

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
    setApiError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));

    const result = register(form);
    setLoading(false);

    if (result.success) {
      setSuccess(true);
      setTimeout(() => navigate("/login"), 2000);
    } else {
      setApiError(result.error);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="text-center p-8">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiCheckCircle className="text-green-400 text-4xl" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Account Created!</h2>
          <p className="text-slate-400">Redirecting you to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-slate-950 overflow-hidden">
      {/* ── Left Decorative Panel ── */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-cyan-900 via-slate-900 to-violet-900 items-center justify-center p-12 overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-cyan-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-56 h-56 bg-violet-500/20 rounded-full blur-3xl animate-pulse [animation-delay:1.5s]"></div>

        <div className="relative z-10 text-center max-w-sm">
          <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-violet-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <FiZap className="text-white text-2xl" />
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-4">
            Join <span className="text-cyan-400">TruthFeed</span>
          </h1>
          <p className="text-slate-300 text-lg mb-4">
            Stay Updated. Stay Informed. Stay Ahead.
          </p>
          <p className="text-slate-400 text-sm leading-relaxed">
            Create your free account and get access to real news from
            thousands of trusted sources worldwide.
          </p>

          <div className="mt-8 space-y-3 text-left">
            {[
              "✦ Real-time news from trusted APIs",
              "✦ Personalised bookmarks & likes",
              "✦ Infinite scroll news feed",
              "✦ Dark mode & theme toggle",
            ].map((f) => (
              <p key={f} className="text-slate-300 text-sm">{f}</p>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right Panel (form) ── */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 overflow-y-auto">
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

          <h2 className="text-3xl font-extrabold text-white mb-2">Create account</h2>
          <p className="text-slate-400 mb-8">Join TruthFeed for free today</p>

          {apiError && (
            <div className="flex items-center gap-3 bg-rose-500/10 border border-rose-500/30 text-rose-400 rounded-xl px-4 py-3 mb-6 text-sm">
              <FiAlertCircle className="flex-shrink-0" />
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* Full Name */}
            <div>
              <label htmlFor="reg-fullName" className="block text-sm font-medium text-slate-300 mb-2">
                Full Name
              </label>
              <div className={`flex items-center gap-3 bg-slate-800/60 border rounded-xl px-4 py-3 transition-all
                ${errors.fullName ? "border-rose-500/60" : "border-slate-700/60 focus-within:border-violet-500/70 focus-within:ring-2 focus-within:ring-violet-500/20"}`}>
                <FiUser className="text-slate-400 flex-shrink-0" />
                <input
                  id="reg-fullName"
                  name="fullName"
                  type="text"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="flex-1 bg-transparent text-white placeholder-slate-500 text-sm outline-none"
                  autoComplete="name"
                />
              </div>
              {errors.fullName && (
                <p className="text-rose-400 text-xs mt-1.5 flex items-center gap-1">
                  <FiAlertCircle className="text-xs" /> {errors.fullName}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="reg-email" className="block text-sm font-medium text-slate-300 mb-2">
                Email Address
              </label>
              <div className={`flex items-center gap-3 bg-slate-800/60 border rounded-xl px-4 py-3 transition-all
                ${errors.email ? "border-rose-500/60" : "border-slate-700/60 focus-within:border-violet-500/70 focus-within:ring-2 focus-within:ring-violet-500/20"}`}>
                <FiMail className="text-slate-400 flex-shrink-0" />
                <input
                  id="reg-email"
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
              <label htmlFor="reg-password" className="block text-sm font-medium text-slate-300 mb-2">
                Password
              </label>
              <div className={`flex items-center gap-3 bg-slate-800/60 border rounded-xl px-4 py-3 transition-all
                ${errors.password ? "border-rose-500/60" : "border-slate-700/60 focus-within:border-violet-500/70 focus-within:ring-2 focus-within:ring-violet-500/20"}`}>
                <FiLock className="text-slate-400 flex-shrink-0" />
                <input
                  id="reg-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Min. 6 characters"
                  className="flex-1 bg-transparent text-white placeholder-slate-500 text-sm outline-none"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {errors.password && (
                <p className="text-rose-400 text-xs mt-1.5 flex items-center gap-1">
                  <FiAlertCircle className="text-xs" /> {errors.password}
                </p>
              )}

              {/* Password strength bar */}
              {form.password && (
                <div className="mt-2">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-all ${
                          i <= strength.score ? strength.color : "bg-slate-700"
                        }`}
                      ></div>
                    ))}
                  </div>
                  {strength.label && (
                    <p className="text-xs text-slate-500 mt-1">
                      Strength: <span className="text-white">{strength.label}</span>
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Submit */}
            <button
              id="register-submit"
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyan-600 to-violet-600 hover:from-cyan-500 hover:to-violet-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-violet-500/30 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <p className="text-center text-slate-400 text-sm mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-violet-400 hover:text-violet-300 font-semibold transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;