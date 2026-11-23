import React from 'react';

interface ChipProps {
  label: string;
  active?: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
  className?: string;
}

export function Chip({
  label,
  active = false,
  onClick,
  icon,
  className = '',
}: ChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`min-h-[44px] px-4 py-2 rounded-full inline-flex items-center gap-2 text-[15px] font-semibold whitespace-nowrap shrink-0 transition-all cursor-pointer border ${
        active
          ? 'bg-[#3DE0FF]/20 border-[#3DE0FF]/60 text-[#F4F6FF] shadow-[0_0_20px_rgba(61,224,255,0.2)]'
          : 'bg-white/[0.06] border-white/15 text-[#A9B1D6] hover:bg-white/[0.11] hover:text-[#F4F6FF]'
      } ${className}`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
