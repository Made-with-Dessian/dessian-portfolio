'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const CarSilhouetteSVG = () => (
  <svg
    viewBox="0 0 1200 320"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
  >
    {/* Main body */}
    <path
      d="M1100 220 L1080 220 C1075 190 1050 170 1020 170 C990 170 965 190 960 220 L280 220 C275 190 250 170 220 170 C190 170 165 190 160 220 L100 220 L80 200 L70 165 L100 120 L180 95 L280 75 L420 60 L560 52 L700 50 L820 55 L930 72 L1010 92 L1065 118 L1095 148 L1112 180 L1100 210 Z"
      className="fill-current opacity-15"
    />
    {/* Windows */}
    <path
      d="M350 100 L380 75 L520 62 L560 62 L560 100 Z M580 62 L720 58 L760 62 L760 100 L580 100 Z M780 62 L880 68 L920 85 L920 100 L780 100 Z"
      className="fill-current opacity-8"
    />
    {/* Wheels */}
    <circle cx="220" cy="220" r="42" className="stroke-current" strokeWidth="3" fill="none" opacity="0.2"/>
    <circle cx="220" cy="220" r="22" className="stroke-current" strokeWidth="2" fill="none" opacity="0.12"/>
    <circle cx="1020" cy="220" r="42" className="stroke-current" strokeWidth="3" fill="none" opacity="0.2"/>
    <circle cx="1020" cy="220" r="22" className="stroke-current" strokeWidth="2" fill="none" opacity="0.12"/>
    {/* Ground line */}
    <line x1="50" y1="262" x2="1150" y2="262" className="stroke-current" strokeWidth="1" opacity="0.08"/>
  </svg>
);

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });

  const silhouetteY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const silhouetteScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-bg" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg/60 z-10" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: 'linear-gradient(var(--text) 1px, transparent 1px), linear-gradient(90deg, var(--text) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Car silhouette */}
      <motion.div
        style={{ y: silhouetteY, scale: silhouetteScale }}
        className="absolute inset-x-0 bottom-[15%] px-8 md:px-16 text-text-primary z-0"
      >
        <CarSilhouetteSVG />
      </motion.div>

      {/* Main content */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-20 text-center px-8"
      >
        {/* Year tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 inline-flex items-center gap-3"
        >
          <span className="w-8 h-px bg-accent" />
          <span className="text-[10px] font-semibold tracking-[0.3em] text-muted">
            AUTOMOTIVE DESIGNER
          </span>
          <span className="w-8 h-px bg-accent" />
        </motion.div>

        {/* Name */}
        <div className="overflow-hidden mb-4">
          <motion.h1
            initial={{ y: '110%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(4rem,15vw,14rem)] font-black tracking-[-0.02em] leading-[0.85] text-text-primary uppercase"
          >
            MINJAE
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-12">
          <motion.h1
            initial={{ y: '110%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 1, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(4rem,15vw,14rem)] font-black tracking-[-0.02em] leading-[0.85] text-accent uppercase"
          >
            KIM
          </motion.h1>
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.9, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-[clamp(0.85rem,1.5vw,1.1rem)] font-light tracking-[0.08em] text-muted max-w-[480px] mx-auto leading-relaxed"
        >
          Designing Mobility Through Story,<br />Function and Emotion.
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3"
      >
        <span className="text-[9px] tracking-[0.3em] text-muted font-medium">SCROLL</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-10 bg-gradient-to-b from-muted to-transparent"
        />
      </motion.div>

      {/* Corner labels */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-8 z-20"
      >
        <span className="text-[9px] tracking-[0.25em] text-muted font-medium">2024 — 2025</span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 right-8 z-20"
      >
        <span className="text-[9px] tracking-[0.25em] text-muted font-medium">TRANSPORTATION DESIGN</span>
      </motion.div>
    </section>
  );
}
