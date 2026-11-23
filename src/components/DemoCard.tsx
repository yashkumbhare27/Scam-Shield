import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { useAppContext } from '../context/ResultContext';
import { GlassCard } from './GlassCard';
import { VerdictStamp } from './VerdictStamp';

const DEMO_PART_1 = 'URGENT: Your SBI KYC is blocked today. Update now at ';
const DEMO_LINK = 'http://sbi-kyc.xyz';
const FULL_TEXT = DEMO_PART_1 + DEMO_LINK;

export function DemoCard() {
  const { t, liteMode } = useAppContext();
  const prefersReduced = useReducedMotion();
  const disableMotion = liteMode || prefersReduced;

  const [charCount, setCharCount] = useState(
    disableMotion ? FULL_TEXT.length : 18,
  );
  const [phase, setPhase] = useState<'typing' | 'stamped'>(
    disableMotion ? 'stamped' : 'typing',
  );

  useEffect(() => {
    if (disableMotion) {
      setCharCount(FULL_TEXT.length);
      setPhase('stamped');
      return;
    }

    let timer: number;
    if (phase === 'typing') {
      if (charCount < FULL_TEXT.length) {
        timer = window.setTimeout(() => {
          setCharCount((c) => Math.min(c + 2, FULL_TEXT.length));
        }, 48);
      } else {
        timer = window.setTimeout(() => {
          setPhase('stamped');
        }, 420);
      }
    } else {
      timer = window.setTimeout(() => {
        setCharCount(0);
        setPhase('typing');
      }, 3600);
    }

    return () => window.clearTimeout(timer);
  }, [charCount, phase, disableMotion]);

  const visibleText = FULL_TEXT.slice(0, charCount);
  const part1 = visibleText.slice(0, DEMO_PART_1.length);
  const part2 = visibleText.slice(DEMO_PART_1.length);

  return (
    <GlassCard className="p-6 sm:p-7 relative overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <span className="text-[14px] font-bold uppercase tracking-wider text-[#3DE0FF]">
          {t.landing.demoLabel}
        </span>
        {phase === 'stamped' && (
          <VerdictStamp
            verdict="likely_scam"
            customLabel={t.landing.demoVerdict}
            compact
          />
        )}
      </div>

      <div className="rounded-2xl bg-[#070B1A]/70 border border-white/10 p-4 sm:p-5 min-h-[108px]">
        <p className="font-mono-msg text-[16px] leading-relaxed text-[#F4F6FF] break-words">
          {phase === 'stamped' ? (
            <>
              <span>URGENT: Your SBI KYC is </span>
              <mark
                className="rounded px-1.5 py-0.5 text-[#F4F6FF] font-semibold"
                style={{
                  backgroundColor: 'rgba(255, 92, 138, 0.24)',
                  borderBottom: '2px solid #FF5C8A',
                }}
              >
                blocked today
              </mark>
              <span>. Update now at </span>
              <mark
                className="rounded px-1.5 py-0.5 text-[#F4F6FF] font-semibold"
                style={{
                  backgroundColor: 'rgba(255, 92, 138, 0.24)',
                  borderBottom: '2px solid #FF5C8A',
                }}
              >
                {DEMO_LINK}
              </mark>
            </>
          ) : (
            <>
              <span>{part1}</span>
              <span>{part2}</span>
              <motion.span
                aria-hidden="true"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-2 h-5 bg-[#3DE0FF] ml-1 align-middle rounded-sm"
              />
            </>
          )}
        </p>
      </div>

      <p className="text-[15px] text-[#A9B1D6] mt-3">{t.landing.demoNote}</p>
    </GlassCard>
  );
}
