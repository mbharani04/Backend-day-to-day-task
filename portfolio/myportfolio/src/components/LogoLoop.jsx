import React from 'react';
import './LogoLoop.css';

/**
 * LogoLoop Component
 * React Bits inspired infinite scrolling technology logo carousel.
 *
 * @param {Array} items - List of technology logo objects
 * @param {number} speed - Duration of full loop scroll in seconds
 * @param {string} direction - 'left' or 'right'
 * @param {boolean} pauseOnHover - Whether to pause animation on hover
 * @param {string} className - Optional additional container styles
 */
export default function LogoLoop({
  items = [],
  speed = 35,
  direction = 'left',
  pauseOnHover = true,
  className = ''
}) {
  if (!items || items.length === 0) return null;

  // Duplicate items twice to ensure seamless infinite looping with zero gaps
  const duplicatedItems = [...items, ...items];

  return (
    <div
      className={`logoloop-wrapper relative py-6 ${className}`}
      role="region"
      aria-label="Technologies and technical skills logo loop carousel"
    >
      {/* Visual Edge Fade Overlays for older browsers / maximum visual contrast */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-[#0B0F19] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-[#0B0F19] to-transparent z-10 pointer-events-none" />

      {/* Scrolling Track Container */}
      <div
        className={`logoloop-track ${pauseOnHover ? 'pause-on-hover' : ''} ${
          direction === 'right' ? 'direction-reverse' : ''
        }`}
        style={{
          '--logoloop-duration': `${speed}s`
        }}
      >
        {duplicatedItems.map((tech, index) => {
          const IconComponent = tech.icon;
          const key = `${tech.id || tech.name}-${index}`;

          return (
            <div
              key={key}
              className="group relative flex items-center gap-3 px-4 sm:px-5 py-3 rounded-2xl glass-card bg-[#0d1322]/80 hover:bg-[#131b2e] border border-white/10 hover:border-white/25 transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-xl select-none shrink-0 cursor-pointer"
              aria-label={tech.name}
            >
              {/* Subtle Radial Brand Color Glow on Hover */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg pointer-events-none -z-10"
                style={{
                  background: `radial-gradient(circle at center, ${tech.color || '#3B82F6'}30 0%, transparent 75%)`
                }}
              />

              {/* Icon Container */}
              <div
                className="p-2 sm:p-2.5 rounded-xl bg-white/5 border border-white/10 group-hover:border-white/20 transition-transform duration-300 group-hover:scale-110 flex items-center justify-center shrink-0"
                style={{ color: tech.color || '#ffffff' }}
              >
                {typeof IconComponent === 'function' ? (
                  <IconComponent className="text-xl sm:text-2xl" />
                ) : (
                  IconComponent
                )}
              </div>

              {/* Technology Details */}
              <div className="flex flex-col pr-1">
                <div className="flex items-center gap-2">
                  <span className="font-display font-semibold text-xs sm:text-sm text-gray-200 group-hover:text-white tracking-wide transition-colors whitespace-nowrap">
                    {tech.name}
                  </span>
                  {tech.badge && (
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-brand-primary/20 text-brand-accent border border-brand-primary/30">
                      {tech.badge}
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-mono text-gray-400 tracking-wider uppercase group-hover:text-gray-300 transition-colors">
                  {tech.category}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
