import React, { useState } from 'react';
import { MoonlightAtmosphere } from './components/MoonlightAtmosphere';
import { NavigationHeader, PageId } from './components/NavigationHeader';
import { OpeningGardenView } from './views/OpeningGardenView';
import { CelebrationView } from './views/CelebrationView';
import { WhiteRoseGardenView } from './views/WhiteRoseGardenView';
import { PersonalLetterView } from './views/PersonalLetterView';
import { PhotoGalleryView } from './views/PhotoGalleryView';
import { FriendshipQuizView } from './views/FriendshipQuizView';
import { FinalBloomView } from './views/FinalBloomView';
import { audioSynth } from './utils/audioSynthesizer';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { BIRTHDAY_CONFIG } from './config/birthdayConfig';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('garden-gate');

  const pageSequence: PageId[] = [
    'garden-gate',
    'celebration',
    'roses',
    'letter',
    'memories',
    'quiz',
    'final-bloom',
  ];

  const pageTitles: Record<PageId, string> = {
    'garden-gate': 'Secret Garden Gate',
    'celebration': 'Birthday Celebration',
    'roses': '8 White Roses',
    'letter': 'Personal Letter',
    'memories': 'Photo Memories',
    'quiz': 'Tiny Birthday Game',
    'final-bloom': 'The Final Rose Bloom',
  };

  const currentIndex = pageSequence.indexOf(currentPage);
  const prevPage = currentIndex > 0 ? pageSequence[currentIndex - 1] : null;
  const nextPage = currentIndex < pageSequence.length - 1 ? pageSequence[currentIndex + 1] : null;

  const navigateTo = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    audioSynth.playRoseChime();
  };

  return (
    <div className="min-h-screen bg-[#040713] text-slate-100 flex flex-col justify-between relative selection:bg-rose-200/20 selection:text-white overflow-x-hidden font-sans">
      {/* Background Moonlight & Floating Petals */}
      <MoonlightAtmosphere intensity={currentPage === 'final-bloom' ? 'dreamy' : 'normal'} />

      {/* Top Header Navigation */}
      <NavigationHeader
        currentPage={currentPage}
        onNavigate={navigateTo}
        unlockedRosesCount={8}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-4 sm:py-6 flex flex-col justify-center relative z-10">
        {currentPage === 'garden-gate' && (
          <OpeningGardenView
            onOpenSurprise={() => navigateTo('celebration')}
            onSkipIntro={() => navigateTo('celebration')}
          />
        )}

        {currentPage === 'celebration' && (
          <CelebrationView
            onGoToGarden={() => navigateTo('roses')}
          />
        )}

        {currentPage === 'roses' && (
          <WhiteRoseGardenView
            onGoToLetter={() => navigateTo('letter')}
          />
        )}

        {currentPage === 'letter' && (
          <PersonalLetterView
            onGoToMemories={() => navigateTo('memories')}
          />
        )}

        {currentPage === 'memories' && (
          <PhotoGalleryView
            onGoToQuiz={() => navigateTo('quiz')}
          />
        )}

        {currentPage === 'quiz' && (
          <FriendshipQuizView
            onGoToFinal={() => navigateTo('final-bloom')}
            onBackToGarden={() => navigateTo('roses')}
          />
        )}

        {currentPage === 'final-bloom' && (
          <FinalBloomView
            onRestartExperience={() => navigateTo('garden-gate')}
          />
        )}
      </main>

      {/* Bottom Step-by-Step Navigation Bar for Easy Mobile Browsing */}
      {currentPage !== 'garden-gate' && (
        <footer className="relative z-20 w-full backdrop-blur-md bg-[#050711]/70 border-t border-white/10 py-3 px-4">
          <div className="max-w-4xl mx-auto flex items-center justify-between text-xs text-slate-400">
            {prevPage ? (
              <button
                onClick={() => navigateTo(prevPage)}
                className="flex items-center gap-1 hover:text-white transition-colors focus:outline-none p-1.5"
              >
                <ChevronLeft className="w-4 h-4 text-slate-300" />
                <span className="hidden sm:inline">Back: {pageTitles[prevPage]}</span>
                <span className="sm:hidden">Back</span>
              </button>
            ) : (
              <div />
            )}

            <div className="text-[11px] text-slate-400 font-mono">
              Page {currentIndex + 1} of {pageSequence.length}
            </div>

            {nextPage ? (
              <button
                onClick={() => navigateTo(nextPage)}
                className="flex items-center gap-1 text-slate-200 hover:text-white transition-colors focus:outline-none p-1.5 font-medium"
              >
                <span className="hidden sm:inline">Next: {pageTitles[nextPage]}</span>
                <span className="sm:hidden">Next</span>
                <ChevronRight className="w-4 h-4 text-amber-200" />
              </button>
            ) : (
              <button
                onClick={() => navigateTo('garden-gate')}
                className="text-amber-200 hover:text-white transition-colors p-1.5"
              >
                Start Over ✨
              </button>
            )}
          </div>
        </footer>
      )}
    </div>
  );
}
