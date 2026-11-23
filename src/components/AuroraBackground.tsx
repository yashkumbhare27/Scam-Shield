import { useAppContext } from '../context/ResultContext';

export function AuroraBackground({ calmTint = false }: { calmTint?: boolean }) {
  const { liteMode } = useAppContext();

  if (liteMode) {
    return null;
  }

  return (
    <>
      <div
        aria-hidden="true"
        className="aurora-layer fixed inset-0 pointer-events-none overflow-hidden z-0"
      >
        <div
          className="aurora-blob-a absolute -top-32 -left-24 w-[480px] h-[480px] rounded-full blur-[110px]"
          style={{
            background: calmTint
              ? 'radial-gradient(circle, rgba(61, 224, 255, 0.18), transparent 70%)'
              : 'radial-gradient(circle, rgba(124, 108, 255, 0.2), transparent 70%)',
          }}
        />
        <div
          className="aurora-blob-b absolute top-[28%] -right-24 w-[440px] h-[440px] rounded-full blur-[110px]"
          style={{
            background: calmTint
              ? 'radial-gradient(circle, rgba(61, 224, 255, 0.14), transparent 70%)'
              : 'radial-gradient(circle, rgba(61, 224, 255, 0.16), transparent 70%)',
          }}
        />
        <div
          className="aurora-blob-a absolute -bottom-32 left-[22%] w-[420px] h-[420px] rounded-full blur-[120px]"
          style={{
            background: calmTint
              ? 'radial-gradient(circle, rgba(124, 108, 255, 0.12), transparent 70%)'
              : 'radial-gradient(circle, rgba(255, 155, 210, 0.11), transparent 70%)',
          }}
        />
        {/* Tiny subtle night-sky stars */}
        <svg
          className="absolute inset-0 w-full h-full opacity-40"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12%" cy="18%" r="1.2" fill="#F4F6FF" opacity="0.6" />
          <circle cx="28%" cy="9%" r="1" fill="#3DE0FF" opacity="0.5" />
          <circle cx="78%" cy="14%" r="1.4" fill="#F4F6FF" opacity="0.55" />
          <circle cx="88%" cy="32%" r="1" fill="#FF9BD2" opacity="0.45" />
          <circle cx="18%" cy="62%" r="1.2" fill="#3DE0FF" opacity="0.4" />
          <circle cx="68%" cy="74%" r="1.1" fill="#F4F6FF" opacity="0.5" />
        </svg>
      </div>
      <div aria-hidden="true" className="grain-layer" />
    </>
  );
}
