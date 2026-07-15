import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/90">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#F7DF1E] text-lg font-black text-slate-950">
              JS
            </div>
            <div>
              <p className="text-lg font-semibold text-white">JS Learn</p>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Learning platform</p>
            </div>
          </div>
          <p className="mt-4 max-w-sm text-sm text-slate-400">
            Premium JavaScript education for builders who want to ship confidently.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-white">Quick Links</h3>
          <ul className="mt-4 space-y-2 text-sm text-slate-400">
            <li>Home</li>
            <li>Topics</li>
            <li>Dashboard</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-white">Resources</h3>
          <div className="mt-4 flex gap-3 text-xl text-slate-400">
            <a href="https://github.com" className="transition hover:text-[#F7DF1E]" aria-label="GitHub"><FaGithub /></a>
            <a href="https://linkedin.com" className="transition hover:text-[#F7DF1E]" aria-label="LinkedIn"><FaLinkedin /></a>
            <a href="mailto:hello@jslearn.dev" className="transition hover:text-[#F7DF1E]" aria-label="Email"><FaEnvelope /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-4 text-center text-sm text-slate-500 sm:px-6 lg:px-8">
        © 2026 JS Learn. Crafted for modern developers.
      </div>
    </footer>
  );
}
