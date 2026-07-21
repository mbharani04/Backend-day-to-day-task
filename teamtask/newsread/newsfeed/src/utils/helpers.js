// ─── Helper Utility Functions ─────────────────────────────────────────────────
// Centralised pure functions used across the application.

/**
 * Format an ISO date string to a readable format
 * e.g. "2024-06-15T10:30:00Z" → "Jun 15, 2024"
 */
export const formatDate = (dateString) => {
  if (!dateString) return "Unknown Date";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

/**
 * Truncate text to a given character limit and append ellipsis
 */
export const truncateText = (text, limit = 120) => {
  if (!text) return "No description available.";
  return text.length > limit ? text.slice(0, limit) + "..." : text;
};

/**
 * Get initials from a full name (up to 2 characters)
 * e.g. "John Doe" → "JD"
 */
export const getInitials = (name = "") => {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

/**
 * Generate a unique ID from a string (used as a stable article key)
 */
export const generateId = (str = "") => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32-bit int
  }
  return Math.abs(hash).toString(36);
};

/**
 * Get time ago string from a date
 * e.g. "2 hours ago"
 */
export const timeAgo = (dateString) => {
  if (!dateString) return "";
  const now = new Date();
  const past = new Date(dateString);
  const diffMs = now - past;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHrs = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHrs < 24) return `${diffHrs}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return formatDate(dateString);
};

/**
 * Capitalize the first letter of a string
 */
export const capitalize = (str = "") =>
  str.charAt(0).toUpperCase() + str.slice(1);

/**
 * Debounce a function call
 */
export const debounce = (fn, delay = 400) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

/**
 * Get the most frequent item in an array
 * Used for "Favorite Category" in Dashboard
 */
export const getMostFrequent = (arr) => {
  if (!arr || arr.length === 0) return null;
  const freq = arr.reduce((acc, val) => {
    acc[val] = (acc[val] || 0) + 1;
    return acc;
  }, {});
  return Object.entries(freq).sort((a, b) => b[1] - a[1])[0]?.[0] || null;
};
