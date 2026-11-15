import assert from 'node:assert/strict';
import test from 'node:test';
import { PROBLEMS } from '../data/problems';
import { ALL_CHAPTERS } from '../data/syllabusBlueprint';
import { extractProblemRating, matchesCpRatingBand, resolveChapterTopics } from './chapterTopics';

import { executeJavaScriptLocally, normalizeOutput, stripBasicTypeScript } from './judge';

test('every single one of the 200 chapters resolves to 4–6 complete sub-topics', () => {
  assert.equal(ALL_CHAPTERS.length, 200);

  for (const ch of ALL_CHAPTERS) {
    const topics = resolveChapterTopics(ch);
    assert.ok(
      topics.length >= 4 && topics.length <= 6,
      `${ch.id} resolved to ${topics.length} sub-topics (expected 4..6)`,
    );

    for (const sub of topics) {
      assert.ok(sub.title.trim().length > 0, `${ch.id} sub-topic missing title`);
      assert.ok(sub.badge.trim().length > 0, `${ch.id} sub-topic missing badge`);
      assert.ok(sub.englishParagraphs.length >= 1, `${ch.id} sub-topic missing English explanation`);
      assert.ok(sub.banglaParagraphs.length >= 1, `${ch.id} sub-topic missing Bangla explanation`);
      assert.ok(sub.code.trim().length > 0, `${ch.id} sub-topic missing runnable code`);
      assert.ok(sub.lineByLine.length >= 1, `${ch.id} sub-topic missing lineByLine breakdown`);
    }
  }
});

test('all JavaScript and TypeScript chapter sub-topics & starters execute cleanly in local sandbox', () => {
  const jsTsChapters = ALL_CHAPTERS.filter(
    (c) => c.languageId === 'javascript' || c.languageId === 'typescript',
  );
  assert.equal(jsTsChapters.length, 50);

  for (const ch of jsTsChapters) {
    const starter = ch.languageId === 'typescript' ? stripBasicTypeScript(ch.starterCode) : ch.starterCode;
    const starterRes = executeJavaScriptLocally(starter, ch.sampleStdin);
    assert.equal(starterRes.exitCode, 0, `${ch.id} starter runtime error: ${starterRes.stderr}`);
    assert.equal(
      normalizeOutput(starterRes.stdout),
      normalizeOutput(ch.expectedSampleOutput),
      `${ch.id} starter stdout mismatch`,
    );

    if (ch.number <= 5) {
      for (const sub of resolveChapterTopics(ch)) {
        const runnable = ch.languageId === 'typescript' ? stripBasicTypeScript(sub.code) : sub.code;
        const res = executeJavaScriptLocally(runnable, sub.stdin);
        assert.equal(res.exitCode, 0, `${sub.id} runtime error: ${res.stderr}`);
        assert.equal(
          normalizeOutput(res.stdout),
          normalizeOutput(sub.expectedOutput),
          `${sub.id} stdout mismatch`,
        );
      }
    }
  }
});

test('CP problems extract valid numeric ratings and match rating bands', () => {
  const cpProblems = PROBLEMS.filter((p) => p.category === 'cp');
  assert.ok(cpProblems.length >= 15);

  for (const prob of cpProblems) {
    const rating = extractProblemRating(prob);
    assert.ok(rating !== null && rating >= 800, `${prob.id} missing valid rating`);
  }

  const band800 = cpProblems.filter((p) => matchesCpRatingBand(p, '800-1000'));
  const band1100 = cpProblems.filter((p) => matchesCpRatingBand(p, '1100-1300'));
  const band1400 = cpProblems.filter((p) => matchesCpRatingBand(p, '1400-1500'));
  const band1600 = cpProblems.filter((p) => matchesCpRatingBand(p, '1600+'));

  assert.ok(band800.length > 0, 'Expected 800-1000 CP problems');
  assert.ok(band1100.length > 0, 'Expected 1100-1300 CP problems');
  assert.ok(band1400.length > 0, 'Expected 1400-1500 CP problems');
  assert.ok(band1600.length > 0, 'Expected 1600+ CP problems');
});
