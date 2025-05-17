import { PHI } from '../math/constants';

// Assume Tone.js oscillator/gain nodes exist globally
declare const toneOscillator: any;
declare const gainNode: any;

/**
 * Animate oscillator and gain node using phi-based spiral.
 */
export const phiSwells = (zcm: number, t: number) => {
  const f = 60 + 43 * Math.sin(Math.pow(PHI, 3) * t);
  if (toneOscillator && gainNode) {
    toneOscillator.frequency.value = f * zcm;
    gainNode.gain.value = 0.4 * zcm;
  }
};