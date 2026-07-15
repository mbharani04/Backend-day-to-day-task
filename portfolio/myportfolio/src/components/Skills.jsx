import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaLaptopCode, FaDatabase, FaMicrochip, FaTools, FaRobot } from 'react-icons/fa';

const skillCategories = [
  {
    title: 'Programming',
    icon: FaCode,
    color: 'text-brand-primary border-brand-primary/10',
    skills: [
      { name: 'Python', level: 90 },
      { name: 'C', level: 85 },
      { name: 'C++', level: 80 }
    ]
  },
  {
    title: 'Frontend',
    icon: FaLaptopCode,
    color: 'text-brand-secondary border-brand-secondary/10',
    skills: [
      { name: 'HTML5 / CSS3', level: 92 },
      { name: 'JavaScript (ES6)', level: 88 },
      { name: 'React.js', level: 85 }
    ]
  },
  {
    title: 'Embedded Systems',
    icon: FaMicrochip,
    color: 'text-brand-accent border-brand-accent/10',
    skills: [
      { name: 'Arduino IDE', level: 95 },
      { name: 'ESP32 / ESP8266', level: 90 },
      { name: 'Proteus / Wokwi', level: 88 }
    ]
  },
  {
    title: 'Database',
    icon: FaDatabase,
    color: 'text-emerald-400 border-emerald-400/10',
    skills: [
      { name: 'MySQL / Relational DBs', level: 82 },
      { name: 'SQL Query Optimization', level: 78 }
    ]
  },
  {
    title: 'Tools & Version Control',
    icon: FaTools,
    color: 'text-amber-400 border-amber-400/10',
    skills: [
      { name: 'Git & GitHub', level: 88 },
      { name: 'VS Code', level: 92 },
      { name: 'MS Office Suite', level: 85 }
    ]
  },
  {
    title: 'AI Tools & Workflows',
    icon: FaRobot,
    color: 'text-purple-400 border-purple-400/10',
    skills: [
      { name: 'ChatGPT / Claude APIs', level: 95 },
      { name: 'Prompt Engineering', level: 92 },
      { name: 'AI-Assisted Coding', level: 90 }
    ]
  }
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-black/10">
      {/* Background Decorative Blob */}
      <div className="absolute bottom-[10%] left-[-5%] w-80 h-80 bg-brand-secondary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Title Section */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.h4
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-xs font-bold uppercase tracking-widest text-brand-secondary"
          >
            Capabilities
          </motion.h4>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-display font-extrabold text-white mt-1.5"
          >
            Technical Skills
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 48 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-1 bg-gradient-to-r from-brand-secondary to-brand-accent mt-3 rounded-full"
          />
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, catIdx) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: catIdx * 0.08 }}
                className="glass-card glass-card-hover p-6 rounded-2xl flex flex-col justify-between"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center gap-3.5 mb-6 border-b border-white/5 pb-4">
                    <div className={`p-2.5 rounded-xl bg-white/5 border ${category.color}`}>
                      <Icon size={18} />
                    </div>
                    <h3 className="font-display font-bold text-white text-base sm:text-lg tracking-tight">
                      {category.title}
                    </h3>
                  </div>

                  {/* Skills Progress bars */}
                  <div className="space-y-5">
                    {category.skills.map((skill, skillIdx) => (
                      <div key={skill.name} className="space-y-1.5">
                        <div className="flex justify-between text-xs font-medium">
                          <span className="text-gray-300">{skill.name}</span>
                          <span className="text-gray-400 font-mono">{skill.level}%</span>
                        </div>
                        {/* Progress track */}
                        <div className="h-[5px] bg-white/5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.1 + skillIdx * 0.1, ease: 'easeOut' }}
                            className="h-full bg-gradient-to-r from-brand-primary to-brand-accent rounded-full"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
