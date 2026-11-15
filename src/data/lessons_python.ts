import type { AtomicLessonOverride } from './atomicLessonTypes';
import { LESSONS_PYTHON_P2 } from './lessons_python_p2';
import { LESSONS_PYTHON_P3 } from './lessons_python_p3';
import { LESSONS_PYTHON_P4 } from './lessons_python_p4';
import { LESSONS_PYTHON_P5 } from './lessons_python_p5';

export const LESSONS_PYTHON: Record<number, AtomicLessonOverride> = {
  1: {
    chapterNumber: 1,
    title: 'Python Chapter 1 (Python 3.13+): Interpreter Under the Hood & First Program',
    banglaTitle: 'Python অধ্যায় ১ (Python 3.13+): ইন্টারপ্রেটার, বাইটকোড ও প্রথম প্রোগ্রাম',
    subtitle: 'How CPython 3.13 compiles code to .pyc bytecode VM instructions, indentation rules, and sys.stdin speed.',
    zeroIntuition: {
      plainEnglishStory:
        'Python hides manual compilation steps from you, yet a full pipeline runs under the hood: CPython 3.13 tokenizes your source file, builds an Abstract Syntax Tree (AST), compiles it into compact .pyc bytecode, and runs it inside a stack-based Virtual Machine. Unlike brace languages, Python uses strict 4-space indentation to define every scope block cleanly.\n\nFor interactive scripts, input() reads one text line (always returning str until wrapped in int()), while print() writes formatted f-strings to stdout. In competitive programming with 10^5+ tokens, calling input() repeatedly becomes a bottleneck—switching to sys.stdin.read().split() slurps the entire buffer at C speed.',
      asciiFlowchart: `  [ main.py ] --(Lexer & AST Parser)--> [ Bytecode (.pyc) ]
        |
        v  (CPython 3.13 Virtual Machine Frame)
  [ sys.stdin.read().split() ] --> [ f"..." format ] --> [ print(...) -> stdout ]`,
      pseudocode: [
        '1. PARSE Python script lines top-to-bottom',
        '2. READ whitespace-separated tokens from sys.stdin',
        '3. CONVERT numeric tokens cleanly using int()',
        '4. PRINT f-string result to stdout',
      ],
      banglaZeroToHero: {
        analogyTitle: 'দোভাষী রোবট ও ইনডেন্টেশন নিয়ম',
        explanation:
          'C বা C++-এর মতো আলাদা করে কম্পাইল কমান্ড চালাতে না হলেও, Python কোড রান করার সময় CPython 3.13 ইন্টারপ্রেটার গোপনে পুরো কোডটি পড়ে প্রথমে AST এবং তারপর দ্রুতগতির বাইটকোড (.pyc)-এ রূপান্তর করে ভার্চুয়াল মেশিনে চালায়। এখানে সেকেন্ড ব্র্যাকেট { } বা সেমিকোলনের কোনো বালাই নেই—প্রতিটি ব্লক চেনা যায় বামের ঠিক ৪টি স্পেস (Indentation) দেখে, যা কোডকে প্রথম দিন থেকেই পরিচ্ছন্ন রাখে। মনে রাখা জরুরি যে input() সব সময় স্ট্রিং রিটার্ন করে; তাই গাণিতিক কাজ করতে হলে অবশ্যই int() বা float() দিয়ে বদলে নিতে হয়। আর বড় কনটেস্টে হাজার হাজার সংখ্যা পড়ার জন্য ধীরগতির input()-এর বদলে sys.stdin.read().split() ব্যবহার করলে একবারেই পুরো ইনপুট C-স্পিডে মেমোরিতে চলে আসে!',
        everydayExample:
          'প্যারাগ্রাফ লেখার সময় নতুন পয়েন্ট একটু ডান দিকে সরিয়ে (Indent করে) লেখার মতোই Python কোড সাজানো থাকে।',
        keyTakeaways: [
          'Python-এ ব্লক বোঝাতে ৪ স্পেস ইনডেন্টেশন বাধ্যতামূলক—ইনডেন্টেশন এলোমেলো হলে IndentationError হয়।',
          'একই লাইনে print() শেষে ডিফল্ট হিসেবে \\n দেয়; চাইলে end="" দিয়ে তা বদলানো যায়।',
          'কনটেস্টে হাজার হাজার ইনপুট পড়তে input()-এর বদলে sys.stdin.read().split() ১০ গুণ দ্রুত!',
        ],
      },
    },
    topics: [
      {
        id: 'python-ch-1-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'First Print, f-Strings & Indentation Hygiene',
        englishParagraphs: [
          'Python 3.13 scripts execute directly from line 1 without boilerplate class or main() wrappers. However, clean Python projects often isolate logic inside functions using 4-space indentation.',
          'f-strings (f"...") evaluate expressions directly inside curly braces { } faster and more legibly than string concatenation.',
        ],
        banglaParagraphs: [
          'Python-এ কোনো #include বা int main() লিখতে হয় না—প্রথম লাইন থেকেই কোড শুরু হয়! লেখা ও ভ্যারিয়েবল একসাথে দেখাতে f-string (যেমন f"Hello {name}") সবচেয়ে সহজ পদ্ধতি।',
          'ডিফল্টভাবে প্রতি print() শেষ হলে স্বয়ংক্রিয়ভাবে একটি নতুন লাইন যুক্ত হয়।',
        ],
        memoryDiagram: `CPython Frame -> str literal + f-string interpolation -> stdout: "Hello, Python 3.13!"`,
        code: `lang = "Python"
ver = 3.13
print(f"Hello, {lang} {ver}!")`,
        stdin: '',
        expectedOutput: 'Hello, Python 3.13!',
        lineByLine: [
          {
            lineNumber: 'Line 1-2',
            codeSnippet: 'lang = "Python"; ver = 3.13',
            whatItMeans: 'Binds string and float objects dynamically without type keywords.',
            whyItIsThere: 'Python names point directly to heap objects.',
            ifDeletedError: 'NameError when f-string references lang/ver.',
          },
          {
            lineNumber: 'Line 3',
            codeSnippet: 'print(f"Hello, {lang} {ver}!")',
            whatItMeans: 'Interpolates expressions inside {} and prints with newline.',
            whyItIsThere: 'Fastest, cleanest output formatting in Python 3.',
            ifDeletedError: 'No stdout produced.',
          },
        ],
      },
      {
        id: 'python-ch-1-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Reading Tokens with input().split() & int() Conversion',
        englishParagraphs: [
          'input() ALWAYS returns a string (str) in Python! Adding "21" + "21" concatenates into "2121" unless explicitly converted with int().',
          'Calling input().split() splits whitespace cleanly into separate variables in one line.',
        ],
        banglaParagraphs: [
          'মনে রাখবে Python-এ input() সব সময় স্ট্রিং হিসেবে ডেটা নেয়! তাই অঙ্ক করতে চাইলে অবশ্যই int() বা float() দিয়ে সংখ্যায় রূপান্তর করতে হবে।',
          'একই লাইনে দুটি মান পড়তে name, val = input().split() দারুণ একটি শর্টকাট।',
        ],
        memoryDiagram: `stdin: "Mina 21" -> name="Mina", val=int("21")=21 -> "Mina -> 42"`,
        code: `name, val_str = input().split()
val = int(val_str)
print(f"{name} -> {val * 2}")`,
        stdin: 'Mina 21',
        expectedOutput: 'Mina -> 42',
        lineByLine: [
          {
            lineNumber: 'Line 1',
            codeSnippet: 'name, val_str = input().split()',
            whatItMeans: 'Reads one line and unpacks whitespace-separated words.',
            whyItIsThere: 'Handles two tokens on one line seamlessly.',
            ifDeletedError: 'Variables not populated from stdin.',
          },
          {
            lineNumber: 'Line 2',
            codeSnippet: 'val = int(val_str)',
            whatItMeans: 'Parses base-10 text digits into arbitrary-precision Python int.',
            whyItIsThere: 'Without int(), val_str * 2 prints "2121"!',
            ifDeletedError: 'String repetition bug ("2121") instead of numeric 42.',
          },
        ],
      },
      {
        id: 'python-ch-1-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Runtime Introspection via sys.version_info & Modular main()',
        englishParagraphs: [
          'Production Python tools wrap startup inside def main() -> None: and guard execution with if __name__ == "__main__": so importing the file in tests never runs CLI prompts accidentally.',
          'Using type hints (-> None) documents intent clearly for IDE checkers and teams.',
        ],
        banglaParagraphs: [
          'পেশাদার Python কোডে সরাসরি বাইরে কোড না লিখে def main() ফাংশনের ভেতর রাখা হয় এবং শেষে if __name__ == "__main__": দেওয়া হয়।',
          'এতে ফাইলটি অন্য প্রোগ্রাম থেকে import করলে স্বয়ংক্রিয়ভাবে চলবে না, কেবল সরাসরি চালালেই রান হবে।',
        ],
        memoryDiagram: `__name__ == "__main__" -> calls main() -> sys.getsizeof(0) >= 24`,
        code: `import sys

def main() -> None:
    print(f"int(0) tracked: {sys.getsizeof(0) >= 24}")

if __name__ == "__main__":
    main()`,
        stdin: '',
        expectedOutput: 'int(0) tracked: True',
        lineByLine: [
          {
            lineNumber: 'Line 6',
            codeSnippet: 'if __name__ == "__main__":',
            whatItMeans: 'Runs main() only when script is launched directly.',
            whyItIsThere: 'Prevents side effects during module imports or unit tests.',
            ifDeletedError: 'main() either never runs or runs unexpectedly on import.',
          },
        ],
      },
      {
        id: 'python-ch-1-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Fast Competitive I/O with sys.stdin.read().split()',
        englishParagraphs: [
          'Calling input() 100,000 times inside a Codeforces loop is slow and crashes with EOFError if an extra blank line appears or tokens wrap across lines.',
          'Reading the entire buffer once with sys.stdin.read().split() handles arbitrary line breaks cleanly and parses 10^5 integers in ~35ms.',
        ],
        banglaParagraphs: [
          'Codeforces-এ অনেক সময় ইনপুট একটি লাইনের বদলে পরের লাইনে ভেঙে দেওয়া থাকে—তখন input().split() ভেঙে পড়ে (ValueError) বা ধীর হয়।',
          'sys.stdin.read().split() দিয়ে পুরো ইনপুট একবারে লিস্টে নিয়ে int-এ ম্যাপ করলে কোনো ফরম্যাট এরর হয় না এবং স্পিডও বহুগুণ বাড়ে!',
        ],
        memoryDiagram: `sys.stdin.read().split() -> ["2", "3", "4", "10", "20"] -> idx jumps cleanly`,
        code: `import sys

tokens = sys.stdin.read().split()
if tokens:
    t = int(tokens[0])
    idx = 1
    out = []
    for _ in range(t):
        a = int(tokens[idx])
        b = int(tokens[idx + 1])
        idx += 2
        out.append(str(a + b))
    print("\\n".join(out))`,
        stdin: '2\n3 4\n10 20',
        expectedOutput: '7\n30',
        lineByLine: [
          {
            lineNumber: 'Line 3',
            codeSnippet: 'tokens = sys.stdin.read().split()',
            whatItMeans: 'Reads entire stdin into flat whitespace-split token list.',
            whyItIsThere: 'Immune to inconsistent newlines and 10x faster than input().',
            ifDeletedError: 'Multiple input() calls may hit EOFError or TLE.',
          },
        ],
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 1',
        codeSnippet: 'tokens = sys.stdin.read().split()',
        whatItMeans: 'Reads all incoming stdin tokens cleanly into memory.',
        whyItIsThere: 'Standard Python CP fast-I/O template.',
        ifDeletedError: 'Slow line-by-line input() calls.',
      },
      {
        lineNumber: 'Line 2',
        codeSnippet: 'val = int(val_str)',
        whatItMeans: 'Converts text string to integer.',
        whyItIsThere: 'input() always returns str; "5" * 2 = "55".',
        ifDeletedError: 'String concatenation bug.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'sys.stdin.read().split()', memoryOrStack: 'tokens=["2","3","4","10","20"]', note: 'Flat token list' },
      { step: 2, state: 'Read t = 2', memoryOrStack: 't=2, idx=1', note: '2 pairs queued' },
      { step: 3, state: 'Loop 1: 3 + 4', memoryOrStack: 'out=["7"], idx=3', note: 'String appended' },
      { step: 4, state: 'Loop 2 & join', memoryOrStack: 'stdout="7\\n30"', note: 'Emitted in 1 print' },
    ],
    harryBugTraps: [
      {
        title: 'Forgetting int() Around input()',
        brokenCode: 'x = input()\\nprint(x * 2) # prints "55" for input 5!',
        fixedCode: 'x = int(input())\\nprint(x * 2)',
        whyItBreaks: 'Multiplying a string in Python repeats text instead of doing arithmetic.',
      },
      {
        title: 'Mixing Tabs and Spaces for Indentation',
        brokenCode: 'if True:\\n\\tprint(1)\\n    print(2)',
        fixedCode: 'Use consistent 4 spaces everywhere.',
        whyItBreaks: 'Python 3 raises TabError: inconsistent use of tabs and spaces.',
      },
      {
        title: 'Shadowing Built-in Functions (list = ... or sum = ...)',
        brokenCode: 'sum = 10\\nprint(sum([1, 2]))',
        fixedCode: 'total = 10\\nprint(sum([1, 2]))',
        whyItBreaks: 'Overwriting built-in names breaks later calls with TypeError.',
      },
    ],
    practiceSheet: [
      {
        id: 'python-ch-1-q1',
        difficulty: 'Easy',
        title: '1. Python 3.13 Hello Banner',
        prompt: 'Print exact text: Python 3.13 Online!',
        banglaHint: 'print("Python 3.13 Online!") লিখো।',
        starterCode: 'print("Python 3.13 Online!")',
        sampleStdin: '',
        expectedOutput: 'Python 3.13 Online!',
      },
      {
        id: 'python-ch-1-q2',
        difficulty: 'Easy',
        title: '2. Square an Input Integer',
        prompt: 'Read integer n from stdin and print n * n.',
        banglaHint: 'int(input()) দিয়ে সংখ্যা পড়ে বর্গ প্রিন্ট করো।',
        starterCode: 'n = int(input().strip())\nprint(n * n)',
        sampleStdin: '12',
        expectedOutput: '144',
      },
      {
        id: 'python-ch-1-q3',
        difficulty: 'Medium',
        title: '3. Token Pair Multiplier',
        prompt: 'Read name and integer k on one line; print "<name>: <k*5>".',
        banglaHint: 'a, b = input().split() দিয়ে ভেঙে int(b) করো।',
        starterCode: 'name, b = input().split()\nprint(f"{name}: {int(b) * 5}")',
        sampleStdin: 'Arjun 8',
        expectedOutput: 'Arjun: 40',
      },
      {
        id: 'python-ch-1-q4',
        difficulty: 'Hard',
        title: '4. Fast Multi-Test Sum',
        prompt: 'Read t test cases using sys.stdin.read().split() and print a + b per line.',
        banglaHint: 'sys.stdin.read().split() দিয়ে সব টোকেন নিয়ে লুপ চালাও।',
        starterCode: 'import sys\nt = sys.stdin.read().split()\nn = int(t[0])\nprint("\\n".join(str(int(t[1+2*i]) + int(t[2+2*i])) for i in range(n)))',
        sampleStdin: '2\n11 9\n100 50',
        expectedOutput: '20\n150',
      },
    ],
    miniBuild: {
      title: 'Python 3.13 Fast Stdin Tokenizer',
      description: 'Reads structured tokens from sys.stdin with type conversion and f-string output.',
      banglaGoal: 'sys.stdin ও f-string দিয়ে দ্রুতগতির Python প্রোগ্রাম চালানো।',
      combinesChapters: 'Ch 1',
      starterCode: `import sys

parts = sys.stdin.read().split()
if len(parts) >= 2:
    name = parts[0]
    val = int(parts[1])
    print(f"{name} -> {val * 2}")`,
      sampleStdin: 'Mina 21',
      expectedOutput: 'Mina -> 42',
    },
    starterCode: `import sys

parts = sys.stdin.read().split()
if len(parts) >= 2:
    name = parts[0]
    val = int(parts[1])
    print(f"{name} -> {val * 2}")`,
    sampleStdin: 'Mina 21',
    expectedSampleOutput: 'Mina -> 42',
    testCases: [
      { id: 'py1-t1', input: 'Mina 21', expectedOutput: 'Mina -> 42' },
      { id: 'py1-t2', input: 'Argon 10', expectedOutput: 'Argon -> 20', isHidden: true },
    ],
  },

  2: {
    chapterNumber: 2,
    title: 'Python Chapter 2 (Python 3.13+): Standard I/O, Formatting & Escapes',
    banglaTitle: 'Python অধ্যায় ২ (Python 3.13+): স্ট্যান্ডার্ড I/O, f-স্ট্রিং ফরম্যাটিং ও এস্কেপ',
    subtitle: 'Master f-string format mini-language ({x:05d}, {y:.2f}), print(sep, end), raw strings r"...", and escape sequences.',
    zeroIntuition: {
      plainEnglishStory:
        'Python’s f-string format mini-language embeds precision, zero-padding, and alignment specifiers directly after a colon inside curly braces: {hr:02d} pads single-digit hours to "09", {amt:.2f} locks exact trailing cents like "49.50", and {name:<10} left-aligns terminal leaderboard columns with zero external libraries.\n\nBeyond single prints, print(*args, sep=" | ", end="") customizes separators effortlessly, while raw strings r"C:\\bin\\py" stop backslashes from acting as escape characters. When emitting 10^5 lines in competitive programming, building a string list and calling print("\\n".join(out)) avoids 100,000 separate stream flushes.',
      asciiFlowchart: `  [ hr=9, min=5, amt=49.5 ]
        |
        v  f"{hr:02d}:{min:02d} | {amt:.2f}"
  [ stdout: "09:05 | 49.50" ]`,
      pseudocode: [
        '1. READ hr, min, and amt from stdin',
        '2. APPLY :02d padding to time integers',
        '3. APPLY :.2f fixed precision to float amt',
        '4. PRINT clean formatted line',
      ],
      banglaZeroToHero: {
        analogyTitle: 'f-স্ট্রিং ফরম্যাটিং কোলন (:) ম্যাজিক',
        explanation:
          'Python-এ পুরনো % বা .format() পদ্ধতি ভুলে যাও—আধুনিক f-string-এর কোলন (:) জাদু দিয়ে এক লাইনেই নিখুঁত আউটপুট সাজানো যায়! যেমন f"{hr:02d}:{mn:02d}" দিলে 9:5-এর বদলে চমৎকার 09:05 জিরো-প্যাডিং হবে, f"{amt:.2f}" দিলে দশমিকের পর ঠিক ২ ঘর (যেমন 49.50) দেখাবে, আর {name:<8} ও {pts:>5} দিয়ে সোজা টার্মিনাল টেবিল বানানো যাবে। অনেকেই round(7.50, 2) দিয়ে ট্রেইলিং জিরো আনতে গিয়ে ব্যর্থ হন—কারণ round() সংখ্যা ফেরত দেয়, স্ট্রিং ফরম্যাট নয়। ফাইল পাথে \\n বা \\t ঝামেলা এড়াতে r"..." র-স্ট্রিং ব্যবহার করবে। আর কনটেস্টে লক্ষ লাইন প্রিন্ট করতে বারবার print() না ডেকে লিস্টে জমিয়ে শেষে print("\\n".join(out)) করাই প্রফেশনাল নিয়ম!',
        everydayExample:
          'ডিজিটাল ঘড়িতে 9:5 এর বদলে 09:05 দেখাতে f"{hr:02d}:{min:02d}" লেখাই যথেষ্ট!',
        keyTakeaways: [
          'f"{x:.2f}" সবসময় দশমিকের পর ঠিক ২ ঘর (যেমন 7.50) দেখায়।',
          'উইন্ডোজ ফাইল পাথ লিখতে স্ট্রিংয়ের আগে r"..." (Raw String) দিলে ব্যাকস্ল্যাশ নিয়ে কোনো ঝামেলা হয় না।',
          'Python 3.12+ এ f-string-এর ভেতর একই ধরনের কোটেশন নির্ভয়ে ব্যবহার করা যায়!',
        ],
      },
    },
    topics: [
      {
        id: 'python-ch-2-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'print(sep, end), Escape Sequences & Raw Strings',
        englishParagraphs: [
          'print() accepts sep (default " ") to join multiple arguments and end (default "\\n") to control what appears after the last argument.',
          'Prefixing r before quotes creates a raw string where \\n or \\t remain literal characters instead of newlines or tabs.',
        ],
        banglaParagraphs: [
          'print(a, b, sep="-") লিখলে মাঝখানে স্পেসের বদলে হাইফেন বসবে, আর end=" " দিলে নতুন লাইন না হয়ে একই লাইনে থাকবে।',
          'পাথ বা রেজেক্স লেখার সময় r"C:\\bin" দিলে \\b ব্যাকস্পেস হিসেবে কাজ করবে না।',
        ],
        memoryDiagram: `sep=" | " joins args | r"C:\\bin" preserves literal backslash`,
        code: `print("2026", "11", "13", sep="-")
print("Path:\\t" + r"C:\\bin\\py")`,
        stdin: '',
        expectedOutput: '2026-11-13\nPath:\tC:\\bin\\py',
        lineByLine: [
          {
            lineNumber: 'Line 1',
            codeSnippet: 'sep="-"',
            whatItMeans: 'Overrides default space separator between print arguments.',
            whyItIsThere: 'Formats dates/lists cleanly without extra loops.',
            ifDeletedError: 'Prints "2026 11 13" with spaces.',
          },
          {
            lineNumber: 'Line 2',
            codeSnippet: 'r"C:\\bin\\py"',
            whatItMeans: 'Raw string keeping backslashes untouched.',
            whyItIsThere: 'Prevents \\b from becoming a backspace control char.',
            ifDeletedError: 'Backslashes treated as escape sequences.',
          },
        ],
      },
      {
        id: 'python-ch-2-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Zero-Padded Timestamps & Fixed Monetary Decimals',
        englishParagraphs: [
          'Inside f-strings, :02d pads integers to 2 digits with leading zeros and :.2f fixes floating output to 2 fractional digits.',
          'Note that Python prints negative zero carefully and rounds binary floats nicely with :.2f.',
        ],
        banglaParagraphs: [
          'f"{hr:02d}:{min:02d}" দিয়ে ঘড়ির সময় এবং f"{amt:.2f}" দিয়ে দশমিকের পর ২ ঘর নির্ভুলভাবে প্রিন্ট করা যায়।',
          'ইনপুট পড়তে sys.stdin.read().split() ব্যবহার করা হয়েছে যাতে এক লাইন বা একাধিক লাইনের ইনপুট নির্ভুলভাবে পড়ে।',
        ],
        memoryDiagram: `stdin: "9 5 49.5" -> "09:05 | Total: 49.50"`,
        code: `import sys

parts = sys.stdin.read().split()
if len(parts) >= 3:
    hr, mn = int(parts[0]), int(parts[1])
    amt = float(parts[2])
    print(f"{hr:02d}:{mn:02d} | Total: {amt:.2f}")`,
        stdin: '9 5 49.5',
        expectedOutput: '09:05 | Total: 49.50',
        lineByLine: [
          {
            lineNumber: 'Line 7',
            codeSnippet: '{hr:02d}:{mn:02d} | Total: {amt:.2f}',
            whatItMeans: 'Applies 2-digit zero pad to ints and 2-decimal fixed format to float.',
            whyItIsThere: 'Standard clean display formatting.',
            ifDeletedError: 'Prints "9:5 | Total: 49.5".',
          },
        ],
      },
      {
        id: 'python-ch-2-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Aligned Terminal Leaderboard Column Table',
        englishParagraphs: [
          'Alignment specifiers < (left), > (right), and ^ (center) inside f-strings build clean fixed-width terminal tables.',
          'For example, {name:<10} pads spaces on the right while {score:>5} right-aligns numbers.',
        ],
        banglaParagraphs: [
          'টার্মিনাল টেবিলের কলাম সাজাতে f"{name:<8}" (বামে চেপে) এবং f"{pts:>5}" (ডানে চেপে) দারুণ কাজ করে।',
          'কোনো এক্সটার্নাল লাইব্রেরি ছাড়াই সুন্দর লিডারবোর্ড তৈরি করা যায়।',
        ],
        memoryDiagram: `{name:<8} -> "Mina    " | {pts:>5} -> "  150"`,
        code: `name, pts = input().split()
print(f"{name:<8} {int(pts):>5}")`,
        stdin: 'Mina 150',
        expectedOutput: 'Mina       150',
        lineByLine: [
          {
            lineNumber: 'Line 2',
            codeSnippet: '{name:<8} {int(pts):>5}',
            whatItMeans: 'Left-aligns text in 8 chars and right-aligns integer in 5 chars.',
            whyItIsThere: 'Maintains vertical table column discipline.',
            ifDeletedError: 'Unaligned jagged columns.',
          },
        ],
      },
      {
        id: 'python-ch-2-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Fast Bulk Output with "\\n".join() & Precision Guarantee',
        englishParagraphs: [
          'When outputting 10^5 answers in Python, calling print() 10^5 separate times incurs 10^5 Python function calls and OS flushes.',
          'Collecting string results in a list and executing print("\\n".join(ans)) emits all 10^5 lines in one fast pass.',
        ],
        banglaParagraphs: [
          'Codeforces-এ ১ লক্ষ বার আলাদা আলাদা print() না দিয়ে সব উত্তর একটি লিস্টে জমা রেখে শেষে print("\\n".join(out)) করলে সময় অনেক বাঁচে!',
          'পাশাপাশি map(int, input().split()) দিয়ে একসাথে পুরো লাইন সংখ্যা হিসেবে পড়ে নেওয়া যায়।',
        ],
        memoryDiagram: `map(int, ...) -> list of formatted strings -> single "\\n".join() flush`,
        code: `import sys

nums = list(map(float, sys.stdin.read().split()))
if len(nums) >= 2:
    print(f"{nums[0] / nums[1]:.6f}")`,
        stdin: '22 7',
        expectedOutput: '3.142857',
        lineByLine: [
          {
            lineNumber: 'Line 5',
            codeSnippet: ':.6f',
            whatItMeans: 'Locks output to exact 6 fractional digits.',
            whyItIsThere: 'Matches standard 10^-6 competitive judge precision.',
            ifDeletedError: 'Prints full 16 digits or scientific notation.',
          },
        ],
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 1',
        codeSnippet: 'f"{hr:02d}:{mn:02d}"',
        whatItMeans: 'Formats integers with 2-character zero padding.',
        whyItIsThere: 'Standard clock and padded ID formatting.',
        ifDeletedError: 'Prints single digits without leading zeros.',
      },
      {
        lineNumber: 'Line 2',
        codeSnippet: 'f"{val:.2f}"',
        whatItMeans: 'Formats floating number to exactly 2 decimal digits.',
        whyItIsThere: 'Guarantees exact decimal display.',
        ifDeletedError: 'Drops trailing zeros like .50 -> .5.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'Read tokens', memoryOrStack: 'parts=["9","5","49.5"]', note: 'Parsed from stdin' },
      { step: 2, state: 'Convert types', memoryOrStack: 'hr=9, mn=5, amt=49.5', note: 'int + float ready' },
      { step: 3, state: 'Evaluate f-string', memoryOrStack: 'out="09:05 | Total: 49.50"', note: 'Padded + locked' },
      { step: 4, state: 'print(out)', memoryOrStack: 'stdout="09:05 | Total: 49.50"', note: 'Done' },
    ],
    harryBugTraps: [
      {
        title: 'Forgetting r Prefix on Windows Path Strings',
        brokenCode: 'p = "C:\\new\\test.txt" # \\n becomes newline, \\t becomes tab!',
        fixedCode: 'p = r"C:\\new\\test.txt"',
        whyItBreaks: 'Escape sequences \\n and \\t silently split and corrupt file paths.',
      },
      {
        title: 'Using round() Expecting Trailing Zeros',
        brokenCode: 'print(round(7.50, 2)) # prints 7.5 instead of 7.50!',
        fixedCode: 'print(f"{7.50:.2f}")',
        whyItBreaks: 'round() returns a numeric float, which drops trailing zeros when converted to text.',
      },
      {
        title: 'Forgetting strip() on input() Lines With Extra Spaces',
        brokenCode: 's = input() # trailing \\r or space breaks equality check',
        fixedCode: 's = input().strip()',
        whyItBreaks: 'Trailing whitespace fails exact string matching.',
      },
    ],
    practiceSheet: [
      {
        id: 'python-ch-2-q1',
        difficulty: 'Easy',
        title: '1. Zero-Pad ID to 4 Digits',
        prompt: 'Read int id and output zero-padded 4-digit string (e.g. 7 -> 0007).',
        banglaHint: 'f"{n:04d}" ব্যবহার করো।',
        starterCode: 'n = int(input().strip())\nprint(f"{n:04d}")',
        sampleStdin: '7',
        expectedOutput: '0007',
      },
      {
        id: 'python-ch-2-q2',
        difficulty: 'Easy',
        title: '2. Currency Format (.2f)',
        prompt: 'Read float price and qty; output exact price * qty to 2 decimal places.',
        banglaHint: 'f"{price * qty:.2f}" লিখো।',
        starterCode: 'p, q = map(float, input().split())\nprint(f"{p * q:.2f}")',
        sampleStdin: '12.5 3',
        expectedOutput: '37.50',
      },
      {
        id: 'python-ch-2-q3',
        difficulty: 'Medium',
        title: '3. Hyphen Date Formatter',
        prompt: 'Read day, month, year and print YYYY-MM-DD with 2-digit month/day.',
        banglaHint: 'f"{y:04d}-{m:02d}-{d:02d}" ব্যবহার করো।',
        starterCode: 'd, m, y = map(int, input().split())\nprint(f"{y:04d}-{m:02d}-{d:02d}")',
        sampleStdin: '5 2 2026',
        expectedOutput: '2026-02-05',
      },
      {
        id: 'python-ch-2-q4',
        difficulty: 'Hard',
        title: '4. High-Precision Division',
        prompt: 'Read ints a and b; print a / b to 6 decimal places.',
        banglaHint: 'f"{a / b:.6f}" দাও।',
        starterCode: 'a, b = map(int, input().split())\nprint(f"{a / b:.6f}")',
        sampleStdin: '22 7',
        expectedOutput: '3.142857',
      },
    ],
    miniBuild: {
      title: 'Python 3.13 Precision Clock & Receipt Printer',
      description: 'Formats time and financial amounts using clean f-string mini-language.',
      banglaGoal: 'f-string মিনি-ল্যাঙ্গুয়েজ ব্যবহার করে নিখুঁত ফরম্যাট প্রিন্টার চালানো।',
      combinesChapters: 'Ch 1–2',
      starterCode: `import sys

parts = sys.stdin.read().split()
if len(parts) >= 3:
    hr, mn = int(parts[0]), int(parts[1])
    amt = float(parts[2])
    print(f"{hr:02d}:{mn:02d} | Total: {amt:.2f}")`,
      sampleStdin: '9 5 49.5',
      expectedOutput: '09:05 | Total: 49.50',
    },
    starterCode: `import sys

parts = sys.stdin.read().split()
if len(parts) >= 3:
    hr, mn = int(parts[0]), int(parts[1])
    amt = float(parts[2])
    print(f"{hr:02d}:{mn:02d} | Total: {amt:.2f}")`,
    sampleStdin: '9 5 49.5',
    expectedSampleOutput: '09:05 | Total: 49.50',
    testCases: [
      { id: 'py2-t1', input: '9 5 49.5', expectedOutput: '09:05 | Total: 49.50' },
      { id: 'py2-t2', input: '18 40 7.1', expectedOutput: '18:40 | Total: 7.10', isHidden: true },
    ],
  },

  3: {
    chapterNumber: 3,
    title: 'Python Chapter 3 (Python 3.13+): Dynamic Variables, Big Ints & Precision Traps',
    banglaTitle: 'Python অধ্যায় ৩ (Python 3.13+): ডায়নামিক ভ্যারিয়েবল, বিশাল ইন্টিজার ও ফ্লোট প্রিসিশন',
    subtitle: 'Python arbitrary-precision ints (never overflow!), float 0.1+0.2 IEEE-754 traps, Decimal/// floor division, and object references.',
    zeroIntuition: {
      plainEnglishStory:
        'Python variables are object references on the heap rather than fixed 4-byte stack boxes. Because Python’s int type dynamically expands in RAM, expressions like 2 ** 100 or n * (n + 1) // 2 for n = 10^18 never overflow! However, using single-slash / division promotes huge integers to 64-bit IEEE-754 floats (only 53 bits of significand precision), silently corrupting low digits past 9 × 10^15.\n\nAlways use // for exact integer division—while remembering that Python rounds // toward negative infinity (-7 // 2 == -4, unlike C’s -3). For exact financial decimal math free of 0.1 + 0.2 == 0.30000000000000004 drift, instantiate decimal.Decimal from strings, and use pow(a, b, mod) for O(log b) modular powers.',
      asciiFlowchart: `  [ x = 10**25 ] --> Arbitrary-Precision Heap PyLongObject (NEVER OVERFLOWS!)
        |
        +--> BAD:  x / 2  --> Converts to 64-bit float -> loses low digits!
        +--> GOOD: x // 2 --> Exact integer floor division -> zero precision loss!`,
      pseudocode: [
        '1. READ large integer n (even 10^18+)',
        '2. COMPUTE n * (n + 1) // 2 using integer // division',
        '3. CHECK type() / precision invariants',
        '4. PRINT exact integer output',
      ],
      banglaZeroToHero: {
        analogyTitle: 'রাবারের প্রসারণশীল ব্যাগ (Arbitrary-Size Int) ও ভাগ // ফাঁদ',
        explanation:
          'C বা Java-তে নির্দিষ্ট ৩২-বিট বা ৬৪-বিট সীমা পার হলেই ইন্টিজার ওভারফ্লো হয়ে সংখ্যা ভেঙে যায়, কিন্তু Python-এর int হলো প্রসারণশীল রাবারের থলের মতো—RAM যতক্ষণ আছে ১০^১০০ পর্যন্ত সংখ্যাও কখনোই ওভারফ্লো হবে না! তবে এখানে একটি মারাত্মক ফাঁদ লুকিয়ে আছে: Python-এ সাধারণ ভাগ (/) ব্যবহার করলে উত্তরটি ৬৪-বিট float হয়ে যায়, যা মাত্র ১৫–১৬ ডিজিট নির্ভুল রাখতে পারে! তাই বড় পূর্ণসংখ্যা ভাগের জন্য সব সময় // (ফ্লোর ডিভিশন) লিখবে। আরেকটি সতর্কতা হলো -7 // 2 করলে Python-এ -4 আসে (নিচের দিকে রাউন্ড করে)। টাকার হিসাবে 0.1 + 0.2 এর বাইনারি ত্রুটি এড়াতে decimal.Decimal("0.1") এবং বিশাল পাওয়ার মড বের করতে বিল্ট-ইন pow(a, b, mod) ব্যবহার করা সেরা অভ্যাস।',
        everydayExample:
          '০.১ + ০.২ = ০.৩০...০৪ হওয়া বাইনারি দশমিকের সীমাবদ্ধতা—তাই টাকার হিসাব বা বড় সংখ্যায় float এড়িয়ে int / // অথবা Decimal ব্যবহার করা বুদ্ধিমানের কাজ।',
        keyTakeaways: [
          'Python-এ 10**50 হিসাবও অনায়াসে করা যায়, কোনো long long লাগে না।',
          'পূর্ণসংখ্যার ভাগের জন্য সব সময় // ব্যবহার করো, নইলে / ফলাফলকে float-এ বদলে নির্ভুলতা নষ্ট করে।',
          'ভ্যারিয়েবল কপি করলে নতুন অবজেক্ট তৈরি হয় না, কেবল একই অবজেক্টের আরেকটি নাম (Reference) যুক্ত হয়।',
        ],
      },
    },
    topics: [
      {
        id: 'python-ch-3-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Core Dynamic Types (int, float, bool, str) & Underscore Literals',
        englishParagraphs: [
          'Python 3 allows underscores inside numeric literals (1_000_000_000) for human readability without changing numeric value.',
          'bool is actually a subclass of int in Python (True == 1, False == 0), enabling clean sums of boolean predicates.',
        ],
        banglaParagraphs: [
          'বড় সংখ্যা সহজে পড়ার জন্য Python-এ অঙ্কের মাঝে আন্ডারস্কোর (_) দেওয়া যায়—যেমন 1_000_000।',
          'type() ফাংশন দিয়ে যেকোনো সময় একটি ভ্যারিয়েবলের ভেতরে কোন টাইপের অবজেক্ট আছে তা দেখা যায়।',
        ],
        memoryDiagram: `x = 1_000_000 -> int | ratio = 3.5 -> float | ok = True -> bool`,
        code: `pop = 8_000_000_000
ratio = 3.5
ok = True
print(pop, ratio, type(pop).__name__, int(ok))`,
        stdin: '',
        expectedOutput: '8000000000 3.5 int 1',
        lineByLine: [
          {
            lineNumber: 'Line 1',
            codeSnippet: 'pop = 8_000_000_000',
            whatItMeans: 'Visual digit grouping inside integer literal.',
            whyItIsThere: 'Zero runtime cost; prevents miscounting zeros.',
            ifDeletedError: 'pop undefined.',
          },
        ],
      },
      {
        id: 'python-ch-3-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Exact Arbitrary-Size Integer Math vs Float / Trap',
        englishParagraphs: [
          'Reading n = 10^9 and computing n * (n + 1) / 2 in Python produces an inaccurate float like 5.000000005e+17! Using // (integer floor division) preserves exact digits up to any size.',
          'Always verify whether a judge problem expects an exact integer vs floating decimal.',
        ],
        banglaParagraphs: [
          'n = 10^9 হলে n * (n + 1) / 2 লিখলে Python তাকে float বানিয়ে ফেলে এবং শেষের অঙ্কগুলো ভুল আসে!',
          'সঠিক উত্তর পেতে অবশ্যই // ব্যবহার করতে হবে যাতে ফলাফল শতভাগ নির্ভুল int থাকে।',
        ],
        memoryDiagram: `n=1000000000 -> n*(n+1)//2 = 500000000500000000 (Exact PyLong!)`,
        code: `import sys

raw = sys.stdin.read().strip()
if raw:
    n = int(raw)
    print(n * (n + 1) // 2)`,
        stdin: '1000000000',
        expectedOutput: '500000000500000000',
        lineByLine: [
          {
            lineNumber: 'Line 6',
            codeSnippet: 'n * (n + 1) // 2',
            whatItMeans: 'Exact arbitrary-precision integer division.',
            whyItIsThere: 'Single / turns result into imprecise 53-bit float!',
            ifDeletedError: 'Wrong Answer on n >= 10^8!',
          },
        ],
      },
      {
        id: 'python-ch-3-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Financial Exactness Using decimal.Decimal (No 0.1+0.2 Bug)',
        englishParagraphs: [
          'In binary float arithmetic, 0.1 + 0.2 evaluates to 0.30000000000000004! Financial systems avoid float and use decimal.Decimal built from strings.',
          'Constructing Decimal("0.1") keeps exact base-10 arithmetic down to configurable decimal digits.',
        ],
        banglaParagraphs: [
          'কম্পিউটারের সাধারণ ফ্লোট 0.1 + 0.2 যোগ করলে 0.30000000000000004 আসে! তাই ব্যাংকিং ও ই-কমার্স সফটওয়্যারে float ব্যবহার করা হয় না।',
          'Python-এর built-in decimal.Decimal মডিউল স্ট্রিং থেকে সংখ্যা নিয়ে শতভাগ নিখুঁত দশমিক হিসাব করে।',
        ],
        memoryDiagram: `float: 0.1+0.2 != 0.3 | Decimal("0.1")+Decimal("0.2") == Decimal("0.3")`,
        code: `from decimal import Decimal

a, b = input().split()
total = Decimal(a) + Decimal(b)
print(total)`,
        stdin: '0.1 0.2',
        expectedOutput: '0.3',
        lineByLine: [
          {
            lineNumber: 'Line 4',
            codeSnippet: 'Decimal(a) + Decimal(b)',
            whatItMeans: 'Base-10 exact decimal arithmetic without binary rounding error.',
            whyItIsThere: 'float("0.1") + float("0.2") prints 0.30000000000000004.',
            ifDeletedError: 'Tiny floating-point drift corrupts financial cents.',
          },
        ],
      },
      {
        id: 'python-ch-3-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Negative Floor Division Pitfall (-7 // 2 == -4) & Large Pow',
        englishParagraphs: [
          'Unlike C/C++/Java which truncate division toward zero (-7 / 2 == -3), Python floor-divides toward negative infinity (-7 // 2 == -4)! When rounding toward zero on negatives, use int(a / b) for small numbers or divide signs cleanly.',
          'Meanwhile, Python’s built-in pow(base, exp, mod) computes modular exponentiation in O(log exp) C-speed without overflowing!',
        ],
        banglaParagraphs: [
          'সতর্কতা: C/C++-এ -7 / 2 = -3 হয়, কিন্তু Python-এ -7 // 2 = -4 (নিচের পূর্ণসংখ্যা) হয়!',
          'এছাড়া বড় পাওয়ার মড বের করতে Python-এর বিল্ট-ইন pow(base, exp, mod) ফাংশন O(log exp) সময়ে কাজ করে।',
        ],
        memoryDiagram: `-7 // 2 = -4 | pow(2, 100000, 1000000007) -> O(log N) instant!`,
        code: `a, b, mod = map(int, input().split())
print(pow(a, b, mod))`,
        stdin: '2 100 1000000007',
        expectedOutput: '976371285',
        lineByLine: [
          {
            lineNumber: 'Line 2',
            codeSnippet: 'pow(a, b, mod)',
            whatItMeans: 'Built-in C-optimized modular exponentiation (a^b % mod).',
            whyItIsThere: 'Computing (a ** b) % mod first wastes giant RAM if b = 10^9!',
            ifDeletedError: 'Hangs or exhausts memory if using ** without 3rd arg.',
          },
        ],
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 1',
        codeSnippet: 'n * (n + 1) // 2',
        whatItMeans: 'Exact arbitrary-precision integer floor division.',
        whyItIsThere: 'Avoids 53-bit float truncation of single /.',
        ifDeletedError: 'Corrupt low digits for sums above 9×10^15.',
      },
      {
        lineNumber: 'Line 2',
        codeSnippet: 'pow(a, b, mod)',
        whatItMeans: 'Binary modular exponentiation in O(log b) time.',
        whyItIsThere: 'Never materializes giant intermediate a^b in RAM.',
        ifDeletedError: 'Memory/Time Limit Exceeded for large exponents.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'Read n = 10^9', memoryOrStack: 'n=1000000000 (PyLong)', note: 'Exact heap int' },
      { step: 2, state: 'Compute n * (n + 1)', memoryOrStack: 'prod=1000000001000000000', note: 'Auto-grows bits!' },
      { step: 3, state: 'Floor divide // 2', memoryOrStack: 'ans=500000000500000000', note: 'Zero float precision lost' },
      { step: 4, state: 'print(ans)', memoryOrStack: 'stdout="500000000500000000"', note: '100% exact' },
    ],
    harryBugTraps: [
      {
        title: 'Using / Instead of // on Huge Integers',
        brokenCode: 'n = 10**9; print(n * (n + 1) / 2) # prints 5.000000005e+17!',
        fixedCode: 'n = 10**9; print(n * (n + 1) // 2)',
        whyItBreaks: '/ always returns float, which only holds 53 bits (~15 decimal digits) of mantissa.',
      },
      {
        title: 'Using float for Exact Money Math (0.1 + 0.2)',
        brokenCode: 'print(0.1 + 0.2 == 0.3) # False!',
        fixedCode: 'from decimal import Decimal; print(Decimal("0.1") + Decimal("0.2") == Decimal("0.3"))',
        whyItBreaks: '0.1 cannot be represented finitely in binary.',
      },
      {
        title: 'Assuming Python // Rounds Toward Zero for Negatives',
        brokenCode: 'print(-7 // 2) # -4, NOT -3!',
        fixedCode: 'import math; print(math.trunc(-7 / 2))',
        whyItBreaks: 'Python floor division always rounds down toward -infinity.',
      },
    ],
    practiceSheet: [
      {
        id: 'python-ch-3-q1',
        difficulty: 'Easy',
        title: '1. Arbitrary-Precision Factorial / Power',
        prompt: 'Read int k and print 2 ** k exactly.',
        banglaHint: 'Python-এ 2 ** k যত বড়ই হোক ওভারফ্লো হয় না!',
        starterCode: 'k = int(input())\nprint(2 ** k)',
        sampleStdin: '100',
        expectedOutput: '1267650600228229401496703205376',
      },
      {
        id: 'python-ch-3-q2',
        difficulty: 'Easy',
        title: '2. Exact Integer Floor Average',
        prompt: 'Read a, b, c on one line and print exact integer floor average.',
        banglaHint: '// 3 ব্যবহার করে পূর্ণসংখ্যায় গড় বের করো।',
        starterCode: 'a, b, c = map(int, input().split())\nprint((a + b + c) // 3)',
        sampleStdin: '10 20 25',
        expectedOutput: '18',
      },
      {
        id: 'python-ch-3-q3',
        difficulty: 'Medium',
        title: '3. Exact Decimal Sum',
        prompt: 'Read two decimal strings and add them without binary float drift.',
        banglaHint: 'from decimal import Decimal ব্যবহার করো।',
        starterCode: 'from decimal import Decimal\na, b = input().split()\nprint(Decimal(a) + Decimal(b))',
        sampleStdin: '0.1 0.2',
        expectedOutput: '0.3',
      },
      {
        id: 'python-ch-3-q4',
        difficulty: 'Hard',
        title: '4. Fast Modular Power (a^b mod m)',
        prompt: 'Read a, b, m and output (a^b) % m using O(log b) modular power.',
        banglaHint: 'বিল্ট-ইন pow(a, b, m) ৩-আর্গুমেন্ট ফাংশন ব্যবহার করো।',
        starterCode: 'a, b, m = map(int, input().split())\nprint(pow(a, b, m))',
        sampleStdin: '3 1000000 1000000007',
        expectedOutput: '64935414',
      },
    ],
    miniBuild: {
      title: 'Python 3.13 Big-Int Summation Calculator',
      description: 'Computes exact sum 1..N up to billions without float loss.',
      banglaGoal: '// ডিভিশন ও Big-Int ব্যবহার করে কোটি কোটি সংখ্যার যোগফল বের করা।',
      combinesChapters: 'Ch 1–3',
      starterCode: `import sys

raw = sys.stdin.read().strip()
if raw:
    n = int(raw)
    print(n * (n + 1) // 2)`,
      sampleStdin: '1000000000',
      expectedOutput: '500000000500000000',
    },
    starterCode: `import sys

raw = sys.stdin.read().strip()
if raw:
    n = int(raw)
    print(n * (n + 1) // 2)`,
    sampleStdin: '1000000000',
    expectedSampleOutput: '500000000500000000',
    testCases: [
      { id: 'py3-t1', input: '1000000000', expectedOutput: '500000000500000000' },
      { id: 'py3-t2', input: '100', expectedOutput: '5050', isHidden: true },
    ],
  },

  4: {
    chapterNumber: 4,
    title: 'Python Chapter 4 (Python 3.13+): Arithmetic, Relational, Logical & Assignment Operators',
    banglaTitle: 'Python অধ্যায় ৪ (Python 3.13+): অ্যারিথমেটিক, রিলেশনাল, লজিক্যাল ও অ্যাসাইনমেন্ট অপারেটর',
    subtitle: 'Chained comparisons (1 <= x <= 10), logical and/or/not, walrus operator :=, identity (is vs ==), and positive modulo.',
    zeroIntuition: {
      plainEnglishStory:
        'Python makes condition expressions extraordinarily readable: chained inequalities like 10 <= x <= 99 work natively just as in algebra, English keywords (and, or, not) short-circuit safely left-to-right, and positive divisors yield non-negative remainders automatically (-3 % 5 == 2).\n\nThree common traps still catch learners: using ^ thinking it computes powers (it is XOR—use ** for powers!), confusing == (value equality) with is (object identity in RAM, which breaks silently for ints > 256), and using math.ceil(a / b) on huge integers instead of exact integer ceiling (a + b - 1) // b.',
      asciiFlowchart: `  [ x = 25 -> 10 <= x <= 50 ] --> True! (Native Python chaining)
  [ a = -3, m = 5 -> a % m ] --> 2 (Automatically positive!)`,
      pseudocode: [
        '1. READ integer x and bounds',
        '2. CHECK chained inequality low <= x <= high',
        '3. APPLY short-circuit logic and/or',
        '4. OUTPUT clean boolean or computed value',
      ],
      banglaZeroToHero: {
        analogyTitle: 'স্বাভাবিক গণিতের মতো কম্পারিজন ও পজিটিভ মড (%)',
        explanation:
          'C/C++-এ 10 <= x <= 50 লিখলে ভুল ফল দেয়, কিন্তু Python-এ ঠিক গণিতের খাতার মতোই চেইনড কম্পারিজন নিখুঁতভাবে কাজ করে! তাছাড়া ধনাত্মক ভাজক থাকলে Python-এর % অপারেটর কখনোই নেগেটিভ ভাগশেষ দেয় না—(-3) % 5 করলে সরাসরি +2 আসে। তবে তিনটি ফাঁদ থেকে সাবধান থাকতে হবে: প্রথমত, ^ মানে পাওয়ার নয় (বিটওয়াইজ XOR); পাওয়ারের জন্য ** লিখতে হবে। দ্বিতীয়ত, CPython ২৫৬ পর্যন্ত ছোট সংখ্যা ক্যাশ করে বলে ১০০ is ১০০ সত্য দেখায়, কিন্তু ১০০০ is ১০০০ মিথ্যা হয়! তাই মান তুলনায় সব সময় == লিখবে, আর কেবল None পরীক্ষা করতে is None দেবে। তৃতীয়ত, বড় সংখ্যার সিলিং ভাগের জন্য math.ceil(a/b)-এর বদলে নির্ভুল (a + b - 1) // b সূত্র এবং শর্তের ভেতর অ্যাসাইনমেন্ট করতে ওয়ালরাস := অপারেটর ব্যবহার করবে।',
        everydayExample:
          '== মানে দুজনের পকেটে সমান টাকা থাকা, আর is মানে দুজন আসলে একই মানুষ কি না—তাই সংখ্যা তুলনায় সর্বদা == দেবে, কেবল None চেক করতে is None দেবে।',
        keyTakeaways: [
          'Python-এ ** হলো ঘাত বা পাওয়ার অপারেটর (2 ** 10 == 1024)।',
          '== মান যাচাই করে; is মেমোরি ঠিকানা (Identity) যাচাই করে—সংখ্যায় কখনো is ব্যবহার করবে না!',
          'Walrus অপারেটর (:=) এক লাইনের ভেতরেই মান সেট করে ও শর্ত চেক করে।',
        ],
      },
    },
    topics: [
      {
        id: 'python-ch-4-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Arithmetic, Power (**), Modulo (%) & Chained Comparisons',
        englishParagraphs: [
          'Python’s ** operator performs exponentiation cleanly with right-to-left associativity, while % naturally returns non-negative remainders for positive divisors.',
          'Chained comparisons (lo <= x <= hi) evaluate short-circuiting left-to-right just like lo <= x and x <= hi.',
        ],
        banglaParagraphs: [
          'Python-এ ^ চিহ্ন পাওয়ার নয় (সেটি বিটওয়াইজ XOR!), বরং পাওয়ার বের করতে ** ব্যবহার করা হয়।',
          'একসাথে দুই প্রান্তের সীমা যাচাই করতে 10 <= x <= 50 সরাসরি লেখা যায়।',
        ],
        memoryDiagram: `x=25 -> (10 <= 25 <= 50) -> True | (-3 % 5) -> 2`,
        code: `x = 25
print(10 <= x <= 50, (-3) % 5, 2 ** 10)`,
        stdin: '',
        expectedOutput: 'True 2 1024',
        lineByLine: [
          {
            lineNumber: 'Line 2',
            codeSnippet: '10 <= x <= 50',
            whatItMeans: 'Evaluates 10 <= x and x <= 50 cleanly without repeating x.',
            whyItIsThere: 'Pythonic, readable range predicate.',
            ifDeletedError: 'Missing range validation result.',
          },
          {
            lineNumber: 'Line 2',
            codeSnippet: '2 ** 10',
            whatItMeans: 'Raises 2 to power 10 = 1024.',
            whyItIsThere: '^ in Python is bitwise XOR, not exponent!',
            ifDeletedError: '2 ^ 10 evaluates to 8 instead of 1024!',
          },
        ],
      },
      {
        id: 'python-ch-4-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Logical Short-Circuiting (and, or, not) & Safe Division',
        englishParagraphs: [
          'In Python, logical operators return the deciding operand rather than just True/False when used with fallback values (e.g., name or "Guest"), and boolean expressions safely short-circuit.',
          'Guarding b != 0 and a % b == 0 avoids ZeroDivisionError cleanly.',
        ],
        banglaParagraphs: [
          'and ও or অপারেটর শর্ট-সার্কিট নিয়ম মেনে চলে: প্রথম অংশেই ফলাফল নিশ্চিত হলে পরের অংশ আর চালায় না।',
          'তাই b != 0 and a % b == 0 লিখলে b শূন্য হলেও প্রোগ্রাম ক্র্যাশ করে না।',
        ],
        memoryDiagram: `stdin: "15 3" -> b!=0 (True) and a%b==0 (True) -> "YES"`,
        code: `a, b = map(int, input().split())
ok = (b != 0 and a % b == 0)
print("YES" if ok else "NO")`,
        stdin: '15 3',
        expectedOutput: 'YES',
        lineByLine: [
          {
            lineNumber: 'Line 2',
            codeSnippet: 'b != 0 and a % b == 0',
            whatItMeans: 'Short-circuits to False when b is 0 before executing %.',
            whyItIsThere: 'Prevents ZeroDivisionError crash.',
            ifDeletedError: 'Crashes if input denominator is 0.',
          },
        ],
      },
      {
        id: 'python-ch-4-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Augmented Assignments (+=, *=) & Ceiling Division',
        englishParagraphs: [
          'Python supports +=, -=, *=, //=, and **= augmented assignments for clean accumulator updates.',
          'Meanwhile, integer ceiling division (a + b - 1) // b computes exact page counts or bus seats without floating-point errors.',
        ],
        banglaParagraphs: [
          'অ্যাকিউমুলেটর বা স্কোর বাড়াতে += এবং *= ব্যবহার হয়। আর কোনো দশমিক ফ্লোট ছাড়াই সিলিং (উপরের পূর্ণসংখ্যা) বের করতে (a + b - 1) // b সূত্রটি ব্যবহার হয়।',
          'যেমন ১০ জন যাত্রীকে ৩ সিটের গাড়িতে বসাতে (10 + 3 - 1) // 3 = ৪টি গাড়ি লাগবে!',
        ],
        memoryDiagram: `items=10, cap=3 -> buses = (10 + 3 - 1) // 3 = 4`,
        code: `items, cap, fee = map(int, input().split())
vehicles = (items + cap - 1) // cap
total_cost = 0
total_cost += vehicles * fee
print(vehicles, total_cost)`,
        stdin: '10 3 50',
        expectedOutput: '4 200',
        lineByLine: [
          {
            lineNumber: 'Line 2',
            codeSnippet: '(items + cap - 1) // cap',
            whatItMeans: 'Exact integer ceiling division without math.ceil float inaccuracies.',
            whyItIsThere: 'math.ceil(a / b) loses precision when a > 10^15!',
            ifDeletedError: 'Wrong vehicle count on huge inputs.',
          },
        ],
      },
      {
        id: 'python-ch-4-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Walrus Operator (:=) & == vs is Identity Trap',
        englishParagraphs: [
          'CPython interns small ints [-5..256], fooling beginners into thinking `a is b` works for integers—until n=1000 returns False! Always use `==` for values and `is` strictly for `None`.',
          'The walrus operator `:=` assigns and evaluates a value cleanly inside an expression.',
        ],
        banglaParagraphs: [
          'সবচেয়ে অদ্ভুত Python ফাঁদ: ১০০ == ১০০ ও ১০০ is ১০০ দুটোই True দেয়, কিন্তু ১০০০ is ১০০০ দিলে False আসে! কারণ == মান যাচাই করে, আর is মেমোরি ঠিকানা দেখে। তাই কখনোই সংখ্যা তুলনায় is দেবে না!',
          'Walrus অপারেটর (:=) দিয়ে একইসাথে মান সেট ও শর্ত পরীক্ষা করা যায়।',
        ],
        memoryDiagram: `x = 1000; y = 1000 -> x == y (True) | x is y (False!)`,
        code: `import sys

if (line := sys.stdin.read().strip()):
    a, b = map(int, line.split())
    print(f"equal={a == b} sum={a + b}")`,
        stdin: '1000 1000',
        expectedOutput: 'equal=True sum=2000',
        lineByLine: [
          {
            lineNumber: 'Line 3',
            codeSnippet: 'if (line := sys.stdin.read().strip()):',
            whatItMeans: 'Assigns stripped stdin to line and checks truthiness in one step.',
            whyItIsThere: 'Clean walrus pattern guarding empty input.',
            ifDeletedError: 'Requires extra variable declaration line.',
          },
        ],
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 1',
        codeSnippet: 'lo <= x <= hi',
        whatItMeans: 'Native chained comparison validating range [lo, hi].',
        whyItIsThere: 'Clean, mathematically idiomatic Python syntax.',
        ifDeletedError: 'Must write lo <= x and x <= hi.',
      },
      {
        lineNumber: 'Line 2',
        codeSnippet: '(items + cap - 1) // cap',
        whatItMeans: 'Overflow-free integer ceiling formula.',
        whyItIsThere: 'math.ceil converts to float and corrupts large numbers.',
        ifDeletedError: 'Rounding errors above 10^15.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'Read items=10, cap=3, fee=50', memoryOrStack: 'items=10, cap=3, fee=50', note: 'Inputs parsed' },
      { step: 2, state: 'Compute ceiling', memoryOrStack: 'vehicles=(10+2)//3=4', note: 'Integer floor div' },
      { step: 3, state: 'Accumulate total_cost', memoryOrStack: 'total_cost=200', note: '+= updated' },
      { step: 4, state: 'print(4, 200)', memoryOrStack: 'stdout="4 200"', note: 'Done' },
    ],
    harryBugTraps: [
      {
        title: 'Using ^ Thinking It Means Power',
        brokenCode: 'print(2 ^ 3) # prints 1 (XOR), NOT 8!',
        fixedCode: 'print(2 ** 3)',
        whyItBreaks: '^ is bitwise XOR across C, C++, Java, JS, Rust, and Python.',
      },
      {
        title: 'Using `is` to Compare Numbers or Strings',
        brokenCode: 'a = 1000; b = 500 + 500; print(a is b) # False!',
        fixedCode: 'print(a == b)',
        whyItBreaks: 'is checks object memory address; small-int cache hides the bug below 257.',
      },
      {
        title: 'Using = Instead of == Inside Conditions',
        brokenCode: 'if x = 5: print("five")',
        fixedCode: 'if x == 5: print("five")',
        whyItBreaks: 'SyntaxError in Python (unless := walrus is intentional).',
      },
    ],
    practiceSheet: [
      {
        id: 'python-ch-4-q1',
        difficulty: 'Easy',
        title: '1. Range Check [10, 99]',
        prompt: 'Read int n and print "TWO-DIGIT" if 10 <= n <= 99 else "OTHER".',
        banglaHint: '10 <= n <= 99 চেইনড কম্পারিজন ব্যবহার করো।',
        starterCode: 'n = int(input())\nprint("TWO-DIGIT" if 10 <= n <= 99 else "OTHER")',
        sampleStdin: '42',
        expectedOutput: 'TWO-DIGIT',
      },
      {
        id: 'python-ch-4-q2',
        difficulty: 'Easy',
        title: '2. Integer Ceiling Boxes',
        prompt: 'Read n items and box size k; print minimum boxes using (n + k - 1) // k.',
        banglaHint: 'ফ্লোট এড়াতে (n + k - 1) // k ব্যবহার করো।',
        starterCode: 'n, k = map(int, input().split())\nprint((n + k - 1) // k)',
        sampleStdin: '17 5',
        expectedOutput: '4',
      },
      {
        id: 'python-ch-4-q3',
        difficulty: 'Medium',
        title: '3. Safe Modulo Guard',
        prompt: 'Read a and b; print a % b if b != 0 else "ZERO".',
        banglaHint: 'b != 0 চেক করে তারপর a % b করো।',
        starterCode: 'a, b = map(int, input().split())\nprint(a % b if b != 0 else "ZERO")',
        sampleStdin: '-3 5',
        expectedOutput: '2',
      },
      {
        id: 'python-ch-4-q4',
        difficulty: 'Hard',
        title: '4. Leap Year Predicate',
        prompt: 'Read year y and output "LEAP" or "COMMON".',
        banglaHint: '(y % 400 == 0) or (y % 4 == 0 and y % 100 != 0) যাচাই করো।',
        starterCode: 'y = int(input())\nprint("LEAP" if (y % 400 == 0 or (y % 4 == 0 and y % 100 != 0)) else "COMMON")',
        sampleStdin: '1900',
        expectedOutput: 'COMMON',
      },
    ],
    miniBuild: {
      title: 'Python 3.13 Fleet & Cost Calculator',
      description: 'Computes exact ceiling vehicle counts and compound cost totals without floats.',
      banglaGoal: 'লজিক্যাল ও সিলিং অপারেটর দিয়ে গাণিতিক হিসাব সম্পন্ন করা।',
      combinesChapters: 'Ch 1–4',
      starterCode: `items, cap, fee = map(int, input().split())
vehicles = (items + cap - 1) // cap
total_cost = 0
total_cost += vehicles * fee
print(vehicles, total_cost)`,
      sampleStdin: '10 3 50',
      expectedOutput: '4 200',
    },
    starterCode: `items, cap, fee = map(int, input().split())
vehicles = (items + cap - 1) // cap
total_cost = 0
total_cost += vehicles * fee
print(vehicles, total_cost)`,
    sampleStdin: '10 3 50',
    expectedSampleOutput: '4 200',
    testCases: [
      { id: 'py4-t1', input: '10 3 50', expectedOutput: '4 200' },
      { id: 'py4-t2', input: '9 3 50', expectedOutput: '3 150', isHidden: true },
    ],
  },

  5: {
    chapterNumber: 5,
    title: 'Python Chapter 5 (Python 3.13+): Bitwise Operators & Binary Tricks',
    banglaTitle: 'Python অধ্যায় ৫ (Python 3.13+): বিটওয়াইজ অপারেটর ও int.bit_count()',
    subtitle: 'Bitwise &, |, ^, <<, >>, Python 3.10+ n.bit_count(), 64+ bit arbitrary masks, and O(1) XOR pairing.',
    zeroIntuition: {
      plainEnglishStory:
        'Because Python integers expand dynamically to arbitrary bit widths, bitmasks like 1 << 200 execute natively without 32-bit or 64-bit overflow limits! Since Python 3.10+, every integer also exposes n.bit_count()—a C-accelerated method counting active 1-bits without allocating strings via bin(n).count("1").\n\nOne crucial twist comes from infinite two-complement sign extension: bitwise NOT (~x) evaluates to -(x + 1), so ~5 yields -6 instead of a small positive mask. Whenever simulating fixed hardware bit widths, mask complements explicitly with & ((1 << width) - 1), and always wrap (n & 1) == 0 in parentheses.',
      asciiFlowchart: `  [ n = 29 -> 0b11101 ]
        |
        +--> n.bit_count()        --> 4 (Instant C popcount!)
        +--> (n >> 1) & 1         --> 0 (Bit 1 status)
        +--> n > 0 and (n&(n-1))==0 --> False`,
      pseudocode: [
        '1. READ integer n',
        '2. COUNT active bits via n.bit_count()',
        '3. CHECK power-of-two via n > 0 and (n & (n - 1)) == 0',
        '4. OUTPUT binary insights',
      ],
      banglaZeroToHero: {
        analogyTitle: 'অসীম বিটমাস্ক ও bit_count() শর্টকাট',
        explanation:
          'C বা Java-তে যেমন ৩২-বিট বা ৬৪-বিট পেরোলেই ১ << ক বিটমাস্ক ওভারফ্লো হয়ে যায়, Python-এ ইনটিজারের কোনো বিট-সীমা নেই—১ << ২০০ অনায়াসেই কাজ করে! তাছাড়া আধুনিক Python 3.10+ এ প্রতিটি পূর্ণসংখ্যার নিজস্ব n.bit_count() মেথড রয়েছে, যা ধীরগতির bin(n).count("1") স্ট্রিং বানানো ছাড়াই সরাসরি C-স্পিডে কতগুলো ১-বিট আছে গুনে দেয়। তবে একটি গুরুত্বপূর্ণ বিষয় মনে রাখতে হবে: Python সংখ্যা অসীম বিটের হওয়ায় ~x (বিটওয়াইজ NOT) করলে -(x + 1) পাওয়া যায় (যেমন ~5 = -6)। নির্দিষ্ট প্রস্থের বিট উল্টাতে চাইলে শেষে & ((1 << w) - 1) মাস্ক লাগাতে হয়। পাশাপাশি জোড়-বিজোড় পরীক্ষা (n & 1) ও জোড়াবিহীন ইউনিক উপাদান খুঁজতে XOR (^) কনটেস্টে দারুণ কার্যকর!',
        everydayExample:
          'ফ্যান ও লাইটের সব সুইচ একসাথে নিয়ন্ত্রণ করতে একটি সংখ্যার বিটগুলো অন/অফ করলেই চলে—নতুন ভ্যারিয়েবল লাগে না।',
        keyTakeaways: [
          'n.bit_count() হলো Python 3.10+ এর সুপারফাস্ট C পপ-কাউন্ট মেথড।',
          '~x করলে Python-এ -(x + 1) পাওয়া যায় কারণ Python-এ সাইনড আনলিমিটেড বিট রয়েছে!',
          'সবসময় (n & 1) == 0 বন্ধনী দিয়ে লিখবে।',
        ],
      },
    },
    topics: [
      {
        id: 'python-ch-5-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Core Bitwise Ops (&, |, ^, <<, >>) & bin() Inspection',
        englishParagraphs: [
          'Bitwise &, |, ^, <<, and >> operate bit-by-bit across arbitrary-size Python ints.',
          'Formatting with :04b prints clean 4-bit zero-padded binary representations.',
        ],
        banglaParagraphs: [
          'বাইনারি রূপ চোখে দেখার জন্য f"{val:04b}" ফরম্যাটটি দারুণ কাজের—তাতে বিট অপারেশন পরিষ্কার বোঝা যায়।',
          'নিচের কোডে ৬ এবং ৩-এর ওপর AND, OR, XOR এবং শিফট করে দেখানো হয়েছে।',
        ],
        memoryDiagram: `6(0110) & 3(0011) = 2(0010) | 6 ^ 3 = 5(0101)`,
        code: `a, b = 6, 3
print(a & b, a | b, a ^ b, f"{a ^ b:04b}")`,
        stdin: '',
        expectedOutput: '2 7 5 0101',
        lineByLine: [
          {
            lineNumber: 'Line 2',
            codeSnippet: 'f"{a ^ b:04b}"',
            whatItMeans: 'Formats integer 5 as 4-bit padded binary "0101".',
            whyItIsThere: 'Visualizes underlying CPU bit patterns.',
            ifDeletedError: 'Binary representation omitted.',
          },
        ],
      },
      {
        id: 'python-ch-5-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Test, Set & Toggle the k-th Bit',
        englishParagraphs: [
          'In Python, (n >> k) & 1 extracts bit k, n | (1 << k) turns bit k on, and n ^ (1 << k) toggles bit k.',
          'Because Python ints never overflow, (1 << k) works reliably even when k >= 64.',
        ],
        banglaParagraphs: [
          'যেকোনো বড় k-এর জন্য Python-এ 1 << k নিরাপদ—কোনো ওভারফ্লো হয় না।',
          'ইনপুট থেকে n ও k পড়ে আমরা k-তম বিটের অবস্থা ও সেট করা মান বের করছি।',
        ],
        memoryDiagram: `n=5(0101), k=1 -> bit=0 | toggled=7(0111)`,
        code: `n, k = map(int, input().split())
print(f"bit={(n >> k) & 1} toggled={n ^ (1 << k)}")`,
        stdin: '5 1',
        expectedOutput: 'bit=0 toggled=7',
        lineByLine: [
          {
            lineNumber: 'Line 2',
            codeSnippet: 'n ^ (1 << k)',
            whatItMeans: 'Flips k-th bit: 0 becomes 1, 1 becomes 0.',
            whyItIsThere: 'Single-operation state toggling.',
            ifDeletedError: 'Cannot invert selected bit.',
          },
        ],
      },
      {
        id: 'python-ch-5-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Python n.bit_count() & Power-of-Two Analyzer',
        englishParagraphs: [
          'n.bit_count() counts 1-bits in C speed directly on the integer object without creating intermediate binary strings.',
          'Combined with n > 0 and (n & (n - 1)) == 0, you can inspect bit profiles of huge flags instantly.',
        ],
        banglaParagraphs: [
          'n.bit_count() ব্যবহার করে ১ সেকেন্ডেই লক্ষ সংখ্যার ১-বিট গণনা করা সম্ভব।',
          'পাশাপাশি সংখ্যাটি ২-এর ঘাত কি না তাও ১ লাইনে নির্ণয় করা হয়েছে।',
        ],
        memoryDiagram: `n=29 -> 0b11101 -> bit_count=4 | pow2=False`,
        code: `n = int(input().strip())
is_pow2 = n > 0 and (n & (n - 1)) == 0
print(f"ones={n.bit_count()} pow2={int(is_pow2)}")`,
        stdin: '29',
        expectedOutput: 'ones=4 pow2=0',
        lineByLine: [
          {
            lineNumber: 'Line 3',
            codeSnippet: 'n.bit_count()',
            whatItMeans: 'Native CPython 3.10+ method returning count of 1-bits.',
            whyItIsThere: 'Faster and cleaner than bin(n).count("1").',
            ifDeletedError: 'No bit count reported.',
          },
        ],
      },
      {
        id: 'python-ch-5-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'XOR Unique Element & Infinite ~x Sign Trap',
        englishParagraphs: [
          'Because Python integers have infinite virtual sign-extension bits, ~x equals -(x + 1), NOT a 32-bit unsigned flip! Mask with `& ((1 << width) - 1)` when simulating fixed-width registers.',
          'Meanwhile, XORing a stream of numbers isolates the single unpaired number in O(1) extra space.',
        ],
        banglaParagraphs: [
          'গুরুত্বপূর্ণ ফাঁদ: Python-এ ~5 করলে উত্তর -(5+1) = -6 আসে! কারণ Python-এর কোনো নির্দিষ্ট ৩২-বিট সীমা নেই।',
          'নিচের CP সমাধানটি functools.reduce বা সাধারণ লুপ দিয়ে জোড়াবিহীন ইউনিক সংখ্যাটি O(1) মেমোরিতে বের করে।',
        ],
        memoryDiagram: `acc = 0 -> ^= 9 ^= 3 ^= 7 ^= 3 ^= 9 -> acc = 7`,
        code: `import sys

tokens = list(map(int, sys.stdin.read().split()))
if tokens:
    ans = 0
    for x in tokens[1:]:
        ans ^= x
    print(ans)`,
        stdin: '5\n9 3 7 3 9',
        expectedOutput: '7',
        lineByLine: [
          {
            lineNumber: 'Line 7',
            codeSnippet: 'ans ^= x',
            whatItMeans: 'Accumulates XOR across all numbers; duplicates cancel to 0.',
            whyItIsThere: 'O(n) time and O(1) memory solution for LeetCode/CF Single Number.',
            ifDeletedError: 'Always prints 0.',
          },
        ],
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 1',
        codeSnippet: 'n.bit_count()',
        whatItMeans: 'Counts 1-bits natively in C.',
        whyItIsThere: 'Avoids slow string allocation of bin(n).',
        ifDeletedError: 'Manual loop or string count required.',
      },
      {
        lineNumber: 'Line 2',
        codeSnippet: 'n > 0 and (n & (n - 1)) == 0',
        whatItMeans: 'Clears lowest 1-bit to test exact power of two.',
        whyItIsThere: 'O(1) constant-time check.',
        ifDeletedError: 'Slower loop division needed.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'Read tokens[1:]', memoryOrStack: 'arr=[9,3,7,3,9], ans=0', note: 'Count skipped' },
      { step: 2, state: 'XOR 9, 3, 7', memoryOrStack: 'ans=9^3^7=13', note: 'Accumulates bits' },
      { step: 3, state: 'XOR 3, 9', memoryOrStack: 'ans=13^3^9=7', note: '3s and 9s cancel cleanly' },
      { step: 4, state: 'print(ans)', memoryOrStack: 'stdout="7"', note: 'Unique item isolated' },
    ],
    harryBugTraps: [
      {
        title: 'Expecting ~x to Give Positive Bitwise Complement',
        brokenCode: 'print(~5) # prints -6, not 2 in 3-bit unsigned!',
        fixedCode: 'print((~5) & 0b111) # mask to target bit width!',
        whyItBreaks: 'Python ints act as infinite two-complement numbers, so ~x is -(x + 1).',
      },
      {
        title: 'Using bin(n).count("1") Inside Tight Loops',
        brokenCode: 'c = bin(n).count("1")',
        fixedCode: 'c = n.bit_count()',
        whyItBreaks: 'Allocating strings 10^5 times slows Python loops significantly.',
      },
      {
        title: 'Precedence Trap: x & 1 == 0',
        brokenCode: 'if x & 1 == 0: ...',
        fixedCode: 'if (x & 1) == 0: ...',
        whyItBreaks: '== binds tighter than & in Python too!',
      },
    ],
    practiceSheet: [
      {
        id: 'python-ch-5-q1',
        difficulty: 'Easy',
        title: '1. Odd or Even via & 1',
        prompt: 'Read int n and print "ODD" if (n & 1) else "EVEN".',
        banglaHint: '(n & 1) সত্য হলে বিজোড়, নইলে জোড়।',
        starterCode: 'n = int(input())\nprint("ODD" if (n & 1) else "EVEN")',
        sampleStdin: '31',
        expectedOutput: 'ODD',
      },
      {
        id: 'python-ch-5-q2',
        difficulty: 'Easy',
        title: '2. Population Count',
        prompt: 'Read non-negative int n and output n.bit_count().',
        banglaHint: 'n.bit_count() কল করো।',
        starterCode: 'n = int(input())\nprint(n.bit_count())',
        sampleStdin: '255',
        expectedOutput: '8',
      },
      {
        id: 'python-ch-5-q3',
        difficulty: 'Medium',
        title: '3. Arbitrary-Size 2^k Mask',
        prompt: 'Read k and print 1 << k (even for k >= 100).',
        banglaHint: '1 << k ব্যবহার করো—Python-এ কোনো ওভারফ্লো নেই।',
        starterCode: 'k = int(input())\nprint(1 << k)',
        sampleStdin: '50',
        expectedOutput: '1125899906842624',
      },
      {
        id: 'python-ch-5-q4',
        difficulty: 'Hard',
        title: '4. Find Single Unique Element (XOR)',
        prompt: 'Read n and n integers where pairs repeat; output the unpaired integer.',
        banglaHint: 'সব সংখ্যা ^= দিয়ে XOR করো।',
        starterCode: 'import sys\nt = list(map(int, sys.stdin.read().split()))\nans = 0\nfor x in t[1:]: ans ^= x\nprint(ans)',
        sampleStdin: '5\n12 5 8 5 12',
        expectedOutput: '8',
      },
    ],
    miniBuild: {
      title: 'Milestone Merger 1 (Python Ch 1–5): Python 3.13 Bit-Count & Power Checker',
      description: 'Inspects active 1-bits and power-of-two properties cleanly.',
      banglaGoal: 'n.bit_count() দিয়ে বাইনারি বৈশিষ্ট্য বিশ্লেষণ করা।',
      combinesChapters: 'Ch 1–5',
      starterCode: `n = int(input().strip())
is_pow2 = n > 0 and (n & (n - 1)) == 0
print(f"ones={n.bit_count()} pow2={int(is_pow2)}")`,
      sampleStdin: '29',
      expectedOutput: 'ones=4 pow2=0',
    },
    starterCode: `n = int(input().strip())
is_pow2 = n > 0 and (n & (n - 1)) == 0
print(f"ones={n.bit_count()} pow2={int(is_pow2)}")`,
    sampleStdin: '29',
    expectedSampleOutput: 'ones=4 pow2=0',
    testCases: [
      { id: 'py5-t1', input: '29', expectedOutput: 'ones=4 pow2=0' },
      { id: 'py5-t2', input: '128', expectedOutput: 'ones=1 pow2=1', isHidden: true },
    ],
  },
  ...LESSONS_PYTHON_P2,
  ...LESSONS_PYTHON_P3,
  ...LESSONS_PYTHON_P4,
  ...LESSONS_PYTHON_P5,
};
