import type { AtomicLessonOverride } from './atomicLessonTypes';

export const LESSONS_JAVA_P4: Record<number, AtomicLessonOverride> = {
  16: {
    chapterNumber: 16,
    title: 'JVM Object References & Pass-by-Value',
    banglaTitle: 'JVM অবজেক্ট রেফারেন্স ও পাস-বাই-ভ্যালু (Java)',
    subtitle: 'Reference values vs heap objects, == vs .equals(), and defensive array copies',
    zeroIntuition: {
      plainEnglishStory:
        'Java has no raw pointer arithmetic (`*p++`), yet every non-primitive variable—like `int[]`, `String`, or `ArrayList`—stores a heap reference (managed address) rather than the object bytes themselves. When you pass an array or object into a method, Java is strictly pass-by-value: it copies the reference value.\n\nBecause the copied parameter still points to the exact same heap object, mutating `arr[0] = 99` inside the method updates the caller’s array, whereas reassigning the parameter `arr = new int[]{1}` only redirects the local copy. Always compare object contents with `.equals()` rather than `==`.',
      asciiFlowchart:
        'int[] a = {1, 2};  -->  [ Heap Array @0x4a: {1, 2} ]\nmutate(a): param x copies @0x4a\n  x[0] = 99  ==> mutates @0x4a (caller sees {99, 2})\n  x = new int[]{5} ==> redirects ONLY local x',
      pseudocode: ["void mutate(int[] refCopy):","refCopy[0] = 99       // affects caller object","refCopy = new int[2]  // caller reference untouched"],
      banglaZeroToHero: {
        analogyTitle: 'জাভার রেফারেন্স হলো বাড়ির চাবির কপি—ভেতরের আসবাব বদলালেও নতুন বাড়ি কিনলে পুরোনোটা থাকে',
        explanation:
          'জাভাতে সি++-এর মতো পয়েন্টার অ্যারিথমেটিক না থাকলেও প্রিমিটিভ বাদে বাকি সব (`int[]`, `String`, `ArrayList`, অবজেক্ট) আসলে হিপে থাকা অবজেক্টের রেফারেন্স ধরে রাখে। জাভা সম্পর্কে অনেকের ভুল ধারণা আছে যে এটি অবজেক্টকে pass-by-reference করে; আসলে জাভা শতভাগ pass-by-value! যখন তুমি একটি `int[] a` মেথডে পাঠাও, তখন ওই রেফারেন্স ঠিকানাটির একটি কপি প্যারামিটারে যায়। তাই মেথডের ভেতরে `arr[0] = 99` লিখলে উভয় রেফারেন্স যেহেতু একই হিপ অ্যারের দিকে তাকিয়ে আছে, কলারের অ্যারেতেও মানটি বদলে যায়। কিন্তু মেথডের ভেতরে `arr = new int[]{5, 6}` লিখে প্যারামিটারকে নতুন অ্যারের দিকে ঘোরালে কলারের `a` মোটেও বদলায় না! আরেকটি গুরুত্বপূর্ণ বিষয় হলো `==` বনাম `.equals()`: দুটি `String` বা অবজেক্টের ক্ষেত্রে `==` শুধু দুজন একই হিপ ঠিকানায় আছে কি না তা দেখে, আর `.equals()` ভেতরের আসল কনটেন্ট মেলায়। তাই নতুন `new String("hi")` বানালে `==` `false` দেয় কিন্তু `.equals()` `true` দেয়। এছাড়া কোনো অবজেক্টের ভেতরের `int[]` বা `List` বাইরে সরাসরি রিটার্ন না করে `.clone()` বা `Arrays.copyOf` দিয়ে ডিফেনসিভ কপি দেওয়া ভালো অভ্যাস।',
        everydayExample: 'বন্ধুকে তোমার ঘরের চাবির একটি কপি দিলে সে ঘরে ঢুকে সোফা সরাতে পারবে (মিউটেশন), কিন্তু সে নিজের জন্য নতুন ফ্ল্যাট কিনলে তোমার ঘরের ঠিকানা বদলাবে না (রিঅ্যাসাইনমেন্ট)।',
        keyTakeaways: [
          'জাভা সর্বদা রেফারেন্সের মান কপি করে (Pass-by-Value of Reference): মেথডের ভেতরে `arr = new int[...]` করলে কলার প্রভাবিত হয় না।',
          'অবজেক্ট বা স্ট্রিংয়ের মান তুলনা করতে কখনো `==` দেবে না—সর্বদা `Objects.equals` বা `.equals()` ব্যবহার করো।',
          '`null` রেফারেন্সের মেথড ডাকলে `NullPointerException` হয়, তাই আগে `if (ref != null)` যাচাই করো।',
        ],
      },
    },
    topics: [
      {
        id: 'java-ch16-t1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Mutating Target vs. Reassigning Parameter Reference',
        englishParagraphs: [
          'Watch `mutateElement` alter the shared heap array while `reassignParam` fails to redirect the caller’s reference variable.',
        ],
        banglaParagraphs: [
          'মেথডের ভেতরে এলিমেন্ট পরিবর্তন করলে কলার দেখে, কিন্তু প্যারামিটার রিঅ্যাসাইন করলে কলারের রেফারেন্স অপরিবর্তিত থাকে—তা প্রমাণ করো।',
        ],
        memoryDiagram: 'a -> [10,20] -> mutate sets [99,20]; reassign only shifts local param',
        code: `public class Main {\n    static void touch(int[] b) {\n        b[0] = 99;\n        b = new int[]{1, 2};\n    }\n    public static void main(String[] args) {\n        int[] a = {10, 20};\n        touch(a);\n        System.out.println(a[0] + " " + a[1]);\n    }\n}`,
        stdin: '',
        expectedOutput: '99 20',
        lineByLine: [
          {"lineNumber":"Line 3","codeSnippet":"        b[0] = 99;","whatItMeans":"Follows copied reference to shared heap array and updates slot 0.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"`a[0]` stays `10`."},
          {"lineNumber":"Line 4","codeSnippet":"        b = new int[]{1, 2};","whatItMeans":"Redirects ONLY local parameter `b`; caller `a` stays on `{99, 20}`.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Demonstrates reassignment isolation."},
        ],
      },
      {
        id: 'java-ch16-t2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: '== Reference Equality vs. .equals() Content Equality',
        englishParagraphs: [
          'Two distinct `new String(token)` instances have different heap addresses (`==` is false) yet identical text (`.equals()` is true).',
        ],
        banglaParagraphs: [
          'হিপে আলাদা স্ট্রিং অবজেক্ট থাকলে `==` `false` দেয় কিন্তু `.equals()` `true` দেয় তা ইনপুট দিয়ে যাচাই করো।',
        ],
        memoryDiagram: 's1 != s2 (distinct heap objects), s1.equals(s2) == true',
        code: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String raw = sc.next();\n        String s1 = new String(raw);\n        String s2 = new String(raw);\n        System.out.println((s1 == s2) + " " + s1.equals(s2));\n    }\n}`,
        stdin: 'argon',
        expectedOutput: 'false true',
        lineByLine: [
          {"lineNumber":"Line 6","codeSnippet":"        String s1 = new String(raw);","whatItMeans":"Forces fresh String allocation on JVM heap bypassing String Pool.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Literal interning could make `==` return true."},
          {"lineNumber":"Line 8","codeSnippet":"        System.out.println((s1 == s2) + \" \" + s1.equals(s2));","whatItMeans":"Contrasts identity equality (`false`) against value equality (`true`).","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"No comparison output prints."},
        ],
      },
      {
        id: 'java-ch16-t3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Defensive Array Copy Snapshot',
        englishParagraphs: [
          'Use `Arrays.copyOf(arr, arr.length)` so a caller’s snapshot remains isolated from subsequent mutations on the working buffer.',
        ],
        banglaParagraphs: [
          '`Arrays.copyOf` ব্যবহার করে মূল বাফার পরিবর্তন হলেও স্ন্যাপশট কপি সুরক্ষিত রাখো।',
        ],
        memoryDiagram: 'snap = Arrays.copyOf(arr, n) -> separate heap array',
        code: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] buf = new int[n];\n        for (int i = 0; i < n; i++) buf[i] = sc.nextInt();\n        int[] snap = Arrays.copyOf(buf, n);\n        buf[0] += 100;\n        System.out.println(snap[0] + " " + buf[0]);\n    }\n}`,
        stdin: '3\n5 10 15',
        expectedOutput: '5 105',
        lineByLine: [
          {"lineNumber":"Line 8","codeSnippet":"        int[] snap = Arrays.copyOf(buf, n);","whatItMeans":"Allocates independent heap copy of `buf` elements.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Direct assignment `snap = buf` would reflect `+ 100`."},
          {"lineNumber":"Line 10","codeSnippet":"        System.out.println(snap[0] + \" \" + buf[0]);","whatItMeans":"Confirms `snap[0]` stayed untouched at `5`.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"No verification prints."},
        ],
      },
      {
        id: 'java-ch16-t4',
        badge: 'Example 4: Bug Trap vs. CP/Production Pattern',
        title: 'Null-Safe Reference Handling with Objects.requireNonNullElse',
        englishParagraphs: [
          'Guard nullable lookup results before calling `.length()` or `.toUpperCase()` to eliminate surprise `NullPointerException` crashes.',
        ],
        banglaParagraphs: [
          'নাল হতে পারে এমন রেফারেন্স ব্যবহারের আগে নাল গার্ড দিয়ে `NullPointerException` প্রতিরোধ করো।',
        ],
        memoryDiagram: 'Optional/null check avoids NPE dereference crash',
        code: `import java.util.*;\npublic class Main {\n    static String lookup(String key) {\n        return key.equals("ok") ? "ACTIVE" : null;\n    }\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String res = lookup(sc.next());\n        String safe = (res != null) ? res : "UNKNOWN";\n        System.out.println(safe);\n    }\n}`,
        stdin: 'bad',
        expectedOutput: 'UNKNOWN',
        lineByLine: [
          {"lineNumber":"Line 9","codeSnippet":"        String safe = (res != null) ? res : \"UNKNOWN\";","whatItMeans":"Safely replaces null reference before further operations.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Calling `res.toLowerCase()` on null throws NPE."},
        ],
      },
    ],
    lineByLineAnatomy: [
      {"lineNumber":"Line 2","codeSnippet":"    static void touch(int[] b) {","whatItMeans":"Receives copy of caller array reference.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Helper missing."},
      {"lineNumber":"Line 3","codeSnippet":"        b[0] = 99;","whatItMeans":"Mutates element in shared heap array.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"`a[0]` stays `10`."},
      {"lineNumber":"Line 4","codeSnippet":"        b = new int[]{1, 2};","whatItMeans":"Rebinds local `b` only, proving pass-by-value.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"No reassignment demonstration."},
      {"lineNumber":"Line 9","codeSnippet":"        System.out.println(a[0] + \" \" + a[1]);","whatItMeans":"Prints `99 20` proving `a` was never rebound.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"No stdout."},
    ],
    dryRunTable: [
      { step: 1, state: 'int[] a = {10, 20}', memoryOrStack: 'a -> Heap1{10,20}', note: 'Caller array initialized' },
      { step: 2, state: 'touch(a)', memoryOrStack: 'b -> Heap1{10,20}', note: 'Reference value copied to b' },
      { step: 3, state: 'b[0] = 99', memoryOrStack: 'Heap1={99,20}', note: 'Shared heap array mutated' },
      { step: 4, state: 'b = new int[]{1,2}', memoryOrStack: 'b->Heap2, a->Heap1', note: 'Caller outputs 99 20' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: Checking `String` Equality with `==`',
        brokenCode: 'if (input == "YES") System.out.println("ok");',
        fixedCode: 'if ("YES".equals(input)) System.out.println("ok");',
        whyItBreaks: 'Input strings created by `Scanner` live on the heap outside literal pool, so `==` returns `false`.',
      },
      {
        title: 'Trap 2: Expecting `swap(Integer a, Integer b)` to Swap Caller Variables',
        brokenCode: 'static void swap(int a, int b) { int t=a; a=b; b=t; }',
        fixedCode: 'static void swap(int[] arr, int i, int j) { int t=arr[i]; arr[i]=arr[j]; arr[j]=t; }',
        whyItBreaks: 'Because Java passes references by value, rebinding parameters never alters caller locals.',
      },
      {
        title: 'Trap 3: Returning Internal Mutable Array Field Directly',
        brokenCode: 'public int[] getData() { return this.data; }',
        fixedCode: 'public int[] getData() { return Arrays.copyOf(this.data, this.data.length); }',
        whyItBreaks: 'Returning the raw reference lets external code corrupt internal state.',
      },
    ],
    practiceSheet: [
      {
        id: 'java-ch16-p1',
        difficulty: 'Easy',
        title: 'Array Element Swap Helper',
        prompt: 'Write `static void swap(int[] a, int i, int j)` and swap the first and last elements of an input array.',
        banglaHint: '`int t = a[i]; a[i] = a[j]; a[j] = t;` দিয়ে অ্যারের দুই প্রান্ত অদলবদল করো।',
        starterCode: `import java.util.*;\npublic class Main {\n    static void swap(int[] a, int i, int j) { int t = a[i]; a[i] = a[j]; a[j] = t; }\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] a = new int[n];\n        for (int i = 0; i < n; i++) a[i] = sc.nextInt();\n        swap(a, 0, n - 1);\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < n; i++) sb.append(i > 0 ? " " : "").append(a[i]);\n        System.out.println(sb);\n    }\n}`,
        sampleStdin: '4\n10 20 30 40',
        expectedOutput: '40 20 30 10',
      },
      {
        id: 'java-ch16-p2',
        difficulty: 'Easy',
        title: 'Safe String Content Compare',
        prompt: 'Read two words into `new String(...)` wrappers and print `MATCH` if `.equals()` holds, else `DIFF`.',
        banglaHint: '`s1.equals(s2)` ব্যবহার করে ভেতরের অক্ষর তুলনা করো।',
        starterCode: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s1 = new String(sc.next());\n        String s2 = new String(sc.next());\n        System.out.println(s1.equals(s2) ? "MATCH" : "DIFF");\n    }\n}`,
        sampleStdin: 'java java',
        expectedOutput: 'MATCH',
      },
      {
        id: 'java-ch16-p3',
        difficulty: 'Medium',
        title: 'Wrapper IntHolder Reference Mutation',
        prompt: 'Create a static `Box { int val; }` helper, double its field inside a method, and print the updated caller field.',
        banglaHint: 'অবজেক্ট রেফারেন্স পাস করে `b.val *= 2` করলে কলারের `Box` আপডেট হবে।',
        starterCode: `import java.util.*;\npublic class Main {\n    static class Box { int val; Box(int v) { val = v; } }\n    static void dbl(Box b) { b.val *= 2; }\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        Box b = new Box(sc.nextInt());\n        dbl(b);\n        System.out.println(b.val);\n    }\n}`,
        sampleStdin: '21',
        expectedOutput: '42',
      },
      {
        id: 'java-ch16-p4',
        difficulty: 'Medium',
        title: 'Cloned 2D Matrix Isolation',
        prompt: 'Deep-clone a 2x2 matrix row-by-row, increment `copy[0][0]` by 10, and print `orig[0][0] copy[0][0]`.',
        banglaHint: 'প্রতিটি সারির জন্য `Arrays.copyOf(orig[i], orig[i].length)` ব্যবহার করো।',
        starterCode: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int[][] orig = new int[2][2];\n        for (int i = 0; i < 2; i++) for (int j = 0; j < 2; j++) orig[i][j] = sc.nextInt();\n        int[][] copy = new int[2][];\n        for (int i = 0; i < 2; i++) copy[i] = Arrays.copyOf(orig[i], 2);\n        copy[0][0] += 10;\n        System.out.println(orig[0][0] + " " + copy[0][0]);\n    }\n}`,
        sampleStdin: '3 4 5 6',
        expectedOutput: '3 13',
      },
      {
        id: 'java-ch16-p5',
        difficulty: 'Hard',
        title: 'Cycle Detection in Reference Chain',
        prompt: 'Read next-index links for `n` nodes (`-1` means null) and output `CYCLE` or `ACYCLIC` using Floyd’s two-pointer references.',
        banglaHint: '`slow = next[slow]` এবং `fast = next[next[fast]]` চালিয়ে দেখা হয় কি না দেখো।',
        starterCode: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] nxt = new int[n];\n        for (int i = 0; i < n; i++) nxt[i] = sc.nextInt();\n        int slow = 0, fast = 0;\n        boolean cyc = false;\n        while (fast != -1 && nxt[fast] != -1) {\n            slow = nxt[slow];\n            fast = nxt[nxt[fast]];\n            if (slow == fast) { cyc = true; break; }\n        }\n        System.out.println(cyc ? "CYCLE" : "ACYCLIC");\n    }\n}`,
        sampleStdin: '4\n1 2 3 1',
        expectedOutput: 'CYCLE',
      },
    ],
    miniBuild: {
      title: 'Mini-Build: Immutable Config Clone & Reference Audit',
      description: 'Store array values, take a defensive `Arrays.copyOf` snapshot, mutate the live array in-place, and verify both sums.',
      banglaGoal: '`Arrays.copyOf` ও ইন-প্লেস রেফারেন্স আপডেটের মাধ্যমে কনফিগ স্ন্যাপশট অডিটর তৈরি করো।',
      combinesChapters: "Ch 11, 14, 16",
      starterCode: `import java.util.*;\npublic class Main {\n    static void boost(int[] arr, int bonus) {\n        for (int i = 0; i < arr.length; i++) arr[i] += bonus;\n    }\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt(), bonus = sc.nextInt();\n        int[] live = new int[n];\n        for (int i = 0; i < n; i++) live[i] = sc.nextInt();\n        int[] snap = Arrays.copyOf(live, n);\n        boost(live, bonus);\n        long s1 = 0, s2 = 0;\n        for (int x : snap) s1 += x;\n        for (int x : live) s2 += x;\n        System.out.println(s1 + " " + s2);\n    }\n}`,
      sampleStdin: '3 5\n10 20 30',
      expectedOutput: '60 75',
    },
    starterCode: `import java.util.*;\npublic class Main {\n    static void boost(int[] arr, int bonus) {\n        for (int i = 0; i < arr.length; i++) arr[i] += bonus;\n    }\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt(), bonus = sc.nextInt();\n        int[] live = new int[n];\n        for (int i = 0; i < n; i++) live[i] = sc.nextInt();\n        int[] snap = Arrays.copyOf(live, n);\n        boost(live, bonus);\n        long s1 = 0, s2 = 0;\n        for (int x : snap) s1 += x;\n        for (int x : live) s2 += x;\n        System.out.println(s1 + " " + s2);\n    }\n}`,
    sampleStdin: '3 5\n10 20 30',
    expectedSampleOutput: '60 75',
    testCases: [
      { id: 'java16-t1', input: '3 5\n10 20 30', expectedOutput: '60 75' },
      { id: 'java16-t2', input: '2 10\n1 2', expectedOutput: '3 23', isHidden: true },
    ],
  },
  17: {
    chapterNumber: 17,
    title: 'JVM Heap vs. Stack, GC & Allocation Optimization',
    banglaTitle: 'JVM হিপ বনাম স্ট্যাক, GC ও মেমোরি অপ্টিমাইজেশন',
    subtitle: 'Thread stack frames, Young/Old Gen heap, StringBuilder vs + churn, and AutoCloseable',
    zeroIntuition: {
      plainEnglishStory:
        'Each JVM thread gets a private Stack holding local primitives and object references for active method calls; once a method returns, its stack frame pops immediately. Every `new` object, array, and `String` lives on the shared JVM Heap, where the Garbage Collector traces reachability from GC roots (active stack locals, static fields) and reclaims unreachable objects automatically.\n\nEven with a fast generational GC, naive patterns create massive garbage pressure—like concatenating strings with `+` inside a loop (`O(N^2)` dead String objects) or boxing `Integer` primitives inside `ArrayList<Integer>`. Using `StringBuilder`, primitive arrays (`int[]`), and `try-with-resources` (`AutoCloseable`) keeps JVM memory tight and GC pauses near zero.',
      asciiFlowchart:
        'Thread Stack [ frame: StringBuilder sb ] ---> Heap [ char/byte buffer ]\nLoop s += ch  ==creates==> N discarded String objects (GC stress)\nLoop sb.append(ch) ======> 1 mutable buffer (O(N))',
      pseudocode: ["StringBuilder sb = new StringBuilder(n)","for i = 0..n-1: sb.append(token)  // avoids O(N^2) heap allocations"],
      banglaZeroToHero: {
        analogyTitle: 'ডেস্কটপের কাজ করার টেবিল (Stack) বনাম অফিসের কেন্দ্রীয় গুদাম (Heap)',
        explanation:
          'জাভা প্রোগ্রাম চলার সময় প্রতিটি থ্রেডের নিজের একটি ফিক্সড স্ট্যাক থাকে (ঠিক কাজের টেবিলের মতো), যেখানে লোকাল প্রিমিটিভ ভ্যারিয়েবল (`int`, `boolean`) ও রেফারেন্সগুলো বসে। আর `new` দিয়ে তৈরি প্রতিটি অবজেক্ট ও অ্যারে থাকে বিশাল কেন্দ্রীয় হিপ মেমোরিতে। মেথড শেষ হলেই স্ট্যাক ফ্রেম সাথে সাথে মুছে যায়, কিন্তু হিপে থাকা অবজেক্টগুলো কখন পরিষ্কার হবে তা ঠিক করে JVM-এর গার্বেজ কালেক্টর (GC)। GC মূলত স্ট্যাক বা স্ট্যাটিক রুট থেকে কোন অবজেক্টে পৌঁছানো যাচ্ছে তা পরীক্ষা করে এবং যাদের কোনো রেফারেন্স নেই তাদের Young/Old জেনারেশন থেকে সরিয়ে দেয়। তবে অটোমেটিক GC থাকা মানে এই নয় যে অযথা হিপে আবর্জনা তৈরি করা যাবে! লুপের ভেতরে `s = s + "a"` লিখলে প্রতিবার হিপে একেবারে নতুন `String` অবজেক্ট তৈরি হয়ে কোটি কোটি বাতিল অবজেক্ট জমে যায় এবং GC থেমে গিয়ে প্রোগ্রাম স্লো করে। তাই লুপে সব সময় একটিমাত্র `StringBuilder` ব্যবহার করা উচিত। পাশাপাশি অপ্রয়োজনীয় `Integer` বক্সিংয়ের বদলে প্রিমিটিভ `int[]` ব্যবহার এবং ফাইল বা রিসোর্সের জন্য `try-with-resources` ব্যবহার করলে হিপ মেমোরি খুব পরিচ্ছন্ন থাকে।',
        everydayExample: 'প্রতি লাইন লেখার পর পুরো খাতা নতুন করে কপি না করে একটি রাফ খাতায় লাইন যোগ করতে থাকা (`StringBuilder`) এবং শেষে একবার প্রিন্ট করা।',
        keyTakeaways: [
          'লুপের ভেতর কখনো `String` দিয়ে `+` করবে না; সর্বদা `StringBuilder` ব্যবহার করে `O(N^2)` হিপ গার্বেজ বাঁচাও।',
          'একটি অবজেক্ট স্ট্যাক বা স্ট্যাটিক রুট থেকে অপ্রাপ্য (unreachable) হলেই গার্বেজ কালেক্টরের জন্য যোগ্য হয়।',
          'প্রিমিটিভ `int[]`/`long[]` অ্যারে বক্সড `Integer[]`-এর চেয়ে প্রায় ৪-৫ গুণ কম হিপ মেমোরি নেয়।',
        ],
      },
    },
    topics: [
      {
        id: 'java-ch17-t1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Stack Frame Depth & Local Lifecycle',
        englishParagraphs: [
          'Trace a helper method allocating a local primitive alongside a heap `StringBuilder`, showing stack isolation and single-buffer output.',
        ],
        banglaParagraphs: [
          'লোকাল স্ট্যাক ভ্যারিয়েবল এবং হিপ `StringBuilder` বাফারের কাজের ধরন একটি ছোট উদাহরণে দেখো।',
        ],
        memoryDiagram: 'Stack[buildTag frame] -> Heap[StringBuilder]',
        code: `public class Main {\n    static String buildTag(String name, int ver) {\n        StringBuilder sb = new StringBuilder(16);\n        sb.append(name).append("-v").append(ver);\n        return sb.toString();\n    }\n    public static void main(String[] args) {\n        System.out.println(buildTag("jvm", 21));\n    }\n}`,
        stdin: '',
        expectedOutput: 'jvm-v21',
        lineByLine: [
          {"lineNumber":"Line 3","codeSnippet":"        StringBuilder sb = new StringBuilder(16);","whatItMeans":"Pre-sizes mutable heap buffer to avoid reallocations.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"`sb` missing."},
          {"lineNumber":"Line 4","codeSnippet":"        sb.append(name).append(\"-v\").append(ver);","whatItMeans":"Writes directly into single buffer without intermediate strings.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Returns empty string."},
        ],
      },
      {
        id: 'java-ch17-t2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Fast StringBuilder Repeated Pattern Builder',
        englishParagraphs: [
          'Read `n` and `word`, repeating it `n` times in `O(n)` using pre-capacitated `StringBuilder` without `O(n^2)` GC churn.',
        ],
        banglaParagraphs: [
          'ক্যাপাসিটি আগেই নির্ধারণ করে `StringBuilder` দিয়ে `O(n)` সময়ে বারবার স্ট্রিং জোড়া লাগাও।',
        ],
        memoryDiagram: 'new StringBuilder(n * word.length()) -> zero resize copies',
        code: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        String w = sc.next();\n        StringBuilder sb = new StringBuilder(n * w.length());\n        for (int i = 0; i < n; i++) sb.append(w);\n        System.out.println(sb.toString());\n    }\n}`,
        stdin: '4 go',
        expectedOutput: 'gogogogo',
        lineByLine: [
          {"lineNumber":"Line 7","codeSnippet":"        StringBuilder sb = new StringBuilder(n * w.length());","whatItMeans":"Reserves exact byte capacity upfront on heap.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Buffer resizes repeatedly while doubling."},
          {"lineNumber":"Line 8","codeSnippet":"        for (int i = 0; i < n; i++) sb.append(w);","whatItMeans":"Appends chunks in amortized O(1).","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Output remains empty."},
        ],
      },
      {
        id: 'java-ch17-t3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Deterministic AutoCloseable Scope Pattern',
        englishParagraphs: [
          'Instead of waiting on GC to close native handles, implement `AutoCloseable` with `try (...)` so `.close()` executes deterministically.',
        ],
        banglaParagraphs: [
          'গার্বেজ কালেক্টরের অপেক্ষায় না থেকে `AutoCloseable` এবং `try-with-resources` দিয়ে রিসোর্স সাথে সাথে বন্ধ করো।',
        ],
        memoryDiagram: 'try (Session s = new Session()) -> auto calls s.close()',
        code: `public class Main {\n    static class Session implements AutoCloseable {\n        Session() { System.out.println("open"); }\n        void work() { System.out.println("work"); }\n        public void close() { System.out.println("close"); }\n    }\n    public static void main(String[] args) {\n        try (Session s = new Session()) {\n            s.work();\n        }\n    }\n}`,
        stdin: '',
        expectedOutput: 'open\nwork\nclose',
        lineByLine: [
          {"lineNumber":"Line 8","codeSnippet":"        try (Session s = new Session()) {","whatItMeans":"Registers `s` for deterministic cleanup upon exiting block.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"`close()` would never run automatically."},
        ],
      },
      {
        id: 'java-ch17-t4',
        badge: 'Example 4: Bug Trap vs. CP/Production Pattern',
        title: 'Eliminating Integer Autoboxing Churn on Large Arrays',
        englishParagraphs: [
          'Summing inside `Long` wrapper creates millions of short-lived heap objects (`Long.valueOf`). Using primitive `long` runs purely in CPU registers/stack.',
        ],
        banglaParagraphs: [
          'লুপের ভেতর `Long` র‍্যাপার ক্লাস ব্যবহার করলে প্রতিবার নতুন হিপ অবজেক্ট তৈরি হয়; প্রিমিটিভ `long` ব্যবহার করলে শূন্য হিপ অ্যালোকেশন হয়।',
        ],
        memoryDiagram: 'Long sum += x (boxes every step) vs long sum += x (0 heap objects)',
        code: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        long sum = 0L;\n        for (int i = 0; i < n; i++) sum += sc.nextLong();\n        System.out.println(sum);\n    }\n}`,
        stdin: '4\n1000000000 2000000000 3000000000 4000000000',
        expectedOutput: '10000000000',
        lineByLine: [
          {"lineNumber":"Line 6","codeSnippet":"        long sum = 0L;","whatItMeans":"Keeps accumulator as a 64-bit stack primitive with zero heap boxing.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"No accumulator variable."},
        ],
      },
    ],
    lineByLineAnatomy: [
      {"lineNumber":"Line 2","codeSnippet":"    static String buildTag(String name, int ver) {","whatItMeans":"Pushes stack frame holding `name` ref and primitive `ver`.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Helper missing."},
      {"lineNumber":"Line 3","codeSnippet":"        StringBuilder sb = new StringBuilder(16);","whatItMeans":"Allocates single growable buffer on heap.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"`sb` missing."},
      {"lineNumber":"Line 4","codeSnippet":"        sb.append(name).append(\"-v\").append(ver);","whatItMeans":"Writes all parts in place.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Tag stays empty."},
      {"lineNumber":"Line 5","codeSnippet":"        return sb.toString();","whatItMeans":"Produces final immutable String once.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Missing return statement."},
    ],
    dryRunTable: [
      { step: 1, state: 'main calls buildTag', memoryOrStack: 'Stack: [main, buildTag]', note: 'New stack frame pushed' },
      { step: 2, state: 'new StringBuilder(16)', memoryOrStack: 'Heap: char[16]', note: 'Mutable buffer ready' },
      { step: 3, state: 'sb.append(...)', memoryOrStack: 'Heap: "jvm-v21"', note: 'Zero discarded intermediate strings' },
      { step: 4, state: 'return sb.toString()', memoryOrStack: 'Stack: [main]', note: 'sb becomes unreachable & GC-eligible' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: String `+` Concatenation Inside an O(N) Loop',
        brokenCode: 'String s = ""; for (int i = 0; i < 50000; i++) s += "a";',
        fixedCode: 'StringBuilder sb = new StringBuilder(); for (int i = 0; i < 50000; i++) sb.append("a");',
        whyItBreaks: 'Each `+=` allocates and copies the entire growing string, causing O(N^2) time and massive GC pressure.',
      },
      {
        title: 'Trap 2: Memory Leak via Unbounded Static Cache Collection',
        brokenCode: 'static List<byte[]> cache = new ArrayList<>(); // never evicted!',
        fixedCode: '// bound size or evict entries so GC can reclaim unused arrays',
        whyItBreaks: 'Objects reachable from `static` GC roots can never be collected and trigger `OutOfMemoryError`.',
      },
      {
        title: 'Trap 3: Autoboxing Wrapper `Long sum = 0L;` in Tight Loops',
        brokenCode: 'Long sum = 0L; for (int i = 0; i < n; i++) sum += i;',
        fixedCode: 'long sum = 0L; for (int i = 0; i < n; i++) sum += i;',
        whyItBreaks: 'Every `+=` unboxes `Long`, adds, and boxes a brand-new `Long` on the heap.',
      },
    ],
    practiceSheet: [
      {
        id: 'java-ch17-p1',
        difficulty: 'Easy',
        title: 'Zero-GC Csv Joiner with StringBuilder',
        prompt: 'Read `n` words and join them with commas using a single `StringBuilder`.',
        banglaHint: '`if (i > 0) sb.append(","); sb.append(word);` ব্যবহার করো।',
        starterCode: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < n; i++) {\n            if (i > 0) sb.append(',');\n            sb.append(sc.next());\n        }\n        System.out.println(sb);\n    }\n}`,
        sampleStdin: '3\nred green blue',
        expectedOutput: 'red,green,blue',
      },
      {
        id: 'java-ch17-p2',
        difficulty: 'Easy',
        title: 'Primitive Buffer Sum Over Boxed List',
        prompt: 'Store `n` inputs in a primitive `long[]` array and print their average integer floor.',
        banglaHint: '`long[] a = new long[n]` ব্যবহার করে অটোবক্সিং এড়িয়ে গড় বের করো।',
        starterCode: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        long[] a = new long[n];\n        long sum = 0;\n        for (int i = 0; i < n; i++) { a[i] = sc.nextLong(); sum += a[i]; }\n        System.out.println(sum / n);\n    }\n}`,
        sampleStdin: '4\n10 20 30 40',
        expectedOutput: '25',
      },
      {
        id: 'java-ch17-p3',
        difficulty: 'Medium',
        title: 'AutoCloseable Guarded Logger',
        prompt: 'Implement `AutoCloseable` on a custom class, print each input token inside `try (...)`, and print `RELEASED` on close.',
        banglaHint: '`try (LogGuard g = new LogGuard())` ব্যবহার করে শেষে স্বয়ংক্রিয়ভাবে `RELEASED` প্রিন্ট করো।',
        starterCode: `import java.util.*;\npublic class Main {\n    static class LogGuard implements AutoCloseable {\n        public void emit(String s) { System.out.println(s); }\n        public void close() { System.out.println("RELEASED"); }\n    }\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.next();\n        try (LogGuard g = new LogGuard()) { g.emit(s); }\n    }\n}`,
        sampleStdin: 'READY',
        expectedOutput: 'READY\nRELEASED',
      },
      {
        id: 'java-ch17-p4',
        difficulty: 'Medium',
        title: 'Bounded Ring Buffer Cache',
        prompt: 'Insert `n` numbers into a fixed-capacity `k` circular array so older elements get overwritten cleanly (no unbounded growth), then print sum of active items.',
        banglaHint: '`buf[i % k] = val` লিখলে মেমোরি কখনো `k`-এর বেশি বাড়ে না।',
        starterCode: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt(), k = sc.nextInt();\n        long[] buf = new long[k];\n        for (int i = 0; i < n; i++) buf[i % k] = sc.nextLong();\n        long sum = 0;\n        for (int i = 0; i < Math.min(n, k); i++) sum += buf[i];\n        System.out.println(sum);\n    }\n}`,
        sampleStdin: '5 3\n1 2 3 10 20',
        expectedOutput: '33',
      },
      {
        id: 'java-ch17-p5',
        difficulty: 'Hard',
        title: 'Stack-Simulated Iterative DFS (Avoiding StackOverflowError)',
        prompt: 'Read an undirected adjacency list of `n` nodes, `m` edges, and traverse from node 0 using an explicit heap `int[]` stack to output visited count.',
        banglaHint: 'গভীর গ্রাফে জাভার সীমিত রিকার্সন স্ট্যাক বাঁচাতে `int[] st` অ্যারে দিয়ে ইটারেটিভ DFS করো।',
        starterCode: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt(), m = sc.nextInt();\n        ArrayList<ArrayList<Integer>> adj = new ArrayList<>();\n        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());\n        for (int i = 0; i < m; i++) {\n            int u = sc.nextInt(), v = sc.nextInt();\n            adj.get(u).add(v); adj.get(v).add(u);\n        }\n        boolean[] vis = new boolean[n];\n        int[] st = new int[n]; int top = 0, cnt = 0;\n        st[top++] = 0; vis[0] = true;\n        while (top > 0) {\n            int u = st[--top]; cnt++;\n            for (int v : adj.get(u)) if (!vis[v]) { vis[v] = true; st[top++] = v; }\n        }\n        System.out.println(cnt);\n    }\n}`,
        sampleStdin: '4 3\n0 1\n1 2\n2 3',
        expectedOutput: '4',
      },
    ],
    miniBuild: {
      title: 'Mini-Build: Low-Allocation Stream Formatter',
      description: 'Use primitive arrays and a pre-sized `StringBuilder` to filter positive numbers and format output with zero unnecessary heap garbage.',
      banglaGoal: 'প্রিমিটিভ অ্যারে ও `StringBuilder` দিয়ে কম হিপ মেমোরি খরচে স্ট্রিম ফরম্যাটার বানাও।',
      combinesChapters: "Ch 11, 14, 17",
      starterCode: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        StringBuilder sb = new StringBuilder(n * 4);\n        long total = 0;\n        for (int i = 0; i < n; i++) {\n            long x = sc.nextLong();\n            if (x > 0) {\n                if (sb.length() > 0) sb.append('+');\n                sb.append(x);\n                total += x;\n            }\n        }\n        System.out.println(sb + "=" + total);\n    }\n}`,
      sampleStdin: '5\n-2 4 0 7 9',
      expectedOutput: '4+7+9=20',
    },
    starterCode: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        StringBuilder sb = new StringBuilder(n * 4);\n        long total = 0;\n        for (int i = 0; i < n; i++) {\n            long x = sc.nextLong();\n            if (x > 0) {\n                if (sb.length() > 0) sb.append('+');\n                sb.append(x);\n                total += x;\n            }\n        }\n        System.out.println(sb + "=" + total);\n    }\n}`,
    sampleStdin: '5\n-2 4 0 7 9',
    expectedSampleOutput: '4+7+9=20',
    testCases: [
      { id: 'java17-t1', input: '5\n-2 4 0 7 9', expectedOutput: '4+7+9=20' },
      { id: 'java17-t2', input: '3\n1 2 3', expectedOutput: '1+2+3=6', isHidden: true },
    ],
  },
  18: {
    chapterNumber: 18,
    title: 'Classes, Encapsulation, Constructors & Records in Java 21',
    banglaTitle: 'ক্লাস, এনক্যাপসুলেশন, কনস্ট্রাক্টর ও রেকর্ডস (Java 21)',
    subtitle: 'private fields, defensive constructors, immutable Java records, and static factory invariants',
    zeroIntuition: {
      plainEnglishStory:
        'Encapsulation in Java hides raw internal state behind `private` fields and exposes strictly validated constructors and methods, ensuring an object can never hold an illegal state (such as a negative balance or invalid denominator) anywhere in your codebase.\n\nFor immutable value carriers like coordinates, graph edges, or log entries, Java 21 `record` declarations cut dozens of lines of boilerplate—automatically providing `private final` fields, a canonical constructor (with optional validation), `equals`, `hashCode`, and `toString`.',
      asciiFlowchart:
        'class Wallet { private long bal; }  <-- hidden field\n  deposit(x)  -> if (x > 0) bal += x;\n  withdraw(x) -> if (x > 0 && x <= bal) bal -= x;\nrecord Point(long x, long y) {}      <-- auto final + equals + toString',
      pseudocode: [
        '1. MARK internal fields private (or private final for immutability)',
        '2. VALIDATE invariants inside constructors and mutator methods',
        '3. PREFER Java record for pure immutable data aggregates',
      ],
      banglaZeroToHero: {
        analogyTitle: 'লকার রুমের ভেতর প্রাইভেট ডেটা (`private`) ও আধুনিক Java `record`',
        explanation:
          'বড় জাভা অ্যাপ্লিকেশনে প্রতিটি ক্লাসের ভেতরের ভ্যারিয়েবল `public` রাখলে যেকোনো ফাইল থেকে ভুল মান (যেমন নেগেটিভ ব্যাংক ব্যালেন্স বা শূন্য ডিনমিনেটর) বসিয়ে পুরো লজিক নষ্ট করে দিতে পারে। তাই জাভায় ফিল্ডগুলোকে `private` রেখে কেবল অনুমোদিত মেথডের (`deposit`, `withdraw`) মাধ্যমে পরিবর্তন করতে দেওয়া হয়—এটাই এনক্যাপসুলেশন। অবজেক্ট তৈরি হওয়ার মুহূর্তেই যেন বৈধতা যাচাই হয়, সেজন্য কনস্ট্রাক্টরের ভেতরেই প্রাথমিক মান চেক করা হয় এবং এই অবজেক্টটিকে নির্দেশ করতে `this.field` ব্যবহার করা হয়। অনেক সময় ভগ্নাংশ বা কোঅর্ডিনেটের মতো শুধু ডেটা বহন করার জন্য ক্লাস বানাতে গিয়ে `equals`, `hashCode`, `toString` ও গেটার লিখে অনেক কোড বড় হয়ে যায়। আধুনিক জাভা ২১-এ এর দারুণ সমাধান হলো `record Point(long x, long y) {}`—মাত্র এক লাইনেই এটি অপরিবর্তনীয় (`final`) ফিল্ডসহ পুরো ডেটা মডেল তৈরি করে দেয় এবং কম্প্যাক্ট কনস্ট্রাক্টরে ভ্যালিডেশনও করতে দেয়। `toString()` ওভাররাইড করলে ডিবাগিং ও প্রিন্টিং আরও সহজ হয়। এই অধ্যায়ে তুমি ইনভ্যারিয়েন্ট-সেফ ক্লাস ও জাভা রেকর্ড ডিজাইন করতে শিখবে।',
        everydayExample: 'ব্যাংক ভল্টের টাকা সরাসরি গ্রাহকের হাতে না দিয়ে কাউন্টারের ফর্মের মাধ্যমে জমা বা উত্তোলন করা।',
        keyTakeaways: [
          'ইনভ্যারিয়েন্ট ভাঙা ঠেকাতে সব ক্লাস ফিল্ড `private` এবং পারলে `final` রাখো।',
          'কনস্ট্রাক্টরে প্যারামিটার ও ফিল্ড নাম এক হলে `this.field = field` লিখে পার্থক্য বোঝাতে হয়।',
          'শুধু ডেটা বহনের জন্য `record` ব্যবহার করলে কোড সংক্ষিপ্ত ও বাগমুক্ত হয়।',
        ],
      },
    },
    topics: [
      {
        id: 'java-ch18-t1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Private State & Invariant-Guarded Counter Class',
        englishParagraphs: [
          'Keep `count` strictly `private` inside `SafeCounter` so external code can only increment or safely decrement.',
        ],
        banglaParagraphs: [
          '`private` ফিল্ড ও মেথডের মাধ্যমে `SafeCounter` যেন শূন্যের নিচে না নামে তা নিশ্চিত করো।',
        ],
        memoryDiagram: 'SafeCounter(3) -> sub(2)->1 -> sub(5)->false -> get()=1',
        code: `public class Main {
    static class SafeCounter {
        private int count;
        SafeCounter(int init) { this.count = Math.max(0, init); }
        boolean sub(int d) {
            if (d <= 0 || d > count) return false;
            count -= d;
            return true;
        }
        int get() { return count; }
    }
    public static void main(String[] args) {
        SafeCounter c = new SafeCounter(3);
        System.out.println(c.sub(2) + " " + c.sub(5) + " " + c.get());
    }
}`,
        stdin: '',
        expectedOutput: 'true false 1',
        lineByLine: [
          { lineNumber: 'Line 3', codeSnippet: 'private int count;', whatItMeans: 'Hides `count` from outside direct modification.', whyItIsThere: 'Guarantees `count >= 0` invariant holds everywhere.', ifDeletedError: 'Counter fails to store state.' },
          { lineNumber: 'Line 6', codeSnippet: 'if (d <= 0 || d > count) return false;', whatItMeans: 'Rejects negative or overdraft subtractions safely.', whyItIsThere: 'Protects business invariant before mutating state.', ifDeletedError: 'Count becomes negative.' },
        ],
      },
      {
        id: 'java-ch18-t2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Encapsulated Wallet Ledger Over Stdin',
        englishParagraphs: [
          'Parse an initial balance and `n` `D x` / `W x` transactions into an encapsulated `Wallet` ignoring overdrafts.',
        ],
        banglaParagraphs: [
          '`D` এবং `W` কমান্ড পড়ে `Wallet` ক্লাসের ভেতরে নিরাপদ ব্যালেন্স হিসাব করো।',
        ],
        memoryDiagram: 'Wallet(100) -> D 50 -> 150 -> W 200 ignored -> W 30 -> 120',
        code: `import java.util.*;
public class Main {
    static class Wallet {
        private long bal;
        Wallet(long init) { this.bal = Math.max(0, init); }
        void deposit(long x) { if (x > 0) bal += x; }
        void withdraw(long x) { if (x > 0 && x <= bal) bal -= x; }
        long balance() { return bal; }
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Wallet w = new Wallet(sc.nextLong());
        int n = sc.nextInt();
        for (int i = 0; i < n; i++) {
            String op = sc.next();
            long amt = sc.nextLong();
            if (op.equals("D")) w.deposit(amt); else w.withdraw(amt);
        }
        System.out.println(w.balance());
    }
}`,
        stdin: '100 3\nD 50\nW 200\nW 30',
        expectedOutput: '120',
        lineByLine: [
          { lineNumber: 'Line 7', codeSnippet: 'void withdraw(long x) { if (x > 0 && x <= bal) bal -= x; }', whatItMeans: 'Validates overdraft check inside class method.', whyItIsThere: 'No external code can corrupt `bal`.', ifDeletedError: 'Balance drops negative on invalid withdraw.' },
        ],
      },
      {
        id: 'java-ch18-t3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Immutable Data Models with Java 21 Record',
        englishParagraphs: [
          'Use a Java `record Task(int prio, String name)` with compact validation and compare instances cleanly.',
        ],
        banglaParagraphs: [
          'জাভা `record` ব্যবহার করে কম কোডে অপরিবর্তনীয় `Task` মডেল ও তুলনা করো।',
        ],
        memoryDiagram: 'record Task(prio, name) -> final fields + auto equals/toString',
        code: `import java.util.*;
public class Main {
    record Task(int prio, String name) {
        Task { if (prio < 0) prio = 0; }
    }
    public static void main(String[] args) {
        List<Task> list = List.of(new Task(3, "ship"), new Task(1, "lint"), new Task(2, "test"));
        Task best = Collections.min(list, Comparator.comparingInt(Task::prio));
        System.out.println(best.name() + ":" + best.prio());
    }
}`,
        stdin: '',
        expectedOutput: 'lint:1',
        lineByLine: [
          { lineNumber: 'Line 3', codeSnippet: 'record Task(int prio, String name) {', whatItMeans: 'Generates immutable fields, constructor, getters, equals, hashCode.', whyItIsThere: 'Eliminates repetitive DTO boilerplate cleanly.', ifDeletedError: 'Task type undefined.' },
        ],
      },
      {
        id: 'java-ch18-t4',
        badge: 'Example 4: Bug Trap vs. Production Pattern',
        title: 'Defensive Copy on Mutable Array Input',
        englishParagraphs: [
          'Storing an external `int[]` directly lets callers mutate your encapsulated array later. Clone on entry via `arr.clone()`.',
        ],
        banglaParagraphs: [
          'কনস্ট্রাক্টরে বাইরে থেকে আসা `int[]` অ্যারে সরাসরি না রেখে `arr.clone()` দিয়ে ডিফেন্সিভ কপি রাখো।',
        ],
        memoryDiagram: 'caller mutates raw[0] -> Snapshot holds isolated copy!',
        code: `public class Main {
    static class Snapshot {
        private final int[] data;
        Snapshot(int[] src) { this.data = src.clone(); }
        int first() { return data[0]; }
    }
    public static void main(String[] args) {
        int[] raw = {42, 99};
        Snapshot s = new Snapshot(raw);
        raw[0] = -1;
        System.out.println(s.first());
    }
}`,
        stdin: '',
        expectedOutput: '42',
        lineByLine: [
          { lineNumber: 'Line 4', codeSnippet: 'Snapshot(int[] src) { this.data = src.clone(); }', whatItMeans: 'Copies array bytes into private heap array.', whyItIsThere: 'Protects `Snapshot` when caller alters `raw[0]`.', ifDeletedError: 'Printing `s.first()` returns `-1`.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 3', codeSnippet: 'private int count;', whatItMeans: 'Encapsulated field visible only inside `SafeCounter`.', whyItIsThere: 'Enforces controlled state mutations.', ifDeletedError: 'Field missing.' },
      { lineNumber: 'Line 4', codeSnippet: 'SafeCounter(int init) { this.count = Math.max(0, init); }', whatItMeans: 'Constructor establishing invariant from birth.', whyItIsThere: 'Rejects negative start values.', ifDeletedError: 'Cannot instantiate `new SafeCounter(3)`.' },
      { lineNumber: 'Line 6', codeSnippet: 'if (d <= 0 || d > count) return false;', whatItMeans: 'Guarded state transition check.', whyItIsThere: 'Prevents `count < 0`.', ifDeletedError: 'Overdraft corrupts counter.' },
    ],
    dryRunTable: [
      { step: 1, state: 'new SafeCounter(3)', memoryOrStack: 'count = 3', note: 'Invariant count >= 0 holds' },
      { step: 2, state: 'c.sub(2)', memoryOrStack: 'count = 1', note: 'Valid decrement -> true' },
      { step: 3, state: 'c.sub(5)', memoryOrStack: 'count = 1', note: '5 > 1 rejected -> false' },
      { step: 4, state: 'c.get()', memoryOrStack: 'Output: true false 1', note: 'State intact' },
    ],
    harryBugTraps: [
      { title: 'Trap 1: Shadowing Field Without `this.` in Constructor', brokenCode: 'Box(int w) { w = w; } // leaves this.w as 0!', fixedCode: 'Box(int w) { this.w = w; }', whyItBreaks: '`w = w` assigns the parameter back onto itself leaving the field default zero.' },
      { title: 'Trap 2: Returning Internal Mutable List Directly from Getter', brokenCode: 'public List<String> tags() { return tags; }', fixedCode: 'public List<String> tags() { return List.copyOf(tags); }', whyItBreaks: 'Callers can run `.clear()` on the returned reference and break internal state.' },
      { title: 'Trap 3: Comparing Strings/Objects With `==` Instead of `.equals()`', brokenCode: 'if (op == "D") ...', fixedCode: 'if (op.equals("D")) ...', whyItBreaks: '`==` checks heap reference addresses rather than character/field equality.' },
    ],
    practiceSheet: [
      {
        id: 'java-ch18-p1',
        difficulty: 'Easy',
        title: 'Rectangle Encapsulated Dimensions',
        prompt: 'Create `Rect(long w, long h)` clamping dimensions `>= 1` and outputting `area() + " " + perim()`.',
        banglaHint: 'কনস্ট্রাক্টরে `Math.max(1L, ...)` দিয়ে সেট করে `area` ও `perim` প্রিন্ট করো।',
        starterCode: `import java.util.*;\npublic class Main {\n    static class Rect {\n        private final long w, h;\n        Rect(long w, long h) { this.w = Math.max(1, w); this.h = Math.max(1, h); }\n        long area() { return w * h; }\n        long perim() { return 2 * (w + h); }\n    }\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        Rect r = new Rect(sc.nextLong(), sc.nextLong());\n        System.out.println(r.area() + " " + r.perim());\n    }\n}`,
        sampleStdin: '5 8',
        expectedOutput: '40 26',
      },
      {
        id: 'java-ch18-p2',
        difficulty: 'Easy',
        title: 'Immutable Pair Record Swap & Sum',
        prompt: 'Define `record Pair(long a, long b)` with a `swapped()` method and print `swapped().a() + ":" + (a + b)`.',
        banglaHint: 'রেকর্ডের ভেতরে `Pair swapped() { return new Pair(b, a); }` মেথড যোগ করো।',
        starterCode: `import java.util.*;\npublic class Main {\n    record Pair(long a, long b) {\n        Pair swapped() { return new Pair(b, a); }\n    }\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        Pair p = new Pair(sc.nextLong(), sc.nextLong());\n        System.out.println(p.swapped().a() + ":" + (p.a() + p.b()));\n    }\n}`,
        sampleStdin: '10 25',
        expectedOutput: '25:35',
      },
      {
        id: 'java-ch18-p3',
        difficulty: 'Medium',
        title: 'Normalized Rational Number Class',
        prompt: 'Build `Frac(long n, long d)` normalizing by `gcd` so `toString()` outputs `"n/d"` in lowest terms.',
        banglaHint: 'কনস্ট্রাক্টরে `gcd` বের করে লব ও হরকে ভাগ করো।',
        starterCode: `import java.util.*;\npublic class Main {\n    static long gcd(long a, long b) { return b == 0 ? Math.abs(a) : gcd(b, a % b); }\n    static class Frac {\n        private final long n, d;\n        Frac(long n, long d) { long g = gcd(n, d); this.n = n / g; this.d = d / g; }\n        public String toString() { return n + "/" + d; }\n    }\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        System.out.println(new Frac(sc.nextLong(), sc.nextLong()));\n    }\n}`,
        sampleStdin: '12 18',
        expectedOutput: '2/3',
      },
      {
        id: 'java-ch18-p4',
        difficulty: 'Medium',
        title: 'Highest Student Record Selector',
        prompt: 'Read `n` `name score` entries into `Student` records and print the top scorer’s name.',
        banglaHint: 'রেকর্ডের লিস্ট থেকে সর্বোচ্চ স্কোরের `name()` খুঁজে বের করো।',
        starterCode: `import java.util.*;\npublic class Main {\n    record Student(String name, int score) {}\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        Student best = null;\n        for (int i = 0; i < n; i++) {\n            Student cur = new Student(sc.next(), sc.nextInt());\n            if (best == null || cur.score() > best.score()) best = cur;\n        }\n        System.out.println(best.name() + " " + best.score());\n    }\n}`,
        sampleStdin: '3\nArif 78\nSadia 94\nNabil 85',
        expectedOutput: 'Sadia 94',
      },
      {
        id: 'java-ch18-p5',
        difficulty: 'Hard',
        title: 'Bounded Ring Queue Class',
        prompt: 'Implement `RingQueue(int cap)` supporting `ENQ x` (ignore if full) and `DEQ` commands, printing final sum of items.',
        banglaHint: 'ক্লাসের ভেতরে `long[] buf` ও `head, sz` রেখে `ENQ`/`DEQ` হ্যান্ডল করো।',
        starterCode: `import java.util.*;\npublic class Main {\n    static class Ring {\n        private final long[] q;\n        private int head = 0, sz = 0;\n        Ring(int cap) { q = new long[cap]; }\n        void enq(long x) { if (sz < q.length) { q[(head + sz) % q.length] = x; sz++; } }\n        void deq() { if (sz > 0) { head = (head + 1) % q.length; sz--; } }\n        long sum() { long s = 0; for (int i = 0; i < sz; i++) s += q[(head + i) % q.length]; return s; }\n    }\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        Ring r = new Ring(sc.nextInt());\n        int m = sc.nextInt();\n        for (int i = 0; i < m; i++) {\n            String op = sc.next();\n            if (op.equals("ENQ")) r.enq(sc.nextLong()); else r.deq();\n        }\n        System.out.println(r.sum());\n    }\n}`,
        sampleStdin: '2 4\nENQ 10 ENQ 20 ENQ 99 DEQ',
        expectedOutput: '20',
      },
    ],
    miniBuild: {
      title: 'Mini-Build: Encapsulated Stock Inventory Ledger',
      description: 'Protect warehouse stock quantities behind validated `add` and `sell` methods on an encapsulated `Inventory` class.',
      banglaGoal: 'প্রাইভেট ফিল্ড ও ইনভ্যারিয়েন্ট-সেফ মেথড দিয়ে স্টক লেজার তৈরি করো।',
      combinesChapters: 'Ch 11, 16, 18',
      starterCode: `import java.util.*;\npublic class Main {\n    static class Inventory {\n        private long qty;\n        Inventory(long init) { this.qty = Math.max(0, init); }\n        void add(long x) { if (x > 0) qty += x; }\n        void sell(long x) { if (x > 0 && x <= qty) qty -= x; }\n        long get() { return qty; }\n    }\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        Inventory inv = new Inventory(sc.nextLong());\n        while (sc.hasNext()) {\n            String op = sc.next();\n            long v = sc.nextLong();\n            if (op.equals("ADD")) inv.add(v); else if (op.equals("SELL")) inv.sell(v);\n        }\n        System.out.println(inv.get());\n    }\n}`,
      sampleStdin: '10\nADD 15\nSELL 30\nSELL 8',
      expectedOutput: '17',
    },
    starterCode: `import java.util.*;\npublic class Main {\n    static class Inventory {\n        private long qty;\n        Inventory(long init) { this.qty = Math.max(0, init); }\n        void add(long x) { if (x > 0) qty += x; }\n        void sell(long x) { if (x > 0 && x <= qty) qty -= x; }\n        long get() { return qty; }\n    }\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        Inventory inv = new Inventory(sc.nextLong());\n        while (sc.hasNext()) {\n            String op = sc.next();\n            long v = sc.nextLong();\n            if (op.equals("ADD")) inv.add(v); else if (op.equals("SELL")) inv.sell(v);\n        }\n        System.out.println(inv.get());\n    }\n}`,
    sampleStdin: '10\nADD 15\nSELL 30\nSELL 8',
    expectedSampleOutput: '17',
    testCases: [
      { id: 'java18-t1', input: '10\nADD 15\nSELL 30\nSELL 8', expectedOutput: '17' },
      { id: 'java18-t2', input: '5\nADD 5\nSELL 10', expectedOutput: '0', isHidden: true },
    ],
  },
  19: {
    chapterNumber: 19,
    title: 'Inheritance, Interfaces, Sealed Types & Polymorphism in Java',
    banglaTitle: 'ইনহেরিট্যান্স, ইন্টারফেস ও পলিমরফিজম (Java 21)',
    subtitle: 'interface contracts, extends, @Override dynamic dispatch, and super() chaining',
    zeroIntuition: {
      plainEnglishStory:
        'Java separates "what something can do" (`interface`) from "what something is" (`extends`). By coding callers against an `interface Shape { long area(); }` rather than concrete classes, you can pass rectangles, squares, or circles into the same `List<Shape>` loop and let the JVM’s dynamic dispatch invoke each object’s `@Override` method at runtime.\n\nJava forbids multiple class inheritance to prevent the diamond ambiguity problem, allowing instead unlimited `implements` interfaces plus Java 21 `sealed interface` hierarchies when all allowed subtypes are known.',
      asciiFlowchart:
        'interface Shape { long area(); }\n   |-- implements Rect(w, h)   -> vtable -> w * h\n   |-- implements Square(a)    -> vtable -> a * a\nList<Shape> -> dynamic dispatch invokes exact @Override!',
      pseudocode: [
        '1. DEFINE interface or abstract base contract',
        '2. IMPLEMENT concrete classes with explicit @Override annotations',
        '3. ITERATE List<Interface> cleanly without instanceof chains',
      ],
      banglaZeroToHero: {
        analogyTitle: 'একাধিক প্লাগ-ইন (`interface`) আর রানটাইমে সঠিক মেথড বাছাই (`@Override`)',
        explanation:
          'বড় সফটওয়্যারে প্রতিটি নতুন শেপ বা পেমেন্ট পদ্ধতির জন্য যদি আলাদা `if-else` লিখতে হয়, তাহলে কোড দ্রুত জটিল ও ভঙ্গুর হয়ে পড়ে। জাভায় ইন্টারফেস (`interface`) হলো একটি শুদ্ধ কন্ট্রাক্ট: যেমন `interface Shape { long area(); }` বলে দেয় এই চুক্তি মানতে হলে প্রত্যেক ক্লাসের নিজস্ব `area()` থাকতেই হবে। একটি ক্লাস কেবল একটি প্যারেন্ট `extends` করতে পারে (যাতে ডায়মন্ড সমস্যা না হয়), কিন্তু অসংখ্য ইন্টারফেস `implements` করতে পারে! যখন আমরা `List<Shape>`-এর ভেতর `Rect` এবং `Square` উভয়ই রেখে `s.area()` কল করি, তখন JVM রানটাইমে অবজেক্টটির আসল ক্লাস দেখে সঠিক মেথডটি চালায়—একেই ডাইনামিক পলিমরফিজম বলে। মেথড ওভাররাইড করার সময় সব সময় `@Override` অ্যানোটেশন দেবে; এতে বানান বা প্যারামিটার ভুল হলে কম্পাইলার সাথে সাথেই ধরে ফেলে। আর প্যারেন্ট ক্লাসের কনস্ট্রাক্টর বা মেথড কল করতে `super(...)` ব্যবহার করা হয়। এই অধ্যায়ে তুমি ইন্টারফেস, ইনহেরিট্যান্স, `@Override` এবং পলিমরফিক ডিসপ্যাচ আয়ত্ত করবে।',
        everydayExample: 'সার্বজনীন ইউএসবি-সি পোর্ট (`interface`) থাকায় ফোনের ভেতরের চিপ ভিন্ন হলেও একই চার্জার দিয়ে চার্জ হয়।',
        keyTakeaways: [
          'মেথড ওভাররাইড করার সময় সর্বদা `@Override` ব্যবহার করো যেন টাইপ বা নামের ভুল কম্পাইলার ধরে।',
          'শেয়ার্ড কোডের চেয়ে আচরণগত চুক্তির জন্য `extends`-এর আগে `interface` পছন্দ করো।',
          'সব ক্ষেত্রে `super(...)` কনস্ট্রাক্টরের একদম প্রথম লাইনেই থাকতে হবে।',
        ],
      },
    },
    topics: [
      {
        id: 'java-ch19-t1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Interface Contract & Dynamic Dispatch',
        englishParagraphs: [
          'Define `interface Notifier` with `Email` and `Sms` implementations stored uniformly in `List<Notifier>`.',
        ],
        banglaParagraphs: [
          '`interface Notifier` বানিয়ে `Email` ও `Sms` ক্লাসকে `List<Notifier>` লুপে পলিমরফিকভাবে চালাও।',
        ],
        memoryDiagram: 'List<Notifier> -> Email.send() / Sms.send()',
        code: `import java.util.*;
public class Main {
    interface Notifier { String send(String msg); }
    static class Email implements Notifier {
        @Override public String send(String m) { return "EMAIL:" + m; }
    }
    static class Sms implements Notifier {
        @Override public String send(String m) { return "SMS:" + m; }
    }
    public static void main(String[] args) {
        List<Notifier> list = List.of(new Email(), new Sms());
        for (Notifier n : list) System.out.println(n.send("OK"));
    }
}`,
        stdin: '',
        expectedOutput: 'EMAIL:OK\nSMS:OK',
        lineByLine: [
          { lineNumber: 'Line 3', codeSnippet: 'interface Notifier { String send(String msg); }', whatItMeans: 'Declares behavioral contract required of all notifiers.', whyItIsThere: 'Decouples callers from concrete notification classes.', ifDeletedError: 'Notifier symbol missing.' },
          { lineNumber: 'Line 5', codeSnippet: '@Override public String send(String m)', whatItMeans: 'Verifies method signature matches `Notifier` at compile time.', whyItIsThere: 'Catches accidental typos or parameter mismatches.', ifDeletedError: 'Compile error: Email does not override abstract method.' },
        ],
      },
      {
        id: 'java-ch19-t2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Extending Base Class & Calling super()',
        englishParagraphs: [
          'Read base pay and bonus from stdin and compute `BonusEmployee.pay()` using `super.pay()`.',
        ],
        banglaParagraphs: [
          'সাবক্লাস থেকে `super.pay()` কল করে বেস বেতন ও বোনাস একসাথে যোগ করো।',
        ],
        memoryDiagram: 'BonusEmp(1000, 250).pay() -> super.pay() + 250 = 1250',
        code: `import java.util.*;
public class Main {
    static class Emp {
        private final long base;
        Emp(long b) { this.base = b; }
        long pay() { return base; }
    }
    static class BonusEmp extends Emp {
        private final long bonus;
        BonusEmp(long b, long bon) { super(b); this.bonus = bon; }
        @Override long pay() { return super.pay() + bonus; }
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        BonusEmp e = new BonusEmp(sc.nextLong(), sc.nextLong());
        System.out.println(e.pay());
    }
}`,
        stdin: '1000 250',
        expectedOutput: '1250',
        lineByLine: [
          { lineNumber: 'Line 10', codeSnippet: 'BonusEmp(long b, long bon) { super(b); this.bonus = bon; }', whatItMeans: 'Chains constructor call to superclass `Emp`.', whyItIsThere: 'Initializes `private` field `base` cleanly.', ifDeletedError: 'Compile error: constructor Emp() undefined.' },
        ],
      },
      {
        id: 'java-ch19-t3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Strategy Pattern via Functional Interfaces',
        englishParagraphs: [
          'Single-method `@FunctionalInterface` contracts work seamlessly with classes or lambdas to swap discount rules dynamically.',
        ],
        banglaParagraphs: [
          '`@FunctionalInterface` ব্যবহার করে ফ্ল্যাট বা শতাংশ ডিসকাউন্ট কৌশল সহজেই পরিবর্তন করো।',
        ],
        memoryDiagram: 'Rule apply(amt) -> Flat(15) | Pct(10)',
        code: `public class Main {
    @FunctionalInterface
    interface Rule { long apply(long amt); }
    public static void main(String[] args) {
        Rule flat = amt -> Math.max(0, amt - 15);
        Rule pct = amt -> amt - (amt * 10) / 100;
        System.out.println(flat.apply(100) + pct.apply(200));
    }
}`,
        stdin: '',
        expectedOutput: '265',
        lineByLine: [
          { lineNumber: 'Line 3', codeSnippet: 'interface Rule { long apply(long amt); }', whatItMeans: 'Single-method contract enabling lambda strategies.', whyItIsThere: 'Replaces verbose concrete boilerplate cleanly.', ifDeletedError: 'Rule type missing.' },
        ],
      },
      {
        id: 'java-ch19-t4',
        badge: 'Example 4: Bug Trap vs. Production Pattern',
        title: 'Fixing Missing @Override Overload Bug',
        englishParagraphs: [
          'Accidentally changing parameter types creates an *overload* instead of an *override*, leaving the parent method active! Always write `@Override` so `javac` blocks it.',
        ],
        banglaParagraphs: [
          'ভুল প্যারামিটার টাইপ দিলে মেথড ওভাররাইড না হয়ে ওভারলোড হয়ে যায়—`@Override` দিলে কম্পাইলার সাথে সাথেই ধরে দেবে।',
        ],
        memoryDiagram: 'Child.val(long) @Override -> called cleanly through Base ref',
        code: `public class Main {
    static class Base { long val(long x) { return x; } }
    static class Doubler extends Base {
        @Override long val(long x) { return x * 2; }
    }
    public static void main(String[] args) {
        Base b = new Doubler();
        System.out.println(b.val(21L));
    }
}`,
        stdin: '',
        expectedOutput: '42',
        lineByLine: [
          { lineNumber: 'Line 4', codeSnippet: '@Override long val(long x) { return x * 2; }', whatItMeans: 'Guarantees signature exact-match with `Base.val(long)`.', whyItIsThere: 'Prevents silent overload bug if arg type were `int`.', ifDeletedError: 'Calls `Base.val` returning 21.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 3', codeSnippet: 'interface Notifier { String send(String msg); }', whatItMeans: 'Defines uniform method signature.', whyItIsThere: 'Enables polymorphic collections.', ifDeletedError: 'Cannot refer to `Notifier`.' },
      { lineNumber: 'Line 5', codeSnippet: '@Override public String send(String m)', whatItMeans: 'Concrete `Email` implementation of `Notifier`.', whyItIsThere: 'Compile-verified contract fulfillment.', ifDeletedError: 'Email fails interface requirement.' },
      { lineNumber: 'Line 12', codeSnippet: 'for (Notifier n : list) System.out.println(n.send("OK"));', whatItMeans: 'JVM dynamic dispatch loop.', whyItIsThere: 'Executes each object’s class behavior.', ifDeletedError: 'No output.' },
    ],
    dryRunTable: [
      { step: 1, state: 'List<Notifier>', memoryOrStack: '[Email, Sms]', note: 'Stored behind interface type' },
      { step: 2, state: 'n = Email', memoryOrStack: 'n.send("OK")', note: 'vtable selects Email.send -> EMAIL:OK' },
      { step: 3, state: 'n = Sms', memoryOrStack: 'n.send("OK")', note: 'vtable selects Sms.send -> SMS:OK' },
      { step: 4, state: 'Loop ends', memoryOrStack: '2 lines printed', note: 'Extensible without modifying loop' },
    ],
    harryBugTraps: [
      { title: 'Trap 1: Omitting `@Override` and Accidentally Overloading', brokenCode: 'class Child extends Base { long val(int x) { return x*2; } }', fixedCode: 'class Child extends Base { @Override long val(long x) { return x*2; } }', whyItBreaks: 'Calling `Base.val(21L)` picks the `long` parent method instead of `Child(int)`.' },
      { title: 'Trap 2: Calling `super()` After Other Statements', brokenCode: 'Child(int x) { this.x = x; super(); } // compile error!', fixedCode: 'Child(int x) { super(); this.x = x; }', whyItBreaks: 'Java requires `super(...)` to be the very first statement in a subclass constructor.' },
      { title: 'Trap 3: Violating Liskov Substitution in Subclass', brokenCode: 'class Square extends Rect { void setW(...) { w=h=x; } }', fixedCode: 'interface Shape { long area(); } implemented independently', whyItBreaks: 'Mutating `Square.width` silently alters `height`, breaking callers expecting `Rect`.' },
    ],
    practiceSheet: [
      {
        id: 'java-ch19-p1',
        difficulty: 'Easy',
        title: 'Animal Speak Interface',
        prompt: 'Implement `Animal` interface with `Dog` (`"WOOF"`) and `Cat` (`"MEOW"`) and print space-joined outputs for `D`/`C` tokens.',
        banglaHint: '`Animal a = tok.equals("D") ? new Dog() : new Cat();` ব্যবহার করো।',
        starterCode: `import java.util.*;\npublic class Main {\n    interface Animal { String speak(); }\n    static class Dog implements Animal { public String speak() { return "WOOF"; } }\n    static class Cat implements Animal { public String speak() { return "MEOW"; } }\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        StringBuilder sb = new StringBuilder();\n        while (sc.hasNext()) {\n            Animal a = sc.next().equals("D") ? new Dog() : new Cat();\n            if (sb.length() > 0) sb.append(' ');\n            sb.append(a.speak());\n        }\n        System.out.println(sb);\n    }\n}`,
        sampleStdin: 'D C D',
        expectedOutput: 'WOOF MEOW WOOF',
      },
      {
        id: 'java-ch19-p2',
        difficulty: 'Easy',
        title: 'Discount Item Inheritance',
        prompt: 'Create `Item(long price)` and `DiscountItem(long price, long off)` using `super(price)` and `@Override`.',
        banglaHint: '`Math.max(0, super.finalPrice() - off)` রিটার্ন করো।',
        starterCode: `import java.util.*;\npublic class Main {\n    static class Item {\n        private final long p;\n        Item(long p) { this.p = p; }\n        long finalPrice() { return p; }\n    }\n    static class DiscountItem extends Item {\n        private final long off;\n        DiscountItem(long p, long off) { super(p); this.off = off; }\n        @Override long finalPrice() { return Math.max(0, super.finalPrice() - off); }\n    }\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        System.out.println(new DiscountItem(sc.nextLong(), sc.nextLong()).finalPrice());\n    }\n}`,
        sampleStdin: '500 120',
        expectedOutput: '380',
      },
      {
        id: 'java-ch19-p3',
        difficulty: 'Medium',
        title: 'Polymorphic Fee Calculators',
        prompt: 'Implement `FeeRule` interface with `FlatFee(d)` and `PctFee(p)` and sum fees over `n` items.',
        banglaHint: '`F x d` এর জন্য `FlatFee` এবং `P x p` এর জন্য `PctFee` চালিয়ে যোগ করো।',
        starterCode: `import java.util.*;\npublic class Main {\n    interface Fee { long calc(long x); }\n    static class Flat implements Fee { long d; Flat(long d){this.d=d;} public long calc(long x){return Math.max(0, x-d);} }\n    static class Pct implements Fee { long p; Pct(long p){this.p=p;} public long calc(long x){return x - (x*p)/100;} }\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt(); long tot = 0;\n        for (int i = 0; i < n; i++) {\n            String k = sc.next(); long x = sc.nextLong(), d = sc.nextLong();\n            Fee f = k.equals("F") ? new Flat(d) : new Pct(d);\n            tot += f.calc(x);\n        }\n        System.out.println(tot);\n    }\n}`,
        sampleStdin: '2\nF 100 15\nP 200 10',
        expectedOutput: '265',
      },
      {
        id: 'java-ch19-p4',
        difficulty: 'Medium',
        title: 'Sealed Result Evaluation',
        prompt: 'Define `sealed interface Res permits Ok, Err` using Java 21 `record` variants and compute sum of valid `Ok` values.',
        banglaHint: '`if (r instanceof Ok(long v)) sum += v;` ব্যবহার করো।',
        starterCode: `import java.util.*;\npublic class Main {\n    sealed interface Res permits Ok, Err {}\n    record Ok(long v) implements Res {}\n    record Err(String m) implements Res {}\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt(); long sum = 0;\n        for (int i = 0; i < n; i++) {\n            Res r = sc.next().equals("ok") ? new Ok(sc.nextLong()) : new Err(sc.next());\n            if (r instanceof Ok(long v)) sum += v;\n        }\n        System.out.println(sum);\n    }\n}`,
        sampleStdin: '3\nok 15 fail timeout ok 25',
        expectedOutput: '40',
      },
      {
        id: 'java-ch19-p5',
        difficulty: 'Hard',
        title: 'Polymorphic Expression Tree Evaluator',
        prompt: 'Parse `Num(v)` and `Add(l, r)` nodes via `Expr` interface to evaluate `(a + b) + c`.',
        banglaHint: '`Add` ক্লাস `l.eval() + r.eval()` রিটার্ন করবে।',
        starterCode: `import java.util.*;\npublic class Main {\n    interface Expr { long eval(); }\n    record Num(long v) implements Expr { public long eval() { return v; } }\n    record Add(Expr l, Expr r) implements Expr { public long eval() { return l.eval() + r.eval(); } }\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        Expr t = new Add(new Add(new Num(sc.nextLong()), new Num(sc.nextLong())), new Num(sc.nextLong()));\n        System.out.println(t.eval());\n    }\n}`,
        sampleStdin: '3 4 5',
        expectedOutput: '12',
      },
    ],
    miniBuild: {
      title: 'Mini-Build: Polymorphic Geometry Area Aggregator',
      description: 'Store `Rect` and `Square` implementations behind `interface Shape` in `ArrayList<Shape>` and sum all areas dynamically.',
      banglaGoal: 'ইন্টারফেস ও পলিমরফিক ডিসপ্যাচ মিলিয়ে জ্যামিতিক ক্ষেত্রফল এগ্রিগেটর তৈরি করো।',
      combinesChapters: 'Ch 11, 18, 19',
      starterCode: `import java.util.*;\npublic class Main {\n    interface Shape { long area(); }\n    record Rect(long w, long h) implements Shape { public long area() { return w * h; } }\n    record Square(long a) implements Shape { public long area() { return a * a; } }\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        List<Shape> shapes = new ArrayList<>();\n        for (int i = 0; i < n; i++) {\n            if (sc.next().equals("R")) shapes.add(new Rect(sc.nextLong(), sc.nextLong()));\n            else shapes.add(new Square(sc.nextLong()));\n        }\n        long total = 0;\n        for (Shape s : shapes) total += s.area();\n        System.out.println(total);\n    }\n}`,
      sampleStdin: '2\nR 4 5\nS 6',
      expectedOutput: '56',
    },
    starterCode: `import java.util.*;\npublic class Main {\n    interface Shape { long area(); }\n    record Rect(long w, long h) implements Shape { public long area() { return w * h; } }\n    record Square(long a) implements Shape { public long area() { return a * a; } }\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        List<Shape> shapes = new ArrayList<>();\n        for (int i = 0; i < n; i++) {\n            if (sc.next().equals("R")) shapes.add(new Rect(sc.nextLong(), sc.nextLong()));\n            else shapes.add(new Square(sc.nextLong()));\n        }\n        long total = 0;\n        for (Shape s : shapes) total += s.area();\n        System.out.println(total);\n    }\n}`,
    sampleStdin: '2\nR 4 5\nS 6',
    expectedSampleOutput: '56',
    testCases: [
      { id: 'java19-t1', input: '2\nR 4 5\nS 6', expectedOutput: '56' },
      { id: 'java19-t2', input: '3\nS 2\nS 3\nR 1 10', expectedOutput: '23', isHidden: true },
    ],
  },
  20: {
    chapterNumber: 20,
    isMilestoneMerger: true,
    title: 'Java Chapter 20: Generics & Java Collections Framework / Streams — Merger 4',
    banglaTitle: 'Java অধ্যায় ২০: জেনারিক্স ও Java Collections / Streams — মার্জার ৪',
    subtitle: 'Milestone Merger 4: Combine generic classes/methods, HashMap, TreeSet, PriorityQueue, and Java 21 Stream pipelines.',
    zeroIntuition: {
      plainEnglishStory:
        'Using raw Object lists forces unsafe runtime casts that blow up with ClassCastException in production. Java Generics (<T>) check element types at compile time while Collections—ArrayList, HashMap, TreeSet, and PriorityQueue—provide battle-tested data structures for O(1) lookup and O(log n) ordering.\n\nIn Java 21, combining generic helper methods with Streams or Comparator.comparing lets you ingest, count, sort, and format complex datasets cleanly in a fraction of the code.',
      asciiFlowchart: `  [ Scanner Token Stream ]
          |
          +--> HashMap<String, Integer> freq (O(1) merge/getOrDefault)
          +--> ArrayList<Map.Entry<String, Integer>> rows
          +--> rows.sort(Comparator.comparingInt(...).reversed().thenComparing(...))
          |
          v
  [ Deterministic Leaderboard Output ]`,
      pseudocode: [
        '1. DEFINE generic utility <T extends Comparable<T>> maxOf(T a, T b)',
        '2. TALLY frequencies in HashMap<String, Integer> via merge(w, 1, Integer::sum)',
        '3. SORT entries descending by count, ascending alphabetically by key',
        '4. PRINT ranked results and leverage TreeSet/PriorityQueue for ordered queries',
      ],
      banglaZeroToHero: {
        analogyTitle: 'টাইপ-সুরক্ষিত কন্টেইনার ইয়ার্ড ও সর্টিং বেল্ট (Generics + Collections)',
        explanation:
          'ধরো একটি আধুনিক কারখানায় আলাদা আলাদা পণ্যের জন্য আলাদা লেবেল করা কন্টেইনার আছে, যাতে ভুল করে লোহার যন্ত্র কাঁচের বাক্সে ঢুকে না পড়ে। Java Generics (<T>) ঠিক সেই কম্পাইল-টাইম লেবেলিং নিশ্চিত করে। আগে Object দিয়ে লিস্ট বানালে রানটাইমে ভুল টাইপের কারণে ClassCastException হতো; জেনারিক্স ব্যবহার করলে কম্পাইলারই কোড লেখার সময় ভুল ধরে দেয়। এর সাথে Java Collections Framework-এর HashMap (O(1) ফ্রিকোয়েন্সি কাউন্ট), TreeSet (স্বয়ংক্রিয় সাজানো ও ইউনিক), ArrayDeque (দ্রুত কিউ/স্ট্যাক) এবং PriorityQueue (হিপ) যুক্ত হলে যেকোনো জটিল ডেটা প্রসেসিং অনায়েসে হয়ে যায়। মার্জার ৪ অধ্যায়ে আমরা জেনারিক্স, ল্যাম্বডা কম্পারেটর এবং কালেকশনস একত্রে ব্যবহার করে দ্রুত ও ক্লিন কোড লেখা শিখবো। টেকনিক্যাল ইন্টারভিউ ও এন্টারপ্রাইজ ব্যাকএন্ড উভয় ক্ষেত্রেই Java Collections সবচেয়ে বেশি ব্যবহৃত হয়।',
        everydayExample: 'ওষুধের লেবেলযুক্ত কম্পার্টমেন্ট বক্স: প্রতিটি খোপে শুধু নির্দিষ্ট গ্রুপের ডেটাই রাখা যাবে।',
        keyTakeaways: [
          'HashMap.merge(k, 1, Integer::sum) দিয়ে এক লাইনে নিরাপদ ফ্রিকোয়েন্সি কাউন্ট হয়।',
          'Comparator.comparingInt এবং thenComparing দিয়ে ক্লিন মাল্টি-কী সর্টিং লেখা যায়।',
          'Java Generics কেবল কম্পাইল-টাইম সেফটি দেয় (type erasure), প্রিমিটিভের বদলে Wrapper (Integer) লাগে।',
        ],
      },
    },
    topics: [
      {
        id: 'java-ch-20-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Generic Max Method & Sorted ArrayList Pipeline',
        englishParagraphs: [
          'A single generic method <T extends Comparable<T>> finds the maximum of any comparable type cleanly.',
        ],
        banglaParagraphs: [
          'একটি জেনেরিক মেথড <T extends Comparable<T>> Integer ও String উভয়ের সর্বোচ্চ মান বের করে।',
        ],
        memoryDiagram: `maxOf<Integer>(10, 40) -> 40 | maxOf<String>("go", "rust") -> "rust"`,
        code: `import java.util.*;

public class Main {
    static <T extends Comparable<T>> T maxOf(T a, T b) {
        return a.compareTo(b) >= 0 ? a : b;
    }
    public static void main(String[] args) {
        List<Integer> nums = new ArrayList<>(List.of(40, 10, 30, 20));
        Collections.sort(nums);
        System.out.println(maxOf(nums.get(0), nums.get(nums.size() - 1)) + " " + maxOf("go", "rust"));
    }
}`,
        stdin: '',
        expectedOutput: '40 rust',
        lineByLine: [
          {
            lineNumber: 'Line 4',
            codeSnippet: 'static <T extends Comparable<T>> T maxOf(T a, T b) {',
            whatItMeans: 'Declares bounded type parameter T supporting compareTo().',
            whyItIsThere: 'Guarantees a.compareTo(b) is type-safe for any comparable class.',
            ifDeletedError: 'Cannot invoke compareTo on unconstrained type T.',
          },
          {
            lineNumber: 'Line 9',
            codeSnippet: 'Collections.sort(nums);',
            whatItMeans: 'Sorts mutable ArrayList using TimSort in O(n log n).',
            whyItIsThere: 'Orders elements from smallest to largest.',
            ifDeletedError: 'Last item stays 20 instead of 40.',
          },
        ],
      },
      {
        id: 'java-ch-20-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'HashMap Frequency Counter & Multi-Key Comparator',
        englishParagraphs: [
          'Tally word occurrences in a HashMap and sort entries by count descending then alphabetically.',
        ],
        banglaParagraphs: [
          'HashMap.merge দিয়ে শব্দ গুনে কাস্টম কম্পারেটর দিয়ে র‍্যাঙ্কিং প্রিন্ট করো।',
        ],
        memoryDiagram: `HashMap -> Entry List -> sort(count DESC, key ASC)`,
        code: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        Map<String, Integer> freq = new HashMap<>();
        for (int i = 0; i < n; i++) freq.merge(sc.next(), 1, Integer::sum);
        List<Map.Entry<String, Integer>> rows = new ArrayList<>(freq.entrySet());
        rows.sort((a, b) -> !a.getValue().equals(b.getValue())
                ? Integer.compare(b.getValue(), a.getValue())
                : a.getKey().compareTo(b.getKey()));
        for (var e : rows) System.out.println(e.getKey() + ":" + e.getValue());
    }
}`,
        stdin: '5\njava rust java go rust',
        expectedOutput: 'java:2\nrust:2\ngo:1',
        lineByLine: [
          {
            lineNumber: 'Line 9',
            codeSnippet: 'freq.merge(sc.next(), 1, Integer::sum);',
            whatItMeans: 'Inserts 1 if missing or adds 1 to existing count atomically.',
            whyItIsThere: 'Replaces verbose containsKey / getOrDefault boilerplate.',
            ifDeletedError: 'Frequency map remains empty.',
          },
        ],
      },
      {
        id: 'java-ch-20-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'TreeSet Ceiling Query & Deduplication',
        englishParagraphs: [
          'TreeSet keeps unique integers sorted in a Red-Black Tree and answers ceiling(q) in O(log n).',
        ],
        banglaParagraphs: [
          'TreeSet ডুপ্লিকেট বাদ দিয়ে মান সাজিয়ে রাখে এবং ceiling(q) দিয়ে O(log n)-এ পরবর্তী বড় মান দেয়।',
        ],
        memoryDiagram: `TreeSet {10, 20, 35} -> ceiling(22) -> 35`,
        code: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt(), q = sc.nextInt();
        TreeSet<Integer> ts = new TreeSet<>();
        for (int i = 0; i < n; i++) ts.add(sc.nextInt());
        Integer hit = ts.ceiling(q);
        System.out.println(ts.size() + " " + (hit == null ? -1 : hit));
    }
}`,
        stdin: '5 22\n35 10 20 10 35',
        expectedOutput: '3 35',
        lineByLine: [
          {
            lineNumber: 'Line 9',
            codeSnippet: 'Integer hit = ts.ceiling(q);',
            whatItMeans: 'Returns least element >= q or null in O(log n).',
            whyItIsThere: 'NavigableSet binary-searches the balanced tree directly.',
            ifDeletedError: 'Cannot resolve ceiling query.',
          },
        ],
      },
      {
        id: 'java-ch-20-topic-4',
        badge: 'Example 4: Bug Trap vs. Production Pattern',
        title: 'Comparator Subtraction Overflow & List.of Immutability',
        englishParagraphs: [
          'Never write (a, b) -> a - b on extreme ints because subtraction overflows; always use Integer.compare(a, b).',
        ],
        banglaParagraphs: [
          'কম্পারেটরে a - b লিখলে বড় সংখ্যায় ওভারফ্লো হয়ে ভুল অর্ডার হয়; সবসময় Integer.compare(a, b) ব্যবহার করো।',
        ],
        memoryDiagram: `(-2_000_000_000) - (2_000_000_000) OVERFLOWS vs Integer.compare() SAFE`,
        code: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<Integer> vals = new ArrayList<>(List.of(2000000000, -2000000000, 0));
        vals.sort(Integer::compare);
        System.out.println(vals.get(0) + " " + vals.get(2));
    }
}`,
        stdin: '',
        expectedOutput: '-2000000000 2000000000',
        lineByLine: [
          {
            lineNumber: 'Line 6',
            codeSnippet: 'vals.sort(Integer::compare);',
            whatItMeans: 'Compares integers safely without subtraction overflow.',
            whyItIsThere: 'Prevents sign-flip bugs across full 32-bit int range.',
            ifDeletedError: 'List stays unsorted.',
          },
        ],
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 4',
        codeSnippet: 'static <T extends Comparable<T>> T maxOf(T a, T b) {',
        whatItMeans: 'Declares bounded type parameter T supporting compareTo().',
        whyItIsThere: 'Guarantees a.compareTo(b) is type-safe for any comparable class.',
        ifDeletedError: 'Cannot invoke compareTo on unconstrained type T.',
      },
      {
        lineNumber: 'Line 5',
        codeSnippet: 'return a.compareTo(b) >= 0 ? a : b;',
        whatItMeans: 'Selects larger object using Comparable contract.',
        whyItIsThere: 'Works identically for Integers, Strings, and custom objects.',
        ifDeletedError: 'Method fails to return a value.',
      },
      {
        lineNumber: 'Line 8',
        codeSnippet: 'List<Integer> nums = new ArrayList<>(List.of(40, 10, 30, 20));',
        whatItMeans: 'Wraps immutable List.of inside mutable ArrayList.',
        whyItIsThere: 'Allows in-place sorting without UnsupportedOperationException.',
        ifDeletedError: 'Sorting directly on List.of crashes at runtime.',
      },
      {
        lineNumber: 'Line 9',
        codeSnippet: 'Collections.sort(nums);',
        whatItMeans: 'Sorts mutable ArrayList using TimSort in O(n log n).',
        whyItIsThere: 'Orders elements from smallest to largest.',
        ifDeletedError: 'Last item stays 20 instead of 40.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'freq.merge("java",1) x2', memoryOrStack: 'Map { java:2 }', note: 'O(1) hash update' },
      { step: 2, state: 'freq.merge("rust",1) x2', memoryOrStack: 'Map { java:2, rust:2, go:1 }', note: '3 entries total' },
      { step: 3, state: 'rows.sort(...) tie java vs rust', memoryOrStack: '"java".compareTo("rust") < 0', note: 'java placed first' },
      { step: 4, state: 'Print rows', memoryOrStack: 'java:2 / rust:2 / go:1', note: 'Deterministic leaderboard' },
    ],
    harryBugTraps: [
      {
        title: 'Calling Collections.sort() on Arrays.asList/List.of Directly',
        brokenCode: `List<Integer> a = List.of(3, 1); Collections.sort(a);`,
        fixedCode: `List<Integer> a = new ArrayList<>(List.of(3, 1)); Collections.sort(a);`,
        whyItBreaks: 'List.of returns an unmodifiable list and throws UnsupportedOperationException on sort.',
      },
      {
        title: 'Using (a, b) -> a - b Comparator',
        brokenCode: `list.sort((a, b) -> a - b);`,
        fixedCode: `list.sort(Integer::compare);`,
        whyItBreaks: 'Subtracting large positive and negative ints overflows 32-bit int and corrupts sort order.',
      },
      {
        title: 'Comparing Integer Objects With == Above 127',
        brokenCode: `if (e1.getValue() == e2.getValue())`,
        fixedCode: `if (e1.getValue().equals(e2.getValue()))`,
        whyItBreaks: 'Java only caches Integer instances -128..127; == compares object references outside that range.',
      },
    ],
    practiceSheet: [
      {
        id: 'java-ch-20-p1',
        difficulty: 'Easy',
        title: 'Generic Pair Box Class',
        prompt: 'Create class Pair<A, B>(A first, B second), read n key-value pairs, and print the one with highest integer value.',
        banglaHint: 'ইঙ্গিত: Pair<String, Integer> রেকর্ড বানিয়ে লুপে সর্বোচ্চ ভ্যালু রাখো।',
        starterCode: `import java.util.*;\npublic class Main {\n    record Pair<A, B>(A first, B second) {}\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        Pair<String, Integer> best = null;\n        for (int i = 0; i < n; i++) {\n            Pair<String, Integer> cur = new Pair<>(sc.next(), sc.nextInt());\n            if (best == null || cur.second() > best.second()) best = cur;\n        }\n        System.out.println(best.first() + " " + best.second());\n    }\n}`,
        sampleStdin: '3\nalpha 15 beta 42 gamma 19',
        expectedOutput: 'beta 42',
      },
      {
        id: 'java-ch-20-p2',
        difficulty: 'Easy',
        title: 'TreeSet Unique Sorted Words',
        prompt: 'Read n words into a TreeSet<String> and print unique count and space-joined sorted words.',
        banglaHint: 'ইঙ্গিত: TreeSet<String> ব্যবহার করলে শব্দগুলো ডুপ্লিকেটমুক্ত ও অ্যালফাবেটিক্যালি সাজানো থাকবে।',
        starterCode: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        TreeSet<String> set = new TreeSet<>();\n        for (int i = 0; i < n; i++) set.add(sc.next());\n        System.out.println(set.size() + " " + String.join(" ", set));\n    }\n}`,
        sampleStdin: '5\npear apple pear fig apple',
        expectedOutput: '3 apple fig pear',
      },
      {
        id: 'java-ch-20-p3',
        difficulty: 'Medium',
        title: 'Stream Top-K Filtered Sum',
        prompt: 'Read k and integers, keep strictly positive unique numbers, sort descending, and print sum of top k.',
        banglaHint: 'ইঙ্গিত: stream().filter(x -> x > 0).distinct().sorted(Comparator.reverseOrder()).limit(k) ব্যবহার করো।',
        starterCode: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int k = sc.nextInt();\n        List<Integer> nums = new ArrayList<>();\n        while (sc.hasNextInt()) nums.add(sc.nextInt());\n        int ans = nums.stream().filter(x -> x > 0).distinct()\n            .sorted(Comparator.reverseOrder()).limit(k).mapToInt(Integer::intValue).sum();\n        System.out.println(ans);\n    }\n}`,
        sampleStdin: '2 -5 10 4 10 8',
        expectedOutput: '18',
      },
      {
        id: 'java-ch-20-p4',
        difficulty: 'Medium',
        title: 'HashMap Category Aggregator',
        prompt: 'Read n category-amount pairs into a TreeMap<String, Long> and print "cat:total" lines.',
        banglaHint: 'ইঙ্গিত: TreeMap কী-কে স্বয়ংক্রিয়ভাবে বর্ণানুক্রমে সাজিয়ে রাখে।',
        starterCode: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        TreeMap<String, Long> tm = new TreeMap<>();\n        for (int i = 0; i < n; i++) tm.merge(sc.next(), sc.nextLong(), Long::sum);\n        tm.forEach((k, v) -> System.out.println(k + ":" + v));\n    }\n}`,
        sampleStdin: '3\nfood 50 tech 120 food 30',
        expectedOutput: 'food:80\ntech:120',
      },
      {
        id: 'java-ch-20-p5',
        difficulty: 'Hard',
        title: 'PriorityQueue K-th Largest Element',
        prompt: 'Read n and k followed by n integers; find the k-th largest using PriorityQueue.',
        banglaHint: 'ইঙ্গিত: ক্যাপাসিটি k-এর min-heap রাখতে হলে pq.size() > k হলে pq.poll() করো।',
        starterCode: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt(), k = sc.nextInt();\n        PriorityQueue<Integer> pq = new PriorityQueue<>();\n        for (int i = 0; i < n; i++) {\n            pq.offer(sc.nextInt());\n            if (pq.size() > k) pq.poll();\n        }\n        System.out.println(pq.peek());\n    }\n}`,
        sampleStdin: '6 2\n3 2 1 5 6 4',
        expectedOutput: '5',
      },
    ],
    miniBuild: {
      title: 'Milestone Merger 4: Generic Collections Frequency Leaderboard',
      description: 'Combine HashMap, ArrayList, and Comparator to rank tokens by frequency descending then name ascending.',
      banglaGoal: 'মার্জার ৪: HashMap ও কাস্টম Comparator দিয়ে ডাইনামিক ফ্রিকোয়েন্সি লিডারবোর্ড তৈরি।',
      combinesChapters: 'Ch 11, 16, 18, 20',
      starterCode: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        Map<String, Integer> freq = new HashMap<>();\n        for (int i = 0; i < n; i++) freq.merge(sc.next(), 1, Integer::sum);\n        List<Map.Entry<String, Integer>> rows = new ArrayList<>(freq.entrySet());\n        rows.sort((a, b) -> !a.getValue().equals(b.getValue())\n                ? Integer.compare(b.getValue(), a.getValue())\n                : a.getKey().compareTo(b.getKey()));\n        for (var e : rows) System.out.println(e.getKey() + ":" + e.getValue());\n    }\n}`,
      sampleStdin: '5\njava rust java go rust',
      expectedOutput: 'java:2\nrust:2\ngo:1',
    },
    starterCode: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        Map<String, Integer> freq = new HashMap<>();\n        for (int i = 0; i < n; i++) freq.merge(sc.next(), 1, Integer::sum);\n        List<Map.Entry<String, Integer>> rows = new ArrayList<>(freq.entrySet());\n        rows.sort((a, b) -> !a.getValue().equals(b.getValue())\n                ? Integer.compare(b.getValue(), a.getValue())\n                : a.getKey().compareTo(b.getKey()));\n        for (var e : rows) System.out.println(e.getKey() + ":" + e.getValue());\n    }\n}`,
    sampleStdin: '5\njava rust java go rust',
    expectedSampleOutput: 'java:2\nrust:2\ngo:1',
    testCases: [
      { id: 'java20-t1', input: '5\njava rust java go rust', expectedOutput: 'java:2\nrust:2\ngo:1' },
      { id: 'java20-t2', input: '3\na a b', expectedOutput: 'a:2\nb:1', isHidden: true },
    ],
  },
};
