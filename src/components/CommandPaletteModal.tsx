import { BookOpen, Search, Trophy, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ALL_CONTEST_PROJECT_PROBLEMS } from '../data/contestProjectArena';
import { CP_500_PROBLEMS } from '../data/cp500';
import { INTERVIEW_200_PROBLEMS } from '../data/interview200';
import { PROBLEMS } from '../data/problems';
import { ALL_CHAPTERS, mergeCustomChapters } from '../data/syllabusBlueprint';
import type { Chapter, ContentOverrideRecord, LanguageId, Problem } from '../types/academy';
import { applyChapterOverrides, applyProblemOverrides } from '../utils/cloudMerge';
import { searchAcademyCatalog } from '../utils/gamification';

interface CommandPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectChapter: (chapterId: string, languageId: LanguageId) => void;
  onSelectProblem: (problemId: string) => void;
  customChapters?: Chapter[];
  customProblems?: Problem[];
  contentOverrides?: Record<string, ContentOverrideRecord>;
}

export function CommandPaletteModal({
  isOpen,
  onClose,
  onSelectChapter,
  onSelectProblem,
  customChapters = [],
  customProblems = [],
  contentOverrides = {},
}: CommandPaletteModalProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const mergedChapters = useMemo(
    () => applyChapterOverrides(mergeCustomChapters(ALL_CHAPTERS, customChapters), contentOverrides),
    [customChapters, contentOverrides],
  );
  const mergedProblems = useMemo(() => {
    const map = new Map<string, Problem>();
    for (const p of CP_500_PROBLEMS) map.set(p.id, p);
    for (const p of INTERVIEW_200_PROBLEMS) map.set(p.id, p);
    for (const p of ALL_CONTEST_PROJECT_PROBLEMS) map.set(p.id, p);
    for (const p of PROBLEMS) if (!map.has(p.id)) map.set(p.id, p);
    for (const cp of customProblems) map.set(cp.id, cp);
    return applyProblemOverrides(Array.from(map.values()), contentOverrides);
  }, [customProblems, contentOverrides]);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [isOpen]);

  const hits = useMemo(
    () => (isOpen ? searchAcademyCatalog(query, mergedChapters, mergedProblems, 14) : []),
    [isOpen, query, mergedChapters, mergedProblems],
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="command-palette-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.16 }}
          role="dialog"
          aria-modal="true"
          aria-label="Global Command Palette Search"
          className="fixed inset-0 z-50 flex items-start justify-center bg-slate-950/70 p-4 pt-20 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ type: 'spring', stiffness: 380, damping: 28 }}
            className="w-full max-w-2xl overflow-hidden rounded-2xl border border-[#E2D9C5] bg-[#FCF9F2] shadow-2xl dark:border-slate-800 dark:bg-[#0C1322]/95 dark:backdrop-blur-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-[#E2D9C5] px-4 py-3 dark:border-slate-800">
              <Search className="h-4 w-4 text-[#57534E] dark:text-slate-400" aria-hidden="true" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search 200 chapters, 500 CP, 200 interview, 30 contests, 25 systems..."
                aria-label="Search chapters and arena problems"
                className="w-full bg-transparent text-sm text-[#1C1917] placeholder:text-[#78716C] focus:outline-none dark:text-white dark:placeholder:text-slate-400"
              />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close search palette"
                className="rounded-md p-1 text-[#57534E] hover:bg-[#EFE8D6] dark:text-slate-400 dark:hover:bg-slate-800"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div className="max-h-96 overflow-y-auto p-2">
              {hits.length === 0 ? (
                <div className="p-8 text-center text-xs text-[#57534E] dark:text-slate-400">
                  No chapters or problems match "{query}". Try "recursion", "bfs", "rust", or "coin change".
                </div>
              ) : (
                <div className="space-y-1">
                  {hits.map((hit) => (
                    <button
                      key={`${hit.type}-${hit.id}`}
                      type="button"
                      onClick={() => {
                        if (hit.type === 'chapter' && hit.languageId) {
                          onSelectChapter(hit.id, hit.languageId);
                        } else {
                          onSelectProblem(hit.id);
                        }
                        onClose();
                      }}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-[#EFE8D6] dark:hover:bg-slate-800/80"
                    >
                      {hit.type === 'chapter' ? (
                        <BookOpen className="h-4 w-4 text-amber-600 dark:text-[#00F5D4] shrink-0" aria-hidden="true" />
                      ) : (
                        <Trophy className="h-4 w-4 text-amber-500 shrink-0" aria-hidden="true" />
                      )}
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-xs font-bold text-[#1C1917] dark:text-white">
                          {hit.title}
                        </div>
                        <div className="truncate text-[11px] text-[#57534E] dark:text-slate-400">
                          {hit.subtitle}
                        </div>
                      </div>
                      <span className="font-mono text-[10px] font-semibold text-[#57534E] dark:text-slate-400 shrink-0">
                        {hit.type === 'chapter' ? 'Chapter' : 'Problem'}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
