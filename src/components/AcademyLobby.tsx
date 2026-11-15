import { ArrowRight, BookOpen, CheckCircle2, Circle, Clock, Flame, Rocket } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { useMemo, useState } from 'react';
import { LANGUAGES, LANGUAGE_MAP } from '../data/languages';
import type { Chapter, LanguageId } from '../types/academy';
import { computeLanguageMastery } from '../utils/gamification';
import { LANGUAGE_ACCENT_STYLES } from '../utils/themeAccents';
import { SpotlightTiltCard } from './SpotlightTiltCard';
import { SpringReveal } from './SpringReveal';

interface AcademyLobbyProps {
  selectedLanguage: LanguageId;
  selectedChapterId: string;
  chapters: Chapter[];
  completedChapters: string[];
  onSelectLanguage: (langId: LanguageId) => void;
  onOpenChapterInStudio: (chapterId: string) => void;
}

const PHASE_META: Record<1 | 2 | 3 | 4 | 5, { title: string; subtitle: string; badge: string }> = {
  1: {
    title: 'Phase 1: Absolute Zero Foundations (Ch 1–5)',
    subtitle: 'Compiler internals, fast I/O, RAM types & overflow, operators, and bitwise CP tricks',
    badge: 'Foundation',
  },
  2: {
    title: 'Phase 2: Control Flow, Loops & Complexity (Ch 6–10)',
    subtitle: 'Branching, while/for loops, star/number patterns, functions, and Big-O 10^8 ops rule',
    badge: 'Logic',
  },
  3: {
    title: 'Phase 3: Arrays, Strings & Recursion (Ch 11–15)',
    subtitle: '1D arrays, two-pointers & sliding window, prefix sums, strings, and call-stack recursion',
    badge: 'DSA Core',
  },
  4: {
    title: 'Phase 4: Memory, Ownership & OOP (Ch 16–20)',
    subtitle: 'Pointers/Ownership/DOM, heap vs stack smart pointers, classes, traits, and generics/STL',
    badge: 'Builder',
  },
  5: {
    title: 'Phase 5: Algorithms, Concurrency & Architecture (Ch 21–25)',
    subtitle: 'Binary search on answer, hashing, BFS/DFS trees & graphs, async I/O, and Full-Stack Capstone',
    badge: 'Architect',
  },
};

export function AcademyLobby({
  selectedLanguage,
  selectedChapterId,
  chapters,
  completedChapters,
  onSelectLanguage,
  onOpenChapterInStudio,
}: AcademyLobbyProps) {
  const prefersReducedMotion = useReducedMotion();
  const [phaseFilter, setPhaseFilter] = useState<'all' | 1 | 2 | 3 | 4 | 5>('all');

  const activeLangMeta = LANGUAGE_MAP[selectedLanguage];
  const langMastery = computeLanguageMastery(selectedLanguage, completedChapters);
  const activeChapter = chapters.find((c) => c.id === selectedChapterId) ?? chapters[0];
  const visiblePhases: (1 | 2 | 3 | 4 | 5)[] = phaseFilter === 'all' ? [1, 2, 3, 4, 5] : [phaseFilter];

  // First uncompleted chapter in the active language is the Active Next Quest
  const nextQuestChapterId = useMemo(() => {
    const firstIncomplete = chapters.find((c) => !completedChapters.includes(c.id));
    return firstIncomplete?.id ?? null;
  }, [chapters, completedChapters]);

  const radius = 16;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6 space-y-6">
      {/* Hero Showcase Banner */}
      <SpringReveal index={0}>
        <section className="obsidian-glass-card rounded-2xl p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="max-w-3xl space-y-1.5">
              <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                Department 1 · Ace Coding Hub — 8-Language Roadmap (200 Chapters)
              </div>
              <h1 className="font-display text-2xl font-bold tracking-tight text-[#1C1917] dark:text-white sm:text-3xl">
                Welcome to Ace Coding Hub — Choose Your Language
              </h1>
              <p className="text-sm text-[#57534E] dark:text-slate-300">
                Master {activeLangMeta.name} ({activeLangMeta.paradigm}) from zero-knowledge flowcharts to FAANG &amp; Codeforces mastery.{' '}
                <span className="bangla-text font-medium text-emerald-800 dark:text-emerald-300">
                  {activeLangMeta.banglaTagline}
                </span>
              </p>
            </div>

            <motion.button
              type="button"
              onClick={() => onOpenChapterInStudio(activeChapter.id)}
              whileHover={prefersReducedMotion ? undefined : { y: -2, scale: 1.02 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 24 }}
              className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-[0_8px_22px_-6px_rgba(16,185,129,0.55)] transition-colors hover:bg-emerald-500 dark:bg-emerald-500 dark:text-slate-950 dark:hover:bg-emerald-400 whitespace-nowrap shrink-0"
            >
              <BookOpen className="h-4 w-4" aria-hidden="true" />
              <span>Open Ch {activeChapter.number} in Studio</span>
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </motion.button>
          </div>

          {/* Full-Width 8-Language 3D Tilt Showcase with Distinct Per-Language Glow Rings */}
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {LANGUAGES.map((lang, idx) => {
              const mastery = computeLanguageMastery(lang.id, completedChapters);
              const isSelected = selectedLanguage === lang.id;
              const dashOffset = circumference - (mastery.percent / 100) * circumference;
              const accent = LANGUAGE_ACCENT_STYLES[lang.id];

              return (
                <SpringReveal key={lang.id} index={idx} staggerSeconds={0.045} className="h-full">
                  <SpotlightTiltCard
                    onClick={() => onSelectLanguage(lang.id)}
                    ariaPressed={isSelected}
                    tiltStrength={6}
                    spotlightRgba={accent.spotlightRgba}
                    style={isSelected ? { boxShadow: accent.selectedShadowStyle } : undefined}
                    className={`h-full w-full rounded-xl border p-4 text-left backdrop-blur-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                      isSelected
                        ? `${accent.selectedBorderClass} bg-[#FCF9F2] dark:bg-[#0E131D]/95`
                        : `border-[#E2D9C5] bg-[#FCF9F2]/80 hover:bg-[#FCF9F2] dark:border-white/[0.08] dark:bg-[#0E131D]/85 dark:hover:bg-[#141B29]/90 ${accent.hoverBorderClass}`
                    }`}
                  >
                    <div className="flex w-full items-start gap-3">
                      {/* Per-Language Signature Glow Ring */}
                      <div
                        className="relative flex h-11 w-11 items-center justify-center shrink-0"
                        style={isSelected ? { filter: accent.ringGlowFilter } : undefined}
                      >
                        <svg className="h-11 w-11 -rotate-90" viewBox="0 0 42 42" aria-hidden="true">
                          <circle
                            cx="21"
                            cy="21"
                            r={radius}
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            className="text-[#E2D9C5] dark:text-slate-800"
                          />
                          {accent.secondaryHex && (
                            <circle
                              cx="21"
                              cy="21"
                              r={radius}
                              fill="none"
                              stroke={accent.secondaryHex}
                              strokeOpacity={0.28}
                              strokeWidth="3"
                            />
                          )}
                          <motion.circle
                            cx="21"
                            cy="21"
                            r={radius}
                            fill="none"
                            stroke={accent.ringHex}
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            initial={{ strokeDashoffset: circumference }}
                            animate={{ strokeDashoffset: dashOffset }}
                            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                          />
                        </svg>
                        <span className="absolute font-mono text-[11px] font-bold text-[#1C1917] dark:text-slate-100">
                          {lang.shortLabel}
                        </span>
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-display text-sm font-bold text-[#1C1917] dark:text-white truncate">
                            {lang.name}
                          </span>
                          <span className={`font-mono text-[11px] font-semibold tabular-nums ${accent.badgeTextClass}`}>
                            {mastery.percent}%
                          </span>
                        </div>
                        <div className="mt-0.5 text-[11px] text-[#57534E] dark:text-slate-400 truncate">
                          {lang.paradigm} · {mastery.completed}/{mastery.total} ch
                        </div>
                        <div className="mt-1.5 text-[11px] text-[#57534E] dark:text-slate-300 line-clamp-1">
                          {lang.tagline}
                        </div>
                      </div>
                    </div>
                  </SpotlightTiltCard>
                </SpringReveal>
              );
            })}
          </div>
        </section>
      </SpringReveal>

      {/* Animated 25-Chapter Quest Map */}
      <SpringReveal index={1}>
        <section className="obsidian-glass-card rounded-2xl p-5 sm:p-6 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E2D9C5] pb-4 dark:border-white/[0.08]">
            <div>
              <h2 className="font-display text-lg font-bold text-[#1C1917] dark:text-white">
                {activeLangMeta.name} — 25-Chapter Quest Map ({langMastery.completed}/{langMastery.total} Completed)
              </h2>
              <p className="mt-0.5 text-xs text-[#57534E] dark:text-slate-400">
                Click any chapter quest card to slide directly into the distraction-free Chapter Studio &amp; Live IDE.
              </p>
            </div>

            <div
              role="group"
              aria-label="Filter quest map by phase"
              className="flex flex-wrap items-center gap-1 rounded-lg bg-[#EFE8D6] p-1 dark:bg-[#07090D]/80 dark:border dark:border-white/[0.06]"
            >
              {(['all', 1, 2, 3, 4, 5] as const).map((p) => {
                const active = phaseFilter === p;
                return (
                  <button
                    key={String(p)}
                    type="button"
                    onClick={() => setPhaseFilter(p)}
                    className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap ${
                      active
                        ? 'bg-[#FCF9F2] text-emerald-800 shadow-sm dark:bg-emerald-500/15 dark:text-emerald-300'
                        : 'text-[#57534E] hover:text-[#1C1917] dark:text-slate-400 dark:hover:text-slate-200'
                    }`}
                  >
                    {p === 'all' ? 'All Phases' : `Phase ${p}`}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-6">
            {visiblePhases.map((phase) => {
              const phaseChapters = chapters.filter((c) => c.phase === phase);
              const doneCount = phaseChapters.filter((c) => completedChapters.includes(c.id)).length;
              const meta = PHASE_META[phase];

              return (
                <div key={phase} className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <div className="font-display text-sm font-bold text-[#1C1917] dark:text-white">
                        {meta.title}
                      </div>
                      <div className="text-xs text-[#57534E] dark:text-slate-400">{meta.subtitle}</div>
                    </div>
                    <div className="font-mono text-xs font-semibold tabular-nums text-emerald-700 dark:text-emerald-400">
                      {doneCount}/{phaseChapters.length} cleared · {meta.badge}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-5">
                    {phaseChapters.map((ch, idx) => {
                      const isDone = completedChapters.includes(ch.id);
                      const isNextQuest = !isDone && ch.id === nextQuestChapterId;
                      const isSelected = ch.id === selectedChapterId;

                      return (
                        <SpringReveal key={ch.id} index={idx} staggerSeconds={0.045} className="h-full">
                          <motion.button
                            type="button"
                            whileHover={prefersReducedMotion ? undefined : { y: -5, scale: 1.018 }}
                            whileTap={prefersReducedMotion ? undefined : { scale: 0.975 }}
                            transition={{ type: 'spring', stiffness: 380, damping: 24 }}
                            onClick={() => onOpenChapterInStudio(ch.id)}
                            className={`group relative flex h-full w-full flex-col justify-between overflow-hidden rounded-xl border p-4 text-left backdrop-blur-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                              isDone
                                ? 'border-emerald-500/55 bg-emerald-50/75 shadow-[0_6px_24px_-10px_rgba(16,185,129,0.4)] dark:border-emerald-400/50 dark:bg-emerald-950/25 dark:shadow-[0_0_26px_-10px_rgba(16,185,129,0.45)]'
                                : isNextQuest
                                  ? 'quest-next-pulse border-emerald-600/80 bg-[#FCF9F2] dark:border-emerald-400/80 dark:bg-[#0E131D]/95'
                                  : isSelected
                                    ? 'border-cyan-600/60 bg-[#FCF9F2] dark:border-cyan-400/60 dark:bg-[#0E131D]/90'
                                    : 'border-[#E2D9C5] bg-[#FCF9F2]/80 hover:border-emerald-500/45 hover:bg-[#FCF9F2] dark:border-white/[0.08] dark:bg-[#0E131D]/85 dark:hover:border-emerald-400/40 dark:hover:bg-[#141B29]/90'
                            }`}
                          >
                            {/* Top-edge specular highlight */}
                            <span
                              aria-hidden="true"
                              className="pointer-events-none absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent dark:via-emerald-400/25"
                            />

                            <div>
                              <div className="flex items-center justify-between gap-2">
                                <div className="flex items-center gap-1.5 min-w-0">
                                  <span className="font-mono text-xs font-bold tabular-nums text-emerald-700 dark:text-emerald-400">
                                    Ch {ch.number}
                                  </span>
                                  {isNextQuest && (
                                    <span className="rounded bg-emerald-600 px-1.5 py-0.5 font-mono text-[9px] font-bold tracking-wider text-white dark:bg-emerald-400 dark:text-slate-950">
                                      NEXT QUEST
                                    </span>
                                  )}
                                </div>

                                {isDone ? (
                                  <CheckCircle2
                                    className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0"
                                    aria-label="Completed"
                                  />
                                ) : ch.isCapstone ? (
                                  <Rocket
                                    className="h-4 w-4 text-cyan-600 dark:text-cyan-400 shrink-0"
                                    aria-label="Mega Capstone"
                                  />
                                ) : ch.isMilestoneMerger ? (
                                  <Flame
                                    className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0"
                                    aria-label="Milestone Merger"
                                  />
                                ) : (
                                  <Circle
                                    className="h-4 w-4 text-[#B8AE99] dark:text-slate-600 shrink-0"
                                    aria-hidden="true"
                                  />
                                )}
                              </div>

                              <div className="mt-2 font-display text-sm font-bold leading-snug text-[#1C1917] dark:text-white line-clamp-2">
                                {ch.title}
                              </div>

                              <div className="bangla-text mt-1 text-[11px] text-[#57534E] dark:text-slate-400 line-clamp-2">
                                {ch.banglaTitle}
                              </div>
                            </div>

                            <div className="mt-3 flex items-center justify-between border-t border-[#E2D9C5]/80 pt-2.5 text-[11px] font-mono tabular-nums text-[#57534E] dark:border-white/[0.08] dark:text-slate-400">
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" aria-hidden="true" />
                                {ch.estimatedMinutes}m
                              </span>
                              <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                                +{ch.xpReward} XP
                              </span>
                            </div>
                          </motion.button>
                        </SpringReveal>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </SpringReveal>
    </div>
  );
}
