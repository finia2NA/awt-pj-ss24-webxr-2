import { test } from 'node:test';
import assert from 'node:assert/strict';
import { getDateISO, alterDateDays, formatTime } from '../src/utils/dateHelpers.tsx';
import { truncateText } from '../src/utils/textHelpers.tsx';

test('guide navigation crosses month boundaries without mutating the selected day', () => {
  const date = new Date(2024, 1, 28, 9, 5);
  const next = alterDateDays(date, 2);
  assert.equal(next.getMonth(), 2);
  assert.equal(next.getDate(), 1);
  assert.equal(date.getDate(), 28);
  assert.equal(alterDateDays(next, -2).getTime(), date.getTime());
});
test('guide dates and times are padded for display', () => {
  assert.equal(getDateISO(new Date('2024-02-29T23:00:00Z')), '2024-02-29');
  assert.equal(formatTime(new Date(2024, 0, 1, 9, 5)), '09:05');
});
test('channel labels truncate only beyond their limit', () => {
  assert.equal(truncateText('Channel', 7), 'Channel');
  assert.equal(truncateText('Channel HD', 7), 'Channel...');
  assert.equal(truncateText('', 7), '');
});
