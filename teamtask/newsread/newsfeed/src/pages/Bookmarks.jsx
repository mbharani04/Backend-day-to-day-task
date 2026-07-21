// ─── Bookmarks Page ───────────────────────────────────────────────────────────
// View, search, remove, and clear all bookmarks stored in localStorage.

import { useState, useMemo, useCallback } from "react";
import { FiBookmark, FiSearch, FiTrash2, FiX, FiExternalLink } from "react-icons/fi";
import Navbar from "../components/Navbar";
import NewsCard from "../components/NewsCard";
import { useBookmarks } from "../context/BookmarkContext";

const Bookmarks = () => {
  const { bookmarks, clearAllBookmarks, bookmarkCount } = useBookmarks();
  const [searchQuery, setSearchQuery] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  // useMemo: filter bookmarks only when bookmarks array or search changes
  const filteredBookmarks = useMemo(() => {
    if (!searchQuery.trim()) return bookmarks;
    const q = searchQuery.toLowerCase();
    // filter() — JavaScript array method
    return bookmarks.filter(
      (b) =>
        b.title?.toLowerCase().includes(q) ||
        b.source?.name?.toLowerCase().includes(q) ||
        b.author?.toLowerCase().includes(q) ||
        b.category?.toLowerCase().includes(q) ||
        b.description?.toLowerCase().includes(q)
    );
  }, [bookmarks, searchQuery]);

  // useCallback: stable handler for clear all
  const handleClearAll = useCallback(() => {
    clearAllBookmarks();
    setShowConfirm(false);
  }, [clearAllBookmarks]);

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ── Header ── */}
        <div className="flex items-start justify-between mb-8 gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <FiBookmark className="text-amber-400 text-xl" />
              <span className="text-amber-400 text-sm font-semibold uppercase tracking-wide">
                Your Library
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-white">Bookmarks</h1>
            <p className="text-slate-400 text-sm mt-1">
              {bookmarkCount} article{bookmarkCount !== 1 ? "s" : ""} saved
            </p>
          </div>

          {bookmarkCount > 0 && (
            <button
              id="clear-bookmarks-btn"
              onClick={() => setShowConfirm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500/20 rounded-xl text-sm font-medium transition-all"
            >
              <FiTrash2 />
              Clear All
            </button>
          )}
        </div>

        {/* ── Confirm Dialog ── */}
        {showConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 max-w-sm w-full shadow-xl">
              <h3 className="text-white font-bold text-lg mb-2">Clear all bookmarks?</h3>
              <p className="text-slate-400 text-sm mb-6">
                This will permanently remove all {bookmarkCount} bookmarked articles.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 py-2.5 bg-slate-700 text-white rounded-xl text-sm hover:bg-slate-600 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleClearAll}
                  className="flex-1 py-2.5 bg-rose-600 text-white rounded-xl text-sm hover:bg-rose-500 transition-all"
                >
                  Clear All
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── Search Bar ── */}
        {bookmarkCount > 0 && (
          <div className="flex items-center gap-3 bg-slate-800/60 border border-slate-700/60 rounded-xl px-4 py-3 mb-8 focus-within:border-amber-500/50 focus-within:ring-2 focus-within:ring-amber-500/10 transition-all">
            <FiSearch className="text-slate-400" />
            <input
              id="bookmark-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search your bookmarks..."
              className="flex-1 bg-transparent text-white placeholder-slate-500 text-sm outline-none"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="text-slate-400 hover:text-white">
                <FiX />
              </button>
            )}
          </div>
        )}

        {/* ── Empty State ── */}
        {bookmarkCount === 0 && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-20 h-20 bg-amber-500/10 rounded-full flex items-center justify-center">
              <FiBookmark className="text-amber-400 text-3xl" />
            </div>
            <div className="text-center">
              <p className="text-white font-semibold text-lg mb-2">No bookmarks yet</p>
              <p className="text-slate-400 text-sm max-w-xs">
                Browse the news feed and click the bookmark icon on any article to save it here.
              </p>
            </div>
          </div>
        )}

        {/* ── No search results ── */}
        {bookmarkCount > 0 && filteredBookmarks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-400">No bookmarks match &quot;{searchQuery}&quot;</p>
          </div>
        )}

        {/* ── Bookmarks Grid ── */}
        {/* map() — render all bookmarks dynamically */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBookmarks.map((article, idx) => (
            <NewsCard key={article.url || idx} article={article} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Bookmarks;
