// ─── SortDropdown ─────────────────────────────────────────────────────────────
// Dropdown to select sort order. Options rendered from an array of objects.

import React, { useState } from "react";
import { FiChevronDown, FiCheck } from "react-icons/fi";

// Array of objects — sort options, no hardcoded JSX
export const SORT_OPTIONS = [
  { id: "latest",    label: "Latest First",     description: "Newest articles first" },
  { id: "oldest",    label: "Oldest First",      description: "Oldest articles first" },
  { id: "popular",   label: "Most Popular",      description: "By relevancy & engagement" },
];

const SortDropdown = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);

  const selected = SORT_OPTIONS.find((o) => o.id === value) || SORT_OPTIONS[0];

  const handleSelect = (id) => {
    onChange(id);
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        id="sort-dropdown"
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-2 px-4 py-2 bg-slate-800/70 border border-slate-700/50 rounded-xl text-sm text-slate-300 hover:border-violet-500/50 hover:text-white transition-all"
      >
        <span>{selected.label}</span>
        <FiChevronDown
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 w-52 bg-slate-800 border border-slate-700 rounded-xl shadow-xl z-50 overflow-hidden">
          {/* map() — render all sort options dynamically */}
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              onClick={() => handleSelect(opt.id)}
              className="w-full flex items-start gap-3 px-4 py-3 text-left hover:bg-slate-700/60 transition-colors"
            >
              <div className="flex-1">
                <p className="text-sm font-medium text-white">{opt.label}</p>
                <p className="text-xs text-slate-500 mt-0.5">{opt.description}</p>
              </div>
              {selected.id === opt.id && (
                <FiCheck className="text-violet-400 mt-0.5 flex-shrink-0" />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Backdrop to close dropdown */}
      {open && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setOpen(false)}
        />
      )}
    </div>
  );
};

export default SortDropdown;
