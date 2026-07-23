import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaArrowRight, 
  FaDownload, 
  FaEnvelope, 
  FaCode, 
  FaMicrochip, 
  FaServer, 
  FaReact, 
  FaNodeJs, 
  FaGitAlt, 
  FaRobot 
} from 'react-icons/fa';
import { SiMongodb, SiTailwindcss, SiVite, SiExpress, SiJavascript } from 'react-icons/si';
import './Hero.css';

const headlines = [
  'Electronics & Communication Engineer',
  'Full Stack Developer',
  'Embedded Systems Enthusiast',
  'AI-Assisted Developer'
];

export default function Hero() {
  const [headlineIndex, setHeadlineIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(80);

  // Rotating Headline Animation
  useEffect(() => {
    let timer;
    const currentFullText = headlines[headlineIndex];

    if (isDeleting) {
      // Deleting character
      timer = setTimeout(() => {
        setDisplayedText((prev) => prev.slice(0, -1));
        setTypingSpeed(40);
      }, typingSpeed);
    } else {
      // Typing character
      timer = setTimeout(() => {
        setDisplayedText((prev) => currentFullText.slice(0, prev.length + 1));
        setTypingSpeed(80);
      }, typingSpeed);
    }

    if (!isDeleting && displayedText === currentFullText) {
      // Pause at full text
      timer = setTimeout(() => setIsDeleting(true), 1500);
    } else if (isDeleting && displayedText === '') {
      setIsDeleting(false);
      setHeadlineIndex((prev) => (prev + 1) % headlines.length);
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, headlineIndex, typingSpeed]);

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

      <div className="max-w-6xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Side: Developer Info */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-6 text-center lg:text-left">
          
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center lg:justify-start gap-2 self-center lg:self-start px-3.5 py-1.5 rounded-full bg-white/5 border border-cyan-500/20 text-xs text-cyan-400 font-medium tracking-wide backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Open for Opportunities &amp; Collaborations</span>
          </motion.div>

          <div className="space-y-2">
            <motion.h4
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-sm font-semibold tracking-widest text-cyan-400/80 uppercase font-display"
            >
              Hi there, I am
            </motion.h4>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-cyan-200 bg-clip-text text-transparent"
            >
              BHARANI M
            </motion.h1>
            
            {/* Typing Subheading */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="h-8 md:h-10 flex items-center justify-center lg:justify-start"
            >
              <h2 className="text-lg sm:text-xl md:text-2xl font-medium font-sans text-cyan-400 flex items-center gap-1.5">
                <span className="text-white">&gt;</span>
                <span>{displayedText}</span>
                <span className="w-1.5 h-6 bg-cyan-400 animate-pulse ml-0.5" />
              </h2>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-base sm:text-lg text-gray-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans"
          >
            "I build intelligent software solutions by combining web development, embedded systems, and AI-assisted workflows. Passionate about solving real-world problems through innovative technology."
          </motion.p>

          {/* Key Tech Stack Pills */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1"
          >
            <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-cyan-300 flex items-center gap-1">
              <FaReact className="text-cyan-400" /> React &amp; Vite
            </span>
            <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-emerald-300 flex items-center gap-1">
              <FaNodeJs className="text-emerald-400" /> Node &amp; Express
            </span>
            <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-emerald-400 flex items-center gap-1">
              <SiMongodb /> MongoDB
            </span>
            <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-purple-300 flex items-center gap-1">
              <FaMicrochip className="text-purple-400" /> C/C++ &amp; ESP32
            </span>
            <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-amber-300 flex items-center gap-1">
              <FaRobot className="text-amber-400" /> AI Tools
            </span>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-3"
          >
            <button
              onClick={() => handleScrollTo('projects')}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold rounded-xl transition-all duration-300 border border-cyan-400/30 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/35 cursor-pointer hover:scale-[1.02]"
            >
              <span>View Projects</span>
              <FaArrowRight size={14} className="text-white/80" />
            </button>
            
            <a
              href="/resume.html"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-3.5 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl transition-all duration-300 border border-white/10 hover:border-cyan-400/40 cursor-pointer hover:scale-[1.02] backdrop-blur-sm"
            >
              <FaDownload size={14} className="text-gray-400" />
              <span>Download Resume</span>
            </a>

            <button
              onClick={() => handleScrollTo('contact')}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-3.5 bg-transparent hover:bg-cyan-500/10 text-cyan-400 font-semibold rounded-xl transition-all duration-300 border border-cyan-500/30 hover:border-cyan-400 cursor-pointer hover:scale-[1.02]"
            >
              <FaEnvelope size={14} />
              <span>Contact Me</span>
            </button>
          </motion.div>
        </div>

        {/* Right Side: Animated Coding/Hardware Workspace Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-5 flex justify-center items-center relative"
        >
          {/* Glassmorphic Visualizer Container */}
          <div className="w-full max-w-[460px] glass-panel border border-white/15 rounded-2xl overflow-hidden shadow-2xl shadow-black/60 backdrop-blur-xl bg-slate-950/70">
            {/* IDE Bar */}
            <div className="bg-[#0b0f19]/80 px-4 py-3 flex items-center justify-between border-b border-white/10">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-rose-500" />
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
              </div>
              <div className="text-[11px] font-mono text-gray-400 flex items-center gap-1.5 bg-white/5 py-1 px-2.5 rounded-md border border-white/5">
                <FaMicrochip className="text-cyan-400 animate-pulse" />
                <span>main.cpp (ESP32 DevKit)</span>
              </div>
              <div className="w-12" />
            </div>

            {/* Content Area */}
            <div className="p-5 font-mono text-[11px] sm:text-xs leading-relaxed space-y-4 text-gray-300">
              
              {/* C++ Code block */}
              <div className="space-y-1 bg-black/40 p-3.5 rounded-xl border border-white/5">
                <div className="text-purple-400">#include &lt;Arduino.h&gt;</div>
                <div className="text-cyan-400">#define LOCK_PIN 18</div>
                <div className="text-cyan-400">#define RENT_PERIOD 3600 // secs</div>
                <div className="text-gray-400 mt-2">void setup() &#123;</div>
                <div className="pl-4 text-gray-300">Serial.begin(115200);</div>
                <div className="pl-4 text-gray-300">pinMode(LOCK_PIN, OUTPUT);</div>
                <div className="pl-4 text-cyan-400">digitalWrite(LOCK_PIN, LOW); // Locked</div>
                <div className="text-gray-400">&#125;</div>
              </div>

              {/* Console logs animation */}
              <div className="space-y-1.5 bg-[#0f172a]/90 p-3.5 rounded-xl border border-cyan-500/20 text-gray-400">
                <div className="flex items-center justify-between border-b border-white/5 pb-1 mb-1.5">
                  <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Console Terminal</span>
                  <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-bold">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
                    LIVE
                  </span>
                </div>
                <div className="text-emerald-400 font-semibold flex items-center gap-1">
                  <span>$</span>
                  <span>pio run --target upload</span>
                </div>
                <div className="text-gray-400">Compiling and uploading to ESP32 board...</div>
                <div className="text-cyan-400 font-bold">[SUCCESS] Write Flash memory complete!</div>
                <div className="text-purple-300">&gt;&gt; Starting rent status watcher service...</div>
                <div className="text-amber-300 font-semibold">&gt;&gt; WiFi STATUS: CONNECTED (IP: 192.168.1.42)</div>
                <div className="text-emerald-400 font-bold">&gt;&gt; LOCK STATE: SECURED &amp; MONITORING</div>
              </div>

              {/* Status metrics grid */}
              <div className="grid grid-cols-3 gap-2.5">
                <div className="bg-white/5 p-2 rounded-lg border border-white/5 flex flex-col items-center">
                  <span className="text-[9px] uppercase tracking-wider text-gray-400 flex items-center gap-1">
                    <FaCode className="text-cyan-400" /> Logic
                  </span>
                  <span className="text-xs font-bold text-white mt-1">C / C++</span>
                </div>
                <div className="bg-white/5 p-2 rounded-lg border border-white/5 flex flex-col items-center">
                  <span className="text-[9px] uppercase tracking-wider text-gray-400 flex items-center gap-1">
                    <FaServer className="text-purple-400" /> Server
                  </span>
                  <span className="text-xs font-bold text-white mt-1">Active</span>
                </div>
                <div className="bg-white/5 p-2 rounded-lg border border-white/5 flex flex-col items-center">
                  <span className="text-[9px] uppercase tracking-wider text-gray-400 flex items-center gap-1">
                    <FaMicrochip className="text-amber-400" /> Board
                  </span>
                  <span className="text-xs font-bold text-white mt-1">ESP32</span>
                </div>
              </div>

            </div>
          </div>
          
          {/* Visual embellishments behind terminal */}
          <div className="absolute -z-10 w-[110%] h-[110%] border border-cyan-500/20 rounded-full blur-[40px] opacity-30 animate-pulse" />
        </motion.div>

      </div>
    </section>
  );
}
