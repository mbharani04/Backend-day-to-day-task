import React from 'react';
import { motion } from 'framer-motion';
import { FaCertificate, FaCode, FaMicrochip, FaRobot, FaKeyboard } from 'react-icons/fa';

const certs = [
  {
    title: 'Full Stack Web Development',
    issuer: 'Web Dev & Databases Focus',
    desc: 'Comprehensive training on HTML5, CSS3, ES6 JavaScript, React.js, and backend integration.',
    icon: FaCode,
    color: 'text-brand-primary bg-brand-primary/10 border-brand-primary/20',
  },
  {
    title: 'Embedded C Programming',
    issuer: 'NSIC (National Small Industries Corp)',
    desc: 'Industrial certification in microcontrollers programming, circuit wiring, and peripheral communication.',
    icon: FaMicrochip,
    color: 'text-brand-accent bg-brand-accent/10 border-brand-accent/20',
  },
  {
    title: 'Generative AI Mastermind',
    issuer: 'GenAI & Prompt Engineering Workshop',
    desc: 'Advanced instruction in LLM architecture, generative model queries, and automated developer flows.',
    icon: FaRobot,
    color: 'text-brand-secondary bg-brand-secondary/10 border-brand-secondary/20',
  },
  {
    title: 'English Typewriting',
    issuer: 'State/Institutional Certification',
    desc: 'Official typing certification verifying words-per-minute typing speed and formatting precision.',
    icon: FaKeyboard,
    color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  },
];

export default function Certifications() {
  return (
    <section id="certifications" className="py-24 relative overflow-hidden bg-black/10">
      <div className="absolute top-[30%] left-[-5%] w-80 h-80 bg-brand-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.h4
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-xs font-bold uppercase tracking-widest text-brand-accent"
          >
            Credentials
          </motion.h4>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-display font-extrabold text-white mt-1.5"
          >
            Certifications
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 48 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-1 bg-gradient-to-r from-brand-accent to-brand-secondary mt-3 rounded-full"
          />
        </div>

        {/* Certifications Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certs.map((cert, idx) => {
            const Icon = cert.icon;
            return (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-card glass-card-hover p-6 rounded-2xl flex flex-col justify-between h-[230px] border border-white/5 relative overflow-hidden group"
              >
                <div>
                  {/* Icon and Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-2.5 rounded-xl border ${cert.color}`}>
                      <Icon size={18} />
                    </div>
                    <div className="text-gray-600 group-hover:text-brand-accent transition-colors duration-300">
                      <FaCertificate size={16} />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-bold text-white text-sm sm:text-base tracking-tight mb-1 group-hover:text-brand-accent transition-colors duration-300">
                    {cert.title}
                  </h3>
                  
                  {/* Issuer */}
                  <p className="text-[11px] font-semibold text-brand-primary tracking-wider uppercase mb-3">
                    {cert.issuer}
                  </p>
                </div>

                {/* Description */}
                <p className="text-xs text-gray-400 leading-relaxed mt-auto">
                  {cert.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
