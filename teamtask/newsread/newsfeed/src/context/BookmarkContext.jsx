// ─── BookmarkContext ──────────────────────────────────────────────────────────
// Manages bookmarks and likes using useReducer for predictable state updates.
// Persists all data to localStorage. Avoids prop drilling via Context.

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import bookmarkReducer, {
  initialState,
  ACTIONS,
} from "../reducers/bookmarkReducer";

export const BookmarkContext = createContext(null);

export const BookmarkProvider = ({ children }) => {
  // useReducer: centralised state machine for bookmark/like operations
  const [state, dispatch] = useReducer(bookmarkReducer, initialState);

  // ── Hydrate from localStorage on mount ───────────────────────────────────
  // useEffect: runs once on mount to load persisted data into reducer state
  useEffect(() => {
    try {
      const savedBookmarks = JSON.parse(
        localStorage.getItem("tf_bookmarks") || "[]"
      );
      const savedLikes = JSON.parse(
        localStorage.getItem("tf_likes") || "[]"
      );
      dispatch({ type: ACTIONS.SET_BOOKMARKS, payload: savedBookmarks });
      dispatch({ type: ACTIONS.SET_LIKES, payload: savedLikes });
    } catch (err) {
      console.warn("BookmarkContext hydration error:", err);
    }
  }, []);

  // ── Persist to localStorage when state changes ────────────────────────────
  useEffect(() => {
    localStorage.setItem("tf_bookmarks", JSON.stringify(state.bookmarks));
  }, [state.bookmarks]);

  useEffect(() => {
    localStorage.setItem("tf_likes", JSON.stringify(state.likes));
  }, [state.likes]);

  // ── Actions (useCallback: stable references, no needless re-renders) ───────

  const addBookmark = useCallback(
    (article) => dispatch({ type: ACTIONS.ADD_BOOKMARK, payload: article }),
    []
  );

  const removeBookmark = useCallback(
    (article) => dispatch({ type: ACTIONS.REMOVE_BOOKMARK, payload: article }),
    []
  );

  const toggleBookmark = useCallback(
    (article) => {
      const isBookmarked = state.bookmarks.some((b) => b.url === article.url);
      if (isBookmarked) {
        dispatch({ type: ACTIONS.REMOVE_BOOKMARK, payload: article });
      } else {
        dispatch({ type: ACTIONS.ADD_BOOKMARK, payload: article });
      }
    },
    [state.bookmarks]
  );

  const toggleLike = useCallback(
    (article) => {
      const isLiked = state.likes.some((l) => l.url === article.url);
      if (isLiked) {
        dispatch({ type: ACTIONS.UNLIKE, payload: article });
      } else {
        dispatch({ type: ACTIONS.LIKE, payload: article });
      }
    },
    [state.likes]
  );

  const clearAllBookmarks = useCallback(
    () => dispatch({ type: ACTIONS.CLEAR_ALL }),
    []
  );

  // ── Derived values (useMemo: avoid recalculation on every render) ──────────

  // useMemo: recompute bookmark count only when bookmarks array changes
  const bookmarkCount = useMemo(
    () => state.bookmarks.length,
    [state.bookmarks]
  );

  // useMemo: recompute like count only when likes array changes
  const likeCount = useMemo(() => state.likes.length, [state.likes]);

  const isBookmarked = useCallback(
    (url) => state.bookmarks.some((b) => b.url === url),
    [state.bookmarks]
  );

  const isLiked = useCallback(
    (url) => state.likes.some((l) => l.url === url),
    [state.likes]
  );

  const value = {
    bookmarks: state.bookmarks,
    likes: state.likes,
    bookmarkCount,
    likeCount,
    addBookmark,
    removeBookmark,
    toggleBookmark,
    toggleLike,
    clearAllBookmarks,
    isBookmarked,
    isLiked,
  };

  return (
    <BookmarkContext.Provider value={value}>
      {children}
    </BookmarkContext.Provider>
  );
};

// Custom hook
export const useBookmarks = () => {
  const ctx = useContext(BookmarkContext);
  if (!ctx) throw new Error("useBookmarks must be used within BookmarkProvider");
  return ctx;
};
