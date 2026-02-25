import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { DollarSign, Shield, BarChart3, Zap, CheckCircle } from 'lucide-react';

const benefits = [
  {
    icon: DollarSign,
    title: 'Cost Efficiency',
    points: [
      'Reduce manual inspection costs by 80%',
      'Optimize maintenance budgets with predictive analytics',
    ],
    direction: 'left',
  },
  {
    icon: Shield,
    title: 'Safety First',
    points: [
      'No need to stop traffic for inspections',
      'Identify hazards before they cause accidents',
    ],
    direction: 'right',
  },
  {
    icon: BarChart3,
    title: 'Data-Driven Decisions',
    points: [
      'Comprehensive reports with GPS mapping',
      'Track infrastructure lifecycle and ROI',
    ],
    direction: 'left',
  },
  {
    icon: Zap,
    title: 'Scalable Solution',
    points: [
      'Cover 1000+ km of roads per day',
      'Easy integration with existing fleet vehicles',
    ],
    direction: 'right',
  },
];

const BenefitCard = ({ benefit, index, isInView }) => {
  const isLeft = benefit.direction === 'left';
  
  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        x: isLeft ? -40 : 40,
        scale: 0.95 
      }}
      animate={isInView ? { 
        opacity: 1, 
        x: 0,
        scale: 1 
      } : { 
        opacity: 0, 
        x: isLeft ? -40 : 40,
        scale: 0.95 
      }}
      transition={{ 
        duration: 0.7, 
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className="group relative"
    >
      {/* Gradient Border Container */}
      <div 
        className="relative p-[2px] rounded-xl sm:rounded-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.5) 0%, rgba(212, 175, 55, 0.1) 50%, transparent 100%)',
        }}
      >
        {/* Hover glow border */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.8) 0%, rgba(212, 175, 55, 0.4) 50%, rgba(212, 175, 55, 0.2) 100%)',
          }}
        />
        
        {/* Card Content */}
        <motion.div
          className="relative rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-8 h-full"
          style={{
            background: 'linear-gradient(135deg, rgba(10, 22, 40, 0.95) 0%, rgba(26, 40, 71, 0.9) 100%)',
          }}
          whileHover={{ y: -8 }}
          transition={{ duration: 0.3 }}
        >
          {/* Background Pattern */}
          <div 
            className="absolute inset-0 opacity-[0.03] rounded-2xl overflow-hidden"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(212, 175, 55, 0.5) 1px, transparent 0)`,
              backgroundSize: '24px 24px',
            }}
          />

          {/* Glow effect on hover */}
          <motion.div
            className="absolute -inset-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at center, rgba(212, 175, 55, 0.15) 0%, transparent 70%)',
            }}
          />

          {/* Icon Container with bounce on scroll */}
          <motion.div
            className="relative mb-4 sm:mb-6"
            initial={{ scale: 0.5, y: 20, rotate: -10 }}
            animate={isInView ? { scale: 1, y: 0, rotate: 0 } : { scale: 0.5, y: 20, rotate: -10 }}
            whileHover={{ rotate: 5, scale: 1.1 }}
            transition={{ 
              type: 'spring', 
              stiffness: 300,
              damping: 15,
              delay: index * 0.1,
            }}
          >
            <div 
              className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-xl sm:rounded-2xl flex items-center justify-center relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(212, 175, 55, 0.05) 100%)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
              }}
            >
              {/* Icon glow */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: 'radial-gradient(circle at center, rgba(212, 175, 55, 0.3) 0%, transparent 70%)',
                }}
              />
              
              <benefit.icon 
                className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-gold-500 relative z-10"
                strokeWidth={1.5}
                style={{
                  filter: 'drop-shadow(0 0 10px rgba(212, 175, 55, 0.5))',
                }}
              />
            </div>

            {/* Decorative corner */}
            <div 
              className="hidden sm:block absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-gold-500/50 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
          </motion.div>

          {/* Title */}
          <h3 className="text-white font-bold mb-4 sm:mb-6 group-hover:text-gold-300 transition-colors duration-300 text-xl sm:text-2xl lg:text-[28px]">
            {benefit.title}
          </h3>

          {/* Bullet Points */}
          <div className="space-y-3 sm:space-y-4">
            {benefit.points.map((point, idx) => (
              <motion.div
                key={idx}
                className="flex items-start gap-2 sm:gap-3"
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                transition={{ delay: index * 0.15 + idx * 0.1 + 0.3 }}
              >
                <div className="mt-0.5 sm:mt-1 flex-shrink-0">
                  <CheckCircle 
                    className="w-4 h-4 sm:w-5 sm:h-5 text-gold-500"
                    style={{
                      filter: 'drop-shadow(0 0 6px rgba(212, 175, 55, 0.4))',
                    }}
                  />
                </div>
                <p className="text-[#8BA3C7] leading-relaxed text-sm sm:text-base lg:text-lg">
                  {point}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Bottom accent line */}
          <motion.div
            className="absolute bottom-0 left-5 right-5 sm:left-8 sm:right-8 h-0.5 bg-gradient-to-r from-transparent via-gold-500/50 to-transparent opacity-0 group-hover:opacity-100"
            initial={{ scaleX: 0 }}
            whileHover={{ scaleX: 1 }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>
      </div>

      {/* External glow shadow on hover */}
      <motion.div
        className="absolute -inset-2 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
        style={{
          boxShadow: '0 20px 60px rgba(212, 175, 55, 0.2), 0 8px 25px rgba(212, 175, 55, 0.15)',
        }}
      />
    </motion.div>
  );
};

const Benefits = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={sectionRef}
      className="relative py-24 sm:py-32 overflow-hidden"
      style={{ backgroundColor: '#0A1628' }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0">
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(212, 175, 55, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(212, 175, 55, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
        
        {/* Radial gradients */}
        <div 
          className="absolute top-0 left-0 w-1/2 h-1/2 rounded-full"
          style={{
            background: 'radial-gradient(circle at 20% 20%, rgba(212, 175, 55, 0.05) 0%, transparent 50%)',
          }}
        />
        <div 
          className="absolute bottom-0 right-0 w-1/2 h-1/2 rounded-full"
          style={{
            background: 'radial-gradient(circle at 80% 80%, rgba(212, 175, 55, 0.05) 0%, transparent 50%)',
          }}
        />
        
        {/* Static decorative orbs - optimized for performance */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-gold-500/5 blur-[80px]" />
        <div className="absolute bottom-1/4 left-1/4 w-48 h-48 rounded-full bg-navy-600/30 blur-[60px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 sm:mb-16"
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
              Value Proposition
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
            Why Choose{' '}
            <span className="gradient-text" style={{ textShadow: '0 0 60px rgba(212, 175, 55, 0.5)' }}>
              YNM Drishti
            </span>
            ?
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-[#8BA3C7] text-base sm:text-lg max-w-2xl mx-auto px-4"
          >
            Transform your road infrastructure management with our{' '}
            <span className="text-gold-300">industry-leading AI solution</span>
          </motion.p>

          {/* Decorative Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-6 sm:mt-8 mx-auto w-24 sm:w-32 h-0.5 bg-gradient-to-r from-transparent via-gold-500 to-transparent"
          />
        </motion.div>

        {/* Benefits Grid - 2x2 on desktop, 1 column on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {benefits.map((benefit, index) => (
            <BenefitCard 
              key={benefit.title} 
              benefit={benefit} 
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Benefits;
