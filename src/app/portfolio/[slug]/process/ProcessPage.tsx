'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Project } from '@/lib/data';

const stages = [
  {
    id: '01',
    title: 'Design Brief',
    description: 'Understanding the problem space. Who needs this vehicle? What does it need to do? What story does it tell?',
    sub: 'Research · User Study · Brief',
  },
  {
    id: '02',
    title: 'Reference Gathering',
    description: 'Assembling visual and emotional references from architecture, nature, military, and culture.',
    sub: 'Moodboard · References · Keywords',
  },
  {
    id: '03',
    title: 'Concept Sketching',
    description: 'Rapid ideation through sketching. Exploring silhouettes, proportions, and character lines.',
    sub: 'Sketches · Ideation · Exploration',
  },
  {
    id: '04',
    title: 'Speedform Development',
    description: 'Refining the best sketches into a cohesive speedform. Establishing the primary surfaces.',
    sub: 'Speedform · Surfacing · Proportion',
  },
  {
    id: '05',
    title: 'Detail Development',
    description: 'Developing lighting signatures, grille treatment, wheel design, and interior volume.',
    sub: 'Lighting · Grille · Details',
  },
  {
    id: '06',
    title: 'Final Design',
    description: 'Complete design resolution presented through studio renders and contextual scenarios.',
    sub: 'Final Render · Presentation · Story',
  },
];

export function ProcessPage({ project }: { project: Project }) {
  const [active, setActive] = useState(0);

  return (
    <div className="min-h-screen bg-bg">
      {/* Back */}
      <div className="fixed top-20 left-8 z-40">
        <Link
          href={`/portfolio/${project.slug}`}
          className="flex items-center gap-2 text-[10px] tracking-[0.25em] font-semibold text-muted hover:text-accent transition-colors duration-300"
        >
          <ArrowLeft size={12} /> {project.title}
        </Link>
      </div>

      {/* Header */}
      <section className="pt-40 pb-24 px-8 md:px-16">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 mb-10"
          >
            <span className="text-[10px] tracking-[0.3em] text-muted font-semibold">IDEATION PROCESS</span>
            <span className="flex-1 h-px bg-bg-secondary" />
            <span className="text-[10px] tracking-[0.3em] text-muted font-semibold">{project.title} {project.subtitle}</span>
          </motion.div>

          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="text-[clamp(3rem,9vw,8rem)] font-black tracking-[-0.02em] leading-[0.85] text-text-primary"
            >
              Ideation
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="text-[clamp(3rem,9vw,8rem)] font-black tracking-[-0.02em] leading-[0.85] text-accent"
            >
              Process
            </motion.h1>
          </div>
        </div>
      </section>

      {/* Main content — split layout */}
      <section className="px-8 md:px-16 pb-32">
        <div className="max-w-[1400px] mx-auto grid md:grid-cols-[1fr_2fr] gap-16">
          {/* Stage list */}
          <div className="flex flex-col gap-1">
            {stages.map((stage, i) => (
              <motion.button
                key={stage.id}
                onClick={() => setActive(i)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                className={`text-left px-6 py-5 border transition-all duration-300 ${
                  active === i
                    ? 'border-accent bg-accent/5 text-text-primary'
                    : 'border-bg-secondary text-muted hover:border-muted hover:text-text-primary'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-[9px] tracking-[0.3em] font-bold ${active === i ? 'text-accent' : 'text-muted/50'}`}>
                    {stage.id}
                  </span>
                  {active === i && <ArrowUpRight size={12} className="text-accent" />}
                </div>
                <div className={`text-sm font-semibold tracking-tight ${active === i ? 'text-text-primary' : ''}`}>
                  {stage.title}
                </div>
              </motion.button>
            ))}
          </div>

          {/* Stage detail */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -20, filter: 'blur(4px)' }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Stage image */}
                <div
                  className={`w-full bg-gradient-to-br ${project.heroGradient} mb-10 relative overflow-hidden`}
                  style={{ aspectRatio: '16/9' }}
                >
                  <div className="absolute inset-0 bg-black/10" />
                  <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                      backgroundImage: 'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
                      backgroundSize: '40px 40px',
                    }}
                  />
                  <div className="absolute bottom-6 left-8">
                    <span className="text-[10px] tracking-[0.3em] font-semibold text-white/30">
                      STAGE {stages[active].id}
                    </span>
                  </div>
                </div>

                {/* Stage info */}
                <div className="mb-3">
                  <span className="text-[9px] tracking-[0.3em] font-semibold text-accent">{stages[active].sub}</span>
                </div>
                <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-black tracking-[-0.02em] text-text-primary mb-6 leading-tight">
                  {stages[active].title}
                </h2>
                <p className="text-muted font-light leading-relaxed text-lg max-w-[480px]">
                  {stages[active].description}
                </p>

                {/* Navigation */}
                <div className="flex items-center gap-4 mt-12">
                  <button
                    onClick={() => setActive((a) => Math.max(a - 1, 0))}
                    disabled={active === 0}
                    className="w-10 h-10 border border-bg-secondary flex items-center justify-center text-muted hover:border-accent hover:text-accent disabled:opacity-20 transition-all duration-300"
                  >
                    <ChevronLeft size={14} />
                  </button>
                  <div className="flex gap-1.5">
                    {stages.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActive(i)}
                        className={`transition-all duration-300 rounded-full ${
                          i === active ? 'w-5 h-1.5 bg-accent' : 'w-1.5 h-1.5 bg-bg-secondary hover:bg-muted'
                        }`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={() => setActive((a) => Math.min(a + 1, stages.length - 1))}
                    disabled={active === stages.length - 1}
                    className="w-10 h-10 border border-bg-secondary flex items-center justify-center text-muted hover:border-accent hover:text-accent disabled:opacity-20 transition-all duration-300"
                  >
                    <ChevronRight size={14} />
                  </button>

                  <span className="text-[9px] tracking-[0.2em] text-muted font-semibold ml-4">
                    {active + 1} / {stages.length}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
}
