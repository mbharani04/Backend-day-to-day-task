// ─── Navbar — Premium sticky navbar that shrinks on scroll ───────────────────
import { useState, useCallback, useEffect, useRef } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  FiHome, FiBookmark, FiUser, FiBarChart2,
  FiLogOut, FiSun, FiMoon, FiMenu, FiX,
  FiSearch, FiZap, FiChevronDown,
} from "react-icons/fi";
import { useAuth }      from "../context/AuthContext";
import { useTheme }     from "../context/ThemeContext";
import { useBookmarks } from "../context/BookmarkContext";
import { getInitials }  from "../utils/helpers";

const NAV_LINKS = [
  { path: "/",          label: "Home",      icon: FiHome },
  { path: "/dashboard", label: "Dashboard", icon: FiBarChart2 },
  { path: "/bookmarks", label: "Bookmarks", icon: FiBookmark },
];

const Navbar = () => {
  const { user, logout }          = useAuth();
  const { isDark, toggleTheme }   = useTheme();
  const { bookmarkCount }         = useBookmarks();
  const navigate                  = useNavigate();
  const location                  = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  // Shrink nav on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close user menu on outside click
  useEffect(() => {
    const fn = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  const handleLogout = useCallback(() => {
    logout(); navigate("/login");
  }, [logout, navigate]);

  return (
    <header
      className={`sticky top-0 z-50 glass-nav transition-all duration-300 ${
        scrolled ? "py-0" : "py-0"
      }`}
    >
      <div className={`max-w-screen-xl mx-auto px-4 sm:px-6 flex items-center justify-between transition-all duration-300 ${scrolled ? "h-12" : "h-14"}`}>

        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2 flex-shrink-0">
          <div className={`flex items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 transition-all duration-300 ${scrolled ? "w-7 h-7" : "w-8 h-8"}`}>
            <FiZap className={`text-white transition-all ${scrolled ? "text-xs" : "text-sm"}`} />
          </div>
          <span className={`font-bold text-white transition-all duration-300 ${scrolled ? "text-base" : "text-lg"}`}
            style={{ fontFamily: "'Syne', sans-serif" }}>
            Truth<span className="text-gradient">Feed</span>
          </span>
        </NavLink>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ path, label, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              end={path === "/"}
              className={({ isActive }) =>
                `relative flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200
                 ${isActive
                   ? "bg-indigo-500/15 text-indigo-300"
                   : "text-[--text-secondary] hover:text-white hover:bg-white/5"
                 }`
              }
            >
              <Icon className="text-[13px]" />
              {label}
              {path === "/bookmarks" && bookmarkCount > 0 && (
                <span className="w-4 h-4 text-[9px] font-black bg-amber-500 text-white rounded-full flex items-center justify-center">
                  {bookmarkCount > 9 ? "9+" : bookmarkCount}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-1.5">
          {/* Theme toggle */}
          <button
            id="theme-toggle"
            onClick={toggleTheme}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-[--text-secondary] hover:text-white hover:bg-white/5 transition-all"
          >
            {isDark ? <FiSun className="text-sm" /> : <FiMoon className="text-sm" />}
          </button>

          {/* User menu — desktop */}
          {user && (
            <div className="hidden md:block relative" ref={userMenuRef}>
              <button
                onClick={() => setUserMenuOpen(p => !p)}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-white/5 transition-all"
              >
                <div className="w-7 h-7 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                  {getInitials(user.fullName)}
                </div>
                <span className="text-sm text-[--text-secondary] max-w-[80px] truncate">{user.fullName.split(" ")[0]}</span>
                <FiChevronDown className={`text-xs text-[--text-muted] transition-transform ${userMenuOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Dropdown */}
              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-52 glass rounded-xl overflow-hidden anim-slide-down shadow-2xl">
                  <div className="px-4 py-3 border-b border-[--border]">
                    <p className="text-sm font-semibold text-white truncate">{user.fullName}</p>
                    <p className="text-xs text-[--text-muted] truncate">{user.email}</p>
                  </div>
                  <NavLink
                    to="/profile"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[--text-secondary] hover:text-white hover:bg-white/5 transition-all"
                  >
                    <FiUser className="text-xs" /> Profile
                  </NavLink>
                  <button
                    id="logout-btn"
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-rose-400 hover:bg-rose-500/10 transition-all"
                  >
                    <FiLogOut className="text-xs" /> Sign Out
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(p => !p)}
            className="md:hidden w-8 h-8 flex items-center justify-center rounded-lg text-[--text-secondary] hover:bg-white/5"
          >
            {mobileOpen ? <FiX className="text-sm" /> : <FiMenu className="text-sm" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${mobileOpen ? "max-h-80" : "max-h-0"}`}>
        <div className="px-4 py-3 border-t border-[--border] space-y-1 bg-[--bg-surface]">
          {NAV_LINKS.map(({ path, label, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              end={path === "/"}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
                 ${isActive ? "bg-indigo-500/15 text-indigo-300" : "text-[--text-secondary] hover:text-white hover:bg-white/5"}`
              }
            >
              <Icon className="text-xs" /> {label}
            </NavLink>
          ))}
          <NavLink to="/profile" className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-[--text-secondary] hover:text-white hover:bg-white/5">
            <FiUser className="text-xs" /> Profile
          </NavLink>
          {user && (
            <button onClick={handleLogout} className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-rose-400 hover:bg-rose-500/10">
              <FiLogOut className="text-xs" /> Sign Out
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
