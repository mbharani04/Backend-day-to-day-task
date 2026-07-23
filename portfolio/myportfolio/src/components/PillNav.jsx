import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import './PillNav.css';

/**
 * React Bits PillNav Component
 * Animated circular fill pill navigation with vertical text sliding and GSAP animations.
 */
export default function PillNav({
  items = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#technical-skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' }
  ],
  logoText = 'BM',
  logoFullText = 'BHARANI M',
  logoHref = '#home'
}) {
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navContainerRef = useRef(null);
  const logoRef = useRef(null);
  const pillsRef = useRef([]);
  const mobileMenuRef = useRef(null);
  const hamburgerRef = useRef(null);

  // Scroll listener for section intersection detection & backdrop blur state
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress(window.scrollY / totalScroll);
      }

      setIsScrolled(window.scrollY > 20);

      const currentScrollY = window.scrollY + window.innerHeight / 3;
      let active = 'home';

      items.forEach((item) => {
        const sectionId = item.href.substring(1);
        const element = document.getElementById(sectionId);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (currentScrollY >= offsetTop && currentScrollY < offsetTop + offsetHeight) {
            active = sectionId;
          }
        }
      });

      setActiveSection(active);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, [items]);

  // Initial Page-Load GSAP Entrance Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate container down
      gsap.fromTo(
        navContainerRef.current,
        { y: -40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      );

      // Animate logo spin in
      if (logoRef.current) {
        gsap.fromTo(
          logoRef.current,
          { scale: 0, rotate: -180 },
          { scale: 1, rotate: 0, duration: 0.7, delay: 0.2, ease: 'back.out(1.5)' }
        );
      }

      // Stagger animate nav pills
      const validPills = pillsRef.current.filter(Boolean);
      if (validPills.length > 0) {
        gsap.fromTo(
          validPills,
          { y: -20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.06,
            delay: 0.35,
            ease: 'power2.out'
          }
        );
      }
    }, navContainerRef);

    return () => ctx.revert();
  }, []);

  // GSAP Pill Item Hover Handler (React Bits Circular Fill & Vertical Text Slide)
  const handlePillMouseEnter = (e) => {
    const pill = e.currentTarget;
    const hoverBg = pill.querySelector('.pill-hover-bg');
    const textDefault = pill.querySelector('.pill-text-default');
    const textHover = pill.querySelector('.pill-text-hover');

    if (!hoverBg || !textDefault || !textHover) return;

    gsap.killTweensOf([hoverBg, textDefault, textHover]);

    // Circular background expand
    gsap.to(hoverBg, {
      scale: 1,
      opacity: 1,
      duration: 0.35,
      ease: 'power2.out'
    });

    // Vertical text slide up
    gsap.to(textDefault, {
      y: '-100%',
      duration: 0.3,
      ease: 'power2.inOut'
    });

    gsap.to(textHover, {
      y: '0%',
      duration: 0.3,
      ease: 'power2.inOut'
    });
  };

  const handlePillMouseLeave = (e) => {
    const pill = e.currentTarget;
    const hoverBg = pill.querySelector('.pill-hover-bg');
    const textDefault = pill.querySelector('.pill-text-default');
    const textHover = pill.querySelector('.pill-text-hover');

    if (!hoverBg || !textDefault || !textHover) return;

    gsap.killTweensOf([hoverBg, textDefault, textHover]);

    // Circular background shrink back
    gsap.to(hoverBg, {
      scale: 0,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in'
    });

    // Text slides back down
    gsap.to(textDefault, {
      y: '0%',
      duration: 0.3,
      ease: 'power2.inOut'
    });

    gsap.to(textHover, {
      y: '100%',
      duration: 0.3,
      ease: 'power2.inOut'
    });
  };

  // Logo Circular 360 Rotation on Hover
  const handleLogoMouseEnter = () => {
    if (logoRef.current) {
      gsap.to(logoRef.current, {
        rotate: '+=360',
        duration: 0.6,
        ease: 'power2.inOut'
      });
    }
  };

  // Smooth Scroll Click Handler
  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const offsetTop = targetElement.offsetTop - 85;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  // GSAP Mobile Menu Animate
  useEffect(() => {
    if (mobileMenuRef.current) {
      if (isMobileMenuOpen) {
        gsap.fromTo(
          mobileMenuRef.current,
          { opacity: 0, y: -20, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: 'back.out(1.2)' }
        );
      }
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Scroll Progress Bar at Top */}
      <div className="fixed top-0 left-0 right-0 h-[3px] bg-transparent z-50 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent origin-left transition-transform duration-100 ease-out"
          style={{ transform: `scaleX(${scrollProgress})` }}
        />
      </div>

      {/* Main Pill Floating Header */}
      <header
        ref={navContainerRef}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-6xl transition-all duration-500 rounded-full"
        role="navigation"
        aria-label="Main Portfolio Navigation"
      >
        <div
          className={`flex items-center justify-between px-3.5 sm:px-5 py-2.5 rounded-full transition-all duration-300 ${
            isScrolled
              ? 'bg-[#0B0F19]/85 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/40'
              : 'bg-[#0F172A]/60 backdrop-blur-lg border border-white/5 shadow-lg shadow-black/10'
          }`}
        >
          {/* Circular Logo & Portfolio Title */}
          <a
            href={logoHref}
            onClick={(e) => handleNavClick(e, logoHref)}
            onMouseEnter={handleLogoMouseEnter}
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="Homepage"
          >
            {/* Circular Rounded Logo Badge with 360 Rotation */}
            <div
              ref={logoRef}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-tr from-brand-primary via-brand-secondary to-brand-accent p-[2px] shadow-md shadow-brand-primary/20 shrink-0"
            >
              <div className="w-full h-full rounded-full bg-[#0B0F19] flex items-center justify-center text-white font-mono font-bold text-xs tracking-wider">
                {logoText}
              </div>
            </div>

            {/* Brand Name Text */}
            <span className="font-display font-extrabold text-sm sm:text-base tracking-tight bg-gradient-to-r from-white via-gray-200 to-brand-accent bg-clip-text text-transparent group-hover:opacity-90 transition-opacity hidden sm:inline-block">
              {logoFullText}
            </span>
          </a>

          {/* Desktop Navigation - PillNav Items */}
          <nav className="hidden md:flex items-center gap-1.5 p-1 bg-white/[0.03] rounded-full border border-white/5">
            {items.map((item, index) => {
              const sectionId = item.href.substring(1);
              const isActive = activeSection === sectionId;

              return (
                <a
                  key={item.name}
                  ref={(el) => (pillsRef.current[index] = el)}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  onMouseEnter={handlePillMouseEnter}
                  onMouseLeave={handlePillMouseLeave}
                  className={`pill-item px-4 py-2 text-xs sm:text-sm font-medium rounded-full transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-brand-primary to-brand-secondary text-white shadow-md shadow-brand-primary/20 font-semibold border border-white/20'
                      : 'text-gray-300 hover:text-white border border-transparent'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {/* React Bits Circular Hover Fill Background */}
                  <span className="pill-hover-bg bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent" />

                  {/* Vertical Sliding Text Container */}
                  <span className="pill-text-wrapper relative z-10">
                    <span className="pill-text-default">{item.name}</span>
                    <span className="pill-text-hover text-white font-semibold">{item.name}</span>
                  </span>
                </a>
              );
            })}
          </nav>

          {/* CTA / Quick Action (Desktop) */}
          <div className="hidden md:flex items-center">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="text-xs font-mono font-semibold uppercase tracking-wider px-4.5 py-2 rounded-full border border-brand-primary/40 bg-brand-primary/10 hover:bg-brand-primary hover:border-brand-primary text-brand-primary hover:text-white transition-all duration-300 shadow-sm hover:shadow-brand-primary/20"
            >
              Let's Connect
            </a>
          </div>

          {/* Circular Hamburger Button (Mobile < 768px) */}
          <button
            ref={hamburgerRef}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <HiX size={20} /> : <HiMenuAlt3 size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Popover Drawer */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-40 md:hidden transition-opacity duration-300"
          />

          {/* Mobile Rounded Popover Menu */}
          <div
            ref={mobileMenuRef}
            className="fixed top-20 right-4 left-4 z-50 p-6 rounded-3xl bg-[#0D1322]/95 border border-white/10 shadow-2xl backdrop-blur-xl md:hidden flex flex-col gap-4"
          >
            <div className="flex justify-between items-center pb-3 border-b border-white/5">
              <span className="text-xs font-mono tracking-widest text-brand-accent uppercase font-bold">
                Navigation
              </span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 text-gray-400 hover:text-white"
              >
                <HiX size={18} />
              </button>
            </div>

            {/* Mobile Pill Nav Items */}
            <nav className="flex flex-col gap-2">
              {items.map((item) => {
                const sectionId = item.href.substring(1);
                const isActive = activeSection === sectionId;

                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`text-base font-medium py-3 px-5 rounded-2xl transition-all duration-300 flex items-center justify-between ${
                      isActive
                        ? 'bg-gradient-to-r from-brand-primary/20 to-brand-secondary/20 border-l-4 border-brand-primary text-white font-semibold'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span>{item.name}</span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-brand-primary shadow-sm shadow-brand-primary" />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Mobile CTA */}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="w-full text-center py-3 rounded-2xl bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-semibold text-sm shadow-lg shadow-brand-primary/20 mt-2 border border-white/10"
            >
              Get In Touch
            </a>
          </div>
        </>
      )}
    </>
  );
}
