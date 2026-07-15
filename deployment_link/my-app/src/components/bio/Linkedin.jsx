const LinkedIn = () => {
  return (
    <section className="mx-auto max-w-3xl rounded-3xl border border-slate-800 bg-slate-900/90 p-8 shadow-xl shadow-slate-950/30">
      <div className="space-y-5 text-center">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">LinkedIn</p>
          <h1 className="mt-3 text-4xl font-semibold text-white">Professional Profile</h1>
        </div>
        <p className="text-slate-400">Connect with me on LinkedIn to review my experience and project history.</p>
        <a
          className="inline-flex rounded-full bg-cyan-500 px-6 py-3 font-medium text-slate-950 transition hover:bg-cyan-400"
          href="https://www.linkedin.com/in/bharani-m-2346982a0/"
          target="_blank"
          rel="noreferrer"
        >
          Visit LinkedIn
        </a>
      </div>
    </section>
  );
};

export default LinkedIn;