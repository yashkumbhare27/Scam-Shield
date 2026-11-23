import { motion, useReducedMotion } from 'motion/react';
import { useAppContext } from '../context/ResultContext';
import type { Verdict } from '../types';

interface VerdictStampProps {
  verdict: Verdict;
  customLabel?: string;
  compact?: boolean;
}

const STAMP_COLORS: Record<
  Verdict,
  { color: string; bg: string; glow: string }
> = {
  likely_scam: {
    color: '#FF5C8A',
    bg: 'rgba(255, 92, 138, 0.12)',
    glow: 'rgba(255, 92, 138, 0.36)',
  },
  suspicious: {
    color: '#FFC24D',
    bg: 'rgba(255, 194, 77, 0.12)',
    glow: 'rgba(255, 194, 77, 0.32)',
  },
  no_red_flags: {
    color: '#4CF2B0',
    bg: 'rgba(76, 242, 176, 0.12)',
    glow: 'rgba(76, 242, 176, 0.32)',
  },
};

export function VerdictStamp({
  verdict,
  customLabel,
  compact = false,
}: VerdictStampProps) {
  const { t, liteMode } = useAppContext();
  const prefersReduced = useReducedMotion();
  const disableMotion = liteMode || prefersReduced;

  const palette = STAMP_COLORS[verdict];
  const label = customLabel ?? t.result.stamps[verdict];

  return (
    <div className="relative inline-flex items-center justify-center">
      {!disableMotion && (
        <motion.span
          aria-hidden="true"
          initial={{ scale: 0.7, opacity: 0.75 }}
          animate={{ scale: 1.45, opacity: 0 }}
          transition={{ duration: 0.75, ease: 'easeOut' }}
          className="absolute inset-0 rounded-full border-2 pointer-events-none"
          style={{ borderColor: palette.color }}
        />
      )}

      <motion.div
        role="status"
        aria-label={label}
        initial={
          disableMotion
            ? { opacity: 0 }
            : { scale: 1.75, opacity: 0, rotate: -14 }
        }
        animate={
          disableMotion
            ? { opacity: 1 }
            : { scale: 1, opacity: 1, rotate: -6 }
        }
        transition={
          disableMotion
            ? { duration: 0.2 }
            : { type: 'spring', stiffness: 360, damping: 18 }
        }
        style={{
          borderColor: palette.color,
          backgroundColor: palette.bg,
          color: palette.color,
          boxShadow: `0 0 28px ${palette.glow}`,
        }}
        className={`relative rounded-2xl border-[3px] select-none ${
          compact ? 'px-3.5 py-1.5' : 'px-5 py-2.5'
        }`}
      >
        <div
          style={{ borderColor: palette.color }}
          className={`rounded-xl border border-dashed ${
            compact ? 'px-3 py-1' : 'px-4 py-1.5'
          }`}
        >
          <span
            className={`font-heading font-extrabold tracking-wider uppercase block text-center ${
              compact ? 'text-[14px]' : 'text-[18px] sm:text-[22px]'
            }`}
          >
            {label}
          </span>
        </div>
      </motion.div>
    </div>
  );
}
