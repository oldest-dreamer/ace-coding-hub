import type { AtomicLessonOverride } from './atomicLessonTypes';

export const LESSONS_PYTHON_P4: Record<number, AtomicLessonOverride> = {
  16: {
    chapterNumber: 16,
    title: 'Object References, Mutability & Aliasing in Python',
    banglaTitle: 'অবজেক্ট রেফারেন্স, মিউটেবিলিটি ও অ্যালিয়াসিং (Python)',
    subtitle: 'Name-to-object binding, id(), shallow vs deep copies, and mutable default traps',
    zeroIntuition: {
      plainEnglishStory:
        'Python variables are not fixed RAM boxes holding values—they are sticky-note labels attached to objects living on the heap. Assigning `b = a` does not duplicate a `list` or `dict`; it binds a second name to the exact same object identity (`id(a) == id(b)`).\n\nImmutable objects (`int`, `str`, `tuple`) safely share labels because any "change" creates a new object, whereas mutating a shared `list` via `b.append(x)` silently alters `a` as well. Always slice (`a[:]`) or use `copy.deepcopy` for nested matrices, and never use `=[]` as a default function argument.',
      asciiFlowchart:
        'a = [1, 2]  -->  [ List @ 0x7f10: [1, 2] ]\nb = a       -->    ^ (same object! id(a) == id(b))\nc = a[:]    -->  [ List @ 0x7f99: [1, 2] ] (new copy)',
      pseudocode: ["b = a          # alias (shared mutation)","c = a.copy()   # shallow copy (top level)","d = deepcopy(a) # independent nested grids"],
      banglaZeroToHero: {
        analogyTitle: 'ভ্যারিয়েবল হলো বস্তুর গায়ের লেবেল, আর অ্যালিয়াসিং হলো একই জিনিসে দুটি নাম',
        explanation:
          'সি++-এ ভ্যারিয়েবল মানে একটি নির্দিষ্ট মেমোরি বাক্স, কিন্তু পাইথনে ভ্যারিয়েবল হলো হিপে থাকা অবজেক্টের গায়ে লাগানো একটি নাম-ট্যাগ বা লেবেল। তুমি যখন `a = [1, 2]` লেখার পর `b = a` লেখো, তখন পাইথন কোনো নতুন লিস্ট তৈরি করে না; বরং একই লিস্টের গায়ে `a` ও `b` দুটি ট্যাগ বসিয়ে দেয়। তাই `b.append(3)` করলে `a`-এর ভেতরেও `3` ঢুকে যায়, কারণ `id(a)` এবং `id(b)` সম্পূর্ণ একই। `int`, `str` ও `tuple` হলো অপরিবর্তনযোগ্য (immutable), তাই `x += 1` করলে নতুন সংখ্যা তৈরি হয় এবং পুরোনো রেফারেন্স নষ্ট হয় না। কিন্তু `list`, `dict` বা `set` হলো পরিবর্তনযোগ্য (mutable)—তাই আলাদা কপি বানাতে হলে এক-স্তরের লিস্টে `.copy()` বা `[:]` এবং টু-ডি গ্রিডের জন্য `copy.deepcopy()` ব্যবহার করতে হয়। পাইথনের সবচেয়ে কুখ্যাত বাগ হলো ফাংশনের ডিফল্ট প্যারামিটারে `def add(x, buf=[]):` লেখা, কারণ ডিফল্ট লিস্টটি ফাংশন তৈরি হওয়ার সময় একবারই তৈরি হয় এবং সব কলে শেয়ার হতে থাকে! টু-ডি গ্রিড বানানোর সময় `[[0] * m] * n` লিখলেও সব সারি একই লিস্টের রেফারেন্স হয়ে যায়—সঠিক উপায় হলো লিস্ট কম্প্রিহেনশন `[[0] * m for _ in range(n)]`। এই অধ্যায়ে অবজেক্ট আইডেন্টিটি, শ্যালো বনাম ডিপ কপি এবং নিরাপদ রেফারেন্স পাসিং পরিষ্কারভাবে শিখবে।',
        everydayExample: 'একই গুগল ডক লিংকের দুটো শর্টকাট ফোল্ডারে রাখলে যেকোনো শর্টকাট থেকে এডিট করলেও মূল ফাইলটাই বদলে যায়।',
        keyTakeaways: [
          '`is` অবজেক্ট আইডেন্টিটি (`id(a) == id(b)`) যাচাই করে, আর `==` ভেতরের মান যাচাই করে।',
          'নেস্টেড গ্রিড বা ম্যাট্রিক্স `[[0] * m] * n` দিয়ে বানালে সব সারি একই রেফারেন্স শেয়ার করে; সর্বদা `for _ in range(n)` ব্যবহার করো।',
          'ফাংশনের ডিফল্ট প্যারামিটারে কখনো মিউটেবল `[]` বা `{}` লিখবে না—সর্বদা `None` ব্যবহার করো।',
        ],
      },
    },
    topics: [
      {
        id: 'py-ch16-t1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Object Identity, Aliasing vs. Shallow Copy',
        englishParagraphs: [
          'Compare aliasing (`b = a`), shallow slicing (`c = a[:]`), and identity checks (`is`) to see which mutations propagate.',
        ],
        banglaParagraphs: [
          'অ্যালিয়াস (`b = a`) এবং কপি (`a[:]`) এর মধ্যে `is` অপারেটর ও `append` দিয়ে পার্থক্য দেখো।',
        ],
        memoryDiagram: 'a is b -> True | a is c -> False',
        code: `a = [10, 20]\nb = a\nc = a[:]\nb.append(30)\nc.append(99)\nprint(a, b, c)\nprint(a is b, a is c)`,
        stdin: '',
        expectedOutput: '[10, 20, 30] [10, 20, 30] [10, 20, 99]\nTrue False',
        lineByLine: [
          {"lineNumber":"Line 2","codeSnippet":"b = a","whatItMeans":"Binds second name `b` to exact same list object as `a`.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"`b` is undefined."},
          {"lineNumber":"Line 3","codeSnippet":"c = a[:]","whatItMeans":"Allocates a distinct shallow copy list for `c`.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"`c` is undefined."},
          {"lineNumber":"Line 7","codeSnippet":"print(a is b, a is c)","whatItMeans":"Confirms `a` and `b` share identity while `c` is independent.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Identity flags are omitted."},
        ],
      },
      {
        id: 'py-ch16-t2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Safe Default None Pattern vs. Shared Mutable State',
        englishParagraphs: [
          'Build a tag collector function using `bucket=None` inside the signature so each independent call starts with a fresh list.',
        ],
        banglaParagraphs: [
          '`bucket=None` ব্যবহার করে প্রতিটি ফাংশন কলে সম্পূর্ণ নতুন লিস্ট তৈরি হওয়ার নিরাপদ প্যাটার্নটি দেখো।',
        ],
        memoryDiagram: 'def push_tag(val, bucket=None): bucket = [] if bucket is None else bucket',
        code: `import sys\ndef push_item(val, bucket=None):\n    if bucket is None:\n        bucket = []\n    bucket.append(val)\n    return bucket\n\ntokens = sys.stdin.read().split()\nfirst = push_item(tokens[0])\nsecond = push_item(tokens[1])\nprint(first, second)`,
        stdin: 'alpha beta',
        expectedOutput: "['alpha'] ['beta']",
        lineByLine: [
          {"lineNumber":"Line 2","codeSnippet":"def push_item(val, bucket=None):","whatItMeans":"Avoids mutable default `bucket=[]` shared across calls.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Function undefined."},
          {"lineNumber":"Line 3","codeSnippet":"    if bucket is None:","whatItMeans":"Allocates a fresh empty list only when caller omits `bucket`.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Cannot distinguish omitted argument."},
        ],
      },
      {
        id: 'py-ch16-t3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Independent 2D Grid State Snapshot with deepcopy',
        englishParagraphs: [
          'Snapshot a 2D board before simulating a move using `copy.deepcopy`, ensuring the saved history stays intact when the live board changes.',
        ],
        banglaParagraphs: [
          'টু-ডি বোর্ডের স্টেট পরিবর্তন করার আগে `copy.deepcopy` দিয়ে নিরাপদ স্ন্যাপশট সংরক্ষণ করো।',
        ],
        memoryDiagram: 'copy.deepcopy(grid) clones outer list AND every inner row',
        code: `import copy, sys\ndata = list(map(int, sys.stdin.read().split()))\nr, c = data[0], data[1]\ngrid = [data[2 + i * c : 2 + (i + 1) * c] for i in range(r)]\nsnapshot = copy.deepcopy(grid)\ngrid[0][0] += 100\nprint(snapshot[0][0], grid[0][0])`,
        stdin: '2 2\n1 2\n3 4',
        expectedOutput: '1 101',
        lineByLine: [
          {"lineNumber":"Line 5","codeSnippet":"snapshot = copy.deepcopy(grid)","whatItMeans":"Recursively duplicates inner row lists so mutations do not leak.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Shallow copy shares inner rows with `grid`."},
          {"lineNumber":"Line 6","codeSnippet":"grid[0][0] += 100","whatItMeans":"Mutates live grid while proving `snapshot[0][0]` stays `1`.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"No mutation contrast is visible."},
        ],
      },
      {
        id: 'py-ch16-t4',
        badge: 'Example 4: Bug Trap vs. CP/Production Pattern',
        title: 'Fixing the Nested Grid [[0] * m] * n Multiplication Bug',
        englishParagraphs: [
          'Using `[row] * n` replicates `n` references to one single row object. Build independent rows with a list comprehension `[[0] * m for _ in range(n)]`.',
        ],
        banglaParagraphs: [
          '`[[0] * m] * n` করলে সব সারি একই লিস্ট হয়ে যায়; তাই সব সময় `[[0] * m for _ in range(n)]` লিখতে হবে।',
        ],
        memoryDiagram: '[[0]*m for _ in range(n)] -> N separate list objects',
        code: `import sys\nn, m = map(int, sys.stdin.read().split())\ngrid = [[0] * m for _ in range(n)]\ngrid[0][1] = 7\nprint(sum(sum(row) for row in grid))`,
        stdin: '3 3',
        expectedOutput: '7',
        lineByLine: [
          {"lineNumber":"Line 3","codeSnippet":"grid = [[0] * m for _ in range(n)]","whatItMeans":"Evaluates `[0] * m` freshly for each row.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"No matrix exists."},
          {"lineNumber":"Line 5","codeSnippet":"print(sum(sum(row) for row in grid))","whatItMeans":"Confirms only row 0 was mutated (total = 7, not 21).","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Nothing printed."},
        ],
      },
    ],
    lineByLineAnatomy: [
      {"lineNumber":"Line 1","codeSnippet":"a = [10, 20]","whatItMeans":"Creates list object on heap and binds `a`.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"`a` missing."},
      {"lineNumber":"Line 2","codeSnippet":"b = a","whatItMeans":"Creates alias pointing to same heap list.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"`b` missing."},
      {"lineNumber":"Line 3","codeSnippet":"c = a[:]","whatItMeans":"Clones top-level list into new heap address.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"`c` missing."},
      {"lineNumber":"Line 4","codeSnippet":"b.append(30)","whatItMeans":"Mutates shared object visible through `a` and `b`.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"`a` keeps length 2."},
      {"lineNumber":"Line 7","codeSnippet":"print(a is b, a is c)","whatItMeans":"Verifies identity equivalence vs copy.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"No boolean comparison printed."},
    ],
    dryRunTable: [
      { step: 1, state: 'a = [10, 20]; b = a', memoryOrStack: 'a,b -> List1[10,20]', note: 'Both labels share List1' },
      { step: 2, state: 'c = a[:]', memoryOrStack: 'c -> List2[10,20]', note: 'Fresh List2 allocated' },
      { step: 3, state: 'b.append(30)', memoryOrStack: 'List1=[10,20,30]', note: 'Visible via a and b' },
      { step: 4, state: 'c.append(99)', memoryOrStack: 'List2=[10,20,99]', note: 'List1 unaffected; a is b == True' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: Grid Creation With `[[0] * m] * n`',
        brokenCode: 'dp = [[0] * 3] * 3\ndp[0][0] = 5  # sets dp[1][0] and dp[2][0] to 5 too!',
        fixedCode: 'dp = [[0] * 3 for _ in range(3)]\ndp[0][0] = 5',
        whyItBreaks: 'Multiplying a list of lists copies the inner list reference `n` times instead of building `n` rows.',
      },
      {
        title: 'Trap 2: Mutable Default Argument `def f(x, arr=[]):`',
        brokenCode: 'def f(x, arr=[]): arr.append(x); return arr',
        fixedCode: 'def f(x, arr=None): arr = [] if arr is None else arr; arr.append(x); return arr',
        whyItBreaks: 'Default argument objects are created once at function definition time and persist across every call.',
      },
      {
        title: 'Trap 3: Modifying a List While Iterating Over It',
        brokenCode: 'for x in nums:\n    if x % 2 == 0: nums.remove(x)',
        fixedCode: 'nums = [x for x in nums if x % 2 != 0]',
        whyItBreaks: 'Removing elements shifts indices left, causing the loop iterator to skip adjacent elements.',
      },
    ],
    practiceSheet: [
      {
        id: 'py-ch16-p1',
        difficulty: 'Easy',
        title: 'In-Place List Square Mutator',
        prompt: 'Write `square_in_place(nums)` that mutates the passed list reference directly, and verify caller sees the change.',
        banglaHint: '`for i in range(len(nums)): nums[i] *= nums[i]` লিখে মূল লিস্ট পরিবর্তন করো।',
        starterCode: `import sys\ndef square_in_place(nums):\n    for i in range(len(nums)):\n        nums[i] *= nums[i]\n\narr = list(map(int, sys.stdin.read().split()))[1:]\nsquare_in_place(arr)\nprint(*arr)`,
        sampleStdin: '4\n2 3 4 5',
        expectedOutput: '4 9 16 25',
      },
      {
        id: 'py-ch16-p2',
        difficulty: 'Easy',
        title: 'Safe Default Bucket Splitter',
        prompt: 'Write a function using `acc=None` default to collect positive numbers cleanly over two separate calls.',
        banglaHint: '`acc = [] if acc is None else acc` ব্যবহার করে আলাদা দুই কলে লিস্ট আলাদা রাখো।',
        starterCode: `import sys\ndef collect_pos(seq, acc=None):\n    if acc is None:\n        acc = []\n    for x in seq:\n        if x > 0:\n            acc.append(x)\n    return acc\n\ndata = list(map(int, sys.stdin.read().split()))\nhalf = len(data) // 2\nprint(collect_pos(data[:half]), collect_pos(data[half:]))`,
        sampleStdin: '-1 2 3 -4',
        expectedOutput: '[2] [3]',
      },
      {
        id: 'py-ch16-p3',
        difficulty: 'Medium',
        title: 'Independent 2D Grid Cell Update',
        prompt: 'Create an `n x m` zero grid safely, update cell `(r, c) = val`, and print row sums.',
        banglaHint: '`[[0] * m for _ in range(n)]` ব্যবহার করলে কেবল নির্দিষ্ট সারির যোগফল `val` হবে।',
        starterCode: `import sys\nn, m, r, c, val = map(int, sys.stdin.read().split())\ng = [[0] * m for _ in range(n)]\ng[r][c] = val\nprint(*[sum(row) for row in g])`,
        sampleStdin: '3 4 1 2 9',
        expectedOutput: '0 9 0',
      },
      {
        id: 'py-ch16-p4',
        difficulty: 'Medium',
        title: 'Deep Copy Config Override',
        prompt: 'Given `base = {"db": [1, 2]}`, use `copy.deepcopy` to produce an updated copy adding `v` without changing `base`.',
        banglaHint: '`copy.deepcopy(base)` করে তারপর `clone["db"].append(v)` করো।',
        starterCode: `import copy, sys\nv = int(sys.stdin.read().strip())\nbase = {'db': [1, 2]}\nclone = copy.deepcopy(base)\nclone['db'].append(v)\nprint(base['db'], clone['db'])`,
        sampleStdin: '9',
        expectedOutput: '[1, 2] [1, 2, 9]',
      },
      {
        id: 'py-ch16-p5',
        difficulty: 'Hard',
        title: 'Flatten Nested Arbitrary List Safely',
        prompt: 'Read a nested integer list via `ast.literal_eval` and flatten all integers into one new list without mutating sublists.',
        banglaHint: '`isinstance(item, list)` হলে রিকার্সিভভাবে বিস্তার করো, নাহলে `out.append(item)` করো।',
        starterCode: `import ast, sys\ndef flatten(seq, out=None):\n    if out is None:\n        out = []\n    for x in seq:\n        if isinstance(x, list):\n            flatten(x, out)\n        else:\n            out.append(x)\n    return out\n\ndata = ast.literal_eval(sys.stdin.read().strip())\nprint(*flatten(data))`,
        sampleStdin: '[1, [2, [3, 4], 5], 6]',
        expectedOutput: '1 2 3 4 5 6',
      },
    ],
    miniBuild: {
      title: 'Mini-Build: Immutable Transaction Ledger with Undo Snapshot',
      description: 'Maintain a nested matrix account state, take deep snapshots before edits, and print both initial and updated balances.',
      banglaGoal: '`copy.deepcopy` দিয়ে নিরাপদ আন্ডু স্ন্যাপশট নিয়ে অ্যাকাউন্ট ব্যালেন্স আপডেট করো।',
      combinesChapters: "Ch 11, 14, 16",
      starterCode: `import copy, sys\nnums = list(map(int, sys.stdin.read().split()))\naccounts = [nums[:2], nums[2:4]]\nbackup = copy.deepcopy(accounts)\naccounts[0][1] += 50\nprint(sum(backup[0]), sum(accounts[0]))`,
      sampleStdin: '10 20 30 40',
      expectedOutput: '30 80',
    },
    starterCode: `import copy, sys\nnums = list(map(int, sys.stdin.read().split()))\naccounts = [nums[:2], nums[2:4]]\nbackup = copy.deepcopy(accounts)\naccounts[0][1] += 50\nprint(sum(backup[0]), sum(accounts[0]))`,
    sampleStdin: '10 20 30 40',
    expectedSampleOutput: '30 80',
    testCases: [
      { id: 'py16-t1', input: '10 20 30 40', expectedOutput: '30 80' },
      { id: 'py16-t2', input: '5 5 1 1', expectedOutput: '10 60', isHidden: true },
    ],
  },
  17: {
    chapterNumber: 17,
    title: 'Heap Objects, Stack Frames & Garbage Collection in Python',
    banglaTitle: 'হিপ অবজেক্ট, স্ট্যাক ফ্রেম ও গার্বেজ কালেকশন (Python)',
    subtitle: 'Reference counting, cyclic GC, generators vs eager lists, and __slots__ memory savings',
    zeroIntuition: {
      plainEnglishStory:
        'In CPython, all Python objects (`int`, `list`, custom classes) live on a private managed heap, while each function call keeps a lightweight stack frame holding local name references. CPython tracks how many references point to each object via a reference counter (`sys.getrefcount`): the instant that count reaches zero, the object is immediately reclaimed.\n\nTo clean up reference cycles (like object A pointing to B and B back to A) and avoid blowing up RAM on large datasets, Python runs a generational cyclic garbage collector alongside lazy generators (`yield` / generator expressions) that consume O(1) memory instead of materializing huge lists.',
      asciiFlowchart:
        'Stack Frame [ x ] --refcount=1--> Heap Object [0x9a10]\n  del x / return  --refcount=0--> Reclaimed Immediately!\nGenerator (x for x in range(10^7)) -> O(1) RAM vs List -> O(N) RAM',
      pseudocode: ["def stream(n):","for i in range(n): yield i * i   # O(1) lazy frame","total = sum(stream(1000000))       # constant heap footprint"],
      banglaZeroToHero: {
        analogyTitle: 'লাইব্রেরির বইয়ের টোকেন ও ব্যবহার শেষে স্বয়ংক্রিয় তাক খালি করা',
        explanation:
          'সি++ প্রোগ্রামারের মতো পাইথনে তোমাকে হাতে `free` বা `delete` লিখতে হয় না, কারণ পাইথনের নিজস্ব প্রাইভেট হিপ ও মেমোরি ম্যানেজার সব সামলায়। প্রতিটি ফাংশন কল হলে স্ট্যাক ফ্রেমে কেবল অবজেক্টের রেফারেন্স থাকে, আর মূল অবজেক্ট থাকে হিপে। CPython-এ প্রতিটি অবজেক্টের সাথে একটি রেফারেন্স কাউন্টার থাকে: যতগুলো ভ্যারিয়েবল তাকে ধরে রাখে, কাউন্টার তত বাড়ে; আর কাউন্টার শূন্য হওয়া মাত্রই মেমোরি তাৎক্ষণিক খালি হয়ে যায়। তবে দুটি অবজেক্ট একে অপরকে ধরে রাখলে (যেমন `a.next = b` এবং `b.next = a`) রেফারেন্স কাউন্ট শূন্য হয় না—এটি পরিষ্কার করতে পাইথনের জেনারেশনাল সাইক্লিক গার্বেজ কালেক্টর (`gc`) কাজ করে। বড় ডেটাসেটে `[x * x for x in range(10**6)]` লিস্ট বানালে পুরো ডেটা একসাথে হিপে জায়গা দখল করে, অথচ লিস্টের বদলে জেনারেটর এক্সপ্রেশন `(x * x for x in range(10**6))` বা `yield` ফাংশন ব্যবহার করলে মেমোরি খরচ থাকে মাত্র O(1)! এছাড়া ক্লাসে প্রচুর অবজেক্ট বানাতে হলে `__slots__` ব্যবহার করলে প্রতিটি অবজেক্টের ভেতরের ডিকশনারি `__dict__` বাদ হয়ে অনেক র‍্যাম বাঁচে। ফাইল বা কানেকশন দ্রুত বন্ধ করতে গার্বেজ কালেক্টরের ওপর ভরসা না করে সর্বদা `with` কনটেক্সট ম্যানেজার ব্যবহার করা উচিত।',
        everydayExample: 'কোনো মিটিংয়ে চেয়ার কতজন ব্যবহার করছে তার টালি রাখা—কেউ না থাকলেই রুম খালি করা, আর একসাথে ১০ লাখ মানুষ না এনে একে একে ভেতরে ডাকা (Generator)।',
        keyTakeaways: [
          'CPython প্রধানত রেফারেন্স কাউন্টিং এবং সাইক্লিক গার্বেজ কালেক্টর দিয়ে হিপ মেমোরি মুক্ত করে।',
          'বড় স্ট্রিম প্রসেসিংয়ে লিস্ট `[...]`-এর বদলে জেনারেটর `(...)` বা `yield` ব্যবহার করলে RAM খরচ O(N) থেকে O(1) হয়।',
          'অনেকগুলো ছোট অবজেক্টের জন্য ক্লাসে `__slots__` যোগ করলে প্রতি-অবজেক্ট `__dict__` হিপ মেমোরি বেঁচে যায়।',
        ],
      },
    },
    topics: [
      {
        id: 'py-ch17-t1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Observing CPython Reference Counting Live',
        englishParagraphs: [
          'Use `sys.getrefcount` to watch an object’s reference count increase as aliases bind and drop back when deleted (note `getrefcount` itself adds 1 temporary parameter reference).',
        ],
        banglaParagraphs: [
          '`sys.getrefcount` দিয়ে দেখো কীভাবে নতুন অ্যালিয়াস যোগ হলে রেফারেন্স কাউন্ট বাড়ে এবং `del` করলে কমে।',
        ],
        memoryDiagram: 'obj -> refcount increments on b=obj, decrements on del b',
        code: `import sys\nobj = [1, 2, 3]\nc0 = sys.getrefcount(obj)\nb = obj\nc1 = sys.getrefcount(obj)\ndel b\nc2 = sys.getrefcount(obj)\nprint(c1 - c0, c2 - c0)`,
        stdin: '',
        expectedOutput: '1 0',
        lineByLine: [
          {"lineNumber":"Line 3","codeSnippet":"c0 = sys.getrefcount(obj)","whatItMeans":"Records baseline reference count for `obj`.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Cannot measure delta."},
          {"lineNumber":"Line 4","codeSnippet":"b = obj","whatItMeans":"Adds one more reference, increasing refcount by 1.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Refcount never rises."},
          {"lineNumber":"Line 6","codeSnippet":"del b","whatItMeans":"Removes name binding `b`, dropping refcount back down.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Delta remains `1`."},
        ],
      },
      {
        id: 'py-ch17-t2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'O(1) Memory Generator vs. Eager List Footprint',
        englishParagraphs: [
          'Compare `sys.getsizeof` on a materialized list comprehension versus a lazy generator expression over `n` items.',
        ],
        banglaParagraphs: [
          '`sys.getsizeof` ব্যবহার করে লিস্ট বনাম জেনারেটরের হিপ সাইজের বিশাল পার্থক্য দেখো।',
        ],
        memoryDiagram: 'list(N) grows O(N) bytes | gen(N) stays tiny constant bytes',
        code: `import sys\nn = int(sys.stdin.read().strip())\neager = [i * i for i in range(n)]\nlazy = (i * i for i in range(n))\nprint(sys.getsizeof(eager) > sys.getsizeof(lazy), sum(lazy))`,
        stdin: '100',
        expectedOutput: 'True 328350',
        lineByLine: [
          {"lineNumber":"Line 3","codeSnippet":"eager = [i * i for i in range(n)]","whatItMeans":"Allocates every squared integer inside a full list buffer.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"`eager` undefined."},
          {"lineNumber":"Line 4","codeSnippet":"lazy = (i * i for i in range(n))","whatItMeans":"Creates constant-size iterator yielding values one at a time.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"`lazy` undefined."},
        ],
      },
      {
        id: 'py-ch17-t3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Custom yield Pipeline for Streaming Sum',
        englishParagraphs: [
          'Chain two `yield` generator functions to filter and square positive sensor numbers lazily without building intermediate lists.',
        ],
        banglaParagraphs: [
          '`yield` জেনারেটর চেইন করে কোনো অতিরিক্ত ইন্টারমিডিয়েট লিস্ট ছাড়াই ডেটা ফিল্টার ও যোগ করো।',
        ],
        memoryDiagram: 'read_tokens -> filter_pos (yield) -> sum (O(1) heap)',
        code: `import sys\ndef positives(nums):\n    for x in nums:\n        if x > 0:\n            yield x * x\n\nvals = map(int, sys.stdin.read().split())\nprint(sum(positives(vals)))`,
        stdin: '-5 2 0 3 -1 4',
        expectedOutput: '29',
        lineByLine: [
          {"lineNumber":"Line 5","codeSnippet":"            yield x * x","whatItMeans":"Pauses generator stack frame and yields one squared value.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Generator emits nothing."},
          {"lineNumber":"Line 8","codeSnippet":"print(sum(positives(vals)))","whatItMeans":"Consumes stream element by element in O(1) memory.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"No output printed."},
        ],
      },
      {
        id: 'py-ch17-t4',
        badge: 'Example 4: Bug Trap vs. CP/Production Pattern',
        title: 'Weak Reference Cycle Prevention & __slots__',
        englishParagraphs: [
          'Regular classes store attributes in a per-instance `__dict__` hash table. Declaring `__slots__ = ("x", "y")` removes `__dict__` and shrinks memory overhead drastically.',
        ],
        banglaParagraphs: [
          'ক্লাসে `__slots__` ব্যবহার করলে প্রতিটি ইনস্ট্যান্সে ভারী `__dict__` তৈরি হয় না, ফলে মেমোরি অনেক কম লাগে।',
        ],
        memoryDiagram: '__slots__ stores fixed tuple-like fields without __dict__',
        code: `import sys\nclass Point:\n    __slots__ = ('x', 'y')\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n\nx, y = map(int, sys.stdin.read().split())\np = Point(x, y)\nprint(hasattr(p, '__dict__'), p.x + p.y)`,
        stdin: '12 30',
        expectedOutput: 'False 42',
        lineByLine: [
          {"lineNumber":"Line 3","codeSnippet":"    __slots__ = ('x', 'y')","whatItMeans":"Eliminates per-instance `__dict__` heap allocation.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"`hasattr(p, \"__dict__\")` becomes `True`."},
          {"lineNumber":"Line 10","codeSnippet":"print(hasattr(p, '__dict__'), p.x + p.y)","whatItMeans":"Verifies `__dict__` was omitted while attributes still work.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"No result printed."},
        ],
      },
    ],
    lineByLineAnatomy: [
      {"lineNumber":"Line 2","codeSnippet":"obj = [1, 2, 3]","whatItMeans":"Allocates list on CPython heap.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"`obj` undefined."},
      {"lineNumber":"Line 3","codeSnippet":"c0 = sys.getrefcount(obj)","whatItMeans":"Reads initial reference counter.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Missing `c0`."},
      {"lineNumber":"Line 4","codeSnippet":"b = obj","whatItMeans":"Binds second reference, bumping refcount by +1.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"`b` missing."},
      {"lineNumber":"Line 6","codeSnippet":"del b","whatItMeans":"Decrements refcount by -1.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Count stays elevated."},
      {"lineNumber":"Line 8","codeSnippet":"print(c1 - c0, c2 - c0)","whatItMeans":"Prints `+1` then `0` delta.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"No output."},
    ],
    dryRunTable: [
      { step: 1, state: 'obj = [1,2,3]', memoryOrStack: 'refcount = base', note: 'Name obj holds sole heap pointer' },
      { step: 2, state: 'b = obj', memoryOrStack: 'refcount = base + 1', note: 'Delta c1 - c0 == 1' },
      { step: 3, state: 'del b', memoryOrStack: 'refcount = base', note: 'Drops immediately without waiting for GC sweep' },
      { step: 4, state: 'print deltas', memoryOrStack: '1 0', note: 'Deterministic cleanup confirmed' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: Materializing Huge List Just for `sum()` or `any()`',
        brokenCode: 'total = sum([i * i for i in range(10_000_000)])',
        fixedCode: 'total = sum(i * i for i in range(10_000_000))',
        whyItBreaks: 'Building an eager list wastes hundreds of megabytes of heap RAM before summing.',
      },
      {
        title: 'Trap 2: Re-Iterating an Exhausted Generator',
        brokenCode: 'g = (x for x in [1, 2, 3])\na, b = sum(g), sum(g)  # b is 0!',
        fixedCode: 'nums = [1, 2, 3]\na, b = sum(nums), sum(nums)',
        whyItBreaks: 'Generators are single-pass state machines; after reaching end, second iteration yields empty.',
      },
      {
        title: 'Trap 3: Relying on `__del__` Instead of `with` Context Manager',
        brokenCode: 'f = open("data.txt")  # leaks fd if exception happens',
        fixedCode: 'with open("data.txt") as f:\n    data = f.read()',
        whyItBreaks: 'GC timing on cycles is non-deterministic; `with` guarantees immediate closure.',
      },
    ],
    practiceSheet: [
      {
        id: 'py-ch17-p1',
        difficulty: 'Easy',
        title: 'Generator Expression Even Sum',
        prompt: 'Compute the sum of squares of even numbers in a sequence using a lazy generator expression (no `[...]` list).',
        banglaHint: '`sum(x * x for x in nums if x % 2 == 0)` লিখো।',
        starterCode: `import sys\nnums = map(int, sys.stdin.read().split())\nprint(sum(x * x for x in nums if x % 2 == 0))`,
        sampleStdin: '1 2 3 4 5',
        expectedOutput: '20',
      },
      {
        id: 'py-ch17-p2',
        difficulty: 'Easy',
        title: 'Lightweight __slots__ Record',
        prompt: 'Define a class `Item` with `__slots__ = ("id", "cost")`, instantiate one from stdin, and print `id * cost`.',
        banglaHint: '`__slots__ = ("id", "cost")` দিয়ে ইনস্ট্যান্স তৈরি করো।',
        starterCode: `import sys\nclass Item:\n    __slots__ = ('id', 'cost')\n    def __init__(self, i, c):\n        self.id = i\n        self.cost = c\n\ni, c = map(int, sys.stdin.read().split())\nit = Item(i, c)\nprint(it.id * it.cost)`,
        sampleStdin: '3 15',
        expectedOutput: '45',
      },
      {
        id: 'py-ch17-p3',
        difficulty: 'Medium',
        title: 'Fibonacci Lazy Generator',
        prompt: 'Write a generator `fib_gen(k)` yielding the first `k` Fibonacci numbers (`0, 1, 1, 2, ...`) in O(1) memory.',
        banglaHint: '`a, b = 0, 1` রেখে প্রতি ধাপে `yield a` এবং `a, b = b, a + b` করো।',
        starterCode: `import sys\ndef fib_gen(k):\n    a, b = 0, 1\n    for _ in range(k):\n        yield a\n        a, b = b, a + b\n\nk = int(sys.stdin.read().strip())\nprint(*fib_gen(k))`,
        sampleStdin: '6',
        expectedOutput: '0 1 1 2 3 5',
      },
      {
        id: 'py-ch17-p4',
        difficulty: 'Medium',
        title: 'Explicit Cycle Break & GC Trigger',
        prompt: 'Demonstrate breaking a two-node reference cycle and running `gc.collect()` cleanly.',
        banglaHint: '`a.nxt = None` দিয়ে সাইকেল ভেঙে `gc.collect()` চালাও।',
        starterCode: `import gc\nclass Node:\n    def __init__(self, v):\n        self.v = v\n        self.nxt = None\na, b = Node(1), Node(2)\na.nxt = b\nb.nxt = a\na.nxt = None\ndel a, b\ngc.collect()\nprint('CLEANED')`,
        sampleStdin: '',
        expectedOutput: 'CLEANED',
      },
      {
        id: 'py-ch17-p5',
        difficulty: 'Hard',
        title: 'Chunked Stream Batch Generator',
        prompt: 'Write a generator `chunks(seq, size)` yielding slices of length `size` and print the sum of each chunk.',
        banglaHint: '`for i in range(0, len(seq), size): yield seq[i:i+size]` ব্যবহার করো।',
        starterCode: `import sys\ndef chunks(seq, k):\n    for i in range(0, len(seq), k):\n        yield seq[i : i + k]\n\ndata = list(map(int, sys.stdin.read().split()))\nk = data[0]\narr = data[1:]\nprint(*[sum(c) for c in chunks(arr, k)])`,
        sampleStdin: '2 1 2 3 4 5',
        expectedOutput: '3 7 5',
      },
    ],
    miniBuild: {
      title: 'Mini-Build: Zero-Bloat Log Stream Filter with __slots__ & Generators',
      description: 'Read log scores into `__slots__` entries via a generator and compute filtered weighted sum with minimal heap footprint.',
      banglaGoal: '`__slots__` ও জেনারেটর একত্র করে কম মেমোরিতে লগ ডেটার ওজনযুক্ত যোগফল বের করো।',
      combinesChapters: "Ch 11, 16, 17",
      starterCode: `import sys\nclass Metric:\n    __slots__ = ('val',)\n    def __init__(self, v):\n        self.val = v\n\ndef stream_metrics(tokens):\n    for t in tokens:\n        v = int(t)\n        if v >= 10:\n            yield Metric(v)\n\ntoks = sys.stdin.read().split()\nprint(sum(m.val for m in stream_metrics(toks)))`,
      sampleStdin: '4 12 9 25 30',
      expectedOutput: '67',
    },
    starterCode: `import sys\nclass Metric:\n    __slots__ = ('val',)\n    def __init__(self, v):\n        self.val = v\n\ndef stream_metrics(tokens):\n    for t in tokens:\n        v = int(t)\n        if v >= 10:\n            yield Metric(v)\n\ntoks = sys.stdin.read().split()\nprint(sum(m.val for m in stream_metrics(toks)))`,
    sampleStdin: '4 12 9 25 30',
    expectedSampleOutput: '67',
    testCases: [
      { id: 'py17-t1', input: '4 12 9 25 30', expectedOutput: '67' },
      { id: 'py17-t2', input: '1 2 3 10', expectedOutput: '10', isHidden: true },
    ],
  },
  18: {
    chapterNumber: 18,
    title: 'Classes, Encapsulation, Properties & @dataclass in Python',
    banglaTitle: 'ক্লাস, এনক্যাপসুলেশন, প্রপার্টি ও @dataclass (Python)',
    subtitle: 'self binding, _protected/__private name mangling, @property guards, and @dataclass',
    zeroIntuition: {
      plainEnglishStory:
        'A Python `class` bundles state (attributes on `self`) and behavior (methods) into one cohesive blueprint so invalid data can never sneak into an object unchecked. Inside `__init__`, each instance receives its own namespace while methods share a single class dictionary lookup.\n\nInstead of writing verbose Java-style getters and setters up front, Python encourages clean attribute access backed by `@property` setters when validation is needed, plus `@dataclass` to auto-generate `__init__`, `__repr__`, and equality cleanly for data models.',
      asciiFlowchart:
        'Wallet(100) --> calls __init__(self, 100)\n  obj.balance = -5  --> @balance.setter rejects < 0!\n  @dataclass Edge(u, v, w) --> auto __init__ & __repr__',
      pseudocode: [
        '1. DEFINE class with __init__(self, ...) enforcing initial invariants',
        '2. GUARD state transitions inside methods or @property setters',
        '3. USE @dataclass(frozen=True) for lightweight immutable records',
      ],
      banglaZeroToHero: {
        analogyTitle: 'নিরাপত্তা-তালাবদ্ধ স্মার্ট ভল্ট (`@property`) ও স্বয়ংক্রিয় ফর্ম (`@dataclass`)',
        explanation:
          'বড় প্রজেক্টে আলাদা আলাদা ডিকশনারি বা ভ্যারিয়েবলে ডেটা রাখলে যেকোনো জায়গা থেকে ভুল মান ঢুকে সিস্টেম ভেঙে যেতে পারে। `class` ব্যবহার করলে ডেটা এবং সেই ডেটা বদলানোর নিয়মগুলো একটি একক ব্লুপ্রিন্টে আবদ্ধ থাকে—একেই এনক্যাপসুলেশন বলে। পাইথনে প্রতিটি মেথডের প্রথম প্যারামিটার `self` হলো বর্তমান অবজেক্টটির নিজস্ব রেফারেন্স। ডেটা প্রাইভেট রাখতে প্রচলিত রীতি অনুযায়ী `_field` (internal) অথবা `__field` (name-mangled) ব্যবহার করা হয়। তবে জাভার মতো শুরু থেকেই `get_x()` ও `set_x()` না লিখে পাইথনে সরাসরি `obj.balance` হিসেবে অ্যাক্সেস করা যায়, আর ভ্যালিডেশন দরকার হলে `@property` ডেকোরেটর বসালে অ্যাসাইনমেন্টের সময়ই শর্ত যাচাই হয়! যেমন নেগেটিভ টাকা জমা করতে চাইলে সেটার মেথড সাথে সাথে ভ্যালু আটকে দেয়। আবার শুধু ডেটা রাখার ক্লাসের জন্য বারবার `self.x = x` না লিখে `@dataclass` ডেকোরেটর দিলেই পাইথন নিজেই `__init__`, `__repr__` এবং `==` তুলনা তৈরি করে দেয়। এই অধ্যায়ে তুমি ইনভ্যারিয়েন্ট-সেফ ক্লাস, `@property` গার্ড ও `@dataclass` তৈরি করতে শিখবে।',
        everydayExample: 'এটিএম মেশিনের ভেতরের ক্যাশ সরাসরি হাতে বদলানো যায় না—শুধুমাত্র `deposit()` বা `withdraw()` নিয়ম মেনেই ব্যালেন্স বদলাতে হয়।',
        keyTakeaways: [
          'ক্লাস বডিতে সরাসরি লিস্ট (`items = []`) রাখলে সব অবজেক্ট তা শেয়ার করবে; সর্বদা `self.items = []` বানাও।',
          '`@property` এবং `@name.setter` দিয়ে বাইরের কোড না ভেঙে ফিল্ড ভ্যালিডেশন যোগ করা যায়।',
          'সিপিতে গ্রাফ এজ বা ইভেন্ট মডেল করতে `@dataclass` বা `slots=True` অত্যন্ত পরিষ্কার ও দ্রুত।',
        ],
      },
    },
    topics: [
      {
        id: 'py-ch18-t1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Encapsulated Counter Class With Validation Methods',
        englishParagraphs: [
          'Keep `_count` encapsulated inside a class where `inc()` and `dec()` reject invalid drops below zero cleanly.',
        ],
        banglaParagraphs: [
          'ক্লাসের ভেতরে `_count` রেখে `inc()` ও `dec()` মেথড দিয়ে মান যেন শূন্যের নিচে না নামে তা নিশ্চিত করো।',
        ],
        memoryDiagram: 'Counter(2) -> dec()->1 -> dec()->0 -> dec()->stays 0',
        code: `class SafeCounter:
    def __init__(self, start: int = 0):
        self._val = max(0, start)

    def inc(self, step: int = 1) -> None:
        if step > 0:
            self._val += step

    def dec(self, step: int = 1) -> bool:
        if step <= 0 or step > self._val:
            return False
        self._val -= step
        return True

    def value(self) -> int:
        return self._val

c = SafeCounter(3)
print(c.dec(2), c.dec(5), c.value())`,
        stdin: '',
        expectedOutput: 'True False 1',
        lineByLine: [
          { lineNumber: 'Line 2', codeSnippet: 'def __init__(self, start: int = 0):', whatItMeans: 'Initializes instance state with non-negative invariant.', whyItIsThere: 'Guarantees every SafeCounter starts valid.', ifDeletedError: '_val attribute would not exist.' },
          { lineNumber: 'Line 9', codeSnippet: 'if step <= 0 or step > self._val: return False', whatItMeans: 'Prevents negative balance state before mutation.', whyItIsThere: 'Encapsulates business invariant in one place.', ifDeletedError: 'Counter could silently become negative.' },
        ],
      },
      {
        id: 'py-ch18-t2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: '@property Setter Guard & Bank Wallet Ledger',
        englishParagraphs: [
          'Use `@property` for clean `wallet.balance` reads and a guarded setter/methods while processing stdin transactions.',
        ],
        banglaParagraphs: [
          '`@property` ব্যবহার করে নিরাপদ ব্যালেন্স রিড ও ডিপোজিট/উইথড্র লেনদেন প্রসেস করো।',
        ],
        memoryDiagram: 'Wallet._bal=100 -> D 50 -> 150 -> W 200 (ignored) -> 150',
        code: `import sys

class Wallet:
    def __init__(self, initial: int):
        self._bal = max(0, initial)

    @property
    def balance(self) -> int:
        return self._bal

    def deposit(self, amt: int) -> None:
        if amt > 0:
            self._bal += amt

    def withdraw(self, amt: int) -> None:
        if 0 < amt <= self._bal:
            self._bal -= amt

toks = sys.stdin.read().split()
w = Wallet(int(toks[0]))
n = int(toks[1])
idx = 2
for _ in range(n):
    op, amt = toks[idx], int(toks[idx + 1])
    idx += 2
    if op == 'D':
        w.deposit(amt)
    elif op == 'W':
        w.withdraw(amt)
print(w.balance)`,
        stdin: '100 3 D 50 W 200 W 30',
        expectedOutput: '120',
        lineByLine: [
          { lineNumber: 'Line 7', codeSnippet: '@property\n    def balance(self) -> int:', whatItMeans: 'Exposes `_bal` as read-only property outside.', whyItIsThere: 'Callers cannot overwrite `w.balance = -999`.', ifDeletedError: 'Would require method syntax `w.balance()`.' },
        ],
      },
      {
        id: 'py-ch18-t3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Sorting Structured Models With @dataclass(order=True)',
        englishParagraphs: [
          '`@dataclass(slots=True)` eliminates boilerplate `__init__` and `__repr__`, keeping memory compact and sorting declarative.',
        ],
        banglaParagraphs: [
          '`@dataclass` ব্যবহার করে টাস্কের প্রায়োরিটি এবং নাম অনুযায়ী সহজেই অবজেক্ট তৈরি ও সর্ট করো।',
        ],
        memoryDiagram: '[Task(2,"test"), Task(1,"build")] -> sorted by (prio, name)',
        code: `from dataclasses import dataclass

@dataclass(frozen=True, order=True)
class Task:
    priority: int
    name: str

tasks = [Task(3, "deploy"), Task(1, "lint"), Task(2, "test")]
top = min(tasks)
print(f"{top.name}:{top.priority}")`,
        stdin: '',
        expectedOutput: 'lint:1',
        lineByLine: [
          { lineNumber: 'Line 3', codeSnippet: '@dataclass(frozen=True, order=True)', whatItMeans: 'Auto-generates immutable class with tuple comparison.', whyItIsThere: 'Enables `min(tasks)` and hashing with zero boilerplate.', ifDeletedError: 'Task lacks `__init__` and comparison operators.' },
        ],
      },
      {
        id: 'py-ch18-t4',
        badge: 'Example 4: Bug Trap vs. Production Pattern',
        title: 'Fixing Shared Mutable Class Attribute Trap',
        englishParagraphs: [
          'Defining `items = []` at class scope shares ONE list across every instance! Always initialize mutable collections inside `__init__` or `field(default_factory=list)`.',
        ],
        banglaParagraphs: [
          'ক্লাস লেভেলে `items = []` লিখলে সব অবজেক্ট একই লিস্ট শেয়ার করে বসে! সর্বদা `__init__`-এর ভেতরে `self.items = []` বানাবে।',
        ],
        memoryDiagram: 'Team("A").members != Team("B").members (isolated heap lists)',
        code: `from dataclasses import dataclass, field

@dataclass
class Roster:
    title: str
    members: list[str] = field(default_factory=list)

a = Roster("Alpha")
b = Roster("Beta")
a.members.append("Arif")
b.members.append("Nadia")
print(len(a.members), len(b.members), a.members[0])`,
        stdin: '',
        expectedOutput: '1 1 Arif',
        lineByLine: [
          { lineNumber: 'Line 6', codeSnippet: 'members: list[str] = field(default_factory=list)', whatItMeans: 'Creates a brand-new list for each instance.', whyItIsThere: 'Prevents cross-instance state pollution.', ifDeletedError: 'Raises ValueError in dataclass for mutable default list.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 1', codeSnippet: 'class SafeCounter:', whatItMeans: 'Declares custom blueprint type.', whyItIsThere: 'Bundles data and invariants together.', ifDeletedError: 'SafeCounter undefined.' },
      { lineNumber: 'Line 2', codeSnippet: 'def __init__(self, start: int = 0):', whatItMeans: 'Constructor called upon `SafeCounter(3)`.', whyItIsThere: 'Sets initial `_val` safely per object.', ifDeletedError: 'AttributeError when accessing `_val`.' },
      { lineNumber: 'Line 9', codeSnippet: 'if step <= 0 or step > self._val:', whatItMeans: 'Invariant guard inside decrement.', whyItIsThere: 'Blocks invalid negative balance transitions.', ifDeletedError: 'Count can drop below zero.' },
    ],
    dryRunTable: [
      { step: 1, state: 'SafeCounter(3)', memoryOrStack: 'self._val = 3', note: '__init__ clamps >= 0' },
      { step: 2, state: 'c.dec(2)', memoryOrStack: 'self._val = 1', note: 'Returns True cleanly' },
      { step: 3, state: 'c.dec(5)', memoryOrStack: 'self._val = 1', note: '5 > 1 rejected, returns False' },
      { step: 4, state: 'c.value()', memoryOrStack: 'Output: 1', note: 'Invariant preserved' },
    ],
    harryBugTraps: [
      { title: 'Trap 1: Mutable List Defined at Class Scope', brokenCode: 'class Bag:\n    items = []  # Shared by EVERY Bag!', fixedCode: 'class Bag:\n    def __init__(self): self.items = []', whyItBreaks: 'Class-level mutable objects live once on the class dictionary and bleed across instances.' },
      { title: 'Trap 2: Omitting `self` in Method Signature', brokenCode: 'class Box:\n    def show(): print("hi")', fixedCode: 'class Box:\n    def show(self): print("hi")', whyItBreaks: 'Calling `b.show()` implicitly passes `b` as the first argument, raising TypeError.' },
      { title: 'Trap 3: Direct Attribute Mutation Bypassing Rules', brokenCode: 'w.balance = -500  # raw public field', fixedCode: '@balance.setter checking val >= 0', whyItBreaks: 'Raw fields allow arbitrary negative or corrupted states anywhere in the codebase.' },
    ],
    practiceSheet: [
      {
        id: 'py-ch18-p1',
        difficulty: 'Easy',
        title: 'Rectangle Area & Perimeter Class',
        prompt: 'Create a `Rect(w, h)` class returning `area()` and `perim()`.',
        banglaHint: '`__init__(self, w, h)` দিয়ে মান সেট করে `w * h` ও `2 * (w + h)` রিটার্ন করো।',
        starterCode: `import sys\nclass Rect:\n    def __init__(self, w: int, h: int):\n        self.w, self.h = w, h\n    def area(self) -> int: return self.w * self.h\n    def perim(self) -> int: return 2 * (self.w + self.h)\n\nw, h = map(int, sys.stdin.read().split())\nr = Rect(w, h)\nprint(r.area(), r.perim())`,
        sampleStdin: '5 8',
        expectedOutput: '40 26',
      },
      {
        id: 'py-ch18-p2',
        difficulty: 'Easy',
        title: 'Clamped Temperature Property',
        prompt: 'Clamp `Celsius` temperature via `@property` so values below `-273` become `-273`.',
        banglaHint: '`@temp.setter` এর ভেতর `max(-273, v)` সেট করো।',
        starterCode: `import sys\nclass Sensor:\n    def __init__(self):\n        self._t = 0\n    @property\n    def temp(self) -> int: return self._t\n    @temp.setter\n    def temp(self, v: int) -> None: self._t = max(-273, v)\n\ns = Sensor()\ns.temp = int(sys.stdin.read().strip())\nprint(s.temp)`,
        sampleStdin: '-350',
        expectedOutput: '-273',
      },
      {
        id: 'py-ch18-p3',
        difficulty: 'Medium',
        title: 'Scoreboard Highest Student via @dataclass',
        prompt: 'Read `n` records `name score` into `@dataclass` objects and print the highest-scoring student name.',
        banglaHint: '`max(students, key=lambda s: (s.score, s.name))` ব্যবহার করো।',
        starterCode: `import sys\nfrom dataclasses import dataclass\n@dataclass\nclass Student:\n    name: str\n    score: int\ntoks = sys.stdin.read().split()\nn = int(toks[0])\nitems = [Student(toks[1 + 2*i], int(toks[2 + 2*i])) for i in range(n)]\nbest = max(items, key=lambda x: x.score)\nprint(best.name, best.score)`,
        sampleStdin: '3\nRafiq 78\nSadia 94\nNabil 85',
        expectedOutput: 'Sadia 94',
      },
      {
        id: 'py-ch18-p4',
        difficulty: 'Medium',
        title: 'Custom `__repr__` & `__eq__` Fraction Normalization',
        prompt: 'Normalize `Frac(num, den)` with `math.gcd` in `__init__` so equivalent fractions compare equal.',
        banglaHint: '`g = math.gcd(num, den)` দিয়ে উভয়কে ভাগ করে সংরক্ষণ করো।',
        starterCode: `import sys, math\nclass Frac:\n    def __init__(self, n: int, d: int):\n        g = math.gcd(n, d)\n        self.n, self.d = n // g, d // g\n    def __eq__(self, other: object) -> bool:\n        return isinstance(other, Frac) and (self.n, self.d) == (other.n, other.d)\n\na, b, c, d = map(int, sys.stdin.read().split())\nprint(Frac(a, b) == Frac(c, d))`,
        sampleStdin: '2 4 1 2',
        expectedOutput: 'True',
      },
      {
        id: 'py-ch18-p5',
        difficulty: 'Hard',
        title: 'Bounded History Stack Class',
        prompt: 'Implement `HistoryStack(cap)` supporting `push x` (dropping oldest if full) and `pop` commands, printing final sum.',
        banglaHint: '`collections.deque(maxlen=cap)` দিয়ে এনক্যাপসুলেটেড স্ট্যাক বানাও।',
        starterCode: `import sys\nfrom collections import deque\nclass HistoryStack:\n    def __init__(self, cap: int):\n        self._dq: deque[int] = deque(maxlen=cap)\n    def push(self, x: int) -> None: self._dq.append(x)\n    def pop(self) -> None:\n        if self._dq: self._dq.pop()\n    def total(self) -> int: return sum(self._dq)\n\ntoks = sys.stdin.read().split()\ncap, n = int(toks[0]), int(toks[1])\nhs = HistoryStack(cap)\ni = 2\nfor _ in range(n):\n    if toks[i] == 'PUSH':\n        hs.push(int(toks[i + 1])); i += 2\n    else:\n        hs.pop(); i += 1\nprint(hs.total())`,
        sampleStdin: '2 4 PUSH 10 PUSH 20 PUSH 30 POP',
        expectedOutput: '20',
      },
    ],
    miniBuild: {
      title: 'Mini-Build: Encapsulated Inventory Ledger',
      description: 'Model encapsulated Item `@dataclass` records inside a Store class protecting non-negative stock invariants across ADD/SELL commands.',
      banglaGoal: '`@dataclass` ও এনক্যাপসুলেটেড ক্লাস দিয়ে স্টক ইনভেন্টরি লেজার তৈরি করো।',
      combinesChapters: 'Ch 11, 16, 18',
      starterCode: `import sys\nclass Stock:\n    def __init__(self, qty: int):\n        self._qty = max(0, qty)\n    def add(self, x: int) -> None:\n        if x > 0: self._qty += x\n    def sell(self, x: int) -> None:\n        if 0 < x <= self._qty: self._qty -= x\n    @property\n    def qty(self) -> int: return self._qty\n\ntoks = sys.stdin.read().split()\nst = Stock(int(toks[0]))\nfor i in range(1, len(toks), 2):\n    op, v = toks[i], int(toks[i + 1])\n    if op == 'ADD': st.add(v)\n    elif op == 'SELL': st.sell(v)\nprint(st.qty)`,
      sampleStdin: '10 ADD 15 SELL 30 SELL 8',
      expectedOutput: '17',
    },
    starterCode: `import sys\nclass Stock:\n    def __init__(self, qty: int):\n        self._qty = max(0, qty)\n    def add(self, x: int) -> None:\n        if x > 0: self._qty += x\n    def sell(self, x: int) -> None:\n        if 0 < x <= self._qty: self._qty -= x\n    @property\n    def qty(self) -> int: return self._qty\n\ntoks = sys.stdin.read().split()\nst = Stock(int(toks[0]))\nfor i in range(1, len(toks), 2):\n    op, v = toks[i], int(toks[i + 1])\n    if op == 'ADD': st.add(v)\n    elif op == 'SELL': st.sell(v)\nprint(st.qty)`,
    sampleStdin: '10 ADD 15 SELL 30 SELL 8',
    expectedSampleOutput: '17',
    testCases: [
      { id: 'py18-t1', input: '10 ADD 15 SELL 30 SELL 8', expectedOutput: '17' },
      { id: 'py18-t2', input: '5 ADD 5 SELL 10', expectedOutput: '0', isHidden: true },
    ],
  },
  19: {
    chapterNumber: 19,
    title: 'Inheritance, ABC Interfaces, Protocols & Polymorphism in Python',
    banglaTitle: 'ইনহেরিট্যান্স, ABC ইন্টারফেস, প্রোটোকল ও পলিমরফিজম (Python)',
    subtitle: 'super() initialization, abc.ABC contracts, structural typing with Protocol, and duck typing',
    zeroIntuition: {
      plainEnglishStory:
        'Polymorphism lets one orchestrator loop operate uniformly over many different classes as long as they honor the same method contract—eliminating sprawling `if/elif` chains when adding new payment gateways, shapes, or notification drivers.\n\nPython supports two clean styles: explicit nominal inheritance via `abc.ABC` (`@abstractmethod`, enforced at instantiation) and structural duck typing via `typing.Protocol` (static type check without forcing a shared base class). Whenever overriding `__init__`, always invoke `super().__init__(...)` cleanly.',
      asciiFlowchart:
        'ABC / Protocol: Shape -> area() -> int\n   |-- Rect(4, 5).area()   --> 20\n   |-- Square(6).area()    --> 36\nTotal = sum(s.area() for s in shapes)  # zero if/elif type tags!',
      pseudocode: [
        '1. DEFINE abstract interface (ABC + @abstractmethod) or Protocol',
        '2. IMPLEMENT concrete subclasses overriding contract methods cleanly',
        '3. DISPATCH uniformly across list[Base] without isinstance branches',
      ],
      banglaZeroToHero: {
        analogyTitle: 'একই সার্বজনীন প্লাগ সকেট (`ABC` / `Protocol`), কিন্তু ভেতরে ভিন্ন ভিন্ন যন্ত্র',
        explanation:
          'বড় সফটওয়্যারে ধরো পেমেন্ট নেওয়ার সময় বিকাশ, নগদ ও কার্ড—তিনটি আলাদা গেটওয়ে আছে। প্রতিটি জায়গায় `if method == "bkash": ... elif method == "card": ...` লিখলে নতুন গেটওয়ে যোগ করলেই সব কোড ভাঙতে হবে! এর সমাধান হলো পলিমরফিজম: একটি সাধারণ কন্ট্রাক্ট (`ABC` বা `Protocol`) বানিয়ে বলে দেওয়া যে প্রতিটি গেটওয়েতে `.pay(amount)` মেথড থাকতেই হবে। পাইথনের `abc.ABC` এবং `@abstractmethod` ব্যবহার করলে কোনো সাবক্লাস আবশ্যক মেথড ইমপ্লিমেন্ট না করলে অবজেক্ট বানানোর সাথে সাথেই `TypeError` ধরে দেয়। সাবক্লাসের কনস্ট্রাক্টর থেকে বেস ক্লাসের `__init__` কল করতে `super().__init__(...)` ব্যবহার করা হয়। অন্যদিকে পাইথন ডাক-টাইপিং (`Duck Typing`) ভালোবাসে—কোনো ক্লাস উত্তরাধিকার না নিয়েও যদি ঠিক মেথড সিগনেচার রাখে, তবে `typing.Protocol` দিয়েও স্ট্যাটিক টাইপ চেকিংয়ে পলিমরফিক হিসেবে ব্যবহার করা যায়! মনে রাখবে গভীর ইনহেরিট্যান্স ট্রি (চার-পাঁচ স্তর) তৈরি করার চেয়ে কম্পোজিশন ও পাতলা ইন্টারফেস অনেক বেশি রক্ষণাবেক্ষণযোগ্য। এই অধ্যায়ে তুমি ABC, `super()`, এবং পলিমরফিক ডিসপ্যাচ শিখবে।',
        everydayExample: 'রিমোট কন্ট্রোলের "Play" বাটনটি টিভি, মিউজিক প্লেয়ার কিংবা প্রজেক্টর—সব যন্ত্রেই নিজ নিজ উপায়ে কাজ করে।',
        keyTakeaways: [
          '`@abstractmethod` যুক্ত `ABC` ক্লাস সরাসরি ইনস্ট্যানশিয়েট করা যায় না—সব মেথড ওভাররাইড বাধ্যতামূলক।',
          'সাবক্লাস `__init__` এ প্যারেন্ট সেটআপ চালাতে `super().__init__(...)` কল করতে ভুলবে না।',
          'একই মেথড নামের ওপর পলিমরফিক লুপ চালালে নতুন সাবক্লাস যোগ করতে মূল কোড বদলাতে হয় না।',
        ],
      },
    },
    topics: [
      {
        id: 'py-ch19-t1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'ABC Contract With Concrete Subclasses',
        englishParagraphs: [
          'Define an abstract `Notifier` with `@abstractmethod def send(...)` and invoke subclasses uniformly through one loop.',
        ],
        banglaParagraphs: [
          '`ABC` এবং `@abstractmethod` দিয়ে বেস কন্ট্রাক্ট বানিয়ে ভিন্ন ভিন্ন সাবক্লাস থেকে একভাবে মেসেজ পাঠাও।',
        ],
        memoryDiagram: 'Notifier(ABC) -> [EmailNotifier, SmsNotifier] -> loop n.send()',
        code: `from abc import ABC, abstractmethod

class Notifier(ABC):
    @abstractmethod
    def send(self, msg: str) -> str:
        ...

class Email(Notifier):
    def send(self, msg: str) -> str:
        return f"EMAIL:{msg}"

class Sms(Notifier):
    def send(self, msg: str) -> str:
        return f"SMS:{msg}"

channels: list[Notifier] = [Email(), Sms()]
print(" | ".join(c.send("OK") for c in channels))`,
        stdin: '',
        expectedOutput: 'EMAIL:OK | SMS:OK',
        lineByLine: [
          { lineNumber: 'Line 3', codeSnippet: 'class Notifier(ABC):', whatItMeans: 'Marks Notifier as an abstract interface.', whyItIsThere: 'Requires every subclass to implement `send`.', ifDeletedError: 'Subclasses missing `send` fail silently until late runtime.' },
          { lineNumber: 'Line 17', codeSnippet: 'print(" | ".join(c.send("OK") for c in channels))', whatItMeans: 'Polymorphic loop calling each object’s own `send`.', whyItIsThere: 'Eliminates `if isinstance(...)` checks.', ifDeletedError: 'Nothing printed.' },
        ],
      },
      {
        id: 'py-ch19-t2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Extending Base Behavior Cleanly With super()',
        englishParagraphs: [
          'Read base salary and bonus percentage from stdin and let `BonusEmployee` reuse `super().pay()` before adding its own bonus.',
        ],
        banglaParagraphs: [
          '`super().pay()` দিয়ে প্যারেন্ট ক্লাসের হিসাব পুনরায় ব্যবহার করে সাবক্লাসে বোনাস যোগ করো।',
        ],
        memoryDiagram: 'BonusEmp(1000, 20).pay() -> super().pay() + 200 = 1200',
        code: `import sys

class Employee:
    def __init__(self, base: int):
        self.base = base

    def pay(self) -> int:
        return self.base

class BonusEmployee(Employee):
    def __init__(self, base: int, bonus: int):
        super().__init__(base)
        self.bonus = bonus

    def pay(self) -> int:
        return super().pay() + self.bonus

b, bon = map(int, sys.stdin.read().split())
emp = BonusEmployee(b, bon)
print(emp.pay())`,
        stdin: '1000 250',
        expectedOutput: '1250',
        lineByLine: [
          { lineNumber: 'Line 12', codeSnippet: 'super().__init__(base)', whatItMeans: 'Delegates base field initialization to `Employee`.', whyItIsThere: 'Avoids duplicating parent setup logic.', ifDeletedError: '`self.base` would raise AttributeError in `super().pay()`.' },
        ],
      },
      {
        id: 'py-ch19-t3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Structural Duck Typing via typing.Protocol',
        englishParagraphs: [
          'With `Protocol`, independent classes never need to inherit from a common ancestor to participate in typed polymorphism.',
        ],
        banglaParagraphs: [
          'কমন প্যারেন্ট ছাড়াও কেবল মিল থাকা মেথড সিগনেচারে `Protocol` দিয়ে স্ট্রাকচারাল পলিমরফিজম করো।',
        ],
        memoryDiagram: 'Protocol Measurable -> Score(15), Bonus(5) -> sum = 20',
        code: `from typing import Protocol

class Measurable(Protocol):
    def weight(self) -> int: ...

class Parcel:
    def __init__(self, kg: int):
        self.kg = kg
    def weight(self) -> int:
        return self.kg

class Crate:
    def weight(self) -> int:
        return 12

def total_weight(items: list[Measurable]) -> int:
    return sum(x.weight() for x in items)

print(total_weight([Parcel(8), Crate()]))`,
        stdin: '',
        expectedOutput: '20',
        lineByLine: [
          { lineNumber: 'Line 3', codeSnippet: 'class Measurable(Protocol):', whatItMeans: 'Defines structural method contract without inheritance coupling.', whyItIsThere: 'Any class with `weight(self) -> int` satisfies it.', ifDeletedError: 'Static type checkers lack parameter contract.' },
        ],
      },
      {
        id: 'py-ch19-t4',
        badge: 'Example 4: Bug Trap vs. Production Pattern',
        title: 'Replacing Brittle Type-Tag Conditionals With Polymorphism',
        englishParagraphs: [
          'Checking `if item.kind == "A": ... elif item.kind == "B": ...` scatters logic everywhere; dispatching through `.eval()` localizes each rule in its own class.',
        ],
        banglaParagraphs: [
          'সব জায়গায় `if kind == ...` চেইন না লিখে প্রতিটি ভ্যারিয়েন্টকে নিজের ক্লাসের ভেতরে রাখো।',
        ],
        memoryDiagram: 'Expr Tree: Add(Num(3), Num(4)).eval() -> 7',
        code: `class Expr:
    def eval(self) -> int:
        raise NotImplementedError

class Num(Expr):
    def __init__(self, v: int): self.v = v
    def eval(self) -> int: return self.v

class Add(Expr):
    def __init__(self, l: Expr, r: Expr): self.l, self.r = l, r
    def eval(self) -> int: return self.l.eval() + self.r.eval()

tree = Add(Num(3), Add(Num(4), Num(5)))
print(tree.eval())`,
        stdin: '',
        expectedOutput: '12',
        lineByLine: [
          { lineNumber: 'Line 11', codeSnippet: 'def eval(self) -> int: return self.l.eval() + self.r.eval()', whatItMeans: 'Recursively dispatches `.eval()` without inspecting child classes.', whyItIsThere: 'Supports arbitrary nested expression trees.', ifDeletedError: 'Calls base NotImplementedError.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 3', codeSnippet: 'class Notifier(ABC):', whatItMeans: 'Base abstract class enforcing method contract.', whyItIsThere: 'Prevents incomplete subclass instantiation.', ifDeletedError: 'Missing overrides fail late.' },
      { lineNumber: 'Line 4', codeSnippet: '@abstractmethod', whatItMeans: 'Marks `send` as mandatory for subclasses.', whyItIsThere: 'Raises TypeError if child omits `send`.', ifDeletedError: 'Child can skip implementing `send`.' },
      { lineNumber: 'Line 17', codeSnippet: 'c.send("OK")', whatItMeans: 'Runtime polymorphic method dispatch.', whyItIsThere: 'Executes concrete subclass behavior cleanly.', ifDeletedError: 'Output omitted.' },
    ],
    dryRunTable: [
      { step: 1, state: 'channels = [Email(), Sms()]', memoryOrStack: '2 concrete instances', note: 'Both honor Notifier ABC' },
      { step: 2, state: 'c = Email()', memoryOrStack: 'c.send("OK")', note: 'Dispatches Email.send -> "EMAIL:OK"' },
      { step: 3, state: 'c = Sms()', memoryOrStack: 'c.send("OK")', note: 'Dispatches Sms.send -> "SMS:OK"' },
      { step: 4, state: '" | ".join(...)', memoryOrStack: 'EMAIL:OK | SMS:OK', note: 'Zero type conditionals' },
    ],
    harryBugTraps: [
      { title: 'Trap 1: Overriding `__init__` Without Calling `super().__init__`', brokenCode: 'class Dog(Animal):\n    def __init__(self, b): self.breed = b', fixedCode: 'class Dog(Animal):\n    def __init__(self, n, b):\n        super().__init__(n)\n        self.breed = b', whyItBreaks: 'Attributes initialized in `Animal.__init__` never get created on `Dog`.' },
      { title: 'Trap 2: Instantiating an `ABC` Directly', brokenCode: 's = Shape()  # TypeError: abstract method area!', fixedCode: 's = Rect(4, 5)', whyItBreaks: 'Abstract classes define interfaces only; instantiate concrete subclasses.' },
      { title: 'Trap 3: Overusing `isinstance` Chains Instead of Method Dispatch', brokenCode: 'if isinstance(x, Rect): ... elif isinstance(x, Circle): ...', fixedCode: 'x.area()', whyItBreaks: 'Adding every new class forces editing every `isinstance` chain across the app.' },
    ],
    practiceSheet: [
      {
        id: 'py-ch19-p1',
        difficulty: 'Easy',
        title: 'Animal Sound Polymorphism',
        prompt: 'Create base `Animal` with `speak()` and subclasses `Dog` (`"WOOF"`) and `Cat` (`"MEOW"`), outputting sounds based on stdin tokens.',
        banglaHint: 'প্রতিটি টোকেনের জন্য `Dog()` বা `Cat()` বানিয়ে `.speak()` কল করো।',
        starterCode: `import sys\nclass Animal:\n    def speak(self) -> str: return ''\nclass Dog(Animal):\n    def speak(self) -> str: return 'WOOF'\nclass Cat(Animal):\n    def speak(self) -> str: return 'MEOW'\n\npets = [Dog() if t == 'D' else Cat() for t in sys.stdin.read().split()]\nprint(' '.join(p.speak() for p in pets))`,
        sampleStdin: 'D C D',
        expectedOutput: 'WOOF MEOW WOOF',
      },
      {
        id: 'py-ch19-p2',
        difficulty: 'Easy',
        title: 'super() Discounted Price Override',
        prompt: 'Subclass `Item(price)` with `DiscountItem(price, off)` overriding `final_price()` via `super()`.',
        banglaHint: '`max(0, super().final_price() - self.off)` রিটার্ন করো।',
        starterCode: `import sys\nclass Item:\n    def __init__(self, p: int): self.p = p\n    def final_price(self) -> int: return self.p\nclass DiscountItem(Item):\n    def __init__(self, p: int, off: int):\n        super().__init__(p); self.off = off\n    def final_price(self) -> int: return max(0, super().final_price() - self.off)\n\np, off = map(int, sys.stdin.read().split())\nprint(DiscountItem(p, off).final_price())`,
        sampleStdin: '500 120',
        expectedOutput: '380',
      },
      {
        id: 'py-ch19-p3',
        difficulty: 'Medium',
        title: 'Polymorphic Discount Strategy Total',
        prompt: 'Implement `Flat(val)` and `Pct(p)` pricing strategies under `Pricing(ABC)` and compute total discounted bill for `n` lines.',
        banglaHint: '`apply(amt)` মেথড প্রতিটি স্ট্র্যাটেজিতে আলাদাভাবে ইমপ্লিমেন্ট করো।',
        starterCode: `import sys\nfrom abc import ABC, abstractmethod\nclass Pricing(ABC):\n    @abstractmethod\n    def apply(self, x: int) -> int: ...\nclass Flat(Pricing):\n    def __init__(self, d: int): self.d = d\n    def apply(self, x: int) -> int: return max(0, x - self.d)\nclass Pct(Pricing):\n    def __init__(self, p: int): self.p = p\n    def apply(self, x: int) -> int: return x - (x * self.p) // 100\n\ntoks = sys.stdin.read().split()\nn, tot, idx = int(toks[0]), 0, 1\nfor _ in range(n):\n    k, x, d = toks[idx], int(toks[idx+1]), int(toks[idx+2]); idx += 3\n    strat: Pricing = Flat(d) if k == 'F' else Pct(d)\n    tot += strat.apply(x)\nprint(tot)`,
        sampleStdin: '2 F 100 15 P 200 10',
        expectedOutput: '265',
      },
      {
        id: 'py-ch19-p4',
        difficulty: 'Medium',
        title: 'Protocol Duck-Typed Sorter',
        prompt: 'Define `HasKey(Protocol)` and compute total `key()` across two unrelated classes `Box` and `Ticket`.',
        banglaHint: '`Box` ও `Ticket` উভয়েই `def key(self) -> int` রাখবে।',
        starterCode: `import sys\nfrom typing import Protocol\nclass HasKey(Protocol):\n    def key(self) -> int: ...\nclass Box:\n    def __init__(self, w: int): self.w = w\n    def key(self) -> int: return self.w * 2\nclass Ticket:\n    def __init__(self, p: int): self.p = p\n    def key(self) -> int: return self.p\n\na, b = map(int, sys.stdin.read().split())\nitems: list[HasKey] = [Box(a), Ticket(b)]\nprint(sum(x.key() for x in items))`,
        sampleStdin: '7 10',
        expectedOutput: '24',
      },
      {
        id: 'py-ch19-p5',
        difficulty: 'Hard',
        title: 'Polymorphic Arithmetic Expression Tree',
        prompt: 'Evaluate prefix expression tokens (`+ a b` or `* a b` or integer literal) using `Num`, `Add`, and `Mul` subclasses.',
        banglaHint: 'পলিমরফিক `eval()` মেথড দিয়ে টোকেন কার্সর থেকে রিকার্সিভ ট্রি বানাও।',
        starterCode: `import sys\nfrom abc import ABC, abstractmethod\nclass Expr(ABC):\n    @abstractmethod\n    def eval(self) -> int: ...\nclass Num(Expr):\n    def __init__(self, v: int): self.v = v\n    def eval(self) -> int: return self.v\nclass BinOp(Expr):\n    def __init__(self, op: str, l: Expr, r: Expr): self.op, self.l, self.r = op, l, r\n    def eval(self) -> int:\n        a, b = self.l.eval(), self.r.eval()\n        return a + b if self.op == '+' else a * b\n\ntoks = iter(sys.stdin.read().split())\ndef parse() -> Expr:\n    t = next(toks)\n    return BinOp(t, parse(), parse()) if t in ('+', '*') else Num(int(t))\nprint(parse().eval())`,
        sampleStdin: '* + 2 3 4',
        expectedOutput: '20',
      },
    ],
    miniBuild: {
      title: 'Mini-Build: Polymorphic Geometry Area Aggregator',
      description: 'Read mixed `R w h` and `S a` shape records into an `ABC Shape` list and compute total area polymorphically.',
      banglaGoal: '`ABC` বেস ক্লাস ও সাবক্লাস পলিমরফিজম মিলিয়ে শেপের মোট ক্ষেত্রফল হিসাব করো।',
      combinesChapters: 'Ch 11, 18, 19',
      starterCode: `import sys\nfrom abc import ABC, abstractmethod\nclass Shape(ABC):\n    @abstractmethod\n    def area(self) -> int: ...\nclass Rect(Shape):\n    def __init__(self, w: int, h: int): self.w, self.h = w, h\n    def area(self) -> int: return self.w * self.h\nclass Square(Shape):\n    def __init__(self, a: int): self.a = a\n    def area(self) -> int: return self.a * self.a\n\ntoks = sys.stdin.read().split()\nn, idx = int(toks[0]), 1\nshapes: list[Shape] = []\nfor _ in range(n):\n    if toks[idx] == 'R':\n        shapes.append(Rect(int(toks[idx+1]), int(toks[idx+2]))); idx += 3\n    else:\n        shapes.append(Square(int(toks[idx+1]))); idx += 2\nprint(sum(s.area() for s in shapes))`,
      sampleStdin: '2 R 4 5 S 6',
      expectedOutput: '56',
    },
    starterCode: `import sys\nfrom abc import ABC, abstractmethod\nclass Shape(ABC):\n    @abstractmethod\n    def area(self) -> int: ...\nclass Rect(Shape):\n    def __init__(self, w: int, h: int): self.w, self.h = w, h\n    def area(self) -> int: return self.w * self.h\nclass Square(Shape):\n    def __init__(self, a: int): self.a = a\n    def area(self) -> int: return self.a * self.a\n\ntoks = sys.stdin.read().split()\nn, idx = int(toks[0]), 1\nshapes: list[Shape] = []\nfor _ in range(n):\n    if toks[idx] == 'R':\n        shapes.append(Rect(int(toks[idx+1]), int(toks[idx+2]))); idx += 3\n    else:\n        shapes.append(Square(int(toks[idx+1]))); idx += 2\nprint(sum(s.area() for s in shapes))`,
    sampleStdin: '2 R 4 5 S 6',
    expectedSampleOutput: '56',
    testCases: [
      { id: 'py19-t1', input: '2 R 4 5 S 6', expectedOutput: '56' },
      { id: 'py19-t2', input: '3 S 2 S 3 R 1 10', expectedOutput: '23', isHidden: true },
    ],
  },
  20: {
    chapterNumber: 20,
    isMilestoneMerger: true,
    title: 'Python Chapter 20: Type Hints & Collections (Counter, defaultdict, deque) — Merger 4',
    banglaTitle: 'Python অধ্যায় ২০: টাইপ হিন্ট ও Collections (Counter, defaultdict, deque) — মার্জার ৪',
    subtitle: 'Milestone Merger 4: Pair modern Python 3.13 generic type hints with Counter, defaultdict, deque, and heapq pipelines.',
    zeroIntuition: {
      plainEnglishStory:
        'Dynamic Python code becomes far easier to reason about and refactor when functions declare modern PEP 585/604 type hints such as list[str], dict[str, int], or int | None. Combined with the collections standard module—Counter for instant O(n) tallies, defaultdict for grouping without KeyError boilerplate, and deque for O(1) sliding queues—you eliminate noisy manual dictionary initialization.\n\nThis Milestone Merger 4 chapter weaves together classes, type annotations, collections, and lambda sort keys so your Python programs remain both concise for contests and self-documenting in production.',
      asciiFlowchart: `  [ Token Stream ] ---> Counter(tokens)  (O(n) C-backed frequency hash)
                             |
                             v
  sorted(freq.items(), key=lambda kv: (-kv[1], kv[0]))
                             |
                             v
  [ Typed Leaderboard: list[tuple[str, int]] ]`,
      pseudocode: [
        '1. ANNOTATE helper functions with list[str], Counter[str], and tuple return types',
        '2. TALLY occurrences via collections.Counter or group via defaultdict(list)',
        '3. SORT using multi-key lambda (-count, name) for deterministic ties',
        '4. STREAM top ranked items or use deque / heapq for O(log n) windowing',
      ],
      banglaZeroToHero: {
        analogyTitle: 'স্বয়ংক্রিয় গোছানো ওয়ার্কশপ ও টাইপ-লেবেল (Type Hints + Collections)',
        explanation:
          'ধরো একটি বড় গুদামে বিভিন্ন পণ্য আসছে, আর তোমার কাজ হলো প্রতিটির হিসাব রাখা এবং ক্রম সাজানো। সাধারণ dict ব্যবহার করলে প্রতিবার আগে চেক করতে হয় কী আছে কি না, নইলে KeyError আসে। Python-এর collections মডিউল এই ঝামেলা এক মুহূর্তে দূর করে দেয়। Counter দিলে লিস্টের সব উপাদানের সংখ্যা মুহূর্তেই C-গতিতে গোনা হয়ে যায়। defaultdict(list) ব্যবহার করলে কোনো কী না থাকলেও স্বয়ংক্রিয়ভাবে ফাঁকা লিস্ট তৈরি হয়ে যায়। আবার deque দুই প্রান্ত থেকেই O(1) সময়ে ডেটা যোগ বা বাদ দিতে পারে, যা সাধারণ list.pop(0)-এর চেয়ে অনেক দ্রুত। এর সাথে Python 3.13-এর টাইপ হিন্ট যেমন list[str] বা dict[str, int] যোগ করলে পুরো কোড পড়া এবং বড় প্রজেক্টে ডিবাগ করা খুব সহজ হয়ে যায়। মার্জার ৪-এ আমরা টাইপ হিন্ট, সর্টিং ল্যাম্বডা আর কালেকশনস একসাথে মিলিয়ে রিয়েল-ওয়ার্ল্ড ও কন্টেস্ট ডেটা প্রসেস করবো।',
        everydayExample: 'লাইব্রেরির লেবেলযুক্ত র‍্যাক: প্রতিটি তাকে আগেই লেখা থাকে কী ধরনের বই রাখা আছে।',
        keyTakeaways: [
          'Counter সাধারণ লুপের চেয়ে দ্রুত এবং ক্লিন ফ্রিকোয়েন্সি টেবিল বানায়।',
          'list.pop(0) এর বদলে সবসময় collections.deque.popleft() ব্যবহার করবে।',
          'sorted(..., key=lambda kv: (-kv[1], kv[0])) দিয়ে সহজেই মাল্টি-কী র‍্যাঙ্কিং হয়।',
        ],
      },
    },
    topics: [
      {
        id: 'py-ch-20-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Typed Helper & Counter Frequency Leaderboard',
        englishParagraphs: [
          'Annotate a function accepting list[str] and returning list[tuple[str, int]] sorted by frequency descending then alphabetically.',
        ],
        banglaParagraphs: [
          'list[str] টাইপ হিন্ট ও Counter ব্যবহার করে সাজানো ফ্রিকোয়েন্সি তালিকা তৈরি।',
        ],
        memoryDiagram: `Counter(["py","rust","py"]) -> sorted(-count, word) -> [("py",2), ("rust",1)]`,
        code: `from collections import Counter

def rank_words(words: list[str]) -> list[tuple[str, int]]:
    counts: Counter[str] = Counter(words)
    return sorted(counts.items(), key=lambda kv: (-kv[1], kv[0]))

for word, cnt in rank_words(["py", "rust", "py", "go", "rust"]):
    print(f"{word}:{cnt}")`,
        stdin: '',
        expectedOutput: 'py:2\nrust:2\ngo:1',
        lineByLine: [
          {
            lineNumber: 'Line 3',
            codeSnippet: 'def rank_words(words: list[str]) -> list[tuple[str, int]]:',
            whatItMeans: 'Documents exact input and output container types.',
            whyItIsThere: 'Enables static checking with mypy/pyright and clearer refactoring.',
            ifDeletedError: 'Function signature disappears.',
          },
          {
            lineNumber: 'Line 5',
            codeSnippet: 'return sorted(counts.items(), key=lambda kv: (-kv[1], kv[0]))',
            whatItMeans: 'Primary sort descending by count, secondary ascending by word.',
            whyItIsThere: 'Guarantees deterministic tie-breaking.',
            ifDeletedError: 'Output stays unsorted.',
          },
        ],
      },
      {
        id: 'py-ch-20-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'defaultdict(list) Anagram / Tag Grouping',
        englishParagraphs: [
          'Group stdin words by their sorted character signature using defaultdict(list).',
        ],
        banglaParagraphs: [
          'defaultdict(list) ব্যবহার করে একই অক্ষরযুক্ত শব্দগুলোকে দলবদ্ধ করো।',
        ],
        memoryDiagram: `defaultdict(list)["aet"] -> ["eat", "tea", "ate"]`,
        code: `import sys
from collections import defaultdict

toks = sys.stdin.read().split()
groups: defaultdict[str, list[str]] = defaultdict(list)
for w in toks[1:]:
    sig = "".join(sorted(w))
    groups[sig].append(w)

out = sorted("-".join(sorted(v)) for v in groups.values())
print(" | ".join(out))`,
        stdin: '4 eat tea tan ate',
        expectedOutput: 'ate-eat-tea | tan',
        lineByLine: [
          {
            lineNumber: 'Line 5',
            codeSnippet: 'groups: defaultdict[str, list[str]] = defaultdict(list)',
            whatItMeans: 'Auto-creates an empty list whenever a missing key is accessed.',
            whyItIsThere: 'Eliminates manual if key not in groups checks.',
            ifDeletedError: 'Accessing groups[sig].append raises KeyError.',
          },
        ],
      },
      {
        id: 'py-ch-20-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'collections.deque Sliding Window Max Sum',
        englishParagraphs: [
          'deque supports O(1) append and popleft for streaming fixed-size telemetry windows.',
        ],
        banglaParagraphs: [
          'deque-এর popleft() দিয়ে O(1) সময়ে স্লাইডিং উইন্ডো মেনটেইন করা হয়।',
        ],
        memoryDiagram: `deque([2, 5, 1], maxlen=3) -> sum=8`,
        code: `import sys
from collections import deque

nums = list(map(int, sys.stdin.read().split()))
k = nums[0]
win: deque[int] = deque()
cur = 0
best = -10**18
for x in nums[1:]:
    win.append(x)
    cur += x
    if len(win) > k:
        cur -= win.popleft()
    if len(win) == k and cur > best:
        best = cur
print(best)`,
        stdin: '3 2 1 5 1 3 2',
        expectedOutput: '9',
        lineByLine: [
          {
            lineNumber: 'Line 13',
            codeSnippet: 'cur -= win.popleft()',
            whatItMeans: 'Evicts the oldest item from the left in O(1) time.',
            whyItIsThere: 'Avoids O(k) list.pop(0) shifts on every iteration.',
            ifDeletedError: 'Window grows beyond k elements.',
          },
        ],
      },
      {
        id: 'py-ch-20-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'heapq Min-Heap Top-K Selection in O(N log K)',
        englishParagraphs: [
          'Maintain a size-K min-heap with heapq instead of sorting the entire stream when K is small.',
        ],
        banglaParagraphs: [
          'সব ডেটা সর্ট না করে heapq দিয়ে ছোট K-আকারের মিনি-হিপ রাখলে মেমোরি ও সময় বাঁচে।',
        ],
        memoryDiagram: `min-heap size=k -> heappushpop removes smallest -> heap[0] is k-th largest`,
        code: `import heapq, sys

nums = list(map(int, sys.stdin.read().split()))
k = nums[0]
hp: list[int] = []
for x in nums[1:]:
    if len(hp) < k:
        heapq.heappush(hp, x)
    elif x > hp[0]:
        heapq.heapreplace(hp, x)
print(" ".join(map(str, sorted(hp, reverse=True))))`,
        stdin: '3 10 4 25 8 19 30',
        expectedOutput: '30 25 19',
        lineByLine: [
          {
            lineNumber: 'Line 10',
            codeSnippet: 'heapq.heapreplace(hp, x)',
            whatItMeans: 'Pops smallest root and pushes x in a single heap sift.',
            whyItIsThere: 'Faster than separate heappop + heappush.',
            ifDeletedError: 'Heap size stays frozen at initial k items.',
          },
        ],
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 1',
        codeSnippet: 'from collections import Counter',
        whatItMeans: 'Imports C-optimized dictionary subclass for frequency counting.',
        whyItIsThere: 'Builds word tallies in a single pass.',
        ifDeletedError: 'NameError: name Counter is not defined.',
      },
      {
        lineNumber: 'Line 3',
        codeSnippet: 'def rank_words(words: list[str]) -> list[tuple[str, int]]:',
        whatItMeans: 'Documents exact input and output container types.',
        whyItIsThere: 'Enables static checking with mypy/pyright and clearer refactoring.',
        ifDeletedError: 'Function signature disappears.',
      },
      {
        lineNumber: 'Line 4',
        codeSnippet: 'counts: Counter[str] = Counter(words)',
        whatItMeans: 'Tallies every unique word in O(n).',
        whyItIsThere: 'Replaces manual for-loop dictionary counting.',
        ifDeletedError: 'No counts object exists to sort.',
      },
      {
        lineNumber: 'Line 5',
        codeSnippet: 'return sorted(counts.items(), key=lambda kv: (-kv[1], kv[0]))',
        whatItMeans: 'Primary sort descending by count, secondary ascending by word.',
        whyItIsThere: 'Guarantees deterministic tie-breaking.',
        ifDeletedError: 'Output stays unsorted.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'Counter(["py","rust","py","go","rust"])', memoryOrStack: '{"py":2,"rust":2,"go":1}', note: 'O(n) tally' },
      { step: 2, state: 'key = (-2, "py") vs (-2, "rust")', memoryOrStack: '"py" < "rust"', note: 'Alphabetical tie-break' },
      { step: 3, state: 'key = (-1, "go")', memoryOrStack: 'placed last', note: 'Lowest count' },
      { step: 4, state: 'Loop print', memoryOrStack: 'py:2 / rust:2 / go:1', note: 'Clean stdout' },
    ],
    harryBugTraps: [
      {
        title: 'Using list.pop(0) Inside Sliding Window Loop',
        brokenCode: `win.pop(0)  # O(N) shift -> O(N^2) TLE!`,
        fixedCode: `win = deque(); win.popleft()  # O(1)`,
        whyItBreaks: 'Removing index 0 shifts every remaining element in a Python list, triggering TLE on large inputs.',
      },
      {
        title: 'Mutable Default Argument in Typed Function',
        brokenCode: `def add(x: int, acc: list[int] = []): ...`,
        fixedCode: `def add(x: int, acc: list[int] | None = None): acc = [] if acc is None else acc`,
        whyItBreaks: 'Default mutable list is shared across every subsequent function call.',
      },
      {
        title: 'Assuming dict.get(k) Returns 0 Instead of None',
        brokenCode: `freq[k] = freq.get(k) + 1`,
        fixedCode: `freq[k] = freq.get(k, 0) + 1  # or use Counter / defaultdict(int)`,
        whyItBreaks: 'Adding 1 to None raises TypeError on the first occurrence of k.',
      },
    ],
    practiceSheet: [
      {
        id: 'py-ch-20-p1',
        difficulty: 'Easy',
        title: 'Counter Top-1 Word',
        prompt: 'Read words from stdin and print the highest-frequency word (ties broken alphabetically).',
        banglaHint: 'ইঙ্গিত: Counter দিয়ে গুনে key=lambda kv: (-kv[1], kv[0]) দিয়ে প্রথমটি বের করো।',
        starterCode: `import sys\nfrom collections import Counter\ncnt = Counter(sys.stdin.read().split())\nbest = min(cnt.items(), key=lambda kv: (-kv[1], kv[0]))\nprint(f"{best[0]} {best[1]}")`,
        sampleStdin: 'ml ai ml db ai',
        expectedOutput: 'ai 2',
      },
      {
        id: 'py-ch-20-p2',
        difficulty: 'Easy',
        title: 'defaultdict Category Totals',
        prompt: 'Read category value pairs and print sorted "category:sum" lines using defaultdict(int).',
        banglaHint: 'ইঙ্গিত: defaultdict(int) ব্যবহার করলে প্রাথমিক মান স্বয়ংক্রিয়ভাবে ০ হয়।',
        starterCode: `import sys\nfrom collections import defaultdict\ntoks = sys.stdin.read().split()\ntotals: defaultdict[str, int] = defaultdict(int)\nfor i in range(0, len(toks), 2):\n    totals[toks[i]] += int(toks[i + 1])\nfor k in sorted(totals):\n    print(f"{k}:{totals[k]}")`,
        sampleStdin: 'food 50 tech 120 food 30',
        expectedOutput: 'food:80\ntech:120',
      },
      {
        id: 'py-ch-20-p3',
        difficulty: 'Medium',
        title: 'deque Sliding Window Averages',
        prompt: 'Given k followed by integers, print integer-truncated average of every size-k window.',
        banglaHint: 'ইঙ্গিত: deque-তে নতুন সংখ্যা যোগ করে দৈর্ঘ্য k ছাড়ালে popleft() করো।',
        starterCode: `import sys\nfrom collections import deque\nnums = list(map(int, sys.stdin.read().split()))\nk = nums[0]\nq: deque[int] = deque()\ns = 0\nout = []\nfor x in nums[1:]:\n    q.append(x); s += x\n    if len(q) > k: s -= q.popleft()\n    if len(q) == k: out.append(str(s // k))\nprint(" ".join(out))`,
        sampleStdin: '3 10 20 30 40 50',
        expectedOutput: '20 30 40',
      },
      {
        id: 'py-ch-20-p4',
        difficulty: 'Medium',
        title: 'Ordered Unique Grouping',
        prompt: 'Group integers by remainder mod m using defaultdict(list) and print sorted remainders with counts.',
        banglaHint: 'ইঙ্গিত: buckets[x % m].append(x) করে লেন্থ প্রিন্ট করো।',
        starterCode: `import sys\nfrom collections import defaultdict\nnums = list(map(int, sys.stdin.read().split()))\nm = nums[0]\nbuckets: defaultdict[int, list[int]] = defaultdict(list)\nfor x in nums[1:]:\n    buckets[x % m].append(x)\nprint(" ".join(f"{r}:{len(buckets[r])}" for r in sorted(buckets)))`,
        sampleStdin: '3 4 7 9 10 12',
        expectedOutput: '0:2 1:3',
      },
      {
        id: 'py-ch-20-p5',
        difficulty: 'Hard',
        title: 'heapq Event Scheduler Merge',
        prompt: 'Read n tasks (priority name) and use heapq to output names from lowest priority number to highest.',
        banglaHint: 'ইঙ্গিত: heapq-তে (priority, name) টাপল পুশ করে একে একে heappop করো।',
        starterCode: `import heapq, sys\ntoks = sys.stdin.read().split()\nn = int(toks[0])\nhp: list[tuple[int, str]] = []\nidx = 1\nfor _ in range(n):\n    heapq.heappush(hp, (int(toks[idx]), toks[idx + 1]))\n    idx += 2\nprint(" ".join(heapq.heappop(hp)[1] for _ in range(len(hp))))`,
        sampleStdin: '3 5 backup 1 auth 3 cache',
        expectedOutput: 'auth cache backup',
      },
    ],
    miniBuild: {
      title: 'Milestone Merger 4: Typed Counter Leaderboard',
      description: 'Combine modern Python type hints, Counter, and multi-key sorting to rank tokens cleanly.',
      banglaGoal: 'মার্জার ৪: টাইপ হিন্ট ও Counter ব্যবহার করে ফ্রিকোয়েন্সি লিডারবোর্ড তৈরি করা।',
      combinesChapters: 'Ch 11, 14, 18, 20',
      starterCode: `import sys\nfrom collections import Counter\n\ndef rank_words(words: list[str]) -> list[tuple[str, int]]:\n    counts: Counter[str] = Counter(words)\n    return sorted(counts.items(), key=lambda kv: (-kv[1], kv[0]))\n\ntoks = sys.stdin.read().split()\nfor word, cnt in rank_words(toks[1:]):\n    print(f"{word}:{cnt}")`,
      sampleStdin: '5\npy rust py go rust',
      expectedOutput: 'py:2\nrust:2\ngo:1',
    },
    starterCode: `import sys\nfrom collections import Counter\n\ndef rank_words(words: list[str]) -> list[tuple[str, int]]:\n    counts: Counter[str] = Counter(words)\n    return sorted(counts.items(), key=lambda kv: (-kv[1], kv[0]))\n\ntoks = sys.stdin.read().split()\nfor word, cnt in rank_words(toks[1:]):\n    print(f"{word}:{cnt}")`,
    sampleStdin: '5\npy rust py go rust',
    expectedSampleOutput: 'py:2\nrust:2\ngo:1',
    testCases: [
      { id: 'py20-t1', input: '5\npy rust py go rust', expectedOutput: 'py:2\nrust:2\ngo:1' },
      { id: 'py20-t2', input: '3\na a b', expectedOutput: 'a:2\nb:1', isHidden: true },
    ],
  },
};
