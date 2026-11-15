import type { LanguageId } from '../types/academy';

export interface TopicTemplate {
  number: number;
  phase: 1 | 2 | 3 | 4 | 5;
  isMilestoneMerger?: boolean;
  isCapstone?: boolean;
  topicName: string;
  banglaTopic: string;
  xpReward: number;
  estimatedMinutes: number;
  subtitle: string;
  coreBullets: string[];
  ramCpuCore: string;
  deepParagraphs: string[];
  realWorldAnalogy: string;
  proTips: string[];
  banglaSummary: string;
  banglaIntuition: string[];
  banglaAnalogy: string;
}

export const CHAPTER_TOPICS: TopicTemplate[] = [
  // Phase 1: Absolute Zero Foundations (Ch 1-5)
  {
    number: 1,
    phase: 1,
    topicName: 'Compiler/Interpreter Under the Hood & First Program Anatomy',
    banglaTopic: 'কম্পাইলার/ইন্টারপ্রেটার পাইপলাইন ও প্রথম প্রোগ্রামের গঠন',
    xpReward: 60,
    estimatedMinutes: 15,
    subtitle: 'How source text turns into CPU opcodes, JVM bytecode, V8 JIT, or a live DOM tree.',
    coreBullets: [
      'Ahead-of-time compilers (C, C++, Rust) emit native machine binaries; Python/Java use bytecode VMs; JS runs via V8 JIT; HTML builds the browser DOM tree.',
      'Execution begins at a well-defined entry point (main(), top-level module, or <!doctype html>) and returns a clean exit status.',
      'Understanding compilation vs interpretation reveals why syntax errors happen before runtime.',
    ],
    ramCpuCore:
      'OS loaders map binaries into virtual memory, initialize stack pointers (RSP/ESP), and connect file descriptors 0 (stdin), 1 (stdout), and 2 (stderr).',
    deepParagraphs: [
      'Every program translates human syntax into executable instructions or structured render trees. Knowing how your language executes prevents mystery linker, classpath, and runtime errors.',
      'Even your minimal Hello World allocates stack frames and writes bytes to stdout file descriptor 1.',
    ],
    realWorldAnalogy:
      'Think of a compiler as translating an entire recipe book before entering the kitchen, while an interpreter translates one sentence at a time while cooking.',
    proTips: [
      'Always read the very first compiler error line before fixing cascading errors below it.',
      'Verify your entry point signature and exit code 0 cleanly.',
    ],
    banglaSummary:
      'সোর্স কোড কীভাবে কম্পাইলার বা ইন্টারপ্রেটারের ভেতর দিয়ে CPU-র ভাষায় বা ব্রাউজার DOM-এ রূপান্তরিত হয়, সেটাই প্রথম অধ্যায়ের মূল ভিত্তি।',
    banglaIntuition: [
      'কম্পাইলার (C/C++/Rust) পুরো কোড আগে অনুবাদ করে দ্রুততম মেশিন কোড বানায়।',
      'ইন্টারপ্রেটার/JIT (Python/JS) কোড চালানোর সাথে সাথেই অনুবাদ করে।',
    ],
    banglaAnalogy:
      'বিদেশি বই একসাথে অনুবাদ করে ছাপানো হলো কম্পাইলার, আর দোভাষীর মতো সাথে সাথে পড়ে অনুবাদ করা হলো ইন্টারপ্রেটার।',
  },
  {
    number: 2,
    phase: 1,
    topicName: 'Standard Input/Output, Formatting & Escape Sequences',
    banglaTopic: 'স্ট্যান্ডার্ড ইনপুট/আউটপুট, ফরম্যাটিং ও এস্কেপ সিকোয়েন্স',
    xpReward: 65,
    estimatedMinutes: 16,
    subtitle: 'Buffered stdin/stdout streams, fixed decimal formatting, table alignment, and escape safety.',
    coreBullets: [
      'Unbuffered line-by-line flushing inside loops triggers syscalls that cause TLE on 10^5 outputs.',
      'Use escape sequences (\\n, \\t, \\\\, \\") or HTML entities (&lt;, &gt;, &amp;) to safely emit special characters.',
      'Fixed-precision decimal formatters (%.2f, {:.2f}, .toFixed(2)) keep output deterministic.',
    ],
    ramCpuCore:
      'Kernel buffers batch bytes across stdin/stdout pipes so user-space programs avoid costly OS context switches per character.',
    deepParagraphs: [
      'I/O latency frequently dwarfs algorithm time in Codeforces and HackerRank. Enabling fast I/O (sync_with_stdio(false), sys.stdin.read, BufferedReader, BufWriter) keeps runtime crisp.',
      'Exact whitespace, decimal rounding, and newline termination decide AC vs Presentation/Wrong Answer.',
    ],
    realWorldAnalogy:
      'Buffered I/O is carrying all groceries inside one crate instead of making 200 separate trips to the truck for each apple.',
    proTips: [
      'Never use endl or unbatched println inside tight 10^5 loops.',
      'Flush stdout only when strictly interacting with an interactive judge.',
    ],
    banglaSummary:
      'stdin দিয়ে ডেটা গ্রহণ ও stdout দিয়ে নির্ভুল ফরম্যাটে আউটপুট পাঠানো এবং বাফারিংয়ের মাধ্যমে ১০ গুণ দ্রুত I/O শেখানো হয়েছে।',
    banglaIntuition: [
      'লুপের ভেতর বারবার ফ্লাশ করলে প্রোগ্রাম ধীর হয়—একসাথে আউটপুট জমিয়ে বা "\\n" দিয়ে প্রিন্ট করো।',
      'দশমিকের ঘর নির্দিষ্ট রাখতে %.2f বা .toFixed(2) ব্যবহার করো।',
    ],
    banglaAnalogy:
      'এক গ্লাস করে পানি আনার বদলে পুরো জগ ভরে এনে টেবিলে রাখাই হলো বাফারড I/O।',
  },
  {
    number: 3,
    phase: 1,
    topicName: 'Variables, Data Types, RAM Sizes & Integer Overflow (int vs long long)',
    banglaTopic: 'ভ্যারিয়েবল, ডেটা টাইপ, RAM সাইজ ও ইন্টিজার ওভারফ্লো (int বনাম long long)',
    xpReward: 70,
    estimatedMinutes: 18,
    subtitle: 'Fixed bit-widths in RAM, signed vs unsigned overflow traps, 53-bit float caps, and 64-bit promotion.',
    coreBullets: [
      '32-bit signed integers cap near 2.14×10^9; multiplying two 10^5 values overflows unless promoted to 64-bit before multiplying.',
      'IEEE-754 floats lose precision past 2^53 - 1 (9×10^15) in JS/TS and cannot represent 0.1 + 0.2 cleanly.',
      'Prefer 64-bit integers (long long / i64 / long / BigInt) whenever constraints exceed 10^4.',
    ],
    ramCpuCore:
      'Stack frames align primitive variables on 4-byte or 8-byte boundaries inside CPU registers and L1 cache lines.',
    deepParagraphs: [
      'Integer overflow is one of the top causes of Wrong Answer in programming contests: two innocent 32-bit values multiply to exceed 2.14 billion before ever being assigned to a 64-bit variable.',
      'Understanding exact byte footprints lets you estimate RAM usage for million-element arrays accurately.',
    ],
    realWorldAnalogy:
      'Trying to pour 5 liters into a 2-liter pitcher spills over; 32-bit int overflows silently when results pass 2.14 billion.',
    proTips: [
      'Write 1LL * a * b in C/C++, (long) a * b in Java, and BigInt in JS/TS when inputs reach 10^5+.',
      'Store money in integer cents/poisha rather than floats.',
    ],
    banglaSummary:
      'ভ্যারিয়েবল RAM-এ কত বাইট জায়গা নেয়, ৩২-বিট বনাম ৬৪-বিট সীমা কোথায়, এবং কেন ১০^৯ গুণফলে ওভারফ্লো ঘটে তা ব্যাখ্যা করা হয়েছে।',
    banglaIntuition: [
      '৩২-বিট int সর্বোচ্চ ২×১০^৯ রাখে; এর বেশি হলে ৬৪-বিট (long long / i64 / BigInt) নিতে হবে।',
      'গুণ করার আগেই ৬৪-বিটে কাস্ট করো, নইলে গুণফল আগেই নষ্ট হয়ে যাবে!',
    ],
    banglaAnalogy:
      'ছোট টিফিন বক্সে বেশি খাবার ঢোকালে যেমন ঢাকনা ভেঙে পড়ে, ৩২-বিট ইন্টিজারে বড় সংখ্যা রাখলে মান উল্টে যায়।',
  },
  {
    number: 4,
    phase: 1,
    topicName: 'Arithmetic, Relational, Logical & Assignment Operators',
    banglaTopic: 'অ্যারিথমেটিক, রিলেশনাল, লজিক্যাল ও অ্যাসাইনমেন্ট অপারেটর',
    xpReward: 70,
    estimatedMinutes: 18,
    subtitle: 'Integer vs float division, short-circuit evaluation, operator precedence, ceil formulas, and positive modulo.',
    coreBullets: [
      'In C/C++/Java/Rust, integer / truncates toward zero while negative % keeps the dividend sign—normalize with ((a % m) + m) % m.',
      'Short-circuit && and || guarantee left-to-right guard safety before dereferencing null or indexing bounds.',
      'Exact positive integer ceiling is (a + b - 1) / b—immune to double rounding drift.',
    ],
    ramCpuCore:
      'ALU executes arithmetic & comparison flags (ZF/CF/SF) directly in registers; short-circuit jumps skip unnecessary loads.',
    deepParagraphs: [
      'Misunderstanding precedence (= vs ==, bitwise & vs ==) or negative modulo remainder breaks cyclic buffers and modular arithmetic.',
      'Guard clauses placed on the left of && eliminate division-by-zero and null-reference crashes in one readable line.',
    ],
    realWorldAnalogy:
      'Short-circuit && is checking if the bridge exists before driving onto it—if the left check fails, you stop immediately.',
    proTips: [
      'Normalize cyclic modulo with ((a % m) + m) % m or Python’s native % / Rust’s rem_euclid.',
      'Never rely on double Math.ceil for 10^16+ integers.',
    ],
    banglaSummary:
      'ভাগফল বনাম ভাগশেষ, নেগেটিভ মডুলো ঠিক করার নিয়ম, শর্ট-সার্কিট লজিক এবং নির্ভুল সিলিং ডিভিশন ফর্মুলা শেখা।',
    banglaIntuition: [
      '((a % m) + m) % m দিয়ে নেগেটিভ ভাগশেষকেও সব সময় ধনাত্মক রাখা যায়।',
      '(a + b - 1) / b ফর্মুলা double ছাড়াই শতভাগ সঠিক সিলিং ভাগফল দেয়।',
    ],
    banglaAnalogy:
      '১২ ঘণ্টার ঘড়িতে ১ ঘণ্টা পেছনে গেলে -১ না হয়ে ১১টা বাজে—পজিটিভ মডুলো ঠিক তাই করে।',
  },
  {
    number: 5,
    phase: 1,
    isMilestoneMerger: true,
    topicName: 'Bitwise Operators & Binary Tricks (Essential for CP)',
    banglaTopic: 'বিটওয়াইজ অপারেটর ও বাইনারি ট্রিকস (মার্জার প্রজেক্ট ১)',
    xpReward: 110,
    estimatedMinutes: 25,
    subtitle: 'Single-cycle &, |, ^, ~, <<, >>, power-of-two n&(n-1), 64-bit masks (1ULL<<k), and Phase 1 Milestone Merger.',
    coreBullets: [
      'Check parity with (n & 1), toggle with ^, and test power-of-two in O(1) via n > 0 && (n & (n - 1)) == 0.',
      'Always promote the literal (1ULL << k, 1L << k, 1_u64 << k, 1n << k) before shifting k >= 31 to avoid UB or mod-32 wrapping.',
      'Milestone Merger 1: Combine Ch 1–5 to build a fast O(n) time, O(1) space XOR Odd-One-Out analyzer.',
    ],
    ramCpuCore:
      'Bitwise gates operate across all 64 bits in parallel inside a single CPU clock cycle with hardware POPCNT/CTZ support.',
    deepParagraphs: [
      'Bitmasks compress boolean subsets into a single integer register, enabling subset DP and compact Unix/RBAC permission flags.',
      'Because x ^ x == 0 and x ^ 0 == x, XOR sweeps cancel duplicate pairs immediately without hash maps or sorting.',
    ],
    realWorldAnalogy:
      'Think of a 64-bit integer as a compact panel of 64 tiny LED switches—bitwise ops flip or test any switch instantly.',
    proTips: [
      'Wrap bitwise checks in parentheses: (x & 1) == 0 because == binds tighter than &.',
      'Use 1ULL << k in C/C++, 1L << k in Java, and 1n << k in JS/TS.',
    ],
    banglaSummary:
      'কম্পিউটারের আসল বাইনারি বিট নিয়ে এক ক্লক-সাইকেলে কাজ করা এবং Ch 1–5 মিলিয়ে প্রথম মাইলস্টোন মার্জার তৈরি।',
    banglaIntuition: [
      'n & (n - 1) == 0 দিয়ে ১ ধাপে ২-এর ঘাত কি না বের করা যায়।',
      'XOR দিয়ে O(1) মেমোরিতে জোড়াহীন সংখ্যা খুঁজে পাওয়া যায়।',
    ],
    banglaAnalogy:
      'একটি বোর্ডে ৬৪টি ছোট সুইচ থাকলে প্রতিটি সুইচ একেকটি বিট—বিটমাস্ক দিয়ে একসাথে সব সুইচ নিয়ন্ত্রণ করা যায়।',
  },

  // Phase 2: Control Flow, Loops & Complexity (Ch 6-10)
  {
    number: 6,
    phase: 2,
    topicName: 'Conditional Branching (if / else if / else, switch, Ternary)',
    banglaTopic: 'কন্ডিশনাল ব্রাঞ্চিং (if / else if / else, switch, টার্নারি)',
    xpReward: 75,
    estimatedMinutes: 18,
    subtitle: 'Decision trees, guard clauses, switch fall-through traps vs match arms, and CPU branch prediction.',
    coreBullets: [
      'Flatten deeply nested if-pyramids using early-return guard clauses.',
      'Watch out for missing break statements in C/C++/Java switch vs exhaustive match in Rust/Python.',
      'Sort branches or use branchless conditional moves for hot inner loops.',
    ],
    ramCpuCore:
      'Conditionals compile to CMP + conditional jump instructions; modern CPUs speculate branch direction using history tables.',
    deepParagraphs: [
      'Clear branching separates boundary checks cleanly at the top of a routine so core business logic stays shallow and readable.',
      'Every language offers multi-way dispatch: classic switch, Java 21 switch expressions, Python match/case, and Rust exhaustive match.',
    ],
    realWorldAnalogy:
      'Railway track switches route the locomotive cleanly left or right depending on the signal sensor at the junction.',
    proTips: [
      'Order else-if chains carefully from most specific/narrow condition to broadest.',
      'Never duplicate code across both if and else branches when it can sit once afterward.',
    ],
    banglaSummary:
      'শর্ত সাপেক্ষে প্রোগ্রামের গতিপথ নির্ধারণ করা—if-else চেইন, switch/match স্টেটমেন্ট ও গার্ড ক্লজের সঠিক ব্যবহার।',
    banglaIntuition: [
      'একটির পর একটি নেস্টেড if না লিখে শুরুতেই অবৈধ ইনপুট রিটার্ন (Guard Clause) করে দেওয়া পেশাদার নিয়ম।',
      'C/C++/Java switch-এ break না দিলে পরের কেসও চলে যায় (Fall-through বাগ)!',
    ],
    banglaAnalogy:
      'পরীক্ষার গ্রেডিং সিস্টেমের মতো: ৮০+ হলে A+, ৭০+ হলে A—শর্ত মিললেই নির্দিষ্ট শাখায় ঢুকে পড়া।',
  },
  {
    number: 7,
    phase: 2,
    topicName: 'Entry & Exit Controlled Loops (while, do-while, for)',
    banglaTopic: 'এন্ট্রি ও এক্সিট কন্ট্রোল্ড লুপ (while, do-while, for)',
    xpReward: 80,
    estimatedMinutes: 20,
    subtitle: 'Iteration invariants, half-open intervals [0, n), loop termination guarantees, and break/continue control.',
    coreBullets: [
      'Entry-controlled loops (for, while) test conditions BEFORE iteration 1; exit-controlled loops (do-while) always run at least once.',
      'Write half-open bounds [0, n) using < n to eliminate off-by-one boundary errors.',
      'Define a loop invariant and verify the loop variable strictly progresses toward termination.',
    ],
    ramCpuCore:
      'Tight loops stay resident inside L1 instruction cache and trigger sequential hardware prefetching along memory strides.',
    deepParagraphs: [
      'Choosing between for (known count), while (condition-driven), and do-while (guaranteed first pass such as digit extraction on n=0) prevents clumsy duplicate setup code.',
      'Never modify the loop counter both inside the for header and loop body unpredictably.',
    ],
    realWorldAnalogy:
      'Counting staircase steps (for loop) vs climbing until reaching the roof door (while loop) vs knocking at least once before checking response (do-while).',
    proTips: [
      'Handle n = 0 carefully in digit-counting while(n > 0) loops—do-while handles 0 naturally!',
      'Prefer iterators / range-based for loops when you don’t need raw index math.',
    ],
    banglaSummary:
      'for, while ও do-while লুপের পার্থক্য, অফ-বাই-ওয়ান বাগ এড়ানোর কৌশল এবং ডিজিট-কাউন্টিংয়ে ০ হ্যান্ডেল করা।',
    banglaIntuition: [
      'while আগে শর্ত চেক করে, কিন্তু do-while অন্তত একবার কাজ করার পর শর্ত চেক করে।',
      'ইনডেক্স ০ থেকে < n পর্যন্ত চালালে কখনোই অ্যারোর সীমা ছাড়িয়ে যাবে না।',
    ],
    banglaAnalogy:
      'ক্লাসে রোল কল করা হলো for লুপ, আর বৃষ্টি থামা পর্যন্ত অপেক্ষা করা হলো while লুপ।',
  },
  {
    number: 8,
    phase: 2,
    topicName: 'Nested Loops & Star/Number Pattern Printing Mastery',
    banglaTopic: 'নেস্টেড লুপ ও স্টার/নাম্বার প্যাটার্ন প্রিন্টিং মাস্টারি',
    xpReward: 80,
    estimatedMinutes: 22,
    subtitle: 'Mastering 2D row/column relationships, symmetry formulas, hollow grids, and Pascal/diamond patterns.',
    coreBullets: [
      'Decompose any 2D pattern into 3 formulas: outer rows (i), leading spaces per row, and printed symbols per row.',
      'In hollow squares or borders, print "*" whenever i == 0 || i == n-1 || j == 0 || j == n-1.',
      'Notice how nested loops scale quadratically O(R × C)—essential context before Big-O optimization.',
    ],
    ramCpuCore:
      'Inner loops iterate R × C times; keeping output buffered in a single string avoids R × C expensive terminal redraws.',
    deepParagraphs: [
      'Pattern printing builds crystal-clear mastery over 2D coordinates (row i, col j) before you ever touch 2D matrices, DP tables, or BFS grid traversal!',
      'Using symmetry (abs(n - 1 - i) or two halves) cuts diamond and butterfly patterns down to clean modular formulas.',
    ],
    realWorldAnalogy:
      'A matrix printer sweeps horizontally across columns (inner j loop) for each vertical line advance (outer i loop).',
    proTips: [
      'Always write a quick row-by-row dry-run table (i -> spaces -> stars) before coding diamond patterns.',
      'Avoid trailing spaces at the end of pattern lines in automated judges.',
    ],
    banglaSummary:
      '২ডি গ্রিড ও ম্যাট্রিক্সের ভিত্তি তৈরির জন্য রো-কলাম সূত্র দিয়ে যেকোনো স্টার, পিরামিড, হোলো বক্স ও ডায়মন্ড প্যাটার্ন আঁকা।',
    banglaIntuition: [
      'বাইরের লুপ (i) সারি বা Row নিয়ন্ত্রণ করে, ভেতরের লুপ (j) কলাম বা প্রতিটি সারির প্রিন্ট নিয়ন্ত্রণ করে।',
      'আগে খাতায় প্রতিটি সারিতে কয়টা স্পেস ও কয়টা * লাগে তা লিখে সূত্র বানালে প্যাটার্ন জলের মতো সহজ হয়।',
    ],
    banglaAnalogy:
      'খাতার প্রতি লাইনে বাম থেকে ডানে কলম চালানো হলো ভেতরের লুপ, আর নিচের নতুন লাইনে নামা হলো বাইরের লুপ।',
  },
  {
    number: 9,
    phase: 2,
    topicName: 'Functions, Parameters, Return Values & Variable Scope',
    banglaTopic: 'ফাংশন, প্যারামিটার, রিটার্ন ভ্যালু ও ভ্যারিয়েবল স্কোপ',
    xpReward: 85,
    estimatedMinutes: 22,
    subtitle: 'Pass-by-value vs pass-by-reference, lexical scope, pure functions, and modular decomposition.',
    coreBullets: [
      'Functions isolate logic into testable blocks with explicit parameters, local stack scope, and clean return values.',
      'Passing large vectors/arrays by value copies O(n) bytes each call—pass by const reference (&) or slice!',
      'Avoid hidden global mutable state when pure functions make unit testing trivial.',
    ],
    ramCpuCore:
      'Every function invocation pushes a Call Stack frame holding return instruction address, arguments, and local stack variables.',
    deepParagraphs: [
      'Well-named helper functions eliminate copy-pasted bugs and expose domain intent immediately.',
      'Always pay attention to parameter passing semantics: primitives copy cheaply, while large containers should borrow/reference.',
    ],
    realWorldAnalogy:
      'Calling a helper function is like delegating an espresso order to a barista: you pass clear parameters (size, sugar) and receive back one finished cup.',
    proTips: [
      'Pass big containers by const& in C++ or &[T] slice in Rust to prevent hidden O(n) copies inside loops!',
      'Keep functions focused on one crisp responsibility under ~30 lines.',
    ],
    banglaSummary:
      'ফাংশন দিয়ে বড় কোডকে ছোট ছোট পরিষ্কার অংশে ভাগ করা, প্যারামিটার পাসিং (Value vs Reference) এবং লোকাল-গ্লোবাল স্কোপ বোঝা।',
    banglaIntuition: [
      'ফাংশনের ভেতর তৈরি ভ্যারিয়েবল কেবল ওই ফাংশন চলাকালীনই স্ট্যাকে বেঁচে থাকে।',
      'বড় অ্যারে বা ভেক্টর কপি না করে রেফারেন্স (&) দিয়ে পাস করলে প্রোগ্রাম অনেক দ্রুত চলে।',
    ],
    banglaAnalogy:
      'অফিসের নির্দিষ্ট ডেস্কে ফাইল পাঠিয়ে কাজ করিয়ে ফেরত নেওয়ার মতোই ফাংশন ইনপুট নিয়ে আউটপুট ফেরত দেয়।',
  },
  {
    number: 10,
    phase: 2,
    isMilestoneMerger: true,
    topicName: 'Time & Space Complexity (Big-O, 10^8 Operations Rule for CF/CodeChef)',
    banglaTopic: 'টাইম ও স্পেস কমপ্লেক্সিটি (Big-O ও কনটেস্ট ১০^৮ নিয়ম — মার্জার ২)',
    xpReward: 120,
    estimatedMinutes: 28,
    subtitle: 'Asymptotic growth O(1), O(log n), O(n), O(n log n), O(n^2), reading constraints before coding, and Milestone Merger 2.',
    coreBullets: [
      '1-second CPU budget is ~10^8 simple operations: n <= 10^3 allows O(n^2); n <= 2×10^5 requires O(n log n) or O(n); n <= 10^7 needs O(n).',
      'Drop lower-order terms and constant factors for Big-O, but keep cache locality in mind for real runtime.',
      'Milestone Merger 2: Upgrade O(n^2) brute force into O(n) / O(log n) using Ch 1–10 foundations.',
    ],
    ramCpuCore:
      'Estimating total loop iterations against L1 cache footprint and 10^8 ops/sec predicts TLE/MLE before writing a single line.',
    deepParagraphs: [
      'Senior competitive programmers look at `1 <= n <= 2×10^5` in the problem statement FIRST—that single constraint instantly eliminates O(n^2) algorithms and points straight toward O(n) or O(n log n).',
      'Space complexity also matters: 256 MB memory limits cap arrays around ~6×10^7 32-bit ints.',
    ],
    realWorldAnalogy:
      'Checking 1,000,000 phonebook entries page by page takes days (O(n)); splitting in half each step finds any name in 20 checks (O(log n)).',
    proTips: [
      'Beware hidden O(n) inside loops: strlen(s) in C conditions or Python `x in list` turns O(n) into O(n^2)!',
      'Always trace worst-case input constraints, not just sample size n = 5.',
    ],
    banglaSummary:
      'কনটেস্টে কোড সাবমিট করার আগেই ইনপুট সীমা দেখে বলে দেওয়া যাবে কোড পাস (AC) করবে নাকি টাইম শেষ (TLE) হবে!',
    banglaIntuition: [
      'প্রতি সেকেন্ডে কম্পিউটার প্রায় ১০^৮টি কাজ করতে পারে।',
      'n = ১০^৫ হলে O(n^2) মানে ১০^১০ কাজ যা ১০০ সেকেন্ডে TLE খাবে; তাই O(n) বা O(n log n) সমাধান বানাতে হবে।',
    ],
    banglaAnalogy:
      'ঢাকা থেকে চট্টগ্রাম যেতে সাইকেল (O(n^2)) নাকি বুলেট ট্রেন (O(n log n)) নেবে—দূরত্ব দেখেই ঠিক করা।',
  },

  // Phase 3: Arrays, Strings & Recursion (Ch 11-15)
  {
    number: 11,
    phase: 3,
    topicName: '1D Arrays, Traversal & Frequency Counting',
    banglaTopic: '১ডি অ্যারে, ট্রাভার্সাল ও ফ্রিকোয়েন্সি কাউন্টিং',
    xpReward: 85,
    estimatedMinutes: 22,
    subtitle: 'Contiguous O(1) indexing, bounds discipline, max/min sweeps, and frequency bucket arrays.',
    coreBullets: [
      'Contiguous layout means arr[i] = base + i * element_size—achieving peak CPU hardware cache prefetching.',
      'Frequency arrays freq[val]++ count occurrences in O(1) time without nested duplicate loops.',
      'Always validate index bounds [0, n-1] cleanly to avoid out-of-bounds memory corruption.',
    ],
    ramCpuCore:
      'Arrays occupy consecutive virtual memory pages; linear forward traversal achieves nearly 100% L1/L2 cache line utilization.',
    deepParagraphs: [
      'A frequency array turns O(n^2) "count duplicates / find majority / anagram check" questions into single-pass O(n) solutions.',
      'Watch array size constraints: allocate large DP/frequency arrays on the heap/static segment rather than overflowing a small 1MB stack.',
    ],
    realWorldAnalogy:
      'A numbered row of lockers side by side—walking directly to locker #47 takes 1 step without opening lockers 1–46.',
    proTips: [
      'Never declare int a[1000000] inside a local function on the stack in C/C++; use vector or static/heap storage.',
      'Offset negative values (val + OFFSET) if using an array as a frequency bucket.',
    ],
    banglaSummary:
      'পাশাপাশি মেমোরি ব্লকে ডেটা রেখে O(1) সময়ে অ্যাক্সেস করা এবং ফ্রিকোয়েন্সি বাকেট দিয়ে O(n^2) সার্চকে O(n)-এ নামানো।',
    banglaIntuition: [
      'অ্যারের প্রতিটি উপাদান মেমোরিতে একদম পাশাপাশি বসে থাকে, তাই ইনডেক্স জানা থাকলে মুহূর্তেই খুঁজে পাওয়া যায়।',
      'ফ্রিকোয়েন্সি অ্যারে freq[x]++ দিয়ে এক পাসেই গুনে ফেলা যায় কোন সংখ্যা কতবার এসেছে।',
    ],
    banglaAnalogy:
      'এক সারিতে সাজানো নম্বরযুক্ত পোস্ট-বক্স—নম্বর জানলেই সরাসরি ওই বাক্সে হাত দেওয়া যায়।',
  },
  {
    number: 12,
    phase: 3,
    topicName: 'Two-Pointer & Sliding Window Basics',
    banglaTopic: 'টু-পয়েন্টার ও স্লাইডিং উইন্ডো বেসিকস',
    xpReward: 95,
    estimatedMinutes: 25,
    subtitle: 'Converging left/right pointers on sorted arrays, fast/slow in-place compaction, and fixed/dynamic windows.',
    coreBullets: [
      'Converging two pointers (left = 0, right = n - 1) eliminate nested loops on sorted pair-sum and palindrome checks.',
      'Sliding windows maintain a running window state in O(1) amortized updates per element (total O(n)).',
      'Each pointer moves at most n steps across the array—strictly O(n) total iterations despite nested while inside for!',
    ],
    ramCpuCore:
      'In-place two-pointer passes require O(1) extra RAM while streaming purely sequentially through L1 cache.',
    deepParagraphs: [
      'When shrinking or expanding a subarray changes a monotonic property (such as non-negative sum or distinct count), a sliding window replaces O(n^2) subarray brute-forcing cleanly.',
      'Always verify loop invariants: left <= right vs left < right depending on whether middle elements pair with themselves.',
    ],
    realWorldAnalogy:
      'Two fingers sliding inward from both edges of a sorted shelf, or a sliding camera frame moving across a row of buildings.',
    proTips: [
      'Verify non-negativity before shrinking a sum window greedily—negative numbers break monotonicity (use prefix sum + hashmap instead!).',
      'Compute window length cleanly as right - left + 1.',
    ],
    banglaSummary:
      'দুই দিক থেকে দুটি পয়েন্টার চালিয়ে বা চলমান উইন্ডো (Sliding Window) ব্যবহার করে O(n^2) সমস্যাকে O(n)-এ সমাধান করা।',
    banglaIntuition: [
      'প্রতিটি পয়েন্টার পুরো অ্যারে জুড়ে সর্বোচ্চ n ধাপ সামনে এগোয়, তাই বাইরের ও ভেতরের লুপ মিলে মোট সময় O(n) থাকে।',
      'নেগেটিভ সংখ্যা থাকলে স্লাইডিং উইন্ডোর মনোটনিসিটি ভেঙে যায়—তখন Prefix Sum + HashMap লাগে।',
    ],
    banglaAnalogy:
      'ট্রেইনের জানালার ফ্রেম ধরে যেমন পুরো দৃশ্যের কেবল একটি অংশ একসাথে দেখা যায় ও ডানে সরানো যায়, সেটাই স্লাইডিং উইন্ডো।',
  },
  {
    number: 13,
    phase: 3,
    topicName: 'Prefix Sums & Difference Arrays (CP Game-Changers)',
    banglaTopic: 'প্রিফিক্স সাম ও ডিফারেন্স অ্যারে (CP গেম-চেঞ্জার)',
    xpReward: 95,
    estimatedMinutes: 25,
    subtitle: 'O(1) range sum queries with 1-indexed pref[], 2D matrix sums, and O(1) offline range updates with diff[].',
    coreBullets: [
      'Precomputing pref[i + 1] = pref[i] + a[i] answers any [L, R] sum query in O(1) via pref[R + 1] - pref[L].',
      'Difference arrays add +val at L and -val at R + 1, turning Q range-add updates into O(Q + N) instead of O(Q × N).',
      'Always store prefix sums in 64-bit integers since N × max(a[i]) easily reaches 10^14!',
    ],
    ramCpuCore:
      'One contiguous O(n) preprocessing scan eliminates thousands of repeated subarray scans.',
    deepParagraphs: [
      'Prefix sums and difference arrays are twin duals of cumulative addition and discrete derivatives—mastering both immediately unlocks 1200–1600 Codeforces problems.',
      'Zero-based vs 1-based padding (pref[0] = 0) removes all `if (L == 0)` special cases cleanly.',
    ],
    realWorldAnalogy:
      'Tracking odometer readings at every highway exit lets you find the distance between Exit L and Exit R with one subtraction.',
    proTips: [
      'Allocate pref of length n + 1 with pref[0] = 0 so sum(l..r inclusive) is always pref[r + 1] - pref[l].',
      'Ensure diff array has size n + 2 so diff[r + 1] -= val never writes out of bounds!',
    ],
    banglaSummary:
      'মাত্র ১টি লুপে প্রিফিক্স সাম বানিয়ে যেকোনো রেঞ্জ [L, R]-এর যোগফল O(1) সময়ে বের করা এবং ডিফারেন্স অ্যারে দিয়ে রেঞ্জ আপডেট করা।',
    banglaIntuition: [
      'pref[0] = 0 রেখে ১-ইনডেক্সড করলে L == 0 নিয়ে কোনো আলাদা if লিখতে হয় না।',
      'যোগফল ১০^৯ ছাড়িয়ে যেতে পারে তাই pref[] সব সময় ৬৪-বিটে (long long / i64) রাখবে।',
    ],
    banglaAnalogy:
      'প্রথম থেকে প্রতি কিলোমিটারের মাইলস্টোন লেখা থাকলে মাঝখানের যেকোনো দুই শহরের দূরত্ব কেবল একটি বিয়োগেই বের হয়।',
  },
  {
    number: 14,
    phase: 3,
    topicName: 'Strings, Character Arrays & String Manipulation',
    banglaTopic: 'স্ট্রিং, ক্যারেক্টার অ্যারে ও স্ট্রিং ম্যানিপুলেশন',
    xpReward: 85,
    estimatedMinutes: 22,
    subtitle: 'ASCII math, null-terminated C strings vs immutable strings, O(n^2) concatenation trap, and frequency anagrams.',
    coreBullets: [
      'ASCII lowercase offset `c - \'a\'` maps characters into 26-slot frequency arrays cleanly.',
      'C strings end with null sentinel `\\0` (strlen inside loops is O(n^2)!); immutable Python/Java/JS strings need join/StringBuilder.',
      'Reverse/palindrome/anagram tasks solve in O(n) time using two pointers or 26-letter frequency counts.',
    ],
    ramCpuCore:
      'ASCII/UTF-8 strings store compact byte buffers; avoiding repeated string reallocation keeps memory pressure near zero.',
    deepParagraphs: [
      'String bugs frequently trace back to quadratic `+` concatenation inside loops or scanning `strlen(s)` on every iteration in C.',
      'Understand UTF-8 codepoints (Rust chars / JS code units) when moving beyond pure ASCII.',
    ],
    realWorldAnalogy:
      'A string is a bead necklace of characters: immutable strings require stringing a whole new necklace whenever you append one bead, whereas builders fill a tray first and clasp once.',
    proTips: [
      'Cache n = strlen(s) before C loops instead of calling strlen inside the loop condition.',
      'Use list.append + "".join in Python, StringBuilder in Java, and array.join in JS.',
    ],
    banglaSummary:
      'ক্যারেক্টারের ASCII মান, C স্ট্রিংয়ের \\0 টার্মিনেটর, ইমিউটেবল স্ট্রিং লুপের O(n^2) ফাঁদ ও প্যালিনড্রোম/অ্যানাগ্রাম লজিক।',
    banglaIntuition: [
      'যে কোনো ছোট হাতের অক্ষর থেকে \'a\' বিয়োগ করলে ০ থেকে ২৫ ইনডেক্স পাওয়া যায়।',
      'Python/Java/JS-এ লুপের ভেতর s += ch লিখলে কোড O(n^2) হয়ে যায়; সব সময় builder বা join ব্যবহার করো।',
    ],
    banglaAnalogy:
      'অক্ষরের মালা—বারবার নতুন মালা না গেঁথে আগে সব পুঁতি ট্রে-তে জমিয়ে একবারে সুতোয় গাঁথা।',
  },
  {
    number: 15,
    phase: 3,
    isMilestoneMerger: true,
    topicName: 'Recursion & Call Stack Visualization (Milestone Merger 3: Ch 1–15)',
    banglaTopic: 'রিকার্শন ও কল স্ট্যাক ভিজ্যুয়ালাইজেশন (মার্জার প্রজেক্ট ৩)',
    xpReward: 120,
    estimatedMinutes: 28,
    subtitle: 'Stack frames, Base Case laws, Recursion Trees, Memoization intuition, and Ch 1–15 Milestone Merger.',
    coreBullets: [
      'Every recursive call pushes a Stack Frame onto the Call Stack; missing a Base Case triggers Stack Overflow.',
      'Draw the Recursion Tree to measure branching factor vs depth before turning naive recursion into memoized DP.',
      'Milestone Merger 3: Combine Arrays, Two-Pointers, Prefix Sums, Strings, and Divide-and-Conquer Recursion.',
    ],
    ramCpuCore:
      'Call stacks typically cap at ~1–8 MB (or ~1000 frames in Python); linear depth > 10^4 should be rewritten iteratively.',
    deepParagraphs: [
      'Recursion expresses self-similar problems—binary exponentiation, subset generation, tree/graph DFS, and backtracking—in a few crystalline lines.',
      'Understanding what happens on the way DOWN (pre-order) vs the way UP (post-order unwind) unlocks every tree and backtracking interview problem.',
    ],
    realWorldAnalogy:
      'Standing between two mirrors or opening nested Russian Matryoshka dolls down to the tiniest solid core (Base Case), then assembling back up.',
    proTips: [
      'Put your Base Case guard at line 1 of every recursive function.',
      'Pass large arrays by reference/index range (l, r) rather than slicing copies at every recursive level!',
    ],
    banglaSummary:
      'ফাংশন নিজেকে কল করলে মেমোরির কল স্ট্যাকে কীভাবে ফ্রেম জমে এবং বেস কেস কীভাবে ফেরত আসে তা হাতে-কলমে দেখা (মার্জার ৩)।',
    banglaIntuition: [
      'প্রতিটি রিকার্শন কল একটি অস্থায়ী নোটবুক (Stack Frame) খোলে; বেস কেসে পৌঁছালে সব নোটবুক একে একে বন্ধ হয়।',
      'রিকার্শনের ভেতর অ্যারে কপি না করে শুধু left, right ইনডেক্স পাস করা উচিত।',
    ],
    banglaAnalogy:
      'সিঁড়ি দিয়ে ধাপে ধাপে উপরে উঠে চাবি নিয়ে আবার ঠিক একই ধাপ বেয়ে নিচে নেমে আসা।',
  },

  // Phase 4: Language Superpowers & OOP (Ch 16-20)
  {
    number: 16,
    phase: 4,
    topicName: 'Pointers & References / Ownership & Borrowing / DOM & Events',
    banglaTopic: 'পয়েন্টার ও রেফারেন্স / ওনারশিপ ও বরোয়িং / ব্রাউজার DOM ইভেন্ট',
    xpReward: 100,
    estimatedMinutes: 26,
    subtitle: 'Memory indirection (C/C++), Rust Borrow Checker (&T vs &mut T), object references (Py/Java/TS), and live DOM event trees (JS/HTML).',
    coreBullets: [
      'Pointers/references pass an 8-byte memory address instead of cloning huge payloads.',
      'Rust’s Borrow Checker enforces either multiple shared reads (&T) OR one exclusive mutable borrow (&mut T)—stopping data races at compile time.',
      'In web browsers, the DOM tree holds live element references mutated via addEventListener callbacks.',
    ],
    ramCpuCore:
      'Indirection stores a 64-bit virtual address in a register, dereferencing directly into stack or heap targets.',
    deepParagraphs: [
      'Chapter 16 highlights each language’s signature memory/DOM superpower: raw pointer safety in C/C++, compile-time Ownership in Rust, reference aliasing awareness in Python/Java/TS, and event-driven DOM binding in JS/HTML.',
      'Understanding aliasing prevents subtle "why did changing copy B mutate array A?" bugs across all 8 languages.',
    ],
    realWorldAnalogy:
      'Sharing a Google Docs link (reference) lets teammates edit the live document directly instead of emailing disconnected copies.',
    proTips: [
      'Initialize every C/C++ pointer explicitly (nullptr) and reset after free().',
      'In Python/JS, clone shallow collections with list(a) or [...a] when independent mutation is required.',
    ],
    banglaSummary:
      'মেমোরি অ্যাড্রেস ও রেফারেন্সের শক্তি: C/C++-এ পয়েন্টার, Rust-এ ওনারশিপ ও বরো চেকার এবং JS/HTML-এ লাইভ DOM ইভেন্ট ট্রি।',
    banglaIntuition: [
      'ডেটা কপি না করে ঠিকানা (Address/Reference) দিলে মেমোরি ও সময় দুটোই বাঁচে।',
      'Rust-এ একই সময়ে হয় একাধিক রিডার (&T) থাকতে পারে, অথবা মাত্র একজন রাইটার (&mut T)।',
    ],
    banglaAnalogy:
      'পুরো বাড়ি বয়ে না এনে কেবল বাড়ির ঠিকানার কার্ডটা হাতে ধরিয়ে দেওয়াই হলো পয়েন্টার বা রেফারেন্স।',
  },
  {
    number: 17,
    phase: 4,
    topicName: 'Dynamic Memory (Heap vs. Stack) & Smart Pointers',
    banglaTopic: 'ডায়নামিক মেমোরি (Heap বনাম Stack) ও স্মার্ট পয়েন্টার',
    xpReward: 100,
    estimatedMinutes: 26,
    subtitle: 'Stack lifetime limits vs Heap allocation, RAII unique_ptr/Box<T>, GC roots, and memory-leak prevention.',
    coreBullets: [
      'Stack memory is fast LIFO (~1–8 MB limit); Heap handles arbitrary dynamic growth across function lifetimes.',
      'Manual malloc/free leaks on early returns unless wrapped with RAII (unique_ptr in C++, Box<T> in Rust).',
      'Garbage-collected runtimes (Python/Java/JS) reclaim unreachable heap graphs automatically but require releasing unused references.',
    ],
    ramCpuCore:
      'Stack pointer bumps in 1 CPU cycle; Heap allocators manage free-lists/arenas via OS mmap/brk syscalls.',
    deepParagraphs: [
      'Understanding Stack vs Heap explains both why large local C arrays crash immediately and how smart pointers / RAII guarantee leak-free cleanup even during exceptions.',
      'Watch reference cycles in GC/reference-counted runtimes (like Python objects or JS detached DOM nodes).',
    ],
    realWorldAnalogy:
      'The Stack is a neat stack of trays on your counter (fast, small capacity); the Heap is a giant warehouse where you reserve numbered storage bays.',
    proTips: [
      'In modern C++23, prefer std::make_unique and std::vector over raw new/delete.',
      'Never store unbounded caches without eviction in long-lived JS/Java/Python servers.',
    ],
    banglaSummary:
      'দ্রুতগতির কিন্তু ছোট Stack মেমোরি বনাম বিশাল কিন্তু ডায়নামিক Heap মেমোরি, এবং মেমোরি লিক ঠেকাতে RAII ও স্মার্ট পয়েন্টার।',
    banglaIntuition: [
      'ফাংশন শেষ হলে Stack নিজেই পরিষ্কার হয়, কিন্তু Heap-এ রাখা ডেটা ম্যানুয়ালি বা স্মার্ট পয়েন্টার/GC দিয়ে পরিষ্কার করতে হয়।',
      'আধুনিক C++ ও Rust-এ স্কোপ শেষ হওয়া মাত্রই স্মার্ট পয়েন্টার স্বয়ংক্রিয়ভাবে মেমোরি মুক্ত করে।',
    ],
    banglaAnalogy:
      'কাজের টেবিল হলো Stack (সীমিত জায়গা, দ্রুত হাত পাওয়া যায়) আর গুদামঘর হলো Heap (বিশাল জায়গা, রসিদ বা পয়েন্টার দিয়ে খুঁজতে হয়)।',
  },
  {
    number: 18,
    phase: 4,
    topicName: 'Structs, Classes & Encapsulation',
    banglaTopic: 'স্ট্রাক্ট, ক্লাস ও এনক্যাপসুলেশন',
    xpReward: 95,
    estimatedMinutes: 25,
    subtitle: 'Grouping cohesive data + invariants, constructors, private fields, validation setters, and method binding.',
    coreBullets: [
      'Encapsulation hides raw internal fields behind validated methods so invalid object states cannot exist.',
      'Structs in C/C++/Rust pack contiguous fields efficiently in memory without virtual-table overhead.',
      'Validate invariants inside constructors (fail fast) instead of trusting callers everywhere.',
    ],
    ramCpuCore:
      'Struct fields lay out sequentially in memory respecting alignment padding; methods receive an implicit `this`/`self` pointer.',
    deepParagraphs: [
      'Cohesive domain types—like BankAccount, Timer, or Matrix—bundle state together with the operations allowed on that state.',
      'Pay attention to field ordering in C/Rust structs to minimize alignment padding bytes.',
    ],
    realWorldAnalogy:
      'A car’s dashboard exposes clean steering/pedal methods while encapsulating raw fuel injection and transmission mechanics under the hood.',
    proTips: [
      'Keep fields private/unexported by default and expose clean behavioral methods rather than dumb getters/setters.',
      'Validate constructor arguments immediately so objects are born valid.',
    ],
    banglaSummary:
      'সম্পর্কিত ডেটা ও ফাংশনকে একসাথে একটি Struct বা Class-এর ভেতর সাজানো এবং প্রাইভেট ফিল্ড দিয়ে ডেটার নিরাপত্তা নিশ্চিত করা।',
    banglaIntuition: [
      'এনক্যাপসুলেশন মানে বাইরের কোড যেন সরাসরি ভেতরের ব্যালেন্স ঋণাত্মক করে ফেলতে না পারে—সবকিছুই মেথডের মাধ্যমে যাচাই হয়ে বদলাবে।',
      'struct এবং class একই ধরনের ব্লুপ্রিন্ট তৈরি করে যেখান থেকে অসংখ্য অবজেক্ট বানানো যায়।',
    ],
    banglaAnalogy:
      'এটিএম মেশিনের মতো: ভেতরের টাকার ভল্ট সরাসরি খোলা যায় না, কেবল সুরক্ষিত বাটনের (Method) মাধ্যমেই টাকা তোলা যায়।',
  },
  {
    number: 19,
    phase: 4,
    topicName: 'Inheritance, Polymorphism, Interfaces & Traits',
    banglaTopic: 'ইনহেরিটেন্স, পলিমরফিজম, ইন্টারফেস ও ট্রেইট',
    xpReward: 100,
    estimatedMinutes: 26,
    subtitle: 'Composition over deep inheritance, interfaces/traits/ABC contracts, dynamic dispatch vs zero-cost generics.',
    coreBullets: [
      'Polymorphism lets callers operate against a shared contract (PaymentProcessor, Shape, Iterator) without knowing concrete types.',
      'Prefer Composition + Interfaces/Traits (Java interfaces, TS interfaces, Rust traits, Python ABC/Protocol) over fragile multi-level class hierarchies.',
      'Notice the trade-off: runtime virtual dispatch (vtables) vs compile-time monomorphization.',
    ],
    ramCpuCore:
      'Virtual methods dispatch via a vtable pointer lookup at runtime; Rust traits/C++ templates can specialize inline at compile time.',
    deepParagraphs: [
      'Plug-and-play system architectures depend on abstract interfaces/traits: swapping Stripe for bKash or InMemoryStore for Postgres touches zero caller logic.',
      'Avoid the "fragile base class" trap by keeping inheritance shallow and favoring composable interfaces.',
    ],
    realWorldAnalogy:
      'A universal USB-C port (Interface/Trait): keyboards, chargers, and SSDs all implement the same contract without the laptop caring who built them.',
    proTips: [
      'In Java/TS/Rust, code against interfaces/traits in function parameters so implementations stay swappable and mockable.',
      'Always mark overridden C++/Java methods with override / @Override to catch signature typos.',
    ],
    banglaSummary:
      'একই ইন্টারফেস বা ট্রেইটের অধীনে ভিন্ন ভিন্ন রূপে কাজ করার ক্ষমতা (Polymorphism) এবং ইনহেরিটেন্সের চেয়ে কম্পোজিশনের আধুনিক ব্যবহার।',
    banglaIntuition: [
      'ইন্টারফেস বা ট্রেইট হলো একটি চুক্তিপত্র—যে ক্লাস এই চুক্তি মানবে, তাকেই একই ফাংশনে ব্যবহার করা যাবে।',
      'গভীর ইনহেরিটেন্স জটিলতা বাড়ায়, তাই আধুনিক ইঞ্জিনিয়ারিংয়ে Interface + Composition সেরা।',
    ],
    banglaAnalogy:
      'যেকোনো ব্র্যান্ডের চার্জার ও ফোনের জন্য একই USB-C পোর্ট নিয়ম—ভেতরের প্রযুক্তি ভিন্ন হলেও সংযোগের নিয়ম এক।',
  },
  {
    number: 20,
    phase: 4,
    isMilestoneMerger: true,
    topicName: 'Generics/Templates & Standard Library Containers (STL / Collections) — Merger 4',
    banglaTopic: 'জেনারিক্স/টেমপ্লেট ও স্ট্যান্ডার্ড কন্টেইনার (STL/Collections — মার্জার ৪)',
    xpReward: 125,
    estimatedMinutes: 30,
    subtitle: 'Type-safe generic algorithms, dynamic arrays, ordered/unordered sets/maps, heaps, and Ch 1–20 Milestone Merger.',
    coreBullets: [
      'Standard containers (C++ STL vector/map/set/pq, Python list/dict/heapq, Java ArrayList/TreeMap/PriorityQueue, Rust Vec/BTreeMap/BinaryHeap) power real engineering and CP.',
      'Generics/Templates eliminate duplicated algorithms while keeping strict type safety at compile time.',
      'Milestone Merger 4: Combine OOP/Traits + Generic Containers to build a typed Leaderboard & Priority Engine.',
    ],
    ramCpuCore:
      'Dynamic arrays double capacity on resize (amortized O(1) push); balanced BST sets run O(log n) while contiguous vectors dominate CPU cache speed.',
    deepParagraphs: [
      'Mastering standard library containers multiplies coding speed in interviews and contests by 10x—never hand-roll linked lists or sorting from scratch when battle-tested library primitives exist.',
      'Pick the right container for the query shape: vector for indexed/sequential, heap for top-K/min-extract, map/set for ordered/unique lookups.',
    ],
    realWorldAnalogy:
      'An industrial toolkit of specialized containers: conveyor belts (queues), priority triage trays (heaps), and alphabetical filing cabinets (balanced trees).',
    proTips: [
      'Watch PriorityQueue max-heap vs min-heap defaults across languages (C++/Rust/Java/Python differ!).',
      'Pre-size capacities (reserve / with_capacity) when element counts are known.',
    ],
    banglaSummary:
      'জেনারিক কোড লেখা এবং C++ STL, Java Collections, Python Collections ও Rust Std কন্টেইনার ব্যবহার করে Ch 1–20 মার্জার তৈরি।',
    banglaIntuition: [
      'C++ priority_queue ও Rust BinaryHeap ডিফল্টভাবে Max-Heap, কিন্তু Java PriorityQueue ও Python heapq ডিফল্টভাবে Min-Heap!',
      'একই অ্যালগরিদম যেন int, string, struct সব টাইপে চলে তার জন্য Generics / Templates ব্যবহৃত হয়।',
    ],
    banglaAnalogy:
      'সব ধরনের জিনিসের জন্য আলাদা আলমারি না বানিয়ে এমন একটি অ্যাডজাস্টেবল র‍্যাক (Generic Container) বানানো যেখানে বই বা যন্ত্র সবই রাখা যায়।',
  },

  // Phase 5: Algorithms, Async & Full-Stack Blueprint (Ch 21-25)
  {
    number: 21,
    phase: 5,
    topicName: 'Sorting, Custom Comparators & Binary Search (including Binary Search on Answer)',
    banglaTopic: 'সর্টিং, কাস্টম কম্পারেটর ও বাইনারি সার্চ (Binary Search on Answer সহ)',
    xpReward: 110,
    estimatedMinutes: 28,
    subtitle: 'O(n log n) Timsort/Introsort, strict-weak-ordering comparator laws, lower_bound/bisect, and parametric answer search.',
    coreBullets: [
      'Never use JS default .sort() without (a, b) => a - b—it converts numbers to lexicographic strings!',
      'Custom comparators MUST satisfy strict weak ordering (never return true on equal elements: use <, never <=!).',
      'Binary Search on Answer checks `canAchieve(mid)` monotonically over range [lo, hi] in O(log(Range) × N).',
    ],
    ramCpuCore:
      'Introsort/Timsort sort contiguous arrays in O(n log n); binary search jumps halve a monotonic space in <= 60 steps even up to 10^18!',
    deepParagraphs: [
      'Binary Search on Answer ("minimize the maximum" or "maximize the minimum") turns seemingly impossible optimization problems into crisp O(n log(10^9)) decisions.',
      'Always compute mid cleanly without signed overflow: lo + (hi - lo) / 2.',
    ],
    realWorldAnalogy:
      'Finding the minimum truck weight limit to ship all boxes within D days by guessing the midpoint capacity and halving the range each time.',
    proTips: [
      'Never return true for equal items in C++/Rust/Java comparators—strict `<` avoids crashes on equal keys.',
      'Guard infinite loops in binary search by checking `mid` progress when narrowing [lo, hi].',
    ],
    banglaSummary:
      'কাস্টম নিয়মে ডেটা সাজানো, বাইনারি সার্চের বাগ-মুক্ত টেমপ্লেট এবং "উত্তরের ওপর বাইনারি সার্চ" দিয়ে কঠিন অপ্টিমাইজেশন সমাধান।',
    banglaIntuition: [
      'C++/Rust কম্পারেটরে সমান উপাদানের জন্য অবশ্যই false রিটার্ন করতে হয় (< ব্যবহার করো, <= নয়)।',
      '"সর্বোচ্চকে সর্বনিম্ন করো" বা "সর্বনিম্নকে সর্বোচ্চ করো" প্রশ্ন দেখলেই Binary Search on Answer কথাটি মাথায় আনবে!',
    ],
    banglaAnalogy:
      'একটি নির্দিষ্ট ওজনের মধ্যে সব মাল নদী পার করা যাবে কি না তা অনুমান করে অর্ধেক-অর্ধেক কমিয়ে সঠিক ওজন বের করা।',
  },
  {
    number: 22,
    phase: 5,
    topicName: 'Hashing, Maps, Sets & Sliding Window Mastery',
    banglaTopic: 'হ্যাশিং, ম্যাপ, সেট ও স্লাইডিং উইন্ডো মাস্টারি',
    xpReward: 110,
    estimatedMinutes: 28,
    subtitle: 'O(1) hash lookup mechanics, anti-hash-collision guards, Subarray Sum = K (Prefix + Map), and Longest Distinct Window.',
    coreBullets: [
      'Hash Maps map arbitrary keys into O(1) average buckets; combine with Prefix Sums to solve Subarray Sum == K with negative numbers!',
      'Note C++ unordered_map can degrade to O(n^2) under adversarial Codeforces anti-hash tests—splitmix64 or ordered map prevents hacks.',
      'Dynamic frequency maps inside a sliding window solve "Longest Substring Without Repeating Characters" & "At Most K Distinct" in O(n).',
    ],
    ramCpuCore:
      'Hash functions spread keys uniformly across heap bucket arrays, minimizing probe chain length for single-cache-line lookups.',
    deepParagraphs: [
      'HashMap + Prefix Sum is the single highest-ROI FAANG interview combination: tracking `seenPrefixSumCount[pref - K]` handles positive, zero, and negative numbers effortlessly in O(n).',
      'Deduplicating elements with Sets collapses quadratic membership loops immediately.',
    ],
    realWorldAnalogy:
      'An instant coat-check claim ticket: hand in key #542 and jump directly to slot 542 without scanning every rack.',
    proTips: [
      'Seed prefix map with `freq[0] = 1` before iterating so subarrays starting at index 0 count accurately!',
      'Be careful of Python dict vs C++ unordered_map hash-collision behavior on huge CF hacks.',
    ],
    banglaSummary:
      'হ্যাশ টেবিলের O(1) সার্চ, Prefix Sum + HashMap দিয়ে Subarray Sum = K (নেগেটিভ সংখ্যাসহ) এবং স্লাইডিং উইন্ডোর গভীর মাস্টারি।',
    banglaIntuition: [
      'প্রিফিক্স ম্যাপে শুরুতেই freq[0] = 1 রেখে দিলে প্রথম ইনডেক্স থেকে শুরু হওয়া সাবঅ্যারেও নিখুঁতভাবে গণনা হয়।',
      'হ্যাশ ম্যাপ ব্যবহার করলে O(n^2) পেয়ার খোঁজা মুহূর্তেই O(n)-এ নেমে আসে।',
    ],
    banglaAnalogy:
      'হাজার হাজার বইয়ের মধ্যে কেবল ISBN নম্বর দিয়ে সরাসরি নির্দিষ্ট তাকের নির্দিষ্ট বইটি ১ সেকেন্ডে তুলে আনা।',
  },
  {
    number: 23,
    phase: 5,
    topicName: 'Stacks, Queues, Trees & Graph Traversal (BFS/DFS)',
    banglaTopic: 'স্ট্যাক, কিউ, ট্রি ও গ্রাফ ট্রাভার্সাল (BFS ও DFS)',
    xpReward: 120,
    estimatedMinutes: 30,
    subtitle: 'Monotonic stacks, level-order BFS queues, DFS recursion/visited sets, topological sort, and shortest unweighted paths.',
    coreBullets: [
      'LIFO Stacks solve bracket validation & Next Greater Element in O(n); FIFO Queues drive level-by-level shortest-path BFS.',
      'BFS discovers shortest paths (minimum edges) on unweighted graphs; DFS explores full components and detects cycles.',
      'Mark nodes visited WHEN PUSHING onto the BFS queue (not when popping!) to prevent duplicate queue explosions.',
    ],
    ramCpuCore:
      'Adjacency lists store sparse graphs in O(V + E) memory rather than O(V^2) matrices, traversing each edge at most twice.',
    deepParagraphs: [
      'Trees and Graphs power file systems, social networks, dependency resolvers, and pathfinding engines. Almost every FAANG graph round boils down to clean BFS, DFS, or Monotonic Stack invariants.',
      'Always guard `visited` before pushing neighbors so cycles never loop infinitely.',
    ],
    realWorldAnalogy:
      'BFS spreads across a pond like concentric water ripples (nearest nodes first); DFS walks down one maze corridor all the way before backtracking.',
    proTips: [
      'Mark `visited[next] = true` BEFORE pushing `next` into the BFS queue—marking on pop enqueues duplicates exponentially!',
      'Watch recursion stack depth on 10^5-node path graphs; switch to explicit stack/BFS when needed.',
    ],
    banglaSummary:
      'স্ট্যাক (LIFO), কিউ (FIFO), ট্রি এবং গ্রাফের ওপর BFS (সবচেয়ে ছোট পথ) ও DFS চালানোর নির্ভুল নিয়ম।',
    banglaIntuition: [
      'BFS-এ নোড Queue-তে ঢোকানোর সাথে সাথেই visited[v] = true করবে, বের করার সময় নয়—নইলে মেমোরি উপচে TLE/MLE খাবে!',
      'অ্যাজাসেন্সি লিস্ট ব্যবহার করলে বড় স্পার্স গ্রাফও O(V + E) মেমোরিতে এঁটে যায়।',
    ],
    banglaAnalogy:
      'পানিতে ঢিল ফেললে ঢেউ যেমন স্তরে স্তরে কাছে থেকে দূরে ছড়ায় তা হলো BFS, আর গোলকধাঁধার এক গলি শেষ করে ফিরে আসা হলো DFS।',
  },
  {
    number: 24,
    phase: 5,
    topicName: 'File I/O, Error Handling, Async/Concurrency & Modular Code',
    banglaTopic: 'ফাইল I/O, এরর হ্যান্ডলিং, অ্যাসিঙ্ক/কনকারেন্সি ও মডুলার কোড',
    xpReward: 120,
    estimatedMinutes: 30,
    subtitle: 'Result/try-catch error propagation, structured concurrency (Promise.all / asyncio / threads / Tokio), and race-free state.',
    coreBullets: [
      'Never swallow errors silently: propagate structured Errors / Result<T, E> cleanly at I/O boundaries.',
      'Run independent network/file tasks concurrently with Promise.all / asyncio.gather instead of awaiting sequentially!',
      'Protect shared state across threads using immutable message passing, atomics, or scoped mutexes.',
    ],
    ramCpuCore:
      'Async event loops overlap non-blocking socket/disk wait cycles on one thread, while multi-core threads parallelize CPU work.',
    deepParagraphs: [
      'Real applications read files, call remote APIs, handle timeouts gracefully, and split modules cleanly rather than dumping everything in one giant file.',
      'Measuring `await a(); await b();` (sum of latencies) vs `Promise.all([a(), b()])` (max latency) instantly doubles backend API responsiveness.',
    ],
    realWorldAnalogy:
      'Putting the kettle on AND toasting bread concurrently rather than standing idle staring at the kettle for 3 minutes before touching the toaster.',
    proTips: [
      'Always wrap untrusted JSON/file parsing in try-catch or Result match handlers.',
      'Close streams/locks reliably with RAII, `with open(...)`, or `try-with-resources`.',
    ],
    banglaSummary:
      'বাস্তব সফটওয়্যারে ফাইল পড়া-লেখা, নিরাপদে এরর ধরা এবং একাধিক কাজ একসাথে (Async/Concurrency) চালিয়ে সময় বাঁচানো।',
    banglaIntuition: [
      'একটি নেটওয়ার্ক কল শেষ হওয়ার জন্য চুপ করে বসে না থেকে Promise.all বা async দিয়ে একসাথে সবগুলো চালালে সময় অর্ধেক হয়ে যায়।',
      'ক্র্যাশ এড়াতে সব সময় ফাইল বা API এরর সুন্দরভাবে হ্যান্ডেল করো।',
    ],
    banglaAnalogy:
      'চা বসিয়ে চুপ করে দাঁড়িয়ে না থেকে পাশাপাশি রুটি সেঁকে নেওয়া—এটাই অ্যাসিঙ্ক বা কনকারেন্সি।',
  },
  {
    number: 25,
    phase: 5,
    isCapstone: true,
    topicName: 'Full-Stack Integration & Production Website Architecture Blueprint',
    banglaTopic: 'ফুল-স্ট্যাক ইন্টিগ্রেশন ও প্রোডাকশন ওয়েবসাইট আর্কিটেকচার ব্লুপ্রিন্ট',
    xpReward: 160,
    estimatedMinutes: 35,
    subtitle: 'Mega Capstone combining all 25 chapters across HTML5, JS/TS, Python/Java APIs, C/C++/Rust engines & database persistence.',
    coreBullets: [
      'Connect the 5-tier web pipeline: Semantic UI (HTML5) -> Typed Client State (JS/TS) -> Auth/API Server (Python/Java) -> Compute Engine (C/C++/Rust) -> Persistent DB.',
      'Enforce input validation, parameterized queries, output escaping, and deterministic JSON contracts end-to-end.',
      'Review live request flow visually inside the Academy Website Blueprint department!',
    ],
    ramCpuCore:
      'Horizontal stateless API tiers coordinate with fast native worker pools and indexed B-Tree databases over HTTP/JSON boundaries.',
    deepParagraphs: [
      'All 25 chapters unite here: Phase 1–2 logic powers business rules, Phase 3 arrays/strings/windows power search & parsing, Phase 4 OOP/Generics/Memory power clean modules, and Phase 5 algorithms & concurrency scale the platform to millions of users.',
      'Inspect and execute the capstone code across all 8 languages to see how each language contributes to a real production web platform.',
    ],
    realWorldAnalogy:
      'A high-end restaurant running seamlessly: menu & dining floor (HTML/CSS), responsive ordering tablet (JS/TS), order dispatcher & security check (Python/Java API), ultra-fast kitchen stations (C/C++/Rust), and permanent inventory ledger (Database).',
    proTips: [
      'Jump to the "Website Blueprint" department anytime to trace all 5 layers interactively!',
      'Validate every API payload at boundaries—never trust raw client input blindly.',
    ],
    banglaSummary:
      'অধ্যায় ১ থেকে ২৫ পর্যন্ত শেখা সব জ্ঞান একত্র করে কীভাবে একটি বাস্তব ও সম্পূর্ণ ফুল-স্ট্যাক ওয়েবসাইট ও সিস্টেম তৈরি হয় তার মেগা ক্যাপস্টোন।',
    banglaIntuition: [
      'Frontend (HTML/CSS/JS/TS) ইউজারের সাথে কথা বলে, Backend API (Python/Java) নিরাপত্তা ও নিয়ম দেখে, আর C/C++/Rust কঠিন কম্পিউটিং চালায়।',
      'উপরের "Website Blueprint" ট্যাবে গিয়ে পুরো ৫-স্তরের প্রবাহ লাইভ দেখতে পারো!',
    ],
    banglaAnalogy:
      'একটি আধুনিক রেস্তোরাঁর মতো: ডাইনিং হল হলো Frontend (HTML/CSS/JS), ম্যানেজার ও ওয়েটার হলো API (Python/Java), আর হাই-স্পিড রান্নাঘর হলো Compute Engine (C/C++/Rust)।',
  },
];

export const LANGUAGE_DOMAIN_FLAVOR: Record<
  LanguageId,
  {
    memoryModelNote: string;
    banglaMemoryNote: string;
    syntaxCompare: { concept: string; syntax: string; note: string }[];
    commonBugs: { bug: string; fix: string }[];
  }
> = {
  c: {
    memoryModelNote: 'Manual stack/heap management with raw pointers, zero hidden runtime, direct ABI access.',
    banglaMemoryNote: 'C-তে কোনো গার্বেজ কালেক্টর নেই; malloc/free ও পয়েন্টার দিয়ে নিজেই মেমোরি নিয়ন্ত্রণ করতে হয়।',
    syntaxCompare: [
      { concept: 'Output', syntax: 'printf("%d\\n", val);', note: 'Format specifier must match exact type' },
      { concept: 'Pointer', syntax: 'int *p = &x;', note: 'Stores 64-bit address of x' },
      { concept: 'Dynamic Array', syntax: 'int *a = malloc(n * sizeof(int));', note: 'Must call free(a) when done' },
    ],
    commonBugs: [
      { bug: 'Forgetting & in scanf("%d", x)', fix: 'Pass the address: scanf("%d", &x).' },
      { bug: 'Missing null terminator \\0 in char arrays', fix: 'Allocate length + 1 bytes and terminate strings with \\0.' },
    ],
  },
  cpp: {
    memoryModelNote: 'RAII deterministic destruction, zero-cost STL templates, and stack-allocated value semantics.',
    banglaMemoryNote: 'C++-এ RAII ও STL vector/map ব্যবহার করলে ম্যানুয়াল free ছাড়াই অত্যন্ত দ্রুত কোড লেখা যায়।',
    syntaxCompare: [
      { concept: 'Fast I/O', syntax: 'ios::sync_with_stdio(false); cin.tie(nullptr);', note: 'Essential for large inputs' },
      { concept: 'Vector', syntax: 'vector<int> v(n, 0);', note: 'Contiguous heap buffer with RAII' },
      { concept: 'Map', syntax: 'unordered_map<string, int> mp;', note: 'O(1) average hash lookup' },
    ],
    commonBugs: [
      { bug: 'Using endl inside loops (flushes stdout every line)', fix: 'Use "\\n" instead of endl for 10x faster I/O.' },
      { bug: 'Vector reallocation invalidating references/iterators', fix: 'Call v.reserve(n) before pushing elements.' },
    ],
  },
  python: {
    memoryModelNote: 'Everything is a reference-counted heap PyObject; dynamic typing with C-accelerated built-ins.',
    banglaMemoryNote: 'Python-এ সবকিছুই হিপ অবজেক্ট ও রেফারেন্স; সহজ সিনট্যাক্স এবং C-ভিত্তিক built-in ফাংশন খুব দ্রুত কাজ করে।',
    syntaxCompare: [
      { concept: 'Fast Input', syntax: 'import sys; data = sys.stdin.read().split()', note: 'Instant bulk token parsing' },
      { concept: 'Comprehension', syntax: '[x * 2 for x in nums if x > 0]', note: 'Concise & faster than manual append' },
      { concept: 'Hash Map', syntax: 'freq = {}; freq[k] = freq.get(k, 0) + 1', note: 'O(1) average dict lookup' },
    ],
    commonBugs: [
      { bug: 'Mutable default argument: def f(arr=[]):', fix: 'Use None default: def f(arr=None): arr = arr or [].' },
      { bug: '2D grid trap: [[0]*n]*m shares row references!', fix: 'Use [[0]*n for _ in range(m)].' },
    ],
  },
  java: {
    memoryModelNote: 'JVM managed heap with generational GC; primitives live on stack, objects live on heap via references.',
    banglaMemoryNote: 'Java-তে প্রিমিটিভ (int, double) স্ট্যাকে এবং অবজেক্ট হিপে থাকে; JVM গার্বেজ কালেক্টর মেমোরি পরিষ্কার করে।',
    syntaxCompare: [
      { concept: 'Fast Reader', syntax: 'BufferedReader br = new BufferedReader(...);', note: 'Faster than Scanner on large input' },
      { concept: 'Generics', syntax: 'Map<Integer, Integer> map = new HashMap<>();', note: 'Uses boxed Integer wrapper' },
      { concept: 'String Build', syntax: 'StringBuilder sb = new StringBuilder();', note: 'O(n) mutable string assembly' },
    ],
    commonBugs: [
      { bug: 'Comparing Strings with == instead of .equals()', fix: 'Always use a.equals(b) for value equality.' },
      { bug: 'Integer caching trap (-128..127) with ==', fix: 'Use .equals() on boxed Integer objects.' },
    ],
  },
  javascript: {
    memoryModelNote: 'V8 hidden-class JIT objects on heap + single-threaded Call Stack + Microtask/Macrotask Event Loop.',
    banglaMemoryNote: 'JavaScript সিঙ্গেল-থ্রেডেড ইভেন্ট লুপে চলে; V8 ইঞ্জিন হিপে অবজেক্ট ও Promise মাইক্রোটাস্ক পরিচালনা করে।',
    syntaxCompare: [
      { concept: 'Immutability', syntax: 'const next = [...items, item];', note: 'Avoid mutating shared state' },
      { concept: 'Map / Set', syntax: 'const seen = new Set(arr);', note: 'O(1) membership check' },
      { concept: 'Async Flow', syntax: 'const [a, b] = await Promise.all([f1(), f2()]);', note: 'Concurrent async I/O' },
    ],
    commonBugs: [
      { bug: 'Array.prototype.sort() sorts numbers as strings! [10, 2]', fix: 'Always pass comparator: arr.sort((a, b) => a - b).' },
      { bug: 'Forgetting await on async functions (gets [object Promise])', fix: 'Await async calls or chain .then().' },
    ],
  },
  rust: {
    memoryModelNote: 'Compile-time Ownership & Borrow Checker: deterministic RAII drops with zero GC and zero data races.',
    banglaMemoryNote: 'Rust-এ প্রতিটি ভ্যালুর একটিই Owner থাকে; স্কোপ শেষ হলেই মেমোরি অটোমেটিক ফ্রি হয় কোনো গার্বেজ কালেক্টর ছাড়াই।',
    syntaxCompare: [
      { concept: 'Mutable Bind', syntax: 'let mut total: i64 = 0;', note: 'Immutable by default' },
      { concept: 'Borrow Slice', syntax: 'fn solve(nums: &[i32]) -> i32', note: 'Zero-copy read borrow' },
      { concept: 'Safe Unwrap', syntax: 'if let Some(val) = map.get(&k) { ... }', note: 'No null pointer exceptions' },
    ],
    commonBugs: [
      { bug: 'Moving a String/Vec into a function then trying to use it again', fix: 'Pass a borrow (&val) instead of moving ownership.' },
      { bug: 'Using .unwrap() on user input in production', fix: 'Propagate errors with ? or match Option/Result.' },
    ],
  },
  typescript: {
    memoryModelNote: 'Erased compile-time structural type system over V8 JS runtime; prevents null/shape bugs before execution.',
    banglaMemoryNote: 'TypeScript কম্পাইল করার আগেই টাইপ ভুল ধরে ফেলে এবং শেষে পরিষ্কার JavaScript কোডে রূপান্তরিত হয়।',
    syntaxCompare: [
      { concept: 'Contract', syntax: 'interface Metric { id: string; score: number; }', note: 'Zero runtime overhead' },
      { concept: 'Narrowing', syntax: 'if (typeof x === "string") { ... }', note: 'Compiler narrows union types' },
      { concept: 'Readonly', syntax: 'function sum(xs: readonly number[]): number', note: 'Prevents accidental mutation' },
    ],
    commonBugs: [
      { bug: 'Bypassing safety with "as any" type casts', fix: 'Use unknown + type guards or discriminated unions.' },
      { bug: 'Assuming JSON.parse() matches interface without validation', fix: 'Validate runtime shape at API boundaries.' },
    ],
  },
  html: {
    memoryModelNote: 'Browser parses byte stream -> tokens -> live DOM Tree + CSSOM -> Render Tree -> GPU Composite layers.',
    banglaMemoryNote: 'ব্রাউজার HTML পড়ে একটি DOM ট্রি তৈরি করে এবং CSSOM-এর সাথে মিলিয়ে স্ক্রিনে পিক্সেল রেন্ডার করে।',
    syntaxCompare: [
      { concept: 'Landmark', syntax: '<main><article>...</article></main>', note: 'Improves SEO & screen readers' },
      { concept: 'Responsive Grid', syntax: 'display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));', note: 'Adaptive cards without media queries' },
      { concept: 'Accessible Form', syntax: '<label for="u">User</label><input id="u" required />', note: 'Native keyboard & validation' },
    ],
    commonBugs: [
      { bug: 'Using clickable <div> instead of <button>', fix: 'Use <button type="button"> for keyboard & screen-reader support.' },
      { bug: 'Missing viewport meta or fixed pixel widths causing horizontal scroll', fix: 'Use max-width: 100% and flexible grid/flex layouts.' },
    ],
  },
};
