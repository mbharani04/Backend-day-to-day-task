// ─── Home Page ────────────────────────────────────────────────────────────────
// Main news feed with animated hero, infinite scroll, search, filter, sort.

import { useState, useMemo, useCallback, useEffect } from "react";
import { FiAlertTriangle, FiRefreshCw, FiTrendingUp, FiZap } from "react-icons/fi";
import Navbar          from "../components/Navbar";
import NewsCard        from "../components/NewsCard";
import SkeletonCard    from "../components/SkeletonCard";
import SearchBar       from "../components/SearchBar";
import CategoryFilter  from "../components/CategoryFilter";
import SortDropdown    from "../components/SortDropdown";
import useNews         from "../hooks/useNews";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import { useAuth }     from "../context/AuthContext";

const TICKER_ITEMS = [
  "🌍 Global Markets Rally",
  "🚀 SpaceX Launch Success",
  "🏏 India Wins World Cup",
  "💡 AI Breakthrough 2026",
  "🌡️ Climate Summit Accord",
  "📱 Tech Giants Q2 Results",
];

const Home = () => {
  const { user } = useAuth();
  const [category,    setCategory]    = useState("general");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy,      setSortBy]      = useState("latest");
  const [tickerIdx,   setTickerIdx]   = useState(0);

  const { articles, loading, error, hasMore, loadMore, totalResults } =
    useNews(category, searchQuery);

  const loaderRef = useInfiniteScroll(loadMore, hasMore, loading);

  // Ticker animation
  useEffect(() => {
    const t = setInterval(() => setTickerIdx(p => (p + 1) % TICKER_ITEMS.length), 3000);
    return () => clearInterval(t);
  }, []);

  // Track search
  useEffect(() => {
    if (!searchQuery || !user) return;
    const key = `tf_search_history_${user.id}`;
    const h   = JSON.parse(localStorage.getItem(key) || "[]");
    if (!h.includes(searchQuery)) {
      localStorage.setItem(key, JSON.stringify([searchQuery, ...h].slice(0, 20)));
    }
  }, [searchQuery, user]);

  // useMemo: sort articles
  const sortedArticles = useMemo(() => {
    const arr = [...articles];
    if (sortBy === "latest") return arr.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
    if (sortBy === "oldest") return arr.sort((a, b) => new Date(a.publishedAt) - new Date(b.publishedAt));
    return arr.sort((a, b) => (b.content?.length || 0) - (a.content?.length || 0));
  }, [articles, sortBy]);

  const handleSearch   = useCallback((q) => { setSearchQuery(q); if (q) setCategory("general"); }, []);
  const handleCategory = useCallback((c) => { setCategory(c); setSearchQuery(""); }, []);
  const handleSort     = useCallback((s) => setSortBy(s), []);

  const heading = searchQuery
    ? `Results for "${searchQuery}"`
    : category === "general" ? "Top Stories" : category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ── Hero ── */}
        <div className="relative mb-10 overflow-hidden rounded-3xl p-8 sm:p-12"
          style={{
            background: "linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(6,182,212,0.08) 50%, rgba(124,58,237,0.05) 100%)",
            border: "1px solid rgba(124,58,237,0.15)",
          }}
        >
          {/* Background blobs */}
          <div className="absolute -top-16 -left-16 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl animate-float pointer-events-none" />
          <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl animate-float pointer-events-none" style={{animationDelay:"2s"}} />

          {/* Live badge + ticker */}
          <div className="flex items-center gap-3 mb-4 animate-slide-left">
            <div className="flex items-center gap-1.5 bg-rose-600/90 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg shadow-rose-500/30">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
              LIVE
            </div>
            <div className="flex items-center gap-2 bg-slate-800/60 border border-slate-700/40 rounded-full px-4 py-1.5 overflow-hidden max-w-xs">
              <FiZap className="text-violet-400 text-xs flex-shrink-0" />
              <div className="text-slate-300 text-xs font-medium overflow-hidden h-4 relative">
                <span
                  key={tickerIdx}
                  className="absolute animate-slide-right"
                >
                  {TICKER_ITEMS[tickerIdx]}
                </span>
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-2 animate-fade-in-up leading-tight" style={{fontFamily:"'Syne',sans-serif"}}>
            <span className="text-white">{heading.split(" ")[0]} </span>
            <span className="gradient-text">{heading.split(" ").slice(1).join(" ")}</span>
          </h1>

          {totalResults > 0 && (
            <p className="text-slate-500 text-sm mb-6 animate-fade-in-up stagger-2">
              <span className="text-violet-400 font-semibold">{totalResults.toLocaleString()}</span> articles available
            </p>
          )}

          {/* Search */}
          <div className="animate-fade-in-up stagger-3">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>

        {/* ── Filter + Sort Row ── */}
        <div className="flex items-center gap-4 mb-8 animate-fade-in-up stagger-4">
          <div className="flex-1 min-w-0">
            <CategoryFilter activeCategory={category} onSelect={handleCategory} />
          </div>
          <SortDropdown value={sortBy} onChange={handleSort} />
        </div>

        {/* ── Error State ── */}
        {error && (
          <div className="flex flex-col items-center justify-center py-20 gap-4 animate-scale-in">
            <div className="w-20 h-20 bg-rose-500/10 rounded-full flex items-center justify-center animate-glow">
              <FiAlertTriangle className="text-rose-400 text-3xl" />
            </div>
            <div className="text-center">
              <p className="text-white font-bold text-lg mb-1">Failed to load news</p>
              <p className="text-slate-400 text-sm max-w-sm">{error}</p>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="btn-glow flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-violet-500 text-white rounded-2xl text-sm font-semibold shadow-lg shadow-violet-500/30"
            >
              <FiRefreshCw />
              Try Again
            </button>
          </div>
        )}

        {/* ── News Grid ── */}
        {!error && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {/* Skeletons */}
              {loading && articles.length === 0
                ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
                : null}

              {/* Cards — pass index for stagger animation */}
              {sortedArticles.map((article, idx) => (
                <NewsCard key={article.url || idx} article={article} index={idx} />
              ))}
            </div>

            {/* Empty */}
            {!loading && sortedArticles.length === 0 && (
              <div className="flex flex-col items-center justify-center py-24 gap-4 animate-scale-in">
                <div className="text-6xl">📰</div>
                <p className="text-white font-bold text-xl">No articles found</p>
                <p className="text-slate-500">Try a different search term or category</p>
              </div>
            )}

            {/* Sentinel */}
            <div ref={loaderRef} className="py-10 flex flex-col items-center gap-3">
              {loading && articles.length > 0 && (
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full border-2 border-violet-500/30 border-t-violet-500 animate-spin" />
                  <span className="text-slate-500 text-sm">Loading more...</span>
                </div>
              )}
              {!hasMore && articles.length > 0 && (
                <div className="flex items-center gap-2 text-slate-600 text-sm">
                  <div className="h-px w-16 bg-slate-700" />
                  <span>You&apos;re all caught up</span>
                  <div className="h-px w-16 bg-slate-700" />
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Home;
