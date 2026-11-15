# AGENTS.md — ArgonCode Academy Engineering Guardrails

Welcome to **ArgonCode Academy**. Every automated agent and contributor editing this repository MUST strictly follow these structural rules across all future turns:

## 1. Zero Deletion & No-Truncation Rule
- **NEVER** delete, overwrite with stubs, shorten, or simplify completed lesson files (`src/data/lessons_*.ts` or `src/data/deepChapter*.ts`) or existing Contest/Interview problem files (`src/data/cpProblemsBatch*.ts`, `src/data/interviewProblemsBatch*.ts`, `src/data/problems.ts`).
- When expanding a new phase (e.g., Phase 2 Chapters 6–10, Phase 3 Chapters 11–15, Phase 4 Chapters 16–20, Phase 5 Chapters 21–25), **APPEND / MERGE** new chapter entries (`6..10`, `11..15`, etc.) into the existing per-language `src/data/lessons_<lang>.ts` file (or a modular phase extension imported by it) — NEVER drop Chapters 1–5!

## 2. Modular Per-Language Lesson Architecture
Keep each language's deep atomic lessons strictly separated in its own file so no single file hits output or context limits:
- `src/data/lessons_c.ts` — C (C23 standard)
- `src/data/lessons_cpp.ts` — C++ (C++23 standard)
- `src/data/lessons_python.ts` — Python (Python 3.13+ standard)
- `src/data/lessons_java.ts` — Java (Java 21+ LTS standard)
- `src/data/lessons_js.ts` — JavaScript (ES2025 standard)
- `src/data/lessons_ts.ts` — TypeScript (TS 5.x strict mode)
- `src/data/lessons_rust.ts` — Rust (Rust 2024 edition)
- `src/data/lessons_html.ts` — HTML5 + Modern CSS3 / Accessibility

## 3. Exact 25-Chapter Atomic Syllabus (5 Phases × 5 Chapters = 200 Chapters)
- **Phase 1 (Ch 1–5):** Foundations, I/O, Types/RAM/Overflow, Operators, Bitwise Tricks
- **Phase 2 (Ch 6–10):** Branching, Loops, Nested Loops/Patterns, Functions/Scope, Big-O ($10^8$ Rule)
- **Phase 3 (Ch 11–15):** 1D Arrays/Freq, Two-Pointer/Sliding Window, Prefix Sums/Diff Arrays, Strings, Recursion/Call Stack
- **Phase 4 (Ch 16–20):** Pointers/Ownership/DOM, Heap vs Stack/Smart Pointers, Structs/Classes, Inheritance/Traits/Interfaces, Generics & STL/Collections
- **Phase 5 (Ch 21–25):** Sorting/Binary Search on Answer, Hashing/Maps/Sets/Sliding Window, Stacks/Queues/Trees/BFS/DFS, File I/O/Async/Concurrency, Full-Stack Website Blueprint Capstone

## 4. Mandatory Deep Atomic Lesson Contract (CodeWithHarry + Apna College + Bangla)
Every populated chapter in `lessons_<lang>.ts` MUST include:
1. `zeroIntuition`: Plain-English story + ASCII flowchart + step-by-step pseudocode + `banglaZeroToHero` (everyday Bangladeshi analogy + key takeaways in natural `🇧🇩 বাংলা`).
2. `topics` (4 complete `ChapterSubTopic` entries, also mirrored into `codeExamples`):
   - **Example 1:** Zero-to-Hero Basic (with line-by-line anatomy)
   - **Example 2:** Interactive Input & Formatting
   - **Example 3:** Real-World Practical Mini-Program
   - **Example 4:** Common Bug Trap vs. Codeforces/CodeChef CP Pattern
   - Every example MUST have exact runnable `code`, `stdin`, `expectedOutput`, and `lineByLine` rows so **"Load & Run in Editor"** executes deterministically.
3. `dryRunTable`: Minimum 4 visual RAM / stack trace steps compatible with `DryRunAnimator`.
4. `harryBugTraps`: Minimum 3 real broken-vs-fixed traps.
5. `practiceSheet`: Minimum 4 graded practice questions (`Easy` / `Medium` / `Hard`) with Bangla hints & runnable starter snippets.
6. `miniBuild`: Integrated chapter build + `testCases` for the live judge.

## 5. Verification Before Finishing Any Turn
Always run unit tests (`npx --yes tsx --test src/utils/*.test.ts`), `tsc --noEmit`, and `npm run build` after edits. Never push broken TypeScript or missing chapter IDs (`<lang>-ch-1` through `<lang>-ch-25`).
