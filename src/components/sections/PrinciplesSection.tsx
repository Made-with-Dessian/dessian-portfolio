'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const principles = [
  {
    number: '01',
    title: 'Function Before Form',
    description: 'Every curve, every surface must earn its place. Beauty is not decoration — it is the visible evidence of purpose.',
  },
  {
    number: '02',
    title: 'Every Surface Has Purpose',
    description: 'There are no accidental lines. Each surface manages airflow, defines proportion, or reinforces the vehicle\'s character.',
  },
  {
    number: '03',
    title: 'Emotion Creates Value',
    description: 'Engineering solves problems. Design creates desire. The space between those two is where great automotive design lives.',
  },
  {
    number: '04',
    title: 'Adventure Defines Identity',
    description: 'The most compelling vehicles are defined by where they can go, not where they are parked.',
  },
];

function PrincipleItem({ principle }: { principle: typeof principles[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.5'] });
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.2, 1, 1, 0.4]);
  const x = useTransform(scrollYProgress, [0, 0.3], [-40, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, x }}
      className="py-16 md:py-24 border-b border-bg-secondary last:border-0 grid md:grid-cols-[120px_1fr_1fr] gap-8 items-center"
    >
      <span className="text-[clamp(2rem,4vw,3.5rem)] font-black text-muted/20 tracking-[-0.02em]">
        {principle.number}
      </span>
      <h3 className="text-[clamp(1.4rem,3vw,2.5rem)] font-light tracking-[-0.01em] text-text-primary leading-tight">
        {principle.title}
      </h3>
      <p className="text-muted font-light leading-relaxed text-[clamp(0.85rem,1vw,0.95rem)]">
        {principle.description}
      </p>
    </motion.div>
  );
}

export function PrinciplesSection() {
  return (
    <section className="py-20 px-8">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-8 flex items-center gap-4"
        >
          <span className="text-[10px] tracking-[0.3em] text-muted font-semibold">03 — PRINCIPLES</span>
          <span className="flex-1 h-px bg-bg-secondary" />
        </motion.div>

        <div>
          {principles.map((p, i) => (
            <PrincipleItem key={p.number} principle={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
