import type { AtomicLessonOverride } from './atomicLessonTypes';

export const LESSONS_C_P2: Record<number, AtomicLessonOverride> = {
  6: {
    chapterNumber: 6,
    title: 'C Chapter 6 (C23): Conditional Branching (if / else if / else, switch, Ternary)',
    banglaTitle: 'C অধ্যায় ৬ (C23): কন্ডিশনাল ব্রাঞ্চিং (if / else if / else, switch, টার্নারি)',
    subtitle: 'Decision trees, guard clauses, switch fall-through traps, ternary expressions, and CPU branch prediction.',
    zeroIntuition: {
      plainEnglishStory:
        'Without branching, a C program walks in a single straight line from top to bottom regardless of user input. Conditional statements give your CPU crossroads: evaluating a comparison sets CPU status flags (Zero Flag, Sign Flag), and jump instructions route execution down the matching branch.\n\nIn C23, you have three branching tools: `if / else if / else` for range checks, `switch` jump-tables for discrete integer or `char` constants, and the ternary operator (`cond ? a : b`) for concise inline selection. Ordering range thresholds strictly and guarding invalid inputs at the top keeps branching flat and readable.',
      asciiFlowchart: `  [ Input: score ]
         |
         +--> (score < 0 || score > 100) --YES--> [ Print "INVALID" & return ]
         |
        NO
         v
  [ score >= 90 ? ] --YES--> [ "A+" ]
         |
        NO
         v
  [ score >= 80 ? ] --YES--> [ "A"  ]  ... else [ "F" ]`,
      pseudocode: [
        '1. READ integer score or command code from stdin',
        '2. GUARD invalid out-of-range inputs at top of main()',
        '3. ROUTE exclusive grade bands in descending threshold order',
        '4. USE switch + break for discrete menu/operator dispatch',
        '5. EMIT exact matched branch token to stdout',
      ],
      banglaZeroToHero: {
        analogyTitle: 'রেললাইনের পয়েন্ট ও ট্রাফিক সিগন্যাল (Decision Routing)',
        explanation:
          'কল্পনা করো একটি ট্রেন স্টেশনের দিকে যাচ্ছে এবং সামনে তিনটি আলাদা লাইন রয়েছে। লাইনের পয়েন্টসম্যান শর্ত দেখে সিদ্ধান্ত নেয় ট্রেনটি কোন ট্র্যাকে ঢুকবে—প্রোগ্রামিংয়ে `if / else if / else` ঠিক সেই কাজই করে। C ভাষায় ০ মানে মিথ্যা (False) এবং ০ ছাড়া যেকোনো সংখ্যা মানে সত্য (True)। যখন আমাদের অসংখ্য রেঞ্জ যেমন `score >= 90` বা `score >= 80` যাচাই করতে হয়, তখন `else if` সিঁড়ি ব্যবহার করা সবচেয়ে নিরাপদ। এতে প্রথম যে শর্তটি সত্য হয়, কেবল সেটিই চলে এবং নিচের বাকি শর্তগুলো আর চেকই হয় না। অন্যদিকে নির্দিষ্ট কিছু মান যেমন `+`, `-`, `*`, `/` বা মেনু নম্বর যাচাই করতে `switch` ব্যবহার করলে কম্পাইলার দ্রুত জাম্প-টেবিল বানিয়ে নেয়। তবে `switch`-এর প্রতিটি `case` শেষে অবশ্যই `break;` লিখতে হয়, নইলে পরের কেসগুলোও অজান্তে চলে যাবে (একে Fall-through বাগ বলে)। খুব ছোট শর্তে `x = (a > b) ? a : b;` টার্নারি অপারেটর দিয়ে মাত্র এক লাইনেই মান বাছাই করা যায়। আরেকটি গুরুত্বপূর্ণ নিয়ম হলো ফাংশনের শুরুতেই ভুল ইনপুট আটকে রিটার্ন করা, যাকে Guard Clause বলে। এতে নেস্টেড `if`-এর পিরামিড তৈরি হয় না এবং কোড পড়া ও ডিবাগ করা অনেক সহজ হয়।',
        everydayExample:
          'ঢাকা মেট্রোরেলের টিকেট ভেন্ডিং মেশিনে নির্দিষ্ট টাকা বা স্টেশন কোড চাপলে মেশিন `switch` দিয়ে ঠিক সেই ভাড়ার স্লিপ বের করে দেয়, আর ভুল বাটনে "Invalid" দেখায়।',
        keyTakeaways: [
          'ভুল ইনপুট শুরুতেই Guard Clause (`if (invalid) return 0;`) দিয়ে আটকে দাও।',
          '`switch` স্টেটমেন্টের প্রতি `case` শেষে `break;` না দিলে নিচের সব কেস একসাথে রান হয়ে যায়।',
          '`else if` চেইনে সবসময় বড় বা নির্দিষ্ট শর্ত আগে রাখো (যেমন ৯০+, তারপর ৮০+)।',
        ],
      },
    },
    topics: [
      {
        id: 'c-ch-6-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Threshold Guard & Else-If Grade Classifier',
        englishParagraphs: [
          'An `if / else if / else` chain evaluates conditions strictly top-to-bottom and executes at most one branch. Ordering boundaries downward (`>= 90`, then `>= 80`) ensures an 85 does not need duplicate upper-bound checks.',
          'Always place range validation (`< 0 || > 100`) first as a guard clause so corrupted inputs fail fast before reaching grade thresholds.',
        ],
        banglaParagraphs: [
          'এই প্রোগ্রামে `if / else if / else` চেইন ব্যবহার করে একটি নম্বরের সঠিক গ্রেড বের করা হয়েছে। শুরুতেই ০ থেকে ১০০ সীমার বাইরে হলে "INVALID" দেখানো হয়েছে।',
          'যেহেতু বড় সংখ্যা আগে চেক হচ্ছে, তাই `score >= 80` চেক করার সময় `score < 90` আলাদা করে লেখার প্রয়োজন নেই।',
        ],
        memoryDiagram: `score=85 -> (<0 || >100)? false -> >=90? false -> >=80? TRUE -> print "A"`,
        code: `#include <stdio.h>

int main(void) {
    int score = 85;
    if (score < 0 || score > 100) {
        printf("INVALID\\n");
    } else if (score >= 90) {
        printf("A+\\n");
    } else if (score >= 80) {
        printf("A\\n");
    } else {
        printf("Pass/Fail\\n");
    }
    return 0;
}`,
        stdin: '',
        expectedOutput: 'A',
        lineByLine: [
          { lineNumber: 'Line 4', codeSnippet: 'int score = 85;', whatItMeans: 'Initializes integer score on the stack.', whyItIsThere: 'Provides concrete test value for decision routing.', ifDeletedError: 'Compile error: undeclared identifier score.' },
          { lineNumber: 'Line 5', codeSnippet: 'if (score < 0 || score > 100) {', whatItMeans: 'Range guard rejecting impossible scores outside [0, 100].', whyItIsThere: 'Prevents negative values or 105 from receiving normal grades.', ifDeletedError: 'Score 150 would falsely receive grade A+.' },
          { lineNumber: 'Line 9', codeSnippet: '} else if (score >= 80) {', whatItMeans: 'Secondary grade check reached only when score < 90.', whyItIsThere: 'Captures the 80..89 grade band cleanly.', ifDeletedError: 'Score 85 drops to fallback else branch.' },
        ],
      },
      {
        id: 'c-ch-6-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Switch Calculator With Break Discipline',
        englishParagraphs: [
          'When dispatching on an exact character (`+`, `-`, `*`, `/`), C’s `switch` statement often compiles down to an O(1) jump table or binary comparison sequence.',
          'Each `case` block MUST end with `break;` unless intentional fall-through is desired, and `default:` catches unknown operators safely.',
        ],
        banglaParagraphs: [
          'একটি নির্দিষ্ট চিহ্ন যেমন `+`, `-`, `*`, `/` দেখে কাজ করতে হলে `if-else`-এর বদলে `switch` অনেক পরিষ্কার এবং দ্রুত কাজ করে।',
          'খেয়াল রাখবে `/` অপারেশনে ভাজক `b == 0` হলে যেন ক্র্যাশ না করে সেজন্য ভেতরে শূন্য-বিভাজন গার্ড রাখা হয়েছে।',
        ],
        memoryDiagram: `stdin: "12 * 4" -> switch('*') -> 12*4 = 48 -> break`,
        code: `#include <stdio.h>

int main(void) {
    long long a = 0, b = 0;
    char op = '+';
    if (scanf("%lld %c %lld", &a, &op, &b) == 3) {
        switch (op) {
            case '+': printf("%lld\\n", a + b); break;
            case '-': printf("%lld\\n", a - b); break;
            case '*': printf("%lld\\n", a * b); break;
            case '/':
                if (b != 0) printf("%lld\\n", a / b);
                else printf("DIV_ZERO\\n");
                break;
            default: printf("UNKNOWN\\n"); break;
        }
    }
    return 0;
}`,
        stdin: '12 * 4',
        expectedOutput: '48',
        lineByLine: [
          { lineNumber: 'Line 6', codeSnippet: 'scanf("%lld %c %lld", &a, &op, &b)', whatItMeans: 'Reads operand, operator char, and second operand.', whyItIsThere: 'Leading space before %c skips whitespace safely.', ifDeletedError: 'Calculator receives no stdin data.' },
          { lineNumber: 'Line 10', codeSnippet: 'case \'*\': printf("%lld\\n", a * b); break;', whatItMeans: 'Computes product and exits switch immediately.', whyItIsThere: 'break prevents execution from spilling into division case.', ifDeletedError: 'Fall-through also executes case \'/\' and prints two lines!' },
        ],
      },
      {
        id: 'c-ch-6-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Gregorian Leap Year Validator & Ternary Labeler',
        englishParagraphs: [
          'Calendar validation in banking and billing systems must obey the full Gregorian rule: divisible by 400 OR (divisible by 4 AND NOT divisible by 100). Years like 1900 are NOT leap years!',
          'Here the ternary operator `?:` cleanly selects `"LEAP"` or `"COMMON"` directly inside `printf`.',
        ],
        banglaParagraphs: [
          'লিপ ইয়ার বের করার সময় অনেকেই শুধু `% 4 == 0` চেক করে ভুল করে—১৯০০ সাল ৪ দিয়ে ভাগ গেলেও লিপ ইয়ার নয় কারণ তা ১০০ দিয়ে বিভাজ্য কিন্তু ৪০০ দিয়ে নয়!',
          'টার্নারি অপারেটর `? :` দিয়ে এক লাইনেই সঠিক শর্ত যাচাই করে আউটপুট দেখানো হয়েছে।',
        ],
        memoryDiagram: `yr=2024 -> (2024%400==0) || (2024%4==0 && 2024%100!=0) -> "LEAP"`,
        code: `#include <stdio.h>

int main(void) {
    int year = 0;
    if (scanf("%d", &year) == 1) {
        int is_leap = (year % 400 == 0) || (year % 4 == 0 && year % 100 != 0);
        printf("%s\\n", is_leap ? "LEAP" : "COMMON");
    }
    return 0;
}`,
        stdin: '2024',
        expectedOutput: 'LEAP',
        lineByLine: [
          { lineNumber: 'Line 6', codeSnippet: '(year % 400 == 0) || (year % 4 == 0 && year % 100 != 0)', whatItMeans: 'Evaluates exact Gregorian calendar leap-year predicate.', whyItIsThere: 'Correctly rejects century non-leap years such as 1900.', ifDeletedError: 'Wrong Answer on century edge cases like 1900 or 2100.' },
        ],
      },
      {
        id: 'c-ch-6-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Dangling Else & Watermelon Parity Guard (Codeforces Pattern)',
        englishParagraphs: [
          'A classic C trap occurs when nesting `if` statements without braces `{}`: an `else` ALWAYS binds to the nearest inner `if`, not the outer `if` matching your indentation!',
          'Competitive programmers wrap every branch in `{}` and check all constraints cleanly in O(1)—like Codeforces Watermelon (`w > 2 && (w & 1) == 0`).',
        ],
        banglaParagraphs: [
          'Codeforces-এর বিখ্যাত Watermelon সমস্যার মূল ফাঁদ হলো `w = 2`! ২ একটি জোড় সংখ্যা হলেও একে দুটি ধনাত্মক জোড় ভাগে ভাগ করা যায় না।',
          'তাই `w > 2 && (w & 1) == 0` শর্তে বাউন্ডারি চেক আগে রাখা এবং প্রতিটি `if` ব্লকে `{}` ব্র্যাকেট দেওয়া আবশ্যক।',
        ],
        memoryDiagram: `w=2 -> w>2 (false) -> "NO" | w=8 -> 8>2 && even -> "YES"`,
        code: `#include <stdio.h>

int main(void) {
    int w = 0;
    if (scanf("%d", &w) == 1) {
        if (w > 2 && (w & 1) == 0) {
            printf("YES\\n");
        } else {
            printf("NO\\n");
        }
    }
    return 0;
}`,
        stdin: '8',
        expectedOutput: 'YES',
        lineByLine: [
          { lineNumber: 'Line 6', codeSnippet: 'if (w > 2 && (w & 1) == 0)', whatItMeans: 'Checks both minimum threshold (> 2) and even parity.', whyItIsThere: 'w = 2 cannot split into two positive even integers.', ifDeletedError: 'Fails Codeforces test case w = 2.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 1', codeSnippet: '#include <stdio.h>', whatItMeans: 'Imports standard I/O header containing printf declarations.', whyItIsThere: 'Required so C23 compiler resolves printf signature.', ifDeletedError: 'Compile error: implicit declaration of function printf.' },
      { lineNumber: 'Line 3', codeSnippet: 'int main(void) {', whatItMeans: 'Declares hosted entry function taking zero arguments.', whyItIsThere: 'OS runtime jumps here when execution begins.', ifDeletedError: 'Linker error: undefined reference to main.' },
      { lineNumber: 'Line 4', codeSnippet: 'int score = 85;', whatItMeans: 'Allocates stack variable score initialized to 85.', whyItIsThere: 'Supplies numeric value for conditional branch routing.', ifDeletedError: 'Compile error: score undeclared.' },
      { lineNumber: 'Line 5', codeSnippet: 'if (score < 0 || score > 100) {', whatItMeans: 'Guard clause rejecting out-of-range inputs before grading.', whyItIsThere: 'Isolates invalid inputs immediately using logical OR ||.', ifDeletedError: 'Invalid scores like 150 or -5 fall into grading thresholds.' },
      { lineNumber: 'Line 7', codeSnippet: '} else if (score >= 90) {', whatItMeans: 'First valid tier test after range guard succeeds.', whyItIsThere: 'Captures top tier without needing redundant <= 100 check.', ifDeletedError: 'Scores 90..100 misclassified as A.' },
      { lineNumber: 'Line 9', codeSnippet: '} else if (score >= 80) {', whatItMeans: 'Matched branch for 85; prints A and skips remaining else.', whyItIsThere: 'Ensures mutually exclusive decision path.', ifDeletedError: 'Score 85 drops into Pass/Fail fallback.' },
    ],
    dryRunTable: [
      { step: 1, state: 'Initialize score', memoryOrStack: 'score = 85', note: 'Stack variable set' },
      { step: 2, state: 'Test guard (score < 0 || score > 100)', memoryOrStack: 'false || false -> 0', note: 'Proceeds to grade chain' },
      { step: 3, state: 'Test score >= 90', memoryOrStack: '85 >= 90 -> 0', note: 'Skipped' },
      { step: 4, state: 'Test score >= 80', memoryOrStack: '85 >= 80 -> 1 (True)', note: 'Prints "A" & skips else' },
    ],
    harryBugTraps: [
      {
        title: 'Missing break; Inside switch Case (Fall-Through)',
        brokenCode: `switch (op) {\n  case '+': printf("ADD ");\n  case '-': printf("SUB"); break;\n}`,
        fixedCode: `#include <stdio.h>\nint main(void) {\n    char op = '+';\n    switch (op) {\n        case '+': printf("ADD\\n"); break;\n        case '-': printf("SUB\\n"); break;\n    }\n    return 0;\n}`,
        whyItBreaks: 'Without break;, execution cascades directly into case \'-\' and prints both labels.',
      },
      {
        title: 'Trailing Semicolon After if Condition',
        brokenCode: `if (x > 100);\n    printf("Big\\n");`,
        fixedCode: `#include <stdio.h>\nint main(void) {\n    int x = 50;\n    if (x > 100) {\n        printf("Big\\n");\n    }\n    return 0;\n}`,
        whyItBreaks: 'The stray semicolon terminates an empty if body, so printf executes unconditionally every time!',
      },
      {
        title: 'Assignment = Instead of Equality == Inside if()',
        brokenCode: `if (flag = 0) printf("Zero");`,
        fixedCode: `#include <stdio.h>\nint main(void) {\n    int flag = 0;\n    if (flag == 0) printf("Zero\\n");\n    return 0;\n}`,
        whyItBreaks: 'if (flag = 0) overwrites flag with 0 and always evaluates false; enable -Wall to catch this.',
      },
    ],
    practiceSheet: [
      {
        id: 'c-ch-6-q1',
        difficulty: 'Easy',
        title: '1. Sign & Zero Classifier',
        prompt: 'Read integer x and print "POSITIVE", "NEGATIVE", or "ZERO".',
        banglaHint: 'x > 0, x < 0 এবং else ব্যবহার করে তিনটি শর্ত সাজাও।',
        starterCode: `#include <stdio.h>\nint main(void) {\n    long long x = 0;\n    if (scanf("%lld", &x) == 1) {\n        if (x > 0) printf("POSITIVE\\n");\n        else if (x < 0) printf("NEGATIVE\\n");\n        else printf("ZERO\\n");\n    }\n    return 0;\n}`,
        sampleStdin: '-14',
        expectedOutput: 'NEGATIVE',
      },
      {
        id: 'c-ch-6-q2',
        difficulty: 'Easy',
        title: '2. Maximum of Three Numbers',
        prompt: 'Read three integers a, b, c and print the largest.',
        banglaHint: 'শুরুতে mx = a ধরে b এবং c-এর সাথে তুলনা করো।',
        starterCode: `#include <stdio.h>\nint main(void) {\n    int a = 0, b = 0, c = 0;\n    if (scanf("%d %d %d", &a, &b, &c) == 3) {\n        int mx = a;\n        if (b > mx) mx = b;\n        if (c > mx) mx = c;\n        printf("%d\\n", mx);\n    }\n    return 0;\n}`,
        sampleStdin: '14 99 42',
        expectedOutput: '99',
      },
      {
        id: 'c-ch-6-q3',
        difficulty: 'Medium',
        title: '3. Valid Triangle & Classification',
        prompt: 'Read side lengths a, b, c. Print "INVALID", "EQUILATERAL", "ISOSCELES", or "SCALENE".',
        banglaHint: 'আগে a + b > c && a + c > b && b + c > a দিয়ে বৈধ ত্রিভুজ কি না যাচাই করো।',
        starterCode: `#include <stdio.h>\nint main(void) {\n    long long a = 0, b = 0, c = 0;\n    if (scanf("%lld %lld %lld", &a, &b, &c) == 3) {\n        if (a <= 0 || b <= 0 || c <= 0 || a + b <= c || a + c <= b || b + c <= a) printf("INVALID\\n");\n        else if (a == b && b == c) printf("EQUILATERAL\\n");\n        else if (a == b || b == c || a == c) printf("ISOSCELES\\n");\n        else printf("SCALENE\\n");\n    }\n    return 0;\n}`,
        sampleStdin: '5 5 8',
        expectedOutput: 'ISOSCELES',
      },
      {
        id: 'c-ch-6-q4',
        difficulty: 'Medium',
        title: '4. Vowel vs Consonant Switch Dispatcher',
        prompt: 'Read one lowercase letter c; print "VOWEL" if a/e/i/o/u else "CONSONANT" using switch.',
        banglaHint: 'পাঁচটি vowel কেস পাশাপাশি রেখে intentional fall-through ব্যবহার করো।',
        starterCode: `#include <stdio.h>\nint main(void) {\n    char c = 0;\n    if (scanf(" %c", &c) == 1) {\n        switch (c) {\n            case 'a': case 'e': case 'i': case 'o': case 'u':\n                printf("VOWEL\\n"); break;\n            default:\n                printf("CONSONANT\\n"); break;\n        }\n    }\n    return 0;\n}`,
        sampleStdin: 'e',
        expectedOutput: 'VOWEL',
      },
      {
        id: 'c-ch-6-q5',
        difficulty: 'Hard',
        title: '5. Electricity Bill Tiered Slab Calculator',
        prompt: 'Read units u: first 50 @ 5, next 100 @ 8, above 150 @ 12. Print total integer bill.',
        banglaHint: 'u > 150, u > 50 ইত্যাদি ধাপে প্রতিটি স্ল্যাবের হিসাব আলাদা করে যোগ করো।',
        starterCode: `#include <stdio.h>\nint main(void) {\n    long long u = 0, bill = 0;\n    if (scanf("%lld", &u) == 1 && u >= 0) {\n        if (u <= 50) bill = u * 5;\n        else if (u <= 150) bill = 50 * 5 + (u - 50) * 8;\n        else bill = 50 * 5 + 100 * 8 + (u - 150) * 12;\n        printf("%lld\\n", bill);\n    }\n    return 0;\n}`,
        sampleStdin: '180',
        expectedOutput: '1410',
      },
    ],
    miniBuild: {
      title: 'Tiered Grade & Guard-Clause Router',
      description: 'Validates numeric score boundaries cleanly and emits exact grade band.',
      banglaGoal: 'গার্ড ক্লজ ও else-if ব্রাঞ্চিং ব্যবহার করে নির্ভুল গ্রেড রাউটার বানানো।',
      combinesChapters: 'Ch 1–6',
      starterCode: `#include <stdio.h>

int main(void) {
    int score = 0;
    if (scanf("%d", &score) == 1) {
        if (score < 0 || score > 100) printf("INVALID\\n");
        else if (score >= 90) printf("A+\\n");
        else if (score >= 80) printf("A\\n");
        else if (score >= 70) printf("B\\n");
        else if (score >= 60) printf("C\\n");
        else printf("F\\n");
    }
    return 0;
}`,
      sampleStdin: '85',
      expectedOutput: 'A',
    },
    starterCode: `#include <stdio.h>

int main(void) {
    int score = 0;
    if (scanf("%d", &score) == 1) {
        if (score < 0 || score > 100) printf("INVALID\\n");
        else if (score >= 90) printf("A+\\n");
        else if (score >= 80) printf("A\\n");
        else if (score >= 70) printf("B\\n");
        else if (score >= 60) printf("C\\n");
        else printf("F\\n");
    }
    return 0;
}`,
    sampleStdin: '85',
    expectedSampleOutput: 'A',
    testCases: [
      { id: 'c6-t1', input: '85', expectedOutput: 'A' },
      { id: 'c6-t2', input: '-5', expectedOutput: 'INVALID', isHidden: true },
    ],
  },

  7: {
    chapterNumber: 7,
    title: 'C Chapter 7 (C23): Entry & Exit Controlled Loops (while, do-while, for)',
    banglaTitle: 'C অধ্যায় ৭ (C23): এন্ট্রি ও এক্সিট কন্ট্রোল্ড লুপ (while, do-while, for)',
    subtitle: 'Loop invariants, pre-test vs post-test execution, digit extraction on n=0, break/continue, and half-open [0, n) bounds.',
    zeroIntuition: {
      plainEnglishStory:
        'Repeating an action 100,000 times manually is impossible—loops let a single compact block repeat dynamically using a loop-control variable stored in a fast CPU register.\n\nC divides loops into Entry-Controlled (`for` and `while`, which test their condition BEFORE iteration 1) and Exit-Controlled (`do-while`, which runs the body once first and tests afterward). Knowing why `do-while` handles `n = 0` naturally during digit extraction while `for (int i = 0; i < n; i++)` eliminates off-by-one bugs builds unbreakable loop intuition.',
      asciiFlowchart: `  ENTRY-CONTROLLED (for / while)        EXIT-CONTROLLED (do-while)
    [ Check Condition? ]                  [ Execute Body ONCE ]
        |          |                              |
      False       True                            v
        |          v                     [ Check Condition? ]
        |     [ Run Body ]                    |         |
        |          |                        False      True --> loop back
        v          +--> loop back             v
     ( EXIT )                              ( EXIT )`,
      pseudocode: [
        '1. CHOOSE for when iteration count is known [0..n)',
        '2. CHOOSE while when termination depends on changing data (x > 0)',
        '3. CHOOSE do-while when at least 1 iteration is mandatory (n == 0 digits)',
        '4. ENSURE loop state strictly approaches termination condition',
      ],
      banglaZeroToHero: {
        analogyTitle: 'দৌড়ের ল্যাপ গণনা বনাম ডোরবেল বাজানো (Entry vs Exit Loop)',
        explanation:
          'মাঠে কত পাক দৌড়াতে হবে তা আগে থেকে জানা থাকলে আমরা `for` লুপ ব্যবহার করি—যেমন ১ থেকে ১০ পর্যন্ত গোনা। কিন্তু কাজ কখন শেষ হবে তা যদি ফলাফলের ওপর নির্ভর করে (যেমন ভাগফল ০ না হওয়া পর্যন্ত ভাগ করা), তখন `while` লুপ সবচেয়ে ভালো। `for` ও `while` দুটিই হলো Entry-Controlled লুপ—মানে ঘরে ঢোকার আগেই দরজায় শর্ত চেক হয়, শর্ত মিথ্যা হলে একবারও ভেতরে ঢোকে না। কিন্তু `do-while` হলো Exit-Controlled লুপ—এটি অন্তত একবার কাজ করার পর বের হওয়ার দরজায় শর্ত চেক করে! এর দারুণ উদাহরণ হলো সংখ্যার অঙ্ক (Digit) গোনা: ইনপুট `0` দিলে সাধারণ `while (n > 0)` লুপ ০ বার ঘুরে ভুল উত্তর `0` দেয়, অথচ `do-while` অন্তত ১ বার চলে সঠিক উত্তর `1` দেয়। লুপের ভেতর `break` দিলে তখনই পুরো লুপ থেমে যায়, আর `continue` দিলে শুধু বর্তমান ধাপ স্কিপ করে পরের ধাপে চলে যায়। তবে সাবধান: `while` লুপে `continue` দেওয়ার আগে অবশ্যই কাউন্টার `i++` আপডেট করতে হবে, নইলে অসীম লুপে (Infinite Loop) আটকে যাবে। আরেকটি গুরুত্বপূর্ণ নিয়ম হলো লুপ `i = 0` থেকে `i < n` পর্যন্ত চালানো—এতে অ্যারে বা স্ট্রিংয়ের সীমা ছাড়ানোর (Off-by-one) ভয় থাকে না।',
        everydayExample:
          'বাসে ওঠার আগে ভাড়া আছে কি না চেক করা হলো `while` (Entry-Controlled), আর হোটেলে ঢুকে খাবার অর্ডার করে খাওয়ার পর বিল দেখা হলো `do-while` (Exit-Controlled)!',
        keyTakeaways: [
          'শূন্য (`0`) ইনপুটে অন্তত একবার কোড চালাতে `do { ... } while (x > 0);` ব্যবহার করো।',
          '`for (int i = 0; i < n; i++);`—ভুলেও বন্ধনীর পর সেমিকোলন `;` দেবে না!',
          '`while` লুপে `continue` করার আগেই ভ্যারিয়েবল আপডেট নিশ্চিত করো।',
        ],
      },
    },
    topics: [
      {
        id: 'c-ch-7-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Counting & Accumulating With Entry-Controlled for Loop',
        englishParagraphs: [
          'The C `for` header packs three clauses cleanly on one line: `init` (`int i = 1`), `condition` (`i <= n`), and `step` (`i++`). C23 declares `i` scoped strictly inside the loop so it does not leak outside.',
          'Notice how using `long long sum = 0` avoids accumulator overflow when summing sequences.',
        ],
        banglaParagraphs: [
          'কোনো কাজ ঠিক `n` বার চালাতে হলে `for` লুপ সেরা, কারণ শুরু (`i = 1`), শর্ত (`i <= n`) ও বৃদ্ধি (`i++`) একসাথে একই লাইনে দেখা যায়।',
          'এই উদাহরণে `1` থেকে `5` পর্যন্ত প্রতিটি সংখ্যার যোগফল ধাপে ধাপে জমা করা হয়েছে।',
        ],
        memoryDiagram: `i=1->sum=1 | i=2->sum=3 | i=3->sum=6 | i=4->sum=10 | i=5->sum=15`,
        code: `#include <stdio.h>

int main(void) {
    int n = 5;
    long long sum = 0;
    for (int i = 1; i <= n; i++) {
        sum += i;
    }
    printf("sum=%lld\\n", sum);
    return 0;
}`,
        stdin: '',
        expectedOutput: 'sum=15',
        lineByLine: [
          { lineNumber: 'Line 4', codeSnippet: 'int n = 5;', whatItMeans: 'Sets upper loop boundary to 5.', whyItIsThere: 'Defines deterministic finite iteration count.', ifDeletedError: 'Compile error: undeclared identifier n.' },
          { lineNumber: 'Line 6', codeSnippet: 'for (int i = 1; i <= n; i++) {', whatItMeans: 'Initializes i=1 and repeats while i <= 5 incrementing i each step.', whyItIsThere: 'Drives exact 5-iteration accumulation pass.', ifDeletedError: 'Loop never executes and sum stays 0.' },
          { lineNumber: 'Line 7', codeSnippet: 'sum += i;', whatItMeans: 'Adds current counter i into 64-bit accumulator sum.', whyItIsThere: 'Maintains running partial sum invariant.', ifDeletedError: 'Output prints "sum=0" instead of "sum=15".' },
        ],
      },
      {
        id: 'c-ch-7-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Digit Counter With Exit-Controlled do-while (Handles n = 0)',
        englishParagraphs: [
          'If you count digits using `while (n > 0) { digits++; n /= 10; }`, input `n = 0` skips the loop completely and falsely prints `0` digits!',
          'Because `do { ... } while (x > 0);` executes the body BEFORE checking the condition, `0` counts as `1` digit automatically with zero extra `if` branches.',
        ],
        banglaParagraphs: [
          'ইনপুট `0` বা নেগেটিভ সংখ্যা হলে অঙ্ক গোনায় `while` লুপ প্রায়ই আটকে যায়—`0` দিলে `while (x > 0)` একবারও চলে না!',
          '`do-while` লুপ কমপক্ষে একবার চলে বলে `0`-কেও সঠিকভাবে ১ অঙ্কের সংখ্যা হিসেবে গণনা করে।',
        ],
        memoryDiagram: `stdin: 0 -> do: digits=1, x=0 -> while(0>0) FALSE -> prints digits=1`,
        code: `#include <stdio.h>

int main(void) {
    long long n = 0;
    if (scanf("%lld", &n) == 1) {
        long long x = (n < 0) ? -n : n;
        int digits = 0;
        do {
            digits++;
            x /= 10;
        } while (x > 0);
        printf("digits=%d\\n", digits);
    }
    return 0;
}`,
        stdin: '0',
        expectedOutput: 'digits=1',
        lineByLine: [
          { lineNumber: 'Line 6', codeSnippet: 'long long x = (n < 0) ? -n : n;', whatItMeans: 'Normalizes negative inputs to positive magnitude safely.', whyItIsThere: 'Ensures condition x > 0 works for negative integers.', ifDeletedError: 'Negative input exits after 1 iteration incorrectly.' },
          { lineNumber: 'Line 8', codeSnippet: 'do {', whatItMeans: 'Starts exit-controlled loop guaranteed to execute at least once.', whyItIsThere: 'Integer 0 itself has 1 decimal digit.', ifDeletedError: 'Replacing with while(x > 0) yields digits=0 for input 0.' },
        ],
      },
      {
        id: 'c-ch-7-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Sentinel While Loop & Break/Continue Transaction Filter',
        englishParagraphs: [
          'Event parsers and ATM consoles read transactions until hitting a sentinel (`-1`). Negative anomalies are skipped with `continue`, while sentinel `-1` exits immediately via `break`.',
          'Checking `scanf == 1` inside the `while` condition protects against premature EOF without infinite loops.',
        ],
        banglaParagraphs: [
          'রিয়েল-ওয়ার্ল্ড ব্যাংকিং লগ প্রসেসরে `-1` সেন্টিনেল ভ্যালু পাওয়া পর্যন্ত ডেটা পড়া হয় এবং মাঝে কোনো অবৈধ নেগেটিভ সংখ্যা এলে `continue` দিয়ে এড়িয়ে যাওয়া হয়।',
          '`break` লুপ পুরোপুরি থামায়, আর `continue` কেবল ওই ধাপের বাকি কাজ বাদ দিয়ে পরের ইনপুটে যায়।',
        ],
        memoryDiagram: `stream: 100 -> (-5 skipped) -> 250 -> (-1 break) => valid_total=350`,
        code: `#include <stdio.h>

int main(void) {
    long long amt = 0, total = 0;
    while (scanf("%lld", &amt) == 1) {
        if (amt == -1) break;
        if (amt < 0) continue;
        total += amt;
    }
    printf("total=%lld\\n", total);
    return 0;
}`,
        stdin: '100 -5 250 -1',
        expectedOutput: 'total=350',
        lineByLine: [
          { lineNumber: 'Line 6', codeSnippet: 'if (amt == -1) break;', whatItMeans: 'Terminates while loop immediately upon sentinel value -1.', whyItIsThere: 'Sentinel marks clean end of transaction stream.', ifDeletedError: 'Sentinel -1 would fall into continue/sum logic.' },
          { lineNumber: 'Line 7', codeSnippet: 'if (amt < 0) continue;', whatItMeans: 'Skips invalid negative entry and jumps to next scanf iteration.', whyItIsThere: 'Prevents corrupted negative values from shrinking total.', ifDeletedError: 'Subtracts 5 and prints 345 instead of 350.' },
        ],
      },
      {
        id: 'c-ch-7-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Euclidean GCD Loop vs Slow Linear Factor Scan',
        englishParagraphs: [
          'Finding the Greatest Common Divisor by decrementing `i` from `min(a, b)` takes O(min(a, b)) steps—instant TLE when `a, b = 10^9`!',
          'Euclid’s `while (b != 0)` modulo loop cuts values logarithmically in O(log(min(a, b)))—under 45 iterations even for 10^18!',
        ],
        banglaParagraphs: [
          'দুটি বিশাল সংখ্যার গ.সা.গু (GCD) যদি ১ থেকে লুপ চালিয়ে বের করতে যাও, তবে `10^9` ইনপুটে প্রোগ্রাম নিশ্চিত TLE খাবে।',
          'ইউক্লিডের `while (b != 0)` অ্যালগরিদমে ভাগশেষ নিয়ে অদলবদল করলে `10^18` সংখ্যাতেও মাত্র ৫০ ধাপের কম সময়ে উত্তর আসে!',
        ],
        memoryDiagram: `gcd(48, 18) -> (18, 12) -> (12, 6) -> (6, 0) -> returns 6`,
        code: `#include <stdio.h>

int main(void) {
    long long a = 0, b = 0;
    if (scanf("%lld %lld", &a, &b) == 2) {
        while (b != 0) {
            long long rem = a % b;
            a = b;
            b = rem;
        }
        printf("%lld\\n", a);
    }
    return 0;
}`,
        stdin: '48 18',
        expectedOutput: '6',
        lineByLine: [
          { lineNumber: 'Line 6', codeSnippet: 'while (b != 0) {', whatItMeans: 'Loops until remainder becomes 0; invariant gcd(a, b) unchanged.', whyItIsThere: 'Runs in O(log(min(a, b))) time instead of O(n).', ifDeletedError: 'Would skip Euclidean reduction and fail modulo step.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 1', codeSnippet: '#include <stdio.h>', whatItMeans: 'Includes standard I/O prototypes such as printf.', whyItIsThere: 'Provides declaration for stdout printing.', ifDeletedError: 'Compile error: implicit declaration of function printf.' },
      { lineNumber: 'Line 3', codeSnippet: 'int main(void) {', whatItMeans: 'Entry function invoked by C runtime.', whyItIsThere: 'Starts program execution cleanly.', ifDeletedError: 'Linker error: undefined reference to main.' },
      { lineNumber: 'Line 4', codeSnippet: 'int n = 5;', whatItMeans: 'Upper inclusive loop limit.', whyItIsThere: 'Controls exact repetition bound.', ifDeletedError: 'Compile error: n undeclared.' },
      { lineNumber: 'Line 5', codeSnippet: 'long long sum = 0;', whatItMeans: 'Initializes 64-bit accumulator before loop begins.', whyItIsThere: 'Prevents garbage value accumulation and int overflow.', ifDeletedError: 'Undefined garbage sum or compile failure.' },
      { lineNumber: 'Line 6', codeSnippet: 'for (int i = 1; i <= n; i++) {', whatItMeans: 'Entry-controlled loop iterating i = 1, 2, 3, 4, 5.', whyItIsThere: 'Repeats sum += i cleanly without code duplication.', ifDeletedError: 'Accumulator never increments; prints sum=0.' },
      { lineNumber: 'Line 7', codeSnippet: 'sum += i;', whatItMeans: 'Adds current loop counter i into running sum.', whyItIsThere: 'Performs core iterative state transition.', ifDeletedError: 'Output stays sum=0.' },
    ],
    dryRunTable: [
      { step: 1, state: 'Before loop starts', memoryOrStack: 'n=5, sum=0, i=1', note: 'Condition 1 <= 5 true' },
      { step: 2, state: 'Iteration 1 & 2', memoryOrStack: 'i=1->sum=1; i=2->sum=3', note: 'Invariant sum = 1..i' },
      { step: 3, state: 'Iterations 3..5', memoryOrStack: 'sum=6 -> 10 -> 15; i=6', note: '6 <= 5 becomes false' },
      { step: 4, state: 'Loop exits', memoryOrStack: 'stdout="sum=15"', note: 'i goes out of scope' },
    ],
    harryBugTraps: [
      {
        title: 'Accidental Semicolon Right After for(...) Header',
        brokenCode: `for (int i = 0; i < 5; i++);\n    printf("Hi\\n");`,
        fixedCode: `#include <stdio.h>\nint main(void) {\n    for (int i = 0; i < 5; i++) {\n        printf("Hi\\n");\n    }\n    return 0;\n}`,
        whyItBreaks: 'A semicolon right after for(...) forms an empty loop body, so printf runs only ONCE after the loop finishes.',
      },
      {
        title: 'Forgetting Counter Increment Before continue in while Loop',
        brokenCode: `int i = 0;\nwhile (i < 5) { if (i == 2) continue; i++; }`,
        fixedCode: `#include <stdio.h>\nint main(void) {\n    for (int i = 0; i < 5; i++) {\n        if (i == 2) continue;\n        printf("%d ", i);\n    }\n    return 0;\n}`,
        whyItBreaks: 'When i == 2 hits continue, i++ is skipped forever, locking the program in an infinite loop (TLE).',
      },
      {
        title: 'Using while(n > 0) for Digit Count When Input Can Be 0',
        brokenCode: `int cnt = 0; while (n > 0) { cnt++; n /= 10; }`,
        fixedCode: `#include <stdio.h>\nint main(void) {\n    int n = 0, cnt = 0;\n    do { cnt++; n /= 10; } while (n > 0);\n    printf("%d\\n", cnt);\n    return 0;\n}`,
        whyItBreaks: 'For n = 0, while(0 > 0) runs zero iterations and outputs 0 instead of 1 digit.',
      },
    ],
    practiceSheet: [
      {
        id: 'c-ch-7-q1',
        difficulty: 'Easy',
        title: '1. Factorial Using 64-Bit Loop',
        prompt: 'Read integer n (0 <= n <= 20) and print n! using a for loop.',
        banglaHint: '0! = 1 ধরে `long long ans = 1` দিয়ে 1..n পর্যন্ত গুণ করো।',
        starterCode: `#include <stdio.h>\nint main(void) {\n    int n = 0;\n    if (scanf("%d", &n) == 1) {\n        long long ans = 1;\n        for (int i = 2; i <= n; i++) ans *= i;\n        printf("%lld\\n", ans);\n    }\n    return 0;\n}`,
        sampleStdin: '5',
        expectedOutput: '120',
      },
      {
        id: 'c-ch-7-q2',
        difficulty: 'Easy',
        title: '2. Sum of Digits Using While Loop',
        prompt: 'Read non-negative integer n and print the sum of its decimal digits.',
        banglaHint: 'n % 10 দিয়ে শেষ অঙ্ক যোগ করে n /= 10 দিয়ে ছোট করো।',
        starterCode: `#include <stdio.h>\nint main(void) {\n    long long n = 0, s = 0;\n    if (scanf("%lld", &n) == 1) {\n        do { s += n % 10; n /= 10; } while (n > 0);\n        printf("%lld\\n", s);\n    }\n    return 0;\n}`,
        sampleStdin: '4092',
        expectedOutput: '15',
      },
      {
        id: 'c-ch-7-q3',
        difficulty: 'Medium',
        title: '3. Integer Reverse Without Overflow',
        prompt: 'Read non-negative integer n and print its reversed integer (1200 -> 21).',
        banglaHint: 'rev = rev * 10 + (n % 10) সূত্রে লুপ চালাও।',
        starterCode: `#include <stdio.h>\nint main(void) {\n    long long n = 0, rev = 0;\n    if (scanf("%lld", &n) == 1) {\n        do { rev = rev * 10 + (n % 10); n /= 10; } while (n > 0);\n        printf("%lld\\n", rev);\n    }\n    return 0;\n}`,
        sampleStdin: '1200',
        expectedOutput: '21',
      },
      {
        id: 'c-ch-7-q4',
        difficulty: 'Medium',
        title: '4. Collatz Steps Counter',
        prompt: 'Start at n: while n > 1, if even n/=2 else n=3*n+1. Print step count.',
        banglaHint: 'n যতক্ষণ > 1 ততক্ষণ while লুপে শর্ত মেনে ধাপ গুনতে থাকো।',
        starterCode: `#include <stdio.h>\nint main(void) {\n    long long n = 0;\n    if (scanf("%lld", &n) == 1) {\n        int steps = 0;\n        while (n > 1) {\n            n = (n % 2 == 0) ? (n / 2) : (3 * n + 1);\n            steps++;\n        }\n        printf("%d\\n", steps);\n    }\n    return 0;\n}`,
        sampleStdin: '6',
        expectedOutput: '8',
      },
      {
        id: 'c-ch-7-q5',
        difficulty: 'Hard',
        title: '5. Fast O(log n) Euclidean GCD',
        prompt: 'Read two integers a and b up to 10^18 and print gcd(a, b).',
        banglaHint: 'while (b != 0) { long long t = a % b; a = b; b = t; } ব্যবহার করো।',
        starterCode: `#include <stdio.h>\nint main(void) {\n    long long a = 0, b = 0;\n    if (scanf("%lld %lld", &a, &b) == 2) {\n        while (b != 0) { long long t = a % b; a = b; b = t; }\n        printf("%lld\\n", a);\n    }\n    return 0;\n}`,
        sampleStdin: '1000000000000 750000000000',
        expectedOutput: '250000000000',
      },
    ],
    miniBuild: {
      title: 'Digit Counter & Loop Invariant Engine',
      description: 'Counts exact digits safely for zero, positive, and negative integers via do-while.',
      banglaGoal: '০ ও নেগেটিভ সংখ্যা সহ নির্ভুলভাবে ডিজিট গণনাকারী লুপ তৈরি করা।',
      combinesChapters: 'Ch 1–7',
      starterCode: `#include <stdio.h>

int main(void) {
    long long n = 0;
    if (scanf("%lld", &n) == 1) {
        long long x = (n < 0) ? -n : n;
        int digits = 0;
        do {
            digits++;
            x /= 10;
        } while (x > 0);
        printf("%d\\n", digits);
    }
    return 0;
}`,
      sampleStdin: '2026',
      expectedOutput: '4',
    },
    starterCode: `#include <stdio.h>

int main(void) {
    long long n = 0;
    if (scanf("%lld", &n) == 1) {
        long long x = (n < 0) ? -n : n;
        int digits = 0;
        do {
            digits++;
            x /= 10;
        } while (x > 0);
        printf("%d\\n", digits);
    }
    return 0;
}`,
    sampleStdin: '2026',
    expectedSampleOutput: '4',
    testCases: [
      { id: 'c7-t1', input: '2026', expectedOutput: '4' },
      { id: 'c7-t2', input: '0', expectedOutput: '1', isHidden: true },
    ],
  },

  8: {
    chapterNumber: 8,
    title: 'C Chapter 8 (C23): Nested Loops & Star/Number Pattern Printing Mastery',
    banglaTitle: 'C অধ্যায় ৮ (C23): নেস্টেড লুপ ও স্টার/নাম্বার প্যাটার্ন প্রিন্টিং মাস্টারি',
    subtitle: '2D row-column coordinate mapping, centered pyramids, hollow box borders, Floyd’s triangle, and symmetry formulas.',
    zeroIntuition: {
      plainEnglishStory:
        'Why do technical interviews and coding courses begin with star patterns? Because every pattern is actually a 2D coordinate grid (`row i`, `col j`) in disguise! Before you ever build a dynamic programming table, adjacency matrix, or 2D game map, nested loops teach your brain to map `(i, j)` positions directly to mathematical rules.\n\nEvery pattern reduces cleanly to three questions: (1) How many rows does the outer loop `i` run? (2) On row `i`, how many leading spaces print before symbols? (3) How many stars/digits or what boundary formula (`i == 0 || i == n - 1 || j == 0 || j == n - 1`) controls each column `j`?',
      asciiFlowchart: `  Row i (outer loop 1..n) --> [ Spaces: n - i ] + [ Stars: 2*i - 1 ]
     i = 1:  "   *"      (spaces=3, stars=1)
     i = 2:  "  ***"     (spaces=2, stars=3)
     i = 3:  " *****"    (spaces=1, stars=5)
     i = 4:  "*******"   (spaces=0, stars=7)`,
      pseudocode: [
        '1. READ grid size n from stdin',
        '2. OUTER LOOP row i from 0 to n - 1',
        '3. INNER LOOP spaces if centered/right-aligned',
        '4. INNER LOOP columns j applying row/border rule',
        '5. EMIT newline \\n after each complete row',
      ],
      banglaZeroToHero: {
        analogyTitle: 'খাতার লাইন ও কলাম মেপে নকশা আঁকা (Row-Column Coordinate Math)',
        explanation:
          'একটি রুল-টানা খাতায় পিরামিড বা বর্গক্ষেত্র আঁকার কথা ভাবো—একটি লাইন শেষ করে নিচের লাইনে নামা হলো বাইরের লুপ (`i`), আর প্রতিটি লাইনের ভেতর বাম থেকে ডানে ঘর গুনে `*` বা সংখ্যা বসানো হলো ভেতরের লুপ (`j`)। প্যাটার্ন প্রিন্টিং মুখস্থ করার জিনিস নয়; বরং এটি ২ডি ম্যাট্রিক্স ও DP টেবিলের কোঅর্ডিনেট বোঝার সেরা অনুশীলন। যেকোনো প্যাটার্ন দেখলেই আগে কাগজে সারি নম্বর `i` লিখে পাশে কয়টি স্পেস ও কয়টি `*` লাগবে তার একটি ছোট টেবিল বানিয়ে নেবে। যেমন `n = 4`-এর সোজা পিরামিডে `i`-তম সারিতে স্পেস লাগে `n - i` টি আর তারা লাগে `2*i - 1` টি! আবার ফাঁপা বর্গক্ষেত্র বা ফ্রেম আঁকতে শুধু চারপাশের বর্ডার `i == 0 || i == n - 1 || j == 0 || j == n - 1` হলে `*` আর ভেতরে স্পেস প্রিন্ট করলেই হয়ে যায়। সংখ্যার ত্রিভুজে যেমন ফ্লয়েডের ত্রিভুজ আঁকতে বাইরের একটি `num = 1` কাউন্টার রাখলেই হয় যা প্রতি প্রিন্টে ১ করে বাড়ে। অনলাইন জাজে লাইনের শেষে অযথা অতিরিক্ত স্পেস (Trailing space) দিলে Presentation Error বা Wrong Answer আসে—তাই ডান দিকের স্পেস বাদ দিতে হয়। আর খেয়াল রাখবে দুটি নেস্টেড লুপ মানেই মোট `n * n` বার কাজ হবে, অর্থাৎ `O(n^2)` সময় লাগবে।',
        everydayExample:
          'ক্লাসরুমে ৪ সারি বেঞ্চে প্রতিটি সারিতে ৫ জন ছাত্র বসলে মোট `4 * 5 = 20` আসন চেক করতে হয়—সারি হলো বাইরের লুপ, আর আসন হলো ভেতরের লুপ।',
        keyTakeaways: [
          'যেকোনো পিরামিডে: বাইরের লুপ `i` = সারি, ১ম ভেতরের লুপ = স্পেস, ২য় ভেতরের লুপ = `*` বা সংখ্যা।',
          'ফাঁপা বক্স আঁকার সূত্র: কেবল `i == 0 || i == n - 1 || j == 0 || j == n - 1` হলে `*` দাও।',
          'প্রতিটি সারির কাজ শেষ হওয়ার ঠিক পরেই একটি `printf("\\n")` দিতে হবে।',
        ],
      },
    },
    topics: [
      {
        id: 'c-ch-8-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Right-Angled Star Triangle & Coordinate Grid',
        englishParagraphs: [
          'A right triangle of height `n` prints `i` stars on row `i`. Separating `row` and `col` clearly into distinct loop variables makes off-by-one errors immediately obvious.',
          'Outputting stars side-by-side in the inner loop and printing `\\n` once at the end of the outer loop forms the 2D shape.',
        ],
        banglaParagraphs: [
          'সবচেয়ে মৌলিক প্যাটার্ন হলো ডান-কোণী ত্রিভুজ, যেখানে ১ম সারিতে ১টি, ২য় সারিতে ২টি, এভাবে `r`-তম সারিতে `r`টি `*` প্রিন্ট হয়।',
          'ভেতরের লুপ একটি সারির সব `*` প্রিন্ট করে শেষ হলে বাইরের লুপের শেষে `\\n` দিয়ে নতুন সারিতে নামা হয়।',
        ],
        memoryDiagram: `row=1->1* | row=2->2* | row=3->3* | row=4->4* (total iterations: 10)`,
        code: `#include <stdio.h>

int main(void) {
    int n = 4;
    for (int row = 1; row <= n; row++) {
        for (int col = 1; col <= row; col++) {
            printf("*");
        }
        printf("\\n");
    }
    return 0;
}`,
        stdin: '',
        expectedOutput: '*\n**\n***\n****',
        lineByLine: [
          { lineNumber: 'Line 5', codeSnippet: 'for (int row = 1; row <= n; row++) {', whatItMeans: 'Iterates through rows 1 to n from top to bottom.', whyItIsThere: 'Controls height of the triangle.', ifDeletedError: 'Compile error: row undeclared in inner loop.' },
          { lineNumber: 'Line 6', codeSnippet: 'for (int col = 1; col <= row; col++) {', whatItMeans: 'Prints exactly `row` stars along current horizontal line.', whyItIsThere: 'Links horizontal width cleanly to vertical row index.', ifDeletedError: 'Prints single star instead of expanding triangle.' },
          { lineNumber: 'Line 9', codeSnippet: 'printf("\\n");', whatItMeans: 'Moves cursor to the start of next row.', whyItIsThere: 'Without newline, all stars flatten onto one horizontal line.', ifDeletedError: 'Prints "**********" on 1 line.' },
        ],
      },
      {
        id: 'c-ch-8-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Centered Pyramid With Space Formula (n - row)',
        englishParagraphs: [
          'To center a pyramid of `n` rows, row `row` first needs `n - row` leading spaces, followed by `2 * row - 1` stars.',
          'Notice we intentionally skip trailing spaces after the last star on each row so judge comparisons match character-for-character.',
        ],
        banglaParagraphs: [
          'মাঝখানে পিরামিড আঁকার সূত্র খুব সহজ: প্রতি `row` সারিতে বাম পাশে `(n - row)` টি স্পেস প্রিন্ট করে তারপর `(2 * row - 1)` টি `*` বসাতে হয়।',
          'ডান পাশে স্পেস না বসালে জাজগুলোতে কোনো Presentation Error হয় না।',
        ],
        memoryDiagram: `n=3: row1->sp=2,*=1 | row2->sp=1,*=3 | row3->sp=0,*=5`,
        code: `#include <stdio.h>

int main(void) {
    int n = 0;
    if (scanf("%d", &n) == 1) {
        for (int row = 1; row <= n; row++) {
            for (int s = 0; s < n - row; s++) printf(" ");
            for (int k = 0; k < 2 * row - 1; k++) printf("*");
            printf("\\n");
        }
    }
    return 0;
}`,
        stdin: '3',
        expectedOutput: '  *\n ***\n*****',
        lineByLine: [
          { lineNumber: 'Line 7', codeSnippet: 'for (int s = 0; s < n - row; s++) printf(" ");', whatItMeans: 'Emits decreasing leading spaces as pyramid widens.', whyItIsThere: 'Aligns star midpoints down the exact center column.', ifDeletedError: 'Produces left-aligned triangle instead of centered pyramid.' },
          { lineNumber: 'Line 8', codeSnippet: 'for (int k = 0; k < 2 * row - 1; k++) printf("*");', whatItMeans: 'Prints odd counts 1, 3, 5, ... matching symmetry.', whyItIsThere: 'Odd lengths keep peak centered cleanly.', ifDeletedError: 'Prints only spaces with zero stars.' },
        ],
      },
      {
        id: 'c-ch-8-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'ASCII Frame Renderer (Hollow Box Boundary Condition)',
        englishParagraphs: [
          'Terminal UI borders draw rectangular frames around content by testing whether `(r, c)` lies on the outer perimeter: top (`r == 0`), bottom (`r == n - 1`), left (`c == 0`), or right (`c == n - 1`).',
          'Inside interior coordinates (`0 < r < n - 1` and `0 < c < n - 1`), spaces leave the panel hollow cleanly.',
        ],
        banglaParagraphs: [
          'টার্মিনাল ড্যাশবোর্ডে বক্স বা ফ্রেম বানাতে এই Hollow Square লজিক কাজে লাগে—শুধু প্রথম সারি, শেষ সারি, প্রথম কলাম এবং শেষ কলামে `#` বসিয়ে ভেতরটা ফাঁকা রাখা হয়।',
          'এই বাউন্ডারি চেক পরে ২ডি গ্রিড DFS/BFS-এ বর্ডার যাচাইয়ের মতোই কাজ করে।',
        ],
        memoryDiagram: `r=0 || r=n-1 || c=0 || c=n-1 -> '#' else ' '`,
        code: `#include <stdio.h>

int main(void) {
    int n = 0;
    if (scanf("%d", &n) == 1) {
        for (int r = 0; r < n; r++) {
            for (int c = 0; c < n; c++) {
                if (r == 0 || r == n - 1 || c == 0 || c == n - 1) printf("#");
                else printf(" ");
            }
            printf("\\n");
        }
    }
    return 0;
}`,
        stdin: '4',
        expectedOutput: '####\n#  #\n#  #\n####',
        lineByLine: [
          { lineNumber: 'Line 8', codeSnippet: 'if (r == 0 || r == n - 1 || c == 0 || c == n - 1)', whatItMeans: 'Identifies all four edges of an n x n bounding box.', whyItIsThere: 'Draws solid border while leaving interior cells blank.', ifDeletedError: 'Draws filled solid square instead of hollow frame.' },
        ],
      },
      {
        id: 'c-ch-8-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Floyd’s Running-Counter Triangle & Trailing-Space Prevention',
        englishParagraphs: [
          'Many beginners print trailing spaces after the last number on each line (`printf("%d ", val++)`), failing strict online judge checks! Using a ternary separator `col == row ? "" : " "` emits clean lines every time.',
          'Also track the `O(n^2)` work limit: nested loops up to `n = 10^3` finish easily (~5×10^5 ops), whereas `n = 10^5` hits 10^10 ops and TLE.',
        ],
        banglaParagraphs: [
          'ফ্লয়েডের ত্রিভুজ আঁকার সময় `printf("%d ", num++)` লিখলে প্রতি লাইনের একদম শেষে একটি অতিরিক্ত স্পেস থেকে যায় যা জাজে Wrong Answer দেয়।',
          '`col == row ? "" : " "` ব্যবহার করলে শেষ সংখ্যার পর কোনো স্পেস পড়বে না।',
        ],
        memoryDiagram: `num: 1 | 2 3 | 4 5 6 (no trailing spaces at line ends)`,
        code: `#include <stdio.h>

int main(void) {
    int n = 0;
    if (scanf("%d", &n) == 1) {
        int val = 1;
        for (int r = 1; r <= n; r++) {
            for (int c = 1; c <= r; c++) {
                printf("%d%s", val++, c == r ? "" : " ");
            }
            printf("\\n");
        }
    }
    return 0;
}`,
        stdin: '3',
        expectedOutput: '1\n2 3\n4 5 6',
        lineByLine: [
          { lineNumber: 'Line 9', codeSnippet: 'printf("%d%s", val++, c == r ? "" : " ");', whatItMeans: 'Prints sequential value with separator only between columns.', whyItIsThere: 'Eliminates trailing whitespace on every row.', ifDeletedError: 'Leaves trailing space breaking strict stdout judge match.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 1', codeSnippet: '#include <stdio.h>', whatItMeans: 'Loads standard console output functions.', whyItIsThere: 'Makes printf available in C23.', ifDeletedError: 'Compile error: implicit declaration of printf.' },
      { lineNumber: 'Line 4', codeSnippet: 'int n = 4;', whatItMeans: 'Fixes total number of rows to render.', whyItIsThere: 'Bounds outer loop cleanly.', ifDeletedError: 'Compile error: undeclared n.' },
      { lineNumber: 'Line 5', codeSnippet: 'for (int row = 1; row <= n; row++) {', whatItMeans: 'Outer loop sweeping vertical rows 1..4.', whyItIsThere: 'Each iteration produces one full horizontal line.', ifDeletedError: 'Only one row would be considered.' },
      { lineNumber: 'Line 6', codeSnippet: 'for (int col = 1; col <= row; col++) {', whatItMeans: 'Inner loop repeating `row` times horizontally.', whyItIsThere: 'Expands width monotonically from 1 star up to 4.', ifDeletedError: 'Every row collapses to a single star.' },
      { lineNumber: 'Line 7', codeSnippet: 'printf("*");', whatItMeans: 'Appends one asterisk without newline on current row.', whyItIsThere: 'Builds continuous row string side-by-side.', ifDeletedError: 'Outputs blank empty lines.' },
      { lineNumber: 'Line 9', codeSnippet: 'printf("\\n");', whatItMeans: 'Advances output stream to the next vertical row.', whyItIsThere: 'Separates horizontal rows properly.', ifDeletedError: 'Merges all stars onto a single horizontal line.' },
    ],
    dryRunTable: [
      { step: 1, state: 'row = 1', memoryOrStack: 'col=1..1 -> "*"', note: 'Newline emitted' },
      { step: 2, state: 'row = 2', memoryOrStack: 'col=1..2 -> "**"', note: 'Newline emitted' },
      { step: 3, state: 'row = 3', memoryOrStack: 'col=1..3 -> "***"', note: 'Newline emitted' },
      { step: 4, state: 'row = 4', memoryOrStack: 'col=1..4 -> "****"', note: 'Nested loops finish cleanly' },
    ],
    harryBugTraps: [
      {
        title: 'Reusing Outer Variable i Inside Inner Loop',
        brokenCode: `for (int i = 0; i < n; i++)\n  for (i = 0; i < n; i++) printf("*");`,
        fixedCode: `#include <stdio.h>\nint main(void) {\n    int n = 3;\n    for (int i = 0; i < n; i++) {\n        for (int j = 0; j < n; j++) printf("*");\n        printf("\\n");\n    }\n    return 0;\n}`,
        whyItBreaks: 'Modifying i inside the inner loop overwrites the outer counter, collapsing rows to 1 or looping infinitely.',
      },
      {
        title: 'Trailing Space at End of Every Pattern Line',
        brokenCode: `for (int j = 1; j <= i; j++) printf("%d ", j);`,
        fixedCode: `#include <stdio.h>\nint main(void) {\n    int n = 3;\n    for (int i = 1; i <= n; i++) {\n        for (int j = 1; j <= i; j++) printf("%d%s", j, j == i ? "" : " ");\n        printf("\\n");\n    }\n    return 0;\n}`,
        whyItBreaks: 'Extra space before \\n fails strict automated judge whitespace checks.',
      },
      {
        title: 'Forgetting printf("\\n") After Inner Loop',
        brokenCode: `for (int i = 0; i < n; i++) for (int j = 0; j <= i; j++) printf("*");`,
        fixedCode: `#include <stdio.h>\nint main(void) {\n    int n = 3;\n    for (int i = 0; i < n; i++) {\n        for (int j = 0; j <= i; j++) printf("*");\n        printf("\\n");\n    }\n    return 0;\n}`,
        whyItBreaks: 'All rows merge onto one continuous line of asterisks.',
      },
    ],
    practiceSheet: [
      {
        id: 'c-ch-8-q1',
        difficulty: 'Easy',
        title: '1. Inverted Star Triangle',
        prompt: 'Read n and print an inverted right triangle from n stars down to 1 star.',
        banglaHint: 'ভেতরের লুপ `j = 0` থেকে `i` পর্যন্ত চালাও যেখানে `i` মান `n` থেকে ১ এ নামবে।',
        starterCode: `#include <stdio.h>\nint main(void) {\n    int n = 0;\n    if (scanf("%d", &n) == 1) {\n        for (int i = n; i >= 1; i--) {\n            for (int j = 0; j < i; j++) printf("*");\n            printf("\\n");\n        }\n    }\n    return 0;\n}`,
        sampleStdin: '3',
        expectedOutput: '***\n**\n*',
      },
      {
        id: 'c-ch-8-q2',
        difficulty: 'Easy',
        title: '2. Multiplication Table Grid',
        prompt: 'Read n and print an n x n grid where cell (r, c) is r * c separated cleanly by spaces.',
        banglaHint: 'c == n হলে স্পেস বাদ দিয়ে শুধু \\n প্রিন্ট করবে।',
        starterCode: `#include <stdio.h>\nint main(void) {\n    int n = 0;\n    if (scanf("%d", &n) == 1) {\n        for (int r = 1; r <= n; r++) {\n            for (int c = 1; c <= n; c++) printf("%d%s", r * c, c == n ? "" : " ");\n            printf("\\n");\n        }\n    }\n    return 0;\n}`,
        sampleStdin: '3',
        expectedOutput: '1 2 3\n2 4 6\n3 6 9',
      },
      {
        id: 'c-ch-8-q3',
        difficulty: 'Medium',
        title: '3. Alternating 0-1 Binary Triangle',
        prompt: 'Read n and print triangle where (r + c) even prints 1 else 0.',
        banglaHint: 'সারি ও কলামের যোগফল জোড় না বিজোড় (`(r + c) % 2 == 0`) তা দেখে ১ বা ০ বসাও।',
        starterCode: `#include <stdio.h>\nint main(void) {\n    int n = 0;\n    if (scanf("%d", &n) == 1) {\n        for (int r = 0; r < n; r++) {\n            for (int c = 0; c <= r; c++) printf("%d", ((r + c) % 2 == 0) ? 1 : 0);\n            printf("\\n");\n        }\n    }\n    return 0;\n}`,
        sampleStdin: '3',
        expectedOutput: '1\n01\n101',
      },
      {
        id: 'c-ch-8-q4',
        difficulty: 'Medium',
        title: '4. Centered Star Diamond',
        prompt: 'Read half-height n and print top pyramid (1..n) + inverted bottom (n-1..1).',
        banglaHint: 'উপরের পিরামিড `1..n` ও নিচের উল্টো পিরামিড `n-1..1` আলাদা দুটি লুপে প্রিন্ট করো।',
        starterCode: `#include <stdio.h>\nint main(void) {\n    int n = 0;\n    if (scanf("%d", &n) == 1) {\n        for (int i = 1; i <= n; i++) {\n            for (int s = 0; s < n - i; s++) printf(" ");\n            for (int k = 0; k < 2 * i - 1; k++) printf("*");\n            printf("\\n");\n        }\n        for (int i = n - 1; i >= 1; i--) {\n            for (int s = 0; s < n - i; s++) printf(" ");\n            for (int k = 0; k < 2 * i - 1; k++) printf("*");\n            printf("\\n");\n        }\n    }\n    return 0;\n}`,
        sampleStdin: '2',
        expectedOutput: ' *\n***\n *',
      },
      {
        id: 'c-ch-8-q5',
        difficulty: 'Hard',
        title: '5. Count Pairs With Sum S (Nested Loop Scan)',
        prompt: 'Read n, S, then n integers; count pairs (i < j) with a[i] + a[j] == S.',
        banglaHint: 'বাইরের লুপ `i = 0..n-1` ও ভেতরের লুপ `j = i + 1..n-1` চালালে ডুপ্লিকেট জোড়া গুনবে না।',
        starterCode: `#include <stdio.h>\nint main(void) {\n    int n = 0; long long S = 0;\n    if (scanf("%d %lld", &n, &S) != 2) return 0;\n    long long a[1005];\n    for (int i = 0; i < n; i++) scanf("%lld", &a[i]);\n    long long cnt = 0;\n    for (int i = 0; i < n; i++)\n        for (int j = i + 1; j < n; j++)\n            if (a[i] + a[j] == S) cnt++;\n    printf("%lld\\n", cnt);\n    return 0;\n}`,
        sampleStdin: '5 6\n1 5 7 -1 5',
        expectedOutput: '3',
      },
    ],
    miniBuild: {
      title: '2D Coordinate Pattern & Border Generator',
      description: 'Generates clean hollow square ASCII geometry using (row, col) coordinate predicates.',
      banglaGoal: '২ডি রো-কলাম সূত্র ব্যবহার করে ফাঁপা বর্ডার প্যাটার্ন তৈরি করা।',
      combinesChapters: 'Ch 1–8',
      starterCode: `#include <stdio.h>

int main(void) {
    int n = 0;
    if (scanf("%d", &n) == 1) {
        for (int r = 0; r < n; r++) {
            for (int c = 0; c < n; c++) {
                printf("%c", (r == 0 || r == n - 1 || c == 0 || c == n - 1) ? '*' : ' ');
            }
            printf("\\n");
        }
    }
    return 0;
}`,
      sampleStdin: '4',
      expectedOutput: '****\n*  *\n*  *\n****',
    },
    starterCode: `#include <stdio.h>

int main(void) {
    int n = 0;
    if (scanf("%d", &n) == 1) {
        for (int r = 0; r < n; r++) {
            for (int c = 0; c < n; c++) {
                printf("%c", (r == 0 || r == n - 1 || c == 0 || c == n - 1) ? '*' : ' ');
            }
            printf("\\n");
        }
    }
    return 0;
}`,
    sampleStdin: '4',
    expectedSampleOutput: '****\n*  *\n*  *\n****',
    testCases: [
      { id: 'c8-t1', input: '4', expectedOutput: '****\n*  *\n*  *\n****' },
      { id: 'c8-t2', input: '3', expectedOutput: '***\n* *\n***', isHidden: true },
    ],
  },

  9: {
    chapterNumber: 9,
    title: 'C Chapter 9 (C23): Functions, Parameters, Return Values & Variable Scope',
    banglaTitle: 'C অধ্যায় ৯ (C23): ফাংশন, প্যারামিটার, রিটার্ন ভ্যালু ও ভ্যারিয়েবল স্কোপ',
    subtitle: 'Stack frames, pass-by-value vs pointer out-parameters, array decay, recursion vs helper modularity, and lexical scope.',
    zeroIntuition: {
      plainEnglishStory:
        'Writing a 500-line `main()` turns debugging into a nightmare. Functions split logic into named, self-contained workers—each call pushes a fresh Stack Frame onto the Call Stack holding its parameters and local variables, then pops cleanly on `return`.\n\nIn C23, arguments are strictly passed by value (copied into the callee’s stack frame). When a helper must mutate the caller’s variable or return multiple results, pass its `&address` into a pointer parameter (`int *out`), whereas read-only arrays pass as `(const int arr[], int n)` without copying a single element.',
      asciiFlowchart: `  [ main() Stack Frame ]                 [ swap_ints(int *a, int *b) Frame ]
    x = 10 (@0x100)  ----pass &x---->      a = 0x100
    y = 25 (@0x104)  ----pass &y---->      b = 0x104  --> swaps RAM at 0x100 & 0x104!`,
      pseudocode: [
        '1. DECLARE prototype return_type name(params) above main()',
        '2. PASS primitives by value when caller data stays untouched',
        '3. PASS pointer address (&x) only when callee must mutate caller state',
        '4. KEEP local variables scoped inside the smallest block possible',
      ],
      banglaZeroToHero: {
        analogyTitle: 'রসিদ কপি পাঠানো বনাম মূল খাতা হাতে দেওয়া (Value vs Address)',
        explanation:
          'বড় প্রোগ্রামকে ছোট ছোট কাজে ভাগ করার সবচেয়ে শক্তিশালী উপায় হলো ফাংশন। প্রতিবার একটি ফাংশন কল করলে RAM-এর Call Stack-এ ওই ফাংশনের জন্য একটি অস্থায়ী ঘর (Stack Frame) তৈরি হয় এবং ফাংশনের ভেতরের লোকাল ভ্যারিয়েবলগুলো শুধু সেই ঘরেই জীবিত থাকে। C ভাষায় সাধারণত মান কপি করে পাঠানো হয় (Pass-by-Value)—তাই ফাংশনের ভেতরে `x` বদলালেও `main()`-এর আসল `x` বদলায় না! যদি সত্যিই ফাংশনের ভেতর থেকে `main()`-এর ভ্যারিয়েবল পরিবর্তন করতে চাও (যেমন দুটি সংখ্যা Swap করা), তবে `&x` দিয়ে মূল ঠিকানা পাস করতে হয় এবং রিসিভ করতে হয় পয়েন্টার `*x` দিয়ে। আর কোনো ফাংশন থেকে মান ফেরত না দিতে চাইলে রিটার্ন টাইপ `void` লিখতে হয়, আর মান ফেরত দিলে `return ans;` লিখলেই সাথে সাথে ফাংশন শেষ হয়ে কন্ট্রোল কলারের কাছে ফিরে আসে। ফাংশনের প্যারামিটার হিসেবে অ্যারে পাঠালে পুরো অ্যারে কপি হয় না, বরং প্রথম ঘরের ঠিকানা যায়—তাই সাথে অবশ্যই অ্যারের দৈর্ঘ্য `int n` পাঠাতে হয়। ফাংশনের বাইরে গ্লোবাল ভ্যারিয়েবল কম ব্যবহার করে বিশুদ্ধ (Pure) ফাংশন লেখা পেশাদার সফটওয়্যার ইঞ্জিনিয়ারিংয়ের মূল নীতি। একই লজিক বারবার কপি-পেস্ট না করে একটি ফাংশনে রাখলে কোডের দৈর্ঘ্য কমে, বাগ খোঁজা সহজ হয় এবং ইউনিট টেস্টিং করা যায়।',
        everydayExample:
          'ফটোকপি করে বন্ধুকে অঙ্ক করতে দেওয়া হলো Pass-by-Value (তোমার মূল খাতা বদলাবে না), আর আসল খাতাটা হাতে দিয়ে দেওয়া হলো Pointer/Address পাসিং!',
        keyTakeaways: [
          'C-তে সাধারণ ভ্যারিয়েবল Pass-by-Value হয়; আসল মান বদলাতে `&` দিয়ে অ্যাড্রেস ও `*` প্যারামিটার নাও।',
          'অ্যারে ফাংশনে পাস করলে সাইজ হারিয়ে যায় (`sizeof(arr)` পয়েন্টারের সাইজ দেয়), তাই আলাদা `int n` প্যারামিটার রাখো।',
          'রিড-অনলি অ্যারে প্যারামিটারে `const int a[]` লিখলে কম্পাইলার দুর্ঘটনাবশত ডেটা পরিবর্তন আটকে দেয়।',
        ],
      },
    },
    topics: [
      {
        id: 'c-ch-9-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Pure Helper Function & Local Stack Scope',
        englishParagraphs: [
          'A pure helper like `int square(int x)` reads its inputs, computes locally on its own stack frame, and returns the result without side effects.',
          'Defining the helper above `main()` acts as both prototype and definition cleanly in C23.',
        ],
        banglaParagraphs: [
          'একটি বিশুদ্ধ (Pure) ফাংশন কেবল প্যারামিটার নেয় এবং রিটার্ন ভ্যালু দেয়—বাইরের কোনো ভ্যারিয়েবল নষ্ট করে না।',
          'এখানে `cube(int x)` আলাদা স্ট্যাক ফ্রেমে হিসাব করে ফল `main()`-এ ফেরত পাঠাচ্ছে।',
        ],
        memoryDiagram: `main: x=4 -> cube(4) frame: n=4 -> returns 64 -> cube frame popped`,
        code: `#include <stdio.h>

long long cube(long long n) {
    return n * n * n;
}

int main(void) {
    long long x = 4;
    printf("cube=%lld\\n", cube(x));
    return 0;
}`,
        stdin: '',
        expectedOutput: 'cube=64',
        lineByLine: [
          { lineNumber: 'Line 3', codeSnippet: 'long long cube(long long n) {', whatItMeans: 'Defines helper accepting 64-bit value and returning 64-bit cube.', whyItIsThere: 'Prevents 32-bit overflow and isolates formula cleanly.', ifDeletedError: 'Compile error: cube undeclared in main.' },
          { lineNumber: 'Line 4', codeSnippet: 'return n * n * n;', whatItMeans: 'Returns computed cube back to caller expression.', whyItIsThere: 'Terminates cube() frame and passes result via CPU register.', ifDeletedError: 'Non-void function reaches end without return.' },
          { lineNumber: 'Line 9', codeSnippet: 'printf("cube=%lld\\n", cube(x));', whatItMeans: 'Invokes helper with x=4 and prints returned value 64.', whyItIsThere: 'Demonstrates function call expression inside printf.', ifDeletedError: 'Program prints nothing.' },
        ],
      },
      {
        id: 'c-ch-9-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Euclidean GCD Helper & Multi-Pair Reuse',
        englishParagraphs: [
          'Wrapping the Euclidean algorithm inside `long long gcd(long long a, long long b)` lets you compute both `gcd` and `lcm = (a / gcd(a, b)) * b` without duplicating loop code.',
          'Dividing BEFORE multiplying inside `lcm` also prevents 64-bit overflow when `a, b ~ 10^9`!',
        ],
        banglaParagraphs: [
          'গ.সা.গু (GCD) বের করার কোড একটি ফাংশনে রাখলে ল.সা.গু (LCM) বের করা মাত্র ১ লাইনের কাজ হয়ে যায়: `(a / gcd(a, b)) * b`।',
          'আগে ভাগ করে পরে গুণ করলে `a * b` ওভারফ্লো হওয়ার ঝুঁকিও থাকে না!',
        ],
        memoryDiagram: `stdin: "12 18" -> gcd(12,18)=6 -> lcm=(12/6)*18=36`,
        code: `#include <stdio.h>

long long gcd(long long a, long long b) {
    while (b != 0) {
        long long rem = a % b;
        a = b;
        b = rem;
    }
    return a < 0 ? -a : a;
}

int main(void) {
    long long a = 0, b = 0;
    if (scanf("%lld %lld", &a, &b) == 2 && a > 0 && b > 0) {
        long long g = gcd(a, b);
        long long l = (a / g) * b;
        printf("gcd=%lld lcm=%lld\\n", g, l);
    }
    return 0;
}`,
        stdin: '12 18',
        expectedOutput: 'gcd=6 lcm=36',
        lineByLine: [
          { lineNumber: 'Line 16', codeSnippet: 'long long l = (a / g) * b;', whatItMeans: 'Divides a by gcd first before multiplying by b.', whyItIsThere: 'Avoids intermediate a * b overflow on large inputs.', ifDeletedError: 'LCM not calculated.' },
        ],
      },
      {
        id: 'c-ch-9-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Swapping Variables via Address Parameters (&x, &y)',
        englishParagraphs: [
          'If you write `void bad_swap(int a, int b)`, only the local stack copies swap while the caller’s variables remain frozen.',
          'Passing `&x` and `&y` into `void swap_ll(long long *a, long long *b)` lets the function dereference and exchange the original caller slots directly.',
        ],
        banglaParagraphs: [
          'সাধারণ ভ্যালু দিয়ে Swap ফাংশন লিখলে `main()`-এর আসল ভ্যারিয়েবল বদলায় না। তাই `&a, &b` অ্যাড্রেস পাঠিয়ে ডিরেক্ট মেমোরিতে অদলবদল করতে হয়।',
          'সর্টিং এবং গ্রাফ অ্যালগরিদমে এই `swap` ফাংশনটি শতবার কাজে লাগে।',
        ],
        memoryDiagram: `swap_ll(&x, &y): *a <-> *b mutates caller stack directly`,
        code: `#include <stdio.h>

void swap_ll(long long *a, long long *b) {
    long long tmp = *a;
    *a = *b;
    *b = tmp;
}

int main(void) {
    long long x = 0, y = 0;
    if (scanf("%lld %lld", &x, &y) == 2) {
        swap_ll(&x, &y);
        printf("%lld %lld\\n", x, y);
    }
    return 0;
}`,
        stdin: '10 25',
        expectedOutput: '25 10',
        lineByLine: [
          { lineNumber: 'Line 3', codeSnippet: 'void swap_ll(long long *a, long long *b)', whatItMeans: 'Accepts memory addresses of two caller variables.', whyItIsThere: 'Enables mutating two caller variables from one void helper.', ifDeletedError: 'Pass-by-value fails to swap caller x and y.' },
        ],
      },
      {
        id: 'c-ch-9-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Array Decay Trap & Read-Only Slice Helper (const int a[], int n)',
        englishParagraphs: [
          'Inside a C function `int sum(int a[])`, `a` silently decays to a pointer (`int *`), so `sizeof(a) / sizeof(a[0])` returns `8 / 4 = 2` instead of the true array length!',
          'Always pass `int n` explicitly alongside `const int a[]` so helpers know exact boundaries safely.',
        ],
        banglaParagraphs: [
          'অ্যারে ফাংশনে পাঠালে ভেতরে `sizeof(arr)` লিখলে তা পুরো অ্যারের সাইজ না দিয়ে কেবল পয়েন্টারের সাইজ (৮ বাইট) দেয়—এটি এক ভয়ংকর ফাঁদ!',
          'সঠিক নিয়ম হলো অ্যারের সাথে সবসময় `int n` দৈর্ঘ্য পাঠানো এবং `const` ব্যবহার করে অ্যারে সুরক্ষিত রাখা।',
        ],
        memoryDiagram: `Caller arr[4] -> decays to ptr (8B) -> helper uses explicit n=4`,
        code: `#include <stdio.h>

long long array_max(const long long a[], int n) {
    long long best = a[0];
    for (int i = 1; i < n; i++) {
        if (a[i] > best) best = a[i];
    }
    return best;
}

int main(void) {
    int n = 0;
    if (scanf("%d", &n) == 1 && n > 0 && n <= 1000) {
        long long a[1000];
        for (int i = 0; i < n; i++) scanf("%lld", &a[i]);
        printf("%lld\\n", array_max(a, n));
    }
    return 0;
}`,
        stdin: '4\n7 22 5 19',
        expectedOutput: '22',
        lineByLine: [
          { lineNumber: 'Line 3', codeSnippet: 'long long array_max(const long long a[], int n)', whatItMeans: 'Accepts read-only array pointer plus explicit length n.', whyItIsThere: 'Array length cannot be recovered via sizeof inside callee.', ifDeletedError: 'Hardcoded or truncated loop bounds.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 1', codeSnippet: '#include <stdio.h>', whatItMeans: 'Provides printf signature for stdout logging.', whyItIsThere: 'Required by C23 standard I/O.', ifDeletedError: 'Compile error: implicit declaration of printf.' },
      { lineNumber: 'Line 3', codeSnippet: 'long long cube(long long n) {', whatItMeans: 'Function header declaring return type, identifier, and parameter list.', whyItIsThere: 'Allocates separate call-stack parameter n on every call.', ifDeletedError: 'Compile error: cube undefined inside main().' },
      { lineNumber: 'Line 4', codeSnippet: 'return n * n * n;', whatItMeans: 'Evaluates expression and pops stack frame back to caller.', whyItIsThere: 'Hands result back cleanly.', ifDeletedError: 'Function reaches closing brace without returning a value.' },
      { lineNumber: 'Line 7', codeSnippet: 'int main(void) {', whatItMeans: 'Primary entry function invoked at launch.', whyItIsThere: 'Coordinates input/output and calls helper cube().', ifDeletedError: 'Linker error: undefined reference to main.' },
      { lineNumber: 'Line 8', codeSnippet: 'long long x = 4;', whatItMeans: 'Local stack variable scoped strictly inside main().', whyItIsThere: 'Holds argument copied into cube(n).', ifDeletedError: 'Compile error: x undeclared.' },
      { lineNumber: 'Line 9', codeSnippet: 'printf("cube=%lld\\n", cube(x));', whatItMeans: 'Calls cube(4), receives 64, and formats stdout.', whyItIsThere: 'Demonstrates expression-level modular reuse.', ifDeletedError: 'No output emitted.' },
    ],
    dryRunTable: [
      { step: 1, state: 'main() sets x = 4', memoryOrStack: 'main frame: x=4', note: 'Prepares call cube(4)' },
      { step: 2, state: 'Push cube() stack frame', memoryOrStack: 'cube frame: n=4', note: 'Copies x into n (pass-by-value)' },
      { step: 3, state: 'Compute 4 * 4 * 4', memoryOrStack: 'return value = 64', note: 'Placed in return register' },
      { step: 4, state: 'Pop cube frame & print', memoryOrStack: 'stdout="cube=64"', note: 'main() x remains 4' },
    ],
    harryBugTraps: [
      {
        title: 'Passing Arguments by Value Expecting Mutation',
        brokenCode: `void inc(int x) { x++; }\nint a = 5; inc(a); // a is STILL 5!`,
        fixedCode: `#include <stdio.h>\nvoid inc(int *x) { (*x)++; }\nint main(void) {\n    int a = 5;\n    inc(&a);\n    printf("%d\\n", a);\n    return 0;\n}`,
        whyItBreaks: 'inc(int x) modifies a temporary stack copy; pass &a to int *x to mutate original caller memory.',
      },
      {
        title: 'Using sizeof(arr) Inside Helper Function',
        brokenCode: `int len(int a[]) { return sizeof(a) / sizeof(a[0]); }`,
        fixedCode: `#include <stdio.h>\nlong long sum_arr(const int a[], int n) {\n    long long s = 0;\n    for (int i = 0; i < n; i++) s += a[i];\n    return s;\n}\nint main(void) {\n    int a[4] = {1, 2, 3, 4};\n    printf("%lld\\n", sum_arr(a, 4));\n    return 0;\n}`,
        whyItBreaks: 'Array parameter decays to a 64-bit pointer (8 bytes), so sizeof(a)/sizeof(a[0]) returns 2 instead of array length!',
      },
      {
        title: 'Returning Pointer to a Local Stack Variable',
        brokenCode: `int* bad(void) { int local = 42; return &local; }`,
        fixedCode: `#include <stdio.h>\nint good(void) { int local = 42; return local; }\nint main(void) {\n    printf("%d\\n", good());\n    return 0;\n}`,
        whyItBreaks: 'local is destroyed the moment bad() returns—dereferencing that dangling pointer is Undefined Behavior.',
      },
    ],
    practiceSheet: [
      {
        id: 'c-ch-9-q1',
        difficulty: 'Easy',
        title: '1. is_prime() Predicate Helper',
        prompt: 'Write `int is_prime(long long n)` returning 1 if prime else 0; test on input n.',
        banglaHint: 'n <= 1 হলে 0, আর 2..sqrt(n) (`i * i <= n`) পর্যন্ত ভাগ চেক করো।',
        starterCode: `#include <stdio.h>\nint is_prime(long long n) {\n    if (n <= 1) return 0;\n    for (long long i = 2; i * i <= n; i++) if (n % i == 0) return 0;\n    return 1;\n}\nint main(void) {\n    long long n = 0;\n    if (scanf("%lld", &n) == 1) printf("%d\\n", is_prime(n));\n    return 0;\n}`,
        sampleStdin: '29',
        expectedOutput: '1',
      },
      {
        id: 'c-ch-9-q2',
        difficulty: 'Easy',
        title: '2. Max of Two Helper Composition',
        prompt: 'Write `long long max2(long long a, long long b)` and use it twice to print max of 3 inputs.',
        banglaHint: '`max2(a, max2(b, c))` লিখলেই কোনো জটিল if ছাড়া ৩ সংখ্যার বড়টি পাওয়া যায়।',
        starterCode: `#include <stdio.h>\nlong long max2(long long a, long long b) { return a > b ? a : b; }\nint main(void) {\n    long long a = 0, b = 0, c = 0;\n    if (scanf("%lld %lld %lld", &a, &b, &c) == 3) printf("%lld\\n", max2(a, max2(b, c)));\n    return 0;\n}`,
        sampleStdin: '12 45 31',
        expectedOutput: '45',
      },
      {
        id: 'c-ch-9-q3',
        difficulty: 'Medium',
        title: '3. Mutate Two Values via Out-Pointers',
        prompt: 'Write `void sort_pair(long long *a, long long *b)` ensuring *a <= *b after return.',
        banglaHint: 'যদি `*a > *b` হয় তবে টেম্প ভ্যারিয়েবল দিয়ে `*a` ও `*b` অদলবদল করো।',
        starterCode: `#include <stdio.h>\nvoid sort_pair(long long *a, long long *b) {\n    if (*a > *b) { long long t = *a; *a = *b; *b = t; }\n}\nint main(void) {\n    long long x = 0, y = 0;\n    if (scanf("%lld %lld", &x, &y) == 2) { sort_pair(&x, &y); printf("%lld %lld\\n", x, y); }\n    return 0;\n}`,
        sampleStdin: '90 15',
        expectedOutput: '15 90',
      },
      {
        id: 'c-ch-9-q4',
        difficulty: 'Medium',
        title: '4. Fast Modular Power Function',
        prompt: 'Write `long long mod_pow(long long base, long long exp, long long mod)` via binary exponentiation.',
        banglaHint: 'while (exp > 0) লুপে বিজোড় exp হলে res = (res * base) % mod এবং প্রতি ধাপে base বর্গ করো।',
        starterCode: `#include <stdio.h>\nlong long mod_pow(long long b, long long e, long long m) {\n    long long res = 1 % m; b %= m;\n    while (e > 0) {\n        if (e & 1LL) res = (res * b) % m;\n        b = (b * b) % m;\n        e >>= 1;\n    }\n    return res;\n}\nint main(void) {\n    long long b = 0, e = 0, m = 1;\n    if (scanf("%lld %lld %lld", &b, &e, &m) == 3) printf("%lld\\n", mod_pow(b, e, m));\n    return 0;\n}`,
        sampleStdin: '2 10 1000',
        expectedOutput: '24',
      },
      {
        id: 'c-ch-9-q5',
        difficulty: 'Hard',
        title: '5. nCr Binomial Coefficient Function',
        prompt: 'Compute C(n, r) cleanly using helper function without overflowing 64-bit integer for n <= 60.',
        banglaHint: 'r = min(r, n - r) ধরে `ans = ans * (n - i + 1) / i` লুপ ফাংশনের ভেতর চালাও।',
        starterCode: `#include <stdio.h>\nlong long ncr(int n, int r) {\n    if (r < 0 || r > n) return 0;\n    if (r > n - r) r = n - r;\n    long long ans = 1;\n    for (int i = 1; i <= r; i++) ans = ans * (n - i + 1) / i;\n    return ans;\n}\nint main(void) {\n    int n = 0, r = 0;\n    if (scanf("%d %d", &n, &r) == 2) printf("%lld\\n", ncr(n, r));\n    return 0;\n}`,
        sampleStdin: '10 3',
        expectedOutput: '120',
      },
    ],
    miniBuild: {
      title: 'Modular GCD & LCM Math Toolkit',
      description: 'Reusable pure functions with pointer-safe design and overflow-resistant division.',
      banglaGoal: 'পিওর ফাংশন ব্যবহার করে GCD বের করার মডিউলার টুলকিট তৈরি।',
      combinesChapters: 'Ch 1–9',
      starterCode: `#include <stdio.h>

long long gcd(long long a, long long b) {
    while (b != 0) {
        long long rem = a % b;
        a = b;
        b = rem;
    }
    return a < 0 ? -a : a;
}

int main(void) {
    long long a = 0, b = 0;
    if (scanf("%lld %lld", &a, &b) == 2) {
        printf("%lld\\n", gcd(a, b));
    }
    return 0;
}`,
      sampleStdin: '12 18',
      expectedOutput: '6',
    },
    starterCode: `#include <stdio.h>

long long gcd(long long a, long long b) {
    while (b != 0) {
        long long rem = a % b;
        a = b;
        b = rem;
    }
    return a < 0 ? -a : a;
}

int main(void) {
    long long a = 0, b = 0;
    if (scanf("%lld %lld", &a, &b) == 2) {
        printf("%lld\\n", gcd(a, b));
    }
    return 0;
}`,
    sampleStdin: '12 18',
    expectedSampleOutput: '6',
    testCases: [
      { id: 'c9-t1', input: '12 18', expectedOutput: '6' },
      { id: 'c9-t2', input: '35 14', expectedOutput: '7', isHidden: true },
    ],
  },

  10: {
    chapterNumber: 10,
    isMilestoneMerger: true,
    title: 'C Chapter 10 (C23): Time & Space Complexity (Big-O, 10^8 Ops Rule) — Merger 2',
    banglaTitle: 'C অধ্যায় ১০ (C23): টাইম ও স্পেস কমপ্লেক্সিটি (Big-O ও ১০^৮ নিয়ম — মার্জার ২)',
    subtitle: 'Asymptotic growth, estimating TLE from constraints before coding, hidden O(n) loop traps (strlen), and Ch 1–10 Milestone Merger.',
    zeroIntuition: {
      plainEnglishStory:
        'A program that runs in 0.01 seconds for `n = 100` might freeze for 100 seconds and trigger TLE when `n = 100,000`. Why? Because `O(n^2)` performs `100,000^2 = 10^10` steps, while a modern judge CPU executes roughly `10^8` simple C operations per second.\n\nBefore writing a single line of code, inspect `n` in the problem constraints: `n <= 10^3` allows `O(n^2)`; `n <= 2×10^5` demands `O(n log n)` or `O(n)`; `n <= 10^9` requires `O(sqrt(n))`, `O(log n)`, or `O(1)`. Milestone Merger 2 replaces brute-force loops with mathematical and O(log n) invariants.',
      asciiFlowchart: `  Constraint n      Max Safe Big-O     1-Second Budget (~10^8 C ops)
  n <= 1,000    --> O(n^2)             10^6 ops   (PASS ~1ms)
  n <= 200,000  --> O(n log n)         3.5e6 ops  (PASS ~15ms)
  n <= 200,000  --> O(n^2) [TRAP!]     4e10 ops   (TLE 400s!)
  n <= 10^9     --> O(1) / O(log n)    1..30 ops  (PASS 0.01ms)`,
      pseudocode: [
        '1. READ constraint n from problem statement FIRST',
        '2. COMPUTE operation budget against 10^8 ops/sec CPU ceiling',
        '3. ELIMINATE inner loops or hidden O(n) calls like strlen(s) in conditions',
        '4. REPLACE O(n) / O(n^2) bottlenecks with O(1) math or O(sqrt(n)) bounds',
      ],
      banglaZeroToHero: {
        analogyTitle: '১০০ কোটি কাজের বাজেট বনাম সাইকেল ও রকেট (10^8 Ops Rule)',
        explanation:
          'কনটেস্টে কোড লিখে সাবমিট করার আগেই কি বলা সম্ভব কোড পাস (AC) করবে নাকি Time Limit Exceeded (TLE) খাবে? হ্যাঁ! এটিই Big-O ও ১০^৮ নিয়মের ম্যাজিক। একটি আধুনিক C প্রোগ্রাম ১ সেকেন্ডে প্রসেসরে প্রায় ১০^৮ (দশ কোটি) সাধারণ কাজ করতে পারে। যদি প্রশ্নে `n <= 10^5` থাকে, তবে দুটি নেস্টেড লুপ `O(n^2)` চালালে কাজের সংখ্যা হবে `(10^5)^2 = 10^10`—যা ১ সেকেন্ডের বদলে ১০০ সেকেন্ড নেবে এবং নিশ্চিত TLE খাবে! অথচ একই কাজ ১টি লুপে `O(n)` বা `O(log n)` কিংবা গাণিতিক সূত্রে `O(1)`-এ নামিয়ে আনতে পারলে মাত্র ০.০০১ সেকেন্ডেই পাস করবে। উদাহরণস্বরূপ, ১ থেকে `n` পর্যন্ত যোগফল লুপে না করে গাউসের সূত্র `n * (n + 1) / 2` দিয়ে করলে `n = 10^9` হলেও মাত্র ৩টি অপারেশনে উত্তর চলে আসে! আরেকটি গোপন ফাঁদ হলো `for (int i = 0; i < strlen(s); i++)`—লুপের শর্তে প্রতিবার `strlen(s)` কল করলে অজান্তেই `O(n)` কোড `O(n^2)` হয়ে যায়! তাই আগে `size_t len = strlen(s);` ভ্যারিয়েবলে রেখে তারপর লুপ চালাবে। শুধু টাইম নয়, স্পেস কমপ্লেক্সিটিও জরুরি—২৫৬ মেগাবাইট লিমিটে প্রায় ৬ কোটি ৩২-বিট `int` রাখা যায়, আর স্ট্যাকের চেয়ে বড় অ্যারে হিপে বা গ্লোবালে রাখতে হয়।',
        everydayExample:
          'ঢাকা থেকে চট্টগ্রাম যেতে যদি রিকশা নাও (O(n^2)) তবে ৩ দিন লাগবে, আর বিমানে (O(log n) / O(1)) মাত্র ৪৫ মিনিটে পৌঁছে যাবে—ইনপুটের দূরত্ব দেখেই বাহন ঠিক করতে হয়!',
        keyTakeaways: [
          '`n <= 10^5` থাকলে ভুলেও নেস্টেড `O(n^2)` লুপ চালাবে না; `O(n log n)` বা `O(n)` খুঁজবে।',
          'C-তে কখনোই `for` লুপের ভেতর `strlen(s)` লিখবে না; একবার `len = strlen(s)` সেভ করে নেবে।',
          '১-থেকে-N যোগফল বা জোড়-বিজোড় কাউন্ট `O(1)` গাণিতিক সূত্রে করলে `n = 10^9`-এও TLE হয় না।',
        ],
      },
    },
    topics: [
      {
        id: 'c-ch-10-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'O(1) Constant-Time Arithmetic vs O(n) Loop Sum',
        englishParagraphs: [
          'Summing `1 + 2 + ... + n` with a loop takes `O(n)` time: for `n = 10^9`, that loop takes ~10 seconds (instant TLE!).',
          'Using Gauss’s identity `(n % 2 == 0) ? (n / 2) * (n + 1) : n * ((n + 1) / 2)` avoids even intermediate overflow while finishing in O(1) constant time—literally 4 CPU instructions!',
        ],
        banglaParagraphs: [
          '১ থেকে `n` পর্যন্ত যোগফল সাধারণ `for` লুপে `n = 10^9` হলে TLE দেবে, কারণ ১ সেকেন্ডে ১০^৮ এর বেশি লুপ ঘোরে না।',
          'কিন্তু গাউসের `O(1)` সূত্রে আগে জোড় অংশকে ২ দিয়ে ভাগ করে গুণ করলে `n = 10^9` হলেও মাইক্রোসেকেন্ডে উত্তর আসে!',
        ],
        memoryDiagram: `n=100000 -> O(n): 100,000 steps | O(1): (100000/2)*100001 = 5000050000 (1 step!)`,
        code: `#include <stdio.h>

int main(void) {
    long long n = 100000;
    long long ans = (n % 2 == 0) ? (n / 2) * (n + 1) : n * ((n + 1) / 2);
    printf("%lld\\n", ans);
    return 0;
}`,
        stdin: '',
        expectedOutput: '5000050000',
        lineByLine: [
          { lineNumber: 'Line 4', codeSnippet: 'long long n = 100000;', whatItMeans: 'Holds input bound in 64-bit integer.', whyItIsThere: 'Guarantees intermediate arithmetic stays 64-bit.', ifDeletedError: 'Compile error: n undeclared.' },
          { lineNumber: 'Line 5', codeSnippet: '(n % 2 == 0) ? (n / 2) * (n + 1) : n * ((n + 1) / 2)', whatItMeans: 'Divides the even factor by 2 before multiplying to prevent 64-bit overflow.', whyItIsThere: 'Executes sum in O(1) constant time regardless of n size.', ifDeletedError: 'Would require slow O(n) loop.' },
        ],
      },
      {
        id: 'c-ch-10-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'O(sqrt(n)) Divisor Counting vs O(n) Brute Scan',
        englishParagraphs: [
          'Every divisor `d <= sqrt(n)` pairs symmetrically with `n / d >= sqrt(n)`. Scanning only up to `d * d <= n` shrinks `10^12` checks down to `10^6`—easily beating a 1-second judge limit!',
          'Watch the perfect square edge case: if `d * d == n`, `d` and `n / d` are identical, so count it once instead of twice.',
        ],
        banglaParagraphs: [
          'যেকোনো সংখ্যার উৎপাদক (Divisor) জোড়ায় জোড়ায় থাকে—`d` এবং `n / d`। তাই পুরো `n` পর্যন্ত লুপ না চালিয়ে শুধু `d * d <= n` অর্থাৎ `O(sqrt(n))` পর্যন্ত চালালেই সব উৎপাদক পাওয়া যায়!',
          'পূর্ণবর্গ সংখ্যার (যেমন ৩৬-এ ৬×৬) ক্ষেত্রে `d == n / d` হয়, তাই ১ বার যোগ করে ডুপ্লিকেট এড়াতে হয়।',
        ],
        memoryDiagram: `n=36 -> d=1(1,36), 2(2,18), 3(3,12), 4(4,9), 6(6 only once) -> count=9`,
        code: `#include <stdio.h>

int main(void) {
    long long n = 0;
    if (scanf("%lld", &n) == 1 && n > 0) {
        long long cnt = 0;
        for (long long d = 1; d * d <= n; d++) {
            if (n % d == 0) {
                cnt += (d * d == n) ? 1 : 2;
            }
        }
        printf("%lld\\n", cnt);
    }
    return 0;
}`,
        stdin: '36',
        expectedOutput: '9',
        lineByLine: [
          { lineNumber: 'Line 7', codeSnippet: 'for (long long d = 1; d * d <= n; d++)', whatItMeans: 'Loops strictly up to floor(sqrt(n)) using overflow-free long long.', whyItIsThere: 'Reduces O(n) scan to O(sqrt(n)).', ifDeletedError: 'Runs slow O(n) or misses divisors.' },
          { lineNumber: 'Line 9', codeSnippet: 'cnt += (d * d == n) ? 1 : 2;', whatItMeans: 'Adds 1 if d == sqrt(n), else adds both paired divisors d and n/d.', whyItIsThere: 'Prevents double-counting square root divisor.', ifDeletedError: 'Prints 10 instead of 9 for n=36.' },
        ],
      },
      {
        id: 'c-ch-10-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'O(n) Single-Pass Max Profit (Replacing O(n^2) Pair Search)',
        englishParagraphs: [
          'Checking every buy-sell pair `(i < j)` takes `O(n^2)` time—timing out on 200,000 stock ticks.',
          'Tracking `min_price_so_far` in one linear pass computes the exact maximum profit `price[i] - min_price_so_far` in `O(n)` time and `O(1)` extra RAM!',
        ],
        banglaParagraphs: [
          'স্টক প্রাইসে কোন দিনে কিনে কোন দিনে বেচলে সর্বোচ্চ লাভ হবে তা দুটি লুপে খুঁজতে গেলে `O(n^2)` সময় লেগে TLE হয়ে যাবে।',
          'কিন্তু শুধু এ পর্যন্ত সর্বনিম্ন দাম `min_price` মনে রেখে এক পাস চালালেই `O(n)` সময়ে সর্বোচ্চ লাভ বের হয়ে আসে!',
        ],
        memoryDiagram: `prices=[7,1,5,3,6,4] -> min=1 -> best_profit=(6-1)=5`,
        code: `#include <stdio.h>

int main(void) {
    int n = 0;
    if (scanf("%d", &n) == 1 && n > 0) {
        long long first = 0;
        scanf("%lld", &first);
        long long min_p = first, best = 0;
        for (int i = 1; i < n; i++) {
            long long p = 0;
            scanf("%lld", &p);
            if (p - min_p > best) best = p - min_p;
            if (p < min_p) min_p = p;
        }
        printf("%lld\\n", best);
    }
    return 0;
}`,
        stdin: '6\n7 1 5 3 6 4',
        expectedOutput: '5',
        lineByLine: [
          { lineNumber: 'Line 12', codeSnippet: 'if (p - min_p > best) best = p - min_p;', whatItMeans: 'Evaluates profit selling today after buying at lowest earlier price.', whyItIsThere: 'Replaces O(n^2) nested pair loop with O(1) running invariant.', ifDeletedError: 'Profit never updates from 0.' },
        ],
      },
      {
        id: 'c-ch-10-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Hidden O(n^2) strlen(s) Loop Condition Trap',
        englishParagraphs: [
          'Calling `strlen(s)` inside `for (size_t i = 0; i < strlen(s); i++)` looks innocent—until a 100,000-character string causes `strlen` to walk all 100,000 bytes on EVERY iteration (`5 × 10^9` reads -> TLE)!',
          'Either cache `size_t len = strlen(s)` once before the loop, or iterate until `s[i] != \'\\0\'` directly in O(n).',
        ],
        banglaParagraphs: [
          'C-তে `for (int i = 0; i < strlen(s); i++)` লেখা মারাত্মক ভুল! কারণ `strlen` প্রতিটি ধাপে পুরো স্ট্রিংয়ের `\\0` পর্যন্ত গুনে `O(n^2)` করে দেয়।',
          'এর বদলে `s[i] != \'\\0\'` শর্ত অথবা লুপের আগে একবার `size_t len = strlen(s);` সেভ করে নিলেই কোড `O(n)` হয়ে যায়।',
        ],
        memoryDiagram: `BAD: i < strlen(s) => O(n^2) | GOOD: s[i] != '\\0' => O(n) single scan`,
        code: `#include <stdio.h>

int main(void) {
    char s[1024];
    if (scanf("%1023s", s) == 1) {
        int digits = 0;
        for (size_t i = 0; s[i] != '\\0'; i++) {
            if (s[i] >= '0' && s[i] <= '9') digits++;
        }
        printf("%d\\n", digits);
    }
    return 0;
}`,
        stdin: 'c23_test_99',
        expectedOutput: '4',
        lineByLine: [
          { lineNumber: 'Line 7', codeSnippet: "for (size_t i = 0; s[i] != '\\0'; i++)", whatItMeans: 'Checks null terminator in O(1) per iteration.', whyItIsThere: 'Avoids re-scanning whole string via strlen(s) inside condition.', ifDeletedError: 'Cannot iterate characters in O(n).' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 1', codeSnippet: '#include <stdio.h>', whatItMeans: 'Imports standard I/O printf declaration.', whyItIsThere: 'Needed to emit computed O(1) result.', ifDeletedError: 'Compile error: implicit declaration of printf.' },
      { lineNumber: 'Line 3', codeSnippet: 'int main(void) {', whatItMeans: 'Entry function invoked by OS runtime.', whyItIsThere: 'Starts program execution.', ifDeletedError: 'Linker error: undefined reference to main.' },
      { lineNumber: 'Line 4', codeSnippet: 'long long n = 100000;', whatItMeans: 'Stores upper limit n in signed 64-bit integer.', whyItIsThere: '32-bit int would overflow n * (n + 1) when n >= 46341.', ifDeletedError: 'Compile error: n undeclared.' },
      { lineNumber: 'Line 5', codeSnippet: 'long long ans = (n % 2 == 0) ? (n / 2) * (n + 1) : n * ((n + 1) / 2);', whatItMeans: 'Applies Gauss closed-form sum dividing the even term first.', whyItIsThere: 'Guarantees O(1) runtime even for n = 10^9 without overflow.', ifDeletedError: 'Missing O(1) summation logic.' },
      { lineNumber: 'Line 6', codeSnippet: 'printf("%lld\\n", ans);', whatItMeans: 'Prints exact 64-bit sum to stdout.', whyItIsThere: 'Uses %lld matching long long type.', ifDeletedError: 'Using %d truncates upper 32 bits!' },
    ],
    dryRunTable: [
      { step: 1, state: 'Read n = 100000', memoryOrStack: 'n = 100000 (8B)', note: 'O(1) time budget check' },
      { step: 2, state: 'Evaluate n % 2 == 0', memoryOrStack: 'true -> divide n/2 = 50000', note: 'Reduces magnitude early' },
      { step: 3, state: 'Multiply 50000 * 100001', memoryOrStack: 'ans = 5000050000', note: '3 CPU arithmetic steps' },
      { step: 4, state: 'Emit answer', memoryOrStack: 'stdout="5000050000"', note: 'Same latency for n=10^9' },
    ],
    harryBugTraps: [
      {
        title: 'Calling strlen(s) Inside Loop Condition',
        brokenCode: `for (size_t i = 0; i < strlen(s); i++) count++;`,
        fixedCode: `#include <stdio.h>\n#include <string.h>\nint main(void) {\n    char s[] = "argon";\n    size_t len = strlen(s);\n    printf("%zu\\n", len);\n    return 0;\n}`,
        whyItBreaks: 'Recomputing strlen(s) every iteration turns an O(n) linear loop into an O(n^2) timeout.',
      },
      {
        title: 'Writing i * i <= n Using 32-Bit int When n ~ 10^9',
        brokenCode: `for (int d = 1; d * d <= n; d++) // d=46341 overflows int!`,
        fixedCode: `#include <stdio.h>\nint main(void) {\n    long long n = 1000000007LL;\n    int prime = 1;\n    for (long long d = 2; d * d <= n; d++) if (n % d == 0) { prime = 0; break; }\n    printf("%d\\n", prime);\n    return 0;\n}`,
        whyItBreaks: '46341 * 46341 exceeds INT_MAX (2.14e9), wrapping negative and causing infinite loop or UB.',
      },
      {
        title: 'Allocating Huge Multi-Megabyte Array Inside Stack Frame',
        brokenCode: `int main(void) { int dp[2000000]; return 0; }`,
        fixedCode: `#include <stdio.h>\nstatic int dp[2000000];\nint main(void) { dp[0] = 1; printf("%d\\n", dp[0]); return 0; }`,
        whyItBreaks: 'Default OS stack limit is ~1–8 MB; declare multi-megabyte buffers static/global or via malloc.',
      },
    ],
    practiceSheet: [
      {
        id: 'c-ch-10-q1',
        difficulty: 'Easy',
        title: '1. O(1) Sum of Even Numbers 2..2n',
        prompt: 'Read n up to 10^9 and print the sum of the first n positive even integers in O(1) time.',
        banglaHint: 'প্রথম nটি জোড় সংখ্যার যোগফল = n * (n + 1)।',
        starterCode: `#include <stdio.h>\nint main(void) {\n    long long n = 0;\n    if (scanf("%lld", &n) == 1) printf("%lld\\n", n * (n + 1));\n    return 0;\n}`,
        sampleStdin: '5',
        expectedOutput: '30',
      },
      {
        id: 'c-ch-10-q2',
        difficulty: 'Easy',
        title: '2. O(1) Count Multiples of k in [1..n]',
        prompt: 'Read n and k (up to 10^12) and print how many multiples of k lie in 1..n.',
        banglaHint: 'সরাসরি `n / k` ভাগফলই উত্তর, কোনো লুপের দরকার নেই!',
        starterCode: `#include <stdio.h>\nint main(void) {\n    long long n = 0, k = 1;\n    if (scanf("%lld %lld", &n, &k) == 2 && k > 0) printf("%lld\\n", n / k);\n    return 0;\n}`,
        sampleStdin: '1000000000 3',
        expectedOutput: '333333333',
      },
      {
        id: 'c-ch-10-q3',
        difficulty: 'Medium',
        title: '3. O(sqrt(n)) Primality Tester',
        prompt: 'Read n up to 10^12 and print "PRIME" or "COMPOSITE" in O(sqrt(n)) time.',
        banglaHint: '2 এবং 3 আলাদা করে চেক করে বা `long long d` দিয়ে `d * d <= n` পর্যন্ত চালাও।',
        starterCode: `#include <stdio.h>\nint main(void) {\n    long long n = 0;\n    if (scanf("%lld", &n) == 1) {\n        int p = n > 1;\n        for (long long d = 2; d * d <= n; d++) if (n % d == 0) { p = 0; break; }\n        printf("%s\\n", p ? "PRIME" : "COMPOSITE");\n    }\n    return 0;\n}`,
        sampleStdin: '1000000007',
        expectedOutput: 'PRIME',
      },
      {
        id: 'c-ch-10-q4',
        difficulty: 'Medium',
        title: '4. O(n) Maximum Consecutive Difference',
        prompt: 'Read n then n integers; print max |a[i] - a[i-1]| in O(n) time and O(1) memory.',
        banglaHint: 'শুধু আগের উপাদান `prev` মনে রাখলেই পুরো অ্যারে সেভ করতে হবে না!',
        starterCode: `#include <stdio.h>\nint main(void) {\n    int n = 0;\n    if (scanf("%d", &n) == 1 && n >= 2) {\n        long long prev = 0, cur = 0, best = 0;\n        scanf("%lld", &prev);\n        for (int i = 1; i < n && scanf("%lld", &cur) == 1; i++) {\n            long long d = cur > prev ? cur - prev : prev - cur;\n            if (d > best) best = d;\n            prev = cur;\n        }\n        printf("%lld\\n", best);\n    }\n    return 0;\n}`,
        sampleStdin: '5\n3 10 4 15 9',
        expectedOutput: '11',
      },
      {
        id: 'c-ch-10-q5',
        difficulty: 'Hard',
        title: '5. Count Divisors in O(sqrt(n))',
        prompt: 'Read n up to 10^12 and print exact number of positive divisors.',
        banglaHint: 'd * d == n হলে +1, নইলে +2 যোগ করবে।',
        starterCode: `#include <stdio.h>\nint main(void) {\n    long long n = 0, cnt = 0;\n    if (scanf("%lld", &n) == 1 && n > 0) {\n        for (long long d = 1; d * d <= n; d++) if (n % d == 0) cnt += (d * d == n) ? 1 : 2;\n        printf("%lld\\n", cnt);\n    }\n    return 0;\n}`,
        sampleStdin: '100',
        expectedOutput: '9',
      },
    ],
    miniBuild: {
      title: 'Milestone Merger 2 (Ch 1–10): O(1) Gauss Sum Engine',
      description: 'Replaces O(n) summation loops with overflow-safe O(1) closed-form arithmetic.',
      banglaGoal: 'অধ্যায় ১-১০ মিলিয়ে O(n) লুপ বাদ দিয়ে O(1) ফর্মুলায় ১০^৯ স্কেলে নির্ভুল যোগফল বের করা।',
      combinesChapters: 'Ch 1–10',
      starterCode: `#include <stdio.h>

int main(void) {
    long long n = 0;
    if (scanf("%lld", &n) == 1) {
        long long ans = (n % 2 == 0) ? (n / 2) * (n + 1) : n * ((n + 1) / 2);
        printf("%lld\\n", ans);
    }
    return 0;
}`,
      sampleStdin: '100000',
      expectedOutput: '5000050000',
    },
    starterCode: `#include <stdio.h>

int main(void) {
    long long n = 0;
    if (scanf("%lld", &n) == 1) {
        long long ans = (n % 2 == 0) ? (n / 2) * (n + 1) : n * ((n + 1) / 2);
        printf("%lld\\n", ans);
    }
    return 0;
}`,
    sampleStdin: '100000',
    expectedSampleOutput: '5000050000',
    testCases: [
      { id: 'c10-t1', input: '100000', expectedOutput: '5000050000' },
      { id: 'c10-t2', input: '10', expectedOutput: '55', isHidden: true },
    ],
  },
};

