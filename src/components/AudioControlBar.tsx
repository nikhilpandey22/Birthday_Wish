import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music, Pause } from 'lucide-react';
import { audioSynth } from '../utils/audioSynthesizer';

export const AudioControlBar: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    setIsPlaying(audioSynth.getIsPlaying());
    setIsMuted(audioSynth.getMuted());
  }, []);

  const handleTogglePlay = () => {
    const playing = audioSynth.togglePlay();
    setIsPlaying(playing);
  };

  const handleToggleMute = () => {
    const muted = audioSynth.toggleMute();
    setIsMuted(muted);
  };

  return (
    <div className="flex items-center gap-1.5 bg-slate-900/70 backdrop-blur-md border border-white/10 rounded-full px-2.5 py-1 text-xs text-slate-300 shadow-lg">
      <button
        onClick={handleTogglePlay}
        className="flex items-center gap-1.5 px-2 py-1 rounded-full hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-white/40 whitespace-nowrap"
        title={isPlaying ? "Pause gentle melody" : "Play gentle melody"}
        aria-label={isPlaying ? "Pause music" : "Play ambient music"}
      >
        {isPlaying ? (
          <>
            <Pause className="w-3.5 h-3.5 text-amber-200" />
            <span className="hidden sm:inline text-[11px]">Music</span>
          </>
        ) : (
          <>
            <Music className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline text-[11px]">Music</span>
          </>
        )}
      </button>

      <div className="w-[1px] h-3 bg-white/10" />

      <button
        onClick={handleToggleMute}
        className="p-1 rounded-full hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-white/40"
        title={isMuted ? "Unmute sound effects" : "Mute sound effects"}
        aria-label={isMuted ? "Unmute audio" : "Mute audio"}
      >
        {isMuted ? (
          <VolumeX className="w-3.5 h-3.5 text-rose-300/80" />
        ) : (
          <Volume2 className="w-3.5 h-3.5 text-slate-300" />
        )}
      </button>
    </div>
  );
};
