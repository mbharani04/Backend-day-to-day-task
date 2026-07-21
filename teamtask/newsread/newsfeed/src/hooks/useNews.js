// ─── useNews Hook ─────────────────────────────────────────────────────────────
// Encapsulates news fetching logic with loading, error, and pagination states.
// Used by the Home page for the main news feed.

import { useState, useEffect, useCallback } from "react";
import { fetchTopHeadlines, fetchEverything } from "../services/newsService";

/**
 * @param {string} category   - active category filter
 * @param {string} searchQuery - active search string
 */
const useNews = (category = "general", searchQuery = "") => {
  // ── State ──────────────────────────────────────────────────────────────────
  const [articles, setArticles] = useState([]);      // accumulated articles
  const [page, setPage] = useState(1);               // current page number
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);     // true while fetching
  const [error, setError] = useState(null);          // error message or null
  const [hasMore, setHasMore] = useState(true);      // false when all pages exhausted

  // ── Reset when category or search changes ─────────────────────────────────
  // useEffect: side-effect to reset articles & page whenever filter changes
  useEffect(() => {
    setArticles([]);
    setPage(1);
    setHasMore(true);
    setError(null);
  }, [category, searchQuery]);

  // ── Core fetch function ───────────────────────────────────────────────────
  // useCallback: prevents recreation of fetchNews on every render
  const fetchNews = useCallback(
    async (pageNum) => {
      if (loading) return;            // prevent overlapping requests
      setLoading(true);
      setError(null);

      try {
        let result;
        if (searchQuery && searchQuery.trim().length >= 2) {
          // Search mode: use /everything endpoint
          result = await fetchEverything(searchQuery, pageNum, 12);
        } else {
          // Category mode: use /top-headlines endpoint
          result = await fetchTopHeadlines(category, pageNum, 12);
        }

        const { articles: newArticles, totalResults: total } = result;

        setTotalResults(total);

        // Append articles (infinite scroll — never replace)
        setArticles((prev) => {
          // De-duplicate by URL to avoid repeat cards on re-fetch
          const existingUrls = new Set(prev.map((a) => a.url));
          const unique = newArticles.filter((a) => !existingUrls.has(a.url));
          return pageNum === 1 ? newArticles : [...prev, ...unique];
        });

        // If we received fewer articles than requested, no more pages
        if (newArticles.length < 12 || articles.length + newArticles.length >= total) {
          setHasMore(false);
        }
      } catch (err) {
        setError(err.message || "Failed to fetch news. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [category, searchQuery]
  );

  // ── Fetch on page/category/search change ─────────────────────────────────
  // useEffect: triggers fetch whenever page number changes (includes initial load)
  useEffect(() => {
    fetchNews(page);
  }, [page, fetchNews]);

  // ── Load next page (called by InfiniteScroll) ─────────────────────────────
  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      setPage((prev) => prev + 1);
    }
  }, [loading, hasMore]);

  // ── Retry on error ────────────────────────────────────────────────────────
  const retryLoad = useCallback(() => {
    setError(null);
    fetchNews(page);
  }, [fetchNews, page]);

  return { articles, loading, error, hasMore, loadMore, totalResults, retryLoad };
};

export default useNews;
