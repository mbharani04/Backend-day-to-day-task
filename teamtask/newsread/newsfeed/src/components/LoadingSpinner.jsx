// ─── LoadingSpinner ───────────────────────────────────────────────────────────
// Used as the Suspense fallback while lazy-loaded pages are loading.

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-violet-500/20"></div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-violet-500 animate-spin"></div>
          <div className="absolute inset-2 rounded-full border-4 border-transparent border-t-cyan-400 animate-spin [animation-duration:0.7s]"></div>
        </div>
        <p className="text-slate-400 text-sm font-medium animate-pulse">
          Loading TruthFeed...
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
