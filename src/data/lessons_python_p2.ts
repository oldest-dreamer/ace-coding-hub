import type { AtomicLessonOverride } from './atomicLessonTypes';

export const LESSONS_PYTHON_P2: Record<number, AtomicLessonOverride> = {
  6: {
    chapterNumber: 6,
    title: 'Python Chapter 6 (Python 3.13+): Conditional Branching (if/elif/else & match-case)',
    banglaTitle: 'Python অধ্যায় ৬ (Python 3.13+): কন্ডিশনাল ব্রাঞ্চিং (if/elif/else ও match-case)',
    subtitle: 'Python truthiness, chained bounds, early guard returns, conditional expressions, and Python 3.10+ structural match-case.',
    zeroIntuition: {
      plainEnglishStory:
        'Python makes conditional routing expressive and readable. Besides crisp `if / elif / else` ladders with mathematical chained comparisons (`10 <= x <= 99`), Python considers empty containers (`[]`, `""`, `{}`), `0`, and `None` as falsy—making guard checks like `if not items: return` clean and Pythonic.\n\nSince Python 3.10+, structural `match / case` brings clean pattern matching with NO `break;` needed (zero accidental fall-through!), supporting multi-value OR patterns (`case "+" | "-":`) and fallback wildcards (`case _:`). Always watch out for truthy `0` vs `None`: check `if val is None:` explicitly when `0` is a valid number!',
      asciiFlowchart: `  [ Input: score ]
         |
         +--> not (0 <= score <= 100) --True--> [ print("INVALID") & return ]
         |
        False
         v
  [ score >= 90 ] --True--> "A+"
         |
        False
         v
  [ score >= 80 ] --True--> "A"  ... else "Pass/Fail"`,
      pseudocode: [
        '1. READ input tokens cleanly from sys.stdin',
        '2. GUARD invalid range using chained comparison 0 <= score <= 100',
        '3. CLASSIFY tiers cleanly with if / elif / else',
        '4. DISPATCH commands safely with Python match / case (no break needed)',
        '5. EMIT exact output string',
      ],
      banglaZeroToHero: {
        analogyTitle: 'স্মার্ট ট্রাফিক সিগন্যাল ও Python match-case',
        explanation:
          'দৈনন্দিন জীবনে আমরা সব সময় শর্তের ওপর ভিত্তি করে সিদ্ধান্ত নিই—যেমন বাইরে বৃষ্টি হলে ছাতা নেব, নইলে সানগ্লাস। Python প্রোগ্রামিংয়ে `if / elif / else` ঠিক সেই সিদ্ধান্তের মোড় তৈরি করে। C/C++ বা Java-র মতো এখানে `else if` না লিখে সংক্ষেপে `elif` লিখতে হয় এবং ব্র্যাকেটের বদলে কোলন (`:`) ও ৪-স্পেস ইনডেন্টেশন ব্যবহার হয়। Python-এর আরেকটি দারুণ সুবিধা হলো তুমি অঙ্কের খাতার মতোই `0 <= score <= 100` চেইন করে শর্ত লিখতে পারো। Python-এ `""`, `[]`, `0` এবং `None` ফালসি (False হিসেবে গণ্য), তাই তালিকা খালি কি না চেক করতে শুধু `if not items:` লিখলেই চলে। তবে সাবধান—যদি `0` কোনো বৈধ মান হয়, তবে কখনো `if not x:` লিখবে না, বরং লিখবে `if x is None:`! আধুনিক Python 3.10+ এ `match / case` যুক্ত হয়েছে যা C-এর `switch`-এর চেয়ে অনেক শক্তিশালী এবং এর ভেতরে `break` লেখার ঝামেলাই নেই! প্রতিটি `case` শেষ হলেই এটি স্বয়ংক্রিয়ভাবে ব্লক থেকে বেরিয়ে আসে এবং `case _:` ডিফল্ট হিসেবে কাজ করে। শুরুতেই ভুল ইনপুট আটকে দিলে (Guard Clause) নেস্টেড কোডের জঞ্জাল কমে ও কোড ঝকঝকে থাকে।',
        everydayExample:
          'মোবাইল রিচার্জ অ্যাপে ব্যালেন্স ০ হলেই লেনদেন গার্ড ক্লজে আটকে যায়, আর প্যাকেজ নম্বর দেখে `match-case` ঠিক সেই অফারটি চালু করে।',
        keyTakeaways: [
          'Python-এ `0 <= x <= 100` সরাসরি কাজ করে এবং খুবই পঠনযোগ্য।',
          '`match / case`-এ `break` লাগে না; `case _:` ডিফল্ট ব্রাঞ্চ হিসেবে কাজ করে।',
          'যখন `0` বৈধ ইনপুট, তখন `if not x:` নয় বরং `if x is None:` ব্যবহার করো।',
        ],
      },
    },
    topics: [
      {
        id: 'python-ch-6-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Chained Guard & elif Grade Classifier',
        englishParagraphs: [
          'Combining `not (0 <= score <= 100)` as an early guard keeps all grade logic cleanly at a single indentation level.',
          'Each `elif` runs only when every preceding branch evaluated to `False`.',
        ],
        banglaParagraphs: [
          'প্রথমেই `not (0 <= score <= 100)` দিয়ে সীমার বাইরের নম্বর বাদ দিয়ে নিচের গ্রেডগুলো `elif` দিয়ে সাজানো হয়েছে।',
          'এতে কোডে অপ্রয়োজনীয় গভীর ইনডেন্টেশন তৈরি হয় না।',
        ],
        memoryDiagram: `score=85 -> 0<=85<=100 True -> >=90 False -> >=80 True -> "A"`,
        code: `def grade(score: int) -> str:
    if not (0 <= score <= 100):
        return "INVALID"
    if score >= 90:
        return "A+"
    elif score >= 80:
        return "A"
    return "Pass/Fail"

print(grade(85))`,
        stdin: '',
        expectedOutput: 'A',
        lineByLine: [
          { lineNumber: 'Line 2', codeSnippet: 'if not (0 <= score <= 100):', whatItMeans: 'Chained range guard checking [0, 100] bounds.', whyItIsThere: 'Rejects negative or >100 grades cleanly.', ifDeletedError: '150 falsely returns "A+".' },
          { lineNumber: 'Line 6', codeSnippet: 'elif score >= 80:', whatItMeans: 'Secondary threshold checked only if score < 90.', whyItIsThere: 'Assigns A to 80..89.', ifDeletedError: '85 falls through to Pass/Fail.' },
        ],
      },
      {
        id: 'python-ch-6-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Python 3.10+ match / case Calculator With Zero Guard',
        englishParagraphs: [
          'Python’s `match op:` cleanly compares against literal operator cases without needing `break` statements.',
          'Case guards (`case "/" if b == 0:`) let you handle edge-case errors declaratively right inside the `match` arms!',
        ],
        banglaParagraphs: [
          'আধুনিক `match / case`-এ প্রতিটি অপারেটরের জন্য আলাদা কেস লেখা যায় এবং `case "/" if b == 0:` দিয়ে শূন্য দিয়ে ভাগের ত্রুটিও পরিষ্কারভাবে সামলানো যায়।',
          'এখানে কোনো `break` লিখতে হয় না, কারণ একটি কেস ম্যাচ করলেই পরেরগুলোতে যায় না।',
        ],
        memoryDiagram: `stdin: "12 * 4" -> match "*" -> 12 * 4 = 48`,
        code: `a_s, op, b_s = input().split()
a, b = int(a_s), int(b_s)
match op:
    case "+":
        print(a + b)
    case "-":
        print(a - b)
    case "*":
        print(a * b)
    case "/" if b == 0:
        print("DIV_ZERO")
    case "/":
        print(a // b)
    case _:
        print("UNKNOWN")`,
        stdin: '12 * 4',
        expectedOutput: '48',
        lineByLine: [
          { lineNumber: 'Line 3', codeSnippet: 'match op:', whatItMeans: 'Dispatches structurally on operator string without break.', whyItIsThere: 'Cleaner and safer than long if/elif chains.', ifDeletedError: 'Syntax error on case statements.' },
          { lineNumber: 'Line 10', codeSnippet: 'case "/" if b == 0:', whatItMeans: 'Pattern guard catching zero divisor before integer division.', whyItIsThere: 'Prevents ZeroDivisionError crash.', ifDeletedError: 'Input "10 / 0" crashes runtime.' },
        ],
      },
      {
        id: 'python-ch-6-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Inline Conditional Expressions & Shipping Tier Router',
        englishParagraphs: [
          'Python’s inline ternary expression writes `value_if_true if cond else value_if_false`, reading naturally like English prose.',
          'Remember to guard invalid weights (`w <= 0`) first before computing tier fees.',
        ],
        banglaParagraphs: [
          'Python-এ এক লাইনের শর্ত `val1 if cond else val2` ইংরেজি বাক্যের মতো পড়তে সহজ।',
          'নিচের উদাহরণটি পার্সেলের ওজন অনুযায়ী ডেলিভারি চার্জ নির্ণয় করে।',
        ],
        memoryDiagram: `w=7 -> w <= 0 False -> w <= 5 False -> w <= 20 True -> Fee=120`,
        code: `w = int(input().strip())
if w <= 0:
    print("INVALID")
else:
    fee = 60 if w <= 5 else (120 if w <= 20 else 250)
    print(f"Fee={fee}")`,
        stdin: '7',
        expectedOutput: 'Fee=120',
        lineByLine: [
          { lineNumber: 'Line 5', codeSnippet: 'fee = 60 if w <= 5 else (120 if w <= 20 else 250)', whatItMeans: 'Selects shipping tier cleanly via nested ternary.', whyItIsThere: 'Compact rule mapping.', ifDeletedError: 'Fee undefined.' },
        ],
      },
      {
        id: 'python-ch-6-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Zero-Falsy Trap (is None) & Watermelon Boundary (CF 4A)',
        englishParagraphs: [
          'Checking `if val:` silently treats `0` as missing! Whenever `0` is a legitimate value, ALWAYS test `if val is not None:`.',
          'Below we also apply boundary checking (`w > 2 and w % 2 == 0`) so `w = 2` returns `NO` instead of `YES`.',
        ],
        banglaParagraphs: [
          'Python-এ `0` একটি মিথ্যা (falsy) মান! তাই ইনপুটে `0` বৈধ মান হলে `if not x:` দিলে ভুল হবে—সর্বদা `if x is None:` ব্যবহার করবে।',
          'পাশাপাশি Codeforces 4A সমস্যায় `w = 2` হ্যান্ডল করতে `w > 2 and w % 2 == 0` চেক করা হয়েছে।',
        ],
        memoryDiagram: `w=2 -> (2>2 and True) -> False -> "NO"`,
        code: `import sys

raw = sys.stdin.read().strip()
val = int(raw) if raw != "" else None
if val is not None:
    print("YES" if (val > 2 and val % 2 == 0) else "NO")`,
        stdin: '2',
        expectedOutput: 'NO',
        lineByLine: [
          { lineNumber: 'Line 5', codeSnippet: 'if val is not None:', whatItMeans: 'Safely handles val == 0 without treating zero as missing.', whyItIsThere: 'Avoids classic Python falsy-zero bug.', ifDeletedError: 'if val: skips processing when val=0!' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 1', codeSnippet: 'def grade(score: int) -> str:', whatItMeans: 'Declares typed Python classifier function.', whyItIsThere: 'Isolates decision logic for clean unit testing.', ifDeletedError: 'Return statements fail outside a function.' },
      { lineNumber: 'Line 2', codeSnippet: 'if not (0 <= score <= 100):', whatItMeans: 'Chained comparison guarding invalid boundaries.', whyItIsThere: 'Fails fast on negative or >100 values.', ifDeletedError: 'Invalid inputs pass into valid grades.' },
      { lineNumber: 'Line 4', codeSnippet: 'if score >= 90:', whatItMeans: 'Checks highest grade band first.', whyItIsThere: 'Guarantees top band wins cleanly.', ifDeletedError: '95 drops to lower grade.' },
      { lineNumber: 'Line 6', codeSnippet: 'elif score >= 80:', whatItMeans: 'Secondary exclusive branch when < 90.', whyItIsThere: 'Avoids redundant upper-bound checks.', ifDeletedError: 'Score 85 misclassified as Pass/Fail.' },
      { lineNumber: 'Line 8', codeSnippet: 'return "Pass/Fail"', whatItMeans: 'Default fallback return for scores below 80.', whyItIsThere: 'Ensures every execution path returns a string.', ifDeletedError: 'Returns None implicitly.' },
    ],
    dryRunTable: [
      { step: 1, state: 'Call grade(85)', memoryOrStack: 'score=85', note: 'Function frame pushed' },
      { step: 2, state: '0 <= 85 <= 100', memoryOrStack: 'True (not False)', note: 'Guard skipped' },
      { step: 3, state: 'score >= 90', memoryOrStack: 'False', note: 'Falls to elif' },
      { step: 4, state: 'score >= 80', memoryOrStack: 'True -> "A"', note: 'Returns "A" & prints' },
    ],
    harryBugTraps: [
      { title: 'Treating 0 as None Using `if val:`', brokenCode: 'x = 0\nif not x: print("Missing!") # triggers even though x=0!', fixedCode: 'if x is None: print("Missing!")', whyItBreaks: 'Integer 0 is falsy in Python boolean evaluation.' },
      { title: 'Chaining `or` Incorrectly: `if x == 1 or 2:`', brokenCode: 'if x == 1 or 2: print("Matched") # ALWAYS TRUE!', fixedCode: 'if x == 1 or x == 2: print("Matched")', whyItBreaks: 'Parses as `(x == 1) or (2)`, and non-zero integer 2 is ALWAYS truthy!' },
      { title: 'Using `=` Assignment Inside `if`', brokenCode: 'if x = 5: print("5")', fixedCode: 'if x == 5: print("5")', whyItBreaks: 'Python forbids bare assignment in if conditions (SyntaxError).' },
    ],
    practiceSheet: [
      { id: 'python-ch-6-q1', difficulty: 'Easy', title: '1. Sign Classifier', prompt: 'Read int n and print POSITIVE, NEGATIVE, or ZERO.', banglaHint: 'if / elif / else ব্যবহার করো।', starterCode: `n = int(input().strip())\nif n > 0:\n    print("POSITIVE")\nelif n < 0:\n    print("NEGATIVE")\nelse:\n    print("ZERO")`, sampleStdin: '-9', expectedOutput: 'NEGATIVE' },
      { id: 'python-ch-6-q2', difficulty: 'Easy', title: '2. Maximum of Three Integers', prompt: 'Read 3 ints on one line and print the largest.', banglaHint: 'max(a, b, c) অথবা if/elif দিয়ে বের করো।', starterCode: `a, b, c = map(int, input().split())\nans = a\nif b > ans: ans = b\nif c > ans: ans = c\nprint(ans)`, sampleStdin: '12 99 45', expectedOutput: '99' },
      { id: 'python-ch-6-q3', difficulty: 'Medium', title: '3. Day Code Matcher', prompt: 'Read 1..3 (1=Mon, 2=Tue, 3=Wed, else INVALID) using match/case.', banglaHint: 'match d: ও case _: ব্যবহার করো।', starterCode: `d = int(input().strip())\nmatch d:\n    case 1: print("Mon")\n    case 2: print("Tue")\n    case 3: print("Wed")\n    case _: print("INVALID")`, sampleStdin: '2', expectedOutput: 'Tue' },
      { id: 'python-ch-6-q4', difficulty: 'Medium', title: '4. Valid Triangle Check', prompt: 'Read sides a, b, c; print YES if valid triangle else NO.', banglaHint: 'সব বাহু > 0 এবং যেকোনো দুই বাহুর যোগফল তৃতীয়টির বড়।', starterCode: `a, b, c = map(int, input().split())\nok = a > 0 and b > 0 and c > 0 and a + b > c and b + c > a and c + a > b\nprint("YES" if ok else "NO")`, sampleStdin: '3 4 5', expectedOutput: 'YES' },
      { id: 'python-ch-6-q5', difficulty: 'Hard', title: '5. Watermelon Boundary Split (CF 4A)', prompt: 'Read w and print YES if splittable into two positive even integers else NO.', banglaHint: 'w = 2 কেসটি খেয়াল রাখো: w > 2 and w % 2 == 0।', starterCode: `w = int(input().strip())\nprint("YES" if (w > 2 and w % 2 == 0) else "NO")`, sampleStdin: '2', expectedOutput: 'NO' },
    ],
    miniBuild: {
      title: 'Python 3.13 Tiered Grade & Guard-Clause Router',
      description: 'Validates numeric score range with chained comparisons and classifies grades cleanly.',
      banglaGoal: 'চেইনড গার্ড ক্লজ ও elif ব্যবহার করে গ্রেড রাউটার চালানো।',
      combinesChapters: 'Ch 1–6',
      starterCode: `score = int(input().strip())
if not (0 <= score <= 100):
    print("INVALID")
elif score >= 90:
    print("A+")
elif score >= 80:
    print("A")
else:
    print("PASS")`,
      sampleStdin: '92',
      expectedOutput: 'A+',
    },
    starterCode: `score = int(input().strip())
if not (0 <= score <= 100):
    print("INVALID")
elif score >= 90:
    print("A+")
elif score >= 80:
    print("A")
else:
    print("PASS")`,
    sampleStdin: '92',
    expectedSampleOutput: 'A+',
    testCases: [
      { id: 'py6-t1', input: '92', expectedOutput: 'A+' },
      { id: 'py6-t2', input: '105', expectedOutput: 'INVALID', isHidden: true },
    ],
  },

  7: {
    chapterNumber: 7,
    title: 'Python Chapter 7 (Python 3.13+): Loops (for, range, while, enumerate, break/else)',
    banglaTitle: 'Python অধ্যায় ৭ (Python 3.13+): লুপ মাস্টারি (for, range, while ও enumerate)',
    subtitle: 'range(start, stop, step), while convergence loops, break/continue, enumerate(), and Python loop-else.',
    zeroIntuition: {
      plainEnglishStory:
        'Python replaces C-style manual counter loops (`for (i=0; i<n; i++)`) with direct iteration over sequences and lazy `range(start, stop, step)` generators—zero extra RAM even for `range(10**9)`! Meanwhile, `while` loops repeat until a mathematical state converges (such as stripping digits via `n //= 10`).\n\nPython has no `do-while` keyword, so you simulate at-least-once behavior using `while True:` paired with an explicit `if cond: break` at the bottom. Calling `enumerate(items)` cleanly yields `(index, value)` pairs, and Python’s unique `for ... else:` runs the `else` suite ONLY when no `break` exited early!',
      asciiFlowchart: `  [ for i in range(1, 6) ]                [ while True: (do-while pattern) ]
         |                                      |
         v                                      v
  yields 1 -> 2 -> 3 -> 4 -> 5            [ Body runs >= 1 time ]
         |                                      |
         v (normal finish)                      v
  [ Optional for-else runs! ]             < exit_cond? > --YES--> break`,
      pseudocode: [
        '1. INITIALIZE accumulator (total = 0) before loop',
        '2. ITERATE cleanly over range() or enumerate() sequences',
        '3. USE while n > 0 with n //= 10 for arbitrary-size digit processing',
        '4. USE while True + break at bottom when minimum 1 pass is required',
        '5. EMIT final aggregate after loop',
      ],
      banglaZeroToHero: {
        analogyTitle: 'রেলগাড়ির প্রতিটি বগি ঘুরে দেখা ও লুপের else জাদু',
        explanation:
          'কল্পনা করো ট্রেনের প্রতিটি বগিতে গিয়ে যাত্রী গোনা হচ্ছে—Python-এর `for x in items:` ঠিক সেভাবেই সরাসরি প্রতিটি উপাদানের ওপর ঘুরে আসে। নির্দিষ্ট সংখ্যা থেকে আরেকটি সংখ্যা পর্যন্ত যেতে আমরা `range(start, stop)` ব্যবহার করি, যেখানে `stop` মানটি বাদ থাকে (যেমন `range(1, 6)` দেয় ১, ২, ৩, ৪, ৫)। `range` আসলে মেমোরিতে কোটি কোটি সংখ্যা জমা করে না, তাই `range(10**9)` তৈরি করলেও একদমই RAM খরচ হয় না! কতবার ঘুরবে তা জানা না থাকলে যেমন সংখ্যার অঙ্ক গুণতে `while n > 0:` ব্যবহার হয়। Python-এ `do-while` কীওয়ার্ড না থাকায় অন্তত একবার চালাতে `while True:` লিখে নিচে `if শর্ত: break` দেওয়া হয় (যেমন ইনপুট `0` হলে ১ অঙ্ক গোনা)। ইনডেক্স ও মান একসাথে পেতে `enumerate(items)` অনেক পরিচ্ছন্ন, `range(len(items))` লেখার দরকার হয় না। Python-এর আরেকটি অনন্য ফিচার হলো `for-else`—লুপের ভেতর `break` না ঘটলে তবেই কেবল `else:` অংশ চলে, যা প্রাইম নম্বর বা সার্চিংয়ে খুব কাজে দেয়! মনে রাখবে `for` লুপে চলমান লিস্ট থেকে সরাসরি উপাদান `.remove()` করলে পরের উপাদান বাদ পড়ে যায়।',
        everydayExample:
          'হাজিরা খাতায় ১ থেকে ৬০ পর্যন্ত প্রতিটি রোল কল করা হলো `range(1, 61)`, আর কেউ উত্তর না দিলে `continue` দিয়ে পরের রোলে যাওয়া।',
        keyTakeaways: [
          '`range(start, stop)`-এ `stop` সংখ্যাটি কখনোই অন্তর্ভুক্ত হয় না (`range(5)` = 0..4)।',
          'Python-এ `do-while` নেই—বিকল্প হিসেবে `while True:` + শেষে `if not cond: break` ব্যবহার করো।',
          '`for x in arr:` চলার সময় কখনো `arr`-এ আইটেম যোগ বা মুছবে না—বরং নতুন লিস্ট বা কম্প্রিহেনশন তৈরি করো।',
        ],
      },
    },
    topics: [
      {
        id: 'python-ch-7-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'range(1, n+1) Summation Loop',
        englishParagraphs: [
          '`range(1, 6)` produces `1, 2, 3, 4, 5` lazily without allocating a list in RAM.',
          'Initializing `total = 0` before the loop keeps the running invariant clean.',
        ],
        banglaParagraphs: [
          '`range(1, 6)` ১ থেকে ৫ পর্যন্ত প্রতিটি সংখ্যা পর্যায়ক্রমে দেয় এবং কোনো অতিরিক্ত RAM নেয় না।',
          'লুপের বাইরে `total = 0` রেখে প্রতিটি ধাপে যোগ করা হয়েছে।',
        ],
        memoryDiagram: `i in 1..5 -> total: 0 -> 1 -> 3 -> 6 -> 10 -> 15`,
        code: `total = 0
for i in range(1, 6):
    total += i
print(f"sum={total}")`,
        stdin: '',
        expectedOutput: 'sum=15',
        lineByLine: [
          { lineNumber: 'Line 1', codeSnippet: 'total = 0', whatItMeans: 'Initializes integer sum accumulator before iterating.', whyItIsThere: 'Zero identity element for addition.', ifDeletedError: 'NameError: total is not defined.' },
          { lineNumber: 'Line 2', codeSnippet: 'for i in range(1, 6):', whatItMeans: 'Iterates i from 1 up to 5 inclusive (6 is excluded).', whyItIsThere: 'Standard half-open range interval [1, 6).', ifDeletedError: 'Loop never runs.' },
          { lineNumber: 'Line 3', codeSnippet: 'total += i', whatItMeans: 'Accumulates current value into total.', whyItIsThere: 'Updates partial sum cleanly.', ifDeletedError: 'Outputs sum=0.' },
        ],
      },
      {
        id: 'python-ch-7-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Digit Counter Using while True (do-while Pattern)',
        englishParagraphs: [
          'By putting `digits += 1; x //= 10` inside `while True:` and checking `if x == 0: break` afterward, input `0` accurately returns `digits=1`!',
          'Using `abs(n)` handles negative integers uniformly.',
        ],
        banglaParagraphs: [
          'Python-এ `do-while` না থাকায় `while True:`-এর শেষে `if x == 0: break` বসিয়ে নিশ্চিত করা হয়েছে যে ইনপুট `0` দিলেও উত্তর ১ অঙ্ক আসে।',
          'বড় সংখ্যার জন্যও `//=` পূর্ণভাগ দিয়ে নির্ভুল গণনা করা হয়েছে।',
        ],
        memoryDiagram: `x=7042 -> 704(1) -> 70(2) -> 7(3) -> 0(4) -> break`,
        code: `n = int(input().strip())
x = abs(n)
digits = 0
while True:
    digits += 1
    x //= 10
    if x == 0:
        break
print(f"digits={digits}")`,
        stdin: '7042',
        expectedOutput: 'digits=4',
        lineByLine: [
          { lineNumber: 'Line 4', codeSnippet: 'while True:', whatItMeans: 'Simulates exit-controlled loop running at least once.', whyItIsThere: 'Input 0 must count as 1 digit.', ifDeletedError: 'Input 0 outputs digits=0.' },
          { lineNumber: 'Line 6', codeSnippet: 'x //= 10', whatItMeans: 'Integer floor division removes trailing base-10 digit.', whyItIsThere: 'Guarantees convergence to 0 in O(log10 n).', ifDeletedError: 'Infinite loop TLE!' },
        ],
      },
      {
        id: 'python-ch-7-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'O(sqrt(n)) Prime Checker With Python for-else',
        englishParagraphs: [
          'Python’s `for ... else:` runs the `else` block ONLY if the loop finishes normally without hitting `break`—eliminating extra boolean `is_prime` flags cleanly!',
          'Checking divisors `d` while `d * d <= n` evaluates 10^12 primes rapidly.',
        ],
        banglaParagraphs: [
          'Python-এর `for-else` এখানে জাদু দেখায়: কোনো ভাজক না পেয়ে লুপ স্বাভাবিকভাবে শেষ হলে তবেই `else:` চলে এবং "PRIME" প্রিন্ট হয়!',
          '`d * d <= n` পর্যন্ত `while` লুপ চালিয়ে খুব দ্রুত মৌলিক সংখ্যা যাচাই করা হয়েছে।',
        ],
        memoryDiagram: `n=29 -> d=2..5 (none divides 29) -> while finishes -> else prints "PRIME"`,
        code: `n = int(input().strip())
if n < 2:
    print("COMPOSITE")
else:
    d = 2
    while d * d <= n:
        if n % d == 0:
            print("COMPOSITE")
            break
        d += 1
    else:
        print("PRIME")`,
        stdin: '29',
        expectedOutput: 'PRIME',
        lineByLine: [
          { lineNumber: 'Line 11', codeSnippet: 'else:', whatItMeans: 'Executes strictly when while loop finishes without hitting break.', whyItIsThere: 'Replaces separate boolean flag cleanly.', ifDeletedError: 'PRIME never prints when loop finishes cleanly.' },
        ],
      },
      {
        id: 'python-ch-7-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Filter Even Skip (continue) & List-Mutation Pitfall',
        englishParagraphs: [
          'Never delete elements from a list while looping over it with `for x in arr:`—shifting indices cause the loop to skip the very next element! Instead filter with `continue` or list comprehension.',
          'Using `sys.stdin.read().split()` reads variable-length CP arrays cleanly.',
        ],
        banglaParagraphs: [
          'চলমান লিস্ট থেকে কখনোই লুপের ভেতর আইটেম ডিলিট করবে না, কারণ ইনডেক্স সরে গিয়ে পরের সংখ্যা বাদ পড়ে যায়!',
          '`continue` দিয়ে জোড় সংখ্যা এড়িয়ে কেবল বিজোড় সংখ্যাগুলোর যোগফল বের করা হয়েছে।',
        ],
        memoryDiagram: `arr=[2,5,8,7,3] -> skip 2,8 -> sum=5+7+3=15`,
        code: `import sys

nums = list(map(int, sys.stdin.read().split()))
if nums:
    odd_sum = 0
    for x in nums[1:1 + nums[0]]:
        if x % 2 == 0:
            continue
        odd_sum += x
    print(odd_sum)`,
        stdin: '5\n2 5 8 7 3',
        expectedOutput: '15',
        lineByLine: [
          { lineNumber: 'Line 7', codeSnippet: 'if x % 2 == 0: continue', whatItMeans: 'Skips even numbers immediately and advances iterator.', whyItIsThere: 'Keeps accumulation flat.', ifDeletedError: 'Even numbers added to odd_sum.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 1', codeSnippet: 'total = 0', whatItMeans: 'Initializes sum accumulator before entering loop.', whyItIsThere: 'Holds partial sum across iterations.', ifDeletedError: 'NameError: total not defined.' },
      { lineNumber: 'Line 2', codeSnippet: 'for i in range(1, 6):', whatItMeans: 'Lazy integer iterator over [1, 2, 3, 4, 5].', whyItIsThere: 'Produces 1..5 in O(1) memory.', ifDeletedError: 'Loop does not run.' },
      { lineNumber: 'Line 3', codeSnippet: 'total += i', whatItMeans: 'Adds i to running total.', whyItIsThere: 'Computes progressive triangular sum.', ifDeletedError: 'Prints sum=0.' },
      { lineNumber: 'Line 4', codeSnippet: 'print(f"sum={total}")', whatItMeans: 'Formats and emits final aggregate.', whyItIsThere: 'Outputs result once after loop ends.', ifDeletedError: 'No stdout emitted.' },
    ],
    dryRunTable: [
      { step: 1, state: 'Before loop', memoryOrStack: 'total=0', note: 'range(1,6) ready' },
      { step: 2, state: 'i = 1, 2, 3', memoryOrStack: 'total=6', note: '0+1+2+3' },
      { step: 3, state: 'i = 4, 5', memoryOrStack: 'total=15', note: 'Iterator exhausted' },
      { step: 4, state: 'print(f"sum={total}")', memoryOrStack: 'stdout="sum=15"', note: 'Clean exit' },
    ],
    harryBugTraps: [
      { title: 'Expecting Stop Endpoint in range(1, n) to Be Included', brokenCode: 'for i in range(1, 5): print(i) # stops at 4!', fixedCode: 'for i in range(1, 6): print(i)', whyItBreaks: 'range(start, stop) excludes stop by design.' },
      { title: 'Mutating List While Iterating Over It', brokenCode: 'for x in nums:\n    if x % 2 == 0: nums.remove(x) # skips adjacent items!', fixedCode: 'nums = [x for x in nums if x % 2 != 0]', whyItBreaks: 'Removing shifts remaining items left while index still advances.' },
      { title: 'Using `while x > 0:` Without Decrementing x', brokenCode: 'x = 5\nwhile x > 0: print(x) # infinite loop!', fixedCode: 'while x > 0:\n    print(x)\n    x -= 1', whyItBreaks: 'Loop variable must progress toward termination condition.' },
    ],
    practiceSheet: [
      { id: 'python-ch-7-q1', difficulty: 'Easy', title: '1. Factorial via for-range', prompt: 'Read n (0..25) and print n!.', banglaHint: 'f = 1 নিয়ে range(2, n + 1) দিয়ে গুণ করো।', starterCode: `n = int(input().strip())\nf = 1\nfor i in range(2, n + 1):\n    f *= i\nprint(f)`, sampleStdin: '5', expectedOutput: '120' },
      { id: 'python-ch-7-q2', difficulty: 'Easy', title: '2. Reverse Digits Using while True', prompt: 'Read non-negative integer n and output its reversed integer.', banglaHint: 'while True + //= 10 দিয়ে ০-সহ কাজ করো।', starterCode: `n = int(input().strip())\nrev = 0\nwhile True:\n    rev = rev * 10 + (n % 10)\n    n //= 10\n    if n == 0: break\nprint(rev)`, sampleStdin: '1234', expectedOutput: '4321' },
      { id: 'python-ch-7-q3', difficulty: 'Medium', title: '3. Arbitrary-Size Digit Sum', prompt: 'Read huge integer n and print sum of its decimal digits.', banglaHint: 'while n > 0: s += n % 10; n //= 10', starterCode: `n = abs(int(input().strip()))\ns = 0\nwhile n > 0:\n    s += n % 10\n    n //= 10\nprint(s)`, sampleStdin: '9085', expectedOutput: '22' },
      { id: 'python-ch-7-q4', difficulty: 'Medium', title: '4. Filtered Maximum Among Evens', prompt: 'Read n and n ints; print max even integer or -1 if none.', banglaHint: 'বেজোড় সংখ্যা continue দিয়ে বাদ দাও।', starterCode: `import sys\nt = list(map(int, sys.stdin.read().split()))\nmx = None\nfor x in t[1:1 + t[0]]:\n    if x % 2 != 0: continue\n    if mx is None or x > mx: mx = x\nprint(-1 if mx is None else mx)`, sampleStdin: '5\n3 10 7 4 9', expectedOutput: '10' },
      { id: 'python-ch-7-q5', difficulty: 'Hard', title: '5. Fast O(sqrt(n)) Prime Test With while-else', prompt: 'Read n and print PRIME or COMPOSITE.', banglaHint: 'while d * d <= n + else ব্যবহার করো।', starterCode: `n = int(input().strip())\nif n < 2:\n    print("COMPOSITE")\nelse:\n    d = 2\n    while d * d <= n:\n        if n % d == 0:\n            print("COMPOSITE"); break\n        d += 1\n    else:\n        print("PRIME")`, sampleStdin: '97', expectedOutput: 'PRIME' },
    ],
    miniBuild: {
      title: 'Python 3.13 Digit Counter & Loop Invariant Engine',
      description: 'Counts digits accurately for any integer including 0 using exit-controlled simulation.',
      banglaGoal: 'while True প্যাটার্ন দিয়ে সব সংখ্যার নির্ভুল অঙ্ক-গণক তৈরি।',
      combinesChapters: 'Ch 1–7',
      starterCode: `n = int(input().strip())
x = abs(n)
digits = 0
while True:
    digits += 1
    x //= 10
    if x == 0:
        break
print(f"digits={digits}")`,
      sampleStdin: '7042',
      expectedOutput: 'digits=4',
    },
    starterCode: `n = int(input().strip())
x = abs(n)
digits = 0
while True:
    digits += 1
    x //= 10
    if x == 0:
        break
print(f"digits={digits}")`,
    sampleStdin: '7042',
    expectedSampleOutput: 'digits=4',
    testCases: [
      { id: 'py7-t1', input: '7042', expectedOutput: 'digits=4' },
      { id: 'py7-t2', input: '0', expectedOutput: 'digits=1', isHidden: true },
    ],
  },

  8: {
    chapterNumber: 8,
    title: 'Python Chapter 8 (Python 3.13+): Nested Loops & Pattern Printing Mastery',
    banglaTitle: 'Python অধ্যায় ৮ (Python 3.13+): নেস্টেড লুপ ও প্যাটার্ন প্রিন্টিং মাস্টারি',
    subtitle: 'Row-column coordinate geometry, Python string repetition ("*" * k), hollow grids, and O(N*M) complexity bounds.',
    zeroIntuition: {
      plainEnglishStory:
        'Nested loops let a Python program walk through 2D coordinate grids row by row (`r = 0..R-1`, `c = 0..C-1`). Every time the outer loop advances one step down, the inner loop sweeps left-to-right across all columns before starting a new line.\n\nPython simplifies uniform patterns dramatically with string repetition (`"*" * count`), turning nested inner loops into clean one-liners (`" " * (n - 1 - r) + "*" * (2 * r + 1)`). Yet for custom grids, hollow boxes, or 2D matrix transforms, `(r, c)` boundary coordinates (`r == 0 or r == R - 1 or c == 0 or c == C - 1`) remain essential—and keep `O(N^2)` loops strictly below `N <= 1500` in Python due to interpreter loop overhead!',
      asciiFlowchart: `  [ Outer Loop: row r = 0 .. N-1 ]
         |
         v
  [ Build row string (spaces + symbols or col loop) ]
         |
         v
  [ print(row) / append to out ] ---> Next row (Total: O(N^2) work)`,
      pseudocode: [
        '1. READ grid dimensions R and C from stdin',
        '2. LOOP outer row r from 0 to R - 1',
        '3. COMPUTE spaces (n - 1 - r) and symbols (2*r + 1) or inspect (r, c) edges',
        '4. JOIN or print each row cleanly without trailing junk spaces',
        '5. GUARD N <= 10^3 whenever writing O(N^2) Python loops',
      ],
      banglaZeroToHero: {
        analogyTitle: 'দাবা বোর্ডের ঘর ও স্ট্রিং গুণ ("*" * k) জাদু',
        explanation:
          'যেকোনো স্টার বা সংখ্যার প্যাটার্নকে মুখস্থ না করে দাবা বোর্ডের মতো সারি (`r`) ও কলাম (`c`) স্থানাঙ্ক দিয়ে চিন্তা করো! বাইরের `for` লুপটি ওপর থেকে নিচে প্রতিটি সারি তৈরি করে এবং ভেতরের লুপটি বাম থেকে ডানে কলামগুলো সাজায়। Python-এর অনন্য সুন্দর একটি সুবিধা হলো স্ট্রিংকে সংখ্যা দিয়ে গুণ করা যায়! তাই যেখানে C/C++-এ আলাদা লুপ লাগে, Python-এ `"*" * r` লিখলেই এক সেকেন্ডে `r`-টি তারা তৈরি হয়ে যায়। পিরামিডের মতো শেপ বানাতে বামে `" " * (n - 1 - r)` আর পরে `"*" * (2 * r + 1)` যোগ করলেই কাজ শেষ! তবে ফাঁপা বাক্স বা ক্যালকুলেটেড গ্রিডের জন্য দুটি নেস্টেড লুপ চালিয়ে `r == 0 or r == R - 1 or c == 0 or c == C - 1` বর্ডার শর্ত যাচাই করতে হয়। ভেতরের লুপে প্রতিটি অক্ষর প্রিন্ট করতে `print("#", end="")` দিয়ে সারি শেষে খালি `print()` দেওয়া যায়, অথবা একটি স্ট্রিং লিস্টে জুড়ে `" ".join(...)` করে প্রিন্ট করা আরো দ্রুত। মনে রাখবে Python ইন্টারপ্রেটারে `O(N^2)` নেস্টেড লুপ `N = 10^5` হলে কখনোই ১ সেকেন্ডে চলবে না—তাই বড় ইনপুটে নেস্টেড লুপ এড়িয়ে ম্যাথ বা ডিকশনারি ব্যবহার করতে হবে।',
        everydayExample:
          'গ্রাফ কাগজের প্রতিটি বক্সে `(row, col)` স্থানাঙ্ক দেখে রঙ ভরার মতোই ২ডি প্যাটার্ন আঁকা হয়।',
        keyTakeaways: [
          'Python-এ `"*" * k` দিয়ে নেস্টেড লুপ ছাড়াই পুনরাবৃত্তিমূলক প্যাটার্ন আঁকা যায়।',
          'ফাঁপা বর্ডার শর্ত: `r == 0 or r == R-1 or c == 0 or c == C-1`।',
          'Python-এ ডাবল লুপ `O(N^2)` হলে `N <= 1000–1500` এর ভেতর সীমিত রাখো (নইলে TLE!)।',
        ],
      },
    },
    topics: [
      {
        id: 'python-ch-8-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Ascending Triangle With String Multiplication & Nested Loop',
        englishParagraphs: [
          'Printing `"*" * r` for `r in range(1, 5)` builds an ascending triangle cleanly without manual inner counter loops.',
          'Each `print(...)` call automatically finishes the row with a newline.',
        ],
        banglaParagraphs: [
          'Python-এ `"*" * r` ব্যবহার করলে ভেতরের আলাদা `for` লুপ ছাড়াই ১ থেকে ৪ সারির সিঁড়ি ত্রিভুজ তৈরি হয়ে যায়।',
          'প্রতিটি `print()` শেষে স্বয়ংক্রিয়ভাবে নতুন লাইন যুক্ত হয়।',
        ],
        memoryDiagram: `r=1:"*" | r=2:"**" | r=3:"***" | r=4:"****"`,
        code: `for r in range(1, 5):
    print("*" * r)`,
        stdin: '',
        expectedOutput: '*\n**\n***\n****',
        lineByLine: [
          { lineNumber: 'Line 1', codeSnippet: 'for r in range(1, 5):', whatItMeans: 'Iterates row counter r = 1, 2, 3, 4.', whyItIsThere: 'Generates 4 rows top-to-bottom.', ifDeletedError: 'Only single line runs.' },
          { lineNumber: 'Line 2', codeSnippet: 'print("*" * r)', whatItMeans: 'Repeats "*" character r times and emits newline.', whyItIsThere: 'Idiomatic Python string repetition.', ifDeletedError: 'Empty stdout.' },
        ],
      },
      {
        id: 'python-ch-8-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Centered Pyramid Using Leading Spaces + Odd Stars',
        englishParagraphs: [
          'For row `r` in `0..n-1`, concatenate `n - 1 - r` leading spaces and `2 * r + 1` stars so the pyramid centers without trailing spaces.',
        ],
        banglaParagraphs: [
          '`" " * (n - 1 - r) + "*" * (2 * r + 1)` সূত্রে প্রতি সারির ডান পাশে কোনো বাড়তি স্পেস ছাড়াই মাঝখানে পিরামিড আঁকা যায়।',
        ],
        memoryDiagram: `n=3 -> r=0:"  *" | r=1:" ***" | r=2:"*****"`,
        code: `n = int(input().strip())
for r in range(n):
    print(" " * (n - 1 - r) + "*" * (2 * r + 1))`,
        stdin: '3',
        expectedOutput: '  *\n ***\n*****',
        lineByLine: [
          { lineNumber: 'Line 3', codeSnippet: 'print(" " * (n - 1 - r) + "*" * (2 * r + 1))', whatItMeans: 'Concatenates exact leading spaces and odd count of stars.', whyItIsThere: 'Maintains symmetry cleanly.', ifDeletedError: 'Triangle skews to left edge.' },
        ],
      },
      {
        id: 'python-ch-8-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Hollow Rectangular Frame via Row-Column Coordinate Loop',
        englishParagraphs: [
          'Walking `(r, c)` inside a nested loop builds each row string cleanly, emitting `"#"` along outer boundaries and `" "` inside.',
          'Appending built row strings and joining at the end avoids partial line printing.',
        ],
        banglaParagraphs: [
          'দুটি নেস্টেড লুপ ও স্থানাঙ্ক শর্ত দিয়ে যেকোনো `rows x cols` মাপের ফাঁপা ফ্রেম বা গ্রিড তৈরি করা হয়েছে।',
        ],
        memoryDiagram: `rows=3, cols=4 -> "####\\n#  #\\n####"`,
        code: `rows, cols = map(int, input().split())
for r in range(rows):
    row_chars = []
    for c in range(cols):
        edge = (r == 0 or r == rows - 1 or c == 0 or c == cols - 1)
        row_chars.append("#" if edge else " ")
    print("".join(row_chars))`,
        stdin: '3 4',
        expectedOutput: '####\n#  #\n####',
        lineByLine: [
          { lineNumber: 'Line 5', codeSnippet: 'edge = (r == 0 or r == rows - 1 or c == 0 or c == cols - 1)', whatItMeans: 'True strictly on outer perimeter cells.', whyItIsThere: 'Hollows out interior cells cleanly.', ifDeletedError: 'Fills entire grid with #.' },
        ],
      },
      {
        id: 'python-ch-8-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Number Multiplication Grid & List Reference Trap ([ [0]*n ]*n)',
        englishParagraphs: [
          'Classic Python bug: `grid = [[0] * n] * n` duplicates the SAME row list reference `n` times—updating `grid[0][0] = 9` mutates EVERY row! Always create independent rows using `[[0] * n for _ in range(n)]` or generate cleanly row-by-row.',
          'Using `" ".join(str(r * c) for c in range(1, n + 1))` prints clean space-separated matrix rows.',
        ],
        banglaParagraphs: [
          'Python-এর ভয়ংকর 2D ফাঁদ: `[[0] * n] * n` লিখলে সব সারি একই লিস্টের রেফারেন্স হয়ে যায়—একটি ঘর বদলালে সব সারি বদলে যায়! তাই সর্বদা `[[0] * n for _ in range(n)]` লিখবে।',
        ],
        memoryDiagram: `n=3 -> "1 2 3\\n2 4 6\\n3 6 9" (no trailing space)`,
        code: `n = int(input().strip())
for r in range(1, n + 1):
    print(" ".join(str(r * c) for c in range(1, n + 1)))`,
        stdin: '3',
        expectedOutput: '1 2 3\n2 4 6\n3 6 9',
        lineByLine: [
          { lineNumber: 'Line 3', codeSnippet: 'print(" ".join(str(r * c) for c in range(1, n + 1)))', whatItMeans: 'Joins column products with single spaces and zero trailing space.', whyItIsThere: 'Cleanest Pythonic matrix row printer.', ifDeletedError: 'Extra trailing space or unformatted list brackets.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 1', codeSnippet: 'for r in range(1, 5):', whatItMeans: 'Outer loop stepping row index from 1 to 4 inclusive.', whyItIsThere: 'Controls total vertical rows in triangle.', ifDeletedError: 'Only single row prints.' },
      { lineNumber: 'Line 2', codeSnippet: 'print("*" * r)', whatItMeans: 'Repeats "*" string r times and emits line.', whyItIsThere: 'Avoids verbose inner column loop for uniform characters.', ifDeletedError: 'Nothing printed.' },
    ],
    dryRunTable: [
      { step: 1, state: 'r = 1', memoryOrStack: '"*" * 1 -> "*"', note: 'Row 1 printed' },
      { step: 2, state: 'r = 2', memoryOrStack: '"*" * 2 -> "**"', note: 'Row 2 printed' },
      { step: 3, state: 'r = 3', memoryOrStack: '"*" * 3 -> "***"', note: 'Row 3 printed' },
      { step: 4, state: 'r = 4', memoryOrStack: '"*" * 4 -> "****"', note: 'Loop ends cleanly' },
    ],
    harryBugTraps: [
      { title: 'Aliased 2D List Rows With [[0] * n] * n', brokenCode: 'g = [[0] * 3] * 3\ng[0][0] = 9 # modifies g[1][0] and g[2][0] too!', fixedCode: 'g = [[0] * 3 for _ in range(3)]', whyItBreaks: '* repeats references to the identical inner list object in memory.' },
      { title: 'Using Same Variable Name Inside Nested Loops', brokenCode: 'for i in range(3):\n    for i in range(3): pass # overwrites outer i!', fixedCode: 'for r in range(3):\n    for c in range(3): pass', whyItBreaks: 'Inner loop rebinds outer loop variable in the same function scope.' },
      { title: 'Trailing Space on Matrix Rows', brokenCode: 'for c in row: print(c, end=" ") # leaves trailing space!', fixedCode: 'print(" ".join(map(str, row)))', whyItBreaks: 'Manual end=" " appends a space after the last column.' },
    ],
    practiceSheet: [
      { id: 'python-ch-8-q1', difficulty: 'Easy', title: '1. Solid Rectangle R x C', prompt: 'Read R and C; print R rows of C "*" characters.', banglaHint: '"*" * c ব্যবহার করো।', starterCode: `r, c = map(int, input().split())\nfor _ in range(r):\n    print("*" * c)`, sampleStdin: '2 4', expectedOutput: '****\n****' },
      { id: 'python-ch-8-q2', difficulty: 'Easy', title: '2. Inverted Star Triangle', prompt: 'Read n and print stars descending from n down to 1.', banglaHint: 'range(n, 0, -1) দিয়ে লুপ চালাও।', starterCode: `n = int(input().strip())\nfor r in range(n, 0, -1):\n    print("*" * r)`, sampleStdin: '3', expectedOutput: '***\n**\n*' },
      { id: 'python-ch-8-q3', difficulty: 'Medium', title: '3. Sequential Number Triangle', prompt: 'Read n and print rows 1..n where row r prints digits 1..r.', banglaHint: '"".join(str(c) for c in range(1, r + 1)) ব্যবহার করো।', starterCode: `n = int(input().strip())\nfor r in range(1, n + 1):\n    print("".join(str(c) for c in range(1, r + 1)))`, sampleStdin: '3', expectedOutput: '1\n12\n123' },
      { id: 'python-ch-8-q4', difficulty: 'Medium', title: '4. Hollow Square Border', prompt: 'Read n and print n x n hollow box with "*" border.', banglaHint: 'নেস্টেড লুপে প্রান্তের শর্ত যাচাই করো।', starterCode: `n = int(input().strip())\nfor r in range(n):\n    print("".join("*" if (r in (0, n-1) or c in (0, n-1)) else " " for c in range(n)))`, sampleStdin: '4', expectedOutput: '****\n*  *\n*  *\n****' },
      { id: 'python-ch-8-q5', difficulty: 'Hard', title: '5. Count Pairs With Target Sum', prompt: 'Read n, target, and n ints; count pairs (i < j) with a[i] + a[j] == target.', banglaHint: 'j in range(i + 1, n) ব্যবহার করো।', starterCode: `import sys\nt = list(map(int, sys.stdin.read().split()))\nn, target = t[0], t[1]\na = t[2:2+n]\ncnt = 0\nfor i in range(n):\n    for j in range(i + 1, n):\n        if a[i] + a[j] == target: cnt += 1\nprint(cnt)`, sampleStdin: '4 6\n1 5 7 1', expectedOutput: '2' },
    ],
    miniBuild: {
      title: 'Python 3.13 2D Coordinate Pattern & Border Generator',
      description: 'Generates clean hollow rectangular borders using row-column predicates.',
      banglaGoal: 'নেস্টেড লুপ ও স্থানাঙ্ক যুক্তি দিয়ে ২ডি বর্ডার জেনারেটর তৈরি।',
      combinesChapters: 'Ch 1–8',
      starterCode: `rows, cols = map(int, input().split())
for r in range(rows):
    line = []
    for c in range(cols):
        edge = (r == 0 or r == rows - 1 or c == 0 or c == cols - 1)
        line.append("#" if edge else " ")
    print("".join(line))`,
      sampleStdin: '3 4',
      expectedOutput: '####\n#  #\n####',
    },
    starterCode: `rows, cols = map(int, input().split())
for r in range(rows):
    line = []
    for c in range(cols):
        edge = (r == 0 or r == rows - 1 or c == 0 or c == cols - 1)
        line.append("#" if edge else " ")
    print("".join(line))`,
    sampleStdin: '3 4',
    expectedSampleOutput: '####\n#  #\n####',
    testCases: [
      { id: 'py8-t1', input: '3 4', expectedOutput: '####\n#  #\n####' },
      { id: 'py8-t2', input: '2 2', expectedOutput: '##\n##', isHidden: true },
    ],
  },

  9: {
    chapterNumber: 9,
    title: 'Python Chapter 9 (Python 3.13+): Functions, Scope & Mutable Default Trap',
    banglaTitle: 'Python অধ্যায় ৯ (Python 3.13+): ফাংশন, স্কোপ ও মিউটেবল ডিফল্ট আর্গুমেন্ট ফাঁদ',
    subtitle: 'def with type hints, LEGB scope resolution, *args/**kwargs, multiple return tuples, and mutable default list trap.',
    zeroIntuition: {
      plainEnglishStory:
        'Functions keep Python code clean, testable, and modular using `def name(args) -> ReturnType:`. Python resolves variable names using the LEGB rule (Local -> Enclosing -> Global -> Built-in) and allows returning multiple values effortlessly as tuples (`return q, r`).\n\nTwo critical Python traps catch almost every beginner: (1) NEVER use a mutable default like `def add(x, buf=[]):` because Python evaluates default arguments ONCE at function definition time, causing every future call to share the SAME mutated list! Use `buf=None` instead. (2) Reading an outer variable inside a function works, but assigning `x += 1` without passing it as an argument or declaring `nonlocal`/`global` raises `UnboundLocalError`.',
      asciiFlowchart: `  [ Function Call: lo, hi = sort_pair(90, 15) ]
         |
         v
  [ New Stack Frame: a=90, b=15 (Isolated Local Scope) ]
         |
         +--> Pure transform -> returns tuple (15, 90) -> Frame popped!`,
      pseudocode: [
        '1. DEFINE cohesive helper functions with explicit type annotations',
        '2. RETURN multiple values cleanly as tuples instead of mutating globals',
        '3. ALWAYS write buf: list[int] | None = None (never buf=[]) for default containers',
        '4. APPLY LEGB discipline: pass state cleanly via arguments',
        '5. COMPOSE math helpers (gcd, lcm, mod_pow) cleanly in main()',
      ],
      banglaZeroToHero: {
        analogyTitle: 'রেসিপির কারখানা ও শেয়ার্ড মিউটেবল লিস্টের ফাঁদ',
        explanation:
          'বড় সফটওয়্যার একটানা না লিখে ছোট ছোট কাজকে `def` দিয়ে আলাদা ফাংশনে ভাগ করলে কোড পরিষ্কার থাকে ও সহজে টেস্ট করা যায়। Python-এর ফাংশন খুব ফ্লেক্সিবল—একইসাথে `return a, b` লিখে একাধিক মান রিটার্ন করা যায় এবং প্যারামিটারে `x: int` টাইপ হিন্ট দিয়ে কোডকে ডকুমেন্টেড রাখা যায়। Python ভ্যারিয়েবল খোঁজার সময় LEGB নিয়ম (Local → Enclosing → Global → Built-in) মেনে চলে। ফাংশনের ভেতরে তৈরি ভ্যারিয়েবল কেবল ওই ফাংশনের নিজস্ব লোকাল স্কোপেই বেঁচে থাকে। তবে Python-এ দুটি মারাত্মক ফাঁদ রয়েছে যা ইন্টারভিউতে প্রায়ই জিজ্ঞেস করে! প্রথমটি হলো Mutable Default Argument Trap: তুমি যদি লেখো `def add(x, arr=[]):`, তবে ওই খালি `[]` লিস্টটি কেবল একবারই (ফাংশন ডিফাইন করার সময়) তৈরি হয়! পরের বার আর্গুমেন্ট ছাড়া ফাংশনটি কল করলে আগের সেই পুরনো লিস্টই ফিরে আসে এবং ডেটা জমে জগাখিচুড়ি হয়ে যায়! এর সমাধান হলো সর্বদা `arr=None` দিয়ে ভেতরে `if arr is None: arr = []` লেখা। দ্বিতীয় ফাঁদ হলো ফাংশনের ভেতর গ্লোবাল ভ্যারিয়েবল সরাসরি বদলাতে গেলে `UnboundLocalError` হওয়া—তাই গ্লোবাল এড়িয়ে প্যারামিটার পাস ও রিটার্ন করাই সেরা।',
        everydayExample:
          'হোটেলে প্রতি অতিথিকে নতুন প্লেট (buf=None -> []) না দিয়ে সবাইকে একই প্লেটে খাবার দেওয়াই হলো `buf=[]` ডিফল্ট আর্গুমেন্টের ভুল!',
        keyTakeaways: [
          'কখনো `def f(arr=[]):` লিখবে না—সর্বদা `def f(arr=None):` লিখে ভেতরে নতুন লিস্ট বানাও।',
          'Python-এ ফাংশন থেকে একাধিক মান `return min_val, max_val` টাপল হিসেবে পাঠানো যায়।',
          'ফাংশনে গ্লোবাল ভ্যারিয়েবল এড়িয়ে প্যারামিটার দিয়ে ডেটা পাঠাও ও রিটার্ন নাও।',
        ],
      },
    },
    topics: [
      {
        id: 'python-ch-9-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Pure Typed Function & Tuple Return Unpacking',
        englishParagraphs: [
          'Pure helper functions make logic reusable across scripts and unit tests cleanly.',
          'Type hints (`x: int -> int`) clarify expected contracts cleanly.',
        ],
        banglaParagraphs: [
          'টাইপ হিন্টসহ `def square_plus(...) -> int:` লিখলে ইনপুট ও আউটপুটের ধরন স্পষ্ট বোঝা যায়।',
          'পিউর ফাংশন বাইরের কোনো ভ্যারিয়েবলে পরিবর্তন ঘটায় না।',
        ],
        memoryDiagram: `call square_plus(6, 1) -> local x=6, c=1 -> returns 37`,
        code: `def square_plus(x: int, c: int = 0) -> int:
    return x * x + c

print(square_plus(6, 1))`,
        stdin: '',
        expectedOutput: '37',
        lineByLine: [
          { lineNumber: 'Line 1', codeSnippet: 'def square_plus(x: int, c: int = 0) -> int:', whatItMeans: 'Defines typed function with optional immutable default c=0.', whyItIsThere: 'Encapsulates quadratic transform cleanly.', ifDeletedError: 'NameError: square_plus is not defined.' },
          { lineNumber: 'Line 2', codeSnippet: 'return x * x + c', whatItMeans: 'Returns computed integer back to caller.', whyItIsThere: 'Outputs arithmetic result cleanly.', ifDeletedError: 'Function implicitly returns None.' },
        ],
      },
      {
        id: 'python-ch-9-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Modular Euclid GCD & Exact Integer LCM Functions',
        englishParagraphs: [
          'Splitting `my_gcd` and `my_lcm` into separate functions demonstrates function composition and clean integer division `//`.',
          'Note that Python 3.9+ also includes fast C-backed `math.gcd` and `math.lcm`.',
        ],
        banglaParagraphs: [
          'আলাদা `my_gcd` এবং `my_lcm` ফাংশন বানিয়ে একটির ভেতর থেকে আরেকটিকে কল করা হয়েছে।',
          'Python-এ পূর্ণভাগ `//` দিয়ে নির্ভুল গ.সা.গু ও ল.সা.গু পাওয়া যায়।',
        ],
        memoryDiagram: `my_gcd(24, 36) -> 12 -> my_lcm(24, 36) -> (24 // 12) * 36 = 72`,
        code: `def my_gcd(a: int, b: int) -> int:
    while b != 0:
        a, b = b, a % b
    return a

def my_lcm(a: int, b: int) -> int:
    if a == 0 or b == 0:
        return 0
    return (a // my_gcd(a, b)) * b

a, b = map(int, input().split())
print(f"gcd={my_gcd(a, b)} lcm={my_lcm(a, b)}")`,
        stdin: '24 36',
        expectedOutput: 'gcd=12 lcm=72',
        lineByLine: [
          { lineNumber: 'Line 3', codeSnippet: 'a, b = b, a % b', whatItMeans: 'Python simultaneous tuple swap advancing Euclidean step without temp var.', whyItIsThere: 'Concise O(log min(a,b)) GCD iteration.', ifDeletedError: 'Infinite loop in GCD.' },
        ],
      },
      {
        id: 'python-ch-9-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Safe Default None Pattern (Avoiding Shared Mutable List Bug)',
        englishParagraphs: [
          'Passing `items: list[int] | None = None` creates a fresh list inside each independent call instead of sharing one hidden list object across calls.',
          'Meanwhile returning a sorted pair tuple `(lo, hi)` replaces C++ mutable pointer swaps cleanly.',
        ],
        banglaParagraphs: [
          'ডিফল্ট আর্গুমেন্ট হিসেবে `None` ব্যবহার করলে প্রতিবার ফাংশন কল করলে একদম নতুন তালিকা তৈরি হয়—পুরনো কলের ডেটা মিশে যায় না!',
          'পাশাপাশি `(lo, hi)` টাপল রিটার্ন করে সহজে আনপ্যাক করা যায়।',
        ],
        memoryDiagram: `push_clean(5) -> [5] | push_clean(9) -> [9] (Fresh lists!)`,
        code: `def append_safe(val: int, buf: list[int] | None = None) -> list[int]:
    if buf is None:
        buf = []
    buf.append(val)
    return buf

def order_pair(a: int, b: int) -> tuple[int, int]:
    return (b, a) if a > b else (a, b)

tag, x_s, y_s = input().split()
lo, hi = order_pair(int(x_s), int(y_s))
print(f"{tag}:{lo},{hi} | fresh={append_safe(hi)}")`,
        stdin: 'Range 90 15',
        expectedOutput: 'Range:15,90 | fresh=[90]',
        lineByLine: [
          { lineNumber: 'Line 2', codeSnippet: 'if buf is None:', whatItMeans: 'Allocates fresh list per call instead of reusing definition-time list.', whyItIsThere: 'Eliminates Python’s infamous mutable default argument bug.', ifDeletedError: 'buf=[] would leak old items into future calls!' },
        ],
      },
      {
        id: 'python-ch-9-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Custom Binary Modular Power & UnboundLocalError Scope Trap',
        englishParagraphs: [
          'Assigning to a global variable inside a function makes Python mark that name local for the entire function body, raising `UnboundLocalError` if read before assignment!',
          'Passing all dependencies explicitly into pure functions like `mod_pow` completely avoids scope bugs.',
        ],
        banglaParagraphs: [
          'ফাংশনের ভেতর সরাসরি বাইরের ভ্যারিয়েবল পরিবর্তন করতে গেলে `UnboundLocalError` হয়—তাই সব ইনপুট আর্গুমেন্ট আকারে পাঠানোই পেশাদার নিয়ম।',
        ],
        memoryDiagram: `mod_pow(2, 10, 1000) -> 24 via O(log exp) bit shifts`,
        code: `def mod_pow(base: int, exp: int, mod: int) -> int:
    res = 1 % mod
    base %= mod
    while exp > 0:
        if exp & 1:
            res = (res * base) % mod
        base = (base * base) % mod
        exp >>= 1
    return res

a, b, m = map(int, input().split())
print(mod_pow(a, b, m))`,
        stdin: '2 10 1000',
        expectedOutput: '24',
        lineByLine: [
          { lineNumber: 'Line 5', codeSnippet: 'if exp & 1:', whatItMeans: 'Multiplies current power into result when binary bit is 1.', whyItIsThere: 'Computes modular exponentiation in O(log exp) steps.', ifDeletedError: 'Result always stays 1.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 1', codeSnippet: 'def square_plus(x: int, c: int = 0) -> int:', whatItMeans: 'Defines function signature with typed arguments and default value.', whyItIsThere: 'Creates reusable self-documented routine.', ifDeletedError: 'Calling square_plus raises NameError.' },
      { lineNumber: 'Line 2', codeSnippet: 'return x * x + c', whatItMeans: 'Evaluates expression and sends integer back to caller.', whyItIsThere: 'Produces explicit return value instead of None.', ifDeletedError: 'Prints None instead of 37.' },
      { lineNumber: 'Line 4', codeSnippet: 'print(square_plus(6, 1))', whatItMeans: 'Invokes square_plus with 6 and 1, printing 37.', whyItIsThere: 'Executes and displays function output.', ifDeletedError: 'No stdout produced.' },
    ],
    dryRunTable: [
      { step: 1, state: 'Call square_plus(6, 1)', memoryOrStack: 'local frame: x=6, c=1', note: 'Arguments bound' },
      { step: 2, state: 'Compute 6 * 6 + 1', memoryOrStack: '37', note: 'Pure calculation' },
      { step: 3, state: 'return 37', memoryOrStack: 'frame popped', note: 'Returns to module' },
      { step: 4, state: 'print(37)', memoryOrStack: 'stdout="37"', note: 'Done' },
    ],
    harryBugTraps: [
      { title: 'Mutable Default Argument Trap (def f(a=[]):)', brokenCode: 'def add(x, buf=[]): buf.append(x); return buf\n# Second call keeps items from first call!', fixedCode: 'def add(x, buf=None): buf = [] if buf is None else buf; buf.append(x); return buf', whyItBreaks: 'Default arguments are evaluated once when def executes, not per call.' },
      { title: 'Forgetting return (Implicit None)', brokenCode: 'def dbl(x): ans = x * 2 # forgot return!\nprint(dbl(5) + 1) # TypeError!', fixedCode: 'def dbl(x): return x * 2', whyItBreaks: 'Functions without return yield None, crashing arithmetic on caller side.' },
      { title: 'UnboundLocalError When Assigning Global Inside Function', brokenCode: 'cnt = 0\ndef inc(): cnt += 1 # UnboundLocalError!', fixedCode: 'def inc(cnt): return cnt + 1', whyItBreaks: 'Assignment marks cnt as local throughout the function before cnt is read.' },
    ],
    practiceSheet: [
      { id: 'python-ch-9-q1', difficulty: 'Easy', title: '1. Cube Helper Function', prompt: 'Write cube(x: int) -> int and print cube(n) for stdin n.', banglaHint: 'def cube(x): return x ** 3 ব্যবহার করো।', starterCode: `def cube(x: int) -> int:\n    return x * x * x\n\nprint(cube(int(input().strip())))`, sampleStdin: '4', expectedOutput: '64' },
      { id: 'python-ch-9-q2', difficulty: 'Easy', title: '2. Return Ordered Pair Tuple', prompt: 'Write order_pair(a, b) returning (min, max) and print space-separated.', banglaHint: 'return (b, a) if a > b else (a, b)', starterCode: `def order_pair(a: int, b: int) -> tuple[int, int]:\n    return (b, a) if a > b else (a, b)\n\na, b = map(int, input().split())\nlo, hi = order_pair(a, b)\nprint(lo, hi)`, sampleStdin: '25 10', expectedOutput: '10 25' },
      { id: 'python-ch-9-q3', difficulty: 'Medium', title: '3. Euclid GCD Helper', prompt: 'Write gcd_fn(a, b) using tuple swap while b != 0 and print result.', banglaHint: 'a, b = b, a % b লুপ ব্যবহার করো।', starterCode: `def gcd_fn(a: int, b: int) -> int:\n    while b:\n        a, b = b, a % b\n    return a\n\na, b = map(int, input().split())\nprint(gcd_fn(a, b))`, sampleStdin: '48 18', expectedOutput: '6' },
      { id: 'python-ch-9-q4', difficulty: 'Medium', title: '4. Overflow-Free LCM Helper', prompt: 'Implement lcm_fn(a, b) using gcd_fn.', banglaHint: '(a // gcd_fn(a, b)) * b ব্যবহার করো।', starterCode: `def gcd_fn(a: int, b: int) -> int:\n    while b: a, b = b, a % b\n    return a\n\ndef lcm_fn(a: int, b: int) -> int:\n    return (a // gcd_fn(a, b)) * b\n\na, b = map(int, input().split())\nprint(lcm_fn(a, b))`, sampleStdin: '12 15', expectedOutput: '60' },
      { id: 'python-ch-9-q5', difficulty: 'Hard', title: '5. Custom Binary Modular Power', prompt: 'Write mod_pow(base, exp, mod) in O(log exp) without calling built-in pow.', banglaHint: 'exp & 1 এবং exp >>= 1 দিয়ে লুপ চালাও।', starterCode: `def mod_pow(base: int, exp: int, mod: int) -> int:\n    res = 1 % mod; base %= mod\n    while exp > 0:\n        if exp & 1: res = (res * base) % mod\n        base = (base * base) % mod\n        exp >>= 1\n    return res\n\na, b, m = map(int, input().split())\nprint(mod_pow(a, b, m))`, sampleStdin: '3 10 1000', expectedOutput: '49' },
    ],
    miniBuild: {
      title: 'Python 3.13 Modular GCD & LCM Math Toolkit',
      description: 'Packages reusable typed gcd and lcm functions cleanly.',
      banglaGoal: 'মডুলার ফাংশন দিয়ে গ.সা.গু ও ল.সা.গু টুলকিট চালানো।',
      combinesChapters: 'Ch 1–9',
      starterCode: `def my_gcd(a: int, b: int) -> int:
    while b != 0:
        a, b = b, a % b
    return a

def my_lcm(a: int, b: int) -> int:
    return 0 if (a == 0 or b == 0) else (a // my_gcd(a, b)) * b

a, b = map(int, input().split())
print(f"gcd={my_gcd(a, b)} lcm={my_lcm(a, b)}")`,
      sampleStdin: '24 36',
      expectedOutput: 'gcd=12 lcm=72',
    },
    starterCode: `def my_gcd(a: int, b: int) -> int:
    while b != 0:
        a, b = b, a % b
    return a

def my_lcm(a: int, b: int) -> int:
    return 0 if (a == 0 or b == 0) else (a // my_gcd(a, b)) * b

a, b = map(int, input().split())
print(f"gcd={my_gcd(a, b)} lcm={my_lcm(a, b)}")`,
    sampleStdin: '24 36',
    expectedSampleOutput: 'gcd=12 lcm=72',
    testCases: [
      { id: 'py9-t1', input: '24 36', expectedOutput: 'gcd=12 lcm=72' },
      { id: 'py9-t2', input: '14 21', expectedOutput: 'gcd=7 lcm=42', isHidden: true },
    ],
  },
  10: {
    chapterNumber: 10,
    isMilestoneMerger: true,
    title: 'Python Chapter 10 (Python 3.13): Time & Space Complexity (Big-O & 10^8 Rule)',
    banglaTitle: 'Python অধ্যায় ১০ (Python 3.13): টাইম ও স্পেস কমপ্লেক্সিটি (Big-O ও ১০^৮ রুল)',
    subtitle: 'CPython overhead vs C++ speed, O(1) integer math, O(sqrt(N)) pruning, and avoiding O(N^2) traps.',
    zeroIntuition: {
      plainEnglishStory:
        'Big-O measures how operation count grows as input size `N` scales. Because CPython 3.13 interprets bytecode rather than running native machine instructions directly, a tight Python loop runs roughly 5×–10× slower than C++ (~10^7 simple operations per second vs ~10^8 in C++).\n\nThat makes algorithmic choice even more critical in Python! When `N = 100,000`, an `O(N^2)` nested loop executes `10^10` steps and times out immediately, whereas `O(1)` exact integer floor-division (`n * (n + 1) // 2`) or C-backed built-ins (`sum`, `sorted`, `set` hashing) pass comfortably inside 0.05s.',
      asciiFlowchart: `N = 100,000 (CPython safe ops/sec ≈ 10^7)
   |
   +--> O(N^2) double loop : 10^10 ops (~1000 s) ==> TLE!
   +--> O(N log N) sorted(): 1.7×10^6 (C-level Timsort ~0.04 s) ==> AC!
   +--> O(N) sum / pass    : 10^5 ops (~0.01 s) ==> AC!
   +--> O(1) n*(n+1)//2    : 1 op     (<0.0001 s) ==> Instant AC!`,
      pseudocode: [
        '1. CHECK constraint N against Python ~10^7 ops/sec budget',
        '2. USE integer floor division // so huge numbers stay exact (never float /)',
        '3. REPLACE nested O(N^2) loops with O(sqrt(N)), O(N), or O(1) algebra',
        '4. AVOID += string/list slicing inside loops that hides O(N^2) work',
        '5. PREFER sys.stdin.read() + "\n".join() when reading/printing 10^5 lines',
      ],
      banglaZeroToHero: {
        analogyTitle: 'শহরের হ্যান্ডশেক সমস্যা ও পাইথন গতির সীমা',
        explanation:
          'ধরো একটি স্টেডিয়ামে ১ লাখ দর্শক আছেন এবং সবাই সবার সাথে হাত মেলাতে চান। একজন একজন করে জোড়া ধরে গুনতে বসলে (`O(N^2)`) প্রায় এক হাজার কোটি ধাপ লাগবে যা পাইথনে কয়েক মিনিটেও শেষ হবে না—জাজ দেবে Time Limit Exceeded (TLE)! অথচ সূত্র বসিয়ে `n * (n - 1) // 2` লিখলে মাত্র এক লাইনে (`O(1)`) নিখুঁত উত্তর মেলে। C++ যেখানে ১ সেকেন্ডে প্রায় `10^8` ধাপ করতে পারে, পাইথন ইন্টারপ্রেটেড ভাষা বলে প্রায় `10^7` ধাপ করতে পারে। তাই পাইথনে `N = 10^5` দেখলে `O(N^2)` লুপ একদমই লেখা যাবে না। ভালো খবর হলো পাইথনের `int` আনলিমিটেড প্রিসিশনের, অর্থাৎ `100000 * 100001 // 2` করলে কখনো ওভারফ্লো হয় না! তবে সাবধান: কখনো `/` ফ্লোট ভাগ ব্যবহার করবে না, কারণ ১৭ ডিজিটের বড় সংখ্যায় `float` ভুল রাউন্ডিং করে—সবসময় `//` পূর্ণসংখ্যা ভাগ দেবে। আবার লুপের ভেতর `s += ch` দিয়ে স্ট্রিং জোড়া লাগালে তা গোপনে `O(N^2)` সময় নেয়; এর বদলে লিস্টে `append` করে শেষে `"".join(...)` করা উচিত। একইভাবে `x in my_list` হচ্ছে `O(N)` কিন্তু `x in my_set` হচ্ছে `O(1)`। সবসময় কোড লেখার আগে ইনপুট সীমা `N` দেখেই সঠিক Big-O বেছে নেবে।',
        everydayExample:
          'হাজার পৃষ্ঠার বইয়ে একটি শব্দ পাতায় পাতায় খুঁজে বের করা হলো `O(N)`, আর বইয়ের শেষের ইনডেক্স দেখে সরাসরি পাতায় যাওয়া হলো `O(1)` বা `O(log N)`।',
        keyTakeaways: [
          'পাইথনে বড় `int` ওভারফ্লো না হলেও ফ্লোট এড়াতে সবসময় `//` (integer division) ব্যবহার করবে।',
          '`x in list` ধীরে চলে (`O(N)`), দ্রুত খুঁজতে `set` বা `dict` (`O(1)`) ব্যবহার করো।',
          '১ লাখ লাইন ইনপুট-আউটপুটে `sys.stdin.read()` ও `"\\n".join()` অত্যন্ত কার্যকর।',
        ],
      },
    },
    topics: [
      {
        id: 'py-ch-10-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Exact Arbitrary-Precision O(1) Sum vs Loop',
        englishParagraphs: [
          'Python integers grow dynamically beyond 64 bits with zero silent overflow bugs.',
          'Using integer floor division `n * (n + 1) // 2` keeps exact precision even for `N = 10^12`, whereas floating-point `/` loses trailing digits after 2^53.',
        ],
        banglaParagraphs: [
          'পাইথনে `int` অসীম আকার নিতে পারে বলে C++-এর মতো ৩২-বিট ওভারফ্লো হয় না।',
          'তবে `/` দিলে `float` হয়ে সূক্ষ্ম ডিজিট হারিয়ে যায়, তাই বড় অঙ্কে সবসময় `//` ব্যবহার করতে হয়।',
        ],
        memoryDiagram: `100000 * 100001 // 2 -> exact PyLong int 5000050000 in O(1)`,
        code: `n = 100000
ans = n * (n + 1) // 2
print(ans)`,
        stdin: '',
        expectedOutput: '5000050000',
        lineByLine: [
          { lineNumber: 'Line 1', codeSnippet: 'n = 100000', whatItMeans: 'Assigns integer N.', whyItIsThere: 'Input scale where O(N^2) fails.', ifDeletedError: 'NameError: n is not defined.' },
          { lineNumber: 'Line 2', codeSnippet: 'ans = n * (n + 1) // 2', whatItMeans: 'O(1) exact integer formula.', whyItIsThere: 'Avoids float precision loss from single slash /.', ifDeletedError: 'NameError on print(ans).' },
        ],
      },
      {
        id: 'py-ch-10-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'O(sqrt(N)) Divisor Counting in Python',
        englishParagraphs: [
          'Scanning `d` only while `d * d <= n` finds all divisor pairs `(d, n // d)` cleanly in `O(sqrt(N))` time.',
          'Even for `N = 10^10`, the loop finishes in ~100,000 steps (~5 ms) instead of 10 billion steps.',
        ],
        banglaParagraphs: [
          '`while d * d <= n:` শর্ত ব্যবহার করলে `10^10`-এর ভাজক বের করতে মাত্র ১ লাখ ধাপ লাগে।',
          'বর্গমূল সমান হলে `1`, নতুবা এক জোড়া ভাজকের জন্য `2` যোগ করা হয়।',
        ],
        memoryDiagram: `n=36: d=1,2,3,4,6 -> pairs (1,36)(2,18)(3,12)(4,9)(6) => count=9`,
        code: `n = int(input())
cnt = 0
d = 1
while d * d <= n:
    if n % d == 0:
        cnt += 1 if d * d == n else 2
    d += 1
print(cnt)`,
        stdin: '36',
        expectedOutput: '9',
        lineByLine: [
          { lineNumber: 'Line 4', codeSnippet: 'while d * d <= n:', whatItMeans: 'Iterates only up to integer sqrt(n).', whyItIsThere: 'Avoids floating point math.sqrt errors.', ifDeletedError: 'Runs O(N) TLE.' },
          { lineNumber: 'Line 6', codeSnippet: 'cnt += 1 if d * d == n else 2', whatItMeans: 'Adds 1 for exact square root, 2 for distinct pair.', whyItIsThere: 'Prevents double counting.', ifDeletedError: 'Overcounts perfect squares by 1.' },
        ],
      },
      {
        id: 'py-ch-10-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Python Judge Budget Classifier',
        englishParagraphs: [
          'Classifying constraint limits helps Python coders recognize immediately when `N` requires `set`/`dict` hashing or closed-form math instead of quadratic loops.',
          'At `N <= 3000`, `N^2 <= 9e6` still clears Python safely; above that threshold, `O(N log N)` or `O(N)` is mandatory.',
        ],
        banglaParagraphs: [
          'পাইথনে সাধারণত `N <= 3000` হলেই কেবল `O(N^2)` চলে, তার উপরে `O(N log N)` বা `O(N)` বাধ্যতামূলক।',
          'সীমা যাচাইয়ের ছোট প্রোগ্রামটি এই হিসেব দ্রুত যাচাই করে।',
        ],
        memoryDiagram: `n=200000 -> exceeds Python O(N^2) threshold -> prints O(N_LOG_N)`,
        code: `n = int(input())
if n <= 3000:
    print("O(N^2)_OK")
elif n <= 200000:
    print("O(N_LOG_N)")
else:
    print("O(N)_OR_O(1)")`,
        stdin: '200000',
        expectedOutput: 'O(N_LOG_N)',
        lineByLine: [
          { lineNumber: 'Line 4', codeSnippet: 'elif n <= 200000:', whatItMeans: 'Checks C-level Timsort / heap bound.', whyItIsThere: '2e5 * log2(2e5) ≈ 3.5e6 ops runs fast in Python built-ins.', ifDeletedError: '2e5 falls into wrong tier.' },
        ],
      },
      {
        id: 'py-ch-10-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'O(log B) Built-in Three-Arg pow(a, b, mod) vs Loop',
        englishParagraphs: [
          'Computing `(a ** b) % mod` naively in Python builds a multi-megabyte integer first when `b = 10^9`, freezing memory and CPU!',
          'Python’s built-in three-argument `pow(a, b, mod)` runs C-level binary exponentiation with modular reduction at every step in `O(log b)` microseconds.',
        ],
        banglaParagraphs: [
          'বড় ঘাতের ক্ষেত্রে `(a ** b) % mod` লিখলে পাইথন আগে কোটি ডিজিটের সংখ্যা বানিয়ে র‍্যাম ভরে ফেলে!',
          'কিন্তু বিল্ট-ইন তিন-আর্গুমেন্ট `pow(a, b, mod)` প্রতি ধাপে মড নিয়ে `O(log b)` সময়ে দ্রুত উত্তর দেয়।',
        ],
        memoryDiagram: `BAD: (2**1000000) % M -> huge RAM! | GOOD: pow(2, 1000000, M) -> O(log b)`,
        code: `print(pow(2, 10, 1000000007))`,
        stdin: '',
        expectedOutput: '1024',
        lineByLine: [
          { lineNumber: 'Line 1', codeSnippet: 'print(pow(2, 10, 1000000007))', whatItMeans: 'Runs modular binary exponentiation in C.', whyItIsThere: 'O(log exp) speed and O(1) memory even for exp=10^18.', ifDeletedError: 'No output.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 1', codeSnippet: 'n = 100000', whatItMeans: 'Binds 100000 to variable n.', whyItIsThere: 'Sets benchmark upper bound N.', ifDeletedError: 'NameError: n is not defined.' },
      { lineNumber: 'Line 2', codeSnippet: 'ans = n * (n + 1) // 2', whatItMeans: 'Computes closed-form sum via integer division.', whyItIsThere: 'O(1) time and avoids float precision loss from /.', ifDeletedError: 'ans undefined.' },
      { lineNumber: 'Line 3', codeSnippet: 'print(ans)', whatItMeans: 'Writes exact integer sum to stdout.', whyItIsThere: 'Emits result to judge.', ifDeletedError: 'Empty output.' },
    ],
    dryRunTable: [
      { step: 1, state: 'n = 100000', memoryOrStack: 'PyLong(100000)', note: 'Initialize input size N' },
      { step: 2, state: 'n + 1 = 100001', memoryOrStack: 'temp int', note: 'Increment N by 1' },
      { step: 3, state: 'mul -> 10000100000', memoryOrStack: 'exact PyLong', note: 'Arbitrary precision multiply' },
      { step: 4, state: '// 2 -> 5000050000', memoryOrStack: 'O(1) time', note: 'Prints 5000050000 instantaneously' },
    ],
    harryBugTraps: [
      { title: 'Trap 1: Using / Instead of // for Large Sums', brokenCode: `ans = int(n * (n + 1) / 2)`, fixedCode: `ans = n * (n + 1) // 2`, whyItBreaks: 'Float division rounds numbers above 2^53 (~9e15), giving off-by-1 WA on 64-bit answers.' },
      { title: 'Trap 2: Naive (a ** b) % mod Causing Memory Spike', brokenCode: `print((2 ** 10000000) % 1000000007)`, fixedCode: `print(pow(2, 10000000, 1000000007))`, whyItBreaks: 'Computing 2**10^7 first constructs millions of bits in RAM before ever applying %.' },
      { title: 'Trap 3: Linear Membership Test Inside Loops', brokenCode: `if x in big_list: count += 1 # O(N) inside O(N) -> O(N^2)!`, fixedCode: `big_set = set(big_list)\nif x in big_set: count += 1 # O(1) lookup`, whyItBreaks: 'List containment scans item by item; converting to set gives O(1) average hash lookup.' },
    ],
    practiceSheet: [
      { id: 'py-ch10-p1', difficulty: 'Easy', title: 'O(1) Exact Integer Sum', prompt: 'Given N, output `1 + 2 + ... + N` using integer floor division.', banglaHint: '`n * (n + 1) // 2` সূত্র ব্যবহার করো।', starterCode: `n = int(input())\nprint(n * (n + 1) // 2)`, sampleStdin: '10', expectedOutput: '55' },
      { id: 'py-ch10-p2', difficulty: 'Easy', title: 'Divisor Count in O(sqrt(N))', prompt: 'Count divisors of N up to 10^10.', banglaHint: '`d * d <= n` পর্যন্ত লুপ চালিয়ে জোড়ায় গুনবে।', starterCode: `n = int(input())\nc = 0\nd = 1\nwhile d * d <= n:\n    if n % d == 0:\n        c += 1 if d * d == n else 2\n    d += 1\nprint(c)`, sampleStdin: '12', expectedOutput: '6' },
      { id: 'py-ch10-p3', difficulty: 'Medium', title: 'Fast Modular Power', prompt: 'Given A and B, print `(A^B) % 1000000007` in O(log B).', banglaHint: 'পাইথনের তিন-প্যারামিটার `pow(a, b, 1000000007)` ব্যবহার করো।', starterCode: `a, b = map(int, input().split())\nprint(pow(a, b, 1000000007))`, sampleStdin: '3 4', expectedOutput: '81' },
      { id: 'py-ch10-p4', difficulty: 'Medium', title: 'O(1) Range Sum [L, R]', prompt: 'Compute integer sum from L to R inclusively in O(1).', banglaHint: '`pref(r) - pref(l - 1)` দিয়ে বের করো।', starterCode: `def s(n):\n    return 0 if n <= 0 else n * (n + 1) // 2\nl, r = map(int, input().split())\nprint(s(r) - s(l - 1))`, sampleStdin: '3 7', expectedOutput: '25' },
      { id: 'py-ch10-p5', difficulty: 'Hard', title: 'O(sqrt(N)) Primality Check', prompt: 'Print `PRIME` if N is prime else `COMPOSITE`.', banglaHint: '`n < 2` হলে COMPOSITE, নতুবা `d * d <= n` দিয়ে ভাগ চেক করো।', starterCode: `n = int(input())\nif n < 2:\n    print("COMPOSITE")\nelse:\n    d = 2\n    ok = True\n    while d * d <= n:\n        if n % d == 0:\n            ok = False\n            break\n        d += 1\n    print("PRIME" if ok else "COMPOSITE")`, sampleStdin: '29', expectedOutput: 'PRIME' },
    ],
    miniBuild: {
      title: 'Milestone Merger 2: O(1) Arbitrary-Precision Range Engine (Phase 1–2)',
      description: 'Combine branching guards, reusable functions, and exact O(1) floor-division math to sum huge ranges instantaneously.',
      banglaGoal: 'গার্ড ক্লজ, ফাংশন ও `//` সূত্র মিলিয়ে দ্রুত রেঞ্জ-সাম প্রোগ্রাম তৈরি করো।',
      combinesChapters: 'Python Ch 1–10 (Phase 2 Milestone Merger)',
      starterCode: `def prefix_sum(n: int) -> int:
    if n <= 0:
        return 0
    return n * (n + 1) // 2

l, r = map(int, input().split())
if l > r:
    print(0)
else:
    print(prefix_sum(r) - prefix_sum(l - 1))`,
      sampleStdin: '1 100000',
      expectedOutput: '5000050000',
    },
    starterCode: `def prefix_sum(n: int) -> int:
    if n <= 0:
        return 0
    return n * (n + 1) // 2

l, r = map(int, input().split())
if l > r:
    print(0)
else:
    print(prefix_sum(r) - prefix_sum(l - 1))`,
    sampleStdin: '1 100000',
    expectedSampleOutput: '5000050000',
    testCases: [
      { id: 'py10-t1', input: '1 100000', expectedOutput: '5000050000' },
      { id: 'py10-t2', input: '10 20', expectedOutput: '165', isHidden: true },
    ],
  },
};


