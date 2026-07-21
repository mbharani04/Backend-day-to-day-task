// ─── ArticleModal — Premium animated modal ────────────────────────────────────
import { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { FiX, FiExternalLink, FiBookmark, FiHeart, FiShare2, FiClock, FiUser, FiCalendar } from "react-icons/fi";
import { useBookmarks } from "../context/BookmarkContext";
import { formatDate, timeAgo } from "../utils/helpers";

const ArticleModal = ({ article, onClose }) => {
  const { toggleBookmark, toggleLike, isBookmarked, isLiked } = useBookmarks();
  const bookmarked = isBookmarked(article.url);
  const liked      = isLiked(article.url);

  useEffect(() => { document.body.style.overflow = "hidden"; return () => { document.body.style.overflow = ""; }; }, []);
  useEffect(() => {
    const fn = e => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  const onBookmark = useCallback(() => toggleBookmark(article), [article, toggleBookmark]);
  const onLike     = useCallback(() => toggleLike(article),     [article, toggleLike]);
  const onVisit    = useCallback(() => window.open(article.url, "_blank", "noopener,noreferrer"), [article.url]);

  const FALLBACK = "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200";
  const catClass  = `badge badge-${article.category || "general"}`;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 anim-fade-in">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={onClose} />

      {/* Modal */}
      <div
        className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl anim-modal-up"
        style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", boxShadow: "0 32px 80px rgba(0,0,0,0.8)" }}
      >
        {/* Hero image */}
        <div className="relative h-56 sm:h-64 w-full flex-shrink-0">
          <img
            src={article.urlToImage || FALLBACK}
            alt={article.title}
            className="w-full h-full object-cover"
            onError={e => { e.target.src = FALLBACK; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[--bg-surface] via-black/30 to-transparent" />

          {/* Top row */}
          <div className="absolute top-4 left-4">
            <span className={catClass}>{article.category || "general"}</span>
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/70 transition-all"
          >
            <FiX className="text-sm" />
          </button>

          <div className="absolute bottom-4 left-4">
            <p className="text-indigo-300 text-xs font-bold uppercase tracking-wider">
              {article.source?.name}
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          <h1 className="text-[--text-primary] text-xl font-bold leading-tight mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>
            {article.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap gap-2 mb-5">
            {article.author && (
              <span className="flex items-center gap-1.5 bg-[--bg-surface2] border border-[--border] text-[--text-secondary] text-xs px-3 py-1.5 rounded-full">
                <FiUser className="text-[11px] text-indigo-400" /> {article.author}
              </span>
            )}
            <span className="flex items-center gap-1.5 bg-[--bg-surface2] border border-[--border] text-[--text-secondary] text-xs px-3 py-1.5 rounded-full">
              <FiCalendar className="text-[11px] text-cyan-400" /> {formatDate(article.publishedAt)}
            </span>
            <span className="flex items-center gap-1.5 bg-[--bg-surface2] border border-[--border] text-[--text-secondary] text-xs px-3 py-1.5 rounded-full">
              <FiClock className="text-[11px] text-amber-400" /> {timeAgo(article.publishedAt)}
            </span>
          </div>

          <div className="divider mb-5" />

          {article.description && (
            <p className="text-[--text-primary] text-sm leading-relaxed mb-4 font-medium">
              {article.description}
            </p>
          )}
          {article.content && (
            <p className="text-[--text-secondary] text-sm leading-relaxed mb-5">
              {article.content.replace(/\s?\[\+\d+ chars\]$/, "")}
            </p>
          )}

          {/* Info note */}
          <div className="bg-indigo-500/8 border border-indigo-500/15 rounded-xl p-4 mb-5 text-xs text-[--text-muted]">
            📌 This is a preview. Click <strong className="text-[--text-primary]">Visit Full Article</strong> to read the complete story on the source website.
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-2">
            <button onClick={onVisit} id="modal-visit" className="btn-primary">
              <FiExternalLink className="text-xs" /> Visit Full Article
            </button>
            <button
              onClick={onBookmark}
              id="modal-bookmark"
              className={`btn-ghost ${bookmarked ? "text-amber-400 border-amber-500/30 bg-amber-500/8" : ""}`}
            >
              <FiBookmark className={`text-xs ${bookmarked ? "fill-amber-400" : ""}`} />
              {bookmarked ? "Saved" : "Save"}
            </button>
            <button
              onClick={onLike}
              id="modal-like"
              className={`btn-ghost ${liked ? "text-rose-400 border-rose-500/30 bg-rose-500/8" : ""}`}
            >
              <FiHeart className={`text-xs ${liked ? "fill-rose-400" : ""}`} />
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
