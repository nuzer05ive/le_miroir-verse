import { createCanvas } from 'canvas';
import fs from 'node:fs';
import path from 'node:path';
import { glyphIndex, GOLDEN_ANG } from '../lib/math/constants';

export function generateGlyphSVG(n: number) {
  const idx = glyphIndex(n);
  const turns = 3 + (idx % 5);                // small style variation
  const rMax = 64;
  const pts = Array.from({ length: 720 }, (_, i) => {
    const angle = i * GOLDEN_ANG * Math.PI / 180;
    const r = rMax * i / 720;
    return [r * Math.cos(angle), r * Math.sin(angle)];
  });
  return `<svg viewBox="-${rMax} -${rMax} ${rMax * 2} ${rMax * 2}"
              stroke="currentColor" fill="none" stroke-width="2">
            <path d="M${pts.map(p => p.join(',')).join(' L ')}" />
          </svg>`;
}

export function writeGlyph(n: number, dir = 'src/assets/glyphs') {
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, `glyph-${n}.svg`), generateGlyphSVG(n));
}
