import GIFEncoder from 'gifencoder';
import { createCanvas } from 'canvas';
import fs from 'node:fs';
import path from 'node:path';
import { OMEGA } from '../lib/math/constants';

export function writePulse(name: string, frames = 24) {
  const size = 128;
  const enc = new GIFEncoder(size, size);
  const file = path.join('src/assets/glyphs', `${name}.gif`);
  enc.createReadStream().pipe(fs.createWriteStream(file));
  enc.start(); enc.setRepeat(0); enc.setDelay(50); enc.setTransparent(0x00ffffff);

  const c = createCanvas(size, size);
  const ctx = c.getContext('2d');

  for (let f = 0; f < frames; f++) {
    const t = f / frames;
    ctx.clearRect(0, 0, size, size);
    ctx.lineWidth = 4;
    ctx.strokeStyle = `hsl(${Math.floor(t * 360)}, 100%, 60%)`;
    ctx.beginPath();
    const r = 30 + 40 * Math.sin(2 * Math.PI * (t + OMEGA));
    ctx.arc(size / 2, size / 2, r, 0, Math.PI * 2);
    ctx.stroke();
    enc.addFrame(ctx);
  }
  enc.finish();
  return file;
}
