import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function TopicCard({ topic }) {
  const { bookmarks, toggleBookmark, completedTopics, toggleComplete } = useAuth();
  const isBookmarked = bookmarks.includes(topic.id);
  const isCompleted = completedTopics.includes(topic.id);

  return (
    <article className="group rounded-3xl border border-white/10 bg-slate-900/80 p-5 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:shadow-[0_30px_90px_rgba(247,223,30,0.14)]">
      <div className="flex items-center justify-between">
        <span className="rounded-full border border-[#F7DF1E]/30 bg-[#F7DF1E]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-[#F7DF1E]">
          {topic.difficulty}
        </span>
        <button onClick={() => toggleBookmark(topic.id)} className="text-lg text-slate-400 transition hover:text-[#F7DF1E]">
          {isBookmarked ? '★' : '☆'}
        </button>
      </div>
      <div className="mt-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#F7DF1E]/25 to-white/10 text-3xl">
        {topic.image}
      </div>
      <h3 className="mt-4 text-xl font-semibold text-white">{topic.title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-400">{topic.description}</p>
      <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
        <span>{topic.readingTime}</span>
        <span>{topic.id.length} module</span>
      </div>
      <div className="mt-6 flex gap-3">
        <Link to={`/topics/${topic.id}`} className="rounded-full bg-[#F7DF1E] px-4 py-2 text-sm font-semibold text-slate-950 transition hover:opacity-90">
          Learn More
        </Link>
        <button onClick={() => toggleComplete(topic.id)} className={`rounded-full border px-4 py-2 text-sm font-medium transition ${isCompleted ? 'border-emerald-400/40 bg-emerald-400/10 text-emerald-300' : 'border-white/10 text-slate-300 hover:border-[#F7DF1E]/40 hover:text-[#F7DF1E]'}`}>
          {isCompleted ? 'Completed' : 'Mark Done'}
        </button>
      </div>
    </article>
  );
}
