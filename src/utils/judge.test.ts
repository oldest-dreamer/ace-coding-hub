import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildPistonPayload,
  evaluateTestVerdict,
  executeJavaScriptLocally,
  normalizeOutput,
  simulateOfflineExecution,
  stripBasicTypeScript,
} from './judge';
import { PROBLEMS } from '../data/problems';

test('normalizeOutput strips trailing spaces and normalizes CRLF', () => {
  assert.equal(normalizeOutput('hello   \r\nworld  \n'), 'hello\nworld');
});

test('buildPistonPayload configures Java Main.java filename properly', () => {
  const javaPayload = buildPistonPayload('java', 'class Main {}', '10');
  assert.equal(javaPayload.files[0].name, 'Main.java');
  assert.equal(javaPayload.language, 'java');
});

test('executeJavaScriptLocally executes JS with custom stdin', () => {
  const code = `const line = readAllStdin().trim(); console.log(Number(line) * 2);`;
  const res = executeJavaScriptLocally(code, '21');
  assert.equal(res.exitCode, 0);
  assert.equal(normalizeOutput(res.stdout), '42');
});

test('evaluateTestVerdict returns AC, WA, RE, CE, and TLE accurately', () => {
  assert.equal(
    evaluateTestVerdict({ stdout: '42\n', stderr: '', exitCode: 0, runtimeMs: 12, source: 'piston' }, '42'),
    'AC',
  );
  assert.equal(
    evaluateTestVerdict({ stdout: '41', stderr: '', exitCode: 0, runtimeMs: 12, source: 'piston' }, '42'),
    'WA',
  );
  assert.equal(
    evaluateTestVerdict({ stdout: '', stderr: 'Segfault', exitCode: 139, runtimeMs: 12, source: 'piston' }, '42'),
    'RE',
  );
  assert.equal(
    evaluateTestVerdict({ stdout: '', stderr: 'err', exitCode: 1, runtimeMs: 12, source: 'piston', compileError: 'syntax' }, '42'),
    'CE',
  );
  assert.equal(
    evaluateTestVerdict({ stdout: '42', stderr: '', exitCode: 0, runtimeMs: 5000, source: 'piston' }, '42', 1000),
    'TLE',
  );
});

test('simulateOfflineExecution flags mismatched braces in C++', () => {
  const res = simulateOfflineExecution('cpp', 'int main() { return 0;', '');
  assert.equal(res.exitCode, 1);
  assert.ok(res.compileError);
});

test('simulateOfflineExecution rejects incomplete solution stubs', () => {
  const stub = `import sys\nn = int(sys.stdin.read())\n# Write your solution\n`;
  const res = simulateOfflineExecution('python', stub, '3', '3 10 5 16 8 4 2 1');
  assert.notEqual(res.stdout, '3 10 5 16 8 4 2 1');
});

test('simulateOfflineExecution executes basic TypeScript in local sandbox', () => {
  const tsCode = `import * as fs from 'fs';\nconst [a, b]: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);\nconsole.log(a + b);`;
  const res = simulateOfflineExecution('typescript', tsCode, '15 27');
  assert.equal(res.exitCode, 0);
  assert.equal(normalizeOutput(res.stdout), '42');
});

test('all 36 Contest & Interview Hub JS and TS reference solutions pass every sample and hidden test case', () => {
  assert.equal(PROBLEMS.length, 36);
  for (const p of PROBLEMS) {
    const cases = [...p.samples, ...p.hiddenTests];
    assert.ok(cases.length >= 2, `${p.id} should have sample and hidden cases`);
    for (const tc of cases) {
      const jsExec = executeJavaScriptLocally(p.solutions.javascript, tc.input);
      assert.equal(jsExec.exitCode, 0, `${p.id} JS runtime error on ${tc.id}: ${jsExec.stderr}`);
      assert.equal(
        normalizeOutput(jsExec.stdout),
        normalizeOutput(tc.expectedOutput),
        `${p.id} JS WA on ${tc.id}`,
      );

      const tsExec = executeJavaScriptLocally(stripBasicTypeScript(p.solutions.typescript), tc.input);
      assert.equal(tsExec.exitCode, 0, `${p.id} TS runtime error on ${tc.id}: ${tsExec.stderr}`);
      assert.equal(
        normalizeOutput(tsExec.stdout),
        normalizeOutput(tc.expectedOutput),
        `${p.id} TS WA on ${tc.id}`,
      );
    }
  }
});

