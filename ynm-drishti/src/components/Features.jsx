import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { 
  Target, 
  Eye, 
  Paintbrush, 
  AlertTriangle, 
  Shield, 
  Lightbulb
} from 'lucide-react';
import TiltCard from './ui/TiltCard';

const features = [
  {
    icon: Target,
    title: 'Potholes Detection',
    description: 'Identify and measure road damage in real-time with centimeter-level accuracy.',
    animation: 'pulse'
  },
  {
    icon: Eye,
    title: 'Reflective Signages',
    description: 'Analyze reflectivity levels and compliance with safety standards.',
    animation: 'scale'
  },
  {
    icon: Paintbrush,
    title: 'Thermoplastic Paint',
    description: 'Assess marking quality, visibility, and degradation patterns.',
    animation: 'rotate'
  },
  {
    icon: AlertTriangle,
    title: 'Kerb Defects',
    description: 'Detect cracks, chips, and structural issues along road edges.',
    animation: 'shake'
  },
  {
    icon: Shield,
    title: 'Metal Barriers',
    description: 'Inspect crash barrier integrity and damage assessment.',
    animation: 'scale'
  },
  {
    icon: Lightbulb,
    title: 'Street Lights',
    description: 'Monitor functionality, positioning, and maintenance status.',
    animation: 'glow'
  },
];

const FeatureCard = ({ feature, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth < 768);
      
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
      };
      
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  // Different hover animations for icons
  const iconAnimations = {
    pulse: {
      scale: [1, 1.2, 1],
      transition: { duration: 0.5 }
    },
    scale: {
      scale: 1.3,
      rotate: 5,
      transition: { duration: 0.3 }
    },
    rotate: {
      rotate: 360,
      scale: 1.1,
      transition: { duration: 0.6 }
    },
    shake: {
      x: [-2, 2, -2, 2, 0],
      scale: 1.1,
      transition: { duration: 0.4 }
    },
    glow: {
      scale: 1.2,
      filter: 'drop-shadow(0 0 15px rgba(212, 175, 55, 0.8))',
      transition: { duration: 0.3 }
    },
    bounce: {
      y: [-5, 0, -5, 0],
      scale: 1.1,
      transition: { duration: 0.5 }
    },
    sway: {
      rotate: [-10, 10, -5, 5, 0],
      scale: 1.1,
      transition: { duration: 0.6 }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 80, scale: 0.9 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className="group relative h-[260px] sm:h-[280px] lg:h-[300px]"
    >
      {/* Tilt Card Wrapper - only on desktop */}
      <TiltCard 
        tiltAmount={8} 
        scale={1.02} 
        glareOpacity={0.1}
        disabled={isMobile}
        className="h-full"
      >
      {/* Card Container */}
      <motion.div
        className="relative h-full rounded-xl overflow-hidden cursor-pointer active:scale-98"
      >
        {/* Glassmorphism Background */}
        <div 
          className="absolute inset-0 transition-all duration-500"
          style={{
            background: 'linear-gradient(135deg, rgba(26, 40, 71, 0.6) 0%, rgba(44, 62, 90, 0.4) 100%)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
          }}
        />
        
        {/* Border - appears on hover */}
        <div 
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            border: '2px solid rgba(212, 175, 55, 0.8)',
            boxShadow: '0 0 30px rgba(212, 175, 55, 0.3), inset 0 0 30px rgba(212, 175, 55, 0.05)'
          }}
        />
        
        {/* Default border */}
        <div 
          className="absolute inset-0 rounded-xl group-hover:opacity-0 transition-opacity duration-500"
          style={{
            border: '1px solid rgba(139, 163, 199, 0.2)',
          }}
        />

        {/* Gold Glow Shadow on Hover */}
        <motion.div
          className="absolute -inset-1 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
          style={{
            background: 'transparent',
            boxShadow: '0 20px 50px rgba(212, 175, 55, 0.25), 0 10px 30px rgba(212, 175, 55, 0.15)'
          }}
        />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center p-4 sm:p-5 lg:p-6 text-center">
          {/* Icon Container */}
          <motion.div
            className="mb-4 sm:mb-5 lg:mb-6 relative"
            whileHover={iconAnimations[feature.animation]}
          >
            {/* Icon Glow Background */}
            <div 
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: 'radial-gradient(circle, rgba(212, 175, 55, 0.2) 0%, transparent 70%)',
                transform: 'scale(2)',
              }}
            />
            
            {/* Icon */}
            <feature.icon 
              className="w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 text-gold-500 relative z-10 transition-all duration-300"
              strokeWidth={1.5}
              style={{
                filter: 'drop-shadow(0 0 8px rgba(212, 175, 55, 0.4))'
              }}
            />
          </motion.div>

          {/* Title */}
          <h3 className="font-semibold text-white mb-2 sm:mb-3 group-hover:text-gold-300 transition-colors duration-300 text-base sm:text-lg lg:text-xl">
            {feature.title}
          </h3>

          {/* Description */}
          <p className="text-[#8BA3C7] leading-relaxed group-hover:text-[#A5BCD9] transition-colors duration-300 text-sm sm:text-base">
            {feature.description}
          </p>

          {/* Bottom Accent Line */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent opacity-0 group-hover:opacity-100"
            initial={{ scaleX: 0 }}
            whileHover={{ scaleX: 1 }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Corner Accents - hidden on small screens */}
        <div className="hidden sm:block absolute top-3 left-3 w-4 h-4 border-l-2 border-t-2 border-gold-500/0 group-hover:border-gold-500/60 transition-all duration-500 rounded-tl" />
        <div className="hidden sm:block absolute top-3 right-3 w-4 h-4 border-r-2 border-t-2 border-gold-500/0 group-hover:border-gold-500/60 transition-all duration-500 rounded-tr" />
        <div className="hidden sm:block absolute bottom-3 left-3 w-4 h-4 border-l-2 border-b-2 border-gold-500/0 group-hover:border-gold-500/60 transition-all duration-500 rounded-bl" />
        <div className="hidden sm:block absolute bottom-3 right-3 w-4 h-4 border-r-2 border-b-2 border-gold-500/0 group-hover:border-gold-500/60 transition-all duration-500 rounded-br" />
      </motion.div>
      </TiltCard>
    </motion.div>
  );
};

const Features = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-100px' });

  return (
    <section id="features" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900 via-navy-800/50 to-navy-900" />
      
      {/* Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold-500/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-navy-600/20 rounded-full blur-[150px]" />
      
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(212, 175, 55, 0.5) 1px, transparent 0)`,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 50 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-10 sm:mb-16"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isHeaderInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-navy-800/60 backdrop-blur-sm border border-gold-500/20 mb-4 sm:mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-gold-500 animate-pulse" />
            <span className="text-gold-300 text-xs sm:text-sm font-medium tracking-wide">
              AI Detection Capabilities
            </span>
          </motion.div>
          
          {/* Main Title */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="font-bold mb-4 sm:mb-6 gradient-text text-3xl sm:text-4xl lg:text-5xl"
            style={{
              textShadow: '0 0 60px rgba(212, 175, 55, 0.4)',
              lineHeight: 1.2
            }}
          >
            What We Detect
          </motion.h2>
          
          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-base sm:text-lg text-[#8BA3C7] max-w-2xl mx-auto px-4"
          >
            Our advanced AI system identifies and analyzes{' '}
            <span className="text-gold-300 font-medium">15+ types</span> of road infrastructure 
            elements with industry-leading accuracy.
          </motion.p>

          {/* Decorative Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isHeaderInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-6 sm:mt-8 mx-auto w-24 sm:w-32 h-0.5 bg-gradient-to-r from-transparent via-gold-500 to-transparent"
          />
        </motion.div>

        {/* Features Grid - 3x3 on desktop, 2x2 on tablet, 1 on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
