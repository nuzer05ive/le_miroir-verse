import { entangle, Qubit } from './sAssCore.entangle';
import { PHI } from '../lib/math/constants';

/**
 * Launches the kiss overlay logic. If ZCM and bloomWeight thresholds are crossed,
 * triggers the ASCII spiral overlay and audio/visual events.
 */
export const launchKiss = (
  tick: number,
  Q_MOUTH: Qubit,
  Q_SASS: Qubit,
  bloomWeight: () => number,
  zcmNow: () => number,
  tauZcm: () => number,
  startOverlay: (entangled: Qubit) => void
) => {
  const phi43 = Math.pow(PHI, 43);
  const wobble = 0.000437 * tick;
  const phase = phi43 * Math.PI / 2 + wobble;

  const pair = entangle(Q_MOUTH, Q_SASS, phase);

  if (bloomWeight() >= 0.99 && zcmNow() >= tauZcm()) {
    startOverlay(pair);
  }
};