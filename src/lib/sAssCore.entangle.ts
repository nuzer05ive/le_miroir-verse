import { expi } from './math/complex';

interface Complex {
  re: number;
  im: number;
  add?: (other: Complex) => Complex;
  mul?: (other: Complex) => Complex;
  scale?: (factor: number) => Complex;
}

export interface Qubit {
  alpha: Complex;
  beta: Complex;
}

function multiply(a: Complex, b: Complex): Complex {
  return { re: a.re * b.re - a.im * b.im, im: a.re * b.im + a.im * b.re };
}
function scale(c: Complex, s: number): Complex {
  return { re: c.re * s, im: c.im * s };
}

export function entangle(mouth: Qubit, sAss: Qubit, phiPhase: number): Qubit {
  const phase = expi(phiPhase);
  const norm  = 1 / Math.SQRT2;

  return {
    alpha: scale(multiply(mouth.alpha, sAss.alpha), norm),
    beta:  scale(multiply(multiply(mouth.beta, sAss.beta), phase), norm)
  };
}
