import React from "react";

const FallbackLoader = ({ title = "Lazy Loading Component...", subtitle = "Fetching JavaScript bundle dynamic chunk" }) => {
  return (
    <div className="w-full py-16 px-6 flex flex-col items-center justify-center rounded-3xl bg-slate-900/5 border border-slate-200/80 backdrop-blur-md shadow-inner animate-pulse">
      {/* Animated Spinner Ring */}
      <div className="relative flex items-center justify-center mb-6">
        <div className="w-16 h-16 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-6 h-6 rounded-full bg-indigo-500/20 animate-ping"></div>
        </div>
      </div>

      {/* Loading Titles */}
      <h4 className="text-lg font-bold text-slate-800 tracking-tight flex items-center gap-2">
        <span>⚡</span> {title}
      </h4>
      <p className="text-xs text-slate-500 mt-1 font-medium text-center max-w-sm">
        {subtitle}
      </p>

      {/* Dynamic Loading Cards Skeleton Grid */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-4xl opacity-60">
        {[1, 2, 3].map((item) => (
          <div key={item} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="h-32 bg-slate-200 rounded-xl animate-pulse"></div>
            <div className="h-4 bg-slate-200 rounded w-3/4 animate-pulse"></div>
            <div className="h-3 bg-slate-100 rounded w-1/2 animate-pulse"></div>
            <div className="flex gap-2 pt-2">
              <div className="h-6 bg-indigo-100 rounded-md w-16 animate-pulse"></div>
              <div className="h-6 bg-slate-100 rounded-md w-12 animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FallbackLoader;
