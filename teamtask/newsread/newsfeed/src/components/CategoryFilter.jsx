// ─── CategoryFilter ───────────────────────────────────────────────────────────
// Renders category pill buttons. Rendered from an array of objects (no hardcoding).

import React from "react";
import {
  FiMonitor,
  FiBriefcase,
  FiActivity,
  FiFlag,
  FiZap,
  FiFilm,
  FiHeart,
  FiGlobe,
  FiStar,
  FiList,
} from "react-icons/fi";

// Array of objects — all categories defined here, no hardcoded JSX
export const CATEGORIES = [
  { id: "general",       label: "Top Stories",    icon: FiStar },
  { id: "technology",    label: "Technology",      icon: FiMonitor },
  { id: "business",      label: "Business",        icon: FiBriefcase },
  { id: "sports",        label: "Sports",          icon: FiActivity },
  { id: "science",       label: "Science",         icon: FiZap },
  { id: "entertainment", label: "Entertainment",   icon: FiFilm },
  { id: "health",        label: "Health",          icon: FiHeart },
  { id: "politics",      label: "Politics",        icon: FiFlag },
  { id: "world",         label: "World",           icon: FiGlobe },
];

const CategoryFilter = ({ activeCategory, onSelect }) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
      {/* map() — render all categories dynamically from array */}
      {CATEGORIES.map(({ id, label, icon: Icon }) => {
        const isActive = activeCategory === id;
        return (
          <button
            key={id}
            id={`category-${id}`}
            onClick={() => onSelect(id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 flex-shrink-0
              ${
                isActive
                  ? "bg-violet-600 text-white shadow-lg shadow-violet-500/30 scale-105"
                  : "bg-slate-800/70 text-slate-400 hover:bg-slate-700 hover:text-white border border-slate-700/50"
              }
            `}
          >
            <Icon className="text-xs" />
            {label}
          </button>
        );
      })}
    </div>
  );
};

export default CategoryFilter;
