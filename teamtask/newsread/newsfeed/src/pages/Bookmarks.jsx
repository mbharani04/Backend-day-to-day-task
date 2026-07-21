// ─── Bookmarks Page ───────────────────────────────────────────────────────────
import { useState, useMemo, useCallback } from "react";
import { FiSearch, FiTrash2, FiBookmark, FiGrid, FiList, FiX } from "react-icons/fi";
import Navbar    from "../components/Navbar";
import NewsCard  from "../components/NewsCard";
import { useBookmarks } from "../context/BookmarkContext";

const Bookmarks = () => {
  const { bookmarks, clearAll } = useBookmarks();
  const [search, setSearch]     = useState("");
  const [view, setView]         = useState("grid"); // "grid" | "list"

  const filtered = useMemo(() => {
    if (!search.trim()) return bookmarks;
    const q = search.toLowerCase();
    return bookmarks.filter(
      a =>
        a.title?.toLowerCase().includes(q) ||
        a.source?.name?.toLowerCase().includes(q) ||
        a.category?.toLowerCase().includes(q)
    );
  }, [bookmarks, search]);

  const handleClearAll = useCallback(() => {
    if (window.confirm("Remove all bookmarks?")) clearAll();
  }, [clearAll]);

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <FiBookmark className="text-[11px]" /> Your Library
            </div>
            <h1 className="text-3xl font-bold text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
              Bookmarks
            </h1>
            <p className="text-[--text-muted] text-sm mt-0.5">
              {bookmarks.length} {bookmarks.length === 1 ? "article" : "articles"} saved
            </p>
          </div>

          {bookmarks.length > 0 && (
            <div className="flex items-center gap-2">
              {/* View toggle */}
              <div className="flex items-center gap-1 p-1 rounded-lg bg-[--bg-surface2] border border-[--border]">
                <button
                  onClick={() => setView("grid")}
                  className={`w-8 h-7 flex items-center justify-center rounded text-xs transition-all ${view === "grid" ? "bg-indigo-500 text-white" : "text-[--text-muted] hover:text-white"}`}
                >
                  <FiGrid />
                </button>
                <button
                  onClick={() => setView("list")}
                  className={`w-8 h-7 flex items-center justify-center rounded text-xs transition-all ${view === "list" ? "bg-indigo-500 text-white" : "text-[--text-muted] hover:text-white"}`}
                >
                  <FiList />
                </button>
              </div>
              <button onClick={handleClearAll} className="btn-ghost text-rose-400 border-rose-500/20 hover:bg-rose-500/10">
                <FiTrash2 className="text-xs" /> Clear All
              </button>
            </div>
          )}
        </div>

        {/* Search */}
        {bookmarks.length > 0 && (
          <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-[--bg-surface] border border-[--border] focus-within:border-indigo-500/50 transition-all mb-6 max-w-md">
            <FiSearch className="text-[--text-muted] text-sm" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search saved articles..."
              className="flex-1 bg-transparent text-sm text-[--text-primary] placeholder-[--text-muted] outline-none"
            />
            {search && (
              <button onClick={() => setSearch("")} className="text-[--text-muted] hover:text-white">
                <FiX className="text-xs" />
              </button>
            )}
          </div>
        )}

        {/* Empty state */}
        {bookmarks.length === 0 && (
          <div className="flex flex-col items-center justify-center py-28 gap-5 anim-scale-in">
            <div className="w-20 h-20 rounded-2xl bg-[--bg-surface2] border border-[--border] flex items-center justify-center">
              <FiBookmark className="text-3xl text-[--text-muted]" />
            </div>
            <div className="text-center">
              <p className="text-white font-semibold text-xl mb-2">No bookmarks yet</p>
              <p className="text-[--text-muted] text-sm max-w-xs leading-relaxed">
                Browse the news feed and click the bookmark icon on any article to save it here.
              </p>
            </div>
          </div>
        )}

        {/* No search results */}
        {bookmarks.length > 0 && filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="text-4xl">🔍</div>
            <p className="text-white font-semibold">No results for "{search}"</p>
            <button onClick={() => setSearch("")} className="btn-ghost">Clear search</button>
          </div>
        )}

        {/* Grid / List */}
        {filtered.length > 0 && (
          <div className={view === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            : "space-y-3"}>
            {filtered.map((article, i) => (
              <NewsCard
                key={article.url}
                article={article}
                index={i}
                variant={view === "list" ? "compact" : "default"}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookmarks;
