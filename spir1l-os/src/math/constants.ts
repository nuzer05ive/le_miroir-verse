export const OMEGA = 0.000437;
export const EPS_J = 0.002;   // Jupiter perturbation term placeholder
export const EPS_S = 0.001;   // Saturn term

export const omegaEff = (phiJ: number, phiS: number) =>
  OMEGA + EPS_J * Math.sin(phiJ) + EPS_S * Math.sin(phiS);

export const fk = (r: number, rk: number) =>
  434.367 * 2 ** (rk / 12) * (1 + OMEGA * Math.sin(rk * r));

export const A = (n: number, g0 = 1) =>
  g0 * 3 ** (Math.floor((n - 1) / 3) / 2);  // LUFS normalisation later
