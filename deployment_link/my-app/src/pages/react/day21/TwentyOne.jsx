/**
 * Day 21 — useMemo Mastery
 * Task 1: Product Search System
 * Task 2: Shopping Cart Total Calculator
 * Task 3: Student Dashboard
 * Task 4: Employee Salary Dashboard
 *
 * All styled with Tailwind CSS (v4 — already installed in this project)
 */

import { useState, useMemo, useRef } from "react";

// ─────────────────────────────────────────
// Shared helpers
// ─────────────────────────────────────────

const THEMES = {
  violet: {
    page: "bg-gradient-to-br from-violet-950 via-purple-950 to-indigo-950",
    card: "bg-white/5 border border-white/10",
    accent: "bg-violet-600 hover:bg-violet-500",
    accentText: "text-violet-400",
    pill: "bg-violet-500/15 text-violet-300 border border-violet-500/25",
    input: "bg-white/8 border border-white/15 focus:border-violet-400 focus:ring-2 focus:ring-violet-500/30",
    tag: "bg-violet-500/10 text-violet-300",
    name: "Violet",
    emoji: "🟣",
  },
  cyan: {
    page: "bg-gradient-to-br from-slate-950 via-cyan-950 to-teal-950",
    card: "bg-white/5 border border-white/10",
    accent: "bg-cyan-600 hover:bg-cyan-500",
    accentText: "text-cyan-400",
    pill: "bg-cyan-500/15 text-cyan-300 border border-cyan-500/25",
    input: "bg-white/8 border border-white/15 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30",
    tag: "bg-cyan-500/10 text-cyan-300",
    name: "Cyan",
    emoji: "🔵",
  },
  rose: {
    page: "bg-gradient-to-br from-rose-950 via-pink-950 to-fuchsia-950",
    card: "bg-white/5 border border-white/10",
    accent: "bg-rose-600 hover:bg-rose-500",
    accentText: "text-rose-400",
    pill: "bg-rose-500/15 text-rose-300 border border-rose-500/25",
    input: "bg-white/8 border border-white/15 focus:border-rose-400 focus:ring-2 focus:ring-rose-500/30",
    tag: "bg-rose-500/10 text-rose-300",
    name: "Rose",
    emoji: "🔴",
  },
  amber: {
    page: "bg-gradient-to-br from-amber-950 via-orange-950 to-yellow-950",
    card: "bg-white/5 border border-white/10",
    accent: "bg-amber-600 hover:bg-amber-500",
    accentText: "text-amber-400",
    pill: "bg-amber-500/15 text-amber-300 border border-amber-500/25",
    input: "bg-white/8 border border-white/15 focus:border-amber-400 focus:ring-2 focus:ring-amber-500/30",
    tag: "bg-amber-500/10 text-amber-300",
    name: "Amber",
    emoji: "🟡",
  },
};

const themeKeys = Object.keys(THEMES);

/** Shows how many times the heavy computation actually ran */
const ComputeCounter = ({ count, label }) => (
  <span className="inline-flex items-center gap-1.5 text-xs font-mono bg-white/8 border border-white/10 rounded-full px-3 py-1 text-white/50">
    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
    {label} ran <span className="text-emerald-400 font-bold">{count}×</span>
  </span>
);

const ThemeBar = ({ theme, setTheme }) => (
  <div className="flex items-center gap-2 flex-wrap">
    <span className="text-xs font-semibold text-white/40 uppercase tracking-wider mr-1">Theme:</span>
    {themeKeys.map((k) => (
      <button
        key={k}
        onClick={() => setTheme(k)}
        className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer
          ${theme === k
            ? `${THEMES[k].accent} text-white shadow-lg scale-105`
            : "bg-white/8 text-white/50 hover:bg-white/15 border border-white/10"
          }`}
      >
        {THEMES[k].emoji} {THEMES[k].name}
      </button>
    ))}
  </div>
);

const SectionHeader = ({ num, title, hook, theme }) => (
  <div className="flex items-center gap-3 mb-6 flex-wrap">
    <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-sm shadow-lg ${THEMES[theme].accent}`}>
      {num}
    </div>
    <h2 className="text-xl font-extrabold text-white tracking-tight">{title}</h2>
    <span className={`ml-auto text-xs font-mono rounded-md px-2 py-0.5 ${THEMES[theme].pill}`}>
      {hook}
    </span>
  </div>
);

// ─────────────────────────────────────────
// TASK 1 — Product Search System
// ─────────────────────────────────────────

const PRODUCTS = [
  { id: 1, name: "MacBook Pro 14\"", category: "Laptops", price: 1999, rating: 4.9, stock: 12 },
  { id: 2, name: "iPhone 15 Pro", category: "Phones", price: 1099, rating: 4.8, stock: 45 },
  { id: 3, name: "Sony WH-1000XM5", category: "Audio", price: 349, rating: 4.7, stock: 30 },
  { id: 4, name: "Samsung 4K Monitor", category: "Monitors", price: 799, rating: 4.5, stock: 8 },
  { id: 5, name: "Logitech MX Master 3", category: "Peripherals", price: 99, rating: 4.6, stock: 60 },
  { id: 6, name: "iPad Air 5th Gen", category: "Tablets", price: 749, rating: 4.7, stock: 25 },
  { id: 7, name: "Dell XPS 15", category: "Laptops", price: 1799, rating: 4.6, stock: 7 },
  { id: 8, name: "AirPods Pro 2", category: "Audio", price: 249, rating: 4.8, stock: 55 },
  { id: 9, name: "Google Pixel 8 Pro", category: "Phones", price: 999, rating: 4.5, stock: 20 },
  { id: 10, name: "Mechanical Keyboard K8", category: "Peripherals", price: 129, rating: 4.4, stock: 40 },
  { id: 11, name: "LG UltraWide 34\"", category: "Monitors", price: 999, rating: 4.6, stock: 5 },
  { id: 12, name: "Samsung Galaxy Tab S9", category: "Tablets", price: 699, rating: 4.5, stock: 18 },
];

const Task1ProductSearch = () => {
  const [theme, setTheme] = useState("violet");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const computeCount = useRef(0);

  const categories = useMemo(() => ["All", ...new Set(PRODUCTS.map((p) => p.category))], []);

  const filteredProducts = useMemo(() => {
    computeCount.current += 1;
    const q = search.toLowerCase();
    return PRODUCTS.filter((p) => {
      const matchSearch = p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
      const matchCat = category === "All" || p.category === category;
      return matchSearch && matchCat;
    });
  }, [search, category]); // ← theme is intentionally NOT a dependency

  const t = THEMES[theme];

  return (
    <div className={`rounded-2xl p-6 ${t.card} backdrop-blur-sm`}>
      <SectionHeader num="01" title="Product Search System" hook="useMemo" theme={theme} />

      <div className="flex flex-col gap-4 mb-5">
        <ThemeBar theme={theme} setTheme={setTheme} />
        <ComputeCounter count={computeCount.current} label="Filter" />

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 text-sm">🔍</span>
            <input
              type="text"
              placeholder="Search products…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`w-full rounded-xl pl-9 pr-4 py-2.5 text-sm text-white outline-none transition-all ${t.input}`}
            />
          </div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={`rounded-xl px-3 py-2.5 text-sm text-white outline-none transition-all cursor-pointer ${t.input}`}
          >
            {categories.map((c) => <option key={c} value={c} className="bg-slate-900">{c}</option>)}
          </select>
        </div>
      </div>

      <p className="text-xs text-white/40 mb-3">
        Showing <span className={`font-bold ${t.accentText}`}>{filteredProducts.length}</span> of {PRODUCTS.length} products
        <span className="ml-2 text-white/25">• Theme change does NOT re-run filter</span>
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredProducts.map((p) => (
          <div key={p.id} className="bg-white/4 border border-white/8 rounded-xl p-4 hover:bg-white/8 transition-all hover:-translate-y-0.5 duration-200">
            <div className="flex justify-between items-start mb-2">
              <span className={`text-xs rounded-full px-2 py-0.5 font-semibold ${t.tag}`}>{p.category}</span>
              <span className="text-yellow-400 text-xs">{"★".repeat(Math.round(p.rating))} <span className="text-white/40">{p.rating}</span></span>
            </div>
            <p className="text-sm font-bold text-white leading-snug mt-1">{p.name}</p>
            <div className="flex justify-between items-center mt-3">
              <span className={`text-lg font-black font-mono ${t.accentText}`}>${p.price.toLocaleString()}</span>
              <span className="text-xs text-white/40">Stock: {p.stock}</span>
            </div>
          </div>
        ))}
        {filteredProducts.length === 0 && (
          <div className="col-span-full py-10 text-center text-white/30 text-sm">
            No products match your search 🔎
          </div>
        )}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────
// TASK 2 — Shopping Cart Total Calculator
// ─────────────────────────────────────────

const INITIAL_CART = [
  { id: 1, name: "MacBook Pro 14\"", price: 1999, qty: 1, img: "💻" },
  { id: 2, name: "iPhone 15 Pro", price: 1099, qty: 2, img: "📱" },
  { id: 3, name: "Sony WH-1000XM5", price: 349, qty: 1, img: "🎧" },
  { id: 4, name: "Logitech MX Master 3", price: 99, qty: 3, img: "🖱️" },
  { id: 5, name: "AirPods Pro 2", price: 249, qty: 2, img: "🎵" },
];

const Task2CartTotal = () => {
  const [theme, setTheme] = useState("cyan");
  const [cart, setCart] = useState(INITIAL_CART);
  const computeCount = useRef(0);

  const cartSummary = useMemo(() => {
    computeCount.current += 1;
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    const tax = subtotal * 0.18;
    const discount = subtotal > 3000 ? subtotal * 0.05 : 0;
    const total = subtotal + tax - discount;
    return { subtotal, tax, discount, total, itemCount: cart.reduce((s, i) => s + i.qty, 0) };
  }, [cart]); // ← theme NOT a dependency

  const changeQty = (id, delta) =>
    setCart((prev) => prev.map((item) => item.id === id
      ? { ...item, qty: Math.max(0, item.qty + delta) }
      : item
    ).filter((item) => item.qty > 0));

  const t = THEMES[theme];

  return (
    <div className={`rounded-2xl p-6 ${t.card} backdrop-blur-sm`}>
      <SectionHeader num="02" title="Shopping Cart Total Calculator" hook="useMemo" theme={theme} />

      <div className="flex flex-col gap-3 mb-5">
        <ThemeBar theme={theme} setTheme={setTheme} />
        <ComputeCounter count={computeCount.current} label="Total calc" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Cart Items */}
        <div className="lg:col-span-3 space-y-2">
          <p className="text-xs font-bold text-white/40 uppercase tracking-wider mb-3">Cart Items ({cartSummary.itemCount})</p>
          {cart.map((item) => (
            <div key={item.id} className="flex items-center gap-3 bg-white/4 border border-white/8 rounded-xl p-3">
              <span className="text-2xl w-10 h-10 flex items-center justify-center bg-white/5 rounded-lg flex-shrink-0">{item.img}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white truncate">{item.name}</p>
                <p className={`text-xs font-mono ${t.accentText}`}>${item.price.toLocaleString()} × {item.qty}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button onClick={() => changeQty(item.id, -1)} className="w-7 h-7 rounded-lg bg-white/8 hover:bg-white/15 text-white font-bold transition-all cursor-pointer text-sm flex items-center justify-center">−</button>
                <span className="w-5 text-center text-sm font-bold text-white">{item.qty}</span>
                <button onClick={() => changeQty(item.id, +1)} className={`w-7 h-7 rounded-lg text-white font-bold transition-all cursor-pointer text-sm flex items-center justify-center ${t.accent}`}>+</button>
              </div>
              <span className={`text-sm font-black font-mono w-20 text-right ${t.accentText}`}>
                ${(item.price * item.qty).toLocaleString()}
              </span>
            </div>
          ))}
          {cart.length === 0 && (
            <div className="py-8 text-center text-white/30 text-sm border border-dashed border-white/10 rounded-xl">
              🛒 Cart is empty
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-2">
          <div className="bg-white/4 border border-white/10 rounded-xl p-4 sticky top-4">
            <p className="text-xs font-bold text-white/40 uppercase tracking-wider mb-4">Order Summary</p>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Subtotal</span>
                <span className="text-white font-mono font-semibold">${cartSummary.subtotal.toLocaleString("en", { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Tax (18% GST)</span>
                <span className="text-white font-mono">${cartSummary.tax.toFixed(2)}</span>
              </div>
              {cartSummary.discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-emerald-400">Discount (5%)</span>
                  <span className="text-emerald-400 font-mono">−${cartSummary.discount.toFixed(2)}</span>
                </div>
              )}
              {cartSummary.subtotal > 3000 && (
                <p className="text-xs text-emerald-400/70 bg-emerald-500/10 rounded-lg px-2 py-1 border border-emerald-500/20">
                  🎉 5% discount applied (order over $3000)
                </p>
              )}
              <div className="border-t border-white/10 pt-3 flex justify-between">
                <span className="font-bold text-white">Grand Total</span>
                <span className={`text-xl font-black font-mono ${t.accentText}`}>
                  ${cartSummary.total.toFixed(2)}
                </span>
              </div>
            </div>
            <button className={`w-full mt-4 py-2.5 rounded-xl text-sm font-bold text-white transition-all cursor-pointer ${t.accent}`}>
              Checkout →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────
// TASK 3 — Student Dashboard
// ─────────────────────────────────────────

const STUDENTS = [
  { id: 1, name: "Aarav Sharma", branch: "CSE", cgpa: 9.2, placed: true, company: "Google", package: 45 },
  { id: 2, name: "Priya Patel", branch: "ECE", cgpa: 8.7, placed: true, company: "Microsoft", package: 38 },
  { id: 3, name: "Rohan Mehta", branch: "ME", cgpa: 7.5, placed: false, company: null, package: 0 },
  { id: 4, name: "Sneha Reddy", branch: "CSE", cgpa: 9.5, placed: true, company: "Amazon", package: 52 },
  { id: 5, name: "Kiran Kumar", branch: "IT", cgpa: 8.1, placed: false, company: null, package: 0 },
  { id: 6, name: "Divya Nair", branch: "CSE", cgpa: 9.8, placed: true, company: "Infosys", package: 28 },
  { id: 7, name: "Arjun Singh", branch: "EEE", cgpa: 6.9, placed: false, company: null, package: 0 },
  { id: 8, name: "Ananya Verma", branch: "CSE", cgpa: 9.0, placed: true, company: "TCS", package: 22 },
  { id: 9, name: "Vijay Krishnan", branch: "CE", cgpa: 7.8, placed: true, company: "Wipro", package: 18 },
  { id: 10, name: "Meera Iyer", branch: "IT", cgpa: 9.6, placed: true, company: "Accenture", package: 32 },
  { id: 11, name: "Rahul Gupta", branch: "ME", cgpa: 7.2, placed: false, company: null, package: 0 },
  { id: 12, name: "Lakshmi Das", branch: "CSE", cgpa: 8.8, placed: true, company: "Cognizant", package: 24 },
];

const Task3StudentDashboard = () => {
  const [theme, setTheme] = useState("rose");
  const [filter, setFilter] = useState("All");
  const computeCount = useRef(0);

  const stats = useMemo(() => {
    computeCount.current += 1;
    const placed = STUDENTS.filter((s) => s.placed);
    const unplaced = STUDENTS.filter((s) => !s.placed);
    const avgPackage = placed.length ? placed.reduce((s, st) => s + st.package, 0) / placed.length : 0;
    const avgCgpa = STUDENTS.reduce((s, st) => s + st.cgpa, 0) / STUDENTS.length;
    const placementRate = ((placed.length / STUDENTS.length) * 100).toFixed(1);
    const byBranch = STUDENTS.reduce((acc, s) => {
      acc[s.branch] = (acc[s.branch] || 0) + 1;
      return acc;
    }, {});
    return { total: STUDENTS.length, placed: placed.length, unplaced: unplaced.length, avgPackage, avgCgpa, placementRate, byBranch };
  }, []); // ← no deps, recomputes only on mount (theme & filter don't affect stats)

  const displayStudents = useMemo(() => {
    if (filter === "All") return STUDENTS;
    return STUDENTS.filter((s) => (filter === "Placed" ? s.placed : !s.placed));
  }, [filter]);

  const t = THEMES[theme];

  return (
    <div className={`rounded-2xl p-6 ${t.card} backdrop-blur-sm`}>
      <SectionHeader num="03" title="Student Dashboard" hook="useMemo" theme={theme} />

      <div className="flex flex-col gap-3 mb-5">
        <ThemeBar theme={theme} setTheme={setTheme} />
        <ComputeCounter count={computeCount.current} label="Stats calc" />
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-5">
        {[
          { label: "Total Students", value: stats.total, icon: "👥" },
          { label: "Placed", value: stats.placed, icon: "✅", green: true },
          { label: "Unplaced", value: stats.unplaced, icon: "⏳", red: true },
          { label: "Avg Package", value: `${stats.avgPackage.toFixed(1)} LPA`, icon: "💰" },
          { label: "Placement %", value: `${stats.placementRate}%`, icon: "📊" },
        ].map((s) => (
          <div key={s.label} className="bg-white/4 border border-white/8 rounded-xl p-3 text-center">
            <div className="text-xl mb-1">{s.icon}</div>
            <div className={`text-xl font-black font-mono ${s.green ? "text-emerald-400" : s.red ? "text-red-400" : t.accentText}`}>
              {s.value}
            </div>
            <div className="text-xs text-white/40 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Branch Distribution */}
      <div className="bg-white/4 border border-white/8 rounded-xl p-4 mb-4">
        <p className="text-xs font-bold text-white/40 uppercase tracking-wider mb-3">Branch Distribution</p>
        <div className="flex flex-wrap gap-2">
          {Object.entries(stats.byBranch).map(([branch, count]) => (
            <span key={branch} className={`text-xs font-semibold rounded-full px-3 py-1 ${t.pill}`}>
              {branch}: {count}
            </span>
          ))}
        </div>
      </div>

      {/* Filter + Table */}
      <div className="flex gap-2 mb-3 flex-wrap">
        {["All", "Placed", "Unplaced"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer
              ${filter === f ? `${t.accent} text-white` : "bg-white/8 text-white/50 hover:bg-white/15 border border-white/10"}`}
          >
            {f} ({f === "All" ? STUDENTS.length : f === "Placed" ? stats.placed : stats.unplaced})
          </button>
        ))}
      </div>

      <div className="overflow-x-auto rounded-xl border border-white/8">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-white/5 text-white/40 text-xs uppercase tracking-wider">
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Branch</th>
              <th className="px-4 py-3 text-center">CGPA</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3 text-left">Company</th>
              <th className="px-4 py-3 text-right">Package</th>
            </tr>
          </thead>
          <tbody>
            {displayStudents.map((s, i) => (
              <tr key={s.id} className={`border-t border-white/5 hover:bg-white/4 transition-colors ${i % 2 === 0 ? "" : "bg-white/2"}`}>
                <td className="px-4 py-3 font-semibold text-white">{s.name}</td>
                <td className="px-4 py-3 text-white/60">{s.branch}</td>
                <td className="px-4 py-3 text-center">
                  <span className={`font-mono font-bold ${s.cgpa >= 9 ? "text-emerald-400" : s.cgpa >= 8 ? t.accentText : "text-white/60"}`}>
                    {s.cgpa}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <span className={`text-xs font-bold rounded-full px-2.5 py-0.5 ${s.placed ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25" : "bg-red-500/15 text-red-400 border border-red-500/25"}`}>
                    {s.placed ? "Placed" : "Unplaced"}
                  </span>
                </td>
                <td className="px-4 py-3 text-white/70">{s.company ?? "—"}</td>
                <td className="px-4 py-3 text-right font-mono font-bold">
                  {s.package > 0 ? <span className={t.accentText}>{s.package} LPA</span> : <span className="text-white/25">—</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────
// TASK 4 — Employee Salary Dashboard
// ─────────────────────────────────────────

const EMPLOYEES = [
  { id: 1, name: "Rajesh Kumar",    dept: "Engineering",  role: "Senior Dev",    salary: 120000, yoe: 8,  status: "Active" },
  { id: 2, name: "Sunita Sharma",   dept: "HR",           role: "HR Manager",    salary: 85000,  yoe: 6,  status: "Active" },
  { id: 3, name: "Mohan Verma",     dept: "Engineering",  role: "Junior Dev",    salary: 60000,  yoe: 2,  status: "Active" },
  { id: 4, name: "Anjali Singh",    dept: "Marketing",    role: "Brand Lead",    salary: 75000,  yoe: 4,  status: "Active" },
  { id: 5, name: "Deepak Mishra",   dept: "Finance",      role: "CFO",           salary: 200000, yoe: 15, status: "Active" },
  { id: 6, name: "Kavita Reddy",    dept: "Engineering",  role: "DevOps Eng.",   salary: 110000, yoe: 7,  status: "Active" },
  { id: 7, name: "Suresh Nair",     dept: "Design",       role: "UI/UX Lead",    salary: 90000,  yoe: 5,  status: "On Leave" },
  { id: 8, name: "Preethi Rao",     dept: "Engineering",  role: "QA Engineer",   salary: 70000,  yoe: 3,  status: "Active" },
  { id: 9, name: "Amit Pandey",     dept: "Marketing",    role: "SEO Specialist",salary: 55000,  yoe: 2,  status: "Active" },
  { id: 10, name: "Lakshmi Iyer",   dept: "Finance",      role: "Accountant",    salary: 65000,  yoe: 4,  status: "Active" },
  { id: 11, name: "Vikram Joshi",   dept: "Engineering",  role: "Architect",     salary: 150000, yoe: 12, status: "Active" },
  { id: 12, name: "Neha Gupta",     dept: "HR",           role: "Recruiter",     salary: 50000,  yoe: 1,  status: "Active" },
];

const Task4EmployeeSalary = () => {
  const [theme, setTheme] = useState("amber");
  const [deptFilter, setDeptFilter] = useState("All");
  const [sortBy, setSortBy] = useState("salary");
  const computeCount = useRef(0);

  const departments = useMemo(() => ["All", ...new Set(EMPLOYEES.map((e) => e.dept))], []);

  const salaryReport = useMemo(() => {
    computeCount.current += 1;

    const active = EMPLOYEES.filter((e) => e.status === "Active");
    const totalExpense = EMPLOYEES.reduce((s, e) => s + e.salary, 0);
    const activeExpense = active.reduce((s, e) => s + e.salary, 0);
    const avgSalary = totalExpense / EMPLOYEES.length;
    const maxSalary = Math.max(...EMPLOYEES.map((e) => e.salary));
    const minSalary = Math.min(...EMPLOYEES.map((e) => e.salary));

    const byDept = EMPLOYEES.reduce((acc, e) => {
      if (!acc[e.dept]) acc[e.dept] = { count: 0, total: 0 };
      acc[e.dept].count += 1;
      acc[e.dept].total += e.salary;
      return acc;
    }, {});

    return { totalExpense, activeExpense, avgSalary, maxSalary, minSalary, byDept };
  }, []); // ← intentionally no deps; recomputes on mount only

  const displayEmployees = useMemo(() => {
    let list = deptFilter === "All" ? EMPLOYEES : EMPLOYEES.filter((e) => e.dept === deptFilter);
    return [...list].sort((a, b) => b[sortBy] - a[sortBy]);
  }, [deptFilter, sortBy]);

  const t = THEMES[theme];

  const fmtSalary = (n) => `$${n.toLocaleString()}`;

  return (
    <div className={`rounded-2xl p-6 ${t.card} backdrop-blur-sm`}>
      <SectionHeader num="04" title="Employee Salary Dashboard" hook="useMemo" theme={theme} />

      <div className="flex flex-col gap-3 mb-5">
        <ThemeBar theme={theme} setTheme={setTheme} />
        <ComputeCounter count={computeCount.current} label="Salary calc" />
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-5">
        {[
          { label: "Total Expense", value: fmtSalary(salaryReport.totalExpense), icon: "💸" },
          { label: "Active Payroll", value: fmtSalary(salaryReport.activeExpense), icon: "✅" },
          { label: "Avg Salary", value: fmtSalary(Math.round(salaryReport.avgSalary)), icon: "📊" },
          { label: "Highest CTC", value: fmtSalary(salaryReport.maxSalary), icon: "🏆" },
          { label: "Lowest CTC", value: fmtSalary(salaryReport.minSalary), icon: "📉" },
        ].map((k) => (
          <div key={k.label} className="bg-white/4 border border-white/8 rounded-xl p-3 text-center">
            <div className="text-xl mb-1">{k.icon}</div>
            <div className={`text-base font-black font-mono ${t.accentText} leading-tight`}>{k.value}</div>
            <div className="text-xs text-white/40 mt-0.5">{k.label}</div>
          </div>
        ))}
      </div>

      {/* Dept Breakdown */}
      <div className="bg-white/4 border border-white/8 rounded-xl p-4 mb-4">
        <p className="text-xs font-bold text-white/40 uppercase tracking-wider mb-3">Department Salary Breakdown</p>
        <div className="space-y-2.5">
          {Object.entries(salaryReport.byDept).map(([dept, { count, total }]) => {
            const pct = Math.round((total / salaryReport.totalExpense) * 100);
            return (
              <div key={dept}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-white/70 font-semibold">{dept} <span className="text-white/30">({count} emp)</span></span>
                  <span className={`font-mono font-bold ${t.accentText}`}>{fmtSalary(total)} <span className="text-white/30">({pct}%)</span></span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-white/8 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${t.accent}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-3">
        <div className="flex gap-2 flex-wrap flex-1">
          {departments.map((d) => (
            <button
              key={d}
              onClick={() => setDeptFilter(d)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer
                ${deptFilter === d ? `${t.accent} text-white` : "bg-white/8 text-white/50 hover:bg-white/15 border border-white/10"}`}
            >
              {d}
            </button>
          ))}
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className={`rounded-xl px-3 py-1.5 text-xs text-white outline-none cursor-pointer ${t.input}`}
        >
          <option value="salary" className="bg-slate-900">Sort: Salary ↓</option>
          <option value="yoe" className="bg-slate-900">Sort: Experience ↓</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-white/8">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-white/5 text-white/40 text-xs uppercase tracking-wider">
              <th className="px-4 py-3 text-left">Employee</th>
              <th className="px-4 py-3 text-left">Department</th>
              <th className="px-4 py-3 text-left">Role</th>
              <th className="px-4 py-3 text-center">Exp.</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3 text-right">Salary / yr</th>
            </tr>
          </thead>
          <tbody>
            {displayEmployees.map((e, i) => (
              <tr key={e.id} className={`border-t border-white/5 hover:bg-white/4 transition-colors ${i % 2 === 0 ? "" : "bg-white/2"}`}>
                <td className="px-4 py-3 font-semibold text-white">{e.name}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs rounded-full px-2 py-0.5 font-semibold ${t.tag}`}>{e.dept}</span>
                </td>
                <td className="px-4 py-3 text-white/60 text-xs">{e.role}</td>
                <td className="px-4 py-3 text-center text-white/60 text-xs">{e.yoe} yrs</td>
                <td className="px-4 py-3 text-center">
                  <span className={`text-xs font-bold rounded-full px-2.5 py-0.5 ${e.status === "Active" ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25" : "bg-yellow-500/15 text-yellow-400 border border-yellow-500/25"}`}>
                    {e.status}
                  </span>
                </td>
                <td className={`px-4 py-3 text-right font-mono font-black ${t.accentText}`}>
                  {fmtSalary(e.salary)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t border-white/15 bg-white/5">
              <td colSpan={5} className="px-4 py-3 text-xs font-bold text-white/40 uppercase tracking-wider">
                Total Salary Expense ({displayEmployees.length} employees)
              </td>
              <td className={`px-4 py-3 text-right font-mono font-black text-base ${t.accentText}`}>
                {fmtSalary(displayEmployees.reduce((s, e) => s + e.salary, 0))}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────
// ROOT PAGE
// ─────────────────────────────────────────

const TwentyOne = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/30 to-slate-950 py-10 px-4 font-sans">

      {/* Hero */}
      <div className="max-w-5xl mx-auto text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-1.5 text-xs font-bold text-purple-300 tracking-widest uppercase mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
          Day 21 — React Performance
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-4"
          style={{ background: "linear-gradient(135deg,#fff 0%,#c4b5fd 50%,#818cf8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
          useMemo<br />Mastery ⚡
        </h1>
        <p className="text-white/50 text-base max-w-xl mx-auto leading-relaxed">
          Four real-world <code className="text-purple-400 bg-purple-500/10 px-1.5 py-0.5 rounded text-sm">useMemo</code> demos.
          Each has a <strong className="text-white/70">Theme Change</strong> button —
          notice how computations <em>don&apos;t re-run</em> when only the theme changes.
        </p>

        {/* useMemo concept callout */}
        <div className="mt-6 bg-white/4 border border-white/10 rounded-2xl p-4 text-left max-w-xl mx-auto">
          <p className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-2">How useMemo works here</p>
          <code className="text-xs text-white/60 leading-relaxed block">
            const result = useMemo(() =&gt; {"{"}
            <br />&nbsp;&nbsp;// expensive computation
            <br />{"}"},&nbsp;
            <span className="text-emerald-400">[dependency]</span>); {" "}
            <span className="text-white/30">{"// ← theme NOT here = no re-run"}</span>
          </code>
        </div>
      </div>

      {/* Tasks */}
      <div className="max-w-5xl mx-auto space-y-8">
        <Task1ProductSearch />
        <Task2CartTotal />
        <Task3StudentDashboard />
        <Task4EmployeeSalary />
      </div>
    </div>
  );
};

export default TwentyOne;
