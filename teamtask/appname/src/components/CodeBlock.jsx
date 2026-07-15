import { useState } from 'react';

export default function CodeBlock({ code, language = 'javascript' }) {
  const [copied, setCopied] = useState(false);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (error) {
      console.error('Copy failed', error);
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-950/90 shadow-[0_20px_70px_rgba(0,0,0,0.25)]">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 text-sm text-slate-400">
        <span className="uppercase tracking-[0.25em]">{language}</span>
        <button onClick={copyCode} className="rounded-full border border-white/10 px-3 py-1 text-xs font-semibold text-[#F7DF1E] transition hover:bg-[#F7DF1E] hover:text-slate-950">
          {copied ? 'Copied!' : 'Copy Code'}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-sm leading-7 text-slate-200">
        <code>{code}</code>
      </pre>
    </div>
  );
}
