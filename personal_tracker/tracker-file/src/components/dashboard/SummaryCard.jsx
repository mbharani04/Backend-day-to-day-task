import React from 'react';

export const SummaryCard = ({
  title,
  mainValue,
  subtitle,
  progressPercentage,
  icon: Icon,
  accentColor = 'indigo',
  comparisonText,
}) => {
  const colorMap = {
    indigo: {
      bg: 'from-indigo-500/10 to-indigo-500/5',
      border: 'border-indigo-500/20 hover:border-indigo-500/40',
      iconBg: 'bg-indigo-500/20 text-indigo-400',
      progress: 'bg-indigo-500',
      glow: 'hover:shadow-indigo-500/10',
    },
    cyan: {
      bg: 'from-cyan-500/10 to-cyan-500/5',
      border: 'border-cyan-500/20 hover:border-cyan-500/40',
      iconBg: 'bg-cyan-500/20 text-cyan-400',
      progress: 'bg-cyan-500',
      glow: 'hover:shadow-cyan-500/10',
    },
    purple: {
      bg: 'from-purple-500/10 to-purple-500/5',
      border: 'border-purple-500/20 hover:border-purple-500/40',
      iconBg: 'bg-purple-500/20 text-purple-400',
      progress: 'bg-purple-500',
      glow: 'hover:shadow-purple-500/10',
    },
    emerald: {
      bg: 'from-emerald-500/10 to-emerald-500/5',
      border: 'border-emerald-500/20 hover:border-emerald-500/40',
      iconBg: 'bg-emerald-500/20 text-emerald-400',
      progress: 'bg-emerald-500',
      glow: 'hover:shadow-emerald-500/10',
    },
    amber: {
      bg: 'from-amber-500/10 to-amber-500/5',
      border: 'border-amber-500/20 hover:border-amber-500/40',
      iconBg: 'bg-amber-500/20 text-amber-400',
      progress: 'bg-amber-500',
      glow: 'hover:shadow-amber-500/10',
    },
  };

  const currentTheme = colorMap[accentColor] || colorMap.indigo;

  return (
    <div
      className={`relative p-5 rounded-2xl glass-card border bg-gradient-to-br transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${currentTheme.bg} ${currentTheme.border} ${currentTheme.glow}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          {title}
        </span>
        <div className={`p-2 rounded-xl ${currentTheme.iconBg}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="mt-3 flex items-baseline justify-between">
        <span className="text-2xl lg:text-3xl font-black text-slate-100 tracking-tight">
          {mainValue}
        </span>
        {progressPercentage !== undefined && (
          <span className="text-xs font-bold text-slate-300">
            {progressPercentage}%
          </span>
        )}
      </div>

      {subtitle && <p className="mt-1 text-xs text-slate-400 font-medium">{subtitle}</p>}

      {/* Progress Bar */}
      {progressPercentage !== undefined && (
        <div className="mt-3 w-full bg-slate-800/80 rounded-full h-1.5 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${currentTheme.progress}`}
            style={{ width: `${Math.min(100, Math.max(0, progressPercentage))}%` }}
          />
        </div>
      )}

      {comparisonText && (
        <span className="mt-2 block text-[10px] text-slate-400 font-medium">
          {comparisonText}
        </span>
      )}
    </div>
  );
};

export default SummaryCard;
