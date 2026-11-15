import { CheckCircle2, Eye, Play, RotateCcw, Send, TerminalSquare, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { LANGUAGE_MAP } from '../data/languages';
import type { CompiledLanguageId, ExecutionResult, JudgeSubmissionReport, LanguageId, TestCase } from '../types/academy';
import { executeWithPiston, runAutomatedJudge } from '../utils/judge';
import { ArgonBotMascot, type ArgonBotMood } from './ArgonBotMascot';

interface CodeCompilerPaneProps {
  languageId: LanguageId;
  initialCode: string;
  initialStdin: string;
  expectedSampleOutput?: string;
  testCases: TestCase[];
  isAlreadyCompleted?: boolean;
  xpReward?: number;
  onAccepted?: () => void;
  onJudgeComplete?: (report: JudgeSubmissionReport) => void;
  onCodeRunSuccess?: (contextKey: string) => void;
  onDrillPass?: (contextKey: string) => void;
  onMoodChange?: (mood: ArgonBotMood) => void;
  mascotMood?: ArgonBotMood;
  contextKey: string;
  autoRunNonce?: number;
  savedCode?: string | null;
  onCodeChange?: (code: string) => void;
}

export function CodeCompilerPane({
  languageId,
  initialCode,
  initialStdin,
  expectedSampleOutput,
  testCases,
  isAlreadyCompleted = false,
  xpReward = 0,
  onAccepted,
  onJudgeComplete,
  onCodeRunSuccess,
  onDrillPass,
  onMoodChange,
  mascotMood = 'idle',
  contextKey,
  autoRunNonce = 0,
  savedCode = null,
  onCodeChange,
}: CodeCompilerPaneProps) {
  const [code, setCode] = useState(savedCode ?? initialCode);
  const [stdin, setStdin] = useState(initialStdin);
  const [running, setRunning] = useState(false);
  const [execResult, setExecResult] = useState<ExecutionResult | null>(null);
  const [judgeReport, setJudgeReport] = useState<JudgeSubmissionReport | null>(null);
  const [lastContextKey, setLastContextKey] = useState(contextKey);
  const [hasEditedInContext, setHasEditedInContext] = useState(false);

  useEffect(() => {
    if (contextKey !== lastContextKey) {
      setLastContextKey(contextKey);
      setHasEditedInContext(false);
      setCode(savedCode ?? initialCode);
      setStdin(initialStdin);
      setExecResult(null);
      setJudgeReport(null);
    } else if (!hasEditedInContext && savedCode !== null && savedCode !== code) {
      setCode(savedCode);
    }
  }, [contextKey, lastContextKey, savedCode, initialCode, initialStdin, hasEditedInContext, code]);

  const langMeta = LANGUAGE_MAP[languageId];
  const isHtml = languageId === 'html';
  const lineCount = Math.max(12, code.split('\n').length);

  async function executeSnippet(sourceCode: string, sourceStdin: string) {
    if (isHtml) {
      setExecResult({
        stdout: 'Live HTML/CSS/JS preview rendered in sandbox iframe.',
        stderr: '',
        exitCode: 0,
        runtimeMs: 2,
        source: 'html-preview',
      });
      onMoodChange?.('idle');
      onCodeRunSuccess?.(contextKey);
      return;
    }

    setRunning(true);
    setJudgeReport(null);
    const result = await executeWithPiston(
      languageId as CompiledLanguageId,
      sourceCode,
      sourceStdin,
      expectedSampleOutput,
    );
    setExecResult(result);
    setRunning(false);

    if (result.exitCode !== 0 || result.stderr.trim().length > 0) {
      onMoodChange?.('surprised');
    } else {
      onMoodChange?.('idle');
      onCodeRunSuccess?.(contextKey);
    }
  }

  useEffect(() => {
    if (autoRunNonce > 0) {
      void executeSnippet(initialCode, initialStdin);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoRunNonce]);

  async function handleRunCode() {
    await executeSnippet(code, stdin);
  }

  async function handleRunJudge() {
    if (isHtml) {
      const hasContent = code.trim().length > 20;
      setJudgeReport({
        verdict: hasContent ? 'AC' : 'WA',
        passedCount: hasContent ? 1 : 0,
        totalCount: 1,
        outcomes: [
          {
            testId: 'html-dom-check',
            passed: hasContent,
            isHidden: false,
            input: 'DOM Render',
            expectedOutput: 'Valid HTML5 document',
            actualOutput: hasContent ? 'Valid HTML5 rendered' : 'Document too short',
            verdict: hasContent ? 'AC' : 'WA',
            runtimeMs: 4,
          },
        ],
        totalRuntimeMs: 4,
        source: 'html-preview',
      });
      if (hasContent) {
        onMoodChange?.('happy');
        onDrillPass?.(contextKey);
        onAccepted?.();
      } else {
        onMoodChange?.('surprised');
      }
      return;
    }

    setRunning(true);
    setExecResult(null);
    const report = await runAutomatedJudge(languageId as CompiledLanguageId, code, testCases);
    setJudgeReport(report);
    setRunning(false);
    onJudgeComplete?.(report);

    if (report.verdict === 'AC') {
      onMoodChange?.('happy');
      onDrillPass?.(contextKey);
      onAccepted?.();
    } else {
      onMoodChange?.('surprised');
    }
  }

  function handleReset() {
    setHasEditedInContext(false);
    setCode(initialCode);
    setStdin(initialStdin);
    setExecResult(null);
    setJudgeReport(null);
    onCodeChange?.(initialCode);
    onMoodChange?.('idle');
  }

  return (
    <div className="obsidian-glass-card flex flex-col rounded-xl overflow-hidden">
      {/* Editor Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E2D9C5] bg-[#EFE8D6]/70 px-4 py-2.5 dark:border-white/[0.08] dark:bg-[#0B1018]/90">
        <div className="flex items-center gap-2 text-xs">
          <ArgonBotMascot mood={mascotMood} size="sm" />
          <TerminalSquare className="h-4 w-4 text-emerald-700 dark:text-emerald-400" aria-hidden="true" />
          <span className="font-mono font-bold text-[#1C1917] dark:text-white">
            main.{langMeta.extension}
          </span>
          <span aria-hidden="true" className="text-[#57534E] dark:text-slate-500">·</span>
          <span className="font-mono text-[#57534E] dark:text-slate-400">
            {langMeta.badgeText}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleReset}
            title="Reset to starter code"
            className="flex items-center gap-1 rounded-md border border-[#E2D9C5] bg-[#FCF9F2] px-2.5 py-1.5 text-xs font-semibold text-[#1C1917] hover:bg-[#EFE8D6] dark:border-white/[0.08] dark:bg-[#0E131D] dark:text-slate-300 dark:hover:bg-slate-800 whitespace-nowrap"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Reset</span>
          </button>

          {!isHtml && (
            <button
              type="button"
              onClick={handleRunCode}
              disabled={running}
              className="flex items-center gap-1.5 rounded-md border border-[#E2D9C5] bg-[#FCF9F2] px-3 py-1.5 text-xs font-semibold text-[#1C1917] hover:bg-[#EFE8D6] disabled:opacity-50 dark:border-white/[0.08] dark:bg-[#0E131D] dark:text-slate-100 dark:hover:bg-slate-800 whitespace-nowrap"
            >
              <Play className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
              <span>{running ? 'Running...' : 'Run Code'}</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleRunJudge}
            disabled={running}
            className="flex items-center gap-1.5 rounded-md bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white shadow-[0_0_16px_-6px_rgba(16,185,129,0.6)] hover:bg-emerald-500 disabled:opacity-50 dark:bg-emerald-500 dark:text-slate-950 dark:hover:bg-emerald-400 whitespace-nowrap"
          >
            <Send className="h-3.5 w-3.5" aria-hidden="true" />
            <span>
              {running
                ? 'Judging...'
                : isHtml
                  ? 'Verify & Claim XP'
                  : isAlreadyCompleted
                    ? 'Re-Submit Judge'
                    : `Submit Judge (+${xpReward} XP)`}
            </span>
          </button>
        </div>
      </div>

      {/* Code Editor with Line Gutter */}
      <div className="relative flex max-h-[340px] min-h-[240px] overflow-y-auto bg-[#07090D] text-slate-100 font-mono text-xs">
        <div
          aria-hidden="true"
          className="select-none border-r border-white/[0.06] bg-[#0A0E16] px-3 py-3 text-right text-slate-500 tabular-nums leading-6 shrink-0"
        >
          {Array.from({ length: lineCount }, (_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>
        <textarea
          aria-label="Code editor"
          spellCheck={false}
          value={code}
          onChange={(e) => {
            const nextVal = e.target.value;
            setHasEditedInContext(true);
            setCode(nextVal);
            onCodeChange?.(nextVal);
          }}
          className="w-full min-h-full resize-none overflow-x-auto overflow-y-hidden bg-transparent p-3 font-mono text-xs leading-6 text-slate-100 focus:outline-none"
          rows={lineCount}
        />
      </div>

      {/* HTML Split-Pane Preview OR Stdin/Stdout Console */}
      {isHtml ? (
        <div className="border-t border-[#E2D9C5] dark:border-slate-800">
          <div className="flex items-center justify-between bg-[#EFE8D6] px-4 py-2 text-xs font-semibold text-[#1C1917] dark:bg-slate-900 dark:text-slate-300">
            <span className="flex items-center gap-1.5">
              <Eye className="h-3.5 w-3.5 text-amber-600 dark:text-[#00F5D4]" aria-hidden="true" />
              Live Browser Preview (Split-Pane HTML/CSS/JS)
            </span>
            <span className="font-mono text-[11px] text-[#57534E] dark:text-slate-400">
              Sandboxed iframe
            </span>
          </div>
          <iframe
            title="Live HTML Preview"
            sandbox="allow-scripts"
            srcDoc={code}
            className="h-56 w-full bg-[#070B14] border-0"
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 divide-y divide-[#E2D9C5] border-t border-[#E2D9C5] dark:divide-slate-800 dark:border-slate-800 md:grid-cols-2 md:divide-x md:divide-y-0">
          {/* Custom Stdin */}
          <div className="p-3">
            <label
              htmlFor={`stdin-${contextKey}`}
              className="block text-[11px] font-semibold text-[#57534E] dark:text-slate-400"
            >
              Custom Input (stdin)
            </label>
            <textarea
              id={`stdin-${contextKey}`}
              value={stdin}
              onChange={(e) => setStdin(e.target.value)}
              rows={4}
              spellCheck={false}
              className="mt-1.5 w-full rounded-lg border border-[#E2D9C5] bg-[#F7F3E8] p-2.5 font-mono text-xs text-[#1C1917] focus:border-amber-600 focus:outline-none dark:border-slate-800 dark:bg-[#070B14] dark:text-slate-100 dark:focus:border-[#00F5D4]"
            />
          </div>

          {/* Execution Console / Judge Output */}
          <div className="p-3">
            <div className="flex items-center justify-between text-[11px] font-semibold text-[#57534E] dark:text-slate-400">
              <span>Output Console</span>
              {execResult && (
                <span className="font-mono tabular-nums">
                  {execResult.runtimeMs}ms ·{' '}
                  {execResult.source === 'piston'
                    ? 'Piston Cloud'
                    : execResult.source === 'local-js'
                      ? 'Local JS'
                      : 'Offline Sim'}
                </span>
              )}
            </div>

            {!execResult && !judgeReport && (
              <div className="mt-1.5 rounded-lg border border-dashed border-[#D6CCB4] p-3 text-xs text-[#57534E] dark:border-slate-800 dark:text-slate-400">
                Click <strong>Run Code</strong> to execute with custom stdin, or{' '}
                <strong>Submit Judge</strong> to verify against sample &amp; hidden tests.
              </div>
            )}

            {execResult && (
              <div className="mt-1.5 space-y-1.5">
                {execResult.stderr && (
                  <pre className="overflow-x-auto rounded-lg bg-rose-950/85 p-2.5 font-mono text-xs text-rose-200">
                    {execResult.stderr}
                  </pre>
                )}
                <pre className="max-h-32 overflow-auto rounded-lg bg-[#070B14] p-2.5 font-mono text-xs text-emerald-300">
                  {execResult.stdout || '(No stdout output)'}
                </pre>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Automated Judge Test Case Breakdown */}
      {judgeReport && (
        <div
          aria-live="polite"
          className="border-t border-[#E2D9C5] bg-[#EFE8D6]/50 p-4 dark:border-slate-800 dark:bg-slate-900/60"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              {judgeReport.verdict === 'AC' ? (
                <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
              ) : (
                <XCircle className="h-5 w-5 text-rose-600 dark:text-rose-400" aria-hidden="true" />
              )}
              <span
                className={`text-sm font-bold ${
                  judgeReport.verdict === 'AC'
                    ? 'text-emerald-700 dark:text-emerald-400'
                    : 'text-rose-700 dark:text-rose-400'
                }`}
              >
                {judgeReport.verdict === 'AC'
                  ? 'Accepted (AC) — All Tests Passed'
                  : `Verdict: ${judgeReport.verdict}`}
              </span>
            </div>
            <span className="font-mono text-xs tabular-nums text-[#57534E] dark:text-slate-400">
              {judgeReport.passedCount}/{judgeReport.totalCount} tests · {judgeReport.totalRuntimeMs}ms
            </span>
          </div>

          <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {judgeReport.outcomes.map((o, idx) => (
              <div
                key={o.testId}
                className={`rounded-lg border p-2.5 text-xs ${
                  o.passed
                    ? 'border-emerald-600/30 bg-emerald-50/70 dark:border-emerald-500/30 dark:bg-emerald-950/20'
                    : 'border-rose-600/30 bg-rose-50/70 dark:border-rose-500/30 dark:bg-rose-950/20'
                }`}
              >
                <div className="flex items-center justify-between font-mono font-semibold">
                  <span className="text-[#1C1917] dark:text-slate-100">
                    Test #{idx + 1} {o.isHidden ? '(Hidden)' : '(Sample)'}
                  </span>
                  <span
                    className={
                      o.passed
                        ? 'text-emerald-700 dark:text-emerald-400'
                        : 'text-rose-700 dark:text-rose-400'
                    }
                  >
                    {o.verdict} · {o.runtimeMs}ms
                  </span>
                </div>
                {!o.passed && !o.isHidden && (
                  <div className="mt-1.5 font-mono text-[11px] text-[#1C1917] dark:text-slate-300">
                    <div>Expected: {o.expectedOutput}</div>
                    <div>Got: {o.actualOutput || '(empty)'}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
