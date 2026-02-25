import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  
  // Smooth spring animation for the progress bar
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 z-[100] origin-left"
        style={{
          scaleX,
          background: 'linear-gradient(90deg, #D4AF37, #F4E4C1, #D4AF37)',
          boxShadow: '0 0 10px rgba(212, 175, 55, 0.5)',
        }}
      />
      
      {/* Glow effect */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-2 z-[99] origin-left pointer-events-none"
        style={{
          scaleX,
          background: 'linear-gradient(90deg, rgba(212, 175, 55, 0.3), rgba(244, 228, 193, 0.3), rgba(212, 175, 55, 0.3))',
          filter: 'blur(4px)',
        }}
      />
    </>
  );
};

export default ScrollProgress;
