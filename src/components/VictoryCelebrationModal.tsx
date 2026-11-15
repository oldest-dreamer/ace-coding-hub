import confetti from 'canvas-confetti';
import { Award, Sparkles, Trophy, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { computeLevelProgress } from '../utils/gamification';

export interface CelebrationEvent {
  id: number;
  title: string;
  subtitle: string;
  xpGained: number;
  totalXp: number;
  leveledUp: boolean;
  kind: 'chapter' | 'problem';
}

interface VictoryCelebrationModalProps {
  event: CelebrationEvent | null;
  onClose: () => void;
}

export function VictoryCelebrationModal({
  event,
  onClose,
}: VictoryCelebrationModalProps) {
  const [displayXp, setDisplayXp] = useState(0);

  // Fire canvas-confetti & animate XP counter cleanly when celebration opens
  useEffect(() => {
    if (!event) return;

    const reducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    if (!reducedMotion && (event.kind === 'problem' || event.leveledUp)) {
      try {
        confetti({
          particleCount: event.leveledUp ? 85 : 55,
          spread: 68,
          origin: { y: 0.58 },
          colors: ['#10B981', '#06B6D4', '#8B5CF6', '#F59E0B'],
          disableForReducedMotion: true,
        });
      } catch {
        // Ignore if canvas context isn't available in headless env
      }
    }

    const target = event.xpGained;
    if (target <= 0) {
      setDisplayXp(0);
      return;
    }

    const start = performance.now();
    const duration = 500;
    let rafId = 0;

    function tick(now: number) {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplayXp(Math.round(eased * target));
      if (t < 1) {
        rafId = requestAnimationFrame(tick);
      }
    }
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [event]);

  const lvl = event ? computeLevelProgress(event.totalXp) : null;

  return (
    <AnimatePresence>
      {event && lvl && (
        <motion.div
          key={event.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="victory-modal-title"
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 10 }}
            transition={{ type: 'spring', stiffness: 360, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            className="obsidian-glass-card relative w-full max-w-md overflow-hidden rounded-2xl p-6 shadow-2xl dark:border-emerald-400/35"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close celebration popup"
              className="absolute right-4 top-4 rounded-lg p-1.5 text-[#57534E] hover:bg-[#EFE8D6] dark:text-slate-400 dark:hover:bg-slate-800"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-500/40 bg-emerald-500/15 text-emerald-600 dark:text-[#00F5D4]">
                {event.leveledUp ? (
                  <Sparkles className="h-7 w-7" aria-hidden="true" />
                ) : event.kind === 'problem' ? (
                  <Trophy className="h-7 w-7" aria-hidden="true" />
                ) : (
                  <Award className="h-7 w-7" aria-hidden="true" />
                )}
              </div>

              <div className="mt-3 font-mono text-xs font-bold tracking-wide text-emerald-700 dark:text-[#00F5D4]">
                {event.leveledUp
                  ? `LEVEL UP · LEVEL ${lvl.level} UNLOCKED`
                  : event.kind === 'problem'
                    ? 'ACCEPTED (AC) · ALL TESTS PASSED'
                    : 'CHAPTER MILESTONE VERIFIED'}
              </div>

              <h2
                id="victory-modal-title"
                className="mt-1.5 font-display text-xl font-bold text-[#1C1917] dark:text-white"
              >
                {event.title}
              </h2>
              <p className="mt-1 text-xs text-[#57534E] dark:text-slate-400">
                {event.subtitle}
              </p>

              {/* Animated XP Earned Pill Card */}
              <div className="mt-5 w-full rounded-xl border border-[#E2D9C5] bg-[#F7F3E8] p-4 dark:border-slate-800 dark:bg-[#070B14]/80">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs font-semibold text-[#57534E] dark:text-slate-400">
                    XP Earned
                  </span>
                  <span className="font-mono text-2xl font-bold tabular-nums text-amber-700 dark:text-[#00F5D4]">
                    +{displayXp} XP
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-between text-[11px] font-mono tabular-nums text-[#57534E] dark:text-slate-400">
                  <span>
                    Lv.{lvl.level} · {lvl.rankTitle}
                  </span>
                  <span>
                    {event.totalXp} XP · {lvl.progressPercent}%
                  </span>
                </div>
                <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-[#E2D9C5] dark:bg-slate-800">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: lvl.progressPercent / 100 }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full origin-left rounded-full bg-gradient-to-r from-amber-500 to-emerald-500 dark:from-[#00F5D4] dark:to-[#8B5CF6]"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="mt-5 w-full rounded-xl bg-amber-600 px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-amber-700 dark:bg-[#00F5D4] dark:text-slate-950 dark:hover:bg-[#00F5D4]/90"
              >
                Continue Learning
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
