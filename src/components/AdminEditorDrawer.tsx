import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  Pencil,
  PlusCircle,
  RotateCcw,
  Save,
  X,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import type { Chapter, ContentOverrideRecord, Problem } from '../types/academy';

export type AdminEditorTarget =
  | { kind: 'chapter'; chapter: Chapter }
  | { kind: 'problem'; problem: Problem }
  | { kind: 'new-problem' };

interface AdminEditorDrawerProps {
  isOpen: boolean;
  target: AdminEditorTarget | null;
  overrides: Record<string, ContentOverrideRecord>;
  onClose: () => void;
  onSaveOverride: (
    id: string,
    targetType: ContentOverrideRecord['target_type'],
    payload: Record<string, unknown>,
  ) => Promise<{ ok: true } | { ok: false; error: string }>;
  onRevertOverride: (id: string) => Promise<{ ok: true } | { ok: false; error: string }>;
}

export function AdminEditorDrawer({
  isOpen,
  target,
  overrides,
  onClose,
  onSaveOverride,
  onRevertOverride,
}: AdminEditorDrawerProps) {
  const [activeTab, setActiveTab] = useState<'edit-current' | 'create-problem'>('edit-current');

  // Edit Current Chapter fields
  const [chTitle, setChTitle] = useState('');
  const [chBanglaTitle, setChBanglaTitle] = useState('');
  const [chSubtitle, setChSubtitle] = useState('');
  const [chStory, setChStory] = useState('');
  const [chBanglaSummary, setChBanglaSummary] = useState('');
  const [chBanglaZero, setChBanglaZero] = useState('');
  const [chStarterCode, setChStarterCode] = useState('');
  const [chXp, setChXp] = useState(100);

  // Edit Current Problem fields
  const [probTitle, setProbTitle] = useState('');
  const [probBanglaTitle, setProbBanglaTitle] = useState('');
  const [probDifficulty, setProbDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Easy');
  const [probXp, setProbXp] = useState(120);
  const [probStatement, setProbStatement] = useState('');
  const [probInputFmt, setProbInputFmt] = useState('');
  const [probOutputFmt, setProbOutputFmt] = useState('');
  const [probOptimal, setProbOptimal] = useState('');
  const [probBanglaEd, setProbBanglaEd] = useState('');

  // Create New Custom Problem fields
  const [newId, setNewId] = useState('');
  const [newCategory, setNewCategory] = useState<'cp' | 'interview'>('cp');
  const [newPlatform, setNewPlatform] = useState<'Codeforces' | 'CodeChef' | 'LeetCode' | 'AtCoder' | 'FAANG'>('Codeforces');
  const [newDifficulty, setNewDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Easy');
  const [newTitle, setNewTitle] = useState('');
  const [newBanglaTitle, setNewBanglaTitle] = useState('');
  const [newStatement, setNewStatement] = useState('');
  const [newSampleIn, setNewSampleIn] = useState('');
  const [newSampleOut, setNewSampleOut] = useState('');
  const [newPythonStarter, setNewPythonStarter] = useState(
    'import sys\ndata = sys.stdin.read().strip()\nprint(data)\n',
  );
  const [newBanglaEd, setNewBanglaEd] = useState('');

  const [saving, setSaving] = useState(false);
  const [reverting, setReverting] = useState(false);
  const [confirmRevert, setConfirmRevert] = useState(false);
  const [feedback, setFeedback] = useState<{ kind: 'ok' | 'err'; text: string } | null>(null);

  useEffect(() => {
    setFeedback(null);
    setConfirmRevert(false);
    if (!target) return;

    if (target.kind === 'new-problem') {
      setActiveTab('create-problem');
      return;
    }

    setActiveTab('edit-current');
    if (target.kind === 'chapter') {
      const c = target.chapter;
      setChTitle(c.title);
      setChBanglaTitle(c.banglaTitle);
      setChSubtitle(c.subtitle);
      setChStory(c.zeroIntuition.plainEnglishStory);
      setChBanglaSummary(c.banglaExplanation.summary);
      setChBanglaZero(c.zeroIntuition.banglaZeroToHero.explanation);
      setChStarterCode(c.starterCode);
      setChXp(c.xpReward);
    } else if (target.kind === 'problem') {
      const p = target.problem;
      setProbTitle(p.title);
      setProbBanglaTitle(p.banglaTitle);
      setProbDifficulty(p.difficulty);
      setProbXp(p.xpReward);
      setProbStatement(p.statement);
      setProbInputFmt(p.inputFormat);
      setProbOutputFmt(p.outputFormat);
      setProbOptimal(p.editorial.optimalApproach);
      setProbBanglaEd(p.editorial.banglaEditorial);
    }
  }, [target, isOpen]);

  const currentTargetId =
    target?.kind === 'chapter'
      ? target.chapter.id
      : target?.kind === 'problem'
        ? target.problem.id
        : null;

  const hasExistingOverride = Boolean(currentTargetId && overrides[currentTargetId]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setFeedback(null);

    if (activeTab === 'create-problem') {
      const cleanTitle = newTitle.trim();
      const cleanStmt = newStatement.trim();
      if (!cleanTitle || !cleanStmt) {
        setFeedback({ kind: 'err', text: 'Problem title and statement are required.' });
        return;
      }
      const slug =
        newId.trim() ||
        `custom-${newCategory}-${cleanTitle
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '')
          .slice(0, 36)}-${Date.now().toString(36)}`;

      setSaving(true);
      const res = await onSaveOverride(slug, 'custom_problem', {
        category: newCategory,
        platform: newPlatform,
        difficulty: newDifficulty,
        title: cleanTitle,
        banglaTitle: newBanglaTitle.trim() || `${cleanTitle} (বাংলা)`,
        statement: cleanStmt,
        sampleInput: newSampleIn,
        sampleOutput: newSampleOut || 'OK',
        pythonStarter: newPythonStarter,
        banglaEditorial: newBanglaEd.trim() || `${cleanTitle} সমাধানের ধাপসমূহ।`,
      });
      setSaving(false);

      if (!res.ok) {
        setFeedback({ kind: 'err', text: res.error });
        return;
      }
      setFeedback({
        kind: 'ok',
        text: `Published custom problem "${cleanTitle}" (${slug}) live to Supabase!`,
      });
      setNewId('');
      setNewTitle('');
      setNewBanglaTitle('');
      setNewStatement('');
      return;
    }

    if (!target || target.kind === 'new-problem') return;

    setSaving(true);
    if (target.kind === 'chapter') {
      const res = await onSaveOverride(target.chapter.id, 'chapter', {
        title: chTitle.trim(),
        banglaTitle: chBanglaTitle.trim(),
        subtitle: chSubtitle.trim(),
        plainEnglishStory: chStory,
        banglaSummary: chBanglaSummary,
        banglaZeroExplanation: chBanglaZero,
        starterCode: chStarterCode,
        xpReward: Number(chXp) || target.chapter.xpReward,
      });
      setSaving(false);
      if (!res.ok) {
        setFeedback({ kind: 'err', text: res.error });
        return;
      }
      setFeedback({
        kind: 'ok',
        text: 'Chapter override saved live to Supabase content_overrides.',
      });
    } else if (target.kind === 'problem') {
      const overrideType =
        overrides[target.problem.id]?.target_type === 'custom_problem'
          ? 'custom_problem'
          : 'problem';
      const existingPayload = overrides[target.problem.id]?.payload ?? {};
      const res = await onSaveOverride(target.problem.id, overrideType, {
        ...existingPayload,
        title: probTitle.trim(),
        banglaTitle: probBanglaTitle.trim(),
        difficulty: probDifficulty,
        xpReward: Number(probXp) || target.problem.xpReward,
        statement: probStatement,
        inputFormat: probInputFmt,
        outputFormat: probOutputFmt,
        optimalApproach: probOptimal,
        banglaEditorial: probBanglaEd,
      });
      setSaving(false);
      if (!res.ok) {
        setFeedback({ kind: 'err', text: res.error });
        return;
      }
      setFeedback({
        kind: 'ok',
        text: 'Problem override saved live to Supabase content_overrides.',
      });
    }
  }

  async function handleRevert() {
    if (!currentTargetId) return;
    if (!confirmRevert) {
      setConfirmRevert(true);
      return;
    }
    setReverting(true);
    const res = await onRevertOverride(currentTargetId);
    setReverting(false);
    setConfirmRevert(false);
    if (!res.ok) {
      setFeedback({ kind: 'err', text: res.error });
      return;
    }
    setFeedback({
      kind: 'ok',
      text: 'Override removed. Built-in curriculum content restored.',
    });
  }

  return (
    <AnimatePresence>
      {isOpen && target && (
        <motion.div
          key="admin-drawer-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.16 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="admin-drawer-title"
          className="fixed inset-0 z-50 flex justify-end bg-slate-950/75 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 360, damping: 32 }}
            onClick={(e) => e.stopPropagation()}
            className="flex h-full w-full max-w-2xl flex-col border-l border-[#E2D9C5] bg-[#FCF9F2] text-[#1C1917] shadow-2xl dark:border-white/[0.1] dark:bg-[#0B101A] dark:text-slate-100"
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-3 border-b border-[#E2D9C5] px-6 py-4 dark:border-white/[0.08]">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-[#C8EE72]">
                  <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Admin Content CMS · Supabase Live Overrides</span>
                </div>
                <h2
                  id="admin-drawer-title"
                  className="mt-0.5 font-display text-lg font-bold text-[#1C1917] dark:text-white"
                >
                  {activeTab === 'create-problem'
                    ? 'Add New Custom Problem'
                    : target.kind === 'chapter'
                      ? `Edit Chapter: ${target.chapter.id}`
                      : target.kind === 'problem'
                        ? `Edit Problem: ${target.problem.id}`
                        : 'Edit Content'}
                </h2>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close admin content editor"
                className="rounded-lg p-2 text-[#57534E] hover:bg-[#EFE8D6] dark:text-slate-400 dark:hover:bg-slate-800"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            {/* Sub-Tabs */}
            <div className="flex items-center gap-2 border-b border-[#E2D9C5] px-6 py-2.5 dark:border-white/[0.08]">
              {target.kind !== 'new-problem' && (
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('edit-current');
                    setFeedback(null);
                  }}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap ${
                    activeTab === 'edit-current'
                      ? 'bg-[#1C1917] text-[#FCF9F2] dark:bg-[#C8EE72] dark:text-[#07090D]'
                      : 'bg-[#EFE8D6] text-[#57534E] dark:bg-white/[0.06] dark:text-slate-300'
                  }`}
                >
                  <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Edit Current {target.kind === 'chapter' ? 'Chapter' : 'Problem'}</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => {
                  setActiveTab('create-problem');
                  setFeedback(null);
                }}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap ${
                  activeTab === 'create-problem'
                    ? 'bg-[#1C1917] text-[#FCF9F2] dark:bg-[#C8EE72] dark:text-[#07090D]'
                    : 'bg-[#EFE8D6] text-[#57534E] dark:bg-white/[0.06] dark:text-slate-300'
                }`}
              >
                <PlusCircle className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Create Custom Problem</span>
              </button>

              {hasExistingOverride && activeTab === 'edit-current' && (
                <span className="ml-auto font-mono text-[11px] font-semibold text-emerald-700 dark:text-[#C8EE72]">
                  Override Active
                </span>
              )}
            </div>

            {/* Form Body */}
            <form onSubmit={handleSave} className="flex flex-1 flex-col overflow-hidden">
              <div className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
                {feedback && (
                  <div
                    role="status"
                    className={`flex items-start gap-2 rounded-xl border p-3 text-xs font-medium ${
                      feedback.kind === 'err'
                        ? 'border-rose-500/40 bg-rose-50 text-rose-800 dark:bg-rose-950/50 dark:text-rose-200'
                        : 'border-emerald-500/40 bg-emerald-50 text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200'
                    }`}
                  >
                    {feedback.kind === 'err' ? (
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    ) : (
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    )}
                    <span>{feedback.text}</span>
                  </div>
                )}

                {activeTab === 'edit-current' && target.kind === 'chapter' && (
                  <>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="admin-ch-title"
                          className="block text-xs font-semibold text-[#1C1917] dark:text-slate-200"
                        >
                          Chapter Title (English)
                        </label>
                        <input
                          id="admin-ch-title"
                          type="text"
                          required
                          value={chTitle}
                          onChange={(e) => setChTitle(e.target.value)}
                          className="mt-1 w-full rounded-lg border border-[#E2D9C5] bg-white px-3 py-2 text-sm dark:border-white/[0.12] dark:bg-[#07090D] dark:text-white"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="admin-ch-xp"
                          className="block text-xs font-semibold text-[#1C1917] dark:text-slate-200"
                        >
                          XP Reward
                        </label>
                        <input
                          id="admin-ch-xp"
                          type="number"
                          min={10}
                          max={2000}
                          value={chXp}
                          onChange={(e) => setChXp(Number(e.target.value))}
                          className="mt-1 w-full rounded-lg border border-[#E2D9C5] bg-white px-3 py-2 font-mono text-sm dark:border-white/[0.12] dark:bg-[#07090D] dark:text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="admin-ch-bangla-title"
                        className="block text-xs font-semibold text-[#1C1917] dark:text-slate-200"
                      >
                        Bangla Title (বাংলা শিরোনাম)
                      </label>
                      <input
                        id="admin-ch-bangla-title"
                        type="text"
                        value={chBanglaTitle}
                        onChange={(e) => setChBanglaTitle(e.target.value)}
                        className="bangla-text mt-1 w-full rounded-lg border border-[#E2D9C5] bg-white px-3 py-2 text-sm dark:border-white/[0.12] dark:bg-[#07090D] dark:text-white"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="admin-ch-subtitle"
                        className="block text-xs font-semibold text-[#1C1917] dark:text-slate-200"
                      >
                        Subtitle
                      </label>
                      <input
                        id="admin-ch-subtitle"
                        type="text"
                        value={chSubtitle}
                        onChange={(e) => setChSubtitle(e.target.value)}
                        className="mt-1 w-full rounded-lg border border-[#E2D9C5] bg-white px-3 py-2 text-sm dark:border-white/[0.12] dark:bg-[#07090D] dark:text-white"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="admin-ch-story"
                        className="block text-xs font-semibold text-[#1C1917] dark:text-slate-200"
                      >
                        Zero-Intuition Plain English Explanation
                      </label>
                      <textarea
                        id="admin-ch-story"
                        rows={4}
                        value={chStory}
                        onChange={(e) => setChStory(e.target.value)}
                        className="mt-1 w-full rounded-lg border border-[#E2D9C5] bg-white p-3 text-xs leading-relaxed dark:border-white/[0.12] dark:bg-[#07090D] dark:text-white"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="admin-ch-bangla-zero"
                        className="block text-xs font-semibold text-[#1C1917] dark:text-slate-200"
                      >
                        সহজ বাংলা Intuition (Zero-to-Hero)
                      </label>
                      <textarea
                        id="admin-ch-bangla-zero"
                        rows={4}
                        value={chBanglaZero}
                        onChange={(e) => setChBanglaZero(e.target.value)}
                        className="bangla-text mt-1 w-full rounded-lg border border-[#E2D9C5] bg-white p-3 text-xs leading-relaxed dark:border-white/[0.12] dark:bg-[#07090D] dark:text-white"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="admin-ch-bangla-sum"
                        className="block text-xs font-semibold text-[#1C1917] dark:text-slate-200"
                      >
                        সহজ বাংলা Summary
                      </label>
                      <textarea
                        id="admin-ch-bangla-sum"
                        rows={3}
                        value={chBanglaSummary}
                        onChange={(e) => setChBanglaSummary(e.target.value)}
                        className="bangla-text mt-1 w-full rounded-lg border border-[#E2D9C5] bg-white p-3 text-xs leading-relaxed dark:border-white/[0.12] dark:bg-[#07090D] dark:text-white"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="admin-ch-starter"
                        className="block text-xs font-semibold text-[#1C1917] dark:text-slate-200"
                      >
                        Default Starter Code
                      </label>
                      <textarea
                        id="admin-ch-starter"
                        rows={5}
                        spellCheck={false}
                        value={chStarterCode}
                        onChange={(e) => setChStarterCode(e.target.value)}
                        className="mt-1 w-full rounded-lg border border-[#E2D9C5] bg-[#07090D] p-3 font-mono text-xs text-emerald-300 dark:border-white/[0.12]"
                      />
                    </div>
                  </>
                )}

                {activeTab === 'edit-current' && target.kind === 'problem' && (
                  <>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                      <div className="sm:col-span-2">
                        <label
                          htmlFor="admin-prob-title"
                          className="block text-xs font-semibold text-[#1C1917] dark:text-slate-200"
                        >
                          Problem Title
                        </label>
                        <input
                          id="admin-prob-title"
                          type="text"
                          required
                          value={probTitle}
                          onChange={(e) => setProbTitle(e.target.value)}
                          className="mt-1 w-full rounded-lg border border-[#E2D9C5] bg-white px-3 py-2 text-sm dark:border-white/[0.12] dark:bg-[#07090D] dark:text-white"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="admin-prob-diff"
                          className="block text-xs font-semibold text-[#1C1917] dark:text-slate-200"
                        >
                          Difficulty
                        </label>
                        <select
                          id="admin-prob-diff"
                          value={probDifficulty}
                          onChange={(e) =>
                            setProbDifficulty(e.target.value as 'Easy' | 'Medium' | 'Hard')
                          }
                          className="mt-1 w-full rounded-lg border border-[#E2D9C5] bg-white px-3 py-2 text-sm dark:border-white/[0.12] dark:bg-[#07090D] dark:text-white"
                        >
                          <option value="Easy">Easy</option>
                          <option value="Medium">Medium</option>
                          <option value="Hard">Hard</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                      <div className="sm:col-span-2">
                        <label
                          htmlFor="admin-prob-bangla"
                          className="block text-xs font-semibold text-[#1C1917] dark:text-slate-200"
                        >
                          Bangla Title (বাংলা)
                        </label>
                        <input
                          id="admin-prob-bangla"
                          type="text"
                          value={probBanglaTitle}
                          onChange={(e) => setProbBanglaTitle(e.target.value)}
                          className="bangla-text mt-1 w-full rounded-lg border border-[#E2D9C5] bg-white px-3 py-2 text-sm dark:border-white/[0.12] dark:bg-[#07090D] dark:text-white"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="admin-prob-xp"
                          className="block text-xs font-semibold text-[#1C1917] dark:text-slate-200"
                        >
                          XP Reward
                        </label>
                        <input
                          id="admin-prob-xp"
                          type="number"
                          min={20}
                          max={2000}
                          value={probXp}
                          onChange={(e) => setProbXp(Number(e.target.value))}
                          className="mt-1 w-full rounded-lg border border-[#E2D9C5] bg-white px-3 py-2 font-mono text-sm dark:border-white/[0.12] dark:bg-[#07090D] dark:text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="admin-prob-stmt"
                        className="block text-xs font-semibold text-[#1C1917] dark:text-slate-200"
                      >
                        Problem Statement
                      </label>
                      <textarea
                        id="admin-prob-stmt"
                        rows={4}
                        value={probStatement}
                        onChange={(e) => setProbStatement(e.target.value)}
                        className="mt-1 w-full rounded-lg border border-[#E2D9C5] bg-white p-3 text-xs leading-relaxed dark:border-white/[0.12] dark:bg-[#07090D] dark:text-white"
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="admin-prob-in"
                          className="block text-xs font-semibold text-[#1C1917] dark:text-slate-200"
                        >
                          Input Format
                        </label>
                        <textarea
                          id="admin-prob-in"
                          rows={2}
                          value={probInputFmt}
                          onChange={(e) => setProbInputFmt(e.target.value)}
                          className="mt-1 w-full rounded-lg border border-[#E2D9C5] bg-white p-2.5 text-xs dark:border-white/[0.12] dark:bg-[#07090D] dark:text-white"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="admin-prob-out"
                          className="block text-xs font-semibold text-[#1C1917] dark:text-slate-200"
                        >
                          Output Format
                        </label>
                        <textarea
                          id="admin-prob-out"
                          rows={2}
                          value={probOutputFmt}
                          onChange={(e) => setProbOutputFmt(e.target.value)}
                          className="mt-1 w-full rounded-lg border border-[#E2D9C5] bg-white p-2.5 text-xs dark:border-white/[0.12] dark:bg-[#07090D] dark:text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="admin-prob-opt"
                        className="block text-xs font-semibold text-[#1C1917] dark:text-slate-200"
                      >
                        Optimal Editorial Explanation
                      </label>
                      <textarea
                        id="admin-prob-opt"
                        rows={3}
                        value={probOptimal}
                        onChange={(e) => setProbOptimal(e.target.value)}
                        className="mt-1 w-full rounded-lg border border-[#E2D9C5] bg-white p-3 text-xs dark:border-white/[0.12] dark:bg-[#07090D] dark:text-white"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="admin-prob-bangla-ed"
                        className="block text-xs font-semibold text-[#1C1917] dark:text-slate-200"
                      >
                        সহজ বাংলা Editorial
                      </label>
                      <textarea
                        id="admin-prob-bangla-ed"
                        rows={4}
                        value={probBanglaEd}
                        onChange={(e) => setProbBanglaEd(e.target.value)}
                        className="bangla-text mt-1 w-full rounded-lg border border-[#E2D9C5] bg-white p-3 text-xs leading-relaxed dark:border-white/[0.12] dark:bg-[#07090D] dark:text-white"
                      />
                    </div>
                  </>
                )}

                {activeTab === 'create-problem' && (
                  <>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                      <div>
                        <label
                          htmlFor="admin-new-cat"
                          className="block text-xs font-semibold text-[#1C1917] dark:text-slate-200"
                        >
                          Arena Department
                        </label>
                        <select
                          id="admin-new-cat"
                          value={newCategory}
                          onChange={(e) => setNewCategory(e.target.value as 'cp' | 'interview')}
                          className="mt-1 w-full rounded-lg border border-[#E2D9C5] bg-white px-3 py-2 text-sm dark:border-white/[0.12] dark:bg-[#07090D] dark:text-white"
                        >
                          <option value="cp">CP Arena</option>
                          <option value="interview">Job Interviews</option>
                        </select>
                      </div>
                      <div>
                        <label
                          htmlFor="admin-new-plat"
                          className="block text-xs font-semibold text-[#1C1917] dark:text-slate-200"
                        >
                          Platform Tag
                        </label>
                        <select
                          id="admin-new-plat"
                          value={newPlatform}
                          onChange={(e) =>
                            setNewPlatform(e.target.value as typeof newPlatform)
                          }
                          className="mt-1 w-full rounded-lg border border-[#E2D9C5] bg-white px-3 py-2 text-sm dark:border-white/[0.12] dark:bg-[#07090D] dark:text-white"
                        >
                          <option value="Codeforces">Codeforces</option>
                          <option value="CodeChef">CodeChef</option>
                          <option value="LeetCode">LeetCode</option>
                          <option value="AtCoder">AtCoder</option>
                          <option value="FAANG">FAANG</option>
                        </select>
                      </div>
                      <div>
                        <label
                          htmlFor="admin-new-diff"
                          className="block text-xs font-semibold text-[#1C1917] dark:text-slate-200"
                        >
                          Difficulty
                        </label>
                        <select
                          id="admin-new-diff"
                          value={newDifficulty}
                          onChange={(e) =>
                            setNewDifficulty(e.target.value as 'Easy' | 'Medium' | 'Hard')
                          }
                          className="mt-1 w-full rounded-lg border border-[#E2D9C5] bg-white px-3 py-2 text-sm dark:border-white/[0.12] dark:bg-[#07090D] dark:text-white"
                        >
                          <option value="Easy">Easy</option>
                          <option value="Medium">Medium</option>
                          <option value="Hard">Hard</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="admin-new-title"
                          className="block text-xs font-semibold text-[#1C1917] dark:text-slate-200"
                        >
                          Problem Title
                        </label>
                        <input
                          id="admin-new-title"
                          type="text"
                          required
                          value={newTitle}
                          onChange={(e) => setNewTitle(e.target.value)}
                          placeholder="e.g. Distinct Prefix Sums"
                          className="mt-1 w-full rounded-lg border border-[#E2D9C5] bg-white px-3 py-2 text-sm dark:border-white/[0.12] dark:bg-[#07090D] dark:text-white"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="admin-new-id"
                          className="block text-xs font-semibold text-[#1C1917] dark:text-slate-200"
                        >
                          Custom ID (optional)
                        </label>
                        <input
                          id="admin-new-id"
                          type="text"
                          value={newId}
                          onChange={(e) => setNewId(e.target.value)}
                          placeholder="Auto-generated slug"
                          className="mt-1 w-full rounded-lg border border-[#E2D9C5] bg-white px-3 py-2 font-mono text-xs dark:border-white/[0.12] dark:bg-[#07090D] dark:text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="admin-new-bangla"
                        className="block text-xs font-semibold text-[#1C1917] dark:text-slate-200"
                      >
                        Bangla Title (বাংলা)
                      </label>
                      <input
                        id="admin-new-bangla"
                        type="text"
                        value={newBanglaTitle}
                        onChange={(e) => setNewBanglaTitle(e.target.value)}
                        className="bangla-text mt-1 w-full rounded-lg border border-[#E2D9C5] bg-white px-3 py-2 text-sm dark:border-white/[0.12] dark:bg-[#07090D] dark:text-white"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="admin-new-stmt"
                        className="block text-xs font-semibold text-[#1C1917] dark:text-slate-200"
                      >
                        Problem Statement
                      </label>
                      <textarea
                        id="admin-new-stmt"
                        rows={4}
                        required
                        value={newStatement}
                        onChange={(e) => setNewStatement(e.target.value)}
                        placeholder="Describe input constraints and exact output rules..."
                        className="mt-1 w-full rounded-lg border border-[#E2D9C5] bg-white p-3 text-xs dark:border-white/[0.12] dark:bg-[#07090D] dark:text-white"
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="admin-new-sin"
                          className="block text-xs font-semibold text-[#1C1917] dark:text-slate-200"
                        >
                          Sample Input
                        </label>
                        <textarea
                          id="admin-new-sin"
                          rows={2}
                          value={newSampleIn}
                          onChange={(e) => setNewSampleIn(e.target.value)}
                          className="mt-1 w-full rounded-lg border border-[#E2D9C5] bg-white p-2.5 font-mono text-xs dark:border-white/[0.12] dark:bg-[#07090D] dark:text-white"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="admin-new-sout"
                          className="block text-xs font-semibold text-[#1C1917] dark:text-slate-200"
                        >
                          Expected Sample Output
                        </label>
                        <textarea
                          id="admin-new-sout"
                          rows={2}
                          value={newSampleOut}
                          onChange={(e) => setNewSampleOut(e.target.value)}
                          className="mt-1 w-full rounded-lg border border-[#E2D9C5] bg-white p-2.5 font-mono text-xs dark:border-white/[0.12] dark:bg-[#07090D] dark:text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="admin-new-pystarter"
                        className="block text-xs font-semibold text-[#1C1917] dark:text-slate-200"
                      >
                        Python Starter Template
                      </label>
                      <textarea
                        id="admin-new-pystarter"
                        rows={3}
                        spellCheck={false}
                        value={newPythonStarter}
                        onChange={(e) => setNewPythonStarter(e.target.value)}
                        className="mt-1 w-full rounded-lg border border-[#E2D9C5] bg-[#07090D] p-3 font-mono text-xs text-emerald-300 dark:border-white/[0.12]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="admin-new-bangla-ed"
                        className="block text-xs font-semibold text-[#1C1917] dark:text-slate-200"
                      >
                        সহজ বাংলা Editorial Note
                      </label>
                      <textarea
                        id="admin-new-bangla-ed"
                        rows={2}
                        value={newBanglaEd}
                        onChange={(e) => setNewBanglaEd(e.target.value)}
                        className="bangla-text mt-1 w-full rounded-lg border border-[#E2D9C5] bg-white p-3 text-xs dark:border-white/[0.12] dark:bg-[#07090D] dark:text-white"
                      />
                    </div>
                  </>
                )}
              </div>

              {/* Sticky Footer Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#E2D9C5] bg-[#EFE8D6]/70 px-6 py-4 dark:border-white/[0.08] dark:bg-[#07090D]">
                {activeTab === 'edit-current' && hasExistingOverride ? (
                  <button
                    type="button"
                    disabled={reverting}
                    onClick={handleRevert}
                    className={`flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-semibold transition-colors whitespace-nowrap ${
                      confirmRevert
                        ? 'border-rose-500 bg-rose-600 text-white hover:bg-rose-500'
                        : 'border-rose-500/40 bg-rose-50 text-rose-700 hover:bg-rose-100 dark:bg-rose-950/40 dark:text-rose-300'
                    }`}
                  >
                    {reverting ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
                    ) : (
                      <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                    )}
                    <span>
                      {confirmRevert ? 'Confirm Revert to Built-in' : 'Revert to Built-in'}
                    </span>
                  </button>
                ) : (
                  <span className="text-xs text-[#57534E] dark:text-slate-400">
                    Live changes sync instantly for all learners.
                  </span>
                )}

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-lg border border-[#E2D9C5] bg-[#FCF9F2] px-3.5 py-2 text-xs font-semibold text-[#1C1917] hover:bg-[#EFE8D6] dark:border-white/[0.1] dark:bg-[#0E131D] dark:text-slate-200"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={saving}
                    className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-500 disabled:opacity-50 dark:bg-[#C8EE72] dark:text-[#07090D] dark:hover:bg-[#d6f58c] whitespace-nowrap"
                  >
                    {saving ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
                    ) : (
                      <Save className="h-3.5 w-3.5" aria-hidden="true" />
                    )}
                    <span>
                      {saving
                        ? 'Saving to Supabase...'
                        : activeTab === 'create-problem'
                          ? 'Publish Problem'
                          : 'Save Live Override'}
                    </span>
                  </button>
                </div>
              </div>
            </form>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
