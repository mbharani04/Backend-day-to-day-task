import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Background from './components/Background';
import CursorGlow from './components/CursorGlow';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import TechnicalSkills from './components/TechnicalSkills';
import Timeline from './components/Timeline';
import Certifications from './components/Certifications';
import SkillsFeatures from './components/SkillsFeatures';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Premium loading sequence timeout
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Background and Cursor follow glow elements */}
      <Background />
      <CursorGlow />

      {/* Page Loader */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0B0F19]"
          >
            {/* Visual glow backdrop in loader */}
            <div className="absolute w-64 h-64 bg-brand-primary/10 rounded-full blur-[80px]" />
            
            <div className="space-y-6 text-center z-10">
              {/* Spinning / pulsing logo */}
              <div className="relative inline-flex items-center justify-center">
                <div className="w-16 h-16 border-2 border-brand-primary/20 border-t-brand-primary rounded-full animate-spin" />
                <span className="absolute text-brand-accent font-mono font-bold text-xs">BM</span>
              </div>

              <div className="space-y-2">
                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-display font-extrabold text-2xl tracking-tight bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent bg-clip-text text-transparent"
                >
                  BHARANI M
                </motion.h1>
                <p className="text-xs text-gray-500 font-mono tracking-widest uppercase">
                  Initializing Developer Workspace...
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Portfolio Content */}
      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative min-h-screen text-white"
        >
          {/* Header navigation bar */}
          <Navbar />

          {/* Sections Layout */}
          <main className="relative">
            <Hero />
            
            <div className="max-w-6xl mx-auto border-t border-white/5" />
            <About />
            
            <div className="max-w-6xl mx-auto border-t border-white/5" />
            <Projects />
            
            <div className="max-w-6xl mx-auto border-t border-white/5" />
            <TechnicalSkills />
            
            <div className="max-w-6xl mx-auto border-t border-white/5" />
            <Timeline />
            
            <div className="max-w-6xl mx-auto border-t border-white/5" />
            <Certifications />
            
            <div className="max-w-6xl mx-auto border-t border-white/5" />
            <SkillsFeatures />
            
            <div className="max-w-6xl mx-auto border-t border-white/5" />
            <Contact />
          </main>

          {/* Page footer */}
          <Footer />
        </motion.div>
      )}
    </>
  );
}
