import {
  ArrowLeft,
  Columns2,
  Maximize2,
  PanelRightClose,
  PanelRightOpen,
  Pencil,
  RotateCcw,
} from 'lucide-react';
import { useState } from 'react';
import { LANGUAGE_MAP } from '../data/languages';
import type { Chapter, LanguageId } from '../types/academy';
import type { ArgonBotMood } from './ArgonBotMascot';
import { CodeCompilerPane } from './CodeCompilerPane';
import { HoldToCompleteButton } from './HoldToCompleteButton';
import { TriModeStudyPanel, type IdeSnippetPayload } from './TriModeStudyPanel';

interface ChapterStudioProps {
  selectedLanguage: LanguageId;
  chapters: Chapter[];
  activeChapter: Chapter;
  isChapterDone: boolean;
  isChapterBookmarked: boolean;
  ideOverride: IdeSnippetPayload | null;
  autoRunNonce: number;
  mascotMood: ArgonBotMood;
  onBackToLobby: () => void;
  onSelectChapter: (chapterId: string) => void;
  onCompleteChapter: (chapter: Chapter) => void;
  onToggleBookmark: (chapter: Chapter) => void;
  onOpenCheatSheet: () => void;
  onLoadIntoIde: (payload: IdeSnippetPayload) => void;
  onResetIdeOverride: () => void;
  onMoodChange: (mood: ArgonBotMood) => void;
  onCodeRunSuccess?: (contextKey: string) => void;
  onDrillPass?: (contextKey: string) => void;
  isAdmin?: boolean;
  hasOverride?: boolean;
  onOpenAdminEdit?: (chapter: Chapter) => void;
  savedCode?: string | null;
  onSaveCode?: (itemId: string, language: string, code: string) => void;
}

type StudioSplitMode = '62-38' | '50-50' | 'reader-only';

export function ChapterStudio({
  selectedLanguage,
  chapters,
  activeChapter,
  isChapterDone,
  isChapterBookmarked,
  ideOverride,
  autoRunNonce,
  mascotMood,
  onBackToLobby,
  onSelectChapter,
  onCompleteChapter,
  onToggleBookmark,
  onOpenCheatSheet,
  onLoadIntoIde,
  onResetIdeOverride,
  onMoodChange,
  onCodeRunSuccess,
  onDrillPass,
  isAdmin = false,
  hasOverride = false,
  onOpenAdminEdit,
  savedCode = null,
  onSaveCode,
}: ChapterStudioProps) {
  const [splitMode, setSplitMode] = useState<StudioSplitMode>('62-38');

  const compilerCode = ideOverride ? ideOverride.code : activeChapter.starterCode;
  const compilerStdin = ideOverride ? ideOverride.stdin : activeChapter.sampleStdin;
  const compilerExpected = ideOverride ? ideOverride.expectedOutput : activeChapter.expectedSampleOutput;
  const compilerTests = ideOverride
    ? [
        {
          id: ideOverride.keySuffix,
          input: ideOverride.stdin,
          expectedOutput: ideOverride.expectedOutput,
        },
      ]
    : activeChapter.testCases;
  const compilerContextKey = ideOverride
    ? `${activeChapter.id}-${ideOverride.keySuffix}`
    : activeChapter.id;

  function handleLoadExample(payload: IdeSnippetPayload) {
    if (splitMode === 'reader-only') {
      setSplitMode('62-38');
    }
    onLoadIntoIde(payload);
  }

  const gridClass =
    splitMode === 'reader-only'
      ? 'grid-cols-1'
      : splitMode === '50-50'
        ? 'grid-cols-1 xl:grid-cols-2'
        : 'grid-cols-1 xl:grid-cols-[minmax(0,62%)_minmax(0,38%)]';

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-5 sm:px-6 space-y-4">
      {/* Studio Top Bar: Back to Lobby + Chapter Picker + Split Resizer + Hold-to-Complete */}
      <div className="obsidian-glass-card flex flex-wrap items-center justify-between gap-3 rounded-2xl px-4 py-3">
        <div className="flex flex-wrap items-center gap-2.5 min-w-0">
          <button
            type="button"
            onClick={onBackToLobby}
            className="flex items-center gap-1.5 rounded-lg border border-[#E2D9C5] bg-[#EFE8D6]/80 px-2.5 py-1.5 text-xs font-semibold text-[#1C1917] transition-colors hover:bg-[#E2D9C5] dark:border-white/[0.08] dark:bg-[#07090D]/80 dark:text-slate-200 dark:hover:bg-slate-800 whitespace-nowrap"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Lobby</span>
          </button>

          <span className="hidden sm:inline-flex items-center rounded-md border border-emerald-500/25 bg-emerald-500/10 px-2 py-1 text-[11px] font-bold tracking-tight text-emerald-800 dark:text-emerald-300 whitespace-nowrap">
            <span className="hidden xl:inline">Ace Coding Hub Studio</span>
            <span className="xl:hidden">AceCode Studio</span>
          </span>

          <label htmlFor="studio-chapter-select" className="sr-only">
            Switch Chapter
          </label>
          <select
            id="studio-chapter-select"
            value={activeChapter.id}
            onChange={(e) => onSelectChapter(e.target.value)}
            className="max-w-[280px] sm:max-w-[380px] truncate rounded-lg border border-[#E2D9C5] bg-[#FCF9F2] px-3 py-1.5 text-xs font-semibold text-[#1C1917] focus:border-emerald-600 focus:outline-none dark:border-white/[0.08] dark:bg-[#07090D] dark:text-slate-100 dark:focus:border-emerald-400"
          >
            {chapters.map((ch) => (
              <option key={ch.id} value={ch.id}>
                {LANGUAGE_MAP[selectedLanguage].shortLabel} Ch {ch.number}: {ch.title}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          {/* Resizable / Collapsible IDE Split Switcher */}
          <div
            role="group"
            aria-label="Studio Split Layout"
            className="hidden xl:flex items-center gap-1 rounded-lg bg-[#EFE8D6] p-1 dark:bg-[#07090D]/80 dark:border dark:border-white/[0.06]"
          >
            <button
              type="button"
              onClick={() => setSplitMode('62-38')}
              className={`flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-semibold transition-colors ${
                splitMode === '62-38'
                  ? 'bg-[#FCF9F2] text-emerald-800 shadow-sm dark:bg-emerald-500/15 dark:text-emerald-300'
                  : 'text-[#57534E] dark:text-slate-400'
              }`}
            >
              <Maximize2 className="h-3 w-3" aria-hidden="true" />
              <span>62% / 38%</span>
            </button>
            <button
              type="button"
              onClick={() => setSplitMode('50-50')}
              className={`flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-semibold transition-colors ${
                splitMode === '50-50'
                  ? 'bg-[#FCF9F2] text-emerald-800 shadow-sm dark:bg-emerald-500/15 dark:text-emerald-300'
                  : 'text-[#57534E] dark:text-slate-400'
              }`}
            >
              <Columns2 className="h-3 w-3" aria-hidden="true" />
              <span>50% / 50%</span>
            </button>
            <button
              type="button"
              onClick={() => setSplitMode('reader-only')}
              className={`flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-semibold transition-colors ${
                splitMode === 'reader-only'
                  ? 'bg-[#FCF9F2] text-emerald-800 shadow-sm dark:bg-emerald-500/15 dark:text-emerald-300'
                  : 'text-[#57534E] dark:text-slate-400'
              }`}
            >
              <PanelRightClose className="h-3 w-3" aria-hidden="true" />
              <span>Focus Reader</span>
            </button>
          </div>

          {splitMode === 'reader-only' && (
            <button
              type="button"
              onClick={() => setSplitMode('62-38')}
              className="hidden xl:flex items-center gap-1 rounded-lg border border-emerald-600/40 bg-emerald-50 px-2.5 py-1.5 text-xs font-semibold text-emerald-900 dark:border-emerald-400/45 dark:bg-emerald-500/10 dark:text-emerald-300"
            >
              <PanelRightOpen className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Show Live IDE</span>
            </button>
          )}

          {isAdmin && onOpenAdminEdit && (
            <button
              type="button"
              onClick={() => onOpenAdminEdit(activeChapter)}
              className="flex items-center gap-1.5 rounded-lg border border-emerald-600/40 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-900 transition-colors hover:bg-emerald-100 dark:border-[#C8EE72]/45 dark:bg-[#C8EE72]/15 dark:text-[#C8EE72] dark:hover:bg-[#C8EE72]/25 whitespace-nowrap shrink-0"
            >
              <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Edit Content{hasOverride ? ' · Live' : ''}</span>
            </button>
          )}

          <HoldToCompleteButton
            chapterNumber={activeChapter.number}
            xpReward={activeChapter.xpReward}
            isDone={isChapterDone}
            onComplete={() => onCompleteChapter(activeChapter)}
          />
        </div>
      </div>

      {/* 62% Textbook Reader + 38% Sticky Live Compiler Split */}
      <div className={`grid gap-5 items-start ${gridClass}`}>
        <div className="min-w-0">
          <TriModeStudyPanel
            chapter={activeChapter}
            isBookmarked={isChapterBookmarked}
            onToggleBookmark={onToggleBookmark}
            onOpenCheatSheet={onOpenCheatSheet}
            onLoadIntoIde={handleLoadExample}
            activeIdeLabel={ideOverride?.label ?? null}
          />
        </div>

        {splitMode !== 'reader-only' && (
          <div className="min-w-0 space-y-3 xl:sticky xl:top-20 xl:self-start">
            {ideOverride && (
              <div className="flex items-center justify-between gap-2 rounded-xl border border-emerald-500/40 bg-emerald-50/90 px-3.5 py-2 text-xs backdrop-blur-md dark:border-emerald-400/40 dark:bg-emerald-500/10">
                <span className="font-medium text-emerald-900 dark:text-emerald-300 truncate">
                  Active Example: <strong>{ideOverride.label}</strong>
                </span>
                <button
                  type="button"
                  onClick={onResetIdeOverride}
                  className="flex items-center gap-1 rounded-md border border-emerald-600/30 bg-[#FCF9F2] px-2 py-1 text-[11px] font-semibold text-emerald-900 hover:bg-emerald-100 dark:border-emerald-400/40 dark:bg-[#0E131D] dark:text-emerald-300 whitespace-nowrap shrink-0"
                >
                  <RotateCcw className="h-3 w-3" aria-hidden="true" />
                  <span>Reset Starter</span>
                </button>
              </div>
            )}

            <CodeCompilerPane
              languageId={activeChapter.languageId}
              initialCode={compilerCode}
              initialStdin={compilerStdin}
              expectedSampleOutput={compilerExpected}
              testCases={compilerTests}
              isAlreadyCompleted={isChapterDone}
              xpReward={activeChapter.xpReward}
              onAccepted={() => onCompleteChapter(activeChapter)}
              onCodeRunSuccess={onCodeRunSuccess}
              onDrillPass={onDrillPass}
              onMoodChange={onMoodChange}
              mascotMood={mascotMood}
              contextKey={compilerContextKey}
              autoRunNonce={autoRunNonce}
              savedCode={!ideOverride ? savedCode : null}
              onCodeChange={
                !ideOverride && onSaveCode
                  ? (code) => onSaveCode(activeChapter.id, activeChapter.languageId, code)
                  : undefined
              }
            />
          </div>
        )}
      </div>
    </div>
  );
}
