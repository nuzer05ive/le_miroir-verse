export const norm = (v: number[]) => {
  const len = Math.hypot(...v);
  return v.map(x => x / (len || 1));
};

export const dot = (a: number[], b: number[]) =>
  a.reduce((s, x, i) => s + x * b[i], 0);
