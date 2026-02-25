/* ═══════════════════════════════════════════════════════════════════════
   FLOATING STATS — Smooth velocity-based motion with soft-repulsion
   boundaries.

   Key design choices that eliminate jitter:
   ─────────────────────────────────────────
   1. Physics runs every rAF frame (no tick subdivision / lerp split).
   2. Boundaries use soft repulsive forces (gradual acceleration away)
      instead of hard position snaps.  A hard clamp still exists as a
      safety net but the soft force ensures cards never reach it.
   3. Subpixel transform output — no integer rounding.
   4. Bounce preserves 90% momentum (BOUNCE_DAMP = 0.9).
   ═══════════════════════════════════════════════════════════════════════ */

import { useEffect, useRef } from 'react';

/* ─── Card data ─────────────────────────────────────────────────────────── */
const STAT_CARDS = [
  { id: 1,  value: '99.8%',    label: 'Detection Accuracy', gradient: 'linear-gradient(135deg,#D4AF37,#C8860A)', glowClass: 'neon-gold-warm' },
  { id: 2,  value: '10,000+',  label: 'Kilometers Scanned', gradient: 'linear-gradient(135deg,#4A90D9,#5BC0EB)', glowClass: 'neon-blue-sky' },
  { id: 3,  value: '15+',      label: 'Defect Categories',  gradient: 'linear-gradient(135deg,#9B7ED8,#C5A3FF)', glowClass: 'neon-soft-purple' },
  { id: 4,  value: '24/7',     label: 'AI Monitoring',      gradient: 'linear-gradient(135deg,#2EC4B6,#38D9A9)', glowClass: 'neon-teal' },
  { id: 5,  value: '100 km/h', label: 'Capture Speed',      gradient: 'linear-gradient(135deg,#3B82F6,#6366F1)', glowClass: 'neon-blue-indigo' },
  { id: 6,  value: '<1s',      label: 'Response Time',      gradient: 'linear-gradient(135deg,#D4AF37,#2EC4B6)', glowClass: 'neon-gold-teal' },
  { id: 7,  value: '30 FPS',   label: 'Processing Speed',   gradient: 'linear-gradient(135deg,#45B7AA,#7DD3C0)', glowClass: 'neon-soft-green', small: true },
  { id: 8,  value: 'GPS',      label: 'Tagged Reports',     gradient: 'linear-gradient(135deg,#E09F3E,#F0C75E)', glowClass: 'neon-amber',      small: true },
  { id: 9,  value: '50+',      label: 'Cities Covered',     gradient: 'linear-gradient(135deg,#60A5FA,#93C5FD)', glowClass: 'neon-blue-soft',  small: true },
  { id: 10, value: '4K',       label: 'Camera Resolution',  gradient: 'linear-gradient(135deg,#8B5CF6,#A78BFA)', glowClass: 'neon-violet',     small: true },
  { id: 11, value: '∞',        label: 'Scalability',        gradient: 'linear-gradient(135deg,#34D399,#6EE7B7)', glowClass: 'neon-emerald',    small: true },
];

/* ─── Particles (pure CSS) ─────────────────────────────────────────────── */
const NEON_PARTICLES = [
  { id: 'g1', sz: 4, c: 'rgba(255,215,0,0.7)',   pos: { top: '18%', left: '15%' }, a: 'animate-particle-1', d: '0s,0s' },
  { id: 'g2', sz: 3, c: 'rgba(255,215,0,0.6)',   pos: { top: '35%', left: '10%' }, a: 'animate-particle-3', d: '-15s,-1s' },
  { id: 'g3', sz: 5, c: 'rgba(255,215,0,0.5)',   pos: { top: '60%', left: '18%' }, a: 'animate-particle-1', d: '-25s,-2s' },
  { id: 'g4', sz: 3, c: 'rgba(255,215,0,0.65)',  pos: { top: '75%', left: '12%' }, a: 'animate-particle-3', d: '-35s,-1.5s' },
  { id: 'g5', sz: 4, c: 'rgba(255,215,0,0.55)',  pos: { top: '22%', right:'15%' }, a: 'animate-particle-1', d: '-10s,-0.5s' },
  { id: 'g6', sz: 3, c: 'rgba(255,215,0,0.7)',   pos: { top: '55%', right:'12%' }, a: 'animate-particle-3', d: '-40s,-2.5s' },
  { id: 'b1', sz: 4, c: 'rgba(30,144,255,0.7)',  pos: { top: '25%', right:'18%' }, a: 'animate-particle-2', d: '-8s,0s' },
  { id: 'b2', sz: 5, c: 'rgba(30,144,255,0.55)', pos: { top: '45%', right:'10%' }, a: 'animate-particle-2', d: '-18s,-1s' },
  { id: 'b3', sz: 3, c: 'rgba(30,144,255,0.65)', pos: { top: '70%', right:'20%' }, a: 'animate-particle-2', d: '-30s,-2s' },
  { id: 'b4', sz: 4, c: 'rgba(30,144,255,0.6)',  pos: { top: '80%', left: '25%' }, a: 'animate-particle-4', d: '-45s,-1.5s' },
  { id: 'b5', sz: 3, c: 'rgba(30,144,255,0.7)',  pos: { top: '12%', left: '30%' }, a: 'animate-particle-2', d: '-22s,-0.5s' },
  { id: 'b6', sz: 5, c: 'rgba(30,144,255,0.5)',  pos: { top: '40%', left: '8%' },  a: 'animate-particle-4', d: '-12s,-2.5s' },
  { id: 'c1', sz: 3, c: 'rgba(255,215,0,0.35)',  pos: { top: '45%', left: '35%' }, a: 'animate-particle-1', d: '-5s,-1s' },
  { id: 'c2', sz: 4, c: 'rgba(30,144,255,0.35)', pos: { top: '52%', right:'35%' }, a: 'animate-particle-2', d: '-10s,-0.5s' },
];

/* ─── Physics constants ─────────────────────────────────────────────────── */
const SPEED       = 70;    // base px/s  (much faster)
const SPEED_VAR   = 25;    // per-card random ±
const MAX_SPD     = SPEED + SPEED_VAR;
const MIN_SPD     = SPEED * 0.5;
const NUDGE       = 0.35;  // drift variation
const EDGE_PAD    = 16;
const RING_MARGIN = 50;
const BOUNCE_DAMP = 0.9;   // preserve 90% momentum on hard bounce
const MAX_DT      = 0.06;  // tighter cap → smoother recovery after tab switch

/* Soft-repulsion: a force that grows as the card enters the zone.
   This replaces hard position snaps for silky boundary behaviour. */
const SOFT_WALL   = 60;    // pixels — wall repulsion fade-in distance
const SOFT_RING   = 70;    // pixels — ring repulsion fade-in distance
const SOFT_RECT   = 40;    // pixels — UI zone repulsion fade-in distance
const REPULSE_STR = 450;   // acceleration magnitude (px/s²) — higher for faster cards

/* ─── Starting slots ────────────────────────────────────────────────────── */
const STARTS = [
  { xPct: 6,  yPct: 16 }, { xPct: 76, yPct: 14 }, { xPct: 38, yPct: 12 },
  { xPct: 4,  yPct: 44 }, { xPct: 82, yPct: 42 }, { xPct: 4,  yPct: 62 },
  { xPct: 8,  yPct: 78 }, { xPct: 78, yPct: 76 }, { xPct: 55, yPct: 82 },
  { xPct: 82, yPct: 60 }, { xPct: 30, yPct: 80 },
];

/* ═══════════════════════════════════════════════════════════════════════ */

const FloatingStats = () => {
  const wrapperRef = useRef(null);
  const cardRefs   = useRef([]);
  const rafId      = useRef(0);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const els = cardRefs.current;
    const N   = els.length;
    if (N === 0) return;

    /* ── Cached geometry (resize-only) ──────────────────────────────── */
    let W = 0, H = 0, cx = 0, cy = 0, exR = 0;
    // Flat array for 4 rect zones: [x,y,w,h, …]
    const rz = new Float64Array(16);
    const RZ = 4;

    const measure = () => {
      W  = wrapper.offsetWidth;
      H  = wrapper.offsetHeight;
      cx = W * 0.5;
      cy = H * 0.5;

      const vmin    = Math.min(window.innerWidth, window.innerHeight);
      const ringBox = Math.min(860, Math.max(440, 0.88 * vmin));
      exR   = ringBox * 0.88 * 0.5 + RING_MARGIN;
      const wr = wrapper.getBoundingClientRect();
      const wT = wr.top, wL = wr.left;
      const vW = window.innerWidth, vH = window.innerHeight;

      rz[0]  = 0;              rz[1]  = -wT;             rz[2]  = W;   rz[3]  = 80 - wT;        // navbar
      rz[4]  = -wL;            rz[5]  = (vH - 100) - wT; rz[6]  = 80;  rz[7]  = 100;             // FAB
      rz[8]  = (vW - 90) - wL; rz[9]  = (vH - 100) - wT; rz[10] = 90;  rz[11] = 100;             // chat
      rz[12] = (vW - 110) - wL; rz[13] = 100 - wT;       rz[14] = 110; rz[15] = 100;             // mascot
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(wrapper);

    /* ── Per-card state (flat arrays) ───────────────────────────────── */
    const px = new Float64Array(N);
    const py = new Float64Array(N);
    const _vx = new Float64Array(N);
    const _vy = new Float64Array(N);
    const _cw = new Float64Array(N);
    const _ch = new Float64Array(N);

    for (let i = 0; i < N; i++) {
      const el = els[i];
      if (!el) continue;
      _cw[i] = el.offsetWidth;
      _ch[i] = el.offsetHeight;

      const s = STARTS[i] || STARTS[0];
      px[i] = Math.max(EDGE_PAD, Math.min(W - _cw[i] - EDGE_PAD, (s.xPct / 100) * W));
      py[i] = Math.max(EDGE_PAD, Math.min(H - _ch[i] - EDGE_PAD, (s.yPct / 100) * H));

      const a  = Math.random() * 6.2832;
      const sp = SPEED + (Math.random() - 0.5) * SPEED_VAR * 2;
      _vx[i] = Math.cos(a) * sp;
      _vy[i] = Math.sin(a) * sp;

      el.style.transform = `translate3d(${px[i]}px,${py[i]}px,0)`;
    }

    /* ── Frame loop (physics + render every rAF) ────────────────────── */
    let prev = 0;

    const frame = (now) => {
      if (!prev) { prev = now; rafId.current = requestAnimationFrame(frame); return; }

      const dt = Math.min((now - prev) / 1000, MAX_DT);
      prev = now;

      const nd = NUDGE * 60 * dt;

      for (let i = 0; i < N; i++) {
        let vxi = _vx[i];
        let vyi = _vy[i];
        const cwi = _cw[i];
        const chi = _ch[i];

        // ─── 1. Gentle random drift ──────────────────────────────────
        vxi += (Math.random() - 0.5) * nd;
        vyi += (Math.random() - 0.5) * nd;

        // ─── 2. Speed clamp ──────────────────────────────────────────
        const spdSq = vxi * vxi + vyi * vyi;
        if (spdSq > MAX_SPD * MAX_SPD) {
          const k = MAX_SPD / Math.sqrt(spdSq);
          vxi *= k; vyi *= k;
        } else if (spdSq < MIN_SPD * MIN_SPD && spdSq > 0.001) {
          const k = MIN_SPD / Math.sqrt(spdSq);
          vxi *= k; vyi *= k;
        }

        // ─── 3. Advance position ────────────────────────────────────
        let xi = px[i] + vxi * dt;
        let yi = py[i] + vyi * dt;

        // ─── 4. Soft wall repulsion + hard clamp safety net ─────────
        const minX = EDGE_PAD;
        const maxX = W - cwi - EDGE_PAD;
        const minY = EDGE_PAD;
        const maxY = H - chi - EDGE_PAD;

        // Left wall
        if (xi < minX + SOFT_WALL) {
          const depth = 1 - (xi - minX) / SOFT_WALL; // 0→1 as card enters
          if (depth > 0) vxi += REPULSE_STR * depth * dt;
        }
        // Right wall
        if (xi > maxX - SOFT_WALL) {
          const depth = 1 - (maxX - xi) / SOFT_WALL;
          if (depth > 0) vxi -= REPULSE_STR * depth * dt;
        }
        // Top wall
        if (yi < minY + SOFT_WALL) {
          const depth = 1 - (yi - minY) / SOFT_WALL;
          if (depth > 0) vyi += REPULSE_STR * depth * dt;
        }
        // Bottom wall
        if (yi > maxY - SOFT_WALL) {
          const depth = 1 - (maxY - yi) / SOFT_WALL;
          if (depth > 0) vyi -= REPULSE_STR * depth * dt;
        }

        // Hard clamp (safety net — soft force should prevent reaching this)
        if (xi < minX) { xi = minX; if (vxi < 0) vxi = -vxi * BOUNCE_DAMP; }
        if (xi > maxX) { xi = maxX; if (vxi > 0) vxi = -vxi * BOUNCE_DAMP; }
        if (yi < minY) { yi = minY; if (vyi < 0) vyi = -vyi * BOUNCE_DAMP; }
        if (yi > maxY) { yi = maxY; if (vyi > 0) vyi = -vyi * BOUNCE_DAMP; }

        // ─── 5. Soft ring exclusion ──────────────────────────────────
        const ddx = xi + cwi * 0.5 - cx;
        const ddy = yi + chi * 0.5 - cy;
        const distSq = ddx * ddx + ddy * ddy;
        const softExR = exR + SOFT_RING;
        const softExRSq = softExR * softExR;

        if (distSq < softExRSq) {
          const dist = Math.sqrt(distSq);
          if (dist < 1) {
            // Dead-center — push out to a random direction
            const a = Math.random() * 6.2832;
            xi  = cx + Math.cos(a) * (exR + 8) - cwi * 0.5;
            yi  = cy + Math.sin(a) * (exR + 8) - chi * 0.5;
            vxi = Math.cos(a) * SPEED;
            vyi = Math.sin(a) * SPEED;
          } else {
            const nx = ddx / dist;
            const ny = ddy / dist;

            // How deep into the soft zone (0 at outer edge, 1+ at hard boundary)
            const penetration = (softExR - dist) / SOFT_RING;

            // Apply smooth outward acceleration
            const force = REPULSE_STR * Math.min(penetration, 2) * dt;
            vxi += nx * force;
            vyi += ny * force;

            // Hard boundary: if actually inside the ring, also nudge position
            if (dist < exR) {
              xi = cx + nx * (exR + 2) - cwi * 0.5;
              yi = cy + ny * (exR + 2) - chi * 0.5;
              // Reflect inward velocity component gently
              const dot = vxi * nx + vyi * ny;
              if (dot < 0) {
                vxi -= 1.5 * dot * nx;
                vyi -= 1.5 * dot * ny;
              }
            }
          }
        }

        // ─── 6. Soft rectangular zone repulsion ──────────────────────
        for (let z = 0; z < RZ; z++) {
          const o  = z * 4;
          const zx = rz[o], zy = rz[o + 1], zw = rz[o + 2], zh = rz[o + 3];
          const zr = zx + zw, zb = zy + zh;

          // Expand zone by SOFT_RECT for the soft region
          const sx = zx - SOFT_RECT, sy = zy - SOFT_RECT;
          const sr = zr + SOFT_RECT, sb = zb + SOFT_RECT;

          // Quick AABB check against expanded zone
          if (xi + cwi <= sx || xi >= sr || yi + chi <= sy || yi >= sb) continue;

          // Card center
          const ccx = xi + cwi * 0.5;
          const ccy = yi + chi * 0.5;

          // Find closest point on the hard zone rect to the card center
          const cpx = Math.max(zx, Math.min(zr, ccx));
          const cpy = Math.max(zy, Math.min(zb, ccy));

          // Direction from closest point to card center
          let rx = ccx - cpx;
          let ry = ccy - cpy;
          const rd = Math.sqrt(rx * rx + ry * ry);

          if (rd < SOFT_RECT + Math.max(cwi, chi) * 0.5) {
            if (rd < 0.5) {
              // Card center is inside the zone rect — pick escape direction
              const dL = ccx - zx, dR = zr - ccx, dU = ccy - zy, dD = zb - ccy;
              const m = Math.min(dL, dR, dU, dD);
              if (m === dL)      { rx = -1; ry = 0; }
              else if (m === dR) { rx = 1;  ry = 0; }
              else if (m === dU) { rx = 0;  ry = -1; }
              else               { rx = 0;  ry = 1; }
            } else {
              rx /= rd; ry /= rd;
            }

            const penetration = Math.max(0, 1 - rd / (SOFT_RECT + Math.max(cwi, chi) * 0.5));
            const f = REPULSE_STR * 1.5 * penetration * dt;
            vxi += rx * f;
            vyi += ry * f;

            // Hard push if AABB overlaps hard zone
            if (xi + cwi > zx && xi < zr && yi + chi > zy && yi < zb) {
              const pL = zx - (xi + cwi), pR = zr - xi;
              const pU = zy - (yi + chi), pD = zb - yi;
              const aL = -pL, aR = pR, aU = -pU, aD = pD;
              const mn = Math.min(aL, aR, aU, aD);
              if (mn === aL)      { xi += pL - 1; if (vxi > 0) vxi = -vxi * BOUNCE_DAMP; }
              else if (mn === aR) { xi += pR + 1; if (vxi < 0) vxi = -vxi * BOUNCE_DAMP; }
              else if (mn === aU) { yi += pU - 1; if (vyi > 0) vyi = -vyi * BOUNCE_DAMP; }
              else                { yi += pD + 1; if (vyi < 0) vyi = -vyi * BOUNCE_DAMP; }
            }
          }
        }

        // ─── 7. Final safety clamp ───────────────────────────────────
        if (xi < minX) xi = minX;
        else if (xi > maxX) xi = maxX;
        if (yi < minY) yi = minY;
        else if (yi > maxY) yi = maxY;

        // ─── 8. Store state ──────────────────────────────────────────
        px[i] = xi;
        py[i] = yi;
        _vx[i] = vxi;
        _vy[i] = vyi;

        // ─── 9. Write to DOM (subpixel — no rounding) ───────────────
        els[i].style.transform = `translate3d(${xi}px,${yi}px,0)`;
      }

      rafId.current = requestAnimationFrame(frame);
    };

    rafId.current = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(rafId.current); ro.disconnect(); };
  }, []);

  const setRef = (i) => (el) => { cardRefs.current[i] = el; };

  return (
    <>
      {/* ═══════ PARTICLES (CSS-only) ═══════════════════════════════════ */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: 3, contain: 'strict' }}
        aria-hidden="true"
      >
        {NEON_PARTICLES.map((p) => (
          <div
            key={p.id}
            className={`absolute hidden md:block ${p.a}`}
            style={{ ...p.pos, width: p.sz, height: p.sz, borderRadius: '50%', background: p.c, animationDelay: p.d }}
          />
        ))}
      </div>

      {/* ═══════ STAT CARDS (JS physics + CSS glow) ═════════════════════ */}
      <div
        ref={wrapperRef}
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: 5, contain: 'strict' }}
        aria-hidden="true"
      >
        {STAT_CARDS.map((c, i) => (
          <div
            key={c.id}
            ref={setRef(i)}
            className={`absolute hidden lg:block ${c.glowClass}`}
            style={{ left: 0, top: 0, willChange: 'transform', contain: 'layout style' }}
          >
            <div
              className={`${c.small ? 'px-3 py-2' : 'px-4 py-3'} rounded-xl`}
              style={{
                background: 'rgba(10,22,40,0.6)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,215,0,0.2)',
              }}
            >
              <div
                className={`${c.small ? 'text-lg' : 'text-2xl'} font-bold`}
                style={{
                  background: c.gradient,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {c.value}
              </div>
              <div className={`${c.small ? 'text-[10px]' : 'text-xs'} text-gray-400 font-medium tracking-wide`}>
                {c.label}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default FloatingStats;
