import type { AtomicLessonOverride } from './atomicLessonTypes';

export const LESSONS_CPP_P2: Record<number, AtomicLessonOverride> = {
  6: {
    chapterNumber: 6,
    title: 'C++ Chapter 6 (C++23): Conditional Branching (if / else if, switch & Ternary)',
    banglaTitle: 'C++ অধ্যায় ৬ (C++23): কন্ডিশনাল ব্রাঞ্চিং (if / else if, switch ও টার্নারি)',
    subtitle: 'C++17/23 if-with-initializer, scoped enums in switch, guard clauses, and branchless ternary logic.',
    zeroIntuition: {
      plainEnglishStory:
        'Branching turns sequential C++ scripts into intelligent decision engines. In modern C++23, `if (auto x = compute(); x > 0)` limits temporary variables cleanly inside the `if/else` scope, preventing namespace pollution across long competitive programming functions.\n\nWhen dispatching across fixed discrete values or menu commands, `switch` compiles into a fast jump table—remembering `break;` after every `case` (or explicit `[[fallthrough]];` when intentional). Ordering descending bounds and guarding invalid inputs at the top keeps logic flat and predictable.',
      asciiFlowchart: `  [ cin >> score ]
         |
         +--> (score < 0 || score > 100) --YES--> [ cout << "INVALID" & return 0 ]
         |
        NO
         v
  [ score >= 90 ] --YES--> "A+"
         |
        NO
         v
  [ score >= 80 ] --YES--> "A"  ... else "Pass/Fail"`,
      pseudocode: [
        '1. READ score or operator command from cin',
        '2. GUARD invalid boundaries immediately with early return',
        '3. CLASSIFY ordered ranges via if / else if ladder',
        '4. DISPATCH exact discrete choices with switch + break',
        '5. EMIT clean result using \\n',
      ],
      banglaZeroToHero: {
        analogyTitle: 'রেলস্টেশনের স্বয়ংক্রিয় ট্র্যাক সুইচ ও গার্ড ক্লজ',
        explanation:
          'কল্পনা করো একটি এক্সপ্রেস ট্রেন স্টেশনের সামনে দাঁড়িয়ে আছে এবং সামনে পাঁচটি আলাদা লাইন আছে। পয়েন্টসম্যান শর্ত দেখে সিদ্ধান্ত নেয় ট্রেনটি ঠিক কোন লাইনে ঢুকবে—C++ প্রোগ্রামে `if / else if / else` ঠিক সেই কাজই করে। প্রথমেই ভুল ইনপুট (যেমন ০-এর কম বা ১০০-এর বেশি নম্বর) আটকে রিটার্ন করে দিলে ভেতরের কোডে নেস্টেড পিরামিড জমে না, একে Guard Clause বলে। আধুনিক C++17/23-তে `if (int rem = n % 3; rem == 0)` এভাবে কন্ডিশনের ভেতরেই ভ্যারিয়েবল তৈরি করা যায়, যাতে ওই ভ্যারিয়েবলটি ব্লকের বাইরে গিয়ে ভুল না ঘটায়। একাধিক রেঞ্জ চেক করতে `else if` সিঁড়িতে সবসময় বড় বা কঠোর শর্ত আগে রাখতে হয়, তাহলে প্রথম সত্য শর্তেই কাজ শেষ হয়। আর নির্দিষ্ট কিছু ক্যারেক্টার (`+`, `-`, `*`, `/`) বা স্টেট বেছে নিতে `switch` ব্যবহার করলে কম্পাইলার সুপারফাস্ট জাম্প-টেবিল তৈরি করে। তবে `switch`-এর প্রতিটি `case` শেষে অবশ্যই `break;` দিতে হবে, নইলে Execution নিচের কেসে পড়ে যায় (Fall-through বাগ)। ছোট দুই-পথের সিদ্ধান্তে `(a > b ? a : b)` টার্নারি অপারেটর এক লাইনেই সুন্দর সমাধান দেয়। তবে টার্নারি ব্যবহারের সময় উভয় পাশের ডেটা টাইপ যেন এক থাকে সেদিকে খেয়াল রাখবে। ভালো ব্রাঞ্চিং লিখলে CPU ব্রাঞ্চ প্রেডিক্টরও খুশি থাকে ও কোড বাগ-মুক্ত হয়।',
        everydayExample:
          'রাইড-শেয়ারিং অ্যাপে ডিসকাউন্ট কোড বসালে প্রথমে কোডটি মেয়াদোত্তীর্ণ কি না গার্ড ক্লজ দিয়ে চেক হয়, তারপর `switch` দিয়ে নির্দিষ্ট % ছাড় দেওয়া হয়।',
        keyTakeaways: [
          'C++17/23 `if (init; cond)` দিয়ে অস্থায়ী ভ্যারিয়েবল কেবল ওই `if/else` ব্লকে সীমাবদ্ধ রাখো।',
          '`switch`-এ প্রতিটি `case` শেষে `break;` দিতে ভুলবে না।',
          'টার্নারি অপারেটর `cond ? val1 : val2`-এ দুই পাশের টাইপ সামঞ্জস্যপূর্ণ হতে হয়।',
        ],
      },
    },
    topics: [
      {
        id: 'cpp-ch-6-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Guard Clause & Descending Else-If Grade Ladder',
        englishParagraphs: [
          'Checking invalid bounds (`score < 0 || score > 100`) first avoids deeply nested `else` blocks and makes every subsequent threshold clean.',
          'Because `else if` stops at the first matching condition, `score >= 80` automatically implies `score < 90`.',
        ],
        banglaParagraphs: [
          'শুরুতেই অবৈধ নম্বর আটকে দিয়ে ক্রমান্বয়ে `>= 90` ও `>= 80` যাচাই করলে কোড অনেক পরিষ্কার থাকে।',
          'যেহেতু প্রথম ম্যাচ হওয়া শর্তের পর বাকিগুলো বাদ পড়ে, তাই দুবার সীমা লিখতে হয় না।',
        ],
        memoryDiagram: `score=85 -> invalid? false -> >=90? false -> >=80? TRUE -> "A"`,
        code: `#include <iostream>
using namespace std;

int main() {
    int score = 85;
    if (score < 0 || score > 100) {
        cout << "INVALID\\n";
        return 0;
    }
    if (score >= 90) cout << "A+\\n";
    else if (score >= 80) cout << "A\\n";
    else cout << "Pass/Fail\\n";
    return 0;
}`,
        stdin: '',
        expectedOutput: 'A',
        lineByLine: [
          { lineNumber: 'Line 5', codeSnippet: 'int score = 85;', whatItMeans: 'Initializes sample score variable.', whyItIsThere: 'Provides value for branch routing.', ifDeletedError: 'Compile error: undeclared score.' },
          { lineNumber: 'Line 6', codeSnippet: 'if (score < 0 || score > 100) {', whatItMeans: 'Guard clause rejecting invalid range.', whyItIsThere: 'Keeps grade ladder flat via early return.', ifDeletedError: 'Score 120 receives grade A+.' },
          { lineNumber: 'Line 11', codeSnippet: 'else if (score >= 80) cout << "A\\n";', whatItMeans: 'Matches 80..89 grade band.', whyItIsThere: 'Executes only when >=90 failed.', ifDeletedError: '85 drops to Pass/Fail.' },
        ],
      },
      {
        id: 'cpp-ch-6-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Switch Statement Operator Router + Zero Guard',
        englishParagraphs: [
          'A `switch` statement jumps directly to matching integral or `char` case labels cleanly.',
          'Always place explicit division-by-zero checks inside `case \'/\'` so bad runtime input never crashes with SIGFPE.',
        ],
        banglaParagraphs: [
          'নির্দিষ্ট চিহ্ন বা মেনু নম্বর অনুযায়ী কাজ করতে `switch` সবচেয়ে পরিষ্কার উপায়, আর প্রতিটি কেসের শেষে `break;` অপরিহার্য।',
          '`/` অপারেশনে ভাজক ০ হলে ক্র্যাশ এড়াতে ভেতরে আলাদা `if (b != 0)` চেক রাখা হয়েছে।',
        ],
        memoryDiagram: `cin -> a=18, op='/', b=3 -> case '/' -> 18/3 = 6 -> break`,
        code: `#include <iostream>
using namespace std;

int main() {
    long long a = 0, b = 0;
    char op = '+';
    if (cin >> a >> op >> b) {
        switch (op) {
            case '+': cout << (a + b) << "\\n"; break;
            case '-': cout << (a - b) << "\\n"; break;
            case '*': cout << (a * b) << "\\n"; break;
            case '/':
                if (b != 0) cout << (a / b) << "\\n";
                else cout << "DIV_ZERO\\n";
                break;
            default: cout << "UNKNOWN\\n"; break;
        }
    }
    return 0;
}`,
        stdin: '18 / 3',
        expectedOutput: '6',
        lineByLine: [
          { lineNumber: 'Line 8', codeSnippet: 'switch (op) {', whatItMeans: 'Dispatches directly on character value of op.', whyItIsThere: 'Cleaner than chained == comparisons.', ifDeletedError: 'Syntax error on case labels.' },
          { lineNumber: 'Line 13', codeSnippet: 'if (b != 0) cout << (a / b) << "\\n";', whatItMeans: 'Zero-denominator protection.', whyItIsThere: 'Prevents floating point exception crash.', ifDeletedError: 'Crashes if stdin is "18 / 0".' },
        ],
      },
      {
        id: 'cpp-ch-6-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'C++17/23 if-with-Initializer Shipping Tier Pricer',
        englishParagraphs: [
          'Modern C++ lets you initialize a scoped lookup variable right inside `if (long long diff = limit - w; diff < 0)` so temporary helper variables never leak out.',
          'Combine clean range tiers with `const` bindings for maintainable business rules.',
        ],
        banglaParagraphs: [
          'C++17/23-তে `if`-এর ব্র্যাকেটের ভেতরেই অস্থায়ী ভ্যারিয়েবল তৈরি করে শর্ত যাচাই করা যায়, যা বাইরে অপ্রয়োজনীয় জঞ্জাল জমতে দেয় না।',
          'নিচের কোডটি পার্সেলের ওজন অনুযায়ী ডেলিভারি চার্জ নির্ণয় করে।',
        ],
        memoryDiagram: `w=7 -> w <= 5? false -> w <= 20? TRUE -> cost = 120`,
        code: `#include <iostream>
using namespace std;

int main() {
    if (long long w = 0; cin >> w) {
        if (w <= 0) {
            cout << "INVALID\\n";
        } else {
            long long fee = (w <= 5) ? 60 : (w <= 20 ? 120 : 250);
            cout << "Fee=" << fee << "\\n";
        }
    }
    return 0;
}`,
        stdin: '7',
        expectedOutput: 'Fee=120',
        lineByLine: [
          { lineNumber: 'Line 5', codeSnippet: 'if (long long w = 0; cin >> w) {', whatItMeans: 'Declares w strictly scoped to the if/else block.', whyItIsThere: 'C++17/23 scoped initializer hygiene.', ifDeletedError: 'Requires declaring w outside the if block.' },
        ],
      },
      {
        id: 'cpp-ch-6-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Dangling-Else & Codeforces Watermelon Parity Check',
        englishParagraphs: [
          'In classic Codeforces 4A (Watermelon), beginners write `w % 2 == 0` and forget that `w == 2` splits into `1 + 1` (odd parts), failing on boundary `w = 2`!',
          'Always test smallest valid boundaries (`w > 2 && w % 2 == 0`) alongside explicit braces `{}` on `if / else` blocks.',
        ],
        banglaParagraphs: [
          'বিখ্যাত Watermelon সমস্যায় `w = 2` জোড় সংখ্যা হলেও তাকে দুটি জোড় অংশে ভাগ করা যায় না (১+১ বিজোড়)।',
          'তাই `w > 2 && w % 2 == 0` শর্ত যাচাই করলে এজ-কেস বাগ একেবারে দূর হয়।',
        ],
        memoryDiagram: `w=2 -> (2>2 && 2%2==0) -> NO | w=8 -> YES`,
        code: `#include <iostream>
using namespace std;

int main() {
    long long w = 0;
    if (cin >> w) {
        cout << ((w > 2 && w % 2 == 0) ? "YES" : "NO") << "\\n";
    }
    return 0;
}`,
        stdin: '8',
        expectedOutput: 'YES',
        lineByLine: [
          { lineNumber: 'Line 7', codeSnippet: '(w > 2 && w % 2 == 0) ? "YES" : "NO"', whatItMeans: 'Handles w=2 edge case cleanly alongside even parity.', whyItIsThere: 'Prevents Wrong Answer on boundary input 2.', ifDeletedError: 'Falsely prints YES for w=2.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 1', codeSnippet: '#include <iostream>', whatItMeans: 'Brings std::cout and std::cin stream objects into scope.', whyItIsThere: 'Required for all standard C++ console I/O.', ifDeletedError: 'Compile error: cout was not declared.' },
      { lineNumber: 'Line 2', codeSnippet: 'using namespace std;', whatItMeans: 'Exposes standard library names directly without std:: prefix.', whyItIsThere: 'Keeps concise CP/academy syntax readable.', ifDeletedError: 'Compiler requires std::cout explicitly.' },
      { lineNumber: 'Line 4', codeSnippet: 'int main() {', whatItMeans: 'Main entry point invoked when program boots.', whyItIsThere: 'Mandatory starting function for C++ executables.', ifDeletedError: 'Linker fails: undefined reference to main.' },
      { lineNumber: 'Line 5', codeSnippet: 'int score = 85;', whatItMeans: 'Allocates signed 32-bit score variable on stack.', whyItIsThere: 'Holds numeric input tested by branches.', ifDeletedError: 'Compile error: score undeclared.' },
      { lineNumber: 'Line 6', codeSnippet: 'if (score < 0 || score > 100) {', whatItMeans: 'Guard clause checking out-of-range boundaries first.', whyItIsThere: 'Prevents corrupt values from entering valid grade tiers.', ifDeletedError: 'Invalid scores fall through to normal grades.' },
      { lineNumber: 'Line 10', codeSnippet: 'if (score >= 90) cout << "A+\\n";', whatItMeans: 'Evaluates top threshold before lower grades.', whyItIsThere: 'Ensures descending branch priority.', ifDeletedError: '95 would be graded lower as A.' },
    ],
    dryRunTable: [
      { step: 1, state: 'score = 85', memoryOrStack: 'score=85', note: 'Stack initialized' },
      { step: 2, state: 'Guard check (<0 || >100)', memoryOrStack: 'false', note: 'Inside valid range' },
      { step: 3, state: 'Check score >= 90', memoryOrStack: '85 >= 90 false', note: 'Move to else if' },
      { step: 4, state: 'Check score >= 80', memoryOrStack: '85 >= 80 TRUE', note: 'Outputs "A" & returns 0' },
    ],
    harryBugTraps: [
      { title: 'Forgetting break; Inside switch Cases', brokenCode: 'case 1: cout << "One";\ncase 2: cout << "Two"; break;', fixedCode: 'case 1: cout << "One"; break;\ncase 2: cout << "Two"; break;', whyItBreaks: 'Missing break causes execution to fall into case 2 and print "OneTwo".' },
      { title: 'Ternary Type Mismatch Compile Error', brokenCode: 'auto ans = cond ? 10 : "NO"; // int vs const char*!', fixedCode: 'cout << (cond ? "10" : "NO");', whyItBreaks: 'Both branches of ternary ?: must share or convert to one common type.' },
      { title: 'Semicolon Accidentally Terminating if()', brokenCode: 'if (x < 0); { cout << "Neg"; }', fixedCode: 'if (x < 0) { cout << "Neg"; }', whyItBreaks: 'Trailing ; turns the if body into a no-op, making the block always execute!' },
    ],
    practiceSheet: [
      { id: 'cpp-ch-6-q1', difficulty: 'Easy', title: '1. Sign Classifier', prompt: 'Read integer n and print POSITIVE, NEGATIVE, or ZERO.', banglaHint: 'if / else if / else ব্যবহার করো।', starterCode: `#include <iostream>\nusing namespace std;\nint main() {\n    long long n = 0;\n    if (cin >> n) {\n        if (n > 0) cout << "POSITIVE\\n";\n        else if (n < 0) cout << "NEGATIVE\\n";\n        else cout << "ZERO\\n";\n    }\n    return 0;\n}`, sampleStdin: '-42', expectedOutput: 'NEGATIVE' },
      { id: 'cpp-ch-6-q2', difficulty: 'Easy', title: '2. Maximum of Three Numbers', prompt: 'Read 3 ints and print the maximum using branching.', banglaHint: 'if (b > mx) mx = b; এভাবে তুলনা করো।', starterCode: `#include <iostream>\nusing namespace std;\nint main() {\n    long long a, b, c;\n    if (cin >> a >> b >> c) {\n        long long mx = a;\n        if (b > mx) mx = b;\n        if (c > mx) mx = c;\n        cout << mx << "\\n";\n    }\n    return 0;\n}`, sampleStdin: '12 99 45', expectedOutput: '99' },
      { id: 'cpp-ch-6-q3', difficulty: 'Medium', title: '3. Day Name Switch Dispatcher', prompt: 'Read day 1..3 (1=Mon, 2=Tue, 3=Wed, else INVALID) using switch.', banglaHint: 'প্রতিটি case শেষে break; দাও।', starterCode: `#include <iostream>\nusing namespace std;\nint main() {\n    int d = 0;\n    if (cin >> d) {\n        switch (d) {\n            case 1: cout << "Mon\\n"; break;\n            case 2: cout << "Tue\\n"; break;\n            case 3: cout << "Wed\\n"; break;\n            default: cout << "INVALID\\n"; break;\n        }\n    }\n    return 0;\n}`, sampleStdin: '2', expectedOutput: 'Tue' },
      { id: 'cpp-ch-6-q4', difficulty: 'Medium', title: '4. Valid Triangle Check', prompt: 'Read sides a, b, c and print YES if all positive and sum of any two > third, else NO.', banglaHint: 'সব বাহু ধনাত্মক এবং a+b>c, b+c>a, c+a>b যাচাই করো।', starterCode: `#include <iostream>\nusing namespace std;\nint main() {\n    long long a, b, c;\n    if (cin >> a >> b >> c) {\n        bool ok = a > 0 && b > 0 && c > 0 && a + b > c && b + c > a && c + a > b;\n        cout << (ok ? "YES" : "NO") << "\\n";\n    }\n    return 0;\n}`, sampleStdin: '3 4 5', expectedOutput: 'YES' },
      { id: 'cpp-ch-6-q5', difficulty: 'Hard', title: '5. Watermelon Split Boundary (CF 4A)', prompt: 'Read weight w and print YES if w can split into two positive even parts else NO.', banglaHint: 'w = 2 কেসটি ভুলবে না! শর্ত হবে w > 2 && w % 2 == 0।', starterCode: `#include <iostream>\nusing namespace std;\nint main() {\n    long long w = 0;\n    if (cin >> w) cout << ((w > 2 && w % 2 == 0) ? "YES" : "NO") << "\\n";\n    return 0;\n}`, sampleStdin: '2', expectedOutput: 'NO' },
    ],
    miniBuild: {
      title: 'C++23 Tiered Grade & Guard-Clause Router',
      description: 'Validates numeric boundaries with guard clauses and classifies scores cleanly.',
      banglaGoal: 'গার্ড ক্লজ ও else-if সিঁড়ি দিয়ে নিরাপদ গ্রেড রাউটার তৈরি।',
      combinesChapters: 'Ch 1–6',
      starterCode: `#include <iostream>
using namespace std;

int main() {
    int score = 0;
    if (cin >> score) {
        if (score < 0 || score > 100) cout << "INVALID\\n";
        else if (score >= 90) cout << "A+\\n";
        else if (score >= 80) cout << "A\\n";
        else cout << "PASS\\n";
    }
    return 0;
}`,
      sampleStdin: '92',
      expectedOutput: 'A+',
    },
    starterCode: `#include <iostream>
using namespace std;

int main() {
    int score = 0;
    if (cin >> score) {
        if (score < 0 || score > 100) cout << "INVALID\\n";
        else if (score >= 90) cout << "A+\\n";
        else if (score >= 80) cout << "A\\n";
        else cout << "PASS\\n";
    }
    return 0;
}`,
    sampleStdin: '92',
    expectedSampleOutput: 'A+',
    testCases: [
      { id: 'cpp6-t1', input: '92', expectedOutput: 'A+' },
      { id: 'cpp6-t2', input: '105', expectedOutput: 'INVALID', isHidden: true },
    ],
  },

  7: {
    chapterNumber: 7,
    title: 'C++ Chapter 7 (C++23): Entry & Exit Controlled Loops (for, while, do-while)',
    banglaTitle: 'C++ অধ্যায় ৭ (C++23): লুপ মাস্টারি (for, while, do-while ও রেঞ্জ লুপ)',
    subtitle: 'Loop invariants, pre-increment ++i, range-based for, break/continue flow, and digit/prime loops.',
    zeroIntuition: {
      plainEnglishStory:
        'Loops automate repetition so 5 lines of C++ can process 10^6 items in milliseconds. Entry-controlled loops (`for` and `while`) check the continuation condition BEFORE running the loop body—ideal when inputs might be empty (`n = 0`). Exit-controlled `do { ... } while (cond);` executes at least once before testing.\n\nIn C++, always watch loop invariants: initialize accumulators (`sum = 0`, `prod = 1LL`) before entering the loop, guard termination conditions so variables strictly approach the exit state, and use `break` / `continue` cleanly to exit early or skip irrelevant steps.',
      asciiFlowchart: `  [ Entry-Controlled (for / while) ]      [ Exit-Controlled (do-while) ]
         |                                      |
         v                                      v
  < cond true? > --NO--> Exit           [ Run Body At Least Once ]
         |                                      |
        YES                                     v
         v                              < cond true? > --YES--> Loop back
  [ Body + Update ] ---> back to check          |
                                               NO --> Exit`,
      pseudocode: [
        '1. INITIALIZE accumulators (sum = 0, digits = 0) before loop',
        '2. ENTRY-CONTROLLED while/for checks condition prior to step',
        '3. ADVANCE state strictly toward termination each iteration',
        '4. USE do-while when minimum 1 pass is guaranteed (e.g. digit count of 0)',
        '5. EMIT computed aggregate after loop terminates',
      ],
      banglaZeroToHero: {
        analogyTitle: 'দৌড়ের ট্র্যাকের ল্যাপ কাউন্টার ও শূন্য-বার ঝুঁকি',
        explanation:
          'কল্পনা করো তুমি ৪০০ মিটারের একটি মাঠে দৌড়াচ্ছো এবং তোমার হাতে একটি ডিজিটাল ল্যাপ কাউন্টার আছে। C++-এ `for` এবং `while` লুপ হলো এন্ট্রি-কন্ট্রোলড লুপ—অর্থাৎ মাঠে নামার আগেই শর্ত যাচাই হয়, তাই শুরুতেই শর্ত মিথ্যা হলে একবারও লুপ চলে না। যখন নির্দিষ্ট সংখ্যক ধাপ যেমন `0` থেকে `n-1` পর্যন্ত যেতে হয়, তখন `for (int i = 0; i < n; ++i)` সেরা। অন্যদিকে কতবার ঘুরবে তা আগে থেকে জানা না থাকলে—যেমন একটি সংখ্যার অঙ্ক গুণতে `while (n > 0)` ব্যবহার করা হয়। তবে `do-while` হলো এক্সিট-কন্ট্রোলড লুপ যা শর্ত দেখার আগেই অন্তত একবার কাজটি করে, তাই `n = 0` দিলেও এর ভেতর ১টি অঙ্ক পাওয়া যায়! লুপ লেখার সময় দুটি ভয়ংকর ভুল এড়িয়ে চলবে: ১) লুপের ভেতর যোগফল বা গুণফল রাখার ভ্যারিয়েবল লুপের বাইরে ইনিশিয়ালাইজ করতে ভুলে যাওয়া, ২) আপডেট স্টেটমেন্ট না দিয়ে অসীম লুপ (Infinite Loop) বানিয়ে ফেলা। তাছাড়া প্রি-ইনক্রিমেন্ট `++i` ব্যবহার করলে অপ্রয়োজনীয় টেম্পোরারি কপি তৈরি হয় না। কনটেস্টে `continue` দিয়ে অবাঞ্ছিত ধাপ এড়ানো এবং `break` দিয়ে উত্তর পাওয়া মাত্রই লুপ থামিয়ে সময় বাঁচানো দারুণ কৌশল।',
        everydayExample:
          'এটিএম মেশিনে পিন ভুল দিলে আবার সুযোগ দেওয়ার লুপ `do-while`—অন্তত একবার পিন নিতেই হবে!',
        keyTakeaways: [
          'কতবার চলবে জানা থাকলে `for`, আর কন্ডিশন-নির্ভর হলে `while` ব্যবহার করো।',
          '`do { ... } while (cond);`-এর শেষে অবশ্যই সেমিকোলন (;) দিতে হয়।',
          'অসীম লুপ এড়াতে প্রতি ধাপে লুপ ভ্যারিয়েবল টার্গেটের দিকে এগোচ্ছে কি না নিশ্চিত করো।',
        ],
      },
    },
    topics: [
      {
        id: 'cpp-ch-7-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Standard for Loop & Running Accumulator',
        englishParagraphs: [
          'The classic `for (init; condition; update)` keeps loop control centralized in one header line.',
          'Initializing `long long sum = 0;` outside the loop prevents resetting partial sums and guards against 32-bit overflow.',
        ],
        banglaParagraphs: [
          'কোনো ধারার যোগফল বের করতে লুপের বাইরে `sum = 0` রেখে প্রতিটি ধাপে `sum += i` করা সবচেয়ে নিরাপদ পদ্ধতি।',
          'এখানে `1` থেকে `5` পর্যন্ত সংখ্যার যোগফল লুপের মাধ্যমে নির্ণয় করা হয়েছে।',
        ],
        memoryDiagram: `i=1..5 -> sum: 0 -> 1 -> 3 -> 6 -> 10 -> 15 -> stop at i=6`,
        code: `#include <iostream>
using namespace std;

int main() {
    long long sum = 0;
    for (int i = 1; i <= 5; ++i) {
        sum += i;
    }
    cout << "sum=" << sum << "\\n";
    return 0;
}`,
        stdin: '',
        expectedOutput: 'sum=15',
        lineByLine: [
          { lineNumber: 'Line 5', codeSnippet: 'long long sum = 0;', whatItMeans: 'Initializes 64-bit accumulator before loop begins.', whyItIsThere: 'Avoids garbage values and 32-bit overflow.', ifDeletedError: 'Compile error: sum undeclared.' },
          { lineNumber: 'Line 6', codeSnippet: 'for (int i = 1; i <= 5; ++i) {', whatItMeans: 'Repeats body for i = 1, 2, 3, 4, 5.', whyItIsThere: 'Pre-increment ++i avoids extra temporary copy.', ifDeletedError: 'Loop never executes.' },
          { lineNumber: 'Line 7', codeSnippet: 'sum += i;', whatItMeans: 'Adds current loop counter into accumulator.', whyItIsThere: 'Advances partial sum invariant each iteration.', ifDeletedError: 'Outputs sum=0.' },
        ],
      },
      {
        id: 'cpp-ch-7-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Digit Counter & Reversal Using while / do-while',
        englishParagraphs: [
          'Using `do { count++; n /= 10; } while (n > 0);` guarantees input `0` accurately counts as `1` digit instead of `0` digits!',
          'Taking `abs(n)` first ensures negative numbers work identically.',
        ],
        banglaParagraphs: [
          'সাধারণ `while (n > 0)` দিলে ইনপুট `0` হলে লুপ একবারও চলে না এবং ০ অঙ্ক দেখায়! কিন্তু `do-while` অন্তত একবার চলে বলে সঠিক উত্তর `1` আসে।',
          'প্রতি ধাপে `n /= 10` করে শেষ অঙ্কটি ফেলে দেওয়া হয়।',
        ],
        memoryDiagram: `n=7042 -> do: cnt=1(704) -> cnt=2(70) -> cnt=3(7) -> cnt=4(0) -> exit`,
        code: `#include <iostream>
using namespace std;

int main() {
    long long n = 0;
    if (cin >> n) {
        long long x = (n < 0) ? -n : n;
        int digits = 0;
        do {
            ++digits;
            x /= 10;
        } while (x > 0);
        cout << "digits=" << digits << "\\n";
    }
    return 0;
}`,
        stdin: '7042',
        expectedOutput: 'digits=4',
        lineByLine: [
          { lineNumber: 'Line 9', codeSnippet: 'do {', whatItMeans: 'Starts exit-controlled loop running at least once.', whyItIsThere: 'Handles input 0 cleanly as 1 digit.', ifDeletedError: 'Input 0 outputs digits=0.' },
          { lineNumber: 'Line 11', codeSnippet: 'x /= 10;', whatItMeans: 'Strips rightmost decimal digit each step.', whyItIsThere: 'Guarantees loop converges to 0 in O(log10 n).', ifDeletedError: 'Infinite loop TLE!' },
        ],
      },
      {
        id: 'cpp-ch-7-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'O(sqrt(n)) Prime Checker With Early Break',
        englishParagraphs: [
          'Testing divisors `d` only up to `d * d <= n` (written `d <= n / d` to avoid overflow!) cuts prime checking from 10^9 steps down to ~31,622 steps!',
          'Once a factor is found, `break` stops the loop immediately.',
        ],
        banglaParagraphs: [
          'কোনো সংখ্যা মৌলিক (Prime) কি না তা যাচাই করতে `d * d <= n` পর্যন্ত পরীক্ষা করাই যথেষ্ট—এতে ১০^৯ সংখ্যাও ১ মিলিসেকেন্ডে চেক হয়!',
          'ওভারফ্লো এড়াতে `d <= n / d` বা `1LL * d * d <= n` লেখা হয় এবং গুণনীয়ক পাওয়ামাত্র `break` করে দেওয়া হয়।',
        ],
        memoryDiagram: `n=29 -> d=2..5 (5*5=25<=29) -> no divisor found -> PRIME`,
        code: `#include <iostream>
using namespace std;

int main() {
    long long n = 0;
    if (cin >> n) {
        bool prime = (n >= 2);
        for (long long d = 2; d <= n / d; ++d) {
            if (n % d == 0) {
                prime = false;
                break;
            }
        }
        cout << (prime ? "PRIME" : "COMPOSITE") << "\\n";
    }
    return 0;
}`,
        stdin: '29',
        expectedOutput: 'PRIME',
        lineByLine: [
          { lineNumber: 'Line 8', codeSnippet: 'for (long long d = 2; d <= n / d; ++d) {', whatItMeans: 'Checks divisors up to sqrt(n) without float inaccuracy or multiplication overflow.', whyItIsThere: 'O(sqrt(n)) efficiency for 10^12+ inputs.', ifDeletedError: 'O(n) loop times out on large primes.' },
        ],
      },
      {
        id: 'cpp-ch-7-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Running Prefix Sum & Early-Exit Odd Filter (continue)',
        englishParagraphs: [
          'Using `continue;` skips even numbers cleanly without nesting the remaining loop body inside another `if` level.',
          'Always compute `sum` as `long long` when reading up to 10^5 large integers.',
        ],
        banglaParagraphs: [
          'লুপের ভেতরে কিছু শর্ত বাদ দিতে হলে `continue;` ব্যবহার করলে কোডের গভীরতা কমে এবং পড়া সহজ হয়।',
          'নিচের CP প্যাটার্নে কেবল বিজোড় সংখ্যার যোগফল বের করা হয়েছে।',
        ],
        memoryDiagram: `arr=[2,5,8,7,3] -> skip 2,8 via continue -> odd_sum = 5+7+3 = 15`,
        code: `#include <iostream>
using namespace std;

int main() {
    int n = 0;
    if (cin >> n) {
        long long odd_sum = 0, x = 0;
        for (int i = 0; i < n && cin >> x; ++i) {
            if (x % 2 == 0) continue;
            odd_sum += x;
        }
        cout << odd_sum << "\\n";
    }
    return 0;
}`,
        stdin: '5\n2 5 8 7 3',
        expectedOutput: '15',
        lineByLine: [
          { lineNumber: 'Line 9', codeSnippet: 'if (x % 2 == 0) continue;', whatItMeans: 'Skips remaining body for even values and jumps to ++i.', whyItIsThere: 'Keeps filtering flat and readable.', ifDeletedError: 'Even numbers pollute odd_sum.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 1', codeSnippet: '#include <iostream>', whatItMeans: 'Includes standard C++ I/O streams.', whyItIsThere: 'Needed for cout output.', ifDeletedError: 'Compile error: undeclared cout.' },
      { lineNumber: 'Line 2', codeSnippet: 'using namespace std;', whatItMeans: 'Brings std symbols into unqualified scope.', whyItIsThere: 'Allows writing cout directly.', ifDeletedError: 'Requires std::cout.' },
      { lineNumber: 'Line 4', codeSnippet: 'int main() {', whatItMeans: 'Program execution entry point.', whyItIsThere: 'Starts main stack frame.', ifDeletedError: 'Linker fails.' },
      { lineNumber: 'Line 5', codeSnippet: 'long long sum = 0;', whatItMeans: 'Initializes 64-bit accumulator outside loop.', whyItIsThere: 'Preserves running total across iterations.', ifDeletedError: 'Resetting inside loop would lose prior steps.' },
      { lineNumber: 'Line 6', codeSnippet: 'for (int i = 1; i <= 5; ++i) {', whatItMeans: 'Entry-controlled loop iterating 1 through 5.', whyItIsThere: 'Repeats summation deterministically 5 times.', ifDeletedError: 'Only single pass runs.' },
      { lineNumber: 'Line 7', codeSnippet: 'sum += i;', whatItMeans: 'Accumulates loop variable i into sum.', whyItIsThere: 'Updates total each step.', ifDeletedError: 'sum stays 0.' },
    ],
    dryRunTable: [
      { step: 1, state: 'Before loop', memoryOrStack: 'sum=0, i=1', note: 'Condition 1<=5 true' },
      { step: 2, state: 'Iter 1 & 2', memoryOrStack: 'sum=3, i=3', note: '0+1+2=3' },
      { step: 3, state: 'Iter 3, 4 & 5', memoryOrStack: 'sum=15, i=6', note: 'Condition 6<=5 false' },
      { step: 4, state: 'Loop exits', memoryOrStack: 'stdout="sum=15"', note: 'Clean exit' },
    ],
    harryBugTraps: [
      { title: 'Trailing Semicolon After while/for Header', brokenCode: 'int i = 0; while (i < 5); { ++i; }', fixedCode: 'int i = 0; while (i < 5) { ++i; }', whyItBreaks: 'The semicolon creates an empty loop body that hangs forever (TLE) because i never increments!' },
      { title: 'Floating Point Loop Counter Drift', brokenCode: 'for (double x = 0.0; x != 1.0; x += 0.1)', fixedCode: 'for (int i = 0; i < 10; ++i)', whyItBreaks: '0.1 cannot be stored exactly in binary; x skips 1.0 and loops infinitely!' },
      { title: 'Off-By-One Loop Bound (<= vs <)', brokenCode: 'for (int i = 0; i <= n; ++i) // runs n+1 times!', fixedCode: 'for (int i = 0; i < n; ++i)', whyItBreaks: '0-based iteration to <= n reads one extra nonexistent element or causes out-of-bounds crash.' },
    ],
    practiceSheet: [
      { id: 'cpp-ch-7-q1', difficulty: 'Easy', title: '1. Factorial via Loop', prompt: 'Read n (0..20) and print n! as unsigned/signed 64-bit integer.', banglaHint: 'long long f = 1; নিয়ে 2..n পর্যন্ত গুণ করো।', starterCode: `#include <iostream>\nusing namespace std;\nint main() {\n    int n = 0;\n    if (cin >> n) {\n        long long f = 1;\n        for (int i = 2; i <= n; ++i) f *= i;\n        cout << f << "\\n";\n    }\n    return 0;\n}`, sampleStdin: '5', expectedOutput: '120' },
      { id: 'cpp-ch-7-q2', difficulty: 'Easy', title: '2. Reverse Digits of Integer', prompt: 'Read non-negative integer n and print its reversed integer (e.g. 1230 -> 321).', banglaHint: 'rev = rev * 10 + (n % 10); এবং n /= 10; করো।', starterCode: `#include <iostream>\nusing namespace std;\nint main() {\n    long long n = 0;\n    if (cin >> n) {\n        long long rev = 0;\n        do { rev = rev * 10 + (n % 10); n /= 10; } while (n > 0);\n        cout << rev << "\\n";\n    }\n    return 0;\n}`, sampleStdin: '1234', expectedOutput: '4321' },
      { id: 'cpp-ch-7-q3', difficulty: 'Medium', title: '3. Sum of Digits', prompt: 'Read non-negative integer n and print sum of its decimal digits.', banglaHint: 'while (n > 0) লুপে n % 10 যোগ করো।', starterCode: `#include <iostream>\nusing namespace std;\nint main() {\n    long long n = 0, s = 0;\n    if (cin >> n) {\n        while (n > 0) { s += n % 10; n /= 10; }\n        cout << s << "\\n";\n    }\n    return 0;\n}`, sampleStdin: '9085', expectedOutput: '22' },
      { id: 'cpp-ch-7-q4', difficulty: 'Medium', title: '4. Even-Indexed Filtered Max', prompt: 'Read n followed by n ints; print maximum among even numbers or -1 if none.', banglaHint: 'বেজোড় হলে continue করো, প্রথম জোড়ের জন্য ট্র্যাকিং রাখো।', starterCode: `#include <iostream>\nusing namespace std;\nint main() {\n    int n = 0; cin >> n;\n    long long mx = -1, x = 0;\n    bool found = false;\n    for (int i = 0; i < n && cin >> x; ++i) {\n        if (x % 2 != 0) continue;\n        if (!found || x > mx) { mx = x; found = true; }\n    }\n    cout << (found ? mx : -1) << "\\n";\n    return 0;\n}`, sampleStdin: '5\n3 10 7 4 9', expectedOutput: '10' },
      { id: 'cpp-ch-7-q5', difficulty: 'Hard', title: '5. Fast O(sqrt(n)) Prime Test', prompt: 'Read long long n and print PRIME or COMPOSITE.', banglaHint: 'd <= n / d লুপ ও break ব্যবহার করো।', starterCode: `#include <iostream>\nusing namespace std;\nint main() {\n    long long n = 0;\n    if (cin >> n) {\n        bool ok = n >= 2;\n        for (long long d = 2; d <= n / d; ++d) if (n % d == 0) { ok = false; break; }\n        cout << (ok ? "PRIME" : "COMPOSITE") << "\\n";\n    }\n    return 0;\n}`, sampleStdin: '97', expectedOutput: 'PRIME' },
    ],
    miniBuild: {
      title: 'C++23 Digit Counter & Loop Invariant Engine',
      description: 'Counts digits using exit-controlled do-while so even 0 produces accurate results.',
      banglaGoal: 'do-while লুপ দিয়ে নির্ভুল অঙ্ক-গণনা ইঞ্জিন তৈরি।',
      combinesChapters: 'Ch 1–7',
      starterCode: `#include <iostream>
using namespace std;

int main() {
    long long n = 0;
    if (cin >> n) {
        long long x = (n < 0) ? -n : n;
        int digits = 0;
        do { ++digits; x /= 10; } while (x > 0);
        cout << "digits=" << digits << "\\n";
    }
    return 0;
}`,
      sampleStdin: '7042',
      expectedOutput: 'digits=4',
    },
    starterCode: `#include <iostream>
using namespace std;

int main() {
    long long n = 0;
    if (cin >> n) {
        long long x = (n < 0) ? -n : n;
        int digits = 0;
        do { ++digits; x /= 10; } while (x > 0);
        cout << "digits=" << digits << "\\n";
    }
    return 0;
}`,
    sampleStdin: '7042',
    expectedSampleOutput: 'digits=4',
    testCases: [
      { id: 'cpp7-t1', input: '7042', expectedOutput: 'digits=4' },
      { id: 'cpp7-t2', input: '0', expectedOutput: 'digits=1', isHidden: true },
    ],
  },

  8: {
    chapterNumber: 8,
    title: 'C++ Chapter 8 (C++23): Nested Loops & Star/Number Pattern Printing Mastery',
    banglaTitle: 'C++ অধ্যায় ৮ (C++23): নেস্টেড লুপ ও স্টার/সংখ্যা প্যাটার্ন মাস্টারি',
    subtitle: '2D row-column grid thinking, hollow borders, space-padded pyramids, Pascal/number grids, and O(N*M) bounds.',
    zeroIntuition: {
      plainEnglishStory:
        'Whenever you print grids, matrices, or geometric shapes, ONE loop is not enough: an outer loop walks row by row (`r = 0..R-1`), while an inner loop builds every column (`c = 0..C-1`) inside that row before emitting `"\\n"`. Mastering `(r, c)` coordinate predicates teaches the exact mental model needed later for 2D dynamic programming tables and graph adjacency matrices.\n\nInstead of memorizing random formulas, break every pattern into pure geometry: number of rows, leading spaces per row, stars/digits per row, and border conditions (`r == 0 || r == n-1 || c == 0 || c == n-1`). Use `std::string(count, \'*\')` in C++ when repeating uniform characters cleanly!',
      asciiFlowchart: `  [ Outer Loop: row r = 0 .. N-1 ]
         |
         v
  [ Inner Loop A: leading spaces ] ---> [ Inner Loop B: symbols/digits ]
         |
         v
  [ Emit "\\n" ] ---> Advance to next row (Total work: O(N^2))`,
      pseudocode: [
        '1. READ dimension N (and optional M columns)',
        '2. LOOP outer row index r from 0 to N - 1',
        '3. LOOP inner spaces (N - 1 - r) then active cells',
        '4. APPLY border condition (r==0 || r==N-1 || c==0 || c==M-1) for hollow shapes',
        '5. EMIT "\\n" strictly at the end of every outer row',
      ],
      banglaZeroToHero: {
        analogyTitle: 'এক্সেল শিটের সারি-কলাম ও স্থানাঙ্ক জ্যামিতি',
        explanation:
          'স্টার বা সংখ্যার প্যাটার্ন দেখে মুখস্থ করার কোনো দরকার নেই—প্রতিটি প্যাটার্নকে একটি ২ডি গ্রিড বা এক্সেল শিটের সারি (`r`) ও কলাম (`c`) হিসেবে কল্পনা করো! বাইরের লুপটি প্রতিবার একটি নতুন সারি শুরু করে আর ভেতরের লুপটি সেই সারির বাম থেকে ডান দিকে প্রতিটি কলাম পূরণ করে। পুরো সারি শেষ হলে একবার `"\\n"` দিয়ে পরের লাইনে নামতে হয়। পিরামিডের মতো প্যাটার্নে প্রথমে `(n - 1 - r)` সংখ্যক ফাঁকা স্পেস প্রিন্ট করতে হয়, তারপর `(2 * r + 1)` সংখ্যক তারা প্রিন্ট হয়। আবার ফাঁপা আয়তক্ষেত্র বা বর্ডার তৈরি করতে চারটি দেয়ালের শর্ত `r == 0 || r == R-1 || c == 0 || c == C-1` যাচাই করলেই মাঝখানটা খালি থাকে! আধুনিক C++-এ `string(k, \'*\')` লিখে ভেতরের একটি লুপ ছাড়াই সরাসরি `k`-টি তারা বা স্পেস তৈরি করা যায়। তবে কোডের পারফরম্যান্স মনে রাখা জরুরি—দুটো নেস্টেড লুপ `N` পর্যন্ত ঘুরলে মোট কাজ হয় `O(N^2)`। তাই `N <= 2000` হলে সেকেন্ডের ভেতর চলে, কিন্তু `N = 10^5` হলে নেস্টেড লুপ কখনোই ব্যবহার করা যাবে না। এই অধ্যায়ের কৌশলগুলোই পরবর্তীতে 2D ম্যাট্রিক্স, ইমেজ ফিল্টার এবং ডায়নামিক প্রোগ্রামিং টেবিল বুঝতে তোমাকে সুপারপাওয়ার দেবে।',
        everydayExample:
          'সিনেমা হলের সিট নম্বর যেমন (সারি r, সিট c) দিয়ে চিহ্নিত থাকে, নেস্টেড লুপের প্রতি ধাপ ঠিক তেমন একটি আসন প্রিন্ট করে।',
        keyTakeaways: [
          'প্যাটার্ন মুখস্থ না করে প্রতিটি সারিতে স্পেস ও চিহ্নের গাণিতিক সম্পর্ক বের করো।',
          'ফাঁপা বর্ডার শর্ত: `r == 0 || r == R-1 || c == 0 || c == C-1`।',
          'C++-এ `string(k, \'*\')` দিয়ে এক লাইনে `k`-সংখ্যক একই অক্ষর পাওয়া যায়।',
        ],
      },
    },
    topics: [
      {
        id: 'cpp-ch-8-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Right-Angled Star Triangle & Coordinate Grid',
        englishParagraphs: [
          'For row `r = 1..4`, printing `r` stars inside the inner loop builds an ascending staircase cleanly.',
          'Emitting `"\\n"` right after the inner loop terminates ensures each row sits on its own line.',
        ],
        banglaParagraphs: [
          'বাইরের লুপ ১ থেকে ৪ পর্যন্ত প্রতিটি সারি নির্দেশ করে এবং ভেতরের লুপ `c <= r` পর্যন্ত `*` প্রিন্ট করে সিঁড়ির মতো ত্রিভুজ বানায়।',
          'প্রতি সারি শেষে `"\\n"` দেওয়া বাধ্যতামূলক।',
        ],
        memoryDiagram: `r=1 -> "*" | r=2 -> "**" | r=3 -> "***" | r=4 -> "****"`,
        code: `#include <iostream>
using namespace std;

int main() {
    for (int r = 1; r <= 4; ++r) {
        for (int c = 1; c <= r; ++c) {
            cout << '*';
        }
        cout << "\\n";
    }
    return 0;
}`,
        stdin: '',
        expectedOutput: '*\n**\n***\n****',
        lineByLine: [
          { lineNumber: 'Line 5', codeSnippet: 'for (int r = 1; r <= 4; ++r) {', whatItMeans: 'Outer loop controlling row index 1..4.', whyItIsThere: 'Generates 4 vertical lines.', ifDeletedError: 'Only single flat line prints.' },
          { lineNumber: 'Line 6', codeSnippet: 'for (int c = 1; c <= r; ++c) {', whatItMeans: 'Inner loop dependent on outer row r.', whyItIsThere: 'Emits r stars on row r.', ifDeletedError: 'Star count stays fixed instead of growing.' },
          { lineNumber: 'Line 9', codeSnippet: 'cout << "\\n";', whatItMeans: 'Advances cursor to next row once inner loop ends.', whyItIsThere: 'Separates horizontal rows visually.', ifDeletedError: 'All stars collapse into "**********".' },
        ],
      },
      {
        id: 'cpp-ch-8-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Centered Pyramid Using Leading Spaces + Odd Stars',
        englishParagraphs: [
          'On row `r` (0-indexed from `0` to `n-1`), emit `n - 1 - r` spaces first so the `2 * r + 1` stars align symmetrically around the vertical axis.',
          'Using `string(spaces, \' \')` avoids extra inner boilerplate while staying `O(n^2)`.',
        ],
        banglaParagraphs: [
          '`r` তম সারিতে বামে `n - 1 - r` সংখ্যক স্পেস এবং এরপর `2 * r + 1` সংখ্যক তারা দিলে নিখুঁত পিরামিড তৈরি হয়।',
          'ডান পাশে অতিরিক্ত ট্রেলিং স্পেস না দেওয়ায় অনলাইন জাজে আউটপুট নিখুঁত থাকে।',
        ],
        memoryDiagram: `n=3: r=0 -> "  *" | r=1 -> " ***" | r=2 -> "*****"`,
        code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    int n = 0;
    if (cin >> n) {
        for (int r = 0; r < n; ++r) {
            cout << string(n - 1 - r, ' ') << string(2 * r + 1, '*') << "\\n";
        }
    }
    return 0;
}`,
        stdin: '3',
        expectedOutput: '  *\n ***\n*****',
        lineByLine: [
          { lineNumber: 'Line 9', codeSnippet: "string(n - 1 - r, ' ') << string(2 * r + 1, '*')", whatItMeans: 'Constructs exact leading indentation and centered star count.', whyItIsThere: 'Symmetrical triangle without trailing spaces.', ifDeletedError: 'Stars left-align instead of forming pyramid.' },
        ],
      },
      {
        id: 'cpp-ch-8-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Hollow Rectangular Frame Using Boundary Predicate',
        englishParagraphs: [
          'UI canvas renderers draw borders by testing whether cell `(r, c)` touches any outer edge: `r == 0 || r == rows - 1 || c == 0 || c == cols - 1`.',
          'Interior cells receive a space (`\' \'`) character.',
        ],
        banglaParagraphs: [
          'কনসোল বক্স বা গেমের বাউন্ডারি আঁকতে চার প্রান্তের শর্ত `r == 0 || r == R-1 || c == 0 || c == C-1` যাচাই করে `#` আর ভেতরে স্পেস বসানো হয়।',
          'একই লজিক ২ডি গেম ম্যাপ ও গ্রিডে ব্যাপকভাবে ব্যবহৃত হয়।',
        ],
        memoryDiagram: `3x4 grid -> borders '#' | center cells (1,1),(1,2) -> ' '`,
        code: `#include <iostream>
using namespace std;

int main() {
    int rows = 0, cols = 0;
    if (cin >> rows >> cols) {
        for (int r = 0; r < rows; ++r) {
            for (int c = 0; c < cols; ++c) {
                bool edge = (r == 0 || r == rows - 1 || c == 0 || c == cols - 1);
                cout << (edge ? '#' : ' ');
            }
            cout << "\\n";
        }
    }
    return 0;
}`,
        stdin: '3 4',
        expectedOutput: '####\n#  #\n####',
        lineByLine: [
          { lineNumber: 'Line 9', codeSnippet: 'bool edge = (r == 0 || r == rows - 1 || c == 0 || c == cols - 1);', whatItMeans: 'Identifies perimeter coordinates cleanly.', whyItIsThere: 'Draws hollow box without separate edge loops.', ifDeletedError: 'Prints solid filled block instead of hollow frame.' },
        ],
      },
      {
        id: 'cpp-ch-8-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'O(N*M) Multiplication Grid & Variable Reuse Trap',
        englishParagraphs: [
          'Never reuse the outer loop variable `i` inside an inner loop—doing `for (int i = ...)` in nested scopes causes subtle bugs or infinite loops!',
          'Below we compute an `n x n` coordinate sum/product cleanly and watch trailing spaces with `c + 1 < n`.',
        ],
        banglaParagraphs: [
          'বাইরের লুপ ও ভেতরের লুপে কখনোই একই কাউন্টার নাম (`i`) ব্যবহার করবে না—সবসময় `r` ও `c` বা `i` ও `j` আলাদা রাখবে!',
          'পাশাপাশি প্রতিটি সারির শেষ সংখ্যার পর অতিরিক্ত স্পেস এড়াতে কন্ডিশনাল স্পেস দেওয়া হয়েছে।',
        ],
        memoryDiagram: `n=3 -> r=1..3, c=1..3 -> "1 2 3\\n2 4 6\\n3 6 9"`,
        code: `#include <iostream>
using namespace std;

int main() {
    int n = 0;
    if (cin >> n) {
        for (int r = 1; r <= n; ++r) {
            for (int c = 1; c <= n; ++c) {
                if (c > 1) cout << ' ';
                cout << (r * c);
            }
            cout << "\\n";
        }
    }
    return 0;
}`,
        stdin: '3',
        expectedOutput: '1 2 3\n2 4 6\n3 6 9',
        lineByLine: [
          { lineNumber: 'Line 9', codeSnippet: 'if (c > 1) cout << \' \';', whatItMeans: 'Emits separator space before columns 2..n only.', whyItIsThere: 'Eliminates trailing whitespace on line endings.', ifDeletedError: 'Output lines merge like "123" or leave trailing space.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 1', codeSnippet: '#include <iostream>', whatItMeans: 'Includes std::cout output stream.', whyItIsThere: 'Needed for emitting pattern characters.', ifDeletedError: 'Compile error: cout undeclared.' },
      { lineNumber: 'Line 2', codeSnippet: 'using namespace std;', whatItMeans: 'Exposes cout directly.', whyItIsThere: 'Concise stream formatting.', ifDeletedError: 'Requires std::cout.' },
      { lineNumber: 'Line 4', codeSnippet: 'int main() {', whatItMeans: 'Starts program execution.', whyItIsThere: 'OS entry function.', ifDeletedError: 'Linker fails.' },
      { lineNumber: 'Line 5', codeSnippet: 'for (int r = 1; r <= 4; ++r) {', whatItMeans: 'Outer loop iterating vertically over 4 rows.', whyItIsThere: 'Establishes row index r.', ifDeletedError: 'Triangle collapses into 1 row.' },
      { lineNumber: 'Line 6', codeSnippet: 'for (int c = 1; c <= r; ++c) {', whatItMeans: 'Inner loop running r columns wide.', whyItIsThere: 'Matches star count to current row index.', ifDeletedError: 'Draws square instead of triangle.' },
      { lineNumber: 'Line 9', codeSnippet: 'cout << "\\n";', whatItMeans: 'Breaks line after completing row r.', whyItIsThere: 'Prevents all rows merging onto one line.', ifDeletedError: 'Emits single unbroken line **********.' },
    ],
    dryRunTable: [
      { step: 1, state: 'r = 1', memoryOrStack: 'c=1 -> "*"', note: 'Newline emitted' },
      { step: 2, state: 'r = 2', memoryOrStack: 'c=1..2 -> "**"', note: 'Newline emitted' },
      { step: 3, state: 'r = 3', memoryOrStack: 'c=1..3 -> "***"', note: 'Newline emitted' },
      { step: 4, state: 'r = 4', memoryOrStack: 'c=1..4 -> "****"', note: '4 rows finished' },
    ],
    harryBugTraps: [
      { title: 'Reusing Same Loop Counter i Inside Nested Loop', brokenCode: 'for (int i = 0; i < n; i++) for (int i = 0; i < n; i++) ...', fixedCode: 'for (int r = 0; r < n; r++) for (int c = 0; c < n; c++) ...', whyItBreaks: 'Shadowing outer variable i causes confusion and corrupts updates if declared identically.' },
      { title: 'Forgetting Newline Inside Outer Loop', brokenCode: 'for (int r=0;r<3;r++) for (int c=0;c<3;c++) cout << "*";', fixedCode: 'for (int r=0;r<3;r++) { for (int c=0;c<3;c++) cout << "*"; cout << "\\n"; }', whyItBreaks: 'Without outer-loop newline, 2D shapes flatten into a single 1D strip!' },
      { title: 'Running O(N^2) Nested Loop When N = 10^5', brokenCode: 'for(int i=0;i<100000;i++) for(int j=0;j<100000;j++) ... // 10^10 ops!', fixedCode: 'Limit N^2 nested loops to N <= 3000; use math/hashing for N = 10^5.', whyItBreaks: '10^10 operations take ~100 seconds -> guaranteed Time Limit Exceeded (TLE).' },
    ],
    practiceSheet: [
      { id: 'cpp-ch-8-q1', difficulty: 'Easy', title: '1. Solid Rectangle R x C', prompt: 'Read R and C; print R rows each containing C "*" characters.', banglaHint: 'string(C, \'*\') অথবা দুটো লুপ ব্যবহার করো।', starterCode: `#include <iostream>\n#include <string>\nusing namespace std;\nint main() {\n    int r = 0, c = 0;\n    if (cin >> r >> c) for (int i = 0; i < r; ++i) cout << string(c, '*') << "\\n";\n    return 0;\n}`, sampleStdin: '2 4', expectedOutput: '****\n****' },
      { id: 'cpp-ch-8-q2', difficulty: 'Easy', title: '2. Inverted Star Triangle', prompt: 'Read n and print descending stars from n down to 1.', banglaHint: 'n থেকে 1 পর্যন্ত লুপ চালাও।', starterCode: `#include <iostream>\n#include <string>\nusing namespace std;\nint main() {\n    int n = 0; if (cin >> n) for (int r = n; r >= 1; --r) cout << string(r, '*') << "\\n";\n    return 0;\n}`, sampleStdin: '3', expectedOutput: '***\n**\n*' },
      { id: 'cpp-ch-8-q3', difficulty: 'Medium', title: '3. Sequential Number Triangle', prompt: 'Read n and print rows 1..n where row r prints 1..r without spaces.', banglaHint: 'ভেতরের লুপ 1 থেকে r পর্যন্ত c প্রিন্ট করবে।', starterCode: `#include <iostream>\nusing namespace std;\nint main() {\n    int n = 0;\n    if (cin >> n) for (int r = 1; r <= n; ++r) { for (int c = 1; c <= r; ++c) cout << c; cout << "\\n"; }\n    return 0;\n}`, sampleStdin: '3', expectedOutput: '1\n12\n123' },
      { id: 'cpp-ch-8-q4', difficulty: 'Medium', title: '4. Hollow Square Border', prompt: 'Read n and print n x n hollow box using "*" and spaces.', banglaHint: 'প্রান্তের কো-অর্ডিনেট শর্ত যাচাই করো।', starterCode: `#include <iostream>\nusing namespace std;\nint main() {\n    int n = 0;\n    if (cin >> n) {\n        for (int r = 0; r < n; ++r) {\n            for (int c = 0; c < n; ++c) cout << ((r==0||r==n-1||c==0||c==n-1) ? '*' : ' ');\n            cout << "\\n";\n        }\n    }\n    return 0;\n}`, sampleStdin: '4', expectedOutput: '****\n*  *\n*  *\n****' },
      { id: 'cpp-ch-8-q5', difficulty: 'Hard', title: '5. Count Pairs With Exact Target Sum', prompt: 'Read n, target, and n ints; count index pairs (i < j) where a[i] + a[j] == target using nested loops.', banglaHint: 'j = i + 1 থেকে শুরু করলে প্রতিটি জোড়া একবারই গোনা হবে।', starterCode: `#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    int n = 0; long long target = 0;\n    if (cin >> n >> target) {\n        vector<long long> a(n); for (auto& x : a) cin >> x;\n        int cnt = 0;\n        for (int i = 0; i < n; ++i) for (int j = i + 1; j < n; ++j) if (a[i] + a[j] == target) ++cnt;\n        cout << cnt << "\\n";\n    }\n    return 0;\n}`, sampleStdin: '4 6\n1 5 7 1', expectedOutput: '2' },
    ],
    miniBuild: {
      title: 'C++23 2D Coordinate Pattern & Border Generator',
      description: 'Generates hollow 2D box borders cleanly using outer/inner row-column coordinates.',
      banglaGoal: 'নেস্টেড লুপ ও বাউন্ডারি লজিক দিয়ে ২ডি প্যাটার্ন জেনারেটর তৈরি।',
      combinesChapters: 'Ch 1–8',
      starterCode: `#include <iostream>
using namespace std;

int main() {
    int rows = 0, cols = 0;
    if (cin >> rows >> cols) {
        for (int r = 0; r < rows; ++r) {
            for (int c = 0; c < cols; ++c) {
                bool edge = (r == 0 || r == rows - 1 || c == 0 || c == cols - 1);
                cout << (edge ? '#' : ' ');
            }
            cout << "\\n";
        }
    }
    return 0;
}`,
      sampleStdin: '3 4',
      expectedOutput: '####\n#  #\n####',
    },
    starterCode: `#include <iostream>
using namespace std;

int main() {
    int rows = 0, cols = 0;
    if (cin >> rows >> cols) {
        for (int r = 0; r < rows; ++r) {
            for (int c = 0; c < cols; ++c) {
                bool edge = (r == 0 || r == rows - 1 || c == 0 || c == cols - 1);
                cout << (edge ? '#' : ' ');
            }
            cout << "\\n";
        }
    }
    return 0;
}`,
    sampleStdin: '3 4',
    expectedSampleOutput: '####\n#  #\n####',
    testCases: [
      { id: 'cpp8-t1', input: '3 4', expectedOutput: '####\n#  #\n####' },
      { id: 'cpp8-t2', input: '2 2', expectedOutput: '##\n##', isHidden: true },
    ],
  },

  9: {
    chapterNumber: 9,
    title: 'C++ Chapter 9 (C++23): Functions, Pass-by-Reference (&) & Scope',
    banglaTitle: 'C++ অধ্যায় ৯ (C++23): ফাংশন, প্যারামিটার, রেফারেন্স (&) ও স্কোপ',
    subtitle: 'Value vs const-reference vs mutable reference passing, function overloading, inline constexpr, and stack frames.',
    zeroIntuition: {
      plainEnglishStory:
        'Functions split sprawling `main()` logic into clean, reusable building blocks with isolated stack frames. In C++, HOW you pass parameters governs both speed and correctness: pass small primitives (`int`, `long long`) by value; pass large objects (`std::string`, `std::vector`) by `const T&` to avoid expensive copies; and pass by mutable `T&` when a function needs to modify the caller’s variables (like swapping two numbers).\n\nModern C++ also lets you compute pure math helpers at compile time using `constexpr`, reuse names cleanly via function overloading, and verify modular arithmetic helpers (`mod_pow`, `gcd`) independently.',
      asciiFlowchart: `  [ main() Stack Frame: x = 10, vec = {1,2,3} ]
         |
         +--> pass-by-value (int a)      --> copies 10 into helper frame (caller safe!)
         +--> pass-by-const-ref (const vector& v) --> ZERO copy, read-only!
         +--> pass-by-ref (int& x)       --> mutates main's x directly!`,
      pseudocode: [
        '1. DECLARE pure helper functions above main() with clear types',
        '2. PASS primitives by value and heavy strings/vectors by const&',
        '3. USE mutable reference T& only when in-place mutation is intended',
        '4. KEEP local variables scoped cleanly without global state pollution',
        '5. CALL helpers from main() and print deterministic results',
      ],
      banglaZeroToHero: {
        analogyTitle: 'ফটোকপি বনাম মূল দলিল (Pass-by-Value বনাম Reference &)',
        explanation:
          'বড় কোনো প্রোগ্রাম একটানা `main()` ফাংশনের ভেতর লিখলে তা বিশৃঙ্খল হয়ে যায়; তাই ছোট ছোট নির্দিষ্ট কাজের জন্য আলাদা ফাংশন তৈরি করা হয়। C++-এ ফাংশনে ডেটা পাঠানোর তিনটি উপায় আছে, যা বোঝা অত্যন্ত গুরুত্বপূর্ণ। সাধারণ `int` বা `long long` পাঠালে C++ মূল মানটির একটি "ফটোকপি" বানায় (Pass-by-Value)—তাই ফাংশনের ভেতর বদলালেও `main()`-এর ভ্যারিয়েবল বদলায় না। কিন্তু ১ লক্ষ উপাদানের একটি `vector` বা বড় `string` কপি করতে গেলে প্রচুর সময় ও RAM নষ্ট হয়! তাই বড় ডেটা কপি না করেই দ্রুত পড়তে আমরা `const string& s` (Pass-by-Const-Reference) দিই—এতে মূল ফাইল দেখার অনুমতি থাকে কিন্তু পরিবর্তনের ঝুঁকি থাকে না। আর সত্যিই যদি ফাংশনের ভেতর থেকে `main()`-এর ভ্যারিয়েবল বদলাতে চাও (যেমন দুটি সংখ্যা `swap` করা), তবেই কেবল নন-কনস্ট রেফারেন্স `int& a` ব্যবহার করবে। প্রতিটি ফাংশন কল হলে RAM-এর কল-স্ট্যাকে তার নিজস্ব ফ্রেম তৈরি হয় এবং `return` করলে সেই ফ্রেম সাথে সাথেই মুছে যায়। একই নামের ফাংশন ভিন্ন প্যারামিটার দিয়ে তৈরি করাকে Function Overloading বলে, আর `constexpr` দিলে কম্পাইলার আগেই ফলাফল হিসাব করে রাখে!',
        everydayExample:
          'সহকর্মীকে ফাইল দেখাতে মূল ফাইল (T&) দিলে সে এডিট করতে পারবে, আর কেবল পড়ার জন্য `const T&` মানে ফাইলটি কাঁচের বক্সে দেখানো!',
        keyTakeaways: [
          'বড় অবজেক্ট যেমন `string` বা `vector` সবসময় `const T&` দিয়ে পাস করবে (নইলে অযথা কপি হবে!)।',
          'গ্লোবাল ভ্যারিয়েবল এড়িয়ে ফাংশনকে কেবল প্যারামিটার দিয়ে ডেটা দাও।',
          'ফাংশনের ভেতরের লোকাল ভ্যারিয়েবলের রেফারেন্স (`int&`) কখনোই বাইরে রিটার্ন করবে না (Dangling Reference!)।',
        ],
      },
    },
    topics: [
      {
        id: 'cpp-ch-9-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Pure Value-Returning Function & Stack Frame Isolation',
        englishParagraphs: [
          'A pure function takes input arguments, performs deterministic math inside its own stack frame, and returns the computed value without touching global state.',
          'Notice that modifying `a` inside `square_plus` does not mutate caller arguments.',
        ],
        banglaParagraphs: [
          'পিউর ফাংশন কেবল ইনপুট আর্গুমেন্ট নিয়ে হিসাব করে উত্তর রিটার্ন করে, বাইরের কোনো ভ্যারিয়েবল নষ্ট করে না।',
          'এতে কোড পরীক্ষা করা ও পুনরায় ব্যবহার করা সহজ হয়।',
        ],
        memoryDiagram: `main: n=6 -> push frame square_plus(6) -> returns 37 -> frame popped`,
        code: `#include <iostream>
using namespace std;

long long square_plus(long long x, long long c) {
    return x * x + c;
}

int main() {
    cout << square_plus(6, 1) << "\\n";
    return 0;
}`,
        stdin: '',
        expectedOutput: '37',
        lineByLine: [
          { lineNumber: 'Line 4', codeSnippet: 'long long square_plus(long long x, long long c) {', whatItMeans: 'Defines typed function accepting two 64-bit parameters.', whyItIsThere: 'Encapsulates quadratic step cleanly.', ifDeletedError: 'Compile error: square_plus not declared.' },
          { lineNumber: 'Line 5', codeSnippet: 'return x * x + c;', whatItMeans: 'Computes result and hands it back to caller.', whyItIsThere: 'Pops local frame cleanly.', ifDeletedError: 'Undefined return behavior in non-void function.' },
          { lineNumber: 'Line 9', codeSnippet: 'cout << square_plus(6, 1) << "\\n";', whatItMeans: 'Calls helper with 6 and 1 and prints 37.', whyItIsThere: 'Reuses helper cleanly.', ifDeletedError: 'Empty stdout.' },
        ],
      },
      {
        id: 'cpp-ch-9-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Euclidean GCD & LCM Helper Functions',
        englishParagraphs: [
          'Encapsulating Euclid’s algorithm `gcd(a, b)` lets `lcm(a, b)` divide BEFORE multiplying `(a / gcd(a, b)) * b` so 64-bit integers never overflow prematurely!',
          'In modern C++17/23 `<numeric>` even provides `std::gcd` and `std::lcm`.',
        ],
        banglaParagraphs: [
          'ইউক্লিডের গ.সা.গু (`gcd`) ফাংশন বানিয়ে সেটিকে দিয়ে ল.সা.গু (`lcm`) বের করার সময় `(a / g) * b` আগে ভাগ করলে ওভারফ্লো হয় না।',
          'অথবা C++17+ `<numeric>` হেডারেই সরাসরি `std::gcd` ও `std::lcm` পাওয়া যায়।',
        ],
        memoryDiagram: `gcd(24, 36) -> gcd(36, 24) -> gcd(24, 12) -> gcd(12, 0) = 12`,
        code: `#include <iostream>
using namespace std;

long long my_gcd(long long a, long long b) {
    while (b != 0) {
        long long rem = a % b;
        a = b;
        b = rem;
    }
    return a;
}

long long my_lcm(long long a, long long b) {
    if (a == 0 || b == 0) return 0;
    return (a / my_gcd(a, b)) * b;
}

int main() {
    long long a = 0, b = 0;
    if (cin >> a >> b) {
        cout << "gcd=" << my_gcd(a, b) << " lcm=" << my_lcm(a, b) << "\\n";
    }
    return 0;
}`,
        stdin: '24 36',
        expectedOutput: 'gcd=12 lcm=72',
        lineByLine: [
          { lineNumber: 'Line 15', codeSnippet: 'return (a / my_gcd(a, b)) * b;', whatItMeans: 'Divides by GCD prior to multiplying by b.', whyItIsThere: 'Prevents premature overflow when a*b > 9e18.', ifDeletedError: '(a * b) / gcd overflows on large inputs.' },
        ],
      },
      {
        id: 'cpp-ch-9-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Pass-by-Reference (&) Swap & const-Reference Read',
        englishParagraphs: [
          'Using `long long& a, long long& b` binds directly to the caller’s variables so `sort_pair(x, y)` orders them in place with zero heap allocation.',
          'Meanwhile `const string& label` reads string tokens without copying bytes.',
        ],
        banglaParagraphs: [
          'ফাংশনের ভেতর থেকে `main()`-এর দুটি মান অদলবদল করতে `long long&` রেফারেন্স ব্যবহার করা হয়, আর কেবল পড়ার জন্য `const string&` দেওয়া হয় যাতে স্ট্রিং কপি না হয়।',
        ],
        memoryDiagram: `order_pair(x=90, y=15) -> mutates caller RAM -> x=15, y=90`,
        code: `#include <iostream>
#include <string>
using namespace std;

void order_pair(long long& a, long long& b) {
    if (a > b) {
        long long tmp = a;
        a = b;
        b = tmp;
    }
}

void report(const string& tag, long long lo, long long hi) {
    cout << tag << ":" << lo << "," << hi << "\\n";
}

int main() {
    long long x = 0, y = 0;
    string tag;
    if (cin >> tag >> x >> y) {
        order_pair(x, y);
        report(tag, x, y);
    }
    return 0;
}`,
        stdin: 'Range 90 15',
        expectedOutput: 'Range:15,90',
        lineByLine: [
          { lineNumber: 'Line 5', codeSnippet: 'void order_pair(long long& a, long long& b) {', whatItMeans: 'Accepts aliases referencing caller variables directly.', whyItIsThere: 'Allows in-place sorting of x and y.', ifDeletedError: 'Pass-by-value only swaps temporary local copies.' },
          { lineNumber: 'Line 13', codeSnippet: 'void report(const string& tag, long long lo, long long hi) {', whatItMeans: 'Reads tag via zero-copy immutable reference.', whyItIsThere: 'Prevents unnecessary string heap allocations.', ifDeletedError: 'Forces copying string characters on call.' },
        ],
      },
      {
        id: 'cpp-ch-9-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Fast Binary Exponentiation mod_pow & Variable Shadowing Trap',
        englishParagraphs: [
          'Binary exponentiation (`mod_pow`) computes `a^b % mod` in `O(log b)` steps cleanly inside a dedicated helper function.',
          'Avoid declaring a local variable inside a nested block with the same name as a parameter (`shadowing`) or returning references to local stack variables!',
        ],
        banglaParagraphs: [
          'ফাংশন হিসেবে `mod_pow(a, b, mod)` লিখে রাখলে `10^9` ঘাতও মাত্র ৩০ ধাপে বের হয়।',
          'পাশাপাশি কখনোই লোকাল ভ্যারিয়েবলকে বাইরের ভ্যারিয়েবলের নামে শ্যাডো করবে না এবং লোকাল ভ্যারিয়েবলের রেফারেন্স রিটার্ন করবে না।',
        ],
        memoryDiagram: `mod_pow(2, 10, 1000) -> 1024 % 1000 -> 24 in 4 squarings`,
        code: `#include <iostream>
using namespace std;

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

int main() {
    long long a = 0, b = 0, m = 1;
    if (cin >> a >> b >> m) {
        cout << mod_pow(a, b, m) << "\\n";
    }
    return 0;
}`,
        stdin: '2 10 1000',
        expectedOutput: '24',
        lineByLine: [
          { lineNumber: 'Line 4', codeSnippet: 'long long mod_pow(long long base, long long exp, long long mod) {', whatItMeans: 'Encapsulates O(log exp) binary exponentiation cleanly.', whyItIsThere: 'Reusable CP utility avoiding overflow.', ifDeletedError: 'Manual loops overflow or run O(exp) TLE.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 1', codeSnippet: '#include <iostream>', whatItMeans: 'Imports std::cout output stream.', whyItIsThere: 'Prints function return value.', ifDeletedError: 'Compile error: undeclared cout.' },
      { lineNumber: 'Line 2', codeSnippet: 'using namespace std;', whatItMeans: 'Exposes standard library names cleanly.', whyItIsThere: 'Omits std:: boilerplate.', ifDeletedError: 'Requires std::cout.' },
      { lineNumber: 'Line 4', codeSnippet: 'long long square_plus(long long x, long long c) {', whatItMeans: 'Function header specifying return type and two value params.', whyItIsThere: 'Enforces compile-time type safety on calls.', ifDeletedError: 'Compile error on function call.' },
      { lineNumber: 'Line 5', codeSnippet: 'return x * x + c;', whatItMeans: 'Computes quadratic expression and returns to caller.', whyItIsThere: 'Delivers computed value across stack frames.', ifDeletedError: 'Undefined behavior in non-void function.' },
      { lineNumber: 'Line 9', codeSnippet: 'cout << square_plus(6, 1) << "\\n";', whatItMeans: 'Invokes helper with 6 and 1, printing 37.', whyItIsThere: 'Demonstrates function composition.', ifDeletedError: 'No stdout generated.' },
    ],
    dryRunTable: [
      { step: 1, state: 'Call square_plus(6, 1)', memoryOrStack: 'frame: x=6, c=1', note: 'Copied by value' },
      { step: 2, state: 'Evaluate x * x + c', memoryOrStack: '36 + 1 = 37', note: '64-bit arithmetic' },
      { step: 3, state: 'Return 37', memoryOrStack: 'helper frame freed', note: 'Value passed back' },
      { step: 4, state: 'cout prints 37', memoryOrStack: 'stdout="37"', note: 'Clean exit' },
    ],
    harryBugTraps: [
      { title: 'Returning Reference to Local Stack Variable', brokenCode: 'int& bad() { int x = 5; return x; } // Dangling Reference UB!', fixedCode: 'int good() { int x = 5; return x; }', whyItBreaks: 'Local variable x is destroyed when bad() pops off the stack, leaving garbage memory!' },
      { title: 'Copying Large std::vector or string Inside Loops', brokenCode: 'int sumVec(vector<int> v) { ... } // copies 10^5 ints EVERY call!', fixedCode: 'int sumVec(const vector<int>& v) { ... }', whyItBreaks: 'Pass-by-value clones all heap bytes per call, turning O(n) into O(n^2) TLE!' },
      { title: 'Missing Return Statement on Non-Void Code Path', brokenCode: 'int check(int x) { if (x > 0) return 1; } // no return for x<=0!', fixedCode: 'int check(int x) { if (x > 0) return 1; return 0; }', whyItBreaks: 'Falling off the end of a non-void function in C++ is Undefined Behavior.' },
    ],
    practiceSheet: [
      { id: 'cpp-ch-9-q1', difficulty: 'Easy', title: '1. Cube Helper Function', prompt: 'Write helper cube(long long x) and print cube(n) for stdin n.', banglaHint: 'return x * x * x; ফাংশন বানাও।', starterCode: `#include <iostream>\nusing namespace std;\nlong long cube(long long x) { return x * x * x; }\nint main() {\n    long long n = 0; if (cin >> n) cout << cube(n) << "\\n";\n    return 0;\n}`, sampleStdin: '4', expectedOutput: '64' },
      { id: 'cpp-ch-9-q2', difficulty: 'Easy', title: '2. In-Place Swap by Reference', prompt: 'Write swap_ll(long long& a, long long& b), swap two inputs, and print them.', banglaHint: 'প্যারামিটারে & রেফারেন্স দিয়ে মূল মান বদলাও।', starterCode: `#include <iostream>\nusing namespace std;\nvoid swap_ll(long long& a, long long& b) { long long t = a; a = b; b = t; }\nint main() {\n    long long a = 0, b = 0;\n    if (cin >> a >> b) { swap_ll(a, b); cout << a << " " << b << "\\n"; }\n    return 0;\n}`, sampleStdin: '10 25', expectedOutput: '25 10' },
      { id: 'cpp-ch-9-q3', difficulty: 'Medium', title: '3. Greatest Common Divisor (GCD)', prompt: 'Write gcd(a, b) using Euclid algorithm and print result.', banglaHint: 'while (b != 0) লুপে a % b ব্যবহার করো।', starterCode: `#include <iostream>\nusing namespace std;\nlong long gcd_fn(long long a, long long b) { while (b) { long long r = a % b; a = b; b = r; } return a; }\nint main() {\n    long long a = 0, b = 0; if (cin >> a >> b) cout << gcd_fn(a, b) << "\\n";\n    return 0;\n}`, sampleStdin: '48 18', expectedOutput: '6' },
      { id: 'cpp-ch-9-q4', difficulty: 'Medium', title: '4. Overflow-Safe LCM Helper', prompt: 'Compute LCM(a, b) = (a / gcd(a, b)) * b.', banglaHint: 'আগে gcd দিয়ে ভাগ তারপর গুণ করো।', starterCode: `#include <iostream>\nusing namespace std;\nlong long gcd_fn(long long a, long long b) { return b ? gcd_fn(b, a % b) : a; }\nlong long lcm_fn(long long a, long long b) { return (a / gcd_fn(a, b)) * b; }\nint main() {\n    long long a = 0, b = 0; if (cin >> a >> b) cout << lcm_fn(a, b) << "\\n";\n    return 0;\n}`, sampleStdin: '12 15', expectedOutput: '60' },
      { id: 'cpp-ch-9-q5', difficulty: 'Hard', title: '5. Fast Modular Power (a^b mod m)', prompt: 'Write mod_pow(a, b, m) running in O(log b) time.', banglaHint: 'প্রতি ধাপে base = (base * base) % m ও exp >>= 1 করো।', starterCode: `#include <iostream>\nusing namespace std;\nlong long mod_pow(long long b, long long e, long long m) {\n    long long r = 1 % m; b %= m;\n    while (e > 0) { if (e & 1LL) r = (r * b) % m; b = (b * b) % m; e >>= 1; }\n    return r;\n}\nint main() {\n    long long a, b, m; if (cin >> a >> b >> m) cout << mod_pow(a, b, m) << "\\n";\n    return 0;\n}`, sampleStdin: '3 10 1000', expectedOutput: '49' },
    ],
    miniBuild: {
      title: 'C++23 Modular GCD & LCM Math Toolkit',
      description: 'Packages reusable gcd and overflow-safe lcm functions with clean stack frames.',
      banglaGoal: 'রিইউজেবল ফাংশন দিয়ে গ.সা.গু ও ল.সা.গু মডিউল তৈরি।',
      combinesChapters: 'Ch 1–9',
      starterCode: `#include <iostream>
using namespace std;

long long my_gcd(long long a, long long b) {
    while (b != 0) { long long r = a % b; a = b; b = r; }
    return a;
}

long long my_lcm(long long a, long long b) {
    return (a == 0 || b == 0) ? 0 : (a / my_gcd(a, b)) * b;
}

int main() {
    long long a = 0, b = 0;
    if (cin >> a >> b) cout << "gcd=" << my_gcd(a, b) << " lcm=" << my_lcm(a, b) << "\\n";
    return 0;
}`,
      sampleStdin: '24 36',
      expectedOutput: 'gcd=12 lcm=72',
    },
    starterCode: `#include <iostream>
using namespace std;

long long my_gcd(long long a, long long b) {
    while (b != 0) { long long r = a % b; a = b; b = r; }
    return a;
}

long long my_lcm(long long a, long long b) {
    return (a == 0 || b == 0) ? 0 : (a / my_gcd(a, b)) * b;
}

int main() {
    long long a = 0, b = 0;
    if (cin >> a >> b) cout << "gcd=" << my_gcd(a, b) << " lcm=" << my_lcm(a, b) << "\\n";
    return 0;
}`,
    sampleStdin: '24 36',
    expectedSampleOutput: 'gcd=12 lcm=72',
    testCases: [
      { id: 'cpp9-t1', input: '24 36', expectedOutput: 'gcd=12 lcm=72' },
      { id: 'cpp9-t2', input: '14 21', expectedOutput: 'gcd=7 lcm=42', isHidden: true },
    ],
  },
  10: {
    chapterNumber: 10,
    isMilestoneMerger: true,
    title: 'C++ Chapter 10 (C++23): Time & Space Complexity (Big-O & 10^8 Rule)',
    banglaTitle: 'C++ অধ্যায় ১০ (C++23): টাইম ও স্পেস কমপ্লেক্সিটি (Big-O ও ১০^৮ রুল)',
    subtitle: 'Asymptotic growth, O(1) math formulas vs O(N^2) TLE traps, and 1-second judge budgets.',
    zeroIntuition: {
      plainEnglishStory:
        'Big-O notation measures how operation count grows as input size N scales from 10 to 1,000,000, stripped of constant factors. Online judges grant roughly 1 to 2 seconds per test file, and modern C++ executes around 10^8 to 3×10^8 simple operations per second inside tight `-O2` loops.\n\nIf `N = 100,000`, an `O(N^2)` nested loop executes `10^10` iterations (~100 seconds -> guaranteed TLE!), whereas an `O(N)` pass or `O(1)` closed-form Gaussian sum solves the identical problem in under 0.001 seconds. Space complexity works identically: declaring `vector<int> a(1e7)` uses ~40 MB safely under a 256 MB limit, while `int grid[10000][10000]` needs 400 MB and triggers MLE/SIGSEGV.',
      asciiFlowchart: `N = 100,000 (Judge Limit: 1 sec ≈ 10^8 simple ops)
   |
   +--> O(N^2) nested loop  : 10^10 ops  (~100.0 s)  ==> TLE!
   +--> O(N log N) sort     : 1.7×10^6   (~0.015 s)  ==> AC!
   +--> O(N) single pass    : 10^5 ops   (~0.001 s)  ==> AC!
   +--> O(1) n*(n+1)/2 math : 3 ops      (<0.0001 s) ==> Instant AC!`,
      pseudocode: [
        '1. READ constraint N from problem statement BEFORE writing loops',
        '2. ESTIMATE total CPU operations via the 10^8 ops/sec budget',
        '3. REPLACE quadratic nested loops with O(N) running state or O(1) algebra',
        '4. GUARD intermediate multiplications with 64-bit long long before dividing',
        '5. VERIFY memory allocation stays well below 256 MB (≈ 6×10^7 ints)',
      ],
      banglaZeroToHero: {
        analogyTitle: 'সময়সীমার বাজেট ও বড়ো এন-এর (N) হিসাব',
        explanation:
          'মনে করো তোমাকে ১ কোটি মানুষের শহরের সবার সাথে সবার হ্যান্ডশেক গুনে বের করতে বলা হলো। একজন একজন করে সব জোড়া গুনতে গেলে (O(N^2)) কয়েক বছর পার হয়ে যাবে—এটাই অনলাইন জাজের Time Limit Exceeded (TLE)। অথচ সূত্র জানা থাকলে `N * (N - 1) / 2` লিখে ১ সেকেন্ডের ভগ্নাংশেই (O(1)) সঠিক উত্তর পাওয়া যায়। Big-O নোটেশন আমাদের ঠিক এই স্কেলিং رفتار শেখায় যে ইনপুট `N` বাড়লে প্রোগ্রামের ধাপ সংখ্যা কীভাবে বাড়ে। প্রোগ্রামিং কনটেস্টে জাজ সাধারণত ১ সেকেন্ডে প্রায় `10^8` (দশ কোটি) সাধারণ অপারেশন চালাতে পারে। তাই কোনো অঙ্কে `N <= 10^5` দেখামাত্র বুঝে নিতে হবে যে `O(N^2)` নেস্টেড লুপ চলবে না; বরং `O(N)` বা `O(N log N)` লাগবে। একইভাবে স্পেস কমপ্লেক্সিটি মানে প্রোগ্রামটি কত মেগাবাইট RAM নিচ্ছে—256 MB লিমিটে আমরা সর্বোচ্চ প্রায় `5×10^7` সংখ্যক `int` বা `2.5×10^7` সংখ্যক `long long` অ্যারে নিতে পারি। C++-এ `cout << "\\n"` ব্যবহার করলে বাফার ফ্লাশ হয় না, ফলে `endl`-এর তুলনায় আউটপুট অনেক দ্রুত প্রিন্ট হয়। বড় ইনপুটে `int`-এ গুণ করলে ওভারফ্লো হয় বলেই সূত্রে অন্তত একটি `long long` থাকা জরুরি। এছাড়া `vector` বা স্ট্রিং ফাংশনে পাঠানোর সময় কপি এড়াতে `const auto&` রেফারেন্স নেওয়া ভালো অভ্যাস। কোড লেখার আগে সবসময় `N` দেখে টাইম কমপ্লেক্সিটি হিসাব করাই চ্যাম্পিয়ন প্রোগ্রামারদের প্রথম ধাপ।',
        everydayExample:
          'ঢাকা থেকে চট্টগ্রাম যেতে সাইকেলে বেরোলে যেমন সময়ের সীমা পেরিয়ে যাবে, তেমনি `N = 10^5` ইনপুটে `O(N^2)` লুপ লিখলে টাইম লিমিট এক্সিড করবে; সঠিক অ্যালগরিদম মানে হাই-স্পিড এক্সপ্রেস ট্রেন।',
        keyTakeaways: [
          '১ সেকেন্ড সময়সীমায় নিরাপদ বাজেট প্রায় `10^8` সাধারণ অপারেশন (`N=10^5` হলে `O(N^2)` নিষিদ্ধ)।',
          'মেগা আউটপুটে `endl`-এর বদলে `\\n` ও `ios::sync_with_stdio(false)` ব্যবহার করবে।',
          '`n * (n + 1) / 2`-এ ওভারফ্লো বাঁচাতে ৬৪-বিট `long long` ব্যবহার বাধ্যতামূলক।',
        ],
      },
    },
    topics: [
      {
        id: 'cpp-ch-10-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'O(1) Constant Sum vs O(N) Loop Accumulation',
        englishParagraphs: [
          'Summing `1..N` with a loop executes `N` iterations (`O(N)`), which works up to ~10^7 inside one second but fails if run inside `Q = 10^5` queries.',
          'Factoring the parity division first—`(n % 2 == 0) ? (n / 2) * (n + 1) : n * ((n + 1) / 2)`—reduces the cost to `O(1)` AND avoids overflow up to larger `N`.',
        ],
        banglaParagraphs: [
          '১ থেকে `N` যোগ করতে লুপ চালালে `O(N)` সময় লাগে, কিন্তু `10^5` বার কুয়েরি এলে লুপ TLE খাবে।',
          'গাণিতিক সূত্র `n*(n+1)/2` ব্যবহার করলে কাজটি মাত্র `O(1)` সময়ে সম্পন্ন হয় এবং আগে জোড় সংখ্যাকে ২ দিয়ে ভাগ করলে ওভারফ্লোর ঝুঁকিও কমে।',
        ],
        memoryDiagram: `Loop O(N): i=1 -> 2 -> ... -> 100000 (10^5 ops)
Math O(1): (100000 / 2) * 100001 = 5000050000 (3 ops)`,
        code: `#include <iostream>
using namespace std;

int main() {
    long long n = 100000;
    long long ans = (n % 2 == 0) ? (n / 2) * (n + 1) : n * ((n + 1) / 2);
    cout << ans << "\\n";
    return 0;
}`,
        stdin: '',
        expectedOutput: '5000050000',
        lineByLine: [
          { lineNumber: 'Line 5', codeSnippet: 'long long n = 100000;', whatItMeans: 'Holds N in 64-bit signed integer.', whyItIsThere: '32-bit int overflows beyond 2.14e9.', ifDeletedError: 'Compile error: undeclared n.' },
          { lineNumber: 'Line 6', codeSnippet: 'long long ans = (n % 2 == 0) ? (n / 2) * (n + 1) : n * ((n + 1) / 2);', whatItMeans: 'Divides the even factor by 2 before multiplying.', whyItIsThere: 'Computes 1..N sum in O(1) while maximizing safe range.', ifDeletedError: 'No result computed.' },
        ],
      },
      {
        id: 'cpp-ch-10-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'O(sqrt(N)) Divisor Counting for Large Queries',
        englishParagraphs: [
          'Testing every `d` from `1..N` takes `10^9` steps when `N = 10^9` (10 seconds TLE).',
          'Divisors pair symmetrically around `sqrt(N)`: scanning `d * d <= n` cuts iterations from `1,000,000,000` down to just `31,622`!',
        ],
        banglaParagraphs: [
          '`N = 10^9` হলে ১ থেকে `N` পর্যন্ত ভাগ করে ভাজক গুনতে ১০ সেকেন্ড লেগে TLE হয়ে যাবে।',
          'যেহেতু ভাজকগুলো `sqrt(N)`-এর দুই পাশে জোড়ায় থাকে, তাই `d * d <= n` পর্যন্ত লুপ চালালেই মাত্র ~৩১ হাজার ধাপে উত্তর পাওয়া যায়।',
        ],
        memoryDiagram: `N=36: d=1->(1,36), d=2->(2,18), d=3->(3,12), d=4->(4,9), d=6->(6 once) => 9`,
        code: `#include <iostream>
using namespace std;

int main() {
    long long n = 0;
    if (cin >> n) {
        long long cnt = 0;
        for (long long d = 1; d * d <= n; d++) {
            if (n % d == 0) {
                cnt += (d * d == n) ? 1 : 2;
            }
        }
        cout << cnt << "\\n";
    }
    return 0;
}`,
        stdin: '36',
        expectedOutput: '9',
        lineByLine: [
          { lineNumber: 'Line 8', codeSnippet: 'for (long long d = 1; d * d <= n; d++)', whatItMeans: 'Loops d up to sqrt(n) using integer multiplication.', whyItIsThere: 'Avoids floating-point sqrt precision issues and achieves O(sqrt(N)).', ifDeletedError: 'Loop would have to run O(N).' },
          { lineNumber: 'Line 10', codeSnippet: 'cnt += (d * d == n) ? 1 : 2;', whatItMeans: 'Counts perfect square root once and paired divisors twice.', whyItIsThere: 'Prevents double-counting sqrt(N).', ifDeletedError: 'Perfect squares print an even divisor count.' },
        ],
      },
      {
        id: 'cpp-ch-10-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Judge Constraint Analyzer (Ops Estimator)',
        englishParagraphs: [
          'Competitive programmers classify `N` into algorithm classes immediately: `N <= 10^3` permits `O(N^2)`, `N <= 2e5` requires `O(N log N)`, and `N > 10^7` demands `O(sqrt(N))` or `O(log N)`/`O(1)`.',
          'Building a quick constraint budget checker builds intuition for choosing algorithms before typing a single line of contest code.',
        ],
        banglaParagraphs: [
          'কনটেস্টের সমস্যা পড়ামাত্র ইনপুট `N`-এর সীমা দেখে ঠিক করা যায় কোন অ্যালগরিদম পাস করবে: `N <= 2e5` মানে অন্তত `O(N log N)` লাগবে।',
          'একটি সহজ বাজেট বিশ্লেষক লিখলে এই সীমাগুলো মাথায় গেঁথে যায়।',
        ],
        memoryDiagram: `n=200000 -> n*n = 4e10 (>1e8) -> requires O(N log N) or better`,
        code: `#include <iostream>
using namespace std;

int main() {
    long long n = 0;
    if (cin >> n) {
        if (n <= 10000) cout << "O(N^2)_OK\\n";
        else if (n <= 200000) cout << "O(N_LOG_N)\\n";
        else cout << "O(N)_OR_O(1)\\n";
    }
    return 0;
}`,
        stdin: '200000',
        expectedOutput: 'O(N_LOG_N)',
        lineByLine: [
          { lineNumber: 'Line 7', codeSnippet: 'if (n <= 10000) cout << "O(N^2)_OK\\n";', whatItMeans: '10^4 squared is 10^8, right at the 1-second limit.', whyItIsThere: 'Classifies quadratic threshold.', ifDeletedError: 'Small N classified into tighter constraint.' },
        ],
      },
      {
        id: 'cpp-ch-10-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Hidden O(N^2) String Append Trap vs. O(N) Preallocation',
        englishParagraphs: [
          'Recomputing `strlen`-like scans inside a loop (`for (int i = 0; i < strlen(s); i++)`) or repeatedly calling slow `cout << endl` flushes turns an `O(N)` loop into `O(N^2)` TLE.',
          'Also remember `O(log_2 N)` binary exponentiation (`mod_pow`) computes `a^b % m` in ~60 multiplications even when `b = 10^18`!',
        ],
        banglaParagraphs: [
          'লুপের ভেতর অকারণে বারবার ফ্ল্যাশ বা লম্বা স্ট্রিং কপি করলে আপাতদৃষ্টিতে `O(N)` কোডও গোপনে `O(N^2)` হয়ে যায়।',
          'অন্যদিকে `a^b % m` বের করতে `O(b)` লুপের বদলে বাইনারি এক্সপোনেনশিয়েশন চালালে `b = 10^18` হলেও মাত্র ৬০ ধাপে (`O(log b)`) উত্তর পাওয়া যায়।',
        ],
        memoryDiagram: `b=13 (1101_2): exp steps = 4 -> O(log b) instead of 13`,
        code: `#include <iostream>
using namespace std;

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

int main() {
    cout << mod_pow(2, 10, 1000000007) << "\\n";
    return 0;
}`,
        stdin: '',
        expectedOutput: '1024',
        lineByLine: [
          { lineNumber: 'Line 7', codeSnippet: 'while (exp > 0) {', whatItMeans: 'Halves exponent each iteration via >> 1.', whyItIsThere: 'Achieves O(log exp) power calculation.', ifDeletedError: 'Cannot exponentiate.' },
          { lineNumber: 'Line 9', codeSnippet: 'base = (base * base) % mod;', whatItMeans: 'Squares base modulo mod safely.', whyItIsThere: 'Maintains base^(2^k) invariant.', ifDeletedError: 'Multiplies base^1 only.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 5', codeSnippet: 'long long n = 100000;', whatItMeans: 'Declares 64-bit integer N.', whyItIsThere: 'Holds inputs where N*(N+1)/2 exceeds 32-bit int max (~2.14e9).', ifDeletedError: 'Compile error: undeclared n.' },
      { lineNumber: 'Line 6', codeSnippet: 'long long ans = (n % 2 == 0) ? (n / 2) * (n + 1) : n * ((n + 1) / 2);', whatItMeans: 'Executes O(1) Gaussian sum dividing even term first.', whyItIsThere: 'Eliminates O(N) loop and halves intermediate magnitude before multiply.', ifDeletedError: 'No answer produced.' },
      { lineNumber: 'Line 7', codeSnippet: 'cout << ans << "\\n";', whatItMeans: 'Outputs answer without forcing flush via endl.', whyItIsThere: 'Fast buffered stdout I/O.', ifDeletedError: 'Program prints nothing.' },
    ],
    dryRunTable: [
      { step: 1, state: 'n = 100000', memoryOrStack: 'stack: n=100000', note: 'Evaluate n % 2 == 0 -> true' },
      { step: 2, state: 'n/2 = 50000', memoryOrStack: 'ALU div', note: 'Divide even factor first' },
      { step: 3, state: '50000 * 100001', memoryOrStack: 'ans = 5000050000', note: '64-bit mul avoids overflow' },
      { step: 4, state: 'print 5000050000', memoryOrStack: 'total ops = 3 -> O(1)', note: 'Finishes in microseconds' },
    ],
    harryBugTraps: [
      { title: 'Trap 1: Using 32-bit int in Gaussian Sum', brokenCode: `int n = 100000; int sum = n * (n + 1) / 2;`, fixedCode: `long long n = 100000; long long sum = n * (n + 1) / 2;`, whyItBreaks: '100000 * 100001 ≈ 10^10 overflows signed 32-bit int, printing garbage negative output.' },
      { title: 'Trap 2: O(N^2) Loop on N = 100,000', brokenCode: `for(int i=0;i<n;i++) for(int j=0;j<n;j++) ops++;`, fixedCode: `long long ops = 1LL * n * n;`, whyItBreaks: '10^10 loop cycles exceed 1-2 second online judge CPU budgets.' },
      { title: 'Trap 3: Pass-by-Value Vector Inside Hot Loops', brokenCode: `int sumVec(vector<int> v) { ... } // copies N items per call!`, fixedCode: `int sumVec(const vector<int>& v) { ... } // O(1) ref`, whyItBreaks: 'Calling a value-copy function N times turns O(N) into O(N^2) memory copying.' },
    ],
    practiceSheet: [
      { id: 'cpp-ch10-p1', difficulty: 'Easy', title: 'Sum 1..N in O(1)', prompt: 'Given N (up to 10^9), print `1 + 2 + ... + N` in O(1) without overflow.', banglaHint: '`n % 2 == 0` চেক করে জোড় সংখ্যাকে আগে ২ দিয়ে ভাগ করো, `long long` নাও।', starterCode: `#include <iostream>\nusing namespace std;\nint main(){ long long n; if(cin>>n) cout<<(n%2==0?(n/2)*(n+1):n*((n+1)/2))<<"\\n"; }`, sampleStdin: '10', expectedOutput: '55' },
      { id: 'cpp-ch10-p2', difficulty: 'Easy', title: 'Count Divisors in O(sqrt(N))', prompt: 'Count how many positive divisors N has.', banglaHint: '`d * d <= n` পর্যন্ত লুপ চালিয়ে জোড়ায় জোড়ায় ভাজক গুনবে।', starterCode: `#include <iostream>\nusing namespace std;\nint main(){ long long n,c=0; if(cin>>n){ for(long long d=1;d*d<=n;d++) if(n%d==0) c+=(d*d==n)?1:2; cout<<c<<"\\n"; } }`, sampleStdin: '12', expectedOutput: '6' },
      { id: 'cpp-ch10-p3', difficulty: 'Medium', title: 'Binary Exponentiation O(log B)', prompt: 'Compute `(A^B) % 1000000007` for B up to 10^12.', banglaHint: 'লুপ না ঘুরিয়ে `exp & 1` ও `exp >>= 1` দিয়ে বাইনারি এক্সপোনেনশিয়েশন করো।', starterCode: `#include <iostream>\nusing namespace std;\nint main(){ long long a,b,m=1000000007,r=1; if(cin>>a>>b){ a%=m; while(b){ if(b&1) r=r*a%m; a=a*a%m; b>>=1; } cout<<r<<"\\n"; } }`, sampleStdin: '3 4', expectedOutput: '81' },
      { id: 'cpp-ch10-p4', difficulty: 'Medium', title: 'Arithmetic Progression Range Sum', prompt: 'Given L and R, compute sum `L + (L+1) + ... + R` in O(1).', banglaHint: '`S(R) - S(L-1)` ব্যবহার করো।', starterCode: `#include <iostream>\nusing namespace std;\nlong long s(long long n){ return n%2==0?(n/2)*(n+1):n*((n+1)/2); }\nint main(){ long long l,r; if(cin>>l>>r) cout<<s(r)-s(l-1)<<"\\n"; }`, sampleStdin: '3 7', expectedOutput: '25' },
      { id: 'cpp-ch10-p5', difficulty: 'Hard', title: 'Fast Prime Check O(sqrt(N))', prompt: 'Print `PRIME` or `COMPOSITE` for N up to 10^12.', banglaHint: '`n < 2` বাদ দিয়ে `d * d <= n` পর্যন্ত ভাগ করে দেখো।', starterCode: `#include <iostream>\nusing namespace std;\nint main(){ long long n; if(cin>>n){ bool p=n>=2; for(long long d=2;p&&d*d<=n;d++) if(n%d==0) p=false; cout<<(p?"PRIME":"COMPOSITE")<<"\\n"; } }`, sampleStdin: '29', expectedOutput: 'PRIME' },
    ],
    miniBuild: {
      title: 'Milestone Merger 2: O(1) Fast Range Sum Engine (Phase 1–2)',
      description: 'Combine branching, functions, 64-bit integer safety, and O(1) complexity to sum any [L, R] up to 10^9 instantly.',
      banglaGoal: 'গার্ড ক্লজ, ফাংশন, ও `O(1)` গাউসিয়ান সূত্র মিলিয়ে বিশাল রেঞ্জ সাম ইঞ্জিন তৈরি করো।',
      combinesChapters: 'C++ Ch 1–10 (Phase 2 Milestone Merger)',
      starterCode: `#include <iostream>
using namespace std;

long long prefix_sum(long long n) {
    if (n <= 0) return 0;
    return (n % 2 == 0) ? (n / 2) * (n + 1) : n * ((n + 1) / 2);
}

int main() {
    long long l = 0, r = 0;
    if (cin >> l >> r) {
        if (l > r) { cout << 0 << "\\n"; return 0; }
        cout << (prefix_sum(r) - prefix_sum(l - 1)) << "\\n";
    }
    return 0;
}`,
      sampleStdin: '1 100000',
      expectedOutput: '5000050000',
    },
    starterCode: `#include <iostream>
using namespace std;

long long prefix_sum(long long n) {
    if (n <= 0) return 0;
    return (n % 2 == 0) ? (n / 2) * (n + 1) : n * ((n + 1) / 2);
}

int main() {
    long long l = 0, r = 0;
    if (cin >> l >> r) {
        if (l > r) { cout << 0 << "\\n"; return 0; }
        cout << (prefix_sum(r) - prefix_sum(l - 1)) << "\\n";
    }
    return 0;
}`,
    sampleStdin: '1 100000',
    expectedSampleOutput: '5000050000',
    testCases: [
      { id: 'cpp10-t1', input: '1 100000', expectedOutput: '5000050000' },
      { id: 'cpp10-t2', input: '10 20', expectedOutput: '165', isHidden: true },
    ],
  },
};


