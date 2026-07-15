import SectionTitle from '../components/SectionTitle';

const stats = [
  { label: 'Learning modules', value: '25+' },
  { label: 'Interview questions', value: '100+' },
  { label: 'Hours of learning', value: '40+' },
];

const timeline = [
  { year: '2024', title: 'Foundation', description: 'Built the first roadmap of beginner-friendly JavaScript lessons.' },
  { year: '2025', title: 'Growth', description: 'Expanded the curriculum into advanced patterns and interview prep.' },
  { year: '2026', title: 'Premium experience', description: 'Shipped a polished learning platform with authentication and progress tracking.' },
];

export default function About() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <section className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-8 shadow-[0_35px_120px_rgba(0,0,0,0.4)]">
          <SectionTitle eyebrow="About JS Learn" title="A premium path from fundamentals to mastery" description="We design modern lessons that help developers understand JavaScript deeply and use it confidently in production." />
          <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
              <h3 className="text-2xl font-semibold text-white">Mission</h3>
              <p className="mt-3 text-slate-400">Make JavaScript education clear, inspiring, and practical for every stage of growth.</p>
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
              <h3 className="text-2xl font-semibold text-white">Vision</h3>
              <p className="mt-3 text-slate-400">Create a premium platform that blends theory, examples, and interview readiness into one experience.</p>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.2)]">
            <h2 className="text-2xl font-semibold text-white">Platform statistics</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-2xl font-semibold text-[#F7DF1E]">{stat.value}</p>
                  <p className="mt-2 text-sm text-slate-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.2)]">
            <h2 className="text-2xl font-semibold text-white">Developer info</h2>
            <p className="mt-3 text-slate-400">Built with modern React, Vite, Tailwind, and a thoughtful component architecture for a premium learning experience.</p>
          </div>
        </section>

        <section className="mt-8 rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.2)]">
          <h2 className="text-2xl font-semibold text-white">Timeline</h2>
          <div className="mt-6 space-y-4">
            {timeline.map((item) => (
              <div key={item.year} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-[#F7DF1E] px-3 py-1 text-sm font-semibold text-slate-950">{item.year}</span>
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                </div>
                <p className="mt-2 text-slate-400">{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
