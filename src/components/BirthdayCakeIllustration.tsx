import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { audioSynth } from '../utils/audioSynthesizer';
import { Sparkles, RotateCcw } from 'lucide-react';

interface BirthdayCakeIllustrationProps {
  onCandleBlown?: () => void;
  friendName: string;
}

export const BirthdayCakeIllustration: React.FC<BirthdayCakeIllustrationProps> = ({
  onCandleBlown,
  friendName,
}) => {
  const [isBlown, setIsBlown] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const handleBlowCandle = () => {
    if (isBlown) return;
    setIsBlown(true);
    setHasInteracted(true);
    audioSynth.playCandleBlow();

    // Soft celestial confetti burst
    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFFFFF', '#F8F6F0', '#EAE4D5', '#D4AF37', '#CBD5E1'],
        scalar: 0.9,
      });
      setTimeout(() => {
        confetti({
          particleCount: 30,
          angle: 60,
          spread: 55,
          origin: { x: 0.2, y: 0.65 },
          colors: ['#FFFFFF', '#E2E8F0', '#D4AF37'],
        });
        confetti({
          particleCount: 30,
          angle: 120,
          spread: 55,
          origin: { x: 0.8, y: 0.65 },
          colors: ['#FFFFFF', '#E2E8F0', '#D4AF37'],
        });
      }, 250);
    } catch {
      // Fallback
    }

    onCandleBlown?.();
  };

  const handleRelight = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsBlown(false);
    audioSynth.playRoseChime();
  };

  return (
    <div className="flex flex-col items-center">
      {/* Interactive Birthday Cake SVG */}
      <div
        onClick={handleBlowCandle}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleBlowCandle();
          }
        }}
        aria-label={isBlown ? "Candle is blown out" : "Tap candle to blow it out and make a wish"}
        className="relative cursor-pointer select-none group focus:outline-none transition-transform duration-300 hover:scale-[1.03] active:scale-95"
      >
        <svg
          viewBox="0 0 240 220"
          className="w-56 h-52 sm:w-64 sm:h-60 drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="cakePlateGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2A334A" />
              <stop offset="100%" stopColor="#121724" />
            </linearGradient>

            <linearGradient id="cakeCreamGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="50%" stopColor="#FAF7F2" />
              <stop offset="100%" stopColor="#EDE6D6" />
            </linearGradient>

            <linearGradient id="cakeBaseGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F5EFE6" />
              <stop offset="100%" stopColor="#DDD5C3" />
            </linearGradient>

            <linearGradient id="goldRibbon" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#C5A059" />
              <stop offset="50%" stopColor="#FDF7DF" />
              <stop offset="100%" stopColor="#C5A059" />
            </linearGradient>

            <linearGradient id="candleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FAF8F5" />
              <stop offset="50%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#E2DDD0" />
            </linearGradient>

            {/* Candle flame glow */}
            <radialGradient id="flameInner" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFF9E0" />
              <stop offset="40%" stopColor="#FFD166" />
              <stop offset="100%" stopColor="#FF9F1C" />
            </radialGradient>
          </defs>

          {/* Pedestal Plate */}
          <ellipse cx="120" cy="195" rx="95" ry="14" fill="url(#cakePlateGrad)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
          <ellipse cx="120" cy="193" rx="88" ry="11" fill="#0C101C" />

          {/* Cake Tier Bottom Base */}
          <path
            d="M48 135 C48 135 48 175 120 175 C192 175 192 135 192 135 L192 155 C192 178 120 185 48 155 Z"
            fill="url(#cakeBaseGrad)"
          />
          {/* Cake Top Base ellipse */}
          <ellipse cx="120" cy="135" rx="72" ry="24" fill="url(#cakeCreamGrad)" />

          {/* Gold Frosting Ribbon */}
          <path
            d="M50 148 C75 162 165 162 190 148"
            stroke="url(#goldRibbon)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Drips of white glaze */}
          <path
            d="M48 135 Q58 150 68 138 Q78 155 88 139 Q100 152 112 140 Q124 155 138 139 Q150 152 162 138 Q174 150 184 137 Q192 135 192 135"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="5"
            strokeLinecap="round"
          />

          {/* Decorative white rosebuds on cake rim */}
          <g transform="translate(68, 128) scale(0.12)">
            <circle cx="50" cy="50" r="45" fill="#FFFFFF" stroke="#E5DECf" strokeWidth="4" />
            <path d="M30 45 C35 30 65 30 70 45 C65 60 35 60 30 45" stroke="#C5A059" strokeWidth="4" fill="none" />
          </g>
          <g transform="translate(155, 128) scale(0.12)">
            <circle cx="50" cy="50" r="45" fill="#FFFFFF" stroke="#E5DECf" strokeWidth="4" />
            <path d="M30 45 C35 30 65 30 70 45 C65 60 35 60 30 45" stroke="#C5A059" strokeWidth="4" fill="none" />
          </g>

          {/* Slender Birthday Candle */}
          <rect x="117" y="70" width="6" height="52" rx="3" fill="url(#candleGrad)" stroke="#D8D0BF" strokeWidth="0.8" />
          {/* Candle Spiral stripe */}
          <line x1="117" y1="80" x2="123" y2="85" stroke="#C5A059" strokeWidth="1.2" />
          <line x1="117" y1="95" x2="123" y2="100" stroke="#C5A059" strokeWidth="1.2" />
          <line x1="117" y1="110" x2="123" y2="115" stroke="#C5A059" strokeWidth="1.2" />

          {/* Candle Wick */}
          <line x1="120" y1="70" x2="120" y2="60" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" />

          {/* Interactive Flame or Smoke */}
          {!isBlown ? (
            <g className="animate-pulse">
              {/* Flame aura */}
              <circle cx="120" cy="50" r="16" fill="url(#flameInner)" opacity="0.25" filter="blur(6px)" />
              {/* Teardrop Flame */}
              <path
                d="M120 40 C114 48 113 56 120 60 C127 56 126 48 120 40 Z"
                fill="url(#flameInner)"
                className="transition-all"
              />
              {/* Inner bright white flame core */}
              <ellipse cx="120" cy="54" rx="2.2" ry="4" fill="#FFFFFF" />
            </g>
          ) : (
            /* Soft curls of smoke */
            <g className="transition-opacity duration-1000">
              <path
                d="M120 60 Q124 50 118 42 T122 30"
                stroke="rgba(255, 255, 255, 0.4)"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                className="animate-pulse"
              />
              <circle cx="120" cy="60" r="1.5" fill="#FF5500" opacity="0.6" />
            </g>
          )}
        </svg>

        {/* Floating Tap Prompt / Hint */}
        {!isBlown && (
          <div className="absolute top-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-medium text-slate-200 bg-slate-900/80 border border-white/10 shadow-lg pointer-events-none whitespace-nowrap animate-bounce">
            Tap flame to blow out 🕯️
          </div>
        )}
      </div>

      {/* Response after candle is blown */}
      {isBlown && (
        <div className="mt-4 text-center max-w-sm px-4 py-3 rounded-xl bg-slate-900/60 border border-white/10 shadow-lg animate-fadeIn">
          <p className="text-sm text-slate-200 font-medium flex items-center justify-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
            Wish made for {friendName}! May it quietly come true.
          </p>
          <button
            onClick={handleRelight}
            className="mt-2 text-xs text-slate-400 hover:text-white inline-flex items-center gap-1 transition-colors underline underline-offset-4"
          >
            <RotateCcw className="w-3 h-3" /> Relight candle to make another wish
          </button>
        </div>
      )}
    </div>
  );
};
