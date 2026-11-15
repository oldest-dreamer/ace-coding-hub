import type { AtomicLessonOverride } from './atomicLessonTypes';

export const LESSONS_RUST_P4: Record<number, AtomicLessonOverride> = {
  16: {
    chapterNumber: 16,
    title: 'Ownership, Borrowing & The Borrow Checker in Rust',
    banglaTitle: 'ওনারশিপ, বোরোয়িং ও বোরো চেকার (Rust)',
    subtitle: 'Move vs Copy semantics, immutable &T, exclusive &mut T, and zero-cost slice borrows',
    zeroIntuition: {
      plainEnglishStory:
        'Rust eliminates garbage collectors and dangling pointers simultaneously through three compile-time ownership rules: every value has exactly one owner, moving a heap type (`String`, `Vec<T>`) transfers ownership leaving the old binding uninitialized, and when the owner exits scope, Rust drops its memory deterministically.\n\nTo read or mutate data without transferring ownership, pass a borrow: you may hold any number of simultaneous immutable borrows (`&T`), OR exactly one exclusive mutable borrow (`&mut T`), never both at once (preventing data races and iterator invalidation at compile time).',
      asciiFlowchart:
        'let s = String::from("hi");\n  let s2 = s;           // MOVE! s is invalidated\n  read(&s2); read(&s2); // Multiple &T shared borrows OK\n  mutate(&mut s2);      // Exclusive &mut T borrow OK (no other readers active)',
      pseudocode: ["borrow rule:","at any point: N shared (&T) readers  XOR  1 exclusive (&mut T) writer"],
      banglaZeroToHero: {
        analogyTitle: 'একটি বইয়ের আসল মালিকানা (Move) বনাম পড়ার জন্য ধার নেওয়া (Borrow)',
        explanation:
          'সি++-এ পয়েন্টার ভুলে ডিলিট করলে বা দুবার ডিলিট করলে প্রোগ্রাম ক্র্যাশ করে, আবার জাভা-পাইথনে গার্বেজ কালেক্টর চালাতে হয়। রাস্ট কোনো গার্বেজ কালেক্টর ছাড়াই কম্পাইল টাইমে মেমোরি সেফটি দেয় ওনারশিপ ও বোরোয়িং নামের দুটি সহজ নিয়মে। প্রথমত, প্রতিটি ডেটার ঠিক একজনই মালিক (Owner) থাকবে; যদি কোনো হিপ ডেটা (`String` বা `Vec`) আরেক ভ্যারিয়েবলে অ্যাসাইন করো, মালিকানা সেখানে চলে যায় (Move) এবং আগের নামটি আর ব্যবহার করা যায় না। দ্বিতীয়ত, মালিকানা হস্তান্তর না করে ফাংশনকে কেবল ডেটা দেখতে দিতে চাইলে `&x` দিয়ে ধার বা রেফারেন্স (Borrow) দিতে হয়। বোরো চেকারের মূল সূত্রটি অসাধারণ: একসাথে অসংখ্য রিড-অনলি রেফারেন্স (`&T`) থাকতে পারে, অথবা কেবলমাত্র একজন পরিবর্তনকারী মিউটেবল রেফারেন্স (`&mut T`) থাকতে পারে—দুটো একসাথে কখনোই নয়! এর ফলে ভেক্টরের ওপর লুপ চালানোর সময় ভেতর থেকে `push` করে মেমোরি ভেঙে দেওয়ার বাগ (Iterator Invalidation) কম্পাইলই হতে পারে না। ফাংশনে রিড-অনলি ইনপুট নেওয়ার সময় `&String`-এর বদলে `&str` এবং `&Vec<T>`-এর বদলে `&[T]` নেওয়া সবচেয়ে ভালো অভ্যাস। আজকের অধ্যায়ে মুভ বনাম কপি, `&T` বনাম `&mut T` এবং বোরো চেকারের নিয়মগুলো পরিষ্কারভাবে আয়ত্ত করবে।',
        everydayExample: 'একটি নোটবই একসাথে দশজন বন্ধু কেবল দেখে পড়তে পারবে (`&T`), কিন্তু কেউ কলম দিয়ে লিখতে চাইলে (`&mut T`) ওই সময় বইটি কেবল তার হাতেই থাকবে।',
        keyTakeaways: [
          'প্রিমিটিভ (`i64`, `bool`, `char`) বাই ডিফল্ট `Copy` হয়, কিন্তু হিপ ডেটা (`String`, `Vec`) অ্যাসাইন করলে `Move` হয়।',
          'বোরো চেকার: একসাথে একাধিক `&T` অথবা মাত্র একটি `&mut T` থাকতে পারবে।',
          'ফাংশন প্যারামিটারে `&Vec<T>` না লিখে `&[T]` এবং `&String` না লিখে `&str` লিখলে কোড অনেক বেশি নমনীয় হয়।',
        ],
      },
    },
    topics: [
      {
        id: 'rust-ch16-t1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Move vs. Shared Borrow (&) vs. Mutable Borrow (&mut)',
        englishParagraphs: [
          'See how passing `&s` borrows read-only access cleanly, passing `&mut s` updates in place, and assigning `let moved = s` transfers final ownership.',
        ],
        banglaParagraphs: [
          'রিড বোরো (`&s`), মিউটেবল বোরো (`&mut s`) এবং মুভ (`let moved = s`) ধাপে ধাপে কীভাবে কাজ করে দেখো।',
        ],
        memoryDiagram: '&s (read) -> &mut s (append) -> moved = s (ownership transferred)',
        code: `fn inspect(txt: &str) -> usize { txt.len() }\nfn append_tag(txt: &mut String) { txt.push_str("-ok"); }\nfn main() {\n    let mut s = String::from("rust");\n    let n = inspect(&s);\n    append_tag(&mut s);\n    let moved = s;\n    println!("{} {}", n, moved);\n}`,
        stdin: '',
        expectedOutput: '4 rust-ok',
        lineByLine: [
          {"lineNumber":"Line 5","codeSnippet":"    let n = inspect(&s);","whatItMeans":"Borrows immutable `&str` slice without moving ownership.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"`n` undefined."},
          {"lineNumber":"Line 6","codeSnippet":"    append_tag(&mut s);","whatItMeans":"Grants temporary exclusive mutable access after `inspect` ends.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Tag is not appended."},
          {"lineNumber":"Line 7","codeSnippet":"    let moved = s;","whatItMeans":"Transfers ownership from `s` into `moved`; `s` can no longer be read.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"`moved` undefined."},
        ],
      },
      {
        id: 'rust-ch16-t2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'In-Place Mutable Reference Swap & Normalize',
        englishParagraphs: [
          'Accept `a: &mut i64, b: &mut i64` to order two caller variables directly via dereference `*a`, `*b`.',
        ],
        banglaParagraphs: [
          '`&mut i64` রেফারেন্স নিয়ে সরাসরি কলারের দুটি ভ্যারিয়েবল অদলবদল করো।',
        ],
        memoryDiagram: 'order(&mut x, &mut y) uses std::mem::swap',
        code: `use std::io::{self, Read};\nfn order_pair(a: &mut i64, b: &mut i64) {\n    if *a > *b { std::mem::swap(a, b); }\n}\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n    let mut it = s.split_whitespace();\n    let mut x: i64 = it.next().unwrap().parse().unwrap();\n    let mut y: i64 = it.next().unwrap().parse().unwrap();\n    order_pair(&mut x, &mut y);\n    println!("{} {}", x, y);\n}`,
        stdin: '42 15',
        expectedOutput: '15 42',
        lineByLine: [
          {"lineNumber":"Line 3","codeSnippet":"    if *a > *b { std::mem::swap(a, b); }","whatItMeans":"Dereferences exclusive mutable refs to compare and swap safely.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Order remains unsorted."},
        ],
      },
      {
        id: 'rust-ch16-t3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Zero-Copy Slice Analyzer (&[i64])',
        englishParagraphs: [
          'By accepting `&[i64]` instead of `Vec<i64>`, `min_max` works smoothly on full vectors, arrays, and sub-slices alike with zero allocation.',
        ],
        banglaParagraphs: [
          '`&[i64]` স্লাইস বোরো গ্রহণ করলে ভেক্টর বা অ্যারের যেকোনো অংশ কোনো কপি ছাড়াই প্রসেস করা যায়।',
        ],
        memoryDiagram: '&v[..] passed as zero-copy fat pointer (ptr, len)',
        code: `use std::io::{self, Read};\nfn min_max(slice: &[i64]) -> (i64, i64) {\n    let (mut lo, mut hi) = (slice[0], slice[0]);\n    for &x in slice {\n        if x < lo { lo = x; }\n        if x > hi { hi = x; }\n    }\n    (lo, hi)\n}\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n    let mut it = s.split_whitespace();\n    let n: usize = it.next().unwrap().parse().unwrap();\n    let a: Vec<i64> = (0..n).map(|_| it.next().unwrap().parse().unwrap()).collect();\n    let (lo, hi) = min_max(&a);\n    println!("{} {}", lo, hi);\n}`,
        stdin: '5\n12 -4 99 3 18',
        expectedOutput: '-4 99',
        lineByLine: [
          {"lineNumber":"Line 2","codeSnippet":"fn min_max(slice: &[i64]) -> (i64, i64) {","whatItMeans":"Idiomatic zero-copy slice borrow parameter.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Helper missing."},
          {"lineNumber":"Line 16","codeSnippet":"    let (lo, hi) = min_max(&a);","whatItMeans":"Coerces `&Vec<i64>` directly into `&[i64]`.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Tuple never computed."},
        ],
      },
      {
        id: 'rust-ch16-t4',
        badge: 'Example 4: Bug Trap vs. CP/Production Pattern',
        title: 'NLL Scope End & Lifetime-Safe Slice Return',
        englishParagraphs: [
          'Non-Lexical Lifetimes (NLL) end an immutable borrow right after its last usage, allowing a subsequent `&mut` borrow cleanly in the same function.',
        ],
        banglaParagraphs: [
          'আধুনিক রাস্টে (NLL) একটি `&T` বোরোর শেষ ব্যবহারের সাথে সাথেই তার মেয়াদ শেষ হয়, তাই এরপর `&mut T` নেওয়া বৈধ হয়।',
        ],
        memoryDiagram: 'first_word(&s) last used -> borrow ends -> s.push_str() allowed!',
        code: `fn first_token(s: &str) -> &str {\n    s.split_whitespace().next().unwrap_or("")\n}\nfn main() {\n    let mut line = String::from("argon academy");\n    let w_len = first_token(&line).len();\n    line.push_str(" 2025");\n    println!("{} {}", w_len, line);\n}`,
        stdin: '',
        expectedOutput: '5 argon academy 2025',
        lineByLine: [
          {"lineNumber":"Line 6","codeSnippet":"    let w_len = first_token(&line).len();","whatItMeans":"Extracts `usize` length and immediately drops the `&line` borrow.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Holding `&str` across `line.push_str` would violate borrow checker."},
          {"lineNumber":"Line 7","codeSnippet":"    line.push_str(\" 2025\");","whatItMeans":"Mutates `line` safely once no immutable borrows remain live.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Mutation skipped."},
        ],
      },
    ],
    lineByLineAnatomy: [
      {"lineNumber":"Line 4","codeSnippet":"    let mut s = String::from(\"rust\");","whatItMeans":"Creates mutable heap String owned by `s`.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"`s` missing."},
      {"lineNumber":"Line 5","codeSnippet":"    let n = inspect(&s);","whatItMeans":"Shared immutable borrow reads length.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"`n` missing."},
      {"lineNumber":"Line 6","codeSnippet":"    append_tag(&mut s);","whatItMeans":"Exclusive mutable borrow appends suffix.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Suffix not appended."},
      {"lineNumber":"Line 7","codeSnippet":"    let moved = s;","whatItMeans":"Moves ownership out of `s`.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"`moved` missing."},
    ],
    dryRunTable: [
      { step: 1, state: 'let mut s = "rust"', memoryOrStack: 'owner: s -> Heap("rust")', note: 'Single owner created' },
      { step: 2, state: 'inspect(&s)', memoryOrStack: 'shared borrow len=4', note: 'Ownership stays with s' },
      { step: 3, state: 'append_tag(&mut s)', memoryOrStack: 'Heap("rust-ok")', note: 'Exclusive mutable ref drops on return' },
      { step: 4, state: 'let moved = s', memoryOrStack: 'owner: moved', note: 's is uninitialized; prints 4 rust-ok' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: Using a Moved String (`use of moved value`)',
        brokenCode: 'let s2 = s;\nprintln!("{}", s); // E0382!',
        fixedCode: 'let s2 = &s;\nprintln!("{} {}", s, s2);',
        whyItBreaks: 'Moving `s` into `s2` invalidates `s`; borrow with `&s` instead of moving when keeping `s`.',
      },
      {
        title: 'Trap 2: Mutating a Vector While Holding a Reference Inside It',
        brokenCode: 'let r = &v[0]; v.push(99); println!("{}", r);',
        fixedCode: 'let first = v[0]; v.push(99); println!("{}", first);',
        whyItBreaks: '`v.push` can reallocate heap memory, which would turn `r` into a dangling pointer if allowed.',
      },
      {
        title: 'Trap 3: Taking `&String` Instead of `&str` in Functions',
        brokenCode: 'fn greet(s: &String) { /* rejects string literals! */ }',
        fixedCode: 'fn greet(s: &str) { /* accepts &String AND &str */ }',
        whyItBreaks: '`&str` works on `&String`, slices `&s[0..2]`, and `"literal"` without extra allocations.',
      },
    ],
    practiceSheet: [
      {
        id: 'rust-ch16-p1',
        difficulty: 'Easy',
        title: 'Mutable Reference Triple',
        prompt: 'Write `fn triple(x: &mut i64)` and double/triple the stdin integer in place.',
        banglaHint: '`*x *= 3;` লিখে মিউটেবল রেফারেন্স আপডেট করো।',
        starterCode: `use std::io::{self, Read};\nfn triple(x: &mut i64) { *x *= 3; }\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n    let mut v: i64 = s.trim().parse().unwrap();\n    triple(&mut v);\n    println!("{}", v);\n}`,
        sampleStdin: '14',
        expectedOutput: '42',
      },
      {
        id: 'rust-ch16-p2',
        difficulty: 'Easy',
        title: 'Zero-Copy Slice Sum',
        prompt: 'Read `n` and `n` integers into `Vec<i64>`, then compute sum via `fn sum_slice(a: &[i64]) -> i64`.',
        banglaHint: '`a.iter().sum()` অথবা `for &x in a` ব্যবহার করো।',
        starterCode: `use std::io::{self, Read};\nfn sum_slice(a: &[i64]) -> i64 { a.iter().sum() }\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n    let mut it = s.split_whitespace();\n    let n: usize = it.next().unwrap().parse().unwrap();\n    let a: Vec<i64> = (0..n).map(|_| it.next().unwrap().parse().unwrap()).collect();\n    println!("{}", sum_slice(&a));\n}`,
        sampleStdin: '4\n5 10 15 20',
        expectedOutput: '50',
      },
      {
        id: 'rust-ch16-p3',
        difficulty: 'Medium',
        title: 'Split-At-Mut Independent Half Normalization',
        prompt: 'Use `a.split_at_mut(mid)` to hold two simultaneous disjoint mutable slices and reverse both halves independently.',
        banglaHint: '`let (left, right) = a.split_at_mut(n / 2); left.reverse(); right.reverse();`',
        starterCode: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n    let mut it = s.split_whitespace();\n    let n: usize = it.next().unwrap().parse().unwrap();\n    let mut a: Vec<i64> = (0..n).map(|_| it.next().unwrap().parse().unwrap()).collect();\n    let (l, r) = a.split_at_mut(n / 2);\n    l.reverse(); r.reverse();\n    println!("{}", a.iter().map(|x| x.to_string()).collect::<Vec<_>>().join(" "));\n}`,
        sampleStdin: '4\n1 2 3 4',
        expectedOutput: '2 1 4 3',
      },
      {
        id: 'rust-ch16-p4',
        difficulty: 'Medium',
        title: 'Borrow-Safe Prefix Word Extractor',
        prompt: 'Write `fn first_word(s: &str) -> &str` using explicit lifetime flow, and print the first word length plus uppercase conversion.',
        banglaHint: '`s.split_whitespace().next().unwrap_or("")` রিটার্ন করো।',
        starterCode: `use std::io::{self, Read};\nfn first_word(s: &str) -> &str { s.split_whitespace().next().unwrap_or("") }\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n    let w = first_word(&s);\n    println!("{} {}", w.len(), w.to_ascii_uppercase());\n}`,
        sampleStdin: 'borrow checker ok',
        expectedOutput: '6 BORROW',
      },
      {
        id: 'rust-ch16-p5',
        difficulty: 'Hard',
        title: 'Longest Slice With Equal Sum From Lifetime Compare',
        prompt: 'Given two slices read from input, write `fn richer_slice<\'a>(a: &\'a [i64], b: &\'a [i64]) -> &\'a [i64]` returning the slice with larger sum.',
        banglaHint: 'একই লাইফটাইম `\'a` দুই স্লাইস ও রিটার্ন টাইপে দাও।',
        starterCode: `use std::io::{self, Read};\nfn richer<'a>(a: &'a [i64], b: &'a [i64]) -> &'a [i64] {\n    if a.iter().sum::<i64>() >= b.iter().sum::<i64>() { a } else { b }\n}\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n    let mut it = s.split_whitespace();\n    let n: usize = it.next().unwrap().parse().unwrap();\n    let m: usize = it.next().unwrap().parse().unwrap();\n    let a: Vec<i64> = (0..n).map(|_| it.next().unwrap().parse().unwrap()).collect();\n    let b: Vec<i64> = (0..m).map(|_| it.next().unwrap().parse().unwrap()).collect();\n    println!("{}", richer(&a, &b).iter().sum::<i64>());\n}`,
        sampleStdin: '2 3\n10 20\n5 6 7',
        expectedOutput: '30',
      },
    ],
    miniBuild: {
      title: 'Mini-Build: Zero-Copy Telemetry Borrow Analyzer',
      description: 'Borrow `&[i64]` to compute min/max/sum without moving or cloning the backing vector.',
      banglaGoal: 'মালিকানা হস্তান্তর বা ক্লোন না করে কেবল `&[i64]` বোরো দিয়ে ডেটা বিশ্লেষণ করো।',
      combinesChapters: "Ch 11, 14, 16",
      starterCode: `use std::io::{self, Read};\nfn stats(v: &[i64]) -> (i64, i64, i64) {\n    let (mut mn, mut mx, mut tot) = (v[0], v[0], 0);\n    for &x in v { if x < mn { mn = x; } if x > mx { mx = x; } tot += x; }\n    (mn, mx, tot)\n}\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n    let mut it = s.split_whitespace();\n    let n: usize = it.next().unwrap().parse().unwrap();\n    let v: Vec<i64> = (0..n).map(|_| it.next().unwrap().parse().unwrap()).collect();\n    let (mn, mx, tot) = stats(&v);\n    println!("{} {} {} {}", mn, mx, tot, v.len());\n}`,
      sampleStdin: '4\n10 25 5 40',
      expectedOutput: '5 40 80 4',
    },
    starterCode: `use std::io::{self, Read};\nfn stats(v: &[i64]) -> (i64, i64, i64) {\n    let (mut mn, mut mx, mut tot) = (v[0], v[0], 0);\n    for &x in v { if x < mn { mn = x; } if x > mx { mx = x; } tot += x; }\n    (mn, mx, tot)\n}\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n    let mut it = s.split_whitespace();\n    let n: usize = it.next().unwrap().parse().unwrap();\n    let v: Vec<i64> = (0..n).map(|_| it.next().unwrap().parse().unwrap()).collect();\n    let (mn, mx, tot) = stats(&v);\n    println!("{} {} {} {}", mn, mx, tot, v.len());\n}`,
    sampleStdin: '4\n10 25 5 40',
    expectedSampleOutput: '5 40 80 4',
    testCases: [
      { id: 'rust16-t1', input: '4\n10 25 5 40', expectedOutput: '5 40 80 4' },
      { id: 'rust16-t2', input: '3\n-5 0 5', expectedOutput: '-5 5 0 3', isHidden: true },
    ],
  },
  17: {
    chapterNumber: 17,
    title: 'Heap vs. Stack, Box<T>, Rc<T> & RefCell<T> in Rust',
    banglaTitle: 'হিপ বনাম স্ট্যাক, Box<T>, Rc<T> ও RefCell<T> (Rust)',
    subtitle: 'Stack Drop RAII, Box recursive indirection, Rc shared ownership, and interior mutability',
    zeroIntuition: {
      plainEnglishStory:
        'Fixed-size Rust primitives and structs live directly on the Stack and vanish instantaneously on scope exit, while large or dynamically recursive data moves onto the Heap using smart pointers that implement `Drop` deterministically (RAII without GC).\n\n`Box<T>` provides single-owner heap allocation (essential for recursive types like `enum List { Cons(i64, Box<List>), Nil }` whose size would otherwise be infinite). When multiple owners need read access to shared heap data, `Rc<T>` tracks reference counts safely on one thread, and `Rc<RefCell<T>>` enables checked interior mutability when runtime mutation is required.',
      asciiFlowchart:
        'Stack [ b: Box<Node> ]  --owns-->  Heap [ Node { val, next: Option<Box<Node>> } ]\nStack [ r1, r2: Rc<T> ] --strong_count=2--> Heap [ ControlBlock + T ]',
      pseudocode: ["enum Tree { Leaf(i64), Branch(Box<Tree>, Box<Tree>) }","let shared = Rc::new(RefCell::new(0)) // interior mutability"],
      banglaZeroToHero: {
        analogyTitle: 'Box হলো একা ভাড়া করা গুদাম ঘর, আর Rc হলো যৌথ মালিকানার টালি খাতা',
        explanation:
          'রাস্টে সাধারণ সংখ্যা বা ফিক্সড স্ট্রাক্ট থাকে দ্রুতগতির স্ট্যাকে, কিন্তু লিঙ্কড লিস্ট বা বাইনারি ট্রির মতো রিকার্সিভ টাইপ বানাতে গেলে স্ট্যাকে তাদের আকার অসীম হয়ে যেত বলে কম্পাইলার আটকে দেয়। তখন আমরা `Box<T>` ব্যবহার করি—এটি হিপ মেমোরিতে ডেটা রাখে এবং স্ট্যাকে কেবল একটি ফিক্সড-সাইজ পয়েন্টার ধরে রাখে! সি++-এর `unique_ptr`-এর মতোই `Box<T>` স্কোপের বাইরে গেলে কোনো গার্বেজ কালেক্টর ছাড়াই নিজে থেকে `Drop` ট্রেইট চালিয়ে মেমোরি মুক্ত করে দেয়। যখন একটি হিপ ডেটার একাধিক মালিক দরকার হয় (যেমন একটি গ্রাফ বা শেয়ার্ড কনফিগারেশন), তখন সিঙ্গেল-থ্রেডেড রেফারেন্স কাউন্টিং স্মার্ট পয়েন্টার `Rc<T>` ব্যবহার করা হয়; `Rc::clone(&x)` শুধু কাউন্টার ১ বাড়ায়, কোনো ভারী ডেটা কপি করে না। আর অপরিবর্তনযোগ্য `Rc`-এর ভেতরের মান বদলাতে হলে রাস্টের Interior Mutability প্যাটার্ন `RefCell<T>` (`.borrow()` ও `.borrow_mut()`) ব্যবহার করতে হয়, যা কম্পাইল টাইমের বদলে রানটাইমে বোরো নিয়ম যাচাই করে। আজকের অধ্যায়ে `Box`, `Rc` এবং `RefCell`-এর প্র্যাকটিক্যাল প্রয়োগ শিখবে।',
        everydayExample: 'একটি ট্রি নোডের সাইজ আগে থেকে জানা যায় না, তাই বক্সে ভরে তার ঠিকানা রেখে দেওয়া (`Box<Node>`), আর যৌথ ফ্ল্যাটের মালিকানা গুনে রাখা (`Rc`)।',
        keyTakeaways: [
          '`Box<T>` রিকার্সিভ ডাটা স্ট্রাকচারের আকার নির্দিষ্ট করে এবং স্কোপ শেষে অটোমেটিক `Drop` হয়।',
          '`Rc::clone(&a)` পুরো ডেটা ক্লোন না করে শুধু রেফারেন্স কাউন্ট ১ বাড়ায়—অনেক দ্রুত।',
          '`RefCell::borrow_mut()` একই সময়ে সক্রিয় থাকলে প্রোগ্রাম রানটাইমে প্যানিক করে, তাই কাজ শেষেই স্কোপ থেকে ছাড়ো।',
        ],
      },
    },
    topics: [
      {
        id: 'rust-ch17-t1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Deterministic Drop Order with Box<T>',
        englishParagraphs: [
          'Wrap a custom `Drop` struct in `Box::new(...)` inside an inner block to witness automatic deterministic heap cleanup before `done` prints.',
        ],
        banglaParagraphs: [
          'ইন্টার্নাল স্কোপ শেষ হওয়া মাত্রই `Box<T>` কীভাবে `Drop` চালিয়ে হিপ মেমোরি পরিষ্কার করে দেখো।',
        ],
        memoryDiagram: 'Box<Res> exits inner scope -> Drop::drop(&mut self) runs immediately',
        code: `struct Res(i32);\nimpl Drop for Res {\n    fn drop(&mut self) { println!("drop {}", self.0); }\n}\nfn main() {\n    {\n        let b = Box::new(Res(42));\n        println!("use {}", b.0);\n    }\n    println!("done");\n}`,
        stdin: '',
        expectedOutput: 'use 42\ndrop 42\ndone',
        lineByLine: [
          {"lineNumber":"Line 3","codeSnippet":"    fn drop(&mut self) { println!(\"drop {}\", self.0); }","whatItMeans":"Deterministic RAII hook invoked automatically when owner goes out of scope.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Cleanup log omitted."},
          {"lineNumber":"Line 7","codeSnippet":"        let b = Box::new(Res(42));","whatItMeans":"Allocates `Res(42)` on heap owned by `b`.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Allocated on stack only."},
        ],
      },
      {
        id: 'rust-ch17-t2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Recursive Heap Linked List with Option<Box<Node>>',
        englishParagraphs: [
          'Build a singly linked list of `n` integers using `Option<Box<Node>>` and sum its nodes iteratively without manual `free`.',
        ],
        banglaParagraphs: [
          '`Option<Box<Node>>` ব্যবহার করে নিরাপদ রিকার্সিভ লিঙ্কড লিস্ট তৈরি করে নোডগুলোর যোগফল বের করো।',
        ],
        memoryDiagram: 'head: Option<Box<Node>> -> Node(val, next)',
        code: `use std::io::{self, Read};\nstruct Node { val: i64, next: Option<Box<Node>> }\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n    let mut it = s.split_whitespace();\n    let n: usize = it.next().unwrap().parse().unwrap();\n    let mut head: Option<Box<Node>> = None;\n    for _ in 0..n {\n        let val: i64 = it.next().unwrap().parse().unwrap();\n        head = Some(Box::new(Node { val, next: head }));\n    }\n    let mut sum = 0i64;\n    let mut cur = head.as_deref();\n    while let Some(node) = cur {\n        sum += node.val;\n        cur = node.next.as_deref();\n    }\n    println!("{}", sum);\n}`,
        stdin: '4\n3 7 2 8',
        expectedOutput: '20',
        lineByLine: [
          {"lineNumber":"Line 11","codeSnippet":"        head = Some(Box::new(Node { val, next: head }));","whatItMeans":"Moves prior `head` into new heap `Box<Node>` cleanly.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"List remains `None`."},
          {"lineNumber":"Line 14","codeSnippet":"    let mut cur = head.as_deref();","whatItMeans":"Borrows `&Node` without moving ownership out of `head`.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Moving `head` would destroy traversal handle."},
        ],
      },
      {
        id: 'rust-ch17-t3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Shared Ownership Reference Counting with Rc<T>',
        englishParagraphs: [
          'Share an immutable config object across multiple owners via `Rc::clone` and observe `Rc::strong_count` rise and fall.',
        ],
        banglaParagraphs: [
          '`Rc::clone` ও `Rc::strong_count` ব্যবহার করে শেয়ার্ড হিপ মালিকানা পর্যবেক্ষণ করো।',
        ],
        memoryDiagram: 'strong_count: 1 -> 2 -> 1',
        code: `use std::rc::Rc;\nfn main() {\n    let cfg = Rc::new(512i32);\n    println!("{}", Rc::strong_count(&cfg));\n    {\n        let copy_cfg = Rc::clone(&cfg);\n        println!("{} {}", Rc::strong_count(&cfg), *copy_cfg);\n    }\n    println!("{}", Rc::strong_count(&cfg));\n}`,
        stdin: '',
        expectedOutput: '1\n2 512\n1',
        lineByLine: [
          {"lineNumber":"Line 6","codeSnippet":"        let copy_cfg = Rc::clone(&cfg);","whatItMeans":"Increments strong reference count without copying underlying data.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Count stays `1`."},
        ],
      },
      {
        id: 'rust-ch17-t4',
        badge: 'Example 4: Bug Trap vs. CP/Production Pattern',
        title: 'Shared Interior Mutability via Rc<RefCell<T>>',
        englishParagraphs: [
          'Combine `Rc` with `RefCell` when multiple handles need shared read/write access on one thread, keeping `borrow_mut()` guards tightly scoped.',
        ],
        banglaParagraphs: [
          '`Rc<RefCell<T>>` ব্যবহার করে একাধিক মালিকের মধ্যে নিরাপদ রানটাইম মিউটেশন করো।',
        ],
        memoryDiagram: 'Rc<RefCell<i64>> -> *handle.borrow_mut() += delta',
        code: `use std::cell::RefCell;\nuse std::rc::Rc;\nuse std::io::{self, Read};\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n    let d: i64 = s.trim().parse().unwrap();\n    let acc = Rc::new(RefCell::new(10i64));\n    let h1 = Rc::clone(&acc);\n    let h2 = Rc::clone(&acc);\n    *h1.borrow_mut() += d;\n    *h2.borrow_mut() *= 2;\n    println!("{}", acc.borrow());\n}`,
        stdin: '5',
        expectedOutput: '30',
        lineByLine: [
          {"lineNumber":"Line 11","codeSnippet":"    *h1.borrow_mut() += d;","whatItMeans":"Acquires mutable guard, mutates inner `i64`, and immediately releases guard.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Value stays `10`."},
        ],
      },
    ],
    lineByLineAnatomy: [
      {"lineNumber":"Line 1","codeSnippet":"struct Res(i32);","whatItMeans":"Tuple struct wrapping integer handle.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Type undefined."},
      {"lineNumber":"Line 3","codeSnippet":"    fn drop(&mut self) { println!(\"drop {}\", self.0); }","whatItMeans":"Runs automatically on scope exit.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"No drop log printed."},
      {"lineNumber":"Line 7","codeSnippet":"        let b = Box::new(Res(42));","whatItMeans":"Places value on heap managed by `Box`.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"No heap allocation."},
      {"lineNumber":"Line 8","codeSnippet":"        println!(\"use {}\", b.0);","whatItMeans":"Auto-derefs through `Box` to read field.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Usage line missing."},
    ],
    dryRunTable: [
      { step: 1, state: 'Box::new(Res(42))', memoryOrStack: 'Heap Res(42)', note: 'b owns heap allocation' },
      { step: 2, state: 'println!("use {}", b.0)', memoryOrStack: 'prints use 42', note: 'Deref reads 42' },
      { step: 3, state: 'exit inner block }', memoryOrStack: 'drop(&mut Res)', note: 'Prints drop 42 immediately' },
      { step: 4, state: 'println!("done")', memoryOrStack: 'Heap empty', note: 'Prints done with zero leaks' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: Recursive Struct Without `Box` Indirection',
        brokenCode: 'struct Node { v: i32, next: Option<Node> } // E0072 infinite size!',
        fixedCode: 'struct Node { v: i32, next: Option<Box<Node>> }',
        whyItBreaks: 'Inline recursive structs have unbounded stack size; `Box` fixes size to one pointer.',
      },
      {
        title: 'Trap 2: Holding Two Overlapping `RefCell::borrow_mut()` Guards',
        brokenCode: 'let mut a = cell.borrow_mut(); let mut b = cell.borrow_mut(); // PANIC!',
        fixedCode: '{ *cell.borrow_mut() += 1; } { *cell.borrow_mut() += 2; }',
        whyItBreaks: '`RefCell` enforces exclusive borrow rules at runtime and panics on simultaneous mutable borrows.',
      },
      {
        title: 'Trap 3: Moving Out of `Option<T>` Without `.take()` or `.as_deref()`',
        brokenCode: 'let x = opt.unwrap(); // consumes opt!',
        fixedCode: 'if let Some(ref x) = opt { /* borrows safely */ }',
        whyItBreaks: 'Calling `.unwrap()` moves ownership out of `opt` so later reads fail to compile.',
      },
    ],
    practiceSheet: [
      {
        id: 'rust-ch17-p1',
        difficulty: 'Easy',
        title: 'Box Heap Increment',
        prompt: 'Read an integer `n`, wrap it in `Box::new(n)`, add `10` through dereferencing `*b += 10`, and print it.',
        banglaHint: '`let mut b = Box::new(n); *b += 10;` লিখো।',
        starterCode: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n    let mut b = Box::new(s.trim().parse::<i64>().unwrap());\n    *b += 10;\n    println!("{}", b);\n}`,
        sampleStdin: '25',
        expectedOutput: '35',
      },
      {
        id: 'rust-ch17-p2',
        difficulty: 'Easy',
        title: 'Shared Rc Strong Count Check',
        prompt: 'Create `let a = Rc::new(x)`, clone two extra handles into a `Vec`, and print `Rc::strong_count(&a)` alongside `*a`.',
        banglaHint: '`vec![Rc::clone(&a), Rc::clone(&a)]` রাখলে কাউন্ট ৩ হবে।',
        starterCode: `use std::io::{self, Read};\nuse std::rc::Rc;\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n    let a = Rc::new(s.trim().parse::<i64>().unwrap());\n    let _v = vec![Rc::clone(&a), Rc::clone(&a)];\n    println!("{} {}", Rc::strong_count(&a), *a);\n}`,
        sampleStdin: '7',
        expectedOutput: '3 7',
      },
      {
        id: 'rust-ch17-p3',
        difficulty: 'Medium',
        title: 'Weak Upgrade Lifecycle Test',
        prompt: 'Upgrade an `Rc::downgrade(&sp)` weak pointer before and after `drop(sp)` printing `alive dead`.',
        banglaHint: '`wp.upgrade().is_some()` দিয়ে ডেটা জীবিত আছে কি না যাচাই করো।',
        starterCode: `use std::rc::Rc;\nfn main() {\n    let sp = Rc::new(88);\n    let wp = Rc::downgrade(&sp);\n    print!("{} ", if wp.upgrade().is_some() { "alive" } else { "dead" });\n    drop(sp);\n    println!("{}", if wp.upgrade().is_some() { "alive" } else { "dead" });\n}`,
        sampleStdin: '',
        expectedOutput: 'alive dead',
      },
      {
        id: 'rust-ch17-p4',
        difficulty: 'Medium',
        title: 'Shared Counter Across Structs via Rc<RefCell>',
        prompt: 'Share one `Rc<RefCell<i64>>` counter between two workers, add `a` from worker 1 and `b` from worker 2, and print final value.',
        banglaHint: '`*w1.log.borrow_mut() += a` এবং `*w2.log.borrow_mut() += b` করো।',
        starterCode: `use std::cell::RefCell;\nuse std::rc::Rc;\nuse std::io::{self, Read};\nstruct Worker { log: Rc<RefCell<i64>> }\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n    let mut it = s.split_whitespace();\n    let a: i64 = it.next().unwrap().parse().unwrap();\n    let b: i64 = it.next().unwrap().parse().unwrap();\n    let shared = Rc::new(RefCell::new(0));\n    let w1 = Worker { log: Rc::clone(&shared) };\n    let w2 = Worker { log: Rc::clone(&shared) };\n    *w1.log.borrow_mut() += a;\n    *w2.log.borrow_mut() += b;\n    println!("{}", shared.borrow());\n}`,
        sampleStdin: '12 18',
        expectedOutput: '30',
      },
      {
        id: 'rust-ch17-p5',
        difficulty: 'Hard',
        title: 'Heap Binary Search Tree Min & Max via Box<Node>',
        prompt: 'Insert `n` integers into a `Box<Node>` BST and print its minimum and maximum values.',
        banglaHint: 'সবচেয়ে বামের ও ডানের `Box<Node>` অনুসরণ করে `min max` প্রিন্ট করো।',
        starterCode: `use std::io::{self, Read};\nstruct Node { v: i64, l: Option<Box<Node>>, r: Option<Box<Node>> }\nfn insert(slot: &mut Option<Box<Node>>, x: i64) {\n    match slot {\n        None => *slot = Some(Box::new(Node { v: x, l: None, r: None })),\n        Some(n) => if x < n.v { insert(&mut n.l, x); } else { insert(&mut n.r, x); }\n    }\n}\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n    let mut it = s.split_whitespace();\n    let n: usize = it.next().unwrap().parse().unwrap();\n    let mut root = None;\n    for _ in 0..n { insert(&mut root, it.next().unwrap().parse().unwrap()); }\n    let mut lo = root.as_deref().unwrap();\n    while let Some(ref l) = lo.l { lo = l; }\n    let mut hi = root.as_deref().unwrap();\n    while let Some(ref r) = hi.r { hi = r; }\n    println!("{} {}", lo.v, hi.v);\n}`,
        sampleStdin: '5\n10 4 15 2 20',
        expectedOutput: '2 20',
      },
    ],
    miniBuild: {
      title: 'Mini-Build: Boxed Linked Task Chain Totalizer',
      description: 'Store tasks in a heap `Option<Box<TaskNode>>` chain and sum priorities cleanly with zero manual memory frees.',
      banglaGoal: '`Box<TaskNode>` হিপ চেইনে টাস্ক সাজিয়ে সবগুলো প্রায়োরিটি নিরাপদে যোগ করো।',
      combinesChapters: "Ch 11, 16, 17",
      starterCode: `use std::io::{self, Read};\nstruct Task { prio: i64, next: Option<Box<Task>> }\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n    let mut it = s.split_whitespace();\n    let n: usize = it.next().unwrap().parse().unwrap();\n    let mut head: Option<Box<Task>> = None;\n    for _ in 0..n {\n        let _name = it.next().unwrap();\n        let prio: i64 = it.next().unwrap().parse().unwrap();\n        head = Some(Box::new(Task { prio, next: head }));\n    }\n    let (mut cnt, mut tot) = (0, 0i64);\n    let mut cur = head.as_deref();\n    while let Some(t) = cur { cnt += 1; tot += t.prio; cur = t.next.as_deref(); }\n    println!("{} {}", cnt, tot);\n}`,
      sampleStdin: '3\nbuild 5\ntest 3\nship 7',
      expectedOutput: '3 15',
    },
    starterCode: `use std::io::{self, Read};\nstruct Task { prio: i64, next: Option<Box<Task>> }\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n    let mut it = s.split_whitespace();\n    let n: usize = it.next().unwrap().parse().unwrap();\n    let mut head: Option<Box<Task>> = None;\n    for _ in 0..n {\n        let _name = it.next().unwrap();\n        let prio: i64 = it.next().unwrap().parse().unwrap();\n        head = Some(Box::new(Task { prio, next: head }));\n    }\n    let (mut cnt, mut tot) = (0, 0i64);\n    let mut cur = head.as_deref();\n    while let Some(t) = cur { cnt += 1; tot += t.prio; cur = t.next.as_deref(); }\n    println!("{} {}", cnt, tot);\n}`,
    sampleStdin: '3\nbuild 5\ntest 3\nship 7',
    expectedSampleOutput: '3 15',
    testCases: [
      { id: 'rust17-t1', input: '3\nbuild 5\ntest 3\nship 7', expectedOutput: '3 15' },
      { id: 'rust17-t2', input: '2\na 10\nb 20', expectedOutput: '2 30', isHidden: true },
    ],
  },
  18: {
    chapterNumber: 18,
    title: 'Structs, impl Blocks, Encapsulation & Invariants in Rust',
    banglaTitle: 'স্ট্রাক্ট, impl ব্লক ও ইনভ্যারিয়েন্ট সুরক্ষা (Rust)',
    subtitle: 'Private-by-default struct fields, module encapsulation, &self / &mut self / self methods',
    zeroIntuition: {
      plainEnglishStory:
        'Rust intentionally avoids class inheritance and instead pairs clean `struct` data layouts with `impl` method blocks. Inside a module, every field of a struct is private by default—only marking a field `pub` exposes it externally, so constructors like `Wallet::new(init)` enforce invariants permanently at creation.\n\nMethod receivers in Rust explicitly declare ownership intent right in their signature: `&self` borrows read-only, `&mut self` mutates in place, and bare `self` consumes the value completely when closing a resource or transitioning states.',
      asciiFlowchart:
        'mod bank { pub struct Wallet { bal: i64 } }  // bal private outside mod!\n  Wallet::new(-5) -> clamps bal = 0\n  fn bal(&self)   -> read borrow (shared)\n  fn withdraw(&mut self, x) -> guarded write borrow',
      pseudocode: [
        '1. ISOLATE private struct fields inside a mod boundary',
        '2. CONSTRUCT instances via associated fn new(...) validating invariants',
        '3. PICK &self (read), &mut self (mutate), or self (consume) per method',
      ],
      banglaZeroToHero: {
        analogyTitle: 'মডিউল সীমানার ভেতর নিরাপদ `struct` আর স্পষ্ট ধার নেওয়ার তিনটি চাবি (`&self`, `&mut self`, `self`)',
        explanation:
          'অবজেক্ট-ওরিয়েন্টেড ভাষায় `class` থাকলেও Rust-এ ডেটা এবং ফাংশনকে সুন্দরভাবে আলাদা করা হয়: `struct` কেবল স্ট্যাক বা হিপে থাকা ফিল্ডগুলো ধরে রাখে, আর `impl StructName` ব্লকের ভেতরে তার সব মেথড লেখা হয়। Rust-এ নিরাপত্তা প্রথম থেকেই ডিফল্ট—একটি মডিউলের (`mod bank { ... }`) ভেতর থাকা `struct`-এর প্রতিটি ফিল্ড স্বয়ংক্রিয়ভাবে প্রাইভেট থাকে; কেবল `pub` লিখলেই বাইরের কোড তা দেখতে বা বদলাতে পারে! ফলে `Wallet::new(init)` অ্যাসোসিয়েটেড কনস্ট্রাক্টর দিয়ে ভ্যালিডেশন করলে মডিউলের বাইরে থেকে কেউ কখনোই নেগেটিভ ব্যালেন্স বসাতে পারে না। মেথডের প্রথম প্যারামিটারটি বলে দেয় মেথডটি কী অধিকার নিচ্ছে: `&self` মানে শুধুই পড়া (read-only), `&mut self` মানে ভেতরের মান বদলানো, আর শুধু `self` মানে অবজেক্টটিকে পুরোপুরি কনজিউম বা শেষ করে ফেলা (যেমন ফাইলের হ্যান্ডেল বন্ধ করা)। এছাড়া স্ট্রাক্টের গায়ে `#[derive(Debug, Clone, PartialEq)]` বসালে কোনোরকম অতিরিক্ত কোড ছাড়াই প্রিন্ট, কপি এবং তুলনার সুবিধা পাওয়া যায়। এই অধ্যায়ে স্ট্রাক্ট এনক্যাপসুলেশন ও তিনটি রিসিভার মোড শিখবে।',
        everydayExample: 'মডিউল হলো তালাবদ্ধ কক্ষ; বাইরে থেকে শুধু `pub fn deposit(&mut self)` কাউন্টার দিয়েই লেনদেন করা যায়।',
        keyTakeaways: [
          'Rust-এ ফিল্ড প্রাইভেসি ফাইল বা `mod` লেভেলে কাজ করে—এনক্যাপসুলেশন চাইলে `mod`-এ রাখো।',
          '`&self` দিয়ে রিড, `&mut self` দিয়ে রাইট এবং `self` দিয়ে ভ্যালু কনজিউম করো।',
          'ডিবাগ প্রিন্ট ও তুলনার জন্য `#[derive(Debug, Clone, PartialEq)]` ব্যবহার করো।',
        ],
      },
    },
    topics: [
      {
        id: 'rust-ch18-t1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Module-Encapsulated Struct & &self / &mut self Methods',
        englishParagraphs: [
          'Place `SafeCounter` inside `mod counter` keeping `val` private so outside callers must go through `sub(&mut self, d)`.',
        ],
        banglaParagraphs: [
          '`mod counter` এর ভেতরে `val` প্রাইভেট রেখে `sub` ও `value` মেথড দিয়ে মান শূন্যের নিচে নামা আটকাও।',
        ],
        memoryDiagram: 'SafeCounter::new(3) -> sub(2)->true -> sub(5)->false -> value()=1',
        code: `mod counter {
    pub struct SafeCounter { val: i64 }
    impl SafeCounter {
        pub fn new(start: i64) -> Self { Self { val: start.max(0) } }
        pub fn sub(&mut self, d: i64) -> bool {
            if d <= 0 || d > self.val { return false; }
            self.val -= d;
            true
        }
        pub fn value(&self) -> i64 { self.val }
    }
}
fn main() {
    let mut c = counter::SafeCounter::new(3);
    println!("{} {} {}", c.sub(2), c.sub(5), c.value());
}`,
        stdin: '',
        expectedOutput: 'true false 1',
        lineByLine: [
          { lineNumber: 'Line 2', codeSnippet: 'pub struct SafeCounter { val: i64 }', whatItMeans: 'Public struct with private `val` field inside `mod counter`.', whyItIsThere: 'Blocks `c.val = -10` outside `mod counter`.', ifDeletedError: 'Struct unavailable to `main`.' },
          { lineNumber: 'Line 5', codeSnippet: 'pub fn sub(&mut self, d: i64) -> bool {', whatItMeans: 'Exclusive mutable borrow receiver mutating `val` safely.', whyItIsThere: 'Guards non-negative invariant before subtraction.', ifDeletedError: 'Cannot decrement counter.' },
        ],
      },
      {
        id: 'rust-ch18-t2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Encapsulated Wallet Ledger Parsing Stdin Commands',
        englishParagraphs: [
          'Parse an initial balance and `D x` / `W x` transactions cleanly through a `mod bank` Wallet.',
        ],
        banglaParagraphs: [
          '`mod bank` ভেতরের `Wallet` স্ট্রাক্ট দিয়ে স্ট্যান্ডার্ড ইনপুটের ডিপোজিট ও উইথড্র হিসাব করো।',
        ],
        memoryDiagram: 'Wallet(100) -> D 50 -> 150 -> W 200 ignored -> W 30 -> 120',
        code: `use std::io::{self, Read};
mod bank {
    pub struct Wallet { bal: i64 }
    impl Wallet {
        pub fn new(init: i64) -> Self { Self { bal: init.max(0) } }
        pub fn deposit(&mut self, x: i64) { if x > 0 { self.bal += x; } }
        pub fn withdraw(&mut self, x: i64) { if x > 0 && x <= self.bal { self.bal -= x; } }
        pub fn bal(&self) -> i64 { self.bal }
    }
}
fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let mut it = s.split_whitespace();
    let mut w = bank::Wallet::new(it.next().unwrap().parse().unwrap());
    let n: usize = it.next().unwrap().parse().unwrap();
    for _ in 0..n {
        let op = it.next().unwrap();
        let amt: i64 = it.next().unwrap().parse().unwrap();
        if op == "D" { w.deposit(amt); } else { w.withdraw(amt); }
    }
    println!("{}", w.bal());
}`,
        stdin: '100 3\nD 50\nW 200\nW 30',
        expectedOutput: '120',
        lineByLine: [
          { lineNumber: 'Line 7', codeSnippet: 'pub fn withdraw(&mut self, x: i64) { if x > 0 && x <= self.bal { self.bal -= x; } }', whatItMeans: 'Enforces overdraft check on private `bal`.', whyItIsThere: 'Prevents negative balances from any caller.', ifDeletedError: 'Cannot withdraw from wallet.' },
        ],
      },
      {
        id: 'rust-ch18-t3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Deriving Ord & Eq on Task Structs',
        englishParagraphs: [
          'Attach `#[derive(Debug, Eq, PartialEq, Ord, PartialOrd)]` so Rust lexicographically compares `Task` fields automatically.',
        ],
        banglaParagraphs: [
          '`#[derive(Ord, PartialOrd)]` দিয়ে কোনো তুলনা ফাংশন ছাড়াই `Task` স্ট্রাক্টের সর্বনিম্ন প্রায়োরিটি খুঁজে নাও।',
        ],
        memoryDiagram: 'Task { prio: 1, name: "lint" } < Task { prio: 3, name: "ship" }',
        code: `#[derive(Eq, PartialEq, Ord, PartialOrd)]
struct Task {
    prio: i32,
    name: &'static str,
}
fn main() {
    let tasks = [Task { prio: 3, name: "ship" }, Task { prio: 1, name: "lint" }, Task { prio: 2, name: "test" }];
    let top = tasks.iter().min().unwrap();
    println!("{}:{}", top.name, top.prio);
}`,
        stdin: '',
        expectedOutput: 'lint:1',
        lineByLine: [
          { lineNumber: 'Line 1', codeSnippet: '#[derive(Eq, PartialEq, Ord, PartialOrd)]', whatItMeans: 'Auto-implements total ordering starting from top field `prio`.', whyItIsThere: 'Lets `.iter().min()` rank tasks directly.', ifDeletedError: 'Compile error: Task does not implement Ord.' },
        ],
      },
      {
        id: 'rust-ch18-t4',
        badge: 'Example 4: Bug Trap vs. Production Pattern',
        title: 'Consuming `self` State Transition Guard',
        englishParagraphs: [
          'Taking bare `self` (instead of `&self`) moves and destroys a handle on close so it can never be accidentally reused afterward!',
        ],
        banglaParagraphs: [
          'মেথডে `&self`-এর বদলে `self` নিলে মেথড কলের পর অবজেক্টটি মুভ হয়ে যায়—তাই ভুল করে পুনরায় ব্যবহার করা অসম্ভব হয়ে পড়ে!',
        ],
        memoryDiagram: 'door.lock() moves Door by value -> compile error if reused!',
        code: `struct Ticket { id: i32 }
impl Ticket {
    fn redeem(self) -> i32 { self.id * 10 }
}
fn main() {
    let t = Ticket { id: 7 };
    println!("{}", t.redeem());
}`,
        stdin: '',
        expectedOutput: '70',
        lineByLine: [
          { lineNumber: 'Line 3', codeSnippet: 'fn redeem(self) -> i32 { self.id * 10 }', whatItMeans: 'Consumes `Ticket` by value so it can only be redeemed once.', whyItIsThere: 'Compile-time guarantee against double redemption.', ifDeletedError: 'Ticket cannot be redeemed.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 1', codeSnippet: 'mod counter {', whatItMeans: 'Creates privacy boundary encapsulating `val`.', whyItIsThere: 'Enforces invariant checks through methods only.', ifDeletedError: 'Private fields remain visible inside same module.' },
      { lineNumber: 'Line 4', codeSnippet: 'pub fn new(start: i64) -> Self {', whatItMeans: 'Associated constructor validating initial value.', whyItIsThere: 'Guarantees valid starting state.', ifDeletedError: 'Cannot construct `SafeCounter` externally.' },
      { lineNumber: 'Line 5', codeSnippet: 'pub fn sub(&mut self, d: i64) -> bool {', whatItMeans: 'Mutable receiver updating `self.val`.', whyItIsThere: 'Prevents `val` dropping below 0.', ifDeletedError: 'Cannot mutate counter.' },
    ],
    dryRunTable: [
      { step: 1, state: 'SafeCounter::new(3)', memoryOrStack: 'val = 3', note: 'Stack struct allocated' },
      { step: 2, state: 'c.sub(2)', memoryOrStack: 'val = 1', note: 'Returns true' },
      { step: 3, state: 'c.sub(5)', memoryOrStack: 'val = 1', note: '5 > 1 guarded -> false' },
      { step: 4, state: 'c.value()', memoryOrStack: 'true false 1', note: '&self borrows read-only' },
    ],
    harryBugTraps: [
      { title: 'Trap 1: Trying to Mutate Inside `&self` Method', brokenCode: 'fn inc(&self) { self.val += 1; } // compile error!', fixedCode: 'fn inc(&mut self) { self.val += 1; }', whyItBreaks: '`&self` is an immutable shared reference; mutation strictly requires `&mut self`.' },
      { title: 'Trap 2: Relying on Field Privacy Within Same Module', brokenCode: 'struct W { bal: i64 } // fn main() in same file CAN touch w.bal!', fixedCode: 'mod bank { pub struct W { bal: i64 } ... }', whyItBreaks: 'Rust privacy runs at module granularity—wrap private fields inside a child `mod`.' },
      { title: 'Trap 3: Calling `self`-Consuming Method Twice', brokenCode: 't.redeem(); t.redeem(); // use of moved value `t`!', fixedCode: 'Take `&self` if reusable, or consume intentionally once.', whyItBreaks: 'A `self` receiver moves ownership out of the caller binding permanently.' },
    ],
    practiceSheet: [
      {
        id: 'rust-ch18-p1',
        difficulty: 'Easy',
        title: 'Rectangle Struct Area & Perimeter',
        prompt: 'Build `Rect { w, h }` clamping dimensions `>= 1` and outputting `area()` and `perim()`.',
        banglaHint: '`Rect::new(w, h)` বানিয়ে `area(&self)` ও `perim(&self)` কল করো।',
        starterCode: `use std::io::{self, Read};\nstruct Rect { w: i64, h: i64 }\nimpl Rect {\n    fn new(w: i64, h: i64) -> Self { Self { w: w.max(1), h: h.max(1) } }\n    fn area(&self) -> i64 { self.w * self.h }\n    fn perim(&self) -> i64 { 2 * (self.w + self.h) }\n}\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    let mut it = s.split_whitespace();\n    let r = Rect::new(it.next().unwrap().parse().unwrap(), it.next().unwrap().parse().unwrap());\n    println!("{} {}", r.area(), r.perim());\n}`,
        sampleStdin: '5 8',
        expectedOutput: '40 26',
      },
      {
        id: 'rust-ch18-p2',
        difficulty: 'Easy',
        title: 'Sensor Clamped Celsius Setter',
        prompt: 'Create `Sensor` with `set_temp(&mut self, v)` clamping `< -273` to `-273`.',
        banglaHint: '`self.t = v.max(-273)` দিয়ে মান সংরক্ষণ করো।',
        starterCode: `use std::io::{self, Read};\nstruct Sensor { t: i64 }\nimpl Sensor {\n    fn new() -> Self { Self { t: 0 } }\n    fn set(&mut self, v: i64) { self.t = v.max(-273); }\n    fn get(&self) -> i64 { self.t }\n}\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    let mut sensor = Sensor::new();\n    sensor.set(s.trim().parse().unwrap());\n    println!("{}", sensor.get());\n}`,
        sampleStdin: '-350',
        expectedOutput: '-273',
      },
      {
        id: 'rust-ch18-p3',
        difficulty: 'Medium',
        title: 'Top Student Selector via Derived Ord',
        prompt: 'Read `n` `name score` pairs into `Student` structs and print top scorer.',
        banglaHint: '`max_by_key(|st| st.score)` ব্যবহার করে সেরা স্টুডেন্ট বের করো।',
        starterCode: `use std::io::{self, Read};\nstruct Student { name: String, score: i64 }\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    let mut it = s.split_whitespace();\n    let n: usize = it.next().unwrap().parse().unwrap();\n    let mut v = Vec::with_capacity(n);\n    for _ in 0..n {\n        v.push(Student { name: it.next().unwrap().into(), score: it.next().unwrap().parse().unwrap() });\n    }\n    let best = v.iter().max_by_key(|x| x.score).unwrap();\n    println!("{} {}", best.name, best.score);\n}`,
        sampleStdin: '3\nArif 78 Sadia 94 Nabil 85',
        expectedOutput: 'Sadia 94',
      },
      {
        id: 'rust-ch18-p4',
        difficulty: 'Medium',
        title: 'Normalized Fraction PartialEq',
        prompt: 'Normalize `Frac::new(n, d)` with `gcd` and verify equality via `#[derive(PartialEq)]`.',
        banglaHint: '`#[derive(PartialEq)]` এবং `gcd` দিয়ে ভগ্নাংশ তুলনা করো।',
        starterCode: `use std::io::{self, Read};\nfn gcd(a: i64, b: i64) -> i64 { if b == 0 { a.abs() } else { gcd(b, a % b) } }\n#[derive(PartialEq)]\nstruct Frac { n: i64, d: i64 }\nimpl Frac { fn new(n: i64, d: i64) -> Self { let g = gcd(n, d); Self { n: n / g, d: d / g } } }\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    let v: Vec<i64> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();\n    println!("{}", Frac::new(v[0], v[1]) == Frac::new(v[2], v[3]));\n}`,
        sampleStdin: '2 4 1 2',
        expectedOutput: 'true',
      },
      {
        id: 'rust-ch18-p5',
        difficulty: 'Hard',
        title: 'Encapsulated History Stack with Cap',
        prompt: 'Wrap a `VecDeque<i64>` inside `mod stack` capping capacity at `cap` over `PUSH x` and `POP` operations.',
        banglaHint: '`len() == cap` হলে `pop_front()` করে নতুন মান `push_back` করো।',
        starterCode: `use std::collections::VecDeque;\nuse std::io::{self, Read};\nstruct History { cap: usize, dq: VecDeque<i64> }\nimpl History {\n    fn new(cap: usize) -> Self { Self { cap, dq: VecDeque::with_capacity(cap) } }\n    fn push(&mut self, x: i64) { if self.dq.len() == self.cap { self.dq.pop_front(); } self.dq.push_back(x); }\n    fn pop(&mut self) { self.dq.pop_back(); }\n    fn sum(&self) -> i64 { self.dq.iter().sum() }\n}\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    let mut it = s.split_whitespace();\n    let cap: usize = it.next().unwrap().parse().unwrap();\n    let n: usize = it.next().unwrap().parse().unwrap();\n    let mut h = History::new(cap);\n    for _ in 0..n {\n        if it.next().unwrap() == "PUSH" { h.push(it.next().unwrap().parse().unwrap()); } else { h.pop(); }\n    }\n    println!("{}", h.sum());\n}`,
        sampleStdin: '2 4 PUSH 10 PUSH 20 PUSH 30 POP',
        expectedOutput: '20',
      },
    ],
    miniBuild: {
      title: 'Mini-Build: Mod-Encapsulated Inventory Stock Engine',
      description: 'Use a `mod store` private `qty` struct with `&mut self` add/sell invariant checks over stdin transactions.',
      banglaGoal: '`mod store` দিয়ে প্রাইভেট স্টক ইনভেন্টরি লেজার তৈরি করো।',
      combinesChapters: 'Ch 11, 16, 18',
      starterCode: `use std::io::{self, Read};\nmod store {\n    pub struct Stock { qty: i64 }\n    impl Stock {\n        pub fn new(q: i64) -> Self { Self { qty: q.max(0) } }\n        pub fn add(&mut self, x: i64) { if x > 0 { self.qty += x; } }\n        pub fn sell(&mut self, x: i64) { if x > 0 && x <= self.qty { self.qty -= x; } }\n        pub fn qty(&self) -> i64 { self.qty }\n    }\n}\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    let mut it = s.split_whitespace();\n    let mut st = store::Stock::new(it.next().unwrap().parse().unwrap());\n    while let (Some(op), Some(v)) = (it.next(), it.next()) {\n        let x: i64 = v.parse().unwrap();\n        if op == "ADD" { st.add(x); } else if op == "SELL" { st.sell(x); }\n    }\n    println!("{}", st.qty());\n}`,
      sampleStdin: '10 ADD 15 SELL 30 SELL 8',
      expectedOutput: '17',
    },
    starterCode: `use std::io::{self, Read};\nmod store {\n    pub struct Stock { qty: i64 }\n    impl Stock {\n        pub fn new(q: i64) -> Self { Self { qty: q.max(0) } }\n        pub fn add(&mut self, x: i64) { if x > 0 { self.qty += x; } }\n        pub fn sell(&mut self, x: i64) { if x > 0 && x <= self.qty { self.qty -= x; } }\n        pub fn qty(&self) -> i64 { self.qty }\n    }\n}\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    let mut it = s.split_whitespace();\n    let mut st = store::Stock::new(it.next().unwrap().parse().unwrap());\n    while let (Some(op), Some(v)) = (it.next(), it.next()) {\n        let x: i64 = v.parse().unwrap();\n        if op == "ADD" { st.add(x); } else if op == "SELL" { st.sell(x); }\n    }\n    println!("{}", st.qty());\n}`,
    sampleStdin: '10 ADD 15 SELL 30 SELL 8',
    expectedSampleOutput: '17',
    testCases: [
      { id: 'rust18-t1', input: '10 ADD 15 SELL 30 SELL 8', expectedOutput: '17' },
      { id: 'rust18-t2', input: '5 ADD 5 SELL 10', expectedOutput: '0', isHidden: true },
    ],
  },
  19: {
    chapterNumber: 19,
    title: 'Traits, Trait Bounds & Dynamic Dispatch (dyn Trait) in Rust',
    banglaTitle: 'ট্রেইট, স্ট্যাটিক বনাম dyn Trait পলিমরফিজম (Rust)',
    subtitle: 'trait definitions, impl Trait static monomorphization, Box<dyn Trait>, and default methods',
    zeroIntuition: {
      plainEnglishStory:
        'Traits are Rust’s superpower replacing class inheritance: a `trait` defines shared behavior (`fn area(&self) -> i64;`) that any struct can implement cleanly—even across crates! Rust gives you explicit choice between zero-cost static dispatch (`fn run(x: &impl Trait)`, monomorphized at compile time) and heterogeneous dynamic dispatch (`Vec<Box<dyn Shape>>`) when mixing different concrete structs inside one container.\n\nUnlike OOP classes where fields and behavior tangle together, composition with traits lets you add capabilities modularly without diamond inheritance bugs.',
      asciiFlowchart:
        'trait Shape { fn area(&self) -> i64; }\n  impl Shape for Rect { ... }   impl Shape for Square { ... }\n  &impl Shape        -> Zero-cost static dispatch (inlined!)\n  Vec<Box<dyn Shape>> -> Mixed types via fat pointer vtable!',
      pseudocode: [
        '1. DEFINE shared behavior contract with trait Name { fn ...; }',
        '2. IMPLEMENT trait explicitly per concrete struct via impl Trait for Type',
        '3. PICK impl Trait for homogeneous speed or Box<dyn Trait> for mixed collections',
      ],
      banglaZeroToHero: {
        analogyTitle: 'ইনহেরিট্যান্স নয় বরং দক্ষতার ব্যাজ (`trait`), আর ফিক্সড বনাম ডাইনামিক ডিসপ্যাচ',
        explanation:
          'সি++ বা জাভার মতো ক্লাস-ইনহেরিট্যান্স (`extends`) না রেখে রাস্ট "কম্পোজিশন ও ট্রেইট" মডেল ব্যবহার করে। একটি `trait` হলো দক্ষতার সার্টিফিকেট—যেমন `trait Shape { fn area(&self) -> i64; }` মানে যেকোনো স্ট্রাক্ট `impl Shape for Rect` লিখে এই ট্রেইট গ্রহণ করতে পারে, এমনকি স্ট্যান্ডার্ড লাইব্রেরির পুরোনো টাইপের ওপরও! রাস্ট তোমাকে স্পষ্ট নিয়ন্ত্রণ দেয় কখন স্ট্যাটিক স্পিড নেবে আর কখন ডাইনামিক নমনীয়তা নেবে। যখন একটি ফাংশনে `fn print_area(s: &impl Shape)` লেখো, তখন কম্পাইলার প্রতিটি টাইপের জন্য আলাদা মেশিন কোড তৈরি করে ইনলাইন করে দেয় (জিরো-কস্ট স্ট্যাটিক ডিসপ্যাচ)। কিন্তু যখন একই ভেক্টরের ভেতরে `Rect` এবং `Square` দুটো ভিন্ন স্ট্রাক্টকে পাশাপাশি রাখতে চাও, তখন `Vec<Box<dyn Shape>>` ব্যবহার করতে হয়—যেখানে হিপে রাখা অবজেক্ট ও একটি ভার্চুয়াল মেথড টেবিল (`vtable`) মিলে রানটাইমে সঠিক `area()` চালায়! `enum` ও ট্রেইট একসাথে ব্যবহার করলে বেশিরভাগ সময় `Box<dyn Trait>` ছাড়াই অতি দ্রুত কোড লেখা সম্ভব। ট্রেইটের ভেতর ডিফল্ট মেথডও দিয়ে রাখা যায় যাতে সব স্ট্রাক্টকে বারবার একই কোড না লিখতে হয়। এই অধ্যায়ে ট্রেইট, `impl Trait` এবং `Box<dyn Trait>` শিখবে।',
        everydayExample: 'একটি স্কুলে প্যারেন্ট-চাইল্ড বংশপরিচয় না দেখে "সাঁতার জানে (`Swimmer` ট্রেইট)" ব্যাজ দেখে সবাইকে সুইমিং পুলে পাঠানো।',
        keyTakeaways: [
          'একই ভেক্টরে বিভিন্ন ধরনের স্ট্রাক্ট একসাথে রাখতে `Vec<Box<dyn Trait>>` ব্যবহার করতে হয়।',
          'ফাংশন প্যারামিটারে `&impl Trait` লিখলে জিরো-কস্ট স্ট্যাটিক ডিসপ্যাচ হয় (vtable খরচ নেই)।',
          'সীমিত সংখ্যক পরিচিত ভ্যারিয়েন্ট হলে `enum` ম্যাচিং `Box<dyn Trait>`-এর চেয়েও দ্রুত।',
        ],
      },
    },
    topics: [
      {
        id: 'rust-ch19-t1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Trait Definition & Heterogeneous Vec<Box<dyn Trait>>',
        englishParagraphs: [
          'Define `trait Notifier` and store both `Email` and `Sms` inside a single `Vec<Box<dyn Notifier>>`.',
        ],
        banglaParagraphs: [
          '`Vec<Box<dyn Notifier>>`-এ `Email` ও `Sms` একসাথে রেখে ডাইনামিক পলিমরফিজম চালাও।',
        ],
        memoryDiagram: 'Vec<Box<dyn Notifier>> -> fat ptrs (data, vtable)',
        code: `trait Notifier {
    fn send(&self, msg: &str) -> String;
}
struct Email;
struct Sms;
impl Notifier for Email {
    fn send(&self, msg: &str) -> String { format!("EMAIL:{}", msg) }
}
impl Notifier for Sms {
    fn send(&self, msg: &str) -> String { format!("SMS:{}", msg) }
}
fn main() {
    let list: Vec<Box<dyn Notifier>> = vec![Box::new(Email), Box::new(Sms)];
    for c in &list { println!("{}", c.send("OK")); }
}`,
        stdin: '',
        expectedOutput: 'EMAIL:OK\nSMS:OK',
        lineByLine: [
          { lineNumber: 'Line 1', codeSnippet: 'trait Notifier { fn send(&self, msg: &str) -> String; }', whatItMeans: 'Declares behavioral interface without struct coupling.', whyItIsThere: 'Allows disparate structs to share one contract.', ifDeletedError: 'Cannot abstract over `Email` and `Sms`.' },
          { lineNumber: 'Line 13', codeSnippet: 'let list: Vec<Box<dyn Notifier>> = vec![Box::new(Email), Box::new(Sms)];', whatItMeans: 'Heap-allocates heterogeneous trait objects behind fat pointers.', whyItIsThere: 'Single `Vec` requires fixed element size.', ifDeletedError: 'Mixing `Email` and `Sms` in one `Vec` fails sizing check.' },
        ],
      },
      {
        id: 'rust-ch19-t2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Zero-Cost Static Dispatch With `&impl Trait`',
        englishParagraphs: [
          'Accept `&impl Priced` in a helper function so `rustc` monomorphizes and inlines calculations with zero vtable overhead.',
        ],
        banglaParagraphs: [
          '`&impl Priced` প্যারামিটার দিয়ে জিরো-ওভারহেড স্ট্যাটিক ডিসপ্যাচ ফাংশন লেখো।',
        ],
        memoryDiagram: 'apply_tax(&impl Priced) -> monomorphized inline arithmetic',
        code: `use std::io::{self, Read};
trait Priced { fn base(&self) -> i64; }
struct BonusOrder { amt: i64, fee: i64 }
impl Priced for BonusOrder { fn base(&self) -> i64 { self.amt + self.fee } }
fn print_total(item: &impl Priced) {
    println!("{}", item.base());
}
fn main() {
    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();
    let mut it = s.split_whitespace();
    let o = BonusOrder { amt: it.next().unwrap().parse().unwrap(), fee: it.next().unwrap().parse().unwrap() };
    print_total(&o);
}`,
        stdin: '1000 250',
        expectedOutput: '1250',
        lineByLine: [
          { lineNumber: 'Line 5', codeSnippet: 'fn print_total(item: &impl Priced) {', whatItMeans: 'Accepts any type implementing `Priced` statically.', whyItIsThere: 'Zero heap allocation and full compiler inlining.', ifDeletedError: 'Cannot reuse helper across priced types.' },
        ],
      },
      {
        id: 'rust-ch19-t3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Default Trait Methods Reused Across Implementers',
        englishParagraphs: [
          'Provide a default `greet(&self)` implementation inside a trait so concrete types only need to define `name(&self)`.',
        ],
        banglaParagraphs: [
          'ট্রেইটের ভেতরে ডিফল্ট মেথড দিয়ে সব ইমপ্লিমেন্টিং টাইপে কমন ফরম্যাটিং শেয়ার করো।',
        ],
        memoryDiagram: 'trait Tag { fn id(); fn badge() { format!("[{}]", self.id()) } }',
        code: `trait Tagged {
    fn tag(&self) -> &'static str;
    fn badge(&self) -> String { format!("[{}]", self.tag()) }
}
struct Admin;
impl Tagged for Admin { fn tag(&self) -> &'static str { "ADMIN" } }
fn main() {
    println!("{}", Admin.badge());
}`,
        stdin: '',
        expectedOutput: '[ADMIN]',
        lineByLine: [
          { lineNumber: 'Line 3', codeSnippet: 'fn badge(&self) -> String { format!("[{}]", self.tag()) }', whatItMeans: 'Default method calling abstract `self.tag()`.', whyItIsThere: 'Eliminates repeating `badge()` across every struct.', ifDeletedError: '`Admin.badge()` fails to resolve.' },
        ],
      },
      {
        id: 'rust-ch19-t4',
        badge: 'Example 4: Bug Trap vs. Production Pattern',
        title: 'Recursive `Box<dyn Expr>` Tree Evaluation',
        englishParagraphs: [
          'Model composite AST nodes cleanly using `Box<dyn Expr>` child pointers.',
        ],
        banglaParagraphs: [
          '`Box<dyn Expr>` ব্যবহার করে রিকার্সিভ এক্সপ্রেশন ট্রি নিরাপদে মূল্যায়ন করো।',
        ],
        memoryDiagram: 'Add(Add(Num(3), Num(4)), Num(5)).eval() -> 12',
        code: `trait Expr { fn eval(&self) -> i64; }
struct Num(i64);
impl Expr for Num { fn eval(&self) -> i64 { self.0 } }
struct Add(Box<dyn Expr>, Box<dyn Expr>);
impl Expr for Add { fn eval(&self) -> i64 { self.0.eval() + self.1.eval() } }
fn main() {
    let tree = Add(Box::new(Add(Box::new(Num(3)), Box::new(Num(4)))), Box::new(Num(5)));
    println!("{}", tree.eval());
}`,
        stdin: '',
        expectedOutput: '12',
        lineByLine: [
          { lineNumber: 'Line 4', codeSnippet: 'struct Add(Box<dyn Expr>, Box<dyn Expr>);', whatItMeans: 'Holds owning trait objects of unknown concrete size.', whyItIsThere: 'Enables arbitrary recursive expression trees.', ifDeletedError: 'Compile error: recursive type has infinite size.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 1', codeSnippet: 'trait Notifier {', whatItMeans: 'Defines abstract behavior contract.', whyItIsThere: 'Decouples orchestration from concrete channels.', ifDeletedError: '`Notifier` undefined.' },
      { lineNumber: 'Line 6', codeSnippet: 'impl Notifier for Email {', whatItMeans: 'Connects `Email` type to `Notifier` contract.', whyItIsThere: 'Allows `Email` inside `Vec<Box<dyn Notifier>>`.', ifDeletedError: 'Compile error: trait Notifier is not implemented for Email.' },
      { lineNumber: 'Line 13', codeSnippet: 'Vec<Box<dyn Notifier>>', whatItMeans: 'Homogeneous vector of heap fat pointers.', whyItIsThere: 'Stores distinct zero-sized or varying structs together.', ifDeletedError: 'Cannot mix concrete structs in one `Vec`.' },
    ],
    dryRunTable: [
      { step: 1, state: 'vec![Box::new(Email), Box::new(Sms)]', memoryOrStack: '2 fat pointers', note: 'Each holds data ptr + vtable ptr' },
      { step: 2, state: 'c = &Email', memoryOrStack: 'c.send("OK")', note: 'vtable calls Email::send -> EMAIL:OK' },
      { step: 3, state: 'c = &Sms', memoryOrStack: 'c.send("OK")', note: 'vtable calls Sms::send -> SMS:OK' },
      { step: 4, state: 'list dropped', memoryOrStack: 'Boxes auto-freed', note: 'Zero leaks via RAII' },
    ],
    harryBugTraps: [
      { title: 'Trap 1: Trying to Return `dyn Trait` Directly Without `Box`', brokenCode: 'fn make() -> dyn Shape { ... } // size unknown at compile time!', fixedCode: 'fn make() -> Box<dyn Shape> { Box::new(...) }', whyItBreaks: 'Trait objects are unsized (`!Sized`); return behind `Box<dyn Trait>` or `&dyn Trait`.' },
      { title: 'Trap 2: Returning Different Types from `-> impl Trait`', brokenCode: 'fn pick(b: bool) -> impl Shape { if b { Rect } else { Square } } // error!', fixedCode: 'fn pick(b: bool) -> Box<dyn Shape>', whyItBreaks: '`impl Trait` requires ONE concrete static return type across all branches.' },
      { title: 'Trap 3: Breaking Object Safety With `Self` Return in `dyn Trait`', brokenCode: 'trait Bad { fn dup(&self) -> Self; } // cannot make Box<dyn Bad>!', fixedCode: 'Keep `dyn` trait methods free of `Self` or generic parameters.', whyItBreaks: 'Object-safe traits must have known parameter/return layouts inside vtables.' },
    ],
    practiceSheet: [
      {
        id: 'rust-ch19-p1',
        difficulty: 'Easy',
        title: 'Animal Trait Object Chorus',
        prompt: 'Implement `trait Animal { fn speak(&self) -> &\'static str; }` on `Dog` and `Cat` over stdin `D`/`C` tokens.',
        banglaHint: '`Vec<Box<dyn Animal>>` দিয়ে শব্দগুলো স্পেস দিয়ে জয়েন করে প্রিন্ট করো।',
        starterCode: `use std::io::{self, Read};\ntrait Animal { fn speak(&self) -> &'static str; }\nstruct Dog; impl Animal for Dog { fn speak(&self) -> &'static str { "WOOF" } }\nstruct Cat; impl Animal for Cat { fn speak(&self) -> &'static str { "MEOW" } }\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    let pets: Vec<Box<dyn Animal>> = s.split_whitespace().map(|t| if t == "D" { Box::new(Dog) as Box<dyn Animal> } else { Box::new(Cat) }).collect();\n    let out: Vec<&str> = pets.iter().map(|p| p.speak()).collect();\n    println!("{}", out.join(" "));\n}`,
        sampleStdin: 'D C D',
        expectedOutput: 'WOOF MEOW WOOF',
      },
      {
        id: 'rust-ch19-p2',
        difficulty: 'Easy',
        title: 'Static Pricing Helper Trait',
        prompt: 'Implement `trait Discount` for `Flat(d)` and apply it to stdin `price off`.',
        banglaHint: '`fn checkout(p: i64, rule: &impl Discount)` দিয়ে রিটার্ন প্রিন্ট করো।',
        starterCode: `use std::io::{self, Read};\ntrait Discount { fn apply(&self, p: i64) -> i64; }\nstruct Flat(i64);\nimpl Discount for Flat { fn apply(&self, p: i64) -> i64 { (p - self.0).max(0) } }\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    let mut it = s.split_whitespace();\n    let p: i64 = it.next().unwrap().parse().unwrap();\n    let off: i64 = it.next().unwrap().parse().unwrap();\n    println!("{}", Flat(off).apply(p));\n}`,
        sampleStdin: '500 120',
        expectedOutput: '380',
      },
      {
        id: 'rust-ch19-p3',
        difficulty: 'Medium',
        title: 'Dynamic Strategy Totalizer',
        prompt: 'Read `n` `F x d` or `P x p` discount rules into `Box<dyn Rule>` and sum final totals.',
        banglaHint: '`Flat(d)` ও `Pct(p)` ট্রেইট অবজেক্ট থেকে `(x - x*p/100)` যোগ করো।',
        starterCode: `use std::io::{self, Read};\ntrait Rule { fn apply(&self, x: i64) -> i64; }\nstruct Flat(i64); impl Rule for Flat { fn apply(&self, x: i64) -> i64 { (x - self.0).max(0) } }\nstruct Pct(i64); impl Rule for Pct { fn apply(&self, x: i64) -> i64 { x - (x * self.0) / 100 } }\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    let mut it = s.split_whitespace();\n    let n: usize = it.next().unwrap().parse().unwrap();\n    let mut tot = 0;\n    for _ in 0..n {\n        let k = it.next().unwrap(); let x: i64 = it.next().unwrap().parse().unwrap(); let d: i64 = it.next().unwrap().parse().unwrap();\n        let r: Box<dyn Rule> = if k == "F" { Box::new(Flat(d)) } else { Box::new(Pct(d)) };\n        tot += r.apply(x);\n    }\n    println!("{}", tot);\n}`,
        sampleStdin: '2 F 100 15 P 200 10',
        expectedOutput: '265',
      },
      {
        id: 'rust-ch19-p4',
        difficulty: 'Medium',
        title: 'Default Trait Formatter Method',
        prompt: 'Add a default `fmt_line(&self)` method on `trait Event` formatting `[TAG] msg` across `Info` and `Warn`.',
        banglaHint: '`tag(&self)` এবং `msg(&self)` ব্যবহার করে ট্রেইটের ডিফল্ট `fmt_line` লেখো।',
        starterCode: `use std::io::{self, Read};\ntrait Event {\n    fn tag(&self) -> &'static str;\n    fn body(&self) -> &str;\n    fn fmt_line(&self) -> String { format!("[{}] {}", self.tag(), self.body()) }\n}\nstruct Info(String); impl Event for Info { fn tag(&self) -> &'static str { "INFO" } fn body(&self) -> &str { &self.0 } }\nstruct Warn(String); impl Event for Warn { fn tag(&self) -> &'static str { "WARN" } fn body(&self) -> &str { &self.0 } }\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    for line in s.lines() {\n        let mut parts = line.splitn(2, ' ');\n        let tag = parts.next().unwrap(); let msg = parts.next().unwrap_or("").to_string();\n        let ev: Box<dyn Event> = if tag == "INFO" { Box::new(Info(msg)) } else { Box::new(Warn(msg)) };\n        println!("{}", ev.fmt_line());\n    }\n}`,
        sampleStdin: 'INFO Ready\nWARN LowMem',
        expectedOutput: '[INFO] Ready\n[WARN] LowMem',
      },
      {
        id: 'rust-ch19-p5',
        difficulty: 'Hard',
        title: 'Box<dyn Expr> Prefix Evaluator',
        prompt: 'Parse prefix tokens (`+`, `*`, integers) recursively into `Box<dyn Expr>` nodes and evaluate.',
        banglaHint: 'ইটারেটর `it` থেকে রিকার্সিভ `parse(&mut it)` দিয়ে `Add`/`Mul`/`Num` ট্রি বানাও।',
        starterCode: `use std::io::{self, Read};\ntrait Expr { fn eval(&self) -> i64; }\nstruct Num(i64); impl Expr for Num { fn eval(&self) -> i64 { self.0 } }\nstruct Bin(&'static str, Box<dyn Expr>, Box<dyn Expr>);\nimpl Expr for Bin { fn eval(&self) -> i64 { if self.0 == "+" { self.1.eval() + self.2.eval() } else { self.1.eval() * self.2.eval() } } }\nfn parse<'a>(it: &mut impl Iterator<Item = &'a str>) -> Box<dyn Expr> {\n    match it.next().unwrap() {\n        "+" => Box::new(Bin("+", parse(it), parse(it))),\n        "*" => Box::new(Bin("*", parse(it), parse(it))),\n        v => Box::new(Num(v.parse().unwrap())),\n    }\n}\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    println!("{}", parse(&mut s.split_whitespace()).eval());\n}`,
        sampleStdin: '* + 2 3 4',
        expectedOutput: '20',
      },
    ],
    miniBuild: {
      title: 'Mini-Build: Trait-Object Geometry Area Aggregator',
      description: 'Combine `Box<dyn Shape>` heap ownership with `Rect` and `Square` trait implementations to sum mixed areas dynamically.',
      banglaGoal: '`Vec<Box<dyn Shape>>` ব্যবহার করে বিভিন্ন জ্যামিতিক শেপের ক্ষেত্রফল হিসাব করো।',
      combinesChapters: 'Ch 11, 17, 19',
      starterCode: `use std::io::{self, Read};\ntrait Shape { fn area(&self) -> i64; }\nstruct Rect { w: i64, h: i64 }\nstruct Square { a: i64 }\nimpl Shape for Rect { fn area(&self) -> i64 { self.w * self.h } }\nimpl Shape for Square { fn area(&self) -> i64 { self.a * self.a } }\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    let mut it = s.split_whitespace();\n    let n: usize = it.next().unwrap().parse().unwrap();\n    let mut shapes: Vec<Box<dyn Shape>> = Vec::with_capacity(n);\n    for _ in 0..n {\n        if it.next().unwrap() == "R" {\n            shapes.push(Box::new(Rect { w: it.next().unwrap().parse().unwrap(), h: it.next().unwrap().parse().unwrap() }));\n        } else {\n            shapes.push(Box::new(Square { a: it.next().unwrap().parse().unwrap() }));\n        }\n    }\n    println!("{}", shapes.iter().map(|sh| sh.area()).sum::<i64>());\n}`,
      sampleStdin: '2\nR 4 5\nS 6',
      expectedOutput: '56',
    },
    starterCode: `use std::io::{self, Read};\ntrait Shape { fn area(&self) -> i64; }\nstruct Rect { w: i64, h: i64 }\nstruct Square { a: i64 }\nimpl Shape for Rect { fn area(&self) -> i64 { self.w * self.h } }\nimpl Shape for Square { fn area(&self) -> i64 { self.a * self.a } }\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    let mut it = s.split_whitespace();\n    let n: usize = it.next().unwrap().parse().unwrap();\n    let mut shapes: Vec<Box<dyn Shape>> = Vec::with_capacity(n);\n    for _ in 0..n {\n        if it.next().unwrap() == "R" {\n            shapes.push(Box::new(Rect { w: it.next().unwrap().parse().unwrap(), h: it.next().unwrap().parse().unwrap() }));\n        } else {\n            shapes.push(Box::new(Square { a: it.next().unwrap().parse().unwrap() }));\n        }\n    }\n    println!("{}", shapes.iter().map(|sh| sh.area()).sum::<i64>());\n}`,
    sampleStdin: '2\nR 4 5\nS 6',
    expectedSampleOutput: '56',
    testCases: [
      { id: 'rust19-t1', input: '2\nR 4 5\nS 6', expectedOutput: '56' },
      { id: 'rust19-t2', input: '3\nS 2\nS 3\nR 1 10', expectedOutput: '23', isHidden: true },
    ],
  },
  20: {
    chapterNumber: 20,
    isMilestoneMerger: true,
    title: 'Rust Chapter 20: Generics & Std Collections / Zero-Cost Iterators — Merger 4',
    banglaTitle: 'Rust অধ্যায় ২০: জেনারিক্স ও Std Collections / Zero-Cost Iterators — মার্জার ৪',
    subtitle: 'Milestone Merger 4: Unify trait-bounded generics, HashMap, BTreeSet, BinaryHeap, and zero-cost iterator adapters.',
    zeroIntuition: {
      plainEnglishStory:
        'Rust compiles generic functions like fn max_of<T: PartialOrd>(a: T, b: T) -> T through monomorphization—emitting specialized machine code per concrete type just like C++ templates, while checking trait bounds before any instantiation happens.\n\nPair generics with std::collections (Vec, HashMap, BTreeMap, BTreeSet, BinaryHeap) and lazy zero-cost iterator chains (.iter().filter().map().collect()) that LLVM optimizes into tight machine loops with zero intermediate heap allocations.',
      asciiFlowchart: `  [ Input Tokens ]
          |
          +--> HashMap<String, usize>  (*freq.entry(w).or_insert(0) += 1)
          +--> Vec<(String, usize)> -> sort_by(|a,b| b.1.cmp(&a.1).then(a.0.cmp(&b.0)))
          |
          v
  [ Zero-Cost Formatted Leaderboard Output ]`,
      pseudocode: [
        '1. WRITE generic helper fn max_of<T: PartialOrd>(a: T, b: T) -> T',
        '2. COUNT words cleanly with HashMap::entry(word).or_insert(0)',
        '3. SORT owned pairs descending by frequency then ascending by word',
        '4. LEVERAGE iterator chains (filter/map/sum) without extra allocations',
      ],
      banglaZeroToHero: {
        analogyTitle: 'জিরো-কস্ট অ্যাসেম্বলি লাইন ও Rust জেনারিক্স-কালেকশন',
        explanation:
          'ধরো একটি আধুনিক কারখানায় প্রতিটি পণ্য কোনো মাঝখানে জমিয়ে না রেখে এক স্টেশন থেকে আরেক স্টেশনে সরাসরি পাস হয়—এটাই Rust-এর zero-cost iterators-এর দর্শন! তুমি যখন .iter().filter(...).map(...).sum() লেখো, Rust কোনো বাড়তি মধ্যবর্তী Vec অ্যালোকেট না করে কম্পাইল-টাইমে পুরো চেইনটিকে একদম সাধারণ for লুপের সমান দ্রুত মেশিন কোডে পরিণত করে। আর fn max_of<T: PartialOrd> এর মতো জেনেরিক ফাংশনে trait bound দিলে কম্পাইলার আগেই নিশ্চিত করে যে কেবল তুলনাযোগ্য টাইপেই ফাংশনটি ডাকা যাবে। ডেটা গুছিয়ে রাখতে Rust-এর std::collections দেয় HashMap (entry API-সহ), BTreeMap/BTreeSet (স্বয়ংক্রিয় সাজানো ট্রি) এবং BinaryHeap। মার্জার ৪ অধ্যায়ে আমরা ownership, traits, generics আর collections একত্র করে অত্যন্ত দ্রুত ও মেমোরি-নিরাপদ ডেটা পাইপলাইন বানাবো। কন্টেস্ট প্রোগ্রামিং হোক বা সিস্টেম প্রোগ্রামিং—entry(key).or_insert(0) এবং sort_by প্যাটার্ন তোমার কোডকে করবে ঝকঝকে ও বাগমুক্ত।',
        everydayExample: 'জলবিদ্যুৎ টারবাইন: মাঝপথে বালতিতে পানি না ভরে সরাসরি পাইপলাইন দিয়ে বিদ্যুৎ তৈরি—শূন্য অপচয়।',
        keyTakeaways: [
          'HashMap::entry(k).or_insert(0) একবার হ্যাশ করেই নিরাপদে কাউন্ট বাড়ায়।',
          'sort_by তে b.1.cmp(&a.1).then_with(|| a.0.cmp(&b.0)) খুব পরিষ্কার টাই-ব्रेকার।',
          'Rust ইটারেটরগুলো lazy—collect() বা sum() না ডাকা পর্যন্ত কাজ শুরুই হয় না।',
        ],
      },
    },
    topics: [
      {
        id: 'rust-ch-20-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Trait-Bounded Generic max_of<T> & Zero-Cost Iterator Sum',
        englishParagraphs: [
          'Generics bound by PartialOrd work for both i64 and f64 while iterator chains sum filtered elements with zero extra Vec allocations.',
        ],
        banglaParagraphs: [
          'PartialOrd ট্রেইট বাউন্ড দেওয়া জেনেরিক ফাংশন ও ইটারেটর চেইন জিরো ওভারহেডে চলে।',
        ],
        memoryDiagram: `v.iter().filter(|&&x| x > 0).sum() -> compiled into single tight CPU loop`,
        code: `fn max_of<T: PartialOrd>(a: T, b: T) -> T {
    if a >= b { a } else { b }
}

fn main() {
    let nums = vec![-5_i64, 10, 40, -2, 20];
    let pos_sum: i64 = nums.iter().copied().filter(|&x| x > 0).sum();
    let best = nums.iter().copied().fold(i64::MIN, max_of);
    println!("{} {} {}", pos_sum, best, max_of(2.5_f64, 4.25_f64));
}`,
        stdin: '',
        expectedOutput: '70 40 4.25',
        lineByLine: [
          {
            lineNumber: 'Line 1',
            codeSnippet: 'fn max_of<T: PartialOrd>(a: T, b: T) -> T {',
            whatItMeans: 'Generic function constrained to types supporting >= comparison.',
            whyItIsThere: 'Compile-time trait checking prevents invalid comparisons.',
            ifDeletedError: 'Cannot compare unconstrained T with >=.',
          },
          {
            lineNumber: 'Line 7',
            codeSnippet: 'let pos_sum: i64 = nums.iter().copied().filter(|&x| x > 0).sum();',
            whatItMeans: 'Lazy iterator pipeline summing positive entries.',
            whyItIsThere: 'Executes in one register loop with zero intermediate allocation.',
            ifDeletedError: 'pos_sum variable undefined.',
          },
        ],
      },
      {
        id: 'rust-ch-20-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'HashMap::entry Frequency Counter & Deterministic Sort',
        englishParagraphs: [
          'Count words in O(n) via entry().or_insert(0) and sort collected pairs by count descending then lexicographically.',
        ],
        banglaParagraphs: [
          'HashMap::entry দিয়ে শব্দ গুনে sort_by দিয়ে র‍্যাঙ্কিং প্রিন্ট করো।',
        ],
        memoryDiagram: `HashMap<String, usize> -> Vec -> sort_by(count DESC, key ASC)`,
        code: `use std::collections::HashMap;
use std::io::{self, Read};

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let mut it = s.split_whitespace();
    let n: usize = match it.next() { Some(v) => v.parse().unwrap(), None => return };
    let mut freq: HashMap<String, usize> = HashMap::new();
    for w in it.take(n) {
        *freq.entry(w.to_string()).or_insert(0) += 1;
    }
    let mut rows: Vec<(String, usize)> = freq.into_iter().collect();
    rows.sort_by(|a, b| b.1.cmp(&a.1).then_with(|| a.0.cmp(&b.0)));
    for (k, v) in rows {
        println!("{}:{}", k, v);
    }
}`,
        stdin: '5\nrust go rust cpp go',
        expectedOutput: 'go:2\nrust:2\ncpp:1',
        lineByLine: [
          {
            lineNumber: 'Line 11',
            codeSnippet: '*freq.entry(w.to_string()).or_insert(0) += 1;',
            whatItMeans: 'Hashes once, inserts 0 if absent, and increments in place.',
            whyItIsThere: 'Idiomatic O(1) frequency counting without double lookups.',
            ifDeletedError: 'Map remains empty.',
          },
        ],
      },
      {
        id: 'rust-ch-20-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'BTreeSet Range Ceiling Query & Deduplication',
        englishParagraphs: [
          'BTreeSet keeps unique values ordered and supports O(log n) .range(q..).next() ceiling queries.',
        ],
        banglaParagraphs: [
          'BTreeSet ডুপ্লিকেট বাদ দিয়ে সাজিয়ে রাখে এবং range(q..).next() দিয়ে O(log n)-এ সিলিং খোঁজে।',
        ],
        memoryDiagram: `BTreeSet {10, 20, 35} -> range(22..).next() -> Some(&35)`,
        code: `use std::collections::BTreeSet;
use std::io::{self, Read};

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let mut it = s.split_whitespace();
    let n: usize = it.next().unwrap().parse().unwrap();
    let q: i64 = it.next().unwrap().parse().unwrap();
    let set: BTreeSet<i64> = it.take(n).map(|x| x.parse().unwrap()).collect();
    let hit = set.range(q..).next().copied().unwrap_or(-1);
    println!("{} {}", set.len(), hit);
}`,
        stdin: '5 22\n35 10 20 10 35',
        expectedOutput: '3 35',
        lineByLine: [
          {
            lineNumber: 'Line 11',
            codeSnippet: 'let hit = set.range(q..).next().copied().unwrap_or(-1);',
            whatItMeans: 'Binary-searches B-tree for smallest item >= q.',
            whyItIsThere: 'Idiomatic O(log n) lower_bound equivalent in Rust.',
            ifDeletedError: 'Cannot find ceiling value.',
          },
        ],
      },
      {
        id: 'rust-ch-20-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'BinaryHeap Top-K With Reverse<T> Min-Heap Wrapper',
        englishParagraphs: [
          'Rust’s BinaryHeap is a max-heap by default; wrap elements in std::cmp::Reverse to build an O(n log k) min-heap.',
        ],
        banglaParagraphs: [
          'Rust-এর BinaryHeap ডিফল্টভাবে max-heap; Reverse<T> ব্যবহার করলে এটি সহজেই min-heap হয়ে যায়।',
        ],
        memoryDiagram: `BinaryHeap<Reverse<i64>> size=k -> Reverse(kth_largest) at .peek()`,
        code: `use std::cmp::Reverse;
use std::collections::BinaryHeap;
use std::io::{self, Read};

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let mut it = s.split_whitespace();
    let n: usize = it.next().unwrap().parse().unwrap();
    let k: usize = it.next().unwrap().parse().unwrap();
    let mut hp: BinaryHeap<Reverse<i64>> = BinaryHeap::new();
    for x in it.take(n).map(|v| v.parse::<i64>().unwrap()) {
        hp.push(Reverse(x));
        if hp.len() > k { hp.pop(); }
    }
    println!("{}", hp.peek().unwrap().0);
}`,
        stdin: '6 2\n3 2 1 5 6 4',
        expectedOutput: '5',
        lineByLine: [
          {
            lineNumber: 'Line 11',
            codeSnippet: 'let mut hp: BinaryHeap<Reverse<i64>> = BinaryHeap::new();',
            whatItMeans: 'Inverts ordering so smallest element sits at the top.',
            whyItIsThere: 'Keeps only the k largest elements in O(k) memory.',
            ifDeletedError: 'Max-heap evicts the largest elements instead of smallest.',
          },
        ],
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 1',
        codeSnippet: 'fn max_of<T: PartialOrd>(a: T, b: T) -> T {',
        whatItMeans: 'Generic function constrained to types supporting >= comparison.',
        whyItIsThere: 'Compile-time trait checking prevents invalid comparisons.',
        ifDeletedError: 'Cannot compare unconstrained T with >=.',
      },
      {
        lineNumber: 'Line 6',
        codeSnippet: 'let nums = vec![-5_i64, 10, 40, -2, 20];',
        whatItMeans: 'Allocates dynamic Vec<i64> on heap.',
        whyItIsThere: 'Provides sample dataset for iterator and generic folding.',
        ifDeletedError: 'nums identifier undefined.',
      },
      {
        lineNumber: 'Line 7',
        codeSnippet: 'let pos_sum: i64 = nums.iter().copied().filter(|&x| x > 0).sum();',
        whatItMeans: 'Lazy iterator pipeline summing positive entries.',
        whyItIsThere: 'Executes in one register loop with zero intermediate allocation.',
        ifDeletedError: 'pos_sum variable undefined.',
      },
      {
        lineNumber: 'Line 8',
        codeSnippet: 'let best = nums.iter().copied().fold(i64::MIN, max_of);',
        whatItMeans: 'Reduces stream through generic max_of comparator.',
        whyItIsThere: 'Demonstrates function passing into higher-order fold.',
        ifDeletedError: 'best identifier undefined.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'Read "rust", "go", "rust"', memoryOrStack: 'HashMap { rust:2, go:1 }', note: 'entry().or_insert(0)' },
      { step: 2, state: 'Read "cpp", "go"', memoryOrStack: 'HashMap { go:2, rust:2, cpp:1 }', note: '3 unique words' },
      { step: 3, state: 'sort_by(b.1.cmp(&a.1).then(...))', memoryOrStack: '[("go",2), ("rust",2), ("cpp",1)]', note: 'Alphabetical tie break' },
      { step: 4, state: 'println!("{}:{}", k, v)', memoryOrStack: 'go:2 / rust:2 / cpp:1', note: 'Zero-cost formatted print' },
    ],
    harryBugTraps: [
      {
        title: 'Using f64 Directly Inside BTreeSet or BinaryHeap',
        brokenCode: `let mut s: BTreeSet<f64> = BTreeSet::new();`,
        fixedCode: `// f64 implements PartialOrd, not Ord (due to NaN); sort slices with total_cmp or use integers.`,
        whyItBreaks: 'Standard ordered Rust collections require Ord, which f64 intentionally omits.',
      },
      {
        title: 'Expecting Iterator Chain to Run Without Consuming It',
        brokenCode: `vec.iter().map(|x| println!("{}", x));`,
        fixedCode: `for x in vec.iter() { println!("{}", x); }`,
        whyItBreaks: 'Iterators are lazy in Rust; an unconsumed .map() never executes its closure.',
      },
      {
        title: 'Double Hashing With contains_key + insert',
        brokenCode: `if !map.contains_key(&k) { map.insert(k.clone(), 0); } *map.get_mut(&k).unwrap() += 1;`,
        fixedCode: `*map.entry(k).or_insert(0) += 1;`,
        whyItBreaks: 'Two separate lookups waste CPU cycles and add redundant borrow-checker noise.',
      },
    ],
    practiceSheet: [
      {
        id: 'rust-ch-20-p1',
        difficulty: 'Easy',
        title: 'Generic Clamp Function',
        prompt: 'Write fn clamp_val<T: PartialOrd>(x: T, lo: T, hi: T) -> T and apply to n i64 values.',
        banglaHint: 'ইঙ্গিত: if x < lo { lo } else if x > hi { hi } else { x } রিটার্ন করো।',
        starterCode: `use std::io::{self, Read};\nfn clamp_val<T: PartialOrd>(x: T, lo: T, hi: T) -> T { if x < lo { lo } else if x > hi { hi } else { x } }\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    let mut it = s.split_whitespace().map(|v| v.parse::<i64>().unwrap());\n    let (n, lo, hi) = (it.next().unwrap() as usize, it.next().unwrap(), it.next().unwrap());\n    let out: Vec<String> = it.take(n).map(|x| clamp_val(x, lo, hi).to_string()).collect();\n    println!("{}", out.join(" "));\n}`,
        sampleStdin: '4 10 50\n3 25 90 10',
        expectedOutput: '10 25 50 10',
      },
      {
        id: 'rust-ch-20-p2',
        difficulty: 'Easy',
        title: 'BTreeSet Unique Min & Max',
        prompt: 'Insert n i64 values into BTreeSet and print len, first(), and last().',
        banglaHint: 'ইঙ্গিত: BTreeSet-এ .iter().next() হলো min এবং .iter().next_back() হলো max।',
        starterCode: `use std::collections::BTreeSet;\nuse std::io::{self, Read};\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    let mut it = s.split_whitespace().map(|v| v.parse::<i64>().unwrap());\n    let n = it.next().unwrap() as usize;\n    let set: BTreeSet<i64> = it.take(n).collect();\n    println!("{} {} {}", set.len(), set.iter().next().unwrap(), set.iter().next_back().unwrap());\n}`,
        sampleStdin: '6\n9 2 9 4 2 7',
        expectedOutput: '4 2 9',
      },
      {
        id: 'rust-ch-20-p3',
        difficulty: 'Medium',
        title: 'Zero-Cost Positive Even Squares Sum',
        prompt: 'Using an iterator pipeline, filter numbers > 0 and even, square them, and print the sum.',
        banglaHint: 'ইঙ্গিত: .filter(|&&x| x > 0 && x % 2 == 0).map(|x| x * x).sum::<i64>() ব্যবহার করো।',
        starterCode: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    let sum: i64 = s.split_whitespace().map(|v| v.parse::<i64>().unwrap())\n        .filter(|&x| x > 0 && x % 2 == 0).map(|x| x * x).sum();\n    println!("{}", sum);\n}`,
        sampleStdin: '-4 2 3 6 -2 5',
        expectedOutput: '40',
      },
      {
        id: 'rust-ch-20-p4',
        difficulty: 'Medium',
        title: 'BTreeMap Category Aggregator',
        prompt: 'Read n category-amount pairs into BTreeMap<&str, i64> and print sorted "cat:total" lines.',
        banglaHint: 'ইঙ্গিত: BTreeMap::entry(cat).or_insert(0) তে মান যোগ করে ফর-লুপে প্রিন্ট করো।',
        starterCode: `use std::collections::BTreeMap;\nuse std::io::{self, Read};\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    let mut it = s.split_whitespace();\n    let n: usize = it.next().unwrap().parse().unwrap();\n    let mut mp: BTreeMap<&str, i64> = BTreeMap::new();\n    for _ in 0..n {\n        let k = it.next().unwrap();\n        let v: i64 = it.next().unwrap().parse().unwrap();\n        *mp.entry(k).or_insert(0) += v;\n    }\n    for (k, v) in mp { println!("{}:{}", k, v); }\n}`,
        sampleStdin: '3\nfood 50 tech 120 food 30',
        expectedOutput: 'food:80\ntech:120',
      },
      {
        id: 'rust-ch-20-p5',
        difficulty: 'Hard',
        title: 'Tuple Vec Leaderboard Top-3',
        prompt: 'Read n (name, score) pairs, sort by score descending then name ascending, print top 3.',
        banglaHint: 'ইঙ্গিত: rows.sort_by(|a, b| b.1.cmp(&a.1).then_with(|| a.0.cmp(&b.0))) ব্যবহার করো।',
        starterCode: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    let mut it = s.split_whitespace();\n    let n: usize = it.next().unwrap().parse().unwrap();\n    let mut rows: Vec<(&str, i64)> = (0..n).map(|_| (it.next().unwrap(), it.next().unwrap().parse().unwrap())).collect();\n    rows.sort_by(|a, b| b.1.cmp(&a.1).then_with(|| a.0.cmp(&b.0)));\n    for (name, sc) in rows.into_iter().take(3) { println!("{}:{}", name, sc); }\n}`,
        sampleStdin: '4\nRafi 90\nAnika 95\nSiam 90\nNila 80',
        expectedOutput: 'Anika:95\nRafi:90\nSiam:90',
      },
    ],
    miniBuild: {
      title: 'Milestone Merger 4: Generics & HashMap Frequency Leaderboard',
      description: 'Combine HashMap entry API, iterator collection, and deterministic sort_by to rank tokens.',
      banglaGoal: 'মার্জার ৪: HashMap::entry ও sort_by ব্যবহার করে জিরো-কস্ট ফ্রিকোয়েন্সি লিডারবোর্ড তৈরি।',
      combinesChapters: 'Ch 11, 16, 18, 20',
      starterCode: `use std::collections::HashMap;\nuse std::io::{self, Read};\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    let mut it = s.split_whitespace();\n    let n: usize = match it.next() { Some(v) => v.parse().unwrap(), None => return };\n    let mut freq: HashMap<String, usize> = HashMap::new();\n    for w in it.take(n) { *freq.entry(w.to_string()).or_insert(0) += 1; }\n    let mut rows: Vec<(String, usize)> = freq.into_iter().collect();\n    rows.sort_by(|a, b| b.1.cmp(&a.1).then_with(|| a.0.cmp(&b.0)));\n    for (k, v) in rows { println!("{}:{}", k, v); }\n}`,
      sampleStdin: '5\nrust go rust cpp go',
      expectedOutput: 'go:2\nrust:2\ncpp:1',
    },
    starterCode: `use std::collections::HashMap;\nuse std::io::{self, Read};\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    let mut it = s.split_whitespace();\n    let n: usize = match it.next() { Some(v) => v.parse().unwrap(), None => return };\n    let mut freq: HashMap<String, usize> = HashMap::new();\n    for w in it.take(n) { *freq.entry(w.to_string()).or_insert(0) += 1; }\n    let mut rows: Vec<(String, usize)> = freq.into_iter().collect();\n    rows.sort_by(|a, b| b.1.cmp(&a.1).then_with(|| a.0.cmp(&b.0)));\n    for (k, v) in rows { println!("{}:{}", k, v); }\n}`,
    sampleStdin: '5\nrust go rust cpp go',
    expectedSampleOutput: 'go:2\nrust:2\ncpp:1',
    testCases: [
      { id: 'rust20-t1', input: '5\nrust go rust cpp go', expectedOutput: 'go:2\nrust:2\ncpp:1' },
      { id: 'rust20-t2', input: '3\na a b', expectedOutput: 'a:2\nb:1', isHidden: true },
    ],
  },
};
