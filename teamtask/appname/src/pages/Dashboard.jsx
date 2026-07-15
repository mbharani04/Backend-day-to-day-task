import { useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { topics } from '../data/topics';

export default function Dashboard() {
  const { user, bookmarks, completedTopics } = useAuth();

  const bookmarkTopics = useMemo(() => topics.filter((topic) => bookmarks.includes(topic.id)), [bookmarks]);
  const completed = useMemo(() => topics.filter((topic) => completedTopics.includes(topic.id)), [completedTopics]);
  const progress = Math.round((completed.length / topics.length) * 100);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <section className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-8 shadow-[0_35px_120px_rgba(0,0,0,0.4)]">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#F7DF1E]">Learning dashboard</p>
          <h1 className="mt-4 text-4xl font-semibold text-white">Welcome back, {user?.fullName || 'Developer'}.</h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-400">Your personalized learning cockpit keeps track of progress, favorites, and recent milestones.</p>
        </section>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.2)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#F7DF1E]">Learning progress</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">{completed.length} completed topics</h2>
              </div>
              <div className="rounded-2xl border border-[#F7DF1E]/30 bg-[#F7DF1E]/10 px-4 py-3 text-sm font-semibold text-[#F7DF1E]">{progress}%</div>
            </div>
            <div className="mt-6 h-3 rounded-full bg-slate-800">
              <div className="h-3 rounded-full bg-[#F7DF1E]" style={{ width: `${progress}%` }} />
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-slate-400">Completed</p>
                <p className="mt-2 text-2xl font-semibold text-white">{completed.length}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-slate-400">Bookmarks</p>
                <p className="mt-2 text-2xl font-semibold text-white">{bookmarkTopics.length}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-slate-400">Total Topics</p>
                <p className="mt-2 text-2xl font-semibold text-white">{topics.length}</p>
              </div>
            </div>
          </section>

          <section className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.2)]">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#F7DF1E]">Recent activity</p>
            <ul className="mt-5 space-y-3 text-slate-400">
              <li className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">Completed the Arrays lesson</li>
              <li className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">Bookmarked Async/Await</li>
              <li className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">Practiced DOM fundamentals</li>
            </ul>
          </section>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <section className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.2)]">
            <h2 className="text-2xl font-semibold text-white">Bookmarks</h2>
            <div className="mt-4 space-y-3">
              {bookmarkTopics.length > 0 ? bookmarkTopics.map((topic) => <div key={topic.id} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-slate-300">{topic.title}</div>) : <p className="text-slate-400">No bookmarks yet.</p>}
            </div>
          </section>
          <section className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.2)]">
            <h2 className="text-2xl font-semibold text-white">Achievements</h2>
            <div className="mt-4 space-y-3">
              <div className="rounded-2xl border border-[#F7DF1E]/25 bg-[#F7DF1E]/10 px-4 py-3 text-[#F7DF1E]">🏅 Beginner Explorer</div>
              <div className="rounded-2xl border border-blue-400/25 bg-blue-500/10 px-4 py-3 text-blue-300">⚡ Async Master</div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
