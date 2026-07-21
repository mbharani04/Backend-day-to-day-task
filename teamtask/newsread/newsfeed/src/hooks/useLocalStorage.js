// ─── useLocalStorage Hook ─────────────────────────────────────────────────────
// Generic hook that syncs React state with localStorage automatically.
// Works like useState but persists across page refreshes.

import { useState } from "react";

/**
 * @param {string} key          - localStorage key
 * @param {*}      initialValue - default value if key doesn't exist
 */
const useLocalStorage = (key, initialValue) => {
  // useState with a lazy initializer — reads from localStorage only once on mount
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`[useLocalStorage] Error reading key "${key}":`, error);
      return initialValue;
    }
  });

  // setValue mirrors useState's setter but also persists to localStorage
  const setValue = (value) => {
    try {
      // Allow value to be a function (same API as useState)
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.warn(`[useLocalStorage] Error writing key "${key}":`, error);
    }
  };

  // removeValue clears the key from storage and resets state
  const removeValue = () => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.warn(`[useLocalStorage] Error removing key "${key}":`, error);
    }
  };

  return [storedValue, setValue, removeValue];
};

export default useLocalStorage;
