interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  description?: string;
  id?: string;
}

export function Toggle({
  checked,
  onChange,
  label,
  description,
  id,
}: ToggleProps) {
  const switchId = id || `toggle-${label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className="flex items-center justify-between gap-4">
      <label htmlFor={switchId} className="cursor-pointer select-none">
        <span className="block font-bold text-[#F4F6FF] text-[18px] leading-snug">
          {label}
        </span>
        {description && (
          <span className="block text-[15px] text-[#A9B1D6] leading-snug mt-0.5">
            {description}
          </span>
        )}
      </label>

      <button
        id={switchId}
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex items-center w-14 h-8 rounded-full shrink-0 transition-colors duration-200 cursor-pointer border ${
          checked
            ? 'bg-[#3DE0FF] border-[#3DE0FF]'
            : 'bg-white/10 border-white/20'
        }`}
      >
        <span
          className={`inline-block w-6 h-6 rounded-full shadow-md transition-transform duration-200 ${
            checked
              ? 'translate-x-7 bg-[#0A0F24]'
              : 'translate-x-1 bg-[#F4F6FF]'
          }`}
        />
      </button>
    </div>
  );
}
