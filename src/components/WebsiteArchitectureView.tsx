import { ArrowRight, Database, Globe, Layers, Server } from 'lucide-react';
import { useState } from 'react';
import type { LanguageId } from '../types/academy';
import { SpotlightTiltCard } from './SpotlightTiltCard';
import { SpringReveal } from './SpringReveal';

interface WebsiteArchitectureViewProps {
  onJumpToCapstone: (languageId: LanguageId) => void;
}

type ArchNodeId = 'html' | 'js_ts' | 'api' | 'systems' | 'db';

const ARCH_NODES: Record<
  ArchNodeId,
  {
    title: string;
    banglaTitle: string;
    languages: { label: string; langId?: LanguageId }[];
    role: string;
    banglaRole: string;
    payloadExample: string;
  }
> = {
  html: {
    title: '1. Semantic Browser Layer (DOM & Layout)',
    banglaTitle: '১. ব্রাউজার লেয়ার (HTML5 + CSS3)',
    languages: [{ label: 'HTML5 Capstone (Ch 25)', langId: 'html' }],
    role: 'Defines accessible landmarks (<header>, <main>, <form>), responsive grids, and initial document structure painted by the browser engine.',
    banglaRole: 'HTML ওয়েবসাইটের মূল কাঠামো তৈরি করে, আর CSS সেটিকে মোবাইল ও ডেস্কটপের জন্য সুন্দরভাবে সাজায়।',
    payloadExample: '<form id="submit-solution"><textarea name="code"></textarea><button type="submit">Run</button></form>',
  },
  js_ts: {
    title: '2. Interactive Client State & Type Safety',
    banglaTitle: '২. ক্লায়েন্ট-সাইড লজিক (JavaScript / TypeScript)',
    languages: [
      { label: 'JavaScript Ch 25', langId: 'javascript' },
      { label: 'TypeScript Ch 25', langId: 'typescript' },
    ],
    role: 'Captures DOM events, validates user input with strict TypeScript interfaces, updates UI optimistically, and sends asynchronous fetch() requests over HTTPS.',
    banglaRole: 'বাটনে ক্লিক করলে পেজ রিলোড না করেই ডেটা পরিবর্তন করা এবং ব্যাকএন্ড API-তে JSON রিকোয়েস্ট পাঠানো।',
    payloadExample: 'const res = await fetch("/api/judge", { method: "POST", body: JSON.stringify({ lang: "rust", code }) });',
  },
  api: {
    title: '3. Backend Application & Business API',
    banglaTitle: '৩. ব্যাকএন্ড API সার্ভার (Python / Java / Node)',
    languages: [
      { label: 'Python Ch 25', langId: 'python' },
      { label: 'Java Ch 25', langId: 'java' },
    ],
    role: 'Authenticates JWT/OAuth tokens, enforces rate limits & input sanitization, coordinates business workflows, and serializes structured JSON responses.',
    banglaRole: 'সার্ভারে ইউজারের পরিচয় যাচাই করে, নিরাপত্তা নিশ্চিত করে এবং ডেটাবেজের সাথে যোগাযোগ করে JSON উত্তর পাঠায়।',
    payloadExample: '{"user":"mina","level":2,"status":"OK","verdict":"AC"}',
  },
  systems: {
    title: '4. High-Throughput Compute & Sandbox Engines',
    banglaTitle: '৪. হাই-স্পিড সিস্টেম ও কম্পাইলার ইঞ্জিন (C / C++ / Rust)',
    languages: [
      { label: 'C Ch 25', langId: 'c' },
      { label: 'C++ Ch 25', langId: 'cpp' },
      { label: 'Rust Ch 25', langId: 'rust' },
    ],
    role: 'Runs latency-critical code sandboxes, search indexes, real-time game servers, and memory-safe worker pipelines at native hardware speed.',
    banglaRole: 'যেখানে মিলিসেকেন্ড স্পিড দরকার (যেমন কোড জাজ, ভিডিও প্রসেসিং বা সার্চ ইঞ্জিন), সেখানে C, C++ ও Rust কাজ করে।',
    payloadExample: 'tokio::spawn(async move { run_sandboxed_judge(&submission).await });',
  },
  db: {
    title: '5. Persistent Storage & Cache Layer',
    banglaTitle: '৫. ডেটাবেজ ও ক্যাশিং লেয়ার',
    languages: [],
    role: 'Indexed B-Tree tables store user profiles, XP, and submissions durably on disk while in-memory caches serve hot leaderboards in sub-millisecond time.',
    banglaRole: 'সকল ইউজারের প্রগ্রেস, XP এবং সমস্যা সমাধানের রেকর্ড স্থায়ীভাবে সংরক্ষণ করে রাখে।',
    payloadExample: 'SELECT username, xp, contest_rating FROM users ORDER BY xp DESC LIMIT 10;',
  },
};

export function WebsiteArchitectureView({ onJumpToCapstone }: WebsiteArchitectureViewProps) {
  const [selectedNode, setSelectedNode] = useState<ArchNodeId>('html');
  const [simStep, setSimStep] = useState<number>(0);

  const flowOrder: ArchNodeId[] = ['html', 'js_ts', 'api', 'systems', 'db'];
  const activeDetail = ARCH_NODES[selectedNode];

  function handleAdvanceSimulation() {
    const next = (simStep + 1) % flowOrder.length;
    setSimStep(next);
    setSelectedNode(flowOrder[next]);
  }

  return (
    <div className="relative z-10 mx-auto max-w-[1440px] px-4 py-6 sm:px-6 space-y-6">
      <SpringReveal index={0}>
        <div className="obsidian-glass-card flex flex-wrap items-center justify-between gap-4 rounded-2xl p-5">
          <div>
            <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              Department 5 · System Design &amp; Language Integration
            </div>
            <h1 className="mt-1 font-display text-xl font-bold text-[#1C1917] dark:text-white sm:text-2xl">
              Mega Capstone: Full-Stack Website Architecture Blueprint
            </h1>
            <p className="mt-1 text-sm text-[#57534E] dark:text-slate-400">
              See how HTML, JS/TS, Python, Java, C, C++, and Rust connect together to power a real production web application.
            </p>
          </div>

          <button
            type="button"
            onClick={handleAdvanceSimulation}
            className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-500 dark:bg-emerald-500 dark:text-slate-950 whitespace-nowrap"
          >
            <span>Step Request Flow ({simStep + 1}/5)</span>
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
      </SpringReveal>

      {/* Interactive 5-Stage Pipeline */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-5">
        {(
          [
            { id: 'html', label: 'HTML5 + CSS3', sub: 'Document & UI', icon: Globe },
            { id: 'js_ts', label: 'JS / TypeScript', sub: 'State & Fetch', icon: Layers },
            { id: 'api', label: 'Python / Java', sub: 'API & Auth', icon: Server },
            { id: 'systems', label: 'C / C++ / Rust', sub: 'Compute Engine', icon: Server },
            { id: 'db', label: 'SQL / Cache', sub: 'Persistence', icon: Database },
          ] as const
        ).map((node, idx) => {
          const Icon = node.icon;
          const active = selectedNode === node.id;
          return (
            <SpringReveal key={node.id} index={idx} staggerSeconds={0.045} className="h-full">
              <SpotlightTiltCard
                onClick={() => {
                  setSelectedNode(node.id);
                  setSimStep(idx);
                }}
                ariaPressed={active}
                tiltStrength={6}
                className={`h-full w-full rounded-xl border p-4 text-left backdrop-blur-xl ${
                  active
                    ? 'border-emerald-600/80 bg-[#FCF9F2]/95 shadow-[0_0_24px_-10px_rgba(16,185,129,0.45)] dark:border-emerald-400/75 dark:bg-[#0E131D]/95'
                    : 'border-[#E2D9C5] bg-[#FCF9F2]/80 hover:bg-[#FCF9F2] dark:border-white/[0.08] dark:bg-[#0E131D]/85 dark:hover:bg-[#141B29]/90'
                }`}
              >
                <div className="flex w-full flex-col items-start">
                  <div className="flex w-full items-center justify-between">
                    <Icon
                      className={`h-5 w-5 ${
                        active ? 'text-emerald-700 dark:text-emerald-400' : 'text-[#57534E] dark:text-slate-400'
                      }`}
                      aria-hidden="true"
                    />
                    <span className="font-mono text-xs font-bold tabular-nums text-[#57534E] dark:text-slate-400">
                      0{idx + 1}
                    </span>
                  </div>
                  <div className="mt-3 font-display text-sm font-bold text-[#1C1917] dark:text-white">
                    {node.label}
                  </div>
                  <div className="mt-0.5 text-xs text-[#57534E] dark:text-slate-400">{node.sub}</div>
                </div>
              </SpotlightTiltCard>
            </SpringReveal>
          );
        })}
      </div>

      {/* Selected Layer Inspector */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="obsidian-glass-card lg:col-span-7 rounded-2xl p-6 space-y-4">
          <h2 className="font-display text-lg font-bold text-[#1C1917] dark:text-white">
            {activeDetail.title}
          </h2>
          <p className="text-sm leading-relaxed text-[#57534E] dark:text-slate-300">
            {activeDetail.role}
          </p>

          <div className="bangla-text rounded-xl border border-emerald-600/30 bg-emerald-50/75 p-4 text-sm text-[#1C1917] dark:bg-emerald-950/25 dark:text-slate-200">
            <strong className="text-emerald-800 dark:text-emerald-300">🇧🇩 বাংলায় বুঝুন ({activeDetail.banglaTitle}): </strong>
            {activeDetail.banglaRole}
          </div>

          {activeDetail.languages.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="text-xs font-semibold text-[#57534E] dark:text-slate-400">
                Open Chapter 25 Capstone in Studio:
              </span>
              {activeDetail.languages.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => item.langId && onJumpToCapstone(item.langId)}
                  className="rounded-lg border border-amber-600/40 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-900 hover:bg-amber-100 dark:border-[#00F5D4]/40 dark:bg-[#00F5D4]/10 dark:text-[#00F5D4]"
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-5 rounded-2xl border border-[#E2D9C5] bg-slate-950/90 p-6 text-slate-100 backdrop-blur-xl dark:border-slate-800">
          <div className="text-xs font-mono font-bold text-[#00F5D4]">Wire Payload / Code Contract</div>
          <pre className="mt-3 overflow-x-auto font-mono text-xs leading-relaxed text-emerald-300 whitespace-pre-wrap">
            {activeDetail.payloadExample}
          </pre>
          <div className="mt-6 border-t border-slate-800 pt-4 text-xs text-slate-400 leading-relaxed">
            Every chapter from 1 to 25 feeds into this pipeline: Ch 1–10 give your foundations &amp; Big-O complexity, Ch 11–20 master recursion, pointers/ownership &amp; OOP/STL, and Ch 21–25 bring algorithms, concurrency, and end-to-end integration.
          </div>
        </div>
      </div>
    </div>
  );
}
