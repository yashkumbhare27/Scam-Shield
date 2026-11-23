import { Sparkles } from 'lucide-react';
import { useAppContext } from '../context/ResultContext';

export function LiteModeToggle() {
  const { liteMode, setLiteMode, t } = useAppContext();

  return (
    <button
      type="button"
      role="switch"
      aria-checked={liteMode}
      onClick={() => setLiteMode(!liteMode)}
      title={t.landing.liteModeDesc}
      className={`min-h-[44px] px-4 py-2 rounded-full inline-flex items-center gap-2 text-[15px] font-semibold border transition-colors cursor-pointer whitespace-nowrap ${
        liteMode
          ? 'bg-[#3DE0FF]/20 border-[#3DE0FF]/60 text-[#F4F6FF]'
          : 'bg-white/[0.06] border-white/14 text-[#A9B1D6] hover:text-[#F4F6FF]'
      }`}
    >
      <Sparkles className="w-4 h-4 shrink-0" />
      <span>
        {t.landing.liteMode}: {liteMode ? 'ON' : 'OFF'}
      </span>
    </button>
  );
}
