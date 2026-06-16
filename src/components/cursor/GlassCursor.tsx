'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface CursorState {
  x: number;
  y: number;
  label: string;
  isVisible: boolean;
  isHovering: boolean;
}

export function GlassCursor() {
  const [cursor, setCursor] = useState<CursorState>({
    x: -100,
    y: -100,
    label: '',
    isVisible: false,
    isHovering: false,
  });

  const dotRef = useRef({ x: -100, y: -100 });
  const glassRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);
  const glassPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      glassPos.current.x = lerp(glassPos.current.x, dotRef.current.x, 0.1);
      glassPos.current.y = lerp(glassPos.current.y, dotRef.current.y, 0.1);

      if (glassRef.current) {
        glassRef.current.style.transform = `translate(${glassPos.current.x - 60}px, ${glassPos.current.y - 60}px)`;
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    const onMove = (e: MouseEvent) => {
      dotRef.current = { x: e.clientX, y: e.clientY };
      setCursor((prev) => ({ ...prev, x: e.clientX, y: e.clientY, isVisible: true }));
    };

    const onEnter = () => setCursor((prev) => ({ ...prev, isVisible: true }));
    const onLeave = () => setCursor((prev) => ({ ...prev, isVisible: false }));

    const onHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const label = target.closest('[data-cursor]')?.getAttribute('data-cursor') || '';
      if (label) {
        setCursor((prev) => ({ ...prev, label, isHovering: true }));
      }
    };

    const onHoverEnd = () => {
      setCursor((prev) => ({ ...prev, label: '', isHovering: false }));
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseenter', onEnter);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseover', onHoverStart);
    document.addEventListener('mouseout', onHoverEnd);

    return () => {
      cancelAnimationFrame(animRef.current);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseenter', onEnter);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseover', onHoverStart);
      document.removeEventListener('mouseout', onHoverEnd);
    };
  }, []);

  return (
    <>
      {/* Dot cursor */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-accent z-[9999] pointer-events-none mix-blend-normal"
        animate={{
          x: cursor.x - 3,
          y: cursor.y - 3,
          opacity: cursor.isVisible ? 1 : 0,
          scale: cursor.isHovering ? 0 : 1,
        }}
        transition={{ duration: 0, x: { duration: 0 }, y: { duration: 0 } }}
      />

      {/* Glass panel */}
      <div
        ref={glassRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none will-change-transform"
        style={{ opacity: cursor.isVisible ? 1 : 0, transition: 'opacity 0.3s' }}
      >
        <motion.div
          animate={{
            width: cursor.isHovering ? 120 : 0,
            height: cursor.isHovering ? 120 : 0,
            opacity: cursor.isHovering ? 1 : 0,
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-full overflow-hidden border border-white/20 backdrop-blur-md bg-white/10 dark:bg-black/20 dark:border-white/10 flex items-center justify-center"
        >
          {cursor.label && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center px-2"
            >
              {cursor.label.split('\n').map((line, i) => (
                <div
                  key={i}
                  className="text-[9px] font-semibold tracking-[0.2em] text-text-primary uppercase leading-tight"
                >
                  {line}
                </div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </>
  );
}
