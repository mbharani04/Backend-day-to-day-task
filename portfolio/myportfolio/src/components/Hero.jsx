import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaArrowRight,
  FaDownload,
  FaEnvelope,
  FaReact,
  FaNodeJs,
  FaServer,
  FaDatabase,
  FaCode,
  FaPython
} from 'react-icons/fa';
import { SiJavascript, SiSupabase, SiTailwindcss } from 'react-icons/si';
import './Hero.css';

export default function Hero() {
  const [activeTab, setActiveTab] = useState('react');

  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="home" className="min-h-screen relative flex items-center pt-28 pb-20 overflow-hidden">
      {/* Starfield Animated Background */}
      <div className="hero-starfield-container">
        <div className="hero-stars-1" />
        <div className="hero-stars-2" />
        <div className="hero-stars-3" />
        <div className="hero-shooting-star hero-shooting-star-1" />
        <div className="hero-shooting-star hero-shooting-star-2" />
        <div className="hero-starfield-overlay" />
      </div>

      {/* Ambient background glows */}
      <div className="absolute top-[18%] left-[5%] w-80 h-80 bg-[#0052FF]/15 rounded-full blur-[110px] pointer-events-none z-0" />
      <div className="absolute bottom-[15%] right-[5%] w-96 h-96 bg-[#CCFF00]/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-[50%] left-[45%] w-72 h-72 bg-[#0052FF]/10 rounded-full blur-[100px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center w-full">

          {/* Left Column: Developer Info & Clean Content */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 w-full">
            
            {/* Status Pill */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-[#0052FF]/35 text-xs text-[#CCFF00] font-medium tracking-wide backdrop-blur-md shadow-sm shadow-[#0052FF]/15"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#CCFF00] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#CCFF00]" />
              </span>
              <span>Available for Developer Roles &amp; Opportunities</span>
            </motion.div>

            {/* Main Headings */}
            <div className="space-y-3 w-full">
              <motion.h4
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-xs sm:text-sm font-bold tracking-widest text-[#CCFF00] uppercase font-mono"
              >
                Electronics &amp; Communication Graduate • Full-Stack Developer
              </motion.h4>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.18 }}
                className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-[#93C5FD] bg-clip-text text-transparent"
              >
                BHARANI M
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.26 }}
                className="text-base sm:text-lg text-gray-300 font-sans leading-relaxed max-w-xl mx-auto lg:mx-0 pt-1"
              >
                Crafting robust web applications, responsive interfaces, and hardware-integrated software with clean code and modern developer workflows.
              </motion.p>
            </div>

            {/* Quick Tech Badges */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.34 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1"
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-cyan-300 hover:border-[#0052FF]/50 transition-colors">
                <FaReact className="text-[#0052FF]" /> React.js
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-yellow-300 hover:border-[#0052FF]/50 transition-colors">
                <SiJavascript className="text-yellow-400" /> JavaScript
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-emerald-300 hover:border-[#0052FF]/50 transition-colors">
                <FaNodeJs className="text-emerald-400" /> Node.js
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-sky-300 hover:border-[#0052FF]/50 transition-colors">
                <SiTailwindcss className="text-sky-400" /> Tailwind
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-[#CCFF00] hover:border-[#CCFF00]/50 transition-colors">
                <SiSupabase className="text-[#CCFF00]" /> Supabase
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-blue-300 hover:border-[#0052FF]/50 transition-colors">
                <FaPython className="text-[#0052FF]" /> Python
              </span>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.42 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2 w-full"
            >
              <button
                onClick={() => handleScrollTo('projects')}
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-3 bg-gradient-to-r from-[#0052FF] to-[#1E3A8A] hover:from-[#1E50FF] hover:to-[#0052FF] text-white font-semibold rounded-xl transition-all duration-300 border border-[#0052FF]/50 shadow-lg shadow-[#0052FF]/30 hover:shadow-[#0052FF]/50 cursor-pointer hover:scale-[1.02]"
              >
                <span>View Projects</span>
                <FaArrowRight size={13} className="text-white/80" />
              </button>

              <a
                href="/resume.html"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-3 bg-white/5 hover:bg-white/10 text-white hover:text-[#CCFF00] font-semibold rounded-xl transition-all duration-300 border border-white/15 hover:border-[#CCFF00]/50 cursor-pointer hover:scale-[1.02] backdrop-blur-sm"
              >
                <FaDownload size={13} className="text-[#CCFF00]" />
                <span>Resume</span>
              </a>

              <button
                onClick={() => handleScrollTo('contact')}
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-3 bg-transparent hover:bg-[#0052FF]/15 text-[#93c5fd] hover:text-[#CCFF00] font-semibold rounded-xl transition-all duration-300 border border-[#0052FF]/40 hover:border-[#CCFF00] cursor-pointer hover:scale-[1.02]"
              >
                <FaEnvelope size={13} />
                <span>Contact Me</span>
              </button>
            </motion.div>
          </div>

          {/* Right Column: Full-Stack Developer IDE / Code Terminal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="lg:col-span-5 flex justify-center items-center relative w-full"
          >
            {/* Ambient Glow behind Card */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#0052FF]/30 via-[#0052FF]/15 to-[#CCFF00]/20 rounded-3xl blur-2xl opacity-75 pointer-events-none -z-10" />

            {/* IDE Glassmorphic Container */}
            <div className="w-full max-w-[480px] bg-[#050914]/95 border border-[#0052FF]/20 rounded-2xl overflow-hidden shadow-2xl shadow-black/80 backdrop-blur-xl">

              {/* Window Header / Tab Bar */}
              <div className="bg-[#030611]/95 px-4 py-3 flex items-center justify-between border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/90" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/90" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/90" />
                </div>

                {/* File Tabs */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setActiveTab('react')}
                    className={`text-[11px] font-mono flex items-center gap-1.5 py-1 px-3 rounded-md transition-all ${
                      activeTab === 'react'
                        ? 'bg-[#0052FF]/20 text-[#CCFF00] border border-[#0052FF]/50'
                        : 'text-gray-400 hover:text-gray-200'
                    }`}
                  >
                    <FaReact className="text-[#0052FF]" />
                    <span>Developer.jsx</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('server')}
                    className={`text-[11px] font-mono flex items-center gap-1.5 py-1 px-3 rounded-md transition-all ${
                      activeTab === 'server'
                        ? 'bg-[#0052FF]/20 text-[#CCFF00] border border-[#0052FF]/50'
                        : 'text-gray-400 hover:text-gray-200'
                    }`}
                  >
                    <FaNodeJs className="text-[#CCFF00]" />
                    <span>server.js</span>
                  </button>
                </div>

                <div className="text-[10px] font-mono text-[#CCFF00] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00] animate-pulse" />
                  <span className="hidden sm:inline">LIVE</span>
                </div>
              </div>

              {/* Code Editor Body */}
              <div className="p-4 sm:p-5 font-mono text-[11px] sm:text-xs leading-relaxed space-y-4 text-gray-300">

                {/* Active Tab Code View */}
                {activeTab === 'react' ? (
                  <div className="space-y-1 bg-black/50 p-4 rounded-xl border border-white/5 font-mono">
                    <div><span className="text-[#0052FF] font-bold">const</span> <span className="text-[#CCFF00]">developer</span> = &#123;</div>
                    <div className="pl-4"><span className="text-gray-400">name:</span> <span className="text-[#93c5fd]">"Bharani M"</span>,</div>
                    <div className="pl-4"><span className="text-gray-400">role:</span> <span className="text-[#93c5fd]">"Full-Stack Developer"</span>,</div>
                    <div className="pl-4"><span className="text-gray-400">degree:</span> <span className="text-[#93c5fd]">"B.E. ECE (84%)"</span>,</div>
                    <div className="pl-4"><span className="text-gray-400">stack:</span> [</div>
                    <div className="pl-8 text-cyan-200"><span className="text-[#CCFF00]">"React.js"</span>, <span className="text-[#CCFF00]">"Node.js"</span>, <span className="text-[#CCFF00]">"Express"</span>,</div>
                    <div className="pl-8 text-cyan-200"><span className="text-[#CCFF00]">"Supabase"</span>, <span className="text-[#CCFF00]">"Python"</span>, <span className="text-[#CCFF00]">"MySQL"</span></div>
                    <div className="pl-4">],</div>
                    <div className="pl-4"><span className="text-gray-400">buildToSolve:</span> <span className="text-[#0052FF] font-bold">() =&gt;</span> <span className="text-[#CCFF00]">true</span></div>
                    <div>&#125;;</div>
                  </div>
                ) : (
                  <div className="space-y-1 bg-black/50 p-4 rounded-xl border border-white/5 font-mono">
                    <div><span className="text-[#0052FF] font-bold">import</span> express <span className="text-[#0052FF] font-bold">from</span> <span className="text-[#CCFF00]">'express'</span>;</div>
                    <div><span className="text-[#0052FF] font-bold">import</span> &#123; connectDB &#125; <span className="text-[#0052FF] font-bold">from</span> <span className="text-[#CCFF00]">'./config/db.js'</span>;</div>
                    <div className="text-gray-500 py-1">// REST API &amp; Auth Pipeline</div>
                    <div><span className="text-[#0052FF] font-bold">const</span> app = <span className="text-[#93c5fd]">express</span>();</div>
                    <div>app.<span className="text-[#CCFF00]">use</span>(express.<span className="text-[#93c5fd]">json</span>());</div>
                    <div>app.<span className="text-[#CCFF00]">use</span>(<span className="text-[#CCFF00]">'/api/v1'</span>, routes);</div>
                    <div className="text-[#CCFF00] pt-1">await connectDB(); // Supabase &amp; MongoDB</div>
                    <div>app.<span className="text-[#CCFF00]">listen</span>(<span className="text-[#0052FF]">5000</span>, () =&gt; <span className="text-gray-300">console.log("Ready")</span>);</div>
                  </div>
                )}

                {/* Console Terminal Output */}
                <div className="space-y-1.5 bg-[#030611]/95 p-3.5 rounded-xl border border-[#0052FF]/30 text-gray-400">
                  <div className="flex items-center justify-between border-b border-white/5 pb-1.5 mb-1.5">
                    <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider flex items-center gap-1.5">
                      <FaCode className="text-[#0052FF]" />
                      Runtime Console
                    </span>
                    <span className="text-[10px] text-[#CCFF00] font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-[#CCFF00] rounded-full animate-ping" />
                      CONNECTED
                    </span>
                  </div>
                  <div className="text-[#CCFF00] font-medium flex items-center gap-1.5">
                    <span>$</span>
                    <span>npm run dev &amp;&amp; node server</span>
                  </div>
                  <div className="text-gray-400 text-[11px]">&gt; [Vite] Full-stack client compiled successfully</div>
                  <div className="text-[#93c5fd] font-semibold text-[11px]">&gt; [API] RESTful endpoints listening on port 5000</div>
                  <div className="text-[#CCFF00] font-semibold text-[11px]">&gt; [Database] Supabase &amp; Cloud DB linked</div>
                </div>

                {/* Quick Architecture Indicators */}
                <div className="grid grid-cols-3 gap-2 pt-1">
                  <div className="bg-white/5 p-2 rounded-lg border border-white/5 flex flex-col items-center text-center">
                    <span className="text-[9px] uppercase tracking-wider text-gray-400 flex items-center gap-1">
                      <FaReact className="text-[#0052FF]" /> Frontend
                    </span>
                    <span className="text-xs font-bold text-white mt-1">React 19</span>
                  </div>
                  <div className="bg-white/5 p-2 rounded-lg border border-white/5 flex flex-col items-center text-center">
                    <span className="text-[9px] uppercase tracking-wider text-gray-400 flex items-center gap-1">
                      <FaServer className="text-[#0052FF]" /> Backend
                    </span>
                    <span className="text-xs font-bold text-white mt-1">Node/Express</span>
                  </div>
                  <div className="bg-white/5 p-2 rounded-lg border border-white/5 flex flex-col items-center text-center">
                    <span className="text-[9px] uppercase tracking-wider text-gray-400 flex items-center gap-1">
                      <FaDatabase className="text-[#CCFF00]" /> Database
                    </span>
                    <span className="text-xs font-bold text-white mt-1">Supabase/SQL</span>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
