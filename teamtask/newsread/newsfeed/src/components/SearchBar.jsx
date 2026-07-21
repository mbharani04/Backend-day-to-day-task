// ─── SearchBar ────────────────────────────────────────────────────────────────
// Debounced search input that calls onSearch after a 400ms delay.
// Prevents a new API call on every keystroke.

import React, { useState, useRef, useCallback } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import { debounce } from "../utils/helpers";

const SUGGESTIONS = [
  "Technology",
  "AI",
  "Climate",
  "Election",
  "Stock Market",
  "Sports",
  "Cricket",
  "Health",
  "Science",
  "Entertainment",
];

const SearchBar = ({ onSearch, placeholder = "Search news..." }) => {
  const [value, setValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  // useRef: holds debounced function without recreating it on every render
  const debouncedSearch = useRef(debounce(onSearch, 400)).current;

  // useCallback: stable handler for input change
  const handleChange = useCallback(
    (e) => {
      const val = e.target.value;
      setValue(val);
      debouncedSearch(val);
      setShowSuggestions(val.length === 0);
    },
    [debouncedSearch]
  );

  const handleClear = () => {
    setValue("");
    onSearch("");
    setShowSuggestions(false);
  };

  const handleSuggestion = (s) => {
    setValue(s);
    onSearch(s);
    setShowSuggestions(false);
  };

  const filteredSuggestions = SUGGESTIONS.filter((s) =>
    s.toLowerCase().includes(value.toLowerCase())
  );

  return (
    <div className="relative w-full max-w-xl">
      <div className="flex items-center gap-2 bg-slate-800/80 border border-slate-700/60 rounded-xl px-4 py-2.5 focus-within:border-violet-500/70 focus-within:ring-2 focus-within:ring-violet-500/20 transition-all">
        <FiSearch className="text-slate-400 text-lg flex-shrink-0" />
        <input
          id="search-input"
          type="text"
          value={value}
          onChange={handleChange}
          onFocus={() => setShowSuggestions(value.length === 0)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-white placeholder-slate-500 text-sm outline-none"
          autoComplete="off"
        />
        {value && (
          <button
            onClick={handleClear}
            className="text-slate-400 hover:text-white transition-colors"
            aria-label="Clear search"
          >
            <FiX />
          </button>
        )}
      </div>

      {/* Suggestions dropdown */}
      {showSuggestions && filteredSuggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-slate-800 border border-slate-700 rounded-xl shadow-xl z-50 overflow-hidden">
          <p className="text-xs text-slate-500 px-4 pt-3 pb-1 font-medium uppercase tracking-wide">
            Popular Searches
          </p>
          {filteredSuggestions.map((s) => (
            <button
              key={s}
              onMouseDown={() => handleSuggestion(s)}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-700/60 hover:text-white transition-colors text-left"
            >
              <FiSearch className="text-slate-500 text-xs" />
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
