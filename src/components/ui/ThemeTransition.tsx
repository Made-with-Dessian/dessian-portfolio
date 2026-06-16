'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';

const CarSilhouette = () => (
  <svg
    viewBox="0 0 800 200"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
  >
    <path d="M760 140 L740 140 C738 120 720 105 700 105 C680 105 663 120 660 140 L200 140 C198 120 180 105 160 105 C140 105 122 120 120 140 L80 140 L70 130 L65 110 L90 80 L150 65 L220 50 L340 42 L430 40 L520 42 L600 55 L670 70 L710 85 L745 110 L760 125 Z
    M160 155 C160 163 153 170 145 170 C137 170 130 163 130 155 C130 147 137 140 145 140 C153 140 160 147 160 155 Z
    M690 155 C690 163 683 170 675 170 C667 170 660 163 660 155 C660 147 667 140 675 140 C683 140 690 147 690 155 Z" />
  </svg>
);

export function ThemeTransition() {
  const { resolvedTheme } = useTheme();
  const [sweeping, setSweeping] = useState(false);
  const prevTheme = useRef<string | undefined>(undefined);
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      prevTheme.current = resolvedTheme;
      return;
    }

    if (prevTheme.current !== resolvedTheme) {
      setSweeping(true);
      prevTheme.current = resolvedTheme;
      const timer = setTimeout(() => setSweeping(false), 900);
      return () => clearTimeout(timer);
    }
  }, [resolvedTheme]);

  return (
    <AnimatePresence>
      {sweeping && (
        <motion.div
          className="fixed inset-0 z-[10000] pointer-events-none flex items-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, delay: 0.7 }}
        >
          <motion.div
            className="absolute text-accent opacity-80"
            style={{ width: '30vw', height: '8vw' }}
            initial={{ x: '-35vw', y: '0%' }}
            animate={{ x: '110vw', y: '0%' }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            <CarSilhouette />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
