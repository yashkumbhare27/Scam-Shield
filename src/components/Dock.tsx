import { BookOpen, Info, LifeBuoy, ShieldCheck } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/ResultContext';

export function Dock() {
  const { pathname } = useLocation();
  const { t, liteMode } = useAppContext();
  const prefersReduced = useReducedMotion();
  const disableMotion = liteMode || prefersReduced;

  const items = [
    {
      to: '/check',
      label: t.nav.check,
      icon: ShieldCheck,
      isActive: pathname === '/check' || pathname === '/result',
      isEmergency: false,
    },
    {
      to: '/guide',
      label: t.nav.guide,
      icon: BookOpen,
      isActive: pathname.startsWith('/guide'),
      isEmergency: false,
    },
    {
      to: '/help',
      label: t.nav.help,
      icon: LifeBuoy,
      isActive: pathname.startsWith('/help') || pathname.startsWith('/report'),
      isEmergency: true,
    },
    {
      to: '/about',
      label: t.nav.about,
      icon: Info,
      isActive: pathname.startsWith('/about'),
      isEmergency: false,
    },
  ];

  return (
    <div
      className="fixed bottom-3 left-0 right-0 z-50 flex justify-center px-3 pointer-events-none"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <nav
        aria-label="Primary navigation"
        className="pointer-events-auto glass-surface rounded-full px-2 py-1.5 flex items-center gap-1 sm:gap-2 shadow-[0_16px_44px_rgba(3,6,18,0.75)] border border-white/18"
      >
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              aria-current={item.isActive ? 'page' : undefined}
              className={`relative min-h-[48px] min-w-[74px] sm:min-w-[96px] px-3 sm:px-4 rounded-full flex items-center justify-center gap-2 text-[15px] font-bold whitespace-nowrap transition-colors ${
                item.isActive
                  ? item.isEmergency
                    ? 'text-[#FFE3EC]'
                    : 'text-[#0A0F24]'
                  : item.isEmergency
                    ? 'text-[#FF9BB8] hover:text-[#FFD2DF]'
                    : 'text-[#A9B1D6] hover:text-[#F4F6FF]'
              }`}
            >
              {item.isActive && (
                <motion.span
                  layoutId={disableMotion ? undefined : 'dock-active-pill'}
                  transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                  className="absolute inset-0 rounded-full -z-10"
                  style={
                    item.isEmergency
                      ? {
                          background: 'rgba(255, 92, 138, 0.28)',
                          border: '1px solid rgba(255, 92, 138, 0.7)',
                          boxShadow: '0 0 24px rgba(255, 92, 138, 0.35)',
                        }
                      : {
                          background: 'var(--gradient-primary)',
                          boxShadow: '0 0 24px rgba(61, 224, 255, 0.32)',
                        }
                  }
                />
              )}

              {!item.isActive && item.isEmergency && (
                <span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full -z-10 border border-[#FF5C8A]/35 shadow-[0_0_18px_rgba(255,92,138,0.22)]"
                />
              )}

              <Icon className="w-[18px] h-[18px] shrink-0" aria-hidden="true" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
