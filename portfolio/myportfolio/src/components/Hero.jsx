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
  FaCode
} from 'react-icons/fa';
import { SiMongodb, SiJavascript, SiFirebase, SiSupabase } from 'react-icons/si';
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
    <section id="home" className="min-h-screen relative flex items-center pt-24 pb-16 overflow-hidden">
      {/* Uiverse-inspired Starfield Animated Background - Isolated strictly to Hero */}
      <div className="hero-starfield-container">
        <div className="hero-stars-1" />
        <div className="hero-stars-2" />
        <div className="hero-stars-3" />
        <div className="hero-shooting-star hero-shooting-star-1" />
        <div className="hero-shooting-star hero-shooting-star-2" />
        <div className="hero-starfield-overlay" />
      </div>

      {/* Ambient background glows */}
      <div className="absolute top-[15%] left-[5%] w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-[15%] right-[5%] w-96 h-96 bg-purple-500/10 rounded-full blur-[110px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center w-full">
          
          {/* Left Column: Developer Info & Content */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 w-full">
            
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-cyan-500/20 text-xs text-cyan-400 font-medium tracking-wide backdrop-blur-md"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Open for Opportunities &amp; Collaborations</span>
            </motion.div>

            <div className="space-y-2">
              <motion.h4
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-xs sm:text-sm font-semibold tracking-widest text-cyan-400 uppercase font-display"
              >
                ECE Engineer • Full-Stack Developer
              </motion.h4>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-cyan-200 bg-clip-text text-transparent"
              >
                BHARANI M
              </motion.h1>
              
              {/* Preferred Tagline */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="pt-1"
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
                  I Build. I Learn. I Solve.
                </h2>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-2.5 max-w-2xl font-sans"
            >
              <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-sans">
                Hi, I'm <strong className="text-white font-semibold">Bharani M</strong>, an ECE Engineer and Full-Stack Developer passionate about creating modern web applications and turning real-world ideas into practical digital solutions.
              </p>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-sans">
                I work across the frontend and backend, building responsive interfaces, REST APIs, authentication systems, database integrations, and production-ready applications.
              </p>
              <p className="text-xs sm:text-sm text-cyan-300/90 font-mono italic">
                "I turn ideas into functional products through clean code, thoughtful UI, and practical problem-solving."
              </p>
            </motion.div>


            {/* Key Tech Stack Pills */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-0.5"
            >
              <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-cyan-300 flex items-center gap-1.5 hover:border-cyan-400/40 transition-colors">
                <FaReact className="text-cyan-400" /> React.js
              </span>
              <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-yellow-300 flex items-center gap-1.5 hover:border-yellow-400/40 transition-colors">
                <SiJavascript className="text-yellow-400" /> JavaScript
              </span>
              <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-emerald-300 flex items-center gap-1.5 hover:border-emerald-400/40 transition-colors">
                <FaNodeJs className="text-emerald-400" /> Node &amp; Express
              </span>
              <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-emerald-400 flex items-center gap-1.5 hover:border-emerald-500/40 transition-colors">
                <SiMongodb /> MongoDB
              </span>
              <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-amber-300 flex items-center gap-1.5 hover:border-amber-400/40 transition-colors">
                <SiFirebase className="text-amber-400" /> Firebase
              </span>
              <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-emerald-300 flex items-center gap-1.5 hover:border-emerald-400/40 transition-colors">
                <SiSupabase className="text-emerald-400" /> Supabase
              </span>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-3 w-full"
            >
              <button
                onClick={() => handleScrollTo('projects')}
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold rounded-xl transition-all duration-300 border border-cyan-400/30 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/35 cursor-pointer hover:scale-[1.02]"
              >
                <span>View My Projects</span>
                <FaArrowRight size={14} className="text-white/80" />
              </button>
              
              <a
                href="/resume.html"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl transition-all duration-300 border border-white/10 hover:border-cyan-400/40 cursor-pointer hover:scale-[1.02] backdrop-blur-sm"
              >
                <FaDownload size={14} className="text-gray-400" />
                <span>Download Resume</span>
              </a>

              <button
                onClick={() => handleScrollTo('contact')}
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-3 bg-transparent hover:bg-cyan-500/10 text-cyan-400 font-semibold rounded-xl transition-all duration-300 border border-cyan-500/30 hover:border-cyan-400 cursor-pointer hover:scale-[1.02]"
              >
                <FaEnvelope size={14} />
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
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-blue-500/10 to-emerald-500/20 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition duration-1000 -z-10" />

            {/* IDE Glassmorphic Container */}
            <div className="w-full max-w-[480px] bg-[#0b101b]/90 border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-black/60 backdrop-blur-xl">
              
              {/* Window Header / Tab Bar */}
              <div className="bg-[#070b14]/90 px-4 py-3 flex items-center justify-between border-b border-white/10">
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
                        ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                        : 'text-gray-400 hover:text-gray-200'
                    }`}
                  >
                    <FaReact className="text-cyan-400" />
                    <span>Developer.jsx</span>
                  </button>
                  <button 
                    onClick={() => setActiveTab('server')}
                    className={`text-[11px] font-mono flex items-center gap-1.5 py-1 px-3 rounded-md transition-all ${
                      activeTab === 'server'
                        ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                        : 'text-gray-400 hover:text-gray-200'
                    }`}
                  >
                    <FaNodeJs className="text-emerald-400" />
                    <span>server.js</span>
                  </button>
                </div>

                <div className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="hidden sm:inline">LIVE</span>
                </div>
              </div>

              {/* Code Editor Body */}
              <div className="p-4 sm:p-5 font-mono text-[11px] sm:text-xs leading-relaxed space-y-4 text-gray-300">
                
                {/* Active Tab Code View */}
                {activeTab === 'react' ? (
                  <div className="space-y-1 bg-black/40 p-4 rounded-xl border border-white/5 font-mono">
                    <div><span className="text-purple-400">const</span> <span className="text-cyan-300">developer</span> = &#123;</div>
                    <div className="pl-4"><span className="text-gray-400">name:</span> <span className="text-emerald-300">"Bharani M"</span>,</div>
                    <div className="pl-4"><span className="text-gray-400">role:</span> <span className="text-emerald-300">"Full-Stack Developer"</span>,</div>
                    <div className="pl-4"><span className="text-gray-400">stack:</span> [</div>
                    <div className="pl-8 text-cyan-200"><span className="text-amber-300">"React.js"</span>, <span className="text-amber-300">"Node.js"</span>, <span className="text-amber-300">"Express"</span>,</div>
                    <div className="pl-8 text-cyan-200"><span className="text-amber-300">"MongoDB"</span>, <span className="text-amber-300">"Firebase"</span>, <span className="text-amber-300">"Supabase"</span></div>
                    <div className="pl-4">],</div>
                    <div className="pl-4"><span className="text-gray-400">focus:</span> <span className="text-emerald-300">"Modern Web Apps &amp; APIs"</span>,</div>
                    <div className="pl-4"><span className="text-gray-400">buildToSolve:</span> <span className="text-purple-400">() =&gt;</span> <span className="text-cyan-400">true</span></div>
                    <div>&#125;;</div>
                  </div>
                ) : (
                  <div className="space-y-1 bg-black/40 p-4 rounded-xl border border-white/5 font-mono">
                    <div><span className="text-purple-400">import</span> express <span className="text-purple-400">from</span> <span className="text-amber-300">'express'</span>;</div>
                    <div><span className="text-purple-400">import</span> &#123; connectDB &#125; <span className="text-purple-400">from</span> <span className="text-amber-300">'./config/db.js'</span>;</div>
                    <div className="text-gray-500 py-1">// REST API &amp; Auth Pipeline</div>
                    <div><span className="text-purple-400">const</span> app = <span className="text-cyan-300">express</span>();</div>
                    <div>app.<span className="text-blue-400">use</span>(express.<span className="text-blue-400">json</span>());</div>
                    <div>app.<span className="text-blue-400">use</span>(<span className="text-amber-300">'/api/v1'</span>, routes);</div>
                    <div className="text-emerald-400 pt-1">await connectDB(); // MongoDB Atlas</div>
                    <div>app.<span className="text-blue-400">listen</span>(<span className="text-cyan-300">5000</span>, () =&gt; <span className="text-emerald-300">console.log("Ready")</span>);</div>
                  </div>
                )}

                {/* Console Terminal Output */}
                <div className="space-y-1.5 bg-[#070b14]/90 p-3.5 rounded-xl border border-cyan-500/20 text-gray-400">
                  <div className="flex items-center justify-between border-b border-white/5 pb-1.5 mb-1.5">
                    <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider flex items-center gap-1.5">
                      <FaCode className="text-cyan-400" />
                      Runtime Console
                    </span>
                    <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
                      CONNECTED
                    </span>
                  </div>
                  <div className="text-emerald-400 font-medium flex items-center gap-1.5">
                    <span>$</span>
                    <span>npm run dev &amp;&amp; node server</span>
                  </div>
                  <div className="text-gray-400 text-[11px]">&gt; [Vite] Full-stack client compiled in 184ms</div>
                  <div className="text-cyan-300 font-semibold text-[11px]">&gt; [API] RESTful endpoints listening on port 5000</div>
                  <div className="text-emerald-400 font-semibold text-[11px]">&gt; [Database] MongoDB Atlas &amp; Supabase linked</div>
                </div>

                {/* Quick Architecture Indicators */}
                <div className="grid grid-cols-3 gap-2 pt-1">
                  <div className="bg-white/5 p-2 rounded-lg border border-white/5 flex flex-col items-center text-center">
                    <span className="text-[9px] uppercase tracking-wider text-gray-400 flex items-center gap-1">
                      <FaReact className="text-cyan-400" /> Frontend
                    </span>
                    <span className="text-xs font-bold text-white mt-1">React 18</span>
                  </div>
                  <div className="bg-white/5 p-2 rounded-lg border border-white/5 flex flex-col items-center text-center">
                    <span className="text-[9px] uppercase tracking-wider text-gray-400 flex items-center gap-1">
                      <FaServer className="text-emerald-400" /> Backend
                    </span>
                    <span className="text-xs font-bold text-white mt-1">Node/Express</span>
                  </div>
                  <div className="bg-white/5 p-2 rounded-lg border border-white/5 flex flex-col items-center text-center">
                    <span className="text-[9px] uppercase tracking-wider text-gray-400 flex items-center gap-1">
                      <FaDatabase className="text-amber-400" /> Cloud DB
                    </span>
                    <span className="text-xs font-bold text-white mt-1">Mongo &amp; Supa</span>
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
