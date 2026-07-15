import { Link } from 'react-router-dom';
import FeatureCard from './FeatureCard';

export default function HeroBanner({ title, subtitle, primaryAction, secondaryAction, features, illustration }) {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 px-6 py-16 shadow-[0_35px_120px_rgba(0,0,0,0.45)] sm:px-8 lg:px-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(247,223,30,0.2),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.2),_transparent_35%)]" />
      <div className="relative grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#F7DF1E]">JavaScript Learning Platform</p>
          <h1 className="mt-4 text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">{title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">{subtitle}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to={primaryAction.to} className="rounded-full bg-[#F7DF1E] px-6 py-3 font-semibold text-slate-950 transition hover:scale-105">
              {primaryAction.label}
            </Link>
            <Link to={secondaryAction.to} className="rounded-full border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white transition hover:border-[#F7DF1E]/40 hover:text-[#F7DF1E]">
              {secondaryAction.label}
            </Link>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {features.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>
        <div className="relative flex min-h-[320px] items-center justify-center">
          {illustration}
        </div>
      </div>
    </section>
  );
}
