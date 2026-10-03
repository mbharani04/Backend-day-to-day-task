import React from 'react';

/**
 * SkillCard Component
 * Modern horizontal skill card matching design reference:
 * - Icon inside a rounded square
 * - Technology name
 * - Small uppercase category label
 * - Subtle border with soft hover lift and radial color glow
 */
export default function SkillCard({
  name,
  category,
  icon: Icon,
  color = '#38bdf8',
  className = ''
}) {
  return (
    <div
      className={`group relative flex items-center gap-3.5 px-4 sm:px-5 py-3 rounded-2xl glass-card bg-[#0d1322]/85 hover:bg-[#131b2e] border border-white/10 hover:border-white/25 transition-all duration-300 hover:scale-[1.03] hover:-translate-y-0.5 hover:shadow-xl select-none shrink-0 cursor-default ${className}`}
      role="listitem"
      aria-label={`${name} - ${category}`}
    >
      {/* Subtle Radial Brand Color Glow on Hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg pointer-events-none -z-10"
        style={{
          background: `radial-gradient(circle at center, ${color}28 0%, transparent 70%)`
        }}
      />

      {/* Technology Icon inside a Rounded Square */}
      <div
        className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white/5 border border-white/10 group-hover:border-white/20 transition-all duration-300 group-hover:scale-105 flex items-center justify-center shrink-0 shadow-inner"
        style={{ color: color }}
      >
        {Icon && <Icon className="text-xl sm:text-2xl" />}
      </div>

      {/* Technology Name & Uppercase Category */}
      <div className="flex flex-col pr-1">
        <span className="font-display font-semibold text-xs sm:text-sm text-gray-100 group-hover:text-white tracking-wide transition-colors whitespace-nowrap">
          {name}
        </span>
        <span className="text-[10px] font-mono text-gray-400 tracking-wider uppercase group-hover:text-brand-accent transition-colors whitespace-nowrap">
          {category}
        </span>
      </div>
    </div>
  );
}
