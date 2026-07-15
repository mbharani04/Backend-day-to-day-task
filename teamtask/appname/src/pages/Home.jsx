import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import HeroBanner from '../components/HeroBanner';
import SearchBar from '../components/SearchBar';
import SectionTitle from '../components/SectionTitle';
import TopicCard from '../components/TopicCard';
import { topics } from '../data/topics';

export default function Home() {
  const [query, setQuery] = useState('');

  const filteredTopics = useMemo(() => {
    const normalized = query.toLowerCase();
    return topics.filter((topic) => topic.title.toLowerCase().includes(normalized) || topic.description.toLowerCase().includes(normalized));
  }, [query]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <HeroBanner
          title="Master JavaScript. Build the web with confidence."
          subtitle="Learn JavaScript from beginner to advanced through interactive lessons, real-world examples, coding challenges, projects, and interview preparation."
          primaryAction={{ to: '/topics', label: 'Start Learning' }}
          secondaryAction={{ to: '/about', label: 'Explore Topics' }}
          features={[
            { title: '⚡ Fast Learning', description: 'Build momentum with focused lessons and modern examples.', icon: '⚡' },
            { title: '🌍 Beginner to Advanced', description: 'Follow a guided path to professional confidence.', icon: '🌍' },
            { title: '💻 Developer Friendly', description: 'Learn with syntax, tips, and practical patterns.', icon: '💻' },
          ]}
          illustration={
            <div className="relative flex h-[340px] w-full items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-[#F7DF1E]/10 blur-3xl" />
              <div className="absolute left-8 top-10 h-24 w-24 rounded-full border border-[#F7DF1E]/40 bg-[#F7DF1E]/20 blur-2xl" />
              <div className="absolute bottom-8 right-10 h-28 w-28 rounded-full border border-blue-400/30 bg-blue-500/20 blur-2xl" />
              <div className="relative rounded-[2rem] border border-white/10 bg-slate-900/80 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur-xl">
                <div className="mb-4 flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-rose-400" />
                  <span className="h-3 w-3 rounded-full bg-amber-400" />
                  <span className="h-3 w-3 rounded-full bg-emerald-400" />
                </div>
                <div className="space-y-3 text-sm text-slate-300">
                  <p className="font-semibold text-[#F7DF1E]">const greet = (name) =&gt; {'{'}</p>
                  <p className="pl-4">return `Hello ${'${name}'}`;</p>
                  <p>{'}'}</p>
                  <p>console.log(greet(&quot;Developer&quot;));</p>
                </div>
              </div>
            </div>
          }
        />

        <section className="mt-10 rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <SectionTitle eyebrow="Interview Ready" title="Top 25 JavaScript Interview Topics" description="Search the concepts that matter most and jump into the right lesson instantly." />
            <div className="w-full md:max-w-md">
              <SearchBar value={query} onChange={setQuery} />
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {filteredTopics.map((topic) => (
              <TopicCard key={topic.id} topic={topic} />
            ))}
          </div>
          {filteredTopics.length === 0 ? <p className="mt-6 text-slate-400">No topics match your search yet.</p> : null}
        </section>
      </div>
    </div>
  );
}
