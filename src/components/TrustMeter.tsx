import { motion, useReducedMotion } from 'motion/react';
import { useAppContext } from '../context/ResultContext';
import type { Confidence, Verdict } from '../types';

interface TrustMeterProps {
  verdict: Verdict;
  confidence: Confidence;
}

function getPointerPercent(verdict: Verdict, confidence: Confidence): number {
  if (verdict === 'no_red_flags') {
    return confidence === 'high' ? 12 : confidence === 'medium' ? 20 : 28;
  }
  if (verdict === 'suspicious') {
    return confidence === 'high' ? 58 : confidence === 'medium' ? 50 : 44;
  }
  return confidence === 'high' ? 90 : confidence === 'medium' ? 82 : 74;
}

export function TrustMeter({ verdict, confidence }: TrustMeterProps) {
  const { t, liteMode } = useAppContext();
  const prefersReduced = useReducedMotion();
  const disableMotion = liteMode || prefersReduced;

  const percent = getPointerPercent(verdict, confidence);
  const pointerColor =
    verdict === 'likely_scam'
      ? '#FF5C8A'
      : verdict === 'suspicious'
        ? '#FFC24D'
        : '#4CF2B0';

  return (
    <div className="w-full" aria-label={t.result.meterSummary[verdict]}>
      <p className="sr-only">{t.result.meterSummary[verdict]}</p>

      <div className="relative pt-3 pb-2">
        {/* Segmented track: Mint, Amber, Pink */}
        <div className="h-3.5 w-full rounded-full bg-white/10 p-0.5 flex gap-1 overflow-hidden">
          <div
            className="h-full flex-1 rounded-l-full"
            style={{ background: 'rgba(76, 242, 176, 0.85)' }}
          />
          <div
            className="h-full flex-1"
            style={{ background: 'rgba(255, 194, 77, 0.85)' }}
          />
          <div
            className="h-full flex-1 rounded-r-full"
            style={{ background: 'rgba(255, 92, 138, 0.85)' }}
          />
        </div>

        {/* Glowing pointer */}
        <div className="relative h-5 -mt-[18px]">
          <motion.div
            initial={disableMotion ? { left: `${percent}%` } : { left: '6%' }}
            animate={{ left: `${percent}%` }}
            transition={
              disableMotion
                ? { duration: 0.15 }
                : { duration: 0.85, ease: [0.16, 1, 0.3, 1] }
            }
            className="absolute top-0 -translate-x-1/2 w-5 h-5 rounded-full border-[3px] border-[#070B1A]"
            style={{
              backgroundColor: pointerColor,
              boxShadow: `0 0 18px ${pointerColor}`,
            }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between text-[13px] font-bold mt-1">
        <span className="text-[#4CF2B0]">{t.result.meterLabels.clear}</span>
        <span className="text-[#FFC24D]">{t.result.meterLabels.caution}</span>
        <span className="text-[#FF5C8A]">{t.result.meterLabels.scam}</span>
      </div>
    </div>
  );
}
