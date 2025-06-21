import { writeGlyph } from './glyphGen';
import { writeAvatar } from './avatarGen';
import { writePulse } from './gifGen';

function run() {
  for (let i = 1; i <= 3; i++) {
    writeGlyph(i);
    writePulse(`pulse-${i}`);
  }
  writeAvatar('default', [0.1, 0.2, 0.3]);
}

run();
