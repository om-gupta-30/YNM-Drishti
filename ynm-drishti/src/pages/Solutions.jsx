import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ChevronRight, ArrowRight, Landmark, Building2, Truck, GraduationCap,
  CheckCircle2, Camera, MapPin, BarChart3, FileText, Settings,
  Monitor, Layers, Database, CloudCog, Smartphone, Shield, Zap, Globe2
} from 'lucide-react';
import { Link } from 'react-router-dom';

const FloatingOrb = ({ size, color, top, left, delay = 0 }) => (
  <motion.div className="absolute rounded-full pointer-events-none"
    style={{ width: size, height: size, top, left, background: `radial-gradient(circle, ${color} 0%, transparent 70%)`, filter: 'blur(40px)' }}
    animate={{ y: [0, -20, 0], opacity: [0.15, 0.3, 0.15] }}
    transition={{ duration: 6, repeat: Infinity, delay, ease: 'easeInOut' }} />
);

const Solutions = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  const fadeInUp = { hidden: { opacity: 0, y: 30, filter: 'blur(4px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)' } };
  const stagger = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.15 } } };

  const useCases = [
    {
      icon: Landmark, title: 'Government & Highway Authorities',
      desc: 'Comprehensive road condition monitoring for national and state highway networks, enabling data-driven maintenance planning and budget optimization.',
      features: ['Automated road condition surveys', 'GPS-tagged defect reporting', 'Priority-based maintenance scheduling', 'Compliance and audit-ready reports', 'Real-time dashboards for officials'],
      color: '#FFD700'
    },
    {
      icon: Building2, title: 'Smart City Initiatives',
      desc: 'Urban road intelligence for municipalities — monitor city road networks, track infrastructure health, and enable citizen-facing transparency.',
      features: ['City-wide road quality mapping', 'Citizen-facing dashboard integration', 'Automated work order generation', 'Historical trend analysis', 'GIS system integration'],
      color: '#1E90FF'
    },
    {
      icon: Truck, title: 'Logistics & Fleet Management',
      desc: 'Route intelligence for fleet operators — avoid damaged roads, reduce vehicle wear, and optimize delivery routes based on real road conditions.',
      features: ['Real-time route quality scoring', 'Predictive road condition alerts', 'Fleet management system integration', 'Vehicle damage reduction insights', 'Cost optimization analytics'],
      color: '#E6B800'
    },
    {
      icon: GraduationCap, title: 'Research & Development',
      desc: 'Collaborative research programs with institutions to advance AI for infrastructure, develop new detection models, and publish joint research.',
      features: ['Annotated road condition datasets', 'Model co-development programs', 'Joint research publications', 'Internship and fellowship support', 'Academic licensing options'],
      color: '#00BFFF'
    },
  ];

  const process = [
    { step: '01', icon: Camera, title: 'Data Capture', desc: 'Road imagery is captured via dashcams, mounted cameras, or drones. Works with standard hardware.' },
    { step: '02', icon: Layers, title: 'AI Processing', desc: 'Our deep learning models analyze every frame, detecting and classifying 15+ infrastructure elements.' },
    { step: '03', icon: MapPin, title: 'GPS Tagging', desc: 'Each detection is geo-tagged with precise GPS coordinates for accurate field-level mapping.' },
    { step: '04', icon: BarChart3, title: 'Analytics Dashboard', desc: 'Results are visualized on an intuitive dashboard with filters, maps, trends, and exportable reports.' },
    { step: '05', icon: FileText, title: 'Reports & Alerts', desc: 'Automated reports are generated with severity classifications and priority recommendations.' },
    { step: '06', icon: Settings, title: 'Action & Monitoring', desc: 'Insights drive maintenance workflows with continuous monitoring and improvement tracking.' },
  ];

  const features = [
    { icon: Monitor, title: 'Real-Time Dashboard', desc: 'Interactive maps and analytics with live road condition data, heatmaps, and trend tracking.' },
    { icon: Database, title: 'Data Management', desc: 'Centralized infrastructure database with full history, versioning, and search capabilities.' },
    { icon: CloudCog, title: 'Cloud & Edge', desc: 'Flexible deployment — cloud-based for scale, edge computing for real-time field processing.' },
    { icon: Smartphone, title: 'Mobile Ready', desc: 'Field teams access data and submit reports via mobile — works online and offline.' },
    { icon: Shield, title: 'Enterprise Security', desc: 'End-to-end encryption, role-based access, audit logs, and government compliance standards.' },
    { icon: Globe2, title: 'API & Integrations', desc: 'Open REST APIs and SDKs for seamless integration with GIS, ERP, and fleet management systems.' },
  ];

  const detections = [
    'Potholes', 'Road Cracks', 'Speed Breakers', 'Traffic Signs', 'Directional Signs',
    'Road Barriers', 'Guardrails', 'Lane Markings', 'Road Edges', 'Manhole Covers',
    'Road Patches', 'Surface Quality', 'Drainage Issues', 'Median Strips', 'Milestones'
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
            <span className="text-gold-400">Solutions</span>
          </motion.div>

          <motion.div className="max-w-4xl" style={{ y: heroY }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-6"
                style={{ background: 'rgba(255,215,0,0.08)', border: '1px solid rgba(255,215,0,0.2)' }}>
                <Layers size={16} className="text-gold-400" />
                <span className="text-gold-400 text-sm font-medium">Solutions & Use Cases</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                AI-Powered{' '}
                <span style={{ background: 'linear-gradient(135deg, #FFD700, #1E90FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  Road Intelligence
                </span>
                <br />for Every Need
              </h1>
              <p className="text-lg text-gray-300 leading-relaxed mb-4">
                From highway monitoring to fleet optimization, our AI platform adapts to your specific
                infrastructure challenges with precision and scale.
              </p>
              <p className="text-gray-400 leading-relaxed mb-8">
                Explore our solutions tailored for governments, enterprises, logistics companies, and research institutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105"
                  style={{ background: 'linear-gradient(135deg, #FFD700, #1E90FF)' }}>
                  Request a Demo <ArrowRight size={18} />
                </Link>
                <a href="#how-it-works"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                  style={{ border: '1px solid rgba(255,215,0,0.3)', color: '#FFD700' }}>
                  How It Works
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══ USE CASES ═══ */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Solutions for{' '}
              <span style={{ background: 'linear-gradient(135deg, #FFD700, #1E90FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Every Sector</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Tailored approaches for your specific infrastructure challenges</p>
          </motion.div>

          <div className="space-y-8">
            {useCases.map((uc, i) => (
              <motion.div key={uc.title}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="rounded-3xl p-8 sm:p-10 transition-all duration-300 hover:scale-[1.01]"
                  style={{ background: 'linear-gradient(135deg, rgba(15,25,45,0.85) 0%, rgba(20,35,60,0.85) 100%)', border: `1px solid ${uc.color}20` }}>
                  <div className="grid md:grid-cols-5 gap-8 items-start">
                    <div className="md:col-span-3">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-14 h-14 rounded-xl flex items-center justify-center"
                          style={{ background: `${uc.color}15`, border: `1px solid ${uc.color}30` }}>
                          <uc.icon size={28} style={{ color: uc.color }} />
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-white">{uc.title}</h3>
                      </div>
                      <p className="text-gray-300 leading-relaxed">{uc.desc}</p>
                    </div>
                    <div className="md:col-span-2">
                      <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Key Features</h4>
                      <div className="space-y-2">
                        {uc.features.map((f, j) => (
                          <div key={j} className="flex items-center gap-2 text-sm">
                            <CheckCircle2 size={14} style={{ color: uc.color }} className="flex-shrink-0" />
                            <span className="text-gray-300">{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section id="how-it-works" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(255,215,0,0.03) 0%, transparent 50%, rgba(30,144,255,0.03) 100%)' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              How It{' '}
              <span style={{ background: 'linear-gradient(135deg, #FFD700, #1E90FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Works</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">From data capture to actionable insights in six steps</p>
          </motion.div>

          <motion.div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {process.map((p) => (
              <motion.div key={p.step} variants={fadeInUp} className="group relative">
                <div className="h-full p-6 rounded-2xl transition-all duration-300 hover:scale-[1.03]"
                  style={{ background: 'linear-gradient(135deg, rgba(15,25,45,0.8) 0%, rgba(20,35,60,0.8) 100%)', border: '1px solid rgba(255,215,0,0.1)' }}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                      style={{ background: 'linear-gradient(135deg, rgba(255,215,0,0.15), rgba(30,144,255,0.15))', border: '1px solid rgba(255,215,0,0.2)' }}>
                      <p.icon size={22} className="text-gold-400" />
                    </div>
                    <span className="text-3xl font-bold opacity-15"
                      style={{ background: 'linear-gradient(135deg, #FFD700, #1E90FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                      {p.step}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{p.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ DETECTION CAPABILITIES ═══ */}
      <section className="py-20 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              What We{' '}
              <span style={{ background: 'linear-gradient(135deg, #FFD700, #1E90FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Detect</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">15+ road infrastructure categories with 99.8% accuracy</p>
          </motion.div>

          <motion.div className="flex flex-wrap justify-center gap-3"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            {detections.map((d, i) => (
              <motion.div key={d}
                initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                className="px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105"
                style={{ background: 'linear-gradient(135deg, rgba(15,25,45,0.8) 0%, rgba(20,35,60,0.8) 100%)', border: '1px solid rgba(255,215,0,0.15)', color: i % 2 === 0 ? '#FFD700' : '#1E90FF' }}>
                {d}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ PLATFORM FEATURES ═══ */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(30,144,255,0.03) 0%, transparent 50%, rgba(255,215,0,0.03) 100%)' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Platform{' '}
              <span style={{ background: 'linear-gradient(135deg, #FFD700, #1E90FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Features</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">A complete infrastructure intelligence platform built for scale</p>
          </motion.div>

          <motion.div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {features.map((f) => (
              <motion.div key={f.title} variants={fadeInUp} className="group">
                <div className="h-full p-6 rounded-2xl transition-all duration-300 hover:scale-[1.03]"
                  style={{ background: 'linear-gradient(135deg, rgba(15,25,45,0.7) 0%, rgba(20,35,60,0.7) 100%)', border: '1px solid rgba(255,215,0,0.08)' }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300"
                    style={{ background: 'linear-gradient(135deg, rgba(255,215,0,0.15), rgba(30,144,255,0.15))', border: '1px solid rgba(255,215,0,0.2)' }}>
                    <f.icon size={22} className="text-gold-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Ready to See It in Action?</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">Schedule a demo to see how our AI-powered platform can transform infrastructure monitoring for your organization.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #FFD700, #1E90FF)' }}>
                Request a Demo <ChevronRight size={18} />
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

export default Solutions;
