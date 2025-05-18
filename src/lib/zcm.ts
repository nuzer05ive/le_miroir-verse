// zcm.ts: pure-TS ZCM math
// from "coherence.ts" or your existing library

export function calculateZCM(data: number[]): number {
  // placeholder logic
  const sum = data.reduce((acc, val) => acc + val, 0);
  return sum / data.length;
}

export function tauZcm(R: number): number {
  // from spec: τ_zcm = 0.10 + 0.05·(1 - e^{-R})
  return 0.1 + 0.05 * (1 - Math.exp(-R));
}
