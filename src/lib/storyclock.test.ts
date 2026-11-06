// The stepped figure's play rules: each test is a reader's path that once went wrong. Run: npm test
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { barDelay, frozen, go, running, see, start, toggle } from './storyclock.ts';

const stages = [{ ms: 6500 }, { ms: 7000 }, { ms: 7000 }];

test('with reduced motion, the first step shows once the figure is on screen', () => {
  let c = start(6500, true);
  assert.equal(frozen(c), true); // off screen at load
  c = see(c, true, 0);
  assert.equal(frozen(c), false);
  assert.equal(running(c), false); // it never plays by itself
});

test('a step resumed after a pause carries on where it stopped', () => {
  let c = see(start(6500, false), true, 0);
  c = toggle(c, 2600); // pause after 2.6 s
  assert.equal(c.left, 3900);
  c = toggle(c, 500); // play again; the paused time is not spent
  assert.equal(c.left, 3900);
  assert.equal(barDelay(c, 6500), -2600);
});

test('a step taken while paused plays through, even after scrolling away and back', () => {
  let c = see(start(6500, false), true, 0);
  c = toggle(c, 500); // pause
  assert.equal(frozen(c), true);
  c = go(c, c.i + 1, stages); // step by hand
  assert.equal(frozen(c), false);
  c = see(c, false, 100); // scroll away while it draws
  assert.equal(frozen(c), true);
  c = see(c, true, 0); // and back
  assert.equal(frozen(c), false);
  assert.equal(running(c), false); // still paused: no step of its own
});

test('a pause holds the drawing, off screen and back', () => {
  let c = see(start(6500, false), true, 0);
  c = toggle(c, 1000);
  c = see(c, false, 0);
  c = see(c, true, 0);
  assert.equal(frozen(c), true);
});

test('time off screen is not spent, and the steps wrap around', () => {
  let c = see(start(6500, false), true, 0);
  c = see(c, false, 1000);
  c = see(c, true, 99999);
  assert.equal(c.left, 5500);
  assert.equal(go(c, -1, stages).i, 2);
  assert.equal(go(c, 3, stages).i, 0);
});
