import { motion, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';

interface SpringRevealProps {
  children: ReactNode;
  index?: number;
  staggerSeconds?: number;
  className?: string;
  id?: string;
}

export const SCROLL_PUSH_SPRING = {
  type: 'spring' as const,
  stiffness: 340,
  damping: 22,
  mass: 0.8,
};

export const TACTILE_CARD_SPRING = {
  whileHover: { y: -5, scale: 1.018 },
  whileTap: { scale: 0.975 },
  transition: { type: 'spring' as const, stiffness: 380, damping: 24 },
};

/**
 * Reusable scroll-push spring reveal container powered by Motion whileInView.
 * Physically settles upward as sections and cards enter the viewport.
 */
export function SpringReveal({
  children,
  index = 0,
  staggerSeconds = 0.045,
  className = '',
  id,
}: SpringRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const delay = prefersReducedMotion ? 0 : Math.max(0, index) * staggerSeconds;

  return (
    <motion.div
      id={id}
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 48, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={
        prefersReducedMotion
          ? { duration: 0.15 }
          : {
              ...SCROLL_PUSH_SPRING,
              delay,
            }
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}
