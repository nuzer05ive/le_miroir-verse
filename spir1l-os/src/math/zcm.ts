export type ZcmScore = number;
export function zcmColor(score: ZcmScore) {
  // \u0394E<2 perceptual\u00a0match placeholder
  if (score > 0.7) return '#ff5533'; // hot
  if (score < 0.3) return '#3366ff'; // cold
  return '#888888';                  // neutral
}
