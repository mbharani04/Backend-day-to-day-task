// ─── Home Page — Premium layout with hero, trending, sidebar, infinite scroll ──
import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import {
  FiSearch, FiX, FiTrendingUp, FiRefreshCw, FiAlertTriangle,
  FiBookmark, FiGlobe, FiClock, FiStar, FiMonitor, FiBriefcase,
  FiActivity, FiHeart, FiFilm, FiFlag, FiZap,
} from "react-icons/fi";
import Navbar       from "../components/Navbar";
import NewsCard     from "../components/NewsCard";
import SkeletonCard from "../components/SkeletonCard";
import useNews      from "../hooks/useNews";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import { useAuth }  from "../context/AuthContext";
import { timeAgo }  from "../utils/helpers";

/* ── Category config ── */
const CATEGORIES = [
  { id: "general",       label: "Top Stories",   icon: FiStar    },
  { id: "technology",    label: "Technology",    icon: FiMonitor },
  { id: "business",      label: "Business",      icon: FiBriefcase },
  { id: "sports",        label: "Sports",        icon: FiActivity },
  { id: "science",       label: "Science",       icon: FiZap     },
  { id: "entertainment", label: "Entertainment", icon: FiFilm    },
  { id: "health",        label: "Health",        icon: FiHeart   },
  { id: "politics",      label: "Politics",      icon: FiFlag    },
  { id: "world",         label: "World",         icon: FiGlobe   },
];

const TRENDING_TOPICS = [
  "#AIRevolution", "#ClimateAction", "#SpaceExploration",
  "#CryptoMarket", "#CricketWorldCup", "#GlobalHealth",
  "#TechGiants", "#MarsLanding", "#CleanEnergy",
];

const Home = () => {
  const { user } = useAuth();
  const [category,    setCategory]    = useState("general");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const searchRef = useRef(null);
  const debounceRef = useRef(null);

  const { articles, loading, error, hasMore, loadMore, totalResults, retryLoad } =
    useNews(category, searchQuery);

  const loaderRef = useInfiniteScroll(loadMore, hasMore, loading);

  // Debounced search
  const handleSearchInput = (val) => {
    setSearchInput(val);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setSearchQuery(val.trim());
      if (val.trim()) setCategory("general");
    }, 400);
  };

  const clearSearch = () => { setSearchInput(""); setSearchQuery(""); };

  // Track search history
  useEffect(() => {
    if (!searchQuery || !user) return;
    const key = `tf_search_history_${user.id}`;
    const h   = JSON.parse(localStorage.getItem(key) || "[]");
    if (!h.includes(searchQuery))
      localStorage.setItem(key, JSON.stringify([searchQuery, ...h].slice(0, 20)));
  }, [searchQuery, user]);

  const handleCategory = useCallback((c) => {
    setCategory(c);
    setSearchInput("");
    setSearchQuery("");
  }, []);

  // useMemo: split articles for hero vs feed
  const { featuredArticle, feedArticles, sidebarArticles } = useMemo(() => {
    if (!articles.length) return { featuredArticle: null, feedArticles: [], sidebarArticles: [] };
    const [first, ...rest] = articles;
    return {
      featuredArticle:  first,
      feedArticles:     rest,
      sidebarArticles:  articles.slice(0, 5),
    };
  }, [articles]);

  const headingText = searchQuery
    ? `"${searchQuery}"`
    : CATEGORIES.find(c => c.id === category)?.label || "Top Stories";

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* ══════════════════════════════════════
          SEARCH BAR (full-width, under navbar)
      ══════════════════════════════════════ */}
      <div className="border-b border-[--border]" style={{ background: "var(--bg-surface)" }}>
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center gap-3">
            {/* Search input */}
            <div className="flex-1 flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[--bg-surface2] border border-[--border] focus-within:border-indigo-500/50 focus-within:shadow-[0_0_0_3px_rgba(99,102,241,0.1)] transition-all">
              <FiSearch className="text-[--text-muted] text-sm flex-shrink-0" />
              <input
                ref={searchRef}
                type="text"
                value={searchInput}
                onChange={e => handleSearchInput(e.target.value)}
                placeholder="Search news, topics, sources..."
                className="flex-1 bg-transparent text-sm text-[--text-primary] placeholder-[--text-muted] outline-none"
              />
              {searchInput && (
                <button onClick={clearSearch} className="text-[--text-muted] hover:text-white transition-colors">
                  <FiX className="text-xs" />
                </button>
              )}
            </div>

            {/* Category pills (scrollable) */}
            <div className="hidden sm:flex items-center gap-1.5 overflow-x-auto scrollbar-hide flex-shrink-0 max-w-xl">
              {CATEGORIES.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => handleCategory(id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap flex-shrink-0 transition-all duration-200 ${
                    category === id && !searchQuery
                      ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/25"
                      : "bg-[--bg-surface2] border border-[--border] text-[--text-secondary] hover:text-white hover:border-[--border-hover]"
                  }`}
                >
                  <Icon className="text-[10px]" />
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile category pills */}
          <div className="sm:hidden flex items-center gap-1.5 overflow-x-auto scrollbar-hide mt-2.5 pb-0.5">
            {CATEGORIES.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => handleCategory(id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap flex-shrink-0 transition-all ${
                  category === id && !searchQuery
                    ? "bg-indigo-500 text-white"
                    : "bg-[--bg-surface2] border border-[--border] text-[--text-secondary]"
                }`}
              >
                <Icon className="text-[10px]" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          MAIN CONTENT
      ══════════════════════════════════════ */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-8">

        {/* Section header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
              {searchQuery ? (
                <>Search: <span className="text-gradient">{headingText}</span></>
              ) : (
                headingText
              )}
            </h1>
            {totalResults > 0 && (
              <p className="text-[--text-muted] text-xs mt-0.5">
                {totalResults.toLocaleString()} articles found
              </p>
            )}
          </div>
          <div className="flex items-center gap-2 text-[--text-muted] text-xs">
            <FiClock className="text-[11px]" />
            Updated just now
          </div>
        </div>

        {/* ── Error state ── */}
        {error && (
          <div className="flex flex-col items-center justify-center py-20 gap-4 anim-scale-in">
            <div className="w-16 h-16 rounded-2xl bg-rose-500/10 flex items-center justify-center">
              <FiAlertTriangle className="text-rose-400 text-2xl" />
            </div>
            <div className="text-center">
              <p className="text-white font-semibold mb-1">Unable to load news</p>
              <p className="text-[--text-muted] text-sm">{error}</p>
            </div>
            <button onClick={retryLoad || (() => window.location.reload())} className="btn-primary">
              <FiRefreshCw className="text-xs" /> Try Again
            </button>
          </div>
        )}

        {!error && (
          <div className="flex gap-8">
            {/* ── Left: Main feed ── */}
            <main className="flex-1 min-w-0">

              {/* Featured Hero Article */}
              {!loading && featuredArticle && !searchQuery && (
                <div className="mb-8">
                  <NewsCard article={featuredArticle} index={0} variant="featured" />
                </div>
              )}

              {/* Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {/* Skeleton loading */}
                {loading && articles.length === 0
                  ? Array.from({ length: 9 }).map((_, i) => <SkeletonCard key={i} />)
                  : feedArticles.map((article, idx) => (
                      <NewsCard
                        key={`${article.url}-${idx}`}
                        article={article}
                        index={idx + 1}
                        variant="default"
                      />
                    ))
                }
              </div>

              {/* Empty state */}
              {!loading && articles.length === 0 && !error && (
                <div className="flex flex-col items-center justify-center py-24 gap-4 anim-scale-in">
                  <div className="w-20 h-20 rounded-2xl bg-[--bg-surface2] flex items-center justify-center text-4xl">
                    📰
                  </div>
                  <div className="text-center">
                    <p className="text-white font-semibold text-lg mb-1">No articles found</p>
                    <p className="text-[--text-muted] text-sm">
                      {searchQuery ? "Try a different search term" : "No news available for this category"}
                    </p>
                  </div>
                  {searchQuery && (
                    <button onClick={clearSearch} className="btn-ghost">
                      Clear search
                    </button>
                  )}
                </div>
              )}

              {/* ── Infinite scroll sentinel ── */}
              <div ref={loaderRef} className="mt-10">
                {loading && articles.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                    {Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={`loader-${i}`} />)}
                  </div>
                )}
                {!hasMore && articles.length > 0 && (
                  <div className="flex flex-col items-center gap-3 py-10">
                    <div className="divider w-24" />
                    <p className="text-[--text-muted] text-sm font-medium">You&apos;re all caught up</p>
                    <p className="text-[--text-muted] text-xs">{articles.length} articles read</p>
                  </div>
                )}
              </div>
            </main>

            {/* ── Right: Sidebar ── */}
            <aside className="hidden xl:flex flex-col gap-5 w-80 flex-shrink-0">

              {/* Trending topics */}
              <div className="glass rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <FiTrendingUp className="text-indigo-400 text-sm" />
                  <h3 className="text-[--text-primary] font-bold text-sm">Trending Topics</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {TRENDING_TOPICS.map(topic => (
                    <button
                      key={topic}
                      onClick={() => { setSearchInput(topic.replace("#", "")); handleSearchInput(topic.replace("#", "")); }}
                      className="text-indigo-300 text-xs bg-indigo-500/10 border border-indigo-500/20 px-3 py-1.5 rounded-full hover:bg-indigo-500/20 transition-all"
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>

              {/* Today's picks */}
              {sidebarArticles.length > 0 && (
                <div className="glass rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <FiStar className="text-amber-400 text-sm" />
                    <h3 className="text-[--text-primary] font-bold text-sm">Today&apos;s Picks</h3>
                  </div>
                  <div className="space-y-1">
                    {sidebarArticles.map((article, i) => (
                      <NewsCard key={article.url} article={article} index={i} variant="compact" />
                    ))}
                  </div>
                </div>
              )}

              {/* Categories quick nav */}
              <div className="glass rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <FiGlobe className="text-cyan-400 text-sm" />
                  <h3 className="text-[--text-primary] font-bold text-sm">Browse by Topic</h3>
                </div>
                <div className="space-y-1">
                  {CATEGORIES.map(({ id, label, icon: Icon }) => (
                    <button
                      key={id}
                      onClick={() => handleCategory(id)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all ${
                        category === id && !searchQuery
                          ? "bg-indigo-500/15 text-indigo-300 font-medium"
                          : "text-[--text-secondary] hover:text-white hover:bg-white/4"
                      }`}
                    >
                      <Icon className="text-xs flex-shrink-0" />
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* API key notice */}
              <div className="rounded-2xl p-4 border border-amber-500/20 bg-amber-500/5">
                <p className="text-amber-300 text-xs font-semibold mb-1">🔑 Live News</p>
                <p className="text-[--text-muted] text-xs leading-relaxed">
                  Add your free <a href="https://newsapi.org" target="_blank" rel="noreferrer" className="text-indigo-400 underline">NewsAPI key</a> in <code className="text-amber-300">.env</code> for real live articles.
                </p>
              </div>
            </aside>
          </div>
        )}
      </div>

      {/* ── Footer ── */}
      <footer className="border-t border-[--border] mt-16">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <FiZap className="text-indigo-400 text-sm" />
            <span className="text-[--text-secondary] text-sm font-semibold">TruthFeed</span>
            <span className="text-[--text-muted] text-xs">— Stay Updated. Stay Informed. Stay Ahead.</span>
          </div>
          <p className="text-[--text-muted] text-xs">© 2026 TruthFeed. Built with React & NewsAPI.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
