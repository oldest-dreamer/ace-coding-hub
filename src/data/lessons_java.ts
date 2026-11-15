import type { AtomicLessonOverride } from './atomicLessonTypes';
import { LESSONS_JAVA_P2 } from './lessons_java_p2';
import { LESSONS_JAVA_P3 } from './lessons_java_p3';
import { LESSONS_JAVA_P4 } from './lessons_java_p4';
import { LESSONS_JAVA_P5 } from './lessons_java_p5';

export const LESSONS_JAVA: Record<number, AtomicLessonOverride> = {
  1: {
    chapterNumber: 1,
    title: 'Java Chapter 1 (Java 21+): JVM Bytecode Pipeline & Main Class Anatomy',
    banglaTitle: 'Java অধ্যায় ১ (Java 21+): JVM বাইটকোড পাইপলাইন ও Main ক্লাসের গঠন',
    subtitle: 'How javac compiles source text into .class bytecode and how the JVM JIT runs public class Main.',
    zeroIntuition: {
      plainEnglishStory:
        'Java delivers "Write Once, Run Anywhere" through a two-stage pipeline: javac compiles Main.java into platform-neutral .class JVM Bytecode rather than CPU-specific binary, and the Java Virtual Machine (JVM) loads Main, calls public static void main(String[] args), and HotSpot JIT-compiles hot paths down to native machine speed.\n\nNotice three non-negotiable Java rules on day one: the public class name must match Main.java in competitive judges, every statement ends cleanly with a semicolon, and output batches collected in StringBuilder avoid thousands of slow synchronized System.out.println() flushes.',
      asciiFlowchart: `  [ Main.java ] --(javac compiler)--> [ Main.class (JVM Bytecode) ]
        |
        v (ClassLoader loads Main into JVM Metaspace)
  [ JVM Interpreter + HotSpot JIT Compiler ]
        |
        v (Calls public static void main(String[] args))
  [ System.out.println(...) ] ---> ( stdout )`,
      pseudocode: [
        '1. COMPILE Main.java with javac into JVM bytecode Main.class',
        '2. CLASSLOADER loads class Main (file name MUST match public class name)',
        '3. JVM invokes static main() without creating an object instance first',
        '4. PRINT message cleanly to System.out stream',
      ],
      banglaZeroToHero: {
        analogyTitle: 'সর্বজনীন পাসপোর্ট ও দোভাষী JVM',
        explanation:
          'ধরো তুমি একবার কোড লিখলে এবং চাও সেটি Windows, Mac, Linux সব মেশিনে চলুক। Java কোড প্রথমে javac কম্পাইলার দিয়ে Bytecode (.class) নামক এক সর্বজনীন ভাষায় রূপান্তরিত হয়। এরপর প্রতিটি মেশিনে থাকা JVM (Java Virtual Machine) ও তার ভেতরের HotSpot JIT কম্পাইলার সেই বাইটকোডকে তাৎক্ষণিক নেটিভ স্পিডে চালিয়ে দেয়। Piston ও প্রায় সব অনলাইন জাজে ফাইলের নামের সাথে মিল রেখে ক্লাসের নাম অবশ্যই public class Main দিতে হয় এবং ভেতরে public static void main(String[] args) মেথড থাকতে হয়। এখানে static থাকার কারণে অবজেক্ট না বানিয়েই JVM সরাসরি প্রোগ্রাম শুরু করতে পারে। সহজ ইনপুট নিতে java.util.Scanner দারুণ কাজের, তবে কনটেস্টে অনেক লাইন প্রিন্ট করতে বারবার println না ডেকে StringBuilder-এ জমিয়ে শেষে একবার System.out.print(out) করাই সেরা কৌশল!',
        everydayExample:
          'যেমন আন্তর্জাতিক ফ্লাইটের বোর্ডিং পাস পৃথিবীর সব বিমানবন্দরে এক নিয়মে পড়া যায়, তেমনি .class বাইটকোড সব OS-এর JVM-এ চলে।',
        keyTakeaways: [
          'অনলাইন জাজে public class Main এবং ফাইলের নাম Main.java এক হওয়া বাধ্যতামূলক।',
          'static থাকার কারণে অবজেক্ট তৈরি না করেই JVM সরাসরি main() চালাতে পারে।',
          'System.out.println() লেখা শেষে স্বয়ংক্রিয়ভাবে নতুন লাইন (newline) যোগ করে।',
        ],
      },
    },
    topics: [
      {
        id: 'java-ch-1-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Minimal Java 21 Program & Entry Point Anatomy',
        englishParagraphs: [
          'Every standard Java application executes inside public static void main(String[] args). The keyword static lets the JVM invoke main immediately after loading Main.class without allocating an object first.',
          'System.out is a static PrintStream bound to OS file descriptor 1 (stdout). Calling println emits text plus a newline cleanly.',
        ],
        banglaParagraphs: [
          'Java-তে সবকিছু ক্লাসের ভেতরে লিখতে হয়। public class Main হলো আমাদের প্রধান কন্টেইনার, আর তার ভেতর public static void main(String[] args) হলো স্টার্ট বাটন।',
          'একদম শুরুতে static দেখে ভয় পেয়ো না—এটি JVM-কে বলে "আগে অবজেক্ট বানাতে হবে না, সরাসরি এই ফাংশন চালু করো"।',
        ],
        memoryDiagram: `Metaspace: [ class Main ] -> JVM Stack: [ main(args) ] -> stdout: "Hello, Java 21!"`,
        code: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, Java 21!");
    }
}`,
        stdin: '',
        expectedOutput: 'Hello, Java 21!',
        lineByLine: [
          {
            lineNumber: 'Line 1',
            codeSnippet: 'public class Main {',
            whatItMeans: 'Declares public entry class matching Main.java.',
            whyItIsThere: 'Compiler and competitive judges expect Main as the entry class.',
            ifDeletedError: 'Syntax error or Main class not found at launch.',
          },
          {
            lineNumber: 'Line 2',
            codeSnippet: 'public static void main(String[] args) {',
            whatItMeans: 'Exact JVM launch signature returning void.',
            whyItIsThere: 'JVM searches specifically for this signature.',
            ifDeletedError: 'Error: Main method not found in class Main.',
          },
          {
            lineNumber: 'Line 3',
            codeSnippet: 'System.out.println("Hello, Java 21!");',
            whatItMeans: 'Writes line + newline to standard output.',
            whyItIsThere: 'Displays greeting to stdout.',
            ifDeletedError: 'Program compiles but outputs nothing.',
          },
        ],
      },
      {
        id: 'java-ch-1-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Reading Tokens Safely with Scanner(System.in)',
        englishParagraphs: [
          'To read user or judge tokens in Java, import java.util.Scanner and wrap System.in. Methods like next() and nextInt() automatically skip whitespace and newlines.',
          'Always guard with sc.hasNext() before reading so empty stdin never throws NoSuchElementException.',
        ],
        banglaParagraphs: [
          'ইনপুট নেওয়ার জন্য java.util.Scanner ক্লাসটি সবচেয়ে সহজ। sc.next() একটি শব্দ পড়ে, আর sc.nextInt() একটি পূর্ণসংখ্যা পড়ে।',
          'আগে sc.hasNext() চেক করে নিলে ইনপুট ফাঁকা থাকলেও প্রোগ্রাম ক্র্যাশ করবে না।',
        ],
        memoryDiagram: `stdin: "Argon 21" -> Scanner -> name="Argon", val=21 -> System.out.println(...)`,
        code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNext()) {
            String name = sc.next();
            int val = sc.nextInt();
            System.out.println("Coder " + name + " scored " + (val * 2));
        }
    }
}`,
        stdin: 'Argon 21',
        expectedOutput: 'Coder Argon scored 42',
        lineByLine: [
          {
            lineNumber: 'Line 1',
            codeSnippet: 'import java.util.Scanner;',
            whatItMeans: 'Imports Scanner class from java.util package.',
            whyItIsThere: 'Scanner is not auto-imported like java.lang.',
            ifDeletedError: 'Compile error: cannot find symbol Scanner.',
          },
          {
            lineNumber: 'Line 6',
            codeSnippet: 'if (sc.hasNext())',
            whatItMeans: 'Verifies at least one token exists on System.in.',
            whyItIsThere: 'Prevents NoSuchElementException on blank input.',
            ifDeletedError: 'Runtime crash when stdin is empty.',
          },
        ],
      },
      {
        id: 'java-ch-1-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Runtime Inspection & Java Text Blocks / Version Info',
        englishParagraphs: [
          'Backend Java services query Runtime.getRuntime() during startup to log available CPU cores and JVM memory budgets before opening HTTP ports.',
          'We can deterministically inspect bit-width constants from Integer.BYTES and String.formatted (Java 15+) for clean output.',
        ],
        banglaParagraphs: [
          'বড় Java সার্ভার চালু হওয়ার সময় JVM কত বাইট মেমোরি ও কোন ডেটা প্রস্থ ব্যবহার করছে তা চেক করে নেয়।',
          'এখানে Integer.BYTES ও আধুনিক .formatted() ব্যবহার করে পরিষ্কার রিপোর্ট বানানো হয়েছে।',
        ],
        memoryDiagram: `JVM Constants: Integer.BYTES=4 | Long.BYTES=8 -> String.formatted() -> stdout`,
        code: `public class Main {
    public static void main(String[] args) {
        boolean jvmReady = true;
        String report = "JVM Ready: %s | int=%dB long=%dB"
                .formatted(jvmReady, Integer.BYTES, Long.BYTES);
        System.out.println(report);
    }
}`,
        stdin: '',
        expectedOutput: 'JVM Ready: true | int=4B long=8B',
        lineByLine: [
          {
            lineNumber: 'Line 4',
            codeSnippet: '.formatted(jvmReady, Integer.BYTES, Long.BYTES);',
            whatItMeans: 'Java modern instance method for printf-style formatting.',
            whyItIsThere: 'Cleaner than nested String.format(...) calls.',
            ifDeletedError: 'Unformatted placeholder tokens appear or fail.',
          },
        ],
      },
      {
        id: 'java-ch-1-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Multi-Test Loop Trap & StringBuilder Output Batching',
        englishParagraphs: [
          'Calling System.out.println() 100,000 times inside a loop causes 100,000 synchronized flushes and often gets TLE in Java CP submissions.',
          'Collecting lines into a StringBuilder and printing once at the end delivers C++-like output speed.',
        ],
        banglaParagraphs: [
          'Java-তে ১ লক্ষ বার System.out.println() চালালে প্রতিটি লাইন ফ্লাশ হতে গিয়ে Time Limit Exceeded (TLE) হতে পারে!',
          'সব উত্তর আগে StringBuilder-এ জমিয়ে একদম শেষে একবার System.out.print(out) করলেই প্রোগ্রাম বজ্রগতিতে চলে।',
        ],
        memoryDiagram: `Heap StringBuilder out -> append(sum + "\\n") -> single flush at exit`,
        code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        StringBuilder out = new StringBuilder();
        while (sc.hasNextLong()) {
            long a = sc.nextLong();
            if (!sc.hasNextLong()) break;
            long b = sc.nextLong();
            out.append(a + b).append('\\n');
        }
        System.out.print(out);
    }
}`,
        stdin: '3 4\n10 20',
        expectedOutput: '7\n30',
        lineByLine: [
          {
            lineNumber: 'Line 6',
            codeSnippet: 'StringBuilder out = new StringBuilder();',
            whatItMeans: 'Mutable character buffer in JVM heap.',
            whyItIsThere: 'Batches thousands of output lines into one syscall.',
            ifDeletedError: 'Slow per-line println flushing risks TLE on large tests.',
          },
          {
            lineNumber: 'Line 7',
            codeSnippet: 'while (sc.hasNextLong())',
            whatItMeans: 'Safely reads pairs until EOF.',
            whyItIsThere: 'Handles variable number of input pairs.',
            ifDeletedError: 'Only processes first case or throws exception.',
          },
        ],
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 1',
        codeSnippet: 'public class Main',
        whatItMeans: 'Defines public top-level class matching Main.java.',
        whyItIsThere: 'Mandatory entry class contract in standard judges.',
        ifDeletedError: 'Compiler rejects file or JVM cannot locate entry class.',
      },
      {
        lineNumber: 'Line 2',
        codeSnippet: 'public static void main(String[] args)',
        whatItMeans: 'Static JVM entry point accepting CLI arguments.',
        whyItIsThere: 'Execution starts at the first instruction inside main.',
        ifDeletedError: 'Runtime Error: Main method not found.',
      },
      {
        lineNumber: 'Line 3',
        codeSnippet: 'System.out.println(...);',
        whatItMeans: 'Sends formatted string plus newline to stdout.',
        whyItIsThere: 'Produces deterministic output.',
        ifDeletedError: 'No stdout emitted.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'javac Main.java', memoryOrStack: 'Main.class generated', note: 'Bytecode verified statically' },
      { step: 2, state: 'JVM boots Main', memoryOrStack: 'args = []', note: 'ClassLoader loads static members' },
      { step: 3, state: 'Read Argon 21', memoryOrStack: 'name="Argon", val=21', note: 'Scanner tokenizes System.in' },
      { step: 4, state: 'Flush stdout', memoryOrStack: 'stdout buffer', note: 'Outputs Coder Argon scored 42' },
    ],
    harryBugTraps: [
      {
        title: 'Class Name Does Not Match Main.java',
        brokenCode: 'public class Solution { public static void main(String[] a) {} }',
        fixedCode: 'public class Main { public static void main(String[] a) {} }',
        whyItBreaks: 'Piston and most judges save the source inside Main.java, requiring public class Main.',
      },
      {
        title: 'Using sc.nextLine() Right After sc.nextInt()',
        brokenCode: 'int n = sc.nextInt();\nString s = sc.nextLine(); // reads leftover ""!',
        fixedCode: 'int n = sc.nextInt();\nsc.nextLine(); // consume newline first\nString s = sc.nextLine();',
        whyItBreaks: 'nextInt leaves the trailing newline character in the input stream, which nextLine consumes immediately.',
      },
      {
        title: 'Missing Semicolon or Unclosed Brace',
        brokenCode: 'System.out.println("Hi")',
        fixedCode: 'System.out.println("Hi");',
        whyItBreaks: 'Java statements must terminate with a semicolon (;).',
      },
    ],
    practiceSheet: [
      {
        id: 'java-ch-1-q1',
        difficulty: 'Easy',
        title: 'Hello ArgonCode in Java',
        prompt: 'Write a Java 21 program with public class Main that outputs "ArgonCode Java Ready".',
        banglaHint: 'public class Main ও System.out.println ব্যবহার করো।',
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("ArgonCode Java Ready");\n    }\n}`,
        sampleStdin: '',
        expectedOutput: 'ArgonCode Java Ready',
      },
      {
        id: 'java-ch-1-q2',
        difficulty: 'Easy',
        title: 'Two-Token Echo',
        prompt: 'Read city name and population integer, then print "<city>: <pop>".',
        banglaHint: 'sc.next() ও sc.nextInt() ব্যবহার করো।',
        starterCode: `import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String city = sc.next();\n            int pop = sc.nextInt();\n            System.out.println(city + ": " + pop);\n        }\n    }\n}`,
        sampleStdin: 'Sylhet 500',
        expectedOutput: 'Sylhet: 500',
      },
      {
        id: 'java-ch-1-q3',
        difficulty: 'Medium',
        title: 'Multi-Line Pair Sum',
        prompt: 'Read pairs of integers until EOF and print their sum on separate lines.',
        banglaHint: 'while (sc.hasNextLong()) দিয়ে EOF পর্যন্ত সব জোড়া পড়ো।',
        starterCode: `import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        StringBuilder sb = new StringBuilder();\n        while (sc.hasNextLong()) {\n            long a = sc.nextLong();\n            if (!sc.hasNextLong()) break;\n            long b = sc.nextLong();\n            sb.append(a + b).append('\\n');\n        }\n        System.out.print(sb);\n    }\n}`,
        sampleStdin: '5 7\n100 250',
        expectedOutput: '12\n350',
      },
      {
        id: 'java-ch-1-q4',
        difficulty: 'Medium',
        title: 'Java Type Width Audit',
        prompt: 'Print "bytes=4/8" using Integer.BYTES and Long.BYTES.',
        banglaHint: 'Integer.BYTES এবং Long.BYTES স্ট্যাটিক ফিল্ড প্রিন্ট করো।',
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("bytes=" + Integer.BYTES + "/" + Long.BYTES);\n    }\n}`,
        sampleStdin: '',
        expectedOutput: 'bytes=4/8',
      },
    ],
    miniBuild: {
      title: 'Java Mini Build: Student Score Greeter',
      description: 'Read a student name and raw score from stdin, double the score, and emit a formatted banner.',
      banglaGoal: 'ইনপুট থেকে নাম ও নম্বর পড়ে দ্বিগুণ স্কোর প্রিন্ট করা।',
      combinesChapters: 'Ch 1',
      starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNext()) {
            String name = sc.next();
            int score = sc.nextInt();
            System.out.println("Welcome, " + name + "! Score: " + (score * 2));
        }
    }
}`,
      sampleStdin: 'Argon 42',
      expectedOutput: 'Welcome, Argon! Score: 84',
    },
    starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNext()) {
            String name = sc.next();
            int score = sc.nextInt();
            System.out.println("Welcome, " + name + "! Score: " + (score * 2));
        }
    }
}`,
    sampleStdin: 'Argon 42',
    expectedSampleOutput: 'Welcome, Argon! Score: 84',
    testCases: [
      { id: 'java-c1-t1', input: 'Argon 42', expectedOutput: 'Welcome, Argon! Score: 84' },
      { id: 'java-c1-t2', input: 'Dhaka 15', expectedOutput: 'Welcome, Dhaka! Score: 30', isHidden: true },
    ],
  },

  2: {
    chapterNumber: 2,
    title: 'Java Chapter 2 (Java 21+): Fast I/O (BufferedReader), Formatting & Escapes',
    banglaTitle: 'Java অধ্যায় ২ (Java 21+): ফাস্ট I/O (BufferedReader), ফরম্যাটিং ও এস্কেপ',
    subtitle: 'Replacing slow Scanner with BufferedReader + StringTokenizer and mastering printf + escape sequences.',
    zeroIntuition: {
      plainEnglishStory:
        'Java’s Scanner parses regex under the hood—convenient for quick exercises, yet often causing Time Limit Exceeded (TLE) when reading 200,000 competitive programming integers! Competitive Java developers wrap System.in inside BufferedReader + InputStreamReader to grab 8 KB chunks directly from OS buffers, splitting tokens cleanly with StringTokenizer.\n\nFor output precision and clean formatting, System.out.printf supports %.2f fixed decimals, %n platform-safe newlines, %-10s left-aligned columns, and backslash escapes like \\" and \\t. Remember to declare throws IOException on methods calling readLine() and escape dots as "\\\\." when splitting IP strings with regex.',
      asciiFlowchart: `  [ stdin 2x10^5 ints ] ---> [ Scanner (regex per token ~600ms -> TLE!) ]
                        ---> [ BufferedReader + StringTokenizer (~90ms -> AC!) ]`,
      pseudocode: [
        '1. WRAP System.in in InputStreamReader -> BufferedReader',
        '2. READ whole lines with br.readLine() (skips regex overhead)',
        '3. SPLIT line via StringTokenizer or str.split()',
        '4. FORMAT output with printf("%.2f") or StringBuilder',
      ],
      banglaZeroToHero: {
        analogyTitle: 'Scanner বনাম BufferedReader: রিকশা বনাম মেট্রোরেল',
        explanation:
          'Java-র Scanner ক্লাস প্রতিটি টোকেন পড়ার সময় ভেতরে regex চালায়—যা ১০০টি ইনপুটে আরামদায়ক হলেও Codeforces-এ ২ লক্ষ সংখ্যা পড়তে দিলে রিকশার মতো সময় নষ্ট করে TLE খাওয়ায়! তাই দ্রুতগতির প্রোগ্রামে BufferedReader এবং StringTokenizer জুটি ব্যবহার করা হয়, যা মেট্রোরেলের মতো একবারে ৮ কিলোবাইট ডেটা বাফারে এনে দেয়। যেকোনো মেথডে br.readLine() কল করলে মেথড সিগনেচারে throws IOException লিখতে ভুলবে না। অন্যদিকে আউটপুটে দশমিকের পর ঠিক ২ ঘর (%.2f), ডান-বাম কলাম অ্যালাইনমেন্ট (%-8s), ট্যাব (\\t) বা ডাবল কোটেশন (\\") দেখাতে System.out.printf() ও StringBuilder দুর্দান্ত কাজে আসে। আর String.split(".") লিখলে regex সব অক্ষর ধরে ফেলে—তাই ডট ভাগ করতে "\\\\." লিখতে হয়।',
        everydayExample:
          'এক গ্লাস করে পানি আনার বদলে পুরো বালতি ভরে আনা মানেই বাফারিং।',
        keyTakeaways: [
          '২ লক্ষের বেশি ইনপুট হলে Scanner বাদ দিয়ে BufferedReader + StringTokenizer ব্যবহার করো।',
          'মেথড সিগনেচারে throws IOException লিখতে ভুলো না।',
          'স্ট্রিংয়ে উদ্ধৃতিচিহ্ন ("") দেখাতে \\" ব্যবহার করতে হয়।',
        ],
      },
    },
    topics: [
      {
        id: 'java-ch-2-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'printf Formatting, Fixed Decimals & Escape Sequences',
        englishParagraphs: [
          'System.out.printf supports %.2f for fixed two-decimal currency output, %n for platform-safe newlines, and escape sequences like \\t (tab) and \\" (literal double quote).',
        ],
        banglaParagraphs: [
          '%.2f দিয়ে দশমিকের পর ঠিক ২ ঘর পর্যন্ত সংখ্যা দেখানো যায়, আর \\" দিয়ে লেখার ভেতর ডাবল কোটেশন প্রিন্ট করা যায়।',
        ],
        memoryDiagram: `double pi=3.14159 -> printf("%.2f") -> rounds display to "3.14"`,
        code: `public class Main {
    public static void main(String[] args) {
        double price = 149.456;
        System.out.printf("Item:\\t\\"Notebook\\"\\nTotal:\\t%.2f BDT%n", price);
    }
}`,
        stdin: '',
        expectedOutput: 'Item:\t"Notebook"\nTotal:\t149.46 BDT',
        lineByLine: [
          {
            lineNumber: 'Line 4',
            codeSnippet: 'System.out.printf("Item:\\t\\"Notebook\\"\\nTotal:\\t%.2f BDT%n", price);',
            whatItMeans: 'Formats tab, escaped quotes, newline, and 2-decimal float.',
            whyItIsThere: 'Guarantees exact currency formatting.',
            ifDeletedError: 'Raw unrounded floats break output formatting.',
          },
        ],
      },
      {
        id: 'java-ch-2-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Fast BufferedReader + StringTokenizer Input',
        englishParagraphs: [
          'BufferedReader.readLine() reads full lines rapidly. Wrapping each line with StringTokenizer splits space-separated numbers with minimal object allocation.',
        ],
        banglaParagraphs: [
          'BufferedReader দিয়ে পুরো লাইন পড়ে StringTokenizer দিয়ে টোকেন ভাগ করলে Scanner-এর চেয়ে অনেক দ্রুত ইনপুট পড়া যায়।',
        ],
        memoryDiagram: `stdin -> BufferedReader (8KB buf) -> StringTokenizer -> nextToken()`,
        code: `import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line != null) {
            StringTokenizer st = new StringTokenizer(line);
            long a = Long.parseLong(st.nextToken());
            long b = Long.parseLong(st.nextToken());
            System.out.printf("Sum=%d | Avg=%.1f%n", a + b, (a + b) / 2.0);
        }
    }
}`,
        stdin: '15 24',
        expectedOutput: 'Sum=39 | Avg=19.5',
        lineByLine: [
          {
            lineNumber: 'Line 7',
            codeSnippet: 'public static void main(String[] args) throws IOException',
            whatItMeans: 'Declares checked IOException for BufferedReader.',
            whyItIsThere: 'Java compiler requires checked I/O exceptions to be handled or declared.',
            ifDeletedError: 'Compile error: unreported exception IOException.',
          },
          {
            lineNumber: 'Line 11',
            codeSnippet: 'StringTokenizer st = new StringTokenizer(line);',
            whatItMeans: 'Fast whitespace tokenizer without heavy regex.',
            whyItIsThere: 'Reads tokens 4x faster than String.split().',
            ifDeletedError: 'Cannot parse separate integers from single line.',
          },
        ],
      },
      {
        id: 'java-ch-2-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Aligned Invoice Table Using Width Specifiers',
        englishParagraphs: [
          'Left-align labels with %-10s and right-align integers with %4d to generate clean terminal tables for CLI dashboards and test summaries.',
        ],
        banglaParagraphs: [
          '%-10s টেক্সটকে বাম দিকে অ্যালাইন করে এবং %4d সংখ্যাকে ডান দিকে বসিয়ে চমৎকার টেবিল তৈরি করে।',
        ],
        memoryDiagram: `Formatter columns: [%-8s] [%-6s] -> padded fixed width output`,
        code: `public class Main {
    public static void main(String[] args) {
        System.out.printf("%-8s | %5s%n", "Lang", "Year");
        System.out.printf("%-8s | %5d%n", "Java", 1995);
        System.out.printf("%-8s | %5d%n", "Rust", 2015);
    }
}`,
        stdin: '',
        expectedOutput: 'Lang     |  Year\nJava     |  1995\nRust     |  2015',
        lineByLine: [
          {
            lineNumber: 'Line 3',
            codeSnippet: 'System.out.printf("%-8s | %5s%n", "Lang", "Year");',
            whatItMeans: 'Pads string left to 8 chars and right to 5 chars.',
            whyItIsThere: 'Keeps tabular columns aligned cleanly.',
            ifDeletedError: 'Misaligned header row.',
          },
        ],
      },
      {
        id: 'java-ch-2-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Custom FastReader Class for Codeforces N = 2×10^5',
        englishParagraphs: [
          'When input spans multiple arbitrary lines or trailing spaces, wrapping BufferedReader + StringTokenizer inside a tiny FastReader helper handles EOF and arbitrary line breaks effortlessly.',
        ],
        banglaParagraphs: [
          'Codeforces-এ ইনপুট এক লাইনে নাকি একাধিক লাইনে আছে তা নিয়ে চিন্তা না করতে চাইলে স্ট্যান্ডার্ড FastReader টেমপ্লেট ব্যবহার করা সেরা উপায়।',
        ],
        memoryDiagram: `FastReader.nextLong() refills StringTokenizer whenever !hasMoreTokens()`,
        code: `import java.io.*;
import java.util.*;

public class Main {
    static class FastReader {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st;
        String next() throws IOException {
            while (st == null || !st.hasMoreTokens()) {
                String line = br.readLine();
                if (line == null) return null;
                st = new StringTokenizer(line);
            }
            return st.nextToken();
        }
    }

    public static void main(String[] args) throws IOException {
        FastReader fr = new FastReader();
        String tok = fr.next();
        if (tok == null) return;
        int n = Integer.parseInt(tok);
        long sum = 0;
        for (int i = 0; i < n; i++) sum += Long.parseLong(fr.next());
        System.out.println(sum);
    }
}`,
        stdin: '4\n10 20\n30 40',
        expectedOutput: '100',
        lineByLine: [
          {
            lineNumber: 'Line 9',
            codeSnippet: 'while (st == null || !st.hasMoreTokens())',
            whatItMeans: 'Reads next non-empty line only when current tokens are exhausted.',
            whyItIsThere: 'Handles blank lines and irregular formatting across judges.',
            ifDeletedError: 'NullPointerException or NoSuchElementException on newlines.',
          },
        ],
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 1',
        codeSnippet: 'BufferedReader br = new BufferedReader(new InputStreamReader(System.in));',
        whatItMeans: 'Buffers raw byte stream into fast UTF-16 character reader.',
        whyItIsThere: '10x faster than Scanner for large inputs.',
        ifDeletedError: 'Must fall back to slower Scanner.',
      },
      {
        lineNumber: 'Line 2',
        codeSnippet: 'System.out.printf("%.2f%n", val);',
        whatItMeans: 'Formats decimal to 2 fraction digits.',
        whyItIsThere: 'Standard way to pass fixed-precision output tasks.',
        ifDeletedError: 'Outputs unpredictable number of trailing digits.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'br.readLine() reads "4"', memoryOrStack: 'st=["4"]', note: 'n parsed as 4' },
      { step: 2, state: 'st exhausted -> read "10 20"', memoryOrStack: 'sum = 30', note: 'Loops i=0,1 cleanly' },
      { step: 3, state: 'st exhausted -> read "30 40"', memoryOrStack: 'sum = 100', note: 'Loops i=2,3 cleanly' },
      { step: 4, state: 'Print sum', memoryOrStack: 'stdout="100"', note: 'AC well within time limit' },
    ],
    harryBugTraps: [
      {
        title: 'Using (a + b) / 2 Integer Division for Averages',
        brokenCode: 'System.out.printf("%.1f", (3 + 4) / 2); // IllegalFormatConversionException!',
        fixedCode: 'System.out.printf("%.1f", (3 + 4) / 2.0);',
        whyItBreaks: 'Passing an int to %f throws IllegalFormatConversionException at runtime in Java!',
      },
      {
        title: 'Missing throws IOException',
        brokenCode: 'public static void main(String[] args) { br.readLine(); }',
        fixedCode: 'public static void main(String[] args) throws IOException { br.readLine(); }',
        whyItBreaks: 'IOException is a checked exception in Java and fails compilation if uncaught.',
      },
      {
        title: 'Regex Backslash Trap in String.split()',
        brokenCode: '"1.2.3".split(".") // returns empty array!',
        fixedCode: '"1.2.3".split("\\\\.")',
        whyItBreaks: 'String.split takes a regex where unescaped "." matches every character.',
      },
    ],
    practiceSheet: [
      {
        id: 'java-ch-2-q1',
        difficulty: 'Easy',
        title: 'Escaped Banner Print',
        prompt: 'Print: Path: "C:\\Java\\Main.java"',
        banglaHint: 'ব্যাকস্ল্যাশ দেখাতে \\\\ এবং ডাবল কোটের জন্য \\" ব্যবহার করো।',
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Path: \\"C:\\\\Java\\\\Main.java\\"");\n    }\n}`,
        sampleStdin: '',
        expectedOutput: 'Path: "C:\\Java\\Main.java"',
      },
      {
        id: 'java-ch-2-q2',
        difficulty: 'Easy',
        title: 'Two-Decimal Circle Area',
        prompt: 'Read radius r and print pi * r * r (with pi = 3.14159265) formatted to 2 decimal places.',
        banglaHint: 'System.out.printf("%.2f%n", area) ব্যবহার করো।',
        starterCode: `import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        double r = sc.nextDouble();\n        System.out.printf("%.2f%n", 3.14159265 * r * r);\n    }\n}`,
        sampleStdin: '5',
        expectedOutput: '78.54',
      },
      {
        id: 'java-ch-2-q3',
        difficulty: 'Medium',
        title: 'BufferedReader Sum of N Numbers',
        prompt: 'Use BufferedReader + StringTokenizer to read n and sum n integers.',
        banglaHint: 'FastReader বা StringTokenizer ব্যবহার করো।',
        starterCode: `import java.io.*;\nimport java.util.*;\n\npublic class Main {\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        int n = Integer.parseInt(br.readLine().trim());\n        StringTokenizer st = new StringTokenizer(br.readLine());\n        long s = 0;\n        for (int i = 0; i < n; i++) s += Long.parseLong(st.nextToken());\n        System.out.println(s);\n    }\n}`,
        sampleStdin: '3\n10 20 30',
        expectedOutput: '60',
      },
      {
        id: 'java-ch-2-q4',
        difficulty: 'Medium',
        title: 'Tab-Separated Report Line',
        prompt: 'Read name and marks, then output "<name>\\t<marks>.0".',
        banglaHint: '\\t ও %.1f দিয়ে আউটপুট সাজাও।',
        starterCode: `import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String name = sc.next();\n        double m = sc.nextDouble();\n        System.out.printf("%s\\t%.1f%n", name, m);\n    }\n}`,
        sampleStdin: 'Rafi 95',
        expectedOutput: 'Rafi\t95.0',
      },
    ],
    miniBuild: {
      title: 'Java Mini Build: Fast Stream Receipt Formatter',
      description: 'Read item count and N unit prices via BufferedReader, computing sum and average to 2 decimal places.',
      banglaGoal: 'BufferedReader দিয়ে দ্রুত ডেটা পড়ে মোট ও গড় ২ দশমিক স্থানে প্রিন্ট করা।',
      combinesChapters: 'Ch 1–2',
      starterCode: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String first = br.readLine();
        if (first == null) return;
        int n = Integer.parseInt(first.trim());
        StringTokenizer st = new StringTokenizer(br.readLine());
        double total = 0;
        for (int i = 0; i < n; i++) total += Double.parseDouble(st.nextToken());
        System.out.printf("Total=%.2f Avg=%.2f%n", total, total / n);
    }
}`,
      sampleStdin: '3\n10.5 20.0 29.5',
      expectedOutput: 'Total=60.00 Avg=20.00',
    },
    starterCode: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String first = br.readLine();
        if (first == null) return;
        int n = Integer.parseInt(first.trim());
        StringTokenizer st = new StringTokenizer(br.readLine());
        double total = 0;
        for (int i = 0; i < n; i++) total += Double.parseDouble(st.nextToken());
        System.out.printf("Total=%.2f Avg=%.2f%n", total, total / n);
    }
}`,
    sampleStdin: '3\n10.5 20.0 29.5',
    expectedSampleOutput: 'Total=60.00 Avg=20.00',
    testCases: [
      { id: 'java-c2-t1', input: '3\n10.5 20.0 29.5', expectedOutput: 'Total=60.00 Avg=20.00' },
      { id: 'java-c2-t2', input: '2\n5.0 10.0', expectedOutput: 'Total=15.00 Avg=7.50', isHidden: true },
    ],
  },

  3: {
    chapterNumber: 3,
    title: 'Java Chapter 3 (Java 21+): Primitives, JVM Sizes & Integer Overflow',
    banglaTitle: 'Java অধ্যায় ৩ (Java 21+): প্রিমিটিভ টাইপ, JVM সাইজ ও ইন্টিজার ওভারফ্লো',
    subtitle: 'Fixed cross-platform JVM bit widths: byte (1B), int (4B), long (8B), double (8B), and BigInteger.',
    zeroIntuition: {
      plainEnglishStory:
        'Unlike C/C++ where integer widths can vary by OS or CPU, the JVM specification locks every primitive width identically across every platform forever: byte (1B), int (4B, max 2,147,483,647), long (8B, max ~9.22 × 10^18), and double (8B IEEE-754). Still, multiplying two large int variables silently wraps around inside 32-bit arithmetic before widening into a long target!\n\nPromote operands early with (long) a * b or read directly via nextLong(), suffix large literals with L (1_000_000_000_000L), call Math.multiplyExact() when overflow must raise an exception instead of wrapping, and switch to java.math.BigInteger when values exceed 18 digits.',
      asciiFlowchart: `  int a = 100000;  // 32-bit max ~ 2.14 x 10^9
  int b = 100000;
  [ a * b ] ---> computed in 32-bit int FIRST! ---> wraps to 1410065408 (BUG!)
  [ (long) a * b ] ---> promoted to 64-bit FIRST! ---> 10000000000L (SAFE!)`,
      pseudocode: [
        '1. DECLARE a, b as 64-bit long (or cast (long)a * b before multiplying)',
        '2. CHECK bounds up to 9 x 10^18 with long, or BigInteger beyond 10^18',
        '3. AVOID float/double for exact money/count calculations',
      ],
      banglaZeroToHero: {
        analogyTitle: 'নির্দিষ্ট মাপের টিফিন বক্স ও ওভারফ্লো ফাঁদ',
        explanation:
          'C/C++-এ মেশিন ভেদে ডেটা টাইপের সাইজ বদলালেও Java-তে পৃথিবীর সব কম্পিউটারে int সব সময় ৩২-বিট (৪ বাইট, সর্বোচ্চ ২.১৪ × ১০^৯) এবং long সব সময় ৬৪-বিট (৮ বাইট, সর্বোচ্চ ৯.২২ × ১০^১৮) থাকে। কিন্তু সাবধান—দুটি ১ লক্ষ int গুণ করে তা long ভ্যারিয়েবলে রাখলেও ডান পাশের গুণফলটি আগে ৩২-বিটেই ওভারফ্লো হয়ে সংখ্যাটি নষ্ট করে দেবে! তাই বড় গুণের আগেই (long) a * b কাস্ট করা অথবা শুরু থেকেই long টাইপ ব্যবহার করা বাধ্যতামূলক, আর বড় সংখ্যার শেষে L (যেমন 3000000000L) যোগ করতে হয়। আর্থিক সফটওয়্যারে ওভারফ্লো ধরতে Math.multiplyExact(), আর ১৮ ডিজিটেরও বড় (যেমন ২^১০০) নির্ভুল গণনার জন্য java.math.BigInteger ব্যবহৃত হয়।',
        everydayExample:
          'ছোট বাটিতে ২ লিটার দুধ ঢালার আগে বড় পাতিলে ঢেলে নেওয়া মানেই (long) কাস্ট।',
        keyTakeaways: [
          'long লিটারেলের শেষে L লিখতে হয় (যেমন 1_000_000_000_000L)।',
          'Math.multiplyExact(a, b) ওভারফ্লো হলে সাথে সাথে ArithmeticException দেয়।',
          '১০০! বা ১৮ ডিজিটের চেয়ে বড় সংখ্যার জন্য java.math.BigInteger আছে।',
        ],
      },
    },
    topics: [
      {
        id: 'java-ch-3-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'All Key Primitives & Exact JVM Byte Widths',
        englishParagraphs: [
          'Java specifies exact sizes for all 8 primitives across every CPU architecture. Checking Wrapper.BYTES prints exact stack footprint.',
          'Numeric underscores (1_000_000L) boost readability without affecting runtime value.',
        ],
        banglaParagraphs: [
          'Java-এর প্রতিটি প্রিমিটিভ টাইপের মেমোরি সাইজ নির্দিষ্ট। বড় সংখ্যায় আন্ডারস্কোর (_) ব্যবহার করলে পড়া অনেক সহজ হয়।',
        ],
        memoryDiagram: `Stack Slots: [ int a=4B ] [ long b=8B ] [ double c=8B ] [ boolean d=1B ]`,
        code: `public class Main {
    public static void main(String[] args) {
        int small = 2_000_000_000;
        long wide = 9_000_000_000_000L;
        double ratio = 0.75;
        System.out.println(small + " | " + wide + " | intB=" + Integer.BYTES + " longB=" + Long.BYTES + " | " + ratio);
    }
}`,
        stdin: '',
        expectedOutput: '2000000000 | 9000000000000 | intB=4 longB=8 | 0.75',
        lineByLine: [
          {
            lineNumber: 'Line 4',
            codeSnippet: 'long wide = 9_000_000_000_000L;',
            whatItMeans: 'Declares a 64-bit integer literal using L suffix.',
            whyItIsThere: 'Without L, Java rejects literals exceeding 32-bit int max.',
            ifDeletedError: 'Compile error: integer number too large.',
          },
        ],
      },
      {
        id: 'java-ch-3-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Safe 64-Bit Multiplication Avoiding 32-Bit Wrap',
        englishParagraphs: [
          'Even if the destination variable is long, writing long ans = a * b when a and b are ints still overflows in 32-bit math before widening.',
          'Reading a and b directly as long via sc.nextLong() guarantees 64-bit arithmetic from the start.',
        ],
        banglaParagraphs: [
          'ভ্যারিয়েবল long হলেও যদি a আর b int টাইপের হয়, তবে a * b আগে ৩২-বিটেই ওভারফ্লো হবে! তাই ইনপুট থেকেই long নেওয়া সবচেয়ে নিরাপদ।',
        ],
        memoryDiagram: `a:long (10^5) * b:long (10^5) -> 10^10 (Zero overflow!)`,
        code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        long a = sc.nextLong();
        long b = sc.nextLong();
        System.out.println(a * b);
    }
}`,
        stdin: '100000 100000',
        expectedOutput: '10000000000',
        lineByLine: [
          {
            lineNumber: 'Line 6',
            codeSnippet: 'long a = sc.nextLong();',
            whatItMeans: 'Reads 64-bit signed integer directly.',
            whyItIsThere: 'Ensures product stays inside 64-bit registers.',
            ifDeletedError: '32-bit int multiplication silently wraps to 1410065408.',
          },
        ],
      },
      {
        id: 'java-ch-3-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Exact Overflow Guard with Math.multiplyExact & BigInteger',
        englishParagraphs: [
          'Financial engines refuse silent wraparound. Java’s Math.multiplyExact throws ArithmeticException immediately on 64-bit overflow, while BigInteger computes arbitrary-precision math cleanly.',
        ],
        banglaParagraphs: [
          'ব্যাংকিং সফটওয়্যারে ওভারফ্লো লুকিয়ে রাখা যায় না। Math.multiplyExact ওভারফ্লো ধরলে এরর দেয়, আর BigInteger যত বড় সংখ্যাই হোক নির্ভুল হিসাব করে।',
        ],
        memoryDiagram: `BigInteger heap array -> arbitrary digit storage (beyond 64-bit)`,
        code: `import java.math.BigInteger;

public class Main {
    public static void main(String[] args) {
        long safe = Math.multiplyExact(1_000_000L, 2_000_000L);
        BigInteger huge = new BigInteger("100000000000000000000").multiply(BigInteger.TWO);
        System.out.println(safe + " | " + huge);
    }
}`,
        stdin: '',
        expectedOutput: '2000000000000 | 200000000000000000000',
        lineByLine: [
          {
            lineNumber: 'Line 5',
            codeSnippet: 'Math.multiplyExact(1_000_000L, 2_000_000L);',
            whatItMeans: 'Multiplies two longs and checks overflow flag.',
            whyItIsThere: 'Fails fast instead of silently corrupting financial balances.',
            ifDeletedError: 'No overflow validation.',
          },
        ],
      },
      {
        id: 'java-ch-3-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Codeforces Trap: Integer Overflow in Arithmetic Progression Sum',
        englishParagraphs: [
          'Computing n * (n + 1) / 2 for n = 10^9 overflows 32-bit int immediately (10^18 exceeds 2.14e9). Multiplying by 1L first or keeping n as long makes the formula AC instantly.',
        ],
        banglaParagraphs: [
          '১ থেকে n পর্যন্ত যোগফল n * (n + 1) / 2 করার সময় n = 10^9 হলে int ওভারফ্লো হয়। long ব্যবহার করলে ১৮ ডিজিট পর্যন্ত নির্ভুল থাকে।',
        ],
        memoryDiagram: `n=1000000L -> n*(n+1)/2 = 500000500000L`,
        code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        long n = sc.nextLong();
        long sum = n * (n + 1) / 2;
        System.out.println(sum);
    }
}`,
        stdin: '1000000',
        expectedOutput: '500000500000',
        lineByLine: [
          {
            lineNumber: 'Line 7',
            codeSnippet: 'long sum = n * (n + 1) / 2;',
            whatItMeans: 'Computes 1..n sum entirely in 64-bit long.',
            whyItIsThere: 'n=10^6 gives 5e11, which overflows 32-bit int.',
            ifDeletedError: 'Wrong Answer for any n > 65535.',
          },
        ],
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 1',
        codeSnippet: 'long wide = 9_000_000_000_000L;',
        whatItMeans: '64-bit signed integer literal.',
        whyItIsThere: 'Default literals without L are 32-bit int.',
        ifDeletedError: 'Compile error: integer number too large.',
      },
      {
        lineNumber: 'Line 2',
        codeSnippet: 'Math.multiplyExact(a, b)',
        whatItMeans: 'Overflow-checked multiplication.',
        whyItIsThere: 'Throws exception instead of silent wraparound.',
        ifDeletedError: 'Silent wrap on > 9e18.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'Read n = 1000000L', memoryOrStack: 'n: long (8B)', note: 'Fits 64-bit register' },
      { step: 2, state: 'n + 1 = 1000001L', memoryOrStack: 'temp = 1000001L', note: '64-bit arithmetic' },
      { step: 3, state: 'n * (n + 1)', memoryOrStack: '1000001000000L', note: 'Would overflow 32-bit int!' },
      { step: 4, state: '/ 2 -> 500000500000', memoryOrStack: 'stdout', note: 'Exact answer emitted' },
    ],
    harryBugTraps: [
      {
        title: 'Forgetting L on Big Literal',
        brokenCode: 'long x = 3000000000;',
        fixedCode: 'long x = 3000000000L;',
        whyItBreaks: 'Java parses integer constants as 32-bit int unless suffixed with L.',
      },
      {
        title: 'Assigning int * int Into long Too Late',
        brokenCode: 'int a = 100000, b = 100000;\nlong c = a * b;',
        fixedCode: 'long c = (long) a * b;',
        whyItBreaks: 'The product overflows 32-bit int before Java widens it to assign into c.',
      },
      {
        title: 'Comparing double With ==',
        brokenCode: 'System.out.println(0.1 + 0.2 == 0.3); // false!',
        fixedCode: 'System.out.println(Math.abs((0.1 + 0.2) - 0.3) < 1e-9);',
        whyItBreaks: 'IEEE-754 binary floats have tiny rounding errors (0.30000000000000004).',
      },
    ],
    practiceSheet: [
      {
        id: 'java-ch-3-q1',
        difficulty: 'Easy',
        title: '64-Bit Rectangle Area',
        prompt: 'Read two integers up to 10^9 and print their product safely using long.',
        banglaHint: 'sc.nextLong() দিয়ে উভয় সংখ্যা পড়ে গুণ করো।',
        starterCode: `import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        long a = sc.nextLong(), b = sc.nextLong();\n        System.out.println(a * b);\n    }\n}`,
        sampleStdin: '100000 100000',
        expectedOutput: '10000000000',
      },
      {
        id: 'java-ch-3-q2',
        difficulty: 'Easy',
        title: 'Promotion Casting Practice',
        prompt: 'Given int x = 50000 and int y = 50000, print exact product using (long) cast.',
        banglaHint: '(long) x * y লিখলে আগে কাস্ট হবে।',
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int x = 50000, y = 50000;\n        System.out.println((long) x * y);\n    }\n}`,
        sampleStdin: '',
        expectedOutput: '2500000000',
      },
      {
        id: 'java-ch-3-q3',
        difficulty: 'Medium',
        title: '1..N Sum Without Overflow',
        prompt: 'Read long n and print n * (n + 1) / 2.',
        banglaHint: 'n <= 10^9 হলে long রেঞ্জের ভেতরই থাকে।',
        starterCode: `import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        long n = sc.nextLong();\n        System.out.println(n * (n + 1) / 2);\n    }\n}`,
        sampleStdin: '100000',
        expectedOutput: '5000050000',
      },
      {
        id: 'java-ch-3-q4',
        difficulty: 'Hard',
        title: '2^100 With BigInteger',
        prompt: 'Use BigInteger.TWO.pow(100) and print the exact 31-digit result.',
        banglaHint: 'java.math.BigInteger ব্যবহার করো।',
        starterCode: `import java.math.BigInteger;\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(BigInteger.TWO.pow(100));\n    }\n}`,
        sampleStdin: '',
        expectedOutput: '1267650600228229401496703205376',
      },
    ],
    miniBuild: {
      title: 'Java Mini Build: 64-Bit Overflow Safe Multiplier',
      description: 'Read two integers up to 10^9 and output their 64-bit product without wrapping.',
      banglaGoal: '৩২-বিট ওভারফ্লো ছাড়াই ৬৪-বিটে বড় গুণফল নির্ণয়।',
      combinesChapters: 'Ch 1–3',
      starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        long a = sc.nextLong();
        long b = sc.nextLong();
        System.out.println(a * b);
    }
}`,
      sampleStdin: '100000 100000',
      expectedOutput: '10000000000',
    },
    starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        long a = sc.nextLong();
        long b = sc.nextLong();
        System.out.println(a * b);
    }
}`,
    sampleStdin: '100000 100000',
    expectedSampleOutput: '10000000000',
    testCases: [
      { id: 'java-c3-t1', input: '100000 100000', expectedOutput: '10000000000' },
      { id: 'java-c3-t2', input: '250000 40000', expectedOutput: '10000000000', isHidden: true },
    ],
  },

  4: {
    chapterNumber: 4,
    title: 'Java Chapter 4 (Java 21+): Operators, Precedence & Negative Modulo',
    banglaTitle: 'Java অধ্যায় ৪ (Java 21+): অপারেটর, প্রায়োরিটি ও নেগেটিভ মডুলো',
    subtitle: 'Integer vs float division, short-circuit &&/|| guards, ternary expressions, and Math.floorMod.',
    zeroIntuition: {
      plainEnglishStory:
        'Java arithmetic and relational operators hide three classic pitfalls: dividing integers truncates toward zero (7 / 2 == 3), negative remainders preserve the dividend sign (-3 % 5 == -3), and using == on String objects compares heap memory references rather than characters! Use Math.floorMod(a, m) for cyclic positive modulo [0, m-1] and "YES".equals(s) for null-safe string comparisons.\n\nLogical && and || short-circuit strictly left-to-right so null checks like (s != null && s.length() >= 2) guard against NullPointerException. For competitive math, avoid double rounding loss in Math.ceil((double) a / b) and compute exact integer ceiling via (a + b - 1) / b.',
      asciiFlowchart: `  [ (-1) % 5 ]       ---> Java remainder: -1  (keeps dividend sign!)
  [ Math.floorMod(-1, 5) ] ---> True modulo: 4 (always 0..m-1!)`,
      pseudocode: [
        '1. NORMALIZE negative modulo with ((a % m) + m) % m or Math.floorMod',
        '2. GUARD nulls first on left side of &&: (s != null && s.length() > 0)',
        '3. COMPUTE integer ceil(a / b) via (a + b - 1) / b without doubles',
      ],
      banglaZeroToHero: {
        analogyTitle: 'শর্ট-সার্কিট তালা ও ঘড়ির কাঁটার মডুলো',
        explanation:
          'Java-তে দুটি পূর্ণসংখ্যা ভাগ করলে দশমিক অংশ কেটে যায় (7 / 2 = 3), আর ঋণাত্মক সংখ্যায় % ব্যবহার করলে ভাগশেষ মাইনাস আসে (-7 % 5 = -2)! ঘড়ির কাঁটা বা সার্কুলার অ্যারেতে সব সময় ধনাত্মক ভাগশেষ পেতে Java-র Math.floorMod(a, m) কিংবা ((a % m) + m) % m সূত্র ব্যবহার করতে হয়। পাশাপাশি দুটি ভয়াবহ বাগ এড়িয়ে চলবে: প্রথমত, স্ট্রিং তুলনায় কখনো == দেবে না (এতে মেমোরি ঠিকানা তুলনা হয়), সব সময় .equals() ব্যবহার করবে। দ্বিতীয়ত, ১৬ ডিজিটের বড় সংখ্যায় Math.ceil((double) a / b) দিলে প্রিসিশন নষ্ট হয়, তাই শতভাগ নির্ভুল সিলিং পেতে (a + b - 1) / b লিখবে এবং নাল রেফারেন্স বাঁচাতে &&-এর বাম পাশে s != null রাখবে!',
        everydayExample:
          '১২টার ঘড়িতে ১ ঘণ্টা পেছনে গেলে -১ না হয়ে ১১টা বাজে—Math.floorMod ঠিক তাই করে।',
        keyTakeaways: [
          'সঠিক সিলিং ডিভিশন: (a + b - 1) / b (double ছাড়া শতভাগ নিখুঁত)।',
          's != null && !s.isEmpty() লেখায় s নাল হলে ডান পাশ আর চলে না (No NPE!)।',
          '= মানে অ্যাসাইনমেন্ট, আর প্রিমিটিভের মান তুলনায় == ব্যবহৃত হয়।',
        ],
      },
    },
    topics: [
      {
        id: 'java-ch-4-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Arithmetic, Integer Division & Floating Cast',
        englishParagraphs: [
          'Dividing two int/long values truncates toward zero. Casting one operand to double (or dividing by 2.0) triggers floating-point division.',
        ],
        banglaParagraphs: [
          'দুটি int বা long ভাগ করলে ভাগশেষ বাদ যায়। দশমিক ফল চাইলে অন্তত একটি সংখ্যা double হতে হবে।',
        ],
        memoryDiagram: `7 / 2 = 3 (trunc) | 7 / 2.0 = 3.5 (IEEE-754) | 7 % 2 = 1`,
        code: `public class Main {
    public static void main(String[] args) {
        int a = 7, b = 2;
        System.out.println("div=" + (a / b) + " float=" + ((double) a / b) + " rem=" + (a % b));
    }
}`,
        stdin: '',
        expectedOutput: 'div=3 float=3.5 rem=1',
        lineByLine: [
          {
            lineNumber: 'Line 4',
            codeSnippet: '((double) a / b)',
            whatItMeans: 'Casts a to double before dividing by b.',
            whyItIsThere: 'Prevents integer truncation.',
            ifDeletedError: 'Outputs 3.0 instead of 3.5.',
          },
        ],
      },
      {
        id: 'java-ch-4-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Positive Mathematical Modulo Using Math.floorMod',
        englishParagraphs: [
          'Competitive DP and cyclic array rotation break when index becomes negative (-3 % 5 == -3). Math.floorMod(-3, 5) cleanly returns 2.',
        ],
        banglaParagraphs: [
          'সার্কুলার অ্যারে বা সাইফার সমস্যায় নেগেটিভ ইনডেক্স এড়াতে Java-র বিল্ট-ইন Math.floorMod(a, m) ব্যবহার করলে ফল সব সময় ০ থেকে m-1 এর ভেতরে থাকে।',
        ],
        memoryDiagram: `a=-3, m=5 -> raw(-3%5)=-3 | floorMod(-3,5)=2`,
        code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        long a = sc.nextLong();
        long m = sc.nextLong();
        long mod = Math.floorMod(a, m);
        System.out.println("raw=" + (a % m) + " posMod=" + mod);
    }
}`,
        stdin: '-3 5',
        expectedOutput: 'raw=-3 posMod=2',
        lineByLine: [
          {
            lineNumber: 'Line 8',
            codeSnippet: 'long mod = Math.floorMod(a, m);',
            whatItMeans: 'Computes non-negative mathematical modulo.',
            whyItIsThere: 'Prevents negative ArrayIndexOutOfBoundsException.',
            ifDeletedError: 'Negative indices crash array lookups.',
          },
        ],
      },
      {
        id: 'java-ch-4-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Short-Circuit Null Guard & Ternary Fee Tier',
        englishParagraphs: [
          'Putting item != null && item.length() > 3 ensures Java never invokes .length() on a null reference. The ternary operator cond ? x : y selects values cleanly inline.',
        ],
        banglaParagraphs: [
          '&&-এর বাম পাশে নাল চেক থাকলে NullPointerException এড়ানো যায়। আর Ternary অপারেটর এক লাইনে শর্তসাপেক্ষ মান বেছে নেয়।',
        ],
        memoryDiagram: `coupon=null -> short-circuits && immediately -> returns "STANDARD"`,
        code: `public class Main {
    public static void main(String[] args) {
        String coupon = null;
        boolean valid = (coupon != null && coupon.length() >= 4);
        String tier = valid ? "DISCOUNT" : "STANDARD";
        int x = 5;
        int post = x++;
        System.out.println(tier + " | post=" + post + " now=" + x);
    }
}`,
        stdin: '',
        expectedOutput: 'STANDARD | post=5 now=6',
        lineByLine: [
          {
            lineNumber: 'Line 4',
            codeSnippet: 'boolean valid = (coupon != null && coupon.length() >= 4);',
            whatItMeans: 'Evaluates right operand only if coupon is non-null.',
            whyItIsThere: 'Null-safe guard prevents crash.',
            ifDeletedError: 'Throws NullPointerException.',
          },
        ],
      },
      {
        id: 'java-ch-4-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Exact Integer Ceil Division (Codeforces Div.2 A Classic)',
        englishParagraphs: [
          'Using (long) Math.ceil((double) a / b) fails precision around 10^16 because double only has 53 bits of significand precision. Using (a + b - 1) / b is 100% exact up to 9×10^18.',
        ],
        banglaParagraphs: [
          'Math.ceil((double)a / b) ব্যবহার করলে ১৫-১৬ ডিজিটের বড় সংখ্যায় double-এর প্রিসিশন হারিয়ে ভুল উত্তর আসে! এর বদলে (a + b - 1) / b সব সময় শতভাগ নির্ভুল।',
        ],
        memoryDiagram: `a=10, b=3 -> (10 + 3 - 1) / 3 = 12 / 3 = 4`,
        code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        long n = sc.nextLong();
        long m = sc.nextLong();
        long a = sc.nextLong();
        long tilesX = (n + a - 1) / a;
        long tilesY = (m + a - 1) / a;
        System.out.println(tilesX * tilesY);
    }
}`,
        stdin: '6 6 4',
        expectedOutput: '4',
        lineByLine: [
          {
            lineNumber: 'Line 9',
            codeSnippet: 'long tilesX = (n + a - 1) / a;',
            whatItMeans: 'Exact integer ceiling division without doubles.',
            whyItIsThere: 'Solves Codeforces 1A (Theatre Square) accurately for 10^9 bounds.',
            ifDeletedError: 'Floating precision loss or undercounting boundary tiles.',
          },
        ],
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 1',
        codeSnippet: 'Math.floorMod(a, m)',
        whatItMeans: 'Standard library true positive remainder.',
        whyItIsThere: 'Normalizes negative dividends automatically.',
        ifDeletedError: 'a % m returns negative remainder for a < 0.',
      },
      {
        lineNumber: 'Line 2',
        codeSnippet: '(n + a - 1) / a',
        whatItMeans: 'Integer ceiling formula.',
        whyItIsThere: 'Avoids 53-bit double precision loss on 64-bit longs.',
        ifDeletedError: 'Fails precision checks for large inputs.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'Read n=6, m=6, a=4', memoryOrStack: 'long n=6,m=6,a=4', note: 'Inputs parsed' },
      { step: 2, state: 'tilesX = (6+4-1)/4', memoryOrStack: '9 / 4 = 2', note: 'Integer ceil of 6/4' },
      { step: 3, state: 'tilesY = (6+4-1)/4', memoryOrStack: '9 / 4 = 2', note: 'Integer ceil of 6/4' },
      { step: 4, state: 'tilesX * tilesY', memoryOrStack: '4', note: 'Outputs 4 cleanly' },
    ],
    harryBugTraps: [
      {
        title: 'Using == on Strings Instead of .equals()',
        brokenCode: 'String s = sc.next();\nif (s == "YES") ...',
        fixedCode: 'if ("YES".equals(s)) ...',
        whyItBreaks: 'In Java, == compares object memory addresses for Strings, not character contents!',
      },
      {
        title: 'Precedence Trap: Mixing + With String Concatenation',
        brokenCode: 'System.out.println("Sum=" + 3 + 4); // prints Sum=34!',
        fixedCode: 'System.out.println("Sum=" + (3 + 4)); // prints Sum=7',
        whyItBreaks: 'Left-to-right evaluation turns ("Sum=" + 3) into a String before adding 4.',
      },
      {
        title: 'Negative Modulo Without Normalization',
        brokenCode: 'int idx = (pos - k) % n; // crash if negative!',
        fixedCode: 'int idx = Math.floorMod(pos - k, n);',
        whyItBreaks: 'Accessing arr[idx] with negative idx throws ArrayIndexOutOfBoundsException.',
      },
    ],
    practiceSheet: [
      {
        id: 'java-ch-4-q1',
        difficulty: 'Easy',
        title: 'Safe Positive Modulo',
        prompt: 'Read two longs a and m, and print Math.floorMod(a, m).',
        banglaHint: 'Math.floorMod(a, m) ব্যবহার করো।',
        starterCode: `import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        long a = sc.nextLong(), m = sc.nextLong();\n        System.out.println(Math.floorMod(a, m));\n    }\n}`,
        sampleStdin: '-17 5',
        expectedOutput: '3',
      },
      {
        id: 'java-ch-4-q2',
        difficulty: 'Easy',
        title: 'Exact Integer Ceiling',
        prompt: 'Read positive longs a and b and print ceil(a / b) using integer arithmetic.',
        banglaHint: '(a + b - 1) / b লিখলেই হবে।',
        starterCode: `import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        long a = sc.nextLong(), b = sc.nextLong();\n        System.out.println((a + b - 1) / b);\n    }\n}`,
        sampleStdin: '10 3',
        expectedOutput: '4',
      },
      {
        id: 'java-ch-4-q3',
        difficulty: 'Medium',
        title: 'Leap Year Boolean Formula',
        prompt: 'Read year y and print YES if leap year else NO using && and || in one boolean expression.',
        banglaHint: '(y % 400 == 0) || (y % 4 == 0 && y % 100 != 0)',
        starterCode: `import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int y = sc.nextInt();\n        boolean leap = (y % 400 == 0) || (y % 4 == 0 && y % 100 != 0);\n        System.out.println(leap ? "YES" : "NO");\n    }\n}`,
        sampleStdin: '2024',
        expectedOutput: 'YES',
      },
      {
        id: 'java-ch-4-q4',
        difficulty: 'Medium',
        title: 'Null-Safe String Check',
        prompt: 'Read a token (or default "ok") and verify length >= 2 safely without ==.',
        banglaHint: '"YES".equals(s) স্টাইল ব্যবহার করো।',
        starterCode: `import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.hasNext() ? sc.next() : null;\n        System.out.println((s != null && s.length() >= 2) ? "VALID" : "INVALID");\n    }\n}`,
        sampleStdin: 'hi',
        expectedOutput: 'VALID',
      },
    ],
    miniBuild: {
      title: 'Java Mini Build: Modulo & Ceiling Calculator',
      description: 'Read a, b and print positive floorMod(a, b) alongside exact ceiling (abs(a) + b - 1) / b.',
      banglaGoal: 'সঠিক মডুলো এবং ইন্টিজার সিলিং ডিভিশন একসাথে নির্ণয় করা।',
      combinesChapters: 'Ch 1–4',
      starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        long a = sc.nextLong();
        long b = sc.nextLong();
        System.out.println("mod=" + Math.floorMod(a, b) + " ceil=" + ((Math.abs(a) + b - 1) / b));
    }
}`,
      sampleStdin: '-7 4',
      expectedOutput: 'mod=1 ceil=2',
    },
    starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        long a = sc.nextLong();
        long b = sc.nextLong();
        System.out.println("mod=" + Math.floorMod(a, b) + " ceil=" + ((Math.abs(a) + b - 1) / b));
    }
}`,
    sampleStdin: '-7 4',
    expectedSampleOutput: 'mod=1 ceil=2',
    testCases: [
      { id: 'java-c4-t1', input: '-7 4', expectedOutput: 'mod=1 ceil=2' },
      { id: 'java-c4-t2', input: '10 3', expectedOutput: 'mod=1 ceil=4', isHidden: true },
    ],
  },

  5: {
    chapterNumber: 5,
    title: 'Java Chapter 5 (Java 21+): Bitwise Operators, Shifts & CP Bitmasks',
    banglaTitle: 'Java অধ্যায় ৫ (Java 21+): বিটওয়াইজ অপারেটর, শিফট ও CP বিটমাস্ক',
    subtitle: 'AND/OR/XOR, >> vs >>> unsigned right shift, 1L << k 64-bit masks, and Long.bitCount().',
    isMilestoneMerger: true,
    zeroIntuition: {
      plainEnglishStory:
        'Because Java lacks unsigned primitive integers, it provides two distinct right-shift operators: arithmetic >> copies the sign bit (keeping negatives negative), whereas unsigned >>> inserts zeros on the left—made famous by JDK Arrays.binarySearch fixing midpoint overflow via (low + high) >>> 1.\n\nMeanwhile, left-shifting a 32-bit literal like (1 << 40) silently wraps distance modulo 32 in Java, computing 1 << 8 = 256 instead of 2^40! Always shift 64-bit 1L << k when targeting bits 31..63, and call Long.bitCount(x) to count 1-bits in one hardware POPCNT instruction.',
      asciiFlowchart: `  mask = 1L << 40    (MUST use 1L! 1 << 40 wraps to 1 << 8 in Java!)
  Long.bitCount(13)  ---> 1101_2 ---> returns 3 (POPCNT CPU instruction!)
  XOR swap/unique:   x ^ x = 0   |   x ^ 0 = x`,
      pseudocode: [
        '1. CHECK k-th bit: ((x & (1L << k)) != 0)',
        '2. SET / TOGGLE k-th bit: x | (1L << k), x ^ (1L << k)',
        '3. COUNT set bits in 1 hardware instruction via Long.bitCount(x)',
        '4. CLEAR lowest set bit: x & (x - 1) -> power of two if result == 0',
      ],
      banglaZeroToHero: {
        analogyTitle: 'লম্বা সুইচ বোর্ড ও ৬৪-বিট 1L ফ্ল্যাগ',
        explanation:
          'Java-তে আলাদা কোনো unsigned int টাইপ নেই—তাই ডান শিফটের জন্য এখানে দুটি অপারেটর আছে: >> সাইন-বিট ধরে রাখে, আর >>> বামে সব সময় ০ বসায়। বাইনারি সার্চে (low + high) ওভারফ্লো হলে (low + high) >>> 1 লিখলে নেগেটিভ ইনডেক্স বাগ দূর হয়! আরেকটি বিখ্যাত ফাঁদ হলো 1 << 35: বাম পাশে সাধারণ 1 (৩২-বিট int) থাকলে Java শিফট সংখ্যাকে ৩২ দিয়ে ভাগশেষ করে মাত্র 1 << 3 বানিয়ে দেয়! তাই বড় বিটমাস্কে সব সময় 1L << k লিখবে। তাছাড়া Long.bitCount(x) এক CPU ইনস্ট্রাকশনে ১-বিট গুনে দেয়, n > 0 && (n & (n - 1)) == 0 ২-এর ঘাত যাচাই করে, আর XOR জোড়াবিহীন সংখ্যা খুঁজে দেয়।',
        everydayExample:
          'একটি ৬৪-বিট long ভ্যারিয়েবলে ৬৪টি আলাদা সুইচ (অন/অফ) সংরক্ষণ করা যায়—প্রতিটি সুইচ একটি এলিমেন্ট সাবসেটে আছে কি না বলে দেয়।',
        keyTakeaways: [
          'কখনোই 1 << 35 নয়, সব সময় 1L << 35 ব্যবহার করো।',
          'Long.bitCount(x) ও Long.numberOfTrailingZeros(x) Java-র হার্ডওয়্যার-অ্যাক্সিলারেটেড বিট ট্রিক।',
          'সাইন বিট ছাড়াই ডানে শিফট করতে >>> (triple right shift) ব্যবহৃত হয়।',
        ],
      },
    },
    topics: [
      {
        id: 'java-ch-5-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Core Bitwise Ops, 1L << k & Hardware bitCount',
        englishParagraphs: [
          'Bitwise &, |, ^, and ~ operate across all 32 or 64 bits simultaneously. Using Long.bitCount(n) compiles directly to the x86 POPCNT instruction.',
        ],
        banglaParagraphs: [
          '&, |, ^ দিয়ে সরাসরি বিট পর্যায়ে কাজ করা যায় এবং Long.bitCount(n) দিয়ে ঝটপট ১-বিট গোনা যায়।',
        ],
        memoryDiagram: `n = 13 (0b1101) -> bitCount=3 | (n & 1)=1 (Odd)`,
        code: `public class Main {
    public static void main(String[] args) {
        long a = 12, b = 10; // 1100 & 1010
        System.out.println("AND=" + (a & b) + " OR=" + (a | b) + " XOR=" + (a ^ b) + " pop=" + Long.bitCount(13));
    }
}`,
        stdin: '',
        expectedOutput: 'AND=8 OR=14 XOR=6 pop=3',
        lineByLine: [
          {
            lineNumber: 'Line 4',
            codeSnippet: 'Long.bitCount(13)',
            whatItMeans: 'Counts set bits (1s) in 64-bit binary representation.',
            whyItIsThere: 'Executes in O(1) hardware time.',
            ifDeletedError: 'Must write a manual shift-and-count loop.',
          },
        ],
      },
      {
        id: 'java-ch-5-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Power-of-Two & k-th Bit Inspector',
        englishParagraphs: [
          'Check if positive x is a power of two in O(1) with x > 0 && (x & (x - 1)) == 0. Inspect the k-th bit safely using 1L << k.',
        ],
        banglaParagraphs: [
          'x & (x - 1) == 0 সূত্র দিয়ে ২-এর ঘাত কি না এক ধাপে বের করা যায় এবং 1L << k দিয়ে k-তম বিট পরীক্ষা করা যায়।',
        ],
        memoryDiagram: `x=16 (10000_2) -> x & (x-1) = 0 -> isPow2 = true`,
        code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        long x = sc.nextLong();
        int k = sc.nextInt();
        boolean pow2 = x > 0 && (x & (x - 1)) == 0;
        long bitK = (x >> k) & 1L;
        System.out.println("pow2=" + pow2 + " bit" + k + "=" + bitK);
    }
}`,
        stdin: '16 4',
        expectedOutput: 'pow2=true bit4=1',
        lineByLine: [
          {
            lineNumber: 'Line 8',
            codeSnippet: 'boolean pow2 = x > 0 && (x & (x - 1)) == 0;',
            whatItMeans: 'Verifies x has exactly one 1-bit.',
            whyItIsThere: 'O(1) bitwise power-of-two test.',
            ifDeletedError: 'Slow division loop required.',
          },
        ],
      },
      {
        id: 'java-ch-5-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Unix Permission Bitmask & Signed >> vs Unsigned >>> Shift',
        englishParagraphs: [
          'System APIs pack multiple flags into one int. Meanwhile, binary search midpoints written as (low + high) >>> 1 never overflow even when low + high exceeds Integer.MAX_VALUE!',
        ],
        banglaParagraphs: [
          '(low + high) >>> 1 হলো বিখ্যাত Java বাইনারি সার্চ ট্রিক—যা কখনোই ইন্টিজার ওভারফ্লো হয় না।',
        ],
        memoryDiagram: `mid = (low + high) >>> 1 shifts 0 into sign bit cleanly`,
        code: `public class Main {
    public static void main(String[] args) {
        int READ = 1 << 0, WRITE = 1 << 1, EXEC = 1 << 2;
        int perm = READ | WRITE;
        perm ^= EXEC; // toggle EXEC on
        int low = 1_500_000_000, high = 2_000_000_000;
        int safeMid = (low + high) >>> 1;
        System.out.println("perm=" + perm + " safeMid=" + safeMid);
    }
}`,
        stdin: '',
        expectedOutput: 'perm=7 safeMid=1750000000',
        lineByLine: [
          {
            lineNumber: 'Line 7',
            codeSnippet: 'int safeMid = (low + high) >>> 1;',
            whatItMeans: 'Unsigned right shift ignores negative sign wrap.',
            whyItIsThere: 'Famous JDK Arrays.binarySearch overflow fix.',
            ifDeletedError: '(low + high) / 2 yields negative array index -397483648!',
          },
        ],
      },
      {
        id: 'java-ch-5-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Codeforces Trap: 1 << 40 Wrap & XOR Single-Number Finder',
        englishParagraphs: [
          'In Java, 1 << 40 silently computes 1 << (40 % 32) = 256! Always write 1L << 40. Below we combine Phase 1 foundations to find the unique unpaired element in O(n) time and O(1) space via XOR.',
        ],
        banglaParagraphs: [
          'Java-তে 1 << 40 দিলে ৮ বিট শিফট হয়ে ২৫৬ হয়ে যায়—এই ভয়াবহ বাগ থেকে বাঁচতে অবশ্যই 1L << 40 লিখবে। নিচে XOR দিয়ে O(1) মেমোরিতে একক সংখ্যা খোঁজা দেখানো হলো।',
        ],
        memoryDiagram: `4 ^ 1 ^ 2 ^ 1 ^ 2 = 4 ^ (1^1) ^ (2^2) = 4`,
        code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        long unique = 0;
        for (int i = 0; i < n; i++) unique ^= sc.nextLong();
        long mask40 = 1L << 40;
        System.out.println("unique=" + unique + " mask40_bits=" + Long.bitCount(mask40));
    }
}`,
        stdin: '5\n4 1 2 1 2',
        expectedOutput: 'unique=4 mask40_bits=1',
        lineByLine: [
          {
            lineNumber: 'Line 9',
            codeSnippet: 'long mask40 = 1L << 40;',
            whatItMeans: 'Uses 64-bit 1L before shifting 40 positions.',
            whyItIsThere: '1 << 40 only shifts modulo 32 in Java.',
            ifDeletedError: 'Wrong bitmask causes WA on CP problems.',
          },
        ],
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 1',
        codeSnippet: '1L << k',
        whatItMeans: '64-bit left shift.',
        whyItIsThere: 'Java int shift wraps at mod 32.',
        ifDeletedError: '1 << 32 evaluates to 1 instead of 2^32.',
      },
      {
        lineNumber: 'Line 2',
        codeSnippet: '(low + high) >>> 1',
        whatItMeans: 'Unsigned right shift midpoint.',
        whyItIsThere: 'Prevents signed addition overflow in binary search.',
        ifDeletedError: 'Negative midpoint on arrays near 2B.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'unique = 0', memoryOrStack: 'xor=0', note: 'Identity for XOR' },
      { step: 2, state: 'Read 4, 1, 2', memoryOrStack: '0^4^1^2 = 7', note: 'Accumulates bits' },
      { step: 3, state: 'Read 1, 2', memoryOrStack: '7^1^2 = 4', note: 'Pairs cancel to 0' },
      { step: 4, state: 'mask40 = 1L << 40', memoryOrStack: 'bitCount=1', note: '64-bit shift verified' },
    ],
    harryBugTraps: [
      {
        title: '32-Bit Shift Modulo Trap (1 << 35)',
        brokenCode: 'long mask = 1 << 35; // equals 8!',
        fixedCode: 'long mask = 1L << 35;',
        whyItBreaks: 'Java masks int shift distances with & 0x1F (mod 32) unless left operand is 1L.',
      },
      {
        title: 'Bitwise Operator Precedence Lower Than ==',
        brokenCode: 'if (x & 1 == 0) // Compile error!',
        fixedCode: 'if ((x & 1) == 0)',
        whyItBreaks: '== binds tighter than &, so Java parses x & (1 == 0) (long & boolean -> compile error).',
      },
      {
        title: 'Negative Midpoint Using >> Instead of >>>',
        brokenCode: 'int mid = (1_500_000_000 + 1_500_000_000) >> 1; // negative!',
        fixedCode: 'int mid = (1_500_000_000 + 1_500_000_000) >>> 1;',
        whyItBreaks: '>> shifts the overflowed sign bit (1) downward, preserving negativity.',
      },
    ],
    practiceSheet: [
      {
        id: 'java-ch-5-q1',
        difficulty: 'Easy',
        title: 'Count Set Bits With Long.bitCount',
        prompt: 'Read a long n and print Long.bitCount(n).',
        banglaHint: 'Java-র বিল্ট-ইন Long.bitCount(n) ব্যবহার করো।',
        starterCode: `import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        System.out.println(Long.bitCount(sc.nextLong()));\n    }\n}`,
        sampleStdin: '29',
        expectedOutput: '4',
      },
      {
        id: 'java-ch-5-q2',
        difficulty: 'Easy',
        title: 'Power of Two Checker',
        prompt: 'Read long n and print YES if power of 2 else NO.',
        banglaHint: 'n > 0 && (n & (n - 1)) == 0',
        starterCode: `import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        long n = sc.nextLong();\n        System.out.println((n > 0 && (n & (n - 1)) == 0) ? "YES" : "NO");\n    }\n}`,
        sampleStdin: '64',
        expectedOutput: 'YES',
      },
      {
        id: 'java-ch-5-q3',
        difficulty: 'Medium',
        title: 'Safe 64-Bit Bitmask Shift',
        prompt: 'Read exponent k (0..60) and print 1L << k.',
        banglaHint: 'অবশ্যই 1L << k লিখবে!',
        starterCode: `import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int k = sc.nextInt();\n        System.out.println(1L << k);\n    }\n}`,
        sampleStdin: '40',
        expectedOutput: '1099511627776',
      },
      {
        id: 'java-ch-5-q4',
        difficulty: 'Hard',
        title: 'Find Unique Element via XOR',
        prompt: 'Read n and n longs where every element appears twice except one; print the unique one.',
        banglaHint: 'সব সংখ্যাকে XOR করলে জোড়াগুলো 0 হয়ে বাদ যাবে।',
        starterCode: `import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        long ans = 0;\n        for (int i = 0; i < n; i++) ans ^= sc.nextLong();\n        System.out.println(ans);\n    }\n}`,
        sampleStdin: '5\n7 3 9 3 7',
        expectedOutput: '9',
      },
    ],
    miniBuild: {
      title: 'Milestone Merger 1 (Java Ch 1–5): Fast Bitmask & Odd-One-Out Analyzer',
      description: 'Combine FastReader, 64-bit longs, floorMod parity, and XOR bitmasks into one fast CP utility.',
      banglaGoal: 'অধ্যায় ১ থেকে ৫-এর সব ধারণা মিলিয়ে একটি পূর্ণাঙ্গ Java বিট-অ্যানালাইজার তৈরি।',
      combinesChapters: 'Ch 1–5',
      starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        long xorAll = 0;
        for (int i = 0; i < n; i++) xorAll ^= sc.nextLong();
        System.out.println("unique=" + xorAll + " bits=" + Long.bitCount(xorAll));
    }
}`,
      sampleStdin: '5\n12 5 12 9 5',
      expectedOutput: 'unique=9 bits=2',
    },
    starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        long xorAll = 0;
        for (int i = 0; i < n; i++) xorAll ^= sc.nextLong();
        System.out.println("unique=" + xorAll + " bits=" + Long.bitCount(xorAll));
    }
}`,
    sampleStdin: '5\n12 5 12 9 5',
    expectedSampleOutput: 'unique=9 bits=2',
    testCases: [
      { id: 'java-c5-t1', input: '5\n12 5 12 9 5', expectedOutput: 'unique=9 bits=2' },
      { id: 'java-c5-t2', input: '3\n7 10 10', expectedOutput: 'unique=7 bits=3', isHidden: true },
    ],
  },
  ...LESSONS_JAVA_P2,
  ...LESSONS_JAVA_P3,
  ...LESSONS_JAVA_P4,
  ...LESSONS_JAVA_P5,
};
