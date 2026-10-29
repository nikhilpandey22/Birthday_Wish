import React, { useState } from 'react';
import { WhiteRoseIllustration } from '../components/WhiteRoseIllustration';
import { BIRTHDAY_CONFIG } from '../config/birthdayConfig';
import { audioSynth } from '../utils/audioSynthesizer';
import { Volume2, VolumeX, Sparkles, ChevronRight } from 'lucide-react';

interface OpeningGardenViewProps {
  onOpenSurprise: () => void;
  onSkipIntro: () => void;
}

export const OpeningGardenView: React.FC<OpeningGardenViewProps> = ({
  onOpenSurprise,
  onSkipIntro,
}) => {
  const [roseState, setRoseState] = useState<'bud' | 'opening' | 'full'>('bud');
  const [isOpening, setIsOpening] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const handleStart = () => {
    if (isOpening) return;
    setIsOpening(true);
    setRoseState('opening');

    if (soundEnabled) {
      audioSynth.startMusic();
      audioSynth.playRoseChime();
    }

    setTimeout(() => {
      setRoseState('full');
    }, 600);

    setTimeout(() => {
      onOpenSurprise();
    }, 1400);
  };

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    if (!next) {
      if (!audioSynth.getMuted()) audioSynth.toggleMute();
    } else {
      if (audioSynth.getMuted()) audioSynth.toggleMute();
    }
  };

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 py-8 text-center z-10 max-w-xl mx-auto">
      {/* Top Controls: Sound toggle & Skip Intro */}
      <div className="absolute top-4 w-full flex items-center justify-between px-2 text-xs text-slate-400">
        <button
          onClick={toggleSound}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/60 border border-white/10 hover:bg-slate-800/80 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-white/40"
          aria-label={soundEnabled ? "Sound enabled" : "Sound muted"}
        >
          {soundEnabled ? (
            <>
              <Volume2 className="w-3.5 h-3.5 text-amber-200" />
              <span>Sound: On</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-slate-400" />
              <span>Sound: Off</span>
            </>
          )}
        </button>

        <button
          onClick={onSkipIntro}
          className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors underline underline-offset-4 focus:outline-none"
        >
          <span>Skip to Celebration</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Glowing White Rose Centerpiece */}
      <div className="my-8 relative">
        <WhiteRoseIllustration
          bloomState={roseState}
          size="xl"
          isGlowing={true}
          interactive={!isOpening}
          onClick={handleStart}
        />
        {!isOpening && (
          <p className="mt-3 text-xs tracking-wider uppercase text-slate-400/80">
            A White Rose for {BIRTHDAY_CONFIG.FRIEND_NAME}
          </p>
        )}
      </div>

      {/* Sincere Opening Lines */}
      <div className="space-y-3 max-w-md">
        <p className="font-serif-elegant text-2xl sm:text-3xl font-light text-slate-100 leading-relaxed tracking-wide">
          "{BIRTHDAY_CONFIG.OPENING.line1}"
        </p>
        <p className="text-sm sm:text-base text-slate-300 font-light">
          {BIRTHDAY_CONFIG.OPENING.line2}
        </p>
      </div>

      {/* Call to Action Button */}
      <div className="mt-10">
        <button
          onClick={handleStart}
          disabled={isOpening}
          className="group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-sm font-medium tracking-wide text-slate-950 bg-gradient-to-r from-white via-slate-100 to-[#F5EFE6] shadow-[0_0_25px_rgba(255,255,255,0.35)] hover:shadow-[0_0_35px_rgba(255,255,255,0.55)] transition-all duration-300 hover:scale-[1.02] active:scale-98 disabled:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <Sparkles className="w-4 h-4 text-amber-500 animate-spin" style={{ animationDuration: '4s' }} />
          <span>{isOpening ? "Opening for you..." : BIRTHDAY_CONFIG.OPENING.buttonText}</span>
        </button>
      </div>

      {/* Subtle Note */}
      <div className="mt-8 text-xs text-slate-500">
        Dedicated with care & respect for Deepanshi • {BIRTHDAY_CONFIG.BIRTHDAY_DATE}
      </div>
    </div>
  );
};
