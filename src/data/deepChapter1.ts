import type {
  BugTrapItem,
  ChapterSubTopic,
  CodeExampleVariant,
  DryRunRow,
  LanguageId,
  LineAnatomyRow,
  MiniHandsOnBuild,
  PracticeQuestion,
} from '../types/academy';

export interface DeepChapterContent {
  title: string;
  banglaTitle: string;
  subtitle: string;
  zeroIntuition: {
    plainEnglishStory: string;
    asciiFlowchart: string;
    pseudocode: string[];
    banglaZeroToHero: {
      analogyTitle: string;
      explanation: string;
      everydayExample: string;
      keyTakeaways: string[];
    };
  };
  topics?: ChapterSubTopic[];
  codeExamples?: CodeExampleVariant[];
  lineByLineAnatomy: LineAnatomyRow[];
  dryRunTable: DryRunRow[];
  harryBugTraps: BugTrapItem[];
  practiceSheet: PracticeQuestion[];
  miniBuild: MiniHandsOnBuild;
}

export const DEEP_CHAPTER_1: Record<LanguageId, DeepChapterContent> = {
  c: {
    title: 'C Chapter 1: First Program, Compiler Pipeline & Standard I/O',
    banglaTitle: 'C অধ্যায় ১: প্রথম প্রোগ্রাম, কম্পাইলার ও ইনপুট-আউটপুট',
    subtitle: 'From zero coding knowledge to understanding #include <stdio.h>, main(), scanf/printf, and how C talks to RAM.',
    zeroIntuition: {
      plainEnglishStory:
        'A computer CPU only understands 0s and 1s (machine code), never English words. When you write C code, a translator program called a Compiler (GCC) checks your grammar, translates every instruction into CPU machine code, and runs a special starting function named main(). Your program reads raw bytes from Keyboard/Input (stdin) and prints characters to the Screen (stdout).',
      asciiFlowchart: `      ( START )
          |
          v
  [ Print Prompt / Read Input: name, score ]   <-- stdin (Keyboard / Judge)
          |
          v
  [ Compute: doubled = score * 2 ]             <-- CPU Arithmetic Unit
          |
          v
  [ Print Output: "Welcome, <name>! Score: <doubled>" ]  <-- stdout (Screen)
          |
          v
      ( STOP: return 0 )`,
      pseudocode: [
        '1. START program execution at main()',
        '2. DECLARE text buffer name[64] and integer score',
        '3. INPUT name and score from standard input stream',
        '4. COMPUTE final_score = score * 2',
        '5. OUTPUT "Welcome, " + name + "! Score: " + final_score',
        '6. RETURN 0 to tell the Operating System everything succeeded',
      ],
      banglaZeroToHero: {
        analogyTitle: 'হোটেলের ওয়েটার ও রান্নাঘরের স্লিপ (Input-Process-Output)',
        explanation:
          'ধরো তুমি জীবনে কখনো কোড লেখোনি। একটি প্রোগ্রামকে একটি রেস্তোরাঁর রান্নাঘর ভাবো। কাস্টমার কী চায় তা কাগজের স্লিপে লিখে দেয়—এটাই Input (scanf)। ভেতরে বাবুর্চি হিসাব-নিকাশ করে খাবার বানায়—এটাই Process (CPU)। আর তৈরি খাবার প্লেটে সাজিয়ে টেবিলে পাঠানোই Output (printf)। C ভাষায় #include <stdio.h> হলো সেই ওয়েটারকে ডেকে আনা যে কাগজ-কলম (Input/Output) নিয়ে আসবে!',
        everydayExample:
          'চায়ের দোকানে গিয়ে তুমি বললে "২ কাপ চা, কম চিনি" (Input)। দোকানদার চা বানাল (Process), আর কাপ হাতে দিল (Output)। প্রোগ্রামিংয়েও ঠিক এই ৩টি ধাপই ঘটে।',
        keyTakeaways: [
          'C প্রোগ্রাম সব সময় main() ফাংশন থেকে চলা শুরু করে—এটি বাড়ির প্রধান দরজার মতো।',
          'প্রতিটি নির্দেশের শেষে সেমিকোলন (;) মানে একটি বাক্যের শেষে দাঁড়ি (।)।',
          'return 0 মানে অপারেটিং সিস্টেমকে জানানো: "বস, সব কাজ নির্ভুলভাবে শেষ হয়েছে!"',
        ],
      },
    },
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 1',
        codeSnippet: '#include <stdio.h>',
        whatItMeans: 'Preprocessor directive that pastes Standard Input/Output declarations into your file.',
        whyItIsThere: 'C is ultra-minimal; without stdio.h, C does not even know what printf() or scanf() means.',
        ifDeletedError: 'Compile warning/error: implicit declaration of function "printf" and "scanf".',
      },
      {
        lineNumber: 'Line 3',
        codeSnippet: 'int main(void) {',
        whatItMeans: 'Defines the mandatory entry-point function returning an integer status to the OS.',
        whyItIsThere: 'The OS loader looks specifically for the symbol "main" to begin CPU execution.',
        ifDeletedError: 'Linker error: undefined reference to "main" — program cannot start.',
      },
      {
        lineNumber: 'Line 4-5',
        codeSnippet: 'char name[64]; int score = 0;',
        whatItMeans: 'Reserves 64 bytes for text characters and 4 bytes for a whole number initialized to 0.',
        whyItIsThere: 'C requires reserving exact RAM space before storing incoming input.',
        ifDeletedError: 'Compile error: "name" / "score" undeclared (first use in this function).',
      },
      {
        lineNumber: 'Line 6',
        codeSnippet: 'scanf("%63s %d", name, &score);',
        whatItMeans: 'Reads a word (max 63 chars) into name and an integer into the memory address (&) of score.',
        whyItIsThere: '&score gives scanf the exact RAM address so it can write the number inside.',
        ifDeletedError: 'If & is missing on score: Segmentation Fault (program crashes writing to garbage address)!',
      },
      {
        lineNumber: 'Line 7',
        codeSnippet: 'printf("Welcome, %s! Score: %d\\n", name, score * 2);',
        whatItMeans: 'Formats %s (string) and %d (int) onto stdout followed by a newline \\n.',
        whyItIsThere: '\\n moves the cursor cleanly to the next line for judges and terminals.',
        ifDeletedError: 'Missing semicolon (;) -> error: expected ";" before "return".',
      },
      {
        lineNumber: 'Line 9',
        codeSnippet: 'return 0;',
        whatItMeans: 'Exits main() and hands status code 0 (Success) back to the Operating System.',
        whyItIsThere: 'Non-zero exit codes tell automated judges or shell scripts that the program crashed.',
        ifDeletedError: 'Modern C99 defaults to 0, but older compilers/strict flags warn about non-void return.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'OS calls main()', memoryOrStack: 'name=[uninitialized], score=0', note: 'Stack frame created for main()' },
      { step: 2, state: 'scanf reads "Argon 42"', memoryOrStack: 'name="Argon\\0", score=42', note: 'Null terminator \\0 marks string end' },
      { step: 3, state: 'Evaluate score * 2', memoryOrStack: 'CPU temp = 84', note: 'Original score stays 42 in RAM' },
      { step: 4, state: 'printf & return 0', memoryOrStack: 'stdout: "Welcome, Argon! Score: 84"', note: 'Stack frame destroyed cleanly' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: Missing & in scanf("%d", score)',
        brokenCode: 'int score;\nscanf("%d", score); // CRASH!',
        fixedCode: 'int score = 0;\nscanf("%d", &score); // Passes RAM address',
        whyItBreaks: 'scanf needs the memory address (&score) to store input. Passing the value causes a Segmentation Fault.',
      },
      {
        title: 'Trap 2: Buffer Overflow with unbounded %s',
        brokenCode: 'char name[10];\nscanf("%s", name); // Corrupts stack if >9 chars!',
        fixedCode: 'char name[64];\nscanf("%63s", name); // Safe width limit',
        whyItBreaks: 'Without a width specifier, long input overwrites adjacent stack memory.',
      },
      {
        title: 'Trap 3: Missing Semicolon or Mismatched Format Specifier',
        brokenCode: 'long long x = 100;\nprintf("%d", x) // Missing ; and wrong %d!',
        fixedCode: 'long long x = 100;\nprintf("%lld\\n", x);',
        whyItBreaks: 'Forgetting ; halts compilation, and %d on long long reads garbage bytes.',
      },
    ],
    practiceSheet: [
      {
        id: 'c-1-p1',
        difficulty: 'Easy',
        title: '1. Greeting Card Echo',
        prompt: 'Read a single first name and print "Hello, <name>!" on one line.',
        banglaHint: 'char s[50]; এবং %s ব্যবহার করে ইনপুট নিয়ে printf করো।',
        starterCode: `#include <stdio.h>\nint main(void) {\n    char name[64];\n    scanf("%63s", name);\n    printf("Hello, %s!\\n", name);\n    return 0;\n}`,
        sampleStdin: 'Rafi',
        expectedOutput: 'Hello, Rafi!',
      },
      {
        id: 'c-1-p2',
        difficulty: 'Easy',
        title: '2. Sum of Two Integers',
        prompt: 'Read two integers a and b and print their sum.',
        banglaHint: 'scanf("%d %d", &a, &b) দিয়ে দুইটি সংখ্যা পড়ো।',
        starterCode: `#include <stdio.h>\nint main(void) {\n    int a, b;\n    scanf("%d %d", &a, &b);\n    printf("%d\\n", a + b);\n    return 0;\n}`,
        sampleStdin: '12 30',
        expectedOutput: '42',
      },
      {
        id: 'c-1-p3',
        difficulty: 'Medium',
        title: '3. Rectangle Area & Perimeter',
        prompt: 'Given integer length L and width W, print "<area> <perimeter>".',
        banglaHint: 'ক্ষেত্রফল = L * W এবং পরিসীমা = 2 * (L + W)।',
        starterCode: `#include <stdio.h>\nint main(void) {\n    int l, w;\n    scanf("%d %d", &l, &w);\n    printf("%d %d\\n", l * w, 2 * (l + w));\n    return 0;\n}`,
        sampleStdin: '5 3',
        expectedOutput: '15 16',
      },
      {
        id: 'c-1-p4',
        difficulty: 'Medium',
        title: '4. Formatted Receipt Alignment',
        prompt: 'Read item code (int) and price (int) and print "Item#<code:04d>: $<price>".',
        banglaHint: '%04d ব্যবহার করলে ৪ ডিজিট না হলে সামনে ০ বসে।',
        starterCode: `#include <stdio.h>\nint main(void) {\n    int code, price;\n    scanf("%d %d", &code, &price);\n    printf("Item#%04d: $%d\\n", code, price);\n    return 0;\n}`,
        sampleStdin: '7 99',
        expectedOutput: 'Item#0007: $99',
      },
      {
        id: 'c-1-p5',
        difficulty: 'Hard',
        title: '5. Total Seconds Converter',
        prompt: 'Read hours H and minutes M; output total seconds.',
        banglaHint: 'মোট সেকেন্ড = (H * 3600) + (M * 60), বড় মানের জন্য long long নাও।',
        starterCode: `#include <stdio.h>\nint main(void) {\n    long long h, m;\n    scanf("%lld %lld", &h, &m);\n    printf("%lld\\n", h * 3600 + m * 60);\n    return 0;\n}`,
        sampleStdin: '2 15',
        expectedOutput: '8100',
      },
    ],
    miniBuild: {
      title: 'Student Score Banner Generator (C CLI)',
      description: 'Reads a student name and raw quiz score, doubles it for bonus weight, and prints an aligned terminal badge.',
      banglaGoal: 'ইউজারের নাম ও স্কোর নিয়ে ডাবল বোনাস স্কোরসহ একটি সুন্দর ওয়েলকাম ব্যানার প্রিন্ট করা।',
      combinesChapters: 'Ch 1 (Compiler, stdio.h, main, scanf/printf)',
      starterCode: `#include <stdio.h>\nint main(void) {\n    char name[64];\n    int score = 0;\n    if (scanf("%63s %d", name, &score) == 2) {\n        printf("Welcome, %s! Score: %d\\n", name, score * 2);\n    }\n    return 0;\n}`,
      sampleStdin: 'Argon 42',
      expectedOutput: 'Welcome, Argon! Score: 84',
    },
  },

  cpp: {
    title: 'C++ Chapter 1: Fast I/O, Namespaces & Program Anatomy',
    banglaTitle: 'C++ অধ্যায় ১: ফাস্ট I/O, নেমস্পেস ও প্রোগ্রামের গঠন',
    subtitle: 'Understand #include <iostream>, std::cout/cin, fast I/O sync disabling, and zero-overhead compilation.',
    zeroIntuition: {
      plainEnglishStory:
        'C++ extends C with type-safe streams (cin and cout) and powerful libraries (STL). Think of cin as a conveyor belt bringing typed data into your program, and cout as an outgoing conveyor belt printing results to the terminal.',
      asciiFlowchart: `      ( START )
          |
          v
  [ Untie cin/cout from slow C stdio sync ]
          |
          v
  [ Read: cin >> name >> score ]
          |
          v
  [ Compute: doubled = score * 2 ]
          |
          v
  [ Write: cout << "Welcome, " << name << "! Score: " << doubled ]
          |
          v
      ( RETURN 0 )`,
      pseudocode: [
        '1. LOAD <iostream> and <string> modules',
        '2. DISABLE stdio synchronization for competitive programming speed',
        '3. READ name and score using cin >>',
        '4. OUTPUT formatted greeting with "\\n" (never endl)',
      ],
      banglaZeroToHero: {
        analogyTitle: 'দুইটি আলাদা এক্সপ্রেস লেন (Fast I/O)',
        explanation:
          'ধরো টোল প্লাজায় C-এর পুরোনো লেন আর C++-এর নতুন লেন পাশাপাশি আছে। স্বাভাবিক অবস্থায় এরা একে অপরের জন্য অপেক্ষা করে, তাই জ্যাম লাগে! ios::sync_with_stdio(false) লিখে আমরা বলি: "দরকার নেই অপেক্ষা করার, ফুল স্পিডে ডেটা চালাও!"',
        everydayExample:
          'রাস্তায় আলাদা বাস লেন থাকলে যেমন জ্যাম ছাড়াই দ্রুত পৌঁছানো যায়, Fast I/O ঠিক সেভাবেই ১ লক্ষ ইনপুট মুহূর্তে পড়ে ফেলে।',
        keyTakeaways: [
          '<< মানে আউটপুটে পাঠানো (cout <<), আর >> মানে ইনপুট ভেতরে নেওয়া (cin >>)।',
          'endl প্রতিবার বাফার ফ্লাশ করে কোড স্লো করে—তাই সব সময় "\\n" ব্যবহার করবে।',
        ],
      },
    },
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 1-2',
        codeSnippet: '#include <iostream> / <string>',
        whatItMeans: 'Imports C++ input/output stream objects (cin, cout) and dynamic std::string.',
        whyItIsThere: 'Without <iostream>, cin and cout do not exist in scope.',
        ifDeletedError: 'Compile error: "cin" / "cout" was not declared in this scope.',
      },
      {
        lineNumber: 'Line 3',
        codeSnippet: 'using namespace std;',
        whatItMeans: 'Brings standard library names out of the std:: prefix so you can write cout instead of std::cout.',
        whyItIsThere: 'Keeps beginner and competitive code concise and readable.',
        ifDeletedError: 'Compile error unless every cout/cin/string is prefixed with std::.',
      },
      {
        lineNumber: 'Line 6-7',
        codeSnippet: 'ios::sync_with_stdio(false); cin.tie(nullptr);',
        whatItMeans: 'Disconnects C++ streams from C stdio buffers and stops cin from flushing cout before every read.',
        whyItIsThere: 'Prevents TLE (Time Limit Exceeded) on Codeforces/CSES problems with 10^5+ lines.',
        ifDeletedError: 'Code still works for small inputs, but can run 5–10x slower on huge inputs.',
      },
      {
        lineNumber: 'Line 10',
        codeSnippet: 'if (cin >> name >> score)',
        whatItMeans: 'Extracts whitespace-separated tokens into name and score, checking read success.',
        whyItIsThere: '>> automatically detects types (string vs int) with no %s/%d mistakes!',
        ifDeletedError: 'Variables remain empty/0 and output will be wrong.',
      },
      {
        lineNumber: 'Line 11',
        codeSnippet: 'cout << ... << "\\n";',
        whatItMeans: 'Chains values into stdout and ends with a fast newline character.',
        whyItIsThere: 'Chaining << avoids printf format-string vulnerabilities.',
        ifDeletedError: 'Missing << between items causes syntax error.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'Disable sync & tie', memoryOrStack: 'fast stream mode ON', note: 'Buffered I/O ready' },
      { step: 2, state: 'cin >> name >> score', memoryOrStack: 'name="Argon", score=42', note: 'Auto-parsed by stream' },
      { step: 3, state: 'cout << result', memoryOrStack: 'stdout: Welcome, Argon! Score: 84', note: 'Exit code 0' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: Using endl inside a 10^5 loop',
        brokenCode: 'for(int i=0; i<100000; i++) cout << i << endl;',
        fixedCode: 'for(int i=0; i<100000; i++) cout << i << "\\n";',
        whyItBreaks: 'endl forces an OS flush syscall on every iteration, causing TLE on large outputs.',
      },
      {
        title: 'Trap 2: Mixing scanf/printf after sync_with_stdio(false)',
        brokenCode: 'ios::sync_with_stdio(false);\nscanf("%d", &a); cout << a;',
        fixedCode: 'Use ONLY cin/cout OR ONLY scanf/printf.',
        whyItBreaks: 'Unsynced C and C++ buffers interleave out of order.',
      },
      {
        title: 'Trap 3: Reversing << and >> arrows',
        brokenCode: 'cin << x; cout >> x;',
        fixedCode: 'cin >> x; cout << x;',
        whyItBreaks: 'Think of arrows as data flow direction: from cin into variable (>>), from variable into cout (<<).',
      },
    ],
    practiceSheet: [
      {
        id: 'cpp-1-p1',
        difficulty: 'Easy',
        title: '1. Fast Greeting',
        prompt: 'Read a handle string and print "Hi <handle>".',
        banglaHint: 'string s; cin >> s; cout << "Hi " << s << "\\n";',
        starterCode: `#include <iostream>\n#include <string>\nusing namespace std;\nint main() {\n    string s; cin >> s;\n    cout << "Hi " << s << "\\n";\n    return 0;\n}`,
        sampleStdin: 'Harry',
        expectedOutput: 'Hi Harry',
      },
      {
        id: 'cpp-1-p2',
        difficulty: 'Easy',
        title: '2. Triple Product',
        prompt: 'Read 3 integers and print their sum.',
        banglaHint: 'তিনটি সংখ্যা a, b, c নিয়ে a + b + c প্রিন্ট করো।',
        starterCode: `#include <iostream>\nusing namespace std;\nint main() {\n    int a, b, c; cin >> a >> b >> c;\n    cout << (a + b + c) << "\\n";\n    return 0;\n}`,
        sampleStdin: '4 5 6',
        expectedOutput: '15',
      },
      {
        id: 'cpp-1-p3',
        difficulty: 'Medium',
        title: '3. Difference & Absolute Sum',
        prompt: 'Read a and b; print (a + b) and (a - b) separated by space.',
        banglaHint: 'একই লাইনে স্পেস দিয়ে দুটো ফলাফল প্রিন্ট করো।',
        starterCode: `#include <iostream>\nusing namespace std;\nint main() {\n    long long a, b; cin >> a >> b;\n    cout << (a + b) << " " << (a - b) << "\\n";\n    return 0;\n}`,
        sampleStdin: '20 7',
        expectedOutput: '27 13',
      },
      {
        id: 'cpp-1-p4',
        difficulty: 'Medium',
        title: '4. Fast I/O Echo Pair',
        prompt: 'Use fast I/O to read city and temperature and print "<city>:<temp>C".',
        banglaHint: 'ios::sync_with_stdio(false) যুক্ত করে স্ট্রিং ও সংখ্যা প্রিন্ট করো।',
        starterCode: `#include <iostream>\n#include <string>\nusing namespace std;\nint main() {\n    ios::sync_with_stdio(false); cin.tie(nullptr);\n    string city; int t; cin >> city >> t;\n    cout << city << ":" << t << "C\\n";\n    return 0;\n}`,
        sampleStdin: 'Dhaka 31',
        expectedOutput: 'Dhaka:31C',
      },
      {
        id: 'cpp-1-p5',
        difficulty: 'Hard',
        title: '5. Contest Score Formula',
        prompt: 'Given solved S and penalty P, output total = S * 100 - P * 5.',
        banglaHint: '64-bit long long ব্যবহার করলে বড় ইনপুটেও ওভারফ্লো হবে না।',
        starterCode: `#include <iostream>\nusing namespace std;\nint main() {\n    long long s, p; cin >> s >> p;\n    cout << (s * 100 - p * 5) << "\\n";\n    return 0;\n}`,
        sampleStdin: '5 4',
        expectedOutput: '480',
      },
    ],
    miniBuild: {
      title: 'CP Boilerplate & Fast Greeting Engine (C++)',
      description: 'Builds a clean competitive programming starter with untied cin/cout and formatted output.',
      banglaGoal: 'প্রতিযোগিতামূলক প্রোগ্রামিংয়ের জন্য স্ট্যান্ডার্ড Fast I/O টেমপ্লেট তৈরি করা।',
      combinesChapters: 'Ch 1 (Fast I/O, std namespace, streams)',
      starterCode: `#include <iostream>\n#include <string>\nusing namespace std;\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    string name; int score;\n    if (cin >> name >> score) {\n        cout << "Welcome, " << name << "! Score: " << (score * 2) << "\\n";\n    }\n    return 0;\n}`,
      sampleStdin: 'Argon 42',
      expectedOutput: 'Welcome, Argon! Score: 84',
    },
  },

  python: {
    title: 'Python Chapter 1: Interpreter, Indentation & Fast Input',
    banglaTitle: 'Python অধ্যায় ১: ইন্টারপ্রেটার, ইনডেন্টেশন ও ফাস্ট ইনপুট',
    subtitle: 'Zero-to-hero introduction to Python 3 bytecode execution, sys.stdin.read(), f-strings, and whitespace blocks.',
    zeroIntuition: {
      plainEnglishStory:
        'Unlike C or C++, Python does not ask you to write main() boilerplate or compile beforehand. The Python Virtual Machine reads your file line by line, turns it into bytecode, and runs it immediately. Instead of curly braces { }, Python uses clean indentation (4 spaces) to know which lines belong inside an if-block or loop.',
      asciiFlowchart: `      ( START )
          |
          v
  [ Read all stdin text -> split into list "parts" ]
          |
          v
  [ Check: len(parts) >= 2 ? ] --(No)--> ( END )
          | (Yes)
          v
  [ name = parts[0], score = int(parts[1]) ]
          |
          v
  [ Print f"Welcome, {name}! Score: {score * 2}" ]
          |
          v
      ( STOP )`,
      pseudocode: [
        '1. IMPORT sys module for fast standard input access',
        '2. READ entire input and SPLIT on spaces/newlines into parts',
        '3. IF at least 2 tokens exist:',
        '4.   SET name = first token, score = integer of second token',
        '5.   PRINT formatted greeting with score * 2',
      ],
      banglaZeroToHero: {
        analogyTitle: 'দোভাষী গাইড ও খাতার মার্জিন (Python Interpreter & Indentation)',
        explanation:
          'ধরো তুমি এক বিদেশী বন্ধুর সাথে কথা বলছ। C/C++ হলো আগে পুরো বই অনুবাদ করে ছাপিয়ে নেওয়া (Compiler), আর Python হলো সাথে থাকা একজন তাৎক্ষণিক দোভাষী (Interpreter)—যে প্রতিটি লাইন শোনামাত্র সাথে সাথে অনুবাদ করে কাজ শুরু করে! আর Python-এ সেকেন্ড ব্র্যাকেট { } লাগে না; খাতার পাতায় মার্জিন ছেড়ে লিখলেই (৪টি স্পেস) বোঝা যায় কোন লাইন কার ভেতরে।',
        everydayExample:
          'একটি বাজারের ফর্দের কথা ভাবো: মূল হেডিং "ফল" লিখে তার নিচে একটু ডান দিকে সরিয়ে "আম, জাম" লিখলে যেমন বোঝা যায় এগুলো ফলের অংশ—Python-এর Indentation ঠিক তাই!',
        keyTakeaways: [
          'input() সব সময় টেক্সট (str) দেয়, তাই অঙ্ক করতে হলে int() দিয়ে পূর্ণসংখ্যায় রূপান্তর করতে হয়।',
          'একই ব্লকের সব লাইনে সমান স্পেস (৪ স্পেস) না দিলে IndentationError আসবে।',
          'f"..." (f-string) দিয়ে টেক্সটের ভেতর সরাসরি {variable} বসানো সবচেয়ে সহজ ও দ্রুত।',
        ],
      },
    },
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 1',
        codeSnippet: 'import sys',
        whatItMeans: 'Loads Python’s built-in system module giving direct access to the raw stdin pipe.',
        whyItIsThere: 'sys.stdin.read() reads 100,000 numbers much faster than calling input() repeatedly.',
        ifDeletedError: 'NameError: name "sys" is not defined.',
      },
      {
        lineNumber: 'Line 3',
        codeSnippet: 'parts = sys.stdin.read().split()',
        whatItMeans: 'Reads all input text at once and splits it by any whitespace into a list of strings.',
        whyItIsThere: 'Works cleanly whether inputs are on one line or multiple lines!',
        ifDeletedError: 'Variable "parts" does not exist; program cannot read input.',
      },
      {
        lineNumber: 'Line 4',
        codeSnippet: 'if len(parts) >= 2:',
        whatItMeans: 'Guard check ensuring at least 2 tokens exist; colon (:) starts an indented block.',
        whyItIsThere: 'Prevents IndexError crashes if input is accidentally empty.',
        ifDeletedError: 'Deleting the colon (:) causes SyntaxError: expected ":".',
      },
      {
        lineNumber: 'Line 5-6',
        codeSnippet: 'name = parts[0]; score = int(parts[1])',
        whatItMeans: 'Takes index 0 as text and converts index 1 from string "42" into integer 42.',
        whyItIsThere: '"42" * 2 in Python repeats text ("4242")! int() turns it into math 84.',
        ifDeletedError: 'Without int(), score * 2 prints "4242" instead of 84!',
      },
      {
        lineNumber: 'Line 7',
        codeSnippet: 'print(f"Welcome, {name}! Score: {score * 2}")',
        whatItMeans: 'f-string evaluates expressions inside { } and writes the line to stdout.',
        whyItIsThere: 'Cleaner and faster than string concatenation with +.',
        ifDeletedError: 'Forgetting the f prefix prints literal "{name}" instead of "Argon".',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'sys.stdin.read().split()', memoryOrStack: 'parts = ["Argon", "42"]', note: 'List of 2 strings on heap' },
      { step: 2, state: 'len(parts) >= 2', memoryOrStack: '2 >= 2 -> True', note: 'Enters indented block' },
      { step: 3, state: 'int("42") * 2', memoryOrStack: 'name="Argon", score=42', note: 'Evaluates 84' },
      { step: 4, state: 'print(f"...")', memoryOrStack: 'stdout: Welcome, Argon! Score: 84', note: 'Done' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: String Multiplication instead of Integer Math',
        brokenCode: 'score = input() # "42"\nprint(score * 2) # Prints "4242"!',
        fixedCode: 'score = int(input())\nprint(score * 2) # Prints 84',
        whyItBreaks: 'input() always returns a str; multiplying a string by 2 repeats the text twice.',
      },
      {
        title: 'Trap 2: Mixing Tabs and Spaces (IndentationError)',
        brokenCode: 'if True:\n\tprint("A")\n    print("B") # Tab + Spaces!',
        fixedCode: 'if True:\n    print("A")\n    print("B")',
        whyItBreaks: 'Python 3 strictly forbids mixing tabs and spaces in the same block.',
      },
      {
        title: 'Trap 3: Forgetting the f in f-strings',
        brokenCode: 'name = "Argon"\nprint("Hi {name}") # Literal {name}!',
        fixedCode: 'name = "Argon"\nprint(f"Hi {name}")',
        whyItBreaks: 'Without the leading f, curly braces are treated as ordinary characters.',
      },
    ],
    practiceSheet: [
      {
        id: 'py-1-p1',
        difficulty: 'Easy',
        title: '1. Python Echo Greeting',
        prompt: 'Read a single name and print "Hello, <name>!".',
        banglaHint: 'sys.stdin.read().strip() বা input().strip() ব্যবহার করো।',
        starterCode: `import sys\nname = sys.stdin.read().strip()\nprint(f"Hello, {name}!")`,
        sampleStdin: 'Mina',
        expectedOutput: 'Hello, Mina!',
      },
      {
        id: 'py-1-p2',
        difficulty: 'Easy',
        title: '2. Two Numbers Sum',
        prompt: 'Read two integers and print their sum.',
        banglaHint: 'map(int, sys.stdin.read().split()) দিয়ে এক লাইনে দুটি সংখ্যা পড়া যায়।',
        starterCode: `import sys\na, b = map(int, sys.stdin.read().split())\nprint(a + b)`,
        sampleStdin: '18 24',
        expectedOutput: '42',
      },
      {
        id: 'py-1-p3',
        difficulty: 'Medium',
        title: '3. Power & Remainder',
        prompt: 'Read a and b; print a**b and a%b separated by a space.',
        banglaHint: 'Python-এ ** হলো পাওয়ার এবং // হলো পূর্ণসংখ্যা ভাগ।',
        starterCode: `import sys\na, b = map(int, sys.stdin.read().split())\nprint(a ** b, a % b)`,
        sampleStdin: '2 5',
        expectedOutput: '32 2',
      },
      {
        id: 'py-1-p4',
        difficulty: 'Medium',
        title: '4. Multi-Line Profile Card',
        prompt: 'Read name, age, city; print "<name> (<age>) - <city>".',
        banglaHint: 'parts = sys.stdin.read().split() দিয়ে ৩টি মান আলাদা করো।',
        starterCode: `import sys\nname, age, city = sys.stdin.read().split()\nprint(f"{name} ({age}) - {city}")`,
        sampleStdin: 'Sadia 21 Sylhet',
        expectedOutput: 'Sadia (21) - Sylhet',
      },
      {
        id: 'py-1-p5',
        difficulty: 'Hard',
        title: '5. Arbitrary-Precision Huge Product',
        prompt: 'Multiply two 20-digit integers (Python ints never overflow!).',
        banglaHint: 'Python-এর int যত বড়ই হোক ওভারফ্লো হয় না!',
        starterCode: `import sys\na, b = map(int, sys.stdin.read().split())\nprint(a * b)`,
        sampleStdin: '10000000000 10000000000',
        expectedOutput: '100000000000000000000',
      },
    ],
    miniBuild: {
      title: 'Fast CLI Student Badge (Python 3)',
      description: 'Reads stdin tokens in bulk, guards against short input, converts score to int, and prints an f-string banner.',
      banglaGoal: 'sys.stdin.read() ও f-string দিয়ে দ্রুতগতির Python স্বাগত ব্যানার তৈরি করা।',
      combinesChapters: 'Ch 1 (Interpreter, sys.stdin, int conversion, f-strings)',
      starterCode: `import sys\nparts = sys.stdin.read().split()\nif len(parts) >= 2:\n    name = parts[0]\n    score = int(parts[1])\n    print(f"Welcome, {name}! Score: {score * 2}")`,
      sampleStdin: 'Argon 42',
      expectedOutput: 'Welcome, Argon! Score: 84',
    },
  },

  java: {
    title: 'Java Chapter 1: JVM Bytecode, Class Main & Scanner I/O',
    banglaTitle: 'Java অধ্যায় ১: JVM বাইটকোড, Class Main ও Scanner I/O',
    subtitle: 'Demystifying public class Main, public static void main(String[] args), JVM portability, and System.out.println.',
    zeroIntuition: {
      plainEnglishStory:
        'Java code lives strictly inside a Class—you cannot put floating code outside a class! When you compile Main.java, javac turns it into platform-neutral Bytecode (Main.class). Then the Java Virtual Machine (JVM) runs that bytecode on Windows, Mac, or Linux identically by calling public static void main.',
      asciiFlowchart: `  Main.java  --(javac)-->  Main.class (Bytecode)  --(JVM)-->  Execute Main.main()
                                                                    |
                                                                    v
                                                       Scanner reads name, score
                                                                    |
                                                                    v
                                                       System.out.println(result)`,
      pseudocode: [
        '1. IMPORT java.util.Scanner utility',
        '2. DEFINE public class Main (must match Main.java filename)',
        '3. DEFINE public static void main(String[] args) entry point',
        '4. CREATE Scanner attached to System.in',
        '5. READ String name and int score -> PRINT greeting',
      ],
      banglaZeroToHero: {
        analogyTitle: 'সর্বজনীন চার্জার ও পোর্টেবল অ্যাপার্টমেন্ট (JVM)',
        explanation:
          'C কোড এক কম্পিউটারে বানালে অন্য অপারেটিং সিস্টেমে আবার কম্পাইল করতে হয়। কিন্তু Java কোড প্রথমে Bytecode নামের এক সর্বজনীন ভাষায় রূপান্তরিত হয়, যা যেকোনো JVM-এ চলে! আর Java-তে সব কোড একটি ঘরের (class Main) ভেতর সাজিয়ে রাখতে হয়।',
        everydayExample:
          'PDF ফাইলের মতো: একবার বানালে ফোন, ল্যাপটপ বা ট্যাব—সব জায়গায় দেখতে একই রকম থাকে। Java-এর "Write Once, Run Anywhere" ঠিক এটাই!',
        keyTakeaways: [
          'ফাইলের নাম Main.java হলে অবশ্যই public class Main লিখতে হবে।',
          'public static void main মানে JVM কোনো অবজেক্ট না বানিয়েই সরাসরি এখান থেকে কোড চালাতে পারবে।',
          'Scanner দিয়ে টেক্সট পড়তে next() এবং পূর্ণসংখ্যা পড়তে nextInt() ব্যবহার হয়।',
        ],
      },
    },
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 1',
        codeSnippet: 'import java.util.Scanner;',
        whatItMeans: 'Imports the Scanner class from Java’s standard utility package.',
        whyItIsThere: 'Allows reading numbers and words easily from System.in.',
        ifDeletedError: 'Compile error: cannot find symbol "Scanner".',
      },
      {
        lineNumber: 'Line 3',
        codeSnippet: 'public class Main {',
        whatItMeans: 'Declares a public blueprint container named Main.',
        whyItIsThere: 'Every Java program must live inside a class matching its filename (Main.java).',
        ifDeletedError: 'Compile error: class, interface, or enum expected.',
      },
      {
        lineNumber: 'Line 4',
        codeSnippet: 'public static void main(String[] args) {',
        whatItMeans: 'public (visible to JVM), static (callable without new Main()), void (returns nothing), args (CLI flags).',
        whyItIsThere: 'Exact signature the JVM searches for to boot your program.',
        ifDeletedError: 'Runtime error: Main method not found in class Main.',
      },
      {
        lineNumber: 'Line 5',
        codeSnippet: 'Scanner sc = new Scanner(System.in);',
        whatItMeans: 'Constructs a Scanner object wrapped around the standard input stream.',
        whyItIsThere: 'System.in only reads raw bytes; Scanner parses words and integers.',
        ifDeletedError: 'Cannot read input tokens.',
      },
      {
        lineNumber: 'Line 9',
        codeSnippet: 'System.out.println("Welcome, " + name + "! Score: " + (score * 2));',
        whatItMeans: 'Concatenates strings and prints them followed by a newline.',
        whyItIsThere: 'Parentheses around (score * 2) force math before string joining!',
        ifDeletedError: 'Without () around math like score + 2, Java prints "422" instead of "44"!',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'JVM invokes Main.main', memoryOrStack: 'args=[]', note: 'Program starts' },
      { step: 2, state: 'sc.next() & sc.nextInt()', memoryOrStack: 'name="Argon", score=42', note: 'Tokenizes System.in' },
      { step: 3, state: 'System.out.println', memoryOrStack: 'stdout: Welcome, Argon! Score: 84', note: 'Clean exit' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: Class Name Mismatch with Filename',
        brokenCode: '// Saved in Main.java:\npublic class Solution { ... }',
        fixedCode: '// Saved in Main.java:\npublic class Main { ... }',
        whyItBreaks: 'Online judges compile Main.java and require the public class to be named Main.',
      },
      {
        title: 'Trap 2: Missing Parentheses in String + Math',
        brokenCode: 'int a = 40, b = 2;\nSystem.out.println("Sum: " + a + b); // Prints Sum: 402!',
        fixedCode: 'System.out.println("Sum: " + (a + b)); // Prints Sum: 42',
        whyItBreaks: 'Java evaluates + left-to-right; once a String appears, subsequent + becomes text concatenation.',
      },
      {
        title: 'Trap 3: nextLine() skipping after nextInt()',
        brokenCode: 'int n = sc.nextInt();\nString line = sc.nextLine(); // Reads empty ""!',
        fixedCode: 'int n = sc.nextInt(); sc.nextLine();\nString line = sc.nextLine();',
        whyItBreaks: 'nextInt() leaves the trailing newline \\n in the buffer, which nextLine() immediately consumes.',
      },
    ],
    practiceSheet: [
      {
        id: 'java-1-p1',
        difficulty: 'Easy',
        title: '1. Java Greeting',
        prompt: 'Read a name token and print "Hello, <name>!".',
        banglaHint: 'sc.next() দিয়ে একটি শব্দ পড়ে println করো।',
        starterCode: `import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        String name = new Scanner(System.in).next();\n        System.out.println("Hello, " + name + "!");\n    }\n}`,
        sampleStdin: 'Amina',
        expectedOutput: 'Hello, Amina!',
      },
      {
        id: 'java-1-p2',
        difficulty: 'Easy',
        title: '2. Integer Sum',
        prompt: 'Read two ints and print their sum safely using parentheses.',
        banglaHint: 'System.out.println(a + b) লিখলে সরাসরি যোগফল প্রিন্ট হবে।',
        starterCode: `import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        System.out.println(sc.nextInt() + sc.nextInt());\n    }\n}`,
        sampleStdin: '19 23',
        expectedOutput: '42',
      },
      {
        id: 'java-1-p3',
        difficulty: 'Medium',
        title: '3. String + Math Order Check',
        prompt: 'Read x and y; print "Total: <x+y>".',
        banglaHint: '"Total: " + (x + y) — ব্র্যাকেট দিতে ভুলবে না!',
        starterCode: `import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int x = sc.nextInt(), y = sc.nextInt();\n        System.out.println("Total: " + (x + y));\n    }\n}`,
        sampleStdin: '10 25',
        expectedOutput: 'Total: 35',
      },
      {
        id: 'java-1-p4',
        difficulty: 'Medium',
        title: '4. Fast BufferedReader Line',
        prompt: 'Use BufferedReader to echo an entire line.',
        banglaHint: 'বড় ইনপুটের জন্য Scanner-এর চেয়ে BufferedReader অনেক দ্রুত।',
        starterCode: `import java.io.*;\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        System.out.println("Echo: " + br.readLine());\n    }\n}`,
        sampleStdin: 'Java 15 Ready',
        expectedOutput: 'Echo: Java 15 Ready',
      },
      {
        id: 'java-1-p5',
        difficulty: 'Hard',
        title: '5. 64-Bit Long Arithmetic',
        prompt: 'Read two long integers and print their product.',
        banglaHint: 'sc.nextLong() ব্যবহার করো যাতে 10^9 * 10^9 ওভারফ্লো না হয়।',
        starterCode: `import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        System.out.println(sc.nextLong() * sc.nextLong());\n    }\n}`,
        sampleStdin: '100000 50000',
        expectedOutput: '5000000000',
      },
    ],
    miniBuild: {
      title: 'JVM Student Badge Printer (Java)',
      description: 'Validates input presence with sc.hasNext() and prints a formatted score badge.',
      banglaGoal: 'hasNext() দিয়ে নিরাপদভাবে ইনপুট নিয়ে Java ক্লাসে ফলাফল প্রিন্ট করা।',
      combinesChapters: 'Ch 1 (Class Main, JVM entry, Scanner)',
      starterCode: `import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String name = sc.next();\n            int score = sc.nextInt();\n            System.out.println("Welcome, " + name + "! Score: " + (score * 2));\n        }\n    }\n}`,
      sampleStdin: 'Argon 42',
      expectedOutput: 'Welcome, Argon! Score: 84',
    },
  },

  javascript: {
    title: 'JavaScript Chapter 1: V8 Engine, Node/Browser Runtimes & Console',
    banglaTitle: 'JavaScript অধ্যায় ১: V8 ইঞ্জিন, রানটাইম ও কনসোল I/O',
    subtitle: 'How JavaScript runs in both Browsers and Node.js, template literals, and parsing stdin cleanly.',
    zeroIntuition: {
      plainEnglishStory:
        'JavaScript was born to make web pages interactive inside browsers, and with Node.js it also runs on servers. Inside Chrome and Node, the V8 engine compiles JS into fast machine code on the fly (JIT). You log outputs with console.log() and format text cleanly using backticks `Welcome, ${name}`.',
      asciiFlowchart: `      ( START )
          |
          v
  [ Read raw stdin text & trim whitespace ]
          |
          v
  [ Destructure [name, scoreStr] = raw.split(/\\s+/) ]
          |
          v
  [ Convert Number(scoreStr) * 2 ]
          |
          v
  [ console.log(\`Welcome, \${name}! Score: \${...}\`) ]
          |
          v
      ( STOP )`,
      pseudocode: [
        '1. READ raw string from standard input',
        '2. TRIM extra spaces and SPLIT into [name, scoreStr]',
        '3. CONVERT scoreStr to a numeric value with Number()',
        '4. PRINT greeting using template literal backticks (`)',
      ],
      banglaZeroToHero: {
        analogyTitle: 'একই চালক, দুইটি গাড়ি (Browser & Node.js)',
        explanation:
          'JavaScript হলো একমাত্র ভাষা যা একই সাথে ওয়েব ব্রাউজারের ভেতর বাটন/অ্যানিমেশন চালায়, আবার Node.js দিয়ে সার্ভারেও চলে! ব্যাকটিক (`) চিহ্ন ব্যবহার করে আমরা সহজেই টেক্সটের ভেতর ${variable} বসাতে পারি।',
        everydayExample:
          'ড্রাইভিং লাইসেন্স থাকলে যেমন প্রাইভেট কার ও মাইক্রোবাস দুটোই চালানো যায়, JavaScript শিখলে ফ্রন্টএন্ড ও ব্যাকএন্ড দুটোই তৈরি করা যায়।',
        keyTakeaways: [
          'টেমপ্লেট লিটারাল (`Welcome, ${name}`) ব্যবহার করতে কিবোর্ডের Esc বাটনের নিচের ব্যাকটিক (`) ব্যবহার করো।',
          'Number("42") + 2 = 44, কিন্তু "42" + 2 = "422"! তাই স্ট্রিং থেকে সংখ্যা বানাতে Number() জরুরি।',
        ],
      },
    },
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 1-2',
        codeSnippet: 'const raw = readAllStdin() / fs.readFileSync(0, "utf8")',
        whatItMeans: 'Reads the entire stdin stream as a UTF-8 string across both local sandbox and Node.',
        whyItIsThere: 'JavaScript has no built-in cin; reading fd 0 synchronously works for judges.',
        ifDeletedError: 'No input text available to parse.',
      },
      {
        lineNumber: 'Line 3',
        codeSnippet: 'const [name, scoreStr] = raw.trim().split(/\\s+/);',
        whatItMeans: 'Array destructuring: assigns the 1st word to name and 2nd word to scoreStr.',
        whyItIsThere: '.trim() removes trailing newlines; /\\s+/ splits on any spaces or line breaks.',
        ifDeletedError: 'Trailing newlines leave empty strings in the array.',
      },
      {
        lineNumber: 'Line 4',
        codeSnippet: 'if (name && scoreStr)',
        whatItMeans: 'Truthy guard ensuring both values are non-empty before printing.',
        whyItIsThere: 'Prevents printing "Welcome, undefined! Score: NaN".',
        ifDeletedError: 'Empty input prints NaN.',
      },
      {
        lineNumber: 'Line 5',
        codeSnippet: 'console.log(`Welcome, ${name}! Score: ${Number(scoreStr) * 2}`);',
        whatItMeans: 'Interpolates variables inside backticks and prints to stdout.',
        whyItIsThere: 'Number() explicitly converts string input into numeric math.',
        ifDeletedError: 'Using single quotes \' instead of backticks ` prints literal "${name}".',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'raw.trim().split(/\\s+/)', memoryOrStack: '["Argon", "42"]', note: 'Destructured into consts' },
      { step: 2, state: 'Number("42") * 2', memoryOrStack: '84 (IEEE-754 number)', note: 'Converted safely' },
      { step: 3, state: 'console.log(...)', memoryOrStack: 'stdout: Welcome, Argon! Score: 84', note: 'Done' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: String + Number Coercion ("42" + 8 === "428")',
        brokenCode: 'const s = "42";\nconsole.log(s + 8); // Outputs "428"!',
        fixedCode: 'const s = "42";\nconsole.log(Number(s) + 8); // Outputs 50',
        whyItBreaks: 'The + operator prefers string concatenation when either operand is a string.',
      },
      {
        title: 'Trap 2: Using Regular Quotes Instead of Backticks',
        brokenCode: 'console.log("Hi ${name}"); // Prints ${name} literally',
        fixedCode: 'console.log(`Hi ${name}`);',
        whyItBreaks: 'Template interpolation only works inside backticks (`).',
      },
      {
        title: 'Trap 3: Reassigning a const Variable',
        brokenCode: 'const x = 10;\nx = 20; // TypeError!',
        fixedCode: 'let x = 10;\nx = 20;',
        whyItBreaks: 'Use const when a binding never changes, and let when you plan to reassign it.',
      },
    ],
    practiceSheet: [
      {
        id: 'js-1-p1',
        difficulty: 'Easy',
        title: '1. Template Greeting',
        prompt: 'Read name from stdin and print "Hello, <name>!".',
        banglaHint: 'ব্যাকটিক (`) দিয়ে `Hello, ${name}!` প্রিন্ট করো।',
        starterCode: `const name = readAllStdin().trim();\nconsole.log(\`Hello, \${name}!\`);`,
        sampleStdin: 'Nabila',
        expectedOutput: 'Hello, Nabila!',
      },
      {
        id: 'js-1-p2',
        difficulty: 'Easy',
        title: '2. Numeric Addition',
        prompt: 'Read two numbers and print their numeric sum.',
        banglaHint: '.map(Number) ব্যবহার করলে স্ট্রিংগুলো সংখ্যায় বদলে যাবে।',
        starterCode: `const [a, b] = readAllStdin().trim().split(/\\s+/).map(Number);\nconsole.log(a + b);`,
        sampleStdin: '14 28',
        expectedOutput: '42',
      },
      {
        id: 'js-1-p3',
        difficulty: 'Medium',
        title: '3. JSON Object Printer',
        prompt: 'Read user and role; print compact JSON {"user":"...","role":"..."}.',
        banglaHint: 'JSON.stringify({ user, role }) ব্যবহার করো।',
        starterCode: `const [user, role] = readAllStdin().trim().split(/\\s+/);\nconsole.log(JSON.stringify({ user, role }));`,
        sampleStdin: 'tanvir admin',
        expectedOutput: '{"user":"tanvir","role":"admin"}',
      },
      {
        id: 'js-1-p4',
        difficulty: 'Medium',
        title: '4. Multi-Value Average',
        prompt: 'Read 3 numbers and print their exact integer floor average.',
        banglaHint: 'Math.floor((a + b + c) / 3) ব্যবহার করো।',
        starterCode: `const [a, b, c] = readAllStdin().trim().split(/\\s+/).map(Number);\nconsole.log(Math.floor((a + b + c) / 3));`,
        sampleStdin: '10 20 30',
        expectedOutput: '20',
      },
      {
        id: 'js-1-p5',
        difficulty: 'Hard',
        title: '5. BigInt Huge Multiplication',
        prompt: 'Multiply two huge integers using BigInt so precision is never lost.',
        banglaHint: 'JavaScript-এ সাধারণ Number ২^৫৩ পর্যন্ত নিখুঁত থাকে; এর চেয়ে বড় হলে BigInt লাগে।',
        starterCode: `const [a, b] = readAllStdin().trim().split(/\\s+/).map(BigInt);\nconsole.log((a * b).toString());`,
        sampleStdin: '9999999999 1000000000',
        expectedOutput: '9999999999000000000',
      },
    ],
    miniBuild: {
      title: 'Runtime-Agnostic CLI Greeter (JS)',
      description: 'Works in both Browser Sandbox and Node.js to parse tokens and format score output.',
      banglaGoal: 'ব্রাউজার ও Node.js উভয় পরিবেশেই কাজ করে এমন ইনপুট-আউটপুট স্ক্রিপ্ট।',
      combinesChapters: 'Ch 1 (Destructuring, Number(), Template Literals)',
      starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst [name, scoreStr] = raw.trim().split(/\\s+/);\nif (name && scoreStr) {\n  console.log(\`Welcome, \${name}! Score: \${Number(scoreStr) * 2}\`);\n}`,
      sampleStdin: 'Argon 42',
      expectedOutput: 'Welcome, Argon! Score: 84',
    },
  },

  rust: {
    title: 'Rust Chapter 1: Cargo/rustc, Immutability & Safe Stdin Parsing',
    banglaTitle: 'Rust অধ্যায় ১: কম্পাইলার, ইমিউটেবিলিটি ও নিরাপদ I/O',
    subtitle: 'Understanding fn main(), let mut bindings, Result handling, and why Rust prevents crashes at compile time.',
    zeroIntuition: {
      plainEnglishStory:
        'Rust gives you C/C++ hardware speed while guaranteeing your program will never crash from null pointers or invalid memory access. Every variable is immutable (locked) by default unless you explicitly write `let mut`. Reading input returns a Result type so you never silently ignore failed reads.',
      asciiFlowchart: `      ( START: fn main() )
               |
               v
  [ Create mutable String buffer: let mut buf = String::new() ]
               |
               v
  [ io::stdin().read_to_string(&mut buf) ]
               |
               v
  [ Split whitespace -> parse score as i32 ]
               |
               v
  [ println!("Welcome, {}! Score: {}", name, score * 2) ]
               |
               v
          ( STOP )`,
      pseudocode: [
        '1. IMPORT std::io and Read trait',
        '2. CREATE mutable empty String buf',
        '3. FILL buf by passing mutable borrow (&mut buf) to stdin',
        '4. EXTRACT name and parsed integer score via if let',
        '5. PRINT formatted string with println! macro',
      ],
      banglaZeroToHero: {
        analogyTitle: 'সতর্ক সিকিউরিটি গার্ড (Rust Compiler)',
        explanation:
          'C/C++ তোমাকে ছুরি দিয়ে বলে "সাবধানে কাটবে"—হাত কাটলে নিজের দোষ। কিন্তু Rust হলো এমন এক সিকিউরিটি গার্ড, যে রান করার আগেই কোড চেক করে দেখে কোথাও ভুল হলে মেমোরি নষ্ট হবে কি না! Rust-এ ভ্যারিয়েবল ডিফল্টভাবে পরিবর্তন করা যায় না (Immutable), বদলাতে চাইলে লিখতে হয় let mut।',
        everydayExample:
          'একটি লক করা ড্রয়ার: চাবি দিয়ে mut না খুললে কেউ ভুল করে ভেতরের জিনিস বদলে ফেলতে পারবে না।',
        keyTakeaways: [
          'println! এর শেষে ! চিহ্ন আছে কারণ এটি একটি Macro, সাধারণ ফাংশন নয়।',
          'let x = 5 লক করা থাকে; পরিবর্তন করতে চাইলে let mut x = 5 লিখতে হয়।',
        ],
      },
    },
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 1',
        codeSnippet: 'use std::io::{self, Read};',
        whatItMeans: 'Imports the io module and the Read trait needed for .read_to_string().',
        whyItIsThere: 'Traits in Rust must be in scope to call their methods.',
        ifDeletedError: 'Compile error: no method named "read_to_string" found for Stdin.',
      },
      {
        lineNumber: 'Line 3',
        codeSnippet: 'fn main() {',
        whatItMeans: 'Declares the entry function (`fn` keyword).',
        whyItIsThere: 'Every Rust binary begins execution in main().',
        ifDeletedError: 'Compile error: "main" function not found in crate.',
      },
      {
        lineNumber: 'Line 4',
        codeSnippet: 'let mut buf = String::new();',
        whatItMeans: 'Allocates a growable UTF-8 String marked mutable (`mut`) so stdin can write into it.',
        whyItIsThere: 'Variables in Rust are read-only unless `mut` is specified.',
        ifDeletedError: 'Without `mut`: error[E0596]: cannot borrow `buf` as mutable.',
      },
      {
        lineNumber: 'Line 5',
        codeSnippet: 'io::stdin().read_to_string(&mut buf).unwrap();',
        whatItMeans: 'Reads all bytes from stdin into buf via a mutable reference `&mut buf`.',
        whyItIsThere: 'Handles Result explicitly so I/O failures are never silently ignored.',
        ifDeletedError: 'buf remains empty.',
      },
      {
        lineNumber: 'Line 9',
        codeSnippet: 'println!("Welcome, {}! Score: {}", name, score * 2);',
        whatItMeans: 'Macro that checks format placeholders `{}` count at compile time!',
        whyItIsThere: 'Unlike C printf, mismatched placeholders fail to compile instead of crashing.',
        ifDeletedError: 'Missing `!` -> error: expected function, found macro println.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'let mut buf = String::new()', memoryOrStack: 'Heap cap=0, len=0', note: 'Empty growable string' },
      { step: 2, state: 'read_to_string(&mut buf)', memoryOrStack: 'buf="Argon 42"', note: 'Populated from stdin' },
      { step: 3, state: 'parse::<i32>()', memoryOrStack: 'score=42', note: 'Safe numeric parse' },
      { step: 4, state: 'println!(...)', memoryOrStack: 'stdout: Welcome, Argon! Score: 84', note: 'buf auto-dropped (freed)' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: Forgetting `mut` when modifying a variable',
        brokenCode: 'let x = 10;\nx = 20; // Compile Error!',
        fixedCode: 'let mut x = 10;\nx = 20;',
        whyItBreaks: 'Rust defaults all bindings to immutable to prevent accidental mutations.',
      },
      {
        title: 'Trap 2: Forgetting `!` on println!',
        brokenCode: 'println("Hello"); // Not a function!',
        fixedCode: 'println!("Hello");',
        whyItBreaks: 'println! is a compile-time macro because Rust functions do not support variadic arguments.',
      },
      {
        title: 'Trap 3: Integer Literal Type Overflow on 32-bit default',
        brokenCode: 'let x = 100_000;\nprintln!("{}", x * x); // Panics in debug mode!',
        fixedCode: 'let x: i64 = 100_000;\nprintln!("{}", x * x);',
        whyItBreaks: 'Rust infers integer literals as i32 by default, which overflows above 2.14e9.',
      },
    ],
    practiceSheet: [
      {
        id: 'rs-1-p1',
        difficulty: 'Easy',
        title: '1. Rust Safe Echo',
        prompt: 'Read a name and print "Hello, <name>!".',
        banglaHint: 'buf.trim() ব্যবহার করে বাড়তি স্পেস/নিউলাইন কেটে দাও।',
        starterCode: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n    println!("Hello, {}!", s.trim());\n}`,
        sampleStdin: 'Rohan',
        expectedOutput: 'Hello, Rohan!',
      },
      {
        id: 'rs-1-p2',
        difficulty: 'Easy',
        title: '2. Parse Two Integers',
        prompt: 'Read two i64 integers and print their sum.',
        banglaHint: 'split_whitespace() ও .parse::<i64>() ব্যবহার করো।',
        starterCode: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n    let v: Vec<i64> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();\n    println!("{}", v[0] + v[1]);\n}`,
        sampleStdin: '25 17',
        expectedOutput: '42',
      },
      {
        id: 'rs-1-p3',
        difficulty: 'Medium',
        title: '3. Safe Option Fallback',
        prompt: 'Read optional integer; if missing print 0, else print n * 3.',
        banglaHint: '.unwrap_or(0) ব্যবহার করলে ক্র্যাশ ছাড়াই ডিফল্ট মান পাওয়া যায়।',
        starterCode: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n    let n: i64 = s.trim().parse().unwrap_or(0);\n    println!("{}", n * 3);\n}`,
        sampleStdin: '12',
        expectedOutput: '36',
      },
      {
        id: 'rs-1-p4',
        difficulty: 'Medium',
        title: '4. Tuple Return & Destructuring',
        prompt: 'Read a and b; print quotient and remainder.',
        banglaHint: 'একসাথে (a / b, a % b) হিসাব করে প্রিন্ট করো।',
        starterCode: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n    let v: Vec<i64> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();\n    println!("{} {}", v[0] / v[1], v[0] % v[1]);\n}`,
        sampleStdin: '17 5',
        expectedOutput: '3 2',
      },
      {
        id: 'rs-1-p5',
        difficulty: 'Hard',
        title: '5. Checked 64-bit Multiplication',
        prompt: 'Read two i64 numbers and print their product.',
        banglaHint: 'বড় সংখ্যার জন্য i64 টাইপ ব্যবহার করো।',
        starterCode: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n    let v: Vec<i64> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();\n    println!("{}", v[0] * v[1]);\n}`,
        sampleStdin: '200000 300000',
        expectedOutput: '60000000000',
      },
    ],
    miniBuild: {
      title: 'Zero-Panic Rust Stdin Greeter',
      description: 'Safely destructures stdin tokens via pattern matching (`if let`) and formats output with println!.',
      banglaGoal: 'if let প্যাটার্ন ম্যাচিং ব্যবহার করে ক্র্যাশ-মুক্ত Rust প্রোগ্রাম তৈরি করা।',
      combinesChapters: 'Ch 1 (fn main, mut String, pattern matching)',
      starterCode: `use std::io::{self, Read};\nfn main() {\n    let mut buf = String::new();\n    io::stdin().read_to_string(&mut buf).unwrap();\n    let mut it = buf.split_whitespace();\n    if let (Some(name), Some(s)) = (it.next(), it.next()) {\n        let score: i32 = s.parse().unwrap_or(0);\n        println!("Welcome, {}! Score: {}", name, score * 2);\n    }\n}`,
      sampleStdin: 'Argon 42',
      expectedOutput: 'Welcome, Argon! Score: 84',
    },
  },

  typescript: {
    title: 'TypeScript Chapter 1: Structural Types & Compile-Time Contracts',
    banglaTitle: 'TypeScript অধ্যায় ১: স্ট্যাটিক টাইপ সিস্টেম ও নিরাপদ কোড',
    subtitle: 'How TypeScript adds compile-time type safety on top of JavaScript so bugs are caught before code even runs.',
    zeroIntuition: {
      plainEnglishStory:
        'JavaScript lets you accidentally pass text where a number was expected, only crashing when a user clicks a button in production. TypeScript solves this by checking every variable’s shape (`number`, `string`, `boolean`) BEFORE running the code, then erasing the type annotations to produce clean JavaScript.',
      asciiFlowchart: `  [ index.ts (with :number / :string types) ]
                     |
                     v
       [ TypeScript Compiler (tsc) ] --(Type Mismatch)--> ❌ Compile Error BEFORE Run!
                     | (Valid)
                     v
       [ Clean JavaScript (index.js) ] --> Runs in Browser / Node`,
      pseudocode: [
        '1. READ raw stdin string',
        '2. SPLIT into name and scoreStr',
        '3. ANNOTATE score: number = Number(scoreStr)',
        '4. OUTPUT greeting safely verified by compiler',
      ],
      banglaZeroToHero: {
        analogyTitle: 'ফ্লাইট টেকঅফের আগের সেফটি চেকলিস্ট (TypeScript Compiler)',
        explanation:
          'JavaScript হলো সরাসরি গাড়ি নিয়ে বেরিয়ে পড়া—চাকা ঠিক আছে কি না রাস্তায় গিয়ে বোঝা যাবে। আর TypeScript হলো বিমান উড্ডয়নের আগের ইঞ্জিনিয়ারিং চেকলিস্ট: সংখ্যার জায়গায় ভুল করে টেক্সট দিলে কোড রান করার আগেই লাল দাগ দেখিয়ে সতর্ক করে দেয়!',
        everydayExample:
          'ফর্মে ফোন নম্বরের ঘরে কেউ নাম লিখলে ফর্ম সাবমিট করার আগেই যেমন "অনুগ্রহ করে নম্বর লিখুন" বলে, TypeScript কোডের ক্ষেত্রে ঠিক সেটাই করে।',
        keyTakeaways: [
          'const score: number লিখে আমরা বলে দিই এই বাক্সে কেবল সংখ্যাই রাখা যাবে।',
          'টাইপ শুধু কম্পাইল টাইমে থাকে—রানটাইমে তা পরিষ্কার JavaScript হয়ে যায়।',
        ],
      },
    },
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 1',
        codeSnippet: "import * as fs from 'fs';",
        whatItMeans: 'Imports Node filesystem module with full TypeScript type definitions.',
        whyItIsThere: 'Enables typed readFileSync(0, "utf8") calls.',
        ifDeletedError: 'Cannot find name "fs".',
      },
      {
        lineNumber: 'Line 3',
        codeSnippet: "const raw = fs.readFileSync(0, 'utf8').trim();",
        whatItMeans: 'TypeScript automatically infers `raw` has type `string`.',
        whyItIsThere: 'Type inference gives safety without verbose annotations everywhere.',
        ifDeletedError: 'Cannot find name "raw".',
      },
      {
        lineNumber: 'Line 6',
        codeSnippet: 'const score: number = Number(scoreStr);',
        whatItMeans: 'Explicitly guarantees `score` is a `number`, blocking string math mistakes.',
        whyItIsThere: 'Assigning `scoreStr` directly without `Number()` is rejected immediately by `tsc`.',
        ifDeletedError: 'If assigned a string directly: TS2322: Type "string" is not assignable to type "number".',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'tsc type-check pass', memoryOrStack: 'raw: string, score: number', note: 'Zero type errors' },
      { step: 2, state: 'Parse "Argon 42"', memoryOrStack: 'name="Argon", score=42', note: 'Runtime execution' },
      { step: 3, state: 'console.log', memoryOrStack: 'stdout: Welcome, Argon! Score: 84', note: 'Verified' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: Using `: any` to silence compiler errors',
        brokenCode: 'const data: any = "42";\nconsole.log(data * 2); // Hides bugs!',
        fixedCode: 'const data: number = Number("42");\nconsole.log(data * 2);',
        whyItBreaks: 'Using `any` turns off TypeScript protection completely.',
      },
      {
        title: 'Trap 2: Assuming split() indices are always defined',
        brokenCode: 'const parts = "".split(" ");\nconsole.log(parts[1].toUpperCase()); // Crashes!',
        fixedCode: 'const [a, b] = parts;\nif (b) console.log(b.toUpperCase());',
        whyItBreaks: 'Array indexing may return undefined if input is short.',
      },
      {
        title: 'Trap 3: Confusing TypeScript `: number` with runtime validation',
        brokenCode: 'const n = "abc" as unknown as number;',
        fixedCode: 'const n = Number(input); if (!Number.isNaN(n)) { ... }',
        whyItBreaks: 'Type assertions (`as`) are erased at runtime and do not convert strings.',
      },
    ],
    practiceSheet: [
      {
        id: 'ts-1-p1',
        difficulty: 'Easy',
        title: '1. Typed Greeter',
        prompt: 'Read name: string and print "Hello, <name>!".',
        banglaHint: 'const name: string লিখে টাইপ নির্ধারণ করো।',
        starterCode: `import * as fs from 'fs';\nconst name: string = fs.readFileSync(0, 'utf8').trim();\nconsole.log(\`Hello, \${name}!\`);`,
        sampleStdin: 'Farhan',
        expectedOutput: 'Hello, Farhan!',
      },
      {
        id: 'ts-1-p2',
        difficulty: 'Easy',
        title: '2. Typed Number Addition',
        prompt: 'Read two numbers into a `number[]` and print their sum.',
        banglaHint: '.map(Number) এর রেজাল্ট number[] টাইপের হয়।',
        starterCode: `import * as fs from 'fs';\nconst [a, b]: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);\nconsole.log(a + b);`,
        sampleStdin: '15 27',
        expectedOutput: '42',
      },
      {
        id: 'ts-1-p3',
        difficulty: 'Medium',
        title: '3. Interface User Payload',
        prompt: 'Define `interface Student { name: string; score: number; }` and print JSON.',
        banglaHint: 'interface দিয়ে অবজেক্টের গঠন নির্দিষ্ট করো।',
        starterCode: `import * as fs from 'fs';\ninterface Student { name: string; score: number; }\nconst [name, s] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/);\nconst st: Student = { name, score: Number(s) };\nconsole.log(JSON.stringify(st));`,
        sampleStdin: 'rahat 95',
        expectedOutput: '{"name":"rahat","score":95}',
      },
      {
        id: 'ts-1-p4',
        difficulty: 'Medium',
        title: '4. Literal Union Status',
        prompt: 'Read score; print "PASS" if >= 50 else "RETRY" typed as `"PASS" | "RETRY"`.',
        banglaHint: 'ইউনিয়ন টাইপ দিয়ে সীমিত আউটপুট নিশ্চিত করো।',
        starterCode: `import * as fs from 'fs';\nconst score: number = Number(fs.readFileSync(0, 'utf8').trim());\nconst status: 'PASS' | 'RETRY' = score >= 50 ? 'PASS' : 'RETRY';\nconsole.log(status);`,
        sampleStdin: '64',
        expectedOutput: 'PASS',
      },
      {
        id: 'ts-1-p5',
        difficulty: 'Hard',
        title: '5. Typed Helper Function',
        prompt: 'Write `function doubleVal(n: number): number` and print doubled input.',
        banglaHint: 'প্যারামিটার ও রিটার্ন টাইপ দুটোই : number দাও।',
        starterCode: `import * as fs from 'fs';\nfunction doubleVal(n: number): number { return n * 2; }\nconst val: number = Number(fs.readFileSync(0, 'utf8').trim());\nconsole.log(doubleVal(val));`,
        sampleStdin: '42',
        expectedOutput: '84',
      },
    ],
    miniBuild: {
      title: 'Type-Safe CLI Welcome Engine (TS)',
      description: 'Combines typed parsing, guard checks, and compile-time checked arithmetic.',
      banglaGoal: 'টাইপ-সেফ TypeScript কোডে নিরাপদ ইনপুট পার্সিং তৈরি করা।',
      combinesChapters: 'Ch 1 (Type annotations, guard narrowing, template literals)',
      starterCode: `import * as fs from 'fs';\nconst raw = fs.readFileSync(0, 'utf8').trim();\nconst [name, scoreStr] = raw.split(/\\s+/);\nif (name && scoreStr) {\n  const score: number = Number(scoreStr);\n  console.log(\`Welcome, \${name}! Score: \${score * 2}\`);\n}`,
      sampleStdin: 'Argon 42',
      expectedOutput: 'Welcome, Argon! Score: 84',
    },
  },

  html: {
    title: 'HTML Chapter 1: Document Skeleton, Semantic Tags & Browser DOM',
    banglaTitle: 'HTML অধ্যায় ১: ওয়েবসাইটের কঙ্কাল, সিমান্টিক ট্যাগ ও DOM',
    subtitle: 'Understand <!doctype html>, <head>, <body>, semantic landmarks, and how browsers turn tags into visual pixels.',
    zeroIntuition: {
      plainEnglishStory:
        'HTML is NOT a math programming language—it is the structural skeleton of every website on Earth! Every page is made of nested boxes called Tags (`<header>`, `<main>`, `<h1>`, `<p>`). When a browser downloads an HTML file, it builds a live tree of those boxes (the DOM Tree), applies CSS paint, and shows the page on your screen.',
      asciiFlowchart: `  index.html (Text File)
           |
           v
  [ Browser HTML Parser ]
           |
           +---> <head> (Page Title, CSS Styles, Meta)
           |
           +---> <body> (Visible Content Tree)
                    |
                    +---> <main class="card">
                             +---> <h1>Heading</h1>
                             +---> <p>Welcome Text</p>`,
      pseudocode: [
        '1. DECLARE <!doctype html> so browser uses modern HTML5 standards',
        '2. OPEN <html> root container',
        '3. ADD <head> with <style> colors and spacing',
        '4. ADD <body> with semantic <main> card, <h1> title, and <p> text',
      ],
      banglaZeroToHero: {
        analogyTitle: 'বিল্ডিংয়ের আরসিসি কঙ্কাল (HTML) ও রঙ-সাজসজ্জা (CSS)',
        explanation:
          'একটি নতুন বাড়ি বানাতে প্রথমে যেমন ইট-রড-সিমেন্ট দিয়ে কলাম, ছাদ আর ঘর তৈরি করতে হয়—HTML হলো ওয়েবসাইটের ঠিক সেই কঙ্কাল! এরপর ঘরে রঙ করা, পর্দা লাগানো হলো CSS। আর দরজার বেল বাজলে আলো জ্বলে ওঠা হলো JavaScript।',
        everydayExample:
          'একটি খবরের কাগজের কথা ভাবো: বড় হেডলাইন (<h1>), ছোট অনুচ্ছেদ (<p>), আর মূল খবরের এলাকা (<main>)—HTML ট্যাগ দিয়ে ব্রাউজারকে ঠিক এভাবেই বলে দেওয়া হয় কোন অংশটা কী।',
        keyTakeaways: [
          'বেশিরভাগ HTML ট্যাগের একটি শুরু (<p>) এবং একটি শেষ (</p>) ট্যাগ থাকে।',
          '<div> ব্যবহারের চেয়ে <header>, <main>, <article> ব্যবহার করলে SEO ও Accessibility ভালো হয়।',
        ],
      },
    },
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 1',
        codeSnippet: '<!doctype html>',
        whatItMeans: 'Tells the browser this document follows modern HTML5 standards.',
        whyItIsThere: 'Without it, browsers enter legacy "Quirks Mode" and break modern CSS layouts.',
        ifDeletedError: 'CSS widths/box-sizing behave inconsistently across browsers.',
      },
      {
        lineNumber: 'Line 2-3',
        codeSnippet: '<html lang="en"><head>...',
        whatItMeans: 'Root wrapper (`lang="en"` helps screen readers) and invisible metadata/styling section.',
        whyItIsThere: '<head> loads fonts, title, and <style> before painting pixels.',
        ifDeletedError: 'Screen readers lose language pronunciation.',
      },
      {
        lineNumber: 'Line 11',
        codeSnippet: '<body><main class="card">',
        whatItMeans: '<body> holds everything visible; <main> marks the primary page landmark.',
        whyItIsThere: 'Semantic landmarks let keyboard and screen-reader users jump directly to main content.',
        ifDeletedError: 'Content lacks semantic landmark structure.',
      },
      {
        lineNumber: 'Line 13-14',
        codeSnippet: '<h1>...</h1> <p>...</p>',
        whatItMeans: 'Primary page heading (h1) and paragraph text (p).',
        whyItIsThere: 'Creates visual hierarchy and search engine indexing clarity.',
        ifDeletedError: 'Unclosed tags cause styles to leak into following elements!',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'Parse <!doctype html>', memoryOrStack: 'Standards Mode ON', note: 'HTML5 tokenizer active' },
      { step: 2, state: 'Build DOM + CSSOM', memoryOrStack: 'html -> body -> main -> h1, p', note: 'Attach .card styles' },
      { step: 3, state: 'Paint to Viewport', memoryOrStack: 'Card rendered in split preview', note: 'Live visual output' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: Forgetting to close a tag (</h1> or </p>)',
        brokenCode: '<h1>Title<p>Body text</p>',
        fixedCode: '<h1>Title</h1>\n<p>Body text</p>',
        whyItBreaks: 'An unclosed heading forces the entire paragraph below it to inherit giant heading styles!',
      },
      {
        title: 'Trap 2: Using <div> for buttons instead of <button>',
        brokenCode: '<div onclick="go()">Click Me</div>',
        fixedCode: '<button type="button">Click Me</button>',
        whyItBreaks: '<div> buttons cannot be focused with the Tab key or activated with Enter/Space.',
      },
      {
        title: 'Trap 3: Putting multiple <h1> tags or skipping heading order',
        brokenCode: '<h1>Title</h1><h4>Sub</h4>',
        fixedCode: '<h1>Title</h1><h2>Sub</h2>',
        whyItBreaks: 'Maintain clean h1 -> h2 -> h3 hierarchy for accessibility and SEO.',
      },
    ],
    practiceSheet: [
      {
        id: 'html-1-p1',
        difficulty: 'Easy',
        title: '1. Personal Bio Card',
        prompt: 'Create a <main> card with an <h1> name and <p> bio.',
        banglaHint: '<h1> এর ভেতর নাম এবং <p> এর ভেতর পরিচিতি লেখো।',
        starterCode: `<!doctype html>\n<html><body style="background:#090d16;color:#f8fafc;font-family:sans-serif;padding:24px">\n  <main><h1>Arjun Roy</h1><p>Aspiring Full-Stack Engineer</p></main>\n</body></html>`,
        sampleStdin: '',
        expectedOutput: 'Valid HTML5 document',
      },
      {
        id: 'html-1-p2',
        difficulty: 'Easy',
        title: '2. Ordered Learning Steps',
        prompt: 'Build an <ol> list of 3 daily coding habits.',
        banglaHint: '<ol> এর ভেতর ৩টি <li> ট্যাগ লেখো।',
        starterCode: `<!doctype html>\n<html><body style="background:#090d16;color:#f8fafc;font-family:sans-serif;padding:24px">\n  <h2>Daily Routine</h2>\n  <ol><li>Flowchart</li><li>Dry Run</li><li>Code & Test</li></ol>\n</body></html>`,
        sampleStdin: '',
        expectedOutput: 'Valid HTML5 document',
      },
      {
        id: 'html-1-p3',
        difficulty: 'Medium',
        title: '3. Semantic Article Layout',
        prompt: 'Structure a blog post with <header>, <article>, and <footer>.',
        banglaHint: 'সিমান্টিক ট্যাগ ব্যবহার করে পেজটিকে ৩টি অংশে ভাগ করো।',
        starterCode: `<!doctype html>\n<html><body style="background:#090d16;color:#e2e8f0;font-family:sans-serif;padding:24px">\n  <header><h1>Tech Notes</h1></header>\n  <article><h2>Why Semantic HTML Matters</h2><p>Screen readers love landmarks.</p></article>\n  <footer><small>2026 Academy</small></footer>\n</body></html>`,
        sampleStdin: '',
        expectedOutput: 'Valid HTML5 document',
      },
      {
        id: 'html-1-p4',
        difficulty: 'Medium',
        title: '4. Styled Notice Banner',
        prompt: 'Style a clean card with border, padding, and contrast text.',
        banglaHint: '<style> ট্যাগের ভেতর .banner ক্লাস ডিজাইন করো।',
        starterCode: `<!doctype html>\n<html><head><style>.banner{border:1px solid #38bdf8;padding:16px;border-radius:10px;background:#0f172a;color:#f8fafc}</style></head>\n<body style="background:#090d16;padding:20px;font-family:sans-serif"><div class="banner"><strong>Tip:</strong> Always include alt text on images.</div></body></html>`,
        sampleStdin: '',
        expectedOutput: 'Valid HTML5 document',
      },
      {
        id: 'html-1-p5',
        difficulty: 'Hard',
        title: '5. Accessible Login Form Skeleton',
        prompt: 'Build a form with properly linked <label for="..."> and required <input>.',
        banglaHint: 'label-এর for এবং input-এর id সব সময় একই হতে হবে।',
        starterCode: `<!doctype html>\n<html><body style="background:#090d16;color:#f8fafc;font-family:sans-serif;padding:24px">\n  <form style="display:grid;gap:10px;max-width:280px">\n    <label for="email">Email</label>\n    <input id="email" type="email" required placeholder="dev@argon.io" style="padding:8px;border-radius:6px"/>\n    <button type="submit" style="padding:8px;background:#38bdf8;border:none;border-radius:6px;font-weight:700">Continue</button>\n  </form>\n</body></html>`,
        sampleStdin: '',
        expectedOutput: 'Valid HTML5 document',
      },
    ],
    miniBuild: {
      title: 'Live Profile Card (HTML5 + CSS3)',
      description: 'Renders a dark-themed developer welcome card in the split-pane live browser preview.',
      banglaGoal: 'HTML5 ও CSS3 দিয়ে প্রথম পূর্ণাঙ্গ কার্ড তৈরি করে লাইভ প্রিভিউতে দেখা।',
      combinesChapters: 'Ch 1 (Doctype, head/style, semantic main, typography)',
      starterCode: `<!doctype html>\n<html lang="en">\n<head>\n  <style>\n    body { font-family: system-ui, sans-serif; background: #0f172a; color: #f8fafc; padding: 24px; }\n    .card { max-width: 420px; border: 1px solid #334155; border-radius: 12px; padding: 20px; background: #1e293b; }\n    h1 { margin: 0 0 8px; font-size: 20px; color: #38bdf8; }\n    p { margin: 0; color: #cbd5e1; }\n  </style>\n</head>\n<body>\n  <main class="card">\n    <h1>Architecture & Live DOM Stream</h1>\n    <p>Welcome, Argon! Score: <strong>84</strong></p>\n  </main>\n</body>\n</html>`,
      sampleStdin: '',
      expectedOutput: 'Valid HTML5 document',
    },
  },
};
