import React from 'react';
import { motion } from 'framer-motion';
import { FaBriefcase, FaGraduationCap, FaCalendarAlt, FaAward, FaMapMarkerAlt } from 'react-icons/fa';
import Galaxy from './Galaxy';

export default function Timeline() {
  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-black/5">
      {/* Galaxy Background for Experience & Education section */}
      <div className="absolute inset-0 z-0 opacity-80 pointer-events-auto">
        <Galaxy 
          mouseRepulsion={true}
          mouseInteraction={true}
          density={1.5}
          glowIntensity={0.6}
          saturation={0.8}
          hueShift={200}
          transparent={true}
        />
      </div>

      {/* Decorative gradient blur in background */}
      <div className="absolute top-[20%] right-[-10%] w-[350px] h-[350px] bg-brand-secondary/5 rounded-full blur-[90px] pointer-events-none z-0" />
      <div className="absolute bottom-[25%] left-[-10%] w-[350px] h-[350px] bg-brand-accent/5 rounded-full blur-[90px] pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.h4
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-xs font-bold uppercase tracking-widest text-[#06b6d4]"
          >
            Journey
          </motion.h4>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-display font-extrabold text-white mt-1.5"
          >
            Experience & Education
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 48 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-1 bg-gradient-to-r from-brand-accent to-brand-primary mt-3 rounded-full"
          />
        </div>

        {/* Timeline Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* EXPERIENCE */}
          <div className="space-y-6">
            <div className="flex items-center gap-3.5 mb-2">
              <div className="p-2.5 rounded-xl bg-brand-primary/10 border border-brand-primary/20 text-brand-primary">
                <FaBriefcase size={20} />
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight">
                Work Experience
              </h3>
            </div>

            {/* Role 1: Full-Stack Developer Intern (Current) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card p-6 sm:p-8 rounded-3xl border border-brand-primary/20 relative overflow-hidden group hover:border-brand-primary/40 shadow-xl"
            >
              {/* Highlight lines */}
              <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-brand-primary via-brand-secondary to-brand-accent" />

              <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                <div>
                  <h4 className="text-lg sm:text-xl font-display font-bold text-white group-hover:text-brand-primary transition-colors">
                    Full-Stack Developer Intern
                  </h4>
                  <p className="text-sm font-semibold text-brand-primary mt-0.5">
                    Adbricks Media
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-brand-primary font-semibold bg-brand-primary/10 px-3 py-1 rounded-full border border-brand-primary/20">
                  <FaCalendarAlt size={11} />
                  <span>2026 – Present</span>
                </div>
              </div>

              <div className="flex flex-col gap-1 text-xs text-gray-400 mb-4 font-medium">
                <div className="flex items-center gap-1.5">
                  <FaAward className="text-brand-secondary" />
                  <span>Focus: Full-Stack Web Apps, APIs, Authentication &amp; Deployment</span>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <FaMapMarkerAlt className="text-brand-accent" />
                  <span>Chennai, India</span>
                </div>
              </div>

              <p className="text-sm text-gray-300 leading-relaxed font-sans mb-4">
                Working on real-world web applications and gaining hands-on experience across frontend development, backend integration, authentication, APIs, deployment, and third-party services.
              </p>

              {/* Key Responsibilities */}
              <div className="space-y-2 mb-5">
                <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-300 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                  Key Responsibilities
                </h5>
                <ul className="space-y-2 text-xs text-gray-300/90 font-sans leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="text-brand-primary font-bold mt-0.5">•</span>
                    <span>Developed responsive and interactive web interfaces using <strong>React.js, JSX, Tailwind CSS, and JavaScript ES6+</strong>.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-primary font-bold mt-0.5">•</span>
                    <span>Built reusable React components and implemented React Hooks including <code className="text-cyan-300 font-mono text-[11px] bg-white/5 px-1 py-0.5 rounded">useState</code>, <code className="text-cyan-300 font-mono text-[11px] bg-white/5 px-1 py-0.5 rounded">useEffect</code>, <code className="text-cyan-300 font-mono text-[11px] bg-white/5 px-1 py-0.5 rounded">useLocation</code>, <code className="text-cyan-300 font-mono text-[11px] bg-white/5 px-1 py-0.5 rounded">useNavigate</code>, and <code className="text-cyan-300 font-mono text-[11px] bg-white/5 px-1 py-0.5 rounded">useMemo</code>.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-primary font-bold mt-0.5">•</span>
                    <span>Developed and integrated <strong>Node.js backend functionality and REST APIs</strong> with full CRUD operations.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-primary font-bold mt-0.5">•</span>
                    <span>Configured <strong>Supabase</strong> for database operations and API integration.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-primary font-bold mt-0.5">•</span>
                    <span>Implemented <strong>Firebase Authentication</strong>, including registration, login, Google Sign-In, and email verification.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-primary font-bold mt-0.5">•</span>
                    <span>Integrated <strong>WhatsApp messaging workflows</strong> to support communication and business automation within web applications.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-primary font-bold mt-0.5">•</span>
                    <span>Configured <strong>DNS records, custom domain settings</strong>, and production deployments using <strong>Vercel</strong>.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-primary font-bold mt-0.5">•</span>
                    <span>Collaborated using <strong>Git &amp; GitHub</strong> and leveraged AI-assisted developer workflows for rapid, reliable feature implementation.</span>
                  </li>
                </ul>
              </div>

              {/* Skills Gained Tags */}
              <div>
                <h5 className="text-[11px] font-mono font-semibold uppercase tracking-wider text-gray-400 mb-2.5">
                  Skills Gained
                </h5>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    'React.js',
                    'JavaScript ES6+',
                    'Tailwind CSS',
                    'Node.js',
                    'REST APIs',
                    'Supabase',
                    'Firebase',
                    'Authentication',
                    'WhatsApp Integration',
                    'DNS Configuration',
                    'Git/GitHub',
                    'Vercel',
                    'API Integration',
                    'CRUD'
                  ].map((skill, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] sm:text-[11px] font-mono font-medium px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-gray-300 hover:text-white hover:border-brand-primary/40 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Role 2: Embedded Systems Internship */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="glass-card p-6 sm:p-7 rounded-3xl border border-brand-primary/10 relative overflow-hidden group hover:border-brand-primary/30"
            >
              {/* Highlight lines */}
              <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-brand-primary/60 to-brand-secondary/60" />

              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <h4 className="text-base sm:text-lg font-display font-bold text-white group-hover:text-brand-primary transition-colors">
                  Embedded Systems Internship
                </h4>
                <div className="flex items-center gap-1.5 text-xs text-gray-400 font-semibold bg-white/5 px-3 py-1 rounded-full border border-white/10">
                  <FaCalendarAlt size={11} />
                  <span>2025</span>
                </div>
              </div>

              <div className="flex flex-col gap-1 text-xs text-gray-400 mb-3 font-medium">
                <div className="flex items-center gap-1.5">
                  <FaAward className="text-brand-secondary" />
                  <span>Focus: Firmware Development &amp; Hardware Simulation</span>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <FaMapMarkerAlt className="text-brand-accent" />
                  <span>Chennai, India (Remote/Simulated)</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-sans">
                Worked on designing and simulating a <strong>Smart E-Cycle Rental prototype</strong> focusing on embedded logic, payment integration, and automatic lock/unlock mechanisms. Programmed microcontrollers with efficient C/C++ code and integrated digital peripheral systems.
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="text-[10px] sm:text-xs font-mono font-medium px-2 py-0.5 bg-white/5 border border-white/10 rounded-md text-gray-300">ESP32 Firmware</span>
                <span className="text-[10px] sm:text-xs font-mono font-medium px-2 py-0.5 bg-white/5 border border-white/10 rounded-md text-gray-300">IoT State Machine</span>
                <span className="text-[10px] sm:text-xs font-mono font-medium px-2 py-0.5 bg-white/5 border border-white/10 rounded-md text-gray-300">Proteus Sim</span>
              </div>
            </motion.div>
          </div>

          {/* EDUCATION */}
          <div id="education" className="space-y-6 scroll-mt-28">
            <div className="flex items-center gap-3.5 mb-2">
              <div className="p-2.5 rounded-xl bg-brand-accent/10 border border-brand-accent/20 text-[#06b6d4]">
                <FaGraduationCap size={20} />
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight">
                Education
              </h3>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card p-6 sm:p-8 rounded-3xl border border-brand-accent/10 relative overflow-hidden group hover:border-brand-accent/30"
            >
              {/* Highlight lines */}
              <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-[#06b6d4] to-brand-primary" />

              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div>
                  <h4 className="text-lg font-display font-bold text-white group-hover:text-brand-accent transition-colors">
                    Bachelor of Engineering
                  </h4>
                  <p className="text-sm font-medium text-brand-accent mt-0.5">
                    Electronics and Communication Engineering
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-brand-accent font-semibold bg-brand-accent/10 px-3 py-1 rounded-full border border-brand-accent/20">
                  <FaCalendarAlt size={11} />
                  <span>2022 - 2026</span>
                </div>
              </div>

              <div className="flex flex-col gap-1 text-xs text-gray-400 mb-4 font-medium">
                <div className="flex items-center gap-1.5">
                  <FaAward className="text-brand-primary" />
                  <span>Meenakshi College of Engineering</span>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <FaMapMarkerAlt className="text-brand-secondary" />
                  <span>Chennai, Tamil Nadu</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between gap-4">
                <div>
                  <h5 className="font-semibold text-white text-sm">Academic Performance</h5>
                  <p className="text-xs text-gray-400 mt-0.5">Consistent engineering grade achievements</p>
                </div>
                <div className="flex flex-col items-center justify-center bg-brand-accent/10 px-4 py-2 rounded-xl border border-brand-accent/30">
                  <span className="font-display font-extrabold text-white text-lg tracking-tight">82%</span>
                  <span className="text-[9px] uppercase tracking-wider text-brand-accent font-bold mt-0.5">Score</span>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2.5">
                <span className="text-[10px] sm:text-xs font-mono font-medium px-2 py-0.5 bg-white/5 border border-white/10 rounded-md text-gray-300">Analog Circuits</span>
                <span className="text-[10px] sm:text-xs font-mono font-medium px-2 py-0.5 bg-white/5 border border-white/10 rounded-md text-gray-300">Signal Processing</span>
                <span className="text-[10px] sm:text-xs font-mono font-medium px-2 py-0.5 bg-white/5 border border-white/10 rounded-md text-gray-300">Microcontrollers</span>
              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
