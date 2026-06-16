'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { threeDWorks, ThreeDWork } from '@/lib/data';
import { ArrowUpRight } from 'lucide-react';

type RenderMode = 'beauty' | 'clay' | 'wireframe';

function WorkCard({ work, index }: { work: ThreeDWork; index: number }) {
  const [mode, setMode] = useState<RenderMode>('beauty');

  const gradients: Record<RenderMode, string> = {
    beauty: work.beautyGradient,
    clay: work.clayGradient,
    wireframe: work.wireframeGradient,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.9, delay: index * 0.12 }}
    >
      <Link href={`/3d/${work.slug}`} data-cursor={`3D\nMODEL`} className="group block">
        <div className="relative overflow-hidden mb-4" style={{ aspectRatio: '4/3' }}>
          <motion.div
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className={`absolute inset-0 bg-gradient-to-br ${gradients[mode]} transition-all duration-500`}
          />
          {mode === 'wireframe' && (
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />
          )}
          <div className="absolute top-4 left-4 text-[9px] tracking-[0.25em] font-semibold text-white/40 uppercase">
            {mode} render
          </div>
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-7 h-7 rounded-full bg-accent flex items-center justify-center">
              <ArrowUpRight size={12} className="text-white" />
            </div>
          </div>
        </div>

        <div className="flex gap-1 mb-4" onClick={(e) => e.preventDefault()}>
          {(['beauty', 'clay', 'wireframe'] as RenderMode[]).map((m) => (
            <button
              key={m}
              onClick={(e) => { e.preventDefault(); setMode(m); }}
              className={`px-3 py-1.5 text-[9px] tracking-[0.2em] font-semibold uppercase transition-all duration-300 ${
                mode === m ? 'bg-accent text-white' : 'border border-bg-secondary text-muted hover:border-accent hover:text-accent'
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        <div className="text-[9px] tracking-[0.2em] text-muted font-semibold mb-1">
          {work.software.join(' · ')}
        </div>
        <h3 className="text-lg font-bold tracking-tight text-text-primary group-hover:text-accent transition-colors duration-300">
          {work.title}
        </h3>
        <p className="text-muted text-sm font-light mt-1 leading-relaxed">
          {work.shortDescription}
        </p>
      </Link>
    </motion.div>
  );
}

export default function ThreeDPage() {
  return (
    <div className="min-h-screen bg-bg pt-32">
      <div className="max-w-[1400px] mx-auto px-8">
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mb-8"
          >
            <span className="text-[10px] tracking-[0.3em] text-muted font-semibold">3D MODELING</span>
            <span className="flex-1 h-px bg-bg-secondary" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="text-[clamp(3rem,10vw,9rem)] font-black tracking-[-0.02em] leading-[0.85] text-text-primary"
          >
            3D Works
          </motion.h1>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-32">
          {threeDWorks.map((work, i) => (
            <WorkCard key={work.id} work={work} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
