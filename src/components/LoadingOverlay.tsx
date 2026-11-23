import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useAppContext } from '../context/ResultContext';
import { Pip } from './Pip';

interface LoadingOverlayProps {
  visible: boolean;
}

export function LoadingOverlay({ visible }: LoadingOverlayProps) {
  const { t, liteMode } = useAppContext();
  const prefersReduced = useReducedMotion();
  const disableMotion = liteMode || prefersReduced;
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    if (!visible) {
      setLineIndex(0);
      return;
    }
    const timer = window.setInterval(() => {
      setLineIndex((prev) => (prev + 1) % t.loading.lines.length);
    }, 1800);
    return () => window.clearInterval(timer);
  }, [visible, t.loading.lines.length]);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t.loading.lines[lineIndex]}
      className="fixed inset-0 z-[70] flex flex-col items-center justify-center px-6 bg-[#070B1A]/90 backdrop-blur-xl"
    >
      <div className="relative flex flex-col items-center max-w-md w-full text-center">
        {/* Pip searching */}
        <Pip mood="searching" size={160} />

        {/* Paper note with scanning beam */}
        <div className="relative mt-4 w-56 h-24 rounded-2xl bg-white/[0.07] border border-white/15 p-4 overflow-hidden">
          <div className="space-y-2.5">
            <div className="h-2.5 w-3/4 rounded-full bg-white/20" />
            <div className="h-2.5 w-full rounded-full bg-white/15" />
            <div className="h-2.5 w-2/3 rounded-full bg-[#3DE0FF]/35" />
          </div>

          {!disableMotion && (
            <motion.div
              aria-hidden="true"
              animate={{ y: [-12, 84, -12] }}
              transition={{ duration: 1.9, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute left-0 right-0 h-1.5 rounded-full"
              style={{
                background: 'linear-gradient(90deg, transparent, #3DE0FF, transparent)',
                boxShadow: '0 0 18px #3DE0FF',
              }}
            />
          )}
        </div>

        {/* Rotating status lines */}
        <div className="h-12 mt-6 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={lineIndex}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="font-heading font-bold text-[22px] text-[#F4F6FF]"
            >
              {t.loading.lines[lineIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        <p className="text-[17px] text-[#A9B1D6] mt-1">{t.loading.subtext}</p>
      </div>
    </div>
  );
}
