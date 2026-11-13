import React, { useEffect, useState, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { FaGraduationCap, FaNetworkWired, FaLaptopCode } from 'react-icons/fa';

const stats = [
  {
    id: 1,
    value: 3,
    suffix: '+',
    label: 'Major Projects',
    desc: 'Simulated and developed platforms',
    icon: FaLaptopCode,
    color: 'from-brand-primary to-brand-accent'
  },
  {
    id: 2,
    value: 100,
    suffix: '%',
    label: 'Full Stack',
    desc: 'Python, JS, React & MySQL',
    icon: FaNetworkWired,
    color: 'from-brand-secondary to-brand-primary'
  },
  {
    id: 3,
    value: 2,
    suffix: '+',
    label: 'Embedded Systems',
    desc: 'ESP32, Arduino & Proteus',
    icon: FaGraduationCap,
    color: 'from-brand-accent to-brand-secondary'
  }
];

function CountUp({ value, suffix, duration = 1.5 }) {
  const [count, setCount] = useState(0);
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, { threshold: 0.1 });

    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = parseInt(value, 10);
    if (start === end) {
      setCount(end);
      return;
    }

    const totalMiliseconds = duration * 1000;
    const incrementTime = Math.max(10, Math.floor(totalMiliseconds / end));

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className="font-display font-bold text-4xl sm:text-5xl text-white tracking-tight">
      {count}
      {suffix}
    </span>
  );
}

export default function About() {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Decorative Blur Blob */}
      <div className="absolute top-[40%] right-[-10%] w-80 h-80 bg-brand-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* Title */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.h4
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-xs font-bold uppercase tracking-widest text-[#C084FC]"
          >
            My Story
          </motion.h4>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-display font-extrabold text-white mt-1.5"
          >
            About Me
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 48 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-1 bg-gradient-to-r from-brand-primary to-brand-accent mt-3 rounded-full"
          />
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Side: Bio Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-4 text-justify leading-relaxed text-sm sm:text-base text-gray-300 font-sans"
          >
            <p>
              I'm a passionate Full Stack Developer with a background in Electronics and Communication Engineering (ECE). My journey into web development started with curiosity about how websites and applications work.
            </p>
            <p>
              I work with technologies like React.js, JavaScript, Node.js, Express.js, and databases such as Supabase and MongoDB. Through hands-on projects and professional experience, I've gained practical knowledge of building web applications, developing backend functionality, integrating APIs, and solving real-world problems.
            </p>
            <p>
              I enjoy learning new technologies, exploring AI-powered tools, experimenting with ideas, and working independently to build meaningful products.
            </p>
            <p className="text-[#C084FC] font-medium">
              I'm still learning, growing, and challenging myself every day.
            </p>

          </motion.div>

          {/* Right Side: Statistics Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`glass-card glass-card-hover p-6 rounded-2xl flex flex-col justify-between h-[160px] relative overflow-hidden group ${idx === 2 ? 'sm:col-span-2' : ''
                    }`}
                >
                  {/* Decorative faint glow */}
                  <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${stat.color} opacity-[0.03] group-hover:opacity-[0.08] blur-xl rounded-full transition-opacity`} />

                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-brand-primary group-hover:text-white transition-colors duration-300">
                      <Icon size={18} />
                    </div>
                    <CountUp value={stat.value} suffix={stat.suffix} />
                  </div>

                  <div className="mt-4">
                    <h4 className="font-display font-bold text-white text-sm tracking-tight">
                      {stat.label}
                    </h4>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {stat.desc}
                    </p>
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
