import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaLinkedin, FaCheckCircle, FaLaptop, FaMicrochip } from 'react-icons/fa';

const projects = [
  {
    id: 1,
    title: 'Smart E-Cycle Rental System',
    type: 'IoT & Smart City Initiative',
    description: 'Designed and simulated an intelligent e-cycle rental platform inspired by smart city initiatives. Integrates firmware logic with real-time lock controls and payment triggers.',
    features: [
      'Payment Verification Simulation',
      'Automatic Lock & Unlock Mechanisms',
      'Real-time Active Ride Timer',
      'Automatic Auto-Lock on Timeout',
      'Battery & Lock Expiry Alerts',
      'Real-time Status Monitoring console'
    ],
    tech: ['Arduino', 'ESP32', 'C/C++', 'Wokwi', 'Proteus'],
    links: {
      demo: 'https://wokwi.com/projects/437832574866624513',
      demoLabel: 'Live Simulation',
      demoIcon: FaExternalLinkAlt,
      github: 'https://github.com/mbharani04/'
    },
    accent: 'border-brand-primary/20 hover:border-brand-primary/50',
    glowColor: 'bg-brand-primary/10',
    badgeIcon: FaMicrochip
  },
  {
    id: 2,
    title: 'Secure E-Voting System',
    type: 'Database & Hardware Integration',
    description: 'Developed a secure offline electronic voting system integrating hardware voting terminals with a secure administrative dashboard and real-time result calculations.',
    features: [
      'Role Based Admin & Voter Authentication',
      'One Person One Vote validation rules',
      'Real-Time voting results calculation',
      'Secure SQLite/MySQL voter database',
      'Interactive Admin dashboard statistics',
      'Hardware integration with Arduino Nano'
    ],
    tech: ['Python', 'MySQL', 'Arduino Nano', 'SQL Queries'],
    links: {
      demo: 'https://linkedin.com',
      demoLabel: 'LinkedIn Demo',
      demoIcon: FaLinkedin,
      github: 'https://github.com/mbharani04/'
    },
    accent: 'border-brand-secondary/20 hover:border-brand-secondary/50',
    glowColor: 'bg-brand-secondary/10',
    badgeIcon: FaLaptop
  },
  {
    id: 3,
    title: 'Sociagram Frontend',
    type: 'Social Platform Frontend',
    description: 'Developed a modern, interactive social media frontend experience (Sociagram) featuring responsive design layouts, client-side routing, and real-time interactive components.',
    features: [
      'Modern Interactive User Feed',
      'Responsive Mobile & Desktop layouts',
      'Sleek UI/UX transitions & animations',
      'State Management integration',
      'Dynamic user profiles preview',
      'Interactive post creation and feeds'
    ],
    tech: ['React.js', 'Tailwind CSS', 'ES6 JavaScript', 'Vite'],
    links: {
      demo: 'https://fs-project-gamma.vercel.app/',
      demoLabel: 'Live Demo',
      demoIcon: FaExternalLinkAlt,
      github: 'https://github.com/mbharani04/'
    },
    accent: 'border-purple-400/20 hover:border-purple-400/50',
    glowColor: 'bg-brand-secondary/10',
    badgeIcon: FaLaptop
  },
  {
    id: 4,
    title: 'Planets Explorer Frontend',
    type: 'Space Visualizer Frontend',
    description: 'Built a visually stunning, responsive Planets Explorer application showcasing celestial data cards, orbital system stats, and interactive planetary facts.',
    features: [
      'Full interactive celestial cards',
      'Dynamic search & category filtering',
      'Responsive mobile-friendly viewports',
      'Fluid transitions and animation states',
      'Custom styled solar vector diagrams',
      'Detailed planetary structure analysis'
    ],
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Vite'],
    links: {
      demo: 'https://planetsexplorer-sigma.vercel.app/',
      demoLabel: 'Live Demo',
      demoIcon: FaExternalLinkAlt,
      github: 'https://github.com/mbharani04/'
    },
    accent: 'border-brand-accent/20 hover:border-brand-accent/50',
    glowColor: 'bg-brand-accent/10',
    badgeIcon: FaLaptop
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* Background Decorative Blob */}
      <div className="absolute top-[30%] left-[-10%] w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.h4
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-xs font-bold uppercase tracking-widest text-brand-primary"
          >
            My Creations
          </motion.h4>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-display font-extrabold text-white mt-1.5"
          >
            Featured Projects
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 48 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-1 bg-gradient-to-r from-brand-primary to-brand-accent mt-3 rounded-full"
          />
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, idx) => {
            const BadgeIcon = project.badgeIcon;
            const DemoIcon = project.links.demoIcon;
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className={`glass-card p-6 sm:p-8 rounded-3xl flex flex-col justify-between border ${project.accent} relative overflow-hidden group`}
              >
                {/* Glow effect on hover */}
                <div className={`absolute -inset-px ${project.glowColor} opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500 -z-10`} />

                <div>
                  {/* Category & Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold tracking-wider text-brand-accent uppercase bg-brand-accent/10 px-3 py-1 rounded-full">
                      {project.type}
                    </span>
                    <div className="text-gray-500 group-hover:text-white transition-colors duration-300">
                      <BadgeIcon size={20} />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white mb-3 group-hover:text-gradient-primary transition-all duration-300">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-400 leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-2.5 mb-6">
                    <h4 className="text-xs font-bold text-gray-300 uppercase tracking-widest mb-3">
                      Key Highlights:
                    </h4>
                    {project.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs text-gray-400">
                        <FaCheckCircle className="text-brand-primary mt-0.5 shrink-0" size={12} />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack Badges */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tech.map((t, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] sm:text-xs font-mono font-medium px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-gray-300 hover:border-brand-primary transition-colors"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="flex items-center gap-4 border-t border-white/5 pt-6 mt-auto">
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-brand-primary hover:bg-brand-primary/95 text-white font-semibold text-sm transition-all border border-brand-primary/15 hover:shadow-lg hover:shadow-brand-primary/10 hover:scale-[1.02]"
                  >
                    <DemoIcon size={14} />
                    <span>{project.links.demoLabel}</span>
                  </a>
                  
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-semibold text-sm transition-all hover:scale-[1.02]"
                  >
                    <FaGithub size={14} />
                    <span>GitHub Code</span>
                  </a>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
