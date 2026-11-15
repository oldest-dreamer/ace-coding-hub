import { motion, useReducedMotion } from 'motion/react';
import { useRef, type CSSProperties, type ReactNode } from 'react';

interface SpotlightTiltCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  ariaPressed?: boolean;
  tiltStrength?: number;
  spotlightRgba?: string;
  style?: CSSProperties;
}

/**
 * Tactile cursor-tracking spotlight & 3D tilt button card with Motion spring hover/tap physics.
 * Separates outer Motion spring transform (y/scale) from inner 3D perspective tilt so transforms never clash.
 */
export function SpotlightTiltCard({
  children,
  className = '',
  onClick,
  ariaPressed,
  tiltStrength = 5.5,
  spotlightRgba = 'rgba(16, 185, 129, 0.18)',
  style,
}: SpotlightTiltCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const tiltRef = useRef<HTMLSpanElement>(null);
  const glowRef = useRef<HTMLSpanElement>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLButtonElement>) {
    if (prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = x / rect.width - 0.5;
    const py = y / rect.height - 0.5;

    const rotY = (px * tiltStrength).toFixed(2);
    const rotX = (-py * tiltStrength).toFixed(2);

    if (tiltRef.current) {
      tiltRef.current.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    }
    if (glowRef.current) {
      glowRef.current.style.opacity = '1';
      glowRef.current.style.background = `radial-gradient(240px circle at ${x}px ${y}px, ${spotlightRgba}, rgba(6, 182, 212, 0.08) 48%, transparent 75%)`;
    }
  }

  function handleMouseLeave() {
    if (tiltRef.current) {
      tiltRef.current.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
    }
    if (glowRef.current) {
      glowRef.current.style.opacity = '0';
    }
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-pressed={ariaPressed}
      whileHover={prefersReducedMotion ? undefined : { y: -5, scale: 1.018 }}
      whileTap={prefersReducedMotion ? undefined : { scale: 0.975 }}
      transition={{ type: 'spring', stiffness: 380, damping: 24 }}
      style={style}
      className={`group relative overflow-hidden ${className}`}
    >
      {/* Top-edge specular highlight */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/35 to-transparent dark:via-emerald-400/25"
      />
      {/* Cursor spotlight */}
      <span
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200"
      />
      <span
        ref={tiltRef}
        style={{ transition: 'transform 180ms cubic-bezier(0.16, 1, 0.3, 1)' }}
        className="relative z-10 flex w-full items-center gap-3"
      >
        {children}
      </span>
    </motion.button>
  );
}
