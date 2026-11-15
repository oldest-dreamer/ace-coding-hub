/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import confetti from 'canvas-confetti';
import { AnimatePresence, motion } from 'motion/react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AcademyLobby } from './components/AcademyLobby';
import { AdminEditorDrawer, type AdminEditorTarget } from './components/AdminEditorDrawer';
import { AnimatedBackdrop } from './components/AnimatedBackdrop';
import type { ArgonBotMood } from './components/ArgonBotMascot';
import { AuthPage } from './components/AuthPage';
import { BootPreloader } from './components/BootPreloader';
import { ChapterStudio } from './components/ChapterStudio';
import { CheatSheetModal } from './components/CheatSheetModal';
import { CommandPaletteModal } from './components/CommandPaletteModal';
import { ContestProjectArena } from './components/ContestProjectArena';
import { CpArenaView } from './components/CpArenaView';
import { InterviewSheetView } from './components/InterviewSheetView';
import { ProfileSyncModal } from './components/ProfileSyncModal';
import { TopNavbar } from './components/TopNavbar';
import type { IdeSnippetPayload } from './components/TriModeStudyPanel';
import {
  VictoryCelebrationModal,
  type CelebrationEvent,
} from './components/VictoryCelebrationModal';
import { WebsiteArchitectureView } from './components/WebsiteArchitectureView';
import { XpComboToast, type XpComboEvent } from './components/XpComboToast';
import { ALL_CONTEST_PROJECT_PROBLEMS } from './data/contestProjectArena';
import { CP_500_PROBLEMS } from './data/cp500';
import { INTERVIEW_200_PROBLEMS } from './data/interview200';
import { LANGUAGE_MAP } from './data/languages';
import { PROBLEMS } from './data/problems';
import { getChapterById, getChaptersByLanguage } from './data/syllabusBlueprint';
import { useCloudProgress } from './hooks/useCloudProgress';
import type { Chapter, LanguageId, MainView, Problem, UserProfile } from './types/academy';
import {
  applyChapterOverrides,
  applySingleChapterOverride,
  extractCustomProblemsFromOverrides,
} from './utils/cloudMerge';
import {
  applyChapterCompletion,
  applyPracticeXpBonus,
  applyProblemSolved,
  computeLevelProgress,
} from './utils/gamification';
import {
  clearCustomCurriculum,
  createDefaultProfile,
  getTodayIsoDate,
  loadCustomCurriculum,
  loadProfileFromStorage,
  saveCustomCurriculum,
  saveProfileToLocalAndIdb,
} from './utils/storage';

const DEPARTMENT_TRANSITION = {
  initial: { opacity: 0, y: 24, scale: 0.98, filter: 'blur(6px)' },
  animate: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' },
  exit: { opacity: 0, y: -20, scale: 0.98, filter: 'blur(6px)' },
  transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] as const },
};

const COMBO_WINDOW_MS = 15_000;
const RUN_BONUS_COOLDOWN_MS = 6_000;
const GUEST_DISMISS_SESSION_KEY = 'argoncode_guest_gate_dismissed_v1';

export default function App() {
  const [profile, setProfile] = useState<UserProfile>(() => createDefaultProfile());
  const [hydrated, setHydrated] = useState(false);
  const [customCurriculum, setCustomCurriculum] = useState<{
    chapters: Chapter[];
    problems: Problem[];
  }>({ chapters: [], problems: [] });
  const [activeView, setActiveView] = useState<MainView>('lobby');
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageId>('python');
  const [selectedChapterId, setSelectedChapterId] = useState<string>('python-ch-1');
  const [ideOverride, setIdeOverride] = useState<IdeSnippetPayload | null>(null);
  const [autoRunNonce, setAutoRunNonce] = useState<number>(0);
  const [contestTargetProblemId, setContestTargetProblemId] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCheatSheetOpen, setIsCheatSheetOpen] = useState(false);
  const [guestGateDismissed, setGuestGateDismissed] = useState<boolean>(() => {
    if (typeof sessionStorage === 'undefined') return false;
    return sessionStorage.getItem(GUEST_DISMISS_SESSION_KEY) === '1';
  });
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [adminTarget, setAdminTarget] = useState<AdminEditorTarget | null>(null);
  const [xpBanner, setXpBanner] = useState<string | null>(null);
  const [xpComboToast, setXpComboToast] = useState<XpComboEvent | null>(null);
  const [mascotMood, setMascotMood] = useState<ArgonBotMood>('idle');
  const [celebrationEvent, setCelebrationEvent] = useState<CelebrationEvent | null>(null);

  const moodTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const comboToastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const comboTrackerRef = useRef<{ count: number; lastAt: number }>({ count: 0, lastAt: 0 });
  const runCooldownMapRef = useRef<Record<string, number>>({});

  const cloud = useCloudProgress({
    profile,
    hydrated,
    onApplyMergedProfile: (merged) => {
      setProfile(merged);
      setSelectedLanguage(merged.preferredLanguage);
    },
  });

  useEffect(() => {
    if (cloud.isAuthenticated) {
      setAuthModalOpen(false);
    }
  }, [cloud.isAuthenticated]);

  const triggerMascotMood = useCallback((mood: ArgonBotMood) => {
    setMascotMood(mood);
    if (moodTimeoutRef.current) clearTimeout(moodTimeoutRef.current);
    if (mood !== 'idle') {
      moodTimeoutRef.current = setTimeout(() => {
        setMascotMood('idle');
      }, 4200);
    }
  }, []);

  const triggerXpComboToast = useCallback((xpGained: number, label: string) => {
    const now = Date.now();
    const withinWindow = now - comboTrackerRef.current.lastAt <= COMBO_WINDOW_MS;
    const nextCombo = withinWindow ? Math.min(9, comboTrackerRef.current.count + 1) : 1;
    comboTrackerRef.current = { count: nextCombo, lastAt: now };

    const eventId = now + Math.floor(Math.random() * 1000);
    setXpComboToast({
      id: eventId,
      xpGained,
      label,
      comboCount: nextCombo,
    });

    if (comboToastTimeoutRef.current) clearTimeout(comboToastTimeoutRef.current);
    comboToastTimeoutRef.current = setTimeout(() => {
      setXpComboToast((current) => (current?.id === eventId ? null : current));
    }, 3200);
  }, []);

  useEffect(() => {
    let active = true;
    Promise.all([loadProfileFromStorage(), loadCustomCurriculum()]).then(([loaded, custom]) => {
      if (!active) return;
      setProfile(loaded);
      setCustomCurriculum(custom);
      setSelectedLanguage(loaded.preferredLanguage);
      setSelectedChapterId(`${loaded.preferredLanguage}-ch-1`);
      setHydrated(true);
    });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (profile.theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    if (hydrated) {
      saveProfileToLocalAndIdb(profile);
    }
  }, [profile, hydrated]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setIsProfileOpen(false);
        setIsCheatSheetOpen(false);
        setAdminTarget(null);
        setAuthModalOpen(false);
        setCelebrationEvent(null);
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  function showXpFeedback(message: string) {
    setXpBanner(message);
    setTimeout(() => {
      setXpBanner((current) => (current === message ? null : current));
    }, 3500);
  }

  const handleCodeRunSuccess = useCallback(
    (contextKey: string) => {
      const now = Date.now();
      const lastRunAt = runCooldownMapRef.current[contextKey] ?? 0;
      if (now - lastRunAt < RUN_BONUS_COOLDOWN_MS) return;
      runCooldownMapRef.current[contextKey] = now;

      const bonusXp = 5;
      setProfile((prev) => applyPracticeXpBonus(prev, bonusXp, getTodayIsoDate()).nextProfile);
      triggerXpComboToast(bonusXp, 'Code Executed Cleanly');
    },
    [triggerXpComboToast],
  );

  const handleDrillPass = useCallback(
    (contextKey: string) => {
      const now = Date.now();
      const lastDrillAt = runCooldownMapRef.current[`drill-${contextKey}`] ?? 0;
      if (now - lastDrillAt < RUN_BONUS_COOLDOWN_MS) return;
      runCooldownMapRef.current[`drill-${contextKey}`] = now;

      const bonusXp = 15;
      setProfile((prev) => applyPracticeXpBonus(prev, bonusXp, getTodayIsoDate()).nextProfile);
      triggerXpComboToast(bonusXp, 'Judge Tests Passed (AC)');
    },
    [triggerXpComboToast],
  );

  function handleSelectLanguage(languageId: LanguageId) {
    setSelectedLanguage(languageId);
    setSelectedChapterId(`${languageId}-ch-1`);
    setIdeOverride(null);
    setProfile((prev) => ({ ...prev, preferredLanguage: languageId }));
  }

  function handleOpenChapterInStudio(chapterId: string) {
    setSelectedChapterId(chapterId);
    setIdeOverride(null);
    setActiveView('studio');
  }

  function handleSelectChapterFromSearch(chapterId: string, languageId: LanguageId) {
    setSelectedLanguage(languageId);
    setSelectedChapterId(chapterId);
    setIdeOverride(null);
    setActiveView('studio');
  }

  function handleSelectProblemFromSearch(problemId: string) {
    setContestTargetProblemId(problemId);
    if (ALL_CONTEST_PROJECT_PROBLEMS.some((p) => p.id === problemId)) {
      setActiveView('contest-projects');
      return;
    }
    if (INTERVIEW_200_PROBLEMS.some((p) => p.id === problemId)) {
      setActiveView('interview');
      return;
    }
    if (CP_500_PROBLEMS.some((p) => p.id === problemId)) {
      setActiveView('cp-arena');
      return;
    }
    const hit =
      customCurriculum.problems.find((p) => p.id === problemId) ||
      PROBLEMS.find((p) => p.id === problemId);
    setActiveView(hit?.category === 'interview' ? 'interview' : 'cp-arena');
  }

  function handleLoadIntoIde(payload: IdeSnippetPayload) {
    setIdeOverride(payload);
    if (payload.autoRun) {
      setAutoRunNonce((n) => n + 1);
    }
  }

  function fireSmallConfetti() {
    if (typeof window === 'undefined') return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    try {
      confetti({
        particleCount: 36,
        spread: 55,
        origin: { y: 0.65 },
        colors: ['#10B981', '#06B6D4', '#8B5CF6'],
        disableForReducedMotion: true,
      });
    } catch {
      // Ignore canvas error
    }
  }

  function handleCompleteChapter(chapter: Chapter) {
    const prevLevel = computeLevelProgress(profile.xp).level;
    const { nextProfile, xpGained } = applyChapterCompletion(
      profile,
      chapter.id,
      chapter.xpReward,
      getTodayIsoDate(),
    );
    const nextLevel = computeLevelProgress(nextProfile.xp).level;
    setProfile(nextProfile);
    triggerMascotMood('happy');

    if (xpGained > 0) {
      triggerXpComboToast(xpGained, `Completed Ch ${chapter.number}`);
      showXpFeedback(`+${xpGained} XP earned for completing ${chapter.title}`);
      setCelebrationEvent({
        id: Date.now(),
        title: chapter.title,
        subtitle: `${LANGUAGE_MAP[chapter.languageId].name} · ${chapter.banglaTitle}`,
        xpGained,
        totalXp: nextProfile.xp,
        leveledUp: nextLevel > prevLevel,
        kind: 'chapter',
      });
    } else {
      fireSmallConfetti();
      showXpFeedback(`${chapter.title} verified cleanly.`);
    }
  }

  function handleProblemSolved(problem: Problem) {
    const prevLevel = computeLevelProgress(profile.xp).level;
    const { nextProfile, xpGained } = applyProblemSolved(
      profile,
      problem.id,
      problem.xpReward,
      getTodayIsoDate(),
    );
    const nextLevel = computeLevelProgress(nextProfile.xp).level;
    setProfile(nextProfile);
    triggerMascotMood('happy');

    if (xpGained > 0) {
      triggerXpComboToast(xpGained, `Solved ${problem.title}`);
      showXpFeedback(`+${xpGained} XP earned — Accepted on ${problem.title}`);
      setCelebrationEvent({
        id: Date.now(),
        title: problem.title,
        subtitle: `${problem.sourceTag} · ${problem.banglaTitle}`,
        xpGained,
        totalXp: nextProfile.xp,
        leveledUp: nextLevel > prevLevel,
        kind: 'problem',
      });
    } else {
      fireSmallConfetti();
      showXpFeedback(`Accepted (AC) on ${problem.title}`);
    }
  }

  function handleToggleBookmark(chapter: Chapter) {
    setProfile((prev) => {
      const exists = prev.bookmarks.some((b) => b.targetId === chapter.id);
      const nextBookmarks = exists
        ? prev.bookmarks.filter((b) => b.targetId !== chapter.id)
        : [
            {
              id: `bm-${chapter.id}`,
              targetType: 'chapter' as const,
              targetId: chapter.id,
              title: `${LANGUAGE_MAP[chapter.languageId].name} Ch ${chapter.number}: ${chapter.title}`,
              languageId: chapter.languageId,
              note: chapter.visualMode.tldr,
              createdAt: new Date().toISOString(),
            },
            ...prev.bookmarks,
          ];
      return { ...prev, bookmarks: nextBookmarks };
    });
  }

  function handleImportCurriculum(payload: { chapters: Chapter[]; problems: Problem[] }) {
    setCustomCurriculum((prev) => {
      const chMap = new Map<string, Chapter>();
      for (const ch of prev.chapters) chMap.set(ch.id, ch);
      for (const ch of payload.chapters) chMap.set(ch.id, ch);

      const probMap = new Map<string, Problem>();
      for (const p of prev.problems) probMap.set(p.id, p);
      for (const p of payload.problems) probMap.set(p.id, p);

      const next = {
        chapters: Array.from(chMap.values()),
        problems: Array.from(probMap.values()),
      };
      saveCustomCurriculum(next);
      return next;
    });
    showXpFeedback(
      `Imported ${payload.chapters.length} chapter(s) & ${payload.problems.length} problem(s) into Academy!`,
    );
  }

  function handleClearCurriculum() {
    setCustomCurriculum({ chapters: [], problems: [] });
    clearCustomCurriculum();
    showXpFeedback('Custom curriculum cleared. Restored default 200-chapter syllabus.');
  }

  const mergedCustomProblems = useMemo(() => {
    const cloudCustom = extractCustomProblemsFromOverrides(cloud.contentOverrides);
    const map = new Map<string, Problem>();
    for (const p of customCurriculum.problems) map.set(p.id, p);
    for (const p of cloudCustom) map.set(p.id, p);
    return Array.from(map.values());
  }, [customCurriculum.problems, cloud.contentOverrides]);

  const rawLanguageChapters = getChaptersByLanguage(selectedLanguage, customCurriculum.chapters);
  const languageChapters = useMemo(
    () => applyChapterOverrides(rawLanguageChapters, cloud.contentOverrides),
    [rawLanguageChapters, cloud.contentOverrides],
  );
  const rawActiveChapter =
    getChapterById(selectedChapterId, customCurriculum.chapters) || languageChapters[0];
  const activeChapter = applySingleChapterOverride(
    rawActiveChapter,
    cloud.contentOverrides[rawActiveChapter.id],
  );
  const isChapterDone = profile.completedChapters.includes(activeChapter.id);
  const isChapterBookmarked = profile.bookmarks.some((b) => b.targetId === activeChapter.id);

  const showAuthGate =
    authModalOpen || (cloud.authChecked && !cloud.isAuthenticated && !guestGateDismissed);

  function handleDismissGuestGate() {
    setGuestGateDismissed(true);
    setAuthModalOpen(false);
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem(GUEST_DISMISS_SESSION_KEY, '1');
    }
  }

  return (
    <div className="relative min-h-screen bg-[#F6F1E3] text-[#1C1917] dark:bg-[#07090D] dark:text-slate-100 overflow-x-clip">
      <BootPreloader />

      {/* Live Animated Background Engine (z-0, pointer-events-none) */}
      <AnimatedBackdrop />

      <TopNavbar
        activeView={activeView}
        onSelectView={setActiveView}
        profile={profile}
        isAuthenticated={cloud.isAuthenticated}
        syncStatus={cloud.syncStatus}
        mascotMood={mascotMood}
        onOpenSearch={() => setIsSearchOpen(true)}
        onToggleTheme={() =>
          setProfile((prev) => ({
            ...prev,
            theme: prev.theme === 'dark' ? 'light' : 'dark',
          }))
        }
        onOpenProfileModal={() => setIsProfileOpen(true)}
        onOpenAuthGate={() => setAuthModalOpen(true)}
      />

      {/* Floating +XP Combo Toast */}
      <XpComboToast event={xpComboToast} />

      {xpBanner && (
        <div
          role="status"
          aria-live="polite"
          className="no-print relative z-20 border-b border-emerald-500/30 bg-emerald-50/90 px-4 py-2 text-center text-xs font-semibold text-emerald-800 backdrop-blur-md dark:bg-emerald-950/60 dark:text-emerald-300"
        >
          {xpBanner}
        </div>
      )}

      {/* 6 Distinct Full-Screen Departments with Curtain / Scale-Blur Transitions */}
      <main className="relative z-10">
        <AnimatePresence mode="wait">
          {activeView === 'lobby' && (
            <motion.div key="dept-lobby" {...DEPARTMENT_TRANSITION}>
              <AcademyLobby
                selectedLanguage={selectedLanguage}
                selectedChapterId={activeChapter.id}
                chapters={languageChapters}
                completedChapters={profile.completedChapters}
                onSelectLanguage={handleSelectLanguage}
                onOpenChapterInStudio={handleOpenChapterInStudio}
              />
            </motion.div>
          )}

          {activeView === 'studio' && (
            <motion.div key="dept-studio" {...DEPARTMENT_TRANSITION}>
              <ChapterStudio
                selectedLanguage={selectedLanguage}
                chapters={languageChapters}
                activeChapter={activeChapter}
                isChapterDone={isChapterDone}
                isChapterBookmarked={isChapterBookmarked}
                ideOverride={ideOverride}
                autoRunNonce={autoRunNonce}
                mascotMood={mascotMood}
                onBackToLobby={() => setActiveView('lobby')}
                onSelectChapter={(chId) => {
                  setSelectedChapterId(chId);
                  setIdeOverride(null);
                }}
                onCompleteChapter={handleCompleteChapter}
                onToggleBookmark={handleToggleBookmark}
                onOpenCheatSheet={() => setIsCheatSheetOpen(true)}
                onLoadIntoIde={handleLoadIntoIde}
                onResetIdeOverride={() => setIdeOverride(null)}
                onMoodChange={triggerMascotMood}
                onCodeRunSuccess={handleCodeRunSuccess}
                onDrillPass={handleDrillPass}
                isAdmin={cloud.isAdmin}
                hasOverride={Boolean(cloud.contentOverrides[activeChapter.id])}
                onOpenAdminEdit={(ch) => setAdminTarget({ kind: 'chapter', chapter: ch })}
                savedCode={cloud.getSavedCode(activeChapter.id, activeChapter.languageId)}
                onSaveCode={cloud.saveItemCode}
              />
            </motion.div>
          )}

          {activeView === 'cp-arena' && (
            <motion.div key="dept-cp-arena" {...DEPARTMENT_TRANSITION}>
              <CpArenaView
                solvedProblems={profile.solvedProblems}
                contestRating={profile.contestRating}
                onProblemSolved={handleProblemSolved}
                onCodeRunSuccess={handleCodeRunSuccess}
                onDrillPass={handleDrillPass}
                onFinishVirtualContest={(newRating) => {
                  setProfile((prev) => ({ ...prev, contestRating: newRating }));
                  showXpFeedback(`Virtual Contest finished! Rating updated to ${newRating}.`);
                }}
                onMoodChange={triggerMascotMood}
                mascotMood={mascotMood}
                initialProblemId={contestTargetProblemId}
                customProblems={mergedCustomProblems}
                contentOverrides={cloud.contentOverrides}
                isAdmin={cloud.isAdmin}
                onOpenAdminEdit={(prob) => setAdminTarget({ kind: 'problem', problem: prob })}
                getSavedCode={cloud.getSavedCode}
                onSaveCode={cloud.saveItemCode}
              />
            </motion.div>
          )}

          {activeView === 'interview' && (
            <motion.div key="dept-interview" {...DEPARTMENT_TRANSITION}>
              <InterviewSheetView
                solvedProblems={profile.solvedProblems}
                onProblemSolved={handleProblemSolved}
                onCodeRunSuccess={handleCodeRunSuccess}
                onDrillPass={handleDrillPass}
                onMoodChange={onMoodChangeCompat(triggerMascotMood)}
                mascotMood={mascotMood}
                initialProblemId={contestTargetProblemId}
                customProblems={mergedCustomProblems}
                contentOverrides={cloud.contentOverrides}
                isAdmin={cloud.isAdmin}
                onOpenAdminEdit={(prob) => setAdminTarget({ kind: 'problem', problem: prob })}
                getSavedCode={cloud.getSavedCode}
                onSaveCode={cloud.saveItemCode}
              />
            </motion.div>
          )}

          {activeView === 'contest-projects' && (
            <motion.div key="dept-contest-projects" {...DEPARTMENT_TRANSITION}>
              <ContestProjectArena
                solvedProblems={profile.solvedProblems}
                contestRating={profile.contestRating}
                onProblemSolved={handleProblemSolved}
                onFinishContest={(newRating) => {
                  setProfile((prev) => ({ ...prev, contestRating: newRating }));
                  showXpFeedback(`Contest round finished! Rating updated to ${newRating}.`);
                }}
                onCodeRunSuccess={handleCodeRunSuccess}
                onDrillPass={handleDrillPass}
                onMoodChange={triggerMascotMood}
                mascotMood={mascotMood}
                initialProblemId={contestTargetProblemId}
                contentOverrides={cloud.contentOverrides}
                isAdmin={cloud.isAdmin}
                onOpenAdminEdit={(prob) => setAdminTarget({ kind: 'problem', problem: prob })}
                getSavedCode={cloud.getSavedCode}
                onSaveCode={cloud.saveItemCode}
              />
            </motion.div>
          )}

          {activeView === 'architecture' && (
            <motion.div key="dept-architecture" {...DEPARTMENT_TRANSITION}>
              <WebsiteArchitectureView
                onJumpToCapstone={(langId) => {
                  setSelectedLanguage(langId);
                  setSelectedChapterId(`${langId}-ch-25`);
                  setIdeOverride(null);
                  setActiveView('studio');
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="no-print relative z-10 border-t border-[#E2D9C5]/80 bg-[#F6F1E3]/80 px-4 py-4 text-center text-xs text-[#57534E] backdrop-blur-sm dark:border-white/[0.06] dark:bg-[#07090D]/80 dark:text-slate-400">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-2 px-2">
          <span className="font-semibold text-[#1C1917] dark:text-slate-200">
            Ace Coding Hub
          </span>
          <span>
            8 Languages · 200 Deep Chapters · 855 Multi-Test Judge Problems · Cloud Sync Ready
          </span>
        </div>
      </footer>

      <CommandPaletteModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectChapter={handleSelectChapterFromSearch}
        onSelectProblem={handleSelectProblemFromSearch}
        customChapters={customCurriculum.chapters}
        customProblems={mergedCustomProblems}
        contentOverrides={cloud.contentOverrides}
      />

      <ProfileSyncModal
        isOpen={isProfileOpen}
        profile={profile}
        isAuthenticated={cloud.isAuthenticated}
        isAdmin={cloud.isAdmin}
        syncStatus={cloud.syncStatus}
        lastSyncedAt={cloud.lastSyncedAt}
        customCurriculum={customCurriculum}
        onClose={() => setIsProfileOpen(false)}
        onUpdateUsername={(username) =>
          setProfile((prev) => ({
            ...prev,
            username,
            avatarSeed: username[0].toUpperCase(),
          }))
        }
        onImportProfile={(next) => {
          setProfile(next);
          setSelectedLanguage(next.preferredLanguage);
          setSelectedChapterId(`${next.preferredLanguage}-ch-1`);
          setIdeOverride(null);
        }}
        onImportCurriculum={handleImportCurriculum}
        onClearCurriculum={handleClearCurriculum}
        onNavigateBookmark={(targetType, targetId, languageId) => {
          if (targetType === 'chapter' && languageId) {
            handleSelectChapterFromSearch(targetId, languageId);
          } else {
            handleSelectProblemFromSearch(targetId);
          }
        }}
        onSyncNow={cloud.syncNow}
        onSignOut={async () => {
          await cloud.signOut();
          showXpFeedback('Signed out cleanly. Local guest mode remains ready.');
        }}
        onOpenAuthGate={() => setAuthModalOpen(true)}
      />

      <CheatSheetModal
        isOpen={isCheatSheetOpen}
        chapter={activeChapter}
        onClose={() => setIsCheatSheetOpen(false)}
      />

      <VictoryCelebrationModal
        event={celebrationEvent}
        onClose={() => setCelebrationEvent(null)}
      />

      <AdminEditorDrawer
        isOpen={Boolean(adminTarget && cloud.isAdmin)}
        target={adminTarget}
        overrides={cloud.contentOverrides}
        onClose={() => setAdminTarget(null)}
        onSaveOverride={cloud.saveContentOverride}
        onRevertOverride={cloud.revertContentOverride}
      />

      {showAuthGate && (
        <AuthPage
          onSignInWithEmail={cloud.signInWithEmail}
          onSignUpWithEmail={cloud.signUpWithEmail}
          onSignInWithGoogle={cloud.signInWithGoogle}
          onContinueAsGuest={handleDismissGuestGate}
          canCloseModal={guestGateDismissed || authModalOpen}
          onClose={handleDismissGuestGate}
        />
      )}
    </div>
  );
}

function onMoodChangeCompat(fn: (mood: ArgonBotMood) => void) {
  return fn;
}
