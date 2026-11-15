import type { DeepChapterContent } from './deepChapter1';
import type { LanguageId } from '../types/academy';

export const DEEP_CHAPTER_3: Record<LanguageId, DeepChapterContent> = {
  c: {
    title: 'C Chapter 3 (C23): Operators, Bitwise Logic & Branch Prediction',
    banglaTitle: 'C অধ্যায় ৩ (C23): অপারেটর, বিটওয়াইজ গণিত ও কন্ট্রোল ফ্লো',
    subtitle: 'Master arithmetic precedence, negative modulo normalization, bitwise masks (&, |, ^, <<, >>), and clean guard clauses.',
    zeroIntuition: {
      plainEnglishStory:
        'A program that runs top-to-bottom every single time is just a calculator. To make smart decisions—like granting admin access, checking if a number is odd in 1 CPU cycle, or normalizing negative remainders—a CPU uses Comparison (`==`, `<`) and Bitwise (`&`, `|`, `^`, `<<`) operators to steer `if / else` and `switch` branches.',
      asciiFlowchart: `         ( START: Read n, m )
                  |
                  v
    [ Check: (n & 1) == 0 ? ] ----(Yes)----> [ Print "EVEN" ]
                  |
                 (No)
                  v
         [ Print "ODD" ]
                  |
                  v
    [ Safe Mod: ((n % m) + m) % m ]
                  |
                  v
        [ Print Bitwise & Mod ] --> ( STOP )`,
      pseudocode: [
        '1. READ 64-bit integer n and positive modulus m',
        '2. GUARD: if m <= 0, print error and return 0 early',
        '3. TEST parity via lowest bit: is_even = ((n & 1) == 0)',
        '4. NORMALIZE negative modulo: rem = ((n % m) + m) % m',
        '5. COMPUTE power-of-two check: is_pow2 = (n > 0) && ((n & (n - 1)) == 0)',
        '6. OUTPUT parity, safe modulo, and power-of-two flag',
      ],
      banglaZeroToHero: {
        analogyTitle: 'রেললাইনের সুইচ ও ঘরের লাইটের সুইচবোর্ড (Control Flow & Bitwise)',
        explanation:
          'কল্পনা করো তুমি একটি রেলস্টেশনের মাস্টার। সামনে দুইটি লাইন—বাম আর ডান। ট্রেন কোন দিকে যাবে তা ঠিক করে পয়েন্টার সুইচ (`if / else`)। আর তোমার ডেস্কে আছে ৮টি ছোট ছোট লাইটের সুইচ (Bitwise 0 এবং 1)। প্রতিটি বিট একটি অন/অফ সুইচ! `n & 1` মানে শুধু একদম ডানপাশের সুইচটি অন (1) না অফ (0) তা ১ ক্লক সাইকেলেই দেখে বলে দেওয়া সংখ্যাটি জোড় নাকি বিজোড়!',
        everydayExample:
          'দরজায় ঢোকার আগে যেমন দেখো "চাবি আছে কি না (&&) এবং তালা খোলা কি না", প্রথমটি না থাকলে পরেরটি চেকই করো না—এটাই Short-Circuit Evaluation!',
        keyTakeaways: [
          'C-তে `-7 % 5` এর উত্তর `-2` (ঋণাত্মক!) হয়; পজিটিভ মডুলাস পেতে `((a % m) + m) % m` লিখতে হয়।',
          '`&` (Bitwise AND) বিট নিয়ে কাজ করে, আর `&&` (Logical AND) শর্ত সত্য-মিথ্যা দেখে Short-Circuit করে।',
          'Deeply nested `if-else` না লিখে শুরুতেই Early Return (Guard Clause) ব্যবহার করলে কোড পড়া ও ডিবাগ করা সহজ হয়।',
        ],
      },
    },
    codeExamples: [
      {
        id: 'c-3-ex-basic',
        tier: 'Basic',
        title: '1. Basic: Grade Classifier & Parity Check',
        banglaNote: 'if / else-if চেইন এবং % দিয়ে সহজ জোড়-বিজোড় ও গ্রেড নির্ণয়।',
        code: `#include <stdio.h>
#include <stdbool.h>

int main(void) {
    int score = 0;
    if (scanf("%d", &score) != 1) return 0;

    bool is_even = (score % 2 == 0);
    if (score >= 80) {
        printf("A+ (%s)\\n", is_even ? "Even" : "Odd");
    } else if (score >= 60) {
        printf("B (%s)\\n", is_even ? "Even" : "Odd");
    } else {
        printf("Practice More (%s)\\n", is_even ? "Even" : "Odd");
    }
    return 0;
}`,
        stdin: '84',
        expectedOutput: 'A+ (Even)',
      },
      {
        id: 'c-3-ex-edge',
        tier: 'Edge-Case',
        title: '2. Edge-Case: Negative Modulo & Zero Guard',
        banglaNote: 'নেগেটিভ সংখ্যা ও শূন্য দিয়ে ভাগ (Division by Zero) আটকাতে Short-Circuit গার্ড।',
        code: `#include <stdio.h>

int main(void) {
    long long a = 0, m = 0;
    if (scanf("%lld %lld", &a, &m) != 2) return 0;

    if (m <= 0) {
        printf("INVALID_MOD\\n");
        return 0;
    }
    long long safe_mod = ((a % m) + m) % m;
    printf("%lld\\n", safe_mod);
    return 0;
}`,
        stdin: '-7 5',
        expectedOutput: '3',
      },
      {
        id: 'c-3-ex-opt',
        tier: 'Optimized',
        title: '3. Optimized: Branchless Bitwise Flag Masking',
        banglaNote: 'একটি মাত্র ইন্টিজারের ভেতর একাধিক পারমিশন (Read/Write/Admin) বিটমাস্কে রাখা।',
        code: `#include <stdio.h>
#include <stdint.h>

int main(void) {
    const uint32_t READ  = 1u << 0; // 1
    const uint32_t WRITE = 1u << 1; // 2
    const uint32_t ADMIN = 1u << 2; // 4

    uint32_t mask = 0;
    if (scanf("%u", &mask) != 1) return 0;

    printf("R=%d W=%d A=%d\\n",
           (mask & READ) != 0,
           (mask & WRITE) != 0,
           (mask & ADMIN) != 0);
    return 0;
}`,
        stdin: '5',
        expectedOutput: 'R=1 W=0 A=1',
      },
      {
        id: 'c-3-ex-cp',
        tier: 'CP Trick',
        title: '4. CP Trick: Power of 2 & XOR Swap/Toggle',
        banglaNote: 'O(1)-এ x কি ২-এর ঘাত কি না ((x & (x - 1)) == 0) এবং ব্র্যাঞ্চহীন অ্যাবসোলিউট মান।',
        code: `#include <stdio.h>
#include <stdint.h>

int main(void) {
    uint64_t x = 0;
    if (scanf("%llu", (unsigned long long *)&x) != 1) return 0;

    int is_pow2 = (x > 0) && ((x & (x - 1)) == 0);
    uint64_t toggled = x ^ 1ULL; // Flip LSB in 1 CPU cycle
    printf("%d %llu\\n", is_pow2, (unsigned long long)toggled);
    return 0;
}`,
        stdin: '64',
        expectedOutput: '1 65',
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 1-2',
        codeSnippet: '#include <stdio.h>\n#include <stdint.h>',
        whatItMeans: 'Imports standard I/O and fixed-width integer types (`uint64_t`, `int64_t`).',
        whyItIsThere: 'Bit shifts on signed ints can cause Undefined Behavior; unsigned `uint64_t` is 100% deterministic.',
        ifDeletedError: 'Compile error: unknown type name `uint64_t`.',
      },
      {
        lineNumber: 'Line 6',
        codeSnippet: 'if (m <= 0) { printf("INVALID_MOD\\n"); return 0; }',
        whatItMeans: 'Guard clause checking divisor validity before executing `%`.',
        whyItIsThere: 'Dividing or modulo by 0 raises hardware SIGFPE and crashes the process immediately.',
        ifDeletedError: 'Floating Point Exception (Core Dumped) when input m is 0.',
      },
      {
        lineNumber: 'Line 8',
        codeSnippet: 'long long safe_mod = ((a % m) + m) % m;',
        whatItMeans: 'Shifts negative remainders into `[0, m - 1]` and re-applies `% m`.',
        whyItIsThere: 'In C, `-7 % 5` evaluates to `-2`, breaking hash buckets and circular array indices.',
        ifDeletedError: 'Negative array index out-of-bounds access when `a < 0`.',
      },
      {
        lineNumber: 'Line 10',
        codeSnippet: 'int is_pow2 = (x > 0) && ((x & (x - 1)) == 0);',
        whatItMeans: 'Short-circuit AND checks `x > 0` first, then clears the lowest set bit of `x`.',
        whyItIsThere: 'Powers of 2 have exact 1 set bit (`10000_2`); subtracting 1 flips it (`01111_2`), so AND gives 0.',
        ifDeletedError: 'Without `x > 0`, `x = 0` falsely evaluates `0 & -1 == 0` as true!',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'Input x = 64 (0b1000000)', memoryOrStack: 'x = 64 (8B)', note: 'Single 1-bit at position 6' },
      { step: 2, state: 'Compute x - 1', memoryOrStack: '63 (0b0111111)', note: 'All lower 6 bits become 1' },
      { step: 3, state: 'Bitwise x & (x - 1)', memoryOrStack: '0b1000000 & 0b0111111 = 0', note: 'Evaluates is_pow2 = 1' },
      { step: 4, state: 'Toggle LSB: x ^ 1', memoryOrStack: '64 ^ 1 = 65', note: 'Outputs "1 65"' },
    ],
    harryBugTraps: [
      {
        title: 'Using `=` (Assignment) instead of `==` (Comparison) inside `if`',
        brokenCode: 'int x = 5;\nif (x = 0) { printf("Zero\\n"); } // Assigns 0, condition is FALSE!',
        fixedCode: 'int x = 5;\nif (x == 0) { printf("Zero\\n"); }',
        whyItBreaks: 'In C, `x = 0` overwrites `x` with 0 and evaluates the `if` condition as 0 (false).',
      },
      {
        title: 'Bitwise `&` Precedence Lower Than `==`',
        brokenCode: 'if (x & 1 == 0) // Parsed as: x & (1 == 0) -> x & 0 -> ALWAYS FALSE!',
        fixedCode: 'if ((x & 1) == 0)',
        whyItBreaks: '`==` binds tighter than `&` in C/C++/Java! Always wrap bitwise expressions in parentheses.',
      },
      {
        title: 'Missing `break;` in `switch` Fallthrough',
        brokenCode: 'switch (op) {\n  case 1: printf("One");\n  case 2: printf("Two"); // Runs BOTH!\n}',
        fixedCode: 'switch (op) {\n  case 1: printf("One"); break;\n  case 2: printf("Two"); break;\n}',
        whyItBreaks: 'C switch cases fall straight through to the next case unless stopped by `break;` or `return;`.',
      },
    ],
    practiceSheet: [
      {
        id: 'c-3-p1',
        difficulty: 'Easy',
        title: '1. Odd or Even via Bitwise AND',
        prompt: 'Read an integer n and print EVEN or ODD using `(n & 1)`.',
        banglaHint: '`((n & 1) == 0)` হলে EVEN, নইলে ODD প্রিন্ট করো।',
        starterCode: `#include <stdio.h>\nint main(void) {\n    long long n;\n    scanf("%lld", &n);\n    printf("%s\\n", (n & 1LL) == 0 ? "EVEN" : "ODD");\n    return 0;\n}`,
        sampleStdin: '17',
        expectedOutput: 'ODD',
      },
      {
        id: 'c-3-p2',
        difficulty: 'Easy',
        title: '2. Leap Year Checker',
        prompt: 'Read year Y and print YES if leap year, else NO.',
        banglaHint: '৪০০ দিয়ে ভাগ গেলে YES, নইলে ৪ দিয়ে ভাগ যাবে কিন্তু ১০০ দিয়ে নয়।',
        starterCode: `#include <stdio.h>\nint main(void) {\n    int y;\n    scanf("%d", &y);\n    int leap = (y % 400 == 0) || (y % 4 == 0 && y % 100 != 0);\n    printf("%s\\n", leap ? "YES" : "NO");\n    return 0;\n}`,
        sampleStdin: '2024',
        expectedOutput: 'YES',
      },
      {
        id: 'c-3-p3',
        difficulty: 'Medium',
        title: '3. Safe Negative Modulo',
        prompt: 'Given integers a and m (m > 0), print the mathematical modulo in [0, m - 1].',
        banglaHint: '`((a % m) + m) % m` সূত্র ব্যবহার করো।',
        starterCode: `#include <stdio.h>\nint main(void) {\n    long long a, m;\n    scanf("%lld %lld", &a, &m);\n    printf("%lld\\n", ((a % m) + m) % m);\n    return 0;\n}`,
        sampleStdin: '-13 5',
        expectedOutput: '2',
      },
      {
        id: 'c-3-p4',
        difficulty: 'Medium',
        title: '4. Set & Clear k-th Bit',
        prompt: 'Given n and bit index k (0-based), print `n | (1ULL << k)` and `n & ~(1ULL << k)`.',
        banglaHint: 'unsigned long long (`1ULL << k`) ব্যবহার করলে ৩২-বিট ওভারফ্লো হবে না।',
        starterCode: `#include <stdio.h>\n#include <stdint.h>\nint main(void) {\n    uint64_t n; int k;\n    scanf("%llu %d", (unsigned long long *)&n, &k);\n    printf("%llu %llu\\n", (unsigned long long)(n | (1ULL << k)), (unsigned long long)(n & ~(1ULL << k)));\n    return 0;\n}`,
        sampleStdin: '10 2',
        expectedOutput: '14 10',
      },
      {
        id: 'c-3-p5',
        difficulty: 'Hard',
        title: '5. Single Unique Number via XOR',
        prompt: 'Given 5 integers where 4 appear in pairs and 1 is unique, find the unique one in O(1) space using XOR.',
        banglaHint: 'x ^ x == 0 এবং x ^ 0 == x! সব সংখ্যাকে XOR করলেই জোড়াগুলো কেটে যাবে।',
        starterCode: `#include <stdio.h>\nint main(void) {\n    long long a, b, c, d, e;\n    scanf("%lld %lld %lld %lld %lld", &a, &b, &c, &d, &e);\n    printf("%lld\\n", a ^ b ^ c ^ d ^ e);\n    return 0;\n}`,
        sampleStdin: '7 3 5 3 7',
        expectedOutput: '5',
      },
    ],
    miniBuild: {
      title: 'Bitwise Permission & Power-of-2 Diagnostic CLI (C23)',
      description: 'Combines Ch 1–3: reads a signed value and modulus, prevents divide-by-zero, normalizes negative modulo, and checks power-of-2 in O(1).',
      banglaGoal: 'Ch 1–3 মিলিয়ে নেগেটিভ মডুলাস, গার্ড ক্লজ ও O(1) বিটওয়াইজ চেক তৈরি করা।',
      combinesChapters: 'Ch 1 (I/O) + Ch 2 (64-bit types) + Ch 3 (Bitwise & Control Flow)',
      starterCode: `#include <stdio.h>
#include <stdint.h>

int main(void) {
    int64_t n = 0, m = 0;
    if (scanf("%lld %lld", (long long *)&n, (long long *)&m) != 2 || m <= 0) {
        printf("ERR\\n");
        return 0;
    }
    int64_t rem = ((n % m) + m) % m;
    int pow2 = (n > 0) && ((n & (n - 1)) == 0);
    printf("mod=%lld pow2=%d\\n", (long long)rem, pow2);
    return 0;
}`,
      sampleStdin: '16 5',
      expectedOutput: 'mod=1 pow2=1',
    },
  },

  cpp: {
    title: 'C++ Chapter 3 (C++23): Bitwise `<bit>`, Precedence & Modern Control Flow',
    banglaTitle: 'C++ অধ্যায় ৩ (C++23): বিটওয়াইজ `<bit>`, অপারেটর ও কন্ট্রোল ফ্লো',
    subtitle: 'Master C++23 bit utilities (`std::popcount`, `std::has_single_bit`), `if`-initializers, `switch`, and CP bitmasks.',
    zeroIntuition: {
      plainEnglishStory:
        'Modern C++23 replaces brittle manual bit-counting loops with zero-overhead hardware intrinsics in `<bit>` (`std::popcount`, `std::has_single_bit`, `std::bit_width`), while `if (auto x = ...; cond)` scopes temporary variables cleanly inside the branch.',
      asciiFlowchart: `  ( START: cin >> x >> m )
            |
            v
  [ Guard: m <= 0 ? ] --(Yes)--> [ print "ERR" & exit ]
            |
           (No)
            v
  [ Hardware Bit Ops: has_single_bit(x), popcount(x) ]
            |
            v
  [ Safe Mod: ((x % m) + m) % m ] --> ( STOP )`,
      pseudocode: [
        '1. READ unsigned/signed 64-bit numbers using fast I/O',
        '2. GUARD against zero modulus before division',
        '3. QUERY CPU POPCNT instruction via std::popcount',
        '4. COMPUTE safe positive modulo and XOR toggle',
      ],
      banglaZeroToHero: {
        analogyTitle: 'শর্টকাট বাটন ও হার্ডওয়্যার বিট-কাউন্টার (C++23 `<bit>`)',
        explanation:
          'পুরনো C-তে একটি সংখ্যায় কয়টি 1 বিট আছে তা গুনতে লুপ চালাতে হতো। কিন্তু আধুনিক C++23-তে `<bit>` হেডার তোমাকে সরাসরি CPU-এর সুপার-ফাস্ট বাটন `std::popcount()` ও `std::has_single_bit()` দেয়—যা এক নির্দেশেই বলে দেয় কয়টি বিট অন আছে এবং সংখ্যাটি ২-এর ঘাত কি না!',
        everydayExample:
          'হাতের দশটি আঙুলের মধ্যে কয়টি তোলা আছে তা এক নজরে বলে দেওয়ার মতোই `std::popcount(x)` মুহূর্তে সেট-বিট গুনে দেয়।',
        keyTakeaways: [
          'C++20/23 `<bit>` লাইব্রেরিতে `popcount`, `has_single_bit`, `countr_zero` O(1) হার্ডওয়্যার স্পিডে চলে।',
          '`if (auto rem = ...; rem == 0)` সিনট্যাক্সে ভ্যারিয়েবল শুধু ওই if/else ব্লকেই সীমাবদ্ধ থাকে।',
          'বিট শিফটের সময় `1LL << k` ব্যবহার করবে (শুধু `1 << k` লিখলে k >= 31 এ ওভারফ্লো হয়)।',
        ],
      },
    },
    codeExamples: [
      {
        id: 'cpp-3-ex-basic',
        tier: 'Basic',
        title: '1. Basic: Modern `if`-Initializer & `switch` Dispatch',
        banglaNote: 'C++17/23 স্টাইলে স্কোপ-লিমিটেড ভ্যারিয়েবল এবং clean switch।',
        code: `#include <iostream>
using namespace std;

int main() {
    long long a, b;
    char op;
    if (!(cin >> a >> op >> b)) return 0;

    switch (op) {
        case '+': cout << (a + b) << "\\n"; break;
        case '-': cout << (a - b) << "\\n"; break;
        case '*': cout << (a * b) << "\\n"; break;
        case '/': cout << (b != 0 ? a / b : 0) << "\\n"; break;
        default: cout << "UNKNOWN\\n";
    }
    return 0;
}`,
        stdin: '12 * 5',
        expectedOutput: '60',
      },
      {
        id: 'cpp-3-ex-edge',
        tier: 'Edge-Case',
        title: '2. Edge-Case: Negative Modulo & Short-Circuit Guard',
        banglaNote: 'নেগেটিভ সংখ্যা ও শূন্য মডুলাস নিরাপদভাবে সামলানো।',
        code: `#include <iostream>
using namespace std;

int main() {
    long long a, m;
    if (!(cin >> a >> m) || m <= 0) {
        cout << "INVALID\\n";
        return 0;
    }
    long long ans = ((a % m) + m) % m;
    cout << ans << "\\n";
    return 0;
}`,
        stdin: '-19 7',
        expectedOutput: '2',
      },
      {
        id: 'cpp-3-ex-opt',
        tier: 'Optimized',
        title: '3. Optimized: C++23 `<bit>` Hardware Intrinsics',
        banglaNote: 'লুপ ছাড়াই std::popcount ও std::has_single_bit দিয়ে সেট-বিট ও পাওয়ার-অফ-২ বের করা।',
        code: `#include <bit>
#include <cstdint>
#include <iostream>
using namespace std;

int main() {
    uint64_t x = 0;
    if (!(cin >> x)) return 0;

    cout << popcount(x) << " " << (has_single_bit(x) ? 1 : 0) << "\\n";
    return 0;
}`,
        stdin: '32',
        expectedOutput: '1 1',
      },
      {
        id: 'cpp-3-ex-cp',
        tier: 'CP Trick',
        title: '4. CP Trick: `1LL << k` Bitmask & Lowest Set Bit (`x & -x`)',
        banglaNote: 'Fenwick Tree (BIT)-এর মূল সূত্র: `x & -x` দিয়ে সর্বনিম্ন সেট-বিট আলাদা করা।',
        code: `#include <iostream>
using namespace std;

int main() {
    long long x;
    int k;
    if (!(cin >> x >> k)) return 0;

    long long lowbit = x & -x;
    long long toggled = x ^ (1LL << k);
    cout << lowbit << " " << toggled << "\\n";
    return 0;
}`,
        stdin: '12 1',
        expectedOutput: '4 14',
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 1-2',
        codeSnippet: '#include <bit>\n#include <cstdint>',
        whatItMeans: 'Includes modern C++20/23 bit manipulation intrinsics and fixed-width integers.',
        whyItIsThere: 'Compile directly to single-cycle CPU instructions (`POPCNT`, `TZCNT`) on x86/ARM.',
        ifDeletedError: 'Compile error: `popcount` and `has_single_bit` were not declared.',
      },
      {
        lineNumber: 'Line 7',
        codeSnippet: 'if (!(cin >> a >> m) || m <= 0)',
        whatItMeans: 'Reads input and immediately short-circuits if input failed or divisor `m <= 0`.',
        whyItIsThere: 'Prevents evaluating `a % m` on uninitialized data or zero divisor.',
        ifDeletedError: 'Division by zero crash (SIGFPE) when `m == 0`.',
      },
      {
        lineNumber: 'Line 9',
        codeSnippet: 'long long lowbit = x & -x;',
        whatItMeans: 'Two’s complement negation `-x` equals `~x + 1`; AND isolates the rightmost `1` bit.',
        whyItIsThere: 'Core O(1) primitive powering Binary Indexed Trees (Fenwick Trees) in competitive programming.',
        ifDeletedError: 'Cannot extract least-significant set bit in O(1).',
      },
      {
        lineNumber: 'Line 10',
        codeSnippet: 'long long toggled = x ^ (1LL << k);',
        whatItMeans: 'Flips the `k`-th bit (`0->1` or `1->0`) using 64-bit shifted mask `1LL << k`.',
        whyItIsThere: 'Using plain `1 << k` causes Undefined Behavior whenever `k >= 31`!',
        ifDeletedError: 'Silent 32-bit shift overflow when `k = 40`.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'Input x = 12 (0b1100), k = 1', memoryOrStack: 'x=12, k=1', note: 'Binary 1100' },
      { step: 2, state: 'Compute -x (~12 + 1)', memoryOrStack: '...11110100', note: 'Two’s complement' },
      { step: 3, state: 'lowbit = 12 & -12', memoryOrStack: '0b1100 & 0b0100 = 4', note: 'Isolates bit 2 (value 4)' },
      { step: 4, state: 'toggled = 12 ^ (1LL << 1)', memoryOrStack: '12 ^ 2 = 14', note: 'Outputs "4 14"' },
    ],
    harryBugTraps: [
      {
        title: '`1 << 40` Signed 32-bit Shift Overflow',
        brokenCode: 'long long mask = 1 << 40; // UB! 1 is 32-bit int!',
        fixedCode: 'long long mask = 1LL << 40;',
        whyItBreaks: 'Literal `1` is 32-bit; shifting left by 32+ bits is Undefined Behavior in C++.',
      },
      {
        title: 'Operator Precedence: `x & 1 == 0`',
        brokenCode: 'if (x & 1 == 0) cout << "Even"; // Never prints for even x!',
        fixedCode: 'if ((x & 1) == 0) cout << "Even";',
        whyItBreaks: '`==` binds tighter than `&`, turning it into `x & (1 == 0)` which is always `0`.',
      },
      {
        title: 'Chained Comparison `1 <= x <= 10`',
        brokenCode: 'if (1 <= x <= 10) // Evaluates (1 <= x) -> bool(0 or 1) <= 10 -> ALWAYS TRUE!',
        fixedCode: 'if (1 <= x && x <= 10)',
        whyItBreaks: 'Unlike Python, C++ evaluates `<=` left-to-right as two separate comparisons.',
      },
    ],
    practiceSheet: [
      {
        id: 'cpp-3-p1',
        difficulty: 'Easy',
        title: '1. Parity & Sign Classifier',
        prompt: 'Read n; print POS/NEG/ZERO and EVEN/ODD separated by space.',
        banglaHint: '`n > 0`, `n < 0` এবং `(n & 1) == 0` চেক করো।',
        starterCode: `#include <iostream>\nusing namespace std;\nint main() {\n    long long n; cin >> n;\n    string s = (n > 0) ? "POS" : (n < 0 ? "NEG" : "ZERO");\n    cout << s << " " << ((n & 1LL) == 0 ? "EVEN" : "ODD") << "\\n";\n    return 0;\n}`,
        sampleStdin: '-8',
        expectedOutput: 'NEG EVEN',
      },
      {
        id: 'cpp-3-p2',
        difficulty: 'Easy',
        title: '2. Safe Arithmetic Range Check',
        prompt: 'Read x; print YES if 10 <= x <= 50, else NO (avoid chained comparison bug!).',
        banglaHint: '`10 <= x && x <= 50` ব্যবহার করো।',
        starterCode: `#include <iostream>\nusing namespace std;\nint main() {\n    int x; cin >> x;\n    cout << ((10 <= x && x <= 50) ? "YES" : "NO") << "\\n";\n    return 0;\n}`,
        sampleStdin: '42',
        expectedOutput: 'YES',
      },
      {
        id: 'cpp-3-p3',
        difficulty: 'Medium',
        title: '3. Count Set Bits (Hamming Weight)',
        prompt: 'Read unsigned 64-bit integer x and print how many 1-bits it has.',
        banglaHint: '`__builtin_popcountll(x)` অথবা `<bit>` থেকে `std::popcount(x)` ব্যবহার করো।',
        starterCode: `#include <iostream>\nusing namespace std;\nint main() {\n    unsigned long long x; cin >> x;\n    cout << __builtin_popcountll(x) << "\\n";\n    return 0;\n}`,
        sampleStdin: '29',
        expectedOutput: '4',
      },
      {
        id: 'cpp-3-p4',
        difficulty: 'Medium',
        title: '4. Power of 2 via Bit Trick',
        prompt: 'Read 64-bit integer n and print YES if n is a power of 2, else NO.',
        banglaHint: '`n > 0 && (n & (n - 1)) == 0`।',
        starterCode: `#include <iostream>\nusing namespace std;\nint main() {\n    long long n; cin >> n;\n    cout << ((n > 0 && (n & (n - 1)) == 0) ? "YES" : "NO") << "\\n";\n    return 0;\n}`,
        sampleStdin: '1024',
        expectedOutput: 'YES',
      },
      {
        id: 'cpp-3-p5',
        difficulty: 'Hard',
        title: '5. Highest Bit Mask & Safe Mod',
        prompt: 'Read n > 0 and m > 0; print `(n % m)` and `(1LL << k)` where k is the 0-based MSB index.',
        banglaHint: '`63 - __builtin_clzll(n)` বা while শিফট দিয়ে সর্বোচ্চ বিট বের করো।',
        starterCode: `#include <iostream>\nusing namespace std;\nint main() {\n    long long n, m; cin >> n >> m;\n    int msb = 63 - __builtin_clzll((unsigned long long)n);\n    cout << (((n % m) + m) % m) << " " << (1LL << msb) << "\\n";\n    return 0;\n}`,
        sampleStdin: '19 5',
        expectedOutput: '4 16',
      },
    ],
    miniBuild: {
      title: 'C++23 Fast Bitwise & Safe-Modulo Analyzer',
      description: 'Reads signed n and modulus m, guards m <= 0, outputs positive modulo, set bit count, and power-of-2 verdict.',
      banglaGoal: 'গার্ড ক্লজ, পজিটিভ মডুলাস ও বিট কাউন্টিং একত্র করে একটি ফাস্ট ইউটিলিটি বানানো।',
      combinesChapters: 'Ch 1 (Fast I/O) + Ch 2 (64-bit) + Ch 3 (Bitwise & Control Flow)',
      starterCode: `#include <iostream>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    long long n, m;
    if (!(cin >> n >> m) || m <= 0) {
        cout << "INVALID\\n";
        return 0;
    }
    long long safe_mod = ((n % m) + m) % m;
    int bits = __builtin_popcountll((unsigned long long)n);
    bool pow2 = (n > 0) && ((n & (n - 1)) == 0);
    cout << "mod=" << safe_mod << " bits=" << bits << " pow2=" << (pow2 ? 1 : 0) << "\\n";
    return 0;
}`,
      sampleStdin: '32 7',
      expectedOutput: 'mod=4 bits=1 pow2=1',
    },
  },

  python: {
    title: 'Python Chapter 3 (Python 3.13): Operators, `match/case` & Bitwise Power',
    banglaTitle: 'Python অধ্যায় ৩ (Python 3.13): অপারেটর, `match/case` ও বিটওয়াইজ গণিত',
    subtitle: 'Master floor division `//`, Euclidean `%`, chained comparisons, Python 3.10+ `match/case`, and `int.bit_count()`.',
    zeroIntuition: {
      plainEnglishStory:
        'Python makes control flow remarkably expressive: you can write mathematical chained inequalities like `10 <= x <= 50` directly, use `//` for exact integer division without float drift, rely on Python’s built-in Euclidean `%` (which automatically keeps `-7 % 5 == 3` positive!), and dispatch complex states cleanly with structural `match / case`.',
      asciiFlowchart: `  ( START: Read a, b )
           |
           v
  [ Check: b == 0 ? ] --(Yes)--> [ Print "DIV_ZERO" ]
           |
          (No)
           v
  [ match op: "+" | "-" | "//" | "%" ]
           |
           v
  [ Bitwise: x.bit_count(), x & (x - 1) ] --> ( STOP )`,
      pseudocode: [
        '1. READ tokens from sys.stdin.read()',
        '2. GUARD against invalid or zero divisors early',
        '3. DISPATCH operation cleanly using match/case',
        '4. CHECK parity and bit_count() in O(1)',
      ],
      banglaZeroToHero: {
        analogyTitle: 'ট্র্যাফিক সিগন্যাল ও বুদ্ধিমান মডুলাস (Python Control Flow)',
        explanation:
          'C/C++-এ `-7 % 5` দিলে `-2` আসে, যা প্রায়ই বাগ তৈরি করে। কিন্তু Python-এর `%` আগে থেকেই বুদ্ধিমান—`-7 % 5` লিখলেই সোজা `3` দেয়! তা ছাড়া Python 3.10+ ও 3.13-এ `match / case` আছে, যা দেখতে সুন্দর এবং অনেকগুলো `if/elif` পরিষ্কার করে ফেলে।',
        everydayExample:
          'একটি স্মার্ট ভেন্ডিং মেশিন: কোড "A1" চাপলে চা, "B2" চাপলে কফি, আর ভুল কোড দিলে "Invalid" (`case _:`)—এটাই `match/case`!',
        keyTakeaways: [
          'Python-এ `/` সব সময় float (`5 / 2 == 2.5`) দেয়; পূর্ণসংখ্যা ভাগফল পেতে `//` (`5 // 2 == 2`) ব্যবহার করবে।',
          '`int.bit_count()` Python-এ সরাসরি সেট-বিট গুনে দেয়।',
          '`and`, `or`, `not` হলো লজিক্যাল অপারেটর; `&`, `|`, `^` হলো বিটওয়াইজ অপারেটর—দুটো গুলিয়ে ফেলবে না!',
        ],
      },
    },
    codeExamples: [
      {
        id: 'py-3-ex-basic',
        tier: 'Basic',
        title: '1. Basic: Python 3.13 `match / case` Calculator',
        banglaNote: 'আধুনিক `match / case` দিয়ে চারটি অপারেশন ও শূন্য গার্ড।',
        code: `import sys

parts = sys.stdin.read().split()
if len(parts) >= 3:
    a, op, b = int(parts[0]), parts[1], int(parts[2])
    match op:
        case "+":
            print(a + b)
        case "-":
            print(a - b)
        case "*":
            print(a * b)
        case "//":
            print(a // b if b != 0 else "DIV_ZERO")
        case _:
            print("UNKNOWN")`,
        stdin: '17 // 5',
        expectedOutput: '3',
      },
      {
        id: 'py-3-ex-edge',
        tier: 'Edge-Case',
        title: '2. Edge-Case: Negative Floor Division & Chained Bounds',
        banglaNote: 'Python-এ -7 // 3 = -3 এবং -7 % 3 = 2; এবং 10 <= x <= 50 সরাসরি কাজ করে।',
        code: `import sys

a, m, x = map(int, sys.stdin.read().split())
print(a % m, "IN" if 10 <= x <= 50 else "OUT")`,
        stdin: '-7 5 25',
        expectedOutput: '3 IN',
      },
      {
        id: 'py-3-ex-opt',
        tier: 'Optimized',
        title: '3. Optimized: Built-in `bit_count()` & `bit_length()`',
        banglaNote: 'Python-এর C-ইমপ্লিমেন্টেড `bit_count()` লুপের চেয়ে বহুগুণ দ্রুত।',
        code: `import sys

n = int(sys.stdin.read().strip())
print(n.bit_count(), n.bit_length())`,
        stdin: '29',
        expectedOutput: '4 5',
      },
      {
        id: 'py-3-ex-cp',
        tier: 'CP Trick',
        title: '4. CP Trick: Power-of-2 & Fast Parity + XOR Swap',
        banglaNote: 'অসীম-প্রিসিশন ইন্টিজারে O(1) বিটওয়াইজ পাওয়ার-অফ-২ চেক।',
        code: `import sys

n = int(sys.stdin.read().strip())
is_pow2 = n > 0 and (n & (n - 1)) == 0
parity = "EVEN" if (n & 1) == 0 else "ODD"
print(is_pow2, parity)`,
        stdin: '64',
        expectedOutput: 'True EVEN',
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 5',
        codeSnippet: 'match op:',
        whatItMeans: 'Python structural pattern matching statement introduced in 3.10 and optimized in 3.13.',
        whyItIsThere: 'Replaces noisy `if op == ... elif op == ...` chains cleanly.',
        ifDeletedError: 'SyntaxError on `case "+":` blocks below.',
      },
      {
        lineNumber: 'Line 13',
        codeSnippet: 'print(a // b if b != 0 else "DIV_ZERO")',
        whatItMeans: 'Uses integer floor division `//` protected by a conditional expression.',
        whyItIsThere: 'Single `/` produces float `3.4`, which loses precision for 20-digit ints!',
        ifDeletedError: 'ZeroDivisionError crash if `b == 0`.',
      },
      {
        lineNumber: 'Line 15',
        codeSnippet: 'case _:',
        whatItMeans: 'Wildcard fallback branch matching any unrecognized operator.',
        whyItIsThere: 'Ensures total exhaustive handling of unexpected input.',
        ifDeletedError: 'Silent empty output when an unknown operator arrives.',
      },
      {
        lineNumber: 'Line 3 (CP)',
        codeSnippet: 'is_pow2 = n > 0 and (n & (n - 1)) == 0',
        whatItMeans: 'Verifies positive value then tests if clearing the lowest set bit yields 0.',
        whyItIsThere: 'Works even for 100-digit powers of 2 without float `math.log2` precision errors!',
        ifDeletedError: '`math.log2((1<<60)+1)` falsely rounds to `60.0` due to 53-bit float limits!',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'Input n = 29 (0b11101)', memoryOrStack: 'int object 29', note: '5 bits wide' },
      { step: 2, state: 'n.bit_count()', memoryOrStack: '4', note: 'Four 1-bits in 11101' },
      { step: 3, state: 'n & (n - 1)', memoryOrStack: '29 & 28 = 28 != 0', note: 'Not a power of 2' },
      { step: 4, state: 'n & 1', memoryOrStack: '29 & 1 = 1', note: 'Evaluates ODD' },
    ],
    harryBugTraps: [
      {
        title: 'Using `/` instead of `//` on Large Contest Integers',
        brokenCode: 'ans = (10**18 + 1) // 2  # OK\nbad = (10**18 + 1) / 2   # Turns into float 5e+17 -> LOSES LAST DIGITS!',
        fixedCode: 'ans = (10**18 + 1) // 2',
        whyItBreaks: 'Floats only keep 15–17 decimal digits of precision; `/` silently corrupts large integers.',
      },
      {
        title: 'Confusing `and` with `&`',
        brokenCode: 'if x > 0 & x < 10: # & runs BEFORE > and < -> x > (0 & x) < 10!',
        fixedCode: 'if x > 0 and x < 10:',
        whyItBreaks: 'Bitwise `&` has higher precedence than `<`/`>`, producing nonsensical boolean bugs.',
      },
      {
        title: 'Using `is` instead of `==` for Value Comparison',
        brokenCode: 'a = 1000; b = 1000\nif a is b: print("Same") # May be False!',
        fixedCode: 'if a == b: print("Same")',
        whyItBreaks: '`is` checks memory object identity, not numeric equality (only small ints -5..256 are cached).',
      },
    ],
    practiceSheet: [
      {
        id: 'py-3-p1',
        difficulty: 'Easy',
        title: '1. Bitwise Parity Check',
        prompt: 'Read integer n and print EVEN or ODD using `(n & 1)`.',
        banglaHint: '`print("EVEN" if (n & 1) == 0 else "ODD")`।',
        starterCode: `import sys\nn = int(sys.stdin.read().strip())\nprint("EVEN" if (n & 1) == 0 else "ODD")`,
        sampleStdin: '42',
        expectedOutput: 'EVEN',
      },
      {
        id: 'py-3-p2',
        difficulty: 'Easy',
        title: '2. Leap Year & Range',
        prompt: 'Read year y and print YES if leap year, else NO.',
        banglaHint: '`(y % 400 == 0) or (y % 4 == 0 and y % 100 != 0)`।',
        starterCode: `import sys\ny = int(sys.stdin.read().strip())\nprint("YES" if (y % 400 == 0 or (y % 4 == 0 and y % 100 != 0)) else "NO")`,
        sampleStdin: '1900',
        expectedOutput: 'NO',
      },
      {
        id: 'py-3-p3',
        difficulty: 'Medium',
        title: '3. Exact BigInt Divmod',
        prompt: 'Read huge integers a and b; print `a // b` and `a % b` separated by space.',
        banglaHint: '`q, r = divmod(a, b)` ব্যবহার করলে এক ধাপে ভাগফল ও ভাগশেষ মেলে।',
        starterCode: `import sys\na, b = map(int, sys.stdin.read().split())\nq, r = divmod(a, b)\nprint(q, r)`,
        sampleStdin: '100000000000000000007 10',
        expectedOutput: '10000000000000000000 7',
      },
      {
        id: 'py-3-p4',
        difficulty: 'Medium',
        title: '4. Set Bits & Bit Length',
        prompt: 'Read integer n and print its set bit count and bit length.',
        banglaHint: '`n.bit_count()` এবং `n.bit_length()` ব্যবহার করো।',
        starterCode: `import sys\nn = int(sys.stdin.read().strip())\nprint(n.bit_count(), n.bit_length())`,
        sampleStdin: '255',
        expectedOutput: '8 8',
      },
      {
        id: 'py-3-p5',
        difficulty: 'Hard',
        title: '5. Exact Power-of-2 on 30-Digit Int',
        prompt: 'Given a massive integer n (up to 10^30), print YES if exact power of 2, else NO.',
        banglaHint: 'কখনোই `math.log2(n)` ব্যবহার করবে না! `(n > 0 and (n & (n - 1)) == 0)` ১০০% নির্ভুল।',
        starterCode: `import sys\nn = int(sys.stdin.read().strip())\nprint("YES" if n > 0 and (n & (n - 1)) == 0 else "NO")`,
        sampleStdin: '1125899906842624',
        expectedOutput: 'YES',
      },
    ],
    miniBuild: {
      title: 'Python 3.13 Smart Expression & Bitwise Evaluator',
      description: 'Combines fast stdin splitting, `match/case` operator dispatch, zero-division guards, and `bit_count()` diagnostics.',
      banglaGoal: 'Python 3.13-এর match/case, শূন্য-ডিভিশন গার্ড ও bit_count() মিলিয়ে স্মার্ট ক্যালকুলেটর বানানো।',
      combinesChapters: 'Ch 1 (sys.stdin) + Ch 2 (BigInt) + Ch 3 (match/case & Bitwise)',
      starterCode: `import sys

parts = sys.stdin.read().split()
if len(parts) >= 3:
    a, op, b = int(parts[0]), parts[1], int(parts[2])
    match op:
        case "+" | "-" | "*":
            res = a + b if op == "+" else (a - b if op == "-" else a * b)
            print(f"{res} bits={abs(res).bit_count()}")
        case "//":
            print("DIV_ZERO" if b == 0 else f"{a // b} rem={a % b}")
        case _:
            print("BAD_OP")`,
      sampleStdin: '25 // 4',
      expectedOutput: '6 rem=1',
    },
  },

  java: {
    title: 'Java Chapter 3 (Java 21): Modern `switch` Expressions, `Math.floorMod` & Bitwise',
    banglaTitle: 'Java অধ্যায় ৩ (Java 21): `switch` এক্সপ্রেশন, `floorMod` ও বিটওয়াইজ',
    subtitle: 'Master Java 21 arrow `switch` expressions, short-circuit guards, `Math.floorMod`, and `Long.bitCount()`.',
    zeroIntuition: {
      plainEnglishStory:
        'Java 21 replaces verbose fallthrough `switch` blocks with clean expression `switch` (`case "+" -> a + b;`) that guarantees no accidental fallthrough. For circular indices on negative numbers, Java’s standard library ships `Math.floorMod(a, m)`, and `Long.bitCount(x)` compiles to a native hardware instruction.',
      asciiFlowchart: `  ( START: Scanner reads a, op, b )
                 |
                 v
  [ Java 21 Arrow Switch Expression ]
     |-- "+" -> a + b
     |-- "mod" -> Math.floorMod(a, b)
     |-- "bit" -> Long.bitCount(a)
                 |
                 v
      [ System.out.println ] --> ( STOP )`,
      pseudocode: [
        '1. READ 64-bit longs a and b',
        '2. GUARD against zero divisor before floorMod',
        '3. COMPUTE result via Java 21 switch expression',
        '4. TEST power-of-2 using (x > 0 && (x & (x - 1)) == 0)',
      ],
      banglaZeroToHero: {
        analogyTitle: 'ফেল-সেফ ইলেকট্রিক্যাল সুইচবোর্ড (Java 21 Arrow Switch)',
        explanation:
          'পুরনো জাভা বা C-তে `break;` লিখতে ভুলে গেলে এক কেস থেকে পরের কেসে ঢুকে যেত। Java 21-এর `->` (Arrow Switch) এমন একটি স্বয়ংক্রিয় সুইচবোর্ড যেখানে একটি বাটন চাপলে ঠিক ওই কাজটিই হয়, কোনো `break` লাগে না! আর নেগেটিভ মডুলাসের জন্য `Math.floorMod(a, m)` সরাসরি পজিটিভ ভাগশেষ দেয়।',
        everydayExample:
          'লিফটের বাটন: ৩ চাপলে শুধু ৩-এই থামবে, ভুল করে ৪-এ যাবে না—Java 21 Arrow Switch ঠিক সেভাবেই নিরাপদ।',
        keyTakeaways: [
          'Java 21-এ `case A -> expr;` ব্যবহার করলে fallthrough বাগ হওয়ার কোনো সুযোগ নেই।',
          '`a % m` নেগেটিভ উত্তর দিতে পারে; পজিটিভ মডুলাসের জন্য `Math.floorMod(a, m)` ব্যবহার করবে।',
          '`1L << k` ব্যবহার করবে (`1 << k` দিলে ৩২-বিট ওভারফ্লো হবে)।',
        ],
      },
    },
    codeExamples: [
      {
        id: 'java-3-ex-basic',
        tier: 'Basic',
        title: '1. Basic: Java 21 Arrow `switch` Expression',
        banglaNote: '`break` ছাড়াই পরিষ্কার ও নিরাপদ Java 21 switch এক্সপ্রেশন।',
        code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        long a = sc.nextLong();
        String op = sc.next();
        long b = sc.nextLong();
        long res = switch (op) {
            case "+" -> a + b;
            case "-" -> a - b;
            case "*" -> a * b;
            default -> 0L;
        };
        System.out.println(res);
    }
}`,
        stdin: '15 * 4',
        expectedOutput: '60',
      },
      {
        id: 'java-3-ex-edge',
        tier: 'Edge-Case',
        title: '2. Edge-Case: `Math.floorMod` & Zero Guard',
        banglaNote: 'নেগেটিভ সংখ্যার মডুলাস পজিটিভ রাখতে `Math.floorMod`।',
        code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        long a = sc.nextLong(), m = sc.nextLong();
        if (m <= 0) {
            System.out.println("INVALID");
            return;
        }
        System.out.println(Math.floorMod(a, m));
    }
}`,
        stdin: '-13 5',
        expectedOutput: '2',
      },
      {
        id: 'java-3-ex-opt',
        tier: 'Optimized',
        title: '3. Optimized: `Long.bitCount` & `Long.numberOfTrailingZeros`',
        banglaNote: 'JVM-এর হার্ডওয়্যার ইন্ট্রিনসিক ব্যবহার করে সেট-বিট ও ট্রেইলিং জিরো গোনা।',
        code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        long x = new Scanner(System.in).nextLong();
        System.out.println(Long.bitCount(x) + " " + Long.numberOfTrailingZeros(x));
    }
}`,
        stdin: '40',
        expectedOutput: '2 3',
      },
      {
        id: 'java-3-ex-cp',
        tier: 'CP Trick',
        title: '4. CP Trick: Power-of-2 & 64-Bit Mask (`1L << k`)',
        banglaNote: '৬৪-বিট `1L << k` দিয়ে বড় বিটমাস্ক তৈরি করা।',
        code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        long n = sc.nextLong();
        int k = sc.nextInt();
        boolean pow2 = n > 0 && (n & (n - 1)) == 0;
        System.out.println((pow2 ? 1 : 0) + " " + (n | (1L << k)));
    }
}`,
        stdin: '16 2',
        expectedOutput: '1 20',
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 9',
        codeSnippet: 'long res = switch (op) { ... };',
        whatItMeans: 'Java 21 switch expression that returns a computed value directly into `res`.',
        whyItIsThere: 'Eliminates uninitialized variable declarations and fallthrough bugs.',
        ifDeletedError: 'Compile error: cannot evaluate arrow cases outside a switch.',
      },
      {
        lineNumber: 'Line 10-13',
        codeSnippet: 'case "+" -> a + b;',
        whatItMeans: 'Arrow syntax executes only the matching branch with zero `break;` needed.',
        whyItIsThere: 'Prevents the classic C/Java missing-break fallthrough bug.',
        ifDeletedError: 'Missing `default ->` causes compiler error: switch expression does not cover all possible input values.',
      },
      {
        lineNumber: 'Line 10 (Edge)',
        codeSnippet: 'Math.floorMod(a, m)',
        whatItMeans: 'Computes mathematical Euclidean modulo in `[0, m - 1]` even for negative `a`.',
        whyItIsThere: 'Standard `-13 % 5` in Java evaluates to `-3` instead of `2`.',
        ifDeletedError: 'Negative array index crash (`ArrayIndexOutOfBoundsException`).',
      },
      {
        lineNumber: 'Line 8 (CP)',
        codeSnippet: 'n | (1L << k)',
        whatItMeans: 'Sets the `k`-th bit using a 64-bit `1L` literal.',
        whyItIsThere: 'Java silently masks 32-bit `1 << k` modulo 32 (`1 << 32 == 1`!).',
        ifDeletedError: 'Wrong bit modified whenever `k >= 32`!',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'Input n=40 (0b101000)', memoryOrStack: 'n = 40L (8B)', note: 'Bits 3 and 5 set' },
      { step: 2, state: 'Long.bitCount(40)', memoryOrStack: '2', note: 'Two 1-bits' },
      { step: 3, state: 'numberOfTrailingZeros(40)', memoryOrStack: '3', note: 'Three 0s on right' },
      { step: 4, state: 'Print output', memoryOrStack: 'stdout: 2 3', note: 'Exact O(1)' },
    ],
    harryBugTraps: [
      {
        title: 'Comparing Strings with `==` instead of `.equals()`',
        brokenCode: 'if (op == "+") { ... } // Checks object reference, often FALSE!',
        fixedCode: 'if ("+".equals(op)) { ... }',
        whyItBreaks: 'Two separately created Strings with `"+"` sit at different heap addresses.',
      },
      {
        title: '`1 << k` Silent Wrap-Around on `k >= 32`',
        brokenCode: 'long mask = 1 << 35; // Java shifts by 35 % 32 = 3 -> mask = 8!',
        fixedCode: 'long mask = 1L << 35;',
        whyItBreaks: 'Java masks `int` shift counts to 5 bits (`k & 31`); always use `1L` for `long`.',
      },
      {
        title: '`&` vs `&&` Precedence & Short-Circuit',
        brokenCode: 'if (str != null & str.length() > 0) // Still runs str.length() -> NullPointerException!',
        fixedCode: 'if (str != null && str.length() > 0)',
        whyItBreaks: 'Single `&` evaluates BOTH sides eagerly; `&&` stops immediately if left is false.',
      },
    ],
    practiceSheet: [
      {
        id: 'java-3-p1',
        difficulty: 'Easy',
        title: '1. Bitwise Parity Check',
        prompt: 'Read long n; print EVEN if `(n & 1L) == 0`, else ODD.',
        banglaHint: '`((n & 1L) == 0 ? "EVEN" : "ODD")` প্রিন্ট করো।',
        starterCode: `import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        long n = new Scanner(System.in).nextLong();\n        System.out.println((n & 1L) == 0 ? "EVEN" : "ODD");\n    }\n}`,
        sampleStdin: '99',
        expectedOutput: 'ODD',
      },
      {
        id: 'java-3-p2',
        difficulty: 'Easy',
        title: '2. Arrow Switch Grade',
        prompt: 'Read score (0..100); print A if >= 80, B if >= 60, else C.',
        banglaHint: 'Java 21 ternary বা switch দিয়ে সহজেই করা যায়।',
        starterCode: `import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        int s = new Scanner(System.in).nextInt();\n        System.out.println(s >= 80 ? "A" : (s >= 60 ? "B" : "C"));\n    }\n}`,
        sampleStdin: '75',
        expectedOutput: 'B',
      },
      {
        id: 'java-3-p3',
        difficulty: 'Medium',
        title: '3. Safe Negative Modulo',
        prompt: 'Read longs a and m; print `Math.floorMod(a, m)`.',
        banglaHint: '`Math.floorMod(a, m)` ঋণাত্মক সংখ্যার জন্যও ধনাত্মক ভাগশেষ দেয়।',
        starterCode: `import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        long a = sc.nextLong(), m = sc.nextLong();\n        System.out.println(Math.floorMod(a, m));\n    }\n}`,
        sampleStdin: '-22 6',
        expectedOutput: '2',
      },
      {
        id: 'java-3-p4',
        difficulty: 'Medium',
        title: '4. Bit Count & Power of 2',
        prompt: 'Read long n; print `Long.bitCount(n)` and `YES`/`NO` for power of 2.',
        banglaHint: '`n > 0 && (n & (n - 1)) == 0` এবং `Long.bitCount(n)` ব্যবহার করো।',
        starterCode: `import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        long n = new Scanner(System.in).nextLong();\n        boolean p2 = n > 0 && (n & (n - 1)) == 0;\n        System.out.println(Long.bitCount(n) + " " + (p2 ? "YES" : "NO"));\n    }\n}`,
        sampleStdin: '128',
        expectedOutput: '1 YES',
      },
      {
        id: 'java-3-p5',
        difficulty: 'Hard',
        title: '5. 64-Bit Bitmask Toggle',
        prompt: 'Read long n and shift k (0..60); print `n ^ (1L << k)`.',
        banglaHint: 'অবশ্যই `1L << k` লিখবে, `1 << k` নয়!',
        starterCode: `import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        long n = sc.nextLong();\n        int k = sc.nextInt();\n        System.out.println(n ^ (1L << k));\n    }\n}`,
        sampleStdin: '0 35',
        expectedOutput: '34359738368',
      },
    ],
    miniBuild: {
      title: 'Java 21 Switch & Bit-Diagnostics Console',
      description: 'Unifies Scanner input, Java 21 switch expressions, Math.floorMod, and Long.bitCount in one program.',
      banglaGoal: 'Java 21 switch, floorMod এবং Long.bitCount মিলিয়ে মিনি ক্যালকুলেটর তৈরি।',
      combinesChapters: 'Ch 1 (Scanner) + Ch 2 (long) + Ch 3 (Java 21 Switch & Bitwise)',
      starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        long a = sc.nextLong();
        String op = sc.next();
        long b = sc.nextLong();
        String out = switch (op) {
            case "mod" -> b <= 0 ? "ERR" : String.valueOf(Math.floorMod(a, b));
            case "xor" -> String.valueOf(a ^ b);
            case "bits" -> String.valueOf(Long.bitCount(a));
            default -> String.valueOf(a + b);
        };
        System.out.println(out);
    }
}`,
      sampleStdin: '-7 mod 5',
      expectedOutput: '3',
    },
  },

  javascript: {
    title: 'JavaScript Chapter 3 (ES2025): Operators, `??`, Bitwise & `BigInt` Masks',
    banglaTitle: 'JavaScript অধ্যায় ৩ (ES2025): অপারেটর, `??`, বিটওয়াইজ ও `BigInt` মাস্ক',
    subtitle: 'Master strict `===` vs `==`, nullish coalescing `??`, 32-bit JS bitwise traps, and ES2025 `BigInt` bit ops.',
    zeroIntuition: {
      plainEnglishStory:
        'JavaScript has two notorious traps for beginners: loose equality `==` (which turns `0 == ""` into `true`!) and standard bitwise `& / | / <<` (which silently truncates 64-bit Numbers to 32-bit signed ints!). ES2025 gives us strict `===`, nullish coalescing `??` (which preserves `0` and `""`), and `BigInt` (`1n << 50n`) for exact 64-bit+ bitwise math.',
      asciiFlowchart: `  ( START: Parse tokens )
            |
            v
  [ Nullish guard: raw ?? "0" ]
            |
            v
  [ Strict check: op === "mod" ? ]
            |
            v
  [ BigInt 64-bit mask: 1n << BigInt(k) ] --> ( STOP )`,
      pseudocode: [
        '1. PARSE tokens with nullish fallback (??)',
        '2. COMPARE strictly using === (never ==)',
        '3. GUARD zero divisor before modulo',
        '4. USE BigInt (1n << k) when bit index >= 31',
      ],
      banglaZeroToHero: {
        analogyTitle: 'আসল তালা-চাবি (`===`) ও শূন্য-নিরাপদ গার্ড (`??`)',
        explanation:
          'JS-এ `==` হলো এমন এক ঢিলেঢালা তালা যেটা `"5" == 5` বললেও খুলে যায়—এতে ভয়ানক বাগ হয়! তাই সব সময় `===` ব্যবহার করবে। আরেকটি ট্রিক হলো `score || 10`: স্কোর যদি `0` হয়, `||` সেটাকে মিথ্যা ভেবে `10` বানিয়ে দেয়! কিন্তু `score ?? 10` শুধু `null/undefined` হলেই `10` নেয়, `0`-কে সম্মান করে!',
        everydayExample:
          'পরীক্ষায় ০ পেলে (`score = 0`) `||` ভুল করে ১০ বসিয়ে দেয়, কিন্তু `??` সঠিকভাবে `0` রাখে।',
        keyTakeaways: [
          'সব সময় `===` ও `!==` ব্যবহার করবে—কখনোই `==` নয়।',
          'ডিফল্ট ভ্যালুর জন্য `||`-এর বদলে `??` (Nullish Coalescing) বেশি নিরাপদ।',
          'JS-এ সাধারণ `1 << 35` ৩২-বিটে কেটে যায়; বড় বিট শিফটের জন্য অবশ্যই `1n << 35n` (`BigInt`) ব্যবহার করবে।',
        ],
      },
    },
    codeExamples: [
      {
        id: 'js-3-ex-basic',
        tier: 'Basic',
        title: '1. Basic: Strict `===`, Guard Clauses & `switch`',
        banglaNote: '`===` এবং clean switch দিয়ে নিরাপদ অপারেশন ডিসপ্যাচ।',
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const [aStr, op, bStr] = raw.trim().split(/\\s+/);
const a = Number(aStr), b = Number(bStr);

switch (op) {
  case '+': console.log(a + b); break;
  case '-': console.log(a - b); break;
  case '*': console.log(a * b); break;
  default: console.log('UNKNOWN');
}`,
        stdin: '18 + 24',
        expectedOutput: '42',
      },
      {
        id: 'js-3-ex-edge',
        tier: 'Edge-Case',
        title: '2. Edge-Case: `??` vs `||` Zero Trap & Negative Mod',
        banglaNote: 'স্কোর ০ হলেও `??` তা হারায় না, আর `((a % m) + m) % m` পজিটিভ মডুলাস দেয়।',
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const [a, m] = raw.trim().split(/\\s+/).map(Number);

const safeMod = m > 0 ? ((a % m) + m) % m : 'ERR';
const score = 0;
console.log(safeMod, score ?? 100);`,
        stdin: '-9 5',
        expectedOutput: '1 0',
      },
      {
        id: 'js-3-ex-opt',
        tier: 'Optimized',
        title: '3. Optimized: Unsigned 32-Bit Shift `>>> 0` & Parity',
        banglaNote: 'হাই-স্পিড V8/JIT অ্যারিথমেটিকে `(x & 1)` ও `>>> 0`।',
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const x = Number(raw.trim());

const unsigned32 = x >>> 0;
console.log((x & 1) === 0 ? 'EVEN' : 'ODD', unsigned32);`,
        stdin: '-1',
        expectedOutput: 'ODD 4294967295',
      },
      {
        id: 'js-3-ex-cp',
        tier: 'CP Trick',
        title: '4. CP Trick: `BigInt` 64-Bit Bitmask (`1n << k`)',
        banglaNote: 'সাধারণ JS নাম্বার ৩২-বিটে আটকায়, তাই বড় বিটমাস্কের জন্য `BigInt` (`1n << BigInt(k)`)।',
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const [nStr, kStr] = raw.trim().split(/\\s+/);

const n = BigInt(nStr);
const k = BigInt(kStr);
const isPow2 = n > 0n && (n & (n - 1n)) === 0n;
console.log(isPow2 ? 1 : 0, (n | (1n << k)).toString());`,
        stdin: '0 35',
        expectedOutput: '0 34359738368',
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 5 (Edge)',
        codeSnippet: 'const safeMod = m > 0 ? ((a % m) + m) % m : "ERR";',
        whatItMeans: 'Ternary expression guarding `m > 0` and shifting negative remainder to `[0, m-1]`.',
        whyItIsThere: 'JS `%` preserves the sign of `a` (`-9 % 5 === -4`).',
        ifDeletedError: 'Returns `-4` instead of mathematical `1` on negative inputs.',
      },
      {
        lineNumber: 'Line 7 (Edge)',
        codeSnippet: 'score ?? 100',
        whatItMeans: 'Nullish coalescing returns `100` ONLY if `score` is `null` or `undefined`.',
        whyItIsThere: '`0 || 100` mistakenly evaluates to `100` because `0` is falsy in JS.',
        ifDeletedError: 'Zero scores get overwritten with `100`.',
      },
      {
        lineNumber: 'Line 5-6 (CP)',
        codeSnippet: 'const n = BigInt(nStr); const k = BigInt(kStr);',
        whatItMeans: 'Parses inputs as arbitrary-precision `BigInt` instead of 53-bit IEEE-754 `Number`.',
        whyItIsThere: 'JS bitwise operators truncate `Number` to signed 32-bit integers!',
        ifDeletedError: '`1 << 35` evaluates to `8` instead of `34359738368`!',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'Input "0 35"', memoryOrStack: 'n=0n, k=35n', note: 'BigInt values' },
      { step: 2, state: 'isPow2 = 0n > 0n && ...', memoryOrStack: 'false (0)', note: 'Short-circuits at 0n > 0n' },
      { step: 3, state: '1n << 35n', memoryOrStack: '34359738368n', note: 'No 32-bit truncation' },
      { step: 4, state: 'console.log', memoryOrStack: 'stdout: 0 34359738368', note: 'Exact 64-bit result' },
    ],
    harryBugTraps: [
      {
        title: '32-Bit Truncation in `1 << 40`',
        brokenCode: 'console.log(1 << 40); // Prints 256 (40 % 32 = 8)!',
        fixedCode: 'console.log((1n << 40n).toString()); // 1099511627776',
        whyItBreaks: 'Standard JS bitwise operators clamp operands to 32-bit ints; use `BigInt` for > 31 bits.',
      },
      {
        title: 'Loose Equality `==` Type Coercion',
        brokenCode: 'if ("0" == false) // TRUE in JS!',
        fixedCode: 'if ("0" === false) // FALSE (Safe)',
        whyItBreaks: '`==` silently converts strings, booleans, and empty arrays before comparing.',
      },
      {
        title: 'Using `||` Instead of `??` for Numeric `0`',
        brokenCode: 'const limit = inputLimit || 10; // Turns 0 into 10!',
        fixedCode: 'const limit = inputLimit ?? 10; // Keeps 0!',
        whyItBreaks: '`||` treats `0`, `""`, and `false` as missing values.',
      },
    ],
    practiceSheet: [
      {
        id: 'js-3-p1',
        difficulty: 'Easy',
        title: '1. Bitwise Odd/Even',
        prompt: 'Read integer n; print EVEN or ODD using `(n & 1)`.',
        banglaHint: '`(n & 1) === 0 ? "EVEN" : "ODD"` ব্যবহার করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst n = Number(raw.trim());\nconsole.log((n & 1) === 0 ? 'EVEN' : 'ODD');`,
        sampleStdin: '28',
        expectedOutput: 'EVEN',
      },
      {
        id: 'js-3-p2',
        difficulty: 'Easy',
        title: '2. Nullish Default Guard',
        prompt: 'Read an optional number; if missing print 10, if 0 print 0.',
        banglaHint: '`Number.isNaN` বা `??` ব্যবহার করে `0` সংরক্ষণ করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = (typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8')).trim();\nconst val = raw === '' ? null : Number(raw);\nconsole.log(val ?? 10);`,
        sampleStdin: '0',
        expectedOutput: '0',
      },
      {
        id: 'js-3-p3',
        difficulty: 'Medium',
        title: '3. Positive Modulo Wrapper',
        prompt: 'Read a and m; print `((a % m) + m) % m`.',
        banglaHint: 'নেগেটিভ সংখ্যার ভাগশেষ পজিটিভ করতে দুইবার `% m` করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst [a, m] = raw.trim().split(/\\s+/).map(Number);\nconsole.log(((a % m) + m) % m);`,
        sampleStdin: '-14 5',
        expectedOutput: '1',
      },
      {
        id: 'js-3-p4',
        difficulty: 'Medium',
        title: '4. BigInt Power-of-2 Check',
        prompt: 'Read big integer n; print YES if exact power of 2, else NO.',
        banglaHint: '`BigInt(n)` দিয়ে `n > 0n && (n & (n - 1n)) === 0n` চেক করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst n = BigInt(raw.trim());\nconsole.log(n > 0n && (n & (n - 1n)) === 0n ? 'YES' : 'NO');`,
        sampleStdin: '1099511627776',
        expectedOutput: 'YES',
      },
      {
        id: 'js-3-p5',
        difficulty: 'Hard',
        title: '5. Set Bit Beyond 32-Bit Limit',
        prompt: 'Read BigInt n and bit k; print `(n | (1n << k)).toString()`.',
        banglaHint: '`1n << BigInt(k)` ব্যবহার করলে ৫৩-বিটের সীমাও ছাড়িয়ে যাওয়া যায়।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst [n, k] = raw.trim().split(/\\s+/).map(BigInt);\nconsole.log((n | (1n << k)).toString());`,
        sampleStdin: '1 40',
        expectedOutput: '1099511627777',
      },
    ],
    miniBuild: {
      title: 'ES2025 Bitwise & Safe-Modulo Engine',
      description: 'Combines nullish coalescing `??`, strict `===` switch, negative modulo normalization, and 64-bit `BigInt` shifting.',
      banglaGoal: 'ES2025-এর `??`, `===` ও `BigInt` মিলিয়ে নিরাপদ বিটওয়াইজ ইঞ্জিন তৈরি।',
      combinesChapters: 'Ch 1 (I/O) + Ch 2 (BigInt) + Ch 3 (Control Flow & Masks)',
      starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const [aStr, mStr] = raw.trim().split(/\\s+/);
const a = BigInt(aStr ?? '0');
const m = BigInt(mStr ?? '1');
if (m <= 0n) {
  console.log('ERR');
} else {
  const rem = ((a % m) + m) % m;
  const pow2 = a > 0n && (a & (a - 1n)) === 0n ? 1 : 0;
  console.log(\`mod=\${rem} pow2=\${pow2}\`);
}`,
      sampleStdin: '-7 5',
      expectedOutput: 'mod=3 pow2=0',
    },
  },

  rust: {
    title: 'Rust Chapter 3 (Rust 2024): Pattern `match`, `rem_euclid` & Bitwise Safety',
    banglaTitle: 'Rust অধ্যায় ৩ (Rust 2024): প্যাটার্ন `match`, `rem_euclid` ও বিটওয়াইজ সেফটি',
    subtitle: 'Master exhaustive `match` arms, `let-else` guard clauses, `rem_euclid`, and `.count_ones()` hardware intrinsics.',
    zeroIntuition: {
      plainEnglishStory:
        'Rust treats `if` and `match` as expressions that return values, and forces you at compile time to handle every possible case—making missing-branch bugs impossible! Even better, Rust 2024 gives you `let-else` for flat guard clauses, `a.rem_euclid(m)` for positive negative-number modulo, and `x.count_ones()` / `x.is_power_of_two()`.',
      asciiFlowchart: `  ( START: Read a, m )
            |
            v
  [ let-else guard: if m <= 0 return ]
            |
            v
  [ Exhaustive match: a.rem_euclid(m) ]
            |
            v
  [ Intrinsics: count_ones(), is_power_of_two() ] --> ( STOP )`,
      pseudocode: [
        '1. PARSE tokens with let-else early return',
        '2. COMPUTE mathematical modulo with rem_euclid(m)',
        '3. DISPATCH logic using exhaustive match',
        '4. QUERY count_ones() and is_power_of_two()',
      ],
      banglaZeroToHero: {
        analogyTitle: 'শূন্য-বাগ প্যাটার্ন ম্যাচিং ও অটো-ইউক্লিডীয় ভাগশেষ (Rust 2024)',
        explanation:
          'অন্যান্য ভাষায় `switch` কেস বাদ পড়লে প্রোগ্রাম চুপচাপ ভুল কাজ করে। কিন্তু Rust-এ `match` ব্যবহার করলে কোনো কেস বাদ পড়লেই কম্পাইলার কোড রান করতে দেবে না! আর `rem_euclid(m)` বিল্ট-ইন মেথড থাকায় `((a % m) + m) % m` হাতে লিখতে হয় না!',
        everydayExample:
          'প্লেনের প্রি-ফ্লাইট চেকলিস্টের মতো—সব কয়টি চেকবক্স ঠিক না হওয়া পর্যন্ত Rust কম্পাইলার টেক-অফ করতে দেয় না।',
        keyTakeaways: [
          'Rust-এ `if` এবং `match` সরাসরি ভ্যালু রিটার্ন করে (যেমন `let tag = if x & 1 == 0 { "EVEN" } else { "ODD" };`)।',
          '`a.rem_euclid(m)` সব সময় `[0, m-1]` রেঞ্জে ভাগশেষ দেয়।',
          '`let-else` ব্যবহার করে নেস্টেড `if let` ছাড়াই ক্লিন গার্ড ক্লজ লেখা যায়।',
        ],
      },
    },
    codeExamples: [
      {
        id: 'rust-3-ex-basic',
        tier: 'Basic',
        title: '1. Basic: Expression `if` & Exhaustive `match`',
        banglaNote: 'Rust-এ `match` সরাসরি মান রিটার্ন করে এবং সব কেস কভার করা বাধ্যতামূলক।',
        code: `use std::io::{self, Read};

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let mut it = s.split_whitespace();
    let (Some(a), Some(op), Some(b)) = (it.next(), it.next(), it.next()) else {
        return;
    };
    let (a, b): (i64, i64) = (a.parse().unwrap(), b.parse().unwrap());
    let ans = match op {
        "+" => a + b,
        "-" => a - b,
        "*" => a * b,
        _ => 0,
    };
    println!("{}", ans);
}`,
        stdin: '14 * 3',
        expectedOutput: '42',
      },
      {
        id: 'rust-3-ex-edge',
        tier: 'Edge-Case',
        title: '2. Edge-Case: `let-else` Guard & `rem_euclid`',
        banglaNote: '`let-else` গার্ড ক্লজ ও নেগেটিভ সংখ্যার জন্য `rem_euclid`।',
        code: `use std::io::{self, Read};

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let nums: Vec<i64> = s.split_whitespace().filter_map(|x| x.parse().ok()).collect();
    let [a, m] = nums.as_slice() else {
        println!("ERR");
        return;
    };
    if *m <= 0 {
        println!("INVALID_MOD");
        return;
    }
    println!("{}", a.rem_euclid(*m));
}`,
        stdin: '-13 5',
        expectedOutput: '2',
      },
      {
        id: 'rust-3-ex-opt',
        tier: 'Optimized',
        title: '3. Optimized: Built-in `count_ones()` & `is_power_of_two()`',
        banglaNote: 'জিরো-কস্ট হার্ডওয়্যার বিট মেথডস।',
        code: `use std::io::{self, Read};

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let x: u64 = s.trim().parse().unwrap_or(0);
    println!("{} {}", x.count_ones(), if x.is_power_of_two() { 1 } else { 0 });
}`,
        stdin: '64',
        expectedOutput: '1 1',
      },
      {
        id: 'rust-3-ex-cp',
        tier: 'CP Trick',
        title: '4. CP Trick: `match` Range Guards & Lowest Bit (`x & (!x + 1)`)',
        banglaNote: 'Rust রেঞ্জ প্যাটার্ন ও unsigned lowbit আইসোলেশন।',
        code: `use std::io::{self, Read};

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let x: u64 = s.trim().parse().unwrap_or(0);
    let lowbit = x & x.wrapping_neg();
    let tier = match x {
        0 => "ZERO",
        1..=10 => "SMALL",
        _ => "LARGE",
    };
    println!("{} {}", lowbit, tier);
}`,
        stdin: '12',
        expectedOutput: '4 LARGE',
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 7',
        codeSnippet: 'let (Some(a), Some(op), Some(b)) = (...) else { return; };',
        whatItMeans: 'Rust 2024 `let-else` pattern destructuring with diverging early return.',
        whyItIsThere: 'Avoids pyramid-of-doom `if let` nesting when validating multiple inputs.',
        ifDeletedError: 'Panics with `Option::unwrap()` on empty stdin.',
      },
      {
        lineNumber: 'Line 14 (Edge)',
        codeSnippet: 'a.rem_euclid(*m)',
        whatItMeans: 'Computes non-negative Euclidean remainder in `[0, m - 1]`.',
        whyItIsThere: 'Plain `%` in Rust returns `-3` for `-13 % 5`.',
        ifDeletedError: 'Out-of-bounds panic when indexing circular arrays with negative keys.',
      },
      {
        lineNumber: 'Line 7 (CP)',
        codeSnippet: 'x & x.wrapping_neg()',
        whatItMeans: 'Safely computes two’s complement `-x` on `u64` without overflow panic in debug mode.',
        whyItIsThere: 'Rust forbids unary `-` on unsigned `u64`; `wrapping_neg()` gives exact two’s complement.',
        ifDeletedError: 'Compile error: cannot apply unary operator `-` to type `u64`.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'Input x = 12 (0b1100)', memoryOrStack: 'x: u64 = 12', note: 'Stack 8 bytes' },
      { step: 2, state: 'x.wrapping_neg()', memoryOrStack: '0xFFFFFFFFFFFFFFF4', note: 'Two’s complement' },
      { step: 3, state: 'x & wrapping_neg()', memoryOrStack: '4 (0b0100)', note: 'Lowest set bit' },
      { step: 4, state: 'match x { 1..=10 => ..., _ => LARGE }', memoryOrStack: '"LARGE"', note: 'Outputs "4 LARGE"' },
    ],
    harryBugTraps: [
      {
        title: 'Using Truthy Integers inside `if x`',
        brokenCode: 'let x = 5; if x { println!("Yes"); } // COMPILE ERROR!',
        fixedCode: 'let x = 5; if x != 0 { println!("Yes"); }',
        whyItBreaks: 'Rust enforces strict `bool` conditions—numbers do not implicitly coerce to booleans.',
      },
      {
        title: 'Unchecked `1u64 << k` Shift Overflow Panic',
        brokenCode: 'let m = 1u64 << 64; // Panics in debug mode!',
        fixedCode: 'let m = 1u64.checked_shl(k).unwrap_or(0);',
        whyItBreaks: 'Shifting by `>= bit_width` panics in Rust debug builds.',
      },
      {
        title: 'Signed `%` on Negative Values',
        brokenCode: 'let r = -7 % 5; // -2!',
        fixedCode: 'let r = (-7i64).rem_euclid(5); // 3',
        whyItBreaks: '`%` retains dividend sign; always use `rem_euclid` for modular arithmetic.',
      },
    ],
    practiceSheet: [
      {
        id: 'rust-3-p1',
        difficulty: 'Easy',
        title: '1. Bitwise Parity',
        prompt: 'Read i64 n; print EVEN or ODD using `(n & 1) == 0`.',
        banglaHint: '`if n & 1 == 0 { "EVEN" } else { "ODD" }` ব্যবহার করো।',
        starterCode: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    let n: i64 = s.trim().parse().unwrap();\n    println!("{}", if n & 1 == 0 { "EVEN" } else { "ODD" });\n}`,
        sampleStdin: '19',
        expectedOutput: 'ODD',
      },
      {
        id: 'rust-3-p2',
        difficulty: 'Easy',
        title: '2. Range Match Grade',
        prompt: 'Read score 0..=100; print A (80..=100), B (60..=79), else C.',
        banglaHint: '`match score { 80..=100 => "A", 60..=79 => "B", _ => "C" }`।',
        starterCode: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    let score: i32 = s.trim().parse().unwrap();\n    println!("{}", match score { 80..=100 => "A", 60..=79 => "B", _ => "C" });\n}`,
        sampleStdin: '85',
        expectedOutput: 'A',
      },
      {
        id: 'rust-3-p3',
        difficulty: 'Medium',
        title: '3. Euclidean Modulo',
        prompt: 'Read i64 a and m; print `a.rem_euclid(m)`.',
        banglaHint: '`a.rem_euclid(m)` ব্যবহার করো।',
        starterCode: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    let d: Vec<i64> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();\n    println!("{}", d[0].rem_euclid(d[1]));\n}`,
        sampleStdin: '-17 6',
        expectedOutput: '1',
      },
      {
        id: 'rust-3-p4',
        difficulty: 'Medium',
        title: '4. Count Ones & Power of 2',
        prompt: 'Read u64 x; print `x.count_ones()` and `1` or `0` for `is_power_of_two()`.',
        banglaHint: '`.count_ones()` এবং `.is_power_of_two()` মেথড ব্যবহার করো।',
        starterCode: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    let x: u64 = s.trim().parse().unwrap();\n    println!("{} {}", x.count_ones(), if x.is_power_of_two() { 1 } else { 0 });\n}`,
        sampleStdin: '32',
        expectedOutput: '1 1',
      },
      {
        id: 'rust-3-p5',
        difficulty: 'Hard',
        title: '5. Isolate Lowest Set Bit',
        prompt: 'Read u64 x; print `x & x.wrapping_neg()` and `x ^ 1`.',
        banglaHint: '`x.wrapping_neg()` ব্যবহার করলে unsigned overflow প্যানিক হবে না।',
        starterCode: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    let x: u64 = s.trim().parse().unwrap();\n    println!("{} {}", x & x.wrapping_neg(), x ^ 1);\n}`,
        sampleStdin: '24',
        expectedOutput: '8 25',
      },
    ],
    miniBuild: {
      title: 'Rust 2024 Safe Control-Flow & Bit Analyzer',
      description: 'Combines `let-else` guard clauses, `rem_euclid`, `count_ones`, and `is_power_of_two` cleanly.',
      banglaGoal: 'Rust 2024-এর let-else, rem_euclid এবং বিট মেথড একত্রে ব্যবহার করা।',
      combinesChapters: 'Ch 1 (stdin) + Ch 2 (i64/u64) + Ch 3 (match & Bitwise)',
      starterCode: `use std::io::{self, Read};

fn main() {
    let mut buf = String::new();
    io::stdin().read_to_string(&mut buf).unwrap();
    let d: Vec<i64> = buf.split_whitespace().filter_map(|x| x.parse().ok()).collect();
    let [n, m] = d.as_slice() else { println!("ERR"); return; };
    if *m <= 0 { println!("ERR"); return; }
    let rem = n.rem_euclid(*m);
    let pow2 = *n > 0 && (*n as u64).is_power_of_two();
    println!("mod={} pow2={}", rem, if pow2 { 1 } else { 0 });
}`,
      sampleStdin: '-7 5',
      expectedOutput: 'mod=3 pow2=0',
    },
  },

  typescript: {
    title: 'TypeScript Chapter 3 (TS 5.x): Exhaustive Narrowing, `never` & Bitwise Masks',
    banglaTitle: 'TypeScript অধ্যায় ৩ (TS 5.x): টাইপ ন্যারোয়িং, `never` ও বিটওয়াইজ মাস্ক',
    subtitle: 'Master TypeScript 5.x control-flow narrowing, discriminated union `switch` with `never` exhaustiveness, and `bigint` masks.',
    zeroIntuition: {
      plainEnglishStory:
        'TypeScript 5.x turns `if / else` and `switch` statements into compile-time proofs! Inside `if (typeof x === "number")`, TypeScript narrows the type automatically, and in `switch (op)`, adding `const _exhaustive: never = op` makes the compiler alert you the instant you forget a branch.',
      asciiFlowchart: `  ( START: Parse op union '+' | '-' | '*' )
                     |
                     v
  [ switch (op) with TS exhaustiveness ]
                     |
                     v
  [ BigInt Mask: (1n << k) & n ] --> ( STOP )`,
      pseudocode: [
        '1. DEFINE strict Op union type ("+" | "-" | "*")',
        '2. GUARD invalid inputs with type predicates / narrowing',
        '3. SWITCH exhaustively with never check',
        '4. COMPUTE BigInt bitwise operations cleanly',
      ],
      banglaZeroToHero: {
        analogyTitle: 'কম্পাইলার পুলিশ ও `never` সেফটি নেট (TS 5.x Narrowing)',
        explanation:
          'ধরো একটি ফর্মে শুধু ৩টি বাটন (`+`, `-`, `*`) আছে। আপনি `switch` লেখার সময় যদি `*` কেস লিখতে ভুলে যান, সাধারণ JS চুপ থাকবে—কিন্তু TypeScript 5.x-এ `never` চেক বসালে কম্পাইলার সাথে সাথে লাল দাগ দিয়ে ধরিয়ে দেবে যে একটি কেস বাকি আছে!',
        everydayExample:
          'দোকানের ক্যাশিয়ার ৩ ধরনের পেমেন্ট নেয়; নতুন পেমেন্ট যোগ করলে সফটওয়্যার নিজেই মনে করিয়ে দেয় এর কোড লিখতে।',
        keyTakeaways: [
          'TypeScript `if` এবং `switch`-এর ভেতরে ভ্যারিয়েবলের টাইপ নিজে থেকেই সংকীর্ণ (Narrow) করে নেয়।',
          '`const _check: never = op;` লিখলে কোনো union কেস বাদ পড়লে কম্পাইল টাইমেই ধরা পড়ে।',
          '৩২-বিটের বড় বিট শিফটে `bigint` (`1n << k`) ব্যবহার করবে।',
        ],
      },
    },
    codeExamples: [
      {
        id: 'ts-3-ex-basic',
        tier: 'Basic',
        title: '1. Basic: Union Narrowing & `never` Exhaustiveness',
        banglaNote: 'ইউনিয়ন টাইপ ও `never` দিয়ে ১০০% শাখা-নিরাপদ `switch`।',
        code: `import * as fs from 'fs';

type Op = '+' | '-' | '*';
function applyOp(a: number, op: Op, b: number): number {
  switch (op) {
    case '+': return a + b;
    case '-': return a - b;
    case '*': return a * b;
    default: {
      const _never: never = op;
      return _never;
    }
  }
}

const [aStr, opStr, bStr] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/);
if (opStr === '+' || opStr === '-' || opStr === '*') {
  console.log(applyOp(Number(aStr), opStr, Number(bStr)));
}`,
        stdin: '12 * 4',
        expectedOutput: '48',
      },
      {
        id: 'ts-3-ex-edge',
        tier: 'Edge-Case',
        title: '2. Edge-Case: Negative Modulo & Nullish Narrowing',
        banglaNote: 'নেগেটিভ ভাগশেষ ঠিক করা ও `??` ব্যবহার করে `0` সংরক্ষণ।',
        code: `import * as fs from 'fs';

const [a, m] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
const safeMod: number | string = m > 0 ? ((a % m) + m) % m : 'ERR';
console.log(safeMod);`,
        stdin: '-11 4',
        expectedOutput: '1',
      },
      {
        id: 'ts-3-ex-opt',
        tier: 'Optimized',
        title: '3. Optimized: Typed Bitwise Permission Flags',
        banglaNote: '`as const` ফ্ল্যাগ অবজেক্ট ও বিটমাস্ক চেকিং।',
        code: `import * as fs from 'fs';

const FLAGS = { READ: 1, WRITE: 2, EXEC: 4 } as const;
const mask: number = Number(fs.readFileSync(0, 'utf8').trim());
console.log(\`\${(mask & FLAGS.READ) !== 0 ? 1 : 0} \${(mask & FLAGS.EXEC) !== 0 ? 1 : 0}\`);`,
        stdin: '5',
        expectedOutput: '1 1',
      },
      {
        id: 'ts-3-ex-cp',
        tier: 'CP Trick',
        title: '4. CP Trick: Strict `bigint` Power-of-2 & Shift',
        banglaNote: '`bigint` দিয়ে ৩২-বিটের সীমা ছাড়িয়ে বিটওয়াইজ চেক।',
        code: `import * as fs from 'fs';

const [nStr, kStr] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/);
const n: bigint = BigInt(nStr ?? '0');
const k: bigint = BigInt(kStr ?? '0');
const pow2: boolean = n > 0n && (n & (n - 1n)) === 0n;
console.log(\`\${pow2 ? 1 : 0} \${(n | (1n << k)).toString()}\`);`,
        stdin: '8 35',
        expectedOutput: '1 34359738376',
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 3',
        codeSnippet: "type Op = '+' | '-' | '*';",
        whatItMeans: 'Defines a closed string literal union type of valid operators.',
        whyItIsThere: 'Prevents typos like `applyOp(a, "div", b)` at compile time.',
        ifDeletedError: 'Compile error: cannot find name `Op`.',
      },
      {
        lineNumber: 'Line 9-11',
        codeSnippet: 'const _never: never = op;',
        whatItMeans: 'Exhaustiveness assertion: only compiles if every member of `Op` was handled above.',
        whyItIsThere: 'If someone adds `"/"` to `Op` later, TypeScript immediately flags this line!',
        ifDeletedError: 'Unhandled new operators could silently fall through without compile warning.',
      },
      {
        lineNumber: 'Line 3 (Opt)',
        codeSnippet: 'const FLAGS = { READ: 1, WRITE: 2, EXEC: 4 } as const;',
        whatItMeans: 'Freezes property types as literal `1`, `2`, `4` (`readonly`).',
        whyItIsThere: 'Prevents accidental mutation of bitmask constants.',
        ifDeletedError: 'Constants become mutable `number` fields.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'Input "8 35"', memoryOrStack: 'n=8n, k=35n', note: 'Typed bigint' },
      { step: 2, state: 'n > 0n && (n & (n - 1n)) === 0n', memoryOrStack: 'true (1)', note: '8 is 2^3' },
      { step: 3, state: '1n << 35n', memoryOrStack: '34359738368n', note: '64-bit safe shift' },
      { step: 4, state: 'n | (1n << 35n)', memoryOrStack: '34359738376n', note: 'Outputs "1 34359738376"' },
    ],
    harryBugTraps: [
      {
        title: 'Skipping Type Guard Before Calling Narrowed Function',
        brokenCode: 'const opStr: string = input; applyOp(a, opStr, b); // TS Error: string not assignable to Op!',
        fixedCode: "if (opStr === '+' || opStr === '-' || opStr === '*') applyOp(a, opStr, b);",
        whyItBreaks: 'Runtime stdin strings have type `string`, not `Op`; narrow them explicitly first.',
      },
      {
        title: 'Using `number` Bitwise Shifts Above Bit 30',
        brokenCode: 'const mask: number = 1 << 40; // Truncates to 256!',
        fixedCode: 'const mask: bigint = 1n << 40n;',
        whyItBreaks: 'TS compiles to JS where `number` bitwise operators are 32-bit.',
      },
      {
        title: 'Forgetting `??` for Numeric `0`',
        brokenCode: 'const x: number = parsed || 10; // Overwrites 0 with 10!',
        fixedCode: 'const x: number = parsed ?? 10;',
        whyItBreaks: '`||` treats `0` as falsy.',
      },
    ],
    practiceSheet: [
      {
        id: 'ts-3-p1',
        difficulty: 'Easy',
        title: '1. Typed Parity Check',
        prompt: 'Read n: number and print EVEN or ODD via `(n & 1)`.',
        banglaHint: '`(n & 1) === 0 ? "EVEN" : "ODD"` টাইপসহ লেখো।',
        starterCode: `import * as fs from 'fs';\nconst n: number = Number(fs.readFileSync(0, 'utf8').trim());\nconsole.log((n & 1) === 0 ? 'EVEN' : 'ODD');`,
        sampleStdin: '16',
        expectedOutput: 'EVEN',
      },
      {
        id: 'ts-3-p2',
        difficulty: 'Easy',
        title: '2. Exhaustive Traffic Signal',
        prompt: 'Map "R" | "Y" | "G" to "STOP" | "WAIT" | "GO" using a typed switch.',
        banglaHint: '`never` চেকসহ `switch` লেখো।',
        starterCode: `import * as fs from 'fs';\ntype Sig = 'R' | 'Y' | 'G';\nconst s = fs.readFileSync(0, 'utf8').trim();\nfunction action(sig: Sig): string {\n  switch (sig) {\n    case 'R': return 'STOP';\n    case 'Y': return 'WAIT';\n    case 'G': return 'GO';\n  }\n}\nif (s === 'R' || s === 'Y' || s === 'G') console.log(action(s));`,
        sampleStdin: 'G',
        expectedOutput: 'GO',
      },
      {
        id: 'ts-3-p3',
        difficulty: 'Medium',
        title: '3. Safe Modulo Helper',
        prompt: 'Write `safeMod(a: number, m: number): number` and print result.',
        banglaHint: '`((a % m) + m) % m`।',
        starterCode: `import * as fs from 'fs';\nfunction safeMod(a: number, m: number): number { return ((a % m) + m) % m; }\nconst [a, m] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);\nconsole.log(safeMod(a, m));`,
        sampleStdin: '-21 6',
        expectedOutput: '3',
      },
      {
        id: 'ts-3-p4',
        difficulty: 'Medium',
        title: '4. BigInt Power-of-2',
        prompt: 'Check if `bigint` n is power of 2; print YES or NO.',
        banglaHint: '`n > 0n && (n & (n - 1n)) === 0n`।',
        starterCode: `import * as fs from 'fs';\nconst n: bigint = BigInt(fs.readFileSync(0, 'utf8').trim());\nconsole.log(n > 0n && (n & (n - 1n)) === 0n ? 'YES' : 'NO');`,
        sampleStdin: '512',
        expectedOutput: 'YES',
      },
      {
        id: 'ts-3-p5',
        difficulty: 'Hard',
        title: '5. Typed Bitmask Flag Inspector',
        prompt: 'Given mask (0..7), print 3 bits `R W X` as 1 or 0.',
        banglaHint: '`(mask & 1)`, `(mask & 2)`, `(mask & 4)` চেক করো।',
        starterCode: `import * as fs from 'fs';\nconst m: number = Number(fs.readFileSync(0, 'utf8').trim());\nconsole.log(\`\${m & 1 ? 1 : 0} \${m & 2 ? 1 : 0} \${m & 4 ? 1 : 0}\`);`,
        sampleStdin: '6',
        expectedOutput: '0 1 1',
      },
    ],
    miniBuild: {
      title: 'TypeScript 5.x Type-Safe Bit & Modulo Evaluator',
      description: 'Combines typed stdin parsing, exhaustive union switch, and `bigint` bit-tricks.',
      banglaGoal: 'TS 5.x ইউনিয়ন ন্যারোয়িং ও BigInt বিটমাস্ক মিলিয়ে টাইপ-সেফ ইভ্যালুয়েটর।',
      combinesChapters: 'Ch 1 (fs) + Ch 2 (Types) + Ch 3 (Narrowing & Bitwise)',
      starterCode: `import * as fs from 'fs';

const [aStr, mStr] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/);
const a: bigint = BigInt(aStr ?? '0');
const m: bigint = BigInt(mStr ?? '1');
if (m <= 0n) {
  console.log('ERR');
} else {
  const rem: bigint = ((a % m) + m) % m;
  const pow2: number = a > 0n && (a & (a - 1n)) === 0n ? 1 : 0;
  console.log(\`mod=\${rem} pow2=\${pow2}\`);
}`,
      sampleStdin: '-7 5',
      expectedOutput: 'mod=3 pow2=0',
    },
  },

  html: {
    title: 'HTML5 Chapter 3: Conditional UI (`:has()`, `<details>`) & Interactive Bitmask Control',
    banglaTitle: 'HTML5 অধ্যায় ৩: কন্ডিশনাল UI (`:has()`, `<details>`) ও বিটমাস্ক কন্ট্রোল',
    subtitle: 'Build zero-JS conditional UI with CSS `:has()` + `<input type="checkbox">` bit flags and interactive DOM decision flows.',
    zeroIntuition: {
      plainEnglishStory:
        'In HTML5 & modern CSS, checkboxes and radio buttons act like physical binary bits (checked = `1`, unchecked = `0`)! Combined with CSS `:has(:checked)` and native `<details>/<summary>` disclosure widgets, the browser itself evaluates control-flow branches visually—before JavaScript even runs.',
      asciiFlowchart: `  [ Checkbox Bit 0 (READ=1) ] --\\
  [ Checkbox Bit 1 (WRITE=2)] ---+--> [ Bitwise OR Mask = 0..7 ] --> [ <output> Live UI ]
  [ Checkbox Bit 2 (ADMIN=4)] --/`,
      pseudocode: [
        '1. RENDER 3 semantic checkboxes for bits 1, 2, and 4',
        '2. STYLE parent card conditionally using CSS :has(input:checked)',
        '3. COMPUTE mask |= Number(cb.value) inside DOM script',
        '4. UPDATE <output> element with binary + decimal mask',
      ],
      banglaZeroToHero: {
        analogyTitle: 'চেকবক্স সুইচবোর্ড ও CSS `:has()` (ওয়েবে Control Flow)',
        explanation:
          'HTML5-এ প্রতিটি চেকবক্স যেন এক-একটি বিট! টিক চিহ্ন দেওয়া মানে `1`, না দেওয়া মানে `0`। আধুনিক CSS-এ `:has(:checked)` দিয়ে তুমি এক লাইন JS না লিখেও কন্ডিশনাল স্টাইল বদলাতে পারো—আর সামান্য স্ক্রিপ্ট যোগ করলেই `<output>` ট্যাগে লাইভ বিটমাস্ক ক্যালকুলেটর হয়ে যায়!',
        everydayExample:
          'ফর্মের "I agree to terms" চেকবক্সে টিক না দিলে সাবমিট বাটন লাল/বন্ধ থাকে, আর টিক দিলেই সবুজ হয়—এটাই ওয়েবে `if/else`!',
        keyTakeaways: [
          'নেটিভ `<details>` এবং `<summary>` ট্যাগ JS ছাড়াই কলাপ্সিবল (if/else) সেকশন বানায়।',
          'CSS `:has(input:checked)` প্যারেন্ট এলিমেন্টকে চাইল্ডের স্টেট অনুযায়ী স্টাইল বদলাতে দেয়।',
          'ফলাফল দেখাতে `<output>` এলিমেন্ট ব্যবহার করা HTML5-এর সেরা সিমান্টিক অভ্যাস।',
        ],
      },
    },
    codeExamples: [
      {
        id: 'html-3-ex-basic',
        tier: 'Basic',
        title: '1. Basic: Native `<details>` Toggle (Zero-JS Control Flow)',
        banglaNote: 'কোনো JS ছাড়াই নেটিভ HTML5 কন্ডিশনাল প্যানেল।',
        code: `<!doctype html>
<html lang="en">
<body style="font-family:system-ui;background:#0f172a;color:#f8fafc;padding:24px;">
  <details open style="border:1px solid #334155;border-radius:10px;padding:14px;max-width:420px;">
    <summary style="cursor:pointer;font-weight:700;color:#38bdf8;">Toggle Bitwise Rule</summary>
    <p style="margin-top:8px;color:#cbd5e1;">n &amp; 1 checks parity in 1 CPU cycle!</p>
  </details>
</body>
</html>`,
        stdin: '',
        expectedOutput: 'Toggle Bitwise Rule',
      },
      {
        id: 'html-3-ex-edge',
        tier: 'Edge-Case',
        title: '2. Edge-Case: CSS `:has(:checked)` Conditional Card',
        banglaNote: 'চেকবক্স অন হলেই প্যারেন্ট কার্ডের রং ও বার্তা স্বয়ংক্রিয়ভাবে বদলে যায়।',
        code: `<!doctype html>
<html lang="en">
<head>
  <style>
    body { font-family: system-ui; background: #090d16; color: #f8fafc; padding: 24px; }
    .gate { border: 2px solid #475569; padding: 16px; border-radius: 12px; max-width: 380px; }
    .gate:has(input:checked) { border-color: #10b981; background: #064e3b33; }
    .msg { display: none; color: #34d399; margin-top: 8px; font-weight: 600; }
    .gate:has(input:checked) .msg { display: block; }
  </style>
</head>
<body>
  <div class="gate">
    <label><input type="checkbox" checked /> Guard Condition Passed (m &gt; 0)</label>
    <div class="msg">Safe Branch Active!</div>
  </div>
</body>
</html>`,
        stdin: '',
        expectedOutput: 'Safe Branch Active!',
      },
      {
        id: 'html-3-ex-opt',
        tier: 'Optimized',
        title: '3. Optimized: Live Semantic `<output>` Bitmask Inspector',
        banglaNote: 'চেকবক্স বিট ১, ২, ৪ যোগ করে `<output>` ট্যাগে রিয়েল-টাইম বিটমাস্ক দেখায়।',
        code: `<!doctype html>
<html lang="en">
<body style="font-family:system-ui;background:#0f172a;color:#f8fafc;padding:24px;">
  <form oninput="let m=0;document.querySelectorAll('.b:checked').forEach(c=>m|=+c.value);out.value='Mask='+m+' (0b'+m.toString(2).padStart(3,'0')+')'">
    <label><input class="b" type="checkbox" value="1" checked /> READ (1)</label>
    <label><input class="b" type="checkbox" value="2" /> WRITE (2)</label>
    <label><input class="b" type="checkbox" value="4" checked /> ADMIN (4)</label>
    <p><output id="out" style="font-family:monospace;color:#38bdf8;font-weight:700;">Mask=5 (0b101)</output></p>
  </form>
</body>
</html>`,
        stdin: '',
        expectedOutput: 'Mask=5',
      },
      {
        id: 'html-3-ex-cp',
        tier: 'CP Trick',
        title: '4. CP Trick: Interactive Safe-Mod & Power-of-2 Widget',
        banglaNote: 'ওয়েবে লাইভ `((a % m) + m) % m` ও পাওয়ার-অফ-২ টেস্টার।',
        code: `<!doctype html>
<html lang="en">
<body style="font-family:system-ui;background:#090d16;color:#f8fafc;padding:24px;">
  <div style="border:1px solid #334155;padding:16px;border-radius:12px;max-width:420px;">
    <h3 style="margin:0 0 8px;color:#38bdf8;">Live Bit &amp; Mod Tester</h3>
    <p id="res" style="font-family:monospace;color:#34d399;"></p>
  </div>
  <script>
    const a = -7, m = 5, n = 64;
    const mod = ((a % m) + m) % m;
    const pow2 = n > 0 && (n & (n - 1)) === 0;
    document.getElementById('res').textContent = \`mod(-7,5)=\${mod} | pow2(64)=\${pow2}\`;
  </script>
</body>
</html>`,
        stdin: '',
        expectedOutput: 'mod(-7,5)=3',
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 1-2 (Edge)',
        codeSnippet: '.gate:has(input:checked)',
        whatItMeans: 'Modern CSS relational selector matching `.gate` only when its child checkbox is checked.',
        whyItIsThere: 'Executes visual conditional branching natively in the browser layout engine.',
        ifDeletedError: 'Card stays grey even when the guard condition checkbox is ticked.',
      },
      {
        lineNumber: 'Line 4 (Opt)',
        codeSnippet: '<form oninput="...">',
        whatItMeans: 'Inline event handler firing whenever any checkbox bit inside the form changes.',
        whyItIsThere: 'Recalculates `m |= +c.value` instantaneously on every click.',
        ifDeletedError: '`<output>` remains frozen on initial value.',
      },
      {
        lineNumber: 'Line 8 (Opt)',
        codeSnippet: '<output id="out">',
        whatItMeans: 'HTML5 semantic element representing the result of a user calculation.',
        whyItIsThere: 'Screen readers announce live calculation updates cleanly.',
        ifDeletedError: 'Output target is missing (`out` undefined).',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'Initial DOM load', memoryOrStack: 'READ(1)=checked, ADMIN(4)=checked', note: 'm = 1 | 4 = 5' },
      { step: 2, state: 'User toggles WRITE(2)', memoryOrStack: 'm = 5 | 2 = 7', note: 'Binary 0b111' },
      { step: 3, state: 'CSS :has(:checked) match', memoryOrStack: 'Emerald border active', note: 'Zero-JS repaint' },
      { step: 4, state: 'User unchecks ADMIN(4)', memoryOrStack: 'm = 7 ^ 4 = 3', note: '<output> updates live to Mask=3 (0b011)' },
    ],
    harryBugTraps: [
      {
        title: 'String Concatenation Instead of Bitwise OR (`+c.value` missing `+`)',
        brokenCode: 'm = m + c.value; // "0" + "1" -> "01"!',
        fixedCode: 'm |= Number(c.value);',
        whyItBreaks: 'HTML `.value` is always a string; `+` concatenates unless converted to Number.',
      },
      {
        title: 'Using `div` Instead of `<button>` or `<label>`',
        brokenCode: '<div onclick="toggle()">Click</div> // Not keyboard accessible!',
        fixedCode: '<label><input type="checkbox" /> Toggle</label>',
        whyItBreaks: 'Keyboard Tab and Spacebar fail on clickable `<div>` elements.',
      },
      {
        title: 'Missing `<output>` Semantic Association',
        brokenCode: '<span id="res"></span>',
        fixedCode: '<output id="res" for="a b"></output>',
        whyItBreaks: 'Assistive tech cannot tell that a generic span holds a calculated result.',
      },
    ],
    practiceSheet: [
      {
        id: 'html-3-p1',
        difficulty: 'Easy',
        title: '1. Native `<details>` Accordion',
        prompt: 'Create a `<details>` card with `<summary>Show Hint</summary>` and a hidden paragraph.',
        banglaHint: '`<details><summary>...</summary><p>...</p></details>`।',
        starterCode: `<!doctype html>\n<html><body style="background:#0f172a;color:#f8fafc;padding:20px;font-family:system-ui;">\n  <details open><summary>Show Hint</summary><p>Bitwise AND tests parity!</p></details>\n</body></html>`,
        sampleStdin: '',
        expectedOutput: 'Show Hint',
      },
      {
        id: 'html-3-p2',
        difficulty: 'Easy',
        title: '2. Semantic `<output>` Sum',
        prompt: 'Render `<output>Result: 42</output>` inside a dark card.',
        banglaHint: '`<output>` ট্যাগ ব্যবহার করো।',
        starterCode: `<!doctype html>\n<html><body style="background:#0f172a;color:#38bdf8;padding:20px;font-family:monospace;">\n  <output>Result: 42</output>\n</body></html>`,
        sampleStdin: '',
        expectedOutput: 'Result: 42',
      },
      {
        id: 'html-3-p3',
        difficulty: 'Medium',
        title: '3. CSS `:has()` Conditional Highlight',
        prompt: 'Use `.box:has(input:checked)` to turn background emerald when checked.',
        banglaHint: '`:has(input:checked)` সিলেক্টর ব্যবহার করো।',
        starterCode: `<!doctype html>\n<html><head><style>.box{padding:12px;border:2px solid #475569;color:#fff;background:#0f172a}.box:has(input:checked){border-color:#10b981;background:#064e3b}</style></head>\n<body><div class="box"><label><input type="checkbox" checked /> Verified</label></div></body></html>`,
        sampleStdin: '',
        expectedOutput: 'Verified',
      },
      {
        id: 'html-3-p4',
        difficulty: 'Medium',
        title: '4. Live Bitwise Parity Badge',
        prompt: 'Compute `(27 & 1) === 0 ? "EVEN" : "ODD"` in `<script>` and write to DOM.',
        banglaHint: '`textContent` দিয়ে DOM-এ লিখো।',
        starterCode: `<!doctype html>\n<html><body style="background:#090d16;color:#34d399;font-family:monospace;padding:20px;">\n  <output id="o"></output>\n  <script>document.getElementById('o').textContent=(27&1)===0?'EVEN':'ODD';</script>\n</body></html>`,
        sampleStdin: '',
        expectedOutput: 'ODD',
      },
      {
        id: 'html-3-p5',
        difficulty: 'Hard',
        title: '5. 3-Bit Permission Simulator',
        prompt: 'Render checkboxes for bits 1, 2, 4 and compute `Mask=5 (0b101)` live.',
        banglaHint: '`form oninput` বা event listener ব্যবহার করো।',
        starterCode: `<!doctype html>\n<html><body style="background:#0f172a;color:#fff;font-family:system-ui;padding:20px;">\n  <output id="out">Mask=5 (0b101)</output>\n</body></html>`,
        sampleStdin: '',
        expectedOutput: 'Mask=5 (0b101)',
      },
    ],
    miniBuild: {
      title: 'HTML5 Conditional Permission Gate & Bitmask Lab',
      description: 'Combines HTML5 `<details>`, CSS `:has()`, semantic `<output>`, and interactive JS bitwise flags.',
      banglaGoal: 'HTML5 `<details>`, `:has()` ও লাইভ বিটমাস্ক ক্যালকুলেটর একত্র করা।',
      combinesChapters: 'Ch 1 (HTML5) + Ch 2 (Data Attributes) + Ch 3 (CSS :has & Bitwise DOM)',
      starterCode: `<!doctype html>
<html lang="en">
<head>
  <style>
    body { font-family: system-ui; background: #090d16; color: #f8fafc; padding: 24px; }
    .panel { max-width: 440px; border: 1px solid #334155; border-radius: 12px; padding: 18px; background: #0f172a; }
    .panel:has(.admin:checked) { border-color: #38bdf8; }
  </style>
</head>
<body>
  <section class="panel">
    <h2 style="margin:0 0 10px;color:#38bdf8;">Permission Bitmask Lab</h2>
    <form oninput="let m=0;document.querySelectorAll('.bit:checked').forEach(x=>m|=+x.value);out.value='Mask='+m+' (0b'+m.toString(2).padStart(3,'0')+')'">
      <label><input class="bit" type="checkbox" value="1" checked /> Read (1)</label>
      <label><input class="bit" type="checkbox" value="2" /> Write (2)</label>
      <label><input class="bit admin" type="checkbox" value="4" checked /> Admin (4)</label>
      <p><output id="out" style="font-family:monospace;color:#34d399;font-weight:700;">Mask=5 (0b101)</output></p>
    </form>
  </section>
</body>
</html>`,
      sampleStdin: '',
      expectedOutput: 'Mask=5',
    },
  },
};
