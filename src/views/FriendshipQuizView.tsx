import React, { useState } from 'react';
import { BIRTHDAY_CONFIG } from '../config/birthdayConfig';
import { audioSynth } from '../utils/audioSynthesizer';
import confetti from 'canvas-confetti';
import { Sparkles, CheckCircle2, ArrowRight, RotateCcw, Heart } from 'lucide-react';

interface FriendshipQuizViewProps {
  onGoToFinal: () => void;
  onBackToGarden: () => void;
}

export const FriendshipQuizView: React.FC<FriendshipQuizViewProps> = ({
  onGoToFinal,
  onBackToGarden,
}) => {
  const questions = BIRTHDAY_CONFIG.QUIZ.questions;
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQuestion = questions[currentQIndex];

  const handleSelectOption = (idx: number) => {
    setSelectedOptionIndex(idx);
    const chosen = currentQuestion.options[idx];
    audioSynth.playQuizChime(chosen.isPreferred);
  };

  const handleNextQuestion = () => {
    if (selectedOptionIndex === null) return;

    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex((prev) => prev + 1);
      setSelectedOptionIndex(null);
    } else {
      setIsCompleted(true);
      audioSynth.playBloomFanfare();
      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#FFFFFF', '#FAF8F5', '#D4AF37'],
        });
      } catch {
        // fallback
      }
    }
  };

  const handleRestart = () => {
    setCurrentQIndex(0);
    setSelectedOptionIndex(null);
    setIsCompleted(false);
    audioSynth.playRoseChime();
  };

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center py-6 px-4 z-10 max-w-xl mx-auto">
      {/* Quiz Header */}
      <div className="text-center space-y-2 mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs text-amber-200/90 bg-amber-500/10 border border-amber-400/20">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Playful Mini Game</span>
        </div>

        <h2 className="font-serif-elegant text-3xl sm:text-4xl text-white font-normal">
          {BIRTHDAY_CONFIG.QUIZ.heading}
        </h2>
        <p className="text-xs sm:text-sm text-slate-300">
          {BIRTHDAY_CONFIG.QUIZ.subtitle}
        </p>
      </div>

      {!isCompleted ? (
        <div className="w-full glass-panel rounded-3xl p-6 sm:p-8 border border-white/15 shadow-2xl space-y-5">
          {/* Question Index Progress */}
          <div className="flex items-center justify-between text-xs text-slate-400 border-b border-white/10 pb-3">
            <span>Question {currentQIndex + 1} of {questions.length}</span>
            <span className="font-mono text-amber-200">Just for smiles 😊</span>
          </div>

          {/* Question Prompt */}
          <h3 className="font-serif-elegant text-xl sm:text-2xl text-white font-normal leading-relaxed">
            {currentQuestion.question}
          </h3>

          {/* Options */}
          <div className="space-y-3 pt-2">
            {currentQuestion.options.map((opt, idx) => {
              const isSelected = selectedOptionIndex === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full text-left p-3.5 sm:p-4 rounded-xl border text-sm sm:text-base font-light transition-all flex items-start gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/60 ${
                    isSelected
                      ? 'bg-white/15 border-white text-white shadow-[0_0_15px_rgba(255,255,255,0.15)] scale-[1.01]'
                      : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center text-xs font-mono shrink-0 mt-0.5">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="flex-1">{opt.text}</span>
                </button>
              );
            })}
          </div>

          {/* Feedback note when option is picked */}
          {selectedOptionIndex !== null && (
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-amber-300/20 text-xs sm:text-sm text-amber-100 flex items-start gap-2 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
              <span>{currentQuestion.options[selectedOptionIndex].feedback}</span>
            </div>
          )}

          {/* Next / Submit Button */}
          <div className="pt-2 flex justify-end">
            <button
              onClick={handleNextQuestion}
              disabled={selectedOptionIndex === null}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-medium text-slate-950 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed shadow transition-all hover:scale-102 active:scale-98"
            >
              <span>{currentQIndex === questions.length - 1 ? "Finish Game" : "Next Question"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Completion Screen */
        <div className="w-full glass-panel rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl text-center space-y-4 animate-fadeIn">
          <div className="w-14 h-14 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 flex items-center justify-center mx-auto text-2xl">
            🎉
          </div>

          <h3 className="font-serif-elegant text-2xl sm:text-3xl text-white font-normal">
            {BIRTHDAY_CONFIG.QUIZ.completionHeading}
          </h3>

          <p className="font-serif-elegant text-lg text-slate-200 font-light max-w-sm mx-auto leading-relaxed">
            "{BIRTHDAY_CONFIG.QUIZ.completionMessage}"
          </p>

          <p className="text-xs text-slate-400">
            No prizes needed when friendship is genuine and free of pressure.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onGoToFinal}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full text-sm font-medium text-slate-950 bg-gradient-to-r from-white via-slate-100 to-[#F5EFE6] shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105 transition-all"
            >
              <span>One Last Little Surprise 🌹</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onBackToGarden}
              className="w-full sm:w-auto px-5 py-2.5 rounded-full text-xs text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
            >
              Return to Garden
            </button>
          </div>

          <div className="pt-2">
            <button
              onClick={handleRestart}
              className="text-xs text-slate-400 hover:text-slate-200 underline underline-offset-4 inline-flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" /> Play quiz again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
