import test from 'node:test';
import assert from 'node:assert/strict';
import {
  SAMPLE_BULK_CURRICULUM_JSON,
  createDefaultProfile,
  parseBulkCurriculumImport,
  parseProfileImport,
  serializeProfileExport,
} from './storage';

test('serializeProfileExport and parseProfileImport round-trip cleanly', () => {
  const profile = createDefaultProfile();
  profile.username = 'Tahmid';
  profile.xp = 450;
  profile.completedChapters = ['python-ch-1', 'c-ch-1'];
  profile.solvedProblems = ['cp-weird-collatz'];

  const json = serializeProfileExport(profile);
  const imported = parseProfileImport(json);
  assert.equal(imported.ok, true);
  if (imported.ok) {
    assert.equal(imported.profile.username, 'Tahmid');
    assert.equal(imported.profile.xp, 450);
    assert.deepEqual(imported.profile.completedChapters, ['python-ch-1', 'c-ch-1']);
  }
});

test('parseProfileImport rejects malformed JSON and invalid schemas', () => {
  const badJson = parseProfileImport('{not valid');
  assert.equal(badJson.ok, false);

  const missingFields = parseProfileImport(JSON.stringify({ username: '', xp: -5 }));
  assert.equal(missingFields.ok, false);
});

test('parseBulkCurriculumImport validates and hydrates chapters and problems cleanly', () => {
  const res = parseBulkCurriculumImport(SAMPLE_BULK_CURRICULUM_JSON);
  assert.equal(res.ok, true);
  if (res.ok) {
    assert.equal(res.payload.chapters.length, 1);
    assert.equal(res.payload.problems.length, 1);
    assert.equal(res.payload.chapters[0].id, 'python-ch-16');
    assert.equal(res.payload.chapters[0].practiceSheet.length, 1);
    assert.equal(res.payload.problems[0].id, 'interview-best-time-stock');
    assert.equal(res.payload.problems[0].companyTags[0], 'Amazon');
  }
});

test('parseBulkCurriculumImport rejects malformed JSON, empty payloads, and bad entries', () => {
  assert.equal(parseBulkCurriculumImport('{broken').ok, false);
  assert.equal(parseBulkCurriculumImport('[]').ok, false);
  assert.equal(parseBulkCurriculumImport(JSON.stringify({ chapters: [], problems: [] })).ok, false);
  assert.equal(
    parseBulkCurriculumImport(
      JSON.stringify({ chapters: [{ id: 'bad', languageId: 'cobol', number: 1, title: 'X' }] }),
    ).ok,
    false,
  );
  assert.equal(
    parseBulkCurriculumImport(JSON.stringify({ problems: [{ id: 'p1', title: '' }] })).ok,
    false,
  );
});
