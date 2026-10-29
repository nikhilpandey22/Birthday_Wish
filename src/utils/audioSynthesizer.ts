/**
 * Web Audio API ambient music synthesizer and delicate sound effects.
 * Requires no external audio files and will never fail to load.
 */

class AudioSynthesizer {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private isMuted: boolean = false;
  private volume: number = 0.35;
  private masterGain: GainNode | null = null;
  private timerId: number | null = null;
  private melodyIndex: number = 0;

  // Gentle, nostalgic music-box frequencies (Hz) for a dreamy white-rose lullaby
  // Notes in F Major / D Minor Pentatonic: F4, A4, C5, D5, E5, F5, G5, A5
  private notes = [
    349.23, // F4
    440.0,  // A4
    523.25, // C5
    587.33, // D5
    659.25, // E5
    523.25, // C5
    440.0,  // A4
    392.0,  // G4
    349.23, // F4
    523.25, // C5
    587.33, // D5
    698.46, // F5
    659.25, // E5
    523.25, // C5
    440.0,  // A4
    349.23, // F4
  ];

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx && !this.isMuted) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public startMusic() {
    this.initContext();
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.scheduleNextNote();
  }

  public stopMusic() {
    this.isPlaying = false;
    if (this.timerId !== null) {
      window.clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  public togglePlay(): boolean {
    if (this.isPlaying) {
      this.stopMusic();
    } else {
      this.startMusic();
    }
    return this.isPlaying;
  }

  private scheduleNextNote() {
    if (!this.isPlaying) return;
    const freq = this.notes[this.melodyIndex % this.notes.length];
    this.melodyIndex++;

    this.playTone(freq, 1.8, 'sine', 0.2);
    // Subtle companion harmonic (fifth or octave)
    if (this.melodyIndex % 3 === 0) {
      this.playTone(freq * 0.5, 2.5, 'triangle', 0.12);
    }

    // Interval between 450ms and 750ms for gentle music box rhythm
    const nextInterval = (this.melodyIndex % 4 === 0) ? 900 : 550;
    this.timerId = window.setTimeout(() => {
      this.scheduleNextNote();
    }, nextInterval);
  }

  private playTone(freq: number, duration: number, type: OscillatorType = 'sine', volume: number = 0.25) {
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Delicate envelope: instant soft attack, gentle exponential decay
      const now = this.ctx.currentTime;
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(volume, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + duration);
    } catch {
      // Audio playback safety
    }
  }

  // Soft celestial chime for opening a rose
  public playRoseChime() {
    this.initContext();
    if (this.isMuted) return;
    const chords = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    chords.forEach((note, i) => {
      window.setTimeout(() => {
        this.playTone(note, 1.4, 'sine', 0.22);
      }, i * 90);
    });
  }

  // Gentle blowing sound for the candle
  public playCandleBlow() {
    this.initContext();
    if (this.isMuted || !this.ctx || !this.masterGain) return;
    try {
      // White noise buffer for gentle breath/blowing effect
      const bufferSize = this.ctx.sampleRate * 0.8;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.3));
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(400, this.ctx.currentTime);
      filter.frequency.linearRampToValueAtTime(120, this.ctx.currentTime + 0.7);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.8);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(this.masterGain);

      noise.start();

      // Soft magical sparkle chime after blow
      window.setTimeout(() => {
        this.playRoseChime();
      }, 400);
    } catch {
      // Audio safety
    }
  }

  // Grand blooming fanfare
  public playBloomFanfare() {
    this.initContext();
    if (this.isMuted) return;
    const notes = [349.23, 440.0, 523.25, 659.25, 698.46, 880.0, 1046.5];
    notes.forEach((freq, idx) => {
      window.setTimeout(() => {
        this.playTone(freq, 2.2, 'sine', 0.25);
      }, idx * 120);
    });
  }

  // Quiz sound effect
  public playQuizChime(isCorrect: boolean) {
    this.initContext();
    if (this.isMuted) return;
    if (isCorrect) {
      this.playTone(587.33, 0.4, 'sine', 0.2);
      window.setTimeout(() => this.playTone(880.0, 0.8, 'sine', 0.25), 120);
    } else {
      this.playTone(440.0, 0.5, 'triangle', 0.15);
      window.setTimeout(() => this.playTone(493.88, 0.6, 'sine', 0.15), 140);
    }
  }
}

export const audioSynth = new AudioSynthesizer();
