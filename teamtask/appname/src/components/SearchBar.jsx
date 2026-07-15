export default function SearchBar({ value, onChange, placeholder = 'Search topics...' }) {
  return (
    <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 shadow-[0_15px_60px_rgba(0,0,0,0.2)] backdrop-blur-xl">
      <span className="text-xl text-[#F7DF1E]">⌕</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
      />
    </label>
  );
}
