import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function VerifyOTP() {
  const navigate = useNavigate();
  const { otp, verifyOtp, registerUser, user } = useAuth();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(120);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const handleChange = (index, value) => {
    if (!/\d/.test(value) && value !== '') return;

    const nextCode = [...code];
    nextCode[index] = value;
    setCode(nextCode);

    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index, event) => {
    if (event.key === 'Backspace' && !code[index] && index > 0) {
      const previous = [...code];
      previous[index - 1] = '';
      setCode(previous);
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (event) => {
    const pasted = event.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pasted) return;
    const nextCode = Array(6).fill('');
    pasted.split('').forEach((digit, index) => { nextCode[index] = digit; });
    setCode(nextCode);
    event.preventDefault();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const entered = code.join('');
    if (!verifyOtp(entered)) {
      setError('Invalid OTP. Please try again.');
      return;
    }
    navigate('/');
  };

  const resendOtp = () => {
    const newOtp = registerUser({ fullName: user?.fullName || 'Developer', email: user?.email || 'dev@jslearn.dev', password: 'demo1234', confirmPassword: 'demo1234' });
    window.alert(`New OTP: ${newOtp}`);
    setTimeLeft(120);
    setCode(['', '', '', '', '', '']);
    setError('');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(247,223,30,0.16),_transparent_28%),linear-gradient(135deg,_#020617,_#111827)] px-4 py-12 text-slate-100">
      <div className="w-full max-w-xl rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 shadow-[0_40px_140px_rgba(0,0,0,0.35)] backdrop-blur-xl">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#F7DF1E]">Verify your account</p>
        <h1 className="mt-4 text-3xl font-semibold text-white">Enter the 6-digit code</h1>
        <p className="mt-3 text-slate-400">We sent a secure OTP to {user?.email || 'your email'}.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div onPaste={handlePaste} className="flex justify-center gap-3">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(element) => { inputRefs.current[index] = element; }}
                value={digit}
                maxLength={1}
                onChange={(event) => handleChange(index, event.target.value)}
                onKeyDown={(event) => handleKeyDown(index, event)}
                className="h-14 w-12 rounded-2xl border border-white/10 bg-white/5 text-center text-xl font-semibold text-white outline-none"
              />
            ))}
          </div>

          <div className="flex items-center justify-between text-sm text-slate-400">
            <span>Code expires in {timeLeft}s</span>
            <button type="button" onClick={resendOtp} className="font-medium text-[#F7DF1E]">Resend OTP</button>
          </div>

          {error ? <p className="rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">{error}</p> : null}
          <button type="submit" className="w-full rounded-2xl bg-[#F7DF1E] px-4 py-3 font-semibold text-slate-950">Verify</button>
        </form>
      </div>
    </div>
  );
}
