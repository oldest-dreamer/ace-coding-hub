import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface BootPreloaderProps {
  onDone?: () => void;
}

export function BootPreloader({ onDone }: BootPreloaderProps) {
  const [visible, setVisible] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const params = new URLSearchParams(window.location.search);
    if (params.get('autostart') === '1') return false;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return false;
    return true;
  });
  const [percent, setPercent] = useState<number>(0);

  useEffect(() => {
    if (!visible) {
      onDone?.();
      return;
    }

    const totalMs = 760;
    const start = performance.now();
    let rafId = 0;

    function tick(now: number) {
      const elapsed = now - start;
      const t = Math.min(1, elapsed / totalMs);
      // Fast ease-out curve for crisp Lusion-style counter
      const eased = 1 - Math.pow(1 - t, 3);
      setPercent(Math.round(eased * 100));
      if (t < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setVisible(false);
          onDone?.();
        }, 90);
      }
    }

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [visible, onDone]);

  const padded = String(percent).padStart(3, '0');

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="argon-boot-preloader"
          initial={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
          exit={{
            opacity: 0,
            clipPath: 'inset(0% 0% 100% 0%)',
            transition: { duration: 0.32, ease: [0.16, 1, 0.3, 1] },
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#070B14] px-6 text-slate-100 select-none"
          aria-label="Loading Ace Coding Hub"
          role="status"
        >
          {/* Ambient neon horizon */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 neon-obsidian-backdrop"
          />

          <div className="relative flex w-full max-w-md flex-col items-start gap-4">
            <div className="flex w-full items-baseline justify-between">
              <span className="font-display text-sm font-bold tracking-tight text-slate-300">
                Ace Coding Hub
              </span>
              <span className="font-mono text-xs text-slate-400">
                8 Languages · 200 Chapters
              </span>
            </div>

            <div className="flex w-full items-baseline justify-between gap-4">
              <span className="font-mono text-6xl font-bold tracking-tighter tabular-nums text-[#00F5D4] sm:text-7xl">
                {padded}
                <span className="text-2xl text-violet-400">%</span>
              </span>

              <button
                type="button"
                onClick={() => {
                  setVisible(false);
                  onDone?.();
                }}
                className="rounded-lg border border-slate-700/80 bg-slate-900/80 px-3 py-1.5 text-xs font-semibold text-slate-300 transition-colors hover:border-[#00F5D4]/60 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F5D4]"
              >
                Skip Intro
              </button>
            </div>

            {/* Expanding Neon Progress Bar */}
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800/90">
              <div
                className="h-full origin-left rounded-full bg-gradient-to-r from-[#00F5D4] via-[#8B5CF6] to-emerald-400 transition-transform duration-75"
                style={{ transform: `scaleX(${percent / 100})` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
