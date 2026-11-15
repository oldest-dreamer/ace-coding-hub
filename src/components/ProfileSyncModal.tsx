import {
  Bookmark,
  Cloud,
  Download,
  FileJson,
  Loader2,
  LogIn,
  LogOut,
  RefreshCw,
  ShieldCheck,
  Trash2,
  Upload,
  UserCheck,
  X,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import type { CloudSyncStatus } from '../hooks/useCloudProgress';
import type { Chapter, LanguageId, Problem, UserProfile } from '../types/academy';
import { computeLevelProgress } from '../utils/gamification';
import {
  SAMPLE_BULK_CURRICULUM_JSON,
  parseBulkCurriculumImport,
  parseProfileImport,
  serializeProfileExport,
} from '../utils/storage';

interface ProfileSyncModalProps {
  isOpen: boolean;
  profile: UserProfile;
  isAuthenticated: boolean;
  isAdmin: boolean;
  syncStatus: CloudSyncStatus;
  lastSyncedAt: string | null;
  customCurriculum: { chapters: Chapter[]; problems: Problem[] };
  onClose: () => void;
  onUpdateUsername: (name: string) => void;
  onImportProfile: (next: UserProfile) => void;
  onImportCurriculum: (payload: { chapters: Chapter[]; problems: Problem[] }) => void;
  onClearCurriculum: () => void;
  onNavigateBookmark: (targetType: 'chapter' | 'problem', targetId: string, languageId?: LanguageId) => void;
  onSyncNow: () => Promise<void>;
  onSignOut: () => Promise<void>;
  onOpenAuthGate: () => void;
}

type ModalTab = 'profile' | 'importer' | 'bookmarks';

export function ProfileSyncModal({
  isOpen,
  profile,
  isAuthenticated,
  isAdmin,
  syncStatus,
  lastSyncedAt,
  customCurriculum,
  onClose,
  onUpdateUsername,
  onImportProfile,
  onImportCurriculum,
  onClearCurriculum,
  onNavigateBookmark,
  onSyncNow,
  onSignOut,
  onOpenAuthGate,
}: ProfileSyncModalProps) {
  const [activeTab, setActiveTab] = useState<ModalTab>('profile');
  const [nameInput, setNameInput] = useState(profile.username);
  const [curriculumJson, setCurriculumJson] = useState('');
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const [statusKind, setStatusKind] = useState<'info' | 'error'>('info');
  const [syncingNow, setSyncingNow] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const curriculumFileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setNameInput(profile.username);
  }, [profile.username]);

  const lvl = computeLevelProgress(profile.xp);

  function showStatus(msg: string, kind: 'info' | 'error' = 'info') {
    setStatusMsg(msg);
    setStatusKind(kind);
  }

  function handleSaveName(e: React.FormEvent) {
    e.preventDefault();
    const cleaned = nameInput.trim();
    if (!cleaned) {
      showStatus('Username cannot be empty.', 'error');
      return;
    }
    onUpdateUsername(cleaned);
    showStatus(
      isAuthenticated
        ? 'Handle updated and queued for Supabase cloud sync.'
        : 'Local profile handle updated.',
    );
  }

  function handleExportJson() {
    const json = serializeProfileExport(profile);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `argoncode-profile-${profile.username.toLowerCase().replace(/\s+/g, '-')}.json`;
    link.click();
    URL.revokeObjectURL(url);
    showStatus('Exported JSON backup file.');
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    const parsed = parseProfileImport(text);
    if (!parsed.ok) {
      showStatus(parsed.error, 'error');
      return;
    }
    onImportProfile(parsed.profile);
    setNameInput(parsed.profile.username);
    showStatus(`Imported profile for ${parsed.profile.username} (${parsed.profile.xp} XP).`);
  }

  async function handleManualCloudSync() {
    setSyncingNow(true);
    await onSyncNow();
    setSyncingNow(false);
    showStatus('Cloud profile and progress snapshot pushed to Supabase.');
  }

  function handleApplyBulkCurriculum(rawText: string) {
    const res = parseBulkCurriculumImport(rawText);
    if (!res.ok) {
      showStatus(res.error, 'error');
      return;
    }
    onImportCurriculum(res.payload);
    showStatus(
      `Imported ${res.payload.chapters.length} chapter(s) and ${res.payload.problems.length} problem(s) into the live academy!`,
    );
  }

  async function handleCurriculumFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    setCurriculumJson(text);
    handleApplyBulkCurriculum(text);
  }

  async function handleDropJson(e: React.DragEvent<HTMLTextAreaElement>) {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    const text = await file.text();
    setCurriculumJson(text);
    handleApplyBulkCurriculum(text);
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="profile-sync-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.16 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="profile-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ type: 'spring', stiffness: 360, damping: 28 }}
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-[#E2D9C5] bg-[#FCF9F2] p-6 shadow-2xl dark:border-slate-800 dark:bg-[#0C1322]/95 dark:backdrop-blur-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#E2D9C5] pb-4 dark:border-slate-800">
              <div>
                <h2 id="profile-modal-title" className="font-display text-lg font-bold text-[#1C1917] dark:text-white">
                  Profile, Cloud Sync &amp; Bulk Content Importer
                </h2>
                <p className="text-xs text-[#57534E] dark:text-slate-400">
                  {isAuthenticated
                    ? `Supabase Cloud Sync Active (${profile.email || 'Verified'}) · ${lvl.rankTitle} · Level ${lvl.level}`
                    : `Guest Local Mode active · ${lvl.rankTitle} · Level ${lvl.level}`}
                </p>
              </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close profile dialog"
            className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        {/* Settings Modal Tabs */}
        <div
          role="tablist"
          aria-label="Profile and Settings Tabs"
          className="mt-4 grid grid-cols-3 gap-1 rounded-lg bg-slate-100 p-1 dark:bg-slate-900"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'profile'}
            onClick={() => setActiveTab('profile')}
            className={`rounded-md px-2.5 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap ${
              activeTab === 'profile'
                ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-800 dark:text-cyan-400'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            Profile &amp; Sync
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'importer'}
            onClick={() => setActiveTab('importer')}
            className={`rounded-md px-2.5 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap ${
              activeTab === 'importer'
                ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-800 dark:text-cyan-400'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            Import Curriculum JSON
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'bookmarks'}
            onClick={() => setActiveTab('bookmarks')}
            className={`rounded-md px-2.5 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap ${
              activeTab === 'bookmarks'
                ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-800 dark:text-cyan-400'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            Bookmarks ({profile.bookmarks.length})
          </button>
        </div>

        <div className="mt-5 space-y-6">
          {activeTab === 'profile' && (
            <>
              {/* Stats Summary */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900/50">
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">Total XP</div>
                  <div className="mt-1 font-mono text-lg font-bold tabular-nums text-cyan-700 dark:text-cyan-400">
                    {profile.xp}
                  </div>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900/50">
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">Chapters Done</div>
                  <div className="mt-1 font-mono text-lg font-bold tabular-nums text-slate-900 dark:text-white">
                    {profile.completedChapters.length}/{200 + customCurriculum.chapters.length}
                  </div>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900/50">
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">Problems Solved</div>
                  <div className="mt-1 font-mono text-lg font-bold tabular-nums text-emerald-700 dark:text-emerald-400">
                    {profile.solvedProblems.length}
                  </div>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900/50">
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">Contest Rating</div>
                  <div className="mt-1 font-mono text-lg font-bold tabular-nums text-amber-700 dark:text-amber-400">
                    {profile.contestRating}
                  </div>
                </div>
              </div>

              {/* Local Profile Name */}
              <form onSubmit={handleSaveName} className="space-y-2">
                <label htmlFor="profile-username" className="block text-xs font-bold text-slate-900 dark:text-white">
                  Learner Profile Handle (Instant Local Mode)
                </label>
                <div className="flex gap-2">
                  <input
                    id="profile-username"
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-cyan-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  />
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 dark:bg-cyan-500 dark:text-slate-950"
                  >
                    <UserCheck className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Save Handle</span>
                  </button>
                </div>
              </form>

              {/* 1-Click JSON Export / Import */}
              <div className="space-y-2 border-t border-slate-200 pt-4 dark:border-slate-800">
                <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                  Portable JSON Profile Backup (Zero External Keys Required)
                </h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={handleExportJson}
                    className="flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                  >
                    <Download className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Export Profile JSON</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                  >
                    <Upload className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Import Profile JSON</span>
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="application/json"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Supabase Cloud Account & Sync Controls */}
              <div className="space-y-3 border-t border-slate-200 pt-4 dark:border-slate-800">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white">
                    <Cloud className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                    <span>Supabase Cloud Account</span>
                  </h3>
                  {isAdmin && (
                    <span className="inline-flex items-center gap-1 font-mono text-[11px] font-bold text-emerald-700 dark:text-[#C8EE72]">
                      <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Admin CMS Unlocked</span>
                    </span>
                  )}
                </div>

                {isAuthenticated ? (
                  <div className="space-y-3 rounded-xl border border-emerald-500/30 bg-emerald-50/70 p-3.5 dark:border-emerald-500/25 dark:bg-emerald-950/20">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                      <div>
                        <div className="font-semibold text-slate-900 dark:text-white">
                          {profile.email || 'Authenticated Learner'}
                        </div>
                        <div className="mt-0.5 text-[11px] text-slate-600 dark:text-slate-400">
                          Goal: {profile.targetGoal || 'Competitive Programming'} · Status:{' '}
                          <span className="font-mono font-semibold text-emerald-700 dark:text-emerald-300">
                            {syncStatus}
                          </span>
                          {lastSyncedAt && (
                            <> · Updated {new Date(lastSyncedAt).toLocaleTimeString()}</>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        disabled={syncingNow}
                        onClick={handleManualCloudSync}
                        className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-emerald-500 disabled:opacity-50 dark:bg-emerald-500 dark:text-slate-950"
                      >
                        {syncingNow ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
                        ) : (
                          <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
                        )}
                        <span>Sync Now</span>
                      </button>

                      <button
                        type="button"
                        onClick={async () => {
                          await onSignOut();
                          onClose();
                        }}
                        className="flex items-center gap-1.5 rounded-lg border border-rose-500/40 bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700 hover:bg-rose-100 dark:bg-rose-950/35 dark:text-rose-300"
                      >
                        <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3.5 dark:border-slate-800 dark:bg-slate-900/60">
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      Browsing as Guest. Sign in to merge your XP, solved problems, and saved editor code across devices.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onOpenAuthGate();
                      }}
                      className="flex items-center gap-1.5 rounded-lg bg-[#1C1917] px-3.5 py-2 text-xs font-bold text-[#FCF9F2] hover:bg-emerald-700 dark:bg-[#C8EE72] dark:text-[#07090D] whitespace-nowrap shrink-0"
                    >
                      <LogIn className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Sign In / Join</span>
                    </button>
                  </div>
                )}
              </div>
            </>
          )}

          {activeTab === 'importer' && (
            <div className="space-y-4">
              <div className="rounded-xl border border-cyan-600/20 bg-cyan-50/70 p-3.5 dark:border-cyan-500/20 dark:bg-cyan-950/20">
                <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-900 dark:text-cyan-300">
                  <FileJson className="h-4 w-4" aria-hidden="true" />
                  <span>Bulk Content Importer (Chapters &amp; Contest Problems)</span>
                </div>
                <p className="mt-1 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                  Paste or drop a JSON payload containing <code className="font-mono">chapters</code> and/or{' '}
                  <code className="font-mono">problems</code> arrays to expand your live curriculum without writing code.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="font-mono text-slate-600 dark:text-slate-400">
                  Active Custom Content: {customCurriculum.chapters.length} chapters ·{' '}
                  {customCurriculum.problems.length} problems
                </span>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setCurriculumJson(SAMPLE_BULK_CURRICULUM_JSON)}
                    className="rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-800 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                  >
                    Load Sample Template
                  </button>
                  <button
                    type="button"
                    onClick={() => curriculumFileRef.current?.click()}
                    className="flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-800 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                  >
                    <Upload className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Upload .json</span>
                  </button>
                  <input
                    ref={curriculumFileRef}
                    type="file"
                    accept="application/json"
                    onChange={handleCurriculumFileUpload}
                    className="hidden"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="bulk-curriculum-json" className="sr-only">
                  Curriculum JSON Payload
                </label>
                <textarea
                  id="bulk-curriculum-json"
                  rows={10}
                  value={curriculumJson}
                  onChange={(e) => setCurriculumJson(e.target.value)}
                  onDrop={handleDropJson}
                  onDragOver={(e) => e.preventDefault()}
                  placeholder='Paste or drop JSON here, e.g. { "chapters": [...], "problems": [...] }'
                  className="w-full rounded-xl border border-slate-300 bg-slate-950 p-3 font-mono text-xs leading-relaxed text-emerald-300 placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none dark:border-slate-700"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => handleApplyBulkCurriculum(curriculumJson)}
                  className="rounded-lg bg-cyan-600 px-4 py-2 text-xs font-bold text-white hover:bg-cyan-700 dark:bg-cyan-500 dark:text-slate-950"
                >
                  Import &amp; Merge Into Academy
                </button>

                {(customCurriculum.chapters.length > 0 || customCurriculum.problems.length > 0) && (
                  <button
                    type="button"
                    onClick={() => {
                      onClearCurriculum();
                      showStatus('Cleared all custom imported chapters and problems.');
                    }}
                    className="flex items-center gap-1.5 rounded-lg border border-rose-500/40 bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700 hover:bg-rose-100 dark:bg-rose-950/30 dark:text-rose-300"
                  >
                    <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Clear Imported Content</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {activeTab === 'bookmarks' && (
            <div className="space-y-2">
              <h3 className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white">
                <Bookmark className="h-3.5 w-3.5 text-amber-500" aria-hidden="true" />
                <span>Bookmarked Study Notes ({profile.bookmarks.length})</span>
              </h3>
              {profile.bookmarks.length === 0 ? (
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  No bookmarks yet. Click Bookmark on any chapter to pin it here.
                </p>
              ) : (
                <div className="space-y-1.5">
                  {profile.bookmarks.map((bm) => (
                    <button
                      key={bm.id}
                      type="button"
                      onClick={() => {
                        onNavigateBookmark(bm.targetType, bm.targetId, bm.languageId);
                        onClose();
                      }}
                      className="flex w-full items-center justify-between rounded-lg border border-slate-200 px-3 py-2 text-left text-xs hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900"
                    >
                      <span className="font-semibold text-slate-900 dark:text-white">{bm.title}</span>
                      <span className="font-mono text-[11px] text-cyan-600 dark:text-cyan-400">Open</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {statusMsg && (
            <div
              role="status"
              className={`rounded-lg border px-3 py-2 text-xs font-medium ${
                statusKind === 'error'
                  ? 'border-rose-500/40 bg-rose-50 text-rose-800 dark:bg-rose-950/40 dark:text-rose-200'
                  : 'border-cyan-500/30 bg-cyan-50 text-cyan-900 dark:bg-cyan-950/30 dark:text-cyan-200'
              }`}
            >
              {statusMsg}
            </div>
          )}
        </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
