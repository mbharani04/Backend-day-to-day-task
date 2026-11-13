import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaLinkedin, FaCheckCircle, FaLaptop, FaMicrochip, FaStore, FaCar } from 'react-icons/fa';

const projects = [

  {
    id: 1,
    title: 'OfferMe – Local Offers & Business Discovery Platform',
    type: 'Real-World Web Application',
    description:
      'Built a real-world web application that helps users discover nearby local businesses, explore offers, and connect with business owners through a location-focused digital platform.',
    features: [
      'Nearby Local Business & Offer Discovery',
      'Category-Based Business and Offer Browsing',
      'Customer, Business Owner & Admin Dashboards',
      'Business Submission & Admin Approval Workflow',
      'Responsive UI with Modern Dashboard Experience',
      'Offer Claiming & Customer Interaction Flow'
    ],
    tech: [
      'React.js',
      'JavaScript',
      'Tailwind CSS',
      'React Router',
      'Firebase Auth',
      'Supabase'
    ],
    links: {
      demo: 'https://offerme.in/',
      demoLabel: 'Live',
      demoIcon: FaExternalLinkAlt
    },
    accent: 'border-blue-400/20 hover:border-blue-400/50',
    glowColor: 'bg-blue-500/10',
    badgeIcon: FaStore
  },

  {
    id: 2,
    title: 'Ottuner – On-Demand Acting Driver Booking Platform',
    type: 'Real-World Web Application',
    description:
      'Developed a modern on-demand acting driver platform (ottuner.in) that connects vehicle owners with verified, professional drivers for city commutes, outstation trips, airport transfers, and round-the-clock travel assistance.',
    features: [
      'Instant & Scheduled Acting Driver Bookings (local and outstation)',
      'City Commutes, Outstation Road Trips & Airport Transfers',
      'Driver & customer booking Registration',
      'Transparent Fare Estimation & Responsive Booking Flow'
    ],
    tech: ['React.js', 'Tailwind CSS', 'JavaScript', 'React Router', 'Vite'],
    links: {
      demo: 'https://ottuner.in/',
      demoLabel: 'Live',
      demoIcon: FaExternalLinkAlt
    },
    accent: 'border-amber-400/20 hover:border-amber-400/50',
    glowColor: 'bg-amber-500/10',
    badgeIcon: FaCar
  },

  {
    id: 3,
    title: 'Personal Productivity Web App',
    type: 'Productivity & Tooling',
    description: 'Built a personal productivity web application designed for efficient daily task tracking and workflow optimization, featuring client-side data persistence via LocalStorage.',
    features: [
      'Persistent LocalStorage State Management',
      'Daily Task & Productivity Workflow Tracking',
      'Minimalist & Responsive User Interface',
      'Client-Side Data Privacy & Zero Latency'
    ],
    tech: ['React.js', 'LocalStorage', 'JavaScript', 'Tailwind CSS'],
    links: {
      demo: 'https://productivity-web-app-one.vercel.app/',
      demoLabel: 'Live Demo',
      demoIcon: FaExternalLinkAlt,
      github: 'https://github.com/mbharani04/Backend-day-to-day-task/tree/main/personal_tracker/tracker-file/'
    },
    accent: 'border-emerald-400/20 hover:border-emerald-400/50',
    glowColor: 'bg-emerald-500/10',
    badgeIcon: FaLaptop
  },

  {
    id: 4,
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
      demo: 'https://lnkd.in/p/g_-568Sp',
      demoLabel: 'Research Paper',
      demoIcon: FaExternalLinkAlt,
      github: 'https://github.com/mbharani04/e_voting_system_final'
    },
    accent: 'border-brand-secondary/20 hover:border-brand-secondary/50',
    glowColor: 'bg-brand-secondary/10',
    badgeIcon: FaLaptop
  },

  {
    id: 5,
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
    tech: ['HTML5', 'CSS3', 'JavaScript'],
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

                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-semibold text-sm transition-all hover:scale-[1.02]"
                    >
                      <FaGithub size={14} />
                      <span>GitHub Code</span>
                    </a>
                  )}
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
