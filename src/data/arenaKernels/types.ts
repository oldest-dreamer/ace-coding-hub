import type { CompiledLanguageId, DryRunRow, Problem, TestCase } from '../../types/academy';

export interface ArenaKernel {
  id: string;
  defaultTopic: string;
  timeComplexity: string;
  spaceComplexity: string;
  bruteComplexity: string;
  betterComplexity: string;
  inputFormat: string;
  outputFormat: string;
  constraints: string[];
  hints: [string, string, string];
  bruteIntuition: string;
  bruteBangla: string;
  bruteWhyTle: string;
  brutePseudo: string;
  betterIntuition: string;
  betterBangla: string;
  betterTradeoff: string;
  betterPseudo: string;
  optimalIntuition: string;
  optimalBangla: string;
  optimalWhyWins: string;
  optimalPseudo: string;
  banglaEditorial: string;
  dryRunSteps: DryRunRow[];
  solveJs: (stdin: string) => string;
  generateInputs: (seed: number) => { sampleInputs: string[]; hiddenInputs: string[] };
  starterTemplates: Record<CompiledLanguageId, string>;
  solutions: Record<CompiledLanguageId, string>;
}

export interface ProblemBlueprint {
  id: string;
  category: 'cp' | 'interview';
  platform: Problem['platform'];
  topic: string;
  sourceTag: string;
  companyTags: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  rating?: number;
  starTier?: '1★' | '2★' | '3★' | '4★' | '5★';
  patterns?: string[];
  title: string;
  banglaTitle: string;
  xpReward: number;
  statement: string;
  kernelId: string;
  seed: number;
  customConstraints?: string[];
  customHints?: [string, string, string];
  customBanglaEditorial?: string;
}

export function createRng(seed: number): () => number {
  let s = (seed >>> 0) || 1;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function randInt(rng: () => number, min: number, max: number): number {
  return min + Math.floor(rng() * (max - min + 1));
}

export function buildProblemFromBlueprint(
  bp: ProblemBlueprint,
  kernels: Record<string, ArenaKernel>,
): Problem {
  const kernel = kernels[bp.kernelId];
  if (!kernel) {
    throw new Error(`Missing arena kernel: ${bp.kernelId} for problem ${bp.id}`);
  }

  const { sampleInputs, hiddenInputs } = kernel.generateInputs(bp.seed);

  const samples: TestCase[] = sampleInputs.map((input, idx) => ({
    id: `${bp.id}-s${idx + 1}`,
    input,
    expectedOutput: kernel.solveJs(input).trim(),
  }));

  const hiddenTests: TestCase[] = hiddenInputs.map((input, idx) => ({
    id: `${bp.id}-h${idx + 1}`,
    input,
    expectedOutput: kernel.solveJs(input).trim(),
    isHidden: true,
  }));

  return {
    id: bp.id,
    category: bp.category,
    platform: bp.platform,
    topic: bp.topic,
    rating: bp.rating,
    starTier: bp.starTier,
    patterns: bp.patterns,
    sourceTag: bp.sourceTag,
    companyTags: bp.companyTags,
    difficulty: bp.difficulty,
    title: bp.title,
    banglaTitle: bp.banglaTitle,
    xpReward: bp.xpReward,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
    statement: bp.statement,
    inputFormat: kernel.inputFormat,
    outputFormat: kernel.outputFormat,
    constraints: bp.customConstraints ?? kernel.constraints,
    samples,
    hiddenTests,
    hints: bp.customHints ?? kernel.hints,
    approaches: {
      brute: {
        label: 'Brute Force (First Thought)',
        timeComplexity: kernel.bruteComplexity,
        spaceComplexity: 'O(1)',
        intuition: kernel.bruteIntuition,
        banglaIntuition: kernel.bruteBangla,
        whyTleOrSuboptimal: kernel.bruteWhyTle,
        pseudocode: kernel.brutePseudo,
      },
      better: {
        label: 'Better Intermediate Optimization',
        timeComplexity: kernel.betterComplexity,
        spaceComplexity: kernel.spaceComplexity,
        intuition: kernel.betterIntuition,
        banglaIntuition: kernel.betterBangla,
        whyTleOrSuboptimal: kernel.betterTradeoff,
        pseudocode: kernel.betterPseudo,
      },
      optimal: {
        label: 'Optimal Judge-Winning Approach',
        timeComplexity: kernel.timeComplexity,
        spaceComplexity: kernel.spaceComplexity,
        intuition: kernel.optimalIntuition,
        banglaIntuition: kernel.optimalBangla,
        whyTleOrSuboptimal: kernel.optimalWhyWins,
        pseudocode: kernel.optimalPseudo,
      },
    },
    editorial: {
      bruteForceReason: kernel.bruteWhyTle,
      optimalApproach: kernel.optimalIntuition,
      timeComplexity: kernel.timeComplexity,
      spaceComplexity: kernel.spaceComplexity,
      dryRunSteps: kernel.dryRunSteps,
      banglaEditorial: bp.customBanglaEditorial ?? kernel.banglaEditorial,
    },
    starterTemplates: kernel.starterTemplates,
    solutions: kernel.solutions,
  };
}
