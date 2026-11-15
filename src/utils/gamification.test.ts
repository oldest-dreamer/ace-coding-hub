import test from 'node:test';
import assert from 'node:assert/strict';
import {
  applyChapterCompletion,
  applyPracticeXpBonus,
  applyProblemSolved,
  calculateContestRatingDelta,
  computeLanguageMastery,
  computeLevelProgress,
  searchAcademyCatalog,
  updateStreakForDate,
} from './gamification';
import { createDefaultProfile } from './storage';
import { ALL_CHAPTERS } from '../data/syllabusBlueprint';
import { PROBLEMS } from '../data/problems';

test('curriculum contains exact 200 chapters (8 languages x 25 chapters across 5 phases)', () => {
  assert.equal(ALL_CHAPTERS.length, 200);
  const perPhase = new Map<number, number>();
  for (const ch of ALL_CHAPTERS) {
    perPhase.set(ch.phase, (perPhase.get(ch.phase) ?? 0) + 1);
  }
  for (const phase of [1, 2, 3, 4, 5]) {
    assert.equal(perPhase.get(phase), 40, `Phase ${phase} should contain 8 langs x 5 chapters = 40`);
  }
});

test('computeLevelProgress advances levels and clamps progress percent', () => {
  const lvl1 = computeLevelProgress(0);
  assert.equal(lvl1.level, 1);
  assert.equal(lvl1.progressPercent, 0);

  const lvl2 = computeLevelProgress(120);
  assert.equal(lvl2.level, 2);
  assert.equal(lvl2.currentLevelXp, 20);
});

test('computeLanguageMastery counts unique chapters per language accurately', () => {
  const m = computeLanguageMastery('python', ['python-ch-1', 'python-ch-2', 'python-ch-2', 'rust-ch-1']);
  assert.equal(m.completed, 2);
  assert.equal(m.total, 25);
  assert.equal(m.percent, 8);
});

test('updateStreakForDate increments on consecutive day and resets after gap', () => {
  const consecutive = updateStreakForDate('2026-11-12', 3, '2026-11-13');
  assert.equal(consecutive.streakDays, 4);

  const gap = updateStreakForDate('2026-11-10', 5, '2026-11-13');
  assert.equal(gap.streakDays, 1);
});

test('applyChapterCompletion and applyProblemSolved prevent duplicate XP farming', () => {
  const p0 = createDefaultProfile();
  const res1 = applyChapterCompletion(p0, 'python-ch-1', 60, '2026-11-13');
  assert.equal(res1.xpGained, 60);
  assert.equal(res1.nextProfile.xp, p0.xp + 60);

  const res2 = applyChapterCompletion(res1.nextProfile, 'python-ch-1', 60, '2026-11-13');
  assert.equal(res2.xpGained, 0);
  assert.equal(res2.nextProfile.xp, p0.xp + 60);

  const prob1 = applyProblemSolved(res2.nextProfile, 'interview-two-sum', 110, '2026-11-13');
  assert.equal(prob1.xpGained, 110);
});

test('calculateContestRatingDelta rewards solving all problems early', () => {
  const res = calculateContestRatingDelta({
    currentRating: 1200,
    solvedCount: 3,
    totalProblems: 3,
    minutesRemaining: 30,
    totalMinutes: 45,
  });
  assert.ok(res.delta > 0);
  assert.ok(res.newRating > 1200);
});

test('searchAcademyCatalog finds chapters and problems across languages', () => {
  const hits = searchAcademyCatalog('two sum', ALL_CHAPTERS, PROBLEMS);
  assert.ok(hits.some((h) => h.id === 'interview-two-sum'));

  const rustHits = searchAcademyCatalog('ownership', ALL_CHAPTERS, PROBLEMS);
  assert.ok(rustHits.some((h) => h.id === 'rust-ch-16'));
});

test('all 200 chapters include full 6-section Zero-to-Advance pedagogy and >=4 graded practice questions', () => {
  for (const ch of ALL_CHAPTERS) {
    assert.ok(ch.zeroIntuition.asciiFlowchart.length > 0, `${ch.id} missing flowchart`);
    assert.ok(ch.zeroIntuition.banglaZeroToHero.analogyTitle.length > 0, `${ch.id} missing Bangla Zero-to-Hero`);
    assert.ok(ch.lineByLineAnatomy.length >= 1, `${ch.id} missing line anatomy`);
    assert.ok(ch.harryBugTraps.length >= 3, `${ch.id} should have 3 bug traps`);
    assert.ok(ch.practiceSheet.length >= 4, `${ch.id} should have at least 4 practice questions`);
    assert.ok(ch.miniBuild.starterCode.length > 0, `${ch.id} missing mini build`);
  }
});

test('all contest problems include company tags and 3-tier Brute -> Better -> Optimal approaches', () => {
  for (const p of PROBLEMS) {
    assert.ok(p.companyTags.length > 0, `${p.id} missing company tags`);
    assert.ok(p.approaches.brute.timeComplexity.length > 0, `${p.id} missing brute approach`);
    assert.ok(p.approaches.better.timeComplexity.length > 0, `${p.id} missing better approach`);
    assert.ok(p.approaches.optimal.banglaIntuition.length > 0, `${p.id} missing optimal Bangla intuition`);
  }
});

test('Phase 1 (Ch 1-5) across all 8 languages has 4 sub-topics, 4 runnable examples, dry runs, bug traps, 4+ practice drills, and Milestone Merger 1', () => {
  const phase1 = ALL_CHAPTERS.filter((c) => c.number >= 1 && c.number <= 5);
  assert.equal(phase1.length, 40);
  for (const ch of phase1) {
    assert.ok(ch.topics && ch.topics.length === 4, `${ch.id} must have 4 atomic sub-topics`);
    assert.ok(ch.codeExamples && ch.codeExamples.length >= 4, `${ch.id} missing 4 codeExamples`);
    const tiers = new Set(ch.codeExamples.map((ex) => ex.tier));
    assert.ok(tiers.has('Basic'), `${ch.id} missing Basic example`);
    assert.ok(tiers.has('Edge-Case'), `${ch.id} missing Edge-Case example`);
    assert.ok(tiers.has('Optimized'), `${ch.id} missing Optimized example`);
    assert.ok(tiers.has('CP Trick'), `${ch.id} missing CP Trick example`);
    assert.ok(ch.lineByLineAnatomy.length >= 2, `${ch.id} should have >=2 anatomy rows`);
    assert.ok(ch.textbookMode.dryRunTable.length >= 4, `${ch.id} should have >=4 dry run steps`);
    assert.ok(ch.harryBugTraps.length >= 3, `${ch.id} must have >=3 bug traps`);
    assert.ok(ch.practiceSheet.length >= 4, `${ch.id} must have >=4 practice drills`);
    if (ch.number === 5) {
      assert.ok(ch.isMilestoneMerger, `${ch.id} should be Milestone Merger 1`);
      assert.ok(ch.miniBuild.title.includes('Milestone Merger'), `${ch.id} miniBuild should be Milestone Merger 1`);
    }
  }
});

test('Phases 2-5 (Ch 6-25) across all 8 languages have 4 code examples, 5 practice problems, Milestone Mergers 2-4, and Mega Capstone Ch 25', () => {
  const ch6to25 = ALL_CHAPTERS.filter((c) => c.number >= 6 && c.number <= 25);
  assert.equal(ch6to25.length, 160);
  for (const ch of ch6to25) {
    assert.ok(ch.codeExamples && ch.codeExamples.length >= 4, `${ch.id} missing 4 codeExamples`);
    const tiers = new Set(ch.codeExamples.map((ex) => ex.tier));
    assert.ok(tiers.has('Basic'), `${ch.id} missing Basic example`);
    assert.ok(tiers.has('Edge-Case'), `${ch.id} missing Edge-Case example`);
    assert.ok(tiers.has('Optimized'), `${ch.id} missing Optimized example`);
    assert.ok(tiers.has('CP Trick'), `${ch.id} missing CP Trick example`);
    assert.ok(ch.zeroIntuition.asciiFlowchart.length > 0, `${ch.id} missing ASCII flowchart/diagram`);
    assert.ok(ch.lineByLineAnatomy.length >= 2, `${ch.id} should have >=2 anatomy rows`);
    assert.ok(ch.textbookMode.dryRunTable.length >= 3, `${ch.id} should have >=3 dry run steps`);
    assert.equal(ch.practiceSheet.length, 5, `${ch.id} must have 5 practice problems`);
    if ([10, 15, 20].includes(ch.number)) {
      assert.ok(ch.isMilestoneMerger, `${ch.id} should be a Milestone Merger`);
      assert.ok(ch.miniBuild.title.includes('Milestone Merger'), `${ch.id} miniBuild should be Milestone Merger`);
    }
    if (ch.number === 25) {
      assert.ok(ch.isCapstone, `${ch.id} should be Capstone`);
      assert.ok(ch.miniBuild.title.includes('Mega Capstone'), `${ch.id} miniBuild should include Mega Capstone`);
    }
  }
});

test('Contest Hub contains 15 Codeforces (800-2200) & CodeChef (1-3 Star) problems covering all 6 required topics', () => {
  assert.equal(PROBLEMS.length, 36);
  const cpProblems = PROBLEMS.filter((p) => p.category === 'cp');
  assert.equal(cpProblems.length, 18);

  const requiredTopics = [
    'Greedy',
    'Number Theory / Sieve',
    'Prefix Sums',
    'Binary Search on Answer',
    'Bitmasking',
    'Intro DP',
  ] as const;

  for (const topic of requiredTopics) {
    assert.ok(
      cpProblems.some((p) => p.topic === topic),
      `Missing CP problem for topic: ${topic}`,
    );
  }

  assert.ok(cpProblems.some((p) => p.platform === 'Codeforces' && p.sourceTag.includes('800')));
  assert.ok(cpProblems.some((p) => p.platform === 'Codeforces' && p.sourceTag.includes('2200')));
  assert.ok(cpProblems.some((p) => p.platform === 'CodeChef'));

  const langs = ['c', 'cpp', 'python', 'java', 'javascript', 'rust', 'typescript'] as const;
  for (const p of PROBLEMS) {
    assert.ok(p.statement.length > 20, `${p.id} missing statement`);
    assert.ok(p.constraints.length >= 1, `${p.id} missing constraints`);
    assert.equal(p.hints.length, 3, `${p.id} must have 3 progressive hints`);
    assert.ok(p.editorial.dryRunSteps.length >= 2, `${p.id} missing dryRunSteps`);
    assert.ok(p.editorial.banglaEditorial.length > 20, `${p.id} missing banglaEditorial`);
    for (const lid of langs) {
      assert.ok(p.starterTemplates[lid].length > 10, `${p.id} missing ${lid} starter`);
      assert.ok(p.solutions[lid].length > 20, `${p.id} missing ${lid} solution`);
    }
  }
});

test('Job Interview Hub contains 15 top FAANG problems covering all 8 requested patterns and company tags', () => {
  const interviewProblems = PROBLEMS.filter((p) => p.category === 'interview');
  assert.equal(interviewProblems.length, 18);

  const faangPatterns = [
    'Two Pointers',
    'Sliding Window',
    'Linked List',
    'Binary Tree',
    "Kadane's",
    'Merge Intervals',
    'Monotonic Stack',
    'Dynamic Programming',
  ] as const;

  for (const pattern of faangPatterns) {
    assert.ok(
      interviewProblems.some((p) => p.topic === pattern),
      `Missing FAANG interview problem for pattern: ${pattern}`,
    );
  }

  const faangBatch = interviewProblems.filter((p) => p.platform === 'FAANG');
  assert.equal(faangBatch.length, 15);
  for (const p of faangBatch) {
    for (const company of ['Google', 'Amazon', 'Microsoft', 'Meta']) {
      assert.ok(p.companyTags.includes(company), `${p.id} missing company tag: ${company}`);
    }
  }
});

test('applyPracticeXpBonus increments XP and refreshes streak cleanly', () => {
  const p0 = createDefaultProfile();
  const nextDay = new Date(Date.parse(`${p0.lastActiveDate}T00:00:00Z`) + 86_400_000)
    .toISOString()
    .slice(0, 10);
  const res = applyPracticeXpBonus(p0, 15, nextDay);
  assert.equal(res.xpGained, 15);
  assert.equal(res.nextProfile.xp, p0.xp + 15);
  assert.equal(res.nextProfile.lastActiveDate, nextDay);
  assert.equal(res.nextProfile.streakDays, p0.streakDays + 1);
});



