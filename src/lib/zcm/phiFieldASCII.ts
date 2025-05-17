/**
 * ASCII spiral field for PhiField overlay.
 * You may expand this to use actual s.core or ZCM values.
 */
export class PhiFieldASCII {
  constructor(public width: number, public height: number) {}

  render(tick: number): string[][] {
    // Generate a simple spiral ASCII frame (placeholder; replace with real logic)
    const out: string[][] = [];
    const cols = Math.floor(this.width / 16);
    const rows = Math.floor(this.height / 20);

    for (let y = 0; y < rows; ++y) {
      out[y] = [];
      for (let x = 0; x < cols; ++x) {
        // Spiral formula: for demo, "@" where (x + y + tick) % 11 == 0, else "."
        out[y][x] = ((x * x + y * y + tick) % 23 === 0) ? "@" : ".";
      }
    }
    return out;
  }
}

/**
 * Draw a glyph matrix to canvas.
 */
export function drawGlyphFieldToCanvas(
  ctx: CanvasRenderingContext2D,
  field: string[][]
) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.font = "bold 16px monospace";
  ctx.fillStyle = "#60a5fa";
  for (let y = 0; y < field.length; ++y) {
    for (let x = 0; x < field[y].length; ++x) {
      if (field[y][x] !== ".") {
        ctx.fillText(field[y][x], x * 16, y * 20 + 18);
      }
    }
  }
}