import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import "./day19.css";

const NinteenHome = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/dayninteen/login");
  };

  return (
    <div className="d19-bg">
      <div className="d19-home-card">
        <div className="d19-home-header">
          <div className="d19-avatar">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="d19-home-title">Hello, {user?.name}! 👋</h1>
            <p className="d19-home-email">{user?.email}</p>
          </div>
        </div>

        <div className="d19-divider" />

        <div className="d19-home-grid">
          <div className="d19-stat-card">
            <span className="d19-stat-icon">🛡️</span>
            <p className="d19-stat-label">Protected Route</p>
            <p className="d19-stat-value">Active</p>
          </div>
          <div className="d19-stat-card">
            <span className="d19-stat-icon">🔑</span>
            <p className="d19-stat-label">Auth Status</p>
            <p className="d19-stat-value">Verified</p>
          </div>
          <div className="d19-stat-card">
            <span className="d19-stat-icon">💾</span>
            <p className="d19-stat-label">Storage</p>
            <p className="d19-stat-value">localStorage</p>
          </div>
          <div className="d19-stat-card">
            <span className="d19-stat-icon">⚛️</span>
            <p className="d19-stat-label">Context API</p>
            <p className="d19-stat-value">Day 19</p>
          </div>
        </div>

        <div className="d19-home-info">
          <h2 className="d19-info-title">🎯 What you learned today</h2>
          <ul className="d19-info-list">
            <li>✅ Auth Context with React Context API</li>
            <li>✅ Login &amp; Register with form validation</li>
            <li>✅ Protected Routes using React Router</li>
            <li>✅ Persisting auth state via localStorage</li>
            <li>✅ Redirecting unauthenticated users</li>
          </ul>
        </div>

        <button onClick={handleLogout} className="d19-logout-btn">
          🚪 Sign Out
        </button>
      </div>
    </div>
  );
};

export default NinteenHome;
