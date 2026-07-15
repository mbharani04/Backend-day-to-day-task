import { useEffect, useMemo, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Link as ScrollLink } from 'react-scroll';
import toast, { Toaster } from 'react-hot-toast';
import Typed from 'typed.js';
import emailjs from 'emailjs-com';
import {
  ArrowRight,
  BadgeCheck,
  Bot,
  Brain,
  BrainCircuit,
  BookOpen,
  CheckCircle2,
  Cloud,
  CloudCog,
  CloudLightning,
  Code2,
  Cpu,
  Database,
  DatabaseZap,
  Download,
  FileText,
  GitBranch,
  Globe,
  Layers3,
  Mail,
  MapPin,
  Menu,
  Network,
  NotebookText,
  Phone,
  Rocket,
  ScanEye,
  ServerCog,
  ShieldCheck,
  Sparkles,
  TableProperties,
  Workflow,
  X,
  Zap,
} from 'lucide-react';
import portfolioData from '../data/portfolioData';
import AnimatedSection from '../components/AnimatedSection';
import SectionTitle from '../components/SectionTitle';

/* ─── Icon map ─────────────────────────────── */
const iconMap = {
  Brain, BrainCircuit, Bot, BookOpen, Cloud, CloudCog, CloudLightning,
  Code2, Cpu, Database, DatabaseZap, FileText, GitBranch, Globe,
  Layers3, Network, NotebookText,
  Rocket, ScanEye, ServerCog, ShieldCheck, Sparkles, TableProperties, Workflow, Zap,
};

const navItems = ['Home', 'About', 'Skills', 'Experience', 'Projects', 'Certifications', 'Education', 'Contact'];

/* ─── Animated counter ───────────────────────── */
function AnimatedNumber({ end, duration = 2.4, suffix = '' }) {
  const [value, setValue] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !hasStarted) setHasStarted(true); },
      { threshold: 0.3 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    let startTime = null;
    let animationFrame = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(end * eased));
      if (progress < 1) animationFrame = window.requestAnimationFrame(step);
    };
    animationFrame = window.requestAnimationFrame(step);
    return () => { if (animationFrame) window.cancelAnimationFrame(animationFrame); };
  }, [end, duration, hasStarted]);

  return <span ref={ref}>{value}{suffix}</span>;
}

/* ─── Tilt card ─────────────────────────────── */
function TiltCard({ children, className = '', style = {} }) {
  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className={`shimmer-card relative ${className}`}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/* ─── Particle background ────────────────────── */
const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  size: Math.random() * 4 + 2,
  x: Math.random() * 100,
  y: Math.random() * 100,
  duration: Math.random() * 12 + 8,
  delay: Math.random() * 6,
}));

function HeroParticles() {
  return (
    <>
      {PARTICLES.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </>
  );
}

/* ─── PortfolioPage ──────────────────────────── */
function PortfolioPage() {
  const typedRef = useRef(null);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: -999, y: -999 });

  const heroTyping = Array.isArray(portfolioData?.heroTyping) ? portfolioData.heroTyping : [];
  const socialLinks = portfolioData?.socialLinks ?? {};
  const contactInfo = portfolioData?.contact ?? {};
  const highlights  = Array.isArray(portfolioData?.highlights)    ? portfolioData.highlights    : [];
  const skills      = Array.isArray(portfolioData?.skills)        ? portfolioData.skills        : [];
  const experience  = Array.isArray(portfolioData?.experience)    ? portfolioData.experience    : [];
  const projects    = Array.isArray(portfolioData?.projects)      ? portfolioData.projects      : [];
  const certificates= Array.isArray(portfolioData?.certificates)  ? portfolioData.certificates  : [];
  const education   = portfolioData?.education ?? {};
  const achievements= Array.isArray(portfolioData?.achievements)  ? portfolioData.achievements  : [];
  const whyHireMe   = Array.isArray(portfolioData?.whyHireMe)     ? portfolioData.whyHireMe     : [];

  /* Typed.js */
  useEffect(() => {
    if (!typedRef.current) return;
    const typed = new Typed(typedRef.current, {
      strings: heroTyping,
      typeSpeed: 65,
      backSpeed: 45,
      backDelay: 1400,
      loop: true,
    });
    return () => typed.destroy();
  }, [heroTyping]);

  /* Scroll header style */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Cursor glow */
  useEffect(() => {
    const onMove = (e) => setCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  /* Close mobile nav on resize */
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileNavOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  /* EmailJS submit */
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    if (!serviceId || !templateId || !publicKey) {
      toast.error('EmailJS is not configured yet.');
      setIsSubmitting(false);
      return;
    }
    try {
      await emailjs.send(serviceId, templateId, {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_name: portfolioData.name,
      }, publicKey);
      toast.success("Message sent! I'll get back to you soon.");
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const heroStats = useMemo(() => [
    { value: 3, suffix: '+', label: 'Production AI Projects' },
    { value: 6, suffix: '+', label: 'Certifications'         },
    { value: 2, suffix: '',  label: 'Research Internships'   },
  ], []);

  const socialIconLinks = useMemo(() => [
    { label: 'LinkedIn',  icon: BookOpen,  href: socialLinks.linkedin },
    { label: 'GitHub',    icon: GitBranch, href: socialLinks.github   },
    { label: 'Portfolio', icon: Globe,     href: socialLinks.portfolio },
    { label: 'Email',     icon: Mail,      href: `mailto:${portfolioData?.email ?? ''}` },
    { label: 'Phone',     icon: Phone,     href: `tel:${portfolioData?.phone ?? ''}` },
  ], [socialLinks]);

  /* ── Gradient orb colors for skills ── */
  const categoryColors = {
    'AI & Machine Learning': { from: '#6366f1', to: '#a78bfa' },
    'Backend':               { from: '#22d3ee', to: '#6366f1' },
    'Cloud & Data':          { from: '#34d399', to: '#06b6d4' },
  };

  return (
    <>
      {/* Cursor glow */}
      <div
        className="cursor-glow"
        style={{ left: cursorPos.x, top: cursorPos.y }}
      />

      {/* Noise texture */}
      <div className="noise-overlay" />

      <div className="min-h-screen bg-transparent text-slate-100">
        <Helmet>
          <title>{portfolioData.name} | AI Engineer Portfolio</title>
          <meta name="description" content={portfolioData.summary} />
          <meta property="og:title" content={`${portfolioData.name} | AI Engineer Portfolio`} />
          <meta property="og:description" content={portfolioData.summary} />
        </Helmet>

        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: 'rgba(15,23,42,0.95)',
              color: '#f1f5f9',
              border: '1px solid rgba(99,102,241,0.3)',
              borderRadius: '14px',
              backdropFilter: 'blur(20px)',
            },
          }}
        />

        {/* ── Header ─────────────────────────────────── */}
        <motion.header
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed top-0 z-50 w-full"
          style={{
            background: scrolled
              ? 'rgba(3,7,18,0.85)'
              : 'transparent',
            borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
            backdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
            transition: 'background 0.3s, border-color 0.3s, backdrop-filter 0.3s',
          }}
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6 lg:px-10">
            <ScrollLink
              to="home"
              smooth
              duration={600}
              offset={-80}
              className="cursor-pointer"
            >
              <span
                className="gradient-text text-lg font-bold tracking-[0.18em]"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {portfolioData.name}
              </span>
            </ScrollLink>

            {/* Desktop nav */}
            <nav className="hidden items-center gap-1 md:flex">
              {navItems.map((item) => (
                <ScrollLink
                  key={item}
                  to={item.toLowerCase()}
                  smooth
                  duration={600}
                  offset={-90}
                  spy
                  activeClass="nav-link-active"
                  className="cursor-pointer rounded-xl px-4 py-2 text-sm text-slate-400 transition-all duration-200 hover:bg-white/5 hover:text-white"
                >
                  {item}
                </ScrollLink>
              ))}
            </nav>

            {/* CTA + burger */}
            <div className="flex items-center gap-3">
              <a
                href={portfolioData?.resumeUrl ?? '/rohi-resume.pdf'}
                download
                className="hidden items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-4 py-2 text-sm font-medium text-indigo-200 transition-all hover:bg-indigo-500/20 hover:text-white md:flex"
              >
                <Download size={14} /> Resume
              </a>
              <button
                type="button"
                id="mobile-menu-btn"
                onClick={() => setMobileNavOpen((v) => !v)}
                className="flex items-center justify-center rounded-xl border border-white/10 bg-white/5 p-2 text-slate-300 transition hover:text-white md:hidden"
                aria-label="Toggle menu"
              >
                {mobileNavOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile nav */}
          <AnimatePresence>
            {mobileNavOpen && (
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2 }}
                className="border-t border-white/6 bg-slate-950/95 px-5 py-4 backdrop-blur-2xl md:hidden"
              >
                {navItems.map((item) => (
                  <ScrollLink
                    key={item}
                    to={item.toLowerCase()}
                    smooth
                    duration={600}
                    offset={-90}
                    onClick={() => setMobileNavOpen(false)}
                    className="block cursor-pointer rounded-xl px-3 py-3 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
                  >
                    {item}
                  </ScrollLink>
                ))}
                <a
                  href={portfolioData?.resumeUrl ?? '/rohi-resume.pdf'}
                  download
                  className="mt-3 flex items-center gap-2 rounded-xl bg-indigo-500/15 px-3 py-3 text-sm font-medium text-indigo-200"
                >
                  <Download size={14} /> Download Resume
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>

        <main id="home" className="relative">

          {/* ── HERO ─────────────────────────────────── */}
          <section className="relative flex min-h-screen items-center overflow-hidden px-5 pt-24 pb-16 sm:px-6 lg:px-10">
            {/* Background glow orbs */}
            <div className="pointer-events-none absolute inset-0 -z-10">
              <div
                className="glow-orb"
                style={{
                  width: 600, height: 600,
                  top: '-10%', left: '-8%',
                  background: 'radial-gradient(circle, rgba(99,102,241,0.18), transparent 70%)',
                }}
              />
              <div
                className="glow-orb"
                style={{
                  width: 500, height: 500,
                  bottom: '5%', right: '-5%',
                  background: 'radial-gradient(circle, rgba(139,92,246,0.14), transparent 70%)',
                }}
              />
              <div
                className="glow-orb"
                style={{
                  width: 400, height: 400,
                  top: '40%', left: '40%',
                  background: 'radial-gradient(circle, rgba(59,130,246,0.1), transparent 70%)',
                }}
              />
              <HeroParticles />
            </div>

            <div className="mx-auto w-full max-w-7xl">
              <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">

                {/* Left */}
                <AnimatedSection direction="up" delay={0.1}>
                  <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/8 px-4 py-2 text-sm font-medium text-emerald-300">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                    </span>
                    Available for AI engineering roles
                  </div>

                  <h1
                    className="mt-7 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-[4.5rem] lg:leading-[1.08]"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    Hi, I&apos;m{' '}
                    <span className="gradient-text">{portfolioData.name}</span>
                  </h1>

                  <p className="mt-5 text-xl leading-relaxed text-slate-300 sm:text-2xl">
                    {portfolioData.headline}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-2 text-lg text-slate-400">
                    <span>Building</span>
                    <span
                      ref={typedRef}
                      className="font-semibold text-indigo-300"
                    />
                  </div>

                  <p className="mt-6 max-w-xl text-base leading-8 text-slate-400">
                    {portfolioData.summary}
                  </p>

                  {/* CTAs */}
                  <div className="mt-9 flex flex-wrap gap-3">
                    <a
                      href={portfolioData?.resumeUrl ?? '/rohi-resume.pdf'}
                      download
                      className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-semibold text-slate-950 shadow-[0_4px_24px_rgba(255,255,255,0.15)] transition-all hover:-translate-y-1 hover:bg-slate-100 hover:shadow-[0_8px_32px_rgba(255,255,255,0.2)]"
                    >
                      <Download size={17} className="transition-transform group-hover:-translate-y-0.5" />
                      Download Resume
                    </a>
                    <ScrollLink
                      to="projects"
                      smooth
                      duration={600}
                      offset={-80}
                      className="group inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/12 bg-white/6 px-7 py-3.5 font-semibold text-slate-100 transition-all hover:-translate-y-1 hover:bg-white/10"
                    >
                      View Projects
                      <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
                    </ScrollLink>
                    <ScrollLink
                      to="contact"
                      smooth
                      duration={600}
                      offset={-80}
                      className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-indigo-400/25 bg-indigo-500/10 px-7 py-3.5 font-semibold text-indigo-200 transition-all hover:-translate-y-1 hover:bg-indigo-500/20"
                    >
                      Contact Me <Mail size={17} />
                    </ScrollLink>
                  </div>

                  {/* Social links */}
                  <div className="mt-7 flex flex-wrap items-center gap-3">
                    {socialIconLinks.map(({ label, icon: Icon, href }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        title={label}
                        className="group flex items-center gap-2 rounded-xl border border-white/10 bg-white/4 px-4 py-2.5 text-sm text-slate-400 transition-all hover:border-indigo-400/40 hover:bg-white/8 hover:text-white"
                      >
                        <Icon size={16} />
                        <span className="hidden sm:inline">{label}</span>
                      </a>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="mt-10 flex flex-wrap gap-4">
                    {heroStats.map((item) => (
                      <div
                        key={item.label}
                        className="rounded-2xl border border-white/8 bg-white/4 px-6 py-4 backdrop-blur-sm"
                      >
                        <div
                          className="text-3xl font-bold text-white"
                          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                          <AnimatedNumber end={item.value} suffix={item.suffix} />
                        </div>
                        <p className="mt-1 text-sm text-slate-400">{item.label}</p>
                      </div>
                    ))}
                  </div>
                </AnimatedSection>

                {/* Right — glassy terminal card */}
                <AnimatedSection direction="right" delay={0.25} className="relative">
                  <div
                    className="relative mx-auto max-w-md"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(99,102,241,0.06) 100%)',
                      border: '1px solid rgba(255,255,255,0.09)',
                      borderRadius: '28px',
                      boxShadow: '0 40px 130px rgba(0,0,0,0.55), 0 0 0 1px rgba(99,102,241,0.1)',
                      backdropFilter: 'blur(24px)',
                      padding: '6px',
                    }}
                  >
                    {/* Glow border accent */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: -1,
                        borderRadius: 28,
                        background: 'linear-gradient(135deg, rgba(99,102,241,0.3), rgba(139,92,246,0.2), transparent 60%)',
                        zIndex: -1,
                        filter: 'blur(1px)',
                      }}
                    />
                    <div
                      style={{
                        background: 'rgba(3,7,18,0.75)',
                        borderRadius: '24px',
                        overflow: 'hidden',
                      }}
                    >
                      {/* Terminal bar */}
                      <div className="flex items-center gap-2 border-b border-white/6 px-5 py-3.5">
                        <span className="h-3 w-3 rounded-full bg-rose-400/80" />
                        <span className="h-3 w-3 rounded-full bg-amber-400/80" />
                        <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
                        <span className="ml-4 text-xs text-slate-500">ai_engineer.profile</span>
                      </div>

                      <div className="p-7">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-500/10 px-3.5 py-1.5 text-xs font-medium text-indigo-300">
                          <Zap size={12} /> Building intelligent systems
                        </div>

                        <p className="mt-5 text-lg font-semibold text-white">Specializing in</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {['LLMs', 'RAG', 'MCP', 'Agents', 'FastAPI'].map((item) => (
                            <motion.span
                              key={item}
                              whileHover={{ scale: 1.06, y: -2 }}
                              className="rounded-full border border-indigo-400/20 bg-indigo-500/10 px-3.5 py-1.5 text-sm font-medium text-indigo-200"
                            >
                              {item}
                            </motion.span>
                          ))}
                        </div>

                        {/* Current focus box */}
                        <div className="mt-6 rounded-2xl border border-white/8 bg-slate-950/60 p-5">
                          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Current focus</p>
                          <p className="mt-2.5 text-sm leading-7 text-slate-300">
                            Building LLM-native products with retrieval, orchestration, and measurable quality.
                          </p>
                        </div>

                        {/* Tech stack row */}
                        <div className="mt-5 flex flex-wrap gap-2">
                          {['Python', 'Azure AI', 'AWS Bedrock', 'ChromaDB'].map((tech) => (
                            <span
                              key={tech}
                              className="rounded-lg border border-white/6 bg-white/3 px-2.5 py-1 text-xs text-slate-400"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              </div>

              {/* Scroll indicator */}
              <div className="mt-16 flex justify-center">
                <ScrollLink to="about" smooth duration={600} offset={-80} className="cursor-pointer">
                  <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                    className="flex flex-col items-center gap-2 text-xs text-slate-500 transition hover:text-slate-300"
                  >
                    <span>Scroll</span>
                    <div className="h-10 w-6 rounded-full border border-white/15 p-1.5">
                      <div className="h-3 w-2 rounded-full bg-indigo-400/70" />
                    </div>
                  </motion.div>
                </ScrollLink>
              </div>
            </div>
          </section>

          {/* ── ABOUT ────────────────────────────────── */}
          <section id="about" className="mx-auto max-w-7xl px-5 py-28 sm:px-6 lg:px-10">
            <AnimatedSection delay={0.1} className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">

              {/* Left card */}
              <div
                className="rounded-3xl p-8"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.03), rgba(99,102,241,0.06))',
                  border: '1px solid rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(20px)',
                }}
              >
                {/* Avatar */}
                <div className="relative inline-block">
                  <div
                    className="flex h-24 w-24 items-center justify-center rounded-2xl text-3xl font-bold text-white"
                    style={{
                      background: 'linear-gradient(135deg, #4f46e5, #7c3aed, #2563eb)',
                      boxShadow: '0 16px 60px rgba(99,102,241,0.35)',
                      fontFamily: "'Space Grotesk', sans-serif",
                    }}
                  >
                    RG
                  </div>
                </div>

                <div className="mt-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-indigo-400">About</p>
                  <h3
                    className="mt-3 text-2xl font-bold text-white leading-tight"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    Production AI engineer with research depth.
                  </h3>
                  <p className="mt-4 text-base leading-8 text-slate-400">{portfolioData.about}</p>
                </div>

                {/* Location + status */}
                <div className="mt-7 flex flex-wrap gap-3">
                  <div className="flex items-center gap-2 rounded-xl border border-white/8 bg-white/4 px-4 py-2 text-sm text-slate-300">
                    <MapPin size={14} className="text-indigo-400" />
                    {portfolioData.location}
                  </div>
                  <div className="flex items-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-500/8 px-4 py-2 text-sm text-emerald-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    {portfolioData.openTo}
                  </div>
                </div>
              </div>

              {/* Right card */}
              <div
                className="rounded-3xl p-8"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.03), rgba(99,102,241,0.05))',
                  border: '1px solid rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(20px)',
                }}
              >
                <SectionTitle
                  eyebrow="Profile"
                  title="From research to shipped AI products"
                  description="Building structured, measurable systems with a strong emphasis on reliability, retrieval quality, and user experience."
                  align="left"
                />

                <div className="mt-7 flex flex-wrap gap-2">
                  {highlights.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/8 bg-white/4 px-3.5 py-1.5 text-sm text-slate-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="mt-9 grid gap-4 md:grid-cols-3">
                  {[
                    { year: '2024', title: 'Research Intern', subtitle: 'SRIHER', color: '#6366f1' },
                    { year: '2024', title: 'Research Intern', subtitle: 'Trucking Mgmt', color: '#8b5cf6' },
                    { year: '2026', title: 'AI Eng. Intern',  subtitle: 'Spotnxt', color: '#22d3ee' },
                  ].map((item) => (
                    <motion.div
                      key={item.subtitle}
                      whileHover={{ y: -6, scale: 1.02 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                      className="rounded-2xl border border-white/8 bg-slate-950/60 p-5"
                      style={{ borderTop: `2px solid ${item.color}` }}
                    >
                      <p
                        className="text-2xl font-bold"
                        style={{ color: item.color, fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        {item.year}
                      </p>
                      <p className="mt-2 text-sm font-semibold text-slate-200">{item.title}</p>
                      <p className="mt-0.5 text-xs text-slate-500">{item.subtitle}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </section>

          {/* ── SKILLS ───────────────────────────────── */}
          <section id="skills" className="mx-auto max-w-7xl px-5 py-28 sm:px-6 lg:px-10">
            <AnimatedSection delay={0.05}>
              <SectionTitle
                eyebrow="Skills"
                title="A modern stack for AI-native products"
                description="Thoughtfully chosen tools and systems for building intelligent, reliable, and production-ready experiences."
              />
            </AnimatedSection>

            <div className="mt-14 space-y-6">
              {skills.map((group, gIdx) => {
                const colors = categoryColors[group.category] || { from: '#6366f1', to: '#a78bfa' };
                return (
                  <AnimatedSection key={group.category} delay={0.1 * gIdx} direction="up">
                    <div
                      className="rounded-3xl p-8"
                      style={{
                        background: 'rgba(255,255,255,0.025)',
                        border: '1px solid rgba(255,255,255,0.07)',
                        backdropFilter: 'blur(20px)',
                      }}
                    >
                      <div className="flex items-center gap-3 mb-8">
                        <div
                          className="h-3 w-3 rounded-full"
                          style={{ background: `linear-gradient(135deg, ${colors.from}, ${colors.to})` }}
                        />
                        <h3
                          className="text-xl font-bold text-white"
                          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                          {group.category}
                        </h3>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                        {(Array.isArray(group?.items) ? group.items : []).map((skill, sIdx) => {
                          const Icon = iconMap[skill.icon] || Sparkles;
                          return (
                            <motion.div
                              key={skill.name}
                              whileHover={{ y: -5, scale: 1.015 }}
                              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                              className="shimmer-card relative overflow-hidden rounded-2xl border border-white/8 bg-slate-950/50 p-5"
                            >
                              <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                  <div
                                    className="rounded-xl p-2.5"
                                    style={{
                                      background: `linear-gradient(135deg, ${colors.from}15, ${colors.to}20)`,
                                      border: `1px solid ${colors.from}30`,
                                    }}
                                  >
                                    <Icon size={16} style={{ color: colors.from }} />
                                  </div>
                                  <p className="text-sm font-semibold text-slate-100">{skill.name}</p>
                                </div>
                                <span className="text-xs font-semibold text-slate-500">{skill.level}%</span>
                              </div>
                              <div className="h-1.5 w-full rounded-full bg-slate-800/80">
                                <motion.div
                                  initial={{ width: 0 }}
                                  whileInView={{ width: `${skill.level}%` }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 1, delay: 0.05 * sIdx, ease: [0.22, 1, 0.36, 1] }}
                                  className="h-1.5 rounded-full"
                                  style={{ background: `linear-gradient(90deg, ${colors.from}, ${colors.to})` }}
                                />
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>
          </section>

          {/* ── EXPERIENCE ───────────────────────────── */}
          <section id="experience" className="mx-auto max-w-7xl px-5 py-28 sm:px-6 lg:px-10">
            <AnimatedSection delay={0.05}>
              <SectionTitle
                eyebrow="Experience"
                title="A strong blend of product and research"
                description="The work spans applied AI, ML systems, and engineering collaboration in fast-moving environments."
              />
            </AnimatedSection>

            <div className="mt-14 space-y-5">
              {experience.map((item, index) => (
                <AnimatedSection
                  key={`${item.title}-${index}`}
                  delay={0.1 * index}
                  direction={index % 2 === 0 ? 'left' : 'right'}
                >
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ type: 'spring', stiffness: 220, damping: 24 }}
                    className="shimmer-card relative overflow-hidden rounded-3xl p-8"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(99,102,241,0.05) 100%)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      backdropFilter: 'blur(20px)',
                    }}
                  >
                    {/* Accent line */}
                    <div
                      className="absolute left-0 top-0 h-full w-1 rounded-l-3xl"
                      style={{
                        background: index === 0
                          ? 'linear-gradient(180deg, #6366f1, #a78bfa)'
                          : index === 1
                          ? 'linear-gradient(180deg, #22d3ee, #6366f1)'
                          : 'linear-gradient(180deg, #34d399, #22d3ee)',
                      }}
                    />
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                      <div className="flex-1">
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-400">
                          {item.period}
                        </p>
                        <h3
                          className="mt-3 text-2xl font-bold text-white"
                          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                          {item.title}
                        </h3>
                        <p className="mt-1.5 text-base font-medium text-slate-300">{item.company}</p>
                        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400">{item.description}</p>
                        {item.projectLink && (
                          <a
                            href={item.projectLink}
                            target="_blank"
                            rel="noreferrer"
                            className="group mt-4 inline-flex items-center gap-2 text-sm font-medium text-indigo-400 transition hover:text-white"
                          >
                            View project{' '}
                            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                          </a>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2 lg:max-w-xs">
                        {item.highlights.map((highlight) => (
                          <span
                            key={highlight}
                            className="rounded-xl border border-white/8 bg-white/4 px-3 py-1.5 text-xs font-medium text-slate-300"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>
          </section>

          {/* ── PROJECTS ─────────────────────────────── */}
          <section id="projects" className="mx-auto max-w-7xl px-5 py-28 sm:px-6 lg:px-10">
            <AnimatedSection delay={0.05}>
              <SectionTitle
                eyebrow="Projects"
                title="Shipped concepts and product-minded AI systems"
                description="Each project is designed to be practical, extensible, and aligned with real product needs."
              />
            </AnimatedSection>

            <div className="mt-14 grid gap-7 lg:grid-cols-3">
              {projects.map((project, index) => (
                <AnimatedSection key={project.title} delay={0.1 * index} direction="up">
                  <TiltCard
                    className="flex h-full flex-col rounded-3xl p-7"
                    style={{
                      background: 'linear-gradient(160deg, rgba(15,23,42,0.95) 0%, rgba(30,27,75,0.5) 100%)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      minHeight: '380px',
                    }}
                  >
                    {/* Header */}
                    <div className="mb-5 flex items-start justify-between">
                      <div
                        className="rounded-2xl p-3"
                        style={{
                          background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.15))',
                          border: '1px solid rgba(99,102,241,0.25)',
                        }}
                      >
                        <Cpu size={20} className="text-indigo-300" />
                      </div>
                      <BadgeCheck size={18} className="text-indigo-400" />
                    </div>

                    <h3
                      className="text-xl font-bold text-white leading-snug"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {project.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-slate-400 flex-1">{project.description}</p>

                    {/* Tags */}
                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-indigo-400/15 bg-indigo-500/8 px-3 py-1 text-xs font-medium text-indigo-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Features */}
                    <div className="mt-5 space-y-2">
                      {project.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2 text-xs text-slate-300">
                          <CheckCircle2 size={14} className="text-indigo-400 " />
                          {feature}
                        </div>
                        
                      ))}
                    </div>

                    {/* Links */}
<div className="mt-auto pt-6 flex gap-3">
  <a
    href={project.github}
    target="_blank"
    rel="noopener noreferrer"
    className="flex-1 flex items-center justify-center rounded-xl border border-white/10 bg-white/5 py-3 text-sm font-semibold text-slate-200 hover:bg-white/10 transition-all"
  >
    GitHub
  </a>

  <a
    href={project.demo}
    target="_blank"
    rel="noopener noreferrer"
    className="flex-1 flex items-center justify-center rounded-xl border border-indigo-500/30 bg-indigo-500/10 py-3 text-sm font-semibold text-indigo-200 hover:bg-indigo-500/20 transition-all"
  >
    Demo
  </a>
</div>
                  </TiltCard>

                </AnimatedSection>
              ))}
            </div>
          </section>

          {/* ── CERTIFICATIONS ───────────────────────── */}
          <section id="certifications" className="mx-auto max-w-7xl px-5 py-28 sm:px-6 lg:px-10">
            <AnimatedSection delay={0.05}>
              <SectionTitle
                eyebrow="Certifications"
                title="Credibility that matches the craft"
                description="A portfolio of credentials across modern AI platforms and applied machine learning ecosystems."
              />
            </AnimatedSection>

            <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {certificates.map((certificate, index) => (
                <AnimatedSection key={certificate.title} delay={0.08 * index} direction="up">
                  <motion.div
                    whileHover={{ y: -6, scale: 1.015 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                    className="shimmer-card relative overflow-hidden rounded-2xl p-6"
                    style={{
                      background: 'rgba(255,255,255,0.025)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      backdropFilter: 'blur(20px)',
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-400">
                          {certificate.provider}
                        </p>
                        <h3 className="mt-3 text-lg font-bold text-white leading-snug">
                          {certificate.title}
                        </h3>
                      </div>
                      <div
                        className="rounded-full p-2.5"
                        style={{
                          background: 'rgba(52,211,153,0.1)',
                          border: '1px solid rgba(52,211,153,0.25)',
                        }}
                      >
                        <BadgeCheck size={18} className="text-emerald-400" />
                      </div>
                    </div>
                    <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-500">
                      <span className="flex items-center gap-1.5">
                        <span className="h-1 w-1 rounded-full bg-slate-600" />
                        {certificate.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="h-1 w-1 rounded-full bg-slate-600" />
                        ID: {certificate.credentialId}
                      </span>
                    </div>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>
          </section>

          {/* ── EDUCATION ────────────────────────────── */}
          <section id="education" className="mx-auto max-w-7xl px-5 py-28 sm:px-6 lg:px-10">
            <AnimatedSection direction="up">
              <div
                className="rounded-3xl p-10"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.025), rgba(99,102,241,0.06))',
                  border: '1px solid rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(20px)',
                }}
              >
                <SectionTitle
                  eyebrow="Education"
                  title="Computer Engineering with an AI/ML focus"
                  description="A rigorous academic foundation paired with hands-on applied AI work."
                  align="left"
                />
                <div className="mt-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <h3
                      className="text-2xl font-bold text-white"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {education.degree}
                    </h3>
                    <p className="mt-2 text-lg font-medium text-slate-300">{education.institution}</p>
                    <p className="mt-1.5 text-sm text-slate-500">{education.expected}</p>
                  </div>
                  <div
                    className="rounded-2xl px-8 py-6 text-center"
                    style={{
                      background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.12))',
                      border: '1px solid rgba(99,102,241,0.25)',
                    }}
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-indigo-400">CGPA</p>
                    <p
                      className="mt-2 text-5xl font-bold text-white"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {education.cgpa}
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </section>

          {/* ── ACHIEVEMENTS ─────────────────────────── */}
          <section className="mx-auto max-w-7xl px-5 py-28 sm:px-6 lg:px-10">
            <AnimatedSection direction="up">
              <div
                className="rounded-3xl p-10"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.025), rgba(99,102,241,0.05))',
                  border: '1px solid rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(20px)',
                }}
              >
                <SectionTitle
                  eyebrow="Achievements"
                  title="Proof of momentum and depth"
                  description="Measured impact across projects, certifications, and research experience."
                />
                <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                  {achievements.map((item, idx) => {
                    const colors = [
                      { from: '#6366f1', to: '#a78bfa' },
                      { from: '#22d3ee', to: '#6366f1' },
                      { from: '#34d399', to: '#22d3ee' },
                      { from: '#f59e0b', to: '#f97316' },
                    ];
                    const c = colors[idx % colors.length];
                    const numericVal = Number(item.value.replace('+', '').replace('%', ''));
                    const hasSuffix = item.value.includes('+') ? '+' : item.value.includes('%') ? '%' : '';
                    return (
                      <motion.div
                        key={item.label}
                        whileHover={{ y: -8, scale: 1.03 }}
                        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                        className="relative overflow-hidden rounded-2xl border border-white/8 bg-slate-950/60 p-7 text-center"
                      >
                        <div
                          className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-2xl"
                          style={{ background: `linear-gradient(90deg, ${c.from}, ${c.to})` }}
                        />
                        <div
                          className="text-5xl font-bold"
                          style={{ fontFamily: "'Space Grotesk', sans-serif", background: `linear-gradient(135deg, ${c.from}, ${c.to})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                        >
                          <AnimatedNumber end={numericVal} suffix={hasSuffix} />
                        </div>
                        <p className="mt-3 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                          {item.label}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </AnimatedSection>
          </section>

          {/* ── WHY HIRE ME ──────────────────────────── */}
          <section className="mx-auto max-w-7xl px-5 py-28 sm:px-6 lg:px-10">
            <AnimatedSection direction="up">
              <div
                className="rounded-3xl p-10"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.025), rgba(99,102,241,0.05))',
                  border: '1px solid rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(20px)',
                }}
              >
                <SectionTitle
                  eyebrow="Why Hire Me"
                  title="High-signal AI engineering with product instincts"
                  description="Connecting research clarity, engineering discipline, and product thinking into meaningful AI features."
                  align="left"
                />
                <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  {whyHireMe.map((item, index) => {
                    const icons = [Bot, Zap, Brain, Rocket, Code2, Cloud, GitBranch, Sparkles];
                    const Icon = icons[index % icons.length];
                    const gradients = [
                      'from-indigo-500/15 to-violet-500/10',
                      'from-cyan-500/15 to-blue-500/10',
                      'from-violet-500/15 to-purple-500/10',
                      'from-emerald-500/15 to-teal-500/10',
                    ];
                    return (
                      <motion.div
                        key={item}
                        whileHover={{ y: -8, scale: 1.03 }}
                        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                        className={`shimmer-card relative overflow-hidden rounded-2xl border border-white/8 bg-gradient-to-br ${gradients[index % gradients.length]} p-6`}
                      >
                        <div
                          className="mb-4 inline-flex rounded-xl p-2.5"
                          style={{
                            background: 'rgba(99,102,241,0.15)',
                            border: '1px solid rgba(99,102,241,0.25)',
                          }}
                        >
                          <Icon size={18} className="text-indigo-300" />
                        </div>
                        <p className="text-sm font-semibold text-slate-100 leading-snug">{item}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </AnimatedSection>
          </section>

          {/* ── CONTACT ──────────────────────────────── */}
          <section id="contact" className="mx-auto max-w-7xl px-5 py-28 sm:px-6 lg:px-10">
            <AnimatedSection direction="up">
              <div
                className="rounded-3xl p-10"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.025), rgba(99,102,241,0.06))',
                  border: '1px solid rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(20px)',
                }}
              >
                <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
                  {/* Left */}
                  <div>
                    <SectionTitle
                      eyebrow="Contact"
                      title="Let's build something remarkable"
                      description="Open to opportunities across AI products, LLM platforms, MCP systems, and intelligent automation."
                      align="left"
                    />
                    <div className="mt-10 space-y-4">
                      {[
                        { icon: Mail,      label: contactInfo.email,    href: `mailto:${contactInfo.email ?? ''}` },
                        { icon: Phone,     label: contactInfo.phone,    href: `tel:${contactInfo.phone ?? ''}` },
                        { icon: BookOpen,  label: 'LinkedIn',           href: contactInfo.linkedin },
                        { icon: GitBranch, label: 'GitHub',             href: contactInfo.github },
                        { icon: Globe,     label: 'Portfolio',          href: contactInfo.portfolio },
                      ].map(({ icon: Icon, label, href }) => (
                        <a
                          key={label}
                          href={href}
                          target={href.startsWith('http') ? '_blank' : undefined}
                          rel="noreferrer"
                          className="group flex items-center gap-4 rounded-2xl border border-white/6 bg-white/3 px-5 py-3.5 text-sm text-slate-300 transition-all hover:border-indigo-400/25 hover:bg-white/6 hover:text-white"
                        >
                          <Icon size={16} className="text-indigo-400 flex-shrink-0" />
                          <span>{label}</span>
                          <ArrowRight size={14} className="ml-auto opacity-0 transition group-hover:opacity-100 group-hover:translate-x-1" />
                        </a>
                      ))}
                      <div className="flex items-center gap-4 rounded-2xl border border-white/6 bg-white/3 px-5 py-3.5 text-sm text-slate-400">
                        <MapPin size={16} className="text-indigo-400 flex-shrink-0" />
                        <span>{contactInfo.location} · {contactInfo.openTo}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right — form */}
                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4 rounded-2xl border border-white/8 bg-slate-950/50 p-7"
                  >
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">Name</label>
                        <input
                          id="contact-name"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="form-input"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">Email</label>
                        <input
                          id="contact-email"
                          required
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="form-input"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">Subject</label>
                      <input
                        id="contact-subject"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="form-input"
                        placeholder="Subject"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">Message</label>
                      <textarea
                        id="contact-message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="form-input resize-none"
                        placeholder="Tell me about your project..."
                      />
                    </div>
                    <motion.button
                      type="submit"
                      id="contact-submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="mt-1 inline-flex items-center justify-center gap-2.5 rounded-2xl bg-white py-4 font-semibold text-slate-950 shadow-[0_4px_24px_rgba(255,255,255,0.1)] transition-all hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isSubmitting ? (
                        <>Sending...</>
                      ) : (
                        <>Send Message <ArrowRight size={16} /></>
                      )}
                    </motion.button>
                  </form>
                </div>
              </div>
            </AnimatedSection>
          </section>
        </main>

        {/* ── FOOTER ─────────────────────────────────── */}
        <footer
          style={{
            borderTop: '1px solid rgba(255,255,255,0.06)',
            background: 'rgba(3,7,18,0.85)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-10 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-10">
            <div>
              <p
                className="gradient-text text-lg font-bold tracking-[0.18em]"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {portfolioData.name}
              </p>
              <p className="mt-1.5 text-sm text-slate-500">Built with React + Vite + TailwindCSS + Framer Motion</p>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-slate-500">
              <a
                href={portfolioData?.resumeUrl ?? '/rohi-resume.pdf'}
                download
                className="transition hover:text-white"
              >
                Resume
              </a>
              {['About', 'Projects', 'Contact'].map((item) => (
                <ScrollLink
                  key={item}
                  to={item.toLowerCase()}
                  smooth
                  duration={600}
                  offset={-80}
                  className="cursor-pointer transition hover:text-white"
                >
                  {item}
                </ScrollLink>
              ))}
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-white"
              >
                GitHub
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default PortfolioPage;
