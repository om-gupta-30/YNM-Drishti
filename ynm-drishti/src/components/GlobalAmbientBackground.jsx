import { memo, useEffect, useRef } from 'react';

/* ═══════════════════════════════════════════════════════════════════════
   PARTICLE COLORS — Gold and blue theme
   ═══════════════════════════════════════════════════════════════════════ */
const PARTICLE_COLORS = [
  { bg: 'rgba(255,215,0,0.12)',  shadow: 'rgba(255,215,0,0.25)' },   // gold
  { bg: 'rgba(30,144,255,0.10)', shadow: 'rgba(30,144,255,0.22)' },  // blue
  { bg: 'rgba(230,184,0,0.11)', shadow: 'rgba(230,184,0,0.23)' },    // dark gold
  { bg: 'rgba(14,165,233,0.09)', shadow: 'rgba(14,165,233,0.20)' },  // sky blue
  { bg: 'rgba(255,200,87,0.10)', shadow: 'rgba(255,200,87,0.22)' },  // warm gold
  { bg: 'rgba(37,99,235,0.09)',  shadow: 'rgba(37,99,235,0.20)' },   // deep blue
];

/* ═══════════════════════════════════════════════════════════════════════
   FLOATING PARTICLES — Slow floating ambient particles on sides
   Uses Web Animations API for smooth, GPU-accelerated animations
   ═══════════════════════════════════════════════════════════════════════ */
const FloatingParticles = memo(() => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const COUNT = 32;
    const nodes = [];

    for (let i = 0; i < COUNT; i++) {
      const dot = document.createElement('div');

      /* Distribute to left (0-30%) or right (70-100%) — avoid centre */
      const side = i < COUNT / 2 ? 'left' : 'right';
      const x = side === 'left'
        ? 2 + Math.random() * 28
        : 70 + Math.random() * 28;
      const y = 5 + Math.random() * 90;

      /* Varied sizes: small (2-3px), medium (4-6px), large (7-9px) */
      const sizeClass = i % 3;
      const size = sizeClass === 0 ? 2 + Math.random() * 1.5
                 : sizeClass === 1 ? 4 + Math.random() * 2
                 : 7 + Math.random() * 2;

      const colorSet = PARTICLE_COLORS[i % PARTICLE_COLORS.length];

      dot.style.cssText = `
        position: absolute;
        left: ${x}%;
        top: ${y}%;
        width: ${size}px;
        height: ${size}px;
        background: ${colorSet.bg};
        border-radius: 50%;
        pointer-events: none;
        will-change: transform, opacity;
        transform: translateZ(0);
        box-shadow: 0 0 ${size * 2}px ${colorSet.shadow};
      `;

      el.appendChild(dot);
      nodes.push(dot);

      /* Slow, gentle float animation per particle */
      const driftY = 25 + Math.random() * 50;
      const driftX = 10 + Math.random() * 20;
      const dur = 12000 + Math.random() * 16000; // Slower: 12-28 seconds
      const delay = Math.random() * -dur;
      const direction = Math.random() > 0.5 ? 1 : -1;

      dot.animate([
        { transform: `translate3d(0, 0, 0)`,                                           opacity: 0.3 },
        { transform: `translate3d(${driftX * direction}px, ${-driftY * 0.4}px, 0)`,   opacity: 0.8, offset: 0.3 },
        { transform: `translate3d(${driftX * direction * 0.5}px, ${-driftY * 0.8}px, 0)`, opacity: 1,   offset: 0.5 },
        { transform: `translate3d(${-driftX * direction * 0.3}px, ${-driftY}px, 0)`,  opacity: 0.6, offset: 0.75 },
        { transform: `translate3d(0, 0, 0)`,                                           opacity: 0.3 },
      ], {
        duration: dur,
        iterations: Infinity,
        easing: 'ease-in-out',
        delay,
      });
    }

    return () => { nodes.forEach((d) => d.remove()); };
  }, []);

  return (
    <div
      ref={ref}
      className="absolute inset-0 pointer-events-none"
      style={{ contain: 'layout style' }}
    />
  );
});
FloatingParticles.displayName = 'FloatingParticles';

/* ═══════════════════════════════════════════════════════════════════════
   GLOBAL AMBIENT BACKGROUND — Full-page background with depth lighting
   Positioned behind all content with fixed positioning
   ═══════════════════════════════════════════════════════════════════════ */
const GlobalAmbientBackground = memo(() => {
  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -1 }}
      aria-hidden="true"
    >
      {/* ══════════════════════════════════════════════════════════════
          BASE: Pure black background
          ══════════════════════════════════════════════════════════════ */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: '#000000' }}
      />

      {/* ══════════════════════════════════════════════════════════════
          AMBIENT LAYER: Gold and blue depth lighting gradients
          Uses only CSS gradients — no blur filters for performance
          ══════════════════════════════════════════════════════════════ */}
      <div className="absolute inset-0">
        {/* Left side gold ambient glow - primary depth lighting */}
        <div
          className="absolute"
          style={{
            top: '0%',
            left: '-15%',
            width: '55%',
            height: '100%',
            background: 'radial-gradient(ellipse 90% 70% at 15% 50%, rgba(255,215,0,0.12) 0%, rgba(255,215,0,0.05) 35%, rgba(230,184,0,0.02) 55%, transparent 75%)',
          }}
        />
        
        {/* Right side blue ambient glow - primary depth lighting */}
        <div
          className="absolute"
          style={{
            top: '0%',
            right: '-15%',
            width: '55%',
            height: '100%',
            background: 'radial-gradient(ellipse 90% 70% at 85% 50%, rgba(30,144,255,0.10) 0%, rgba(30,144,255,0.04) 35%, rgba(14,165,233,0.015) 55%, transparent 75%)',
          }}
        />
        
        {/* Top-left corner gold accent - adds dimension */}
        <div
          className="absolute"
          style={{
            top: '-10%',
            left: '-10%',
            width: '50%',
            height: '50%',
            background: 'radial-gradient(ellipse 80% 80% at 0% 0%, rgba(255,215,0,0.09) 0%, rgba(230,184,0,0.03) 45%, transparent 70%)',
          }}
        />
        
        {/* Top-right corner subtle blue wash */}
        <div
          className="absolute"
          style={{
            top: '-5%',
            right: '-5%',
            width: '40%',
            height: '40%',
            background: 'radial-gradient(ellipse 70% 70% at 100% 0%, rgba(30,144,255,0.06) 0%, rgba(14,165,233,0.02) 50%, transparent 70%)',
          }}
        />
        
        {/* Bottom-left corner gold accent */}
        <div
          className="absolute"
          style={{
            bottom: '-5%',
            left: '-5%',
            width: '40%',
            height: '40%',
            background: 'radial-gradient(ellipse 70% 70% at 0% 100%, rgba(255,200,87,0.07) 0%, rgba(230,184,0,0.02) 50%, transparent 70%)',
          }}
        />
        
        {/* Bottom-right corner blue accent - adds dimension */}
        <div
          className="absolute"
          style={{
            bottom: '-10%',
            right: '-10%',
            width: '55%',
            height: '55%',
            background: 'radial-gradient(ellipse 80% 80% at 100% 100%, rgba(30,144,255,0.08) 0%, rgba(14,165,233,0.025) 45%, transparent 70%)',
          }}
        />
        
        {/* Center depth gradients - subtle gold and blue interplay */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 65% 45% at 20% 30%, rgba(255,215,0,0.04) 0%, transparent 60%),
              radial-gradient(ellipse 60% 40% at 80% 70%, rgba(30,144,255,0.035) 0%, transparent 60%),
              radial-gradient(ellipse 50% 35% at 30% 75%, rgba(230,184,0,0.025) 0%, transparent 55%),
              radial-gradient(ellipse 45% 30% at 70% 25%, rgba(14,165,233,0.02) 0%, transparent 55%)
            `,
          }}
        />
        
        {/* Edge vignette for depth - very subtle darkening at edges */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 40%, rgba(0,0,0,0.15) 100%)',
          }}
        />
      </div>

      {/* ══════════════════════════════════════════════════════════════
          FLOATING PARTICLES: Slow ambient particles on sides
          ══════════════════════════════════════════════════════════════ */}
      <FloatingParticles />
    </div>
  );
});
GlobalAmbientBackground.displayName = 'GlobalAmbientBackground';

export default GlobalAmbientBackground;
