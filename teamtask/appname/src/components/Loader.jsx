export default function Loader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-100">
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rounded-full border-4 border-white/10" />
          <div className="absolute inset-0 rounded-full border-4 border-t-[#F7DF1E] border-r-[#F7DF1E] animate-spin" />
        </div>
        <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Preparing your journey</p>
      </div>
    </div>
  );
}
