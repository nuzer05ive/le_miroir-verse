function describe(name, fn) {
  console.log(name);
  fn();
}
function it(name, fn) {
  try {
    fn();
    console.log('  \u2713', name);
  } catch (err) {
    console.error('  \u2717', name);
    console.error(err);
    process.exitCode = 1;
  }
}
function expect(val) {
  return {
    toBeCloseTo(exp, precision) {
      if (Math.abs(val - exp) > Math.pow(10, -precision)) {
        throw new Error(`Expected ${val} to be close to ${exp}`);
      }
    }
  };
}
import { calculateZCM } from '../src/lib-js/zcm.js';

describe('ZCM Tests', () => {
  it('calculates average as 0.122 for sample data', () => {
    const data = [0.1, 0.2, 0.066];
    const zcm = calculateZCM(data);
    expect(zcm).toBeCloseTo(0.122, 3);
  });
});
