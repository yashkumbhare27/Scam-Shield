import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { useAppContext } from '../context/ResultContext';

interface GradientButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'danger' | 'ghost';
  children: React.ReactNode;
}

export function GradientButton({
  variant = 'primary',
  children,
  className = '',
  disabled,
  ...rest
}: GradientButtonProps) {
  const { liteMode } = useAppContext();
  const prefersReduced = useReducedMotion();
  const disableMotion = liteMode || prefersReduced || disabled;

  const variantClasses =
    variant === 'primary'
      ? 'text-[#0A0F24] font-bold shadow-[0_10px_32px_rgba(61,224,255,0.28)] border border-white/25'
      : variant === 'danger'
        ? 'text-[#FF9BB8] font-bold bg-[#FF5C8A]/12 border border-[#FF5C8A]/55 shadow-[0_8px_28px_rgba(255,92,138,0.22)] hover:bg-[#FF5C8A]/20'
        : 'text-[#F4F6FF] font-semibold bg-white/[0.07] border border-white/15 hover:bg-white/[0.12]';

  return (
    <motion.button
      whileHover={disableMotion ? undefined : { y: -2, scale: 1.01 }}
      whileTap={disableMotion ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
      disabled={disabled}
      style={
        variant === 'primary'
          ? { background: 'var(--gradient-primary)' }
          : undefined
      }
      className={`min-h-[56px] px-7 py-3.5 rounded-full inline-flex items-center justify-center gap-2.5 text-[18px] leading-none whitespace-nowrap shrink-0 transition-opacity cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${variantClasses} ${className}`}
      {...(rest as Record<string, unknown>)}
    >
      {children}
    </motion.button>
  );
}
