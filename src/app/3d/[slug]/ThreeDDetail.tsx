'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ThreeDWork } from '@/lib/data';

type RenderMode = 'beauty' | 'clay' | 'wireframe';

export function ThreeDDetail({ work }: { work: ThreeDWork }) {
  const [mode, setMode] = useState<RenderMode>('beauty');

  const gradients: Record<RenderMode, string> = {
    beauty: work.beautyGradient,
    clay: work.clayGradient,
    wireframe: work.wireframeGradient,
  };

  return (
    <div className="min-h-screen bg-bg">
      <div className="fixed top-20 left-8 z-40">
        <Link href="/3d" className="flex items-center gap-2 text-[10px] tracking-[0.25em] font-semibold text-muted hover:text-accent transition-colors duration-300">
          <ArrowLeft size={12} /> 3D WORKS
        </Link>
      </div>

      {/* Hero render */}
      <section className="relative h-screen flex flex-col justify-end overflow-hidden">
        <motion.div
          animate={{ background: undefined }}
          className={`absolute inset-0 bg-gradient-to-br ${gradients[mode]} transition-all duration-700`}
        />
        {mode === 'wireframe' && (
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }}
          />
        )}

        <div className="relative z-10 px-8 md:px-16 pb-16 max-w-[1400px] mx-auto w-full">
          <div className="flex gap-2 mb-8">
            {(['beauty', 'clay', 'wireframe'] as RenderMode[]).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-4 py-2 text-[9px] tracking-[0.2em] font-semibold uppercase transition-all duration-300 ${
                  mode === m ? 'bg-white text-black' : 'border border-white/30 text-white/50 hover:border-white/60 hover:text-white/80'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(3rem,10vw,9rem)] font-black tracking-[-0.02em] leading-[0.85] text-white mb-6"
          >
            {work.title}
          </motion.h1>
          <div className="flex flex-wrap gap-2">
            {work.software.map((s) => (
              <span key={s} className="text-[9px] tracking-[0.25em] font-semibold text-white/40 border border-white/15 px-3 py-1.5">
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg to-transparent z-10" />
      </section>

      {/* Render gallery */}
      <section className="py-32 px-8 md:px-16">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-16"
          >
            <span className="text-[10px] tracking-[0.3em] text-muted font-semibold">RENDER GALLERY</span>
            <span className="flex-1 h-px bg-bg-secondary" />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-4">
            {(['beauty', 'clay', 'wireframe'] as RenderMode[]).map((m, i) => (
              <motion.div
                key={m}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="relative overflow-hidden cursor-pointer group"
                style={{ aspectRatio: '4/3' }}
                onClick={() => setMode(m)}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${gradients[m]}`} />
                {m === 'wireframe' && (
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
                      backgroundSize: '20px 20px',
                    }}
                  />
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                <div className="absolute bottom-4 left-4 text-[9px] tracking-[0.25em] font-semibold text-white/60 uppercase">
                  {m} render
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="py-16 px-8 border-t border-bg-secondary">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <Link href="/3d" className="text-[10px] tracking-[0.25em] font-semibold text-muted hover:text-accent transition-colors duration-300 flex items-center gap-2">
            <ArrowLeft size={12} /> ALL 3D WORKS
          </Link>
          <span className="text-[9px] tracking-[0.25em] text-muted font-semibold">{work.title}</span>
        </div>
      </div>
    </div>
  );
}
