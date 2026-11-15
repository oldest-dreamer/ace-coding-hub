# PROTECTIONS_NOTICES.md — Protected Curriculum & Engine Assets

This file documents mission-critical data and UI components in **ArgonCode Academy** that MUST NOT be deleted, overwritten with placeholders, or degraded in any refactor.

## Protected Modules (DO NOT DELETE OR STUB)
1. **Per-Language Phase 1–5 Lesson Files (`src/data/lessons_*.ts`)**
   - `src/data/lessons_c.ts`
   - `src/data/lessons_cpp.ts`
   - `src/data/lessons_python.ts`
   - `src/data/lessons_java.ts`
   - `src/data/lessons_js.ts`
   - `src/data/lessons_ts.ts`
   - `src/data/lessons_rust.ts`
   - `src/data/lessons_html.ts`
   - Preserve all 4 runnable examples (`topics` + `codeExamples`), English + `🇧🇩 বাংলা` deep explanations, ASCII flowcharts, RAM dry runs, bug traps, and graded practice sheets in every chapter.

2. **Competitive Programming & FAANG Interview Hubs (36 Complete Problems)**
   - `src/data/problems.ts`
   - `src/data/cpProblemsBatch1.ts`
   - `src/data/cpProblemsBatch2.ts`
   - `src/data/interviewProblemsBatch1.ts`
   - `src/data/interviewProblemsBatch2.ts`
   - Every problem retains its 3-tier Brute → Better → Optimal ladder, 3 progressive hints, Bangla editorial, 7-language starter templates & full working solutions, and hidden judge test cases.

3. **Core Execution, Backdrop & Department Engine**
   - `src/utils/judge.ts` (Piston API runner, local JS sandbox, HTML preview, verdict evaluator)
   - `src/utils/storage.ts` (LocalStorage + IndexedDB persistence + profile/curriculum JSON import/export)
   - `src/components/AnimatedBackdrop.tsx` (Neon Obsidian Cyber Grid + Aurora + Floating Code Tokens & Daylight Paper Mode)
   - `src/components/DryRunAnimator.tsx` (Visual RAM variable slots & stack-frame trace player)
   - `src/App.tsx` (5-Department `AnimatePresence` transitions & state coordinator)

4. **Legacy Deep Chapters Archive (`src/data/deepChapter1.ts` – `deepChapter15.ts`)**
   - Retained safely for reference and fallback hydration; do not delete without explicit user authorization.

## Rules for Future Expansions
- Adding Chapters 6–10, 11–15, 16–20, or 21–25 MUST add new entries to `lessons_<lang>.ts` (or phase sub-modules imported by `lessons_<lang>.ts`) while keeping Chapters 1–5 completely untouched.
- Never replace interactive UI features, Bangla callouts, or runnable code with `// TODO` or abbreviated summaries.
