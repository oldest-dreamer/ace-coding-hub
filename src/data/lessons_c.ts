import type { AtomicLessonOverride } from './atomicLessonTypes';
import { LESSONS_C_P2 } from './lessons_c_p2';
import { LESSONS_C_P3 } from './lessons_c_p3';
import { LESSONS_C_P4 } from './lessons_c_p4';
import { LESSONS_C_P5 } from './lessons_c_p5';

export const LESSONS_C: Record<number, AtomicLessonOverride> = {
  1: {
    chapterNumber: 1,
    title: 'C Chapter 1 (C23): Compiler Pipeline & First Program Anatomy',
    banglaTitle: 'C অধ্যায় ১ (C23): কম্পাইলার পাইপলাইন ও প্রথম প্রোগ্রামের গঠন',
    subtitle: 'How C23 source code turns into CPU machine instructions via preprocessor, compiler, assembler, and linker.',
    zeroIntuition: {
      plainEnglishStory:
        'A CPU only understands raw binary opcodes (0s and 1s), never English keywords like printf or int. When you write C23 source code inside a .c file, a 4-stage toolchain—Preprocessor, Compiler, Assembler, and Linker—translates your human-readable syntax into a standalone native executable.\n\nExecution in every hosted C23 program always begins at the OS entry point int main(void) and finishes by returning integer 0 back to the operating system to confirm zero crashes. Understanding this pipeline explains why missing headers trigger compiler errors while missing function bodies trigger linker errors.',
      asciiFlowchart: `  [ hello.c ] --(1. Preprocessor)--> [ #include <stdio.h> pasted ]
        |
        v (2. Compiler -> Assembly -> 3. Assembler -> Object Code)
  [ hello.o ] --(4. Linker connects C standard library)--> [ a.out ]
        |
        v (OS loads binary into RAM & jumps to main())
  [ printf(...) -> stdout ] ---> ( return 0 -> Exit OK )`,
      pseudocode: [
        '1. PREPROCESS: attach stdio declarations so printf is known',
        '2. ENTER main(): OS starts running instructions from line 1 inside main',
        '3. EMIT text to standard output stream (fd 1)',
        '4. RETURN 0 exit status back to shell',
      ],
      banglaZeroToHero: {
        analogyTitle: 'রেস্তোরাঁর অর্ডার ও বাংলা-টু-মেশিন অনুবাদক',
        explanation:
          'ধরো তুমি একদম শূন্য থেকে প্রোগ্রামিং শুরু করছো এবং কম্পিউটারকে কাজ করতে বলবে। কম্পিউটারের প্রসেসর কেবল ০ আর ১-এর ইলেকট্রিক সিগন্যাল বোঝে, মানুষের ইংরেজি লেখা বোঝে না। C কম্পাইলার হলো তোমার দক্ষ দোভাষী যে C23 কোডকে প্রসেসরের ভাষায় অনুবাদ করে। প্রথম ধাপে Preprocessor (#include <stdio.h>) কোডের মাথায় প্রয়োজনীয় লাইব্রেরি ফাইল জুড়ে দেয়। দ্বিতীয় ধাপে Compiler তোমার কোডের ব্যাকরণ যাচাই করে সেটিকে অ্যাসেম্বলি ভাষায় নামিয়ে আনে। তৃতীয় ধাপে Assembler অ্যাসেম্বলি কোডকে ০ ও ১-এর অবজেক্ট কোডে (.o) পরিণত করে। চতুর্থ ধাপে Linker তোমার কোডের সাথে printf-এর আসল মেশিন কোড সংযুক্ত করে পূর্ণাঙ্গ এক্সিকিউটেবল ফাইল বানায়। অপারেটিং সিস্টেম যখন প্রোগ্রামটি চালায়, তখন সবার আগে main() নামের প্রধান দরজা খুঁজে সেখানে প্রবেশ করে। কাজ শেষে return 0; দেখে সিস্টেম এবং অনলাইন জাজ বুঝতে পারে প্রোগ্রাম কোনো এরর ছাড়াই সফলভাবে শেষ হয়েছে। প্রতিটি স্টেটমেন্টের শেষে সেমিকোলন (;) দেওয়া বাধ্যতামূলক কারণ এটি কম্পাইলারকে জানায় একটি নির্দেশ এখানেই শেষ।',
        everydayExample:
          'যেমন বিদেশে বাংলা চিঠিকে অনুবাদক ইংরেজিতে রূপান্তর করে দেয়, C কম্পাইলার কোডকে CPU-র ভাষায় রূপান্তর করে।',
        keyTakeaways: [
          '#include <stdio.h> না দিলে C জানতেই পারবে না printf কী জিনিস!',
          'main() হলো প্রোগ্রামের স্টার্ট বাটন; এটি ছাড়া প্রোগ্রাম রানই হবে না।',
          'প্রতিটি স্টেটমেন্টের শেষে সেমিকোলন (;) দেওয়া বাধ্যতামূলক।',
        ],
      },
    },
    topics: [
      {
        id: 'c-ch-1-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Minimal C23 Program & main() Entry Point',
        englishParagraphs: [
          'Every C program starts executing inside the main() function. In modern C23, int main(void) explicitly declares that main accepts zero command-line arguments and returns an integer exit code to the operating system.',
          'The #include <stdio.h> preprocessor directive copies the declarations of printf and puts before compilation begins. Without it, GCC rejects the unknown identifier.',
        ],
        banglaParagraphs: [
          'C প্রোগ্রামের প্রাণকেন্দ্র হলো int main(void)। অপারেটিং সিস্টেম প্রোগ্রাম চালু করার সময় প্রথমেই main() ফাংশনটি খোঁজে। আর stdio.h হেডার ফাইল আমাদের স্ক্রিনে লেখা দেখানোর জন্য printf() ফাংশন এনে দেয়।',
          'লক্ষ্য করো প্রতিটি লাইনের শেষে সেমিকোলন (;) রয়েছে এবং একেবারে শেষে return 0; অপারেটিং সিস্টেমকে বলে "সব কাজ সফলভাবে শেষ হয়েছে!"।',
        ],
        memoryDiagram: `RAM Stack Frame: [ main() ] -> calls -> [ stdio buffer ] -> stdout: "Hello, C23 World!"`,
        code: `#include <stdio.h>

int main(void) {
    printf("Hello, C23 World!\\n");
    return 0;
}`,
        stdin: '',
        expectedOutput: 'Hello, C23 World!',
        lineByLine: [
          {
            lineNumber: 'Line 1',
            codeSnippet: '#include <stdio.h>',
            whatItMeans: 'Includes Standard Input/Output header declarations.',
            whyItIsThere: 'Provides printf() prototype to the compiler.',
            ifDeletedError: 'Compile error: implicit declaration of function printf.',
          },
          {
            lineNumber: 'Line 3',
            codeSnippet: 'int main(void) {',
            whatItMeans: 'Entry function returning an integer status code.',
            whyItIsThere: 'OS loader requires main as starting instruction address.',
            ifDeletedError: 'Linker error: undefined reference to main.',
          },
          {
            lineNumber: 'Line 4',
            codeSnippet: 'printf("Hello, C23 World!\\n");',
            whatItMeans: 'Writes formatted string + newline to stdout.',
            whyItIsThere: 'Produces visible program output.',
            ifDeletedError: 'Empty stdout output.',
          },
          {
            lineNumber: 'Line 5',
            codeSnippet: 'return 0;',
            whatItMeans: 'Signals clean exit (code 0) to caller OS.',
            whyItIsThere: 'Non-zero exit code flags a crash in automated judges.',
            ifDeletedError: 'Undefined exit status in legacy compilers.',
          },
        ],
      },
      {
        id: 'c-ch-1-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Echoing User Token & Numeric Calculation via stdin',
        englishParagraphs: [
          'Real programs interact with users or competitive programming judges through stdin (file descriptor 0). scanf reads typed tokens directly into memory addresses supplied with the & address-of operator.',
          'Notice how C23 keeps I/O deterministic: printf converts binary integers back into ASCII digits automatically using %d.',
        ],
        banglaParagraphs: [
          'ইন্টারঅ্যাক্টিভ প্রোগ্রামে আমরা scanf() ব্যবহার করে কীবোর্ড বা জাজ থেকে ডেটা পড়ি। খেয়াল রাখবে পূর্ণসংখ্যার ভ্যারিয়েবল হলে নামের আগে & (অ্যাড্রেস অপারেটর) দিতে হয় যাতে scanf জানে মেমোরির ঠিক কোন ঘরে মান বসাতে হবে।',
          'এখানে আমরা ব্যবহারকারীর নাম ও নম্বর পড়ে সেটিকে দ্বিগুণ করে স্ক্রিনে সুন্দরভাবে প্রিন্ট করছি।',
        ],
        memoryDiagram: `stdin: "Argon 21" --> name[32]="Argon" | val=21 --> printf("%s -> %d", name, val*2)`,
        code: `#include <stdio.h>

int main(void) {
    char name[32];
    int val = 0;
    if (scanf("%31s %d", name, &val) == 2) {
        printf("Coder %s scored %d\\n", name, val * 2);
    }
    return 0;
}`,
        stdin: 'Argon 21',
        expectedOutput: 'Coder Argon scored 42',
        lineByLine: [
          {
            lineNumber: 'Line 4',
            codeSnippet: 'char name[32];',
            whatItMeans: 'Allocates 32 bytes on the stack for a C string.',
            whyItIsThere: 'Stores up to 31 characters plus trailing null byte \\0.',
            ifDeletedError: 'Compile error: name undeclared.',
          },
          {
            lineNumber: 'Line 6',
            codeSnippet: 'if (scanf("%31s %d", name, &val) == 2)',
            whatItMeans: 'Safely verifies both tokens were read from stdin.',
            whyItIsThere: 'Prevents buffer overflow (%31s) and garbage values on EOF.',
            ifDeletedError: 'Prints uninitialized garbage if stdin is empty.',
          },
        ],
      },
      {
        id: 'c-ch-1-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Exit-Code Diagnostics & Compile-Time sizeof Verification',
        englishParagraphs: [
          'Systems engineers use stdbool/C23 native bool alongside sizeof to audit exact hardware footprint during boot diagnostics.',
          'Using %zu prints size_t cleanly across both 32-bit and 64-bit targets without format-mismatch warnings.',
        ],
        banglaParagraphs: [
          'সিস্টেম প্রোগ্রামিংয়ে প্রোগ্রাম শুরুর সময় হার্ডওয়্যারের মেমোরি সাইজ ও C23-এর নিজস্ব bool টাইপ যাচাই করা খুব কাজে আসে।',
          'C23 স্ট্যান্ডার্ডে কোনো আলাদা stdbool.h ছাড়াই true ও false ব্যবহার করা যায়, এবং sizeof() দিয়ে বাইট সংখ্যা মাপা যায়।',
        ],
        memoryDiagram: `CPU Registers -> sizeof(int)=4 bytes | bool ready=true (1 byte) -> stdout report`,
        code: `#include <stdio.h>

int main(void) {
    bool kernel_ok = true;
    printf("System Ready: %d | int_bytes=%zu\\n", kernel_ok ? 1 : 0, sizeof(int));
    return 0;
}`,
        stdin: '',
        expectedOutput: 'System Ready: 1 | int_bytes=4',
        lineByLine: [
          {
            lineNumber: 'Line 4',
            codeSnippet: 'bool kernel_ok = true;',
            whatItMeans: 'C23 native boolean keyword without needing stdbool.h.',
            whyItIsThere: 'Stores clear binary flag in 1 byte.',
            ifDeletedError: 'Compile error: kernel_ok undeclared.',
          },
          {
            lineNumber: 'Line 5',
            codeSnippet: 'sizeof(int)',
            whatItMeans: 'Compile-time constant returning byte size of int.',
            whyItIsThere: 'Zero runtime cost; evaluated during compilation.',
            ifDeletedError: 'Format specifier %zu lacks matching argument.',
          },
        ],
      },
      {
        id: 'c-ch-1-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Missing Newline / Multi-Case Sum Trap (Codeforces Pattern)',
        englishParagraphs: [
          'In Codeforces Div. 2 A problems, forgetting to separate test case outputs with \\n merges answers onto one line and triggers Wrong Answer (WA).',
          'Checking the return count of scanf allows clean multi-test-case looping until EOF.',
        ],
        banglaParagraphs: [
          'Codeforces-এ নতুনদের সবচেয়ে বড় ভুল হলো প্রতিটি টেস্ট কেসের পর \\n না দেওয়া বা EOF হ্যান্ডল না করা।',
          'while (scanf("%d %d", &a, &b) == 2) প্যাটার্নটি ইনপুট শেষ হওয়া পর্যন্ত নিখুঁতভাবে প্রতিটি জোড়া যোগ করে প্রিন্ট করে।',
        ],
        memoryDiagram: `EOF Loop: read(3,4)->7\\n -> read(10,20)->30\\n -> EOF stops loop cleanly`,
        code: `#include <stdio.h>

int main(void) {
    int a = 0, b = 0;
    while (scanf("%d %d", &a, &b) == 2) {
        printf("%d\\n", a + b);
    }
    return 0;
}`,
        stdin: '3 4\n10 20',
        expectedOutput: '7\n30',
        lineByLine: [
          {
            lineNumber: 'Line 5',
            codeSnippet: 'while (scanf("%d %d", &a, &b) == 2)',
            whatItMeans: 'Loops as long as stdin provides two valid integers.',
            whyItIsThere: 'Handles variable number of test lines safely until EOF.',
            ifDeletedError: 'Reads only the first test case or runs infinite loop.',
          },
          {
            lineNumber: 'Line 6',
            codeSnippet: 'printf("%d\\n", a + b);',
            whatItMeans: 'Prints sum followed by mandatory newline separator.',
            whyItIsThere: 'Prevents "730" merged output bug.',
            ifDeletedError: 'Judge fails with Wrong Answer.',
          },
        ],
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 1',
        codeSnippet: '#include <stdio.h>',
        whatItMeans: 'Pulls standard I/O declarations into the translation unit.',
        whyItIsThere: 'Required before calling printf() or scanf().',
        ifDeletedError: 'Compiler error: undeclared printf/scanf.',
      },
      {
        lineNumber: 'Line 3',
        codeSnippet: 'int main(void)',
        whatItMeans: 'Program start symbol expected by the C runtime crt0.',
        whyItIsThere: 'Every hosted C program enters execution at main.',
        ifDeletedError: 'Linker fails: undefined reference to main.',
      },
      {
        lineNumber: 'Line 5',
        codeSnippet: 'return 0;',
        whatItMeans: 'Sends zero (EXIT_SUCCESS) back to parent shell.',
        whyItIsThere: 'Judges treat non-zero return codes as Runtime Error (RE).',
        ifDeletedError: 'Ambiguous exit code in older C89 compilers.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'Preprocessor runs', memoryOrStack: 'stdio.h expanded', note: 'Declarations loaded' },
      { step: 2, state: 'OS invokes main()', memoryOrStack: 'stack frame created', note: 'Entry instruction active' },
      { step: 3, state: 'printf executes', memoryOrStack: 'stdout="Hello, C23 World!"', note: 'Flushed to console' },
      { step: 4, state: 'return 0', memoryOrStack: 'exit_code=0', note: 'Frame freed cleanly' },
    ],
    harryBugTraps: [
      {
        title: 'Forgetting Semicolon (;) at End of Statement',
        brokenCode: 'printf("Hello")\\nreturn 0;',
        fixedCode: 'printf("Hello\\n");\\nreturn 0;',
        whyItBreaks: 'C treats newlines as whitespace, so missing ; causes a syntax error on the next line.',
      },
      {
        title: 'Missing & in scanf("%d", score)',
        brokenCode: 'int score; scanf("%d", score);',
        fixedCode: 'int score = 0; scanf("%d", &score);',
        whyItBreaks: 'Without &, scanf treats an uninitialized number as a memory address and crashes (Segfault).',
      },
      {
        title: 'Misspelling Main() with Capital M',
        brokenCode: 'int Main(void) { return 0; }',
        fixedCode: 'int main(void) { return 0; }',
        whyItBreaks: 'C is strictly case-sensitive; the linker searches exclusively for lowercase main.',
      },
    ],
    practiceSheet: [
      {
        id: 'c-ch-1-q1',
        difficulty: 'Easy',
        title: '1. First Welcome Message',
        prompt: 'Print exact text: Welcome to C23 Academy!',
        banglaHint: 'printf("Welcome to C23 Academy!\\n"); ব্যবহার করো।',
        starterCode: `#include <stdio.h>\nint main(void) {\n    printf("Welcome to C23 Academy!\\n");\n    return 0;\n}`,
        sampleStdin: '',
        expectedOutput: 'Welcome to C23 Academy!',
      },
      {
        id: 'c-ch-1-q2',
        difficulty: 'Easy',
        title: '2. Double an Input Integer',
        prompt: 'Read one integer n and print n * 2.',
        banglaHint: 'scanf("%d", &n); দিয়ে ইনপুট নিয়ে printf("%d\\n", n * 2); প্রিন্ট করো।',
        starterCode: `#include <stdio.h>\nint main(void) {\n    int n = 0;\n    if (scanf("%d", &n) == 1) printf("%d\\n", n * 2);\n    return 0;\n}`,
        sampleStdin: '19',
        expectedOutput: '38',
      },
      {
        id: 'c-ch-1-q3',
        difficulty: 'Medium',
        title: '3. Two-Line Formatted Banner',
        prompt: 'Print Line 1: Argon and Line 2: Code on separate lines.',
        banglaHint: 'দুই লাইনের মাঝে \\n ব্যবহার করো।',
        starterCode: `#include <stdio.h>\nint main(void) {\n    printf("Argon\\nCode\\n");\n    return 0;\n}`,
        sampleStdin: '',
        expectedOutput: 'Argon\nCode',
      },
      {
        id: 'c-ch-1-q4',
        difficulty: 'Hard',
        title: '4. EOF Sum Pair Loop',
        prompt: 'Read pairs (a, b) until EOF and print a + b on each line.',
        banglaHint: 'while (scanf("%d %d", &a, &b) == 2) লুপ ব্যবহার করো।',
        starterCode: `#include <stdio.h>\nint main(void) {\n    int a = 0, b = 0;\n    while (scanf("%d %d", &a, &b) == 2) printf("%d\\n", a + b);\n    return 0;\n}`,
        sampleStdin: '5 7\n10 25',
        expectedOutput: '12\n35',
      },
    ],
    miniBuild: {
      title: 'C23 Boot Diagnostics & Greeter',
      description: 'Reads user handle and ID, verifies compilation pipeline output, and prints clean formatted result.',
      banglaGoal: 'C23 প্রোগ্রামের স্ট্যান্ডার্ড ইনপুট ও আউটপুট মিলিয়ে মিনি প্রজেক্ট চালানো।',
      combinesChapters: 'Ch 1',
      starterCode: `#include <stdio.h>

int main(void) {
    char handle[32];
    int id = 0;
    if (scanf("%31s %d", handle, &id) == 2) {
        printf("Hello %s (#%d) — C23 Online!\\n", handle, id);
    }
    return 0;
}`,
      sampleStdin: 'Mina 101',
      expectedOutput: 'Hello Mina (#101) — C23 Online!',
    },
    starterCode: `#include <stdio.h>

int main(void) {
    char name[32];
    int val = 0;
    if (scanf("%31s %d", name, &val) == 2) {
        printf("Coder %s scored %d\\n", name, val * 2);
    }
    return 0;
}`,
    sampleStdin: 'Argon 21',
    expectedSampleOutput: 'Coder Argon scored 42',
    testCases: [
      { id: 'c1-t1', input: 'Argon 21', expectedOutput: 'Coder Argon scored 42' },
      { id: 'c1-t2', input: 'Rafi 15', expectedOutput: 'Coder Rafi scored 30', isHidden: true },
    ],
  },

  2: {
    chapterNumber: 2,
    title: 'C Chapter 2 (C23): Standard I/O, Formatting & Escape Sequences',
    banglaTitle: 'C অধ্যায় ২ (C23): স্ট্যান্ডার্ড I/O, ফরম্যাটিং ও এস্কেপ সিকোয়েন্স',
    subtitle: 'Master printf width/precision specifiers (%05d, %.2f), scanf whitespace behavior, and escape sequences.',
    zeroIntuition: {
      plainEnglishStory:
        'Standard input (stdin) and standard output (stdout) are raw byte streams managed by your operating system. printf acts like a precision stamp that formats binary memory into readable digits: %05d pads integers with leading zeros (00042), %.2f locks decimals to two places, and width modifiers align invoice tables cleanly.\n\nMeanwhile, escape sequences (\\n, \\t, \\\\, \\") encode invisible control characters or literal quotes inside string literals, and scanf parses formatted tokens back into RAM addresses—requiring careful whitespace discipline (such as " %c") when mixing numbers and characters.',
      asciiFlowchart: `  [ Raw Input Stream: "7 3.14159" ]
          |
          v  scanf("%d %lf", &id, &pi)
  [ RAM: id = 7 | pi = 3.14159 ]
          |
          v  printf("ID:%04d\\tPi:%.2f\\n", id, pi)
  [ stdout: "ID:0007    Pi:3.14" ]`,
      pseudocode: [
        '1. READ integer id and double price from stdin',
        '2. APPLY zero-padding %04d and 2-decimal %.2f formatting',
        '3. INSERT \\t tab or \\n newline escape sequences',
        '4. FLUSH formatted text to stdout',
      ],
      banglaZeroToHero: {
        analogyTitle: 'রসিদ প্রিন্টার ও এস্কেপ ক্যারেক্টার',
        explanation:
          'সুপারশপের বিল বা এটিএম রসিদ প্রিন্টারের কথা ভাবো—দাম সব সময় ঠিক দুই ঘর দশমিক (যেমন 45.50 টাকা) এবং রসিদ নম্বর 0007 এভাবে সুন্দর করে সাজানো থাকে। প্রোগ্রামিংয়ে ইনপুট (stdin) ও আউটপুট (stdout) আসলে অক্ষরের একটি প্রবাহ বা স্ট্রিম ছাড়া কিছু নয়। C ভাষায় printf() হলো এমন এক স্মার্ট স্ট্যাম্প যা %04d ব্যবহার করে সংখ্যার বামে শূন্য বসিয়ে ঘর পূরণ করে। দশমিক সংখ্যাকে বৈজ্ঞানিক চিহ্ন ছাড়া ঠিক দুই ঘরে আটকে রাখতে %.2f ফরম্যাট স্পেসিফায়ার ব্যবহার করা হয়। আবার স্ট্রিংয়ের ভেতর সরাসরি এন্টার বা ডাবল কোটেশন দিলে কম্পাইলার লাইনের সীমানা গুলিয়ে ফেলে। তাই ব্যাকস্ল্যাশ দিয়ে \\n (নতুন লাইন), \\t (ট্যাব স্পেস), \\" (আসল কোটেশন) এবং \\\\ (আসল ব্যাকস্ল্যাশ) এস্কেপ সিকোয়েন্স লেখা হয়। অপরদিকে কীবোর্ড থেকে ডেটা পড়ার সময় scanf-এ double-এর জন্য অবশ্যই %lf দিতে হয়, নইলে মেমোরি ভেঙে যায়। সবচেয়ে জরুরি কৌশল হলো সংখ্যার পর অক্ষর পড়তে গেলে " %c" লেখা, যাতে আগের এন্টার কীটি অক্ষর হিসেবে ঢুকে না পড়ে। টেবিলের কলাম বামে ও ডানে সাজাতে %-8s এবং %6.2f ব্যবহার করলে কনসোল আউটপুট পেশাদার ড্যাশবোর্ডের মতো দেখায়।',
        everydayExample:
          'ঘড়ির সময় দেখাতে আমরা "9:5" না লিখে "09:05" লিখি—C তে %02d ঠিক সেটাই করে দেয়!',
        keyTakeaways: [
          '%04d সংখ্যার বাম পাশে শূন্য বসিয়ে কমপক্ষে ৪ ঘর পূরণ করে।',
          'scanf-এ double পড়তে %lf লাগে, কিন্তু printf-এ %f বা %.2f দুটোই চলে।',
          '\\\\ লিখলে তবেই স্ক্রিনে একটি আসল ব্যাকস্ল্যাশ (\\) প্রিন্ট হয়।',
        ],
      },
    },
    topics: [
      {
        id: 'c-ch-2-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Escape Sequences: \\n, \\t, \\\\ and Escaped Quotes',
        englishParagraphs: [
          'Backslash characters begin special control codes inside C string literals. Without backslash escaping, a double quote inside printf would prematurely end the string and break compilation.',
          'Common escapes include \\n (newline), \\t (horizontal tab), \\" (literal double quote), and \\\\ (literal backslash).',
        ],
        banglaParagraphs: [
          'স্ট্রিংয়ের ভেতর সরাসরি এন্টার বা ডাবল কোটেশন দিলে কম্পাইলার বিভ্রান্ত হয়ে পড়ে। তাই ব্যাকস্ল্যাশ (\\) দিয়ে বিশেষ ক্যারেক্টার বোঝানো হয়—এগুলোই এস্কেপ সিকোয়েন্স।',
          '\\t দিলে মাঝখানে সুন্দর ট্যাব স্পেস তৈরি হয় এবং \\" দিলে আউটপুটে আসল কোটেশন চিহ্ন দেখা যায়।',
        ],
        memoryDiagram: `Literal: "A\\t\\"B\\""  --> ASCII Bytes: ['A', 0x09, '"', 'B', '"', '\\0']`,
        code: `#include <stdio.h>

int main(void) {
    printf("Item:\\t\\"Pen\\"\\nPath:\\tC:\\\\bin\\n");
    return 0;
}`,
        stdin: '',
        expectedOutput: 'Item:\t"Pen"\nPath:\tC:\\bin',
        lineByLine: [
          {
            lineNumber: 'Line 4',
            codeSnippet: 'Item:\\t\\"Pen\\"',
            whatItMeans: 'Prints tab after colon and quotes around Pen.',
            whyItIsThere: 'Demonstrates escaped tab and double quote.',
            ifDeletedError: 'Unescaped " triggers compile syntax error.',
          },
          {
            lineNumber: 'Line 4',
            codeSnippet: 'C:\\\\bin',
            whatItMeans: 'Double backslash prints a single literal \\.',
            whyItIsThere: 'Single \\b would be interpreted as backspace control character!',
            ifDeletedError: 'Wrong output due to \\b backspace escape.',
          },
        ],
      },
      {
        id: 'c-ch-2-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Zero-Padded Clock & Fixed-Decimal Invoice Line',
        englishParagraphs: [
          'printf format specifiers follow %[flags][width][.precision]type. Using %02d pads numbers less than 10 with a leading zero, ideal for timestamps.',
          'Combining multiple placeholders in one printf call minimizes expensive I/O syscalls.',
        ],
        banglaParagraphs: [
          'সময়ের ঘণ্টা-মিনিট (09:05) এবং পণ্যের দাম দশমিকের পর ২ ঘর পর্যন্ত দেখানোর জন্য %02d ও %.2f ফরম্যাট স্পেসিফায়ার অত্যন্ত দরকারি।',
          'একটি printf স্টেটমেন্টের ভেতরেই একাধিক ভ্যারিয়েবল সাজানো যায়।',
        ],
        memoryDiagram: `stdin: "9 5 49.5" -> hr=9, min=5, amt=49.5 -> "09:05 | Total: 49.50"`,
        code: `#include <stdio.h>

int main(void) {
    int hr = 0, min = 0;
    double amt = 0.0;
    if (scanf("%d %d %lf", &hr, &min, &amt) == 3) {
        printf("%02d:%02d | Total: %.2f\\n", hr, min, amt);
    }
    return 0;
}`,
        stdin: '9 5 49.5',
        expectedOutput: '09:05 | Total: 49.50',
        lineByLine: [
          {
            lineNumber: 'Line 6',
            codeSnippet: 'scanf("%d %d %lf", &hr, &min, &amt)',
            whatItMeans: 'Reads two ints and one 64-bit double float.',
            whyItIsThere: 'scanf requires %lf specifically for double precision pointers.',
            ifDeletedError: 'Using %f for double corrupts memory in scanf!',
          },
          {
            lineNumber: 'Line 7',
            codeSnippet: '%02d:%02d | Total: %.2f',
            whatItMeans: 'Zero-pads integers to 2 digits and locks decimal to 2 places.',
            whyItIsThere: 'Enforces uniform human-readable alignment.',
            ifDeletedError: 'Prints "9:5 | Total: 49.500000".',
          },
        ],
      },
      {
        id: 'c-ch-2-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Left/Right Aligned Receipt Column Table',
        englishParagraphs: [
          'Command-line dashboards use negative width (%-10s) for left-aligned text labels and positive width (%6.2f) for right-aligned monetary numbers.',
          'Right-aligning numbers ensures decimal points stack vertically for clean visual scanning.',
        ],
        banglaParagraphs: [
          'টার্মিনালে সুন্দর টেবিল আকারে বিল প্রিন্ট করতে %-10s (বামে অ্যালাইন) এবং %6.2f (ডানে অ্যালাইন) ব্যবহার করা হয়।',
          'এতে পণ্যের নাম বামে এবং দামগুলো ডান দিকে এক সরলরেখায় থাকে।',
        ],
        memoryDiagram: `Col 1: %-8s ("Tea     ") | Col 2: %6.2f (" 15.50")`,
        code: `#include <stdio.h>

int main(void) {
    char item[32];
    double price = 0.0;
    if (scanf("%31s %lf", item, &price) == 2) {
        printf("%-8s %6.2f\\n", item, price);
    }
    return 0;
}`,
        stdin: 'Coffee 120.5',
        expectedOutput: 'Coffee   120.50',
        lineByLine: [
          {
            lineNumber: 'Line 7',
            codeSnippet: '%-8s',
            whatItMeans: 'Prints string padded with spaces on the right to width 8.',
            whyItIsThere: 'Aligns numeric column cleanly regardless of word length.',
            ifDeletedError: 'Columns shift jaggedly.',
          },
          {
            lineNumber: 'Line 7',
            codeSnippet: '%6.2f',
            whatItMeans: 'Right-aligns float inside a 6-character column with 2 decimals.',
            whyItIsThere: 'Keeps decimal digits aligned vertically.',
            ifDeletedError: 'Prints raw 6 decimal digits.',
          },
        ],
      },
      {
        id: 'c-ch-2-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'scanf Newline Buffer Trap & Space Before %c Fix',
        englishParagraphs: [
          'A notorious C bug happens when reading an integer followed by a character: scanf("%d", &n) leaves the trailing \\n keystroke in stdin, so scanf("%c", &ch) immediately reads \\n instead of the letter!',
          'Prefixing %c with a leading space (" %c") instructs scanf to discard all leftover whitespace and newlines automatically.',
        ],
        banglaParagraphs: [
          'C প্রোগ্রামারদের সবচেয়ে পরিচিত একটি বাগ হলো সংখ্যার পর অক্ষর পড়তে গেলে scanf("%c")-তে আগের এন্টার (\\n) ঢুকে যাওয়া!',
          'এর সহজ সমাধান হলো %c এর আগে একটি স্পেস দিয়ে " %c" লেখা—এতে scanf সব ফাঁকা জায়গা ও এন্টার উপেক্ষা করে আসল অক্ষরটি পড়ে নেবে।',
        ],
        memoryDiagram: `stdin: "5\\nA" -> %d reads 5 (leaves '\\n') -> " %c" skips '\\n', reads 'A'!`,
        code: `#include <stdio.h>

int main(void) {
    int n = 0;
    char ch = '?';
    if (scanf("%d", &n) == 1 && scanf(" %c", &ch) == 1) {
        printf("n=%d char=%c\\n", n, ch);
    }
    return 0;
}`,
        stdin: '5\nA',
        expectedOutput: 'n=5 char=A',
        lineByLine: [
          {
            lineNumber: 'Line 6',
            codeSnippet: 'scanf(" %c", &ch)',
            whatItMeans: 'Leading space consumes all whitespace including \\n before reading 1 char.',
            whyItIsThere: 'Avoids capturing leftover newline from previous integer input.',
            ifDeletedError: 'ch becomes "\\n" instead of "A"!',
          },
        ],
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 1',
        codeSnippet: '#include <stdio.h>',
        whatItMeans: 'Imports standard formatted I/O prototypes including printf and scanf.',
        whyItIsThere: 'Required so C compiler validates printf format call.',
        ifDeletedError: 'Compile error: implicit declaration of printf.',
      },
      {
        lineNumber: 'Line 3',
        codeSnippet: 'int main(void) {',
        whatItMeans: 'Defines main entry point taking zero parameters.',
        whyItIsThere: 'OS runtime loader starts executing instructions here.',
        ifDeletedError: 'Linker error: undefined reference to main.',
      },
      {
        lineNumber: 'Line 4',
        codeSnippet: 'printf("Item:\\t\\"Pen\\"\\nPath:\\tC:\\\\bin\\n");',
        whatItMeans: 'Uses \\t tab, \\" literal quotes, \\n newline, and \\\\ literal backslash escapes.',
        whyItIsThere: 'Renders control characters and quotes cleanly without prematurely closing the string.',
        ifDeletedError: 'Unescaped quotes break compilation; no text reaches stdout.',
      },
      {
        lineNumber: 'Line 5',
        codeSnippet: 'return 0;',
        whatItMeans: 'Returns zero exit status to the operating system.',
        whyItIsThere: 'Signals clean execution with zero runtime failure.',
        ifDeletedError: 'Exit code depends on C standard default.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'scanf reads 9, 5, 49.5', memoryOrStack: 'hr=9, min=5, amt=49.5', note: 'Stored on stack' },
      { step: 2, state: 'Format %02d applies to hr=9', memoryOrStack: 'buf="09"', note: 'Leading 0 padded' },
      { step: 3, state: 'Format %.2f applies to amt', memoryOrStack: 'buf="49.50"', note: '2 decimals fixed' },
      { step: 4, state: 'Output complete string', memoryOrStack: 'stdout="09:05 | Total: 49.50"', note: 'Clean exit' },
    ],
    harryBugTraps: [
      {
        title: 'Using %f Instead of %lf in scanf for double',
        brokenCode: 'double x; scanf("%f", &x);',
        fixedCode: 'double x; scanf("%lf", &x);',
        whyItBreaks: '%f reads only 4 bytes (float) into an 8-byte double, leaving half its bits corrupt.',
      },
      {
        title: 'Missing Space Before %c in scanf',
        brokenCode: 'scanf("%d", &n); scanf("%c", &c);',
        fixedCode: 'scanf("%d %c", &n, &c);',
        whyItBreaks: '%c does not skip whitespace by default, so it swallows the newline after n.',
      },
      {
        title: 'Printing Literal % Using Single %',
        brokenCode: 'printf("100% done");',
        fixedCode: 'printf("100%% done");',
        whyItBreaks: 'Single % starts a format specifier; double %% prints one literal percent sign.',
      },
    ],
    practiceSheet: [
      {
        id: 'c-ch-2-q1',
        difficulty: 'Easy',
        title: '1. Pad Ticket Number to 5 Digits',
        prompt: 'Read integer t and print it zero-padded to 5 digits (e.g., 42 -> 00042).',
        banglaHint: 'printf("%05d\\n", t); ব্যবহার করো।',
        starterCode: `#include <stdio.h>\nint main(void) {\n    int t = 0;\n    if (scanf("%d", &t) == 1) printf("%05d\\n", t);\n    return 0;\n}`,
        sampleStdin: '42',
        expectedOutput: '00042',
      },
      {
        id: 'c-ch-2-q2',
        difficulty: 'Easy',
        title: '2. Round Average to 3 Decimals',
        prompt: 'Read a double x and print x divided by 2 rounded to 3 decimal places.',
        banglaHint: '%.3f দিয়ে ঠিক ৩ ঘর দশমিক প্রিন্ট করো।',
        starterCode: `#include <stdio.h>\nint main(void) {\n    double x = 0;\n    if (scanf("%lf", &x) == 1) printf("%.3f\\n", x / 2.0);\n    return 0;\n}`,
        sampleStdin: '15.0',
        expectedOutput: '7.500',
      },
      {
        id: 'c-ch-2-q3',
        difficulty: 'Medium',
        title: '3. Quoted Tag Printer',
        prompt: 'Read word w and print "Tag: <w>" including literal double quotes around the whole string.',
        banglaHint: 'স্ট্রিংয়ের ভেতর \\" ব্যবহার করো।',
        starterCode: `#include <stdio.h>\nint main(void) {\n    char w[32];\n    if (scanf("%31s", w) == 1) printf("\\"Tag: %s\\"\\n", w);\n    return 0;\n}`,
        sampleStdin: 'C23',
        expectedOutput: '"Tag: C23"',
      },
      {
        id: 'c-ch-2-q4',
        difficulty: 'Hard',
        title: '4. Multi-Line Int + Char Parser',
        prompt: 'Read integer k on line 1 and single character c on line 2; print "<c>:<k>".',
        banglaHint: '" %c" ফরম্যাটে স্পেস দিতে ভুলবে না!',
        starterCode: `#include <stdio.h>\nint main(void) {\n    int k = 0; char c = 0;\n    if (scanf("%d %c", &k, &c) == 2) printf("%c:%d\\n", c, k);\n    return 0;\n}`,
        sampleStdin: '7\nZ',
        expectedOutput: 'Z:7',
      },
    ],
    miniBuild: {
      title: 'Formatted Time & Currency Formatter',
      description: 'Reads hour, minute, and price from stdin and prints a clean padded clock & currency line.',
      banglaGoal: 'সময় ও টাকার মান নিখুঁত ফরম্যাটে প্রিন্ট করা।',
      combinesChapters: 'Ch 1–2',
      starterCode: `#include <stdio.h>

int main(void) {
    int hr = 0, min = 0;
    double amt = 0.0;
    if (scanf("%d %d %lf", &hr, &min, &amt) == 3) {
        printf("%02d:%02d | Total: %.2f\\n", hr, min, amt);
    }
    return 0;
}`,
      sampleStdin: '9 5 49.5',
      expectedOutput: '09:05 | Total: 49.50',
    },
    starterCode: `#include <stdio.h>

int main(void) {
    int hr = 0, min = 0;
    double amt = 0.0;
    if (scanf("%d %d %lf", &hr, &min, &amt) == 3) {
        printf("%02d:%02d | Total: %.2f\\n", hr, min, amt);
    }
    return 0;
}`,
    sampleStdin: '9 5 49.5',
    expectedSampleOutput: '09:05 | Total: 49.50',
    testCases: [
      { id: 'c2-t1', input: '9 5 49.5', expectedOutput: '09:05 | Total: 49.50' },
      { id: 'c2-t2', input: '14 30 9.1', expectedOutput: '14:30 | Total: 9.10', isHidden: true },
    ],
  },

  3: {
    chapterNumber: 3,
    title: 'C Chapter 3 (C23): Variables, Data Types, RAM Sizes & Integer Overflow',
    banglaTitle: 'C অধ্যায় ৩ (C23): ভ্যারিয়েবল, ডেটা টাইপ, RAM সাইজ ও ইন্টিজার ওভারফ্লো',
    subtitle: 'Fixed-width types (int vs long long, uint64_t), IEEE-754 floating-point pitfalls, and casting before multiplication.',
    zeroIntuition: {
      plainEnglishStory:
        'A variable is a labeled box carved out of RAM with a fixed byte capacity dictated by its C type. A standard 32-bit signed int holds values up to ~2.14 billion (2,147,483,647). If you multiply 100,000 × 100,000 using two 32-bit int operands, the binary result exceeds 31 value bits and overflows BEFORE assignment even happens!\n\nPromoting at least one operand to 64-bit long long (1LL * a * b) expands the ALU register to 8 bytes (up to ~9.22 × 10^18), preventing silent wraparound. Similarly, casting (double)total / count avoids integer floor truncation when fractional precision matters, while <stdint.h> types like int64_t guarantee identical bit widths across every CPU.',
      asciiFlowchart: `  [ a = 100000 (32-bit), b = 100000 (32-bit) ]
        |
        +--> BAD:  int p = a * b        --> overflows 32 bits -> 1410065408 (CORRUPT!)
        |
        +--> GOOD: long long p = 1LL * a * b --> 64-bit safe -> 10000000000 (EXACT!)`,
      pseudocode: [
        '1. READ integers a and b up to 10^9',
        '2. CONVERT at least one operand to 64-bit long long (1LL * a)',
        '3. COMPUTE product inside 64-bit register',
        '4. PRINT exact 64-bit value with %lld',
      ],
      banglaZeroToHero: {
        analogyTitle: 'টিফিন বক্স বনাম বড় ফ্যামিলি হটপট (Overflow Trap)',
        explanation:
          'ধরো একটি ছোট টিফিন বক্সে সর্বোচ্চ ৫০০ গ্রাম ভাত ধরে, কিন্তু তুমি তাতে ১ কেজি ভাত ঢাললে খাবার উপচে পড়ে নষ্ট হবেই! কম্পিউটারের RAM-এ প্রতিটি ভ্যারিয়েবলও ঠিক এমনই নির্দিষ্ট বাইটের একটি বাক্স: char নেয় ১ বাইট, int নেয় ৪ বাইট (সর্বোচ্চ প্রায় ২.১৪ × ১০^৯), এবং long long নেয় ৮ বাইট। তুমি যদি দুটি ৩২-বিট int ভ্যারিয়েবল (১ লক্ষ × ১ লক্ষ = ১০^১০) গুণ করো, তবে অ্যাসাইনমেন্টের আগেই CPU-র ৩২-বিট রেজিস্টারে মান উপচে পড়ে—যাকে Integer Overflow বলে। সবচেয়ে বড় ফাঁদ হলো বাম পাশে long long লিখলেও ডান পাশের int * int আগেই ভুল মান বানিয়ে ফেলে! তাই গুণ করার শুরুতেই 1LL * a * b লিখে পুরো হিসাবটিকে ৬৪-বিটে উন্নীত করতে হয়। একইভাবে দুটি পূর্ণসংখ্যা ভাগ করলে (যেমন 7 / 2) দশমিক অংশ কেটে গিয়ে কেবল 3 আসে, যা ঠিক করতে (double) কাস্টিং প্রয়োজন। পোর্টেবল সিস্টেম কোডে <stdint.h>-এর int64_t ব্যবহার করলে সব মেশিনে ঠিক ৬৪ বিট নিশ্চিত থাকে। সব ভ্যারিয়েবল ডিক্লেয়ার করার সাথে সাথে ০ দিয়ে ইনিশিয়ালাইজ করলে পুরনো গার্বেজ মান ঢোকার কোনো সুযোগ থাকে না।',
        everydayExample:
          'যাত্রীর সংখ্যা ১ লক্ষ এবং প্রতি টিকিট ১ লক্ষ টাকা হলে মোট হিসাব ১০^১০, যা ৩২-বিট int-এ ধরবে না—long long না দিলে টোটাল হিসাব ভুল হয়ে মাইনাস দেখাবে!',
        keyTakeaways: [
          '32-bit int সীমা: প্রায় ±2.14 × 10^9; 64-bit long long সীমা: ±9.22 × 10^18।',
          'গুণ করার আগেই 1LL * a * b লিখতে হবে, নইলে গুণ করার সময়ই ওভারফ্লো ঘটে যায়।',
          '<stdint.h>-এর int64_t বা uint64_t সব প্ল্যাটফর্মে নির্দিষ্ট বিট-সাইজ নিশ্চিত করে।',
        ],
      },
    },
    topics: [
      {
        id: 'c-ch-3-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Inspecting RAM Footprint of Core C23 Data Types',
        englishParagraphs: [
          'Every C type occupies a predictable byte count in RAM: char is 1 byte, int is typically 4 bytes, long long is at least 8 bytes, and double provides ~15 decimal digits of precision in 8 bytes.',
          'Explicit initialization prevents reading random leftover electrical garbage from previously used stack memory.',
        ],
        banglaParagraphs: [
          'RAM-এ char ১ বাইট, int ৪ বাইট এবং long long ৮ বাইট জায়গা নেয়। প্রোগ্রামিংয়ে সব সময় ভ্যারিয়েবল ডিক্লেয়ার করার সাথে সাথে প্রাথমিক মান (যেমন = 0) বসিয়ে দেওয়া ভালো অভ্যাস।',
          'নিচের কোডে sizeof() দিয়ে প্রতিটি টাইপ মেমোরিতে কত বাইট নিচ্ছে তা সরাসরি দেখা যাচ্ছে।',
        ],
        memoryDiagram: `Stack: [ c:1B ] [ i:4B ] [ ll:8B ] [ d:8B ]`,
        code: `#include <stdio.h>

int main(void) {
    char grade = 'A';
    int age = 20;
    long long pop = 8000000000LL;
    printf("%c %d %lld | bytes(ll)=%zu\\n", grade, age, pop, sizeof(pop));
    return 0;
}`,
        stdin: '',
        expectedOutput: 'A 20 8000000000 | bytes(ll)=8',
        lineByLine: [
          {
            lineNumber: 'Line 6',
            codeSnippet: 'long long pop = 8000000000LL;',
            whatItMeans: 'Stores 8 billion using LL suffix in a 64-bit signed integer.',
            whyItIsThere: '8 billion exceeds 32-bit int limit (2.14 billion).',
            ifDeletedError: 'Compile warning & value wraps if stored in int.',
          },
          {
            lineNumber: 'Line 7',
            codeSnippet: '%lld',
            whatItMeans: 'Format specifier for 64-bit signed long long.',
            whyItIsThere: '%d only reads 32 bits and prints corrupted upper digits.',
            ifDeletedError: 'Garbage output on screen.',
          },
        ],
      },
      {
        id: 'c-ch-3-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Type Casting Integer Division to Double Precision',
        englishParagraphs: [
          'Dividing two integers in C (e.g., 7 / 2) performs integer floor division and discards the remainder, yielding 3 instead of 3.5.',
          'Casting one operand explicitly to (double) forces floating-point arithmetic without losing fractional accuracy.',
        ],
        banglaParagraphs: [
          'C-তে দুটি পূর্ণসংখ্যা ভাগ করলে (যেমন ৭ / ২) ফলাফল সবসময় পূর্ণসংখ্যা ৩ আসে—দশমিক অংশ হারিয়ে যায়! একে Integer Division বলে।',
          'সঠিক দশমিক ভাগফল পেতে (double)sum / count এভাবে অন্তত একটি অংশকে double-এ টাইপ-কাস্ট করে নিতে হয়।',
        ],
        memoryDiagram: `total=7 (int), n=2 (int) -> (double)7 / 2 -> 3.50`,
        code: `#include <stdio.h>

int main(void) {
    int total = 0, count = 0;
    if (scanf("%d %d", &total, &count) == 2 && count > 0) {
        double avg = (double)total / count;
        printf("Avg: %.2f\\n", avg);
    }
    return 0;
}`,
        stdin: '7 2',
        expectedOutput: 'Avg: 3.50',
        lineByLine: [
          {
            lineNumber: 'Line 6',
            codeSnippet: '(double)total / count',
            whatItMeans: 'Promotes total to IEEE-754 double before dividing.',
            whyItIsThere: 'Prevents truncation from 3.5 down to 3.0.',
            ifDeletedError: 'Prints "Avg: 3.00" instead of "Avg: 3.50".',
          },
        ],
      },
      {
        id: 'c-ch-3-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Fixed-Width <stdint.h> Memory Byte Calculator',
        englishParagraphs: [
          'Modern C systems code prefers exact-width integer types like int64_t and uint32_t from <stdint.h> paired with <inttypes.h> macros like PRId64 so behavior is identical on ARM servers and x86 laptops.',
          'Here we compute total RAM bytes needed for n 64-bit records safely.',
        ],
        banglaParagraphs: [
          'বড় সফটওয়্যার ও এমবেডেড সিস্টেমে <stdint.h> থেকে int64_t ব্যবহার করা হয় যাতে সব কম্পিউটারে বিটের সংখ্যা ঠিক ৬৪ থাকে।',
          'নিচের মিনি প্রোগ্রামটি n-সংখ্যক ৬৪-বিট রেকর্ডের জন্য মোট কত কিলোবাইট RAM লাগবে তা হিসাব করে।',
        ],
        memoryDiagram: `n=2048 -> bytes = 2048 * 8 = 16384 -> KB = 16`,
        code: `#include <inttypes.h>
#include <stdint.h>
#include <stdio.h>

int main(void) {
    int64_t n = 0;
    if (scanf("%" SCNd64, &n) == 1) {
        int64_t kb = (n * (int64_t)sizeof(int64_t)) / 1024;
        printf("%" PRId64 " KB\\n", kb);
    }
    return 0;
}`,
        stdin: '2048',
        expectedOutput: '16 KB',
        lineByLine: [
          {
            lineNumber: 'Line 2',
            codeSnippet: '#include <stdint.h>',
            whatItMeans: 'Imports portable fixed-width types like int64_t.',
            whyItIsThere: 'Guarantees exact 64-bit width across all CPUs.',
            ifDeletedError: 'Compile error: unknown type name int64_t.',
          },
          {
            lineNumber: 'Line 9',
            codeSnippet: 'PRId64',
            whatItMeans: 'Portable macro expanding to lld or ld depending on OS ABI.',
            whyItIsThere: 'Eliminates printf format warnings between Linux and Windows.',
            ifDeletedError: 'Syntax error on format string.',
          },
        ],
      },
      {
        id: 'c-ch-3-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Preventing int * int Overflow Using 1LL Prefix',
        englishParagraphs: [
          'In Codeforces, reading two 32-bit inputs up to 10^9 and writing long long ans = a * b; STILL overflows! Why? Because C evaluates a * b in 32-bit int first before assigning it to ans.',
          'Multiplying by 1LL (1LL * a * b) promotes the expression left-to-right to 64-bit long long BEFORE the multiplication instruction runs.',
        ],
        banglaParagraphs: [
          'Codeforces-এ সবচেয়ে মারাত্মক একটি ফাঁদ হলো: int a = 100000, b = 100000; long long ans = a * b; লিখলেও ওভারফ্লো হয়! কারণ ডান পাশে গুণটা আগে ৩২-বিট int-এই ঘটে যায়।',
          'সব সময় গুণের শুরুতে 1LL * a * b অথবা ইনপুটই সরাসরি long long-এ নিলে আর কোনো ওভারফ্লো হবে না।',
        ],
        memoryDiagram: `int a=100000, b=100000 -> 1LL*a*b -> 10000000000 (Safe 64-bit)`,
        code: `#include <stdio.h>

int main(void) {
    int a = 0, b = 0;
    if (scanf("%d %d", &a, &b) == 2) {
        long long area = 1LL * a * b;
        printf("%lld\\n", area);
    }
    return 0;
}`,
        stdin: '100000 100000',
        expectedOutput: '10000000000',
        lineByLine: [
          {
            lineNumber: 'Line 6',
            codeSnippet: '1LL * a * b',
            whatItMeans: 'Promotes intermediate multiplication to signed 64-bit integer.',
            whyItIsThere: '32-bit product of 10^5 * 10^5 = 10^10 overflows int.',
            ifDeletedError: 'Wrong Answer (prints 1410065408 instead of 10000000000).',
          },
        ],
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 1',
        codeSnippet: '#include <stdio.h>',
        whatItMeans: 'Provides printf() declaration for console output.',
        whyItIsThere: 'Required for printing character, integer, and size_t metrics.',
        ifDeletedError: 'Compile error: implicit declaration of printf.',
      },
      {
        lineNumber: 'Line 4',
        codeSnippet: "char grade = 'A';",
        whatItMeans: 'Allocates 1 byte on the stack storing ASCII code 65.',
        whyItIsThere: 'Demonstrates compact single-byte character representation.',
        ifDeletedError: 'Undeclared variable grade in printf.',
      },
      {
        lineNumber: 'Line 5',
        codeSnippet: 'int age = 20;',
        whatItMeans: 'Allocates 4-byte 32-bit signed integer on stack.',
        whyItIsThere: 'Handles everyday integers up to ~2.14e9.',
        ifDeletedError: 'Undeclared variable age.',
      },
      {
        lineNumber: 'Line 6',
        codeSnippet: 'long long pop = 8000000000LL;',
        whatItMeans: 'Allocates 8-byte 64-bit signed integer using LL literal suffix.',
        whyItIsThere: '8 billion overflows 32-bit int immediately.',
        ifDeletedError: 'Missing variable pop causes compile error.',
      },
      {
        lineNumber: 'Line 7',
        codeSnippet: 'printf("%c %d %lld | bytes(ll)=%zu\\n", grade, age, pop, sizeof(pop));',
        whatItMeans: 'Matches exact format specifiers (%c, %d, %lld, %zu) to each type.',
        whyItIsThere: 'Mismatched format specifiers trigger Undefined Behavior in C.',
        ifDeletedError: 'Produces empty output.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'Read 32-bit ints', memoryOrStack: 'a=100000, b=100000', note: 'Inside 4-byte int' },
      { step: 2, state: 'Evaluate 1LL * a', memoryOrStack: 'tmp=100000LL (64-bit)', note: 'Widened to 8 bytes' },
      { step: 3, state: 'Multiply tmp * b', memoryOrStack: 'area=10000000000LL', note: 'No overflow!' },
      { step: 4, state: 'printf %lld', memoryOrStack: 'stdout="10000000000"', note: 'Exact CP answer' },
    ],
    harryBugTraps: [
      {
        title: 'Multiplying Two ints Before Assigning to long long',
        brokenCode: 'int a = 100000, b = 100000; long long ans = a * b;',
        fixedCode: 'int a = 100000, b = 100000; long long ans = 1LL * a * b;',
        whyItBreaks: 'Right-hand side is evaluated as 32-bit int overflow first.',
      },
      {
        title: 'Using Integer Division for Percentages',
        brokenCode: 'double p = 3 / 4 * 100;',
        fixedCode: 'double p = (3.0 / 4.0) * 100;',
        whyItBreaks: '3 / 4 evaluates to integer 0 before multiplying by 100.',
      },
      {
        title: 'Signed Overflow Undefined Behavior',
        brokenCode: 'int x = 2147483647; x = x + 1;',
        fixedCode: 'long long x = 2147483647LL; x = x + 1;',
        whyItBreaks: 'Exceeding INT_MAX invokes Undefined Behavior in C; compilers may optimize away safety checks.',
      },
    ],
    practiceSheet: [
      {
        id: 'c-ch-3-q1',
        difficulty: 'Easy',
        title: '1. 64-Bit Rectangle Area',
        prompt: 'Read two ints w and h (up to 10^9) and print exact 64-bit w * h.',
        banglaHint: '1LL * w * h ব্যবহার করো।',
        starterCode: `#include <stdio.h>\nint main(void) {\n    int w = 0, h = 0;\n    if (scanf("%d %d", &w, &h) == 2) printf("%lld\\n", 1LL * w * h);\n    return 0;\n}`,
        sampleStdin: '50000 60000',
        expectedOutput: '3000000000',
      },
      {
        id: 'c-ch-3-q2',
        difficulty: 'Easy',
        title: '2. Exact Fractional Average',
        prompt: 'Read two integers a and b and print (a + b) / 2.0 to 2 decimals.',
        banglaHint: '2.0 দিয়ে ভাগ করলে ফ্লোট উত্তর পাওয়া যাবে।',
        starterCode: `#include <stdio.h>\nint main(void) {\n    int a = 0, b = 0;\n    if (scanf("%d %d", &a, &b) == 2) printf("%.2f\\n", (a + b) / 2.0);\n    return 0;\n}`,
        sampleStdin: '5 8',
        expectedOutput: '6.50',
      },
      {
        id: 'c-ch-3-q3',
        difficulty: 'Medium',
        title: '3. Sum of First N Natural Numbers (1..N)',
        prompt: 'Given N up to 10^9, compute N * (N + 1) / 2 without overflowing.',
        banglaHint: 'N * (N + 1) হিসাব করতে অবশ্যই long long ব্যবহার করো।',
        starterCode: `#include <stdio.h>\nint main(void) {\n    long long n = 0;\n    if (scanf("%lld", &n) == 1) printf("%lld\\n", n * (n + 1) / 2);\n    return 0;\n}`,
        sampleStdin: '100000',
        expectedOutput: '5000050000',
      },
      {
        id: 'c-ch-3-q4',
        difficulty: 'Hard',
        title: '4. Overflow-Safe Cube Modulo 10^9+7',
        prompt: 'Read integer x (up to 10^6) and print x^3 mod 1000000007.',
        banglaHint: 'প্রতিটি গুণের পর % MOD না করলে 10^18 ছাড়িয়ে যেতে পারে!',
        starterCode: `#include <stdio.h>\nint main(void) {\n    long long x = 0, mod = 1000000007LL;\n    if (scanf("%lld", &x) == 1) {\n        long long sq = (x % mod) * (x % mod) % mod;\n        printf("%lld\\n", (sq * (x % mod)) % mod);\n    }\n    return 0;\n}`,
        sampleStdin: '100000',
        expectedOutput: '999999937',
      },
    ],
    miniBuild: {
      title: '64-Bit Safe Multiplier Engine',
      description: 'Multiplies large integer bounds without 32-bit overflow using 1LL promotion.',
      banglaGoal: '৩২-বিট ওভারফ্লো এড়িয়ে বড় সংখ্যার নিখুঁত গুণফল বের করা।',
      combinesChapters: 'Ch 1–3',
      starterCode: `#include <stdio.h>

int main(void) {
    int a = 0, b = 0;
    if (scanf("%d %d", &a, &b) == 2) {
        long long area = 1LL * a * b;
        printf("%lld\\n", area);
    }
    return 0;
}`,
      sampleStdin: '100000 100000',
      expectedOutput: '10000000000',
    },
    starterCode: `#include <stdio.h>

int main(void) {
    int a = 0, b = 0;
    if (scanf("%d %d", &a, &b) == 2) {
        long long area = 1LL * a * b;
        printf("%lld\\n", area);
    }
    return 0;
}`,
    sampleStdin: '100000 100000',
    expectedSampleOutput: '10000000000',
    testCases: [
      { id: 'c3-t1', input: '100000 100000', expectedOutput: '10000000000' },
      { id: 'c3-t2', input: '1000000000 3', expectedOutput: '3000000000', isHidden: true },
    ],
  },

  4: {
    chapterNumber: 4,
    title: 'C Chapter 4 (C23): Arithmetic, Relational, Logical & Assignment Operators',
    banglaTitle: 'C অধ্যায় ৪ (C23): অ্যারিথমেটিক, রিলেশনাল, লজিক্যাল ও অ্যাসাইনমেন্ট অপারেটর',
    subtitle: 'Precedence rules, negative modulo normalization, short-circuit &&/|| evaluation, and compound assignments.',
    zeroIntuition: {
      plainEnglishStory:
        'Operators are the verbs that drive calculations and boolean decisions in C23. Arithmetic operators (+, -, *, /, %) crunch numbers with strict precedence—multiplication, division, and modulo always bind tighter than addition or subtraction unless grouped by parentheses.\n\nRelational operators (==, !=, <, >=) return canonical 1 or 0, while logical operators (&&, ||, !) combine predicates using left-to-right short-circuiting so guarded expressions like b != 0 && a % b == 0 never crash on division by zero. Always normalize negative remainders using ((a % m) + m) % m since C’s % retains the dividend’s negative sign.',
      asciiFlowchart: `  [ Expression: (b != 0 && a / b > 2) ]
          |
          +--> b == 0 ? --(YES)--> Short-circuits! Skips (a / b) -> Result = 0 (Safe!)
          |
          +--(NO)--> Evaluates (a / b > 2) -> Returns 1 or 0`,
      pseudocode: [
        '1. READ two integers a and b',
        '2. CHECK safe division guard (b != 0)',
        '3. COMPUTE positive modulo: ((a % m) + m) % m',
        '4. APPLY compound assignment (+=, *=) and output result',
      ],
      banglaZeroToHero: {
        analogyTitle: 'দরজার তালা ও শর্ট-সার্কিট নিরাপত্তা',
        explanation:
          'লজিক্যাল && (AND) হলো দুটি তালাওয়ালা নিরাপত্তা গেটের মতো—প্রথম চাবিটাই না মিললে প্রহরী দ্বিতীয় তালা খুলতে গিয়ে সময়ই নষ্ট করে না! প্রোগ্রামিংয়ে এই বুদ্ধিমান আচরণকে Short-Circuit Evaluation বলে। যেমন তুমি যদি লিখো (b != 0 && a / b > 2), তবে b শূন্য হলে প্রোগ্রামটি ডান পাশের ভাগ করার আগেই থেমে যাবে এবং ক্র্যাশ এড়াবে। সাধারণ গাণিতিক অপারেটর (+, -, *, /, %) ব্যবহারের সময় অগ্রাধিকার বা Precedence খুব জরুরি—গুণ ও ভাগের কাজ যোগ-বিয়োগের আগে হয়। আরেকটি মারাত্মক C ফাঁদ হলো অঙ্কের মতো 1 <= x <= 10 লেখা; এতে কম্পাইলার প্রথমে (1 <= x) হিসাব করে ০ বা ১ পায়, যা সব সময় <= 10 হয় এবং ভুল উত্তর দেয়! তাই দুটি শর্ত জুড়তে সব সময় x >= 1 && x <= 10 লিখতে হয়। শর্তের ভেতর তুলনা করতে == ব্যবহার করবে, কারণ একক = দিলে সেটি মান বসিয়ে ফেলে এবং অকারণে সত্য হয়ে যায়। সবচেয়ে দরকারি CP কৌশল হলো নেগেটিভ মডুলো ঠিক করা: C-তে -3 % 5 দিলে -3 আসে, তাই ((a % m) + m) % m লিখে উত্তর পজিটিভ [0..m-1]-এ রাখতে হয়। += বা *= দিয়ে ভ্যারিয়েবলের মান সংক্ষেপে ও পরিচ্ছন্নভাবে আপডেট করা যায়।',
        everydayExample:
          'বাইরে যাওয়ার আগে প্রথমে চেক করো টাকা আছে কি না (&&) তারপর দোকানে যাও—টাকাই না থাকলে দোকানে গিয়ে কোনো লাভ নেই!',
        keyTakeaways: [
          '= মানে মান বসানো (Assignment), আর == মানে সমান কি না যাচাই (Equality)।',
          'C-তে নেগেটিভ সংখ্যার ভাগশেষ (যেমন -1 % 5) -1 হয়! পজিটিভ রাখতে ((a % m) + m) % m ব্যবহার করো।',
          'a += 5 লেখা মানে a = a + 5 এর সংক্ষিপ্ত ও দ্রুত রূপ।',
        ],
      },
    },
    topics: [
      {
        id: 'c-ch-4-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Arithmetic, Quotient & Remainder (%) Operators',
        englishParagraphs: [
          'The modulo operator (%) computes the remainder after integer division and is indispensable for extracting digits (n % 10), checking even parity (n % 2 == 0), and wrapping circular indices.',
          'Multiplication (*), division (/), and modulo (%) have higher precedence than addition (+) and subtraction (-).',
        ],
        banglaParagraphs: [
          'ভাগশেষ বা রিমাইন্ডার অপারেটর (%) প্রোগ্রামিংয়ে সবচেয়ে বেশি ব্যবহৃত টুলের একটি—যেমন শেষ অঙ্ক বের করতে n % 10 বা জোড় সংখ্যা যাচাই করতে n % 2 ব্যবহার হয়।',
          'গুণের ও ভাগের অগ্রাধিকার (Precedence) যোগ-বিয়োগের চেয়ে বেশি—তাই জটিল সূত্রে সব সময় প্রথম বন্ধনী () ব্যবহার করা নিরাপদ।',
        ],
        memoryDiagram: `x=17, y=5 -> sum=22 | div=3 | rem=2`,
        code: `#include <stdio.h>

int main(void) {
    int x = 17, y = 5;
    printf("sum=%d div=%d rem=%d\\n", x + y, x / y, x % y);
    return 0;
}`,
        stdin: '',
        expectedOutput: 'sum=22 div=3 rem=2',
        lineByLine: [
          {
            lineNumber: 'Line 5',
            codeSnippet: 'x / y, x % y',
            whatItMeans: 'Computes integer quotient (3) and remainder (2).',
            whyItIsThere: '17 = 5 * 3 + 2.',
            ifDeletedError: 'Missing arguments for printf format placeholders.',
          },
        ],
      },
      {
        id: 'c-ch-4-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Relational & Logical Short-Circuit Validation',
        englishParagraphs: [
          'In C, false evaluates to 0 and any non-zero integer evaluates to true. Logical operators &&, ||, and ! always return canonical 0 or 1.',
          'Placing denominator != 0 on the left of && prevents division-by-zero crashes completely.',
        ],
        banglaParagraphs: [
          'C-তে শর্ত সত্য হলে ১ এবং মিথ্যা হলে ০ রিটার্ন হয়। && (AND) অপারেটরের বাম পাশে শূন্য-বিভাজন প্রতিরোধক শর্ত (b != 0) রাখলে শূন্য দিয়ে ভাগ করার ক্র্যাশ শতভাগ এড়ানো যায়।',
          'ইনপুটে প্রাপ্ত বয়স বা মান নির্দিষ্ট সীমার (যেমন ১৮ থেকে ৬০) মধ্যে আছে কি না তা && দিয়ে সহজেই চেক করা যায়।',
        ],
        memoryDiagram: `stdin: "10 2" -> b!=0 (true) && a%b==0 (true) -> Divisible=1`,
        code: `#include <stdio.h>

int main(void) {
    int a = 0, b = 0;
    if (scanf("%d %d", &a, &b) == 2) {
        int safe_div = (b != 0 && a % b == 0) ? 1 : 0;
        printf("Divisible=%d\\n", safe_div);
    }
    return 0;
}`,
        stdin: '10 2',
        expectedOutput: 'Divisible=1',
        lineByLine: [
          {
            lineNumber: 'Line 6',
            codeSnippet: '(b != 0 && a % b == 0)',
            whatItMeans: 'Verifies b is non-zero before computing modulo a % b.',
            whyItIsThere: 'Short-circuit prevents Floating Point Exception (SIGFPE) when b=0.',
            ifDeletedError: 'Crashes on input "10 0" if b != 0 guard is removed.',
          },
        ],
      },
      {
        id: 'c-ch-4-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Compound Assignments (+=, -=, *=) in Shopping Cart Billing',
        englishParagraphs: [
          'Compound operators (+=, *=, -=) modify a variable in place cleanly and express state transitions clearly in billing, counters, and accumulators.',
          'Notice how integer discount logic preserves exact pennies/taka before display.',
        ],
        banglaParagraphs: [
          'দৈনন্দিন বিলিং সিস্টেমে += বা *= এর মতো কম্পাউন্ড অপারেটর কোডকে সংক্ষিপ্ত ও পরিচ্ছন্ন রাখে।',
          'এখানে বেস প্রাইসের সাথে কর (Tax) যোগ এবং ডিসকাউন্ট বাদ দিয়ে চূড়ান্ত বিল বের করা হয়েছে।',
        ],
        memoryDiagram: `bill=100 -> +=20 (120) -> -=15 (105)`,
        code: `#include <stdio.h>

int main(void) {
    int bill = 0, tax = 0, disc = 0;
    if (scanf("%d %d %d", &bill, &tax, &disc) == 3) {
        bill += tax;
        bill -= disc;
        printf("Final=%d\\n", bill);
    }
    return 0;
}`,
        stdin: '100 20 15',
        expectedOutput: 'Final=105',
        lineByLine: [
          {
            lineNumber: 'Line 6',
            codeSnippet: 'bill += tax;',
            whatItMeans: 'Shorthand for bill = bill + tax.',
            whyItIsThere: 'Adds tax cleanly in one operation.',
            ifDeletedError: 'Tax omitted from bill.',
          },
        ],
      },
      {
        id: 'c-ch-4-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Normalizing Negative Modulo in C ((a % m + m) % m)',
        englishParagraphs: [
          'Unlike Python, C’s % operator keeps the sign of the dividend: (-3) % 5 evaluates to -3 instead of +2! Array indexing a[-3] immediately segfaults.',
          'Always normalize negative remainders using ((a % m) + m) % m whenever subtracting coordinates or modular hashes.',
        ],
        banglaParagraphs: [
          'পাইথনের মতো C-তে (-3 % 5) করলে উত্তর +2 আসে না, বরং -3 আসে! অ্যারের ইনডেক্স হিসেবে -3 ব্যবহার করলে প্রোগ্রাম ক্র্যাশ করবে।',
          'তাই Codeforces বা মডুলার গণিতে সব সময় ((a % m) + m) % m সূত্র ব্যবহার করলে উত্তর সর্বদা ০ থেকে m-1 এর ভেতর পজিটিভ থাকে।',
        ],
        memoryDiagram: `a=-3, m=5 -> (-3 % 5)=-3 -> (-3 + 5)=2 -> 2 % 5 = 2`,
        code: `#include <stdio.h>

int main(void) {
    long long a = 0, m = 1;
    if (scanf("%lld %lld", &a, &m) == 2 && m > 0) {
        long long norm = ((a % m) + m) % m;
        printf("%lld\\n", norm);
    }
    return 0;
}`,
        stdin: '-3 5',
        expectedOutput: '2',
        lineByLine: [
          {
            lineNumber: 'Line 6',
            codeSnippet: '((a % m) + m) % m',
            whatItMeans: 'Shifts negative remainder into [0, m - 1] range.',
            whyItIsThere: 'C remainder retains negative sign on negative dividends.',
            ifDeletedError: 'Prints "-3" instead of "2".',
          },
        ],
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 1',
        codeSnippet: '#include <stdio.h>',
        whatItMeans: 'Includes printf declaration from standard I/O.',
        whyItIsThere: 'Allows formatted output of arithmetic operators.',
        ifDeletedError: 'Compile error: printf undeclared.',
      },
      {
        lineNumber: 'Line 3',
        codeSnippet: 'int main(void) {',
        whatItMeans: 'Opens the main execution stack frame.',
        whyItIsThere: 'Every hosted C23 binary begins here.',
        ifDeletedError: 'Linker error: missing main symbol.',
      },
      {
        lineNumber: 'Line 4',
        codeSnippet: 'int x = 17, y = 5;',
        whatItMeans: 'Declares two stack integers initialized to 17 and 5.',
        whyItIsThere: 'Provides dividend and divisor for operator demonstration.',
        ifDeletedError: 'Compile error: x and y undefined.',
      },
      {
        lineNumber: 'Line 5',
        codeSnippet: 'printf("sum=%d div=%d rem=%d\\n", x + y, x / y, x % y);',
        whatItMeans: 'Prints sum (22), integer quotient (3), and remainder (2).',
        whyItIsThere: 'Highlights how / truncates toward zero while % yields leftover.',
        ifDeletedError: 'Program emits empty stdout.',
      },
      {
        lineNumber: 'Line 6',
        codeSnippet: 'return 0;',
        whatItMeans: 'Returns zero exit status cleanly.',
        whyItIsThere: 'Indicates normal completion to judge harness.',
        ifDeletedError: 'Ambiguous exit code in strict legacy toolchains.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'Read a=-3, m=5', memoryOrStack: 'a=-3, m=5', note: 'Negative dividend' },
      { step: 2, state: 'Compute a % m', memoryOrStack: 'rem=-3', note: 'Raw C remainder' },
      { step: 3, state: 'Add m', memoryOrStack: 'shifted=2', note: 'Now positive' },
      { step: 4, state: 'Apply % m', memoryOrStack: 'norm=2', note: 'Normalized [0..4]' },
    ],
    harryBugTraps: [
      {
        title: 'Using Assignment (=) Inside if() Instead of (==)',
        brokenCode: 'if (x = 5) printf("Five");',
        fixedCode: 'if (x == 5) printf("Five");',
        whyItBreaks: 'x = 5 assigns 5 and always evaluates as true (non-zero)!',
      },
      {
        title: 'Chaining Comparisons Like Math (1 <= x <= 10)',
        brokenCode: 'if (1 <= x <= 10) ...',
        fixedCode: 'if (x >= 1 && x <= 10) ...',
        whyItBreaks: '(1 <= x) returns 0 or 1, and both 0 <= 10 and 1 <= 10 are ALWAYS true!',
      },
      {
        title: 'Unnormalized Negative Remainder',
        brokenCode: 'int idx = (pos - step) % n;',
        fixedCode: 'int idx = (((pos - step) % n) + n) % n;',
        whyItBreaks: 'Negative idx causes out-of-bounds array crash.',
      },
    ],
    practiceSheet: [
      {
        id: 'c-ch-4-q1',
        difficulty: 'Easy',
        title: '1. Sum, Difference & Product',
        prompt: 'Read two integers a, b and print a+b, a-b, and 1LL*a*b separated by spaces.',
        banglaHint: '৬৪-বিট গুণের জন্য %lld এবং 1LL * a * b ব্যবহার করো।',
        starterCode: `#include <stdio.h>\nint main(void) {\n    int a = 0, b = 0;\n    if (scanf("%d %d", &a, &b) == 2) printf("%d %d %lld\\n", a + b, a - b, 1LL * a * b);\n    return 0;\n}`,
        sampleStdin: '12 5',
        expectedOutput: '17 7 60',
      },
      {
        id: 'c-ch-4-q2',
        difficulty: 'Easy',
        title: '2. In-Range Gate Check',
        prompt: 'Read integer x and print 1 if 10 <= x <= 50, else 0.',
        banglaHint: '10 <= x <= 50 না লিখে x >= 10 && x <= 50 লিখবে!',
        starterCode: `#include <stdio.h>\nint main(void) {\n    int x = 0;\n    if (scanf("%d", &x) == 1) printf("%d\\n", (x >= 10 && x <= 50) ? 1 : 0);\n    return 0;\n}`,
        sampleStdin: '25',
        expectedOutput: '1',
      },
      {
        id: 'c-ch-4-q3',
        difficulty: 'Medium',
        title: '3. Ceiling Division Without Floats',
        prompt: 'Read positive integers a and b; print ceil(a / b) using integer math (a + b - 1) / b.',
        banglaHint: 'ফ্লোটিং পয়েন্ট এড়াতে (a + b - 1) / b সূত্র ব্যবহার করো।',
        starterCode: `#include <stdio.h>\nint main(void) {\n    long long a = 0, b = 1;\n    if (scanf("%lld %lld", &a, &b) == 2) printf("%lld\\n", (a + b - 1) / b);\n    return 0;\n}`,
        sampleStdin: '10 3',
        expectedOutput: '4',
      },
      {
        id: 'c-ch-4-q4',
        difficulty: 'Hard',
        title: '4. Negative-Safe Circular Shift',
        prompt: 'Read a and m (m > 0); print exact mathematical modulo ((a % m) + m) % m.',
        banglaHint: '((a % m) + m) % m সূত্র দিয়ে নেগেটিভ মড ঠিক করো।',
        starterCode: `#include <stdio.h>\nint main(void) {\n    long long a = 0, m = 1;\n    if (scanf("%lld %lld", &a, &m) == 2 && m > 0) printf("%lld\\n", ((a % m) + m) % m);\n    return 0;\n}`,
        sampleStdin: '-7 4',
        expectedOutput: '1',
      },
    ],
    miniBuild: {
      title: 'Safe Modulo & Short-Circuit Guard',
      description: 'Validates denominator and computes positive modulo cleanly.',
      banglaGoal: 'অপারেটর প্রেসিডেন্স ও নেগেটিভ মডুলো মিলিয়ে ব্যবহার করা।',
      combinesChapters: 'Ch 1–4',
      starterCode: `#include <stdio.h>

int main(void) {
    long long a = 0, m = 1;
    if (scanf("%lld %lld", &a, &m) == 2 && m > 0) {
        long long norm = ((a % m) + m) % m;
        printf("%lld\\n", norm);
    }
    return 0;
}`,
      sampleStdin: '-3 5',
      expectedOutput: '2',
    },
    starterCode: `#include <stdio.h>

int main(void) {
    long long a = 0, m = 1;
    if (scanf("%lld %lld", &a, &m) == 2 && m > 0) {
        long long norm = ((a % m) + m) % m;
        printf("%lld\\n", norm);
    }
    return 0;
}`,
    sampleStdin: '-3 5',
    expectedSampleOutput: '2',
    testCases: [
      { id: 'c4-t1', input: '-3 5', expectedOutput: '2' },
      { id: 'c4-t2', input: '17 5', expectedOutput: '2', isHidden: true },
    ],
  },

  5: {
    chapterNumber: 5,
    isMilestoneMerger: true,
    title: 'C Chapter 5 (C23): Bitwise Operators & Binary Tricks (Essential for CP)',
    banglaTitle: 'C অধ্যায় ৫ (C23): বিটওয়াইজ অপারেটর ও বাইনারি কৌশল (CP স্পেশাল)',
    subtitle: 'CPU single-cycle bit math (&, |, ^, ~, <<, >>), bitmask flags, power-of-2 checks, and XOR swap/unique tricks.',
    zeroIntuition: {
      plainEnglishStory:
        'Deep inside the CPU, every integer lives in hardware registers as a row of 32 or 64 binary switches (0 or 1). Bitwise operators (&, |, ^, ~, <<, >>) inspect, flip, combine, and shift those switches simultaneously in a single clock cycle—making them significantly faster than division or modulo.\n\nCompetitive programmers rely on unsigned bitmasks (1ULL << k) to encode subsets, check parity via (n & 1), test powers of two in O(1) via (n > 0 && (n & (n - 1)) == 0), and isolate lone unpaired values via XOR cancellation (a ^ a == 0).',
      asciiFlowchart: `  [ n = 13 -> Binary: 0000 1101 ]
        |
        +--> Parity check (n & 1)       --> 1 (Odd!)
        +--> Bit 2 set?   ((n >> 2)&1)  --> 1 (True!)
        +--> Power of 2?  (n & (n-1))   --> 13 & 12 = 8 != 0 (Not power of 2)`,
      pseudocode: [
        '1. READ integer n and bit index k',
        '2. CHECK k-th bit using (n >> k) & 1',
        '3. TEST power of 2 using n > 0 && (n & (n - 1)) == 0',
        '4. OUTPUT results cleanly',
      ],
      banglaZeroToHero: {
        analogyTitle: 'সুইচ বোর্ডের ৩২টি লাইট সুইচ (Bitmask Switches)',
        explanation:
          'একটি ৩২-বিট বা ৬৪-বিট ইন্টিজারকে ঘরের ৩২টি বা ৬৪টি আলাদা লাইট সুইচের বোর্ড ভাবো! সাধারণ যোগ-বিয়োগ পুরো সংখ্যার মান বদলায়, কিন্তু বিটওয়াইজ অপারেটর (&, |, ^, ~, <<, >>) প্রতিটি বিট বা সুইচকে আলাদাভাবে অন-অফ বা যাচাই করতে পারে—তাও মাত্র ১ ক্লক সাইকেলে! অ্যান্ড (&) কেবল দুটি বিট ১ হলে ১ দেয়, অর (|) যেকোনো একটি ১ হলে ১ দেয়, আর এক্সর (^) দুটি বিট ভিন্ন হলে ১ দেয়। বাম শিফট (x << 1) সংখ্যাকে ২ দিয়ে গুণ করে, আর ডান শিফট (x >> 1) ২ দিয়ে ভাগ করে। তবে বড় বিটমাস্ক তৈরির সময় কখনোই 1 << 40 লিখবে না—অবশ্যই 1ULL << 40 লিখতে হবে, নইলে ৩২-বিটে Undefined Behavior ঘটে। x > 0 && (x & (x - 1)) == 0 সূত্রটি কোনো লুপ ছাড়াই O(1) সময়ে বলে দেয় সংখ্যাটি ২-এর ঘাত কি না। সবচেয়ে জাদুকরী প্রয়োগ হলো XOR: একই সংখ্যার জোড়া একে অপরকে কেটে শূন্য করে দেয় (x ^ x = 0), তাই লক্ষ সংখ্যার ভেতর একমাত্র জোড়াবিহীন সংখ্যাটি O(1) মেমোরিতে খুঁজে পাওয়া যায়। মনে রাখবে == এর অগ্রাধিকার & এর চেয়ে বেশি, তাই সর্বদা (x & 1) == 0 বন্ধনী দেবে। এই অধ্যায়ে আমরা ফেজ ১-এর সব ধারণা মিলিয়ে প্রথম মাইলস্টোন মার্জার তৈরি করবো।',
        everydayExample:
          'x ^ x = 0! অর্থাৎ একই সংখ্যার জোড়া একে অপরকে কেটে দেয়—এই ম্যাজিক দিয়ে লক্ষ সংখ্যার ভেতর একা থাকা সংখ্যা মুহূর্তেই বের করা যায়।',
        keyTakeaways: [
          '1LL << k ব্যবহার করে ৬৪-বিট মাস্ক তৈরি করো (1 << 40 লিখলে ৩২-বিটে ওভারফ্লো হয়!)।',
          'x & 1 == 0 মানে জোড়, 1 মানে বিজোড়।',
          'বিটওয়াইজ অপারেটরের অগ্রাধিকার == এর চেয়ে কম, তাই সব সময় (x & 1) == 0 বন্ধনী দাও!',
        ],
      },
    },
    topics: [
      {
        id: 'c-ch-5-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'AND (&), OR (|), XOR (^) and Left/Right Shifts',
        englishParagraphs: [
          'Bitwise AND (&) outputs 1 only when both bits are 1; OR (|) outputs 1 if either bit is 1; XOR (^) outputs 1 when the bits differ.',
          'Left-shifting by 1 (x << 1) multiplies by 2; right-shifting non-negative x >> 1 divides by 2.',
        ],
        banglaParagraphs: [
          '& (AND) কেবল দুটি বিটই ১ হলে ১ দেয়, | (OR) যেকোনো একটি ১ হলেই ১ দেয়, আর ^ (XOR) দুটি বিট ভিন্ন হলে ১ দেয়।',
          'x << 1 মানে বাম দিকে ১ ঘর সরানো (২ দিয়ে গুণ), আর x >> 1 মানে ডানে ১ ঘর সরানো (২ দিয়ে পূর্ণভাগ)।',
        ],
        memoryDiagram: `6(0110) & 3(0011) = 2(0010) | 6|3 = 7(0111) | 6^3 = 5(0101)`,
        code: `#include <stdio.h>

int main(void) {
    unsigned int a = 6, b = 3;
    printf("AND=%u OR=%u XOR=%u SHL=%u\\n", a & b, a | b, a ^ b, b << 2);
    return 0;
}`,
        stdin: '',
        expectedOutput: 'AND=2 OR=7 XOR=5 SHL=12',
        lineByLine: [
          {
            lineNumber: 'Line 5',
            codeSnippet: 'a & b, a | b, a ^ b',
            whatItMeans: 'Evaluates bitwise logic on binary digits of 6 and 3.',
            whyItIsThere: '6 (110) & 3 (011) = 010 (2).',
            ifDeletedError: 'Missing printed metrics.',
          },
          {
            lineNumber: 'Line 5',
            codeSnippet: 'b << 2',
            whatItMeans: 'Shifts 3 left by 2 bits: 3 * 2^2 = 12.',
            whyItIsThere: 'Single-cycle power-of-2 scaling.',
            ifDeletedError: 'Missing SHL output.',
          },
        ],
      },
      {
        id: 'c-ch-5-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Check, Set & Toggle the k-th Bit Safely (1ULL << k)',
        englishParagraphs: [
          'To inspect bit k of number n, shift n right by k and mask the lowest bit: ((n >> k) & 1ULL).',
          'To turn ON bit k, OR with (1ULL << k). Always use unsigned 64-bit literals (1ULL) so shifting past bit 30 never triggers signed overflow.',
        ],
        banglaParagraphs: [
          'যেকোনো সংখ্যার k-তম বিটটি ১ কি না দেখতে (n >> k) & 1ULL ব্যবহার হয়। আর ওই বিটটি ১ সেট করতে n | (1ULL << k) লিখতে হয়।',
          'বড় শিফটের সময় সবসময় 1ULL লিখবে, নইলে সাধারণ 1 (৩২-বিট) ৩০ এর বেশি শিফট করলে এরর দেবে।',
        ],
        memoryDiagram: `n=5(0101), k=1 -> bit=0 | set_bit(5,1) -> 7(0111)`,
        code: `#include <stdio.h>

int main(void) {
    unsigned long long n = 0;
    int k = 0;
    if (scanf("%llu %d", &n, &k) == 2 && k >= 0 && k < 64) {
        int bit = (int)((n >> k) & 1ULL);
        unsigned long long with_set = n | (1ULL << k);
        printf("bit=%d set=%llu\\n", bit, with_set);
    }
    return 0;
}`,
        stdin: '5 1',
        expectedOutput: 'bit=0 set=7',
        lineByLine: [
          {
            lineNumber: 'Line 7',
            codeSnippet: '(n >> k) & 1ULL',
            whatItMeans: 'Moves bit k down to index 0 and isolates it with & 1.',
            whyItIsThere: 'Returns exact binary 0 or 1.',
            ifDeletedError: 'Fails to extract individual bit.',
          },
          {
            lineNumber: 'Line 8',
            codeSnippet: 'n | (1ULL << k)',
            whatItMeans: 'Turns on bit k without altering any other bits in n.',
            whyItIsThere: 'Core operation for maintaining bitmask permission sets.',
            ifDeletedError: 'Does not set bit k.',
          },
        ],
      },
      {
        id: 'c-ch-5-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'UNIX File Permission Flags & Power-of-Two Checker',
        englishParagraphs: [
          'Operating systems pack Read (4 = 1<<2), Write (2 = 1<<1), and Execute (1 = 1<<0) permissions into a single byte bitmask.',
          'Meanwhile, the classic identity (x > 0 && (x & (x - 1)) == 0) checks whether x is an exact power of two in O(1) time by clearing its lowest set bit.',
        ],
        banglaParagraphs: [
          'Linux ও UNIX ফাইলের Read(4), Write(2), Execute(1) অনুমতি একটি মাত্র বিটমাস্ক বাইটে রাখা হয়।',
          'এছাড়া কোনো সংখ্যা ২-এর ঘাত (Power of 2) কি না তা লুপ ছাড়াই মাত্র ১ লাইনে n > 0 && (n & (n - 1)) == 0 দিয়ে যাচাই করা যায়!',
        ],
        memoryDiagram: `n=16 (10000) & 15 (01111) = 0 -> PowerOfTwo=1`,
        code: `#include <stdio.h>

int main(void) {
    unsigned long long x = 0;
    if (scanf("%llu", &x) == 1) {
        int is_pow2 = (x > 0 && (x & (x - 1)) == 0) ? 1 : 0;
        printf("pow2=%d\\n", is_pow2);
    }
    return 0;
}`,
        stdin: '16',
        expectedOutput: 'pow2=1',
        lineByLine: [
          {
            lineNumber: 'Line 6',
            codeSnippet: 'x > 0 && (x & (x - 1)) == 0',
            whatItMeans: 'Drops the lowest 1-bit; powers of two have only one 1-bit so result is 0.',
            whyItIsThere: 'O(1) hardware check with zero loops.',
            ifDeletedError: 'Returns wrong answer for 0 without x > 0 guard.',
          },
        ],
      },
      {
        id: 'c-ch-5-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'XOR Single-Unique Element Finder (O(1) Space CP Classic)',
        englishParagraphs: [
          'Every element appearing twice cancels itself via a ^ a == 0, and a ^ 0 == a. XORing the entire array isolates the lone unpaired element in O(n) time and O(1) memory.',
          'Watch out for C precedence: always wrap (x & 1) == 0 in parentheses because == binds tighter than &!',
        ],
        banglaParagraphs: [
          'একটি অ্যারেতে সব সংখ্যা দুবার করে থাকলেও কেবল একটি সংখ্যা একবার থাকলে পুরো অ্যারে XOR (^) করলেই বাকি সব জোড়া শূন্য হয়ে একা থাকা সংখ্যাটি বের হয়ে আসে!',
          'সতর্কতা: বিটওয়াইজ & এর চেয়ে == এর অগ্রাধিকার বেশি, তাই (x & 1 == 0) লিখলে তা x & (1 == 0) হয়ে ভুল ফল দেবে—সর্বদা (x & 1) == 0 বন্ধনী দেবে।',
        ],
        memoryDiagram: `4 ^ 1 ^ 2 ^ 1 ^ 2 = 4 ^ (1^1) ^ (2^2) = 4`,
        code: `#include <stdio.h>

int main(void) {
    int n = 0;
    if (scanf("%d", &n) == 1) {
        int acc = 0, x = 0;
        for (int i = 0; i < n && scanf("%d", &x) == 1; i++) {
            acc ^= x;
        }
        printf("%d\\n", acc);
    }
    return 0;
}`,
        stdin: '5\n4 1 2 1 2',
        expectedOutput: '4',
        lineByLine: [
          {
            lineNumber: 'Line 8',
            codeSnippet: 'acc ^= x;',
            whatItMeans: 'XORs running accumulator with incoming x.',
            whyItIsThere: 'Equal pairs cancel to 0 via associativity and commutativity.',
            ifDeletedError: 'Always prints 0.',
          },
        ],
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 1',
        codeSnippet: '#include <stdio.h>',
        whatItMeans: 'Includes printf declaration for emitting bitwise results.',
        whyItIsThere: 'Standard C output library header.',
        ifDeletedError: 'Compile error: undeclared printf.',
      },
      {
        lineNumber: 'Line 3',
        codeSnippet: 'int main(void) {',
        whatItMeans: 'Entry function invoked by C runtime.',
        whyItIsThere: 'Establishes stack frame for main.',
        ifDeletedError: 'Linker fails: undefined main.',
      },
      {
        lineNumber: 'Line 4',
        codeSnippet: 'unsigned int a = 6, b = 3;',
        whatItMeans: 'Initializes unsigned integers so bit shifts stay overflow-safe.',
        whyItIsThere: 'Bitmasks belong on unsigned types to avoid sign-bit UB.',
        ifDeletedError: 'Compile error: a and b undeclared.',
      },
      {
        lineNumber: 'Line 5',
        codeSnippet: 'printf("AND=%u OR=%u XOR=%u SHL=%u\\n", a & b, a | b, a ^ b, b << 2);',
        whatItMeans: 'Evaluates bitwise AND (2), OR (7), XOR (5), and left-shift by 2 (12).',
        whyItIsThere: 'Displays all core single-cycle CPU bit transformations together.',
        ifDeletedError: 'Zero output produced.',
      },
      {
        lineNumber: 'Line 6',
        codeSnippet: 'return 0;',
        whatItMeans: 'Exits cleanly with status 0.',
        whyItIsThere: 'Confirms normal termination.',
        ifDeletedError: 'Legacy compilers emit indeterminate exit code.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'acc = 0', memoryOrStack: 'acc=0, n=5', note: 'XOR identity element is 0' },
      { step: 2, state: 'Read 4, 1, 2', memoryOrStack: 'acc=4^1^2=7', note: 'Accumulates unpaired bits' },
      { step: 3, state: 'Read 1, 2', memoryOrStack: 'acc=7^1^2=4', note: 'Duplicate pairs cancel cleanly' },
      { step: 4, state: 'Output acc', memoryOrStack: 'stdout="4"', note: 'O(1) extra space!' },
    ],
    harryBugTraps: [
      {
        title: 'Operator Precedence Trap: x & 1 == 0',
        brokenCode: 'if (x & 1 == 0) printf("Even");',
        fixedCode: 'if ((x & 1) == 0) printf("Even");',
        whyItBreaks: '== binds tighter than &, so C parses it as x & (1 == 0) which is always x & 0 == 0!',
      },
      {
        title: 'Shifting 32-Bit 1 by >= 32 Bits (1 << 40)',
        brokenCode: 'long long mask = 1 << 40;',
        fixedCode: 'long long mask = 1LL << 40;',
        whyItBreaks: 'Plain 1 is a 32-bit int; shifting >= 32 bits is Undefined Behavior and produces garbage!',
      },
      {
        title: 'Right-Shifting Negative Signed Numbers',
        brokenCode: 'int r = (-8) >> 1;',
        fixedCode: 'unsigned int r = 8U >> 1;',
        whyItBreaks: 'Signed right-shift fills high bits inconsistently across architectures; use unsigned for bitmasks.',
      },
    ],
    practiceSheet: [
      {
        id: 'c-ch-5-q1',
        difficulty: 'Easy',
        title: '1. Fast Parity Check Using &',
        prompt: 'Read integer n and print "ODD" if (n & 1) else "EVEN".',
        banglaHint: '(n & 1) সত্য হলে বিজোড়, নইলে জোড়।',
        starterCode: `#include <stdio.h>\nint main(void) {\n    long long n = 0;\n    if (scanf("%lld", &n) == 1) printf("%s\\n", (n & 1LL) ? "ODD" : "EVEN");\n    return 0;\n}`,
        sampleStdin: '17',
        expectedOutput: 'ODD',
      },
      {
        id: 'c-ch-5-q2',
        difficulty: 'Easy',
        title: '2. Power of Two Test',
        prompt: 'Read unsigned n and print 1 if power of two else 0.',
        banglaHint: 'n > 0 && (n & (n - 1)) == 0 শর্তটি যাচাই করো।',
        starterCode: `#include <stdio.h>\nint main(void) {\n    unsigned long long n = 0;\n    if (scanf("%llu", &n) == 1) printf("%d\\n", (n > 0 && (n & (n - 1)) == 0) ? 1 : 0);\n    return 0;\n}`,
        sampleStdin: '32',
        expectedOutput: '1',
      },
      {
        id: 'c-ch-5-q3',
        difficulty: 'Medium',
        title: '3. Toggle k-th Bit',
        prompt: 'Read unsigned long long n and int k; print n after flipping bit k.',
        banglaHint: 'n ^ (1ULL << k) বিট টগল করে (০ থাকলে ১, ১ থাকলে ০)।',
        starterCode: `#include <stdio.h>\nint main(void) {\n    unsigned long long n = 0; int k = 0;\n    if (scanf("%llu %d", &n, &k) == 2) printf("%llu\\n", n ^ (1ULL << k));\n    return 0;\n}`,
        sampleStdin: '5 0',
        expectedOutput: '4',
      },
      {
        id: 'c-ch-5-q4',
        difficulty: 'Hard',
        title: '4. Find Single Unique Element with XOR',
        prompt: 'Read n followed by n integers where every element appears twice except one; print the unique one.',
        banglaHint: 'শুরুতে ans = 0 নিয়ে প্রতিটি সংখ্যা ans ^= x করো।',
        starterCode: `#include <stdio.h>\nint main(void) {\n    int n = 0, ans = 0, x = 0;\n    if (scanf("%d", &n) == 1) {\n        for (int i = 0; i < n && scanf("%d", &x) == 1; i++) ans ^= x;\n        printf("%d\\n", ans);\n    }\n    return 0;\n}`,
        sampleStdin: '5\n9 3 7 3 9',
        expectedOutput: '7',
      },
    ],
    miniBuild: {
      title: 'Milestone Merger 1 (C Ch 1–5): C23 Bitwise Parity & Single-Unique Analyzer',
      description: 'Combines C23 main(), formatted I/O, 64-bit integer safety, operators, and XOR bitmasks to isolate the lone unpaired value in O(1) memory.',
      banglaGoal: 'অধ্যায় ১ থেকে ৫ মিলিয়ে O(1) মেমোরিতে বিটওয়াইজ XOR ব্যবহার করে ইউনিক সংখ্যা খুঁজে বের করা।',
      combinesChapters: 'Ch 1–5',
      starterCode: `#include <stdio.h>

int main(void) {
    int n = 0, acc = 0, x = 0;
    if (scanf("%d", &n) == 1) {
        for (int i = 0; i < n && scanf("%d", &x) == 1; i++) acc ^= x;
        printf("%d\\n", acc);
    }
    return 0;
}`,
      sampleStdin: '5\n4 1 2 1 2',
      expectedOutput: '4',
    },
    starterCode: `#include <stdio.h>

int main(void) {
    int n = 0, acc = 0, x = 0;
    if (scanf("%d", &n) == 1) {
        for (int i = 0; i < n && scanf("%d", &x) == 1; i++) acc ^= x;
        printf("%d\\n", acc);
    }
    return 0;
}`,
    sampleStdin: '5\n4 1 2 1 2',
    expectedSampleOutput: '4',
    testCases: [
      { id: 'c5-t1', input: '5\n4 1 2 1 2', expectedOutput: '4' },
      { id: 'c5-t2', input: '3\n10 99 10', expectedOutput: '99', isHidden: true },
    ],
  },
  ...LESSONS_C_P2,
  ...LESSONS_C_P3,
  ...LESSONS_C_P4,
  ...LESSONS_C_P5,
};
