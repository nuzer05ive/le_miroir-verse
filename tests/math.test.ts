import { glyphIndex } from '../src/lib/math/constants';
import assert from 'node:assert/strict';

describe('glyphIndex()', () => {
  it('is stable and cyclical', () => {
    assert.equal(glyphIndex(1), glyphIndex(21));
  });
});
