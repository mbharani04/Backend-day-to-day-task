import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaBootstrap,
  FaGitAlt,
  FaGithub,
  FaServer,
  FaDatabase,
  FaLock,
  FaLayerGroup
} from 'react-icons/fa';
import {
  SiVite,
  SiReactrouter,
  SiTailwindcss,
  SiExpress,
  SiMongodb,
  SiFirebase,
  SiSupabase,
  SiVercel
} from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';
import SkillCard from './skills/SkillCard';
import './skills/Skills.css';

// Primary row 1 skill cards (Frontend & Client-Side Core)
const mainSkillsRow1 = [
  { id: 'html5', name: 'HTML5', category: 'FRONTEND', icon: FaHtml5, color: '#E34F26' },
  { id: 'css3', name: 'CSS3', category: 'FRONTEND', icon: FaCss3Alt, color: '#1572B6' },
  { id: 'javascript', name: 'JavaScript (ES6+)', category: 'FRONTEND', icon: FaJs, color: '#F7DF1E' },
  { id: 'react', name: 'React.js', category: 'FRONTEND', icon: FaReact, color: '#61DAFB' },
  { id: 'vite', name: 'Vite', category: 'FRONTEND', icon: SiVite, color: '#646CFF' },
  { id: 'reactrouter', name: 'React Router', category: 'FRONTEND', icon: SiReactrouter, color: '#CA4245' },
  { id: 'tailwind', name: 'Tailwind CSS', category: 'FRONTEND', icon: SiTailwindcss, color: '#06B6D4' },
  { id: 'bootstrap', name: 'Bootstrap', category: 'FRONTEND', icon: FaBootstrap, color: '#7952B3' }
];

// Primary row 2 skill cards (Backend, Database, Cloud & Dev Tools)
const mainSkillsRow2 = [
  { id: 'nodejs', name: 'Node.js', category: 'BACKEND', icon: FaNodeJs, color: '#5FA04E' },
  { id: 'express', name: 'Express.js', category: 'BACKEND', icon: SiExpress, color: '#E0E0E0' },
  { id: 'mongodb', name: 'MongoDB', category: 'DATABASE', icon: SiMongodb, color: '#47A248' },
  { id: 'firebase', name: 'Firebase', category: 'DATABASE & SERVICES', icon: SiFirebase, color: '#FFCA28' },
  { id: 'supabase', name: 'Supabase', category: 'DATABASE & SERVICES', icon: SiSupabase, color: '#3ECF8E' },
  { id: 'git', name: 'Git', category: 'DEV TOOLS', icon: FaGitAlt, color: '#F05032' },
  { id: 'github', name: 'GitHub', category: 'DEV TOOLS', icon: FaGithub, color: '#FFFFFF' },
  { id: 'vscode', name: 'VS Code', category: 'DEV TOOLS', icon: VscVscode, color: '#007ACC' },
  { id: 'vercel', name: 'Vercel', category: 'DEV TOOLS', icon: SiVercel, color: '#FFFFFF' }
];

// Master list of all main skills in sequential order
const allMainSkills = [...mainSkillsRow1, ...mainSkillsRow2];

// Supporting Competency Groups
const skillCapabilities = [
  {
    title: 'React.js Core & Logic',
    category: 'State & Architecture',
    icon: FaReact,
    iconColor: 'text-[#61DAFB] border-[#61DAFB]/20 bg-[#61DAFB]/10',
    skills: [
      'JSX',
      'useState',
      'useEffect',
      'useContext',
      'useReducer',
      'useRef',
      'useMemo',
      'Component-based Architecture',
      'API Integration',
      'Form Handling',
      'Client-side Routing'
    ]
  },
  {
    title: 'Backend Development',
    category: 'APIs & Services',
    icon: FaServer,
    iconColor: 'text-[#5FA04E] border-[#5FA04E]/20 bg-[#5FA04E]/10',
    skills: [
      'Node.js',
      'Express.js',
      'REST API Development',
      'CRUD Operations',
      'Authentication APIs',
      'Backend Integration',
      'LocalStorage Persistence',
      'API Testing Tools'
    ]
  },
  {
    title: 'Database & Authentication',
    category: 'Cloud & Security',
    icon: FaLock,
    iconColor: 'text-[#FFCA28] border-[#FFCA28]/20 bg-[#FFCA28]/10',
    skills: [
      'MongoDB',
      'Firebase Auth',
      'Firestore Database',
      'Supabase',
      'Email/Password Auth',
      'Google Sign-In',
      'Email Verification',
      'Login & Registration',
      'Auth State Management',
      'Password Hashing Concepts'
    ]
  },
  {
    title: 'Full-Stack UI & Engineering',
    category: 'UI/UX & Deployment',
    icon: FaLayerGroup,
    iconColor: 'text-[#06B6D4] border-[#06B6D4]/20 bg-[#06B6D4]/10',
    skills: [
      'Responsive Web Design',
      'Tailwind-based UI',
      'CSS Styling',
      'Landing Pages',
      'Dashboard Interfaces',
      'Admin Dashboards',
      'User / Business Roles',
      'Reusable Components',
      'Domain Integration',
      'Vercel Deployment'
    ]
  }
];



export default function TechnicalSkills() {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Frontend', 'Backend', 'Database & Services', 'Dev Tools'];

  const skillsToDisplay =
    activeCategory === 'All'
      ? allMainSkills
      : allMainSkills.filter((s) => s.category.toLowerCase().includes(activeCategory.toLowerCase()));

  // Duplicate items for continuous infinite marquee looping
  const marqueeItems = [...skillsToDisplay, ...skillsToDisplay];

  return (
    <section id="technical-skills" className="py-24 relative overflow-hidden bg-black/20">
      {/* Decorative Glow Blobs */}
      <div className="absolute top-[20%] right-[-5%] w-96 h-96 bg-brand-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-5%] w-96 h-96 bg-brand-secondary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">


          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight"
          >
            Technical tools
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
            Core technologies, backend services, frameworks, and developer tools powering my full-stack web applications.
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
                  className={`text-xs font-mono px-3.5 py-1.5 rounded-full transition-all duration-300 border ${isActive
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

        {/* Single Line Infinite Marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative overflow-hidden mb-16 py-4"
        >
          <div className="skills-marquee-container py-2" role="region" aria-label="Technical skills marquee">
            <div className="skills-marquee-track" style={{ '--marquee-speed': activeCategory === 'All' ? '45s' : '28s' }}>
              {marqueeItems.map((skill, index) => (
                <SkillCard
                  key={`${skill.id}-${index}`}
                  name={skill.name}
                  category={skill.category}
                  icon={skill.icon}
                  color={skill.color}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Supporting React Skills & Architectural Capabilities Grid */}
        <div>
          <div className="flex items-center gap-3 mb-6 px-1">
            <div className="h-4 w-1 bg-brand-primary rounded-full" />
            <h3 className="text-lg sm:text-xl font-display font-bold text-white tracking-tight">
              Specialized Capabilities & Technical Focus
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skillCapabilities.map((group, gIdx) => {
              const GroupIcon = group.icon;
              return (
                <motion.div
                  key={group.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: gIdx * 0.08 }}
                  className="glass-card p-6 sm:p-7 rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-300 relative group overflow-hidden"
                >
                  {/* Subtle Corner Glow */}
                  <div className="absolute -top-10 -right-10 w-28 h-28 bg-brand-primary/5 rounded-full blur-2xl group-hover:bg-brand-primary/10 transition-colors" />

                  {/* Header */}
                  <div className="flex items-center gap-3.5 mb-5">
                    <div className={`p-2.5 rounded-xl border ${group.iconColor} shrink-0`}>
                      <GroupIcon size={18} />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-white text-base sm:text-lg">
                        {group.title}
                      </h4>
                      <span className="text-[11px] font-mono text-gray-400 uppercase tracking-wider">
                        {group.category}
                      </span>
                    </div>
                  </div>

                  {/* Skill Badges / Tags */}
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-xs font-mono px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-brand-primary/40 hover:bg-brand-primary/10 transition-all duration-200 cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
