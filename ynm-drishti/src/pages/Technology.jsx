import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ChevronRight, Brain, Cpu, Eye, Layers, Database, CloudCog,
  Camera, BarChart3, Zap, Shield, ArrowRight, Server,
  Wifi, Gauge, GitBranch, Microscope, Workflow, RefreshCw
} from 'lucide-react';
import { Link } from 'react-router-dom';

const FloatingOrb = ({ size, color, top, left, delay = 0 }) => (
  <motion.div className="absolute rounded-full pointer-events-none"
    style={{ width: size, height: size, top, left, background: `radial-gradient(circle, ${color} 0%, transparent 70%)`, filter: 'blur(40px)' }}
    animate={{ y: [0, -20, 0], opacity: [0.15, 0.3, 0.15] }}
    transition={{ duration: 6, repeat: Infinity, delay, ease: 'easeInOut' }} />
);

const Technology = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  const fadeInUp = { hidden: { opacity: 0, y: 30, filter: 'blur(4px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)' } };
  const stagger = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.15 } } };

  const coreTech = [
    { icon: Brain, title: 'Deep Learning', desc: 'Custom convolutional neural networks (CNNs) trained on 500K+ road images for detecting and classifying road infrastructure elements with exceptional accuracy.', highlight: true },
    { icon: Eye, title: 'Computer Vision', desc: 'Advanced image processing pipelines that handle diverse lighting, weather conditions, camera angles, and road surface types for robust real-world performance.' },
    { icon: Layers, title: 'Multi-Model Architecture', desc: 'Ensemble of specialized models working in parallel — each optimized for specific detection categories for maximum accuracy and speed.' },
    { icon: Cpu, title: 'Edge Computing', desc: 'Lightweight models optimized for on-device inference, enabling real-time processing at the edge without internet dependency.' },
    { icon: CloudCog, title: 'Cloud Platform', desc: 'Scalable cloud infrastructure for heavy batch processing, model training, dashboard hosting, and centralized data management.' },
    { icon: Database, title: 'Data Pipeline', desc: 'Automated pipelines for data ingestion, annotation, model retraining, and quality assurance — ensuring continuous improvement.' },
  ];

  const pipeline = [
    { icon: Camera, title: 'Image Capture', desc: 'Road imagery captured via dashcams, mounted cameras, or drones at standard resolution.', detail: 'Supports 720p to 4K input' },
    { icon: Layers, title: 'Pre-Processing', desc: 'Image normalization, distortion correction, and quality enhancement for optimal model input.', detail: 'Handles blur, glare, rain' },
    { icon: Brain, title: 'AI Inference', desc: 'Multiple deep learning models analyze each frame in parallel for comprehensive detection.', detail: '<2s processing per frame' },
    { icon: GitBranch, title: 'Classification', desc: 'Detected elements are classified into 15+ categories with severity scoring and confidence levels.', detail: '99.8% accuracy' },
    { icon: BarChart3, title: 'Analytics', desc: 'Results aggregated into dashboards, heatmaps, trend analysis, and priority rankings.', detail: 'Real-time updates' },
    { icon: Workflow, title: 'Integration', desc: 'Output delivered via APIs, dashboards, reports, and integrated into client systems.', detail: 'REST API & Webhooks' },
  ];

  const specs = [
    { label: 'Detection Accuracy', value: '99.8%', icon: Gauge },
    { label: 'Processing Speed', value: '<2 sec', icon: Zap },
    { label: 'Detection Categories', value: '15+', icon: Layers },
    { label: 'Training Dataset', value: '500K+', icon: Database },
    { label: 'Uptime', value: '99.9%', icon: Server },
    { label: 'API Latency', value: '<200ms', icon: Wifi },
  ];

  const architecture = [
    { layer: 'Data Layer', items: ['Image Storage (S3)', 'Time-Series DB', 'GIS Database', 'Model Registry'], color: '#FFD700' },
    { layer: 'Processing Layer', items: ['GPU Inference Cluster', 'Batch Processing', 'Stream Processing', 'Model Training'], color: '#1E90FF' },
    { layer: 'Application Layer', items: ['REST API Gateway', 'Web Dashboard', 'Mobile App', 'Report Engine'], color: '#E6B800' },
    { layer: 'Integration Layer', items: ['GIS Integration', 'ERP Connectors', 'Fleet Management', 'Custom Webhooks'], color: '#00BFFF' },
  ];

  const rnd = [
    { icon: Microscope, title: 'Continuous Model Improvement', desc: 'Regular retraining cycles with new data to improve detection accuracy and add new categories. Our models get smarter with every deployment.' },
    { icon: RefreshCw, title: 'Active Learning Pipeline', desc: 'Automated identification of edge cases and difficult samples for targeted retraining, ensuring performance on rare and challenging scenarios.' },
    { icon: Cpu, title: 'Edge AI Optimization', desc: 'Ongoing research into model compression, quantization, and optimization for faster inference on resource-constrained edge devices.' },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'transparent' }}>
      {/* ═══ HERO ═══ */}
      <section ref={heroRef} className="relative pt-32 pb-24 overflow-hidden">
        <FloatingOrb size="400px" color="rgba(255,215,0,0.2)" top="5%" left="75%" />
        <FloatingOrb size="350px" color="rgba(30,144,255,0.2)" top="55%" left="5%" delay={2} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div className="flex items-center gap-2 text-sm text-gray-400 mb-8"
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <Link to="/" className="hover:text-gold-400 transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-gold-400">Technology</span>
          </motion.div>

          <motion.div className="max-w-4xl" style={{ y: heroY }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-6"
                style={{ background: 'rgba(255,215,0,0.08)', border: '1px solid rgba(255,215,0,0.2)' }}>
                <Brain size={16} className="text-gold-400" />
                <span className="text-gold-400 text-sm font-medium">Our Technology</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                The AI Behind{' '}
                <span style={{ background: 'linear-gradient(135deg, #FFD700, #1E90FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  YNM Drishti
                </span>
              </h1>
              <p className="text-lg text-gray-300 leading-relaxed mb-4">
                Proprietary deep learning and computer vision technology built from the ground up for
                road infrastructure intelligence. Trained on 500K+ images, deployed across 10,000+ KM.
              </p>
              <p className="text-gray-400 leading-relaxed mb-8">
                Discover the technology stack, architecture, and AI pipeline that powers India's
                leading road condition monitoring platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/solutions"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105"
                  style={{ background: 'linear-gradient(135deg, #FFD700, #1E90FF)' }}>
                  See Solutions <ArrowRight size={18} />
                </Link>
                <Link to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                  style={{ border: '1px solid rgba(255,215,0,0.3)', color: '#FFD700' }}>
                  Request Technical Demo
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══ CORE TECHNOLOGIES ═══ */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Core{' '}
              <span style={{ background: 'linear-gradient(135deg, #FFD700, #1E90FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Technologies</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">The foundational technologies that power our road intelligence platform</p>
          </motion.div>

          <motion.div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {coreTech.map((t) => (
              <motion.div key={t.title} variants={fadeInUp} className="group">
                <div className={`h-full p-7 rounded-2xl transition-all duration-300 hover:scale-[1.03]`}
                  style={{
                    background: t.highlight
                      ? 'linear-gradient(135deg, rgba(255,215,0,0.06), rgba(30,144,255,0.06))'
                      : 'linear-gradient(135deg, rgba(15,25,45,0.8) 0%, rgba(20,35,60,0.8) 100%)',
                    border: t.highlight ? '1px solid rgba(255,215,0,0.2)' : '1px solid rgba(255,215,0,0.08)'
                  }}>
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300"
                    style={{ background: 'linear-gradient(135deg, rgba(255,215,0,0.15), rgba(30,144,255,0.15))', border: '1px solid rgba(255,215,0,0.2)' }}>
                    <t.icon size={28} className="text-gold-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{t.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{t.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ TECHNICAL SPECS ═══ */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(255,215,0,0.03) 0%, transparent 50%, rgba(30,144,255,0.03) 100%)' }} />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Technical{' '}
              <span style={{ background: 'linear-gradient(135deg, #FFD700, #1E90FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Performance</span>
            </h2>
          </motion.div>

          <motion.div className="grid grid-cols-2 lg:grid-cols-3 gap-5"
            variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {specs.map((s) => (
              <motion.div key={s.label} variants={fadeInUp}
                className="p-6 rounded-2xl text-center transition-all duration-300 hover:scale-[1.03]"
                style={{ background: 'linear-gradient(135deg, rgba(15,25,45,0.7) 0%, rgba(20,35,60,0.7) 100%)', border: '1px solid rgba(255,215,0,0.1)' }}>
                <s.icon size={24} className="text-gold-400 mx-auto mb-3" />
                <div className="text-2xl sm:text-3xl font-bold mb-1"
                  style={{ background: 'linear-gradient(135deg, #FFD700, #1E90FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  {s.value}
                </div>
                <p className="text-gray-400 text-sm">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ AI PIPELINE ═══ */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              AI{' '}
              <span style={{ background: 'linear-gradient(135deg, #FFD700, #1E90FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Pipeline</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">End-to-end processing flow from raw imagery to actionable intelligence</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pipeline.map((p, i) => (
              <motion.div key={p.title}
                initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="group relative">
                <div className="h-full p-6 rounded-2xl transition-all duration-300 hover:scale-[1.03]"
                  style={{ background: 'linear-gradient(135deg, rgba(15,25,45,0.8) 0%, rgba(20,35,60,0.8) 100%)', border: '1px solid rgba(255,215,0,0.1)' }}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                      style={{ background: 'linear-gradient(135deg, rgba(255,215,0,0.15), rgba(30,144,255,0.15))', border: '1px solid rgba(255,215,0,0.2)' }}>
                      <p.icon size={22} className="text-gold-400" />
                    </div>
                    <span className="text-xs px-3 py-1 rounded-full"
                      style={{ background: 'rgba(255,215,0,0.1)', color: '#FFD700', border: '1px solid rgba(255,215,0,0.2)' }}>
                      Step {i + 1}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{p.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-3">{p.desc}</p>
                  <div className="pt-3 border-t" style={{ borderColor: 'rgba(255,215,0,0.1)' }}>
                    <p className="text-xs text-gray-500">{p.detail}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ARCHITECTURE ═══ */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(30,144,255,0.03) 0%, transparent 50%, rgba(255,215,0,0.03) 100%)' }} />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              System{' '}
              <span style={{ background: 'linear-gradient(135deg, #FFD700, #1E90FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Architecture</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Multi-layered architecture built for scalability and reliability</p>
          </motion.div>

          <div className="space-y-4">
            {architecture.map((layer, i) => (
              <motion.div key={layer.layer}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}>
                <div className="p-6 rounded-2xl"
                  style={{ background: 'linear-gradient(135deg, rgba(15,25,45,0.8) 0%, rgba(20,35,60,0.8) 100%)', border: `1px solid ${layer.color}20` }}>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="sm:w-48 flex-shrink-0">
                      <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold"
                        style={{ background: `${layer.color}15`, color: layer.color, border: `1px solid ${layer.color}30` }}>
                        {layer.layer}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 flex-1">
                      {layer.items.map((item) => (
                        <span key={item} className="px-3 py-1.5 rounded-lg text-xs text-gray-300"
                          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ R&D ═══ */}
      <section className="py-20 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Research &{' '}
              <span style={{ background: 'linear-gradient(135deg, #FFD700, #1E90FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Innovation</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Continuous investment in making our AI smarter, faster, and more capable</p>
          </motion.div>

          <motion.div className="space-y-6"
            variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {rnd.map((r) => (
              <motion.div key={r.title} variants={fadeInUp}>
                <div className="p-7 rounded-2xl flex items-start gap-5 transition-all duration-300 hover:scale-[1.01]"
                  style={{ background: 'linear-gradient(135deg, rgba(15,25,45,0.8) 0%, rgba(20,35,60,0.8) 100%)', border: '1px solid rgba(255,215,0,0.1)' }}>
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, rgba(255,215,0,0.15), rgba(30,144,255,0.15))', border: '1px solid rgba(255,215,0,0.2)' }}>
                    <r.icon size={26} className="text-gold-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{r.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{r.desc}</p>
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
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">See Our Technology in Action</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">Want a technical deep-dive or a live demo? Our engineering team would love to show you what we've built.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #FFD700, #1E90FF)' }}>
                Request Technical Demo <ChevronRight size={18} />
              </Link>
              <Link to="/solutions"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                style={{ border: '1px solid rgba(255,215,0,0.3)', color: '#FFD700' }}>
                View Solutions
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Technology;
