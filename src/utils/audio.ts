/**
 * Audio synthesis & sound playback helper.
 * Includes the cathedral bell of Notre-Dame de Paris (Bourdon Emmanuel),
 * the wooden judge gavel knock, and gentle meditation chime.
 */

let audioCtx: AudioContext | null = null;
let cachedBellAudio: HTMLAudioElement | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

/**
 * Synthesizes the authentic physical acoustics of the great bell of Notre-Dame de Paris (Le Bourdon Emmanuel in F2).
 * Rich bronze partials: fundamental 87.3Hz, prime 174.6Hz, tierce 207.6Hz, fifth 261.6Hz, nominal 349.2Hz, clapper transient.
 */
export function synthesizeNotreDameBell(volume = 0.65) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // Bronze partials of the Bourdon Emmanuel (F2 ~ 87.3 Hz)
    const partials = [
      { freq: 87.3, weight: 0.8, decay: 5.5 },   // Hum note
      { freq: 174.6, weight: 0.9, decay: 4.8 },  // Prime note
      { freq: 207.65, weight: 0.7, decay: 4.2 }, // Minor tierce
      { freq: 261.63, weight: 0.6, decay: 3.5 }, // Fifth
      { freq: 349.23, weight: 0.7, decay: 3.0 }, // Nominal octave
      { freq: 440.0, weight: 0.4, decay: 2.5 },  // Tenth
      { freq: 523.25, weight: 0.35, decay: 2.0 }, // Duodecime
      { freq: 698.46, weight: 0.25, decay: 1.5 }, // Double octave
      { freq: 1046.5, weight: 0.15, decay: 1.0 }, // Higher rim shimmer
      { freq: 1396.9, weight: 0.10, decay: 0.7 }, // Strike brilliance
    ];

    partials.forEach(({ freq, weight, decay }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(volume * weight * 0.45, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + decay);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + decay + 0.1);
    });

    // Bronze clapper strike impulse
    const bufferSize = ctx.sampleRate * 0.05;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.006));
    }

    const clapper = ctx.createBufferSource();
    clapper.buffer = buffer;

    const clapperFilter = ctx.createBiquadFilter();
    clapperFilter.type = 'bandpass';
    clapperFilter.frequency.setValueAtTime(600, now);
    clapperFilter.Q.setValueAtTime(2, now);

    const clapperGain = ctx.createGain();
    clapperGain.gain.setValueAtTime(volume * 0.35, now);
    clapperGain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

    clapper.connect(clapperFilter);
    clapperFilter.connect(clapperGain);
    clapperGain.connect(ctx.destination);

    clapper.start(now);
    clapper.stop(now + 0.07);
  } catch {
    // Graceful fallback
  }
}

/**
 * Plays the cathedral bell of Notre-Dame de Paris.
 * Tries the high fidelity audio file first, falls back to Web Audio synthesis seamlessly.
 */
export function playNotreDameBell(volume = 0.7) {
  try {
    if (typeof Audio !== 'undefined') {
      if (!cachedBellAudio) {
        const base = import.meta.env.BASE_URL || './';
        const cleanBase = base.endsWith('/') ? base : `${base}/`;
        cachedBellAudio = new Audio(`${cleanBase}assets/audio/cloche_notre_dame.mp3`);
      }
      cachedBellAudio.currentTime = 0;
      cachedBellAudio.volume = Math.min(1, Math.max(0, volume));
      const playPromise = cachedBellAudio.play();
      if (playPromise) {
        playPromise.catch(() => {
          // Fallback to real-time Web Audio API synthesis
          synthesizeNotreDameBell(volume);
        });
        return;
      }
    }
  } catch {
    // Fallback to real-time Web Audio API synthesis
  }
  synthesizeNotreDameBell(volume);
}

/**
 * Alias for the cathedral bell: Cathédrale Saint-Pierre
 */
export const playSaintPierreBell = playNotreDameBell;

/**
 * Simulates a wooden gavel knock (Coup de marteau de juge).
 */
export function playGavelSound(volume = 0.5) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // Double strike: "Toc ... Toc"
    [0, 0.18].forEach((offset) => {
      const strikeTime = now + offset;
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(140, strikeTime);
      osc.frequency.exponentialRampToValueAtTime(45, strikeTime + 0.12);

      gain.gain.setValueAtTime(volume * 0.9, strikeTime);
      gain.gain.exponentialRampToValueAtTime(0.001, strikeTime + 0.14);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(strikeTime);
      osc.stop(strikeTime + 0.15);

      // Noise click for wooden impact
      const bufferSize = ctx.sampleRate * 0.03;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.008));
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.setValueAtTime(800, strikeTime);
      noiseFilter.Q.setValueAtTime(3, strikeTime);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(volume * 0.4, strikeTime);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, strikeTime + 0.04);

      whiteNoise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(ctx.destination);

      whiteNoise.start(strikeTime);
      whiteNoise.stop(strikeTime + 0.05);
    });
  } catch {
    // Graceful fallback
  }
}

/**
 * Simulates a gentle bell / Tibetan singing bowl chime for relaxing pause end.
 */
export function playChimeSound(volume = 0.4) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const baseFreq = 528;

    [1, 2.02, 3.01, 4.7].forEach((ratio, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(baseFreq * ratio, now);

      const harmonicWeight = Math.pow(0.5, index);
      gain.gain.setValueAtTime(volume * harmonicWeight, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8 - index * 0.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 2.0);
    });
  } catch {
    // Graceful fallback
  }
}

/**
 * Subtle soft tick / click for button presses.
 */
export function playSoftClick(volume = 0.15) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(120, now + 0.03);

    gain.gain.setValueAtTime(volume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.04);
  } catch {
    // Graceful fallback
  }
}
