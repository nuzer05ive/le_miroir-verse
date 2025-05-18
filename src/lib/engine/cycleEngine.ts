import { PHI } from '../math/phi';
import { tauZcm } from '../zcm';
import { launchKiss } from '../kiss03.boot';

let zcmNow = () => 0.15; // stub
function buildNextSurface(k: number) {
  // placeholder: do something each cycle
  console.log('Building next surface for cycle', k);
}

function nextCycleTicks(k: number): number {
  // from spec: 3·φ^43 + 0.0437·k
  return 3 * Math.pow(PHI, 43) + 0.0437 * k;
}

export function runAutoCycle(seedDepth = 7) {
  let k = 1;
  let time = 0;

  const loop = () => {
    const dt = nextCycleTicks(k);
    time += dt;
    const R = seedDepth + k;
    // example bloom function
    const bloom = 1 - Math.exp(-Math.pow(PHI, R) * time / 43);
    const gate = tauZcm(R);

    if (bloom >= 0.99 && zcmNow() >= gate) {
      // openPortal? etc.
      console.log('Portal opening at cycle =', k, 'time =', time);
      launchKiss(time);
    } else {
      buildNextSurface(k);
    }

    k += 1;
    setTimeout(loop, dt);
  };

  loop();
}
