// The checks in profile.ts must pass the real PROFILE.md and fail on each kind of mistake. Run: npm test
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { test } from 'node:test';
import { parseProfile } from './profile.ts';

const real = fs.readFileSync('PROFILE.md', 'utf8');

function broken(from: string, to: string): string {
  assert.ok(real.includes(from), `fixture text not found: ${from}`);
  return real.replace(from, to);
}

test('the real PROFILE.md passes every check', () => {
  const p = parseProfile(real);
  assert.ok(p.entries.length > 50);
  assert.ok(p.byId.get('damaged-barcodes')?.parts.length);
});

test('a measurement in the text that is not declared fails', () => {
  const bad = broken('using 95% less power. Accuracy went', 'using 95% less power and 3x faster. Accuracy went');
  assert.throws(() => parseProfile(bad), /drop-detection: measurements in the text that are not in numbers: 3x/);
});

test('a demo id that points nowhere fails', () => {
  const bad = broken('demo: which-hand', 'demo: which-hands');
  assert.throws(() => parseProfile(bad), /demo "which-hands" points nowhere/);
});

test('a checked number without its date fails', () => {
  const bad = broken(
    '    source: "https://rlalphalabs.com/notes/ideas-we-closed/"\n    as_of: 2026-10-27\n',
    '    source: "https://rlalphalabs.com/notes/ideas-we-closed/"\n',
  );
  assert.throws(() => parseProfile(bad), /checked number "closed" needs an https source and as_of/);
});

test('an unknown section fails', () => {
  const bad = broken('## Notes\n', '## Thoughts\n');
  assert.throws(() => parseProfile(bad), /unknown section "Thoughts"/);
});

test('an entry without its yaml block fails', () => {
  const bad = broken('### Daily Tracker\n```yaml\n', '### Daily Tracker\n\n');
  assert.throws(() => parseProfile(bad), /must be a ```yaml block|code fence \(```\) is never closed/);
});
