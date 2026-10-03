import React from 'react';
import { motion } from 'framer-motion';
import { FaBrain, FaCodeBranch, FaMicrochip, FaRocket, FaCheckCircle } from 'react-icons/fa';

const hireFeatures = [
  {
    title: 'Problem Solver',
    desc: 'I enjoy solving practical engineering and software challenges. Translating complex criteria into clean solutions is my core driver.',
    icon: FaBrain,
    color: 'text-brand-primary border-brand-primary/20',
  },
  {
    title: 'Full Stack Development',
    desc: 'Able to develop complete applications from frontend to backend. Integrating databases, APIs, and client-side layouts seamlessly.',
    icon: FaCodeBranch,
    color: 'text-brand-secondary border-brand-secondary/20',
  },
  {
    title: 'Embedded Systems',
    desc: 'Strong understanding of hardware-software integration. Proficient in firmware programming, IoT setups, and board simulations.',
    icon: FaMicrochip,
    color: 'text-brand-accent border-brand-accent/20',
  },
  {
    title: 'Continuous Learner',
    desc: 'Constantly exploring AI tools and modern technologies. Proactively refining workflows and learning new web and hardware modules.',
    icon: FaRocket,
    color: 'text-emerald-400 border-emerald-400/20',
  },
];

const softSkills = [
  'Communication',
  'Teamwork',
  'Adaptability',
  'Problem Solving',
  'Presentation',
  'Time Management',
  'Self Motivation',
];

export default function SkillsFeatures() {
  return (
    <section id="why-hire-me" className="py-24 relative overflow-hidden">
      {/* Decorative Blur Blob */}
      <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-brand-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-96 h-96 bg-brand-secondary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Why Hire Me Feature Cards */}
          <div className="lg:col-span-8 space-y-8">
            <div>
              <motion.h4
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="text-xs font-bold uppercase tracking-widest text-brand-primary"
              >
                Value Proposition
              </motion.h4>
              <h2 className="text-3xl font-display font-extrabold text-white mt-1.5">
                Why Hire Me?
              </h2>
              <div className="h-1 w-12 bg-gradient-to-r from-brand-primary to-brand-accent mt-3 rounded-full" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {hireFeatures.map((feat, idx) => {
                const Icon = feat.icon;
                return (
                  <motion.div
                    key={feat.title}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.08 }}
                    className="glass-card glass-card-hover p-6 rounded-2xl border border-white/5 relative overflow-hidden group"
                  >
                    <div className="flex gap-4 items-start">
                      <div className={`p-2.5 rounded-xl border bg-white/5 mt-0.5 shrink-0 ${feat.color}`}>
                        <Icon size={16} />
                      </div>
                      <div className="space-y-1.5">
                        <h4 className="font-display font-bold text-white text-sm sm:text-base tracking-tight">
                          {feat.title}
                        </h4>
                        <p className="text-xs text-gray-400 leading-relaxed font-sans">
                          {feat.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Soft Skills cloud */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
            <div>
              <motion.h4
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="text-xs font-bold uppercase tracking-widest text-brand-secondary"
              >
                Interpersonal
              </motion.h4>
              <h2 className="text-3xl font-display font-extrabold text-white mt-1.5">
                Soft Skills
              </h2>
              <div className="h-1 w-12 bg-gradient-to-r from-brand-secondary to-brand-accent mt-3 rounded-full" />
            </div>

            <p className="text-sm text-gray-400 leading-relaxed font-sans">
              Alongside core engineering capabilities, I prioritize adaptive collaboration, effective presentation, and self-motivated execution to coordinate project releases.
            </p>

            {/* Tags Cloud */}
            <div className="flex flex-wrap gap-2.5 pt-2">
              {softSkills.map((skill, idx) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-brand-secondary text-gray-300 font-sans text-xs sm:text-sm font-semibold transition-all duration-300 cursor-default hover:scale-105 shadow-md hover:shadow-brand-secondary/5"
                >
                  <FaCheckCircle className="text-brand-secondary" size={11} />
                  <span>{skill}</span>
                </motion.div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-xs text-gray-500 font-sans text-center">
              "Synergy is key. Great software isn't built in isolation—it requires communication, alignment, and adaptation."
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
