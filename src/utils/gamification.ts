import type { Chapter, LanguageId, Problem, UserProfile } from '../types/academy';

export interface LevelProgress {
  level: number;
  currentLevelXp: number;
  xpForNextLevel: number;
  progressPercent: number;
  rankTitle: string;
}

const RANK_TITLES: { minLevel: number; title: string }[] = [
  { minLevel: 1, title: 'Apprentice Coder' },
  { minLevel: 3, title: 'Syntax Explorer' },
  { minLevel: 6, title: 'Systems Builder' },
  { minLevel: 10, title: 'Algorithm Tactician' },
  { minLevel: 15, title: 'Grandmaster Architect' },
];

export function xpRequiredForLevel(level: number): number {
  if (level <= 1) return 0;
  return 100 * (level - 1) + 50 * (level - 1) * (level - 2);
}

export function computeLevelProgress(totalXp: number): LevelProgress {
  const safeXp = Math.max(0, Math.floor(totalXp));
  let level = 1;
  while (safeXp >= xpRequiredForLevel(level + 1)) {
    level += 1;
  }
  const baseXp = xpRequiredForLevel(level);
  const nextXp = xpRequiredForLevel(level + 1);
  const span = Math.max(1, nextXp - baseXp);
  const currentLevelXp = safeXp - baseXp;
  const progressPercent = Math.min(100, Math.round((currentLevelXp / span) * 100));

  let rankTitle = RANK_TITLES[0].title;
  for (const tier of RANK_TITLES) {
    if (level >= tier.minLevel) {
      rankTitle = tier.title;
    }
  }

  return {
    level,
    currentLevelXp,
    xpForNextLevel: span,
    progressPercent,
    rankTitle,
  };
}

export function computeLanguageMastery(
  languageId: LanguageId,
  completedChapters: string[],
  chaptersPerLanguage = 25,
): { completed: number; total: number; percent: number } {
  const prefix = `${languageId}-ch-`;
  const uniqueCompleted = new Set(
    completedChapters.filter((id) => id.startsWith(prefix)),
  );
  const completed = Math.min(chaptersPerLanguage, uniqueCompleted.size);
  const percent = Math.round((completed / chaptersPerLanguage) * 100);
  return { completed, total: chaptersPerLanguage, percent };
}

export function updateStreakForDate(
  prevLastDate: string,
  prevStreak: number,
  todayDate: string,
): { streakDays: number; lastActiveDate: string } {
  if (!prevLastDate) {
    return { streakDays: Math.max(1, prevStreak), lastActiveDate: todayDate };
  }
  if (prevLastDate === todayDate) {
    return { streakDays: Math.max(1, prevStreak), lastActiveDate: todayDate };
  }
  const prevMs = Date.parse(`${prevLastDate}T00:00:00Z`);
  const todayMs = Date.parse(`${todayDate}T00:00:00Z`);
  if (Number.isNaN(prevMs) || Number.isNaN(todayMs)) {
    return { streakDays: 1, lastActiveDate: todayDate };
  }
  const diffDays = Math.round((todayMs - prevMs) / 86_400_000);
  if (diffDays === 1) {
    return { streakDays: Math.max(1, prevStreak) + 1, lastActiveDate: todayDate };
  }
  if (diffDays > 1) {
    return { streakDays: 1, lastActiveDate: todayDate };
  }
  return { streakDays: Math.max(1, prevStreak), lastActiveDate: prevLastDate };
}

export function calculateContestRatingDelta(params: {
  currentRating: number;
  solvedCount: number;
  totalProblems: number;
  minutesRemaining: number;
  totalMinutes: number;
}): { newRating: number; delta: number; performanceRating: number } {
  const { currentRating, solvedCount, totalProblems, minutesRemaining, totalMinutes } = params;
  const solveRatio = totalProblems > 0 ? solvedCount / totalProblems : 0;
  const timeBonus = totalMinutes > 0 && solvedCount > 0
    ? Math.round((minutesRemaining / totalMinutes) * 180)
    : 0;
  const performanceRating = Math.round(900 + solveRatio * 1050 + timeBonus);
  const rawDelta = Math.round((performanceRating - currentRating) * 0.35);
  const delta = Math.max(-60, Math.min(180, rawDelta));
  const newRating = Math.max(800, currentRating + delta);
  return { newRating, delta, performanceRating };
}

export interface SearchHit {
  type: 'chapter' | 'problem';
  id: string;
  title: string;
  subtitle: string;
  languageId?: LanguageId;
  score: number;
}

export function searchAcademyCatalog(
  query: string,
  chapters: Chapter[],
  problems: Problem[],
  limit = 16,
): SearchHit[] {
  const q = query.trim().toLowerCase();
  if (!q) {
    return [
      ...chapters.slice(0, 6).map((ch) => ({
        type: 'chapter' as const,
        id: ch.id,
        title: `${ch.languageId.toUpperCase()} Ch ${ch.number}: ${ch.title}`,
        subtitle: ch.banglaTitle,
        languageId: ch.languageId,
        score: 1,
      })),
      ...problems.slice(0, 4).map((p) => ({
        type: 'problem' as const,
        id: p.id,
        title: p.title,
        subtitle: `${p.sourceTag} · ${p.difficulty}`,
        score: 1,
      })),
    ];
  }

  const hits: SearchHit[] = [];
  for (const ch of chapters) {
    const haystack = `${ch.languageId} ch ${ch.number} ${ch.title} ${ch.banglaTitle} ${ch.subtitle}`.toLowerCase();
    if (haystack.includes(q)) {
      const exactBonus = ch.title.toLowerCase().startsWith(q) ? 5 : 0;
      hits.push({
        type: 'chapter',
        id: ch.id,
        title: `${ch.languageId.toUpperCase()} Ch ${ch.number}: ${ch.title}`,
        subtitle: ch.subtitle,
        languageId: ch.languageId,
        score: 10 + exactBonus,
      });
    }
  }

  for (const p of problems) {
    const haystack = `${p.title} ${p.banglaTitle} ${p.sourceTag} ${p.difficulty} ${p.statement}`.toLowerCase();
    if (haystack.includes(q)) {
      const exactBonus = p.title.toLowerCase().includes(q) ? 5 : 0;
      hits.push({
        type: 'problem',
        id: p.id,
        title: p.title,
        subtitle: `${p.sourceTag} · ${p.difficulty}`,
        score: 11 + exactBonus,
      });
    }
  }

  return hits.sort((a, b) => b.score - a.score).slice(0, limit);
}

export function applyChapterCompletion(
  profile: UserProfile,
  chapterId: string,
  xpReward: number,
  todayDate: string,
): { nextProfile: UserProfile; xpGained: number } {
  const alreadyDone = profile.completedChapters.includes(chapterId);
  const streak = updateStreakForDate(profile.lastActiveDate, profile.streakDays, todayDate);
  if (alreadyDone) {
    return {
      xpGained: 0,
      nextProfile: {
        ...profile,
        streakDays: streak.streakDays,
        lastActiveDate: streak.lastActiveDate,
      },
    };
  }
  return {
    xpGained: xpReward,
    nextProfile: {
      ...profile,
      xp: profile.xp + xpReward,
      streakDays: streak.streakDays,
      lastActiveDate: streak.lastActiveDate,
      completedChapters: [...profile.completedChapters, chapterId],
    },
  };
}

export function applyProblemSolved(
  profile: UserProfile,
  problemId: string,
  xpReward: number,
  todayDate: string,
): { nextProfile: UserProfile; xpGained: number } {
  const alreadyDone = profile.solvedProblems.includes(problemId);
  const streak = updateStreakForDate(profile.lastActiveDate, profile.streakDays, todayDate);
  if (alreadyDone) {
    return {
      xpGained: 0,
      nextProfile: {
        ...profile,
        streakDays: streak.streakDays,
        lastActiveDate: streak.lastActiveDate,
      },
    };
  }
  return {
    xpGained: xpReward,
    nextProfile: {
      ...profile,
      xp: profile.xp + xpReward,
      streakDays: streak.streakDays,
      lastActiveDate: streak.lastActiveDate,
      solvedProblems: [...profile.solvedProblems, problemId],
    },
  };
}

export function applyPracticeXpBonus(
  profile: UserProfile,
  xpBonus: number,
  todayDate: string,
): { nextProfile: UserProfile; xpGained: number } {
  const safeBonus = Math.max(0, Math.floor(xpBonus));
  const streak = updateStreakForDate(profile.lastActiveDate, profile.streakDays, todayDate);
  if (safeBonus === 0) {
    return {
      xpGained: 0,
      nextProfile: {
        ...profile,
        streakDays: streak.streakDays,
        lastActiveDate: streak.lastActiveDate,
      },
    };
  }
  return {
    xpGained: safeBonus,
    nextProfile: {
      ...profile,
      xp: profile.xp + safeBonus,
      streakDays: streak.streakDays,
      lastActiveDate: streak.lastActiveDate,
    },
  };
}

