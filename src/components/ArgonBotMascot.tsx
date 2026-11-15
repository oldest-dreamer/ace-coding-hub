import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

export type ArgonBotMood = 'idle' | 'happy' | 'surprised';

interface ArgonBotMascotProps {
  mood?: ArgonBotMood;
  size?: 'sm' | 'md';
  showLabel?: boolean;
}

export function ArgonBotMascot({
  mood = 'idle',
  size = 'sm',
  showLabel = false,
}: ArgonBotMascotProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftPupilRef = useRef<SVGCircleElement>(null);
  const rightPupilRef = useRef<SVGCircleElement>(null);
  const [blinking, setBlinking] = useState(false);

  // Natural periodic blinking in idle state
  useEffect(() => {
    if (mood !== 'idle') {
      setBlinking(false);
      return;
    }
    const interval = setInterval(() => {
      setBlinking(true);
      setTimeout(() => setBlinking(false), 140);
    }, 3800);
    return () => clearInterval(interval);
  }, [mood]);

  // Smooth cursor-tracking pupils via direct SVG transform (zero React 60Hz re-renders)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

    let rafId = 0;
    function onPointerMove(e: MouseEvent) {
      if (mood !== 'idle') return;
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const el = containerRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.hypot(dx, dy) || 1;
        const maxShift = 2.1;
        const ox = (dx / dist) * Math.min(maxShift, dist / 45);
        const oy = (dy / dist) * Math.min(maxShift, dist / 45);
        const transform = `translate(${ox.toFixed(2)}px, ${oy.toFixed(2)}px)`;
        if (leftPupilRef.current) leftPupilRef.current.style.transform = transform;
        if (rightPupilRef.current) rightPupilRef.current.style.transform = transform;
      });
    }

    window.addEventListener('mousemove', onPointerMove, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onPointerMove);
    };
  }, [mood]);

  const dims = size === 'md' ? 'h-9 w-9' : 'h-7 w-7';
  const moodLabel =
    mood === 'happy'
      ? 'AceBot celebrating Accepted verdict'
      : mood === 'surprised'
        ? 'AceBot spotted a code error'
        : 'AceBot assistant watching';

  return (
    <div
      ref={containerRef}
      className="inline-flex items-center gap-2 shrink-0"
      aria-label={moodLabel}
      title={moodLabel}
    >
      <motion.div
        animate={
          mood === 'happy'
            ? { y: [0, -3, 0], rotate: [0, -4, 4, 0] }
            : mood === 'surprised'
              ? { x: [0, -2, 2, -1, 0] }
              : { y: 0, rotate: 0 }
        }
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className={`relative flex items-center justify-center rounded-lg border transition-colors ${dims} ${
          mood === 'happy'
            ? 'border-emerald-500/60 bg-emerald-500/15 dark:border-emerald-400/70 dark:bg-emerald-500/15'
            : mood === 'surprised'
              ? 'border-amber-500/70 bg-amber-500/15 dark:border-rose-400/70 dark:bg-rose-500/15'
              : 'border-[#E2D9C5] bg-[#EFE8D6] dark:border-[#00F5D4]/30 dark:bg-[#111A2E]'
        }`}
      >
        <svg viewBox="0 0 36 36" className="h-full w-full p-1" aria-hidden="true">
          {/* Antenna */}
          <line
            x1="18"
            y1="3"
            x2="18"
            y2="8"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="text-amber-600 dark:text-[#00F5D4]"
          />
          <circle
            cx="18"
            cy="3"
            r="2"
            className={
              mood === 'happy'
                ? 'fill-emerald-500'
                : mood === 'surprised'
                  ? 'fill-rose-500'
                  : 'fill-amber-600 dark:fill-[#00F5D4]'
            }
          />

          {/* Geometric Head Visor */}
          <rect
            x="5"
            y="8"
            width="26"
            height="21"
            rx="7"
            className="fill-[#1C1917] dark:fill-[#070B14]"
            stroke="currentColor"
            strokeWidth="1.6"
            style={{
              color:
                mood === 'happy'
                  ? '#10B981'
                  : mood === 'surprised'
                    ? '#F59E0B'
                    : '#00F5D4',
            }}
          />

          {/* Eyes */}
          {mood === 'happy' ? (
            <>
              {/* Glowing Star/Spark Happy Eyes */}
              <path
                d="M12.5 14.2 L13.4 16.5 L15.8 16.5 L13.9 17.9 L14.6 20.2 L12.5 18.8 L10.4 20.2 L11.1 17.9 L9.2 16.5 L11.6 16.5 Z"
                className="fill-[#00F5D4]"
              />
              <path
                d="M23.5 14.2 L24.4 16.5 L26.8 16.5 L24.9 17.9 L25.6 20.2 L23.5 18.8 L21.4 20.2 L22.1 17.9 L20.2 16.5 L22.6 16.5 Z"
                className="fill-[#00F5D4]"
              />
              <path
                d="M14 23 Q18 26 22 23"
                fill="none"
                stroke="#10B981"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </>
          ) : mood === 'surprised' ? (
            <>
              {/* Wide Surprised Eyes + Alert Mouth */}
              <circle cx="12.5" cy="17.5" r="3.1" className="fill-amber-400" />
              <circle cx="12.5" cy="17.5" r="1.2" className="fill-[#070B14]" />
              <circle cx="23.5" cy="17.5" r="3.1" className="fill-amber-400" />
              <circle cx="23.5" cy="17.5" r="1.2" className="fill-[#070B14]" />
              <circle cx="18" cy="23.8" r="1.8" className="fill-rose-400" />
            </>
          ) : blinking ? (
            <>
              <line x1="9.5" y1="17.5" x2="15.5" y2="17.5" stroke="#00F5D4" strokeWidth="2" strokeLinecap="round" />
              <line x1="20.5" y1="17.5" x2="26.5" y2="17.5" stroke="#00F5D4" strokeWidth="2" strokeLinecap="round" />
            </>
          ) : (
            <>
              <circle cx="12.5" cy="17.5" r="3.1" className="fill-slate-800" />
              <circle ref={leftPupilRef} cx="12.5" cy="17.5" r="1.7" className="fill-[#00F5D4]" />
              <circle cx="23.5" cy="17.5" r="3.1" className="fill-slate-800" />
              <circle ref={rightPupilRef} cx="23.5" cy="17.5" r="1.7" className="fill-[#00F5D4]" />
              <line
                x1="15"
                y1="23.5"
                x2="21"
                y2="23.5"
                stroke="#8B5CF6"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </>
          )}
        </svg>
      </motion.div>

      {showLabel && (
        <span className="hidden xl:inline font-mono text-[11px] font-medium text-[#57534E] dark:text-slate-400 whitespace-nowrap">
          {mood === 'happy' ? 'AC!' : mood === 'surprised' ? 'Check Bug' : 'Ready'}
        </span>
      )}
    </div>
  );
}
