import { Building2, CheckCircle2, Code2, Cpu, Eye, Languages, Layers, Lightbulb, Pencil, Play } from 'lucide-react';
import { useEffect, useState } from 'react';
import { COMPILED_LANGUAGES, LANGUAGE_MAP } from '../data/languages';
import type { CompiledLanguageId, JudgeSubmissionReport, Problem, SolutionTier } from '../types/academy';
import type { ArgonBotMood } from './ArgonBotMascot';
import { CodeCompilerPane } from './CodeCompilerPane';
import { DryRunAnimator } from './DryRunAnimator';

interface ProblemSolverWorkspaceProps {
  problem: Problem;
  solvedProblems: string[];
  onAcceptedProblem: () => void;
  onJudgeComplete?: (report: JudgeSubmissionReport) => void;
  onCodeRunSuccess?: (contextKey: string) => void;
  onDrillPass?: (contextKey: string) => void;
  onMoodChange?: (mood: ArgonBotMood) => void;
  mascotMood?: ArgonBotMood;
  showDryRunAnimator?: boolean;
  isAdmin?: boolean;
  hasOverride?: boolean;
  onOpenAdminEdit?: (problem: Problem) => void;
  getSavedCode?: (itemId: string, language: string) => string | null;
  onSaveCode?: (itemId: string, language: string, code: string) => void;
}

export function ProblemSolverWorkspace({
  problem,
  solvedProblems,
  onAcceptedProblem,
  onJudgeComplete,
  onCodeRunSuccess,
  onDrillPass,
  onMoodChange,
  mascotMood = 'idle',
  showDryRunAnimator = true,
  isAdmin = false,
  hasOverride = false,
  onOpenAdminEdit,
  getSavedCode,
  onSaveCode,
}: ProblemSolverWorkspaceProps) {
  const isSolved = solvedProblems.includes(problem.id);
  const [activeLang, setActiveLang] = useState<CompiledLanguageId>('cpp');
  const [revealedHints, setRevealedHints] = useState<number>(0);
  const [showSolutionLadder, setShowSolutionLadder] = useState<boolean>(true);
  const [activeTier, setActiveTier] = useState<SolutionTier>('brute');
  const [showBanglaEditorial, setShowBanglaEditorial] = useState<boolean>(true);
  const [showSolutionCode, setShowSolutionCode] = useState<boolean>(false);
  const [useReferenceSolution, setUseReferenceSolution] = useState<boolean>(false);
  const [autoRunNonce, setAutoRunNonce] = useState<number>(0);
  const [activeDryRunStep, setActiveDryRunStep] = useState<number | null>(null);

  useEffect(() => {
    setRevealedHints(0);
    setActiveTier('brute');
    setShowSolutionCode(false);
    setUseReferenceSolution(false);
    setActiveDryRunStep(null);
  }, [problem.id]);

  const tierTabs: { id: SolutionTier; label: string }[] = [
    { id: 'brute', label: '1. Brute Force (TLE)' },
    { id: 'better', label: '2. Better Approach' },
    { id: 'optimal', label: '3. Optimal (Winner)' },
  ];

  const activeApproach = problem.approaches[activeTier];

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
      {/* Left: Statement, Hints, 3-Tier Progression, Dry Run Visualizer & Solution */}
      <div className="obsidian-glass-card xl:col-span-6 space-y-5 rounded-2xl p-5">
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#57534E] dark:text-slate-400">
              <span className="font-semibold text-emerald-700 dark:text-emerald-400">{problem.sourceTag}</span>
              <span aria-hidden="true">·</span>
              <span>{problem.difficulty}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums">
                TL: {problem.timeLimitMs}ms / {problem.memoryLimitMb}MB
              </span>
            </div>

            {isAdmin && onOpenAdminEdit && (
              <button
                type="button"
                onClick={() => onOpenAdminEdit(problem)}
                className="flex items-center gap-1.5 rounded-lg border border-emerald-600/40 bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-900 transition-colors hover:bg-emerald-100 dark:border-[#C8EE72]/45 dark:bg-[#C8EE72]/15 dark:text-[#C8EE72] dark:hover:bg-[#C8EE72]/25 whitespace-nowrap shrink-0"
              >
                <Pencil className="h-3 w-3" aria-hidden="true" />
                <span>Edit Content{hasOverride ? ' · Live' : ''}</span>
              </button>
            )}
          </div>

          <h2 className="mt-1.5 font-display text-xl font-bold text-[#1C1917] dark:text-white">
            {problem.title}
          </h2>
          <p className="bangla-text mt-1 text-sm text-[#57534E] dark:text-slate-300">
            {problem.banglaTitle}
          </p>

          {problem.companyTags.length > 0 && (
            <div className="mt-2.5 flex flex-wrap items-center gap-1.5 text-xs text-[#57534E] dark:text-slate-300">
              <Building2 className="h-3.5 w-3.5 text-[#78716C] shrink-0" aria-hidden="true" />
              <span className="font-semibold text-[#1C1917] dark:text-slate-200">Tags:</span>
              <span>{problem.companyTags.join(' · ')}</span>
            </div>
          )}
        </div>

        <div className="space-y-3 text-sm leading-relaxed text-[#1C1917] dark:text-slate-300">
          <p>{problem.statement}</p>
          <div>
            <strong className="text-[#1C1917] dark:text-white">Input Format: </strong>
            {problem.inputFormat}
          </div>
          <div>
            <strong className="text-[#1C1917] dark:text-white">Output Format: </strong>
            {problem.outputFormat}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold text-[#1C1917] dark:text-white">Constraints</h3>
          <ul className="mt-1.5 space-y-1 font-mono text-xs text-[#57534E] dark:text-slate-400">
            {problem.constraints.map((c, i) => (
              <li key={i}>• {c}</li>
            ))}
          </ul>
        </div>

        {(problem.systemRequirements?.length || problem.architectureOverview) && (
          <div className="space-y-2.5 rounded-xl border border-emerald-600/25 bg-emerald-50/55 p-3.5 dark:border-emerald-500/25 dark:bg-emerald-950/20">
            {problem.systemRequirements && problem.systemRequirements.length > 0 && (
              <div>
                <h3 className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-300">
                  <Cpu className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>System Requirements</span>
                </h3>
                <ul className="mt-1.5 space-y-1 text-xs text-[#1C1917] dark:text-slate-200">
                  {problem.systemRequirements.map((req, i) => (
                    <li key={i}>• {req}</li>
                  ))}
                </ul>
              </div>
            )}
            {problem.architectureOverview && (
              <div className="border-t border-emerald-600/20 pt-2 text-xs text-[#57534E] dark:border-emerald-500/20 dark:text-slate-300">
                <strong className="text-[#1C1917] dark:text-white">Architecture Walkthrough: </strong>
                {problem.architectureOverview}
              </div>
            )}
          </div>
        )}

        <div className="space-y-3">
          <h3 className="text-xs font-bold text-[#1C1917] dark:text-white">Sample Test Cases</h3>
          {problem.samples.map((s, idx) => (
            <div
              key={s.id}
              className="grid grid-cols-1 gap-3 rounded-lg border border-[#E2D9C5] bg-[#EFE8D6]/55 p-3 font-mono text-xs dark:border-slate-800 dark:bg-slate-900/60 sm:grid-cols-2"
            >
              <div>
                <div className="text-[11px] font-semibold text-[#57534E] dark:text-slate-400">
                  Sample Input #{idx + 1}
                </div>
                <pre className="mt-1 text-[#1C1917] dark:text-slate-200 whitespace-pre-wrap">{s.input}</pre>
              </div>
              <div>
                <div className="text-[11px] font-semibold text-[#57534E] dark:text-slate-400">
                  Expected Output
                </div>
                <pre className="mt-1 text-emerald-700 dark:text-emerald-400 whitespace-pre-wrap">
                  {s.expectedOutput}
                </pre>
              </div>
            </div>
          ))}
        </div>

        {/* Progressive Hints */}
        <div className="space-y-2.5 border-t border-[#E2D9C5] pt-4 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <h3 className="flex items-center gap-1.5 text-sm font-bold text-[#1C1917] dark:text-white">
              <Lightbulb className="h-4 w-4 text-amber-500" aria-hidden="true" />
              <span>Progressive Hints ({revealedHints}/3 unlocked)</span>
            </h3>
            {revealedHints < 3 && (
              <button
                type="button"
                onClick={() => setRevealedHints((h) => Math.min(3, h + 1))}
                className="rounded-md border border-amber-500/40 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800 hover:bg-amber-100 dark:bg-amber-950/30 dark:text-amber-300"
              >
                Unlock Hint {revealedHints + 1}
              </button>
            )}
          </div>

          {revealedHints > 0 && (
            <div className="space-y-2">
              {problem.hints.slice(0, revealedHints).map((hint, idx) => (
                <div
                  key={idx}
                  className="rounded-lg border border-amber-500/30 bg-amber-50/55 p-3 text-xs text-[#1C1917] dark:bg-amber-950/20 dark:text-slate-200"
                >
                  <strong className="text-amber-800 dark:text-amber-300">
                    Hint {idx + 1} ({idx === 0 ? 'Observation' : idx === 1 ? 'Algorithm Choice' : 'Formula / Pseudocode'}):{' '}
                  </strong>
                  {hint}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 3-Tier Solution Ladder + Reference Solution Controls */}
        <div className="flex flex-wrap items-center gap-2 border-t border-[#E2D9C5] pt-4 dark:border-slate-800">
          <button
            type="button"
            onClick={() => setShowSolutionLadder((e) => !e)}
            aria-expanded={showSolutionLadder}
            className="flex items-center gap-1.5 rounded-lg border border-[#E2D9C5] bg-[#EFE8D6]/60 px-3 py-2 text-xs font-semibold text-[#1C1917] hover:bg-[#EFE8D6] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
          >
            <Layers className="h-3.5 w-3.5 text-amber-600 dark:text-[#00F5D4]" aria-hidden="true" />
            <span>{showSolutionLadder ? 'Hide Brute → Optimal Ladder' : 'Show Brute → Optimal Ladder'}</span>
          </button>

          <button
            type="button"
            onClick={() => setShowSolutionCode((s) => !s)}
            aria-expanded={showSolutionCode}
            className="flex items-center gap-1.5 rounded-lg border border-amber-600/35 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-900 hover:bg-amber-100 dark:border-[#00F5D4]/35 dark:bg-[#00F5D4]/10 dark:text-[#00F5D4]"
          >
            <Code2 className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{showSolutionCode ? 'Hide 7-Lang Solution' : 'View Reference Solution'}</span>
          </button>

          {isSolved && (
            <span className="inline-flex items-center gap-1 rounded-md border border-emerald-500/35 bg-emerald-500/10 px-2.5 py-1.5 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300">
              <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
              <span>AC · Solutions Unlocked</span>
            </span>
          )}
        </div>

        {showSolutionLadder && (
          <div className="space-y-4 rounded-xl border border-[#E2D9C5] bg-[#EFE8D6]/45 p-4 dark:border-slate-800 dark:bg-slate-900/55">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#1C1917] dark:text-white">
                <Eye className="h-3.5 w-3.5 text-amber-600 dark:text-[#00F5D4]" aria-hidden="true" />
                <span>Brute → Better → Optimal Progression</span>
              </div>
              <button
                type="button"
                onClick={() => setShowBanglaEditorial((b) => !b)}
                className="flex items-center gap-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400"
              >
                <Languages className="h-3.5 w-3.5" aria-hidden="true" />
                <span>🇧🇩 {showBanglaEditorial ? 'বাংলা + English (On)' : 'Show Bangla'}</span>
              </button>
            </div>

            <div
              role="tablist"
              aria-label="3-Tier Solution Approaches"
              className="grid grid-cols-1 gap-1 rounded-lg bg-[#E2D9C5]/70 p-1 sm:grid-cols-3 dark:bg-slate-950"
            >
              {tierTabs.map((t) => {
                const isActive = activeTier === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveTier(t.id)}
                    className={`rounded-md px-2.5 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap ${
                      isActive
                        ? 'bg-[#FCF9F2] text-[#1C1917] shadow-sm dark:bg-slate-800 dark:text-[#00F5D4]'
                        : 'text-[#57534E] hover:text-[#1C1917] dark:text-slate-400 dark:hover:text-slate-200'
                    }`}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>

            <div className="space-y-3 rounded-lg border border-[#E2D9C5] bg-[#FCF9F2] p-3.5 dark:border-slate-800 dark:bg-slate-950/70">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="text-xs font-bold text-[#1C1917] dark:text-white">
                  {activeApproach.label}
                </div>
                <div className="font-mono text-[11px] font-semibold text-amber-700 dark:text-[#00F5D4]">
                  Time: {activeApproach.timeComplexity} · Space: {activeApproach.spaceComplexity}
                </div>
              </div>

              <p className="text-xs leading-relaxed text-[#57534E] dark:text-slate-300">
                <strong className="text-[#1C1917] dark:text-white">Intuition: </strong>
                {activeApproach.intuition}
              </p>

              <p
                className={`text-xs leading-relaxed ${
                  activeTier === 'brute'
                    ? 'text-rose-700 dark:text-rose-400'
                    : activeTier === 'better'
                      ? 'text-amber-700 dark:text-amber-400'
                      : 'text-emerald-700 dark:text-emerald-400'
                }`}
              >
                <strong>
                  {activeTier === 'brute'
                    ? 'Why It Triggers TLE / Fails: '
                    : activeTier === 'better'
                      ? 'Trade-off: '
                      : 'Why Optimal Wins: '}
                </strong>
                {activeApproach.whyTleOrSuboptimal}
              </p>

              <pre className="overflow-x-auto rounded-md border border-[#E2D9C5] bg-slate-950 p-2.5 font-mono text-[11px] text-cyan-300 dark:border-slate-800">
                {activeApproach.pseudocode}
              </pre>

              {showBanglaEditorial && (
                <div className="bangla-text rounded-lg border border-emerald-600/30 bg-emerald-50/75 p-3 text-xs text-[#1C1917] dark:bg-emerald-950/30 dark:text-slate-200">
                  <strong className="text-emerald-800 dark:text-emerald-300">🇧🇩 বাংলায় চিন্তা: </strong>
                  {activeApproach.banglaIntuition}
                </div>
              )}
            </div>

            {showDryRunAnimator && (
              <DryRunAnimator
                rows={problem.editorial.dryRunSteps}
                chapterId={problem.id}
                onActiveStepChange={setActiveDryRunStep}
              />
            )}

            <div className="overflow-x-auto rounded-lg border border-[#E2D9C5] dark:border-slate-800">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#EFE8D6] text-[#1C1917] dark:bg-slate-900 dark:text-slate-300">
                  <tr>
                    <th className="px-2.5 py-2">Step</th>
                    <th className="px-2.5 py-2">State</th>
                    <th className="px-2.5 py-2">Memory</th>
                    <th className="px-2.5 py-2">Note</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2D9C5] dark:divide-slate-800">
                  {problem.editorial.dryRunSteps.map((row) => (
                    <tr
                      key={row.step}
                      className={
                        activeDryRunStep === row.step
                          ? 'bg-amber-50/90 dark:bg-[#00F5D4]/10'
                          : 'bg-[#FCF9F2] dark:bg-slate-950/70'
                      }
                    >
                      <td className="px-2.5 py-2 font-mono font-bold tabular-nums text-amber-700 dark:text-[#00F5D4]">
                        {row.step}
                      </td>
                      <td className="px-2.5 py-2 text-[#1C1917] dark:text-slate-100">{row.state}</td>
                      <td className="px-2.5 py-2 font-mono text-[#57534E] dark:text-slate-300">
                        {row.memoryOrStack}
                      </td>
                      <td className="px-2.5 py-2 text-[#57534E] dark:text-slate-400">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {showBanglaEditorial && (
              <div className="bangla-text rounded-lg border border-emerald-600/30 bg-emerald-50/75 p-3 text-xs text-[#1C1917] dark:bg-emerald-950/30 dark:text-slate-200">
                <strong className="text-emerald-800 dark:text-emerald-300">🇧🇩 পূর্ণাঙ্গ বাংলা এডিটোরিয়াল: </strong>
                {problem.editorial.banglaEditorial}
              </div>
            )}
          </div>
        )}

        {showSolutionCode && (
          <div className="rounded-xl border border-[#E2D9C5] bg-slate-950 p-4 dark:border-slate-800">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-300">
              <span className="font-mono font-bold">
                Optimal {LANGUAGE_MAP[activeLang].name} Solution
              </span>
              <button
                type="button"
                onClick={() => {
                  setUseReferenceSolution(true);
                  setAutoRunNonce((n) => n + 1);
                }}
                className="flex items-center gap-1 rounded-md bg-[#00F5D4] px-2.5 py-1 text-xs font-bold text-slate-950 hover:bg-[#00F5D4]/90"
              >
                <Play className="h-3 w-3" aria-hidden="true" />
                <span>▶ Load &amp; Run in Editor</span>
              </button>
            </div>
            <pre className="mt-2 overflow-x-auto font-mono text-xs leading-relaxed text-emerald-300">
              {problem.solutions[activeLang]}
            </pre>
          </div>
        )}
      </div>

      {/* Right: Multi-Language Judge IDE */}
      <div className="xl:col-span-6 space-y-3 xl:sticky xl:top-20 xl:self-start">
        <div className="obsidian-glass-card flex flex-wrap items-center justify-between gap-2 rounded-xl px-4 py-2.5">
          <span className="text-xs font-bold text-[#1C1917] dark:text-slate-300">Judge Language:</span>
          <div className="flex flex-wrap items-center gap-1">
            {COMPILED_LANGUAGES.map((lid) => {
              const active = activeLang === lid;
              return (
                <button
                  key={lid}
                  type="button"
                  onClick={() => {
                    setActiveLang(lid);
                    setUseReferenceSolution(false);
                  }}
                  className={`rounded-md px-2.5 py-1 text-xs font-mono font-semibold transition-colors ${
                    active
                      ? 'bg-emerald-600 text-white dark:bg-emerald-500 dark:text-slate-950'
                      : 'text-[#57534E] hover:bg-[#EFE8D6] dark:text-slate-400 dark:hover:bg-slate-800'
                  }`}
                >
                  {LANGUAGE_MAP[lid].shortLabel}
                </button>
              );
            })}
          </div>
        </div>

        <CodeCompilerPane
          languageId={activeLang}
          initialCode={
            useReferenceSolution ? problem.solutions[activeLang] : problem.starterTemplates[activeLang]
          }
          initialStdin={problem.samples[0]?.input ?? ''}
          expectedSampleOutput={problem.samples[0]?.expectedOutput}
          testCases={[...problem.samples, ...problem.hiddenTests]}
          isAlreadyCompleted={isSolved}
          xpReward={problem.xpReward}
          onAccepted={onAcceptedProblem}
          onJudgeComplete={onJudgeComplete}
          onCodeRunSuccess={onCodeRunSuccess}
          onDrillPass={onDrillPass}
          onMoodChange={onMoodChange}
          mascotMood={mascotMood}
          contextKey={`${problem.id}-${activeLang}-${useReferenceSolution ? 'sol' : 'stub'}`}
          autoRunNonce={autoRunNonce}
          savedCode={!useReferenceSolution && getSavedCode ? getSavedCode(problem.id, activeLang) : null}
          onCodeChange={
            !useReferenceSolution && onSaveCode
              ? (code) => onSaveCode(problem.id, activeLang, code)
              : undefined
          }
        />
      </div>
    </div>
  );
}
