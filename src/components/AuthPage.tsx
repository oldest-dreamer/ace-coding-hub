import {
  AlertCircle,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Code2,
  Loader2,
  Lock,
  Mail,
  ShieldCheck,
  Terminal,
  Trophy,
  User,
  X,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { isSupabaseConfigured } from '../lib/supabase';
import type { TargetGoal } from '../types/academy';

interface AuthPageProps {
  onSignInWithEmail: (
    email: string,
    password: string,
  ) => Promise<{ ok: true } | { ok: false; error: string }>;
  onSignUpWithEmail: (params: {
    email: string;
    password: string;
    username: string;
    targetGoal: TargetGoal;
  }) => Promise<{ ok: true; needsEmailConfirmation: boolean } | { ok: false; error: string }>;
  onContinueAsGuest: () => void;
  canCloseModal?: boolean;
  onClose?: () => void;
}

const TARGET_GOALS: TargetGoal[] = [
  'Competitive Programming',
  'FAANG & Tech Interviews',
  'Full-Stack Mastery',
  'University CS Foundations',
];

export function AuthPage({
  onSignInWithEmail,
  onSignUpWithEmail,
  onContinueAsGuest,
  canCloseModal = false,
  onClose,
}: AuthPageProps) {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [targetGoal, setTargetGoal] = useState<TargetGoal>('Competitive Programming');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [infoMsg, setInfoMsg] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg(null);
    setInfoMsg(null);

    const trimmedEmail = email.trim();
    if (!trimmedEmail || !trimmedEmail.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }

    if (mode === 'signup') {
      const cleanUser = username.trim();
      if (!cleanUser) {
        setErrorMsg('Please enter a learner handle / username.');
        return;
      }
      setSubmitting(true);
      const res = await onSignUpWithEmail({
        email: trimmedEmail,
        password,
        username: cleanUser,
        targetGoal,
      });
      setSubmitting(false);

      if (!res.ok) {
        setErrorMsg(res.error);
        return;
      }
      if (res.needsEmailConfirmation) {
        setInfoMsg(
          'Account created! Check your inbox to confirm your email, or continue exploring as a guest while confirmed.',
        );
      }
      return;
    }

    setSubmitting(true);
    const res = await onSignInWithEmail(trimmedEmail, password);
    setSubmitting(false);
    if (!res.ok) {
      setErrorMsg(res.error);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-[#07090D] text-[#F1F5F9]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-gate-heading"
    >
      {/* Ambient Obsidian Glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 68% 50% at 18% 8%, rgba(200, 238, 114, 0.085), transparent 62%), radial-gradient(ellipse 62% 48% at 84% 18%, rgba(16, 185, 129, 0.11), transparent 65%), radial-gradient(ellipse 55% 45% at 50% 100%, rgba(6, 182, 212, 0.07), transparent 70%)',
        }}
      />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-4 py-8 sm:px-6 lg:px-8">
        {/* Minimal Header Row */}
        <div className="mb-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#C8EE72] text-[#07090D] shadow-[0_0_24px_-6px_rgba(200,238,114,0.6)]">
              <Terminal className="h-4 w-4" aria-hidden="true" />
            </span>
            <span className="font-display text-lg font-bold tracking-tight text-white">
              Ace Coding Hub
            </span>
          </div>

          {canCloseModal && onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Return to Academy Workspace"
              className="flex items-center gap-1.5 rounded-lg border border-white/[0.12] bg-[#0E131D]/90 px-3 py-1.5 text-xs font-semibold text-slate-300 transition-colors hover:border-white/25 hover:text-white whitespace-nowrap"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Close</span>
            </button>
          )}
        </div>

        {/* 2-Column Editorial Kinetic Auth Grid */}
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
          {/* Left: Editorial Value Manifesto */}
          <motion.section
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#0E131D]/75 p-7 backdrop-blur-xl lg:col-span-6 lg:p-9"
          >
            <div>
              <div className="text-xs font-semibold tracking-wide text-[#C8EE72]">
                8 Languages · 200 Deep Chapters · 700+ Judge Problems
              </div>

              <h1
                id="auth-gate-heading"
                className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl [text-wrap:balance]"
              >
                Master Algorithms &amp; Systems From Zero to Production.
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-300">
                Sign in to synchronize your XP streaks, solved CP Arena verdicts, saved code buffers across
                all 8 languages, and study progress seamlessly across devices—or dive straight in as a guest.
              </p>

              <p className="bangla-text mt-3 text-sm text-emerald-300/90">
                সহজ বাংলা ও ইংরেজি ইনটুইশন, ভিজ্যুয়াল মেমোরি ড্রাই-রান এবং রিয়েল-টাইম ক্লাউড প্রগ্রেস সিঙ্ক।
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 border-t border-white/[0.08] pt-6 sm:grid-cols-3">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#C8EE72]">
                  <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>200 Chapters</span>
                </div>
                <div className="mt-1 font-mono text-xs tabular-nums text-slate-400">
                  C, C++, Py, Java, JS, TS, Rust, HTML
                </div>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#C8EE72]">
                  <Trophy className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>700+ Arena Tasks</span>
                </div>
                <div className="mt-1 font-mono text-xs tabular-nums text-slate-400">
                  CF, CodeChef, LeetCode, AtCoder &amp; Jobs
                </div>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#C8EE72]">
                  <Code2 className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Live Code Sync</span>
                </div>
                <div className="mt-1 font-mono text-xs tabular-nums text-slate-400">
                  Auto-saves snippets per problem &amp; device
                </div>
              </div>
            </div>
          </motion.section>

          {/* Right: Supabase Auth Form Card */}
          <motion.section
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-between rounded-2xl border border-white/[0.1] bg-[#0E131D]/92 p-7 shadow-[0_24px_64px_rgba(0,0,0,0.6)] backdrop-blur-xl lg:col-span-6 lg:p-9"
          >
            <div>
              {/* Mode Switcher */}
              <div
                role="tablist"
                aria-label="Authentication Mode"
                className="grid grid-cols-2 gap-1 rounded-xl border border-white/[0.08] bg-[#07090D] p-1"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={mode === 'signin'}
                  onClick={() => {
                    setMode('signin');
                    setErrorMsg(null);
                    setInfoMsg(null);
                  }}
                  className={`rounded-lg px-3 py-2 text-xs font-semibold transition-colors whitespace-nowrap ${
                    mode === 'signin'
                      ? 'bg-[#C8EE72] text-[#07090D] shadow-sm'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={mode === 'signup'}
                  onClick={() => {
                    setMode('signup');
                    setErrorMsg(null);
                    setInfoMsg(null);
                  }}
                  className={`rounded-lg px-3 py-2 text-xs font-semibold transition-colors whitespace-nowrap ${
                    mode === 'signup'
                      ? 'bg-[#C8EE72] text-[#07090D] shadow-sm'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Create Account
                </button>
              </div>

              <h2 className="mt-5 font-display text-xl font-bold text-white">
                {mode === 'signin'
                  ? 'Welcome back to Ace Coding Hub'
                  : 'Join Ace Coding Hub'}
              </h2>
              <p className="mt-1 text-xs text-slate-400">
                {mode === 'signin'
                  ? 'Guest progress on this browser merges automatically when you sign in.'
                  : 'Create an Ace Coding Hub account to sync your XP, solved ratings, and saved code.'}
              </p>

              {!isSupabaseConfigured && (
                <div
                  role="note"
                  className="mt-4 flex items-start gap-2 rounded-xl border border-amber-400/30 bg-amber-500/10 p-3 text-xs text-amber-200"
                >
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" aria-hidden="true" />
                  <span>
                    Cloud environment variables are not active right now. Use{' '}
                    <strong>Continue as Guest</strong> for full local workspace access.
                  </span>
                </div>
              )}

              {errorMsg && (
                <div
                  role="alert"
                  className="mt-4 flex items-start gap-2 rounded-xl border border-rose-500/40 bg-rose-950/60 p-3 text-xs font-medium text-rose-200"
                >
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" aria-hidden="true" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {infoMsg && (
                <div
                  role="status"
                  className="mt-4 flex items-start gap-2 rounded-xl border border-emerald-500/40 bg-emerald-950/50 p-3 text-xs font-medium text-emerald-200"
                >
                  <CheckCircle2
                    className="mt-0.5 h-4 w-4 shrink-0 text-[#C8EE72]"
                    aria-hidden="true"
                  />
                  <span>{infoMsg}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                {mode === 'signup' && (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="auth-username"
                        className="block text-xs font-semibold text-slate-200"
                      >
                        Learner Handle
                      </label>
                      <div className="relative mt-1.5">
                        <User
                          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                          aria-hidden="true"
                        />
                        <input
                          id="auth-username"
                          type="text"
                          required
                          maxLength={32}
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          placeholder="e.g. Tahmid_CP"
                          className="w-full rounded-xl border border-white/[0.12] bg-[#07090D] py-2.5 pl-9 pr-3 text-sm text-white placeholder:text-slate-500 focus:border-[#C8EE72] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="auth-target-goal"
                        className="block text-xs font-semibold text-slate-200"
                      >
                        Target Goal
                      </label>
                      <select
                        id="auth-target-goal"
                        value={targetGoal}
                        onChange={(e) => setTargetGoal(e.target.value as TargetGoal)}
                        className="mt-1.5 w-full rounded-xl border border-white/[0.12] bg-[#07090D] px-3 py-2.5 text-sm text-white focus:border-[#C8EE72] focus:outline-none"
                      >
                        {TARGET_GOALS.map((goal) => (
                          <option key={goal} value={goal}>
                            {goal}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                <div>
                  <label
                    htmlFor="auth-email"
                    className="block text-xs font-semibold text-slate-200"
                  >
                    Email Address
                  </label>
                  <div className="relative mt-1.5">
                    <Mail
                      className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                      aria-hidden="true"
                    />
                    <input
                      id="auth-email"
                      type="email"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@domain.com"
                      className="w-full rounded-xl border border-white/[0.12] bg-[#07090D] py-2.5 pl-9 pr-3 text-sm text-white placeholder:text-slate-500 focus:border-[#C8EE72] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="auth-password"
                    className="block text-xs font-semibold text-slate-200"
                  >
                    Password
                  </label>
                  <div className="relative mt-1.5">
                    <Lock
                      className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                      aria-hidden="true"
                    />
                    <input
                      id="auth-password"
                      type="password"
                      required
                      minLength={6}
                      autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Minimum 6 characters"
                      className="w-full rounded-xl border border-white/[0.12] bg-[#07090D] py-2.5 pl-9 pr-3 text-sm text-white placeholder:text-slate-500 focus:border-[#C8EE72] focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting || !isSupabaseConfigured}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#C8EE72] px-4 py-3 text-sm font-bold text-[#07090D] shadow-[0_0_28px_-8px_rgba(200,238,114,0.55)] transition-colors hover:bg-[#d6f58c] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                      <span>{mode === 'signin' ? 'Signing In...' : 'Creating Account...'}</span>
                    </>
                  ) : (
                    <>
                      <span>
                        {mode === 'signin' ? 'Sign In & Sync Progress' : 'Create Synced Account'}
                      </span>
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </>
                  )}
                </button>
              </form>

              <div className="my-5 flex items-center gap-3 text-xs text-slate-500">
                <span className="h-px flex-1 bg-white/[0.08]" aria-hidden="true" />
                <span>or</span>
                <span className="h-px flex-1 bg-white/[0.08]" aria-hidden="true" />
              </div>

              <button
                type="button"
                onClick={onContinueAsGuest}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#C8EE72]/35 bg-[#C8EE72]/[0.08] px-4 py-2.5 text-xs font-semibold text-[#C8EE72] transition-colors hover:bg-[#C8EE72]/[0.14] whitespace-nowrap"
              >
                <span>Continue as Guest</span>
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-6 border-t border-white/[0.08] pt-4 text-[11px] text-slate-400">
              Ace Coding Hub · Guest progress stays stored locally in your browser and merges automatically when you sign in.
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}
