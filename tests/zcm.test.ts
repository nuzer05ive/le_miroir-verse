import { describe, it, expect } from 'vitest';
import { calculateZCM } from '../src/lib/zcm';

describe('ZCM Tests', () => {
  it('calculates average as 0.122 for sample data', () => {
    const data = [0.1, 0.2, 0.066];
    const zcm = calculateZCM(data);
    expect(zcm).toBeCloseTo(0.122, 3);
  });
});
