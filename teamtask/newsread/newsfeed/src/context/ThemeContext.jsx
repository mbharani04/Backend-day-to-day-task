// ─── ThemeContext ─────────────────────────────────────────────────────────────
// Provides light/dark theme toggle with localStorage persistence.
// Applies the "dark" class to the <html> element for Tailwind dark mode.

import { createContext, useContext, useState, useEffect } from "react";

export const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  // useState: initialised from localStorage so theme persists across refreshes
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("tf_theme");
    if (saved) return saved === "dark";
    // Respect OS preference as default
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // useEffect: apply/remove "dark" class on <html> whenever isDark changes
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("tf_theme", isDark ? "dark" : "light");
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook for easy consumption
export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};
