import React, { useState } from 'react';
import { BIRTHDAY_CONFIG, GalleryPhoto } from '../config/birthdayConfig';
import { audioSynth } from '../utils/audioSynthesizer';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Sparkles,
  Upload,
  ArrowRight,
  Image as ImageIcon,
} from 'lucide-react';

interface PhotoGalleryViewProps {
  onGoToQuiz: () => void;
}

export const PhotoGalleryView: React.FC<PhotoGalleryViewProps> = ({ onGoToQuiz }) => {
  const [photos, setPhotos] = useState<GalleryPhoto[]>(BIRTHDAY_CONFIG.GALLERY.photos);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [imageErrorMap, setImageErrorMap] = useState<Record<string, boolean>>({});

  const currentPhoto = photos[currentIndex] || photos[0];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
    audioSynth.playRoseChime();
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
    audioSynth.playRoseChime();
  };

  // Allow uploading additional or custom photos locally without server
  const handleLocalUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const url = event.target?.result as string;
      if (url) {
        const newPhoto: GalleryPhoto = {
          id: `custom-${Date.now()}`,
          url,
          caption: "A newly added memory to cherish.",
          date: "Just Added",
          alt: "Custom photo memory",
        };
        setPhotos((prev) => [newPhoto, ...prev]);
        setCurrentIndex(0);
        audioSynth.playRoseChime();
      }
    };
    reader.readAsDataURL(file);
  };

  const handleImageError = (id: string) => {
    setImageErrorMap((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center py-6 px-4 z-10 max-w-3xl mx-auto">
      {/* Gallery Heading */}
      <div className="text-center space-y-2 mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs text-amber-200/90 bg-amber-500/10 border border-amber-400/20">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Memories & Moments</span>
        </div>

        <h2 className="font-serif-elegant text-3xl sm:text-4xl text-white font-normal">
          {BIRTHDAY_CONFIG.GALLERY.heading}
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
          {BIRTHDAY_CONFIG.GALLERY.subtitle}
        </p>
      </div>

      {/* Featured Photo Frame */}
      <div className="relative w-full max-w-md sm:max-w-lg aspect-[3/4] sm:aspect-[4/5] rounded-3xl overflow-hidden glass-panel border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.8)] group">
        {/* The Photo itself */}
        {!imageErrorMap[currentPhoto.id] ? (
          <img
            src={currentPhoto.url}
            alt={currentPhoto.alt}
            onError={() => handleImageError(currentPhoto.id)}
            className="w-full h-full object-cover object-top transition-all duration-700 select-none group-hover:scale-102"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-slate-900 text-slate-400">
            <ImageIcon className="w-12 h-12 text-slate-500 mb-2" />
            <p className="text-sm font-medium text-slate-200">Precious Memory</p>
            <p className="text-xs text-slate-400 mt-1">{currentPhoto.caption}</p>
          </div>
        )}

        {/* Ambient Gradient Scrim for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

        {/* Top Floating Badge & Lightbox Trigger */}
        <div className="absolute top-4 inset-x-4 flex items-center justify-between">
          <span className="px-3 py-1 rounded-full text-[11px] font-medium text-white/90 bg-black/40 backdrop-blur-md border border-white/10">
            Photo {currentIndex + 1} of {photos.length}
          </span>

          <button
            onClick={() => setLightboxOpen(true)}
            className="p-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white/80 hover:text-white hover:bg-black/60 transition-colors focus:outline-none"
            aria-label="View full screen"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        {/* Next / Previous Arrow Overlays */}
        {photos.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/45 backdrop-blur-md border border-white/15 text-white hover:bg-black/75 hover:scale-110 active:scale-95 transition-all focus:outline-none"
              aria-label="Previous photograph"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/45 backdrop-blur-md border border-white/15 text-white hover:bg-black/75 hover:scale-110 active:scale-95 transition-all focus:outline-none"
              aria-label="Next photograph"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Caption at the bottom */}
        <div className="absolute bottom-4 inset-x-4 space-y-1 text-center sm:text-left">
          <p className="font-serif-elegant text-base sm:text-lg text-white font-light drop-shadow">
            "{currentPhoto.caption}"
          </p>
          <p className="text-[11px] text-amber-200/80 font-mono tracking-wide">
            {currentPhoto.date || "Deepanshi & Moments"}
          </p>
        </div>
      </div>

      {/* Thumbnails list */}
      <div className="flex items-center gap-3 mt-4 overflow-x-auto pb-2 max-w-full">
        {photos.map((photo, idx) => (
          <button
            key={photo.id}
            onClick={() => {
              setCurrentIndex(idx);
              audioSynth.playRoseChime();
            }}
            className={`relative w-16 h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
              currentIndex === idx
                ? 'border-white shadow-[0_0_12px_rgba(255,255,255,0.5)] scale-105'
                : 'border-white/20 opacity-60 hover:opacity-90'
            }`}
          >
            <img
              src={photo.url}
              alt={photo.alt}
              className="w-full h-full object-cover object-top"
            />
          </button>
        ))}

        {/* Optional Add Photo Button for Creator */}
        <label className="relative w-16 h-20 rounded-xl border border-dashed border-white/30 hover:border-white/60 bg-white/5 hover:bg-white/10 flex flex-col items-center justify-center cursor-pointer transition-colors flex-shrink-0 text-slate-400 hover:text-white">
          <Upload className="w-4 h-4 mb-1" />
          <span className="text-[10px] text-center px-1">Add Photo</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleLocalUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* Navigation to Quiz */}
      <div className="mt-8 flex flex-col items-center gap-3">
        <button
          onClick={onGoToQuiz}
          className="group relative inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full text-sm font-medium text-slate-950 bg-gradient-to-r from-white via-slate-100 to-[#F5EFE6] shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-all duration-300 hover:scale-[1.02] active:scale-98 focus:outline-none"
        >
          <span>Play Tiny Birthday Game 🎁</span>
          <ArrowRight className="w-4 h-4 text-slate-800 transition-transform group-hover:translate-x-1" />
        </button>

        <p className="text-xs text-slate-400">
          A short, 3-question playful quiz
        </p>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl animate-fadeIn"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors z-50"
            aria-label="Close full view"
          >
            <X className="w-6 h-6" />
          </button>

          <div
            className="relative max-w-2xl max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={currentPhoto.url}
              alt={currentPhoto.alt}
              className="max-w-full max-h-[75vh] object-contain rounded-2xl border border-white/20 shadow-2xl"
            />
            <p className="mt-4 font-serif-elegant text-lg text-white font-light text-center">
              "{currentPhoto.caption}"
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
