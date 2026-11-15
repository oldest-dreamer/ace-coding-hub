import { AlertTriangle, Hammer, Play, Table2, Target } from 'lucide-react';
import { useState } from 'react';
import type { Chapter } from '../types/academy';
import { DryRunAnimator } from './DryRunAnimator';
import { SpringReveal } from './SpringReveal';
import type { IdeSnippetPayload } from './TriModeStudyPanel';

interface StudyDrillsAndTrapsProps {
  chapter: Chapter;
  showBangla: boolean;
  activeIdeLabel?: string | null;
  onLoadIntoIde: (payload: IdeSnippetPayload) => void;
}

export function StudyDrillsAndTraps({
  chapter,
  showBangla,
  activeIdeLabel,
  onLoadIntoIde,
}: StudyDrillsAndTrapsProps) {
  const [expandedHints, setExpandedHints] = useState<Record<string, boolean>>({});
  const [activeDryRunStep, setActiveDryRunStep] = useState<number | null>(null);

  function toggleQuestionHint(id: string) {
    setExpandedHints((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <div className="space-y-8">
      {/* SECTION 4: Manual Dry Run & Memory Trace Table */}
      <SpringReveal index={0} id={`sec-3-${chapter.id}`}>
        <section className="space-y-3">
          <div className="flex items-center gap-2 border-b border-[#E2D9C5] pb-2 dark:border-white/[0.08]">
            <Table2 className="h-4 w-4 text-emerald-700 dark:text-emerald-400 shrink-0" aria-hidden="true" />
            <h2 className="font-display text-base font-bold text-[#1C1917] dark:text-white">
              4. Interactive Dry Run &amp; RAM / Stack Trace
            </h2>
          </div>

          <DryRunAnimator
            rows={chapter.textbookMode.dryRunTable}
            chapterId={chapter.id}
            onActiveStepChange={setActiveDryRunStep}
          />

          <div className="overflow-x-auto rounded-lg border border-[#E2D9C5] dark:border-white/[0.08]">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#EFE8D6] text-[#1C1917] dark:bg-[#07090D] dark:text-slate-300">
                <tr>
                  <th className="px-3 py-2 font-semibold">Step</th>
                  <th className="px-3 py-2 font-semibold">Execution State</th>
                  <th className="px-3 py-2 font-semibold">RAM / Stack Memory</th>
                  <th className="px-3 py-2 font-semibold">Observation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2D9C5] dark:divide-white/[0.06]">
                {chapter.textbookMode.dryRunTable.map((row) => {
                  const isRowActive = activeDryRunStep === row.step;
                  return (
                    <tr
                      key={row.step}
                      className={`align-top transition-colors ${
                        isRowActive
                          ? 'bg-emerald-50/90 dark:bg-emerald-500/10'
                          : 'bg-[#FCF9F2] dark:bg-[#0E131D]/60'
                      }`}
                    >
                      <td className="px-3 py-2.5 font-mono font-bold tabular-nums text-emerald-700 dark:text-emerald-400">
                        {row.step}
                      </td>
                      <td className="px-3 py-2.5 font-medium text-[#1C1917] dark:text-slate-100">
                        {row.state}
                      </td>
                      <td className="px-3 py-2.5 font-mono text-[#57534E] dark:text-slate-300">
                        {row.memoryOrStack}
                      </td>
                      <td className="px-3 py-2.5 text-[#57534E] dark:text-slate-400">
                        {row.note}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </SpringReveal>

      {/* SECTION 5: Common Bugs & TLE Traps */}
      <SpringReveal index={1} id={`sec-4-${chapter.id}`}>
        <section className="space-y-3">
          <div className="flex items-center gap-2 border-b border-[#E2D9C5] pb-2 dark:border-white/[0.08]">
            <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0" aria-hidden="true" />
            <h2 className="font-display text-base font-bold text-[#1C1917] dark:text-white">
              5. Common Bugs &amp; TLE Traps ({chapter.harryBugTraps.length})
            </h2>
          </div>

          <div className="space-y-3">
            {chapter.harryBugTraps.map((trap, idx) => (
              <SpringReveal key={idx} index={idx} staggerSeconds={0.045}>
                <div className="rounded-xl border border-[#E2D9C5] bg-[#EFE8D6]/45 p-4 dark:border-white/[0.08] dark:bg-[#07090D]/60 space-y-2.5">
                  <div className="text-xs font-bold text-[#1C1917] dark:text-white">
                    Trap {idx + 1}: {trap.title.replace(/^Trap\s*\d+:\s*/i, '')}
                  </div>
              <div className="grid grid-cols-1 gap-2.5 md:grid-cols-2">
                <div>
                  <div className="text-[11px] font-semibold text-rose-700 dark:text-rose-400">
                    Broken Code
                  </div>
                  <pre className="mt-1 overflow-x-auto rounded-md border border-rose-500/30 bg-slate-950 p-2.5 font-mono text-[11px] text-rose-300">
                    {trap.brokenCode}
                  </pre>
                </div>
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
                      Fixed Code
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        onLoadIntoIde({
                          label: `Fixed Trap ${idx + 1}`,
                          code: trap.fixedCode,
                          stdin: chapter.sampleStdin,
                          expectedOutput: chapter.expectedSampleOutput,
                          keySuffix: `trap-${chapter.id}-${idx}`,
                          autoRun: true,
                        })
                      }
                      className="flex items-center gap-1 rounded border border-emerald-600/35 bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-800 hover:bg-emerald-100 dark:border-emerald-500/35 dark:bg-emerald-950/40 dark:text-emerald-300"
                    >
                      <Play className="h-2.5 w-2.5" aria-hidden="true" />
                      <span>Load Fix</span>
                    </button>
                  </div>
                  <pre className="mt-1 overflow-x-auto rounded-md border border-emerald-500/30 bg-slate-950 p-2.5 font-mono text-[11px] text-emerald-300">
                    {trap.fixedCode}
                  </pre>
                </div>
              </div>
              <p className="text-xs text-[#57534E] dark:text-slate-300">
                <strong className="text-[#1C1917] dark:text-slate-100">Why It Breaks: </strong>
                {trap.whyItBreaks}
              </p>
                </div>
              </SpringReveal>
            ))}
          </div>
        </section>
      </SpringReveal>

      {/* SECTION 6: Chapter Practice Sheet */}
      <SpringReveal index={2} id={`sec-5-${chapter.id}`}>
        <section className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E2D9C5] pb-2 dark:border-white/[0.08]">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-emerald-700 dark:text-emerald-400 shrink-0" aria-hidden="true" />
              <h2 className="font-display text-base font-bold text-[#1C1917] dark:text-white">
                6. Chapter Practice Sheet ({chapter.practiceSheet.length} Graded Drills)
              </h2>
            </div>
            {activeIdeLabel && (
              <span className="font-mono text-[11px] text-emerald-700 dark:text-emerald-400">
                Loaded: {activeIdeLabel}
              </span>
            )}
          </div>

          <div className="space-y-2.5">
            {chapter.practiceSheet.map((q, idx) => {
              const diffClass =
                q.difficulty === 'Hard'
                  ? 'text-rose-700 dark:text-rose-400'
                  : q.difficulty === 'Medium'
                    ? 'text-amber-700 dark:text-amber-400'
                    : 'text-emerald-700 dark:text-emerald-400';
              const hintOpen = Boolean(expandedHints[q.id]);

              return (
                <SpringReveal key={q.id} index={idx} staggerSeconds={0.045}>
                  <div className="rounded-xl border border-[#E2D9C5] bg-[#FCF9F2] p-3.5 dark:border-white/[0.08] dark:bg-[#0E131D]/70">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div className="space-y-1 min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2 text-[11px]">
                          <span className="font-mono font-bold text-[#57534E] dark:text-slate-400">
                            Q{idx + 1}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span className={`font-semibold ${diffClass}`}>{q.difficulty}</span>
                          <span aria-hidden="true">·</span>
                          <span className="font-semibold text-[#1C1917] dark:text-white">{q.title}</span>
                        </div>
                        <p className="text-xs leading-relaxed text-[#57534E] dark:text-slate-300">
                          {q.prompt}
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => toggleQuestionHint(q.id)}
                          className="rounded-md border border-[#E2D9C5] bg-[#EFE8D6] px-2.5 py-1.5 text-[11px] font-semibold text-[#1C1917] hover:bg-[#E2D9C5] dark:border-white/[0.08] dark:bg-[#07090D] dark:text-slate-300 whitespace-nowrap"
                        >
                          {hintOpen ? 'Hide Hint' : 'Bangla Hint'}
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            onLoadIntoIde({
                              label: `Q${idx + 1}: ${q.title}`,
                              code: q.starterCode,
                              stdin: q.sampleStdin,
                              expectedOutput: q.expectedOutput,
                              keySuffix: q.id,
                              autoRun: true,
                            })
                          }
                          className="flex items-center gap-1 rounded-md bg-emerald-600 px-2.5 py-1.5 text-[11px] font-semibold text-white hover:bg-emerald-500 dark:bg-emerald-500 dark:text-slate-950 whitespace-nowrap"
                        >
                          <Play className="h-3 w-3" aria-hidden="true" />
                          <span>Load This Example in Editor</span>
                        </button>
                      </div>
                    </div>

                    {hintOpen && (
                      <div className="bangla-text mt-2.5 rounded-md border border-emerald-600/25 bg-emerald-50/75 p-2.5 text-xs text-[#1C1917] dark:bg-emerald-950/30 dark:text-emerald-200">
                        <strong>হিন্ট: </strong>
                        {q.banglaHint}
                      </div>
                    )}
                  </div>
                </SpringReveal>
              );
            })}
          </div>
        </section>
      </SpringReveal>

      {/* SECTION 7: Mini Hands-On Build */}
      <SpringReveal index={3} id={`sec-6-${chapter.id}`}>
        <section className="space-y-3">
          <div className="flex items-center gap-2 border-b border-[#E2D9C5] pb-2 dark:border-white/[0.08]">
            <Hammer className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" aria-hidden="true" />
            <h2 className="font-display text-base font-bold text-[#1C1917] dark:text-white">
              7. Mini Hands-On Build ({chapter.miniBuild.combinesChapters})
            </h2>
          </div>

          <div className="rounded-xl border border-emerald-600/30 bg-emerald-50/55 p-4 dark:border-emerald-400/25 dark:bg-emerald-950/20 space-y-3">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-bold text-[#1C1917] dark:text-white">
                  {chapter.miniBuild.title}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-[#57534E] dark:text-slate-300">
                  {chapter.miniBuild.description}
                </p>
                {showBangla && (
                  <p className="bangla-text mt-1.5 text-xs text-emerald-800 dark:text-emerald-300">
                    <strong>লক্ষ্য: </strong>
                    {chapter.miniBuild.banglaGoal}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={() =>
                  onLoadIntoIde({
                    label: `Mini Build: ${chapter.miniBuild.title}`,
                    code: chapter.miniBuild.starterCode,
                    stdin: chapter.miniBuild.sampleStdin,
                    expectedOutput: chapter.miniBuild.expectedOutput,
                    keySuffix: `mini-${chapter.id}`,
                    autoRun: true,
                  })
                }
                className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-bold text-white hover:bg-emerald-500 dark:bg-emerald-500 dark:text-slate-950 whitespace-nowrap shrink-0"
              >
                <Play className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Load &amp; Run Mini Build</span>
              </button>
            </div>

            <pre className="overflow-x-auto rounded-lg border border-[#E2D9C5] bg-[#07090D] p-3 font-mono text-[11px] leading-relaxed text-slate-200 dark:border-white/[0.08]">
              {chapter.miniBuild.starterCode}
            </pre>
          </div>
        </section>
      </SpringReveal>
    </div>
  );
}
