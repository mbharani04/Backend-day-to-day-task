import { useState } from "react";

/**
 * useLocalStorage — custom hook to sync state with localStorage
 * @param {string} key   — localStorage key
 * @param {*} initialValue
 */
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item !== null ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = typeof value === "function" ? value(storedValue) : value;
      setStoredValue(valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (err) {
      console.error("useLocalStorage error:", err);
    }
  };

  const removeValue = () => {
    localStorage.removeItem(key);
    setStoredValue(initialValue);
  };

  return [storedValue, setValue, removeValue];
};

export default useLocalStorage;
