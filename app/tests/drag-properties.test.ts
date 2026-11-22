import { test } from 'node:test';
import assert from 'node:assert/strict';
import { numericProperty } from '../../demos/grabbable-handle/src/numericProperty.ts';

test('dragging and resizing read UIKit signal values and preserve a zero scale', () => {
  assert.equal(numericProperty({ value: 3 }, 1), 3);
  assert.equal(numericProperty(0, 1), 0);
  assert.equal(numericProperty('50%', 1), 1);
  assert.equal(numericProperty(undefined, 1), 1);
  assert.equal(numericProperty({ value: NaN }, 1), 1);
});
