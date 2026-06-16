'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Project } from '@/lib/data';

const specLabels: Record<string, string> = {
  length: 'LENGTH',
  width: 'WIDTH',
  height: 'HEIGHT',
  wheelbase: 'WHEELBASE',
  groundClearance: 'GROUND CLEARANCE',
  powertrain: 'POWERTRAIN',
  driveType: 'DRIVE TYPE',
  passengers: 'PASSENGERS',
};

export function ProjectDetail({ project }: { project: Project }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <div className="min-h-screen bg-bg">
      {/* Back nav */}
      <div className="fixed top-20 left-8 z-40">
        <Link
          href="/portfolio"
          data-cursor="BACK"
          className="flex items-center gap-2 text-[10px] tracking-[0.25em] font-semibold text-muted hover:text-accent transition-colors duration-300"
        >
          <ArrowLeft size={12} />
          PORTFOLIO
        </Link>
      </div>

      {/* SECTION 01 — Hero */}
      <section ref={heroRef} className="relative h-screen flex flex-col justify-end overflow-hidden">
        <motion.div
          style={{ y: heroY }}
          className={`absolute inset-0 bg-gradient-to-br ${project.heroGradient}`}
        />

        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 px-8 md:px-16 pb-16 max-w-[1400px] mx-auto w-full"
        >
          {/* Keywords */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.keywords.map((kw) => (
              <span key={kw} className="text-[9px] tracking-[0.3em] font-semibold text-white/60 border border-white/20 px-3 py-1.5">
                {kw}
              </span>
            ))}
          </div>

          {/* Title */}
          <div className="overflow-hidden mb-2">
            <motion.h1
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="text-[clamp(4rem,12vw,11rem)] font-black tracking-[-0.02em] leading-[0.85] text-white"
            >
              {project.title}
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-12">
            <motion.h1
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
              className="text-[clamp(4rem,12vw,11rem)] font-thin tracking-[-0.02em] leading-[0.85] text-white/40"
            >
              {project.subtitle}
            </motion.h1>
          </div>

          {/* Meta row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex items-center gap-8 text-white/40"
          >
            <span className="text-[10px] tracking-[0.25em] font-semibold">{project.category}</span>
            <span className="w-px h-4 bg-white/20" />
            <span className="text-[10px] tracking-[0.25em] font-semibold">{project.vehicleType}</span>
            <span className="w-px h-4 bg-white/20" />
            <span className="text-[10px] tracking-[0.25em] font-semibold">{project.year}</span>
          </motion.div>
        </motion.div>

        {/* Scroll gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg to-transparent z-10" />
      </section>

      {/* SECTION 02 — Persona */}
      <section className="py-32 px-8 md:px-16">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-20"
          >
            <span className="text-[10px] tracking-[0.3em] text-muted font-semibold">02 — PERSONA</span>
            <span className="flex-1 h-px bg-bg-secondary" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* Persona image */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              className="relative overflow-hidden bg-bg-secondary"
              style={{ aspectRatio: '3/4' }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${project.thumbnailGradient} opacity-60`} />
              <div className="absolute bottom-6 left-6">
                <div className="text-[10px] tracking-[0.3em] text-white/50 font-semibold mb-1">PERSONA</div>
                <div className="text-2xl font-bold text-white">{project.persona.name}</div>
              </div>
            </motion.div>

            {/* Persona story */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.15 }}
            >
              <h3 className="text-3xl font-light tracking-tight text-text-primary mb-8 leading-tight">
                {project.persona.story}
              </h3>

              <div className="grid grid-cols-2 gap-6 mt-12">
                {[
                  { label: 'AGE', value: `${project.persona.age}` },
                  { label: 'OCCUPATION', value: project.persona.occupation },
                  { label: 'HOBBIES', value: project.persona.hobbies.join(', ') },
                  { label: 'KEYWORDS', value: project.principles.join(' · ') },
                ].map((item) => (
                  <div key={item.label} className="border-t border-bg-secondary pt-4">
                    <div className="text-[9px] tracking-[0.3em] text-muted font-semibold mb-2">{item.label}</div>
                    <div className="text-sm font-light text-text-primary leading-relaxed">{item.value}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 03 — Reference Images */}
      <section className="py-20 px-8 md:px-16 bg-bg-secondary">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-16"
          >
            <span className="text-[10px] tracking-[0.3em] text-muted font-semibold">03 — REFERENCES</span>
            <span className="flex-1 h-px bg-muted/20" />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-4">
            {project.referenceKeywords.map((keywords, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.12 }}
                className="relative overflow-hidden group"
                style={{ aspectRatio: '4/3' }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${project.heroGradient} opacity-${70 - i * 15}`} />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <div className="flex flex-wrap gap-2">
                    {keywords.map((kw) => (
                      <span key={kw} className="text-[9px] tracking-[0.25em] font-semibold text-white/70">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 04 — Design Process Flow */}
      <section className="py-32 px-8 md:px-16">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-20"
          >
            <span className="text-[10px] tracking-[0.3em] text-muted font-semibold">04 — SPEEDFORM DEVELOPMENT</span>
            <span className="flex-1 h-px bg-bg-secondary" />
          </motion.div>

          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            {['REFERENCE', 'SKETCH', 'SPEEDFORM', 'FINAL DESIGN'].map((stage, i) => (
              <motion.div
                key={stage}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="flex md:flex-col items-center gap-4 md:gap-6 flex-1"
              >
                <div className="relative overflow-hidden bg-bg-secondary flex-1 w-full" style={{ aspectRatio: '4/3', minWidth: '120px' }}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.thumbnailGradient} opacity-${40 + i * 15}`} />
                  <div className="absolute bottom-3 left-3 text-[9px] tracking-[0.2em] font-semibold text-white/50">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-[9px] tracking-[0.25em] font-semibold text-muted">{stage}</div>
                </div>

                {i < 3 && (
                  <div className="text-muted font-thin text-2xl md:rotate-90 md:my-2">→</div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 05 — Final Design */}
      <section className="py-20 px-8 md:px-16 bg-bg-secondary">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-16"
          >
            <span className="text-[10px] tracking-[0.3em] text-muted font-semibold">05 — FINAL DESIGN</span>
            <span className="flex-1 h-px bg-muted/20" />
          </motion.div>

          {/* Side View - full width */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden mb-4 w-full"
            style={{ aspectRatio: '21/9' }}
          >
            <div className={`absolute inset-0 bg-gradient-to-r ${project.heroGradient}`} />
            <div className="absolute bottom-6 left-8 text-[9px] tracking-[0.3em] font-semibold text-white/40">SIDE VIEW</div>
          </motion.div>

          {/* Front / Rear */}
          <div className="grid md:grid-cols-2 gap-4">
            {['FRONT VIEW', 'REAR VIEW'].map((view, i) => (
              <motion.div
                key={view}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative overflow-hidden"
                style={{ aspectRatio: '4/3' }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${project.thumbnailGradient} opacity-80`} />
                <div className="absolute bottom-4 left-5 text-[9px] tracking-[0.3em] font-semibold text-white/40">{view}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 06 — Specifications */}
      <section className="py-32 px-8 md:px-16">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-20"
          >
            <span className="text-[10px] tracking-[0.3em] text-muted font-semibold">06 — SPECIFICATIONS</span>
            <span className="flex-1 h-px bg-bg-secondary" />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-bg-secondary">
            {Object.entries(project.specs).map(([key, value], i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="bg-bg p-8 hover:bg-bg-secondary transition-colors duration-300"
              >
                <div className="text-[9px] tracking-[0.3em] font-semibold text-muted mb-3">
                  {specLabels[key]}
                </div>
                <div className="text-sm font-light text-text-primary leading-tight">
                  {value}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer nav */}
      <div className="py-16 px-8 border-t border-bg-secondary">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <Link
            href="/portfolio"
            className="text-[10px] tracking-[0.25em] font-semibold text-muted hover:text-accent transition-colors duration-300 flex items-center gap-2"
          >
            <ArrowLeft size={12} /> ALL PROJECTS
          </Link>
          <span className="text-[9px] tracking-[0.25em] text-muted font-semibold">
            {project.title} {project.subtitle} — {project.year}
          </span>
        </div>
      </div>
    </div>
  );
}
