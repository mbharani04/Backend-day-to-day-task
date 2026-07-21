// ─── SkeletonCard ─────────────────────────────────────────────────────────────
// Animated placeholder shown while news articles are loading.
// Matches the dimensions of NewsCard for a smooth transition.

import React from "react";

// React.memo: prevents re-render since SkeletonCard has no props that change
const SkeletonCard = React.memo(() => {
  return (
    <div className="bg-slate-800/60 rounded-2xl overflow-hidden border border-slate-700/40 animate-pulse">
      {/* Image placeholder */}
      <div className="w-full h-48 bg-slate-700/60"></div>

      <div className="p-4 space-y-3">
        {/* Category badge placeholder */}
        <div className="w-20 h-5 bg-slate-700/60 rounded-full"></div>

        {/* Headline placeholder – 2 lines */}
        <div className="space-y-2">
          <div className="w-full h-4 bg-slate-700/60 rounded"></div>
          <div className="w-3/4 h-4 bg-slate-700/60 rounded"></div>
        </div>

        {/* Description placeholder – 3 lines */}
        <div className="space-y-2 pt-1">
          <div className="w-full h-3 bg-slate-700/40 rounded"></div>
          <div className="w-full h-3 bg-slate-700/40 rounded"></div>
          <div className="w-2/3 h-3 bg-slate-700/40 rounded"></div>
        </div>

        {/* Meta info placeholder */}
        <div className="flex justify-between pt-2">
          <div className="w-24 h-3 bg-slate-700/40 rounded"></div>
          <div className="w-16 h-3 bg-slate-700/40 rounded"></div>
        </div>

        {/* Action buttons placeholder */}
        <div className="flex gap-2 pt-2">
          <div className="flex-1 h-8 bg-slate-700/40 rounded-lg"></div>
          <div className="w-8 h-8 bg-slate-700/40 rounded-lg"></div>
          <div className="w-8 h-8 bg-slate-700/40 rounded-lg"></div>
          <div className="w-8 h-8 bg-slate-700/40 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
});

SkeletonCard.displayName = "SkeletonCard";
export default SkeletonCard;
