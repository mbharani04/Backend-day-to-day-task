import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Certificates', href: '#certifications' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Scroll progress
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress(window.scrollY / totalScroll);
      }

      // Backdrop effect on scroll
      setIsScrolled(window.scrollY > 20);

      // Section intersection detection
      const currentScrollY = window.scrollY + window.innerHeight / 3;
      let active = 'home';

      navItems.forEach((item) => {
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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e, href) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 h-[3px] bg-transparent z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent origin-left"
          style={{ scaleX: scrollProgress }}
        />
      </div>

      {/* Floating Navbar Container */}
      <header
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-6xl transition-all duration-300 rounded-full ${
          isScrolled 
            ? 'glass-panel shadow-lg shadow-black/10 py-3 px-6' 
            : 'bg-transparent py-5 px-6'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo / Name */}
          <a
            href="#home"
            onClick={(e) => handleClick(e, '#home')}
            className="font-display font-bold text-lg md:text-xl tracking-tight bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent hover:opacity-80 transition-opacity"
          >
            BHARANI M
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 relative">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleClick(e, item.href)}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-full ${
                    isActive ? 'text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activePill"
                      className="absolute inset-0 bg-white/5 border border-white/10 rounded-full -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {item.name}
                </a>
              );
            })}
          </nav>

          {/* CTA: Let's Connect (Desktop) */}
          <div className="hidden md:block">
            <a
              href="#contact"
              onClick={(e) => handleClick(e, '#contact')}
              className="text-xs font-semibold uppercase tracking-wider px-5 py-2.5 rounded-full border border-brand-primary/40 bg-brand-primary/10 hover:bg-brand-primary/20 hover:border-brand-primary text-brand-primary transition-all duration-300"
            >
              Let's Connect
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-full text-gray-300 hover:text-white hover:bg-white/5 transition-colors focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <HiX size={22} /> : <HiMenuAlt3 size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            />

            {/* Menu Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 w-[80%] max-w-sm bg-[#0d1220]/95 border-l border-white/5 z-50 p-8 flex flex-col justify-between md:hidden"
            >
              <div>
                <div className="flex justify-between items-center mb-8">
                  <span className="font-display font-bold text-lg bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent">
                    Navigation
                  </span>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-full hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                  >
                    <HiX size={20} />
                  </button>
                </div>

                <nav className="flex flex-col gap-3">
                  {navItems.map((item) => {
                    const isActive = activeSection === item.href.substring(1);
                    return (
                      <a
                        key={item.name}
                        href={item.href}
                        onClick={(e) => handleClick(e, item.href)}
                        className={`text-lg font-medium py-2.5 px-4 rounded-xl transition-all duration-300 flex items-center ${
                          isActive
                            ? 'bg-brand-primary/10 border-l-4 border-brand-primary text-white font-semibold'
                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {item.name}
                      </a>
                    );
                  })}
                </nav>
              </div>

              <div>
                <a
                  href="#contact"
                  onClick={(e) => handleClick(e, '#contact')}
                  className="w-full block text-center py-3.5 rounded-xl bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-semibold hover:opacity-90 transition-all border border-white/10"
                >
                  Get In Touch
                </a>
                <p className="text-center text-xs text-gray-500 mt-4">
                  © 2026 Bharani M • Chennai, India
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
