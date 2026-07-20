/**
 * Day 20 — Custom Hooks Showcase
 * 5 Custom hooks: useCounter, useToggle, useFetch, useLocalStorage, useSearch
 */

import "./day20.css";
import useCounter from "./hooks/useCounter";
import useToggle from "./hooks/useToggle";
import useFetch from "./hooks/useFetch";
import useLocalStorage from "./hooks/useLocalStorage";
import useSearch from "./hooks/useSearch";
import { useState } from "react";

// =============================================
// HOOK 1 DEMO — useCounter (two independent components)
// =============================================
const avatarColors = [
  "linear-gradient(135deg,#8b5cf6,#6d28d9)",
  "linear-gradient(135deg,#3b82f6,#1d4ed8)",
  "linear-gradient(135deg,#10b981,#059669)",
  "linear-gradient(135deg,#f59e0b,#d97706)",
  "linear-gradient(135deg,#ec4899,#db2777)",
];

const CounterWidget = ({ label, initialValue = 0, step = 1, min = 0, max = 100, color }) => {
  const { count, increment, decrement, reset } = useCounter(initialValue, step, min, max);
  return (
    <div className="d20-card">
      <p className="d20-card-title">
        <span style={{ fontSize: "1.1rem" }}>🔢</span> {label}
        <span className="d20-section-hook" style={{ background: "rgba(16,185,129,0.1)", color: "#34d399", borderColor: "rgba(16,185,129,0.2)" }}>
          useCounter
        </span>
      </p>
      <div className="d20-counter-display" style={{ background: color, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
        {count}
      </div>
      <p className="d20-counter-label">Range: {min} – {max} &nbsp;|&nbsp; Step: {step}</p>
      <div className="d20-counter-btns">
        <button className="d20-btn-icon d20-btn-dec" onClick={decrement} title="Decrement">−</button>
        <button className="d20-btn-icon d20-btn-reset d20-btn-reset" onClick={reset} title="Reset">
          ↺ Reset
        </button>
        <button className="d20-btn-icon d20-btn-inc" onClick={increment} title="Increment">+</button>
      </div>
    </div>
  );
};

// =============================================
// HOOK 2 DEMO — useToggle (Show/Hide Password)
// =============================================
const LoginFormDemo = () => {
  const { value: showPassword, toggle: togglePassword } = useToggle(false);
  const { value: showConfirm, toggle: toggleConfirm } = useToggle(false);
  const [form, setForm] = useState({ email: "", password: "", confirm: "" });

  return (
    <div className="d20-card">
      <p className="d20-card-title">
        <span>🔐</span> Login Form — Toggle Password
        <span className="d20-section-hook">useToggle</span>
      </p>
      <div className="d20-login-form">
        <div>
          <p className="d20-field-label">Email</p>
          <div className="d20-input-wrap">
            <input
              type="email"
              className="d20-input"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
            />
          </div>
        </div>

        <div>
          <p className="d20-field-label">
            Password
            <span className="d20-toggle-badge">{showPassword ? "visible" : "hidden"}</span>
          </p>
          <div className="d20-input-wrap">
            <input
              type={showPassword ? "text" : "password"}
              className="d20-input"
              placeholder="Enter password"
              value={form.password}
              onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
            />
            <button className="d20-eye-btn" onClick={togglePassword} type="button" title="Toggle password">
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
        </div>

        <div>
          <p className="d20-field-label">
            Confirm Password
            <span className="d20-toggle-badge">{showConfirm ? "visible" : "hidden"}</span>
          </p>
          <div className="d20-input-wrap">
            <input
              type={showConfirm ? "text" : "password"}
              className="d20-input"
              placeholder="Re-enter password"
              value={form.confirm}
              onChange={(e) => setForm((p) => ({ ...p, confirm: e.target.value }))}
            />
            <button className="d20-eye-btn" onClick={toggleConfirm} type="button" title="Toggle confirm">
              {showConfirm ? "🙈" : "👁️"}
            </button>
          </div>
        </div>

        <button className="d20-submit-btn" type="button">Sign In →</button>
      </div>
    </div>
  );
};

// =============================================
// HOOK 3 DEMO — useFetch (Products)
// =============================================
const ProductFetchDemo = () => {
  const { data, loading, error, refetch } = useFetch("https://fakestoreapi.com/products?limit=8");

  return (
    <div className="d20-card">
      <div className="d20-fetch-header">
        <p className="d20-card-title" style={{ margin: 0 }}>
          <span>🛒</span> Products — API Fetch
          <span className="d20-section-hook" style={{ background: "rgba(6,182,212,0.1)", color: "#67e8f9", borderColor: "rgba(6,182,212,0.2)" }}>useFetch</span>
        </p>
        <button className="d20-refetch-btn" onClick={refetch} disabled={loading}>
          {loading ? "Loading…" : "⟳ Refetch"}
        </button>
      </div>

      {loading && (
        <div className="d20-loading-grid">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="d20-skeleton" />
          ))}
        </div>
      )}

      {error && (
        <div className="d20-error-box">
          <span>⚠️</span>
          <span>
            <strong>Fetch Error:</strong> {error}. Make sure you have internet access.
          </span>
        </div>
      )}

      {!loading && !error && data && (
        <div className="d20-product-grid">
          {data.map((p) => (
            <div key={p.id} className="d20-product-card">
              <img src={p.image} alt={p.title} className="d20-product-img" loading="lazy" />
              <p className="d20-product-name">{p.title}</p>
              <p className="d20-product-price">${p.price.toFixed(2)}</p>
              <p className="d20-product-cat">{p.category}</p>
              <p className="d20-product-rating">
                {"★".repeat(Math.round(p.rating?.rate ?? 4))}
                {"☆".repeat(5 - Math.round(p.rating?.rate ?? 4))}
                <span style={{ color: "rgba(255,255,255,0.35)", marginLeft: "0.3rem" }}>
                  ({p.rating?.count ?? 0})
                </span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// =============================================
// HOOK 4 DEMO — useLocalStorage
// =============================================
const LocalStorageDemo = () => {
  const [savedName, setSavedName, clearName] = useLocalStorage("d20_student_name", "");
  const [inputVal, setInputVal] = useState(savedName);

  const handleSave = () => {
    if (inputVal.trim()) setSavedName(inputVal.trim());
  };

  return (
    <div className="d20-card">
      <p className="d20-card-title">
        <span>💾</span> Student Name — LocalStorage
        <span className="d20-section-hook" style={{ background: "rgba(59,130,246,0.1)", color: "#93c5fd", borderColor: "rgba(59,130,246,0.2)" }}>useLocalStorage</span>
      </p>
      <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.45)", marginBottom: "1rem", marginTop: 0 }}>
        Type a name and save it. Refresh the page — the name persists! 🔄
      </p>
      <div className="d20-ls-form">
        <input
          type="text"
          className="d20-ls-input"
          placeholder="Enter student name…"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSave()}
        />
        <button className="d20-ls-save-btn" onClick={handleSave}>
          💾 Save
        </button>
        <button className="d20-ls-clear-btn" onClick={() => { clearName(); setInputVal(""); }}>
          ✕ Clear
        </button>
      </div>

      <div className="d20-ls-display">
        <span className="d20-ls-icon">🎓</span>
        <div>
          {savedName ? (
            <>
              <div className="d20-ls-value">{savedName}</div>
              <div className="d20-ls-hint">Saved in localStorage → key: <code style={{ color: "#93c5fd", fontFamily: "Fira Code, monospace" }}>d20_student_name</code></div>
            </>
          ) : (
            <div className="d20-ls-empty">No name saved yet. Try saving one!</div>
          )}
        </div>
      </div>
    </div>
  );
};

// =============================================
// HOOK 5 DEMO — useSearch (Students)
// =============================================
const STUDENTS = [
  { id: 1, name: "Aarav Sharma", roll: "CS001", branch: "Computer Science", grade: "A+", gpa: 9.8 },
  { id: 2, name: "Priya Patel", roll: "CS002", branch: "Computer Science", grade: "A", gpa: 9.3 },
  { id: 3, name: "Rohan Mehta", roll: "EE001", branch: "Electrical Eng.", grade: "B+", gpa: 8.7 },
  { id: 4, name: "Sneha Reddy", roll: "ME001", branch: "Mechanical Eng.", grade: "A", gpa: 9.1 },
  { id: 5, name: "Kiran Kumar", roll: "CS003", branch: "Computer Science", grade: "B", gpa: 8.2 },
  { id: 6, name: "Divya Nair", roll: "IT001", branch: "Info. Technology", grade: "A+", gpa: 9.6 },
  { id: 7, name: "Arjun Singh", roll: "EE002", branch: "Electrical Eng.", grade: "C+", gpa: 7.5 },
  { id: 8, name: "Ananya Verma", roll: "CS004", branch: "Computer Science", grade: "A", gpa: 9.0 },
  { id: 9, name: "Vijay Krishnan", roll: "CE001", branch: "Civil Eng.", grade: "B+", gpa: 8.5 },
  { id: 10, name: "Meera Iyer", roll: "IT002", branch: "Info. Technology", grade: "A+", gpa: 9.7 },
  { id: 11, name: "Rahul Gupta", roll: "CS005", branch: "Computer Science", grade: "B", gpa: 8.0 },
  { id: 12, name: "Lakshmi Das", roll: "ME002", branch: "Mechanical Eng.", grade: "A", gpa: 9.2 },
];

const gradeColor = (g) => {
  if (g.startsWith("A")) return { bg: "rgba(16,185,129,0.15)", color: "#34d399", border: "rgba(16,185,129,0.25)" };
  if (g.startsWith("B")) return { bg: "rgba(59,130,246,0.15)", color: "#93c5fd", border: "rgba(59,130,246,0.25)" };
  return { bg: "rgba(245,158,11,0.15)", color: "#fbbf24", border: "rgba(245,158,11,0.25)" };
};

const StudentSearchDemo = () => {
  const { query, filtered, handleChange, clearSearch } = useSearch(STUDENTS, ["name", "roll", "branch", "grade"]);

  return (
    <div className="d20-card">
      <p className="d20-card-title">
        <span>🔍</span> Student Search — Filter Records
        <span className="d20-section-hook" style={{ background: "rgba(245,158,11,0.1)", color: "#fbbf24", borderColor: "rgba(245,158,11,0.2)" }}>useSearch</span>
      </p>

      <div className="d20-search-bar-wrap">
        <span className="d20-search-icon">🔍</span>
        <input
          type="text"
          className="d20-search-input"
          placeholder="Search by name, roll no, branch, grade…"
          value={query}
          onChange={handleChange}
        />
        {query && (
          <button className="d20-search-clear" onClick={clearSearch}>✕</button>
        )}
      </div>

      <p className="d20-search-meta">
        Showing <strong>{filtered.length}</strong> of {STUDENTS.length} students
        {query && <> matching &quot;<strong>{query}</strong>&quot;</>}
      </p>

      <div className="d20-student-list">
        {filtered.length > 0 ? (
          filtered.map((s, i) => {
            const gc = gradeColor(s.grade);
            return (
              <div key={s.id} className="d20-student-row">
                <div
                  className="d20-student-avatar"
                  style={{ background: avatarColors[i % avatarColors.length] }}
                >
                  {s.name.charAt(0)}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p className="d20-student-name">{s.name}</p>
                  <p className="d20-student-info">{s.roll} • {s.branch} • GPA: {s.gpa}</p>
                </div>
                <span
                  className="d20-student-grade"
                  style={{ background: gc.bg, color: gc.color, border: `1px solid ${gc.border}` }}
                >
                  {s.grade}
                </span>
              </div>
            );
          })
        ) : (
          <div className="d20-no-results">
            <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🔎</div>
            No students found for &quot;{query}&quot;
          </div>
        )}
      </div>
    </div>
  );
};

// =============================================
// MAIN PAGE COMPONENT
// =============================================
const Daytwenty = () => {
  return (
    <div className="d20-page">
      {/* Hero */}
      <div className="d20-hero">
        <div className="d20-hero-badge">
          <span className="d20-hero-badge-dot" />
          Day 20 — React Custom Hooks
        </div>
        <h1>Custom Hooks<br />Mastery 🪝</h1>
        <p>
          Five production-ready custom hooks — each encapsulating reusable
          stateful logic, demonstrated with independent, interactive components.
        </p>
      </div>

      {/* HOOK 1 — useCounter */}
      <div className="d20-section">
        <div className="d20-section-header">
          <div className="d20-section-num">01</div>
          <h2 className="d20-section-title">useCounter — Increment · Decrement · Reset</h2>
          <span className="d20-section-hook">useCounter.js</span>
        </div>
        <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.4)", marginBottom: "1rem", marginTop: 0, maxWidth: "700px" }}>
          Two completely independent counter instances — each has its own state. Changing one does <em>not</em> affect the other.
        </p>
        <div className="d20-grid-2">
          <CounterWidget
            label="Shopping Cart Items"
            initialValue={0}
            step={1}
            min={0}
            max={20}
            color="linear-gradient(135deg,#c4b5fd,#818cf8)"
          />
          <CounterWidget
            label="Temperature Sensor (°C)"
            initialValue={22}
            step={2}
            min={-20}
            max={60}
            color="linear-gradient(135deg,#f97316,#ef4444)"
          />
        </div>
      </div>

      <div className="d20-divider" />

      {/* HOOK 2 — useToggle */}
      <div className="d20-section">
        <div className="d20-section-header">
          <div className="d20-section-num" style={{ background: "linear-gradient(135deg,#ec4899,#be185d)" }}>02</div>
          <h2 className="d20-section-title">useToggle — Show / Hide Password</h2>
          <span className="d20-section-hook">useToggle.js</span>
        </div>
        <LoginFormDemo />
      </div>

      <div className="d20-divider" />

      {/* HOOK 3 — useFetch */}
      <div className="d20-section">
        <div className="d20-section-header">
          <div className="d20-section-num" style={{ background: "linear-gradient(135deg,#06b6d4,#0284c7)" }}>03</div>
          <h2 className="d20-section-title">useFetch — Products from API</h2>
          <span className="d20-section-hook">useFetch.js</span>
        </div>
        <ProductFetchDemo />
      </div>

      <div className="d20-divider" />

      {/* HOOK 4 — useLocalStorage */}
      <div className="d20-section">
        <div className="d20-section-header">
          <div className="d20-section-num" style={{ background: "linear-gradient(135deg,#3b82f6,#1d4ed8)" }}>04</div>
          <h2 className="d20-section-title">useLocalStorage — Persist Student Name</h2>
          <span className="d20-section-hook">useLocalStorage.js</span>
        </div>
        <LocalStorageDemo />
      </div>

      <div className="d20-divider" />

      {/* HOOK 5 — useSearch */}
      <div className="d20-section">
        <div className="d20-section-header">
          <div className="d20-section-num" style={{ background: "linear-gradient(135deg,#f59e0b,#d97706)" }}>05</div>
          <h2 className="d20-section-title">useSearch — Filter Student Records</h2>
          <span className="d20-section-hook">useSearch.js</span>
        </div>
        <StudentSearchDemo />
      </div>
    </div>
  );
};

export default Daytwenty;
