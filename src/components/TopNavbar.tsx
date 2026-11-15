import {
  BookOpen,
  Bookmark,
  Briefcase,
  Cloud,
  Flame,
  Globe,
  Home,
  LogIn,
  Moon,
  Rocket,
  Search,
  Sun,
  Terminal,
  Trophy,
} from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import type { CloudSyncStatus } from '../hooks/useCloudProgress';
import type { MainView, UserProfile } from '../types/academy';
import { computeLevelProgress } from '../utils/gamification';
import { ArgonBotMascot, type ArgonBotMood } from './ArgonBotMascot';

interface TopNavbarProps {
  activeView: MainView;
  onSelectView: (view: MainView) => void;
  profile: UserProfile;
  isAuthenticated: boolean;
  syncStatus?: CloudSyncStatus;
  mascotMood?: ArgonBotMood;
  onOpenSearch: () => void;
  onToggleTheme: () => void;
  onOpenProfileModal: () => void;
  onOpenAuthGate: () => void;
}

const DEPARTMENT_TABS: {
  id: MainView;
  label: string;
  mobileLabel: string;
  icon: typeof Home;
}[] = [
  { id: 'lobby', label: 'Academy Lobby', mobileLabel: 'Lobby', icon: Home },
  { id: 'studio', label: 'Chapter Studio', mobileLabel: 'Studio', icon: BookOpen },
  { id: 'cp-arena', label: 'CP Arena', mobileLabel: 'CP 500', icon: Trophy },
  { id: 'interview', label: 'Job Interviews', mobileLabel: 'Jobs 200', icon: Briefcase },
  { id: 'contest-projects', label: 'Contest & Projects', mobileLabel: 'Contests', icon: Rocket },
  { id: 'architecture', label: 'Web Blueprint', mobileLabel: 'Blueprint', icon: Globe },
];

export function TopNavbar({
  activeView,
  onSelectView,
  profile,
  isAuthenticated,
  syncStatus = 'guest',
  mascotMood = 'idle',
  onOpenSearch,
  onToggleTheme,
  onOpenProfileModal,
  onOpenAuthGate,
}: TopNavbarProps) {
  const prefersReducedMotion = useReducedMotion();
  const lvl = computeLevelProgress(profile.xp);

  return (
    <header className="no-print sticky top-0 z-30 border-b border-[#E2D9C5] bg-[#FCF9F2]/88 backdrop-blur-xl dark:border-white/[0.08] dark:bg-[#07090D]/85">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-3 px-4 py-2.5 sm:px-6">
        {/* Zone 1: Brand Wordmark + Interactive AceBot */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => onSelectView('lobby')}
            aria-label="Ace Coding Hub Home"
            className="flex items-center gap-2 text-left whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 dark:focus-visible:ring-emerald-400 rounded-md"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white shadow-[0_0_18px_-4px_rgba(16,185,129,0.55)] dark:bg-emerald-500 dark:text-slate-950">
              <Terminal className="h-4 w-4" aria-hidden="true" />
            </span>
            <span className="font-display text-base font-bold tracking-tight text-[#1C1917] dark:text-white lg:text-lg">
              <span className="hidden xl:inline">Ace Coding Hub</span>
              <span className="xl:hidden">AceCode</span>
            </span>
          </button>

          <div className="hidden sm:flex items-center">
            <ArgonBotMascot mood={mascotMood} size="sm" />
          </div>
        </div>

        {/* Zone 2: 5 Distinct Departments Navigation */}
        <nav
          aria-label="Primary Departments"
          className="hidden md:flex items-center gap-1 rounded-xl border border-[#E2D9C5] bg-[#EFE8D6]/85 p-1 backdrop-blur-md dark:border-white/[0.08] dark:bg-[#0E131D]/85 overflow-x-auto"
        >
          {DEPARTMENT_TABS.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectView(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`relative flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 dark:focus-visible:ring-emerald-400 ${
                  isActive
                    ? 'text-emerald-900 dark:text-slate-950'
                    : 'text-[#57534E] hover:text-[#1C1917] dark:text-slate-300 dark:hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNavTab"
                    transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                    aria-hidden="true"
                    className="absolute inset-0 rounded-lg border border-emerald-500/35 bg-[#FCF9F2] shadow-sm dark:border-transparent dark:bg-gradient-to-r dark:from-emerald-400 dark:to-cyan-400"
                  />
                )}
                <Icon className="relative z-10 h-3.5 w-3.5" aria-hidden="true" />
                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Zone 3: RPG Gamification HUD + Search + Signature Theme Switcher + Profile */}
        <div className="flex items-center gap-2 shrink-0">
          <div
            className="hidden xl:flex items-center gap-2.5 rounded-lg border border-[#E2D9C5] bg-[#EFE8D6]/75 px-2.5 py-1.5 dark:border-white/[0.08] dark:bg-[#0E131D]/85"
            title={`${lvl.rankTitle} · ${profile.xp} Total XP`}
          >
            <div className="font-mono text-xs font-bold tabular-nums text-emerald-800 dark:text-emerald-300 whitespace-nowrap">
              Lv.{lvl.level}
            </div>
            <div className="w-24">
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#E2D9C5] dark:bg-slate-800">
                <motion.div
                  initial={false}
                  animate={{ scaleX: Math.max(0.02, lvl.progressPercent / 100) }}
                  transition={
                    prefersReducedMotion
                      ? { duration: 0 }
                      : { type: 'spring', stiffness: 260, damping: 24 }
                  }
                  className="h-full origin-left rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:via-cyan-400 dark:to-violet-400"
                />
              </div>
              <div className="mt-0.5 flex justify-between text-[10px] font-mono tabular-nums text-[#57534E] dark:text-slate-400">
                <span>{profile.xp} XP</span>
                <span>{lvl.progressPercent}%</span>
              </div>
            </div>
          </div>

          <div
            className="hidden sm:flex items-center gap-1 rounded-lg border border-amber-500/30 bg-amber-500/10 px-2 py-1 text-xs font-bold tabular-nums text-amber-700 shadow-[0_0_16px_-6px_rgba(245,158,11,0.55)] dark:border-amber-400/30 dark:bg-amber-500/10 dark:text-amber-300 whitespace-nowrap shrink-0"
            aria-label={`${profile.streakDays} day streak`}
          >
            <Flame className="h-3.5 w-3.5 text-amber-600 drop-shadow-[0_0_6px_rgba(245,158,11,0.65)] dark:text-amber-400" aria-hidden="true" />
            <span>{profile.streakDays}d</span>
          </div>

          <button
            type="button"
            onClick={onOpenSearch}
            aria-label="Open global search command palette"
            className="flex items-center gap-1.5 rounded-lg border border-[#E2D9C5] bg-[#FCF9F2] px-2.5 py-1.5 text-xs font-medium text-[#1C1917] transition-colors hover:bg-[#EFE8D6] dark:border-white/[0.08] dark:bg-[#0E131D]/85 dark:text-slate-300 dark:hover:border-emerald-400/40 dark:hover:text-white whitespace-nowrap shrink-0"
          >
            <Search className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="hidden lg:inline">Search</span>
            <kbd className="hidden xl:inline font-mono text-[10px] text-[#57534E] dark:text-slate-400">
              Ctrl+K
            </kbd>
          </button>

          <button
            type="button"
            onClick={onToggleTheme}
            title={
              profile.theme === 'dark'
                ? 'Switch to Daylight Eye-Comfort Paper Mode'
                : 'Switch to Obsidian Emerald IDE Mode'
            }
            aria-label={
              profile.theme === 'dark'
                ? 'Switch to Daylight Paper theme'
                : 'Switch to Obsidian Emerald dark theme'
            }
            className="flex items-center gap-1.5 rounded-lg border border-[#E2D9C5] bg-[#FCF9F2] px-2.5 py-1.5 text-xs font-semibold text-[#1C1917] transition-colors hover:bg-[#EFE8D6] dark:border-white/[0.08] dark:bg-[#0E131D]/85 dark:text-slate-200 dark:hover:border-emerald-400/40 whitespace-nowrap shrink-0"
          >
            {profile.theme === 'dark' ? (
              <>
                <Sun className="h-3.5 w-3.5 text-amber-400" aria-hidden="true" />
                <span className="hidden xl:inline">Daylight</span>
              </>
            ) : (
              <>
                <Moon className="h-3.5 w-3.5 text-emerald-700" aria-hidden="true" />
                <span className="hidden xl:inline">Obsidian</span>
              </>
            )}
          </button>

          {isAuthenticated ? (
            <button
              type="button"
              onClick={onOpenProfileModal}
              aria-label={`Open profile and cloud sync settings for ${profile.username}`}
              className="flex items-center gap-1.5 rounded-lg bg-[#1C1917] px-2.5 py-1.5 text-xs font-semibold text-[#FCF9F2] transition-colors hover:bg-emerald-700 dark:bg-emerald-500 dark:text-slate-950 dark:hover:bg-emerald-400 whitespace-nowrap shrink-0"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded bg-white/15 font-mono text-[11px] font-bold dark:bg-slate-950/20">
                {profile.avatarSeed}
              </span>
              <span className="hidden sm:inline max-w-[96px] truncate">{profile.username}</span>
              <Cloud
                className={`h-3 w-3 shrink-0 ${syncStatus === 'syncing' ? 'animate-spin' : ''}`}
                aria-hidden="true"
              />
            </button>
          ) : (
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={onOpenProfileModal}
                aria-label="Open guest bookmarks and local JSON backup"
                title="Bookmarks & Local Backup"
                className="flex items-center justify-center rounded-lg border border-[#E2D9C5] bg-[#FCF9F2] p-1.5 text-[#1C1917] transition-colors hover:bg-[#EFE8D6] dark:border-white/[0.08] dark:bg-[#0E131D]/85 dark:text-slate-300 dark:hover:border-emerald-400/40"
              >
                <Bookmark className="h-3.5 w-3.5" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={onOpenAuthGate}
                className="flex items-center gap-1.5 rounded-lg bg-[#1C1917] px-3 py-1.5 text-xs font-bold text-[#FCF9F2] transition-colors hover:bg-emerald-700 dark:bg-[#C8EE72] dark:text-[#07090D] dark:hover:bg-[#d6f58c] whitespace-nowrap shrink-0"
              >
                <LogIn className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Sign In / Join</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile 6-Department Switcher Row */}
      <nav
        aria-label="Mobile Departments"
        className="grid grid-cols-3 gap-1 border-t border-[#E2D9C5] px-2 py-1.5 dark:border-white/[0.08] sm:grid-cols-6 md:hidden"
      >
        {DEPARTMENT_TABS.map((item) => {
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectView(item.id)}
              className={`rounded-md px-1 py-1.5 text-center text-[11px] font-semibold whitespace-nowrap transition-colors ${
                isActive
                  ? 'bg-emerald-600 text-white dark:bg-emerald-500 dark:text-slate-950'
                  : 'text-[#57534E] hover:bg-[#EFE8D6] dark:text-slate-400 dark:hover:bg-slate-800'
              }`}
            >
              {item.mobileLabel}
            </button>
          );
        })}
      </nav>
    </header>
  );
}
