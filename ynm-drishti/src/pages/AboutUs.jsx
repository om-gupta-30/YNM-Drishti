import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ChevronRight, Target, Eye, Heart, Zap, Users, Globe2, Award,
  Rocket, BarChart3, Shield, Brain, Cpu, MapPin, Building2, Lightbulb
} from 'lucide-react';
import { Link } from 'react-router-dom';

const FloatingOrb = ({ size, color, top, left, delay = 0 }) => (
  <motion.div className="absolute rounded-full pointer-events-none"
    style={{ width: size, height: size, top, left, background: `radial-gradient(circle, ${color} 0%, transparent 70%)`, filter: 'blur(40px)' }}
    animate={{ y: [0, -20, 0], opacity: [0.15, 0.3, 0.15] }}
    transition={{ duration: 6, repeat: Infinity, delay, ease: 'easeInOut' }} />
);

const AboutUs = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  const fadeInUp = { hidden: { opacity: 0, y: 30, filter: 'blur(4px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)' } };
  const stagger = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.15 } } };

  const timeline = [
    { year: '2019', title: 'The Spark', desc: 'YNM Drishti was founded with a simple but ambitious idea – use AI to make India\'s roads safer for everyone.', icon: Lightbulb, color: '#FFD700' },
    { year: '2020', title: 'R&D Phase', desc: 'Built our first deep learning models for pothole and road damage detection, training on thousands of road images.', icon: Brain, color: '#1E90FF' },
    { year: '2021', title: 'First Deployment', desc: 'Successfully deployed our AI system across 2,000+ km of national highways, proving real-world effectiveness.', icon: Rocket, color: '#FFD700' },
    { year: '2022', title: 'Product Expansion', desc: 'Expanded detection capabilities to 15+ road infrastructure elements including signages, barriers, and lane markings.', icon: Cpu, color: '#1E90FF' },
    { year: '2023', title: 'Recognition & Growth', desc: 'Won multiple industry awards, crossed 10,000 km of analyzed roads, and onboarded government and enterprise clients.', icon: Award, color: '#FFD700' },
    { year: '2024', title: 'Going Global', desc: 'Initiated international partnerships and began exploring markets across Asia, Middle East, and Africa.', icon: Globe2, color: '#1E90FF' },
  ];

  const values = [
    { icon: Target, title: 'Precision', desc: 'We pursue 99.8% accuracy not as a benchmark, but as a baseline. Every detection matters because every road matters.' },
    { icon: Shield, title: 'Reliability', desc: 'Infrastructure depends on trust. Our systems are built for 24/7 operation with enterprise-grade stability.' },
    { icon: Lightbulb, title: 'Innovation', desc: 'We stay ahead by investing in R&D, exploring edge computing, and pushing the limits of what AI can detect.' },
    { icon: Heart, title: 'Impact First', desc: 'Every feature we build is measured by its real-world impact on road safety and infrastructure quality.' },
    { icon: Users, title: 'Collaboration', desc: 'We believe the best solutions are built together — with clients, partners, researchers, and communities.' },
    { icon: Zap, title: 'Agility', desc: 'From pilot to production in weeks. We move fast, iterate quickly, and adapt to local needs.' },
  ];

  const capabilities = [
    { title: 'Pothole Detection', desc: 'AI identifies potholes of all sizes with precise GPS coordinates and severity classification.' },
    { title: 'Signage Recognition', desc: 'Detects and catalogs road signs, traffic signals, and directional markers automatically.' },
    { title: 'Barrier & Guardrail Analysis', desc: 'Monitors barrier conditions, identifies damage, and flags safety hazards in real time.' },
    { title: 'Lane Marking Assessment', desc: 'Evaluates lane marking visibility, fading, and compliance with road standards.' },
    { title: 'Surface Quality Scoring', desc: 'Provides comprehensive road surface quality ratings for maintenance prioritization.' },
    { title: 'Infrastructure Inventory', desc: 'Automatically catalogs all road infrastructure elements into a digital asset database.' },
  ];

  const stats = [
    { number: '10K+', label: 'KM Roads Monitored' },
    { number: '99.8%', label: 'Detection Accuracy' },
    { number: '15+', label: 'Detection Categories' },
    { number: '50+', label: 'Projects Delivered' },
    { number: '24/7', label: 'System Uptime' },
    { number: '<2s', label: 'Analysis Time' },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'transparent' }}>
      {/* ═══ HERO ═══ */}
      <section ref={heroRef} className="relative pt-32 pb-24 overflow-hidden">
        <FloatingOrb size="400px" color="rgba(255,215,0,0.2)" top="10%" left="5%" />
        <FloatingOrb size="350px" color="rgba(30,144,255,0.2)" top="50%" left="80%" delay={2} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div className="flex items-center gap-2 text-sm text-gray-400 mb-8"
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <Link to="/" className="hover:text-gold-400 transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-gold-400">About Us</span>
          </motion.div>

          <motion.div className="grid lg:grid-cols-2 gap-12 items-center" style={{ y: heroY }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-6"
                style={{ background: 'rgba(255,215,0,0.08)', border: '1px solid rgba(255,215,0,0.2)' }}>
                <Building2 size={16} className="text-gold-400" />
                <span className="text-gold-400 text-sm font-medium">About YNM Drishti</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Building{' '}
                <span style={{ background: 'linear-gradient(135deg, #FFD700, #1E90FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  Smarter Roads
                </span>
                <br />with AI
              </h1>
              <p className="text-lg text-gray-300 leading-relaxed mb-4">
                YNM Drishti is an AI-driven road infrastructure intelligence company based in Hyderabad, India.
                We build cutting-edge computer vision solutions that detect, analyze, and report road conditions
                with unprecedented accuracy.
              </p>
              <p className="text-gray-400 leading-relaxed mb-8">
                From potholes to signages, barriers to lane markings — our AI sees what the human eye
                might miss, enabling proactive maintenance and safer roads for everyone.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/leadership"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105"
                  style={{ background: 'linear-gradient(135deg, #FFD700, #1E90FF)' }}>
                  Meet Our Director <ChevronRight size={18} />
                </Link>
                <Link to="/solutions"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                  style={{ border: '1px solid rgba(255,215,0,0.3)', color: '#FFD700' }}>
                  Our Solutions
                </Link>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
              {stats.map((s, i) => (
                <motion.div key={s.label} className="p-5 rounded-2xl text-center"
                  style={{ background: 'linear-gradient(135deg, rgba(15,25,45,0.8) 0%, rgba(20,35,60,0.8) 100%)', border: '1px solid rgba(255,215,0,0.08)' }}
                  initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.08 }}>
                  <div className="text-2xl sm:text-3xl font-bold mb-1"
                    style={{ background: 'linear-gradient(135deg, #FFD700, #1E90FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    {s.number}
                  </div>
                  <p className="text-gray-400 text-xs sm:text-sm">{s.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══ MISSION & VISION ═══ */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="p-8 rounded-3xl transition-all duration-300 hover:scale-[1.02]"
              style={{ background: 'linear-gradient(135deg, rgba(255,215,0,0.05), rgba(15,25,45,0.8))', border: '1px solid rgba(255,215,0,0.15)' }}>
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                style={{ background: 'linear-gradient(135deg, rgba(255,215,0,0.2), rgba(30,144,255,0.2))', border: '1px solid rgba(255,215,0,0.3)' }}>
                <Target size={28} className="text-gold-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
              <p className="text-gray-300 leading-relaxed">
                To revolutionize road infrastructure monitoring by providing AI-powered solutions that are
                accurate, affordable, and accessible — enabling governments and enterprises to maintain
                safer roads and make data-driven infrastructure decisions.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="p-8 rounded-3xl transition-all duration-300 hover:scale-[1.02]"
              style={{ background: 'linear-gradient(135deg, rgba(30,144,255,0.05), rgba(15,25,45,0.8))', border: '1px solid rgba(30,144,255,0.15)' }}>
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                style={{ background: 'linear-gradient(135deg, rgba(30,144,255,0.2), rgba(255,215,0,0.2))', border: '1px solid rgba(30,144,255,0.3)' }}>
                <Eye size={28} className="text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
              <p className="text-gray-300 leading-relaxed">
                To become the global standard in AI-driven road intelligence — a world where every road is
                continuously monitored, every hazard is proactively addressed, and infrastructure decisions
                are powered by real-time data and intelligence.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ STORY TIMELINE ═══ */}
      <section className="py-20 relative overflow-hidden">
        <FloatingOrb size="300px" color="rgba(30,144,255,0.12)" top="30%" left="90%" delay={1} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(255,215,0,0.03) 0%, transparent 50%, rgba(30,144,255,0.03) 100%)' }} />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Our{' '}
              <span style={{ background: 'linear-gradient(135deg, #FFD700, #1E90FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Story
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">From a bold idea to India's leading road intelligence platform — here's how we got here</p>
          </motion.div>

          <div className="relative">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2"
              style={{ background: 'linear-gradient(180deg, rgba(255,215,0,0.3), rgba(30,144,255,0.3), rgba(255,215,0,0.3))' }} />
            <div className="space-y-8 md:space-y-0">
              {timeline.map((item, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <motion.div key={item.year}
                    className={`relative md:flex md:items-center ${isLeft ? '' : 'md:flex-row-reverse'} md:mb-12`}
                    initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.6, delay: i * 0.08 }}>
                    <div className={`md:w-[45%] ${isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                      <div className="p-6 rounded-2xl transition-all duration-300 hover:scale-[1.02]"
                        style={{ background: 'linear-gradient(135deg, rgba(15,25,45,0.8) 0%, rgba(20,35,60,0.8) 100%)', border: '1px solid rgba(255,215,0,0.1)' }}>
                        <div className={`flex items-center gap-3 mb-3 ${isLeft ? 'md:justify-end' : ''}`}>
                          <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                            style={{ background: `${item.color}20`, border: `1px solid ${item.color}40` }}>
                            <item.icon size={20} style={{ color: item.color }} />
                          </div>
                          <span style={{ color: item.color }} className="font-bold text-lg">{item.year}</span>
                        </div>
                        <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-5 h-5 rounded-full items-center justify-center z-10"
                      style={{ background: `linear-gradient(135deg, ${item.color}, ${i % 2 === 0 ? '#1E90FF' : '#FFD700'})`, boxShadow: `0 0 12px ${item.color}60` }}>
                      <div className="w-2 h-2 rounded-full bg-white" />
                    </div>
                    <div className="hidden md:block md:w-[45%]" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ WHAT WE DETECT ═══ */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              What We{' '}
              <span style={{ background: 'linear-gradient(135deg, #FFD700, #1E90FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Do
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Comprehensive AI-powered detection and analysis across 15+ road infrastructure categories</p>
          </motion.div>

          <motion.div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
            variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {capabilities.map((c, i) => (
              <motion.div key={c.title} variants={fadeInUp} className="group">
                <div className="h-full p-6 rounded-2xl transition-all duration-300 hover:scale-[1.03]"
                  style={{ background: 'linear-gradient(135deg, rgba(15,25,45,0.7) 0%, rgba(20,35,60,0.7) 100%)', border: '1px solid rgba(255,215,0,0.08)' }}>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                    style={{ background: 'linear-gradient(135deg, rgba(255,215,0,0.15), rgba(30,144,255,0.15))', border: '1px solid rgba(255,215,0,0.2)' }}>
                    <span className="text-gold-400 font-bold text-sm">0{i + 1}</span>
                  </div>
                  <h3 className="text-white font-bold mb-2">{c.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{c.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ VALUES ═══ */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(30,144,255,0.03) 0%, transparent 50%, rgba(255,215,0,0.03) 100%)' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Our{' '}
              <span style={{ background: 'linear-gradient(135deg, #FFD700, #1E90FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Values
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">The principles that guide everything we build, every decision we make</p>
          </motion.div>

          <motion.div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {values.map((v) => (
              <motion.div key={v.title} variants={fadeInUp} className="group">
                <div className="h-full p-7 rounded-2xl transition-all duration-500 hover:scale-[1.03]"
                  style={{ background: 'linear-gradient(135deg, rgba(15,25,45,0.8) 0%, rgba(20,35,60,0.8) 100%)', border: '1px solid rgba(255,215,0,0.08)' }}>
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300"
                    style={{ background: 'linear-gradient(135deg, rgba(255,215,0,0.15), rgba(30,144,255,0.15))', border: '1px solid rgba(255,215,0,0.2)' }}>
                    <v.icon size={26} className="text-gold-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{v.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ COMPANY INFO ═══ */}
      <section className="py-20 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="grid md:grid-cols-2 gap-8"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <div className="p-8 rounded-3xl"
              style={{ background: 'linear-gradient(135deg, rgba(15,25,45,0.8) 0%, rgba(20,35,60,0.8) 100%)', border: '1px solid rgba(255,215,0,0.1)' }}>
              <h3 className="text-2xl font-bold text-white mb-6">Company Details</h3>
              <div className="space-y-4">
                {[
                  { icon: Building2, label: 'Company', value: 'YNM Drishti Pvt. Ltd.' },
                  { icon: MapPin, label: 'Headquarters', value: 'Hyderabad, Telangana, India' },
                  { icon: Rocket, label: 'Founded', value: '2019' },
                  { icon: Users, label: 'Industry', value: 'AI / Infrastructure Tech' },
                  { icon: Globe2, label: 'Reach', value: 'India & International' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center"
                      style={{ background: 'rgba(255,215,0,0.1)', border: '1px solid rgba(255,215,0,0.2)' }}>
                      <item.icon size={16} className="text-gold-400" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs">{item.label}</p>
                      <p className="text-white text-sm font-medium">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 rounded-3xl"
              style={{ background: 'linear-gradient(135deg, rgba(15,25,45,0.8) 0%, rgba(20,35,60,0.8) 100%)', border: '1px solid rgba(255,215,0,0.1)' }}>
              <h3 className="text-2xl font-bold text-white mb-6">What Sets Us Apart</h3>
              <div className="space-y-4">
                {[
                  'Proprietary deep learning models trained on 500K+ Indian road images',
                  'Real-time detection under 2 seconds per frame',
                  '15+ infrastructure element categories',
                  'Works across diverse conditions — day, night, rain, fog',
                  'Cloud & edge deployment flexibility',
                  'Dedicated support and continuous model updates',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: 'linear-gradient(135deg, #FFD700, #1E90FF)' }}>
                      <span className="text-white text-[10px] font-bold">{i + 1}</span>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Want to Know More?</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">Explore our technology, meet our leadership, or get in touch to discuss how we can help.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #FFD700, #1E90FF)' }}>
                Contact Us <ChevronRight size={18} />
              </Link>
              <Link to="/technology"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                style={{ border: '1px solid rgba(255,215,0,0.3)', color: '#FFD700' }}>
                Explore Technology
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
