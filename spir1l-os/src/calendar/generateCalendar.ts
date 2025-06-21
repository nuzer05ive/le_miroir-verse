/**
 * kₙ formula → Mayan‑style glyph index (0‑19)
 *
 *   kₙ = (\u230a20\u00b7(n\u00b7137.5 mod 360)/360\u230b + 20) mod 20
 */
export function glyphIndex(n: number) {
  const angle = (n * 137.5) % 360;
  return (Math.floor(20 * angle / 360) + 20) % 20;
}

export function generateMonthGlyphs(days = 31) {
  return Array.from({ length: days }, (_, n) => glyphIndex(n + 1));
}
