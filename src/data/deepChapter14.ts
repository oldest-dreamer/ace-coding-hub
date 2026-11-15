import type { DeepChapterContent } from './deepChapter1';
import type { LanguageId } from '../types/academy';

export const DEEP_CHAPTER_14: Record<LanguageId, DeepChapterContent> = {
  c: {
    title: 'C Chapter 14 (C23): DP Caching, CPU Cache Locality, Integer Overflow & Buffer Security',
    banglaTitle: 'C অধ্যায় ১৪ (C23): ডায়নামিক প্রোগ্রামিং ক্যাশিং, সিপিইউ ক্যাশ ও সিকিউরিটি গার্ড',
    subtitle: 'Collapse O(2^n) recursion into O(n)/O(1)-space DP, traverse row-major for L1 cache hits, and defend against overflow & buffer attacks.',
    zeroIntuition: {
      plainEnglishStory:
        'Naive `fib(40)` recomputes the same subproblems 331 million times (`O(2^n)`), taking seconds. Caching results via **Dynamic Programming** drops that to **40 steps** (`0.001 ms`)! Even better: rolling two `long long` variables computes `fib(n)` in `O(1)` space—while strict bounds validation (`n in [0..90]`) blocks signed 64-bit integer overflow and Denial-of-Service inputs.',
      asciiFlowchart: `  EXPONENTIAL RECOMPUTATION vs MEMOIZED DP + SECURITY BOUNDS
  Naive fib(40) : 331,160,281 calls  (Seconds -> TLE!)
  Iterative DP  : 40 steps, O(1) RAM (0.001ms -> Instant!)
  Security Guard: if (n < 0 || n > 90) reject -> Prevents signed int64 overflow!`,
      pseudocode: [
        '1. VALIDATE input n inside safe bounds [0..90] (DoS & overflow shield)',
        '2. INITIALIZE rolling DP states a = 0, b = 1',
        '3. LOOP n iterations: next = a + b; a = b; b = next',
        '4. PRINT a cleanly',
      ],
      banglaZeroToHero: {
        analogyTitle: 'খাতায় লেখা উত্তর দেখে বলা (Memoization / DP) বনাম বারবার নতুন করে গুণ করা',
        explanation:
          'কেউ যদি জিজ্ঞাসা করে `১২৩ × ৪৫` কত, তুমি ক্যালকুলেটরে বের করে বললে। ১ মিনিট পর আবার একই প্রশ্ন করলে তুমি আবার গুনবে না—মনে রাখা (Cache / DP) থেকেই বলে দেবে! রিকার্সিভ `fib(40)` একই হিসাব ৩৩ কোটি বার করে টাইম-লিমিট খায়, কিন্তু **DP বা রোলিং ভ্যারিয়েবল** মাত্র ৪০ ধাপে উত্তর দেয়! সাথে `n > 90` আটকে দিলে `long long` ওভারফ্লো সিকিউরিটি বাগও হয় না।',
        everydayExample:
          'একটি অ্যাপের প্রোফাইল ব্যানার প্রতিবার ডেটাবেস থেকে না এনে Redis ক্যাশে ৫ মিনিট ধরে রাখা ও ইনপুট ভ্যালিডেশন করা।',
        keyTakeaways: [
          '`fib(92)` এর পর `signed long long` ওভারফ্লো করে নেগেটিভ হয়ে যায় (Undefined Behavior in C!)—তাই সব সময় ইনপুট বাউন্ডারি চেক করবে।',
          '২ডি অ্যারে `a[r][c]` সব সময় **Row-Major (`r` বাইরে, `c` ভেতরে)** লুপে ঘোরানো ১০ গুণ দ্রুত কারণ CPU ক্যাশ লাইনে ডেটা পাশাপাশি থাকে।',
          'সি-তে পাসওয়ার্ড/টোকেন তুলনায় শর্ট-সার্কিট `strcmp` টাইমিং অ্যাটাকের ঝুঁকি রাখে; কনস্ট্যান্ট-টাইম তুলনা নিরাপদ।',
        ],
      },
    },
    codeExamples: [
      {
        id: 'c-14-ex-basic',
        tier: 'Basic',
        title: '1. Basic: O(n) Time / O(1) Space DP Fibonacci With Input Validation',
        banglaNote: 'ইনপুট বাউন্ডারি `[0..90]` যাচাই করে মাত্র ৩টি ভ্যারিয়েবলে `fib(n)` নির্ণয়।',
        code: `#include <stdio.h>

int main(void) {
    int n = 0;
    if (scanf("%d", &n) != 1 || n < 0 || n > 90) return 0;
    long long a = 0, b = 1;
    for (int i = 0; i < n; i++) {
        long long next = a + b;
        a = b;
        b = next;
    }
    printf("%lld\\n", a);
    return 0;
}`,
        stdin: '10',
        expectedOutput: '55',
      },
      {
        id: 'c-14-ex-edge',
        tier: 'Edge-Case',
        title: '2. Edge-Case: Rejecting Negative, Huge DoS & Non-Numeric Inputs',
        banglaNote: 'নেগেটিভ সংখ্যা, `> 90` ইনপুট বা ম্যালফর্মড স্ট্রিং এলে ক্র্যাশ/ওভারফ্লো ছাড়া `INVALID` প্রিন্ট।',
        code: `#include <stdio.h>

int main(void) {
    int n = 0;
    if (scanf("%d", &n) != 1 || n < 0 || n > 90) {
        printf("INVALID\\n");
        return 0;
    }
    long long a = 0, b = 1;
    for (int i = 0; i < n; i++) {
        long long next = a + b;
        a = b; b = next;
    }
    printf("%lld\\n", a);
    return 0;
}`,
        stdin: '95',
        expectedOutput: 'INVALID',
      },
      {
        id: 'c-14-ex-opt',
        tier: 'Optimized',
        title: '3. Optimized: Memoization Cache Array With O(1) Repeated Queries',
        banglaNote: 'একবার DP টেবিল `dp[0..90]` প্রিকম্পিউট করে অসংখ্য কুয়েরির উত্তর `O(1)` সময়ে দেওয়া।',
        code: `#include <stdio.h>

int main(void) {
    long long dp[91] = {0, 1};
    for (int i = 2; i <= 90; i++) dp[i] = dp[i - 1] + dp[i - 2];
    int q = 0;
    if (scanf("%d", &q) != 1) return 0;
    while (q--) {
        int idx = 0; scanf("%d", &idx);
        if (idx >= 0 && idx <= 90) printf("%lld\\n", dp[idx]);
    }
    return 0;
}`,
        stdin: '3\n5 10 20',
        expectedOutput: '5\n55\n6765',
      },
      {
        id: 'c-14-ex-cp',
        tier: 'CP Trick',
        title: '4. CP Trick: Constant-Time Token Verification (Anti-Timing Attack)',
        banglaNote: 'প্রথম অক্ষর না মিললেই লুপ না থামিয়ে XOR (`diff |= a[i] ^ b[i]`) দিয়ে সব বাইট সমান সময়ে যাচাই।',
        code: `#include <stdio.h>
#include <string.h>

static int const_time_eq(const char *a, const char *b) {
    size_t la = strlen(a), lb = strlen(b);
    if (la != lb) return 0;
    unsigned char diff = 0;
    for (size_t i = 0; i < la; i++) diff |= (unsigned char)(a[i] ^ b[i]);
    return diff == 0;
}

int main(void) {
    char expected[64], provided[64];
    if (scanf("%63s %63s", expected, provided) != 2) return 0;
    printf("%s\\n", const_time_eq(expected, provided) ? "MATCH" : "DENIED");
    return 0;
}`,
        stdin: 'sec_9921 sec_9921',
        expectedOutput: 'MATCH',
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 5',
        codeSnippet: 'if (scanf("%d", &n) != 1 || n < 0 || n > 90) return 0;',
        whatItMeans: 'Sanitizes input type and clamps domain before arithmetic runs.',
        whyItIsThere: 'Prevents negative loop confusion and signed int64 overflow above fib(92).',
        ifDeletedError: 'Out-of-bounds or huge inputs corrupt integer math or loop excessively.',
      },
      {
        lineNumber: 'Line 6-10',
        codeSnippet: 'long long a = 0, b = 1; for (...) { next = a + b; a = b; b = next; }',
        whatItMeans: 'Computes Fibonacci iteratively with 2 sliding registers in O(1) RAM.',
        whyItIsThere: 'Eliminates O(2^n) exponential call tree.',
        ifDeletedError: 'Naive recursion times out around n = 45.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'Validate n = 10 in [0..90]', memoryOrStack: 'a=0, b=1', note: 'Sanitized safely' },
      { step: 2, state: 'i = 0..4', memoryOrStack: 'a: 0->1->1->2->3->5', note: 'Halfway in 5ns' },
      { step: 3, state: 'i = 5..9', memoryOrStack: 'a: 8->13->21->34->55', note: 'O(1) RAM used' },
      { step: 4, state: 'printf("%lld", a)', memoryOrStack: 'stdout: 55', note: 'Exact fib(10)' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: Naive Exponential fib(n-1) + fib(n-2) Without Cache',
        brokenCode: 'long long fib(int n) { return n <= 1 ? n : fib(n-1) + fib(n-2); } // 2^n TLE!',
        fixedCode: '// Use bottom-up DP or rolling O(1)-space state transitions',
        whyItBreaks: 'fib(50) performs over 40 billion redundant calls.',
      },
      {
        title: 'Trap 2: Column-Major Traversal Destroying CPU Cache Locality',
        brokenCode: 'for (int c=0; c<N; c++) for (int r=0; r<N; r++) sum += mat[r][c]; // Cache misses!',
        fixedCode: 'for (int r=0; r<N; r++) for (int c=0; c<N; c++) sum += mat[r][c];',
        whyItBreaks: 'Jumping N columns per iteration misses CPU L1 cache lines on every read.',
      },
      {
        title: 'Trap 3: Unbounded gets() / Unchecked strcpy() Stack Buffer Overflow',
        brokenCode: 'char buf[16]; gets(buf); // Classic Remote Code Execution vulnerability!',
        fixedCode: 'fgets(buf, sizeof(buf), stdin); // or scanf("%15s", buf);',
        whyItBreaks: 'Input longer than 15 bytes overwrites return addresses on the stack.',
      },
    ],
    practiceSheet: [
      {
        id: 'c-ch-14-q1',
        difficulty: 'Easy',
        title: 'Warm-up: O(1)-Space DP Fibonacci',
        prompt: 'Compute fib(n) in O(n) time and O(1) space for n in [0..90].',
        banglaHint: '`a = 0, b = 1` রোলিং ভ্যারিয়েবলে n-বার যোগ করে `a` প্রিন্ট করো।',
        starterCode: `#include <stdio.h>
int main(void) {
    int n; if (scanf("%d", &n) != 1 || n < 0 || n > 90) return 0;
    long long a = 0, b = 1;
    for (int i = 0; i < n; i++) { long long t = a + b; a = b; b = t; }
    printf("%lld\\n", a);
    return 0;
}`,
        sampleStdin: '10',
        expectedOutput: '55',
      },
      {
        id: 'c-ch-14-q2',
        difficulty: 'Easy',
        title: 'Bounded Clamp Security Helper',
        prompt: 'Clamp incoming user integer cleanly into [0, 100] and print sanitized value.',
        banglaHint: '`x < 0` হলে `0`, `x > 100` হলে `100` সেট করে আউটপুট দাও।',
        starterCode: `#include <stdio.h>
int main(void) {
    long long x; if (scanf("%lld", &x) != 1) return 0;
    if (x < 0) x = 0; if (x > 100) x = 100;
    printf("%lld\\n", x);
    return 0;
}`,
        sampleStdin: '250',
        expectedOutput: '100',
      },
      {
        id: 'c-ch-14-q3',
        difficulty: 'Medium',
        title: 'fib(20) Overflow-Safe 64-Bit DP',
        prompt: 'Verify 64-bit iterative DP computes fib(20) cleanly.',
        banglaHint: '`long long` ডেটা টাইপ নিয়ে `fib(20)` নির্ণয় করো।',
        starterCode: `#include <stdio.h>
int main(void) {
    int n; if (scanf("%d", &n) != 1 || n < 0 || n > 90) return 0;
    long long a = 0, b = 1;
    for (int i = 0; i < n; i++) { long long t = a + b; a = b; b = t; }
    printf("%lld\\n", a);
    return 0;
}`,
        sampleStdin: '20',
        expectedOutput: '6765',
      },
      {
        id: 'c-ch-14-q4',
        difficulty: 'Medium',
        title: 'Climbing Stairs DP Cache (1 or 2 Steps)',
        prompt: 'Count distinct ways to climb n stairs taking 1 or 2 steps at a time.',
        banglaHint: 'dp[i] = dp[i-1] + dp[i-2], যেখানে n=1 এ উত্তর 1 এবং n=2 এ 2।',
        starterCode: `#include <stdio.h>
int main(void) {
    int n; if (scanf("%d", &n) != 1 || n <= 0) return 0;
    long long a = 1, b = 1;
    for (int i = 2; i <= n; i++) { long long t = a + b; a = b; b = t; }
    printf("%lld\\n", b);
    return 0;
}`,
        sampleStdin: '5',
        expectedOutput: '8',
      },
      {
        id: 'c-ch-14-q5',
        difficulty: 'Hard',
        title: 'HTML Angle-Bracket Output Escaper',
        prompt: 'Escape `<` and `>` characters cleanly into `&lt;` and `&gt;` to prevent XSS.',
        banglaHint: 'স্ট্রিংয়ের প্রতিটি অক্ষর `<` বা `>` হলে নিরাপদ HTML এন্টিটি প্রিন্ট করো।',
        starterCode: `#include <stdio.h>
int main(void) {
    char buf[128]; if (scanf("%127s", buf) != 1) return 0;
    for (int i = 0; buf[i]; i++) {
        if (buf[i] == '<') printf("&lt;");
        else if (buf[i] == '>') printf("&gt;");
        else putchar(buf[i]);
    }
    putchar('\\n');
    return 0;
}`,
        sampleStdin: '<script>',
        expectedOutput: '&lt;script&gt;',
      },
    ],
    miniBuild: {
      title: 'C Mini Build: Bounded DP Engine & Security Filter',
      description: 'Computes O(n) Fibonacci cleanly with strict 64-bit domain clamping.',
      banglaGoal: 'ওভারফ্লো গার্ডসহ O(n) স্পেস-অপটিমাইজড DP ক্যালকুলেটর তৈরি করা।',
      combinesChapters: 'Ch 1–14',
      starterCode: `#include <stdio.h>
int main(void) {
    int n; if (scanf("%d", &n) != 1 || n < 0 || n > 90) return 0;
    long long a = 0, b = 1;
    for (int i = 0; i < n; i++) { long long t = a + b; a = b; b = t; }
    printf("%lld\\n", a);
    return 0;
}`,
      sampleStdin: '10',
      expectedOutput: '55',
    },
  },

  cpp: {
    title: 'C++ Chapter 14 (C++23): DP Memoization, O(1) Space Optimization & Bounds Safety',
    banglaTitle: 'C++ অধ্যায় ১৪ (C++23): DP মেমোরাইজেশন, স্পেস অপটিমাইজেশন ও বাউন্ডারি নিরাপত্তা',
    subtitle: 'Eliminate exponential time via bottom-up DP tables & rolling state, leverage std::unordered_map / vector caches, and prevent UB.',
    zeroIntuition: {
      plainEnglishStory:
        'Dynamic Programming trades a tiny slice of memory (`vector<long long> dp`)—or even 2 rolling integers—to drop `O(2^n)` exponential searches down to `O(n)`. In production C++, combining fast DP caches with `.at()` / domain checks ensures sub-microsecond latency AND memory safety.',
      asciiFlowchart: `  DP TRANSFORMATION LADDER
  1. Top-Down Memoization: unordered_map or vector<long long> memo(n+1, -1)
  2. Bottom-Up Tabulation: dp[i] = dp[i-1] + dp[i-2]  (zero recursion overhead!)
  3. Rolling O(1) Space  : a = 0, b = 1  -> next = a + b (uses 16 bytes total!)`,
      pseudocode: [
        '1. GUARD input n in [0..90] to block UB signed overflow',
        '2. INITIALIZE rolling long long a = 0, b = 1',
        '3. ITERATE n times updating (a, b)',
        '4. EMIT a',
      ],
      banglaZeroToHero: {
        analogyTitle: 'রিকার্সিভ জট খুলে ২টি রোলিং ভ্যারিয়েবলে ফাস্ট সিঁড়ি (DP Optimization)',
        explanation:
          'টপ-ডাউন `memo[n]` দিলে প্রতি ধাপের উত্তর সেভ থাকে ঠিকই, কিন্তু রিকার্সন কল স্ট্যাক খরচ হয়। আরেক ধাপ এগিয়ে **Bottom-Up Rolling DP** ব্যবহার করলে কেবল আগের ২টি মান (`a` ও `b`) রাখলেই পুরো `fib(90)` বেরিয়ে যায় মাত্র ১৬ বাইট RAM-এ!',
        everydayExample:
          'বিলিং সিস্টেমে পুরো ১০ বছরের ক্যালকুলেশন পুনরায় না করে শুধু গত মাসের ব্যালেন্স ধরে নতুন বিল হিসাব করা।',
        keyTakeaways: [
          'C++-এ `signed long long` ওভারফ্লো করলে কম্পাইলার অপটিমাইজেশন কোড ভেঙে দিতে পারে (Undefined Behavior)—বাউন্ডস চেক আবশ্যক।',
          '`string_view` দিয়ে অপ্রয়োজনীয় স্ট্রিং কপি এড়িয়ে প্রচুর হিপ অ্যালোকেশন বাঁচানো যায়।',
          'একাধিক কুয়েরি থাকলে একবার DP টেবিল প্রিকম্পিউট করে রাখা `O(1)` রেসপন্স দেয়।',
        ],
      },
    },
    codeExamples: [
      {
        id: 'cpp-14-ex-basic',
        tier: 'Basic',
        title: '1. Basic: O(n) Time / O(1) Space DP Fibonacci With Input Guard',
        banglaNote: 'বাউন্ডারি চেক `[0..90]`-সহ O(1) মেমোরিতে দ্রুত `fib(n)` নির্ণয়।',
        code: `#include <iostream>
using namespace std;

int main() {
    int n = 0;
    if (!(cin >> n) || n < 0 || n > 90) return 0;
    long long a = 0, b = 1;
    for (int i = 0; i < n; i++) {
        long long next = a + b;
        a = b;
        b = next;
    }
    cout << a << "\\n";
    return 0;
}`,
        stdin: '10',
        expectedOutput: '55',
      },
      {
        id: 'cpp-14-ex-edge',
        tier: 'Edge-Case',
        title: '2. Edge-Case: Signed Overflow Rejection & Clean Fallback',
        banglaNote: '`n > 90` বা নেগেটিভ ইনপুট এলে UB ওভারফ্লো না ঘটিয়ে `OUT_OF_RANGE` রিটার্ন।',
        code: `#include <iostream>
using namespace std;

int main() {
    long long n = 0;
    if (!(cin >> n) || n < 0 || n > 90) {
        cout << "OUT_OF_RANGE\\n";
        return 0;
    }
    long long a = 0, b = 1;
    for (long long i = 0; i < n; i++) {
        long long next = a + b;
        a = b; b = next;
    }
    cout << a << "\\n";
    return 0;
}`,
        stdin: '95',
        expectedOutput: 'OUT_OF_RANGE',
      },
      {
        id: 'cpp-14-ex-opt',
        tier: 'Optimized',
        title: '3. Optimized: Memoized Top-Down DP Cache Vector',
        banglaNote: '`vector<long long> memo(n + 1, -1)` ব্যবহার করে টপ-ডাউন ক্যাশিং উদাহরণ।',
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
    if (!(cin >> n) || n < 0 || n > 90) return 0;
    vector<long long> memo(n + 1, -1);
    cout << fib_memo(n, memo) << "\\n";
    return 0;
}`,
        stdin: '20',
        expectedOutput: '6765',
      },
      {
        id: 'cpp-14-ex-cp',
        tier: 'CP Trick',
        title: '4. CP Trick: Fast Matrix Exponentiation O(log n) Fibonacci (mod 10^9+7)',
        banglaNote: '`n = 10^18` হলেও ২×২ ম্যাট্রিক্স পাওয়ারিং দিয়ে মাত্র `60` ধাপে `fib(n) % MOD` নির্ণয়।',
        code: `#include <array>
#include <iostream>
using namespace std;

using Mat = array<array<long long, 2>, 2>;
constexpr long long MOD = 1000000007LL;

Mat mul(const Mat &A, const Mat &B) {
    Mat C = {{{0, 0}, {0, 0}}};
    for (int i = 0; i < 2; i++)
        for (int k = 0; k < 2; k++)
            for (int j = 0; j < 2; j++)
                C[i][j] = (C[i][j] + A[i][k] * B[k][j]) % MOD;
    return C;
}

int main() {
    long long n = 0;
    if (!(cin >> n)) return 0;
    Mat res = {{{1, 0}, {0, 1}}}, base = {{{1, 1}, {1, 0}}};
    while (n > 0) {
        if (n & 1) res = mul(res, base);
        base = mul(base, base);
        n >>= 1;
    }
    cout << res[0][1] << "\\n";
    return 0;
}`,
        stdin: '10',
        expectedOutput: '55',
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 6',
        codeSnippet: 'if (!(cin >> n) || n < 0 || n > 90) return 0;',
        whatItMeans: 'Validates both stream parsing success and mathematical upper bound.',
        whyItIsThere: 'Prevents signed 64-bit integer overflow UB.',
        ifDeletedError: 'Malformed input leaves n = 0 or large n invokes signed overflow UB.',
      },
      {
        lineNumber: 'Line 8',
        codeSnippet: 'for (int i = 0; i < n; i++)',
        whatItMeans: 'Iterates bottom-up linearly without recursive stack frames.',
        whyItIsThere: 'Guarantees O(n) execution and O(1) memory footprint.',
        ifDeletedError: 'Always prints 0.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'Read n = 10 safely', memoryOrStack: 'a=0, b=1', note: 'Domain [0..90] OK' },
      { step: 2, state: 'Iterations 0..4', memoryOrStack: 'a=5, b=8', note: 'Linear O(1) rolling update' },
      { step: 3, state: 'Iterations 5..9', memoryOrStack: 'a=55, b=89', note: 'Zero heap allocs' },
      { step: 4, state: 'Print a', memoryOrStack: 'stdout: 55', note: 'Complete' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: Passing Large vector<int> by Value Inside DP Recursion',
        brokenCode: 'int solve(int i, vector<int> dp) // Copies entire array on EVERY recursive call -> O(n^2)!',
        fixedCode: 'int solve(int i, vector<int> &dp) // Pass by reference!',
        whyItBreaks: 'Missing `&` allocates and copies O(n) memory on every stack frame.',
      },
      {
        title: 'Trap 2: Omitting ios::sync_with_stdio(false) on 10^5 I/O',
        brokenCode: 'for (int i=0; i<100000; i++) { cin >> x; cout << x << endl; } // Flushes 100k times -> TLE!',
        fixedCode: 'ios::sync_with_stdio(false); cin.tie(nullptr); // Use "\\n" instead of endl!',
        whyItBreaks: 'std::endl forces an expensive OS buffer flush on every single line.',
      },
      {
        title: 'Trap 3: Unchecked vector[idx] vs .at(idx) on Untrusted Index',
        brokenCode: 'return dp[user_idx]; // Out-of-bounds read leaks adjacent heap memory!',
        fixedCode: 'if (idx >= 0 && idx < dp.size()) return dp[idx];',
        whyItBreaks: 'operator[] skips bounds checks in C++ for raw speed.',
      },
    ],
    practiceSheet: [
      {
        id: 'cpp-ch-14-q1',
        difficulty: 'Easy',
        title: 'Warm-up: O(1)-Space Iterative Fibonacci',
        prompt: 'Compute fib(n) for n in [0..90] using bottom-up DP.',
        banglaHint: '`a = 0, b = 1` রোলিং ভ্যারিয়েবলে n ধাপে `a` প্রিন্ট করো।',
        starterCode: `#include <iostream>
using namespace std;
int main() {
    int n; if (!(cin >> n) || n < 0 || n > 90) return 0;
    long long a = 0, b = 1;
    for (int i = 0; i < n; i++) { long long t = a + b; a = b; b = t; }
    cout << a << "\\n";
    return 0;
}`,
        sampleStdin: '10',
        expectedOutput: '55',
      },
      {
        id: 'cpp-ch-14-q2',
        difficulty: 'Easy',
        title: 'Input Domain Sanitizer',
        prompt: 'Print VALID if n is within [1, 1000], else BLOCKED.',
        banglaHint: '`1 <= n && n <= 1000` শর্ত যাচাই করো।',
        starterCode: `#include <iostream>
using namespace std;
int main() {
    long long n = -1;
    if ((cin >> n) && n >= 1 && n <= 1000) cout << "VALID\\n";
    else cout << "BLOCKED\\n";
    return 0;
}`,
        sampleStdin: '5000',
        expectedOutput: 'BLOCKED',
      },
      {
        id: 'cpp-ch-14-q3',
        difficulty: 'Medium',
        title: 'fib(20) Memoized DP Vector',
        prompt: 'Compute fib(20) using a memo vector initialized to -1.',
        banglaHint: '`vector<long long> memo(n + 1, -1)` রেফারেন্স দিয়ে পাঠাও।',
        starterCode: `#include <iostream>
#include <vector>
using namespace std;
long long f(int n, vector<long long> &m) { return n <= 1 ? n : (m[n] != -1 ? m[n] : m[n] = f(n - 1, m) + f(n - 2, m)); }
int main() {
    int n; if (!(cin >> n) || n < 0 || n > 90) return 0;
    vector<long long> m(n + 1, -1);
    cout << f(n, m) << "\\n";
    return 0;
}`,
        sampleStdin: '20',
        expectedOutput: '6765',
      },
      {
        id: 'cpp-ch-14-q4',
        difficulty: 'Medium',
        title: 'HTML Sanitizer (XSS Escaper)',
        prompt: 'Escape `<` and `>` characters in input string into `&lt;` and `&gt;`.',
        banglaHint: '`string out;` এ প্রতিটি ক্যারেক্টার চেক করে নিরাপদ টেক্সট যোগ করো।',
        starterCode: `#include <iostream>
#include <string>
using namespace std;
int main() {
    string s, out; cin >> s;
    for (char c : s) {
        if (c == '<') out += "&lt;";
        else if (c == '>') out += "&gt;";
        else out += c;
    }
    cout << out << "\\n";
    return 0;
}`,
        sampleStdin: '<b>hi</b>',
        expectedOutput: '&lt;b&gt;hi&lt;/b&gt;',
      },
      {
        id: 'cpp-ch-14-q5',
        difficulty: 'Hard',
        title: 'House Robber Non-Adjacent Max Sum DP',
        prompt: 'Compute max sum of non-adjacent positive integers in O(n) time / O(1) space.',
        banglaHint: 'প্রতি ধাপে `take = prev2 + x` ও `skip = prev1`-এর ম্যাক্সিমাম নাও।',
        starterCode: `#include <algorithm>
#include <iostream>
using namespace std;
int main() {
    int n; cin >> n;
    long long prev2 = 0, prev1 = 0;
    for (int i = 0; i < n; i++) {
        long long x; cin >> x;
        long long cur = max(prev1, prev2 + x);
        prev2 = prev1; prev1 = cur;
    }
    cout << prev1 << "\\n";
    return 0;
}`,
        sampleStdin: '4\n2 7 9 3',
        expectedOutput: '11',
      },
    ],
    miniBuild: {
      title: 'C++ Mini Build: Bounded DP Optimizer & Sanitizer',
      description: 'Computes sub-microsecond Fibonacci DP guarded against overflow attacks.',
      banglaGoal: 'C++ DP মেমোরাইজেশন ও ইনপুট স্যানিটাইজেশন ইঞ্জিন তৈরি করা।',
      combinesChapters: 'Ch 1–14',
      starterCode: `#include <iostream>
using namespace std;
int main() {
    int n; if (!(cin >> n) || n < 0 || n > 90) return 0;
    long long a = 0, b = 1;
    for (int i = 0; i < n; i++) { long long t = a + b; a = b; b = t; }
    cout << a << "\\n";
    return 0;
}`,
      sampleStdin: '10',
      expectedOutput: '55',
    },
  },

  python: {
    title: 'Python Chapter 14 (3.13): @lru_cache DP Memoization, Profiling & Security (hmac/html.escape)',
    banglaTitle: 'Python অধ্যায় ১৪ (3.13): @lru_cache DP ক্যাশিং, প্রোফাইলিং ও সিকিউরিটি',
    subtitle: 'Speed up recursion 1,000,000x with functools.lru_cache, avoid O(n^2) string concat, and secure apps via html.escape & hmac.compare_digest.',
    zeroIntuition: {
      plainEnglishStory:
        'Python ships superpowers inside its standard library: **`@lru_cache(maxsize=None)`** automatically turns slow recursive math into an `O(1)` lookup cache in ONE line! Meanwhile, security modules like **`html.escape`** (kills XSS injection) and **`hmac.compare_digest`** (kills timing side-channels) are built straight into Python—never hand-roll crypto or escaping.',
      asciiFlowchart: `  PYTHON 3.13 PERFORMANCE + SECURITY TOOLKIT
  @lru_cache(maxsize=None) : Caches fib(k) in C dict -> O(n) total work!
  html.escape(untrusted)   : Converts "<script>" -> "&lt;script&gt;" (XSS Guard!)
  hmac.compare_digest(a,b) : Constant-time secret check (No timing leak!)`,
      pseudocode: [
        '1. CLAMP user input n safely into [0, 90] (DoS protection)',
        '2. DECORATE fib(n) with @lru_cache(maxsize=None)',
        '3. RETURN cached value if already solved, else solve once & cache',
        '4. PRINT result cleanly',
      ],
      banglaZeroToHero: {
        analogyTitle: 'এক লাইনে জাদুর ক্যাশ (@lru_cache) ও XSS শিল্ড (html.escape)',
        explanation:
          'সাধারণ রিকার্সন কোডের মাথার ওপর স্রেফ `@lru_cache(maxsize=None)` বসিয়ে দিলে Python ভেতরে ভেতরে একটি ডিকশনারি খাতা বানিয়ে প্রতিটি উত্তর টুকে রাখে—ফলে ৩৩ কোটি কলের কাজ মুহূর্তেই শেষ হয়! আর ওয়েবসাইটে ইউজারের লেখা দেখানোর আগে `html.escape()` দিলে হ্যাকারের `<script>` ট্যাগ নিষ্ক্রিয় হয়ে সাধারণ লেখায় পরিণত হয়।',
        everydayExample:
          'জ্যাঙ্গো বা ফাস্টএপিআই ব্যাকএন্ডে ব্যয়বহুল ট্যাক্স হিসাব ক্যাশ করা ও প্রোফাইলের বায়ো স্যানিটাইজ করা।',
        keyTakeaways: [
          '`@lru_cache(maxsize=None)` (বা Python 3.9+ `@cache`) দিলে ফাংশনের প্যারামিটার অবশ্যই **হ্যাশেবল** (`int`, `str`, `tuple`) হতে হবে।',
          'ডিফল্ট `lru_cache()`-এর `maxsize=128`; আনবাউন্ডেড DP-এর জন্য `maxsize=None` বা `@functools.cache` দিতে হয়।',
          'পাসওয়ার্ড/API টোকেন যাচাইয়ে `==` নয়, সব সময় `hmac.compare_digest(a, b)` ব্যবহার করবে।',
        ],
      },
    },
    codeExamples: [
      {
        id: 'py-14-ex-basic',
        tier: 'Basic',
        title: '1. Basic: @lru_cache DP Memoization With Bounds Clamp',
        banglaNote: '`@lru_cache(maxsize=None)` ও বাউন্ডারি ক্ল্যাম্পিং `[0, 90]` দিয়ে ফাস্ট ফিবোনাচি।',
        code: `import sys
from functools import lru_cache

@lru_cache(maxsize=None)
def fib(n: int) -> int:
    return n if n <= 1 else fib(n - 1) + fib(n - 2)

raw = sys.stdin.read().strip()
if raw:
    n = max(0, min(90, int(raw)))
    print(fib(n))`,
        stdin: '10',
        expectedOutput: '55',
      },
      {
        id: 'py-14-ex-edge',
        tier: 'Edge-Case',
        title: '2. Edge-Case: Preventing RecursionError on Large DP With Iterative Rolling State',
        banglaNote: '`n = 5000` এ `@lru_cache` রিকার্সন লিমিট (`1000`) পার করলে ক্র্যাশ করে—তাই বড় n-এ রোলিং লুপ নিরাপদ।',
        code: `import sys

raw = sys.stdin.read().strip()
n = max(0, min(90, int(raw))) if raw else 0
a, b = 0, 1
for _ in range(n):
    a, b = b, a + b
print(a)`,
        stdin: '20',
        expectedOutput: '6765',
      },
      {
        id: 'py-14-ex-opt',
        tier: 'Optimized',
        title: '3. Optimized: Built-In html.escape() Anti-XSS Input Sanitizer',
        banglaNote: 'Python বিল্ট-ইন `html.escape()` দিয়ে `<script>` ট্যাগ নিষ্ক্রিয় করা।',
        code: `import html
import sys

payload = sys.stdin.read().strip()
print(html.escape(payload, quote=True))`,
        stdin: '<script>alert("xss")</script>',
        expectedOutput: '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;',
      },
      {
        id: 'py-14-ex-cp',
        tier: 'CP Trick',
        title: '4. CP Trick: Constant-Time Secret Verification via hmac.compare_digest',
        banglaNote: 'টাইমিং সাইড-চ্যানেল অ্যাটাক ঠেকাতে `hmac.compare_digest` দিয়ে সিক্রেট যাচাই।',
        code: `import hmac
import sys

expected, provided = sys.stdin.read().split()
print("MATCH" if hmac.compare_digest(expected, provided) else "DENIED")`,
        stdin: 'sec_9921 sec_9921',
        expectedOutput: 'MATCH',
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 4',
        codeSnippet: '@lru_cache(maxsize=None)',
        whatItMeans: 'Wraps fib() inside a memoizing dictionary decorator caching every unique argument.',
        whyItIsThere: 'Prevents recomputing overlapping DP subproblems.',
        ifDeletedError: 'fib(40) drops to O(2^n) and causes Time Limit Exceeded!',
      },
      {
        lineNumber: 'Line 10',
        codeSnippet: 'n = max(0, min(90, int(raw)))',
        whatItMeans: 'Clamps untrusted input cleanly inside safe upper and lower limits.',
        whyItIsThere: 'Blocks Denial-of-Service CPU exhaustion and deep recursion crashes.',
        ifDeletedError: 'Negative or malicious n=100000 crashes with RecursionError.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'Clamp raw "10" -> n=10', memoryOrStack: 'cache = {}', note: 'Safe domain' },
      { step: 2, state: 'Solve base fib(0)=0, fib(1)=1', memoryOrStack: 'cache={0:0, 1:1}', note: 'Stored in dict' },
      { step: 3, state: 'Memoize fib(2)..fib(10)', memoryOrStack: '11 cache keys total', note: 'Zero duplicate calls' },
      { step: 4, state: 'print(55)', memoryOrStack: 'stdout: 55', note: 'Instant O(n)' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: Using str += chunk Inside Loop (O(n^2) Allocations)',
        brokenCode: 's = ""\nfor x in items: s += str(x) # Allocates new string every step!',
        fixedCode: 's = "".join(str(x) for x in items)',
        whyItBreaks: 'Python strings are immutable, so repeated += copies all prior bytes repeatedly.',
      },
      {
        title: 'Trap 2: Omitting maxsize=None on Multi-Thousand DP Cache',
        brokenCode: '@lru_cache() # Default maxsize=128 evicts keys and loses cache hits!',
        fixedCode: '@lru_cache(maxsize=None) # or @functools.cache',
        whyItBreaks: 'Evicting needed DP states forces expensive recomputation.',
      },
      {
        title: 'Trap 3: Trusting User HTML Without html.escape() or Parameterized SQL',
        brokenCode: 'query = f"SELECT * FROM users WHERE name = \'{user}\'" # SQL Injection!',
        fixedCode: 'cursor.execute("SELECT * FROM users WHERE name = ?", (user,))',
        whyItBreaks: 'String interpolation lets attackers break out of quotes and inject arbitrary SQL or `<script>` tags.',
      },
    ],
    practiceSheet: [
      {
        id: 'py-ch-14-q1',
        difficulty: 'Easy',
        title: 'Warm-up: @lru_cache Fibonacci',
        prompt: 'Compute fib(n) using @lru_cache with input clamping [0..90].',
        banglaHint: '`@lru_cache(maxsize=None)` ব্যবহার করে `fib(n)` প্রিন্ট করো।',
        starterCode: `import sys
from functools import lru_cache
@lru_cache(maxsize=None)
def fib(n: int) -> int: return n if n <= 1 else fib(n - 1) + fib(n - 2)
n = int(sys.stdin.read().strip())
print(fib(max(0, min(90, n))))`,
        sampleStdin: '10',
        expectedOutput: '55',
      },
      {
        id: 'py-ch-14-q2',
        difficulty: 'Easy',
        title: 'Input Domain Clamp Filter',
        prompt: 'Clamp incoming number safely into [0, 100] and output.',
        banglaHint: '`max(0, min(100, x))` দিয়ে বাউন্ড করো।',
        starterCode: `import sys
x = int(sys.stdin.read().strip())
print(max(0, min(100, x)))`,
        sampleStdin: '250',
        expectedOutput: '100',
      },
      {
        id: 'py-ch-14-q3',
        difficulty: 'Medium',
        title: 'Rolling O(1)-Space fib(20)',
        prompt: 'Compute fib(20) cleanly without recursion overhead.',
        banglaHint: '`a, b = b, a + b` রোলিং অ্যাসাইনমেন্ট ব্যবহার করো।',
        starterCode: `import sys
n = max(0, min(90, int(sys.stdin.read().strip())))
a, b = 0, 1
for _ in range(n): a, b = b, a + b
print(a)`,
        sampleStdin: '20',
        expectedOutput: '6765',
      },
      {
        id: 'py-ch-14-q4',
        difficulty: 'Medium',
        title: 'HTML XSS Escaper',
        prompt: 'Sanitize untrusted angle brackets and quotes with html.escape.',
        banglaHint: '`html.escape(payload, quote=True)` ব্যবহার করো।',
        starterCode: `import html, sys
print(html.escape(sys.stdin.read().strip(), quote=True))`,
        sampleStdin: '<b>hi</b>',
        expectedOutput: '&lt;b&gt;hi&lt;/b&gt;',
      },
      {
        id: 'py-ch-14-q5',
        difficulty: 'Hard',
        title: 'Max Non-Adjacent Sum DP',
        prompt: 'Compute max sum without selecting two adjacent elements.',
        banglaHint: '`cur = max(prev1, prev2 + x)` ট্রানজিশন সূত্র ব্যবহার করো।',
        starterCode: `import sys
nums = list(map(int, sys.stdin.read().split()))[1:]
p2 = p1 = 0
for x in nums: p2, p1 = p1, max(p1, p2 + x)
print(p1)`,
        sampleStdin: '4\n2 7 9 3',
        expectedOutput: '11',
      },
    ],
    miniBuild: {
      title: 'Python Mini Build: Memoized Optimizer & XSS Guard',
      description: 'Combines @lru_cache DP memoization with bounded integer sanitization.',
      banglaGoal: '@lru_cache DP ও ইনপুট বাউন্ডারি গার্ড দিয়ে নিরাপদ ইঞ্জিন তৈরি করা।',
      combinesChapters: 'Ch 1–14',
      starterCode: `import sys
from functools import lru_cache
@lru_cache(maxsize=None)
def fib(n: int) -> int: return n if n <= 1 else fib(n - 1) + fib(n - 2)
n = int(sys.stdin.read().strip())
print(fib(max(0, min(90, n))))`,
      sampleStdin: '10',
      expectedOutput: '55',
    },
  },

  java: {
    title: 'Java Chapter 14 (Java 21): Bottom-Up DP, StringBuilder Optimization & Security Checks',
    banglaTitle: 'Java অধ্যায় ১৪ (Java 21): DP ট্যাবুলেশন, StringBuilder ও ইনপুট সিকিউরিটি',
    subtitle: 'Beat GC thrashing with primitive long[] DP caches and StringBuilder, prevent SQL/XSS injection, and guard integer bounds.',
    zeroIntuition: {
      plainEnglishStory:
        'In Java, creating millions of boxed `Long` objects or concatenating `String +=` inside a loop forces the Garbage Collector to stall your app! Using primitive **`long[]`** rolling DP and **`StringBuilder`** keeps allocations near zero—while validating inputs and using `PreparedStatement` keeps your JVM service rock-solid against attacks.',
      asciiFlowchart: `  JAVA 21 PERFORMANCE & SECURITY CHECKLIST
  fib(n) DP     : long a = 0, b = 1  (0 GC allocations!)
  Text Building : StringBuilder sb   (O(n) instead of O(n^2) String +=)
  Security      : Math.addExact() overflow check + MessageDigest.isEqual()`,
      pseudocode: [
        '1. READ n and enforce bounds 0 <= n <= 90',
        '2. COMPUTE rolling primitive long a = 0, b = 1',
        '3. EMIT a cleanly',
      ],
      banglaZeroToHero: {
        analogyTitle: 'শূন্য-আবর্জনা (Zero-GC) প্রিমিটিভ লুপ ও কনস্ট্যান্ট-টাইম নিরাপত্তা',
        explanation:
          'লুপের ভেতর `String s += x` লিখলে প্রতিবার পুরনো স্ট্রিং ফেলে দিয়ে নতুন অবজেক্ট তৈরি হয়, যা Garbage Collector-কে চাপে ফেলে দেয়! তার বদলে `StringBuilder` ও `long` প্রিমিটিভ টাইপ ব্যবহার করলে মেমোরি থাকে পানির মতো পরিষ্কার। আর পাসওয়ার্ড/টোকেন তুলনায় `MessageDigest.isEqual` ব্যবহার করলে সাইড-চ্যানেল অ্যাটাক থেকেও বাঁচা যায়।',
        everydayExample:
          '১ লক্ষ রেকর্ডের CSV রিপোর্ট জেনারেট করতে `+` এর বদলে `StringBuilder` ব্যবহার করে সার্ভারের রেসপন্স ৫ সেকেন্ড থেকে ২০ মিলিসেকেন্ডে নামানো।',
        keyTakeaways: [
          'লুপে স্ট্রিং জোড়া লাগাতে সব সময় `StringBuilder` ব্যবহার করো।',
          '`MessageDigest.isEqual(byte[], byte[])` কনস্ট্যান্ট-টাইম সিকিউরিটি তুলনা করে।',
          'ইন্টিজার ওভারফ্লো ধরতে জাভা `Math.addExact(a, b)` ব্যবহার করা যায়।',
        ],
      },
    },
    codeExamples: [
      {
        id: 'java-14-ex-basic',
        tier: 'Basic',
        title: '1. Basic: Zero-Allocation DP Fibonacci With Bounds Validation',
        banglaNote: 'প্রিমিটিভ `long` রোলিং DP ও `[0..90]` বাউন্ডারি চেক।',
        code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        if (n < 0 || n > 90) return;
        long a = 0, b = 1;
        for (int i = 0; i < n; i++) {
            long next = a + b;
            a = b;
            b = next;
        }
        System.out.println(a);
    }
}`,
        stdin: '10',
        expectedOutput: '55',
      },
      {
        id: 'java-14-ex-edge',
        tier: 'Edge-Case',
        title: '2. Edge-Case: Overflow Guard With Math.addExact Detection',
        banglaNote: '`n > 90` হলে বাউন্ড চেক করে `OUT_OF_RANGE` রিটার্ন।',
        code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.hasNextInt() ? sc.nextInt() : -1;
        if (n < 0 || n > 90) {
            System.out.println("OUT_OF_RANGE");
            return;
        }
        long a = 0, b = 1;
        for (int i = 0; i < n; i++) {
            long next = Math.addExact(a, b);
            a = b; b = next;
        }
        System.out.println(a);
    }
}`,
        stdin: '95',
        expectedOutput: 'OUT_OF_RANGE',
      },
      {
        id: 'java-14-ex-opt',
        tier: 'Optimized',
        title: '3. Optimized: Memoized long[] Cache & StringBuilder Batch Output',
        banglaNote: '`long[] dp` টেবিল ও `StringBuilder` দিয়ে বহু কুয়েরির ফাস্ট আউটপুট।',
        code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        long[] dp = new long[91];
        dp[1] = 1;
        for (int i = 2; i <= 90; i++) dp[i] = dp[i - 1] + dp[i - 2];
        Scanner sc = new Scanner(System.in);
        int q = sc.nextInt();
        StringBuilder sb = new StringBuilder();
        while (q-- > 0) {
            int idx = sc.nextInt();
            if (idx >= 0 && idx <= 90) sb.append(dp[idx]).append('\\n');
        }
        System.out.print(sb.toString());
    }
}`,
        stdin: '3\n5 10 20',
        expectedOutput: '5\n55\n6765',
      },
      {
        id: 'java-14-ex-cp',
        tier: 'CP Trick',
        title: '4. CP Trick: Constant-Time Comparison via MessageDigest.isEqual',
        banglaNote: '`MessageDigest.isEqual` দিয়ে সিক্রেট টোকেন সাইড-চ্যানেল নিরাপদ যাচাই।',
        code: `import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        byte[] a = sc.next().getBytes(StandardCharsets.UTF_8);
        byte[] b = sc.next().getBytes(StandardCharsets.UTF_8);
        System.out.println(MessageDigest.isEqual(a, b) ? "MATCH" : "DENIED");
    }
}`,
        stdin: 'sec_9921 sec_9921',
        expectedOutput: 'MATCH',
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 8',
        codeSnippet: 'if (n < 0 || n > 90) return;',
        whatItMeans: 'Enforces strict numeric domain before entering DP iteration.',
        whyItIsThere: 'Signed long wraps cleanly around fib(93) unless guarded.',
        ifDeletedError: 'Out-of-range inputs produce wrapped negative Fibonacci numbers.',
      },
      {
        lineNumber: 'Line 9',
        codeSnippet: 'long a = 0, b = 1;',
        whatItMeans: 'Uses primitive 64-bit stack variables instead of heap Long objects.',
        whyItIsThere: 'Eliminates object boxing and GC pressure.',
        ifDeletedError: 'Cannot iterate DP sequence.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'Validate n = 10', memoryOrStack: 'a=0, b=1', note: 'Primitive stack slots' },
      { step: 2, state: 'Loop 10 iterations', memoryOrStack: 'a reaches 55', note: '0 Heap allocations' },
      { step: 3, state: 'System.out.println(a)', memoryOrStack: 'stdout: 55', note: 'Done' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: String Concatenation (+=) Inside Large Loop',
        brokenCode: 'String s = ""; for (int i=0; i<50000; i++) s += i; // O(n^2) GC storm!',
        fixedCode: 'StringBuilder sb = new StringBuilder(); for (int i=0; i<50000; i++) sb.append(i);',
        whyItBreaks: 'Each += allocates a brand new char/byte array copying all prior text.',
      },
      {
        title: 'Trap 2: Silent Signed Overflow Wrapping Into Negative',
        brokenCode: 'long res = a + b; // Wraps quietly to negative if > Long.MAX_VALUE!',
        fixedCode: 'long res = Math.addExact(a, b); // Throws ArithmeticException on overflow',
        whyItBreaks: 'Java 64-bit math uses silent two’s-complement wrap-around unless checked.',
      },
      {
        title: 'Trap 3: Non-Parameterized SQL String Building',
        brokenCode: 'stmt.execute("SELECT * FROM users WHERE id=" + userInput); // SQLi!',
        fixedCode: 'PreparedStatement ps = conn.prepareStatement("SELECT * FROM users WHERE id=?"); ps.setString(1, userInput);',
        whyItBreaks: 'Attacker input can terminate SQL syntax and execute arbitrary commands.',
      },
    ],
    practiceSheet: [
      {
        id: 'java-ch-14-q1',
        difficulty: 'Easy',
        title: 'Warm-up: Zero-GC DP Fibonacci',
        prompt: 'Compute fib(n) iteratively with primitive long variables.',
        banglaHint: '`long a = 0, b = 1` ব্যবহার করে `fib(n)` প্রিন্ট করো।',
        starterCode: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        int n = new Scanner(System.in).nextInt(); if (n < 0 || n > 90) return;
        long a = 0, b = 1; for (int i = 0; i < n; i++) { long t = a + b; a = b; b = t; }
        System.out.println(a);
    }
}`,
        sampleStdin: '10',
        expectedOutput: '55',
      },
      {
        id: 'java-ch-14-q2',
        difficulty: 'Easy',
        title: 'Input Bounds Clamp',
        prompt: 'Clamp integer cleanly into [0, 100].',
        banglaHint: '`Math.max(0, Math.min(100, x))` ব্যবহার করো।',
        starterCode: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        int x = new Scanner(System.in).nextInt();
        System.out.println(Math.max(0, Math.min(100, x)));
    }
}`,
        sampleStdin: '250',
        expectedOutput: '100',
      },
      {
        id: 'java-ch-14-q3',
        difficulty: 'Medium',
        title: 'fib(20) DP Verification',
        prompt: 'Verify bottom-up DP prints 6765 for n = 20.',
        banglaHint: '`n = 20` এর জন্য `long` ভ্যারিয়েবলে ফলাফল যাচাই করো।',
        starterCode: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        int n = new Scanner(System.in).nextInt(); if (n < 0 || n > 90) return;
        long a = 0, b = 1; for (int i = 0; i < n; i++) { long t = a + b; a = b; b = t; }
        System.out.println(a);
    }
}`,
        sampleStdin: '20',
        expectedOutput: '6765',
      },
      {
        id: 'java-ch-14-q4',
        difficulty: 'Medium',
        title: 'XSS StringBuilder Sanitizer',
        prompt: 'Escape `<` and `>` inside input token cleanly using StringBuilder.',
        banglaHint: '`StringBuilder`-এ `<` ও `>` বদলে `&lt;` ও `&gt;` বসাও।',
        starterCode: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        String s = new Scanner(System.in).next();
        StringBuilder sb = new StringBuilder();
        for (char c : s.toCharArray()) {
            if (c == '<') sb.append("&lt;"); else if (c == '>') sb.append("&gt;"); else sb.append(c);
        }
        System.out.println(sb.toString());
    }
}`,
        sampleStdin: '<b>hi</b>',
        expectedOutput: '&lt;b&gt;hi&lt;/b&gt;',
      },
      {
        id: 'java-ch-14-q5',
        difficulty: 'Hard',
        title: 'House Robber Non-Adjacent DP',
        prompt: 'Find max non-adjacent subsequence sum using rolling long state.',
        banglaHint: '`cur = Math.max(p1, p2 + x)` ব্যবহার করো।',
        starterCode: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt(); long p2 = 0, p1 = 0;
        for (int i = 0; i < n; i++) { long cur = Math.max(p1, p2 + sc.nextLong()); p2 = p1; p1 = cur; }
        System.out.println(p1);
    }
}`,
        sampleStdin: '4\n2 7 9 3',
        expectedOutput: '11',
      },
    ],
    miniBuild: {
      title: 'Java Mini Build: Zero-GC DP Optimizer',
      description: 'Computes bounded Fibonacci values cleanly without heap garbage.',
      banglaGoal: 'Java 21 প্রিমিটিভ DP ও সিকিউরিটি চেক একসাথে প্রয়োগ করা।',
      combinesChapters: 'Ch 1–14',
      starterCode: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        int n = new Scanner(System.in).nextInt(); if (n < 0 || n > 90) return;
        long a = 0, b = 1; for (int i = 0; i < n; i++) { long t = a + b; a = b; b = t; }
        System.out.println(a);
    }
}`,
      sampleStdin: '10',
      expectedOutput: '55',
    },
  },

  javascript: {
    title: 'JavaScript Chapter 14 (ES2025): Memoization Cache, V8 Speed & XSS Sanitization',
    banglaTitle: 'JavaScript অধ্যায় ১৪ (ES2025): মেমোরাইজেশন ক্যাশ, V8 স্পিড ও XSS নিরাপত্তা',
    subtitle: 'Collapse exponential recursion with Map memoization/rolling DP, keep V8 Hidden Classes monomorphic, and block XSS injections.',
    zeroIntuition: {
      plainEnglishStory:
        'JavaScript’s V8 JIT engine runs blazingly fast when objects keep a consistent shape (Hidden Class) and loops stay linear. Adding **Memoization (`Map` cache or rolling DP)** cuts `fib(40)` from 331 million calls down to 40 iterations—and escaping `<`, `>`, `&`, `"`, `\'` blocks Stored/Reflected **XSS** in frontend apps!',
      asciiFlowchart: `  FRONTEND PERFORMANCE + SECURITY GUARD
  DP Optimization: let a = 0, b = 1; (O(n) time, zero call-stack overflow!)
  XSS Prevention : Never inject untrusted HTML -> escapeHtml() or textContent!`,
      pseudocode: [
        '1. PARSE and clamp integer n safely inside [0, 78] (MAX_SAFE_INTEGER range)',
        '2. COMPUTE rolling DP [a, b] = [b, a + b]',
        '3. LOG a cleanly',
      ],
      banglaZeroToHero: {
        analogyTitle: 'জাভাস্ক্রিপ্টে নিরাপদ প্রদর্শন (XSS Guard) ও মেমোরাইজেশন ক্যাশ',
        explanation:
          'কল্পনা করো কমেন্ট বক্সে কেউ লিখল `<img src=x onerror=alert(cookie)>`। তুমি যদি সরাসরি `el.innerHTML` এ বসাও তবে হ্যাকার ইউজারের অ্যাকাউন্ট চুরি করে নেবে! আর যদি HTML এন্টিটি এস্কেপ (`&lt;`) বা `.textContent` ব্যবহার করো তবে ব্রাউজার সেটা কোড হিসেবে চালাবে না! পাশাপাশি **DP / Memoization** ফাংশনকে কয়েক হাজার গুণ দ্রুত করে।',
        everydayExample:
          'React ইউআইতে ব্যয়বহুল ফিল্টারিং `useMemo` দিয়ে ক্যাশ রাখা এবং ইউজার ইনপুট সব সময় নিরাপদে রেন্ডার করা।',
        keyTakeaways: [
          'JS-এ ৫৩-বিট `Number.MAX_SAFE_INTEGER` (৯×১০^১৫) পার করলে প্রিসিশন নষ্ট হয়; তাই বড় ফিবোনাচিতে `n <= 78` (অথবা `BigInt`) নিরাপদ।',
          'মেমোরাইজেশন ফাংশন বানাতে `const memo = new Map()` ব্যবহার করবে, `{}` নয়।',
          'কখনোই আনট্রাস্টেড স্ট্রিংয়ে `innerHTML` বা `eval()` ব্যবহার করবে না—সব সময় `textContent` বা এস্কেপিং! ',
        ],
      },
    },
    codeExamples: [
      {
        id: 'js-14-ex-basic',
        tier: 'Basic',
        title: '1. Basic: O(n) Time / O(1) Space DP Fibonacci',
        banglaNote: 'ডিস্ট্রাকচারিং সোয়াপ `[a, b] = [b, a + b]` দিয়ে দ্রুত ও ক্লিন ফিবোনাচি।',
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const n = Math.max(0, Math.min(78, Number(raw.trim())));
let a = 0, b = 1;
for (let i = 0; i < n; i++) [a, b] = [b, a + b];
console.log(a);`,
        stdin: '10',
        expectedOutput: '55',
      },
      {
        id: 'js-14-ex-edge',
        tier: 'Edge-Case',
        title: '2. Edge-Case: Safe MAX_SAFE_INTEGER Domain & Non-Numeric Guard',
        banglaNote: '`NaN` বা `n > 78` ইনপুটে প্রিসিশন লস না ঘটিয়ে `INVALID` প্রিন্ট।',
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const n = Number(raw.trim());
if (!Number.isInteger(n) || n < 0 || n > 78) {
  console.log('INVALID');
} else {
  let a = 0, b = 1;
  for (let i = 0; i < n; i++) [a, b] = [b, a + b];
  console.log(a);
}`,
        stdin: '95',
        expectedOutput: 'INVALID',
      },
      {
        id: 'js-14-ex-opt',
        tier: 'Optimized',
        title: '3. Optimized: Reusable Map Memoization Wrapper',
        banglaNote: 'যেকোনো পিওর ফাংশনকে `new Map()` ক্যাশ দিয়ে মেমোরাইজড ভার্সনে রূপান্তর।',
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const memo = new Map([[0, 0], [1, 1]]);
function fib(k) {
  if (memo.has(k)) return memo.get(k);
  const val = fib(k - 1) + fib(k - 2);
  memo.set(k, val);
  return val;
}
console.log(fib(Number(raw.trim())));`,
        stdin: '20',
        expectedOutput: '6765',
      },
      {
        id: 'js-14-ex-cp',
        tier: 'CP Trick',
        title: '4. CP Trick: Pure HTML XSS Sanitizer Function',
        banglaNote: 'সার্ভার বা ব্রাউজার দুই জায়গাতেই `< > & " \'` এস্কেপ করে নিরাপদ HTML টেক্সট বানানো।',
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const escapeHtml = (s) => s
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');
console.log(escapeHtml(raw.trim()));`,
        stdin: '<script>alert("xss")</script>',
        expectedOutput: '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;',
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 3',
        codeSnippet: 'const n = Math.max(0, Math.min(78, Number(raw.trim())));',
        whatItMeans: 'Sanitizes n into exact safe 53-bit integer Fibonacci bounds.',
        whyItIsThere: 'fib(79) exceeds Number.MAX_SAFE_INTEGER and loses low digits!',
        ifDeletedError: 'Out-of-range inputs produce inaccurate rounded numbers.',
      },
      {
        lineNumber: 'Line 5',
        codeSnippet: 'for (let i = 0; i < n; i++) [a, b] = [b, a + b];',
        whatItMeans: 'Rolls state forward cleanly in O(n) steps without recursion.',
        whyItIsThere: 'Prevents call stack overflow and exponential time.',
        ifDeletedError: 'Output stays 0.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'Clamp "10" -> n=10', memoryOrStack: 'a=0, b=1', note: 'Safe 53-bit range' },
      { step: 2, state: 'Loop i = 0..9', memoryOrStack: 'a: 0->1->1->...->55', note: '0 Map overhead' },
      { step: 3, state: 'console.log(55)', memoryOrStack: 'stdout: 55', note: 'Complete' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: Exceeding Number.MAX_SAFE_INTEGER (2^53 - 1) Silently',
        brokenCode: 'console.log(9007199254740992 + 1 === 9007199254740992); // TRUE! Precision lost!',
        fixedCode: '// Clamp n <= 78 for Number, OR use BigInt (0n, 1n) for huge integer math!',
        whyItBreaks: 'JS Numbers are 64-bit IEEE-754 floats with only 53 bits of exact integer precision.',
      },
      {
        title: 'Trap 2: Injecting User Text Into DOM With innerHTML',
        brokenCode: 'card.innerHTML = userBio; // Executes <img src=x onerror=stealToken()>!',
        fixedCode: 'card.textContent = userBio; // Browser renders raw text safely',
        whyItBreaks: 'innerHTML invokes the HTML parser and runs embedded event-handler scripts.',
      },
      {
        title: 'Trap 3: Dynamic Keys Causing Megamorphic De-Optimization in Hot Loops',
        brokenCode: 'for (const item of arr) item["extra_" + i] = true; // Changes object shape!',
        fixedCode: '// Keep consistent object properties and store dynamic flags in a separate Map or Array.',
        whyItBreaks: 'Mutating object shapes forces V8 JIT to discard optimized machine code.',
      },
    ],
    practiceSheet: [
      {
        id: 'js-ch-14-q1',
        difficulty: 'Easy',
        title: 'Warm-up: Rolling DP Fibonacci',
        prompt: 'Compute fib(n) in O(n) time and O(1) memory.',
        banglaHint: '`[a, b] = [b, a + b]` লুপ চালিয়ে `a` প্রিন্ট করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const n = Number(raw.trim()); let a = 0, b = 1;
for (let i = 0; i < n; i++) [a, b] = [b, a + b];
console.log(a);`,
        sampleStdin: '10',
        expectedOutput: '55',
      },
      {
        id: 'js-ch-14-q2',
        difficulty: 'Easy',
        title: 'Domain Clamp Guard',
        prompt: 'Clamp numeric input cleanly into [0, 100].',
        banglaHint: '`Math.max(0, Math.min(100, x))` ব্যবহার করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const x = Number(raw.trim());
console.log(Math.max(0, Math.min(100, x)));`,
        sampleStdin: '250',
        expectedOutput: '100',
      },
      {
        id: 'js-ch-14-q3',
        difficulty: 'Medium',
        title: 'Map Memoized fib(20)',
        prompt: 'Compute fib(20) using a Map cache.',
        banglaHint: '`const cache = new Map([[0,0],[1,1]])` দিয়ে মেমোরাইজেশন করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const memo = new Map([[0, 0], [1, 1]]);
const fib = (k) => { if (memo.has(k)) return memo.get(k); const v = fib(k - 1) + fib(k - 2); memo.set(k, v); return v; };
console.log(fib(Number(raw.trim())));`,
        sampleStdin: '20',
        expectedOutput: '6765',
      },
      {
        id: 'js-ch-14-q4',
        difficulty: 'Medium',
        title: 'XSS Escape Utility',
        prompt: 'Escape `<` and `>` inside untrusted input string.',
        banglaHint: '`.replace(/</g, "&lt;")` ও `.replace(/>/g, "&gt;")` চালাও।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
console.log(raw.trim().replace(/</g, '&lt;').replace(/>/g, '&gt;'));`,
        sampleStdin: '<b>hi</b>',
        expectedOutput: '&lt;b&gt;hi&lt;/b&gt;',
      },
      {
        id: 'js-ch-14-q5',
        difficulty: 'Hard',
        title: 'House Robber Non-Adjacent Sum DP',
        prompt: 'Compute maximum sum of non-adjacent items cleanly in O(n).',
        banglaHint: '`Math.max(p1, p2 + x)` রোলিং আপডেট ব্যবহার করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const nums = raw.trim().split(/\\s+/).map(Number).slice(1);
let p2 = 0, p1 = 0;
for (const x of nums) { const cur = Math.max(p1, p2 + x); p2 = p1; p1 = cur; }
console.log(p1);`,
        sampleStdin: '4\n2 7 9 3',
        expectedOutput: '11',
      },
    ],
    miniBuild: {
      title: 'JavaScript Mini Build: V8 DP Cache & XSS Sanitizer',
      description: 'Computes bounded Fibonacci values in O(1) RAM while teaching safe DOM hygiene.',
      banglaGoal: 'JS মেমোরাইজেশন ও XSS স্যানিটাইজেশন দিয়ে ফাস্ট ও সেফ ফ্রন্টএন্ড লজিক গড়া।',
      combinesChapters: 'Ch 1–14',
      starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const n = Number(raw.trim()); let a = 0, b = 1;
for (let i = 0; i < n; i++) [a, b] = [b, a + b];
console.log(a);`,
      sampleStdin: '10',
      expectedOutput: '55',
    },
  },

  rust: {
    title: 'Rust Chapter 14 (2024): Checked Math, Zero-Cost DP Optimization & Sanitization',
    banglaTitle: 'Rust অধ্যায় ১৪ (2024): চেকড ম্যাথ (Overflow Safety), জিরো-কস্ট DP ও স্যানিটাইজেশন',
    subtitle: 'Eliminate integer-overflow security bugs with checked_add/saturating_add, optimize DP in O(1) space, and slice zero-copy &str.',
    zeroIntuition: {
      plainEnglishStory:
        'In C/C++, silent integer overflow in memory allocation size (`n * sizeof(T)`) causes catastrophic heap buffer overflows! Rust solves both performance and security: release builds optimize iterators & rolling DP into zero-overhead machine code, while `.checked_add()` catches integer overflow cleanly as `None` before corruption ever happens.',
      asciiFlowchart: `  RUST ZERO-COST SPEED + CHECKED SECURITY
  fib(n) rolling DP: (a, b) = (0u64, 1u64)  -> Single CPU register loop!
  a.checked_add(b) -> Some(sum) or None     -> Zero silent wraparound attacks!`,
      pseudocode: [
        '1. PARSE n cleanly with unwrap_or(0)',
        '2. GUARD domain via .checked_add() or clamp <= 90',
        '3. ITERATE O(n) steps updating (a, b)',
        '4. PRINT a cleanly',
      ],
      banglaZeroToHero: {
        analogyTitle: 'রকেটের স্পিড (Zero-Cost DP) ও অটো-ব্রেক (.checked_add)',
        explanation:
          'হ্যাকাররা প্রায়ই বড় সংখ্যা দিয়ে C/C++ প্রোগ্রামের `a + b` ওভারফ্লো ঘটিয়ে নেগেটিভ সাইজের মেমোরি বরাদ্দ করায়! Rust-এ `a.checked_add(b)` ব্যবহার করলে ওভারফ্লো হওয়ার মুহূর্তেই `None` রিটার্ন করে অ্যালগরিদম থামিয়ে দেওয়া যায়—আর একই সাথে সাধারণ লুপ C-এর সমান গতিতেই চলে!',
        everydayExample:
          'ফিনটেক পেমেন্ট সার্ভারে `amount.checked_add(fee)` ব্যবহার করে অ্যাকাউন্ট ব্যালেন্স র‍্যাপ-অ্যারাউন্ড হ্যাক ঠেকানো।',
        keyTakeaways: [
          'ডিবাগ মোডে Rust ওভারফ্লোতে প্যানিক করে, কিন্তু রিলিজে র‍্যাপ করে—তাই সিকিউরিটি-ক্রিটিক্যাল কোডে সব সময় `.checked_add()` দেবে।',
          '`&str` স্লাইস দিয়ে টেক্সট প্রসেস করলে অপ্রয়োজনীয় স্ট্রিং হিপ কপি হয় না।',
          'মেমোরাইজেশন বা DP টেবিল সব সময় ফ্ল্যাট `Vec<u64>` হিসেবে রাখলে CPU ক্যাশে ফিট করে।',
        ],
      },
    },
    codeExamples: [
      {
        id: 'rust-14-ex-basic',
        tier: 'Basic',
        title: '1. Basic: Zero-Heap O(n) / O(1)-Space DP Fibonacci',
        banglaNote: 'দুইটি `u64` রেজিস্টারে হিপ অ্যালোকেশন ছাড়াই দ্রুত `fib(n)` নির্ণয়।',
        code: `use std::io::{self, Read};

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let n: usize = s.trim().parse().unwrap_or(0).min(90);
    let (mut a, mut b) = (0u64, 1u64);
    for _ in 0..n {
        let next = a + b;
        a = b;
        b = next;
    }
    println!("{}", a);
}`,
        stdin: '10',
        expectedOutput: '55',
      },
      {
        id: 'rust-14-ex-edge',
        tier: 'Edge-Case',
        title: '2. Edge-Case: checked_add() Overflow Security Guard',
        banglaNote: '`u64::checked_add` ব্যবহার করে যেকোনো ওভারফ্লো ঝুঁকি মুহূর্তে ধরে `OVERFLOW` রিটার্ন।',
        code: `use std::io::{self, Read};

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let n: usize = s.trim().parse().unwrap_or(0);
    let (mut a, mut b) = (0u64, 1u64);
    for _ in 0..n {
        let Some(next) = a.checked_add(b) else {
            println!("OVERFLOW");
            return;
        };
        a = b;
        b = next;
    }
    println!("{}", a);
}`,
        stdin: '95',
        expectedOutput: 'OVERFLOW',
      },
      {
        id: 'rust-14-ex-opt',
        tier: 'Optimized',
        title: '3. Optimized: Flat Vec<u64> DP Lookup Cache',
        banglaNote: 'একবার ফ্ল্যাট `Vec<u64>` টেবিল বানিয়ে একাধিক কুয়েরিতে O(1) ক্যাশ হিট।',
        code: `use std::io::{self, Read};

fn main() {
    let mut dp = vec![0u64; 91];
    dp[1] = 1;
    for i in 2..=90 { dp[i] = dp[i - 1] + dp[i - 2]; }
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    for tok in s.split_whitespace().skip(1) {
        let idx: usize = tok.parse().unwrap_or(91);
        if let Some(val) = dp.get(idx) {
            println!("{}", val);
        }
    }
}`,
        stdin: '3\n5 10 20',
        expectedOutput: '5\n55\n6765',
      },
      {
        id: 'rust-14-ex-cp',
        tier: 'CP Trick',
        title: '4. CP Trick: Single-Pass HTML Entity Escaper',
        banglaNote: 'ইনপুটের ওপর একটি লিনিয়ার পাস চালিয়ে `< > &` স্যানিটাইজ করা।',
        code: `use std::io::{self, Read};

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let trimmed = s.trim();
    let mut out = String::with_capacity(trimmed.len());
    for ch in trimmed.chars() {
        match ch {
            '<' => out.push_str("&lt;"),
            '>' => out.push_str("&gt;"),
            '&' => out.push_str("&amp;"),
            _ => out.push(ch),
        }
    }
    println!("{}", out);
}`,
        stdin: '<script>',
        expectedOutput: '&lt;script&gt;',
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 6',
        codeSnippet: 'let n: usize = s.trim().parse().unwrap_or(0).min(90);',
        whatItMeans: 'Parses string safely and caps range at 90 cleanly without panicking.',
        whyItIsThere: 'Blocks malformed text crashes and unbounded loop DoS.',
        ifDeletedError: 'Code cannot determine iteration count.',
      },
      {
        lineNumber: 'Line 7-11',
        codeSnippet: 'let (mut a, mut b) = (0u64, 1u64); for _ in 0..n { ... }',
        whatItMeans: 'Executes rolling DP entirely inside CPU registers.',
        whyItIsThere: 'Achieves maximum throughput with 0 heap allocations.',
        ifDeletedError: 'Cannot compute Fibonacci state.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'Parse & cap "10" -> 10', memoryOrStack: 'a=0, b=1', note: 'Stack registers only' },
      { step: 2, state: '10 loop iterations', memoryOrStack: 'a=55, b=89', note: 'Zero overflow' },
      { step: 3, state: 'println!("55")', memoryOrStack: 'stdout: 55', note: 'Complete' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: Assuming Debug Overflow Panics Protect Release Builds',
        brokenCode: 'let x = a + b; // Panics in debug, WRAPS silently in --release!',
        fixedCode: 'let x = a.checked_add(b).expect("overflow guard");',
        whyItBreaks: 'Rust omits runtime overflow panics in release mode for performance unless checked_* methods are used.',
      },
      {
        title: 'Trap 2: Reallocating String Inside Hot Formatting Loops',
        brokenCode: 'let mut s = String::new(); // No pre-reserved capacity -> multiple heap reallocs!',
        fixedCode: 'let mut s = String::with_capacity(expected_len);',
        whyItBreaks: 'Repeated exponential growth copies characters unnecessarily.',
      },
      {
        title: 'Trap 3: Direct Indexing vec[idx] From External User Input',
        brokenCode: 'println!("{}", dp[user_idx]); // Panics & crashes server if user sends 999!',
        fixedCode: 'if let Some(v) = dp.get(user_idx) { println!("{}", v); }',
        whyItBreaks: 'Unvalidated external indices trigger panic-based Denial of Service.',
      },
    ],
    practiceSheet: [
      {
        id: 'rust-ch-14-q1',
        difficulty: 'Easy',
        title: 'Warm-up: O(1)-Space DP Fibonacci',
        prompt: 'Compute fib(n) using two rolling u64 registers.',
        banglaHint: '`(mut a, mut b) = (0u64, 1u64)` দিয়ে `a` প্রিন্ট করো।',
        starterCode: `use std::io::{self, Read};
fn main() {
    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();
    let n: usize = s.trim().parse().unwrap_or(0).min(90);
    let (mut a, mut b) = (0u64, 1u64);
    for _ in 0..n { let t = a + b; a = b; b = t; }
    println!("{}", a);
}`,
        sampleStdin: '10',
        expectedOutput: '55',
      },
      {
        id: 'rust-ch-14-q2',
        difficulty: 'Easy',
        title: 'Safe Clamp Filter',
        prompt: 'Clamp parsed i64 cleanly into 0..=100.',
        banglaHint: 'Rust-এ `.clamp(0, 100)` বিল্ট-ইন মেথড আছে!',
        starterCode: `use std::io::{self, Read};
fn main() {
    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();
    let x: i64 = s.trim().parse().unwrap_or(0);
    println!("{}", x.clamp(0, 100));
}`,
        sampleStdin: '250',
        expectedOutput: '100',
      },
      {
        id: 'rust-ch-14-q3',
        difficulty: 'Medium',
        title: 'fib(20) Checked DP',
        prompt: 'Compute fib(20) using checked_add safety.',
        banglaHint: '`a.checked_add(b)` দিয়ে নিরাপদে ২০তম ফিবোনাচি বের করো।',
        starterCode: `use std::io::{self, Read};
fn main() {
    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();
    let n: usize = s.trim().parse().unwrap_or(0);
    let (mut a, mut b) = (0u64, 1u64);
    for _ in 0..n { if let Some(t) = a.checked_add(b) { a = b; b = t; } }
    println!("{}", a);
}`,
        sampleStdin: '20',
        expectedOutput: '6765',
      },
      {
        id: 'rust-ch-14-q4',
        difficulty: 'Medium',
        title: 'Zero-Allocation HTML Tag Escaper',
        prompt: 'Escape `<` and `>` inside input into `&lt;` and `&gt;`.',
        banglaHint: '`String::with_capacity` নিয়ে ক্যারেক্টার ম্যাচ করো।',
        starterCode: `use std::io::{self, Read};
fn main() {
    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();
    let mut out = String::with_capacity(s.len());
    for c in s.trim().chars() {
        match c { '<' => out.push_str("&lt;"), '>' => out.push_str("&gt;"), _ => out.push(c) }
    }
    println!("{}", out);
}`,
        sampleStdin: '<b>hi</b>',
        expectedOutput: '&lt;b&gt;hi&lt;/b&gt;',
      },
      {
        id: 'rust-ch-14-q5',
        difficulty: 'Hard',
        title: 'House Robber Rolling DP',
        prompt: 'Find max non-adjacent subsequence sum in O(n) time / O(1) space.',
        banglaHint: '`let cur = p1.max(p2 + x)` ব্যবহার করো।',
        starterCode: `use std::io::{self, Read};
fn main() {
    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();
    let (mut p2, mut p1) = (0u64, 0u64);
    for tok in s.split_whitespace().skip(1) {
        let x: u64 = tok.parse().unwrap_or(0);
        let cur = p1.max(p2 + x);
        p2 = p1; p1 = cur;
    }
    println!("{}", p1);
}`,
        sampleStdin: '4\n2 7 9 3',
        expectedOutput: '11',
      },
    ],
    miniBuild: {
      title: 'Rust Mini Build: Checked-Math DP & Sanitizer Core',
      description: 'Computes bounded Fibonacci values cleanly with overflow-proof checked arithmetic.',
      banglaGoal: 'Rust-এ জিরো-কস্ট DP ও ওভারফ্লো-মুক্ত সিকিউরিটি ইঞ্জিন তৈরি করা।',
      combinesChapters: 'Ch 1–14',
      starterCode: `use std::io::{self, Read};
fn main() {
    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();
    let n: usize = s.trim().parse().unwrap_or(0).min(90);
    let (mut a, mut b) = (0u64, 1u64);
    for _ in 0..n { let t = a + b; a = b; b = t; }
    println!("{}", a);
}`,
      sampleStdin: '10',
      expectedOutput: '55',
    },
  },

  typescript: {
    title: 'TypeScript Chapter 14 (TS 5.x): Typed Memoization Caches, Branded Sanitizers & Security',
    banglaTitle: 'TypeScript অধ্যায় ১৪ (TS 5.x): টাইপড মেমোরাইজেশন ক্যাশ ও XSS স্যানিটাইজার',
    subtitle: 'Enforce strict input bounds and compile-time XSS safety with typed SafeHtml converters and Map<number, number> DP caches.',
    zeroIntuition: {
      plainEnglishStory:
        'Great TypeScript engineers use the type system for **security**, not just autocomplete! By isolating untrusted strings behind an explicit `escapeHtml(raw: string): string` sanitizer and bounding DP functions with `Map<number, number>` or rolling iteration, bugs like unescaped XSS or exponential slowdowns get caught fast.',
      asciiFlowchart: `  TYPESCRIPT PERFORMANCE & SECURITY LAYER
  Input raw string -> escapeHtml() -> Safe escaped string
  Input integer n  -> Clamp [0..78] -> Rolling O(1) DP -> Exact fib(n)`,
      pseudocode: [
        '1. READ n: number from stdin and bound cleanly',
        '2. COMPUTE rolling DP (a, b) = (b, a + b)',
        '3. LOG typed number output',
      ],
      banglaZeroToHero: {
        analogyTitle: 'টাইপ-সেফ স্যানিটাইজার গেট ও দ্রুতগতির ড্যাশবোর্ড ক্যাশ',
        explanation:
          'বড় TypeScript অ্যাপে ইউজারের কাঁচা ইনপুট যেন সরাসরি পেজে না যায় সেজন্য একটি `escapeHtml()` ফাংশন দিয়ে পার করে নেওয়া হয়। আর ব্যয়বহুল হিসাব-নিকাশ `Map<number, number>` বা রোলিং DP দিয়ে মুহূর্তেই ক্যাশ করা থাকে!',
        everydayExample:
          'একটি চ্যাট বা ড্যাশবোর্ড অ্যাপে প্রদর্শিত মেসেজ এস্কেপ করা ও স্ট্যাটস চার্টের প্রিফিক্স/ফিবোনাচি ডেটা ক্যাশ করা।',
        keyTakeaways: [
          'সব ইউজার ইনপুট সংখ্যাকে `Number.isInteger(n)` দিয়ে যাচাই করো—`NaN` হলে পুরো লুপ এড়িয়ে যায়।',
          'মেমোরাইজড ক্যাশে `Map<number, number>` ব্যবহার করলে টাইপ সেফটি ও O(1) লুকআপ দুই-ই মেলে।',
          'XSS এস্কেপিংয়ের ফাংশন সব সময় আলাদা ইউটিলিটিতে রাখা ভালো।',
        ],
      },
    },
    codeExamples: [
      {
        id: 'ts-14-ex-basic',
        tier: 'Basic',
        title: '1. Basic: Typed O(n) / O(1)-Space DP Fibonacci',
        banglaNote: 'টাইপ-সেফ রোলিং ভ্যারিয়েবলে দ্রুত O(n) ফিবোনাচি হিসাব।',
        code: `import * as fs from 'fs';

const n: number = Number(fs.readFileSync(0, 'utf8').trim());
let a = 0, b = 1;
for (let i = 0; i < n; i++) [a, b] = [b, a + b];
console.log(a);`,
        stdin: '10',
        expectedOutput: '55',
      },
      {
        id: 'ts-14-ex-edge',
        tier: 'Edge-Case',
        title: '2. Edge-Case: Strict Integer Domain & Overflow Guard',
        banglaNote: 'অবৈধ বা `n > 78` ইনপুটে প্রিসিশন নষ্ট না করে `INVALID` প্রিন্ট।',
        code: `import * as fs from 'fs';

const n: number = Number(fs.readFileSync(0, 'utf8').trim());
if (!Number.isInteger(n) || n < 0 || n > 78) {
  console.log('INVALID');
} else {
  let a = 0, b = 1;
  for (let i = 0; i < n; i++) [a, b] = [b, a + b];
  console.log(a);
}`,
        stdin: '95',
        expectedOutput: 'INVALID',
      },
      {
        id: 'ts-14-ex-opt',
        tier: 'Optimized',
        title: '3. Optimized: Typed Map<number, number> Memoizer',
        banglaNote: '`Map<number, number>` ক্যাশ দিয়ে রিকার্সন মেমোরাইজেশন।',
        code: `import * as fs from 'fs';

const cache = new Map<number, number>([[0, 0], [1, 1]]);
function fib(k: number): number {
  const hit = cache.get(k);
  if (hit !== undefined) return hit;
  const val = fib(k - 1) + fib(k - 2);
  cache.set(k, val);
  return val;
}
console.log(fib(Number(fs.readFileSync(0, 'utf8').trim())));`,
        stdin: '20',
        expectedOutput: '6765',
      },
      {
        id: 'ts-14-ex-cp',
        tier: 'CP Trick',
        title: '4. CP Trick: Strict XSS Input Sanitizer Contract',
        banglaNote: 'আনট্রাস্টেড ইনপুটের HTML মেটা-ক্যারেক্টার নিরাপদে এস্কেপ করা।',
        code: `import * as fs from 'fs';

function escapeHtml(raw: string): string {
  return raw
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
console.log(escapeHtml(fs.readFileSync(0, 'utf8').trim()));`,
        stdin: '<script>alert("xss")</script>',
        expectedOutput: '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;',
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 3',
        codeSnippet: 'const n: number = Number(fs.readFileSync(0, "utf8").trim());',
        whatItMeans: 'Reads stdin text cleanly and coerces into numeric type.',
        whyItIsThere: 'Establishes typed loop upper bound.',
        ifDeletedError: 'Loop bound n is undefined.',
      },
      {
        lineNumber: 'Line 5',
        codeSnippet: 'for (let i = 0; i < n; i++) [a, b] = [b, a + b];',
        whatItMeans: 'Destructuring update advances DP state without temporary variable.',
        whyItIsThere: 'Runs in O(n) steps with O(1) memory.',
        ifDeletedError: 'Always prints 0.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'Parse n = 10', memoryOrStack: 'a=0, b=1', note: 'Typed numbers' },
      { step: 2, state: '10 rolling swaps', memoryOrStack: 'a=55, b=89', note: 'Fast linear pass' },
      { step: 3, state: 'console.log(55)', memoryOrStack: 'stdout: 55', note: 'Verified' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: Bypassing Type Guard With `as` Cast on Untrusted JSON',
        brokenCode: 'const payload = JSON.parse(raw) as UserDto; // Zero runtime check!',
        fixedCode: '// Validate required fields & types at runtime (typeof / Number.isInteger) before casting!',
        whyItBreaks: 'TypeScript type assertions vanish at runtime and never inspect incoming attacker payloads.',
      },
      {
        title: 'Trap 2: Omitting `undefined` Check on Map.get() With Numeric 0',
        brokenCode: 'if (cache.get(0)) return cache.get(0)!; // 0 is falsy -> recomputes forever!',
        fixedCode: 'const hit = cache.get(k); if (hit !== undefined) return hit;',
        whyItBreaks: 'DP values like 0 are valid cache hits; truthy checks miss 0!',
      },
      {
        title: 'Trap 3: Direct DOM innerHTML Assignment Without Sanitizer',
        brokenCode: 'el.innerHTML = comment; // XSS injection vector!',
        fixedCode: 'el.textContent = comment;',
        whyItBreaks: 'Allows embedded `<script>` or `onerror=` JavaScript execution.',
      },
    ],
    practiceSheet: [
      {
        id: 'ts-ch-14-q1',
        difficulty: 'Easy',
        title: 'Warm-up: Typed O(1)-Space Fibonacci',
        prompt: 'Compute fib(n) cleanly using rolling numeric state.',
        banglaHint: '`[a, b] = [b, a + b]` লুপে `a` প্রিন্ট করো।',
        starterCode: `import * as fs from 'fs';
const n: number = Number(fs.readFileSync(0, 'utf8').trim());
let a = 0, b = 1;
for (let i = 0; i < n; i++) [a, b] = [b, a + b];
console.log(a);`,
        sampleStdin: '10',
        expectedOutput: '55',
      },
      {
        id: 'ts-ch-14-q2',
        difficulty: 'Easy',
        title: 'Bounded Clamp Security Helper',
        prompt: 'Clamp numeric value cleanly into [0, 100].',
        banglaHint: '`Math.max(0, Math.min(100, x))` ব্যবহার করো।',
        starterCode: `import * as fs from 'fs';
const x: number = Number(fs.readFileSync(0, 'utf8').trim());
console.log(Math.max(0, Math.min(100, x)));`,
        sampleStdin: '250',
        expectedOutput: '100',
      },
      {
        id: 'ts-ch-14-q3',
        difficulty: 'Medium',
        title: 'Map<number, number> Memoized fib(20)',
        prompt: 'Compute fib(20) cleanly via Map memoization.',
        banglaHint: '`hit !== undefined` চেক দিয়ে ক্যাশ হিট ধরো।',
        starterCode: `import * as fs from 'fs';
const memo = new Map<number, number>([[0, 0], [1, 1]]);
function fib(k: number): number {
  const hit = memo.get(k);
  if (hit !== undefined) return hit;
  const v = fib(k - 1) + fib(k - 2);
  memo.set(k, v);
  return v;
}
console.log(fib(Number(fs.readFileSync(0, 'utf8').trim())));`,
        sampleStdin: '20',
        expectedOutput: '6765',
      },
      {
        id: 'ts-ch-14-q4',
        difficulty: 'Medium',
        title: 'XSS Tag Escaper Utility',
        prompt: 'Escape `<` and `>` characters cleanly in string input.',
        banglaHint: '`raw.replace(/</g, "&lt;")` ও `>` এস্কেপ করো।',
        starterCode: `import * as fs from 'fs';
const raw: string = fs.readFileSync(0, 'utf8').trim();
console.log(raw.replace(/</g, '&lt;').replace(/>/g, '&gt;'));`,
        sampleStdin: '<b>hi</b>',
        expectedOutput: '&lt;b&gt;hi&lt;/b&gt;',
      },
      {
        id: 'ts-ch-14-q5',
        difficulty: 'Hard',
        title: 'House Robber Rolling DP',
        prompt: 'Compute maximum non-adjacent subsequence sum in O(n) time.',
        banglaHint: '`Math.max(p1, p2 + x)` ব্যবহার করো।',
        starterCode: `import * as fs from 'fs';
const nums: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number).slice(1);
let p2 = 0, p1 = 0;
for (const x of nums) { const cur = Math.max(p1, p2 + x); p2 = p1; p1 = cur; }
console.log(p1);`,
        sampleStdin: '4\n2 7 9 3',
        expectedOutput: '11',
      },
    ],
    miniBuild: {
      title: 'TypeScript Mini Build: Typed DP & Input Sanitizer',
      description: 'Computes bounded Fibonacci values cleanly with strict runtime validation.',
      banglaGoal: 'TypeScript-এ অপটিমাইজড ক্যাশিং ও XSS-নিরাপদ ইনপুট ফিল্টারিং।',
      combinesChapters: 'Ch 1–14',
      starterCode: `import * as fs from 'fs';
const n: number = Number(fs.readFileSync(0, 'utf8').trim());
let a = 0, b = 1;
for (let i = 0; i < n; i++) [a, b] = [b, a + b];
console.log(a);`,
      sampleStdin: '10',
      expectedOutput: '55',
    },
  },

  html: {
    title: 'HTML5 Chapter 14: XSS Defense (textContent vs innerHTML), CSP & Core Web Vitals Speed',
    banglaTitle: 'HTML5 অধ্যায় ১৪: XSS নিরাপত্তা (textContent বনাম innerHTML) ও পারফরম্যান্স',
    subtitle: 'Defend live web pages against Cross-Site Scripting (XSS) via textContent and sandbox iframes while boosting LCP/CLS speed.',
    zeroIntuition: {
      plainEnglishStory:
        'Cross-Site Scripting (**XSS**) is the #1 frontend security flaw: attackers type `<img src=x onerror=alert(1)>` into a bio or comment field, and if your app inserts it via **`innerHTML`**, the browser executes their JavaScript! Switching to **`textContent`** makes the browser treat every tag as harmless plain text—while explicit image `width`/`height` attributes kill layout shift (CLS).',
      asciiFlowchart: `  BROWSER XSS DEFENSE: innerHTML vs textContent
  UNSAFE: el.innerHTML = '<img src=x onerror=alert(1)>'  --> RUNS ATTACKER JS!
  SAFE  : el.textContent = '<img src=x onerror=alert(1)>' --> SHOWS RAW SAFE TEXT!`,
      pseudocode: [
        '1. RECEIVE untrusted string containing HTML/script payload',
        '2. INSERT via element.textContent (NEVER innerHTML!)',
        '3. ADD loading="lazy" and explicit dimensions on media for speed',
        '4. VERIFY zero script execution inside preview',
      ],
      banglaZeroToHero: {
        analogyTitle: 'ভেতরের বিষাক্ত চিঠি না পড়ে খামের ওপর রেখে দেওয়া (textContent Shield)',
        explanation:
          'ধরো একজন দুষ্ট লোক চিঠির মধ্যে বোমা (`<img onerror=...>`) পাঠিয়েছে। `innerHTML` মানে হলো খাম খুলে ওই কোডটা চালিয়ে দেখা—বুম! আর **`textContent`** মানে হলো খাম না খুলেই স্ক্রিনে লেখাটা শুধু অক্ষর হিসেবে দেখিয়ে দেওয়া—কোনো স্ক্রিপ্টই রান হবে না! সাথে ছবিতে `width`/`height` দিলে পেজ লাফাবে না (Zero CLS)।',
        everydayExample:
          'যেকোনো চ্যাট অ্যাপ, ব্লগ কমেন্ট বা প্রোফাইল নাম ব্রাউজারে দেখানোর আগে `textContent` বা React-এর `{userInput}` ব্যবহার করা।',
        keyTakeaways: [
          'কখনোই ইউজারের লেখা ডেটায় `el.innerHTML` ব্যবহার করবে না—সব সময় **`el.textContent`**! ',
          'অবিশ্বস্ত তৃতীয় পক্ষের HTML চালাতে হলে `<iframe>`-এ `sandbox` অ্যাট্রিবিউট ব্যবহার করবে।',
          'স্পিড বাড়াতে নিচের ছবিতে `loading="lazy"` এবং `width`+`height` দিয়ে CLS শূন্য রাখবে।',
        ],
      },
    },
    codeExamples: [
      {
        id: 'html-14-ex-basic',
        tier: 'Basic',
        title: '1. Basic: XSS-Safe Rendering Using textContent',
        banglaNote: 'ক্ষতিকর `<img onerror=...>` পে-লোড `textContent` দিয়ে নিরাপদে সাধারণ টেক্সট হিসেবে প্রদর্শন।',
        code: `<!doctype html>
<html><body style="font-family:system-ui;background:#090d16;color:#f8fafc;padding:24px;">
  <h3>XSS-Safe Rendering (textContent vs innerHTML)</h3>
  <p id="safe" style="color:#34d399;font-family:monospace"></p>
  <script>
    const untrusted = '<img src=x onerror=alert(1)> Fib(10)=55';
    document.getElementById('safe').textContent = untrusted;
  </script>
</body></html>`,
        stdin: '',
        expectedOutput: 'XSS-Safe Rendering (textContent vs innerHTML)',
      },
      {
        id: 'html-14-ex-edge',
        tier: 'Edge-Case',
        title: '2. Edge-Case: Interactive Sanitized Comment Preview Box',
        banglaNote: 'লাইভ ইনপুট ফিল্ডে ইউজার যা-ই টাইপ করুক, `textContent` দিয়ে XSS-মুক্ত প্রিভিউ।',
        code: `<!doctype html>
<html><body style="font-family:system-ui;background:#090d16;color:#f8fafc;padding:24px;">
  <input id="box" value="<b>Safe Preview</b>" style="padding:6px;border-radius:4px;border:1px solid #334155;background:#0f172a;color:#fff"/>
  <p id="preview" style="color:#38bdf8;margin-top:10px"></p>
  <script>
    const box = document.getElementById('box');
    const out = document.getElementById('preview');
    const sync = () => { out.textContent = box.value; };
    box.addEventListener('input', sync);
    sync();
  </script>
</body></html>`,
        stdin: '',
        expectedOutput: '<b>Safe Preview</b>',
      },
      {
        id: 'html-14-ex-opt',
        tier: 'Optimized',
        title: '3. Optimized: Zero-CLS Explicit Aspect Container + Lazy Optimization',
        banglaNote: '`aspect-ratio` বা `width`/`height` সেট করে পেজ লোডিংয়ে লেআউট জাম্প (CLS) শূন্য করা।',
        code: `<!doctype html>
<html><body style="font-family:system-ui;background:#090d16;color:#f8fafc;padding:24px;">
  <div style="width:240px;height:80px;background:#0f172a;border:1px solid #334155;border-radius:8px;display:flex;align-items:center;justify-content:center;color:#34d399">
    Reserved Box (0.00 CLS)
  </div>
</body></html>`,
        stdin: '',
        expectedOutput: 'Reserved Box (0.00 CLS)',
      },
      {
        id: 'html-14-ex-cp',
        tier: 'CP Trick',
        title: '4. CP Trick: Strict Sandbox Attribute & rel="noopener noreferrer"',
        banglaNote: 'বাইরের লিংকে `rel="noopener noreferrer"` ও এক্সটার্নাল ফ্রেমে `sandbox` দিয়ে ট্যাব-ন্যাবিং অ্যাটাক রোধ।',
        code: `<!doctype html>
<html><body style="font-family:system-ui;background:#090d16;color:#f8fafc;padding:24px;">
  <a href="https://example.com" target="_blank" rel="noopener noreferrer" style="color:#38bdf8">Safe External Link (No opener leak)</a>
</body></html>`,
        stdin: '',
        expectedOutput: 'Safe External Link (No opener leak)',
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 6',
        codeSnippet: "const untrusted = '<img src=x onerror=alert(1)> Fib(10)=55';",
        whatItMeans: 'Simulates malicious HTML/JS injection typed by an attacker.',
        whyItIsThere: 'Demonstrates real payload handling without sanitization shortcuts.',
        ifDeletedError: 'Safety comparison disappears.',
      },
      {
        lineNumber: 'Line 7',
        codeSnippet: "document.getElementById('safe').textContent = untrusted;",
        whatItMeans: 'Writes raw characters into a Text node instead of parsing HTML tags.',
        whyItIsThere: 'Completely neutralizes `<script>` and `onerror=` XSS vectors.',
        ifDeletedError: 'Switching to innerHTML executes injected script!',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'Receive untrusted <img onerror=...>', memoryOrStack: 'raw HTML string', note: 'Potential XSS payload' },
      { step: 2, state: 'Assign via el.textContent', memoryOrStack: 'DOM TextNode created', note: 'HTML parser skipped!' },
      { step: 3, state: 'Screen displays literal characters', memoryOrStack: '0 alerts / 0 scripts run', note: '100% XSS safe' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: Using innerHTML or document.write With User Input',
        brokenCode: 'div.innerHTML = "<p>" + userInput + "</p>"; // Arbitrary JS execution!',
        fixedCode: 'const p = document.createElement("p"); p.textContent = userInput; div.appendChild(p);',
        whyItBreaks: 'Attacker input containing `<img onerror=...>` executes inside logged-in users’ browsers.',
      },
      {
        title: 'Trap 2: target="_blank" Links Without rel="noopener noreferrer"',
        brokenCode: '<a href="https://evil.com" target="_blank">Open</a>',
        fixedCode: '<a href="https://evil.com" target="_blank" rel="noopener noreferrer">Open</a>',
        whyItBreaks: 'Legacy browsers allowed external tabs to redirect `window.opener.location` to phishing pages.',
      },
      {
        title: 'Trap 3: Omitting Image Width/Height Causing Cumulative Layout Shift (CLS)',
        brokenCode: '<img src="hero.png"> <!-- Shifts text down violently when image finishes loading! -->',
        fixedCode: '<img src="hero.png" width="800" height="450" loading="lazy" alt="Hero">',
        whyItBreaks: 'Without reserved space, Core Web Vitals CLS score drops and users mis-click shifted buttons.',
      },
    ],
    practiceSheet: [
      {
        id: 'html-ch-14-q1',
        difficulty: 'Easy',
        title: 'XSS-Safe textContent Widget',
        prompt: 'Render the untrusted XSS payload safely using textContent.',
        banglaHint: '`el.textContent = untrusted` ব্যবহার করো।',
        starterCode: `<!doctype html><html><body style="font-family:system-ui;background:#090d16;color:#f8fafc;padding:24px;"><h3>XSS-Safe Rendering</h3><p id="safe" style="color:#34d399;font-family:monospace"></p><script>document.getElementById('safe').textContent='<img src=x onerror=alert(1)> Fib(10)=55';</script></body></html>`,
        sampleStdin: '',
        expectedOutput: 'Fib(10)=55',
      },
      {
        id: 'html-ch-14-q2',
        difficulty: 'Easy',
        title: 'Safe External Anchor Attributes',
        prompt: 'Write a target="_blank" link hardened with rel="noopener noreferrer".',
        banglaHint: '`rel="noopener noreferrer"` যোগ করো।',
        starterCode: `<!doctype html><html><body style="background:#090d16;color:#f8fafc;padding:20px;"><a href="https://example.com" target="_blank" rel="noopener noreferrer" style="color:#38bdf8">Secure Link</a></body></html>`,
        sampleStdin: '',
        expectedOutput: 'Secure Link',
      },
      {
        id: 'html-ch-14-q3',
        difficulty: 'Medium',
        title: 'Programmatic Element Creation Guard',
        prompt: 'Build a comment <li> using document.createElement and textContent.',
        banglaHint: '`createElement("li")` ও `.textContent` দিয়ে `<script>` নিরাপদে রেন্ডার করো।',
        starterCode: `<!doctype html><html><body style="background:#090d16;color:#f8fafc;padding:20px;"><ul id="list"></ul><script>const li=document.createElement('li');li.textContent='<script>safe</script>';document.getElementById('list').appendChild(li);</script></body></html>`,
        sampleStdin: '',
        expectedOutput: '<script>safe</script>',
      },
      {
        id: 'html-ch-14-q4',
        difficulty: 'Medium',
        title: 'Reserved Zero-CLS Placeholder Container',
        prompt: 'Define explicit width and height on a media box to avoid layout shift.',
        banglaHint: 'স্পষ্ট `width` ও `height` স্টাইল বা অ্যাট্রিবিউট সেট করো।',
        starterCode: `<!doctype html><html><body style="background:#090d16;color:#f8fafc;padding:20px;"><div style="width:200px;height:60px;background:#0f172a">CLS Zero Ready</div></body></html>`,
        sampleStdin: '',
        expectedOutput: 'CLS Zero Ready',
      },
      {
        id: 'html-ch-14-q5',
        difficulty: 'Hard',
        title: 'Sanitized Attribute + Sandboxed Frame Spec',
        prompt: 'Render a sandboxed iframe element alongside safe status text.',
        banglaHint: '`<iframe sandbox>` ব্যবহার করে আইসোলেশন নিশ্চিত করো।',
        starterCode: `<!doctype html><html><body style="background:#090d16;color:#f8fafc;padding:20px;"><iframe sandbox title="isolated" srcdoc="<p>Isolated</p>" style="width:180px;height:50px;border:1px solid #334155"></iframe><p>Sandbox Active</p></body></html>`,
        sampleStdin: '',
        expectedOutput: 'Sandbox Active',
      },
    ],
    miniBuild: {
      title: 'HTML5 Mini Build: XSS-Proof Comment Box & Core Web Vitals Guard',
      description: 'Neutralizes injected HTML payloads using textContent and secure link attributes.',
      banglaGoal: 'textContent ব্যবহার করে XSS-নিরাপদ ব্রাউজার ডিসপ্লে তৈরি করা।',
      combinesChapters: 'Ch 1–14',
      starterCode: `<!doctype html>
<html><body style="font-family:system-ui;background:#090d16;color:#f8fafc;padding:24px;">
  <h3>XSS-Safe Rendering (textContent vs innerHTML)</h3>
  <p id="safe" style="color:#34d399;font-family:monospace"></p>
  <script>
    const untrusted = '<img src=x onerror=alert(1)> Fib(10)=55';
    document.getElementById('safe').textContent = untrusted;
  </script>
</body></html>`,
      sampleStdin: '',
      expectedOutput: 'XSS-Safe Rendering (textContent vs innerHTML)',
    },
  },
};
