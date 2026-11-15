import {
  Bookmark,
  Briefcase,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Flag,
  RotateCcw,
  Search,
} from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { useEffect, useMemo, useState } from 'react';
import { INTERVIEW_200_PROBLEMS } from '../data/interview200';
import { PROBLEMS } from '../data/problems';
import type { ContentOverrideRecord, Problem } from '../types/academy';
import { applyProblemOverrides } from '../utils/cloudMerge';
import type { ArgonBotMood } from './ArgonBotMascot';
import { ProblemSolverWorkspace } from './ProblemSolverWorkspace';
import { SpotlightTiltCard } from './SpotlightTiltCard';
import { SpringReveal } from './SpringReveal';

interface InterviewSheetViewProps {
  solvedProblems: string[];
  onProblemSolved: (problem: Problem) => void;
  onCodeRunSuccess?: (contextKey: string) => void;
  onDrillPass?: (contextKey: string) => void;
  onMoodChange?: (mood: ArgonBotMood) => void;
  mascotMood?: ArgonBotMood;
  initialProblemId?: string | null;
  customProblems?: Problem[];
  contentOverrides?: Record<string, ContentOverrideRecord>;
  isAdmin?: boolean;
  onOpenAdminEdit?: (problem: Problem) => void;
  getSavedCode?: (itemId: string, language: string) => string | null;
  onSaveCode?: (itemId: string, language: string, code: string) => void;
}

const INTERVIEW_META_STORAGE_KEY = 'argoncode_interview_meta_v1';

interface InterviewMetaState {
  revisionIds: string[];
  bookmarkedIds: string[];
}

function loadInterviewMeta(): InterviewMetaState {
  if (typeof window === 'undefined') return { revisionIds: [], bookmarkedIds: [] };
  try {
    const raw = window.localStorage.getItem(INTERVIEW_META_STORAGE_KEY);
    if (!raw) return { revisionIds: [], bookmarkedIds: [] };
    const parsed = JSON.parse(raw) as Partial<InterviewMetaState>;
    return {
      revisionIds: Array.isArray(parsed.revisionIds) ? parsed.revisionIds : [],
      bookmarkedIds: Array.isArray(parsed.bookmarkedIds) ? parsed.bookmarkedIds : [],
    };
  } catch {
    return { revisionIds: [], bookmarkedIds: [] };
  }
}

const COMPANIES = [
  'ALL',
  'Google',
  'Meta',
  'Amazon',
  'Microsoft',
  'Apple',
  'Netflix',
  'Uber',
  'Stripe',
] as const;

const DIFFICULTIES = ['ALL', 'Easy', 'Medium', 'Hard'] as const;
const STATUSES = ['ALL', 'Solved', 'Needs Revision', 'Bookmarked', 'Unsolved'] as const;
const PAGE_SIZE = 18;

export function InterviewSheetView({
  solvedProblems,
  onProblemSolved,
  onCodeRunSuccess,
  onDrillPass,
  onMoodChange,
  mascotMood = 'idle',
  initialProblemId,
  customProblems = [],
  contentOverrides = {},
  isAdmin = false,
  onOpenAdminEdit,
  getSavedCode,
  onSaveCode,
}: InterviewSheetViewProps) {
  const prefersReducedMotion = useReducedMotion();

  const interviewProblems = useMemo(() => {
    const map = new Map<string, Problem>();
    for (const p of INTERVIEW_200_PROBLEMS) map.set(p.id, p);
    for (const cp of customProblems) if (cp.category === 'interview') map.set(cp.id, cp);
    if (initialProblemId && !map.has(initialProblemId)) {
      const legacy = PROBLEMS.find((p) => p.id === initialProblemId && p.category === 'interview');
      if (legacy) map.set(legacy.id, legacy);
    }
    return applyProblemOverrides(Array.from(map.values()), contentOverrides);
  }, [customProblems, initialProblemId, contentOverrides]);

  const allPatterns = useMemo(() => {
    const set = new Set<string>();
    for (const p of interviewProblems) {
      if (p.topic) set.add(p.topic);
      if (p.patterns) {
        for (const pat of p.patterns) set.add(pat);
      }
    }
    return ['ALL', ...Array.from(set).sort()];
  }, [interviewProblems]);

  const [meta, setMeta] = useState<InterviewMetaState>(() => loadInterviewMeta());
  const [companyFilter, setCompanyFilter] = useState<(typeof COMPANIES)[number]>('ALL');
  const [difficultyFilter, setDifficultyFilter] = useState<(typeof DIFFICULTIES)[number]>('ALL');
  const [patternFilter, setPatternFilter] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<(typeof STATUSES)[number]>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [selectedProblemId, setSelectedProblemId] = useState<string>(
    initialProblemId && interviewProblems.some((p) => p.id === initialProblemId)
      ? initialProblemId
      : interviewProblems[0].id,
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(INTERVIEW_META_STORAGE_KEY, JSON.stringify(meta));
    } catch {
      // Ignore storage quota errors
    }
  }, [meta]);

  const solvedSet = useMemo(() => new Set(solvedProblems), [solvedProblems]);
  const revisionSet = useMemo(() => new Set(meta.revisionIds), [meta.revisionIds]);
  const bookmarkedSet = useMemo(() => new Set(meta.bookmarkedIds), [meta.bookmarkedIds]);

  const filteredProblems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return interviewProblems.filter((p) => {
      if (companyFilter !== 'ALL' && !p.companyTags.includes(companyFilter)) return false;
      if (difficultyFilter !== 'ALL' && p.difficulty !== difficultyFilter) return false;
      if (patternFilter !== 'ALL') {
        const matchesTopic = p.topic === patternFilter;
        const matchesPatterns = p.patterns?.includes(patternFilter) ?? false;
        if (!matchesTopic && !matchesPatterns) return false;
      }
      if (statusFilter === 'Solved' && !solvedSet.has(p.id)) return false;
      if (statusFilter === 'Unsolved' && solvedSet.has(p.id)) return false;
      if (statusFilter === 'Needs Revision' && !revisionSet.has(p.id)) return false;
      if (statusFilter === 'Bookmarked' && !bookmarkedSet.has(p.id)) return false;
      if (q) {
        const hay = `${p.id} ${p.title} ${p.banglaTitle} ${p.topic ?? ''} ${(p.patterns ?? []).join(' ')} ${p.companyTags.join(' ')}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [
    interviewProblems,
    companyFilter,
    difficultyFilter,
    patternFilter,
    statusFilter,
    searchQuery,
    solvedSet,
    revisionSet,
    bookmarkedSet,
  ]);

  const totalPages = Math.max(1, Math.ceil(filteredProblems.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);

  useEffect(() => {
    setPage(1);
  }, [companyFilter, difficultyFilter, patternFilter, statusFilter, searchQuery]);

  useEffect(() => {
    if (!initialProblemId) return;
    const idx = filteredProblems.findIndex((p) => p.id === initialProblemId);
    if (idx !== -1) {
      setSelectedProblemId(initialProblemId);
      setPage(Math.floor(idx / PAGE_SIZE) + 1);
    } else if (interviewProblems.some((p) => p.id === initialProblemId)) {
      setCompanyFilter('ALL');
      setDifficultyFilter('ALL');
      setPatternFilter('ALL');
      setStatusFilter('ALL');
      setSearchQuery('');
      setSelectedProblemId(initialProblemId);
    }
  }, [initialProblemId, interviewProblems, filteredProblems]);

  const pagedProblems = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE;
    return filteredProblems.slice(start, start + PAGE_SIZE);
  }, [filteredProblems, safePage]);

  const activeProblem =
    filteredProblems.find((p) => p.id === selectedProblemId) ||
    filteredProblems[0] ||
    interviewProblems[0];

  const solvedCount = interviewProblems.filter((p) => solvedSet.has(p.id)).length;
  const revisionCount = interviewProblems.filter((p) => revisionSet.has(p.id)).length;
  const bookmarkedCount = interviewProblems.filter((p) => bookmarkedSet.has(p.id)).length;
  const pct = interviewProblems.length ? Math.round((solvedCount / interviewProblems.length) * 100) : 0;

  function toggleRevision(problemId: string) {
    setMeta((prev) => {
      const exists = prev.revisionIds.includes(problemId);
      return {
        ...prev,
        revisionIds: exists
          ? prev.revisionIds.filter((id) => id !== problemId)
          : [...prev.revisionIds, problemId],
      };
    });
  }

  function toggleBookmark(problemId: string) {
    setMeta((prev) => {
      const exists = prev.bookmarkedIds.includes(problemId);
      return {
        ...prev,
        bookmarkedIds: exists
          ? prev.bookmarkedIds.filter((id) => id !== problemId)
          : [...prev.bookmarkedIds, problemId],
      };
    });
  }

  function resetAllFilters() {
    setCompanyFilter('ALL');
    setDifficultyFilter('ALL');
    setPatternFilter('ALL');
    setStatusFilter('ALL');
    setSearchQuery('');
    setPage(1);
  }

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6 space-y-5">
      {/* Tech Interview Readiness Dashboard Header */}
      <SpringReveal index={0}>
        <section className="obsidian-glass-card flex flex-wrap items-center justify-between gap-4 rounded-2xl p-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              <Briefcase className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Department 4 · Ace Coding Hub — Top {interviewProblems.length} Must-Ask Job Interview Tracker</span>
            </div>
            <h1 className="mt-1 font-display text-xl font-bold text-[#1C1917] dark:text-white sm:text-2xl">
              Job Interviews — Top 200 Company &amp; Pattern Sheet
            </h1>
            <p className="mt-1 text-xs text-[#57534E] dark:text-slate-400">
              Google · Meta · Amazon · Microsoft · Apple · Netflix · Uber · Stripe · Persistent Readiness Dashboard
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 rounded-xl border border-[#E2D9C5] bg-[#EFE8D6]/70 px-4 py-2.5 dark:border-white/[0.08] dark:bg-[#07090D]/80">
            <div>
              <div className="text-[11px] font-semibold text-[#57534E] dark:text-slate-400">Solved</div>
              <div className="font-mono text-sm font-bold tabular-nums text-emerald-700 dark:text-emerald-400">
                {solvedCount}/{interviewProblems.length} ({pct}%)
              </div>
            </div>
            <span className="h-6 w-px bg-[#D6CCB4] dark:bg-white/10" aria-hidden="true" />
            <div>
              <div className="text-[11px] font-semibold text-[#57534E] dark:text-slate-400">Needs Revision</div>
              <div className="font-mono text-sm font-bold tabular-nums text-amber-700 dark:text-amber-300">
                {revisionCount}
              </div>
            </div>
            <span className="h-6 w-px bg-[#D6CCB4] dark:bg-white/10" aria-hidden="true" />
            <div>
              <div className="text-[11px] font-semibold text-[#57534E] dark:text-slate-400">Bookmarked</div>
              <div className="font-mono text-sm font-bold tabular-nums text-cyan-700 dark:text-cyan-300">
                {bookmarkedCount}
              </div>
            </div>
            <div className="h-2 w-24 overflow-hidden rounded-full bg-[#E2D9C5] dark:bg-slate-800">
              <motion.div
                initial={false}
                animate={{ scaleX: Math.max(0.02, pct / 100) }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : { type: 'spring', stiffness: 260, damping: 24 }
                }
                className="h-full origin-left rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-cyan-400"
              />
            </div>
          </div>
        </section>
      </SpringReveal>

      {/* Company, Difficulty, Pattern, Status & Instant Search Filter Bar */}
      <SpringReveal index={1}>
        <div className="obsidian-glass-card space-y-3 rounded-2xl p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Filter by Company">
              <span className="mr-1 text-[11px] font-bold text-[#57534E] dark:text-slate-400">Company:</span>
              {COMPANIES.map((comp) => (
                <button
                  key={comp}
                  type="button"
                  aria-pressed={companyFilter === comp}
                  onClick={() => setCompanyFilter(comp)}
                  className={`rounded-md px-2.5 py-1 text-xs font-semibold transition-colors whitespace-nowrap ${
                    companyFilter === comp
                      ? 'bg-emerald-600 text-white dark:bg-emerald-500 dark:text-slate-950'
                      : 'bg-[#EFE8D6] text-[#57534E] hover:bg-[#E2D9C5] dark:bg-[#07090D]/80 dark:text-slate-300 dark:hover:bg-slate-800'
                  }`}
                >
                  {comp === 'ALL' ? 'All Companies' : comp}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-72">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#78716C]"
                aria-hidden="true"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search 200 interview questions..."
                aria-label="Search Top 200 interview problems"
                className="w-full rounded-lg border border-[#E2D9C5] bg-[#FCF9F2] py-1.5 pl-8 pr-3 text-xs text-[#1C1917] placeholder:text-[#78716C] focus:border-emerald-600 focus:outline-none dark:border-white/[0.1] dark:bg-[#07090D] dark:text-white dark:focus:border-emerald-400"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#E2D9C5] pt-2.5 dark:border-white/[0.08]">
            <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Filter by Difficulty">
              <span className="mr-1 text-[11px] font-bold text-[#57534E] dark:text-slate-400">Difficulty:</span>
              {DIFFICULTIES.map((diff) => (
                <button
                  key={diff}
                  type="button"
                  aria-pressed={difficultyFilter === diff}
                  onClick={() => setDifficultyFilter(diff)}
                  className={`rounded-md px-2.5 py-1 text-xs font-semibold transition-colors whitespace-nowrap ${
                    difficultyFilter === diff
                      ? 'bg-[#1C1917] text-[#FCF9F2] dark:bg-slate-100 dark:text-slate-950'
                      : 'bg-[#EFE8D6] text-[#57534E] hover:bg-[#E2D9C5] dark:bg-[#07090D]/80 dark:text-slate-300 dark:hover:bg-slate-800'
                  }`}
                >
                  {diff === 'ALL' ? 'All' : diff}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <label className="flex items-center gap-1.5 text-xs">
                <span className="text-[11px] font-bold text-[#57534E] dark:text-slate-400">Pattern:</span>
                <select
                  value={patternFilter}
                  onChange={(e) => setPatternFilter(e.target.value)}
                  className="rounded-md border border-[#E2D9C5] bg-[#FCF9F2] px-2.5 py-1 text-xs font-semibold text-[#1C1917] focus:border-emerald-600 focus:outline-none dark:border-white/[0.1] dark:bg-[#07090D] dark:text-slate-200"
                >
                  {allPatterns.map((pattern) => (
                    <option key={pattern} value={pattern}>
                      {pattern === 'ALL' ? `All Patterns (${interviewProblems.length})` : pattern}
                    </option>
                  ))}
                </select>
              </label>

              <div className="flex flex-wrap items-center gap-1 rounded-md bg-[#EFE8D6] p-0.5 dark:bg-[#07090D]/80" role="group" aria-label="Filter by Readiness Status">
                {STATUSES.map((st) => (
                  <button
                    key={st}
                    type="button"
                    aria-pressed={statusFilter === st}
                    onClick={() => setStatusFilter(st)}
                    className={`rounded px-2 py-1 text-xs font-semibold transition-colors whitespace-nowrap ${
                      statusFilter === st
                        ? 'bg-[#FCF9F2] text-emerald-800 shadow-sm dark:bg-emerald-500/20 dark:text-emerald-300'
                        : 'text-[#57534E] dark:text-slate-400'
                    }`}
                  >
                    {st === 'ALL' ? 'All' : st}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#E2D9C5] pt-2.5 text-xs text-[#57534E] dark:border-white/[0.08] dark:text-slate-400">
            <span className="font-mono tabular-nums">
              Showing {filteredProblems.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1}–
              {Math.min(safePage * PAGE_SIZE, filteredProblems.length)} of {filteredProblems.length} interview problems
            </span>
            <div className="flex items-center gap-1.5">
              {(companyFilter !== 'ALL' ||
                difficultyFilter !== 'ALL' ||
                patternFilter !== 'ALL' ||
                statusFilter !== 'ALL' ||
                searchQuery.trim() !== '') && (
                <button
                  type="button"
                  onClick={resetAllFilters}
                  className="mr-2 flex items-center gap-1 rounded-md border border-[#E2D9C5] px-2 py-1 text-xs font-semibold text-[#1C1917] hover:bg-[#EFE8D6] dark:border-white/[0.1] dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  <RotateCcw className="h-3 w-3" aria-hidden="true" />
                  <span>Reset</span>
                </button>
              )}
              <button
                type="button"
                disabled={safePage <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                aria-label="Previous page"
                className="rounded-md border border-[#E2D9C5] bg-[#FCF9F2] p-1 text-[#1C1917] disabled:opacity-40 dark:border-white/[0.08] dark:bg-[#07090D] dark:text-slate-200"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="px-2 font-mono font-semibold tabular-nums text-[#1C1917] dark:text-slate-200">
                Page {safePage} / {totalPages}
              </span>
              <button
                type="button"
                disabled={safePage >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                aria-label="Next page"
                className="rounded-md border border-[#E2D9C5] bg-[#FCF9F2] p-1 text-[#1C1917] disabled:opacity-40 dark:border-white/[0.08] dark:bg-[#07090D] dark:text-slate-200"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </SpringReveal>

      {/* Problem Selector Grid */}
      {filteredProblems.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[#E2D9C5] bg-[#FCF9F2]/80 p-8 text-center text-sm text-[#57534E] dark:border-white/[0.1] dark:bg-[#0E131D]/65 dark:text-slate-400">
          No interview problems match that filter combination.{' '}
          <button
            type="button"
            onClick={resetAllFilters}
            className="font-bold text-emerald-700 underline dark:text-emerald-400"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {pagedProblems.map((prob, idx) => {
            const isSelected = prob.id === activeProblem.id;
            const isSolved = solvedSet.has(prob.id);
            const isRevision = revisionSet.has(prob.id);
            const isBookmarked = bookmarkedSet.has(prob.id);

            return (
              <SpringReveal key={prob.id} index={idx} staggerSeconds={0.02} className="h-full">
                <SpotlightTiltCard
                  onClick={() => setSelectedProblemId(prob.id)}
                  ariaPressed={isSelected}
                  tiltStrength={4}
                  className={`h-full w-full rounded-xl border p-4 text-left backdrop-blur-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                    isSelected
                      ? 'border-emerald-600/80 bg-[#FCF9F2] shadow-[0_0_24px_-10px_rgba(16,185,129,0.45)] dark:border-emerald-400/75 dark:bg-[#0E131D]/95'
                      : 'border-[#E2D9C5] bg-[#FCF9F2]/80 hover:border-emerald-500/45 hover:bg-[#FCF9F2] dark:border-white/[0.08] dark:bg-[#0E131D]/85 dark:hover:border-emerald-400/40'
                  }`}
                >
                  <div className="w-full min-w-0">
                    <div className="flex items-center justify-between gap-2 text-xs text-[#57534E] dark:text-slate-400">
                      <span className="truncate font-semibold text-emerald-700 dark:text-emerald-400">
                        {prob.patterns?.[0] || prob.topic || prob.sourceTag}
                      </span>
                      <span className="shrink-0 font-mono font-semibold tabular-nums">
                        {prob.difficulty} · +{prob.xpReward} XP
                      </span>
                    </div>
                    <div className="mt-1.5 flex items-center justify-between gap-2">
                      <span className="font-display text-sm font-bold text-[#1C1917] dark:text-white truncate">
                        {prob.title}
                      </span>
                      <div className="flex items-center gap-1.5 shrink-0">
                        {isRevision && (
                          <Flag className="h-3.5 w-3.5 text-amber-500" aria-label="Needs Revision" />
                        )}
                        {isBookmarked && (
                          <Bookmark className="h-3.5 w-3.5 text-cyan-500 fill-cyan-500/30" aria-label="Bookmarked" />
                        )}
                        {isSolved && (
                          <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" aria-label="Solved" />
                        )}
                      </div>
                    </div>
                    <div className="bangla-text mt-1 text-xs text-[#57534E] dark:text-slate-400 truncate">
                      {prob.banglaTitle}
                    </div>
                    <div className="mt-2 text-[11px] font-medium text-[#57534E] dark:text-slate-400 truncate">
                      {prob.companyTags.slice(0, 4).join(' · ')}
                    </div>
                  </div>
                </SpotlightTiltCard>
              </SpringReveal>
            );
          })}
        </div>
      )}

      {/* Active Problem Quick Readiness Toolbar */}
      {activeProblem && (
        <div className="obsidian-glass-card flex flex-wrap items-center justify-between gap-3 rounded-xl px-4 py-2.5">
          <div className="text-xs font-semibold text-[#1C1917] dark:text-slate-200 truncate">
            Active Track: <span className="text-emerald-700 dark:text-emerald-400">{activeProblem.title}</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => toggleRevision(activeProblem.id)}
              aria-pressed={revisionSet.has(activeProblem.id)}
              className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap ${
                revisionSet.has(activeProblem.id)
                  ? 'border-amber-500/50 bg-amber-500/15 text-amber-800 dark:text-amber-300'
                  : 'border-[#E2D9C5] bg-[#FCF9F2] text-[#57534E] hover:bg-[#EFE8D6] dark:border-white/[0.1] dark:bg-[#07090D] dark:text-slate-300'
              }`}
            >
              <Flag className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{revisionSet.has(activeProblem.id) ? 'Flagged: Needs Revision' : 'Flag Needs Revision'}</span>
            </button>

            <button
              type="button"
              onClick={() => toggleBookmark(activeProblem.id)}
              aria-pressed={bookmarkedSet.has(activeProblem.id)}
              className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap ${
                bookmarkedSet.has(activeProblem.id)
                  ? 'border-cyan-500/50 bg-cyan-500/15 text-cyan-800 dark:text-cyan-300'
                  : 'border-[#E2D9C5] bg-[#FCF9F2] text-[#57534E] hover:bg-[#EFE8D6] dark:border-white/[0.1] dark:bg-[#07090D] dark:text-slate-300'
              }`}
            >
              <Bookmark className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{bookmarkedSet.has(activeProblem.id) ? 'Bookmarked' : 'Bookmark Problem'}</span>
            </button>
          </div>
        </div>
      )}

      <ProblemSolverWorkspace
        problem={activeProblem}
        solvedProblems={solvedProblems}
        onAcceptedProblem={() => onProblemSolved(activeProblem)}
        onCodeRunSuccess={onCodeRunSuccess}
        onDrillPass={onDrillPass}
        onMoodChange={onMoodChange}
        mascotMood={mascotMood}
        showDryRunAnimator={true}
        isAdmin={isAdmin}
        hasOverride={Boolean(contentOverrides[activeProblem.id])}
        onOpenAdminEdit={onOpenAdminEdit}
        getSavedCode={getSavedCode}
        onSaveCode={onSaveCode}
      />
    </div>
  );
}
