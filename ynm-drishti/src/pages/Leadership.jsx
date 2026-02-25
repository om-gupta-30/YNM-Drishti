import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import {
  Award, Target, Lightbulb, Users, GraduationCap, Briefcase, Quote,
  ChevronRight, Rocket, Globe2, Brain, BarChart3, Shield, Cpu,
  BookOpen, Mic, TrendingUp, Star
} from 'lucide-react';
import { Link } from 'react-router-dom';

/* ── Animated Counter ── */
const AnimatedCounter = ({ value, suffix = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <span ref={ref}>
      {isInView ? (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {value}{suffix}
        </motion.span>
      ) : '0'}
    </span>
  );
};

/* ── Floating Orb ── */
const FloatingOrb = ({ size, color, top, left, delay = 0 }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{
      width: size, height: size, top, left,
      background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
      filter: 'blur(40px)',
    }}
    animate={{ y: [0, -20, 0], opacity: [0.15, 0.3, 0.15] }}
    transition={{ duration: 6, repeat: Infinity, delay, ease: 'easeInOut' }}
  />
);

const Leadership = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroParallaxY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 30, filter: 'blur(4px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)' }
  };
  const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.15 } }
  };

  const journey = [
    { year: '2010', title: 'Engineering Foundation', desc: 'Graduated with a degree in Computer Science & Engineering, laying the groundwork for a career in technology.', icon: GraduationCap },
    { year: '2012', title: 'Industry Experience', desc: 'Joined leading infrastructure companies, gaining deep insights into India\'s road network challenges.', icon: Briefcase },
    { year: '2016', title: 'AI & Research', desc: 'Pivoted into AI and machine learning research, publishing papers on computer vision for infrastructure.', icon: Brain },
    { year: '2019', title: 'YNM Drishti Founded', desc: 'Founded YNM Drishti with a mission to revolutionize road infrastructure monitoring using AI.', icon: Rocket },
    { year: '2021', title: 'First Major Deployment', desc: 'Successfully deployed AI road monitoring across 2,000+ km of national highways.', icon: TrendingUp },
    { year: '2024', title: 'Global Expansion', desc: 'Began exploring international partnerships and expanding technology to new markets.', icon: Globe2 },
  ];

  const expertise = [
    { name: 'Artificial Intelligence & Deep Learning', level: 95, icon: Brain },
    { name: 'Computer Vision & Image Processing', level: 92, icon: Cpu },
    { name: 'Infrastructure & Road Engineering', level: 88, icon: BarChart3 },
    { name: 'Business Strategy & Leadership', level: 90, icon: TrendingUp },
    { name: 'Research & Innovation', level: 93, icon: BookOpen },
  ];

  const values = [
    { icon: Target, title: 'Vision', description: 'To make every road in India safe and well-maintained through intelligent AI-powered infrastructure monitoring that saves lives and resources.' },
    { icon: Lightbulb, title: 'Innovation', description: 'Continuously pushing the boundaries of what\'s possible with deep learning and computer vision, turning research breakthroughs into real-world solutions.' },
    { icon: Users, title: 'Impact', description: 'Creating technology that directly translates into safer roads, better infrastructure, and improved quality of life for millions of people.' },
    { icon: Shield, title: 'Integrity', description: 'Building trust through transparency, delivering on promises, and maintaining the highest standards of ethical AI development and deployment.' },
  ];

  const achievements = [
    { number: '15+', label: 'Years of Experience' },
    { number: '50+', label: 'Projects Delivered' },
    { number: '10K+', label: 'KM Roads Analyzed' },
    { number: '99.8%', label: 'Detection Accuracy' },
    { number: '3', label: 'Patents Filed' },
    { number: '12+', label: 'Research Papers' },
  ];

  const recognitions = [
    { title: 'AI Innovation Award', org: 'National Technology Council', year: '2023' },
    { title: 'Best Infrastructure Startup', org: 'Smart India Initiative', year: '2022' },
    { title: 'Top 50 AI Leaders', org: 'Tech Leadership Forum', year: '2024' },
    { title: 'Outstanding Research Contribution', org: 'IEEE Conference', year: '2021' },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'transparent' }}>
      {/* ═══ HERO ═══ */}
      <section ref={heroRef} className="relative pt-32 pb-24 overflow-hidden">
        <FloatingOrb size="400px" color="rgba(255,215,0,0.25)" top="5%" left="5%" />
        <FloatingOrb size="350px" color="rgba(30,144,255,0.2)" top="60%" left="75%" delay={2} />
        <FloatingOrb size="250px" color="rgba(255,215,0,0.15)" top="80%" left="30%" delay={4} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="flex items-center gap-2 text-sm text-gray-400 mb-8"
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
          >
            <Link to="/" className="hover:text-gold-400 transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-gold-400">Leadership</span>
          </motion.div>

          <motion.div className="text-center mb-16" style={{ y: heroParallaxY }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-6"
                style={{ background: 'rgba(255,215,0,0.08)', border: '1px solid rgba(255,215,0,0.2)' }}>
                <Award size={16} className="text-gold-400" />
                <span className="text-gold-400 text-sm font-medium">Visionary Leadership</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                Meet Our{' '}
                <span style={{ background: 'linear-gradient(135deg, #FFD700, #1E90FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  Director
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                Driven by an unwavering passion for technology and a deep commitment to India's infrastructure,
                our founder is leading the charge in AI-powered road intelligence.
              </p>
            </motion.div>
          </motion.div>

          {/* ── Director Profile ── */}
          <motion.div
            className="relative max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="relative rounded-3xl p-[1px] overflow-hidden"
              style={{ background: 'linear-gradient(135deg, rgba(255,215,0,0.35), rgba(30,144,255,0.35), rgba(255,215,0,0.35))' }}>
              <div className="rounded-3xl p-8 sm:p-12 lg:p-14"
                style={{ background: 'linear-gradient(135deg, rgba(10,22,40,0.98) 0%, rgba(15,30,55,0.98) 100%)', backdropFilter: 'blur(20px)' }}>
                <div className="grid lg:grid-cols-5 gap-10 items-center">
                  {/* Photo */}
                  <div className="lg:col-span-2 flex justify-center">
                    <div className="relative">
                      <motion.div
                        className="absolute inset-0 rounded-full blur-2xl opacity-40"
                        style={{ background: 'linear-gradient(135deg, #FFD700, #1E90FF)', transform: 'scale(1.15)' }}
                        animate={{ scale: [1.12, 1.18, 1.12] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                      />
                      <div className="relative w-52 h-52 sm:w-60 sm:h-60 lg:w-64 lg:h-64 rounded-full p-[3px]"
                        style={{ background: 'linear-gradient(135deg, #FFD700, #1E90FF)' }}>
                        <div className="w-full h-full rounded-full flex items-center justify-center"
                          style={{ background: 'linear-gradient(135deg, rgba(20,35,60,1) 0%, rgba(30,50,80,1) 100%)' }}>
                          <div className="text-center">
                            <div className="w-24 h-24 mx-auto mb-3 rounded-full flex items-center justify-center"
                              style={{ background: 'linear-gradient(135deg, rgba(255,215,0,0.2), rgba(30,144,255,0.2))' }}>
                              <Users size={44} className="text-gold-400" />
                            </div>
                            <p className="text-xs text-gray-500">Photo Coming Soon</p>
                          </div>
                        </div>
                      </div>
                      <motion.div className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center"
                        style={{ background: 'linear-gradient(135deg, #FFD700, #E6B800)' }}
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}>
                        <Star size={14} className="text-white" />
                      </motion.div>
                      <div className="absolute -bottom-1 -left-1 w-5 h-5 rounded-full"
                        style={{ background: 'linear-gradient(135deg, #1E90FF, #00BFFF)' }} />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="lg:col-span-3 text-center lg:text-left">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4"
                      style={{ background: 'rgba(255,215,0,0.1)', border: '1px solid rgba(255,215,0,0.2)' }}>
                      <Award size={14} className="text-gold-400" />
                      <span className="text-gold-400 text-sm font-medium">Founder & Director</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">[Director Name]</h2>
                    <p className="text-gold-400 text-lg mb-5">Founder & Managing Director, YNM Drishti</p>

                    <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-5">
                      <div className="flex items-center gap-2 text-gray-400">
                        <GraduationCap size={16} className="text-gold-500" />
                        <span className="text-sm">[Degree / University]</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <Briefcase size={16} className="text-blue-400" />
                        <span className="text-sm">15+ Years Experience</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <BookOpen size={16} className="text-gold-500" />
                        <span className="text-sm">12+ Research Papers</span>
                      </div>
                    </div>

                    <p className="text-gray-300 leading-relaxed mb-5">
                      A visionary leader in AI and computer vision, [Director Name] founded YNM Drishti with a mission
                      to transform road infrastructure monitoring across India and beyond. With over 15 years of
                      experience spanning technology, research, and infrastructure development, they have pioneered
                      innovative solutions that are making roads safer for millions of citizens every day.
                    </p>
                    <p className="text-gray-400 leading-relaxed">
                      Their work has been recognized nationally and internationally, with contributions to
                      IEEE journals, keynote addresses at industry summits, and advisory roles with government
                      smart city initiatives.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ DIRECTOR QUOTE ═══ */}
      <section className="py-16 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative p-8 sm:p-10 rounded-3xl text-center"
              style={{ background: 'linear-gradient(135deg, rgba(255,215,0,0.04), rgba(30,144,255,0.04))', border: '1px solid rgba(255,215,0,0.1)' }}>
              <Quote size={40} className="text-gold-500/20 mx-auto mb-4" />
              <p className="text-xl sm:text-2xl text-gray-200 italic leading-relaxed mb-6 font-light">
                "Our vision is simple yet profound – to leverage cutting-edge AI technology to ensure that
                every road in India is safe, well-maintained, and efficiently managed. YNM Drishti isn't
                just about detecting potholes; it's about building a smarter, safer infrastructure
                for future generations."
              </p>
              <div className="w-16 h-[2px] mx-auto rounded-full mb-3"
                style={{ background: 'linear-gradient(90deg, #FFD700, #1E90FF)' }} />
              <p className="text-white font-semibold">[Director Name]</p>
              <p className="text-gray-500 text-sm">Founder & Managing Director</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ DIRECTOR'S JOURNEY ═══ */}
      <section className="py-20 relative overflow-hidden">
        <FloatingOrb size="300px" color="rgba(30,144,255,0.15)" top="20%" left="-5%" delay={1} />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              The{' '}
              <span style={{ background: 'linear-gradient(135deg, #FFD700, #1E90FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Journey
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Key milestones that shaped our director's path from engineering to building India's leading road intelligence platform</p>
          </motion.div>

          <div className="relative">
            {/* Center Line */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2"
              style={{ background: 'linear-gradient(180deg, rgba(255,215,0,0.3), rgba(30,144,255,0.3), rgba(255,215,0,0.3))' }} />

            <div className="space-y-8 lg:space-y-0">
              {journey.map((item, index) => {
                const isLeft = index % 2 === 0;
                return (
                  <motion.div
                    key={item.year}
                    className={`relative lg:flex lg:items-center ${isLeft ? '' : 'lg:flex-row-reverse'} lg:mb-12`}
                    initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.6, delay: index * 0.08 }}
                  >
                    {/* Content */}
                    <div className={`lg:w-[45%] ${isLeft ? 'lg:pr-12 lg:text-right' : 'lg:pl-12'}`}>
                      <div className="p-6 rounded-2xl transition-all duration-300 hover:scale-[1.02]"
                        style={{ background: 'linear-gradient(135deg, rgba(15,25,45,0.8) 0%, rgba(20,35,60,0.8) 100%)', border: '1px solid rgba(255,215,0,0.1)' }}>
                        <div className={`flex items-center gap-3 mb-3 ${isLeft ? 'lg:justify-end' : ''}`}>
                          <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                            style={{ background: 'linear-gradient(135deg, rgba(255,215,0,0.15), rgba(30,144,255,0.15))', border: '1px solid rgba(255,215,0,0.2)' }}>
                            <item.icon size={20} className="text-gold-400" />
                          </div>
                          <span className="text-gold-400 font-bold text-lg">{item.year}</span>
                        </div>
                        <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>

                    {/* Center Dot */}
                    <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-5 h-5 rounded-full items-center justify-center z-10"
                      style={{ background: 'linear-gradient(135deg, #FFD700, #1E90FF)', boxShadow: '0 0 15px rgba(255,215,0,0.4)' }}>
                      <div className="w-2 h-2 rounded-full bg-white" />
                    </div>

                    {/* Empty side */}
                    <div className="hidden lg:block lg:w-[45%]" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ EXPERTISE ═══ */}
      <section className="py-20 relative">
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, rgba(255,215,0,0.03) 0%, transparent 50%, rgba(30,144,255,0.03) 100%)' }} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Areas of{' '}
              <span style={{ background: 'linear-gradient(135deg, #FFD700, #1E90FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Expertise
              </span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">Deep domain knowledge across technology, infrastructure, and business leadership</p>
          </motion.div>

          <div className="space-y-6">
            {expertise.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="p-5 rounded-xl"
                  style={{ background: 'linear-gradient(135deg, rgba(15,25,45,0.7) 0%, rgba(20,35,60,0.7) 100%)', border: '1px solid rgba(255,215,0,0.08)' }}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <skill.icon size={18} className="text-gold-400" />
                      <span className="text-white font-medium text-sm sm:text-base">{skill.name}</span>
                    </div>
                    <span className="text-gold-400 font-bold text-sm">{skill.level}%</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: 'linear-gradient(90deg, #FFD700, #1E90FF)' }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.3 + index * 0.1, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ GUIDING PRINCIPLES ═══ */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Guiding{' '}
              <span style={{ background: 'linear-gradient(135deg, #FFD700, #1E90FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Principles
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">The core values that drive our mission and shape every decision</p>
          </motion.div>

          <motion.div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {values.map((v) => (
              <motion.div key={v.title} variants={fadeInUp} className="group">
                <div className="h-full p-7 rounded-2xl transition-all duration-500 hover:scale-[1.03]"
                  style={{ background: 'linear-gradient(135deg, rgba(15,25,45,0.8) 0%, rgba(20,35,60,0.8) 100%)', border: '1px solid rgba(255,215,0,0.1)' }}>
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                    style={{ background: 'linear-gradient(135deg, rgba(255,215,0,0.15), rgba(30,144,255,0.15))', border: '1px solid rgba(255,215,0,0.2)' }}>
                    <v.icon size={26} className="text-gold-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{v.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{v.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ ACHIEVEMENTS ═══ */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, rgba(30,144,255,0.03) 0%, transparent 50%, rgba(255,215,0,0.03) 100%)' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Leadership{' '}
              <span style={{ background: 'linear-gradient(135deg, #FFD700, #1E90FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Impact
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Under visionary leadership, YNM Drishti has achieved remarkable milestones</p>
          </motion.div>

          <motion.div className="grid grid-cols-2 lg:grid-cols-3 gap-5"
            variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {achievements.map((item) => (
              <motion.div key={item.label} variants={fadeInUp}
                className="text-center p-6 rounded-2xl transition-all duration-300 hover:scale-[1.03]"
                style={{ background: 'linear-gradient(135deg, rgba(15,25,45,0.6) 0%, rgba(20,35,60,0.6) 100%)', border: '1px solid rgba(255,215,0,0.08)' }}>
                <div className="text-3xl sm:text-4xl font-bold mb-1"
                  style={{ background: 'linear-gradient(135deg, #FFD700, #1E90FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  <AnimatedCounter value={item.number} />
                </div>
                <p className="text-gray-400 text-sm">{item.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ RECOGNITIONS ═══ */}
      <section className="py-20 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Awards &{' '}
              <span style={{ background: 'linear-gradient(135deg, #FFD700, #1E90FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Recognition
              </span>
            </h2>
          </motion.div>

          <motion.div className="grid sm:grid-cols-2 gap-5"
            variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {recognitions.map((r, i) => (
              <motion.div key={r.title} variants={fadeInUp}
                className="flex items-center gap-4 p-5 rounded-xl group hover:scale-[1.02] transition-all duration-300"
                style={{ background: 'linear-gradient(135deg, rgba(15,25,45,0.7) 0%, rgba(20,35,60,0.7) 100%)', border: '1px solid rgba(255,215,0,0.08)' }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, rgba(255,215,0,0.15), rgba(30,144,255,0.15))', border: '1px solid rgba(255,215,0,0.2)' }}>
                  <Award size={22} className="text-gold-400" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">{r.title}</h4>
                  <p className="text-gray-400 text-sm">{r.org} · {r.year}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ DIRECTOR MESSAGE ═══ */}
      <section className="py-20 relative">
        <FloatingOrb size="300px" color="rgba(255,215,0,0.12)" top="10%" left="80%" delay={3} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          >
            <div className="relative p-8 sm:p-12 rounded-3xl"
              style={{ background: 'linear-gradient(135deg, rgba(15,25,45,0.9) 0%, rgba(20,35,60,0.9) 100%)', border: '1px solid rgba(255,215,0,0.15)' }}>
              <div className="absolute -top-6 left-8 w-12 h-12 rounded-full flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #FFD700, #1E90FF)' }}>
                <Mic size={20} className="text-white" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 mt-4">A Message from Our Director</h3>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>Dear Stakeholders and Partners,</p>
                <p>India's road infrastructure is the backbone of our nation's growth. Every day, millions of citizens rely on our roads for their livelihood, safety, and connectivity. Yet, the challenges we face – from potholes to deteriorating signages – have long demanded a smarter, more proactive approach.</p>
                <p>At YNM Drishti, we embarked on a mission to transform how road infrastructure is monitored and maintained. By harnessing the power of artificial intelligence and deep learning, we've developed solutions that can detect, analyze, and report road conditions with unprecedented accuracy of 99.8%.</p>
                <p>We've gone from an idea to monitoring thousands of kilometers of roads, partnering with government agencies and private enterprises, and expanding our vision internationally. But our journey is just beginning.</p>
                <p>We remain committed to innovation, excellence, and most importantly, to making every road in India safer for everyone.</p>
                <p className="text-gold-400 font-medium pt-4">Together, let's build roads that lead to a brighter future.</p>
              </div>
              <div className="mt-8 pt-6 border-t border-gray-700/50">
                <p className="text-white font-semibold">[Director Name]</p>
                <p className="text-gray-400 text-sm">Founder & Managing Director, YNM Drishti</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Ready to Transform Your Infrastructure?</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">Connect with our team to discover how YNM Drishti can revolutionize road monitoring in your region.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #FFD700, #1E90FF)' }}>
                Get in Touch <ChevronRight size={18} />
              </Link>
              <Link to="/about"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                style={{ border: '1px solid rgba(255,215,0,0.3)', color: '#FFD700' }}>
                Learn More About Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Leadership;
