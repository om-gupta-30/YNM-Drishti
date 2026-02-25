import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { ArrowUp } from 'lucide-react';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Debounced scroll handler
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    setIsVisible(scrollY > 500);
  }, []);

  useEffect(() => {
    // Debounce scroll events for performance
    let timeoutId;
    const debouncedScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleScroll, 10);
    };

    window.addEventListener('scroll', debouncedScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', debouncedScroll);
      clearTimeout(timeoutId);
    };
  }, [handleScroll]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-14 h-14 rounded-full flex items-center justify-center z-50 group focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 focus:ring-offset-navy-900"
          style={{
            background: 'linear-gradient(135deg, #D4AF37 0%, #F4E4C1 100%)',
            boxShadow: '0 4px 20px rgba(212, 175, 55, 0.4)',
          }}
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          whileHover={{
            scale: 1.1,
            y: -5,
            boxShadow: '0 8px 30px rgba(212, 175, 55, 0.6)',
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-6 h-6 text-navy-900" />

          {/* Pulse ring */}
          <motion.div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{ border: '2px solid rgba(212, 175, 55, 0.5)' }}
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.6, 0, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;
