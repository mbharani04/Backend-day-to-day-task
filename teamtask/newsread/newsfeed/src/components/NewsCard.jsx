// ─── NewsCard — Premium horizontal + vertical variants ───────────────────────
import React, { useState, useCallback } from "react";
import { FiBookmark, FiHeart, FiShare2, FiExternalLink, FiClock } from "react-icons/fi";
import { useBookmarks }  from "../context/BookmarkContext";
import { useAuth }       from "../context/AuthContext";
import { truncateText, timeAgo } from "../utils/helpers";
import ArticleModal      from "./ArticleModal";

// variant: "default" | "featured" | "compact"
const NewsCard = React.memo(({ article, index = 0, variant = "default" }) => {
  const { toggleBookmark, toggleLike, isBookmarked, isLiked } = useBookmarks();
  const { user }     = useAuth();
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [shareMsg, setShareMsg]   = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const bookmarked = isBookmarked(article.url);
  const liked      = isLiked(article.url);

  const trackView = useCallback(() => {
    if (!user) return;
    const key = `tf_recent_${user.id}`;
    const h   = JSON.parse(localStorage.getItem(key) || "[]");
    if (!h.some(x => x.url === article.url))
      localStorage.setItem(key, JSON.stringify([article, ...h].slice(0, 10)));
  }, [article, user]);

  const open         = useCallback(() => { trackView(); setModalOpen(true); },  [trackView]);
  const close        = useCallback(() => setModalOpen(false), []);
  const onBookmark   = useCallback(() => toggleBookmark(article), [article, toggleBookmark]);
  const onLike       = useCallback(() => toggleLike(article),     [article, toggleLike]);
  const onShare      = useCallback(async () => {
    try {
      if (navigator.share) await navigator.share({ title: article.title, url: article.url });
      else { await navigator.clipboard.writeText(article.url); setShareMsg("Copied!"); setTimeout(() => setShareMsg(""), 2000); }
    } catch { /**/ }
  }, [article]);

  const FALLBACK = "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800";
  const src      = imgError ? FALLBACK : (article.urlToImage || FALLBACK);
  const catClass = `badge badge-${article.category || "general"}`;
  const delay    = Math.min(index % 6, 5);

  // ── FEATURED card (hero-style large card) ──────────────────────────────────
  if (variant === "featured") {
    return (
      <>
        <article
          onClick={open}
          className={`relative w-full rounded-2xl overflow-hidden cursor-pointer group anim-fade-up d-${delay + 1}`}
          style={{ height: "420px" }}
        >
          <div className={`absolute inset-0 skeleton ${imgLoaded ? "opacity-0" : "opacity-100"} transition-opacity`} />
          <img
            src={src}
            alt={article.title}
            onLoad={() => setImgLoaded(true)}
            onError={() => { setImgError(true); setImgLoaded(true); }}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />

          {/* Top badges */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="flex items-center gap-1 bg-rose-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
              <span className="w-1.5 h-1.5 bg-white rounded-full" />
              Featured
            </span>
            <span className={catClass}>{article.category || "general"}</span>
          </div>

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <p className="text-indigo-300 text-xs font-bold uppercase tracking-wider mb-2">
              {article.source?.name}
            </p>
            <h2 className="text-white text-2xl font-bold leading-snug mb-3 clamp-2"
              style={{ fontFamily: "'Syne', sans-serif" }}>
              {article.title}
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed clamp-2 mb-4">
              {article.description}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                <FiClock className="text-[11px]" />
                {timeAgo(article.publishedAt)}
                {article.author && <span className="ml-2">• {truncateText(article.author, 20)}</span>}
              </div>
              <div className="flex items-center gap-2">
                <button onClick={(e) => { e.stopPropagation(); onBookmark(); }}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${bookmarked ? "bg-amber-500/20 text-amber-400" : "bg-white/10 text-white/70 hover:bg-white/20"}`}>
                  <FiBookmark className={`text-xs ${bookmarked ? "fill-amber-400" : ""}`} />
                </button>
                <button onClick={(e) => { e.stopPropagation(); onLike(); }}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${liked ? "bg-rose-500/20 text-rose-400" : "bg-white/10 text-white/70 hover:bg-white/20"}`}>
                  <FiHeart className={`text-xs ${liked ? "fill-rose-400" : ""}`} />
                </button>
                <span className="btn-primary py-2 px-4 text-xs gap-1.5">
                  <FiExternalLink className="text-xs" /> Read More
                </span>
              </div>
            </div>
          </div>
        </article>
        {modalOpen && <ArticleModal article={article} onClose={close} />}
      </>
    );
  }

  // ── COMPACT card (sidebar/trending list item) ──────────────────────────────
  if (variant === "compact") {
    return (
      <>
        <article
          onClick={open}
          className="flex gap-3 p-3 rounded-xl hover:bg-white/4 transition-all cursor-pointer group"
        >
          <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 relative">
            <div className={`absolute inset-0 skeleton ${imgLoaded ? "opacity-0" : "opacity-100"}`} />
            <img
              src={src}
              alt={article.title}
              onLoad={() => setImgLoaded(true)}
              onError={() => { setImgError(true); setImgLoaded(true); }}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[--text-muted] text-[10px] mb-1">{article.source?.name} • {timeAgo(article.publishedAt)}</p>
            <h3 className="text-[--text-primary] text-xs font-semibold leading-snug clamp-2 group-hover:text-indigo-300 transition-colors">
              {article.title}
            </h3>
          </div>
        </article>
        {modalOpen && <ArticleModal article={article} onClose={close} />}
      </>
    );
  }

  // ── DEFAULT card (grid card) ───────────────────────────────────────────────
  return (
    <>
      <article
        className={`card group flex flex-col anim-fade-up d-${delay + 1}`}
        style={{ animationDelay: `${delay * 60}ms` }}
      >
        {/* Image */}
        <div
          className="relative h-48 overflow-hidden flex-shrink-0 cursor-pointer"
          onClick={open}
        >
          <div className={`absolute inset-0 skeleton transition-opacity duration-500 ${imgLoaded ? "opacity-0" : "opacity-100"}`} />
          <img
            src={src}
            alt={article.title}
            onLoad={() => setImgLoaded(true)}
            onError={() => { setImgError(true); setImgLoaded(true); }}
            className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[--bg-base]/80 to-transparent" />
          {/* Category */}
          <div className="absolute top-3 left-3">
            <span className={catClass}>{article.category || "general"}</span>
          </div>
          {/* Time */}
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm text-gray-300 text-[10px] px-2 py-1 rounded-full">
            <FiClock className="text-[9px]" />
            {timeAgo(article.publishedAt)}
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-col flex-1 p-4">
          {/* Source */}
          <p className="text-indigo-400 text-[10px] font-bold uppercase tracking-wider mb-2">
            {article.source?.name}
            {article.author && <span className="text-[--text-muted] font-normal ml-1.5 normal-case">· {truncateText(article.author, 22)}</span>}
          </p>

          {/* Title */}
          <h3
            onClick={open}
            className="text-[--text-primary] font-bold text-[15px] leading-snug clamp-2 mb-2 cursor-pointer hover:text-indigo-300 transition-colors"
          >
            {article.title}
          </h3>

          {/* Description */}
          <p className="text-[--text-muted] text-xs leading-relaxed clamp-2 flex-1 mb-4">
            {truncateText(article.description || article.content, 140)}
          </p>

          {/* Actions */}
          <div className="flex items-center gap-2 pt-3 border-t border-[--border] mt-auto">
            <button
              onClick={open}
              className="btn-primary flex-1 py-2 text-xs justify-center"
            >
              <FiExternalLink className="text-[11px]" /> Read More
            </button>

            <button
              onClick={onBookmark}
              title={bookmarked ? "Remove bookmark" : "Save"}
              className={`relative w-8 h-8 flex items-center justify-center rounded-lg transition-all ${
                bookmarked ? "bg-amber-500/15 text-amber-400" : "bg-white/5 text-[--text-muted] hover:text-amber-400 hover:bg-amber-500/10"
              }`}
            >
              <FiBookmark className={`text-xs ${bookmarked ? "fill-amber-400" : ""}`} />
              {bookmarked && <span className="absolute inset-0 rounded-lg animate-[ping_1s_ease_1] bg-amber-500/20 pointer-events-none" />}
            </button>

            <button
              onClick={onLike}
              title={liked ? "Unlike" : "Like"}
              className={`relative w-8 h-8 flex items-center justify-center rounded-lg transition-all ${
                liked ? "bg-rose-500/15 text-rose-400" : "bg-white/5 text-[--text-muted] hover:text-rose-400 hover:bg-rose-500/10"
              }`}
            >
              <FiHeart className={`text-xs ${liked ? "fill-rose-400" : ""}`} />
            </button>

            <button
              onClick={onShare}
              className="relative w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 text-[--text-muted] hover:text-white hover:bg-white/10 transition-all"
            >
              <FiShare2 className="text-xs" />
              {shareMsg && (
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[--bg-surface] border border-[--border] text-green-400 text-[10px] px-2 py-1 rounded whitespace-nowrap shadow-xl">
                  {shareMsg}
                </span>
              )}
            </button>
          </div>
        </div>
      </article>

      {modalOpen && <ArticleModal article={article} onClose={close} />}
    </>
  );
});

NewsCard.displayName = "NewsCard";
export default NewsCard;
