import { ChevronDown, ChevronRight, Code2, Languages, Play, Sparkles } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import type { ChapterSubTopic } from '../types/academy';
import { SpringReveal } from './SpringReveal';
import type { IdeSnippetPayload } from './TriModeStudyPanel';

interface MultiTopicSectionProps {
  chapterId: string;
  topics: ChapterSubTopic[];
  globalShowBangla: boolean;
  onLoadIntoIde: (payload: IdeSnippetPayload) => void;
}

export function MultiTopicSection({
  chapterId,
  topics,
  globalShowBangla,
  onLoadIntoIde,
}: MultiTopicSectionProps) {
  // First 2 topics expanded by default for immediate multi-example study flow
  const [expandedMap, setExpandedMap] = useState<Record<string, boolean>>({});
  const [localLangOverrides, setLocalLangOverrides] = useState<Record<string, boolean>>({});

  function isExpanded(topicId: string, idx: number): boolean {
    if (topicId in expandedMap) return expandedMap[topicId];
    return idx === 0;
  }

  function isBanglaShown(topicId: string): boolean {
    if (topicId in localLangOverrides) return localLangOverrides[topicId];
    return globalShowBangla;
  }

  function toggleExpand(topicId: string, idx: number) {
    const next = !isExpanded(topicId, idx);
    setExpandedMap((prev) => ({ ...prev, [topicId]: next }));
  }

  function toggleTopicBangla(topicId: string) {
    const current = isBanglaShown(topicId);
    setLocalLangOverrides((prev) => ({ ...prev, [topicId]: !current }));
  }

  return (
    <SpringReveal index={1} id={`sec-topics-${chapterId}`}>
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E2D9C5] pb-2.5 dark:border-white/[0.08]">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-emerald-700 dark:text-emerald-400 shrink-0" aria-hidden="true" />
            <h2 className="font-display text-base font-bold text-[#1C1917] dark:text-white">
              Multi-Topic Deep Sub-Lessons ({topics.length} Runnable Examples)
            </h2>
          </div>
          <span className="text-xs font-medium text-[#57534E] dark:text-slate-400">
            Expand any tier &amp; click Load &amp; Run in Editor
          </span>
        </div>

        {/* Quick Sub-Topic Jump Chips */}
        <div className="flex flex-wrap items-center gap-1.5">
          {topics.map((topic, idx) => (
            <button
              key={topic.id}
              type="button"
              onClick={() => {
                setExpandedMap((prev) => ({ ...prev, [topic.id]: true }));
                const el = document.getElementById(topic.id);
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="rounded-lg border border-[#E2D9C5] bg-[#EFE8D6]/75 px-2.5 py-1 text-[11px] font-semibold text-[#1C1917] transition-colors hover:border-emerald-600/50 hover:bg-[#FCF9F2] dark:border-white/[0.08] dark:bg-[#07090D]/75 dark:text-slate-200 dark:hover:border-emerald-400/45"
            >
              {idx + 1}. {topic.badge.replace(/^Example \d+:\s*/i, '')}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {topics.map((topic, idx) => {
            const open = isExpanded(topic.id, idx);
            const showBn = isBanglaShown(topic.id);

            return (
              <SpringReveal key={topic.id} index={idx} staggerSeconds={0.045}>
                <article
                  id={topic.id}
                  className="overflow-hidden rounded-xl border border-[#E2D9C5] bg-[#FCF9F2]/90 shadow-sm dark:border-white/[0.08] dark:bg-[#0E131D]/75"
                >
                  {/* Expandable Header */}
                  <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 bg-[#EFE8D6]/55 dark:bg-[#07090D]/65">
                    <button
                      type="button"
                      aria-expanded={open}
                      onClick={() => toggleExpand(topic.id, idx)}
                      className="flex min-w-0 flex-1 items-center gap-2.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 dark:focus-visible:ring-emerald-400 rounded"
                    >
                      {open ? (
                        <ChevronDown className="h-4 w-4 text-emerald-700 dark:text-emerald-400 shrink-0" aria-hidden="true" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-[#57534E] dark:text-slate-400 shrink-0" aria-hidden="true" />
                      )}
                      <div className="min-w-0 flex-1">
                        <div className="text-[11px] font-mono font-bold text-emerald-700 dark:text-emerald-400">
                          {topic.badge}
                        </div>
                        <h3 className="font-display text-sm font-bold text-[#1C1917] dark:text-white truncate">
                          {topic.title}
                        </h3>
                      </div>
                    </button>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => toggleTopicBangla(topic.id)}
                        aria-pressed={showBn}
                        className={`flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-[11px] font-semibold transition-colors whitespace-nowrap ${
                          showBn
                            ? 'border-emerald-600/40 bg-emerald-50 text-emerald-800 dark:border-emerald-500/40 dark:bg-emerald-950/40 dark:text-emerald-300'
                            : 'border-[#E2D9C5] bg-[#FCF9F2] text-[#57534E] dark:border-white/[0.08] dark:bg-[#07090D] dark:text-slate-300'
                        }`}
                      >
                        <Languages className="h-3 w-3" aria-hidden="true" />
                        <span>🇧🇩 বাংলা + English</span>
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          onLoadIntoIde({
                            label: `${topic.badge}: ${topic.title}`,
                            code: topic.code,
                            stdin: topic.stdin,
                            expectedOutput: topic.expectedOutput,
                            keySuffix: topic.id,
                            autoRun: true,
                          })
                        }
                        className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-[11px] font-bold text-white transition-colors hover:bg-emerald-500 dark:bg-emerald-500 dark:text-slate-950 dark:hover:bg-emerald-400 whitespace-nowrap"
                      >
                        <Play className="h-3 w-3" aria-hidden="true" />
                        <span>Load &amp; Run in Editor</span>
                      </button>
                    </div>
                  </div>

              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden border-t border-[#E2D9C5] dark:border-slate-800"
                  >
                    <div className="p-4 space-y-4">
                      {/* Multi-paragraph English Explanation */}
                      <div className="space-y-2 text-sm leading-relaxed text-[#1C1917] dark:text-slate-200">
                        {topic.englishParagraphs.map((para, pIdx) => (
                          <p key={pIdx}>{para}</p>
                        ))}
                      </div>

                      {/* Full Bengali Explanation */}
                      {showBn && (
                        <div className="bangla-text rounded-xl border border-emerald-600/30 bg-emerald-50/75 p-3.5 text-sm text-[#1C1917] dark:border-emerald-500/30 dark:bg-emerald-950/25 dark:text-slate-200 space-y-1.5">
                          <div className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
                            🇧🇩 বাংলায় গভীর ব্যাখ্যা
                          </div>
                          {topic.banglaParagraphs.map((bn, bIdx) => (
                            <p key={bIdx}>{bn}</p>
                          ))}
                        </div>
                      )}

                      {/* Memory Diagram */}
                      <div>
                        <div className="text-xs font-bold text-[#1C1917] dark:text-slate-200">
                          Memory &amp; Execution Flow Diagram
                        </div>
                        <pre className="mt-1.5 overflow-x-auto rounded-lg border border-[#E2D9C5] bg-slate-950 p-3 font-mono text-[11px] leading-relaxed text-cyan-300 dark:border-slate-800">
                          {topic.memoryDiagram}
                        </pre>
                      </div>

                      {/* Runnable Code Block + Load Button */}
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-[#1C1917] dark:text-slate-200">
                            <Code2 className="h-3.5 w-3.5 text-amber-600 dark:text-[#00F5D4]" aria-hidden="true" />
                            <span>Runnable Code — {topic.badge}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              onLoadIntoIde({
                                label: `${topic.badge}: ${topic.title}`,
                                code: topic.code,
                                stdin: topic.stdin,
                                expectedOutput: topic.expectedOutput,
                                keySuffix: topic.id,
                                autoRun: true,
                              })
                            }
                            className="flex items-center gap-1 rounded-md border border-amber-600/40 bg-amber-50 px-2.5 py-1 text-[11px] font-bold text-amber-900 hover:bg-amber-100 dark:border-[#00F5D4]/45 dark:bg-[#00F5D4]/10 dark:text-[#00F5D4] whitespace-nowrap"
                          >
                            <Play className="h-3 w-3" aria-hidden="true" />
                            <span>Load This Example in Editor</span>
                          </button>
                        </div>

                        <pre className="overflow-x-auto rounded-lg border border-[#E2D9C5] bg-slate-950 p-3.5 font-mono text-xs leading-relaxed text-slate-200 dark:border-slate-800">
                          {topic.code}
                        </pre>

                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 text-xs">
                          <div className="rounded-lg border border-[#E2D9C5] bg-[#EFE8D6]/50 px-3 py-2 dark:border-slate-800 dark:bg-slate-950/60">
                            <span className="font-semibold text-[#57534E] dark:text-slate-400">Sample Stdin: </span>
                            <code className="font-mono text-[#1C1917] dark:text-slate-200">
                              {topic.stdin ? topic.stdin.replace(/\n/g, ' | ') : '(none)'}
                            </code>
                          </div>
                          <div className="rounded-lg border border-[#E2D9C5] bg-[#EFE8D6]/50 px-3 py-2 dark:border-slate-800 dark:bg-slate-950/60">
                            <span className="font-semibold text-[#57534E] dark:text-slate-400">Expected Output: </span>
                            <code className="font-mono text-emerald-700 dark:text-emerald-300">
                              {topic.expectedOutput.replace(/\n/g, ' | ')}
                            </code>
                          </div>
                        </div>
                      </div>

                      {/* Line-by-Line Breakdown for this Example */}
                      {topic.lineByLine.length > 0 && (
                        <div>
                          <div className="mb-1.5 text-xs font-bold text-[#1C1917] dark:text-slate-200">
                            Line-by-Line Code Breakdown
                          </div>
                          <div className="overflow-x-auto rounded-lg border border-[#E2D9C5] dark:border-slate-800">
                            <table className="w-full text-left text-[11px] leading-snug">
                              <thead className="bg-[#EFE8D6] text-[#1C1917] dark:bg-slate-900 dark:text-slate-300">
                                <tr>
                                  <th className="px-2.5 py-2 font-semibold whitespace-nowrap">Line</th>
                                  <th className="px-2.5 py-2 font-semibold">Token</th>
                                  <th className="px-2.5 py-2 font-semibold">Meaning</th>
                                  <th className="px-2.5 py-2 font-semibold">If Deleted</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-[#E2D9C5] dark:divide-slate-800">
                                {topic.lineByLine.map((row, rIdx) => (
                                  <tr key={rIdx} className="bg-[#FCF9F2] align-top dark:bg-slate-950/60">
                                    <td className="px-2.5 py-2 font-mono font-bold text-[#57534E] dark:text-slate-400 whitespace-nowrap">
                                      {row.lineNumber}
                                    </td>
                                    <td className="px-2.5 py-2 font-mono text-amber-800 dark:text-[#00F5D4] break-words max-w-[160px]">
                                      {row.codeSnippet}
                                    </td>
                                    <td className="px-2.5 py-2 text-[#1C1917] dark:text-slate-200">
                                      {row.whatItMeans}
                                    </td>
                                    <td className="px-2.5 py-2 text-rose-700 dark:text-rose-400">
                                      {row.ifDeletedError}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
                </article>
              </SpringReveal>
            );
          })}
        </div>
      </section>
    </SpringReveal>
  );
}
