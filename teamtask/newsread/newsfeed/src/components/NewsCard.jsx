// ─── NewsCard ─────────────────────────────────────────────────────────────────
// Premium animated news card with glassmorphism, hover lift, and glow effects.

import React, { useState, useCallback } from "react";
import {
  FiBookmark, FiHeart, FiShare2,
  FiExternalLink, FiClock, FiUser,
} from "react-icons/fi";
import { useBookmarks }  from "../context/BookmarkContext";
import { useAuth }       from "../context/AuthContext";
import { truncateText, timeAgo } from "../utils/helpers";
import ArticleModal      from "./ArticleModal";

const CATEGORY_COLORS = {
  technology:    "from-blue-600/80 to-cyan-500/80",
  business:      "from-emerald-600/80 to-teal-500/80",
  sports:        "from-orange-600/80 to-amber-500/80",
  science:       "from-violet-600/80 to-purple-500/80",
  health:        "from-rose-600/80 to-pink-500/80",
  entertainment: "from-fuchsia-600/80 to-pink-500/80",
  politics:      "from-red-600/80 to-rose-500/80",
  world:         "from-sky-600/80 to-blue-500/80",
  general:       "from-violet-600/80 to-cyan-500/80",
};

const NewsCard = React.memo(({ article, index = 0 }) => {
  const { toggleBookmark, toggleLike, isBookmarked, isLiked } = useBookmarks();
  const { user }     = useAuth();
  const [imgError, setImgError]   = useState(false);
  const [shareMsg, setShareMsg]   = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const bookmarked = isBookmarked(article.url);
  const liked      = isLiked(article.url);
  const catColor   = CATEGORY_COLORS[article.category] || CATEGORY_COLORS.general;
  const staggerClass = `stagger-${Math.min((index % 8) + 1, 8)}`;

  const trackView = useCallback(() => {
    if (!user) return;
    const key = `tf_recent_${user.id}`;
    const h   = JSON.parse(localStorage.getItem(key) || "[]");
    if (!h.some(x => x.url === article.url)) {
      localStorage.setItem(key, JSON.stringify([article, ...h].slice(0, 10)));
    }
  }, [article, user]);

  const handleOpenModal  = useCallback(() => { trackView(); setModalOpen(true);  }, [trackView]);
  const handleCloseModal = useCallback(() => setModalOpen(false), []);
  const handleBookmark   = useCallback(() => toggleBookmark(article), [article, toggleBookmark]);
  const handleLike       = useCallback(() => toggleLike(article),     [article, toggleLike]);

  const handleShare = useCallback(async () => {
    try {
      if (navigator.share) { await navigator.share({ title: article.title, url: article.url }); }
      else {
        await navigator.clipboard.writeText(article.url);
        setShareMsg("Copied!"); setTimeout(() => setShareMsg(""), 2000);
      }
    } catch { /* cancelled */ }
  }, [article]);

  const FALLBACK = "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800";

  return (
    <>
      <article
        className={`group relative flex flex-col rounded-2xl overflow-hidden card-hover border-animated animate-fade-in-up ${staggerClass}`}
        style={{
          background: "linear-gradient(135deg, rgba(15,23,42,0.85) 0%, rgba(15,23,42,0.95) 100%)",
          border: "1px solid rgba(148,163,184,0.08)",
          boxShadow: "0 2px 20px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.04) inset",
        }}
      >
        {/* ── Image ── */}
        <div
          className="relative h-52 overflow-hidden flex-shrink-0 cursor-pointer"
          onClick={handleOpenModal}
        >
          {/* Skeleton while image loads */}
          {!imgLoaded && (
            <div className="absolute inset-0 skeleton" />
          )}

          <img
            src={imgError ? FALLBACK : article.urlToImage || FALLBACK}
            alt={article.title}
            onError={() => { setImgError(true); setImgLoaded(true); }}
            onLoad={() => setImgLoaded(true)}
            className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
            loading="lazy"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

          {/* Category badge */}
          <div className="absolute top-3 left-3">
            <span className={`bg-gradient-to-r ${catColor} backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full capitalize shadow-lg`}>
              {article.category || "general"}
            </span>
          </div>

          {/* Time badge */}
          <div className="absolute top-3 right-3">
            <span className="flex items-center gap-1 bg-black/50 backdrop-blur-md text-slate-300 text-[10px] px-2 py-1 rounded-full">
              <FiClock className="text-[9px]" />
              {timeAgo(article.publishedAt)}
            </span>
          </div>

          {/* Source at image bottom */}
          <div className="absolute bottom-2 left-3">
            <span className="text-[10px] font-bold text-violet-300 uppercase tracking-wider">
              {article.source?.name}
            </span>
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-violet-600/0 group-hover:bg-violet-600/10 transition-colors duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <FiExternalLink className="text-white text-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* ── Content ── */}
        <div className="flex flex-col flex-1 p-4 gap-2">
          {/* Author */}
          {article.author && (
            <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
              <FiUser className="text-[10px] text-violet-400" />
              <span className="truncate">{truncateText(article.author, 28)}</span>
            </div>
          )}

          {/* Headline */}
          <h2
            onClick={handleOpenModal}
            className="text-white font-bold text-[15px] leading-snug group-hover:text-violet-200 transition-colors duration-300 line-clamp-2 cursor-pointer"
          >
            {article.title}
          </h2>

          {/* Description */}
          <p className="text-slate-500 text-xs leading-relaxed line-clamp-2 flex-1">
            {truncateText(article.description || article.content, 130)}
          </p>

          {/* ── Action Row ── */}
          <div className="flex items-center gap-2 pt-2 border-t border-slate-700/30 mt-auto">
            {/* Read More */}
            <button
              onClick={handleOpenModal}
              className="btn-glow flex-1 flex items-center justify-center gap-1.5 bg-gradient-to-r from-violet-600 to-violet-500 text-white text-xs font-semibold py-2.5 px-3 rounded-xl shadow-lg shadow-violet-500/20"
            >
              <FiExternalLink className="text-[11px]" />
              Read More
            </button>

            {/* Bookmark */}
            <button
              id={`bm-${article.url?.slice(-6)}`}
              onClick={handleBookmark}
              className={`relative w-9 h-9 flex items-center justify-center rounded-xl transition-all duration-300 ${
                bookmarked
                  ? "bg-amber-500/20 text-amber-400 shadow-inner shadow-amber-500/10"
                  : "bg-slate-700/50 text-slate-400 hover:bg-amber-500/10 hover:text-amber-400"
              }`}
            >
              <FiBookmark className={`text-sm transition-all ${bookmarked ? "fill-amber-400 scale-110" : ""}`} />
              {bookmarked && (
                <span className="absolute inset-0 rounded-xl animate-ping bg-amber-500/20 pointer-events-none" />
              )}
            </button>

            {/* Like */}
            <button
              id={`lk-${article.url?.slice(-6)}`}
              onClick={handleLike}
              className={`relative w-9 h-9 flex items-center justify-center rounded-xl transition-all duration-300 ${
                liked
                  ? "bg-rose-500/20 text-rose-400"
                  : "bg-slate-700/50 text-slate-400 hover:bg-rose-500/10 hover:text-rose-400"
              }`}
            >
              <FiHeart className={`text-sm transition-all ${liked ? "fill-rose-400 scale-110" : ""}`} />
              {liked && (
                <span className="absolute inset-0 rounded-xl animate-ping bg-rose-500/20 pointer-events-none" />
              )}
            </button>

            {/* Share */}
            <button
              onClick={handleShare}
              className="relative w-9 h-9 flex items-center justify-center rounded-xl bg-slate-700/50 text-slate-400 hover:bg-slate-600 hover:text-white transition-all duration-200"
            >
              <FiShare2 className="text-sm" />
              {shareMsg && (
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 border border-slate-700 text-green-400 text-[10px] px-2 py-1 rounded-lg whitespace-nowrap shadow-xl animate-bounce-in">
                  {shareMsg}
                </span>
              )}
            </button>
          </div>
        </div>
      </article>

      {modalOpen && <ArticleModal article={article} onClose={handleCloseModal} />}
    </>
  );
});

NewsCard.displayName = "NewsCard";
export default NewsCard;
