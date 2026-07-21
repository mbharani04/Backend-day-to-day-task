// ─── useInfiniteScroll Hook ───────────────────────────────────────────────────
// Uses the Intersection Observer API to detect when the user scrolls near
// the bottom of the list and triggers the loadMore callback.
// This approach is more performant than listening to scroll events.

import { useEffect, useRef, useCallback } from "react";

/**
 * @param {Function} loadMore  - function to call when sentinel enters viewport
 * @param {boolean}  hasMore   - stop observing if no more pages
 * @param {boolean}  loading   - avoid triggering during active fetch
 * @returns {React.RefObject}  - attach to the sentinel element at list bottom
 */
const useInfiniteScroll = (loadMore, hasMore, loading) => {
  // useRef: holds reference to the sentinel DOM element without triggering re-renders
  const loaderRef = useRef(null);

  // useCallback: stable reference to loadMore prevents unnecessary Observer recreation
  const stableLoadMore = useCallback(loadMore, [loadMore]);

  useEffect(() => {
    const sentinel = loaderRef.current;
    if (!sentinel) return;

    // Create an IntersectionObserver that fires when sentinel enters viewport
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && hasMore && !loading) {
          stableLoadMore();
        }
      },
      {
        root: null,       // viewport as root
        rootMargin: "200px", // start loading 200px before hitting bottom
        threshold: 0.1,   // trigger when 10% of sentinel is visible
      }
    );

    observer.observe(sentinel);

    // Cleanup: disconnect observer when component unmounts or deps change
    return () => {
      observer.disconnect();
    };
  }, [hasMore, loading, stableLoadMore]);

  return loaderRef;
};

export default useInfiniteScroll;
