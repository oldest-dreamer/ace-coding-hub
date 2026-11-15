import type { AtomicLessonOverride } from './atomicLessonTypes';

export const LESSONS_RUST_P2: Record<number, AtomicLessonOverride> = {
  6: {
    chapterNumber: 6,
    title: 'Rust Chapter 6 (Rust 2024): Conditional Branching (if Expressions & Exhaustive match)',
    banglaTitle: 'Rust অধ্যায় ৬ (Rust 2024): কন্ডিশনাল ব্রাঞ্চিং (if এক্সপ্রেশন ও match)',
    subtitle: 'if-as-expression (no parentheses!), strict bool types, exhaustive match arms, and range patterns (90..=100).',
    zeroIntuition: {
      plainEnglishStory:
        'In Rust, `if` is NOT just a statement—it is an expression that returns a value directly (replacing ternary `cond ? a : b` completely!), and requires parentheses-free strict `bool` conditions (integers like `if 1` refuse to compile!).\n\nEven better, Rust’s `match` enforces compile-time EXHAUSTIVENESS: you can match exact values, OR patterns (`"+" | "-"`), inclusive ranges (`90..=100`), and guard conditions (`if b == 0`), and `rustc` guarantees you never forget a case or suffer accidental fall-through!',
      asciiFlowchart: `  [ score: i32 ]
         |
         v  match score { ... } (Exhaustive checked at compile time!)
    0..=79   --> "Pass/Fail"
    80..=89  --> "A"
    90..=100 --> "A+"
    _        --> "INVALID" (Wildcard catches <0 or >100!)`,
      pseudocode: [
        '1. READ token cleanly via std::io::read_to_string',
        '2. EXPRESS conditions as strict bool (no implicit 0/1 truthiness)',
        '3. ASSIGN values directly using let x = if cond { a } else { b };',
        '4. DISPATCH ranges and commands safely with exhaustive match',
        '5. EMIT exact matched branch output via println!',
      ],
      banglaZeroToHero: {
        analogyTitle: 'শতভাগ নিখুঁত ম্যাচ সুইচ ও শূন্য-ভুল টাইপ গার্ড',
        explanation:
          'অন্য ভাষায় `if (x)` লিখলে সংখ্যা `1` কে সত্য আর `0` কে মিথ্যা ধরে নেয়, কিন্তু Rust এতটাই কঠোর যে `if`-এ অবশ্যই আসল `bool` (`true` বা `false`) দিতে হয় এবং শর্তের চারপাশে ফার্স্ট ব্র্যাকেট `( )` দেওয়ার দরকার পড়ে না! আরেকটি অসাধারণ বৈশিষ্ট্য হলো Rust-এ `if-else` নিজেই একটি ভ্যালু রিটার্ন করে, তাই আলাদা কোনো টার্নারি অপারেটর (`? :`) নেই—সরাসরি `let tag = if x > 0 { "POS" } else { "NEG" };` লেখা যায়! তবে Rust-এর আসল রাজমুকুট হলো `match` এক্সপ্রেশন। `match`-এর ভেতর তুমি `90..=100` এভাবে সরাসরি রেঞ্জ লিখতে পারবে, কোনো `break;` লাগবে না, আর যদি কোনো একটি সম্ভাব্য কেস বাদ পড়ে যায় তবে কম্পাইলার (`rustc`) আগেই এরর দিয়ে তোমাকে সাবধান করবে (Exhaustiveness Check)! পাশাপাশি `match op { "/" if b == 0 => "DIV_ZERO", ... }` এভাবে শর্ত-যুক্ত প্যাটার্ন গার্ডও লেখা যায়। প্রতিটি আর্মে অবশ্যই একই টাইপের রিটার্ন থাকতে হয়। শুরুর দিকেই অবৈধ ইনপুট আটকে দিলে বা `_ =>` ওয়াইল্ডকার্ড ব্যবহার করলে Rust কোড কখনোই রানটাইমে অপ্রত্যাশিত আচরণ করে না।',
        everydayExample:
          'বিমানবন্দরের স্ক্যানার কোনো ব্যাগ বাদ দিলে যেমন গেট খোলে না, Rust `match` কোনো একটি কেস বাদ রাখলে কম্পাইলই হতে দেয় না!',
        keyTakeaways: [
          'Rust-এ `if` সরাসরি ভ্যালু রিটার্ন করে (`let m = if a > b { a } else { b };`)—কোনো `? :` নেই।',
          '`if`-এর শর্ত অবশ্যই `bool` হতে হবে (`if n != 0`, কখনো `if n` নয়)।',
          '`match`-এ সব সম্ভাবনা কভার না করলে কম্পাইল এরর হবে (`_` ওয়াইল্ডকার্ড বাকি সব ধরে)।',
        ],
      },
    },
    topics: [
      {
        id: 'rust-ch-6-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Exhaustive match With Inclusive Ranges (90..=100)',
        englishParagraphs: [
          'Rust’s `..=` inclusive range patterns inside `match` express numeric tiers cleanly without nested `else if` chains.',
          'The wildcard `_` covers all numbers outside `[0, 100]` cleanly at zero runtime cost.',
        ],
        banglaParagraphs: [
          'Rust-এর `match`-এ `90..=100` এবং `80..=89` রেঞ্জ প্যাটার্ন দিয়ে খুব সুন্দর ও নিরাপদ গ্রেড রাউটার লেখা যায়।',
          'বাকি সব অবৈধ সংখ্যা স্বয়ংক্রিয়ভাবে `_ => "INVALID"` আর্মে ধরা পড়ে।',
        ],
        memoryDiagram: `score=85 -> matches 80..=89 -> returns &"A" directly`,
        code: `fn main() {
    let score = 85;
    let grade = match score {
        90..=100 => "A+",
        80..=89 => "A",
        0..=79 => "Pass/Fail",
        _ => "INVALID",
    };
    println!("{}", grade);
}`,
        stdin: '',
        expectedOutput: 'A',
        lineByLine: [
          { lineNumber: 'Line 3', codeSnippet: 'let grade = match score {', whatItMeans: 'Evaluates match as an expression returning &str.', whyItIsThere: 'Compiler enforces exhaustive coverage of all i32 values.', ifDeletedError: 'Must declare mutable variable + repeated if/else.' },
          { lineNumber: 'Line 5', codeSnippet: '80..=89 => "A",', whatItMeans: 'Inclusive integer range pattern matching 80..89.', whyItIsThere: 'Eliminates manual >= and <= boilerplate.', ifDeletedError: '85 drops into lower or wildcard branch.' },
          { lineNumber: 'Line 7', codeSnippet: '_ => "INVALID",', whatItMeans: 'Catch-all wildcard covering negatives and >100.', whyItIsThere: 'Required by rustc exhaustiveness check.', ifDeletedError: 'Compile error: non-exhaustive patterns.' },
        ],
      },
      {
        id: 'rust-ch-6-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Pattern Guards in match Calculator (match op)',
        englishParagraphs: [
          'Matching string slices (`op`) alongside a guard arm (`"/" if b == 0`) protects division against runtime panics cleanly.',
          'All match arms yield `String` (or `format!`) so types unify cleanly.',
        ],
        banglaParagraphs: [
          'অপারেটর স্ট্রিং ম্যাচ করার সময় `"/" if b == 0 =>` গার্ড ব্যবহার করে শূন্য দিয়ে ভাগ করার প্যানিক রোধ করা হয়েছে।',
          'সব আর্ম একই টাইপ (`String`) রিটার্ন করায় কোনো টাইপ এরর হয় না।',
        ],
        memoryDiagram: `stdin: "12 * 4" -> match "*" -> "48"`,
        code: `use std::io::{self, Read};

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let mut it = s.split_whitespace();
    if let (Some(a_s), Some(op), Some(b_s)) = (it.next(), it.next(), it.next()) {
        let a: i64 = a_s.parse().unwrap_or(0);
        let b: i64 = b_s.parse().unwrap_or(0);
        let out = match op {
            "+" => (a + b).to_string(),
            "-" => (a - b).to_string(),
            "*" => (a * b).to_string(),
            "/" if b == 0 => "DIV_ZERO".to_string(),
            "/" => (a / b).to_string(),
            _ => "UNKNOWN".to_string(),
        };
        println!("{}", out);
    }
}`,
        stdin: '12 * 4',
        expectedOutput: '48',
        lineByLine: [
          { lineNumber: 'Line 14', codeSnippet: '"/" if b == 0 => "DIV_ZERO".to_string(),', whatItMeans: 'Match guard checking zero divisor before division arm.', whyItIsThere: 'Prevents Rust panic on attempt to divide by zero.', ifDeletedError: 'Input "12 / 0" panics at runtime.' },
        ],
      },
      {
        id: 'rust-ch-6-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'if-as-Expression Shipping Fee Classifier',
        englishParagraphs: [
          'Since `if { ... } else { ... }` evaluates to a value in Rust, assigning `let fee = if w <= 5 { 60 } else ...` stays concise and strongly typed.',
        ],
        banglaParagraphs: [
          'Rust-এ সরাসরি `let fee = if ... { ... } else { ... };` লিখে টার্নারির চেয়েও পরিষ্কার কোড পাওয়া যায়।',
        ],
        memoryDiagram: `w=7 -> w <= 0 false -> w <= 5 false -> w <= 20 true -> fee=120`,
        code: `use std::io::{self, Read};

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let w: i64 = s.trim().parse().unwrap_or(0);
    if w <= 0 {
        println!("INVALID");
        return;
    }
    let fee = if w <= 5 { 60 } else if w <= 20 { 120 } else { 250 };
    println!("Fee={}", fee);
}`,
        stdin: '7',
        expectedOutput: 'Fee=120',
        lineByLine: [
          { lineNumber: 'Line 11', codeSnippet: 'let fee = if w <= 5 { 60 } else if w <= 20 { 120 } else { 250 };', whatItMeans: 'Expression-based branching returning i32 tier fee.', whyItIsThere: 'Replaces ternary operator cleanly.', ifDeletedError: 'Compile error: fee undefined.' },
        ],
      },
      {
        id: 'rust-ch-6-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Strict Bool Rule & Codeforces Watermelon Split (CF 4A)',
        englishParagraphs: [
          'Trying `if w % 2` in Rust refuses to compile because `w % 2` is `i64`, NOT `bool`! Always write `w % 2 == 0`.',
          'Combining `w > 2 && w % 2 == 0` handles boundary `w = 2` cleanly.',
        ],
        banglaParagraphs: [
          'Rust-এ `if w % 2` লিখলে কম্পাইলার আটকে দেবে কারণ এটি `i64`, `bool` নয়! তাই অবশ্যই `w % 2 == 0` লিখতে হবে।',
        ],
        memoryDiagram: `w=2 -> (2 > 2 && true) -> false -> "NO"`,
        code: `use std::io::{self, Read};

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let w: i64 = s.trim().parse().unwrap_or(0);
    println!("{}", if w > 2 && w % 2 == 0 { "YES" } else { "NO" });
}`,
        stdin: '2',
        expectedOutput: 'NO',
        lineByLine: [
          { lineNumber: 'Line 7', codeSnippet: 'if w > 2 && w % 2 == 0 { "YES" } else { "NO" }', whatItMeans: 'Uses strict bool predicate inside inline if-else expression.', whyItIsThere: 'Catches w=2 boundary accurately.', ifDeletedError: 'Fails CF 4A test w=2.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 1', codeSnippet: 'fn main() {', whatItMeans: 'Program entry point returning unit ().', whyItIsThere: 'Starts binary execution.', ifDeletedError: 'Compile error: main function not found.' },
      { lineNumber: 'Line 2', codeSnippet: 'let score = 85;', whatItMeans: 'Binds immutable integer variable score.', whyItIsThere: 'Test score input for range matching.', ifDeletedError: 'Compile error: cannot find value score.' },
      { lineNumber: 'Line 3', codeSnippet: 'let grade = match score {', whatItMeans: 'Starts exhaustive pattern-match expression.', whyItIsThere: 'Routes score cleanly with compile-time completeness check.', ifDeletedError: 'grade undefined.' },
      { lineNumber: 'Line 4', codeSnippet: '90..=100 => "A+",', whatItMeans: 'Inclusive range arm for top grade.', whyItIsThere: 'Matches 90 through 100 inclusive.', ifDeletedError: 'Top scores drop to wildcard INVALID.' },
      { lineNumber: 'Line 5', codeSnippet: '80..=89 => "A",', whatItMeans: 'Inclusive range arm matching 85 -> "A".', whyItIsThere: 'Captures second tier.', ifDeletedError: '85 gets misclassified.' },
      { lineNumber: 'Line 7', codeSnippet: '_ => "INVALID",', whatItMeans: 'Wildcard matching any remaining i32 values.', whyItIsThere: 'Satisfies Rust exhaustiveness check.', ifDeletedError: 'Compile error: pattern _ not covered.' },
    ],
    dryRunTable: [
      { step: 1, state: 'let score = 85', memoryOrStack: 'score=85', note: 'Immutable binding' },
      { step: 2, state: 'Check 90..=100', memoryOrStack: 'No match', note: 'Proceed to next arm' },
      { step: 3, state: 'Check 80..=89', memoryOrStack: 'MATCH -> "A"', note: 'Exits match cleanly' },
      { step: 4, state: 'println!("{}", grade)', memoryOrStack: 'stdout="A"', note: 'Exit 0' },
    ],
    harryBugTraps: [
      { title: 'Using Integer as Boolean Condition (if n)', brokenCode: 'let n = 5;\nif n { println!("nonzero"); } // Compile Error!', fixedCode: 'if n != 0 { println!("nonzero"); }', whyItBreaks: 'Rust forbids truthy integer coercion; if conditions MUST evaluate strictly to bool.' },
      { title: 'Forgetting Exhaustive Wildcard _ in match', brokenCode: 'match x { 1 => "One", 2 => "Two" } // Compile Error!', fixedCode: 'match x { 1 => "One", 2 => "Two", _ => "Other" }', whyItBreaks: 'rustc rejects any match that leaves possible values unhandled.' },
      { title: 'Mismatched Types Across if / else Arms', brokenCode: 'let v = if ok { 10 } else { "NO" }; // i32 vs &str!', fixedCode: 'let v = if ok { "10" } else { "NO" };', whyItBreaks: 'Every branch of an if expression must yield the exact same type.' },
    ],
    practiceSheet: [
      { id: 'rust-ch-6-q1', difficulty: 'Easy', title: '1. Sign Classifier', prompt: 'Read i64 n and print POSITIVE, NEGATIVE, or ZERO.', banglaHint: 'if / else if / else অথবা match n.cmp(&0) ব্যবহার করো।', starterCode: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    let n: i64 = s.trim().parse().unwrap_or(0);\n    if n > 0 { println!("POSITIVE"); } else if n < 0 { println!("NEGATIVE"); } else { println!("ZERO"); }\n}`, sampleStdin: '-42', expectedOutput: 'NEGATIVE' },
      { id: 'rust-ch-6-q2', difficulty: 'Easy', title: '2. Maximum of Three Numbers', prompt: 'Read 3 i64 integers and output the maximum.', banglaHint: 'a.max(b).max(c) অথবা if দিয়ে বের করো।', starterCode: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    let v: Vec<i64> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();\n    let mut mx = v[0]; if v[1] > mx { mx = v[1]; } if v[2] > mx { mx = v[2]; }\n    println!("{}", mx);\n}`, sampleStdin: '12 99 45', expectedOutput: '99' },
      { id: 'rust-ch-6-q3', difficulty: 'Medium', title: '3. Exhaustive Day Matcher', prompt: 'Read 1..3 (1=Mon, 2=Tue, 3=Wed, else INVALID) using match.', banglaHint: 'match d { 1 => "Mon", ... _ => "INVALID" } লেখো।', starterCode: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    let d: i32 = s.trim().parse().unwrap_or(0);\n    println!("{}", match d { 1 => "Mon", 2 => "Tue", 3 => "Wed", _ => "INVALID" });\n}`, sampleStdin: '2', expectedOutput: 'Tue' },
      { id: 'rust-ch-6-q4', difficulty: 'Medium', title: '4. Valid Triangle Sides', prompt: 'Read a, b, c; print YES if valid triangle else NO.', banglaHint: 'a > 0 && b > 0 && c > 0 এবং দুই বাহু > তৃতীয় বাহু।', starterCode: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    let v: Vec<i64> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();\n    let (a, b, c) = (v[0], v[1], v[2]);\n    let ok = a > 0 && b > 0 && c > 0 && a + b > c && b + c > a && c + a > b;\n    println!("{}", if ok { "YES" } else { "NO" });\n}`, sampleStdin: '3 4 5', expectedOutput: 'YES' },
      { id: 'rust-ch-6-q5', difficulty: 'Hard', title: '5. Watermelon Boundary Split (CF 4A)', prompt: 'Read w and output YES if splittable into two positive even ints else NO.', banglaHint: 'w > 2 && w % 2 == 0 যাচাই করো।', starterCode: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    let w: i64 = s.trim().parse().unwrap_or(0);\n    println!("{}", if w > 2 && w % 2 == 0 { "YES" } else { "NO" });\n}`, sampleStdin: '2', expectedOutput: 'NO' },
    ],
    miniBuild: {
      title: 'Rust 2024 Tiered Grade & Range Matcher',
      description: 'Routes scores cleanly with compile-time exhaustive range patterns.',
      banglaGoal: 'Rust রেঞ্জ ম্যাচিং ব্যবহার করে জিরো-বাগ গ্রেড রাউটার তৈরি।',
      combinesChapters: 'Ch 1–6',
      starterCode: `use std::io::{self, Read};

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let score: i32 = s.trim().parse().unwrap_or(-1);
    let out = match score {
        90..=100 => "A+",
        80..=89 => "A",
        0..=79 => "PASS",
        _ => "INVALID",
    };
    println!("{}", out);
}`,
      sampleStdin: '92',
      expectedOutput: 'A+',
    },
    starterCode: `use std::io::{self, Read};

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let score: i32 = s.trim().parse().unwrap_or(-1);
    let out = match score {
        90..=100 => "A+",
        80..=89 => "A",
        0..=79 => "PASS",
        _ => "INVALID",
    };
    println!("{}", out);
}`,
    sampleStdin: '92',
    expectedSampleOutput: 'A+',
    testCases: [
      { id: 'rust6-t1', input: '92', expectedOutput: 'A+' },
      { id: 'rust6-t2', input: '105', expectedOutput: 'INVALID', isHidden: true },
    ],
  },

  7: {
    chapterNumber: 7,
    title: 'Rust Chapter 7 (Rust 2024): Loops (loop, while, for..in & Iterators)',
    banglaTitle: 'Rust অধ্যায় ৭ (Rust 2024): লুপ মাস্টারি (loop, while, for..in ও ইটারেটর)',
    subtitle: 'Rust’s loop-with-break-value, while convergence, zero-bounds-check for..in ranges (1..=n), and Iterator adapters.',
    zeroIntuition: {
      plainEnglishStory:
        'Rust offers three distinct loop constructs designed for crystal-clear intent: `for x in 1..=n` iterates lazily over ranges or collections (eliminating C-style off-by-one and out-of-bounds bugs!), `while cond` loops while a predicate holds, and `loop { ... }` expresses infinite or exit-controlled (`do-while`) loops cleanly.\n\nUnique to Rust: `loop { if done { break ans; } }` can actually RETURN a value directly via `break val;`! And remember that looping `for x in vec` MOVES ownership of `vec` unless you borrow with `for x in &vec`!',
      asciiFlowchart: `  [ for i in 1..=5 ]                 [ loop { ... } (Rust do-while) ]
         |                                      |
         v                                      v
  LLVM unrolls cleanly (no bounds panic!)  [ Execute body at least once ]
         |                                      |
         v                                      v
  1 -> 2 -> 3 -> 4 -> 5                   if x == 0 { break digits; } (returns value!)`,
      pseudocode: [
        '1. USE for i in start..end (or start..=end) for index ranges',
        '2. BORROW collections with &items when iterating multiple times',
        '3. USE loop { ... if done { break; } } for exit-controlled do-while behavior',
        '4. ADVANCE state strictly toward termination in while loops',
        '5. EMIT computed aggregate cleanly via println!',
      ],
      banglaZeroToHero: {
        analogyTitle: 'শূন্য-বাউন্ড-প্যানিক রেঞ্জ লুপ ও break-ভ্যালু ফেরত',
        explanation:
          'C/C++-এ `for (i = 0; i <= n; i++)` লিখতে গিয়ে অফ-বাই-ওয়ান এরর হওয়া খুব সাধারণ ঘটনা, কিন্তু Rust-এ `for i in 1..=5` অথবা `0..n` সরাসরি স্পষ্ট সীমানা বলে দেয় এবং LLVM সেটিকে বিদ্যুৎগতিতে চালায়। অনির্দিষ্ট ধাপের জন্য `while cond` ব্যবহার হয়। আর Rust-এ `do-while` কীওয়ার্ড না থাকলেও এর চেয়ে শক্তিশালী `loop { ... }` রয়েছে! `loop` হলো এমন এক ব্লক যা অন্তত একবার চলবেই এবং কাজ শেষে `break answer;` লিখে লুপ থেকে সরাসরি মান রিটার্ন করা যায় (যেমন `0`-এর অঙ্ক গোনার সময়)। তবে একটি ভীষণ জরুরি ওনারশিপ নিয়ম মনে রাখবে: `for x in vec` লিখলে `vec`-এর মালিকানা লুপের ভেতর চলে যায় (Move হয়) এবং লুপের পর আর `vec` ব্যবহার করা যায় না! তাই কেবল পড়তে হলে সব সময় `for x in &vec` দিয়ে ধার (Borrow) নেবে। তাছাড়া ইটারেটর মেথড যেমন `(1..=n).sum()` বা `.filter()` কম্পাইল হয়ে সাধারণ লুপের মতোই শূন্য-খরচে চলে!',
        everydayExample:
          'বই পড়তে গিয়ে বন্ধুদের কাছে বই একেবারে দিয়ে দেওয়ার (`in vec`) বদলে পড়ার জন্য ধার নেওয়া (`in &vec`), যাতে পরেও বইটি নিজের থাকে!',
        keyTakeaways: [
          '`0..n` মানে `0` থেকে `n-1`, আর `1..=n` লিখলে `n` অন্তর্ভুক্ত হয়।',
          'অ্যারে বা ভেক্টরের পর আরও কাজ থাকলে সব সময় `for &x in &vec` দিয়ে বোরো করো।',
          '`loop { ... if cond { break val; } }` দিয়ে `do-while` এবং ভ্যালু রিটার্ন দুটোই হয়।',
        ],
      },
    },
    topics: [
      {
        id: 'rust-ch-7-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Inclusive Range for Loop (1..=5) & Mutable Accumulator',
        englishParagraphs: [
          'Notice `let mut sum: i64 = 0;`—in Rust, every variable is immutable unless explicitly marked `mut`.',
          '`1..=5` cleanly expresses an inclusive loop over 1 through 5.',
        ],
        banglaParagraphs: [
          'Rust-এ ভ্যারিয়েবলের মান বদলাতে চাইলে অবশ্যই `let mut` দিতে হয়। এখানে `1..=5` লুপে ১ থেকে ৫ সবগুলো সংখ্যা যোগ করা হয়েছে।',
        ],
        memoryDiagram: `mut sum: i64 = 0 -> 1..=5 -> sum = 15`,
        code: `fn main() {
    let mut sum: i64 = 0;
    for i in 1..=5 {
        sum += i;
    }
    println!("sum={}", sum);
}`,
        stdin: '',
        expectedOutput: 'sum=15',
        lineByLine: [
          { lineNumber: 'Line 2', codeSnippet: 'let mut sum: i64 = 0;', whatItMeans: 'Declares mutable 64-bit accumulator.', whyItIsThere: 'Rust requires mut to permit += updates.', ifDeletedError: 'Compile error: cannot assign twice to immutable variable.' },
          { lineNumber: 'Line 3', codeSnippet: 'for i in 1..=5 {', whatItMeans: 'Iterates inclusive range 1 through 5.', whyItIsThere: 'Zero bounds-check overhead and crystal clear bounds.', ifDeletedError: 'Loop does not run.' },
          { lineNumber: 'Line 4', codeSnippet: 'sum += i;', whatItMeans: 'Adds i into running sum.', whyItIsThere: 'Builds partial sum.', ifDeletedError: 'Outputs sum=0.' },
        ],
      },
      {
        id: 'rust-ch-7-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Exit-Controlled Digit Counter Returning Value via loop + break',
        englishParagraphs: [
          'Using Rust’s `loop { ... if x == 0 { break digits; } }` both executes at least once (handling `0` as `1` digit) AND returns `digits` directly from the loop expression!',
        ],
        banglaParagraphs: [
          '`loop` ব্লকের শেষে `if x == 0 { break digits; }` লিখে একেবারে `do-while` প্যাটার্ন ও সরাসরি ভ্যালু রিটার্ন—দুটোই একসাথে করা হয়েছে!',
        ],
        memoryDiagram: `x=7042 -> 704(1) -> 70(2) -> 7(3) -> 0(4) -> break 4`,
        code: `use std::io::{self, Read};

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let n: i64 = s.trim().parse().unwrap_or(0);
    let mut x = n.abs();
    let mut digits = 0;
    let count = loop {
        digits += 1;
        x /= 10;
        if x == 0 {
            break digits;
        }
    };
    println!("digits={}", count);
}`,
        stdin: '7042',
        expectedOutput: 'digits=4',
        lineByLine: [
          { lineNumber: 'Line 9', codeSnippet: 'let count = loop {', whatItMeans: 'Binds result returned by break digits inside loop expression.', whyItIsThere: 'Guarantees >= 1 execution cleanly for input 0.', ifDeletedError: 'Input 0 outputs digits=0 in plain while.' },
        ],
      },
      {
        id: 'rust-ch-7-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'O(sqrt(n)) Prime Verifier With Early break',
        englishParagraphs: [
          'Using `while d <= n / d` prevents `d * d` overflow cleanly for large 64-bit integers.',
        ],
        banglaParagraphs: [
          '`d <= n / d` ব্যবহার করলে বড় `i64` সংখ্যায় `d * d` ওভারফ্লো না করেই বর্গমূল পর্যন্ত প্রাইম চেক করা যায়।',
        ],
        memoryDiagram: `n=29 -> d=2..5 -> no divisor -> "PRIME"`,
        code: `use std::io::{self, Read};

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let n: i64 = s.trim().parse().unwrap_or(0);
    let mut prime = n >= 2;
    let mut d = 2i64;
    while d <= n / d {
        if n % d == 0 {
            prime = false;
            break;
        }
        d += 1;
    }
    println!("{}", if prime { "PRIME" } else { "COMPOSITE" });
}`,
        stdin: '29',
        expectedOutput: 'PRIME',
        lineByLine: [
          { lineNumber: 'Line 9', codeSnippet: 'while d <= n / d {', whatItMeans: 'Overflow-safe square-root divisor loop.', whyItIsThere: 'O(sqrt(n)) speed for 10^12+ numbers.', ifDeletedError: 'O(n) scan hits TLE.' },
        ],
      },
      {
        id: 'rust-ch-7-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Borrowed Slice Loop (&nums) & continue Odd Filter',
        englishParagraphs: [
          'Always borrow (`for &x in &nums[1..]`) rather than moving ownership into the loop, and use `continue` to skip even values cleanly.',
        ],
        banglaParagraphs: [
          'লুপের ভেতর মূল ভেক্টরের মালিকানা যেন হারিয়ে না যায় সেজন্য `&arr` দিয়ে বোরো করা হয়েছে ও `continue` দিয়ে জোড় সংখ্যা বাদ দেওয়া হয়েছে।',
        ],
        memoryDiagram: `arr=[2,5,8,7,3] -> &arr slice borrow -> odd_sum=15`,
        code: `use std::io::{self, Read};

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let nums: Vec<i64> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();
    if let Some(&n) = nums.first() {
        let mut odd_sum = 0i64;
        for &x in &nums[1..1 + (n as usize)] {
            if x % 2 == 0 { continue; }
            odd_sum += x;
        }
        println!("{}", odd_sum);
    }
}`,
        stdin: '5\n2 5 8 7 3',
        expectedOutput: '15',
        lineByLine: [
          { lineNumber: 'Line 9', codeSnippet: 'for &x in &nums[1..1 + (n as usize)] {', whatItMeans: 'Borrows slice immutably while copying each i64 element.', whyItIsThere: 'Preserves ownership of nums for later reuse.', ifDeletedError: 'Moving nums prevents accessing it after loop.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 1', codeSnippet: 'fn main() {', whatItMeans: 'Main binary entry point.', whyItIsThere: 'Starts execution.', ifDeletedError: 'Missing main error.' },
      { lineNumber: 'Line 2', codeSnippet: 'let mut sum: i64 = 0;', whatItMeans: 'Mutable 64-bit integer sum accumulator.', whyItIsThere: 'Explicit mutability required for +=.', ifDeletedError: 'Cannot mutate immutable binding.' },
      { lineNumber: 'Line 3', codeSnippet: 'for i in 1..=5 {', whatItMeans: 'Inclusive integer range iterator 1..5.', whyItIsThere: 'Clear off-by-one-safe iteration.', ifDeletedError: 'Body does not repeat.' },
      { lineNumber: 'Line 4', codeSnippet: 'sum += i;', whatItMeans: 'Accumulates current i.', whyItIsThere: 'Advances summation.', ifDeletedError: 'Outputs sum=0.' },
      { lineNumber: 'Line 6', codeSnippet: 'println!("sum={}", sum);', whatItMeans: 'Prints formatted result.', whyItIsThere: 'Emits total to stdout.', ifDeletedError: 'Empty stdout.' },
    ],
    dryRunTable: [
      { step: 1, state: 'let mut sum = 0', memoryOrStack: 'sum=0 (i64)', note: 'Range 1..=5' },
      { step: 2, state: 'i = 1, 2, 3', memoryOrStack: 'sum=6', note: 'Accumulates 1+2+3' },
      { step: 3, state: 'i = 4, 5', memoryOrStack: 'sum=15', note: 'Range exhausted' },
      { step: 4, state: 'println!', memoryOrStack: 'stdout="sum=15"', note: 'Exit 0' },
    ],
    harryBugTraps: [
      { title: 'Forgetting `mut` on Loop Accumulator or Counter', brokenCode: 'let i = 0; while i < 5 { i += 1; } // Compile Error!', fixedCode: 'let mut i = 0; while i < 5 { i += 1; }', whyItBreaks: 'Bindings in Rust default to immutable unless marked mut.' },
      { title: 'Moving Ownership of Vec Inside `for x in v`', brokenCode: 'for x in v { println!("{}", x); }\nprintln!("{}", v.len()); // Use of moved value v!', fixedCode: 'for x in &v { println!("{}", x); }\nprintln!("{}", v.len());', whyItBreaks: 'Iterating by value consumes the Vec; borrow with &v to keep using v afterward.' },
      { title: 'Reversed Range `for i in 5..1` Prints Nothing', brokenCode: 'for i in 5..1 { println!("{}", i); } // 0 iterations!', fixedCode: 'for i in (1..=5).rev() { println!("{}", i); }', whyItBreaks: 'Rust ranges only step upward unless reversed explicitly with .rev().' },
    ],
    practiceSheet: [
      { id: 'rust-ch-7-q1', difficulty: 'Easy', title: '1. Factorial via Inclusive Range', prompt: 'Read u64 n (0..20) and print n!.', banglaHint: '1..=n লুপে ফ্যাক্টোরিয়াল গুণ করো।', starterCode: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    let n: u64 = s.trim().parse().unwrap_or(0);\n    let mut f: u64 = 1; for i in 2..=n { f *= i; }\n    println!("{}", f);\n}`, sampleStdin: '5', expectedOutput: '120' },
      { id: 'rust-ch-7-q2', difficulty: 'Easy', title: '2. Reverse Digits With loop + break', prompt: 'Read non-negative i64 n and print reversed number.', banglaHint: 'loop ব্লক এবং break rev ব্যবহার করো।', starterCode: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    let mut n: i64 = s.trim().parse().unwrap_or(0);\n    let mut rev = 0i64;\n    let ans = loop { rev = rev * 10 + (n % 10); n /= 10; if n == 0 { break rev; } };\n    println!("{}", ans);\n}`, sampleStdin: '1234', expectedOutput: '4321' },
      { id: 'rust-ch-7-q3', difficulty: 'Medium', title: '3. Sum of Digits', prompt: 'Read non-negative i64 n and output sum of digits.', banglaHint: 'while n > 0 লুপে n % 10 যোগ করো।', starterCode: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    let mut n: i64 = s.trim().parse().unwrap_or(0);\n    let mut sum = 0; while n > 0 { sum += n % 10; n /= 10; }\n    println!("{}", sum);\n}`, sampleStdin: '9085', expectedOutput: '22' },
      { id: 'rust-ch-7-q4', difficulty: 'Medium', title: '4. Filtered Maximum Among Evens', prompt: 'Read n and n i64s; print max even integer or -1.', banglaHint: 'Option<i64> ও continue ব্যবহার করো।', starterCode: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    let a: Vec<i64> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();\n    let mut mx: Option<i64> = None;\n    for &x in &a[1..1 + a[0] as usize] {\n        if x % 2 != 0 { continue; }\n        mx = Some(mx.map_or(x, |m| m.max(x)));\n    }\n    println!("{}", mx.unwrap_or(-1));\n}`, sampleStdin: '5\n3 10 7 4 9', expectedOutput: '10' },
      { id: 'rust-ch-7-q5', difficulty: 'Hard', title: '5. O(sqrt(n)) Prime Checker', prompt: 'Read i64 n and output PRIME or COMPOSITE.', banglaHint: 'while d <= n / d ও break ব্যবহার করো।', starterCode: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    let n: i64 = s.trim().parse().unwrap_or(0);\n    let mut ok = n >= 2; let mut d = 2i64;\n    while d <= n / d { if n % d == 0 { ok = false; break; } d += 1; }\n    println!("{}", if ok { "PRIME" } else { "COMPOSITE" });\n}`, sampleStdin: '97', expectedOutput: 'PRIME' },
    ],
    miniBuild: {
      title: 'Rust 2024 Digit Counter & Loop-Break Engine',
      description: 'Uses Rust loop-with-break-value to count decimal digits including 0 cleanly.',
      banglaGoal: 'Rust-এর loop + break value দিয়ে অঙ্ক-গণনা ইঞ্জিন তৈরি।',
      combinesChapters: 'Ch 1–7',
      starterCode: `use std::io::{self, Read};

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let mut x = s.trim().parse::<i64>().unwrap_or(0).abs();
    let mut digits = 0;
    let count = loop {
        digits += 1;
        x /= 10;
        if x == 0 { break digits; }
    };
    println!("digits={}", count);
}`,
      sampleStdin: '7042',
      expectedOutput: 'digits=4',
    },
    starterCode: `use std::io::{self, Read};

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let mut x = s.trim().parse::<i64>().unwrap_or(0).abs();
    let mut digits = 0;
    let count = loop {
        digits += 1;
        x /= 10;
        if x == 0 { break digits; }
    };
    println!("digits={}", count);
}`,
    sampleStdin: '7042',
    expectedSampleOutput: 'digits=4',
    testCases: [
      { id: 'rust7-t1', input: '7042', expectedOutput: 'digits=4' },
      { id: 'rust7-t2', input: '0', expectedOutput: 'digits=1', isHidden: true },
    ],
  },
  8: {
    chapterNumber: 8,
    title: 'Rust Chapter 8 (Rust 2024): Nested Loops, Patterns & Labeled Breaks',
    banglaTitle: 'Rust অধ্যায় ৮ (Rust 2024): নেস্টেড লুপ, প্যাটার্ন ও লেবেলড ব্রেক',
    subtitle: '2D row/column iteration, String capacity preallocation, and labeled outer loop control.',
    zeroIntuition: {
      plainEnglishStory:
        'A nested loop pairs an outer row counter `i` with inner column counters `j` to render grids, star pyramids, and 2D matrix traversals.\n\nIn Rust, pre-allocating a `String::with_capacity(...)` buffer and pushing characters via `push(\'*\')` or `push_str(...)` avoids repeated stdout syscall locks, and Rust natively supports loop labels like `\'outer: for i in ...` so `break \'outer;` exits multiple nesting levels with zero flags.',
      asciiFlowchart: `'outer: for i in 1..=n {
   +--> inner spaces: 0..(n - i) -> out.push(' ')
   +--> inner stars : 0..(2 * i - 1) -> out.push('*')
   +--> out.push('\\n')
}
print!("{}", out);`,
      pseudocode: [
        '1. ALLOCATE String buffer out via String::new()',
        '2. LOOP outer row i in 1..=n',
        '3. PUSH alignment spaces and symbols cleanly inside inner loops',
        '4. PUSH trailing newline per row',
        '5. USE labeled \'outer loops when breaking out of nested searches',
      ],
      banglaZeroToHero: {
        analogyTitle: 'বহুতল ভবনের তলা-কামরা ও স্ট্রিং বাফার',
        explanation:
          'সিনেমা হলের সিট সাজানোর কথা ভাবো: বাইরের লুপ `i` হলো কত নম্বর সারি, আর ভেতরের লুপ `j` হলো ওই সারির প্রতিটি আসন। Rust-এ স্টার বা সংখ্যার প্যাটার্ন আঁকতে `for i in 1..=n` দিয়ে সারি ঘোরানো হয় এবং ভেতরের লুপে প্রতিটি কলাম প্রসেস করা হয়। তবে প্রতিটি তারার জন্য বারবার `print!("*")` ডাকলে Rust স্ট্যান্ডার্ড আউটপুট লক নেয় ও ছাড়ে, তাই আগে একটি `let mut out = String::new();`-এ `out.push(\'*\')` করে সব লাইন জমিয়ে শেষে একবার `print!("{}", out);` করা অনেক দ্রুত এবং পরিচ্ছন্ন। Rust-এর একটি অসাধারণ সুবিধা হলো **Loop Label** (`\'outer: for i in ...`): দুই বা তিনটি নেস্টেড লুপের ভেতর কোনো টার্গেট খুঁজে পেলে কোনো অতিরিক্ত boolean ফ্ল্যাগ ছাড়াই সরাসরি `break \'outer;` লিখে একসাথে সব লুপ থেকে বের হয়ে যাওয়া যায়। পিরামিড প্যাটার্নের জন্য প্রতিটি সারি `i`-তে `n - i`টি স্পেস এবং `2 * i - 1`টি তারা বসাতে হয়। তবে সাবধান: রেঞ্জ `1..=n` না লিখে `1..n` লিখলে শেষ সারি বাদ পড়ে যায় (Off-by-one ভুল), আবার `usize`-এ বিয়োগ `0 - 1` করলে Rust-এ প্যানিক হতে পারে—তাই `(n - i)` গণনার আগে `i <= n` নিশ্চিত করবে। কাগজে সারি আর কলামের ছক এঁকে কোড করলে প্যাটার্ন বানানো খুবই সহজ হবে।',
        everydayExample:
          'ছাপার প্রেসের মতো: প্রতিটি অক্ষর একসাথে একটি প্লেটে (`String` বাফারে) সাজিয়ে নিয়ে তারপর পুরো পৃষ্ঠাটি একবারে কাগজে ছাপানো হয়।',
        keyTakeaways: [
          'আলাদা `print!` বারবার না চালিয়ে `String` বাফারে `push` করে শেষে একবার প্রিন্ট করো।',
          '`\'outer:` লেবেল দিয়ে নেস্টেড লুপ থেকে কোনো boolean ছাড়াই সরাসরি `break \'outer;` করা যায়।',
          'অন্তর্ভুক্তিমূলক সারির জন্য `1..=n` এবং বিয়োগের আগে আন্ডারফ্লো (`usize`) চেক করা জরুরি।',
        ],
      },
    },
    topics: [
      {
        id: 'rust-ch-8-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Right Triangle via Pre-Buffered String',
        englishParagraphs: [
          'Outer loop `i` spans `1..=n` inclusively while inner loop appends `i` asterisks to `out`.',
          'Printing `out` once avoids repeated `stdout().lock()` acquisitions.',
        ],
        banglaParagraphs: [
          'বাইরের লুপ `1..=n` সারি ঘোরায় এবং ভেতরের লুপ প্রতিটি সারিতে `i` সংখ্যক তারা `out` বাফারে যোগ করে।',
          'শেষে একসাথে প্রিন্ট করলে আউটপুট দ্রুত ও সুন্দর হয়।',
        ],
        memoryDiagram: `out: "*\\n**\\n***\\n****\\n"`,
        code: `fn main() {
    let n = 4;
    let mut out = String::new();
    for i in 1..=n {
        for _ in 0..i {
            out.push('*');
        }
        out.push('\\n');
    }
    print!("{}", out);
}`,
        stdin: '',
        expectedOutput: '*\n**\n***\n****',
        lineByLine: [
          { lineNumber: 'Line 3', codeSnippet: 'let mut out = String::new();', whatItMeans: 'Creates heap-backed mutable output buffer.', whyItIsThere: 'Avoids repeated stdout lock/unlock per character.', ifDeletedError: 'Cannot push chars into out.' },
          { lineNumber: 'Line 5', codeSnippet: 'for _ in 0..i { out.push(\'*\'); }', whatItMeans: 'Appends i stars without needing inner index variable.', whyItIsThere: 'Builds triangular row width.', ifDeletedError: 'Empty lines output.' },
        ],
      },
      {
        id: 'rust-ch-8-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Centered Pyramid From Stdin',
        englishParagraphs: [
          'Row `i` (`1..=n`) emits `n - i` spaces followed by `2 * i - 1` stars.',
          'Because `i <= n`, `n - i` never underflows even when `n` and `i` are unsigned `usize`.',
        ],
        banglaParagraphs: [
          'পিরামিডের সারি `i`-তে `n - i`টি স্পেস এবং `2*i - 1`টি তারা যোগ করতে হয়।',
          'যেহেতু `i <= n`, তাই `usize` বিয়োগ কখনো আন্ডারফ্লো প্যানিক করে না।',
        ],
        memoryDiagram: `n=3 -> "  *\\n ***\\n*****\\n"`,
        code: `use std::io::{self, Read};

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    if let Ok(n) = s.trim().parse::<usize>() {
        let mut out = String::new();
        for i in 1..=n {
            for _ in 0..(n - i) { out.push(' '); }
            for _ in 0..(2 * i - 1) { out.push('*'); }
            out.push('\\n');
        }
        print!("{}", out);
    }
}`,
        stdin: '3',
        expectedOutput: '  *\n ***\n*****',
        lineByLine: [
          { lineNumber: 'Line 9', codeSnippet: 'for _ in 0..(n - i) { out.push(\' \'); }', whatItMeans: 'Pads leading centering spaces.', whyItIsThere: 'Aligns odd-count star rows cleanly.', ifDeletedError: 'Pyramid left-aligns incorrectly.' },
        ],
      },
      {
        id: 'rust-ch-8-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Labeled Outer Loop Exit in 2D Search',
        englishParagraphs: [
          'Rust loop labels (`\'outer:`) allow immediate multi-level exit (`break \'outer;`) from nested loops.',
          'You can even return a value directly from labeled `loop` expressions cleanly.',
        ],
        banglaParagraphs: [
          'Rust-এ `\'outer:` লেবেল ব্যবহার করলে নেস্টেড লুপের ভেতর থেকেই একসাথে বাইরে বেরোনো যায়।',
          'এতে আলাদা `found = true` boolean ভ্যারিয়েবল রাখতে হয় না।',
        ],
        memoryDiagram: `'outer finds (2,3) -> i*j==6 -> break 'outer immediately`,
        code: `fn main() {
    let mut ans = (0, 0);
    'outer: for i in 2..=5 {
        for j in 2..=5 {
            if i * j == 6 {
                ans = (i, j);
                break 'outer;
            }
        }
    }
    println!("{},{}", ans.0, ans.1);
}`,
        stdin: '',
        expectedOutput: '2,3',
        lineByLine: [
          { lineNumber: 'Line 3', codeSnippet: '\'outer: for i in 2..=5 {', whatItMeans: 'Tags the outer loop with lifetime-like label \'outer.', whyItIsThere: 'Allows inner loops to break out directly.', ifDeletedError: 'Compile error: undeclared label.' },
          { lineNumber: 'Line 7', codeSnippet: 'break \'outer;', whatItMeans: 'Exits both inner and outer loops at once.', whyItIsThere: 'Preserves earliest match (2,3).', ifDeletedError: 'Inner break alone overwrites with (3,2).' },
        ],
      },
      {
        id: 'rust-ch-8-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'usize Subtraction Underflow Trap vs Checked Order',
        englishParagraphs: [
          'Writing `for _ in 0..(n - i)` when `i` starts at `0` and accidentally steps to `n + 1` panics with `attempt to subtract with overflow` in Rust debug builds.',
          'Keep `i` strictly inside `1..=n` or write `(n.saturating_sub(i))` for bullet-proof unsigned arithmetic.',
        ],
        banglaParagraphs: [
          'ভুল করে `i > n` হয়ে গেলে `usize`-এ `(n - i)` বিয়োগে Rust প্রোগ্রাম প্যানিক করে থেমে যাবে!',
          'নিরাপদ রেঞ্জ `1..=n` অথবা `n.saturating_sub(i)` ব্যবহার করলে আন্ডারফ্লো হয় না।',
        ],
        memoryDiagram: `usize(3 - 4) -> PANIC! | 1..=n guarantees i <= n`,
        code: `use std::fmt::Write;

fn main() {
    let mut out = String::new();
    for i in 1..=3 {
        for j in 1..=i {
            let _ = write!(out, "{}", j);
        }
        out.push('\\n');
    }
    print!("{}", out);
}`,
        stdin: '',
        expectedOutput: '1\n12\n123',
        lineByLine: [
          { lineNumber: 'Line 7', codeSnippet: 'let _ = write!(out, "{}", j);', whatItMeans: 'Formats number directly into String without extra allocation.', whyItIsThere: 'Avoids temporary String allocations from j.to_string().', ifDeletedError: 'Digits missing.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 3', codeSnippet: 'let mut out = String::new();', whatItMeans: 'Allocates mutable string accumulator.', whyItIsThere: 'Collects full output to print once.', ifDeletedError: 'Compile error: cannot find out.' },
      { lineNumber: 'Line 4', codeSnippet: 'for i in 1..=n {', whatItMeans: 'Outer inclusive loop across rows 1..N.', whyItIsThere: 'Tracks row height cleanly.', ifDeletedError: 'Only single row executes.' },
      { lineNumber: 'Line 5', codeSnippet: 'for _ in 0..i { out.push(\'*\'); }', whatItMeans: 'Inner loop repeating i times.', whyItIsThere: 'Appends row stars.', ifDeletedError: 'Empty rows printed.' },
      { lineNumber: 'Line 10', codeSnippet: 'print!("{}", out);', whatItMeans: 'Writes complete pattern to stdout.', whyItIsThere: 'Single fast write without extra trailing blank line.', ifDeletedError: 'Silent exit.' },
    ],
    dryRunTable: [
      { step: 1, state: 'i = 1', memoryOrStack: 'out = "*\\n"', note: '1 star pushed' },
      { step: 2, state: 'i = 2', memoryOrStack: 'out = "*\\n**\\n"', note: '2 stars pushed' },
      { step: 3, state: 'i = 3', memoryOrStack: 'out += "***\\n"', note: '3 stars pushed' },
      { step: 4, state: 'i = 4', memoryOrStack: 'out += "****\\n"', note: 'Single print outputs 4 rows' },
    ],
    harryBugTraps: [
      { title: 'Trap 1: Unsigned usize Underflow in Nested Patterns', brokenCode: `let n: usize = 3; let x = n - 4; // PANIC in debug mode!`, fixedCode: `let n: usize = 3; let x = n.saturating_sub(4);`, whyItBreaks: 'Rust panics on unsigned integer subtraction overflow in debug builds and wraps silently in release.' },
      { title: 'Trap 2: Exclusive 1..n Skipping the Final Row', brokenCode: `for i in 1..n { /* prints n-1 rows! */ }`, fixedCode: `for i in 1..=n { /* prints exact n rows */ }`, whyItBreaks: 'Rust ranges a..b exclude b; inclusive patterns require ..=.' },
      { title: 'Trap 3: Breaking Only Inner Loop Instead of Outer', brokenCode: `for i in 0..n { for j in 0..n { if ok { break; } } }`, fixedCode: `'outer: for i in 0..n { for j in 0..n { if ok { break 'outer; } } }`, whyItBreaks: 'Plain break leaves only the inner j loop and keeps scanning outer rows.' },
    ],
    practiceSheet: [
      { id: 'rust-ch8-p1', difficulty: 'Easy', title: 'N×N Star Square', prompt: 'Read N and print an N×N square of `*`.', banglaHint: 'দুটি `0..n` নেস্টেড লুপ দিয়ে `String`-এ পুশ করো।', starterCode: `use std::io::{self, Read};\nfn main(){ let mut s=String::new(); io::stdin().read_to_string(&mut s).unwrap(); let n:usize=s.trim().parse().unwrap(); let mut out=String::new(); for _ in 0..n { for _ in 0..n { out.push('*'); } out.push('\\n'); } print!("{}", out); }`, sampleStdin: '3', expectedOutput: '***\n***\n***' },
      { id: 'rust-ch8-p2', difficulty: 'Easy', title: 'Inverted Triangle', prompt: 'Print N down to 1 stars across N rows.', banglaHint: 'ভেতরের লুপ `0..(n - i)` চালাও।', starterCode: `use std::io::{self, Read};\nfn main(){ let mut s=String::new(); io::stdin().read_to_string(&mut s).unwrap(); let n:usize=s.trim().parse().unwrap(); let mut out=String::new(); for i in 0..n { for _ in 0..(n-i) { out.push('*'); } out.push('\\n'); } print!("{}", out); }`, sampleStdin: '3', expectedOutput: '***\n**\n*' },
      { id: 'rust-ch8-p3', difficulty: 'Medium', title: 'Number Triangle 1..i', prompt: 'Print digits `1..=i` on row `i`.', banglaHint: '`use std::fmt::Write;` দিয়ে `write!(out, "{}", j)` করো।', starterCode: `use std::io::{self, Read};\nuse std::fmt::Write;\nfn main(){ let mut s=String::new(); io::stdin().read_to_string(&mut s).unwrap(); let n:usize=s.trim().parse().unwrap(); let mut out=String::new(); for i in 1..=n { for j in 1..=i { let _=write!(out,"{}",j); } out.push('\\n'); } print!("{}", out); }`, sampleStdin: '3', expectedOutput: '1\n12\n123' },
      { id: 'rust-ch8-p4', difficulty: 'Medium', title: 'Floyd Counter Triangle', prompt: 'Print 1, 2 3, 4 5 6 across N rows.', banglaHint: 'বাইরে `let mut k = 1;` রাখো।', starterCode: `use std::io::{self, Read};\nuse std::fmt::Write;\nfn main(){ let mut s=String::new(); io::stdin().read_to_string(&mut s).unwrap(); let n:usize=s.trim().parse().unwrap(); let mut out=String::new(); let mut k=1; for i in 1..=n { for j in 1..=i { if j>1 { out.push(' '); } let _=write!(out,"{}",k); k+=1; } out.push('\\n'); } print!("{}", out); }`, sampleStdin: '3', expectedOutput: '1\n2 3\n4 5 6' },
      { id: 'rust-ch8-p5', difficulty: 'Hard', title: 'Checkerboard Parity Grid', prompt: 'Print an N×N grid alternating 1 and 0 via `(i + j) % 2`.', banglaHint: '`(i + j) % 2 == 0` হলে `1` নতুবা `0` পুশ করো।', starterCode: `use std::io::{self, Read};\nfn main(){ let mut s=String::new(); io::stdin().read_to_string(&mut s).unwrap(); let n:usize=s.trim().parse().unwrap(); let mut out=String::new(); for i in 0..n { for j in 0..n { out.push(if (i+j)%2==0 {'1'} else {'0'}); } out.push('\\n'); } print!("{}", out); }`, sampleStdin: '3', expectedOutput: '101\n010\n101' },
    ],
    miniBuild: {
      title: 'Mini-Build: Fast String-Buffered Pyramid',
      description: 'Parse N from stdin and assemble a centered pyramid inside one pre-buffered String.',
      banglaGoal: 'স্পেস ও স্টার লুপ মিলিয়ে পরিচ্ছন্ন পিরামিড আউটপুট তৈরি করো।',
      combinesChapters: 'Rust Ch 1–8',
      starterCode: `use std::io::{self, Read};

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    if let Ok(n) = s.trim().parse::<usize>() {
        let mut out = String::new();
        for i in 1..=n {
            for _ in 0..(n - i) { out.push(' '); }
            for _ in 0..(2 * i - 1) { out.push('*'); }
            out.push('\\n');
        }
        print!("{}", out);
    }
}`,
      sampleStdin: '3',
      expectedOutput: '  *\n ***\n*****',
    },
    starterCode: `use std::io::{self, Read};

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    if let Ok(n) = s.trim().parse::<usize>() {
        let mut out = String::new();
        for i in 1..=n {
            for _ in 0..(n - i) { out.push(' '); }
            for _ in 0..(2 * i - 1) { out.push('*'); }
            out.push('\\n');
        }
        print!("{}", out);
    }
}`,
    sampleStdin: '3',
    expectedSampleOutput: '  *\n ***\n*****',
    testCases: [
      { id: 'rust8-t1', input: '3', expectedOutput: '  *\n ***\n*****' },
      { id: 'rust8-t2', input: '2', expectedOutput: ' *\n***', isHidden: true },
    ],
  },
  9: {
    chapterNumber: 9,
    title: 'Rust Chapter 9 (Rust 2024): Functions, Expression Returns & Mutable Refs',
    banglaTitle: 'Rust অধ্যায় ৯ (Rust 2024): ফাংশন, এক্সপ্রেশন রিটার্ন ও মিউটেবল রেফারেন্স',
    subtitle: 'Explicit parameter types, tail-expression returns, stack frames, and &mut swap ergonomics.',
    zeroIntuition: {
      plainEnglishStory:
        'Rust functions declare every parameter and return type explicitly using `fn name(a: i64, b: i64) -> i64`. Notice Rust’s signature expression rule: the final expression of a block *without a trailing semicolon* is automatically returned—putting a `;` after it turns it into a `()` unit statement and triggers a compile error!\n\nTo mutate a caller’s variable inside a helper (like swapping two integers), pass an explicit mutable borrow `&mut x` and dereference with `*a`. Rust checks at compile time that no two mutable borrows conflict.',
      asciiFlowchart: `main() frame [ x=10, y=20 ]
   |
   +--> calls my_swap(&mut x, &mut y) -> swaps *a and *b in place!
   +--> calls lcm(24, 36) -> gcd(24, 36) -> returns 72 via tail expression`,
      pseudocode: [
        '1. DECLARE parameter types and -> ReturnType explicitly on every fn',
        '2. OMIT trailing semicolon on final return expression (or use return)',
        '3. PASS &mut T only when helper genuinely mutates caller state',
        '4. REUSE small focused helpers like gcd/lcm cleanly',
      ],
      banglaZeroToHero: {
        analogyTitle: 'স্পষ্ট চুক্তিপত্র ও সেমিকোলনহীন রিটার্ন',
        explanation:
          'বড় কাজের দায়িত্ব যেমন আলাদা আলাদা দক্ষ কর্মীকে ভাগ করে দেওয়া হয়, Rust-এ তেমনি ছোট ছোট `fn` তৈরি করা হয়। তবে Rust একটু বেশি শৃঙ্খলাবদ্ধ: প্রতিটি ফাংশনে ইনপুট প্যারামিটারের টাইপ এবং `-> ReturnType` স্পষ্ট করে লিখতে হয়। Rust-এর সবচেয়ে মজার নিয়ম হলো এর **Expression Return**: ফাংশনের একদম শেষ লাইনে `return` না লিখে যদি সেমিকোলন ছাড়া শুধু ভ্যালু (`a + b`) লিখে দাও, Rust সেটাই স্বয়ংক্রিয়ভাবে রিটার্ন করে! কিন্তু ভুল করে শেষে `;` বসিয়ে দিলে সেটি ফাঁকা `()` (unit) হয়ে যাবে এবং কম্পাইলার সাথে সাথে এরর দেখাবে। ফাংশনের ভেতরের সব ভ্যারিয়েবল নিজস্ব Stack Frame-এ থাকে। যদি কোনো ফাংশন দিয়ে বাইরের দুটি ভ্যারিয়েবল সত্যিই বদলাতে (যেমন swap করতে) চাও, তবে `&mut x` (mutable reference) পাঠাতে হবে এবং ভেতরে `*a` দিয়ে মান পরিবর্তন করতে হবে। একটি ভালো নিয়ম হলো যেই ফাংশন শুধু হিসাব করে সেগুলোকে `&mut` না দিয়ে বিশুদ্ধ (pure) রাখা। ছোট ছোট `gcd`, `lcm`, বা `is_prime` ফাংশন বানিয়ে নিলে মূল `main()` পড়া ও টেস্ট করা অত্যন্ত সহজ হয়।',
        everydayExample:
          'দোকানের রসিদে শেষ মোট অঙ্কটা যেমন কোনো দাড়ি-কমা ছাড়াই বড় করে চূড়ান্ত মূল্য বোঝায়, Rust-এ সেমিকোলনহীন শেষ লাইনটিই ফাংশনের চূড়ান্ত রিটার্ন মান।',
        keyTakeaways: [
          'ফাংশনের শেষ লাইনে সেমিকোলন না দিলে সেই মানটিই স্বয়ংক্রিয়ভাবে রিটার্ন হয়।',
          'প্যারামিটার ও রিটার্ন টাইপ (`-> i64`) সবসময় স্পষ্টভাবে লিখতে হবে।',
          'মেইনের ভ্যারিয়েবল সরাসরি বদলাতে `&mut T` ও `*` ডিরেফারেন্স ব্যবহার করা হয়।',
        ],
      },
    },
    topics: [
      {
        id: 'rust-ch-9-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Expression-Based Return Function',
        englishParagraphs: [
          'Writing `x * x` without a trailing semicolon evaluates and returns the `i64` directly from `square`.',
          'Type inference inside the body remains strict against the `-> i64` signature.',
        ],
        banglaParagraphs: [
          'শেষ লাইন `x * x`-এ কোনো সেমিকোলন না দেওয়ায় সেটি সরাসরি `i64` হিসেবে রিটার্ন হয়।',
          '`-> i64` সিগনেচার টাইপ-সেফটি নিশ্চিত করে।',
        ],
        memoryDiagram: `main -> square(7) frame -> evaluates 7*7=49 -> returns 49`,
        code: `fn square(x: i64) -> i64 {
    x * x
}

fn main() {
    println!("{}", square(7));
}`,
        stdin: '',
        expectedOutput: '49',
        lineByLine: [
          { lineNumber: 'Line 1', codeSnippet: 'fn square(x: i64) -> i64 {', whatItMeans: 'Function taking i64 and returning i64.', whyItIsThere: 'Rust requires explicit fn signatures.', ifDeletedError: 'Compile error.' },
          { lineNumber: 'Line 2', codeSnippet: 'x * x', whatItMeans: 'Tail expression returned cleanly without semicolon.', whyItIsThere: 'Idiomatic Rust expression return.', ifDeletedError: 'mismatched types: expected i64, found ().' },
        ],
      },
      {
        id: 'rust-ch-9-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Modular Euclidean GCD & Overflow-Safe LCM',
        englishParagraphs: [
          'Defining `gcd` and calling it inside `lcm` separates responsibilities cleanly and prevents 64-bit multiplication overflow via `(a / gcd(a, b)) * b`.',
          'Using `mut a: i64` directly in parameter bindings avoids declaring extra local mutable copies.',
        ],
        banglaParagraphs: [
          'প্যারামিটারেই `mut a: i64` লিখলে ভেতরে আলাদা `let mut` করতে হয় না।',
          '`lcm`-এ গুণের আগে `gcd` দিয়ে ভাগ করলে ওভারফ্লো প্রতিরোধ হয়।',
        ],
        memoryDiagram: `gcd(24,36)->12 | lcm=(24/12)*36=72`,
        code: `use std::io::{self, Read};

fn gcd(mut a: i64, mut b: i64) -> i64 {
    while b != 0 {
        let t = a % b;
        a = b;
        b = t;
    }
    a
}

fn lcm(a: i64, b: i64) -> i64 {
    if a == 0 || b == 0 { 0 } else { (a / gcd(a, b)) * b }
}

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let nums: Vec<i64> = s.split_whitespace().filter_map(|x| x.parse().ok()).collect();
    if nums.len() >= 2 {
        println!("gcd={} lcm={}", gcd(nums[0], nums[1]), lcm(nums[0], nums[1]));
    }
}`,
        stdin: '24 36',
        expectedOutput: 'gcd=12 lcm=72',
        lineByLine: [
          { lineNumber: 'Line 3', codeSnippet: 'fn gcd(mut a: i64, mut b: i64) -> i64 {', whatItMeans: 'Allows mutating local copies a and b inside gcd.', whyItIsThere: 'Caller variables remain unaffected.', ifDeletedError: 'Cannot assign twice to immutable variables a/b.' },
        ],
      },
      {
        id: 'rust-ch-9-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'In-Place Mutable Reference Swap (&mut i64)',
        englishParagraphs: [
          'Passing `&mut x` and `&mut y` grants exclusive temporary write permission to `my_swap`.',
          '`std::mem::swap(a, b)` does the same swap natively in standard library code.',
        ],
        banglaParagraphs: [
          '`&mut x, &mut y` পাঠালে `my_swap` ফাংশন সরাসরি মেইনের মূল ভ্যারিয়েবল অদলবদল করতে পারে।',
          '`*a` হলো রেফারেন্সের ভেতরের আসল মান পড়ার ও লেখার উপায়।',
        ],
        memoryDiagram: `main(x=10, y=20) -> my_swap(&mut x, &mut y) -> (x=20, y=10)`,
        code: `fn my_swap(a: &mut i64, b: &mut i64) {
    let tmp = *a;
    *a = *b;
    *b = tmp;
}

fn main() {
    let (mut x, mut y) = (10, 20);
    my_swap(&mut x, &mut y);
    println!("{} {}", x, y);
}`,
        stdin: '',
        expectedOutput: '20 10',
        lineByLine: [
          { lineNumber: 'Line 1', codeSnippet: 'fn my_swap(a: &mut i64, b: &mut i64) {', whatItMeans: 'Accepts two exclusive mutable borrows.', whyItIsThere: 'Modifies caller slots directly.', ifDeletedError: 'Cannot swap caller state.' },
        ],
      },
      {
        id: 'rust-ch-9-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Trailing Semicolon Trap vs Expression Return',
        englishParagraphs: [
          'Adding a semicolon on `a + b;` turns the tail expression into a statement evaluating to `()` unit—breaking any `-> i64` function.',
          'Also note Rust `if/else` is an expression, so `if x >= 0 { x } else { -x }` returns cleanly without `return`.',
        ],
        banglaParagraphs: [
          'শেষ লাইনে ভুল করে `;` দিলে Rust ভাবে ফাংশনটি ফাঁকা `()` রিটার্ন করছে—ফলে কম্পাইল এরর হয়!',
          'Rust-এ `if/else`-ও একটি এক্সপ্রেশন, তাই ব্র্যাকেট থেকে সরাসরি মান রিটার্ন করা যায়।',
        ],
        memoryDiagram: `{ a + b; } -> () unit ERROR | { a + b } -> i64 OK!`,
        code: `fn abs_diff(a: i64, b: i64) -> i64 {
    if a >= b { a - b } else { b - a }
}

fn main() {
    println!("{}", abs_diff(11, 25));
}`,
        stdin: '',
        expectedOutput: '14',
        lineByLine: [
          { lineNumber: 'Line 2', codeSnippet: 'if a >= b { a - b } else { b - a }', whatItMeans: 'Expression-based conditional return.', whyItIsThere: 'Cleanly returns whichever difference is non-negative.', ifDeletedError: 'Expected i64, found ().' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 1', codeSnippet: 'fn square(x: i64) -> i64 {', whatItMeans: 'Declares function signature with strict parameter and return types.', whyItIsThere: 'Rust requires explicit types at function boundaries.', ifDeletedError: 'Syntax error.' },
      { lineNumber: 'Line 2', codeSnippet: 'x * x', whatItMeans: 'Tail expression without semicolon acting as return value.', whyItIsThere: 'Zero-boilerplate expression return.', ifDeletedError: 'Compile error: mismatched return type ().' },
      { lineNumber: 'Line 6', codeSnippet: 'println!("{}", square(7));', whatItMeans: 'Calls square(7) and formats 49.', whyItIsThere: 'Tests helper from main.', ifDeletedError: 'No output.' },
    ],
    dryRunTable: [
      { step: 1, state: 'call square(7)', memoryOrStack: 'stack frame x: i64 = 7', note: 'Allocate local binding x' },
      { step: 2, state: 'eval x * x', memoryOrStack: '7 * 7 = 49', note: 'Tail expression evaluates to i64' },
      { step: 3, state: 'pop frame', memoryOrStack: 'return 49', note: 'Returns 49 to println!' },
      { step: 4, state: 'stdout: 49', memoryOrStack: 'main ends', note: 'Clean exit 0' },
    ],
    harryBugTraps: [
      { title: 'Trap 1: Semicolon on Final Return Expression', brokenCode: `fn add(a: i64, b: i64) -> i64 {\n    a + b;\n}`, fixedCode: `fn add(a: i64, b: i64) -> i64 {\n    a + b\n}`, whyItBreaks: 'A trailing semicolon turns the block result into () unit instead of i64.' },
      { title: 'Trap 2: Passing Same Variable Twice as &mut', brokenCode: `my_swap(&mut x, &mut x); // ERROR: second mutable borrow!`, fixedCode: `if idx1 != idx2 { ... }`, whyItBreaks: 'Rust forbids two simultaneous &mut references to the same memory slot.' },
      { title: 'Trap 3: Omitting Parameter Type Annotations', brokenCode: `fn dbl(x) -> i64 { x * 2 }`, fixedCode: `fn dbl(x: i64) -> i64 { x * 2 }`, whyItBreaks: 'Unlike closures, named fn definitions never infer parameter types.' },
    ],
    practiceSheet: [
      { id: 'rust-ch9-p1', difficulty: 'Easy', title: 'Max of Three fn', prompt: 'Write `fn max3(a: i64, b: i64, c: i64) -> i64`.', banglaHint: '`a.max(b).max(c)` সেমিকোলন ছাড়া রিটার্ন করো।', starterCode: `use std::io::{self, Read};\nfn max3(a:i64,b:i64,c:i64)->i64{ a.max(b).max(c) }\nfn main(){ let mut s=String::new(); io::stdin().read_to_string(&mut s).unwrap(); let v:Vec<i64>=s.split_whitespace().map(|x|x.parse().unwrap()).collect(); println!("{}",max3(v[0],v[1],v[2])); }`, sampleStdin: '4 19 7', expectedOutput: '19' },
      { id: 'rust-ch9-p2', difficulty: 'Easy', title: 'Boolean Even Helper', prompt: 'Write `fn is_even(n: i64) -> bool`.', banglaHint: '`n % 2 == 0` রিটার্ন করো।', starterCode: `use std::io::{self, Read};\nfn is_even(n:i64)->bool{ n%2==0 }\nfn main(){ let mut s=String::new(); io::stdin().read_to_string(&mut s).unwrap(); let n:i64=s.trim().parse().unwrap(); println!("{}",is_even(n)); }`, sampleStdin: '42', expectedOutput: 'true' },
      { id: 'rust-ch9-p3', difficulty: 'Medium', title: 'In-Place Sort Two via &mut', prompt: 'Write `fn order2(a: &mut i64, b: &mut i64)` ensuring `*a <= *b`.', banglaHint: '`if *a > *b` হলে `std::mem::swap(a, b)` করো।', starterCode: `use std::io::{self, Read};\nfn order2(a:&mut i64,b:&mut i64){ if *a>*b { std::mem::swap(a,b); } }\nfn main(){ let mut s=String::new(); io::stdin().read_to_string(&mut s).unwrap(); let v:Vec<i64>=s.split_whitespace().map(|x|x.parse().unwrap()).collect(); let (mut x,mut y)=(v[0],v[1]); order2(&mut x,&mut y); println!("{} {}",x,y); }`, sampleStdin: '25 9', expectedOutput: '9 25' },
      { id: 'rust-ch9-p4', difficulty: 'Medium', title: 'GCD & LCM Pair', prompt: 'Implement `gcd` and `lcm` returning `(gcd, lcm)`.', banglaHint: 'আগে `gcd` ভাগ করে পরে গুণ করো।', starterCode: `use std::io::{self, Read};\nfn gcd(mut a:i64,mut b:i64)->i64{while b!=0{let t=a%b;a=b;b=t;}a}\nfn lcm(a:i64,b:i64)->i64{(a/gcd(a,b))*b}\nfn main(){ let mut s=String::new(); io::stdin().read_to_string(&mut s).unwrap(); let v:Vec<i64>=s.split_whitespace().map(|x|x.parse().unwrap()).collect(); println!("{} {}",gcd(v[0],v[1]),lcm(v[0],v[1])); }`, sampleStdin: '12 18', expectedOutput: '6 36' },
      { id: 'rust-ch9-p5', difficulty: 'Hard', title: 'Fast Modular Power Helper', prompt: 'Write `fn mod_pow(mut base: i64, mut exp: i64, m: i64) -> i64`.', banglaHint: '`while exp > 0` লুপে `exp & 1` ও `exp >>= 1` ব্যবহার করো।', starterCode: `use std::io::{self, Read};\nfn mod_pow(mut b:i64,mut e:i64,m:i64)->i64{let mut r=1;b%=m;while e>0{if e&1==1{r=r*b%m;}b=b*b%m;e>>=1;}r}\nfn main(){ let mut s=String::new(); io::stdin().read_to_string(&mut s).unwrap(); let v:Vec<i64>=s.split_whitespace().map(|x|x.parse().unwrap()).collect(); println!("{}",mod_pow(v[0],v[1],1000000007)); }`, sampleStdin: '2 10', expectedOutput: '1024' },
    ],
    miniBuild: {
      title: 'Mini-Build: Modular GCD & LCM Utility',
      description: 'Read two integers and compute GCD and overflow-safe LCM using pure Rust helpers.',
      banglaGoal: 'পিওর Rust ফাংশন দিয়ে নিরাপদ GCD ও LCM ক্যালকুলেটর বানাও।',
      combinesChapters: 'Rust Ch 1–9',
      starterCode: `use std::io::{self, Read};

fn gcd(mut a: i64, mut b: i64) -> i64 {
    while b != 0 {
        let t = a % b;
        a = b;
        b = t;
    }
    a
}

fn lcm(a: i64, b: i64) -> i64 {
    if a == 0 || b == 0 { 0 } else { (a / gcd(a, b)) * b }
}

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let v: Vec<i64> = s.split_whitespace().filter_map(|x| x.parse().ok()).collect();
    if v.len() >= 2 {
        println!("gcd={} lcm={}", gcd(v[0], v[1]), lcm(v[0], v[1]));
    }
}`,
      sampleStdin: '24 36',
      expectedOutput: 'gcd=12 lcm=72',
    },
    starterCode: `use std::io::{self, Read};

fn gcd(mut a: i64, mut b: i64) -> i64 {
    while b != 0 {
        let t = a % b;
        a = b;
        b = t;
    }
    a
}

fn lcm(a: i64, b: i64) -> i64 {
    if a == 0 || b == 0 { 0 } else { (a / gcd(a, b)) * b }
}

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let v: Vec<i64> = s.split_whitespace().filter_map(|x| x.parse().ok()).collect();
    if v.len() >= 2 {
        println!("gcd={} lcm={}", gcd(v[0], v[1]), lcm(v[0], v[1]));
    }
}`,
    sampleStdin: '24 36',
    expectedSampleOutput: 'gcd=12 lcm=72',
    testCases: [
      { id: 'rust9-t1', input: '24 36', expectedOutput: 'gcd=12 lcm=72' },
      { id: 'rust9-t2', input: '14 21', expectedOutput: 'gcd=7 lcm=42', isHidden: true },
    ],
  },
  10: {
    chapterNumber: 10,
    isMilestoneMerger: true,
    title: 'Rust Chapter 10 (Rust 2024): Time & Space Complexity (Big-O & 10^8 Rule)',
    banglaTitle: 'Rust অধ্যায় ১০ (Rust 2024): টাইম ও স্পেস কমপ্লেক্সিটি (Big-O ও ১০^৮ রুল)',
    subtitle: 'Zero-cost LLVM machine speed, O(1) i64 math, BufWriter fast stdout, and avoiding O(N^2) traps.',
    zeroIntuition: {
      plainEnglishStory:
        'Big-O measures how execution steps scale as input `N` grows. Under `--release`, LLVM compiles Rust down to native machine instructions matching C++ (`~10^8–3×10^8` simple operations per second)—yet even Rust will hit Time Limit Exceeded (TLE) if an `O(N^2)` loop runs `10^10` iterations on `N = 100,000`!\n\nReplacing loops with `O(1)` Gaussian algebra `(n / 2) * (n + 1)` using `i64` (or `i128` for products up to `10^36`) drops runtime to nanoseconds. Just as important in Rust I/O: calling `println!` `10^5` times acquires and flushes `stdout` lock `10^5` times—buffer output via `BufWriter` or a single `String` to avoid I/O TLE.',
      asciiFlowchart: `N = 100,000 (Judge 1s budget ≈ 10^8 ops)
   |
   +--> O(N^2) nested loop       : 10^10 ops  ==> TLE even in Rust!
   +--> O(N log N) slice.sort    : 1.7×10^6   ==> ~0.01s AC!
   +--> O(1) Gaussian algebra    : 3 CPU ops  ==> Instant AC!`,
      pseudocode: [
        '1. INSPECT constraint N against 10^8 ops/sec budget',
        '2. REPLACE O(N^2) loops with O(sqrt(N)), O(N), or O(1) algebra',
        '3. PREVENT overflow by factoring out / 2 first or widening to i64 / i128',
        '4. BUFFER 10^5 stdout writes in String / BufWriter instead of repeated println!',
      ],
      banglaZeroToHero: {
        analogyTitle: 'LLVM নেটিভ গতি, সময়ের বাজেট ও I/O লক',
        explanation:
          'মনে করো ১ লাখ মানুষ সবাই সবার সাথে হাত মেলালে (`O(N^2)`) প্রায় এক হাজার কোটি ধাপ লাগে—Rust পৃথিবীর অন্যতম দ্রুত ল্যাঙ্গুয়েজ হলেও `O(N^2)` কোডে ১০০ সেকেন্ড পেরিয়ে TLE খাবেই! অথচ `n * (n - 1) / 2` সূত্র লিখলে মাত্র `O(1)` সময়েই নির্ভুল উত্তর পাওয়া যায়। কনটেস্টে সাধারণত ১ সেকেন্ডে ~`10^8` সাধারণ অপারেশন চলে, তাই `N = 10^5` দেখামাত্র `O(N log N)` বা `O(N)` ভাবতে হবে। তবে Rust-এ দুটি নিজস্ব পারফরম্যান্স ফাঁদ আছে: প্রথমত, প্রতিটি লুপ ধাপে `println!` ডাকলে Rust প্রতিবার স্ট্যান্ডার্ড আউটপুট লক নেয় ও ছাড়ে, তাই বড় আউটপুটে `String` বা `BufWriter` ব্যবহার করবে। দ্বিতীয়ত, `i32` টাইপে `100000 * 100001` গুণ করলে সাথে সাথে র‍্যাপ/প্যানিক ঘটে—তাই বড় যোগফলে সবসময় `i64` (অথবা আরও বড় গুণের জন্য `i128`) ব্যবহার করা বুদ্ধিমানের কাজ। ভাজক গণনা বা প্রাইম টেস্টের মতো ক্ষেত্রে `d * d <= n` চালালে কাজ মাত্র `O(sqrt(N))` ধাপে নেমে আসে। কোড লেখার আগে সবসময় প্রশ্নের সর্বোচ্চ `N` দেখেই কমপ্লেক্সিটি হিসাব করবে।',
        everydayExample:
          'সুপারকার (Rust) চালালেও যদি তুমি শহরের সব রাস্তায় ঘুরে ঘুরে ঠিকানা খোঁজো (`O(N^2)`) তবে দেরি হবে; হাইওয়ে ম্যাপ (`O(1)` বা `O(log N)`) ধরে গেলে মুহূর্তেই পৌঁছে যাবে।',
        keyTakeaways: [
          '১ সেকেন্ডে ~`10^8` অপারেশন সীমা মেনে `N = 10^5`-এ `O(N^2)` লুপ বর্জন করো।',
          'গুণফলে ওভারফ্লো বাঁচাতে `i64` (প্রয়োজনে `i128`) নাও এবং আগে জোড় সংখ্যাকে ২ দিয়ে ভাগ করো।',
          'হাজার হাজার লাইন প্রিন্টে `println!` বারবার না ডেকে `String` বা `BufWriter` ব্যবহার করো।',
        ],
      },
    },
    topics: [
      {
        id: 'rust-ch-10-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'O(1) 64-Bit Gaussian Sum vs Loop',
        englishParagraphs: [
          'Dividing whichever of `n` or `n + 1` is even before multiplying keeps intermediate values within `i64` for `N` up to ~4.29×10^9.',
          'Runs in `O(1)` constant CPU cycles instead of `O(N)` loop steps.',
        ],
        banglaParagraphs: [
          'জোড় ফ্যাক্টরটি আগে ২ দিয়ে ভাগ করে গুণ করলে `i64` সীমার ভেতরে আরও বড় মান পর্যন্ত নির্ভুল থাকে এবং কাজ মাত্র `O(1)` সময়ে হয়।',
          'এতে কোনো লুপই চালাতে হয় না।',
        ],
        memoryDiagram: `n=100000_i64 -> (100000/2)*100001 = 5000050000 (O(1))`,
        code: `fn main() {
    let n: i64 = 100000;
    let ans = if n % 2 == 0 { (n / 2) * (n + 1) } else { n * ((n + 1) / 2) };
    println!("{}", ans);
}`,
        stdin: '',
        expectedOutput: '5000050000',
        lineByLine: [
          { lineNumber: 'Line 3', codeSnippet: 'let ans = if n % 2 == 0 { (n / 2) * (n + 1) } else { n * ((n + 1) / 2) };', whatItMeans: 'Constant-time closed-form sum.', whyItIsThere: 'Eliminates O(N) iteration and reduces multiply size.', ifDeletedError: 'ans undefined.' },
        ],
      },
      {
        id: 'rust-ch-10-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'O(sqrt(N)) Divisor Counter With i64',
        englishParagraphs: [
          'Testing `d` while `d * d <= n` pairs every divisor `d` below `sqrt(N)` with `n / d` above it.',
          'Runs in `O(sqrt(N))`, clearing `N = 10^12` cleanly in milliseconds.',
        ],
        banglaParagraphs: [
          '`d * d <= n` পর্যন্ত লুপ চালিয়ে `10^12` পর্যন্ত সংখ্যার সব ভাজক মাত্র কয়েক মিলিসেকেন্ডে গোনা যায়।',
          '`d` অবশ্যই `i64` হবে নতুবা `d * d` ওভারফ্লো করবে।',
        ],
        memoryDiagram: `n=36 -> d=1,2,3,4,6 -> total 9 divisors`,
        code: `use std::io::{self, Read};

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    if let Ok(n) = s.trim().parse::<i64>() {
        let mut cnt = 0_i64;
        let mut d = 1_i64;
        while d * d <= n {
            if n % d == 0 {
                cnt += if d * d == n { 1 } else { 2 };
            }
            d += 1;
        }
        println!("{}", cnt);
    }
}`,
        stdin: '36',
        expectedOutput: '9',
        lineByLine: [
          { lineNumber: 'Line 9', codeSnippet: 'while d * d <= n {', whatItMeans: 'Iterates up to sqrt(n) via exact integer math.', whyItIsThere: 'Achieves O(sqrt(N)) complexity.', ifDeletedError: 'Runs O(N) TLE.' },
        ],
      },
      {
        id: 'rust-ch-10-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Constraint Tier Classifier',
        englishParagraphs: [
          'Checking input upper bound `N` before picking an algorithm prevents writing quadratic logic against `10^5` inputs.',
          'Rust `match` arms map constraint intervals clearly.',
        ],
        banglaParagraphs: [
          'ইনপুট `N`-এর সীমা দেখেই কোন অ্যালগরিদম পাস করবে তা `match` দিয়ে চমৎকারভাবে শ্রেণিবদ্ধ করা যায়।',
          'এতে কনটেস্টে TLE ঝুঁকি শূন্যে নামে।',
        ],
        memoryDiagram: `200000 -> match 10001..=200000 => O(N_LOG_N)`,
        code: `use std::io::{self, Read};

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    if let Ok(n) = s.trim().parse::<i64>() {
        let tier = match n {
            ..=10000 => "O(N^2)_OK",
            ..=200000 => "O(N_LOG_N)",
            _ => "O(N)_OR_O(1)",
        };
        println!("{}", tier);
    }
}`,
        stdin: '200000',
        expectedOutput: 'O(N_LOG_N)',
        lineByLine: [
          { lineNumber: 'Line 9', codeSnippet: '..=200000 => "O(N_LOG_N)",', whatItMeans: 'Range pattern classifying standard sorting/tree inputs.', whyItIsThere: 'Cleanly partitions constraint scale.', ifDeletedError: 'Matches wrong tier.' },
        ],
      },
      {
        id: 'rust-ch-10-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'O(log B) Binary Exponentiation With i128 Safety',
        englishParagraphs: [
          'If `mod` approaches `10^18`, multiplying two `i64` numbers overflows `i64` (`9.22×10^18`)! Widening intermediate multiplication to `i128` keeps `(a * b) % m` 100% overflow-free.',
          'Halving `exp >>= 1` resolves `(a^b) % m` in `O(log b)` steps.',
        ],
        banglaParagraphs: [
          'মডুলাস বড় হলে `(a * b) % m` গুণফলে `i64` ওভারফ্লো হতে পারে; Rust-এ `i128` দিয়ে সহজেই ওভারফ্লো রোধ করা যায়।',
          'বাইনারি এক্সপোনেনশিয়েশন মাত্র `O(log exp)` ধাপে চলে।',
        ],
        memoryDiagram: `mod_pow(2, 10, 1e9+7) -> 1024 in O(log 10)`,
        code: `fn mod_pow(mut base: i128, mut exp: i64, m: i128) -> i128 {
    let mut res = 1 % m;
    base %= m;
    while exp > 0 {
        if exp & 1 == 1 { res = (res * base) % m; }
        base = (base * base) % m;
        exp >>= 1;
    }
    res
}

fn main() {
    println!("{}", mod_pow(2, 10, 1_000_000_007));
}`,
        stdin: '',
        expectedOutput: '1024',
        lineByLine: [
          { lineNumber: 'Line 1', codeSnippet: 'fn mod_pow(mut base: i128, mut exp: i64, m: i128) -> i128 {', whatItMeans: 'Uses 128-bit integer for overflow-proof modular multiply.', whyItIsThere: 'Handles moduli up to 10^18 safely.', ifDeletedError: '64-bit overflow for huge mods.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 2', codeSnippet: 'let n: i64 = 100000;', whatItMeans: '64-bit signed integer N.', whyItIsThere: 'Prevents 32-bit overflow above 2.14e9.', ifDeletedError: 'Undeclared n.' },
      { lineNumber: 'Line 3', codeSnippet: 'let ans = if n % 2 == 0 { (n / 2) * (n + 1) } else { n * ((n + 1) / 2) };', whatItMeans: 'O(1) algebraic series sum dividing even term first.', whyItIsThere: 'Instant execution regardless of N size.', ifDeletedError: 'No answer.' },
      { lineNumber: 'Line 4', codeSnippet: 'println!("{}", ans);', whatItMeans: 'Writes exact answer 5000050000.', whyItIsThere: 'Emits stdout result.', ifDeletedError: 'Silent exit.' },
    ],
    dryRunTable: [
      { step: 1, state: 'n = 100000', memoryOrStack: 'i64 n = 100000', note: 'n % 2 == 0 true' },
      { step: 2, state: 'n / 2 = 50000', memoryOrStack: '50000_i64', note: 'Halve even factor first' },
      { step: 3, state: '50000 * 100001', memoryOrStack: '5000050000_i64', note: 'Fits safely inside i64' },
      { step: 4, state: 'println 5000050000', memoryOrStack: 'O(1) time', note: 'Zero loop iterations' },
    ],
    harryBugTraps: [
      { title: 'Trap 1: i32 Overflow in Gaussian Formula', brokenCode: `let n: i32 = 100000; println!("{}", n * (n + 1) / 2);`, fixedCode: `let n: i64 = 100000; println!("{}", (n / 2) * (n + 1));`, whyItBreaks: 'Panics on overflow in debug builds or wraps to wrong value in release.' },
      { title: 'Trap 2: Unbuffered println! Inside 10^5 Loop', brokenCode: `for i in 0..100000 { println!("{}", i); }`, fixedCode: `use std::fmt::Write;\nlet mut out = String::new();\nfor i in 0..100000 { let _ = writeln!(out, "{}", i); }\nprint!("{}", out);`, whyItBreaks: 'Repeated stdout lock/flush overhead causes I/O TLE.' },
      { title: 'Trap 3: O(N^2) Vec::contains Inside Loop', brokenCode: `for x in queries { if big_vec.contains(&x) { ... } }`, fixedCode: `use std::collections::HashSet;\nlet set: HashSet<_> = big_vec.into_iter().collect();`, whyItBreaks: 'Linear search per query degrades O(N) into O(N^2).' },
    ],
    practiceSheet: [
      { id: 'rust-ch10-p1', difficulty: 'Easy', title: 'O(1) Sum 1..N', prompt: 'Read N (i64) and print `1 + ... + N` in O(1).', banglaHint: '`i64` দিয়ে জোড় ফ্যাক্টর আগে ২ দিয়ে ভাগ করো।', starterCode: `use std::io::{self, Read};\nfn main(){ let mut s=String::new(); io::stdin().read_to_string(&mut s).unwrap(); let n:i64=s.trim().parse().unwrap(); println!("{}",if n%2==0{(n/2)*(n+1)}else{n*((n+1)/2)}); }`, sampleStdin: '10', expectedOutput: '55' },
      { id: 'rust-ch10-p2', difficulty: 'Easy', title: 'O(sqrt(N)) Divisors', prompt: 'Count positive divisors of i64 N.', banglaHint: '`while d * d <= n` লুপ ব্যবহার করো।', starterCode: `use std::io::{self, Read};\nfn main(){ let mut s=String::new(); io::stdin().read_to_string(&mut s).unwrap(); let n:i64=s.trim().parse().unwrap(); let(mut c,mut d)=(0_i64,1_i64); while d*d<=n{if n%d==0{c+=if d*d==n{1}else{2};} d+=1;} println!("{}",c); }`, sampleStdin: '12', expectedOutput: '6' },
      { id: 'rust-ch10-p3', difficulty: 'Medium', title: 'Modular Power O(log B)', prompt: 'Compute `(A^B) % 1000000007` using i128 intermediate ops.', banglaHint: '`i128` দিয়ে `(res * base) % m` করো।', starterCode: `use std::io::{self, Read};\nfn main(){ let mut s=String::new(); io::stdin().read_to_string(&mut s).unwrap(); let v:Vec<i64>=s.split_whitespace().map(|x|x.parse().unwrap()).collect(); let(mut a,mut b,m)=(v[0] as i128,v[1],1_000_000_007_i128); a%=m; let mut r=1_i128; while b>0{if b&1==1{r=r*a%m;}a=a*a%m;b>>=1;} println!("{}",r); }`, sampleStdin: '3 4', expectedOutput: '81' },
      { id: 'rust-ch10-p4', difficulty: 'Medium', title: 'O(1) Range Sum [L, R]', prompt: 'Compute integer sum from L to R in O(1).', banglaHint: '`pref(r) - pref(l - 1)` বের করো।', starterCode: `use std::io::{self, Read};\nfn pref(n:i64)->i64{if n<=0{0}else if n%2==0{(n/2)*(n+1)}else{n*((n+1)/2)}}\nfn main(){ let mut s=String::new(); io::stdin().read_to_string(&mut s).unwrap(); let v:Vec<i64>=s.split_whitespace().map(|x|x.parse().unwrap()).collect(); println!("{}",pref(v[1])-pref(v[0]-1)); }`, sampleStdin: '3 7', expectedOutput: '25' },
      { id: 'rust-ch10-p5', difficulty: 'Hard', title: 'Fast Prime Check O(sqrt(N))', prompt: 'Print `PRIME` or `COMPOSITE` for N.', banglaHint: '`n >= 2` এবং `d * d <= n` পর্যন্ত ভাগ পরীক্ষা করো।', starterCode: `use std::io::{self, Read};\nfn main(){ let mut s=String::new(); io::stdin().read_to_string(&mut s).unwrap(); let n:i64=s.trim().parse().unwrap(); let mut p=n>=2; let mut d=2_i64; while p&&d*d<=n{if n%d==0{p=false;}d+=1;} println!("{}",if p{"PRIME"}else{"COMPOSITE"}); }`, sampleStdin: '29', expectedOutput: 'PRIME' },
    ],
    miniBuild: {
      title: 'Milestone Merger 2: O(1) Fast Range Sum Engine (Phase 1–2)',
      description: 'Combine branching guards, pure Rust functions, 64-bit i64 precision, and O(1) algebra for instant [L, R] queries.',
      banglaGoal: 'গার্ড ক্লজ, ফাংশন ও O(1) গাণিতিক সূত্র মিলিয়ে দ্রুত রেঞ্জ-সাম প্রোগ্রাম তৈরি করো।',
      combinesChapters: 'Rust Ch 1–10 (Phase 2 Milestone Merger)',
      starterCode: `use std::io::{self, Read};

fn prefix_sum(n: i64) -> i64 {
    if n <= 0 { return 0; }
    if n % 2 == 0 { (n / 2) * (n + 1) } else { n * ((n + 1) / 2) }
}

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let v: Vec<i64> = s.split_whitespace().filter_map(|x| x.parse().ok()).collect();
    if v.len() >= 2 {
        let (l, r) = (v[0], v[1]);
        println!("{}", if l > r { 0 } else { prefix_sum(r) - prefix_sum(l - 1) });
    }
}`,
      sampleStdin: '1 100000',
      expectedOutput: '5000050000',
    },
    starterCode: `use std::io::{self, Read};

fn prefix_sum(n: i64) -> i64 {
    if n <= 0 { return 0; }
    if n % 2 == 0 { (n / 2) * (n + 1) } else { n * ((n + 1) / 2) }
}

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let v: Vec<i64> = s.split_whitespace().filter_map(|x| x.parse().ok()).collect();
    if v.len() >= 2 {
        let (l, r) = (v[0], v[1]);
        println!("{}", if l > r { 0 } else { prefix_sum(r) - prefix_sum(l - 1) });
    }
}`,
    sampleStdin: '1 100000',
    expectedSampleOutput: '5000050000',
    testCases: [
      { id: 'rust10-t1', input: '1 100000', expectedOutput: '5000050000' },
      { id: 'rust10-t2', input: '10 20', expectedOutput: '165', isHidden: true },
    ],
  },
};


