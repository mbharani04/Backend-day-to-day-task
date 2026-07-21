// ─── Dashboard Page ───────────────────────────────────────────────────────────
// Dynamic statistics dashboard showing user activity from localStorage.

import { useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiBookmark,
  FiHeart,
  FiSearch,
  FiClock,
  FiTrendingUp,
  FiLogOut,
  FiTag,
  FiUser,
  FiBarChart2,
  FiTrash2,
} from "react-icons/fi";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { useBookmarks } from "../context/BookmarkContext";
import { formatDate, getInitials, getMostFrequent, capitalize } from "../utils/helpers";

// Stat card component — rendered from array of objects
const StatCard = ({ icon: Icon, label, value, color, bg }) => (
  <div className={`${bg} border border-slate-700/40 rounded-2xl p-6 flex items-center gap-4`}>
    <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center flex-shrink-0`}>
      <Icon className="text-white text-xl" />
    </div>
    <div>
      <p className="text-slate-400 text-sm">{label}</p>
      <p className="text-white text-2xl font-extrabold">{value}</p>
    </div>
  </div>
);

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { bookmarks, likes, bookmarkCount, likeCount } = useBookmarks();
  const navigate = useNavigate();

  // ── Derived data from localStorage ───────────────────────────────────────
  // useMemo: recompute only when user or bookmarks change
  const recentlyViewed = useMemo(() => {
    if (!user) return [];
    return JSON.parse(localStorage.getItem(`tf_recent_${user.id}`) || "[]");
  }, [user, bookmarks]); // eslint-disable-line

  const searchHistory = useMemo(() => {
    if (!user) return [];
    return JSON.parse(
      localStorage.getItem(`tf_search_history_${user.id}`) || "[]"
    );
  }, [user]);

  // useMemo: compute favorite category from bookmarks using reduce()
  const favoriteCategory = useMemo(() => {
    // reduce() — build frequency map of categories
    const cats = bookmarks.reduce((acc, b) => {
      if (b.category) acc.push(b.category);
      return acc;
    }, []);
    return getMostFrequent(cats) || "None yet";
  }, [bookmarks]);

  // ── Stats array of objects ────────────────────────────────────────────────
  const stats = useMemo(
    () => [
      {
        icon: FiBookmark,
        label: "Bookmarked",
        value: bookmarkCount,
        color: "bg-amber-600",
        bg: "bg-amber-500/5",
      },
      {
        icon: FiHeart,
        label: "Liked Articles",
        value: likeCount,
        color: "bg-rose-600",
        bg: "bg-rose-500/5",
      },
      {
        icon: FiSearch,
        label: "Searches",
        value: searchHistory.length,
        color: "bg-cyan-600",
        bg: "bg-cyan-500/5",
      },
      {
        icon: FiClock,
        label: "Recently Viewed",
        value: recentlyViewed.length,
        color: "bg-violet-600",
        bg: "bg-violet-500/5",
      },
    ],
    [bookmarkCount, likeCount, searchHistory.length, recentlyViewed.length]
  );

  const handleLogout = useCallback(() => {
    logout();
    navigate("/login");
  }, [logout, navigate]);

  const clearSearchHistory = useCallback(() => {
    if (!user) return;
    localStorage.removeItem(`tf_search_history_${user.id}`);
    // Force re-render by reload (or you can use a state flag)
    window.location.reload();
  }, [user]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ── Header ── */}
        <div className="flex items-start justify-between flex-wrap gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-violet-600 to-cyan-500 rounded-2xl flex items-center justify-center text-white text-xl font-extrabold shadow-lg shadow-violet-500/30">
              {getInitials(user.fullName)}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <FiBarChart2 className="text-violet-400" />
                <span className="text-violet-400 text-sm font-semibold uppercase tracking-wide">
                  Dashboard
                </span>
              </div>
              <h1 className="text-2xl font-extrabold text-white">
                Welcome back, {user.fullName.split(" ")[0]}!
              </h1>
              <p className="text-slate-400 text-sm">{user.email}</p>
            </div>
          </div>

          <button
            id="dashboard-logout"
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500/20 rounded-xl text-sm font-medium transition-all"
          >
            <FiLogOut />
            Logout
          </button>
        </div>

        {/* ── Stats Grid ── */}
        {/* map() — render all stat cards dynamically from array of objects */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>

        {/* ── Favorite Category ── */}
        <div className="bg-slate-800/40 border border-slate-700/40 rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <FiTrendingUp className="text-violet-400" />
            <h2 className="text-white font-bold text-lg">Reading Insights</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-900/60 rounded-xl p-4">
              <p className="text-slate-400 text-xs uppercase tracking-wide mb-1">Favorite Category</p>
              <p className="text-white font-bold text-lg capitalize">{favoriteCategory}</p>
            </div>
            <div className="bg-slate-900/60 rounded-xl p-4">
              <p className="text-slate-400 text-xs uppercase tracking-wide mb-1">Member Since</p>
              <p className="text-white font-bold text-lg">{formatDate(user.joinedAt)}</p>
            </div>
          </div>
        </div>

        {/* ── Two Column Layout: Recently Viewed + Search History ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

          {/* Recently Viewed */}
          <div className="bg-slate-800/40 border border-slate-700/40 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <FiClock className="text-cyan-400" />
              <h2 className="text-white font-bold">Recently Viewed</h2>
            </div>
            {recentlyViewed.length === 0 ? (
              <p className="text-slate-500 text-sm text-center py-4">
                No recently viewed articles yet
              </p>
            ) : (
              <div className="space-y-3">
                {/* map() — render recently viewed from array of objects */}
                {recentlyViewed.slice(0, 5).map((article, idx) => (
                  <a
                    key={article.url || idx}
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex gap-3 p-3 bg-slate-900/50 rounded-xl hover:bg-slate-900 transition-all group"
                  >
                    <img
                      src={article.urlToImage || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=100"}
                      alt=""
                      className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                      onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=100"; }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-xs font-semibold line-clamp-2 group-hover:text-violet-300 transition-colors">
                        {article.title}
                      </p>
                      <p className="text-slate-500 text-xs mt-1 capitalize">
                        {article.category} · {article.source?.name}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Search History */}
          <div className="bg-slate-800/40 border border-slate-700/40 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <FiSearch className="text-amber-400" />
                <h2 className="text-white font-bold">Search History</h2>
              </div>
              {searchHistory.length > 0 && (
                <button
                  onClick={clearSearchHistory}
                  className="text-slate-500 hover:text-rose-400 text-xs flex items-center gap-1 transition-colors"
                >
                  <FiTrash2 className="text-xs" />
                  Clear
                </button>
              )}
            </div>
            {searchHistory.length === 0 ? (
              <p className="text-slate-500 text-sm text-center py-4">
                No search history yet
              </p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {/* map() — render search history tags dynamically */}
                {searchHistory.slice(0, 15).map((term, idx) => (
                  <span
                    key={idx}
                    className="flex items-center gap-1 bg-slate-900/60 border border-slate-700/50 text-slate-300 text-xs px-3 py-1.5 rounded-full"
                  >
                    <FiSearch className="text-xs text-slate-500" />
                    {term}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Liked Articles Preview ── */}
        {likes.length > 0 && (
          <div className="bg-slate-800/40 border border-slate-700/40 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <FiHeart className="text-rose-400" />
              <h2 className="text-white font-bold">Liked Articles</h2>
              <span className="ml-auto text-slate-500 text-sm">{likeCount} total</span>
            </div>
            <div className="space-y-2">
              {/* map() + slice() — show first 5 liked articles */}
              {likes.slice(0, 5).map((article, idx) => (
                <a
                  key={article.url || idx}
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-slate-900/50 rounded-xl hover:bg-slate-900 transition-all group"
                >
                  <FiHeart className="text-rose-400 flex-shrink-0 text-sm fill-rose-400" />
                  <p className="text-white text-xs flex-1 line-clamp-1 group-hover:text-rose-300 transition-colors">
                    {article.title}
                  </p>
                  <span className="text-slate-600 text-xs">{article.source?.name}</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
