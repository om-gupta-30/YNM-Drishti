import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ChevronRight, Building2, Landmark, Truck, GraduationCap,
  Globe2, CheckCircle2, ArrowRight, Star, BarChart3,
  MapPin, Users, Award, Shield, Quote
} from 'lucide-react';
import { Link } from 'react-router-dom';

const FloatingOrb = ({ size, color, top, left, delay = 0 }) => (
  <motion.div className="absolute rounded-full pointer-events-none"
    style={{ width: size, height: size, top, left, background: `radial-gradient(circle, ${color} 0%, transparent 70%)`, filter: 'blur(40px)' }}
    animate={{ y: [0, -20, 0], opacity: [0.15, 0.3, 0.15] }}
    transition={{ duration: 6, repeat: Infinity, delay, ease: 'easeInOut' }} />
);

const Clients = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  const fadeInUp = { hidden: { opacity: 0, y: 30, filter: 'blur(4px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)' } };
  const stagger = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.15 } } };

  const industries = [
    { icon: Landmark, title: 'Government & Public Sector', desc: 'State highway authorities, NHAI, municipal corporations, and smart city initiatives using our AI for proactive road maintenance.', clients: '15+', color: '#FFD700' },
    { icon: Building2, title: 'Infrastructure & Construction', desc: 'Leading construction and infrastructure companies leveraging our platform for quality assessment and compliance monitoring.', clients: '10+', color: '#1E90FF' },
    { icon: Truck, title: 'Logistics & Transportation', desc: 'Fleet operators and logistics enterprises optimizing routes and reporting road conditions for safer, efficient operations.', clients: '8+', color: '#E6B800' },
    { icon: GraduationCap, title: 'Research & Academia', desc: 'Top universities and research institutions collaborating on next-generation AI models for infrastructure intelligence.', clients: '5+', color: '#00BFFF' },
  ];

  const caseStudies = [
    {
      title: 'State Highway Monitoring Program',
      client: 'Government Highway Authority',
      scope: '2,500+ KM of state highways',
      challenge: 'Manual inspection of thousands of kilometers was slow, inconsistent, and failed to detect hazards early enough for preventive action.',
      solution: 'Deployed YNM Drishti\'s AI system across the highway network with dashboard-based monitoring and automated report generation.',
      results: ['65% reduction in inspection time', '3x more defects identified per survey', 'Real-time hazard alerts for maintenance teams', 'Annual savings of ₹2.5 Cr in operational costs'],
    },
    {
      title: 'Smart City Road Intelligence',
      client: 'Municipal Corporation',
      scope: 'City road network — 500+ KM',
      challenge: 'The city needed a scalable way to monitor urban road conditions, prioritize maintenance, and report to citizens transparently.',
      solution: 'Integrated YNM Drishti with the city\'s GIS system, providing real-time road quality maps and automated work orders.',
      results: ['40% improvement in maintenance response time', 'Citizen-facing road quality dashboard', '15+ infrastructure element tracking', 'Data-driven budget allocation'],
    },
    {
      title: 'Fleet Route Optimization',
      client: 'National Logistics Company',
      scope: '10,000+ KM delivery routes',
      challenge: 'Poor road conditions were causing vehicle damage, delays, and increased maintenance costs across the delivery fleet.',
      solution: 'YNM Drishti analyzed frequently used routes, providing real-time road quality scores for route planning and optimization.',
      results: ['30% reduction in vehicle maintenance costs', 'Safer routes for drivers', 'Predictive road condition forecasting', 'Integrated with fleet management system'],
    },
  ];

  const testimonials = [
    { quote: 'YNM Drishti has transformed how we monitor our highway network. What used to take weeks now happens in real time.', author: 'Senior Engineer', org: 'State Highway Authority', rating: 5 },
    { quote: 'The accuracy and speed of detection is remarkable. It has become an essential tool in our infrastructure management.', author: 'Chief Technology Officer', org: 'Smart City Initiative', rating: 5 },
    { quote: 'Their technology has saved us significant costs in fleet maintenance by helping us avoid damaged road sections.', author: 'Operations Director', org: 'Logistics Enterprise', rating: 5 },
  ];

  const stats = [
    { number: '40+', label: 'Active Clients' },
    { number: '10K+', label: 'KM Monitored' },
    { number: '98%', label: 'Client Retention' },
    { number: '4.9/5', label: 'Satisfaction Score' },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'transparent' }}>
      {/* ═══ HERO ═══ */}
      <section ref={heroRef} className="relative pt-32 pb-24 overflow-hidden">
        <FloatingOrb size="400px" color="rgba(255,215,0,0.2)" top="5%" left="70%" />
        <FloatingOrb size="300px" color="rgba(30,144,255,0.18)" top="60%" left="5%" delay={2} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div className="flex items-center gap-2 text-sm text-gray-400 mb-8"
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <Link to="/" className="hover:text-gold-400 transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-gold-400">Clients</span>
          </motion.div>

          <motion.div className="grid lg:grid-cols-2 gap-12 items-center" style={{ y: heroY }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-6"
                style={{ background: 'rgba(255,215,0,0.08)', border: '1px solid rgba(255,215,0,0.2)' }}>
                <Users size={16} className="text-gold-400" />
                <span className="text-gold-400 text-sm font-medium">Trusted by Leaders</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Our{' '}
                <span style={{ background: 'linear-gradient(135deg, #FFD700, #1E90FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  Clients
                </span>
              </h1>
              <p className="text-lg text-gray-300 leading-relaxed mb-4">
                From government highway authorities to private enterprises, our AI-powered road intelligence
                is trusted by organizations that demand accuracy, reliability, and real impact.
              </p>
              <p className="text-gray-400 leading-relaxed mb-8">
                Every partnership is a testament to our commitment to making roads safer and infrastructure smarter.
              </p>
              <Link to="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #FFD700, #1E90FF)' }}>
                Become a Client <ArrowRight size={18} />
              </Link>
            </motion.div>

            <motion.div className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              {stats.map((s, i) => (
                <motion.div key={s.label} className="p-5 rounded-2xl text-center"
                  style={{ background: 'linear-gradient(135deg, rgba(15,25,45,0.8) 0%, rgba(20,35,60,0.8) 100%)', border: '1px solid rgba(255,215,0,0.08)' }}
                  initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.1 }}>
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

      {/* ═══ INDUSTRIES ═══ */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Industries We{' '}
              <span style={{ background: 'linear-gradient(135deg, #FFD700, #1E90FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Serve</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Our technology serves diverse sectors across the infrastructure ecosystem</p>
          </motion.div>

          <motion.div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {industries.map((ind) => (
              <motion.div key={ind.title} variants={fadeInUp} className="group">
                <div className="h-full p-6 rounded-2xl text-center transition-all duration-300 hover:scale-[1.03]"
                  style={{ background: 'linear-gradient(135deg, rgba(15,25,45,0.8) 0%, rgba(20,35,60,0.8) 100%)', border: '1px solid rgba(255,215,0,0.1)' }}>
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
                    style={{ background: `${ind.color}15`, border: `1px solid ${ind.color}30` }}>
                    <ind.icon size={26} style={{ color: ind.color }} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{ind.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-3">{ind.desc}</p>
                  <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium"
                    style={{ background: `${ind.color}15`, color: ind.color, border: `1px solid ${ind.color}30` }}>
                    {ind.clients} Clients
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ CASE STUDIES ═══ */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(255,215,0,0.03) 0%, transparent 50%, rgba(30,144,255,0.03) 100%)' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Case{' '}
              <span style={{ background: 'linear-gradient(135deg, #FFD700, #1E90FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Studies</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Real-world impact across diverse deployment scenarios</p>
          </motion.div>

          <div className="space-y-8">
            {caseStudies.map((cs, i) => (
              <motion.div key={cs.title}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="rounded-3xl p-8 sm:p-10"
                  style={{ background: 'linear-gradient(135deg, rgba(15,25,45,0.85) 0%, rgba(20,35,60,0.85) 100%)', border: '1px solid rgba(255,215,0,0.12)' }}>
                  <div className="flex flex-wrap items-center gap-3 mb-5">
                    <h3 className="text-xl sm:text-2xl font-bold text-white">{cs.title}</h3>
                    <span className="px-3 py-1 rounded-full text-xs font-medium"
                      style={{ background: 'rgba(255,215,0,0.1)', color: '#FFD700', border: '1px solid rgba(255,215,0,0.2)' }}>
                      {cs.client}
                    </span>
                  </div>
                  <p className="text-gold-400 text-sm mb-6">Scope: {cs.scope}</p>

                  <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div>
                      <h4 className="text-white font-semibold mb-2 text-sm flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-400" /> Challenge
                      </h4>
                      <p className="text-gray-400 text-sm leading-relaxed">{cs.challenge}</p>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-2 text-sm flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400" /> Solution
                      </h4>
                      <p className="text-gray-400 text-sm leading-relaxed">{cs.solution}</p>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-2 text-sm flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-400" /> Results
                      </h4>
                      <div className="space-y-2">
                        {cs.results.map((r, j) => (
                          <div key={j} className="flex items-start gap-2 text-sm">
                            <CheckCircle2 size={14} className="text-green-400 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">{r}</span>
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

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              What Clients{' '}
              <span style={{ background: 'linear-gradient(135deg, #FFD700, #1E90FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Say</span>
            </h2>
          </motion.div>

          <motion.div className="grid md:grid-cols-3 gap-6"
            variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {testimonials.map((t, i) => (
              <motion.div key={i} variants={fadeInUp} className="group">
                <div className="h-full p-7 rounded-2xl transition-all duration-300 hover:scale-[1.02]"
                  style={{ background: 'linear-gradient(135deg, rgba(15,25,45,0.8) 0%, rgba(20,35,60,0.8) 100%)', border: '1px solid rgba(255,215,0,0.1)' }}>
                  <Quote size={24} className="text-gold-500/20 mb-4" />
                  <div className="flex gap-1 mb-4">
                    {[...Array(t.rating)].map((_, j) => (
                      <Star key={j} size={14} className="text-gold-400 fill-gold-400" />
                    ))}
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed mb-5 italic">"{t.quote}"</p>
                  <div className="pt-4 border-t" style={{ borderColor: 'rgba(255,215,0,0.1)' }}>
                    <p className="text-white font-medium text-sm">{t.author}</p>
                    <p className="text-gray-500 text-xs">{t.org}</p>
                  </div>
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
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Ready to Join Our Clients?</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">Discover how YNM Drishti can transform infrastructure monitoring for your organization.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #FFD700, #1E90FF)' }}>
                Contact Us <ChevronRight size={18} />
              </Link>
              <Link to="/solutions"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                style={{ border: '1px solid rgba(255,215,0,0.3)', color: '#FFD700' }}>
                Explore Solutions
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Clients;
