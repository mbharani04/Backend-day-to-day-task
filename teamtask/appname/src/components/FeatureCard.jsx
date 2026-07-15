export default function FeatureCard({ title, description, icon }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[0_20px_65px_rgba(0,0,0,0.3)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[#F7DF1E]/40 hover:shadow-[0_30px_80px_rgba(247,223,30,0.12)]">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F7DF1E]/15 text-2xl text-[#F7DF1E]">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm text-slate-400">{description}</p>
    </div>
  );
}
