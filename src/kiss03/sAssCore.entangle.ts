import { Complex, expi } from '../lib/math/complex';

export interface Qubit {
  alpha: Complex;
  beta: Complex;
}

/**
 * Entangle two qubits (mouth+sAss) with a phi-based phase shift.
 * Returns a new entangled Qubit.
 */
export const entangle = (
  mouth: Qubit,
  sAss: Qubit,
  phiPhase: number
): Qubit => {
  const phase = expi(phiPhase); // e^{iφ}
  const norm = 1 / Math.SQRT2;

  return {
    alpha: mouth.alpha.mul(sAss.alpha).scale(norm),
    beta:  mouth.beta.mul(sAss.beta).mul(phase).scale(norm)
  };
};