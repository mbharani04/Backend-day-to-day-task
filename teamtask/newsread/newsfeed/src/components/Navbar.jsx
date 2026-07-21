// ─── Navbar ───────────────────────────────────────────────────────────────────
// Premium animated navbar with glassmorphism and smooth interactions.

import { useState, useCallback } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FiHome, FiBookmark, FiUser, FiBarChart2,
  FiLogOut, FiSun, FiMoon, FiMenu, FiX, FiZap,
} from "react-icons/fi";
import { useAuth }      from "../context/AuthContext";
import { useTheme }     from "../context/ThemeContext";
import { useBookmarks } from "../context/BookmarkContext";
import { getInitials }  from "../utils/helpers";

const NAV_LINKS = [
  { path: "/",          label: "Home",      icon: FiHome },
  { path: "/dashboard", label: "Dashboard", icon: FiBarChart2 },
  { path: "/bookmarks", label: "Bookmarks", icon: FiBookmark },
  { path: "/profile",   label: "Profile",   icon: FiUser },
];

const Navbar = () => {
  const { user, logout }          = useAuth();
  const { isDark, toggleTheme }   = useTheme();
  const { bookmarkCount }         = useBookmarks();
  const navigate                  = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoutHover, setLogoutHover] = useState(false);

  const handleLogout = useCallback(() => {
    logout();
    navigate("/login");
    setMobileOpen(false);
  }, [logout, navigate]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="sticky top-0 z-50 glass-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* ── Logo ── */}
          <NavLink to="/" className="flex items-center gap-2.5 group" onClick={closeMobile}>
            <div className="relative w-9 h-9 rounded-xl flex items-center justify-center bg-gradient-to-br from-violet-600 to-cyan-500 animate-glow group-hover:scale-110 transition-transform duration-300">
              <FiZap className="text-white text-base relative z-10" />
              {/* spinning ring */}
              <div className="absolute inset-0 rounded-xl border-2 border-transparent border-t-violet-400/50 animate-slow-spin" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-white font-bold text-lg tracking-tight" style={{fontFamily:"'Syne',sans-serif"}}>
                Truth<span className="gradient-text">Feed</span>
              </span>
              <span className="text-slate-600 text-[9px] uppercase tracking-widest">
                Stay Informed
              </span>
            </div>
          </NavLink>

          {/* ── Desktop Nav ── */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-800/40 border border-slate-700/30 rounded-2xl px-2 py-1.5">
            {NAV_LINKS.map(({ path, label, icon: Icon }, i) => (
              <NavLink
                key={path}
                to={path}
                end={path === "/"}
                className={({ isActive }) =>
                  `relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-250
                   ${isActive
                     ? "bg-gradient-to-r from-violet-600/80 to-violet-500/60 text-white shadow-lg shadow-violet-500/20"
                     : "text-slate-400 hover:text-white hover:bg-slate-700/60"
                   }`
                }
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <Icon className="text-[15px] flex-shrink-0" />
                <span>{label}</span>
                {path === "/bookmarks" && bookmarkCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center animate-bounce-in shadow-md">
                    {bookmarkCount > 9 ? "9+" : bookmarkCount}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          {/* ── Right Controls ── */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <button
              id="theme-toggle"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="relative w-10 h-10 rounded-xl bg-slate-800/70 border border-slate-700/50 flex items-center justify-center hover:border-violet-500/50 hover:bg-slate-700 transition-all duration-300 overflow-hidden group"
            >
              <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${isDark ? "opacity-100 rotate-0" : "opacity-0 rotate-90"}`}>
                <FiSun className="text-amber-400 text-base" />
              </div>
              <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${isDark ? "opacity-0 -rotate-90" : "opacity-100 rotate-0"}`}>
                <FiMoon className="text-slate-300 text-base" />
              </div>
            </button>

            {/* Desktop: User chip + logout */}
            {user && (
              <div className="hidden md:flex items-center gap-2">
                <div className="flex items-center gap-2 bg-slate-800/70 border border-slate-700/40 rounded-xl px-3 py-2">
                  <div className="w-6 h-6 bg-gradient-to-br from-violet-600 to-cyan-500 rounded-full flex items-center justify-center text-white text-[10px] font-black">
                    {getInitials(user.fullName)}
                  </div>
                  <span className="text-slate-300 text-sm font-medium max-w-[100px] truncate">
                    {user.fullName.split(" ")[0]}
                  </span>
                </div>

                <button
                  id="logout-btn"
                  onClick={handleLogout}
                  onMouseEnter={() => setLogoutHover(true)}
                  onMouseLeave={() => setLogoutHover(false)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium border transition-all duration-300
                    ${logoutHover
                      ? "bg-rose-600/20 border-rose-500/40 text-rose-300 shadow-lg shadow-rose-500/10"
                      : "bg-slate-800/50 border-slate-700/40 text-slate-400"
                    }`}
                >
                  <FiLogOut className={`transition-transform duration-300 ${logoutHover ? "translate-x-0.5" : ""}`} />
                  Logout
                </button>
              </div>
            )}

            {/* Mobile hamburger */}
            <button
              id="mobile-menu-btn"
              onClick={() => setMobileOpen(p => !p)}
              className="md:hidden w-10 h-10 rounded-xl bg-slate-800 border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
            >
              <div className={`transition-all duration-300 ${mobileOpen ? "rotate-90" : "rotate-0"}`}>
                {mobileOpen ? <FiX className="text-lg" /> : <FiMenu className="text-lg" />}
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      <div className={`md:hidden overflow-hidden transition-all duration-400 ${mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="border-t border-slate-700/40 bg-slate-900/95 backdrop-blur-2xl px-4 py-4 space-y-1">
          {NAV_LINKS.map(({ path, label, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              end={path === "/"}
              onClick={closeMobile}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                ${isActive
                  ? "bg-gradient-to-r from-violet-600/30 to-violet-500/10 text-violet-300 border border-violet-500/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/80"
                }`
              }
            >
              <Icon className="text-base" />
              {label}
              {path === "/bookmarks" && bookmarkCount > 0 && (
                <span className="ml-auto bg-amber-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                  {bookmarkCount}
                </span>
              )}
            </NavLink>
          ))}
          {user && (
            <div className="pt-3 border-t border-slate-700/40 mt-2">
              <div className="flex items-center gap-3 px-4 py-2 mb-2">
                <div className="w-9 h-9 bg-gradient-to-br from-violet-600 to-cyan-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {getInitials(user.fullName)}
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{user.fullName}</p>
                  <p className="text-slate-500 text-xs">{user.email}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-all"
              >
                <FiLogOut />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
