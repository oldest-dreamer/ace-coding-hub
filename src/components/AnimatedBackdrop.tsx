interface FloatingToken {
  label: string;
  leftPct: string;
  durationSec: string;
  delaySec: string;
  sizeClass: string;
}

const FLOATING_TOKENS: FloatingToken[] = [
  { label: '{ }', leftPct: '7%', durationSec: '24s', delaySec: '0s', sizeClass: 'text-sm' },
  { label: '0x1F', leftPct: '18%', durationSec: '29s', delaySec: '-7s', sizeClass: 'text-xs' },
  { label: 'O(log n)', leftPct: '31%', durationSec: '26s', delaySec: '-14s', sizeClass: 'text-xs' },
  { label: '=>', leftPct: '46%', durationSec: '22s', delaySec: '-4s', sizeClass: 'text-base' },
  { label: '::', leftPct: '62%', durationSec: '28s', delaySec: '-11s', sizeClass: 'text-sm' },
  { label: 'i64', leftPct: '74%', durationSec: '25s', delaySec: '-18s', sizeClass: 'text-xs' },
  { label: 'fn()', leftPct: '85%', durationSec: '27s', delaySec: '-9s', sizeClass: 'text-xs' },
  { label: '<T>', leftPct: '93%', durationSec: '23s', delaySec: '-16s', sizeClass: 'text-sm' },
];

export function AnimatedBackdrop() {
  return (
    <div
      aria-hidden="true"
      data-testid="animated-backdrop"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
    >
      {/* OBSIDIAN & ELECTRIC EMERALD MODE */}
      <div className="hidden dark:block absolute inset-0 neon-obsidian-backdrop">
        {/* Drifting 48px Isometric Perspective Cyber Grid */}
        <div className="absolute inset-0 neon-perspective-grid animate-grid-drift" />

        {/* Subtle Animated Emerald Scanline */}
        <div className="absolute inset-x-0 top-0 h-px neon-pulse-scanline" />

        {/* Slow-Moving Glowing Ambient Aurora Orbs (Emerald, Cyan, Violet) */}
        <div className="animate-orb-a absolute -top-24 left-[6%] h-[440px] w-[440px] rounded-full bg-emerald-500/12 blur-3xl" />
        <div className="animate-orb-b absolute top-[18%] right-[8%] h-[400px] w-[400px] rounded-full bg-cyan-500/08 blur-3xl" />
        <div className="animate-orb-a absolute -bottom-24 left-[42%] h-[440px] w-[440px] rounded-full bg-violet-600/08 blur-3xl" />

        {/* Gently Rising Subtle Code Tokens */}
        <div className="absolute inset-0 overflow-hidden">
          {FLOATING_TOKENS.map((tok) => (
            <span
              key={tok.label}
              className={`animate-token-rise absolute bottom-0 font-mono font-semibold text-emerald-300/20 ${tok.sizeClass}`}
              style={
                {
                  left: tok.leftPct,
                  '--rise-duration': tok.durationSec,
                  '--rise-delay': tok.delaySec,
                } as React.CSSProperties
              }
            >
              {tok.label}
            </span>
          ))}
        </div>
      </div>

      {/* DAYLIGHT PAPER MODE SYNCED WITH EMERALD */}
      <div className="block dark:hidden absolute inset-0 daylight-paper-backdrop">
        <div className="animate-orb-a absolute -top-20 left-[12%] h-[380px] w-[380px] rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="animate-orb-b absolute bottom-[-10%] right-[10%] h-[420px] w-[420px] rounded-full bg-amber-500/10 blur-3xl" />
      </div>
    </div>
  );
}
