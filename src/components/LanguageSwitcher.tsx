import { useAppContext } from '../context/ResultContext';
import type { Language } from '../types';

const LANG_OPTIONS: { code: Language; label: string; aria: string }[] = [
  { code: 'en', label: 'EN', aria: 'Switch language to English' },
  { code: 'hi', label: 'हिं', aria: 'भाषा हिन्दी में बदलें' },
  { code: 'mr', label: 'मरा', aria: 'भाषा मराठीत बदला' },
];

export function LanguageSwitcher() {
  const { language, setLanguage } = useAppContext();

  return (
    <div
      role="group"
      aria-label="Language selector"
      className="inline-flex items-center p-1 rounded-full bg-white/[0.07] border border-white/15 shrink-0"
    >
      {LANG_OPTIONS.map((item) => {
        const active = language === item.code;
        return (
          <button
            key={item.code}
            type="button"
            onClick={() => setLanguage(item.code)}
            aria-label={item.aria}
            aria-pressed={active}
            className={`min-h-[38px] min-w-[42px] px-3 rounded-full text-[15px] font-bold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
              active
                ? 'text-[#0A0F24] shadow-sm'
                : 'text-[#A9B1D6] hover:text-[#F4F6FF]'
            }`}
            style={
              active
                ? { background: 'var(--gradient-primary)' }
                : undefined
            }
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
