import type { AtomicLessonOverride } from './atomicLessonTypes';

export const LESSONS_JAVA_P3: Record<number, AtomicLessonOverride> = {
  11: {
    chapterNumber: 11,
    title: 'Java Chapter 11 (Java 21): 1D Arrays, ArrayList & Frequency Counting',
    banglaTitle: 'Java অধ্যায় ১১ (Java 21): ১ডি অ্যারে, ArrayList ও ফ্রিকোয়েন্সি কাউন্টিং',
    subtitle: 'Fixed int[]/long[] heap blocks, O(1) indexing, frequency buckets, and avoiding Arrays.asList traps.',
    zeroIntuition: {
      plainEnglishStory:
        'In Java, declaring `long[] a = new long[n]` allocates a contiguous block of `n` 64-bit slots on the JVM heap, automatically zero-initialized to `0L` with built-in bounds checking (`ArrayIndexOutOfBoundsException` if out of range) and `.length` property.\n\nFor bounded values (`0..1000`), an `int[] freq = new int[1001]` bucket counts frequencies in `O(1)` per item with zero boxing overhead. When dynamic resizing is needed, `ArrayList<Integer>` expands automatically, though raw primitive arrays (`int[]`/`long[]`) remain much faster in competitive programming because they avoid `Integer` object boxing.',
      asciiFlowchart: `long[] a = new long[4];  // Heap contiguous slots (auto-zeroed!)
   idx:   0     1     2     3
   val: [ 12 ][  5 ][ 27 ][  9 ]  (.length = 4)

Frequency Table: int[] freq = new int[101];
   freq[x]++  ==>  O(N) mode & duplicate finder!`,
      pseudocode: [
        '1. ALLOCATE long[] a = new long[n] after reading N',
        '2. SEED mn and mx using a[0] (not 0!)',
        '3. COUNT occurrences in int[] freq bucket or HashMap',
        '4. GUARD array bounds (0 <= x && x < freq.length)',
      ],
      banglaZeroToHero: {
        analogyTitle: 'শূন্য দিয়ে সাজানো লকার ও ভোটের বাক্স',
        explanation:
          'Java-তে `int[] a = new int[n]` লিখলে JVM হিপ মেমোরিতে একসাথে `n`টি পাশাপাশি ঘর তৈরি করে এবং C/C++-এর মতো ময়লা মান না রেখে সব ঘর আপনাআপনি `0` দিয়ে পূর্ণ করে দেয়! প্রতিটি ঘরের নম্বর `0` থেকে `a.length - 1`, আর ভুল করে এর বাইরে হাত দিলে Java নীরব দুর্নীতির বদলে সাথে সাথে `ArrayIndexOutOfBoundsException` দিয়ে সতর্ক করে দেয়। এক পাসে অ্যারের যোগফল, সর্বনিম্ন ও সর্বোচ্চ বের করতে `mx = a[0]` দিয়ে শুরু করা নিরাপদ। আর সংখ্যা কতবার এসেছে তা গুনতে ছোট রেঞ্জ (`0..100`) হলে `int[] freq = new int[101]` নিয়ে `freq[x]++` করলেই `O(N)` সময়ে কাজ শেষ হয়! যদিও ডায়নামিক সাইজের জন্য `ArrayList<Integer>` খুব কাজের, কনটেস্টে বড় অ্যারেতে প্রিমিটিভ `int[]` বা `long[]` অনেক দ্রুত চলে এবং কম RAM নেয়। মনে রাখবে `int[] b = a;` লিখলে কিন্তু নতুন অ্যারে তৈরি হয় না, বরং একই অ্যারের ঠিকানা শেয়ার হয়; আসল কপি বানাতে `a.clone()` বা `Arrays.copyOf(a, n)` ব্যবহার করতে হয়।',
        everydayExample:
          'হলরুমের নম্বরযুক্ত লকারের সারি: জন্মলগ্নেই সব লকারের ভেতর ০ রাখা থাকে, আর রোল নম্বর দিয়ে সোজা `O(1)` সময়ে খোলা যায়।',
        keyTakeaways: [
          'Java অ্যারে সবসময় শূন্য (`0`) দিয়ে অটো-ইনিশিয়ালাইজ হয় এবং `.length` ফিল্ড ধরে রাখে।',
          '`int[] b = a` একই রেফারেন্স কপি করে; আলাদা কপির জন্য `a.clone()` ব্যবহার করো।',
          'প্রিমিটিভ অ্যারে `long[]` কনটেস্টে `ArrayList<Long>`-এর চেয়ে অনেক দ্রুত ও হালকা।',
        ],
      },
    },
    topics: [
      {
        id: 'java-ch-11-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: '1D Array Traversal & Running Max/Sum',
        englishParagraphs: [
          'Enhanced `for (long x : a)` reads every contiguous element cleanly without off-by-one loop boundary risks.',
          'Initializing `mx = a[0]` handles negative datasets accurately.',
        ],
        banglaParagraphs: [
          'Enhanced `for (long x : a)` লুপ দিয়ে খুব সহজে প্রতিটি উপাদান পড়ে যোগফল ও সর্বোচ্চ বের করা যায়।',
          '`mx = a[0]` রাখলে ঋণাত্মক অ্যারেতেও সঠিক ফল মেলে।',
        ],
        memoryDiagram: `a = {12, 5, 27, 9} -> sum=53, max=27`,
        code: `public class Main {
    public static void main(String[] args) {
        long[] a = {12, 5, 27, 9};
        long sum = 0, mx = a[0];
        for (long x : a) {
            sum += x;
            if (x > mx) mx = x;
        }
        System.out.println("sum=" + sum + " max=" + mx);
    }
}`,
        stdin: '',
        expectedOutput: 'sum=53 max=27',
        lineByLine: [
          { lineNumber: 'Line 3', codeSnippet: 'long[] a = {12, 5, 27, 9};', whatItMeans: 'Allocates 4-element 64-bit array.', whyItIsThere: 'Stores dataset sequentially.', ifDeletedError: 'Compile error: a not defined.' },
          { lineNumber: 'Line 5', codeSnippet: 'for (long x : a) {', whatItMeans: 'Iterates sequentially across elements.', whyItIsThere: 'Clean O(N) scan.', ifDeletedError: 'Nothing aggregated.' },
        ],
      },
      {
        id: 'java-ch-11-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Frequency Bucket Counting (O(N))',
        englishParagraphs: [
          'Allocating `int[] freq = new int[101]` maps bounded scores `[0, 100]` cleanly to zero-initialized integer buckets.',
          'Tie-breaking from `v = 1..100` finds the smallest mode cleanly.',
        ],
        banglaParagraphs: [
          '`int[] freq = new int[101]` সব ঘর ০ দিয়ে তৈরি হয় বলে সরাসরি `freq[x]++` চালানো যায়।',
          'এক পাসে সর্বাধিক পুনরাবৃত্ত মান নির্ণয় করে।',
        ],
        memoryDiagram: `[3, 1, 3, 2, 3] -> freq[3] = 3 -> mode=3 count=3`,
        code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int[] freq = new int[101];
        for (int i = 0; i < n; i++) {
            int x = sc.nextInt();
            if (x >= 0 && x <= 100) freq[x]++;
        }
        int mode = 0;
        for (int v = 1; v <= 100; v++) {
            if (freq[v] > freq[mode]) mode = v;
        }
        System.out.println("mode=" + mode + " count=" + freq[mode]);
    }
}`,
        stdin: '5\n3 1 3 2 3',
        expectedOutput: 'mode=3 count=3',
        lineByLine: [
          { lineNumber: 'Line 8', codeSnippet: 'int[] freq = new int[101];', whatItMeans: 'Zero-initialized 101-slot integer array.', whyItIsThere: 'O(1) frequency tracking.', ifDeletedError: 'Compile error.' },
        ],
      },
      {
        id: 'java-ch-11-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'In-Place Array Reversal (O(1) Space)',
        englishParagraphs: [
          'Swapping symmetric endpoints `l++` and `r--` reverses an array in place with zero extra heap allocation.',
          'Always use `StringBuilder` to format output elements separated by single spaces.',
        ],
        banglaParagraphs: [
          '`l` ও `r` প্রান্ত অদলবদল করে বাড়তি অ্যারে ছাড়াই পুরো অ্যারে উল্টে দেওয়া যায়।',
          'প্রিন্টের জন্য `StringBuilder` নেওয়া হয়েছে।',
        ],
        memoryDiagram: `[10, 20, 30, 40] -> [40, 30, 20, 10]`,
        code: `public class Main {
    public static void main(String[] args) {
        int[] a = {10, 20, 30, 40};
        int l = 0, r = a.length - 1;
        while (l < r) {
            int t = a[l]; a[l] = a[r]; a[r] = t;
            l++; r--;
        }
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < a.length; i++) {
            if (i > 0) sb.append(' ');
            sb.append(a[i]);
        }
        System.out.println(sb);
    }
}`,
        stdin: '',
        expectedOutput: '40 30 20 10',
        lineByLine: [
          { lineNumber: 'Line 6', codeSnippet: 'int t = a[l]; a[l] = a[r]; a[r] = t;', whatItMeans: 'Swaps left and right elements in place.', whyItIsThere: 'Zero extra array memory.', ifDeletedError: 'Array stays unreversed.' },
        ],
      },
      {
        id: 'java-ch-11-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Reference Alias Trap vs .clone()',
        englishParagraphs: [
          'Writing `int[] b = a;` makes `b` point to the exact same heap array as `a`!',
          'Use `a.clone()` (for 1D arrays) to mutate `b` independently.',
        ],
        banglaParagraphs: [
          '`int[] b = a;` করলে দুটি ভ্যারিয়েবল একই হিপ মেমোরির দিকে তাকিয়ে থাকে, ফলে `b` বদলালে `a`-ও বদলে যায়!',
          'আলাদা কপি নিতে `a.clone()` ব্যবহার করতে হয়।',
        ],
        memoryDiagram: `b = a (SHARED HEAP ARRAY) vs b = a.clone() (NEW COPY)`,
        code: `public class Main {
    public static void main(String[] args) {
        int[] a = {1, 2, 3};
        int[] b = a.clone();
        b[0] = 99;
        System.out.println(a[0] + " " + b[0]);
    }
}`,
        stdin: '',
        expectedOutput: '1 99',
        lineByLine: [
          { lineNumber: 'Line 4', codeSnippet: 'int[] b = a.clone();', whatItMeans: 'Allocates distinct heap copy of 1D array a.', whyItIsThere: 'Isolates mutations on b from a.', ifDeletedError: 'int[] b = a prints 99 99.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 3', codeSnippet: 'long[] a = {12, 5, 27, 9};', whatItMeans: 'Creates contiguous 64-bit array.', whyItIsThere: 'Provides O(1) indexed elements.', ifDeletedError: 'Array undeclared.' },
      { lineNumber: 'Line 4', codeSnippet: 'long sum = 0, mx = a[0];', whatItMeans: 'Initializes accumulators safely from a[0].', whyItIsThere: 'Works even on all-negative inputs.', ifDeletedError: 'mx=0 fails negative arrays.' },
      { lineNumber: 'Line 5', codeSnippet: 'for (long x : a) {', whatItMeans: 'Loops over all elements cleanly.', whyItIsThere: 'Zero index boundary errors.', ifDeletedError: 'No aggregation.' },
    ],
    dryRunTable: [
      { step: 1, state: 'init', memoryOrStack: 'sum=0, mx=12', note: 'Seed mx = a[0]' },
      { step: 2, state: 'x = 5', memoryOrStack: 'sum=17, mx=12', note: '5 > 12 false' },
      { step: 3, state: 'x = 27', memoryOrStack: 'sum=44, mx=27', note: 'Update mx = 27' },
      { step: 4, state: 'x = 9', memoryOrStack: 'sum=53, mx=27', note: 'Outputs sum=53 max=27' },
    ],
    harryBugTraps: [
      { title: 'Trap 1: Comparing Arrays With == Instead of Arrays.equals', brokenCode: `if (a == b) // compares heap memory references, NOT contents!`, fixedCode: `if (Arrays.equals(a, b))`, whyItBreaks: 'Two distinct arrays holding {1,2} have different heap addresses so == returns false.' },
      { title: 'Trap 2: Reference Alias Assignment b = a', brokenCode: `int[] b = a; b[0] = 99; // corrupts a[0]!`, fixedCode: `int[] b = a.clone();`, whyItBreaks: 'Object variables store heap references, not array copies.' },
      { title: 'Trap 3: Off-by-One Access a[a.length]', brokenCode: `for (int i = 0; i <= a.length; i++) sum += a[i];`, fixedCode: `for (int i = 0; i < a.length; i++) sum += a[i];`, whyItBreaks: 'Valid indices run 0..length-1; hitting a[length] throws ArrayIndexOutOfBoundsException.' },
    ],
    practiceSheet: [
      { id: 'java-ch11-p1', difficulty: 'Easy', title: 'Array Min & Max', prompt: 'Read N and N integers, print `min max`.', banglaHint: '`mn` ও `mx` দুটোই `a[0]` দিয়ে শুরু করো।', starterCode: `import java.util.Scanner;\npublic class Main { public static void main(String[] args){ Scanner sc=new Scanner(System.in); int n=sc.nextInt(); long[] a=new long[n]; for(int i=0;i<n;i++)a[i]=sc.nextLong(); long mn=a[0],mx=a[0]; for(long x:a){mn=Math.min(mn,x);mx=Math.max(mx,x);} System.out.println(mn+" "+mx); } }`, sampleStdin: '4\n-5 12 3 9', expectedOutput: '-5 12' },
      { id: 'java-ch11-p2', difficulty: 'Easy', title: 'Reverse Order Print', prompt: 'Read N integers and print them in reverse.', banglaHint: '`n - 1` থেকে `0` পর্যন্ত লুপ চালিয়ে `StringBuilder`-এ যোগ করো।', starterCode: `import java.util.Scanner;\npublic class Main { public static void main(String[] args){ Scanner sc=new Scanner(System.in); int n=sc.nextInt(); int[] a=new int[n]; for(int i=0;i<n;i++)a[i]=sc.nextInt(); StringBuilder sb=new StringBuilder(); for(int i=n-1;i>=0;i--){if(i<n-1)sb.append(' '); sb.append(a[i]);} System.out.println(sb); } }`, sampleStdin: '4\n1 2 3 4', expectedOutput: '4 3 2 1' },
      { id: 'java-ch11-p3', difficulty: 'Medium', title: 'Distinct Count via Frequency Bucket', prompt: 'Given N values in [0, 1000], count distinct values.', banglaHint: '`int[] f = new int[1001]` নিয়ে `f[v] > 0` গুনো।', starterCode: `import java.util.Scanner;\npublic class Main { public static void main(String[] args){ Scanner sc=new Scanner(System.in); int n=sc.nextInt(),d=0; int[] f=new int[1001]; for(int i=0;i<n;i++)f[sc.nextInt()]++; for(int v:f)if(v>0)d++; System.out.println(d); } }`, sampleStdin: '6\n5 2 5 9 2 1', expectedOutput: '4' },
      { id: 'java-ch11-p4', difficulty: 'Medium', title: 'Second Largest Distinct', prompt: 'Print second largest strictly smaller than max (or -1).', banglaHint: '`Long.MIN_VALUE` দিয়ে `m1, m2` ট্র্যাক করো।', starterCode: `import java.util.Scanner;\npublic class Main { public static void main(String[] args){ Scanner sc=new Scanner(System.in); int n=sc.nextInt(); long m1=Long.MIN_VALUE,m2=Long.MIN_VALUE; for(int i=0;i<n;i++){long x=sc.nextLong(); if(x>m1){m2=m1;m1=x;}else if(x<m1&&x>m2)m2=x;} System.out.println(m2==Long.MIN_VALUE?-1:m2); } }`, sampleStdin: '5\n10 20 20 8 15', expectedOutput: '15' },
      { id: 'java-ch11-p5', difficulty: 'Hard', title: 'Missing Number 1..N', prompt: 'Given N and N-1 distinct integers from 1..N, find the missing one.', banglaHint: '`n * (n + 1) / 2 - sum` (long টাইপে) বের করো।', starterCode: `import java.util.Scanner;\npublic class Main { public static void main(String[] args){ Scanner sc=new Scanner(System.in); long n=sc.nextLong(),s=0; for(long i=0;i<n-1;i++) s+=sc.nextLong(); System.out.println(n*(n+1)/2-s); } }`, sampleStdin: '5\n1 2 4 5', expectedOutput: '3' },
    ],
    miniBuild: {
      title: 'Mini-Build: O(N) Frequency Mode Analyzer',
      description: 'Use a zero-initialized int[] frequency bucket to identify the mode across bounded scores.',
      banglaGoal: '`int[] freq` বাকেট অ্যারে দিয়ে `O(N)` সময়ে মোড বের করো।',
      combinesChapters: 'Java Ch 1–11',
      starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int[] freq = new int[101];
        for (int i = 0; i < n; i++) {
            int x = sc.nextInt();
            if (x >= 0 && x <= 100) freq[x]++;
        }
        int mode = 0;
        for (int v = 1; v <= 100; v++) {
            if (freq[v] > freq[mode]) mode = v;
        }
        System.out.println("mode=" + mode + " count=" + freq[mode]);
    }
}`,
      sampleStdin: '5\n3 1 3 2 3',
      expectedOutput: 'mode=3 count=3',
    },
    starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int[] freq = new int[101];
        for (int i = 0; i < n; i++) {
            int x = sc.nextInt();
            if (x >= 0 && x <= 100) freq[x]++;
        }
        int mode = 0;
        for (int v = 1; v <= 100; v++) {
            if (freq[v] > freq[mode]) mode = v;
        }
        System.out.println("mode=" + mode + " count=" + freq[mode]);
    }
}`,
    sampleStdin: '5\n3 1 3 2 3',
    expectedSampleOutput: 'mode=3 count=3',
    testCases: [
      { id: 'java11-t1', input: '5\n3 1 3 2 3', expectedOutput: 'mode=3 count=3' },
      { id: 'java11-t2', input: '4\n7 7 2 2', expectedOutput: 'mode=2 count=2', isHidden: true },
    ],
  },
  12: {
    chapterNumber: 12,
    title: 'Java Chapter 12 (Java 21): Two-Pointer & Sliding Window Basics',
    banglaTitle: 'Java অধ্যায় ১২ (Java 21): টু-পয়েন্টার ও স্লাইডিং উইন্ডো বেসিক',
    subtitle: 'Opposite-end pointer squeeze on sorted arrays, fixed K-window slides, and O(N) non-negative windows.',
    zeroIntuition: {
      plainEnglishStory:
        'A nested loop testing every subarray or pair takes `O(N^2)`—too slow for `N = 10^5`. Two Pointers reduces sorted pair searches to `O(N)` by starting `l = 0` and `r = n - 1`: if `a[l] + a[r] < target`, moving `l++` is safe because pairing `a[l]` with anything smaller than `a[r]` is even smaller; if too large, `r--` shrinks the sum.\n\nSimilarly, Sliding Window tracks a contiguous slice `[l..r]` in `O(N)` total by updating `win += a[i] - a[i - k]` (using `long` to avoid overflow) instead of re-summing `k` elements every step.',
      asciiFlowchart: `Sorted Two-Sum [2, 4, 7, 10, 15], target=14
   l=0(2) + r=4(15) = 17 > 14  -> r--
   l=0(2) + r=3(10) = 12 < 14  -> l++
   l=1(4) + r=3(10) = 14 == target -> FOUND!

Fixed Window k=3: win = sum[0..2], then win += a[i] - a[i - 3]`,
      pseudocode: [
        '1. SORT array if unsorted, then place l = 0, r = n - 1',
        '2. ADVANCE l++ if sum < target else r-- until l < r breaks',
        '3. SLIDE fixed window via win += a[i] - a[i - k] using 64-bit long',
        '4. VARIABLE window: advance r; shrink while (sum > S) sum -= a[l++]',
      ],
      banglaZeroToHero: {
        analogyTitle: 'দুই দিক থেকে চেপে ধরা ও চলন্ত জানালা',
        explanation:
          'সাজানো তালিকায় নির্দিষ্ট যোগফলের দুটি সংখ্যা খুঁজতে সব জোড়া চেক করতে গেলে `O(N^2)` সময়ে TLE আসে। কিন্তু **Two-Pointer** পদ্ধতিতে বাঁ প্রান্তে `l = 0` ও ডান প্রান্তে `r = n - 1` রেখে যোগফল বড় হলে `r--` এবং ছোট হলে `l++` করলে মাত্র এক পাসে (`O(N)`) উত্তর বেরিয়ে আসে! আর পরপর `k`-টি সংখ্যার সর্বোচ্চ যোগফল বের করতে প্রতিবার নতুন করে `k`টি সংখ্যা যোগ না করে, একটি **Sliding Window** চালিয়ে ডানের নতুন `a[i]` যোগ ও বাঁয়ের ফেলে আসা `a[i - k]` বিয়োগ করলেই হয়। পজিটিভ সংখ্যার ক্ষেত্রে যোগফল `<= S` রেখে সবচেয়ে বড় দৈর্ঘ্য বের করতে ডান প্রান্ত `r` এগিয়ে নেওয়া হয় এবং যোগফল সীমা ছাড়ালে `while (sum > S)` লুপে `l++` করে বাঁ দিক ছোট করা হয়। Java-তে বড় অ্যারে যোগ করার সময় সাম ভ্যারিয়েবল অবশ্যই `long` টাইপে নেবে যেন `int` ওভারফ্লো না হয়, আর টু-পয়েন্টারে একই উপাদান দুবার ধরা ঠেকাতে শর্ত সবসময় `l < r` রাখবে।',
        everydayExample:
          'বাঁশের মইয়ের দুই প্রান্ত থেকে দুইজন মাঝখানের নির্দিষ্ট ধাপের দিকে এগোনো—দুজনেই কেবল একদিকেই হাঁটে বলে কখনোই বাড়তি সময় লাগে না।',
        keyTakeaways: [
          'সাজানো অ্যারেতে `while (l < r)` দিয়ে `O(N)` সময়ে টু-সাম ও কনটেইনার প্রবলেম সমাধান হয়।',
          'Fixed Window-তে `win += a[i] - a[i - k]` ও `long` যোগফল ব্যবহার করবে।',
          'প্রতিটি এলিমেন্ট একবার ঢোকে ও সর্বোচ্চ একবার বের হয় বলে মোট সময় `O(N)`।',
        ],
      },
    },
    topics: [
      {
        id: 'java-ch-12-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Sorted Two-Sum via Opposite-End Pointers',
        englishParagraphs: [
          'Two pointers `l = 0` and `r = a.length - 1` converge monotonically in at most `n - 1` steps.',
          'Condition `l < r` prevents pairing `a[l]` with itself.',
        ],
        banglaParagraphs: [
          'দুই প্রান্তের পয়েন্টার `l` ও `r` প্রতি ধাপে ভেতরের দিকে সরে সর্বোচ্চ `n` ধাপেই জোড়া খুঁজে দেয়।',
          '`l < r` থাকার ফলে একই ঘর দুবার নেওয়া হয় না।',
        ],
        memoryDiagram: `[2,4,7,10,15], t=14 -> 4 + 10`,
        code: `public class Main {
    public static void main(String[] args) {
        int[] a = {2, 4, 7, 10, 15};
        int target = 14, l = 0, r = a.length - 1;
        while (l < r) {
            int s = a[l] + a[r];
            if (s == target) {
                System.out.println(a[l] + " " + a[r]);
                return;
            }
            if (s < target) l++;
            else r--;
        }
        System.out.println("NONE");
    }
}`,
        stdin: '',
        expectedOutput: '4 10',
        lineByLine: [
          { lineNumber: 'Line 5', codeSnippet: 'while (l < r) {', whatItMeans: 'Iterates while distinct endpoints remain.', whyItIsThere: 'Prevents l == r duplicate element pairing.', ifDeletedError: 'Cannot iterate.' },
        ],
      },
      {
        id: 'java-ch-12-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Max K-Window Sum (O(N))',
        englishParagraphs: [
          'Pre-summing indices `0..k-1` into a `long` accumulator then sliding `win += a[i] - a[i - k]` avoids inner loops.',
          'Runs cleanly in `O(N)` time and `O(N)` input space.',
        ],
        banglaParagraphs: [
          'প্রথম `k`-টি যোগ করার পর এক লুপে `win += a[i] - a[i - k]` করলে `O(N)` সময়ে সর্বোচ্চ সাম পাওয়া যায়।',
          'বড় সংখ্যার জন্য `long` ব্যবহার করা হয়েছে।',
        ],
        memoryDiagram: `[5,2,8,1,9], k=3 -> 15 -> 11 -> 18`,
        code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt(), k = sc.nextInt();
        long[] a = new long[n];
        for (int i = 0; i < n; i++) a[i] = sc.nextLong();
        long win = 0;
        for (int i = 0; i < k; i++) win += a[i];
        long best = win;
        for (int i = k; i < n; i++) {
            win += a[i] - a[i - k];
            best = Math.max(best, win);
        }
        System.out.println(best);
    }
}`,
        stdin: '5 3\n5 2 8 1 9',
        expectedOutput: '18',
        lineByLine: [
          { lineNumber: 'Line 14', codeSnippet: 'win += a[i] - a[i - k];', whatItMeans: 'Shifts sliding window right by one position in O(1).', whyItIsThere: 'Avoids re-summing k items repeatedly.', ifDeletedError: 'best never updates past first window.' },
        ],
      },
      {
        id: 'java-ch-12-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Longest Subarray Sum <= S (Variable Window)',
        englishParagraphs: [
          'For non-negative numbers, advancing `r` increases `sum` and shrinking `l` decreases `sum`, keeping window validity clean.',
          'Each pointer moves forward at most `N` steps overall.',
        ],
        banglaParagraphs: [
          'ধনাত্মক সংখ্যার জন্য `r` এগিয়ে এবং `sum > S` হলে `l++` করে সর্বোচ্চ বৈধ সাব-অ্যারে দৈর্ঘ্য বের করা যায়।',
          'প্রতিটি উপাদান একবার করেই প্রসেস হয়।',
        ],
        memoryDiagram: `[3,1,2,7,4], S=6 -> [3,1,2] length 3`,
        code: `public class Main {
    public static void main(String[] args) {
        long[] a = {3, 1, 2, 7, 4};
        long S = 6, sum = 0;
        int l = 0, best = 0;
        for (int r = 0; r < a.length; r++) {
            sum += a[r];
            while (sum > S) sum -= a[l++];
            best = Math.max(best, r - l + 1);
        }
        System.out.println(best);
    }
}`,
        stdin: '',
        expectedOutput: '3',
        lineByLine: [
          { lineNumber: 'Line 8', codeSnippet: 'while (sum > S) sum -= a[l++];', whatItMeans: 'Contracts window left boundary until sum <= S.', whyItIsThere: 'Maintains valid subarray constraint.', ifDeletedError: 'Overcounts invalid windows.' },
        ],
      },
      {
        id: 'java-ch-12-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Unsorted Input Trap vs Slow/Fast In-Place Deduplication',
        englishParagraphs: [
          'Running opposite-end pointers without calling `Arrays.sort(a)` first breaks the monotonic assumption!',
          'Same-direction slow/fast pointers also remove consecutive duplicates in sorted arrays cleanly in `O(1)` extra space.',
        ],
        banglaParagraphs: [
          'সাজানো ছাড়াই Two-Pointer চালালে ভুল উত্তর আসে, তাই আগে `Arrays.sort` নিশ্চিত করতে হয়।',
          'এছাড়া slow/fast পয়েন্টার দিয়ে ইন-প্লেস ডুপ্লিকেট বাদ দেওয়া যায়।',
        ],
        memoryDiagram: `{1,1,2,2,2,5,5} -> unique count = 3`,
        code: `public class Main {
    public static void main(String[] args) {
        int[] a = {1, 1, 2, 2, 2, 5, 5};
        int w = 0;
        for (int r = 0; r < a.length; r++) {
            if (w == 0 || a[r] != a[w - 1]) a[w++] = a[r];
        }
        System.out.println("unique=" + w);
    }
}`,
        stdin: '',
        expectedOutput: 'unique=3',
        lineByLine: [
          { lineNumber: 'Line 6', codeSnippet: 'if (w == 0 || a[r] != a[w - 1]) a[w++] = a[r];', whatItMeans: 'Slow pointer w records distinct values in place.', whyItIsThere: 'O(N) deduplication without auxiliary HashSet.', ifDeletedError: 'w remains 0.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 3', codeSnippet: 'int[] a = {2, 4, 7, 10, 15};', whatItMeans: 'Sorted array required for two-pointer squeeze.', whyItIsThere: 'Monotonic order justifies shifting l or r.', ifDeletedError: 'a undeclared.' },
      { lineNumber: 'Line 4', codeSnippet: 'int target = 14, l = 0, r = a.length - 1;', whatItMeans: 'Initializes endpoints at opposite sides.', whyItIsThere: 'Starts from widest pair.', ifDeletedError: 'Pointers missing.' },
      { lineNumber: 'Line 11', codeSnippet: 'if (s < target) l++; else r--;', whatItMeans: 'Monotonically shrinks search interval.', whyItIsThere: 'O(N) guarantee.', ifDeletedError: 'Infinite loop.' },
    ],
    dryRunTable: [
      { step: 1, state: 'l=0, r=4', memoryOrStack: '2 + 15 = 17 > 14', note: 'r-- -> 3' },
      { step: 2, state: 'l=0, r=3', memoryOrStack: '2 + 10 = 12 < 14', note: 'l++ -> 1' },
      { step: 3, state: 'l=1, r=3', memoryOrStack: '4 + 10 = 14 == 14', note: 'Match found -> print 4 10' },
      { step: 4, state: 'return', memoryOrStack: '3 steps', note: 'O(N) termination' },
    ],
    harryBugTraps: [
      { title: 'Trap 1: Running Two Pointers Before Sorting', brokenCode: `int[] a = {10, 2, 15, 4}; // Unsorted!`, fixedCode: `Arrays.sort(a);`, whyItBreaks: 'Moving l++ or r-- only works reliably on sorted sequences.' },
      { title: 'Trap 2: Allowing l <= r in Two-Distinct-Item Sum', brokenCode: `while (l <= r) ...`, fixedCode: `while (l < r) ...`, whyItBreaks: 'l == r adds the exact same array element to itself.' },
      { title: 'Trap 3: 32-bit int Window Sum Overflow', brokenCode: `int win = 0; for (int x : a) win += x;`, fixedCode: `long win = 0; for (long x : a) win += x;`, whyItBreaks: 'K positive integers around 10^9 quickly exceed int max 2.14e9.' },
    ],
    practiceSheet: [
      { id: 'java-ch12-p1', difficulty: 'Easy', title: 'Sorted Two-Sum Check', prompt: 'Given N, target, and sorted array, print `YES` if a pair sums to target else `NO`.', banglaHint: '`while (l < r)` দিয়ে `a[l] + a[r]` মেলাও।', starterCode: `import java.util.Scanner;\npublic class Main { public static void main(String[] args){ Scanner sc=new Scanner(System.in); int n=sc.nextInt(); long t=sc.nextLong(); long[] a=new long[n]; for(int i=0;i<n;i++)a[i]=sc.nextLong(); int l=0,r=n-1; boolean ok=false; while(l<r){long s=a[l]+a[r]; if(s==t){ok=true;break;} if(s<t)l++; else r--;} System.out.println(ok?"YES":"NO"); } }`, sampleStdin: '5 14\n2 4 7 10 15', expectedOutput: 'YES' },
      { id: 'java-ch12-p2', difficulty: 'Easy', title: 'Max Sum K-Window', prompt: 'Print max sum of K contiguous elements in O(N).', banglaHint: '`win += a[i] - a[i - k]` সূত্র চালাও।', starterCode: `import java.util.Scanner;\npublic class Main { public static void main(String[] args){ Scanner sc=new Scanner(System.in); int n=sc.nextInt(),k=sc.nextInt(); long[] a=new long[n]; for(int i=0;i<n;i++)a[i]=sc.nextLong(); long w=0; for(int i=0;i<k;i++)w+=a[i]; long b=w; for(int i=k;i<n;i++){w+=a[i]-a[i-k];b=Math.max(b,w);} System.out.println(b); } }`, sampleStdin: '5 3\n5 2 8 1 9', expectedOutput: '18' },
      { id: 'java-ch12-p3', difficulty: 'Medium', title: 'Longest Subarray Sum <= S', prompt: 'Find max contiguous length with sum <= S (positive items).', banglaHint: '`while (sum > S) sum -= a[l++];` করো।', starterCode: `import java.util.Scanner;\npublic class Main { public static void main(String[] args){ Scanner sc=new Scanner(System.in); int n=sc.nextInt(); long S=sc.nextLong(),s=0; long[] a=new long[n]; for(int i=0;i<n;i++)a[i]=sc.nextLong(); int l=0,b=0; for(int r=0;r<n;r++){s+=a[r]; while(s>S)s-=a[l++]; b=Math.max(b,r-l+1);} System.out.println(b); } }`, sampleStdin: '5 6\n3 1 2 7 4', expectedOutput: '3' },
      { id: 'java-ch12-p4', difficulty: 'Medium', title: 'Move Zeros to End', prompt: 'Shift non-zero items forward preserving order.', banglaHint: '`w` রাইট-পয়েন্টার রেখে অ-শূন্য মান অদলবদল করো।', starterCode: `import java.util.Scanner;\npublic class Main { public static void main(String[] args){ Scanner sc=new Scanner(System.in); int n=sc.nextInt(); int[] a=new int[n]; for(int i=0;i<n;i++)a[i]=sc.nextInt(); int w=0; for(int r=0;r<n;r++) if(a[r]!=0){int t=a[w];a[w]=a[r];a[r]=t;w++;} StringBuilder sb=new StringBuilder(); for(int i=0;i<n;i++){if(i>0)sb.append(' '); sb.append(a[i]);} System.out.println(sb); } }`, sampleStdin: '5\n0 1 0 3 12', expectedOutput: '1 3 12 0 0' },
      { id: 'java-ch12-p5', difficulty: 'Hard', title: 'Container With Most Water', prompt: 'Compute max `Math.min(h[l], h[r]) * (r - l)`.', banglaHint: 'ছোট উচ্চতার প্রান্তটি ভেতরের দিকে সরাও।', starterCode: `import java.util.Scanner;\npublic class Main { public static void main(String[] args){ Scanner sc=new Scanner(System.in); int n=sc.nextInt(); long[] h=new long[n]; for(int i=0;i<n;i++)h[i]=sc.nextLong(); int l=0,r=n-1; long best=0; while(l<r){best=Math.max(best,Math.min(h[l],h[r])*(r-l)); if(h[l]<h[r])l++; else r--;} System.out.println(best); } }`, sampleStdin: '5\n1 8 6 2 5', expectedOutput: '15' },
    ],
    miniBuild: {
      title: 'Mini-Build: O(N) Max K-Window Sliding Engine',
      description: 'Read N, K and N longs, finding maximum K-window sum cleanly in O(N) time.',
      banglaGoal: 'স্লাইডিং উইন্ডো ও `long` যোগফল দিয়ে `O(N)` সময়ে `K` দৈর্ঘ্যের সর্বোচ্চ সাব-অ্যারে সাম বের করো।',
      combinesChapters: 'Java Ch 1–12',
      starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt(), k = sc.nextInt();
        long[] a = new long[n];
        for (int i = 0; i < n; i++) a[i] = sc.nextLong();
        long win = 0;
        for (int i = 0; i < k; i++) win += a[i];
        long best = win;
        for (int i = k; i < n; i++) {
            win += a[i] - a[i - k];
            best = Math.max(best, win);
        }
        System.out.println(best);
    }
}`,
      sampleStdin: '5 3\n5 2 8 1 9',
      expectedOutput: '18',
    },
    starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt(), k = sc.nextInt();
        long[] a = new long[n];
        for (int i = 0; i < n; i++) a[i] = sc.nextLong();
        long win = 0;
        for (int i = 0; i < k; i++) win += a[i];
        long best = win;
        for (int i = k; i < n; i++) {
            win += a[i] - a[i - k];
            best = Math.max(best, win);
        }
        System.out.println(best);
    }
}`,
    sampleStdin: '5 3\n5 2 8 1 9',
    expectedSampleOutput: '18',
    testCases: [
      { id: 'java12-t1', input: '5 3\n5 2 8 1 9', expectedOutput: '18' },
      { id: 'java12-t2', input: '4 2\n4 1 3 7', expectedOutput: '10', isHidden: true },
    ],
  },
  13: {
    chapterNumber: 13,
    title: 'Java Chapter 13 (Java 21+): Prefix Sums & Difference Arrays',
    banglaTitle: 'Java অধ্যায় ১৩ (Java 21+): প্রিফিক্স সাম ও ডিফারেন্স অ্যারে (CP গেম-চেঞ্জার)',
    subtitle: '1-based long[] prefix arrays pref[r] - pref[l - 1], StringBuilder fast output, and O(1) difference array updates.',
    zeroIntuition: {
      plainEnglishStory:
        'Re-summing subarrays across `Q = 10^5` range queries turns linear work into `O(N * Q)` Time Limit Exceeded. In Java, building a **1-based `long[]` Prefix Sum Array** `pref = new long[n + 1]` computes cumulative totals `pref[i] = pref[i - 1] + x` in one `O(N)` pass so any `[L, R]` range sum takes one `O(1)` subtraction: `pref[r] - pref[l - 1]`.\n\nPair this with `StringBuilder` batch output (so $10^5$ `System.out.println` calls don’t bottleneck stdout) and a **Difference Array** `long[n + 2]` (`diff[l] += v; diff[r + 1] -= v`) to solve heavy interval update problems effortlessly.',
      asciiFlowchart: `a (1-based):   [ _,  3,  2,  5,  1 ]
pref (long[]): [ 0,  3,  5, 10, 11 ]  --> sum(2..4) = pref[4] - pref[1] = 8 (O(1))
diff[n + 2]:   diff[l] += v; diff[r + 1] -= v  --> single running sum sweep!`,
      pseudocode: [
        '1. ALLOCATE 1-based long[] pref = new long[n + 1] (pref[0] == 0)',
        '2. POPULATE pref[i] = pref[i - 1] + x in one O(N) loop',
        '3. ANSWER each [L, R] query via pref[r] - pref[l - 1] appended to StringBuilder',
        '4. MARK interval increments [L, R] += V in diff[l] += V, diff[r + 1] -= V',
      ],
      banglaZeroToHero: {
        analogyTitle: 'লম্বা খাতার ক্রমযোজিত পাতা ও দ্রুত আউটপুট বাফার',
        explanation:
          'ধরো ১ লাখ কুয়েরির প্রতিটি বললো `L` থেকে `R` পর্যন্ত সংখ্যার যোগফল দাও। প্রতিবার লুপ ঘুরিয়ে যোগ করলে `10^10` ধাপে TLE আসবেই! জাভাতে এর আদর্শ সমাধান হলো ১-বেসড `long[] pref = new long[n + 1]` তৈরি করা, যেখানে `pref[0] = 0` থাকে এবং `pref[i] = pref[i - 1] + x` জমা হয়। তখন যেকোনো `[L, R]` রেঞ্জের যোগফল শুধু `pref[r] - pref[l - 1]` করলেই `O(1)` সময়ে বের হয়! মনে রাখবে `int[]` নিলে $10^5$টি বড় সংখ্যার যোগফলে সহজেই ৩২-বিট ওভারফ্লো হবে—তাই অবশ্যই `long[]` ব্যবহার করতে হবে। এছাড়া ১ লাখ উত্তর সরাসরি `System.out.println` দিয়ে প্রিন্ট করলে ফ্লাশ করার সময় নষ্ট হয়; তার চেয়ে `StringBuilder`-এ জমা করে শেষে একবার `System.out.print(sb)` করাই জাভা প্রোদের নিয়ম। অন্যদিকে অনেকগুলো রেঞ্জে `+V` যোগ করতে চাইলে `long[] diff = new long[n + 2]` নিয়ে `diff[l] += v; diff[r + 1] -= v` করে শেষে একবার প্রিফিক্স যোগ চালালেই `O(N + U)` সময়ে কাজ শেষ।',
        everydayExample:
          'প্রতিদিনের মোট বিক্রির ক্রমযোজিত খাতা রাখলে যেকোনো ১৫ দিন থেকে ২৫ দিনের মোট বিক্রি মাত্র দুটি সংখ্যার বিয়োগেই মেলে।',
        keyTakeaways: [
          '১-বেসড `long[] pref = new long[n + 1]` ওভারফ্লো এবং `l = 1`-এ `-1` ইনডেক্স ক্র্যাশ দুটোই বাঁচায়।',
          'বেশি সংখ্যক কুয়েরির উত্তর `StringBuilder`-এ জমা করে শেষে একবার প্রিন্ট করা অনেক দ্রুত।',
          'ডিফারেন্স অ্যারে `new long[n + 2]` নিলে `diff[r + 1]` কখনোই `ArrayIndexOutOfBoundsException` দেয় না।',
        ],
      },
    },
    topics: [
      {
        id: 'java-ch-13-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: '1-Based long[] Prefix Array & Instant Range Queries',
        englishParagraphs: [
          'Sizing `pref = new long[n + 1]` gives slot `0` as zero automatically in Java.',
          'Any `[L, R]` query resolves cleanly in one subtraction without conditional edges.',
        ],
        banglaParagraphs: [
          'জাভাতে `new long[n + 1]` তৈরি করলেই `pref[0]` স্বয়ংক্রিয়ভাবে `0` থাকে।',
          '`long` ব্যবহারে বড় যোগফল ওভারফ্লো থেকে মুক্ত থাকে।',
        ],
        memoryDiagram: `a={3,2,5,1} -> pref={0,3,5,10,11} -> sum(2..4)=8`,
        code: `public class Main {
    public static void main(String[] args) {
        long[] a = {3, 2, 5, 1};
        int n = a.length;
        long[] pref = new long[n + 1];
        for (int i = 1; i <= n; i++) pref[i] = pref[i - 1] + a[i - 1];
        System.out.println("sum(2..4)=" + (pref[4] - pref[1]));
        System.out.println("sum(1..3)=" + (pref[3] - pref[0]));
    }
}`,
        stdin: '',
        expectedOutput: 'sum(2..4)=8\nsum(1..3)=10',
        lineByLine: [
          { lineNumber: 'Line 5', codeSnippet: 'long[] pref = new long[n + 1];', whatItMeans: 'Allocates 1-based 64-bit cumulative sum array.', whyItIsThere: 'Prevents 32-bit int overflow and index -1 errors.', ifDeletedError: 'pref undefined.' },
        ],
      },
      {
        id: 'java-ch-13-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Fast Q Queries With StringBuilder Batch Output',
        englishParagraphs: [
          'Reads `n, q`, accumulates `pref` on the fly without storing raw `a`, and batches query answers in a `StringBuilder`.',
          'Runs cleanly in `O(N + Q)` time.',
        ],
        banglaParagraphs: [
          'সরাসরি ইনপুট পড়তে পড়তেই `pref` বানানো হয়েছে এবং `StringBuilder`-এ কুয়েরি উত্তর জমা করে প্রিন্ট করা হয়েছে।',
          'বড় টেস্টকেসে I/O গতি বহু গুণ বাড়ে।',
        ],
        memoryDiagram: `pref={0,2,6,7,12} -> q(2,4)=10, q(1,3)=7`,
        code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt(), q = sc.nextInt();
        long[] pref = new long[n + 1];
        for (int i = 1; i <= n; i++) pref[i] = pref[i - 1] + sc.nextLong();
        StringBuilder sb = new StringBuilder();
        while (q-- > 0) {
            int l = sc.nextInt(), r = sc.nextInt();
            sb.append(pref[r] - pref[l - 1]).append('\\n');
        }
        System.out.print(sb);
    }
}`,
        stdin: '4 2\n2 4 1 5\n2 4\n1 3',
        expectedOutput: '10\n7',
        lineByLine: [
          { lineNumber: 'Line 13', codeSnippet: 'sb.append(pref[r] - pref[l - 1]).append(\'\\n\');', whatItMeans: 'Computes range sum in O(1) and buffers output line.', whyItIsThere: 'Avoids slow per-line console flushing.', ifDeletedError: 'Outputs nothing.' },
        ],
      },
      {
        id: 'java-ch-13-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'O(1) Range Increments Using Difference Array',
        englishParagraphs: [
          'Marks `[l, r] += v` via `diff[l] += v` and `diff[r + 1] -= v` in an `n + 2` array.',
          'A single sweep restores every element’s final total.',
        ],
        banglaParagraphs: [
          '`diff` অ্যারের সাইজ `n + 2` নিয়ে `[l, r]` আপডেটের জন্য দুটি প্রান্তে চিহ্ন দিয়ে শেষে একবার প্রিফিক্স সাম চালানো হয়েছে।',
          'সব রেঞ্জ আপডেট `O(U + N)` সময়ে শেষ হয়।',
        ],
        memoryDiagram: `[1..3]+=2, [2..5]+=3 -> 2 5 5 3 3`,
        code: `public class Main {
    public static void main(String[] args) {
        int n = 5;
        long[] diff = new long[n + 2];
        int[][] ops = {{1, 3, 2}, {2, 5, 3}};
        for (int[] op : ops) {
            diff[op[0]] += op[2];
            diff[op[1] + 1] -= op[2];
        }
        long run = 0;
        StringBuilder sb = new StringBuilder();
        for (int i = 1; i <= n; i++) {
            run += diff[i];
            if (i > 1) sb.append(' ');
            sb.append(run);
        }
        System.out.println(sb);
    }
}`,
        stdin: '',
        expectedOutput: '2 5 5 3 3',
        lineByLine: [
          { lineNumber: 'Line 8', codeSnippet: 'diff[op[1] + 1] -= op[2];', whatItMeans: 'Stops interval delta past right bound r.', whyItIsThere: 'Requires size n + 2 when r == n.', ifDeletedError: 'Range boost persists to end of array.' },
        ],
      },
      {
        id: 'java-ch-13-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'int[] Overflow & ArrayIndexOutOfBounds vs Equilibrium Index',
        englishParagraphs: [
          'Using `int[]` for prefix sums or allocating `diff` with size `n + 1` crashes or overflows on contest constraints.',
          'With 1-based `long[]`, comparing left prefix `p[i - 1]` vs right suffix `p[n] - p[i]` finds pivot indices cleanly.',
        ],
        banglaParagraphs: [
          '`int[]` ওভারফ্লো হয় এবং `new long[n + 1]` ডিফারেন্স অ্যারেতে `r == n` হলে `ArrayIndexOutOfBoundsException` দেয়!',
          '`long[]` প্রিফিক্স দিয়ে বাম-ডান সমান যোগফলের পিভট সহজেই মেলে।',
        ],
        memoryDiagram: `{1,7,3,6,5,6} -> pivot=3`,
        code: `public class Main {
    public static void main(String[] args) {
        long[] a = {1, 7, 3, 6, 5, 6};
        int n = a.length;
        long[] p = new long[n + 1];
        for (int i = 1; i <= n; i++) p[i] = p[i - 1] + a[i - 1];
        int pivot = -1;
        for (int i = 1; i <= n; i++) {
            if (p[i - 1] == p[n] - p[i]) { pivot = i - 1; break; }
        }
        System.out.println("pivot=" + pivot);
    }
}`,
        stdin: '',
        expectedOutput: 'pivot=3',
        lineByLine: [
          { lineNumber: 'Line 9', codeSnippet: 'if (p[i - 1] == p[n] - p[i])', whatItMeans: 'Matches left prefix sum against right suffix sum in O(1).', whyItIsThere: 'Solves pivot search cleanly in linear time.', ifDeletedError: 'pivot remains -1.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 5', codeSnippet: 'long[] pref = new long[n + 1];', whatItMeans: 'Allocates 1-based 64-bit cumulative array initialized to zeros.', whyItIsThere: 'Eliminates L=1 index edge cases and 32-bit overflow.', ifDeletedError: 'pref undeclared.' },
      { lineNumber: 'Line 6', codeSnippet: 'for (int i = 1; i <= n; i++) pref[i] = pref[i - 1] + a[i - 1];', whatItMeans: 'Precomputes prefix sums in O(N) time.', whyItIsThere: 'Powers O(1) interval sum subtraction.', ifDeletedError: 'Queries return 0.' },
      { lineNumber: 'Line 7', codeSnippet: 'System.out.println("sum(2..4)=" + (pref[4] - pref[1]));', whatItMeans: 'Evaluates 1-based sum [2..4] with one subtraction.', whyItIsThere: 'Avoids linear re-scanning.', ifDeletedError: 'No output.' },
    ],
    dryRunTable: [
      { step: 1, state: 'pref[0] = 0', memoryOrStack: 'pref={0,0,0,0,0}', note: 'JVM zeroes new long[]' },
      { step: 2, state: 'i=1..2', memoryOrStack: 'pref[1]=3, pref[2]=5', note: '3 + 2' },
      { step: 3, state: 'i=3..4', memoryOrStack: 'pref[3]=10, pref[4]=11', note: 'Cumulative array ready' },
      { step: 4, state: 'pref[4] - pref[1]', memoryOrStack: '11 - 3 = 8', note: 'Instant O(1) result' },
    ],
    harryBugTraps: [
      { title: 'Trap 1: Using int[] Instead of long[] for Prefix Sums', brokenCode: `int[] pref = new int[n + 1]; // Overflows past 2.14e9!`, fixedCode: `long[] pref = new long[n + 1];`, whyItBreaks: 'Sum of 10^5 large integers wraps negative in 32-bit signed int.' },
      { title: 'Trap 2: Flushing System.out.println 10^5 Times', brokenCode: `while (q-- > 0) System.out.println(ans); // Slow I/O TLE!`, fixedCode: `sb.append(ans).append('\\n'); ... System.out.print(sb);`, whyItBreaks: 'Synchronized per-line PrintStream locking adds huge latency on large queries.' },
      { title: 'Trap 3: Allocating diff With Size n + 1', brokenCode: `long[] diff = new long[n + 1]; diff[r + 1] -= v; // ArrayIndexOutOfBoundsException!`, fixedCode: `long[] diff = new long[n + 2];`, whyItBreaks: 'When r == n, r + 1 is n + 1.' },
    ],
    practiceSheet: [
      { id: 'java-ch13-p1', difficulty: 'Easy', title: '1-Based Range Sum Queries', prompt: 'Given N, Q, array, and Q pairs (l, r), print each range sum in O(1).', banglaHint: '`long[] pref = new long[n + 1]` দিয়ে `pref[r] - pref[l - 1]` বের করো।', starterCode: `import java.util.Scanner;\npublic class Main { public static void main(String[] args){ Scanner sc=new Scanner(System.in); int n=sc.nextInt(),q=sc.nextInt(); long[] p=new long[n+1]; for(int i=1;i<=n;i++)p[i]=p[i-1]+sc.nextLong(); StringBuilder sb=new StringBuilder(); while(q-->0){int l=sc.nextInt(),r=sc.nextInt(); sb.append(p[r]-p[l-1]).append('\\n');} System.out.print(sb); } }`, sampleStdin: '4 2\n2 4 1 5\n2 4\n1 3', expectedOutput: '10\n7' },
      { id: 'java-ch13-p2', difficulty: 'Easy', title: 'Pivot / Equilibrium Index', prompt: 'Find first 0-based index where left sum equals right sum (`-1` if none).', banglaHint: '`p[i - 1] == p[n] - p[i]` পরীক্ষা করো।', starterCode: `import java.util.Scanner;\npublic class Main { public static void main(String[] args){ Scanner sc=new Scanner(System.in); int n=sc.nextInt(); long[] p=new long[n+1]; for(int i=1;i<=n;i++)p[i]=p[i-1]+sc.nextLong(); int ans=-1; for(int i=1;i<=n;i++) if(p[i-1]==p[n]-p[i]){ans=i-1;break;} System.out.println(ans); } }`, sampleStdin: '6\n1 7 3 6 5 6', expectedOutput: '3' },
      { id: 'java-ch13-p3', difficulty: 'Medium', title: 'Difference Array Updates', prompt: 'Apply U updates `(l, r, v)` on zero array of size N and print final state.', banglaHint: '`long[] diff = new long[n + 2]` নিয়ে `diff[l] += v; diff[r + 1] -= v;` করো।', starterCode: `import java.util.Scanner;\npublic class Main { public static void main(String[] args){ Scanner sc=new Scanner(System.in); int n=sc.nextInt(),u=sc.nextInt(); long[] d=new long[n+2]; while(u-->0){int l=sc.nextInt(),r=sc.nextInt(); long v=sc.nextLong(); d[l]+=v; d[r+1]-=v;} long run=0; StringBuilder sb=new StringBuilder(); for(int i=1;i<=n;i++){run+=d[i]; if(i>1)sb.append(' '); sb.append(run);} System.out.println(sb); } }`, sampleStdin: '5 2\n1 3 2\n2 5 3', expectedOutput: '2 5 5 3 3' },
      { id: 'java-ch13-p4', difficulty: 'Medium', title: 'Running Prefix Maximum', prompt: 'Output cumulative maximum after each element.', banglaHint: '`mx = Math.max(mx, x)` আপডেট করে `StringBuilder`-এ রাখো।', starterCode: `import java.util.Scanner;\npublic class Main { public static void main(String[] args){ Scanner sc=new Scanner(System.in); int n=sc.nextInt(); long mx=0; StringBuilder sb=new StringBuilder(); for(int i=0;i<n;i++){long x=sc.nextLong(); mx=(i==0?x:Math.max(mx,x)); if(i>0)sb.append(' '); sb.append(mx);} System.out.println(sb); } }`, sampleStdin: '5\n3 1 5 2 6', expectedOutput: '3 3 5 5 6' },
      { id: 'java-ch13-p5', difficulty: 'Hard', title: 'Subarrays Divisible by K', prompt: 'Count non-empty subarrays whose sum is divisible by `K`.', banglaHint: '`((s + x) % k + k) % k` রিমাইন্ডার ফ্রিকোয়েন্সি গোনো।', starterCode: `import java.util.Scanner;\npublic class Main { public static void main(String[] args){ Scanner sc=new Scanner(System.in); int n=sc.nextInt(); int k=sc.nextInt(); long[] cnt=new long[k]; cnt[0]=1; int s=0; long ans=0; for(int i=0;i<n;i++){long x=sc.nextLong(); s=(int)(((s+x)%k+k)%k); ans+=cnt[s]; cnt[s]++;} System.out.println(ans); } }`, sampleStdin: '5 3\n4 5 0 2 1', expectedOutput: '5' },
    ],
    miniBuild: {
      title: 'Mini-Build: O(N + Q) Prefix Range Query Engine',
      description: 'Build a 1-based long[] prefix array and answer Q interval queries in O(1) via StringBuilder.',
      banglaGoal: '১-বেসড `long[]` প্রিফিক্স সাম ও `StringBuilder` দিয়ে দ্রুত সব রেঞ্জ কুয়েরির উত্তর দাও।',
      combinesChapters: 'Java Ch 1–13',
      starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt(), q = sc.nextInt();
        long[] pref = new long[n + 1];
        for (int i = 1; i <= n; i++) pref[i] = pref[i - 1] + sc.nextLong();
        StringBuilder sb = new StringBuilder();
        while (q-- > 0) {
            int l = sc.nextInt(), r = sc.nextInt();
            sb.append(pref[r] - pref[l - 1]).append('\\n');
        }
        System.out.print(sb);
    }
}`,
      sampleStdin: '4 2\n2 4 1 5\n2 4\n1 3',
      expectedOutput: '10\n7',
    },
    starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt(), q = sc.nextInt();
        long[] pref = new long[n + 1];
        for (int i = 1; i <= n; i++) pref[i] = pref[i - 1] + sc.nextLong();
        StringBuilder sb = new StringBuilder();
        while (q-- > 0) {
            int l = sc.nextInt(), r = sc.nextInt();
            sb.append(pref[r] - pref[l - 1]).append('\\n');
        }
        System.out.print(sb);
    }
}`,
    sampleStdin: '4 2\n2 4 1 5\n2 4\n1 3',
    expectedSampleOutput: '10\n7',
    testCases: [
      { id: 'java13-t1', input: '4 2\n2 4 1 5\n2 4\n1 3', expectedOutput: '10\n7' },
      { id: 'java13-t2', input: '3 1\n10 20 30\n1 3', expectedOutput: '60', isHidden: true },
    ],
  },
  14: {
    chapterNumber: 14,
    title: 'Java Chapter 14 (Java 21+): Strings, StringBuilder & Manipulation',
    banglaTitle: 'Java অধ্যায় ১৪ (Java 21+): স্ট্রিং, StringBuilder ও ক্যারেক্টার অ্যারে',
    subtitle: 'Immutable String vs mutable StringBuilder, == vs .equals() trap, char[] operations, and O(N) anagram counts.',
    zeroIntuition: {
      plainEnglishStory:
        'In the JVM, `String` objects are **immutable** and stored inside the String Pool when declared as literals. Consequently, writing `ans += ch` inside a loop allocates and copies a brand-new `String` object every iteration (`O(N^2)` GC pressure!). Using `StringBuilder` provides a mutable `char[]`/`byte[]` buffer so `.append(ch)` runs in `O(1)` amortized time.\n\nTwo classic Java pitfalls: NEVER compare string contents with `==` (that checks object memory references, not text—always use `.equals()`), and convert lowercase letters using `s.charAt(i) - \'a\'` into `int[26]` for `O(N)` anagram/frequency checks.',
      asciiFlowchart: `String a = new String("hi"); String b = "hi";
   a == b        --> FALSE (different heap vs pool references!)
   a.equals(b)   --> TRUE  (compares character contents!)
   StringBuilder --> mutable char buffer (O(1) append)`,
      pseudocode: [
        '1. COMPARE String contents strictly with a.equals(b), never ==',
        '2. CONSTRUCT dynamic text with StringBuilder instead of String += in loops',
        '3. INDEX chars via s.charAt(i) or mutate after s.toCharArray()',
        '4. COUNT lowercase letters in int[26] using ch - \'a\' in O(N)',
      ],
      banglaZeroToHero: {
        analogyTitle: 'সিলগালা করা চিঠি (String) বনাম রাবার-পেন্সিল প্যাড (StringBuilder)',
        explanation:
          'জাভাতে `String` হলো একদম **Immutable** বা স্থির—একবার তৈরি হলে তার ভেতরের কোনো অক্ষর আর বদলানো যায় না। তাই লুপের ভেতরে যদি `ans += ch` লেখো, তাহলে প্রতিটি ধাপে জাভা একটি করে একদম নতুন `String` অবজেক্ট তৈরি করে, ফলে ১ লাখ অক্ষরে `O(N^2)` সময় লেগে টাইম লিমিট খায়! এই সমস্যার সমাধান হলো `StringBuilder`—যা একটি পরিবর্তনযোগ্য বাফার এবং `.append(ch)` করে `O(1)` সময়ে লেখা জোড়া লাগায়। জাভাতে আরেকটি বিখ্যাত ফাঁদ হলো দুটি স্ট্রিং তুলনা করা: `a == b` কেবল র‍্যামে দুটি অবজেক্টের ঠিকানা সমান কি না তা দেখে; ভেতরের লেখা সমান কি না তা দেখতে অবশ্যই `a.equals(b)` ব্যবহার করতে হবে! বর্ণমালা গণনার জন্য `int[] freq = new int[26]` নিয়ে `freq[c - \'a\']++` করলেই `O(N)` সময়ে অ্যানাগ্রাম বা ইউনিক অক্ষর পাওয়া যায়। পাশাপাশি `sc.nextInt()`-এর পর পুরো লাইন পড়তে চাইলে বাফারের নিউলাইন সরাতে একটি অতিরিক্ত `sc.nextLine()` কল করতে হয়।',
        everydayExample:
          'সিলগালা করা খামে চিঠি বদলানো যায় না (`String`), কিন্তু নোটপ্যাডে (`StringBuilder`) সহজেই নতুন লাইন লিখে শেষে একবারে পাঠানো যায়।',
        keyTakeaways: [
          'কখনো `str1 == str2` লিখবে না—সবসময় `str1.equals(str2)` লিখবে!',
          'লুপে স্ট্রিং বানাতে অবশ্যই `StringBuilder` ব্যবহার করবে।',
          '`s.charAt(i) - \'a\'` দিয়ে ২৬ ঘরের ফ্রিকোয়েন্সি অ্যারে বানিয়ে `O(N)` অ্যানাগ্রাম সমাধান করা যায়।',
        ],
      },
    },
    topics: [
      {
        id: 'java-ch-14-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Case-Insensitive Two-Pointer Palindrome Check',
        englishParagraphs: [
          'Call `s.toLowerCase()` once, then walk opposite endpoints `l` and `r` using `s.charAt()`.',
          'Runs in `O(N)` with early exit on first mismatch.',
        ],
        banglaParagraphs: [
          '`s.toLowerCase()` করে নিয়ে `s.charAt(l++)` ও `s.charAt(r--)` তুলনা করে প্যালিনড্রোম যাচাই করা হয়েছে।',
          'অমিল দেখলেই `break` করে বেরিয়ে যায়।',
        ],
        memoryDiagram: `"RaceCar" -> "racecar" -> PALINDROME`,
        code: `public class Main {
    public static void main(String[] args) {
        String s = "RaceCar".toLowerCase();
        int l = 0, r = s.length() - 1;
        boolean ok = true;
        while (l < r) {
            if (s.charAt(l++) != s.charAt(r--)) { ok = false; break; }
        }
        System.out.println(s + " -> " + (ok ? "PALINDROME" : "NO"));
    }
}`,
        stdin: '',
        expectedOutput: 'racecar -> PALINDROME',
        lineByLine: [
          { lineNumber: 'Line 7', codeSnippet: 'if (s.charAt(l++) != s.charAt(r--))', whatItMeans: 'Reads outer characters inward using 0-based charAt.', whyItIsThere: 'Verifies symmetry cleanly in O(N).', ifDeletedError: 'Always prints PALINDROME.' },
        ],
      },
      {
        id: 'java-ch-14-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'O(N) Anagram Checker Using int[26]',
        englishParagraphs: [
          'Read two whitespace tokens via `sc.next()`, confirm equal length, and balance an `int[26]` count array.',
          'All zero counts confirm identical multiset of letters.',
        ],
        banglaParagraphs: [
          '`sc.next()` দিয়ে দুটি শব্দ পড়ে সমান দৈর্ঘ্য হলে `int[26]` অ্যারেতে `+1` ও `-1` করে অ্যানাগ্রাম পরীক্ষা করা হয়েছে।',
          'প্রতিটি ঘর `0` হলেই `YES` প্রিন্ট হয়।',
        ],
        memoryDiagram: `"listen" +1 / "silent" -1 -> all zeros => YES`,
        code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        String a = sc.next(), b = sc.next();
        if (a.length() != b.length()) {
            System.out.println("NO");
            return;
        }
        int[] freq = new int[26];
        for (int i = 0; i < a.length(); i++) {
            freq[a.charAt(i) - 'a']++;
            freq[b.charAt(i) - 'a']--;
        }
        boolean ok = true;
        for (int c : freq) if (c != 0) ok = false;
        System.out.println(ok ? "YES" : "NO");
    }
}`,
        stdin: 'listen\nsilent',
        expectedOutput: 'YES',
        lineByLine: [
          { lineNumber: 'Line 14', codeSnippet: 'freq[a.charAt(i) - \'a\']++; freq[b.charAt(i) - \'a\']--;', whatItMeans: 'Balances letter frequencies in a single linear loop.', whyItIsThere: 'O(N) anagram verification without sorting.', ifDeletedError: 'Always outputs YES.' },
        ],
      },
      {
        id: 'java-ch-14-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Run-Length Compression via StringBuilder',
        englishParagraphs: [
          'Collect consecutive identical characters and their counts cleanly inside a mutable `StringBuilder`.',
          'Single final `toString()` keeps assembly linear `O(N)`.',
        ],
        banglaParagraphs: [
          'পাশাপাশি একই অক্ষর গুনে `StringBuilder`-এ অ্যাপেন্ড করে `O(N)` সময়ে কম্প্রেস করা হয়েছে।',
          'বারবার `String` কপি হওয়া থেকে মুক্ত থাকে।',
        ],
        memoryDiagram: `"aaabbc" -> sb="a3b2c1"`,
        code: `public class Main {
    public static void main(String[] args) {
        String s = "aaabbc";
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < s.length(); ) {
            int j = i;
            while (j < s.length() && s.charAt(j) == s.charAt(i)) j++;
            sb.append(s.charAt(i)).append(j - i);
            i = j;
        }
        System.out.println(sb);
    }
}`,
        stdin: '',
        expectedOutput: 'a3b2c1',
        lineByLine: [
          { lineNumber: 'Line 8', codeSnippet: 'sb.append(s.charAt(i)).append(j - i);', whatItMeans: 'Appends char and run length directly into internal char buffer.', whyItIsThere: 'O(1) amortized append without temporary strings.', ifDeletedError: 'Output stays empty.' },
        ],
      },
      {
        id: 'java-ch-14-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: '== Reference Comparison Trap vs .equals() Content Match',
        englishParagraphs: [
          '`new String("ok") == "ok"` evaluates `false` because two separate objects exist at distinct heap/pool addresses!',
          'Always compare Java strings using `a.equals(b)` (or `Objects.equals(a, b)` when nullable).',
        ],
        banglaParagraphs: [
          '`new String("ok") == "ok"` করলে `false` আসে, কারণ মেমোরি ঠিকানা আলাদা!',
          'ভেতরের টেক্সট মেলাতে সবসময় `a.equals(b)` ব্যবহার করতে হয়।',
        ],
        memoryDiagram: `new String("ok") == "ok" -> false | .equals("ok") -> true`,
        code: `public class Main {
    public static void main(String[] args) {
        String a = new String("argon");
        String b = "argon";
        System.out.println("refEq=" + (a == b) + " valEq=" + a.equals(b));
    }
}`,
        stdin: '',
        expectedOutput: 'refEq=false valEq=true',
        lineByLine: [
          { lineNumber: 'Line 5', codeSnippet: 'a.equals(b)', whatItMeans: 'Compares character sequences value-by-value.', whyItIsThere: '== compares memory pointers, failing on runtime-constructed strings.', ifDeletedError: 'Cannot demonstrate value vs reference equality.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 3', codeSnippet: 'String s = "RaceCar".toLowerCase();', whatItMeans: 'Creates lowercase copy since Java String is immutable.', whyItIsThere: 'Ensures case-insensitive comparison.', ifDeletedError: 's undeclared.' },
      { lineNumber: 'Line 4', codeSnippet: 'int l = 0, r = s.length() - 1;', whatItMeans: 'Sets opposing index boundaries.', whyItIsThere: 'Covers whole string in one pass.', ifDeletedError: 'Indices missing.' },
      { lineNumber: 'Line 7', codeSnippet: 'if (s.charAt(l++) != s.charAt(r--))', whatItMeans: 'Compares mirroring characters and advances both pointers.', whyItIsThere: 'O(N) palindrome test.', ifDeletedError: 'Always prints true.' },
    ],
    dryRunTable: [
      { step: 1, state: 'toLowerCase()', memoryOrStack: 's = "racecar"', note: 'New pooled/heap string' },
      { step: 2, state: 'l=0, r=6', memoryOrStack: "'r' == 'r'", note: 'l=1, r=5' },
      { step: 3, state: 'l=1..2', memoryOrStack: "'a'=='a', 'c'=='c'", note: 'l=3, r=3' },
      { step: 4, state: 'done', memoryOrStack: 'ok = true', note: 'Outputs PALINDROME' },
    ],
    harryBugTraps: [
      { title: 'Trap 1: Comparing Java Strings With ==', brokenCode: `if (input == "yes") { ... } // Checks pointer equality!`, fixedCode: `if ("yes".equals(input)) { ... }`, whyItBreaks: 'Scanner input creates fresh String instances on the heap whose reference differs from literals.' },
      { title: 'Trap 2: Concatenating String += Inside Loop', brokenCode: `String out = ""; for (char c : arr) out += c; // O(N^2)!`, fixedCode: `StringBuilder sb = new StringBuilder(); for (char c : arr) sb.append(c);`, whyItBreaks: 'Each += allocates a new char array and copies all previous characters.' },
      { title: 'Trap 3: Leftover Newline After sc.nextInt()', brokenCode: `int n = sc.nextInt(); String line = sc.nextLine(); // Reads ""!`, fixedCode: `int n = sc.nextInt(); sc.nextLine(); String line = sc.nextLine();`, whyItBreaks: 'nextInt() stops before the newline character, leaving it for the first nextLine().' },
    ],
    practiceSheet: [
      { id: 'java-ch14-p1', difficulty: 'Easy', title: 'Reverse Word via StringBuilder', prompt: 'Read a single word and output it reversed.', banglaHint: '`new StringBuilder(s).reverse()` ব্যবহার করো।', starterCode: `import java.util.Scanner;\npublic class Main { public static void main(String[] args){ Scanner sc=new Scanner(System.in); if(sc.hasNext()) System.out.println(new StringBuilder(sc.next()).reverse()); } }`, sampleStdin: 'argon', expectedOutput: 'nogra' },
      { id: 'java-ch14-p2', difficulty: 'Easy', title: 'Count Vowels in Line', prompt: 'Read a line of text and print count of vowels (`a, e, i, o, u`).', banglaHint: '`toLowerCase()` করে প্রতিটি অক্ষর ভাওয়েল কি না দেখো।', starterCode: `import java.util.Scanner;\npublic class Main { public static void main(String[] args){ Scanner sc=new Scanner(System.in); String s=sc.nextLine().toLowerCase(); int c=0; for(char ch:s.toCharArray()) if("aeiou".indexOf(ch)>=0) c++; System.out.println(c); } }`, sampleStdin: 'Hello Argon', expectedOutput: '4' },
      { id: 'java-ch14-p3', difficulty: 'Medium', title: 'Anagram Check (int[26])', prompt: 'Read two lowercase strings and print `YES` if anagrams else `NO`.', banglaHint: '`int[] f = new int[26]`-এ `+1` ও `-1` করো।', starterCode: `import java.util.Scanner;\npublic class Main { public static void main(String[] args){ Scanner sc=new Scanner(System.in); String a=sc.next(),b=sc.next(); if(a.length()!=b.length()){System.out.println("NO");return;} int[] f=new int[26]; for(int i=0;i<a.length();i++){f[a.charAt(i)-'a']++;f[b.charAt(i)-'a']--;} boolean ok=true; for(int x:f) if(x!=0) ok=false; System.out.println(ok?"YES":"NO"); } }`, sampleStdin: 'listen\nsilent', expectedOutput: 'YES' },
      { id: 'java-ch14-p4', difficulty: 'Medium', title: 'Run-Length Compression', prompt: 'Compress consecutive matching chars via `StringBuilder` (`aaabbc` -> `a3b2c1`).', banglaHint: '`StringBuilder`-এ অক্ষর ও দৈর্ঘ্য অ্যাপেন্ড করো।', starterCode: `import java.util.Scanner;\npublic class Main { public static void main(String[] args){ Scanner sc=new Scanner(System.in); String s=sc.next(); StringBuilder sb=new StringBuilder(); for(int i=0;i<s.length();){int j=i; while(j<s.length()&&s.charAt(j)==s.charAt(i))j++; sb.append(s.charAt(i)).append(j-i); i=j;} System.out.println(sb); } }`, sampleStdin: 'aaabbc', expectedOutput: 'a3b2c1' },
      { id: 'java-ch14-p5', difficulty: 'Hard', title: 'First Non-Repeating Char Index', prompt: 'Find 0-based index of first unique lowercase char (`-1` if none).', banglaHint: '`int[26]` কাউন্ট নিয়ে দ্বিতীয় লুপে `f[s.charAt(i) - \'a\'] == 1` খুঁজো।', starterCode: `import java.util.Scanner;\npublic class Main { public static void main(String[] args){ Scanner sc=new Scanner(System.in); String s=sc.next(); int[] f=new int[26]; for(int i=0;i<s.length();i++)f[s.charAt(i)-'a']++; int ans=-1; for(int i=0;i<s.length();i++) if(f[s.charAt(i)-'a']==1){ans=i;break;} System.out.println(ans); } }`, sampleStdin: 'loveleetcode', expectedOutput: '2' },
    ],
    miniBuild: {
      title: 'Mini-Build: O(N) Anagram & Frequency Inspector',
      description: 'Compare two lowercase strings using a 26-letter frequency array in O(N) time.',
      banglaGoal: '`int[26]` ফ্রিকোয়েন্সি অ্যারে ব্যবহার করে `O(N)` সময়ে অ্যানাগ্রাম যাচাই করো।',
      combinesChapters: 'Java Ch 1–14',
      starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        String a = sc.next(), b = sc.next();
        if (a.length() != b.length()) {
            System.out.println("NO");
            return;
        }
        int[] freq = new int[26];
        for (int i = 0; i < a.length(); i++) {
            freq[a.charAt(i) - 'a']++;
            freq[b.charAt(i) - 'a']--;
        }
        boolean ok = true;
        for (int c : freq) {
            if (c != 0) ok = false;
        }
        System.out.println(ok ? "YES" : "NO");
    }
}`,
      sampleStdin: 'listen\nsilent',
      expectedOutput: 'YES',
    },
    starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        String a = sc.next(), b = sc.next();
        if (a.length() != b.length()) {
            System.out.println("NO");
            return;
        }
        int[] freq = new int[26];
        for (int i = 0; i < a.length(); i++) {
            freq[a.charAt(i) - 'a']++;
            freq[b.charAt(i) - 'a']--;
        }
        boolean ok = true;
        for (int c : freq) {
            if (c != 0) ok = false;
        }
        System.out.println(ok ? "YES" : "NO");
    }
}`,
    sampleStdin: 'listen\nsilent',
    expectedSampleOutput: 'YES',
    testCases: [
      { id: 'java14-t1', input: 'listen\nsilent', expectedOutput: 'YES' },
      { id: 'java14-t2', input: 'rat\ncar', expectedOutput: 'NO', isHidden: true },
    ],
  },
  15: {
    chapterNumber: 15,
    isMilestoneMerger: true,
    title: 'Java Chapter 15 (Java 21+): Recursion & JVM Call Stack Visualization — Merger 3',
    banglaTitle: 'Java অধ্যায় ১৫ (Java 21+): রিকার্সন ও JVM কল-স্ট্যাক ভিজ্যুয়ালাইজেশন — মার্জার ৩',
    subtitle: 'Milestone Merger 3: JVM stack frames, StackOverflowError, long[] memoization vs O(2^N), and binary modPow.',
    zeroIntuition: {
      plainEnglishStory:
        'Each time a Java method calls itself, the JVM pushes a **Stack Frame** (holding local primitives and object references) onto the thread’s private JVM Stack. Calling down until a **Base Case** unwinds every frame cleanly back toward `main()`.\n\nMissing base cases exhaust the fixed JVM thread stack (~1 MB default), throwing `java.lang.StackOverflowError`—while naive double branching (`fib(n - 1) + fib(n - 2)`) explodes to `O(2^N)`. Caching states inside `long[] memo` (filled with `-1`) collapses exponential trees into linear `O(N)` speed.',
      asciiFlowchart: `JVM Thread Stack:
  [ main() ] -> [ fact(5) ] -> [ fact(4) ] -> ... -> [ fact(1)=1 BASE ]
  Unwinds LIFO popping frames upward -> returns 120 cleanly!`,
      pseudocode: [
        '1. PLACE stopping Base Case first before any recursive invocation',
        '2. PASS index bounds (l, r) instead of copying arrays or String.substring',
        '3. CACHE overlapping recursive states in long[] memo initialized to -1',
        '4. USE long return types for factorials/Fibonacci to avoid 32-bit overflow',
      ],
      banglaZeroToHero: {
        analogyTitle: 'JVM স্ট্যাক ফ্রেমের স্তূপ ও মেমোয়াইজড শর্টকাট',
        explanation:
          'জাভায় কোনো মেথড নিজেই নিজেকে কল করলে প্রতিটি কলের জন্য JVM-এর থ্রেড স্ট্যাকে একটি নতুন **Stack Frame** জমা হয় যেখানে ওই কলের লোকাল ভ্যারিয়েবল থাকে। একদম নিচের **Base Case**-এ (`if (n <= 1) return 1;`) পৌঁছানো মাত্র ওপর থেকে ফ্রেমগুলো খুলে একে একে উত্তর ফিরিয়ে দেয়। যদি Base Case ভুল থাকে বা ১০–১৫ হাজার ধাপের বেশি গভীর হয়, তাহলে থ্রেড স্ট্যাক ভরে `StackOverflowError` ক্র্যাশ ঘটে! আরেকটি জরুরি বিষয়: প্রতি ধাপে `s.substring(1, len-1)` কেটে নতুন স্ট্রিং বানিয়ে রিকার্সন করলে `O(N^2)` মেমোরি নষ্ট হয়; তার বদলে `String s` অপরিবর্তিত রেখে শুধু ইনডেক্স `l` আর `r` পাস করবে। আর `fib(n-1) + fib(n-2)`-এর মতো পুনরাবৃত্তিমূলক ট্রি `O(2^N)` থেকে বাঁচাতে `long[] memo` (প্রথমে `Arrays.fill(memo, -1)`) ব্যবহার করলে প্রতিটি মান মাত্র একবারই হিসাব হয়। অধ্যায় ১ থেকে ১৫ পর্যন্ত সব অ্যারে, স্ট্রিং ও রিকার্সন মিলিয়ে গড়া হয়েছে এই **Milestone Merger 3**।',
        everydayExample:
          'টেলিফোনে বড় কাজের নির্দেশ ছোট সহকারীর কাছে পাঠিয়ে নিচ থেকে চূড়ান্ত রিপোর্ট ফেরত নেওয়া—আর পরিচিত প্রশ্নের উত্তর আগেই নোটবুকে (`memo`) লিখে রাখা!',
        keyTakeaways: [
          'বেস কেস ছাড়া রিকার্সন চালালে জাভায় `StackOverflowError` আসে।',
          '`long[] memo` + `Arrays.fill(memo, -1)` ব্যবহারে `O(2^N)` ফিবোনাচ্চি মুহূর্তেই `O(N)` হয়ে যায়।',
          'রিকার্সিভ মেথডে `substring` না কেটে `int l, int r` ইনডেক্স পাঠানো অনেক দ্রুত ও মেমোরি-সাশ্রয়ী।',
        ],
      },
    },
    topics: [
      {
        id: 'java-ch-15-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Recursive Factorial & JVM Stack Unwind',
        englishParagraphs: [
          'Base case `if (n <= 1) return 1L;` stops recursive stack pushes before multiplying upward.',
          'Using `long` prevents overflow up through `20!`.',
        ],
        banglaParagraphs: [
          '`if (n <= 1) return 1L;` বেস কেস থামানোর পর স্ট্যাক ফ্রেমগুলো একে একে খুলে `120` ফেরত দেয়।',
          '`long` টাইপ রাখায় `20!` পর্যন্ত ওভারফ্লো হয় না।',
        ],
        memoryDiagram: `fact(5) -> 5*4*3*2*1 = 120`,
        code: `public class Main {
    static long fact(int n) {
        if (n <= 1) return 1L;
        return n * fact(n - 1);
    }
    public static void main(String[] args) {
        System.out.println("5!=" + fact(5));
    }
}`,
        stdin: '',
        expectedOutput: '5!=120',
        lineByLine: [
          { lineNumber: 'Line 3', codeSnippet: 'if (n <= 1) return 1L;', whatItMeans: 'Base case stopping recursive stack growth.', whyItIsThere: 'Prevents StackOverflowError.', ifDeletedError: 'Throws java.lang.StackOverflowError.' },
        ],
      },
      {
        id: 'java-ch-15-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Fast Binary Modular Power in O(log e)',
        englishParagraphs: [
          'Halving `e / 2` reduces `e = 10^9` to roughly 30 stack frames cleanly.',
          'Compute `long half = modPow(a, e / 2, m)` ONCE and square it.',
        ],
        banglaParagraphs: [
          'প্রতি ধাপে ঘাত `e / 2` অর্ধেক করায় `10^9` ঘাতও মাত্র ৩০ ফ্রেমে `O(log e)` সময়ে বের হয়।',
          '`half` একবারই কল করে বর্গ করা হয়েছে।',
        ],
        memoryDiagram: `modPow(2, 10, 1000) -> 24`,
        code: `import java.util.Scanner;

public class Main {
    static long modPow(long a, long e, long m) {
        if (e == 0) return 1 % m;
        long half = modPow(a, e / 2, m);
        long res = (half * half) % m;
        if ((e & 1) == 1) res = (res * (a % m)) % m;
        return res;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLong()) {
            System.out.println(modPow(sc.nextLong(), sc.nextLong(), sc.nextLong()));
        }
    }
}`,
        stdin: '2 10 1000',
        expectedOutput: '24',
        lineByLine: [
          { lineNumber: 'Line 6', codeSnippet: 'long half = modPow(a, e / 2, m);', whatItMeans: 'Computes half exponent subproblem once per level.', whyItIsThere: 'Guarantees logarithmic depth and speed.', ifDeletedError: 'Calling modPow twice causes O(e) slowdown.' },
        ],
      },
      {
        id: 'java-ch-15-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Memoized Fibonacci via long[] Cache (O(N))',
        englishParagraphs: [
          'Fill `memo` with `-1` using `Arrays.fill`, then return cached values immediately when `memo[n] != -1`.',
          'Turns exponential recursion into linear `O(N)` execution.',
        ],
        banglaParagraphs: [
          '`Arrays.fill(memo, -1)` দিয়ে শুরু করে প্রতিটি হিসাব সেভ রাখলে ফিবোনাচ্চি `O(N)` সময়ে চলে আসে।',
          'একই উপ-সমস্যা দ্বিতীয়বার হিসাব করতে হয় না।',
        ],
        memoryDiagram: `memo[40] -> 102334155 in O(N)`,
        code: `import java.util.Arrays;

public class Main {
    static long fib(int n, long[] memo) {
        if (n <= 1) return n;
        if (memo[n] != -1) return memo[n];
        return memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
    }
    public static void main(String[] args) {
        int n = 40;
        long[] memo = new long[n + 1];
        Arrays.fill(memo, -1);
        System.out.println("fib(40)=" + fib(n, memo));
    }
}`,
        stdin: '',
        expectedOutput: 'fib(40)=102334155',
        lineByLine: [
          { lineNumber: 'Line 6', codeSnippet: 'if (memo[n] != -1) return memo[n];', whatItMeans: 'Returns cached value immediately without descending again.', whyItIsThere: 'Collapses O(2^N) recursion into O(N).', ifDeletedError: 'fib(40) repeats billions of calls.' },
        ],
      },
      {
        id: 'java-ch-15-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'substring() Copy Trap vs O(1) Frame Index Bounds',
        englishParagraphs: [
          'Passing `s.substring(1, s.length() - 1)` allocates new `String` objects on every frame (`O(N^2)`).',
          'Passing integer indices `l` and `r` shares the exact same immutable `String` reference across all frames.',
        ],
        banglaParagraphs: [
          'প্রতি ধাপে `substring` তৈরি না করে মূল স্ট্রিংয়ের সাথে `int l, int r` ইনডেক্স পাঠালে অহেতুক মেমোরি নষ্ট হয় না।',
          '`l >= r` হলেই বেস কেস `true` রিটার্ন করে।',
        ],
        memoryDiagram: `isPal("madam", 0, 4) -> O(1) per JVM frame`,
        code: `public class Main {
    static boolean isPal(String s, int l, int r) {
        if (l >= r) return true;
        if (s.charAt(l) != s.charAt(r)) return false;
        return isPal(s, l + 1, r - 1);
    }
    public static void main(String[] args) {
        String s = "madam";
        System.out.println(isPal(s, 0, s.length() - 1) ? "YES" : "NO");
    }
}`,
        stdin: '',
        expectedOutput: 'YES',
        lineByLine: [
          { lineNumber: 'Line 2', codeSnippet: 'static boolean isPal(String s, int l, int r) {', whatItMeans: 'Shares String reference while passing primitive l, r indices.', whyItIsThere: 'Avoids O(N^2) substring allocations.', ifDeletedError: 'isPal undefined.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 2', codeSnippet: 'static long fact(int n) {', whatItMeans: 'Static recursive method using 64-bit long return.', whyItIsThere: 'Supports n! safely up to 20!.', ifDeletedError: 'fact missing.' },
      { lineNumber: 'Line 3', codeSnippet: 'if (n <= 1) return 1L;', whatItMeans: 'Base case ending downward recursion.', whyItIsThere: 'Prevents StackOverflowError.', ifDeletedError: 'Infinite recursion crashes JVM.' },
      { lineNumber: 'Line 4', codeSnippet: 'return n * fact(n - 1);', whatItMeans: 'Multiplies n upon frame return.', whyItIsThere: 'Shrinks subproblem by 1 per call.', ifDeletedError: 'Missing return statement.' },
    ],
    dryRunTable: [
      { step: 1, state: 'fact(5)', memoryOrStack: 'JVM stack depth=1', note: 'Calls fact(4)' },
      { step: 2, state: 'fact(4)..fact(2)', memoryOrStack: 'depth=4', note: 'Frames wait on return' },
      { step: 3, state: 'fact(1) base', memoryOrStack: 'returns 1L', note: 'Base case met' },
      { step: 4, state: 'unwind stack', memoryOrStack: '2 -> 6 -> 24 -> 120', note: 'Prints 5!=120' },
    ],
    harryBugTraps: [
      { title: 'Trap 1: Omitting Base Case Causing StackOverflowError', brokenCode: `static int f(int n) { return n + f(n - 1); } // Crashes!`, fixedCode: `static int f(int n) { return n <= 0 ? 0 : n + f(n - 1); }`, whyItBreaks: 'JVM thread stack runs out of space after a few thousand infinite frames.' },
      { title: 'Trap 2: O(2^N) Branching Without long[] Memo Cache', brokenCode: `return fib(n - 1) + fib(n - 2);`, fixedCode: `if (memo[n] != -1) return memo[n]; ...`, whyItBreaks: 'Exponential call count hangs for n >= 45.' },
      { title: 'Trap 3: Calling modPow Twice Instead of Storing half', brokenCode: `return (modPow(a, e/2, m) * modPow(a, e/2, m)) % m;`, fixedCode: `long h = modPow(a, e/2, m); long r = (h * h) % m;`, whyItBreaks: 'Two recursive calls undo the logarithmic speedup completely.' },
    ],
    practiceSheet: [
      { id: 'java-ch15-p1', difficulty: 'Easy', title: 'Recursive Factorial', prompt: 'Read `n` (`0..20`) and recursively output `n!`.', banglaHint: '`n <= 1` হলে `1L` রিটার্ন করো।', starterCode: `import java.util.Scanner;\npublic class Main { static long f(int n){ return n<=1?1L:n*f(n-1); } public static void main(String[] args){ Scanner sc=new Scanner(System.in); System.out.println(f(sc.nextInt())); } }`, sampleStdin: '6', expectedOutput: '720' },
      { id: 'java-ch15-p2', difficulty: 'Easy', title: 'Recursive Digit Sum', prompt: 'Recursively sum digits of `n`.', banglaHint: '`n == 0 ? 0 : (n % 10) + dsum(n / 10)`।', starterCode: `import java.util.Scanner;\npublic class Main { static long ds(long n){ return n==0?0:(n%10)+ds(n/10); } public static void main(String[] args){ Scanner sc=new Scanner(System.in); System.out.println(ds(sc.nextLong())); } }`, sampleStdin: '9421', expectedOutput: '16' },
      { id: 'java-ch15-p3', difficulty: 'Medium', title: 'Recursive Array Sum', prompt: 'Read `N` and `N` integers, recursively sum from index `0`.', banglaHint: '`i == a.length` হলে `0` রিটার্ন করো।', starterCode: `import java.util.Scanner;\npublic class Main { static long rs(long[] a,int i){ return i==a.length?0:a[i]+rs(a,i+1); } public static void main(String[] args){ Scanner sc=new Scanner(System.in); int n=sc.nextInt(); long[] a=new long[n]; for(int i=0;i<n;i++)a[i]=sc.nextLong(); System.out.println(rs(a,0)); } }`, sampleStdin: '4\n3 7 2 8', expectedOutput: '20' },
      { id: 'java-ch15-p4', difficulty: 'Medium', title: 'Memoized Fibonacci N', prompt: 'Read `n` (`0..50`) and return `fib(n)` using `long[] memo`.', banglaHint: '`Arrays.fill(memo, -1)` করে ক্যাশ ব্যবহার করো।', starterCode: `import java.util.*;\npublic class Main { static long f(int n,long[] m){ if(n<=1)return n; if(m[n]!=-1)return m[n]; return m[n]=f(n-1,m)+f(n-2,m); } public static void main(String[] args){ Scanner sc=new Scanner(System.in); int n=sc.nextInt(); long[] m=new long[n+1]; Arrays.fill(m,-1); System.out.println(f(n,m)); } }`, sampleStdin: '10', expectedOutput: '55' },
      { id: 'java-ch15-p5', difficulty: 'Hard', title: 'Fast Binary Modular Power', prompt: 'Read `a, e, m` and recursively compute `(a^e) % m` in `O(log e)`.', banglaHint: '`half` একবারই বের করে বর্গ করো।', starterCode: `import java.util.Scanner;\npublic class Main { static long mp(long a,long e,long m){ if(e==0)return 1%m; long h=mp(a,e/2,m); long r=(h*h)%m; if((e&1)==1)r=(r*(a%m))%m; return r; } public static void main(String[] args){ Scanner sc=new Scanner(System.in); System.out.println(mp(sc.nextLong(),sc.nextLong(),sc.nextLong())); } }`, sampleStdin: '2 10 1000', expectedOutput: '24' },
    ],
    miniBuild: {
      title: 'Milestone Merger 3: Memoized Climbing Stairs Solver',
      description: 'Combine Ch 1–15: arrays, loops, memoized recursion, and 64-bit longs to count ways to climb N steps (1 or 2 steps).',
      banglaGoal: 'অধ্যায় ১–১৫ মিলিয়ে মেমোয়াইজড রিকার্সনে `N` তম সিঁড়িতে ওঠার মোট উপায় নির্ণয় করো।',
      combinesChapters: 'Java Ch 1–15 (Milestone Merger 3)',
      starterCode: `import java.util.Arrays;
import java.util.Scanner;

public class Main {
    static long ways(int n, long[] memo) {
        if (n <= 1) return 1;
        if (memo[n] != -1) return memo[n];
        return memo[n] = ways(n - 1, memo) + ways(n - 2, memo);
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        long[] memo = new long[n + 1];
        Arrays.fill(memo, -1);
        System.out.println(ways(n, memo));
    }
}`,
      sampleStdin: '5',
      expectedOutput: '8',
    },
    starterCode: `import java.util.Arrays;
import java.util.Scanner;

public class Main {
    static long ways(int n, long[] memo) {
        if (n <= 1) return 1;
        if (memo[n] != -1) return memo[n];
        return memo[n] = ways(n - 1, memo) + ways(n - 2, memo);
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        long[] memo = new long[n + 1];
        Arrays.fill(memo, -1);
        System.out.println(ways(n, memo));
    }
}`,
    sampleStdin: '5',
    expectedSampleOutput: '8',
    testCases: [
      { id: 'java15-t1', input: '5', expectedOutput: '8' },
      { id: 'java15-t2', input: '10', expectedOutput: '89', isHidden: true },
    ],
  },
};


