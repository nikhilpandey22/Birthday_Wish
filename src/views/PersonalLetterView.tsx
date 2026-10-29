import React, { useState, useEffect } from 'react';
import { BIRTHDAY_CONFIG } from '../config/birthdayConfig';
import { WhiteRoseIllustration } from '../components/WhiteRoseIllustration';
import { audioSynth } from '../utils/audioSynthesizer';
import { RotateCcw, Eye, ArrowRight, Heart } from 'lucide-react';

interface PersonalLetterViewProps {
  onGoToMemories: () => void;
}

export const PersonalLetterView: React.FC<PersonalLetterViewProps> = ({ onGoToMemories }) => {
  const paragraphs = BIRTHDAY_CONFIG.LETTER.paragraphs;
  const [visibleParagraphsCount, setVisibleParagraphsCount] = useState<number>(1);
  const [isTypingComplete, setIsTypingComplete] = useState<boolean>(false);

  useEffect(() => {
    if (visibleParagraphsCount < paragraphs.length) {
      const timer = setTimeout(() => {
        setVisibleParagraphsCount((prev) => prev + 1);
      }, 700);
      return () => clearTimeout(timer);
    } else {
      setIsTypingComplete(true);
    }
  }, [visibleParagraphsCount, paragraphs.length]);

  const handleRevealAll = () => {
    setVisibleParagraphsCount(paragraphs.length);
    setIsTypingComplete(true);
    audioSynth.playRoseChime();
  };

  const handleReadAgain = () => {
    setVisibleParagraphsCount(1);
    setIsTypingComplete(false);
    audioSynth.playRoseChime();
  };

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center py-6 px-4 z-10 max-w-2xl mx-auto">
      {/* Header kicker */}
      <div className="text-center space-y-1 mb-5">
        <span className="text-xs uppercase tracking-widest text-amber-200/90 font-medium">
          A Heartfelt Note
        </span>
        <h2 className="font-serif-elegant text-3xl sm:text-4xl text-white font-normal">
          A Letter for You, Deepanshi
        </h2>
        <p className="text-xs text-slate-300">
          Written with genuine care, quiet loyalty, and zero expectations.
        </p>
      </div>

      {/* Action Controls for Letter */}
      <div className="w-full flex items-center justify-between px-2 mb-3 text-xs text-slate-400">
        <button
          onClick={handleReadAgain}
          className="flex items-center gap-1.5 hover:text-white transition-colors focus:outline-none"
        >
          <RotateCcw className="w-3.5 h-3.5 text-amber-200" />
          <span>Read It Again 🤍</span>
        </button>

        {!isTypingComplete && (
          <button
            onClick={handleRevealAll}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800/80 border border-white/10 hover:bg-slate-700/80 text-slate-200 transition-colors focus:outline-none"
          >
            <Eye className="w-3.5 h-3.5 text-amber-300" />
            <span>Show Full Letter</span>
          </button>
        )}
      </div>

      {/* Ivory Paper Card */}
      <div className="relative w-full ivory-letter rounded-3xl p-6 sm:p-10 shadow-2xl transition-all duration-500 overflow-hidden">
        {/* Soft watermark white rose in background corner */}
        <div className="absolute -top-12 -right-12 opacity-10 pointer-events-none">
          <WhiteRoseIllustration size="lg" isGlowing={false} />
        </div>

        {/* Decorative corner borders */}
        <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#D4AF37]/40 pointer-events-none" />
        <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#D4AF37]/40 pointer-events-none" />

        {/* Salutation */}
        <div className="mb-4">
          <h3 className="font-serif-elegant text-2xl sm:text-3xl font-semibold text-[#1F2937]">
            {BIRTHDAY_CONFIG.LETTER.salutation}
          </h3>
        </div>

        {/* Letter Body Paragraphs */}
        <div className="space-y-3.5 font-serif-elegant text-base sm:text-lg text-[#2A3447] leading-relaxed">
          {paragraphs.slice(0, visibleParagraphsCount).map((para, idx) => (
            <p key={idx} className="transition-opacity duration-500 animate-fadeIn">
              {para}
            </p>
          ))}
        </div>

        {/* Signature */}
        {visibleParagraphsCount >= paragraphs.length && (
          <div className="mt-8 pt-6 border-t border-[#D4AF37]/30 text-right animate-fadeIn">
            <p className="font-script-calligraphy text-2xl sm:text-3xl text-[#1F2937]">
              {BIRTHDAY_CONFIG.LETTER.signature}
            </p>
          </div>
        )}
      </div>

      {/* Navigation to Memories */}
      <div className="mt-8 flex flex-col items-center gap-3">
        <button
          onClick={onGoToMemories}
          className="group relative inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full text-sm font-medium text-slate-950 bg-gradient-to-r from-white via-slate-100 to-[#F5EFE6] shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-all duration-300 hover:scale-[1.02] active:scale-98 focus:outline-none"
        >
          <span>See Little Moments & Memories 📸</span>
          <ArrowRight className="w-4 h-4 text-slate-800 transition-transform group-hover:translate-x-1" />
        </button>

        <p className="text-xs text-slate-400">
          Photographs from happy shared days
        </p>
      </div>
    </div>
  );
};
