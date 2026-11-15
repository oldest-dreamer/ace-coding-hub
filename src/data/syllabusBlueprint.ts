import type {
  BugTrapItem,
  Chapter,
  CodeExampleVariant,
  LanguageId,
  LineAnatomyRow,
  MiniHandsOnBuild,
  PracticeQuestion,
} from '../types/academy';
import type { AtomicLessonOverride } from './atomicLessonTypes';
import { CHAPTER_TOPICS, LANGUAGE_DOMAIN_FLAVOR, type TopicTemplate } from './chapterTemplates';
import type { DeepChapterContent } from './deepChapter1';
import { DEEP_CHAPTER_4 } from './deepChapter4';
import { DEEP_CHAPTER_5 } from './deepChapter5';
import { DEEP_CHAPTER_6 } from './deepChapter6';
import { DEEP_CHAPTER_7 } from './deepChapter7';
import { DEEP_CHAPTER_8 } from './deepChapter8';
import { DEEP_CHAPTER_9 } from './deepChapter9';
import { DEEP_CHAPTER_12 } from './deepChapter12';
import { DEEP_CHAPTER_13 } from './deepChapter13';
import { DEEP_CHAPTER_15 } from './deepChapter15';
import type { ChapterRunnableSpec } from './languageCodeSamples';
import { LANGUAGES } from './languages';
import { LESSONS_C } from './lessons_c';
import { LESSONS_CPP } from './lessons_cpp';
import { LESSONS_HTML } from './lessons_html';
import { LESSONS_JAVA } from './lessons_java';
import { LESSONS_JS } from './lessons_js';
import { LESSONS_PYTHON } from './lessons_python';
import { LESSONS_RUST } from './lessons_rust';
import { LESSONS_TS } from './lessons_ts';
import { CHAPTER_SPECS_25 } from './syllabusSpecs25';

const LESSONS_BY_LANG: Record<LanguageId, Record<number, AtomicLessonOverride>> = {
  c: LESSONS_C,
  cpp: LESSONS_CPP,
  python: LESSONS_PYTHON,
  java: LESSONS_JAVA,
  javascript: LESSONS_JS,
  rust: LESSONS_RUST,
  typescript: LESSONS_TS,
  html: LESSONS_HTML,
};

const LANGUAGE_CH16_TITLE: Record<LanguageId, { en: string; bn: string }> = {
  c: { en: 'Raw Pointers, Addresses & Pointer Arithmetic', bn: 'র-পয়েন্টার, মেমোরি ঠিকানা ও পয়েন্টার অ্যারিথমেটিক' },
  cpp: { en: 'References, Pointers & RAII Handles', bn: 'রেফারেন্স, পয়েন্টার ও RAII হ্যান্ডলিং' },
  python: { en: 'Object References, Mutability & Aliasing', bn: 'অবজেক্ট রেফারেন্স, মিউটেবিলিটি ও অ্যালিয়াসিং' },
  java: { en: 'JVM Object References & Pass-by-Value', bn: 'JVM অবজেক্ট রেফারেন্স ও পাস-বাই-ভ্যালু' },
  javascript: { en: 'Browser DOM Tree, Object References & Events', bn: 'ব্রাউজার DOM ট্রি, অবজেক্ট রেফারেন্স ও ইভেন্ট' },
  rust: { en: 'Ownership, Borrowing & The Borrow Checker', bn: 'ওনারশিপ, বরোয়িং ও বরো চেকার' },
  typescript: { en: 'Typed References, Readonly & Type Narrowing', bn: 'টাইপড রেফারেন্স, রিডঅনলি ও টাইপ ন্যারোয়িং' },
  html: { en: 'DOM Hierarchy, Semantic Nodes & Events', bn: 'DOM হায়ারার্কি, সিমান্টিক নোড ও ইভেন্ট হ্যান্ডলিং' },
};

const LANGUAGE_CH20_TITLE: Record<LanguageId, { en: string; bn: string }> = {
  c: { en: 'C Standard Library (stdlib, string.h, qsort) — Merger 4', bn: 'C স্ট্যান্ডার্ড লাইব্রেরি (stdlib, qsort — মার্জার ৪)' },
  cpp: { en: 'Generics/Templates & C++ STL (vector, map, set, sort) — Merger 4', bn: 'টেমপ্লেট ও C++ STL (vector, map, set — মার্জার ৪)' },
  python: { en: 'Type Hints & Python Collections (Counter, defaultdict, deque) — Merger 4', bn: 'টাইপ হিন্ট ও Python কালেকশনস (মার্জার ৪)' },
  java: { en: 'Generics & Java Collections Framework / Streams — Merger 4', bn: 'জেনারিক্স ও Java কালেকশনস ফ্রেমওয়ার্ক (মার্জার ৪)' },
  javascript: { en: 'Built-in Map/Set, Array Methods & Fetch API — Merger 4', bn: 'Map/Set, অ্যারে মেথড ও Fetch API (মার্জার ৪)' },
  rust: { en: 'Generics & Rust Std Collections / Zero-Cost Iterators — Merger 4', bn: 'জেনারিক্স ও Rust কালেকশনস / ইটারেটর (মার্জার ৪)' },
  typescript: { en: 'Generics, Typed Collections & Utility Types — Merger 4', bn: 'জেনারিক্স, টাইপড কালেকশন ও ইউটিলিটি টাইপ (মার্জার ৪)' },
  html: { en: 'HTML Forms, Media Elements & Web APIs — Merger 4', bn: 'HTML ফর্ম, মিডিয়া এলিমেন্ট ও ওয়েব API (মার্জার ৪)' },
};

const ALIGNED_DEEP_MAP: Record<number, Record<LanguageId, DeepChapterContent>> = {
  7: DEEP_CHAPTER_4,
  12: DEEP_CHAPTER_6,
  15: DEEP_CHAPTER_5,
  16: DEEP_CHAPTER_7,
  18: DEEP_CHAPTER_8,
  20: DEEP_CHAPTER_9,
  23: DEEP_CHAPTER_12,
  24: DEEP_CHAPTER_13,
  25: DEEP_CHAPTER_15,
};

function makeRunnableHelloSnippet(langId: LanguageId, message: string): string {
  switch (langId) {
    case 'c':
      return `#include <stdio.h>\nint main(void) {\n    printf("${message}\\n");\n    return 0;\n}`;
    case 'cpp':
      return `#include <iostream>\nusing namespace std;\nint main() {\n    cout << "${message}\\n";\n    return 0;\n}`;
    case 'python':
      return `print("${message}")`;
    case 'java':
      return `public class Main {\n    public static void main(String[] args) {\n        System.out.println("${message}");\n    }\n}`;
    case 'javascript':
      return `console.log("${message}");`;
    case 'typescript':
      return `const msg: string = "${message}";\nconsole.log(msg);`;
    case 'rust':
      return `fn main() {\n    println!("${message}");\n}`;
    case 'html':
      return `<!doctype html>\n<html>\n  <body>\n    <h1>${message}</h1>\n  </body>\n</html>`;
  }
}

function buildLineAnatomyFromStarter(
  langName: string,
  starterCode: string,
  topic: TopicTemplate,
): LineAnatomyRow[] {
  const lines = starterCode
    .split('\n')
    .map((line, i) => ({ raw: line, num: i + 1 }))
    .filter((entry) => entry.raw.trim().length > 0 && entry.raw.trim() !== '{' && entry.raw.trim() !== '}')
    .slice(0, 6);

  return lines.map((entry) => {
    const trimmed = entry.raw.trim();
    let whatItMeans = `${langName} statement implementing ${topic.topicName}.`;
    let whyItIsThere = `Executes a core step of the ${topic.topicName} pipeline safely.`;
    let ifDeletedError = 'Program either fails compilation or skips an essential runtime step.';

    if (trimmed.startsWith('#include') || trimmed.startsWith('import ') || trimmed.startsWith('use ')) {
      whatItMeans = 'Imports standard library I/O or container modules into scope.';
      whyItIsThere = `Grants access to built-in ${langName} utilities without rewriting low-level syscalls.`;
      ifDeletedError = 'Compiler/Interpreter raises an undeclared identifier or missing module error.';
    } else if (trimmed.includes('main(') || trimmed.startsWith('def ') || trimmed.startsWith('fn ')) {
      whatItMeans = 'Defines the function entry point or helper routine boundary.';
      whyItIsThere = 'Creates an isolated call-stack frame with explicit inputs and return state.';
      ifDeletedError = 'Runtime cannot locate the entry block or throws a syntax mismatch error.';
    } else if (trimmed.includes('print') || trimmed.includes('cout') || trimmed.includes('console.log') || trimmed.includes('<h')) {
      whatItMeans = 'Emits the formatted computation result to stdout / rendered DOM.';
      whyItIsThere = 'Automated judges and end-users verify correctness strictly from this output.';
      ifDeletedError = 'Program produces empty output and triggers Wrong Answer (WA).';
    } else if (trimmed.includes('for') || trimmed.includes('while')) {
      whatItMeans = 'Iterates deterministically across the input sequence or state space.';
      whyItIsThere = `Applies the ${topic.topicName} transition rule in O(n) / O(log n) time.`;
      ifDeletedError = 'Only processes a single element instead of the full dataset.';
    } else if (trimmed.includes('return')) {
      whatItMeans = 'Returns control and exit status cleanly back to caller / OS.';
      whyItIsThere = 'Signals successful completion and releases local stack frame resources.';
      ifDeletedError = 'Non-void functions fail static type checking or return undefined status.';
    }

    return {
      lineNumber: `Line ${entry.num}`,
      codeSnippet: trimmed,
      whatItMeans,
      whyItIsThere,
      ifDeletedError,
    };
  });
}

function buildPhasePracticeSheet(
  langId: LanguageId,
  langName: string,
  topic: TopicTemplate,
  spec: ChapterRunnableSpec,
): PracticeQuestion[] {
  const ch = topic.number;
  const baseCode = spec.starterCode[langId];
  const baseStdin = spec.sampleStdin;
  const baseOut = spec.expectedSampleOutput;

  return [
    {
      id: `${langId}-ch-${ch}-q1`,
      difficulty: 'Easy',
      title: `Warm-up: Trace & Verify ${topic.topicName}`,
      prompt: `Run the chapter ${ch} ${langName} baseline and verify exact stdout matching "${baseOut.split('\n')[0]}".`,
      banglaHint: `শুরুতে কোডটি চালিয়ে দেখো ইনপুট (${baseStdin.split('\n')[0] || 'default'}) দিলে ঠিকমতো আউটপুট আসছে কি না।`,
      starterCode: baseCode,
      sampleStdin: baseStdin,
      expectedOutput: baseOut,
    },
    {
      id: `${langId}-ch-${ch}-q2`,
      difficulty: 'Easy',
      title: `Basic Output Drill (${langName} Ch ${ch})`,
      prompt: `Write a clean ${langName} snippet that outputs "Ch${ch} Ready" to confirm runtime syntax mastery.`,
      banglaHint: `আউটপুট স্টেটমেন্ট ব্যবহার করে হুবহু "Ch${ch} Ready" প্রিন্ট করো।`,
      starterCode: makeRunnableHelloSnippet(langId, `Ch${ch} Ready`),
      sampleStdin: '',
      expectedOutput: langId === 'html' ? `<h1>Ch${ch} Ready</h1>` : `Ch${ch} Ready`,
    },
    {
      id: `${langId}-ch-${ch}-q3`,
      difficulty: 'Medium',
      title: `Logic Builder: ${topic.topicName} Transform`,
      prompt: `Modify the ${langName} logic to handle the full test suite cleanly without edge-case crashes or extra whitespace.`,
      banglaHint: `সীমান্তের কেস (যেমন ০, নেগেটিভ বা খালি ইনপুট) মাথায় রেখে কোডটি যাচাই করো।`,
      starterCode: baseCode,
      sampleStdin: spec.testCases[1]?.input ?? baseStdin,
      expectedOutput: spec.testCases[1]?.expectedOutput ?? baseOut,
    },
    {
      id: `${langId}-ch-${ch}-q4`,
      difficulty: 'Medium',
      title: `Dry-Run Invariant Check (${langName})`,
      prompt: `Audit the memory/complexity behavior for Chapter ${ch} so every hidden test passes under strict 1000ms limits.`,
      banglaHint: `প্রতিটি ধাপে ভ্যারিয়েবল কীভাবে বদলায় তা খাতায় লিখে মিলিয়ে নাও।`,
      starterCode: baseCode,
      sampleStdin: baseStdin,
      expectedOutput: baseOut,
    },
    {
      id: `${langId}-ch-${ch}-q5`,
      difficulty: 'Hard',
      title: `Contest & Interview Challenge: ${topic.topicName}`,
      prompt: `Apply ${topic.topicName} at FAANG/Codeforces scale (n up to 10^5) while avoiding O(n^2) traps and type overflows.`,
      banglaHint: `বড় ইনপুটের ক্ষেত্রে ৬৪-বিট ডেটা টাইপ এবং O(n) বা O(n log n) কৌশল ব্যবহার করো।`,
      starterCode: baseCode,
      sampleStdin: spec.testCases[spec.testCases.length - 1]?.input ?? baseStdin,
      expectedOutput: spec.testCases[spec.testCases.length - 1]?.expectedOutput ?? baseOut,
    },
  ];
}

function buildMiniHandsOnBuild(
  langId: LanguageId,
  langName: string,
  topic: TopicTemplate,
  spec: ChapterRunnableSpec,
): MiniHandsOnBuild {
  const prevRange = topic.number === 1 ? 'Ch 1' : `Ch 1–${topic.number}`;
  const mergerIndex = topic.number === 5 ? 1 : topic.number === 10 ? 2 : topic.number === 15 ? 3 : topic.number === 20 ? 4 : null;

  const title = topic.isCapstone
    ? `${langName} Mega Capstone (Ch 1–25): ${topic.topicName}`
    : mergerIndex !== null
      ? `${langName} Milestone Merger ${mergerIndex} (Ch 1–${topic.number}): ${topic.topicName}`
      : `${langName} Mini Build: ${topic.topicName}`;

  return {
    title,
    description: `Hands-on integrated module combining ${prevRange} concepts inside a single runnable ${langName} program.`,
    banglaGoal: `অধ্যায় ১ থেকে ${topic.number} পর্যন্ত শেখা সব কৌশল একত্র করে একটি সম্পূর্ণ কার্যকর ${langName} প্রোগ্রাম চালানো।`,
    combinesChapters: prevRange,
    starterCode: spec.starterCode[langId],
    sampleStdin: spec.sampleStdin,
    expectedOutput: spec.expectedSampleOutput,
  };
}

function buildAtomicChapter(langId: LanguageId, langName: string, topic: TopicTemplate, lesson: AtomicLessonOverride): Chapter {
  const flavor = LANGUAGE_DOMAIN_FLAVOR[langId];
  const tiers: CodeExampleVariant['tier'][] = ['Basic', 'Edge-Case', 'Optimized', 'CP Trick'];
  const codeExamples: CodeExampleVariant[] = lesson.topics.map((sub, idx) => ({
    id: sub.id,
    tier: tiers[idx] ?? 'Basic',
    title: sub.title,
    banglaNote: sub.banglaParagraphs[0] ?? lesson.zeroIntuition.banglaZeroToHero.explanation,
    code: sub.code,
    stdin: sub.stdin,
    expectedOutput: sub.expectedOutput,
  }));

  const mergerIndex =
    topic.number === 5 ? 1 : topic.number === 10 ? 2 : topic.number === 15 ? 3 : topic.number === 20 ? 4 : null;

  let miniBuild = lesson.miniBuild;
  if (topic.isMilestoneMerger && mergerIndex !== null && !miniBuild.title.includes('Milestone Merger')) {
    miniBuild = { ...miniBuild, title: `Milestone Merger ${mergerIndex}: ${miniBuild.title}` };
  }
  if (topic.isCapstone && !miniBuild.title.includes('Mega Capstone')) {
    miniBuild = { ...miniBuild, title: `Mega Capstone: ${miniBuild.title}` };
  }

  const chapterBullets =
    lesson.visualBullets ?? [
      lesson.topics[0]?.englishParagraphs[0] ?? lesson.subtitle,
      lesson.topics[2]?.englishParagraphs[0] ?? lesson.zeroIntuition.pseudocode[0] ?? lesson.subtitle,
      lesson.topics[3]?.englishParagraphs[0] ?? lesson.zeroIntuition.pseudocode[1] ?? lesson.subtitle,
    ];

  const chapterRamMechanism =
    lesson.ramCpuMechanism ??
    lesson.topics[0]?.englishParagraphs[1] ??
    lesson.topics[0]?.memoryDiagram ??
    lesson.zeroIntuition.plainEnglishStory;

  const chapterDeepParagraphs =
    lesson.deepDiveParagraphs ??
    [
      ...lesson.zeroIntuition.plainEnglishStory.split('\n\n').filter((p) => p.trim().length > 0),
      lesson.topics[1]?.englishParagraphs[0] ?? '',
      lesson.topics[3]?.englishParagraphs[0] ?? '',
    ].filter((p) => p.trim().length > 0);

  const chapterAnalogy =
    lesson.realWorldAnalogy ??
    `${lesson.zeroIntuition.banglaZeroToHero.analogyTitle}: ${lesson.zeroIntuition.banglaZeroToHero.everydayExample}`;

  const chapterProTips =
    lesson.proTips ??
    lesson.harryBugTraps.map((trap) => `${trap.title}: ${trap.whyItBreaks}`);

  const chapterCommonBugs = lesson.harryBugTraps.map((trap) => ({
    bug: trap.title,
    fix: trap.whyItBreaks,
  }));

  const chapterComparisonTable =
    lesson.comparisonTable ??
    lesson.topics.map((t) => ({
      concept: t.badge.replace(/^Example \d+:\s*/i, ''),
      syntax: t.title,
      note: t.memoryDiagram.split('\n')[0] ?? t.englishParagraphs[0] ?? '',
    }));

  return {
    id: `${langId}-ch-${topic.number}`,
    languageId: langId,
    number: topic.number,
    phase: topic.phase,
    isMilestoneMerger: topic.isMilestoneMerger,
    isCapstone: topic.isCapstone,
    title: lesson.title,
    banglaTitle: lesson.banglaTitle,
    subtitle: lesson.subtitle,
    xpReward: topic.xpReward,
    estimatedMinutes: topic.estimatedMinutes,
    zeroIntuition: lesson.zeroIntuition,
    topics: lesson.topics,
    codeExamples,
    lineByLineAnatomy: lesson.lineByLineAnatomy,
    harryBugTraps: lesson.harryBugTraps,
    practiceSheet: lesson.practiceSheet,
    miniBuild,
    visualMode: {
      tldr: `${lesson.subtitle} (${langName} Edition)`,
      bullets: chapterBullets,
      asciiDiagram: lesson.zeroIntuition.asciiFlowchart,
      comparisonTable: chapterComparisonTable.length > 0 ? chapterComparisonTable : flavor.syntaxCompare,
    },
    textbookMode: {
      ramCpuMechanism: chapterRamMechanism,
      deepDiveParagraphs: chapterDeepParagraphs,
      dryRunTable: lesson.dryRunTable,
    },
    seniorMode: {
      realWorldAnalogy: chapterAnalogy,
      commonBugs: chapterCommonBugs,
      proTips: chapterProTips,
    },
    banglaExplanation: {
      summary: lesson.zeroIntuition.banglaZeroToHero.explanation,
      intuitionPoints: lesson.zeroIntuition.banglaZeroToHero.keyTakeaways,
      memoryAnalogy: lesson.zeroIntuition.banglaZeroToHero.everydayExample,
    },
    starterCode: lesson.starterCode,
    sampleStdin: lesson.sampleStdin,
    expectedSampleOutput: lesson.expectedSampleOutput,
    testCases: lesson.testCases,
  };
}

function buildChapter(langId: LanguageId, langName: string, topicIndex: number): Chapter {
  const topic = CHAPTER_TOPICS[topicIndex];

  const lesson = LESSONS_BY_LANG[langId][topic.number];
  if (lesson) {
    return buildAtomicChapter(langId, langName, topic, lesson);
  }

  const flavor = LANGUAGE_DOMAIN_FLAVOR[langId];
  const spec = CHAPTER_SPECS_25[topic.number];
  const alignedDeep = ALIGNED_DEEP_MAP[topic.number]?.[langId];

  let title = `${langName}: ${topic.topicName}`;
  let banglaTitle = `${langName} — ${topic.banglaTopic}`;
  const subtitle = topic.subtitle;

  if (topic.number === 16) {
    title = LANGUAGE_CH16_TITLE[langId].en;
    banglaTitle = LANGUAGE_CH16_TITLE[langId].bn;
  } else if (topic.number === 20) {
    title = LANGUAGE_CH20_TITLE[langId].en;
    banglaTitle = LANGUAGE_CH20_TITLE[langId].bn;
  }

  const starterCode = spec.starterCode[langId];

  const zeroIntuition = alignedDeep
    ? alignedDeep.zeroIntuition
    : {
        plainEnglishStory: `${topic.realWorldAnalogy} In ${langName}, ${topic.subtitle}`,
        asciiFlowchart: spec.asciiDiagram,
        pseudocode: [
          `1. START and read structured input stream (${langName})`,
          `2. INITIALIZE state variables respecting ${flavor.memoryModelNote}`,
          `3. EXECUTE ${topic.topicName} step-by-step transition`,
          `4. VERIFY edge cases and emit formatted stdout`,
        ],
        banglaZeroToHero: {
          analogyTitle: topic.banglaTopic,
          explanation: `${topic.banglaSummary} (${langName}) — ${topic.banglaAnalogy}`,
          everydayExample: topic.banglaAnalogy,
          keyTakeaways: topic.banglaIntuition,
        },
      };

  const lineByLineAnatomy = alignedDeep
    ? alignedDeep.lineByLineAnatomy
    : buildLineAnatomyFromStarter(langName, starterCode, topic);

  const harryBugTraps: BugTrapItem[] = alignedDeep
    ? alignedDeep.harryBugTraps
    : [
        ...flavor.commonBugs.map((cb) => ({
          title: cb.bug,
          brokenCode: `// Trap: ${cb.bug}\n// Leads to wrong output or runtime failure`,
          fixedCode: `// Fix: ${cb.fix}`,
          whyItBreaks: cb.fix,
        })),
        {
          title: `${topic.topicName}: Complexity & Edge-Case TLE Trap`,
          brokenCode: `// Ignoring constraints or edge inputs (n = 0 / empty / 10^5)`,
          fixedCode: `// Pro Tip: ${topic.proTips[0] || 'Verify O(n) / O(n log n) bounds and edge inputs first.'}`,
          whyItBreaks: topic.proTips[0] || 'Unbounded loops or missing base checks fail judge tests.',
        },
      ].slice(0, 3);

  const practiceSheet = buildPhasePracticeSheet(langId, langName, topic, spec);
  const miniBuild = buildMiniHandsOnBuild(langId, langName, topic, spec);
  const dryRunTable = alignedDeep ? alignedDeep.dryRunTable : spec.dryRunTable;

  const codeExamples: CodeExampleVariant[] = alignedDeep?.codeExamples ?? [
    {
      id: `${langId}-${topic.number}-ex-basic`,
      tier: 'Basic',
      title: `1. Basic: ${topic.topicName}`,
      banglaNote: topic.banglaSummary,
      code: starterCode,
      stdin: spec.sampleStdin,
      expectedOutput: spec.expectedSampleOutput,
    },
    {
      id: `${langId}-${topic.number}-ex-edge`,
      tier: 'Edge-Case',
      title: `2. Edge-Case & Boundary Verification`,
      banglaNote: practiceSheet[2]?.banglaHint ?? topic.banglaIntuition[0] ?? topic.banglaSummary,
      code: starterCode,
      stdin: spec.testCases[1]?.input ?? spec.sampleStdin,
      expectedOutput: spec.testCases[1]?.expectedOutput ?? spec.expectedSampleOutput,
    },
    {
      id: `${langId}-${topic.number}-ex-opt`,
      tier: 'Optimized',
      title: `3. Clean Modern ${langName} Pattern`,
      banglaNote: topic.banglaIntuition[0] ?? topic.banglaSummary,
      code: starterCode,
      stdin: spec.sampleStdin,
      expectedOutput: spec.expectedSampleOutput,
    },
    {
      id: `${langId}-${topic.number}-ex-cp`,
      tier: 'CP Trick',
      title: `4. Contest & Interview Speed Drill`,
      banglaNote: practiceSheet[4]?.banglaHint ?? topic.banglaSummary,
      code: starterCode,
      stdin: spec.sampleStdin,
      expectedOutput: spec.expectedSampleOutput,
    },
  ];

  return {
    id: `${langId}-ch-${topic.number}`,
    languageId: langId,
    number: topic.number,
    phase: topic.phase,
    isMilestoneMerger: topic.isMilestoneMerger,
    isCapstone: topic.isCapstone,
    title,
    banglaTitle,
    subtitle,
    xpReward: topic.xpReward,
    estimatedMinutes: topic.estimatedMinutes,
    zeroIntuition,
    codeExamples,
    lineByLineAnatomy,
    harryBugTraps,
    practiceSheet,
    miniBuild,
    visualMode: {
      tldr: `${subtitle} (${langName} Edition)`,
      bullets: [
        ...topic.coreBullets,
        `${langName} Runtime Note: ${flavor.memoryModelNote}`,
      ],
      asciiDiagram: zeroIntuition.asciiFlowchart,
      comparisonTable: flavor.syntaxCompare,
    },
    textbookMode: {
      ramCpuMechanism: `${topic.ramCpuCore} [${langName} Memory Profile]: ${flavor.memoryModelNote}`,
      deepDiveParagraphs: topic.deepParagraphs,
      dryRunTable,
    },
    seniorMode: {
      realWorldAnalogy: topic.realWorldAnalogy,
      commonBugs: flavor.commonBugs,
      proTips: topic.proTips,
    },
    banglaExplanation: {
      summary: `${topic.banglaSummary} (${langName}): ${flavor.banglaMemoryNote}`,
      intuitionPoints: topic.banglaIntuition,
      memoryAnalogy: topic.banglaAnalogy,
    },
    starterCode,
    sampleStdin: spec.sampleStdin,
    expectedSampleOutput: spec.expectedSampleOutput,
    testCases: spec.testCases,
  };
}

export const ALL_CHAPTERS: Chapter[] = LANGUAGES.flatMap((lang) =>
  CHAPTER_TOPICS.map((_, idx) => buildChapter(lang.id, lang.name, idx)),
);

export function mergeCustomChapters(baseChapters: Chapter[], customChapters: Chapter[]): Chapter[] {
  if (!customChapters.length) return baseChapters;
  const map = new Map<string, Chapter>();
  for (const ch of baseChapters) map.set(ch.id, ch);
  for (const custom of customChapters) map.set(custom.id, custom);
  return Array.from(map.values());
}

export function getChaptersByLanguage(languageId: LanguageId, customChapters: Chapter[] = []): Chapter[] {
  return mergeCustomChapters(ALL_CHAPTERS, customChapters)
    .filter((c) => c.languageId === languageId)
    .sort((a, b) => a.number - b.number);
}

export function getChapterById(chapterId: string, customChapters: Chapter[] = []): Chapter | undefined {
  const customHit = customChapters.find((c) => c.id === chapterId);
  if (customHit) return customHit;
  return ALL_CHAPTERS.find((c) => c.id === chapterId);
}
