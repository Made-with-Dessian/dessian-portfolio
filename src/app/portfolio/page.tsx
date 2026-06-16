'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { projects } from '@/lib/data';
import { ArrowUpRight } from 'lucide-react';

const primaryFilters = ['ALL', 'ON ROAD', 'OFF ROAD', 'MOBILITY'] as const;
const secondaryFilters = ['ALL', 'SUV', 'SEDAN', 'SPORTS', 'WAGON', 'TRUCK', 'MOBILITY'] as const;

type PrimaryFilter = typeof primaryFilters[number];
type SecondaryFilter = typeof secondaryFilters[number];

export default function PortfolioPage() {
  const [primary, setPrimary] = useState<PrimaryFilter>('ALL');
  const [secondary, setSecondary] = useState<SecondaryFilter>('ALL');

  const filtered = projects.filter((p) => {
    const matchPrimary = primary === 'ALL' || p.category === primary;
    const matchSecondary = secondary === 'ALL' || p.vehicleType === secondary;
    return matchPrimary && matchSecondary;
  });

  return (
    <div className="min-h-screen bg-bg pt-32">
      <div className="max-w-[1400px] mx-auto px-8">
        {/* Header */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex items-center gap-4 mb-8"
          >
            <span className="text-[10px] tracking-[0.3em] text-muted font-semibold">DESIGN PORTFOLIO</span>
            <span className="flex-1 h-px bg-bg-secondary" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="text-[clamp(3rem,10vw,9rem)] font-black tracking-[-0.02em] leading-[0.85] text-text-primary"
          >
            Portfolio
          </motion.h1>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-16"
        >
          {/* Primary filters */}
          <div className="flex flex-wrap gap-2 mb-4">
            {primaryFilters.map((f) => (
              <button
                key={f}
                onClick={() => setPrimary(f)}
                className={`px-5 py-2.5 text-[10px] tracking-[0.2em] font-semibold transition-all duration-300 ${
                  primary === f
                    ? 'bg-text-primary text-bg'
                    : 'border border-bg-secondary text-muted hover:border-text-primary hover:text-text-primary'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Secondary filters */}
          <div className="flex flex-wrap gap-2">
            {secondaryFilters.map((f) => (
              <button
                key={f}
                onClick={() => setSecondary(f)}
                className={`px-4 py-1.5 text-[9px] tracking-[0.2em] font-semibold transition-all duration-300 ${
                  secondary === f
                    ? 'bg-accent text-white'
                    : 'border border-bg-secondary text-muted hover:border-accent hover:text-accent'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Grid */}
        <motion.div layout className="grid md:grid-cols-3 gap-8 mb-32">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95, filter: 'blur(8px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.95, filter: 'blur(8px)' }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href={`/portfolio/${project.slug}`}
                  data-cursor={`VIEW\n${project.title}`}
                  className="group block"
                >
                  {/* Thumbnail */}
                  <div className="relative overflow-hidden mb-5" style={{ aspectRatio: '4/3' }}>
                    <motion.div
                      whileHover={{ scale: 1.06 }}
                      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                      className={`absolute inset-0 bg-gradient-to-br ${project.thumbnailGradient}`}
                    />

                    {/* Glass overlay on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/30 backdrop-blur-[1px] flex flex-col justify-end p-6">
                      <div className="flex gap-2 flex-wrap">
                        {project.keywords.map((kw) => (
                          <span key={kw} className="text-[9px] tracking-[0.2em] font-semibold text-white/70 border border-white/20 px-2 py-1">
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-7 h-7 rounded-full bg-accent flex items-center justify-center">
                        <ArrowUpRight size={12} className="text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Meta */}
                  <div className="text-[9px] tracking-[0.25em] text-muted font-semibold mb-2">
                    {project.category} · {project.vehicleType} · {project.year}
                  </div>
                  <h3 className="text-lg font-bold tracking-tight text-text-primary group-hover:text-accent transition-colors duration-300 mb-1">
                    {project.title} {project.subtitle}
                  </h3>
                  <p className="text-muted text-sm font-light leading-relaxed line-clamp-2">
                    {project.shortDescription}
                  </p>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>

          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-3 py-32 text-center text-muted"
            >
              <div className="text-[10px] tracking-[0.3em] font-semibold">NO PROJECTS FOUND</div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
