import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ChevronRight, TrendingUp, BarChart3, PieChart, DollarSign,
  Target, Shield, Zap, Globe2, Users, Award, Rocket, Send,
  CheckCircle2, ArrowRight, Building2, LineChart, Briefcase
} from 'lucide-react';
import { Link } from 'react-router-dom';

const FloatingOrb = ({ size, color, top, left, delay = 0 }) => (
  <motion.div className="absolute rounded-full pointer-events-none"
    style={{ width: size, height: size, top, left, background: `radial-gradient(circle, ${color} 0%, transparent 70%)`, filter: 'blur(40px)' }}
    animate={{ y: [0, -20, 0], opacity: [0.15, 0.3, 0.15] }}
    transition={{ duration: 6, repeat: Infinity, delay, ease: 'easeInOut' }} />
);

const Investors = () => {
  const [formData, setFormData] = useState({ name: '', email: '', firm: '', type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  const fadeInUp = { hidden: { opacity: 0, y: 30, filter: 'blur(4px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)' } };
  const stagger = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.15 } } };

  const marketStats = [
    { number: '$2.5T', label: 'Global Road Infrastructure Market', icon: Globe2 },
    { number: '$45B', label: 'AI in Transportation (2028)', icon: TrendingUp },
    { number: '33M+', label: 'KM of Roads in India Alone', icon: Target },
    { number: '40%', label: 'Roads Need Urgent Maintenance', icon: BarChart3 },
  ];

  const traction = [
    { number: '10K+', label: 'KM Roads Analyzed' },
    { number: '99.8%', label: 'Detection Accuracy' },
    { number: '50+', label: 'Projects Delivered' },
    { number: '15+', label: 'Detection Categories' },
    { number: '5+', label: 'Countries Explored' },
    { number: '3x', label: 'Year-over-Year Growth' },
  ];

  const advantages = [
    { icon: Target, title: 'First-Mover Advantage', desc: 'Among the first AI companies in India to specialize exclusively in road infrastructure intelligence with proprietary datasets.' },
    { icon: Shield, title: 'Deep Technical Moat', desc: 'Proprietary deep learning models trained on 500K+ road images with detection capabilities that are hard to replicate.' },
    { icon: Zap, title: 'Capital Efficient', desc: 'Lean operations with strong unit economics. Software-first approach means high margins and low deployment costs.' },
    { icon: Globe2, title: 'Massive TAM', desc: 'India\'s $100B+ road network is just the start. The global road infrastructure AI market is projected to grow 25% CAGR.' },
    { icon: Users, title: 'Government Relationships', desc: 'Established relationships with state highway authorities and smart city initiatives — a significant barrier to entry.' },
    { icon: Rocket, title: 'International Potential', desc: 'Technology is region-agnostic and ready for deployment in Middle East, Africa, and Southeast Asian markets.' },
  ];

  const roadmap = [
    { phase: 'Phase 1', title: 'Market Leadership in India', timeline: '2024-2025', items: ['Scale to 50K+ KM coverage', 'Onboard 5+ state governments', 'Achieve operational profitability'] },
    { phase: 'Phase 2', title: 'International Expansion', timeline: '2025-2026', items: ['Enter 3+ international markets', 'Launch SaaS platform', 'Build channel partner network'] },
    { phase: 'Phase 3', title: 'Platform Play', timeline: '2026-2028', items: ['Full infrastructure intelligence platform', 'Predictive maintenance capabilities', 'Series A / strategic investment'] },
  ];

  const handleSubmit = (e) => { e.preventDefault(); setIsSubmitting(true); setTimeout(() => { setIsSubmitting(false); setSubmitted(true); }, 1500); };
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'transparent' }}>
      {/* ═══ HERO ═══ */}
      <section ref={heroRef} className="relative pt-32 pb-24 overflow-hidden">
        <FloatingOrb size="400px" color="rgba(255,215,0,0.2)" top="5%" left="75%" />
        <FloatingOrb size="350px" color="rgba(30,144,255,0.2)" top="60%" left="5%" delay={2} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div className="flex items-center gap-2 text-sm text-gray-400 mb-8"
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <Link to="/" className="hover:text-gold-400 transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-gold-400">Investor Relations</span>
          </motion.div>

          <motion.div className="max-w-4xl" style={{ y: heroY }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-6"
                style={{ background: 'rgba(255,215,0,0.08)', border: '1px solid rgba(255,215,0,0.2)' }}>
                <TrendingUp size={16} className="text-gold-400" />
                <span className="text-gold-400 text-sm font-medium">Investor Relations</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Powering the Future of{' '}
                <span style={{ background: 'linear-gradient(135deg, #FFD700, #1E90FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  Road Intelligence
                </span>
              </h1>
              <p className="text-lg text-gray-300 leading-relaxed mb-4">
                YNM Drishti is at the intersection of AI and infrastructure — two of the largest growth sectors globally.
                We're building the intelligence layer for road networks, starting with India and expanding worldwide.
              </p>
              <p className="text-gray-400 leading-relaxed mb-8">
                With proven technology, growing traction, and a massive addressable market, we're positioned
                to lead the transformation of infrastructure monitoring.
              </p>
              <a href="#investment-inquiry"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #FFD700, #1E90FF)' }}>
                Investment Inquiries <ArrowRight size={18} />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══ MARKET OPPORTUNITY ═══ */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              The{' '}
              <span style={{ background: 'linear-gradient(135deg, #FFD700, #1E90FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Opportunity
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">A massive, underserved market at the convergence of AI and infrastructure</p>
          </motion.div>

          <motion.div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {marketStats.map((s) => (
              <motion.div key={s.label} variants={fadeInUp} className="group">
                <div className="h-full p-6 rounded-2xl text-center transition-all duration-300 hover:scale-[1.03]"
                  style={{ background: 'linear-gradient(135deg, rgba(15,25,45,0.8) 0%, rgba(20,35,60,0.8) 100%)', border: '1px solid rgba(255,215,0,0.1)' }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
                    style={{ background: 'linear-gradient(135deg, rgba(255,215,0,0.15), rgba(30,144,255,0.15))', border: '1px solid rgba(255,215,0,0.2)' }}>
                    <s.icon size={24} className="text-gold-400" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold mb-2"
                    style={{ background: 'linear-gradient(135deg, #FFD700, #1E90FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    {s.number}
                  </div>
                  <p className="text-gray-400 text-sm">{s.label}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Problem Statement */}
          <motion.div className="mt-12 p-8 rounded-3xl"
            style={{ background: 'linear-gradient(135deg, rgba(255,215,0,0.04), rgba(30,144,255,0.04))', border: '1px solid rgba(255,215,0,0.1)' }}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">The Problem</h3>
                <p className="text-gray-300 leading-relaxed mb-3">
                  India spends over ₹2 lakh crore annually on road maintenance, yet most monitoring is still done manually —
                  slow, expensive, and inconsistent. Globally, the story is similar.
                </p>
                <p className="text-gray-400 leading-relaxed">
                  Governments and enterprises need real-time, accurate, and scalable solutions to monitor
                  millions of kilometers of road networks efficiently.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Our Solution</h3>
                <p className="text-gray-300 leading-relaxed mb-3">
                  YNM Drishti replaces manual inspections with AI that processes road imagery in real time,
                  detecting 15+ infrastructure issues with 99.8% accuracy at a fraction of the cost.
                </p>
                <p className="text-gray-400 leading-relaxed">
                  Our platform turns raw road data into actionable intelligence — enabling proactive
                  maintenance, budget optimization, and safer infrastructure.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ TRACTION ═══ */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(255,215,0,0.03) 0%, transparent 50%, rgba(30,144,255,0.03) 100%)' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Our{' '}
              <span style={{ background: 'linear-gradient(135deg, #FFD700, #1E90FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Traction
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Proven results that speak for themselves</p>
          </motion.div>

          <motion.div className="grid grid-cols-2 lg:grid-cols-3 gap-5"
            variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {traction.map((t) => (
              <motion.div key={t.label} variants={fadeInUp}
                className="text-center p-6 rounded-2xl transition-all duration-300 hover:scale-[1.03]"
                style={{ background: 'linear-gradient(135deg, rgba(15,25,45,0.6) 0%, rgba(20,35,60,0.6) 100%)', border: '1px solid rgba(255,215,0,0.08)' }}>
                <div className="text-3xl sm:text-4xl font-bold mb-1"
                  style={{ background: 'linear-gradient(135deg, #FFD700, #1E90FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  {t.number}
                </div>
                <p className="text-gray-400 text-sm">{t.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ COMPETITIVE ADVANTAGES ═══ */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Why{' '}
              <span style={{ background: 'linear-gradient(135deg, #FFD700, #1E90FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                YNM Drishti
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Strong competitive advantages that position us for category leadership</p>
          </motion.div>

          <motion.div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {advantages.map((a) => (
              <motion.div key={a.title} variants={fadeInUp} className="group">
                <div className="h-full p-6 rounded-2xl transition-all duration-300 hover:scale-[1.03]"
                  style={{ background: 'linear-gradient(135deg, rgba(15,25,45,0.8) 0%, rgba(20,35,60,0.8) 100%)', border: '1px solid rgba(255,215,0,0.08)' }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300"
                    style={{ background: 'linear-gradient(135deg, rgba(255,215,0,0.15), rgba(30,144,255,0.15))', border: '1px solid rgba(255,215,0,0.2)' }}>
                    <a.icon size={24} className="text-gold-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{a.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{a.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ GROWTH ROADMAP ═══ */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(30,144,255,0.03) 0%, transparent 50%, rgba(255,215,0,0.03) 100%)' }} />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Growth{' '}
              <span style={{ background: 'linear-gradient(135deg, #FFD700, #1E90FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Roadmap
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Our strategic path to market leadership</p>
          </motion.div>

          <div className="space-y-6">
            {roadmap.map((r, i) => (
              <motion.div key={r.phase}
                initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                className="group">
                <div className="p-6 sm:p-8 rounded-2xl transition-all duration-300 hover:scale-[1.01]"
                  style={{ background: 'linear-gradient(135deg, rgba(15,25,45,0.8) 0%, rgba(20,35,60,0.8) 100%)', border: '1px solid rgba(255,215,0,0.1)' }}>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full self-start"
                      style={{ background: 'linear-gradient(135deg, rgba(255,215,0,0.15), rgba(30,144,255,0.15))', border: '1px solid rgba(255,215,0,0.25)' }}>
                      <span className="text-gold-400 font-bold text-sm">{r.phase}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{r.title}</h3>
                      <p className="text-gray-500 text-sm">{r.timeline}</p>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-3 gap-3">
                    {r.items.map((item, j) => (
                      <div key={j} className="flex items-start gap-2">
                        <CheckCircle2 size={16} className="text-gold-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ INVESTMENT INQUIRY ═══ */}
      <section id="investment-inquiry" className="py-20 relative">
        <FloatingOrb size="300px" color="rgba(255,215,0,0.12)" top="10%" left="80%" delay={1} />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="rounded-3xl p-8 sm:p-12"
              style={{ background: 'linear-gradient(135deg, rgba(15,25,45,0.9) 0%, rgba(20,35,60,0.9) 100%)', border: '1px solid rgba(255,215,0,0.15)' }}>
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
                  style={{ background: 'rgba(255,215,0,0.1)', border: '1px solid rgba(255,215,0,0.2)' }}>
                  <LineChart size={16} className="text-gold-400" />
                  <span className="text-gold-400 text-sm font-medium">Investment Inquiry</span>
                </div>
                <h2 className="text-3xl font-bold text-white mb-3">Interested in Investing?</h2>
                <p className="text-gray-400 max-w-lg mx-auto text-sm">
                  For investment inquiries, pitch deck requests, or to schedule a meeting with our leadership team,
                  please share your details below.
                </p>
              </div>

              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                    style={{ background: 'rgba(34,197,94,0.2)', border: '2px solid rgba(34,197,94,0.3)' }}>
                    <CheckCircle2 size={40} className="text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">Inquiry Received</h3>
                  <p className="text-gray-400 max-w-md mx-auto text-sm">Thank you for your interest in YNM Drishti. Our team will review and respond within 3-5 business days.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Your Name *</label>
                      <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Full name"
                        className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold-500/50"
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="your@email.com"
                        className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold-500/50"
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }} />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Firm / Organization</label>
                      <input type="text" name="firm" value={formData.firm} onChange={handleChange} placeholder="Investment firm or company"
                        className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold-500/50"
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Inquiry Type</label>
                      <select name="type" value={formData.type} onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-gold-500/50"
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <option value="" className="bg-navy-900">Select type</option>
                        <option value="pitch-deck" className="bg-navy-900">Request Pitch Deck</option>
                        <option value="meeting" className="bg-navy-900">Schedule Meeting</option>
                        <option value="general" className="bg-navy-900">General Inquiry</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                    <textarea name="message" value={formData.message} onChange={handleChange} rows={3}
                      placeholder="Tell us about your investment interest..."
                      className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold-500/50 resize-none"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }} />
                  </div>
                  <button type="submit" disabled={isSubmitting}
                    className="w-full py-4 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-[1.02] disabled:opacity-70 flex items-center justify-center gap-2"
                    style={{ background: 'linear-gradient(135deg, #FFD700, #1E90FF)' }}>
                    {isSubmitting ? (<><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />Submitting...</>) : (<>Submit Inquiry <Send size={18} /></>)}
                  </button>
                  <p className="text-center text-gray-500 text-xs">Confidential. We respect your privacy and will only use this information for investor communications.</p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Join Us in Building the Future</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">Explore our technology, learn about our partnerships, or connect with our team.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/technology"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #FFD700, #1E90FF)' }}>
                Explore Technology <ChevronRight size={18} />
              </Link>
              <Link to="/partnerships"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                style={{ border: '1px solid rgba(255,215,0,0.3)', color: '#FFD700' }}>
                Partnership Opportunities
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Investors;
