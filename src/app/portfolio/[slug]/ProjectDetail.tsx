'use client';

import { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Project } from '@/lib/data';
import { ImageViewer } from '@/components/viewer/ImageViewer';
import { PortfolioViewer } from '@/components/viewer/PortfolioViewer';

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

  const [viewerOpen, setViewerOpen] = useState(false);
  const [imageViewerOpen, setImageViewerOpen] = useState(false);
  const [imageViewerData, setImageViewerData] = useState({ gradient: '', label: '' });

  const openImage = (gradient: string, label: string) => {
    setImageViewerData({ gradient, label });
    setImageViewerOpen(true);
  };

  const processSlides = [
    { label: 'Design Brief', gradient: project.thumbnailGradient, caption: '01 — DESIGN BRIEF & RESEARCH' },
    { label: 'Concept Sketches', gradient: project.heroGradient, caption: '02 — INITIAL CONCEPT SKETCHES' },
    { label: 'Speedform', gradient: project.thumbnailGradient, caption: '03 — SPEEDFORM DEVELOPMENT' },
    { label: 'Clay Model', gradient: project.heroGradient, caption: '04 — CLAY MODEL STUDY' },
    { label: 'Surface Development', gradient: project.thumbnailGradient, caption: '05 — SURFACE DEVELOPMENT' },
    { label: 'Final Render', gradient: project.heroGradient, caption: '06 — FINAL DESIGN RENDER' },
  ];

  return (
    <div className="min-h-screen bg-bg">
      {/* Viewers */}
      <ImageViewer
        isOpen={imageViewerOpen}
        onClose={() => setImageViewerOpen(false)}
        gradient={imageViewerData.gradient}
        label={imageViewerData.label}
      />
      <PortfolioViewer
        isOpen={viewerOpen}
        onClose={() => setViewerOpen(false)}
        slides={processSlides}
        title={`${project.title} — IDEATION PROCESS`}
      />

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
          <div className="flex flex-wrap gap-2 mb-8">
            {project.keywords.map((kw) => (
              <span key={kw} className="text-[9px] tracking-[0.3em] font-semibold text-white/60 border border-white/20 px-3 py-1.5">
                {kw}
              </span>
            ))}
          </div>

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
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              onClick={() => openImage(project.thumbnailGradient, 'PERSONA — ' + project.persona.name)}
              className="relative overflow-hidden bg-bg-secondary cursor-pointer group"
              data-cursor={`PERSONA\nVIEW`}
              style={{ aspectRatio: '3/4' }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${project.thumbnailGradient} opacity-60`} />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="absolute top-4 right-4 w-7 h-7 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <ArrowUpRight size={12} className="text-white" />
              </motion.div>
              <div className="absolute bottom-6 left-6">
                <div className="text-[10px] tracking-[0.3em] text-white/50 font-semibold mb-1">PERSONA</div>
                <div className="text-2xl font-bold text-white">{project.persona.name}</div>
              </div>
            </motion.div>

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
                onClick={() => openImage(project.heroGradient, keywords.join(' · '))}
                data-cursor={keywords.join('\n')}
                className="relative overflow-hidden group cursor-pointer"
                style={{ aspectRatio: '4/3' }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${project.heroGradient} opacity-${70 - i * 15}`} />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/5 transition-colors duration-500" />
                <motion.div
                  animate={{ scale: 1 }}
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0"
                />
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <div className="flex flex-wrap gap-2">
                    {keywords.map((kw) => (
                      <span key={kw} className="text-[9px] tracking-[0.25em] font-semibold text-white/70">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="absolute top-4 right-4 w-7 h-7 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowUpRight size={11} className="text-white" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 04 — Speedform Development */}
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

          <div className="flex flex-col md:flex-row items-center gap-0">
            {['REFERENCE', 'SKETCH', 'SPEEDFORM', 'FINAL DESIGN'].map((stage, i) => (
              <motion.div
                key={stage}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="flex md:flex-row items-center gap-0 flex-1 w-full"
              >
                <div className="flex flex-col items-center gap-4 flex-1 w-full">
                  <div
                    onClick={() => openImage(project.thumbnailGradient, stage)}
                    data-cursor={`VIEW\n${stage}`}
                    className="relative overflow-hidden bg-bg-secondary w-full group cursor-pointer"
                    style={{ aspectRatio: '4/3' }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.thumbnailGradient} opacity-${40 + i * 15}`} />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-400" />
                    <div className="absolute bottom-3 left-3 text-[9px] tracking-[0.2em] font-semibold text-white/50">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                        <ArrowUpRight size={10} className="text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="text-[9px] tracking-[0.25em] font-semibold text-muted text-center">{stage}</div>
                </div>
                {i < 3 && (
                  <div className="text-muted/30 font-thin text-xl mx-3 md:mt-[-20px] rotate-90 md:rotate-0">→</div>
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

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onClick={() => openImage(project.heroGradient, 'SIDE VIEW')}
            data-cursor={`SIDE VIEW\nZOOM`}
            className="relative overflow-hidden mb-4 w-full group cursor-pointer"
            style={{ aspectRatio: '21/9' }}
          >
            <div className={`absolute inset-0 bg-gradient-to-r ${project.heroGradient}`} />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
            <div className="absolute bottom-6 left-8 text-[9px] tracking-[0.3em] font-semibold text-white/40">SIDE VIEW</div>
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center">
                <ArrowUpRight size={12} className="text-white" />
              </div>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4">
            {['FRONT VIEW', 'REAR VIEW'].map((view, i) => (
              <motion.div
                key={view}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => openImage(project.thumbnailGradient, view)}
                data-cursor={`${view}\nZOOM`}
                className="relative overflow-hidden group cursor-pointer"
                style={{ aspectRatio: '4/3' }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${project.thumbnailGradient} opacity-80`} />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-500" />
                <div className="absolute bottom-4 left-5 text-[9px] tracking-[0.3em] font-semibold text-white/40">{view}</div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center">
                    <ArrowUpRight size={12} className="text-white" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 06 — User Scenario */}
      <section className="py-0 relative overflow-hidden">
        <div className="relative" style={{ aspectRatio: '21/9' }}>
          <motion.div
            initial={{ scale: 1.06 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className={`absolute inset-0 bg-gradient-to-br ${project.heroGradient}`}
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 flex flex-col justify-end px-12 md:px-24 pb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="flex items-center gap-4 mb-8"
            >
              <span className="text-[10px] tracking-[0.3em] text-white/40 font-semibold">06 — USER SCENARIO</span>
              <span className="w-16 h-px bg-white/20" />
            </motion.div>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: '110%' }}
                whileInView={{ y: '0%' }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="text-[clamp(2rem,5vw,5rem)] font-black tracking-[-0.02em] text-white leading-tight"
              >
                {project.persona.name}
              </motion.h2>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-white/50 font-light text-lg max-w-[560px] mt-4 leading-relaxed"
            >
              {project.persona.occupation} — {project.persona.hobbies[0]}
            </motion.p>
          </div>
        </div>
      </section>

      {/* SECTION 07 — Specifications */}
      <section className="py-32 px-8 md:px-16">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-20"
          >
            <span className="text-[10px] tracking-[0.3em] text-muted font-semibold">07 — SPECIFICATIONS</span>
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

      {/* SECTION 08 — Ideation Process Card */}
      <section className="py-20 px-8 md:px-16 bg-bg-secondary">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-12">
              <span className="text-[10px] tracking-[0.3em] text-muted font-semibold">08 — IDEATION PROCESS</span>
              <span className="flex-1 h-px bg-muted/20" />
            </div>

            <button
              onClick={() => setViewerOpen(true)}
              data-cursor={`VIEW\nPROCESS`}
              className="group w-full border border-bg-secondary hover:border-accent bg-bg p-12 md:p-16 text-left transition-all duration-500 hover:bg-accent/5 relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[10px] tracking-[0.3em] text-muted font-semibold mb-4">
                    FULL PRESENTATION · {processSlides.length} SLIDES
                  </div>
                  <h3 className="text-[clamp(1.5rem,4vw,3.5rem)] font-black tracking-[-0.02em] text-text-primary group-hover:text-accent transition-colors duration-400">
                    View Design Process
                  </h3>
                  <p className="text-muted font-light mt-3 text-sm max-w-[400px]">
                    Explore the complete ideation journey from initial research to final design execution.
                  </p>
                </div>
                <motion.div
                  animate={{ x: 0 }}
                  whileHover={{ x: 4 }}
                  className="w-16 h-16 rounded-full border border-bg-secondary group-hover:border-accent group-hover:bg-accent flex items-center justify-center transition-all duration-400 ml-8 flex-shrink-0"
                >
                  <ArrowUpRight size={20} className="text-muted group-hover:text-white transition-colors duration-400" />
                </motion.div>
              </div>

              {/* Progress indicator preview */}
              <div className="mt-12 flex items-center gap-4">
                <div className="flex-1 h-px bg-bg-secondary">
                  <div className="h-full bg-accent w-0 group-hover:w-full transition-all duration-700 ease-out" />
                </div>
                <span className="text-[9px] tracking-[0.25em] text-muted font-semibold">0% COMPLETE</span>
              </div>
            </button>
          </motion.div>
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
