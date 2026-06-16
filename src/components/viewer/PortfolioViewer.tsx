'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
  label: string;
  gradient: string;
  caption?: string;
}

interface PortfolioViewerProps {
  isOpen: boolean;
  onClose: () => void;
  slides: Slide[];
  title: string;
}

export function PortfolioViewer({ isOpen, onClose, slides, title }: PortfolioViewerProps) {
  const [current, setCurrent] = useState(0);
  const progress = Math.round(((current + 1) / slides.length) * 100);

  const prev = () => setCurrent((c) => Math.max(c - 1, 0));
  const next = () => setCurrent((c) => Math.min(c + 1, slides.length - 1));

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) setCurrent(0);
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[10000] bg-[#050505] flex flex-col"
        >
          {/* Fixed top bar */}
          <div className="flex items-center justify-between px-8 py-5 border-b border-white/5">
            <div className="flex items-center gap-6">
              <span className="text-[10px] tracking-[0.3em] font-semibold text-white/30 uppercase">{title}</span>
              <div className="h-4 w-px bg-white/10" />
              <span className="text-[10px] tracking-[0.3em] font-bold text-accent">
                {progress}% COMPLETE
              </span>
            </div>

            <div className="flex-1 mx-12 h-px bg-white/5">
              <motion.div
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="h-full bg-accent"
              />
            </div>

            <div className="flex items-center gap-4">
              <span className="text-[10px] tracking-[0.2em] text-white/30">
                {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
              </span>
              <button onClick={onClose} className="w-8 h-8 flex items-center justify-center text-white/30 hover:text-white transition-colors">
                <X size={14} />
              </button>
            </div>
          </div>

          {/* Slide */}
          <div className="flex-1 relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 40, filter: 'blur(12px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -40, filter: 'blur(12px)' }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 flex items-center justify-center px-16 py-12"
              >
                <div className="w-full max-w-5xl">
                  <div
                    className={`w-full bg-gradient-to-br ${slides[current].gradient} mb-6`}
                    style={{ aspectRatio: '16/9' }}
                  />
                  {slides[current].caption && (
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-[11px] tracking-[0.2em] text-white/30 text-center font-medium uppercase"
                    >
                      {slides[current].caption}
                    </motion.p>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom nav */}
          <div className="flex items-center justify-between px-8 py-5 border-t border-white/5">
            <button
              onClick={prev}
              disabled={current === 0}
              className="flex items-center gap-2 text-[10px] tracking-[0.2em] font-semibold text-white/30 hover:text-white disabled:opacity-20 transition-colors"
            >
              <ChevronLeft size={14} /> PREV
            </button>

            <div className="flex gap-1.5">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === current ? 'w-5 h-1.5 bg-accent' : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              disabled={current === slides.length - 1}
              className="flex items-center gap-2 text-[10px] tracking-[0.2em] font-semibold text-white/30 hover:text-white disabled:opacity-20 transition-colors"
            >
              NEXT <ChevronRight size={14} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
