import { Printer, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { LANGUAGE_MAP } from '../data/languages';
import type { Chapter } from '../types/academy';

interface CheatSheetModalProps {
  isOpen: boolean;
  chapter: Chapter;
  onClose: () => void;
}

export function CheatSheetModal({ isOpen, chapter, onClose }: CheatSheetModalProps) {
  const lang = LANGUAGE_MAP[chapter.languageId];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="cheat-sheet-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.16 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="cheat-sheet-title"
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ type: 'spring', stiffness: 360, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className="print-only-sheet relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-[#E2D9C5] bg-[#FCF9F2] p-6 shadow-2xl dark:border-slate-800 dark:bg-[#0C1322]/95 dark:backdrop-blur-xl"
          >
            <div className="no-print flex items-center justify-between gap-4 border-b border-[#E2D9C5] pb-4 dark:border-slate-800">
              <div>
                <h2 id="cheat-sheet-title" className="font-display text-lg font-bold text-[#1C1917] dark:text-white">
                  {lang.name} Ch {chapter.number} — Printable Cheat Sheet
                </h2>
                <p className="text-xs text-[#57534E] dark:text-slate-400">
                  {chapter.title} · Bilingual Quick Reference
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="flex items-center gap-1.5 rounded-lg bg-amber-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-amber-700 dark:bg-[#00F5D4] dark:text-slate-950"
                >
                  <Printer className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Print / Save PDF</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close cheat sheet"
                  className="rounded-lg border border-[#E2D9C5] p-1.5 text-[#57534E] hover:bg-[#EFE8D6] dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="mt-5 space-y-5 text-sm">
              <div>
                <h3 className="font-bold text-[#1C1917] dark:text-white">TL;DR</h3>
                <p className="mt-1 text-[#57534E] dark:text-slate-300">{chapter.visualMode.tldr}</p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-[#E2D9C5] bg-[#F7F3E8] p-3.5 dark:border-slate-800 dark:bg-[#070B14]/60">
                  <h4 className="text-xs font-bold text-amber-700 dark:text-[#00F5D4]">
                    {lang.name} Quick Syntax Reference
                  </h4>
                  <dl className="mt-2 space-y-2 text-xs">
                    {lang.cheatSheetQuickRef.map((ref) => (
                      <div key={ref.label}>
                        <dt className="font-semibold text-[#1C1917] dark:text-slate-200">{ref.label}</dt>
                        <dd className="mt-0.5 font-mono text-[11px] text-[#57534E] dark:text-slate-400">
                          {ref.syntax}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <div className="rounded-lg border border-[#E2D9C5] bg-[#F7F3E8] p-3.5 dark:border-slate-800 dark:bg-[#070B14]/60">
                  <h4 className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                    🇧🇩 বাংলা শর্ট নোট
                  </h4>
                  <p className="bangla-text mt-2 text-xs text-[#1C1917] dark:text-slate-300">
                    {chapter.banglaExplanation.summary}
                  </p>
                  <p className="bangla-text mt-2 text-xs font-medium text-[#57534E] dark:text-slate-400">
                    {chapter.banglaExplanation.memoryAnalogy}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-[#1C1917] dark:text-white">ASCII Architecture / Trace</h4>
                <pre className="mt-1.5 overflow-x-auto rounded-lg bg-[#070B14] p-3 font-mono text-xs text-[#00F5D4]">
                  {chapter.visualMode.asciiDiagram}
                </pre>
              </div>

              <div>
                <h4 className="text-xs font-bold text-[#1C1917] dark:text-white">Reference Code</h4>
                <pre className="mt-1.5 overflow-x-auto rounded-lg bg-[#070B14] p-3 font-mono text-xs text-slate-200">
                  {chapter.starterCode}
                </pre>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
