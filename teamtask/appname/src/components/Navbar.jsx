import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const links = [
  { to: '/', label: 'Home' },
  { to: '/topics', label: 'Topics' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const { user, logout, isVerified } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/register');
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <NavLink to={isVerified ? '/' : '/register'} className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#F7DF1E] text-lg font-black text-slate-950 shadow-[0_0_35px_rgba(247,223,30,0.35)]">
            JS
          </div>
          <div>
            <p className="text-lg font-semibold text-white">JS Learn</p>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Premium platform</p>
          </div>
        </NavLink>

        <nav className="hidden items-center gap-2 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-medium transition ${
                  isActive ? 'bg-[#F7DF1E] text-slate-950' : 'text-slate-300 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 sm:flex">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F7DF1E] font-semibold text-slate-950">
                  {user.fullName?.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-medium text-white">{user.fullName}</span>
              </div>
              <button
                onClick={handleLogout}
                className="rounded-full border border-[#F7DF1E]/40 px-3 py-2 text-sm font-medium text-[#F7DF1E] transition hover:bg-[#F7DF1E] hover:text-slate-950"
              >
                Logout
              </button>
            </>
          ) : (
            <NavLink to="/register" className="rounded-full bg-[#F7DF1E] px-4 py-2 text-sm font-semibold text-slate-950">
              Join now
            </NavLink>
          )}
        </div>
      </div>
    </header>
  );
}
