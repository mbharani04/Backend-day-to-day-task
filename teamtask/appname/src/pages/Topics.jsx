import { useMemo, useState } from 'react';
import HeroBanner from '../components/HeroBanner';
import SearchBar from '../components/SearchBar';
import SectionTitle from '../components/SectionTitle';
import TopicCard from '../components/TopicCard';
import { topics } from '../data/topics';

export default function Topics() {
  const [query, setQuery] = useState('');

  const filteredTopics = useMemo(() => {
    const normalized = query.toLowerCase();
    return topics.filter((topic) => topic.title.toLowerCase().includes(normalized) || topic.description.toLowerCase().includes(normalized));
  }, [query]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <HeroBanner
          title="Explore JavaScript by topic."
          subtitle="Navigate a structured library of lessons from the core language to modern browser APIs."
          primaryAction={{ to: '/dashboard', label: 'View Dashboard' }}
          secondaryAction={{ to: '/', label: 'Back Home' }}
          features={[
            { title: '🧠 Deep Concepts', description: 'Understand how JavaScript really works.', icon: '🧠' },
            { title: '🛠️ Practical Examples', description: 'Learn patterns you can apply immediately.', icon: '🛠️' },
            { title: '✅ Interview Prep', description: 'Reinforce your knowledge with questions and summaries.', icon: '✅' },
          ]}
          illustration={
            <div className="relative flex h-[320px] w-full items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-[#F7DF1E]/10 blur-3xl" />
              <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur-xl">
                <div className="grid gap-4 text-left text-sm text-slate-300">
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">Variables</div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">Functions</div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">Async/Await</div>
                </div>
              </div>
            </div>
          }
        />

        <section className="mt-10 rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <SectionTitle eyebrow="Full curriculum" title="JavaScript topics" description="Browse the complete roadmap with essential concepts and practical examples." />
            <div className="w-full lg:max-w-md">
              <SearchBar value={query} onChange={setQuery} />
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {filteredTopics.map((topic) => (
              <TopicCard key={topic.id} topic={topic} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
