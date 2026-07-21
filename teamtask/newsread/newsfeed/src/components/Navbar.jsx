// ─── Navbar ───────────────────────────────────────────────────────────────────
// Responsive navigation bar with mobile hamburger menu, theme toggle,
// and all navigation links rendered from an array of objects.

import { useState, useCallback } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiBookmark,
  FiUser,
  FiBarChart2,
  FiLogOut,
  FiSun,
  FiMoon,
  FiMenu,
  FiX,
  FiZap,
} from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useBookmarks } from "../context/BookmarkContext";
import { getInitials } from "../utils/helpers";

// Array of objects — nav links, no hardcoded JSX
const NAV_LINKS = [
  { path: "/",          label: "Home",       icon: FiHome },
  { path: "/dashboard", label: "Dashboard",  icon: FiBarChart2 },
  { path: "/bookmarks", label: "Bookmarks",  icon: FiBookmark },
  { path: "/profile",   label: "Profile",    icon: FiUser },
];

const Navbar = () => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { bookmarkCount } = useBookmarks();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  // useCallback: stable logout handler
  const handleLogout = useCallback(() => {
    logout();
    navigate("/login");
    setMobileOpen(false);
  }, [logout, navigate]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* ── Logo ── */}
          <NavLink
            to="/"
            className="flex items-center gap-2 group"
            onClick={closeMobile}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/30">
              <FiZap className="text-white text-sm" />
            </div>
            <span className="text-white font-extrabold text-lg tracking-tight">
              Truth<span className="text-violet-400">Feed</span>
            </span>
          </NavLink>

          {/* ── Desktop Nav Links ── */}
          <nav className="hidden md:flex items-center gap-1">
            {/* map() — render all nav links dynamically */}
            {NAV_LINKS.map(({ path, label, icon: Icon }) => (
              <NavLink
                key={path}
                to={path}
                end={path === "/"}
                className={({ isActive }) =>
                  `relative flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200
                  ${
                    isActive
                      ? "bg-violet-600/20 text-violet-300"
                      : "text-slate-400 hover:text-white hover:bg-slate-800"
                  }`
                }
              >
                <Icon className="text-base" />
                {label}
                {/* Bookmark badge */}
                {path === "/bookmarks" && bookmarkCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {bookmarkCount > 9 ? "9+" : bookmarkCount}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          {/* ── Right Side Controls ── */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <button
              id="theme-toggle"
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
              aria-label="Toggle theme"
            >
              {isDark ? <FiSun className="text-amber-400" /> : <FiMoon />}
            </button>

            {/* User avatar + logout on desktop */}
            {user && (
              <div className="hidden md:flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-cyan-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {getInitials(user.fullName)}
                </div>
                <button
                  id="logout-btn"
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
                >
                  <FiLogOut />
                  Logout
                </button>
              </div>
            )}

            {/* Mobile hamburger */}
            <button
              id="mobile-menu-btn"
              onClick={() => setMobileOpen((p) => !p)}
              className="md:hidden p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-700/50 bg-slate-900/95 backdrop-blur-xl">
          <div className="px-4 py-4 space-y-1">
            {NAV_LINKS.map(({ path, label, icon: Icon }) => (
              <NavLink
                key={path}
                to={path}
                end={path === "/"}
                onClick={closeMobile}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                  ${
                    isActive
                      ? "bg-violet-600/20 text-violet-300"
                      : "text-slate-400 hover:text-white hover:bg-slate-800"
                  }`
                }
              >
                <Icon className="text-base" />
                {label}
                {path === "/bookmarks" && bookmarkCount > 0 && (
                  <span className="ml-auto bg-amber-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {bookmarkCount}
                  </span>
                )}
              </NavLink>
            ))}

            {/* Mobile user info & logout */}
            {user && (
              <div className="pt-3 border-t border-slate-700/50 mt-3">
                <div className="flex items-center gap-3 px-4 py-2 mb-1">
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
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-rose-400 hover:bg-rose-500/10 transition-all"
                >
                  <FiLogOut />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
