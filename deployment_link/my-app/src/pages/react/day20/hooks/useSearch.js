import { useState, useMemo } from "react";

/**
 * useSearch — custom hook to filter a list based on a search query
 * @param {Array} list       — original data array
 * @param {string[]} keys    — keys to search within each item
 */
const useSearch = (list, keys = []) => {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return list;
    const lower = query.toLowerCase();
    return list.filter((item) =>
      keys.some((key) => String(item[key] ?? "").toLowerCase().includes(lower))
    );
  }, [query, list, keys]);

  const handleChange = (e) => setQuery(e.target.value);
  const clearSearch = () => setQuery("");

  return { query, filtered, handleChange, clearSearch };
};

export default useSearch;
