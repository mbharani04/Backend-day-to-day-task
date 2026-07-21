// ─── Dashboard Page ───────────────────────────────────────────────────────────
import { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  FiBookmark, FiHeart, FiSearch, FiClock, FiActivity,
  FiTrendingUp, FiExternalLink,
} from "react-icons/fi";
import Navbar      from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { useBookmarks } from "../context/BookmarkContext";
import { getMostFrequent, formatDate, timeAgo } from "../utils/helpers";
import { getInitials } from "../utils/helpers";

const Dashboard = () => {
  const { user } = useAuth();
  const { bookmarks, likes } = useBookmarks();

  const recentlyViewed = useMemo(() => {
    if (!user) return [];
    try { return JSON.parse(localStorage.getItem(`tf_recent_${user.id}`) || "[]"); }
    catch { return []; }
  }, [user]);

  const searchHistory = useMemo(() => {
    if (!user) return [];
    try { return JSON.parse(localStorage.getItem(`tf_search_history_${user.id}`) || "[]"); }
    catch { return []; }
  }, [user]);

  const favoriteCategory = useMemo(() => {
    const cats = [...bookmarks, ...likedArticles].map(a => a.category).filter(Boolean);
    return getMostFrequent(cats) || "None yet";
  }, [bookmarks, likedArticles]);

  const stats = [
    { label: "Bookmarks",     value: bookmarks.length,       icon: FiBookmark, color: "text-amber-400",  bg: "bg-amber-500/10", border: "border-amber-500/20" },
    { label: "Liked",         value: likedArticles.length,   icon: FiHeart,    color: "text-rose-400",   bg: "bg-rose-500/10",  border: "border-rose-500/20"  },
    { label: "Searches",      value: searchHistory.length,   icon: FiSearch,   color: "text-indigo-400", bg: "bg-indigo-500/10",border: "border-indigo-500/20"},
    { label: "Recently Seen", value: recentlyViewed.length,  icon: FiClock,    color: "text-cyan-400",   bg: "bg-cyan-500/10",  border: "border-cyan-500/20"  },
  ];

  if (!user) return null;

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-8">
        {/* ── Header ── */}
        <div className="glass rounded-2xl p-6 mb-8 flex items-center gap-5 anim-fade-up">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold flex-shrink-0"
            style={{ fontFamily: "'Syne', sans-serif" }}>
            {getInitials(user.fullName)}
          </div>
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-0.5">
              <FiActivity className="text-[10px]" /> Dashboard
            </div>
            <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
              Welcome back, {user.fullName.split(" ")[0]}!
            </h1>
            <p className="text-[--text-muted] text-sm">{user.email} · Member since {formatDate(user.createdAt)}</p>
          </div>
        </div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map(({ label, value, icon: Icon, color, bg, border }, i) => (
            <div
              key={label}
              className={`rounded-2xl p-5 border ${border} ${bg} anim-fade-up d-${i + 1}`}
            >
              <div className="flex items-center gap-2 mb-3">
                <Icon className={`text-sm ${color}`} />
                <span className="text-[--text-muted] text-xs font-medium">{label}</span>
              </div>
              <p className={`text-3xl font-bold ${color}`} style={{ fontFamily: "'Syne', sans-serif" }}>
                {value}
              </p>
            </div>
          ))}
        </div>

        {/* ── Insights ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="glass rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <FiTrendingUp className="text-indigo-400 text-sm" />
              <h3 className="text-sm font-bold text-white">Reading Insights</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[--text-muted] text-xs">Favourite category</span>
                <span className="badge badge-general capitalize">{favoriteCategory}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[--text-muted] text-xs">Total saves</span>
                <span className="text-white font-semibold text-sm">{bookmarks.length + likedArticles.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[--text-muted] text-xs">Articles viewed</span>
                <span className="text-white font-semibold text-sm">{recentlyViewed.length}</span>
              </div>
            </div>
          </div>

          {/* Recently Viewed */}
          <div className="glass rounded-2xl p-5 lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <FiClock className="text-cyan-400 text-sm" />
              <h3 className="text-sm font-bold text-white">Recently Viewed</h3>
            </div>
            {recentlyViewed.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <p className="text-[--text-muted] text-sm">No articles viewed yet.</p>
                <Link to="/" className="text-indigo-400 text-xs mt-2 hover:underline">Browse the feed →</Link>
              </div>
            ) : (
              <div className="space-y-2">
                {recentlyViewed.slice(0, 4).map((article) => (
                  <div key={article.url} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/4 transition-all">
                    <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-[--bg-surface2]">
                      <img
                        src={article.urlToImage}
                        alt={article.title}
                        className="w-full h-full object-cover"
                        onError={e => { e.target.src = "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=80"; }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[--text-primary] text-xs font-medium clamp-1">{article.title}</p>
                      <p className="text-[--text-muted] text-[10px] mt-0.5">
                        {article.category} · {article.source?.name} · {timeAgo(article.publishedAt)}
                      </p>
                    </div>
                    <a href={article.url} target="_blank" rel="noreferrer" className="text-[--text-muted] hover:text-indigo-400 transition-colors flex-shrink-0">
                      <FiExternalLink className="text-xs" />
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Search History ── */}
        {searchHistory.length > 0 && (
          <div className="glass rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <FiSearch className="text-indigo-400 text-sm" />
              <h3 className="text-sm font-bold text-white">Recent Searches</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {searchHistory.slice(0, 12).map(q => (
                <Link
                  key={q}
                  to={`/?q=${encodeURIComponent(q)}`}
                  className="text-indigo-300 text-xs bg-indigo-500/10 border border-indigo-500/20 px-3 py-1.5 rounded-full hover:bg-indigo-500/20 transition-all"
                >
                  {q}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
