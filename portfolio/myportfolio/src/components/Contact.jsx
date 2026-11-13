import React from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaLinkedin, FaGithub, FaFileAlt } from 'react-icons/fa';

export default function Contact() {
  const contactMethods = [
    {
      icon: <FaEnvelope size={22} />,
      title: 'Email Address',
      value: 'bharani2004m@gmail.com',
      action: 'mailto:bharani2004m@gmail.com',
      actionText: 'Send Email',
      color: 'from-brand-primary/20 to-brand-primary/5',
      iconColor: 'text-brand-primary',
      borderColor: 'hover:border-brand-primary/40'
    },
    {
      icon: <FaPhoneAlt size={20} />,
      title: 'Phone',
      value: '+91 9445564242',
      action: 'tel:+919445564242',
      actionText: 'Call Now',
      color: 'from-brand-secondary/20 to-brand-secondary/5',
      iconColor: 'text-blue-400',
      borderColor: 'hover:border-brand-secondary/40'
    },
    {
      icon: <FaMapMarkerAlt size={22} />,
      title: 'Location',
      value: 'Chennai, Tamil Nadu, India',
      action: null,
      actionText: 'Open to Relocation & Remote',
      color: 'from-brand-accent/20 to-brand-accent/5',
      iconColor: 'text-brand-accent',
      borderColor: 'hover:border-brand-accent/40'
    }
  ];

  const socialLinks = [
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/bharani-m-2346982a0/',
      icon: <FaLinkedin size={18} />,
      color: 'hover:text-blue-400 hover:border-blue-400/40'
    },
    {
      name: 'GitHub',
      href: 'https://github.com/mbharani04/',
      icon: <FaGithub size={18} />,
      color: 'hover:text-white hover:border-white/40'
    },
    {
      name: 'Resume',
      href: '/resume.html',
      icon: <FaFileAlt size={16} />,
      color: 'hover:text-brand-accent hover:border-brand-accent/40'
    }
  ];

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-[#07040d]/60">
      {/* Background Decorative Glows */}
      <div className="absolute top-[20%] left-[-10%] w-96 h-96 bg-brand-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[380px] h-[380px] bg-brand-accent/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-accent/30 bg-brand-accent/10 text-brand-accent text-xs font-mono font-semibold tracking-wider uppercase mb-3"
          >
            Get In Touch
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight"
          >
            Let's Build Something <span className="text-brand-accent">Great</span> Together
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-gray-400 text-sm sm:text-base max-w-2xl mt-4 leading-relaxed"
          >
            I'm always open to discussing full-time opportunities, engineering roles, freelance projects, or innovative tech ideas. Reach out directly through any of the channels below.
          </motion.p>
          
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-1 bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent mt-6 rounded-full"
          />
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {contactMethods.map((method, index) => (
            <motion.div
              key={method.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative group rounded-2xl p-6 bg-[#07040d]/80 backdrop-blur-xl border border-white/10 ${method.borderColor} transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40 flex flex-col justify-between`}
            >
              <div>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${method.color} border border-white/10 flex items-center justify-center ${method.iconColor} mb-4 group-hover:scale-110 transition-transform`}>
                  {method.icon}
                </div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                  {method.title}
                </h3>
                <p className="text-white font-medium text-sm sm:text-base break-words">
                  {method.value}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5">
                {method.action ? (
                  <a
                    href={method.action}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-brand-accent hover:underline group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>{method.actionText}</span>
                    <span>→</span>
                  </a>
                ) : (
                  <span className="text-xs text-gray-400 font-medium">
                    {method.actionText}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Social / Profiles Row */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 border-t border-white/10"
        >
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-gray-400">
            Connect directly on:
          </span>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 font-semibold text-xs sm:text-sm transition-all duration-200 hover:bg-white/10 ${link.color}`}
              >
                {link.icon}
                <span>{link.name}</span>
              </a>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
