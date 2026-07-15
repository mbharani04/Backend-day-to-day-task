import { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const messages = JSON.parse(localStorage.getItem('jslearn-contact') || '[]');
    messages.push({ ...form, createdAt: new Date().toISOString() });
    localStorage.setItem('jslearn-contact', JSON.stringify(messages));
    setSubmitted(true);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <section className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-8 shadow-[0_35px_120px_rgba(0,0,0,0.4)]">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#F7DF1E]">Contact us</p>
          <h1 className="mt-4 text-4xl font-semibold text-white">Let’s build something brilliant together.</h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-400">Share your feedback, questions, or ideas. We’ll be glad to hear from you.</p>
        </section>

        <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.2)]">
            <h2 className="text-2xl font-semibold text-white">Support channels</h2>
            <ul className="mt-4 space-y-3 text-slate-400">
              <li>📧 hello@jslearn.dev</li>
              <li>💬 Live response within 24 hours</li>
              <li>🌍 Built for modern web developers</li>
            </ul>
          </div>

          <form onSubmit={handleSubmit} className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.2)]">
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">Name</label>
                <input name="name" value={form.name} onChange={handleChange} className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">Email</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">Message</label>
                <textarea name="message" value={form.message} onChange={handleChange} rows="5" className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" />
              </div>
            </div>
            {submitted ? <p className="mt-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">Message stored successfully.</p> : null}
            <button type="submit" className="mt-6 rounded-2xl bg-[#F7DF1E] px-4 py-3 font-semibold text-slate-950">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
}
