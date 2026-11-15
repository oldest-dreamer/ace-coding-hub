import type {
  BookmarkNote,
  Chapter,
  CompiledLanguageId,
  ContentOverrideRecord,
  LanguageId,
  Problem,
  SavedCodeEntry,
  TargetGoal,
  UserProfile,
  UserProgressRow,
} from '../types/academy';

export interface CloudProfileRow {
  id: string;
  email?: string | null;
  username?: string | null;
  full_name?: string | null;
  target_goal?: string | null;
  avatar_seed?: string | null;
  preferred_language?: string | null;
  theme?: string | null;
  xp?: number | null;
  level?: number | null;
  streak_days?: number | null;
  contest_rating?: number | null;
  last_active_date?: string | null;
  is_admin?: boolean | null;
  updated_at?: string | null;
}

const VALID_GOALS = new Set<TargetGoal>([
  'Competitive Programming',
  'FAANG & Tech Interviews',
  'Full-Stack Mastery',
  'University CS Foundations',
]);

const COMPILED_LANGS: CompiledLanguageId[] = [
  'c',
  'cpp',
  'python',
  'java',
  'javascript',
  'typescript',
  'rust',
];

export function makeSavedCodeKey(itemId: string, language: string): string {
  return `${itemId}::${language}`;
}

export function mergeGuestAndCloudProfile(
  guest: UserProfile,
  cloudRow: CloudProfileRow | null,
  cloudProgressRows: UserProgressRow[],
  localCodeMap: Record<string, SavedCodeEntry>,
  authMeta?: { email?: string | null; isAdmin?: boolean },
): {
  mergedProfile: UserProfile;
  mergedCodeMap: Record<string, SavedCodeEntry>;
} {
  const completedSet = new Set<string>(guest.completedChapters);
  const solvedSet = new Set<string>(guest.solvedProblems);
  const bookmarkMap = new Map<string, BookmarkNote>();
  for (const bm of guest.bookmarks) {
    bookmarkMap.set(bm.targetId || bm.id, bm);
  }

  const mergedCodeMap: Record<string, SavedCodeEntry> = { ...localCodeMap };

  for (const row of cloudProgressRows) {
    if (row.item_type === 'chapter' && (row.status === 'completed' || row.status === 'solved')) {
      completedSet.add(row.item_id);
    } else if (row.item_type === 'problem' && (row.status === 'solved' || row.status === 'completed')) {
      solvedSet.add(row.item_id);
    } else if (row.item_type === 'bookmark' && row.metadata && typeof row.metadata === 'object') {
      const meta = row.metadata as Partial<BookmarkNote>;
      const targetId = typeof meta.targetId === 'string' ? meta.targetId : row.item_id.replace(/^bm-/, '');
      if (!bookmarkMap.has(targetId)) {
        bookmarkMap.set(targetId, {
          id: typeof meta.id === 'string' ? meta.id : `bm-${targetId}`,
          targetType: meta.targetType === 'problem' ? 'problem' : 'chapter',
          targetId,
          title: typeof meta.title === 'string' ? meta.title : targetId,
          languageId: typeof meta.languageId === 'string' ? (meta.languageId as LanguageId) : undefined,
          note: typeof meta.note === 'string' ? meta.note : '',
          createdAt: typeof meta.createdAt === 'string' ? meta.createdAt : row.updated_at,
        });
      }
    }

    if (typeof row.saved_code === 'string' && row.language) {
      const baseItemId = row.item_id.includes('::') ? row.item_id : makeSavedCodeKey(row.item_id, row.language);
      const existing = mergedCodeMap[baseItemId];
      const rowTime = Date.parse(row.updated_at) || 0;
      const existingTime = existing ? Date.parse(existing.updatedAt) || 0 : -1;
      if (!existing || rowTime >= existingTime) {
        mergedCodeMap[baseItemId] = {
          code: row.saved_code,
          language: row.language,
          updatedAt: row.updated_at || new Date().toISOString(),
        };
      }
    }
  }

  const cloudUsername = cloudRow?.username?.trim();
  const isDefaultGuest = !guest.username || guest.username === 'Guest Coder' || guest.username === 'Arjun';
  const resolvedUsername =
    cloudUsername && cloudUsername.length > 0
      ? cloudUsername.slice(0, 32)
      : !isDefaultGuest
        ? guest.username
        : (authMeta?.email?.split('@')[0] || 'Learner').slice(0, 32);

  const cloudGoal =
    cloudRow?.target_goal && VALID_GOALS.has(cloudRow.target_goal as TargetGoal)
      ? (cloudRow.target_goal as TargetGoal)
      : guest.targetGoal || 'Competitive Programming';

  const latestActiveDate =
    cloudRow?.last_active_date && cloudRow.last_active_date > guest.lastActiveDate
      ? cloudRow.last_active_date
      : guest.lastActiveDate;

  const resolvedEmail = cloudRow?.email ?? authMeta?.email ?? guest.email;
  const resolvedIsAdmin = Boolean(cloudRow?.is_admin || authMeta?.isAdmin || guest.isAdmin);

  const mergedProfile: UserProfile = {
    username: resolvedUsername,
    avatarSeed:
      (cloudRow?.avatar_seed && cloudRow.avatar_seed.slice(0, 2)) ||
      resolvedUsername[0]?.toUpperCase() ||
      'L',
    xp: Math.max(guest.xp, typeof cloudRow?.xp === 'number' ? cloudRow.xp : 0),
    streakDays: Math.max(guest.streakDays, typeof cloudRow?.streak_days === 'number' ? cloudRow.streak_days : 1),
    lastActiveDate: latestActiveDate,
    contestRating: Math.max(
      guest.contestRating,
      typeof cloudRow?.contest_rating === 'number' ? cloudRow.contest_rating : 1200,
    ),
    completedChapters: Array.from(completedSet),
    solvedProblems: Array.from(solvedSet),
    bookmarks: Array.from(bookmarkMap.values()),
    preferredLanguage: (cloudRow?.preferred_language as LanguageId) || guest.preferredLanguage,
    theme: cloudRow?.theme === 'light' || cloudRow?.theme === 'dark' ? cloudRow.theme : guest.theme,
    email: resolvedEmail ?? undefined,
    fullName: cloudRow?.full_name ?? guest.fullName,
    targetGoal: cloudGoal,
    isAdmin: resolvedIsAdmin,
    cloudSync: {
      provider: 'supabase',
      connectedEmail: resolvedEmail ?? undefined,
      lastSyncedAt: new Date().toISOString(),
    },
  };

  return { mergedProfile, mergedCodeMap };
}

export function applySingleChapterOverride(
  chapter: Chapter,
  override?: ContentOverrideRecord,
): Chapter {
  if (!override || override.target_type !== 'chapter') return chapter;
  const p = override.payload;
  const nextZero = { ...chapter.zeroIntuition };
  if (typeof p.plainEnglishStory === 'string') {
    nextZero.plainEnglishStory = p.plainEnglishStory;
  }
  if (typeof p.asciiFlowchart === 'string') {
    nextZero.asciiFlowchart = p.asciiFlowchart;
  }
  if (typeof p.banglaZeroExplanation === 'string') {
    nextZero.banglaZeroToHero = {
      ...nextZero.banglaZeroToHero,
      explanation: p.banglaZeroExplanation,
    };
  }

  const nextBanglaExp = { ...chapter.banglaExplanation };
  if (typeof p.banglaSummary === 'string') {
    nextBanglaExp.summary = p.banglaSummary;
  }

  return {
    ...chapter,
    title: typeof p.title === 'string' && p.title.trim() ? p.title : chapter.title,
    banglaTitle:
      typeof p.banglaTitle === 'string' && p.banglaTitle.trim() ? p.banglaTitle : chapter.banglaTitle,
    subtitle: typeof p.subtitle === 'string' && p.subtitle.trim() ? p.subtitle : chapter.subtitle,
    xpReward: typeof p.xpReward === 'number' && p.xpReward > 0 ? Math.floor(p.xpReward) : chapter.xpReward,
    starterCode: typeof p.starterCode === 'string' ? p.starterCode : chapter.starterCode,
    sampleStdin: typeof p.sampleStdin === 'string' ? p.sampleStdin : chapter.sampleStdin,
    expectedSampleOutput:
      typeof p.expectedSampleOutput === 'string' ? p.expectedSampleOutput : chapter.expectedSampleOutput,
    zeroIntuition: nextZero,
    banglaExplanation: nextBanglaExp,
  };
}

export function applyChapterOverrides(
  chapters: Chapter[],
  overrides: Record<string, ContentOverrideRecord>,
): Chapter[] {
  return chapters.map((ch) => applySingleChapterOverride(ch, overrides[ch.id]));
}

export function applySingleProblemOverride(
  problem: Problem,
  override?: ContentOverrideRecord,
): Problem {
  if (!override || (override.target_type !== 'problem' && override.target_type !== 'custom_problem')) {
    return problem;
  }
  const p = override.payload;
  const nextEditorial = { ...problem.editorial };
  if (typeof p.optimalApproach === 'string') {
    nextEditorial.optimalApproach = p.optimalApproach;
  }
  if (typeof p.banglaEditorial === 'string') {
    nextEditorial.banglaEditorial = p.banglaEditorial;
  }

  const nextApproaches = { ...problem.approaches };
  if (typeof p.optimalApproach === 'string' || typeof p.banglaEditorial === 'string') {
    nextApproaches.optimal = {
      ...nextApproaches.optimal,
      intuition:
        typeof p.optimalApproach === 'string' ? p.optimalApproach : nextApproaches.optimal.intuition,
      banglaIntuition:
        typeof p.banglaEditorial === 'string'
          ? p.banglaEditorial
          : nextApproaches.optimal.banglaIntuition,
    };
  }

  const nextStarters = { ...problem.starterTemplates };
  if (p.starterTemplates && typeof p.starterTemplates === 'object') {
    for (const lid of COMPILED_LANGS) {
      const val = (p.starterTemplates as Record<string, unknown>)[lid];
      if (typeof val === 'string') nextStarters[lid] = val;
    }
  }

  const nextSolutions = { ...problem.solutions };
  if (p.solutions && typeof p.solutions === 'object') {
    for (const lid of COMPILED_LANGS) {
      const val = (p.solutions as Record<string, unknown>)[lid];
      if (typeof val === 'string') nextSolutions[lid] = val;
    }
  }

  return {
    ...problem,
    title: typeof p.title === 'string' && p.title.trim() ? p.title : problem.title,
    banglaTitle:
      typeof p.banglaTitle === 'string' && p.banglaTitle.trim() ? p.banglaTitle : problem.banglaTitle,
    difficulty:
      p.difficulty === 'Easy' || p.difficulty === 'Medium' || p.difficulty === 'Hard'
        ? p.difficulty
        : problem.difficulty,
    xpReward: typeof p.xpReward === 'number' && p.xpReward > 0 ? Math.floor(p.xpReward) : problem.xpReward,
    statement: typeof p.statement === 'string' && p.statement.trim() ? p.statement : problem.statement,
    inputFormat:
      typeof p.inputFormat === 'string' && p.inputFormat.trim() ? p.inputFormat : problem.inputFormat,
    outputFormat:
      typeof p.outputFormat === 'string' && p.outputFormat.trim()
        ? p.outputFormat
        : problem.outputFormat,
    editorial: nextEditorial,
    approaches: nextApproaches,
    starterTemplates: nextStarters,
    solutions: nextSolutions,
  };
}

export function hydrateCustomProblemFromOverride(record: ContentOverrideRecord): Problem | null {
  if (record.target_type !== 'custom_problem') return null;
  const p = record.payload;
  if (typeof p.title !== 'string' || !p.title.trim()) return null;
  if (typeof p.statement !== 'string' || !p.statement.trim()) return null;

  const starterTemplates = {} as Record<CompiledLanguageId, string>;
  const solutions = {} as Record<CompiledLanguageId, string>;
  const rawStarter = (p.starterTemplates && typeof p.starterTemplates === 'object'
    ? p.starterTemplates
    : {}) as Record<string, unknown>;
  const rawSolutions = (p.solutions && typeof p.solutions === 'object'
    ? p.solutions
    : {}) as Record<string, unknown>;

  const fallbackPyStarter =
    typeof p.pythonStarter === 'string' && p.pythonStarter.trim()
      ? p.pythonStarter
      : 'import sys\ndata = sys.stdin.read().strip()\nprint(data)\n';
  const fallbackCppStarter =
    typeof p.cppStarter === 'string' && p.cppStarter.trim()
      ? p.cppStarter
      : '#include <iostream>\nusing namespace std;\nint main() {\n  return 0;\n}\n';

  for (const lid of COMPILED_LANGS) {
    const sVal = rawStarter[lid];
    starterTemplates[lid] =
      typeof sVal === 'string' && sVal.trim()
        ? sVal
        : lid === 'python'
          ? fallbackPyStarter
          : lid === 'cpp'
            ? fallbackCppStarter
            : `// Write your ${lid} solution`;

    const solVal = rawSolutions[lid];
    solutions[lid] = typeof solVal === 'string' && solVal.trim() ? solVal : starterTemplates[lid];
  }

  const sampleIn = typeof p.sampleInput === 'string' ? p.sampleInput : '';
  const sampleOut = typeof p.sampleOutput === 'string' ? p.sampleOutput : 'OK';
  const banglaEd =
    typeof p.banglaEditorial === 'string' && p.banglaEditorial.trim()
      ? p.banglaEditorial
      : `${p.title.trim()} সমস্যাটি ধাপে ধাপে বিশ্লেষণ করে অপটিমাল সময়ে সমাধান করো।`;

  const optimalSummary =
    typeof p.optimalApproach === 'string' && p.optimalApproach.trim()
      ? p.optimalApproach
      : 'Use an optimal linear scan or binary search strategy within constraints.';

  return {
    id: record.id,
    category: p.category === 'interview' ? 'interview' : 'cp',
    platform:
      p.platform === 'CodeChef' ||
      p.platform === 'LeetCode' ||
      p.platform === 'AtCoder' ||
      p.platform === 'FAANG'
        ? p.platform
        : 'Codeforces',
    topic: typeof p.topic === 'string' && p.topic.trim() ? p.topic.trim() : 'Custom Admin',
    sourceTag:
      typeof p.sourceTag === 'string' && p.sourceTag.trim()
        ? p.sourceTag.trim()
        : 'Admin Curated',
    companyTags: Array.isArray(p.companyTags)
      ? p.companyTags.filter((x): x is string => typeof x === 'string')
      : ['Ace Coding Hub Custom'],
    difficulty:
      p.difficulty === 'Medium' || p.difficulty === 'Hard' ? p.difficulty : 'Easy',
    title: p.title.trim(),
    banglaTitle:
      typeof p.banglaTitle === 'string' && p.banglaTitle.trim()
        ? p.banglaTitle.trim()
        : `${p.title.trim()} (বাংলা)`,
    xpReward: typeof p.xpReward === 'number' && p.xpReward > 0 ? Math.floor(p.xpReward) : 130,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
    statement: p.statement.trim(),
    inputFormat:
      typeof p.inputFormat === 'string' && p.inputFormat.trim()
        ? p.inputFormat.trim()
        : 'Standard input matching sample test cases.',
    outputFormat:
      typeof p.outputFormat === 'string' && p.outputFormat.trim()
        ? p.outputFormat.trim()
        : 'Print the exact expected output.',
    constraints: ['1 <= n <= 10^5'],
    samples: [{ id: `${record.id}-s1`, input: sampleIn, expectedOutput: sampleOut }],
    hiddenTests: Array.isArray(p.hiddenTests)
      ? (p.hiddenTests as Problem['hiddenTests'])
      : [{ id: `${record.id}-h1`, input: sampleIn, expectedOutput: sampleOut, isHidden: true }],
    hints: [
      'Trace the sample input carefully before coding.',
      'Aim for O(n) or O(n log n) time complexity.',
      'Check edge cases such as single-element or zero inputs.',
    ],
    approaches: {
      brute: {
        label: 'Brute Force',
        timeComplexity: 'O(n^2)',
        spaceComplexity: 'O(1)',
        intuition: 'Check all candidate combinations directly.',
        banglaIntuition: 'সব সম্ভাব্য জুটি যাচাই করে প্রথম সমাধান বের করা।',
        whyTleOrSuboptimal: 'May exceed time limit on large inputs.',
        pseudocode: 'for i: for j: check(i, j)',
      },
      better: {
        label: 'Sorted / Indexed Pass',
        timeComplexity: 'O(n log n)',
        spaceComplexity: 'O(n)',
        intuition: 'Sort or index data to avoid quadratic nested loops.',
        banglaIntuition: 'ডেটা সাজিয়ে বা ইনডেক্স করে সময় কমানো।',
        whyTleOrSuboptimal: 'Extra O(log n) factor when O(n) is achievable.',
        pseudocode: 'sort(arr); scan once',
      },
      optimal: {
        label: 'Optimal Approach',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
        intuition: optimalSummary,
        banglaIntuition: banglaEd,
        whyTleOrSuboptimal: 'Clean optimal runtime & memory.',
        pseudocode: 'optimal single pass',
      },
    },
    editorial: {
      bruteForceReason: 'Quadratic scan is too slow for n up to 10^5.',
      optimalApproach: optimalSummary,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      dryRunSteps: [
        { step: 1, state: 'Init', memoryOrStack: 'Empty state', note: 'Load sample input' },
        { step: 2, state: 'Process', memoryOrStack: 'Update accumulator', note: 'Scan input in one pass' },
        { step: 3, state: 'Result', memoryOrStack: 'Print output', note: 'Matches expected output' },
      ],
      banglaEditorial: banglaEd,
    },
    starterTemplates,
    solutions,
  };
}

export function extractCustomProblemsFromOverrides(
  overrides: Record<string, ContentOverrideRecord>,
): Problem[] {
  const list: Problem[] = [];
  for (const record of Object.values(overrides)) {
    const prob = hydrateCustomProblemFromOverride(record);
    if (prob) list.push(prob);
  }
  return list;
}

export function applyProblemOverrides(
  problems: Problem[],
  overrides: Record<string, ContentOverrideRecord>,
): Problem[] {
  return problems.map((prob) => applySingleProblemOverride(prob, overrides[prob.id]));
}
