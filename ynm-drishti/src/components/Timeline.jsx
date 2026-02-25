import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Truck, Scan, FileText, Wrench } from 'lucide-react';

const steps = [
  {
    number: 1,
    icon: Truck,
    title: 'Mount & Move',
    points: [
      'Install AI camera system on any vehicle',
      'Operate at normal traffic speeds (100+ km/h)',
    ],
  },
  {
    number: 2,
    icon: Scan,
    title: 'Detect & Analyze',
    points: [
      'Real-time AI processing of road conditions',
      '15+ infrastructure elements identified',
    ],
  },
  {
    number: 3,
    icon: FileText,
    title: 'Report & Alert',
    points: [
      'Instant defect classification and severity rating',
      'GPS-tagged location data',
    ],
  },
  {
    number: 4,
    icon: Wrench,
    title: 'Action & Optimize',
    points: [
      'Prioritized maintenance recommendations',
      'Lifecycle and replacement analytics',
    ],
  },
];

// Step Component
const TimelineStep = ({ step, index, isInView, activeStep }) => {
  const stepRef = useRef(null);
  const isActive = activeStep === index;
  
  return (
    <motion.div
      ref={stepRef}
      className="relative flex flex-col items-center"
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{
        duration: 0.7,
        delay: index * 0.2,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {/* Icon Circle with bounce */}
      <motion.div
        className="relative mb-4 sm:mb-6"
        initial={{ scale: 0.5, y: 30 }}
        animate={isInView ? { 
          scale: isActive ? 1.1 : 1,
          y: 0,
        } : { scale: 0.5, y: 30 }}
        transition={{ 
          type: 'spring',
          stiffness: 300,
          damping: 15,
          delay: index * 0.15,
        }}
      >
        {/* Outer glow ring */}
        <motion.div
          className="absolute inset-0 rounded-full w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] lg:w-[120px] lg:h-[120px]"
          style={{
            background: 'transparent',
            border: '2px solid rgba(212, 175, 55, 0.3)',
          }}
          animate={isActive ? {
            scale: [1, 1.3, 1],
            opacity: [0.5, 0, 0.5],
          } : {}}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
        
        {/* Main Circle */}
        <div
          className="relative w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] lg:w-[120px] lg:h-[120px] rounded-full flex items-center justify-center transition-all duration-500"
          style={{
            background: isActive 
              ? 'linear-gradient(135deg, rgba(212, 175, 55, 0.2) 0%, rgba(212, 175, 55, 0.1) 100%)'
              : 'linear-gradient(135deg, rgba(26, 40, 71, 0.8) 0%, rgba(44, 62, 90, 0.6) 100%)',
            border: isActive 
              ? '3px solid rgba(212, 175, 55, 0.9)'
              : '2px solid rgba(212, 175, 55, 0.4)',
            boxShadow: isActive 
              ? '0 0 40px rgba(212, 175, 55, 0.4), inset 0 0 30px rgba(212, 175, 55, 0.1)'
              : '0 0 20px rgba(212, 175, 55, 0.15)',
            backdropFilter: 'blur(10px)',
          }}
        >
          {/* Icon */}
          <motion.div
            animate={isActive ? { rotate: [0, 5, -5, 0] } : {}}
            transition={{ duration: 0.5 }}
          >
            <step.icon 
              className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 transition-colors duration-300 ${
                isActive ? 'text-gold-400' : 'text-gold-500/80'
              }`}
              strokeWidth={1.5}
              style={{
                filter: isActive 
                  ? 'drop-shadow(0 0 15px rgba(212, 175, 55, 0.6))'
                  : 'drop-shadow(0 0 8px rgba(212, 175, 55, 0.3))',
              }}
            />
          </motion.div>
        </div>

        {/* Number Badge */}
        <motion.div
          className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center font-bold text-sm sm:text-base lg:text-lg"
          style={{
            background: 'linear-gradient(135deg, #D4AF37 0%, #F4E4C1 100%)',
            color: '#0A1628',
            boxShadow: '0 4px 15px rgba(212, 175, 55, 0.5)',
          }}
          animate={isActive ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 0.5 }}
        >
          {step.number}
        </motion.div>
      </motion.div>

      {/* Content */}
      <div className="text-center max-w-[280px] sm:max-w-xs px-2">
        {/* Title */}
        <motion.h3
          className={`font-semibold mb-2 sm:mb-3 transition-colors duration-300 text-lg sm:text-xl lg:text-2xl ${
            isActive ? 'text-gold-300' : 'text-white'
          }`}
        >
          {step.title}
        </motion.h3>

        {/* Description Points */}
        <div className="space-y-1.5 sm:space-y-2">
          {step.points.map((point, idx) => (
            <motion.p
              key={idx}
              className="text-[#8BA3C7] leading-relaxed text-sm sm:text-base"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: index * 0.2 + idx * 0.1 + 0.3 }}
            >
              {point}
            </motion.p>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Connecting Line Component (Desktop)
const ConnectingLine = ({ index, isInView }) => {
  return (
    <div className="hidden lg:flex items-center justify-center flex-1 relative h-[60px]" style={{ marginTop: '30px' }}>
      {/* Dashed Line */}
      <svg 
        className="w-full h-4 absolute top-1/2 -translate-y-1/2"
        preserveAspectRatio="none"
      >
        <motion.line
          x1="0"
          y1="8"
          x2="100%"
          y2="8"
          stroke="url(#goldGradient)"
          strokeWidth="2"
          strokeDasharray="8 8"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          transition={{
            duration: 1,
            delay: index * 0.3 + 0.5,
            ease: 'easeInOut',
          }}
        />
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D4AF37" />
            <stop offset="50%" stopColor="#F4E4C1" />
            <stop offset="100%" stopColor="#D4AF37" />
          </linearGradient>
        </defs>
      </svg>

      {/* Animated Dot */}
      <motion.div
        className="absolute w-3 h-3 rounded-full bg-gold-500"
        style={{
          boxShadow: '0 0 15px rgba(212, 175, 55, 0.8)',
          top: '50%',
          transform: 'translateY(-50%)',
        }}
        initial={{ left: '0%', opacity: 0 }}
        animate={isInView ? {
          left: ['0%', '100%'],
          opacity: [0, 1, 1, 0],
        } : { left: '0%', opacity: 0 }}
        transition={{
          duration: 2,
          delay: index * 0.3 + 1,
          repeat: Infinity,
          repeatDelay: 3,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
};

// Vertical Connecting Line (Mobile/Tablet)
const VerticalConnectingLine = ({ index, isInView }) => {
  return (
    <div className="lg:hidden flex justify-center py-4">
      <div className="relative h-16 w-0.5">
        {/* Dashed Line */}
        <motion.div
          className="absolute inset-0 w-full"
          style={{
            background: `repeating-linear-gradient(
              to bottom,
              #D4AF37 0px,
              #D4AF37 8px,
              transparent 8px,
              transparent 16px
            )`,
          }}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={isInView ? { scaleY: 1, opacity: 1 } : { scaleY: 0, opacity: 0 }}
          transition={{
            duration: 0.5,
            delay: index * 0.2 + 0.3,
            ease: 'easeOut',
          }}
        />

        {/* Animated Dot */}
        <motion.div
          className="absolute w-2 h-2 rounded-full bg-gold-500 left-1/2 -translate-x-1/2"
          style={{
            boxShadow: '0 0 10px rgba(212, 175, 55, 0.8)',
          }}
          initial={{ top: '0%', opacity: 0 }}
          animate={isInView ? {
            top: ['0%', '100%'],
            opacity: [0, 1, 1, 0],
          } : { top: '0%', opacity: 0 }}
          transition={{
            duration: 1.5,
            delay: index * 0.3 + 0.8,
            repeat: Infinity,
            repeatDelay: 4,
            ease: 'easeInOut',
          }}
        />
      </div>
    </div>
  );
};

const Timeline = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [activeStep, setActiveStep] = useState(0);

  // Cycle through active steps
  useEffect(() => {
    if (!isInView) return;
    
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 sm:py-32 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0A1628 0%, #0D1B2F 50%, #0A1628 100%)',
      }}
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Radial glow */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] rounded-full opacity-30"
          style={{
            background: 'radial-gradient(ellipse, rgba(212, 175, 55, 0.08) 0%, transparent 70%)',
          }}
        />
        
        {/* Horizontal lines */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 100px, rgba(212, 175, 55, 0.5) 100px, rgba(212, 175, 55, 0.5) 101px)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 sm:mb-16 lg:mb-20"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-navy-800/60 backdrop-blur-sm border border-gold-500/20 mb-4 sm:mb-6"
          >
            <motion.div
              className="w-2 h-2 rounded-full bg-gold-500"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-gold-300 text-xs sm:text-sm font-medium tracking-wide">
              Our Process
            </span>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="font-bold text-white mb-4 sm:mb-6 px-4 text-2xl sm:text-4xl lg:text-5xl"
            style={{
              textShadow: '0 0 40px rgba(255, 255, 255, 0.1)',
              lineHeight: 1.2,
            }}
          >
            How YNM Drishti Works
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-[#8BA3C7] max-w-2xl mx-auto px-4 text-base sm:text-lg lg:text-xl"
          >
            Seamless AI-powered road assessment in{' '}
            <span className="text-gold-300 font-medium">4 simple steps</span>
          </motion.p>

          {/* Decorative Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-6 sm:mt-8 mx-auto w-24 sm:w-32 h-0.5 bg-gradient-to-r from-transparent via-gold-500 to-transparent"
          />
        </motion.div>

        {/* Timeline - Desktop (Horizontal) */}
        <div className="hidden lg:flex items-start justify-between">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-start flex-1">
              <TimelineStep
                step={step}
                index={index}
                isInView={isInView}
                activeStep={activeStep}
              />
              {index < steps.length - 1 && (
                <ConnectingLine index={index} isInView={isInView} />
              )}
            </div>
          ))}
        </div>

        {/* Timeline - Mobile/Tablet (Vertical) */}
        <div className="lg:hidden">
          {steps.map((step, index) => (
            <div key={step.number}>
              <TimelineStep
                step={step}
                index={index}
                isInView={isInView}
                activeStep={activeStep}
              />
              {index < steps.length - 1 && (
                <VerticalConnectingLine index={index} isInView={isInView} />
              )}
            </div>
          ))}
        </div>

        {/* Step Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="flex justify-center gap-2 sm:gap-3 mt-10 sm:mt-16"
        >
          {steps.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveStep(index)}
              className={`w-10 h-10 sm:w-8 sm:h-8 rounded-full transition-all duration-300 flex items-center justify-center active:scale-95`}
              aria-label={`Go to step ${index + 1}`}
            >
              <span
                className={`w-3 h-3 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                  activeStep === index
                    ? 'bg-gold-500 scale-125'
                    : 'bg-navy-600'
                }`}
                style={{
                  boxShadow: activeStep === index 
                    ? '0 0 15px rgba(212, 175, 55, 0.6)' 
                    : 'none',
                }}
              />
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Timeline;
