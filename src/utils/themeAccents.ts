import type { LanguageId } from '../types/academy';

export interface LanguageAccentStyle {
  ringHex: string;
  secondaryHex?: string;
  spotlightRgba: string;
  selectedBorderClass: string;
  hoverBorderClass: string;
  selectedShadowStyle: string;
  ringGlowFilter: string;
  badgeTextClass: string;
}

export const LANGUAGE_ACCENT_STYLES: Record<LanguageId, LanguageAccentStyle> = {
  c: {
    ringHex: '#06B6D4',
    spotlightRgba: 'rgba(6, 182, 212, 0.18)',
    selectedBorderClass: 'border-cyan-500/80 dark:border-cyan-400/75',
    hoverBorderClass: 'hover:border-cyan-500/50 dark:hover:border-cyan-400/45',
    selectedShadowStyle: '0 0 28px -8px rgba(6, 182, 212, 0.45)',
    ringGlowFilter: 'drop-shadow(0 0 6px rgba(6, 182, 212, 0.55))',
    badgeTextClass: 'text-cyan-700 dark:text-cyan-300',
  },
  cpp: {
    ringHex: '#6366F1',
    spotlightRgba: 'rgba(99, 102, 241, 0.18)',
    selectedBorderClass: 'border-indigo-500/80 dark:border-indigo-400/75',
    hoverBorderClass: 'hover:border-indigo-500/50 dark:hover:border-indigo-400/45',
    selectedShadowStyle: '0 0 28px -8px rgba(99, 102, 241, 0.45)',
    ringGlowFilter: 'drop-shadow(0 0 6px rgba(99, 102, 241, 0.55))',
    badgeTextClass: 'text-indigo-700 dark:text-indigo-300',
  },
  python: {
    ringHex: '#10B981',
    secondaryHex: '#F59E0B',
    spotlightRgba: 'rgba(16, 185, 129, 0.18)',
    selectedBorderClass: 'border-emerald-600/85 dark:border-emerald-400/75',
    hoverBorderClass: 'hover:border-emerald-500/50 dark:hover:border-amber-400/45',
    selectedShadowStyle: '0 0 28px -8px rgba(16, 185, 129, 0.45)',
    ringGlowFilter: 'drop-shadow(0 0 6px rgba(16, 185, 129, 0.55))',
    badgeTextClass: 'text-emerald-700 dark:text-emerald-300',
  },
  java: {
    ringHex: '#F97316',
    spotlightRgba: 'rgba(249, 115, 22, 0.18)',
    selectedBorderClass: 'border-orange-500/80 dark:border-orange-400/75',
    hoverBorderClass: 'hover:border-orange-500/50 dark:hover:border-orange-400/45',
    selectedShadowStyle: '0 0 28px -8px rgba(249, 115, 22, 0.42)',
    ringGlowFilter: 'drop-shadow(0 0 6px rgba(249, 115, 22, 0.55))',
    badgeTextClass: 'text-orange-700 dark:text-orange-300',
  },
  javascript: {
    ringHex: '#EAB308',
    spotlightRgba: 'rgba(234, 179, 8, 0.18)',
    selectedBorderClass: 'border-yellow-500/85 dark:border-yellow-400/75',
    hoverBorderClass: 'hover:border-yellow-500/50 dark:hover:border-yellow-400/45',
    selectedShadowStyle: '0 0 28px -8px rgba(234, 179, 8, 0.42)',
    ringGlowFilter: 'drop-shadow(0 0 6px rgba(234, 179, 8, 0.55))',
    badgeTextClass: 'text-amber-700 dark:text-yellow-300',
  },
  rust: {
    ringHex: '#FB7185',
    secondaryHex: '#F97316',
    spotlightRgba: 'rgba(251, 113, 133, 0.18)',
    selectedBorderClass: 'border-rose-500/80 dark:border-[#FB7185]/75',
    hoverBorderClass: 'hover:border-rose-500/50 dark:hover:border-[#FB7185]/45',
    selectedShadowStyle: '0 0 28px -8px rgba(251, 113, 133, 0.45)',
    ringGlowFilter: 'drop-shadow(0 0 6px rgba(251, 113, 133, 0.55))',
    badgeTextClass: 'text-rose-700 dark:text-rose-300',
  },
  typescript: {
    ringHex: '#3B82F6',
    spotlightRgba: 'rgba(59, 130, 246, 0.18)',
    selectedBorderClass: 'border-blue-500/80 dark:border-blue-400/75',
    hoverBorderClass: 'hover:border-blue-500/50 dark:hover:border-blue-400/45',
    selectedShadowStyle: '0 0 28px -8px rgba(59, 130, 246, 0.45)',
    ringGlowFilter: 'drop-shadow(0 0 6px rgba(59, 130, 246, 0.55))',
    badgeTextClass: 'text-blue-700 dark:text-blue-300',
  },
  html: {
    ringHex: '#F43F5E',
    spotlightRgba: 'rgba(244, 63, 94, 0.18)',
    selectedBorderClass: 'border-rose-500/80 dark:border-rose-400/75',
    hoverBorderClass: 'hover:border-rose-500/50 dark:hover:border-rose-400/45',
    selectedShadowStyle: '0 0 28px -8px rgba(244, 63, 94, 0.45)',
    ringGlowFilter: 'drop-shadow(0 0 6px rgba(244, 63, 94, 0.55))',
    badgeTextClass: 'text-rose-700 dark:text-rose-300',
  },
};
