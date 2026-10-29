import React, { useState } from 'react';
import { BIRTHDAY_CONFIG } from '../config/birthdayConfig';
import { AudioControlBar } from './AudioControlBar';
import { MessageCircle, Menu, X, ChevronRight, HelpCircle } from 'lucide-react';

export type PageId =
  | 'garden-gate'
  | 'celebration'
  | 'roses'
  | 'letter'
  | 'memories'
  | 'quiz'
  | 'final-bloom';

interface NavigationHeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  unlockedRosesCount: number;
}

export const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  currentPage,
  onNavigate,
  unlockedRosesCount,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  const pages: { id: PageId; label: string; number: number; subtitle: string }[] = [
    { id: 'garden-gate', label: 'Secret Garden', number: 1, subtitle: 'Opening Gate' },
    { id: 'celebration', label: 'Celebration', number: 2, subtitle: 'Wishes & Birthday Cake' },
    { id: 'roses', label: '8 White Roses', number: 3, subtitle: `Garden (${unlockedRosesCount}/8 unlocked)` },
    { id: 'letter', label: 'Personal Letter', number: 4, subtitle: 'A Note for Deepanshi' },
    { id: 'memories', label: 'Moments Gallery', number: 5, subtitle: 'Cherished Memories' },
    { id: 'quiz', label: 'Birthday Game', number: 6, subtitle: '3 Gentle Questions' },
    { id: 'final-bloom', label: 'The Final Bloom', number: 7, subtitle: 'Last Surprise' },
  ];

  const currentPageIndex = pages.findIndex((p) => p.id === currentPage);
  const currentPageInfo = pages[currentPageIndex] || pages[0];

  const handleSelectPage = (page: PageId) => {
    onNavigate(page);
    setMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#050711]/85 border-b border-white/10 px-4 sm:px-6 py-2.5 transition-all">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          {/* Brand Wordmark (Zone 1) */}
          <button
            onClick={() => handleSelectPage('garden-gate')}
            className="text-left font-serif-elegant text-base sm:text-lg font-medium text-white tracking-wide hover:text-amber-100 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 focus:outline-none"
          >
            <span className="text-sm">🤍</span>
            <span className="truncate">{BIRTHDAY_CONFIG.APP_TITLE}</span>
          </button>

          {/* Simple Page Indicator & Dropdown Trigger for Non-Technical Users (Zone 2) */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-xs text-slate-200 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-white"
              aria-label="Choose page"
            >
              <span className="font-mono text-amber-200">{currentPageInfo.number}/7</span>
              <span className="font-medium hidden sm:inline">{currentPageInfo.label}</span>
              <Menu className="w-3.5 h-3.5 text-slate-400 ml-0.5" />
            </button>
          </div>

          {/* Audio & Question / Contact Help (Zone 3) */}
          <div className="flex items-center gap-2 shrink-0">
            <AudioControlBar />

            <button
              onClick={() => setContactModalOpen(true)}
              className="flex items-center gap-1 p-1.5 sm:px-2.5 sm:py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300 hover:text-white transition-colors focus:outline-none"
              title="Have a question or doubt? Ask me"
              aria-label="Ask creator a question"
            >
              <HelpCircle className="w-3.5 h-3.5 text-amber-300" />
              <span className="hidden md:inline text-[11px]">Ask Me</span>
            </button>
          </div>
        </div>
      </header>

      {/* Simple Page Switcher Drawer / Modal */}
      {menuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-black/80 backdrop-blur-md animate-fadeIn"
          onClick={() => setMenuOpen(false)}
        >
          <div
            className="w-full max-w-sm glass-panel border border-white/20 rounded-3xl p-5 shadow-2xl space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="space-y-0.5">
                <h3 className="text-sm font-semibold text-white">Pages for {BIRTHDAY_CONFIG.FRIEND_NAME}</h3>
                <p className="text-[11px] text-slate-400">Tap any page to open directly</p>
              </div>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-white"
                aria-label="Close page menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1.5 max-h-[60vh] overflow-y-auto pr-1">
              {pages.map((p) => {
                const isSelected = p.id === currentPage;
                return (
                  <button
                    key={p.id}
                    onClick={() => handleSelectPage(p.id)}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left text-xs transition-all ${
                      isSelected
                        ? 'bg-white/20 text-white font-medium border border-white/30 shadow-sm'
                        : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center font-mono text-[11px] text-amber-200">
                        {p.number}
                      </span>
                      <div>
                        <div className="font-medium text-slate-100">{p.label}</div>
                        <div className="text-[10px] text-slate-400">{p.subtitle}</div>
                      </div>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Help / Contact Creator Modal */}
      {contactModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
          onClick={() => setContactModalOpen(false)}
        >
          <div
            className="w-full max-w-md glass-panel border border-white/20 rounded-3xl p-6 shadow-2xl space-y-4 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 flex items-center justify-center mx-auto">
              <MessageCircle className="w-6 h-6" />
            </div>

            <h3 className="font-serif-elegant text-2xl text-white font-normal">
              Any Doubt or Question?
            </h3>

            <p className="text-xs sm:text-sm text-slate-200 font-light leading-relaxed">
              "This little gift was made just to celebrate your birthday and make you smile. If you ever have any doubt, question, or thought, please feel free to ask me directly anytime!"
            </p>

            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-white/10 text-xs text-slate-300 space-y-1">
              <p className="text-slate-400">Creator Contact / Direct ID:</p>
              <p className="font-mono text-amber-200 text-sm font-medium select-all">
                22nikhilpandey@gmail.com
              </p>
              <p className="text-[11px] text-slate-400">
                Or send a message on WhatsApp / Instagram anytime 💬
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setContactModalOpen(false)}
                className="px-6 py-2 rounded-full text-xs font-medium text-slate-900 bg-white hover:bg-slate-100 shadow transition-colors"
              >
                Got It, Thank You! 🤍
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
