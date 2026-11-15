import confetti from 'canvas-confetti';
import { CheckCircle2 } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

interface HoldToCompleteButtonProps {
  chapterNumber: number;
  xpReward: number;
  isDone: boolean;
  onComplete: () => void;
}

const HOLD_DURATION_MS = 600;

export function HoldToCompleteButton({
  chapterNumber,
  xpReward,
  isDone,
  onComplete,
}: HoldToCompleteButtonProps) {
  const prefersReducedMotion = useReducedMotion();
  const [holding, setHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const [pulseSuccess, setPulseSuccess] = useState(false);
  const [hintReleaseEarly, setHintReleaseEarly] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const completedInPressRef = useRef<boolean>(false);

  const radius = 8.5;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - progress * circumference;

  function cancelHold(showHint: boolean) {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    setHolding(false);
    setProgress(0);
    if (showHint && !completedInPressRef.current && !isDone) {
      setHintReleaseEarly(true);
      setTimeout(() => setHintReleaseEarly(false), 1300);
    }
  }

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  function fireButtonConfetti() {
    if (typeof window === 'undefined' || prefersReducedMotion) return;
    try {
      const rect = buttonRef.current?.getBoundingClientRect();
      const origin = rect
        ? {
            x: (rect.left + rect.width / 2) / window.innerWidth,
            y: (rect.top + rect.height / 2) / window.innerHeight,
          }
        : { x: 0.78, y: 0.16 };

      confetti({
        particleCount: 52,
        spread: 68,
        startVelocity: 28,
        origin,
        colors: ['#10B981', '#06B6D4', '#8B5CF6', '#F59E0B'],
        disableForReducedMotion: true,
      });
    } catch {
      // Ignore canvas error in headless contexts
    }
  }

  function triggerCompletion() {
    completedInPressRef.current = true;
    setHolding(false);
    setProgress(0);
    setHintReleaseEarly(false);
    setPulseSuccess(true);
    setTimeout(() => setPulseSuccess(false), 550);
    fireButtonConfetti();
    onComplete();
  }

  function handlePointerDown(e: React.PointerEvent<HTMLButtonElement>) {
    if (e.button !== 0) return;
    if (isDone) {
      triggerCompletion();
      return;
    }

    completedInPressRef.current = false;
    setHintReleaseEarly(false);
    setHolding(true);
    startTimeRef.current = performance.now();

    function step(now: number) {
      const elapsed = now - startTimeRef.current;
      const ratio = Math.min(1, elapsed / HOLD_DURATION_MS);
      setProgress(ratio);
      if (ratio >= 1) {
        rafRef.current = null;
        triggerCompletion();
      } else {
        rafRef.current = requestAnimationFrame(step);
      }
    }

    rafRef.current = requestAnimationFrame(step);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      triggerCompletion();
    }
  }

  return (
    <motion.button
      ref={buttonRef}
      type="button"
      onPointerDown={handlePointerDown}
      onPointerUp={() => cancelHold(true)}
      onPointerLeave={() => cancelHold(false)}
      onPointerCancel={() => cancelHold(false)}
      onKeyDown={handleKeyDown}
      animate={
        pulseSuccess && !prefersReducedMotion
          ? { scale: [1, 1.07, 1] }
          : holding && !prefersReducedMotion
            ? { scale: 0.965 }
            : { scale: 1 }
      }
      transition={{ type: 'spring', stiffness: 420, damping: 22 }}
      aria-label={
        isDone
          ? `Chapter ${chapterNumber} completed`
          : `Hold 0.6 seconds or press Enter to complete Chapter ${chapterNumber} and earn ${xpReward} XP`
      }
      className={`relative flex items-center gap-2 overflow-hidden rounded-lg px-3.5 py-1.5 text-xs font-bold transition-colors whitespace-nowrap shrink-0 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
        isDone
          ? 'border border-emerald-500/45 bg-emerald-500/15 text-emerald-800 dark:border-emerald-400/45 dark:bg-emerald-500/15 dark:text-emerald-300'
          : 'bg-emerald-600 text-white shadow-[0_0_20px_-6px_rgba(16,185,129,0.6)] hover:bg-emerald-500 dark:bg-emerald-500 dark:text-slate-950 dark:hover:bg-emerald-400'
      }`}
    >
      {/* Subtle horizontal progress fill wash behind label while holding */}
      {!isDone && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 origin-left bg-white/20 dark:bg-slate-950/20"
          style={{ transform: `scaleX(${progress})` }}
        />
      )}

      {/* Circular SVG Charge Ring + Checkmark Icon */}
      <span className="relative z-10 flex h-5 w-5 items-center justify-center shrink-0">
        {!isDone && (
          <svg
            className="absolute inset-0 h-5 w-5 -rotate-90"
            viewBox="0 0 22 22"
            aria-hidden="true"
          >
            <circle
              cx="11"
              cy="11"
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeOpacity="0.28"
              strokeWidth="2.2"
            />
            <circle
              cx="11"
              cy="11"
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
            />
          </svg>
        )}
        <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
      </span>

      <span className="relative z-10">
        {isDone
          ? 'Chapter Completed'
          : holding
            ? `Charging ${Math.round(progress * 100)}%…`
            : hintReleaseEarly
              ? 'Hold 0.6s to Complete'
              : `Hold: Complete Ch ${chapterNumber} · +${xpReward} XP`}
      </span>
    </motion.button>
  );
}
