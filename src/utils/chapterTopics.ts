import type { Chapter, ChapterSubTopic, LineAnatomyRow, Problem } from '../types/academy';

export type CpRatingBand = 'ALL' | '800-1000' | '1100-1300' | '1400-1500' | '1600+';

/**
 * Generates concise line-by-line anatomy rows for any code snippet so every
 * multi-topic sub-lesson has a complete CodeWithHarry-style token breakdown.
 */
export function buildSnippetAnatomy(code: string, fallbackRows: LineAnatomyRow[]): LineAnatomyRow[] {
  const nonEmpty = code
    .split('\n')
    .map((line, idx) => ({ raw: line, num: idx + 1 }))
    .filter((entry) => {
      const t = entry.raw.trim();
      return t.length > 0 && t !== '{' && t !== '}';
    })
    .slice(0, 6);

  if (nonEmpty.length === 0) {
    return fallbackRows.slice(0, 5);
  }

  return nonEmpty.map((entry, idx) => {
    const t = entry.raw.trim();
    const matched = fallbackRows.find((r) => t.includes(r.codeSnippet) || r.codeSnippet.includes(t));
    if (matched) {
      return {
        ...matched,
        lineNumber: `Line ${entry.num}`,
        codeSnippet: t,
      };
    }

    let whatItMeans = 'Executes a focused step of the chapter algorithm or state transition.';
    let whyItIsThere = 'Advances local computation cleanly toward the expected output.';
    let ifDeletedError = 'Logic skips a required computation step or emits incorrect stdout.';

    if (t.startsWith('#include') || t.startsWith('import ') || t.startsWith('use ')) {
      whatItMeans = 'Brings standard library I/O, math, or container definitions into scope.';
      whyItIsThere = 'Avoids reimplementing low-level system calls or data structures from scratch.';
      ifDeletedError = 'Compiler or interpreter rejects unknown symbols on subsequent lines.';
    } else if (t.includes('main(') || t.startsWith('def ') || t.startsWith('fn ') || t.startsWith('function ')) {
      whatItMeans = 'Declares the entry point or helper function signature with parameters.';
      whyItIsThere = 'Establishes a clean call-stack frame and scope boundary.';
      ifDeletedError = 'Program lacks an executable entry block or raises syntax mismatch.';
    } else if (t.includes('if ') || t.includes('else')) {
      whatItMeans = 'Guards edge cases or branches execution based on a boolean predicate.';
      whyItIsThere = 'Prevents crashes (e.g., division by zero or invalid bounds) before work begins.';
      ifDeletedError = 'Invalid or boundary inputs fall through and trigger runtime/WA failures.';
    } else if (t.includes('for') || t.includes('while')) {
      whatItMeans = 'Iterates deterministically across elements or states until termination.';
      whyItIsThere = 'Processes variable-sized datasets within predictable time complexity.';
      ifDeletedError = 'Only the initial value is checked instead of scanning the full sequence.';
    } else if (t.includes('print') || t.includes('cout') || t.includes('console.log') || t.includes('<h')) {
      whatItMeans = 'Writes the computed answer to standard output or rendered markup.';
      whyItIsThere = 'Judges compare exact stdout formatting character-for-character.';
      ifDeletedError = 'Empty output produces Wrong Answer (WA) even when computation succeeded.';
    } else if (t.includes('return')) {
      whatItMeans = 'Returns control and exit status cleanly back to the caller or OS.';
      whyItIsThere = 'Releases the active stack frame and marks successful termination.';
      ifDeletedError = 'Typed functions fail static analysis or leak indeterminate status codes.';
    } else if (fallbackRows[idx]) {
      whatItMeans = fallbackRows[idx].whatItMeans;
      whyItIsThere = fallbackRows[idx].whyItIsThere;
      ifDeletedError = fallbackRows[idx].ifDeletedError;
    }

    return {
      lineNumber: `Line ${entry.num}`,
      codeSnippet: t,
      whatItMeans,
      whyItIsThere,
      ifDeletedError,
    };
  });
}

/**
 * Ensures every chapter exposes 4–6 rich multi-topic sub-lessons with English + Bangla
 * explanations, memory diagram, runnable example, stdin/expected output, and line-by-line anatomy.
 */
export function resolveChapterTopics(chapter: Chapter): ChapterSubTopic[] {
  if (chapter.topics && chapter.topics.length >= 4) {
    return chapter.topics.slice(0, 6);
  }

  const examples = chapter.codeExamples ?? [];
  const ex1 = examples[0];
  const ex2 = examples[1];
  const ex3 = examples[2];
  const ex4 = examples[3];

  const qEdge = chapter.practiceSheet[2] ?? chapter.practiceSheet[0];
  const qOpt = chapter.practiceSheet[3] ?? chapter.practiceSheet[1] ?? chapter.practiceSheet[0];
  const qCp = chapter.practiceSheet[4] ?? chapter.practiceSheet[chapter.practiceSheet.length - 1];
  const trap1 = chapter.harryBugTraps[0];

  const topic1Code = ex1?.code ?? chapter.starterCode;
  const topic1Stdin = ex1?.stdin ?? chapter.sampleStdin;
  const topic1Out = ex1?.expectedOutput ?? chapter.expectedSampleOutput;

  const topic2Code = chapter.miniBuild.starterCode || chapter.starterCode;
  const topic2Stdin = chapter.miniBuild.sampleStdin || chapter.sampleStdin;
  const topic2Out = chapter.miniBuild.expectedOutput || chapter.expectedSampleOutput;

  const topic3Code = ex2?.code ?? (qEdge ? qEdge.starterCode : chapter.starterCode);
  const topic3Stdin = ex2?.stdin ?? (qEdge ? qEdge.sampleStdin : chapter.sampleStdin);
  const topic3Out = ex2?.expectedOutput ?? (qEdge ? qEdge.expectedOutput : chapter.expectedSampleOutput);

  const topic4Code = ex3?.code ?? (qOpt ? qOpt.starterCode : chapter.starterCode);
  const topic4Stdin = ex3?.stdin ?? (qOpt ? qOpt.sampleStdin : chapter.sampleStdin);
  const topic4Out = ex3?.expectedOutput ?? (qOpt ? qOpt.expectedOutput : chapter.expectedSampleOutput);

  const topic5Code = ex4?.code ?? (qCp ? qCp.starterCode : chapter.starterCode);
  const topic5Stdin = ex4?.stdin ?? (qCp ? qCp.sampleStdin : chapter.sampleStdin);
  const topic5Out = ex4?.expectedOutput ?? (qCp ? qCp.expectedOutput : chapter.expectedSampleOutput);

  const subTopics: ChapterSubTopic[] = [
    {
      id: `${chapter.id}-topic-1`,
      title: ex1?.title ?? `${chapter.title} — Core Syntax & Mental Model`,
      badge: 'Example 1: Basic',
      englishParagraphs: [
        chapter.zeroIntuition.plainEnglishStory,
        chapter.textbookMode.ramCpuMechanism,
      ],
      banglaParagraphs: [
        chapter.zeroIntuition.banglaZeroToHero.explanation,
        ex1?.banglaNote ?? chapter.banglaExplanation.summary,
      ],
      memoryDiagram: chapter.zeroIntuition.asciiFlowchart,
      code: topic1Code,
      stdin: topic1Stdin,
      expectedOutput: topic1Out,
      lineByLine: buildSnippetAnatomy(topic1Code, chapter.lineByLineAnatomy),
    },
    {
      id: `${chapter.id}-topic-2`,
      title: chapter.miniBuild.title,
      badge: 'Example 2: Real-World',
      englishParagraphs: [
        chapter.seniorMode.realWorldAnalogy,
        chapter.miniBuild.description,
      ],
      banglaParagraphs: [
        chapter.banglaExplanation.memoryAnalogy,
        chapter.miniBuild.banglaGoal,
      ],
      memoryDiagram: chapter.visualMode.asciiDiagram,
      code: topic2Code,
      stdin: topic2Stdin,
      expectedOutput: topic2Out,
      lineByLine: buildSnippetAnatomy(topic2Code, chapter.lineByLineAnatomy),
    },
    {
      id: `${chapter.id}-topic-3`,
      title: ex2?.title ?? `Boundary Safety & Overflow Guard (${chapter.title})`,
      badge: 'Example 3: Edge Case & Overflow',
      englishParagraphs: [
        trap1
          ? `Key Pitfall (${trap1.title}): ${trap1.whyItBreaks}`
          : 'Defensive boundary validation prevents silent integer overflow, off-by-one indexing, and zero-division crashes.',
        qEdge
          ? `Drill Objective: ${qEdge.prompt}`
          : 'Always verify empty inputs, extreme negative values, and maximum 64-bit bounds before emitting stdout.',
      ],
      banglaParagraphs: [
        ex2?.banglaNote ??
          'সীমান্তের কেস (যেমন ০, নেগেটিভ সংখ্যা, খালি ইনপুট বা ৩২-বিট ওভারফ্লো) শুরুতেই গার্ড ক্লজ দিয়ে আটকে দিলে রানটাইম ক্র্যাশ হয় না।',
        qEdge?.banglaHint ?? chapter.zeroIntuition.banglaZeroToHero.everydayExample,
      ],
      memoryDiagram: trap1
        ? `BROKEN:\n${trap1.brokenCode}\n\nFIXED:\n${trap1.fixedCode}`
        : chapter.visualMode.asciiDiagram,
      code: topic3Code,
      stdin: topic3Stdin,
      expectedOutput: topic3Out,
      lineByLine: buildSnippetAnatomy(topic3Code, chapter.lineByLineAnatomy),
    },
    {
      id: `${chapter.id}-topic-4`,
      title: ex3?.title ?? `Idiomatic Modern Standard Pattern`,
      badge: 'Example 4: Modern Standard',
      englishParagraphs: [
        chapter.textbookMode.deepDiveParagraphs[0] ?? chapter.subtitle,
        chapter.seniorMode.proTips[0] ??
          'Write declarative, compiler-friendly code with clean types, early returns, and zero redundant allocations.',
      ],
      banglaParagraphs: [
        ex3?.banglaNote ?? chapter.banglaExplanation.intuitionPoints[0] ?? chapter.banglaExplanation.summary,
        chapter.banglaExplanation.intuitionPoints[1] ??
          chapter.zeroIntuition.banglaZeroToHero.keyTakeaways[0] ??
          'আধুনিক স্ট্যান্ডার্ড ব্যবহার করলে কোড পড়া সহজ হয় এবং বাগ কমে।',
      ],
      memoryDiagram:
        chapter.textbookMode.dryRunTable
          .map((row) => `Step ${row.step}: ${row.state} | RAM: ${row.memoryOrStack}`)
          .join('\n') || chapter.visualMode.asciiDiagram,
      code: topic4Code,
      stdin: topic4Stdin,
      expectedOutput: topic4Out,
      lineByLine: buildSnippetAnatomy(topic4Code, chapter.lineByLineAnatomy),
    },
    {
      id: `${chapter.id}-topic-5`,
      title: ex4?.title ?? `Competitive Programming & Interview Speed Trick`,
      badge: 'Example 5: Codeforces CP Trick',
      englishParagraphs: [
        chapter.textbookMode.deepDiveParagraphs[1] ??
          chapter.seniorMode.proTips[1] ??
          'Under strict 1000ms judge time limits, avoid O(n^2) passes, use fast buffered I/O, and prefer 64-bit arithmetic.',
        qCp
          ? `Contest Challenge: ${qCp.prompt}`
          : 'Precompute invariants or apply O(1) bit/algebraic identities so 2×10^5 inputs finish well under 50ms.',
      ],
      banglaParagraphs: [
        ex4?.banglaNote ??
          chapter.banglaExplanation.intuitionPoints[2] ??
          'প্রতিযোগিতামূলক প্রোগ্রামিংয়ে (Codeforces/FAANG) সময় ১ সেকেন্ডের কম রাখতে বড় টাইপ ও O(n) / O(log n) ট্রিক ব্যবহার করা হয়।',
        qCp?.banglaHint ??
          'বড় ইনপুটের (n = 10^5) জন্য ফাস্ট ইনপুট-আউটপুট এবং ৬৪-বিট ডেটা টাইপ নিশ্চিত করো।',
      ],
      memoryDiagram: chapter.visualMode.asciiDiagram,
      code: topic5Code,
      stdin: topic5Stdin,
      expectedOutput: topic5Out,
      lineByLine: buildSnippetAnatomy(topic5Code, chapter.lineByLineAnatomy),
    },
  ];

  return subTopics;
}

/**
 * Extracts numeric Codeforces / CP rating from problem metadata for rating band filtering.
 */
export function extractProblemRating(problem: Problem): number | null {
  const combined = `${problem.sourceTag} ${problem.companyTags.join(' ')}`;
  const match = combined.match(/\b(800|900|1000|1100|1200|1300|1400|1500|1600|1700|1800|1900|2000|2100|2200|2300|2400)\b/);
  if (match) {
    return Number(match[1]);
  }
  if (problem.category !== 'cp') return null;
  if (problem.sourceTag.includes('2-Star')) return 1250;
  if (problem.sourceTag.includes('3-Star')) return 1500;
  if (problem.sourceTag.includes('1-Star')) return 850;
  if (problem.difficulty === 'Easy') return 900;
  if (problem.difficulty === 'Medium') return 1300;
  return 1700;
}

export function matchesCpRatingBand(problem: Problem, band: CpRatingBand): boolean {
  if (band === 'ALL') return true;
  const rating = extractProblemRating(problem);
  if (rating === null) return false;
  switch (band) {
    case '800-1000':
      return rating >= 800 && rating <= 1000;
    case '1100-1300':
      return rating >= 1100 && rating <= 1300;
    case '1400-1500':
      return rating >= 1400 && rating <= 1500;
    case '1600+':
      return rating >= 1600;
  }
}
