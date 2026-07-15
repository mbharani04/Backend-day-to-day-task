const Github = () => {
  return (
    <section className="mx-auto max-w-3xl rounded-3xl border border-slate-800 bg-slate-900/90 p-8 shadow-xl shadow-slate-950/30">
      <div className="space-y-5 text-center">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">GitHub</p>
          <h1 className="mt-3 text-4xl font-semibold text-white">Open source work</h1>
        </div>
        <p className="text-slate-400">Explore repositories, projects, and contributions on GitHub.</p>
        <a
          className="inline-flex rounded-full bg-cyan-500 px-6 py-3 font-medium text-slate-950 transition hover:bg-cyan-400"
          href="https://github.com/mbharani04/"
          target="_blank"
          rel="noreferrer"
        >
          Visit GitHub
        </a>
      </div>
    </section>
  );
};

export default Github;