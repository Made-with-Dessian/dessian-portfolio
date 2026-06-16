'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { projects } from '@/lib/data';
import { ArrowUpRight } from 'lucide-react';

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        href={`/portfolio/${project.slug}`}
        data-cursor={`${project.title}\n${project.subtitle}\nVIEW`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="group block"
      >
        {/* Image container */}
        <div className="relative overflow-hidden bg-bg-secondary mb-6" style={{ aspectRatio: '4/3' }}>
          {/* Gradient placeholder */}
          <motion.div
            animate={{ scale: hovered ? 1.06 : 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className={`absolute inset-0 bg-gradient-to-br ${project.thumbnailGradient}`}
          />

          {/* Overlay */}
          <motion.div
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center"
          >
            <div className="text-center text-white">
              <div className="text-[10px] tracking-[0.3em] font-semibold mb-2 opacity-80">
                {project.keywords.join(' · ')}
              </div>
              <div className="text-sm font-light tracking-wider">{project.shortDescription}</div>
            </div>
          </motion.div>

          {/* Top-right arrow */}
          <motion.div
            animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.8 }}
            transition={{ duration: 0.3 }}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-accent flex items-center justify-center"
          >
            <ArrowUpRight size={14} className="text-white" />
          </motion.div>

          {/* Year */}
          <div className="absolute bottom-4 left-4 text-[10px] tracking-[0.2em] text-white/50 font-semibold">
            {project.year}
          </div>
        </div>

        {/* Card info */}
        <div className="flex items-start justify-between">
          <div>
            <div className="text-[10px] tracking-[0.25em] text-muted font-semibold mb-2">
              {project.category} · {project.vehicleType}
            </div>
            <h3 className="text-xl font-bold tracking-[-0.01em] text-text-primary group-hover:text-accent transition-colors duration-300">
              {project.title} {project.subtitle}
            </h3>
          </div>
          <motion.div
            animate={{ x: hovered ? 0 : -4, opacity: hovered ? 1 : 0.3 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowUpRight size={16} className="text-accent mt-1" />
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
}

export function FeaturedProjects() {
  return (
    <section className="py-32 px-8">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-end justify-between mb-16">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-6"
            >
              <span className="text-[10px] tracking-[0.3em] text-muted font-semibold">04 — DESIGN PORTFOLIO</span>
              <span className="w-16 h-px bg-bg-secondary" />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-[clamp(2rem,5vw,4rem)] font-black tracking-[-0.02em] text-text-primary"
            >
              Featured<br />Projects
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link
              href="/portfolio"
              data-cursor="ALL\nPROJECTS"
              className="text-[10px] tracking-[0.25em] font-semibold text-muted hover:text-accent transition-colors duration-300 flex items-center gap-2"
            >
              VIEW ALL <ArrowUpRight size={12} />
            </Link>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
