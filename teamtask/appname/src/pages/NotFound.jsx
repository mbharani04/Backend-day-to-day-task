import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-12 text-slate-100">
      <div className="max-w-xl rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 text-center shadow-[0_30px_100px_rgba(0,0,0,0.25)]">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#F7DF1E]">404</p>
        <h1 className="mt-4 text-4xl font-semibold text-white">Page not found</h1>
        <p className="mt-4 text-slate-400">The page you are looking for isn’t available. Return to the learning platform home.</p>
        <Link to="/" className="mt-6 inline-flex rounded-full bg-[#F7DF1E] px-6 py-3 font-semibold text-slate-950">Back home</Link>
      </div>
    </div>
  );
}
