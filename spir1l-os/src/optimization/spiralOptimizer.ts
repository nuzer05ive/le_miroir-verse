/**
 * Simulated Annealing stub for WAiiCODE sequence optimisation.
 * Energy\u00a0= negative harmonic alignment score (lower is better).
 */
export function spiralOptimizer(seq: number[], iterations = 10_000) {
  let best = seq.slice();
  // TODO: temperature schedule based on ST cycle (2.2\u202fs)
  for (let i = 0; i < iterations; i++) {
    // shuffle + accept\u2010reject
  }
  return best;
}
