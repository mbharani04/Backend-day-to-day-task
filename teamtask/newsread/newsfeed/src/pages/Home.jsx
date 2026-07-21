// ─── Home Page ────────────────────────────────────────────────────────────────
// Main news feed with infinite scroll, search, category filter, and sort.
// All React hooks used with comments explaining their purpose.

import { useState, useMemo, useCallback, useEffect } from "react";
import { FiAlertTriangle, FiRefreshCw, FiTrendingUp } from "react-icons/fi";
import Navbar from "../components/Navbar";
import NewsCard from "../components/NewsCard";
import SkeletonCard from "../components/SkeletonCard";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import SortDropdown from "../components/SortDropdown";
import useNews from "../hooks/useNews";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user } = useAuth();

  // ── Filter & Sort State ──────────────────────────────────────────────────
  // useState: track selected category, search query, and sort option
  const [category, setCategory] = useState("general");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("latest");

  // ── Fetch news via custom hook ────────────────────────────────────────────
  const { articles, loading, error, hasMore, loadMore, totalResults } =
    useNews(category, searchQuery);

  // ── Infinite scroll sentinel ref ─────────────────────────────────────────
  const loaderRef = useInfiniteScroll(loadMore, hasMore, loading);

  // ── Track search history ──────────────────────────────────────────────────
  // useEffect: persist search query to localStorage when it changes
  useEffect(() => {
    if (!searchQuery || !user) return;
    const key = `tf_search_history_${user.id}`;
    const history = JSON.parse(localStorage.getItem(key) || "[]");
    if (!history.includes(searchQuery)) {
      const updated = [searchQuery, ...history].slice(0, 20);
      localStorage.setItem(key, JSON.stringify(updated));
    }
  }, [searchQuery, user]);

  // ── Sorted articles ───────────────────────────────────────────────────────
  // useMemo: only recompute sorted list when articles or sortBy changes
  const sortedArticles = useMemo(() => {
    // sort() — JavaScript array method
    const arr = [...articles];
    if (sortBy === "latest") {
      return arr.sort(
        (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
      );
    }
    if (sortBy === "oldest") {
      return arr.sort(
        (a, b) => new Date(a.publishedAt) - new Date(b.publishedAt)
      );
    }
    // "popular" — sort by content length as a popularity proxy
    return arr.sort(
      (a, b) => (b.content?.length || 0) - (a.content?.length || 0)
    );
  }, [articles, sortBy]);

  // ── Stable callbacks ──────────────────────────────────────────────────────
  // useCallback: prevents SearchBar and CategoryFilter from re-rendering unnecessarily
  const handleSearch = useCallback((q) => {
    setSearchQuery(q);
    if (q) setCategory("general"); // Reset category when searching
  }, []);

  const handleCategory = useCallback((cat) => {
    setCategory(cat);
    setSearchQuery(""); // Reset search when changing category
  }, []);

  const handleSort = useCallback((s) => setSortBy(s), []);

  // Skeleton array — rendered while loading the first page
  const SKELETON_COUNT = 8;

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ── Hero Header ── */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <FiTrendingUp className="text-violet-400 text-xl" />
            <span className="text-violet-400 text-sm font-semibold uppercase tracking-wide">
              Live Feed
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-1">
            {searchQuery
              ? `Results for "${searchQuery}"`
              : `${category === "general" ? "Top Stories" : category.charAt(0).toUpperCase() + category.slice(1)} News`}
          </h1>
          {totalResults > 0 && (
            <p className="text-slate-500 text-sm">
              {totalResults.toLocaleString()} articles found
            </p>
          )}
        </div>

        {/* ── Controls Row ── */}
        <div className="flex flex-col gap-4 mb-8">
          {/* Search bar */}
          <SearchBar onSearch={handleSearch} />

          {/* Category + Sort in same row */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <CategoryFilter
                activeCategory={category}
                onSelect={handleCategory}
              />
            </div>
            <SortDropdown value={sortBy} onChange={handleSort} />
          </div>
        </div>

        {/* ── Error State ── */}
        {error && (
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            <div className="w-16 h-16 bg-rose-500/10 rounded-full flex items-center justify-center">
              <FiAlertTriangle className="text-rose-400 text-2xl" />
            </div>
            <div className="text-center">
              <p className="text-white font-semibold mb-1">Failed to load news</p>
              <p className="text-slate-400 text-sm max-w-sm">{error}</p>

            </div>
            <button
              onClick={() => window.location.reload()}
              className="flex items-center gap-2 px-6 py-2.5 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-sm font-medium transition-all"
            >
              <FiRefreshCw className="text-sm" />
              Try Again
            </button>
          </div>
        )}

        {/* ── News Grid ── */}
        {!error && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {/* Skeleton cards while loading first page */}
              {loading && articles.length === 0
                ? Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                    <SkeletonCard key={i} />
                  ))
                : null}

              {/* map() — render all articles dynamically, never hardcoded */}
              {sortedArticles.map((article, idx) => (
                <NewsCard
                  key={article.url || idx}
                  article={article}
                />
              ))}
            </div>

            {/* Empty state */}
            {!loading && sortedArticles.length === 0 && !error && (
              <div className="flex flex-col items-center justify-center py-20 gap-3">
                <div className="text-5xl">📰</div>
                <p className="text-white font-semibold">No articles found</p>
                <p className="text-slate-400 text-sm">
                  Try a different search term or category
                </p>
              </div>
            )}

            {/* ── Infinite Scroll Sentinel ── */}
            {/* This div is observed by IntersectionObserver in useInfiniteScroll */}
            <div ref={loaderRef} className="py-8 flex justify-center">
              {loading && articles.length > 0 && (
                <div className="flex items-center gap-3 text-slate-400 text-sm">
                  <span className="w-5 h-5 border-2 border-violet-500/30 border-t-violet-500 rounded-full animate-spin"></span>
                  Loading more articles...
                </div>
              )}
              {!hasMore && articles.length > 0 && (
                <p className="text-slate-600 text-sm">
                  ✓ You&apos;ve reached the end
                </p>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Home;
