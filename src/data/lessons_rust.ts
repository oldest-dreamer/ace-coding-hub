import type { AtomicLessonOverride } from './atomicLessonTypes';
import { LESSONS_RUST_P2 } from './lessons_rust_p2';
import { LESSONS_RUST_P3 } from './lessons_rust_p3';
import { LESSONS_RUST_P4 } from './lessons_rust_p4';
import { LESSONS_RUST_P5 } from './lessons_rust_p5';

export const LESSONS_RUST: Record<number, AtomicLessonOverride> = {
  1: {
    chapterNumber: 1,
    title: 'Rust Chapter 1 (Rust 2024): rustc/LLVM Pipeline & Safe Entry Point',
    banglaTitle: 'Rust অধ্যায় ১ (Rust 2024): rustc/LLVM পাইপলাইন ও প্রথম প্রোগ্রাম',
    subtitle: 'How rustc compiles via MIR borrow-checking + LLVM into C-speed zero-GC binaries.',
    zeroIntuition: {
      plainEnglishStory:
        'Rust delivers C++ bare-metal speed without segmentation faults, data races, or a runtime garbage collector! Before rustc hands your source code to LLVM for native machine-code emission, it lowers AST into HIR and MIR so the Borrow Checker can mathematically prove ownership, lifetimes, and aliasing safety at compile time.\n\nExecution begins cleanly inside fn main(), which implicitly exits with status code 0 when it finishes returning unit (). Macros such as println!() carry a trailing exclamation mark (!) because rustc expands them during compilation, verifying every `{}` placeholder against your argument list before a single CPU instruction is ever built.',
      asciiFlowchart: `  [ main.rs ] ---> [ rustc Frontend -> MIR Borrow Checker (Zero-bug check!) ]
        |
        v (LLVM Backend -> Native Machine Opcodes)
  [ Binary ] ---> [ fn main() ] ---> [ println!(...) macro ] ---> ( stdout )`,
      pseudocode: [
        '1. DEFINE fn main() (returns unit () implicitly on clean exit)',
        '2. READ stdin safely into a mutable String buffer',
        '3. EMIT formatted text using println! macro (notice the !)',
      ],
      banglaZeroToHero: {
        analogyTitle: 'শূন্য-ক্র্যাশ সুপারকার ও কড়াকড়ি নিরাপত্তা পরিদর্শক',
        explanation:
          'C/C++-এ প্রোগ্রামের গতি প্রচণ্ড, কিন্তু সামান্য ভুলেই মেমোরি ক্র্যাশ বা ড্যাংলিং পয়েন্টার তৈরি হয়। Rust তোমাকে C++-এর সমান রকেট গতি দেয়, কিন্তু কোনো গার্বেজ কালেক্টর ছাড়াই! কোড রান করার আগেই rustc-এর Borrow Checker পুরো প্রোগ্রামের মালিকানা (Ownership) ও লাইফটাইম গাণিতিকভাবে যাচাই করে নিশ্চিত করে যে কোনো অবৈধ মেমোরি অ্যাক্সেস নেই। প্রোগ্রাম শুরু হয় fn main() থেকে, আর C++-এর মতো আলাদা return 0 লেখার দরকার পড়ে না। লক্ষ্য করবে println! ও format!-এর শেষে একটি বিস্ময়সূচক চিহ্ন (!) আছে—এর মানে এগুলো সাধারণ ফাংশন নয়, বরং কম্পাইল-টাইম Rust ম্যাক্রো যা প্রিন্ট করার আগেই {} প্লেসহোল্ডারের সংখ্যা মিলিয়ে দেখে। শুরুতেই let ও let mut-এর পার্থক্য বুঝে নিলে বাকি সব অধ্যায় অনেক সহজ হয়ে যাবে!',
        everydayExample:
          'কারখানা থেকে গাড়ি বেরোনোর আগেই রোবট স্ক্যানার ১০০% নাট-বল্টু পরীক্ষা করে নেয়, তাই রাস্তায় চাকা খুলে পড়ে না!',
        keyTakeaways: [
          'println!() এবং format!() হলো ম্যাক্রো, তাই নামের শেষে ! থাকে।',
          'Rust-এ ভ্যারিয়েবল ডিফল্টভাবে অপরিবর্তনীয় (immutable)—বদলাতে চাইলে let mut লিখতে হয়।',
          'fn main() থেকে আলাদা return 0 লেখার দরকার পড়ে না।',
        ],
      },
    },
    topics: [
      {
        id: 'rust-ch-1-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Minimal Rust 2024 Program & println! Macro',
        englishParagraphs: [
          'Every Rust executable starts in fn main(). The println! macro performs compile-time format-string verification: if you pass 1 argument for 2 `{}` placeholders, rustc refuses to compile!',
        ],
        banglaParagraphs: [
          'Rust-এ `{}` প্লেসহোল্ডারের সংখ্যা আর আর্গুমেন্টের সংখ্যা না মিললে কোড কম্পাইলই হয় না—এটাই কম্পাইল-টাইম নিরাপত্তার প্রথম নমুনা!',
        ],
        memoryDiagram: `Static binary -> fn main() -> println! macro -> fd 1 stdout`,
        code: `fn main() {
    let edition = 2024;
    println!("Hello, Rust {} World!", edition);
}`,
        stdin: '',
        expectedOutput: 'Hello, Rust 2024 World!',
        lineByLine: [
          {
            lineNumber: 'Line 1',
            codeSnippet: 'fn main() {',
            whatItMeans: 'Program entry function returning unit ().',
            whyItIsThere: 'OS jumps here at process startup.',
            ifDeletedError: 'Compile error: main function not found.',
          },
          {
            lineNumber: 'Line 3',
            codeSnippet: 'println!("Hello, Rust {} World!", edition);',
            whatItMeans: 'Type-checked macro printing formatted line + newline.',
            whyItIsThere: 'Compile-time validates placeholder count.',
            ifDeletedError: 'Empty stdout.',
          },
        ],
      },
      {
        id: 'rust-ch-1-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Reading All Tokens Safely With io::stdin().read_to_string',
        englishParagraphs: [
          'Reading stdin via read_to_string(&mut buf) + split_whitespace() is fast, ergonomic, and immune to trailing spaces or arbitrary line breaks.',
        ],
        banglaParagraphs: [
          'stdin-এর সব লেখা একবারে একটি String বাফারে পড়ে split_whitespace() করলে খুব সহজে নাম ও সংখ্যা আলাদা করা যায়।',
        ],
        memoryDiagram: `Heap String buf="Argon 21" -> split_whitespace() -> parse::<i32>()`,
        code: `use std::io::{self, Read};

fn main() {
    let mut buf = String::new();
    io::stdin().read_to_string(&mut buf).unwrap();
    let mut it = buf.split_whitespace();
    if let (Some(name), Some(s)) = (it.next(), it.next()) {
        let val: i32 = s.parse().unwrap_or(0);
        println!("Coder {} scored {}", name, val * 2);
    }
}`,
        stdin: 'Argon 21',
        expectedOutput: 'Coder Argon scored 42',
        lineByLine: [
          {
            lineNumber: 'Line 4',
            codeSnippet: 'let mut buf = String::new();',
            whatItMeans: 'Allocates mutable growable UTF-8 buffer on heap.',
            whyItIsThere: 'Required by read_to_string(&mut buf).',
            ifDeletedError: 'Compile error: cannot borrow immutable local variable as mutable.',
          },
        ],
      },
      {
        id: 'rust-ch-1-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Compile-Time Memory Audit With size_of::<T>()',
        englishParagraphs: [
          'Zero-overhead systems engineers inspect std::mem::size_of::<T>() to verify compact stack layouts for structs and integers.',
        ],
        banglaParagraphs: [
          'সিস্টেম প্রোগ্রামিংয়ে প্রতিটি টাইপ ঠিক কত বাইট মেমোরি নিচ্ছে তা size_of দিয়ে যাচাই করা যায়।',
        ],
        memoryDiagram: `size_of::<i32>()=4B | size_of::<i64>()=8B | bool=1B`,
        code: `use std::mem::size_of;

fn main() {
    let ready: bool = true;
    println!("Ready: {} | i32={}B i64={}B", ready, size_of::<i32>(), size_of::<i64>());
}`,
        stdin: '',
        expectedOutput: 'Ready: true | i32=4B i64=8B',
        lineByLine: [
          {
            lineNumber: 'Line 5',
            codeSnippet: 'size_of::<i32>()',
            whatItMeans: 'Const compile-time size evaluation in bytes.',
            whyItIsThere: 'Verifies exact stack footprint with zero runtime cost.',
            ifDeletedError: 'Missing format arguments.',
          },
        ],
      },
      {
        id: 'rust-ch-1-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'EOF Pair Iterator (Codeforces Idiom)',
        englishParagraphs: [
          'Because it.next() returns Option<&str>, matching `(Some(x), Some(y))` in a while-let loop cleanly consumes pairs until EOF without panicking on trailing whitespace.',
        ],
        banglaParagraphs: [
          'while let (Some(a), Some(b)) = (it.next(), it.next()) প্যাটার্নটি ইনপুট শেষ না হওয়া পর্যন্ত কোনো প্যানিক ছাড়াই প্রতিটি জোড়া প্রসেস করে।',
        ],
        memoryDiagram: `while let (Some, Some) -> 7\\n -> 30\\n -> None stops loop`,
        code: `use std::io::{self, Read};

fn main() {
    let mut buf = String::new();
    io::stdin().read_to_string(&mut buf).unwrap();
    let mut it = buf.split_whitespace();
    while let (Some(a), Some(b)) = (it.next(), it.next()) {
        let x: i64 = a.parse().unwrap();
        let y: i64 = b.parse().unwrap();
        println!("{}", x + y);
    }
}`,
        stdin: '3 4\n10 20',
        expectedOutput: '7\n30',
        lineByLine: [
          {
            lineNumber: 'Line 7',
            codeSnippet: 'while let (Some(a), Some(b)) = (it.next(), it.next())',
            whatItMeans: 'Loops cleanly while token pairs remain in stdin.',
            whyItIsThere: 'Handles arbitrary newlines and EOF safely.',
            ifDeletedError: 'Cannot handle variable test case counts.',
          },
        ],
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 1',
        codeSnippet: 'use std::io::{self, Read};',
        whatItMeans: 'Imports stdin stream traits into scope.',
        whyItIsThere: 'Needed for read_to_string.',
        ifDeletedError: 'Compile error: no method named read_to_string.',
      },
      {
        lineNumber: 'Line 2',
        codeSnippet: 'let mut buf = String::new();',
        whatItMeans: 'Mutable heap-allocated UTF-8 string.',
        whyItIsThere: 'Rust requires explicit mut to modify variables.',
        ifDeletedError: 'Borrow error when mutating buf.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'Allocate buf', memoryOrStack: 'String ptr/len/cap', note: 'Empty buffer on stack/heap' },
      { step: 2, state: 'read_to_string(&mut buf)', memoryOrStack: 'buf="Argon 42"', note: 'Reads entire stdin once' },
      { step: 3, state: 'parse val = 42', memoryOrStack: 'val: i32 = 42', note: 'Result checked via unwrap_or' },
      { step: 4, state: 'println!', memoryOrStack: 'stdout', note: 'Outputs Welcome, Argon! Score: 84' },
    ],
    harryBugTraps: [
      {
        title: 'Forgetting mut Keyword on Mutable Variables',
        brokenCode: 'let x = 5; x += 1; // Compile error!',
        fixedCode: 'let mut x = 5; x += 1;',
        whyItBreaks: 'Rust bindings are immutable by default for safety.',
      },
      {
        title: 'Forgetting ! on println!()',
        brokenCode: 'println("Hello"); // Compile error!',
        fixedCode: 'println!("Hello");',
        whyItBreaks: 'println! is a macro, not a plain function.',
      },
      {
        title: 'Calling .parse() Without Type Annotation',
        brokenCode: 'let x = "42".parse().unwrap(); // Rust asks: parse into WHAT type?',
        fixedCode: 'let x: i64 = "42".parse().unwrap();',
        whyItBreaks: 'str::parse is generic over target types and needs inference or explicit `: i64`.',
      },
    ],
    practiceSheet: [
      {
        id: 'rust-ch-1-q1',
        difficulty: 'Easy',
        title: 'Rust 2024 Greeting',
        prompt: 'Print "ArgonCode Rust Ready" using println!.',
        banglaHint: 'println!("ArgonCode Rust Ready"); ব্যবহার করো।',
        starterCode: `fn main() {\n    println!("ArgonCode Rust Ready");\n}`,
        sampleStdin: '',
        expectedOutput: 'ArgonCode Rust Ready',
      },
      {
        id: 'rust-ch-1-q2',
        difficulty: 'Easy',
        title: 'Two-Token Reader',
        prompt: 'Read city and population and output "<city>: <pop>".',
        banglaHint: 'split_whitespace() ব্যবহার করো।',
        starterCode: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n    let mut it = s.split_whitespace();\n    if let (Some(c), Some(p)) = (it.next(), it.next()) {\n        println!("{}: {}", c, p);\n    }\n}`,
        sampleStdin: 'Khulna 420',
        expectedOutput: 'Khulna: 420',
      },
      {
        id: 'rust-ch-1-q3',
        difficulty: 'Medium',
        title: 'EOF Pair Sum Loop',
        prompt: 'Read pairs of i64 numbers until EOF and print their sum per line.',
        banglaHint: 'while let (Some(a), Some(b)) লুপ চালাও।',
        starterCode: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n    let mut it = s.split_whitespace();\n    while let (Some(a), Some(b)) = (it.next(), it.next()) {\n        let x: i64 = a.parse().unwrap();\n        let y: i64 = b.parse().unwrap();\n        println!("{}", x + y);\n    }\n}`,
        sampleStdin: '5 7\n10 25',
        expectedOutput: '12\n35',
      },
      {
        id: 'rust-ch-1-q4',
        difficulty: 'Medium',
        title: 'Byte Width Audit',
        prompt: 'Print "bytes=4/8" using std::mem::size_of::<i32>() and size_of::<i64>().',
        banglaHint: 'std::mem::size_of ব্যবহার করো।',
        starterCode: `use std::mem::size_of;\nfn main() {\n    println!("bytes={}/{}", size_of::<i32>(), size_of::<i64>());\n}`,
        sampleStdin: '',
        expectedOutput: 'bytes=4/8',
      },
    ],
    miniBuild: {
      title: 'Rust Mini Build: Safe Score Greeter',
      description: 'Read name and score safely from stdin and print doubled result cleanly.',
      banglaGoal: 'Rust-এ নিরাপদে ইনপুট পড়ে দ্বিগুণ স্কোর প্রিন্ট করা।',
      combinesChapters: 'Ch 1',
      starterCode: `use std::io::{self, Read};

fn main() {
    let mut buf = String::new();
    io::stdin().read_to_string(&mut buf).unwrap();
    let mut it = buf.split_whitespace();
    if let (Some(name), Some(s)) = (it.next(), it.next()) {
        let score: i32 = s.parse().unwrap_or(0);
        println!("Welcome, {}! Score: {}", name, score * 2);
    }
}`,
      sampleStdin: 'Argon 42',
      expectedOutput: 'Welcome, Argon! Score: 84',
    },
    starterCode: `use std::io::{self, Read};

fn main() {
    let mut buf = String::new();
    io::stdin().read_to_string(&mut buf).unwrap();
    let mut it = buf.split_whitespace();
    if let (Some(name), Some(s)) = (it.next(), it.next()) {
        let score: i32 = s.parse().unwrap_or(0);
        println!("Welcome, {}! Score: {}", name, score * 2);
    }
}`,
    sampleStdin: 'Argon 42',
    expectedSampleOutput: 'Welcome, Argon! Score: 84',
    testCases: [
      { id: 'rust-c1-t1', input: 'Argon 42', expectedOutput: 'Welcome, Argon! Score: 84' },
      { id: 'rust-c1-t2', input: 'Dhaka 10', expectedOutput: 'Welcome, Dhaka! Score: 20', isHidden: true },
    ],
  },

  2: {
    chapterNumber: 2,
    title: 'Rust Chapter 2 (Rust 2024): Buffered BufWriter I/O, Format Specifiers & Escapes',
    banglaTitle: 'Rust অধ্যায় ২ (Rust 2024): BufWriter ফাস্ট I/O, ফরম্যাটিং ও এস্কেপ',
    subtitle: 'Preventing println! lock-flush overhead with BufWriter<StdoutLock>, {:.2} decimals, and alignment {:<8}.',
    zeroIntuition: {
      plainEnglishStory:
        'Every time you invoke println!() in Rust, the standard library acquires a global mutex lock on stdout and flushes on every newline—safe across threads, yet surprisingly slow when emitting 200,000 contest lines! Wrapping io::stdout().lock() inside BufWriter holds that lock once and batches 64 KB chunks into minimal OS write syscalls, dropping output latency from seconds to ~10ms.\n\nFor reading input, slurping stdin once with io::stdin().read_to_string(&mut buf) + split_whitespace() avoids slow per-line heap allocations, while Rust format specifiers ({:.2}, {:<8}, {:>4}) guarantee zero-ambiguity decimals and aligned columns checked at compile time.',
      asciiFlowchart: `  200,000 x println!()      ---> 200k mutex locks + line flushes (Slow!)
  BufWriter(stdout().lock()) ---> 1 lock + 64KB buffer batching (Blazing fast!)`,
      pseudocode: [
        '1. SLURP stdin once with read_to_string into String',
        '2. LOCK stdout inside BufWriter::new(io::stdout().lock())',
        '3. FORMAT fixed decimals with {:.2} and width padding with {:<6}',
      ],
      banglaZeroToHero: {
        analogyTitle: 'BufWriter: তালা একবার খুলে একসাথে ট্রাক ভর্তি ডেলিভারি',
        explanation:
          'Rust-এ println! প্রতিবার কল হলে থ্রেড নিরাপত্তার জন্য stdout-এর মিউটেক্স তালা খোলে, লাইন লেখে, তারপর ফ্লাশ করে তালা বন্ধ করে। সাধারণ ২-১০ লাইনের জন্য এটি দুর্দান্ত, কিন্তু Codeforces-এ ২ লক্ষ লাইনের আউটপুট প্রিন্ট করতে গেলে এই বারবার তালা খোলা-বন্ধেই TLE চলে আসতে পারে! তাই প্রতিযোগিতামূলক প্রোগ্রামিংয়ে io::stdin().read_to_string দিয়ে পুরো ইনপুট একবারে পড়া হয় এবং BufWriter::new(io::stdout().lock()) ব্যবহার করে stdout একবার লক করে writeln! দিয়ে বাফারে লেখা হয়। পাশাপাশি {:.2} দিয়ে দশমিকের ঘর নির্ধারণ, {:<6} দিয়ে বামে অ্যালাইন, ও {:>4} দিয়ে ডানে অ্যালাইন করে নিখুঁত টেবিল বানানো যায়—তাও কম্পাইল-টাইম টাইপ চেকিংসহ!',
        everydayExample:
          'প্রতিটি ইটের জন্য আলাদা রিকশা না ডেকে একটি ট্রাকে সব ইট তুলে একসাথে পাঠানো।',
        keyTakeaways: [
          '{:.2} দিলে দশমিকের পর ঠিক ২ ঘর প্রিন্ট হয়।',
          'BufWriter + writeln! ব্যবহার করলে Rust-এর আউটপুট C++ এর সমান দ্রুত হয়।',
          '{:<6} মানে বামে অ্যালাইন, {:>4} মানে ডানে অ্যালাইন।',
        ],
      },
    },
    topics: [
      {
        id: 'rust-ch-2-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Fixed Decimals {:.2} & Escape Sequences',
        englishParagraphs: [
          'Rust format strings use `{:.2}` for rounding floats cleanly and standard escapes `\\t`, `\\n`, `\\"` inside literals.',
        ],
        banglaParagraphs: [
          'Rust-এ `{:.2}` লিখে দশমিকের পর ঘর নির্ধারণ করা যায় এবং `\\t`, `\\"` দিয়ে ট্যাব ও কোট দেখানো যায়।',
        ],
        memoryDiagram: `price: f64 = 149.456 -> "{:.2}" -> "149.46"`,
        code: `fn main() {
    let price = 149.456_f64;
    println!("Item:\\t\\"Notebook\\"\\nTotal:\\t{:.2} BDT", price);
}`,
        stdin: '',
        expectedOutput: 'Item:\t"Notebook"\nTotal:\t149.46 BDT',
        lineByLine: [
          {
            lineNumber: 'Line 3',
            codeSnippet: 'println!("Item:\\t\\"Notebook\\"\\nTotal:\\t{:.2} BDT", price);',
            whatItMeans: 'Formats tab, escaped quotes, and 2-decimal precision.',
            whyItIsThere: 'Compile-time checked output formatting.',
            ifDeletedError: 'Missing formatted output.',
          },
        ],
      },
      {
        id: 'rust-ch-2-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Fast BufWriter + Single Stdin Slurp Reader',
        englishParagraphs: [
          'Combining io::stdin().read_to_string with BufWriter gives both clean parsing and zero-flush-overhead output.',
        ],
        banglaParagraphs: [
          'একসাথে সব ইনপুট পড়ে BufWriter দিয়ে আউটপুট লিখলে I/O স্পিড সর্বোচ্চ থাকে।',
        ],
        memoryDiagram: `read_to_string -> it.next() -> writeln!(out, ...)`,
        code: `use std::io::{self, BufWriter, Read, Write};

fn main() {
    let mut buf = String::new();
    io::stdin().read_to_string(&mut buf).unwrap();
    let mut it = buf.split_whitespace();
    let a: i64 = it.next().unwrap().parse().unwrap();
    let b: i64 = it.next().unwrap().parse().unwrap();
    let mut out = BufWriter::new(io::stdout().lock());
    writeln!(out, "Sum={} | Avg={:.1}", a + b, (a + b) as f64 / 2.0).unwrap();
}`,
        stdin: '15 24',
        expectedOutput: 'Sum=39 | Avg=19.5',
        lineByLine: [
          {
            lineNumber: 'Line 9',
            codeSnippet: 'let mut out = BufWriter::new(io::stdout().lock());',
            whatItMeans: 'Acquires single lock and wraps stdout in buffered writer.',
            whyItIsThere: 'Eliminates per-line mutex + flush overhead.',
            ifDeletedError: 'Cannot write to buffered out handle.',
          },
        ],
      },
      {
        id: 'rust-ch-2-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Aligned Terminal Table With {:<6} & {:>4}',
        englishParagraphs: [
          'Rust’s format DSL includes built-in left `{:<6}` and right `{:>4}` alignment padding for crisp CLI summaries.',
        ],
        banglaParagraphs: [
          '{:<6} ও {:>4} দিয়ে কলাম ডানে-বামে সুন্দরভাবে সাজিয়ে টেবিল তৈরি করা যায়।',
        ],
        memoryDiagram: `Format padding: "{:<6} | {:>4}" -> "Rust   | 2015"`,
        code: `fn main() {
    let rows = [("C", 1972), ("Rust", 2015)];
    println!("{:<6} | {:>4}", "Lang", "Year");
    for (lang, yr) in rows {
        println!("{:<6} | {:>4}", lang, yr);
    }
}`,
        stdin: '',
        expectedOutput: 'Lang   | Year\nC      | 1972\nRust   | 2015',
        lineByLine: [
          {
            lineNumber: 'Line 5',
            codeSnippet: 'println!("{:<6} | {:>4}", lang, yr);',
            whatItMeans: 'Left-pads lang to width 6, right-pads yr to width 4.',
            whyItIsThere: 'Keeps vertical table pipes cleanly aligned.',
            ifDeletedError: 'Table columns skew unevenly.',
          },
        ],
      },
      {
        id: 'rust-ch-2-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Blazing-Fast 10^5 Line Output With BufWriter',
        englishParagraphs: [
          'Writing N running prefix totals through BufWriter + writeln! batches everything into minimal OS write syscalls.',
        ],
        banglaParagraphs: [
          '১ লক্ষ লাইনের উত্তর BufWriter দিয়ে লিখলে কোনো TLE ছাড়াই কয়েক মিলিসেকেন্ডে শেষ হয়।',
        ],
        memoryDiagram: `BufWriter 64KB buffer -> flush automatically on Drop`,
        code: `use std::io::{self, BufWriter, Read, Write};

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let mut it = s.split_whitespace();
    let n: usize = it.next().unwrap().parse().unwrap();
    let mut out = BufWriter::new(io::stdout().lock());
    let mut running: i64 = 0;
    for _ in 0..n {
        running += it.next().unwrap().parse::<i64>().unwrap();
        writeln!(out, "{}", running).unwrap();
    }
}`,
        stdin: '4 10 20 30 40',
        expectedOutput: '10\n30\n60\n100',
        lineByLine: [
          {
            lineNumber: 'Line 12',
            codeSnippet: 'writeln!(out, "{}", running).unwrap();',
            whatItMeans: 'Writes line into BufWriter memory buffer.',
            whyItIsThere: 'Flushes automatically in large batches.',
            ifDeletedError: 'No lines emitted.',
          },
        ],
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 1',
        codeSnippet: 'let mut out = BufWriter::new(io::stdout().lock());',
        whatItMeans: 'Buffered locked stdout handle.',
        whyItIsThere: '10x faster than repeated println! in loops.',
        ifDeletedError: 'TLE risk on 10^5 output lines.',
      },
      {
        lineNumber: 'Line 2',
        codeSnippet: 'writeln!(out, "{:.2}", val)',
        whatItMeans: 'Buffered write with 2-decimal formatting.',
        whyItIsThere: 'Clean, zero-allocation numeric formatting.',
        ifDeletedError: 'Missing Write trait causes compile error.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'read_to_string stdin', memoryOrStack: 's="4 10 20 30 40"', note: 'Buffered read once' },
      { step: 2, state: 'Parse n = 4', memoryOrStack: 'running = 0', note: 'usize loop bound' },
      { step: 3, state: 'Loop 4 times', memoryOrStack: 'out buffer: 10,30,60,100', note: 'Batched in RAM' },
      { step: 4, state: 'BufWriter dropped at }', memoryOrStack: 'auto-flush to stdout', note: '1 clean syscall' },
    ],
    harryBugTraps: [
      {
        title: 'Forgetting `use std::io::Write;` for BufWriter',
        brokenCode: 'writeln!(out, "Hi").unwrap(); // Compile error: no method write_fmt!',
        fixedCode: 'use std::io::{self, BufWriter, Write};',
        whyItBreaks: 'Rust extension traits like Write must be imported into scope before calling writeln!.',
      },
      {
        title: 'Integer Division Instead of Casting to f64',
        brokenCode: 'println!("{:.1}", (3 + 4) / 2); // Compile error or prints 3!',
        fixedCode: 'println!("{:.1}", (3 + 4) as f64 / 2.0);',
        whyItBreaks: 'Rust never converts integers to floats implicitly.',
      },
      {
        title: 'Using println! Inside Tight 10^5 Loop',
        brokenCode: 'for i in 0..100000 { println!("{}", i); }',
        fixedCode: 'for i in 0..100000 { writeln!(out, "{}", i).unwrap(); }',
        whyItBreaks: 'println! flushes on every newline whereas BufWriter batches writes.',
      },
    ],
    practiceSheet: [
      {
        id: 'rust-ch-2-q1',
        difficulty: 'Easy',
        title: 'Escaped File Path',
        prompt: 'Print: Path: "C:\\Rust\\main.rs"',
        banglaHint: 'ব্যাকস্ল্যাশ ও কোট এস্কেপ করো (\\\\ ও \\")।',
        starterCode: `fn main() {\n    println!("Path: \\"C:\\\\Rust\\\\main.rs\\"");\n}`,
        sampleStdin: '',
        expectedOutput: 'Path: "C:\\Rust\\main.rs"',
      },
      {
        id: 'rust-ch-2-q2',
        difficulty: 'Easy',
        title: 'Fixed 2-Decimal Average',
        prompt: 'Read 3 numbers and print average using {:.2}.',
        banglaHint: 'as f64 কাস্ট করে {:.2} দাও।',
        starterCode: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n    let nums: Vec<f64> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();\n    println!("{:.2}", (nums[0] + nums[1] + nums[2]) / 3.0);\n}`,
        sampleStdin: '10 20 31',
        expectedOutput: '20.33',
      },
      {
        id: 'rust-ch-2-q3',
        difficulty: 'Medium',
        title: 'BufWriter Sum of N',
        prompt: 'Read n and n i64s, writing "Total=<sum>" with BufWriter.',
        banglaHint: 'use std::io::Write; আনতে ভুলো না।',
        starterCode: `use std::io::{self, BufWriter, Read, Write};\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n    let mut it = s.split_whitespace();\n    let n: usize = it.next().unwrap().parse().unwrap();\n    let mut total: i64 = 0;\n    for _ in 0..n { total += it.next().unwrap().parse::<i64>().unwrap(); }\n    let mut out = BufWriter::new(io::stdout().lock());\n    writeln!(out, "Total={}", total).unwrap();\n}`,
        sampleStdin: '4\n5 10 15 20',
        expectedOutput: 'Total=50',
      },
      {
        id: 'rust-ch-2-q4',
        difficulty: 'Medium',
        title: 'Left-Padded Table Row',
        prompt: 'Read label and value, format label left-padded to 6 chars with " | " and value.',
        banglaHint: 'println!("{:<6} | {}", k, v);',
        starterCode: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n    let mut it = s.split_whitespace();\n    println!("{:<6} | {}", it.next().unwrap(), it.next().unwrap());\n}`,
        sampleStdin: 'XP 250',
        expectedOutput: 'XP     | 250',
      },
    ],
    miniBuild: {
      title: 'Rust Mini Build: Fast Stream Receipt Formatter',
      description: 'Read n prices via single-read stdin and print Total and Avg rounded to 2 decimal places.',
      banglaGoal: 'দ্রুত stdin থেকে দাম পড়ে মোট ও গড় ২ দশমিক স্থানে প্রিন্ট করা।',
      combinesChapters: 'Ch 1–2',
      starterCode: `use std::io::{self, Read};

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let mut it = s.split_whitespace();
    let n: usize = it.next().unwrap().parse().unwrap();
    let mut total = 0.0_f64;
    for _ in 0..n {
        total += it.next().unwrap().parse::<f64>().unwrap();
    }
    println!("Total={:.2} Avg={:.2}", total, total / n as f64);
}`,
      sampleStdin: '3\n10.5 20.0 29.5',
      expectedOutput: 'Total=60.00 Avg=20.00',
    },
    starterCode: `use std::io::{self, Read};

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let mut it = s.split_whitespace();
    let n: usize = it.next().unwrap().parse().unwrap();
    let mut total = 0.0_f64;
    for _ in 0..n {
        total += it.next().unwrap().parse::<f64>().unwrap();
    }
    println!("Total={:.2} Avg={:.2}", total, total / n as f64);
}`,
    sampleStdin: '3\n10.5 20.0 29.5',
    expectedSampleOutput: 'Total=60.00 Avg=20.00',
    testCases: [
      { id: 'rust-c2-t1', input: '3\n10.5 20.0 29.5', expectedOutput: 'Total=60.00 Avg=20.00' },
      { id: 'rust-c2-t2', input: '2\n5.0 10.0', expectedOutput: 'Total=15.00 Avg=7.50', isHidden: true },
    ],
  },

  3: {
    chapterNumber: 3,
    title: 'Rust Chapter 3 (Rust 2024): Explicit Bit-Width Types (i32, i64, i128) & Checked Overflow',
    banglaTitle: 'Rust অধ্যায় ৩ (Rust 2024): নির্ভুল বিট-প্রস্থ (i32, i64, i128) ও ওভারফ্লো সুরক্ষা',
    subtitle: 'Why Rust bans implicit narrowing/widening, debug panic vs release wrap, checked_mul, and 128-bit i128.',
    zeroIntuition: {
      plainEnglishStory:
        'Rust makes exact integer bit-widths crystal clear on the page: i32 (4 bytes), i64 (8 bytes), u64, and even native 128-bit i128 (holding values up to 1.7 × 10^38 without BigInt crates!). Unlike C++, Rust refuses implicit widening or narrowing like i32 + i64—you must write `(a as i64) + b` so hidden truncation or signedness bugs can never sneak past code review.\n\nEven better, Rust treats arithmetic overflow seriously: debug builds immediately panic loudly instead of silently turning positive sums negative, whereas release builds use explicit two\'s-complement wrapping or explicit methods like checked_mul(), saturating_add(), and wrapping_add() to encode your exact domain intent.',
      asciiFlowchart: `  i32 (4B, max 2.14e9)  --- CANNOT mix with i64 without explicit "as i64" ---
  i64 (8B, max 9.22e18) --- Standard for Codeforces / LeetCode ---
  i128 (16B, max 1.7e38) --- Solves 10^18 * 10^18 with ZERO overflow! ---`,
      pseudocode: [
        '1. CHOOSE i64 by default in competitive programming (avoid i32 wrap)',
        '2. REACH for i128 when intermediate products reach 10^30',
        '3. CALL x.checked_mul(y) when overflow should return None cleanly',
      ],
      banglaZeroToHero: {
        analogyTitle: 'লক করা পরিমাপের পাত্র ও বিল্ট-ইন ১২৮-বিট দৈত্য (i128)',
        explanation:
          'C/C++-এ অনেক সময় int ও long long অজান্তেই মিশে গিয়ে মাঝপথে ওভারফ্লো বা চিহ্ন-জনিত বাগ তৈরি করে। কিন্তু Rust-এ কম্পাইলার তোমাকে অনুমতি ছাড়া (as i64) i32 ও i64 যোগ করতেই দেবে না! উপরন্তু Rust-এ বিল্ট-ইন ১২৮-বিট i128 টাইপ রয়েছে যা ৩৮ ডিজিট পর্যন্ত সংখ্যা রাখতে পারে—তাই ১০^১৮ × ১০^১৮ গুণ করলেও Rust-এ কোনো এক্সটার্নাল লাইব্রেরি ছাড়াই নির্ভুল ফল পাওয়া যায়। ডিবাগ মোডে ওভারফ্লো হলে প্রোগ্রাম সাথে সাথে প্যানিক করে তোমাকে সতর্ক করবে যাতে ভুল হিসাব চুপচাপ পার না হয়ে যায়। আবার ব্যাংকিং বা সিস্টেম কোডে checked_mul() ব্যবহার করলে ওভারফ্লো হলে ক্র্যাশের বদলে নিরাপদ None পাওয়া যায়!',
        everydayExample:
          'i32 ছোট কাপ, i64 বড় জগ, আর i128 হলো বিশাল ট্যাংকি—কোনো তরলই না বলে উপচে পড়তে পারে না!',
        keyTakeaways: [
          'Rust-এ ভুলেও দুটো আলাদা টাইপ (i32 + i64) সরাসরি যোগ করা যায় না।',
          'debug মোডে ওভারফ্লো হলে প্রোগ্রাম প্যানিক করে; release মোডে wrap হয় বা checked_mul() ব্যবহার করা যায়।',
          'বড় মধ্যবর্তী গুণের জন্য সরাসরি i128 ব্যবহার করো।',
        ],
      },
    },
    topics: [
      {
        id: 'rust-ch-3-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Strict Types, Underscore Literals & i128 Range',
        englishParagraphs: [
          'Rust enforces explicit casting (`a as i64`) whenever widening or narrowing integers, making data width visible on the page.',
        ],
        banglaParagraphs: [
          'আলাদা টাইপ যোগ করতে চাইলে স্পষ্টভাবে `as i64` লিখে দিতে হয় এবং i128 বিশাল সংখ্যা ধারণ করতে পারে।',
        ],
        memoryDiagram: `a: i32 (4B) + b: i64 (8B) -> (a as i64) + b | i128 (16B)`,
        code: `fn main() {
    let a: i32 = 2_000_000_000;
    let b: i64 = 9_000_000_000_000;
    let giant: i128 = 10_i128.pow(25);
    println!("sum={} giant={}", (a as i64) + b, giant);
}`,
        stdin: '',
        expectedOutput: 'sum=9002000000000 giant=10000000000000000000000000',
        lineByLine: [
          {
            lineNumber: 'Line 4',
            codeSnippet: 'let giant: i128 = 10_i128.pow(25);',
            whatItMeans: 'Computes 10^25 cleanly in native 128-bit integer.',
            whyItIsThere: 'Surpasses 64-bit i64 max (9e18) without external libraries.',
            ifDeletedError: '64-bit overflows at 10^19.',
          },
        ],
      },
      {
        id: 'rust-ch-3-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Safe 64-Bit Multiplication Avoiding i32 Panic',
        englishParagraphs: [
          'Parsing inputs straight into i64 avoids i32 overflow panics when multiplying two 10^5 numbers.',
        ],
        banglaParagraphs: [
          'সরাসরি i64 টাইপে পার্স করে নিলে ১ লক্ষ × ১ লক্ষ গুণ করলে আর ওভারফ্লো প্যানিক হবে না।',
        ],
        memoryDiagram: `a: i64 * b: i64 -> 10_000_000_000`,
        code: `use std::io::{self, Read};

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let mut it = s.split_whitespace();
    let a: i64 = it.next().unwrap().parse().unwrap();
    let b: i64 = it.next().unwrap().parse().unwrap();
    println!("{}", a * b);
}`,
        stdin: '100000 100000',
        expectedOutput: '10000000000',
        lineByLine: [
          {
            lineNumber: 'Line 7',
            codeSnippet: 'let a: i64 = it.next().unwrap().parse().unwrap();',
            whatItMeans: 'Parses string directly into signed 64-bit integer.',
            whyItIsThere: 'i32 overflows above 2.14e9.',
            ifDeletedError: 'Panics in debug mode on 100000 * 100000.',
          },
        ],
      },
      {
        id: 'rust-ch-3-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Explicit Overflow Guard With checked_mul & saturating_add',
        englishParagraphs: [
          'Rust’s checked_mul returns Some(result) if safe or None on overflow, letting critical systems handle overflows gracefully without panics or wraparound.',
        ],
        banglaParagraphs: [
          'checked_mul() ওভারফ্লো হলে None দেয় আর নিরাপদ হলে Some(উত্তর) দেয়—ফলে ব্যাংকিং বা সিস্টেম কোড কখনো অজান্তে ভুল হিসাব করে না।',
        ],
        memoryDiagram: `i64::MAX.checked_mul(2) -> None ("OVERFLOW") | saturating -> i64::MAX`,
        code: `fn main() {
    let ok = 1_000_i64.checked_mul(2_000);
    let bad = i64::MAX.checked_mul(2);
    println!("ok={:?} bad_none={}", ok.unwrap(), bad.is_none());
}`,
        stdin: '',
        expectedOutput: 'ok=2000000 bad_none=true',
        lineByLine: [
          {
            lineNumber: 'Line 3',
            codeSnippet: 'let bad = i64::MAX.checked_mul(2);',
            whatItMeans: 'Performs overflow-checked 64-bit multiplication returning Option<i64>.',
            whyItIsThere: 'Explicitly detects arithmetic overflow safely.',
            ifDeletedError: 'Panics in debug builds or silently wraps in release.',
          },
        ],
      },
      {
        id: 'rust-ch-3-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: '128-Bit Intermediate Product Trap (Codeforces 10^18 Scale)',
        englishParagraphs: [
          'Even i64 overflows when multiplying two 10^10 numbers! Converting inputs to i128 calculates exact 1..n sums even for n = 10^9 without overflowing.',
        ],
        banglaParagraphs: [
          'i128 ব্যবহার করলে n * (n + 1) / 2 এমনকি n = 10^12 হলেও কোনো ওভারফ্লো ছাড়াই একদম নির্ভুল উত্তর দেয়!',
        ],
        memoryDiagram: `n: i128 = 1000000 -> n * (n + 1) / 2 = 500000500000`,
        code: `use std::io::{self, Read};

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let n: i128 = s.trim().parse().unwrap();
    println!("{}", n * (n + 1) / 2);
}`,
        stdin: '1000000',
        expectedOutput: '500000500000',
        lineByLine: [
          {
            lineNumber: 'Line 6',
            codeSnippet: 'let n: i128 = s.trim().parse().unwrap();',
            whatItMeans: 'Uses native 128-bit integer (up to 1.7e38).',
            whyItIsThere: 'Prevents intermediate overflow on n * (n + 1).',
            ifDeletedError: 'i32/i64 overflows at large n.',
          },
        ],
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 1',
        codeSnippet: 'let n: i128 = s.trim().parse().unwrap();',
        whatItMeans: 'Parses string into 128-bit signed integer.',
        whyItIsThere: 'Eliminates 32-bit and 64-bit intermediate overflow.',
        ifDeletedError: 'Panics or wraps for large products.',
      },
      {
        lineNumber: 'Line 2',
        codeSnippet: 'checked_mul(x)',
        whatItMeans: 'Returns Option<T> instead of panicking or wrapping.',
        whyItIsThere: 'Deterministic production overflow safety.',
        ifDeletedError: 'Unchecked arithmetic overflow.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'Parse "1000000"', memoryOrStack: 'n: i128 = 1000000', note: '16-byte register pair' },
      { step: 2, state: 'n + 1', memoryOrStack: '1000001', note: '128-bit addition' },
      { step: 3, state: 'n * (n + 1)', memoryOrStack: '1000001000000', note: 'Zero risk of overflow' },
      { step: 4, state: '/ 2 -> println!', memoryOrStack: '500000500000', note: 'Clean exact output' },
    ],
    harryBugTraps: [
      {
        title: 'Mixing Different Integer Widths Without `as`',
        brokenCode: 'let a: i32 = 5; let b: i64 = 10; let c = a + b;',
        fixedCode: 'let c = (a as i64) + b;',
        whyItBreaks: 'Rust forbids implicit numeric promotion; use explicit `as i64`.',
      },
      {
        title: 'Using `usize` for Values That Can Underflow Below Zero',
        brokenCode: 'let x: usize = 0; let y = x - 1; // PANIC attempt to subtract with overflow!',
        fixedCode: 'let x: usize = 0; let y = x.saturating_sub(1); // 0 safely',
        whyItBreaks: 'Unsigned integers cannot represent -1 and panic in debug builds.',
      },
      {
        title: 'Leaving Default i32 Type in CP Multiplication',
        brokenCode: 'let a = 100_000; let b = 100_000; println!("{}", a * b);',
        fixedCode: 'let a: i64 = 100_000; let b: i64 = 100_000; println!("{}", a * b);',
        whyItBreaks: 'Unannotated integer literals default to i32 unless context proves i64.',
      },
    ],
    practiceSheet: [
      {
        id: 'rust-ch-3-q1',
        difficulty: 'Easy',
        title: '64-Bit Rectangle Product',
        prompt: 'Read two i64 numbers and print their product.',
        banglaHint: 'উভয় মানকে i64-এ পার্স করো।',
        starterCode: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n    let mut it = s.split_whitespace();\n    let a: i64 = it.next().unwrap().parse().unwrap();\n    let b: i64 = it.next().unwrap().parse().unwrap();\n    println!("{}", a * b);\n}`,
        sampleStdin: '100000 100000',
        expectedOutput: '10000000000',
      },
      {
        id: 'rust-ch-3-q2',
        difficulty: 'Easy',
        title: 'Explicit Type Cast Addition',
        prompt: 'Given a: i32 = 100 and b: i64 = 200, print (a as i64) + b.',
        banglaHint: 'as i64 কাস্ট ব্যবহার করো।',
        starterCode: `fn main() {\n    let a: i32 = 100;\n    let b: i64 = 200;\n    println!("{}", (a as i64) + b);\n}`,
        sampleStdin: '',
        expectedOutput: '300',
      },
      {
        id: 'rust-ch-3-q3',
        difficulty: 'Medium',
        title: '1..N Sum With i128',
        prompt: 'Read n: i128 and print n * (n + 1) / 2.',
        banglaHint: 'i128 ব্যবহার করলে বড় সংখ্যায়ও প্যানিক হবে না।',
        starterCode: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n    let n: i128 = s.trim().parse().unwrap();\n    println!("{}", n * (n + 1) / 2);\n}`,
        sampleStdin: '100000',
        expectedOutput: '5000050000',
      },
      {
        id: 'rust-ch-3-q4',
        difficulty: 'Hard',
        title: 'Checked Overflow Guard',
        prompt: 'Use checked_mul on i64::MAX and 2, printing "SAFE" if Some else "OVERFLOW".',
        banglaHint: 'match বা unwrap_or / is_none চেক ব্যবহার করো।',
        starterCode: `fn main() {\n    match i64::MAX.checked_mul(2) {\n        Some(v) => println!("{}", v),\n        None => println!("OVERFLOW"),\n    }\n}`,
        sampleStdin: '',
        expectedOutput: 'OVERFLOW',
      },
    ],
    miniBuild: {
      title: 'Rust Mini Build: Overflow-Proof 64-Bit Multiplier',
      description: 'Read two integers up to 10^9 into i64 and emit exact product safely.',
      banglaGoal: 'i32 প্যানিক এড়িয়ে i64-এ নির্ভুল গুণফল বের করা।',
      combinesChapters: 'Ch 1–3',
      starterCode: `use std::io::{self, Read};

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let mut it = s.split_whitespace();
    let a: i64 = it.next().unwrap().parse().unwrap();
    let b: i64 = it.next().unwrap().parse().unwrap();
    println!("{}", a * b);
}`,
      sampleStdin: '100000 100000',
      expectedOutput: '10000000000',
    },
    starterCode: `use std::io::{self, Read};

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let mut it = s.split_whitespace();
    let a: i64 = it.next().unwrap().parse().unwrap();
    let b: i64 = it.next().unwrap().parse().unwrap();
    println!("{}", a * b);
}`,
    sampleStdin: '100000 100000',
    expectedSampleOutput: '10000000000',
    testCases: [
      { id: 'rust-c3-t1', input: '100000 100000', expectedOutput: '10000000000' },
      { id: 'rust-c3-t2', input: '250000 40000', expectedOutput: '10000000000', isHidden: true },
    ],
  },

  4: {
    chapterNumber: 4,
    title: 'Rust Chapter 4 (Rust 2024): Operators, Expression `if`, `rem_euclid` & Integer Ceil',
    banglaTitle: 'Rust অধ্যায় ৪ (Rust 2024): অপারেটর, rem_euclid ও ইন্টিজার সিলিং',
    subtitle: 'Why Rust has no ternary ?:, expression-oriented `if`, `div_ceil`, and `rem_euclid` positive modulo.',
    zeroIntuition: {
      plainEnglishStory:
        'Rust eliminates nested ternary chains (`a ? b : c ? d : e`) because `if ... else ...` is itself a typed expression that evaluates cleanly to a value! Just omit the trailing semicolon inside each branch and ensure both branches yield the same type, and `let label = if cond { "YES" } else { "NO" };` compiles cleanly without temporary mut variables.\n\nFurthermore, Rust’s integer primitives solve two classic contest headaches right in the standard library: `.rem_euclid(m)` always yields a positive modulo in `[0, m - 1]` even for negative dividends, and `u64::div_ceil(b)` computes overflow-safe exact integer ceiling division without calling floating-point `ceil()`.',
      asciiFlowchart: `  (-3_i64) % 5            ---> -3 (keeps negative sign!)
  (-3_i64).rem_euclid(5) --->  2 (ALWAYS 0..m-1!)
  10_u64.div_ceil(3)     --->  4 (Built-in exact ceiling!)`,
      pseudocode: [
        '1. USE `let x = if cond { a } else { b };` instead of C-style ternary',
        '2. USE a.rem_euclid(m) for cyclic negative-safe modulo',
        '3. USE (a + b - 1) / b or u64::div_ceil for exact ceil',
      ],
      banglaZeroToHero: {
        analogyTitle: 'এক্সপ্রেশন-ভিত্তিক if এবং Rust-এর নিজস্ব rem_euclid',
        explanation:
          'Rust-এ C/Java-র মতো `?:` টার্নারি অপারেটর নেই, কারণ Rust-এ `if / else` নিজেই একটি এক্সপ্রেশন যা সরাসরি মান রিটার্ন করতে পারে! ব্লকের শেষ লাইনে সেমিকোলন না দিলেই সেই মানটি ভ্যারিয়েবলে জমা হয়। শুধু খেয়াল রাখতে হবে if এবং else উভয় শাখার রিটার্ন টাইপ যেন হুবহু এক হয়। এ ছাড়া Rust-এ `++` বা `--` অপারেটরও রাখা হয়নি সাইড-ইফেক্ট বাগ এড়াতে; তাই সব সময় `i += 1` লিখবে। ঋণাত্মক সংখ্যার ভাগশেষ সব সময় ধনাত্মক পেতে `((a % m) + m) % m` না লিখে সরাসরি `a.rem_euclid(m)` এবং পূর্ণসংখ্যার সিলিং ভাগফল বের করতে `n.div_ceil(a)` কল করলেই ওভারফ্লো ও ফ্লোট প্রিসিশন বাগ থেকে সম্পূর্ণ মুক্ত থাকা যায়!',
        everydayExample:
          'বিল্ট-ইন rem_euclid হলো এমন ঘড়ি যা সব সময় ধনাত্মক ঘণ্টা (০..১১) দেখায়।',
        keyTakeaways: [
          'let status = if score >= 50 { "PASS" } else { "FAIL" }; — Rust-এ প্রতিটি ব্লকই মান ফেরত দেয়।',
          'a.rem_euclid(m) ঋণাত্মক মডুলোকে ধনাত্মক করে।',
          'u64::div_ceil বা (n + a - 1) / a দিয়ে সঠিক সিলিং ভাগফল বের করা যায়।',
        ],
      },
    },
    topics: [
      {
        id: 'rust-ch-4-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Expression-Oriented if/else & Integer vs Float Division',
        englishParagraphs: [
          'Notice there is NO semicolon at the end of `"PASS"` inside the `if` expression block—omitting the semicolon returns that value from the block!',
        ],
        banglaParagraphs: [
          'Rust-এ ব্লকের শেষ লাইনে সেমিকোলন না দিলে সেই মানটিই রিটার্ন হয়—এভাবে `if/else` সরাসরি ভ্যারিয়েবলে অ্যাসাইন করা যায়।',
        ],
        memoryDiagram: `7 / 2 = 3 | 7.0 / 2.0 = 3.5 | if expr -> "PASS"`,
        code: `fn main() {
    let a = 7;
    let b = 2;
    let label = if a > b { "GT" } else { "LE" };
    println!("div={} float={:.1} label={}", a / b, a as f64 / b as f64, label);
}`,
        stdin: '',
        expectedOutput: 'div=3 float=3.5 label=GT',
        lineByLine: [
          {
            lineNumber: 'Line 4',
            codeSnippet: 'let label = if a > b { "GT" } else { "LE" };',
            whatItMeans: 'Assigns result of if-else expression directly to label.',
            whyItIsThere: 'Replaces C-style ternary a > b ? "GT" : "LE".',
            ifDeletedError: 'Compile error if both branches do not match type.',
          },
        ],
      },
      {
        id: 'rust-ch-4-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Negative-Safe Modulo With .rem_euclid(m)',
        englishParagraphs: [
          'Calling a.rem_euclid(m) avoids negative array-index underflows in rotation and hashing problems.',
        ],
        banglaParagraphs: [
          'a.rem_euclid(m) ব্যবহার করলে নেগেটিভ ইনপুট হলেও ভাগশেষ সব সময় ০ থেকে m-1 এর ভেতর থাকে।',
        ],
        memoryDiagram: `(-3).rem_euclid(5) = 2 | (-3) % 5 = -3`,
        code: `use std::io::{self, Read};

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let mut it = s.split_whitespace();
    let a: i64 = it.next().unwrap().parse().unwrap();
    let m: i64 = it.next().unwrap().parse().unwrap();
    println!("raw={} posMod={}", a % m, a.rem_euclid(m));
}`,
        stdin: '-3 5',
        expectedOutput: 'raw=-3 posMod=2',
        lineByLine: [
          {
            lineNumber: 'Line 9',
            codeSnippet: 'a.rem_euclid(m)',
            whatItMeans: 'Standard Euclidean remainder always in [0, |m| - 1].',
            whyItIsThere: 'Eliminates manual ((a % m) + m) % m boilerplate.',
            ifDeletedError: 'a % m returns -3 for -3 % 5.',
          },
        ],
      },
      {
        id: 'rust-ch-4-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Short-Circuit Option Guards & Checked Access',
        englishParagraphs: [
          'Short-circuit `&&` and `Option::unwrap_or` guard invalid accesses cleanly without null pointers (Rust has no null!).',
        ],
        banglaParagraphs: [
          'Rust-এ কোনো null নেই; Option<T>-এর ওপর .unwrap_or() ও শর্ট-সার্কিট && ব্যবহার করে কোড শতভাগ নিরাপদ রাখা হয়।',
        ],
        memoryDiagram: `coupon: Option<&str> = None -> unwrap_or("NONE")`,
        code: `fn main() {
    let coupon: Option<&str> = None;
    let code = coupon.unwrap_or("");
    let discount = !code.is_empty() && code.len() >= 4;
    println!("discount={}", discount);
}`,
        stdin: '',
        expectedOutput: 'discount=false',
        lineByLine: [
          {
            lineNumber: 'Line 4',
            codeSnippet: 'let discount = !code.is_empty() && code.len() >= 4;',
            whatItMeans: 'Short-circuits on false left side.',
            whyItIsThere: 'Safe boolean composition without null pointers.',
            ifDeletedError: 'Boolean predicate omitted.',
          },
        ],
      },
      {
        id: 'rust-ch-4-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Built-In u64::div_ceil Grid Tiles (Codeforces 1A)',
        englishParagraphs: [
          'Rust’s `.div_ceil(a)` computes ceiling division natively without overflowing `n + a - 1` when `n` is close to `u64::MAX`!',
        ],
        banglaParagraphs: [
          'Rust-এর বিল্ট-ইন `.div_ceil()` শুধু নির্ভুলই নয়, এমনকি n + a - 1 ওভারফ্লো হওয়ার ঝুঁকিও রাখে না!',
        ],
        memoryDiagram: `6_u64.div_ceil(4) = 2 -> 2 * 2 = 4`,
        code: `use std::io::{self, Read};

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let mut it = s.split_whitespace();
    let n: u64 = it.next().unwrap().parse().unwrap();
    let m: u64 = it.next().unwrap().parse().unwrap();
    let a: u64 = it.next().unwrap().parse().unwrap();
    println!("{}", n.div_ceil(a) * m.div_ceil(a));
}`,
        stdin: '6 6 4',
        expectedOutput: '4',
        lineByLine: [
          {
            lineNumber: 'Line 10',
            codeSnippet: 'n.div_ceil(a) * m.div_ceil(a)',
            whatItMeans: 'Unsigned ceiling division in std.',
            whyItIsThere: 'Zero float precision bugs and zero n + a overflow.',
            ifDeletedError: 'Manual float ceil fails above 2^53.',
          },
        ],
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 1',
        codeSnippet: 'a.rem_euclid(m)',
        whatItMeans: 'Non-negative mathematical modulo.',
        whyItIsThere: 'Built into Rust integer primitives.',
        ifDeletedError: 'Negative remainders for a < 0.',
      },
      {
        lineNumber: 'Line 2',
        codeSnippet: 'n.div_ceil(a)',
        whatItMeans: 'Exact integer ceiling division.',
        whyItIsThere: 'Avoids f64 precision loss.',
        ifDeletedError: 'Precision errors at large bounds.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'Read n=6, m=6, a=4', memoryOrStack: 'u64 vars', note: 'Unsigned 64-bit' },
      { step: 2, state: '6_u64.div_ceil(4)', memoryOrStack: '2', note: 'Exact ceil' },
      { step: 3, state: '6_u64.div_ceil(4)', memoryOrStack: '2', note: 'Exact ceil' },
      { step: 4, state: '2 * 2 -> 4', memoryOrStack: 'stdout', note: 'Outputs 4 cleanly' },
    ],
    harryBugTraps: [
      {
        title: 'Using `++` or `--` Operators (Removed in Rust!)',
        brokenCode: 'i++; // Compile error!',
        fixedCode: 'i += 1;',
        whyItBreaks: 'Rust intentionally omitted ++/-- to avoid pre/post-increment side-effect bugs.',
      },
      {
        title: 'Putting a Semicolon Inside an `if` Expression Branch',
        brokenCode: 'let x = if ok { 1; } else { 2; }; // returns () instead of i32!',
        fixedCode: 'let x = if ok { 1 } else { 2 };',
        whyItBreaks: 'A trailing semicolon turns an expression into a unit () statement.',
      },
      {
        title: 'Assuming `-7 % 4 == 1`',
        brokenCode: 'let r = -7 % 4; // -3!',
        fixedCode: 'let r = (-7_i64).rem_euclid(4); // 1',
        whyItBreaks: '% keeps the sign of the dividend; rem_euclid guarantees positive remainder.',
      },
    ],
    practiceSheet: [
      {
        id: 'rust-ch-4-q1',
        difficulty: 'Easy',
        title: 'Euclidean Positive Modulo',
        prompt: 'Read two i64 values a and m and print a.rem_euclid(m).',
        banglaHint: 'a.rem_euclid(m) কল করো।',
        starterCode: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n    let mut it = s.split_whitespace();\n    let a: i64 = it.next().unwrap().parse().unwrap();\n    let m: i64 = it.next().unwrap().parse().unwrap();\n    println!("{}", a.rem_euclid(m));\n}`,
        sampleStdin: '-17 5',
        expectedOutput: '3',
      },
      {
        id: 'rust-ch-4-q2',
        difficulty: 'Easy',
        title: 'Built-In div_ceil',
        prompt: 'Read positive u64 values a and b and output a.div_ceil(b).',
        banglaHint: 'a.div_ceil(b) ব্যবহার করো।',
        starterCode: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n    let mut it = s.split_whitespace();\n    let a: u64 = it.next().unwrap().parse().unwrap();\n    let b: u64 = it.next().unwrap().parse().unwrap();\n    println!("{}", a.div_ceil(b));\n}`,
        sampleStdin: '10 3',
        expectedOutput: '4',
      },
      {
        id: 'rust-ch-4-q3',
        difficulty: 'Medium',
        title: 'Expression if Leap Year',
        prompt: 'Read year y and print YES if leap year else NO using let ans = if ...',
        banglaHint: 'let ans = if (...) { "YES" } else { "NO" };',
        starterCode: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n    let y: i64 = s.trim().parse().unwrap();\n    let ans = if y % 400 == 0 || (y % 4 == 0 && y % 100 != 0) { "YES" } else { "NO" };\n    println!("{}", ans);\n}`,
        sampleStdin: '2024',
        expectedOutput: 'YES',
      },
      {
        id: 'rust-ch-4-q4',
        difficulty: 'Medium',
        title: 'Option Default Guard',
        prompt: 'Given x: Option<i32> = None, print x.unwrap_or(99).',
        banglaHint: 'unwrap_or(99) ব্যবহার করো।',
        starterCode: `fn main() {\n    let x: Option<i32> = None;\n    println!("{}", x.unwrap_or(99));\n}`,
        sampleStdin: '',
        expectedOutput: '99',
      },
    ],
    miniBuild: {
      title: 'Rust Mini Build: Modulo & div_ceil Engine',
      description: 'Read a, b and print rem_euclid alongside exact unsigned ceiling division.',
      banglaGoal: 'rem_euclid এবং div_ceil একসাথে ব্যবহার করে নির্ভুল ফল দেখানো।',
      combinesChapters: 'Ch 1–4',
      starterCode: `use std::io::{self, Read};

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let mut it = s.split_whitespace();
    let a: i64 = it.next().unwrap().parse().unwrap();
    let b: i64 = it.next().unwrap().parse().unwrap();
    let ceil = (a.unsigned_abs()).div_ceil(b.unsigned_abs());
    println!("mod={} ceil={}", a.rem_euclid(b), ceil);
}`,
      sampleStdin: '-7 4',
      expectedOutput: 'mod=1 ceil=2',
    },
    starterCode: `use std::io::{self, Read};

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let mut it = s.split_whitespace();
    let a: i64 = it.next().unwrap().parse().unwrap();
    let b: i64 = it.next().unwrap().parse().unwrap();
    let ceil = (a.unsigned_abs()).div_ceil(b.unsigned_abs());
    println!("mod={} ceil={}", a.rem_euclid(b), ceil);
}`,
    sampleStdin: '-7 4',
    expectedSampleOutput: 'mod=1 ceil=2',
    testCases: [
      { id: 'rust-c4-t1', input: '-7 4', expectedOutput: 'mod=1 ceil=2' },
      { id: 'rust-c4-t2', input: '10 3', expectedOutput: 'mod=1 ceil=4', isHidden: true },
    ],
  },

  5: {
    chapterNumber: 5,
    title: 'Rust Chapter 5 (Rust 2024): Bitwise Methods, count_ones(), is_power_of_two() & ! Flip',
    banglaTitle: 'Rust অধ্যায় ৫ (Rust 2024): বিটওয়াইজ মেথড, count_ones ও CP বিটমাস্ক',
    subtitle: 'Why Rust uses ! instead of ~ for bitwise NOT, built-in count_ones(), trailing_zeros(), and 1_u64 << k.',
    isMilestoneMerger: true,
    zeroIntuition: {
      plainEnglishStory:
        'Rust turns classic cryptic C bit tricks into self-documenting, zero-cost methods directly on integer primitives! Every unsigned integer provides `.count_ones()` (which lowers to a 1-cycle CPU POPCNT instruction), `.trailing_zeros()`, `.leading_zeros()`, and `.is_power_of_two()`—eliminating off-by-one mask bugs.\n\nKeep two essential Rust quirks in mind: first, Rust uses `!x` (NOT `~x`!) for bitwise NOT; second, shifting an unannotated integer literal like `1 << 40` triggers a shift-overflow error if inferred as 32-bit `i32`, so always annotate `1_u64 << 40` whenever shifts reach 32 bits or higher.',
      asciiFlowchart: `  !x                  ---> Bitwise NOT in Rust (instead of ~x!)
  x.count_ones()      ---> Compiles to 1-cycle CPU POPCNT!
  x.is_power_of_two() ---> Built-in on u32 / u64 / u128!
  1_u64 << 40         ---> Explicit u64 literal avoids u32 shift overflow!`,
      pseudocode: [
        '1. USE !x for bitwise NOT and ^ for XOR',
        '2. CALL .count_ones() and .is_power_of_two() directly on unsigned ints',
        '3. SPECIFY 1_u64 << k whenever shifting k >= 32',
        '4. APPLY XOR sweep in O(n) / O(1) for Milestone Merger 1',
      ],
      banglaZeroToHero: {
        analogyTitle: 'সুইস আর্মি ছুরির মতো বিল্ট-ইন বিট মেথড',
        explanation:
          'C/C++-এ যেসব বিট ট্রিকের জন্য ম্যানুয়াল লুপ বা __builtin_popcountll মুখস্থ করতে হয়, Rust-এ সেগুলো প্রতিটি ইন্টিজারের নিজস্ব মেথড হিসেবেই দেওয়া আছে! যেমন n.count_ones() ১-বিট গুনে দেয় সরাসরি CPU-র POPCNT নির্দেশনায়, n.trailing_zeros() ডানদিকে কয়টি ০ আছে বলে দেয়, আর n.is_power_of_two() শূন্য ও নেগেটিভ কেস নিরাপদভাবে সামলে ২-এর ঘাত যাচাই করে। শুধু দুটো বিষয় অবশ্যই মনে রাখবে: Rust-এ বিট উল্টাতে `~` চিহ্নের বদলে `!` ব্যবহৃত হয় (যেমন `!WRITE`), আর ৩২ বা তার বেশি বিট শিফট করতে হলে সব সময় `1_u64 << k` লিখবে, নইলে ডিফল্ট `i32` শিফট-ওভারফ্লো এরর দেখাবে। এই Milestone Merger 1-এ Phase 1-এর সব দক্ষতা একসাথে প্রয়োগ করবো!',
        everydayExample:
          'প্রতিবার স্ক্রু-ড্রাইভার দিয়ে গিয়ার খোলা বাদ দিয়ে ড্যাশবোর্ডে সরাসরি বাটন পেয়ে যাওয়া!',
        keyTakeaways: [
          '~x এর বদলে Rust-এ বিটওয়াইজ NOT হলো !x।',
          'u64::is_power_of_two(x) ও x.count_ones() জিরো-কস্ট হার্ডওয়্যার অপারেশন।',
          'শিফটের আগে 1_u64 << k লিখলে কখনোই ৩২-বিটে আটকে যাবে না।',
        ],
      },
    },
    topics: [
      {
        id: 'rust-ch-5-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Core Bitwise Ops, ! Inversion & count_ones()',
        englishParagraphs: [
          'Rust integer methods like count_ones() compile directly into single-cycle CPU popcount instructions when target features permit.',
        ],
        banglaParagraphs: [
          '13_u64.count_ones() সরাসরি CPU-র POPCNT নির্দেশনায় কম্পাইল হয়ে ১-বিটের সংখ্যা দেয়।',
        ],
        memoryDiagram: `12 & 10 = 8 | 12 | 10 = 14 | 12 ^ 10 = 6 | 13.count_ones() = 3`,
        code: `fn main() {
    let a: u64 = 12;
    let b: u64 = 10;
    println!("AND={} OR={} XOR={} pop={}", a & b, a | b, a ^ b, 13_u64.count_ones());
}`,
        stdin: '',
        expectedOutput: 'AND=8 OR=14 XOR=6 pop=3',
        lineByLine: [
          {
            lineNumber: 'Line 4',
            codeSnippet: '13_u64.count_ones()',
            whatItMeans: 'Counts set 1-bits natively in O(1).',
            whyItIsThere: 'Built-in replacement for manual loops or __builtin_popcountll.',
            ifDeletedError: 'Missing popcount metric.',
          },
        ],
      },
      {
        id: 'rust-ch-5-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'is_power_of_two() & k-th Bit Probe',
        englishParagraphs: [
          'Unsigned types expose .is_power_of_two() safely handling 0 (returns false) and high bits cleanly.',
        ],
        banglaParagraphs: [
          'x.is_power_of_two() ০-সহ সব কেস নিরাপদে হ্যান্ডল করে true বা false দেয়।',
        ],
        memoryDiagram: `16_u64.is_power_of_two() = true | (16 >> 4) & 1 = 1`,
        code: `use std::io::{self, Read};

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let mut it = s.split_whitespace();
    let x: u64 = it.next().unwrap().parse().unwrap();
    let k: u32 = it.next().unwrap().parse().unwrap();
    println!("pow2={} bit{}={}", x.is_power_of_two(), k, (x >> k) & 1);
}`,
        stdin: '16 4',
        expectedOutput: 'pow2=true bit4=1',
        lineByLine: [
          {
            lineNumber: 'Line 9',
            codeSnippet: 'x.is_power_of_two()',
            whatItMeans: 'Built-in O(1) power-of-two method on unsigned ints.',
            whyItIsThere: 'Cleaner and safer than remembering x > 0 && (x & (x - 1)) == 0.',
            ifDeletedError: 'Manual bitwise check needed.',
          },
        ],
      },
      {
        id: 'rust-ch-5-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: '64-Bit Feature Flags With 1_u64 << k & ! Invert',
        englishParagraphs: [
          'Clearing a bit flag in Rust uses `mask &= !WRITE;` using `!` instead of `~`.',
        ],
        banglaParagraphs: [
          'কোনো বিট ফ্ল্যাগ বন্ধ করতে চাইলে Rust-এ `mask &= !FLAG` লিখতে হয় (এখানে `~` এর বদলে `!`)।',
        ],
        memoryDiagram: `READ=1 | WRITE=2 | EXEC=4 -> mask = (READ | WRITE) & !WRITE = 1`,
        code: `fn main() {
    const READ: u64 = 1 << 0;
    const WRITE: u64 = 1 << 1;
    let mut mask = READ | WRITE;
    mask &= !WRITE;
    println!("mask={} hasRead={}", mask, (mask & READ) != 0);
}`,
        stdin: '',
        expectedOutput: 'mask=1 hasRead=true',
        lineByLine: [
          {
            lineNumber: 'Line 5',
            codeSnippet: 'mask &= !WRITE;',
            whatItMeans: 'Clears WRITE bit using bitwise NOT (!).',
            whyItIsThere: 'Rust uses ! for bitwise inversion on integers.',
            ifDeletedError: 'WRITE bit stays active.',
          },
        ],
      },
      {
        id: 'rust-ch-5-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Milestone Merger 1: XOR Unique Finder & 1_u64 << 40',
        englishParagraphs: [
          'Combining buffered Phase 1 reading, u64 shifts (`1_u64 << 40`), and XOR sweep isolates the unpaired number in O(n) time and O(1) memory.',
        ],
        banglaParagraphs: [
          'Ch 1–5 এর সব টুল মিলিয়ে Rust-এ O(1) মেমোরিতে একক সংখ্যা ও ৬৪-বিট মাস্ক বিশ্লেষণ।',
        ],
        memoryDiagram: `12 ^ 5 ^ 12 ^ 9 ^ 5 = 9 | (1_u64 << 40).count_ones() = 1`,
        code: `use std::io::{self, Read};

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let mut it = s.split_whitespace();
    let n: usize = it.next().unwrap().parse().unwrap();
    let mut unique: u64 = 0;
    for _ in 0..n {
        unique ^= it.next().unwrap().parse::<u64>().unwrap();
    }
    let mask40 = 1_u64 << 40;
    println!("unique={} bits40={}", unique, mask40.count_ones());
}`,
        stdin: '5\n12 5 12 9 5',
        expectedOutput: 'unique=9 bits40=1',
        lineByLine: [
          {
            lineNumber: 'Line 12',
            codeSnippet: 'let mask40 = 1_u64 << 40;',
            whatItMeans: 'Explicitly types 1 as 64-bit unsigned before shifting.',
            whyItIsThere: 'Prevents shift overflow panic on default i32!',
            ifDeletedError: 'Panics with attempt to shift left with overflow.',
          },
        ],
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 1',
        codeSnippet: '1_u64 << 40',
        whatItMeans: 'Explicit 64-bit unsigned left shift.',
        whyItIsThere: 'Avoids 32-bit default shift panic.',
        ifDeletedError: 'Compile/runtime shift overflow.',
      },
      {
        lineNumber: 'Line 2',
        codeSnippet: 'mask.count_ones()',
        whatItMeans: 'Hardware POPCNT method on integers.',
        whyItIsThere: 'Counts active flags in 1 clock cycle.',
        ifDeletedError: 'Manual loop needed.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'unique = 0', memoryOrStack: 'u64 = 0', note: 'XOR identity' },
      { step: 2, state: '0^12^5^12', memoryOrStack: 'unique = 5', note: '12 cancels' },
      { step: 3, state: '5^9^5', memoryOrStack: 'unique = 9', note: '5 cancels' },
      { step: 4, state: '1_u64 << 40', memoryOrStack: 'count_ones = 1', note: 'Safe 64-bit mask' },
    ],
    harryBugTraps: [
      {
        title: 'Writing ~x Instead of !x for Bitwise NOT',
        brokenCode: 'let inv = ~mask; // Compile error!',
        fixedCode: 'let inv = !mask;',
        whyItBreaks: 'Rust does not have a ~ operator; ! serves both logical and bitwise NOT.',
      },
      {
        title: 'Shifting Unannotated 1 << 40',
        brokenCode: 'let m: u64 = 1 << 40; // attempt to shift left with overflow!',
        fixedCode: 'let m: u64 = 1_u64 << 40;',
        whyItBreaks: 'If not forced to u64 before shifting, 1 << 40 triggers shift-overflow error.',
      },
      {
        title: 'Comparing (x & 1 == 0) Without Parentheses',
        brokenCode: 'if x & 1 == 0 {} // Rust precedence error!',
        fixedCode: 'if (x & 1) == 0 {}',
        whyItBreaks: '== binds tighter than & in Rust just like C++/Java.',
      },
    ],
    practiceSheet: [
      {
        id: 'rust-ch-5-q1',
        difficulty: 'Easy',
        title: 'Popcount Drill',
        prompt: 'Read u64 n and print n.count_ones().',
        banglaHint: 'n.count_ones() মেথড ব্যবহার করো।',
        starterCode: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n    let n: u64 = s.trim().parse().unwrap();\n    println!("{}", n.count_ones());\n}`,
        sampleStdin: '29',
        expectedOutput: '4',
      },
      {
        id: 'rust-ch-5-q2',
        difficulty: 'Easy',
        title: 'Power of Two Drill',
        prompt: 'Read u64 n and print YES if n.is_power_of_two() else NO.',
        banglaHint: 'is_power_of_two() ব্যবহার করো।',
        starterCode: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n    let n: u64 = s.trim().parse().unwrap();\n    println!("{}", if n.is_power_of_two() { "YES" } else { "NO" });\n}`,
        sampleStdin: '64',
        expectedOutput: 'YES',
      },
      {
        id: 'rust-ch-5-q3',
        difficulty: 'Medium',
        title: '64-Bit Bitmask Power',
        prompt: 'Read k: u32 and print 1_u64 << k.',
        banglaHint: '1_u64 << k লিখো।',
        starterCode: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n    let k: u32 = s.trim().parse().unwrap();\n    println!("{}", 1_u64 << k);\n}`,
        sampleStdin: '40',
        expectedOutput: '1099511627776',
      },
      {
        id: 'rust-ch-5-q4',
        difficulty: 'Hard',
        title: 'XOR Unique Number',
        prompt: 'Read n and n u64 integers where every element appears twice except one; print unique.',
        banglaHint: 'XOR (^=) দিয়ে জোড়াগুলো বাতিল করো।',
        starterCode: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n    let mut it = s.split_whitespace();\n    let n: usize = it.next().unwrap().parse().unwrap();\n    let mut ans: u64 = 0;\n    for _ in 0..n { ans ^= it.next().unwrap().parse::<u64>().unwrap(); }\n    println!("{}", ans);\n}`,
        sampleStdin: '5\n7 3 9 3 7',
        expectedOutput: '9',
      },
    ],
    miniBuild: {
      title: 'Milestone Merger 1 (Rust Ch 1–5): Fast Bitwise Odd-One-Out Analyzer',
      description: 'Combine single-read I/O, u64 safety, expression `if`, and XOR + count_ones bit tricks.',
      banglaGoal: 'অধ্যায় ১–৫ মিলিয়ে সম্পূর্ণ Rust বিটওয়াইজ বিশ্লেষক প্রোগ্রাম।',
      combinesChapters: 'Ch 1–5',
      starterCode: `use std::io::{self, Read};

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let mut it = s.split_whitespace();
    let n: usize = it.next().unwrap().parse().unwrap();
    let mut unique: u64 = 0;
    for _ in 0..n {
        unique ^= it.next().unwrap().parse::<u64>().unwrap();
    }
    println!("unique={} bits={}", unique, unique.count_ones());
}`,
      sampleStdin: '5\n12 5 12 9 5',
      expectedOutput: 'unique=9 bits=2',
    },
    starterCode: `use std::io::{self, Read};

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let mut it = s.split_whitespace();
    let n: usize = it.next().unwrap().parse().unwrap();
    let mut unique: u64 = 0;
    for _ in 0..n {
        unique ^= it.next().unwrap().parse::<u64>().unwrap();
    }
    println!("unique={} bits={}", unique, unique.count_ones());
}`,
    sampleStdin: '5\n12 5 12 9 5',
    expectedSampleOutput: 'unique=9 bits=2',
    testCases: [
      { id: 'rust-c5-t1', input: '5\n12 5 12 9 5', expectedOutput: 'unique=9 bits=2' },
      { id: 'rust-c5-t2', input: '3\n7 10 10', expectedOutput: 'unique=7 bits=3', isHidden: true },
    ],
  },
  ...LESSONS_RUST_P2,
  ...LESSONS_RUST_P3,
  ...LESSONS_RUST_P4,
  ...LESSONS_RUST_P5,
};
