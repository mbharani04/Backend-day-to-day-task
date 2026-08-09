import React from 'react';

export const StatCard = ({ title, value, icon: Icon, color = 'indigo', subtitle, trend }) => {
  const getColorClasses = (c) => {
    switch (c) {
      case 'emerald':
        return {
          bg: 'bg-emerald-50 dark:bg-emerald-950/50',
          text: 'text-emerald-600 dark:text-emerald-400',
          border: 'border-emerald-200 dark:border-emerald-800'
        };
      case 'amber':
        return {
          bg: 'bg-amber-50 dark:bg-amber-950/50',
          text: 'text-amber-600 dark:text-amber-400',
          border: 'border-amber-200 dark:border-amber-800'
        };
      case 'rose':
        return {
          bg: 'bg-rose-50 dark:bg-rose-950/50',
          text: 'text-rose-600 dark:text-rose-400',
          border: 'border-rose-200 dark:border-rose-800'
        };
      case 'cyan':
        return {
          bg: 'bg-cyan-50 dark:bg-cyan-950/50',
          text: 'text-cyan-600 dark:text-cyan-400',
          border: 'border-cyan-200 dark:border-cyan-800'
        };
      case 'indigo':
      default:
        return {
          bg: 'bg-indigo-50 dark:bg-indigo-950/50',
          text: 'text-indigo-600 dark:text-indigo-400',
          border: 'border-indigo-200 dark:border-indigo-800'
        };
    }
  };

  const colors = getColorClasses(color);

  return (
    <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between transition-colors">
      <div className="space-y-1">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
          {title}
        </span>
        <div className="flex items-baseline gap-2">
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            {value}
          </h3>
          {trend && (
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              {trend}
            </span>
          )}
        </div>
        {subtitle && (
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{subtitle}</p>
        )}
      </div>

      {Icon && (
        <div className={`w-12 h-12 rounded-2xl ${colors.bg} ${colors.text} border ${colors.border} flex items-center justify-center shrink-0`}>
          <Icon className="w-6 h-6" />
        </div>
      )}
    </div>
  );
};
