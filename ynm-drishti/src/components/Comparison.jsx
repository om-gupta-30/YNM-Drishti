import { motion, useInView, useAnimation } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { X, Check, ArrowRight, TrendingUp, Zap } from 'lucide-react';

const comparisonData = [
  {
    feature: 'Coverage Speed',
    traditional: 40,
    drishti: 500,
    unit: 'km/day',
    traditionalLabel: '40 km/day',
    drishtiLabel: '500+ km/day',
  },
  {
    feature: 'Detection Accuracy',
    traditional: 65,
    drishti: 99.8,
    unit: '%',
    traditionalLabel: '65%',
    drishtiLabel: '99.8%',
    isPercentage: true,
  },
  {
    feature: 'Cost per Kilometer',
    traditional: 650,
    drishti: 75,
    unit: '₹',
    traditionalLabel: '₹650',
    drishtiLabel: '₹75',
    inverse: true,
  },
  {
    feature: 'Defect Types',
    traditional: 4,
    drishti: 15,
    unit: 'types',
    traditionalLabel: '4 types',
    drishtiLabel: '15+ types',
  },
];

const quickStats = [
  { label: 'Traffic Disruption', traditional: 'Required', drishti: 'Zero', icon: X, good: true },
  { label: 'Real-time Reports', traditional: 'No', drishti: 'Yes', icon: Check, good: true },
  { label: 'GPS Tagging', traditional: 'Manual', drishti: 'Auto', icon: Zap, good: true },
];

// Animated Progress Bar Component with looping animation
const AnimatedBar = ({ value, maxValue, color, delay, isInView, label }) => {
  const percentage = Math.min((value / maxValue) * 100, 100);
  const [key, setKey] = useState(0);
  
  // Re-trigger animation every 5 seconds
  useEffect(() => {
    if (!isInView) return;
    
    const interval = setInterval(() => {
      setKey(prev => prev + 1);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isInView]);
  
  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-[#8BA3C7]">{label}</span>
      </div>
      <div className="h-2 bg-navy-800/50 rounded-full overflow-hidden">
        <motion.div
          key={key}
          className="h-full rounded-full relative overflow-hidden"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1.2, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
            }}
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>
    </div>
  );
};

// Animated Counter
const AnimatedCounter = ({ value, suffix = '', isInView, delay = 0 }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!isInView) return;
    
    const timer = setTimeout(() => {
      const duration = 1500;
      const startTime = Date.now();
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        
        setCount(Math.floor(eased * value));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    }, delay * 1000);
    
    return () => clearTimeout(timer);
  }, [isInView, value, delay]);
  
  return <span>{count}{suffix}</span>;
};

// Comparison Card with Visual Graph
const ComparisonCard = ({ data, index, isInView }) => {
  const maxValue = Math.max(data.traditional, data.drishti);
  const improvement = data.inverse 
    ? Math.round((1 - data.drishti / data.traditional) * 100)
    : Math.round((data.drishti / data.traditional - 1) * 100);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
    >
      <div 
        className="relative p-5 sm:p-6 rounded-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(26, 40, 71, 0.6) 0%, rgba(44, 62, 90, 0.4) 100%)',
          border: '1px solid rgba(212, 175, 55, 0.15)',
        }}
      >
        {/* Hover glow */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: 'radial-gradient(circle at center, rgba(212, 175, 55, 0.08) 0%, transparent 70%)',
          }}
        />
        
        {/* Feature Title */}
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-white font-semibold text-sm sm:text-base">{data.feature}</h4>
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ delay: 0.5 + index * 0.1, type: 'spring' }}
            className="flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/20 border border-green-500/30"
          >
            <TrendingUp className="w-3 h-3 text-green-400" />
            <span className="text-green-400 text-xs font-bold">
              {data.inverse ? `-${improvement}%` : `+${improvement > 1000 ? '1000' : improvement}%`}
            </span>
          </motion.div>
        </div>
        
        {/* Bars */}
        <div className="space-y-3">
          <AnimatedBar 
            value={data.traditional} 
            maxValue={maxValue} 
            color="linear-gradient(90deg, #ef4444, #dc2626)"
            delay={0.2 + index * 0.1}
            isInView={isInView}
            label={`Traditional: ${data.traditionalLabel}`}
          />
          <AnimatedBar 
            value={data.drishti} 
            maxValue={maxValue} 
            color="linear-gradient(90deg, #D4AF37, #F4E4C1)"
            delay={0.4 + index * 0.1}
            isInView={isInView}
            label={`Drishti AI: ${data.drishtiLabel}`}
          />
        </div>
        
        {/* Corner accent */}
        <div className="absolute top-2 right-2 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <svg viewBox="0 0 32 32" className="w-full h-full">
            <motion.path
              d="M 30 2 L 30 12 M 30 2 L 20 2"
              stroke="rgba(212, 175, 55, 0.6)"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileHover={{ pathLength: 1 }}
              transition={{ duration: 0.3 }}
            />
          </svg>
        </div>
      </div>
    </motion.div>
  );
};

// Quick Stat Pill
const QuickStatPill = ({ stat, index, isInView }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
      className="flex items-center gap-3 px-4 py-3 rounded-xl bg-navy-800/40 border border-white/5"
    >
      <div className="flex-1">
        <p className="text-xs text-[#8BA3C7] mb-1">{stat.label}</p>
        <div className="flex items-center gap-3">
          <span className="text-red-400/80 text-sm line-through">{stat.traditional}</span>
          <ArrowRight className="w-3 h-3 text-gold-500" />
          <span className="text-gold-400 font-semibold text-sm flex items-center gap-1">
            {stat.good && <Check className="w-3 h-3 text-green-400" />}
            {stat.drishti}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

const Comparison = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="comparison"
      ref={sectionRef}
      className="relative py-20 sm:py-28 overflow-hidden"
      style={{ backgroundColor: '#0A1628' }}
    >
      {/* Animated Background Grid */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(212, 175, 55, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(212, 175, 55, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
          animate={{ 
            backgroundPosition: ['0px 0px', '60px 60px'],
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: 'linear' 
          }}
        />
        
        {/* Floating orbs */}
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, transparent 70%)',
          }}
          animate={{ 
            y: [0, -30, 0],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-48 h-48 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(212, 175, 55, 0.08) 0%, transparent 70%)',
          }}
          animate={{ 
            y: [0, 20, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          {/* Badge with pulse */}
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-navy-800/60 border border-gold-500/20 mb-4 sm:mb-6"
            animate={{ boxShadow: ['0 0 0 0 rgba(212, 175, 55, 0)', '0 0 0 8px rgba(212, 175, 55, 0.1)', '0 0 0 0 rgba(212, 175, 55, 0)'] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.span 
              className="w-2 h-2 rounded-full bg-gold-500"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="text-gold-300 text-xs sm:text-sm font-medium">
              The Clear Advantage
            </span>
          </motion.div>

          {/* Title with gradient animation */}
          <h2 className="font-bold text-white mb-4 text-2xl sm:text-4xl lg:text-5xl">
            Traditional vs{' '}
            <motion.span 
              className="gradient-text inline-block"
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
              style={{
                backgroundSize: '200% auto',
              }}
            >
              Drishti AI
            </motion.span>
          </h2>

          <p className="text-[#8BA3C7] text-base sm:text-lg max-w-2xl mx-auto">
            See why leading organizations are switching to AI-powered road monitoring
          </p>

          {/* Animated underline */}
          <motion.div
            className="mt-6 mx-auto h-0.5 bg-gradient-to-r from-transparent via-gold-500 to-transparent"
            initial={{ width: 0 }}
            animate={isInView ? { width: 96 } : { width: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          />
        </motion.div>

        {/* Comparison Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8">
          {comparisonData.map((data, index) => (
            <ComparisonCard 
              key={data.feature}
              data={data}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Quick Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10"
        >
          {quickStats.map((stat, index) => (
            <QuickStatPill key={stat.label} stat={stat} index={index} isInView={isInView} />
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Comparison;
