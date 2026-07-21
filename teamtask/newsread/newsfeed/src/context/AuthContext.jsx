// ─── AuthContext ──────────────────────────────────────────────────────────────
// Provides authentication state and actions throughout the app.
// Uses useReducer for predictable state transitions.

import { createContext, useContext, useReducer, useEffect } from "react";

// ── Context ───────────────────────────────────────────────────────────────────
export const AuthContext = createContext(null);

// ── Action types ──────────────────────────────────────────────────────────────
const AUTH_ACTIONS = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  REGISTER: "REGISTER",
};

// ── Reducer ───────────────────────────────────────────────────────────────────
const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN:
      return { ...state, user: action.payload, isAuthenticated: true };
    case AUTH_ACTIONS.LOGOUT:
      return { ...state, user: null, isAuthenticated: false };
    default:
      return state;
  }
};

// ── Initial State ─────────────────────────────────────────────────────────────
const getInitialState = () => {
  try {
    const user = JSON.parse(localStorage.getItem("tf_current_user"));
    return { user, isAuthenticated: !!user };
  } catch {
    return { user: null, isAuthenticated: false };
  }
};

// ── Provider ──────────────────────────────────────────────────────────────────
export const AuthProvider = ({ children }) => {
  // useReducer: manages complex auth state with predictable transitions
  const [state, dispatch] = useReducer(authReducer, getInitialState());

  /**
   * Register a new user
   * Stores user in the "tf_users" array in localStorage
   * @returns {{ success: boolean, error?: string }}
   */
  const register = ({ fullName, email, password }) => {
    try {
      const users = JSON.parse(localStorage.getItem("tf_users") || "[]");

      // Check for duplicate email
      const exists = users.some(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      );
      if (exists) {
        return { success: false, error: "Email already registered." };
      }

      const newUser = {
        id: Date.now().toString(),
        fullName,
        email: email.toLowerCase(),
        password,                          // Note: plain text for assessment purposes
        joinedAt: new Date().toISOString(),
        avatar: null,
      };

      users.push(newUser);
      localStorage.setItem("tf_users", JSON.stringify(users));

      return { success: true };
    } catch {
      return { success: false, error: "Registration failed. Please try again." };
    }
  };

  /**
   * Login with email and password
   * @returns {{ success: boolean, error?: string }}
   */
  const login = (email, password) => {
    try {
      const users = JSON.parse(localStorage.getItem("tf_users") || "[]");
      const user = users.find(
        (u) =>
          u.email.toLowerCase() === email.toLowerCase() &&
          u.password === password
      );

      if (!user) {
        return { success: false, error: "Invalid email or password." };
      }

      // Store current user (exclude password from session)
      const sessionUser = { ...user };
      localStorage.setItem("tf_current_user", JSON.stringify(sessionUser));

      dispatch({ type: AUTH_ACTIONS.LOGIN, payload: sessionUser });
      return { success: true };
    } catch {
      return { success: false, error: "Login failed. Please try again." };
    }
  };

  /**
   * Logout the current user
   */
  const logout = () => {
    localStorage.removeItem("tf_current_user");
    dispatch({ type: AUTH_ACTIONS.LOGOUT });
  };

  /**
   * Update user profile in localStorage and context
   */
  const updateUser = (updates) => {
    try {
      const updated = { ...state.user, ...updates };
      localStorage.setItem("tf_current_user", JSON.stringify(updated));

      // Also update in users array
      const users = JSON.parse(localStorage.getItem("tf_users") || "[]");
      const idx = users.findIndex((u) => u.id === state.user.id);
      if (idx !== -1) {
        users[idx] = { ...users[idx], ...updates };
        localStorage.setItem("tf_users", JSON.stringify(users));
      }

      dispatch({ type: AUTH_ACTIONS.LOGIN, payload: updated });
    } catch (err) {
      console.warn("updateUser error:", err);
    }
  };

  // useEffect: sync localStorage when auth state changes externally (e.g. tab sync)
  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === "tf_current_user") {
        const user = e.newValue ? JSON.parse(e.newValue) : null;
        dispatch({
          type: user ? AUTH_ACTIONS.LOGIN : AUTH_ACTIONS.LOGOUT,
          payload: user,
        });
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const value = {
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    login,
    logout,
    register,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// ── Custom Hook ───────────────────────────────────────────────────────────────
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
