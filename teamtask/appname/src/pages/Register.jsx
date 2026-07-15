import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const navigate = useNavigate();
  const { registerUser } = useAuth();
  const [form, setForm] = useState({ fullName: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');
    setNotice('');

    if (!form.fullName || !form.email || !form.password || !form.confirmPassword) {
      setError('Please fill in every field.');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(form.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (form.password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const otp = registerUser(form);
    setNotice(`OTP generated successfully. Use ${otp} to verify.`);
    window.alert(`Development OTP: ${otp}`);
    navigate('/verify');
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(247,223,30,0.16),_transparent_28%),linear-gradient(135deg,_#020617,_#111827)] px-4 py-12 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-[0_40px_140px_rgba(0,0,0,0.35)] backdrop-blur-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#F7DF1E]">Create account</p>
          <h1 className="mt-4 text-4xl font-semibold text-white">Start your JavaScript journey</h1>
          <p className="mt-4 text-lg text-slate-400">Unlock premium lessons, interview prep, progress tracking, and a polished learning experience.</p>
          <div className="mt-8 space-y-4 text-sm text-slate-300">
            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">⚡ Learn faster with curated lessons</div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">💻 Practice with real-world patterns</div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">📈 Track your growth from beginner to advanced</div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 shadow-[0_40px_140px_rgba(0,0,0,0.35)] backdrop-blur-xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">Full Name</label>
              <input name="fullName" value={form.fullName} onChange={handleChange} className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none ring-0" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">Email</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none ring-0" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">Password</label>
              <input type="password" name="password" value={form.password} onChange={handleChange} className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none ring-0" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">Confirm Password</label>
              <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none ring-0" />
            </div>
            {error ? <p className="rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">{error}</p> : null}
            {notice ? <p className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">{notice}</p> : null}
            <button type="submit" className="w-full rounded-2xl bg-[#F7DF1E] px-4 py-3 font-semibold text-slate-950 transition hover:opacity-90">Create Account</button>
          </form>
        </div>
      </div>
    </div>
  );
}
