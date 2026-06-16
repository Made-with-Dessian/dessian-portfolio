'use client';

import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

interface ImageViewerProps {
  isOpen: boolean;
  onClose: () => void;
  gradient: string;
  label: string;
}

export function ImageViewer({ isOpen, onClose, gradient, label }: ImageViewerProps) {
  const [scale, setScale] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const dragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });

  const reset = () => { setScale(1); setPos({ x: 0, y: 0 }); };
  const zoomIn = () => setScale((s) => Math.min(s + 0.5, 4));
  const zoomOut = () => setScale((s) => Math.max(s - 0.5, 0.5));

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    if (scale <= 1) return;
    dragging.current = true;
    lastPos.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
  }, [scale, pos]);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!dragging.current) return;
    setPos({ x: e.clientX - lastPos.current.x, y: e.clientY - lastPos.current.y });
  }, []);

  const onMouseUp = useCallback(() => { dragging.current = false; }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[10000] bg-black/95 backdrop-blur-xl flex flex-col"
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-8 py-5 border-b border-white/5">
            <span className="text-[10px] tracking-[0.3em] font-semibold text-white/40 uppercase">{label}</span>
            <div className="flex items-center gap-2">
              <button onClick={zoomOut} className="w-8 h-8 flex items-center justify-center text-white/40 hover:text-white transition-colors">
                <ZoomOut size={14} />
              </button>
              <span className="text-[10px] tracking-[0.2em] text-white/40 w-10 text-center">{Math.round(scale * 100)}%</span>
              <button onClick={zoomIn} className="w-8 h-8 flex items-center justify-center text-white/40 hover:text-white transition-colors">
                <ZoomIn size={14} />
              </button>
              <div className="w-px h-4 bg-white/10 mx-1" />
              <button onClick={reset} className="w-8 h-8 flex items-center justify-center text-white/40 hover:text-white transition-colors">
                <RotateCcw size={14} />
              </button>
              <div className="w-px h-4 bg-white/10 mx-1" />
              <button onClick={onClose} className="w-8 h-8 flex items-center justify-center text-white/40 hover:text-white transition-colors">
                <X size={14} />
              </button>
            </div>
          </div>

          {/* Image area */}
          <div
            className="flex-1 flex items-center justify-center overflow-hidden"
            style={{ cursor: scale > 1 ? 'grab' : 'default' }}
          >
            <motion.div
              animate={{ scale, x: pos.x, y: pos.y }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onMouseDown={onMouseDown}
              className={`w-[80vw] h-[70vh] bg-gradient-to-br ${gradient} select-none`}
              style={{ cursor: scale > 1 ? 'grab' : 'zoom-in' }}
              onDoubleClick={() => scale === 1 ? setScale(2) : reset()}
            />
          </div>

          {/* Hint */}
          <div className="py-4 text-center">
            <span className="text-[9px] tracking-[0.25em] text-white/20 font-medium">
              DOUBLE CLICK TO ZOOM · DRAG TO PAN · ESC TO CLOSE
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
