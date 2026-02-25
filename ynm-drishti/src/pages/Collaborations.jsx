import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ChevronRight, Globe2, Building2, Landmark, Handshake, CheckCircle2,
  ArrowRight, MapPin, Users, Target, Shield, Zap, Award, Send,
  FileCheck, MessageCircle, Rocket, BarChart3, Network
} from 'lucide-react';
import { Link } from 'react-router-dom';

/* ── Floating Orb ── */
const FloatingOrb = ({ size, color, top, left, delay = 0 }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{ width: size, height: size, top, left, background: `radial-gradient(circle, ${color} 0%, transparent 70%)`, filter: 'blur(40px)' }}
    animate={{ y: [0, -20, 0], opacity: [0.15, 0.3, 0.15] }}
    transition={{ duration: 6, repeat: Infinity, delay, ease: 'easeInOut' }}
  />
);

/* ── Pulsing Dot ── */
const PulsingDot = ({ top, left, color, delay = 0, size = 10 }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{ width: size, height: size, top, left, background: color, boxShadow: `0 0 12px ${color}` }}
    animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
    transition={{ duration: 2.5, repeat: Infinity, delay }}
  />
);

const Collaborations = () => {
  const [formData, setFormData] = useState({ organizationType: '', organizationName: '', country: '', contactName: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  const fadeInUp = { hidden: { opacity: 0, y: 30, filter: 'blur(4px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)' } };
  const stagger = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.15 } } };

  const sectors = [
    { icon: Landmark, title: 'Government Bodies', description: 'National and state highway authorities, municipal corporations, and public works departments seeking to modernize infrastructure monitoring with AI.', benefits: ['Large-scale road network coverage', 'Data-driven policy making', 'Cost-effective maintenance planning', 'Real-time condition reporting'] },
    { icon: Building2, title: 'Enterprise & Corporations', description: 'Private infrastructure companies, construction firms, and logistics enterprises looking for intelligent road assessment solutions.', benefits: ['Fleet route optimization', 'Asset condition monitoring', 'Predictive maintenance insights', 'Compliance documentation'] },
    { icon: Globe2, title: 'International Organizations', description: 'Development agencies, multilateral institutions, and international bodies focused on infrastructure development in emerging markets.', benefits: ['Scalable deployment models', 'Multi-region implementation', 'Impact measurement frameworks', 'Sustainable development goals'] },
    { icon: Users, title: 'Research Institutions', description: 'Universities, research centers, and think tanks exploring AI applications in civil infrastructure and smart city development.', benefits: ['Joint research initiatives', 'Technology co-development', 'Knowledge exchange programs', 'Access to real-world datasets'] }
  ];

  const process = [
    { step: '01', icon: MessageCircle, title: 'Initial Discussion', desc: 'We begin with a comprehensive discussion to understand your infrastructure challenges, goals, and regional requirements.' },
    { step: '02', icon: FileCheck, title: 'Feasibility Assessment', desc: 'Our technical team evaluates the scope and prepares a tailored proposal with timelines, deliverables, and success metrics.' },
    { step: '03', icon: Handshake, title: 'Partnership Agreement', desc: 'We formalize the collaboration with clear terms, responsibilities, and a roadmap aligned with your objectives.' },
    { step: '04', icon: Rocket, title: 'Deployment & Support', desc: 'From pilot programs to full-scale deployment, we provide end-to-end support with continuous optimization.' }
  ];

  const whyPartner = [
    { icon: Target, title: 'Proven Technology', description: '99.8% detection accuracy with models trained on 500K+ road images across diverse conditions and geographies.' },
    { icon: Zap, title: 'Rapid Deployment', description: 'Go from pilot to production in weeks, not months. Minimal infrastructure requirements with cloud and edge options.' },
    { icon: Shield, title: 'Reliable & Secure', description: 'Enterprise-grade security with data sovereignty compliance, GDPR readiness, and government-approved protocols.' },
    { icon: Award, title: 'Continuous Innovation', description: 'Regular model updates, new detection capabilities, and feature enhancements based on partner feedback.' },
    { icon: BarChart3, title: 'Measurable Impact', description: 'Comprehensive dashboards and reporting tools that quantify ROI and demonstrate infrastructure improvements.' },
    { icon: Network, title: 'Flexible Integration', description: 'Open APIs and SDKs that seamlessly connect with your existing GIS, ERP, and fleet management systems.' }
  ];

  const models = [
    { title: 'Technology Licensing', description: 'License our AI models and integrate them into your existing platforms and workflows. Full SDK access with technical support.', ideal: 'Technology companies & System integrators', highlight: false },
    { title: 'Joint Ventures', description: 'Collaborate on region-specific deployments with shared investment, co-branding, and mutually beneficial returns.', ideal: 'Infrastructure companies & Regional players', highlight: true },
    { title: 'Government Programs', description: 'Tailored solutions for national road monitoring, smart city initiatives, and public infrastructure management.', ideal: 'Government bodies & Public agencies', highlight: false },
    { title: 'Research Collaboration', description: 'Co-develop next-generation AI solutions through joint research programs, data sharing, and published outcomes.', ideal: 'Universities & Research institutions', highlight: false }
  ];

  const stats = [
    { number: '5+', label: 'Countries Explored' },
    { number: '15+', label: 'Pilot Programs' },
    { number: '10K+', label: 'KM Analyzed' },
    { number: '50+', label: 'Partner Discussions' },
  ];

  const regions = [
    { name: 'South Asia', status: 'Active', color: '#FFD700' },
    { name: 'Middle East', status: 'Expanding', color: '#1E90FF' },
    { name: 'Southeast Asia', status: 'Exploring', color: '#E6B800' },
    { name: 'Africa', status: 'Exploring', color: '#00BFFF' },
    { name: 'South America', status: 'Planned', color: '#FFC857' },
  ];

  const handleSubmit = (e) => { e.preventDefault(); setIsSubmitting(true); setTimeout(() => { setIsSubmitting(false); setSubmitted(true); }, 1500); };
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'transparent' }}>
      {/* ═══ HERO ═══ */}
      <section ref={heroRef} className="relative pt-32 pb-24 overflow-hidden">
        <FloatingOrb size="450px" color="rgba(255,215,0,0.2)" top="5%" left="70%" />
        <FloatingOrb size="350px" color="rgba(30,144,255,0.2)" top="60%" left="5%" delay={2} />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,215,0,0.5) 1px, transparent 0)', backgroundSize: '50px 50px' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div className="flex items-center gap-2 text-sm text-gray-400 mb-8"
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <Link to="/" className="hover:text-gold-400 transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-gold-400">Global Partnerships</span>
          </motion.div>

          <motion.div className="grid lg:grid-cols-2 gap-12 items-center" style={{ y: heroY }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-6"
                style={{ background: 'rgba(255,215,0,0.08)', border: '1px solid rgba(255,215,0,0.2)' }}>
                <Globe2 size={16} className="text-gold-400" />
                <span className="text-gold-400 text-sm font-medium">Expanding Horizons Together</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Global{' '}
                <span style={{ background: 'linear-gradient(135deg, #FFD700, #1E90FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  Partnerships
                </span>
              </h1>
              <p className="text-lg text-gray-300 mb-4 leading-relaxed">
                We collaborate with governments, enterprises, and innovation leaders worldwide to bring
                AI-powered road intelligence to infrastructure networks across the globe.
              </p>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Our technology adapts to diverse road conditions, regulatory frameworks, and operational
                requirements — making it ideal for both emerging markets and developed economies.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#partnership-inquiry"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105"
                  style={{ background: 'linear-gradient(135deg, #FFD700, #1E90FF)' }}>
                  Explore Partnership <ArrowRight size={18} />
                </a>
                <a href="#how-it-works"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                  style={{ border: '1px solid rgba(255,215,0,0.3)', color: '#FFD700' }}>
                  How It Works
                </a>
              </div>
            </motion.div>

            {/* Stats + Globe Graphic */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
              {/* Globe Visualization */}
              <div className="relative aspect-square max-w-md mx-auto mb-6">
                <div className="absolute inset-0 rounded-full"
                  style={{ border: '1px solid rgba(255,215,0,0.08)' }} />
                <div className="absolute inset-[15%] rounded-full"
                  style={{ border: '1px solid rgba(30,144,255,0.08)' }} />
                <div className="absolute inset-[30%] rounded-full"
                  style={{ border: '1px solid rgba(255,215,0,0.06)' }} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div className="w-20 h-20 rounded-full flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, rgba(255,215,0,0.2), rgba(30,144,255,0.2))', border: '2px solid rgba(255,215,0,0.3)' }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}>
                    <Globe2 size={36} className="text-gold-400" />
                  </motion.div>
                </div>
                <PulsingDot top="10%" left="55%" color="#FFD700" delay={0} />
                <PulsingDot top="25%" left="82%" color="#1E90FF" delay={0.5} />
                <PulsingDot top="65%" left="85%" color="#E6B800" delay={1} />
                <PulsingDot top="82%" left="45%" color="#00BFFF" delay={1.5} />
                <PulsingDot top="70%" left="15%" color="#FFD700" delay={2} />
                <PulsingDot top="30%" left="12%" color="#1E90FF" delay={2.5} />
                <PulsingDot top="48%" left="92%" color="#FFC857" delay={3} size={8} />
              </div>
              {/* Stats row below globe */}
              <div className="grid grid-cols-2 gap-3">
                {stats.map((s, i) => (
                  <motion.div key={s.label} className="p-4 rounded-xl text-center"
                    style={{ background: 'linear-gradient(135deg, rgba(15,25,45,0.8) 0%, rgba(20,35,60,0.8) 100%)', border: '1px solid rgba(255,215,0,0.08)' }}
                    initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.1 }}>
                    <div className="text-2xl font-bold"
                      style={{ background: 'linear-gradient(135deg, #FFD700, #1E90FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                      {s.number}
                    </div>
                    <p className="text-gray-400 text-xs mt-1">{s.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══ SECTORS ═══ */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Partnership{' '}
              <span style={{ background: 'linear-gradient(135deg, #FFD700, #1E90FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Sectors</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">We work with diverse stakeholders who share our vision of smarter, safer infrastructure</p>
          </motion.div>

          <motion.div className="grid md:grid-cols-2 gap-6"
            variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {sectors.map((s) => (
              <motion.div key={s.title} variants={fadeInUp} className="group">
                <div className="h-full p-7 rounded-2xl transition-all duration-500 hover:scale-[1.02]"
                  style={{ background: 'linear-gradient(135deg, rgba(15,25,45,0.8) 0%, rgba(20,35,60,0.8) 100%)', border: '1px solid rgba(255,215,0,0.1)' }}>
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                      style={{ background: 'linear-gradient(135deg, rgba(255,215,0,0.15), rgba(30,144,255,0.15))', border: '1px solid rgba(255,215,0,0.2)' }}>
                      <s.icon size={26} className="text-gold-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">{s.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed mb-4">{s.description}</p>
                      <div className="grid grid-cols-2 gap-2">
                        {s.benefits.map((b, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm">
                            <CheckCircle2 size={13} className="text-gold-500 flex-shrink-0" />
                            <span className="text-gray-300">{b}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section id="how-it-works" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(255,215,0,0.03) 0%, transparent 50%, rgba(30,144,255,0.03) 100%)' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              How Partnership{' '}
              <span style={{ background: 'linear-gradient(135deg, #FFD700, #1E90FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Works</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">A structured approach from initial conversation to successful deployment</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((p, i) => (
              <motion.div key={p.step}
                initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.12 }}
                className="relative group">
                <div className="h-full p-6 rounded-2xl text-center transition-all duration-300 hover:scale-[1.03]"
                  style={{ background: 'linear-gradient(135deg, rgba(15,25,45,0.8) 0%, rgba(20,35,60,0.8) 100%)', border: '1px solid rgba(255,215,0,0.1)' }}>
                  <div className="text-5xl font-bold opacity-15 mb-3"
                    style={{ background: 'linear-gradient(135deg, #FFD700, #1E90FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    {p.step}
                  </div>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
                    style={{ background: 'linear-gradient(135deg, rgba(255,215,0,0.15), rgba(30,144,255,0.15))', border: '1px solid rgba(255,215,0,0.2)' }}>
                    <p.icon size={22} className="text-gold-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{p.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{p.desc}</p>
                </div>
                {/* Connector arrow */}
                {i < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 text-gold-500/30 z-10">
                    <ArrowRight size={20} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WHY PARTNER ═══ */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Why Partner with{' '}
              <span style={{ background: 'linear-gradient(135deg, #FFD700, #1E90FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>YNM Drishti</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Leverage our expertise and technology to transform road infrastructure in your region</p>
          </motion.div>

          <motion.div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {whyPartner.map((w) => (
              <motion.div key={w.title} variants={fadeInUp} className="group">
                <div className="h-full p-6 rounded-2xl text-center transition-all duration-300 hover:scale-[1.03]"
                  style={{ background: 'linear-gradient(135deg, rgba(15,25,45,0.6) 0%, rgba(20,35,60,0.6) 100%)', border: '1px solid rgba(255,215,0,0.08)' }}>
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300"
                    style={{ background: 'linear-gradient(135deg, rgba(255,215,0,0.15), rgba(30,144,255,0.15))', border: '1px solid rgba(255,215,0,0.2)' }}>
                    <w.icon size={26} className="text-gold-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{w.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{w.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ PARTNERSHIP MODELS ═══ */}
      <section id="partnership-models" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(30,144,255,0.03) 0%, transparent 50%, rgba(255,215,0,0.03) 100%)' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Partnership{' '}
              <span style={{ background: 'linear-gradient(135deg, #FFD700, #1E90FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Models</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Flexible engagement models tailored to your organization's needs</p>
          </motion.div>

          <motion.div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {models.map((m, i) => (
              <motion.div key={m.title} variants={fadeInUp} className="group relative">
                <div className={`h-full p-6 rounded-2xl transition-all duration-300 hover:scale-[1.03] flex flex-col ${m.highlight ? '' : ''}`}
                  style={{
                    background: m.highlight
                      ? 'linear-gradient(135deg, rgba(255,215,0,0.08) 0%, rgba(30,144,255,0.08) 100%)'
                      : 'linear-gradient(135deg, rgba(15,25,45,0.8) 0%, rgba(20,35,60,0.8) 100%)',
                    border: m.highlight ? '1px solid rgba(255,215,0,0.25)' : '1px solid rgba(255,215,0,0.1)'
                  }}>
                  {m.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-semibold text-white"
                      style={{ background: 'linear-gradient(135deg, #FFD700, #1E90FF)' }}>
                      Most Popular
                    </div>
                  )}
                  <div className="text-4xl font-bold opacity-15 mb-3"
                    style={{ background: 'linear-gradient(135deg, #FFD700, #1E90FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    0{i + 1}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{m.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1">{m.description}</p>
                  <div className="pt-4 border-t" style={{ borderColor: 'rgba(255,215,0,0.1)' }}>
                    <p className="text-xs text-gray-500 mb-1">Ideal for:</p>
                    <p className="text-sm text-gold-400">{m.ideal}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ GLOBAL REACH ═══ */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="grid lg:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Expanding Our{' '}
                <span style={{ background: 'linear-gradient(135deg, #FFD700, #1E90FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  Global Footprint
                </span>
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                While our roots are in India, our vision is global. We're actively engaging with partners
                across Asia, the Middle East, Africa, and beyond — regions where road infrastructure
                development is a critical national priority.
              </p>
              <p className="text-gray-400 leading-relaxed mb-8">
                Our technology is designed to adapt to local road conditions, regulatory frameworks,
                and operational requirements while maintaining world-class detection accuracy.
              </p>

              {/* Region Status */}
              <div className="space-y-3">
                {regions.map((r) => (
                  <div key={r.name} className="flex items-center justify-between p-3 rounded-xl"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div className="flex items-center gap-3">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: r.color, boxShadow: `0 0 8px ${r.color}60` }} />
                      <span className="text-white text-sm font-medium">{r.name}</span>
                    </div>
                    <span className="text-xs px-3 py-1 rounded-full" style={{ background: `${r.color}15`, color: r.color, border: `1px solid ${r.color}30` }}>
                      {r.status}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="p-8 rounded-3xl space-y-6"
                style={{ background: 'linear-gradient(135deg, rgba(15,25,45,0.8) 0%, rgba(20,35,60,0.8) 100%)', border: '1px solid rgba(255,215,0,0.1)' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: 'rgba(255,215,0,0.15)', border: '1px solid rgba(255,215,0,0.2)' }}>
                    <MapPin size={18} className="text-gold-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Headquarters</p>
                    <p className="text-gray-400 text-sm">Hyderabad, India</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: 'rgba(30,144,255,0.15)', border: '1px solid rgba(30,144,255,0.2)' }}>
                    <Globe2 size={18} className="text-blue-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Target Regions</p>
                    <p className="text-gray-400 text-sm">Asia, Middle East, Africa, South America</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: 'rgba(255,215,0,0.15)', border: '1px solid rgba(255,215,0,0.2)' }}>
                    <Users size={18} className="text-gold-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Partnership Team</p>
                    <p className="text-gray-400 text-sm">Dedicated international relations desk</p>
                  </div>
                </div>
                <div className="pt-4 border-t" style={{ borderColor: 'rgba(255,215,0,0.1)' }}>
                  <p className="text-gray-400 text-sm leading-relaxed italic">
                    "We don't just deploy technology — we build lasting relationships with partners
                    who share our commitment to infrastructure excellence."
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══ INQUIRY FORM ═══ */}
      <section id="partnership-inquiry" className="py-20 relative">
        <FloatingOrb size="300px" color="rgba(255,215,0,0.12)" top="5%" left="5%" delay={1} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="rounded-3xl p-8 sm:p-12"
              style={{ background: 'linear-gradient(135deg, rgba(15,25,45,0.9) 0%, rgba(20,35,60,0.9) 100%)', border: '1px solid rgba(255,215,0,0.15)' }}>
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
                  style={{ background: 'rgba(255,215,0,0.1)', border: '1px solid rgba(255,215,0,0.2)' }}>
                  <Handshake size={16} className="text-gold-400" />
                  <span className="text-gold-400 text-sm font-medium">Start the Conversation</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Partnership Inquiry</h2>
                <p className="text-gray-400 max-w-xl mx-auto">
                  Interested in exploring a partnership? Share your details and our team will discuss collaboration opportunities.
                </p>
              </div>

              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                    style={{ background: 'rgba(34,197,94,0.2)', border: '2px solid rgba(34,197,94,0.3)' }}>
                    <CheckCircle2 size={40} className="text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">Inquiry Received</h3>
                  <p className="text-gray-400 max-w-md mx-auto">Thank you for your interest. Our partnerships team will review your inquiry and respond within 3-5 business days.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Organization Type *</label>
                      <select name="organizationType" value={formData.organizationType} onChange={handleChange} required
                        className="w-full px-4 py-3 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-gold-500/50"
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <option value="" className="bg-navy-900">Select type</option>
                        <option value="government" className="bg-navy-900">Government Body</option>
                        <option value="enterprise" className="bg-navy-900">Enterprise / Corporation</option>
                        <option value="international" className="bg-navy-900">International Organization</option>
                        <option value="research" className="bg-navy-900">Research Institution</option>
                        <option value="other" className="bg-navy-900">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Organization Name *</label>
                      <input type="text" name="organizationName" value={formData.organizationName} onChange={handleChange} required placeholder="Enter organization name"
                        className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold-500/50"
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }} />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Country / Region *</label>
                      <input type="text" name="country" value={formData.country} onChange={handleChange} required placeholder="Enter country or region"
                        className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold-500/50"
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Contact Person *</label>
                      <input type="text" name="contactName" value={formData.contactName} onChange={handleChange} required placeholder="Your full name"
                        className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold-500/50"
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Business Email *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="your.email@organization.com"
                      className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold-500/50"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Partnership Interest</label>
                    <textarea name="message" value={formData.message} onChange={handleChange} rows={4}
                      placeholder="Tell us about your organization and how you envision a potential partnership..."
                      className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold-500/50 resize-none"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }} />
                  </div>
                  <button type="submit" disabled={isSubmitting}
                    className="w-full py-4 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-[1.02] disabled:opacity-70 flex items-center justify-center gap-2"
                    style={{ background: 'linear-gradient(135deg, #FFD700, #1E90FF)' }}>
                    {isSubmitting ? (<><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />Submitting...</>) : (<>Submit Inquiry <Send size={18} /></>)}
                  </button>
                  <p className="text-center text-gray-500 text-xs">By submitting, you agree to our privacy policy. We'll only use your information to respond to your inquiry.</p>
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
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Let's Build Smarter Roads Together</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">Whether you're a government authority, enterprise, or research institution, we're ready to explore how our technology can address your infrastructure challenges.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #FFD700, #1E90FF)' }}>
                Contact Our Team <ChevronRight size={18} />
              </Link>
              <Link to="/technology" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                style={{ border: '1px solid rgba(255,215,0,0.3)', color: '#FFD700' }}>
                Explore Our Technology
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Collaborations;
