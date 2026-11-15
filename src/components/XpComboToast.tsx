import { Sparkles, Zap } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

export interface XpComboEvent {
  id: number;
  xpGained: number;
  label: string;
  comboCount: number;
}

interface XpComboToastProps {
  event: XpComboEvent | null;
}

export function XpComboToast({ event }: XpComboToastProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      aria-live="polite"
      className="no-print pointer-events-none fixed right-4 top-16 z-40 sm:right-6 sm:top-20"
    >
      <AnimatePresence mode="popLayout">
        {event && (
          <motion.div
            key={event.id}
            initial={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 18, scale: 0.84 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, y: -16, scale: 0.9 }
            }
            transition={{ type: 'spring', stiffness: 420, damping: 22, mass: 0.7 }}
            className="flex items-center gap-2.5 rounded-xl border border-emerald-500/45 bg-[#FCF9F2]/95 px-3.5 py-2 shadow-[0_10px_30px_-8px_rgba(16,185,129,0.4)] backdrop-blur-xl dark:border-emerald-400/45 dark:bg-[#0E131D]/95 dark:shadow-[0_10px_32px_-8px_rgba(16,185,129,0.45)]"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300">
              {event.comboCount > 1 ? (
                <Zap className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Sparkles className="h-4 w-4" aria-hidden="true" />
              )}
            </span>

            <div className="leading-tight">
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-sm font-bold tabular-nums text-emerald-700 dark:text-emerald-300">
                  +{event.xpGained} XP
                </span>
                {event.comboCount > 1 && (
                  <span className="rounded-md bg-emerald-600 px-1.5 py-0.5 font-mono text-[10px] font-bold text-white dark:bg-emerald-400 dark:text-slate-950">
                    COMBO x{event.comboCount}
                  </span>
                )}
              </div>
              <div className="text-[11px] font-medium text-[#57534E] dark:text-slate-300">
                {event.label}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
