import type { DeepChapterContent } from './deepChapter1';
import type { LanguageId } from '../types/academy';

export const DEEP_CHAPTER_5: Record<LanguageId, DeepChapterContent> = {
  c: {
    title: 'C Chapter 5 (C23): Functions, Call Stack Frames, Recursion & Milestone Merger 1',
    banglaTitle: 'C অধ্যায় ৫ (C23): ফাংশন, কল স্ট্যাক, রিকার্শন ও মাইলস্টোন প্রজেক্ট ১',
    subtitle: 'Master pass-by-value vs pointer pass, LIFO Call Stack frames, recursive base cases, binary exponentiation O(log b), and Euclidean GCD.',
    zeroIntuition: {
      plainEnglishStory:
        'A Function is a reusable specialist sub-program with its own private desk (a Stack Frame) on the Call Stack. When `main()` calls `gcd(48, 18)`, the CPU pauses `main`, pushes a fresh frame for `gcd(48, 18)` onto the stack, then `gcd(18, 12)`, down to the Base Case `gcd(6, 0)`—then pops each frame in LIFO (Last-In, First-Out) order back to `main()`. Without a Base Case, stack frames pile up until Stack Overflow (SIGSEGV)!',
      asciiFlowchart: `    CALL STACK GROWS DOWN / LIFO
    +---------------------------+
    | main() paused at call     |
    +---------------------------+
             | calls gcd(48, 18)
             v
    +---------------------------+
    | gcd(a=48, b=18) -> waits  |
    +---------------------------+
             | calls gcd(18, 12)
             v
    +---------------------------+
    | gcd(a=18, b=12) -> waits  |
    +---------------------------+
             | calls gcd(12, 6) -> gcd(6, 0) [BASE CASE! returns 6]
             ^
             | unwinds 6 back to main()`,
      pseudocode: [
        '1. DEFINE function signature with explicit parameter types and return type',
        '2. WRITE Base Case FIRST (e.g., if b == 0 return a) to stop infinite recursion',
        '3. MAKE recursive step strictly smaller toward Base Case (e.g., gcd(b, a % b))',
        '4. WATCH stack depth: >10^5 recursive calls risk Stack Overflow—switch to O(log b) or iterative loop',
        '5. MILESTONE MERGER 1: Combine Ch 1 I/O + Ch 2 64-bit types + Ch 3 bitwise/mod + Ch 4 loop + Ch 5 recursive GCD & Fast Power',
      ],
      banglaZeroToHero: {
        analogyTitle: 'একটির ভেতর আরেকটি টিফিন বক্স ও বিয়ের থালার স্তূপ (Call Stack & Recursion)',
        explanation:
          'কল্পনা করো তুমি একটা প্লেটের ওপর আরেকটা প্লেট রাখছো (Stack = LIFO)। ফাংশন যখন নিজেকেই নিজে ডাকে (Recursion), তখন প্রতিবার কম্পিউটার র‍্যামে (Stack Memory) একটি করে নতুন প্লেট বা ফ্রেম বসায়। যদি থামার কোনো শর্ত (Base Case) না দাও, তাহলে প্লেট ছাদে ঠেকে ভেঙে যাবে—একেই বলে **Stack Overflow**! আর Base Case-এ পৌঁছালেই ওপর থেকে একে একে সব প্লেট খুলে মূল ফাংশনে উত্তর ফিরে আসে।',
        everydayExample:
          'সিঁড়ি দিয়ে ৫ তলায় উঠে আবার ৫ তলা থেকে ১ তলায় নেমে আসা: ওঠা হলো Recursive Call, ৫ তলায় পৌঁছে থামা হলো Base Case, আর নেমে আসা হলো Return Unwinding!',
        keyTakeaways: [
          'C-তে সাধারণ আর্গুমেন্ট Pass-by-Value (কপি) হয়—মূল ভ্যারিয়েবল বদলাতে চাইলে `&x` ঠিকানা ও `*p` পয়েন্টার পাঠাতে হয়।',
          'Recursion-এ সবসময় সবার আগে Base Case লিখবে যাতে ফাংশন অনন্তকাল না চলে।',
          'Euclidean `gcd(a, b)` এবং Binary Exponentiation `(a^b) % mod` হলো মাত্র `O(log b)` ধাপে কাজ করা সুপারপাওয়ার!',
        ],
      },
    },
    codeExamples: [
      {
        id: 'c-5-ex-basic',
        tier: 'Basic',
        title: '1. Basic: Modular Function With Pass-by-Value & Swap Pointer',
        banglaNote: 'ফাংশন ডিক্লেয়ারেশন, মান রিটার্ন এবং পয়েন্টার দিয়ে আসল ভ্যারিয়েবল সোয়াপ করা।',
        code: `#include <stdio.h>

void swap_ints(int *x, int *y) {
    int tmp = *x;
    *x = *y;
    *y = tmp;
}

int max_of_two(int a, int b) {
    return (a > b) ? a : b;
}

int main(void) {
    int a = 0, b = 0;
    if (scanf("%d %d", &a, &b) != 2) return 0;
    swap_ints(&a, &b);
    printf("swapped=%d,%d max=%d\\n", a, b, max_of_two(a, b));
    return 0;
}`,
        stdin: '12 25',
        expectedOutput: 'swapped=25,12 max=25',
      },
      {
        id: 'c-5-ex-edge',
        tier: 'Edge-Case',
        title: '2. Edge-Case: Negative Guard & Zero Base Case in Factorial',
        banglaNote: 'নেগেটিভ ইনপুটে যেন ইনফিনিট রিকার্শন হয়ে Stack Overflow না হয় সেজন্য Base Case গার্ড।',
        code: `#include <stdio.h>

long long fact_safe(int n) {
    if (n < 0) return -1;       // Guard invalid input
    if (n <= 1) return 1;       // Base case stops recursion
    return (long long)n * fact_safe(n - 1);
}

int main(void) {
    int n = 0;
    if (scanf("%d", &n) != 1) return 0;
    printf("%lld\\n", fact_safe(n));
    return 0;
}`,
        stdin: '0',
        expectedOutput: '1',
      },
      {
        id: 'c-5-ex-opt',
        tier: 'Optimized',
        title: '3. Optimized: Iterative O(log b) Binary Exponentiation (Zero Stack)',
        banglaNote: 'a^b বের করতে b বার গুণ (O(b)) না করে বাইনারি বিট দেখে O(log b) সময়ে এবং O(1) স্ট্যাক মেমোরিতে!',
        code: `#include <stdio.h>

long long mod_pow(long long base, long long exp, long long mod) {
    long long res = 1 % mod;
    base %= mod;
    while (exp > 0) {
        if (exp & 1LL) res = (res * base) % mod;
        base = (base * base) % mod;
        exp >>= 1;
    }
    return res;
}

int main(void) {
    long long a = 0, b = 0, m = 1000000007;
    if (scanf("%lld %lld", &a, &b) != 2) return 0;
    printf("%lld\\n", mod_pow(a, b, m));
    return 0;
}`,
        stdin: '2 10',
        expectedOutput: '1024',
      },
      {
        id: 'c-5-ex-cp',
        tier: 'CP Trick',
        title: '4. CP Trick: Recursive Euclidean GCD & LCM in O(log(min(a,b)))',
        banglaNote: 'মাত্র ২ লাইনের রিকার্শন দিয়ে যেকোনো ৬৪-বিট সংখ্যার গসাগু (GCD) ও ওভারফ্লো-মুক্ত লসাগু (LCM)।',
        code: `#include <stdio.h>

long long gcd(long long a, long long b) {
    return b == 0 ? a : gcd(b, a % b);
}

int main(void) {
    long long a = 0, b = 0;
    if (scanf("%lld %lld", &a, &b) != 2) return 0;
    long long g = gcd(a, b);
    long long lcm = (g == 0) ? 0 : (a / g) * b;
    printf("gcd=%lld lcm=%lld\\n", g, lcm);
    return 0;
}`,
        stdin: '48 18',
        expectedOutput: 'gcd=6 lcm=144',
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 3',
        codeSnippet: 'long long gcd(long long a, long long b) {',
        whatItMeans: 'Function prototype/header accepting two 64-bit integers by value.',
        whyItIsThere: 'Allocates a fresh Stack Frame with local parameters `a` and `b` on each call.',
        ifDeletedError: 'Code cannot be called recursively; compiler fails with undeclared identifier.',
      },
      {
        lineNumber: 'Line 4',
        codeSnippet: 'return b == 0 ? a : gcd(b, a % b);',
        whatItMeans: 'Base case (`b == 0 -> a`) + recursive reduction (`gcd(b, a % b)`).',
        whyItIsThere: 'Shrinks `b` modulo each step until remainder hits 0 in at most O(log(min(a,b))) frames.',
        ifDeletedError: 'Missing return or missing base case causes infinite Stack Overflow crash.',
      },
      {
        lineNumber: 'Line 10',
        codeSnippet: 'long long lcm = (g == 0) ? 0 : (a / g) * b;',
        whatItMeans: 'Divides by `g` BEFORE multiplying by `b`, with a zero-guard.',
        whyItIsThere: 'Prevents `a * b` intermediate 64-bit overflow and guards `0 / 0` crash.',
        ifDeletedError: 'Large inputs like `a=10^12, b=10^12` overflow `long long`!',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'main() calls gcd(48, 18)', memoryOrStack: 'Stack: [main | gcd(48,18)]', note: '48 % 18 = 12' },
      { step: 2, state: 'gcd(48,18) calls gcd(18, 12)', memoryOrStack: 'Stack: [main | g(48,18) | g(18,12)]', note: '18 % 12 = 6' },
      { step: 3, state: 'gcd(18,12) calls gcd(12, 6)', memoryOrStack: 'Stack: [main | ... | g(12,6)]', note: '12 % 6 = 0' },
      { step: 4, state: 'gcd(12,6) calls gcd(6, 0)', memoryOrStack: 'Stack: [... | g(6,0)] BASE CASE', note: 'b == 0 -> returns 6' },
      { step: 5, state: 'Frames pop LIFO back to main()', memoryOrStack: 'Stack: [main], g = 6', note: 'lcm = (48 / 6) * 18 = 144' },
    ],
    harryBugTraps: [
      {
        title: 'Missing Base Case Causes Stack Overflow (SIGSEGV)',
        brokenCode: `int countDown(int n) {\n    return countDown(n - 1);\n}`,
        fixedCode: `int countDown(int n) {\n    if (n <= 0) return 0;\n    return 1 + countDown(n - 1);\n}`,
        whyItBreaks: 'Without `if (n <= 0)`, stack frames exhaust the 1–8 MB OS call stack and crash immediately.',
      },
      {
        title: 'Expecting Pass-by-Value Swap to Modify Caller Variables',
        brokenCode: `void swap(int a, int b) { int t = a; a = b; b = t; }`,
        fixedCode: `void swap(int *a, int *b) { int t = *a; *a = *b; *b = t; }`,
        whyItBreaks: 'Modifying local copies inside `swap` leaves `main()` variables untouched once the frame pops.',
      },
      {
        title: 'Multiplying Before Dividing in LCM (`a * b / gcd`)',
        brokenCode: `long long lcm = (a * b) / gcd(a, b);`,
        fixedCode: `long long lcm = (a / gcd(a, b)) * b;`,
        whyItBreaks: '`a * b` can overflow `LLONG_MAX` even when the final LCM fits inside 64-bit `long long`!',
      },
    ],
    practiceSheet: [
      {
        id: 'c-ch-5-q1',
        difficulty: 'Easy',
        title: 'Recursive Sum 1..N',
        prompt: 'Write a recursive function `sum_n(int n)` that returns `1 + 2 + ... + n` with Base Case `n <= 0`.',
        banglaHint: '`if (n <= 0) return 0;` হলো Base Case, আর রিকার্শন হলো `n + sum_n(n - 1)`।',
        starterCode: `#include <stdio.h>\nlong long sum_n(long long n) {\n    if (n <= 0) return 0;\n    return n + sum_n(n - 1);\n}\nint main(void) {\n    long long n = 0;\n    if (scanf("%lld", &n) != 1) return 0;\n    printf("%lld\\n", sum_n(n));\n    return 0;\n}`,
        sampleStdin: '10',
        expectedOutput: '55',
      },
      {
        id: 'c-ch-5-q2',
        difficulty: 'Easy',
        title: 'Recursive Power Function',
        prompt: 'Write `power(base, exp)` recursively for `exp >= 0` using `base * power(base, exp - 1)`.',
        banglaHint: '`exp == 0` হলে ১ রিটার্ন করো।',
        starterCode: `#include <stdio.h>\nlong long power(long long b, int e) {\n    if (e <= 0) return 1;\n    return b * power(b, e - 1);\n}\nint main(void) {\n    long long b = 0; int e = 0;\n    if (scanf("%lld %d", &b, &e) != 2) return 0;\n    printf("%lld\\n", power(b, e));\n    return 0;\n}`,
        sampleStdin: '3 4',
        expectedOutput: '81',
      },
      {
        id: 'c-ch-5-q3',
        difficulty: 'Medium',
        title: 'Recursive Digit Sum',
        prompt: 'Write a recursive function `digit_sum(long long n)` returning the sum of decimal digits of `n`.',
        banglaHint: '`n == 0` হলে ০, নইলে `(n % 10) + digit_sum(n / 10)`।',
        starterCode: `#include <stdio.h>\nlong long digit_sum(long long n) {\n    if (n < 0) n = -n;\n    if (n == 0) return 0;\n    return (n % 10) + digit_sum(n / 10);\n}\nint main(void) {\n    long long n = 0;\n    if (scanf("%lld", &n) != 1) return 0;\n    printf("%lld\\n", digit_sum(n));\n    return 0;\n}`,
        sampleStdin: '9876',
        expectedOutput: '30',
      },
      {
        id: 'c-ch-5-q4',
        difficulty: 'Medium',
        title: 'O(log b) Fast Recursive Power (Divide & Conquer)',
        prompt: 'Compute `(a^b) % 1000000007` using recursive halving (`half = f(a, b/2)`).',
        banglaHint: '`b` জোড় হলে `half * half`, বিজোড় হলে `half * half % mod * a % mod`!',
        starterCode: `#include <stdio.h>\nlong long fpow(long long a, long long b, long long m) {\n    if (b == 0) return 1 % m;\n    long long h = fpow(a, b / 2, m);\n    long long sq = (h * h) % m;\n    return (b & 1LL) ? (sq * (a % m)) % m : sq;\n}\nint main(void) {\n    long long a = 0, b = 0;\n    if (scanf("%lld %lld", &a, &b) != 2) return 0;\n    printf("%lld\\n", fpow(a, b, 1000000007LL));\n    return 0;\n}`,
        sampleStdin: '2 20',
        expectedOutput: '1048576',
      },
      {
        id: 'c-ch-5-q5',
        difficulty: 'Hard',
        title: 'Fibonacci With Memoization (Avoids O(2^n) TLE)',
        prompt: 'Compute `fib(n)` for `n <= 50` in O(n) using a static memo array instead of exponential O(2^n) recursion.',
        banglaHint: 'ইতোমধ্যে হিসাব করা মান `memo[n]`-এ সেভ রাখলে একই সাব-প্রবলেম বারবার ক্যালকুলেট হয় না!',
        starterCode: `#include <stdio.h>\nlong long memo[93];\nlong long fib(int n) {\n    if (n <= 1) return n;\n    if (memo[n] != 0) return memo[n];\n    return memo[n] = fib(n - 1) + fib(n - 2);\n}\nint main(void) {\n    int n = 0;\n    if (scanf("%d", &n) != 1) return 0;\n    printf("%lld\\n", fib(n));\n    return 0;\n}`,
        sampleStdin: '40',
        expectedOutput: '102334155',
      },
    ],
    miniBuild: {
      title: '🔥 Milestone Merger Project 1 (C23): CLI Number Theory & Fast Power Engine',
      description: 'Combines Ch 1 (I/O), Ch 2 (64-bit long long), Ch 3 (bitwise parity & mod), Ch 4 (O(log b) loop), and Ch 5 (recursive GCD + modular power functions).',
      banglaGoal: 'অধ্যায় ১ থেকে ৫-এর সব জ্ঞান একত্র করে একটি পূর্ণাঙ্গ নাম্বার-থিওরি ও ফাস্ট-পাওয়ার ইঞ্জিন তৈরি করা।',
      combinesChapters: 'Ch 1–5 (Milestone Merger 1)',
      starterCode: `#include <stdio.h>

long long gcd(long long a, long long b) {
    return b == 0 ? a : gcd(b, a % b);
}

long long mod_pow(long long base, long long exp, long long mod) {
    long long res = 1 % mod;
    base = ((base % mod) + mod) % mod;
    while (exp > 0) {
        if (exp & 1LL) res = (res * base) % mod;
        base = (base * base) % mod;
        exp >>= 1;
    }
    return res;
}

int main(void) {
    long long a = 0, b = 0, mod = 0;
    if (scanf("%lld %lld %lld", &a, &b, &mod) != 3 || mod <= 0) return 0;
    long long g = gcd(a, b);
    long long p = mod_pow(a, b, mod);
    printf("gcd=%lld pow_mod=%lld parity=%s\\n", g, p, (p & 1LL) ? "ODD" : "EVEN");
    return 0;
}`,
      sampleStdin: '12 18 1000',
      expectedOutput: 'gcd=6 pow_mod=904 parity=EVEN',
    },
  },
  cpp: {
    title: 'C++ Chapter 5 (C++23): Functions, Call Stack, Recursion & Milestone Merger 1',
    banglaTitle: 'C++ অধ্যায় ৫ (C++23): ফাংশন, কল স্ট্যাক, রিকার্শন ও মাইলস্টোন প্রজেক্ট ১',
    subtitle: 'Master pass-by-value vs const reference, Call Stack frames, recursive base cases, constexpr functions, and Milestone Merger 1.',
    zeroIntuition: {
      plainEnglishStory:
        'In C++23, functions give you modular abstraction with zero runtime penalty when inlined (`constexpr` / `inline`), while `const T&` avoids expensive heap copies. Understanding Call Stack frames lets you write bug-free recursion and decide when an iterative O(log b) loop beats deep stack recursion.',
      asciiFlowchart: `    CALL STACK (LIFO)
    [ main() ] ---> calls gcd(48, 18)
                      |--> calls gcd(18, 12)
                             |--> calls gcd(12, 6)
                                    |--> calls gcd(6, 0) [Base Case -> 6]
    <--- returns 6 all the way back to main()`,
      pseudocode: [
        '1. PASS primitives by value and large containers by `const &`',
        '2. GUARD Base Case on the very first line of every recursive function',
        '3. CACHE repeated subproblems (memoization) to turn O(2^n) into O(n)',
        '4. USE iterative O(log b) binary exponentiation for exponent up to 10^18',
        '5. MERGE Ch 1–5 into the CLI Number Theory & Fast Power Engine',
      ],
      banglaZeroToHero: {
        analogyTitle: 'ফোন কলের হোল্ড লিস্ট ও ফ্রেম স্ট্যাক (C++ Functions & Recursion)',
        explanation:
          'ধরো তুমি `main` থেকে আম্মুকে কল দিলে, আম্মু লাইন হোল্ডে রেখে খালাকে কল দিলেন, খালা মামাকে! মামা উত্তর দেওয়ার পরেই কেবল খালা আম্মুকে এবং আম্মু তোমাকে উত্তর দিতে পারবেন। রিকার্শনেও ফাংশনগুলো র‍্যামে ঠিক এভাবে একটার ওপর একটা জমে থাকে যতক্ষণ না Base Case উত্তর দেয়!',
        everydayExample:
          'বড় কোনো ব্যাগ কাউকে দেখাতে চাইলে ফটোকপি না করে (`pass-by-value`) শুধু দেখার অনুমতি (`const vector<int>&`) দিলে মেমোরি ও সময় দুটোই বাঁচে।',
        keyTakeaways: [
          'বড় ডেটা (string, vector) ফাংশনে পাঠাতে সবসময় `const auto&` ব্যবহার করো, আর পরিবর্তন করতে হলে `auto&`।',
          'C++23-তে `constexpr` ফাংশন কম্পাইল-টাইমেই হিসাব সেরে ফেলে!',
          'রিকার্শনের ভেতর Memoization (`vector<long long> memo`) যোগ করলে TLE থেকে বাঁচা যায়।',
        ],
      },
    },
    codeExamples: [
      {
        id: 'cpp-5-ex-basic',
        tier: 'Basic',
        title: '1. Basic: Pass-by-Reference Swap & constexpr Helper',
        banglaNote: 'C++ রেফারেন্স (&) দিয়ে পয়েন্টার সিনট্যাক্স ছাড়াই নিরাপদ সোয়াপ ও constexpr হেল্পার।',
        code: `#include <iostream>
using namespace std;

constexpr long long square(long long x) {
    return x * x;
}

void swap_refs(long long &a, long long &b) {
    long long tmp = a;
    a = b;
    b = tmp;
}

int main() {
    long long a = 0, b = 0;
    if (!(cin >> a >> b)) return 0;
    swap_refs(a, b);
    cout << a << " " << b << " sq=" << square(a) << "\\n";
    return 0;
}`,
        stdin: '3 7',
        expectedOutput: '7 3 sq=49',
      },
      {
        id: 'cpp-5-ex-edge',
        tier: 'Edge-Case',
        title: '2. Edge-Case: Negative Base Case Guard in Recursion',
        banglaNote: 'নেগেটিভ সংখ্যা দিলে ফাংশন যেন অসীম রিকার্শনে না যায় তার গার্ড।',
        code: `#include <iostream>
using namespace std;

long long fact_safe(int n) {
    if (n < 0) return -1;
    if (n <= 1) return 1;
    return n * fact_safe(n - 1);
}

int main() {
    int n = 0;
    if (!(cin >> n)) return 0;
    cout << fact_safe(n) << "\\n";
    return 0;
}`,
        stdin: '-5',
        expectedOutput: '-1',
      },
      {
        id: 'cpp-5-ex-opt',
        tier: 'Optimized',
        title: '3. Optimized: Memoized Fibonacci O(n) vs Exponential O(2^n)',
        banglaNote: 'একই মান বারবার হিসাব না করে vector মেমোতে সেভ রেখে O(n) সময়ে সমাধান।',
        code: `#include <iostream>
#include <vector>
using namespace std;

long long fib_memo(int n, vector<long long> &memo) {
    if (n <= 1) return n;
    if (memo[n] != -1) return memo[n];
    return memo[n] = fib_memo(n - 1, memo) + fib_memo(n - 2, memo);
}

int main() {
    int n = 0;
    if (!(cin >> n) || n < 0) return 0;
    vector<long long> memo(n + 1, -1);
    cout << fib_memo(n, memo) << "\\n";
    return 0;
}`,
        stdin: '40',
        expectedOutput: '102334155',
      },
      {
        id: 'cpp-5-ex-cp',
        tier: 'CP Trick',
        title: '4. CP Trick: Recursive GCD & O(log b) Modular Exponentiation',
        banglaNote: 'বিটওয়াইজ `(exp & 1)` ও `gcd(b, a % b)` ব্যবহার করে O(log b) গণনা।',
        code: `#include <iostream>
using namespace std;

long long gcd(long long a, long long b) {
    return b == 0 ? a : gcd(b, a % b);
}

long long mod_pow(long long base, long long exp, long long mod) {
    long long res = 1 % mod;
    base = ((base % mod) + mod) % mod;
    while (exp > 0) {
        if (exp & 1LL) res = (res * base) % mod;
        base = (base * base) % mod;
        exp >>= 1;
    }
    return res;
}

int main() {
    long long a = 0, b = 0;
    if (!(cin >> a >> b)) return 0;
    cout << gcd(a, b) << " " << mod_pow(a, b, 1000000007LL) << "\\n";
    return 0;
}`,
        stdin: '48 18',
        expectedOutput: '6 171755684',
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 4',
        codeSnippet: 'long long gcd(long long a, long long b) {',
        whatItMeans: 'Recursive 64-bit Euclidean GCD signature.',
        whyItIsThere: 'Each call pushes a minimal stack frame holding `a` and `b`.',
        ifDeletedError: 'Cannot invoke `gcd` in `main`.',
      },
      {
        lineNumber: 'Line 5',
        codeSnippet: 'return b == 0 ? a : gcd(b, a % b);',
        whatItMeans: 'Base case stops when remainder `b == 0`; else reduces problem size.',
        whyItIsThere: 'Guarantees termination in <= 2 * log2(min(a,b)) frames.',
        ifDeletedError: 'Infinite recursion triggers SIGSEGV Stack Overflow.',
      },
      {
        lineNumber: 'Line 11',
        codeSnippet: 'if (exp & 1LL) res = (res * base) % mod;',
        whatItMeans: 'Multiplies current power of base into `res` when LSB of `exp` is 1.',
        whyItIsThere: 'Halves exponent every step so `exp = 10^18` runs in just 60 loop iterations.',
        ifDeletedError: 'Odd powers are dropped and result stays wrong.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'main() calls gcd(48, 18)', memoryOrStack: 'Stack: [main | gcd(48,18)]', note: 'Push frame 1' },
      { step: 2, state: 'gcd(48,18) -> gcd(18, 12)', memoryOrStack: 'Stack: [main | g(48,18) | g(18,12)]', note: 'Push frame 2' },
      { step: 3, state: 'gcd(18,12) -> gcd(12, 6)', memoryOrStack: 'Stack: [... | g(12,6)]', note: 'Push frame 3' },
      { step: 4, state: 'gcd(12,6) -> gcd(6, 0)', memoryOrStack: 'Stack: [... | g(6,0)] BASE CASE', note: 'Returns 6 immediately' },
      { step: 5, state: 'Stack unwinds to main()', memoryOrStack: 'Stack: [main], ans = 6', note: 'All child frames popped' },
    ],
    harryBugTraps: [
      {
        title: 'Passing Large std::vector By Value Inside Recursion',
        brokenCode: `int dfs(vector<int> arr, int i) { /* copies entire vector per call! */ }`,
        fixedCode: `int dfs(const vector<int> &arr, int i) { /* O(1) reference */ }`,
        whyItBreaks: 'Copying a 10^5 vector on 10^5 recursive calls explodes to O(n^2) RAM & Time!',
      },
      {
        title: 'Naive Exponential Fibonacci Without Memoization',
        brokenCode: `long long fib(int n) { return n <= 1 ? n : fib(n-1) + fib(n-2); }`,
        fixedCode: `long long fib(int n, vector<long long> &dp) { /* cache in dp[n] */ }`,
        whyItBreaks: '`fib(45)` makes >2 billion redundant recursive calls and triggers TLE.',
      },
      {
        title: 'Base Overflow Before `% mod` in Binary Exponentiation',
        brokenCode: `base = base * base % mod; // if base >= 10^10, base*base overflows 64-bit!`,
        fixedCode: `base %= mod;\nbase = (base * base) % mod;`,
        whyItBreaks: 'Reducing `base %= mod` upfront keeps `base < 10^9`, so `base * base < 10^18` fits safely in `long long`.',
      },
    ],
    practiceSheet: [
      {
        id: 'cpp-ch-5-q1',
        difficulty: 'Easy',
        title: 'Recursive Sum 1..N',
        prompt: 'Write a recursive `sumN(long long n)` function returning `1 + ... + n`.',
        banglaHint: '`n <= 0` হলে `0`, নইলে `n + sumN(n - 1)` রিটার্ন করো।',
        starterCode: `#include <iostream>\nusing namespace std;\nlong long sumN(long long n) { return n <= 0 ? 0 : n + sumN(n - 1); }\nint main() {\n    long long n = 0;\n    if (cin >> n) cout << sumN(n) << "\\n";\n    return 0;\n}`,
        sampleStdin: '10',
        expectedOutput: '55',
      },
      {
        id: 'cpp-ch-5-q2',
        difficulty: 'Easy',
        title: 'In-Place Reference Doubler',
        prompt: 'Write `void scale_by_two(long long &x)` and test it on an integer input.',
        banglaHint: 'প্যারামিটারে `&x` নিলে ফাংশন ভেতর থেকে আসল ভ্যারিয়েবল পরিবর্তন করতে পারে।',
        starterCode: `#include <iostream>\nusing namespace std;\nvoid scale_by_two(long long &x) { x *= 2; }\nint main() {\n    long long x = 0;\n    if (cin >> x) { scale_by_two(x); cout << x << "\\n"; }\n    return 0;\n}`,
        sampleStdin: '21',
        expectedOutput: '42',
      },
      {
        id: 'cpp-ch-5-q3',
        difficulty: 'Medium',
        title: 'Recursive Palindrome Array Check',
        prompt: 'Read n and n integers; write a recursive `is_pal(a, l, r)` returning `YES` or `NO`.',
        banglaHint: '`l >= r` হলে `true`; `a[l] != a[r]` হলে `false`; নইলে `is_pal(a, l + 1, r - 1)`।',
        starterCode: `#include <iostream>\n#include <vector>\nusing namespace std;\nbool is_pal(const vector<int> &a, int l, int r) {\n    if (l >= r) return true;\n    if (a[l] != a[r]) return false;\n    return is_pal(a, l + 1, r - 1);\n}\nint main() {\n    int n = 0; if (!(cin >> n)) return 0;\n    vector<int> a(n); for (int &x : a) cin >> x;\n    cout << (is_pal(a, 0, n - 1) ? "YES" : "NO") << "\\n";\n    return 0;\n}`,
        sampleStdin: '5\n1 2 3 2 1',
        expectedOutput: 'YES',
      },
      {
        id: 'cpp-ch-5-q4',
        difficulty: 'Medium',
        title: 'Recursive Binary Power O(log b)',
        prompt: 'Compute `(a^b) % 1000000007` using recursive divide-and-conquer.',
        banglaHint: 'অর্ধেক পাওয়ার একবার ক্যালকুলেট করে স্কয়ার করো—দুবার কল করলে `O(b)` হয়ে যাবে!',
        starterCode: `#include <iostream>\nusing namespace std;\nlong long fpow(long long a, long long b, long long m) {\n    if (b == 0) return 1 % m;\n    long long h = fpow(a, b / 2, m);\n    long long sq = (h * h) % m;\n    return (b & 1LL) ? (sq * (a % m)) % m : sq;\n}\nint main() {\n    long long a = 0, b = 0;\n    if (cin >> a >> b) cout << fpow(a, b, 1000000007LL) << "\\n";\n    return 0;\n}`,
        sampleStdin: '2 20',
        expectedOutput: '1048576',
      },
      {
        id: 'cpp-ch-5-q5',
        difficulty: 'Hard',
        title: 'nCr Binomial Coefficient With Modular Inverse',
        prompt: 'Given `n` and `r` (`0 <= r <= n <= 10^5`), compute `C(n, r) % 1000000007` using Fermat Little Theorem (`inv(x) = x^(mod-2)`).',
        banglaHint: '`n! / (r! * (n-r)!) % mod` করতে ভাগ না করে `mod_pow(den, mod - 2, mod)` দিয়ে গুণ করো!',
        starterCode: `#include <iostream>\nusing namespace std;\nconst long long MOD = 1000000007LL;\nlong long mpow(long long a, long long b) {\n    long long r = 1; a %= MOD;\n    while (b > 0) { if (b & 1) r = r * a % MOD; a = a * a % MOD; b >>= 1; }\n    return r;\n}\nint main() {\n    long long n = 0, r = 0; if (!(cin >> n >> r)) return 0;\n    long long num = 1, den = 1;\n    for (long long i = 1; i <= r; ++i) { num = num * (n - i + 1) % MOD; den = den * i % MOD; }\n    cout << (num * mpow(den, MOD - 2)) % MOD << "\\n";\n    return 0;\n}`,
        sampleStdin: '5 2',
        expectedOutput: '10',
      },
    ],
    miniBuild: {
      title: '🔥 Milestone Merger Project 1 (C++23): CLI Number Theory & Fast Power Engine',
      description: 'Combines Ch 1–5: fast I/O, 64-bit types, bitwise parity & negative mod normalization, O(log b) binary exponentiation, and recursive Euclidean GCD.',
      banglaGoal: 'অধ্যায় ১ থেকে ৫-এর সব টেকনিক যুক্ত করে CLI নাম্বার থিওরি ও ফাস্ট পাওয়ার ক্যালকুলেটর তৈরি।',
      combinesChapters: 'Ch 1–5 (Milestone Merger 1)',
      starterCode: `#include <iostream>
using namespace std;

long long gcd(long long a, long long b) {
    return b == 0 ? a : gcd(b, a % b);
}

long long mod_pow(long long base, long long exp, long long mod) {
    long long res = 1 % mod;
    base = ((base % mod) + mod) % mod;
    while (exp > 0) {
        if (exp & 1LL) res = (res * base) % mod;
        base = (base * base) % mod;
        exp >>= 1;
    }
    return res;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    long long a = 0, b = 0, mod = 0;
    if (!(cin >> a >> b >> mod) || mod <= 0) return 0;
    long long g = gcd(a, b);
    long long p = mod_pow(a, b, mod);
    cout << "gcd=" << g << " pow_mod=" << p << " parity=" << ((p & 1LL) ? "ODD" : "EVEN") << "\\n";
    return 0;
}`,
      sampleStdin: '12 18 1000',
      expectedOutput: 'gcd=6 pow_mod=904 parity=EVEN',
    },
  },
  python: {
    title: 'Python Chapter 5 (3.13): Functions, Call Stack, Recursion & Milestone Merger 1',
    banglaTitle: 'Python অধ্যায় ৫ (3.13): ফাংশন, কল স্ট্যাক, রিকার্শন ও মাইলস্টোন প্রজেক্ট ১',
    subtitle: 'Master Python 3.13 def/type hints, Call Stack recursion limit (1000), @lru_cache memoization, pow(a,b,m), and Milestone Merger 1.',
    zeroIntuition: {
      plainEnglishStory:
        'Every `def` call in Python creates a stack frame object on CPython’s call stack. Because Python enforces a default recursion depth limit of ~1,000 frames (`sys.getrecursionlimit()`), deep linear recursion crashes with `RecursionError`! Pairing `@functools.lru_cache` with iterative O(log b) algorithms makes Python 3.13 unstoppable.',
      asciiFlowchart: `    CPYTHON CALL STACK (Max ~1000 frames)
    [ main ] ---> gcd(48, 18)
                    |--> gcd(18, 12)
                           |--> gcd(12, 6)
                                  |--> gcd(6, 0) [Base Case -> 6]
    <--- Frame objects garbage-collected as stack unwinds`,
      pseudocode: [
        '1. DEFINE typed helper functions `def fn(a: int, b: int) -> int:`',
        '2. GUARD Base Case first and avoid mutable default arguments (`def f(arr=[])` bug!)',
        '3. ADD `@lru_cache(maxsize=None)` for overlapping recursive subproblems',
        '4. USE iterative O(log b) loop or built-in `pow(a, b, mod)` when depth > 1000',
        '5. MERGE Ch 1–5 into the CLI Number Theory & Fast Power Engine',
      ],
      banglaZeroToHero: {
        analogyTitle: 'CPython-এর ১০০০ ফ্রেমের সীমা ও @lru_cache জাদু (Python Recursion)',
        explanation:
          'Python-এ ফাংশন নিজেকে প্রায় ১০০০ বারের বেশি ডাকলেই `RecursionError` দিয়ে থেমে যায়! তাই বড় `n`-এর জন্য কখনো গভীর লিনিয়ার রিকার্শন চালাবে না; বরং `O(log b)` রিকার্শন (যেমন `gcd`) অথবা লুপ ব্যবহার করবে। আর ডাইনামিক প্রোগ্রামিংয়ের মতো একই ফাংশন বারবার কল হলে ওপরের লাইনে শুধু `@lru_cache` বসিয়ে দিলেই মুহূর্তেই `O(n)` গতি পাওয়া যায়!',
        everydayExample:
          'পরীক্ষার হলে একই কঠিন অঙ্ক ১০০ বার নতুন করে না কষে রাফ খাতায় একবার লিখে রাখা (`@lru_cache`)—এটাই Memoization!',
        keyTakeaways: [
          'কখনো ফাংশনের ডিফল্ট প্যারামিটারে লিস্ট/ডিক্ট (`def f(x=[])`) দিও না—প্রতি কলে ওটা শেয়ার হয়ে বাগ তৈরি করে; সবসময় `None` দিয়ে শুরু করো।',
          'Python-এর বিল্ট-ইন `pow(a, b, mod)` C-তে লেখা `O(log b)` বাইনারি এক্সপোনেনশিয়েশন!',
          'গভীর রিকার্শনের বদলে লুপ বা `O(log b)` ডিভাইড-এন্ড-কনকার ব্যবহার করলে `RecursionError` হয় না।',
        ],
      },
    },
    codeExamples: [
      {
        id: 'py-5-ex-basic',
        tier: 'Basic',
        title: '1. Basic: Typed Function Returning Tuple & Safe Default Arg',
        banglaNote: 'Python 3.13 টাইপ হিন্ট এবং None ডিফল্ট প্যারামিটার দিয়ে নিরাপদ ফাংশন।',
        code: `import sys

def append_badge(item: int, bucket: list[int] | None = None) -> list[int]:
    if bucket is None:
        bucket = []
    bucket.append(item)
    return bucket

raw = sys.stdin.read().strip()
x = int(raw) if raw else 5
res = append_badge(x)
print(f"len={len(res)} val={res[0]}")`,
        stdin: '42',
        expectedOutput: 'len=1 val=42',
      },
      {
        id: 'py-5-ex-edge',
        tier: 'Edge-Case',
        title: '2. Edge-Case: Guarding Negative / Depth-Safe Base Case',
        banglaNote: 'নেগেটিভ সংখ্যা দিলে RecursionError এড়াতে শুরুর গার্ড ও বেস কেস।',
        code: `import sys

def fact_safe(n: int) -> int:
    if n < 0:
        return -1
    if n <= 1:
        return 1
    return n * fact_safe(n - 1)

raw = sys.stdin.read().strip()
n = int(raw) if raw else 0
print(fact_safe(n))`,
        stdin: '0',
        expectedOutput: '1',
      },
      {
        id: 'py-5-ex-opt',
        tier: 'Optimized',
        title: '3. Optimized: @lru_cache Memoized Fibonacci in O(n)',
        banglaNote: 'মাত্র ১টি ডেকোরেটর @lru_cache দিয়ে O(2^n) রিকার্শনকে O(n) বানানো।',
        code: `import sys
from functools import lru_cache

@lru_cache(maxsize=None)
def fib(n: int) -> int:
    if n <= 1:
        return n
    return fib(n - 1) + fib(n - 2)

raw = sys.stdin.read().strip()
n = int(raw) if raw else 0
print(fib(n))`,
        stdin: '40',
        expectedOutput: '102334155',
      },
      {
        id: 'py-5-ex-cp',
        tier: 'CP Trick',
        title: '4. CP Trick: Recursive Euclidean GCD & O(log b) mod_pow',
        banglaNote: 'O(log b) রিকার্শন দিয়ে গসাগু ও মডুলার পাওয়ার (a^b % mod) বের করা।',
        code: `import sys

def gcd(a: int, b: int) -> int:
    return a if b == 0 else gcd(b, a % b)

def mod_pow(base: int, exp: int, mod: int) -> int:
    res = 1 % mod
    base %= mod
    while exp > 0:
        if exp & 1:
            res = (res * base) % mod
        base = (base * base) % mod
        exp >>= 1
    return res

tokens = list(map(int, sys.stdin.read().split()))
if len(tokens) >= 2:
    a, b = tokens[0], tokens[1]
    print(gcd(a, b), mod_pow(a, b, 1000000007))`,
        stdin: '48 18',
        expectedOutput: '6 171755684',
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 3',
        codeSnippet: 'def gcd(a: int, b: int) -> int:',
        whatItMeans: 'Defines function `gcd` with Python 3.13 type annotations.',
        whyItIsThere: 'Documents integer contract and isolates variables in a fresh stack frame.',
        ifDeletedError: '`NameError: name "gcd" is not defined`.',
      },
      {
        lineNumber: 'Line 4',
        codeSnippet: 'return a if b == 0 else gcd(b, a % b)',
        whatItMeans: 'Single-expression Base Case + tail-like Euclidean reduction.',
        whyItIsThere: 'Terminates in <= 2 * log2(b) frames—never hits Python’s 1000 recursion limit even for 10^100!',
        ifDeletedError: 'Function returns `None` instead of an integer.',
      },
      {
        lineNumber: 'Line 10',
        codeSnippet: 'if exp & 1:',
        whatItMeans: 'Bitwise odd check on current exponent bit.',
        whyItIsThere: 'Applies binary decomposition of `exp` in O(log b) steps.',
        ifDeletedError: 'Loop never multiplies `base` into `res` and always outputs 1.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'Call gcd(48, 18)', memoryOrStack: 'Frames: [module, gcd(48,18)]', note: '48 % 18 = 12' },
      { step: 2, state: 'Call gcd(18, 12)', memoryOrStack: 'Frames: [..., gcd(18,12)]', note: '18 % 12 = 6' },
      { step: 3, state: 'Call gcd(12, 6)', memoryOrStack: 'Frames: [..., gcd(12,6)]', note: '12 % 6 = 0' },
      { step: 4, state: 'Call gcd(6, 0)', memoryOrStack: 'Frames: [..., gcd(6,0)] BASE CASE', note: 'b == 0 -> returns 6' },
      { step: 5, state: 'Unwind frames cleanly', memoryOrStack: 'Frames: [module], g = 6', note: 'mod_pow runs O(log b)' },
    ],
    harryBugTraps: [
      {
        title: 'Mutable Default List Argument Bug (`def add(x, arr=[])`)',
        brokenCode: `def add(x, arr=[]):\n    arr.append(x)\n    return arr`,
        fixedCode: `def add(x, arr=None):\n    if arr is None: arr = []\n    arr.append(x)\n    return arr`,
        whyItBreaks: 'Default `[]` is created ONCE at function definition time and shared across every subsequent call!',
      },
      {
        title: 'Hitting Python’s 1000-Frame RecursionError on Linear Recursion',
        brokenCode: `def sum_n(n): return 0 if n == 0 else n + sum_n(n - 1)\nprint(sum_n(5000))`,
        fixedCode: `n = 5000\nprint(n * (n + 1) // 2)`,
        whyItBreaks: 'Python does not optimize tail calls and raises `RecursionError` at depth ~1000.',
      },
      {
        title: 'Forgetting `return` Inside Recursive Branch',
        brokenCode: `def gcd(a, b):\n    if b == 0: return a\n    gcd(b, a % b)`,
        fixedCode: `def gcd(a, b):\n    if b == 0: return a\n    return gcd(b, a % b)`,
        whyItBreaks: 'Without `return`, the outer call drops the inner return value and evaluates to `None`!',
      },
    ],
    practiceSheet: [
      {
        id: 'py-ch-5-q1',
        difficulty: 'Easy',
        title: 'Recursive Sum 1..N (Small N)',
        prompt: 'Write recursive `sum_n(n)` with Base Case `n <= 0 -> 0`.',
        banglaHint: '`if n <= 0: return 0` লিখে তারপর `return n + sum_n(n - 1)` দাও।',
        starterCode: `import sys\ndef sum_n(n: int) -> int:\n    return 0 if n <= 0 else n + sum_n(n - 1)\nn = int(sys.stdin.read().strip() or 0)\nprint(sum_n(n))`,
        sampleStdin: '10',
        expectedOutput: '55',
      },
      {
        id: 'py-ch-5-q2',
        difficulty: 'Easy',
        title: 'Recursive Power Function',
        prompt: 'Compute `base ** exp` recursively with Base Case `exp <= 0 -> 1`.',
        banglaHint: '`exp == 0` হলে ১, নইলে `base * power(base, exp - 1)`।',
        starterCode: `import sys\ndef power(b: int, e: int) -> int:\n    return 1 if e <= 0 else b * power(b, e - 1)\nb, e = map(int, sys.stdin.read().split())\nprint(power(b, e))`,
        sampleStdin: '3 4',
        expectedOutput: '81',
      },
      {
        id: 'py-ch-5-q3',
        difficulty: 'Medium',
        title: 'Recursive Digit Sum',
        prompt: 'Write `digit_sum(n)` recursively using `abs(n)`, `% 10`, and `// 10`.',
        banglaHint: '`n == 0` হলে ০, নইলে `(n % 10) + digit_sum(n // 10)`।',
        starterCode: `import sys\ndef digit_sum(n: int) -> int:\n    n = abs(n)\n    return 0 if n == 0 else (n % 10) + digit_sum(n // 10)\nprint(digit_sum(int(sys.stdin.read().strip() or 0)))`,
        sampleStdin: '9876',
        expectedOutput: '30',
      },
      {
        id: 'py-ch-5-q4',
        difficulty: 'Medium',
        title: 'O(log b) Recursive Fast Power',
        prompt: 'Implement divide-and-conquer `fpow(a, b, 1000000007)` recursively.',
        banglaHint: 'হিসাব করা অর্ধেক মান একটি লোকাল ভ্যারিয়েবলে রেখে স্কয়ার করো।',
        starterCode: `import sys\ndef fpow(a: int, b: int, m: int) -> int:\n    if b == 0: return 1 % m\n    h = fpow(a, b // 2, m)\n    sq = (h * h) % m\n    return (sq * (a % m)) % m if (b & 1) else sq\na, b = map(int, sys.stdin.read().split())\nprint(fpow(a, b, 1000000007))`,
        sampleStdin: '2 20',
        expectedOutput: '1048576',
      },
      {
        id: 'py-ch-5-q5',
        difficulty: 'Hard',
        title: 'Climbing Stairs With @lru_cache (1 or 2 Steps)',
        prompt: 'Count ways to climb `n` stairs taking 1 or 2 steps at a time using `@lru_cache` in O(n).',
        banglaHint: '`ways(0) = 1, ways(1) = 1`, আর `ways(n) = ways(n-1) + ways(n-2)`!',
        starterCode: `import sys\nfrom functools import lru_cache\n@lru_cache(maxsize=None)\ndef ways(n: int) -> int:\n    if n <= 1: return 1\n    return ways(n - 1) + ways(n - 2)\nprint(ways(int(sys.stdin.read().strip() or 0)))`,
        sampleStdin: '10',
        expectedOutput: '89',
      },
    ],
    miniBuild: {
      title: '🔥 Milestone Merger Project 1 (Python 3.13): CLI Number Theory & Fast Power Engine',
      description: 'Combines Ch 1–5: stdin parsing, arbitrary-precision ints, bitwise parity & negative mod normalization, O(log b) binary exponentiation, and recursive GCD.',
      banglaGoal: 'অধ্যায় ১–৫ মিলিয়ে পূর্ণাঙ্গ Python নাম্বার থিওরি ও ফাস্ট পাওয়ার ইঞ্জিন তৈরি করা।',
      combinesChapters: 'Ch 1–5 (Milestone Merger 1)',
      starterCode: `import sys

def gcd(a: int, b: int) -> int:
    return a if b == 0 else gcd(b, a % b)

def mod_pow(base: int, exp: int, mod: int) -> int:
    res = 1 % mod
    base = ((base % mod) + mod) % mod
    while exp > 0:
        if exp & 1:
            res = (res * base) % mod
        base = (base * base) % mod
        exp >>= 1
    return res

tokens = list(map(int, sys.stdin.read().split()))
if len(tokens) >= 3 and tokens[2] > 0:
    a, b, mod = tokens[0], tokens[1], tokens[2]
    g = gcd(a, b)
    p = mod_pow(a, b, mod)
    parity = "ODD" if (p & 1) else "EVEN"
    print(f"gcd={g} pow_mod={p} parity={parity}")`,
      sampleStdin: '12 18 1000',
      expectedOutput: 'gcd=6 pow_mod=904 parity=EVEN',
    },
  },
  java: {
    title: 'Java Chapter 5 (Java 21): Methods, JVM Stack Frames, Recursion & Milestone Merger 1',
    banglaTitle: 'Java অধ্যায় ৫ (Java 21): মেথড, JVM স্ট্যাক ফ্রেম, রিকার্শন ও মাইলস্টোন প্রজেক্ট ১',
    subtitle: 'Master JVM Stack Frames vs Heap objects, pass-by-value semantics, recursive base cases, O(log b) modPow, and Milestone Merger 1.',
    zeroIntuition: {
      plainEnglishStory:
        'Every Java method call pushes a private Frame onto the JVM Thread Stack holding local primitives and object references. When recursion forgets its Base Case, JVM throws `StackOverflowError`. Mastering method decomposition, `long` recursion with memo arrays, and O(log b) binary exponentiation prepares you for every FAANG coding round.',
      asciiFlowchart: `    JVM THREAD STACK
    [ main(String[] args) ] ---> calls gcd(48, 18)
                                   |--> gcd(18, 12)
                                          |--> gcd(12, 6)
                                                 |--> gcd(6, 0) [Base Case -> 6]
    <--- Stack frames popped back to main()`,
      pseudocode: [
        '1. DECLARE static helper methods cleanly inside `public class Main`',
        '2. GUARD Base Case first so JVM never throws `StackOverflowError`',
        '3. MEMOIZE overlapping recursive states with `long[] memo`',
        '4. USE `long` iterative O(log b) modular power to avoid 32-bit overflow',
        '5. MERGE Ch 1–5 into the CLI Number Theory & Fast Power Engine',
      ],
      banglaZeroToHero: {
        analogyTitle: 'JVM স্ট্যাক ফ্রেম ও মেথড হেল্পার (Java Methods & Recursion)',
        explanation:
          'Java-তে প্রতিটি মেথড কল হওয়ার সময় JVM থ্রেড স্ট্যাকে একটি নতুন বক্স তৈরি হয়। মনে রাখবে Java-তে সবকিছুই Pass-by-Value (এমনকি অবজেক্ট রেফারেন্সেরও কপি পাঠানো হয়)। রিকার্শনে থামার Base Case ঠিকঠাক না থাকলে `StackOverflowError` ক্র্যাশ হয়!',
        everydayExample:
          'মাল্টি-স্টোরি বিল্ডিংয়ে প্রতি তলার কাজ আলাদা ডিপার্টমেন্ট (মেথড)-কে ভাগ করে দিলে যেমন কাজ পরিচ্ছন্ন হয়, তেমনি বড় প্রোগ্রামকে ছোট ছোট মেথডে ভাগ করলে কোড ডিবাগ করা সহজ হয়।',
        keyTakeaways: [
          'Java-তে `int` বা `long` মেথডে পাঠালে কপি হয়, তাই মেথডের ভেতর `a = 10` লিখলে `main`-এর `a` বদলায় না।',
          'ডিফল্ট JVM স্ট্যাক সাইজ সীমিত, তাই `n > 10^4` হলে লিনিয়ার রিকার্শন না লিখে লুপ বা `O(log b)` ব্যবহার করো।',
          'ওভারল্যাপিং রিকার্শনে `long[] memo` অ্যারে রেখে O(n) সময় নিশ্চিত করো।',
        ],
      },
    },
    codeExamples: [
      {
        id: 'java-5-ex-basic',
        tier: 'Basic',
        title: '1. Basic: Modular Static Methods & Pure Helper Return',
        banglaNote: 'ছোট ছোট পিওর মেথড দিয়ে কোড পরিষ্কার ও পুনঃব্যবহারযোগ্য করা।',
        code: `import java.util.Scanner;

public class Main {
    static long maxOfTwo(long a, long b) {
        return Math.max(a, b);
    }

    static long square(long x) {
        return x * x;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextLong()) return;
        long a = sc.nextLong(), b = sc.nextLong();
        long m = maxOfTwo(a, b);
        System.out.println("max=" + m + " sq=" + square(m));
    }
}`,
        stdin: '4 9',
        expectedOutput: 'max=9 sq=81',
      },
      {
        id: 'java-5-ex-edge',
        tier: 'Edge-Case',
        title: '2. Edge-Case: Guarding Negative Input Against StackOverflowError',
        banglaNote: 'নেগেটিভ ইনপুট গার্ড করে StackOverflowError আটকানো।',
        code: `import java.util.Scanner;

public class Main {
    static long factSafe(int n) {
        if (n < 0) return -1;
        if (n <= 1) return 1;
        return n * factSafe(n - 1);
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.hasNextInt() ? sc.nextInt() : 0;
        System.out.println(factSafe(n));
    }
}`,
        stdin: '-3',
        expectedOutput: '-1',
      },
      {
        id: 'java-5-ex-opt',
        tier: 'Optimized',
        title: '3. Optimized: Memoized Fibonacci in O(n)',
        banglaNote: 'Arrays.fill ও memo[] দিয়ে O(2^n) রিকার্শনকে O(n) করা।',
        code: `import java.util.*;

public class Main {
    static long fib(int n, long[] memo) {
        if (n <= 1) return n;
        if (memo[n] != -1) return memo[n];
        return memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.hasNextInt() ? sc.nextInt() : 0;
        long[] memo = new long[n + 1];
        Arrays.fill(memo, -1L);
        System.out.println(fib(n, memo));
    }
}`,
        stdin: '40',
        expectedOutput: '102334155',
      },
      {
        id: 'java-5-ex-cp',
        tier: 'CP Trick',
        title: '4. CP Trick: Recursive Euclidean GCD & O(log b) modPow',
        banglaNote: 'O(log b) সময়ে GCD ও (base^exp) % mod হিসাব করা।',
        code: `import java.util.Scanner;

public class Main {
    static long gcd(long a, long b) {
        return b == 0 ? a : gcd(b, a % b);
    }

    static long modPow(long base, long exp, long mod) {
        long res = 1 % mod;
        base = ((base % mod) + mod) % mod;
        while (exp > 0) {
            if ((exp & 1L) == 1L) res = (res * base) % mod;
            base = (base * base) % mod;
            exp >>= 1;
        }
        return res;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextLong()) return;
        long a = sc.nextLong(), b = sc.nextLong();
        System.out.println(gcd(a, b) + " " + modPow(a, b, 1000000007L));
    }
}`,
        stdin: '48 18',
        expectedOutput: '6 171755684',
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 4',
        codeSnippet: 'static long gcd(long a, long b) {',
        whatItMeans: 'Static method callable directly from `main` without object instantiation.',
        whyItIsThere: 'Creates an isolated JVM stack frame per call.',
        ifDeletedError: 'Compile error: cannot call non-static method from static `main`.',
      },
      {
        lineNumber: 'Line 5',
        codeSnippet: 'return b == 0 ? a : gcd(b, a % b);',
        whatItMeans: 'Base case `b == 0` returns `a`; else recurses on `(b, a % b)`.',
        whyItIsThere: 'Shrinks operands logarithmically.',
        ifDeletedError: 'Compile error: missing return statement.',
      },
      {
        lineNumber: 'Line 11',
        codeSnippet: 'if ((exp & 1L) == 1L) res = (res * base) % mod;',
        whatItMeans: 'Java requires boolean in `if`—so `(exp & 1L) == 1L` checks LSB parity.',
        whyItIsThere: 'Applies current power only when bit is set.',
        ifDeletedError: 'Java rejects `if (exp & 1L)` with incompatible `long` to `boolean` error.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'main calls gcd(48, 18)', memoryOrStack: 'JVM Stack: [main, gcd(48,18)]', note: '48 % 18 = 12' },
      { step: 2, state: 'gcd(18, 12) pushed', memoryOrStack: 'Stack: [..., gcd(18,12)]', note: '18 % 12 = 6' },
      { step: 3, state: 'gcd(12, 6) pushed', memoryOrStack: 'Stack: [..., gcd(12,6)]', note: '12 % 6 = 0' },
      { step: 4, state: 'gcd(6, 0) Base Case', memoryOrStack: 'Stack: [..., gcd(6,0)] -> 6', note: 'Unwinds cleanly' },
      { step: 5, state: 'Back in main, g = 6', memoryOrStack: 'Stack: [main]', note: 'Computes modPow in O(log b)' },
    ],
    harryBugTraps: [
      {
        title: 'Using `if (exp & 1)` Like C++ in Java',
        brokenCode: `if (exp & 1) res = (res * base) % mod;`,
        fixedCode: `if ((exp & 1L) == 1L) res = (res * base) % mod;`,
        whyItBreaks: 'Java strictly forbids `long`/`int` inside `if(...)`; it demands a `boolean`.',
      },
      {
        title: 'StackOverflowError on Deep Linear Recursion (n = 10^5)',
        brokenCode: `static long sum(long n) { return n == 0 ? 0 : n + sum(n - 1); }`,
        fixedCode: `static long sum(long n) { return n * (n + 1) / 2; }`,
        whyItBreaks: 'Default JVM stack holds ~8,000–12,000 frames; 100,000 calls crash immediately.',
      },
      {
        title: 'Trying to Swap Primitives Inside a Java Method',
        brokenCode: `static void swap(int a, int b) { int t = a; a = b; b = t; }`,
        fixedCode: `// Return a pair/array or swap elements inside an int[] directly`,
        whyItBreaks: 'Java is strictly pass-by-value; swapping parameter copies never affects the caller.',
      },
    ],
    practiceSheet: [
      {
        id: 'java-ch-5-q1',
        difficulty: 'Easy',
        title: 'Recursive Sum 1..N',
        prompt: 'Write `sumN(long n)` recursively returning `1 + ... + n`.',
        banglaHint: '`n <= 0` হলে `0L`, নইলে `n + sumN(n - 1)`।',
        starterCode: `import java.util.Scanner;\npublic class Main {\n    static long sumN(long n) { return n <= 0 ? 0 : n + sumN(n - 1); }\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        System.out.println(sumN(sc.hasNextLong() ? sc.nextLong() : 0));\n    }\n}`,
        sampleStdin: '10',
        expectedOutput: '55',
      },
      {
        id: 'java-ch-5-q2',
        difficulty: 'Easy',
        title: 'Recursive Power Helper',
        prompt: 'Write `power(long b, int e)` recursively.',
        banglaHint: '`e <= 0` হলে `1L` রিটার্ন করো।',
        starterCode: `import java.util.Scanner;\npublic class Main {\n    static long power(long b, int e) { return e <= 0 ? 1 : b * power(b, e - 1); }\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        System.out.println(power(sc.nextLong(), sc.nextInt()));\n    }\n}`,
        sampleStdin: '3 4',
        expectedOutput: '81',
      },
      {
        id: 'java-ch-5-q3',
        difficulty: 'Medium',
        title: 'Recursive Digit Sum',
        prompt: 'Compute sum of decimal digits of `n` recursively.',
        banglaHint: '`Math.abs(n)` নিয়ে `n == 0` বেস কেস ব্যবহার করো।',
        starterCode: `import java.util.Scanner;\npublic class Main {\n    static long digitSum(long n) {\n        n = Math.abs(n);\n        return n == 0 ? 0 : (n % 10) + digitSum(n / 10);\n    }\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        System.out.println(digitSum(sc.nextLong()));\n    }\n}`,
        sampleStdin: '9876',
        expectedOutput: '30',
      },
      {
        id: 'java-ch-5-q4',
        difficulty: 'Medium',
        title: 'O(log b) Recursive Binary Power',
        prompt: 'Compute `(a^b) % 1000000007` recursively in O(log b).',
        banglaHint: 'অর্ধেক পাওয়ার একটি ভ্যারিয়েবলে রেখে স্কয়ার করো।',
        starterCode: `import java.util.Scanner;\npublic class Main {\n    static long fpow(long a, long b, long m) {\n        if (b == 0) return 1 % m;\n        long h = fpow(a, b / 2, m);\n        long sq = (h * h) % m;\n        return (b & 1L) == 1L ? (sq * (a % m)) % m : sq;\n    }\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        System.out.println(fpow(sc.nextLong(), sc.nextLong(), 1000000007L));\n    }\n}`,
        sampleStdin: '2 20',
        expectedOutput: '1048576',
      },
      {
        id: 'java-ch-5-q5',
        difficulty: 'Hard',
        title: 'Tower of Hanoi Move Counter in O(1) / Recursion',
        prompt: 'Write `hanoiMoves(int n)` recursively (`2 * hanoiMoves(n - 1) + 1`) for `1 <= n <= 50`.',
        banglaHint: '`n <= 0` হলে `0`, নইলে `2 * hanoiMoves(n - 1) + 1`।',
        starterCode: `import java.util.Scanner;\npublic class Main {\n    static long hanoiMoves(int n) { return n <= 0 ? 0 : 2 * hanoiMoves(n - 1) + 1; }\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        System.out.println(hanoiMoves(sc.nextInt()));\n    }\n}`,
        sampleStdin: '4',
        expectedOutput: '15',
      },
    ],
    miniBuild: {
      title: '🔥 Milestone Merger Project 1 (Java 21): CLI Number Theory & Fast Power Engine',
      description: 'Combines Ch 1–5: Scanner I/O, 64-bit long, negative modulo normalization & bitwise parity, O(log b) binary exponentiation, and recursive Euclidean GCD.',
      banglaGoal: 'Java 21 মেথড, বিটওয়াইজ প্যারিটি ও O(log b) ফাস্ট পাওয়ার মিলিয়ে মাইলস্টোন প্রজেক্ট ১ তৈরি।',
      combinesChapters: 'Ch 1–5 (Milestone Merger 1)',
      starterCode: `import java.util.Scanner;

public class Main {
    static long gcd(long a, long b) {
        return b == 0 ? a : gcd(b, a % b);
    }

    static long modPow(long base, long exp, long mod) {
        long res = 1 % mod;
        base = ((base % mod) + mod) % mod;
        while (exp > 0) {
            if ((exp & 1L) == 1L) res = (res * base) % mod;
            base = (base * base) % mod;
            exp >>= 1;
        }
        return res;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextLong()) return;
        long a = sc.nextLong(), b = sc.nextLong(), mod = sc.nextLong();
        if (mod <= 0) return;
        long g = gcd(a, b);
        long p = modPow(a, b, mod);
        String parity = ((p & 1L) == 1L) ? "ODD" : "EVEN";
        System.out.println("gcd=" + g + " pow_mod=" + p + " parity=" + parity);
    }
}`,
      sampleStdin: '12 18 1000',
      expectedOutput: 'gcd=6 pow_mod=904 parity=EVEN',
    },
  },
  javascript: {
    title: 'JavaScript Chapter 5 (ES2025): Functions, Closures, Recursion & Milestone Merger 1',
    banglaTitle: 'JavaScript অধ্যায় ৫ (ES2025): ফাংশন, কল স্ট্যাক, রিকার্শন ও মাইলস্টোন প্রজেক্ট ১',
    subtitle: 'Master arrow/declaration functions, Call Stack Execution Contexts, Memoization Map, BigInt O(log b) power, and Milestone Merger 1.',
    zeroIntuition: {
      plainEnglishStory:
        'In JavaScript, every function call pushes a new Execution Context onto the V8 Call Stack. If recursion lacks a Base Case, Chrome/Node throws `RangeError: Maximum call stack size exceeded` (~10,000 frames). By pairing pure functions, `Map` memoization, and `BigInt` O(log b) binary exponentiation, your JS code stays clean, safe, and ultra-fast.',
      asciiFlowchart: `    V8 CALL STACK (LIFO Execution Contexts)
    [ Global Execution Context ] ---> gcd(48n, 18n)
                                        |--> gcd(18n, 12n)
                                               |--> gcd(12n, 6n)
                                                      |--> gcd(6n, 0n) [Base -> 6n]
    <--- Contexts pop back to Global`,
      pseudocode: [
        '1. WRITE pure helper functions with explicit inputs and outputs',
        '2. PLACE Base Case guard on line 1 of every recursive function',
        '3. MEMOIZE overlapping calls inside a `new Map()`',
        '4. USE `BigInt` for exact modular exponentiation in O(log b)',
        '5. MERGE Ch 1–5 into the CLI Number Theory & Fast Power Engine',
      ],
      banglaZeroToHero: {
        analogyTitle: 'V8 এক্সিকিউশন কনটেক্সট ও কল স্ট্যাক (JS Functions & Recursion)',
        explanation:
          'জাভাস্ক্রিপ্টে ফাংশন কল হলে V8 ইঞ্জিনের Call Stack-এ একটি করে বক্স জমা হয়। ফাংশন নিজের কাজ শেষ করে `return` করলে সেই বক্সটি স্ট্যাক থেকে বেরিয়ে যায়। কিন্তু Base Case না থাকলে স্ট্যাক ভরে `Maximum call stack size exceeded` এরর দেয়! আর ES2025-এ `BigInt` (`12n`) ব্যবহার করলে মডুলার পাওয়ার কখনো রাউন্ডিং এরর দেয় না।',
        everydayExample:
          'মাল্টি-স্টেপ ক্যালকুলেশন ছোট ছোট ফাংশন (`gcd`, `modPow`) হিসেবে আলাদা করলে প্রতিটা অংশ আলাদা করে টেস্ট ও ব্যবহার করা যায়।',
        keyTakeaways: [
          'অবজেক্ট/অ্যারে ফাংশনে পাঠালে রেফারেন্স যায়—তাই সরাসরি মিউটেট না করে কপি (`[...arr]`) বা পিওর রিটার্ন ব্যবহার করো।',
          '৫৩-বিটের বড় গুণফলে `Number` ভুল উত্তর দেয়; মডুলার পাওয়ার বা ফিবোনাচ্চিতে `BigInt` ব্যবহার করো।',
          '`Map` দিয়ে মেমোয়াইজেশন করলে O(2^n) রিকার্শন O(n)-এ নেমে আসে।',
        ],
      },
    },
    codeExamples: [
      {
        id: 'js-5-ex-basic',
        tier: 'Basic',
        title: '1. Basic: Pure Arrow Functions & Default Parameters',
        banglaNote: 'ডিফল্ট প্যারামিটার ও অ্যারো ফাংশন দিয়ে পরিষ্কার মডিউলার কোড।',
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const [a = 0, b = 0] = raw.trim().split(/\\s+/).map(Number);

const maxTwo = (x, y) => (x > y ? x : y);
const square = (x) => x * x;

const m = maxTwo(a, b);
console.log(\`max=\${m} sq=\${square(m)}\`);`,
        stdin: '4 9',
        expectedOutput: 'max=9 sq=81',
      },
      {
        id: 'js-5-ex-edge',
        tier: 'Edge-Case',
        title: '2. Edge-Case: Negative Base Case Guard Against Stack Overflow',
        banglaNote: 'নেগেটিভ সংখ্যা দিলে Maximum call stack size exceeded এরর থেকে বাঁচতে বেস কেস গার্ড।',
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const n = Math.trunc(Number(raw.trim() || 0));

function factSafe(k) {
  if (k < 0) return -1;
  if (k <= 1) return 1;
  return k * factSafe(k - 1);
}
console.log(factSafe(n));`,
        stdin: '-3',
        expectedOutput: '-1',
      },
      {
        id: 'js-5-ex-opt',
        tier: 'Optimized',
        title: '3. Optimized: Map-Memoized Fibonacci in O(n)',
        banglaNote: 'Map মেমো দিয়ে O(2^n) রিকার্শনকে O(n) স্পিডে আনা।',
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const n = Number(raw.trim() || 0);

const memo = new Map([[0, 0], [1, 1]]);
function fib(k) {
  if (memo.has(k)) return memo.get(k);
  const val = fib(k - 1) + fib(k - 2);
  memo.set(k, val);
  return val;
}
console.log(fib(n));`,
        stdin: '40',
        expectedOutput: '102334155',
      },
      {
        id: 'js-5-ex-cp',
        tier: 'CP Trick',
        title: '4. CP Trick: BigInt Recursive GCD & O(log b) Modular Power',
        banglaNote: 'BigInt দিয়ে কোনো ওভারফ্লো ছাড়াই O(log b) GCD ও মডুলার পাওয়ার।',
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const [a, b] = raw.trim().split(/\\s+/).map(BigInt);

const gcd = (x, y) => (y === 0n ? x : gcd(y, x % y));

function modPow(base, exp, mod) {
  let res = 1n % mod;
  base = ((base % mod) + mod) % mod;
  while (exp > 0n) {
    if (exp & 1n) res = (res * base) % mod;
    base = (base * base) % mod;
    exp >>= 1n;
  }
  return res;
}
console.log(\`\${gcd(a, b)} \${modPow(a, b, 1000000007n)}\`);`,
        stdin: '48 18',
        expectedOutput: '6 171755684',
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 5',
        codeSnippet: 'const gcd = (x, y) => (y === 0n ? x : gcd(y, x % y));',
        whatItMeans: 'Recursive arrow function operating on arbitrary-precision `BigInt`.',
        whyItIsThere: 'Prevents float rounding on values > `2^53 - 1`.',
        ifDeletedError: '`ReferenceError: gcd is not defined`.',
      },
      {
        lineNumber: 'Line 8',
        codeSnippet: 'let res = 1n % mod;',
        whatItMeans: 'Initializes BigInt accumulator safely even if `mod === 1n`.',
        whyItIsThere: 'Handles edge case `mod = 1n` where `a^0 % 1` must be `0n`.',
        ifDeletedError: 'Wrong Answer when `mod === 1`.',
      },
      {
        lineNumber: 'Line 11',
        codeSnippet: 'if (exp & 1n) res = (res * base) % mod;',
        whatItMeans: 'Bitwise AND with `1n` tests LSB parity on BigInt.',
        whyItIsThere: 'Advances binary exponentiation in O(log b) steps.',
        ifDeletedError: 'Mixing `1` (number) with `BigInt` throws `TypeError`!',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'Call gcd(48n, 18n)', memoryOrStack: 'CallStack: [Global, gcd(48n,18n)]', note: '48n % 18n = 12n' },
      { step: 2, state: 'Call gcd(18n, 12n)', memoryOrStack: 'CallStack: [..., gcd(18n,12n)]', note: '18n % 12n = 6n' },
      { step: 3, state: 'Call gcd(12n, 6n)', memoryOrStack: 'CallStack: [..., gcd(12n,6n)]', note: '12n % 6n = 0n' },
      { step: 4, state: 'Call gcd(6n, 0n)', memoryOrStack: 'Base Case -> returns 6n', note: 'Unwinds LIFO' },
      { step: 5, state: 'modPow runs ~5 steps for b=18', memoryOrStack: 'CallStack: [Global]', note: 'Exact BigInt result' },
    ],
    harryBugTraps: [
      {
        title: 'Mixing `Number` and `BigInt` in Operators (`exp & 1`)',
        brokenCode: `if (exp & 1) res = (res * base) % mod;`,
        fixedCode: `if (exp & 1n) res = (res * base) % mod;`,
        whyItBreaks: 'Throws `TypeError: Cannot mix BigInt and other types, use explicit conversions`.',
      },
      {
        title: 'Calling Uncached Recursive Function Inside `fib(45)`',
        brokenCode: `const fib = n => n <= 1 ? n : fib(n-1) + fib(n-2);`,
        fixedCode: `// Use a Map memo cache or iterative loop`,
        whyItBreaks: 'Freezes the Node/browser thread for 10+ seconds doing O(2^n) calls.',
      },
      {
        title: 'Missing Base Case Causing `RangeError: Maximum call stack size exceeded`',
        brokenCode: `function count(n) { return 1 + count(n - 1); }`,
        fixedCode: `function count(n) { return n <= 0 ? 0 : 1 + count(n - 1); }`,
        whyItBreaks: 'Exceeds V8’s ~10,000 frame limit in milliseconds.',
      },
    ],
    practiceSheet: [
      {
        id: 'js-ch-5-q1',
        difficulty: 'Easy',
        title: 'Recursive Sum 1..N',
        prompt: 'Write recursive `sumN(n)` returning `1 + ... + n` with Base Case `n <= 0`.',
        banglaHint: '`n <= 0 ? 0 : n + sumN(n - 1)` ব্যবহার করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst n = Number(raw.trim() || 0);\nconst sumN = (k) => (k <= 0 ? 0 : k + sumN(k - 1));\nconsole.log(sumN(n));`,
        sampleStdin: '10',
        expectedOutput: '55',
      },
      {
        id: 'js-ch-5-q2',
        difficulty: 'Easy',
        title: 'Recursive Power Function',
        prompt: 'Compute `b^e` recursively with `e <= 0 -> 1`.',
        banglaHint: '`e <= 0 ? 1 : b * power(b, e - 1)`।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst [b, e] = raw.trim().split(/\\s+/).map(Number);\nconst power = (x, p) => (p <= 0 ? 1 : x * power(x, p - 1));\nconsole.log(power(b, e));`,
        sampleStdin: '3 4',
        expectedOutput: '81',
      },
      {
        id: 'js-ch-5-q3',
        difficulty: 'Medium',
        title: 'Recursive Digit Sum',
        prompt: 'Write `digitSum(n)` recursively using `Math.abs`, `% 10`, and `Math.floor(n / 10)`.',
        banglaHint: '`n === 0` হলে ০, নইলে `(n % 10) + digitSum(Math.floor(n / 10))`।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst n = Math.abs(Number(raw.trim() || 0));\nconst digitSum = (k) => (k === 0 ? 0 : (k % 10) + digitSum(Math.floor(k / 10)));\nconsole.log(digitSum(n));`,
        sampleStdin: '9876',
        expectedOutput: '30',
      },
      {
        id: 'js-ch-5-q4',
        difficulty: 'Medium',
        title: 'O(log b) Recursive Fast Power (BigInt)',
        prompt: 'Compute `(a^b) % 1000000007n` recursively using `BigInt`.',
        banglaHint: 'অর্ধেক পাওয়ার `h` বের করে স্কয়ার করো এবং `b & 1n` চেক করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst [a, b] = raw.trim().split(/\\s+/).map(BigInt);\nfunction fpow(x, e, m) {\n  if (e === 0n) return 1n % m;\n  const h = fpow(x, e >> 1n, m);\n  const sq = (h * h) % m;\n  return (e & 1n) ? (sq * (x % m)) % m : sq;\n}\nconsole.log(fpow(a, b, 1000000007n).toString());`,
        sampleStdin: '2 20',
        expectedOutput: '1048576',
      },
      {
        id: 'js-ch-5-q5',
        difficulty: 'Hard',
        title: 'Memoized Coin Change Ways',
        prompt: 'Given target `n`, count ordered combinations using `{1, 2, 3}` with `Map` memoization.',
        banglaHint: '`n === 0` হলে `1`, `n < 0` হলে `0`, এবং `ways(n-1) + ways(n-2) + ways(n-3)` মেমোয়াইজ করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst n = Number(raw.trim() || 0);\nconst memo = new Map();\nfunction ways(k) {\n  if (k === 0) return 1;\n  if (k < 0) return 0;\n  if (memo.has(k)) return memo.get(k);\n  const ans = ways(k - 1) + ways(k - 2) + ways(k - 3);\n  memo.set(k, ans);\n  return ans;\n}\nconsole.log(ways(n));`,
        sampleStdin: '4',
        expectedOutput: '7',
      },
    ],
    miniBuild: {
      title: '🔥 Milestone Merger Project 1 (ES2025): CLI Number Theory & Fast Power Engine',
      description: 'Combines Ch 1–5: stdin parsing, BigInt safety, bitwise parity & negative mod normalization, O(log b) binary exponentiation, and recursive GCD.',
      banglaGoal: 'ES2025 BigInt ও রিকার্শন দিয়ে অধ্যায় ১–৫ সমন্বিত নাম্বার থিওরি ইঞ্জিন তৈরি।',
      combinesChapters: 'Ch 1–5 (Milestone Merger 1)',
      starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const tokens = raw.trim().split(/\\s+/).map(BigInt);

const gcd = (a, b) => (b === 0n ? a : gcd(b, a % b));

function modPow(base, exp, mod) {
  let res = 1n % mod;
  base = ((base % mod) + mod) % mod;
  while (exp > 0n) {
    if (exp & 1n) res = (res * base) % mod;
    base = (base * base) % mod;
    exp >>= 1n;
  }
  return res;
}

if (tokens.length >= 3 && tokens[2] > 0n) {
  const [a, b, mod] = tokens;
  const g = gcd(a, b);
  const p = modPow(a, b, mod);
  const parity = (p & 1n) === 1n ? 'ODD' : 'EVEN';
  console.log(\`gcd=\${g} pow_mod=\${p} parity=\${parity}\`);
}`,
      sampleStdin: '12 18 1000',
      expectedOutput: 'gcd=6 pow_mod=904 parity=EVEN',
    },
  },
  rust: {
    title: 'Rust Chapter 5 (Rust 2024): Functions, Ownership Moves, Recursion & Milestone Merger 1',
    banglaTitle: 'Rust অধ্যায় ৫ (Rust 2024): ফাংশন, ওনারশিপ মুভ, রিকার্শন ও মাইলস্টোন প্রজেক্ট ১',
    subtitle: 'Master fn signatures, expression returns, Copy vs Move/Borrow (&T / &mut T), recursive base cases, and Milestone Merger 1.',
    zeroIntuition: {
      plainEnglishStory:
        'In Rust, functions explicitly declare whether parameters are copied (`i64`), moved (ownership transfer), or borrowed (`&Vec<i64>` or `&mut Vec<i64>`). Combined with clean expression-based returns (no trailing semicolon on the final expression!) and explicit `u128` modular arithmetic, Rust functions give C-speed execution with zero memory bugs.',
      asciiFlowchart: `    RUST CALL STACK (Stack Frames + Borrow Lifetime)
    [ main() owns memo: Vec<i64> ]
         |---> borrows &mut memo into fib(n, &mut memo)
                  |---> recurses fib(n-1, memo) ...
                  |---> hits Base Case (n <= 1)
         |<--- borrow ends cleanly when fib returns`,
      pseudocode: [
        '1. DEFINE `fn` with explicit parameter types and `-> ReturnType`',
        '2. BORROW large structures via `&T` or `&mut T` so recursive calls do not move/drop them',
        '3. GUARD Base Case first before making recursive calls',
        '4. USE `u128` inside modular multiplication to prevent `u64` overflow',
        '5. MERGE Ch 1–5 into the CLI Number Theory & Fast Power Engine',
      ],
      banglaZeroToHero: {
        analogyTitle: 'ধার দেওয়া খাতা বনাম মালিকানা হস্তান্তর (Borrowing vs Moving in Functions)',
        explanation:
          'Rust-এ তুমি কোনো `Vec` বা `String` যদি `&` ছাড়া ফাংশনে পাঠাও, তাহলে ওটার মালিকানা (Ownership) ফাংশনের ভেতর চলে যায় এবং ফাংশন শেষেই ওটা ডিলিট হয়ে যায়! তাই রিকার্শনে মেমো ভেক্টর পাঠাতে হলে `&mut memo` (ধার দেওয়া) ব্যবহার করতে হয়। আর ফাংশনের শেষ লাইনে সেমিকোলন না দিলে সেটাই রিটার্ন ভ্যালু হয়ে যায়!',
        everydayExample:
          'বন্ধুকে বই পড়তে দিলে (`&book`) সে পড়ে ফেরত দেবে; কিন্তু বইয়ের মালিকানা লিখে দিলে (`book`) আর তোমার কাছে থাকবে না!',
        keyTakeaways: [
          'ফাংশনের শেষ এক্সপ্রেশনে `;` না দিলে অটোমেটিক `return` হয় (যেমন `if b == 0 { a } else { gcd(b, a % b) }`)।',
          '`u64 * u64` গুণফলে ওভারফ্লো এড়াতে গুণ করার আগে `u128`-এ কাস্ট করে `% mod` করো।',
          'রিকার্শনে মিউটেবল স্টেট শেয়ার করতে `&mut Vec<i64>` প্যারামিটার পাঠাও।',
        ],
      },
    },
    codeExamples: [
      {
        id: 'rust-5-ex-basic',
        tier: 'Basic',
        title: '1. Basic: Expression-Return Functions & &mut Swap',
        banglaNote: 'সেমিকোলনবিহীন রিটার্ন এক্সপ্রেশন ও `&mut` দিয়ে নিরাপদ সোয়াপ।',
        code: `use std::io::{self, Read};

fn swap_vals(a: &mut i64, b: &mut i64) {
    let tmp = *a;
    *a = *b;
    *b = tmp;
}

fn max_two(a: i64, b: i64) -> i64 {
    if a > b { a } else { b }
}

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let nums: Vec<i64> = s.split_whitespace().filter_map(|t| t.parse().ok()).collect();
    if nums.len() >= 2 {
        let (mut a, mut b) = (nums[0], nums[1]);
        swap_vals(&mut a, &mut b);
        println!("swapped={},{} max={}", a, b, max_two(a, b));
    }
}`,
        stdin: '12 25',
        expectedOutput: 'swapped=25,12 max=25',
      },
      {
        id: 'rust-5-ex-edge',
        tier: 'Edge-Case',
        title: '2. Edge-Case: Negative Base Case Guard in Recursion',
        banglaNote: 'নেগেটিভ সংখ্যা গার্ড করে নিরাপদ ফ্যাক্টোরিয়াল রিকার্শন।',
        code: `use std::io::{self, Read};

fn fact_safe(n: i64) -> i64 {
    if n < 0 { return -1; }
    if n <= 1 { 1 } else { n * fact_safe(n - 1) }
}

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let n: i64 = s.trim().parse().unwrap_or(0);
    println!("{}", fact_safe(n));
}`,
        stdin: '-3',
        expectedOutput: '-1',
      },
      {
        id: 'rust-5-ex-opt',
        tier: 'Optimized',
        title: '3. Optimized: &mut Memoized Fibonacci in O(n)',
        banglaNote: '`&mut Vec<i64>` ধার দিয়ে O(n) সময়ে ফিবোনাচ্চি সমাধান।',
        code: `use std::io::{self, Read};

fn fib(n: usize, memo: &mut Vec<i64>) -> i64 {
    if n <= 1 { return n as i64; }
    if memo[n] != -1 { return memo[n]; }
    memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
    memo[n]
}

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let n: usize = s.trim().parse().unwrap_or(0);
    let mut memo = vec![-1; n + 1];
    println!("{}", fib(n, &mut memo));
}`,
        stdin: '40',
        expectedOutput: '102334155',
      },
      {
        id: 'rust-5-ex-cp',
        tier: 'CP Trick',
        title: '4. CP Trick: Recursive Euclidean GCD & u128 O(log b) mod_pow',
        banglaNote: 'u128 ও `rem_euclid` দিয়ে ওভারফ্লো-মুক্ত O(log b) মডুলার পাওয়ার।',
        code: `use std::io::{self, Read};

fn gcd(a: i64, b: i64) -> i64 {
    if b == 0 { a.abs() } else { gcd(b, a % b) }
}

fn mod_pow(mut base: i64, mut exp: u64, m: i64) -> i64 {
    let m128 = m as u128;
    let mut b = base.rem_euclid(m) as u128;
    let mut res = 1u128 % m128;
    while exp > 0 {
        if (exp & 1) == 1 { res = (res * b) % m128; }
        b = (b * b) % m128;
        exp >>= 1;
    }
    let _ = &mut base;
    res as i64
}

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let v: Vec<i64> = s.split_whitespace().filter_map(|t| t.parse().ok()).collect();
    if v.len() >= 2 {
        println!("{} {}", gcd(v[0], v[1]), mod_pow(v[0], v[1] as u64, 1_000_000_007));
    }
}`,
        stdin: '48 18',
        expectedOutput: '6 171755684',
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 3',
        codeSnippet: 'fn gcd(a: i64, b: i64) -> i64 {',
        whatItMeans: 'Function taking two `Copy` 64-bit signed integers and returning `i64`.',
        whyItIsThere: 'Primitives implement `Copy`, so recursive calls pass cheaply in CPU registers.',
        ifDeletedError: 'Cannot call `gcd` from `main`.',
      },
      {
        lineNumber: 'Line 4',
        codeSnippet: 'if b == 0 { a.abs() } else { gcd(b, a % b) }',
        whatItMeans: 'Expression-based `if/else` return without trailing `;`.',
        whyItIsThere: 'Guarantees a non-negative GCD even if inputs are negative.',
        ifDeletedError: 'Compiler error: mismatched types `()` vs `i64`.',
      },
      {
        lineNumber: 'Line 11',
        codeSnippet: 'if (exp & 1) == 1 { res = (res * b) % m128; }',
        whatItMeans: 'Uses `u128` intermediate products so `(m - 1)^2` never overflows.',
        whyItIsThere: 'Even `10^18 * 10^18` fits inside `u128` (max ~3.4e38).',
        ifDeletedError: '64-bit multiplication can panic in debug builds or wrap silently.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'main calls gcd(48, 18)', memoryOrStack: 'Stack: [main | gcd(48,18)]', note: '48 % 18 = 12' },
      { step: 2, state: 'gcd(18, 12) pushed', memoryOrStack: 'Stack: [..., gcd(18,12)]', note: '18 % 12 = 6' },
      { step: 3, state: 'gcd(12, 6) pushed', memoryOrStack: 'Stack: [..., gcd(12,6)]', note: '12 % 6 = 0' },
      { step: 4, state: 'gcd(6, 0) Base Case', memoryOrStack: 'Returns 6i64', note: 'Stack unwinds' },
      { step: 5, state: 'mod_pow computes in u128', memoryOrStack: 'O(1) stack space', note: 'Casts result back to i64' },
    ],
    harryBugTraps: [
      {
        title: 'Adding a Semicolon on the Final Return Expression',
        brokenCode: `fn add(a: i64, b: i64) -> i64 {\n    a + b;\n}`,
        fixedCode: `fn add(a: i64, b: i64) -> i64 {\n    a + b\n}`,
        whyItBreaks: 'Adding `;` turns `a + b` into a statement returning `()`, triggering compile error E0308!',
      },
      {
        title: 'Moving `Vec` Ownership Instead of Borrowing `&mut` in Recursion',
        brokenCode: `fn fib(n: usize, memo: Vec<i64>) -> i64 { fib(n-1, memo) }`,
        fixedCode: `fn fib(n: usize, memo: &mut Vec<i64>) -> i64 { fib(n-1, memo) }`,
        whyItBreaks: 'You cannot reuse `memo` after moving it into the first recursive call (`use of moved value`).',
      },
      {
        title: 'Overflowing `i64` Before `% mod`',
        brokenCode: `res = (res * base) % mod_val; // base ~ 10^10 overflows i64`,
        fixedCode: `res = ((res as i128 * base as i128) % mod_val as i128) as i64;`,
        whyItBreaks: 'In debug mode, `i64` multiplication overflow panics immediately.',
      },
    ],
    practiceSheet: [
      {
        id: 'rust-ch-5-q1',
        difficulty: 'Easy',
        title: 'Recursive Sum 1..N',
        prompt: 'Write recursive `sum_n(n: i64) -> i64` returning `1 + ... + n`.',
        banglaHint: '`if n <= 0 { 0 } else { n + sum_n(n - 1) }`।',
        starterCode: `use std::io::{self, Read};\nfn sum_n(n: i64) -> i64 { if n <= 0 { 0 } else { n + sum_n(n - 1) } }\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    println!("{}", sum_n(s.trim().parse().unwrap_or(0)));\n}`,
        sampleStdin: '10',
        expectedOutput: '55',
      },
      {
        id: 'rust-ch-5-q2',
        difficulty: 'Easy',
        title: 'Recursive Power Function',
        prompt: 'Write `power(b: i64, e: u32) -> i64` recursively.',
        banglaHint: '`if e == 0 { 1 } else { b * power(b, e - 1) }`।',
        starterCode: `use std::io::{self, Read};\nfn power(b: i64, e: u32) -> i64 { if e == 0 { 1 } else { b * power(b, e - 1) } }\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    let v: Vec<i64> = s.split_whitespace().filter_map(|t| t.parse().ok()).collect();\n    println!("{}", power(v[0], v[1] as u32));\n}`,
        sampleStdin: '3 4',
        expectedOutput: '81',
      },
      {
        id: 'rust-ch-5-q3',
        difficulty: 'Medium',
        title: 'Recursive Digit Sum',
        prompt: 'Write `digit_sum(n: i64) -> i64` recursively using `.abs()`.',
        banglaHint: '`let x = n.abs(); if x == 0 { 0 } else { (x % 10) + digit_sum(x / 10) }`।',
        starterCode: `use std::io::{self, Read};\nfn digit_sum(n: i64) -> i64 {\n    let x = n.abs();\n    if x == 0 { 0 } else { (x % 10) + digit_sum(x / 10) }\n}\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    println!("{}", digit_sum(s.trim().parse().unwrap_or(0)));\n}`,
        sampleStdin: '9876',
        expectedOutput: '30',
      },
      {
        id: 'rust-ch-5-q4',
        difficulty: 'Medium',
        title: 'O(log b) Recursive Fast Power',
        prompt: 'Implement recursive `fpow(a, b, 1_000_000_007)` using `u128`.',
        banglaHint: '`h = fpow(a, b / 2, m)` করে তারপর `sq = (h * h) % m` করো।',
        starterCode: `use std::io::{self, Read};\nfn fpow(a: u128, b: u64, m: u128) -> u128 {\n    if b == 0 { return 1 % m; }\n    let h = fpow(a, b / 2, m);\n    let sq = (h * h) % m;\n    if b & 1 == 1 { (sq * (a % m)) % m } else { sq }\n}\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    let v: Vec<u128> = s.split_whitespace().filter_map(|t| t.parse().ok()).collect();\n    println!("{}", fpow(v[0], v[1] as u64, 1_000_000_007));\n}`,
        sampleStdin: '2 20',
        expectedOutput: '1048576',
      },
      {
        id: 'rust-ch-5-q5',
        difficulty: 'Hard',
        title: 'Memoized Climbing Stairs (1, 2, or 3 Steps)',
        prompt: 'Given `n`, count ways to reach step `n` taking 1, 2, or 3 steps using `&mut Vec<i64>` memoization.',
        banglaHint: '`n == 0 -> 1`, `n < 0 -> 0` ধরে তিনটা ধাপ যোগ করে মেমোতে সেভ করো।',
        starterCode: `use std::io::{self, Read};\nfn ways(n: isize, memo: &mut Vec<i64>) -> i64 {\n    if n == 0 { return 1; }\n    if n < 0 { return 0; }\n    let idx = n as usize;\n    if memo[idx] != -1 { return memo[idx]; }\n    memo[idx] = ways(n - 1, memo) + ways(n - 2, memo) + ways(n - 3, memo);\n    memo[idx]\n}\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    let n: usize = s.trim().parse().unwrap_or(0);\n    let mut memo = vec![-1; n + 1];\n    println!("{}", ways(n as isize, &mut memo));\n}`,
        sampleStdin: '4',
        expectedOutput: '7',
      },
    ],
    miniBuild: {
      title: '🔥 Milestone Merger Project 1 (Rust 2024): CLI Number Theory & Fast Power Engine',
      description: 'Combines Ch 1–5: safe stdin parsing, i64/u128 overflow safety, bitwise parity & rem_euclid, O(log b) binary exponentiation, and recursive GCD.',
      banglaGoal: 'Rust ওনারশিপ/বরোয়িং, u128 নিরাপত্তা ও O(log b) অ্যালগরিদম মিলিয়ে মাইলস্টোন প্রজেক্ট ১ তৈরি।',
      combinesChapters: 'Ch 1–5 (Milestone Merger 1)',
      starterCode: `use std::io::{self, Read};

fn gcd(a: i64, b: i64) -> i64 {
    if b == 0 { a.abs() } else { gcd(b, a % b) }
}

fn mod_pow(base: i64, mut exp: u64, m: i64) -> i64 {
    let m128 = m as u128;
    let mut b = base.rem_euclid(m) as u128;
    let mut res = 1u128 % m128;
    while exp > 0 {
        if (exp & 1) == 1 { res = (res * b) % m128; }
        b = (b * b) % m128;
        exp >>= 1;
    }
    res as i64
}

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let v: Vec<i64> = s.split_whitespace().filter_map(|t| t.parse().ok()).collect();
    if v.len() >= 3 && v[2] > 0 {
        let (a, b, m) = (v[0], v[1], v[2]);
        let g = gcd(a, b);
        let p = mod_pow(a, b as u64, m);
        let parity = if (p & 1) == 1 { "ODD" } else { "EVEN" };
        println!("gcd={} pow_mod={} parity={}", g, p, parity);
    }
}`,
      sampleStdin: '12 18 1000',
      expectedOutput: 'gcd=6 pow_mod=904 parity=EVEN',
    },
  },
  typescript: {
    title: 'TypeScript Chapter 5 (TS 5.x): Typed Functions, Recursion & Milestone Merger 1',
    banglaTitle: 'TypeScript অধ্যায় ৫ (TS 5.x): টাইপড ফাংশন, রিকার্শন ও মাইলস্টোন প্রজেক্ট ১',
    subtitle: 'Master strict parameter/return contracts, generic helpers, Map<number, bigint> memoization, O(log b) power, and Milestone Merger 1.',
    zeroIntuition: {
      plainEnglishStory:
        'TypeScript prevents mismatched recursive return types (`number | undefined` forgetting a branch) and guarantees `bigint` never accidentally mixes with `number` inside Call Stack recursion or memoization caches.',
      asciiFlowchart: `    TS CALL STACK (Strictly Typed Contracts)
    [ main ] ---> gcd(a: bigint, b: bigint): bigint
                     |--> gcd(b, a % b)
                            |--> b === 0n -> returns bigint cleanly`,
      pseudocode: [
        '1. ANNOTATE function parameter & return types explicitly (`(a: bigint, b: bigint) => bigint`)',
        '2. PLACE Base Case first so TypeScript narrows all paths to return cleanly',
        '3. CACHE repeated calls in `Map<number, bigint>`',
        '4. USE `bigint` O(log b) modular power for arbitrary exponent safety',
        '5. MERGE Ch 1–5 into the CLI Number Theory & Fast Power Engine',
      ],
      banglaZeroToHero: {
        analogyTitle: 'টাইপ-সেফ রিকার্শন ও মেমোয়াইজেশন ম্যাপ (TS Functions)',
        explanation:
          'TypeScript ফাংশনে ইনপুট ও আউটপুট টাইপ বলে দিলে রিকার্শনের কোনো শাখায় ভুল করে `undefined` বা ভিন্ন টাইপ রিটার্ন করলেই সাথে সাথে কম্পাইলার ধরে ফেলে! আর `Map<number, bigint>` মেমোয়াইজেশন ব্যবহার করলে ডায়নামিক প্রোগ্রামিংয়ের উত্তর মুহূর্তেই মেলে।',
        everydayExample:
          'ফর্ম পূরণের সময় প্রতিটি বক্সে সঠিক ধরন (সংখ্যা না টেক্সট) ঠিক থাকলে যেমন ভুল হওয়ার সুযোগ কমে, TS ফাংশন টাইপ ঠিক তেমনই!',
        keyTakeaways: [
          'রিকার্শন ফাংশনে সবসময় রিটার্ন টাইপ (`: number` বা `: bigint`) লিখে দেবে, নইলে অসীম ইনফারেন্স হতে পারে।',
          '`readonly` প্যারামিটার ব্যবহার করলে ফাংশন দুর্ঘটনাবশত ইনপুট অ্যারে মিউটেট করতে পারবে না।',
          'বড় সংখ্যার পাওয়ারে `bigint` ব্যবহার করলে নির্ভুল আউটপুট নিশ্চিত হয়।',
        ],
      },
    },
    codeExamples: [
      {
        id: 'ts-5-ex-basic',
        tier: 'Basic',
        title: '1. Basic: Strictly Typed Pure Functions & Tuple Return',
        banglaNote: 'রিটার্ন টাইপ ও রিডঅনলি ইনপুটসহ ক্লিন টাইপড হেল্পার।',
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw: string = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const [a = 0, b = 0] = raw.trim().split(/\\s+/).map(Number);

function maxTwo(x: number, y: number): number {
  return x > y ? x : y;
}
const square = (x: number): number => x * x;

const m: number = maxTwo(a, b);
console.log(\`max=\${m} sq=\${square(m)}\`);`,
        stdin: '4 9',
        expectedOutput: 'max=9 sq=81',
      },
      {
        id: 'ts-5-ex-edge',
        tier: 'Edge-Case',
        title: '2. Edge-Case: Negative Input Guard in Typed Recursion',
        banglaNote: 'নেগেটিভ ইনপুটে যেন স্ট্যাক ওভারফ্লো না হয় তার টাইপ-সেফ গার্ড।',
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw: string = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const n: number = Math.trunc(Number(raw.trim() || 0));

function factSafe(k: number): number {
  if (k < 0) return -1;
  if (k <= 1) return 1;
  return k * factSafe(k - 1);
}
console.log(factSafe(n));`,
        stdin: '-3',
        expectedOutput: '-1',
      },
      {
        id: 'ts-5-ex-opt',
        tier: 'Optimized',
        title: '3. Optimized: Typed Map<number, number> Memoized Fibonacci',
        banglaNote: 'Map<number, number> মেমো দিয়ে O(n) ফিবোনাচ্চি।',
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw: string = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const n: number = Number(raw.trim() || 0);

const memo = new Map<number, number>([[0, 0], [1, 1]]);
function fib(k: number): number {
  const cached = memo.get(k);
  if (cached !== undefined) return cached;
  const val = fib(k - 1) + fib(k - 2);
  memo.set(k, val);
  return val;
}
console.log(fib(n));`,
        stdin: '40',
        expectedOutput: '102334155',
      },
      {
        id: 'ts-5-ex-cp',
        tier: 'CP Trick',
        title: '4. CP Trick: BigInt Typed GCD & O(log b) modPow',
        banglaNote: 'bigint টাইপে স্ট্রিক্টলি টাইপড GCD এবং O(log b) মডুলার পাওয়ার।',
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw: string = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const [a = 0n, b = 0n] = raw.trim().split(/\\s+/).map(BigInt);

function gcd(x: bigint, y: bigint): bigint {
  return y === 0n ? x : gcd(y, x % y);
}

function modPow(base: bigint, exp: bigint, mod: bigint): bigint {
  let res = 1n % mod;
  base = ((base % mod) + mod) % mod;
  while (exp > 0n) {
    if (exp & 1n) res = (res * base) % mod;
    base = (base * base) % mod;
    exp >>= 1n;
  }
  return res;
}
console.log(\`\${gcd(a, b)} \${modPow(a, b, 1000000007n)}\`);`,
        stdin: '48 18',
        expectedOutput: '6 171755684',
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 5',
        codeSnippet: 'function gcd(x: bigint, y: bigint): bigint {',
        whatItMeans: 'Explicitly typed recursive function ensuring both inputs and output are `bigint`.',
        whyItIsThere: 'Prevents accidental passing of `number` floats into large number theory math.',
        ifDeletedError: 'Compile error: `Cannot find name "gcd"`.',
      },
      {
        lineNumber: 'Line 6',
        codeSnippet: 'return y === 0n ? x : gcd(y, x % y);',
        whatItMeans: 'Base case `y === 0n` plus recursive Euclidean reduction.',
        whyItIsThere: 'Guarantees `bigint` return on all control paths.',
        ifDeletedError: 'TS reports `Function lacks ending return statement`.',
      },
      {
        lineNumber: 'Line 9',
        codeSnippet: 'function modPow(base: bigint, exp: bigint, mod: bigint): bigint {',
        whatItMeans: 'O(log b) modular exponentiation contract.',
        whyItIsThere: 'Runs in 60 steps even for 18-digit exponents.',
        ifDeletedError: '`modPow` becomes undefined.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'gcd(48n, 18n)', memoryOrStack: 'Stack: [Global | gcd(48n,18n)]', note: '48n % 18n = 12n' },
      { step: 2, state: 'gcd(18n, 12n)', memoryOrStack: 'Stack: [... | gcd(18n,12n)]', note: '18n % 12n = 6n' },
      { step: 3, state: 'gcd(12n, 6n)', memoryOrStack: 'Stack: [... | gcd(12n,6n)]', note: '12n % 6n = 0n' },
      { step: 4, state: 'gcd(6n, 0n) Base Case', memoryOrStack: 'Returns 6n', note: 'Unwinds LIFO' },
      { step: 5, state: 'modPow runs O(log b)', memoryOrStack: 'Exact bigint arithmetic', note: 'Outputs both results' },
    ],
    harryBugTraps: [
      {
        title: 'Using `if (memo.get(k))` When Cached Value Is `0`',
        brokenCode: `if (memo.get(k)) return memo.get(k)!;`,
        fixedCode: `const val = memo.get(k);\nif (val !== undefined) return val;`,
        whyItBreaks: 'When `fib(0)` returns `0`, `if (0)` is falsy, bypassing the cache!',
      },
      {
        title: 'Omitting Return Type on Mutual / Complex Recursive Function',
        brokenCode: `function f(n) { return n <= 0 ? 0 : f(n - 1); }`,
        fixedCode: `function f(n: number): number { return n <= 0 ? 0 : f(n - 1); }`,
        whyItBreaks: 'Implicit `any` disables type checks across recursive calls.',
      },
      {
        title: 'Mixing `number` and `bigint` in TypeScript',
        brokenCode: `const x: bigint = 5n + 1;`,
        fixedCode: `const x: bigint = 5n + 1n;`,
        whyItBreaks: 'TypeScript flags `TS2365: Operator "+" cannot be applied to types "bigint" and "number"`.',
      },
    ],
    practiceSheet: [
      {
        id: 'ts-ch-5-q1',
        difficulty: 'Easy',
        title: 'Typed Recursive Sum 1..N',
        prompt: 'Write `sumN(n: number): number` recursively.',
        banglaHint: '`n <= 0 ? 0 : n + sumN(n - 1)` লিখো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw: string = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst n: number = Number(raw.trim() || 0);\nconst sumN = (k: number): number => (k <= 0 ? 0 : k + sumN(k - 1));\nconsole.log(sumN(n));`,
        sampleStdin: '10',
        expectedOutput: '55',
      },
      {
        id: 'ts-ch-5-q2',
        difficulty: 'Easy',
        title: 'Typed Recursive Power',
        prompt: 'Write `power(b: number, e: number): number` recursively.',
        banglaHint: '`e <= 0` হলে `1`, নইলে `b * power(b, e - 1)`।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw: string = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst [b = 0, e = 0] = raw.trim().split(/\\s+/).map(Number);\nconst power = (x: number, p: number): number => (p <= 0 ? 1 : x * power(x, p - 1));\nconsole.log(power(b, e));`,
        sampleStdin: '3 4',
        expectedOutput: '81',
      },
      {
        id: 'ts-ch-5-q3',
        difficulty: 'Medium',
        title: 'Typed Recursive Digit Sum',
        prompt: 'Write `digitSum(n: number): number` recursively.',
        banglaHint: '`Math.abs(n)` দিয়ে `(n % 10) + digitSum(Math.floor(n / 10))` করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw: string = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst n: number = Math.abs(Number(raw.trim() || 0));\nconst digitSum = (k: number): number => (k === 0 ? 0 : (k % 10) + digitSum(Math.floor(k / 10)));\nconsole.log(digitSum(n));`,
        sampleStdin: '9876',
        expectedOutput: '30',
      },
      {
        id: 'ts-ch-5-q4',
        difficulty: 'Medium',
        title: 'Typed O(log b) Recursive Fast Power (bigint)',
        prompt: 'Compute `(a^b) % 1000000007n` recursively using `bigint`.',
        banglaHint: 'অর্ধেক পাওয়ার `h` হিসাব করে স্কয়ার করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw: string = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst [a = 0n, b = 0n] = raw.trim().split(/\\s+/).map(BigInt);\nfunction fpow(x: bigint, e: bigint, m: bigint): bigint {\n  if (e === 0n) return 1n % m;\n  const h = fpow(x, e >> 1n, m);\n  const sq = (h * h) % m;\n  return (e & 1n) ? (sq * (x % m)) % m : sq;\n}\nconsole.log(fpow(a, b, 1000000007n).toString());`,
        sampleStdin: '2 20',
        expectedOutput: '1048576',
      },
      {
        id: 'ts-ch-5-q5',
        difficulty: 'Hard',
        title: 'Memoized Coin-Step Combinations',
        prompt: 'Count ordered ways to reach `n` using steps `{1, 2, 3}` with `Map<number, number>` memo.',
        banglaHint: '`memo.get(k) !== undefined` চেক করে ফলাফল ক্যাশ করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw: string = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst n: number = Number(raw.trim() || 0);\nconst memo = new Map<number, number>();\nfunction ways(k: number): number {\n  if (k === 0) return 1;\n  if (k < 0) return 0;\n  const hit = memo.get(k);\n  if (hit !== undefined) return hit;\n  const ans = ways(k - 1) + ways(k - 2) + ways(k - 3);\n  memo.set(k, ans);\n  return ans;\n}\nconsole.log(ways(n));`,
        sampleStdin: '4',
        expectedOutput: '7',
      },
    ],
    miniBuild: {
      title: '🔥 Milestone Merger Project 1 (TS 5.x): CLI Number Theory & Fast Power Engine',
      description: 'Combines Ch 1–5: typed stdin parsing, bigint safety, bitwise parity & negative mod normalization, O(log b) binary exponentiation, and recursive GCD.',
      banglaGoal: 'TypeScript 5.x স্ট্রিক্ট টাইপিং ও BigInt দিয়ে অধ্যায় ১–৫ সমন্বিত নাম্বার থিওরি ইঞ্জিন তৈরি।',
      combinesChapters: 'Ch 1–5 (Milestone Merger 1)',
      starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw: string = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const tokens: bigint[] = raw.trim().split(/\\s+/).map(BigInt);

function gcd(a: bigint, b: bigint): bigint {
  return b === 0n ? a : gcd(b, a % b);
}

function modPow(base: bigint, exp: bigint, mod: bigint): bigint {
  let res = 1n % mod;
  base = ((base % mod) + mod) % mod;
  while (exp > 0n) {
    if (exp & 1n) res = (res * base) % mod;
    base = (base * base) % mod;
    exp >>= 1n;
  }
  return res;
}

if (tokens.length >= 3 && tokens[2] > 0n) {
  const [a, b, mod] = tokens;
  const g = gcd(a, b);
  const p = modPow(a, b, mod);
  const parity: 'ODD' | 'EVEN' = (p & 1n) === 1n ? 'ODD' : 'EVEN';
  console.log(\`gcd=\${g} pow_mod=\${p} parity=\${parity}\`);
}`,
      sampleStdin: '12 18 1000',
      expectedOutput: 'gcd=6 pow_mod=904 parity=EVEN',
    },
  },
  html: {
    title: 'HTML5 Chapter 5: Reusable Templates, Nested Trees & Milestone Merger 1',
    banglaTitle: 'HTML5 অধ্যায় ৫: রিইউজেবল টেমপ্লেট, রিকার্সিভ ট্রি ও মাইলস্টোন প্রজেক্ট ১',
    subtitle: 'Master HTML5 <template> cloning, recursive nested <ul> comment/folder trees, Web Component basics, and Milestone Merger 1 interactive app.',
    zeroIntuition: {
      plainEnglishStory:
        'HTML `<template>` acts just like a Function Blueprint in programming—the browser parses it once without rendering it to screen, and you can stamp out clones on demand! Meanwhile, real-world UIs like file explorers and threaded comments are recursive trees (`<ul>` inside `<li>` inside `<ul>`), built with a recursive render function and a depth Base Case.',
      asciiFlowchart: `    HTML5 <template> + RECURSIVE DOM TREE
    <template id="node-tpl">  (Inert blueprint - 0ms paint)
           |
           v
    renderTree(node, depth)
       |-- Base Case: depth > maxDepth -> stop!
       |-- Clone <template> -> set label
       '-- If children exist -> recurse inside <ul>`,
      pseudocode: [
        '1. DEFINE reusable `<template>` element (inert until cloned via `.content.cloneNode(true)`)',
        '2. GUARD Base Case in recursive DOM tree rendering (`!node.children?.length` or `depth > 4`)',
        '3. USE `textContent` (never `innerHTML` with untrusted strings) to prevent XSS',
        '4. MERGE Ch 1–5 into a complete Interactive Number Theory & Fast Power Web Tool',
      ],
      banglaZeroToHero: {
        analogyTitle: 'সিল-মোহর স্ট্যাম্প ও ফোল্ডারের ভেতর ফোল্ডার (HTML <template> ও Tree Recursion)',
        explanation:
          'কল্পনা করো তুমি একটি রাবার স্ট্যাম্প (`<template>`) বানিয়ে রাখলে। স্ট্যাম্পটি কাগজে না ছাপা পর্যন্ত কোনো দাগ পড়ে না, কিন্তু যখন দরকার তখন `cloneNode(true)` দিয়ে মুহূর্তেই শত শত কপি বানাতে পারো! আর কম্পিউটারের ফোল্ডারের ভেতর আরেকটি ফোল্ডার (`<ul>` এর ভেতর `<li>` -> `<ul>`) আঁকতে ঠিক ফাংশনের মতোই রিকার্শন ব্যবহার করতে হয়!',
        everydayExample:
          'ফেসবুক/ইউটিউবে একটি কমেন্টের নিচে রিপ্লাই, তার নিচে আবার রিপ্লাই—এটাই হলো HTML-এর রিকার্সিভ লিস্ট ট্রি!',
        keyTakeaways: [
          '`<template>` ট্যাগের ভেতরের HTML পেজ লোডের সময় স্ক্রিনে দেখা যায় না—JavaScript দিয়ে ক্লোন করে ব্যবহার করতে হয়।',
          'রিকার্সিভ ট্রি রেন্ডার করার সময় অবশ্যই `maxDepth` বেস কেস রাখবে যাতে অসীম লুপে ব্রাউজার হ্যাং না করে।',
          'ইউজার ইনপুট বা নাম সবসময় `textContent` দিয়ে বসাবে—কখনো `innerHTML` দিয়ে নয় (নইলে XSS সিকিউরিটি ঝুঁকি থাকে)।',
        ],
      },
    },
    codeExamples: [
      {
        id: 'html-5-ex-basic',
        tier: 'Basic',
        title: '1. Basic: Inert <template> Cloned Like a Reusable Function',
        banglaNote: 'HTML5 <template> ট্যাগ ক্লোন করে বারবার ব্যবহারযোগ্য কার্ড তৈরি।',
        code: `<!doctype html>
<html lang="en">
<body style="font-family:system-ui,sans-serif;background:#0f172a;color:#e2e8f0;padding:16px">
  <div id="cards"></div>
  <template id="card-tpl">
    <article style="padding:10px;margin-bottom:8px;background:#1e293b;border-radius:8px">
      <strong class="title"></strong>
    </article>
  </template>
  <script>
    const tpl = document.getElementById('card-tpl');
    const host = document.getElementById('cards');
    ['Phase 1: Foundations', 'Milestone Merger 1'].forEach(txt => {
      const node = tpl.content.cloneNode(true);
      node.querySelector('.title').textContent = txt;
      host.appendChild(node);
    });
  </script>
</body>
</html>`,
        stdin: '',
        expectedOutput: 'Milestone Merger 1',
      },
      {
        id: 'html-5-ex-edge',
        tier: 'Edge-Case',
        title: '2. Edge-Case: Depth Base Case Guard in Recursive Tree',
        banglaNote: 'অসীম নেস্টিং বা গভীর রিকার্শন আটকাতে maxDepth বেস কেস গার্ড।',
        code: `<!doctype html>
<html lang="en">
<body style="font-family:system-ui,sans-serif;background:#0f172a;color:#e2e8f0;padding:16px">
  <ul id="tree"></ul>
  <script>
    const tree = { name: 'src', children: [{ name: 'data', children: [{ name: 'deepChapter5.ts', children: [] }] }] };
    function render(node, depth = 0) {
      const li = document.createElement('li');
      li.textContent = node.name;
      if (depth < 4 && node.children.length) {
        const ul = document.createElement('ul');
        node.children.forEach(c => ul.appendChild(render(c, depth + 1)));
        li.appendChild(ul);
      }
      return li;
    }
    document.getElementById('tree').appendChild(render(tree));
  </script>
</body>
</html>`,
        stdin: '',
        expectedOutput: 'deepChapter5.ts',
      },
      {
        id: 'html-5-ex-opt',
        tier: 'Optimized',
        title: '3. Optimized: Single-Pass Batch Tree With DocumentFragment',
        banglaNote: 'রিকার্শন চলাকালে DocumentFragment ব্যবহার করে মাত্র ১ বার DOM পেইন্ট করা।',
        code: `<!doctype html>
<html lang="en">
<body style="font-family:monospace;background:#0f172a;color:#22d3ee;padding:16px">
  <pre id="stack"></pre>
  <script>
    const trace = [];
    function traceGcd(a, b, depth = 0) {
      trace.push('  '.repeat(depth) + '-> gcd(' + a + ', ' + b + ')');
      if (b === 0) return a;
      return traceGcd(b, a % b, depth + 1);
    }
    const ans = traceGcd(48, 18);
    trace.push('Result = ' + ans);
    document.getElementById('stack').textContent = trace.join('\\n');
  </script>
</body>
</html>`,
        stdin: '',
        expectedOutput: 'Result = 6',
      },
      {
        id: 'html-5-ex-cp',
        tier: 'CP Trick',
        title: '4. CP Trick: Pure Semantic <details> Recursive Folder Tree (Zero JS)',
        banglaNote: 'কোনো JavaScript ছাড়াই নেস্টেড <details> ও <summary> দিয়ে কলাপসিবল রিকার্সিভ ট্রি!',
        code: `<!doctype html>
<html lang="en">
<body style="font-family:system-ui,sans-serif;background:#0f172a;color:#e2e8f0;padding:16px">
  <details open>
    <summary>src/</summary>
    <details open style="margin-left:16px">
      <summary>data/</summary>
      <div style="margin-left:16px;color:#38bdf8">deepChapter5.ts</div>
    </details>
  </details>
</body>
</html>`,
        stdin: '',
        expectedOutput: 'deepChapter5.ts',
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 5',
        codeSnippet: '<template id="card-tpl">',
        whatItMeans: 'Declares an inert DOM fragment stored off-screen.',
        whyItIsThere: 'Acts like a reusable UI function blueprint with zero initial layout cost.',
        ifDeletedError: '`tpl.content` throws `TypeError: Cannot read properties of null`.',
      },
      {
        lineNumber: 'Line 14',
        codeSnippet: 'const node = tpl.content.cloneNode(true);',
        whatItMeans: 'Deep-clones the template DOM subtree cleanly.',
        whyItIsThere: 'Allows stamping multiple independent copies without mutating the blueprint.',
        ifDeletedError: 'Template elements move instead of duplicating, leaving only 1 item.',
      },
      {
        lineNumber: 'Line 15',
        codeSnippet: 'node.querySelector(".title").textContent = txt;',
        whatItMeans: 'Sets safe text content (automatically escapes HTML entities).',
        whyItIsThere: 'Prevents XSS injection bugs when rendering dynamic strings.',
        ifDeletedError: 'Cards render blank without titles.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'Parse <template id="card-tpl">', memoryOrStack: 'Inert DocumentFragment', note: 'Not painted on page yet' },
      { step: 2, state: 'Call traceGcd(48, 18, 0)', memoryOrStack: 'CallStack depth=0', note: 'Pushes "-> gcd(48, 18)"' },
      { step: 3, state: 'Call traceGcd(18, 12, 1) -> (12, 6, 2)', memoryOrStack: 'CallStack depth=2', note: 'Indents by depth' },
      { step: 4, state: 'Base Case b === 0 at (6, 0, 3)', memoryOrStack: 'Returns 6; unwinds', note: 'Single DOM write at end' },
    ],
    harryBugTraps: [
      {
        title: 'Using `.innerHTML` With Dynamic Strings (XSS Security Bug)',
        brokenCode: `title.innerHTML = userInput;`,
        fixedCode: `title.textContent = userInput;`,
        whyItBreaks: 'Malicious `<img onerror=...>` scripts inside `userInput` execute inside the page if inserted via `innerHTML`.',
      },
      {
        title: 'Appending `tpl.content` Directly Without `.cloneNode(true)`',
        brokenCode: `host.appendChild(tpl.content);`,
        fixedCode: `host.appendChild(tpl.content.cloneNode(true));`,
        whyItBreaks: 'Moving `tpl.content` empties the template on the first call, leaving subsequent clones blank!',
      },
      {
        title: 'Recursive DOM Render Without Depth Limit',
        brokenCode: `function draw(n) { draw(n); }`,
        fixedCode: `function draw(n, depth = 0) { if (depth > 6) return; ... }`,
        whyItBreaks: 'Infinite DOM recursion freezes the browser tab with `RangeError`.',
      },
    ],
    practiceSheet: [
      {
        id: 'html-ch-5-q1',
        difficulty: 'Easy',
        title: 'Clone a Reusable <template> Badge',
        prompt: 'Use `<template>` and `.content.cloneNode(true)` to render 2 step badges.',
        banglaHint: '`tpl.content.cloneNode(true)` ব্যবহার করে দুটি আইটেম অ্যাপেন্ড করো।',
        starterCode: `<!doctype html>\n<html><body style="background:#0f172a;color:#e2e8f0;font-family:sans-serif;padding:16px">\n<div id="out"></div>\n<template id="t"><p class="b"></p></template>\n<script>\nconst tpl=document.getElementById('t'), out=document.getElementById('out');\n['Step A','Step B'].forEach(s=>{ const c=tpl.content.cloneNode(true); c.querySelector('.b').textContent=s; out.appendChild(c); });\n</script></body></html>`,
        sampleStdin: '',
        expectedOutput: 'Step B',
      },
      {
        id: 'html-ch-5-q2',
        difficulty: 'Easy',
        title: 'Nested Semantic <details> Tree',
        prompt: 'Create a 2-level collapsible folder tree using native `<details>` and `<summary>`.',
        banglaHint: 'একটি `<details>` ট্যাগের ভেতরে আরেকটি `<details>` রাখো।',
        starterCode: `<!doctype html>\n<html><body style="background:#0f172a;color:#e2e8f0;font-family:sans-serif;padding:16px">\n<details open><summary>Root</summary><details open style="margin-left:16px"><summary>Child</summary></details></details>\n</body></html>`,
        sampleStdin: '',
        expectedOutput: 'Child',
      },
      {
        id: 'html-ch-5-q3',
        difficulty: 'Medium',
        title: 'Recursive Call Stack Tracer',
        prompt: 'Render the recursive call stack steps of `fact(4)` into a `<pre>` element.',
        banglaHint: 'রিকার্শন চলাকালে প্রতিটি ধাপের টেক্সট অ্যারেতে পুশ করে শেষে `<pre>`-তে বসাও।',
        starterCode: `<!doctype html>\n<html><body style="background:#0f172a;color:#38bdf8;font-family:monospace;padding:16px">\n<pre id="p"></pre>\n<script>\nconst log=[];\nfunction fact(n){ log.push('call fact('+n+')'); if(n<=1) return 1; return n*fact(n-1); }\nlog.push('ans='+fact(4));\ndocument.getElementById('p').textContent=log.join('\\n');\n</script></body></html>`,
        sampleStdin: '',
        expectedOutput: 'ans=24',
      },
      {
        id: 'html-ch-5-q4',
        difficulty: 'Medium',
        title: 'Pure Function Calculator Widget',
        prompt: 'Write pure JS functions `gcd(a, b)` and `lcm(a, b)` wired to `<output>`.',
        banglaHint: '`gcd(b, a % b)` ফাংশন লিখে `<output>` এলিমেন্টে ফলাফল দেখাও।',
        starterCode: `<!doctype html>\n<html><body style="background:#0f172a;color:#e2e8f0;font-family:sans-serif;padding:16px">\n<output id="res"></output>\n<script>\nconst gcd=(a,b)=>b===0?a:gcd(b,a%b);\nconst lcm=(a,b)=>(a/gcd(a,b))*b;\ndocument.getElementById('res').textContent='gcd='+gcd(48,18)+' lcm='+lcm(48,18);\n</script></body></html>`,
        sampleStdin: '',
        expectedOutput: 'gcd=6 lcm=144',
      },
      {
        id: 'html-ch-5-q5',
        difficulty: 'Hard',
        title: 'Recursive File Explorer Renderer',
        prompt: 'Write a depth-guarded recursive DOM builder rendering nested JSON folders cleanly.',
        banglaHint: '`depth < 4` শর্ত দিয়ে `<ul>` ও `<li>` তৈরি করো।',
        starterCode: `<!doctype html>\n<html><body style="background:#0f172a;color:#e2e8f0;font-family:sans-serif;padding:16px">\n<ul id="root"></ul>\n<script>\nconst data={name:'academy',kids:[{name:'ch5',kids:[{name:'merger.html',kids:[]}]}]};\nfunction build(n,d=0){ const li=document.createElement('li'); li.textContent=n.name; if(d<4&&n.kids.length){ const u=document.createElement('ul'); n.kids.forEach(k=>u.appendChild(build(k,d+1))); li.appendChild(u); } return li; }\ndocument.getElementById('root').appendChild(build(data));\n</script></body></html>`,
        sampleStdin: '',
        expectedOutput: 'merger.html',
      },
    ],
    miniBuild: {
      title: '🔥 Milestone Merger Project 1 (HTML5): Interactive Number Theory & Fast Power App',
      description: 'Combines Ch 1–5: semantic HTML5 form & <output>, accessible labels, BigInt modular power & parity, O(log b) loop, and recursive GCD Call Stack trace.',
      banglaGoal: 'অধ্যায় ১ থেকে ৫-এর সব HTML5 ও JS কৌশল মিলিয়ে ইন্টার‍্যাক্টিভ নাম্বার-থিওরি ক্যালকুলেটর তৈরি।',
      combinesChapters: 'Ch 1–5 (Milestone Merger 1)',
      starterCode: `<!doctype html>
<html lang="en">
<body style="font-family:system-ui,sans-serif;background:#090d16;color:#f8fafc;padding:20px">
  <h2>Milestone Merger 1: Number Theory & Fast Power Engine</h2>
  <div style="display:flex;gap:8px;flex-wrap:wrap;margin:12px 0">
    <label>A <input id="a" type="number" value="12" style="width:80px" /></label>
    <label>B <input id="b" type="number" value="18" style="width:80px" /></label>
    <label>Mod <input id="m" type="number" value="1000" style="width:90px" /></label>
    <button id="run" type="button" style="background:#06b6d4;color:#090d16;font-weight:700;border:0;padding:6px 12px;border-radius:6px">Compute</button>
  </div>
  <output id="out" style="display:block;font-family:monospace;color:#34d399"></output>
  <script>
    const gcd = (x, y) => (y === 0n ? x : gcd(y, x % y));
    function modPow(base, exp, mod) {
      let res = 1n % mod;
      base = ((base % mod) + mod) % mod;
      while (exp > 0n) {
        if (exp & 1n) res = (res * base) % mod;
        base = (base * base) % mod;
        exp >>= 1n;
      }
      return res;
    }
    function calc() {
      const a = BigInt(document.getElementById('a').value || '0');
      const b = BigInt(document.getElementById('b').value || '0');
      const m = BigInt(document.getElementById('m').value || '1');
      if (m <= 0n) { document.getElementById('out').textContent = 'Mod must be > 0'; return; }
      const g = gcd(a < 0n ? -a : a, b < 0n ? -b : b);
      const p = modPow(a, b < 0n ? 0n : b, m);
      document.getElementById('out').textContent = \`gcd=\${g} pow_mod=\${p} parity=\${(p & 1n) ? 'ODD' : 'EVEN'}\`;
    }
    document.getElementById('run').addEventListener('click', calc);
    calc();
  </script>
</body>
</html>`,
      sampleStdin: '',
      expectedOutput: 'gcd=6 pow_mod=904 parity=EVEN',
    },
  },
};
