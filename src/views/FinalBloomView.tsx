import React, { useState } from 'react';
import { BIRTHDAY_CONFIG } from '../config/birthdayConfig';
import { WhiteRoseIllustration } from '../components/WhiteRoseIllustration';
import { audioSynth } from '../utils/audioSynthesizer';
import confetti from 'canvas-confetti';
import { Sparkles, RotateCcw, Heart, CheckCircle2 } from 'lucide-react';

interface FinalBloomViewProps {
  onRestartExperience: () => void;
}

export const FinalBloomView: React.FC<FinalBloomViewProps> = ({ onRestartExperience }) => {
  const [bloomState, setBloomState] = useState<'bud' | 'opening' | 'full'>('bud');
  const [hasBloomed, setHasBloomed] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleBloom = () => {
    if (isAnimating || hasBloomed) return;
    setIsAnimating(true);
    setBloomState('opening');
    audioSynth.playBloomFanfare();

    setTimeout(() => {
      setBloomState('full');
      setHasBloomed(true);
      setIsAnimating(false);

      try {
        confetti({
          particleCount: 75,
          spread: 90,
          origin: { y: 0.5 },
          colors: ['#FFFFFF', '#FAF8F5', '#EAE4D5', '#D4AF37'],
          scalar: 1,
        });
      } catch {
        // fallback
      }
    }, 900);
  };

  const handleReplayBloom = () => {
    setBloomState('bud');
    setHasBloomed(false);
    setIsAnimating(false);
  };

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-between py-6 px-4 text-center z-10 max-w-2xl mx-auto">
      {/* Top note */}
      <div className="space-y-2 pt-2">
        <span className="text-xs uppercase tracking-widest text-amber-200/90 font-medium">
          The Final White Rose
        </span>
        <h2 className="font-serif-elegant text-3xl sm:text-4xl text-white font-normal">
          {!hasBloomed ? BIRTHDAY_CONFIG.FINAL.prompt : "A Rose in Full Bloom 🤍"}
        </h2>
      </div>

      {/* Centerpiece Rose Illustration */}
      <div className="my-6 relative flex flex-col items-center">
        <WhiteRoseIllustration
          bloomState={bloomState}
          size="xl"
          isGlowing={hasBloomed}
          interactive={!hasBloomed && !isAnimating}
          onClick={handleBloom}
        />

        {!hasBloomed && (
          <div className="mt-6">
            <button
              onClick={handleBloom}
              disabled={isAnimating}
              className="group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-sm font-medium text-slate-950 bg-gradient-to-r from-white via-slate-100 to-[#F5EFE6] shadow-[0_0_25px_rgba(255,255,255,0.4)] hover:shadow-[0_0_35px_rgba(255,255,255,0.6)] transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-75 focus:outline-none"
            >
              <Sparkles className="w-4 h-4 text-amber-500 animate-spin" style={{ animationDuration: '4s' }} />
              <span>{isAnimating ? "Blooming..." : BIRTHDAY_CONFIG.FINAL.buttonText}</span>
            </button>
            <p className="mt-2 text-xs text-slate-400">
              Tap the rose or the button above to let it bloom
            </p>
          </div>
        )}
      </div>

      {/* Final Message Revealed upon Blooming */}
      {hasBloomed && (
        <div className="w-full glass-panel rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl text-center space-y-4 animate-fadeIn">
          <div className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center mx-auto">
            <Heart className="w-5 h-5 text-amber-200 fill-amber-200/20" />
          </div>

          <div className="space-y-3 font-serif-elegant text-base sm:text-lg text-slate-200 font-light leading-relaxed max-w-lg mx-auto">
            {BIRTHDAY_CONFIG.FINAL.paragraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          <div className="pt-3 border-t border-white/15 space-y-1">
            <p className="font-serif-elegant text-2xl sm:text-3xl font-medium text-white">
              {BIRTHDAY_CONFIG.FINAL.closing1}
            </p>
            <p className="font-script-calligraphy text-2xl text-amber-200">
              {BIRTHDAY_CONFIG.FINAL.closing2}
            </p>
          </div>

          {/* Replay Controls */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handleReplayBloom}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-medium text-slate-200 bg-white/10 hover:bg-white/20 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-200" />
              <span>Replay the Bloom 🌹</span>
            </button>

            <button
              onClick={onRestartExperience}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-6 py-2.5 rounded-full text-xs font-medium text-slate-950 bg-white hover:bg-slate-100 shadow transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Replay Whole Experience ✨</span>
            </button>
          </div>
        </div>
      )}

      {/* Subtle creator signoff */}
      <div className="mt-6 text-xs text-slate-500 text-center">
        Made with affection, respect & loyalty for Deepanshi • {BIRTHDAY_CONFIG.BIRTHDAY_DATE}
      </div>
    </div>
  );
};
