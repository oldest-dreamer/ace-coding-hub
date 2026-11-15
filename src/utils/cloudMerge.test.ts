import test from 'node:test';
import assert from 'node:assert/strict';
import { getChaptersByLanguage } from '../data/syllabusBlueprint';
import { PROBLEMS } from '../data/problems';
import { createDefaultProfile } from './storage';
import {
  applyChapterOverrides,
  applySingleProblemOverride,
  hydrateCustomProblemFromOverride,
  makeSavedCodeKey,
  mergeGuestAndCloudProfile,
} from './cloudMerge';

test('mergeGuestAndCloudProfile unions chapters, problems, bookmarks, and takes max XP/rating', () => {
  const guest = createDefaultProfile();
  guest.username = 'Guest Coder';
  guest.xp = 250;
  guest.contestRating = 1280;
  guest.streakDays = 2;
  guest.completedChapters = ['python-ch-1'];
  guest.solvedProblems = ['cp-weird-collatz'];
  guest.bookmarks = [
    {
      id: 'bm-python-ch-1',
      targetType: 'chapter',
      targetId: 'python-ch-1',
      title: 'Python Ch 1',
      languageId: 'python',
      note: 'Basics',
      createdAt: '2026-01-01T00:00:00Z',
    },
  ];

  const { mergedProfile, mergedCodeMap } = mergeGuestAndCloudProfile(
    guest,
    {
      id: 'user-1',
      email: 'sciencesaru30@gmail.com',
      username: 'SaruAdmin',
      xp: 480,
      contest_rating: 1240,
      streak_days: 5,
      is_admin: true,
    },
    [
      {
        user_id: 'user-1',
        item_id: 'c-ch-1',
        item_type: 'chapter',
        status: 'completed',
        saved_code: null,
        language: null,
        updated_at: '2026-01-02T00:00:00Z',
      },
      {
        user_id: 'user-1',
        item_id: 'python-ch-1::python',
        item_type: 'code',
        status: 'in_progress',
        saved_code: 'print("Cloud Code")',
        language: 'python',
        updated_at: '2026-01-03T00:00:00Z',
      },
    ],
    {
      [makeSavedCodeKey('c-ch-1', 'c')]: {
        code: 'int main() { return 0; }',
        language: 'c',
        updatedAt: '2026-01-02T00:00:00Z',
      },
    },
  );

  assert.equal(mergedProfile.username, 'SaruAdmin');
  assert.equal(mergedProfile.isAdmin, true);
  assert.equal(mergedProfile.xp, 480);
  assert.equal(mergedProfile.contestRating, 1280);
  assert.equal(mergedProfile.streakDays, 5);
  assert.deepEqual(mergedProfile.completedChapters.sort(), ['c-ch-1', 'python-ch-1']);
  assert.deepEqual(mergedProfile.solvedProblems, ['cp-weird-collatz']);
  assert.equal(mergedCodeMap['python-ch-1::python'].code, 'print("Cloud Code")');
  assert.equal(mergedCodeMap['c-ch-1::c'].code, 'int main() { return 0; }');
});

test('applyChapterOverrides and hydrateCustomProblemFromOverride patch content cleanly', () => {
  const pythonChapters = getChaptersByLanguage('python');
  const first = pythonChapters[0];
  const patchedList = applyChapterOverrides(pythonChapters, {
    [first.id]: {
      id: first.id,
      target_type: 'chapter',
      payload: {
        title: 'Custom Admin Title',
        banglaSummary: 'অ্যাডমিন আপডেটেড বাংলা সারসংক্ষেপ',
      },
      updated_at: '2026-01-05T00:00:00Z',
    },
  });

  assert.equal(patchedList[0].title, 'Custom Admin Title');
  assert.equal(patchedList[0].banglaExplanation.summary, 'অ্যাডমিন আপডেটেড বাংলা সারসংক্ষেপ');
  assert.equal(patchedList[1].title, pythonChapters[1].title);

  const patchedProb = applySingleProblemOverride(PROBLEMS[0], {
    id: PROBLEMS[0].id,
    target_type: 'problem',
    payload: {
      banglaTitle: 'আপডেটেড বাংলা টাইটেল',
    },
    updated_at: '2026-01-05T00:00:00Z',
  });
  assert.equal(patchedProb.banglaTitle, 'আপডেটেড বাংলা টাইটেল');

  const customProb = hydrateCustomProblemFromOverride({
    id: 'custom-cp-sum',
    target_type: 'custom_problem',
    payload: {
      category: 'cp',
      title: 'Two Sum Special',
      statement: 'Print a + b',
      sampleInput: '3 4',
      sampleOutput: '7',
    },
    updated_at: '2026-01-05T00:00:00Z',
  });
  assert.ok(customProb);
  assert.equal(customProb.title, 'Two Sum Special');
  assert.equal(customProb.samples[0].expectedOutput, '7');
});
