import type {
  BugTrapItem,
  Chapter,
  ChapterSubTopic,
  DryRunRow,
  LineAnatomyRow,
  MiniHandsOnBuild,
  PracticeQuestion,
  TestCase,
} from '../types/academy';

export interface AtomicLessonOverride {
  chapterNumber: number; // 1..25
  isMilestoneMerger?: boolean;
  title: string;
  banglaTitle: string;
  subtitle: string;
  zeroIntuition: Chapter['zeroIntuition'];
  topics: [ChapterSubTopic, ChapterSubTopic, ChapterSubTopic, ChapterSubTopic];
  lineByLineAnatomy: LineAnatomyRow[];
  dryRunTable: DryRunRow[];
  harryBugTraps: BugTrapItem[];
  practiceSheet: PracticeQuestion[];
  miniBuild: MiniHandsOnBuild;
  starterCode: string;
  sampleStdin: string;
  expectedSampleOutput: string;
  testCases: TestCase[];
  visualBullets?: string[];
  comparisonTable?: { concept: string; syntax: string; note: string }[];
  ramCpuMechanism?: string;
  deepDiveParagraphs?: string[];
  realWorldAnalogy?: string;
  proTips?: string[];
}
