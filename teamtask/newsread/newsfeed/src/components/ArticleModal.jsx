// ─── ArticleModal ─────────────────────────────────────────────────────────────
// Premium animated article detail modal with glassmorphism and smooth entrance.

import { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import {
  FiX, FiExternalLink, FiBookmark, FiHeart, FiShare2,
  FiClock, FiUser, FiCalendar, FiArrowUpRight,
} from "react-icons/fi";
import { useBookmarks } from "../context/BookmarkContext";
import { formatDate, timeAgo } from "../utils/helpers";

const CATEGORY_GRADIENTS = {
  technology:    "from-blue-900/40 via-cyan-900/20",
  business:      "from-emerald-900/40 via-teal-900/20",
  sports:        "from-orange-900/40 via-amber-900/20",
  science:       "from-violet-900/40 via-purple-900/20",
  health:        "from-rose-900/40 via-pink-900/20",
  entertainment: "from-fuchsia-900/40 via-pink-900/20",
  politics:      "from-red-900/40 via-rose-900/20",
  world:         "from-sky-900/40 via-blue-900/20",
  general:       "from-violet-900/40 via-slate-900/20",
};

const ArticleModal = ({ article, onClose }) => {
  const { toggleBookmark, toggleLike, isBookmarked, isLiked } = useBookmarks();
  const bookmarked = isBookmarked(article.url);
  const liked      = isLiked(article.url);
  const catGrad    = CATEGORY_GRADIENTS[article.category] || CATEGORY_GRADIENTS.general;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    const fn = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  const handleBookmark   = useCallback(() => toggleBookmark(article), [article, toggleBookmark]);
  const handleLike       = useCallback(() => toggleLike(article),     [article, toggleLike]);
  const handleVisit      = useCallback(() => window.open(article.url, "_blank", "noopener,noreferrer"), [article.url]);

  const FALLBACK = "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200";

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-backdrop-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl animate-modal-in bg-gradient-to-b ${catGrad} to-slate-950`}
        style={{
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 25px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.05)",
        }}
      >
        {/* ── Hero image ── */}
        <div className="relative h-60 sm:h-72 w-full overflow-hidden rounded-t-3xl flex-shrink-0">
          <img
            src={article.urlToImage || FALLBACK}
            alt={article.title}
            className="w-full h-full object-cover"
            onError={e => { e.target.src = FALLBACK; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          {/* Category */}
          <span className="absolute top-4 left-4 bg-violet-600/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full capitalize shadow-lg">
            {article.category || "general"}
          </span>

          {/* Close */}
          <button
            id="modal-close"
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/60 hover:scale-110 transition-all duration-200"
          >
            <FiX className="text-lg" />
          </button>

          {/* Source */}
          <div className="absolute bottom-4 left-4">
            <p className="text-violet-300 text-sm font-bold uppercase tracking-wider">
              {article.source?.name}
            </p>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="p-6 sm:p-8 space-y-5">
          {/* Headline */}
          <h1 className="text-white text-xl sm:text-2xl font-extrabold leading-tight" style={{fontFamily:"'Syne',sans-serif"}}>
            {article.title}
          </h1>

          {/* Meta chips */}
          <div className="flex flex-wrap gap-2">
            {article.author && (
              <span className="flex items-center gap-1.5 bg-slate-800/60 border border-slate-700/40 text-slate-400 text-xs px-3 py-1.5 rounded-full">
                <FiUser className="text-violet-400 text-[11px]" />
                {article.author}
              </span>
            )}
            <span className="flex items-center gap-1.5 bg-slate-800/60 border border-slate-700/40 text-slate-400 text-xs px-3 py-1.5 rounded-full">
              <FiCalendar className="text-cyan-400 text-[11px]" />
              {formatDate(article.publishedAt)}
            </span>
            <span className="flex items-center gap-1.5 bg-slate-800/60 border border-slate-700/40 text-slate-400 text-xs px-3 py-1.5 rounded-full">
              <FiClock className="text-amber-400 text-[11px]" />
              {timeAgo(article.publishedAt)}
            </span>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-slate-600/50 to-transparent" />

          {/* Description */}
          {article.description && (
            <p className="text-slate-200 text-base leading-relaxed font-medium">
              {article.description}
            </p>
          )}

          {/* Content */}
          {article.content && (
            <p className="text-slate-400 text-sm leading-relaxed">
              {article.content.replace(/\s?\[\+\d+ chars\]$/, "")}
            </p>
          )}

          {/* Info card */}
          <div className="flex items-start gap-3 bg-violet-600/10 border border-violet-500/20 rounded-2xl p-4">
            <FiArrowUpRight className="text-violet-400 text-lg flex-shrink-0 mt-0.5" />
            <p className="text-slate-400 text-sm leading-relaxed">
              This is a <span className="text-violet-300 font-semibold">preview</span>.
              Click <span className="text-white font-bold">"Visit Full Article"</span> to read the complete story on the original source.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              id="modal-visit"
              onClick={handleVisit}
              className="btn-glow flex items-center gap-2 bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-bold px-6 py-3 rounded-2xl shadow-lg shadow-violet-500/30 text-sm"
            >
              <FiExternalLink />
              Visit Full Article
            </button>

            <button
              id="modal-bookmark"
              onClick={handleBookmark}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-semibold border transition-all duration-300 ${
                bookmarked
                  ? "bg-amber-500/20 border-amber-500/40 text-amber-300 shadow-lg shadow-amber-500/10"
                  : "bg-slate-800/60 border-slate-700/40 text-slate-400 hover:border-amber-500/30 hover:text-amber-300"
              }`}
            >
              <FiBookmark className={bookmarked ? "fill-amber-300" : ""} />
              {bookmarked ? "Saved" : "Save"}
            </button>

            <button
              id="modal-like"
              onClick={handleLike}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-semibold border transition-all duration-300 ${
                liked
                  ? "bg-rose-500/20 border-rose-500/40 text-rose-300 shadow-lg shadow-rose-500/10"
                  : "bg-slate-800/60 border-slate-700/40 text-slate-400 hover:border-rose-500/30 hover:text-rose-300"
              }`}
            >
              <FiHeart className={liked ? "fill-rose-300" : ""} />
              {liked ? "Liked" : "Like"}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ArticleModal;
