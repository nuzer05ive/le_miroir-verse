/* NEW — centralised constant table + types */
export const PHI        = 1.618033988749895;  // φ
export const OMEGA      = 0.000437;           // ω
export const EPS_J      = 1.9e-7;             // ε_J
export const EPS_S      = 7.0e-8;             // ε_S
export const GOLDEN_ANG = 137.508;            // α  (deg)

/* Derived helpers */
export const phiNode = (epochDays: number) =>
  Math.floor(epochDays * OMEGA) % 44;

export const glyphIndex = (n: number) => {
  const angle = (n * GOLDEN_ANG) % 360;
  return (Math.floor((20 * angle) / 360) + 20) % 20;
};

export const omegaEff = (phiJ: number, phiS: number) =>
  OMEGA + EPS_J * Math.sin(phiJ) + EPS_S * Math.sin(phiS);

export const fk = (rk: number) =>
  434.367 * 2 ** (rk / 12) * (1 + OMEGA * Math.sin(rk * PHI));

export const amp = (n: number, g0 = 1) =>
  g0 * Math.sqrt(3) ** Math.floor((n - 1) / 3);
