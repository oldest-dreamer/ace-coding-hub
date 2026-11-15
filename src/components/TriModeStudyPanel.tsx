import {
  Bookmark,
  BookmarkCheck,
  BookOpen,
  Code2,
  Compass,
  Cpu,
  FileSpreadsheet,
  Languages,
  Wrench,
  Zap,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useMemo, useState } from 'react';
import type { Chapter, StudyMode } from '../types/academy';
import { resolveChapterTopics } from '../utils/chapterTopics';
import { MultiTopicSection } from './MultiTopicSection';
import { SpringReveal } from './SpringReveal';
import { StudyDrillsAndTraps } from './StudyDrillsAndTraps';

export interface IdeSnippetPayload {
  label: string;
  code: string;
  stdin: string;
  expectedOutput: string;
  keySuffix: string;
  autoRun?: boolean;
}

interface TriModeStudyPanelProps {
  chapter: Chapter;
  isBookmarked: boolean;
  onToggleBookmark: (chapter: Chapter) => void;
  onOpenCheatSheet: () => void;
  onLoadIntoIde: (payload: IdeSnippetPayload) => void;
  activeIdeLabel?: string | null;
}

type PanelViewMode = 'pipeline' | StudyMode;

export function TriModeStudyPanel({
  chapter,
  isBookmarked,
  onToggleBookmark,
  onOpenCheatSheet,
  onLoadIntoIde,
  activeIdeLabel,
}: TriModeStudyPanelProps) {
  const [viewMode, setViewMode] = useState<PanelViewMode>('pipeline');
  const [showBangla, setShowBangla] = useState<boolean>(true);
  const [sec1ShowBangla, setSec1ShowBangla] = useState<boolean | null>(null);

  const subTopics = useMemo(() => resolveChapterTopics(chapter), [chapter]);
  const sec1BanglaVisible = sec1ShowBangla ?? showBangla;

  const modes: { id: PanelViewMode; label: string; icon: typeof Zap }[] = [
    { id: 'pipeline', label: 'Deep Reader (Multi-Topic)', icon: Compass },
    { id: 'visual', label: 'Visual Bite-Sized', icon: Zap },
    { id: 'textbook', label: 'Deep Textbook', icon: BookOpen },
    { id: 'senior', label: 'Senior Dev', icon: Wrench },
  ];

  function jumpToSection(sectionId: string) {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  return (
    <div className="obsidian-glass-card flex flex-col rounded-2xl">
      {/* Chapter Header + Top Table of Contents Jump-Bar */}
      <div className="border-b border-[#E2D9C5] p-5 dark:border-white/[0.08]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2 text-xs text-[#57534E] dark:text-slate-400">
            <span className="font-semibold text-emerald-700 dark:text-emerald-400">
              Phase {chapter.phase}
            </span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums">Chapter {chapter.number} of 25</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums">{chapter.estimatedMinutes} min</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums text-emerald-700 dark:text-emerald-400">
              +{chapter.xpReward} XP
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => onToggleBookmark(chapter)}
              aria-pressed={isBookmarked}
              className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap ${
                isBookmarked
                  ? 'border-amber-500/50 bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300'
                  : 'border-[#E2D9C5] bg-[#FCF9F2] text-[#1C1917] hover:bg-[#EFE8D6] dark:border-white/[0.08] dark:bg-[#07090D]/70 dark:text-slate-300 dark:hover:bg-slate-800'
              }`}
            >
              {isBookmarked ? (
                <BookmarkCheck className="h-3.5 w-3.5" aria-hidden="true" />
              ) : (
                <Bookmark className="h-3.5 w-3.5" aria-hidden="true" />
              )}
              <span>{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
            </button>

            <button
              type="button"
              onClick={onOpenCheatSheet}
              className="flex items-center gap-1.5 rounded-lg border border-[#E2D9C5] bg-[#FCF9F2] px-2.5 py-1.5 text-xs font-semibold text-[#1C1917] transition-colors hover:bg-[#EFE8D6] dark:border-white/[0.08] dark:bg-[#07090D]/70 dark:text-slate-200 dark:hover:bg-slate-800 whitespace-nowrap"
            >
              <FileSpreadsheet className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Cheat Sheet</span>
            </button>
          </div>
        </div>

        <h1 className="mt-2.5 font-display text-xl font-bold tracking-tight text-[#1C1917] dark:text-white sm:text-2xl">
          {chapter.title}
        </h1>
        <p className="bangla-text mt-1 text-sm font-medium text-[#57534E] dark:text-slate-300">
          {chapter.banglaTitle}
        </p>
        <p className="mt-1 text-xs leading-relaxed text-[#57534E] dark:text-slate-400">
          {chapter.subtitle}
        </p>

        {/* Study Mode Switcher + Global Bangla Toggle */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
          <div
            role="tablist"
            aria-label="Lesson Pedagogy Views"
            className="flex flex-wrap items-center gap-1 rounded-lg bg-[#EFE8D6] p-1 dark:bg-[#07090D]/80 dark:border dark:border-white/[0.06]"
          >
            {modes.map((m) => {
              const Icon = m.icon;
              const active = viewMode === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setViewMode(m.id)}
                  className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap ${
                    active
                      ? 'bg-[#FCF9F2] text-emerald-800 shadow-sm dark:bg-emerald-500/15 dark:text-emerald-300'
                      : 'text-[#57534E] hover:text-[#1C1917] dark:text-slate-400 dark:hover:text-slate-200'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{m.label}</span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => {
              setSec1ShowBangla(null);
              setShowBangla((prev) => !prev);
            }}
            aria-expanded={showBangla}
            className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap ${
              showBangla
                ? 'border-emerald-600/40 bg-emerald-50 text-emerald-800 dark:border-emerald-500/40 dark:bg-emerald-950/40 dark:text-emerald-300'
                : 'border-[#E2D9C5] bg-[#FCF9F2] text-[#1C1917] hover:bg-[#EFE8D6] dark:border-white/[0.08] dark:bg-[#07090D] dark:text-slate-300'
            }`}
          >
            <Languages className="h-3.5 w-3.5" aria-hidden="true" />
            <span>🇧🇩 বাংলা + English ({showBangla ? 'On' : 'Off'})</span>
          </button>
        </div>

        {/* Top Table of Contents Jump-Bar */}
        {viewMode === 'pipeline' && (
          <nav
            aria-label="Table of Contents Jump-Bar"
            className="mt-3 flex flex-wrap items-center gap-1.5 border-t border-[#E2D9C5] pt-3 dark:border-white/[0.08]"
          >
            {[
              { id: `sec-1-${chapter.id}`, label: '1. Flowchart & Zero' },
              { id: `sec-topics-${chapter.id}`, label: `2. Sub-Topics (${subTopics.length})` },
              { id: `sec-2-${chapter.id}`, label: '3. Line-by-Line' },
              { id: `sec-3-${chapter.id}`, label: '4. Dry Run' },
              { id: `sec-4-${chapter.id}`, label: '5. Bug Traps' },
              { id: `sec-5-${chapter.id}`, label: `6. Practice (${chapter.practiceSheet.length})` },
              { id: `sec-6-${chapter.id}`, label: '7. Mini Build' },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => jumpToSection(item.id)}
                className="rounded-md border border-[#E2D9C5] bg-[#EFE8D6]/60 px-2.5 py-1 text-[11px] font-semibold text-[#1C1917] transition-colors hover:border-emerald-600/50 hover:bg-[#FCF9F2] dark:border-white/[0.08] dark:bg-[#07090D]/75 dark:text-slate-300 dark:hover:border-emerald-400/45 dark:hover:text-emerald-300 whitespace-nowrap"
              >
                {item.label}
              </button>
            ))}
          </nav>
        )}
      </div>

      {/* Study Mode Body */}
      <motion.div
        key={`${chapter.id}-${viewMode}`}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="p-5 sm:p-6 space-y-8"
      >
        {viewMode === 'pipeline' && (
          <div className="space-y-8">
            {/* SECTION 1: Absolute Zero Intuition & Flowchart */}
            <SpringReveal index={0} id={`sec-1-${chapter.id}`}>
              <section className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E2D9C5] pb-2 dark:border-white/[0.08]">
                  <div className="flex items-center gap-2">
                    <Compass className="h-4 w-4 text-emerald-700 dark:text-emerald-400 shrink-0" aria-hidden="true" />
                    <h2 className="font-display text-base font-bold text-[#1C1917] dark:text-white">
                      1. Absolute Zero Intuition, Flowchart &amp; Pseudocode
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSec1ShowBangla(!sec1BanglaVisible)}
                    aria-pressed={sec1BanglaVisible}
                    className={`flex items-center gap-1 rounded-md border px-2.5 py-1 text-[11px] font-semibold transition-colors ${
                      sec1BanglaVisible
                        ? 'border-emerald-600/40 bg-emerald-50 text-emerald-800 dark:border-emerald-500/40 dark:bg-emerald-950/40 dark:text-emerald-300'
                        : 'border-[#E2D9C5] bg-[#FCF9F2] text-[#57534E] dark:border-white/[0.08] dark:bg-[#07090D] dark:text-slate-300'
                    }`}
                  >
                    <Languages className="h-3 w-3" aria-hidden="true" />
                    <span>🇧🇩 বাংলা + English</span>
                  </button>
                </div>

                <div className="rounded-xl border border-emerald-600/25 bg-emerald-50/55 p-4 dark:border-emerald-400/20 dark:bg-emerald-500/5">
                  <div className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
                    Zero-Prior-Knowledge Story
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#1C1917] dark:text-slate-200">
                    {chapter.zeroIntuition.plainEnglishStory}
                  </p>
                </div>

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <div>
                  <h3 className="text-xs font-bold text-[#1C1917] dark:text-slate-200">
                    ASCII Logic Flowchart
                  </h3>
                  <pre className="mt-1.5 overflow-x-auto rounded-lg border border-[#E2D9C5] bg-slate-950 p-3.5 font-mono text-[11px] leading-relaxed text-cyan-300 dark:border-slate-800">
                    {chapter.zeroIntuition.asciiFlowchart}
                  </pre>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-[#1C1917] dark:text-slate-200">
                    Step-by-Step Pseudocode (Before Syntax)
                  </h3>
                  <ol className="mt-1.5 space-y-1.5 rounded-lg border border-[#E2D9C5] bg-[#EFE8D6]/55 p-3.5 font-mono text-xs text-[#1C1917] dark:border-slate-800 dark:bg-slate-900/65 dark:text-slate-200">
                    {chapter.zeroIntuition.pseudocode.map((step, i) => (
                      <li key={i} className="leading-relaxed">
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              {sec1BanglaVisible && (
                <div className="rounded-xl border border-emerald-600/30 bg-emerald-50/75 p-4 dark:border-emerald-500/30 dark:bg-emerald-950/25">
                  <h3 className="bangla-text text-sm font-bold text-emerald-900 dark:text-emerald-300">
                    🇧🇩 বাংলায় একদম শুরু থেকে বুঝুন — {chapter.zeroIntuition.banglaZeroToHero.analogyTitle}
                  </h3>
                  <p className="bangla-text mt-2 text-sm leading-relaxed text-[#1C1917] dark:text-slate-200">
                    {chapter.zeroIntuition.banglaZeroToHero.explanation}
                  </p>
                  <div className="bangla-text mt-2.5 rounded-lg border border-emerald-600/20 bg-[#FCF9F2]/90 p-3 text-xs text-[#1C1917] dark:border-emerald-500/20 dark:bg-slate-900/60 dark:text-slate-200">
                    <strong className="text-emerald-800 dark:text-emerald-300">দৈনন্দিন উদাহরণ: </strong>
                    {chapter.zeroIntuition.banglaZeroToHero.everydayExample}
                  </div>
                  <ul className="bangla-text mt-2.5 space-y-1 text-xs text-[#57534E] dark:text-slate-300">
                    {chapter.zeroIntuition.banglaZeroToHero.keyTakeaways.map((pt, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400 shrink-0" aria-hidden="true" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              </section>
            </SpringReveal>

            {/* SECTION 2: Multi-Topic Deep Sub-Lessons (4–6 Examples per chapter) */}
            <MultiTopicSection
              chapterId={chapter.id}
              topics={subTopics}
              globalShowBangla={showBangla}
              onLoadIntoIde={onLoadIntoIde}
            />

            {/* SECTION 3: Master Line-by-Line Code Breakdown */}
            <SpringReveal index={2} id={`sec-2-${chapter.id}`}>
              <section className="space-y-3">
                <div className="flex items-center gap-2 border-b border-[#E2D9C5] pb-2 dark:border-white/[0.08]">
                  <Code2 className="h-4 w-4 text-emerald-700 dark:text-emerald-400 shrink-0" aria-hidden="true" />
                  <h2 className="font-display text-base font-bold text-[#1C1917] dark:text-white">
                    3. Master Chapter Line-by-Line Anatomy
                  </h2>
                </div>

                <div className="overflow-x-auto rounded-lg border border-[#E2D9C5] dark:border-white/[0.08]">
                  <table className="w-full text-left text-xs leading-snug">
                    <thead className="bg-[#EFE8D6] text-[#1C1917] dark:bg-[#07090D] dark:text-slate-300">
                      <tr>
                        <th className="px-3 py-2 font-semibold whitespace-nowrap">Line</th>
                        <th className="px-3 py-2 font-semibold">Code Token</th>
                        <th className="px-3 py-2 font-semibold">What It Means</th>
                        <th className="px-3 py-2 font-semibold">Why Written</th>
                        <th className="px-3 py-2 font-semibold">Error If Deleted</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E2D9C5] dark:divide-white/[0.06]">
                      {chapter.lineByLineAnatomy.map((row, idx) => (
                        <tr key={idx} className="bg-[#FCF9F2] align-top dark:bg-[#0E131D]/60">
                          <td className="px-3 py-2 font-mono font-bold text-[#57534E] dark:text-slate-400 whitespace-nowrap">
                            {row.lineNumber}
                          </td>
                          <td className="px-3 py-2 font-mono text-emerald-800 dark:text-emerald-300 break-words max-w-[160px]">
                            {row.codeSnippet}
                          </td>
                          <td className="px-3 py-2 text-[#1C1917] dark:text-slate-200">{row.whatItMeans}</td>
                          <td className="px-3 py-2 text-[#57534E] dark:text-slate-400">{row.whyItIsThere}</td>
                          <td className="px-3 py-2 text-rose-700 dark:text-rose-400">{row.ifDeletedError}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </SpringReveal>

            <StudyDrillsAndTraps
              chapter={chapter}
              showBangla={showBangla}
              activeIdeLabel={activeIdeLabel}
              onLoadIntoIde={onLoadIntoIde}
            />
          </div>
        )}

        {viewMode === 'visual' && (
          <div className="space-y-5">
            <div className="rounded-lg border border-amber-600/25 bg-amber-50/70 p-4 dark:border-[#00F5D4]/20 dark:bg-[#00F5D4]/5">
              <div className="text-xs font-bold text-amber-800 dark:text-[#00F5D4]">TL;DR Summary</div>
              <p className="mt-1 text-sm leading-relaxed text-[#1C1917] dark:text-slate-200">
                {chapter.visualMode.tldr}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#1C1917] dark:text-white">Core Takeaways</h3>
              <ul className="mt-2 space-y-2 text-sm text-[#57534E] dark:text-slate-300">
                {chapter.visualMode.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-600 dark:bg-[#00F5D4] shrink-0" aria-hidden="true" />
                    <span className="leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#1C1917] dark:text-white">ASCII Memory &amp; Flow Diagram</h3>
              <pre className="mt-2 overflow-x-auto rounded-lg border border-[#E2D9C5] bg-slate-950 p-4 font-mono text-xs leading-relaxed text-cyan-300 dark:border-slate-800">
                {chapter.visualMode.asciiDiagram}
              </pre>
            </div>
          </div>
        )}

        {viewMode === 'textbook' && (
          <div className="space-y-5">
            <div className="rounded-lg border border-[#E2D9C5] bg-[#EFE8D6]/55 p-4 dark:border-slate-800 dark:bg-slate-900/60">
              <div className="flex items-center gap-2 text-xs font-bold text-[#1C1917] dark:text-white">
                <Cpu className="h-4 w-4 text-amber-600 dark:text-[#00F5D4]" aria-hidden="true" />
                <span>Under the Hood: RAM &amp; CPU Execution</span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-[#57534E] dark:text-slate-300">
                {chapter.textbookMode.ramCpuMechanism}
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-[#1C1917] dark:text-white">Architectural Deep Dive</h3>
              {chapter.textbookMode.deepDiveParagraphs.map((para, idx) => (
                <p key={idx} className="text-sm leading-relaxed text-[#57534E] dark:text-slate-300">
                  {para}
                </p>
              ))}
            </div>
          </div>
        )}

        {viewMode === 'senior' && (
          <div className="space-y-5">
            <div className="rounded-lg border border-violet-500/25 bg-violet-50/70 p-4 dark:bg-violet-950/25">
              <h3 className="text-xs font-bold text-violet-900 dark:text-violet-300">Real-World Mental Model</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-[#1C1917] dark:text-slate-200">
                {chapter.seniorMode.realWorldAnalogy}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#1C1917] dark:text-white">Senior Engineer Pro Tips</h3>
              <ul className="mt-2 space-y-1.5 text-sm text-[#57534E] dark:text-slate-300">
                {chapter.seniorMode.proTips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="font-mono text-xs font-bold text-amber-700 dark:text-[#00F5D4]">0{i + 1}.</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {showBangla && viewMode !== 'pipeline' && (
          <section
            aria-label="Bangla Explanation"
            className="rounded-xl border border-emerald-600/30 bg-emerald-50/75 p-4 dark:border-emerald-500/30 dark:bg-emerald-950/25"
          >
            <h3 className="bangla-text text-sm font-bold text-emerald-900 dark:text-emerald-300">
              🇧🇩 বাংলায় সহজ ব্যাখ্যা (Bangla Intuition)
            </h3>
            <p className="bangla-text mt-2 text-sm text-[#1C1917] dark:text-slate-200">
              {chapter.banglaExplanation.summary}
            </p>
            <div className="bangla-text mt-3 rounded-lg border border-emerald-600/20 bg-[#FCF9F2]/90 p-3 text-xs text-[#1C1917] dark:border-emerald-500/20 dark:bg-slate-900/60 dark:text-slate-200">
              <strong className="text-emerald-800 dark:text-emerald-300">বাস্তব উদাহরণ: </strong>
              {chapter.banglaExplanation.memoryAnalogy}
            </div>
          </section>
        )}
      </motion.div>
    </div>
  );
}
