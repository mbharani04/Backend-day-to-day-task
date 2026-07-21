// ─── NewsCard ─────────────────────────────────────────────────────────────────
// Renders a single news article with all interactive controls.
// React.memo prevents re-render if the article and callbacks haven't changed.
// "Read More" opens an ArticleModal instead of navigating to external URL,
// which avoids broken links with mock data.

import React, { useState, useCallback } from "react";
import {
  FiBookmark,
  FiHeart,
  FiShare2,
  FiExternalLink,
  FiClock,
  FiUser,
  FiTag,
} from "react-icons/fi";
import { useBookmarks } from "../context/BookmarkContext";
import { useAuth } from "../context/AuthContext";
import { formatDate, truncateText, timeAgo } from "../utils/helpers";
import ArticleModal from "./ArticleModal";

const NewsCard = React.memo(({ article }) => {
  const { toggleBookmark, toggleLike, isBookmarked, isLiked } = useBookmarks();
  const { user } = useAuth();
  const [imgError, setImgError] = useState(false);
  const [shareMsg, setShareMsg] = useState("");
  // useState: controls whether the Article Detail Modal is open
  const [modalOpen, setModalOpen] = useState(false);

  // Derive bookmark/like state
  const bookmarked = isBookmarked(article.url);
  const liked = isLiked(article.url);

  // ── Track recently viewed ─────────────────────────────────────────────────
  const trackView = useCallback(() => {
    if (!user) return;
    const key = `tf_recent_${user.id}`;
    const history = JSON.parse(localStorage.getItem(key) || "[]");
    const exists = history.some((h) => h.url === article.url);
    if (!exists) {
      const updated = [article, ...history].slice(0, 10);
      localStorage.setItem(key, JSON.stringify(updated));
    }
  }, [article, user]);

  // useCallback: stable handlers so React.memo bails out when not needed
  const handleOpenModal = useCallback(() => {
    trackView();
    setModalOpen(true);
  }, [trackView]);

  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  const handleBookmark = useCallback(() => {
    toggleBookmark(article);
  }, [article, toggleBookmark]);

  const handleLike = useCallback(() => {
    toggleLike(article);
  }, [article, toggleLike]);

  const handleShare = useCallback(async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: article.title, url: article.url });
      } else {
        await navigator.clipboard.writeText(article.url);
        setShareMsg("Link copied!");
        setTimeout(() => setShareMsg(""), 2000);
      }
    } catch { /* user cancelled */ }
  }, [article]);

  const FALLBACK_IMG =
    "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800";

  return (
    <>
      <article className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700/40 rounded-2xl overflow-hidden hover:border-violet-500/40 hover:shadow-xl hover:shadow-violet-500/10 transition-all duration-300 flex flex-col cursor-pointer">

        {/* ── Article Image ── */}
        <div
          className="relative overflow-hidden h-48 flex-shrink-0"
          onClick={handleOpenModal}
        >
          <img
            src={imgError ? FALLBACK_IMG : article.urlToImage || FALLBACK_IMG}
            alt={article.title}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          {/* Category badge */}
          <span className="absolute top-3 left-3 bg-violet-600/90 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full capitalize">
            {article.category || "general"}
          </span>
          {/* Time badge */}
          <span className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-slate-200 text-xs px-2.5 py-1 rounded-full flex items-center gap-1">
            <FiClock className="text-xs" />
            {timeAgo(article.publishedAt)}
          </span>
        </div>

        {/* ── Content ── */}
        <div className="p-4 flex flex-col flex-1">
          {/* Source & Author */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-violet-400 text-xs font-semibold uppercase tracking-wide">
              {article.source?.name || "Unknown Source"}
            </span>
            {article.author && (
              <span className="flex items-center gap-1 text-slate-500 text-xs">
                <FiUser className="text-xs" />
                {truncateText(article.author, 20)}
              </span>
            )}
          </div>

          {/* Headline — clicking opens modal */}
          <h2
            onClick={handleOpenModal}
            className="text-white font-bold text-base leading-snug mb-2 group-hover:text-violet-300 transition-colors line-clamp-2"
          >
            {article.title}
          </h2>

          {/* Description */}
          <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
            {truncateText(article.description || article.content, 150)}
          </p>

          {/* Published Date */}
          <div className="flex items-center gap-1 text-slate-600 text-xs mb-4">
            <FiTag className="text-xs" />
            <span>{formatDate(article.publishedAt)}</span>
          </div>

          {/* ── Action Buttons ── */}
          <div className="flex items-center gap-2 mt-auto">
            {/* Read More — opens modal */}
            <button
              id={`read-more-${article.url?.slice(-8)}`}
              onClick={handleOpenModal}
              className="flex-1 flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold py-2 px-3 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-violet-500/30"
            >
              <FiExternalLink className="text-xs" />
              Read More
            </button>

            {/* Bookmark */}
            <button
              id={`bookmark-${article.url?.slice(-8)}`}
              onClick={handleBookmark}
              title={bookmarked ? "Remove Bookmark" : "Bookmark"}
              className={`p-2 rounded-xl transition-all duration-200 ${
                bookmarked
                  ? "bg-amber-500/20 text-amber-400 hover:bg-amber-500/30"
                  : "bg-slate-700/60 text-slate-400 hover:bg-slate-700 hover:text-white"
              }`}
            >
              <FiBookmark className={`text-sm ${bookmarked ? "fill-amber-400" : ""}`} />
            </button>

            {/* Like */}
            <button
              id={`like-${article.url?.slice(-8)}`}
              onClick={handleLike}
              title={liked ? "Unlike" : "Like"}
              className={`p-2 rounded-xl transition-all duration-200 ${
                liked
                  ? "bg-rose-500/20 text-rose-400 hover:bg-rose-500/30"
                  : "bg-slate-700/60 text-slate-400 hover:bg-slate-700 hover:text-white"
              }`}
            >
              <FiHeart className={`text-sm ${liked ? "fill-rose-400" : ""}`} />
            </button>

            {/* Share */}
            <button
              onClick={handleShare}
              title="Share"
              className="p-2 rounded-xl bg-slate-700/60 text-slate-400 hover:bg-slate-700 hover:text-white transition-all duration-200 relative"
            >
              <FiShare2 className="text-sm" />
              {shareMsg && (
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-green-400 text-xs px-2 py-1 rounded whitespace-nowrap">
                  {shareMsg}
                </span>
              )}
            </button>
          </div>
        </div>
      </article>

      {/* ── Article Detail Modal ── */}
      {/* Rendered via Portal into document.body, only when open */}
      {modalOpen && (
        <ArticleModal article={article} onClose={handleCloseModal} />
      )}
    </>
  );
});

NewsCard.displayName = "NewsCard";
export default NewsCard;
