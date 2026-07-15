import { Link, useNavigate, useParams } from 'react-router-dom';
import CodeBlock from '../components/CodeBlock';
import { topics } from '../data/topics';

export default function TopicDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const topic = topics.find((entry) => entry.id === id);

  if (!topic) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-12 text-slate-100">
        <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 text-center shadow-[0_30px_100px_rgba(0,0,0,0.25)]">
          <h1 className="text-3xl font-semibold">Topic not found</h1>
          <p className="mt-3 text-slate-400">The topic you requested is not available in this roadmap.</p>
          <button onClick={() => navigate('/topics')} className="mt-6 rounded-full bg-[#F7DF1E] px-6 py-3 font-semibold text-slate-950">Back to topics</button>
        </div>
      </div>
    );
  }

  const currentIndex = topics.findIndex((entry) => entry.id === topic.id);
  const previousTopic = topics[currentIndex - 1];
  const nextTopic = topics[currentIndex + 1];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-8 shadow-[0_35px_120px_rgba(0,0,0,0.4)]">
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-400">
            <Link to="/" className="hover:text-[#F7DF1E]">Home</Link>
            <span>/</span>
            <Link to="/topics" className="hover:text-[#F7DF1E]">Topics</Link>
            <span>/</span>
            <span className="text-white">{topic.title}</span>
          </div>
          <div className="mt-8 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <div className="flex h-20 w-20 items-center justify-center rounded-[1.75rem] bg-[#F7DF1E]/15 text-5xl">{topic.image}</div>
              <div className="mt-6 flex flex-wrap gap-3 text-sm">
                <span className="rounded-full border border-[#F7DF1E]/35 bg-[#F7DF1E]/10 px-3 py-1 text-[#F7DF1E]">{topic.difficulty}</span>
                <span className="rounded-full border border-white/10 px-3 py-1 text-slate-400">{topic.readingTime}</span>
              </div>
              <h1 className="mt-6 text-4xl font-semibold text-white">{topic.title}</h1>
              <p className="mt-4 text-lg leading-8 text-slate-400">{topic.description}</p>
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.2)]">
              <h2 className="text-2xl font-semibold text-white">Definition</h2>
              <p className="mt-3 text-slate-400">{topic.definition}</p>
              <div className="mt-6">
                <CodeBlock code={topic.syntax} language="javascript" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <section className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.2)]">
            <h2 className="text-2xl font-semibold text-white">Why it exists</h2>
            <p className="mt-3 text-slate-400">{topic.realWorldExample}</p>
          </section>
          <section className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.2)]">
            <h2 className="text-2xl font-semibold text-white">Example</h2>
            <div className="mt-4">
              <CodeBlock code={topic.example} language="javascript" />
            </div>
          </section>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <section className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.2)]">
            <h2 className="text-2xl font-semibold text-white">Output</h2>
            <p className="mt-3 whitespace-pre-line text-slate-400">{topic.output}</p>
          </section>
          <section className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.2)]">
            <h2 className="text-2xl font-semibold text-white">Uses</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-400">
              {topic.uses.map((use) => <li key={use}>{use}</li>)}
            </ul>
          </section>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <section className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.2)]">
            <h2 className="text-2xl font-semibold text-white">Advantages</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-400">
              {topic.advantages.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </section>
          <section className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.2)]">
            <h2 className="text-2xl font-semibold text-white">Disadvantages</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-400">
              {topic.disadvantages.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </section>
        </div>

        <section className="mt-8 rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.2)]">
          <h2 className="text-2xl font-semibold text-white">Best Practices</h2>
          <ul className="mt-3 grid gap-3 md:grid-cols-2">
            {topic.bestPractices.map((practice) => (
              <li key={practice} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-slate-400">{practice}</li>
            ))}
          </ul>
        </section>

        <section className="mt-8 rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.2)]">
          <h2 className="text-2xl font-semibold text-white">Interview Questions</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-400">
            {topic.interviewQuestions.map((question) => <li key={question}>{question}</li>)}
          </ul>
        </section>

        <section className="mt-8 rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.2)]">
          <h2 className="text-2xl font-semibold text-white">Summary</h2>
          <p className="mt-3 text-slate-400">{topic.summary}</p>
          <p className="mt-4 text-sm text-slate-500">References: {topic.references.join(', ')}</p>
        </section>

        <div className="mt-8 flex flex-wrap justify-between gap-3">
          <button onClick={() => navigate(previousTopic ? `/topics/${previousTopic.id}` : '/topics')} className="rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:border-[#F7DF1E]/40 hover:text-[#F7DF1E]">{previousTopic ? `← ${previousTopic.title}` : '← Back to topics'}</button>
          <button onClick={() => navigate('/topics')} className="rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:border-[#F7DF1E]/40 hover:text-[#F7DF1E]">Back</button>
          <button onClick={() => navigate(nextTopic ? `/topics/${nextTopic.id}` : '/topics')} className="rounded-full bg-[#F7DF1E] px-5 py-3 text-sm font-semibold text-slate-950">{nextTopic ? `${nextTopic.title} →` : 'Back to topics'}</button>
        </div>
      </div>
    </div>
  );
}
