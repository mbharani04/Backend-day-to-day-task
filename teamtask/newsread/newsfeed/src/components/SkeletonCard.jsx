// ─── SkeletonCard ─────────────────────────────────────────────────────────────
import React from "react";

const SkeletonCard = React.memo(() => (
  <div className="rounded-2xl overflow-hidden border border-[--border] flex flex-col" style={{ background: "var(--bg-surface)" }}>
    <div className="h-48 skeleton" />
    <div className="p-4 space-y-3">
      <div className="flex gap-2">
        <div className="w-16 h-4 skeleton rounded-full" />
        <div className="w-10 h-4 skeleton rounded-full ml-auto" />
      </div>
      <div className="space-y-2">
        <div className="w-full h-4 skeleton rounded-lg" />
        <div className="w-4/5 h-4 skeleton rounded-lg" />
      </div>
      <div className="space-y-1.5">
        <div className="w-full h-3 skeleton rounded" />
        <div className="w-3/4 h-3 skeleton rounded" />
      </div>
      <div className="flex gap-2 pt-2 border-t border-[--border]">
        <div className="flex-1 h-8 skeleton rounded-lg" />
        <div className="w-8 h-8 skeleton rounded-lg" />
        <div className="w-8 h-8 skeleton rounded-lg" />
        <div className="w-8 h-8 skeleton rounded-lg" />
      </div>
    </div>
  </div>
));

SkeletonCard.displayName = "SkeletonCard";
export default SkeletonCard;
