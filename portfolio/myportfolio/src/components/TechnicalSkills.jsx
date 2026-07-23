import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  SiHtml5,
  SiBootstrap,
  SiTailwindcss,
  SiJavascript,
  SiReact,
  SiVite,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPython,
  SiCplusplus,
  SiClaude,
  SiGooglegemini
} from 'react-icons/si';
import { FaCss3Alt } from 'react-icons/fa';
import { TbBrandOpenai, TbBrandVscode } from 'react-icons/tb';
import { BsStars } from 'react-icons/bs';
import LogoLoop from './LogoLoop';

// Master array of technologies and tools
export const techLogos = [
  // Frontend
  {
    id: 'html5',
    name: 'HTML5',
    category: 'Frontend',
    icon: SiHtml5,
    color: '#E34F26'
  },
  {
    id: 'css3',
    name: 'CSS3',
    category: 'Frontend',
    icon: FaCss3Alt,
    color: '#1572B6'
  },
  {
    id: 'bootstrap',
    name: 'Bootstrap CSS',
    category: 'Frontend',
    icon: SiBootstrap,
    color: '#7952B3'
  },
  {
    id: 'tailwindcss',
    name: 'Tailwind CSS',
    category: 'Frontend',
    icon: SiTailwindcss,
    color: '#06B6D4'
  },
  {
    id: 'javascript',
    name: 'JavaScript (ES6+)',
    category: 'Frontend',
    icon: SiJavascript,
    color: '#F7DF1E'
  },
  {
    id: 'react',
    name: 'React.js',
    category: 'Frontend',
    icon: SiReact,
    color: '#61DAFB'
  },
  {
    id: 'vite',
    name: 'Vite',
    category: 'Frontend',
    icon: SiVite,
    color: '#646CFF'
  },

  // Backend & Database
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'Backend',
    icon: SiNodedotjs,
    color: '#5FA04E'
  },
  {
    id: 'express',
    name: 'Express.js',
    category: 'Backend',
    icon: SiExpress,
    color: '#E0E0E0'
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    category: 'Database',
    icon: SiMongodb,
    color: '#47A248'
  },

  // Programming Languages
  {
    id: 'python',
    name: 'Python',
    category: 'Language',
    icon: SiPython,
    color: '#3776AB'
  },
  {
    id: 'cpp',
    name: 'C++',
    category: 'Language',
    icon: SiCplusplus,
    color: '#00599C'
  },

  // AI Tools
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    category: 'AI Tools',
    icon: TbBrandOpenai,
    color: '#10A37F'
  },
  {
    id: 'claude',
    name: 'Claude (Sonnet)',
    category: 'AI Tools',
    icon: SiClaude,
    color: '#D97706',
    badge: 'v3.7'
  },
  {
    id: 'gemini',
    name: 'Gemini AI',
    category: 'AI Tools',
    icon: SiGooglegemini,
    color: '#8E75FF'
  },
  {
    id: 'aigravity',
    name: 'AI Gravity',
    category: 'AI Tools',
    icon: BsStars,
    color: '#00F0FF',
    badge: 'Pro'
  },

  // Development Tools
  {
    id: 'vscode',
    name: 'VS Code',
    category: 'Dev Tools',
    icon: TbBrandVscode,
    color: '#007ACC'
  }
];

export default function TechnicalSkills() {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Frontend', 'Backend', 'Database', 'Language', 'AI Tools', 'Dev Tools'];

  const filteredLogos =
    activeCategory === 'All'
      ? techLogos
      : techLogos.filter((t) => t.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <section id="technical-skills" className="py-24 relative overflow-hidden bg-black/20">
      {/* Decorative Glow Blobs */}
      <div className="absolute top-[20%] right-[-5%] w-96 h-96 bg-brand-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-5%] w-96 h-96 bg-brand-secondary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-xs font-bold uppercase tracking-widest text-brand-accent bg-brand-accent/10 px-3.5 py-1 rounded-full border border-brand-accent/20 mb-3"
          >
            Tech Ecosystem
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight"
          >
            Technical Skills
          </motion.h2>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-1 bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent my-4 rounded-full"
          />

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-sm sm:text-base text-gray-400 max-w-2xl font-sans leading-relaxed"
          >
            Technologies and tools I use to build modern, scalable, and intelligent applications.
          </motion.p>

          {/* Interactive Category Filter Pills */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap justify-center items-center gap-2 mt-8"
          >
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-xs font-mono px-3.5 py-1.5 rounded-full transition-all duration-300 border ${
                    isActive
                      ? 'bg-brand-primary text-white border-brand-primary shadow-lg shadow-brand-primary/20 scale-105 font-bold'
                      : 'bg-white/5 text-gray-400 border-white/10 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* React Bits LogoLoop Infinite Animated Marquee */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative rounded-3xl glass-card border border-white/10 p-2 sm:p-4 bg-[#090d16]/90 overflow-hidden shadow-2xl"
        >
          {/* Subtle Ambient Top Border Accent */}
          <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-brand-primary/50 to-transparent" />

          {/* Primary Row 1 - Leftward Scroll */}
          <LogoLoop
            items={filteredLogos}
            speed={36}
            direction="left"
            pauseOnHover={true}
          />

          {/* Complementary Row 2 (When 'All' is selected) - Rightward Scroll for rich dual-layer visual depth */}
          {activeCategory === 'All' && (
            <div className="border-t border-white/5 pt-2 mt-1">
              <LogoLoop
                items={[...techLogos].reverse()}
                speed={42}
                direction="right"
                pauseOnHover={true}
              />
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
