// ─── Bookmark Reducer ─────────────────────────────────────────────────────────
// Manages bookmarks and likes via useReducer for predictable state updates.

// Action type constants
export const ACTIONS = {
  ADD_BOOKMARK: "ADD_BOOKMARK",
  REMOVE_BOOKMARK: "REMOVE_BOOKMARK",
  LIKE: "LIKE",
  UNLIKE: "UNLIKE",
  CLEAR_ALL: "CLEAR_ALL",
  SET_BOOKMARKS: "SET_BOOKMARKS",
  SET_LIKES: "SET_LIKES",
};

/**
 * Initial state shape
 */
export const initialState = {
  bookmarks: [],  // Array of article objects
  likes: [],      // Array of article objects
};

/**
 * Pure reducer function – never mutates state directly
 */
const bookmarkReducer = (state, action) => {
  switch (action.type) {
    // ── ADD_BOOKMARK ──────────────────────────────────────────────────────────
    case ACTIONS.ADD_BOOKMARK: {
      // Prevent duplicates using the article url as the unique key
      const exists = state.bookmarks.some(
        (b) => b.url === action.payload.url
      );
      if (exists) return state;
      return {
        ...state,
        bookmarks: [action.payload, ...state.bookmarks],
      };
    }

    // ── REMOVE_BOOKMARK ───────────────────────────────────────────────────────
    case ACTIONS.REMOVE_BOOKMARK: {
      return {
        ...state,
        bookmarks: state.bookmarks.filter(
          (b) => b.url !== action.payload.url
        ),
      };
    }

    // ── LIKE ──────────────────────────────────────────────────────────────────
    case ACTIONS.LIKE: {
      const exists = state.likes.some((l) => l.url === action.payload.url);
      if (exists) return state;
      return {
        ...state,
        likes: [action.payload, ...state.likes],
      };
    }

    // ── UNLIKE ────────────────────────────────────────────────────────────────
    case ACTIONS.UNLIKE: {
      return {
        ...state,
        likes: state.likes.filter((l) => l.url !== action.payload.url),
      };
    }

    // ── CLEAR_ALL ─────────────────────────────────────────────────────────────
    case ACTIONS.CLEAR_ALL: {
      return {
        ...state,
        bookmarks: [],
      };
    }

    // ── Hydrate from localStorage ─────────────────────────────────────────────
    case ACTIONS.SET_BOOKMARKS: {
      return { ...state, bookmarks: action.payload };
    }

    case ACTIONS.SET_LIKES: {
      return { ...state, likes: action.payload };
    }

    default:
      return state;
  }
};

export default bookmarkReducer;
