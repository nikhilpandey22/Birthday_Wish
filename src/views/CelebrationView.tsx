import React, { useState } from 'react';
import { BIRTHDAY_CONFIG } from '../config/birthdayConfig';
import { BirthdayCakeIllustration } from '../components/BirthdayCakeIllustration';
import { WhiteRoseIllustration } from '../components/WhiteRoseIllustration';
import { Sparkles, ArrowRight, Heart } from 'lucide-react';

interface CelebrationViewProps {
  onGoToGarden: () => void;
}

export const CelebrationView: React.FC<CelebrationViewProps> = ({ onGoToGarden }) => {
  const [candleBlown, setCandleBlown] = useState(false);

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-between py-6 px-4 text-center z-10 max-w-2xl mx-auto">
      {/* Top Banner / Name Celebration */}
      <div className="space-y-3 pt-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-medium text-amber-200/90 bg-amber-500/10 border border-amber-400/20 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Celebrating 30 October 2026</span>
        </div>

        <h1 className="font-serif-elegant text-4xl sm:text-5xl md:text-6xl font-normal text-white tracking-tight drop-shadow-[0_4px_16px_rgba(255,255,255,0.2)]">
          Happy Birthday, <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-100 to-slate-200">{BIRTHDAY_CONFIG.FRIEND_NAME}</span>! 🤍
        </h1>

        <p className="font-serif-elegant text-lg sm:text-xl text-slate-300 max-w-lg mx-auto font-light leading-relaxed">
          {BIRTHDAY_CONFIG.CELEBRATION.subtitle}
        </p>
      </div>

      {/* Center Interactive Birthday Cake & White Rose Accent */}
      <div className="my-6 flex flex-col items-center">
        <div className="relative">
          {/* Subtle White Rose flanking */}
          <div className="absolute -left-12 -top-6 opacity-75 hidden sm:block pointer-events-none">
            <WhiteRoseIllustration size="sm" isGlowing={false} />
          </div>
          <div className="absolute -right-12 -top-6 opacity-75 hidden sm:block pointer-events-none">
            <WhiteRoseIllustration size="sm" isGlowing={false} />
          </div>

          <BirthdayCakeIllustration
            friendName={BIRTHDAY_CONFIG.FRIEND_NAME}
            onCandleBlown={() => setCandleBlown(true)}
          />
        </div>

        {/* Gentle friendship reassurance message */}
        <div className="mt-6 max-w-md p-4 rounded-2xl glass-panel-subtle text-slate-300 text-xs sm:text-sm leading-relaxed border border-white/10 shadow-lg">
          <p className="flex items-center justify-center gap-1.5 text-amber-200 font-medium mb-1">
            <Heart className="w-3.5 h-3.5 text-rose-300/80 fill-rose-300/20" />
            A Wish From The Heart
          </p>
          "I value your presence in my life and I'm genuinely glad that our paths crossed. May this year shower you with laughter, genuine smiles, and quiet happiness."
        </div>
      </div>

      {/* Navigation to 8 White Roses */}
      <div className="w-full pt-4 flex flex-col items-center gap-3">
        <button
          onClick={onGoToGarden}
          className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full text-sm font-medium text-slate-950 bg-gradient-to-r from-white via-[#F8F5EE] to-[#EAE3D2] shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-all duration-300 hover:scale-[1.02] active:scale-98 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <span>{BIRTHDAY_CONFIG.CELEBRATION.nextButtonText}</span>
          <ArrowRight className="w-4 h-4 text-slate-800 transition-transform group-hover:translate-x-1" />
        </button>

        <p className="text-xs text-slate-400">
          8 special white roses are waiting for you in the garden
        </p>
      </div>
    </div>
  );
};
