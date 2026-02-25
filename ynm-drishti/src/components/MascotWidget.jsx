import { motion } from 'framer-motion';

const MascotWidget = () => {
  return (
    <motion.div
      className="fixed top-28 sm:top-32 right-4 sm:right-6 z-[100]"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
    >
      {/* Mascot Image */}
      <motion.div
        className="relative"
        animate={{
          y: [0, -5, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {/* Glow effect */}
        <div 
          className="absolute inset-0 rounded-full blur-xl opacity-50"
          style={{
            background: 'radial-gradient(circle, rgba(212, 175, 55, 0.4) 0%, transparent 70%)',
          }}
        />
        <img
          src="/mascot.png"
          alt="YNM Drishti Mascot"
          className="w-16 h-16 sm:w-20 sm:h-20 object-contain relative z-10"
          style={{
            filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3))',
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default MascotWidget;
