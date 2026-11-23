import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { useAppContext } from '../context/ResultContext';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
  onClick?: () => void;
}

export function GlassCard({
  children,
  className = '',
  interactive = false,
  onClick,
}: GlassCardProps) {
  const { liteMode } = useAppContext();
  const prefersReduced = useReducedMotion();
  const disableMotion = liteMode || prefersReduced;

  if (!interactive && !onClick) {
    return (
      <div className={`glass-surface p-6 ${className}`}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      onClick={onClick}
      whileHover={disableMotion ? undefined : { y: -3, scale: 1.005 }}
      whileTap={disableMotion ? undefined : { scale: 0.99 }}
      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
      className={`glass-surface p-6 transition-colors duration-200 hover:bg-white/[0.085] ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
    >
      {children}
    </motion.div>
  );
}
