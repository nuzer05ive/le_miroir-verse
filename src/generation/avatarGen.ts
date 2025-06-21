import { createCanvas } from 'canvas';
import fs from 'node:fs';
import path from 'node:path';
import { zcmColor } from '../lib/math/zcm';

export function writeAvatar(seed: string, zcm: number[], outDir = 'src/assets/avatars') {
  fs.mkdirSync(outDir, { recursive: true });
  const size = 128;
  const c = createCanvas(size, size);
  const ctx = c.getContext('2d');

  ctx.fillStyle = zcmColor(zcm[0]);   // base colour
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
  ctx.fill();

  // simple hash‑based eyes
  ctx.fillStyle = '#fff';
  const hash = [...seed].reduce((h, ch) => h ^ ch.charCodeAt(0), 0);
  ctx.fillRect(32, 40, 16, 16);
  ctx.fillRect(80, 40, 16, 16);
  ctx.fillStyle = '#000';
  ctx.fillRect(32 + (hash & 3), 40 + (hash >> 2 & 3), 8, 8);
  ctx.fillRect(80 + (hash >> 4 & 3), 40 + (hash >> 6 & 3), 8, 8);

  const file = path.join(outDir, `${seed}.png`);
  fs.writeFileSync(file, c.toBuffer('image/png'));
  return file;
}
