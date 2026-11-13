import React from 'react';
import { motion } from 'framer-motion';
import { FaCertificate, FaCode, FaMicrochip, FaRobot, FaKeyboard, FaExternalLinkAlt, FaBookOpen } from 'react-icons/fa';

const certs = [
  {
    title: 'Research Paper Publication',
    issuer: 'TANZ Research Journal (Vol. 12, Issue 7)',
    desc: 'Published research paper on "Electronic Voting System with Accurate Real-Time Result Computation", evaluating secure voter verification & real-time compute.',
    icon: FaBookOpen,
    color: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20',
    link: 'https://lnkd.in/p/g_-568Sp',
  },
  {
    title: 'Full Stack Web Development',
    issuer: 'Web Dev & Databases Focus',
    desc: 'Comprehensive training on HTML5, CSS3, ES6 JavaScript, React.js, and backend integration.',
    icon: FaCode,
    color: 'text-brand-primary bg-brand-primary/10 border-brand-primary/20',
    link: 'https://lnkd.in/p/gFtsgMg3',
  },
  {
    title: 'Embedded C Programming',
    issuer: 'NSIC (National Small Industries Corp)',
    desc: 'Industrial certification in microcontrollers programming, circuit wiring, and peripheral communication.',
    icon: FaMicrochip,
    color: 'text-brand-accent bg-brand-accent/10 border-brand-accent/20',
    link: 'https://lnkd.in/p/ghPjKyNq',
  }
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certs.map((cert, idx) => {
            const Icon = cert.icon;
            return (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-card glass-card-hover p-6 rounded-2xl flex flex-col justify-between h-full min-h-[250px] border border-white/5 relative overflow-hidden group"
              >
                <div>
                  {/* Icon and Badge / Link */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-2.5 rounded-xl border ${cert.color}`}>
                      <Icon size={18} />
                    </div>
                    {cert.link ? (
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-brand-accent transition-colors p-1.5 rounded-lg hover:bg-white/5"
                        title="View Certificate"
                      >
                        <FaExternalLinkAlt size={14} />
                      </a>
                    ) : (
                      <div className="text-gray-600 group-hover:text-brand-accent transition-colors duration-300">
                        <FaCertificate size={16} />
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-bold text-white text-sm sm:text-base tracking-tight mb-1 group-hover:text-brand-accent transition-colors duration-300">
                    {cert.title}
                  </h3>

                  {/* Issuer */}
                  <p className="text-[11px] font-semibold text-brand-primary tracking-wider uppercase mb-3">
                    {cert.issuer}
                  </p>

                  {/* Description */}
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {cert.desc}
                  </p>
                </div>

                {/* Link Button */}
                {cert.link && (
                  <div className="mt-5 pt-3 border-t border-white/5">
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full py-2 px-3 rounded-xl bg-brand-primary/10 hover:bg-brand-primary/20 text-brand-primary hover:text-white border border-brand-primary/25 hover:border-brand-primary/50 text-xs font-semibold transition-all duration-200 hover:scale-[1.02]"
                    >
                      <span>View Credential</span>
                      <FaExternalLinkAlt size={11} />
                    </a>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
