// ─── SkeletonCard ─────────────────────────────────────────────────────────────
// Premium shimmer skeleton matching the new NewsCard dimensions.

import React from "react";

const SkeletonCard = React.memo(() => (
  <div className="flex flex-col rounded-2xl overflow-hidden border border-slate-700/20"
    style={{ background: "rgba(15,23,42,0.7)" }}>
    {/* Image */}
    <div className="h-52 skeleton" />

    <div className="p-4 space-y-3">
      {/* Author */}
      <div className="w-28 h-3 skeleton rounded-full" />
      {/* Headline */}
      <div className="space-y-2">
        <div className="w-full h-4 skeleton rounded-lg" />
        <div className="w-4/5 h-4 skeleton rounded-lg" />
      </div>
      {/* Description */}
      <div className="space-y-1.5">
        <div className="w-full h-3 skeleton rounded" />
        <div className="w-full h-3 skeleton rounded" />
        <div className="w-2/3 h-3 skeleton rounded" />
      </div>
      {/* Buttons */}
      <div className="flex gap-2 pt-2 border-t border-slate-700/20">
        <div className="flex-1 h-9 skeleton rounded-xl" />
        <div className="w-9 h-9 skeleton rounded-xl" />
        <div className="w-9 h-9 skeleton rounded-xl" />
        <div className="w-9 h-9 skeleton rounded-xl" />
      </div>
    </div>
  </div>
));

SkeletonCard.displayName = "SkeletonCard";
export default SkeletonCard;
