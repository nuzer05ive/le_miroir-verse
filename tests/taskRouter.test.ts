import { describe, it, expect } from 'vitest';
import { routeTasksFromIPEARL } from '../src/lib/taskRouter';

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
