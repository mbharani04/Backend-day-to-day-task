// ─── ArticleModal ─────────────────────────────────────────────────────────────
// Full-screen modal that displays a complete article view.
// Opens when "Read More" is clicked — avoids broken external mock URLs.
// Demonstrates: useEffect (lock body scroll), useCallback, React.memo, Portal.

import { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import {
  FiX,
  FiExternalLink,
  FiBookmark,
  FiHeart,
  FiShare2,
  FiClock,
  FiUser,
  FiCalendar,
} from "react-icons/fi";
import { useBookmarks } from "../context/BookmarkContext";
import { formatDate, timeAgo } from "../utils/helpers";

const ArticleModal = ({ article, onClose }) => {
  const { toggleBookmark, toggleLike, isBookmarked, isLiked } = useBookmarks();

  const bookmarked = isBookmarked(article.url);
  const liked = isLiked(article.url);

  // useEffect: lock body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // useEffect: close on Escape key press
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  // useCallback: stable handlers
  const handleBookmark = useCallback(
    () => toggleBookmark(article),
    [article, toggleBookmark]
  );

  const handleLike = useCallback(
    () => toggleLike(article),
    [article, toggleLike]
  );

  const handleShare = useCallback(async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: article.title, url: article.url });
      } else {
        await navigator.clipboard.writeText(article.url);
      }
    } catch { /* cancelled */ }
  }, [article]);

  const handleVisitSource = useCallback(() => {
    window.open(article.url, "_blank", "noopener,noreferrer");
  }, [article.url]);

  const FALLBACK_IMG =
    "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200";

  // Render modal into document.body via Portal so it overlays everything
  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center p-4 sm:p-8 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label={article.title}
    >
      {/* ── Backdrop ── */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* ── Modal Card ── */}
      <div className="relative z-10 w-full max-w-3xl bg-slate-900 border border-slate-700/60 rounded-2xl shadow-2xl overflow-hidden my-4">

        {/* ── Hero Image ── */}
        <div className="relative h-56 sm:h-72 w-full">
          <img
            src={article.urlToImage || FALLBACK_IMG}
            alt={article.title}
            className="w-full h-full object-cover"
            onError={(e) => { e.target.src = FALLBACK_IMG; }}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />

          {/* Category + time badges */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="bg-violet-600/90 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full capitalize">
              {article.category || "general"}
            </span>
          </div>

          {/* Close button */}
          <button
            id="modal-close-btn"
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center bg-black/50 backdrop-blur-sm text-white rounded-full hover:bg-black/70 transition-all"
            aria-label="Close modal"
          >
            <FiX className="text-lg" />
          </button>

          {/* Source on image bottom */}
          <div className="absolute bottom-4 left-4">
            <span className="text-violet-300 text-sm font-bold uppercase tracking-wide">
              {article.source?.name || "Unknown Source"}
            </span>
          </div>
        </div>

        {/* ── Content ── */}
        <div className="p-6 sm:p-8">

          {/* Headline */}
          <h1 className="text-white text-xl sm:text-2xl font-extrabold leading-tight mb-4">
            {article.title}
          </h1>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-4 text-slate-400 text-sm mb-6 pb-6 border-b border-slate-700/50">
            {article.author && (
              <span className="flex items-center gap-1.5">
                <FiUser className="text-violet-400" />
                {article.author}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <FiCalendar className="text-cyan-400" />
              {formatDate(article.publishedAt)}
            </span>
            <span className="flex items-center gap-1.5">
              <FiClock className="text-amber-400" />
              {timeAgo(article.publishedAt)}
            </span>
          </div>

          {/* Description */}
          {article.description && (
            <p className="text-slate-200 text-base leading-relaxed mb-4 font-medium">
              {article.description}
            </p>
          )}

          {/* Content */}
          {article.content && (
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              {/* Strip "[+XXXX chars]" suffix that NewsAPI appends */}
              {article.content.replace(/\s?\[\+\d+ chars\]$/, "")}
            </p>
          )}

          {/* Info box */}
          <div className="bg-slate-800/60 border border-slate-700/40 rounded-xl p-4 mb-6">
            <p className="text-slate-400 text-sm">
              📌 This is a <span className="text-violet-300 font-semibold">preview</span>. 
              Click <span className="text-white font-semibold">"Visit Full Article"</span> below to read the complete story on the original source website.
            </p>
          </div>

          {/* ── Action Buttons ── */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Visit Full Article */}
            <button
              id="modal-visit-source"
              onClick={handleVisitSource}
              className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white font-semibold px-6 py-3 rounded-xl transition-all hover:shadow-lg hover:shadow-violet-500/30"
            >
              <FiExternalLink />
              Visit Full Article
            </button>

            {/* Bookmark */}
            <button
              id="modal-bookmark-btn"
              onClick={handleBookmark}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                bookmarked
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                  : "bg-slate-800 text-slate-400 border border-slate-700 hover:border-amber-500/40 hover:text-amber-300"
              }`}
            >
              <FiBookmark className={bookmarked ? "fill-amber-300" : ""} />
              {bookmarked ? "Bookmarked" : "Bookmark"}
            </button>

            {/* Like */}
            <button
              id="modal-like-btn"
              onClick={handleLike}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                liked
                  ? "bg-rose-500/20 text-rose-300 border border-rose-500/40"
                  : "bg-slate-800 text-slate-400 border border-slate-700 hover:border-rose-500/40 hover:text-rose-300"
              }`}
            >
              <FiHeart className={liked ? "fill-rose-300" : ""} />
              {liked ? "Liked" : "Like"}
            </button>

            {/* Share */}
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-3 rounded-xl font-medium text-sm bg-slate-800 text-slate-400 border border-slate-700 hover:text-white hover:border-slate-500 transition-all"
            >
              <FiShare2 />
              Share
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ArticleModal;
