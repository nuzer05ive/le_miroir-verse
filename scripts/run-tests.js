import fs from 'fs';
import path from 'path';

const dir = new URL('../tests-js', import.meta.url);
for (const file of fs.readdirSync(dir)) {
  if (file.endsWith('.js')) {
    await import(path.join(dir.pathname, file));
  }
}
