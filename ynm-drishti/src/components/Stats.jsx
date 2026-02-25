import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Gauge, Layers, CheckCircle, Clock } from 'lucide-react';

// Dummy company names - replace logos later
const companies = [
  { name: 'TechnoRoads India' },
  { name: 'Highway Solutions' },
  { name: 'SmartCity Corp' },
  { name: 'InfraWatch Systems' },
  { name: 'RoadSafe Analytics' },
  { name: 'Urban Mobility Co' },
  { name: 'GovTech Partners' },
  { name: 'Metro Infrastructure' },
  { name: 'Digital Highways' },
  { name: 'CityPlan Solutions' },
];

const stats = [
  {
    icon: Gauge,
    value: 100,
    prefix: '',
    suffix: '+ km/h',
    label: 'Detection Speed',
  },
  {
    icon: Layers,
    value: 15,
    prefix: '',
    suffix: '+',
    label: 'Infrastructure Types',
  },
  {
    icon: CheckCircle,
    value: 99.8,
    prefix: '',
    suffix: '%',
    label: 'Accuracy Rate',
    decimals: 1,
  },
  {
    icon: Clock,
    value: 24,
    prefix: '',
    suffix: '/7',
    label: 'Real-Time Monitoring',
  },
];

// Synchronized duration for all counters
const COUNTER_DURATION = 2.5;
// Time to wait before repeating the animation (in seconds)
const REPEAT_DELAY = 4;

// Animated Counter Component - All counters animate together and repeat
const AnimatedCounter = ({ value, suffix, prefix = '', decimals = 0, isInView }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const animationFrameRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!isInView) return;
    
    const runAnimation = () => {
      // Reset to 0
      setCount(0);
      
      let startTime;

      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (COUNTER_DURATION * 1000), 1);
        
        // Easing function - easeOutExpo for dramatic synchronized effect
        const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const currentValue = easeOutExpo * value;
        
        setCount(currentValue);

        if (progress < 1) {
          animationFrameRef.current = requestAnimationFrame(animate);
        }
      };

      // Start animation
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Run immediately when in view
    runAnimation();

    // Set up interval to repeat the animation
    intervalRef.current = setInterval(() => {
      runAnimation();
    }, (COUNTER_DURATION + REPEAT_DELAY) * 1000);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isInView, value]);

  const displayValue = decimals > 0 
    ? count.toFixed(decimals) 
    : Math.floor(count);

  return (
    <span ref={countRef} className="tabular-nums">
      {prefix}{displayValue}{suffix}
    </span>
  );
};

// Progress Bar Component
const ProgressBar = ({ isInView, delay }) => {
  return (
    <div className="w-full h-1 bg-navy-700/50 rounded-full overflow-hidden mt-6">
      <motion.div
        className="h-full rounded-full"
        style={{
          background: 'linear-gradient(90deg, #D4AF37, #F4E4C1, #D4AF37)',
          backgroundSize: '200% 100%',
        }}
        initial={{ width: 0 }}
        animate={isInView ? { width: '100%' } : { width: 0 }}
        transition={{ 
          duration: 1.5, 
          delay: delay,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
      >
        {/* Shimmer effect */}
        <motion.div
          className="w-full h-full"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
          }}
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1,
            ease: 'easeInOut',
          }}
        />
      </motion.div>
    </div>
  );
};

// Stat Card Component
const StatCard = ({ stat, index, isInView }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 60, scale: 0.9 }}
      transition={{ 
        duration: 0.7, 
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className="relative group"
    >
      {/* Card Container */}
      <div 
        className="relative p-5 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl h-full overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(26, 40, 71, 0.4) 0%, rgba(44, 62, 90, 0.3) 100%)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        {/* Hover glow effect */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at center, rgba(212, 175, 55, 0.08) 0%, transparent 70%)',
          }}
        />

        {/* Icon Container */}
        <div className="flex justify-center mb-4 sm:mb-6">
          <motion.div
            className="relative"
            initial={{ scale: 0.5, y: 20 }}
            animate={isInView ? {
              scale: [0.5, 1.2, 1],
              y: [20, -10, 0],
            } : { scale: 0.5, y: 20 }}
            transition={{
              duration: 0.6,
              delay: index * 0.15,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            {/* Icon Background Circle */}
            <div 
              className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full flex items-center justify-center relative"
              style={{
                background: 'linear-gradient(135deg, rgba(10, 22, 40, 0.8) 0%, rgba(26, 40, 71, 0.8) 100%)',
                border: '2px solid rgba(212, 175, 55, 0.5)',
                boxShadow: '0 0 30px rgba(212, 175, 55, 0.2), inset 0 0 20px rgba(212, 175, 55, 0.1)',
              }}
            >
              {/* Pulsing ring */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  border: '2px solid rgba(212, 175, 55, 0.3)',
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeOut',
                  delay: index * 0.2,
                }}
              />
              
              {/* Icon */}
              <stat.icon 
                className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-white"
                strokeWidth={1.5}
                style={{
                  filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.3))',
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* Number */}
        <div className="text-center mb-2">
          <span 
            className="font-bold gradient-text text-4xl sm:text-5xl lg:text-6xl"
            style={{
              textShadow: '0 0 40px rgba(212, 175, 55, 0.4)',
              lineHeight: 1.1,
            }}
          >
            <AnimatedCounter 
              value={stat.value} 
              suffix={stat.suffix}
              prefix={stat.prefix}
              decimals={stat.decimals || 0}
              isInView={isInView}
            />
          </span>
        </div>

        {/* Label */}
        <p className="text-center text-[#8BA3C7] font-medium text-sm sm:text-base lg:text-lg">
          {stat.label}
        </p>

        {/* Progress Bar */}
        <ProgressBar isInView={isInView} delay={0.5 + index * 0.15} />

        {/* Corner decorations */}
        <div className="absolute top-2 sm:top-3 left-2 sm:left-3 w-2 sm:w-3 h-2 sm:h-3 border-l border-t border-gold-500/30" />
        <div className="absolute top-2 sm:top-3 right-2 sm:right-3 w-2 sm:w-3 h-2 sm:h-3 border-r border-t border-gold-500/30" />
        <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 w-2 sm:w-3 h-2 sm:h-3 border-l border-b border-gold-500/30" />
        <div className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 w-2 sm:w-3 h-2 sm:h-3 border-r border-b border-gold-500/30" />
      </div>
    </motion.div>
  );
};

const Stats = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section 
      id="stats" 
      ref={sectionRef}
      className="relative py-24 sm:py-32 overflow-hidden"
      style={{ backgroundColor: '#0A1628' }}
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy-900/50 via-transparent to-navy-900/50" />
        
        {/* Radial glow */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(ellipse, rgba(212, 175, 55, 0.05) 0%, transparent 70%)',
          }}
        />
        
        {/* Animated particles - reduced for performance */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-gold-500/30"
            style={{
              left: `${12.5 * i}%`,
              top: `${25 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [-15, 15, -15],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 5 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(212, 175, 55, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212, 175, 55, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-navy-800/60 backdrop-blur-sm border border-gold-500/20 mb-6"
          >
            <motion.span 
              className="w-2 h-2 rounded-full bg-gold-500"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-gold-300 text-sm font-medium tracking-wide">
              Performance Metrics
            </span>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="font-bold gradient-text mb-4"
            style={{
              fontSize: 'clamp(32px, 6vw, 48px)',
              textShadow: '0 0 60px rgba(212, 175, 55, 0.5)',
              lineHeight: 1.2,
            }}
          >
            Powered by Advanced AI
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-[#8BA3C7] text-lg max-w-2xl mx-auto"
          >
            Industry-leading performance that sets new standards in road infrastructure detection
          </motion.p>

          {/* Decorative Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-8 mx-auto w-24 h-0.5 bg-gradient-to-r from-transparent via-gold-500 to-transparent"
          />
        </motion.div>

        {/* Stats Grid - 4 in row on desktop, 2 on tablet, 1 on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard 
              key={stat.label} 
              stat={stat} 
              index={index} 
              isInView={isInView}
            />
          ))}
        </div>

        {/* Bottom Trust Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <div 
            className="inline-flex items-center gap-4 px-8 py-4 rounded-full"
            style={{
              background: 'linear-gradient(135deg, rgba(26, 40, 71, 0.5) 0%, rgba(44, 62, 90, 0.3) 100%)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(212, 175, 55, 0.2)',
            }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <CheckCircle className="w-6 h-6 text-gold-500" />
            </motion.div>
            <span className="text-[#8BA3C7]">
              Trusted by <span className="text-gold-300 font-semibold">50+ organizations</span> across India
            </span>
          </div>
        </motion.div>

        {/* Infinite Scrolling Company Marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-12 overflow-hidden"
        >
          <div className="relative">
            {/* Gradient fade on edges */}
            <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-[#0A1628] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-[#0A1628] to-transparent z-10 pointer-events-none" />
            
            {/* Scrolling container */}
            <div className="flex animate-marquee">
              {/* First set of companies */}
              {companies.map((company, index) => (
                <div
                  key={`first-${index}`}
                  className="flex-shrink-0 mx-3 sm:mx-4"
                >
                  <div 
                    className="flex items-center gap-3 px-5 sm:px-6 py-3 sm:py-4 rounded-xl"
                    style={{
                      background: 'linear-gradient(135deg, rgba(26, 40, 71, 0.6) 0%, rgba(44, 62, 90, 0.4) 100%)',
                      border: '1px solid rgba(212, 175, 55, 0.15)',
                    }}
                  >
                    {/* Placeholder for logo */}
                    <div 
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center"
                      style={{
                        background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.2) 0%, rgba(212, 175, 55, 0.1) 100%)',
                        border: '1px solid rgba(212, 175, 55, 0.3)',
                      }}
                    >
                      <span className="text-gold-400 font-bold text-sm sm:text-base">
                        {company.name.charAt(0)}
                      </span>
                    </div>
                    <span className="text-white font-medium text-sm sm:text-base whitespace-nowrap">
                      {company.name}
                    </span>
                  </div>
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {companies.map((company, index) => (
                <div
                  key={`second-${index}`}
                  className="flex-shrink-0 mx-3 sm:mx-4"
                >
                  <div 
                    className="flex items-center gap-3 px-5 sm:px-6 py-3 sm:py-4 rounded-xl"
                    style={{
                      background: 'linear-gradient(135deg, rgba(26, 40, 71, 0.6) 0%, rgba(44, 62, 90, 0.4) 100%)',
                      border: '1px solid rgba(212, 175, 55, 0.15)',
                    }}
                  >
                    {/* Placeholder for logo */}
                    <div 
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center"
                      style={{
                        background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.2) 0%, rgba(212, 175, 55, 0.1) 100%)',
                        border: '1px solid rgba(212, 175, 55, 0.3)',
                      }}
                    >
                      <span className="text-gold-400 font-bold text-sm sm:text-base">
                        {company.name.charAt(0)}
                      </span>
                    </div>
                    <span className="text-white font-medium text-sm sm:text-base whitespace-nowrap">
                      {company.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Stats;
