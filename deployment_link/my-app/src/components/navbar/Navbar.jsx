import { NavLink } from "react-router-dom";

const navLinkClasses = ({ isActive }) =>
  `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
    isActive ? "bg-cyan-500 text-slate-950" : "text-slate-200 hover:bg-slate-800 hover:text-white"
  }`;

const Navbar = () => {
  return (
    <header className="border-b border-slate-800 bg-slate-950/95 px-4 py-4 backdrop-blur-md sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.4em] text-cyan-300">Bharani</p>
          <h1 className="text-xl font-semibold text-white">MERN Developer</h1>
        </div>
        <nav className="flex flex-wrap gap-2">
          <NavLink to="/" className={navLinkClasses} end>
            Home
          </NavLink>
          <NavLink to="/sidebar" className={navLinkClasses}>
            Profile
          </NavLink>
          <NavLink to="/resume" className={navLinkClasses}>
            Resume
          </NavLink>
          <NavLink to="/github" className={navLinkClasses}>
            GitHub
          </NavLink>
          <NavLink to="/linkedin" className={navLinkClasses}>
            LinkedIn
          </NavLink>

          
        </nav>
      </div>
    </header>
  )
}

export default Navbar