'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const keywords = [
  'Transportation Design',
  'Mobility Concept',
  'Storytelling',
  'Emotional Design',
];

export function PhilosophySection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={ref} className="relative py-40 md:py-64 px-8 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-20 flex items-center gap-4"
        >
          <span className="text-[10px] tracking-[0.3em] text-muted font-semibold">02 — PHILOSOPHY</span>
          <span className="flex-1 h-px bg-bg-secondary" />
        </motion.div>

        {/* Main editorial text */}
        <motion.div style={{ y }} className="mb-24">
          <div className="overflow-hidden mb-3">
            <motion.h2
              initial={{ y: '110%' }}
              whileInView={{ y: '0%' }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(2.5rem,7vw,7rem)] font-thin tracking-[-0.02em] leading-[0.9] text-text-primary"
            >
              I don&apos;t design
            </motion.h2>
          </div>
          <div className="overflow-hidden mb-3">
            <motion.h2
              initial={{ y: '110%' }}
              whileInView={{ y: '0%' }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(2.5rem,7vw,7rem)] font-thin tracking-[-0.02em] leading-[0.9] text-text-primary"
            >
              cars.
            </motion.h2>
          </div>
          <div className="overflow-hidden mt-6">
            <motion.h2
              initial={{ y: '110%' }}
              whileInView={{ y: '0%' }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(2.5rem,7vw,7rem)] font-black tracking-[-0.02em] leading-[0.9] text-text-primary"
            >
              I design
            </motion.h2>
          </div>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: '110%' }}
              whileInView={{ y: '0%' }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(2.5rem,7vw,7rem)] font-black tracking-[-0.02em] leading-[0.9] text-accent"
            >
              experiences.
            </motion.h2>
          </div>
        </motion.div>

        {/* Supporting text + keywords */}
        <div className="grid md:grid-cols-2 gap-12 items-end">
          <motion.p
            initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="text-muted text-[clamp(0.9rem,1.2vw,1.1rem)] font-light leading-relaxed max-w-[480px]"
          >
            Every vehicle is a stage. The driver is not a passenger — they are the protagonist. 
            My job is to design the environment that makes that story possible.
          </motion.p>

          <div className="flex flex-wrap gap-3">
            {keywords.map((kw, i) => (
              <motion.span
                key={kw}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * i }}
                className="px-4 py-2 border border-bg-secondary text-[10px] tracking-[0.2em] font-semibold text-muted hover:border-accent hover:text-accent transition-colors duration-300"
              >
                {kw}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
