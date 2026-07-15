import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  const handleClick = (e, href) => {
    e.preventDefault();
    const targetElement = document.getElementById(href.substring(1));
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth',
      });
    }
  };

  return (
    <footer className="relative mt-20 border-t border-white/5 bg-[#070b13]/80 backdrop-blur-md py-12 overflow-hidden">
      {/* Decorative gradient blur in footer background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-brand-primary/30 to-transparent" />
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-80 h-80 bg-brand-primary/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        {/* Name / Description */}
        <div className="text-center md:text-left">
          <a
            href="#home"
            onClick={(e) => handleClick(e, '#home')}
            className="font-display font-bold text-xl bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent hover:opacity-80 transition-opacity"
          >
            BHARANI M
          </a>
          <p className="text-sm text-gray-500 mt-2">
            Electronics & Communication Student • Full Stack & Embedded Systems Dev
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400 font-medium">
          <a href="#about" onClick={(e) => handleClick(e, '#about')} className="hover:text-white transition-colors">
            About
          </a>
          <a href="#skills" onClick={(e) => handleClick(e, '#skills')} className="hover:text-white transition-colors">
            Skills
          </a>
          <a href="#projects" onClick={(e) => handleClick(e, '#projects')} className="hover:text-white transition-colors">
            Projects
          </a>
          <a href="#experience" onClick={(e) => handleClick(e, '#experience')} className="hover:text-white transition-colors">
            Experience
          </a>
          <a href="#contact" onClick={(e) => handleClick(e, '#contact')} className="hover:text-white transition-colors">
            Contact
          </a>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/mbharani04/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-white/5 border border-white/10 hover:border-brand-primary hover:text-brand-primary text-gray-400 transition-all duration-300 hover:scale-105"
            aria-label="GitHub"
          >
            <FaGithub size={18} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-white/5 border border-white/10 hover:border-brand-secondary hover:text-brand-secondary text-gray-400 transition-all duration-300 hover:scale-105"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={18} />
          </a>
          <a
            href="mailto:bharani2004m@gmail.com"
            className="p-3 rounded-full bg-white/5 border border-white/10 hover:border-brand-accent hover:text-brand-accent text-gray-400 transition-all duration-300 hover:scale-105"
            aria-label="Email"
          >
            <FaEnvelope size={18} />
          </a>
        </div>
      </div>

      {/* Copyright info */}
      <div className="max-w-6xl mx-auto px-6 mt-8 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4 relative z-10">
        <div>© 2026 Bharani M. All rights reserved.</div>
        <div className="flex items-center gap-1.5">
          <span>Built with</span>
          <span className="text-[#e11d48] animate-pulse">❤️</span>
          <span>using React + Vite + Tailwind CSS v4</span>
        </div>
      </div>
    </footer>
  );
}
