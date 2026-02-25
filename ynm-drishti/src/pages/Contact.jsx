import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ChevronRight, Mail, Phone, MapPin, Clock, Send, MessageCircle,
  CheckCircle2, Building2, Globe2, ChevronDown
} from 'lucide-react';
import { Link } from 'react-router-dom';

const FloatingOrb = ({ size, color, top, left, delay = 0 }) => (
  <motion.div className="absolute rounded-full pointer-events-none"
    style={{ width: size, height: size, top, left, background: `radial-gradient(circle, ${color} 0%, transparent 70%)`, filter: 'blur(40px)' }}
    animate={{ y: [0, -20, 0], opacity: [0.15, 0.3, 0.15] }}
    transition={{ duration: 6, repeat: Infinity, delay, ease: 'easeInOut' }} />
);

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  const fadeInUp = { hidden: { opacity: 0, y: 30, filter: 'blur(4px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)' } };
  const stagger = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.15 } } };

  const contactMethods = [
    { icon: Mail, title: 'Email Us', value: 'info@ynmdrishti.com', desc: 'For general inquiries and support', href: 'mailto:info@ynmdrishti.com', color: '#FFD700' },
    { icon: Phone, title: 'Call Us', value: '+91 99999 99999', desc: 'Mon-Fri, 9:00 AM - 6:00 PM IST', href: 'tel:+919999999999', color: '#1E90FF' },
    { icon: MapPin, title: 'Visit Us', value: 'Hyderabad, India', desc: 'Telangana, India', href: '#', color: '#E6B800' },
    { icon: Clock, title: 'Business Hours', value: 'Mon - Fri', desc: '9:00 AM - 6:00 PM IST', href: '#', color: '#00BFFF' },
  ];

  const departments = [
    { icon: MessageCircle, title: 'General Inquiries', email: 'info@ynmdrishti.com', desc: 'Product information, demos, and general questions' },
    { icon: Building2, title: 'Business & Partnerships', email: 'partnerships@ynmdrishti.com', desc: 'Government, enterprise, and collaboration opportunities' },
    { icon: Globe2, title: 'International Relations', email: 'global@ynmdrishti.com', desc: 'International partnership and deployment inquiries' },
  ];

  const faqs = [
    { q: 'What is YNM Drishti?', a: 'YNM Drishti is an AI-powered road infrastructure intelligence platform that uses deep learning and computer vision to detect potholes, signages, barriers, lane markings, and 15+ other road elements with 99.8% accuracy.' },
    { q: 'How does your technology work?', a: 'Our proprietary AI models analyze road imagery from cameras (dashcams, mounted cameras, or drones) in real-time. The system detects and classifies road infrastructure elements, generates GPS-tagged reports, and provides actionable insights through a dashboard.' },
    { q: 'What kind of organizations do you work with?', a: 'We work with government highway authorities, municipal corporations, private infrastructure companies, construction firms, logistics enterprises, and research institutions across India and internationally.' },
    { q: 'Can your system work in different weather conditions?', a: 'Yes, our AI models are trained on diverse datasets covering various conditions including day, night, rain, fog, and different road surfaces. The system maintains high accuracy across these conditions.' },
    { q: 'How long does deployment take?', a: 'Depending on the scope, we can go from pilot to production deployment within 4-8 weeks. Our flexible architecture supports both cloud-based and edge computing setups for quick integration.' },
    { q: 'Do you offer pilot programs?', a: 'Yes, we offer pilot programs for government agencies and enterprises to evaluate our technology on a smaller scale before full deployment. Contact us to discuss pilot program options.' },
  ];

  const handleSubmit = (e) => { e.preventDefault(); setIsSubmitting(true); setTimeout(() => { setIsSubmitting(false); setSubmitted(true); }, 1500); };
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'transparent' }}>
      {/* ═══ HERO ═══ */}
      <section ref={heroRef} className="relative pt-32 pb-20 overflow-hidden">
        <FloatingOrb size="400px" color="rgba(255,215,0,0.2)" top="10%" left="70%" />
        <FloatingOrb size="300px" color="rgba(30,144,255,0.15)" top="50%" left="5%" delay={2} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div className="flex items-center gap-2 text-sm text-gray-400 mb-8"
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <Link to="/" className="hover:text-gold-400 transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-gold-400">Contact Us</span>
          </motion.div>

          <motion.div className="text-center max-w-3xl mx-auto" style={{ y: heroY }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-6"
                style={{ background: 'rgba(255,215,0,0.08)', border: '1px solid rgba(255,215,0,0.2)' }}>
                <MessageCircle size={16} className="text-gold-400" />
                <span className="text-gold-400 text-sm font-medium">Get in Touch</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                Let's{' '}
                <span style={{ background: 'linear-gradient(135deg, #FFD700, #1E90FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  Connect
                </span>
              </h1>
              <p className="text-lg text-gray-400 leading-relaxed">
                Have a question, want a demo, or ready to discuss how YNM Drishti can help?
                We'd love to hear from you.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══ CONTACT METHODS ═══ */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
            variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {contactMethods.map((m) => (
              <motion.div key={m.title} variants={fadeInUp}>
                <a href={m.href} className="block h-full p-6 rounded-2xl transition-all duration-300 hover:scale-[1.03] text-center"
                  style={{ background: 'linear-gradient(135deg, rgba(15,25,45,0.8) 0%, rgba(20,35,60,0.8) 100%)', border: '1px solid rgba(255,215,0,0.1)' }}>
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4"
                    style={{ background: `${m.color}15`, border: `1px solid ${m.color}30` }}>
                    <m.icon size={24} style={{ color: m.color }} />
                  </div>
                  <h3 className="text-white font-bold mb-1">{m.title}</h3>
                  <p className="font-medium mb-1" style={{ color: m.color }}>{m.value}</p>
                  <p className="text-gray-500 text-xs">{m.desc}</p>
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ FORM + DEPARTMENTS ═══ */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Form */}
            <motion.div className="lg:col-span-3"
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="rounded-3xl p-8 sm:p-10"
                style={{ background: 'linear-gradient(135deg, rgba(15,25,45,0.9) 0%, rgba(20,35,60,0.9) 100%)', border: '1px solid rgba(255,215,0,0.15)' }}>
                <h2 className="text-2xl font-bold text-white mb-2">Send Us a Message</h2>
                <p className="text-gray-400 text-sm mb-8">Fill in the form below and we'll get back to you within 24 hours.</p>

                {submitted ? (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                      style={{ background: 'rgba(34,197,94,0.2)', border: '2px solid rgba(34,197,94,0.3)' }}>
                      <CheckCircle2 size={40} className="text-green-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">Message Sent!</h3>
                    <p className="text-gray-400 text-sm">Thank you for reaching out. Our team will respond within 24 hours.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Full Name *</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Your name"
                          className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold-500/50 transition-all"
                          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="your@email.com"
                          className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold-500/50 transition-all"
                          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }} />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 ..."
                          className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold-500/50 transition-all"
                          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Subject *</label>
                        <select name="subject" value={formData.subject} onChange={handleChange} required
                          className="w-full px-4 py-3 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-gold-500/50 transition-all"
                          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                          <option value="" className="bg-navy-900">Select subject</option>
                          <option value="demo" className="bg-navy-900">Request a Demo</option>
                          <option value="pricing" className="bg-navy-900">Pricing Information</option>
                          <option value="partnership" className="bg-navy-900">Partnership Inquiry</option>
                          <option value="support" className="bg-navy-900">Technical Support</option>
                          <option value="other" className="bg-navy-900">Other</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Message *</label>
                      <textarea name="message" value={formData.message} onChange={handleChange} required rows={5}
                        placeholder="Tell us how we can help..."
                        className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold-500/50 resize-none transition-all"
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }} />
                    </div>
                    <button type="submit" disabled={isSubmitting}
                      className="w-full py-4 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-[1.02] disabled:opacity-70 flex items-center justify-center gap-2"
                      style={{ background: 'linear-gradient(135deg, #FFD700, #1E90FF)' }}>
                      {isSubmitting ? (<><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />Sending...</>) : (<>Send Message <Send size={18} /></>)}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.div className="lg:col-span-2 space-y-6"
              initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              {/* Department Contacts */}
              <div className="rounded-2xl p-6"
                style={{ background: 'linear-gradient(135deg, rgba(15,25,45,0.8) 0%, rgba(20,35,60,0.8) 100%)', border: '1px solid rgba(255,215,0,0.1)' }}>
                <h3 className="text-lg font-bold text-white mb-4">Department Contacts</h3>
                <div className="space-y-4">
                  {departments.map((d) => (
                    <div key={d.title} className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ background: 'rgba(255,215,0,0.1)', border: '1px solid rgba(255,215,0,0.2)' }}>
                        <d.icon size={16} className="text-gold-400" />
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm">{d.title}</p>
                        <p className="text-gold-400 text-xs">{d.email}</p>
                        <p className="text-gray-500 text-xs mt-0.5">{d.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Info */}
              <div className="rounded-2xl p-6"
                style={{ background: 'linear-gradient(135deg, rgba(255,215,0,0.04), rgba(30,144,255,0.04))', border: '1px solid rgba(255,215,0,0.1)' }}>
                <h3 className="text-lg font-bold text-white mb-3">Response Time</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  We typically respond within 24 hours during business days. For urgent inquiries, please call us directly.
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-green-400">Currently Available</span>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="rounded-2xl overflow-hidden aspect-[4/3]"
                style={{ background: 'linear-gradient(135deg, rgba(15,25,45,0.8) 0%, rgba(20,35,60,0.8) 100%)', border: '1px solid rgba(255,215,0,0.1)' }}>
                <div className="w-full h-full flex flex-col items-center justify-center text-center p-6">
                  <MapPin size={32} className="text-gold-400 mb-3" />
                  <p className="text-white font-medium">Hyderabad, Telangana</p>
                  <p className="text-gray-400 text-sm">India</p>
                  <p className="text-gray-500 text-xs mt-3">Interactive map coming soon</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(255,215,0,0.03) 0%, transparent 50%, rgba(30,144,255,0.03) 100%)' }} />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Frequently Asked{' '}
              <span style={{ background: 'linear-gradient(135deg, #FFD700, #1E90FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Questions
              </span>
            </h2>
            <p className="text-gray-400">Quick answers to common questions about YNM Drishti</p>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left p-5 rounded-xl transition-all duration-300"
                  style={{
                    background: openFaq === i
                      ? 'linear-gradient(135deg, rgba(255,215,0,0.06), rgba(30,144,255,0.06))'
                      : 'linear-gradient(135deg, rgba(15,25,45,0.7) 0%, rgba(20,35,60,0.7) 100%)',
                    border: openFaq === i ? '1px solid rgba(255,215,0,0.2)' : '1px solid rgba(255,215,0,0.08)'
                  }}>
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-white font-medium text-sm sm:text-base">{faq.q}</h3>
                    <ChevronDown size={18} className={`text-gold-400 flex-shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                  </div>
                  <motion.div
                    initial={false}
                    animate={{ height: openFaq === i ? 'auto' : 0, opacity: openFaq === i ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden">
                    <p className="text-gray-400 text-sm leading-relaxed mt-3 pt-3 border-t"
                      style={{ borderColor: 'rgba(255,215,0,0.1)' }}>
                      {faq.a}
                    </p>
                  </motion.div>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">Explore our solutions or learn more about our technology and how it can help your organization.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/solutions"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #FFD700, #1E90FF)' }}>
                Explore Solutions <ChevronRight size={18} />
              </Link>
              <Link to="/about"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                style={{ border: '1px solid rgba(255,215,0,0.3)', color: '#FFD700' }}>
                About Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
