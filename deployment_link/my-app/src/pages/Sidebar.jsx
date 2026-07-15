const Sidebar = () => {
  return (
    <section className="mx-auto max-w-3xl rounded-[2rem] border border-slate-800 bg-slate-900/90 p-8 shadow-2xl shadow-slate-950/40">
      <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left sm:items-start">
        <img
          className="h-28 w-28 rounded-full border-4 border-cyan-500 object-cover"
          src="https://via.placeholder.com/160"
          alt="profile"
        />
        <div className="space-y-3">
          <div>
            <h2 className="text-3xl font-semibold text-white">Bharani M</h2>
            <p className="text-cyan-300">MERN Stack Developer</p>
          </div>
          <p className="max-w-xl text-slate-400">Passionate about building responsive, modern web apps using React, Node.js, MongoDB, and Tailwind CSS.</p>
        </div>
      </div>

      <div className="mt-8 grid gap-4 rounded-3xl bg-slate-950/90 p-6 ring-1 ring-slate-800 sm:grid-cols-2">
        <div>
          <h3 className="text-lg font-semibold text-white">Course</h3>
          <p className="mt-2 text-slate-400">Full Stack Development</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">Skills</h3>
          <p className="mt-2 text-slate-400">React, Node.js, Express, MongoDB, JavaScript</p>
        </div>
      </div>

      <div className="mt-8 rounded-3xl bg-cyan-500/10 p-6 text-slate-200 ring-1 ring-cyan-400/20">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Profile summary</p>
        <p className="mt-3 text-slate-300">A polished developer dashboard section for your course, skills, and contact essentials.</p>
      </div>
    </section>
  );
};

export default Sidebar;