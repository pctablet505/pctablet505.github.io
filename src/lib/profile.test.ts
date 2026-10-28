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
  const bad = broken('saving over 95% of the power. Accuracy went', 'saving over 95% of the power and 3x faster. Accuracy went');
  assert.throws(() => parseProfile(bad), /drop-detection: measurements in the text that are not in numbers: 3x/);
});

test('a demo id that points nowhere fails', () => {
  const bad = broken('demo: which-hand', 'demo: which-hands');
  assert.throws(() => parseProfile(bad), /demo "which-hands" points nowhere/);
});

test('a checked number without its date fails', () => {
  const bad = broken(
    '    source: "https://rlalphalabs.com/notes/ideas-we-closed/"\n    as_of: 2026-10-28\n',
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

test('a closed list that disagrees with its count fails', () => {
  const bad = broken('    - {idea: "Intraday chart-pattern setups", why: "costs and taxes"}\n', '');
  assert.throws(() => parseProfile(bad), /rl-alpha-labs: number "closed" says 12\+, but closed lists 11 ideas/);
});

test('a closed floor below the list passes, and an exact count must match', () => {
  assert.doesNotThrow(() => parseProfile(broken('value: "12+"', 'value: "10+"')));
  assert.throws(() => parseProfile(broken('value: "12+"', 'value: "13"')), /says 13, but closed lists 12 ideas/);
});

test('a growth line without a numeric rate fails', () => {
  const bad = broken('{label: "NIFTY 500 index fund", rate: 11.67}', '{label: "NIFTY 500 index fund", rate: "11.67%"}');
  assert.throws(() => parseProfile(bad), /rl-alpha-labs: chart growth needs/);
});

test('a report chart without alt text fails', () => {
  const bad = broken('{file: jax.png, alt: "Keras on JAX, eager and under jax.jit, 32-token generation at every commit"}', '{file: jax.png}');
  assert.throws(() => parseProfile(bad), /keras-pytorch-speed: report charts need a file and an alt text each/);
});

test('a fifth focus label fails', () => {
  const bad = broken('focus: [LLM inference, Computer vision, On-device AI, Automated trading]', 'focus: [LLM inference, Computer vision, On-device AI, Automated trading, Profiling]');
  assert.throws(() => parseProfile(bad), /Identity: focus takes at most four labels/);
});

test('an About link to a work page that does not exist fails', () => {
  const bad = broken('[Porchlamp](/work/porchlamp/)', '[Porchlamp](/work/porch-lamp/)');
  assert.throws(() => parseProfile(bad), /About: link \/work\/porch-lamp\/ points nowhere/);
});
