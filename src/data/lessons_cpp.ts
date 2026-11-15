import type { AtomicLessonOverride } from './atomicLessonTypes';
import { LESSONS_CPP_P2 } from './lessons_cpp_p2';
import { LESSONS_CPP_P3 } from './lessons_cpp_p3';
import { LESSONS_CPP_P4 } from './lessons_cpp_p4';
import { LESSONS_CPP_P5 } from './lessons_cpp_p5';

export const LESSONS_CPP: Record<number, AtomicLessonOverride> = {
  1: {
    chapterNumber: 1,
    title: 'C++ Chapter 1 (C++23): Compiler Pipeline, Fast I/O & Program Anatomy',
    banglaTitle: 'C++ অধ্যায় ১ (C++23): কম্পাইলার পাইপলাইন, ফাস্ট I/O ও প্রথম প্রোগ্রাম',
    subtitle: 'Understand C++ translation units, namespaces, std::cout/cin streams, and ios::sync_with_stdio(false) speed.',
    zeroIntuition: {
      plainEnglishStory:
        'C++ compiles directly down to blistering-fast native machine instructions with zero garbage-collection pauses or interpreter overhead. Before your first line ever runs, the preprocessor expands headers like <iostream>, the compiler translates AST expressions into assembly, and the linker stitches everything into an executable binary that enters at int main().\n\nInside main(), C++ treats standard input and output as byte streams (std::cin >> and std::cout <<). By default, C++ synchronizes streams with C stdio and flushes cout before every cin read—which slows 10^5 competitive inputs to a crawl. Adding ios::sync_with_stdio(false) and cin.tie(nullptr) while ending lines with "\\n" instead of endl unlocks native buffered I/O speed.',
      asciiFlowchart: `  [ main.cpp ] --(Preprocessor + g++ -std=c++23 -O2)--> [ Binary ]
        |
        v
  [ ios::sync_with_stdio(false); cin.tie(nullptr); ]
        |
        v
  [ cin >> handle >> pts ] --> [ cout << ... << "\\n" ] --> ( return 0 )`,
      pseudocode: [
        '1. INCLUDE <iostream> and <string>',
        '2. DETACH C stdio sync for fast buffered streams',
        '3. READ handle and pts from cin',
        '4. OUTPUT formatted greeting using \\n (never endl)',
      ],
      banglaZeroToHero: {
        analogyTitle: 'সুপারসনিক বুলেট ট্রেন ও ফাস্ট I/O স্টেশন',
        explanation:
          'C++ হলো প্রোগ্রামিং জগতের ফর্মুলা-১ রেসিং কার—সবচেয়ে দ্রুতগতির কারণেই Codeforces ও ICPC-এর ৯০% প্রতিযোগী C++ ব্যবহার করেন। একটি .cpp ফাইল চালানোর সময় প্রথমে প্রি-প্রসেসর #include <iostream> লাইব্রেরি যুক্ত করে, তারপর g++ কম্পাইলার পুরো কোডটিকে সরাসরি প্রসেসরের নেটিভ মেশিন কোডে অনুবাদ করে। প্রোগ্রামের আসল যাত্রা শুরু হয় int main() ফাংশন থেকে। স্ক্রিনে তথ্য দেখাতে std::cout << এবং কিবোর্ড বা stdin থেকে ইনপুট নিতে std::cin >> ব্যবহার করা হয়। সাধারণত C-এর stdio-র সাথে তাল মেলাতে গিয়ে C++ প্রতি লাইনে বাফার আটকে রাখে; তাই কনটেস্ট কোডের শুরুতেই ios::sync_with_stdio(false); এবং cin.tie(nullptr); লিখে নিলে বড় ইনপুটে I/O গতি ১০ গুণ পর্যন্ত বেড়ে যায়। পাশাপাশি কখনো std::endl দেবে না—সব সময় "\\n" ব্যবহার করবে!',
        everydayExample:
          'প্রতি চিঠির পর ডাকঘরে দৌড়ানোর বদলে (endl) পুরো ব্যাগ ভরে একসাথে পাঠানো (\\n)—এটাই ফাস্ট I/O।',
        keyTakeaways: [
          'কনটেস্টে কখনো std::endl ব্যবহার করবে না—সবসময় "\\n" দেবে, নইলে I/O-তেই TLE হবে!',
          'cin >> ভ্যারিয়েবলে ডেটা নেয়, আর cout << স্ক্রিনে ডেটা পাঠায় (তীরের দিক লক্ষ্য করো)।',
          'return 0; অপারেটিং সিস্টেমকে জানায় প্রোগ্রাম নির্ভুলভাবে শেষ হয়েছে।',
        ],
      },
    },
    topics: [
      {
        id: 'cpp-ch-1-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Minimal Modern C++23 Entry Point & Stream Output',
        englishParagraphs: [
          'Every hosted C++ program enters at int main(). Modern standard library types live inside the std namespace to prevent name collisions across large libraries.',
          'Using "\\n" instead of std::endl writes a newline without flushing OS buffers prematurely.',
        ],
        banglaParagraphs: [
          'আধুনিক C++ প্রোগ্রাম int main() থেকে যাত্রা শুরু করে। std::cout ব্যবহার করে আমরা স্ট্রিং ও সংখ্যা সরাসরি কনসোলে পাঠাই।',
          'নতুন লাইনের জন্য সব সময় "\\n" ব্যবহার করা উচিত কারণ std::endl প্রতিবার বাফার ফ্লাশ করে গতি কমিয়ে দেয়।',
        ],
        memoryDiagram: `main() frame -> cout stream buffer -> "Hello, C++23 World!"`,
        code: `#include <iostream>

int main() {
    std::cout << "Hello, C++23 World!\\n";
    return 0;
}`,
        stdin: '',
        expectedOutput: 'Hello, C++23 World!',
        lineByLine: [
          {
            lineNumber: 'Line 1',
            codeSnippet: '#include <iostream>',
            whatItMeans: 'Includes input/output stream classes (cin, cout).',
            whyItIsThere: 'Grants access to std::cout without manual OS syscalls.',
            ifDeletedError: 'Compile error: cout is not a member of std.',
          },
          {
            lineNumber: 'Line 4',
            codeSnippet: 'std::cout << "Hello, C++23 World!\\n";',
            whatItMeans: 'Inserts text literal and newline into stdout stream.',
            whyItIsThere: 'Displays greeting quickly without forced buffer flush.',
            ifDeletedError: 'No output emitted.',
          },
        ],
      },
      {
        id: 'cpp-ch-1-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Reading String & Integer Tokens Safely with std::cin',
        englishParagraphs: [
          'std::cin automatically skips leading whitespace and parses directly into typed variables (string, int, long long) without C format-string risks.',
          'Checking if (cin >> name >> pts) ensures corrupted or empty EOF streams do not leave bogus output.',
        ],
        banglaParagraphs: [
          'C++-এ C-এর মতো %d বা & লিখতে হয় না—std::string ও int ভ্যারিয়েবলে cin >> সরাসরি টাইপ বুঝে নিরাপদে ইনপুট নিয়ে নেয়!',
          'if (std::cin >> name >> pts) লিখলে ইনপুট না থাকলেও প্রোগ্রাম নিরাপদে থামে।',
        ],
        memoryDiagram: `stdin: "Sadia 35" -> name="Sadia" (heap/SSO), pts=35 -> "Coder Sadia: 70"`,
        code: `#include <iostream>
#include <string>

int main() {
    std::string name;
    int pts = 0;
    if (std::cin >> name >> pts) {
        std::cout << "Coder " << name << ": " << (pts * 2) << "\\n";
    }
    return 0;
}`,
        stdin: 'Sadia 35',
        expectedOutput: 'Coder Sadia: 70',
        lineByLine: [
          {
            lineNumber: 'Line 7',
            codeSnippet: 'if (std::cin >> name >> pts)',
            whatItMeans: 'Reads whitespace-delimited string and int, returning true if both succeeded.',
            whyItIsThere: 'Type-safe parsing without buffer overflows.',
            ifDeletedError: 'Variables remain empty/zero.',
          },
        ],
      },
      {
        id: 'cpp-ch-1-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Compile-Time constexpr Banner & sizeof Audit',
        englishParagraphs: [
          'Modern C++23 encourages constexpr constants evaluated entirely at compile time—zero runtime CPU instructions!',
          'Combined with sizeof, engineers inspect exact struct or primitive memory budgets instantly.',
        ],
        banglaParagraphs: [
          'আধুনিক C++23-তে constexpr ব্যবহার করলে কম্পাইলের সময়েই ধ্রুবক হিসাব হয়ে যায়, ফলে রানটাইমে কোনো CPU খরচ হয় না!',
          'এখানে আমরা compile-time ধ্রুবক এবং 64-বিট ইন্টিজারের বাইট সাইজ প্রিন্ট করছি।',
        ],
        memoryDiagram: `Compile-time folded: kVersion=23 | sizeof(long long)=8`,
        code: `#include <iostream>

int main() {
    constexpr int kCppStd = 23;
    std::cout << "C++" << kCppStd << " Ready | i64_bytes=" << sizeof(long long) << "\\n";
    return 0;
}`,
        stdin: '',
        expectedOutput: 'C++23 Ready | i64_bytes=8',
        lineByLine: [
          {
            lineNumber: 'Line 4',
            codeSnippet: 'constexpr int kCppStd = 23;',
            whatItMeans: 'Declares a constant guaranteed to exist at compile time.',
            whyItIsThere: 'Enables compiler constant folding and zero runtime overhead.',
            ifDeletedError: 'kCppStd undeclared.',
          },
        ],
      },
      {
        id: 'cpp-ch-1-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Fast I/O Template (sync_with_stdio + \\n vs endl)',
        englishParagraphs: [
          'By default C++ flushes stdout whenever cin reads (cin.tie) and syncs with C stdio—slowing 10^5 reads to over 1 second (TLE!).',
          'Adding ios::sync_with_stdio(false); cin.tie(nullptr); and printing "\\n" makes C++ handle 200,000 integers in ~25 milliseconds.',
        ],
        banglaParagraphs: [
          'Codeforces/CodeChef-এ ১ লক্ষ সংখ্যা পড়তে দিলে সাধারণ cin/cout ধীরগতির কারণে TLE দেয়।',
          'তাই প্রতিটি CP সলিউশনের শুরুতে ios::sync_with_stdio(false); cin.tie(nullptr); এবং শেষে "\\n" দেওয়া স্বর্ণালী নিয়ম!',
        ],
        memoryDiagram: `Fast I/O enabled -> Buffered read(t=2) -> Case sums flushed in 1 batch`,
        code: `#include <iostream>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int t = 0;
    if (cin >> t) {
        while (t--) {
            long long a = 0, b = 0;
            cin >> a >> b;
            cout << (a + b) << "\\n";
        }
    }
    return 0;
}`,
        stdin: '2\n10 20\n1000000000 5',
        expectedOutput: '30\n1000000005',
        lineByLine: [
          {
            lineNumber: 'Line 5-6',
            codeSnippet: 'ios::sync_with_stdio(false); cin.tie(nullptr);',
            whatItMeans: 'Decouples C++ streams from C stdio and unties cin from auto-flushing cout.',
            whyItIsThere: 'Speeds up bulk contest I/O by up to 10x.',
            ifDeletedError: 'Risks Time Limit Exceeded on 10^5+ inputs.',
          },
        ],
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 1',
        codeSnippet: 'ios::sync_with_stdio(false);',
        whatItMeans: 'Disables synchronization with C stdio buffers.',
        whyItIsThere: 'Essential performance boost for large stdin/stdout workloads.',
        ifDeletedError: 'Much slower cin/cout throughput.',
      },
      {
        lineNumber: 'Line 2',
        codeSnippet: 'cin.tie(nullptr);',
        whatItMeans: 'Stops cin from auto-flushing cout on every read.',
        whyItIsThere: 'Batches stdout writes until buffer fills or program ends.',
        ifDeletedError: 'Extra OS flushes inside test-case loops.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'Disable stdio sync', memoryOrStack: 'sync=false, tie=null', note: 'Fast I/O armed' },
      { step: 2, state: 'Read t = 2', memoryOrStack: 't=2', note: '2 test cases queued' },
      { step: 3, state: 'Case 1: 10 + 20', memoryOrStack: 'out_buf="30\\n"', note: 'Written to fast buffer' },
      { step: 4, state: 'Case 2 & flush', memoryOrStack: 'stdout="30\\n1000000005"', note: 'Program exits 0' },
    ],
    harryBugTraps: [
      {
        title: 'Using std::endl Inside Loops',
        brokenCode: 'for(int i=0;i<100000;i++) cout << i << endl;',
        fixedCode: 'for(int i=0;i<100000;i++) cout << i << "\\n";',
        whyItBreaks: 'endl forces an expensive OS flush on EVERY iteration causing TLE.',
      },
      {
        title: 'Mixing scanf/printf After sync_with_stdio(false)',
        brokenCode: 'ios::sync_with_stdio(false); scanf("%d", &x); cout << x;',
        fixedCode: 'Use ONLY cin/cout when sync_with_stdio(false) is active.',
        whyItBreaks: 'Separate uncoordinated buffers scramble I/O order.',
      },
      {
        title: 'Forgetting cin >> Whitespace Limits for Sentences',
        brokenCode: 'string line; cin >> line; // reads only 1 word!',
        fixedCode: 'string line; getline(cin >> ws, line);',
        whyItBreaks: 'cin >> stops at spaces; getline reads full lines.',
      },
    ],
    practiceSheet: [
      {
        id: 'cpp-ch-1-q1',
        difficulty: 'Easy',
        title: '1. C++23 Hello Banner',
        prompt: 'Print exact text: ArgonCode C++23 Active',
        banglaHint: 'std::cout << "ArgonCode C++23 Active\\n"; ব্যবহার করো।',
        starterCode: `#include <iostream>\nusing namespace std;\nint main() {\n    cout << "ArgonCode C++23 Active\\n";\n    return 0;\n}`,
        sampleStdin: '',
        expectedOutput: 'ArgonCode C++23 Active',
      },
      {
        id: 'cpp-ch-1-q2',
        difficulty: 'Easy',
        title: '2. Triple Input Integer',
        prompt: 'Read n and output n * 3.',
        banglaHint: 'cin >> n; নিয়ে cout << (n * 3) << "\\n"; প্রিন্ট করো।',
        starterCode: `#include <iostream>\nusing namespace std;\nint main() {\n    long long n = 0;\n    if (cin >> n) cout << (n * 3) << "\\n";\n    return 0;\n}`,
        sampleStdin: '14',
        expectedOutput: '42',
      },
      {
        id: 'cpp-ch-1-q3',
        difficulty: 'Medium',
        title: '3. Full Name Greeting with getline',
        prompt: 'Read full line name using getline and print "Hi, <name>!".',
        banglaHint: 'স্পেসসহ পুরো লাইন পড়তে getline(cin, name) ব্যবহার করো।',
        starterCode: `#include <iostream>\n#include <string>\nusing namespace std;\nint main() {\n    string name;\n    if (getline(cin >> ws, name)) cout << "Hi, " << name << "!\\n";\n    return 0;\n}`,
        sampleStdin: 'Rafiq Ahmed',
        expectedOutput: 'Hi, Rafiq Ahmed!',
      },
      {
        id: 'cpp-ch-1-q4',
        difficulty: 'Hard',
        title: '4. Fast I/O Multi-Test Sum',
        prompt: 'Read t test cases, each with 64-bit a and b, and print a + b per line.',
        banglaHint: 'fast I/O দিয়ে while (t--) লুপ চালাও।',
        starterCode: `#include <iostream>\nusing namespace std;\nint main() {\n    ios::sync_with_stdio(false); cin.tie(nullptr);\n    int t = 0; cin >> t;\n    while (t--) { long long a, b; cin >> a >> b; cout << (a + b) << "\\n"; }\n    return 0;\n}`,
        sampleStdin: '2\n4 9\n100 200',
        expectedOutput: '13\n300',
      },
    ],
    miniBuild: {
      title: 'C++23 Fast I/O Greeter & Test Runner',
      description: 'Reads handle and points with decoupled C++ streams and outputs cleanly.',
      banglaGoal: 'ফাস্ট I/O ব্যবহার করে C++23 প্রোগ্রামের প্রথম পূর্ণাঙ্গ মডিউল চালানো।',
      combinesChapters: 'Ch 1',
      starterCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    string name;
    int pts = 0;
    if (cin >> name >> pts) {
        cout << "Coder " << name << ": " << (pts * 2) << "\\n";
    }
    return 0;
}`,
      sampleStdin: 'Sadia 35',
      expectedOutput: 'Coder Sadia: 70',
    },
    starterCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    string name;
    int pts = 0;
    if (cin >> name >> pts) {
        cout << "Coder " << name << ": " << (pts * 2) << "\\n";
    }
    return 0;
}`,
    sampleStdin: 'Sadia 35',
    expectedSampleOutput: 'Coder Sadia: 70',
    testCases: [
      { id: 'cpp1-t1', input: 'Sadia 35', expectedOutput: 'Coder Sadia: 70' },
      { id: 'cpp1-t2', input: 'Arjun 50', expectedOutput: 'Coder Arjun: 100', isHidden: true },
    ],
  },

  2: {
    chapterNumber: 2,
    title: 'C++ Chapter 2 (C++23): Standard I/O, <iomanip> Formatting & Escapes',
    banglaTitle: 'C++ অধ্যায় ২ (C++23): স্ট্যান্ডার্ড I/O, <iomanip> ফরম্যাটিং ও এস্কেপ',
    subtitle: 'Control fixed decimals with std::fixed/setprecision, padded outputs with setw/setfill, getline, and escape sequences.',
    zeroIntuition: {
      plainEnglishStory:
        'By default, std::cout prints floating-point numbers with only 6 total significant digits—meaning 3141592.65 turns into scientific notation like "3.14159e+06" and breaks strict judge precision checks! Including <iomanip> gives you std::fixed and std::setprecision(k) to lock exact fractional digits, alongside setw and setfill for fixed-width padded timestamps and IDs.\n\nJust as importantly, mixing token reads (cin >> id) with full-sentence line reads (getline) creates a classic newline trap because >> leaves the trailing "\\n" sitting in stdin. Using getline(cin >> ws, line) skips leftover whitespace cleanly, while C++ raw strings R"(...)" let file paths keep backslashes untouched.',
      asciiFlowchart: `  [ x = 3.5, id = 7 ]
        |
        v  cout << fixed << setprecision(2) << setw(4) << setfill('0')
  [ stdout: "0007 | 3.50" ]`,
      pseudocode: [
        '1. READ integer id and double ratio',
        '2. APPLY setw(4) + setfill("0") for zero padding',
        '3. APPLY fixed + setprecision(2) for decimal lock',
        '4. OUTPUT formatted string with escapes',
      ],
      banglaZeroToHero: {
        analogyTitle: 'দশমিকের তালা ও ঘরের মাপ (<iomanip>)',
        explanation:
          'সাধারণ std::cout অনেক সময় বড় দশমিক সংখ্যাকে বৈজ্ঞানিক ফরম্যাটে (যেমন 1.23457e+06) প্রিন্ট করে ফেলে, যার ফলে জ্যামিতি বা সম্ভাব্যতার অঙ্কে সঠিক উত্তরও Wrong Answer হয়ে যায়! <iomanip> হেডার যুক্ত করে cout << fixed << setprecision(6) লিখলে দশমিকের পর ঠিক ৬ ঘর পর্যন্ত নিখুঁতভাবে প্রিন্ট হয়। আবার ডিজিটাল ঘড়ি বা রসিদের মতো ০-প্যাডিং করতে setw(2) << setfill(\'0\') ব্যবহার করা হয়—তবে মনে রাখবে setw কেবল পরবর্তী একটি আউটপুটের ওপরই কাজ করে। আরেকটি বড় ফাঁদ হলো সংখ্যা পড়ার পর getline() চালালে আগের এন্টার (\\n) ধরা পড়ে খালি স্ট্রিং আসে; তাই সর্বদা getline(cin >> ws, text) লিখে বাড়তি হোয়াইটস্পেস ঝেড়ে ফেলবে। আর উইন্ডোজ পাথ বা কোটেশন সহজ করতে R"(...)" র-স্ট্রিং লিটারাল দুর্দান্ত কাজের!',
        everydayExample:
          'ব্যাংকের স্টেটমেন্টে সবসময় টাকা দশমিকের পর ঠিক ২ ঘর (.00) দেখানো হয়—fixed << setprecision(2) ঠিক সেটাই করে।',
        keyTakeaways: [
          'fixed ছাড়া setprecision(6) কেবল মোট ৬টি অঙ্ক দেখায়, দশমিকের পর ৬ ঘর নয়!',
          'সমান্তরাল স্ট্রিং ও সংখ্যা পড়ার মাঝে getline(cin >> ws, s) দিলে আগের নিউলাইন নিজে থেকেই বাদ পড়ে।',
          'র-স্ট্রিং লিটারাল R"(C:\\folder\\file)" লিখলে ব্যাকস্ল্যাশ বারবার লিখতে হয় না।',
        ],
      },
    },
    topics: [
      {
        id: 'cpp-ch-2-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Escapes & Raw String Literals R"(...)"',
        englishParagraphs: [
          'Standard escapes (\\n, \\t, \\", \\\\) behave identically to C, while C++ adds Raw String Literals R"(...)" so paths or regex patterns keep backslashes verbatim.',
          'Prefer "\\n" over endl in all formatted output lines.',
        ],
        banglaParagraphs: [
          'C++ এ \\n, \\t, \\" এর পাশাপাশি Raw String R"(...)" সুবিধা রয়েছে—যাতে উইন্ডোজ পাথ বা কোটেশন কোনো ঝামেলা ছাড়াই লেখা যায়।',
          'নিচের উদাহরণে সাধারণ এস্কেপ ও Raw String উভয়ই দেখানো হয়েছে।',
        ],
        memoryDiagram: `Raw string R"(C:\\app)" -> exact bytes without escaping backslash`,
        code: `#include <iostream>

int main() {
    std::cout << "Tab:\\t\\"C++23\\"\\nPath:\\t" << R"(C:\\dev\\main.cpp)" << "\\n";
    return 0;
}`,
        stdin: '',
        expectedOutput: 'Tab:\t"C++23"\nPath:\tC:\\dev\\main.cpp',
        lineByLine: [
          {
            lineNumber: 'Line 4',
            codeSnippet: 'R"(C:\\dev\\main.cpp)"',
            whatItMeans: 'Raw string literal disabling backslash escape interpretation.',
            whyItIsThere: 'Clean syntax for file paths and regexes.',
            ifDeletedError: 'Must manually double every backslash.',
          },
        ],
      },
      {
        id: 'cpp-ch-2-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Zero Padding (setw/setfill) & Locked Decimals (setprecision)',
        englishParagraphs: [
          'setw(w) applies only to the VERY NEXT printed value, whereas setfill(\'0\'), fixed, and setprecision(k) stay sticky for subsequent stream outputs.',
          'Always pass setfill(\'0\') as a char literal, not a double-quoted string.',
        ],
        banglaParagraphs: [
          'setw(4) কেবল পরের মানটির ওপর কাজ করে, কিন্তু fixed এবং setprecision(2) একবার সেট করলে পরের সব আউটপুটের ওপর কার্যকর থাকে।',
          'ঘড়ি ও দামের মান একসাথে সুন্দরভাবে ফরম্যাট করতে নিচের প্যাটার্নটি সবচেয়ে পরিচ্ছন্ন।',
        ],
        memoryDiagram: `hr=8, min=3, amt=99.5 -> "08:03 | 99.50"`,
        code: `#include <iomanip>
#include <iostream>
using namespace std;

int main() {
    int hr = 0, min = 0;
    double amt = 0.0;
    if (cin >> hr >> min >> amt) {
        cout << setfill('0') << setw(2) << hr << ":"
             << setw(2) << min << " | "
             << fixed << setprecision(2) << amt << "\\n";
    }
    return 0;
}`,
        stdin: '8 3 99.5',
        expectedOutput: '08:03 | 99.50',
        lineByLine: [
          {
            lineNumber: 'Line 9',
            codeSnippet: "setfill('0') << setw(2) << hr",
            whatItMeans: 'Pads hr on the left with 0 characters up to width 2.',
            whyItIsThere: 'Formats single-digit hours cleanly like 08.',
            ifDeletedError: 'Prints "8:3" instead of "08:03".',
          },
          {
            lineNumber: 'Line 11',
            codeSnippet: 'fixed << setprecision(2)',
            whatItMeans: 'Locks output to standard decimal notation with 2 decimal digits.',
            whyItIsThere: 'Prevents scientific notation and missing trailing zeros.',
            ifDeletedError: 'Prints "99.5" instead of "99.50".',
          },
        ],
      },
      {
        id: 'cpp-ch-2-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Full-Line Invoice Parser with getline(cin >> ws, line)',
        englishParagraphs: [
          'When mixing cin >> itemId and getline(cin, itemName), leftover newline characters cause getline to return an empty string unless leading whitespace is flushed first.',
          'Writing getline(cin >> ws, itemName) consumes any trailing whitespace cleanly before reading the entire sentence.',
        ],
        banglaParagraphs: [
          'আগে একটি সংখ্যা (cin >> id) নিয়ে পরের লাইনে স্পেসসহ পণ্যের নাম (getline) পড়তে গেলে খালি স্ট্রিং চলে আসে!',
          'cin >> ws মাঝখানে লিখলে আগের এন্টার মুছে গিয়ে পুরো নামটি নিখুঁতভাবে পড়া যায়।',
        ],
        memoryDiagram: `stdin: "42\\nGaming Mouse" -> id=42 -> (cin>>ws) skips '\\n' -> line="Gaming Mouse"`,
        code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    int id = 0;
    string label;
    if (cin >> id && getline(cin >> ws, label)) {
        cout << "#" << id << " -> " << label << "\\n";
    }
    return 0;
}`,
        stdin: '42\nGaming Mouse',
        expectedOutput: '#42 -> Gaming Mouse',
        lineByLine: [
          {
            lineNumber: 'Line 8',
            codeSnippet: 'getline(cin >> ws, label)',
            whatItMeans: 'Discards leading whitespace/newline, then reads entire line.',
            whyItIsThere: 'Fixes mixed >> and getline() buffer bug.',
            ifDeletedError: 'label becomes empty string "".',
          },
        ],
      },
      {
        id: 'cpp-ch-2-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Scientific Notation Trap in Codeforces Geometry Output',
        englishParagraphs: [
          'Without std::fixed, cout prints 1000000.5 as "1e+06" when precision defaults to 6, causing instant Wrong Answer on geometry/probability problems!',
          'Using cout << fixed << setprecision(6) prints full exact digits with zero scientific notation.',
        ],
        banglaParagraphs: [
          'Codeforces-এ দশমিক বা জ্যামিতির সমস্যায় fixed ছাড়া cout বড় মানকে "1e+06" হিসেবে প্রিন্ট করে—ফলে সঠিক উত্তরও Wrong Answer (WA) হয়!',
          'fixed << setprecision(6) দিলে দশমিকের পর ঠিক ৬ ঘর পর্যন্ত নিখুঁত উত্তর আসে।',
        ],
        memoryDiagram: `r=1000 -> area = 3.14159265 * 1000^2 -> 3141592.650000 (not 3.14159e+06)`,
        code: `#include <iomanip>
#include <iostream>
using namespace std;

int main() {
    double a = 0.0, b = 0.0;
    if (cin >> a >> b) {
        cout << fixed << setprecision(6) << (a / b) << "\\n";
    }
    return 0;
}`,
        stdin: '22 7',
        expectedOutput: '3.142857',
        lineByLine: [
          {
            lineNumber: 'Line 8',
            codeSnippet: 'cout << fixed << setprecision(6)',
            whatItMeans: 'Guarantees 6 fractional digits without scientific exponent.',
            whyItIsThere: 'Standard Codeforces accuracy threshold (10^-6).',
            ifDeletedError: 'Inconsistent precision on large/small numbers.',
          },
        ],
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 1',
        codeSnippet: 'fixed << setprecision(6)',
        whatItMeans: 'Fixes output decimal precision to 6 fractional places.',
        whyItIsThere: 'Prevents scientific notation and rounding loss.',
        ifDeletedError: 'Cout uses default 6 significant figures overall.',
      },
      {
        lineNumber: 'Line 2',
        codeSnippet: 'getline(cin >> ws, line)',
        whatItMeans: 'Flushes leftover newline before reading multi-word line.',
        whyItIsThere: 'Avoids empty reads after cin >>.',
        ifDeletedError: 'Empty line captured.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'Read hr=8, min=3, amt=99.5', memoryOrStack: 'hr=8, min=3, amt=99.5', note: 'Typed parsing OK' },
      { step: 2, state: 'Apply setw(2)+setfill(0)', memoryOrStack: 'stream="08:03 | "', note: 'Zero-padded clock' },
      { step: 3, state: 'Apply fixed+setprecision(2)', memoryOrStack: 'amt_str="99.50"', note: 'Trailing 0 kept' },
      { step: 4, state: 'Flush output line', memoryOrStack: 'stdout="08:03 | 99.50"', note: 'Complete' },
    ],
    harryBugTraps: [
      {
        title: 'Using setprecision(6) Without std::fixed',
        brokenCode: 'cout << setprecision(6) << 1234567.89;',
        fixedCode: 'cout << fixed << setprecision(6) << 1234567.89;',
        whyItBreaks: 'Prints scientific notation "1.23457e+06" instead of decimal digits!',
      },
      {
        title: 'Calling getline Right After cin >> Without ws',
        brokenCode: 'cin >> n; getline(cin, s);',
        fixedCode: 'cin >> n; getline(cin >> ws, s);',
        whyItBreaks: 'Leftover newline makes s empty.',
      },
      {
        title: 'Expecting setw(4) to Persist Across Multiple Values',
        brokenCode: 'cout << setw(4) << a << b;',
        fixedCode: 'cout << setw(4) << a << setw(4) << b;',
        whyItBreaks: 'setw resets to 0 immediately after formatting one item.',
      },
    ],
    practiceSheet: [
      {
        id: 'cpp-ch-2-q1',
        difficulty: 'Easy',
        title: '1. Pad Ticket Code to 5 Digits',
        prompt: 'Read int code and print 5-digit zero-padded string.',
        banglaHint: "setfill('0') << setw(5) ব্যবহার করো।",
        starterCode: `#include <iomanip>\n#include <iostream>\nusing namespace std;\nint main() {\n    int c = 0; if (cin >> c) cout << setfill('0') << setw(5) << c << "\\n";\n    return 0;\n}`,
        sampleStdin: '42',
        expectedOutput: '00042',
      },
      {
        id: 'cpp-ch-2-q2',
        difficulty: 'Easy',
        title: '2. Four-Decimal Division',
        prompt: 'Read doubles x, y and print x / y to 4 decimal places.',
        banglaHint: 'fixed << setprecision(4) দাও।',
        starterCode: `#include <iomanip>\n#include <iostream>\nusing namespace std;\nint main() {\n    double x = 0, y = 1; if (cin >> x >> y) cout << fixed << setprecision(4) << (x / y) << "\\n";\n    return 0;\n}`,
        sampleStdin: '10 3',
        expectedOutput: '3.3333',
      },
      {
        id: 'cpp-ch-2-q3',
        difficulty: 'Medium',
        title: '3. Number + Sentence Line Reader',
        prompt: 'Read integer qty on line 1 and multi-word product name on line 2; print "<qty>x <name>".',
        banglaHint: 'getline(cin >> ws, name) দিয়ে পড়ো।',
        starterCode: `#include <iostream>\n#include <string>\nusing namespace std;\nint main() {\n    int q = 0; string s;\n    if (cin >> q && getline(cin >> ws, s)) cout << q << "x " << s << "\\n";\n    return 0;\n}`,
        sampleStdin: '3\nDark Coffee',
        expectedOutput: '3x Dark Coffee',
      },
      {
        id: 'cpp-ch-2-q4',
        difficulty: 'Hard',
        title: '4. High-Precision Circle Area',
        prompt: 'Read radius r and print 3.14159265358979 * r * r to 6 fixed decimals.',
        banglaHint: 'বড় r-এর জন্য অবশ্যই fixed << setprecision(6) দেবে।',
        starterCode: `#include <iomanip>\n#include <iostream>\nusing namespace std;\nint main() {\n    double r = 0; const double pi = 3.141592653589793;\n    if (cin >> r) cout << fixed << setprecision(6) << (pi * r * r) << "\\n";\n    return 0;\n}`,
        sampleStdin: '10',
        expectedOutput: '314.159265',
      },
    ],
    miniBuild: {
      title: 'C++23 Precision Receipt Formatter',
      description: 'Combines zero-padding and fixed-decimal stream manipulators cleanly.',
      banglaGoal: '<iomanip> ব্যবহার করে সময় ও টাকার নিখুঁত রসিদ প্রিন্ট করা।',
      combinesChapters: 'Ch 1–2',
      starterCode: `#include <iomanip>
#include <iostream>
using namespace std;

int main() {
    int hr = 0, min = 0;
    double amt = 0.0;
    if (cin >> hr >> min >> amt) {
        cout << setfill('0') << setw(2) << hr << ":"
             << setw(2) << min << " | "
             << fixed << setprecision(2) << amt << "\\n";
    }
    return 0;
}`,
      sampleStdin: '8 3 99.5',
      expectedOutput: '08:03 | 99.50',
    },
    starterCode: `#include <iomanip>
#include <iostream>
using namespace std;

int main() {
    int hr = 0, min = 0;
    double amt = 0.0;
    if (cin >> hr >> min >> amt) {
        cout << setfill('0') << setw(2) << hr << ":"
             << setw(2) << min << " | "
             << fixed << setprecision(2) << amt << "\\n";
    }
    return 0;
}`,
    sampleStdin: '8 3 99.5',
    expectedSampleOutput: '08:03 | 99.50',
    testCases: [
      { id: 'cpp2-t1', input: '8 3 99.5', expectedOutput: '08:03 | 99.50' },
      { id: 'cpp2-t2', input: '12 45 7.1', expectedOutput: '12:45 | 7.10', isHidden: true },
    ],
  },

  3: {
    chapterNumber: 3,
    title: 'C++ Chapter 3 (C++23): Variables, Data Types, RAM Sizes & Integer Overflow',
    banglaTitle: 'C++ অধ্যায় ৩ (C++23): ভ্যারিয়েবল, ডেটা টাইপ, RAM সাইজ ও ওভারফ্লো',
    subtitle: 'Master int vs long long, auto type deduction, numeric_limits, and overflow-safe 1LL multiplication.',
    zeroIntuition: {
      plainEnglishStory:
        'Every C++ variable occupies an exact chunk of stack RAM determined by its type: 1 byte for bool/char, 4 bytes for 32-bit int (max 2,147,483,647), and 8 bytes for 64-bit long long (max ~9.22 × 10^18). In C++, signed integer overflow is Undefined Behavior—not merely wraparound—so multiplying two 10^5 ints inside an int expression corrupts answers silently.\n\nModern C++23 uses brace initialization {} to forbid narrowing conversions, auto with literal suffixes (like 42LL), and <limits> numeric_limits<T>::max() to check bounds via division before multiplying. Always widen intermediate products with 1LL * a * b or static_cast<long long>(a) * b whenever products can exceed 2 × 10^9.',
      asciiFlowchart: `  [ int a = 100000, b = 200000 ]
        |
        +--> int p = a * b             --> 32-bit overflow! (CORRUPT)
        +--> long long p = 1LL * a * b --> 20000000000      (EXACT)`,
      pseudocode: [
        '1. READ two 32-bit values a and b',
        '2. PROMOTE operand to 64-bit long long via 1LL * a',
        '3. MULTIPLY safely and store in long long',
        '4. OUTPUT exact 64-bit result',
      ],
      banglaZeroToHero: {
        analogyTitle: 'লিটার বোতলে ১০ লিটার পানি (int বনাম long long)',
        explanation:
          'C++-এ ভ্যারিয়েবল ডিক্লেয়ার করার সময় তুমি মূলত RAM-এ নির্দিষ্ট বাইটের জায়গা বুক করছো। সাধারণ int হলো ৩২-বিট (৪ বাইট), যাতে সর্বোচ্চ প্রায় ২.১৪ × ১০^৯ পর্যন্ত মান রাখা যায়। অথচ কনটেস্টে প্রায়ই ১০^৫ × ১০^৫ = ১০^১০ গুণ করতে হয়! তুমি যদি long long ans = a * b; লেখো কিন্তু a আর b থাকে int, তবে ডান পাশে গুণফল প্রথমেই ৩২-বিটে ওভারফ্লো হয়ে ভুল উত্তর তৈরি করবে। তাই বড় হিসাবের আগেই 1LL * a * b বা static_cast<long long>(a) * b দিয়ে ৬৪-বিটে উন্নীত করা জরুরি। আধুনিক C++23-তে int64_t টাইপ এবং auto x{100LL} ব্যবহার করলে কোড আরও স্পষ্ট থাকে, আর দশমিক ভাগফলের জন্য static_cast<double>(a) / b সব সময় পূর্ণভাগ কাটার ঝামেলা দূর করে।',
        everydayExample:
          'জনসংখ্যা ও জিডিপি গুণ করতে ছোট ক্যালকুলেটরে "E" এরর আসার মতোই ৩২-বিট int-এ ওভারফ্লো ঘটে।',
        keyTakeaways: [
          'auto x = 5LL; লিখলে কম্পাইলার নিজেই x-কে long long হিসেবে ধরে নেয়।',
          '<cstdint>-এ int64_t বা <limits>-এ numeric_limits<int>::max() নিরাপদ সীমা জানায়।',
          'গুণ বা যোগ করার আগেই ৬৪-বিটে রূপান্তর করো (static_cast<long long>(a) * b)।',
        ],
      },
    },
    topics: [
      {
        id: 'cpp-ch-3-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Core C++ Types, auto Deduction & sizeof Inspect',
        englishParagraphs: [
          'C++ provides primitive stack types (bool, char, int, long long, double) plus brace initialization {} which forbids narrowing lossy conversions.',
          'The auto keyword deduces types from literals cleanly: 42 is int, 42LL is long long, and 3.14 is double.',
        ],
        banglaParagraphs: [
          'C++-এ {} দিয়ে ভ্যারিয়েবল ইনিশিয়ালাইজ করলে কম্পাইলার ভুলবশত দশমিক কেটে যাওয়া (Narrowing) ধরতে পারে।',
          'auto কীওয়ার্ড লিখলে কম্পাইলার ডান দিকের মান দেখে টাইপ বুঝে নেয়।',
        ],
        memoryDiagram: `auto count = 42 (int, 4B) | auto big = 42LL (long long, 8B)`,
        code: `#include <cstdint>
#include <iostream>
using namespace std;

int main() {
    auto small_num{42};
    auto big_num{9000000000LL};
    cout << small_num << " " << big_num << " | i64=" << sizeof(int64_t) << "\\n";
    return 0;
}`,
        stdin: '',
        expectedOutput: '42 9000000000 | i64=8',
        lineByLine: [
          {
            lineNumber: 'Line 7',
            codeSnippet: 'auto big_num{9000000000LL};',
            whatItMeans: 'Deduces long long from LL suffix.',
            whyItIsThere: 'Prevents truncation past 32-bit INT_MAX.',
            ifDeletedError: 'Compile/runtime overflow if assigned to 32-bit int.',
          },
        ],
      },
      {
        id: 'cpp-ch-3-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Safe Floating-Point Average via static_cast<double>',
        englishParagraphs: [
          'Rather than C-style (double)x casts, modern C++ uses explicit static_cast<double>(sum) so type conversions are searchable and compiler-checked.',
          'Remember that int / int silently truncates fractional remainder.',
        ],
        banglaParagraphs: [
          'আধুনিক C++-এ C-স্টাইলের (double) এর বদলে static_cast<double>(sum) লেখা হয় যাতে কোড রিভিউ ও কম্পাইলার চেক সহজ হয়।',
          'এর ফলে দুই পূর্ণসংখ্যার ভাগফলের দশমিক অংশ অক্ষত থাকে।',
        ],
        memoryDiagram: `sum=9 (int), cnt=2 (int) -> static_cast<double>(9)/2 -> 4.50`,
        code: `#include <iomanip>
#include <iostream>
using namespace std;

int main() {
    int sum = 0, cnt = 0;
    if (cin >> sum >> cnt && cnt > 0) {
        double avg = static_cast<double>(sum) / cnt;
        cout << fixed << setprecision(2) << avg << "\\n";
    }
    return 0;
}`,
        stdin: '9 2',
        expectedOutput: '4.50',
        lineByLine: [
          {
            lineNumber: 'Line 8',
            codeSnippet: 'static_cast<double>(sum) / cnt',
            whatItMeans: 'Type-safe compile-time checked conversion to double.',
            whyItIsThere: 'Avoids integer division truncation.',
            ifDeletedError: 'Outputs "4.00" instead of "4.50".',
          },
        ],
      },
      {
        id: 'cpp-ch-3-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Overflow-Safe Integer Bounds & numeric_limits',
        englishParagraphs: [
          'Before running a summation or multiplication, checking against numeric_limits<int>::max() lets systems validate whether 32-bit storage is safe or whether promotion to 64-bit is required.',
          'Always prefer int64_t / long long in financial cents or telemetry counters.',
        ],
        banglaParagraphs: [
          '<limits> হেডারের numeric_limits<int>::max() দিয়ে জানা যায় একটি টাইপ সর্বোচ্চ কত মান ধরতে পারে।',
          'কোনো গুনফল ওই সীমা ছাড়াবে কি না তা আগেই ভাগ করে যাচাই করা নিরাপদ ইঞ্জিনিয়ারিং পদ্ধতি।',
        ],
        memoryDiagram: `INT_MAX = 2147483647 | a * b exceeds -> fit_int32=0`,
        code: `#include <iostream>
#include <limits>
using namespace std;

int main() {
    long long a = 0, b = 0;
    if (cin >> a >> b) {
        bool fits32 = (b == 0) || (a <= numeric_limits<int>::max() / b);
        cout << "fits32=" << (fits32 ? 1 : 0) << " prod=" << (a * b) << "\\n";
    }
    return 0;
}`,
        stdin: '100000 50000',
        expectedOutput: 'fits32=0 prod=5000000000',
        lineByLine: [
          {
            lineNumber: 'Line 8',
            codeSnippet: 'a <= numeric_limits<int>::max() / b',
            whatItMeans: 'Checks overflow threshold using division BEFORE multiplying.',
            whyItIsThere: 'Never overflows even during the safety check itself!',
            ifDeletedError: 'Cannot detect 32-bit overflow preemptively.',
          },
        ],
      },
      {
        id: 'cpp-ch-3-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: '1LL Promotion Inside Codeforces Arithmetic Formulas',
        englishParagraphs: [
          'A classic Div. 2 A trap: n is read as int (up to 10^9) and n * (n + 1) / 2 overflows int immediately before assignment!',
          'Using long long inputs everywhere or multiplying with 1LL guarantees clean 64-bit evaluation.',
        ],
        banglaParagraphs: [
          'Codeforces-এ n = 10^5 বা 10^9 হলে int n দিয়ে n * (n + 1) / 2 করলে ওভারফ্লো নিশ্চিত!',
          'সমাধান হলো শুরু থেকেই long long ব্যবহার করা অথবা 1LL * দিয়ে গুণ শুরু করা।',
        ],
        memoryDiagram: `n=100000 -> 1LL * n * (n + 1) / 2 -> 5000050000`,
        code: `#include <iostream>
using namespace std;

int main() {
    int n = 0;
    if (cin >> n) {
        long long total = 1LL * n * (n + 1) / 2;
        cout << total << "\\n";
    }
    return 0;
}`,
        stdin: '100000',
        expectedOutput: '5000050000',
        lineByLine: [
          {
            lineNumber: 'Line 7',
            codeSnippet: '1LL * n * (n + 1) / 2',
            whatItMeans: 'Widens multiplication chain to 64-bit long long from left.',
            whyItIsThere: '100000 * 100001 exceeds INT_MAX.',
            ifDeletedError: 'Silent overflow and negative/wrong output.',
          },
        ],
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 1',
        codeSnippet: '1LL * n * (n + 1) / 2',
        whatItMeans: 'Promotes arithmetic to 64-bit signed integer before multiplying.',
        whyItIsThere: 'Prevents 32-bit wraparound for n >= 46341.',
        ifDeletedError: 'Wrong Answer on large n.',
      },
      {
        lineNumber: 'Line 2',
        codeSnippet: 'static_cast<double>(sum)',
        whatItMeans: 'Explicitly converts int to 64-bit float.',
        whyItIsThere: 'Preserves fractional quotient.',
        ifDeletedError: 'Integer truncation.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'Read n = 100000', memoryOrStack: 'n=100000 (32-bit)', note: 'Fits int alone' },
      { step: 2, state: '1LL * n', memoryOrStack: 'tmp=100000LL (64-bit)', note: 'Upgraded to 8 bytes' },
      { step: 3, state: 'Multiply by (n+1)', memoryOrStack: 'num=10000100000LL', note: 'Safe inside 64-bit' },
      { step: 4, state: 'Divide by 2 & print', memoryOrStack: 'total=5000050000', note: 'Exact answer' },
    ],
    harryBugTraps: [
      {
        title: 'Using float (32-bit) Instead of double (64-bit)',
        brokenCode: 'float pi = 3.1415926535f; // loses digits after 7!',
        fixedCode: 'double pi = 3.1415926535;',
        whyItBreaks: 'float only has ~7 significant digits; double gives ~15–16 digits.',
      },
      {
        title: 'Mixing Signed int and Unsigned size_t (v.size() - 1)',
        brokenCode: 'for (int i = 0; i < v.size() - 1; i++) // crash if v empty!',
        fixedCode: 'for (int i = 0; i + 1 < static_cast<int>(v.size()); i++)',
        whyItBreaks: 'When v is empty, unsigned 0 - 1 wraps around to 18446744073709551615!',
      },
      {
        title: 'Comparing Floating Point Numbers with ==',
        brokenCode: 'if (0.1 + 0.2 == 0.3) ...',
        fixedCode: 'if (abs((0.1 + 0.2) - 0.3) < 1e-9) ...',
        whyItBreaks: 'Binary IEEE-754 representation has tiny rounding epsilon.',
      },
    ],
    practiceSheet: [
      {
        id: 'cpp-ch-3-q1',
        difficulty: 'Easy',
        title: '1. 64-Bit Cube Volume',
        prompt: 'Read side s (up to 10^6) and print exact s * s * s.',
        banglaHint: 'long long দিয়ে s ইনপুট নাও।',
        starterCode: `#include <iostream>\nusing namespace std;\nint main() {\n    long long s = 0; if (cin >> s) cout << (s * s * s) << "\\n";\n    return 0;\n}`,
        sampleStdin: '10000',
        expectedOutput: '1000000000000',
      },
      {
        id: 'cpp-ch-3-q2',
        difficulty: 'Easy',
        title: '2. Precise Quotient',
        prompt: 'Read int a and b; output a / b to 3 decimal places.',
        banglaHint: 'static_cast<double>(a) / b এবং setprecision(3) ব্যবহার করো।',
        starterCode: `#include <iomanip>\n#include <iostream>\nusing namespace std;\nint main() {\n    int a = 0, b = 1; if (cin >> a >> b) cout << fixed << setprecision(3) << static_cast<double>(a) / b << "\\n";\n    return 0;\n}`,
        sampleStdin: '7 4',
        expectedOutput: '1.750',
      },
      {
        id: 'cpp-ch-3-q3',
        difficulty: 'Medium',
        title: '3. Triangular Sum 1..N',
        prompt: 'Read N (up to 10^9) and print exact sum N*(N+1)/2.',
        banglaHint: '1LL * N * (N + 1) / 2 লিখো।',
        starterCode: `#include <iostream>\nusing namespace std;\nint main() {\n    long long n = 0; if (cin >> n) cout << (n * (n + 1) / 2) << "\\n";\n    return 0;\n}`,
        sampleStdin: '100000',
        expectedOutput: '5000050000',
      },
      {
        id: 'cpp-ch-3-q4',
        difficulty: 'Hard',
        title: '4. Overflow Check Before Multiply',
        prompt: 'Read 64-bit a, b > 0 and print "SAFE" if a * b <= 10^12 else "OVERFLOW".',
        banglaHint: 'গুণ না করে a <= 1000000000000LL / b দিয়ে যাচাই করো!',
        starterCode: `#include <iostream>\nusing namespace std;\nint main() {\n    long long a = 0, b = 1; const long long LIM = 1000000000000LL;\n    if (cin >> a >> b) cout << (a <= LIM / b ? "SAFE" : "OVERFLOW") << "\\n";\n    return 0;\n}`,
        sampleStdin: '10000000 200000',
        expectedOutput: 'OVERFLOW',
      },
    ],
    miniBuild: {
      title: 'C++23 64-Bit Arithmetic Verifier',
      description: 'Computes overflow-free triangular sums and large products cleanly.',
      banglaGoal: '৬৪-বিট টাইপ ও স্ট্যাটিক কাস্ট দিয়ে নির্ভুল গাণিতিক ইঞ্জিন বানানো।',
      combinesChapters: 'Ch 1–3',
      starterCode: `#include <iostream>
using namespace std;

int main() {
    int n = 0;
    if (cin >> n) {
        long long total = 1LL * n * (n + 1) / 2;
        cout << total << "\\n";
    }
    return 0;
}`,
      sampleStdin: '100000',
      expectedOutput: '5000050000',
    },
    starterCode: `#include <iostream>
using namespace std;

int main() {
    int n = 0;
    if (cin >> n) {
        long long total = 1LL * n * (n + 1) / 2;
        cout << total << "\\n";
    }
    return 0;
}`,
    sampleStdin: '100000',
    expectedSampleOutput: '5000050000',
    testCases: [
      { id: 'cpp3-t1', input: '100000', expectedOutput: '5000050000' },
      { id: 'cpp3-t2', input: '10', expectedOutput: '55', isHidden: true },
    ],
  },

  4: {
    chapterNumber: 4,
    title: 'C++ Chapter 4 (C++23): Arithmetic, Relational, Logical & Assignment Operators',
    banglaTitle: 'C++ অধ্যায় ৪ (C++23): অ্যারিথমেটিক, রিলেশনাল, লজিক্যাল ও অ্যাসাইনমেন্ট অপারেটর',
    subtitle: 'Precedence, short-circuit &&/|| safety, C++20/23 three-way <=> comparisons, and modular subtraction.',
    zeroIntuition: {
      plainEnglishStory:
        'Operators control both arithmetic calculation and control predicates inside C++. Arithmetic (+, -, *, /, %), relational (==, !=, <, >=), compound assignments (+=, *=), and logical operators (&&, ||, !) follow strict precedence rules—yet beginners regularly trip on two C++ behaviors: chained inequalities (1 <= x <= 10) evaluate left-to-right into booleans, and negative modulo (-5 % 3) evaluates to -2 instead of +1!\n\nShort-circuit evaluation guarantees that in (den != 0 && num % den == 0), the right operand never executes when den is zero—preventing division-by-zero crashes. Always write explicit ranges (lo <= x && x <= hi) and normalize cyclic differences using ((a - b) % m + m) % m.',
      asciiFlowchart: `  [ (den != 0 && num % den == 0) ]
        |
        +--> Left false (den == 0) --> short-circuits immediately -> false (No crash!)
        +--> Left true  (den != 0) --> tests num % den == 0`,
      pseudocode: [
        '1. READ num and den',
        '2. GUARD den != 0 before modulo',
        '3. COMPUTE positive modulo',
        '4. OUTPUT boolean / integer flags',
      ],
      banglaZeroToHero: {
        analogyTitle: 'শর্ট-সার্কিট গার্ড ও পজিটিভ মডুলো',
        explanation:
          'C++-এ অপারেটর কীভাবে কাজ করে তা বোঝা ছাড়া বাগমুক্ত লজিক লেখা অসম্ভব। গণিতে আমরা 1 <= x <= 10 লিখতে পারি, কিন্তু C++-এ এটা লিখলে কম্পাইলার আগে (1 <= x) যাচাই করে 0 বা 1 (bool) বানায়, যা সব সময় <= 10 হয়ে সত্য রিটার্ন করে! তাই রেঞ্জ চেক করতে সর্বদা x >= 1 && x <= 10 লিখতে হবে। আবার && এবং || শর্ট-সার্কিট নিয়ম মেনে চলে: বাম পাশে den != 0 মিথ্যা হলে ডান পাশের num % den কোডই চলে না, ফলে ভাগজনিত ক্র্যাশ এড়ানো যায়। আরেকটি মারাত্মক ব্যাপার হলো ঋণাত্মক মডুলো: C++-এ (-5) % 3 = -2 হয়। সার্কুলার অ্যারে বা হ্যাশিংয়ে সঠিক ধনাত্মক ভাগশেষ পেতে সব সময় ((a - b) % m + m) % m সূত্র ব্যবহার করবে, আর সিলিং ভাগের জন্য ফ্লোট এড়িয়ে (a + b - 1) / b লিখবে।',
        everydayExample:
          'চাবি দিয়ে তালা চেক না করেই দরজায় ধাক্কা না দেওয়ার মতোই আগে b != 0 চেক করে তারপর a / b করা।',
        keyTakeaways: [
          'চেন কম্পারিজন (10 <= x <= 20) C++-এ ভুল ফল দেয়; সর্বদা x >= 10 && x <= 20 লিখবে।',
          '++i (pre-increment) কপি তৈরি না করেই মান বাড়ায়, তাই ইটারেটরে এটি সেরা।',
          'মডুলার বিয়োগ: ((a - b) % m + m) % m কখনো নেগেটিভ হয় না।',
        ],
      },
    },
    topics: [
      {
        id: 'cpp-ch-4-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Arithmetic, Modulo & Pre/Post Increment (++i vs i++)',
        englishParagraphs: [
          '++i increments i first and returns the updated value; i++ returns the old value first and increments i afterward.',
          'For simple loop counters and arithmetic, pre-increment ++i avoids temporary copies.',
        ],
        banglaParagraphs: [
          '++i মানে আগে ১ বাড়াও তারপর মান ব্যবহার করো, আর i++ মানে আগে পুরনো মান নাও তারপর ১ বাড়াও।',
          'ভাগশেষ (%) এবং পূর্ণভাগ (/) ব্যবহার করে সহজেই কোনো সংখ্যার শেষ অঙ্ক (n % 10) আলাদা করা যায়।',
        ],
        memoryDiagram: `n=427 -> last_digit = 427 % 10 = 7 | rest = 427 / 10 = 42`,
        code: `#include <iostream>
using namespace std;

int main() {
    int n = 427;
    cout << "last=" << (n % 10) << " rest=" << (n / 10) << "\\n";
    return 0;
}`,
        stdin: '',
        expectedOutput: 'last=7 rest=42',
        lineByLine: [
          {
            lineNumber: 'Line 6',
            codeSnippet: 'n % 10, n / 10',
            whatItMeans: 'Splits base-10 integer into ones digit and remaining prefix.',
            whyItIsThere: 'Fundamental digit-extraction trick for loops and palindromes.',
            ifDeletedError: 'Cannot inspect decimal digits mathematically.',
          },
        ],
      },
      {
        id: 'cpp-ch-4-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Compound Logic & Ternary Operator Output',
        englishParagraphs: [
          'Logical && and || let you combine multiple range bounds without nesting deep if statements.',
          'The ternary operator (cond ? A : B) selects between two values cleanly inline.',
        ],
        banglaParagraphs: [
          'টার্নারি অপারেটর (cond ? "YES" : "NO") দিয়ে এক লাইনেই সিদ্ধান্ত প্রিন্ট করা যায়—Codeforces-এ YES/NO প্রিন্ট করতে এটি দারুণ কাজের!',
          'পাশাপাশি && ও || দিয়ে একাধিক শর্ত যাচাই করা যায়।',
        ],
        memoryDiagram: `x=2024 -> (x%400==0 || (x%4==0 && x%100!=0)) -> LEAP`,
        code: `#include <iostream>
using namespace std;

int main() {
    int y = 0;
    if (cin >> y) {
        bool leap = (y % 400 == 0) || (y % 4 == 0 && y % 100 != 0);
        cout << (leap ? "LEAP" : "COMMON") << "\\n";
    }
    return 0;
}`,
        stdin: '2024',
        expectedOutput: 'LEAP',
        lineByLine: [
          {
            lineNumber: 'Line 7',
            codeSnippet: '(y % 400 == 0) || (y % 4 == 0 && y % 100 != 0)',
            whatItMeans: 'Evaluates Gregorian leap-year rules with logical operators.',
            whyItIsThere: 'Combines || and && cleanly using explicit parentheses.',
            ifDeletedError: 'Fails century leap-year exceptions like 1900 vs 2000.',
          },
        ],
      },
      {
        id: 'cpp-ch-4-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Compound Assignment Ledger Simulator',
        englishParagraphs: [
          'Compound assignments (+=, -=, *=) update running balances succinctly in simulation and accounting code.',
          'Always apply multiplication before fixed bonuses or honor exact business order.',
        ],
        banglaParagraphs: [
          'গেম স্কোর বা ব্যাংক ব্যালেন্স আপডেটে +=, *= ব্যবহার করলে কোড ছোট ও সহজবোধ্য থাকে।',
          'নিচের উদাহরণে ইনপুট ডেটা থেকে মাল্টিপ্লায়ার ও বোনাস হিসাব করা হয়েছে।',
        ],
        memoryDiagram: `pts=100 -> *=2 (200) -> +=50 (250)`,
        code: `#include <iostream>
using namespace std;

int main() {
    long long pts = 0, mult = 1, bonus = 0;
    if (cin >> pts >> mult >> bonus) {
        pts *= mult;
        pts += bonus;
        cout << "Score=" << pts << "\\n";
    }
    return 0;
}`,
        stdin: '100 2 50',
        expectedOutput: 'Score=250',
        lineByLine: [
          {
            lineNumber: 'Line 7-8',
            codeSnippet: 'pts *= mult; pts += bonus;',
            whatItMeans: 'Scales points first, then adds bonus offset.',
            whyItIsThere: 'Updates state cleanly in-place.',
            ifDeletedError: 'Score never changes from input value.',
          },
        ],
      },
      {
        id: 'cpp-ch-4-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Modular Subtraction Without Negative Overflow',
        englishParagraphs: [
          'In combinatorics or rolling hash problems modulo 10^9 + 7, subtracting two modular numbers can produce a negative remainder!',
          'Always compute ((a - b) % MOD + MOD) % MOD so results stay inside [0, MOD - 1].',
        ],
        banglaParagraphs: [
          'হ্যাশিং বা মডুলার গণিতে (a - b) % MOD করলে উত্তর নেগেটিভ হয়ে যাওয়া খুব সাধারণ ভুল!',
          '((a - b) % MOD + MOD) % MOD লিখলে উত্তর সর্বদা ০ থেকে MOD-1 এর মধ্যে থাকে।',
        ],
        memoryDiagram: `a=2, b=5, mod=7 -> (2-5)%7 = -3 -> (-3+7)%7 = 4`,
        code: `#include <iostream>
using namespace std;

int main() {
    long long a = 0, b = 0, m = 1;
    if (cin >> a >> b >> m && m > 0) {
        long long diff = ((a - b) % m + m) % m;
        cout << diff << "\\n";
    }
    return 0;
}`,
        stdin: '2 5 7',
        expectedOutput: '4',
        lineByLine: [
          {
            lineNumber: 'Line 7',
            codeSnippet: '((a - b) % m + m) % m',
            whatItMeans: 'Guarantees positive remainder after modular subtraction.',
            whyItIsThere: 'C++ remainder of negative number stays negative.',
            ifDeletedError: 'Prints "-3" instead of "4".',
          },
        ],
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 1',
        codeSnippet: '((a - b) % m + m) % m',
        whatItMeans: 'Normalizes negative modulo difference to [0, m-1].',
        whyItIsThere: 'Prevents negative mod bugs in hashing and DP.',
        ifDeletedError: 'Negative output on a < b.',
      },
      {
        lineNumber: 'Line 2',
        codeSnippet: '(y % 400 == 0) || (y % 4 == 0 && y % 100 != 0)',
        whatItMeans: 'Combined relational & logical predicate.',
        whyItIsThere: 'Accurate multi-rule decision in one expression.',
        ifDeletedError: 'Misclassifies century years.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'Read a=2, b=5, m=7', memoryOrStack: 'a=2, b=5, m=7', note: 'a < b triggers negative diff' },
      { step: 2, state: '(a - b) % m', memoryOrStack: 'raw=-3', note: 'Negative in C++' },
      { step: 3, state: 'raw + m', memoryOrStack: 'shifted=4', note: 'Lifted into positive range' },
      { step: 4, state: 'shifted % m & print', memoryOrStack: 'stdout="4"', note: 'Valid modular residue' },
    ],
    harryBugTraps: [
      {
        title: 'Chained Math Comparisons (1 <= x <= 5)',
        brokenCode: 'if (1 <= x <= 5) cout << "OK";',
        fixedCode: 'if (1 <= x && x <= 5) cout << "OK";',
        whyItBreaks: '(1 <= x) returns bool (0 or 1), both of which are <= 5, so condition is ALWAYS true!',
      },
      {
        title: 'Using = Instead of == in Condition',
        brokenCode: 'if (flag = true) ...',
        fixedCode: 'if (flag == true) ...',
        whyItBreaks: 'Assigns true every run instead of comparing.',
      },
      {
        title: 'Negative Remainder in Circular Array Index',
        brokenCode: 'int prev = (i - 1) % n;',
        fixedCode: 'int prev = (i - 1 + n) % n;',
        whyItBreaks: 'When i=0, -1 % n is -1 -> out-of-bounds crash.',
      },
    ],
    practiceSheet: [
      {
        id: 'cpp-ch-4-q1',
        difficulty: 'Easy',
        title: '1. Digit Extractor (Last & Tens)',
        prompt: 'Read positive integer n and print its last two digits separated by a space.',
        banglaHint: 'শেষ অঙ্ক (n % 10) এবং দশকের অঙ্ক ((n / 10) % 10)।',
        starterCode: `#include <iostream>\nusing namespace std;\nint main() {\n    int n = 0; if (cin >> n) cout << (n % 10) << " " << ((n / 10) % 10) << "\\n";\n    return 0;\n}`,
        sampleStdin: '583',
        expectedOutput: '3 8',
      },
      {
        id: 'cpp-ch-4-q2',
        difficulty: 'Easy',
        title: '2. Safe Divisibility Check',
        prompt: 'Read ints a and b; print "YES" if b != 0 && a % b == 0 else "NO".',
        banglaHint: 'শর্ট-সার্কিট গার্ড b != 0 বাম পাশে রাখো।',
        starterCode: `#include <iostream>\nusing namespace std;\nint main() {\n    long long a = 0, b = 0; if (cin >> a >> b) cout << (b != 0 && a % b == 0 ? "YES" : "NO") << "\\n";\n    return 0;\n}`,
        sampleStdin: '24 6',
        expectedOutput: 'YES',
      },
      {
        id: 'cpp-ch-4-q3',
        difficulty: 'Medium',
        title: '3. Ceiling Division Trick',
        prompt: 'Read positive a, b and output ceil(a / b) without floats.',
        banglaHint: '(a + b - 1) / b ব্যবহার করো।',
        starterCode: `#include <iostream>\nusing namespace std;\nint main() {\n    long long a = 0, b = 1; if (cin >> a >> b) cout << ((a + b - 1) / b) << "\\n";\n    return 0;\n}`,
        sampleStdin: '11 4',
        expectedOutput: '3',
      },
      {
        id: 'cpp-ch-4-q4',
        difficulty: 'Hard',
        title: '4. Modular Difference (a - b) mod m',
        prompt: 'Read a, b, and m > 0; output ((a - b) % m + m) % m.',
        banglaHint: 'নেগেটিভ ভাগশেষ পজিটিভ করার সূত্র দাও।',
        starterCode: `#include <iostream>\nusing namespace std;\nint main() {\n    long long a = 0, b = 0, m = 1;\n    if (cin >> a >> b >> m && m > 0) cout << (((a - b) % m + m) % m) << "\\n";\n    return 0;\n}`,
        sampleStdin: '3 10 5',
        expectedOutput: '3',
      },
    ],
    miniBuild: {
      title: 'Modular Arithmetic & Leap Guard',
      description: 'Computes normalized positive modulo subtraction reliably.',
      banglaGoal: 'লজিক্যাল ও মডুলার অপারেটর দিয়ে বাগ-মুক্ত হিসাব তৈরি করা।',
      combinesChapters: 'Ch 1–4',
      starterCode: `#include <iostream>
using namespace std;

int main() {
    long long a = 0, b = 0, m = 1;
    if (cin >> a >> b >> m && m > 0) {
        long long diff = ((a - b) % m + m) % m;
        cout << diff << "\\n";
    }
    return 0;
}`,
      sampleStdin: '2 5 7',
      expectedOutput: '4',
    },
    starterCode: `#include <iostream>
using namespace std;

int main() {
    long long a = 0, b = 0, m = 1;
    if (cin >> a >> b >> m && m > 0) {
        long long diff = ((a - b) % m + m) % m;
        cout << diff << "\\n";
    }
    return 0;
}`,
    sampleStdin: '2 5 7',
    expectedSampleOutput: '4',
    testCases: [
      { id: 'cpp4-t1', input: '2 5 7', expectedOutput: '4' },
      { id: 'cpp4-t2', input: '12 5 7', expectedOutput: '0', isHidden: true },
    ],
  },

  5: {
    chapterNumber: 5,
    title: 'C++ Chapter 5 (C++23): Bitwise Operators & Binary Tricks (<bit> CP Special)',
    banglaTitle: 'C++ অধ্যায় ৫ (C++23): বিটওয়াইজ অপারেটর ও <bit> বাইনারি কৌশল',
    subtitle: 'Single-cycle bitmasks, 1ULL << k shifts, C++20/23 std::popcount & has_single_bit, and XOR subset tricks.',
    zeroIntuition: {
      plainEnglishStory:
        'Every integer in RAM is a row of 32 or 64 binary switches, and bitwise operators (&, |, ^, ~, <<, >>) manipulate every bit simultaneously inside a single CPU clock cycle. Competitive programmers pack up to 60 boolean choices inside a single uint64_t bitmask, check parity with (n & 1), flip bits with XOR, and isolate unpaired duplicates in O(1) extra memory.\n\nModern C++20/23 makes bit manipulation even cleaner with the standard <bit> header: std::popcount(n) compiles to the hardware POPCNT instruction, and std::has_single_bit(n) checks powers of two without loops. Remember to always shift unsigned 64-bit literals (1ULL << k) whenever k >= 31 to avoid signed 32-bit shift Undefined Behavior.',
      asciiFlowchart: `  [ n = 29 -> Binary: 11101 ]
        |
        +--> popcount(29u)  --> 4 ones (hardware POPCNT instruction!)
        +--> (29 >> 1) & 1  --> 0 (bit 1 is OFF)
        +--> 29 | (1u << 1) --> 31 (11111 - bit 1 turned ON!)`,
      pseudocode: [
        '1. READ unsigned 64-bit integer n',
        '2. COUNT set bits via std::popcount(n)',
        '3. CHECK power-of-two via std::has_single_bit(n)',
        '4. OUTPUT results cleanly',
      ],
      banglaZeroToHero: {
        analogyTitle: 'CPU পপ-কাউন্ট ও বিটমাস্ক সুপারপাওয়ার',
        explanation:
          'কম্পিউটারের প্রসেসর সব সংখ্যাকে ০ আর ১-এর সারি হিসেবে দেখে—তাই বিটওয়াইজ অপারেটর (&, |, ^, <<, >>) মাত্র ১টি ক্লক সাইকেলে ৬৪টি বিটের ওপর একসাথে কাজ করতে পারে! ৩২-বিটের বেশি শিফট করতে গিয়ে 1 << 35 লিখলে C++-এ Undefined Behavior হয়, তাই বড় বিটমাস্কের জন্য সব সময় 1ULL << k ব্যবহার করবে। আধুনিক C++20/23-এর <bit> হেডার আরও এক ধাপ এগিয়ে দিয়েছে: কোনো while লুপ ছাড়াই std::popcount(n) এক ইনস্ট্রাকশনে ১-বিটের সংখ্যা গুনে দেয় এবং std::has_single_bit(n) বলে দেয় সংখ্যাটি ২-এর ঘাত কি না (তবে ইনপুট অবশ্যই unsigned যেমন uint64_t হতে হবে)। এছাড়া জোড়-বিজোড় যাচাইয়ে (n & 1), ডানের সেট বিট বের করতে (x & -x), এবং জোড়াবিহীন সংখ্যা খুঁজতে XOR (^) কনটেস্টের সেরা অস্ত্র!',
        everydayExample:
          'সিনেমা হলের ৬০টি সিট খালি না ভর্তি তা ৬০টি ভ্যারিয়েবলে না রেখে মাত্র একটি ৬৪-বিট সংখ্যার ৬০টি বিটে রাখা যায়!',
        keyTakeaways: [
          'std::popcount(uint64_t x) ব্যবহার করতে অবশ্যই unsigned টাইপ (ULL) দিতে হবে।',
          'x & -x করলে সংখ্যার সবচেয়ে ডানের (lowest) সেট বিট পাওয়া যায়—যা Fenwick Tree (BIT)-এর ভিত্তি।',
          'সবসময় (mask >> i) & 1 এভাবে বিট চেক করো এবং 1ULL << i দিয়ে মাস্ক বানাও।',
        ],
      },
    },
    topics: [
      {
        id: 'cpp-ch-5-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Core Bitwise Algebra (&, |, ^, ~, <<, >>)',
        englishParagraphs: [
          'Bitwise operators manipulate all 32 or 64 binary bits simultaneously inside CPU ALU registers in 1 clock cycle.',
          'Remember: (a ^ b) ^ b == a — XORing twice restores the original value cleanly.',
        ],
        banglaParagraphs: [
          '& (AND), | (OR), ^ (XOR) এবং শিফট অপারেটরগুলো সরাসরি বাইনারি বিটের ওপর কাজ করে।',
          'XOR-এর চমৎকার বৈশিষ্ট্য হলো: কোনো সংখ্যাকে আরেকটি সংখ্যা দিয়ে দুবার XOR করলে মূল সংখ্যাই ফিরে আসে!',
        ],
        memoryDiagram: `10(1010) ^ 6(0110) = 12(1100) | 12 ^ 6 = 10`,
        code: `#include <iostream>
using namespace std;

int main() {
    unsigned int a = 10, b = 6;
    cout << (a & b) << " " << (a | b) << " " << (a ^ b) << " " << (1U << 4) << "\\n";
    return 0;
}`,
        stdin: '',
        expectedOutput: '2 14 12 16',
        lineByLine: [
          {
            lineNumber: 'Line 6',
            codeSnippet: '1U << 4',
            whatItMeans: 'Computes 2^4 = 16 using left bit shift on unsigned int.',
            whyItIsThere: 'Constructs a mask with bit 4 active.',
            ifDeletedError: 'Missing 16 output.',
          },
        ],
      },
      {
        id: 'cpp-ch-5-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Test, Set, and Clear Specific k-th Bit',
        englishParagraphs: [
          'Testing bit k: ((n >> k) & 1ULL). Setting bit k: (n | (1ULL << k)). Clearing bit k: (n & ~(1ULL << k)).',
          'Always verify 0 <= k < 64 before shifting 64-bit unsigned integers.',
        ],
        banglaParagraphs: [
          'কোনো k-তম বিট চালু (ON) করতে n | (1ULL << k) এবং বন্ধ (OFF) করতে n & ~(1ULL << k) ব্যবহার করা হয়।',
          'এতে অন্য কোনো বিটের মান একবিন্দুও বদলায় না।',
        ],
        memoryDiagram: `n=13(1101), k=2 -> clear bit 2 -> 13 & ~4 = 9(1001)`,
        code: `#include <iostream>
using namespace std;

int main() {
    unsigned long long n = 0;
    int k = 0;
    if (cin >> n >> k && k >= 0 && k < 64) {
        cout << "bit=" << ((n >> k) & 1ULL)
             << " cleared=" << (n & ~(1ULL << k)) << "\\n";
    }
    return 0;
}`,
        stdin: '13 2',
        expectedOutput: 'bit=1 cleared=9',
        lineByLine: [
          {
            lineNumber: 'Line 9',
            codeSnippet: 'n & ~(1ULL << k)',
            whatItMeans: 'Inverts mask so only bit k is 0, clearing bit k via AND.',
            whyItIsThere: 'Removes flag k cleanly without affecting other bits.',
            ifDeletedError: 'Cannot turn off an active bit.',
          },
        ],
      },
      {
        id: 'cpp-ch-5-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Modern C++ <bit>: popcount & has_single_bit',
        englishParagraphs: [
          'Instead of writing manual while (n) count += n & 1; loops, C++20/23 offers std::popcount and std::has_single_bit in <bit>, which compile to single CPU instructions on modern x86/ARM.',
          'Note that <bit> functions strictly require unsigned types (uint64_t).',
        ],
        banglaParagraphs: [
          'আধুনিক C++-এর <bit> লাইব্রেরি ব্যবহার করলে কোনো লুপ ছাড়াই std::popcount() দিয়ে কতগুলো বিট ১ আছে এবং std::has_single_bit() দিয়ে ২-এর ঘাত কি না বের করা যায়।',
          'মনে রাখবে এই ফাংশনগুলোতে অবশ্যই unsigned long long (uint64_t) পাঠাতে হয়।',
        ],
        memoryDiagram: `n=29 (11101) -> popcount=4 | has_single_bit=0`,
        code: `#include <bit>
#include <cstdint>
#include <iostream>
using namespace std;

int main() {
    uint64_t n = 0;
    if (cin >> n) {
        cout << "ones=" << popcount(n) << " pow2=" << (has_single_bit(n) ? 1 : 0) << "\\n";
    }
    return 0;
}`,
        stdin: '29',
        expectedOutput: 'ones=4 pow2=0',
        lineByLine: [
          {
            lineNumber: 'Line 9',
            codeSnippet: 'popcount(n), has_single_bit(n)',
            whatItMeans: 'Counts active 1-bits and checks exact power of two.',
            whyItIsThere: 'Zero-loop standard hardware intrinsics.',
            ifDeletedError: 'Requires manual while loop bit extraction.',
          },
        ],
      },
      {
        id: 'cpp-ch-5-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Subset Enumeration Mask (0 .. (1<<n)-1) & XOR Trick',
        englishParagraphs: [
          'Every integer mask from 0 to (1 << n) - 1 uniquely encodes one subset of n items: item i is included iff (mask >> i) & 1 is 1.',
          'Counting how many subsets exist or finding the lone unpaired integer with XOR is a staple 1100–1600 Codeforces technique.',
        ],
        banglaParagraphs: [
          'বিটমাস্ক দিয়ে কোনো সেটের সব উপসেট (2^n) জেনারেট করা যায়: mask-এর i-তম বিট ১ হলে i-তম উপাদানটি সাবসেটে আছে!',
          'নিচের CP প্যাটার্নটি XOR ব্যবহার করে জোড়াবিহীন একক সংখ্যাটি বের করে।',
        ],
        memoryDiagram: `7 ^ 3 ^ 5 ^ 3 ^ 7 = 5 (all paired numbers vanish!)`,
        code: `#include <iostream>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n = 0, ans = 0, x = 0;
    if (cin >> n) {
        while (n-- && cin >> x) ans ^= x;
        cout << ans << "\\n";
    }
    return 0;
}`,
        stdin: '5\n7 3 5 3 7',
        expectedOutput: '5',
        lineByLine: [
          {
            lineNumber: 'Line 9',
            codeSnippet: 'while (n-- && cin >> x) ans ^= x;',
            whatItMeans: 'Reads all n elements and XORs them in O(1) extra memory.',
            whyItIsThere: 'Duplicate pairs cancel via a ^ a == 0.',
            ifDeletedError: 'Cannot isolate unique element without O(n) hash map.',
          },
        ],
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 1',
        codeSnippet: 'popcount(n)',
        whatItMeans: 'Standard C++20/23 function counting active binary 1s.',
        whyItIsThere: 'Portable replacement for GCC __builtin_popcountll.',
        ifDeletedError: 'Manual bit loop needed.',
      },
      {
        lineNumber: 'Line 2',
        codeSnippet: '1ULL << k',
        whatItMeans: '64-bit unsigned power of two.',
        whyItIsThere: 'Safe for all bit positions k in [0..63].',
        ifDeletedError: '1 << k overflows at k >= 31.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'Read n = 29', memoryOrStack: 'n=29 (0b11101)', note: 'Unsigned 64-bit' },
      { step: 2, state: 'Call popcount(29)', memoryOrStack: 'ones=4', note: 'Bits 0,2,3,4 are 1' },
      { step: 3, state: 'Call has_single_bit(29)', memoryOrStack: 'pow2=0', note: 'More than 1 set bit' },
      { step: 4, state: 'Emit stdout', memoryOrStack: 'stdout="ones=4 pow2=0"', note: 'Clean exit' },
    ],
    harryBugTraps: [
      {
        title: 'Using 1 << k on k >= 31 (Signed 32-Bit Overflow)',
        brokenCode: 'long long m = 1 << 35;',
        fixedCode: 'long long m = 1LL << 35;',
        whyItBreaks: 'Literal 1 is 32-bit int; shifting >= 31 is Undefined Behavior.',
      },
      {
        title: 'Calling std::popcount with Signed int',
        brokenCode: 'int x = 15; cout << popcount(x); // Compile Error!',
        fixedCode: 'uint64_t x = 15; cout << popcount(x);',
        whyItBreaks: '<bit> algorithms constrain inputs to unsigned integer types only.',
      },
      {
        title: 'Missing Parentheses Around Bitwise Check: x & 1 == 0',
        brokenCode: 'if (x & 1 == 0) ...',
        fixedCode: 'if ((x & 1) == 0) ...',
        whyItBreaks: '== has higher precedence than &, breaking parity checks.',
      },
    ],
    practiceSheet: [
      {
        id: 'cpp-ch-5-q1',
        difficulty: 'Easy',
        title: '1. Bitwise Parity Tag',
        prompt: 'Read long long n and print "ODD" if (n & 1) else "EVEN".',
        banglaHint: '(n & 1LL) দিয়ে যাচাই করো।',
        starterCode: `#include <iostream>\nusing namespace std;\nint main() {\n    long long n = 0; if (cin >> n) cout << ((n & 1LL) ? "ODD" : "EVEN") << "\\n";\n    return 0;\n}`,
        sampleStdin: '22',
        expectedOutput: 'EVEN',
      },
      {
        id: 'cpp-ch-5-q2',
        difficulty: 'Easy',
        title: '2. Count Set Bits (Popcount)',
        prompt: 'Read uint64_t n and print std::popcount(n).',
        banglaHint: '<bit> থেকে popcount(n) ব্যবহার করো।',
        starterCode: `#include <bit>\n#include <cstdint>\n#include <iostream>\nusing namespace std;\nint main() {\n    uint64_t n = 0; if (cin >> n) cout << popcount(n) << "\\n";\n    return 0;\n}`,
        sampleStdin: '15',
        expectedOutput: '4',
      },
      {
        id: 'cpp-ch-5-q3',
        difficulty: 'Medium',
        title: '3. Lowest Set Bit Isolation (x & -x)',
        prompt: 'Read positive long long x and print its lowest active power-of-two bit (x & -x).',
        banglaHint: 'x & -x সূত্রটি শুধু সবচেয়ে ডানের ১-বিটটি রেখে বাকি সব ০ করে দেয়।',
        starterCode: `#include <iostream>\nusing namespace std;\nint main() {\n    long long x = 0; if (cin >> x) cout << (x & -x) << "\\n";\n    return 0;\n}`,
        sampleStdin: '12',
        expectedOutput: '4',
      },
      {
        id: 'cpp-ch-5-q4',
        difficulty: 'Hard',
        title: '4. Subset Mask Total Combinations (2^n)',
        prompt: 'Read integer n (0 <= n <= 60) and output 1ULL << n.',
        banglaHint: 'অবশ্যই 1ULL << n লিখবে, 1 << n লিখলে ওভারফ্লো হবে!',
        starterCode: `#include <iostream>\nusing namespace std;\nint main() {\n    int n = 0; if (cin >> n) cout << (1ULL << n) << "\\n";\n    return 0;\n}`,
        sampleStdin: '40',
        expectedOutput: '1099511627776',
      },
    ],
    miniBuild: {
      title: 'Milestone Merger 1 (C++ Ch 1–5): C++23 <bit> Telemetry & Unique Finder',
      description: 'Audits binary bit counts and power-of-two properties via modern <bit> intrinsics.',
      banglaGoal: 'C++23 <bit> লাইব্রেরি দিয়ে বাইনারি বিশ্লেষণ তৈরি করা।',
      combinesChapters: 'Ch 1–5',
      starterCode: `#include <bit>
#include <cstdint>
#include <iostream>
using namespace std;

int main() {
    uint64_t n = 0;
    if (cin >> n) {
        cout << "ones=" << popcount(n) << " pow2=" << (has_single_bit(n) ? 1 : 0) << "\\n";
    }
    return 0;
}`,
      sampleStdin: '29',
      expectedOutput: 'ones=4 pow2=0',
    },
    starterCode: `#include <bit>
#include <cstdint>
#include <iostream>
using namespace std;

int main() {
    uint64_t n = 0;
    if (cin >> n) {
        cout << "ones=" << popcount(n) << " pow2=" << (has_single_bit(n) ? 1 : 0) << "\\n";
    }
    return 0;
}`,
    sampleStdin: '29',
    expectedSampleOutput: 'ones=4 pow2=0',
    testCases: [
      { id: 'cpp5-t1', input: '29', expectedOutput: 'ones=4 pow2=0' },
      { id: 'cpp5-t2', input: '64', expectedOutput: 'ones=1 pow2=1', isHidden: true },
    ],
  },
  ...LESSONS_CPP_P2,
  ...LESSONS_CPP_P3,
  ...LESSONS_CPP_P4,
  ...LESSONS_CPP_P5,
};
