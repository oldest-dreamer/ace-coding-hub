# ArgonCode Academy — Project State Tracker (`HANDOFF_STATE.md`)

## Architecture Overview
- **Stack:** React 19 + TypeScript + Tailwind CSS v4 + Lucide React (`0.546.0`)
- **Pedagogy Engine:** CodeWithHarry + Apna College Zero-to-Advance 6-Section Lesson Pipeline (Flowchart & Pseudocode, Bangla Zero-to-Hero, Line-by-Line Code Anatomy, RAM/Stack Dry Run Trace, Harry Bhai's 3 Bug & TLE Traps, 5 Graded Practice Questions with 1-Click IDE Loading, and Mini Hands-On Build)
- **Theme:** Dual Signature Theme Engine (`🌌 Neon Obsidian IDE` `#070B14` with perspective grid & electric cyan `#00F5D4` / violet `#8B5CF6` glassmorphism + `📜 Daylight Eye-Comfort Paper` `#F7F3E8` warm sepia with `#1C1917` ink & `#D97706` amber highlights via `@custom-variant dark`)
- **Persistence:** Dual-Mode Auth & Storage Engine (`LocalStorage` + `IndexedDB` + 1-Click Profile JSON Export/Import + Bulk Curriculum JSON Importer + Pre-wired Firebase/Supabase Sync Hooks)
- **Compiler:** Piston Execution API (`https://emkc.org/api/v2/piston/execute`) + Local JS/TS Sandbox + Split-Pane HTML/CSS/JS Live Preview + Smart Offline Simulation Fallback

## Completed Modules
- [x] `src/types/academy.ts` — Domain types for 8 languages, 200 chapters (5 Phases × 25 Chapters) with 6-section Zero-to-Advance pedagogy, 3-tier `brute`/`better`/`optimal` contest solutions, `companyTags`, `BulkCurriculumPayload`, judge verdicts, and profile sync.
- [x] Modular Phase 1 Atomic Lessons (`src/data/lessons_c.ts`, `lessons_cpp.ts`, `lessons_python.ts`, `lessons_java.ts`, `lessons_js.ts`, `lessons_ts.ts`, `lessons_rust.ts`, `lessons_html.ts`) — Deep CodeWithHarry + Apna College + Bangla zero-to-hero content for **Chapters 1–5** across all 8 languages (`C23`, `C++23`, `Python 3.13`, `Java 21`, `ES2025`, `TS 5.x`, `Rust 2024`, `HTML5/CSS3`), with 4 runnable sub-topics + anatomy + dry runs + 3 Harry Bhai bug traps + 4 graded drills + Milestone Merger 1.
- [x] `src/data/chapterTemplates.ts` & `src/data/syllabusSpecs25.ts` — Exact 25-chapter atomic syllabus across 5 Phases (`5 Chapters × 5 Phases × 8 Languages = 200 Chapters`) with Milestone Mergers 1–4 (Ch 5, 10, 15, 20) and Mega Capstone Ch 25, preserving legacy `deepChapter1..15.ts` files (`AGENTS.md` / `PROTECTIONS_NOTICES.md`).
- [x] `src/data/syllabusBlueprint.ts` — Complete 200-Chapter Curriculum Engine integrating modular Phase 1 `LESSONS_*` files, `CHAPTER_SPECS_25`, aligned deep modules, and `mergeCustomChapters`.
- [x] `src/data/problems.ts`, `src/data/cpProblemsBatch1.ts`, `src/data/cpProblemsBatch2.ts`, `src/data/interviewProblemsBatch1.ts`, `src/data/interviewProblemsBatch2.ts` — Contest & Interview Hub expanded to 36 problems: 18 CP Classics (including 15 Codeforces Div. 2 A/B/C 800–2200 & CodeChef 1–3 Star problems) + 18 Job Interview Top 150 problems (including 15 FAANG classics across Two Pointers, Sliding Window, Linked List Cycle/Reversal, Binary Tree BFS/DFS, Kadane's, Merge Intervals, Monotonic Stack, and DP) with Google/Amazon/Microsoft/Meta tags, 3-tier Brute → Better → Optimal progression tabs, 3 progressive hints, bilingual English + Bangla editorials & dry runs, and 7-language solutions.
- [x] `src/utils/gamification.ts`, `src/utils/dryRunParser.ts` & unit tests (`gamification.test.ts`, `chapterTopics.test.ts`, `dryRunParser.test.ts`, `storage.test.ts`, `judge.test.ts`) — XP, level curve, streak calculation, 25-chapter mastery rings, Elo contest rating delta, dry-run memory parser, global search, and structural + local sandbox execution assertions across all 200 chapters and 36 Contest & Interview Hub problems.
- [x] **Awwwards-Grade UI/UX & Motion Overhaul:**
  - `BootPreloader.tsx` — Fast minimalist `000` -> `100` preloader (`<= 0.85s`, skippable, `?autostart=1` & reduced-motion aware).
  - `ArgonBotMascot.tsx` — Interactive geometric SVG mascot in TopNavbar & CodeCompilerPane with cursor-tracking blinking eyes, celebratory star eyes on `AC`, and wide alert eyes on syntax/judge errors.
  - `SpotlightTiltCard.tsx` — GPU-accelerated 3D mouse-tilt + cursor-tracking radial spotlight border across Language Cards, Contest Problem Cards, and Architecture Nodes.
  - `DryRunAnimator.tsx` — Interactive `"Animate Dry Run"` visual memory & call-stack step player inside Section 3 & Textbook mode with synchronized RAM trace table highlighting.
  - `VictoryCelebrationModal.tsx` — `canvas-confetti` burst + spring RPG XP Earned / Level-Up popup with animated counter.
  - `TopNavbar.tsx`, `CheatSheetModal.tsx`, `CommandPaletteModal.tsx`, `ProfileSyncModal.tsx` (`AnimatePresence` spring transitions & `layoutId` glass pill tabs).
- [x] **Master Architecture & Motion Overhaul (5 Departments, AnimatedBackdrop & Multi-Example Reader):**
  - `AnimatedBackdrop.tsx` — Fixed `z-0` pointer-events-none background behind semi-transparent `backdrop-blur-xl` surfaces with drifting 48px isometric perspective cyber grid, pulse scanline, slow aurora orbs (`cyan-500/15`, `violet-600/15`), and rising code tokens (`{ }`, `0x1F`, `O(log n)`, `=>`, `::`) in Neon Obsidian mode, plus `#F6F1E3` paper + drifting warm amber gradients in Daylight Paper mode.
  - **5 Distinct Full-Screen Departments** with `AnimatePresence mode="wait"` scale-blur curtain transitions: `AcademyLobby.tsx` (8-language 3D showcase + 25-chapter 5-phase quest map), `ChapterStudio.tsx` (`62% / 38%` resizable/collapsible reader + sticky IDE), `CpArenaView.tsx` (rating bands `800-1000`..`1600+`, topic tags, virtual timed contest), `InterviewSheetView.tsx` (company filters, pattern grouping, dry-run visualizer), and `WebsiteArchitectureView.tsx`.
  - `chapterTopics.ts`, `MultiTopicSection.tsx`, `StudyDrillsAndTraps.tsx`, `TriModeStudyPanel.tsx` — Upgraded chapter schema (`ChapterSubTopic[]`) resolving 4–6 deep sub-topics per chapter across all 200 chapters with Top TOC jump-bar, per-section `🇧🇩 বাংলা + English` toggles, and `"▶ Load & Run in Editor"` auto-execution on every code block.

## Next Expansion Batches
1. **Batch A:** Wire live Firebase Auth ("Sign in with Google") and Firestore/Supabase real-time sync using the pre-built `CloudSyncAdapter` interface in `src/utils/storage.ts`.
2. **Batch B:** Add WebAssembly local C/Python/Rust execution (Pyodide / Wasmer) for zero-latency offline compilation alongside Piston.

