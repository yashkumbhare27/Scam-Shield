import type { RedFlag, Verdict } from '../types';
import { GlassCard } from './GlassCard';

interface ReasonCardProps {
  index: number;
  flag: RedFlag;
  verdict: Verdict;
}

export function ReasonCard({ index, flag, verdict }: ReasonCardProps) {
  const accent = verdict === 'likely_scam' ? '#FF5C8A' : '#FFC24D';

  return (
    <GlassCard className="p-5 sm:p-6">
      <div className="flex items-start gap-4">
        <span
          aria-hidden="true"
          style={{
            backgroundColor: `${accent}24`,
            borderColor: `${accent}66`,
            color: accent,
          }}
          className="w-9 h-9 rounded-full border shrink-0 inline-flex items-center justify-center font-heading font-extrabold text-[16px] tabular-nums"
        >
          {index}
        </span>

        <div className="min-w-0 flex-1">
          <h3 className="font-heading font-bold text-[19px] text-[#F4F6FF] leading-snug">
            {flag.type}
          </h3>
          {flag.evidence && (
            <p className="font-mono-msg text-[14px] text-[#A9B1D6] mt-1.5 break-all bg-white/[0.04] rounded-xl px-3 py-1.5 inline-block border border-white/10">
              “{flag.evidence}”
            </p>
          )}
          <p className="text-[18px] text-[#F4F6FF]/90 mt-2 leading-relaxed">
            {flag.explanation}
          </p>
        </div>
      </div>
    </GlassCard>
  );
}
