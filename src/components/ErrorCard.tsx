import { RotateCcw } from 'lucide-react';
import { useAppContext } from '../context/ResultContext';
import { GlassCard } from './GlassCard';
import { GradientButton } from './GradientButton';
import { Pip } from './Pip';

interface ErrorCardProps {
  message?: string;
  onRetry: () => void;
}

export function ErrorCard({ message, onRetry }: ErrorCardProps) {
  const { t } = useAppContext();

  return (
    <GlassCard className="w-full p-6 sm:p-8 border-[#FF5C8A]/40">
      <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
        <Pip mood="worried" size={110} />
        <div className="flex-1">
          <h3 className="font-heading font-bold text-[22px] text-[#F4F6FF]">
            {t.error.title}
          </h3>
          <p className="text-[18px] text-[#A9B1D6] mt-2 leading-relaxed">
            {message || t.error.message}
          </p>
          <div className="mt-5">
            <GradientButton type="button" variant="primary" onClick={onRetry}>
              <RotateCcw className="w-5 h-5" />
              <span>{t.error.retry}</span>
            </GradientButton>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
