import { motion, useReducedMotion } from 'motion/react';
import { useAppContext } from '../context/ResultContext';

export type PipMood =
  | 'neutral'
  | 'searching'
  | 'worried'
  | 'happy'
  | 'calm'
  | 'celebrating';

interface PipProps {
  mood?: PipMood;
  size?: number;
  className?: string;
}

const MOOD_LABELS: Record<PipMood, string> = {
  neutral: 'Pip the friendly shield robot companion looking ready to help',
  searching: 'Pip scanning a message with a glowing magnifying glass',
  worried: 'Pip looking concerned and alert',
  happy: 'Pip smiling brightly with sparkling eyes',
  calm: 'Pip breathing calmly with a soothing cyan glow',
  celebrating: 'Pip celebrating with arms raised and stars around',
};

export function Pip({ mood = 'neutral', size = 140, className = '' }: PipProps) {
  const { liteMode } = useAppContext();
  const prefersReduced = useReducedMotion();
  const disableMotion = liteMode || prefersReduced;

  const isWorried = mood === 'worried';
  const isCalm = mood === 'calm';
  const isHappy = mood === 'happy' || mood === 'celebrating';
  const isSearching = mood === 'searching';
  const isCelebrating = mood === 'celebrating';

  const glowColor = isWorried
    ? 'rgba(255, 92, 138, 0.32)'
    : isHappy
      ? 'rgba(76, 242, 176, 0.28)'
      : 'rgba(61, 224, 255, 0.28)';

  return (
    <motion.div
      role="img"
      aria-label={MOOD_LABELS[mood]}
      className={`relative inline-flex items-center justify-center select-none shrink-0 ${className}`}
      style={{ width: size, height: size }}
      animate={
        disableMotion
          ? undefined
          : isCalm
            ? { y: [0, -4, 0], scale: [1, 1.02, 1] }
            : isHappy
              ? { y: [0, -8, 0] }
              : { y: [0, -5, 0] }
      }
      transition={
        disableMotion
          ? undefined
          : {
              duration: isCalm ? 4.2 : 2.8,
              repeat: Infinity,
              ease: 'easeInOut',
            }
      }
    >
      {/* Soft aurora halo behind Pip */}
      {!liteMode && (
        <div
          aria-hidden="true"
          className="absolute inset-2 rounded-full blur-2xl pointer-events-none"
          style={{ background: glowColor }}
        />
      )}

      <svg
        viewBox="0 0 160 160"
        width={size}
        height={size}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 overflow-visible"
      >
        <defs>
          <linearGradient id="pipBodyGrad" x1="28" y1="26" x2="132" y2="144" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#9A8CFF" />
            <stop offset="55%" stopColor="#5CA4FF" />
            <stop offset="100%" stopColor="#3DE0FF" />
          </linearGradient>
          <linearGradient id="pipVisorGrad" x1="42" y1="54" x2="118" y2="106" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#121A3D" />
            <stop offset="100%" stopColor="#070B1A" />
          </linearGradient>
          <linearGradient id="pipGlassRim" x1="104" y1="90" x2="146" y2="132" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FF9BD2" />
            <stop offset="100%" stopColor="#3DE0FF" />
          </linearGradient>
        </defs>

        {/* Celebration sparkles */}
        {isCelebrating && (
          <g aria-hidden="true">
            <path d="M22 36L25 28L28 36L36 39L28 42L25 50L22 42L14 39Z" fill="#4CF2B0" />
            <path d="M134 26L136 20L138 26L144 28L138 30L136 36L134 30L128 28Z" fill="#FF9BD2" />
            <circle cx="140" cy="64" r="3" fill="#3DE0FF" />
          </g>
        )}

        {/* Tiny Antenna */}
        <motion.g
          animate={
            isWorried
              ? { rotate: -18 }
              : disableMotion
                ? undefined
                : { rotate: [-3, 3, -3] }
          }
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '80px 30px' }}
        >
          <path
            d="M80 30C80 22 80 16 80 14"
            stroke="#A9B1D6"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <circle
            cx="80"
            cy="12"
            r="6"
            fill={isWorried ? '#FF5C8A' : isHappy ? '#4CF2B0' : '#3DE0FF'}
          />
          <circle cx="78" cy="10" r="2" fill="#FFFFFF" opacity="0.8" />
        </motion.g>

        {/* Left Arm */}
        <motion.path
          d={
            isCelebrating
              ? 'M32 84C18 72 16 58 22 52'
              : 'M32 88C20 92 18 104 24 110'
          }
          stroke="url(#pipBodyGrad)"
          strokeWidth="9"
          strokeLinecap="round"
        />

        {/* Shield-shaped rounded robot body */}
        <path
          d="M80 28C108 28 128 36 131 54C135 79 126 112 104 131C93 140 85 144 80 144C75 144 67 140 56 131C34 112 25 79 29 54C32 36 52 28 80 28Z"
          fill="url(#pipBodyGrad)"
          stroke="rgba(255,255,255,0.42)"
          strokeWidth="2.5"
        />

        {/* Subtle body highlight */}
        <path
          d="M44 46C55 37 74 34 94 36"
          stroke="rgba(255,255,255,0.45)"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* Glossy Dark Visor */}
        <rect
          x="42"
          y="53"
          width="76"
          height="50"
          rx="22"
          fill="url(#pipVisorGrad)"
          stroke="rgba(61,224,255,0.45)"
          strokeWidth="2"
        />

        {/* Visor reflection */}
        <path
          d="M54 60C64 57 78 57 90 59"
          stroke="rgba(255,255,255,0.22)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Eyes */}
        {isHappy ? (
          <g>
            {/* Happy curved sparkling eyes */}
            <path
              d="M55 78C58 71 66 71 69 78"
              stroke="#4CF2B0"
              strokeWidth="4.5"
              strokeLinecap="round"
            />
            <path
              d="M91 78C94 71 102 71 105 78"
              stroke="#4CF2B0"
              strokeWidth="4.5"
              strokeLinecap="round"
            />
            {/* Rosy cheeks */}
            <ellipse cx="52" cy="87" rx="4.5" ry="2.5" fill="#FF9BD2" opacity="0.7" />
            <ellipse cx="108" cy="87" rx="4.5" ry="2.5" fill="#FF9BD2" opacity="0.7" />
          </g>
        ) : isCalm ? (
          <g>
            <path
              d="M55 77C59 81 65 81 69 77"
              stroke="#3DE0FF"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M91 77C95 81 101 81 105 77"
              stroke="#3DE0FF"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </g>
        ) : (
          <motion.g
            animate={
              disableMotion
                ? undefined
                : { scaleY: [1, 1, 0.12, 1, 1] }
            }
            transition={{
              duration: 4.5,
              repeat: Infinity,
              times: [0, 0.44, 0.48, 0.52, 1],
            }}
            style={{ transformOrigin: '80px 76px' }}
          >
            <circle
              cx="62"
              cy="76"
              r={isWorried ? 8.5 : 7}
              fill={isWorried ? '#FF9BD2' : '#3DE0FF'}
            />
            <circle
              cx="98"
              cy="76"
              r={isWorried ? 8.5 : 7}
              fill={isWorried ? '#FF9BD2' : '#3DE0FF'}
            />
            <circle cx="64" cy="73.5" r="2.6" fill="#FFFFFF" />
            <circle cx="100" cy="73.5" r="2.6" fill="#FFFFFF" />
          </motion.g>
        )}

        {/* Small Mouth / Expression */}
        {isWorried ? (
          <path
            d="M73 91C77 88 83 88 87 91"
            stroke="#FF9BD2"
            strokeWidth="3"
            strokeLinecap="round"
          />
        ) : (
          <path
            d="M73 89C77 93 83 93 87 89"
            stroke={isHappy ? '#4CF2B0' : '#3DE0FF'}
            strokeWidth="3"
            strokeLinecap="round"
          />
        )}

        {/* Right Arm + Magnifying Glass */}
        <motion.g
          animate={
            disableMotion
              ? undefined
              : isSearching
                ? { x: [-12, 6, -12], y: [-6, 2, -6], rotate: [-10, 10, -10] }
                : isCelebrating
                  ? { rotate: -18, y: -12 }
                  : { rotate: [-2, 4, -2] }
          }
          transition={
            disableMotion
              ? undefined
              : {
                  duration: isSearching ? 1.8 : 3.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }
          }
          style={{ transformOrigin: '124px 96px' }}
        >
          {/* Right arm */}
          <path
            d="M127 88C136 92 138 102 132 108"
            stroke="url(#pipBodyGrad)"
            strokeWidth="9"
            strokeLinecap="round"
          />
          {/* Magnifier handle */}
          <path
            d="M132 115L143 128"
            stroke="#FF9BD2"
            strokeWidth="5.5"
            strokeLinecap="round"
          />
          {/* Magnifier lens */}
          <circle
            cx="121"
            cy="103"
            r="14"
            fill="rgba(61, 224, 255, 0.22)"
            stroke="url(#pipGlassRim)"
            strokeWidth="4"
          />
          <path
            d="M114 97C116 94 120 93 124 94"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.85"
          />
        </motion.g>
      </svg>
    </motion.div>
  );
}
