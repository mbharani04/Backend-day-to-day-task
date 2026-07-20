import { useState } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "./day19.css";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirm)
      return setError("Passwords do not match.");
    if (form.password.length < 6)
      return setError("Password must be at least 6 characters.");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    const result = register(form);
    setLoading(false);
    if (result.error) return setError(result.error);
    navigate("/dayninteen/home");
  };

  return (
    <div className="d19-bg">
      <div className="d19-card">
        <div className="d19-logo">
          <span className="d19-logo-icon">✨</span>
        </div>
        <h1 className="d19-title">Create Account</h1>
        <p className="d19-subtitle">Join us today — it&apos;s free!</p>

        <form onSubmit={handleSubmit} className="d19-form">
          <div className="d19-field">
            <label className="d19-label">Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="d19-input"
              placeholder="John Doe"
              required
            />
          </div>

          <div className="d19-field">
            <label className="d19-label">Email Address</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="d19-input"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="d19-field">
            <label className="d19-label">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="d19-input"
              placeholder="Min. 6 characters"
              required
            />
          </div>

          <div className="d19-field">
            <label className="d19-label">Confirm Password</label>
            <input
              type="password"
              name="confirm"
              value={form.confirm}
              onChange={handleChange}
              className="d19-input"
              placeholder="Re-enter password"
              required
            />
          </div>

          {error && <p className="d19-error">{error}</p>}

          <button type="submit" className="d19-btn" disabled={loading}>
            {loading ? <span className="d19-spinner" /> : "Create Account"}
          </button>
        </form>

        <p className="d19-switch">
          Already have an account?{" "}
          <Link to="/dayninteen/login" className="d19-link">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
