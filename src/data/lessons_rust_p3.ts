import type { AtomicLessonOverride } from './atomicLessonTypes';

export const LESSONS_RUST_P3: Record<number, AtomicLessonOverride> = {
  11: {
    chapterNumber: 11,
    title: 'Rust Chapter 11 (2024 Edition): 1D Vectors, Slices & Frequency Counting',
    banglaTitle: 'Rust অধ্যায় ১১ (২০২৪ এডিশন): ১ডি ভেক্টর, স্লাইস ও ফ্রিকোয়েন্সি কাউন্টিং',
    subtitle: 'Heap-allocated Vec<i64>, stack arrays [i64; N], safe bounds checking, and O(N) frequency buckets.',
    zeroIntuition: {
      plainEnglishStory:
        'In Rust, fixed-size arrays (`[i64; 5]`) live directly on the stack while growable contiguous arrays (`Vec<i64>`) store their length, capacity, and heap pointer as a 24-byte fat handle on the stack. Every `v[i]` index access in Rust is automatically bounds-checked at runtime—preventing silent C-style buffer overflows and segfaults.\n\nWhen counting occurrences over bounded keys (`0..=100`), allocating a frequency bucket `vec![0usize; 101]` lets you tally `freq[x as usize] += 1` in a single `O(N)` pass. Combined with slice iteration (`for &x in &a`), Rust compiles tight SIMD-friendly machine loops with zero undefined behavior.',
      asciiFlowchart: `Stack: v (ptr, len=5, cap=8) ---> Heap: [ 4 | 9 | 2 | 7 | 5 | . | . | . ]
   |
   +--> freq = vec![0usize; 101]  (O(N) tally pass: freq[x] += 1)
   +--> Bounds checked every index: 0 <= i < v.len() (no UB!)`,
      pseudocode: [
        '1. PARSE N and N numbers cleanly into Vec<i64> via stdin iterator',
        '2. INITIALIZE frequency vector vec![0usize; limit]',
        '3. TRAVERSE slice once to tally freq[x] += 1 and track sum / max',
        '4. SWAP in-place via v.swap(l, r) for zero-allocation reversals',
      ],
      banglaZeroToHero: {
        analogyTitle: 'নিরাপদ তালাবদ্ধ লকার সারিবদ্ধতা ও ট্যালি বাক্স',
        explanation:
          'ধরো একটি ক্লাসের ১০০ জন শিক্ষার্থীর কুইজের নম্বর (০ থেকে ১০০) একসাথে সংরক্ষণ করতে হবে। রাস্টে ফিক্সড সাইজের তালিকা `[i64; N]` স্ট্যাকে থাকে, আর প্রয়োজন অনুযায়ী বড়-ছোট করা যায় এমন কনটিগুয়াস অ্যারে হলো `Vec<i64>`, যা স্ট্যাকে মাত্র ২৪ বাইটের একটি হ্যান্ডেল রেখে মূল ডেটাগুলো হিপে পরপর সাজিয়ে রাখে। C বা C++-এ ভুল ইনডেক্স পড়লে যেমন চুপচাপ র‍্যামের ময়লা ডেটা চলে আসে বা প্রোগ্রাম ক্র্যাশ করে, রাস্টে প্রতিটি `v[i]` অ্যাক্সেসে বাউন্ড চেক থাকে—ফলে মেমোরি সেফটি কখনো ভাঙে না! এখন সবগুলো নম্বর থেকে কোন সংখ্যাটি কতবার এসেছে তা বের করতে যদি বারবার পুরো ভেক্টর স্ক্যান করো, তাহলে `O(N^2)` সময় লাগবে। এর বদলে আমরা `vec![0usize; 101]` নামে ১০১ ঘরের একটি শূন্য ট্যালি বাক্স বানাই এবং ভেক্টরের ওপর একবার লুপ চালিয়ে `freq[x as usize] += 1` করে দিই। মাত্র একবার ঘুরেই পুরো ফ্রিকোয়েন্সি তালিকা `O(N)` সময়ে তৈরি হয়ে যায়! এছাড়া দুই প্রান্তে ইনডেক্স রেখে `v.swap(l, r)` ব্যবহার করলে কোনো অতিরিক্ত ভেক্টর ছাড়াই (`O(1)` স্পেস) পুরো অ্যারে উল্টে দেওয়া যায়।',
        everydayExample:
          'রেলস্টেশনের নম্বরযুক্ত নিরাপদ লকারে (`0..N-1`) মাল রাখলে গার্ড প্রতিটি টোকেন নম্বর যাচাই করে দেয়, যাতে কেউ ভুল লকারে হাত দিতে না পারে।',
        keyTakeaways: [
          'ইনডেক্স হিসেবে রাস্ট কেবল `usize` গ্রহণ করে, তাই `i64` কে `x as usize` করে ইনডেক্স করতে হয়।',
          '`vec![0usize; 101]` দিয়ে শূন্য-প্রারম্ভিক ফ্রিকোয়েন্সি অ্যারে বানিয়ে `O(N)` সময়ে গণনা করা যায়।',
          '`a.swap(l, r)` মেথড বোরো চেকারের কোনো ঝামেলা ছাড়াই ইন-প্লেস দুটি উপাদান অদলবদল করে।',
        ],
      },
    },
    topics: [
      {
        id: 'rust-ch-11-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Vec<i64> Sum, Maximum & In-Place Swap Reversal',
        englishParagraphs: [
          'Seed `best = a[0]` instead of `0` so negative arrays return accurate maximums.',
          'Rust’s built-in slice method `a.swap(l, r)` avoids mutable double-borrowing errors cleanly.',
        ],
        banglaParagraphs: [
          'প্রথম মান `a[0]` দিয়ে `best` শুরু করলে ঋণাত্মক সংখ্যাতেও সর্বোচ্চ মান ঠিক থাকে।',
          '`a.swap(l, r)` ব্যবহার করলে মিউটেবল বরোইং এরর ছাড়াই দুটি ইনডেক্স অদলবদল হয়।',
        ],
        memoryDiagram: `a = [4, 9, 2, 7] -> sum=22 max=9 -> swap -> [7, 2, 9, 4]`,
        code: `fn main() {
    let mut a = vec![4i64, 9, 2, 7];
    let mut sum = 0i64;
    let mut best = a[0];
    for &x in &a {
        sum += x;
        if x > best { best = x; }
    }
    let (mut l, mut r) = (0usize, a.len() - 1);
    while l < r {
        a.swap(l, r);
        l += 1;
        r -= 1;
    }
    println!("sum={} max={}", sum, best);
    for (i, x) in a.iter().enumerate() {
        if i > 0 { print!(" "); }
        print!("{}", x);
    }
    println!();
}`,
        stdin: '',
        expectedOutput: 'sum=22 max=9\n7 2 9 4',
        lineByLine: [
          { lineNumber: 'Line 11', codeSnippet: 'a.swap(l, r);', whatItMeans: 'Swaps two distinct indices safely inside slice.', whyItIsThere: 'Avoids simultaneous mutable borrow conflict on a[l] and a[r].', ifDeletedError: 'Vector stays in original order.' },
        ],
      },
      {
        id: 'rust-ch-11-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Single-Pass Frequency Array From Stdin',
        englishParagraphs: [
          'Read `N` and `N` integers in `0..=100`, tally counts in `freq: Vec<usize>`, and print non-zero entries sorted by value.',
          'Explicit `usize` indexing keeps bucket counts panic-free when bounds-checked.',
        ],
        banglaParagraphs: [
          'স্ট্যান্ডার্ড ইনপুট থেকে সংখ্যাগুলো পড়ে `freq[x as usize] += 1` করে এক পাসে গণনা করা হয়েছে।',
          'পরে `0..=100` পর্যন্ত চালিয়ে কেবল শূন্যের বেশি থাকা মানগুলো প্রিন্ট করা হয়েছে।',
        ],
        memoryDiagram: `input=[5, 3, 5, 1] -> freq[1]=1, freq[3]=1, freq[5]=2`,
        code: `use std::io::{self, Read};

fn main() {
    let mut input = String::new();
    io::stdin().read_to_string(&mut input).unwrap();
    let mut it = input.split_whitespace().map(|s| s.parse::<usize>().unwrap());
    let n = match it.next() { Some(v) => v, None => return };
    let mut freq = vec![0usize; 101];
    for _ in 0..n {
        let x = it.next().unwrap();
        freq[x] += 1;
    }
    for v in 0..=100 {
        if freq[v] > 0 {
            println!("{}:{}", v, freq[v]);
        }
    }
}`,
        stdin: '4\n5 3 5 1',
        expectedOutput: '1:1\n3:1\n5:2',
        lineByLine: [
          { lineNumber: 'Line 8', codeSnippet: 'let mut freq = vec![0usize; 101];', whatItMeans: 'Allocates 101 zeroed unsigned frequency slots.', whyItIsThere: 'Supports values 0..=100 directly by index.', ifDeletedError: 'freq undeclared.' },
        ],
      },
      {
        id: 'rust-ch-11-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'In-Place Right Cyclic Rotation by K via Built-In Slices',
        englishParagraphs: [
          'Rust slices expose `rotate_right(k % n)`, or you can write the classic three-slice reverse (`reverse()` on `[..]`, `[..k]`, `[k..]`).',
          'Both approaches transform the vector cleanly in `O(N)` time and `O(1)` extra heap space.',
        ],
        banglaParagraphs: [
          'তিন ধাপের রিভার্স নিয়ম (`a.reverse()`, `a[..k].reverse()`, `a[k..].reverse()`) স্লাইসের মাধ্যমে খুব সহজে `O(1)` স্পেসে কাজ করে।',
          '`k % n` দিয়ে রোটেশন দৈর্ঘ্যের ভেতরে রাখা হয়েছে।',
        ],
        memoryDiagram: `[1,2,3,4,5] rot 2 -> rev [5,4,3,2,1] -> [4,5,1,2,3]`,
        code: `fn main() {
    let mut a = vec![1, 2, 3, 4, 5];
    let k = 2 % a.len();
    a.reverse();
    a[..k].reverse();
    a[k..].reverse();
    for (i, x) in a.iter().enumerate() {
        if i > 0 { print!(" "); }
        print!("{}", x);
    }
    println!();
}`,
        stdin: '',
        expectedOutput: '4 5 1 2 3',
        lineByLine: [
          { lineNumber: 'Line 5', codeSnippet: 'a[..k].reverse();', whatItMeans: 'Reverses only the front k-element subslice in place.', whyItIsThere: 'Restores original order of rotated suffix.', ifDeletedError: 'Front elements remain reversed.' },
        ],
      },
      {
        id: 'rust-ch-11-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'usize Subtraction Underflow Trap vs Checked Access',
        englishParagraphs: [
          'On an empty vector (`a.len() == 0`), writing `a.len() - 1` panics with integer underflow in Rust debug builds because `usize` cannot go negative!',
          'Guard empty lengths first or use `.get(idx)` when indices might fall out of bounds.',
        ],
        banglaParagraphs: [
          'খালি ভেক্টরে `a.len() - 1` লিখলে `usize` নেগেটিভ হতে পারে না বলে রাস্ট প্যানিক করে!',
          'সবসময় আগে `if !a.is_empty()` যাচাই করে অথবা `.get()` দিয়ে নিরাপদে অ্যাক্সেস করবে।',
        ],
        memoryDiagram: `TRAP: empty.len() - 1 -> panic! | FIX: a.last() / get() / !is_empty()`,
        code: `fn main() {
    let a: Vec<i32> = vec![10, 20, 30];
    let empty: Vec<i32> = vec![];
    println!("last={:?} empty_get={:?}", a.last().unwrap_or(&0), empty.get(0));
}`,
        stdin: '',
        expectedOutput: 'last=30 empty_get=None',
        lineByLine: [
          { lineNumber: 'Line 4', codeSnippet: 'empty.get(0)', whatItMeans: 'Returns Option<&T> (None) instead of panicking on out-of-bounds.', whyItIsThere: 'Zero-crash boundary safety.', ifDeletedError: 'Cannot print safe Option demo.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 2', codeSnippet: 'let mut a = vec![4i64, 9, 2, 7];', whatItMeans: 'Allocates mutable heap-backed vector of 64-bit integers.', whyItIsThere: 'Allows O(1) indexed reads and in-place swaps.', ifDeletedError: 'a undeclared.' },
      { lineNumber: 'Line 4', codeSnippet: 'let mut best = a[0];', whatItMeans: 'Initializes max tracker from first array item.', whyItIsThere: 'Ensures negative elements never lose to 0.', ifDeletedError: 'best undeclared.' },
      { lineNumber: 'Line 5', codeSnippet: 'for &x in &a {', whatItMeans: 'Borrows vector immutably and copies each i64 value.', whyItIsThere: 'Avoids moving ownership out of a.', ifDeletedError: 'Sum and max never computed.' },
      { lineNumber: 'Line 11', codeSnippet: 'a.swap(l, r);', whatItMeans: 'In-place slice swap safe under Rust borrow rules.', whyItIsThere: 'Reverses elements in O(1) extra space.', ifDeletedError: 'Vector unchanged.' },
    ],
    dryRunTable: [
      { step: 1, state: 'seed best=a[0]', memoryOrStack: 'sum=0, best=4', note: 'Start before loop' },
      { step: 2, state: 'iter 4, 9, 2, 7', memoryOrStack: 'sum=22, best=9', note: 'Immutable borrow ends cleanly' },
      { step: 3, state: 'l=0, r=3 swap', memoryOrStack: '[7, 9, 2, 4]', note: 'Ends swapped safely' },
      { step: 4, state: 'l=1, r=2 swap', memoryOrStack: '[7, 2, 9, 4]', note: 'Loop exits when l >= r' },
    ],
    harryBugTraps: [
      { title: 'Trap 1: usize Underflow on Empty Vec (len() - 1)', brokenCode: `let r = v.len() - 1; // Panics when v is empty!`, fixedCode: `if let Some(r) = v.len().checked_sub(1) { ... }`, whyItBreaks: 'usize is unsigned; subtracting 1 from 0 causes panic in debug and wraps to MAX in release.' },
      { title: 'Trap 2: Moving Vec Inside Loop Instead of Borrowing (&v)', brokenCode: `for x in v { sum += x; } println!("{}", v.len()); // Use of moved value!`, fixedCode: `for &x in &v { sum += x; }`, whyItBreaks: 'Iterating by value consumes ownership of v.' },
      { title: 'Trap 3: Indexing With i32/i64 Without Casting to usize', brokenCode: `let idx: i64 = 2; println!("{}", v[idx]); // Compile error!`, fixedCode: `println!("{}", v[idx as usize]);`, whyItBreaks: 'Rust slice indexing strictly requires usize.' },
    ],
    practiceSheet: [
      { id: 'rust-ch11-p1', difficulty: 'Easy', title: 'Vector Sum & Maximum', prompt: 'Read `N` and `N` `i64` values, output `<sum> <max>`.', banglaHint: '`best = a[0]` দিয়ে শুরু করে একবার লুপ চালাও।', starterCode: `use std::io::{self, Read};\nfn main(){ let mut s=String::new(); io::stdin().read_to_string(&mut s).unwrap(); let mut it=s.split_whitespace().map(|x|x.parse::<i64>().unwrap()); let n=it.next().unwrap() as usize; let a:Vec<i64>=(0..n).map(|_|it.next().unwrap()).collect(); let sum:i64=a.iter().sum(); let mx=*a.iter().max().unwrap(); println!("{} {}",sum,mx); }`, sampleStdin: '4\n-5 -2 -9 -3', expectedOutput: '-19 -2' },
      { id: 'rust-ch11-p2', difficulty: 'Easy', title: 'Reverse Vector In-Place', prompt: 'Read `N` integers and print them reversed using `swap`.', banglaHint: '`while l < r` চালিয়ে `a.swap(l, r)` করো।', starterCode: `use std::io::{self, Read};\nfn main(){ let mut s=String::new(); io::stdin().read_to_string(&mut s).unwrap(); let mut it=s.split_whitespace().map(|x|x.parse::<i64>().unwrap()); let n=it.next().unwrap() as usize; let mut a:Vec<i64>=(0..n).map(|_|it.next().unwrap()).collect(); let (mut l, mut r)=(0,n-1); while l<r{a.swap(l,r);l+=1;r-=1;} for i in 0..n{ if i>0{print!(" ");} print!("{}",a[i]); } println!(); }`, sampleStdin: '5\n1 2 3 4 5', expectedOutput: '5 4 3 2 1' },
      { id: 'rust-ch11-p3', difficulty: 'Medium', title: 'Most Frequent Value (0..=100)', prompt: 'Read `N` ints in `0..=100`, print value with highest frequency (smallest on tie).', banglaHint: '`vec![0usize; 101]` দিয়ে ফ্রিকোয়েন্সি গোনো।', starterCode: `use std::io::{self, Read};\nfn main(){ let mut s=String::new(); io::stdin().read_to_string(&mut s).unwrap(); let mut it=s.split_whitespace().map(|x|x.parse::<usize>().unwrap()); let n=it.next().unwrap(); let mut f=vec![0usize;101]; for _ in 0..n{ f[it.next().unwrap()]+=1; } let mut ans=0; for v in 1..=100{ if f[v]>f[ans]{ans=v;} } println!("{}",ans); }`, sampleStdin: '6\n4 2 4 3 2 4', expectedOutput: '4' },
      { id: 'rust-ch11-p4', difficulty: 'Medium', title: 'Second Largest Distinct Element', prompt: 'Print second largest distinct value (`-1` if missing).', banglaHint: '`Option<i64>` দিয়ে `first` ও `second` নিরাপদে রাখো।', starterCode: `use std::io::{self, Read};\nfn main(){ let mut s=String::new(); io::stdin().read_to_string(&mut s).unwrap(); let mut it=s.split_whitespace().map(|x|x.parse::<i64>().unwrap()); let n=it.next().unwrap() as usize; let mut f=None; let mut sec=None; for _ in 0..n{ let x=it.next().unwrap(); if f.map_or(true,|v|x>v){sec=f;f=Some(x);} else if Some(x)!=f && sec.map_or(true,|v|x>v){sec=Some(x);} } println!("{}",sec.unwrap_or(-1)); }`, sampleStdin: '5\n10 5 10 8 3', expectedOutput: '8' },
      { id: 'rust-ch11-p5', difficulty: 'Hard', title: 'Missing Value in 0..N', prompt: 'Given `N` and `N` distinct numbers from `0..N`, find the missing number in `O(N)`.', banglaHint: 'মোট যোগফল `n*(n+1)/2` থেকে আসল যোগফল বিয়োগ করো।', starterCode: `use std::io::{self, Read};\nfn main(){ let mut s=String::new(); io::stdin().read_to_string(&mut s).unwrap(); let mut it=s.split_whitespace().map(|x|x.parse::<i64>().unwrap()); let n=it.next().unwrap(); let got:i64=(0..n).map(|_|it.next().unwrap()).sum(); println!("{}", n*(n+1)/2 - got); }`, sampleStdin: '4\n3 0 1 4', expectedOutput: '2' },
    ],
    miniBuild: {
      title: 'Mini-Build: O(N) Frequency & Mode Analyzer',
      description: 'Tally integers in 0..=1000 via Rust Vec<usize> buckets and print mode plus count.',
      banglaGoal: 'ভেক্টর ফ্রিকোয়েন্সি বাক্স ব্যবহার করে `O(N)` সময়ে মোড ও তার সংখ্যা প্রিন্ট করো।',
      combinesChapters: 'Rust Ch 1–11',
      starterCode: `use std::io::{self, Read};

fn main() {
    let mut input = String::new();
    io::stdin().read_to_string(&mut input).unwrap();
    let mut it = input.split_whitespace().map(|s| s.parse::<usize>().unwrap());
    let n = match it.next() { Some(v) => v, None => return };
    let mut freq = vec![0usize; 1001];
    for _ in 0..n {
        freq[it.next().unwrap()] += 1;
    }
    let mut best = 0usize;
    for v in 1..=1000 {
        if freq[v] > freq[best] {
            best = v;
        }
    }
    println!("{} {}", best, freq[best]);
}`,
      sampleStdin: '6\n5 2 5 8 2 5',
      expectedOutput: '5 3',
    },
    starterCode: `use std::io::{self, Read};

fn main() {
    let mut input = String::new();
    io::stdin().read_to_string(&mut input).unwrap();
    let mut it = input.split_whitespace().map(|s| s.parse::<usize>().unwrap());
    let n = match it.next() { Some(v) => v, None => return };
    let mut freq = vec![0usize; 1001];
    for _ in 0..n {
        freq[it.next().unwrap()] += 1;
    }
    let mut best = 0usize;
    for v in 1..=1000 {
        if freq[v] > freq[best] {
            best = v;
        }
    }
    println!("{} {}", best, freq[best]);
}`,
    sampleStdin: '6\n5 2 5 8 2 5',
    expectedSampleOutput: '5 3',
    testCases: [
      { id: 'rust11-t1', input: '6\n5 2 5 8 2 5', expectedOutput: '5 3' },
      { id: 'rust11-t2', input: '4\n7 7 1 2', expectedOutput: '7 2', isHidden: true },
    ],
  },
  12: {
    chapterNumber: 12,
    title: 'Rust Chapter 12 (2024 Edition): Two-Pointer & Sliding Window Basics',
    banglaTitle: 'Rust অধ্যায় ১২ (২০২৪ এডিশন): টু-পয়েন্টার ও স্লাইডিং উইন্ডো বেসিকস',
    subtitle: 'Opposite-end index squeezing, safe windows(k) / O(N) sliding delta, variable windows, and slow/fast write pointers.',
    zeroIntuition: {
      plainEnglishStory:
        'Using nested loops (`O(N^2)`) in Rust still breaches the $10^8$ operations rule when $N = 10^5$. Replacing nested scans with **Two Pointers** (`l`, `r: usize`) and **Sliding Windows** reduces work to a single linear sweep (`O(N)`) with zero extra heap allocation.\n\nNotice how cleanly Rust avoids index underflow during opposite-end convergence: `while l < r` guarantees `r` is always at least `1` whenever `r -= 1` executes! And for fixed `K`-element sliding sums, initializing the first `K` sum and adding `a[i] - a[i - k]` updates each frame in `O(1)` time.',
      asciiFlowchart: `Sorted a = [2, 4, 7, 10, 15], target = 14
   l=0       r=4 (2+15=17 > 14 -> r-=1; safe since l < r => r >= 1!)
   l=0       r=3 (2+10=12 < 14 -> l+=1)
   l=1       r=3 (4+10=14 == MATCH!)`,
      pseudocode: [
        '1. KEEP l = 0, r = n - 1 (guarded by !a.is_empty()); loop while l < r',
        '2. SLIDE fixed window via win += a[i] - a[i - k] over i in k..n',
        '3. SHRINK variable window while sum > S via sum -= a[l]; l += 1',
        '4. USE slow/fast indices w, r for in-place O(1)-space filtering',
      ],
      banglaZeroToHero: {
        analogyTitle: 'দুই দিকের নিরাপদ ইনডেক্স ও চলন্ত উইন্ডো ফ্রেম',
        explanation:
          'সাজানো তালিকায় দুটি সংখ্যার যোগফল খুঁজতে প্রতিটি জোড়া মিলিয়ে দেখা `O(N^2)` সময়ের কাজ, যা বড় ইনপুটে টিকে না। রাস্টে এর বদলে `l = 0usize` আর `r = a.len() - 1` (যদি `a` খালি না হয়) নিয়ে `while l < r` লুপ চালালে সুন্দর একটি সুবিধা মেলে: যেহেতু `l < r`, তাই `r` কখনো `0` হতে পারে না—ফলে `r -= 1` করলেও `usize` আন্ডারফ্লো প্যানিক হওয়ার কোনো ভয়ই থাকে না! যোগফল বেশি হলে `r -= 1`, আর কম হলে `l += 1` করলেই মাত্র `O(N)` ধাপে সমাধান মিলে যায়। একইভাবে টানা `K`টি উপাদানের সর্বোচ্চ যোগফল বের করতে রাস্টের `a.windows(k)` প্রতিবার `O(K)` যোগ করলে `O(N*K)` সময় নিতে পারে; তাই তার বদলে শুরুতে প্রথম `K`টি যোগ করে এরপর `k..n` লুপে `win += a[i] - a[i - k]` চালালে তা একদম খাঁটি `O(N)` গতিতে চলে। আর ধনাত্মক সংখ্যার ভ্যারিয়েবল উইন্ডোতে যোগফল `S` ছাড়িয়ে গেলে ভেতরে ছোট `while sum > S` দিয়ে `l` এগিয়ে নিলেই দীর্ঘতম বৈধ সাবঅ্যারে পাওয়া যায়।',
        everydayExample:
          'দুজন মানুষ দুই পাশ থেকে বড় একটি সাজানো খাতা পড়া শুরু করে মাঝখানে দেখা করলে পুরো খাতাটি মাত্র একবারেই পড়া হয়ে যায়।',
        keyTakeaways: [
          '`while l < r` নিশ্চিত করে যে `r >= 1`, তাই `r -= 1` কখনোই `usize` আন্ডারফ্লো করবে না।',
          'প্রতিবার `.windows(k).sum()` চালানো `O(N*K)` হতে পারে; `win += a[i] - a[i - k]` নিশ্চিত `O(N)` দেয়।',
          'প্রয়োজন অনুযায়ী `i64` দিয়ে উইন্ডো সাম রাখলে ৩২-বিট ওভারফ্লো হয় না।',
        ],
      },
    },
    topics: [
      {
        id: 'rust-ch-12-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Opposite-End Two-Sum in Sorted Slice',
        englishParagraphs: [
          'Guard empty slices cleanly (`if a.len() >= 2`), then converge `l` and `r` strictly while `l < r`.',
          'Because `r > l >= 0`, `r -= 1` never underflows `usize`.',
        ],
        banglaParagraphs: [
          '`while l < r` শর্তের কারণে `r` সবসময় ধনাত্মক থাকে, তাই আন্ডারফ্লো ছাড়াই ইনডেক্স কমে।',
          'সাজানো ভেক্টরে মাত্র একবার স্ক্যান করেই যোগফল পাওয়া যায়।',
        ],
        memoryDiagram: `[2, 4, 7, 10, 15], target=14 -> (4, 10)`,
        code: `fn main() {
    let a = [2i64, 4, 7, 10, 15];
    let target = 14i64;
    let (mut l, mut r) = (0usize, a.len() - 1);
    while l < r {
        let s = a[l] + a[r];
        if s == target {
            println!("{} {}", a[l], a[r]);
            break;
        }
        if s < target { l += 1; } else { r -= 1; }
    }
}`,
        stdin: '',
        expectedOutput: '4 10',
        lineByLine: [
          { lineNumber: 'Line 5', codeSnippet: 'while l < r {', whatItMeans: 'Ensures distinct indices and guarantees r >= 1 before decrement.', whyItIsThere: 'Prevents duplicate element pairing and usize underflow.', ifDeletedError: 'Loop missing.' },
        ],
      },
      {
        id: 'rust-ch-12-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Fixed K-Window Maximum Sum via Stdin (O(N))',
        englishParagraphs: [
          'Read `n, k` and `n` `i64` elements, seed first `k` items into `win`, and slide with `a[i] - a[i - k]`.',
          'Runs in deterministic `O(N)` with zero extra allocations per window shift.',
        ],
        banglaParagraphs: [
          'প্রথম `k`টি সংখ্যা যোগ করে পরের ধাপে `a[i] - a[i - k]` দিয়ে জানালার যোগফল হালনাগাদ করা হয়েছে।',
          '`i64` রাখায় বড় যোগফলে ওভারফ্লো হয় না।',
        ],
        memoryDiagram: `[5,2,8,1,9], k=3 -> 18`,
        code: `use std::io::{self, Read};

fn main() {
    let mut input = String::new();
    io::stdin().read_to_string(&mut input).unwrap();
    let mut it = input.split_whitespace().map(|s| s.parse::<i64>().unwrap());
    let n = match it.next() { Some(v) => v as usize, None => return };
    let k = it.next().unwrap() as usize;
    let a: Vec<i64> = (0..n).map(|_| it.next().unwrap()).collect();
    let mut win: i64 = a[..k].iter().sum();
    let mut best = win;
    for i in k..n {
        win += a[i] - a[i - k];
        if win > best { best = win; }
    }
    println!("{}", best);
}`,
        stdin: '5 3\n5 2 8 1 9',
        expectedOutput: '18',
        lineByLine: [
          { lineNumber: 'Line 13', codeSnippet: 'win += a[i] - a[i - k];', whatItMeans: 'Updates rolling K-window sum in O(1).', whyItIsThere: 'Avoids O(N*K) slice resumming.', ifDeletedError: 'best remains at initial window.' },
        ],
      },
      {
        id: 'rust-ch-12-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Variable Sliding Window (Longest Subarray Sum <= S)',
        englishParagraphs: [
          'Advance right index `r` across `0..a.len()` and shrink left index `l` while `sum > S`.',
          'Each index moves strictly forward once (`O(N)` amortized).',
        ],
        banglaParagraphs: [
          '`sum > S` হলে `l` ডানে এগিয়ে জানালা ছোট করা হয়েছে যাতে মোট যোগফল সীমার মধ্যে থাকে।',
          'সবশেষে পাওয়া সর্বোচ্চ `r - l + 1` প্রিন্ট করা হয়।',
        ],
        memoryDiagram: `[3,1,2,7,4], S=6 -> [3,1,2] len=3`,
        code: `fn main() {
    let a = [3i64, 1, 2, 7, 4];
    let limit = 6i64;
    let (mut sum, mut l, mut best) = (0i64, 0usize, 0usize);
    for r in 0..a.len() {
        sum += a[r];
        while sum > limit {
            sum -= a[l];
            l += 1;
        }
        best = best.max(r - l + 1);
    }
    println!("{}", best);
}`,
        stdin: '',
        expectedOutput: '3',
        lineByLine: [
          { lineNumber: 'Line 7', codeSnippet: 'while sum > limit {', whatItMeans: 'Shrinks left edge until window stays valid.', whyItIsThere: 'Guarantees O(N) longest valid window.', ifDeletedError: 'Counts oversized subarrays.' },
        ],
      },
      {
        id: 'rust-ch-12-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'O(N*K) windows(k) Resum Trap vs Slow/Fast Deduplication',
        englishParagraphs: [
          'Calling `a.windows(k).map(|w| w.iter().sum()).max()` looks concise but takes `O(N * K)` time, timing out when `N=10^5, K=50000`!',
          'Use delta sliding (`win += a[i] - a[i - k]`) for fixed windows and slow/fast write index `w` for sorted deduplication.',
        ],
        banglaParagraphs: [
          '`a.windows(k).map(|w| w.iter().sum())` দেখতে ছোট হলেও আসলে `O(N*K)` সময় নেয়—তাই বড় ইনপুটে TLE দেয়!',
          'স্লো/ফাস্ট ইনডেক্স দিয়ে ইন-প্লেস ডুপ্লিকেট বাদ দেওয়া `O(1)` স্পেসেই চলে।',
        ],
        memoryDiagram: `[1,1,2,2,2,5,5] -> w=3`,
        code: `fn main() {
    let mut a = vec![1, 1, 2, 2, 2, 5, 5];
    let mut w = 0usize;
    for r in 0..a.len() {
        if w == 0 || a[r] != a[w - 1] {
            a[w] = a[r];
            w += 1;
        }
    }
    println!("unique={}", w);
}`,
        stdin: '',
        expectedOutput: 'unique=3',
        lineByLine: [
          { lineNumber: 'Line 5', codeSnippet: 'if w == 0 || a[r] != a[w - 1] {', whatItMeans: 'Writes unique element only when different from last accepted item.', whyItIsThere: 'O(N) in-place deduplication.', ifDeletedError: 'w remains 0.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 2', codeSnippet: 'let a = [2i64, 4, 7, 10, 15];', whatItMeans: 'Sorted array prerequisite for opposite-end pointer convergence.', whyItIsThere: 'Monotonic order justifies moving l++ or r--.', ifDeletedError: 'a undeclared.' },
      { lineNumber: 'Line 4', codeSnippet: 'let (mut l, mut r) = (0usize, a.len() - 1);', whatItMeans: 'Initializes unsigned endpoints safely on non-empty array.', whyItIsThere: 'Starts from widest pair.', ifDeletedError: 'Pointers undefined.' },
      { lineNumber: 'Line 11', codeSnippet: 'if s < target { l += 1; } else { r -= 1; }', whatItMeans: 'Steps strictly one pointer inward per comparison.', whyItIsThere: 'O(N) search termination.', ifDeletedError: 'Infinite loop.' },
    ],
    dryRunTable: [
      { step: 1, state: 'l=0, r=4', memoryOrStack: '2 + 15 = 17 > 14', note: 'r -= 1 -> 3' },
      { step: 2, state: 'l=0, r=3', memoryOrStack: '2 + 10 = 12 < 14', note: 'l += 1 -> 1' },
      { step: 3, state: 'l=1, r=3', memoryOrStack: '4 + 10 = 14 == 14', note: 'Print 4 10 & break' },
      { step: 4, state: 'exit', memoryOrStack: '3 steps', note: 'O(N) safe termination' },
    ],
    harryBugTraps: [
      { title: 'Trap 1: O(N*K) Slice Iteration With .windows(k).sum()', brokenCode: `let best = a.windows(k).map(|w| w.iter().sum::<i64>()).max(); // O(N*K)!`, fixedCode: `for i in k..n { win += a[i] - a[i - k]; best = best.max(win); }`, whyItBreaks: 'Re-summing every window slice wastes K operations per step and triggers TLE.' },
      { title: 'Trap 2: Forgetting to Sort Before Opposite-End Two Pointers', brokenCode: `let a = [10, 2, 15, 4]; // Unsorted!`, fixedCode: `a.sort_unstable();`, whyItBreaks: 'Opposite-end squeezing assumes non-decreasing order.' },
      { title: 'Trap 3: Decrementing usize When k > n Without Guarding', brokenCode: `for i in k..n ... // Panics on a[..k] if k > a.len()!`, fixedCode: `if k > n || k == 0 { return; }`, whyItBreaks: 'Slicing past Vec length panics immediately.' },
    ],
    practiceSheet: [
      { id: 'rust-ch12-p1', difficulty: 'Easy', title: 'Sorted Two-Sum Check', prompt: 'Given `N`, `target`, and sorted array, print `YES` if a pair sums to target else `NO`.', banglaHint: '`while l < r` দিয়ে দুই প্রান্তের যোগফল মেলাও।', starterCode: `use std::io::{self, Read};\nfn main(){ let mut s=String::new(); io::stdin().read_to_string(&mut s).unwrap(); let mut it=s.split_whitespace().map(|x|x.parse::<i64>().unwrap()); let n=it.next().unwrap() as usize; let t=it.next().unwrap(); let a:Vec<i64>=(0..n).map(|_|it.next().unwrap()).collect(); let (mut l,mut r,mut ok)=(0,n.saturating_sub(1),false); while l<r{let sum=a[l]+a[r]; if sum==t{ok=true;break;} if sum<t{l+=1;} else{r-=1;}} println!("{}", if ok{"YES"}else{"NO"}); }`, sampleStdin: '5 14\n2 4 7 10 15', expectedOutput: 'YES' },
      { id: 'rust-ch12-p2', difficulty: 'Easy', title: 'Max Sum K-Window', prompt: 'Output max sum over `K` consecutive items in `O(N)`.', banglaHint: '`win += a[i] - a[i - k]` সূত্র ব্যবহার করো।', starterCode: `use std::io::{self, Read};\nfn main(){ let mut s=String::new(); io::stdin().read_to_string(&mut s).unwrap(); let mut it=s.split_whitespace().map(|x|x.parse::<i64>().unwrap()); let n=it.next().unwrap() as usize; let k=it.next().unwrap() as usize; let a:Vec<i64>=(0..n).map(|_|it.next().unwrap()).collect(); let mut w:i64=a[..k].iter().sum(); let mut b=w; for i in k..n{w+=a[i]-a[i-k]; b=b.max(w);} println!("{}",b); }`, sampleStdin: '5 3\n5 2 8 1 9', expectedOutput: '18' },
      { id: 'rust-ch12-p3', difficulty: 'Medium', title: 'Longest Subarray Sum <= S', prompt: 'Given `N`, `S`, and non-negative integers, print max length with sum `<= S`.', banglaHint: '`while cur > s` চালিয়ে বাম প্রান্ত সরাও।', starterCode: `use std::io::{self, Read};\nfn main(){ let mut s=String::new(); io::stdin().read_to_string(&mut s).unwrap(); let mut it=s.split_whitespace().map(|x|x.parse::<i64>().unwrap()); let n=it.next().unwrap() as usize; let lim=it.next().unwrap(); let a:Vec<i64>=(0..n).map(|_|it.next().unwrap()).collect(); let (mut cur,mut l,mut b)=(0i64,0usize,0usize); for r in 0..n{ cur+=a[r]; while cur>lim{cur-=a[l];l+=1;} b=b.max(r-l+1); } println!("{}",b); }`, sampleStdin: '5 6\n3 1 2 7 4', expectedOutput: '3' },
      { id: 'rust-ch12-p4', difficulty: 'Medium', title: 'Move Zeros to End', prompt: 'Keep relative order of non-zero items, shifting zeros to end.', banglaHint: '`w` রাইট-পয়েন্টার রেখে `a.swap(w, r)` করো।', starterCode: `use std::io::{self, Read};\nfn main(){ let mut s=String::new(); io::stdin().read_to_string(&mut s).unwrap(); let mut it=s.split_whitespace().map(|x|x.parse::<i64>().unwrap()); let n=it.next().unwrap() as usize; let mut a:Vec<i64>=(0..n).map(|_|it.next().unwrap()).collect(); let mut w=0; for r in 0..n{ if a[r]!=0{a.swap(w,r);w+=1;} } for i in 0..n{if i>0{print!(" ");} print!("{}",a[i]);} println!(); }`, sampleStdin: '5\n0 1 0 3 12', expectedOutput: '1 3 12 0 0' },
      { id: 'rust-ch12-p5', difficulty: 'Hard', title: 'Container With Most Water', prompt: 'Compute max `a[l].min(a[r]) * ((r - l) as i64)`.', banglaHint: 'দুই প্রান্তের যে উচ্চতা ছোট সেটি ভেতরে নাও।', starterCode: `use std::io::{self, Read};\nfn main(){ let mut s=String::new(); io::stdin().read_to_string(&mut s).unwrap(); let mut it=s.split_whitespace().map(|x|x.parse::<i64>().unwrap()); let n=it.next().unwrap() as usize; let h:Vec<i64>=(0..n).map(|_|it.next().unwrap()).collect(); let (mut l,mut r,mut b)=(0,n.saturating_sub(1),0i64); while l<r{ b=b.max(h[l].min(h[r])*((r-l) as i64)); if h[l]<h[r]{l+=1;} else{r-=1;} } println!("{}",b); }`, sampleStdin: '5\n1 8 6 2 5', expectedOutput: '15' },
    ],
    miniBuild: {
      title: 'Mini-Build: O(N) Max K-Window Sliding Engine',
      description: 'Read N, K and N i64 values and find max contiguous K-window sum in O(N).',
      banglaGoal: 'স্লাইডিং উইন্ডো ও `i64` যোগফলের মাধ্যমে `O(N)` সময়ে সর্বোচ্চ `K`-উইন্ডো সাম নির্ণয় করো।',
      combinesChapters: 'Rust Ch 1–12',
      starterCode: `use std::io::{self, Read};

fn main() {
    let mut input = String::new();
    io::stdin().read_to_string(&mut input).unwrap();
    let mut it = input.split_whitespace().map(|s| s.parse::<i64>().unwrap());
    let n = match it.next() { Some(v) => v as usize, None => return };
    let k = it.next().unwrap() as usize;
    let a: Vec<i64> = (0..n).map(|_| it.next().unwrap()).collect();
    let mut win: i64 = a[..k].iter().sum();
    let mut best = win;
    for i in k..n {
        win += a[i] - a[i - k];
        if win > best {
            best = win;
        }
    }
    println!("{}", best);
}`,
      sampleStdin: '5 3\n5 2 8 1 9',
      expectedOutput: '18',
    },
    starterCode: `use std::io::{self, Read};

fn main() {
    let mut input = String::new();
    io::stdin().read_to_string(&mut input).unwrap();
    let mut it = input.split_whitespace().map(|s| s.parse::<i64>().unwrap());
    let n = match it.next() { Some(v) => v as usize, None => return };
    let k = it.next().unwrap() as usize;
    let a: Vec<i64> = (0..n).map(|_| it.next().unwrap()).collect();
    let mut win: i64 = a[..k].iter().sum();
    let mut best = win;
    for i in k..n {
        win += a[i] - a[i - k];
        if win > best {
            best = win;
        }
    }
    println!("{}", best);
}`,
    sampleStdin: '5 3\n5 2 8 1 9',
    expectedSampleOutput: '18',
    testCases: [
      { id: 'rust12-t1', input: '5 3\n5 2 8 1 9', expectedOutput: '18' },
      { id: 'rust12-t2', input: '4 2\n4 1 3 7', expectedOutput: '10', isHidden: true },
    ],
  },
  13: {
    chapterNumber: 13,
    title: 'Prefix Sums & Difference Arrays',
    banglaTitle: 'প্রিফিক্স সাম ও ডিফারেন্স অ্যারে',
    subtitle: '1-based i64 prefix tables, O(1) range queries, and offline difference array updates',
    zeroIntuition: {
      plainEnglishStory:
        'A prefix sum vector `pref` of length `n + 1` stores `pref[i] = a[0] + ... + a[i - 1]` with `pref[0] = 0`. Once built in `O(n)` using `i64` to avoid 32-bit overflow, any range sum `[l, r]` (0-indexed inclusive) resolves in `O(1)` via `pref[r + 1] - pref[l]`.\n\nA difference array `diff` of length `n + 1` inverts that operation: adding `+val` to `[l, r]` only writes `diff[l] += val` and `diff[r + 1] -= val`, followed by a single final prefix scan to materialize all updated elements without quadratic loops.',
      asciiFlowchart:
        'a    = [3, 1, 4, 2]\npref = [0, 3, 4, 8, 10]\nsum(1..3) = pref[4] - pref[1] = 10 - 3 = 7',
      pseudocode: ["pref[0] = 0","for i in 0..n: pref[i + 1] = pref[i] + a[i]","query(l, r) -> pref[r + 1] - pref[l]"],
      banglaZeroToHero: {
        analogyTitle: 'রেলস্টেশনের টিকিট কাউন্টারের মতো ক্রমবর্ধমান দূরত্ব হিসাব',
        explanation:
          'মনে করো ঢাকা থেকে চট্টগ্রাম রেললাইনের প্রতিটি স্টেশনের দূরত্ব শুরুর বিন্দু থেকে লেখা আছে—যেমন কমলাপুর থেকে ভৈরব ৮৫ কিমি আর আখাউড়া ১২৫ কিমি। এখন কেউ যদি জিজ্ঞাসা করে ভৈরব থেকে আখাউড়ার দূরত্ব কত, তুমি পুরো রাস্তা না মেপে এক সেকেন্ডে ১২৫ থেকে ৮৫ বিয়োগ করে ৪০ বলে দাও। প্রিফিক্স সাম ঠিক এই কৌশলটিই ব্যবহার করে: আগে শুরুর ইনডেক্স থেকে প্রতিটি অবস্থান পর্যন্ত যোগফল `pref` ভেক্টরে জমিয়ে রাখে। রাস্টে ইনপুট বড় হলে যোগফল `i32`-এর সীমা ছাড়িয়ে যায়, তাই সব সময় `Vec<i64>` ব্যবহার করা নিরাপদ। `pref[0] = 0` রাখলে `[l, r]` রেঞ্জের যোগফল বের করতে কোনো আলাদা `if l == 0` কন্ডিশন লিখতে হয় না, সরাসরি `pref[r + 1] - pref[l]` দিলেই হয়। অন্যদিকে ডিফারেন্স অ্যারে হলো প্রিফিক্স সামের ঠিক উল্টো প্রক্রিয়া, যেখানে `[l, r]` রেঞ্জের সব ঘরে `x` যোগ করতে লুপ না চালিয়ে শুধু `diff[l] += x` এবং `diff[r + 1] -= x` লেখা হয়। সব কুয়েরি শেষ হলে `diff`-এর ওপর একবার প্রিফিক্স সাম চালালেই পুরো অ্যারের চূড়ান্ত মান পেয়ে যাই। সাবঅ্যারের যোগফল বের করার সমস্যাগুলোতে প্রিফিক্স সামের সাথে `HashMap<i64, usize>` জুড়ে দিলে O(n^2) সমাধান সরাসরি O(n)-এ নেমে আসে।',
        everydayExample: 'ব্যাংক স্টেটমেন্টে শুরুর দিন থেকে প্রতিদিন পর্যন্ত মোট ব্যালেন্স রাখা থাকলে যেকোনো দুই তারিখের মধ্যের মোট আয়-ব্যয় এক বিয়োগেই পাওয়া যায়।',
        keyTakeaways: [
          '১-বেসড প্রিফিক্স অ্যারে (`pref[0] = 0`) রেঞ্জ `[l, r]`-এর যোগফল সব সময় `pref[r + 1] - pref[l]`-এ সরল করে।',
          'ডিফারেন্স অ্যারেতে রেঞ্জ আপডেটের জন্য `n + 1` দৈর্ঘ্যের ভেক্টর না নিলে `r + 1` ইনডেক্স প্যানিক করতে পারে।',
          'যোগফল ওভারফ্লো ঠেকাতে প্রিফিক্স অ্যারেতে সর্বদা `i64` টাইপ ব্যবহার করো।',
        ],
      },
    },
    topics: [
      {
        id: 'rust-ch13-t1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: '1-Based i64 Prefix Sum Construction',
        englishParagraphs: [
          'Allocating `vec![0i64; a.len() + 1]` gives a clean guard zero at index `0`, so every slice sum computes uniformly without branching.',
        ],
        banglaParagraphs: [
          '`vec![0i64; a.len() + 1]` ব্যবহার করলে ইনডেক্স ০-তে শূন্য থাকে, ফলে যেকোনো রেঞ্জের যোগফল একই সূত্রে বের হয়।',
        ],
        memoryDiagram: 'a=[2,5,3,8] -> pref=[0,2,7,10,18]',
        code: `fn main() {\n    let a: [i64; 4] = [2, 5, 3, 8];\n    let mut pref = vec![0i64; a.len() + 1];\n    for i in 0..a.len() {\n        pref[i + 1] = pref[i] + a[i];\n    }\n    println!("{}", pref[4] - pref[1]);\n}`,
        stdin: '',
        expectedOutput: '16',
        lineByLine: [
          {"lineNumber":"Line 3","codeSnippet":"    let mut pref = vec![0i64; a.len() + 1];","whatItMeans":"Creates 1-based prefix table initialized to `0i64`.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"`pref` does not exist."},
          {"lineNumber":"Line 5","codeSnippet":"        pref[i + 1] = pref[i] + a[i];","whatItMeans":"Accumulates running total safely in 64-bit integer.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Prefix sums remain all zeros."},
          {"lineNumber":"Line 7","codeSnippet":"    println!(\"{}\", pref[4] - pref[1]);","whatItMeans":"Queries inclusive sum of indices `1..=3` in O(1).","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"No query output is printed."},
        ],
      },
      {
        id: 'rust-ch13-t2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Batch Range Sum Queries from Stdin',
        englishParagraphs: [
          'Read `n`, `q`, the `n` values, and `q` `(l, r)` pairs (1-indexed), then answer every query in O(1) after a single O(n) precomputation.',
        ],
        banglaParagraphs: [
          'প্রথমে একবার `O(n)` প্রিফিক্স সাম তৈরি করে নিয়ে তারপর প্রতিটি `(l, r)` কুয়েরির উত্তর `O(1)` সময়ে প্রিন্ট করো।',
        ],
        memoryDiagram: '1-based query (l, r) -> pref[r] - pref[l - 1]',
        code: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n    let mut it = s.split_whitespace();\n    let n: usize = it.next().unwrap().parse().unwrap();\n    let q: usize = it.next().unwrap().parse().unwrap();\n    let mut pref = vec![0i64; n + 1];\n    for i in 1..=n {\n        let x: i64 = it.next().unwrap().parse().unwrap();\n        pref[i] = pref[i - 1] + x;\n    }\n    let mut out = String::new();\n    for _ in 0..q {\n        let l: usize = it.next().unwrap().parse().unwrap();\n        let r: usize = it.next().unwrap().parse().unwrap();\n        out.push_str(&format!("{}\\n", pref[r] - pref[l - 1]));\n    }\n    print!("{}", out);\n}`,
        stdin: '5 2\n3 1 4 1 5\n2 4\n1 5',
        expectedOutput: '6\n14',
        lineByLine: [
          {"lineNumber":"Line 11","codeSnippet":"        pref[i] = pref[i - 1] + x;","whatItMeans":"Builds 1-indexed prefix sum straight from token stream.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Prefix table stays zero."},
          {"lineNumber":"Line 17","codeSnippet":"        out.push_str(&format!(\"{}\\n\", pref[r] - pref[l - 1]));","whatItMeans":"Buffers O(1) answers to avoid slow stdout locks.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"No answers appear in stdout."},
        ],
      },
      {
        id: 'rust-ch13-t3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Difference Array Server Load Scheduler',
        englishParagraphs: [
          'Given server traffic intervals `[l, r]` adding `+delta` requests per minute, mark `diff[l] += delta` and `diff[r + 1] -= delta` to find peak load in linear time.',
        ],
        banglaParagraphs: [
          'প্রতিটি ইন্টারভালে লুপ না চালিয়ে ডিফারেন্স অ্যারেতে শুধু শুরু এবং শেষ+১ পজিশন আপডেট করলে এক স্ক্যানেই সর্বোচ্চ সার্ভার লোড বের হয়।',
        ],
        memoryDiagram: 'diff[l]+=v, diff[r+1]-=v -> running sum gives load[t]',
        code: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n    let mut it = s.split_whitespace();\n    let n: usize = it.next().unwrap().parse().unwrap();\n    let m: usize = it.next().unwrap().parse().unwrap();\n    let mut diff = vec![0i64; n + 2];\n    for _ in 0..m {\n        let l: usize = it.next().unwrap().parse().unwrap();\n        let r: usize = it.next().unwrap().parse().unwrap();\n        let v: i64 = it.next().unwrap().parse().unwrap();\n        diff[l] += v;\n        diff[r + 1] -= v;\n    }\n    let (mut cur, mut best) = (0i64, 0i64);\n    for i in 1..=n {\n        cur += diff[i];\n        if cur > best { best = cur; }\n    }\n    println!("{}", best);\n}`,
        stdin: '5 3\n1 3 10\n2 5 5\n3 4 7',
        expectedOutput: '22',
        lineByLine: [
          {"lineNumber":"Line 8","codeSnippet":"    let mut diff = vec![0i64; n + 2];","whatItMeans":"Extra trailing slot prevents panic when `r == n`.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Out-of-bounds index panic on `diff[n + 1]`."},
          {"lineNumber":"Line 14","codeSnippet":"        diff[r + 1] -= v;","whatItMeans":"Cancels the added load right after index `r`.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Load leaks indefinitely to all slots after `r`."},
        ],
      },
      {
        id: 'rust-ch13-t4',
        badge: 'Example 4: Bug Trap vs. CP/Production Pattern',
        title: 'Prefix Sum + HashMap Subarray Count Equals K',
        englishParagraphs: [
          'Because values can be negative, sliding window fails. Storing seen prefix frequencies in `HashMap<i64, i64>` seeded with `{0: 1}` counts every subarray summing to `k` in `O(n)`.',
        ],
        banglaParagraphs: [
          'নেগেটিভ সংখ্যা থাকলে স্লাইডিং উইন্ডো কাজ করে না; প্রিফিক্স সামের সাথে `HashMap` ব্যবহার করে `pref - k` খুঁজলে `O(n)` সময়ে উত্তর মিলে।',
        ],
        memoryDiagram: 'map[0]=1; at prefix p, add map[p - k] then map[p] += 1',
        code: `use std::collections::HashMap;\nuse std::io::{self, Read};\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n    let mut it = s.split_whitespace();\n    let n: usize = it.next().unwrap().parse().unwrap();\n    let k: i64 = it.next().unwrap().parse().unwrap();\n    let mut freq: HashMap<i64, i64> = HashMap::new();\n    freq.insert(0, 1);\n    let (mut pref, mut ans) = (0i64, 0i64);\n    for _ in 0..n {\n        let x: i64 = it.next().unwrap().parse().unwrap();\n        pref += x;\n        if let Some(&c) = freq.get(&(pref - k)) { ans += c; }\n        *freq.entry(pref).or_insert(0) += 1;\n    }\n    println!("{}", ans);\n}`,
        stdin: '5 3\n1 2 -1 2 1',
        expectedOutput: '4',
        lineByLine: [
          {"lineNumber":"Line 10","codeSnippet":"    freq.insert(0, 1);","whatItMeans":"Accounts for subarrays starting at index `0` with sum `k`.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Subarrays starting from index 0 are missed."},
          {"lineNumber":"Line 15","codeSnippet":"        if let Some(&c) = freq.get(&(pref - k)) { ans += c; }","whatItMeans":"Counts previous prefixes whose difference equals `k`.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Matching subarrays are never tallied."},
        ],
      },
    ],
    lineByLineAnatomy: [
      {"lineNumber":"Line 2","codeSnippet":"    let a: [i64; 4] = [2, 5, 3, 8];","whatItMeans":"Fixed 64-bit input slice.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"No source data for prefix array."},
      {"lineNumber":"Line 3","codeSnippet":"    let mut pref = vec![0i64; a.len() + 1];","whatItMeans":"Initializes 1-based prefix table with leading 0.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Missing `pref` buffer."},
      {"lineNumber":"Line 4","codeSnippet":"    for i in 0..a.len() {","whatItMeans":"Iterates safely over valid input indices.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Prefix vector remains empty zeros."},
      {"lineNumber":"Line 5","codeSnippet":"        pref[i + 1] = pref[i] + a[i];","whatItMeans":"Computes cumulative sum up to element `i`.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"No accumulation happens."},
      {"lineNumber":"Line 7","codeSnippet":"    println!(\"{}\", pref[4] - pref[1]);","whatItMeans":"Outputs `a[1] + a[2] + a[3] = 16`.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"No output printed."},
    ],
    dryRunTable: [
      { step: 1, state: 'i=0, a[0]=2', memoryOrStack: 'pref=[0, 2, 0, 0, 0]', note: 'pref[1] = 0 + 2' },
      { step: 2, state: 'i=1, a[1]=5', memoryOrStack: 'pref=[0, 2, 7, 0, 0]', note: 'pref[2] = 2 + 5' },
      { step: 3, state: 'i=2..3', memoryOrStack: 'pref=[0, 2, 7, 10, 18]', note: 'Full prefix array ready' },
      { step: 4, state: 'query [1..3]', memoryOrStack: '18 - 2 = 16', note: 'O(1) subtraction prints 16' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: Using `i32` for Prefix Sums Above 2e9',
        brokenCode: 'let mut pref = vec![0i32; n + 1];',
        fixedCode: 'let mut pref = vec![0i64; n + 1];',
        whyItBreaks: '10^5 elements up to 10^9 sum to 10^14, causing `i32` overflow/panic in debug builds.',
      },
      {
        title: 'Trap 2: Off-by-One in Difference Array Size (`n` vs `n + 2`)',
        brokenCode: 'let mut diff = vec![0i64; n]; diff[r + 1] -= v;',
        fixedCode: 'let mut diff = vec![0i64; n + 2]; diff[r + 1] -= v;',
        whyItBreaks: 'When 1-based `r == n`, writing `diff[n + 1]` panics with index out of bounds.',
      },
      {
        title: 'Trap 3: Inserting `pref` Into HashMap Before Querying `pref - k`',
        brokenCode: '*freq.entry(pref).or_insert(0) += 1;\nif let Some(&c) = freq.get(&(pref - k)) { ans += c; }',
        fixedCode: 'if let Some(&c) = freq.get(&(pref - k)) { ans += c; }\n*freq.entry(pref).or_insert(0) += 1;',
        whyItBreaks: 'When `k == 0`, inserting first falsely counts an empty zero-length subarray.',
      },
    ],
    practiceSheet: [
      {
        id: 'rust-ch13-p1',
        difficulty: 'Easy',
        title: 'Running Sum Array',
        prompt: 'Read `n` and `n` integers, then print the running prefix sum array separated by spaces.',
        banglaHint: 'একটি `acc: i64` ভ্যারিয়েবল নিয়ে প্রতি ধাপে যোগ করে প্রিন্ট করো।',
        starterCode: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n    let mut it = s.split_whitespace();\n    let n: usize = it.next().unwrap().parse().unwrap();\n    let mut acc = 0i64;\n    let mut out = Vec::with_capacity(n);\n    for _ in 0..n {\n        acc += it.next().unwrap().parse::<i64>().unwrap();\n        out.push(acc.to_string());\n    }\n    println!("{}", out.join(" "));\n}`,
        sampleStdin: '4\n1 2 3 4',
        expectedOutput: '1 3 6 10',
      },
      {
        id: 'rust-ch13-p2',
        difficulty: 'Easy',
        title: 'Equilibrium Pivot Index',
        prompt: 'Find the smallest 0-based index where left sum equals right sum, or print `-1`.',
        banglaHint: 'মোট যোগফল `total` বের করে বাম দিকের যোগফল `left == total - left - a[i]` চেক করো।',
        starterCode: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n    let mut it = s.split_whitespace();\n    let n: usize = it.next().unwrap().parse().unwrap();\n    let a: Vec<i64> = (0..n).map(|_| it.next().unwrap().parse().unwrap()).collect();\n    let total: i64 = a.iter().sum();\n    let mut left = 0i64;\n    let mut ans: isize = -1;\n    for i in 0..n {\n        if left == total - left - a[i] { ans = i as isize; break; }\n        left += a[i];\n    }\n    println!("{}", ans);\n}`,
        sampleStdin: '6\n1 7 3 6 5 6',
        expectedOutput: '3',
      },
      {
        id: 'rust-ch13-p3',
        difficulty: 'Medium',
        title: 'Range Increment Final Array',
        prompt: 'Start with `n` zeros, apply `m` updates `[l, r, v]` (1-indexed), and print the final array.',
        banglaHint: 'ডিফারেন্স অ্যারে `diff[n + 2]` আপডেট করে শেষে প্রিফিক্স যোগ করো।',
        starterCode: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n    let mut it = s.split_whitespace();\n    let n: usize = it.next().unwrap().parse().unwrap();\n    let m: usize = it.next().unwrap().parse().unwrap();\n    let mut diff = vec![0i64; n + 2];\n    for _ in 0..m {\n        let l: usize = it.next().unwrap().parse().unwrap();\n        let r: usize = it.next().unwrap().parse().unwrap();\n        let v: i64 = it.next().unwrap().parse().unwrap();\n        diff[l] += v;\n        diff[r + 1] -= v;\n    }\n    let mut cur = 0i64;\n    let mut out = Vec::with_capacity(n);\n    for i in 1..=n { cur += diff[i]; out.push(cur.to_string()); }\n    println!("{}", out.join(" "));\n}`,
        sampleStdin: '5 2\n1 3 2\n2 5 3',
        expectedOutput: '2 5 5 3 3',
      },
      {
        id: 'rust-ch13-p4',
        difficulty: 'Medium',
        title: 'Subarrays Divisible by K',
        prompt: 'Given `n`, `k`, and `n` integers, count non-empty subarrays whose sum is divisible by `k`.',
        banglaHint: 'নেগেটিভ সংখ্যার ক্ষেত্রে `rem = ((pref % k) + k) % k` নিয়ে পজিটিভ রিমাইন্ডার বের করো।',
        starterCode: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n    let mut it = s.split_whitespace();\n    let n: usize = it.next().unwrap().parse().unwrap();\n    let k: i64 = it.next().unwrap().parse().unwrap();\n    let mut cnt = vec![0i64; k as usize];\n    cnt[0] = 1;\n    let (mut pref, mut ans) = (0i64, 0i64);\n    for _ in 0..n {\n        pref += it.next().unwrap().parse::<i64>().unwrap();\n        let r = (((pref % k) + k) % k) as usize;\n        ans += cnt[r];\n        cnt[r] += 1;\n    }\n    println!("{}", ans);\n}`,
        sampleStdin: '6 5\n4 5 0 -2 -3 1',
        expectedOutput: '7',
      },
      {
        id: 'rust-ch13-p5',
        difficulty: 'Hard',
        title: '2D Submatrix Sum Query',
        prompt: 'Read `r`, `c`, an `r x c` matrix, and a 1-indexed query `(r1, c1, r2, c2)`. Print the submatrix sum.',
        banglaHint: '2D প্রিফিক্স সূত্র `P[r2][c2] - P[r1-1][c2] - P[r2][c1-1] + P[r1-1][c1-1]` ব্যবহার করো।',
        starterCode: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n    let mut it = s.split_whitespace();\n    let r: usize = it.next().unwrap().parse().unwrap();\n    let c: usize = it.next().unwrap().parse().unwrap();\n    let mut p = vec![vec![0i64; c + 1]; r + 1];\n    for i in 1..=r {\n        for j in 1..=c {\n            let v: i64 = it.next().unwrap().parse().unwrap();\n            p[i][j] = v + p[i - 1][j] + p[i][j - 1] - p[i - 1][j - 1];\n        }\n    }\n    let r1: usize = it.next().unwrap().parse().unwrap();\n    let c1: usize = it.next().unwrap().parse().unwrap();\n    let r2: usize = it.next().unwrap().parse().unwrap();\n    let c2: usize = it.next().unwrap().parse().unwrap();\n    println!("{}", p[r2][c2] - p[r1 - 1][c2] - p[r2][c1 - 1] + p[r1 - 1][c1 - 1]);\n}`,
        sampleStdin: '3 3\n1 2 3\n4 5 6\n7 8 9\n2 2 3 3',
        expectedOutput: '28',
      },
    ],
    miniBuild: {
      title: 'Mini-Build: Offline Traffic Peak & Range Query Analyzer',
      description: 'Apply `m` range additions on a 1-based timeline, build its prefix sum array, and answer `q` range-sum queries.',
      banglaGoal: 'ডিফারেন্স অ্যারে দিয়ে রেঞ্জ আপডেট শেষ করে প্রিফিক্স সামের মাধ্যমে একাধিক রেঞ্জের মোট লোড নির্ণয় করো।',
      combinesChapters: "Ch 11, 13",
      starterCode: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n    let mut it = s.split_whitespace();\n    let n: usize = it.next().unwrap().parse().unwrap();\n    let m: usize = it.next().unwrap().parse().unwrap();\n    let q: usize = it.next().unwrap().parse().unwrap();\n    let mut diff = vec![0i64; n + 2];\n    for _ in 0..m {\n        let l: usize = it.next().unwrap().parse().unwrap();\n        let r: usize = it.next().unwrap().parse().unwrap();\n        let v: i64 = it.next().unwrap().parse().unwrap();\n        diff[l] += v;\n        diff[r + 1] -= v;\n    }\n    let mut pref = vec![0i64; n + 1];\n    let mut cur = 0i64;\n    for i in 1..=n {\n        cur += diff[i];\n        pref[i] = pref[i - 1] + cur;\n    }\n    for _ in 0..q {\n        let l: usize = it.next().unwrap().parse().unwrap();\n        let r: usize = it.next().unwrap().parse().unwrap();\n        println!("{}", pref[r] - pref[l - 1]);\n    }\n}`,
      sampleStdin: '5 2 2\n1 3 4\n2 5 2\n1 3\n4 5',
      expectedOutput: '16\n4',
    },
    starterCode: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n    let mut it = s.split_whitespace();\n    let n: usize = it.next().unwrap().parse().unwrap();\n    let m: usize = it.next().unwrap().parse().unwrap();\n    let q: usize = it.next().unwrap().parse().unwrap();\n    let mut diff = vec![0i64; n + 2];\n    for _ in 0..m {\n        let l: usize = it.next().unwrap().parse().unwrap();\n        let r: usize = it.next().unwrap().parse().unwrap();\n        let v: i64 = it.next().unwrap().parse().unwrap();\n        diff[l] += v;\n        diff[r + 1] -= v;\n    }\n    let mut pref = vec![0i64; n + 1];\n    let mut cur = 0i64;\n    for i in 1..=n {\n        cur += diff[i];\n        pref[i] = pref[i - 1] + cur;\n    }\n    for _ in 0..q {\n        let l: usize = it.next().unwrap().parse().unwrap();\n        let r: usize = it.next().unwrap().parse().unwrap();\n        println!("{}", pref[r] - pref[l - 1]);\n    }\n}`,
    sampleStdin: '5 2 2\n1 3 4\n2 5 2\n1 3\n4 5',
    expectedSampleOutput: '16\n4',
    testCases: [
      { id: 'rust13-t1', input: '5 2 2\n1 3 4\n2 5 2\n1 3\n4 5', expectedOutput: '16\n4' },
      { id: 'rust13-t2', input: '4 1 1\n2 4 5\n1 4', expectedOutput: '15', isHidden: true },
    ],
  },
  14: {
    chapterNumber: 14,
    title: 'Strings, UTF-8 Slices & Byte Manipulation',
    banglaTitle: 'স্ট্রিং, UTF-8 ও বাইট ম্যানিপুলেশন',
    subtitle: 'String vs &str, .as_bytes() for ASCII indexing, and zero-copy char iteration',
    zeroIntuition: {
      plainEnglishStory:
        'Unlike C or Python, Rust strings are strictly guaranteed valid UTF-8, which means characters like `"অ"` take 3 bytes while ASCII `"a"` takes 1 byte. Because `s[i]` could slice inside the middle of a multi-byte character and corrupt UTF-8, Rust forbids direct `s[i]` indexing on `String` and `&str` at compile time.\n\nFor competitive programming with lowercase English letters, `s.as_bytes()` gives an O(1) `&[u8]` slice (`b\'a\'..=b\'z\'`), while general Unicode text uses `s.chars()` or `s.split_whitespace()`. Keeping `&str` slices for read-only work avoids unnecessary heap clones.',
      asciiFlowchart:
        'String { ptr, len, cap }  --borrows-->  &str (UTF-8 view)\n                                       +-- .as_bytes() -> &[u8] (O(1) ASCII index)\n                                       +-- .chars()    -> Unicode Scalar Iterator',
      pseudocode: ["bytes = s.as_bytes()","for b in bytes: cnt[(b - b'a') as usize] += 1"],
      banglaZeroToHero: {
        analogyTitle: 'UTF-8 স্ট্রিং হলো বিভিন্ন প্রস্থের ইটের তৈরি দেয়াল',
        explanation:
          'সি বা পাইথনে স্ট্রিংয়ের `s[2]` লিখলেই সরাসরি তৃতীয় অক্ষর পাওয়া যায়, কিন্তু রাস্টে তা কম্পাইল এরর দেয়। এর কারণ রাস্টের প্রতিটি `String` ও `&str` কঠোরভাবে UTF-8 এনকোডেড, যেখানে ইংরেজি `A` ১ বাইট হলেও বাংলা `অ` ৩ বাইট জায়গা নেয়। সরাসরি `s[i]` দিলে একটি অক্ষরের মাঝখান থেকে কেটে ডেটা নষ্ট হওয়ার ভয় থাকে, তাই রাস্ট কম্পাইলার এটি নিষিদ্ধ করেছে। প্রবলেম সলভিংয়ে শুধু ইংরেজি অক্ষর থাকলে `s.as_bytes()` ব্যবহার করে সরাসরি `O(1)` বাইট স্লাইস `&[u8]` পাওয়া যায়, যেখানে `b\'a\'` বিয়োগ করে ফ্রিকোয়েন্সি গণনা করা যায়। আর বাংলা বা ইমোজি থাকলে `s.chars()` ইটারেটর ব্যবহার করে প্রতিটি ইউনিকোড অক্ষর নিরাপদে পড়া হয়। রিড-অনলি কাজের জন্য ফাংশনে `String`-এর বদলে `&str` পাস করলে কোনো হিপ কপি তৈরি হয় না। স্ট্রিং জোড়া লাগাতে হলে লুপের মধ্যে `+` ব্যবহার করার বদলে মিউটেবল `String::with_capacity` এবং `push_str` ব্যবহার করা সবচেয়ে দ্রুত। সব মিলিয়ে UTF-8 নিরাপত্তা, `String` বনাম `&str` পার্থক্য এবং `.as_bytes()` জানলে স্ট্রিং ম্যানিপুলেশন রাস্টে অত্যন্ত নিরাপদ ও দ্রুতগতির হয়।',
        everydayExample: 'একটি ট্রেনে প্রতিটি বগি সমান দৈর্ঘ্যের নয়; তাই ৩ নম্বর মিটারে কাটলে বগি ভেঙে যাবে, সঠিক বগি গুনতে দরজা ধরে গুনতে হয়।',
        keyTakeaways: [
          'রাস্টে `s[i]` বৈধ নয়—ASCII কাজের জন্য `.as_bytes()` এবং ইউনিকোডের জন্য `.chars()` ব্যবহার করো।',
          '`String` হলো মালিকানাধীন হিপ বাফার; `&str` হলো অপরিবর্তনযোগ্য UTF-8 স্লাইস।',
          'বড় স্ট্রিং গঠনে লুপের ভেতর `push` / `push_str` ব্যবহার করলে অপ্রয়োজনীয় রিঅ্যালোকেশন কমে।',
        ],
      },
    },
    topics: [
      {
        id: 'rust-ch14-t1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Inspecting Bytes vs. Unicode Chars',
        englishParagraphs: [
          'Observe why byte length (`len()`) and Unicode character count (`chars().count()`) differ for non-ASCII text, and how `.as_bytes()` accesses ASCII letters safely.',
        ],
        banglaParagraphs: [
          'ইংরেজি বনাম ইউনিকোড অক্ষরে বাইট দৈর্ঘ্য এবং ক্যারেক্টার সংখ্যার পার্থক্য দেখো।',
        ],
        memoryDiagram: '"Hi" -> 2 bytes, 2 chars | "ক" -> 3 bytes, 1 char',
        code: `fn main() {\n    let s = String::from("rust24");\n    let bytes = s.as_bytes();\n    println!("len={} first={} last={}", s.len(), bytes[0] as char, bytes[bytes.len() - 1] as char);\n}`,
        stdin: '',
        expectedOutput: 'len=6 first=r last=4',
        lineByLine: [
          {"lineNumber":"Line 2","codeSnippet":"    let s = String::from(\"rust24\");","whatItMeans":"Allocates owned UTF-8 `String` on heap.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"`s` is undefined."},
          {"lineNumber":"Line 3","codeSnippet":"    let bytes = s.as_bytes();","whatItMeans":"Borrows `&[u8]` byte slice for O(1) indexing.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Cannot index `s[0]` directly."},
          {"lineNumber":"Line 4","codeSnippet":"    println!(\"len={} first={} last={}\", s.len(), bytes[0] as char, bytes[bytes.len() - 1] as char);","whatItMeans":"Prints length plus first and last ASCII characters.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"No output is emitted."},
        ],
      },
      {
        id: 'rust-ch14-t2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Run-Length Encoding Compression',
        englishParagraphs: [
          'Convert `"aaabbc"` into `"a3b2c1"` in one O(n) pass over `.as_bytes()` using `String::new()` and `push_str`.',
        ],
        banglaParagraphs: [
          '`.as_bytes()` এর ওপর একবার লুপ চালিয়ে পরপর একই অক্ষর গুনে রান-লেন্থ এনকোডিং করো।',
        ],
        memoryDiagram: 'aaabbc -> (a,3), (b,2), (c,1) -> a3b2c1',
        code: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n    let b = s.trim().as_bytes();\n    let mut out = String::new();\n    let mut i = 0;\n    while i < b.len() {\n        let mut j = i;\n        while j < b.len() && b[j] == b[i] { j += 1; }\n        out.push(b[i] as char);\n        out.push_str(&(j - i).to_string());\n        i = j;\n    }\n    println!("{}", out);\n}`,
        stdin: 'aaabbc',
        expectedOutput: 'a3b2c1',
        lineByLine: [
          {"lineNumber":"Line 10","codeSnippet":"        while j < b.len() && b[j] == b[i] { j += 1; }","whatItMeans":"Expands `j` across identical consecutive bytes.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Loop fails to group repeated letters."},
          {"lineNumber":"Line 11","codeSnippet":"        out.push(b[i] as char);","whatItMeans":"Appends single ASCII byte back as `char`.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Letter symbol is omitted from compressed output."},
        ],
      },
      {
        id: 'rust-ch14-t3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'URL Slug Normalizer',
        englishParagraphs: [
          'Clean an arbitrary title by keeping ASCII alphanumerics lowercased and collapsing spaces/punctuation into single hyphens (`-`).',
        ],
        banglaParagraphs: [
          'অগোছালো শিরোনাম থেকে ছোট হাতের অক্ষর ও সংখ্যা রেখে বাকি স্পেস বা চিহ্নকে একক হাইফেনে রূপান্তর করো।',
        ],
        memoryDiagram: '"  Rust 2024: Zero-Cost! " -> "rust-2024-zero-cost"',
        code: `use std::io::{self, Read};\nfn main() {\n    let mut raw = String::new();\n    io::stdin().read_to_string(&mut raw).unwrap();\n    let mut slug = String::new();\n    let mut dash = false;\n    for ch in raw.chars() {\n        if ch.is_ascii_alphanumeric() {\n            if dash && !slug.is_empty() { slug.push('-'); }\n            slug.push(ch.to_ascii_lowercase());\n            dash = false;\n        } else {\n            dash = true;\n        }\n    }\n    println!("{}", slug);\n}`,
        stdin: '  Rust 2024: Zero-Cost! ',
        expectedOutput: 'rust-2024-zero-cost',
        lineByLine: [
          {"lineNumber":"Line 9","codeSnippet":"            if dash && !slug.is_empty() { slug.push('-'); }","whatItMeans":"Emits single separator only between alphanumeric words.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Words merge without hyphens."},
          {"lineNumber":"Line 10","codeSnippet":"            slug.push(ch.to_ascii_lowercase());","whatItMeans":"Converts uppercase ASCII cleanly without locale allocation.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Uppercase letters stay uppercase."},
        ],
      },
      {
        id: 'rust-ch14-t4',
        badge: 'Example 4: Bug Trap vs. CP/Production Pattern',
        title: '26-Slot Anagram Frequency Comparison',
        englishParagraphs: [
          'Sorting both strings costs `O(n log n)` and allocates two `Vec<u8>`. Counting `[i32; 26]` on the stack runs in `O(n)` time and `O(1)` extra memory.',
        ],
        banglaParagraphs: [
          'দুটো স্ট্রিং সর্ট করলে O(n log n) সময় লাগে; স্ট্যাকে `[i32; 26]` অ্যারে দিয়ে গুনে তুলনা করলে O(n) সময়েই সমাধান হয়।',
        ],
        memoryDiagram: 'cnt[b - b\'a\'] += 1 on s1, -= 1 on s2 -> all 0?',
        code: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n    let mut it = s.split_whitespace();\n    let a = it.next().unwrap().as_bytes();\n    let b = it.next().unwrap().as_bytes();\n    if a.len() != b.len() { println!("NO"); return; }\n    let mut cnt = [0i32; 26];\n    for i in 0..a.len() {\n        cnt[(a[i] - b'a') as usize] += 1;\n        cnt[(b[i] - b'a') as usize] -= 1;\n    }\n    println!("{}", if cnt.iter().all(|&x| x == 0) { "YES" } else { "NO" });\n}`,
        stdin: 'listen\nsilent',
        expectedOutput: 'YES',
        lineByLine: [
          {"lineNumber":"Line 9","codeSnippet":"    let mut cnt = [0i32; 26];","whatItMeans":"Stack-allocated fixed frequency table with zero heap overhead.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"No character counts stored."},
          {"lineNumber":"Line 14","codeSnippet":"    println!(\"{}\", if cnt.iter().all(|&x| x == 0) { \"YES\" } else { \"NO\" });","whatItMeans":"Checks all 26 buckets balance to zero.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"No YES/NO result printed."},
        ],
      },
    ],
    lineByLineAnatomy: [
      {"lineNumber":"Line 1","codeSnippet":"fn main() {","whatItMeans":"Program entry point.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Binary has no main symbol."},
      {"lineNumber":"Line 2","codeSnippet":"    let s = String::from(\"rust24\");","whatItMeans":"Creates owned heap String.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"`s` missing."},
      {"lineNumber":"Line 3","codeSnippet":"    let bytes = s.as_bytes();","whatItMeans":"Exposes UTF-8 buffer as indexable `&[u8]`.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Direct indexing fails to compile."},
      {"lineNumber":"Line 4","codeSnippet":"    println!(\"len={} first={} last={}\", s.len(), bytes[0] as char, bytes[bytes.len() - 1] as char);","whatItMeans":"Formats byte count and endpoints.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"No output."},
    ],
    dryRunTable: [
      { step: 1, state: 'String::from("rust24")', memoryOrStack: 'heap="rust24", len=6', note: 'Owned UTF-8 buffer created' },
      { step: 2, state: 's.as_bytes()', memoryOrStack: '[114, 117, 115, 116, 50, 52]', note: 'Zero-copy &[u8] slice borrowed' },
      { step: 3, state: 'bytes[0] as char', memoryOrStack: '\'r\'', note: 'Byte 114 cast to char' },
      { step: 4, state: 'bytes[5] as char', memoryOrStack: '\'4\'', note: 'Last ASCII byte accessed in O(1)' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: Trying to Index a Rust String via `s[i]`',
        brokenCode: 'let ch = s[0];',
        fixedCode: 'let ch = s.as_bytes()[0] as char;',
        whyItBreaks: 'Rust forbids `String[usize]` because UTF-8 code points vary from 1 to 4 bytes.',
      },
      {
        title: 'Trap 2: O(n^2) String Reallocation With `+` in a Loop',
        brokenCode: 'let mut out = String::new(); for _ in 0..n { out = out + "a"; }',
        fixedCode: 'let mut out = String::with_capacity(n); for _ in 0..n { out.push(\'a\'); }',
        whyItBreaks: 'Repeated `+` without capacity hints or `.push` adds unnecessary checks and copies.',
      },
      {
        title: 'Trap 3: Underflowing `usize` on Empty String `s.len() - 1`',
        brokenCode: 'let last = b[b.len() - 1];',
        fixedCode: 'if let Some(&last) = b.last() { /* safe */ }',
        whyItBreaks: 'When `b` is empty, `0usize - 1` wraps/panics in Rust.',
      },
    ],
    practiceSheet: [
      {
        id: 'rust-ch14-p1',
        difficulty: 'Easy',
        title: 'Vowel Counter (Case-Insensitive)',
        prompt: 'Read a line of text and count how many ASCII vowels (`a, e, i, o, u`) appear.',
        banglaHint: '`ch.to_ascii_lowercase()` নিয়ে `matches!(c, \'a\'|\'e\'|\'i\'|\'o\'|\'u\')` চেক করো।',
        starterCode: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n    let cnt = s.chars().filter(|c| matches!(c.to_ascii_lowercase(), 'a'|'e'|'i'|'o'|'u')).count();\n    println!("{}", cnt);\n}`,
        sampleStdin: 'ArgonCode Academy',
        expectedOutput: '7',
      },
      {
        id: 'rust-ch14-p2',
        difficulty: 'Easy',
        title: 'Reverse Words Order',
        prompt: 'Read a sentence and print its whitespace-separated words in reverse order.',
        banglaHint: '`s.split_whitespace().rev().collect::<Vec<_>>().join(" ")` ব্যবহার করো।',
        starterCode: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n    let words: Vec<&str> = s.split_whitespace().rev().collect();\n    println!("{}", words.join(" "));\n}`,
        sampleStdin: 'hello rust world',
        expectedOutput: 'world rust hello',
      },
      {
        id: 'rust-ch14-p3',
        difficulty: 'Medium',
        title: 'First Non-Repeating Character',
        prompt: 'Given a lowercase string, print the first character that appears exactly once, or `-1` if none.',
        banglaHint: 'প্রথমে `[0; 26]`-এ ফ্রিকোয়েন্সি গুনে দ্বিতীয় লুপে `freq == 1` অক্ষরটি প্রিন্ট করো।',
        starterCode: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n    let b = s.trim().as_bytes();\n    let mut f = [0usize; 26];\n    for &x in b { f[(x - b'a') as usize] += 1; }\n    for &x in b {\n        if f[(x - b'a') as usize] == 1 { println!("{}", x as char); return; }\n    }\n    println!("-1");\n}`,
        sampleStdin: 'swiss',
        expectedOutput: 'w',
      },
      {
        id: 'rust-ch14-p4',
        difficulty: 'Medium',
        title: 'Longest Common Prefix',
        prompt: 'Read `n` words and print their longest common prefix (or `NONE` if empty).',
        banglaHint: 'সব শব্দ সর্ট করলে প্রথম ও শেষ শব্দের সাধারণ প্রিফিক্সই পুরো দলের কমন প্রিফিক্স।',
        starterCode: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n    let mut it = s.split_whitespace();\n    let n: usize = it.next().unwrap().parse().unwrap();\n    let mut words: Vec<&str> = (0..n).map(|_| it.next().unwrap()).collect();\n    words.sort();\n    let a = words[0].as_bytes();\n    let b = words[n - 1].as_bytes();\n    let mut k = 0;\n    while k < a.len() && k < b.len() && a[k] == b[k] { k += 1; }\n    println!("{}", if k == 0 { "NONE" } else { &words[0][..k] });\n}`,
        sampleStdin: '3\nflower flow flight',
        expectedOutput: 'fl',
      },
      {
        id: 'rust-ch14-p5',
        difficulty: 'Hard',
        title: 'KMP Prefix Function (LPS Array)',
        prompt: 'Given a string `s`, print the last value of its KMP longest proper prefix-suffix (`lps`) array.',
        banglaHint: 'j = lps[j - 1] ফলব্যাক ব্যবহার করে O(n) সময়ে `lps` অ্যারে তৈরি করো।',
        starterCode: `use std::io::{self, Read};\nfn main() {\n    let mut raw = String::new();\n    io::stdin().read_to_string(&mut raw).unwrap();\n    let s = raw.trim().as_bytes();\n    let mut lps = vec![0usize; s.len()];\n    let mut j = 0;\n    for i in 1..s.len() {\n        while j > 0 && s[i] != s[j] { j = lps[j - 1]; }\n        if s[i] == s[j] { j += 1; }\n        lps[i] = j;\n    }\n    println!("{}", lps.last().copied().unwrap_or(0));\n}`,
        sampleStdin: 'abacaba',
        expectedOutput: '3',
      },
    ],
    miniBuild: {
      title: 'Mini-Build: Log Token Counter & Palindrome Filter',
      description: 'Read a line of tokens, keep alphanumeric lowercased words, count palindromes, and print the count.',
      banglaGoal: 'প্রতিটি শব্দ ক্লিন করে টু-পয়েন্টারের সাহায্যে প্যালিনড্রোম শব্দ গুনে বের করো।',
      combinesChapters: "Ch 12, 14",
      starterCode: `use std::io::{self, Read};\nfn is_pal(b: &[u8]) -> bool {\n    let (mut l, mut r) = (0usize, b.len());\n    while l + 1 < r {\n        r -= 1;\n        if b[l] != b[r] { return false; }\n        l += 1;\n    }\n    true\n}\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n    let mut cnt = 0;\n    for w in s.split_whitespace() {\n        let clean: String = w.chars().filter(|c| c.is_ascii_alphanumeric()).map(|c| c.to_ascii_lowercase()).collect();\n        if !clean.is_empty() && is_pal(clean.as_bytes()) { cnt += 1; }\n    }\n    println!("{}", cnt);\n}`,
      sampleStdin: 'Level! hello Noon rust Civic.',
      expectedOutput: '3',
    },
    starterCode: `use std::io::{self, Read};\nfn is_pal(b: &[u8]) -> bool {\n    let (mut l, mut r) = (0usize, b.len());\n    while l + 1 < r {\n        r -= 1;\n        if b[l] != b[r] { return false; }\n        l += 1;\n    }\n    true\n}\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n    let mut cnt = 0;\n    for w in s.split_whitespace() {\n        let clean: String = w.chars().filter(|c| c.is_ascii_alphanumeric()).map(|c| c.to_ascii_lowercase()).collect();\n        if !clean.is_empty() && is_pal(clean.as_bytes()) { cnt += 1; }\n    }\n    println!("{}", cnt);\n}`,
    sampleStdin: 'Level! hello Noon rust Civic.',
    expectedSampleOutput: '3',
    testCases: [
      { id: 'rust14-t1', input: 'Level! hello Noon rust Civic.', expectedOutput: '3' },
      { id: 'rust14-t2', input: 'abc def', expectedOutput: '0', isHidden: true },
    ],
  },
  15: {
    chapterNumber: 15,
    isMilestoneMerger: true,
    title: 'Recursion & Call Stack Visualization',
    banglaTitle: 'রিকার্সন ও কল স্ট্যাক ভিজ্যুয়ালাইজেশন (মাইলস্টোন ৩)',
    subtitle: 'Stack frames, base cases, memoized Vec caches, and mutable backtracking references',
    zeroIntuition: {
      plainEnglishStory:
        'Each recursive call in Rust pushes a typed stack frame containing local parameters, return address, and borrowed references onto the thread stack. Because Rust allocates stack frames with predictable fixed sizes (default ~2–8 MB per OS thread), clear base cases and logarithmic divide-and-conquer depth keep execution lightning fast without heap churn.\n\nWhen generating combinations or permutations via backtracking, Rust shines by passing a single `&mut Vec<T>` slice down the recursion tree, pushing a choice before descending and calling `.pop()` on unwind—zero defensive clones until a valid solution leaf is reached.',
      asciiFlowchart:
        'solve(idx=0, path=[])\n  |-- path.push(a[0]) -> solve(1, [a[0]])\n  |     |-- leaf? collect path.clone()\n  |-- path.pop() -> backtrack safely',
      pseudocode: ["fn dfs(idx: usize, cur: &mut Vec<i64>, out: &mut Vec<Vec<i64>>):","if done: out.push(cur.clone()); return","cur.push(choice); dfs(next, cur, out); cur.pop()"],
      banglaZeroToHero: {
        analogyTitle: 'একের পর এক ফোল্ডার খুলে নির্দিষ্ট নথি নিয়ে আবার গুছিয়ে ফেরা',
        explanation:
          'রিকার্সনকে ভাবতে পারো একটি বহুতল আর্কাইভের কক্ষ খোঁজার মতো—প্রতিটি দরজা খুলে ভেতরের ছোট দরজায় প্রবেশ করা, আর কাঙ্ক্ষিত নথি পেলেই একে একে দরজা বন্ধ করে বাইরে আসা। রাস্টে প্রতিটি ফাংশন কলের জন্য থ্রেডের কল স্ট্যাকে একটি নতুন ফ্রেম তৈরি হয় যেখানে সেই ধাপের প্যারামিটার ও লোকাল ভ্যারিয়েবল নিরাপদ থাকে। প্রতিটি রিকার্সিভ ফাংশনের দুটি বাধ্যতামূলক অংশ হলো বেস কেস (যেখানে আর নিজেকে কল না করে উত্তর ফেরত দেওয়া হয়) এবং ছোট সাবপ্রবলেম (যা প্রতি ধাপে ইনপুটকে বেস কেসের দিকে নিয়ে যায়)। বেস কেস ভুল হলে কল স্ট্যাক পূর্ণ হয়ে প্রোগ্রাম `stack overflow` হয়ে সাথে সাথে থেমে যায়। রাস্টে ব্যাকট্র্যাকিং লেখার সময় পুরো ভেক্টর কপি না করে `&mut Vec` রেফারেন্স পাস করা হয়; এগিয়ে যাওয়ার আগে `cur.push()` এবং ফিরে আসার পর `cur.pop()` করলে মেমোরি ও সময় দুটোই বাঁচে। আবার ফিবোনাচ্চি বা সাবসেট সামের মতো সমস্যায় একই স্টেট বারবার না গুনতে `&mut [i64]` মেমোইজেশন স্লাইসে উত্তর জমিয়ে রাখা হয়। এই মাইলস্টোন ৩ অধ্যায়ে আমরা ফেজ ৩-এর ভেক্টর, টু-পয়েন্টার, প্রিফিক্স, স্ট্রিং ও রিকার্সনকে একত্র করে শক্তিশালী অ্যালগরিদম তৈরি করব।',
        everydayExample: 'বাড়ি থেকে বাজার পর্যন্ত গোলকধাঁধার গলি ঘুরে শেষে সঠিক পথে বেরিয়ে আসার সময় প্রতিটি মোড়ে রাখা চিহ্ন ফেরার পথে তুলে নেওয়া।',
        keyTakeaways: [
          'বেস কেস নিশ্চিত না করলে থ্রেড স্ট্যাক উপচে `stack overflow` প্যানিক ঘটে।',
          'ব্যাকট্র্যাকিংয়ে `&mut Vec<T>` পাস করে `push` + রিকার্সন + `pop` করলে প্রতিটি ধাপে অযথা ক্লোন লাগে না।',
          'মেমোইজেশন (`Vec<i64>` cache) ওভারল্যাপিং রিকার্সনকে এক্সপোনেনশিয়াল থেকে পলিনোমিয়াল গতিতে আনে।',
        ],
      },
    },
    topics: [
      {
        id: 'rust-ch15-t1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Call Stack Wind & Unwind Trace',
        englishParagraphs: [
          'Print entry and exit markers around a recursive sum call to visualize Last-In-First-Out stack frame unwinding directly.',
        ],
        banglaParagraphs: [
          'রিকার্সিভ ফাংশনে ঢোকা ও বের হওয়ার সময় প্রিন্ট করে স্ট্যাক ফ্রেম কীভাবে উল্টো ক্রমে ফিরে আসে তা দেখো।',
        ],
        memoryDiagram: 'enter 3 -> enter 2 -> enter 1 -> exit 1 -> exit 2 -> exit 3',
        code: `fn sum_up(n: i64) -> i64 {\n    if n <= 0 { return 0; }\n    println!("enter {}", n);\n    let sub = sum_up(n - 1);\n    let total = n + sub;\n    println!("exit {} => {}", n, total);\n    total\n}\nfn main() {\n    println!("ans={}", sum_up(3));\n}`,
        stdin: '',
        expectedOutput: 'enter 3\nenter 2\nenter 1\nexit 1 => 1\nexit 2 => 3\nexit 3 => 6\nans=6',
        lineByLine: [
          {"lineNumber":"Line 2","codeSnippet":"    if n <= 0 { return 0; }","whatItMeans":"Base case stops downward stack growth.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Infinite calls trigger stack overflow."},
          {"lineNumber":"Line 4","codeSnippet":"    let sub = sum_up(n - 1);","whatItMeans":"Suspends current frame until `n - 1` returns.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"No recursive breakdown happens."},
          {"lineNumber":"Line 7","codeSnippet":"    total","whatItMeans":"Implicit return expression hands result to parent frame.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Function returns unit `()` instead of `i64`."},
        ],
      },
      {
        id: 'rust-ch15-t2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Recursive Binary Search Over Borrowed Slice',
        englishParagraphs: [
          'Borrow an immutable `&[i64]` slice across recursive calls using `isize` bounds so subtracting past zero never underflows `usize`.',
        ],
        banglaParagraphs: [
          '`&[i64]` স্লাইস ও `isize` বাউন্ড ব্যবহার করে নিরাপদে রিকার্সিভ বাইনারি সার্চ লেখো।',
        ],
        memoryDiagram: 'bsearch(&arr, 0, n-1, target) -> depth O(log n)',
        code: `use std::io::{self, Read};\nfn bsearch(a: &[i64], lo: isize, hi: isize, target: i64) -> isize {\n    if lo > hi { return -1; }\n    let mid = lo + (hi - lo) / 2;\n    let v = a[mid as usize];\n    if v == target { return mid; }\n    if v < target { bsearch(a, mid + 1, hi, target) } else { bsearch(a, lo, mid - 1, target) }\n}\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n    let mut it = s.split_whitespace();\n    let n: usize = it.next().unwrap().parse().unwrap();\n    let a: Vec<i64> = (0..n).map(|_| it.next().unwrap().parse().unwrap()).collect();\n    let target: i64 = it.next().unwrap().parse().unwrap();\n    println!("{}", bsearch(&a, 0, n as isize - 1, target));\n}`,
        stdin: '5\n4 9 20 31 45\n20',
        expectedOutput: '2',
        lineByLine: [
          {"lineNumber":"Line 2","codeSnippet":"fn bsearch(a: &[i64], lo: isize, hi: isize, target: i64) -> isize {","whatItMeans":"Accepts borrowed slice so zero vectors are moved or copied.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Helper function does not exist."},
          {"lineNumber":"Line 7","codeSnippet":"    if v < target { bsearch(a, mid + 1, hi, target) } else { bsearch(a, lo, mid - 1, target) }","whatItMeans":"Safe `isize` handles `mid - 1 == -1` cleanly.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Binary search never recurses left or right."},
        ],
      },
      {
        id: 'rust-ch15-t3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Directory Menu Tree Depth & Leaf Counter',
        englishParagraphs: [
          'Model nested menus with an enum/struct tree and accumulate every full slash-delimited route recursively.',
        ],
        banglaParagraphs: [
          'নেস্টেড ডিরেক্টরি বা মেনু স্ট্রাক্ট ট্রাভার্স করে প্রতিটি পাতার পূর্ণ পাথ প্রিন্ট করো।',
        ],
        memoryDiagram: 'Node { name, children: Vec<Node> }',
        code: `struct Node { name: &'static str, children: Vec<Node> }\nfn collect(node: &Node, prefix: &str, out: &mut Vec<String>) {\n    let cur = if prefix.is_empty() { node.name.to_string() } else { format!("{}/{}", prefix, node.name) };\n    if node.children.is_empty() { out.push(cur); return; }\n    for ch in &node.children { collect(ch, &cur, out); }\n}\nfn main() {\n    let root = Node { name: "root", children: vec![\n        Node { name: "src", children: vec![Node { name: "main.rs", children: vec![] }] },\n        Node { name: "Cargo.toml", children: vec![] },\n    ]};\n    let mut out = Vec::new();\n    collect(&root, "", &mut out);\n    println!("{}", out.join("\\n"));\n}`,
        stdin: '',
        expectedOutput: 'root/src/main.rs\nroot/Cargo.toml',
        lineByLine: [
          {"lineNumber":"Line 4","codeSnippet":"    if node.children.is_empty() { out.push(cur); return; }","whatItMeans":"Leaf base case pushes final path into caller output buffer.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Leaf paths are discarded."},
          {"lineNumber":"Line 5","codeSnippet":"    for ch in &node.children { collect(ch, &cur, out); }","whatItMeans":"Iterates child references without taking ownership.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Subfolders are skipped."},
        ],
      },
      {
        id: 'rust-ch15-t4',
        badge: 'Example 4: Bug Trap vs. CP/Production Pattern',
        title: 'Memoized Fibonacci Caching vs Exponential Tree',
        englishParagraphs: [
          'Pass `&mut [i64]` initialized with `-1` down the call stack so overlapping Fibonacci subproblems resolve in linear time.',
        ],
        banglaParagraphs: [
          '`vec![-1; n + 1]` মিউটেবল স্লাইস পাস করে মেমোইজড ফিবোনাচ্চি `O(n)` সময়ে হিসাব করো।',
        ],
        memoryDiagram: 'memo[k] != -1 -> immediate O(1) cache hit',
        code: `use std::io::{self, Read};\nfn fib(k: usize, memo: &mut [i64]) -> i64 {\n    if k <= 1 { return k as i64; }\n    if memo[k] != -1 { return memo[k]; }\n    memo[k] = fib(k - 1, memo) + fib(k - 2, memo);\n    memo[k]\n}\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n    let n: usize = s.trim().parse().unwrap();\n    let mut memo = vec![-1i64; n + 1];\n    println!("{}", fib(n, &mut memo));\n}`,
        stdin: '40',
        expectedOutput: '102334155',
        lineByLine: [
          {"lineNumber":"Line 4","codeSnippet":"    if memo[k] != -1 { return memo[k]; }","whatItMeans":"Short-circuits redundant subtrees in O(1).","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Complexity blows up to O(2^n)."},
          {"lineNumber":"Line 12","codeSnippet":"    let mut memo = vec![-1i64; n + 1];","whatItMeans":"Uses 64-bit cache so large Fibonacci numbers fit safely.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"No cache storage exists."},
        ],
      },
    ],
    lineByLineAnatomy: [
      {"lineNumber":"Line 1","codeSnippet":"fn sum_up(n: i64) -> i64 {","whatItMeans":"Recursive signature returning 64-bit integer.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Function undefined."},
      {"lineNumber":"Line 2","codeSnippet":"    if n <= 0 { return 0; }","whatItMeans":"Terminates recursion when `n` hits 0.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Stack overflow panic."},
      {"lineNumber":"Line 4","codeSnippet":"    let sub = sum_up(n - 1);","whatItMeans":"Delegates `n - 1` sum to child frame.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Missing recursive step."},
      {"lineNumber":"Line 7","codeSnippet":"    total","whatItMeans":"Returns `n + sub` back up stack.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Return type mismatch."},
    ],
    dryRunTable: [
      { step: 1, state: 'sum_up(3)', memoryOrStack: '[f(3)]', note: 'Prints enter 3, suspends for f(2)' },
      { step: 2, state: 'sum_up(2)', memoryOrStack: '[f(3), f(2)]', note: 'Prints enter 2, suspends for f(1)' },
      { step: 3, state: 'sum_up(0)', memoryOrStack: '[f(3), f(2), f(1), f(0)]', note: 'Returns 0 at base case' },
      { step: 4, state: 'Unwind', memoryOrStack: '[]', note: 'Prints exit 1=>1, 2=>3, 3=>6' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: Underflowing Unsigned `usize` on `mid - 1`',
        brokenCode: 'fn bs(a: &[i64], lo: usize, hi: usize, t: i64) { bs(a, lo, mid - 1, t); }',
        fixedCode: 'fn bs(a: &[i64], lo: isize, hi: isize, t: i64) -> isize { /* safe when mid == 0 */ }',
        whyItBreaks: 'If target is smaller than `a[0]`, `0usize - 1` panics immediately with subtraction underflow.',
      },
      {
        title: 'Trap 2: Forgetting `.pop()` After Backtracking Push',
        brokenCode: 'cur.push(a[i]); dfs(i + 1, cur);',
        fixedCode: 'cur.push(a[i]); dfs(i + 1, cur); cur.pop();',
        whyItBreaks: 'Without `.pop()`, choices from skipped branches stay stuck inside `cur`.',
      },
      {
        title: 'Trap 3: Missing Base Case or Non-Shrinking Argument',
        brokenCode: 'fn f(n: i64) -> i64 { f(n) + 1 }',
        fixedCode: 'fn f(n: i64) -> i64 { if n <= 0 { 0 } else { f(n - 1) + 1 } }',
        whyItBreaks: 'Calling `f(n)` identically exhausts the thread stack and crashes.',
      },
    ],
    practiceSheet: [
      {
        id: 'rust-ch15-p1',
        difficulty: 'Easy',
        title: 'Fast Modular Exponentiation',
        prompt: 'Compute `a^b mod 1000000007` recursively in `O(log b)` time using `u64`.',
        banglaHint: 'b জোড় হলে `half * half % MOD`, বিজোড় হলে আরও একটি `a` গুণ করো।',
        starterCode: `use std::io::{self, Read};\nconst MOD: u64 = 1_000_000_007;\nfn mod_pow(a: u64, b: u64) -> u64 {\n    if b == 0 { return 1; }\n    let h = mod_pow(a, b / 2);\n    let mut ans = (h * h) % MOD;\n    if b % 2 == 1 { ans = (ans * (a % MOD)) % MOD; }\n    ans\n}\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n    let mut it = s.split_whitespace();\n    let a: u64 = it.next().unwrap().parse().unwrap();\n    let b: u64 = it.next().unwrap().parse().unwrap();\n    println!("{}", mod_pow(a, b));\n}`,
        sampleStdin: '2 10',
        expectedOutput: '1024',
      },
      {
        id: 'rust-ch15-p2',
        difficulty: 'Easy',
        title: 'Recursive Palindrome Check',
        prompt: 'Check recursively whether a word is a palindrome (`YES` or `NO`).',
        banglaHint: '`b[l] != b[r]` হলে `false`, আর `l >= r` হলে `true` রিটার্ন করো।',
        starterCode: `use std::io::{self, Read};\nfn is_pal(b: &[u8], l: usize, r: usize) -> bool {\n    if l >= r { return true; }\n    if b[l] != b[r] { return false; }\n    is_pal(b, l + 1, r - 1)\n}\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n    let b = s.trim().as_bytes();\n    let ok = b.is_empty() || is_pal(b, 0, b.len() - 1);\n    println!("{}", if ok { "YES" } else { "NO" });\n}`,
        sampleStdin: 'madam',
        expectedOutput: 'YES',
      },
      {
        id: 'rust-ch15-p3',
        difficulty: 'Medium',
        title: 'Balanced Parentheses Generator',
        prompt: 'Print all valid `n` pairs of parentheses in lexicographical order.',
        banglaHint: '`open < n` হলে \'(\' যোগ করো এবং `close < open` হলে \')\' যোগ করে ফিরে এসে `.pop()` করো।',
        starterCode: `use std::io::{self, Read};\nfn gen(n: usize, open: usize, close: usize, cur: &mut String, out: &mut Vec<String>) {\n    if cur.len() == 2 * n { out.push(cur.clone()); return; }\n    if open < n { cur.push('('); gen(n, open + 1, close, cur, out); cur.pop(); }\n    if close < open { cur.push(')'); gen(n, open, close + 1, cur, out); cur.pop(); }\n}\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n    let n: usize = s.trim().parse().unwrap();\n    let (mut cur, mut out) = (String::new(), Vec::new());\n    gen(n, 0, 0, &mut cur, &mut out);\n    println!("{}", out.join("\\n"));\n}`,
        sampleStdin: '2',
        expectedOutput: '(())\n()()',
      },
      {
        id: 'rust-ch15-p4',
        difficulty: 'Medium',
        title: 'Memoized Subset Sum Count',
        prompt: 'Given `n`, `k`, and `n` positive integers, count subsets summing to `k`.',
        banglaHint: '2D `memo[i][rem]` টেবিল ব্যবহার করে প্রতিটি ইনডেক্সে নেওয়া এবং না-নেওয়ার যোগফল রাখো।',
        starterCode: `use std::io::{self, Read};\nfn ways(i: usize, rem: usize, a: &[usize], memo: &mut Vec<Vec<i64>>) -> i64 {\n    if rem == 0 { return 1; }\n    if i == a.len() { return 0; }\n    if memo[i][rem] != -1 { return memo[i][rem]; }\n    let mut ans = ways(i + 1, rem, a, memo);\n    if a[i] <= rem { ans += ways(i + 1, rem - a[i], a, memo); }\n    memo[i][rem] = ans;\n    ans\n}\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n    let mut it = s.split_whitespace();\n    let n: usize = it.next().unwrap().parse().unwrap();\n    let k: usize = it.next().unwrap().parse().unwrap();\n    let a: Vec<usize> = (0..n).map(|_| it.next().unwrap().parse().unwrap()).collect();\n    let mut memo = vec![vec![-1i64; k + 1]; n];\n    println!("{}", ways(0, k, &a, &mut memo));\n}`,
        sampleStdin: '4 5\n1 2 3 4',
        expectedOutput: '2',
      },
      {
        id: 'rust-ch15-p5',
        difficulty: 'Hard',
        title: 'N-Queens Solutions Counter',
        prompt: 'Count valid arrangements of `n` non-attacking queens on an `n x n` chessboard.',
        banglaHint: '`col`, `d1`, `d2` তিনটি বুলিয়ান ভেক্টর `&mut` হিসেবে পাস করে ব্যাকট্র্যাক করো।',
        starterCode: `use std::io::{self, Read};\nfn solve(r: usize, n: usize, col: &mut [bool], d1: &mut [bool], d2: &mut [bool], ways: &mut usize) {\n    if r == n { *ways += 1; return; }\n    for c in 0..n {\n        let k1 = r + n - c;\n        let k2 = r + c;\n        if col[c] || d1[k1] || d2[k2] { continue; }\n        col[c] = true; d1[k1] = true; d2[k2] = true;\n        solve(r + 1, n, col, d1, d2, ways);\n        col[c] = false; d1[k1] = false; d2[k2] = false;\n    }\n}\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n    let n: usize = s.trim().parse().unwrap();\n    let (mut col, mut d1, mut d2) = (vec![false; n], vec![false; 2 * n], vec![false; 2 * n]);\n    let mut ways = 0;\n    solve(0, n, &mut col, &mut d1, &mut d2, &mut ways);\n    println!("{}", ways);\n}`,
        sampleStdin: '4',
        expectedOutput: '2',
      },
    ],
    miniBuild: {
      title: 'Milestone Merger 3: String Palindrome & Unique Subset Sum Counter',
      description: 'Combine Phase 3 vectors, string cleaning, two-pointer/recursive palindrome verification, and sorted duplicate-skipping subset recursion.',
      banglaGoal: 'ফেজ ৩-এর স্ট্রিং, ভেক্টর, সর্টিং ও রিকার্সন মিলিয়ে প্যালিনড্রোম এবং ইউনিক সাবসেট কাউন্টার তৈরি করো।',
      combinesChapters: "Ch 11, 12, 13, 14, 15",
      starterCode: `use std::io::{self, Read};\nfn is_pal(b: &[u8], l: usize, r: usize) -> bool {\n    if l >= r { return true; }\n    b[l] == b[r] && is_pal(b, l + 1, r - 1)\n}\nfn count_unique(i: usize, rem: i64, a: &[i64], ans: &mut usize) {\n    if rem == 0 { *ans += 1; return; }\n    if rem < 0 || i == a.len() { return; }\n    count_unique(i + 1, rem - a[i], a, ans);\n    let mut nxt = i + 1;\n    while nxt < a.len() && a[nxt] == a[i] { nxt += 1; }\n    count_unique(nxt, rem, a, ans);\n}\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n    let mut lines = s.lines();\n    let raw_word = lines.next().unwrap_or("");\n    let clean: String = raw_word.chars().filter(|c| c.is_ascii_alphanumeric()).map(|c| c.to_ascii_lowercase()).collect();\n    let mut it = lines.next().unwrap().split_whitespace();\n    let _n: usize = it.next().unwrap().parse().unwrap();\n    let target: i64 = it.next().unwrap().parse().unwrap();\n    let mut a: Vec<i64> = lines.next().unwrap().split_whitespace().map(|x| x.parse().unwrap()).collect();\n    a.sort();\n    let pal = !clean.is_empty() && is_pal(clean.as_bytes(), 0, clean.len() - 1);\n    let mut ways = 0;\n    count_unique(0, target, &a, &mut ways);\n    println!("{} {}", if pal { "PAL" } else { "NOT_PAL" }, ways);\n}`,
      sampleStdin: 'RaceCar!\n5 6\n1 2 3 4 5',
      expectedOutput: 'PAL 3',
    },
    starterCode: `use std::io::{self, Read};\nfn is_pal(b: &[u8], l: usize, r: usize) -> bool {\n    if l >= r { return true; }\n    b[l] == b[r] && is_pal(b, l + 1, r - 1)\n}\nfn count_unique(i: usize, rem: i64, a: &[i64], ans: &mut usize) {\n    if rem == 0 { *ans += 1; return; }\n    if rem < 0 || i == a.len() { return; }\n    count_unique(i + 1, rem - a[i], a, ans);\n    let mut nxt = i + 1;\n    while nxt < a.len() && a[nxt] == a[i] { nxt += 1; }\n    count_unique(nxt, rem, a, ans);\n}\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_to_string(&mut s).unwrap();\n    let mut lines = s.lines();\n    let raw_word = lines.next().unwrap_or("");\n    let clean: String = raw_word.chars().filter(|c| c.is_ascii_alphanumeric()).map(|c| c.to_ascii_lowercase()).collect();\n    let mut it = lines.next().unwrap().split_whitespace();\n    let _n: usize = it.next().unwrap().parse().unwrap();\n    let target: i64 = it.next().unwrap().parse().unwrap();\n    let mut a: Vec<i64> = lines.next().unwrap().split_whitespace().map(|x| x.parse().unwrap()).collect();\n    a.sort();\n    let pal = !clean.is_empty() && is_pal(clean.as_bytes(), 0, clean.len() - 1);\n    let mut ways = 0;\n    count_unique(0, target, &a, &mut ways);\n    println!("{} {}", if pal { "PAL" } else { "NOT_PAL" }, ways);\n}`,
    sampleStdin: 'RaceCar!\n5 6\n1 2 3 4 5',
    expectedSampleOutput: 'PAL 3',
    testCases: [
      { id: 'rust15-t1', input: 'RaceCar!\n5 6\n1 2 3 4 5', expectedOutput: 'PAL 3' },
      { id: 'rust15-t2', input: 'Hello\n4 5\n1 1 3 4', expectedOutput: 'NOT_PAL 2', isHidden: true },
    ],
  },
};
