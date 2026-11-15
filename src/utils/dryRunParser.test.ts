import test from 'node:test';
import assert from 'node:assert/strict';
import { parseDryRunFrames } from './dryRunParser';

test('parseDryRunFrames extracts key-value variables and tracks changes across steps', () => {
  const frames = parseDryRunFrames([
    { step: 1, state: 'Process starts', memoryOrStack: 'stdin buffer loaded', note: 'OS binds fd 0' },
    { step: 2, state: 'Read name & score', memoryOrStack: 'name="Argon", n=42', note: 'Tokenizer skips whitespace' },
    { step: 3, state: 'Update score', memoryOrStack: 'name="Argon", n=84', note: 'Doubled n' },
  ]);

  assert.equal(frames.length, 3);
  assert.equal(frames[0].variables[0].name, 'memory');
  assert.equal(frames[0].variables[0].changed, true);

  assert.deepEqual(
    frames[1].variables.map((v) => [v.name, v.value, v.changed]),
    [
      ['name', '"Argon"', true],
      ['n', '42', true],
    ],
  );

  // Step 3: name stayed "Argon" (changed: false), n changed from 42 -> 84 (changed: true)
  assert.deepEqual(
    frames[2].variables.map((v) => [v.name, v.value, v.changed]),
    [
      ['name', '"Argon"', false],
      ['n', '84', true],
    ],
  );
});

test('parseDryRunFrames extracts array cells and stack frames', () => {
  const frames = parseDryRunFrames([
    { step: 1, state: 'gcd(12, 18)', memoryOrStack: 'frame #1, arr=[10, 20, 30]', note: 'recurse' },
    { step: 2, state: 'Loop i=1..5', memoryOrStack: 'acc=1,3,6,10,15', note: 'linear pass' },
  ]);

  assert.deepEqual(frames[0].arrayCells, ['10', '20', '30']);
  assert.ok(frames[0].stackFrames.includes('frame #1'));
  assert.ok(frames[0].stackFrames.includes('gcd(12, 18)'));
  assert.deepEqual(frames[1].arrayCells, ['1', '3', '6', '10', '15']);
});
