import { MessageCircleHeart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/ResultContext';
import { LanguageSwitcher } from './LanguageSwitcher';

export function TopBar() {
  const { t, openChat } = useAppContext();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#070B1A]/75 backdrop-blur-md">
      <div className="mx-auto max-w-[1100px] px-3 sm:px-6 h-[58px] flex items-center justify-between gap-2 sm:gap-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 whitespace-nowrap shrink-0 group min-h-[44px]"
        >
          {/* Mini Pip shield icon */}
          <svg
            width="30"
            height="30"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="shrink-0 transition-transform duration-200 group-hover:scale-105"
          >
            <defs>
              <linearGradient id="logoGrad" x1="6" y1="5" x2="34" y2="36" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#7C6CFF" />
                <stop offset="100%" stopColor="#3DE0FF" />
              </linearGradient>
            </defs>
            <path
              d="M20 4C28 4 34 6.5 34.8 12C35.8 19.5 33 29 26.5 34.5C23.4 37 21.3 38 20 38C18.7 38 16.6 37 13.5 34.5C7 29 4.2 19.5 5.2 12C6 6.5 12 4 20 4Z"
              fill="url(#logoGrad)"
            />
            <rect x="10" y="13" width="20" height="12" rx="6" fill="#070B1A" />
            <circle cx="16" cy="19" r="2.2" fill="#3DE0FF" />
            <circle cx="24" cy="19" r="2.2" fill="#3DE0FF" />
          </svg>
          <span className="font-heading font-extrabold text-[18px] sm:text-[20px] tracking-tight text-[#F4F6FF]">
            {t.appName}
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={() => openChat()}
            className="min-h-[40px] px-3 sm:px-3.5 rounded-full bg-[#7C6CFF]/22 hover:bg-[#7C6CFF]/34 border border-[#7C6CFF]/50 text-[#F4F6FF] text-[14px] font-bold inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer transition-colors"
          >
            <MessageCircleHeart className="w-4 h-4 text-[#3DE0FF] shrink-0" />
            <span>{t.chat.buttonLabel}</span>
          </button>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
