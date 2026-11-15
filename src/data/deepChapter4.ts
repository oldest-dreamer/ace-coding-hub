import type { DeepChapterContent } from './deepChapter1';
import type { LanguageId } from '../types/academy';

export const DEEP_CHAPTER_4: Record<LanguageId, DeepChapterContent> = {
  c: {
    title: 'C Chapter 4 (C23): Loops, Pattern Grids & O(n) Time Complexity',
    banglaTitle: 'C অধ্যায় ৪ (C23): লুপ, প্যাটার্ন পিরামিড ও O(n) টাইম কমপ্লেক্সিটি',
    subtitle: 'Master for/while/do-while loops, nested star/number patterns, loop invariants, and the 10^8 operations/sec TLE rule.',
    zeroIntuition: {
      plainEnglishStory:
        'Imagine printing numbers from 1 to 100,000 by hand—you would need 100,000 lines of printf! A Loop lets the CPU repeat a small block of instructions millions of times per second while updating a single counter variable. A modern CPU executes roughly 10^8 (100 million) simple operations per second: an O(n) single loop over n=10^5 finishes in 1ms, whereas an O(n^2) nested loop executes 10^10 steps and triggers TLE (Time Limit Exceeded).',
      asciiFlowchart: `         ( START: Read n )
                  |
                  v
         [ Init: i = 1, sum = 0 ]
                  |
                  v
    +--> [ Is i <= n ? ] ----(No)----> [ Print sum ] --> ( STOP )
    |             |
    |           (Yes)
    |             v
    |    [ sum = sum + i ]
    |             |
    |             v
    +----[ Increment: i++ ]`,
      pseudocode: [
        '1. READ integer n from stdin',
        '2. GUARD: if n < 0, handle edge case (print 0) and exit cleanly',
        '3. INITIALIZE 64-bit accumulator sum = 0 and loop counter i = 1',
        '4. LOOP WHILE i <= n: maintain invariant (sum == 1 + 2 + ... + (i - 1))',
        '5. UPDATE sum += i, then increment i++',
        '6. OUTPUT final sum (or optimize to O(1) using n*(n+1)/2 for n <= 10^9)',
      ],
      banglaZeroToHero: {
        analogyTitle: 'ক্রিকেটের ওভারের ৬টি বল ও মাঠের চক্কর (Loop & Loop Invariant)',
        explanation:
          'ধরো কোচ তোমাকে বললেন মাঠে ১০ পাক দৌড়াতে। তুমি গুনতে শুরু করলে: পাক ১, পাক ২... পাক ১০ হলেই থেমে গেলে। প্রোগ্রামিংয়ে এই বারবার একই কাজ করাকে বলে Loop! প্রতিটি লুপের তিনটি অংশ থাকে: (১) শুরু কোথায় (`i = 1`), (২) কখন থামবে (`i <= n`), (৩) প্রতি ধাপে কীভাবে এগোবে (`i++`)। আর নেস্টেড লুপ মানে হলো—প্রতিটি ওভারে (বাইরের লুপ) ৬টি বল (ভেতরের লুপ)!',
        everydayExample:
          'একটি অ্যাপার্টমেন্টের ৫ তলায় প্রতিটি তলায় ৪টি করে ফ্ল্যাট থাকলে মোট `5 * 4 = 20` বার ঘুরতে হয়। কম্পিউটার ১ সেকেন্ডে প্রায় ১০^৮ (১০ কোটি) সহজ অপারেশন করতে পারে—তাই `n = 10^5` হলে `O(n^2)` লুপ ১০^১০ ধাপে গিয়ে TLE খাবে!',
        keyTakeaways: [
          '`for` লুপ ব্যবহার করো যখন আগে থেকেই জানো কতবার ঘুরবে; `while` লুপ যখন থামার শর্ত ডাইনামিক; `do-while` যখন অন্তত একবার চালাতেই হবে।',
          'প্রতিটি `for(int i = 0; i < n; i++)` লুপের শেষে ভুলেও সেমিকোলন `;` দিও না—নইলে লুপ খালি ঘুরে যাবে!',
          'সম্ভব হলে ভেতরের লুপ বাদ দিয়ে গণিত (যেমন `n*(n+1)/2`) বা Prefix Sum ব্যবহার করে `O(n^2)` কে `O(n)` বা `O(1)` বানাও।',
        ],
      },
    },
    codeExamples: [
      {
        id: 'c-4-ex-basic',
        tier: 'Basic',
        title: '1. Basic: Right-Angled Number Triangle Pattern',
        banglaNote: 'বাইরের লুপ সারি (row) ও ভেতরের লুপ কলাম (col) নিয়ন্ত্রণ করে প্যাটার্ন প্রিন্ট করে।',
        code: `#include <stdio.h>

int main(void) {
    int n = 0;
    if (scanf("%d", &n) != 1) return 0;

    for (int row = 1; row <= n; row++) {
        for (int col = 1; col <= row; col++) {
            printf("%d%s", col, col == row ? "" : " ");
        }
        printf("\\n");
    }
    return 0;
}`,
        stdin: '4',
        expectedOutput: '1\n1 2\n1 2 3\n1 2 3 4',
      },
      {
        id: 'c-4-ex-edge',
        tier: 'Edge-Case',
        title: '2. Edge-Case: Zero, Negative & Digit-Count Guard (do-while)',
        banglaNote: 'n = 0 বা নেগেটিভ সংখ্যা দিলে while লুপ ভুল উত্তর দিতে পারে—তাই abs ও do-while দরকার।',
        code: `#include <stdio.h>

int main(void) {
    long long n = 0;
    if (scanf("%lld", &n) != 1) return 0;

    long long x = (n < 0) ? -n : n;
    int digits = 0;
    do {
        digits++;
        x /= 10;
    } while (x > 0);

    printf("digits=%d\\n", digits);
    return 0;
}`,
        stdin: '0',
        expectedOutput: 'digits=1',
      },
      {
        id: 'c-4-ex-opt',
        tier: 'Optimized',
        title: '3. Optimized: O(n^2) to O(1) Arithmetic Progression Sum',
        banglaNote: '১ থেকে n পর্যন্ত যোগফল লুপে O(n) সময় নেয়, কিন্তু n*(n+1)/2 দিয়ে O(1)-এ TLE এড়ানো যায়।',
        code: `#include <stdio.h>

int main(void) {
    long long n = 0;
    if (scanf("%lld", &n) != 1 || n <= 0) {
        printf("0\\n");
        return 0;
    }
    // Divide even factor first to delay overflow
    long long a = (n % 2 == 0) ? (n / 2) : n;
    long long b = (n % 2 == 0) ? (n + 1) : ((n + 1) / 2);
    printf("%lld\\n", a * b);
    return 0;
}`,
        stdin: '100000',
        expectedOutput: '5000050000',
      },
      {
        id: 'c-4-ex-cp',
        tier: 'CP Trick',
        title: '4. CP Trick: O(sqrt(n)) Divisor Count Without O(n) Loop',
        banglaNote: 'n = 10^12 হলে O(n) লুপ TLE দেবে; sqrt(n) পর্যন্ত ঘুরিয়ে জোড়ায় জোড়ায় ভাজক গণনা করো।',
        code: `#include <stdio.h>

int main(void) {
    long long n = 0;
    if (scanf("%lld", &n) != 1 || n <= 0) {
        printf("0\\n");
        return 0;
    }
    long long divs = 0;
    for (long long d = 1; d * d <= n; d++) {
        if (n % d == 0) {
            divs += (d * d == n) ? 1 : 2;
        }
    }
    printf("%lld\\n", divs);
    return 0;
}`,
        stdin: '36',
        expectedOutput: '9',
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 1',
        codeSnippet: '#include <stdio.h>',
        whatItMeans: 'Includes standard C23 input/output functions (`scanf`, `printf`).',
        whyItIsThere: 'Allows reading `n` from stdin and printing pattern rows or loop sums.',
        ifDeletedError: 'C23 rejects implicit function declarations; compiler fails on `scanf`/`printf`.',
      },
      {
        lineNumber: 'Line 7',
        codeSnippet: 'for (int row = 1; row <= n; row++) {',
        whatItMeans: 'Outer loop initializing `row = 1`, checking `row <= n`, incrementing after each row.',
        whyItIsThere: 'Controls how many horizontal lines of the pattern are printed.',
        ifDeletedError: 'Only a single row runs, or `row` becomes undeclared inside the inner loop.',
      },
      {
        lineNumber: 'Line 8',
        codeSnippet: 'for (int col = 1; col <= row; col++) {',
        whatItMeans: 'Inner loop bounded by `row` so row `k` prints exactly `k` numbers.',
        whyItIsThere: 'Creates triangular geometry; total iterations = 1 + 2 + ... + n = O(n^2).',
        ifDeletedError: 'Prints a solid rectangle or fails to repeat columns per row.',
      },
      {
        lineNumber: 'Line 9',
        codeSnippet: 'printf("%d%s", col, col == row ? "" : " ");',
        whatItMeans: 'Ternary separator suppresses trailing space at the end of each line.',
        whyItIsThere: 'Strict online judges mark trailing spaces at line endings as Presentation/Wrong Answer.',
        ifDeletedError: 'Prints `"1 "` instead of `"1"`, failing strict whitespace comparison.',
      },
      {
        lineNumber: 'Line 11',
        codeSnippet: 'printf("\\n");',
        whatItMeans: 'Moves cursor to the next line after the inner loop finishes.',
        whyItIsThere: 'Separates pattern rows vertically.',
        ifDeletedError: 'All numbers print on one single giant line.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'Read n = 3; enter outer row = 1', memoryOrStack: 'n=3, row=1', note: 'Condition 1 <= 3 is true' },
      { step: 2, state: 'Inner col = 1 (col <= 1)', memoryOrStack: 'n=3, row=1, col=1', note: 'Prints "1" then newline' },
      { step: 3, state: 'Outer row = 2; inner col = 1..2', memoryOrStack: 'n=3, row=2, col=1->2', note: 'Prints "1 2" then newline' },
      { step: 4, state: 'Outer row = 3; inner col = 1..3', memoryOrStack: 'n=3, row=3, col=1->3', note: 'Prints "1 2 3" then newline' },
      { step: 5, state: 'Outer row increments to 4; 4 <= 3 false', memoryOrStack: 'row=4 (exits loop)', note: 'Total inner steps = 6 = n(n+1)/2' },
    ],
    harryBugTraps: [
      {
        title: 'Stray Semicolon After for(...) Loop Header',
        brokenCode: `for (int i = 1; i <= 5; i++);\n{\n    printf("%d ", i);\n}`,
        fixedCode: `for (int i = 1; i <= 5; i++) {\n    printf("%d ", i);\n}`,
        whyItBreaks: 'The `;` acts as an empty loop body. The loop finishes silently, then `i` is out of scope or executes the block only once!',
      },
      {
        title: 'Infinite Loop From Unchanged Condition Variable',
        brokenCode: `int i = 1;\nwhile (i <= 5) {\n    printf("%d\\n", i);\n}`,
        fixedCode: `int i = 1;\nwhile (i <= 5) {\n    printf("%d\\n", i);\n    i++;\n}`,
        whyItBreaks: '`i` stays `1` forever, causing Time Limit Exceeded (TLE) and stdout overflow.',
      },
      {
        title: 'O(n^2) Sum Loop Timing Out for n = 10^9',
        brokenCode: `long long s = 0;\nfor (long long i = 1; i <= n; i++) s += i;`,
        fixedCode: `long long s = (n % 2 == 0) ? (n / 2) * (n + 1) : n * ((n + 1) / 2);`,
        whyItBreaks: 'Looping 10^9 times takes >2 seconds; the closed-form formula runs in O(1) nanoseconds.',
      },
    ],
    practiceSheet: [
      {
        id: 'c-ch-4-q1',
        difficulty: 'Easy',
        title: 'Print 1 to N Even Numbers',
        prompt: 'Read integer n and print all even integers from 2 up to n separated by spaces.',
        banglaHint: 'লুপ ২ থেকে শুরু করে প্রতি ধাপে `i += 2` বাড়ালে `if` ছাড়াই জোড় সংখ্যা পাওয়া যায়!',
        starterCode: `#include <stdio.h>\nint main(void) {\n    int n = 0;\n    if (scanf("%d", &n) != 1) return 0;\n    for (int i = 2; i <= n; i += 2) {\n        printf("%d%s", i, (i + 2 <= n) ? " " : "");\n    }\n    printf("\\n");\n    return 0;\n}`,
        sampleStdin: '8',
        expectedOutput: '2 4 6 8',
      },
      {
        id: 'c-ch-4-q2',
        difficulty: 'Easy',
        title: 'Reverse Integer Digits With While Loop',
        prompt: 'Read a positive integer n and reverse its decimal digits using `% 10` and `/ 10`.',
        banglaHint: '`rev = rev * 10 + (n % 10)` এবং প্রতিবার `n /= 10` করো।',
        starterCode: `#include <stdio.h>\nint main(void) {\n    long long n = 0, rev = 0;\n    if (scanf("%lld", &n) != 1) return 0;\n    while (n > 0) {\n        rev = rev * 10 + (n % 10);\n        n /= 10;\n    }\n    printf("%lld\\n", rev);\n    return 0;\n}`,
        sampleStdin: '12340',
        expectedOutput: '4321',
      },
      {
        id: 'c-ch-4-q3',
        difficulty: 'Medium',
        title: 'Centered Star Pyramid Pattern',
        prompt: 'Read n and print an n-row centered `*` pyramid (row r has `n - r` leading spaces and `2*r - 1` stars).',
        banglaHint: 'প্রতি সারিতে আগে `n - r` টি স্পেস, তারপর `2*r - 1` টি তারা (`*`) প্রিন্ট করো।',
        starterCode: `#include <stdio.h>\nint main(void) {\n    int n = 0;\n    if (scanf("%d", &n) != 1) return 0;\n    for (int r = 1; r <= n; r++) {\n        for (int s = 0; s < n - r; s++) putchar(' ');\n        for (int k = 0; k < 2 * r - 1; k++) putchar('*');\n        putchar('\\n');\n    }\n    return 0;\n}`,
        sampleStdin: '3',
        expectedOutput: '  *\n ***\n*****',
      },
      {
        id: 'c-ch-4-q4',
        difficulty: 'Medium',
        title: 'Primality Test in O(sqrt(n))',
        prompt: 'Read integer n and print `PRIME` or `NOT PRIME` in O(sqrt(n)) using 6k +- 1 or `d * d <= n`.',
        banglaHint: 'n <= 1 হলে প্রাইম নয়; ২ থেকে `d * d <= n` পর্যন্ত কোনো ভাজক মিললে `NOT PRIME`।',
        starterCode: `#include <stdio.h>\nint main(void) {\n    long long n = 0;\n    if (scanf("%lld", &n) != 1) return 0;\n    int prime = (n >= 2);\n    for (long long d = 2; d * d <= n && prime; d++) {\n        if (n % d == 0) prime = 0;\n    }\n    printf("%s\\n", prime ? "PRIME" : "NOT PRIME");\n    return 0;\n}`,
        sampleStdin: '29',
        expectedOutput: 'PRIME',
      },
      {
        id: 'c-ch-4-q5',
        difficulty: 'Hard',
        title: 'Trailing Zeros in N! in O(log_5 N)',
        prompt: 'Given n up to 10^9, compute trailing zeros in n! without computing n! (count factors of 5).',
        banglaHint: 'n/5 + n/25 + n/125 ... এভাবে ৫-এর ঘাত দিয়ে ভাগ করে যোগ করলেই O(log n)-এ উত্তর আসে!',
        starterCode: `#include <stdio.h>\nint main(void) {\n    long long n = 0, zeros = 0;\n    if (scanf("%lld", &n) != 1) return 0;\n    for (long long p = 5; p <= n; p *= 5) {\n        zeros += n / p;\n        if (p > n / 5) break;\n    }\n    printf("%lld\\n", zeros);\n    return 0;\n}`,
        sampleStdin: '100',
        expectedOutput: '24',
      },
    ],
    miniBuild: {
      title: 'C Mini Build: Multiplication & Complexity Audit Engine',
      description: 'Combines Ch 1–4: reads N, outputs an N-row Floyd triangle and verifies the O(1) sum formula matches the O(n) loop invariant.',
      banglaGoal: 'লুপের ধাপ গণনা করে O(n) ইনভ্যারিয়েন্ট ও O(1) ফর্মুলার ফলাফল একসাথে যাচাই করা।',
      combinesChapters: 'Ch 1–4',
      starterCode: `#include <stdio.h>\n\nint main(void) {\n    long long n = 0;\n    if (scanf("%lld", &n) != 1 || n <= 0) return 0;\n    long long loop_sum = 0;\n    for (long long i = 1; i <= n; i++) loop_sum += i;\n    long long formula_sum = n * (n + 1) / 2;\n    printf("loop=%lld formula=%lld match=%s\\n",\n           loop_sum, formula_sum, loop_sum == formula_sum ? "YES" : "NO");\n    return 0;\n}`,
      sampleStdin: '10',
      expectedOutput: 'loop=55 formula=55 match=YES',
    },
  },
  cpp: {
    title: 'C++ Chapter 4 (C++23): Loops, std::views::iota & Time Complexity',
    banglaTitle: 'C++ অধ্যায় ৪ (C++23): লুপ, রেঞ্জ ও টাইম কমপ্লেক্সিটি বিশ্লেষণ',
    subtitle: 'Master range-based for loops, C++20/23 std::views::iota, nested grid patterns, and Big-O complexity budgets.',
    zeroIntuition: {
      plainEnglishStory:
        'In C++23, loops evolve from error-prone manual counters to expressive range pipelines (`std::views::iota`) while keeping zero-overhead machine code. Mastering loop invariants ensures you never miss an off-by-one boundary (`<` vs `<=`) and always respect the 10^8 ops/sec competitive programming budget.',
      asciiFlowchart: `    ( START: Read n )
            |
            v
    [ views::iota(1, n+1) ] ---> generates 1, 2, ..., n lazily (O(1) RAM)
            |
            v
    [ Accumulate odd/even ] ---> maintains invariant each step
            |
            v
    ( Print Result & Exit )`,
      pseudocode: [
        '1. READ 64-bit integer n with fast I/O (`cin.tie(nullptr)`)',
        '2. GUARD against n <= 0 edge cases before entering loop',
        '3. ITERATE using `for (int i : std::views::iota(1, n + 1))` or 64-bit index',
        '4. TRACE invariant: sum holds exact partial sum of processed items',
        '5. REPLACE nested O(n^2) loops with O(n) running state where possible',
      ],
      banglaZeroToHero: {
        analogyTitle: 'ফ্যাক্টরি কনভেয়ার বেল্ট ও লেজি জেনারেটর (Range Loops)',
        explanation:
          'সাধারণ `for (int i = 1; i <= n; i++)` লুপ হলো হাত দিয়ে ১, ২, ৩ করে গোনা। কিন্তু আধুনিক C++23-তে `std::views::iota(1, n + 1)` হলো একটি জাদুর কনভেয়ার বেল্ট—এটি মেমোরিতে কোটি সংখ্যার অ্যারে তৈরি না করেই (O(1) RAM!) চাহিদামতো পরের সংখ্যাটি তোমার হাতে তুলে দেয়!',
        everydayExample:
          'তুমি যদি ১ থেকে ১ কোটি পর্যন্ত সংখ্যা প্রিন্ট না করে শুধু যোগ করতে চাও, তবে লুপে O(n) সময় না নিয়ে `n * (n + 1) / 2` সূত্রে O(1)-এ করে ফেলাই হলো স্মার্ট ইঞ্জিনিয়ারিং।',
        keyTakeaways: [
          'কনটেস্টে `n <= 10^5` হলে `O(n)` বা `O(n log n)` চলবে, কিন্তু `O(n^2)` নিশ্চিত TLE খাবে।',
          '`std::views::iota` মেমোরি খরচ না করেই পরিষ্কার রেঞ্জ-বেসড লুপ লেখার আধুনিক C++23 উপায়।',
          'প্রতিযোগিতামূলক প্রোগ্রামিংয়ে `endl` প্রতি ধাপে ফ্লাশ করে লুপ স্লো করে—তাই সবসময় `"\\n"` ব্যবহার করো।',
        ],
      },
    },
    codeExamples: [
      {
        id: 'cpp-4-ex-basic',
        tier: 'Basic',
        title: '1. Basic: C++23 views::iota Staircase Pattern',
        banglaNote: 'std::views::iota ব্যবহার করে অফ-বাই-ওয়ান বাগ ছাড়াই পরিষ্কার নাম্বার প্যাটার্ন।',
        code: `#include <iostream>
#include <ranges>
using namespace std;

int main() {
    int n = 0;
    if (!(cin >> n)) return 0;

    for (int r : views::iota(1, n + 1)) {
        for (int c : views::iota(1, r + 1)) {
            cout << c << (c == r ? "" : " ");
        }
        cout << "\\n";
    }
    return 0;
}`,
        stdin: '4',
        expectedOutput: '1\n1 2\n1 2 3\n1 2 3 4',
      },
      {
        id: 'cpp-4-ex-edge',
        tier: 'Edge-Case',
        title: '2. Edge-Case: Negative / Zero Guard & Overflow-Safe Loop',
        banglaNote: 'n <= 0 বা নেগেটিভ ইনপুটে লুপ যেন অসীম বা আন্ডারফ্লো না করে তার গার্ড।',
        code: `#include <iostream>
using namespace std;

int main() {
    long long n = 0;
    if (!(cin >> n) || n <= 0) {
        cout << "EMPTY\\n";
        return 0;
    }
    long long fact = 1;
    for (long long i = 2; i <= n; ++i) {
        fact *= i;
    }
    cout << fact << "\\n";
    return 0;
}`,
        stdin: '0',
        expectedOutput: 'EMPTY',
      },
      {
        id: 'cpp-4-ex-opt',
        tier: 'Optimized',
        title: '3. Optimized: Single-Pass O(n) Running Prefix Maximum',
        banglaNote: 'প্রতিটি এলিমেন্টের জন্য পেছনে O(n) লুপ না চালিয়ে Running Max দিয়ে O(n)-এ সমাধান।',
        code: `#include <iostream>
#include <algorithm>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n = 0;
    if (!(cin >> n) || n <= 0) return 0;
    long long best = -4e18;
    for (int i = 0; i < n; ++i) {
        long long x = 0;
        cin >> x;
        best = max(best, x);
        cout << best << (i + 1 == n ? "\\n" : " ");
    }
    return 0;
}`,
        stdin: '5\n3 1 7 4 9',
        expectedOutput: '3 3 7 7 9',
      },
      {
        id: 'cpp-4-ex-cp',
        tier: 'CP Trick',
        title: '4. CP Trick: Harmonic Series O(n log n) Divisor Sum',
        banglaNote: '১ থেকে n পর্যন্ত প্রতিটি সংখ্যার ভাজকের যোগফল বের করতে গুণিতক লুপ j += i দিয়ে O(n log n)!',
        code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n = 0;
    if (!(cin >> n) || n <= 0) return 0;
    vector<long long> sum_div(n + 1, 0);
    for (int i = 1; i <= n; ++i) {
        for (int j = i; j <= n; j += i) {
            sum_div[j] += i;
        }
    }
    cout << sum_div[n] << "\\n";
    return 0;
}`,
        stdin: '12',
        expectedOutput: '28',
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 2',
        codeSnippet: '#include <ranges>',
        whatItMeans: 'Imports C++20/23 Ranges library including `std::views::iota`.',
        whyItIsThere: 'Enables declarative integer range iteration without raw iterator boilerplate.',
        ifDeletedError: '`views` is undefined and compilation fails.',
      },
      {
        lineNumber: 'Line 9',
        codeSnippet: 'for (int r : views::iota(1, n + 1)) {',
        whatItMeans: 'Iterates half-open range `[1, n + 1)` lazily (zero heap allocation).',
        whyItIsThere: 'Guarantees `r` walks cleanly from `1` through `n` without modifying loop index manually.',
        ifDeletedError: 'Row counter is missing; pattern cannot iterate over rows.',
      },
      {
        lineNumber: 'Line 10',
        codeSnippet: 'for (int c : views::iota(1, r + 1)) {',
        whatItMeans: 'Inner lazy range `[1, r + 1)` yielding `1..r` for each row.',
        whyItIsThere: 'Upper bound depends on `r` to shape the staircase.',
        ifDeletedError: 'Column values fail to repeat inside each row.',
      },
      {
        lineNumber: 'Line 13',
        codeSnippet: 'cout << "\\n";',
        whatItMeans: 'Prints newline without flushing the stdout buffer.',
        whyItIsThere: 'Avoids 10x I/O slowdown inside large loops compared to `std::endl`.',
        ifDeletedError: 'Rows merge into one horizontal line.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'n = 3; outer iota(1, 4) yields r = 1', memoryOrStack: 'r=1', note: 'Half-open [1, 4) excludes 4' },
      { step: 2, state: 'inner iota(1, 2) yields c = 1', memoryOrStack: 'r=1, c=1', note: 'Outputs "1\\n"' },
      { step: 3, state: 'outer yields r = 2; inner yields 1, 2', memoryOrStack: 'r=2, c=1..2', note: 'Outputs "1 2\\n"' },
      { step: 4, state: 'outer yields r = 3; inner yields 1, 2, 3', memoryOrStack: 'r=3, c=1..3', note: 'Outputs "1 2 3\\n"' },
      { step: 5, state: 'iota reaches sentinel 4', memoryOrStack: 'loop ends', note: 'Zero heap bytes allocated' },
    ],
    harryBugTraps: [
      {
        title: 'Using std::endl Inside a 10^5 Loop Causes TLE',
        brokenCode: `for (int i = 0; i < 100000; ++i)\n    cout << i << endl;`,
        fixedCode: `for (int i = 0; i < 100000; ++i)\n    cout << i << "\\n";`,
        whyItBreaks: '`endl` forces an OS `fflush()` syscall on every iteration, multiplying runtime by 10–50x.',
      },
      {
        title: 'Unsigned Underflow Infinite Loop (size_t >= 0)',
        brokenCode: `for (size_t i = n - 1; i >= 0; --i) { /* ... */ }`,
        fixedCode: `for (int i = n - 1; i >= 0; --i) { /* ... */ }`,
        whyItBreaks: 'When `i == 0` and `--i` runs on unsigned `size_t`, it wraps to `18446744073709551615`, which is still `>= 0` forever!',
      },
      {
        title: 'Half-Open Interval Off-By-One in views::iota(1, n)',
        brokenCode: `for (int i : views::iota(1, n)) sum += i;`,
        fixedCode: `for (int i : views::iota(1, n + 1)) sum += i;`,
        whyItBreaks: '`iota(1, n)` stops at `n - 1`; you must pass `n + 1` to include `n`.',
      },
    ],
    practiceSheet: [
      {
        id: 'cpp-ch-4-q1',
        difficulty: 'Easy',
        title: 'Sum of Odd Numbers Up to N',
        prompt: 'Read n and compute the sum of all odd integers in `[1, n]` using a step-2 loop.',
        banglaHint: '`for (long long i = 1; i <= n; i += 2)` চালিয়ে যোগফল বের করো।',
        starterCode: `#include <iostream>\nusing namespace std;\nint main() {\n    long long n = 0, sum = 0;\n    if (!(cin >> n)) return 0;\n    for (long long i = 1; i <= n; i += 2) sum += i;\n    cout << sum << "\\n";\n    return 0;\n}`,
        sampleStdin: '9',
        expectedOutput: '25',
      },
      {
        id: 'cpp-ch-4-q2',
        difficulty: 'Easy',
        title: 'Inverted Star Triangle',
        prompt: 'Read n and print an inverted right triangle of `*` from n stars down to 1 star.',
        banglaHint: 'বাইরের লুপ `n` থেকে `1` পর্যন্ত কমাতে থাকো।',
        starterCode: `#include <iostream>\n#include <string>\nusing namespace std;\nint main() {\n    int n = 0;\n    if (!(cin >> n)) return 0;\n    for (int r = n; r >= 1; --r) {\n        cout << string(r, '*') << "\\n";\n    }\n    return 0;\n}`,
        sampleStdin: '3',
        expectedOutput: '***\n**\n*',
      },
      {
        id: 'cpp-ch-4-q3',
        difficulty: 'Medium',
        title: 'Fibonacci Sequence Up to N Terms',
        prompt: 'Read n (1 <= n <= 50) and print the first n Fibonacci numbers (1, 1, 2, 3, ...).',
        banglaHint: 'দুটো `long long` ভ্যারিয়েবল `a=1, b=1` রেখে প্রতি ধাপে সোয়াপ করে এগোও।',
        starterCode: `#include <iostream>\nusing namespace std;\nint main() {\n    int n = 0;\n    if (!(cin >> n) || n <= 0) return 0;\n    long long a = 1, b = 1;\n    for (int i = 1; i <= n; ++i) {\n        cout << a << (i == n ? "\\n" : " ");\n        long long nxt = a + b;\n        a = b; b = nxt;\n    }\n    return 0;\n}`,
        sampleStdin: '6',
        expectedOutput: '1 1 2 3 5 8',
      },
      {
        id: 'cpp-ch-4-q4',
        difficulty: 'Medium',
        title: 'Harmonic Divisor Count at Index N',
        prompt: 'Using the O(n log n) sieve-like harmonic loop, print the exact number of divisors of n.',
        banglaHint: '১ থেকে n পর্যন্ত প্রতিটি `i`-এর গুণিতক `j += i` তে ১ যোগ করে `cnt[n]` প্রিন্ট করো।',
        starterCode: `#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    int n = 0;\n    if (!(cin >> n) || n <= 0) return 0;\n    vector<int> cnt(n + 1, 0);\n    for (int i = 1; i <= n; ++i)\n        for (int j = i; j <= n; j += i) cnt[j]++;\n    cout << cnt[n] << "\\n";\n    return 0;\n}`,
        sampleStdin: '24',
        expectedOutput: '8',
      },
      {
        id: 'cpp-ch-4-q5',
        difficulty: 'Hard',
        title: 'Count Pairs With Sum == K in O(n) Sorted Stream',
        prompt: 'Given n sorted numbers and target k, count pairs `(i < j)` with `a[i] + a[j] == k` in O(n) two-pointer loop.',
        banglaHint: 'বামে `l=0`, ডানে `r=n-1` রেখে যোগফল ছোট হলে `l++`, বড় হলে `r--` করো।',
        starterCode: `#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    int n = 0; long long k = 0;\n    if (!(cin >> n >> k)) return 0;\n    vector<long long> a(n);\n    for (auto &x : a) cin >> x;\n    int l = 0, r = n - 1; long long ans = 0;\n    while (l < r) {\n        long long s = a[l] + a[r];\n        if (s == k) { ans++; l++; r--; }\n        else if (s < k) l++;\n        else r--;\n    }\n    cout << ans << "\\n";\n    return 0;\n}`,
        sampleStdin: '5 9\n1 2 4 5 7',
        expectedOutput: '2',
      },
    ],
    miniBuild: {
      title: 'C++23 Mini Build: Harmonic & Prime Sieve Analyzer',
      description: 'Combines Ch 1–4 using C++23 ranges and harmonic sieve loops to count all primes up to N in O(N log log N).',
      banglaGoal: 'C++23 রেঞ্জ ও সিভ লুপ দিয়ে O(N log log N) সময়ে ১ থেকে N পর্যন্ত মোট প্রাইম সংখ্যা গণনা করা।',
      combinesChapters: 'Ch 1–4',
      starterCode: `#include <iostream>\n#include <vector>\n#include <ranges>\nusing namespace std;\n\nint main() {\n    int n = 0;\n    if (!(cin >> n) || n < 2) { cout << "0\\n"; return 0; }\n    vector<bool> is_prime(n + 1, true);\n    is_prime[0] = is_prime[1] = false;\n    for (int p = 2; p * p <= n; ++p) {\n        if (is_prime[p]) {\n            for (int m = p * p; m <= n; m += p) is_prime[m] = false;\n        }\n    }\n    int count = 0;\n    for (int x : views::iota(2, n + 1)) if (is_prime[x]) count++;\n    cout << "primes_up_to_" << n << "=" << count << "\\n";\n    return 0;\n}`,
      sampleStdin: '30',
      expectedOutput: 'primes_up_to_30=10',
    },
  },
  python: {
    title: 'Python Chapter 4 (3.13): Loops, Comprehensions & O(n) Time Complexity',
    banglaTitle: 'Python অধ্যায় ৪ (3.13): লুপ, প্যাটার্ন ও টাইম কমপ্লেক্সিটি',
    subtitle: 'Master range(), enumerate(), zip(), generator comprehensions, and why Python 3.13 needs O(n) algorithms to pass 10^5 limits.',
    zeroIntuition: {
      plainEnglishStory:
        'Python `for` loops do not juggle manual `i++` indices—they walk directly over lazy iterables (`range`, `enumerate`, generators). Because Python is interpreted, each bytecode loop iteration is slower than C++, making algorithmic Big-O optimization (`O(n)` instead of `O(n^2)`) and built-in C-backed `sum()`/`math` critical in Python 3.13.',
      asciiFlowchart: `     ( START: Read n )
             |
             v
    [ range(1, n + 1) ] ---> lazy iterator in O(1) memory
             |
             v
    +-> [ Next item i? ] --(Exhausted)--> [ Print Result ] --> ( STOP )
    |        |
    |     (Yields i)
    |        v
    +---[ Update State ]`,
      pseudocode: [
        '1. READ integer n safely from sys.stdin',
        '2. GUARD against n <= 0 edge cases before iterating',
        '3. ITERATE using `for row in range(1, n + 1)` or `enumerate()`',
        '4. AVOID `in list` inside a loop (O(n^2)); use a `set` or math formula (O(n) / O(1))',
        '5. EMIT exact formatted output',
      ],
      banglaZeroToHero: {
        analogyTitle: 'টোকেন মেশিন ও সারিবদ্ধ গুনতি (Python range ও Iterators)',
        explanation:
          'ব্যাংকে টোকেন মেশিনে বাটন চাপলে যেমন সাথে সাথে পরের নাম্বার বের হয়, Python-এর `range(1, 1000000)` ঠিক তেমনই—একসাথে ১০ লাখ সংখ্যা RAM-এ না রেখে যখন দরকার তখন একটি করে দেয়! আর Python-এ লিস্টের ভেতর `if x in my_list` লুপের মধ্যে লিখলে `O(n^2)` হয়ে যায়, তাই স্পিড বাড়াতে `set` বা `sum()` ব্যবহার করতে হয়।',
        everydayExample:
          '১ থেকে ১ লাখ পর্যন্ত যোগ করতে `for` লুপ চালানোর চেয়ে Python-এর বিল্ট-ইন C-স্পিড `sum(range(1, n + 1))` অথবা `n * (n + 1) // 2` ব্যবহার করলে মুহূর্তেই উত্তর মেলে।',
        keyTakeaways: [
          '`range(start, stop)` সবসময় `stop - 1` পর্যন্ত যায় (`stop` বাদ পড়ে)।',
          'ইন্ডেক্স ও মান একসাথে দরকার হলে `for i in range(len(arr))` না লিখে `for i, val in enumerate(arr)` লেখাই Pythonic।',
          'Python 3.13-এ বড় ইনপুটের জন্য O(n^2) লুপ এড়িয়ে `set`/math ব্যবহার না করলে TLE নিশ্চিত।',
        ],
      },
    },
    codeExamples: [
      {
        id: 'py-4-ex-basic',
        tier: 'Basic',
        title: '1. Basic: Number Staircase Pattern With range()',
        banglaNote: 'join ও জেনারেটর এক্সপ্রেশন দিয়ে ট্রেইলিং স্পেস ছাড়াই পরিষ্কার প্যাটার্ন।',
        code: `import sys

n_str = sys.stdin.read().strip()
n = int(n_str) if n_str else 0

for row in range(1, n + 1):
    print(" ".join(str(col) for col in range(1, row + 1)))`,
        stdin: '4',
        expectedOutput: '1\n1 2\n1 2 3\n1 2 3 4',
      },
      {
        id: 'py-4-ex-edge',
        tier: 'Edge-Case',
        title: '2. Edge-Case: Empty Stdin & Zero/Negative Loop Guard',
        banglaNote: 'ইনপুট শূন্য বা নেগেটিভ হলে লুপ ক্র্যাশ বা ফাঁকা আউটপুট না দিয়ে পরিষ্কার গার্ড দেয়।',
        code: `import sys

tokens = sys.stdin.read().split()
n = int(tokens[0]) if tokens else 0

if n <= 0:
    print("EMPTY")
else:
    x = n
    digits = 0
    while True:
        digits += 1
        x //= 10
        if x == 0:
            break
    print(f"digits={digits}")`,
        stdin: '0',
        expectedOutput: 'EMPTY',
      },
      {
        id: 'py-4-ex-opt',
        tier: 'Optimized',
        title: '3. Optimized: O(n^2) List Lookup Replaced by O(n) Set',
        banglaNote: 'লুপের ভেতর `x in list` O(n) সময় নেয় (মোট O(n^2)); কিন্তু `set` O(1) হওয়ায় মোট O(n) হয়!',
        code: `import sys

data = list(map(int, sys.stdin.read().split()))
if data:
    n = data[0]
    nums = data[1 : 1 + n]
    seen: set[int] = set()
    dups = 0
    for x in nums:
        if x in seen:
            dups += 1
        seen.add(x)
    print(dups)`,
        stdin: '6\n4 2 4 5 2 9',
        expectedOutput: '2',
      },
      {
        id: 'py-4-ex-cp',
        tier: 'CP Trick',
        title: '4. CP Trick: Arbitrary-Precision O(1) Sum & enumerate()',
        banglaNote: 'Python-এ int ওভারফ্লো হয় না! `//` (integer division) দিয়ে n = 10^18-এও O(1) নিখুঁত যোগফল।',
        code: `import sys

raw = sys.stdin.read().strip()
if raw:
    n = int(raw)
    total = n * (n + 1) // 2 if n > 0 else 0
    print(total)`,
        stdin: '1000000000',
        expectedOutput: '500000000500000000',
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 1',
        codeSnippet: 'import sys',
        whatItMeans: 'Imports system module for fast bulk stdin reading (`sys.stdin.read()`).',
        whyItIsThere: 'Reads multi-line competitive programming inputs cleanly without EOFError.',
        ifDeletedError: '`NameError: name "sys" is not defined`.',
      },
      {
        lineNumber: 'Line 6',
        codeSnippet: 'for row in range(1, n + 1):',
        whatItMeans: 'Iterates lazy sequence `1, 2, ..., n` (excludes `n + 1`).',
        whyItIsThere: 'Drives each line of the triangle without storing a list in RAM.',
        ifDeletedError: 'Loop vanishes and `row` becomes undefined.',
      },
      {
        lineNumber: 'Line 7',
        codeSnippet: 'print(" ".join(str(col) for col in range(1, row + 1)))',
        whatItMeans: 'Joins generator items with a single space—no trailing space added.',
        whyItIsThere: 'Passes strict whitespace comparison and runs faster than per-character print.',
        ifDeletedError: 'Produces empty output or trailing space mismatch.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'n = 3; enter outer range(1, 4)', memoryOrStack: 'n=3, row=1', note: 'range uses O(1) memory' },
      { step: 2, state: 'inner generator yields "1"', memoryOrStack: 'row=1, col=1', note: 'Prints "1"' },
      { step: 3, state: 'outer yields row = 2; inner yields "1", "2"', memoryOrStack: 'row=2, col=1..2', note: 'Prints "1 2"' },
      { step: 4, state: 'outer yields row = 3; inner yields "1", "2", "3"', memoryOrStack: 'row=3, col=1..3', note: 'Prints "1 2 3"' },
      { step: 5, state: 'range(1, 4) exhausted', memoryOrStack: 'Iterator stops', note: 'Program exits 0' },
    ],
    harryBugTraps: [
      {
        title: 'Using Float Division `/` Instead of `//` in Formula',
        brokenCode: `total = n * (n + 1) / 2\nprint(total)`,
        fixedCode: `total = n * (n + 1) // 2\nprint(total)`,
        whyItBreaks: 'For `n = 10^9`, `/` creates an IEEE-754 float (`5e+17`), losing precision on low digits!',
      },
      {
        title: 'Mutating a List While Iterating Over It',
        brokenCode: `nums = [1, 2, 3, 4]\nfor x in nums:\n    if x % 2 == 0: nums.remove(x)`,
        fixedCode: `nums = [x for x in nums if x % 2 != 0]`,
        whyItBreaks: 'Removing elements shifts indices left, causing the loop iterator to skip adjacent elements silently.',
      },
      {
        title: 'String Concatenation `+` Inside a 10^5 Loop',
        brokenCode: `s = ""\nfor i in range(100000): s += str(i)`,
        fixedCode: `s = "".join(str(i) for i in range(100000))`,
        whyItBreaks: 'Python strings are immutable, so repeated `+=` copies the whole string into O(n^2) behavior.',
      },
    ],
    practiceSheet: [
      {
        id: 'py-ch-4-q1',
        difficulty: 'Easy',
        title: 'Sum of Multiples of 3 or 5 Below N',
        prompt: 'Read n and print the sum of all integers in `1..n` divisible by 3 or 5.',
        banglaHint: '`sum(i for i in range(1, n + 1) if i % 3 == 0 or i % 5 == 0)` ব্যবহার করো।',
        starterCode: `import sys\nn = int(sys.stdin.read().strip() or 0)\nprint(sum(i for i in range(1, n + 1) if i % 3 == 0 or i % 5 == 0))`,
        sampleStdin: '10',
        expectedOutput: '33',
      },
      {
        id: 'py-ch-4-q2',
        difficulty: 'Easy',
        title: 'Index-Weighted Sum With enumerate()',
        prompt: 'Read n integers and compute `sum((idx + 1) * val)` using `enumerate()`.',
        banglaHint: '`enumerate(nums, start=1)` সরাসরি ১-ভিত্তিক ইনডেক্স দেবে!',
        starterCode: `import sys\ntokens = list(map(int, sys.stdin.read().split()))\nn = tokens[0] if tokens else 0\nprint(sum(idx * val for idx, val in enumerate(tokens[1:1+n], start=1)))`,
        sampleStdin: '3\n10 20 30',
        expectedOutput: '140',
      },
      {
        id: 'py-ch-4-q3',
        difficulty: 'Medium',
        title: 'Centered Star Pyramid',
        prompt: 'Read n and print an n-row centered `*` pyramid with exact leading spaces and no trailing spaces.',
        banglaHint: '`" " * (n - r) + "*" * (2 * r - 1)` দিয়ে প্রতিটি সারি বানাও।',
        starterCode: `import sys\nn = int(sys.stdin.read().strip() or 0)\nfor r in range(1, n + 1):\n    print(" " * (n - r) + "*" * (2 * r - 1))`,
        sampleStdin: '3',
        expectedOutput: '  *\n ***\n*****',
      },
      {
        id: 'py-ch-4-q4',
        difficulty: 'Medium',
        title: 'Collatz Stopping Steps',
        prompt: 'Read positive integer n. While n > 1, if even `n //= 2` else `n = 3*n + 1`. Print total steps.',
        banglaHint: '`while n > 1` লুপে প্রতি ধাপে `steps += 1` করো।',
        starterCode: `import sys\nn = int(sys.stdin.read().strip() or 1)\nsteps = 0\nwhile n > 1:\n    n = n // 2 if n % 2 == 0 else 3 * n + 1\n    steps += 1\nprint(steps)`,
        sampleStdin: '6',
        expectedOutput: '8',
      },
      {
        id: 'py-ch-4-q5',
        difficulty: 'Hard',
        title: 'Maximum Subarray Sum (Kadane O(n))',
        prompt: 'Read n and n integers; print the maximum contiguous non-empty subarray sum in O(n) time and O(1) space.',
        banglaHint: 'বর্তমান যোগফল নেগেটিভ হয়ে গেলে নতুন করে শুরু (`max(x, cur + x)`) করাই Kadane’s Algorithm!',
        starterCode: `import sys\ndata = list(map(int, sys.stdin.read().split()))\nif data:\n    nums = data[1:1+data[0]]\n    cur = best = nums[0]\n    for x in nums[1:]:\n        cur = max(x, cur + x)\n        best = max(best, cur)\n    print(best)`,
        sampleStdin: '6\n-2 1 -3 4 -1 2',
        expectedOutput: '5',
      },
    ],
    miniBuild: {
      title: 'Python 3.13 Mini Build: Running Stats & Prime Counter',
      description: 'Combines Ch 1–4 using sys.stdin, O(sqrt(n)) primality loop, and generator expressions.',
      banglaGoal: 'Python-এ ১ থেকে n পর্যন্ত মোট প্রাইম এবং তাদের যোগফল জেনারেটর লুপ দিয়ে বের করা।',
      combinesChapters: 'Ch 1–4',
      starterCode: `import sys\n\ndef is_prime(x: int) -> bool:\n    if x < 2: return False\n    d = 2\n    while d * d <= x:\n        if x % d == 0: return False\n        d += 1\n    return True\n\nn = int(sys.stdin.read().strip() or 0)\nprimes = [x for x in range(2, n + 1) if is_prime(x)]\nprint(f"count={len(primes)} sum={sum(primes)}")`,
      sampleStdin: '10',
      expectedOutput: 'count=4 sum=17',
    },
  },
  java: {
    title: 'Java Chapter 4 (Java 21): Loops, StringBuilder Patterns & O(n) Complexity',
    banglaTitle: 'Java অধ্যায় ৪ (Java 21): লুপ, StringBuilder প্যাটার্ন ও টাইম কমপ্লেক্সিটি',
    subtitle: 'Master for/while/enhanced-for loops, StringBuilder vs String concatenation in O(n), and Java 21 IntStream.range.',
    zeroIntuition: {
      plainEnglishStory:
        'In Java, repeating `+` on a `String` inside a loop allocates a brand new object on the JVM heap every iteration—turning a 100,000-step O(n) loop into O(n^2) garbage-collection agony! Using `StringBuilder` and `long` accumulators keeps your loops blazing fast inside JVM.',
      asciiFlowchart: `    ( START: Read n )
            |
            v
    [ StringBuilder sb = new StringBuilder() ]
            |
            v
    +--> [ for i = 1..n ] --(done)--> [ System.out.print(sb) ]
    |          |
    +---[ sb.append(...) in O(1) amortized ]`,
      pseudocode: [
        '1. READ integer n via Scanner',
        '2. GUARD against n <= 0 before loop starts',
        '3. INITIALIZE `StringBuilder` so pattern building runs in O(n) amortized time',
        '4. USE `long` for accumulators so sums up to 10^18 never overflow 32-bit int',
        '5. PRINT accumulated output once at the end',
      ],
      banglaZeroToHero: {
        analogyTitle: 'StringBuilder খাতা বনাম প্রতিবার নতুন খাতা কেনা (Java Loop Performance)',
        explanation:
          'Java-তে `String` হলো Immutable (পরিবর্তন করা যায় না)। তাই লুপের ভেতর `s = s + "*"` লিখলে প্রতি ধাপে JVM পুরো পুরোনো স্ট্রিং কপি করে নতুন অবজেক্ট বানায়—এতে `O(n^2)` সময় লেগে TLE হয়! তাই লুপের ভেতর সবসময় `StringBuilder` (একই খাতায় পেনসিল দিয়ে যোগ করা) ব্যবহার করতে হয়।',
        everydayExample:
          'একটি লম্বা তালিকা বানাতে প্রতি লাইনে নতুন পৃষ্ঠা প্রিন্ট না করে একসাথে `StringBuilder`-এ লিখে একবারে আউটপুট দিলে ১০০ গুণ দ্রুত চলে।',
        keyTakeaways: [
          'লুপের ভেতর কখনো `String += ...` করো না; সবসময় `StringBuilder.append()` ব্যবহার করো।',
          '`int` ২ বিলিয়নে ওভারফ্লো হয়, তাই লুপের যোগফল বা গুণফলে `long` ব্যবহার করো।',
          'Java 21-এ `IntStream.rangeClosed(1, n)` দিয়ে ক্লিন ফাংশনাল লুপও লেখা যায়।',
        ],
      },
    },
    codeExamples: [
      {
        id: 'java-4-ex-basic',
        tier: 'Basic',
        title: '1. Basic: StringBuilder Number Triangle Pattern',
        banglaNote: 'StringBuilder দিয়ে কোনো ট্রেইলিং স্পেস ছাড়াই O(n^2) আউটপুট একসাথে প্রিন্ট।',
        code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();

        StringBuilder sb = new StringBuilder();
        for (int r = 1; r <= n; r++) {
            for (int c = 1; c <= r; c++) {
                sb.append(c);
                if (c < r) sb.append(' ');
            }
            sb.append('\\n');
        }
        System.out.print(sb.toString());
    }
}`,
        stdin: '4',
        expectedOutput: '1\n1 2\n1 2 3\n1 2 3 4',
      },
      {
        id: 'java-4-ex-edge',
        tier: 'Edge-Case',
        title: '2. Edge-Case: Zero & Negative Digit Counter (do-while)',
        banglaNote: 'n = 0 বা নেগেটিভ হলে নিরাপদে ডিজিট গোনার জন্য do-while এবং Math.abs লজিক।',
        code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextLong()) return;
        long n = sc.nextLong();

        int digits = 0;
        long cur = n;
        do {
            digits++;
            cur /= 10;
        } while (cur != 0);

        System.out.println("digits=" + digits);
    }
}`,
        stdin: '0',
        expectedOutput: 'digits=1',
      },
      {
        id: 'java-4-ex-opt',
        tier: 'Optimized',
        title: '3. Optimized: O(1) Even-First Arithmetic Sum',
        banglaNote: 'লুপ বাদ দিয়ে O(1) সময়ে এবং ৬৪-বিট long দিয়ে ওভারফ্লো-মুক্ত যোগফল।',
        code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextLong()) return;
        long n = sc.nextLong();
        if (n <= 0) {
            System.out.println(0);
            return;
        }
        long ans = (n % 2 == 0) ? (n / 2) * (n + 1) : n * ((n + 1) / 2);
        System.out.println(ans);
    }
}`,
        stdin: '100000',
        expectedOutput: '5000050000',
      },
      {
        id: 'java-4-ex-cp',
        tier: 'CP Trick',
        title: '4. CP Trick: Java 21 IntStream & O(sqrt(n)) Divisor Count',
        banglaNote: 'দুটো একসাথে: O(sqrt(n)) লুপে ভাজক গণনা করে দ্রুততম উত্তর বের করা।',
        code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextLong()) return;
        long n = sc.nextLong();
        long count = 0;
        for (long d = 1; d * d <= n; d++) {
            if (n % d == 0) {
                count += (d * d == n) ? 1 : 2;
            }
        }
        System.out.println(count);
    }
}`,
        stdin: '36',
        expectedOutput: '9',
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 9',
        codeSnippet: 'StringBuilder sb = new StringBuilder();',
        whatItMeans: 'Creates a mutable character buffer on the heap.',
        whyItIsThere: 'Prevents O(n^2) immutable `String` allocations inside nested loops.',
        ifDeletedError: 'Repeated `+` string concatenation slows huge patterns and causes TLE.',
      },
      {
        lineNumber: 'Line 10',
        codeSnippet: 'for (int r = 1; r <= n; r++) {',
        whatItMeans: 'Standard outer loop running rows 1 through n.',
        whyItIsThere: 'Maintains row invariant: `r` equals the count of integers on the current row.',
        ifDeletedError: 'Row index `r` becomes undefined.',
      },
      {
        lineNumber: 'Line 13',
        codeSnippet: 'if (c < r) sb.append(\' \');',
        whatItMeans: 'Appends space only between numbers, never after the last number.',
        whyItIsThere: 'Avoids trailing space Presentation Errors on strict judges.',
        ifDeletedError: 'Digits concatenate without spaces (`123` instead of `1 2 3`).',
      },
      {
        lineNumber: 'Line 17',
        codeSnippet: 'System.out.print(sb.toString());',
        whatItMeans: 'Flushes the entire built output in one I/O call.',
        whyItIsThere: 'Drastically cuts system I/O overhead in large test cases.',
        ifDeletedError: 'Nothing prints to stdout.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'n = 3; sb = ""', memoryOrStack: 'sb len=0', note: 'Heap buffer initialized once' },
      { step: 2, state: 'r = 1; c = 1 -> append "1\\n"', memoryOrStack: 'r=1, sb="1\\n"', note: 'No space after 1 (1 < 1 false)' },
      { step: 3, state: 'r = 2; c = 1,2 -> append "1 2\\n"', memoryOrStack: 'r=2, sb="1\\n1 2\\n"', note: 'Space added only after 1' },
      { step: 4, state: 'r = 3; c = 1..3 -> append "1 2 3\\n"', memoryOrStack: 'r=3, sb len=12', note: 'O(1) amortized buffer writes' },
      { step: 5, state: 'Loop ends; single print(sb)', memoryOrStack: '1 I/O syscall', note: 'Clean stdout' },
    ],
    harryBugTraps: [
      {
        title: 'String Concatenation Inside Loop Causes O(n^2) TLE',
        brokenCode: `String out = "";\nfor (int i = 0; i < 100000; i++) out += i;`,
        fixedCode: `StringBuilder sb = new StringBuilder();\nfor (int i = 0; i < 100000; i++) sb.append(i);`,
        whyItBreaks: 'Each `+=` copies the entire prior string; 10^5 iterations copy ~5 billion characters!',
      },
      {
        title: '32-bit int Overflow in n*(n+1)/2',
        brokenCode: `int n = 100000;\nlong sum = n * (n + 1) / 2;`,
        fixedCode: `long n = 100000L;\nlong sum = n * (n + 1) / 2;`,
        whyItBreaks: '`n * (n + 1)` multiplies two `int`s FIRST, overflowing to a negative int before widening to `long`.',
      },
      {
        title: 'Empty Scanner Check Missing on EOF',
        brokenCode: `int n = sc.nextInt();`,
        fixedCode: `if (!sc.hasNextInt()) return;\nint n = sc.nextInt();`,
        whyItBreaks: 'Throws `NoSuchElementException` when stdin is empty.',
      },
    ],
    practiceSheet: [
      {
        id: 'java-ch-4-q1',
        difficulty: 'Easy',
        title: 'Factorial Loop With 64-bit long',
        prompt: 'Read n (0 <= n <= 20) and print `n!` using a `long` loop.',
        banglaHint: '`0! = 1`—তাই `long fact = 1` ধরে `2` থেকে `n` পর্যন্ত গুণ করো।',
        starterCode: `import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.hasNextInt() ? sc.nextInt() : 0;\n        long fact = 1;\n        for (int i = 2; i <= n; i++) fact *= i;\n        System.out.println(fact);\n    }\n}`,
        sampleStdin: '5',
        expectedOutput: '120',
      },
      {
        id: 'java-ch-4-q2',
        difficulty: 'Easy',
        title: 'Sum of Digits Loop',
        prompt: 'Read non-negative integer n and print the sum of its digits using a `while` loop.',
        banglaHint: 'প্রতি ধাপে `sum += n % 10` করে `n /= 10` করো।',
        starterCode: `import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        long n = sc.hasNextLong() ? Math.abs(sc.nextLong()) : 0;\n        long s = 0;\n        while (n > 0) { s += n % 10; n /= 10; }\n        System.out.println(s);\n    }\n}`,
        sampleStdin: '987',
        expectedOutput: '24',
      },
      {
        id: 'java-ch-4-q3',
        difficulty: 'Medium',
        title: 'Centered Star Pyramid Using String.repeat (Java 21)',
        prompt: 'Read n and build an n-row centered `*` pyramid using Java 21 `" ".repeat()` and `"*".repeat()`.',
        banglaHint: '`" ".repeat(n - r) + "*".repeat(2 * r - 1)` এক লাইনেই সারি তৈরি করে!',
        starterCode: `import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.hasNextInt() ? sc.nextInt() : 0;\n        StringBuilder sb = new StringBuilder();\n        for (int r = 1; r <= n; r++) {\n            sb.append(" ".repeat(n - r)).append("*".repeat(2 * r - 1)).append('\\n');\n        }\n        System.out.print(sb);\n    }\n}`,
        sampleStdin: '3',
        expectedOutput: '  *\n ***\n*****',
      },
      {
        id: 'java-ch-4-q4',
        difficulty: 'Medium',
        title: 'Java 21 IntStream Sum of Squares',
        prompt: 'Read n and compute `1^2 + 2^2 + ... + n^2` using `IntStream.rangeClosed`.',
        banglaHint: '`LongStream.rangeClosed(1, n).map(x -> x * x).sum()` ব্যবহার করো।',
        starterCode: `import java.util.Scanner;\nimport java.util.stream.LongStream;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        long n = sc.hasNextLong() ? sc.nextLong() : 0;\n        long ans = LongStream.rangeClosed(1, Math.max(0, n)).map(x -> x * x).sum();\n        System.out.println(ans);\n    }\n}`,
        sampleStdin: '4',
        expectedOutput: '30',
      },
      {
        id: 'java-ch-4-q5',
        difficulty: 'Hard',
        title: 'Prefix Sum Range Query Engine in O(n + q)',
        prompt: 'Read n, n integers, then q queries `(l, r)` (1-indexed) and answer each sum in O(1) using a prefix array.',
        banglaHint: '`pref[i] = pref[i - 1] + a[i]` বানিয়ে রাখলে প্রতিটি কুয়েরি `pref[r] - pref[l - 1]`-এ O(1) সময়ে হয়!',
        starterCode: `import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] pref = new long[n + 1];\n        for (int i = 1; i <= n; i++) pref[i] = pref[i - 1] + sc.nextLong();\n        int q = sc.hasNextInt() ? sc.nextInt() : 0;\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < q; i++) {\n            int l = sc.nextInt(), r = sc.nextInt();\n            sb.append(pref[r] - pref[l - 1]).append('\\n');\n        }\n        System.out.print(sb);\n    }\n}`,
        sampleStdin: '5\n2 4 6 8 10\n2\n1 3\n2 5',
        expectedOutput: '12\n28',
      },
    ],
    miniBuild: {
      title: 'Java 21 Mini Build: Fast Prefix & FizzBuzz Report',
      description: 'Combines Ch 1–4 using StringBuilder and IntStream to output a clean tagged 1..N summary.',
      banglaGoal: 'Java 21 স্ট্রিম ও StringBuilder ব্যবহার করে ১..N FizzBuzz রিপোর্ট দ্রুত প্রিন্ট করা।',
      combinesChapters: 'Ch 1–4',
      starterCode: `import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.hasNextInt() ? sc.nextInt() : 0;\n        StringBuilder sb = new StringBuilder();\n        for (int i = 1; i <= n; i++) {\n            if (i % 15 == 0) sb.append("FizzBuzz");\n            else if (i % 3 == 0) sb.append("Fizz");\n            else if (i % 5 == 0) sb.append("Buzz");\n            else sb.append(i);\n            if (i < n) sb.append(' ');\n        }\n        System.out.println(sb);\n    }\n}`,
      sampleStdin: '5',
      expectedOutput: '1 2 Fizz 4 Buzz',
    },
  },
  javascript: {
    title: 'JavaScript Chapter 4 (ES2025): Loops, Iterators & O(n) Performance',
    banglaTitle: 'JavaScript অধ্যায় ৪ (ES2025): লুপ, ইটারেটর ও O(n) পারফরম্যান্স',
    subtitle: 'Master for/while/for..of, Array.from, Iterator helpers, BigInt loop bounds, and avoiding O(n^2) event-loop stalls.',
    zeroIntuition: {
      plainEnglishStory:
        'JavaScript runs on a single main UI thread! If a sloppy O(n^2) nested loop freezes for 3 seconds over 100,000 items, the entire webpage freezes. Writing O(n) loops with `for..of`, `Set`/`Map` lookups, and `Array.join()` keeps both Node backends and browser UIs silky smooth.',
      asciiFlowchart: `    ( START: Read n )
            |
            v
    [ Build rows array (O(1) per line) ]
            |
            v
    +--> [ r = 1 .. n ] --(done)--> [ console.log(rows.join("\\n")) ]
    |          |
    +---[ Push formatted line ]`,
      pseudocode: [
        '1. READ stdin tokens cleanly with sandbox-compatible helper',
        '2. GUARD against n <= 0 or NaN before starting iteration',
        '3. LOOP with `for (let i = 1; i <= n; i++)` or `for (const x of arr)`',
        '4. REPLACE `arr.includes()` inside loops (O(n^2)) with `Set.has()` (O(n))',
        '5. EMIT joined result in one `console.log()` call',
      ],
      banglaZeroToHero: {
        analogyTitle: 'সিঙ্গেল-লেন রাস্তা ও ট্রাফিক জ্যাম (JS Main Thread & Big-O)',
        explanation:
          'জাভাস্ক্রিপ্ট ব্রাউজারে একটি মাত্র প্রধান লেন (Single Thread)-এ চলে। তুমি যদি `for` লুপের ভেতর `arr.includes()` ব্যবহার করো, তবে ১ লাখ ডেটায় ১০^১০ ধাপে পুরো ব্রাউজার ট্যাব জ্যাম হয়ে যাবে! তাই `Set` বা গাণিতিক সূত্র দিয়ে O(n) বা O(1) লুপ লিখলেই পেজ মুহূর্তে সাড়া দেয়।',
        everydayExample:
          'কনসার্টে ১ লাখ দর্শকের টিকিট চেক করতে সবার লিস্ট বারবার না উল্টিয়ে একটি হ্যাশ সেটে (Set) রাখলে প্রতিটি চেক O(1) সময়ে হয়।',
        keyTakeaways: [
          '`for..in` অবজেক্টের key-এর জন্য, আর `for..of` অ্যারে/সেটের মানের (value) জন্য ব্যবহার করবে—কখনো অ্যারেতে `for..in` দিও না!',
          'ES2025-এ বড় সংখ্যার যোগফলে `53-bit` Number লিমিট (`9e15`) পার হলে `BigInt` (`0n`) ব্যবহার করো।',
          'লুপে বারবার `console.log()` না ডেকে একটি অ্যারেতে জমিয়ে শেষে `.join("\\n")` করে প্রিন্ট করা দ্রুততম।',
        ],
      },
    },
    codeExamples: [
      {
        id: 'js-4-ex-basic',
        tier: 'Basic',
        title: '1. Basic: Triangle Pattern With Array.from & join()',
        banglaNote: 'প্রতি সারিতে ট্রেইলিং স্পেস বাদ দিয়ে পরিষ্কার ত্রিভুজ প্রিন্ট।',
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const n = Number(raw.trim() || 0);

const lines = [];
for (let r = 1; r <= n; r++) {
  const row = Array.from({ length: r }, (_, idx) => idx + 1);
  lines.push(row.join(' '));
}
console.log(lines.join('\\n'));`,
        stdin: '4',
        expectedOutput: '1\n1 2\n1 2 3\n1 2 3 4',
      },
      {
        id: 'js-4-ex-edge',
        tier: 'Edge-Case',
        title: '2. Edge-Case: NaN / Zero Guard & do-while Digit Count',
        banglaNote: 'ইনপুট ০, খালি বা NaN হলে নিরাপদ do-while ডিজিট কাউন্টার।',
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const token = raw.trim();

if (!token || Number.isNaN(Number(token))) {
  console.log('INVALID');
} else {
  let x = Math.abs(Math.trunc(Number(token)));
  let digits = 0;
  do {
    digits++;
    x = Math.floor(x / 10);
  } while (x > 0);
  console.log(\`digits=\${digits}\`);
}`,
        stdin: '0',
        expectedOutput: 'digits=1',
      },
      {
        id: 'js-4-ex-opt',
        tier: 'Optimized',
        title: '3. Optimized: O(n) Set Deduplication Instead of O(n^2) includes()',
        banglaNote: 'অ্যারের ভেতর `includes()` ব্যবহার করলে O(n^2) হয়; `Set` ব্যবহার করলে O(n) হয়।',
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const nums = raw.trim().split(/\\s+/).map(Number);

const n = nums[0] || 0;
const seen = new Set();
let dups = 0;
for (let i = 1; i <= n; i++) {
  if (seen.has(nums[i])) dups++;
  seen.add(nums[i]);
}
console.log(dups);`,
        stdin: '6\n4 2 4 5 2 9',
        expectedOutput: '2',
      },
      {
        id: 'js-4-ex-cp',
        tier: 'CP Trick',
        title: '4. CP Trick: BigInt Exact O(1) Sum Beyond MAX_SAFE_INTEGER',
        banglaNote: 'JavaScript Number ৯×১০^১৫ এর পরে নিখুঁত থাকে না—তাই BigInt (`n * (n + 1n) / 2n`) দিয়ে নিখুঁত উত্তর।',
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const n = BigInt(raw.trim() || '0');

const total = n > 0n ? (n * (n + 1n)) / 2n : 0n;
console.log(total.toString());`,
        stdin: '1000000000',
        expectedOutput: '500000000500000000',
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 5',
        codeSnippet: 'const lines = [];',
        whatItMeans: 'Initializes an output array to buffer lines.',
        whyItIsThere: 'Single `console.log(lines.join("\\n"))` avoids repeated stdout flushing.',
        ifDeletedError: '`ReferenceError: lines is not defined`.',
      },
      {
        lineNumber: 'Line 6',
        codeSnippet: 'for (let r = 1; r <= n; r++) {',
        whatItMeans: 'Block-scoped loop counter `let r` walking `1..n`.',
        whyItIsThere: 'Using `let` instead of `var` prevents closure scoping bugs.',
        ifDeletedError: '`r` is undefined inside `Array.from`.',
      },
      {
        lineNumber: 'Line 7',
        codeSnippet: 'const row = Array.from({ length: r }, (_, idx) => idx + 1);',
        whatItMeans: 'Generates `[1, 2, ..., r]` cleanly in one functional pass.',
        whyItIsThere: 'Avoids manual inner counter mutation.',
        ifDeletedError: '`row` is undefined when pushing to `lines`.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'n = 3; lines = []', memoryOrStack: 'lines=[]', note: 'Input parsed safely' },
      { step: 2, state: 'r = 1 -> row = [1]', memoryOrStack: 'lines=["1"]', note: 'join(" ") gives "1"' },
      { step: 3, state: 'r = 2 -> row = [1, 2]', memoryOrStack: 'lines=["1", "1 2"]', note: 'No trailing space' },
      { step: 4, state: 'r = 3 -> row = [1, 2, 3]', memoryOrStack: 'lines=["1", "1 2", "1 2 3"]', note: 'Buffered cleanly' },
      { step: 5, state: 'console.log(lines.join("\\n"))', memoryOrStack: 'stdout flushed once', note: 'Clean exit' },
    ],
    harryBugTraps: [
      {
        title: 'Using var Instead of let in Loop + Timeout Closures',
        brokenCode: `for (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 0);\n}`,
        fixedCode: `for (let i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 0);\n}`,
        whyItBreaks: '`var` is function-scoped, so all 3 callbacks print `3` instead of `0, 1, 2`!',
      },
      {
        title: 'Using arr.includes() Inside a Loop (Hidden O(n^2))',
        brokenCode: `for (const x of arr) if (!uniq.includes(x)) uniq.push(x);`,
        fixedCode: `const uniq = [...new Set(arr)];`,
        whyItBreaks: '`includes()` scans the entire array on every iteration, exploding on 10^5 items.',
      },
      {
        title: 'Number Precision Loss Past 2^53 - 1',
        brokenCode: `const n = 1e9;\nconsole.log(n * (n + 1) / 2);`,
        fixedCode: `const n = 1000000000n;\nconsole.log((n * (n + 1n) / 2n).toString());`,
        whyItBreaks: 'Floats round off large integer products silently; `BigInt` stays 100% exact.',
      },
    ],
    practiceSheet: [
      {
        id: 'js-ch-4-q1',
        difficulty: 'Easy',
        title: 'Print Even Numbers 2..N',
        prompt: 'Read n and output all even integers from 2 to n on one space-separated line.',
        banglaHint: '`for (let i = 2; i <= n; i += 2)` করে অ্যারেতে নিয়ে `.join(" ")` করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst n = Number(raw.trim() || 0);\nconst out = [];\nfor (let i = 2; i <= n; i += 2) out.push(i);\nconsole.log(out.join(' '));`,
        sampleStdin: '8',
        expectedOutput: '2 4 6 8',
      },
      {
        id: 'js-ch-4-q2',
        difficulty: 'Easy',
        title: 'Reverse Digits With While Loop',
        prompt: 'Read positive integer n and print its reversed integer without leading zeros.',
        banglaHint: '`rev = rev * 10 + (n % 10)` এবং `n = Math.floor(n / 10)` ব্যবহার করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nlet n = Number(raw.trim() || 0), rev = 0;\nwhile (n > 0) { rev = rev * 10 + (n % 10); n = Math.floor(n / 10); }\nconsole.log(rev);`,
        sampleStdin: '12340',
        expectedOutput: '4321',
      },
      {
        id: 'js-ch-4-q3',
        difficulty: 'Medium',
        title: 'Centered Star Pyramid',
        prompt: 'Read n and print an n-row centered `*` pyramid using `.repeat()`.',
        banglaHint: "`' '.repeat(n - r) + '*'.repeat(2 * r - 1)` দিয়ে সারি বানাও।",
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst n = Number(raw.trim() || 0);\nconst rows = [];\nfor (let r = 1; r <= n; r++) rows.push(' '.repeat(n - r) + '*'.repeat(2 * r - 1));\nconsole.log(rows.join('\\n'));`,
        sampleStdin: '3',
        expectedOutput: '  *\n ***\n*****',
      },
      {
        id: 'js-ch-4-q4',
        difficulty: 'Medium',
        title: 'Count Divisors in O(sqrt(n))',
        prompt: 'Read n and count its positive divisors using `d * d <= n`.',
        banglaHint: '`d * d === n` হলে ১ যোগ, নইলে ২ যোগ করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst n = Number(raw.trim() || 0);\nlet divs = 0;\nfor (let d = 1; d * d <= n; d++) if (n % d === 0) divs += (d * d === n ? 1 : 2);\nconsole.log(divs);`,
        sampleStdin: '36',
        expectedOutput: '9',
      },
      {
        id: 'js-ch-4-q5',
        difficulty: 'Hard',
        title: 'Kadane Maximum Subarray Sum in O(n)',
        prompt: 'Read n followed by n integers; print maximum contiguous subarray sum in O(n).',
        banglaHint: '`cur = Math.max(x, cur + x)` এবং `best = Math.max(best, cur)` চালাও।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst vals = raw.trim().split(/\\s+/).map(Number);\nconst n = vals[0] || 0;\nlet cur = vals[1], best = vals[1];\nfor (let i = 2; i <= n; i++) { cur = Math.max(vals[i], cur + vals[i]); best = Math.max(best, cur); }\nconsole.log(best);`,
        sampleStdin: '6\n-2 1 -3 4 -1 2',
        expectedOutput: '5',
      },
    ],
    miniBuild: {
      title: 'ES2025 Mini Build: Frequency Histogram & Mode Finder',
      description: 'Combines Ch 1–4 using a single O(n) Map pass to count frequencies and find the highest-frequency value.',
      banglaGoal: 'একটি O(n) Map লুপ চালিয়ে সংখ্যাগুলোর ফ্রিকোয়েন্সি এবং মোড (সবচেয়ে বেশিবার আসা সংখ্যা) বের করা।',
      combinesChapters: 'Ch 1–4',
      starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst vals = raw.trim().split(/\\s+/).map(Number);\nconst n = vals[0] || 0;\nconst freq = new Map();\nlet mode = vals[1], bestCnt = 0;\nfor (let i = 1; i <= n; i++) {\n  const c = (freq.get(vals[i]) || 0) + 1;\n  freq.set(vals[i], c);\n  if (c > bestCnt) { bestCnt = c; mode = vals[i]; }\n}\nconsole.log(\`mode=\${mode} count=\${bestCnt}\`);`,
      sampleStdin: '6\n4 2 4 5 4 2',
      expectedOutput: 'mode=4 count=3',
    },
  },
  rust: {
    title: 'Rust Chapter 4 (Rust 2024): Ranges, Iterators & Zero-Cost O(n) Loops',
    banglaTitle: 'Rust অধ্যায় ৪ (Rust 2024): রেঞ্জ, ইটারেটর ও জিরো-কস্ট লুপ',
    subtitle: 'Master loop/while/for-in ranges (1..=n), .rev(), zero-cost iterator adapters, and overflow-safe arithmetic.',
    zeroIntuition: {
      plainEnglishStory:
        'Rust turns high-level functional iterators (`(1..=n).sum()`, `.enumerate()`, `.rev()`) into the exact same tight assembly instructions as hand-written C loops—while guaranteeing zero out-of-bounds indexing and catching integer overflows in debug builds!',
      asciiFlowchart: `    ( START: Read n )
            |
            v
    [ Range 1..=n ] ---> inclusive range iterator
            |
            v
    +--> [ Some(r) ] --(None)--> [ Flush Output ] --> ( STOP )
    |        |
    +---[ Format row 1..=r cleanly ]`,
      pseudocode: [
        '1. READ stdin into trimmed string and parse signed/unsigned integer cleanly',
        '2. USE inclusive range `1..=n` when `n` itself should be included',
        '3. USE `loop { ... break val; }` when returning a computed value directly from a loop',
        '4. LEVERAGE `.iter().enumerate()` instead of manual index arithmetic',
        '5. USE `i64`/`u128` or `checked_mul` for large N formulas',
      ],
      banglaZeroToHero: {
        analogyTitle: 'জিরো-কস্ট ইটারেটর ও রেঞ্জ (`1..n` বনাম `1..=n`)',
        explanation:
          'Rust-এ `1..n` মানে `n` বাদ দিয়ে `n-1` পর্যন্ত, আর `1..=n` মানে `n` সহ! আরও মজার বিষয় হলো Rust-এর `loop` একটি এক্সপ্রেশন—মানে `break result;` দিয়ে লুপ থেকেই সরাসরি কোনো ভ্যারিয়েবলে মান ফেরত দেওয়া যায়। আর `.iter().sum()` কম্পাইলার অপ্টিমাইজ করে ঠিক C-এর গতির সমান করে দেয়!',
        everydayExample:
          'কফি মেশিনের বোতাম চাপলে যেমন মেশিন নিজে থেকেই ঠিক ৫ কাপ ঢেলে `break` করে কাপের সংখ্যা বলে দেয়, Rust-এর `loop` এবং `1..=n` তেমনই নির্ভুল ও নিরাপদ।',
        keyTakeaways: [
          'সবসময় `1..n` (exclusive) ও `1..=n` (inclusive)-এর পার্থক্য খেয়াল রাখবে।',
          'রিভার্স লুপের জন্য `.rev()` (`(1..=n).rev()`) ব্যবহার করলে কোনো `usize` আন্ডারফ্লো বাগ হয় না!',
          'অনেক বড় সংখ্যার গুণফলে Rust-এ `i64` বা `u128` ব্যবহার করে প্যানিক এড়াও।',
        ],
      },
    },
    codeExamples: [
      {
        id: 'rust-4-ex-basic',
        tier: 'Basic',
        title: '1. Basic: Inclusive Range (1..=n) Number Triangle',
        banglaNote: '1..=r রেঞ্জ ব্যবহার করে অফ-বাই-ওয়ান বাগ ছাড়াই সারি ও কলাম প্রিন্ট।',
        code: `use std::io::{self, Read};

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let n: usize = s.trim().parse().unwrap_or(0);

    for r in 1..=n {
        let row: Vec<String> = (1..=r).map(|c| c.to_string()).collect();
        println!("{}", row.join(" "));
    }
}`,
        stdin: '4',
        expectedOutput: '1\n1 2\n1 2 3\n1 2 3 4',
      },
      {
        id: 'rust-4-ex-edge',
        tier: 'Edge-Case',
        title: '2. Edge-Case: loop-break Expression for 0 & Negative Digits',
        banglaNote: 'Rust-এ `do-while` নেই—কিন্তু `loop { ... if x == 0 { break digits; } }` আরও পরিষ্কার!',
        code: `use std::io::{self, Read};

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let n: i64 = s.trim().parse().unwrap_or(0);

    let mut x = n.unsigned_abs();
    let digits = loop {
        x /= 10;
        if x == 0 {
            break 1;
        }
        // Fallback loop count handled cleanly below
        let mut count = 1u32;
        while x > 0 {
            count += 1;
            x /= 10;
        }
        break count;
    };
    println!("digits={}", digits);
}`,
        stdin: '0',
        expectedOutput: 'digits=1',
      },
      {
        id: 'rust-4-ex-opt',
        tier: 'Optimized',
        title: '3. Optimized: Safe .rev() Countdown (Zero Underflow)',
        banglaNote: 'usize রিভার্স লুপে `--i` আন্ডারফ্লো করে প্যানিক ঘটায়; `(1..=n).rev()` সম্পূর্ণ নিরাপদ!',
        code: `use std::io::{self, Read};

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let n: usize = s.trim().parse().unwrap_or(0);

    let rev_list: Vec<String> = (1..=n).rev().map(|x| x.to_string()).collect();
    println!("{}", rev_list.join(" "));
}`,
        stdin: '5',
        expectedOutput: '5 4 3 2 1',
      },
      {
        id: 'rust-4-ex-cp',
        tier: 'CP Trick',
        title: '4. CP Trick: u128 O(1) Formula & O(sqrt(n)) Divisor Count',
        banglaNote: 'u128 ব্যবহার করে n = 10^9 এর যোগফল ওভারফ্লো ছাড়াই O(1)-এ বের করা।',
        code: `use std::io::{self, Read};

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let n: u128 = s.trim().parse().unwrap_or(0);
    let total = n * (n + 1) / 2;
    println!("{}", total);
}`,
        stdin: '1000000000',
        expectedOutput: '500000000500000000',
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 6',
        codeSnippet: 'let n: usize = s.trim().parse().unwrap_or(0);',
        whatItMeans: 'Parses trimmed input as unsigned `usize`, falling back safely to `0`.',
        whyItIsThere: 'Prevents panic on empty stdin.',
        ifDeletedError: '`n` is undefined.',
      },
      {
        lineNumber: 'Line 8',
        codeSnippet: 'for r in 1..=n {',
        whatItMeans: 'Inclusive integer range from `1` up to and including `n`.',
        whyItIsThere: 'If `n == 0`, `1..=0` is empty so the loop safely runs zero times.',
        ifDeletedError: 'Row loop fails to execute.',
      },
      {
        lineNumber: 'Line 9',
        codeSnippet: 'let row: Vec<String> = (1..=r).map(|c| c.to_string()).collect();',
        whatItMeans: 'Zero-cost iterator chain building strings for `1..=r`.',
        whyItIsThere: 'Prepares tokens so `.join(" ")` outputs zero trailing whitespace.',
        ifDeletedError: '`row` is undefined when printing.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'n = 3; enter 1..=3', memoryOrStack: 'n=3, r=1', note: 'Range inclusive of 3' },
      { step: 2, state: 'r = 1 -> collect ["1"]', memoryOrStack: 'row=["1"]', note: 'Prints "1"' },
      { step: 3, state: 'r = 2 -> collect ["1", "2"]', memoryOrStack: 'row=["1","2"]', note: 'Prints "1 2"' },
      { step: 4, state: 'r = 3 -> collect ["1", "2", "3"]', memoryOrStack: 'row=["1","2","3"]', note: 'Prints "1 2 3"' },
      { step: 5, state: 'Iterator exhausted', memoryOrStack: 'Heap Vec dropped', note: 'RAII frees row buffers cleanly' },
    ],
    harryBugTraps: [
      {
        title: 'Using Exclusive `1..n` When You Meant `1..=n`',
        brokenCode: `let sum: i64 = (1..n).sum();`,
        fixedCode: `let sum: i64 = (1..=n).sum();`,
        whyItBreaks: '`1..n` stops at `n - 1`, leaving you off by `n`!',
      },
      {
        title: 'Manual `usize` Decrement Underflow Panic',
        brokenCode: `let mut i = n;\nwhile i >= 0 { i -= 1; }`,
        fixedCode: `for i in (0..=n).rev() { /* safe! */ }`,
        whyItBreaks: '`usize >= 0` is always true, and `0usize - 1` panics immediately in debug mode!',
      },
      {
        title: 'Overflowing `i32` on Large Loop Sums',
        brokenCode: `let sum: i32 = (1..=100_000).sum();`,
        fixedCode: `let sum: i64 = (1..=100_000i64).sum();`,
        whyItBreaks: 'Sum is `5,000,050,000`, which exceeds `i32::MAX` (`2,147,483,647`) and panics!',
      },
    ],
    practiceSheet: [
      {
        id: 'rust-ch-4-q1',
        difficulty: 'Easy',
        title: 'Sum of Odd Numbers With .step_by(2)',
        prompt: 'Read n and print the sum of all odd numbers in `1..=n` using `.step_by(2)`.',
        banglaHint: '`(1..=n).step_by(2).sum::<i64>()` ব্যবহার করো।',
        starterCode: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n    let n: i64 = s.trim().parse().unwrap_or(0);\n    let ans: i64 = (1..=n).step_by(2).sum();\n    println!("{}", ans);\n}`,
        sampleStdin: '9',
        expectedOutput: '25',
      },
      {
        id: 'rust-ch-4-q2',
        difficulty: 'Easy',
        title: 'Reverse Digits With while',
        prompt: 'Read positive integer n and reverse its decimal digits.',
        banglaHint: '`while n > 0 { rev = rev * 10 + n % 10; n /= 10; }`।',
        starterCode: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n    let mut n: i64 = s.trim().parse().unwrap_or(0);\n    let mut rev = 0;\n    while n > 0 { rev = rev * 10 + (n % 10); n /= 10; }\n    println!("{}", rev);\n}`,
        sampleStdin: '12340',
        expectedOutput: '4321',
      },
      {
        id: 'rust-ch-4-q3',
        difficulty: 'Medium',
        title: 'Centered Star Pyramid',
        prompt: 'Read n and print an n-row centered `*` pyramid using `" ".repeat()` and `"*".repeat()`.',
        banglaHint: '`println!("{}{}", " ".repeat(n - r), "*".repeat(2 * r - 1))`।',
        starterCode: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n    let n: usize = s.trim().parse().unwrap_or(0);\n    for r in 1..=n {\n        println!("{}{}", " ".repeat(n - r), "*".repeat(2 * r - 1));\n    }\n}`,
        sampleStdin: '3',
        expectedOutput: '  *\n ***\n*****',
      },
      {
        id: 'rust-ch-4-q4',
        difficulty: 'Medium',
        title: 'O(sqrt(n)) Divisor Counter',
        prompt: 'Read n and count its positive divisors using `while d * d <= n`.',
        banglaHint: '`d * d == n` হলে ১ যোগ করো, নইলে ২।',
        starterCode: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n    let n: u64 = s.trim().parse().unwrap_or(0);\n    let (mut d, mut cnt) = (1u64, 0u64);\n    while d * d <= n {\n        if n % d == 0 { cnt += if d * d == n { 1 } else { 2 }; }\n        d += 1;\n    }\n    println!("{}", cnt);\n}`,
        sampleStdin: '36',
        expectedOutput: '9',
      },
      {
        id: 'rust-ch-4-q5',
        difficulty: 'Hard',
        title: 'Kadane Maximum Subarray Sum in O(n)',
        prompt: 'Read n and n i64 numbers; compute max contiguous subarray sum in O(n).',
        banglaHint: '`cur = x.max(cur + x)` এবং `best = best.max(cur)` ব্যবহার করো।',
        starterCode: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n    let nums: Vec<i64> = s.split_whitespace().filter_map(|t| t.parse().ok()).collect();\n    if nums.len() > 1 {\n        let n = nums[0] as usize;\n        let mut cur = nums[1];\n        let mut best = nums[1];\n        for &x in &nums[2..=n] {\n            cur = x.max(cur + x);\n            best = best.max(cur);\n        }\n        println!("{}", best);\n    }\n}`,
        sampleStdin: '6\n-2 1 -3 4 -1 2',
        expectedOutput: '5',
      },
    ],
    miniBuild: {
      title: 'Rust 2024 Mini Build: Sieve & Iterator Prime Counter',
      description: 'Combines Ch 1–4 with a mutable Vec<bool> sieve and zero-cost `.filter().count()`.',
      banglaGoal: 'Rust ভেক্টর সিভ ও ইটারেটর চেইন ব্যবহার করে প্রাইম গণনা করা।',
      combinesChapters: 'Ch 1–4',
      starterCode: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n    let n: usize = s.trim().parse().unwrap_or(0);\n    if n < 2 { println!("count=0"); return; }\n    let mut prime = vec![true; n + 1];\n    prime[0] = false; prime[1] = false;\n    let mut p = 2;\n    while p * p <= n {\n        if prime[p] {\n            for m in (p * p..=n).step_by(p) { prime[m] = false; }\n        }\n        p += 1;\n    }\n    let cnt = prime.iter().filter(|&&v| v).count();\n    println!("count={}", cnt);\n}`,
      sampleStdin: '30',
      expectedOutput: 'count=10',
    },
  },
  typescript: {
    title: 'TypeScript Chapter 4 (TS 5.x): Typed Loops, Generators & Big-O Audits',
    banglaTitle: 'TypeScript অধ্যায় ৪ (TS 5.x): টাইপড লুপ, জেনারেটর ও কমপ্লেক্সিটি',
    subtitle: 'Master strict typed loops, Iterable<T>, ReadonlyArray iteration, and O(n) Map/Set patterns without any.',
    zeroIntuition: {
      plainEnglishStory:
        'TypeScript adds compile-time safety to loops so you never confuse an array index (`number`) with a domain value or mutate a `readonly` array during iteration. Combined with Big-O discipline (`Set`/`Map` instead of nested `.find()`), your TypeScript loops remain both type-safe and O(n) fast.',
      asciiFlowchart: `    ( START: Typed Input n: number )
                  |
                  v
    [ Build Readonly / Typed Row Buffer ]
                  |
                  v
    +--> [ r: number = 1..n ] --(done)--> [ Emit Output ]
    |            |
    +---[ Type-safe transformation ]`,
      pseudocode: [
        '1. PARSE stdin with explicit `number` / `bigint` types',
        '2. GUARD invalid / negative inputs via early return',
        '3. ITERATE using `for (const item of items)` over `readonly T[]`',
        '4. USE `Map<number, number>` or `Set<number>` for O(1) lookups inside loops',
        '5. EMIT joined lines cleanly',
      ],
      banglaZeroToHero: {
        analogyTitle: 'টাইপ-চেকড লুপ ও কনস্ট্যান্ট-টাইম ডিকশনারি (TS Loops)',
        explanation:
          'TypeScript লুপ চালানোর আগেই নিশ্চিত করে তোমার ডেটার ধরন সঠিক কি না! আর লুপের ভেতর `arr.find()` ব্যবহার করা মানেই গোপন `O(n^2)` ফাঁদ—তাই সবসময় `Map<K, V>` বা `Set<T>` ব্যবহার করে `O(n)` স্পিড ধরে রাখতে হবে।',
        everydayExample:
          'একটি ইনভেন্টরিতে বারবার কাগজের খাতা না খুঁজে কোড-স্ক্যানার (`Map.get`) দিয়ে ১ সেকেন্ডেই তথ্য বের করা।',
        keyTakeaways: [
          'অ্যারে পরিবর্তন না করার জন্য প্যারামিটারে `readonly number[]` ব্যবহার করলে লুপের ভেতর দুর্ঘটনাবশত মিউটেশন হবে না।',
          '`for (const [idx, val] of arr.entries())` দিলে ইনডেক্স ও মান দুটোই টাইপ-সেফভাবে পাওয়া যায়।',
          '৫৩-বিটের বড় পূর্ণসংখ্যায় `bigint` টাইপ ব্যবহার করো।',
        ],
      },
    },
    codeExamples: [
      {
        id: 'ts-4-ex-basic',
        tier: 'Basic',
        title: '1. Basic: Typed Number Triangle Pattern',
        banglaNote: 'string[] বাফার ও Array.from ব্যবহার করে পরিষ্কার টাইপ-সেফ ত্রিভুজ।',
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw: string = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const n: number = Number(raw.trim() || 0);

const lines: string[] = [];
for (let r = 1; r <= n; r++) {
  const row: number[] = Array.from({ length: r }, (_, i) => i + 1);
  lines.push(row.join(' '));
}
console.log(lines.join('\\n'));`,
        stdin: '4',
        expectedOutput: '1\n1 2\n1 2 3\n1 2 3 4',
      },
      {
        id: 'ts-4-ex-edge',
        tier: 'Edge-Case',
        title: '2. Edge-Case: Zero / NaN Guard & do-while Digit Counter',
        banglaNote: 'NaN ও ০ গার্ডসহ নির্ভুল ডিজিট কাউন্টার।',
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw: string = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const parsed: number = Number(raw.trim());

if (!raw.trim() || Number.isNaN(parsed)) {
  console.log('INVALID');
} else {
  let x: number = Math.abs(Math.trunc(parsed));
  let digits = 0;
  do {
    digits++;
    x = Math.floor(x / 10);
  } while (x > 0);
  console.log(\`digits=\${digits}\`);
}`,
        stdin: '0',
        expectedOutput: 'digits=1',
      },
      {
        id: 'ts-4-ex-opt',
        tier: 'Optimized',
        title: '3. Optimized: O(n) Typed Set<number> Duplicate Counter',
        banglaNote: 'readonly number[] ও Set<number> দিয়ে O(n) ডুপ্লিকেট নির্ণয়।',
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw: string = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const nums: readonly number[] = raw.trim().split(/\\s+/).map(Number);

const n: number = nums[0] ?? 0;
const seen = new Set<number>();
let dups = 0;
for (let i = 1; i <= n; i++) {
  const val = nums[i];
  if (seen.has(val)) dups++;
  seen.add(val);
}
console.log(dups);`,
        stdin: '6\n4 2 4 5 2 9',
        expectedOutput: '2',
      },
      {
        id: 'ts-4-ex-cp',
        tier: 'CP Trick',
        title: '4. CP Trick: Typed bigint O(1) Arithmetic Progression',
        banglaNote: 'bigint টাইপ দিয়ে ১ বিলিয়ন পর্যন্ত যোগফলের কোনো প্রিসিশন লস হবে না।',
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw: string = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const n: bigint = BigInt(raw.trim() || '0');

const total: bigint = n > 0n ? (n * (n + 1n)) / 2n : 0n;
console.log(total.toString());`,
        stdin: '1000000000',
        expectedOutput: '500000000500000000',
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 5',
        codeSnippet: 'const lines: string[] = [];',
        whatItMeans: 'Explicitly typed array of output lines.',
        whyItIsThere: 'Prevents accidental pushing of non-string values and buffers stdout.',
        ifDeletedError: 'Compile error: `Cannot find name "lines"`.',
      },
      {
        lineNumber: 'Line 6',
        codeSnippet: 'for (let r = 1; r <= n; r++) {',
        whatItMeans: 'Typed loop counter `r: number` from 1 through n.',
        whyItIsThere: 'Drives each line of the triangle cleanly.',
        ifDeletedError: '`r` is undefined.',
      },
      {
        lineNumber: 'Line 7',
        codeSnippet: 'const row: number[] = Array.from({ length: r }, (_, i) => i + 1);',
        whatItMeans: 'Constructs a strongly typed `number[]` slice `[1..r]`.',
        whyItIsThere: 'Ensures `.join(" ")` formats numbers deterministically.',
        ifDeletedError: '`row` becomes undefined.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'n = 3; lines: string[] = []', memoryOrStack: 'lines=[]', note: 'Type checked as string[]' },
      { step: 2, state: 'r = 1 -> row = [1]', memoryOrStack: 'lines=["1"]', note: 'Array.from maps index 0 -> 1' },
      { step: 3, state: 'r = 2 -> row = [1, 2]', memoryOrStack: 'lines=["1","1 2"]', note: 'Joined cleanly' },
      { step: 4, state: 'r = 3 -> row = [1, 2, 3]', memoryOrStack: 'lines=["1","1 2","1 2 3"]', note: 'Buffered' },
      { step: 5, state: 'console.log(lines.join("\\n"))', memoryOrStack: 'Single emit', note: 'Complete' },
    ],
    harryBugTraps: [
      {
        title: 'Using `for..in` on an Array Expecting Numeric Values',
        brokenCode: `for (const x in [10, 20]) console.log(typeof x);`,
        fixedCode: `for (const x of [10, 20]) console.log(typeof x);`,
        whyItBreaks: '`for..in` yields string property keys (`"0"`, `"1"`), not numeric array elements!',
      },
      {
        title: 'Calling `.find()` or `.includes()` Inside a Loop',
        brokenCode: `for (const x of listA) { if (listB.includes(x)) hits++; }`,
        fixedCode: `const setB = new Set<number>(listB);\nfor (const x of listA) { if (setB.has(x)) hits++; }`,
        whyItBreaks: 'Turns an O(n) check into O(n^2), timing out on 10^5 arrays.',
      },
      {
        title: 'Mixing `number` and `bigint` in Loop Math',
        brokenCode: `let sum: bigint = 0n;\nfor (let i = 1; i <= 5; i++) sum += i;`,
        fixedCode: `let sum: bigint = 0n;\nfor (let i = 1n; i <= 5n; i++) sum += i;`,
        whyItBreaks: 'TypeScript forbids adding `number` and `bigint` (`TS2365`).',
      },
    ],
    practiceSheet: [
      {
        id: 'ts-ch-4-q1',
        difficulty: 'Easy',
        title: 'Typed Even Loop 2..N',
        prompt: 'Read n and output all even numbers from 2 to n separated by a space.',
        banglaHint: '`const evens: number[] = []` এ `i += 2` করে পুশ করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw: string = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst n: number = Number(raw.trim() || 0);\nconst evens: number[] = [];\nfor (let i = 2; i <= n; i += 2) evens.push(i);\nconsole.log(evens.join(' '));`,
        sampleStdin: '8',
        expectedOutput: '2 4 6 8',
      },
      {
        id: 'ts-ch-4-q2',
        difficulty: 'Easy',
        title: 'Index-Weighted Sum via .entries()',
        prompt: 'Read n and n numbers; print `sum((i + 1) * val)` using `.entries()`.',
        banglaHint: '`for (const [idx, val] of arr.entries())` ব্যবহার করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw: string = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst vals: number[] = raw.trim().split(/\\s+/).map(Number);\nconst arr: readonly number[] = vals.slice(1, 1 + (vals[0] ?? 0));\nlet ans = 0;\nfor (const [idx, val] of arr.entries()) ans += (idx + 1) * val;\nconsole.log(ans);`,
        sampleStdin: '3\n10 20 30',
        expectedOutput: '140',
      },
      {
        id: 'ts-ch-4-q3',
        difficulty: 'Medium',
        title: 'Centered Star Pyramid',
        prompt: 'Read n and build an n-row centered `*` pyramid.',
        banglaHint: "`' '.repeat(n - r) + '*'.repeat(2 * r - 1)` দিয়ে প্রতিটি সারি পুশ করো।",
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw: string = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst n: number = Number(raw.trim() || 0);\nconst rows: string[] = [];\nfor (let r = 1; r <= n; r++) rows.push(' '.repeat(n - r) + '*'.repeat(2 * r - 1));\nconsole.log(rows.join('\\n'));`,
        sampleStdin: '3',
        expectedOutput: '  *\n ***\n*****',
      },
      {
        id: 'ts-ch-4-q4',
        difficulty: 'Medium',
        title: 'O(sqrt(n)) Divisor Counter',
        prompt: 'Read n and count positive divisors in O(sqrt(n)).',
        banglaHint: '`d * d <= n` শর্তে `d` ও `n / d` গণনা করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw: string = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst n: number = Number(raw.trim() || 0);\nlet cnt = 0;\nfor (let d = 1; d * d <= n; d++) if (n % d === 0) cnt += d * d === n ? 1 : 2;\nconsole.log(cnt);`,
        sampleStdin: '36',
        expectedOutput: '9',
      },
      {
        id: 'ts-ch-4-q5',
        difficulty: 'Hard',
        title: 'Typed Kadane Maximum Subarray O(n)',
        prompt: 'Read n and n numbers; return max contiguous subarray sum in O(n).',
        banglaHint: '`cur` এবং `best` দুটি `number` ভ্যারিয়েবল নিয়ে একটি লুপেই সমাধান করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw: string = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst vals: number[] = raw.trim().split(/\\s+/).map(Number);\nconst n: number = vals[0] ?? 0;\nlet cur: number = vals[1], best: number = vals[1];\nfor (let i = 2; i <= n; i++) { cur = Math.max(vals[i], cur + vals[i]); best = Math.max(best, cur); }\nconsole.log(best);`,
        sampleStdin: '6\n-2 1 -3 4 -1 2',
        expectedOutput: '5',
      },
    ],
    miniBuild: {
      title: 'TypeScript 5.x Mini Build: Typed Prefix Sum Query Engine',
      description: 'Combines Ch 1–4 by building a typed prefix array in O(n) and answering O(1) range sums.',
      banglaGoal: 'টাইপড প্রিফিক্স সাম অ্যারে বানিয়ে একাধিক রেঞ্জ যোগফল O(1) সময়ে বের করা।',
      combinesChapters: 'Ch 1–4',
      starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw: string = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst t: number[] = raw.trim().split(/\\s+/).map(Number);\nconst n = t[0] ?? 0;\nconst pref: number[] = new Array(n + 1).fill(0);\nfor (let i = 1; i <= n; i++) pref[i] = pref[i - 1] + t[i];\nconst q = t[n + 1] ?? 0;\nconst out: number[] = [];\nfor (let k = 0; k < q; k++) {\n  const l = t[n + 2 + 2 * k], r = t[n + 3 + 2 * k];\n  out.push(pref[r] - pref[l - 1]);\n}\nconsole.log(out.join('\\n'));`,
      sampleStdin: '5\n2 4 6 8 10\n2\n1 3\n2 5',
      expectedOutput: '12\n28',
    },
  },
  html: {
    title: 'HTML5 Chapter 4: Repeating Lists, CSS Counters & O(n) DOM Rendering',
    banglaTitle: 'HTML5 অধ্যায় ৪: রিপিটিং লিস্ট, CSS কাউন্টার ও O(n) DOM রেন্ডারিং',
    subtitle: 'Master semantic <ol>/<ul>/<table> iteration patterns, CSS counter-increment, DocumentFragment O(n) batching vs O(n^2) reflows.',
    zeroIntuition: {
      plainEnglishStory:
        'HTML itself is declarative—it describes repeating items using `<ol>`, `<ul>`, and `<table>` rows. When JavaScript generates repeating HTML in a loop, mutating `container.innerHTML += ...` inside a loop forces the browser to re-parse the entire DOM every step—an O(n^2) Layout Thrash! Using `DocumentFragment` or `Array.join("")` keeps DOM rendering strictly O(n).',
      asciiFlowchart: `    ( START: Generate N rows )
                 |
                 v
    [ Create DocumentFragment (off-screen) ]
                 |
                 v
    +--> [ Loop r = 1..n ] --(done)--> [ Single appendChild(frag) -> 1 Reflow! ]
    |          |
    +---[ Append <li> / <tr> to fragment ]`,
      pseudocode: [
        '1. DECLARE semantic container (<ol>, <ul>, or <table>)',
        '2. USE CSS `counter-reset` / `counter-increment` for pure CSS numbering',
        '3. BATCH dynamic DOM insertions inside `DocumentFragment` or single `join("")`',
        '4. AVOID `el.innerHTML += ...` inside a loop (O(n^2) re-parsing trap)',
      ],
      banglaZeroToHero: {
        analogyTitle: 'রুম সাজিয়ে একসাথে পর্দা খোলা (DocumentFragment বনাম বারবার Reflow)',
        explanation:
          'কল্পনা করো তুমি একটি টেবিলে ১০০টি প্লেট সাজাবে। প্রতিবার ১টি করে প্লেট রেখে যদি অতিথিদের ডাকো (innerHTML +=), তবে ১০০ বার ঘর গোছাতে হবে (`O(n^2)`)! তার বদলে ট্রেতে (`DocumentFragment`) ১০০টি প্লেট একসাথে সাজিয়ে একবারেই টেবিলে রাখলে কাজটি মুহূর্তে `O(n)`-এ শেষ হয়!',
        everydayExample:
          'ই-কমার্স সাইটে ১০০০টি প্রোডাক্ট কার্ড দেখাতে একসাথে ফ্র্যাগমেন্ট বা একটি সিঙ্গেল স্ট্রিং দিয়ে রেন্ডার করলে পেজ ল্যাগ করে না।',
        keyTakeaways: [
          'লুপের ভেতর কখনো `container.innerHTML += "..."` লিখবে না—এতে ব্রাউজার প্রতিবার পুরো DOM ভেঙে নতুন করে গড়ে।',
          'CSS `counter-reset` ও `counter-increment` দিয়ে কোনো JS ছাড়াই ডাইনামিক স্টেপ নাম্বার তৈরি করা যায়।',
          'ক্রমিক তথ্যের জন্য `<ol>`, তালিকা বা মেনুর জন্য `<ul>`, আর গ্রিড/ম্যাট্রিক্স ডেটার জন্য `<table>` ব্যবহার করো।',
        ],
      },
    },
    codeExamples: [
      {
        id: 'html-4-ex-basic',
        tier: 'Basic',
        title: '1. Basic: Semantic Ordered List & CSS Counter Steps',
        banglaNote: 'কোনো JavaScript ছাড়াই CSS counter-increment দিয়ে স্বয়ংক্রিয় ধাপের নাম্বারিং।',
        code: `<!doctype html>
<html lang="en">
<head>
  <style>
    body { font-family: system-ui, sans-serif; background: #0f172a; color: #e2e8f0; padding: 16px; }
    ol.steps { counter-reset: step; list-style: none; padding: 0; }
    ol.steps li { counter-increment: step; padding: 8px 12px; margin-bottom: 6px; background: #1e293b; border-radius: 6px; }
    ol.steps li::before { content: "Step " counter(step) ": "; color: #38bdf8; font-weight: 700; }
  </style>
</head>
<body>
  <ol class="steps">
    <li>Initialize Counter</li>
    <li>Check Loop Guard</li>
    <li>Increment State</li>
  </ol>
</body>
</html>`,
        stdin: '',
        expectedOutput: 'Step 1: Initialize Counter',
      },
      {
        id: 'html-4-ex-edge',
        tier: 'Edge-Case',
        title: '2. Edge-Case: CSS :empty Fallback State When List Has 0 Items',
        banglaNote: 'লুপের ডেটা ০ হলে ইউজার যেন ফাঁকা পর্দা না দেখে, সেজন্য :empty স্টেট গার্ড।',
        code: `<!doctype html>
<html lang="en">
<head>
  <style>
    body { font-family: system-ui, sans-serif; background: #0f172a; color: #e2e8f0; padding: 16px; }
    ul:empty::after { content: "No items generated (n = 0 guard active)"; display: block; padding: 12px; border: 1px dashed #475569; border-radius: 8px; color: #94a3b8; }
  </style>
</head>
<body>
  <ul id="grid"></ul>
</body>
</html>`,
        stdin: '',
        expectedOutput: 'No items generated',
      },
      {
        id: 'html-4-ex-opt',
        tier: 'Optimized',
        title: '3. Optimized: O(n) DocumentFragment Batch Pyramid',
        banglaNote: 'লুপে বারবার appendChild না করে DocumentFragment-এ জমিয়ে একবারেই DOM-এ যুক্ত করা।',
        code: `<!doctype html>
<html lang="en">
<body style="font-family:monospace;background:#0f172a;color:#38bdf8;padding:16px">
  <pre id="pyramid"></pre>
  <script>
    const frag = document.createDocumentFragment();
    for (let r = 1; r <= 4; r++) {
      const line = document.createTextNode(Array.from({ length: r }, (_, i) => i + 1).join(' ') + '\\n');
      frag.appendChild(line);
    }
    document.getElementById('pyramid').appendChild(frag);
  </script>
</body>
</html>`,
        stdin: '',
        expectedOutput: '1\n1 2\n1 2 3\n1 2 3 4',
      },
      {
        id: 'html-4-ex-cp',
        tier: 'CP Trick',
        title: '4. CP Trick: CSS nth-child(even) Zebra Matrix Without JS Loops',
        banglaNote: 'JavaScript ছাড়াই CSS :nth-child(even) দিয়ে O(1) স্টাইলে সারির রঙ আলাদা করা।',
        code: `<!doctype html>
<html lang="en">
<head>
  <style>
    body { font-family: system-ui, sans-serif; background: #0f172a; color: #e2e8f0; padding: 16px; }
    table { border-collapse: collapse; width: 100%; }
    td, th { border: 1px solid #334155; padding: 6px 10px; text-align: left; }
    tbody tr:nth-child(even) { background: #1e293b; }
  </style>
</head>
<body>
  <table>
    <thead><tr><th>n</th><th>O(n)</th><th>O(n^2)</th></tr></thead>
    <tbody>
      <tr><td>100</td><td>100</td><td>10,000</td></tr>
      <tr><td>100,000</td><td>10^5 (1ms)</td><td>10^10 (TLE)</td></tr>
    </tbody>
  </table>
</body>
</html>`,
        stdin: '',
        expectedOutput: '10^5 (1ms)',
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 5',
        codeSnippet: 'ol.steps { counter-reset: step; list-style: none; padding: 0; }',
        whatItMeans: 'Initializes a CSS counter named `step` to 0 on the `<ol>` parent.',
        whyItIsThere: 'Allows custom styled step prefixes without JavaScript.',
        ifDeletedError: '`counter(step)` remains 0 on every row.',
      },
      {
        lineNumber: 'Line 6',
        codeSnippet: 'ol.steps li { counter-increment: step; ... }',
        whatItMeans: 'Increments `step` by 1 for each list item automatically.',
        whyItIsThere: 'Maintains exact 1..N ordering purely in CSS layout.',
        ifDeletedError: 'All items render as "Step 0:".',
      },
      {
        lineNumber: 'Line 7',
        codeSnippet: 'ol.steps li::before { content: "Step " counter(step) ": "; ... }',
        whatItMeans: 'Injects the formatted counter prefix before each item.',
        whyItIsThere: 'Keeps DOM text clean while rendering step badges visually.',
        ifDeletedError: 'Step numbers disappear from view.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'Parse <ol class="steps">', memoryOrStack: 'counter step = 0', note: 'Reset at parent boundary' },
      { step: 2, state: 'Render 1st <li>', memoryOrStack: 'step = 1', note: '::before outputs "Step 1: "' },
      { step: 3, state: 'Render 2nd <li>', memoryOrStack: 'step = 2', note: '::before outputs "Step 2: "' },
      { step: 4, state: 'Render 3rd <li>', memoryOrStack: 'step = 3', note: '::before outputs "Step 3: "' },
    ],
    harryBugTraps: [
      {
        title: 'Using container.innerHTML += Inside a Loop',
        brokenCode: `for (let i = 0; i < 5000; i++) list.innerHTML += \`<li>\${i}</li>\`;`,
        fixedCode: `list.innerHTML = Array.from({ length: 5000 }, (_, i) => \`<li>\${i}</li>\`).join('');`,
        whyItBreaks: 'Re-parses and destroys the entire child DOM on every iteration—O(n^2) layout thrashing!',
      },
      {
        title: 'Forgetting counter-reset on Parent Container',
        brokenCode: `li { counter-increment: step; }`,
        fixedCode: `ol { counter-reset: step; }\nli { counter-increment: step; }`,
        whyItBreaks: 'Multiple lists on the same page leak counts across sections.',
      },
      {
        title: 'Using Div Soup Instead of Semantic <ul>/<ol>/<table>',
        brokenCode: `<div><div>1. Step A</div><div>2. Step B</div></div>`,
        fixedCode: `<ol><li>Step A</li><li>Step B</li></ol>`,
        whyItBreaks: 'Screen readers lose item count announcements and keyboard list navigation.',
      },
    ],
    practiceSheet: [
      {
        id: 'html-ch-4-q1',
        difficulty: 'Easy',
        title: 'Ordered Checklist With CSS Counter',
        prompt: 'Build an `<ol>` list of 3 loop phases styled with CSS `counter-reset`.',
        banglaHint: '`counter-reset` ও `counter-increment` দিয়ে লুপের ৩টি ধাপ দেখাও।',
        starterCode: `<!doctype html>\n<html><body style="font-family:sans-serif;background:#0f172a;color:#f8fafc;padding:16px">\n<ol><li>Init</li><li>Condition</li><li>Update</li></ol>\n</body></html>`,
        sampleStdin: '',
        expectedOutput: '<ol><li>Init</li>',
      },
      {
        id: 'html-ch-4-q2',
        difficulty: 'Easy',
        title: 'Zebra-Striped Complexity Table',
        prompt: 'Render a `<table>` comparing O(1), O(n), and O(n^2) with `tr:nth-child(even)`.',
        banglaHint: '`<tbody>`-এর ভেতর সারি দিয়ে `nth-child(even)` স্টাইল যোগ করো।',
        starterCode: `<!doctype html>\n<html><head><style>tr:nth-child(even){background:#1e293b}</style></head>\n<body style="background:#0f172a;color:#e2e8f0;font-family:sans-serif">\n<table><tbody><tr><td>O(1)</td><td>Instant</td></tr><tr><td>O(n)</td><td>Linear</td></tr></tbody></table>\n</body></html>`,
        sampleStdin: '',
        expectedOutput: 'O(n)',
      },
      {
        id: 'html-ch-4-q3',
        difficulty: 'Medium',
        title: 'Batch Render 1..10 With DocumentFragment',
        prompt: 'Use `document.createDocumentFragment()` to append 10 `<li>` items in a single DOM mutation.',
        banglaHint: 'ফ্র্যাগমেন্টের ভেতর ১০টি `<li>` বানিয়ে শেষে একবার `appendChild` করো।',
        starterCode: `<!doctype html>\n<html><body style="background:#0f172a;color:#38bdf8;font-family:sans-serif">\n<ul id="items"></ul>\n<script>\nconst f = document.createDocumentFragment();\nfor (let i = 1; i <= 10; i++) { const li = document.createElement('li'); li.textContent = 'Row ' + i; f.appendChild(li); }\ndocument.getElementById('items').appendChild(f);\n</script>\n</body></html>`,
        sampleStdin: '',
        expectedOutput: 'Row 10',
      },
      {
        id: 'html-ch-4-q4',
        difficulty: 'Medium',
        title: 'Empty-State Fallback List',
        prompt: 'Add a CSS `:empty::after` rule so an empty `<ul>` displays a clean message.',
        banglaHint: '`ul:empty::after { content: "Empty"; }` ব্যবহার করো।',
        starterCode: `<!doctype html>\n<html><head><style>ul:empty::after{content:"Empty list";color:#94a3b8}</style></head>\n<body style="background:#0f172a;padding:16px"><ul></ul></body></html>`,
        sampleStdin: '',
        expectedOutput: 'Empty list',
      },
      {
        id: 'html-ch-4-q5',
        difficulty: 'Hard',
        title: 'Interactive Pattern Generator Grid',
        prompt: 'Combine `<input type="number">` + `<pre>` + O(n) `Array.join()` to render a live star pyramid.',
        banglaHint: 'ইনপুট মান পরিবর্তন হলে `lines.join("\\n")` দিয়ে সাথে সাথে `<pre>` আপডেট করো।',
        starterCode: `<!doctype html>\n<html><body style="background:#0f172a;color:#e2e8f0;font-family:monospace;padding:16px">\n<input id="n" type="number" value="4" min="1" max="10" />\n<pre id="out"></pre>\n<script>\nfunction draw(){ const n=+document.getElementById('n').value; document.getElementById('out').textContent=Array.from({length:n},(_,i)=>'*'.repeat(i+1)).join('\\n'); }\ndocument.getElementById('n').addEventListener('input', draw); draw();\n</script></body></html>`,
        sampleStdin: '',
        expectedOutput: '****',
      },
    ],
    miniBuild: {
      title: 'HTML5 Mini Build: Live Complexity & Pyramid Visualizer',
      description: 'Combines Ch 1–4 semantic layout, inputs, CSS table striping, and O(n) DocumentFragment rendering.',
      banglaGoal: 'সেমান্টিক ইনপুট ও O(n) বাফারিং দিয়ে লাইভ প্যাটার্ন জেনারেটর তৈরি করা।',
      combinesChapters: 'Ch 1–4',
      starterCode: `<!doctype html>\n<html lang="en">\n<body style="font-family:system-ui,sans-serif;background:#090d16;color:#f8fafc;padding:20px">\n  <h2>Loop & Pattern Visualizer</h2>\n  <label>Rows: <input id="rows" type="number" value="4" min="1" max="12" /></label>\n  <pre id="pyr" style="color:#22d3ee;margin-top:12px"></pre>\n  <script>\n    const inp = document.getElementById('rows');\n    const pyr = document.getElementById('pyr');\n    function render() {\n      const n = Math.max(0, Math.min(12, Number(inp.value) || 0));\n      const lines = [];\n      for (let r = 1; r <= n; r++) lines.push(' '.repeat(n - r) + '*'.repeat(2 * r - 1));\n      pyr.textContent = lines.join('\\n');\n    }\n    inp.addEventListener('input', render);\n    render();\n  </script>\n</body>\n</html>`,
      sampleStdin: '',
      expectedOutput: 'Loop & Pattern Visualizer',
    },
  },
};
