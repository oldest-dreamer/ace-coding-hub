import type {
  BulkCurriculumPayload,
  Chapter,
  CompiledLanguageId,
  LanguageId,
  Problem,
  UserProfile,
} from '../types/academy';

const STORAGE_KEY = 'argoncode_academy_profile_v1';
const CURRICULUM_STORAGE_KEY = 'argoncode_custom_curriculum_v1';
const IDB_DB_NAME = 'argoncode_academy_db';
const IDB_STORE_NAME = 'profiles';
const IDB_PROFILE_KEY = 'active_profile';
const IDB_CURRICULUM_KEY = 'custom_curriculum';

const VALID_LANGUAGES = new Set<LanguageId>([
  'c',
  'cpp',
  'python',
  'java',
  'javascript',
  'rust',
  'typescript',
  'html',
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

export function getTodayIsoDate(): string {
  return new Date().toISOString().slice(0, 10);
}

export function createDefaultProfile(): UserProfile {
  return {
    username: 'Guest Coder',
    avatarSeed: 'G',
    xp: 120,
    streakDays: 1,
    lastActiveDate: getTodayIsoDate(),
    contestRating: 1200,
    completedChapters: [],
    solvedProblems: [],
    bookmarks: [],
    preferredLanguage: 'python',
    theme: 'dark',
    targetGoal: 'Competitive Programming',
    cloudSync: {
      provider: 'local',
    },
  };
}

export function validateImportedProfile(raw: unknown): UserProfile | null {
  if (!raw || typeof raw !== 'object') return null;
  const obj = raw as Record<string, unknown>;
  if (typeof obj.username !== 'string' || obj.username.trim().length === 0) return null;
  if (typeof obj.xp !== 'number' || Number.isNaN(obj.xp) || obj.xp < 0) return null;
  if (!Array.isArray(obj.completedChapters) || !Array.isArray(obj.solvedProblems)) return null;

  const base = createDefaultProfile();
  return {
    ...base,
    username: obj.username.trim().slice(0, 32),
    avatarSeed: typeof obj.avatarSeed === 'string' && obj.avatarSeed ? obj.avatarSeed.slice(0, 2) : obj.username.trim()[0].toUpperCase(),
    xp: Math.floor(obj.xp),
    streakDays: typeof obj.streakDays === 'number' && obj.streakDays >= 1 ? Math.floor(obj.streakDays) : 1,
    lastActiveDate: typeof obj.lastActiveDate === 'string' ? obj.lastActiveDate : base.lastActiveDate,
    contestRating: typeof obj.contestRating === 'number' && obj.contestRating >= 400 ? Math.floor(obj.contestRating) : 1200,
    completedChapters: obj.completedChapters.filter((x): x is string => typeof x === 'string'),
    solvedProblems: obj.solvedProblems.filter((x): x is string => typeof x === 'string'),
    bookmarks: Array.isArray(obj.bookmarks)
      ? obj.bookmarks.filter((b): b is UserProfile['bookmarks'][number] => Boolean(b && typeof b === 'object' && typeof (b as { id?: unknown }).id === 'string'))
      : [],
    preferredLanguage: typeof obj.preferredLanguage === 'string'
      ? (obj.preferredLanguage as UserProfile['preferredLanguage'])
      : base.preferredLanguage,
    theme: obj.theme === 'light' ? 'light' : 'dark',
    email: typeof obj.email === 'string' ? obj.email : undefined,
    fullName: typeof obj.fullName === 'string' ? obj.fullName : undefined,
    targetGoal: typeof obj.targetGoal === 'string' ? (obj.targetGoal as UserProfile['targetGoal']) : base.targetGoal,
    isAdmin: typeof obj.isAdmin === 'boolean' ? obj.isAdmin : undefined,
    cloudSync: obj.cloudSync && typeof obj.cloudSync === 'object'
      ? (obj.cloudSync as UserProfile['cloudSync'])
      : base.cloudSync,
  };
}

export function serializeProfileExport(profile: UserProfile): string {
  return JSON.stringify(
    {
      schema: 'argoncode-academy-profile-v1',
      exportedAt: new Date().toISOString(),
      profile,
    },
    null,
    2,
  );
}

export function parseProfileImport(jsonText: string): { ok: true; profile: UserProfile } | { ok: false; error: string } {
  try {
    const parsed = JSON.parse(jsonText) as Record<string, unknown>;
    const candidate = parsed && typeof parsed === 'object' && 'profile' in parsed ? parsed.profile : parsed;
    const validated = validateImportedProfile(candidate);
    if (!validated) {
      return { ok: false, error: 'Invalid profile JSON schema. Missing username, XP, or progress arrays.' };
    }
    return { ok: true, profile: validated };
  } catch {
    return { ok: false, error: 'Malformed JSON file. Please select a valid Ace Coding Hub backup JSON.' };
  }
}

function openProfileDatabase(): Promise<IDBDatabase | null> {
  if (typeof indexedDB === 'undefined') return Promise.resolve(null);
  return new Promise((resolve) => {
    try {
      const req = indexedDB.open(IDB_DB_NAME, 1);
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains(IDB_STORE_NAME)) {
          db.createObjectStore(IDB_STORE_NAME);
        }
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
}

export async function saveProfileToLocalAndIdb(profile: UserProfile): Promise<void> {
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    }
  } catch {
    // Ignore storage quota issues gracefully
  }

  const db = await openProfileDatabase();
  if (!db) return;
  await new Promise<void>((resolve) => {
    try {
      const tx = db.transaction(IDB_STORE_NAME, 'readwrite');
      tx.objectStore(IDB_STORE_NAME).put(profile, IDB_PROFILE_KEY);
      tx.oncomplete = () => {
        db.close();
        resolve();
      };
      tx.onerror = () => {
        db.close();
        resolve();
      };
    } catch {
      db.close();
      resolve();
    }
  });
}

export async function loadProfileFromStorage(): Promise<UserProfile> {
  // Fast synchronous LocalStorage read first
  if (typeof localStorage !== 'undefined') {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const validated = validateImportedProfile(JSON.parse(raw));
        if (validated) return validated;
      }
    } catch {
      // Fall through to IndexedDB
    }
  }

  // Fallback / recovery from IndexedDB
  const db = await openProfileDatabase();
  if (db) {
    const idbProfile = await new Promise<UserProfile | null>((resolve) => {
      try {
        const tx = db.transaction(IDB_STORE_NAME, 'readonly');
        const req = tx.objectStore(IDB_STORE_NAME).get(IDB_PROFILE_KEY);
        req.onsuccess = () => {
          db.close();
          resolve(validateImportedProfile(req.result));
        };
        req.onerror = () => {
          db.close();
          resolve(null);
        };
      } catch {
        db.close();
        resolve(null);
      }
    });
    if (idbProfile) {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(idbProfile));
      }
      return idbProfile;
    }
  }

  return createDefaultProfile();
}

const SAVED_CODE_STORAGE_KEY = 'argoncode_saved_code_v1';

export function loadLocalSavedCodeMap(): Record<string, { code: string; language: string; updatedAt: string }> {
  if (typeof localStorage === 'undefined') return {};
  try {
    const raw = localStorage.getItem(SAVED_CODE_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {};
    const clean: Record<string, { code: string; language: string; updatedAt: string }> = {};
    for (const [k, v] of Object.entries(parsed)) {
      if (v && typeof v === 'object') {
        const entry = v as Record<string, unknown>;
        if (typeof entry.code === 'string' && typeof entry.language === 'string') {
          clean[k] = {
            code: entry.code,
            language: entry.language,
            updatedAt: typeof entry.updatedAt === 'string' ? entry.updatedAt : new Date().toISOString(),
          };
        }
      }
    }
    return clean;
  } catch {
    return {};
  }
}

export function saveLocalSavedCodeMap(
  map: Record<string, { code: string; language: string; updatedAt: string }>,
): void {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(SAVED_CODE_STORAGE_KEY, JSON.stringify(map));
  } catch {
    // Ignore storage quota issues gracefully
  }
}

/**
 * Pre-wired Cloud Sync Adapter Hooks for Firebase Auth ("Sign in with Google") or Supabase.
 * Ready to bind external SDK credentials without altering app state logic.
 */
export interface CloudSyncAdapter {
  provider: 'firebase' | 'supabase';
  isConfigured: () => boolean;
  signInWithGoogle: () => Promise<{ email: string; uid: string }>;
  pushProfile: (uid: string, profile: UserProfile) => Promise<void>;
  pullProfile: (uid: string) => Promise<UserProfile | null>;
}

export const CLOUD_SYNC_HOOKS: Record<'firebase' | 'supabase', CloudSyncAdapter> = {
  firebase: {
    provider: 'firebase',
    isConfigured: () => Boolean(import.meta?.env?.VITE_FIREBASE_API_KEY),
    signInWithGoogle: async () => {
      throw new Error('Add VITE_FIREBASE_API_KEY and VITE_FIREBASE_PROJECT_ID in environment variables to activate Google Sign-In.');
    },
    pushProfile: async () => {},
    pullProfile: async () => null,
  },
  supabase: {
    provider: 'supabase',
    isConfigured: () => Boolean(import.meta?.env?.VITE_SUPABASE_URL && import.meta?.env?.VITE_SUPABASE_ANON_KEY),
    signInWithGoogle: async () => {
      throw new Error('Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in environment variables to activate Supabase OAuth.');
    },
    pushProfile: async () => {},
    pullProfile: async () => null,
  },
};

function hydrateImportedChapter(raw: unknown): Chapter | null {
  if (!raw || typeof raw !== 'object') return null;
  const obj = raw as Record<string, unknown>;
  if (typeof obj.id !== 'string' || !obj.id.trim()) return null;
  if (typeof obj.languageId !== 'string' || !VALID_LANGUAGES.has(obj.languageId as LanguageId)) {
    return null;
  }
  if (typeof obj.number !== 'number' || obj.number < 1 || obj.number > 99) return null;
  if (typeof obj.title !== 'string' || !obj.title.trim()) return null;

  const langId = obj.languageId as LanguageId;
  const num = Math.floor(obj.number);
  const phase: 1 | 2 | 3 =
    obj.phase === 1 || obj.phase === 2 || obj.phase === 3
      ? obj.phase
      : num <= 5
        ? 1
        : num <= 10
          ? 2
          : 3;

  const subtitle =
    typeof obj.subtitle === 'string' && obj.subtitle.trim()
      ? obj.subtitle.trim()
      : 'Custom imported chapter lesson.';
  const banglaTitle =
    typeof obj.banglaTitle === 'string' && obj.banglaTitle.trim()
      ? obj.banglaTitle.trim()
      : `${obj.title.trim()} (বাংলা)`;
  const starterCode =
    typeof obj.starterCode === 'string' && obj.starterCode.trim()
      ? obj.starterCode
      : langId === 'python'
        ? 'print("Custom Chapter Ready")'
        : 'console.log("Custom Chapter Ready");';
  const sampleStdin = typeof obj.sampleStdin === 'string' ? obj.sampleStdin : '';
  const expectedSampleOutput =
    typeof obj.expectedSampleOutput === 'string'
      ? obj.expectedSampleOutput
      : 'Custom Chapter Ready';

  const rawZero = (obj.zeroIntuition && typeof obj.zeroIntuition === 'object'
    ? obj.zeroIntuition
    : {}) as Record<string, unknown>;
  const rawBanglaZero = (rawZero.banglaZeroToHero && typeof rawZero.banglaZeroToHero === 'object'
    ? rawZero.banglaZeroToHero
    : {}) as Record<string, unknown>;

  const rawVisual = (obj.visualMode && typeof obj.visualMode === 'object'
    ? obj.visualMode
    : {}) as Record<string, unknown>;
  const rawTextbook = (obj.textbookMode && typeof obj.textbookMode === 'object'
    ? obj.textbookMode
    : {}) as Record<string, unknown>;
  const rawSenior = (obj.seniorMode && typeof obj.seniorMode === 'object'
    ? obj.seniorMode
    : {}) as Record<string, unknown>;
  const rawBanglaExp = (obj.banglaExplanation && typeof obj.banglaExplanation === 'object'
    ? obj.banglaExplanation
    : {}) as Record<string, unknown>;
  const rawMini = (obj.miniBuild && typeof obj.miniBuild === 'object'
    ? obj.miniBuild
    : {}) as Record<string, unknown>;

  const asciiFlowchart =
    typeof rawZero.asciiFlowchart === 'string' && rawZero.asciiFlowchart.trim()
      ? rawZero.asciiFlowchart
      : '( START ) -> [ Read Input ] -> [ Process Logic ] -> [ Print Output ] -> ( STOP )';

  return {
    id: obj.id.trim(),
    languageId: langId,
    number: num,
    phase,
    isMilestoneMerger: Boolean(obj.isMilestoneMerger),
    isCapstone: Boolean(obj.isCapstone),
    title: obj.title.trim(),
    banglaTitle,
    subtitle,
    xpReward: typeof obj.xpReward === 'number' && obj.xpReward > 0 ? Math.floor(obj.xpReward) : 75,
    estimatedMinutes:
      typeof obj.estimatedMinutes === 'number' && obj.estimatedMinutes > 0
        ? Math.floor(obj.estimatedMinutes)
        : 20,
    zeroIntuition: {
      plainEnglishStory:
        typeof rawZero.plainEnglishStory === 'string' && rawZero.plainEnglishStory.trim()
          ? rawZero.plainEnglishStory
          : subtitle,
      asciiFlowchart,
      pseudocode: Array.isArray(rawZero.pseudocode)
        ? rawZero.pseudocode.filter((x): x is string => typeof x === 'string')
        : ['1. START', '2. READ input', '3. PROCESS logic', '4. PRINT output', '5. STOP'],
      banglaZeroToHero: {
        analogyTitle:
          typeof rawBanglaZero.analogyTitle === 'string' && rawBanglaZero.analogyTitle.trim()
            ? rawBanglaZero.analogyTitle
            : banglaTitle,
        explanation:
          typeof rawBanglaZero.explanation === 'string' && rawBanglaZero.explanation.trim()
            ? rawBanglaZero.explanation
            : `${banglaTitle} — কাস্টম ইমপোর্ট করা অধ্যায়।`,
        everydayExample:
          typeof rawBanglaZero.everydayExample === 'string' && rawBanglaZero.everydayExample.trim()
            ? rawBanglaZero.everydayExample
            : 'ধাপে ধাপে ইনপুট নিয়ে প্রসেস করে আউটপুট দেখাও।',
        keyTakeaways: Array.isArray(rawBanglaZero.keyTakeaways)
          ? rawBanglaZero.keyTakeaways.filter((x): x is string => typeof x === 'string')
          : ['ছোট ধাপ থেকে শুরু করে বড় লজিকে যাও।'],
      },
    },
    lineByLineAnatomy: Array.isArray(obj.lineByLineAnatomy)
      ? (obj.lineByLineAnatomy as Chapter['lineByLineAnatomy'])
      : [
          {
            lineNumber: 'Line 1',
            codeSnippet: starterCode.split('\n')[0] || '',
            whatItMeans: 'Core entry line for this imported chapter.',
            whyItIsThere: 'Initializes execution.',
            ifDeletedError: 'Output will be missing or syntax error will occur.',
          },
        ],
    harryBugTraps: Array.isArray(obj.harryBugTraps)
      ? (obj.harryBugTraps as Chapter['harryBugTraps'])
      : [
          {
            title: 'Edge Case Check',
            brokenCode: '// Missing edge-case guard',
            fixedCode: '// Validate empty or zero input before processing',
            whyItBreaks: 'Unhandled edge inputs cause Wrong Answer.',
          },
        ],
    practiceSheet: Array.isArray(obj.practiceSheet)
      ? (obj.practiceSheet as Chapter['practiceSheet'])
      : [
          {
            id: `${obj.id.trim()}-q1`,
            difficulty: 'Easy',
            title: 'Verify Starter Build',
            prompt: 'Run the starter code and match expected output.',
            banglaHint: 'কোডটি রান করে আউটপুট মিলিয়ে দেখো।',
            starterCode,
            sampleStdin,
            expectedOutput: expectedSampleOutput,
          },
        ],
    miniBuild: {
      title:
        typeof rawMini.title === 'string' && rawMini.title.trim()
          ? rawMini.title
          : `${obj.title.trim()} Mini Build`,
      description:
        typeof rawMini.description === 'string' && rawMini.description.trim()
          ? rawMini.description
          : subtitle,
      banglaGoal:
        typeof rawMini.banglaGoal === 'string' && rawMini.banglaGoal.trim()
          ? rawMini.banglaGoal
          : `${banglaTitle} প্র্যাকটিক্যাল মিনি প্রজেক্ট।`,
      combinesChapters:
        typeof rawMini.combinesChapters === 'string' && rawMini.combinesChapters.trim()
          ? rawMini.combinesChapters
          : `Ch 1–${num}`,
      starterCode:
        typeof rawMini.starterCode === 'string' && rawMini.starterCode.trim()
          ? rawMini.starterCode
          : starterCode,
      sampleStdin: typeof rawMini.sampleStdin === 'string' ? rawMini.sampleStdin : sampleStdin,
      expectedOutput:
        typeof rawMini.expectedOutput === 'string' ? rawMini.expectedOutput : expectedSampleOutput,
    },
    visualMode: {
      tldr: typeof rawVisual.tldr === 'string' ? rawVisual.tldr : subtitle,
      bullets: Array.isArray(rawVisual.bullets)
        ? rawVisual.bullets.filter((x): x is string => typeof x === 'string')
        : [subtitle],
      asciiDiagram:
        typeof rawVisual.asciiDiagram === 'string' ? rawVisual.asciiDiagram : asciiFlowchart,
      comparisonTable: Array.isArray(rawVisual.comparisonTable)
        ? (rawVisual.comparisonTable as Chapter['visualMode']['comparisonTable'])
        : [],
    },
    textbookMode: {
      ramCpuMechanism:
        typeof rawTextbook.ramCpuMechanism === 'string' ? rawTextbook.ramCpuMechanism : subtitle,
      deepDiveParagraphs: Array.isArray(rawTextbook.deepDiveParagraphs)
        ? rawTextbook.deepDiveParagraphs.filter((x): x is string => typeof x === 'string')
        : [subtitle],
      dryRunTable: Array.isArray(rawTextbook.dryRunTable)
        ? (rawTextbook.dryRunTable as Chapter['textbookMode']['dryRunTable'])
        : [
            {
              step: 1,
              state: 'Start',
              memoryOrStack: 'Init',
              note: 'Imported chapter dry run initialized.',
            },
          ],
    },
    seniorMode: {
      realWorldAnalogy:
        typeof rawSenior.realWorldAnalogy === 'string' ? rawSenior.realWorldAnalogy : subtitle,
      commonBugs: Array.isArray(rawSenior.commonBugs)
        ? (rawSenior.commonBugs as Chapter['seniorMode']['commonBugs'])
        : [],
      proTips: Array.isArray(rawSenior.proTips)
        ? rawSenior.proTips.filter((x): x is string => typeof x === 'string')
        : [],
    },
    banglaExplanation: {
      summary:
        typeof rawBanglaExp.summary === 'string' ? rawBanglaExp.summary : banglaTitle,
      intuitionPoints: Array.isArray(rawBanglaExp.intuitionPoints)
        ? rawBanglaExp.intuitionPoints.filter((x): x is string => typeof x === 'string')
        : [banglaTitle],
      memoryAnalogy:
        typeof rawBanglaExp.memoryAnalogy === 'string' ? rawBanglaExp.memoryAnalogy : banglaTitle,
    },
    starterCode,
    sampleStdin,
    expectedSampleOutput,
    testCases:
      Array.isArray(obj.testCases) && obj.testCases.length > 0
        ? (obj.testCases as Chapter['testCases'])
        : [{ id: `${obj.id.trim()}-t1`, input: sampleStdin, expectedOutput: expectedSampleOutput }],
  };
}

function hydrateImportedProblem(raw: unknown): Problem | null {
  if (!raw || typeof raw !== 'object') return null;
  const obj = raw as Record<string, unknown>;
  if (typeof obj.id !== 'string' || !obj.id.trim()) return null;
  if (typeof obj.title !== 'string' || !obj.title.trim()) return null;
  if (typeof obj.statement !== 'string' || !obj.statement.trim()) return null;

  const samples = Array.isArray(obj.samples)
    ? (obj.samples as Problem['samples'])
    : [{ id: `${obj.id.trim()}-s1`, input: '', expectedOutput: 'OK' }];

  const rawStarter = (obj.starterTemplates && typeof obj.starterTemplates === 'object'
    ? obj.starterTemplates
    : {}) as Partial<Record<CompiledLanguageId, string>>;
  const rawSolutions = (obj.solutions && typeof obj.solutions === 'object'
    ? obj.solutions
    : {}) as Partial<Record<CompiledLanguageId, string>>;

  const starterTemplates = {} as Record<CompiledLanguageId, string>;
  const solutions = {} as Record<CompiledLanguageId, string>;
  for (const lid of COMPILED_LANGS) {
    starterTemplates[lid] =
      typeof rawStarter[lid] === 'string' && rawStarter[lid]!.trim()
        ? rawStarter[lid]!
        : `// Write your ${lid} solution`;
    solutions[lid] =
      typeof rawSolutions[lid] === 'string' && rawSolutions[lid]!.trim()
        ? rawSolutions[lid]!
        : starterTemplates[lid];
  }

  const rawEditorial = (obj.editorial && typeof obj.editorial === 'object'
    ? obj.editorial
    : {}) as Record<string, unknown>;
  const rawApproaches = (obj.approaches && typeof obj.approaches === 'object'
    ? obj.approaches
    : {}) as Record<string, Record<string, unknown> | undefined>;

  const optimalSummary =
    typeof rawEditorial.optimalApproach === 'string' && rawEditorial.optimalApproach.trim()
      ? rawEditorial.optimalApproach
      : 'Apply optimal single-pass or O(log n) technique.';
  const banglaEditorial =
    typeof rawEditorial.banglaEditorial === 'string' && rawEditorial.banglaEditorial.trim()
      ? rawEditorial.banglaEditorial
      : `${obj.title.trim()} এর অপটিমাল সমাধান।`;

  return {
    id: obj.id.trim(),
    category: obj.category === 'cp' ? 'cp' : 'interview',
    sourceTag:
      typeof obj.sourceTag === 'string' && obj.sourceTag.trim()
        ? obj.sourceTag.trim()
        : 'Custom Import',
    companyTags: Array.isArray(obj.companyTags)
      ? obj.companyTags.filter((x): x is string => typeof x === 'string' && x.trim().length > 0)
      : ['Custom Sheet'],
    difficulty:
      obj.difficulty === 'Hard' || obj.difficulty === 'Medium' ? obj.difficulty : 'Easy',
    title: obj.title.trim(),
    banglaTitle:
      typeof obj.banglaTitle === 'string' && obj.banglaTitle.trim()
        ? obj.banglaTitle.trim()
        : `${obj.title.trim()} (বাংলা)`,
    xpReward: typeof obj.xpReward === 'number' && obj.xpReward > 0 ? Math.floor(obj.xpReward) : 120,
    timeLimitMs:
      typeof obj.timeLimitMs === 'number' && obj.timeLimitMs > 0 ? Math.floor(obj.timeLimitMs) : 1000,
    memoryLimitMb:
      typeof obj.memoryLimitMb === 'number' && obj.memoryLimitMb > 0
        ? Math.floor(obj.memoryLimitMb)
        : 256,
    statement: obj.statement.trim(),
    inputFormat:
      typeof obj.inputFormat === 'string' && obj.inputFormat.trim()
        ? obj.inputFormat.trim()
        : 'Standard input as specified in samples.',
    outputFormat:
      typeof obj.outputFormat === 'string' && obj.outputFormat.trim()
        ? obj.outputFormat.trim()
        : 'Exact expected output.',
    constraints: Array.isArray(obj.constraints)
      ? obj.constraints.filter((x): x is string => typeof x === 'string')
      : ['1 <= n <= 10^5'],
    samples,
    hiddenTests: Array.isArray(obj.hiddenTests) ? (obj.hiddenTests as Problem['hiddenTests']) : [],
    hints:
      Array.isArray(obj.hints) && obj.hints.length >= 3
        ? [String(obj.hints[0]), String(obj.hints[1]), String(obj.hints[2])]
        : [
            'Read constraints carefully to estimate required time complexity.',
            'Consider HashMap, Sorting, or Binary Search to drop O(n^2) to O(n) / O(n log n).',
            'Verify boundary cases before submitting.',
          ],
    approaches: {
      brute: {
        label: String(rawApproaches.brute?.label || 'Brute Force (First Thought)'),
        timeComplexity: String(rawApproaches.brute?.timeComplexity || 'O(n^2)'),
        spaceComplexity: String(rawApproaches.brute?.spaceComplexity || 'O(1)'),
        intuition: String(rawApproaches.brute?.intuition || 'Nested loop check over all candidates.'),
        banglaIntuition: String(rawApproaches.brute?.banglaIntuition || 'নেস্টেড লুপে সব সম্ভাবনা যাচাই করা।'),
        whyTleOrSuboptimal: String(
          rawApproaches.brute?.whyTleOrSuboptimal ||
            rawEditorial.bruteForceReason ||
            'Exceeds 10^8 ops/sec on large inputs (TLE).',
        ),
        pseudocode: String(rawApproaches.brute?.pseudocode || 'for i: for j: check(i, j)'),
      },
      better: {
        label: String(rawApproaches.better?.label || 'Better Approach (Sorting / Two-Pass)'),
        timeComplexity: String(rawApproaches.better?.timeComplexity || 'O(n log n)'),
        spaceComplexity: String(rawApproaches.better?.spaceComplexity || 'O(n)'),
        intuition: String(rawApproaches.better?.intuition || 'Sort or precompute auxiliary indices first.'),
        banglaIntuition: String(rawApproaches.better?.banglaIntuition || 'সর্টিং বা প্রি-কম্পিউটেশন ব্যবহার করে সময় কমানো।'),
        whyTleOrSuboptimal: String(
          rawApproaches.better?.whyTleOrSuboptimal || 'Passes limits, though extra O(log n) factor remains.',
        ),
        pseudocode: String(rawApproaches.better?.pseudocode || 'sort(input); scan with two pointers'),
      },
      optimal: {
        label: String(rawApproaches.optimal?.label || 'Optimal Approach (Interview Winner)'),
        timeComplexity: String(
          rawApproaches.optimal?.timeComplexity || rawEditorial.timeComplexity || 'O(n)',
        ),
        spaceComplexity: String(
          rawApproaches.optimal?.spaceComplexity || rawEditorial.spaceComplexity || 'O(n)',
        ),
        intuition: String(rawApproaches.optimal?.intuition || optimalSummary),
        banglaIntuition: String(rawApproaches.optimal?.banglaIntuition || banglaEditorial),
        whyTleOrSuboptimal: String(
          rawApproaches.optimal?.whyTleOrSuboptimal || 'Optimal runtime and clean memory footprint.',
        ),
        pseudocode: String(rawApproaches.optimal?.pseudocode || 'single-pass optimal scan'),
      },
    },
    editorial: {
      bruteForceReason: String(
        rawEditorial.bruteForceReason || 'Brute force nested loops hit TLE on n = 10^5.',
      ),
      optimalApproach: optimalSummary,
      timeComplexity: String(rawEditorial.timeComplexity || 'O(n)'),
      spaceComplexity: String(rawEditorial.spaceComplexity || 'O(n)'),
      dryRunSteps: Array.isArray(rawEditorial.dryRunSteps)
        ? (rawEditorial.dryRunSteps as Problem['editorial']['dryRunSteps'])
        : [{ step: 1, state: 'Sample Input', memoryOrStack: 'Init', note: 'Trace optimal state' }],
      banglaEditorial,
    },
    starterTemplates,
    solutions,
  };
}

export function parseBulkCurriculumImport(
  jsonText: string,
): { ok: true; payload: { chapters: Chapter[]; problems: Problem[] } } | { ok: false; error: string } {
  try {
    const parsed = JSON.parse(jsonText) as BulkCurriculumPayload | unknown;
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return {
        ok: false,
        error: 'Expected a JSON object with "chapters" and/or "problems" arrays.',
      };
    }

    const obj = parsed as Record<string, unknown>;
    const hasChaptersKey = 'chapters' in obj;
    const hasProblemsKey = 'problems' in obj;
    if (!hasChaptersKey && !hasProblemsKey) {
      return {
        ok: false,
        error: 'JSON must include a "chapters" array and/or a "problems" array.',
      };
    }

    const chapters: Chapter[] = [];
    if (Array.isArray(obj.chapters)) {
      for (const item of obj.chapters) {
        const hydrated = hydrateImportedChapter(item);
        if (!hydrated) {
          return {
            ok: false,
            error:
              'Invalid chapter entry. Each chapter requires id, languageId (c|cpp|python|java|javascript|rust|typescript|html), number, and title.',
          };
        }
        chapters.push(hydrated);
      }
    }

    const problems: Problem[] = [];
    if (Array.isArray(obj.problems)) {
      for (const item of obj.problems) {
        const hydrated = hydrateImportedProblem(item);
        if (!hydrated) {
          return {
            ok: false,
            error: 'Invalid problem entry. Each problem requires id, title, and statement.',
          };
        }
        problems.push(hydrated);
      }
    }

    if (chapters.length === 0 && problems.length === 0) {
      return {
        ok: false,
        error: 'No valid chapters or problems found inside the JSON payload.',
      };
    }

    return { ok: true, payload: { chapters, problems } };
  } catch {
    return {
      ok: false,
      error: 'Malformed JSON syntax. Verify brackets, quotes, and commas before importing.',
    };
  }
}

export async function saveCustomCurriculum(payload: {
  chapters: Chapter[];
  problems: Problem[];
}): Promise<void> {
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(CURRICULUM_STORAGE_KEY, JSON.stringify(payload));
    }
  } catch {
    // Ignore storage quota errors gracefully
  }

  const db = await openProfileDatabase();
  if (!db) return;
  await new Promise<void>((resolve) => {
    try {
      const tx = db.transaction(IDB_STORE_NAME, 'readwrite');
      tx.objectStore(IDB_STORE_NAME).put(payload, IDB_CURRICULUM_KEY);
      tx.oncomplete = () => {
        db.close();
        resolve();
      };
      tx.onerror = () => {
        db.close();
        resolve();
      };
    } catch {
      db.close();
      resolve();
    }
  });
}

export async function loadCustomCurriculum(): Promise<{ chapters: Chapter[]; problems: Problem[] }> {
  if (typeof localStorage !== 'undefined') {
    try {
      const raw = localStorage.getItem(CURRICULUM_STORAGE_KEY);
      if (raw) {
        const parsed = parseBulkCurriculumImport(raw);
        if (parsed.ok) return parsed.payload;
      }
    } catch {
      // Fall through to IndexedDB
    }
  }

  const db = await openProfileDatabase();
  if (db) {
    const idbPayload = await new Promise<{ chapters: Chapter[]; problems: Problem[] } | null>(
      (resolve) => {
        try {
          const tx = db.transaction(IDB_STORE_NAME, 'readonly');
          const req = tx.objectStore(IDB_STORE_NAME).get(IDB_CURRICULUM_KEY);
          req.onsuccess = () => {
            db.close();
            if (req.result && typeof req.result === 'object') {
              const parsed = parseBulkCurriculumImport(JSON.stringify(req.result));
              resolve(parsed.ok ? parsed.payload : null);
            } else {
              resolve(null);
            }
          };
          req.onerror = () => {
            db.close();
            resolve(null);
          };
        } catch {
          db.close();
          resolve(null);
        }
      },
    );
    if (idbPayload) return idbPayload;
  }

  return { chapters: [], problems: [] };
}

export async function clearCustomCurriculum(): Promise<void> {
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(CURRICULUM_STORAGE_KEY);
    }
  } catch {
    // Ignore
  }
  const db = await openProfileDatabase();
  if (!db) return;
  await new Promise<void>((resolve) => {
    try {
      const tx = db.transaction(IDB_STORE_NAME, 'readwrite');
      tx.objectStore(IDB_STORE_NAME).delete(IDB_CURRICULUM_KEY);
      tx.oncomplete = () => {
        db.close();
        resolve();
      };
      tx.onerror = () => {
        db.close();
        resolve();
      };
    } catch {
      db.close();
      resolve();
    }
  });
}

export const SAMPLE_BULK_CURRICULUM_JSON = JSON.stringify(
  {
    chapters: [
      {
        id: 'python-ch-16',
        languageId: 'python',
        number: 16,
        phase: 3,
        title: 'Python Bonus: Prefix Sums & Range Queries',
        banglaTitle: 'Python বোনাস: প্রিফিক্স সাম ও রেঞ্জ কুয়েরি',
        subtitle: 'Answer sum(L..R) queries in O(1) after an O(n) prefix build.',
        xpReward: 130,
        starterCode: 'a = [2, 4, 6, 8]\npref = [0]\nfor x in a:\n    pref.append(pref[-1] + x)\nprint(pref[3] - pref[1])',
        sampleStdin: '',
        expectedSampleOutput: '10',
      },
    ],
    problems: [
      {
        id: 'interview-best-time-stock',
        category: 'interview',
        sourceTag: 'FAANG Top 150 · Greedy',
        companyTags: ['Amazon', 'Google', 'Microsoft', 'Meta'],
        difficulty: 'Easy',
        title: 'Best Time to Buy and Sell Stock',
        banglaTitle: 'স্টক কেনা-বেচায় সর্বোচ্চ লাভ',
        xpReward: 115,
        statement: 'Given daily stock prices, compute the maximum profit from one buy followed by one sell on a later day.',
        inputFormat: 'First line: n. Second line: n space-separated integers.',
        outputFormat: 'Single integer: maximum profit (0 if none).',
        samples: [{ id: 'st-s1', input: '6\n7 1 5 3 6 4', expectedOutput: '5' }],
        starterTemplates: {
          python: 'import sys\ndata = list(map(int, sys.stdin.read().split()))\nprices = data[1:]\n# Print max profit\n',
        },
        solutions: {
          python: 'import sys\ndata = list(map(int, sys.stdin.read().split()))\nprices = data[1:]\nmin_p, best = 10**18, 0\nfor p in prices:\n    min_p = min(min_p, p)\n    best = max(best, p - min_p)\nprint(best)',
        },
      },
    ],
  },
  null,
  2,
);

