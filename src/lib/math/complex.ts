// Minimal Complex number implementation for quantum/kiss logic
export class Complex {
  constructor(public re: number, public im: number) {}

  mul(other: Complex): Complex {
    return new Complex(
      this.re * other.re - this.im * other.im,
      this.re * other.im + this.im * other.re
    );
  }

  scale(f: number): Complex {
    return new Complex(this.re * f, this.im * f);
  }
}

export const expi = (phi: number) =>
  new Complex(Math.cos(phi), Math.sin(phi));