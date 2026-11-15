import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Cpu,
  Pause,
  Play,
  Rocket,
  RotateCcw,
  Search,
  Server,
  Trophy,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import {
  LIVE_CONTEST_ROUNDS,
  SYSTEM_ENGINEERING_CHALLENGES,
} from '../data/contestProjectArena';
import type { ContentOverrideRecord, ContestRound, JudgeSubmissionReport, Problem } from '../types/academy';
import { applySingleProblemOverride } from '../utils/cloudMerge';
import { calculateContestRatingDelta } from '../utils/gamification';
import type { ArgonBotMood } from './ArgonBotMascot';
import { ProblemSolverWorkspace } from './ProblemSolverWorkspace';
import { SpotlightTiltCard } from './SpotlightTiltCard';
import { SpringReveal } from './SpringReveal';

interface ContestProjectArenaProps {
  solvedProblems: string[];
  contestRating: number;
  onProblemSolved: (problem: Problem) => void;
  onFinishContest?: (newRating: number) => void;
  onCodeRunSuccess?: (contextKey: string) => void;
  onDrillPass?: (contextKey: string) => void;
  onMoodChange?: (mood: ArgonBotMood) => void;
  mascotMood?: ArgonBotMood;
  initialProblemId?: string | null;
  contentOverrides?: Record<string, ContentOverrideRecord>;
  isAdmin?: boolean;
  onOpenAdminEdit?: (problem: Problem) => void;
  getSavedCode?: (itemId: string, language: string) => string | null;
  onSaveCode?: (itemId: string, language: string, code: string) => void;
}

const ROUND_PLATFORMS: Array<'ALL' | ContestRound['platform']> = [
  'ALL',
  'Codeforces Div. 3',
  'Codeforces Div. 2',
  'AtCoder ABC',
  'AtCoder ARC',
  'Google OA',
];

const ROUND_BANDS: Array<'ALL' | ContestRound['difficultyBand']> = [
  'ALL',
  'Beginner',
  'Intermediate',
  'Advanced',
  'Grandmaster',
];

const ROUNDS_PAGE_SIZE = 9;
const SYS_PAGE_SIZE = 12;

export function ContestProjectArena({
  solvedProblems,
  contestRating,
  onProblemSolved,
  onFinishContest,
  onCodeRunSuccess,
  onDrillPass,
  onMoodChange,
  mascotMood = 'idle',
  initialProblemId,
  contentOverrides = {},
  isAdmin = false,
  onOpenAdminEdit,
  getSavedCode,
  onSaveCode,
}: ContestProjectArenaProps) {
  const solvedSet = useMemo(() => new Set(solvedProblems), [solvedProblems]);

  const initialMode = useMemo<'contest' | 'projects'>(() => {
    if (initialProblemId && SYSTEM_ENGINEERING_CHALLENGES.some((c) => c.problem.id === initialProblemId)) {
      return 'projects';
    }
    return 'contest';
  }, [initialProblemId]);

  const [arenaMode, setArenaMode] = useState<'contest' | 'projects'>(initialMode);

  // ---- Mode 1: Live Contest Simulator State ----
  const [platformFilter, setPlatformFilter] = useState<'ALL' | ContestRound['platform']>('ALL');
  const [bandFilter, setBandFilter] = useState<'ALL' | ContestRound['difficultyBand']>('ALL');
  const [roundPage, setRoundPage] = useState<number>(1);
  const [selectedRoundId, setSelectedRoundId] = useState<string>(LIVE_CONTEST_ROUNDS[0].id);
  const [activeSlot, setActiveSlot] = useState<'A' | 'B' | 'C' | 'D' | 'E'>('A');

  const [contestRunning, setContestRunning] = useState<boolean>(false);
  const [contestPaused, setContestPaused] = useState<boolean>(false);
  const [secondsLeft, setSecondsLeft] = useState<number>(LIVE_CONTEST_ROUNDS[0].durationMinutes * 60);
  const [roundSolvedSlots, setRoundSolvedSlots] = useState<string[]>([]);
  const [wrongAttempts, setWrongAttempts] = useState<Record<string, number>>({});
  const [contestSummary, setContestSummary] = useState<{
    newRating: number;
    delta: number;
    performanceRating: number;
    totalScore: number;
    totalPenaltyMinutes: number;
  } | null>(null);

  // ---- Mode 2: System Engineering Challenges State ----
  const [sysDomainFilter, setSysDomainFilter] = useState<string>('ALL');
  const [sysDiffFilter, setSysDiffFilter] = useState<'ALL' | 'Easy' | 'Medium' | 'Hard'>('ALL');
  const [sysStatusFilter, setSysStatusFilter] = useState<'ALL' | 'Solved' | 'Unsolved'>('ALL');
  const [sysSearch, setSysSearch] = useState<string>('');
  const [sysPage, setSysPage] = useState<number>(1);
  const [selectedSysId, setSelectedSysId] = useState<string>(SYSTEM_ENGINEERING_CHALLENGES[0].id);

  // Route incoming initialProblemId from global search / bookmarks
  useEffect(() => {
    if (!initialProblemId) return;
    const sysHit = SYSTEM_ENGINEERING_CHALLENGES.find((c) => c.problem.id === initialProblemId);
    if (sysHit) {
      setArenaMode('projects');
      setSelectedSysId(sysHit.id);
      return;
    }
    for (const round of LIVE_CONTEST_ROUNDS) {
      const slotHit = round.problems.find((rp) => rp.problem.id === initialProblemId);
      if (slotHit) {
        setArenaMode('contest');
        setSelectedRoundId(round.id);
        setActiveSlot(slotHit.slot);
        return;
      }
    }
  }, [initialProblemId]);

  const filteredRounds = useMemo(() => {
    return LIVE_CONTEST_ROUNDS.filter((r) => {
      if (platformFilter !== 'ALL' && r.platform !== platformFilter) return false;
      if (bandFilter !== 'ALL' && r.difficultyBand !== bandFilter) return false;
      return true;
    });
  }, [platformFilter, bandFilter]);

  const totalRoundPages = Math.max(1, Math.ceil(filteredRounds.length / ROUNDS_PAGE_SIZE));
  const safeRoundPage = Math.min(roundPage, totalRoundPages);

  useEffect(() => {
    setRoundPage(1);
  }, [platformFilter, bandFilter]);

  const pagedRounds = useMemo(() => {
    const start = (safeRoundPage - 1) * ROUNDS_PAGE_SIZE;
    return filteredRounds.slice(start, start + ROUNDS_PAGE_SIZE);
  }, [filteredRounds, safeRoundPage]);

  const activeRound =
    filteredRounds.find((r) => r.id === selectedRoundId) ||
    filteredRounds[0] ||
    LIVE_CONTEST_ROUNDS[0];

  const activeRoundSlotProblem =
    activeRound.problems.find((p) => p.slot === activeSlot) || activeRound.problems[0];

  // Reset timer cleanly when switching rounds while not actively running
  function handleSelectRound(round: ContestRound) {
    setSelectedRoundId(round.id);
    setActiveSlot('A');
    setContestRunning(false);
    setContestPaused(false);
    setSecondsLeft(round.durationMinutes * 60);
    setRoundSolvedSlots([]);
    setWrongAttempts({});
    setContestSummary(null);
  }

  useEffect(() => {
    if (!contestRunning || contestPaused) return;
    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setContestRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [contestRunning, contestPaused]);

  function handleStartRound() {
    setSecondsLeft(activeRound.durationMinutes * 60);
    setRoundSolvedSlots([]);
    setWrongAttempts({});
    setContestSummary(null);
    setContestPaused(false);
    setContestRunning(true);
    setActiveSlot('A');
  }

  function handleResetRound() {
    setContestRunning(false);
    setContestPaused(false);
    setSecondsLeft(activeRound.durationMinutes * 60);
    setRoundSolvedSlots([]);
    setWrongAttempts({});
    setContestSummary(null);
  }

  function handleFinishRound() {
    setContestRunning(false);
    setContestPaused(false);
    const totalScore = activeRound.problems
      .filter((rp) => roundSolvedSlots.includes(rp.slot))
      .reduce((acc, rp) => acc + rp.points, 0);
    const elapsedMinutes = Math.max(
      0,
      activeRound.durationMinutes - Math.floor(secondsLeft / 60),
    );
    const wrongPenalty = roundSolvedSlots.reduce(
      (acc, slot) => acc + (wrongAttempts[slot] ?? 0) * activeRound.penaltyPerWrongMinutes,
      0,
    );
    const result = calculateContestRatingDelta({
      currentRating: contestRating,
      solvedCount: roundSolvedSlots.length,
      totalProblems: activeRound.problems.length,
      minutesRemaining: Math.floor(secondsLeft / 60),
      totalMinutes: activeRound.durationMinutes,
    });
    setContestSummary({
      ...result,
      totalScore,
      totalPenaltyMinutes: elapsedMinutes + wrongPenalty,
    });
    onFinishContest?.(result.newRating);
  }

  function handleRoundJudgeComplete(report: JudgeSubmissionReport) {
    if (!contestRunning) return;
    const slotKey = activeRoundSlotProblem.slot;
    if (report.verdict !== 'AC' && !roundSolvedSlots.includes(slotKey)) {
      setWrongAttempts((prev) => ({
        ...prev,
        [slotKey]: (prev[slotKey] ?? 0) + 1,
      }));
    }
  }

  // ---- Mode 2 Derived Lists ----
  const sysDomains = useMemo(() => {
    const set = new Set<string>();
    for (const c of SYSTEM_ENGINEERING_CHALLENGES) set.add(c.domain);
    return ['ALL', ...Array.from(set).sort()];
  }, []);

  const filteredSys = useMemo(() => {
    const q = sysSearch.trim().toLowerCase();
    return SYSTEM_ENGINEERING_CHALLENGES.filter((c) => {
      if (sysDomainFilter !== 'ALL' && c.domain !== sysDomainFilter) return false;
      if (sysDiffFilter !== 'ALL' && c.difficulty !== sysDiffFilter) return false;
      const isSolved = solvedSet.has(c.problem.id);
      if (sysStatusFilter === 'Solved' && !isSolved) return false;
      if (sysStatusFilter === 'Unsolved' && isSolved) return false;
      if (q) {
        const hay = `${c.title} ${c.banglaTitle} ${c.domain} ${c.architectureOverview}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [sysDomainFilter, sysDiffFilter, sysStatusFilter, sysSearch, solvedSet]);

  const totalSysPages = Math.max(1, Math.ceil(filteredSys.length / SYS_PAGE_SIZE));
  const safeSysPage = Math.min(sysPage, totalSysPages);

  useEffect(() => {
    setSysPage(1);
  }, [sysDomainFilter, sysDiffFilter, sysStatusFilter, sysSearch]);

  const pagedSys = useMemo(() => {
    const start = (safeSysPage - 1) * SYS_PAGE_SIZE;
    return filteredSys.slice(start, start + SYS_PAGE_SIZE);
  }, [filteredSys, safeSysPage]);

  const activeSysChallenge =
    filteredSys.find((c) => c.id === selectedSysId) ||
    filteredSys[0] ||
    SYSTEM_ENGINEERING_CHALLENGES[0];

  const sysSolvedCount = SYSTEM_ENGINEERING_CHALLENGES.filter((c) => solvedSet.has(c.problem.id)).length;

  const totalHours = Math.floor(secondsLeft / 3600);
  const mm = String(Math.floor((secondsLeft % 3600) / 60)).padStart(2, '0');
  const ss = String(secondsLeft % 60).padStart(2, '0');
  const formattedClock = totalHours > 0 ? `${totalHours}:${mm}:${ss}` : `${mm}:${ss}`;

  const totalWrongInRound = Object.values(wrongAttempts).reduce((a, b) => a + b, 0);

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6 space-y-5">
      {/* Department Header & Mode Switcher */}
      <SpringReveal index={0}>
        <section className="obsidian-glass-card flex flex-wrap items-center justify-between gap-4 rounded-2xl p-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              <Rocket className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Department 5 · Ace Coding Hub — Live Contests &amp; Production Systems</span>
            </div>
            <h1 className="mt-1 font-display text-xl font-bold text-[#1C1917] dark:text-white sm:text-2xl">
              Contest Simulator (30 Rounds) &amp; 25 Real-World System Builds
            </h1>
            <p className="mt-1 text-xs text-[#57534E] dark:text-slate-400">
              130 Multi-Part Contest Problems · Wrong-Submission Penalty Timer · 25 Backend/Infra Architecture Challenges
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Contest and Projects Mode"
            className="flex flex-wrap items-center gap-1 rounded-xl bg-[#EFE8D6] p-1 dark:border dark:border-white/[0.08] dark:bg-[#07090D]/85"
          >
            <button
              type="button"
              role="tab"
              aria-selected={arenaMode === 'contest'}
              onClick={() => setArenaMode('contest')}
              className={`flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors whitespace-nowrap ${
                arenaMode === 'contest'
                  ? 'bg-[#FCF9F2] text-emerald-800 shadow-sm dark:bg-emerald-500/20 dark:text-emerald-300'
                  : 'text-[#57534E] hover:text-[#1C1917] dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              <Trophy className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Live Contest Simulator (30)</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={arenaMode === 'projects'}
              onClick={() => setArenaMode('projects')}
              className={`flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors whitespace-nowrap ${
                arenaMode === 'projects'
                  ? 'bg-[#FCF9F2] text-emerald-800 shadow-sm dark:bg-emerald-500/20 dark:text-emerald-300'
                  : 'text-[#57534E] hover:text-[#1C1917] dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              <Server className="h-3.5 w-3.5" aria-hidden="true" />
              <span>System Engineering (25)</span>
            </button>
          </div>
        </section>
      </SpringReveal>

      {arenaMode === 'contest' ? (
        <>
          {/* Contest Round Filters & Pagination */}
          <SpringReveal index={1}>
            <div className="obsidian-glass-card space-y-2.5 rounded-2xl p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Filter Contest Platform">
                  <span className="mr-1 text-[11px] font-bold text-[#57534E] dark:text-slate-400">Division:</span>
                  {ROUND_PLATFORMS.map((plat) => (
                    <button
                      key={plat}
                      type="button"
                      aria-pressed={platformFilter === plat}
                      onClick={() => setPlatformFilter(plat)}
                      className={`rounded-md px-2.5 py-1 text-xs font-semibold transition-colors whitespace-nowrap ${
                        platformFilter === plat
                          ? 'bg-[#1C1917] text-[#FCF9F2] dark:bg-emerald-500 dark:text-slate-950'
                          : 'bg-[#EFE8D6] text-[#57534E] hover:bg-[#E2D9C5] dark:bg-[#07090D]/80 dark:text-slate-300 dark:hover:bg-slate-800'
                      }`}
                    >
                      {plat === 'ALL' ? 'All Divisions (30)' : plat}
                    </button>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Filter Difficulty Band">
                  <span className="mr-1 text-[11px] font-bold text-[#57534E] dark:text-slate-400">Tier:</span>
                  {ROUND_BANDS.map((band) => (
                    <button
                      key={band}
                      type="button"
                      aria-pressed={bandFilter === band}
                      onClick={() => setBandFilter(band)}
                      className={`rounded-md px-2.5 py-1 text-xs font-semibold transition-colors whitespace-nowrap ${
                        bandFilter === band
                          ? 'bg-emerald-600 text-white dark:bg-emerald-500 dark:text-slate-950'
                          : 'bg-[#EFE8D6] text-[#57534E] hover:bg-[#E2D9C5] dark:bg-[#07090D]/80 dark:text-slate-300 dark:hover:bg-slate-800'
                      }`}
                    >
                      {band === 'ALL' ? 'All Tiers' : band}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-[#E2D9C5] pt-2 text-xs text-[#57534E] dark:border-white/[0.08] dark:text-slate-400">
                <span className="font-mono tabular-nums">
                  Showing {filteredRounds.length} contest rounds ({activeRound.problems.length} slots in selected round)
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    disabled={safeRoundPage <= 1}
                    onClick={() => setRoundPage((p) => Math.max(1, p - 1))}
                    aria-label="Previous contest page"
                    className="rounded-md border border-[#E2D9C5] bg-[#FCF9F2] p-1 text-[#1C1917] disabled:opacity-40 dark:border-white/[0.08] dark:bg-[#07090D] dark:text-slate-200"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <span className="px-2 font-mono font-semibold tabular-nums text-[#1C1917] dark:text-slate-200">
                    Page {safeRoundPage} / {totalRoundPages}
                  </span>
                  <button
                    type="button"
                    disabled={safeRoundPage >= totalRoundPages}
                    onClick={() => setRoundPage((p) => Math.min(totalRoundPages, p + 1))}
                    aria-label="Next contest page"
                    className="rounded-md border border-[#E2D9C5] bg-[#FCF9F2] p-1 text-[#1C1917] disabled:opacity-40 dark:border-white/[0.08] dark:bg-[#07090D] dark:text-slate-200"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </SpringReveal>

          {/* 30 Contest Rounds Grid */}
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {pagedRounds.map((round, idx) => {
              const isSelected = round.id === activeRound.id;
              const solvedInRound = round.problems.filter((rp) => solvedSet.has(rp.problem.id)).length;
              return (
                <SpringReveal key={round.id} index={idx} staggerSeconds={0.025} className="h-full">
                  <SpotlightTiltCard
                    onClick={() => handleSelectRound(round)}
                    ariaPressed={isSelected}
                    tiltStrength={4}
                    className={`h-full w-full rounded-xl border p-4 text-left backdrop-blur-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                      isSelected
                        ? 'border-emerald-600/80 bg-[#FCF9F2] shadow-[0_0_24px_-10px_rgba(16,185,129,0.45)] dark:border-emerald-400/75 dark:bg-[#0E131D]/95'
                        : 'border-[#E2D9C5] bg-[#FCF9F2]/80 hover:border-emerald-500/45 hover:bg-[#FCF9F2] dark:border-white/[0.08] dark:bg-[#0E131D]/85 dark:hover:border-emerald-400/40'
                    }`}
                  >
                    <div className="w-full min-w-0">
                      <div className="flex items-center justify-between gap-2 text-xs">
                        <span className="font-semibold text-emerald-700 dark:text-emerald-400 truncate">
                          Round #{round.number} · {round.platform}
                        </span>
                        <span className="font-mono font-semibold tabular-nums text-[#57534E] dark:text-slate-400 shrink-0">
                          {round.durationMinutes}m · {round.difficultyBand}
                        </span>
                      </div>
                      <div className="mt-1.5 font-display text-sm font-bold text-[#1C1917] dark:text-white truncate">
                        {round.title}
                      </div>
                      <div className="bangla-text mt-0.5 text-xs text-[#57534E] dark:text-slate-400 truncate">
                        {round.banglaTitle}
                      </div>
                      <div className="mt-2 flex items-center justify-between text-[11px] font-mono tabular-nums text-[#57534E] dark:text-slate-400">
                        <span>{round.problems.length} Problems (A–{round.problems[round.problems.length - 1].slot})</span>
                        <span className={solvedInRound === round.problems.length ? 'text-emerald-600 dark:text-emerald-400 font-bold' : ''}>
                          {solvedInRound}/{round.problems.length} AC
                        </span>
                      </div>
                    </div>
                  </SpotlightTiltCard>
                </SpringReveal>
              );
            })}
          </div>

          {/* Active Timed Contest Cockpit */}
          <section className="rounded-2xl border border-amber-500/35 bg-amber-50/75 p-4 backdrop-blur-md dark:border-amber-400/30 dark:bg-[#0E131D]/90 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2 text-sm font-bold text-[#1C1917] dark:text-white">
                  <Clock className="h-4 w-4 text-amber-600 dark:text-amber-400" aria-hidden="true" />
                  <span>{activeRound.title}</span>
                  <span className="font-mono text-xs font-semibold text-[#57534E] dark:text-slate-400">
                    (Penalty: +{activeRound.penaltyPerWrongMinutes}m / WA)
                  </span>
                </div>
                <p className="text-xs text-[#57534E] dark:text-slate-300">{activeRound.description}</p>
                <div className="flex flex-wrap items-center gap-3 font-mono text-xs tabular-nums text-[#1C1917] dark:text-slate-200">
                  <span>
                    Round Solved: <strong>{roundSolvedSlots.length}/{activeRound.problems.length}</strong>
                  </span>
                  <span>·</span>
                  <span>
                    Wrong Attempts: <strong className="text-rose-600 dark:text-rose-400">{totalWrongInRound}</strong>
                  </span>
                  <span>·</span>
                  <span>
                    Current Rating: <strong className="text-emerald-700 dark:text-emerald-400">{contestRating}</strong>
                  </span>
                  {contestSummary && (
                    <>
                      <span>·</span>
                      <span className="font-bold text-emerald-700 dark:text-emerald-400">
                        Score {contestSummary.totalScore} · Penalty {contestSummary.totalPenaltyMinutes}m · New Rating:{' '}
                        {contestSummary.newRating} ({contestSummary.delta >= 0 ? `+${contestSummary.delta}` : contestSummary.delta})
                      </span>
                    </>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="rounded-lg border border-[#E2D9C5] bg-[#FCF9F2] px-3.5 py-1.5 font-mono text-lg font-bold tabular-nums text-[#1C1917] dark:border-white/[0.1] dark:bg-[#07090D] dark:text-amber-300">
                  {formattedClock}
                </div>

                {!contestRunning ? (
                  <button
                    type="button"
                    onClick={handleStartRound}
                    className="flex items-center gap-1.5 rounded-lg bg-amber-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-amber-700 dark:bg-amber-500 dark:text-slate-950 whitespace-nowrap"
                  >
                    <Play className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Start Timed Round</span>
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => setContestPaused((p) => !p)}
                      className="flex items-center gap-1.5 rounded-lg border border-[#E2D9C5] bg-[#FCF9F2] px-3 py-2 text-xs font-semibold text-[#1C1917] hover:bg-[#EFE8D6] dark:border-white/[0.1] dark:bg-[#07090D] dark:text-slate-200 whitespace-nowrap"
                    >
                      {contestPaused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
                      <span>{contestPaused ? 'Resume' : 'Pause'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleFinishRound}
                      className="rounded-lg bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-emerald-500 dark:bg-emerald-500 dark:text-slate-950 whitespace-nowrap"
                    >
                      Finish &amp; Grade
                    </button>
                  </>
                )}

                <button
                  type="button"
                  onClick={handleResetRound}
                  aria-label="Reset round timer and attempts"
                  className="rounded-lg border border-[#E2D9C5] bg-[#FCF9F2] p-2 text-[#57534E] hover:bg-[#EFE8D6] dark:border-white/[0.1] dark:bg-[#07090D] dark:text-slate-300"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Problem Slot Switcher (A..E) */}
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-5" role="tablist" aria-label="Round Problem Slots">
              {activeRound.problems.map((rp) => {
                const isSlotActive = rp.slot === activeRoundSlotProblem.slot;
                const isRoundSolved = roundSolvedSlots.includes(rp.slot);
                const isEverSolved = solvedSet.has(rp.problem.id);
                const wrongCnt = wrongAttempts[rp.slot] ?? 0;

                return (
                  <button
                    key={rp.problem.id}
                    type="button"
                    role="tab"
                    aria-selected={isSlotActive}
                    onClick={() => setActiveSlot(rp.slot)}
                    className={`rounded-xl border p-2.5 text-left transition-colors ${
                      isSlotActive
                        ? 'border-emerald-600 bg-[#FCF9F2] shadow-sm dark:border-emerald-400 dark:bg-[#07090D]'
                        : 'border-[#E2D9C5] bg-[#FCF9F2]/60 hover:bg-[#FCF9F2] dark:border-white/[0.08] dark:bg-[#07090D]/55 dark:hover:bg-[#07090D]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-mono font-bold tabular-nums">
                      <span className="text-emerald-700 dark:text-emerald-400">
                        Slot {rp.slot} · {rp.points}pts
                      </span>
                      <span className="flex items-center gap-1">
                        {wrongCnt > 0 && (
                          <span className="text-rose-600 dark:text-rose-400">-{wrongCnt}</span>
                        )}
                        {(isRoundSolved || isEverSolved) && (
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                        )}
                      </span>
                    </div>
                    <div className="mt-1 truncate text-xs font-semibold text-[#1C1917] dark:text-white">
                      {rp.problem.title}
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          {(() => {
            const effectiveRoundProblem = applySingleProblemOverride(
              activeRoundSlotProblem.problem,
              contentOverrides[activeRoundSlotProblem.problem.id],
            );
            return (
              <ProblemSolverWorkspace
                problem={effectiveRoundProblem}
                solvedProblems={solvedProblems}
                onJudgeComplete={handleRoundJudgeComplete}
                onAcceptedProblem={() => {
                  onProblemSolved(effectiveRoundProblem);
                  if (contestRunning && !roundSolvedSlots.includes(activeRoundSlotProblem.slot)) {
                    setRoundSolvedSlots((prev) => [...prev, activeRoundSlotProblem.slot]);
                  }
                }}
                onCodeRunSuccess={onCodeRunSuccess}
                onDrillPass={onDrillPass}
                onMoodChange={onMoodChange}
                mascotMood={mascotMood}
                showDryRunAnimator={true}
                isAdmin={isAdmin}
                hasOverride={Boolean(contentOverrides[effectiveRoundProblem.id])}
                onOpenAdminEdit={onOpenAdminEdit}
                getSavedCode={getSavedCode}
                onSaveCode={onSaveCode}
              />
            );
          })()}
        </>
      ) : (
        /* ==================== MODE 2: 25 SYSTEM ENGINEERING CHALLENGES ==================== */
        <>
          <SpringReveal index={1}>
            <div className="obsidian-glass-card space-y-3 rounded-2xl p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <label className="flex items-center gap-1.5 text-xs">
                    <span className="text-[11px] font-bold text-[#57534E] dark:text-slate-400">Domain:</span>
                    <select
                      value={sysDomainFilter}
                      onChange={(e) => setSysDomainFilter(e.target.value)}
                      className="rounded-md border border-[#E2D9C5] bg-[#FCF9F2] px-2.5 py-1 text-xs font-semibold text-[#1C1917] focus:border-emerald-600 focus:outline-none dark:border-white/[0.1] dark:bg-[#07090D] dark:text-slate-200"
                    >
                      {sysDomains.map((d) => (
                        <option key={d} value={d}>
                          {d === 'ALL' ? `All Domains (${SYSTEM_ENGINEERING_CHALLENGES.length})` : d}
                        </option>
                      ))}
                    </select>
                  </label>

                  <div className="flex items-center gap-1" role="group" aria-label="Filter System Difficulty">
                    {(['ALL', 'Medium', 'Hard'] as const).map((diff) => (
                      <button
                        key={diff}
                        type="button"
                        aria-pressed={sysDiffFilter === diff}
                        onClick={() => setSysDiffFilter(diff)}
                        className={`rounded-md px-2.5 py-1 text-xs font-semibold transition-colors ${
                          sysDiffFilter === diff
                            ? 'bg-emerald-600 text-white dark:bg-emerald-500 dark:text-slate-950'
                            : 'bg-[#EFE8D6] text-[#57534E] dark:bg-[#07090D]/80 dark:text-slate-300'
                        }`}
                      >
                        {diff === 'ALL' ? 'All Levels' : diff}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-1 rounded-md bg-[#EFE8D6] p-0.5 dark:bg-[#07090D]/80">
                    {(['ALL', 'Unsolved', 'Solved'] as const).map((st) => (
                      <button
                        key={st}
                        type="button"
                        aria-pressed={sysStatusFilter === st}
                        onClick={() => setSysStatusFilter(st)}
                        className={`rounded px-2 py-1 text-xs font-semibold transition-colors ${
                          sysStatusFilter === st
                            ? 'bg-[#FCF9F2] text-emerald-800 shadow-sm dark:bg-emerald-500/20 dark:text-emerald-300'
                            : 'text-[#57534E] dark:text-slate-400'
                        }`}
                      >
                        {st === 'ALL' ? 'All' : st}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="relative w-full sm:w-72">
                  <Search
                    className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#78716C]"
                    aria-hidden="true"
                  />
                  <input
                    type="search"
                    value={sysSearch}
                    onChange={(e) => setSysSearch(e.target.value)}
                    placeholder="Search 25 system builds..."
                    aria-label="Search system engineering challenges"
                    className="w-full rounded-lg border border-[#E2D9C5] bg-[#FCF9F2] py-1.5 pl-8 pr-3 text-xs text-[#1C1917] placeholder:text-[#78716C] focus:border-emerald-600 focus:outline-none dark:border-white/[0.1] dark:bg-[#07090D] dark:text-white dark:focus:border-emerald-400"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-[#E2D9C5] pt-2 text-xs text-[#57534E] dark:border-white/[0.08] dark:text-slate-400">
                <span className="font-mono tabular-nums">
                  {sysSolvedCount}/{SYSTEM_ENGINEERING_CHALLENGES.length} Systems Built · Showing {filteredSys.length} matching
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    disabled={safeSysPage <= 1}
                    onClick={() => setSysPage((p) => Math.max(1, p - 1))}
                    aria-label="Previous system challenge page"
                    className="rounded-md border border-[#E2D9C5] bg-[#FCF9F2] p-1 text-[#1C1917] disabled:opacity-40 dark:border-white/[0.08] dark:bg-[#07090D] dark:text-slate-200"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <span className="px-2 font-mono font-semibold tabular-nums text-[#1C1917] dark:text-slate-200">
                    Page {safeSysPage} / {totalSysPages}
                  </span>
                  <button
                    type="button"
                    disabled={safeSysPage >= totalSysPages}
                    onClick={() => setSysPage((p) => Math.min(totalSysPages, p + 1))}
                    aria-label="Next system challenge page"
                    className="rounded-md border border-[#E2D9C5] bg-[#FCF9F2] p-1 text-[#1C1917] disabled:opacity-40 dark:border-white/[0.08] dark:bg-[#07090D] dark:text-slate-200"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </SpringReveal>

          {filteredSys.length === 0 ? (
            <div className="rounded-xl border border-dashed border-[#E2D9C5] bg-[#FCF9F2]/80 p-8 text-center text-sm text-[#57534E] dark:border-white/[0.1] dark:bg-[#0E131D]/65 dark:text-slate-400">
              No system engineering challenges match that filter.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
              {pagedSys.map((ch, idx) => {
                const isSelected = ch.id === activeSysChallenge.id;
                const isSolved = solvedSet.has(ch.problem.id);
                return (
                  <SpringReveal key={ch.id} index={idx} staggerSeconds={0.025} className="h-full">
                    <SpotlightTiltCard
                      onClick={() => setSelectedSysId(ch.id)}
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
                            {ch.domain}
                          </span>
                          <span className="shrink-0 font-mono font-semibold tabular-nums">
                            {ch.difficulty} · +{ch.xpReward} XP
                          </span>
                        </div>
                        <div className="mt-1.5 flex items-center justify-between gap-2">
                          <span className="font-display text-sm font-bold text-[#1C1917] dark:text-white truncate">
                            {ch.title}
                          </span>
                          {isSolved && (
                            <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          )}
                        </div>
                        <div className="bangla-text mt-1 text-xs text-[#57534E] dark:text-slate-400 truncate">
                          {ch.banglaTitle}
                        </div>
                      </div>
                    </SpotlightTiltCard>
                  </SpringReveal>
                );
              })}
            </div>
          )}

          {/* Selected System Architecture Summary Banner */}
          {activeSysChallenge && (
            <section className="obsidian-glass-card rounded-2xl p-4 space-y-2.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                  <Cpu className="h-4 w-4" aria-hidden="true" />
                  <span>
                    Challenge #{activeSysChallenge.number} · {activeSysChallenge.domain} · Edge-Case Suite (
                    {activeSysChallenge.problem.samples.length} Sample + {activeSysChallenge.problem.hiddenTests.length} Hidden Tests)
                  </span>
                </div>
                <span className="font-mono text-xs font-semibold text-[#57534E] dark:text-slate-400">
                  Target: {activeSysChallenge.problem.editorial.timeComplexity}
                </span>
              </div>
              <p className="text-xs leading-relaxed text-[#1C1917] dark:text-slate-200">
                <strong>Architecture Blueprint: </strong>
                {activeSysChallenge.architectureOverview}
              </p>
            </section>
          )}

          {(() => {
            const effectiveSysProblem = applySingleProblemOverride(
              activeSysChallenge.problem,
              contentOverrides[activeSysChallenge.problem.id],
            );
            return (
              <ProblemSolverWorkspace
                problem={effectiveSysProblem}
                solvedProblems={solvedProblems}
                onAcceptedProblem={() => onProblemSolved(effectiveSysProblem)}
                onCodeRunSuccess={onCodeRunSuccess}
                onDrillPass={onDrillPass}
                onMoodChange={onMoodChange}
                mascotMood={mascotMood}
                showDryRunAnimator={true}
                isAdmin={isAdmin}
                hasOverride={Boolean(contentOverrides[effectiveSysProblem.id])}
                onOpenAdminEdit={onOpenAdminEdit}
                getSavedCode={getSavedCode}
                onSaveCode={onSaveCode}
              />
            );
          })()}
        </>
      )}
    </div>
  );
}
