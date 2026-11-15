import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Search,
  Trophy,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { CP_500_PROBLEMS } from '../data/cp500';
import { PROBLEMS } from '../data/problems';
import type { ContentOverrideRecord, Problem } from '../types/academy';
import { extractProblemRating, matchesCpRatingBand, type CpRatingBand } from '../utils/chapterTopics';
import { applyProblemOverrides } from '../utils/cloudMerge';
import type { ArgonBotMood } from './ArgonBotMascot';
import { ProblemSolverWorkspace } from './ProblemSolverWorkspace';
import { SpotlightTiltCard } from './SpotlightTiltCard';
import { SpringReveal } from './SpringReveal';

interface CpArenaViewProps {
  solvedProblems: string[];
  contestRating: number;
  onProblemSolved: (problem: Problem) => void;
  onCodeRunSuccess?: (contextKey: string) => void;
  onDrillPass?: (contextKey: string) => void;
  onFinishVirtualContest?: (newRating: number) => void;
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

type PlatformFilter = 'ALL' | 'Codeforces' | 'CodeChef' | 'LeetCode' | 'AtCoder';
type RatingDiffFilter = CpRatingBand | 'Easy' | 'Medium' | 'Hard';
type SolvedFilter = 'ALL' | 'Solved' | 'Unsolved';

const PLATFORMS: { id: PlatformFilter; label: string }[] = [
  { id: 'ALL', label: 'All Platforms' },
  { id: 'Codeforces', label: 'Codeforces' },
  { id: 'CodeChef', label: 'CodeChef' },
  { id: 'LeetCode', label: 'LeetCode' },
  { id: 'AtCoder', label: 'AtCoder' },
];

const RATING_OR_DIFF: { id: RatingDiffFilter; label: string }[] = [
  { id: 'ALL', label: 'All Levels' },
  { id: 'Easy', label: 'Easy' },
  { id: 'Medium', label: 'Medium' },
  { id: 'Hard', label: 'Hard' },
  { id: '800-1000', label: '800–1000' },
  { id: '1100-1300', label: '1100–1300' },
  { id: '1400-1500', label: '1400–1500' },
  { id: '1600+', label: '1600+' },
];

const PAGE_SIZE = 18;

export function CpArenaView({
  solvedProblems,
  contestRating,
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
}: CpArenaViewProps) {
  const cpProblems = useMemo(() => {
    const map = new Map<string, Problem>();
    for (const p of CP_500_PROBLEMS) map.set(p.id, p);
    for (const cp of customProblems) if (cp.category === 'cp') map.set(cp.id, cp);
    if (initialProblemId && !map.has(initialProblemId)) {
      const legacy = PROBLEMS.find((p) => p.id === initialProblemId && p.category === 'cp');
      if (legacy) map.set(legacy.id, legacy);
    }
    return applyProblemOverrides(Array.from(map.values()), contentOverrides);
  }, [customProblems, initialProblemId, contentOverrides]);

  const allTopics = useMemo(() => {
    const set = new Set<string>();
    for (const p of cpProblems) {
      if (p.topic) set.add(p.topic);
    }
    return ['ALL', ...Array.from(set).sort()];
  }, [cpProblems]);

  const [platformFilter, setPlatformFilter] = useState<PlatformFilter>('ALL');
  const [ratingFilter, setRatingFilter] = useState<RatingDiffFilter>('ALL');
  const [topicFilter, setTopicFilter] = useState<string>('ALL');
  const [solvedFilter, setSolvedFilter] = useState<SolvedFilter>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [selectedProblemId, setSelectedProblemId] = useState<string>(
    initialProblemId && cpProblems.some((p) => p.id === initialProblemId)
      ? initialProblemId
      : cpProblems[0].id,
  );

  const solvedSet = useMemo(() => new Set(solvedProblems), [solvedProblems]);

  const filteredProblems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return cpProblems.filter((p) => {
      if (platformFilter !== 'ALL' && p.platform !== platformFilter) return false;
      if (topicFilter !== 'ALL' && p.topic !== topicFilter) return false;
      if (solvedFilter === 'Solved' && !solvedSet.has(p.id)) return false;
      if (solvedFilter === 'Unsolved' && solvedSet.has(p.id)) return false;
      if (ratingFilter === 'Easy' || ratingFilter === 'Medium' || ratingFilter === 'Hard') {
        if (p.difficulty !== ratingFilter) return false;
      } else if (!matchesCpRatingBand(p, ratingFilter)) {
        return false;
      }
      if (q) {
        const hay = `${p.id} ${p.title} ${p.banglaTitle} ${p.sourceTag} ${p.topic ?? ''} ${p.platform ?? ''}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [cpProblems, platformFilter, topicFilter, solvedFilter, solvedSet, ratingFilter, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredProblems.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);

  useEffect(() => {
    setPage(1);
  }, [platformFilter, ratingFilter, topicFilter, solvedFilter, searchQuery]);

  useEffect(() => {
    if (!initialProblemId) return;
    const idx = filteredProblems.findIndex((p) => p.id === initialProblemId);
    if (idx !== -1) {
      setSelectedProblemId(initialProblemId);
      setPage(Math.floor(idx / PAGE_SIZE) + 1);
    } else if (cpProblems.some((p) => p.id === initialProblemId)) {
      setPlatformFilter('ALL');
      setRatingFilter('ALL');
      setTopicFilter('ALL');
      setSolvedFilter('ALL');
      setSearchQuery('');
      setSelectedProblemId(initialProblemId);
    }
  }, [initialProblemId, cpProblems, filteredProblems]);

  const pagedProblems = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE;
    return filteredProblems.slice(start, start + PAGE_SIZE);
  }, [filteredProblems, safePage]);

  const activeProblem =
    filteredProblems.find((p) => p.id === selectedProblemId) ||
    filteredProblems[0] ||
    cpProblems[0];

  const totalSolvedCp = useMemo(
    () => cpProblems.filter((p) => solvedSet.has(p.id)).length,
    [cpProblems, solvedSet],
  );

  function resetAllFilters() {
    setPlatformFilter('ALL');
    setRatingFilter('ALL');
    setTopicFilter('ALL');
    setSolvedFilter('ALL');
    setSearchQuery('');
    setPage(1);
  }

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6 space-y-5">
      {/* CP Arena Header */}
      <SpringReveal index={0}>
        <section className="obsidian-glass-card flex flex-wrap items-center justify-between gap-4 rounded-2xl p-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              <Trophy className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Department 3 · Ace Coding Hub — Top {cpProblems.length} Competitive Programming Archive</span>
            </div>
            <h1 className="mt-1 font-display text-xl font-bold text-[#1C1917] dark:text-white sm:text-2xl">
              Ace Coding Hub CP Arena — Codeforces · CodeChef · LeetCode · AtCoder
            </h1>
            <p className="mt-1 text-xs text-[#57534E] dark:text-slate-400">
              125 iconic problems per platform · 12+ Judge Tests · 3 Progressive Hints · সহজ বাংলা Intuition
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 rounded-xl border border-[#E2D9C5] bg-[#EFE8D6]/70 px-4 py-2.5 dark:border-white/[0.08] dark:bg-[#07090D]/80">
            <div>
              <div className="text-[11px] font-semibold text-[#57534E] dark:text-slate-400">CP Solved</div>
              <div className="font-mono text-sm font-bold tabular-nums text-[#1C1917] dark:text-white">
                {totalSolvedCp}/{cpProblems.length}
              </div>
            </div>
            <span className="h-6 w-px bg-[#D6CCB4] dark:bg-white/10" aria-hidden="true" />
            <div>
              <div className="text-[11px] font-semibold text-[#57534E] dark:text-slate-400">Rating</div>
              <div className="font-mono text-sm font-bold tabular-nums text-emerald-700 dark:text-emerald-400">
                {contestRating}
              </div>
            </div>
          </div>
        </section>
      </SpringReveal>

      {/* Multi-Axis Filters & Instant Search */}
      <SpringReveal index={1}>
        <div className="obsidian-glass-card space-y-3 rounded-2xl p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Filter by Platform">
              <span className="mr-1 text-[11px] font-bold text-[#57534E] dark:text-slate-400">Platform:</span>
              {PLATFORMS.map((plat) => (
                <button
                  key={plat.id}
                  type="button"
                  aria-pressed={platformFilter === plat.id}
                  onClick={() => setPlatformFilter(plat.id)}
                  className={`rounded-md px-2.5 py-1 text-xs font-semibold transition-colors whitespace-nowrap ${
                    platformFilter === plat.id
                      ? 'bg-[#1C1917] text-[#FCF9F2] dark:bg-emerald-500 dark:text-slate-950'
                      : 'bg-[#EFE8D6] text-[#57534E] hover:bg-[#E2D9C5] dark:bg-[#07090D]/80 dark:text-slate-300 dark:hover:bg-slate-800'
                  }`}
                >
                  {plat.label}
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
                placeholder="Search 500 CP problems..."
                aria-label="Search CP Arena problems"
                className="w-full rounded-lg border border-[#E2D9C5] bg-[#FCF9F2] py-1.5 pl-8 pr-3 text-xs text-[#1C1917] placeholder:text-[#78716C] focus:border-emerald-600 focus:outline-none dark:border-white/[0.1] dark:bg-[#07090D] dark:text-white dark:focus:border-emerald-400"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#E2D9C5] pt-2.5 dark:border-white/[0.08]">
            <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Filter by Rating or Difficulty">
              <span className="mr-1 text-[11px] font-bold text-[#57534E] dark:text-slate-400">Level:</span>
              {RATING_OR_DIFF.map((band) => (
                <button
                  key={band.id}
                  type="button"
                  aria-pressed={ratingFilter === band.id}
                  onClick={() => setRatingFilter(band.id)}
                  className={`rounded-md px-2.5 py-1 text-xs font-mono font-semibold transition-colors whitespace-nowrap ${
                    ratingFilter === band.id
                      ? 'bg-emerald-600 text-white dark:bg-emerald-500 dark:text-slate-950'
                      : 'bg-[#EFE8D6] text-[#57534E] hover:bg-[#E2D9C5] dark:bg-[#07090D]/80 dark:text-slate-300 dark:hover:bg-slate-800'
                  }`}
                >
                  {band.label}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <label className="flex items-center gap-1.5 text-xs">
                <span className="text-[11px] font-bold text-[#57534E] dark:text-slate-400">Topic:</span>
                <select
                  value={topicFilter}
                  onChange={(e) => setTopicFilter(e.target.value)}
                  className="rounded-md border border-[#E2D9C5] bg-[#FCF9F2] px-2.5 py-1 text-xs font-semibold text-[#1C1917] focus:border-emerald-600 focus:outline-none dark:border-white/[0.1] dark:bg-[#07090D] dark:text-slate-200"
                >
                  {allTopics.map((topic) => (
                    <option key={topic} value={topic}>
                      {topic === 'ALL' ? 'All Topics' : topic}
                    </option>
                  ))}
                </select>
              </label>

              <div className="flex items-center gap-1 rounded-md bg-[#EFE8D6] p-0.5 dark:bg-[#07090D]/80" role="group" aria-label="Filter by Solved Status">
                {(['ALL', 'Unsolved', 'Solved'] as SolvedFilter[]).map((st) => (
                  <button
                    key={st}
                    type="button"
                    aria-pressed={solvedFilter === st}
                    onClick={() => setSolvedFilter(st)}
                    className={`rounded px-2 py-1 text-xs font-semibold transition-colors ${
                      solvedFilter === st
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

          {/* Pagination & Result Counter */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#E2D9C5] pt-2.5 text-xs text-[#57534E] dark:border-white/[0.08] dark:text-slate-400">
            <span className="font-mono tabular-nums">
              Showing {filteredProblems.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1}–
              {Math.min(safePage * PAGE_SIZE, filteredProblems.length)} of {filteredProblems.length} matching problems
            </span>
            <div className="flex items-center gap-1.5">
              {(platformFilter !== 'ALL' ||
                ratingFilter !== 'ALL' ||
                topicFilter !== 'ALL' ||
                solvedFilter !== 'ALL' ||
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

      {/* Problem Grid */}
      {filteredProblems.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[#E2D9C5] bg-[#FCF9F2]/80 p-8 text-center text-sm text-[#57534E] dark:border-white/[0.1] dark:bg-[#0E131D]/65 dark:text-slate-400">
          No CP problems match that exact filter combination.{' '}
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
            const rating = prob.rating ?? extractProblemRating(prob);

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
                        {prob.sourceTag}
                      </span>
                      <span className="shrink-0 font-mono font-semibold tabular-nums">
                        {prob.starTier ? `${prob.starTier} · ` : rating ? `${rating} · ` : ''}
                        +{prob.xpReward} XP
                      </span>
                    </div>
                    <div className="mt-1.5 flex items-center justify-between gap-2">
                      <span className="font-display text-sm font-bold text-[#1C1917] dark:text-white truncate">
                        {prob.title}
                      </span>
                      {isSolved && (
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" aria-label="Solved" />
                      )}
                    </div>
                    <div className="bangla-text mt-1 text-xs text-[#57534E] dark:text-slate-400 truncate">
                      {prob.banglaTitle}
                    </div>
                    <div className="mt-1.5 text-[11px] font-medium text-[#78716C] dark:text-slate-400 truncate">
                      {prob.topic ?? 'Algorithms'} · {prob.difficulty}
                    </div>
                  </div>
                </SpotlightTiltCard>
              </SpringReveal>
            );
          })}
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
