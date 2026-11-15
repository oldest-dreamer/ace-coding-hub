import type { DeepChapterContent } from './deepChapter1';
import type { LanguageId } from '../types/academy';

export const DEEP_CHAPTER_2: Record<LanguageId, DeepChapterContent> = {
  c: {
    title: 'C Chapter 2: Variables, Data Types, RAM Sizes & 64-bit Overflow',
    banglaTitle: 'C অধ্যায় ২: ভ্যারিয়েবল, ডেটা টাইপ ও ওভারফ্লো থেকে বাঁচার উপায়',
    subtitle: 'Master int vs long long, sizeof(), signed 32-bit limits (2.14e9), and why 100,000 * 100,000 crashes int.',
    zeroIntuition: {
      plainEnglishStory:
        'Every time your program needs to remember something—like a player’s score or two numbers to multiply—it rents a labeled box in RAM called a Variable. In C, you must tell the compiler the exact size of the box up front: `int` rents a 4-byte box (max ~2.14 billion), while `long long` rents an 8-byte box (max ~9 quintillion).',
      asciiFlowchart: `      ( START )
          |
          v
  [ Allocate 8-byte boxes: long long a, b ]
          |
          v
  [ Input a = 100000, b = 100000 ]
          |
          v
  [ Multiply: prod = a * b = 10,000,000,000 ]  <-- Fits in 64-bit, OVERFLOWS 32-bit int!
          |
          v
  [ Print "%lld", prod ] --> ( STOP )`,
      pseudocode: [
        '1. DECLARE 64-bit variables a and b (long long)',
        '2. READ a and b using %lld',
        '3. COMPUTE product = a * b in 64-bit registers',
        '4. PRINT product using %lld',
      ],
      banglaZeroToHero: {
        analogyTitle: 'টিফিন বক্সের সাইজ: ছোট বক্স (int) বনাম বড় বক্স (long long)',
        explanation:
          'ভ্যারিয়েবল হলো RAM-এর ভেতর নাম লেখা টিফিন বক্স! তুমি যদি ৪টা রুটির ছোট টিফিন বক্সে (32-bit int) জোর করে ১০টা পরোটা ঢোকাতে চাও, বক্স ফেটে খাবার পড়ে যাবে—একেই বলে Integer Overflow! ১ লক্ষ × ১ লক্ষ = ১ হাজার কোটি (10^10), যা ৩২-বিট বক্সের ধারণক্ষমতা ২.১৪ × ১০^৯ এর চেয়ে অনেক বড়। তাই এখানে ৬৪-বিট বড় বক্স (long long) নিতে হয়।',
        everydayExample:
          'স্কুলের টিফিন বক্সে ভাত না ধরলে যেমন বড় হটপট লাগে, তেমনি বড় সংখ্যার গুণফলে int-এর বদলে long long লাগে।',
        keyTakeaways: [
          'int মানে ৪ বাইট (~২×১০^৯ পর্যন্ত); long long মানে ৮ বাইট (~৯×১০^১৮ পর্যন্ত)।',
          'কনটেস্টে দুইটি ১০^৫ বা ১০^৯ সংখ্যা গুণ করার আগেই long long ব্যবহার করবে।',
          'char (১ বাইট), float (৪ বাইট), double (৮ বাইট দশমিক)।',
        ],
      },
    },
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 4',
        codeSnippet: 'long long a = 0, b = 0;',
        whatItMeans: 'Allocates two 64-bit signed integer slots initialized to 0.',
        whyItIsThere: 'Prevents garbage memory values and holds products up to 9 × 10^18.',
        ifDeletedError: 'Using `int a, b` overflows silently on 100000 * 100000 and prints 1410065408!',
      },
      {
        lineNumber: 'Line 5',
        codeSnippet: 'scanf("%lld %lld", &a, &b);',
        whatItMeans: 'Reads 64-bit integers (`lld` = long long decimal) into the RAM addresses of a and b.',
        whyItIsThere: '%d only writes 4 bytes, leaving the upper 4 bytes of long long corrupted.',
        ifDeletedError: 'Using %d with long long causes Undefined Behavior / wrong numbers.',
      },
      {
        lineNumber: 'Line 6',
        codeSnippet: 'printf("%lld\\n", a * b);',
        whatItMeans: 'Multiplies a and b in 64-bit mode and prints the 10^10 result cleanly.',
        whyItIsThere: 'Both operands are already long long, so multiplication does not truncate.',
        ifDeletedError: 'Missing \\n merges output lines on automated judges.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'Init long long a=0, b=0', memoryOrStack: 'a: 8B, b: 8B on Stack', note: '16 bytes total reserved' },
      { step: 2, state: 'scanf 100000 100000', memoryOrStack: 'a=100000, b=100000', note: 'Stored safely' },
      { step: 3, state: 'Compute a * b', memoryOrStack: '10000000000 (0x2540BE400)', note: 'Needs 34 bits -> fits 64-bit!' },
      { step: 4, state: 'printf %lld', memoryOrStack: 'stdout: 10000000000', note: 'Exact answer' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: Multiplying two `int`s and storing into `long long`',
        brokenCode: 'int a = 100000, b = 100000;\nlong long prod = a * b; // OVERFLOWS BEFORE ASSIGNMENT!',
        fixedCode: 'long long prod = 1LL * a * b;',
        whyItBreaks: 'C evaluates `a * b` in 32-bit `int` FIRST, overflows, and only then copies the broken value into `prod`.',
      },
      {
        title: 'Trap 2: Integer Division Truncation (5 / 2 === 2)',
        brokenCode: 'double half = 5 / 2; // Becomes 2.0!',
        fixedCode: 'double half = 5.0 / 2; // 2.5',
        whyItBreaks: 'Dividing two ints always discards the decimal remainder before assigning to double.',
      },
      {
        title: 'Trap 3: Comparing floats with == (0.1 + 0.2 != 0.3)',
        brokenCode: 'if (0.1 + 0.2 == 0.3) ... // False!',
        fixedCode: 'if (fabs((0.1 + 0.2) - 0.3) < 1e-9) ...',
        whyItBreaks: 'Binary IEEE-754 floats have tiny rounding error (~1e-17).',
      },
    ],
    practiceSheet: [
      {
        id: 'c-2-p1',
        difficulty: 'Easy',
        title: '1. Sizeof Inspector',
        prompt: 'Print sizeof(int) and sizeof(long long) separated by a space.',
        banglaHint: '%zu ফরম্যাট স্পেসিফায়ার দিয়ে sizeof() প্রিন্ট করো।',
        starterCode: `#include <stdio.h>\nint main(void) {\n    printf("%zu %zu\\n", sizeof(int), sizeof(long long));\n    return 0;\n}`,
        sampleStdin: '',
        expectedOutput: '4 8',
      },
      {
        id: 'c-2-p2',
        difficulty: 'Easy',
        title: '2. Safe 64-bit Sum',
        prompt: 'Read three long long integers and print their sum.',
        banglaHint: 'long long এবং %lld ব্যবহার করো।',
        starterCode: `#include <stdio.h>\nint main(void) {\n    long long a, b, c;\n    scanf("%lld %lld %lld", &a, &b, &c);\n    printf("%lld\\n", a + b + c);\n    return 0;\n}`,
        sampleStdin: '2000000000 2000000000 1000000000',
        expectedOutput: '5000000000',
      },
      {
        id: 'c-2-p3',
        difficulty: 'Medium',
        title: '3. ASCII Character Shift',
        prompt: 'Read a lowercase letter and print its ASCII code and next letter.',
        banglaHint: "C-তে char আসলে ১ বাইটের ছোট সংখ্যা: c + 1 পরের অক্ষর দেয়।",
        starterCode: `#include <stdio.h>\nint main(void) {\n    char c;\n    scanf(" %c", &c);\n    printf("%d %c\\n", (int)c, c + 1);\n    return 0;\n}`,
        sampleStdin: 'a',
        expectedOutput: '97 b',
      },
      {
        id: 'c-2-p4',
        difficulty: 'Medium',
        title: '4. Precise Average (2 Decimals)',
        prompt: 'Read two ints a and b; print their exact average to 2 decimal places.',
        banglaHint: '%.2f এবং (a + b) / 2.0 ব্যবহার করো।',
        starterCode: `#include <stdio.h>\nint main(void) {\n    int a, b;\n    scanf("%d %d", &a, &b);\n    printf("%.2f\\n", (a + b) / 2.0);\n    return 0;\n}`,
        sampleStdin: '5 2',
        expectedOutput: '3.50',
      },
      {
        id: 'c-2-p5',
        difficulty: 'Hard',
        title: '5. Prevent Intermediate Overflow (1LL)',
        prompt: 'Given int a, b, c up to 10^6, compute (a * b) + c without 32-bit overflow.',
        banglaHint: '1LL * a * b + c লিখলে গুণফল আগেই 64-bit হয়ে যাবে।',
        starterCode: `#include <stdio.h>\nint main(void) {\n    int a, b, c;\n    scanf("%d %d %d", &a, &b, &c);\n    printf("%lld\\n", 1LL * a * b + c);\n    return 0;\n}`,
        sampleStdin: '100000 100000 50',
        expectedOutput: '10000000050',
      },
    ],
    miniBuild: {
      title: '64-Bit Overflow-Proof Multiplier (C)',
      description: 'Upgrades Ch 1 I/O with 64-bit `long long` boxes to compute 10^10 products without wrapping.',
      banglaGoal: 'Ch 1-এর I/O-এর সাথে 64-bit long long যোগ করে ১০^১০ গুণফল নির্ভুলভাবে হিসাব করা।',
      combinesChapters: 'Ch 1 (scanf/printf) + Ch 2 (64-bit long long memory)',
      starterCode: `#include <stdio.h>\nint main(void) {\n    long long a = 0, b = 0;\n    if (scanf("%lld %lld", &a, &b) == 2) {\n        printf("%lld\\n", a * b);\n    }\n    return 0;\n}`,
      sampleStdin: '100000 100000',
      expectedOutput: '10000000000',
    },
  },

  cpp: {
    title: 'C++ Chapter 2: Static Types, `auto`, `long long` & Memory Alignment',
    banglaTitle: 'C++ অধ্যায় ২: ডেটা টাইপ, `auto`, `long long` ও মেমোরি',
    subtitle: 'Understand C++ type inference (`auto`), `const`, 64-bit `long long`, and precision formatting.',
    zeroIntuition: {
      plainEnglishStory:
        'C++ enforces strict memory contracts like C while adding `const` immutability and `auto` type inference. Choosing the right width (`int` vs `long long` vs `double`) determines whether your competitive programming submission gets Accepted or fails with negative overflow garbage.',
      asciiFlowchart: `  [ Input: 100000, 100000 ]
              |
              v
  [ Allocate 64-bit long long a, b ]
              |
              v
  [ Compute a * b = 10000000000 ]
              |
              v
  [ cout << result << "\\n" ]`,
      pseudocode: [
        '1. DECLARE 64-bit long long a, b',
        '2. READ from cin',
        '3. PRINT a * b safely',
      ],
      banglaZeroToHero: {
        analogyTitle: 'সঠিক সাইজের গোডাউন ও অটোমেটিক লেবেল (`auto`)',
        explanation:
          'যেমন ছোট দোকানে বড় ট্রাকের মাল ঢোকে না, তেমনি ৩২-বিট `int`-এ ১০^১০ সংখ্যা ধরে না—দরকার ৬৪-বিট `long long`! আর C++-এ `auto` ব্যবহার করলে কম্পাইলার নিজেই ডান পাশের মান দেখে সঠিক টাইপ বুঝে নেয়।',
        everydayExample:
          'টাকা গুনতে গেলে সাধারণ ক্যালকুলেটরে যেমন "E" (Error) চলে আসে কিন্তু বড় ডিসপ্লেতে পুরো সংখ্যা দেখা যায়, `long long` হলো সেই বড় ডিসপ্লে।',
        keyTakeaways: [
          'CP-তে অনেক সময় `using ll = long long;` লিখে কোড ছোট রাখা হয়।',
          '`const` দিলে ভ্যারিয়েবল ভুল করে বদলে যাওয়া আটকানো যায়।',
        ],
      },
    },
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 5',
        codeSnippet: 'long long a, b;',
        whatItMeans: 'Reserves two 8-byte signed integer slots on the stack.',
        whyItIsThere: 'Holds values up to 9.22 × 10^18.',
        ifDeletedError: 'Compile error: "a" was not declared in this scope.',
      },
      {
        lineNumber: 'Line 6-7',
        codeSnippet: 'if (cin >> a >> b) { cout << (a * b) << "\\n"; }',
        whatItMeans: 'Reads both 64-bit integers and prints their 64-bit product.',
        whyItIsThere: 'Safe from 32-bit overflow.',
        ifDeletedError: 'Using `int` prints wrong overflowed value `1410065408`.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'cin >> a >> b', memoryOrStack: 'a=100000 (8B), b=100000 (8B)', note: '64-bit stack slots' },
      { step: 2, state: 'a * b', memoryOrStack: '10000000000', note: 'No overflow' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: Overflowing `int` in Prefix Sums',
        brokenCode: 'int sum = 0; // Fails if 10^5 elements each ~10^9!',
        fixedCode: 'long long sum = 0;',
        whyItBreaks: 'Sum of 10^5 items of size 10^9 reaches 10^14, far past 32-bit int.',
      },
      {
        title: 'Trap 2: Using uninitialized local variables',
        brokenCode: 'int count;\ncount++; // Garbage RAM value!',
        fixedCode: 'int count = 0;\ncount++;',
        whyItBreaks: 'C++ does not zero local stack variables automatically.',
      },
      {
        title: 'Trap 3: Integer division when double expected',
        brokenCode: 'double ans = a / b;',
        fixedCode: 'double ans = static_cast<double>(a) / b;',
        whyItBreaks: 'Cast at least one operand to double before dividing.',
      },
    ],
    practiceSheet: [
      {
        id: 'cpp-2-p1',
        difficulty: 'Easy',
        title: '1. Type Sizes',
        prompt: 'Print sizeof(int) and sizeof(long long).',
        banglaHint: 'cout << sizeof(int) << " " << sizeof(long long) << "\\n";',
        starterCode: `#include <iostream>\nusing namespace std;\nint main() { cout << sizeof(int) << " " << sizeof(long long) << "\\n"; }`,
        sampleStdin: '',
        expectedOutput: '4 8',
      },
      {
        id: 'cpp-2-p2',
        difficulty: 'Easy',
        title: '2. Bool Flag Output',
        prompt: 'Read int n; print 1 if positive else 0.',
        banglaHint: 'bool isPos = (n > 0);',
        starterCode: `#include <iostream>\nusing namespace std;\nint main() { int n; cin >> n; cout << (n > 0) << "\\n"; }`,
        sampleStdin: '12',
        expectedOutput: '1',
      },
      {
        id: 'cpp-2-p3',
        difficulty: 'Medium',
        title: '3. Fixed Decimal Formatting',
        prompt: 'Read two integers and print a / b with 3 decimal places.',
        banglaHint: '<iomanip> এর fixed << setprecision(3) ব্যবহার করো।',
        starterCode: `#include <iomanip>\n#include <iostream>\nusing namespace std;\nint main() { double a, b; cin >> a >> b; cout << fixed << setprecision(3) << (a / b) << "\\n"; }`,
        sampleStdin: '7 2',
        expectedOutput: '3.500',
      },
      {
        id: 'cpp-2-p4',
        difficulty: 'Medium',
        title: '4. Char Case Toggle',
        prompt: 'Read lowercase char and print uppercase version.',
        banglaHint: "char up = c - 'a' + 'A';",
        starterCode: `#include <iostream>\nusing namespace std;\nint main() { char c; cin >> c; cout << char(c - 'a' + 'A') << "\\n"; }`,
        sampleStdin: 'k',
        expectedOutput: 'K',
      },
      {
        id: 'cpp-2-p5',
        difficulty: 'Hard',
        title: '5. Overflow-Free Square Sum',
        prompt: 'Read n up to 10^5 and print n * n using 1LL.',
        banglaHint: '1LL * n * n লিখলে রেজাল্ট ৬৪-বিটে থাকে।',
        starterCode: `#include <iostream>\nusing namespace std;\nint main() { int n; cin >> n; cout << (1LL * n * n) << "\\n"; }`,
        sampleStdin: '100000',
        expectedOutput: '10000000000',
      },
    ],
    miniBuild: {
      title: '64-Bit Fast Multiplier (C++)',
      description: 'Reads two 64-bit numbers and outputs their exact product.',
      banglaGoal: 'long long ও Fast I/O দিয়ে ওভারফ্লো-মুক্ত ক্যালকুলেটর।',
      combinesChapters: 'Ch 1 + Ch 2',
      starterCode: `#include <iostream>\nusing namespace std;\nint main() {\n    long long a, b;\n    if (cin >> a >> b) {\n        cout << (a * b) << "\\n";\n    }\n    return 0;\n}`,
      sampleStdin: '100000 100000',
      expectedOutput: '10000000000',
    },
  },

  python: {
    title: 'Python Chapter 2: Dynamic Objects, Arbitrary-Size Ints & Float Precision',
    banglaTitle: 'Python অধ্যায় ২: ডায়নামিক ভ্যারিয়েবল, বড় সংখ্যা ও ফ্লোট প্রিসিশন',
    subtitle: 'How Python variables point to heap objects, why ints never overflow, and why 0.1 + 0.2 != 0.3.',
    zeroIntuition: {
      plainEnglishStory:
        'In C/Java, a variable IS a fixed-size box in memory. In Python, a variable is a sticky-note name tag attached to an object floating in Heap memory! Because Python dynamically expands integer memory as numbers grow, `100000 * 100000` (or even `2 ** 1000`) NEVER overflows.',
      asciiFlowchart: `  Name Tags         Heap PyObjects
  a  ---------->   [ int: 100000 ]
  b  ---------->   [ int: 100000 ]
  prod -------->   [ int: 10000000000 ]  (Auto-grows bits!)`,
      pseudocode: [
        '1. READ two tokens from stdin',
        '2. CONVERT both tokens to Python int',
        '3. MULTIPLY a * b (arbitrary precision)',
        '4. PRINT result',
      ],
      banglaZeroToHero: {
        analogyTitle: 'নাম লেখা ট্যাগ ও জাদুর রাবার ব্যাগ (Python Objects)',
        explanation:
          'C-তে ভ্যারিয়েবল হলো ফিক্সড সাইজের টিফিন বক্স, কিন্তু Python-এ ভ্যারিয়েবল হলো একটি ইলাস্টিক জাদুর ব্যাগ যার গায়ে নামের স্টিকার লাগানো! যত বড় সংখ্যাই রাখো না কেন, Python নিজে থেকে ব্যাগ বড় করে নেবে—কখনো Overflow হবে না।',
        everydayExample:
          'রাবার ব্যান্ডের মতো: ভেতরে যত বেশি জিনিস রাখবে, ব্যাগ ততই প্রসারিত হবে।',
        keyTakeaways: [
          'Python-এ `/` দিলে সব সময় দশমিক (float) আসে, আর `//` দিলে পূর্ণসংখ্যা (floor division) আসে।',
          'একই সাথে `a, b = b, a` লিখে ভ্যালু অদলবদল করা যায়।',
        ],
      },
    },
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 1',
        codeSnippet: 'import sys',
        whatItMeans: 'Loads fast standard input reader.',
        whyItIsThere: 'Reads multiple space-separated tokens cleanly.',
        ifDeletedError: 'NameError: name "sys" is not defined.',
      },
      {
        lineNumber: 'Line 2',
        codeSnippet: 'a, b = map(int, sys.stdin.read().split())',
        whatItMeans: 'Applies int() to every token and unpacks into a and b.',
        whyItIsThere: 'Clean one-liner for competitive programming inputs.',
        ifDeletedError: 'Strings cannot be multiplied directly (`"10" * "10"` raises TypeError).',
      },
      {
        lineNumber: 'Line 3',
        codeSnippet: 'print(a * b)',
        whatItMeans: 'Multiplies arbitrary-precision ints and outputs.',
        whyItIsThere: 'Zero risk of 32-bit or 64-bit integer overflow.',
        ifDeletedError: 'No output printed.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'split()', memoryOrStack: '["100000", "100000"]', note: 'Raw strings' },
      { step: 2, state: 'map(int, ...)', memoryOrStack: 'a=100000, b=100000', note: 'Heap int objects' },
      { step: 3, state: 'print(a * b)', memoryOrStack: '10000000000', note: 'Exact arbitrary precision' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: Confusing `/` (float) with `//` (integer division)',
        brokenCode: 'mid = (0 + 5) / 2 # 2.5 -> TypeError as list index!',
        fixedCode: 'mid = (0 + 5) // 2 # 2',
        whyItBreaks: 'List indices must be ints, and `/` always returns a float in Python 3.',
      },
      {
        title: 'Trap 2: Rebinding `list = ...` overwrites built-in `list()`',
        brokenCode: 'list = [1, 2, 3]\nx = list("abc") # TypeError!',
        fixedCode: 'nums = [1, 2, 3]\nx = list("abc")',
        whyItBreaks: 'Never name variables `list`, `str`, `sum`, or `id`.',
      },
      {
        title: 'Trap 3: Float inaccuracy in equality checks',
        brokenCode: 'print(0.1 + 0.2 == 0.3) # False!',
        fixedCode: 'from decimal import Decimal\nprint(Decimal("0.1") + Decimal("0.2") == Decimal("0.3"))',
        whyItBreaks: 'Use Decimal or integer cents for money math.',
      },
    ],
    practiceSheet: [
      {
        id: 'py-2-p1',
        difficulty: 'Easy',
        title: '1. Variable Swap',
        prompt: 'Read a and b, swap them in one line, print "<b> <a>".',
        banglaHint: 'a, b = b, a ব্যবহার করো।',
        starterCode: `import sys\na, b = map(int, sys.stdin.read().split())\na, b = b, a\nprint(a, b)`,
        sampleStdin: '10 20',
        expectedOutput: '20 10',
      },
      {
        id: 'py-2-p2',
        difficulty: 'Easy',
        title: '2. Floor vs Float Division',
        prompt: 'Read a and b; print a // b and a % b.',
        banglaHint: '// ভাগফল ও % ভাগশেষ দেয়।',
        starterCode: `import sys\na, b = map(int, sys.stdin.read().split())\nprint(a // b, a % b)`,
        sampleStdin: '17 5',
        expectedOutput: '3 2',
      },
      {
        id: 'py-2-p3',
        difficulty: 'Medium',
        title: '3. Type Tag Inspector',
        prompt: 'Read integer x and print type(x).__name__.',
        banglaHint: 'type(x).__name__ দিলে ডেটা টাইপের নাম পাওয়া যায়।',
        starterCode: `import sys\nx = int(sys.stdin.read().strip())\nprint(type(x).__name__)`,
        sampleStdin: '42',
        expectedOutput: 'int',
      },
      {
        id: 'py-2-p4',
        difficulty: 'Medium',
        title: '4. Decimal Money Safe Sum',
        prompt: 'Read two prices in cents (ints), print total dollars as "$X.YY".',
        banglaHint: 'টাকার হিসাব পয়সা/সেন্টে করলে ফ্লোট এরর হয় না।',
        starterCode: `import sys\na, b = map(int, sys.stdin.read().split())\ntot = a + b\nprint(f"\${tot // 100}.{tot % 100:02d}")`,
        sampleStdin: '125 275',
        expectedOutput: '$4.00',
      },
      {
        id: 'py-2-p5',
        difficulty: 'Hard',
        title: '5. Giant 100-Digit Power',
        prompt: 'Compute 2 ** n for any n.',
        banglaHint: 'Python-এ 2 ** n মুহূর্তে যেকোনো বড় সংখ্যা হিসাব করে।',
        starterCode: `import sys\nn = int(sys.stdin.read().strip())\nprint(2 ** n)`,
        sampleStdin: '64',
        expectedOutput: '18446744073709551616',
      },
    ],
    miniBuild: {
      title: 'Overflow-Free Big Multiplier (Python)',
      description: 'Multiplies arbitrarily large numbers cleanly with map(int, ...).',
      banglaGoal: 'Python-এর অসীম প্রিসিশন ব্যবহার করে বড় সংখ্যার গুণফল নির্ণয়।',
      combinesChapters: 'Ch 1 + Ch 2',
      starterCode: `import sys\na, b = map(int, sys.stdin.read().split())\nprint(a * b)`,
      sampleStdin: '100000 100000',
      expectedOutput: '10000000000',
    },
  },

  java: {
    title: 'Java Chapter 2: Primitives (`int`/`long`), Wrapper Classes & Heap Objects',
    banglaTitle: 'Java অধ্যায় ২: প্রিমিটিভ টাইপ (`int`/`long`), অবজেক্ট ও কাস্টিং',
    subtitle: 'Stack primitives vs Heap objects, why `long` prevents overflow, and String immutability.',
    zeroIntuition: {
      plainEnglishStory:
        'Java splits data into 8 raw Primitives (`int`, `long`, `double`, `boolean`, `char` stored directly on the fast Stack) and Objects (`String`, `Integer` stored on the Heap). For competitive programming, always watch out when multiplying two `int`s—use `long`!',
      asciiFlowchart: `  Stack Frame (Fast)          Heap (Objects)
  long a = 100000L            String s = "Argon"
  long b = 100000L`,
      pseudocode: [
        '1. CREATE Scanner',
        '2. READ long a and long b',
        '3. PRINT a * b',
      ],
      banglaZeroToHero: {
        analogyTitle: 'হাতের কাছে পকেটের জিনিস (Primitive) বনাম গুদামের পার্সেল (Object)',
        explanation:
          'Java-তে `int`, `long`, `double` হলো পকেটের টাকা—সরাসরি Stack মেমোরিতে থাকে, তাই অত্যন্ত দ্রুত। আর `String` হলো গুদামে রাখা বড় পার্সেল (Heap)। বড় সংখ্যার গুণফল রাখতে `int`-এর বদলে ৬৪-বিট `long` নিতে হয়।',
        everydayExample:
          'ছোট হিসাব হাতে-কলমে (Stack), বড় ফাইল আলমারিতে (Heap)।',
        keyTakeaways: [
          '`long` লিটারেলের শেষে `L` লিখতে হয় (যেমন `10000000000L`)।',
          '`String` তুলনা করতে কখনো `==` নয়, `.equals()` ব্যবহার করবে।',
        ],
      },
    },
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 6-7',
        codeSnippet: 'long a = sc.nextLong(); long b = sc.nextLong();',
        whatItMeans: 'Reads 64-bit signed integers from stdin.',
        whyItIsThere: 'Prevents 32-bit overflow when multiplying large values.',
        ifDeletedError: 'nextInt() throws InputMismatchException on numbers > 2.14e9.',
      },
      {
        lineNumber: 'Line 8',
        codeSnippet: 'System.out.println(a * b);',
        whatItMeans: 'Outputs the 64-bit product.',
        whyItIsThere: 'Exact result up to 9 × 10^18.',
        ifDeletedError: 'Nothing printed.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'sc.nextLong()', memoryOrStack: 'a=100000L, b=100000L', note: '8 bytes each on Stack' },
      { step: 2, state: 'a * b', memoryOrStack: '10000000000L', note: 'Printed cleanly' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: Comparing Strings with `==` instead of `.equals()`',
        brokenCode: 'String a = sc.next();\nif (a == "yes") ... // FALSE!',
        fixedCode: 'if ("yes".equals(a)) ...',
        whyItBreaks: '`==` checks if two references point to the same RAM address, not text equality.',
      },
      {
        title: 'Trap 2: Missing `L` suffix on big `long` constants',
        brokenCode: 'long big = 100000 * 100000; // Overflow!',
        fixedCode: 'long big = 100000L * 100000L;',
        whyItBreaks: 'Without `L`, Java multiplies them as 32-bit `int`s first.',
      },
      {
        title: 'Trap 3: Dividing integers without cast',
        brokenCode: 'double avg = (5 + 2) / 2; // 3.0!',
        fixedCode: 'double avg = (5 + 2) / 2.0; // 3.5',
        whyItBreaks: 'Integer division truncates decimals before assigning to double.',
      },
    ],
    practiceSheet: [
      {
        id: 'java-2-p1',
        difficulty: 'Easy',
        title: '1. Long Multiplier',
        prompt: 'Read two longs and print their product.',
        banglaHint: 'sc.nextLong() ব্যবহার করো।',
        starterCode: `import java.util.Scanner;\npublic class Main { public static void main(String[] args) { Scanner sc = new Scanner(System.in); System.out.println(sc.nextLong() * sc.nextLong()); } }`,
        sampleStdin: '100000 100000',
        expectedOutput: '10000000000',
      },
      {
        id: 'java-2-p2',
        difficulty: 'Easy',
        title: '2. Safe String Equality',
        prompt: 'Read a word and print YES if it equals "argon", else NO.',
        banglaHint: '"argon".equals(s) ব্যবহার করো।',
        starterCode: `import java.util.Scanner;\npublic class Main { public static void main(String[] args) { String s = new Scanner(System.in).next(); System.out.println("argon".equals(s) ? "YES" : "NO"); } }`,
        sampleStdin: 'argon',
        expectedOutput: 'YES',
      },
      {
        id: 'java-2-p3',
        difficulty: 'Medium',
        title: '3. Precise Percentage',
        prompt: 'Read obtained and total ints; print percentage to 2 decimals.',
        banglaHint: 'System.out.printf("%.2f\\n", ...) ব্যবহার করো।',
        starterCode: `import java.util.Scanner;\npublic class Main { public static void main(String[] args) { Scanner sc = new Scanner(System.in); double a = sc.nextInt(), b = sc.nextInt(); System.out.printf("%.2f\\n", (a * 100.0) / b); } }`,
        sampleStdin: '3 4',
        expectedOutput: '75.00',
      },
      {
        id: 'java-2-p4',
        difficulty: 'Medium',
        title: '4. Char to Unicode Int',
        prompt: 'Read a single char and print its ASCII/Unicode integer value.',
        banglaHint: '(int) s.charAt(0) লিখলে কোড পাওয়া যায়।',
        starterCode: `import java.util.Scanner;\npublic class Main { public static void main(String[] args) { char c = new Scanner(System.in).next().charAt(0); System.out.println((int) c); } }`,
        sampleStdin: 'A',
        expectedOutput: '65',
      },
      {
        id: 'java-2-p5',
        difficulty: 'Hard',
        title: '5. Overflow-Safe 3-Way Sum',
        prompt: 'Read three ints up to 2e9 and print their exact 64-bit sum.',
        banglaHint: '(long) a + b + c লিখো।',
        starterCode: `import java.util.Scanner;\npublic class Main { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int a = sc.nextInt(), b = sc.nextInt(), c = sc.nextInt(); System.out.println((long) a + b + c); } }`,
        sampleStdin: '2000000000 2000000000 2000000000',
        expectedOutput: '6000000000',
      },
    ],
    miniBuild: {
      title: 'JVM 64-Bit Product Calculator',
      description: 'Safely multiplies 64-bit inputs without integer wraparound.',
      banglaGoal: 'long ডেটা টাইপ ব্যবহার করে নির্ভুল গুণফল।',
      combinesChapters: 'Ch 1 + Ch 2',
      starterCode: `import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        long a = sc.nextLong();\n        long b = sc.nextLong();\n        System.out.println(a * b);\n    }\n}`,
      sampleStdin: '100000 100000',
      expectedOutput: '10000000000',
    },
  },

  javascript: {
    title: 'JavaScript Chapter 2: `let` vs `const`, `Number` vs `BigInt` & Coercion',
    banglaTitle: 'JavaScript অধ্যায় ২: `let`/`const`, `BigInt` ও টাইপ কনভার্সন',
    subtitle: 'Understand V8 dynamic types, safe integer limit (2^53 - 1), `BigInt`, and `===` strict equality.',
    zeroIntuition: {
      plainEnglishStory:
        'JavaScript has 7 primitive types (`number`, `bigint`, `string`, `boolean`, `undefined`, `null`, `symbol`). Normal `number` is 64-bit floating-point, exact up to 9 quadrillion (`Number.MAX_SAFE_INTEGER`). Beyond that, `BigInt` (`100000n`) preserves exact digits.',
      asciiFlowchart: `  Input: "100000 100000"
           |
           v
  .map(BigInt) --> [ 100000n, 100000n ]
           |
           v
  (a * b).toString() --> "10000000000"`,
      pseudocode: [
        '1. SPLIT stdin string by whitespace',
        '2. MAP tokens to BigInt',
        '3. MULTIPLY and convert .toString() for clean stdout',
      ],
      banglaZeroToHero: {
        analogyTitle: 'সাধারণ সংখ্যা (Number) বনাম বিশাল সংখ্যা (BigInt)',
        explanation:
          'JS-এ সাধারণ Number সর্বোচ্চ ৯×১০^১৫ পর্যন্ত নিখুঁত থাকে; এর পর শেষের ডিজিট ভুল হয়ে যায়! তাই বড় হিসাবের জন্য সংখ্যার শেষে `n` লাগিয়ে `BigInt` ব্যবহার করতে হয়। আর তুলনা করার সময় সব সময় `===` ব্যবহার করবে।',
        everydayExample:
          'সোনা মাপার পাল্লা আর ট্রাক মাপার স্কেল আলাদা—ঠিক তেমনি সাধারণ হিসাবের জন্য Number আর অসীম সংখ্যার জন্য BigInt।',
        keyTakeaways: [
          'কখনো `==` ব্যবহার করবে না (`"5" == 5` true হয়ে বাগ বানায়); সব সময় `===` ব্যবহার করবে।',
          'ডিফল্টভাবে `const` ব্যবহার করো, বদলানোর দরকার হলে `let` নাও, `var` এড়িয়ে চলো।',
        ],
      },
    },
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 3',
        codeSnippet: 'const [a, b] = raw.trim().split(/\\s+/).map(BigInt);',
        whatItMeans: 'Converts every string token directly into arbitrary-precision BigInt.',
        whyItIsThere: 'Guarantees exact integer math beyond 2^53 - 1.',
        ifDeletedError: 'String multiplication returns NaN!',
      },
      {
        lineNumber: 'Line 4',
        codeSnippet: 'console.log((a * b).toString());',
        whatItMeans: 'Removes the trailing `n` when printing to stdout.',
        whyItIsThere: 'Judges expect `"10000000000"`, not `"10000000000n"`.',
        ifDeletedError: 'Printing raw BigInt in some Node loggers includes `n` suffix.',
      },
    ],
    dryRunTable: [
      { step: 1, state: '.map(BigInt)', memoryOrStack: 'a=100000n, b=100000n', note: 'BigInt primitives' },
      { step: 2, state: '(a * b).toString()', memoryOrStack: '"10000000000"', note: 'Exact digits' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: Loose Equality `==` Quirks',
        brokenCode: 'console.log(0 == ""); // true! WAT?!',
        fixedCode: 'console.log(0 === ""); // false',
        whyItBreaks: '`==` silently coerces types with bizarre rules; always use `===`.',
      },
      {
        title: 'Trap 2: Floating-Point `0.1 + 0.2 === 0.3` is false',
        brokenCode: 'if (0.1 + 0.2 === 0.3) ...',
        fixedCode: 'if (Math.abs(0.1 + 0.2 - 0.3) < 1e-9) ...',
        whyItBreaks: 'IEEE-754 binary float precision.',
      },
      {
        title: 'Trap 3: Mixing `BigInt` and `Number`',
        brokenCode: 'console.log(10n + 5); // TypeError!',
        fixedCode: 'console.log(10n + 5n);',
        whyItBreaks: 'JS forbids implicit mixing of BigInt and Number.',
      },
    ],
    practiceSheet: [
      {
        id: 'js-2-p1',
        difficulty: 'Easy',
        title: '1. Strict Typeof Check',
        prompt: 'Print typeof 42 and typeof "42" separated by space.',
        banglaHint: 'typeof অপারেটর ব্যবহার করো।',
        starterCode: `console.log(typeof 42, typeof "42");`,
        sampleStdin: '',
        expectedOutput: 'number string',
      },
      {
        id: 'js-2-p2',
        difficulty: 'Easy',
        title: '2. NaN Guard',
        prompt: 'Parse input with Number(); print "VALID" if !Number.isNaN else "INVALID".',
        banglaHint: 'Number.isNaN(x) দিয়ে চেক করো।',
        starterCode: `const x = Number(readAllStdin().trim());\nconsole.log(Number.isNaN(x) ? "INVALID" : "VALID");`,
        sampleStdin: 'abc',
        expectedOutput: 'INVALID',
      },
      {
        id: 'js-2-p3',
        difficulty: 'Medium',
        title: '3. Safe Integer Limit Check',
        prompt: 'Read BigInt n; print SAFE if n <= BigInt(Number.MAX_SAFE_INTEGER) else BIG.',
        banglaHint: 'Number.MAX_SAFE_INTEGER কে BigInt()-এ রূপান্তর করে তুলনা করো।',
        starterCode: `const n = BigInt(readAllStdin().trim());\nconsole.log(n <= BigInt(Number.MAX_SAFE_INTEGER) ? "SAFE" : "BIG");`,
        sampleStdin: '9007199254740999',
        expectedOutput: 'BIG',
      },
      {
        id: 'js-2-p4',
        difficulty: 'Medium',
        title: '4. Nullish Coalescing (??)',
        prompt: 'Use `??` to fallback 0 only on null/undefined (keep 0 as 0!).',
        banglaHint: '0 || 10 দিলে 10 হয়, কিন্তু 0 ?? 10 দিলে 0-ই থাকে।',
        starterCode: `const raw = readAllStdin().trim();\nconst val = raw === "" ? undefined : Number(raw);\nconsole.log(val ?? 99);`,
        sampleStdin: '0',
        expectedOutput: '0',
      },
      {
        id: 'js-2-p5',
        difficulty: 'Hard',
        title: '5. BigInt Power Mod',
        prompt: 'Compute (a * b) using BigInt.',
        banglaHint: '.map(BigInt) দিয়ে স্ট্রিং থেকে BigInt বানাও।',
        starterCode: `const [a, b] = readAllStdin().trim().split(/\\s+/).map(BigInt);\nconsole.log((a * b).toString());`,
        sampleStdin: '100000 100000',
        expectedOutput: '10000000000',
      },
    ],
    miniBuild: {
      title: 'BigInt Precision Multiplier (JS)',
      description: 'Uses BigInt to calculate products cleanly without IEEE-754 precision loss.',
      banglaGoal: 'BigInt ব্যবহার করে নির্ভুল বড় গুণফল।',
      combinesChapters: 'Ch 1 + Ch 2',
      starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst [a, b] = raw.trim().split(/\\s+/).map(BigInt);\nconsole.log((a * b).toString());`,
      sampleStdin: '100000 100000',
      expectedOutput: '10000000000',
    },
  },

  rust: {
    title: 'Rust Chapter 2: Strict Scalar Types (`i32`, `i64`, `usize`) & No Implicit Casts',
    banglaTitle: 'Rust অধ্যায় ২: স্ট্রিক্ট ডেটা টাইপ (`i32`, `i64`, `usize`) ও সেফটি',
    subtitle: 'Why Rust refuses implicit type mixing, integer overflow panics, and explicit `as` casting.',
    zeroIntuition: {
      plainEnglishStory:
        'Rust is aggressively strict about memory sizes: you cannot even add an `i32` and an `i64` without explicitly converting (`x as i64`). Even better, if an integer overflows in debug builds, Rust panics immediately instead of silently producing corrupt numbers like C.',
      asciiFlowchart: `  Input -> parse::<i64>() -> Vec<i64> -> nums[0] * nums[1] -> println!`,
      pseudocode: [
        '1. READ stdin to String',
        '2. PARSE whitespace tokens into Vec<i64>',
        '3. MULTIPLY nums[0] * nums[1] in 64-bit',
        '4. PRINT result',
      ],
      banglaZeroToHero: {
        analogyTitle: 'একই মাপের নাট-বল্টু (Strict Type Matching)',
        explanation:
          'Rust-এ তুমি ৩২-বিট `i32`-এর সাথে ৬৪-বিট `i64` সরাসরি যোগ করতে পারবে না—কম্পাইলার বলবে আগে দুইটিকে এক মাপে আনো (`as i64`)! এতে নীরব ডেটা নষ্ট হওয়ার কোনো সুযোগই থাকে না।',
        everydayExample:
          '৩২ সাইজের নাটে ৬৪ সাইজের বল্টু জোর করে লাগাতে গেলে যেমন ভেঙে যায়, Rust শুরুতেই সেটা আটকে দেয়।',
        keyTakeaways: [
          'অ্যারে বা Vec-এর ইনডেক্স সব সময় `usize` টাইপের হতে হয়।',
          'বড় মানের জন্য সব সময় `i64` বা `u64` বেছে নেবে।',
        ],
      },
    },
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 6',
        codeSnippet: 'let nums: Vec<i64> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();',
        whatItMeans: 'Because nums is annotated as `Vec<i64>`, `.parse()` automatically knows to parse 64-bit ints!',
        whyItIsThere: 'Type inference flows backwards from the `Vec<i64>` annotation.',
        ifDeletedError: 'Without `: Vec<i64>`, compiler asks: error[E0282]: type annotations needed.',
      },
      {
        lineNumber: 'Line 7',
        codeSnippet: 'println!("{}", nums[0] * nums[1]);',
        whatItMeans: 'Performs 64-bit multiplication.',
        whyItIsThere: 'Prevents i32 panic on 100000 * 100000.',
        ifDeletedError: 'Using `Vec<i32>` panics: attempt to multiply with overflow!',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'parse into Vec<i64>', memoryOrStack: '[100000, 100000]', note: '8 bytes per item on heap' },
      { step: 2, state: 'nums[0] * nums[1]', memoryOrStack: '10000000000', note: 'Safe i64 result' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: Indexing a Vec with `i32` instead of `usize`',
        brokenCode: 'let idx: i32 = 0;\nprintln!("{}", v[idx]); // Compile Error!',
        fixedCode: 'let idx: usize = 0;\nprintln!("{}", v[idx]);',
        whyItBreaks: 'Rust only allows `usize` (pointer-sized unsigned int) for slice/vector indexing.',
      },
      {
        title: 'Trap 2: Subtracting below 0 on unsigned `usize`',
        brokenCode: 'let n: usize = 0;\nlet prev = n - 1; // PANIC underflow!',
        fixedCode: 'let prev = n.saturating_sub(1);',
        whyItBreaks: 'Unsigned integers cannot hold negative numbers.',
      },
      {
        title: 'Trap 3: Shadowing accidentally vs mutating',
        brokenCode: 'let x = 5; { let x = 10; } // Outer x is still 5!',
        fixedCode: 'let mut x = 5; x = 10;',
        whyItBreaks: 'Inner `let` creates a new variable rather than updating the outer one.',
      },
    ],
    practiceSheet: [
      {
        id: 'rs-2-p1',
        difficulty: 'Easy',
        title: '1. Size of Types',
        prompt: 'Print `std::mem::size_of::<i32>()` and `size_of::<i64>()`.',
        banglaHint: 'std::mem::size_of::<T>() ব্যবহার করো।',
        starterCode: `fn main() { println!("{} {}", std::mem::size_of::<i32>(), std::mem::size_of::<i64>()); }`,
        sampleStdin: '',
        expectedOutput: '4 8',
      },
      {
        id: 'rs-2-p2',
        difficulty: 'Easy',
        title: '2. Explicit Casting',
        prompt: 'Read two i32s, cast to i64, and print product.',
        banglaHint: '(a as i64) * (b as i64) লিখো।',
        starterCode: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    let v: Vec<i32> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();\n    println!("{}", (v[0] as i64) * (v[1] as i64));\n}`,
        sampleStdin: '100000 100000',
        expectedOutput: '10000000000',
      },
      {
        id: 'rs-2-p3',
        difficulty: 'Medium',
        title: '3. Saturating Subtraction',
        prompt: 'Read two usize values a and b; print a.saturating_sub(b).',
        banglaHint: 'saturating_sub দিলে ০-এর নিচে নামলেও প্যানিক করবে না।',
        starterCode: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    let v: Vec<usize> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();\n    println!("{}", v[0].saturating_sub(v[1]));\n}`,
        sampleStdin: '3 10',
        expectedOutput: '0',
      },
      {
        id: 'rs-2-p4',
        difficulty: 'Medium',
        title: '4. Float Precision Display',
        prompt: 'Read f64 a and b; print a/b with `{:.2}`.',
        banglaHint: 'println!("{:.2}", a / b) ব্যবহার করো।',
        starterCode: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    let v: Vec<f64> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();\n    println!("{:.2}", v[0] / v[1]);\n}`,
        sampleStdin: '5 2',
        expectedOutput: '2.50',
      },
      {
        id: 'rs-2-p5',
        difficulty: 'Hard',
        title: '5. Checked Multiplication Guard',
        prompt: 'Read two u32s; print product or "OVERFLOW" using checked_mul.',
        banglaHint: 'a.checked_mul(b) returns Option<u32>.',
        starterCode: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    let v: Vec<u32> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();\n    match v[0].checked_mul(v[1]) { Some(p) => println!("{}", p), None => println!("OVERFLOW") }\n}`,
        sampleStdin: '100000 100000',
        expectedOutput: 'OVERFLOW',
      },
    ],
    miniBuild: {
      title: 'Overflow-Safe i64 Multiplier (Rust)',
      description: 'Parses stdin directly into typed `Vec<i64>` and computes safe 64-bit products.',
      banglaGoal: 'Vec<i64> টাইপ ইনফারেন্স ব্যবহার করে প্যানিক-মুক্ত ক্যালকুলেটর।',
      combinesChapters: 'Ch 1 + Ch 2',
      starterCode: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n    let nums: Vec<i64> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();\n    println!("{}", nums[0] * nums[1]);\n}`,
      sampleStdin: '100000 100000',
      expectedOutput: '10000000000',
    },
  },

  typescript: {
    title: 'TypeScript Chapter 2: Primitives, `bigint[]`, `readonly` & Type Aliases',
    banglaTitle: 'TypeScript অধ্যায় ২: প্রিমিটিভ, `bigint[]` ও টাইপ অ্যালায়াস',
    subtitle: 'Master TypeScript’s `number`, `bigint`, `boolean`, `type` aliases, and compile-time immutability.',
    zeroIntuition: {
      plainEnglishStory:
        'TypeScript mirrors JavaScript’s runtime types (`number`, `bigint`, `string`, `boolean`) while letting you lock arrays (`readonly number[]`) and name domain concepts (`type UserId = string`).',
      asciiFlowchart: `  stdin -> .split(/\\s+/).map(BigInt) -> [a, b]: bigint[] -> (a * b).toString()`,
      pseudocode: [
        '1. READ stdin text',
        '2. MAP tokens to typed bigint[]',
        '3. PRINT product',
      ],
      banglaZeroToHero: {
        analogyTitle: 'লেবেল করা ওষুধের বোতল (Type Aliases & BigInt)',
        explanation:
          'একই রকম দেখতে দুটো বোতলে যদি লেবেল লেখা থাকে ("UserId" এবং "Price"), তবে কখনো ভুল মিশ্রণ হবে না! TypeScript-এ `bigint[]` লিখে আমরা বলে দিই প্রতিটি উপাদান অবশ্যই বড় পূর্ণসংখ্যা।',
        everydayExample:
          'কুরিয়ার প্যাকেটের গায়ে "Fragile" স্টিকার লাগানোর মতো।',
        keyTakeaways: [
          'সব সময় `unknown` ব্যবহার করো `any`-এর বদলে, এবং ব্যবহারের আগে `typeof` দিয়ে যাচাই করো।',
        ],
      },
    },
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 3',
        codeSnippet: "const [a, b]: bigint[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(BigInt);",
        whatItMeans: 'Annotates destructured values as `bigint[]` so mixed `number` ops fail at compile time.',
        whyItIsThere: 'Prevents accidental precision loss on 10^10+ products.',
        ifDeletedError: 'Cannot mix bigint and number.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'Parse bigint[]', memoryOrStack: 'a=100000n, b=100000n', note: 'Type-checked' },
      { step: 2, state: 'Print .toString()', memoryOrStack: '10000000000', note: 'Clean output' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: Using uppercase `Number` / `String` instead of `number` / `string`',
        brokenCode: 'const age: Number = 20; // Wrapper object type!',
        fixedCode: 'const age: number = 20;',
        whyItBreaks: 'Always use lowercase `number`, `string`, `boolean`.',
      },
      {
        title: 'Trap 2: Mutating a `readonly` array',
        brokenCode: 'const arr: readonly number[] = [1, 2];\narr.push(3); // TS Error!',
        fixedCode: 'const next = [...arr, 3];',
        whyItBreaks: 'Use spread `[...arr, item]` to create a new immutable copy.',
      },
      {
        title: 'Trap 3: Ignoring `strictNullChecks`',
        brokenCode: 'let name: string = null;',
        fixedCode: 'let name: string | null = null;',
        whyItBreaks: 'Explicitly allow `| null` when a value may be absent.',
      },
    ],
    practiceSheet: [
      {
        id: 'ts-2-p1',
        difficulty: 'Easy',
        title: '1. Type Alias Pair',
        prompt: 'Create `type Score = number;` and print sum of two scores.',
        banglaHint: 'type Score = number ব্যবহার করো।',
        starterCode: `import * as fs from 'fs';\ntype Score = number;\nconst [a, b]: Score[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);\nconsole.log(a + b);`,
        sampleStdin: '40 44',
        expectedOutput: '84',
      },
      {
        id: 'ts-2-p2',
        difficulty: 'Easy',
        title: '2. Boolean Flag Formatter',
        prompt: 'Read integer x; type `ok: boolean = x > 0` and print it.',
        banglaHint: 'const ok: boolean = x > 0;',
        starterCode: `import * as fs from 'fs';\nconst x: number = Number(fs.readFileSync(0, 'utf8').trim());\nconst ok: boolean = x > 0;\nconsole.log(ok);`,
        sampleStdin: '5',
        expectedOutput: 'true',
      },
      {
        id: 'ts-2-p3',
        difficulty: 'Medium',
        title: '3. Unknown Type Narrowing',
        prompt: 'Write `formatVal(v: unknown): string` handling number & string.',
        banglaHint: 'typeof v === "number" দিয়ে টাইপ আলাদা করো।',
        starterCode: `function formatVal(v: unknown): string { return typeof v === 'number' ? String(v * 2) : String(v); }\nconsole.log(formatVal(21));`,
        sampleStdin: '',
        expectedOutput: '42',
      },
      {
        id: 'ts-2-p4',
        difficulty: 'Medium',
        title: '4. Readonly Tuple Swap',
        prompt: 'Read two numbers into `[number, number]` and print swapped.',
        banglaHint: 'const [a, b]: [number, number] টাপল টাইপ ব্যবহার করো।',
        starterCode: `import * as fs from 'fs';\nconst [a, b] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number) as [number, number];\nconsole.log(\`\${b} \${a}\`);`,
        sampleStdin: '10 20',
        expectedOutput: '20 10',
      },
      {
        id: 'ts-2-p5',
        difficulty: 'Hard',
        title: '5. BigInt[] Multiplier',
        prompt: 'Multiply two bigints.',
        banglaHint: 'bigint[] অ্যানোটেশন ব্যবহার করো।',
        starterCode: `import * as fs from 'fs';\nconst [a, b]: bigint[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(BigInt);\nconsole.log((a * b).toString());`,
        sampleStdin: '100000 100000',
        expectedOutput: '10000000000',
      },
    ],
    miniBuild: {
      title: 'Type-Checked BigInt Calculator (TS)',
      description: 'Combines strict `bigint[]` typing with safe string output.',
      banglaGoal: 'TypeScript-এ bigint[] দিয়ে নিরাপদ হিসাব।',
      combinesChapters: 'Ch 1 + Ch 2',
      starterCode: `import * as fs from 'fs';\nconst [a, b]: bigint[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(BigInt);\nconsole.log((a * b).toString());`,
      sampleStdin: '100000 100000',
      expectedOutput: '10000000000',
    },
  },

  html: {
    title: 'HTML Chapter 2: Data Attributes, `<input>` Types & CSS Custom Variables',
    banglaTitle: 'HTML অধ্যায় ২: ডেটা অ্যাট্রিবিউট, `<input>` টাইপ ও CSS ভ্যারিয়েবল',
    subtitle: 'Store typed data in HTML attributes (`data-*`), native form input types, and CSS `--variables`.',
    zeroIntuition: {
      plainEnglishStory:
        'HTML stores "variables" in two places: CSS Custom Properties (`--accent: #38bdf8`) so colors stay consistent across a whole site, and `data-*` attributes on HTML elements so JavaScript can read exact typed state straight off the DOM.',
      asciiFlowchart: `  :root { --accent: #34d399; }   <-- Design Token Variable
  <div data-bits="64">           <-- DOM Metadata Variable
  <script> reads BigInt(100000n * 100000n) -> updates #out`,
      pseudocode: [
        '1. DEFINE CSS variables or semantic containers',
        '2. STORE numeric display inside target element id="out"',
        '3. COMPUTE 64-bit safe BigInt product in inline script',
      ],
      banglaZeroToHero: {
        analogyTitle: 'দোকানের মূল্য-ট্যাগ ও থিমের মূল রঙ (CSS Variables & Attributes)',
        explanation:
          'একটি ওয়েবসাইটের ৫০টি বাটনের রঙ একসাথে বদলাতে চাইলে বারবার প্রতিটির রঙ না লিখে একটি CSS ভ্যারিয়েবল (`--brand-color`) বদলালেই সব বদলে যায়! আর HTML-এর ভেতর `type="number"`, `type="email"` লিখে ব্রাউজারকে বলে দেওয়া যায় ইনপুটটি কী ধরনের হবে।',
        everydayExample:
          'প্রতিটি পণ্যের গায়ে দাম লেখা স্টিকার হলো Attribute, আর পুরো দোকানের থিম রঙ হলো CSS Variable।',
        keyTakeaways: [
          '`<input type="number">` মোবাইলে স্বয়ংক্রিয়ভাবে নম্বর কিবোর্ড ওপেন করে।',
          'CSS ভ্যারিয়েবল (`var(--primary)`) ডার্ক/লাইট থিম বানানোর মূল অস্ত্র।',
        ],
      },
    },
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 4',
        codeSnippet: '<strong id="out"></strong>',
        whatItMeans: 'Creates a unique DOM hook `id="out"` that JavaScript can update dynamically.',
        whyItIsThere: 'IDs must be unique per page so `getElementById` finds the exact target.',
        ifDeletedError: 'document.getElementById("out") returns null and crashes!',
      },
      {
        lineNumber: 'Line 5',
        codeSnippet: "document.getElementById('out').textContent = (100000n * 100000n).toString();",
        whatItMeans: 'Safely writes plain text (never innerHTML) using BigInt math.',
        whyItIsThere: 'textContent prevents XSS script injection while rendering exact digits.',
        ifDeletedError: 'Output stays blank.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'Parse DOM', memoryOrStack: '<strong id="out"> created', note: 'Empty initially' },
      { step: 2, state: 'Run <script>', memoryOrStack: '100000n * 100000n = 10000000000n', note: 'Writes textContent' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: Duplicate `id` values on the same page',
        brokenCode: '<p id="msg">A</p><p id="msg">B</p>',
        fixedCode: '<p id="msg-1">A</p><p id="msg-2">B</p>',
        whyItBreaks: 'getElementById only updates the first element and breaks accessibility labels.',
      },
      {
        title: 'Trap 2: Using `innerHTML` with user-typed text',
        brokenCode: 'el.innerHTML = userInput; // XSS vulnerability!',
        fixedCode: 'el.textContent = userInput;',
        whyItBreaks: 'innerHTML executes malicious `<script>` or `onerror=` tags.',
      },
      {
        title: 'Trap 3: Missing `type` on `<input>` fields',
        brokenCode: '<input placeholder="Age">',
        fixedCode: '<input type="number" min="0" placeholder="Age">',
        whyItBreaks: 'Browser cannot provide numeric keyboard or built-in validation.',
      },
    ],
    practiceSheet: [
      {
        id: 'html-2-p1',
        difficulty: 'Easy',
        title: '1. CSS Theme Variable Card',
        prompt: 'Use `:root { --accent: #38bdf8; }` to color a heading.',
        banglaHint: ':root-এ ভ্যারিয়েবল লিখে var(--accent) দিয়ে ব্যবহার করো।',
        starterCode: `<!doctype html><html><head><style>:root{--accent:#38bdf8}body{background:#090d16;color:#fff;font-family:sans-serif;padding:24px}h1{color:var(--accent)}</style></head><body><h1>CSS Variables Active</h1></body></html>`,
        sampleStdin: '',
        expectedOutput: 'Valid HTML5 document',
      },
      {
        id: 'html-2-p2',
        difficulty: 'Easy',
        title: '2. Typed Form Inputs',
        prompt: 'Create a number input, date input, and email input with labels.',
        banglaHint: 'type="number", type="date", type="email" ব্যবহার করো।',
        starterCode: `<!doctype html><html><body style="background:#090d16;color:#fff;font-family:sans-serif;padding:24px;display:grid;gap:8px;max-width:260px"><label for="a">Age</label><input id="a" type="number"/><label for="e">Email</label><input id="e" type="email"/></body></html>`,
        sampleStdin: '',
        expectedOutput: 'Valid HTML5 document',
      },
      {
        id: 'html-2-p3',
        difficulty: 'Medium',
        title: '3. Data-* Attribute Reader',
        prompt: 'Read `data-xp="150"` from a card and display it.',
        banglaHint: 'element.dataset.xp দিয়ে HTML থেকে ডেটা পড়া যায়।',
        starterCode: `<!doctype html><html><body style="background:#090d16;color:#34d399;font-family:monospace;padding:24px"><div id="card" data-xp="150"></div><script>const c=document.getElementById('card');c.textContent='XP from data-attr: '+c.dataset.xp;</script></body></html>`,
        sampleStdin: '',
        expectedOutput: 'Valid HTML5 document',
      },
      {
        id: 'html-2-p4',
        difficulty: 'Medium',
        title: '4. Live Numeric Sum Calculator',
        prompt: 'Add two `<input type="number">` fields live on input.',
        banglaHint: 'Number(inp.value) যোগ করে আউটপুট দেখাও।',
        starterCode: `<!doctype html><html><body style="background:#090d16;color:#fff;font-family:sans-serif;padding:24px"><input id="a" type="number" value="12"/> + <input id="b" type="number" value="30"/> = <strong id="sum">42</strong><script>const u=()=>{sum.textContent=Number(a.value)+Number(b.value)};a.oninput=b.oninput=u;</script></body></html>`,
        sampleStdin: '',
        expectedOutput: 'Valid HTML5 document',
      },
      {
        id: 'html-2-p5',
        difficulty: 'Hard',
        title: '5. XSS-Safe User Display',
        prompt: 'Render untrusted `<script>` text safely via `.textContent`.',
        banglaHint: 'innerHTML এর বদলে textContent ব্যবহার করলে স্ক্রিপ্ট রান হয় না।',
        starterCode: `<!doctype html><html><body style="background:#090d16;color:#38bdf8;font-family:monospace;padding:24px"><p id="safe"></p><script>document.getElementById('safe').textContent='<img src=x onerror=alert(1)> Safe!';</script></body></html>`,
        sampleStdin: '',
        expectedOutput: 'Valid HTML5 document',
      },
    ],
    miniBuild: {
      title: '64-Bit Memory Box Inspector (HTML5 + JS)',
      description: 'Displays 32-bit overflow vs safe 64-bit BigInt calculation inside a live DOM page.',
      banglaGoal: 'ব্রাউজারে ৩২-বিট বনাম ৬৪-বিট মেমোরির পার্থক্য প্রদর্শন করা।',
      combinesChapters: 'Ch 1 + Ch 2',
      starterCode: `<!doctype html>\n<html><body style="font-family:monospace;background:#090d16;color:#e2e8f0;padding:24px;">\n  <h2>64-Bit Memory Box Inspector</h2>\n  <p>32-bit max: 2,147,483,647</p>\n  <p style="color:#34d399">64-bit safe product (100000 × 100000): <strong id="out"></strong></p>\n  <script>document.getElementById('out').textContent = (100000n * 100000n).toString();</script>\n</body></html>`,
      sampleStdin: '',
      expectedOutput: 'Valid HTML5 document',
    },
  },
};
