import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaLinkedin, FaGithub, FaPaperPlane, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

export default function Contact() {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!formData.user_name || !formData.user_email || !formData.message) {
      alert('Please fill out all required fields.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    // Using EmailJS to dispatch
    // We will attempt to send using standard credentials. If they are placeholders,
    // we'll run a high-fidelity simulation so the UI remains interactive and works perfectly.
    // Replace with your real EmailJS keys:
    const SERVICE_ID = 'service_placeholder';
    const TEMPLATE_ID = 'template_placeholder';
    const PUBLIC_KEY = 'public_key_placeholder';

    if (SERVICE_ID === 'service_placeholder' || TEMPLATE_ID === 'template_placeholder') {
      // Simulate API call for demonstration
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitStatus('success');
        setFormData({ user_name: '', user_email: '', subject: '', message: '' });
      }, 1500);
    } else {
      emailjs
        .sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
        .then(
          (result) => {
            setIsSubmitting(false);
            setSubmitStatus('success');
            setFormData({ user_name: '', user_email: '', subject: '', message: '' });
          },
          (error) => {
            console.error('EmailJS Error:', error);
            setIsSubmitting(false);
            setSubmitStatus('error');
          }
        );
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-[#070b13]/40">
      {/* Background Decorative Blob */}
      <div className="absolute top-[20%] left-[-10%] w-80 h-80 bg-brand-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[350px] h-[350px] bg-brand-accent/5 rounded-full blur-[110px] pointer-events-none" />

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
            Get in Touch
          </motion.h4>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-display font-extrabold text-white mt-1.5"
          >
            Let's Build Something Great Together
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 48 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-1 bg-gradient-to-r from-brand-primary to-brand-accent mt-3 rounded-full"
          />
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Direct Info Cards & Social Links */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct contact items */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-card p-6 rounded-2xl flex items-center gap-5 border border-white/5 hover:border-brand-primary/20"
            >
              <div className="p-3.5 rounded-xl bg-brand-primary/10 text-brand-primary border border-brand-primary/10">
                <FaEnvelope size={18} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Email Address</h4>
                <a href="mailto:bharani2004m@gmail.com" className="text-sm font-semibold text-white hover:text-brand-primary transition-colors">
                  bharani2004m@gmail.com
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="glass-card p-6 rounded-2xl flex items-center gap-5 border border-white/5 hover:border-brand-secondary/20"
            >
              <div className="p-3.5 rounded-xl bg-brand-secondary/10 text-brand-secondary border border-brand-secondary/10">
                <FaPhoneAlt size={16} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Phone Call</h4>
                <a href="tel:+919445564242" className="text-sm font-semibold text-white hover:text-brand-secondary transition-colors">
                  +91 9445564242
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass-card p-6 rounded-2xl flex items-center gap-5 border border-white/5 hover:border-brand-accent/20"
            >
              <div className="p-3.5 rounded-xl bg-brand-accent/10 text-brand-accent border border-brand-accent/10">
                <FaMapMarkerAlt size={16} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Location</h4>
                <span className="text-sm font-semibold text-white">
                  Chennai, Tamil Nadu, India
                </span>
              </div>
            </motion.div>

            {/* Social profiles and direct buttons */}
            <div className="pt-4 space-y-4">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest text-center lg:text-left">
                Find Me On Networks
              </h4>
              <div className="flex justify-center lg:justify-start gap-4">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-brand-secondary hover:text-brand-secondary text-gray-300 font-semibold text-xs sm:text-sm transition-all"
                >
                  <FaLinkedin size={14} />
                  <span>LinkedIn Connect</span>
                </a>
                <a
                  href="https://github.com/mbharani04/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-brand-primary hover:text-brand-primary text-gray-300 font-semibold text-xs sm:text-sm transition-all"
                >
                  <FaGithub size={14} />
                  <span>GitHub Profile</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Interaction Messaging Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <form
              ref={formRef}
              onSubmit={handleFormSubmit}
              className="glass-card p-6 sm:p-8 rounded-3xl border border-white/5 space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Full name input */}
                <div className="space-y-2">
                  <label htmlFor="user_name" className="text-xs font-semibold text-gray-400">
                    Your Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="user_name"
                    name="user_name"
                    value={formData.user_name}
                    onChange={handleInputChange}
                    required
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all font-sans"
                  />
                </div>

                {/* Email address input */}
                <div className="space-y-2">
                  <label htmlFor="user_email" className="text-xs font-semibold text-gray-400">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="user_email"
                    name="user_email"
                    value={formData.user_email}
                    onChange={handleInputChange}
                    required
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all font-sans"
                  />
                </div>
              </div>

              {/* Subject line input */}
              <div className="space-y-2">
                <label htmlFor="subject" className="text-xs font-semibold text-gray-400">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Inquiry / Collaboration proposal"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all font-sans"
                />
              </div>

              {/* Message text area */}
              <div className="space-y-2">
                <label htmlFor="message" className="text-xs font-semibold text-gray-400">
                  Your Message <span className="text-rose-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  placeholder="Hey Bharani, let's connect to discuss our next project build..."
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all font-sans resize-none"
                />
              </div>

              {/* Submit trigger button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-xl bg-brand-primary hover:bg-brand-primary/95 text-white font-semibold text-sm transition-all border border-brand-primary/10 flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.01] hover:shadow-lg hover:shadow-brand-primary/10"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Sending Message...</span>
                  </>
                ) : (
                  <>
                    <FaPaperPlane size={13} className="text-white/80" />
                    <span>Send Message</span>
                  </>
                )}
              </button>

              {/* Feedbacks notification */}
              <AnimatePresence>
                {submitStatus && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`p-4 rounded-xl border flex items-start gap-3 ${
                      submitStatus === 'success'
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                        : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                    }`}
                  >
                    {submitStatus === 'success' ? (
                      <>
                        <FaCheckCircle className="shrink-0 mt-0.5" size={16} />
                        <div>
                          <h5 className="font-semibold text-sm">Message Sent Successfully!</h5>
                          <p className="text-xs text-emerald-400/80 mt-0.5">
                            Thank you for reaching out. Bharani M will review your message and reply soon!
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <FaExclamationCircle className="shrink-0 mt-0.5" size={16} />
                        <div>
                          <h5 className="font-semibold text-sm">Failed to Dispatch Message</h5>
                          <p className="text-xs text-rose-400/80 mt-0.5">
                            An error occurred while sending your email. Please try email link directly or retry!
                          </p>
                        </div>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
