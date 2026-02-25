import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Eye, Brain, Cpu, Cloud, MapPin, FileSpreadsheet } from 'lucide-react';

const technologies = [
  {
    id: 1,
    icon: Eye,
    title: 'Computer Vision',
    description: 'Advanced object detection and classification',
    details: 'State-of-the-art YOLO and Transformer-based models for accurate real-time detection',
    connections: [2, 3],
  },
  {
    id: 2,
    icon: Brain,
    title: 'Deep Learning',
    description: 'Neural networks trained on millions of road images',
    details: 'Custom CNN architectures optimized for road infrastructure classification',
    connections: [1, 3, 4],
  },
  {
    id: 3,
    icon: Cpu,
    title: 'Edge Computing',
    description: 'Real-time processing at 100+ km/h',
    details: 'GPU-accelerated inference with sub-50ms latency per frame',
    connections: [1, 2, 5],
  },
  {
    id: 4,
    icon: Cloud,
    title: 'Cloud Integration',
    description: 'Seamless data sync and analytics dashboard',
    details: 'Secure cloud infrastructure with real-time synchronization and backup',
    connections: [2, 5, 6],
  },
  {
    id: 5,
    icon: MapPin,
    title: 'GPS Mapping',
    description: 'Precise geolocation for every detection',
    details: 'Sub-meter accuracy with RTK GPS integration and GIS mapping',
    connections: [3, 4, 6],
  },
  {
    id: 6,
    icon: FileSpreadsheet,
    title: 'Automated Reporting',
    description: 'Instant PDF/Excel reports with recommendations',
    details: 'AI-generated insights with priority rankings and cost estimates',
    connections: [4, 5],
  },
];

// Hexagon SVG path
const HexagonPath = ({ className, style }) => (
  <svg
    viewBox="0 0 200 230"
    className={className}
    style={style}
  >
    <polygon
      points="100,0 200,57.5 200,172.5 100,230 0,172.5 0,57.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);

// Tech Card Component
const TechCard = ({ tech, index, isInView, hoveredTech, setHoveredTech }) => {
  const isHovered = hoveredTech === tech.id;
  const isConnected = hoveredTech && technologies.find(t => t.id === hoveredTech)?.connections.includes(tech.id);
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 30 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 30 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="relative group"
      onMouseEnter={() => setHoveredTech(tech.id)}
      onMouseLeave={() => setHoveredTech(null)}
    >
      {/* Hexagon Container */}
      <motion.div
        className="relative w-48 h-52 sm:w-56 sm:h-64 cursor-pointer"
        whileHover={{ scale: 1.08, z: 10 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {/* Hexagon Background */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            viewBox="0 0 200 230"
            className="w-full h-full"
          >
            {/* Glow filter */}
            <defs>
              <filter id={`glow-${tech.id}`} x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <linearGradient id={`gradient-${tech.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(212, 175, 55, 0.3)" />
                <stop offset="50%" stopColor="rgba(212, 175, 55, 0.1)" />
                <stop offset="100%" stopColor="rgba(212, 175, 55, 0.2)" />
              </linearGradient>
            </defs>
            
            {/* Background fill */}
            <polygon
              points="100,0 200,57.5 200,172.5 100,230 0,172.5 0,57.5"
              fill="rgba(10, 22, 40, 0.9)"
              className="transition-all duration-300"
            />
            
            {/* Border */}
            <motion.polygon
              points="100,0 200,57.5 200,172.5 100,230 0,172.5 0,57.5"
              fill="none"
              stroke={isHovered || isConnected ? '#D4AF37' : 'rgba(212, 175, 55, 0.4)'}
              strokeWidth={isHovered ? 3 : 2}
              filter={isHovered ? `url(#glow-${tech.id})` : 'none'}
              className="transition-all duration-300"
            />
            
            {/* Inner pattern */}
            <polygon
              points="100,15 185,65 185,165 100,215 15,165 15,65"
              fill="none"
              stroke="rgba(212, 175, 55, 0.1)"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
          </svg>
        </div>

        {/* Content - Default State */}
        <motion.div 
          className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center"
          animate={{ opacity: isHovered ? 0 : 1 }}
          transition={{ duration: 0.2 }}
        >
          {/* Icon */}
          <motion.div
            className="mb-3"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: index * 0.2,
            }}
          >
            <div 
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center bg-navy-800/50"
              style={{
                border: '1px solid rgba(212, 175, 55, 0.2)',
              }}
            >
              <tech.icon 
                className="w-7 h-7 sm:w-8 sm:h-8 text-gold-500"
                strokeWidth={1.5}
              />
            </div>
          </motion.div>

          {/* Title */}
          <h3 className="font-semibold mb-1 text-white text-base sm:text-lg">
            {tech.title}
          </h3>

          {/* Description */}
          <p className="text-xs sm:text-sm text-[#8BA3C7] leading-snug px-2">
            {tech.description}
          </p>
        </motion.div>

        {/* Content - Hover State */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ pointerEvents: isHovered ? 'auto' : 'none' }}
        >
          {/* Icon */}
          <div 
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center mb-3 bg-gold-500/20"
            style={{
              border: '2px solid rgba(212, 175, 55, 0.6)',
              boxShadow: '0 0 25px rgba(212, 175, 55, 0.4)',
            }}
          >
            <tech.icon 
              className="w-7 h-7 sm:w-8 sm:h-8 text-gold-400"
              strokeWidth={1.5}
              style={{ filter: 'drop-shadow(0 0 10px rgba(212, 175, 55, 0.8))' }}
            />
          </div>

          {/* Title */}
          <h3 className="font-semibold text-gold-300 mb-2 text-base sm:text-lg">
            {tech.title}
          </h3>

          {/* Details */}
          <p className="text-xs text-[#8BA3C7] leading-relaxed px-2">
            {tech.details}
          </p>
        </motion.div>

        {/* Connection indicator */}
        {isConnected && !isHovered && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div 
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(circle at center, rgba(212, 175, 55, 0.1) 0%, transparent 70%)',
              }}
            />
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

// Connection Lines Component
const ConnectionLines = ({ hoveredTech, isInView }) => {
  if (!isInView) return null;
  
  const hoveredData = technologies.find(t => t.id === hoveredTech);
  if (!hoveredData) return null;

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 hidden lg:block">
      <defs>
        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(212, 175, 55, 0)" />
          <stop offset="50%" stopColor="rgba(212, 175, 55, 0.6)" />
          <stop offset="100%" stopColor="rgba(212, 175, 55, 0)" />
        </linearGradient>
      </defs>
      {hoveredData.connections.map((connId) => (
        <motion.line
          key={`${hoveredTech}-${connId}`}
          x1="50%"
          y1="50%"
          x2={`${25 + ((connId - 1) % 3) * 25}%`}
          y2={`${connId <= 3 ? 30 : 70}%`}
          stroke="url(#lineGradient)"
          strokeWidth="2"
          strokeDasharray="8 4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          exit={{ pathLength: 0, opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      ))}
    </svg>
  );
};

const TechStack = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [hoveredTech, setHoveredTech] = useState(null);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 sm:py-32 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0D1B2F 0%, #0A1628 50%, #0D1B2F 100%)',
      }}
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Hexagon pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='52' viewBox='0 0 60 52'%3E%3Cpolygon fill='none' stroke='%23D4AF37' stroke-width='0.5' points='30,0 60,15 60,45 30,60 0,45 0,15'/%3E%3C/svg%3E")`,
            backgroundSize: '60px 52px',
          }}
        />
        
        {/* Radial glows - optimized for performance */}
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gold-500/5 blur-[100px]"
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-navy-600/20 blur-[100px]"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-navy-800/60 backdrop-blur-sm border border-gold-500/20 mb-6"
          >
            <motion.div
              className="w-2 h-2 rounded-full bg-gold-500"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-gold-300 text-sm font-medium tracking-wide">
              Our Technology
            </span>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="font-bold gradient-text mb-6"
            style={{
              fontSize: 'clamp(32px, 6vw, 48px)',
              textShadow: '0 0 60px rgba(212, 175, 55, 0.5)',
              lineHeight: 1.2,
            }}
          >
            Built on Cutting-Edge Technology
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-[#8BA3C7] text-lg max-w-2xl mx-auto"
          >
            Powered by the latest advancements in{' '}
            <span className="text-gold-300">artificial intelligence</span> and machine learning
          </motion.p>

          {/* Decorative Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-8 mx-auto w-24 h-0.5 bg-gradient-to-r from-transparent via-gold-500 to-transparent"
          />
        </motion.div>

        {/* Honeycomb Grid */}
        <div className="relative">
          {/* Connection Lines */}
          <ConnectionLines hoveredTech={hoveredTech} isInView={isInView} />
          
          {/* Desktop Honeycomb Layout */}
          <div className="hidden lg:block">
            {/* Top Row - 3 hexagons */}
            <div className="flex justify-center gap-4 mb-[-30px]">
              {technologies.slice(0, 3).map((tech, index) => (
                <TechCard
                  key={tech.id}
                  tech={tech}
                  index={index}
                  isInView={isInView}
                  hoveredTech={hoveredTech}
                  setHoveredTech={setHoveredTech}
                />
              ))}
            </div>
            
            {/* Bottom Row - 3 hexagons (offset) */}
            <div className="flex justify-center gap-4">
              {technologies.slice(3, 6).map((tech, index) => (
                <TechCard
                  key={tech.id}
                  tech={tech}
                  index={index + 3}
                  isInView={isInView}
                  hoveredTech={hoveredTech}
                  setHoveredTech={setHoveredTech}
                />
              ))}
            </div>
          </div>

          {/* Tablet Layout - 2x3 */}
          <div className="hidden sm:grid lg:hidden grid-cols-2 gap-4 justify-items-center">
            {technologies.map((tech, index) => (
              <TechCard
                key={tech.id}
                tech={tech}
                index={index}
                isInView={isInView}
                hoveredTech={hoveredTech}
                setHoveredTech={setHoveredTech}
              />
            ))}
          </div>

          {/* Mobile Layout - Single column */}
          <div className="sm:hidden flex flex-col items-center gap-4">
            {technologies.map((tech, index) => (
              <TechCard
                key={tech.id}
                tech={tech}
                index={index}
                isInView={isInView}
                hoveredTech={hoveredTech}
                setHoveredTech={setHoveredTech}
              />
            ))}
          </div>
        </div>

        {/* Bottom Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <div 
            className="inline-flex items-center gap-4 px-6 py-4 rounded-xl"
            style={{
              background: 'linear-gradient(135deg, rgba(26, 40, 71, 0.6) 0%, rgba(44, 62, 90, 0.4) 100%)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(212, 175, 55, 0.2)',
            }}
          >
            <div className="flex -space-x-2">
              {[Brain, Cpu, Cloud].map((Icon, i) => (
                <motion.div
                  key={i}
                  className="w-10 h-10 rounded-full bg-navy-800 border-2 border-navy-700 flex items-center justify-center"
                  animate={{ rotate: [0, 5, 0, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: i * 0.3 }}
                >
                  <Icon className="w-5 h-5 text-gold-500" />
                </motion.div>
              ))}
            </div>
            <div className="text-left">
              <p className="text-white font-medium">Integrated AI Pipeline</p>
              <p className="text-[#8BA3C7] text-sm">All technologies work seamlessly together</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechStack;
