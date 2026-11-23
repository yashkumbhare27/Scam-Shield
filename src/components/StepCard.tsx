import { Check, ExternalLink, PhoneCall } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { useAppContext } from '../context/ResultContext';
import { EMERGENCY_CONTACTS, type EmergencyStep } from '../data/emergency';
import { GlassCard } from './GlassCard';
import { GradientButton } from './GradientButton';

interface StepCardProps {
  step: EmergencyStep;
  stepNumber: number;
  totalSteps: number;
  onNext: () => void;
  onPrev?: () => void;
  justCompleted: boolean;
}

export function StepCard({
  step,
  stepNumber,
  totalSteps,
  onNext,
  onPrev,
  justCompleted,
}: StepCardProps) {
  const { language, t, liteMode } = useAppContext();
  const prefersReduced = useReducedMotion();
  const disableMotion = liteMode || prefersReduced;

  const progressPct = Math.round((stepNumber / totalSteps) * 100);
  const stepLabel = t.help.stepOf
    .replace('{current}', String(stepNumber))
    .replace('{total}', String(totalSteps));
  const isLast = stepNumber === totalSteps;

  return (
    <motion.div
      key={stepNumber}
      initial={disableMotion ? { opacity: 0 } : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={disableMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
      transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
    >
      <GlassCard className="p-6 sm:p-8 border-[#3DE0FF]/30">
        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-[15px] font-bold text-[#A9B1D6] mb-2">
            <span>{stepLabel}</span>
            <span className="tabular-nums">{progressPct}%</span>
          </div>
          <div className="h-2.5 w-full rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${progressPct}%`,
                background: 'var(--gradient-primary)',
              }}
            />
          </div>
        </div>

        {/* Large Step Number + Title */}
        <div className="flex items-center gap-4 mb-4">
          <span className="w-14 h-14 rounded-2xl bg-[#3DE0FF]/15 border border-[#3DE0FF]/45 text-[#3DE0FF] font-heading font-extrabold text-[26px] inline-flex items-center justify-center shrink-0 tabular-nums">
            {stepNumber}
          </span>
          <h2 className="font-heading font-extrabold text-[24px] sm:text-[28px] text-[#F4F6FF] leading-tight">
            {step.title[language]}
          </h2>
        </div>

        <p className="text-[19px] sm:text-[20px] text-[#F4F6FF]/90 leading-relaxed mb-6">
          {step.description[language]}
        </p>

        {/* Action buttons where relevant */}
        {step.actionType === 'call' && (
          <div className="mb-6">
            <a
              href={`tel:${EMERGENCY_CONTACTS.cybercrimeHelpline}`}
              className="min-h-[56px] w-full sm:w-auto px-7 py-3.5 rounded-full inline-flex items-center justify-center gap-3 text-[19px] font-extrabold bg-[#4CF2B0] text-[#0A0F24] shadow-[0_0_28px_rgba(76,242,176,0.3)] hover:opacity-95 transition-opacity"
            >
              <PhoneCall className="w-5 h-5 shrink-0" />
              <span>
                {t.help.callNow} {EMERGENCY_CONTACTS.cybercrimeHelpline}
              </span>
            </a>
          </div>
        )}

        {step.actionType === 'portal' && (
          <div className="mb-6">
            <a
              href={EMERGENCY_CONTACTS.cybercrimePortalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[56px] w-full sm:w-auto px-7 py-3.5 rounded-full inline-flex items-center justify-center gap-3 text-[18px] font-bold bg-[#3DE0FF]/18 border border-[#3DE0FF]/55 text-[#F4F6FF] hover:bg-[#3DE0FF]/28 transition-colors"
            >
              <ExternalLink className="w-5 h-5 shrink-0" />
              <span>{t.help.openPortal}</span>
            </a>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          {onPrev && stepNumber > 1 ? (
            <GradientButton type="button" variant="ghost" onClick={onPrev}>
              {t.help.prevStep}
            </GradientButton>
          ) : (
            <span />
          )}

          <GradientButton
            type="button"
            variant="primary"
            onClick={onNext}
            className="w-full sm:w-auto"
          >
            {justCompleted ? (
              <motion.span
                initial={{ scale: 0.6 }}
                animate={{ scale: 1.1 }}
                className="inline-flex items-center gap-2"
              >
                <Check className="w-5 h-5" />
                <span>{isLast ? t.help.finishBtn : t.help.nextStep}</span>
              </motion.span>
            ) : (
              <>
                <Check className="w-5 h-5" />
                <span>{isLast ? t.help.finishBtn : t.help.nextStep}</span>
              </>
            )}
          </GradientButton>
        </div>
      </GlassCard>
    </motion.div>
  );
}
