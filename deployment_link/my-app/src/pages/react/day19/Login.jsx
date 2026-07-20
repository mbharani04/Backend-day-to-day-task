import { useState } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "./day19.css";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    const result = login(form);
    setLoading(false);
    if (result.error) return setError(result.error);
    navigate("/dayninteen/home");
  };

  return (
    <div className="d19-bg">
      <div className="d19-card">
        <div className="d19-logo">
          <span className="d19-logo-icon">🔐</span>
        </div>
        <h1 className="d19-title">Welcome Back</h1>
        <p className="d19-subtitle">Sign in to your account</p>

        <form onSubmit={handleSubmit} className="d19-form">
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
              placeholder="••••••••"
              required
            />
          </div>

          {error && <p className="d19-error">{error}</p>}

          <button type="submit" className="d19-btn" disabled={loading}>
            {loading ? (
              <span className="d19-spinner" />
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <p className="d19-switch">
          Don&apos;t have an account?{" "}
          <Link to="/dayninteen/register" className="d19-link">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
