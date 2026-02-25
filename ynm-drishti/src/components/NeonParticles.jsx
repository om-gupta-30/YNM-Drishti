import { memo } from 'react';
import { motion } from 'framer-motion';

// Particle configurations - predefined positions for performance
const particles = [
  { x: 5, y: 15, size: 3, color: '#D4AF37', delay: 0, duration: 4 },
  { x: 12, y: 45, size: 2, color: '#3B82F6', delay: 0.5, duration: 5 },
  { x: 20, y: 75, size: 4, color: '#D4AF37', delay: 1, duration: 4.5 },
  { x: 28, y: 25, size: 2, color: '#10B981', delay: 1.5, duration: 5.5 },
  { x: 35, y: 60, size: 3, color: '#D4AF37', delay: 0.3, duration: 4 },
  { x: 42, y: 85, size: 2, color: '#8B5CF6', delay: 2, duration: 5 },
  { x: 50, y: 35, size: 4, color: '#3B82F6', delay: 0.8, duration: 4.5 },
  { x: 58, y: 70, size: 2, color: '#D4AF37', delay: 1.2, duration: 5 },
  { x: 65, y: 20, size: 3, color: '#10B981', delay: 0.6, duration: 4 },
  { x: 72, y: 55, size: 2, color: '#D4AF37', delay: 1.8, duration: 5.5 },
  { x: 80, y: 80, size: 4, color: '#3B82F6', delay: 0.4, duration: 4.5 },
  { x: 87, y: 40, size: 2, color: '#8B5CF6', delay: 2.2, duration: 5 },
  { x: 93, y: 65, size: 3, color: '#D4AF37', delay: 1.1, duration: 4 },
  { x: 8, y: 90, size: 2, color: '#10B981', delay: 0.9, duration: 5.5 },
  { x: 95, y: 10, size: 3, color: '#D4AF37', delay: 1.6, duration: 4.5 },
];

const NeonParticle = memo(({ particle }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{
      left: `${particle.x}%`,
      top: `${particle.y}%`,
      width: particle.size,
      height: particle.size,
      background: particle.color,
      boxShadow: `0 0 ${particle.size * 3}px ${particle.color}, 0 0 ${particle.size * 6}px ${particle.color}50`,
    }}
    animate={{
      y: [0, -40, 0],
      x: [0, particle.x % 2 === 0 ? 15 : -15, 0],
      opacity: [0.3, 0.8, 0.3],
      scale: [1, 1.5, 1],
    }}
    transition={{
      duration: particle.duration,
      repeat: Infinity,
      delay: particle.delay,
      ease: 'easeInOut',
    }}
  />
));

NeonParticle.displayName = 'NeonParticle';

// Floating line particles
const lineParticles = [
  { x: 10, y: 30, width: 40, angle: 45, color: '#D4AF37', delay: 0 },
  { x: 85, y: 50, width: 30, angle: -30, color: '#3B82F6', delay: 1 },
  { x: 25, y: 70, width: 35, angle: 60, color: '#D4AF37', delay: 2 },
  { x: 70, y: 20, width: 25, angle: -45, color: '#10B981', delay: 0.5 },
  { x: 50, y: 85, width: 45, angle: 30, color: '#D4AF37', delay: 1.5 },
];

const NeonLine = memo(({ line }) => (
  <motion.div
    className="absolute pointer-events-none"
    style={{
      left: `${line.x}%`,
      top: `${line.y}%`,
      width: line.width,
      height: 1,
      background: `linear-gradient(90deg, transparent, ${line.color}, transparent)`,
      transform: `rotate(${line.angle}deg)`,
      boxShadow: `0 0 10px ${line.color}50`,
    }}
    animate={{
      opacity: [0, 0.6, 0],
      scaleX: [0, 1, 0],
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      delay: line.delay,
      ease: 'easeInOut',
    }}
  />
));

NeonLine.displayName = 'NeonLine';

const NeonParticles = memo(() => {
  return (
    <div 
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 1 }}
    >
      {/* Dot particles */}
      {particles.map((particle, index) => (
        <NeonParticle key={`particle-${index}`} particle={particle} />
      ))}
      
      {/* Line particles */}
      {lineParticles.map((line, index) => (
        <NeonLine key={`line-${index}`} line={line} />
      ))}
      
      {/* Large glow orbs */}
      <motion.div
        className="absolute w-32 h-32 rounded-full pointer-events-none"
        style={{
          left: '10%',
          top: '20%',
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      <motion.div
        className="absolute w-40 h-40 rounded-full pointer-events-none"
        style={{
          right: '15%',
          top: '60%',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
});

NeonParticles.displayName = 'NeonParticles';

export default NeonParticles;
