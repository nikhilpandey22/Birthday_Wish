import React from 'react';

interface WhiteRoseIllustrationProps {
  bloomState?: 'bud' | 'opening' | 'full';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isGlowing?: boolean;
  className?: string;
  onClick?: () => void;
  interactive?: boolean;
}

export const WhiteRoseIllustration: React.FC<WhiteRoseIllustrationProps> = ({
  bloomState = 'full',
  size = 'md',
  isGlowing = true,
  className = '',
  onClick,
  interactive = false,
}) => {
  const sizeMap = {
    sm: 'w-16 h-16',
    md: 'w-28 h-28',
    lg: 'w-44 h-44',
    xl: 'w-64 h-64 md:w-80 md:h-80',
  };

  return (
    <div
      onClick={onClick}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      onKeyDown={(e) => {
        if (interactive && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick?.();
        }
      }}
      className={`relative inline-flex items-center justify-center select-none transition-transform duration-500 ${
        sizeMap[size]
      } ${interactive ? 'cursor-pointer hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40' : ''} ${className}`}
    >
      {/* Soft Moonlight Halo behind rose */}
      {isGlowing && (
        <div
          className="absolute inset-0 rounded-full animate-rose-glow pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, rgba(220, 230, 255, 0.15) 45%, rgba(0, 0, 0, 0) 70%)',
            transform: 'scale(1.3)',
          }}
        />
      )}

      {/* SVG Rose Vector */}
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full relative z-10 drop-shadow-[0_10px_25px_rgba(0,0,0,0.5)] transition-all duration-700"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Petal gradients for pure white, ivory, and faint champagne sheen */}
          <linearGradient id="petalIvoryLight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="70%" stopColor="#F9F7F4" />
            <stop offset="100%" stopColor="#EDE7DB" />
          </linearGradient>

          <linearGradient id="petalIvoryCore" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="60%" stopColor="#F5EFE6" />
            <stop offset="100%" stopColor="#DFD7C7" />
          </linearGradient>

          <linearGradient id="petalShadow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F0ECE4" />
            <stop offset="100%" stopColor="#D5CDBC" />
          </linearGradient>

          <linearGradient id="stemGreen" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2D4A3E" />
            <stop offset="100%" stopColor="#1B3026" />
          </linearGradient>

          <linearGradient id="leafGreen" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3C5E4F" />
            <stop offset="100%" stopColor="#1E3327" />
          </linearGradient>

          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Stem and sepals (visible in bud and half bloom) */}
        <g className="transition-opacity duration-700">
          <path
            d="M100 155 Q98 175 92 195"
            stroke="url(#stemGreen)"
            strokeWidth="5"
            strokeLinecap="round"
          />
          {/* Leaves */}
          <path
            d="M96 172 Q125 170 135 158 Q120 185 96 178 Z"
            fill="url(#leafGreen)"
            opacity="0.9"
          />
          <path
            d="M93 182 Q65 180 55 170 Q70 192 93 187 Z"
            fill="url(#leafGreen)"
            opacity="0.85"
          />
          {/* Sepals cradling the base */}
          <path
            d="M90 150 Q75 160 70 145 Q85 140 92 145 Z"
            fill="url(#leafGreen)"
          />
          <path
            d="M110 150 Q125 160 130 145 Q115 140 108 145 Z"
            fill="url(#leafGreen)"
          />
        </g>

        {/* ================= BUD STATE ================= */}
        {bloomState === 'bud' && (
          <g className="transition-all duration-700">
            {/* Outer bud wrap */}
            <path
              d="M78 135 C70 100 80 65 100 50 C120 65 130 100 122 135 C115 148 85 148 78 135 Z"
              fill="url(#petalIvoryCore)"
              stroke="#E2DDD2"
              strokeWidth="1.2"
            />
            {/* Bud overlapping petal left */}
            <path
              d="M78 135 C82 95 90 70 100 62 C96 90 94 120 85 142 Z"
              fill="url(#petalShadow)"
              opacity="0.7"
            />
            {/* Bud overlapping petal right */}
            <path
              d="M122 135 C115 95 105 68 98 62 C108 85 110 115 115 142 Z"
              fill="url(#petalIvoryLight)"
              stroke="#DED7C8"
              strokeWidth="0.8"
            />
            {/* Inner spiral fold */}
            <path
              d="M95 62 Q102 56 106 64 Q104 76 96 74"
              stroke="#C9BFA8"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
          </g>
        )}

        {/* ================= OPENING / HALF BLOOM STATE ================= */}
        {bloomState === 'opening' && (
          <g className="transition-all duration-700">
            {/* Opening outer petals */}
            <path
              d="M55 135 C45 105 65 80 85 85 C65 110 70 140 85 150 Z"
              fill="url(#petalIvoryLight)"
              stroke="#E8E2D5"
              strokeWidth="1"
            />
            <path
              d="M145 135 C155 105 135 80 115 85 C135 110 130 140 115 150 Z"
              fill="url(#petalIvoryLight)"
              stroke="#E8E2D5"
              strokeWidth="1"
            />
            {/* Center petals */}
            <path
              d="M75 145 C65 100 85 60 100 50 C115 60 135 100 125 145 C110 155 90 155 75 145 Z"
              fill="url(#petalIvoryCore)"
              stroke="#E2DDD2"
              strokeWidth="1"
            />
            <path
              d="M85 130 C80 95 92 75 102 70 C112 75 120 105 115 135 Z"
              fill="url(#petalShadow)"
              opacity="0.8"
            />
            <path
              d="M93 72 Q100 66 107 72 Q105 84 95 82"
              stroke="#C4BAA3"
              strokeWidth="1.8"
              fill="none"
              strokeLinecap="round"
            />
          </g>
        )}

        {/* ================= FULL BLOOM STATE ================= */}
        {bloomState === 'full' && (
          <g className="transition-all duration-700">
            {/* Tier 1: Outer wide petals */}
            <path
              d="M40 115 C30 75 60 45 90 60 C55 75 45 110 65 135 C50 130 42 122 40 115 Z"
              fill="url(#petalIvoryLight)"
              stroke="#EFEBE1"
              strokeWidth="0.8"
            />
            <path
              d="M160 115 C170 75 140 45 110 60 C145 75 155 110 135 135 C150 130 158 122 160 115 Z"
              fill="url(#petalIvoryLight)"
              stroke="#EFEBE1"
              strokeWidth="0.8"
            />
            <path
              d="M60 140 C60 165 100 175 140 140 C125 160 75 160 60 140 Z"
              fill="url(#petalShadow)"
              stroke="#E5DECf"
              strokeWidth="0.8"
            />
            <path
              d="M75 45 C100 25 125 25 150 45 C135 55 90 55 75 45 Z"
              fill="url(#petalIvoryLight)"
              stroke="#EDE7DB"
              strokeWidth="0.8"
            />

            {/* Tier 2: Mid-layer petals */}
            <path
              d="M58 95 C52 70 80 50 100 62 C75 75 70 105 85 130 C70 120 60 110 58 95 Z"
              fill="url(#petalIvoryCore)"
              stroke="#EAE4D8"
              strokeWidth="0.8"
            />
            <path
              d="M142 95 C148 70 120 50 100 62 C125 75 130 105 115 130 C130 120 140 110 142 95 Z"
              fill="url(#petalIvoryLight)"
              stroke="#EAE4D8"
              strokeWidth="0.8"
            />
            <path
              d="M75 135 C85 150 115 150 125 135 C115 142 85 142 75 135 Z"
              fill="url(#petalIvoryLight)"
              stroke="#E2DCCF"
              strokeWidth="0.8"
            />

            {/* Tier 3: Inner cupped petals */}
            <path
              d="M75 90 C72 75 88 65 100 70 C112 65 128 75 125 90 C122 110 110 125 100 125 C90 125 78 110 75 90 Z"
              fill="url(#petalIvoryCore)"
              stroke="#DDD5C5"
              strokeWidth="0.8"
            />
            <path
              d="M82 92 C82 80 94 72 100 76 C94 85 92 100 100 110 C90 105 84 98 82 92 Z"
              fill="url(#petalShadow)"
              opacity="0.6"
            />
            <path
              d="M118 92 C118 80 106 72 100 76 C106 85 108 100 100 110 C110 105 116 98 118 92 Z"
              fill="url(#petalIvoryLight)"
              stroke="#D5CCA"
              strokeWidth="0.6"
            />

            {/* Tier 4: Intricate core spiral rosette */}
            <path
              d="M93 84 Q100 76 107 84 Q104 96 95 94 Q91 88 97 86"
              stroke="#BAAF97"
              strokeWidth="1.6"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M97 86 Q100 82 103 86 Q102 91 98 90"
              stroke="#C8BEA7"
              strokeWidth="1.2"
              fill="none"
              strokeLinecap="round"
            />
          </g>
        )}

        {/* Soft champagne highlight glint in center */}
        <circle cx="100" cy="85" r="1.5" fill="#FFF9E6" opacity="0.9" filter="url(#softGlow)" />
      </svg>
    </div>
  );
};
