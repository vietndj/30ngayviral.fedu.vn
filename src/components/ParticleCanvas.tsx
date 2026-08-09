import React, { useEffect, useRef } from 'react';

// Màu Google & Antigravity palette (Google Electric Blue, Green, Red, Yellow, Cyan)
const COLORS = [
  '#3186FF',   // Google Blue
  '#00B95C',   // Google Green
  '#FC413D',   // Google Red
  '#FFE432',   // Google Yellow
  '#38bdf8',   // Cyan Glow
  '#818cf8',   // Indigo Glow
];

class Particle {
  x: number = 0;
  y: number = 0;
  vx: number = 0;
  vy: number = 0;
  color: string = COLORS[0];
  w: number = 2;
  h: number = 6;
  angle: number = 0;
  spin: number = 0;
  alpha: number = 0.3;
  maxY: number = -20;

  constructor(w: number, h: number) {
    this.init(w, h, true);
  }

  init(w: number, h: number, randomY = false) {
    this.x = Math.random() * w;
    this.y = randomY ? Math.random() * h : h + Math.random() * 60;
    this.vx = (Math.random() - 0.5) * 0.3;
    this.vy = -(Math.random() * 0.55 + 0.18); // Float upward (Antigravity lift)
    this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
    this.w = Math.random() * 2.5 + 1.2;
    this.h = Math.random() * 8 + 4;
    this.angle = Math.random() * Math.PI * 2;
    this.spin = (Math.random() - 0.5) * 0.03;
    this.alpha = Math.random() * 0.45 + 0.15;
    this.maxY = -20;
  }

  update(w: number, h: number) {
    this.x += this.vx;
    this.y += this.vy;
    this.angle += this.spin;
    if (this.y < this.maxY) this.init(w, h, false);
    if (this.x < -20) this.x = w + 10;
    if (this.x > w + 20) this.x = -10;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    const r = this.w / 2;
    // Pill shape particle
    ctx.moveTo(-r, -this.h / 2 + r);
    ctx.arcTo(-r, -this.h / 2, 0, -this.h / 2, r);
    ctx.arcTo(r, -this.h / 2, r, 0, r);
    ctx.arcTo(r, this.h / 2, 0, this.h / 2, r);
    ctx.arcTo(-r, this.h / 2, -r, 0, r);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
}

const PARTICLE_COUNT = 70;

interface ParticleCanvasProps {
  className?: string;
  style?: React.CSSProperties;
}

export function ParticleCanvas({ className = '', style }: ParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stateRef = useRef<{
    particles: Particle[];
    rafId: number | null;
    w: number;
    h: number;
  }>({
    particles: [],
    rafId: null,
    w: 0,
    h: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const state = stateRef.current;

    const resize = () => {
      const parent = canvas.parentElement;
      const rect = parent ? parent.getBoundingClientRect() : { width: window.innerWidth, height: 800 };
      const dpr = window.devicePixelRatio || 1;
      state.w = canvas.width = rect.width * dpr;
      state.h = canvas.height = rect.height * dpr;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      ctx.scale(dpr, dpr);
    };

    resize();
    state.particles = Array.from(
      { length: PARTICLE_COUNT },
      () => new Particle(state.w / (window.devicePixelRatio || 1), state.h / (window.devicePixelRatio || 1))
    );

    const tick = () => {
      const dpr = window.devicePixelRatio || 1;
      const W = state.w / dpr;
      const H = state.h / dpr;
      ctx.clearRect(0, 0, W, H);
      state.particles.forEach((p) => {
        p.update(W, H);
        p.draw(ctx);
      });
      state.rafId = requestAnimationFrame(tick);
    };

    state.rafId = requestAnimationFrame(tick);

    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) {
      ro.observe(canvas.parentElement);
    }

    return () => {
      if (state.rafId) cancelAnimationFrame(state.rafId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`particle-canvas ${className}`}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        ...style,
      }}
      aria-hidden="true"
    />
  );
}

export default ParticleCanvas;
