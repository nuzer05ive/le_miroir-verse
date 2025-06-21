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
import { routeTasksFromIPEARL } from '../src/lib-js/taskRouter.js';

describe('Task Router', () => {
  it('creates tasks with correct zcmThreshold for R=1', () => {
    const sCore = {
      meta: {
        id: 'test',
        format_manifest: [{ type: 'pdf', target: 'doc.pdf' }],
        bloomWeight: 0.618,
        recursion_depth: 1,
        entropy_cleared_bits: 0,
        harmonic_vector: [1, 0, 0]
      }
    };
    const tasks = routeTasksFromIPEARL(sCore);
    expect(tasks[0].zcmThreshold).toBeCloseTo(0.1 + 0.05 * (1 - Math.exp(-1)), 3);
  });
});
