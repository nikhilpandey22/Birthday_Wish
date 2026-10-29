import React, { useState } from 'react';
import { BIRTHDAY_CONFIG, RoseMessage } from '../config/birthdayConfig';
import { WhiteRoseIllustration } from '../components/WhiteRoseIllustration';
import { audioSynth } from '../utils/audioSynthesizer';
import confetti from 'canvas-confetti';
import { X, Sparkles, Check, ArrowRight, Heart, Gift } from 'lucide-react';

interface WhiteRoseGardenViewProps {
  onGoToLetter: () => void;
}

export const WhiteRoseGardenView: React.FC<WhiteRoseGardenViewProps> = ({ onGoToLetter }) => {
  const [openedRoseIds, setOpenedRoseIds] = useState<number[]>([]);
  const [activeRose, setActiveRose] = useState<RoseMessage | null>(null);
  const [allUnlockedRewardShown, setAllUnlockedRewardShown] = useState(false);

  const handleOpenRose = (rose: RoseMessage) => {
    setActiveRose(rose);
    audioSynth.playRoseChime();

    if (!openedRoseIds.includes(rose.id)) {
      const nextOpened = [...openedRoseIds, rose.id];
      setOpenedRoseIds(nextOpened);

      // Check if all 8 are opened!
      if (nextOpened.length === BIRTHDAY_CONFIG.ROSES.length && !allUnlockedRewardShown) {
        setAllUnlockedRewardShown(true);
        setTimeout(() => {
          try {
            confetti({
              particleCount: 65,
              spread: 80,
              origin: { y: 0.5 },
              colors: ['#FFFFFF', '#FAF8F5', '#D4AF37', '#CBD5E1'],
            });
            audioSynth.playBloomFanfare();
          } catch {
            // fallback
          }
        }, 800);
      }
    }
  };

  const handleCloseModal = () => {
    setActiveRose(null);
  };

  const progress = openedRoseIds.length;
  const total = BIRTHDAY_CONFIG.ROSES.length;
  const isComplete = progress === total;

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center py-6 px-4 z-10 max-w-4xl mx-auto">
      {/* Garden Header */}
      <div className="text-center space-y-2 mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs text-slate-300 bg-slate-900/60 border border-white/10">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Interactive Moonlight Sanctuary</span>
        </div>

        <h2 className="font-serif-elegant text-3xl sm:text-4xl text-white font-normal">
          The White Rose Garden
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
          Eight white roses are planted here for {BIRTHDAY_CONFIG.FRIEND_NAME}. Click or tap each rose to uncover the heartfelt thought nestled within its petals.
        </p>

        {/* Progress Tracker: "Discover the Roses: X/8" */}
        <div className="pt-2 flex flex-col items-center gap-2">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-200">
            <span>Discover the Roses:</span>
            <span className="font-mono text-amber-200 px-2 py-0.5 rounded bg-white/10 border border-white/10">
              {progress} / {total}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-48 sm:w-64 h-1.5 bg-slate-800/80 rounded-full overflow-hidden border border-white/10">
            <div
              className="h-full bg-gradient-to-r from-amber-200 via-white to-amber-100 transition-all duration-500 ease-out"
              style={{ width: `${(progress / total) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Garden Grid: 8 Roses */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full my-4">
        {BIRTHDAY_CONFIG.ROSES.map((rose) => {
          const isOpened = openedRoseIds.includes(rose.id);
          return (
            <button
              key={rose.id}
              onClick={() => handleOpenRose(rose)}
              className={`group relative flex flex-col items-center p-3 sm:p-4 rounded-2xl text-center transition-all duration-300 border focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/50 ${
                isOpened
                  ? 'glass-panel border-white/20 shadow-[0_4px_20px_rgba(255,255,255,0.08)] hover:scale-[1.03]'
                  : 'glass-panel-subtle border-white/5 hover:border-white/20 hover:scale-[1.03]'
              }`}
            >
              {/* Status Badge */}
              <div className="absolute top-2.5 right-2.5">
                {isOpened ? (
                  <span className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-200 border border-amber-400/30 flex items-center justify-center text-[10px]">
                    <Check className="w-3 h-3 text-amber-300" />
                  </span>
                ) : (
                  <span className="w-2 h-2 rounded-full bg-white/30 animate-pulse" />
                )}
              </div>

              {/* White Rose Graphic */}
              <div className="my-1">
                <WhiteRoseIllustration
                  bloomState={isOpened ? 'full' : 'opening'}
                  size="md"
                  isGlowing={isOpened}
                  className="transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <span className="text-[10px] tracking-widest text-slate-400 uppercase mt-1">
                {rose.subtitle}
              </span>
              <h3 className="font-serif-elegant text-sm sm:text-base font-medium text-slate-100 tracking-wide mt-0.5">
                {rose.title}
              </h3>

              <span className="mt-2 text-[11px] text-amber-200/80 group-hover:text-amber-200 flex items-center gap-1 transition-colors">
                {isOpened ? "Read Again" : "Tap to Open"} →
              </span>
            </button>
          );
        })}
      </div>

      {/* Completion Celebration Card when all 8 are opened */}
      {isComplete && (
        <div className="w-full mt-6 p-5 sm:p-6 rounded-2xl glass-panel border border-amber-300/30 text-center space-y-3 shadow-[0_10px_35px_rgba(212,175,55,0.15)] animate-fadeIn">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-amber-400/20 text-amber-300 mx-auto">
            <Gift className="w-5 h-5" />
          </div>
          <h4 className="font-serif-elegant text-xl sm:text-2xl text-white font-normal">
            The White Rose Garden is in Full Bloom ✨
          </h4>
          <p className="text-xs sm:text-sm text-slate-200 max-w-lg mx-auto leading-relaxed">
            Every rose has shared its secret with you, Deepanshi. Now, a personal handwritten digital letter awaits you in the quiet study.
          </p>
          <div className="pt-2">
            <button
              onClick={onGoToLetter}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-medium text-slate-950 bg-white hover:bg-slate-100 shadow-md transition-all hover:scale-105 active:scale-95"
            >
              <span>Read Your Personal Letter</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Bottom Button if not completed yet */}
      {!isComplete && (
        <div className="mt-6 flex flex-col items-center gap-2 text-center">
          <button
            onClick={onGoToLetter}
            className="text-xs text-slate-400 hover:text-white transition-colors underline underline-offset-4 flex items-center gap-1"
          >
            <span>Proceed to Personal Letter</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Modal / Floating Card for Opened Rose */}
      {activeRose && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn"
          onClick={handleCloseModal}
        >
          <div
            className="relative w-full max-w-md p-6 sm:p-8 rounded-3xl glass-panel border border-white/20 shadow-2xl text-center space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-white"
              aria-label="Close message"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Rose Icon in Modal */}
            <div className="flex justify-center -mt-2">
              <WhiteRoseIllustration bloomState="full" size="lg" isGlowing={true} />
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-mono tracking-widest uppercase text-amber-200">
                {activeRose.subtitle}
              </span>
              <h3 className="font-serif-elegant text-2xl font-normal text-white tracking-wide">
                ROSE {activeRose.id} — {activeRose.title}
              </h3>
            </div>

            <div className="relative py-2">
              <div className="w-12 h-[1px] bg-white/20 mx-auto mb-4" />
              <p className="font-serif-elegant text-lg sm:text-xl text-slate-100 font-light leading-relaxed italic">
                "{activeRose.message}"
              </p>
              <div className="w-12 h-[1px] bg-white/20 mx-auto mt-4" />
            </div>

            <div className="pt-2 flex justify-center">
              <button
                onClick={handleCloseModal}
                className="px-6 py-2 rounded-full text-xs font-medium text-slate-900 bg-white hover:bg-slate-100 shadow transition-colors"
              >
                Keep in My Heart 🤍
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
