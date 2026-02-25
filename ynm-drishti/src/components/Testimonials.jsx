import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    name: 'Rajesh Kumar',
    role: 'Chief Engineer',
    company: 'National Highways Authority',
    quote: 'YNM Drishti reduced our inspection time by 75% while improving accuracy. We now cover 500km daily instead of 50km with manual surveys.',
    rating: 5,
    stat: 75,
    statSuffix: '%',
    statLabel: 'Time Saved',
    color: '#10B981',
  },
  {
    name: 'Priya Sharma',
    role: 'Smart City Director',
    company: 'Pune Municipal Corporation',
    quote: 'The real-time detection and GPS mapping have transformed how we prioritize road repairs. Citizen complaints have dropped by 60%.',
    rating: 5,
    stat: 60,
    statSuffix: '%',
    statLabel: 'Fewer Complaints',
    color: '#3B82F6',
  },
  {
    name: 'Amit Patel',
    role: 'Operations Head',
    company: 'L&T Infrastructure',
    quote: 'Integration was seamless. The API works perfectly with our existing fleet management system. ROI was achieved within 3 months.',
    rating: 5,
    stat: 3,
    statSuffix: '',
    statLabel: 'Months to ROI',
    color: '#F59E0B',
  },
];

// Animated Counter that counts up
const AnimatedStat = ({ value, suffix, isActive }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!isActive) {
      setCount(0);
      return;
    }
    
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
  }, [isActive, value]);
  
  return <span>{count}{suffix}</span>;
};

// Typing effect for quotes
const TypeWriter = ({ text, isActive, speed = 30 }) => {
  const [displayText, setDisplayText] = useState('');
  
  useEffect(() => {
    if (!isActive) {
      setDisplayText('');
      return;
    }
    
    let index = 0;
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, speed);
    
    return () => clearInterval(timer);
  }, [isActive, text, speed]);
  
  return (
    <span>
      {displayText}
      {displayText.length < text.length && (
        <motion.span
          className="inline-block w-0.5 h-5 bg-gold-500 ml-1"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        />
      )}
    </span>
  );
};

// Animated ring around avatar
const PulsingRing = ({ color }) => (
  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
    <motion.circle
      cx="50"
      cy="50"
      r="45"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeDasharray="283"
      initial={{ strokeDashoffset: 283, opacity: 0.3 }}
      animate={{ 
        strokeDashoffset: [283, 0],
        opacity: [0.3, 0.8, 0.3],
      }}
      transition={{ 
        duration: 3,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  </svg>
);

// Star rating with animation
const AnimatedStars = ({ rating, delay = 0, isActive }) => {
  return (
    <div className="flex gap-1">
      {[...Array(rating)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={isActive ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0.3, scale: 0.8, rotate: 0 }}
          transition={{ 
            delay: delay + i * 0.1, 
            type: 'spring',
            stiffness: 300,
            damping: 15
          }}
        >
          <Star className="w-4 h-4 sm:w-5 sm:h-5 text-gold-500 fill-gold-500" />
        </motion.div>
      ))}
    </div>
  );
};

// Background particles
const Particles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 rounded-full"
        style={{
          left: `${5 + (i * 5)}%`,
          top: `${10 + (i % 4) * 25}%`,
          background: i % 2 === 0 ? '#D4AF37' : '#3B82F6',
        }}
        animate={{
          y: [0, -30, 0],
          x: [0, (i % 2 === 0 ? 10 : -10), 0],
          opacity: [0.2, 0.6, 0.2],
          scale: [1, 1.5, 1],
        }}
        transition={{
          duration: 4 + (i % 3),
          repeat: Infinity,
          delay: i * 0.2,
          ease: 'easeInOut',
        }}
      />
    ))}
  </div>
);

// Bottom stat counter synchronized with testimonials
const SyncedStatCounter = ({ value, suffix, cycle }) => {
  const [count, setCount] = useState(0);
  const numericValue = parseInt(value.replace(/\D/g, ''));
  
  useEffect(() => {
    setCount(0);
    const duration = 1500;
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      
      setCount(Math.floor(eased * numericValue));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [cycle, numericValue]);
  
  return <span>{count}{suffix}</span>;
};

const Testimonials = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Auto-rotate testimonials every 5 seconds
  useEffect(() => {
    if (!isInView) return;
    
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(timer);
  }, [isInView]);
  
  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const activeTestimonial = testimonials[activeIndex];

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative py-20 sm:py-28 overflow-hidden"
      style={{ backgroundColor: '#0A1628' }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient orbs */}
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full"
          style={{
            background: `radial-gradient(circle, ${activeTestimonial.color}15 0%, transparent 70%)`,
          }}
          animate={{ 
            scale: [1, 1.3, 1],
            x: [0, 50, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, transparent 70%)',
          }}
          animate={{ 
            scale: [1.2, 1, 1.2],
            x: [0, -30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        
        {/* Particles */}
        <Particles />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(212, 175, 55, 0.5) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
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
          {/* Badge */}
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-navy-800/60 border border-gold-500/30 mb-6"
            animate={{ 
              boxShadow: ['0 0 20px rgba(212, 175, 55, 0)', '0 0 30px rgba(212, 175, 55, 0.3)', '0 0 20px rgba(212, 175, 55, 0)'],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-2 h-2 rounded-full bg-gold-500"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <span className="text-gold-300 text-sm font-medium">
              Customer Success Stories
            </span>
          </motion.div>

          <h2 className="font-bold text-white mb-4 text-3xl sm:text-4xl lg:text-5xl">
            Trusted by{' '}
            <motion.span 
              className="gradient-text"
              animate={{ 
                textShadow: ['0 0 20px rgba(212, 175, 55, 0.3)', '0 0 40px rgba(212, 175, 55, 0.6)', '0 0 20px rgba(212, 175, 55, 0.3)'],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Industry Leaders
            </motion.span>
          </h2>
        </motion.div>

        {/* Main Testimonial Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          {/* Large Quote Background */}
          <div className="absolute -top-10 left-10 opacity-5 pointer-events-none">
            <Quote className="w-40 h-40 text-gold-500" />
          </div>
          
          {/* Card */}
          <div 
            className="relative rounded-3xl p-8 sm:p-12 overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(26, 40, 71, 0.8) 0%, rgba(44, 62, 90, 0.6) 100%)',
              border: '1px solid rgba(212, 175, 55, 0.2)',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
            }}
          >
            {/* Animated border glow */}
            <motion.div
              className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{
                border: `2px solid ${activeTestimonial.color}`,
                opacity: 0.3,
              }}
              animate={{
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            
            {/* Content Grid */}
            <div className="grid lg:grid-cols-3 gap-8 items-center">
              {/* Left: Avatar & Info */}
              <div className="text-center lg:text-left">
                {/* Animated Avatar */}
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 mx-auto lg:mx-0 mb-6">
                  <PulsingRing color={activeTestimonial.color} />
                  <motion.div 
                    className="absolute inset-2 rounded-full flex items-center justify-center text-3xl font-bold"
                    style={{
                      background: `linear-gradient(135deg, ${activeTestimonial.color}30 0%, ${activeTestimonial.color}10 100%)`,
                      border: `2px solid ${activeTestimonial.color}50`,
                    }}
                    key={activeIndex}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  >
                    <span style={{ color: activeTestimonial.color }}>
                      {activeTestimonial.name.charAt(0)}
                    </span>
                  </motion.div>
                </div>
                
                {/* Name & Role */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h4 className="text-white font-bold text-xl mb-1">
                      {activeTestimonial.name}
                    </h4>
                    <p className="text-gold-400 text-sm mb-1">
                      {activeTestimonial.role}
                    </p>
                    <p className="text-[#8BA3C7] text-sm">
                      {activeTestimonial.company}
                    </p>
                  </motion.div>
                </AnimatePresence>
                
                {/* Stars */}
                <div className="mt-4 flex justify-center lg:justify-start">
                  <AnimatedStars 
                    rating={activeTestimonial.rating} 
                    isActive={true}
                    delay={0.3}
                  />
                </div>
              </div>
              
              {/* Center: Quote */}
              <div className="lg:col-span-1">
                <div className="relative">
                  <Quote className="absolute -top-2 -left-2 w-8 h-8 text-gold-500/30" />
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={activeIndex}
                      className="text-[#C5D5EA] text-lg sm:text-xl leading-relaxed pl-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <TypeWriter 
                        text={activeTestimonial.quote} 
                        isActive={true}
                        speed={25}
                      />
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>
              
              {/* Right: Stat */}
              <div className="text-center">
                <motion.div
                  key={activeIndex}
                  className="relative inline-block"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                >
                  {/* Stat circle */}
                  <div 
                    className="w-36 h-36 sm:w-44 sm:h-44 rounded-full flex flex-col items-center justify-center relative"
                    style={{
                      background: `conic-gradient(${activeTestimonial.color} 0deg, ${activeTestimonial.color}50 180deg, transparent 180deg)`,
                      padding: '4px',
                    }}
                  >
                    <div 
                      className="w-full h-full rounded-full flex flex-col items-center justify-center"
                      style={{ background: '#0A1628' }}
                    >
                      <motion.span 
                        className="text-4xl sm:text-5xl font-bold"
                        style={{ color: activeTestimonial.color }}
                      >
                        <AnimatedStat 
                          value={activeTestimonial.stat} 
                          suffix={activeTestimonial.statSuffix}
                          isActive={true}
                        />
                      </motion.span>
                      <span className="text-[#8BA3C7] text-sm mt-1">
                        {activeTestimonial.statLabel}
                      </span>
                    </div>
                  </div>
                  
                  {/* Orbiting dot */}
                  <motion.div
                    className="absolute w-3 h-3 rounded-full"
                    style={{ 
                      background: activeTestimonial.color,
                      boxShadow: `0 0 10px ${activeTestimonial.color}`,
                      top: '50%',
                      left: '50%',
                      transformOrigin: '-70px 0',
                    }}
                    animate={{
                      rotate: 360,
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            {/* Prev Button */}
            <motion.button
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full flex items-center justify-center border border-gold-500/30 text-gold-500 hover:bg-gold-500/10 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
            
            {/* Dots */}
            <div className="flex gap-3">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className="relative"
                  whileHover={{ scale: 1.2 }}
                >
                  <motion.div
                    className="w-3 h-3 rounded-full"
                    style={{
                      background: index === activeIndex ? testimonials[index].color : 'rgba(255,255,255,0.2)',
                    }}
                    animate={index === activeIndex ? {
                      boxShadow: [`0 0 0 0 ${testimonials[index].color}50`, `0 0 0 8px transparent`],
                    } : {}}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                  {/* Progress ring for active */}
                  {index === activeIndex && (
                    <svg className="absolute -inset-1 w-5 h-5" viewBox="0 0 20 20">
                      <motion.circle
                        key={activeIndex}
                        cx="10"
                        cy="10"
                        r="8"
                        fill="none"
                        stroke={testimonials[index].color}
                        strokeWidth="2"
                        strokeDasharray="50"
                        initial={{ strokeDashoffset: 50 }}
                        animate={{ strokeDashoffset: 0 }}
                        transition={{ duration: 5, ease: 'linear' }}
                      />
                    </svg>
                  )}
                </motion.button>
              ))}
            </div>
            
            {/* Next Button */}
            <motion.button
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full flex items-center justify-center border border-gold-500/30 text-gold-500 hover:bg-gold-500/10 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>

        {/* Bottom Stats Bar - Synced with testimonial changes */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-12 grid grid-cols-3 gap-4"
        >
          {[
            { value: '50', suffix: '+', label: 'Organizations' },
            { value: '10', suffix: 'K+', label: 'KM Monitored' },
            { value: '99', suffix: '%', label: 'Satisfaction' },
          ].map((item) => (
            <motion.div
              key={item.label}
              className="text-center py-4 px-2 rounded-xl"
              style={{
                background: 'linear-gradient(135deg, rgba(26, 40, 71, 0.5) 0%, rgba(44, 62, 90, 0.3) 100%)',
                border: '1px solid rgba(212, 175, 55, 0.1)',
              }}
              whileHover={{ 
                scale: 1.05,
                borderColor: 'rgba(212, 175, 55, 0.3)',
              }}
            >
              <div className="text-2xl sm:text-3xl font-bold gradient-text">
                <SyncedStatCounter 
                  value={item.value} 
                  suffix={item.suffix} 
                  cycle={activeIndex} 
                />
              </div>
              <div className="text-[#8BA3C7] text-xs sm:text-sm mt-1">{item.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
