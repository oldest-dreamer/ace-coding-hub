import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Cpu, Pause, Play, RotateCcw } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import type { DryRunRow } from '../types/academy';
import { parseDryRunFrames } from '../utils/dryRunParser';

interface DryRunAnimatorProps {
  rows: DryRunRow[];
  chapterId: string;
  onActiveStepChange?: (stepNumber: number | null) => void;
}

export function DryRunAnimator({
  rows,
  chapterId,
  onActiveStepChange,
}: DryRunAnimatorProps) {
  const frames = useMemo(() => parseDryRunFrames(rows), [rows]);
  const [stepIdx, setStepIdx] = useState<number>(0);
  const [playing, setPlaying] = useState<boolean>(false);

  // Reset animator when switching chapters
  useEffect(() => {
    setStepIdx(0);
    setPlaying(false);
  }, [chapterId]);

  const activeFrame = frames[stepIdx];

  useEffect(() => {
    onActiveStepChange?.(activeFrame ? activeFrame.step : null);
  }, [activeFrame, onActiveStepChange]);

  useEffect(() => {
    if (!playing || frames.length <= 1) return;
    const timer = setInterval(() => {
      setStepIdx((prev) => {
        if (prev >= frames.length - 1) {
          setPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 1450);
    return () => clearInterval(timer);
  }, [playing, frames.length]);

  if (frames.length === 0 || !activeFrame) return null;

  return (
    <div
      className="rounded-xl border border-[#E2D9C5] bg-[#FCF9F2] p-4 dark:border-[#00F5D4]/25 dark:bg-[#0B1222]/85 dark:backdrop-blur-md space-y-3.5"
      aria-label="Interactive Dry Run Memory Visualizer"
    >
      {/* Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E2D9C5] pb-3 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <Cpu className="h-4 w-4 text-amber-600 dark:text-[#00F5D4]" aria-hidden="true" />
          <span className="font-display text-xs font-bold text-[#1C1917] dark:text-white">
            Visual Memory &amp; Execution Trace Player
          </span>
          <span className="font-mono text-[11px] tabular-nums text-[#57534E] dark:text-slate-400">
            · Step {stepIdx + 1}/{frames.length}
          </span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={() => {
              setPlaying(false);
              setStepIdx((i) => Math.max(0, i - 1));
            }}
            disabled={stepIdx === 0}
            aria-label="Previous trace step"
            className="flex items-center gap-1 rounded-md border border-[#E2D9C5] bg-[#F7F3E8] px-2.5 py-1.5 text-xs font-semibold text-[#1C1917] transition-colors hover:bg-[#EFE8D6] disabled:opacity-40 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 whitespace-nowrap"
          >
            <ChevronLeft className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Prev</span>
          </button>

          <button
            type="button"
            onClick={() => {
              if (stepIdx >= frames.length - 1 && !playing) {
                setStepIdx(0);
              }
              setPlaying((p) => !p);
            }}
            className="flex items-center gap-1.5 rounded-md bg-amber-600 px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-amber-700 dark:bg-[#00F5D4] dark:text-slate-950 dark:hover:bg-[#00F5D4]/90 whitespace-nowrap"
          >
            {playing ? (
              <>
                <Pause className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{stepIdx >= frames.length - 1 ? 'Replay' : 'Animate Dry Run'}</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              setPlaying(false);
              setStepIdx((i) => Math.min(frames.length - 1, i + 1));
            }}
            disabled={stepIdx >= frames.length - 1}
            aria-label="Next trace step"
            className="flex items-center gap-1 rounded-md border border-[#E2D9C5] bg-[#F7F3E8] px-2.5 py-1.5 text-xs font-semibold text-[#1C1917] transition-colors hover:bg-[#EFE8D6] disabled:opacity-40 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 whitespace-nowrap"
          >
            <span>Next</span>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={() => {
              setPlaying(false);
              setStepIdx(0);
            }}
            aria-label="Reset trace player"
            className="rounded-md border border-[#E2D9C5] bg-[#F7F3E8] p-1.5 text-[#57534E] transition-colors hover:text-[#1C1917] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:text-white"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Animated Execution Stage */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${chapterId}-step-${activeFrame.step}`}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-3"
        >
          {/* Current Step Summary */}
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-[#E2D9C5] bg-[#F7F3E8] px-3 py-2 dark:border-slate-800 dark:bg-[#070B14]/80">
            <div className="text-xs font-semibold text-[#1C1917] dark:text-slate-100">
              <span className="font-mono text-amber-700 dark:text-[#00F5D4]">
                Step {activeFrame.step}:
              </span>{' '}
              {activeFrame.stateLabel}
            </div>
            <div className="text-[11px] text-[#57534E] dark:text-slate-400">
              {activeFrame.note}
            </div>
          </div>

          {/* Animated Variable Memory Boxes */}
          <div>
            <div className="mb-1.5 text-[11px] font-semibold text-[#57534E] dark:text-slate-400">
              RAM Variable Slots
            </div>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {activeFrame.variables.map((v) => (
                <motion.div
                  key={`${v.name}-${v.value}`}
                  layout
                  initial={{ scale: 0.96, opacity: 0.7 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 360, damping: 26 }}
                  className={`rounded-lg border px-3 py-2 font-mono ${
                    v.changed
                      ? 'border-amber-600/60 bg-amber-50/90 dark:border-[#00F5D4]/60 dark:bg-[#00F5D4]/10'
                      : 'border-[#E2D9C5] bg-white dark:border-slate-800 dark:bg-slate-900/70'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 text-[10px]">
                    <span className="font-semibold text-[#57534E] dark:text-slate-400">
                      {v.name}
                    </span>
                    {v.changed && (
                      <span className="font-bold text-amber-700 dark:text-[#00F5D4]">
                        UPDATED
                      </span>
                    )}
                  </div>
                  <div className="mt-1 truncate text-xs font-bold text-[#1C1917] dark:text-white">
                    {v.value}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Animated Array / Sequence Strip (if parsed) */}
          {activeFrame.arrayCells.length > 0 && (
            <div>
              <div className="mb-1.5 text-[11px] font-semibold text-[#57534E] dark:text-slate-400">
                Indexed Sequence / Array View
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                {activeFrame.arrayCells.map((cell, idx) => (
                  <motion.div
                    key={`${idx}-${cell}`}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: idx * 0.04 }}
                    className="flex flex-col items-center rounded-md border border-[#E2D9C5] bg-white px-2.5 py-1.5 font-mono dark:border-violet-500/40 dark:bg-violet-950/30"
                  >
                    <span className="text-[10px] text-[#57534E] dark:text-violet-300">
                      [{idx}]
                    </span>
                    <span className="text-xs font-bold tabular-nums text-[#1C1917] dark:text-white">
                      {cell}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Animated Call Stack Frames (if parsed) */}
          {activeFrame.stackFrames.length > 0 && (
            <div>
              <div className="mb-1.5 text-[11px] font-semibold text-[#57534E] dark:text-slate-400">
                Call Stack Frames
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                {activeFrame.stackFrames.map((frame, i) => (
                  <motion.div
                    key={frame}
                    initial={{ x: -8, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="rounded-md border border-emerald-600/35 bg-emerald-50 px-2.5 py-1 font-mono text-[11px] font-semibold text-emerald-800 dark:border-emerald-500/40 dark:bg-emerald-950/30 dark:text-emerald-300"
                  >
                    {frame}
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
