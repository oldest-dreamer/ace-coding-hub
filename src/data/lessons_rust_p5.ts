import type { AtomicLessonOverride } from './atomicLessonTypes';

export const LESSONS_RUST_P5: Record<number, AtomicLessonOverride> = {
  21: {
    chapterNumber: 21,
    title: 'Rust Chapter 21: Sorting, partition_point & Binary Search on Answer',
    banglaTitle: 'Rust অধ্যায় ২১: সর্টিং, partition_point ও বাইনারি সার্চ অন আনসার',
    subtitle: 'Master slice::sort_unstable, partition_point lower/upper bounds, and overflow-safe Binary Search on Answer.',
    zeroIntuition: {
      plainEnglishStory:
        'Rust slices provide sort_unstable (pattern-defeating quicksort, zero extra memory) and partition_point(|&x| x < target) to locate exact lowerBound and upperBound indices in O(log n) without off-by-one bugs.\n\nFor optimization problems over a monotonic space [lo, hi], Binary Search on Answer tests each midpoint mid = lo + (hi - lo) / 2 using an O(n) slice predicate to converge in O(n log MaxVal) time.',
      asciiFlowchart: `  slice.partition_point(|&v| v < 5)  ---> first index where v >= 5
  slice.partition_point(|&v| v <= 5) ---> first index where v > 5
  Binary Search on Answer: lo + (hi - lo) / 2  (prevents integer overflow)`,
      pseudocode: [
        '1. SORT Vec with sort_unstable() or sort_unstable_by_key()',
        '2. COMPUTE lower = a.partition_point(|&v| v < x) and upper = a.partition_point(|&v| v <= x)',
        '3. DEFINE monotonic slice predicate can_ship(w: &[i64], days: i64, cap: i64) -> bool',
        '4. LOOP while lo <= hi storing best valid answer before adjusting bounds',
      ],
      banglaZeroToHero: {
        analogyTitle: 'partition_point ও বাইনারি সার্চ অন আনসার',
        explanation:
          'সাজানো তালিকায় কোনো উপাদান বা তার রেঞ্জ খুঁজতে Rust-এর slice::partition_point() একটি দারুণ নিরাপদ অস্ত্র! সাধারণ binary_search যেখানে ডুপ্লিকেট থাকলে যেকোনো ইনডেক্স দেয়, সেখানে a.partition_point(|&v| v < x) সবসময় প্রথম >= x ইনডেক্স (lower_bound) দেয় এবং |&v| v <= x দেয় upper_bound! এর ফলে বিয়োগ করলেই O(log n) সময়ে সংখ্যা গণনা হয়ে যায়। আর যখন আমাদের কোনো প্রশ্নের উত্তর বের করতে হয়—যেমন D দিনে সব প্যাকেজ পাঠাতে ট্রাকের সর্বনিম্ন ক্যাপাসিটি কত লাগবে—তখন [lo, hi] রেঞ্জে Binary Search on Answer চালানো হয়। Rust-এ unsigned usize নিয়ে সাবধান থাকবে: hi যদি usize হয় এবং mid = 0 থেকে hi = mid - 1 করতে যাও, তবে প্যানিক হবে! তাই গণনার রেঞ্জে সবসময় signed i64 ব্যবহার করা নিরাপদ। আর ডেটা সর্ট করার সময় sort_unstable() সাধারণ sort()-এর চেয়ে দ্রুত ও কম মেমোরি খরচ করে।',
        everydayExample: 'দাঁড়িপাল্লায় সঠিক ওজন মাপা: মাঝারি বাটখারা রেখে ভারী না হালকা দেখে পরের অর্ধেক বেছে নেওয়া।',
        keyTakeaways: [
          'lower_bound = a.partition_point(|&v| v < x), upper_bound = a.partition_point(|&v| v <= x)।',
          'usize বিয়োগে আন্ডারফ্লো প্যানিক এড়াতে বাইনারি সার্চ ভ্যারিয়েবলে i64 ব্যবহার করো।',
          'sort_unstable() হলো প্রিমিটিভ সংখ্যার জন্য দ্রুততম ইন-প্লেস সর্টিং।',
        ],
      },
    },
    topics: [
      {
        id: 'rust-ch-21-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'partition_point Lower/Upper Bound Frequency',
        englishParagraphs: [
          'sort_unstable orders integers in place, and partition_point isolates exact duplicate boundaries cleanly.',
        ],
        banglaParagraphs: [
          'sort_unstable দিয়ে সর্ট করে partition_point দিয়ে শুরুর ইনডেক্স ও ফ্রিকোয়েন্সি বের করো।',
        ],
        memoryDiagram: `[2, 5, 5, 5, 9] -> pp(<5)=1, pp(<=5)=4 -> count=3`,
        code: `fn main() {
    let mut a = vec![9, 5, 2, 5, 5];
    a.sort_unstable();
    let lo = a.partition_point(|&v| v < 5);
    let hi = a.partition_point(|&v| v <= 5);
    println!("{} {}", lo, hi - lo);
}`,
        stdin: '',
        expectedOutput: '1 3',
        lineByLine: [
          {
            lineNumber: 'Line 4',
            codeSnippet: 'let lo = a.partition_point(|&v| v < 5);',
            whatItMeans: 'Finds first index where predicate v < 5 becomes false (i.e. >= 5).',
            whyItIsThere: 'Provides exact lower_bound without manual index loop.',
            ifDeletedError: 'lo boundary missing.',
          },
          {
            lineNumber: 'Line 5',
            codeSnippet: 'let hi = a.partition_point(|&v| v <= 5);',
            whatItMeans: 'Finds first index strictly > 5.',
            whyItIsThere: 'hi - lo yields duplicate count in O(log n).',
            ifDeletedError: 'Cannot measure frequency.',
          },
        ],
      },
      {
        id: 'rust-ch-21-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Minimum Capacity to Ship Packages Within D Days',
        englishParagraphs: [
          'Binary search capacity across i64 bounds [max(w), sum(w)] using a borrowed slice predicate.',
        ],
        banglaParagraphs: [
          '&[i64] স্লাইস নিয়ে সর্বোচ্চ ওজন থেকে মোট ওজনের মধ্যে সর্বনিম্ন ক্যাপাসিটি খুঁজো।',
        ],
        memoryDiagram: `lo=5, hi=15 -> ans=6`,
        code: `use std::io::{self, Read};

fn can_ship(w: &[i64], days: i64, cap: i64) -> bool {
    let (mut used, mut cur) = (1_i64, 0_i64);
    for &x in w {
        if cur + x > cap { used += 1; cur = 0; }
        cur += x;
    }
    used <= days
}

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let mut it = s.split_whitespace().map(|v| v.parse::<i64>().unwrap());
    let n = it.next().unwrap() as usize;
    let d = it.next().unwrap();
    let w: Vec<i64> = it.take(n).collect();
    let mut lo = *w.iter().max().unwrap();
    let mut hi: i64 = w.iter().sum();
    let mut ans = hi;
    while lo <= hi {
        let mid = lo + (hi - lo) / 2;
        if can_ship(&w, d, mid) { ans = mid; hi = mid - 1; } else { lo = mid + 1; }
    }
    println!("{}", ans);
}`,
        stdin: '5 3\n1 2 3 4 5',
        expectedOutput: '6',
        lineByLine: [
          {
            lineNumber: 'Line 23',
            codeSnippet: 'let mid = lo + (hi - lo) / 2;',
            whatItMeans: 'Avoids signed i64 addition overflow.',
            whyItIsThere: 'Safe in Rust debug mode which panics on overflow.',
            ifDeletedError: 'Search midpoint missing.',
          },
        ],
      },
      {
        id: 'rust-ch-21-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Greedy Interval Scheduling After End-Time Sort',
        englishParagraphs: [
          'Sort interval tuples by (end, start) using sort_unstable_by_key to maximize mutually disjoint bookings.',
        ],
        banglaParagraphs: [
          'sort_unstable_by_key দিয়ে শেষের সময় অনুযায়ী সর্ট করে সর্বাধিক ইভেন্ট বেছে নাও।',
        ],
        memoryDiagram: `sort_unstable_by_key(|&(s, e)| (e, s))`,
        code: `use std::io::{self, Read};

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let mut it = s.split_whitespace().map(|v| v.parse::<i64>().unwrap());
    let n = it.next().unwrap() as usize;
    let mut iv: Vec<(i64, i64)> = (0..n).map(|_| (it.next().unwrap(), it.next().unwrap())).collect();
    iv.sort_unstable_by_key(|&(a, b)| (b, a));
    let (mut last, mut cnt) = (i64::MIN, 0_i64);
    for (st, en) in iv {
        if st >= last { cnt += 1; last = en; }
    }
    println!("{}", cnt);
}`,
        stdin: '4\n1 5\n2 3\n3 6\n5 8',
        expectedOutput: '3',
        lineByLine: [
          {
            lineNumber: 'Line 9',
            codeSnippet: 'iv.sort_unstable_by_key(|&(a, b)| (b, a));',
            whatItMeans: 'Sorts intervals by end time ascending, breaking ties by start.',
            whyItIsThere: 'Greedy earliest-finish maximizes non-overlapping count.',
            ifDeletedError: 'Arbitrary input order undercounts valid events.',
          },
        ],
      },
      {
        id: 'rust-ch-21-topic-4',
        badge: 'Example 4: Bug Trap vs. Production Pattern',
        title: 'usize Underflow Panic vs. Signed i64 Bounds',
        englishParagraphs: [
          'Doing hi = mid - 1 when mid == 0 panics on usize! Use i64 bounds for lo <= hi binary searches.',
        ],
        banglaParagraphs: [
          'usize টাইপে mid = 0 হলে mid - 1 করলে Rust প্যানিক করে; তাই বাইনারি সার্চে i64 রেঞ্জ নিরাপদ।',
        ],
        memoryDiagram: `0_usize - 1 -> PANIC! | 0_i64 - 1 -> -1_i64 -> loop exits cleanly`,
        code: `use std::io::{self, Read};

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let n: i64 = s.trim().parse().unwrap();
    let (mut lo, mut hi, mut ans) = (0_i64, n.min(2_000_000_000), 0_i64);
    while lo <= hi {
        let m = lo + (hi - lo) / 2;
        if m * m <= n { ans = m; lo = m + 1; } else { hi = m - 1; }
    }
    println!("{}", ans);
}`,
        stdin: '50',
        expectedOutput: '7',
        lineByLine: [
          {
            lineNumber: 'Line 7',
            codeSnippet: 'let (mut lo, mut hi, mut ans) = (0_i64, n.min(2_000_000_000), 0_i64);',
            whatItMeans: 'Uses signed i64 and caps square-root search upper bound.',
            whyItIsThere: 'Prevents both usize subtraction panic and m*m overflow panic.',
            ifDeletedError: 'Large n causes arithmetic overflow panic.',
          },
        ],
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 2',
        codeSnippet: 'let mut a = vec![9, 5, 2, 5, 5];',
        whatItMeans: 'Creates mutable Vec on heap.',
        whyItIsThere: 'In-place sorting requires mutable slice access.',
        ifDeletedError: 'a is undefined.',
      },
      {
        lineNumber: 'Line 3',
        codeSnippet: 'a.sort_unstable();',
        whatItMeans: 'Sorts elements ascending using fast pattern-defeating quicksort.',
        whyItIsThere: 'partition_point requires data partitioned by predicate.',
        ifDeletedError: 'Unsorted slice yields invalid partition index.',
      },
      {
        lineNumber: 'Line 4',
        codeSnippet: 'let lo = a.partition_point(|&v| v < 5);',
        whatItMeans: 'Finds first index where predicate v < 5 becomes false (i.e. >= 5).',
        whyItIsThere: 'Provides exact lower_bound without manual index loop.',
        ifDeletedError: 'lo boundary missing.',
      },
      {
        lineNumber: 'Line 5',
        codeSnippet: 'let hi = a.partition_point(|&v| v <= 5);',
        whatItMeans: 'Finds first index strictly > 5.',
        whyItIsThere: 'hi - lo yields duplicate count in O(log n).',
        ifDeletedError: 'Cannot measure frequency.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'lo=5, hi=15, mid=10', memoryOrStack: 'can_ship(10)=true', note: 'ans=10, hi=9' },
      { step: 2, state: 'lo=5, hi=9, mid=7', memoryOrStack: 'can_ship(7)=true', note: 'ans=7, hi=6' },
      { step: 3, state: 'lo=5, hi=6, mid=5', memoryOrStack: 'can_ship(5)=false', note: 'lo=6' },
      { step: 4, state: 'lo=6, hi=6, mid=6', memoryOrStack: 'can_ship(6)=true', note: 'ans=6, hi=5 -> exit' },
    ],
    harryBugTraps: [
      {
        title: 'Using usize for hi = mid - 1 When mid Can Reach 0',
        brokenCode: `let (mut lo, mut hi): (usize, usize) = (0, n); ... hi = mid - 1;`,
        fixedCode: `let (mut lo, mut hi): (i64, i64) = (0, n as i64); ... hi = mid - 1;`,
        whyItBreaks: 'Subtracting 1 from 0_usize panics with attempt to subtract with overflow.',
      },
      {
        title: 'Assuming binary_search(&x) Returns First Duplicate',
        brokenCode: `let idx = a.binary_search(&5).unwrap();`,
        fixedCode: `let idx = a.partition_point(|&v| v < 5);`,
        whyItBreaks: 'Std binary_search may return any matching index among duplicates.',
      },
      {
        title: 'Calling partition_point Before Sorting the Slice',
        brokenCode: `let p = unsorted.partition_point(|&v| v < x);`,
        fixedCode: `unsorted.sort_unstable(); let p = unsorted.partition_point(|&v| v < x);`,
        whyItBreaks: 'Slice must be partitioned true..true followed by false..false.',
      },
    ],
    practiceSheet: [
      {
        id: 'rust-ch-21-p1',
        difficulty: 'Easy',
        title: 'First Index & Count Query',
        prompt: 'Read n, x, and n integers; sort and print first index and count (-1 0 if absent).',
        banglaHint: 'ইঙ্গিত: partition_point(|&v| v < x) ও partition_point(|&v| v <= x) ব্যবহার করো।',
        starterCode: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    let mut it = s.split_whitespace().map(|v| v.parse::<i64>().unwrap());\n    let (n, x) = (it.next().unwrap() as usize, it.next().unwrap());\n    let mut a: Vec<i64> = it.take(n).collect();\n    a.sort_unstable();\n    let lo = a.partition_point(|&v| v < x);\n    let hi = a.partition_point(|&v| v <= x);\n    if lo == hi { println!("-1 0"); } else { println!("{} {}", lo, hi - lo); }\n}`,
        sampleStdin: '6 4\n7 4 1 4 9 4',
        expectedOutput: '1 3',
      },
      {
        id: 'rust-ch-21-p2',
        difficulty: 'Easy',
        title: 'Floor Integer Square Root',
        prompt: 'Compute floor(sqrt(n)) with i64 binary search.',
        banglaHint: 'ইঙ্গিত: m * m <= n শর্তে lo ও hi আপডেট করো।',
        starterCode: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    let n: i64 = s.trim().parse().unwrap();\n    let (mut lo, mut hi, mut ans) = (0_i64, n.min(2_000_000_000), 0_i64);\n    while lo <= hi { let m = lo + (hi - lo) / 2; if m * m <= n { ans = m; lo = m + 1; } else { hi = m - 1; } }\n    println!("{}", ans);\n}`,
        sampleStdin: '101',
        expectedOutput: '10',
      },
      {
        id: 'rust-ch-21-p3',
        difficulty: 'Medium',
        title: 'Koko Eating Bananas Speed Search',
        prompt: 'Given n piles and h hours, find minimum eating speed k using (x + k - 1) / k.',
        banglaHint: 'ইঙ্গিত: বাইনারি সার্চে (x + k - 1) / k যোগফল h-এর নিচে থাকে কি না দেখো।',
        starterCode: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    let mut it = s.split_whitespace().map(|v| v.parse::<i64>().unwrap());\n    let (n, h) = (it.next().unwrap() as usize, it.next().unwrap());\n    let p: Vec<i64> = it.take(n).collect();\n    let (mut lo, mut hi) = (1_i64, *p.iter().max().unwrap());\n    let mut ans = hi;\n    while lo <= hi {\n        let k = lo + (hi - lo) / 2;\n        let hrs: i64 = p.iter().map(|&x| (x + k - 1) / k).sum();\n        if hrs <= h { ans = k; hi = k - 1; } else { lo = k + 1; }\n    }\n    println!("{}", ans);\n}`,
        sampleStdin: '4 8\n3 6 7 11',
        expectedOutput: '4',
      },
      {
        id: 'rust-ch-21-p4',
        difficulty: 'Medium',
        title: 'Max Non-Overlapping Events',
        prompt: 'Read n [start, end] pairs and print maximum non-overlapping intervals.',
        banglaHint: 'ইঙ্গিত: sort_unstable_by_key(|&(s, e)| e) দিয়ে সর্ট করো।',
        starterCode: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    let mut it = s.split_whitespace().map(|v| v.parse::<i64>().unwrap());\n    let n = it.next().unwrap() as usize;\n    let mut iv: Vec<(i64, i64)> = (0..n).map(|_| (it.next().unwrap(), it.next().unwrap())).collect();\n    iv.sort_unstable_by_key(|&(_, e)| e);\n    let (mut cur, mut ans) = (i64::MIN, 0_i64);\n    for (st, en) in iv { if st >= cur { ans += 1; cur = en; } }\n    println!("{}", ans);\n}`,
        sampleStdin: '4\n1 4\n2 3\n3 5\n4 6',
        expectedOutput: '2',
      },
      {
        id: 'rust-ch-21-p5',
        difficulty: 'Hard',
        title: 'Aggressive Cows Max Min Distance',
        prompt: 'Given n stall coordinates and c cows, find largest minimum distance between any two cows.',
        banglaHint: 'ইঙ্গিত: x.sort_unstable() করে সম্ভাব্য দূরত্বের ওপর বাইনারি সার্চ চালাও।',
        starterCode: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    let mut it = s.split_whitespace().map(|v| v.parse::<i64>().unwrap());\n    let (n, c) = (it.next().unwrap() as usize, it.next().unwrap());\n    let mut x: Vec<i64> = it.take(n).collect();\n    x.sort_unstable();\n    let (mut lo, mut hi, mut ans) = (1_i64, x[n - 1] - x[0], 0_i64);\n    while lo <= hi {\n        let mid = lo + (hi - lo) / 2;\n        let (mut placed, mut last) = (1_i64, x[0]);\n        for &pos in &x[1..] { if pos - last >= mid { placed += 1; last = pos; } }\n        if placed >= c { ans = mid; lo = mid + 1; } else { hi = mid - 1; }\n    }\n    println!("{}", ans);\n}`,
        sampleStdin: '5 3\n1 2 8 4 9',
        expectedOutput: '3',
      },
    ],
    miniBuild: {
      title: 'Binary Search on Answer Capacity Solver',
      description: 'Use signed i64 Binary Search on Answer with a zero-allocation slice predicate to minimize shipping capacity.',
      banglaGoal: 'Binary Search on Answer দিয়ে সর্বনিম্ন শিপিং ক্যাপাসিটি নির্ণয় করা।',
      combinesChapters: 'Ch 11, 20, 21',
      starterCode: `use std::io::{self, Read};\nfn can_ship(w: &[i64], days: i64, cap: i64) -> bool {\n    let (mut used, mut cur) = (1_i64, 0_i64);\n    for &x in w { if cur + x > cap { used += 1; cur = 0; } cur += x; }\n    used <= days\n}\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    let mut it = s.split_whitespace().map(|v| v.parse::<i64>().unwrap());\n    let n = match it.next() { Some(v) => v as usize, None => return };\n    let d = it.next().unwrap();\n    let w: Vec<i64> = it.take(n).collect();\n    let (mut lo, mut hi) = (*w.iter().max().unwrap(), w.iter().sum::<i64>());\n    let mut ans = hi;\n    while lo <= hi { let mid = lo + (hi - lo) / 2; if can_ship(&w, d, mid) { ans = mid; hi = mid - 1; } else { lo = mid + 1; } }\n    println!("{}", ans);\n}`,
      sampleStdin: '5 3\n1 2 3 4 5',
      expectedOutput: '6',
    },
    starterCode: `use std::io::{self, Read};\nfn can_ship(w: &[i64], days: i64, cap: i64) -> bool {\n    let (mut used, mut cur) = (1_i64, 0_i64);\n    for &x in w { if cur + x > cap { used += 1; cur = 0; } cur += x; }\n    used <= days\n}\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    let mut it = s.split_whitespace().map(|v| v.parse::<i64>().unwrap());\n    let n = match it.next() { Some(v) => v as usize, None => return };\n    let d = it.next().unwrap();\n    let w: Vec<i64> = it.take(n).collect();\n    let (mut lo, mut hi) = (*w.iter().max().unwrap(), w.iter().sum::<i64>());\n    let mut ans = hi;\n    while lo <= hi { let mid = lo + (hi - lo) / 2; if can_ship(&w, d, mid) { ans = mid; hi = mid - 1; } else { lo = mid + 1; } }\n    println!("{}", ans);\n}`,
    sampleStdin: '5 3\n1 2 3 4 5',
    expectedSampleOutput: '6',
    testCases: [
      { id: 'rust21-t1', input: '5 3\n1 2 3 4 5', expectedOutput: '6' },
      { id: 'rust21-t2', input: '4 2\n10 10 10 10', expectedOutput: '20', isHidden: true },
    ],
  },
  22: {
    chapterNumber: 22,
    title: 'Rust Chapter 22: Hashing, HashMap/HashSet & Sliding Window Frequency',
    banglaTitle: 'Rust অধ্যায় ২২: হ্যাশিং, HashMap/HashSet ও স্লাইডিং উইন্ডো ফ্রিকোয়েন্সি',
    subtitle: 'Solve O(n) Two-Sum, longest unique substring, and exact-K subarray sums using SipHash-backed HashMap/HashSet and sliding windows.',
    zeroIntuition: {
      plainEnglishStory:
        'Rust’s std::collections::{HashMap, HashSet} uses SipHash 1-3 by default, making it immune to hash-flooding DoS attacks out of the box while maintaining O(1) expected lookups. Pairing a prefix sum HashMap<i64, i64> with cnt.entry(pref).or_insert(0) solves exact-K subarray counts—including negative elements—in one linear pass.\n\nFor UTF-8 safe sliding windows over ASCII strings, converting with s.as_bytes() gives O(1) byte indexing [L..R] without O(n) char iteration.',
      asciiFlowchart: `  pref += x ---> ans += cnt.get(&(pref - k)).copied().unwrap_or(0)
       |
       +--> *cnt.entry(pref).or_insert(0) += 1
       |
  Window [L..R] on s.as_bytes(): last[b] >= L -> L = last[b] + 1`,
      pseudocode: [
        '1. SEED HashMap::from([(0_i64, 1_i64)]) for empty prefix sum',
        '2. INCREMENT running pref += x across elements',
        '3. ADD cnt.get(&(pref - k)).copied().unwrap_or(0) to match count',
        '4. RECORD *cnt.entry(pref).or_insert(0) += 1 without double hashing',
      ],
      banglaZeroToHero: {
        analogyTitle: 'SipHash-সুরক্ষিত হ্যাশ ম্যাপ ও বাইট স্লাইডিং উইন্ডো',
        explanation:
          'C++-এর unordered_map যেখানে হ্যাশ-হ্যাকিংয়ে ধীর হয়ে যায়, Rust-এর HashMap ডিফল্টভাবেই SipHash ব্যবহার করে বলে অ্যান্টি-হ্যাশ টেস্টেও O(1) গতি ধরে রাখে। এই ক্ষমতার সাথে Prefix Sum জুড়ে দিলে নেগেটিভ সংখ্যা থাকলেও O(n) সময়ে ঠিক K যোগফলের সাব-অ্যারে বের হয়ে আসে। আর স্ট্রিংয়ে পুনরাবৃত্তিহীন দীর্ঘতম অংশ খুঁজতে s.as_bytes() ব্যবহার করা খুব জরুরি; কারণ Rust-এ String সরাসরি [i] ইনডেক্সিং করতে দেয় না (UTF-8 নিরাপত্তার জন্য)। বাইট অ্যারেতে [i64; 256] বা [isize; 256] টেবিল রাখলে কোনো হিপ অ্যালোকেশন ছাড়াই O(n) সময়ে স্লাইডিং উইন্ডো চলে। এছাড়া HashMap::entry().or_insert(0) একবারেই চাবি খুঁজে মান আপডেট করে বলে কোড ছোট ও দ্রুত হয়।',
        everydayExample: 'নিরাপদ লকার কক্ষ: চাবি (SipHash) এমনভাবে তৈরি যে কেউ জাল চাবি দিয়ে লকারে জ্যাম লাগাতে পারে না।',
        keyTakeaways: [
          'Rust String-এ সরাসরি s[i] চলে না; দ্রুত স্লাইডিং উইন্ডোতে s.as_bytes() ব্যবহার করো।',
          'Prefix হ্যাশে শুরুতে cnt.insert(0, 1) দিয়ে তবেই লুপ শুরু করবে।',
          'f64-এর বদলে পূর্ণসংখ্যা বা স্ট্রিং কী ব্যবহার করলে Eq/Hash স্বয়ংক্রিয়ভাবে সমর্থিত হয়।',
        ],
      },
    },
    topics: [
      {
        id: 'rust-ch-22-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'O(n) Two-Sum Using HashMap',
        englishParagraphs: [
          'Look up (target - x) in HashMap before inserting x -> index to find the matching pair in O(n).',
        ],
        banglaParagraphs: [
          'HashMap-এ আগে দেখা মানের ইনডেক্স রেখে O(n) সময়ে Two-Sum সমাধান।',
        ],
        memoryDiagram: `seen={2:0} -> x=7 checks seen.get(&(9-7)) -> prints "0 1"`,
        code: `use std::collections::HashMap;

fn main() {
    let a = [2_i64, 7, 11, 15];
    let target = 9_i64;
    let mut seen: HashMap<i64, usize> = HashMap::new();
    for (i, &x) in a.iter().enumerate() {
        if let Some(&j) = seen.get(&(target - x)) {
            println!("{} {}", j, i);
            return;
        }
        seen.insert(x, i);
    }
}`,
        stdin: '',
        expectedOutput: '0 1',
        lineByLine: [
          {
            lineNumber: 'Line 8',
            codeSnippet: 'if let Some(&j) = seen.get(&(target - x)) {',
            whatItMeans: 'Pattern-matches Option<&usize> returned by HashMap lookup.',
            whyItIsThere: 'Guarantees safe null-free handling in O(1) expected time.',
            ifDeletedError: 'Cannot find matching earlier index.',
          },
        ],
      },
      {
        id: 'rust-ch-22-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Subarray Sums Equals K Using HashMap::entry',
        englishParagraphs: [
          'Seed cnt.insert(0, 1) and add prior occurrences of (pref - k) in a single pass.',
        ],
        banglaParagraphs: [
          'cnt.insert(0, 1) সেট করে নেগেটিভ সংখ্যা থাকলেও K-যোগফল সাব-অ্যারে গোনো।',
        ],
        memoryDiagram: `cnt={0:1} -> pref=1,3,2,3,5 -> ans=3`,
        code: `use std::collections::HashMap;
use std::io::{self, Read};

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let mut it = s.split_whitespace().map(|v| v.parse::<i64>().unwrap());
    let n = match it.next() { Some(v) => v as usize, None => return };
    let k = it.next().unwrap();
    let mut cnt: HashMap<i64, i64> = HashMap::from([(0, 1)]);
    let (mut pref, mut ans) = (0_i64, 0_i64);
    for x in it.take(n) {
        pref += x;
        ans += cnt.get(&(pref - k)).copied().unwrap_or(0);
        *cnt.entry(pref).or_insert(0) += 1;
    }
    println!("{}", ans);
}`,
        stdin: '5 3\n1 2 -1 1 2',
        expectedOutput: '3',
        lineByLine: [
          {
            lineNumber: 'Line 10',
            codeSnippet: 'let mut cnt: HashMap<i64, i64> = HashMap::from([(0, 1)]);',
            whatItMeans: 'Initializes hash map with prefix sum 0 count = 1.',
            whyItIsThere: 'Counts subarrays beginning at index 0.',
            ifDeletedError: 'Prefixes starting at index 0 are missed.',
          },
        ],
      },
      {
        id: 'rust-ch-22-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Longest Substring Without Repeating Characters',
        englishParagraphs: [
          'Index s.as_bytes() with a stack-allocated [isize; 256] table for zero-allocation O(n) sliding window.',
        ],
        banglaParagraphs: [
          's.as_bytes() ও স্ট্যাক অ্যারে [isize; 256] দিয়ে জিরো-অ্যালোকেশন স্লাইডিং উইন্ডো।',
        ],
        memoryDiagram: `last: [isize; 256] = [-1; 256] -> L = L.max((last[b] + 1) as usize)`,
        code: `use std::io::{self, Read};

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let bytes = s.trim().as_bytes();
    let mut last = [-1_isize; 256];
    let (mut l, mut best) = (0_usize, 0_usize);
    for (r, &b) in bytes.iter().enumerate() {
        let p = last[b as usize];
        if p >= l as isize { l = (p + 1) as usize; }
        last[b as usize] = r as isize;
        best = best.max(r - l + 1);
    }
    println!("{}", best);
}`,
        stdin: 'abcabcbb',
        expectedOutput: '3',
        lineByLine: [
          {
            lineNumber: 'Line 6',
            codeSnippet: 'let bytes = s.trim().as_bytes();',
            whatItMeans: 'Exposes O(1)-indexable &[u8] slice over trimmed input.',
            whyItIsThere: 'Avoids UTF-8 character scanning overhead.',
            ifDeletedError: 'Cannot index characters in O(1) directly.',
          },
        ],
      },
      {
        id: 'rust-ch-22-topic-4',
        badge: 'Example 4: Bug Trap vs. Production Pattern',
        title: 'Pre-Sizing With HashMap::with_capacity Against Rehash Spikes',
        englishParagraphs: [
          'Use HashMap::with_capacity(n) or HashSet::with_capacity(n) on tight contest bounds to skip intermediate table resizing.',
        ],
        banglaParagraphs: [
          'HashMap::with_capacity(n) ব্যবহার করলে লুপের ভেতর বারবার রি-হ্যাশিং বন্ধ হয়ে গতি বাড়ে।',
        ],
        memoryDiagram: `with_capacity(n) -> single allocation up front -> zero rehash stalls`,
        code: `use std::collections::HashSet;
use std::io::{self, Read};

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let mut it = s.split_whitespace().map(|v| v.parse::<i64>().unwrap());
    let n = it.next().unwrap() as usize;
    let mut set = HashSet::with_capacity(n);
    for x in it.take(n) { set.insert(x); }
    println!("{}", set.len());
}`,
        stdin: '6\n10 20 10 30 20 40',
        expectedOutput: '4',
        lineByLine: [
          {
            lineNumber: 'Line 9',
            codeSnippet: 'let mut set = HashSet::with_capacity(n);',
            whatItMeans: 'Reserves enough hash buckets upfront for n elements.',
            whyItIsThere: 'Eliminates repeated doubling reallocations.',
            ifDeletedError: 'Default capacity 0 triggers several rehashes.',
          },
        ],
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 6',
        codeSnippet: 'let mut seen: HashMap<i64, usize> = HashMap::new();',
        whatItMeans: 'Creates SipHash-protected map of value -> index.',
        whyItIsThere: 'Delivers O(1) expected lookups immune to hash collisions.',
        ifDeletedError: 'seen variable undefined.',
      },
      {
        lineNumber: 'Line 8',
        codeSnippet: 'if let Some(&j) = seen.get(&(target - x)) {',
        whatItMeans: 'Pattern-matches Option<&usize> returned by HashMap lookup.',
        whyItIsThere: 'Guarantees safe null-free handling in O(1) expected time.',
        ifDeletedError: 'Cannot find matching earlier index.',
      },
      {
        lineNumber: 'Line 10',
        codeSnippet: 'return;',
        whatItMeans: 'Exits main early once match is printed.',
        whyItIsThere: 'Avoids continuing unnecessary loop iterations.',
        ifDeletedError: 'May print duplicate pairs if multiple exist.',
      },
      {
        lineNumber: 'Line 12',
        codeSnippet: 'seen.insert(x, i);',
        whatItMeans: 'Records current element after checking complement.',
        whyItIsThere: 'Prevents an index from pairing with itself.',
        ifDeletedError: 'Subsequent iterations cannot match x.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'cnt = {0: 1}', memoryOrStack: 'pref=0, ans=0', note: 'Seed zero prefix' },
      { step: 2, state: 'x=1 -> pref=1', memoryOrStack: 'get(-2) -> None', note: 'cnt={0:1, 1:1}' },
      { step: 3, state: 'x=2 -> pref=3', memoryOrStack: 'get(0) -> Some(1)', note: 'ans=1, cnt[3]=1' },
      { step: 4, state: 'x=-1,1,2 -> pref=3,4,6', memoryOrStack: 'hits at 0 and 3', note: 'Total ans=3' },
    ],
    harryBugTraps: [
      {
        title: 'Indexing UTF-8 String Directly With s[i]',
        brokenCode: `let ch = s[r];`,
        fixedCode: `let ch = s.as_bytes()[r];`,
        whyItBreaks: 'Rust forbids O(1) indexing on UTF-8 String; byte slices must be used explicitly.',
      },
      {
        title: 'Forgetting L Clamp on Sliding Window Duplicate Jump',
        brokenCode: `l = (last[b] + 1) as usize;`,
        fixedCode: `if last[b] >= l as isize { l = (last[b] + 1) as usize; }`,
        whyItBreaks: 'Uninitialized -1 or old indices before L pull L backward.',
      },
      {
        title: 'Inserting Current Value Before Checking Two-Sum Complement',
        brokenCode: `seen.insert(x, i); if let Some(&j) = seen.get(&(target - x)) ...`,
        fixedCode: `if let Some(&j) = seen.get(&(target - x)) ... seen.insert(x, i);`,
        whyItBreaks: 'Element pairs with itself when target == 2 * x.',
      },
    ],
    practiceSheet: [
      {
        id: 'rust-ch-22-p1',
        difficulty: 'Easy',
        title: 'Distinct Count via HashSet',
        prompt: 'Read n and n integers; print count of distinct values.',
        banglaHint: 'ইঙ্গিত: HashSet এ ইনসার্ট করে len() প্রিন্ট করো।',
        starterCode: `use std::collections::HashSet;\nuse std::io::{self, Read};\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    let mut it = s.split_whitespace().map(|v| v.parse::<i64>().unwrap());\n    let n = it.next().unwrap() as usize;\n    let set: HashSet<i64> = it.take(n).collect();\n    println!("{}", set.len());\n}`,
        sampleStdin: '6\n10 20 10 30 20 40',
        expectedOutput: '4',
      },
      {
        id: 'rust-ch-22-p2',
        difficulty: 'Easy',
        title: 'Two-Sum Indices Lookup',
        prompt: 'Read n, target, and n integers; print first 0-based indices i j summing to target.',
        banglaHint: 'ইঙ্গিত: seen.get(&(t - x)) দিয়ে আগে দেখা ইনডেক্স খুঁজো।',
        starterCode: `use std::collections::HashMap;\nuse std::io::{self, Read};\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    let mut it = s.split_whitespace().map(|v| v.parse::<i64>().unwrap());\n    let (n, t) = (it.next().unwrap() as usize, it.next().unwrap());\n    let mut seen: HashMap<i64, usize> = HashMap::with_capacity(n);\n    for (i, x) in it.take(n).enumerate() {\n        if let Some(&j) = seen.get(&(t - x)) { println!("{} {}", j, i); return; }\n        seen.insert(x, i);\n    }\n}`,
        sampleStdin: '4 9\n2 7 11 15',
        expectedOutput: '0 1',
      },
      {
        id: 'rust-ch-22-p3',
        difficulty: 'Medium',
        title: 'Longest Unique Substring Length',
        prompt: 'Read a token and print length of longest substring without repeating characters.',
        banglaHint: 'ইঙ্গিত: [isize; 256] এ শেষ বাইট ইনডেক্স রেখে স্লাইডিং উইন্ডো চালাও।',
        starterCode: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    let b = s.trim().as_bytes();\n    let mut last = [-1_isize; 256]; let (mut l, mut best) = (0_usize, 0_usize);\n    for (r, &ch) in b.iter().enumerate() {\n        let p = last[ch as usize];\n        if p >= l as isize { l = (p + 1) as usize; }\n        last[ch as usize] = r as isize; best = best.max(r - l + 1);\n    }\n    println!("{}", best);\n}`,
        sampleStdin: 'pwwkew',
        expectedOutput: '3',
      },
      {
        id: 'rust-ch-22-p4',
        difficulty: 'Medium',
        title: 'At-Most-K Distinct Subarray Length',
        prompt: 'Read n, k, and n integers; print longest subarray with at most k distinct values.',
        banglaHint: 'ইঙ্গিত: HashMap এর len() > k হলে বাম দিক থেকে কমিয়ে ০ হলে remove() করো।',
        starterCode: `use std::collections::HashMap;\nuse std::io::{self, Read};\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    let mut it = s.split_whitespace().map(|v| v.parse::<i64>().unwrap());\n    let (n, k) = (it.next().unwrap() as usize, it.next().unwrap() as usize);\n    let a: Vec<i64> = it.take(n).collect();\n    let mut freq: HashMap<i64, usize> = HashMap::new();\n    let (mut l, mut best) = (0_usize, 0_usize);\n    for r in 0..n {\n        *freq.entry(a[r]).or_insert(0) += 1;\n        while freq.len() > k {\n            if let Some(c) = freq.get_mut(&a[l]) { *c -= 1; if *c == 0 { freq.remove(&a[l]); } }\n            l += 1;\n        }\n        best = best.max(r - l + 1);\n    }\n    println!("{}", best);\n}`,
        sampleStdin: '6 2\n1 2 1 2 3 3',
        expectedOutput: '4',
      },
      {
        id: 'rust-ch-22-p5',
        difficulty: 'Hard',
        title: 'Subarray Sums Equals K Counter',
        prompt: 'Read n, k, and n integers; print number of contiguous subarrays summing to k.',
        banglaHint: 'ইঙ্গিত: HashMap::from([(0, 1)]) রেখে pref - k কতবার এসেছে যোগ করো।',
        starterCode: `use std::collections::HashMap;\nuse std::io::{self, Read};\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    let mut it = s.split_whitespace().map(|v| v.parse::<i64>().unwrap());\n    let (n, k) = (it.next().unwrap() as usize, it.next().unwrap());\n    let mut cnt: HashMap<i64, i64> = HashMap::from([(0, 1)]);\n    let (mut pref, mut ans) = (0_i64, 0_i64);\n    for x in it.take(n) { pref += x; ans += cnt.get(&(pref - k)).copied().unwrap_or(0); *cnt.entry(pref).or_insert(0) += 1; }\n    println!("{}", ans);\n}`,
        sampleStdin: '5 3\n1 2 -1 1 2',
        expectedOutput: '3',
      },
    ],
    miniBuild: {
      title: 'O(n) Subarray Sum = K Hash Engine',
      description: 'Use prefix sums with HashMap::entry to count exact-K subarrays cleanly in linear time.',
      banglaGoal: 'Prefix Sum এবং HashMap দিয়ে O(n) সময়ে K-যোগফল সাব-অ্যারে গণনা করা।',
      combinesChapters: 'Ch 13, 20, 22',
      starterCode: `use std::collections::HashMap;\nuse std::io::{self, Read};\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    let mut it = s.split_whitespace().map(|v| v.parse::<i64>().unwrap());\n    let n = match it.next() { Some(v) => v as usize, None => return };\n    let k = it.next().unwrap();\n    let mut cnt: HashMap<i64, i64> = HashMap::from([(0, 1)]);\n    let (mut pref, mut ans) = (0_i64, 0_i64);\n    for x in it.take(n) { pref += x; ans += cnt.get(&(pref - k)).copied().unwrap_or(0); *cnt.entry(pref).or_insert(0) += 1; }\n    println!("{}", ans);\n}`,
      sampleStdin: '5 3\n1 2 -1 1 2',
      expectedOutput: '3',
    },
    starterCode: `use std::collections::HashMap;\nuse std::io::{self, Read};\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    let mut it = s.split_whitespace().map(|v| v.parse::<i64>().unwrap());\n    let n = match it.next() { Some(v) => v as usize, None => return };\n    let k = it.next().unwrap();\n    let mut cnt: HashMap<i64, i64> = HashMap::from([(0, 1)]);\n    let (mut pref, mut ans) = (0_i64, 0_i64);\n    for x in it.take(n) { pref += x; ans += cnt.get(&(pref - k)).copied().unwrap_or(0); *cnt.entry(pref).or_insert(0) += 1; }\n    println!("{}", ans);\n}`,
    sampleStdin: '5 3\n1 2 -1 1 2',
    expectedSampleOutput: '3',
    testCases: [
      { id: 'rust22-t1', input: '5 3\n1 2 -1 1 2', expectedOutput: '3' },
      { id: 'rust22-t2', input: '3 0\n0 0 0', expectedOutput: '6', isHidden: true },
    ],
  },

  23: {
    chapterNumber: 23,
    title: 'Rust Chapter 23 (2024): Vec Stacks, VecDeque Queues, Trees & BFS/DFS',
    banglaTitle: 'Rust অধ্যায় ২৩ (2024): Vec স্ট্যাক, VecDeque কিউ, ট্রি ও গ্রাফ BFS/DFS',
    subtitle: 'O(1) Vec stack push/pop, VecDeque::pop_front BFS shortest paths, monotonic stack NGE, and borrow-safe adjacency DFS.',
    zeroIntuition: {
      plainEnglishStory:
        'In Rust, a standard `Vec<T>` is an optimal O(1) LIFO Stack (`push` / `pop` returning `Option<T>`!), while FIFO Queues use `std::collections::VecDeque<T>` (`push_back` / `pop_front` in O(1)—avoiding `Vec::remove(0)` which shifts the entire buffer in O(n)!).\n\nNotice how `Option<T>` pattern matching (`while let Some(u) = q.pop_front()`) guarantees you NEVER pop an empty stack or queue cleanly at compile time, and storing `adj: Vec<Vec<usize>>` avoids unsafe self-referential parent pointers.',
      asciiFlowchart: `  Stack (Vec): st.push(x) / if let Some(top) = st.pop() { ... }
  Queue (VecDeque): q.push_back(start) / while let Some(u) = q.pop_front() { ... }`,
      pseudocode: [
        '1. USE Vec::push/pop for LIFO Stacks returning Option<T> safely',
        '2. USE std::collections::VecDeque::pop_front for O(1) BFS queues',
        '3. ASSIGN dist[v] = dist[u] + 1 BEFORE q.push_back(v) on neighbors',
        '4. ITERATE adj: &[Vec<usize>] using iterative Vec stack or helper fn dfs',
      ],
      banglaZeroToHero: {
        analogyTitle: 'Rust-এ Option-সেফ Vec স্ট্যাক, VecDeque কিউ ও গ্রাফ BFS/DFS',
        explanation:
          'Rust-এ স্ট্যাকের জন্য কোনো আলাদা স্ট্রাকচার লাগে না—সাধারণ `Vec<T>`-এর `push()` ও `pop()` শেষ প্রান্তে O(1) সময়ে কাজ করে, এবং `pop()` সরাসরি `Option<T>` রিটার্ন করায় খালি স্ট্যাক পড়লে ক্র্যাশ হওয়ার ভয় থাকে না (`while let Some(top) = st.pop()`)! অন্যদিকে কিউ (Queue)-র জন্য `Vec::remove(0)` লিখলে প্রতিবার বাকি সব উপাদান সরাতে O(n) সময় নষ্ট হয়; তাই `std::collections::VecDeque` ও `pop_front()` নিতে হয়। ট্রি বা গ্রাফের ক্ষেত্রে প্রতিটি নোডে কাঁচা পয়েন্টার না রেখে `Vec<Vec<usize>>` অ্যাডজাসেন্সি লিস্ট রাখলে Rust-এর Borrow Checker খুশি থাকে এবং কোড অত্যন্ত দ্রুত চলে! BFS-এ শর্টেস্ট দূরত্ব বের করতে `dist[v] == -1` দেখার সাথে সাথেই `dist[v] = dist[u] + 1` বসিয়ে তারপর `q.push_back(v)` করবে যাতে একই নোড দুবার কিউতে না ঢোকে!',
        everydayExample:
          'ফাঁকা বাক্স থেকে প্লেট তুলতে গিয়ে হাত না কেটে বরং "যদি ভেতরে কিছু থাকে (`Some(x)`)" তবেই তা বের করার Rust-এর প্রাকৃতিক সুরক্ষা নিয়ম!',
        keyTakeaways: [
          'FIFO কিউ-এর জন্য কখনো `vec.remove(0)` নয়, সর্বদা `VecDeque::pop_front()` ব্যবহার করো।',
          '`while let Some(u) = q.pop_front()` প্যাটার্ন খালি কিউ বা স্ট্যাকের বাগ নির্মূল করে।',
          'Rust-এ ট্রি ও গ্রাফ অ্যারে/ভেক্টর ইনডেক্স (`Vec<Vec<usize>>`) দিয়ে সাজালে লাইফটাইম ও বরো চেকার ঝামেলা থাকে না।',
        ],
      },
    },
    topics: [
      {
        id: 'rust-ch-23-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Balanced Brackets With Option-Safe Vec Stack',
        englishParagraphs: [
          'Matching `st.pop()` against expected opening delimiters yields clean, panic-free bracket checking in O(n).',
        ],
        banglaParagraphs: [
          '`Vec<char>` স্ট্যাকের `pop()` ও প্যাটার্ন ম্যাচিং দিয়ে ব্র্যাকেট ব্যালান্স যাচাই।',
        ],
        memoryDiagram: `"{[()]}" -> Vec push '{','[','(' -> match Some('(') on ')' -> st.is_empty() == true`,
        code: `use std::io::{self, Read};

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let mut st: Vec<char> = Vec::new();
    let mut ok = true;
    for c in s.trim().chars() {
        match c {
            '(' | '[' | '{' => st.push(c),
            ')' => if st.pop() != Some('(') { ok = false; break; },
            ']' => if st.pop() != Some('[') { ok = false; break; },
            '}' => if st.pop() != Some('{') { ok = false; break; },
            _ => {}
        }
    }
    println!("{}", if ok && st.is_empty() { "VALID" } else { "INVALID" });
}`,
        stdin: '{[()]}',
        expectedOutput: 'VALID',
        lineByLine: [
          { lineNumber: 'Line 11', codeSnippet: "')' => if st.pop() != Some('(') { ok = false; break; },", whatItMeans: 'Handles empty stack (None) and wrong opener in one comparison.', whyItIsThere: 'Option<char> avoids separate empty-check branching cleanly.', ifDeletedError: 'Unclosed closing parentheses pass wrongly.' },
        ],
      },
      {
        id: 'rust-ch-23-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Shortest-Path BFS Using VecDeque::pop_front()',
        englishParagraphs: [
          'Using `Vec<i64>` initialized to `-1` and `VecDeque::from([0])` computes single-source unweighted distances safely in O(V + E).',
        ],
        banglaParagraphs: [
          '`VecDeque` কিউ ও `Vec<Vec<usize>>` অ্যাডজাসেন্সি লিস্ট দিয়ে শর্টেস্ট পাথ BFS।',
        ],
        memoryDiagram: `0-1, 0-2, 1-3 -> dist=[0, 1, 1, 2]`,
        code: `use std::collections::VecDeque;
use std::io::{self, Read};

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let nums: Vec<usize> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();
    if nums.len() < 2 { return; }
    let (n, m) = (nums[0], nums[1]);
    let mut adj = vec![Vec::new(); n];
    for c in nums[2..2 + 2 * m].chunks_exact(2) {
        adj[c[0]].push(c[1]);
        adj[c[1]].push(c[0]);
    }
    let mut dist = vec![-1_i64; n];
    let mut q = VecDeque::from([0]);
    dist[0] = 0;
    while let Some(u) = q.pop_front() {
        for &v in &adj[u] {
            if dist[v] == -1 { dist[v] = dist[u] + 1; q.push_back(v); }
        }
    }
    let out: Vec<String> = dist.iter().map(|d| d.to_string()).collect();
    println!("{}", out.join(" "));
}`,
        stdin: '4 3\n0 1\n0 2\n1 3',
        expectedOutput: '0 1 1 2',
        lineByLine: [
          { lineNumber: 'Line 18', codeSnippet: 'while let Some(u) = q.pop_front() {', whatItMeans: 'Safely pops next queued vertex until queue empties.', whyItIsThere: 'VecDeque::pop_front runs in O(1) ring-buffer time.', ifDeletedError: 'BFS loop never runs.' },
        ],
      },
      {
        id: 'rust-ch-23-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Monotonic Stack Next Greater Element (Zero-Copy Slices)',
        englishParagraphs: [
          'Storing unresolved indices in `st: Vec<usize>` keeps the invariant monotonically non-increasing in O(n) total operations.',
        ],
        banglaParagraphs: [
          'মনোটনিক স্ট্যাকে `usize` ইনডেক্স রেখে O(n) সময়ে প্রতিটি উপাদানের ডানের বড় সংখ্যা নির্ণয়।',
        ],
        memoryDiagram: `[4, 5, 2, 25] -> [5, 25, 25, -1]`,
        code: `use std::io::{self, Read};

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let nums: Vec<i64> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();
    if nums.is_empty() { return; }
    let n = nums[0] as usize;
    let a = &nums[1..1 + n];
    let mut ans = vec![-1_i64; n];
    let mut st: Vec<usize> = Vec::new();
    for i in 0..n {
        while let Some(&top) = st.last() {
            if a[top] < a[i] { ans[top] = a[i]; st.pop(); } else { break; }
        }
        st.push(i);
    }
    let out: Vec<String> = ans.iter().map(|x| x.to_string()).collect();
    println!("{}", out.join(" "));
}`,
        stdin: '4\n4 5 2 25',
        expectedOutput: '5 25 25 -1',
        lineByLine: [
          { lineNumber: 'Line 13', codeSnippet: 'while let Some(&top) = st.last() {', whatItMeans: 'Peeks top index safely without popping prematurely.', whyItIsThere: 'Only pops if a[top] < a[i] holds.', ifDeletedError: 'Cannot inspect monotonic invariant.' },
        ],
      },
      {
        id: 'rust-ch-23-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Iterative DFS Connected Components (Zero Stack Overflow)',
        englishParagraphs: [
          'Explicit stack-based DFS avoids OS stack exhaustion on deep chains while keeping mutable `vis` and `st` borrows cleanly disjoint!',
        ],
        banglaParagraphs: [
          'ইটারেটিভ `Vec` স্ট্যাক দিয়ে গ্রাফের কানেক্টেড কম্পোনেন্ট গণনা যা বড় গ্রাফেও স্ট্যাক ওভারফ্লো করে না।',
        ],
        memoryDiagram: `5 nodes, edges=(0-1),(2-3) -> 3 components`,
        code: `use std::io::{self, Read};

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let nums: Vec<usize> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();
    if nums.len() < 2 { return; }
    let (n, m) = (nums[0], nums[1]);
    let mut adj = vec![Vec::new(); n];
    for c in nums[2..2 + 2 * m].chunks_exact(2) {
        adj[c[0]].push(c[1]);
        adj[c[1]].push(c[0]);
    }
    let mut vis = vec![false; n];
    let mut comps = 0;
    let mut st = Vec::new();
    for i in 0..n {
        if !vis[i] {
            comps += 1;
            vis[i] = true;
            st.push(i);
            while let Some(u) = st.pop() {
                for &v in &adj[u] {
                    if !vis[v] { vis[v] = true; st.push(v); }
                }
            }
        }
    }
    println!("{}", comps);
}`,
        stdin: '5 2\n0 1\n2 3',
        expectedOutput: '3',
        lineByLine: [
          { lineNumber: 'Line 24', codeSnippet: 'if !vis[v] { vis[v] = true; st.push(v); }', whatItMeans: 'Marks vertex visited on push to prevent re-visiting.', whyItIsThere: 'Preserves O(V + E) graph traversal speed.', ifDeletedError: 'Cycles bounce indefinitely.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 6', codeSnippet: 'let mut st: Vec<char> = Vec::new();', whatItMeans: 'Creates contiguous LIFO stack on heap.', whyItIsThere: 'Vec::push and Vec::pop operate in O(1) amortized.', ifDeletedError: 'st undefined.' },
      { lineNumber: 'Line 10', codeSnippet: "'(' | '[' | '{' => st.push(c),", whatItMeans: 'Matches any opening bracket and pushes onto stack.', whyItIsThere: 'Records pending delimiter close expectation.', ifDeletedError: 'Openers ignored.' },
      { lineNumber: 'Line 11', codeSnippet: "')' => if st.pop() != Some('(') { ok = false; break; },", whatItMeans: 'Pops Option<char> and compares against expected mate in one expression.', whyItIsThere: 'Both empty stack (None) and wrong opener fail neatly.', ifDeletedError: 'Parenthesis mismatches ignored.' },
      { lineNumber: 'Line 17', codeSnippet: 'println!("{}", if ok && st.is_empty() { "VALID" } else { "INVALID" });', whatItMeans: 'Verifies clean matches and zero remaining unclosed openers.', whyItIsThere: 'Catches trailing "((" reliably.', ifDeletedError: 'Prints nothing.' },
    ],
    dryRunTable: [
      { step: 1, state: 'Read "{[("', memoryOrStack: "st = ['{', '[', '(']", note: 'Openers pushed' },
      { step: 2, state: 'Match ")"', memoryOrStack: "st.pop() == Some('(')", note: "st = ['{', '[']" },
      { step: 3, state: 'Match "]}"', memoryOrStack: "pops '[' then '{'", note: 'st is empty' },
      { step: 4, state: 'Check ok && st.is_empty()', memoryOrStack: 'stdout = "VALID"', note: 'Balanced verified' },
    ],
    harryBugTraps: [
      {
        title: 'Using Vec::remove(0) as a Queue Instead of VecDeque::pop_front()',
        brokenCode: 'let mut q = vec![1, 2, 3]; let u = q.remove(0); // O(n) shift!',
        fixedCode: 'use std::collections::VecDeque;\nfn main() { let mut q = VecDeque::from([1, 2, 3]); println!("{:?}", q.pop_front()); }',
        whyItBreaks: 'Removing index 0 from Vec copies every subsequent element one slot left per dequeue.',
      },
      {
        title: 'Unwrapping st.pop() Without Matching Option<T>',
        brokenCode: 'let x = st.pop().unwrap(); // Panics on unmatched closing bracket!',
        fixedCode: 'fn main() { let mut st: Vec<i32> = Vec::new(); if let Some(v) = st.pop() { println!("{}", v); } else { println!("EMPTY"); } }',
        whyItBreaks: 'Calling .unwrap() on None panics and aborts the Rust process with exit code 101.',
      },
      {
        title: 'Marking Visited After pop_front() Instead of Before push_back()',
        brokenCode: 'while let Some(u) = q.pop_front() { vis[u] = true; ... }',
        fixedCode: 'fn main() { println!("Mark vis[v] = true BEFORE push_back(v)!"); }',
        whyItBreaks: 'Multiple edges reaching v enqueue v repeatedly before it is popped.',
      },
    ],
    practiceSheet: [
      {
        id: 'rust-ch-23-q1',
        difficulty: 'Easy',
        title: '1. Reverse Array via Vec Stack',
        prompt: 'Read n and n i64s; push onto Vec stack and pop to print reversed integers.',
        banglaHint: '`while let Some(x) = st.pop()` চালিয়ে সংখ্যাগুলো উল্টো ক্রমে প্রিন্ট করো।',
        starterCode: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    let nums: Vec<i64> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();\n    let n = nums[0] as usize; let mut st = nums[1..1 + n].to_vec(); let mut out = Vec::new();\n    while let Some(x) = st.pop() { out.push(x.to_string()); }\n    println!("{}", out.join(" "));\n}`,
        sampleStdin: '4\n10 20 30 40',
        expectedOutput: '40 30 20 10',
      },
      {
        id: 'rust-ch-23-q2',
        difficulty: 'Easy',
        title: '2. Circular Queue Survivor via VecDeque',
        prompt: 'Read n and k; rotate VecDeque(1..=n) k-1 times and drop k-th until 1 remains.',
        banglaHint: '`let front = q.pop_front().unwrap(); q.push_back(front);` দিয়ে ঘুরিয়ে দাও।',
        starterCode: `use std::collections::VecDeque;\nuse std::io::{self, Read};\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    let nums: Vec<usize> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();\n    let mut q: VecDeque<usize> = (1..=nums[0]).collect();\n    while q.len() > 1 { for _ in 1..nums[1] { if let Some(x) = q.pop_front() { q.push_back(x); } } q.pop_front(); }\n    println!("{}", q[0]);\n}`,
        sampleStdin: '5 2',
        expectedOutput: '3',
      },
      {
        id: 'rust-ch-23-q3',
        difficulty: 'Medium',
        title: '3. Next Greater Element via Monotonic Stack',
        prompt: 'Read n and array; output first greater element on right for each index or -1.',
        banglaHint: '`while let Some(&top) = st.last()` দিয়ে ছোট ইনডেক্সগুলো পপ করো।',
        starterCode: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    let nums: Vec<i64> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();\n    let n = nums[0] as usize; let a = &nums[1..1 + n]; let mut ans = vec![-1_i64; n]; let mut st: Vec<usize> = Vec::new();\n    for i in 0..n { while let Some(&t) = st.last() { if a[t] < a[i] { ans[t] = a[i]; st.pop(); } else { break; } } st.push(i); }\n    println!("{}", ans.iter().map(|x| x.to_string()).collect::<Vec<_>>().join(" "));\n}`,
        sampleStdin: '4\n4 5 2 25',
        expectedOutput: '5 25 25 -1',
      },
      {
        id: 'rust-ch-23-q4',
        difficulty: 'Medium',
        title: '4. Shortest Distance S to T via BFS',
        prompt: 'Read n, m, S, T and m edges; print shortest edge distance or -1.',
        banglaHint: '`S` থেকে BFS চালিয়ে `dist[T]` প্রিন্ট করো।',
        starterCode: `use std::collections::VecDeque;\nuse std::io::{self, Read};\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    let nums: Vec<usize> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();\n    let (n, m, src, dst) = (nums[0], nums[1], nums[2], nums[3]);\n    let mut adj = vec![Vec::new(); n];\n    for c in nums[4..4 + 2 * m].chunks_exact(2) { adj[c[0]].push(c[1]); adj[c[1]].push(c[0]); }\n    let mut dist = vec![-1_i64; n]; dist[src] = 0; let mut q = VecDeque::from([src]);\n    while let Some(u) = q.pop_front() { for &v in &adj[u] { if dist[v] == -1 { dist[v] = dist[u] + 1; q.push_back(v); } } }\n    println!("{}", dist[dst]);\n}`,
        sampleStdin: '5 4 0 4\n0 1\n1 2\n2 3\n3 4',
        expectedOutput: '4',
      },
      {
        id: 'rust-ch-23-q5',
        difficulty: 'Hard',
        title: '5. Tree Depth via BFS Level Sweep',
        prompt: 'Read n nodes (0..n-1) rooted at 0 and n-1 edges; print max distance from 0.',
        banglaHint: '`0` থেকে BFS চালিয়ে `dist.into_iter().max().unwrap()` বের করো।',
        starterCode: `use std::collections::VecDeque;\nuse std::io::{self, Read};\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    let nums: Vec<usize> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();\n    let n = nums[0]; let mut adj = vec![Vec::new(); n];\n    for c in nums[1..1 + 2 * (n - 1)].chunks_exact(2) { adj[c[0]].push(c[1]); adj[c[1]].push(c[0]); }\n    let mut dist = vec![-1_i64; n]; dist[0] = 0; let mut q = VecDeque::from([0]);\n    while let Some(u) = q.pop_front() { for &v in &adj[u] { if dist[v] == -1 { dist[v] = dist[u] + 1; q.push_back(v); } } }\n    println!("{}", dist.into_iter().max().unwrap_or(0));\n}`,
        sampleStdin: '5\n0 1\n0 2\n1 3\n3 4',
        expectedOutput: '3',
      },
    ],
    miniBuild: {
      title: 'Rust 2024 VecDeque Shortest-Path & Stack Engine',
      description: 'Processes balanced expressions and O(V + E) unweighted shortest paths cleanly with Option safety.',
      banglaGoal: 'Rust Vec স্ট্যাক ও VecDeque কিউ ব্যবহার করে ব্র্যাকেট যাচাই ও BFS শর্টেস্ট পাথ চালানো।',
      combinesChapters: 'Ch 1–23',
      starterCode: `use std::collections::VecDeque;\nuse std::io::{self, Read};\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    let nums: Vec<usize> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();\n    if nums.len() < 2 { return; }\n    let (n, m) = (nums[0], nums[1]); let mut adj = vec![Vec::new(); n];\n    for c in nums[2..2 + 2 * m].chunks_exact(2) { adj[c[0]].push(c[1]); adj[c[1]].push(c[0]); }\n    let mut dist = vec![-1_i64; n]; dist[0] = 0; let mut q = VecDeque::from([0]);\n    while let Some(u) = q.pop_front() { for &v in &adj[u] { if dist[v] == -1 { dist[v] = dist[u] + 1; q.push_back(v); } } }\n    println!("{}", dist.iter().map(|d| d.to_string()).collect::<Vec<_>>().join(" "));\n}`,
      sampleStdin: '4 3\n0 1\n0 2\n1 3',
      expectedOutput: '0 1 1 2',
    },
    starterCode: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    let mut st: Vec<char> = Vec::new(); let mut ok = true;\n    for c in s.trim().chars() {\n        match c {\n            '(' | '[' | '{' => st.push(c),\n            ')' => if st.pop() != Some('(') { ok = false; break; },\n            ']' => if st.pop() != Some('[') { ok = false; break; },\n            '}' => if st.pop() != Some('{') { ok = false; break; },\n            _ => {}\n        }\n    }\n    println!("{}", if ok && st.is_empty() { "VALID" } else { "INVALID" });\n}`,
    sampleStdin: '{[()]}',
    expectedSampleOutput: 'VALID',
    testCases: [
      { id: 'rust23-t1', input: '{[()]}', expectedOutput: 'VALID' },
      { id: 'rust23-t2', input: '([)]', expectedOutput: 'INVALID', isHidden: true },
    ],
  },

  24: {
    chapterNumber: 24,
    title: 'Rust Chapter 24 (2024): Result<T, E>, `?` Propagation, Fearless Concurrency & Modules',
    banglaTitle: 'Rust অধ্যায় ২৪ (2024): Result<T, E>, `?` প্রোপাগেশন, কনকারেন্সি ও মডিউল',
    subtitle: 'Exhaustive Result<T, E> and Option<T> error propagation via `?`, RAII Drop cleanup, scoped threads/atomics, and mod visibility.',
    zeroIntuition: {
      plainEnglishStory:
        'Rust has ZERO null pointers and ZERO hidden exceptions: recoverable errors are explicit values of `Result<T, E>`. Using the `?` operator forwards any `Err(e)` straight up to the caller in one character while automatically triggering `Drop` destructors on every local file handle or mutex guard!\n\nAnd Rust’s Send/Sync ownership rules deliver "Fearless Concurrency" at compile time—preventing data races before the binary even compiles, while `Arc<AtomicI64>` or `std::thread::scope` shares state safely across cores.',
      asciiFlowchart: `  fn run_line(line: &str) -> Result<i64, String>
     |-- a.parse::<i64>()?  --Err--> propagates immediately, Drop cleans resources
     +-- ok ---------------------> returns Ok(sum)`,
      pseudocode: [
        '1. RETURN Result<T, E> instead of .unwrap() in production helpers',
        '2. PROPAGATE errors cleanly with the `?` operator across Result functions',
        '3. LEVERAGE Drop trait RAII for automatic file/lock/transaction cleanup',
        '4. USE std::sync::atomic::AtomicI64 or scoped threads for race-free parallelism',
      ],
      banglaZeroToHero: {
        analogyTitle: 'Rust-এর `Result<T, E>`, `?` শর্টকাট ও ভয়হীন কনকারেন্সি (Fearless Concurrency)',
        explanation:
          'Rust ভাষায় `try/catch` বা `null` বলতে কিছু নেই! এর পরিবর্তে কোনো কাজ সফল হলে `Ok(val)` এবং ব্যর্থ হলে `Err(msg)` ফেরত আসে (`Result<T, E>`)। বড় প্রোগ্রামে বারবার `match` লিখতে না চাইলে শুধু স্টেটমেন্টের শেষে `?` বসালেই এরর ঘটলে সাথে সাথে ফাংশন থেকে `Err` ওপরের স্তরে চলে যায়—যাকে বলে `?` প্রোপাগেশন! তাছাড়া কোনো ভ্যারিয়েবলে `Drop` ট্রেইট ইমপ্লিমেন্ট করলে স্কোপ থেকে বেরোতেই বা এরর ফিরতেই সেটি নিজে থেকেই ফাইল বন্ধ বা রোলব্যাক করে ফেলে। আর মাল্টি-থ্রেড প্রোগ্রামিংয়ে Rust কম্পাইল সময়েই ডেটা রেস ধরে ফেলে বলে একে "Fearless Concurrency" বলে; শেয়ার করা কাউন্টারের জন্য `std::sync::atomic::AtomicI64` অথবা `Mutex<T>` সরাসরি ডেটাটিকে লকের ভেতর বন্দি করে রাখে যাতে লক না খুলে কেউ পড়তে না পারে!',
        everydayExample: 'কোনো চাবি (`Result`) ব্যর্থ হলে সাথে সাথে ওপরের অফিসারের কাছে রিপোর্ট (`?`) চলে যাওয়া আর `Mutex<Data>` মানে ডেটাকে সরাসরি তালাবদ্ধ সিন্দুকের ভেতরে রাখা!',
        keyTakeaways: [
          'প্রোডাকশনে `.unwrap()` নয়, `Result<T, E>` ও `?` অপারেটর অথবা `match` ব্যবহার করবে।',
          '`Drop` ট্রেইট যেকোনো স্ট্রাক্টের জন্য স্বয়ংক্রিয় RAII ক্লিনআপ ও রোলব্যাক দেয়।',
          'Rust কম্পাইলার `Send` ও `Sync` ট্রেইট যাচাই করে কম্পাইল করার আগেই থ্রেডের ডেটা রেস আটকে দেয়।',
        ],
      },
    },
    topics: [
      {
        id: 'rust-ch-24-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Propagating Result<i64, &\'static str> With the `?` Operator',
        englishParagraphs: [
          'Combining `.parse().map_err(...)` with `?` turns nested error checks into crisp linear pipelines that never panic on invalid input.',
        ],
        banglaParagraphs: [
          '`?` অপারেটর ও `Result<i64, &\'static str>` দিয়ে প্যানিক-মুক্ত সেফ ডিভিশন ফাংশন।',
        ],
        memoryDiagram: `safe_div("20", "4") -> Ok(5) | safe_div("20", "0") -> Err("ERR_DIV_ZERO")`,
        code: `use std::io::{self, Read};

fn safe_div(sa: &str, sb: &str) -> Result<i64, &'static str> {
    let a: i64 = sa.parse().map_err(|_| "ERR_NUMBER")?;
    let b: i64 = sb.parse().map_err(|_| "ERR_NUMBER")?;
    if b == 0 { return Err("ERR_DIV_ZERO"); }
    Ok(a / b)
}

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let p: Vec<&str> = s.split_whitespace().collect();
    if p.len() >= 2 {
        match safe_div(p[0], p[1]) {
            Ok(v) => println!("OK:{}", v),
            Err(e) => println!("{}", e),
        }
    }
}`,
        stdin: '20 4',
        expectedOutput: 'OK:5',
        lineByLine: [
          { lineNumber: 'Line 4', codeSnippet: 'let a: i64 = sa.parse().map_err(|_| "ERR_NUMBER")?;', whatItMeans: 'Parses string to i64, converts parse error, and propagates via ?.', whyItIsThere: 'Prevents process panic on malformed tokens.', ifDeletedError: 'Parse panic crashes binary.' },
        ],
      },
      {
        id: 'rust-ch-24-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Cursor-Based In-Memory BufRead Stream Parser',
        englishParagraphs: [
          'Wrapping input slices in `io::Cursor` + `BufRead::lines()` uses identical traits as real OS `File` handles cleanly inside unit tests and judges.',
        ],
        banglaParagraphs: [
          '`std::io::Cursor` এবং `BufRead::lines()` দিয়ে ফাইল স্ট্রিমের মতো লাইন-বাই-লাইন এরর-সেফ পার্সিং।',
        ],
        memoryDiagram: `Cursor(stdin).lines() -> split_whitespace -> Ok(a+b) | SKIP_INVALID`,
        code: `use std::io::{self, BufRead, Cursor, Read};

fn parse_pair(line: &str) -> Result<i64, ()> {
    let p: Vec<&str> = line.split_whitespace().collect();
    if p.len() < 2 { return Err(()); }
    let a: i64 = p[0].parse().map_err(|_| ())?;
    let b: i64 = p[1].parse().map_err(|_| ())?;
    Ok(a + b)
}

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    for line in Cursor::new(s).lines().map_while(Result::ok) {
        if line.trim().is_empty() { continue; }
        match parse_pair(&line) {
            Ok(sum) => println!("SUM={}", sum),
            Err(()) => println!("SKIP_INVALID"),
        }
    }
}`,
        stdin: '4 6\nbad_line\n10 5',
        expectedOutput: 'SUM=10\nSKIP_INVALID\nSUM=15',
        lineByLine: [
          { lineNumber: 'Line 14', codeSnippet: 'for line in Cursor::new(s).lines().map_while(Result::ok) {', whatItMeans: 'Streams lines through standard BufRead iterator safely.', whyItIsThere: 'Matches disk File I/O patterns cleanly.', ifDeletedError: 'Lines never scanned.' },
        ],
      },
      {
        id: 'rust-ch-24-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Scoped Threads + Race-Free AtomicI64 Aggregation',
        englishParagraphs: [
          '`std::thread::scope` spawns real OS threads that borrow local slices safely AND join automatically at scope end, accumulating totals into an `AtomicI64`.',
        ],
        banglaParagraphs: [
          '`std::thread::scope` ও `AtomicI64` দিয়ে কোনো লিক বা ডেটা রেস ছাড়াই একাধিক থ্রেডে কাজ ভাগ করে চালানো।',
        ],
        memoryDiagram: `AtomicI64(0) -> scoped thread joins automatically -> prints race-free total`,
        code: `use std::io::{self, Read};
use std::sync::atomic::{AtomicI64, Ordering};
use std::thread;

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let nums: Vec<i64> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();
    if nums.is_empty() { return; }
    let n = nums[0] as usize;
    let jobs = &nums[1..1 + n];
    let total = AtomicI64::new(0);
    thread::scope(|sc| {
        for chunk in jobs.chunks(2) {
            sc.spawn(|| {
                let local: i64 = chunk.iter().sum();
                total.fetch_add(local, Ordering::Relaxed);
            });
        }
    });
    println!("{}", total.load(Ordering::SeqCst));
}`,
        stdin: '3\n10 20 30',
        expectedOutput: '60',
        lineByLine: [
          { lineNumber: 'Line 13', codeSnippet: 'thread::scope(|sc| {', whatItMeans: 'Joins all spawned threads deterministically before scope exits.', whyItIsThere: 'Allows borrowing local slices without Arc cloning.', ifDeletedError: 'Compile error: borrowed data escapes thread.' },
        ],
      },
      {
        id: 'rust-ch-24-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'RAII Drop Trait Guard (Automatic Rollback Cleanup)',
        englishParagraphs: [
          'Implementing `Drop` guarantees cleanup runs whenever a guard leaves scope—whether cleanly or via an early `?` error exit!',
        ],
        banglaParagraphs: [
          '`Drop` ট্রেইট ইমপ্লিমেন্ট করলে আর্লি রিটার্ন বা এরর ঘটলেও অটোমেটিক রোলব্যাক সম্পন্ন হয়।',
        ],
        memoryDiagram: `Tx { committed: false } leaves scope -> Drop prints "DB:ROLLBACK"`,
        code: `use std::io::{self, Read};

struct Tx { committed: bool }
impl Tx {
    fn commit(&mut self) { self.committed = true; println!("DB:COMMIT"); }
}
impl Drop for Tx {
    fn drop(&mut self) { if !self.committed { println!("DB:ROLLBACK"); } }
}

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let mut tx = Tx { committed: false };
    if s.trim() == "ok" { tx.commit(); }
}`,
        stdin: 'fail',
        expectedOutput: 'DB:ROLLBACK',
        lineByLine: [
          { lineNumber: 'Line 8', codeSnippet: 'impl Drop for Tx {', whatItMeans: 'Deterministic destructor invoked when tx goes out of scope.', whyItIsThere: 'Guarantees zero leaked transactions on early returns.', ifDeletedError: 'Failed transactions stay silent.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 3', codeSnippet: "fn safe_div(sa: &str, sb: &str) -> Result<i64, &'static str> {", whatItMeans: 'Encapsulates fallible parsing and division inside Result.', whyItIsThere: 'Forces caller to inspect Err cases at compile time.', ifDeletedError: 'safe_div missing.' },
      { lineNumber: 'Line 4', codeSnippet: 'let a: i64 = sa.parse().map_err(|_| "ERR_NUMBER")?;', whatItMeans: 'Parses i64 safely propagating error on failure.', whyItIsThere: 'Eliminates panic-inducing unwrap() calls.', ifDeletedError: 'Cannot use a in division.' },
      { lineNumber: 'Line 6', codeSnippet: 'if b == 0 { return Err("ERR_DIV_ZERO"); }', whatItMeans: 'Explicit zero-divisor guard before dividing.', whyItIsThere: 'Avoids runtime integer division panic.', ifDeletedError: 'Zero divisor panics process.' },
      { lineNumber: 'Line 15', codeSnippet: 'match safe_div(p[0], p[1]) {', whatItMeans: 'Exhaustively handles Ok(v) and Err(e).', whyItIsThere: 'Rust requires checking both outcomes.', ifDeletedError: 'Result ignored without output.' },
    ],
    dryRunTable: [
      { step: 1, state: 'Call safe_div("20", "4")', memoryOrStack: 'a=20, b=4 parsed cleanly', note: 'No ? early exit' },
      { step: 2, state: 'Check b == 0', memoryOrStack: '4 != 0 -> Ok(5)', note: 'Returns Ok variant' },
      { step: 3, state: 'If p[1] == "0"', memoryOrStack: 'Returns Err("ERR_DIV_ZERO")', note: 'Zero panic' },
      { step: 4, state: 'match branch prints', memoryOrStack: 'stdout="OK:5"', note: 'Clean exit 0' },
    ],
    harryBugTraps: [
      {
        title: 'Using .unwrap() Directly on Untrusted User Input',
        brokenCode: 'let x: i64 = user_str.parse().unwrap(); // Panics with exit 101!',
        fixedCode: 'fn main() { match "abc".parse::<i64>() { Ok(v) => println!("{}", v), Err(_) => println!("ERR_NUMBER") } }',
        whyItBreaks: 'unwrap() converts recoverable parse failures into process crashes; use Result / ? / unwrap_or.',
      },
      {
        title: 'Holding a MutexGuard Across Long Sleeps/I/O in Unscoped Block',
        brokenCode: 'let guard = m.lock().unwrap(); /* stays locked past needed lines! */',
        fixedCode: 'use std::sync::Mutex;\nfn main() { let m = Mutex::new(0); { let mut g = m.lock().unwrap(); *g += 1; } println!("{}", *m.lock().unwrap()); }',
        whyItBreaks: 'MutexGuard only unlocks when dropped at block end; wrap critical sections in inner { ... } scopes.',
      },
      {
        title: 'Attempting Integer Division by Zero (Instant Panic in Rust)',
        brokenCode: 'let q = 10 / 0; // Runtime panic even without exceptions!',
        fixedCode: 'fn main() { println!("{:?}", 10_i64.checked_div(0)); }',
        whyItBreaks: 'checked_div(0) returns None safely instead of panicking on zero divisor.',
      },
    ],
    practiceSheet: [
      {
        id: 'rust-ch-24-q1',
        difficulty: 'Easy',
        title: '1. Checked Division Result Helper',
        prompt: 'Read two tokens; parse cleanly and print `OK:<a/b>` or `ERR_DIV_ZERO`.',
        banglaHint: '`a.checked_div(b)` বা `if b == 0 { Err(...) }` ব্যবহার করো।',
        starterCode: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    let p: Vec<&str> = s.split_whitespace().collect();\n    let a: i64 = p[0].parse().unwrap(); let b: i64 = p[1].parse().unwrap();\n    match a.checked_div(b) { Some(v) => println!("OK:{}", v), None => println!("ERR_DIV_ZERO") }\n}`,
        sampleStdin: '20 4',
        expectedOutput: 'OK:5',
      },
      {
        id: 'rust-ch-24-q2',
        difficulty: 'Easy',
        title: '2. Fault-Tolerant Line Pair Summer',
        prompt: 'Read lines from stdin; output `a + b` for valid two-i64 lines or `BAD` on parse error.',
        banglaHint: '`parse::<i64>()`-এ `Result` ম্যাচ করে ভুল লাইনে `BAD` প্রিন্ট করো।',
        starterCode: `use std::io::{self, Read};\nfn parse_sum(l: &str) -> Result<i64, ()> {\n    let p: Vec<&str> = l.split_whitespace().collect();\n    if p.len() < 2 { return Err(()); }\n    Ok(p[0].parse::<i64>().map_err(|_| ())? + p[1].parse::<i64>().map_err(|_| ())?)\n}\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    for l in s.lines() { if !l.trim().is_empty() { match parse_sum(l) { Ok(v) => println!("{}", v), Err(()) => println!("BAD") } } }\n}`,
        sampleStdin: '3 7\nhello\n10 -2',
        expectedOutput: '10\nBAD\n8',
      },
      {
        id: 'rust-ch-24-q3',
        difficulty: 'Medium',
        title: '3. Safe Parse & Sum Ignoring Corrupt Tokens',
        prompt: 'Read n tokens; sum valid positive integers and count invalid tokens via Result matching.',
        banglaHint: '`match tok.parse::<i64>()` দিয়ে বৈধ ধনাত্মক সংখ্যা ও ভুলের সংখ্যা গোনো।',
        starterCode: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    let mut it = s.split_whitespace(); let n: usize = it.next().unwrap().parse().unwrap();\n    let (mut sum, mut bad) = (0_i64, 0_i64);\n    for t in it.take(n) { match t.parse::<i64>() { Ok(v) if v > 0 => sum += v, _ => bad += 1 } }\n    println!("{} {}", sum, bad);\n}`,
        sampleStdin: '4\n10 abc -5 20',
        expectedOutput: '30 2',
      },
      {
        id: 'rust-ch-24-q4',
        difficulty: 'Medium',
        title: '4. Scoped Thread Atomic Sum',
        prompt: 'Read n and n i64s; compute `2 * x` across scoped worker threads accumulating into `AtomicI64`.',
        banglaHint: '`thread::scope` এবং `AtomicI64::fetch_add` ব্যবহার করো।',
        starterCode: `use std::io::{self, Read};\nuse std::sync::atomic::{AtomicI64, Ordering};\nuse std::thread;\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    let nums: Vec<i64> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();\n    let n = nums[0] as usize; let total = AtomicI64::new(0);\n    thread::scope(|sc| { for &x in &nums[1..1 + n] { sc.spawn(|| { total.fetch_add(x * 2, Ordering::Relaxed); }); } });\n    println!("{}", total.load(Ordering::SeqCst));\n}`,
        sampleStdin: '3\n2 4 6',
        expectedOutput: '24',
      },
      {
        id: 'rust-ch-24-q5',
        difficulty: 'Hard',
        title: '5. Drop Guard Rollback Verification',
        prompt: 'Implement `Drop` for Tx so leaving scope without `.commit()` prints `ROLLBACK`.',
        banglaHint: '`impl Drop for Tx`-এ `!self.ok` হলে `ROLLBACK` প্রিন্ট করো।',
        starterCode: `use std::io::{self, Read};\nstruct Tx { ok: bool }\nimpl Drop for Tx { fn drop(&mut self) { if !self.ok { println!("ROLLBACK"); } } }\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    let mut tx = Tx { ok: false };\n    if s.trim() == "ok" { tx.ok = true; println!("COMMIT"); }\n}`,
        sampleStdin: 'fail',
        expectedOutput: 'ROLLBACK',
      },
    ],
    miniBuild: {
      title: 'Rust 2024 Result<T, E> & `?` Propagation Engine',
      description: 'Processes checked parsing and division cleanly via Option/Result with zero panics.',
      banglaGoal: 'Result<T, E> ও `?` প্রোপাগেশন দিয়ে প্যানিক-মুক্ত অপারেশন ইঞ্জিন তৈরি।',
      combinesChapters: 'Ch 1–24',
      starterCode: `use std::io::{self, Read};\nfn safe_div(sa: &str, sb: &str) -> Result<i64, &'static str> {\n    let a: i64 = sa.parse().map_err(|_| "ERR_NUMBER")?; let b: i64 = sb.parse().map_err(|_| "ERR_NUMBER")?;\n    if b == 0 { return Err("ERR_DIV_ZERO"); }\n    Ok(a / b)\n}\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    let p: Vec<&str> = s.split_whitespace().collect();\n    if p.len() >= 2 { match safe_div(p[0], p[1]) { Ok(v) => println!("OK:{}", v), Err(e) => println!("{}", e) } }\n}`,
      sampleStdin: '20 4',
      expectedOutput: 'OK:5',
    },
    starterCode: `use std::io::{self, Read};\nfn safe_div(sa: &str, sb: &str) -> Result<i64, &'static str> {\n    let a: i64 = sa.parse().map_err(|_| "ERR_NUMBER")?; let b: i64 = sb.parse().map_err(|_| "ERR_NUMBER")?;\n    if b == 0 { return Err("ERR_DIV_ZERO"); }\n    Ok(a / b)\n}\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    let p: Vec<&str> = s.split_whitespace().collect();\n    if p.len() >= 2 { match safe_div(p[0], p[1]) { Ok(v) => println!("OK:{}", v), Err(e) => println!("{}", e) } }\n}`,
    sampleStdin: '20 4',
    expectedSampleOutput: 'OK:5',
    testCases: [
      { id: 'rust24-t1', input: '20 4', expectedOutput: 'OK:5' },
      { id: 'rust24-t2', input: '20 0', expectedOutput: 'ERR_DIV_ZERO', isHidden: true },
    ],
  },

  25: {
    chapterNumber: 25,
    title: 'Rust Chapter 25 (2024): Full-Stack Website Architecture Blueprint (Mega Capstone)',
    banglaTitle: 'Rust অধ্যায় ২৫ (2024): ফুল-স্ট্যাক ওয়েবসাইট আর্কিটেকচার ব্লুপ্রিন্ট (মেগা ক্যাপস্টোন)',
    subtitle: 'Axum/Actix-style zero-copy routing, slice pattern matching, Result error safety, and Mega Capstone Ch 1–25.',
    zeroIntuition: {
      plainEnglishStory:
        'High-assurance cloud gateways and edge backends (Axum, Actix Web, Cloudflare Pingora) increasingly run on Rust because zero-copy `&str` slicing, exhaustive `match` routing, and ownership prevent memory corruption and data races at compile time! Every HTTP line (`POST /api/add 15 27`) enters as borrowed slices, passes verb validation (`405`), dispatches via tuple `match (method, path)` routes, and serializes JSON without heap-leak risks.\n\nIn this Rust 2024 Mega Capstone, you unite all 25 chapters—ownership/borrowing, `VecDeque`, `HashMap`, `Option`/`Result`, and pattern matching—into a zero-panic HTTP Request Router & JSON Engine.',
      asciiFlowchart: `  [ Request Slice: ("POST", "/api/add", 15, 27) ]
         |
         v  (Tuple Pattern Match: ("GET" | "POST", path) -> Response)
  [ 200 {"sum":42} | 404 {"error":"not_found"} | 405 MethodNotAllowed ]`,
      pseudocode: [
        '1. SLICE raw HTTP request lines cleanly as borrowed &str tokens (zero cloning)',
        '2. PATTERN-MATCH tuple (method, path) with wildcard guards for 405 & 404',
        '3. PARSE numeric args safely via .parse::<i64>() without panicking',
        '4. EMIT deterministic status code + formatted JSON strings',
      ],
      banglaZeroToHero: {
        analogyTitle: 'Axum/Actix স্টাইল জিরো-কপি রাউটার ও মেমোরি-সেফ ব্যাকএন্ড (Mega Capstone)',
        explanation:
          'Cloudflare, Discord ও AWS-এর অতি-দ্রুত ওয়েব ব্যাকএন্ড ও প্রক্সি সার্ভার (Axum, Actix Web) এখন Rust ভাষায় তৈরি হচ্ছে! এর মূল কারণ হলো Rust-এর জিরো-কপি `&str` স্লাইস ও কম্পাইল-টাইম `match` গ্যারান্টি—যার ফলে কোনো বাফার ওভারফ্লো বা `Null` ক্র্যাশ ছাড়াই সেকেন্ডে লাখ লাখ HTTP রিকোয়েস্ট প্রসেস করা যায়। একটি রিকোয়েস্ট (`POST /api/add 15 27`) এলে Rust প্রথমে টাপল প্যাটার্ন ম্যাচ `match (method, path)` চালিয়ে দেখে মেথডটি `GET` বা `POST` কি না—না মিললে সরাসরি `405 MethodNotAllowed` দেয়! আর পথ না মিললে প্যানিক না করে নিরাপদ `404 {"error":"not_found"}` ফেরত দেয়। ব্রাউজারে JSON পাঠানোর সময় `{}` এস্কেপ করতে প্রিন্ট ম্যাক্রোতে `{{` ও `}}` লেখা হয়—এটি Rust-এর একটি জরুরি সিনট্যাক্স। এই মেগা ক্যাপস্টোনে তুমি অধ্যায় ১ থেকে ২৪-এ শেখা সব ধারণা—ওনারশিপ, স্লাইস, `HashMap`, `VecDeque`, `Result` এবং প্যাটার্ন ম্যাচিং—একসাথে মিলিয়ে একটি পূর্ণাঙ্গ Rust HTTP রাউটার ও JSON ইঞ্জিন তৈরি করবে!',
        everydayExample:
          'স্বয়ংক্রিয় ডাকঘরের স্ক্যানার (`match (method, path)`) চিঠি না ছিঁড়েই (`&str` borrow) গন্তব্য দেখে ২০0/৪০৪/৪০৫ স্লটে পাঠিয়ে দেয়!',
        keyTakeaways: [
          '`match (method, path)` টাপল ম্যাচিং দিয়ে প্রতিটি HTTP মেথড ও পাথ কেস কম্পাইলার দিয়ে যাচাই করা যায়।',
          '`format!` বা `println!`-এ JSON-এর `{` ও `}` প্রিন্ট করতে সর্বদা `{{` এবং `}}` লিখতে হয়।',
          'ওয়েব সার্ভারে `.unwrap()` ব্যবহার না করে `.parse::<i64>().unwrap_or(0)` বা `Result` ব্যবহার করলে সার্ভার কখনো ক্র্যাশ করে না।',
        ],
      },
    },
    topics: [
      {
        id: 'rust-ch-25-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Zero-Copy HTTP Request Line Parser (&str Tuple)',
        englishParagraphs: [
          'Borrowing `&str` tokens from an incoming request line avoids allocating new `String` objects on the heap during routing.',
        ],
        banglaParagraphs: [
          'হিপ মেমোরি খরচ না করে `&str` স্লাইস দিয়ে HTTP রিকোয়েস্ট লাইন পার্স করার পদ্ধতি এটি।',
        ],
        memoryDiagram: `"GET /health HTTP/1.1" -> method:&str="GET", path:&str="/health"`,
        code: `struct HttpReq<'a> { method: &'a str, path: &'a str }

fn main() {
    let raw = "GET /health HTTP/1.1";
    let mut it = raw.split_whitespace();
    if let (Some(method), Some(path)) = (it.next(), it.next()) {
        let req = HttpReq { method, path };
        println!("method={} path={}", req.method, req.path);
    }
}`,
        stdin: '',
        expectedOutput: 'method=GET path=/health',
        lineByLine: [
          { lineNumber: 'Line 1', codeSnippet: "struct HttpReq<'a> { method: &'a str, path: &'a str }", whatItMeans: 'Borrows request tokens directly from incoming buffer via lifetime \'a.', whyItIsThere: 'Eliminates per-request heap allocations.', ifDeletedError: 'Compile error: HttpReq unknown.' },
        ],
      },
      {
        id: 'rust-ch-25-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'JSON Response Serializer With Escaped Braces {{ }}',
        englishParagraphs: [
          'In Rust `println!` / `format!`, literal curly braces for JSON must be doubled (`{{` and `}}`) so formatting macros treat them as characters rather than placeholders.',
        ],
        banglaParagraphs: [
          'Rust-এ `println!` দিয়ে JSON প্রিন্ট করতে `{` ও `}`-কে দুবার (`{{` ও `}}`) লিখে এস্কেপ করা হয়েছে।',
        ],
        memoryDiagram: `"argon 95" -> HTTP/1.1 200 OK + {"user":"argon","score":95}`,
        code: `use std::io::{self, Read};

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let p: Vec<&str> = s.split_whitespace().collect();
    if p.len() >= 2 {
        let score: i64 = p[1].parse().unwrap_or(0);
        println!("HTTP/1.1 200 OK");
        println!("{{\\"user\\":\\"{}\\",\\"score\\":{}}}", p[0], score);
    }
}`,
        stdin: 'argon 95',
        expectedOutput: 'HTTP/1.1 200 OK\n{"user":"argon","score":95}',
        lineByLine: [
          { lineNumber: 'Line 10', codeSnippet: 'println!("{{\\"user\\":\\"{}\\",\\"score\\":{}}}", p[0], score);', whatItMeans: 'Uses doubled braces to emit literal JSON curly brackets safely.', whyItIsThere: 'Single { } causes Rust format string compile errors.', ifDeletedError: 'Compile failure or missing JSON output.' },
        ],
      },
      {
        id: 'rust-ch-25-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Auth Middleware & HashMap Route Table',
        englishParagraphs: [
          'Storing function pointers `fn() -> &\'static str` in a `HashMap<&str, fn() -> &str>` builds an `O(1)` router cleanly.',
        ],
        banglaParagraphs: [
          'টোকেন যাচাই করার পর `HashMap` রাউট টেবিল থেকে ফাংশন পয়েন্টার খুঁজে চালানো হয়েছে।',
        ],
        memoryDiagram: `/health secret -> auth OK -> routes.get("/health") -> 200`,
        code: `use std::collections::HashMap;
use std::io::{self, Read};

fn h_health() -> &'static str { "200 {\\"ok\\":true}" }
fn h_ver() -> &'static str { "200 {\\"ver\\":\\"rust2024\\"}" }

fn main() {
    let mut routes: HashMap<&str, fn() -> &'static str> = HashMap::new();
    routes.insert("/health", h_health);
    routes.insert("/version", h_ver);

    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let p: Vec<&str> = s.split_whitespace().collect();
    if p.len() >= 2 {
        if p[1] != "secret" { println!("401 Unauthorized"); return; }
        match routes.get(p[0]) {
            Some(f) => println!("{}", f()),
            None => println!("404 NotFound"),
        }
    }
}`,
        stdin: '/health secret',
        expectedOutput: '200 {"ok":true}',
        lineByLine: [
          { lineNumber: 'Line 17', codeSnippet: 'match routes.get(p[0]) {', whatItMeans: 'Safely returns Option<&fn> so missing endpoints never panic.', whyItIsThere: 'Guarantees clean 404 fallback.', ifDeletedError: 'Cannot handle unknown paths safely.' },
        ],
      },
      {
        id: 'rust-ch-25-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Mega Capstone: Exhaustive Pattern-Matched HTTP Router & JSON Engine',
        englishParagraphs: [
          'Tuple matching `(method, path)` handles HTTP method enforcement (`405`), `/health`, `/api/add` in `i64`, and fallback `404` JSON cleanly with zero heap allocation.',
        ],
        banglaParagraphs: [
          'মেগা ক্যাপস্টোন: `match (method, path)` দিয়ে মেথড যাচাই (`405`), রাউটিং (`/health`, `/api/add`) এবং নির্ভুল JSON উত্তর তৈরি!',
        ],
        memoryDiagram: `Stream -> match (method, path) -> 200 JSON / 404 / 405`,
        code: `use std::io::{self, Read};

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let n: usize = t[0].parse().unwrap_or(0);
    for i in 0..n {
        let base = 1 + 4 * i;
        if base + 3 >= t.len() { break; }
        let (m, p) = (t[base], t[base + 1]);
        let a: i64 = t[base + 2].parse().unwrap_or(0);
        let b: i64 = t[base + 3].parse().unwrap_or(0);
        match (m, p) {
            ("GET" | "POST", "/health") => println!("200 {{\\"status\\":\\"ok\\"}}"),
            ("GET" | "POST", "/api/add") => println!("200 {{\\"sum\\":{}}}", a + b),
            ("GET" | "POST", _) => println!("404 {{\\"error\\":\\"not_found\\"}}"),
            _ => println!("405 MethodNotAllowed"),
        }
    }
}`,
        stdin: '3\nGET /health 0 0\nPOST /api/add 15 27\nGET /unknown 0 0',
        expectedOutput: '200 {"status":"ok"}\n200 {"sum":42}\n404 {"error":"not_found"}',
        lineByLine: [
          { lineNumber: 'Line 15', codeSnippet: 'match (m, p) {', whatItMeans: 'Exhaustive multi-pattern router dispatching method + path together.', whyItIsThere: 'Eliminates nested if/else trees cleanly.', ifDeletedError: 'Requests are never routed.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 1', codeSnippet: "struct HttpReq<'a> { method: &'a str, path: &'a str }", whatItMeans: 'Zero-copy request view tied to input buffer lifetime.', whyItIsThere: 'Avoids cloning request strings.', ifDeletedError: 'Compile error: HttpReq unknown.' },
      { lineNumber: 'Line 4', codeSnippet: 'let raw = "GET /health HTTP/1.1";', whatItMeans: 'Raw wire HTTP request line.', whyItIsThere: 'Sample input slice.', ifDeletedError: 'raw undefined.' },
      { lineNumber: 'Line 5', codeSnippet: 'let mut it = raw.split_whitespace();', whatItMeans: 'Lazy iterator yielding borrowed whitespace tokens.', whyItIsThere: 'No Vec allocation needed for quick header parse.', ifDeletedError: 'Cannot extract method/path.' },
      { lineNumber: 'Line 6', codeSnippet: 'if let (Some(method), Some(path)) = (it.next(), it.next()) {', whatItMeans: 'Pattern-matches first two tokens safely without unwrap().', whyItIsThere: 'Zero panic even on malformed lines.', ifDeletedError: 'Matches nothing.' },
      { lineNumber: 'Line 8', codeSnippet: 'println!("method={} path={}", req.method, req.path);', whatItMeans: 'Prints parsed method and route.', whyItIsThere: 'Verifies parsed slice fields.', ifDeletedError: 'Empty stdout.' },
    ],
    dryRunTable: [
      { step: 1, state: 'Match ("GET", "/health")', memoryOrStack: 'Hits arm 1 cleanly', note: '200 {"status":"ok"}' },
      { step: 2, state: 'Match ("POST", "/api/add")', memoryOrStack: 'a=15, b=27 -> a+b=42', note: '200 {"sum":42}' },
      { step: 3, state: 'Match ("GET", "/unknown")', memoryOrStack: 'Hits ("GET" | "POST", _)', note: '404 {"error":"not_found"}' },
      { step: 4, state: 'Fallback _', memoryOrStack: 'Invalid method -> 405 arm', note: '405 MethodNotAllowed' },
    ],
    harryBugTraps: [
      {
        title: 'Forgetting to Escape {{ }} Inside println! When Building JSON',
        brokenCode: `println!("{\\"ok\\":true}"); // Compile error: invalid format string!`,
        fixedCode: `fn main() { println!("{{\\"ok\\":true}}"); }`,
        whyItBreaks: 'Rust format macros reserve { and }; literal JSON braces must always be doubled as {{ and }}.',
      },
      {
        title: 'Using .unwrap() on Untrusted Request Parsing Instead of .unwrap_or / ?',
        brokenCode: `let id: i64 = user_param.parse().unwrap(); // Malformed query panics & kills server thread!`,
        fixedCode: `fn main() { let id: i64 = "bad".parse().unwrap_or(-1); println!("{}", id); }`,
        whyItBreaks: 'Untrusted HTTP query strings can hold garbage; handle Result errors explicitly with match, ?, or unwrap_or.',
      },
      {
        title: 'Indexing routes["/missing"] Directly Instead of .get()',
        brokenCode: `let h = routes["/unknown"]; // Panics: no entry found for key!`,
        fixedCode: `use std::collections::HashMap; fn main() { let m: HashMap<&str, i32> = HashMap::new(); println!("{:?}", m.get("/unknown")); }`,
        whyItBreaks: 'HashMap Index panics on missing keys; use .get() to return 404 safely.',
      },
    ],
    practiceSheet: [
      {
        id: 'rust-ch-25-q1',
        difficulty: 'Easy',
        title: 'HTTP Status Code Labeler',
        prompt: 'Read int code (200, 404, 500) and print OK / NOT_FOUND / SERVER_ERR.',
        banglaHint: 'ইঙ্গিত: `match code { 200 => "OK", 404 => "NOT_FOUND", _ => "SERVER_ERR" }` লেখো।',
        starterCode: `use std::io;\nfn main() {\n    let mut s = String::new(); io::stdin().read_line(&mut s).unwrap();\n    let c: i32 = s.trim().parse().unwrap_or(500);\n    println!("{}", match c { 200 => "OK", 404 => "NOT_FOUND", _ => "SERVER_ERR" });\n}`,
        sampleStdin: '404',
        expectedOutput: 'NOT_FOUND',
      },
      {
        id: 'rust-ch-25-q2',
        difficulty: 'Easy',
        title: 'Escaped JSON Key-Value Emitter',
        prompt: 'Read key and i64 value; output `{"<key>":<val>}`.',
        banglaHint: 'ইঙ্গিত: `println!("{{\\"{}\\":{}}}", k, v)` দিয়ে {} এস্কেপ করো।',
        starterCode: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    let p: Vec<&str> = s.split_whitespace().collect();\n    if p.len() >= 2 { println!("{{\\"{}\\":{}}}", p[0], p[1]); }\n}`,
        sampleStdin: 'xp 250',
        expectedOutput: '{"xp":250}',
      },
      {
        id: 'rust-ch-25-q3',
        difficulty: 'Medium',
        title: 'Query Parameter id Extractor',
        prompt: 'Read query string like `id=42&mode=pro`; extract and print `id` value.',
        banglaHint: 'ইঙ্গিত: `split(\'&\')` ও `strip_prefix("id=")` ব্যবহার করো।',
        starterCode: `use std::io;\nfn main() {\n    let mut s = String::new(); io::stdin().read_line(&mut s).unwrap();\n    for part in s.trim().split('&') {\n        if let Some(v) = part.strip_prefix("id=") { println!("{}", v); }\n    }\n}`,
        sampleStdin: 'id=42&mode=pro',
        expectedOutput: '42',
      },
      {
        id: 'rust-ch-25-q4',
        difficulty: 'Medium',
        title: 'Sliding-Window API Rate Limiter',
        prompt: 'Read cap, n, and n sorted timestamps; count accepted requests within trailing 10s window.',
        banglaHint: 'ইঙ্গিত: `VecDeque<i64>` ব্যবহার করে `t - front >= 10` সব পপ করে `len() < cap` চেক করো।',
        starterCode: `use std::collections::VecDeque;\nuse std::io::{self, Read};\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    let nums: Vec<i64> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();\n    let (cap, n) = (nums[0] as usize, nums[1] as usize);\n    let mut win: VecDeque<i64> = VecDeque::new(); let mut ok = 0;\n    for &t in &nums[2..2 + n] {\n        while win.front().is_some_and(|&f| t - f >= 10) { win.pop_front(); }\n        if win.len() < cap { win.push_back(t); ok += 1; }\n    }\n    println!("{}", ok);\n}`,
        sampleStdin: '2 4\n1 2 5 12',
        expectedOutput: '3',
      },
      {
        id: 'rust-ch-25-q5',
        difficulty: 'Hard',
        title: 'In-Memory REST KV Store',
        prompt: 'Read n commands (`SET id val` or `GET id`); print stored i64 (0 default) for each GET.',
        banglaHint: 'ইঙ্গিত: `HashMap<i64, i64>`-এ ইনসার্ট করে `db.get(&id).copied().unwrap_or(0)` প্রিন্ট করো।',
        starterCode: `use std::collections::HashMap;\nuse std::io::{self, Read};\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    let t: Vec<&str> = s.split_whitespace().collect();\n    let n: usize = t[0].parse().unwrap_or(0);\n    let mut db: HashMap<i64, i64> = HashMap::new(); let mut i = 1;\n    for _ in 0..n {\n        if t[i] == "SET" { db.insert(t[i+1].parse().unwrap(), t[i+2].parse().unwrap()); i += 3; }\n        else { println!("{}", db.get(&t[i+1].parse().unwrap()).copied().unwrap_or(0)); i += 2; }\n    }\n}`,
        sampleStdin: '3\nSET 5 900\nGET 1\nGET 5',
        expectedOutput: '0\n900',
      },
    ],
    miniBuild: {
      title: 'Mega Capstone (Ch 1–25): Rust 2024 Full-Stack HTTP Router & JSON Engine',
      description: 'Combines zero-copy &str pattern matching, safe parsing, and JSON serialization cleanly.',
      banglaGoal: 'মেগা ক্যাপস্টোন (অধ্যায় ১–২৫): পূর্ণাঙ্গ Rust HTTP রাউটার ও JSON রেসপন্স ইঞ্জিন নির্মাণ।',
      combinesChapters: 'Ch 1–25',
      starterCode: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    let t: Vec<&str> = s.split_whitespace().collect();\n    if t.is_empty() { return; }\n    let n: usize = t[0].parse().unwrap_or(0);\n    for i in 0..n {\n        let b = 1 + 4 * i; if b + 3 >= t.len() { break; }\n        let (x, y): (i64, i64) = (t[b+2].parse().unwrap_or(0), t[b+3].parse().unwrap_or(0));\n        match (t[b], t[b+1]) {\n            ("GET" | "POST", "/health") => println!("200 {{\\"status\\":\\"ok\\"}}"),\n            ("GET" | "POST", "/api/add") => println!("200 {{\\"sum\\":{}}}", x + y),\n            ("GET" | "POST", _) => println!("404 {{\\"error\\":\\"not_found\\"}}"),\n            _ => println!("405 MethodNotAllowed"),\n        }\n    }\n}`,
      sampleStdin: '3\nGET /health 0 0\nPOST /api/add 15 27\nGET /unknown 0 0',
      expectedOutput: '200 {"status":"ok"}\n200 {"sum":42}\n404 {"error":"not_found"}',
    },
    starterCode: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    let t: Vec<&str> = s.split_whitespace().collect();\n    if t.is_empty() { return; }\n    let n: usize = t[0].parse().unwrap_or(0);\n    for i in 0..n {\n        let b = 1 + 4 * i; if b + 3 >= t.len() { break; }\n        let (x, y): (i64, i64) = (t[b+2].parse().unwrap_or(0), t[b+3].parse().unwrap_or(0));\n        match (t[b], t[b+1]) {\n            ("GET" | "POST", "/health") => println!("200 {{\\"status\\":\\"ok\\"}}"),\n            ("GET" | "POST", "/api/add") => println!("200 {{\\"sum\\":{}}}", x + y),\n            ("GET" | "POST", _) => println!("404 {{\\"error\\":\\"not_found\\"}}"),\n            _ => println!("405 MethodNotAllowed"),\n        }\n    }\n}`,
    sampleStdin: '3\nGET /health 0 0\nPOST /api/add 15 27\nGET /unknown 0 0',
    expectedSampleOutput: '200 {"status":"ok"}\n200 {"sum":42}\n404 {"error":"not_found"}',
    testCases: [
      { id: 'rust25-t1', input: '3\nGET /health 0 0\nPOST /api/add 15 27\nGET /unknown 0 0', expectedOutput: '200 {"status":"ok"}\n200 {"sum":42}\n404 {"error":"not_found"}' },
      { id: 'rust25-t2', input: '1\nDELETE /api/add 1 2', expectedOutput: '405 MethodNotAllowed', isHidden: true },
    ],
  },
};

