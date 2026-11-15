export type LanguageId =
  | 'c'
  | 'cpp'
  | 'python'
  | 'java'
  | 'javascript'
  | 'rust'
  | 'typescript'
  | 'html';

export type CompiledLanguageId = Exclude<LanguageId, 'html'>;

export type MainView =
  | 'lobby'
  | 'studio'
  | 'cp-arena'
  | 'interview'
  | 'contest-projects'
  | 'architecture';

export type StudyMode = 'visual' | 'textbook' | 'senior';

export type ContestSubMode = 'cp' | 'interview' | 'virtual';

export type JudgeVerdict = 'AC' | 'WA' | 'RE' | 'CE' | 'TLE';

export type SolutionTier = 'brute' | 'better' | 'optimal';

export interface LanguageMeta {
  id: LanguageId;
  name: string;
  shortLabel: string;
  extension: string;
  accentHex: string;
  badgeText: string;
  paradigm: string;
  pistonLanguage: string;
  pistonVersion: string;
  runnableInPiston: boolean;
  tagline: string;
  banglaTagline: string;
  cheatSheetQuickRef: { label: string; syntax: string }[];
}

export interface TestCase {
  id: string;
  input: string;
  expectedOutput: string;
  isHidden?: boolean;
  explanation?: string;
}

export interface DryRunRow {
  step: number;
  state: string;
  memoryOrStack: string;
  note: string;
}

export interface LineAnatomyRow {
  lineNumber: string;
  codeSnippet: string;
  whatItMeans: string;
  whyItIsThere: string;
  ifDeletedError: string;
}

export interface BugTrapItem {
  title: string;
  brokenCode: string;
  fixedCode: string;
  whyItBreaks: string;
}

export interface PracticeQuestion {
  id: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  title: string;
  prompt: string;
  banglaHint: string;
  starterCode: string;
  sampleStdin: string;
  expectedOutput: string;
}

export interface MiniHandsOnBuild {
  title: string;
  description: string;
  banglaGoal: string;
  combinesChapters: string;
  starterCode: string;
  sampleStdin: string;
  expectedOutput: string;
}

export interface CodeExampleVariant {
  id: string;
  tier: 'Basic' | 'Edge-Case' | 'Optimized' | 'CP Trick';
  title: string;
  banglaNote: string;
  code: string;
  stdin: string;
  expectedOutput: string;
}

export interface ChapterSubTopic {
  id: string;
  title: string;
  badge: string;
  englishParagraphs: string[];
  banglaParagraphs: string[];
  memoryDiagram: string;
  code: string;
  stdin: string;
  expectedOutput: string;
  lineByLine: LineAnatomyRow[];
}

export interface Chapter {
  id: string; // e.g., "python-ch-1"
  languageId: LanguageId;
  number: number; // 1..25
  phase: 1 | 2 | 3 | 4 | 5;
  isMilestoneMerger?: boolean;
  isCapstone?: boolean;
  title: string;
  banglaTitle: string;
  subtitle: string;
  xpReward: number;
  estimatedMinutes: number;
  // Section 1: Absolute Zero Intuition & Flowchart (Apna College Style)
  zeroIntuition: {
    plainEnglishStory: string;
    asciiFlowchart: string;
    pseudocode: string[];
    banglaZeroToHero: {
      analogyTitle: string;
      explanation: string;
      everydayExample: string;
      keyTakeaways: string[];
    };
  };
  // Deep Multi-Topic Sub-Lessons (4–6 rich sub-topics per chapter, each with dedicated runnable example)
  topics?: ChapterSubTopic[];
  // Optional 4-Variant Runnable Examples (Basic, Edge-Case, Optimized, CP Trick)
  codeExamples?: CodeExampleVariant[];
  // Section 2: Line-by-Line Code Breakdown (CodeWithHarry Style)
  lineByLineAnatomy: LineAnatomyRow[];
  // Section 4: Harry Bhai's Common Bugs & TLE Traps
  harryBugTraps: BugTrapItem[];
  // Section 5: Chapter Practice Sheet (5 Graded Questions: 2 Easy, 2 Medium, 1 Hard)
  practiceSheet: PracticeQuestion[];
  // Section 6: Mini Hands-On Build
  miniBuild: MiniHandsOnBuild;
  // Tri-Mode Study views & Cheat Sheet support
  visualMode: {
    tldr: string;
    bullets: string[];
    asciiDiagram: string;
    comparisonTable: { concept: string; syntax: string; note: string }[];
  };
  textbookMode: {
    ramCpuMechanism: string;
    deepDiveParagraphs: string[];
    dryRunTable: DryRunRow[];
  };
  seniorMode: {
    realWorldAnalogy: string;
    commonBugs: { bug: string; fix: string }[];
    proTips: string[];
  };
  banglaExplanation: {
    summary: string;
    intuitionPoints: string[];
    memoryAnalogy: string;
  };
  starterCode: string;
  sampleStdin: string;
  expectedSampleOutput: string;
  testCases: TestCase[];
}

export interface ApproachTierDetail {
  label: string;
  timeComplexity: string;
  spaceComplexity: string;
  intuition: string;
  banglaIntuition: string;
  whyTleOrSuboptimal: string;
  pseudocode: string;
  sampleCode?: string;
}

export interface Problem {
  id: string;
  category: 'cp' | 'interview';
  platform?:
    | 'Codeforces'
    | 'CodeChef'
    | 'CSES'
    | 'FAANG'
    | 'LeetCode'
    | 'AtCoder'
    | 'Google OA'
    | 'System Design';
  topic?: string;
  rating?: number;
  starTier?: '1★' | '2★' | '3★' | '4★' | '5★';
  patterns?: string[];
  systemRequirements?: string[];
  architectureOverview?: string;
  sourceTag: string;
  companyTags: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  title: string;
  banglaTitle: string;
  xpReward: number;
  timeLimitMs: number;
  memoryLimitMb: number;
  statement: string;
  inputFormat: string;
  outputFormat: string;
  constraints: string[];
  samples: TestCase[];
  hiddenTests: TestCase[];
  hints: [string, string, string];
  approaches: {
    brute: ApproachTierDetail;
    better: ApproachTierDetail;
    optimal: ApproachTierDetail;
  };
  editorial: {
    bruteForceReason: string;
    optimalApproach: string;
    timeComplexity: string;
    spaceComplexity: string;
    dryRunSteps: DryRunRow[];
    banglaEditorial: string;
  };
  starterTemplates: Record<CompiledLanguageId, string>;
  solutions: Record<CompiledLanguageId, string>;
}

export interface ContestRoundProblem {
  slot: 'A' | 'B' | 'C' | 'D' | 'E';
  points: number;
  problem: Problem;
}

export interface ContestRound {
  id: string;
  number: number;
  title: string;
  banglaTitle: string;
  platform: 'Codeforces Div. 2' | 'Codeforces Div. 3' | 'AtCoder ABC' | 'AtCoder ARC' | 'Google OA';
  difficultyBand: 'Beginner' | 'Intermediate' | 'Advanced' | 'Grandmaster';
  durationMinutes: number;
  penaltyPerWrongMinutes: number;
  description: string;
  problems: ContestRoundProblem[];
}

export interface SystemChallenge {
  id: string;
  number: number;
  domain: string;
  title: string;
  banglaTitle: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  xpReward: number;
  systemRequirements: string[];
  architectureOverview: string;
  problem: Problem;
}

export interface BookmarkNote {
  id: string;
  targetType: 'chapter' | 'problem';
  targetId: string;
  title: string;
  languageId?: LanguageId;
  note: string;
  createdAt: string;
}

export type TargetGoal =
  | 'Competitive Programming'
  | 'FAANG & Tech Interviews'
  | 'Full-Stack Mastery'
  | 'University CS Foundations';

export interface UserProfile {
  username: string;
  avatarSeed: string;
  xp: number;
  streakDays: number;
  lastActiveDate: string; // YYYY-MM-DD
  contestRating: number;
  completedChapters: string[];
  solvedProblems: string[];
  bookmarks: BookmarkNote[];
  preferredLanguage: LanguageId;
  theme: 'dark' | 'light';
  email?: string;
  fullName?: string;
  targetGoal?: TargetGoal;
  isAdmin?: boolean;
  cloudSync: {
    provider: 'local' | 'firebase' | 'supabase';
    connectedEmail?: string;
    lastSyncedAt?: string;
  };
}

export interface UserProgressRow {
  user_id: string;
  item_id: string;
  item_type: 'chapter' | 'problem' | 'bookmark' | 'code';
  status: string;
  saved_code: string | null;
  language: string | null;
  metadata?: Record<string, unknown> | null;
  updated_at: string;
}

export type ContentOverrideTargetType = 'chapter' | 'problem' | 'custom_problem';

export interface ContentOverrideRecord {
  id: string;
  target_type: ContentOverrideTargetType;
  payload: Record<string, unknown>;
  updated_by?: string | null;
  updated_at: string;
}

export interface SavedCodeEntry {
  code: string;
  language: string;
  updatedAt: string;
}

export interface BulkCurriculumPayload {
  chapters?: Chapter[];
  problems?: Problem[];
}

export interface ExecutionResult {
  stdout: string;
  stderr: string;
  exitCode: number;
  runtimeMs: number;
  source: 'piston' | 'local-js' | 'html-preview' | 'offline-sim';
  compileError?: string;
}

export interface JudgeTestOutcome {
  testId: string;
  passed: boolean;
  isHidden: boolean;
  input: string;
  expectedOutput: string;
  actualOutput: string;
  verdict: JudgeVerdict;
  runtimeMs: number;
}

export interface JudgeSubmissionReport {
  verdict: JudgeVerdict;
  passedCount: number;
  totalCount: number;
  outcomes: JudgeTestOutcome[];
  totalRuntimeMs: number;
  source: ExecutionResult['source'];
}
