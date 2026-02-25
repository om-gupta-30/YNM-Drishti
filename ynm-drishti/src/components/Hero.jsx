import { useState, useEffect, useRef, useCallback, memo } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Camera, Shield, SignpostBig } from 'lucide-react';
import { useToast } from './ui/Toast';
import FloatingStats from './FloatingStats';

/* ═══════════════════════════════════════════════════════════════════════
   STATIC DATA  (module-level, zero per-render cost)
   ═══════════════════════════════════════════════════════════════════════ */
const COLORS = [
  { main: '#FFD700', glow: 'rgba(255,215,0,',  r: 255, g: 215, b: 0   },
  { main: '#1E90FF', glow: 'rgba(30,144,255,', r: 30,  g: 144, b: 255 },
  { main: '#E6B800', glow: 'rgba(230,184,0,',  r: 230, g: 184, b: 0   },
];

const ARC_GRADIENTS = [
  { id: 'arcGrad0', stops: [{ offset: '0%', color: '#FFD700' }, { offset: '50%', color: '#0EA5E9' }, { offset: '100%', color: '#1E90FF' }] },
  { id: 'arcGrad1', stops: [{ offset: '0%', color: '#FFC857' }, { offset: '40%', color: '#2563EB' }, { offset: '100%', color: '#E6B800' }] },
  { id: 'arcGrad2', stops: [{ offset: '0%', color: '#1E90FF' }, { offset: '50%', color: '#FFD700' }, { offset: '100%', color: '#00BFFF' }] },
];

const COLOR_PERMS = [
  [0, 1, 2], [0, 2, 1], [1, 0, 2],
  [1, 2, 0], [2, 0, 1], [2, 1, 0],
];

const WORDS = [
  'Neural AI', 'Smart Vision', '99.8% Accuracy',
  'Deep Learning', 'Real-Time Speed', 'Edge Computing',
];

/* ─── Pre-computed arc geometry (never recalculated) ──────────────── */
const ARC_CIRCUMFERENCE = 2 * Math.PI * 190;
const ARC_LEN           = ARC_CIRCUMFERENCE * (65 / 360);
const ARC_GAP           = ARC_CIRCUMFERENCE - ARC_LEN;
const ARC_DASH          = `${ARC_LEN} ${ARC_GAP}`;
const ARC_OFFSET_HIDDEN = String(ARC_LEN);
const CSS_EASE          = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';
const START_ANGLES      = [10, 133, 250];
const END_ANGLES        = [133, 255, 13];

/* Pre-built CSS filter — single drop-shadow (lighter than stacked layers) */
const STATIC_GLOW_FILTER =
  'drop-shadow(0 0 8px rgba(192,188,72,0.38))';

/* Timing (ms) */
const DRAW_MS = 1300;
const HOLD_MS = 1800;
const FADE_MS = 500;
const WAIT_MS = 300;

/* ─── Shared mutable state (zero React overhead) ─────────────────── */
const arcSlots = [null, null, null];
const heroState = {
  textIndex: 0,
  colors: [COLORS[0], COLORS[1], COLORS[2]],
  _listeners: new Set(),
};
function subscribe(fn)  { heroState._listeners.add(fn); return () => heroState._listeners.delete(fn); }
function notify()       { for (const fn of heroState._listeners) fn(heroState); }

/* Registry so ArcRing's single rAF drives icon updates too */
const iconUpdaters = new Set();

/* ─── Cached matchMedia (queried once, not per-mousemove) ────────── */
let _finePointer = null;
function hasFinePointer() {
  if (_finePointer === null) {
    const mq = window.matchMedia('(pointer: fine)');
    _finePointer = mq.matches;
    try { mq.addEventListener('change', (e) => { _finePointer = e.matches; }); } catch { /* noop */ }
  }
  return _finePointer;
}

/* ─── Hoisted Framer variants (never re-created) ─────────────────── */
const STAGGER_VARIANTS = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
};
const FADE_UP_VARIANTS = {
  hidden:  { opacity: 0, y: 30, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0,  filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};
const SPRING_CFG = { damping: 40, stiffness: 60 };

/* Pre-computed transition strings for arc draw */
const ARC_DRAW_TRANSITION = `stroke-dashoffset ${DRAW_MS}ms ${CSS_EASE}`;
const ARC_FADE_TRANSITION = `opacity ${FADE_MS}ms ease-in`;

/* ═══════════════════════════════════════════════════════════════════════
   ArcRing — single rAF drives arcs + icon updates
   ═══════════════════════════════════════════════════════════════════════ */
const ArcRing = () => {
  const ref = useRef(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const groups = container.querySelectorAll('.arc-group');
    const arcs = Array.from(groups).map((g) => ({
      main: g.querySelector('.arc-main'),
      glow: g.querySelector('.arc-glow'),
      group: g,
    }));
    if (arcs.length !== 3) return;

    /* One-time init — set static attributes */
    for (let i = 0; i < 3; i++) {
      const a = arcs[i];
      a.main.setAttribute('stroke-dasharray', ARC_DASH);
      a.glow.setAttribute('stroke-dasharray', ARC_DASH);
      a.group.setAttribute('transform', `rotate(${START_ANGLES[i]}, 200, 200)`);
      a.main.setAttribute('stroke', `url(#${ARC_GRADIENTS[i].id})`);
      a.glow.setAttribute('stroke', `url(#${ARC_GRADIENTS[i].id})`);
    }

    let permIdx = 0;
    let perm    = COLOR_PERMS[0];
    let phase   = 'draw';
    let raf     = 0;
    let phaseStart = 0;

    /* ── Start a new draw cycle ────────────────────────────────── */
    const startCycle = () => {
      /* Pick a different colour permutation */
      let next;
      do { next = Math.floor(Math.random() * COLOR_PERMS.length); } while (next === permIdx);
      permIdx = next;
      perm = COLOR_PERMS[permIdx];

      /* Advance word & notify React (one batch per cycle, not per frame) */
      heroState.textIndex = (heroState.textIndex + 1) % WORDS.length;
      heroState.colors = perm.map((ci) => COLORS[ci]);
      notify();

      /* Reset arcs to hidden (no transition) */
      for (let i = 0; i < 3; i++) {
        arcs[i].main.style.transition = 'none';
        arcs[i].glow.style.transition = 'none';
        arcs[i].main.style.strokeDashoffset = ARC_OFFSET_HIDDEN;
        arcs[i].glow.style.strokeDashoffset = ARC_OFFSET_HIDDEN;
      }
      container.style.transition = 'none';
      container.style.opacity = '1';
      container.style.filter = STATIC_GLOW_FILTER;

      /* Force style recalc (cheaper than offsetHeight full layout) */
      void getComputedStyle(container).opacity;

      /* Animate arcs in via CSS transition */
      for (let i = 0; i < 3; i++) {
        arcs[i].main.style.transition = ARC_DRAW_TRANSITION;
        arcs[i].glow.style.transition = ARC_DRAW_TRANSITION;
        arcs[i].main.style.strokeDashoffset = '0';
        arcs[i].glow.style.strokeDashoffset = '0';
      }
    };

    /* ── rAF tick — only active during draw & fade phases ────── */
    const tick = (now) => {
      const elapsed = now - phaseStart;

      if (phase === 'draw') {
        const t = Math.min(elapsed / DRAW_MS, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        for (let i = 0; i < 3; i++) {
          arcSlots[i] = { angle: END_ANGLES[i], opacity: eased, ci: perm[i] };
        }
        /* Piggyback icon updates onto same rAF */
        for (const update of iconUpdaters) update();

        if (elapsed >= DRAW_MS) {
          /* Transition to hold — set final slot state and stop rAF */
          for (let i = 0; i < 3; i++) {
            arcSlots[i] = { angle: END_ANGLES[i], opacity: 1, ci: perm[i] };
          }
          for (const update of iconUpdaters) update();
          phase = 'hold';
          /* Use setTimeout for static hold period (no need for rAF) */
          setTimeout(() => {
            container.style.transition = ARC_FADE_TRANSITION;
            container.style.opacity = '0';
            phase = 'fade';
            phaseStart = performance.now();
            raf = requestAnimationFrame(tick);
          }, HOLD_MS);
          return; /* stop rAF loop */
        }
      } else if (phase === 'fade') {
        const t = Math.min(elapsed / FADE_MS, 1);
        for (let i = 0; i < 3; i++) {
          arcSlots[i] = { angle: END_ANGLES[i], opacity: 1 - t, ci: perm[i] };
        }
        for (const update of iconUpdaters) update();

        if (elapsed >= FADE_MS) {
          /* Transition to wait — null slots, stop rAF */
          arcSlots[0] = arcSlots[1] = arcSlots[2] = null;
          for (const update of iconUpdaters) update();
          phase = 'wait';
          setTimeout(() => {
            phase = 'draw';
            phaseStart = performance.now();
            startCycle();
            raf = requestAnimationFrame(tick);
          }, WAIT_MS);
          return; /* stop rAF loop */
        }
      }

      raf = requestAnimationFrame(tick);
    };

    /* Kick off */
    startCycle();
    phaseStart = performance.now();
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="absolute inset-0"
      style={{
        opacity: 0,
        willChange: 'opacity',
        transform: 'translateZ(0)',          /* GPU layer */
        contain: 'layout style',             /* limit repaint scope */
      }}
    >
      <svg
        viewBox="0 0 400 400"
        className="w-full h-full"
        style={{ overflow: 'visible', transform: 'translateZ(0)' }}
      >
        <defs>
          {ARC_GRADIENTS.map((g) => (
            <linearGradient key={g.id} id={g.id} x1="0%" y1="0%" x2="100%" y2="100%">
              {g.stops.map((s, idx) => (
                <stop key={idx} offset={s.offset} stopColor={s.color} />
              ))}
            </linearGradient>
          ))}
        </defs>
        {[0, 1, 2].map((i) => (
          <g key={i} className="arc-group">
            {/* Glow layer — wider stroke + lower opacity replaces expensive SVG blur filter */}
            <circle
              className="arc-glow"
              cx="200" cy="200" r="190"
              fill="none"
              strokeWidth="26"
              strokeLinecap="round"
              opacity="0.13"
            />
            {/* Main arc */}
            <circle
              className="arc-main"
              cx="200" cy="200" r="190"
              fill="none"
              strokeWidth="6"
              strokeLinecap="round"
            />
          </g>
        ))}
      </svg>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════
   FloatingIcon — driven by ArcRing's rAF (no own loop)
   ═══════════════════════════════════════════════════════════════════════ */
const FloatingIcon = memo(({ icon: Icon, conicAngle, delay }) => {
  const containerRef = useRef(null);
  const iconRef      = useRef(null);
  const prevRef      = useRef(-1);    /* previous quantised intensity */

  /* Pre-compute static position once */
  const rad  = (conicAngle * Math.PI) / 180;
  const left = 50 + 44 * Math.sin(rad);
  const top  = 50 - 44 * Math.cos(rad);

  useEffect(() => {
    const smoothStep = (t) => t * t * (3 - 2 * t);
    const angleDist  = (a, b) => { const d = Math.abs(a - b); return d > 180 ? 360 - d : d; };

    const update = () => {
      const el = containerRef.current;
      if (!el) return;

      let intensity = 0;
      let bestColor = null;

      for (const slot of arcSlots) {
        if (!slot) continue;
        const dist = angleDist(conicAngle, slot.angle);
        if (dist < 65) {
          const v = smoothStep(1 - dist / 65) * slot.opacity;
          if (v > intensity) { intensity = v; bestColor = COLORS[slot.ci]; }
        }
      }

      intensity = Math.min(intensity, 1);

      /* Skip DOM write if intensity hasn't meaningfully changed */
      if (Math.abs(intensity - prevRef.current) < 0.01) return;
      prevRef.current = intensity;

      const ic = iconRef.current;

      if (intensity <= 0.01) {
        el.style.boxShadow   = '0 4px 16px rgba(0,0,0,0.6)';
        el.style.borderColor  = 'rgba(255,255,255,0.08)';
        el.style.background   = 'rgba(255,255,255,0.04)';
        if (ic) ic.style.filter = 'none';
      } else {
        const r = bestColor ? bestColor.r : 255;
        const g = bestColor ? bestColor.g : 215;
        const b = bestColor ? bestColor.b : 0;
        /* 2 shadow layers instead of 4 — merged glow into single spread */
        el.style.boxShadow = `0 4px 16px rgba(0,0,0,0.6), 0 0 ${intensity * 24}px rgba(${r},${g},${b},${intensity * 0.4})`;
        el.style.borderColor = `rgba(255,255,255,${0.08 + intensity * 0.4})`;
        el.style.background  = `rgba(255,255,255,${0.04 + intensity * 0.06})`;
        if (ic) ic.style.filter = `drop-shadow(0 0 ${intensity * 4}px rgba(${r},${g},${b},${intensity * 0.7}))`;
      }
    };

    /* Register with ArcRing's rAF instead of running own loop */
    iconUpdaters.add(update);
    return () => { iconUpdaters.delete(update); };
  }, [conicAngle]);

  return (
    <motion.div
      ref={containerRef}
      className="absolute z-20 hidden sm:flex items-center justify-center w-12 h-12 rounded-full pointer-events-none border"
      style={{
        left: `${left}%`,
        top: `${top}%`,
        x: '-50%', y: '-50%',
        background: 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        boxShadow: '0 4px 16px rgba(0,0,0,0.6)',
        borderColor: 'rgba(255,255,255,0.08)',
        transition: 'box-shadow 0.1s ease-out, border-color 0.1s ease-out, background 0.1s ease-out',
        willChange: 'box-shadow',
        transform: 'translateZ(0)',
      }}
      initial={{ opacity: 0, scale: 0.4 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Icon ref={iconRef} size={18} className="text-white/60" />
    </motion.div>
  );
});
FloatingIcon.displayName = 'FloatingIcon';

/* ═══════════════════════════════════════════════════════════════════════
   CursorParticles — imperative DOM + Web Animations API
   (zero React state updates, zero reconciliation)
   ═══════════════════════════════════════════════════════════════════════ */
const CursorParticles = memo(({ particleCount = 8, particleSize = 2, particleColor = 'rgba(255,215,0,0.35)', fadeDelay = 500 }) => {
  const containerRef = useRef(null);
  const poolRef      = useRef([]);
  const nextIdx      = useRef(0);
  const throttleRef  = useRef(null);

  /* Create fixed pool of DOM nodes once */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const pool = [];
    for (let i = 0; i < particleCount; i++) {
      const div = document.createElement('div');
      div.style.cssText = `
        position:absolute; border-radius:50%; pointer-events:none;
        width:${particleSize}px; height:${particleSize}px;
        background:${particleColor};
        box-shadow:0 0 ${Math.round(particleSize * 1.5)}px ${particleColor};
        opacity:0; will-change:transform,opacity; transform:translateZ(0);
      `;
      el.appendChild(div);
      pool.push(div);
    }
    poolRef.current = pool;
    return () => { pool.forEach((d) => d.remove()); poolRef.current = []; };
  }, [particleCount, particleSize, particleColor]);

  /* Spawn a particle via Web Animations API (compositor-driven) */
  const spawn = useCallback((x, y) => {
    const pool = poolRef.current;
    if (!pool.length) return;
    const div = pool[nextIdx.current];
    nextIdx.current = (nextIdx.current + 1) % pool.length;

    const size = particleSize + Math.random() * 3;
    const offX = (Math.random() - 0.5) * 20;
    const offY = (Math.random() - 0.5) * 20 - 30;
    const dur  = fadeDelay + Math.random() * 500;

    div.style.left   = x + 'px';
    div.style.top    = y + 'px';
    div.style.width  = size + 'px';
    div.style.height = size + 'px';

    div.animate([
      { transform: 'translate3d(0,0,0) scale(0)',                                    opacity: 1   },
      { transform: `translate3d(${offX}px,${offY * 0.5}px,0) scale(1.5)`,            opacity: 0.8, offset: 0.5 },
      { transform: `translate3d(${offX}px,${offY}px,0) scale(0)`,                    opacity: 0   },
    ], { duration: dur, easing: 'ease-out', fill: 'forwards' });
  }, [particleSize, fadeDelay]);

  /* Mouse tracking */
  useEffect(() => {
    const parent = containerRef.current?.parentElement;
    if (!parent) return;

    const onMove = (e) => {
      if (throttleRef.current) return;
      throttleRef.current = setTimeout(() => { throttleRef.current = null; }, 50); /* 50ms throttle */
      const r = parent.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      if (x >= 0 && x <= r.width && y >= 0 && y <= r.height) spawn(x, y);
    };

    parent.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      parent.removeEventListener('mousemove', onMove);
      if (throttleRef.current) clearTimeout(throttleRef.current);
    };
  }, [spawn]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden z-20"
      style={{ contain: 'layout style' }}
    />
  );
});
CursorParticles.displayName = 'CursorParticles';

/* ═══════════════════════════════════════════════════════════════════════
   Hero — main export
   Note: Ambient background effects (gradients, floating particles) are now
   handled by GlobalAmbientBackground component at the App level
   ═══════════════════════════════════════════════════════════════════════ */
const Hero = () => {
  const sectionRef = useRef(null);
  const toast      = useToast();

  /* Single combined state — one setState per cycle instead of two */
  const [heroData, setHeroData] = useState({
    word: WORDS[0],
    colors: [COLORS[0], COLORS[1], COLORS[2]],
  });

  useEffect(() => subscribe((s) => {
    setHeroData({ word: WORDS[s.textIndex], colors: s.colors });
  }), []);

  /* Parallax — motion values live outside React render cycle */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, SPRING_CFG);
  const sy = useSpring(my, SPRING_CFG);
  const px = useTransform(sx, [-0.5, 0.5], [-12, 12]);
  const py = useTransform(sy, [-0.5, 0.5], [-12, 12]);

  useEffect(() => {
    const handler = (e) => {
      if (!hasFinePointer()) return;          /* cached query */
      mx.set(e.clientX / window.innerWidth  - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener('mousemove', handler, { passive: true });
    return () => window.removeEventListener('mousemove', handler);
  }, [mx, my]);

  const comingSoon = useCallback(
    (label) => toast.info('Coming Soon', `${label} will be available soon!`),
    [toast],
  );

  /* Highlight gradient — only recomputed when heroData changes (once per cycle) */
  const highlightGradient = `linear-gradient(135deg, ${heroData.colors[0].main}, ${heroData.colors[1].main}, ${heroData.colors[2].main})`;

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen w-full overflow-hidden"
      style={{ backgroundColor: 'transparent' }}
    >
      {/* ══════════════════════════════════════════════════════════════
          TRANSPARENT OVERLAY — Allows global ambient background to show through
          while maintaining hero section structure
          ══════════════════════════════════════════════════════════════ */}

      {/* Dot Grid Pattern — hero-specific subtle pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)',
          backgroundSize: '40px 40px',
          zIndex: 1,
        }}
        aria-hidden="true"
      />

      {/* ══════════════════════════════════════════════════════════════
          FLOATING STAT CARDS & PARTICLES — Absolute within hero section
          Scrolls naturally with hero, constrained to hero boundaries
          ══════════════════════════════════════════════════════════════ */}
      <FloatingStats />

      {/* ══════════════════════════════════════════════════════════════
          Hero Content (Central ring, text, etc.)
          ══════════════════════════════════════════════════════════════ */}

      {/* Central ring container - z-index 10 to sit above all layers */}
      <div
        className="absolute top-1/2 left-1/2"
        style={{
          width: 'clamp(440px, 88vmin, 860px)',
          height: 'clamp(440px, 88vmin, 860px)',
          transform: 'translate(-50%, -50%)',
          zIndex: 10,
        }}
      >
        {/* Arc ring + parallax wrapper */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            className="w-[88%] h-[88%] relative"
            style={{ x: px, y: py, willChange: 'transform', transform: 'translateZ(0)' }}
          >
            <div className="absolute inset-0 rounded-full" style={{ border: '1px solid rgba(255,255,255,0.04)' }} />
            <ArcRing />
          </motion.div>
        </div>

        {/* Floating icons around the ring */}
        <FloatingIcon icon={Camera}     conicAngle={70}  delay={0.9} />
        <FloatingIcon icon={Shield}     conicAngle={195} delay={1.1} />
        <FloatingIcon icon={SignpostBig} conicAngle={315} delay={1.3} />

        {/* Centre content */}
        <div
          className="absolute top-1/2 left-1/2 z-10 w-[94%] max-w-2xl pointer-events-auto"
          style={{ transform: 'translate(-50%, -50%)' }}
        >
          <motion.div className="text-center" variants={STAGGER_VARIANTS} initial="hidden" animate="visible">
            {/* Headline */}
            <motion.h1
              variants={FADE_UP_VARIANTS}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5 sm:mb-6"
              style={{ letterSpacing: '-0.025em' }}
            >
              Real-Time Road Intelligence
              <br />
              <span>
                with{' '}
                <span className="inline-block relative" style={{ minWidth: '5ch' }}>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={heroData.word}
                      className="inline-block"
                      initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, y: -12, filter: 'blur(2px)' }}
                      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                      style={{
                        background: highlightGradient,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      {heroData.word}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={FADE_UP_VARIANTS}
              className="text-sm sm:text-base md:text-lg text-gray-400 mb-9 max-w-xl mx-auto leading-relaxed font-light"
            >
              AI-powered detection for potholes, signages, barriers, and{' '}
              <span
                className="font-medium"
                style={{
                  background: 'linear-gradient(135deg, #FFD700, #1E90FF)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                15+ road infrastructure elements
              </span>
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={FADE_UP_VARIANTS} className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              {/* Primary – See Demo */}
              <motion.button
                onClick={() => comingSoon('See Demo')}
                className="relative group w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-sm sm:text-base overflow-hidden"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 rounded-xl" style={{ background: 'linear-gradient(135deg, #FFD700, #1E90FF, #E6B800)' }} />
                <div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ boxShadow: '0 0 24px rgba(255,215,0,0.35)' }}
                />
                <div
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)' }}
                />
                <span className="relative z-10 text-white flex items-center justify-center gap-2">
                  See Demo
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
              </motion.button>

              {/* Secondary – Contact Us */}
              <motion.button
                onClick={() => comingSoon('Contact Us')}
                className="relative group w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-sm sm:text-base overflow-hidden"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <div
                  className="absolute inset-0 rounded-xl p-[1.5px]"
                  style={{ background: 'linear-gradient(135deg, rgba(255,215,0,0.5), rgba(30,144,255,0.5), rgba(230,184,0,0.5))' }}
                >
                  <div className="w-full h-full rounded-xl bg-black/95" />
                </div>
                <div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ boxShadow: '0 0 25px rgba(255,215,0,0.2)' }}
                />
                <span
                  className="relative z-10 flex items-center justify-center gap-2"
                  style={{
                    background: 'linear-gradient(135deg, #FFD700, #1E90FF)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Contact Us
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="url(#contactGrad)">
                    <defs>
                      <linearGradient id="contactGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FFD700" />
                        <stop offset="100%" stopColor="#1E90FF" />
                      </linearGradient>
                    </defs>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="hidden sm:flex absolute z-20 flex-col items-center gap-2 text-gray-500 pointer-events-auto"
          style={{ bottom: '-14%', left: '50%', transform: 'translateX(-50%)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.6 }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <div className="w-5 h-8 rounded-full border-2 border-current flex justify-center pt-1.5">
              <div className="w-1 h-2.5 bg-current rounded-full" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Cursor particles – desktop only (above hero content) */}
      <div className="hidden lg:block" style={{ zIndex: 20 }}>
        <CursorParticles
          particleCount={8}
          particleSize={2}
          particleColor="rgba(255,215,0,0.35)"
          fadeDelay={500}
        />
      </div>

      {/* Bottom fade (topmost layer) */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none"
        style={{ zIndex: 25 }}
      />
    </section>
  );
};

export default Hero;
