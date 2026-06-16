'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { threeDWorks } from '@/lib/data';
import { ArrowUpRight } from 'lucide-react';

type RenderMode = 'beauty' | 'clay' | 'wireframe';

function ThreeDCard({ work, index }: { work: typeof threeDWorks[0]; index: number }) {
  const [mode, setMode] = useState<RenderMode>('beauty');
  const [hovered, setHovered] = useState(false);

  const gradients = {
    beauty: work.beautyGradient,
    clay: work.clayGradient,
    wireframe: work.wireframeGradient,
  };

  const modeLabels: RenderMode[] = ['beauty', 'clay', 'wireframe'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, delay: index * 0.15 }}
    >
      <Link
        href={`/3d/${work.slug}`}
        data-cursor={`3D\nMODEL\nVIEW`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="group block"
      >
        {/* Render container */}
        <div className="relative overflow-hidden mb-4" style={{ aspectRatio: '4/3' }}>
          <motion.div
            animate={{ scale: hovered ? 1.04 : 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className={`absolute inset-0 bg-gradient-to-br ${gradients[mode]} transition-all duration-500`}
          />

          {/* Wireframe overlay for wireframe mode */}
          {mode === 'wireframe' && (
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />
          )}

          {/* Mode indicator */}
          <div className="absolute top-4 left-4 text-[9px] tracking-[0.25em] font-semibold text-white/60 uppercase">
            {mode} RENDER
          </div>

          {/* Hover overlay */}
          <motion.div
            animate={{ opacity: hovered ? 1 : 0 }}
            className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent"
          >
            <p className="text-[11px] text-white/70 font-light">{work.shortDescription}</p>
          </motion.div>
        </div>

        {/* Mode switcher */}
        <div
          className="flex gap-1 mb-4"
          onClick={(e) => e.preventDefault()}
          onMouseEnter={(e) => e.stopPropagation()}
        >
          {modeLabels.map((m) => (
            <button
              key={m}
              onClick={(e) => {
                e.preventDefault();
                setMode(m);
              }}
              className={`px-3 py-1.5 text-[9px] tracking-[0.2em] font-semibold uppercase transition-all duration-300 ${
                mode === m
                  ? 'bg-accent text-white'
                  : 'border border-bg-secondary text-muted hover:border-muted'
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        {/* Title */}
        <div className="flex items-start justify-between">
          <div>
            <div className="text-[10px] tracking-[0.2em] text-muted font-semibold mb-1">
              {work.software.join(' · ')}
            </div>
            <h3 className="text-lg font-bold tracking-tight text-text-primary group-hover:text-accent transition-colors duration-300">
              {work.title}
            </h3>
          </div>
          <ArrowUpRight size={14} className="text-muted group-hover:text-accent mt-1 transition-colors duration-300" />
        </div>
      </Link>
    </motion.div>
  );
}

export function Featured3DWorks() {
  return (
    <section className="py-32 px-8 bg-bg-secondary">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-end justify-between mb-16">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-6"
            >
              <span className="text-[10px] tracking-[0.3em] text-muted font-semibold">05 — 3D MODELING</span>
              <span className="w-16 h-px bg-muted/20" />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-[clamp(2rem,5vw,4rem)] font-black tracking-[-0.02em] text-text-primary"
            >
              3D Works
            </motion.h2>
          </div>
          <Link
            href="/3d"
            data-cursor="ALL\n3D WORKS"
            className="text-[10px] tracking-[0.25em] font-semibold text-muted hover:text-accent transition-colors duration-300 flex items-center gap-2"
          >
            VIEW ALL <ArrowUpRight size={12} />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {threeDWorks.map((work, i) => (
            <ThreeDCard key={work.id} work={work} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
