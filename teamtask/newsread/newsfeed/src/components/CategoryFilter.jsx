// ─── CategoryFilter ───────────────────────────────────────────────────────────
// Premium pill buttons with glow active state and icons.

import React from "react";
import {
  FiMonitor, FiBriefcase, FiActivity, FiFlag, FiZap,
  FiFilm, FiHeart, FiGlobe, FiStar,
} from "react-icons/fi";

export const CATEGORIES = [
  { id: "general",       label: "Top Stories",  icon: FiStar,      glow: "shadow-violet-500/40"  },
  { id: "technology",    label: "Technology",   icon: FiMonitor,   glow: "shadow-cyan-500/40"    },
  { id: "business",      label: "Business",     icon: FiBriefcase, glow: "shadow-emerald-500/40" },
  { id: "sports",        label: "Sports",       icon: FiActivity,  glow: "shadow-orange-500/40"  },
  { id: "science",       label: "Science",      icon: FiZap,       glow: "shadow-violet-500/40"  },
  { id: "entertainment", label: "Entertainment",icon: FiFilm,      glow: "shadow-fuchsia-500/40" },
  { id: "health",        label: "Health",       icon: FiHeart,     glow: "shadow-rose-500/40"    },
  { id: "politics",      label: "Politics",     icon: FiFlag,      glow: "shadow-red-500/40"     },
  { id: "world",         label: "World",        icon: FiGlobe,     glow: "shadow-sky-500/40"     },
];

const CategoryFilter = ({ activeCategory, onSelect }) => (
  <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
    {CATEGORIES.map(({ id, label, icon: Icon, glow }) => {
      const active = activeCategory === id;
      return (
        <button
          key={id}
          id={`cat-${id}`}
          onClick={() => onSelect(id)}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap flex-shrink-0 transition-all duration-300 ${
            active
              ? `bg-gradient-to-r from-violet-600 to-violet-500 text-white scale-105 shadow-lg ${glow}`
              : "bg-slate-800/60 border border-slate-700/40 text-slate-400 hover:text-white hover:border-violet-500/40 hover:bg-slate-700/60"
          }`}
        >
          <Icon className="text-[11px]" />
          {label}
        </button>
      );
    })}
  </div>
);

export default CategoryFilter;
