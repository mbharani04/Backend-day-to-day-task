import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaDownload, FaEnvelope, FaCode, FaMicrochip, FaServer } from 'react-icons/fa';

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
      {/* Decorative radial gradients */}
      <div className="absolute top-[20%] left-[5%] w-72 h-72 bg-brand-primary/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[5%] w-96 h-96 bg-brand-secondary/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Side: Developer Info */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-6 text-center lg:text-left">
          
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center lg:justify-start gap-2 self-center lg:self-start px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-brand-primary font-medium tracking-wide"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Open for Opportunities & Collaborations</span>
          </motion.div>

          <div className="space-y-2">
            <motion.h4
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-sm font-semibold tracking-widest text-gray-400 uppercase font-display"
            >
              Hi there, I am
            </motion.h4>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight"
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
              <h2 className="text-lg sm:text-xl md:text-2xl font-medium font-sans text-brand-primary/95 flex items-center gap-1.5">
                <span className="text-white">&gt;</span>
                <span>{displayedText}</span>
                <span className="w-1.5 h-6 bg-brand-primary animate-pulse ml-0.5" />
              </h2>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-base sm:text-lg text-gray-400 max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans"
          >
            "I build intelligent software solutions by combining web development, embedded systems, and AI-assisted workflows. Passionate about solving real-world problems through innovative technology."
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4"
          >
            <button
              onClick={() => handleScrollTo('projects')}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-3.5 bg-brand-primary hover:bg-brand-primary/90 text-white font-semibold rounded-xl transition-all duration-300 border border-brand-primary/20 hover:shadow-lg hover:shadow-brand-primary/25 cursor-pointer hover:scale-[1.02]"
            >
              <span>View Projects</span>
              <FaArrowRight size={14} className="text-white/80" />
            </button>
            
            <a
              href="/resume.html"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-3.5 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl transition-all duration-300 border border-white/10 hover:border-brand-secondary/40 cursor-pointer hover:scale-[1.02]"
            >
              <FaDownload size={14} className="text-gray-400" />
              <span>Download Resume</span>
            </a>

            <button
              onClick={() => handleScrollTo('contact')}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-3.5 bg-transparent hover:bg-[#3b82f6]/5 text-[#3b82f6] font-semibold rounded-xl transition-all duration-300 border border-[#3b82f6]/30 hover:border-[#3b82f6] cursor-pointer hover:scale-[1.02]"
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
          <div className="w-full max-w-[460px] glass-panel border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-black/40">
            {/* IDE Bar */}
            <div className="bg-[#0b0f19]/60 px-4 py-3 flex items-center justify-between border-b border-white/10">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-rose-500" />
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
              </div>
              <div className="text-[11px] font-mono text-gray-500 flex items-center gap-1.5 bg-white/5 py-1 px-2.5 rounded-md border border-white/5">
                <FaMicrochip className="text-brand-primary animate-pulse" />
                <span>main.cpp (ESP32 DevKit)</span>
              </div>
              <div className="w-12" />
            </div>

            {/* Content Area */}
            <div className="p-5 font-mono text-[11px] sm:text-xs leading-relaxed space-y-4 text-gray-300">
              
              {/* C++ Code block */}
              <div className="space-y-1 bg-black/30 p-3.5 rounded-xl border border-white/5">
                <div className="text-brand-accent">#include &lt;Arduino.h&gt;</div>
                <div className="text-brand-secondary">#define LOCK_PIN 18</div>
                <div className="text-brand-secondary">#define RENT_PERIOD 3600 // secs</div>
                <div className="text-gray-400 mt-2">void setup() &#123;</div>
                <div className="pl-4 text-gray-300">Serial.begin(115200);</div>
                <div className="pl-4 text-gray-300">pinMode(LOCK_PIN, OUTPUT);</div>
                <div className="pl-4 text-brand-primary">digitalWrite(LOCK_PIN, LOW); // Locked</div>
                <div className="text-gray-400">&#125;</div>
              </div>

              {/* Console logs animation */}
              <div className="space-y-1.5 bg-[#0f172a] p-3.5 rounded-xl border border-brand-primary/20 text-gray-400">
                <div className="flex items-center justify-between border-b border-white/5 pb-1 mb-1.5">
                  <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Console Terminal</span>
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
                <div className="text-brand-primary font-bold">[SUCCESS] Write Flash memory complete!</div>
                <div className="text-brand-accent">&gt;&gt; Starting rent status watcher service...</div>
                <div className="text-yellow-400 font-semibold">&gt;&gt; WiFi STATUS: CONNECTED (IP: 192.168.1.42)</div>
                <div className="text-emerald-400 font-bold">&gt;&gt; LOCK STATE: SECURED & MONITORING</div>
              </div>

              {/* Status metrics grid */}
              <div className="grid grid-cols-3 gap-2.5">
                <div className="bg-white/5 p-2 rounded-lg border border-white/5 flex flex-col items-center">
                  <span className="text-[9px] uppercase tracking-wider text-gray-500 flex items-center gap-1">
                    <FaCode className="text-brand-primary" /> Logic
                  </span>
                  <span className="text-xs font-bold text-white mt-1">C / C++</span>
                </div>
                <div className="bg-white/5 p-2 rounded-lg border border-white/5 flex flex-col items-center">
                  <span className="text-[9px] uppercase tracking-wider text-gray-500 flex items-center gap-1">
                    <FaServer className="text-brand-secondary" /> Server
                  </span>
                  <span className="text-xs font-bold text-white mt-1">Active</span>
                </div>
                <div className="bg-white/5 p-2 rounded-lg border border-white/5 flex flex-col items-center">
                  <span className="text-[9px] uppercase tracking-wider text-gray-500 flex items-center gap-1">
                    <FaMicrochip className="text-brand-accent" /> Board
                  </span>
                  <span className="text-xs font-bold text-white mt-1">ESP32</span>
                </div>
              </div>

            </div>
          </div>
          
          {/* Visual embellishments behind terminal */}
          <div className="absolute -z-10 w-[110%] h-[110%] border border-brand-primary/10 rounded-full blur-[40px] opacity-25 animate-pulse" />
        </motion.div>

      </div>
    </section>
  );
}
