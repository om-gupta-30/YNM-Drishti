import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const TiltCard = ({ 
  children, 
  className = '',
  tiltAmount = 10, // max tilt in degrees
  scale = 1.02,
  glareOpacity = 0.15,
  perspective = 1000,
  disabled = false,
  ...props 
}) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for smooth tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring config for smooth animation
  const springConfig = { stiffness: 300, damping: 30 };
  
  // Apply springs for smoother animation
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [tiltAmount, -tiltAmount]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-tiltAmount, tiltAmount]), springConfig);
  
  // Glare position
  const glareX = useSpring(useTransform(mouseX, [-0.5, 0.5], ['0%', '100%']), springConfig);
  const glareY = useSpring(useTransform(mouseY, [-0.5, 0.5], ['0%', '100%']), springConfig);

  const handleMouseMove = (e) => {
    if (disabled) return;
    
    const card = cardRef.current;
    if (!card) return;
    
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate position relative to center (-0.5 to 0.5)
    const x = (e.clientX - centerX) / rect.width;
    const y = (e.clientY - centerY) / rect.height;
    
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => {
    if (!disabled) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Reset to center
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative ${className}`}
      style={{
        perspective: `${perspective}px`,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <motion.div
        className="relative w-full h-full"
        style={{
          rotateX: disabled ? 0 : rotateX,
          rotateY: disabled ? 0 : rotateY,
          transformStyle: 'preserve-3d',
        }}
        animate={{
          scale: isHovered && !disabled ? scale : 1,
        }}
        transition={{ duration: 0.2 }}
      >
        {/* Card content */}
        {children}
        
        {/* Glare effect */}
        {!disabled && (
          <motion.div
            className="absolute inset-0 rounded-inherit pointer-events-none overflow-hidden"
            style={{
              opacity: isHovered ? glareOpacity : 0,
              borderRadius: 'inherit',
            }}
          >
            <motion.div
              className="absolute w-[200%] h-[200%]"
              style={{
                left: glareX,
                top: glareY,
                transform: 'translate(-50%, -50%)',
                background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 50%)',
              }}
            />
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default TiltCard;
