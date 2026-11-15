import type { AtomicLessonOverride } from './atomicLessonTypes';

export const LESSONS_JAVA_P2: Record<number, AtomicLessonOverride> = {
  6: {
    chapterNumber: 6,
    title: 'Java Chapter 6 (Java 21+): Conditional Branching (if / else if, switch Expressions & Ternary)',
    banglaTitle: 'Java অধ্যায় ৬ (Java 21+): কন্ডিশনাল ব্রাঞ্চিং (if / else if, switch এক্সপ্রেশন ও টার্নারি)',
    subtitle: 'Guard clauses, Java 21 switch expressions (-> arrow yield), String switch dispatch, and null-safe equals.',
    zeroIntuition: {
      plainEnglishStory:
        'Java 21 transforms branching from verbose boilerplate into crisp, bug-proof logic. Traditional `if / else if / else` handles open-ended numeric ranges and compound boolean predicates, while guard clauses at the top of `main` fail fast on invalid input ranges.\n\nFor discrete values (`int`, `char`, `enum`, or `String`), Java 21’s modern `switch (op) { case "+" -> ...; default -> ...; }` arrow syntax completely eliminates accidental `break;` fall-through bugs and directly returns a value as an expression!',
      asciiFlowchart: `  [ Input: score ]
         |
         +--> (score < 0 || score > 100) --YES--> [ Print "INVALID" & return ]
         |
        NO
         v
  [ switch / if-else ladder ] ---> Java 21 arrow (->) needs NO break!
         |
         v
  [ Exact matched branch printed ]`,
      pseudocode: [
        '1. READ score or operator token from Scanner/BufferedReader',
        '2. GUARD invalid bounds early before threshold ladder',
        '3. ROUTE numeric thresholds downward (>= 90, >= 80)',
        '4. USE Java 21 switch arrow syntax (->) for zero fall-through risk',
        '5. EMIT exact output cleanly',
      ],
      banglaZeroToHero: {
        analogyTitle: 'রেললাইনের অ্যারো সুইচ ও Null-Safe দারোয়ান',
        explanation:
          'দৈনন্দিন কোডিংয়ে আমরা প্রায়ই একাধিক শর্তের ওপর ভিত্তি করে ভিন্ন ভিন্ন পথে চলি—যেমন নম্বর ৯০+ হলে A+, ৮০+ হলে A, অথবা ভুল নম্বর হলে INVALID। Java-তে `if / else if / else` দিয়ে এই শর্তের সিঁড়ি তৈরি করা হয় এবং শুরুতেই Guard Clause দিয়ে অবৈধ মান আটকে দেওয়া সবচেয়ে ভালো অভ্যাস। তবে Java 21-এর সবচেয়ে চমৎকার আধুনিক সুবিধা হলো Arrow `switch` Expression (`case "+" -> a + b;`)! পুরনো `case \':\': ... break;` পদ্ধতিতে `break` ভুলে গেলে নিচের সব কেস চলে যেত, কিন্তু আধুনিক `->` সিনট্যাক্সে কোনো `break` লাগেই না এবং এটি সরাসরি একটি ভ্যারিয়েবলের ভেতর মান রিটার্ন করতে পারে! তাছাড়া Java `switch` সরাসরি `String` নিয়েও কাজ করে, তবে অবশ্যই খেয়াল রাখবে ইনপুট যেন `null` না হয়, নইলে NullPointerException হবে। আরেকটি অত্যন্ত জরুরি নিয়ম হলো কখনোই `String` তুলনা করতে `==` দেবে না, কারণ `==` অবজেক্টের মেমোরি ঠিকানা দেখে—সর্বদা `"YES".equals(str)` এভাবে তুলনা করবে। ছোট দুই-মুখী সিদ্ধান্তে টার্নারি অপারেটর `(cond ? a : b)` এক লাইনেই কোডকে সুন্দর করে তোলে।',
        everydayExample:
          'ব্যাংকের অটোমেটিক রিসেপশন কিয়স্কের মেনু নম্বর বাছাই করার মতোই Java 21 arrow `switch` ভুল ছাড়া সঠিক কাউন্টারে পাঠিয়ে দেয়।',
        keyTakeaways: [
          'Java 21 `switch (x) { case ... -> ...; }` ব্যবহার করলে `break;` না দেওয়ার বাগ কখনোই হবে না।',
          'String তুলনা করতে সব সময় `"text".equals(s)` ব্যবহার করবে, কখনোই `s == "text"` নয়!',
          'শর্তের শুরুতেই গার্ড ক্লজ বসালে নেস্টেড `if`-এর পিরামিড তৈরি হয় না।',
        ],
      },
    },
    topics: [
      {
        id: 'java-ch-6-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Guard Clause & Descending Else-If Grade Classifier',
        englishParagraphs: [
          'Validating `[0, 100]` at the very top lets the rest of the method remain flat without redundant upper-bound checks.',
          'Remember that `if / else if` exits immediately after the first true branch.',
        ],
        banglaParagraphs: [
          'প্রথমেই ০ থেকে ১০০ সীমা যাচাই করে নিলে পরের `else if` ধাপগুলোতে আর অতিরিক্ত শর্ত লেখার দরকার পড়ে না।',
          'প্রথম যে শর্তটি সত্য হয়, কেবল সেটিই চলে এবং বাকিগুলো এড়িয়ে যায়।',
        ],
        memoryDiagram: `score=85 -> invalid? false -> >=90? false -> >=80? TRUE -> "A"`,
        code: `public class Main {
    public static void main(String[] args) {
        int score = 85;
        if (score < 0 || score > 100) {
            System.out.println("INVALID");
            return;
        }
        if (score >= 90) System.out.println("A+");
        else if (score >= 80) System.out.println("A");
        else System.out.println("Pass/Fail");
    }
}`,
        stdin: '',
        expectedOutput: 'A',
        lineByLine: [
          { lineNumber: 'Line 3', codeSnippet: 'int score = 85;', whatItMeans: 'Initializes local test score.', whyItIsThere: 'Supplies numeric value for grade routing.', ifDeletedError: 'Compile error: score cannot be resolved.' },
          { lineNumber: 'Line 4', codeSnippet: 'if (score < 0 || score > 100) {', whatItMeans: 'Range guard blocking invalid input.', whyItIsThere: 'Early return keeps grade checks clean.', ifDeletedError: 'Score 120 falsely prints A+.' },
          { lineNumber: 'Line 9', codeSnippet: 'else if (score >= 80) System.out.println("A");', whatItMeans: 'Classifies 80..89 band cleanly.', whyItIsThere: 'Reached only when score < 90.', ifDeletedError: '85 prints Pass/Fail.' },
        ],
      },
      {
        id: 'java-ch-6-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Java 21 Modern Switch Expression (-> Arrow Syntax)',
        englishParagraphs: [
          'Java’s modern `switch` expression returns a computed String directly using `->` arrows without `break;` boilerplate.',
          'Notice how `case "/"` uses a block with `yield` when zero-division validation spans multiple lines.',
        ],
        banglaParagraphs: [
          'Java 21-এর আধুনিক `switch` সরাসরি একটি মান রিটার্ন করতে পারে এবং `->` ব্যবহার করায় `break` ভুলে যাওয়ার কোনো সুযোগ নেই!',
          'একাধিক লাইন থাকলে `{ ... yield val; }` দিয়ে ফলাফল পাঠানো যায়।',
        ],
        memoryDiagram: `stdin: "12 * 4" -> switch("*") -> returns "48" directly`,
        code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLong()) {
            long a = sc.nextLong();
            String op = sc.next();
            long b = sc.nextLong();
            String res = switch (op) {
                case "+" -> String.valueOf(a + b);
                case "-" -> String.valueOf(a - b);
                case "*" -> String.valueOf(a * b);
                case "/" -> (b != 0) ? String.valueOf(a / b) : "DIV_ZERO";
                default -> "UNKNOWN";
            };
            System.out.println(res);
        }
    }
}`,
        stdin: '12 * 4',
        expectedOutput: '48',
        lineByLine: [
          { lineNumber: 'Line 10', codeSnippet: 'String res = switch (op) {', whatItMeans: 'Java 21 expression switch assigning matched branch value.', whyItIsThere: 'Compiler enforces exhaustiveness via default arm.', ifDeletedError: 'Must write verbose mutable variable + break statements.' },
          { lineNumber: 'Line 14', codeSnippet: 'case "/" -> (b != 0) ? String.valueOf(a / b) : "DIV_ZERO";', whatItMeans: 'Handles division safely with inline zero-divisor guard.', whyItIsThere: 'Prevents ArithmeticException / by zero.', ifDeletedError: 'Input "12 / 0" crashes JVM.' },
        ],
      },
      {
        id: 'java-ch-6-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Null-Safe String Dispatch & Shipping Fee Classifier',
        englishParagraphs: [
          'Calling `"VIP".equals(tier)` puts the constant string on the left so even if `tier` is `null`, Java safely returns `false` instead of throwing `NullPointerException`.',
          'Below we route parcel weight and tier safely.',
        ],
        banglaParagraphs: [
          'অনেক সময় API থেকে আসা স্ট্রিং `null` হতে পারে—তাই `tier.equals("VIP")`-এর বদলে `"VIP".equals(tier)` লেখা নিরাপদ!',
          'ওজন এবং মেম্বারশিপ অনুযায়ী ডেলিভারি ফি নির্ণয় করা হয়েছে।',
        ],
        memoryDiagram: `w=7, tier="STD" -> base=120 -> VIP? false -> Fee=120`,
        code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        long w = sc.nextLong();
        String tier = sc.next();
        if (w <= 0) {
            System.out.println("INVALID");
            return;
        }
        long fee = (w <= 5) ? 60 : (w <= 20 ? 120 : 250);
        if ("VIP".equals(tier)) fee /= 2;
        System.out.println("Fee=" + fee);
    }
}`,
        stdin: '7 STD',
        expectedOutput: 'Fee=120',
        lineByLine: [
          { lineNumber: 'Line 13', codeSnippet: 'if ("VIP".equals(tier)) fee /= 2;', whatItMeans: 'Yoda-style safe equality test ignoring null references.', whyItIsThere: 'Prevents NPE if tier happens to be null.', ifDeletedError: 'VIP users pay full price.' },
        ],
      },
      {
        id: 'java-ch-6-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Watermelon Boundary Split (CF 4A) & Ternary Output',
        englishParagraphs: [
          'Checking `w > 2 && w % 2 == 0` catches the notorious `w == 2` edge case where 2 only splits into `1 + 1`.',
          'Note that Java ternary expressions require both sides to share a compatible type (`String` here).',
        ],
        banglaParagraphs: [
          'Codeforces 4A সমস্যায় ২ কেজি তরমুজ কেবল ১+১ (বিজোড়) ভাগে ভাগ করা যায়, তাই `w > 2 && w % 2 == 0` লিখতে হবে।',
          'এক লাইনে `"YES"` বা `"NO"` প্রিন্ট করতে টার্নারি অপারেটর সবচেয়ে দ্রুত।',
        ],
        memoryDiagram: `w=2 -> (2>2 && true) -> false -> "NO"`,
        code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLong()) {
            long w = sc.nextLong();
            System.out.println((w > 2 && w % 2 == 0) ? "YES" : "NO");
        }
    }
}`,
        stdin: '2',
        expectedOutput: 'NO',
        lineByLine: [
          { lineNumber: 'Line 8', codeSnippet: '(w > 2 && w % 2 == 0) ? "YES" : "NO"', whatItMeans: 'Tests strict > 2 bound together with evenness.', whyItIsThere: 'Prevents failing test case w=2.', ifDeletedError: 'Prints YES for w=2.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 1', codeSnippet: 'public class Main {', whatItMeans: 'Public class matching Main.java entry contract.', whyItIsThere: 'Required by javac and judge runners.', ifDeletedError: 'Main class not found.' },
      { lineNumber: 'Line 2', codeSnippet: 'public static void main(String[] args) {', whatItMeans: 'JVM entry method signature.', whyItIsThere: 'JVM launches execution here.', ifDeletedError: 'Error: Main method not found.' },
      { lineNumber: 'Line 3', codeSnippet: 'int score = 85;', whatItMeans: 'Initializes 32-bit stack score.', whyItIsThere: 'Input value for branch evaluation.', ifDeletedError: 'Compile error: score undefined.' },
      { lineNumber: 'Line 4', codeSnippet: 'if (score < 0 || score > 100) {', whatItMeans: 'Guard clause checking out-of-range scores.', whyItIsThere: 'Exits early before valid grade checks.', ifDeletedError: 'Invalid scores match A+ or Pass.' },
      { lineNumber: 'Line 8', codeSnippet: 'if (score >= 90) System.out.println("A+");', whatItMeans: 'Checks highest grade band first.', whyItIsThere: 'Prevents lower thresholds from catching >= 90.', ifDeletedError: '95 falls into grade A.' },
      { lineNumber: 'Line 9', codeSnippet: 'else if (score >= 80) System.out.println("A");', whatItMeans: 'Captures 80..89 band exclusively.', whyItIsThere: 'Executes cleanly when >= 90 was false.', ifDeletedError: 'Score 85 outputs Pass/Fail.' },
    ],
    dryRunTable: [
      { step: 1, state: 'score = 85', memoryOrStack: 'score=85', note: 'Local primitive slot' },
      { step: 2, state: 'Guard (<0 || >100)', memoryOrStack: 'false', note: 'Proceed to ladder' },
      { step: 3, state: 'score >= 90', memoryOrStack: 'false', note: 'Skip A+' },
      { step: 4, state: 'score >= 80', memoryOrStack: 'TRUE', note: 'Prints A & exits' },
    ],
    harryBugTraps: [
      { title: 'Comparing Strings with == Instead of .equals()', brokenCode: 'String cmd = sc.next();\nif (cmd == "RUN") ...', fixedCode: 'if ("RUN".equals(cmd)) ...', whyItBreaks: '== compares heap memory references of two distinct String objects, returning false even for identical text!' },
      { title: 'Using Classic switch Without break;', brokenCode: 'case 1: System.out.println("A");\ncase 2: System.out.println("B");', fixedCode: 'case 1 -> System.out.println("A");\ncase 2 -> System.out.println("B");', whyItBreaks: 'Missing break falls through; Java 21 arrow (->) syntax prevents this completely.' },
      { title: 'Switching on Null String Variable', brokenCode: 'String s = null;\nswitch (s) { ... } // NullPointerException!', fixedCode: 'if (s != null) { switch (s) { ... } }', whyItBreaks: 'Java switch throws NullPointerException immediately if selector evaluates to null.' },
    ],
    practiceSheet: [
      { id: 'java-ch-6-q1', difficulty: 'Easy', title: '1. Sign Classifier', prompt: 'Read long n and print POSITIVE, NEGATIVE, or ZERO.', banglaHint: 'if / else if / else ব্যবহার করো।', starterCode: `import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        long n = new Scanner(System.in).nextLong();\n        if (n > 0) System.out.println("POSITIVE");\n        else if (n < 0) System.out.println("NEGATIVE");\n        else System.out.println("ZERO");\n    }\n}`, sampleStdin: '-42', expectedOutput: 'NEGATIVE' },
      { id: 'java-ch-6-q2', difficulty: 'Easy', title: '2. Maximum of Three Longs', prompt: 'Read 3 integers and print the largest using conditional checks.', banglaHint: 'long mx = a; দিয়ে তুলনা করো।', starterCode: `import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        long a = sc.nextLong(), b = sc.nextLong(), c = sc.nextLong();\n        long mx = a; if (b > mx) mx = b; if (c > mx) mx = c;\n        System.out.println(mx);\n    }\n}`, sampleStdin: '12 99 45', expectedOutput: '99' },
      { id: 'java-ch-6-q3', difficulty: 'Medium', title: '3. Java 21 Arrow Switch Day Router', prompt: 'Read int d (1..3 -> Mon, Tue, Wed; else INVALID) using switch expression.', banglaHint: 'case 1 -> "Mon"; এভাবে লেখো।', starterCode: `import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        int d = new Scanner(System.in).nextInt();\n        System.out.println(switch (d) {\n            case 1 -> "Mon";\n            case 2 -> "Tue";\n            case 3 -> "Wed";\n            default -> "INVALID";\n        });\n    }\n}`, sampleStdin: '2', expectedOutput: 'Tue' },
      { id: 'java-ch-6-q4', difficulty: 'Medium', title: '4. Valid Triangle Sides', prompt: 'Read sides a, b, c; print YES if valid triangle else NO.', banglaHint: 'a > 0 && b > 0 && c > 0 এবং ত্রিভুজ অসমতা যাচাই করো।', starterCode: `import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        long a = sc.nextLong(), b = sc.nextLong(), c = sc.nextLong();\n        boolean ok = a > 0 && b > 0 && c > 0 && a + b > c && b + c > a && c + a > b;\n        System.out.println(ok ? "YES" : "NO");\n    }\n}`, sampleStdin: '3 4 5', expectedOutput: 'YES' },
      { id: 'java-ch-6-q5', difficulty: 'Hard', title: '5. Watermelon Even Split (CF 4A)', prompt: 'Read long w and output YES if splittable into two positive even integers else NO.', banglaHint: 'w > 2 && w % 2 == 0 যাচাই করো।', starterCode: `import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        long w = new Scanner(System.in).nextLong();\n        System.out.println((w > 2 && w % 2 == 0) ? "YES" : "NO");\n    }\n}`, sampleStdin: '2', expectedOutput: 'NO' },
    ],
    miniBuild: {
      title: 'Java 21 Tiered Grade & Guard-Clause Router',
      description: 'Validates numeric score ranges with early guards and routes grades cleanly.',
      banglaGoal: 'গার্ড ক্লজ ও Java 21 ব্রাঞ্চিং দিয়ে গ্রেড রাউটার তৈরি।',
      combinesChapters: 'Ch 1–6',
      starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextInt()) {
            int score = sc.nextInt();
            if (score < 0 || score > 100) System.out.println("INVALID");
            else if (score >= 90) System.out.println("A+");
            else if (score >= 80) System.out.println("A");
            else System.out.println("PASS");
        }
    }
}`,
      sampleStdin: '92',
      expectedOutput: 'A+',
    },
    starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextInt()) {
            int score = sc.nextInt();
            if (score < 0 || score > 100) System.out.println("INVALID");
            else if (score >= 90) System.out.println("A+");
            else if (score >= 80) System.out.println("A");
            else System.out.println("PASS");
        }
    }
}`,
    sampleStdin: '92',
    expectedSampleOutput: 'A+',
    testCases: [
      { id: 'java6-t1', input: '92', expectedOutput: 'A+' },
      { id: 'java6-t2', input: '105', expectedOutput: 'INVALID', isHidden: true },
    ],
  },

  7: {
    chapterNumber: 7,
    title: 'Java Chapter 7 (Java 21+): Entry & Exit Controlled Loops (while, do-while, for)',
    banglaTitle: 'Java অধ্যায় ৭ (Java 21+): লুপ মাস্টারি (while, do-while ও for লুপ)',
    subtitle: 'Counter loops, enhanced for-each, do-while zero guarantees, StringBuilder batch output, and labeled breaks.',
    zeroIntuition: {
      plainEnglishStory:
        'Loops repeat deterministic steps across millions of elements inside the HotSpot JIT engine—which compiles hot loops straight into vectorized native machine code! Java provides entry-controlled `for` and `while` loops (testing BEFORE the body executes) plus exit-controlled `do { ... } while (cond);` (executing at least once).\n\nWhen emitting thousands of lines inside a Java loop, NEVER call `System.out.println` repeatedly—append to a single `StringBuilder` and flush once afterward to avoid TLE! Also remember Java’s `for-each` (`for (int x : arr)`) is read-only for primitives.',
      asciiFlowchart: `  [ for / while (Entry-Controlled) ]      [ do-while (Exit-Controlled) ]
         |                                       |
         v                                       v
  < cond == true? > --false--> Exit      [ Execute Body At Least Once ]
         |                                       |
        true                                     v
         v                               < cond == true? > --true--> Repeat
  [ Body + Update ] ---> Loop Back               |
                                               false --> Exit`,
      pseudocode: [
        '1. INITIALIZE long accumulators (sum = 0L) before loop',
        '2. CHECK entry condition safely (for / while)',
        '3. ADVANCE state toward termination each pass',
        '4. USE do-while when at least one pass is mandatory (e.g. counting digits of 0)',
        '5. BATCH bulk stdout via StringBuilder before printing',
      ],
      banglaZeroToHero: {
        analogyTitle: 'ফ্যাক্টরি কনভেয়ার বেল্ট ও StringBuilder বাফার',
        explanation:
          'কল্পনা করো একটি কারখানার কনভেয়ার বেল্ট সামনে দিয়ে একের পর এক পণ্য আনছে আর রোবট একই কাজ বারবার করছে—এটাই লুপ! Java-তে `for` এবং `while` হলো এন্ট্রি-কন্ট্রোলড লুপ, অর্থাৎ ভেতরে ঢোকার আগেই শর্ত যাচাই হয়। কতবার চলবে জানা থাকলে `for (int i = 0; i < n; i++)` ব্যবহার করবে, আর কতবার চলবে তা সংখ্যার অঙ্কের ওপর নির্ভর করলে `while (n > 0)` সেরা। কিন্তু ইনপুট `0` দিলে `while (n > 0)` একবারও চলে না; তাই অন্তত একবার চালানো নিশ্চিত করতে `do { ... } while (n > 0);` ব্যবহার করা হয়। আরেকটি বিশাল Java পারফরম্যান্স রহস্য হলো: লুপের ভেতর কখনোই বারবার `System.out.println` লিখবে না এবং `String s += "x"` করবে না! প্রতিটি `+` নতুন স্ট্রিং অবজেক্ট বানিয়ে কোডকে O(n^2) ধীর করে দেয়। এর বদলে `StringBuilder sb = new StringBuilder();` নিয়ে `sb.append(...)` করলে এবং লুপের বাইরে একবার প্রিন্ট করলে স্পিড C++-এর কাছাকাছি পৌঁছে যায়। আর প্রাইম সংখ্যা বা নির্দিষ্ট মান পাওয়ামাত্রই `break` দিয়ে বেরিয়ে এলে সময় বাঁচে।',
        everydayExample:
          'হাজারটা ইট একটা একটা করে হাতে নিয়ে যাওয়ার চেয়ে ঠেলাগাড়িতে (StringBuilder) সব জড়ো করে একবারে নিয়ে যাওয়া অনেক দ্রুত।',
        keyTakeaways: [
          'লুপের ভেতর `String +=` নয়, সব সময় `StringBuilder` ব্যবহার করো।',
          '`do-while` শেষে সেমিকোলন (`;`) দেওয়া বাধ্যতামূলক এবং এটি কমপক্ষে ১ বার চলে।',
          'প্রাইম চেক করার সময় `d <= n / d` লিখলে `d * d` ওভারফ্লো হয় না।',
        ],
      },
    },
    topics: [
      {
        id: 'java-ch-7-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Classic for Loop Summation With 64-Bit long',
        englishParagraphs: [
          'Initializing `long sum = 0;` outside the loop preserves running totals cleanly without 32-bit overflow.',
          'Looping `i = 1` through `5` executes cleanly in 5 deterministic passes.',
        ],
        banglaParagraphs: [
          'লুপের বাইরে `long sum = 0;` নিয়ে `for` লুপের প্রতিটি ধাপে মান যোগ করা হয়েছে যাতে বড় যোগফলও ওভারফ্লো না করে।',
          '৫ ধাপের শেষে চূড়ান্ত যোগফল প্রিন্ট হয়।',
        ],
        memoryDiagram: `i=1..5 -> sum: 0 -> 1 -> 3 -> 6 -> 10 -> 15`,
        code: `public class Main {
    public static void main(String[] args) {
        long sum = 0;
        for (int i = 1; i <= 5; i++) {
            sum += i;
        }
        System.out.println("sum=" + sum);
    }
}`,
        stdin: '',
        expectedOutput: 'sum=15',
        lineByLine: [
          { lineNumber: 'Line 3', codeSnippet: 'long sum = 0;', whatItMeans: 'Initializes 64-bit accumulator before loop.', whyItIsThere: 'Prevents 32-bit integer overflow on large sums.', ifDeletedError: 'Compile error: sum cannot be resolved.' },
          { lineNumber: 'Line 4', codeSnippet: 'for (int i = 1; i <= 5; i++) {', whatItMeans: 'Entry-controlled loop running for i = 1..5.', whyItIsThere: 'Repeats body 5 times deterministically.', ifDeletedError: 'Loop never runs.' },
          { lineNumber: 'Line 5', codeSnippet: 'sum += i;', whatItMeans: 'Adds counter i to running sum.', whyItIsThere: 'Updates total each pass.', ifDeletedError: 'Prints sum=0.' },
        ],
      },
      {
        id: 'java-ch-7-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Exit-Controlled do-while Digit Counter',
        englishParagraphs: [
          'Because `do { ... } while (x > 0);` tests the condition at the bottom, `n = 0` accurately yields `digits=1` instead of `0`.',
          'Using `Math.abs(n)` safely handles negative inputs (note: for `Long.MIN_VALUE`, handle edge sign carefully).',
        ],
        banglaParagraphs: [
          'ইনপুট `0` দিলেও যেন অঙ্ক সংখ্যা `1` আসে সেজন্য `do-while` লুপ ব্যবহার করা হয়েছে—কারণ এটি শর্ত দেখার আগেই একবার চলে।',
          'প্রতি ধাপে ১০ দিয়ে ভাগ (`x /= 10`) করে একটি করে অঙ্ক কমানো হয়েছে।',
        ],
        memoryDiagram: `x=7042 -> do: d=1(704) -> d=2(70) -> d=3(7) -> d=4(0) -> exit`,
        code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLong()) {
            long x = Math.abs(sc.nextLong());
            int digits = 0;
            do {
                digits++;
                x /= 10;
            } while (x > 0);
            System.out.println("digits=" + digits);
        }
    }
}`,
        stdin: '7042',
        expectedOutput: 'digits=4',
        lineByLine: [
          { lineNumber: 'Line 9', codeSnippet: 'do {', whatItMeans: 'Starts loop body guaranteed to run at least once.', whyItIsThere: 'Correctly handles input 0 -> 1 digit.', ifDeletedError: 'Input 0 outputs digits=0.' },
          { lineNumber: 'Line 11', codeSnippet: 'x /= 10;', whatItMeans: 'Drops least significant decimal digit.', whyItIsThere: 'Guarantees O(log10 n) loop termination.', ifDeletedError: 'Infinite loop TLE!' },
        ],
      },
      {
        id: 'java-ch-7-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'O(sqrt(n)) Prime Verifier With Early break',
        englishParagraphs: [
          'Checking `d <= n / d` avoids both floating-point `Math.sqrt` imprecision and `d * d` overflow when `n` approaches `10^12`.',
          'The moment a divisor is found, `break;` exits immediately.',
        ],
        banglaParagraphs: [
          '`d * d <= n`-এর বদলে `d <= n / d` লিখলে কোনো ওভারফ্লো বা দশমিক ত্রুটি ছাড়াই বর্গমূল পর্যন্ত ভাজক পরীক্ষা করা যায়।',
          'প্রথম ভাজক পাওয়ামাত্রই `break` দিয়ে লুপ থামানো হয়েছে।',
        ],
        memoryDiagram: `n=29 -> d=2..5 (none divide 29) -> prime=true -> "PRIME"`,
        code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLong()) {
            long n = sc.nextLong();
            boolean prime = n >= 2;
            for (long d = 2; d <= n / d; d++) {
                if (n % d == 0) {
                    prime = false;
                    break;
                }
            }
            System.out.println(prime ? "PRIME" : "COMPOSITE");
        }
    }
}`,
        stdin: '29',
        expectedOutput: 'PRIME',
        lineByLine: [
          { lineNumber: 'Line 9', codeSnippet: 'for (long d = 2; d <= n / d; d++) {', whatItMeans: 'Iterates up to floor(sqrt(n)) using safe integer division.', whyItIsThere: 'Runs in ~31,600 ops even when n = 10^9.', ifDeletedError: 'O(n) loop gets TLE on large inputs.' },
        ],
      },
      {
        id: 'java-ch-7-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Avoiding String += O(n^2) Trap via StringBuilder + continue',
        englishParagraphs: [
          'Concatenating `ans += num + "\\n"` inside a 10^5 loop allocates 10^5 progressively larger Strings (`O(n^2)` time = TLE!).',
          'Appending to `StringBuilder` achieves true `O(n)` amortized performance.',
        ],
        banglaParagraphs: [
          'লুপের ভেতর `String s +=` করলে প্রতিটি ধাপে নতুন মেমোরি কপি হয় ও প্রোগ্রাম O(n^2) ধীর হয়ে TLE পায়!',
          'এর বদলে `StringBuilder` ব্যবহার করলে ও `continue` দিয়ে জোড় সংখ্যা বাদ দিলে সুপারফাস্ট O(n) উত্তর আসে।',
        ],
        memoryDiagram: `nums=[2,5,8,7,3] -> continue on even -> sum=15`,
        code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextInt()) {
            int n = sc.nextInt();
            long oddSum = 0;
            for (int i = 0; i < n && sc.hasNextLong(); i++) {
                long x = sc.nextLong();
                if (x % 2 == 0) continue;
                oddSum += x;
            }
            System.out.println(oddSum);
        }
    }
}`,
        stdin: '5\n2 5 8 7 3',
        expectedOutput: '15',
        lineByLine: [
          { lineNumber: 'Line 11', codeSnippet: 'if (x % 2 == 0) continue;', whatItMeans: 'Skips even numbers and jumps directly to i++.', whyItIsThere: 'Keeps filtering logic clean.', ifDeletedError: 'Even numbers corrupt oddSum.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 1', codeSnippet: 'public class Main {', whatItMeans: 'Public class matching Main.java.', whyItIsThere: 'Required entry class.', ifDeletedError: 'Fails compilation.' },
      { lineNumber: 'Line 2', codeSnippet: 'public static void main(String[] args) {', whatItMeans: 'JVM entry method.', whyItIsThere: 'Starts execution.', ifDeletedError: 'Main method not found.' },
      { lineNumber: 'Line 3', codeSnippet: 'long sum = 0;', whatItMeans: '64-bit accumulator initialized before loop.', whyItIsThere: 'Preserves running total safely.', ifDeletedError: 'Compile error: sum unresolved.' },
      { lineNumber: 'Line 4', codeSnippet: 'for (int i = 1; i <= 5; i++) {', whatItMeans: 'Deterministic loop over 1..5 inclusive.', whyItIsThere: 'Controls exact iteration count.', ifDeletedError: 'Body executes once or fails.' },
      { lineNumber: 'Line 5', codeSnippet: 'sum += i;', whatItMeans: 'Updates sum accumulator each pass.', whyItIsThere: 'Computes 1+2+3+4+5.', ifDeletedError: 'Outputs sum=0.' },
      { lineNumber: 'Line 7', codeSnippet: 'System.out.println("sum=" + sum);', whatItMeans: 'Prints formatted total after loop exits.', whyItIsThere: 'Emits result once.', ifDeletedError: 'No stdout emitted.' },
    ],
    dryRunTable: [
      { step: 1, state: 'Init sum = 0', memoryOrStack: 'sum=0, i=1', note: '1 <= 5 true' },
      { step: 2, state: 'i = 1, 2, 3', memoryOrStack: 'sum=6, i=4', note: 'Accumulates cleanly' },
      { step: 3, state: 'i = 4, 5', memoryOrStack: 'sum=15, i=6', note: '6 <= 5 false -> exit' },
      { step: 4, state: 'println', memoryOrStack: 'stdout="sum=15"', note: 'Done' },
    ],
    harryBugTraps: [
      { title: 'Concatenating String Inside Loop (s += x)', brokenCode: 'String out = "";\nfor (int i = 0; i < 100000; i++) out += i + "\\n";', fixedCode: 'StringBuilder sb = new StringBuilder();\nfor (int i = 0; i < 100000; i++) sb.append(i).append("\\n");', whyItBreaks: 'String is immutable in Java; repeating += copies all prior characters each iteration -> O(n^2) TLE!' },
      { title: 'Floating Point Equality Check in Loop Condition', brokenCode: 'for (double d = 0.0; d != 1.0; d += 0.1)', fixedCode: 'for (int i = 0; i < 10; i++)', whyItBreaks: '0.1 is non-terminating in binary, so d never equals 1.0 and loops infinitely!' },
      { title: 'Semicolon Ending while/for Loop Header', brokenCode: 'while (x > 0); { x--; }', fixedCode: 'while (x > 0) { x--; }', whyItBreaks: 'Stray semicolon creates an empty infinite body before { x--; } is ever reached.' },
    ],
    practiceSheet: [
      { id: 'java-ch-7-q1', difficulty: 'Easy', title: '1. Factorial via Loop', prompt: 'Read n (0..20) and print n! as a 64-bit long.', banglaHint: 'long f = 1; দিয়ে 2..n পর্যন্ত গুণ করো।', starterCode: `import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        int n = new Scanner(System.in).nextInt();\n        long f = 1; for (int i = 2; i <= n; i++) f *= i;\n        System.out.println(f);\n    }\n}`, sampleStdin: '5', expectedOutput: '120' },
      { id: 'java-ch-7-q2', difficulty: 'Easy', title: '2. Reverse Digits Using do-while', prompt: 'Read non-negative long n and output reversed integer.', banglaHint: 'rev = rev * 10 + (n % 10); ও n /= 10; ব্যবহার করো।', starterCode: `import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        long n = new Scanner(System.in).nextLong(), rev = 0;\n        do { rev = rev * 10 + (n % 10); n /= 10; } while (n > 0);\n        System.out.println(rev);\n    }\n}`, sampleStdin: '1234', expectedOutput: '4321' },
      { id: 'java-ch-7-q3', difficulty: 'Medium', title: '3. Sum of Digits', prompt: 'Read non-negative long n and output sum of its digits.', banglaHint: 'while (n > 0) লুপে n % 10 যোগ করো।', starterCode: `import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        long n = new Scanner(System.in).nextLong(), s = 0;\n        while (n > 0) { s += n % 10; n /= 10; }\n        System.out.println(s);\n    }\n}`, sampleStdin: '9085', expectedOutput: '22' },
      { id: 'java-ch-7-q4', difficulty: 'Medium', title: '4. Filtered Maximum Among Evens', prompt: 'Read n and n longs; print largest even number or -1 if none.', banglaHint: 'বেজোড় সংখ্যা continue দিয়ে বাদ দাও।', starterCode: `import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt(); long mx = -1; boolean found = false;\n        for (int i = 0; i < n; i++) {\n            long x = sc.nextLong();\n            if (x % 2 != 0) continue;\n            if (!found || x > mx) { mx = x; found = true; }\n        }\n        System.out.println(found ? mx : -1);\n    }\n}`, sampleStdin: '5\n3 10 7 4 9', expectedOutput: '10' },
      { id: 'java-ch-7-q5', difficulty: 'Hard', title: '5. O(sqrt(n)) Prime Checker', prompt: 'Read long n and output PRIME or COMPOSITE.', banglaHint: 'd <= n / d লুপ ও break ব্যবহার করো।', starterCode: `import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        long n = new Scanner(System.in).nextLong();\n        boolean ok = n >= 2;\n        for (long d = 2; d <= n / d; d++) if (n % d == 0) { ok = false; break; }\n        System.out.println(ok ? "PRIME" : "COMPOSITE");\n    }\n}`, sampleStdin: '97', expectedOutput: 'PRIME' },
    ],
    miniBuild: {
      title: 'Java 21 Digit Counter & Loop Invariant Engine',
      description: 'Counts digits reliably for any long input including 0 via exit-controlled do-while.',
      banglaGoal: 'do-while লুপ দিয়ে নির্ভুল অঙ্ক-গণক তৈরি।',
      combinesChapters: 'Ch 1–7',
      starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLong()) {
            long x = Math.abs(sc.nextLong());
            int digits = 0;
            do { digits++; x /= 10; } while (x > 0);
            System.out.println("digits=" + digits);
        }
    }
}`,
      sampleStdin: '7042',
      expectedOutput: 'digits=4',
    },
    starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLong()) {
            long x = Math.abs(sc.nextLong());
            int digits = 0;
            do { digits++; x /= 10; } while (x > 0);
            System.out.println("digits=" + digits);
        }
    }
}`,
    sampleStdin: '7042',
    expectedSampleOutput: 'digits=4',
    testCases: [
      { id: 'java7-t1', input: '7042', expectedOutput: 'digits=4' },
      { id: 'java7-t2', input: '0', expectedOutput: 'digits=1', isHidden: true },
    ],
  },
  8: {
    chapterNumber: 8,
    title: 'Java Chapter 8 (Java 21): Nested Loops & Matrix Pattern Mastery',
    banglaTitle: 'Java অধ্যায় ৮ (Java 21): নেস্টেড লুপ ও প্যাটার্ন প্রিন্টিং মাস্টারি',
    subtitle: 'Outer-row / inner-column symmetry, StringBuilder buffering, and avoiding O(N^2) string allocation.',
    zeroIntuition: {
      plainEnglishStory:
        'A nested loop treats the screen as a 2D coordinate grid: the outer `for` loop selects row `i`, while the inner `for` loop steps across columns `j` along that row.\n\nIn Java, printing patterns safely requires one extra engineering habit: calling `System.out.print()` or string concatenation `s += "*"` inside tight nested loops creates massive overhead and allocates `O(N^2)` garbage objects. Buffering characters in a `StringBuilder` and printing once cuts runtime dramatically.',
      asciiFlowchart: `Outer loop i = 1 .. N (Rows)
   |
   +--> Inner loop 1: leading spaces (N - i)
   +--> Inner loop 2: stars / digits (2*i - 1)
   +--> Append '\\n' to StringBuilder`,
      pseudocode: [
        '1. ALLOCATE a StringBuilder sb to buffer rows cleanly',
        '2. LOOP outer row index i from 1 to N',
        '3. APPEND spaces or stars using inner loop columns j',
        '4. APPEND "\\n" after inner loops finish row i',
        '5. CALL System.out.print(sb) once at the end',
      ],
      banglaZeroToHero: {
        analogyTitle: 'দালানের তলা-কামরা ও StringBuilder খাতা',
        explanation:
          'একটি বহুতল ভবনের প্রতিটি তলায় কীভাবে লাইট জ্বালানো হয় তা কল্পনা করো: বাইরের লুপ ঠিক করে তুমি কত নম্বর তলায় (`i`) আছো, আর ভেতরের লুপ ওই তলার প্রতিটি কামরায় (`j`) ঘুরে ঘুরে কাজ শেষ করে। Java-তে স্টার বা সংখ্যার প্যাটার্ন প্রিন্ট করার সময় `i` ও `j`-এর মধ্যে গাণিতিক সম্পর্ক (`j <= i` বা `j <= 2*i - 1`) বের করতে পারলেই যেকোনো পিরামিড, হীরক বা ত্রিভুজ বানানো খুব সহজ হয়ে যায়। তবে Java-তে একটি গুরুত্বপূর্ণ পারফরম্যান্স গোপন সূত্র আছে—প্রতিটি স্টারের জন্য `System.out.print("*")` কল করলে কনসোল অনেক ধীর হয়ে যায়, আবার `String s += "*"` করলে প্রতিবার মেমোরিতে নতুন অবজেক্ট তৈরি হয়! তার বদলে একটি `StringBuilder` নিয়ে ভেতরের লুপে সব অক্ষর জমা করে শেষে একসাথে `System.out.print(sb)` চালানোই প্রফেশনাল পদ্ধতি। একইভাবে টু-ডাইমেনশনাল গ্রিড বা মাল্টিপ্লিকেশন টেবিল বানাতেও নেস্টেড লুপ অপরিহার্য। তবে সাবধান: প্যারামিটার `N` বড় হলে নেস্টেড লুপের মোট ধাপ `N^2` হয়ে যায়, তাই বড় কনটেস্টে অকারণে নেস্টেড লুপ চালাবে না। ব্রেক বা লেবেলড ব্রেক (`break outer;`) ব্যবহার করলে ভেতরের লুপ থেকে সরাসরি বাইরের লুপও থামানো যায়। প্রতিটি প্যাটার্ন কোড করার আগে কাগজে সারি `i` ধরে স্পেস ও তারার সংখ্যা লিখে নিলে আর ভুল হবে না।',
        everydayExample:
          'সিনেমা হলের সিট নম্বর: সারি A-এর ১ থেকে ৮ নম্বর সিট শেষ করে তবেই কর্মচারী সারি B-তে যান।',
        keyTakeaways: [
          'বাইরের লুপ সারি (`i`) এবং ভেতরের লুপ কলাম (`j`) নিয়ন্ত্রণ করে।',
          '`String +=` না করে অবশ্যই `StringBuilder` ব্যবহার করবে।',
          'ভেতরের লুপের শর্তে `i`-এর সাথে সম্পর্ক বসালেই ত্রিভুজ ও পিরামিড তৈরি হয়।',
        ],
      },
    },
    topics: [
      {
        id: 'java-ch-8-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Right Triangle Star Pattern via StringBuilder',
        englishParagraphs: [
          'For row `i` from `1..N`, appending `i` asterisks produces a clean lower-left triangle.',
          'Collecting all characters into one `StringBuilder` avoids repeated `System.out.print` flushes.',
        ],
        banglaParagraphs: [
          '`i`-তম সারিতে ঠিক `i` সংখ্যক তারা যোগ করলে সুন্দর ডান-কোণী ত্রিভুজ তৈরি হয়।',
          '`StringBuilder`-এ জমা করে শেষে একবার প্রিন্ট করলে কোড অনেক দ্রুত চলে।',
        ],
        memoryDiagram: `i=1 -> * | i=2 -> ** | i=3 -> ***`,
        code: `public class Main {
    public static void main(String[] args) {
        int n = 4;
        StringBuilder sb = new StringBuilder();
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= i; j++) sb.append('*');
            sb.append('\\n');
        }
        System.out.print(sb);
    }
}`,
        stdin: '',
        expectedOutput: '*\n**\n***\n****',
        lineByLine: [
          { lineNumber: 'Line 4', codeSnippet: 'StringBuilder sb = new StringBuilder();', whatItMeans: 'Creates mutable character buffer.', whyItIsThere: 'Prevents quadratic String allocation.', ifDeletedError: 'Compile error: sb cannot be resolved.' },
          { lineNumber: 'Line 6', codeSnippet: 'for (int j = 1; j <= i; j++) sb.append(\'*\');', whatItMeans: 'Appends i stars on row i.', whyItIsThere: 'Links column count to current row index.', ifDeletedError: 'Prints blank lines.' },
        ],
      },
      {
        id: 'java-ch-8-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Centered Pyramid Driven by Scanner Input',
        englishParagraphs: [
          'Each row `i` prints `n - i` spaces followed by `2*i - 1` stars so the apex centers neatly.',
          'Separating spaces and stars into consecutive inner loops keeps indexing intuitive.',
        ],
        banglaParagraphs: [
          'পিরামিডের প্রতিটি সারি `i`-তে প্রথমে `n - i`টি ফাঁকা ঘর ও পরে `2*i - 1`টি তারা প্রিন্ট করা হয়।',
          'দুটি আলাদা ভেতরের লুপ রাখলে স্পেস ও তারার হিসাব গুলিয়ে যায় না।',
        ],
        memoryDiagram: `n=3: i=1 (2sp, 1*), i=2 (1sp, 3*), i=3 (0sp, 5*)`,
        code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextInt()) {
            int n = sc.nextInt();
            StringBuilder sb = new StringBuilder();
            for (int i = 1; i <= n; i++) {
                for (int s = 1; s <= n - i; s++) sb.append(' ');
                for (int k = 1; k <= 2 * i - 1; k++) sb.append('*');
                sb.append('\\n');
            }
            System.out.print(sb);
        }
    }
}`,
        stdin: '3',
        expectedOutput: '  *\n ***\n*****',
        lineByLine: [
          { lineNumber: 'Line 10', codeSnippet: 'for (int s = 1; s <= n - i; s++) sb.append(\' \');', whatItMeans: 'Pads leading alignment spaces.', whyItIsThere: 'Centers odd star counts on row i.', ifDeletedError: 'Pyramid skews flush left.' },
        ],
      },
      {
        id: 'java-ch-8-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: '2D Pair Match Counter & Labeled Break',
        englishParagraphs: [
          'Nested loops commonly scan matrix coordinates `(r, c)` or find pairs `(i, j)` meeting a condition.',
          'Java supports labeled `break outer;` to exit nested loops immediately once a target is located.',
        ],
        banglaParagraphs: [
          'যুগল `(i, j)` খোঁজা বা ২ডি গ্রিড প্রসেস করতেও নেস্টেড লুপ ব্যবহৃত হয়।',
          'Java-র `break outer;` দিয়ে নির্দিষ্ট শর্ত পূরণ হলে ভেতরের ও বাইরের উভয় লুপ থেকেই বেরোনো যায়।',
        ],
        memoryDiagram: `i=1..3, j=1..3 where (i+j)==5 -> (2,3) & (3,2) => 2 pairs`,
        code: `public class Main {
    public static void main(String[] args) {
        int n = 3, target = 5, count = 0;
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= n; j++) {
                if (i + j == target) count++;
            }
        }
        System.out.println(count);
    }
}`,
        stdin: '',
        expectedOutput: '2',
        lineByLine: [
          { lineNumber: 'Line 6', codeSnippet: 'if (i + j == target) count++;', whatItMeans: 'Counts ordered pairs summing to target.', whyItIsThere: 'Demonstrates 2D coordinate filtering.', ifDeletedError: 'Prints 0.' },
        ],
      },
      {
        id: 'java-ch-8-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'O(N^2) String Concatenation Trap vs StringBuilder',
        englishParagraphs: [
          'Using `out += "*";` inside nested loops allocates a brand-new `String` array copy on every append, turning `10^4` appends into `10^8` character copies.',
          '`StringBuilder.append()` amortizes to `O(1)` per character.',
        ],
        banglaParagraphs: [
          'লুপের ভেতর `s += "*"` লিখলে প্রতি ধাপে পুরো স্ট্রিং কপি হয়ে কোড স্লো করে দেয়।',
          '`StringBuilder` ব্যবহার করলে প্রতিটি অক্ষর `O(1)` খরচে বাফারে যোগ হয়।',
        ],
        memoryDiagram: `String +=: O(N^2) heap copies | StringBuilder: O(N) amortized buffer`,
        code: `public class Main {
    public static void main(String[] args) {
        StringBuilder sb = new StringBuilder();
        for (int i = 1; i <= 3; i++) {
            for (int j = 1; j <= i; j++) sb.append(j);
            sb.append('\\n');
        }
        System.out.print(sb);
    }
}`,
        stdin: '',
        expectedOutput: '1\n12\n123',
        lineByLine: [
          { lineNumber: 'Line 5', codeSnippet: 'for (int j = 1; j <= i; j++) sb.append(j);', whatItMeans: 'Appends row digits cleanly to StringBuilder.', whyItIsThere: 'Fast O(1) amortized append.', ifDeletedError: 'Nothing printed inside rows.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 3', codeSnippet: 'int n = 4;', whatItMeans: 'Sets total row count N.', whyItIsThere: 'Bounds outer loop height.', ifDeletedError: 'Compile error: n undefined.' },
      { lineNumber: 'Line 4', codeSnippet: 'StringBuilder sb = new StringBuilder();', whatItMeans: 'Initializes mutable text buffer.', whyItIsThere: 'Prevents repeated stdout syscall and String garbage.', ifDeletedError: 'Compile error on sb.append.' },
      { lineNumber: 'Line 5', codeSnippet: 'for (int i = 1; i <= n; i++) {', whatItMeans: 'Outer loop traversing rows 1..N.', whyItIsThere: 'Controls pattern height.', ifDeletedError: 'Only single row prints.' },
      { lineNumber: 'Line 6', codeSnippet: 'for (int j = 1; j <= i; j++) sb.append(\'*\');', whatItMeans: 'Inner loop printing i stars.', whyItIsThere: 'Generates triangular width per row.', ifDeletedError: 'Blank lines emitted.' },
    ],
    dryRunTable: [
      { step: 1, state: 'i = 1', memoryOrStack: 'j=1..1 -> sb="*"', note: 'Row 1 gets 1 star + newline' },
      { step: 2, state: 'i = 2', memoryOrStack: 'j=1..2 -> sb="**"', note: 'Row 2 gets 2 stars + newline' },
      { step: 3, state: 'i = 3', memoryOrStack: 'j=1..3 -> sb="***"', note: 'Row 3 gets 3 stars + newline' },
      { step: 4, state: 'i = 4', memoryOrStack: 'j=1..4 -> sb="****"', note: 'Prints full 4-row triangle' },
    ],
    harryBugTraps: [
      { title: 'Trap 1: String += Inside Nested Loops', brokenCode: `String s = "";\nfor (int i = 0; i < 50000; i++) s += "a";`, fixedCode: `StringBuilder sb = new StringBuilder();\nfor (int i = 0; i < 50000; i++) sb.append('a');`, whyItBreaks: 'String is immutable in Java; repeated += causes O(N^2) copying and TLE.' },
      { title: 'Trap 2: Reusing Outer Variable Name in Inner Loop', brokenCode: `for (int i = 0; i < n; i++) for (int i = 0; i < n; i++) {}`, fixedCode: `for (int i = 0; i < n; i++) for (int j = 0; j < n; j++) {}`, whyItBreaks: 'Java rejects shadowing local variable i inside the same method scope (CE).' },
      { title: 'Trap 3: Missing Newline Between Rows', brokenCode: `for(int j=1;j<=i;j++) System.out.print('*');`, fixedCode: `for(int j=1;j<=i;j++) sb.append('*'); sb.append('\\n');`, whyItBreaks: 'All rows merge onto one continuous horizontal line.' },
    ],
    practiceSheet: [
      { id: 'java-ch8-p1', difficulty: 'Easy', title: 'Hollow/Solid N×N Star Box', prompt: 'Given N, print an N×N square of `*`.', banglaHint: 'দুটি `1..n` নেস্টেড লুপ ও `StringBuilder` ব্যবহার করো।', starterCode: `import java.util.Scanner;\npublic class Main { public static void main(String[] args){ Scanner sc=new Scanner(System.in); int n=sc.nextInt(); StringBuilder sb=new StringBuilder(); for(int i=0;i<n;i++){ for(int j=0;j<n;j++) sb.append('*'); sb.append('\\n'); } System.out.print(sb); } }`, sampleStdin: '3', expectedOutput: '***\n***\n***' },
      { id: 'java-ch8-p2', difficulty: 'Easy', title: 'Inverted Star Triangle', prompt: 'Given N, print N down to 1 stars per row.', banglaHint: 'ভেতরের লুপ `n - i + 1` পর্যন্ত চালাও।', starterCode: `import java.util.Scanner;\npublic class Main { public static void main(String[] args){ Scanner sc=new Scanner(System.in); int n=sc.nextInt(); StringBuilder sb=new StringBuilder(); for(int i=1;i<=n;i++){ for(int j=1;j<=n-i+1;j++) sb.append('*'); sb.append('\\n'); } System.out.print(sb); } }`, sampleStdin: '3', expectedOutput: '***\n**\n*' },
      { id: 'java-ch8-p3', difficulty: 'Medium', title: '1-to-i Number Triangle', prompt: 'Print row `i` containing `1..i`.', banglaHint: 'ভেতরের লুপে `sb.append(j)` দাও।', starterCode: `import java.util.Scanner;\npublic class Main { public static void main(String[] args){ Scanner sc=new Scanner(System.in); int n=sc.nextInt(); StringBuilder sb=new StringBuilder(); for(int i=1;i<=n;i++){ for(int j=1;j<=i;j++) sb.append(j); sb.append('\\n'); } System.out.print(sb); } }`, sampleStdin: '3', expectedOutput: '1\n12\n123' },
      { id: 'java-ch8-p4', difficulty: 'Medium', title: 'Floyd Sequential Counter Triangle', prompt: 'Print sequential numbers 1, 2 3, 4 5 6 across N rows.', banglaHint: 'লুপের বাইরে একটি `num = 1` কাউন্টার রাখো।', starterCode: `import java.util.Scanner;\npublic class Main { public static void main(String[] args){ Scanner sc=new Scanner(System.in); int n=sc.nextInt(), k=1; StringBuilder sb=new StringBuilder(); for(int i=1;i<=n;i++){ for(int j=1;j<=i;j++){ if(j>1) sb.append(' '); sb.append(k++); } sb.append('\\n'); } System.out.print(sb); } }`, sampleStdin: '3', expectedOutput: '1\n2 3\n4 5 6' },
      { id: 'java-ch8-p5', difficulty: 'Hard', title: 'Checkerboard Parity Grid', prompt: 'Print N×N grid alternating `1` and `0` using `(i + j) % 2`.', banglaHint: '`(i + j) % 2 == 0` হলে `1`, নতুবা `0` বসাও।', starterCode: `import java.util.Scanner;\npublic class Main { public static void main(String[] args){ Scanner sc=new Scanner(System.in); int n=sc.nextInt(); StringBuilder sb=new StringBuilder(); for(int i=0;i<n;i++){ for(int j=0;j<n;j++) sb.append((i+j)%2==0?'1':'0'); sb.append('\\n'); } System.out.print(sb); } }`, sampleStdin: '3', expectedOutput: '101\n010\n101' },
    ],
    miniBuild: {
      title: 'Mini-Build: Fast StringBuilder Pyramid Generator',
      description: 'Read height N and render a centered star pyramid in one buffered StringBuilder print.',
      banglaGoal: 'স্পেস ও স্টার প্যাটার্ন মিলিয়ে একটি নিখুঁত পিরামিড তৈরি করো।',
      combinesChapters: 'Java Ch 1–8',
      starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextInt()) {
            int n = sc.nextInt();
            StringBuilder sb = new StringBuilder();
            for (int i = 1; i <= n; i++) {
                for (int s = 1; s <= n - i; s++) sb.append(' ');
                for (int k = 1; k <= 2 * i - 1; k++) sb.append('*');
                sb.append('\\n');
            }
            System.out.print(sb);
        }
    }
}`,
      sampleStdin: '3',
      expectedOutput: '  *\n ***\n*****',
    },
    starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextInt()) {
            int n = sc.nextInt();
            StringBuilder sb = new StringBuilder();
            for (int i = 1; i <= n; i++) {
                for (int s = 1; s <= n - i; s++) sb.append(' ');
                for (int k = 1; k <= 2 * i - 1; k++) sb.append('*');
                sb.append('\\n');
            }
            System.out.print(sb);
        }
    }
}`,
    sampleStdin: '3',
    expectedSampleOutput: '  *\n ***\n*****',
    testCases: [
      { id: 'java8-t1', input: '3', expectedOutput: '  *\n ***\n*****' },
      { id: 'java8-t2', input: '2', expectedOutput: ' *\n***', isHidden: true },
    ],
  },
  9: {
    chapterNumber: 9,
    title: 'Java Chapter 9 (Java 21): Methods, Overloading & Stack Frame Scope',
    banglaTitle: 'Java অধ্যায় ৯ (Java 21): মেথড, ওভারলোডিং ও স্ট্যাক স্কোপ',
    subtitle: 'Static helper methods, JVM call stack frames, pass-by-value semantics, and method overloading.',
    zeroIntuition: {
      plainEnglishStory:
        'A Java method encapsulates one focused job—such as computing `gcd(a, b)` or checking `isPrime(n)`—with explicit parameter types and a strict return contract. When `main` calls a method, the JVM pushes a brand-new Stack Frame holding that method’s local variables; once `return` runs, that frame disappears automatically.\n\nUnlike C++, Java has NO pointers or `&` pass-by-reference for primitives: calling `swap(int a, int b)` only swaps local copies inside the callee’s frame! However, Java excels at **method overloading**—giving multiple methods the same name as long as their parameter signatures differ cleanly.',
      asciiFlowchart: `main() frame: [ x=24, y=36 ] --calls--> gcd(24, 36)
   |
   +--> new JVM Stack Frame [ a=24, b=36 ] -> [ a=36, b=24 ] -> ... -> return 12
   v
main() resumes with 12 (local x, y untouched!)`,
      pseudocode: [
        '1. DEFINE static helper methods inside class Main with explicit return types',
        '2. PASS primitives by value cleanly and return computed values',
        '3. KEEP variables scoped strictly to the smallest needed method/block',
        '4. OVERLOAD helpers with different parameter counts/types when useful',
      ],
      banglaZeroToHero: {
        analogyTitle: 'রন্ধনশালার আলাদা স্টেশন ও JVM স্ট্যাক ফ্রেম',
        explanation:
          'বড় রেস্তোরাঁয় যেমন একজন প্রধান শেফ সব কাজ একা না করে স্যুপ স্টেশন, গ্রিল স্টেশন ও ডেজার্ট স্টেশনে দায়িত্ব ভাগ করে দেন, Java-তে তেমনি প্রোগ্রামকে ছোট ছোট **Method**-এ ভাগ করা হয়। প্রতিটি `static` মেথডের একটি নির্দিষ্ট ইনপুট তালিকা ও রিটার্ন টাইপ থাকে (অথবা কিছু রিটার্ন না করলে `void`)। যখন `main` থেকে কোনো মেথড কল হয়, তখন JVM-এর **Call Stack**-এ ওই মেথডের জন্য একদম আলাদা একটি **Stack Frame** বা টেবিল তৈরি হয়। মেথডের কাজ শেষ করে `return` করলে সাথে সাথে ওই টেবিলের ভেতরের সব লোকাল ভ্যারিয়েবল মুছে যায়। Java-তে একটি বিশেষ নিয়ম আছে: `int`, `long` বা `double`-এর মতো প্রিমিটিভ টাইপ মেথডে পাঠালে সবসময় সেটির **কপি (Pass-by-Value)** যায়। তাই `swap(int a, int b)` লিখলে মেইন মেথডের ভ্যারিয়েবল বদলাবে না—নতুন মান ফেরত পেতে `return` ব্যবহার করতে হবে! এছাড়া Java-তে একই নামে একাধিক মেথড লেখা যায় যদি তাদের প্যারামিটার সংখ্যা বা টাইপ আলাদা হয়, একে **Method Overloading** বলে (যেমন `max(int a, int b)` ও `max(double a, double b)`)। মেথডের ভেতর থাকা ভ্যারিয়েবলকে **Local Scope** বলে যা বাইরে থেকে দেখা যায় না। জটিল প্রোগ্রামকে ছোট ছোট রিইউজেবল মেথডে ভাঙলে ডিবাগ করা সহজ হয় ও কোড সুন্দর দেখায়।',
        everydayExample:
          'ফটোকপি করা পরীক্ষার ফরমের মতো: ফটোকপি কপিতে কলম দিয়ে কাটাকুটি করলে (`Pass-by-Value`) আসল মূল ফরমটি (`main`-এর ভ্যারিয়েবল) একদম অক্ষত থাকে।',
        keyTakeaways: [
          'প্রিমিটিভ (`int`, `long`) সবসময় Pass-by-Value হয়—মেথডের ভেতর বদলালে মূল ভ্যারিয়েবল বদলায় না।',
          'একই নামে ভিন্ন প্যারামিটার দিয়ে **Method Overloading** করা যায়।',
          'মেথড রিটার্ন করার সাথে সাথে তার JVM Stack Frame-এর লোকাল ভ্যারিয়েবল ধ্বংস হয়ে যায়।',
        ],
      },
    },
    topics: [
      {
        id: 'java-ch-9-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Clean Static Helper Method With Return Value',
        englishParagraphs: [
          'Calling a `static` helper directly from `public static void main` avoids instantiating an object for pure utility functions.',
          'Type checking guarantees callers pass compatible arguments and receive an `int` or `long` result.',
        ],
        banglaParagraphs: [
          '`main` মেথড `static` হওয়ায় এর ভেতর থেকে অবজেক্ট ছাড়াই সরাসরি কল করতে হেল্পার মেথডগুলোকেও `static` রাখা হয়।',
          'মেথড নির্দিষ্ট রিটার্ন টাইপ ফেরত দেয় যা ডাকার জায়গায় সরাসরি ব্যবহার করা যায়।',
        ],
        memoryDiagram: `main calls square(7) -> frame(x=7) returns 49 -> destroyed`,
        code: `public class Main {
    static long square(long x) {
        return x * x;
    }

    public static void main(String[] args) {
        System.out.println(square(7));
    }
}`,
        stdin: '',
        expectedOutput: '49',
        lineByLine: [
          { lineNumber: 'Line 2', codeSnippet: 'static long square(long x) {', whatItMeans: 'Declares static method accepting and returning 64-bit long.', whyItIsThere: 'Usable directly inside static main.', ifDeletedError: 'main cannot call non-static method without an instance.' },
          { lineNumber: 'Line 3', codeSnippet: 'return x * x;', whatItMeans: 'Exits stack frame and returns square.', whyItIsThere: 'Sends value back to caller.', ifDeletedError: 'Compile error: missing return statement.' },
        ],
      },
      {
        id: 'java-ch-9-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Euclidean GCD & Overflow-Safe LCM Methods',
        englishParagraphs: [
          'Decomposing `gcd` and `lcm` into separate methods keeps `lcm` clean and readable (`(a / gcd(a, b)) * b`).',
          'Dividing `a` by `gcd` before multiplying by `b` protects against 64-bit overflow.',
        ],
        banglaParagraphs: [
          '`gcd` ও `lcm` দুটি আলাদা মেথডে লিখলে কোড পুনর্ব্যবহারযোগ্য হয় ও পড়তে খুব সুবিধা হয়।',
          'গুণ করার আগে `gcd` দিয়ে ভাগ করলে বড় সংখ্যার ওভারফ্লো এড়ানো যায়।',
        ],
        memoryDiagram: `gcd(24,36)->12 | lcm=(24/12)*36=72`,
        code: `import java.util.Scanner;

public class Main {
    static long gcd(long a, long b) {
        while (b != 0) { long t = a % b; a = b; b = t; }
        return a;
    }

    static long lcm(long a, long b) {
        return (a == 0 || b == 0) ? 0 : (a / gcd(a, b)) * b;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLong()) {
            long a = sc.nextLong(), b = sc.nextLong();
            System.out.println("gcd=" + gcd(a, b) + " lcm=" + lcm(a, b));
        }
    }
}`,
        stdin: '24 36',
        expectedOutput: 'gcd=12 lcm=72',
        lineByLine: [
          { lineNumber: 'Line 10', codeSnippet: 'return (a == 0 || b == 0) ? 0 : (a / gcd(a, b)) * b;', whatItMeans: 'Reuses gcd() safely inside lcm().', whyItIsThere: 'Divides before multiplying to avoid overflow.', ifDeletedError: 'No LCM helper.' },
        ],
      },
      {
        id: 'java-ch-9-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Method Overloading for Flexible Areas',
        englishParagraphs: [
          'Java allows multiple methods named `area` inside the same class as long as parameter types or counts differ.',
          'The compiler resolves which overload to call statically at compile time with zero runtime cost.',
        ],
        banglaParagraphs: [
          'প্যারামিটার সংখ্যা বা ডেটা টাইপ ভিন্ন হলে একই নামে একাধিক `area` মেথড লেখা যায়—একেই Method Overloading বলে।',
          'কম্পাইলার নিজেই ঠিক করে কোন ইনপুটে কোন ভার্সনটি চলবে।',
        ],
        memoryDiagram: `area(5) -> 1 arg int | area(4, 6) -> 2 arg int`,
        code: `public class Main {
    static int area(int side) { return side * side; }
    static int area(int w, int h) { return w * h; }

    public static void main(String[] args) {
        System.out.println(area(5) + " " + area(4, 6));
    }
}`,
        stdin: '',
        expectedOutput: '25 24',
        lineByLine: [
          { lineNumber: 'Line 2', codeSnippet: 'static int area(int side) { return side * side; }', whatItMeans: '1-argument square area overload.', whyItIsThere: 'Matches single int calls.', ifDeletedError: 'area(5) fails to compile.' },
          { lineNumber: 'Line 3', codeSnippet: 'static int area(int w, int h) { return w * h; }', whatItMeans: '2-argument rectangle overload.', whyItIsThere: 'Reuses semantic name area cleanly.', ifDeletedError: 'area(4, 6) fails to compile.' },
        ],
      },
      {
        id: 'java-ch-9-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Pass-by-Value Swap Trap vs Array/Return Fix',
        englishParagraphs: [
          'Beginners often write `void fakeSwap(int a, int b)` expecting variables in `main` to swap—but Java only swaps copies on `fakeSwap`’s stack frame.',
          'Mutating elements inside an array reference or returning a value reflects changes back in `main`.',
        ],
        banglaParagraphs: [
          'প্রিমিটিভ `a, b` মেথডে পাঠিয়ে বদলালে মেইনের আসল মান বদলায় না, কারণ কপি গিয়েছিল।',
          'পরিবর্তন রাখতে চাইলে নতুন মান রিটার্ন করতে হয় বা অ্যারের ইনডেক্স আপডেট করতে হয়।',
        ],
        memoryDiagram: `fakeSwap(x,y) swaps frame copies ONLY | arr[0],arr[1] modifies shared heap array`,
        code: `public class Main {
    static void fakeSwap(int a, int b) { int t = a; a = b; b = t; }
    static void realSwap(int[] arr) { int t = arr[0]; arr[0] = arr[1]; arr[1] = t; }

    public static void main(String[] args) {
        int x = 10, y = 20;
        fakeSwap(x, y);
        int[] pair = {x, y};
        realSwap(pair);
        System.out.println(x + "," + y + " -> " + pair[0] + "," + pair[1]);
    }
}`,
        stdin: '',
        expectedOutput: '10,20 -> 20,10',
        lineByLine: [
          { lineNumber: 'Line 2', codeSnippet: 'static void fakeSwap(int a, int b) { int t = a; a = b; b = t; }', whatItMeans: 'Modifies only local copies in callee frame.', whyItIsThere: 'Demonstrates Java primitive pass-by-value.', ifDeletedError: 'No warning contrast.' },
          { lineNumber: 'Line 3', codeSnippet: 'static void realSwap(int[] arr) { ... }', whatItMeans: 'Passes object reference by value, letting helper mutate array slots.', whyItIsThere: 'Persists swap back in main.', ifDeletedError: 'pair stays 10,20.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 2', codeSnippet: 'static long square(long x) {', whatItMeans: 'Method signature specifying static linkage, long return, long param.', whyItIsThere: 'Allows direct call from static main.', ifDeletedError: 'Non-static error in main.' },
      { lineNumber: 'Line 3', codeSnippet: 'return x * x;', whatItMeans: 'Produces final value and pops frame.', whyItIsThere: 'Required for non-void methods.', ifDeletedError: 'Compile error: missing return statement.' },
      { lineNumber: 'Line 7', codeSnippet: 'System.out.println(square(7));', whatItMeans: 'Evaluates square(7) and prints returned 49.', whyItIsThere: 'Invokes helper method cleanly.', ifDeletedError: 'Nothing printed.' },
    ],
    dryRunTable: [
      { step: 1, state: 'main calls square(7)', memoryOrStack: 'push frame: x = 7', note: 'Allocate local x on JVM stack' },
      { step: 2, state: 'compute x * x', memoryOrStack: '7 * 7 = 49', note: 'Evaluate return expression' },
      { step: 3, state: 'return 49', memoryOrStack: 'pop square frame', note: 'Destroy x, hand 49 to println' },
      { step: 4, state: 'print 49', memoryOrStack: 'main frame exits', note: 'Clean termination' },
    ],
    harryBugTraps: [
      { title: 'Trap 1: Calling Non-Static Method Directly From static main', brokenCode: `int add(int a, int b) { return a + b; }\npublic static void main(String[] args) { add(2, 3); }`, fixedCode: `static int add(int a, int b) { return a + b; }\npublic static void main(String[] args) { add(2, 3); }`, whyItBreaks: 'Static main has no `this` object instance to call instance methods.' },
      { title: 'Trap 2: Forgetting Return on One Branch', brokenCode: `static int sign(int x) { if (x > 0) return 1; else if (x < 0) return -1; }`, fixedCode: `static int sign(int x) { if (x > 0) return 1; if (x < 0) return -1; return 0; }`, whyItBreaks: 'javac guarantees every execution path in a non-void method returns a value (CE).' },
      { title: 'Trap 3: Expecting Primitive Parameters to Mutate Caller Variables', brokenCode: `static void inc(int n) { n++; }`, fixedCode: `static int inc(int n) { return n + 1; }`, whyItBreaks: 'Java passes primitives by value; caller variable stays unchanged.' },
    ],
    practiceSheet: [
      { id: 'java-ch9-p1', difficulty: 'Easy', title: 'Max of Three Method', prompt: 'Write `static int max3(int a, int b, int c)` returning the largest integer.', banglaHint: '`Math.max(a, Math.max(b, c))` রিটার্ন করো।', starterCode: `import java.util.Scanner;\npublic class Main { static int max3(int a,int b,int c){ return Math.max(a,Math.max(b,c)); } public static void main(String[] args){ Scanner sc=new Scanner(System.in); System.out.println(max3(sc.nextInt(),sc.nextInt(),sc.nextInt())); } }`, sampleStdin: '4 19 7', expectedOutput: '19' },
      { id: 'java-ch9-p2', difficulty: 'Easy', title: 'Boolean Even Checker', prompt: 'Write `static boolean isEven(long n)` returning true if even.', banglaHint: '`return n % 2 == 0;` লিখলেই হবে।', starterCode: `import java.util.Scanner;\npublic class Main { static boolean isEven(long n){ return n%2==0; } public static void main(String[] args){ Scanner sc=new Scanner(System.in); System.out.println(isEven(sc.nextLong())); } }`, sampleStdin: '42', expectedOutput: 'true' },
      { id: 'java-ch9-p3', difficulty: 'Medium', title: 'Method Overloading Sum', prompt: 'Overload `sum(int,int)` and `sum(int,int,int)`.', banglaHint: '২ ও ৩ প্যারামিটার নিয়ে দুটি `static int sum` লেখো।', starterCode: `public class Main { static int sum(int a,int b){return a+b;} static int sum(int a,int b,int c){return a+b+c;} public static void main(String[] args){ System.out.println(sum(2,3)+" "+sum(1,2,3)); } }`, sampleStdin: '', expectedOutput: '5 6' },
      { id: 'java-ch9-p4', difficulty: 'Medium', title: 'GCD & LCM Pair', prompt: 'Write `static long gcd(long a, long b)` and `static long lcm(long a, long b)`.', banglaHint: 'আগে `gcd` ভাগ করে পরে গুণ করো।', starterCode: `import java.util.Scanner;\npublic class Main { static long gcd(long a,long b){while(b!=0){long t=a%b;a=b;b=t;}return a;} static long lcm(long a,long b){return (a/gcd(a,b))*b;} public static void main(String[] args){ Scanner sc=new Scanner(System.in); long a=sc.nextLong(),b=sc.nextLong(); System.out.println(gcd(a,b)+" "+lcm(a,b)); } }`, sampleStdin: '12 18', expectedOutput: '6 36' },
      { id: 'java-ch9-p5', difficulty: 'Hard', title: 'Fast Modular Power Helper', prompt: 'Write `static long modPow(long a, long b, long m)` returning `(a^b) % m`.', banglaHint: '`while (b > 0)` লুপে `b & 1` চেক করে গুণ করো।', starterCode: `import java.util.Scanner;\npublic class Main { static long modPow(long a,long b,long m){long r=1;a%=m;while(b>0){if((b&1)==1)r=r*a%m;a=a*a%m;b>>=1;}return r;} public static void main(String[] args){ Scanner sc=new Scanner(System.in); System.out.println(modPow(sc.nextLong(),sc.nextLong(),1000000007)); } }`, sampleStdin: '2 10', expectedOutput: '1024' },
    ],
    miniBuild: {
      title: 'Mini-Build: Modular GCD & LCM Utility',
      description: 'Read two 64-bit integers and compute GCD and overflow-safe LCM using modular static helpers.',
      banglaGoal: 'স্ট্যাটিক মেথড দিয়ে পরিষ্কারভাবে GCD ও LCM ক্যালকুলেটর বানাও।',
      combinesChapters: 'Java Ch 1–9',
      starterCode: `import java.util.Scanner;

public class Main {
    static long gcd(long a, long b) {
        while (b != 0) { long t = a % b; a = b; b = t; }
        return a;
    }

    static long lcm(long a, long b) {
        return (a == 0 || b == 0) ? 0 : (a / gcd(a, b)) * b;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLong()) {
            long a = sc.nextLong(), b = sc.nextLong();
            System.out.println("gcd=" + gcd(a, b) + " lcm=" + lcm(a, b));
        }
    }
}`,
      sampleStdin: '24 36',
      expectedOutput: 'gcd=12 lcm=72',
    },
    starterCode: `import java.util.Scanner;

public class Main {
    static long gcd(long a, long b) {
        while (b != 0) { long t = a % b; a = b; b = t; }
        return a;
    }

    static long lcm(long a, long b) {
        return (a == 0 || b == 0) ? 0 : (a / gcd(a, b)) * b;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLong()) {
            long a = sc.nextLong(), b = sc.nextLong();
            System.out.println("gcd=" + gcd(a, b) + " lcm=" + lcm(a, b));
        }
    }
}`,
    sampleStdin: '24 36',
    expectedSampleOutput: 'gcd=12 lcm=72',
    testCases: [
      { id: 'java9-t1', input: '24 36', expectedOutput: 'gcd=12 lcm=72' },
      { id: 'java9-t2', input: '14 21', expectedOutput: 'gcd=7 lcm=42', isHidden: true },
    ],
  },
  10: {
    chapterNumber: 10,
    isMilestoneMerger: true,
    title: 'Java Chapter 10 (Java 21): Time & Space Complexity (Big-O & 10^8 Rule)',
    banglaTitle: 'Java অধ্যায় ১০ (Java 21): টাইম ও স্পেস কমপ্লেক্সিটি (Big-O ও ১০^৮ রুল)',
    subtitle: 'JIT warmup, O(1) long math, O(sqrt(N)) pruning, and BufferedReader/StringBuilder I/O speed.',
    zeroIntuition: {
      plainEnglishStory:
        'Big-O measures how operation count grows as input `N` scales. Because HotSpot JIT compiles hot loops to native machine code, Java achieves roughly `5×10^7` to `10^8` simple operations per second—plenty for `O(N log N)` on `N = 200,000`, provided you avoid two classic Java bottlenecks: slow `Scanner` / `System.out.println` inside `10^5`-line loops, and `String +=` concatenation.\n\nWhen `N = 100,000`, an `O(N^2)` nested loop performs `10^10` iterations and times out (TLE), whereas `O(1)` 64-bit Gaussian sum `(n % 2 == 0) ? (n / 2) * (n + 1) : n * ((n + 1) / 2)` completes in nanoseconds with zero risk of 32-bit `int` overflow.',
      asciiFlowchart: `N = 100,000 (JVM Judge Limit: 1-2s ≈ 10^8 simple ops)
   |
   +--> O(N^2) nested loop       : 10^10 ops (~100 s) ==> TLE!
   +--> O(N log N) Arrays.sort   : 1.7×10^6  (~0.05 s)==> AC!
   +--> O(1) Gaussian formula    : 3 ops     (<0.001 s)==> Instant AC!`,
      pseudocode: [
        '1. INSPECT constraint N before choosing loop depth',
        '2. REPLACE O(N^2) sums with O(1) 64-bit long formulas',
        '3. PRUNE divisor/prime loops cleanly at d * d <= n -> O(sqrt(N))',
        '4. BUFFER massive outputs with StringBuilder + BufferedReader',
      ],
      banglaZeroToHero: {
        analogyTitle: 'সময়ের বাজেট, JVM ও ১০^৮ নিয়ম',
        explanation:
          'একটি স্টেডিয়ামে ১ লাখ দর্শক সবার সাথে হাত মেলালে (`O(N^2)`) প্রায় এক হাজার কোটি ধাপ লাগে, যা Java-তেও ১০০ সেকেন্ডের বেশি সময় নিয়ে TLE (Time Limit Exceeded) খাবে। কিন্তু সূত্র বসিয়ে `n * (n - 1) / 2` লিখলে মাত্র এক মুহূর্তেই (`O(1)`) সঠিক উত্তর মেলে! Java-এর HotSpot JIT কম্পাইলারের কারণে এটি Python-এর চেয়ে অনেক দ্রুত চলে—প্রায় `10^8` অপারেশন প্রতি সেকেন্ডে। তবে Java-তে দুটি লুকানো TLE ফাঁদ আছে: প্রথমত, ১ লাখ ইনপুট পড়তে `Scanner` ব্যবহার করলে প্রোগ্রাম ইনপুট পড়তেই সময় শেষ করে ফেলে—সেখানে `BufferedReader` ব্যবহার করতে হয়; দ্বিতীয়ত, `System.out.println` বারবার কল না করে `StringBuilder`-এ জমা করে একবারে প্রিন্ট করতে হয়। এছাড়া ১ থেকে `N` যোগ করার মতো প্রশ্নে `int n = 100000` রাখলে `n * (n + 1)` গুণফলে ৩২-বিট `int` ওভারফ্লো হয়ে নেগেটিভ আউটপুট আসে, তাই সবসময় ৬৪-বিট `long` ব্যবহার করবে। আবার কোনো সংখ্যার ভাজক বা মৌলিকতা খুঁজতে `1..N` লুপ না চালিয়ে `d * d <= n` চালালে কাজ `O(sqrt(N))` সময়ে নেমে আসে। কোড লেখার আগে সবসময় প্রশ্নের সর্বোচ্চ `N` দেখেই টাইম ও স্পেস কমপ্লেক্সিটি হিসাব করবে।',
        everydayExample:
          '১ লাখ পৃষ্ঠার ডিকশনারিতে এক পৃষ্ঠা করে খোঁজা `O(N)`, আর বর্ণক্রমিক সূচি দেখে সরাসরি মাঝখানের পাতায় ঝাঁপ দেওয়া `O(log N)`।',
        keyTakeaways: [
          'বড় ইনপুটে অবশ্যই ৬৪-বিট `long` ব্যবহার করবে, নতুবা `n * (n + 1)` ওভারফ্লো হবে।',
          '`10^5` লাইন I/O-তে `Scanner`-এর বদলে `BufferedReader` ও `StringBuilder` ব্যবহার করবে।',
          'ভাজক ও প্রাইম চেক `d * d <= n` (`O(sqrt(N))`) দিয়ে দ্রুত করা যায়।',
        ],
      },
    },
    topics: [
      {
        id: 'java-ch-10-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'O(1) 64-Bit Gaussian Sum vs O(N) Loop',
        englishParagraphs: [
          'Dividing the even factor first (`(n % 2 == 0) ? (n / 2) * (n + 1) : n * ((n + 1) / 2)`) computes the exact sum in `O(1)` time.',
          'Using `long` prevents the 32-bit overflow that ruins `int` when `N >= 65536`.',
        ],
        banglaParagraphs: [
          'জোড় সংখ্যাটি আগে ২ দিয়ে ভাগ করে নিলে `long` রেঞ্জের আরও বড় মান পর্যন্ত ওভারফ্লো ছাড়া `O(1)` সময়ে উত্তর বের করা যায়।',
          '৩২-বিট `int` এখানে ভুল নেগেটিভ উত্তর দিত।',
        ],
        memoryDiagram: `n=100000L -> (100000/2)*100001 = 5000050000L (O(1))`,
        code: `public class Main {
    public static void main(String[] args) {
        long n = 100000L;
        long ans = (n % 2 == 0) ? (n / 2) * (n + 1) : n * ((n + 1) / 2);
        System.out.println(ans);
    }
}`,
        stdin: '',
        expectedOutput: '5000050000',
        lineByLine: [
          { lineNumber: 'Line 3', codeSnippet: 'long n = 100000L;', whatItMeans: '64-bit integer N.', whyItIsThere: 'Prevents 32-bit int overflow above 2.14e9.', ifDeletedError: 'Compile error.' },
          { lineNumber: 'Line 4', codeSnippet: 'long ans = (n % 2 == 0) ? (n / 2) * (n + 1) : n * ((n + 1) / 2);', whatItMeans: 'Constant-time O(1) formula.', whyItIsThere: 'Replaces O(N) loop.', ifDeletedError: 'ans undefined.' },
        ],
      },
      {
        id: 'java-ch-10-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'O(sqrt(N)) Divisor Counter With long Arithmetic',
        englishParagraphs: [
          'Scanning `d` with `for (long d = 1; d * d <= n; d++)` reduces a billion-step check down to 31,622 checks.',
          'Be sure `d` itself is `long`, otherwise `d * d` overflows 32-bit `int` past `d = 46340`!',
        ],
        banglaParagraphs: [
          '`d * d <= n` ব্যবহারে লুপ `sqrt(n)` ধাপেই শেষ হয়।',
          'লক্ষ্য রাখবে `d` ভ্যারিয়েবলটিও যেন `long` হয়, নতুবা `d = 46341`-এর পর `d * d` ওভারফ্লো করে ইনফিনিট লুপ হয়ে যায়!',
        ],
        memoryDiagram: `n=36 -> d=1,2,3,4,6 -> count = 9 divisors in O(sqrt(N))`,
        code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLong()) {
            long n = sc.nextLong(), cnt = 0;
            for (long d = 1; d * d <= n; d++) {
                if (n % d == 0) cnt += (d * d == n) ? 1 : 2;
            }
            System.out.println(cnt);
        }
    }
}`,
        stdin: '36',
        expectedOutput: '9',
        lineByLine: [
          { lineNumber: 'Line 8', codeSnippet: 'for (long d = 1; d * d <= n; d++)', whatItMeans: '64-bit sqrt(n) loop bound.', whyItIsThere: 'Prevents d*d integer overflow.', ifDeletedError: 'Runs O(N) TLE.' },
        ],
      },
      {
        id: 'java-ch-10-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Constraint Tier Classifier',
        englishParagraphs: [
          'Mapping `N` directly to safe Big-O complexity stops TLE before a single line of contest logic is written.',
          'At `N <= 10^4`, `O(N^2)` passes safely; above `2e5`, `O(N)` or `O(1)` is required.',
        ],
        banglaParagraphs: [
          'প্রশ্ন পড়েই `N`-এর সীমা দিয়ে অ্যালগরিদম ক্লাস ঠিক করা জটিল কনটেস্ট জেতার আসল কৌশল।',
          'সহজ ক্লাসিফায়ারটি ৩টি রেঞ্জ দেখায়।',
        ],
        memoryDiagram: `n=200000 -> O(N_LOG_N)`,
        code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLong()) {
            long n = sc.nextLong();
            if (n <= 10000) System.out.println("O(N^2)_OK");
            else if (n <= 200000) System.out.println("O(N_LOG_N)");
            else System.out.println("O(N)_OR_O(1)");
        }
    }
}`,
        stdin: '200000',
        expectedOutput: 'O(N_LOG_N)',
        lineByLine: [
          { lineNumber: 'Line 9', codeSnippet: 'else if (n <= 200000) System.out.println("O(N_LOG_N)");', whatItMeans: 'Classifies standard sorting/tree bound.', whyItIsThere: '2e5 * log2(2e5) ≈ 3.5e6 ops passes well under 1s.', ifDeletedError: 'Wrong complexity tier.' },
        ],
      },
      {
        id: 'java-ch-10-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'O(log B) Binary Exponentiation vs O(B) Loop',
        englishParagraphs: [
          'Multiplying `base` `10^9` times sequentially times out, while squaring `base` and halving `exp` (`exp >>= 1`) resolves `(a^b) % mod` in at most 60 iterations.',
          'Keep `res` and `base` as 64-bit `long` before `% mod` because `(10^9)^2` reaches `10^18` (still safe inside signed `long` max `9.22×10^18`).',
        ],
        banglaParagraphs: [
          '`10^9` ঘাত বের করতে সাধারণ লুপ চালালে TLE নিশ্চিত, কিন্তু বাইনারি এক্সপোনেনশিয়েশন মাত্র ৬০ ধাপে (`O(log b)`) উত্তর দেয়।',
          '`(10^9)^2 = 10^18` হওয়ায় `long` টাইপে এটি নিরাপদ থাকে।',
        ],
        memoryDiagram: `modPow(2, 10, 1e9+7) -> 4 binary steps -> 1024`,
        code: `public class Main {
    static long modPow(long base, long exp, long mod) {
        long res = 1 % mod;
        base %= mod;
        while (exp > 0) {
            if ((exp & 1L) == 1L) res = (res * base) % mod;
            base = (base * base) % mod;
            exp >>= 1;
        }
        return res;
    }

    public static void main(String[] args) {
        System.out.println(modPow(2, 10, 1000000007L));
    }
}`,
        stdin: '',
        expectedOutput: '1024',
        lineByLine: [
          { lineNumber: 'Line 6', codeSnippet: 'if ((exp & 1L) == 1L) res = (res * base) % mod;', whatItMeans: 'Includes current power-of-two factor when bit is set.', whyItIsThere: 'Decomposes exponent in binary.', ifDeletedError: 'Always returns 1.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 3', codeSnippet: 'long n = 100000L;', whatItMeans: '64-bit integer N.', whyItIsThere: 'Prevents 32-bit overflow.', ifDeletedError: 'Compile error.' },
      { lineNumber: 'Line 4', codeSnippet: 'long ans = (n % 2 == 0) ? (n / 2) * (n + 1) : n * ((n + 1) / 2);', whatItMeans: 'O(1) arithmetic series sum.', whyItIsThere: 'Zero loop overhead.', ifDeletedError: 'ans undefined.' },
      { lineNumber: 'Line 5', codeSnippet: 'System.out.println(ans);', whatItMeans: 'Outputs exact 5000050000.', whyItIsThere: 'Prints final answer.', ifDeletedError: 'Silent exit.' },
    ],
    dryRunTable: [
      { step: 1, state: 'n = 100000', memoryOrStack: 'long n=100000', note: 'n % 2 == 0 is true' },
      { step: 2, state: 'n / 2 = 50000', memoryOrStack: 'ALU 64-bit', note: 'Divide even factor first' },
      { step: 3, state: '50000 * 100001', memoryOrStack: 'ans = 5000050000', note: 'No overflow in long' },
      { step: 4, state: 'println(ans)', memoryOrStack: 'O(1) ops', note: 'Finishes immediately' },
    ],
    harryBugTraps: [
      { title: 'Trap 1: 32-bit int Overflow in Gaussian Sum', brokenCode: `int n = 100000; System.out.println(n * (n + 1) / 2);`, fixedCode: `long n = 100000L; System.out.println(n * (n + 1) / 2);`, whyItBreaks: 'n*(n+1) overflows 32-bit signed int above n=46340.' },
      { title: 'Trap 2: Slow Scanner + println for 10^5 Lines', brokenCode: `for(int i=0;i<100000;i++) System.out.println(i);`, fixedCode: `StringBuilder sb=new StringBuilder(); for(int i=0;i<100000;i++) sb.append(i).append('\\n'); System.out.print(sb);`, whyItBreaks: '100k unbuffered syscalls easily waste >1.5s.' },
      { title: 'Trap 3: int Loop Variable in d * d <= n', brokenCode: `for (int d = 1; d * d <= n; d++)`, fixedCode: `for (long d = 1; d * d <= n; d++)`, whyItBreaks: 'When d > 46340, d*d wraps negative as 32-bit int causing an infinite loop!' },
    ],
    practiceSheet: [
      { id: 'java-ch10-p1', difficulty: 'Easy', title: 'O(1) Sum 1..N', prompt: 'Given N up to 10^9, output `1 + ... + N` using `long`.', banglaHint: '৬৪-বিট `long` নিয়ে `(n / 2) * (n + 1)` ব্যবহার করো।', starterCode: `import java.util.Scanner;\npublic class Main { public static void main(String[] args){ Scanner sc=new Scanner(System.in); long n=sc.nextLong(); System.out.println(n%2==0?(n/2)*(n+1):n*((n+1)/2)); } }`, sampleStdin: '10', expectedOutput: '55' },
      { id: 'java-ch10-p2', difficulty: 'Easy', title: 'O(sqrt(N)) Divisors', prompt: 'Count positive divisors of N.', banglaHint: '`for (long d = 1; d * d <= n; d++)` চালাও।', starterCode: `import java.util.Scanner;\npublic class Main { public static void main(String[] args){ Scanner sc=new Scanner(System.in); long n=sc.nextLong(),c=0; for(long d=1;d*d<=n;d++) if(n%d==0) c+=(d*d==n)?1:2; System.out.println(c); } }`, sampleStdin: '12', expectedOutput: '6' },
      { id: 'java-ch10-p3', difficulty: 'Medium', title: 'Modular Power O(log B)', prompt: 'Compute `(A^B) % 1000000007` in O(log B).', banglaHint: '`exp & 1L` এবং `exp >>= 1` ব্যবহার করো।', starterCode: `import java.util.Scanner;\npublic class Main { public static void main(String[] args){ Scanner sc=new Scanner(System.in); long a=sc.nextLong()%1000000007,b=sc.nextLong(),r=1,m=1000000007; while(b>0){if((b&1L)==1L)r=r*a%m;a=a*a%m;b>>=1;} System.out.println(r); } }`, sampleStdin: '3 4', expectedOutput: '81' },
      { id: 'java-ch10-p4', difficulty: 'Medium', title: 'O(1) Range Sum [L, R]', prompt: 'Compute integer sum from L to R in O(1).', banglaHint: '`pref(r) - pref(l - 1)` রিটার্ন করো।', starterCode: `import java.util.Scanner;\npublic class Main { static long s(long n){return n<=0?0:(n%2==0?(n/2)*(n+1):n*((n+1)/2));} public static void main(String[] args){ Scanner sc=new Scanner(System.in); System.out.println(s(sc.nextLong()*-1+sc.nextLong()*-0)); } }`, sampleStdin: '3 7', expectedOutput: '25' },
      { id: 'java-ch10-p5', difficulty: 'Hard', title: 'Fast Prime Check O(sqrt(N))', prompt: 'Print `PRIME` or `COMPOSITE` for N.', banglaHint: '`n >= 2` এবং `d * d <= n` পর্যন্ত ভাগ পরীক্ষা করো।', starterCode: `import java.util.Scanner;\npublic class Main { public static void main(String[] args){ Scanner sc=new Scanner(System.in); long n=sc.nextLong(); boolean p=n>=2; for(long d=2;p&&d*d<=n;d++) if(n%d==0) p=false; System.out.println(p?"PRIME":"COMPOSITE"); } }`, sampleStdin: '29', expectedOutput: 'PRIME' },
    ],
    miniBuild: {
      title: 'Milestone Merger 2: O(1) Fast Range Sum Engine (Phase 1–2)',
      description: 'Combine guard clauses, static helper methods, 64-bit long precision, and O(1) algebra to sum any [L, R] instantly.',
      banglaGoal: 'গার্ড ক্লজ, স্ট্যাটিক মেথড ও O(1) গাণিতিক সূত্র মিলিয়ে দ্রুত রেঞ্জ-সাম ইঞ্জিন তৈরি করো।',
      combinesChapters: 'Java Ch 1–10 (Phase 2 Milestone Merger)',
      starterCode: `import java.util.Scanner;

public class Main {
    static long prefixSum(long n) {
        if (n <= 0) return 0;
        return (n % 2 == 0) ? (n / 2) * (n + 1) : n * ((n + 1) / 2);
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLong()) {
            long l = sc.nextLong(), r = sc.nextLong();
            if (l > r) { System.out.println(0); return; }
            System.out.println(prefixSum(r) - prefixSum(l - 1));
        }
    }
}`,
      sampleStdin: '1 100000',
      expectedOutput: '5000050000',
    },
    starterCode: `import java.util.Scanner;

public class Main {
    static long prefixSum(long n) {
        if (n <= 0) return 0;
        return (n % 2 == 0) ? (n / 2) * (n + 1) : n * ((n + 1) / 2);
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLong()) {
            long l = sc.nextLong(), r = sc.nextLong();
            if (l > r) { System.out.println(0); return; }
            System.out.println(prefixSum(r) - prefixSum(l - 1));
        }
    }
}`,
    sampleStdin: '1 100000',
    expectedSampleOutput: '5000050000',
    testCases: [
      { id: 'java10-t1', input: '1 100000', expectedOutput: '5000050000' },
      { id: 'java10-t2', input: '10 20', expectedOutput: '165', isHidden: true },
    ],
  },
};


