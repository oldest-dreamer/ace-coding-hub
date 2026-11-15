import type { DeepChapterContent } from './deepChapter1';
import type { LanguageId } from '../types/academy';

export const DEEP_CHAPTER_13: Record<LanguageId, DeepChapterContent> = {
  c: {
    title: 'C Chapter 13 (C23): Concurrency Models, Data-Race Safety & Isolated Task Reduction',
    banglaTitle: 'C অধ্যায় ১৩ (C23): কনকারেন্সি, ডেটা-রেস নিরাপত্তা ও আইসোলেটেড টাস্ক রিডাকশন',
    subtitle: 'Prevent data races without shared mutable state using Map-Reduce worker partitioning, atomic-safe design, and mutex discipline.',
    zeroIntuition: {
      plainEnglishStory:
        'When two CPU threads update `total += x` at the exact same nanosecond without protection, both read `total = 10`, add `5`, and write `15`—one update disappears forever (**Data Race**)! The cleanest way to kill data races is **Share-Nothing MapReduce**: give each worker task its own isolated slot (`slot[i]`), compute concurrently or asynchronously, and merge once cleanly at the end.',
      asciiFlowchart: `  DATA-RACE TRAP vs SHARE-NOTHING MAP-REDUCE
  BROKEN: Thread A & B both write to shared 'total' -> lost updates!
  SAFE  : [Worker 0: 10]   [Worker 1: 20]   [Worker 2: 30]   (disjoint memory!)
                 \\               |               /
                  +---- Merge Step (Main) ------+  => total = 60 (Zero Races!)`,
      pseudocode: [
        '1. ALLOCATE disjoint result slot[0..n-1] for each independent job',
        '2. EXECUTE run_task(job[i]) reading ONLY its private input and writing slot[i]',
        '3. JOIN / BARRIER wait until all n jobs complete',
        '4. REDUCE total = sum(slot[0..n-1]) on single owner thread',
        '5. EMIT total safely',
      ],
      banglaZeroToHero: {
        analogyTitle: 'একই খাতায় দুইজনের একসাথে লেখা (Data Race) বনাম আলাদা স্লিপে হিসাব',
        explanation:
          'ধরো দুইজন ক্যাশিয়ার একই বোর্ডে লেখা `মোট = ১০০` দেখে দুজনই +১০ যোগ করে `১১০` লিখে দিল—মোট `১২০` হওয়ার কথা থাকলেও ১০ টাকা হারিয়ে গেল! এটাই **Data Race**। সমাধান হলো: প্রতিটি কর্মীকে (Thread/Task) তার নিজস্ব আলাদা কাগজ দাও (Private Buffer)। সে তার কাজ শেষ করে কাগজ জমা দিলে শেষে ম্যানেজার সব যোগ করবে—তালা বা লকেরও দরকার কম পড়ে!',
        everydayExample:
          'একটি বড় ব্যাংকের শাখায় ৫টি কাউন্টার আলাদা আলাদা টাকা গুনে দিনশেষে প্রধান ক্যাশিয়ারকে ফাইনাল হিসাব দেওয়া।',
        keyTakeaways: [
          'শেয়ার্ড মেমোরিতে লক ছাড়া দুটি থ্রেড লিখলেই **Undefined Behavior / Data Race** ঘটে।',
          'প্রতিটি ওয়ার্কারকে আলাদা আউটপুট স্লট (`results[i]`) দিলে লক কনটেনশন শূন্যে নেমে আসে।',
          'যখন মিউটেক্স (`pthread_mutex_lock`) নিতেই হয়, সব থ্রেডে **একই ক্রমে** লক নেবে—নইলে **Deadlock** হবে!',
        ],
      },
    },
    codeExamples: [
      {
        id: 'c-13-ex-basic',
        tier: 'Basic',
        title: '1. Basic: Share-Nothing Task Partition & Final Reduction',
        banglaNote: 'প্রতিটি টাস্কে আলাদা কাজ দিয়ে ডেটা-রেস ছাড়া চূড়ান্ত যোগফল বের করা।',
        code: `#include <stdio.h>

static long long run_task(long long x) {
    return x;
}

int main(void) {
    int n = 0;
    if (scanf("%d", &n) != 1) return 0;
    long long total = 0;
    for (int i = 0; i < n; i++) {
        long long x = 0;
        scanf("%lld", &x);
        total += run_task(x);
    }
    printf("%lld\\n", total);
    return 0;
}`,
        stdin: '3\n10 20 30',
        expectedOutput: '60',
      },
      {
        id: 'c-13-ex-edge',
        tier: 'Edge-Case',
        title: '2. Edge-Case: Zero Tasks & Overflow-Safe 64-Bit Join Buffer',
        banglaNote: '`n = 0` খালি ব্যাচ এবং বড় ৬৪-বিট ওয়ার্কার স্লট নিরাপদে হ্যান্ডলিং।',
        code: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int n = 0;
    if (scanf("%d", &n) != 1 || n <= 0) {
        printf("0\\n");
        return 0;
    }
    long long *slots = calloc((size_t)n, sizeof(long long));
    if (!slots) return 1;
    for (int i = 0; i < n; i++) {
        long long x = 0; scanf("%lld", &x);
        slots[i] = x;
    }
    long long total = 0;
    for (int i = 0; i < n; i++) total += slots[i];
    printf("%lld\\n", total);
    free(slots);
    return 0;
}`,
        stdin: '4\n5 10 15 20',
        expectedOutput: '50',
      },
      {
        id: 'c-13-ex-opt',
        tier: 'Optimized',
        title: '3. Optimized: Cooperative Ring-Buffer Event Loop Simulation',
        banglaNote: 'হাই-থ্রুপুট সার্ভারের মতো কিউ থেকে নন-ব্লকিং স্টেট মেশিন টাস্ক চালানো।',
        code: `#include <stdio.h>

typedef struct { int id; int rem_work; int val; } Task;

int main(void) {
    int n = 0;
    if (scanf("%d", &n) != 1 || n <= 0) return 0;
    Task q[64];
    for (int i = 0; i < n; i++) {
        int x = 0; scanf("%d", &x);
        q[i] = (Task){ i, 2, x };
    }
    long long done_sum = 0;
    int ticks = 0;
    for (int round = 0; round < 2; round++) {
        for (int i = 0; i < n; i++) {
            q[i].rem_work--;
            ticks++;
            if (q[i].rem_work == 0) done_sum += q[i].val;
        }
    }
    printf("ticks=%d sum=%lld\\n", ticks, done_sum);
    return 0;
}`,
        stdin: '3\n10 20 30',
        expectedOutput: 'ticks=6 sum=60',
      },
      {
        id: 'c-13-ex-cp',
        tier: 'CP Trick',
        title: '4. CP Trick: False-Sharing Padded Slot Layout (64-Byte Cache Line)',
        banglaNote: 'মাল্টিকোর সিপিইউতে দুটি থ্রেডের আলাদা ভ্যারিয়েবল একই ৬৪-বাইট ক্যাশ লাইনে পড়ে স্লো হওয়া ঠেকানো।',
        code: `#include <stdio.h>
#include <stdalign.h>

typedef struct {
    alignas(64) long long partial;
} CacheAlignedSlot;

int main(void) {
    int n = 0;
    if (scanf("%d", &n) != 1 || n > 16) return 0;
    CacheAlignedSlot workers[16] = {0};
    for (int i = 0; i < n; i++) {
        long long x = 0; scanf("%lld", &x);
        workers[i].partial = x * x;
    }
    long long sum = 0;
    for (int i = 0; i < n; i++) sum += workers[i].partial;
    printf("%lld\\n", sum);
    return 0;
}`,
        stdin: '3\n2 3 4',
        expectedOutput: '29',
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 3',
        codeSnippet: 'static long long run_task(long long x) { return x; }',
        whatItMeans: 'Pure stateless worker function with zero shared global state.',
        whyItIsThere: 'Pure functions are automatically thread-safe with zero locks.',
        ifDeletedError: 'Compile error: implicit declaration of run_task.',
      },
      {
        lineNumber: 'Line 10',
        codeSnippet: 'long long total = 0;',
        whatItMeans: 'Accumulator owned strictly by main after task results return.',
        whyItIsThere: 'Single-owner reduction eliminates concurrent write races.',
        ifDeletedError: 'Cannot accumulate worker outputs.',
      },
      {
        lineNumber: 'Line 14',
        codeSnippet: 'total += run_task(x);',
        whatItMeans: 'Collects completed worker payload safely into final sum.',
        whyItIsThere: 'Mirrors join-then-reduce concurrency semantics.',
        ifDeletedError: 'Program prints 0 instead of batch sum.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'Read n = 3 tasks', memoryOrStack: 'total = 0', note: 'Batch initialized' },
      { step: 2, state: 'Worker 0 returns 10', memoryOrStack: 'total = 10', note: 'No shared lock needed' },
      { step: 3, state: 'Worker 1 returns 20', memoryOrStack: 'total = 30', note: 'Isolated execution' },
      { step: 4, state: 'Worker 2 returns 30', memoryOrStack: 'total = 60', note: 'Prints 60' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: Unsynchronized Global Counter Across Threads',
        brokenCode: 'int counter = 0; // Thread A & B both run counter++; -> Lost updates!',
        fixedCode: '// Use C11/C23 _Atomic int counter OR per-thread partial slots + final merge',
        whyItBreaks: 'Read-modify-write (`counter++`) compiles to 3 CPU instructions that interleave across cores.',
      },
      {
        title: 'Trap 2: Lock-Ordering Deadlock (AB / BA)',
        brokenCode: '// Thread 1: lock(A), lock(B)\n// Thread 2: lock(B), lock(A) -> Both freeze forever!',
        fixedCode: '// Enforce canonical lock order (always lock lower ID / A before B)',
        whyItBreaks: 'Circular wait prevents either thread from ever releasing its first mutex.',
      },
      {
        title: 'Trap 3: False Sharing Between Adjacent Worker Counters',
        brokenCode: 'long long worker_cnt[4]; // All 4 sit on the SAME 64-byte CPU cache line!',
        fixedCode: 'typedef struct { alignas(64) long long cnt; } Slot;',
        whyItBreaks: 'CPU cores ping-pong cache-line ownership, destroying parallel speedup.',
      },
    ],
    practiceSheet: [
      {
        id: 'c-ch-13-q1',
        difficulty: 'Easy',
        title: 'Warm-up: Isolated Task Sum Reduction',
        prompt: 'Process n task payloads and reduce them cleanly to a single sum.',
        banglaHint: '`run_task(x)` থেকে প্রাপ্ত মান `total`-এ যোগ করে প্রিন্ট করো।',
        starterCode: `#include <stdio.h>
long long run_task(long long x) { return x; }
int main(void) {
    int n; if (scanf("%d", &n) != 1) return 0;
    long long total = 0, x;
    for (int i = 0; i < n; i++) { scanf("%lld", &x); total += run_task(x); }
    printf("%lld\\n", total);
    return 0;
}`,
        sampleStdin: '3\n10 20 30',
        expectedOutput: '60',
      },
      {
        id: 'c-ch-13-q2',
        difficulty: 'Easy',
        title: 'Empty Batch Zero Guard',
        prompt: 'Return 0 cleanly when n = 0 tasks are queued.',
        banglaHint: '`n <= 0` হলে নিরাপদে `0` প্রিন্ট করো।',
        starterCode: `#include <stdio.h>
int main(void) {
    int n = 0; if (scanf("%d", &n) != 1 || n <= 0) { printf("0\\n"); return 0; }
    long long sum = 0, x;
    for (int i = 0; i < n; i++) { scanf("%lld", &x); sum += x; }
    printf("%lld\\n", sum);
    return 0;
}`,
        sampleStdin: '0',
        expectedOutput: '0',
      },
      {
        id: 'c-ch-13-q3',
        difficulty: 'Medium',
        title: 'Two-Partition Parallel-Safe Merge',
        prompt: 'Split input into first half and second half accumulators, then merge once.',
        banglaHint: '`left_sum` ও `right_sum` আলাদা ভ্যারিয়েবলে রেখে শেষে যোগ করো।',
        starterCode: `#include <stdio.h>
int main(void) {
    int n; if (scanf("%d", &n) != 1) return 0;
    long long left = 0, right = 0, x;
    for (int i = 0; i < n; i++) { scanf("%lld", &x); if (i < n / 2) left += x; else right += x; }
    printf("%lld\\n", left + right);
    return 0;
}`,
        sampleStdin: '4\n5 10 15 20',
        expectedOutput: '50',
      },
      {
        id: 'c-ch-13-q4',
        difficulty: 'Medium',
        title: 'Round-Robin Cooperative Task Scheduler',
        prompt: 'Simulate round-robin time slicing with quantum=1 and print completion order IDs.',
        banglaHint: 'প্রতি রাউন্ডে সব অসম্পূর্ণ টাস্কের `work` ১ করে কমিয়ে শেষ হলে প্রিন্ট করো।',
        starterCode: `#include <stdio.h>
int main(void) {
    int n; if (scanf("%d", &n) != 1) return 0;
    int work[32]; for (int i = 0; i < n; i++) scanf("%d", &work[i]);
    int remaining = n;
    while (remaining > 0) {
        for (int i = 0; i < n; i++) {
            if (work[i] > 0) {
                work[i]--;
                if (work[i] == 0) { remaining--; printf("T%d%s", i, remaining ? " " : "\\n"); }
            }
        }
    }
    return 0;
}`,
        sampleStdin: '3\n2 1 2',
        expectedOutput: 'T1 T0 T2',
      },
      {
        id: 'c-ch-13-q5',
        difficulty: 'Hard',
        title: 'Lock-Order Deadlock Prevention Audit',
        prompt: 'Validate lock acquisition pairs (a, b): print SAFE if a < b always, else DEADLOCK_RISK.',
        banglaHint: 'প্রতিটি থ্রেড ছোট আইডির লক বড় আইডির আগে নিলে সার্কুলার ওয়েট অসম্ভব।',
        starterCode: `#include <stdio.h>
int main(void) {
    int n; if (scanf("%d", &n) != 1) return 0;
    int ok = 1;
    for (int i = 0; i < n; i++) {
        int a, b; scanf("%d %d", &a, &b);
        if (a >= b) ok = 0;
    }
    printf("%s\\n", ok ? "SAFE" : "DEADLOCK_RISK");
    return 0;
}`,
        sampleStdin: '2\n1 2\n2 1',
        expectedOutput: 'DEADLOCK_RISK',
      },
    ],
    miniBuild: {
      title: 'C Mini Build: Lock-Free Partitioned Batch Reducer',
      description: 'Processes independent telemetry payloads cleanly without shared mutable locks.',
      banglaGoal: 'আইসোলেটেড টাস্ক ডিজাইনের মাধ্যমে ডেটা-রেসমুক্ত ব্যাচ প্রসেসর তৈরি করা।',
      combinesChapters: 'Ch 1–13',
      starterCode: `#include <stdio.h>
long long run_task(long long x) { return x; }
int main(void) {
    int n; if (scanf("%d", &n) != 1) return 0;
    long long total = 0, x;
    for (int i = 0; i < n; i++) { scanf("%lld", &x); total += run_task(x); }
    printf("%lld\\n", total);
    return 0;
}`,
      sampleStdin: '3\n10 20 30',
      expectedOutput: '60',
    },
  },

  cpp: {
    title: 'C++ Chapter 13 (C++23): std::future, Lazy/Async Tasks, Mutexes & Race-Free Concurrency',
    banglaTitle: 'C++ অধ্যায় ১৩ (C++23): std::future, Async টাস্ক, মিউটেক্স ও রেস-মুক্ত কনকারেন্সি',
    subtitle: 'Dispatch isolated futures returning values directly via .get(), understand deferred vs thread launches, and guard shared state.',
    zeroIntuition: {
      plainEnglishStory:
        'Passing references to shared globals across workers forces mutexes everywhere. C++ `<future>` lets each task act like a restaurant order ticket: submit work, get back a `std::future<long long>`, and call `t.get()` later to collect its isolated return value—zero manual locks needed!',
      asciiFlowchart: `  C++ <future> TICKET MODEL
  Main pushes job -> std::async(launch::deferred, lambda) -> future<long long>
  Main collects   -> total += task.get(); (automatically retrieves isolated result!)`,
      pseudocode: [
        '1. CREATE vector<future<long long>> tasks',
        '2. PUSH isolated value-capturing lambdas returning long long',
        '3. ITERATE tasks and sum t.get() cleanly',
        '4. OUTPUT merged total',
      ],
      banglaZeroToHero: {
        analogyTitle: 'রেস্টুরেন্টের টোকেন স্লিপ (std::future) বনাম এক টেবিলে কাড়াকাড়ি',
        explanation:
          'ফুড কোর্টে অর্ডার দিলে তোমাকে একটি টোকেন স্লিপ (`std::future`) দেওয়া হয়। তুমি বসে থাকো; খাবার রেডি হলে `t.get()` বলে টোকেন দিলেই তোমার নির্দিষ্ট প্লেট হাতে চলে আসে। একাধিক বাবুর্চি কাজ করলেও কেউ কারো প্লেটে হাত দেয় না!',
        everydayExample:
          'একই সাথে ৩টি মাইক্রোসার্ভিসে (`Auth`, `Profile`, `Feed`) ফিউচার কল পাঠিয়ে `.get()` দিয়ে একসাথে রেসপন্স জোড়া লাগানো।',
        keyTakeaways: [
          '`std::future<T>` একবারই `.get()` কল করতে দেয়—দ্বিতীয়বার ডাকলে `future_error` হয়।',
          '`std::launch::deferred` মূলত লেজি ফিউচার (থ্রেড ছাড়াই `.get()`-এর সময় চলে), তাই কোনো অতিরিক্ত `-pthread` ফ্ল্যাগ ছাড়াই নিরাপদে কাজ করে।',
          'শেয়ার্ড ডেটায় লক নিতে হলে কখনো খালি `m.lock()` লিখবে না—সব সময় RAII **`std::lock_guard`** বা **`std::scoped_lock`** ব্যবহার করবে।',
        ],
      },
    },
    codeExamples: [
      {
        id: 'cpp-13-ex-basic',
        tier: 'Basic',
        title: '1. Basic: Value-Returning Task Batch via std::future & std::async',
        banglaNote: '`std::future<long long>` দিয়ে প্রতিটি টাস্কের ফলাফল আইসোলেটেডভাবে সংগ্রহ ও যোগ।',
        code: `#include <future>
#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n = 0;
    if (!(cin >> n)) return 0;
    vector<future<long long>> tasks;
    tasks.reserve(n);
    for (int i = 0; i < n; i++) {
        long long x = 0;
        cin >> x;
        tasks.push_back(async(launch::deferred, [x]() { return x; }));
    }
    long long total = 0;
    for (auto &t : tasks) total += t.get();
    cout << total << "\\n";
    return 0;
}`,
        stdin: '3\n10 20 30',
        expectedOutput: '60',
      },
      {
        id: 'cpp-13-ex-edge',
        tier: 'Edge-Case',
        title: '2. Edge-Case: Empty Task Queue & Capture-by-Value Loop Safety',
        banglaNote: 'লুপ ভ্যারিয়েবল `[&x]`-এর বদলে `[x]` দিয়ে ভ্যালু ক্যাপচার করে ড্যাংলিং রেফারেন্স ঠেকানো।',
        code: `#include <future>
#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n = 0;
    if (!(cin >> n) || n <= 0) {
        cout << 0 << "\\n";
        return 0;
    }
    vector<future<long long>> tasks;
    for (int i = 0; i < n; i++) {
        long long x = 0; cin >> x;
        tasks.push_back(async(launch::deferred, [x]() { return x; }));
    }
    long long total = 0;
    for (auto &t : tasks) total += t.get();
    cout << total << "\\n";
    return 0;
}`,
        stdin: '4\n5 10 15 20',
        expectedOutput: '50',
      },
      {
        id: 'cpp-13-ex-opt',
        tier: 'Optimized',
        title: '3. Optimized: Lock-Free Promise-Future Producer/Consumer Channel',
        banglaNote: '`std::promise` ও `std::future` জুটি ব্যবহার করে সেফ ওয়ান-শট ডেটা পাসিং।',
        code: `#include <future>
#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n = 0; cin >> n;
    vector<promise<long long>> promises(n);
    vector<future<long long>> futures;
    for (int i = 0; i < n; i++) futures.push_back(promises[i].get_future());
    for (int i = 0; i < n; i++) {
        long long x = 0; cin >> x;
        promises[i].set_value(x * 2);
    }
    long long total = 0;
    for (auto &f : futures) total += f.get();
    cout << total << "\\n";
    return 0;
}`,
        stdin: '3\n10 20 30',
        expectedOutput: '120',
      },
      {
        id: 'cpp-13-ex-cp',
        tier: 'CP Trick',
        title: '4. CP Trick: Divide-and-Conquer Parallel-Ready Tree Reduction',
        banglaNote: 'বড় ইনপুটকে অর্ধেক-অর্ধেক করে মার্জ রিডাকশন (Parallel Reduce প্যাটার্ন)।',
        code: `#include <future>
#include <iostream>
#include <vector>
using namespace std;

long long dc_sum(const vector<long long> &a, size_t l, size_t r) {
    if (r - l <= 2) {
        long long s = 0;
        for (size_t i = l; i < r; i++) s += a[i];
        return s;
    }
    size_t mid = l + (r - l) / 2;
    auto right_fut = async(launch::deferred, dc_sum, cref(a), mid, r);
    long long left_val = dc_sum(a, l, mid);
    return left_val + right_fut.get();
}

int main() {
    int n = 0; cin >> n;
    vector<long long> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    cout << dc_sum(a, 0, a.size()) << "\\n";
    return 0;
}`,
        stdin: '4\n5 10 15 20',
        expectedOutput: '50',
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 9',
        codeSnippet: 'vector<future<long long>> tasks;',
        whatItMeans: 'Holds pending result handles for n independent asynchronous tasks.',
        whyItIsThere: 'Decouples work scheduling from result collection.',
        ifDeletedError: 'Cannot store multiple task handles to await later.',
      },
      {
        lineNumber: 'Line 14',
        codeSnippet: 'async(launch::deferred, [x]() { return x; })',
        whatItMeans: 'Creates a lazy future capturing x cleanly by value (no dangling stack ref!).',
        whyItIsThere: 'Executes deterministically on .get() even without OS thread overhead.',
        ifDeletedError: 'Tasks are never created or executed.',
      },
      {
        lineNumber: 'Line 17',
        codeSnippet: 'for (auto &t : tasks) total += t.get();',
        whatItMeans: 'Consumes each future exactly once and reduces results on main.',
        whyItIsThere: 'Guarantees zero data races because main owns total exclusively.',
        ifDeletedError: 'total remains 0.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'Schedule 3 tasks [10,20,30]', memoryOrStack: 'tasks.size() == 3', note: 'Captured by value [x]' },
      { step: 2, state: 'tasks[0].get() -> 10', memoryOrStack: 'total = 10', note: 'Future 0 consumed' },
      { step: 3, state: 'tasks[1].get() -> 20', memoryOrStack: 'total = 30', note: 'Future 1 consumed' },
      { step: 4, state: 'tasks[2].get() -> 30', memoryOrStack: 'total = 60', note: 'Outputs 60' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: Capturing Loop Variable [&x] by Reference Inside Async Lambda',
        brokenCode: 'for (int i = 0; i < n; i++) tasks.push_back(async([&x]() { return x; })); // Dangling ref!',
        fixedCode: 'for (int i = 0; i < n; i++) tasks.push_back(async([x]() { return x; }));',
        whyItBreaks: 'Once the loop advances or exits, `&x` points to overwritten or destroyed stack memory (UB).',
      },
      {
        title: 'Trap 2: Calling .get() Twice on the Same std::future',
        brokenCode: 'cout << fut.get() << fut.get(); // Throws std::future_error!',
        fixedCode: 'auto val = fut.get(); // Store in local variable or use std::shared_future',
        whyItBreaks: 'std::future transfers ownership on the first .get() and becomes invalid afterwards.',
      },
      {
        title: 'Trap 3: Calling mutex.lock() Without RAII std::scoped_lock',
        brokenCode: 'mtx.lock(); process(); mtx.unlock(); // If process() throws, mutex stays locked FOREVER!',
        fixedCode: 'std::scoped_lock lock(mtx); process();',
        whyItBreaks: 'Manual unlock() is skipped on early returns or exceptions, deadlocking all other threads.',
      },
    ],
    practiceSheet: [
      {
        id: 'cpp-ch-13-q1',
        difficulty: 'Easy',
        title: 'Warm-up: Collect n Async Futures',
        prompt: 'Dispatch n futures returning their values and output the sum.',
        banglaHint: '`vector<future<long long>>` থেকে `t.get()` করে যোগফল প্রিন্ট করো।',
        starterCode: `#include <future>
#include <iostream>
#include <vector>
using namespace std;
int main() {
    int n; cin >> n; vector<future<long long>> tasks;
    for (int i = 0; i < n; i++) { long long x; cin >> x; tasks.push_back(async(launch::deferred, [x]() { return x; })); }
    long long total = 0; for (auto &t : tasks) total += t.get();
    cout << total << "\\n";
    return 0;
}`,
        sampleStdin: '3\n10 20 30',
        expectedOutput: '60',
      },
      {
        id: 'cpp-ch-13-q2',
        difficulty: 'Easy',
        title: 'Zero-Task Future Pipeline Guard',
        prompt: 'Handle n = 0 safely and output 0.',
        banglaHint: 'খালি ইনপুটে `0` আউটপুট দাও।',
        starterCode: `#include <iostream>
using namespace std;
int main() {
    int n = 0; if (!(cin >> n) || n <= 0) { cout << 0 << "\\n"; return 0; }
    long long s = 0, x; for (int i = 0; i < n; i++) { cin >> x; s += x; }
    cout << s << "\\n";
    return 0;
}`,
        sampleStdin: '0',
        expectedOutput: '0',
      },
      {
        id: 'cpp-ch-13-q3',
        difficulty: 'Medium',
        title: 'Concurrent Map-Transform via Futures',
        prompt: 'Compute sum of all input task values using deferred futures.',
        banglaHint: 'সব টাস্ক ফিউচার `.get()` করে মোট যোগফল বের করো।',
        starterCode: `#include <future>
#include <iostream>
#include <vector>
using namespace std;
int main() {
    int n; cin >> n; vector<future<long long>> tasks;
    for (int i = 0; i < n; i++) { long long x; cin >> x; tasks.push_back(async(launch::deferred, [x]() { return x; })); }
    long long total = 0; for (auto &t : tasks) total += t.get();
    cout << total << "\\n";
    return 0;
}`,
        sampleStdin: '4\n5 10 15 20',
        expectedOutput: '50',
      },
      {
        id: 'cpp-ch-13-q4',
        difficulty: 'Medium',
        title: 'RAII Lock Scope Simulation',
        prompt: 'Use promise/future pair to compute maximum across n independent workers.',
        banglaHint: '`max` ভ্যালু রিডাকশন লুপে `best = max(best, t.get())` ব্যবহার করো।',
        starterCode: `#include <algorithm>
#include <future>
#include <iostream>
#include <vector>
using namespace std;
int main() {
    int n; cin >> n; vector<future<long long>> tasks;
    for (int i = 0; i < n; i++) { long long x; cin >> x; tasks.push_back(async(launch::deferred, [x]() { return x * 3; })); }
    long long best = 0; for (auto &t : tasks) best = max(best, t.get());
    cout << best << "\\n";
    return 0;
}`,
        sampleStdin: '3\n4 9 6',
        expectedOutput: '27',
      },
      {
        id: 'cpp-ch-13-q5',
        difficulty: 'Hard',
        title: 'Divide-and-Conquer Async Merge Sum',
        prompt: 'Recursively split array into half futures and merge sums.',
        banglaHint: 'দুটি অর্ধেক আলাদা ফিউচারে পাঠিয়ে `left + right.get()` করো।',
        starterCode: `#include <future>
#include <iostream>
#include <vector>
using namespace std;
long long solve(const vector<long long> &a, size_t l, size_t r) {
    if (l == r) return 0;
    if (r - l == 1) return a[l];
    size_t mid = l + (r - l) / 2;
    auto f = async(launch::deferred, solve, cref(a), mid, r);
    return solve(a, l, mid) + f.get();
}
int main() {
    int n; cin >> n; vector<long long> a(n); for (auto &x : a) cin >> x;
    cout << solve(a, 0, a.size()) << "\\n";
    return 0;
}`,
        sampleStdin: '5\n1 2 3 4 5',
        expectedOutput: '15',
      },
    ],
    miniBuild: {
      title: 'C++ Mini Build: Future-Based Telemetry Aggregator',
      description: 'Schedules independent future pipelines and safely reduces total throughput.',
      banglaGoal: 'std::future ব্যবহার করে রেস-মুক্ত টেলিমেট্রি অ্যাগ্রিগেটর তৈরি করা।',
      combinesChapters: 'Ch 1–13',
      starterCode: `#include <future>
#include <iostream>
#include <vector>
using namespace std;
int main() {
    int n; cin >> n; vector<future<long long>> tasks;
    for (int i = 0; i < n; i++) { long long x; cin >> x; tasks.push_back(async(launch::deferred, [x]() { return x; })); }
    long long total = 0; for (auto &t : tasks) total += t.get();
    cout << total << "\\n";
    return 0;
}`,
      sampleStdin: '3\n10 20 30',
      expectedOutput: '60',
    },
  },

  python: {
    title: 'Python Chapter 13 (3.13): asyncio Event Loop, gather(), Coroutines & GIL Mastery',
    banglaTitle: 'Python অধ্যায় ১৩ (3.13): asyncio ইভেন্ট লুপ, gather(), কো-রুটিন ও GIL ধারণা',
    subtitle: 'Run concurrent I/O with async/await & asyncio.gather(), avoid blocking calls inside coroutines, and bound concurrency via Semaphore.',
    zeroIntuition: {
      plainEnglishStory:
        'A chef cooking 3 dishes doesn’t stare at boiling water doing nothing—they start the kettle (`await`), chop onions while it heats, and serve all 3 together! Python **`asyncio`** gives one single-threaded **Event Loop** that switches between thousands of waiting I/O tasks via `await`, running them concurrently with near-zero memory overhead.',
      asciiFlowchart: `  SINGLE-THREADED ASYNCIO EVENT LOOP (Non-Blocking I/O)
  Sequential: [Wait 1s] -> [Wait 1s] -> [Wait 1s] = 3.0s
  asyncio   : [Start A, Start B, Start C -> Event Loop gathers all] = ~1.0s!`,
      pseudocode: [
        '1. DEFINE async def worker(val) returning computed result',
        '2. SCHEDULE all n coroutines together using await asyncio.gather(...)',
        '3. COLLECT returned list in original order',
        '4. REDUCE sum(results) and print',
      ],
      banglaZeroToHero: {
        analogyTitle: 'একজন স্মার্ট বাবুর্চি (Event Loop) বনাম অলসভাবে ভাতের হাঁড়ির দিকে তাকিয়ে থাকা',
        explanation:
          'ধরো তুমি চুলায় পানি বসিয়ে বসে রইলে, পানি ফোটার পর তবেই পেঁয়াজ কাটবে—এটা সিঙ্ক্রোনাস কোড (`time.sleep`)। আর স্মার্ট বাবুর্চি (`async def` + `await`) পানি চুলায় দিয়েই সেই ফাঁকে পেঁয়াজ কাটে, ডিম ভাজে! **`asyncio.gather()`** সবগুলো অপেক্ষমাণ নেটওয়ার্ক/ফাইল কাজকে একসাথে শুরু করে সবচেয়ে কম সময়ে রেজাল্ট নিয়ে আসে।',
        everydayExample:
          '১০টি ওয়েবসাইট স্ক্র্যাপ করতে `requests.get()` দিলে ১০ সেকেন্ড লাগে, কিন্তু `asyncio.gather()` দিয়ে ১ সেকেন্ডেই সবগুলো ডাউনলোড হয়!',
        keyTakeaways: [
          '`async def` ফাংশনকে সরাসরি ডাকলে চলে না—ওটি একটি কো-রুটিন অবজেক্ট দেয়, তাই `await` বা `asyncio.run()` দিতে হয়।',
          '`async def`-এর ভেতর কখনো ব্লকিং `time.sleep()` দেবে না—সব সময় `await asyncio.sleep()` দেবে।',
          'Python-এর **GIL (Global Interpreter Lock)** থাকায় CPU-বাউন্ড কাজের চেয়ে I/O-বাউন্ড কাজে `asyncio` জাদুর মতো কাজ করে।',
        ],
      },
    },
    codeExamples: [
      {
        id: 'py-13-ex-basic',
        tier: 'Basic',
        title: '1. Basic: Concurrent Coroutines With asyncio.gather()',
        banglaNote: '`asyncio.gather()` ব্যবহার করে একসাথে একাধিক কো-রুটিন চালিয়ে মোট যোগফল বের করা।',
        code: `import asyncio
import sys

async def worker(val: int) -> int:
    await asyncio.sleep(0)
    return val

async def main() -> None:
    nums = list(map(int, sys.stdin.read().split()))
    if not nums:
        return
    n = nums[0]
    results = await asyncio.gather(*(worker(x) for x in nums[1:1 + n]))
    print(sum(results))

asyncio.run(main())`,
        stdin: '3\n10 20 30',
        expectedOutput: '60',
      },
      {
        id: 'py-13-ex-edge',
        tier: 'Edge-Case',
        title: '2. Edge-Case: Empty Coroutine Batch & asyncio.TaskGroup Safety',
        banglaNote: 'খালি ইনপুটে সেফ রিটার্ন এবং একের ভেতর অন্য টাস্ক ফেইল করলে নিরাপদ হ্যান্ডলিং।',
        code: `import asyncio
import sys

async def job(x: int) -> int:
    return x

async def main() -> None:
    nums = list(map(int, sys.stdin.read().split()))
    n = nums[0] if nums else 0
    if n <= 0:
        print(0)
        return
    res = await asyncio.gather(*(job(x) for x in nums[1:1 + n]))
    print(sum(res))

asyncio.run(main())`,
        stdin: '4\n5 10 15 20',
        expectedOutput: '50',
      },
      {
        id: 'py-13-ex-opt',
        tier: 'Optimized',
        title: '3. Optimized: Rate-Limited Concurrency With asyncio.Semaphore',
        banglaNote: '`asyncio.Semaphore(2)` দিয়ে একসাথে সর্বোচ্চ ২টি ওয়ার্কার চালিয়ে API সার্ভার ওভারলোড ঠেকানো।',
        code: `import asyncio
import sys

async def limited_worker(sem: asyncio.Semaphore, x: int) -> int:
    async with sem:
        await asyncio.sleep(0)
        return x * x

async def main() -> None:
    nums = list(map(int, sys.stdin.read().split()))
    n = nums[0]
    sem = asyncio.Semaphore(2)
    vals = await asyncio.gather(*(limited_worker(sem, x) for x in nums[1:1 + n]))
    print(sum(vals))

asyncio.run(main())`,
        stdin: '3\n2 3 4',
        expectedOutput: '29',
      },
      {
        id: 'py-13-ex-cp',
        tier: 'CP Trick',
        title: '4. CP Trick: Timeout Protection With asyncio.wait_for()',
        banglaNote: 'হ্যাং করা নেটওয়ার্ক রিকোয়েস্ট `asyncio.wait_for(..., timeout=...)` দিয়ে দ্রুত ক্যানসেল করা।',
        code: `import asyncio
import sys

async def fetch_val(x: int) -> int:
    await asyncio.sleep(0)
    return x

async def safe_fetch(x: int) -> int:
    try:
        return await asyncio.wait_for(fetch_val(x), timeout=0.5)
    except asyncio.TimeoutError:
        return 0

async def main() -> None:
    nums = list(map(int, sys.stdin.read().split()))
    out = await asyncio.gather(*(safe_fetch(x) for x in nums[1:1 + nums[0]]))
    print(sum(out))

asyncio.run(main())`,
        stdin: '3\n10 20 30',
        expectedOutput: '60',
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 4',
        codeSnippet: 'async def worker(val: int) -> int:',
        whatItMeans: 'Declares an asynchronous coroutine function rather than an ordinary blocking function.',
        whyItIsThere: 'Allows pausing at `await` points so the event loop can schedule other jobs.',
        ifDeletedError: '`await worker()` raises TypeError: object int cannot be used in await expression.',
      },
      {
        lineNumber: 'Line 13',
        codeSnippet: 'results = await asyncio.gather(*(worker(x) for x in ...))',
        whatItMeans: 'Unpacks generator of n coroutines and awaits all of them concurrently.',
        whyItIsThere: 'Runs all n tasks overlapping instead of sequentially one-by-one.',
        ifDeletedError: 'Tasks run slowly one after another or never get awaited.',
      },
      {
        lineNumber: 'Line 16',
        codeSnippet: 'asyncio.run(main())',
        whatItMeans: 'Creates a clean Event Loop, runs `main()` to completion, and closes the loop.',
        whyItIsThere: 'Top-level Python scripts cannot `await` directly outside `async def`.',
        ifDeletedError: 'Nothing runs! Python exits silently without invoking `main()`.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'asyncio.run(main()) boots loop', memoryOrStack: 'nums = [3, 10, 20, 30]', note: 'Event loop active' },
      { step: 2, state: 'gather spawns 3 coroutines', memoryOrStack: 'worker(10), worker(20), worker(30)', note: 'All queued concurrently' },
      { step: 3, state: 'All yield & resume via loop', memoryOrStack: 'results = [10, 20, 30]', note: 'Order preserved by gather!' },
      { step: 4, state: 'print(sum(results))', memoryOrStack: 'stdout = 60', note: 'Event loop closes cleanly' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: Calling time.sleep() Inside an Async Coroutine',
        brokenCode: 'async def bad(): time.sleep(2) # Freezes the ENTIRE event loop!',
        fixedCode: 'async def good(): await asyncio.sleep(2)',
        whyItBreaks: 'time.sleep() blocks the single OS thread running the loop, stalling every concurrent request.',
      },
      {
        title: 'Trap 2: Forgetting await Before Coroutine Call',
        brokenCode: 'res = worker(10) # Returns <coroutine object>, NOT 10!',
        fixedCode: 'res = await worker(10)',
        whyItBreaks: 'Calling an async def only builds the coroutine object; awaiting schedules its execution.',
      },
      {
        title: 'Trap 3: Sequential await Inside a Loop Instead of gather()',
        brokenCode: 'for x in items: results.append(await fetch(x)) # Runs 100% sequentially!',
        fixedCode: 'results = await asyncio.gather(*(fetch(x) for x in items))',
        whyItBreaks: 'Awaiting inside a loop waits for item i to finish before item i+1 even starts.',
      },
    ],
    practiceSheet: [
      {
        id: 'py-ch-13-q1',
        difficulty: 'Easy',
        title: 'Warm-up: Concurrent gather() Sum',
        prompt: 'Use asyncio.gather to execute n worker coroutines and print their sum.',
        banglaHint: '`await asyncio.gather(...)` থেকে পাওয়া লিস্টের `sum()` প্রিন্ট করো।',
        starterCode: `import asyncio, sys
async def worker(v: int) -> int: return v
async def main() -> None:
    nums = list(map(int, sys.stdin.read().split()))
    res = await asyncio.gather(*(worker(x) for x in nums[1:1 + nums[0]]))
    print(sum(res))
asyncio.run(main())`,
        sampleStdin: '3\n10 20 30',
        expectedOutput: '60',
      },
      {
        id: 'py-ch-13-q2',
        difficulty: 'Easy',
        title: 'Async Empty Guard',
        prompt: 'Ensure empty task list (n = 0) prints 0 safely.',
        banglaHint: '`n == 0` হলে নিরাপদে `0` প্রিন্ট করো।',
        starterCode: `import asyncio, sys
async def main() -> None:
    nums = list(map(int, sys.stdin.read().split()))
    n = nums[0] if nums else 0
    print(0 if n <= 0 else sum(nums[1:1 + n]))
asyncio.run(main())`,
        sampleStdin: '0',
        expectedOutput: '0',
      },
      {
        id: 'py-ch-13-q3',
        difficulty: 'Medium',
        title: 'Concurrent Batch Transform With asyncio.gather',
        prompt: 'Await all n workers concurrently and output total.',
        banglaHint: '`gather` প্যারামিটারে স্টার (`*`) আনপ্যাকিং ব্যবহার করো।',
        starterCode: `import asyncio, sys
async def worker(v: int) -> int:
    await asyncio.sleep(0)
    return v
async def main() -> None:
    nums = list(map(int, sys.stdin.read().split()))
    res = await asyncio.gather(*(worker(x) for x in nums[1:1 + nums[0]]))
    print(sum(res))
asyncio.run(main())`,
        sampleStdin: '4\n5 10 15 20',
        expectedOutput: '50',
      },
      {
        id: 'py-ch-13-q4',
        difficulty: 'Medium',
        title: 'Semaphore-Bounded Worker Pool',
        prompt: 'Limit concurrent execution to 2 slots via asyncio.Semaphore(2) and find max.',
        banglaHint: '`async with sem:` দিয়ে কনকারেন্ট সংখ্যা সীমিত করো।',
        starterCode: `import asyncio, sys
async def run(sem: asyncio.Semaphore, x: int) -> int:
    async with sem: return x * 2
async def main() -> None:
    nums = list(map(int, sys.stdin.read().split()))
    sem = asyncio.Semaphore(2)
    res = await asyncio.gather(*(run(sem, x) for x in nums[1:1 + nums[0]]))
    print(max(res))
asyncio.run(main())`,
        sampleStdin: '3\n4 9 6',
        expectedOutput: '18',
      },
      {
        id: 'py-ch-13-q5',
        difficulty: 'Hard',
        title: 'Producer-Consumer asyncio.Queue Pipeline',
        prompt: 'Push n items into asyncio.Queue, consume with two workers, and emit processed sum.',
        banglaHint: '`asyncio.Queue` তে এনকিউ ও সেন্টিনেল `None` দিয়ে ওয়ার্কার বন্ধ করো।',
        starterCode: `import asyncio, sys
async def main() -> None:
    nums = list(map(int, sys.stdin.read().split()))
    q: asyncio.Queue[int | None] = asyncio.Queue()
    for x in nums[1:1 + nums[0]]: await q.put(x)
    await q.put(None)
    total = 0
    while True:
        item = await q.get()
        if item is None: break
        total += item * item
    print(total)
asyncio.run(main())`,
        sampleStdin: '3\n2 3 4',
        expectedOutput: '29',
      },
    ],
    miniBuild: {
      title: 'Python Mini Build: Async Multi-Endpoint Aggregator',
      description: 'Runs concurrent asyncio coroutines via gather() and computes verified totals.',
      banglaGoal: 'Python asyncio.gather() দিয়ে দ্রুত কনকারেন্ট টাস্ক অ্যাগ্রিগেটর তৈরি করা।',
      combinesChapters: 'Ch 1–13',
      starterCode: `import asyncio, sys
async def worker(v: int) -> int: return v
async def main() -> None:
    nums = list(map(int, sys.stdin.read().split()))
    res = await asyncio.gather(*(worker(x) for x in nums[1:1 + nums[0]]))
    print(sum(res))
asyncio.run(main())`,
      sampleStdin: '3\n10 20 30',
      expectedOutput: '60',
    },
  },

  java: {
    title: 'Java Chapter 13 (Java 21): CompletableFuture, Parallel Streams & Thread-Safe Concurrency',
    banglaTitle: 'Java অধ্যায় ১৩ (Java 21): CompletableFuture, প্যারালাল স্ট্রিম ও থ্রেড-সেফটি',
    subtitle: 'Orchestrate non-blocking async pipelines with CompletableFuture.supplyAsync, parallelStream reductions, and AtomicLong safety.',
    zeroIntuition: {
      plainEnglishStory:
        'Java 21 modern concurrency avoids raw `new Thread()` boilerplate. **`parallelStream()`** splits data across the JVM ForkJoinPool automatically, while **`CompletableFuture`** chains async network/DB steps cleanly (`supplyAsync -> thenApply -> join`). Always reduce into immutable return values or `AtomicLong`—never unsynchronized shared lists!',
      asciiFlowchart: `  JAVA 21 CONCURRENCY PIPELINE
  items.parallelStream() -> ForkJoinPool splits across CPU cores -> .sum() (race-free!)
  CompletableFuture.supplyAsync(...) -> .thenApply(...) -> .join()`,
      pseudocode: [
        '1. PARSE n task integers into List<Long> items',
        '2. EXECUTE items.parallelStream().mapToLong(Long::longValue).sum()',
        '3. MERGE thread-local partial sums automatically inside stream reduction',
        '4. PRINT total',
      ],
      banglaZeroToHero: {
        analogyTitle: 'ফ্যাক্টরি কনভেয়র বেল্ট (CompletableFuture) ও বহু-লাইন ক্যালকুলেশন (parallelStream)',
        explanation:
          'Java-তে ১ লাখ সংখ্যার হিসাব একা না করে `.parallelStream()` ডাকলে JVM নিজেই কাজকে আপনার CPU-এর সবগুলো কোরে সমান ভাগে ভাগ করে দেয় এবং শেষে রেজাল্ট একসাথে জোড়া লাগায়! আর **`CompletableFuture`** হলো ধাপে ধাপে অ্যাসিঙ্ক অর্ডার প্রসেসিং (`পেমেন্ট চেক -> ইনভয়েস -> ইমেইল`)।',
        everydayExample:
          'বড় ই-কমার্স চেকআউটে ইউজার প্রোফাইল, স্টক ও ডিসকাউন্ট একসাথে `CompletableFuture.allOf()` দিয়ে ফেচ করা।',
        keyTakeaways: [
          'শেয়ার্ড `ArrayList`-এ কখনো `parallelStream().forEach(list::add)` করবে না—`ConcurrentModificationException` বা ডেটা লস হবে!',
          'সব সময় `.map(...).sum()` বা `.collect(Collectors.toList())` এর মতো নির্ভুল রিডাকশন ব্যবহার করবে।',
          'কাউন্টার বাড়াতে হলে `long` এর বদলে `AtomicLong` বা `LongAdder` ব্যবহার করো।',
        ],
      },
    },
    codeExamples: [
      {
        id: 'java-13-ex-basic',
        tier: 'Basic',
        title: '1. Basic: Parallel ForkJoin Stream Reduction',
        banglaNote: '`parallelStream().mapToLong(...).sum()` দিয়ে মাল্টি-কোর ওয়ার্কার রিডাকশন।',
        code: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        List<Long> items = new ArrayList<>();
        for (int i = 0; i < n; i++) items.add(sc.nextLong());
        long total = items.parallelStream().mapToLong(Long::longValue).sum();
        System.out.println(total);
    }
}`,
        stdin: '3\n10 20 30',
        expectedOutput: '60',
      },
      {
        id: 'java-13-ex-edge',
        tier: 'Edge-Case',
        title: '2. Edge-Case: Empty Parallel Stream Guard',
        banglaNote: 'খালি ব্যাচ (`n = 0`) দিলে `NoSuchElementException` ছাড়াই `0` প্রিন্ট।',
        code: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.hasNextInt() ? sc.nextInt() : 0;
        List<Long> items = new ArrayList<>();
        for (int i = 0; i < n; i++) items.add(sc.nextLong());
        long total = items.parallelStream().mapToLong(Long::longValue).sum();
        System.out.println(total);
    }
}`,
        stdin: '4\n5 10 15 20',
        expectedOutput: '50',
      },
      {
        id: 'java-13-ex-opt',
        tier: 'Optimized',
        title: '3. Optimized: CompletableFuture Async Fan-Out / Fan-In',
        banglaNote: 'প্রতিটি টাস্ক `CompletableFuture.supplyAsync` দিয়ে চালিয়ে `.join()` করে মার্জ করা।',
        code: `import java.util.*;
import java.util.concurrent.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        List<CompletableFuture<Long>> futures = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            long x = sc.nextLong();
            futures.add(CompletableFuture.supplyAsync(() -> x * 2));
        }
        long total = futures.stream().mapToLong(CompletableFuture::join).sum();
        System.out.println(total);
    }
}`,
        stdin: '3\n10 20 30',
        expectedOutput: '120',
      },
      {
        id: 'java-13-ex-cp',
        tier: 'CP Trick',
        title: '4. CP Trick: Contention-Free AtomicLong Reduction',
        banglaNote: '`AtomicLong` ব্যবহার করে লক ছাড়াই নিরাপদ মাল্টি-থ্রেড কনকারেন্ট একুমুলেশন।',
        code: `import java.util.*;
import java.util.concurrent.atomic.AtomicLong;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        List<Long> items = new ArrayList<>();
        for (int i = 0; i < n; i++) items.add(sc.nextLong());
        AtomicLong total = new AtomicLong(0);
        items.parallelStream().forEach(x -> total.addAndGet(x * x));
        System.out.println(total.get());
    }
}`,
        stdin: '3\n2 3 4',
        expectedOutput: '29',
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 9',
        codeSnippet: 'long total = items.parallelStream().mapToLong(Long::longValue).sum();',
        whatItMeans: 'Splits items across the JVM ForkJoinPool and reduces partial sums safely.',
        whyItIsThere: 'Eliminates manual Thread[], Runnable, and synchronization locks.',
        ifDeletedError: 'Compile error: variable total might not have been initialized.',
      },
      {
        lineNumber: 'Line 10',
        codeSnippet: 'CompletableFuture.supplyAsync(() -> x * 2)',
        whatItMeans: 'Dispatches an asynchronous task returning a Long value.',
        whyItIsThere: 'Lets slow I/O or independent tasks execute concurrently.',
        ifDeletedError: 'No async tasks are submitted.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'Read items = [10, 20, 30]', memoryOrStack: 'List<Long> size 3', note: 'Main thread reads stdin' },
      { step: 2, state: 'ForkJoinPool splits batch', memoryOrStack: 'Workers process [10], [20], [30]', note: 'Zero shared mutation' },
      { step: 3, state: 'Stream reduction merges partials', memoryOrStack: 'total = 60', note: 'Thread-safe sum' },
      { step: 4, state: 'println(60)', memoryOrStack: 'Exit 0', note: 'Clean completion' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: Mutating Non-Thread-Safe ArrayList Inside parallelStream()',
        brokenCode: 'List<Long> out = new ArrayList<>();\nitems.parallelStream().forEach(x -> out.add(x)); // Race condition + crashes!',
        fixedCode: 'List<Long> out = items.parallelStream().collect(Collectors.toList());',
        whyItBreaks: 'ArrayList.add() has no synchronization; concurrent writes overwrite slots or corrupt size.',
      },
      {
        title: 'Trap 2: Blocking Calls Inside Common ForkJoinPool',
        brokenCode: 'items.parallelStream().forEach(url -> blockingHttp(url)); // Starves ALL parallelStreams!',
        fixedCode: '// Use CompletableFuture.supplyAsync(fn, customExecutor) with dedicated thread pool.',
        whyItBreaks: 'parallelStream shares one global ForkJoinPool across the entire JVM.',
      },
      {
        title: 'Trap 3: Calling ExecutorService Without shutdown()',
        brokenCode: 'ExecutorService pool = Executors.newFixedThreadPool(4); // JVM never exits!',
        fixedCode: 'try (ExecutorService pool = Executors.newVirtualThreadPerTaskExecutor()) { ... }',
        whyItBreaks: 'Non-daemon worker threads keep the JVM process alive indefinitely unless closed.',
      },
    ],
    practiceSheet: [
      {
        id: 'java-ch-13-q1',
        difficulty: 'Easy',
        title: 'Warm-up: Parallel Stream Sum',
        prompt: 'Compute sum of n items via parallelStream().',
        banglaHint: '`items.parallelStream().mapToLong(Long::longValue).sum()` ব্যবহার করো।',
        starterCode: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt(); List<Long> items = new ArrayList<>();
        for (int i = 0; i < n; i++) items.add(sc.nextLong());
        System.out.println(items.parallelStream().mapToLong(Long::longValue).sum());
    }
}`,
        sampleStdin: '3\n10 20 30',
        expectedOutput: '60',
      },
      {
        id: 'java-ch-13-q2',
        difficulty: 'Easy',
        title: 'Empty Batch Parallel Guard',
        prompt: 'Ensure empty input (n = 0) outputs 0 cleanly.',
        banglaHint: '`n == 0` হলে স্ট্রিম `0` দেয়।',
        starterCode: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.hasNextInt() ? sc.nextInt() : 0; List<Long> items = new ArrayList<>();
        for (int i = 0; i < n; i++) items.add(sc.nextLong());
        System.out.println(items.parallelStream().mapToLong(Long::longValue).sum());
    }
}`,
        sampleStdin: '0',
        expectedOutput: '0',
      },
      {
        id: 'java-ch-13-q3',
        difficulty: 'Medium',
        title: 'CompletableFuture Pipeline Sum',
        prompt: 'Collect n CompletableFuture tasks and output merged total.',
        banglaHint: '`CompletableFuture.supplyAsync(() -> x)` তালিকার ওপর `.join()` চালাও।',
        starterCode: `import java.util.*;
import java.util.concurrent.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt(); List<CompletableFuture<Long>> futs = new ArrayList<>();
        for (int i = 0; i < n; i++) { long x = sc.nextLong(); futs.add(CompletableFuture.supplyAsync(() -> x)); }
        System.out.println(futs.stream().mapToLong(CompletableFuture::join).sum());
    }
}`,
        sampleStdin: '4\n5 10 15 20',
        expectedOutput: '50',
      },
      {
        id: 'java-ch-13-q4',
        difficulty: 'Medium',
        title: 'AtomicLong Max/Square Accumulator',
        prompt: 'Compute sum of squares safely into an AtomicLong.',
        banglaHint: '`AtomicLong.addAndGet(x * x)` দিয়ে ডেটা-রেসমুক্ত আপডেট করো।',
        starterCode: `import java.util.*;
import java.util.concurrent.atomic.AtomicLong;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt(); List<Long> items = new ArrayList<>();
        for (int i = 0; i < n; i++) items.add(sc.nextLong());
        AtomicLong acc = new AtomicLong(0);
        items.parallelStream().forEach(x -> acc.addAndGet(x * x));
        System.out.println(acc.get());
    }
}`,
        sampleStdin: '3\n2 3 4',
        expectedOutput: '29',
      },
      {
        id: 'java-ch-13-q5',
        difficulty: 'Hard',
        title: 'Chained CompletableFuture Exception Recovery',
        prompt: 'Parse task integers and use exceptionally(e -> 0L) fallback on malformed tokens.',
        banglaHint: 'অবৈধ টোকেনের জন্য `try/catch` বা `.exceptionally()` দিয়ে `0L` ফলব্যাক দাও।',
        starterCode: `import java.util.*;
import java.util.concurrent.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt(); List<CompletableFuture<Long>> futs = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            String tok = sc.next();
            futs.add(CompletableFuture.supplyAsync(() -> Long.parseLong(tok)).exceptionally(e -> 0L));
        }
        System.out.println(futs.stream().mapToLong(CompletableFuture::join).sum());
    }
}`,
        sampleStdin: '4\n10 bad 20 30',
        expectedOutput: '60',
      },
    ],
    miniBuild: {
      title: 'Java Mini Build: Parallel ForkJoin Telemetry Merger',
      description: 'Processes concurrent job streams cleanly with zero manual locking.',
      banglaGoal: 'Java 21 parallelStream ব্যবহার করে নিরাপদ টেলিমেট্রি মার্জার তৈরি করা।',
      combinesChapters: 'Ch 1–13',
      starterCode: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt(); List<Long> items = new ArrayList<>();
        for (int i = 0; i < n; i++) items.add(sc.nextLong());
        System.out.println(items.parallelStream().mapToLong(Long::longValue).sum());
    }
}`,
      sampleStdin: '3\n10 20 30',
      expectedOutput: '60',
    },
  },

  javascript: {
    title: 'JavaScript Chapter 13 (ES2025): Event Loop, Microtask Queue, Promises & Task Scheduling',
    banglaTitle: 'JavaScript অধ্যায় ১৩ (ES2025): ইভেন্ট লুপ, মাইক্রোটাস্ক কিউ, প্রমিস ও টাস্ক শিডিউলিং',
    subtitle: 'Understand Call Stack -> Microtask Queue -> Macrotask Queue ordering, cooperative job schedulers, and Promise.allSettled patterns.',
    zeroIntuition: {
      plainEnglishStory:
        'JavaScript is **single-threaded**, yet powers smooth UIs and thousands of concurrent API calls thanks to the **Event Loop**! Every async operation goes into a queue: synchronous Call Stack finishes first, then ALL **Microtasks** (`Promise.then` / `queueMicrotask`) drain completely before the next **Macrotask** (`setTimeout` / UI paint) runs.',
      asciiFlowchart: `  JS EVENT LOOP PRIORITY ORDER
  1. [ CALL STACK ]       (Runs synchronously to completion first)
  2. [ MICROTASK QUEUE ]  (Promise.then / await -> drains 100% BEFORE next timer!)
  3. [ MACROTASK QUEUE ]  (setTimeout / I/O callback -> 1 per tick)`,
      pseudocode: [
        '1. ENQUEUE incoming async jobs into a deterministic Task Scheduler queue',
        '2. EXECUTE Microtask priority batch before Macrotask batch',
        '3. MERGE settled task values cleanly without racing UI state',
        '4. LOG verified aggregated output',
      ],
      banglaZeroToHero: {
        analogyTitle: 'ভিআইপি লাইন (Microtask Queue) বনাম সাধারণ লাইন (Macrotask / setTimeout)',
        explanation:
          'JS-এ একজন মাত্র ওয়েটার (Single Thread)। প্রথমে সে হাতের কাজ (Call Stack) শেষ করে। তারপর সাধারণ অর্ডার (`setTimeout`) নেওয়ার আগেই সে ভিআইপি লাইন (**Microtask / Promise.then**) পুরোপুরি খালি করে! এই জন্যই `setTimeout(..., 0)`-এর আগেই `Promise.resolve().then(...)` রান হয়।',
        everydayExample:
          'React অ্যাপে এক ক্লিকে User, Notification ও Cart তিনটি API কল একসাথে পাঠাতে `Promise.all` ব্যবহার করা—সবকটি ফিরলে তবেই লোডিং স্পিনার বন্ধ হয়!',
        keyTakeaways: [
          'ইন্টারভিউয়ের সবচেয়ে কমন প্রশ্ন: `Sync` -> `Promise.then (Microtask)` -> `setTimeout (Macrotask)`।',
          'একটি প্রমিস ফেইল করলেও বাকিগুলোর রেজাল্ট ধরে রাখতে `Promise.all` এর বদলে **`Promise.allSettled`** ব্যবহার করবে।',
          'পুরনো ইনপুট টাইপিংয়ের ফেচ বাতিল করতে **`AbortController`** ব্যবহার না করলে Race Condition হয়!',
        ],
      },
    },
    codeExamples: [
      {
        id: 'js-13-ex-basic',
        tier: 'Basic',
        title: '1. Basic: Deterministic Cooperative Task Batch Reducer',
        banglaNote: 'কাজের ব্যাচ কিউ করে স্টেট-রেস ছাড়া আইসোলেটেড ওয়ার্কার রিডাকশন।',
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const nums = raw.trim().split(/\\s+/).map(Number);
const n = nums[0] || 0;
const tasks = nums.slice(1, 1 + n).map((val, idx) => () => ({ id: idx, val }));
const settled = tasks.map((run) => run());
const total = settled.reduce((acc, item) => acc + item.val, 0);
console.log(total);`,
        stdin: '3\n10 20 30',
        expectedOutput: '60',
      },
      {
        id: 'js-13-ex-edge',
        tier: 'Edge-Case',
        title: '2. Edge-Case: allSettled-Style Fault-Tolerant Batch Recovery',
        banglaNote: 'কোনো টাস্কে NaN বা এরর এলে পুরো ব্যাচ ক্র্যাশ না করে `rejected` ধরে নিরাপদ যোগফল।',
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const tokens = raw.trim().split(/\\s+/);
const n = Number(tokens[0] || 0);
const outcomes = tokens.slice(1, 1 + n).map((t) => {
  const num = Number(t);
  return Number.isFinite(num) ? { status: 'fulfilled', value: num } : { status: 'rejected', reason: 'bad' };
});
const total = outcomes.reduce((s, r) => s + (r.status === 'fulfilled' ? r.value : 0), 0);
console.log(total);`,
        stdin: '4\n10 bad 20 30',
        expectedOutput: '60',
      },
      {
        id: 'js-13-ex-opt',
        tier: 'Optimized',
        title: '3. Optimized: Event-Loop Microtask vs Macrotask Priority Scheduler',
        banglaNote: 'ব্রাউজারের ইভেন্ট লুপ কীভাবে Sync -> Microtask -> Macrotask ক্রমে কাজ চালায় তার সিমুলেশন।',
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const items = raw.trim().split(/\\s+/).slice(1);
const microQueue = [];
const macroQueue = [];
const log = ['sync'];
for (const tag of items) {
  if (tag.startsWith('micro:')) microQueue.push(tag);
  else macroQueue.push(tag);
}
while (microQueue.length) log.push(microQueue.shift());
while (macroQueue.length) log.push(macroQueue.shift());
console.log(log.join(' -> '));`,
        stdin: '3\nmacro:timer micro:promise micro:await',
        expectedOutput: 'sync -> micro:promise -> micro:await -> macro:timer',
      },
      {
        id: 'js-13-ex-cp',
        tier: 'CP Trick',
        title: '4. CP Trick: Latest-Request-Wins Cancellation Token (Anti-Stale Race)',
        banglaNote: 'সার্চ টাইপিংয়ে পুরনো ধীর রেসপন্স বাতিল করে শুধু সর্বশেষ রিকোয়েস্ট গ্রহণ (AbortController প্যাটার্ন)।',
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const events = raw.trim().split(/\\s+/).slice(1); // format: reqId:payload
let latestSeq = 0;
let uiState = 'idle';
for (const ev of events) {
  const [seqStr, val] = ev.split(':');
  const seq = Number(seqStr);
  if (seq >= latestSeq) { latestSeq = seq; uiState = val; }
}
console.log(uiState);`,
        stdin: '3\n2:newest 1:stale_slow 3:final',
        expectedOutput: 'final',
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 5',
        codeSnippet: 'const tasks = nums.slice(1, 1 + n).map((val, idx) => () => ({ id: idx, val }));',
        whatItMeans: 'Wraps each input payload inside an isolated thunk/closure task.',
        whyItIsThere: 'Prevents tasks from sharing or mutating each other’s input payload.',
        ifDeletedError: 'Tasks array is missing.',
      },
      {
        lineNumber: 'Line 6',
        codeSnippet: 'const settled = tasks.map((run) => run());',
        whatItMeans: 'Dispatches all scheduled tasks and collects deterministic result objects.',
        whyItIsThere: 'Mirrors Promise.all fan-out resolution cleanly.',
        ifDeletedError: 'Cannot reduce results.',
      },
      {
        lineNumber: 'Line 7',
        codeSnippet: 'const total = settled.reduce((acc, item) => acc + item.val, 0);',
        whatItMeans: 'Reduces settled payloads once after all tasks finish.',
        whyItIsThere: 'Single reduction step avoids out-of-order UI/state corruption.',
        ifDeletedError: 'Total is never computed.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'Parse n=3, nums=[10,20,30]', memoryOrStack: '3 task closures queued', note: 'Isolated inputs' },
      { step: 2, state: 'Execute tasks[0..2]', memoryOrStack: 'settled=[{0,10},{1,20},{2,30}]', note: 'Order preserved' },
      { step: 3, state: 'Reduce total = 10+20+30', memoryOrStack: 'total = 60', note: 'Zero race conditions' },
      { step: 4, state: 'console.log(60)', memoryOrStack: 'stdout: 60', note: 'Complete' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: One Rejected Promise Crashing Whole Promise.all()',
        brokenCode: 'await Promise.all([okFetch(), failingFetch()]); // Discards ALL data!',
        fixedCode: 'const res = await Promise.allSettled([okFetch(), failingFetch()]);',
        whyItBreaks: 'Promise.all fails fast on the first rejection, throwing away successful responses.',
      },
      {
        title: 'Trap 2: Stale Search Results Overwriting Newer Keystrokes',
        brokenCode: 'fetch(q).then(data => setResults(data)); // Slow req #1 arrives AFTER fast req #2!',
        fixedCode: '// Pass an AbortController().signal to fetch() and abort previous controller on each keystroke.',
        whyItBreaks: 'Network latency varies randomly; response arrival order is NOT request order.',
      },
      {
        title: 'Trap 3: Blocking the Single Thread With O(N^2) Loop During UI Input',
        brokenCode: 'while (Date.now() < start + 3000) {} // Freezes clicks, scroll & animations!',
        fixedCode: '// Yield chunks via queueMicrotask / requestAnimationFrame or offload heavy CPU work to Web Workers.',
        whyItBreaks: 'JavaScript executes UI painting and callbacks on the same main thread.',
      },
    ],
    practiceSheet: [
      {
        id: 'js-ch-13-q1',
        difficulty: 'Easy',
        title: 'Warm-up: Task Batch Sum Reduction',
        prompt: 'Schedule n task callbacks, run them cleanly, and log total sum.',
        banglaHint: 'সব টাস্ক রেজাল্ট `.reduce()` দিয়ে যোগ করে লগ করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const nums = raw.trim().split(/\\s+/).map(Number);
const res = nums.slice(1, 1 + nums[0]).map((x) => (() => x)());
console.log(res.reduce((a, b) => a + b, 0));`,
        sampleStdin: '3\n10 20 30',
        expectedOutput: '60',
      },
      {
        id: 'js-ch-13-q2',
        difficulty: 'Easy',
        title: 'Empty Queue Zero Guard',
        prompt: 'Ensure empty task list (n = 0) outputs 0.',
        banglaHint: '`n === 0` হলে নিরাপদে `0` প্রিন্ট করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const nums = raw.trim().split(/\\s+/).map(Number);
const n = nums[0] || 0;
console.log(n <= 0 ? 0 : nums.slice(1, 1 + n).reduce((a, b) => a + b, 0));`,
        sampleStdin: '0',
        expectedOutput: '0',
      },
      {
        id: 'js-ch-13-q3',
        difficulty: 'Medium',
        title: 'Fault-Tolerant Settled Task Collector',
        prompt: 'Sum numeric payloads while safely skipping invalid ("ERR") entries.',
        banglaHint: '`Number.isFinite` চেক করে শুধু বৈধ ফলাফল যোগ করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const tok = raw.trim().split(/\\s+/);
const res = tok.slice(1, 1 + Number(tok[0])).map(Number).filter(Number.isFinite);
console.log(res.reduce((a, b) => a + b, 0));`,
        sampleStdin: '4\n5 10 ERR 35',
        expectedOutput: '50',
      },
      {
        id: 'js-ch-13-q4',
        difficulty: 'Medium',
        title: 'Microtask Before Macrotask Ordering',
        prompt: 'Output ordered execution log: sync first, all micro:* next, then macro:* last.',
        banglaHint: 'মাইক্রোটাস্ক কিউ শেষ করে তবেই ম্যাক্রোটাস্ক কিউ রান করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const jobs = raw.trim().split(/\\s+/).slice(1);
const micro = jobs.filter((j) => j.startsWith('micro:'));
const macro = jobs.filter((j) => j.startsWith('macro:'));
console.log(['sync', ...micro, ...macro].join(' -> '));`,
        sampleStdin: '3\nmacro:t1 micro:p1 macro:t2',
        expectedOutput: 'sync -> micro:p1 -> macro:t1 -> macro:t2',
      },
      {
        id: 'js-ch-13-q5',
        difficulty: 'Hard',
        title: 'Bounded Concurrency Worker Window',
        prompt: 'Process n jobs with concurrency limit 2 and output max batch completion time.',
        banglaHint: 'দুটি ওয়ার্কার স্লট `[w0, w1]` নিয়ে সব সময় ছোটটির ওপর পরের জব চাপাও।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const jobs = raw.trim().split(/\\s+/).map(Number).slice(1);
let w0 = 0, w1 = 0;
for (const d of jobs) { if (w0 <= w1) w0 += d; else w1 += d; }
console.log(Math.max(w0, w1));`,
        sampleStdin: '4\n3 5 2 4',
        expectedOutput: '9',
      },
    ],
    miniBuild: {
      title: 'JavaScript Mini Build: Event-Loop Task & Settled Reducer',
      description: 'Schedules task callbacks cleanly and emits race-free aggregated results.',
      banglaGoal: 'JS ইভেন্ট-লুপ ও টাস্ক রিডাকশন মডেল দিয়ে নিরাপদ অ্যাসিঙ্ক প্রসেসর বানানো।',
      combinesChapters: 'Ch 1–13',
      starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const nums = raw.trim().split(/\\s+/).map(Number);
const tasks = nums.slice(1, 1 + nums[0]).map((x) => () => x);
console.log(tasks.map((fn) => fn()).reduce((a, b) => a + b, 0));`,
      sampleStdin: '3\n10 20 30',
      expectedOutput: '60',
    },
  },

  rust: {
    title: 'Rust Chapter 13 (2024): Fearless Concurrency, std::thread, Channels & Send/Sync',
    banglaTitle: 'Rust অধ্যায় ১৩ (2024): নির্ভীক কনকারেন্সি, থ্রেড, চ্যানেল ও Send/Sync সেফটি',
    subtitle: 'Prevent data races at compile time via ownership transfer (move), std::thread::spawn, and message-passing mpsc channels.',
    zeroIntuition: {
      plainEnglishStory:
        'Other languages let you ship a data race to production and pray. Rust’s compiler refuses to even COMPILE a data race (**Fearless Concurrency**)! When you pass data into `thread::spawn(move || ...)`, Rust either transfers ownership cleanly, enforces read-only sharing (`Arc<T>`), or requires thread-safe `Mutex<T>` locking.',
      asciiFlowchart: `  RUST FEARLESS CONCURRENCY
  thread::spawn(move || x)   -> Compiler proves NO aliasing across threads!
  mpsc::channel()            -> "Do not share memory to communicate;
                                 communicate by sending messages!"`,
      pseudocode: [
        '1. PARSE n task integers into Vec<i64>',
        '2. SPAWN std::thread::spawn(move || x) returning JoinHandle<i64>',
        '3. JOIN each handle cleanly via h.join().unwrap()',
        '4. SUM results and print',
      ],
      banglaZeroToHero: {
        analogyTitle: 'বিল্ডিংয়ের আগে কম্পাইলার ইঞ্জিনিয়ারের সেফটি চেক (Fearless Concurrency)',
        explanation:
          'C/C++ বা Java-তে দুটি থ্রেড একই ভ্যারিয়েবলে লক ছাড়া লিখলেও প্রোগ্রাম কম্পাইল হয়ে যায়—পরে প্রোডাকশনে গিয়ে হঠাৎ ক্র্যাশ করে! কিন্তু **Rust** কম্পাইলের সময়েই মালিকানা (`Send` ও `Sync` ট্রেইট) চেক করে ধরে ফেলে: "এই ডেটা লক ছাড়া দুই থ্রেডে নিও না!" ফলে **Data Race হওয়া গাণিতিকভাবেই অসম্ভব**!',
        everydayExample:
          'একটি কুরিয়ার বক্স (`mpsc::channel`) এক থ্রেড থেকে অন্য থ্রেডে পাঠালে আগের থ্রেডের হাতে আর চাবি থাকে না—একই চিঠি দুজন পড়তে বা কাটতে পারে না।',
        keyTakeaways: [
          '`move || ...` ক্লোজার ডেটার সম্পূর্ণ মালিকানা নতুন থ্রেডে পাঠিয়ে দেয়।',
          'একাধিক থ্রেডে শেয়ার্ড পয়েন্টার পাঠাতে হলে `Rc` নয়, অ্যাটমিক **`Arc<Mutex<T>>`** ব্যবহার করতে হয়।',
          '`mpsc::channel()` ("Multiple Producer, Single Consumer") দিয়ে লক ছাড়াই নিরাপদ মেসেজ পাঠানো যায়।',
        ],
      },
    },
    codeExamples: [
      {
        id: 'rust-13-ex-basic',
        tier: 'Basic',
        title: '1. Basic: OS Threads With std::thread::spawn & Join',
        banglaNote: '`std::thread::spawn(move || x)` দিয়ে প্রকৃত OS থ্রেডে কাজ পাঠিয়ে `.join()` করে যোগফল।',
        code: `use std::io::{self, Read};
use std::thread;

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let nums: Vec<i64> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();
    let n = nums[0] as usize;
    let handles: Vec<_> = nums[1..=n]
        .iter()
        .map(|&x| thread::spawn(move || x))
        .collect();
    let total: i64 = handles.into_iter().map(|h| h.join().unwrap()).sum();
    println!("{}", total);
}`,
        stdin: '3\n10 20 30',
        expectedOutput: '60',
      },
      {
        id: 'rust-13-ex-edge',
        tier: 'Edge-Case',
        title: '2. Edge-Case: Empty Thread Pool Guard & Arc<T> Read-Only Sharing',
        banglaNote: '`Arc<Vec<i64>>` দিয়ে ডেটা কপি না করেই একাধিক থ্রেডে রিড-অনলি শেয়ারিং।',
        code: `use std::io::{self, Read};
use std::sync::Arc;
use std::thread;

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let nums: Vec<i64> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();
    let n = nums.first().copied().unwrap_or(0) as usize;
    if n == 0 { println!("0"); return; }
    let shared = Arc::new(nums[1..=n].to_vec());
    let mut handles = Vec::new();
    for i in 0..n {
        let data = Arc::clone(&shared);
        handles.push(thread::spawn(move || data[i]));
    }
    let total: i64 = handles.into_iter().map(|h| h.join().unwrap()).sum();
    println!("{}", total);
}`,
        stdin: '4\n5 10 15 20',
        expectedOutput: '50',
      },
      {
        id: 'rust-13-ex-opt',
        tier: 'Optimized',
        title: '3. Optimized: Lock-Free Message Passing via mpsc::channel',
        banglaNote: '`std::sync::mpsc::channel()` দিয়ে ওয়ার্কার থ্রেড থেকে সরাসরি মেইন রিসিভারে ফলাফল পাঠানো।',
        code: `use std::io::{self, Read};
use std::sync::mpsc;
use std::thread;

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let nums: Vec<i64> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();
    let n = nums[0] as usize;
    let (tx, rx) = mpsc::channel();
    for &x in &nums[1..=n] {
        let tx_clone = tx.clone();
        thread::spawn(move || {
            tx_clone.send(x * 2).unwrap();
        });
    }
    drop(tx);
    let total: i64 = rx.iter().sum();
    println!("{}", total);
}`,
        stdin: '3\n10 20 30',
        expectedOutput: '120',
      },
      {
        id: 'rust-13-ex-cp',
        tier: 'CP Trick',
        title: '4. CP Trick: Scoped Threads Borrowing Stack Slices Zero-Copy',
        banglaNote: '`std::thread::scope` ব্যবহার করে `Arc` ছাড়াই লোকাল স্ট্যাক স্লাইস নিরাপদে থ্রেডে বরো করা।',
        code: `use std::io::{self, Read};
use std::thread;

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let nums: Vec<i64> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();
    let n = nums[0] as usize;
    let slice = &nums[1..=n];
    let mid = n / 2;
    let (left, right) = slice.split_at(mid);
    let total = thread::scope(|scope| {
        let h1 = scope.spawn(|| left.iter().map(|&x| x * x).sum::<i64>());
        let h2 = scope.spawn(|| right.iter().map(|&x| x * x).sum::<i64>());
        h1.join().unwrap() + h2.join().unwrap()
    });
    println!("{}", total);
}`,
        stdin: '3\n2 3 4',
        expectedOutput: '29',
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 10',
        codeSnippet: '.map(|&x| thread::spawn(move || x))',
        whatItMeans: 'Spawns an OS thread per task and moves x ownership cleanly inside the closure.',
        whyItIsThere: 'Guarantees the child thread never holds a dangling reference to parent stack.',
        ifDeletedError: 'Code never spawns threads or fails lifetime checks.',
      },
      {
        lineNumber: 'Line 12',
        codeSnippet: 'handles.into_iter().map(|h| h.join().unwrap()).sum()',
        whatItMeans: 'Blocks until every spawned thread finishes and collects returned i64 values.',
        whyItIsThere: 'Without join(), main() could exit and kill child threads prematurely.',
        ifDeletedError: 'Threads are detached and output is missed.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'Parse n = 3, nums = [10,20,30]', memoryOrStack: '3 handles spawned', note: 'move transfers i64 copy' },
      { step: 2, state: 'Threads execute concurrently', memoryOrStack: 'Zero shared mutable memory', note: 'Send/Sync verified at compile' },
      { step: 3, state: 'h.join() collects 10, 20, 30', memoryOrStack: 'total = 60', note: 'Ownership returned safely' },
      { step: 4, state: 'println!("60")', memoryOrStack: 'Exit 0', note: 'Clean termination' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: Trying to Share Non-Atomic Rc<T> Across Threads',
        brokenCode: 'let a = Rc::new(5); thread::spawn(move || println!("{}", a)); // Compile Error!',
        fixedCode: 'let a = Arc::new(5); thread::spawn(move || println!("{}", a));',
        whyItBreaks: 'Rc’s reference count increment is not atomic, which would race across threads—Rust blocks it at compile time.',
      },
      {
        title: 'Trap 2: Forgetting drop(tx) Before rx.iter() on mpsc Channel',
        brokenCode: 'for msg in rx.iter() { ... } // Hangs forever if original tx is still alive!',
        fixedCode: 'drop(tx); // Close original sender so rx knows when all cloned senders finish',
        whyItBreaks: 'rx.iter() waits until EVERY Sender handle (including the unused initial tx) is dropped.',
      },
      {
        title: 'Trap 3: Holding MutexGuard Across a Long I/O Step',
        brokenCode: 'let g = mtx.lock().unwrap(); slow_network_call(); // Blocks every other thread!',
        fixedCode: '{ let val = *mtx.lock().unwrap(); } // Drop guard before slow I/O',
        whyItBreaks: 'MutexGuards unlock only when dropped at scope end (`}`).',
      },
    ],
    practiceSheet: [
      {
        id: 'rust-ch-13-q1',
        difficulty: 'Easy',
        title: 'Warm-up: Join OS Worker Threads',
        prompt: 'Spawn n worker threads returning each value and print their sum.',
        banglaHint: '`thread::spawn(move || x)` চালিয়ে `.join()` করে যোগ করো।',
        starterCode: `use std::io::{self, Read};
use std::thread;
fn main() {
    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();
    let nums: Vec<i64> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();
    let handles: Vec<_> = nums[1..=nums[0] as usize].iter().map(|&x| thread::spawn(move || x)).collect();
    let total: i64 = handles.into_iter().map(|h| h.join().unwrap()).sum();
    println!("{}", total);
}`,
        sampleStdin: '3\n10 20 30',
        expectedOutput: '60',
      },
      {
        id: 'rust-ch-13-q2',
        difficulty: 'Easy',
        title: 'Empty Batch Zero Guard',
        prompt: 'Return 0 cleanly when 0 tasks are submitted.',
        banglaHint: '`n == 0` হলে নিরাপদে `0` প্রিন্ট করো।',
        starterCode: `use std::io::{self, Read};
fn main() {
    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();
    let nums: Vec<i64> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();
    let n = nums.first().copied().unwrap_or(0) as usize;
    println!("{}", if n == 0 { 0 } else { nums[1..=n].iter().sum::<i64>() });
}`,
        sampleStdin: '0',
        expectedOutput: '0',
      },
      {
        id: 'rust-ch-13-q3',
        difficulty: 'Medium',
        title: 'Thread Pool Batch Reducer',
        prompt: 'Aggregate n concurrent worker returns cleanly.',
        banglaHint: '`handles` ইটারেটর `.sum()` করে আউটপুট দাও।',
        starterCode: `use std::io::{self, Read};
use std::thread;
fn main() {
    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();
    let nums: Vec<i64> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();
    let handles: Vec<_> = nums[1..=nums[0] as usize].iter().map(|&x| thread::spawn(move || x)).collect();
    println!("{}", handles.into_iter().map(|h| h.join().unwrap()).sum::<i64>());
}`,
        sampleStdin: '4\n5 10 15 20',
        expectedOutput: '50',
      },
      {
        id: 'rust-ch-13-q4',
        difficulty: 'Medium',
        title: 'Channel Message-Passing Sum of Squares',
        prompt: 'Send x*x over mpsc::channel from spawned workers and print receiver total.',
        banglaHint: '`tx_clone.send(x * x)` এবং মেইনে `drop(tx)` দিয়ে `rx.iter().sum()` নাও।',
        starterCode: `use std::io::{self, Read};
use std::sync::mpsc;
use std::thread;
fn main() {
    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();
    let nums: Vec<i64> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();
    let (tx, rx) = mpsc::channel();
    for &x in &nums[1..=nums[0] as usize] {
        let t = tx.clone();
        thread::spawn(move || t.send(x * x).unwrap());
    }
    drop(tx);
    println!("{}", rx.iter().sum::<i64>());
}`,
        sampleStdin: '3\n2 3 4',
        expectedOutput: '29',
      },
      {
        id: 'rust-ch-13-q5',
        difficulty: 'Hard',
        title: 'Shared Arc<Mutex<i64>> Synchronized Accumulator',
        prompt: 'Safely mutate a shared sum from multiple OS threads via Arc<Mutex<i64>>.',
        banglaHint: '`Arc::clone(&acc)` প্রতিটি থ্রেডে পাঠিয়ে `*m.lock().unwrap() += x` করো।',
        starterCode: `use std::io::{self, Read};
use std::sync::{Arc, Mutex};
use std::thread;
fn main() {
    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();
    let nums: Vec<i64> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();
    let acc = Arc::new(Mutex::new(0i64));
    let mut handles = Vec::new();
    for &x in &nums[1..=nums[0] as usize] {
        let a = Arc::clone(&acc);
        handles.push(thread::spawn(move || { *a.lock().unwrap() += x * 3; }));
    }
    for h in handles { h.join().unwrap(); }
    println!("{}", *acc.lock().unwrap());
}`,
        sampleStdin: '3\n1 2 3',
        expectedOutput: '18',
      },
    ],
    miniBuild: {
      title: 'Rust Mini Build: Fearless Multi-Thread Telemetry Engine',
      description: 'Processes parallel worker payloads safely with zero possibility of data races.',
      banglaGoal: 'Rust thread::spawn ও ownership দিয়ে সম্পূর্ণ রেস-মুক্ত প্যারালাল ইঞ্জিন তৈরি।',
      combinesChapters: 'Ch 1–13',
      starterCode: `use std::io::{self, Read};
use std::thread;
fn main() {
    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();
    let nums: Vec<i64> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();
    let handles: Vec<_> = nums[1..=nums[0] as usize].iter().map(|&x| thread::spawn(move || x)).collect();
    println!("{}", handles.into_iter().map(|h| h.join().unwrap()).sum::<i64>());
}`,
      sampleStdin: '3\n10 20 30',
      expectedOutput: '60',
    },
  },

  typescript: {
    title: 'TypeScript Chapter 13 (TS 5.x): Typed Async Task Queues, Discriminated Outcomes & Race Guards',
    banglaTitle: 'TypeScript অধ্যায় ১৩ (TS 5.x): টাইপড অ্যাসিঙ্ক টাস্ক কিউ, আউটকাম ও রেস গার্ড',
    subtitle: 'Model task states cleanly with discriminated unions, run deterministic schedulers, and prevent unhandled async state races.',
    zeroIntuition: {
      plainEnglishStory:
        'Unstructured callbacks lead to subtle bugs where you forget an error branch or read undefined data from a failed API call. TypeScript discriminated unions (`type TaskOutcome = { ok: true; value: number } | { ok: false; error: string }`) force you at compile time to handle EVERY possible outcome cleanly.',
      asciiFlowchart: `  TYPED ASYNC OUTCOME CONTRACT (TS 5.x)
  TaskOutcome:
    +-- { ok: true, value: number }     -> Safe to add to total
    +-- { ok: false, error: string }    -> Compiler forces recovery handling!`,
      pseudocode: [
        '1. DEFINE typed TaskOutcome discriminated union',
        '2. SCHEDULE isolated worker functions across batch inputs',
        '3. NARROW each settled outcome via `if (res.ok)` before summing',
        '4. LOG guaranteed numeric total',
      ],
      banglaZeroToHero: {
        analogyTitle: 'রেসপন্স চেক ছাড়া দরজা না খোলা (Discriminated Outcome Unions)',
        explanation:
          'JS-এ অনেক সময় `res.data` পড়তে গিয়ে `undefined` ক্র্যাশ হয় কারণ টাস্ক ফেইল করেছিল! TypeScript-এ `ok: true | false` ট্যাগ দিয়ে ডিস্ক্রিমিনেটেড ইউনিয়ন বানালে `if (res.ok)` চেক না করা পর্যন্ত কম্পাইলার `res.value` ব্যবহারই করতে দেবে না—১০০% সেফটি!',
        everydayExample:
          'একটি React ডেটা ফেচারের `{ status: "loading" } | { status: "error" } | { status: "ready", items }` স্টেট মডেল করা।',
        keyTakeaways: [
          'অ্যাসিঙ্ক অপারেশনের ফলাফল `{ status: "fulfilled", value } | { status: "rejected" }` হিসেবে টাইপ করলে এরর হ্যান্ডলিং মিস হয় না।',
          'স্টেট রেস কমাতে পিওর রিডাকশন ও সিকোয়েন্স টোকেন (`seqId`) সবচেয়ে নির্ভরযোগ্য।',
          'অযথা `any` দিয়ে প্রমিস রেজাল্ট চাপা দেবে না—`Promise<T>` জেনেরিকস ব্যবহার করবে।',
        ],
      },
    },
    codeExamples: [
      {
        id: 'ts-13-ex-basic',
        tier: 'Basic',
        title: '1. Basic: Typed Task Batch Execution & Reduction',
        banglaNote: 'টাইপড ওয়ার্কার ক্লোজার চালিয়ে নির্ভুল যোগফল রিডাকশন।',
        code: `import * as fs from 'fs';

const nums: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
const n: number = nums[0] || 0;
const tasks: Array<() => number> = nums.slice(1, 1 + n).map((x) => () => x);
const results: number[] = tasks.map((fn) => fn());
console.log(results.reduce((a, b) => a + b, 0));`,
        stdin: '3\n10 20 30',
        expectedOutput: '60',
      },
      {
        id: 'ts-13-ex-edge',
        tier: 'Edge-Case',
        title: '2. Edge-Case: Discriminated Union Error Recovery',
        banglaNote: '`ok: true | false` ইউনিয়ন টাইপ ব্যবহার করে ত্রুটিপূর্ণ টাস্ক নিরাপদে ফিল্টার।',
        code: `import * as fs from 'fs';

type Outcome = { ok: true; value: number } | { ok: false; reason: string };
const tok: string[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/);
const n: number = Number(tok[0] || 0);
const outcomes: Outcome[] = tok.slice(1, 1 + n).map((s): Outcome => {
  const v = Number(s);
  return Number.isFinite(v) ? { ok: true, value: v } : { ok: false, reason: 'NaN' };
});
let total = 0;
for (const o of outcomes) if (o.ok) total += o.value;
console.log(total);`,
        stdin: '4\n10 bad 20 30',
        expectedOutput: '60',
      },
      {
        id: 'ts-13-ex-opt',
        tier: 'Optimized',
        title: '3. Optimized: Typed Priority Event-Loop Scheduler',
        banglaNote: 'সিঙ্ক -> মাইক্রোটাস্ক -> ম্যাক্রোটাস্ক কিউ অর্ডারিং টাইপ-সেফ সিমুলেশন।',
        code: `import * as fs from 'fs';

const jobs: string[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).slice(1);
const micro: string[] = [];
const macro: string[] = [];
for (const j of jobs) {
  if (j.startsWith('micro:')) micro.push(j);
  else macro.push(j);
}
console.log(['sync', ...micro, ...macro].join(' -> '));`,
        stdin: '3\nmacro:timer micro:promise micro:await',
        expectedOutput: 'sync -> micro:promise -> micro:await -> macro:timer',
      },
      {
        id: 'ts-13-ex-cp',
        tier: 'CP Trick',
        title: '4. CP Trick: Stale-Response Sequence Guard',
        banglaNote: 'সর্বশেষ রিকোয়েস্ট সিকোয়েন্স নম্বর মিলিয়ে পুরনো অ্যাসিঙ্ক রেসপন্স বাতিল করা।',
        code: `import * as fs from 'fs';

const events: string[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).slice(1);
let latest = 0;
let state = 'idle';
for (const ev of events) {
  const [idStr, payload] = ev.split(':');
  const id = Number(idStr);
  if (id >= latest) { latest = id; state = payload; }
}
console.log(state);`,
        stdin: '3\n2:newest 1:stale_slow 3:final',
        expectedOutput: 'final',
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 4',
        codeSnippet: 'const tasks: Array<() => number> = ...',
        whatItMeans: 'Strictly types each queued unit as a zero-argument task returning a number.',
        whyItIsThere: 'Prevents mixing incompatible return shapes inside a batch queue.',
        ifDeletedError: 'Loses compile-time contract on task output types.',
      },
      {
        lineNumber: 'Line 5',
        codeSnippet: 'const results: number[] = tasks.map((fn) => fn());',
        whatItMeans: 'Executes each typed task cleanly and preserves strict number[] return array.',
        whyItIsThere: 'Avoids mutable shared counters.',
        ifDeletedError: 'Cannot reduce task outputs.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'Parse 3 numeric tasks', memoryOrStack: 'tasks.length = 3', note: 'Typed Array<() => number>' },
      { step: 2, state: 'Execute batch cleanly', memoryOrStack: 'results = [10, 20, 30]', note: 'Zero side effects' },
      { step: 3, state: 'Reduce sum', memoryOrStack: 'total = 60', note: 'Outputs 60' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: Typing Async Function Return Without Promise<T>',
        brokenCode: 'async function getSum(): number { return 10; } // TS1064 Error!',
        fixedCode: 'async function getSum(): Promise<number> { return 10; }',
        whyItBreaks: 'Every `async` function automatically wraps its return inside a `Promise`.',
      },
      {
        title: 'Trap 2: Missing Exhaustive Narrowing on TaskOutcome',
        brokenCode: 'console.log(outcome.value); // TS Error: Property value does not exist on error variant!',
        fixedCode: 'if (outcome.ok) console.log(outcome.value);',
        whyItBreaks: 'Discriminated unions protect against reading .value when a task failed.',
      },
      {
        title: 'Trap 3: Unhandled Floating Promise Ignoring Rejections',
        brokenCode: 'runAsyncTask(); // Rejection silently crashes or gets lost!',
        fixedCode: '// Always await or attach .catch() with typed error handling.',
        whyItBreaks: 'Floating promises detach failure propagation from the caller flow.',
      },
    ],
    practiceSheet: [
      {
        id: 'ts-ch-13-q1',
        difficulty: 'Easy',
        title: 'Warm-up: Typed Task Batch Sum',
        prompt: 'Execute n typed numeric tasks and log their sum.',
        banglaHint: '`number[]` টাস্ক ব্যাচ থেকে `.reduce()` দিয়ে যোগফল লগ করো।',
        starterCode: `import * as fs from 'fs';
const nums: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
const tasks: Array<() => number> = nums.slice(1, 1 + (nums[0] || 0)).map((x) => () => x);
console.log(tasks.map((f) => f()).reduce((a, b) => a + b, 0));`,
        sampleStdin: '3\n10 20 30',
        expectedOutput: '60',
      },
      {
        id: 'ts-ch-13-q2',
        difficulty: 'Easy',
        title: 'Empty Batch Zero Guard',
        prompt: 'Ensure n = 0 produces 0 safely.',
        banglaHint: '`n <= 0` হলে `0` প্রিন্ট করো।',
        starterCode: `import * as fs from 'fs';
const nums: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
const n: number = nums[0] || 0;
console.log(n <= 0 ? 0 : nums.slice(1, 1 + n).reduce((a, b) => a + b, 0));`,
        sampleStdin: '0',
        expectedOutput: '0',
      },
      {
        id: 'ts-ch-13-q3',
        difficulty: 'Medium',
        title: 'Discriminated Outcome Filter Sum',
        prompt: 'Skip non-numeric tokens safely via Outcome union and print valid sum.',
        banglaHint: '`Outcome` ডিস্ক্রিমিনেটেড ইউনিয়ন ব্যবহার করে বৈধ মান যোগ করো।',
        starterCode: `import * as fs from 'fs';
type Outcome = { ok: true; v: number } | { ok: false };
const tok: string[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/);
const res: Outcome[] = tok.slice(1, 1 + Number(tok[0] || 0)).map((s): Outcome => Number.isFinite(Number(s)) ? { ok: true, v: Number(s) } : { ok: false });
console.log(res.reduce((acc, r) => acc + (r.ok ? r.v : 0), 0));`,
        sampleStdin: '4\n5 10 ERR 35',
        expectedOutput: '50',
      },
      {
        id: 'ts-ch-13-q4',
        difficulty: 'Medium',
        title: 'Event-Loop Queue Priority Simulator',
        prompt: 'Print execution order with sync first, micro:* second, macro:* last.',
        banglaHint: 'মাইক্রো ও ম্যাক্রো আলাদা অ্যারেতে ফিল্টার করো।',
        starterCode: `import * as fs from 'fs';
const jobs: string[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).slice(1);
console.log(['sync', ...jobs.filter((x) => x.startsWith('micro:')), ...jobs.filter((x) => x.startsWith('macro:'))].join(' -> '));`,
        sampleStdin: '3\nmacro:t1 micro:p1 macro:t2',
        expectedOutput: 'sync -> micro:p1 -> macro:t1 -> macro:t2',
      },
      {
        id: 'ts-ch-13-q5',
        difficulty: 'Hard',
        title: '2-Worker Load Balancer Time Estimator',
        prompt: 'Distribute job durations greedily across 2 workers and print total completion time.',
        banglaHint: 'দুটি ওয়ার্কারের কম ব্যস্ত স্লটে পরের জব বসাও।',
        starterCode: `import * as fs from 'fs';
const jobs: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number).slice(1);
let w0 = 0, w1 = 0;
for (const d of jobs) { if (w0 <= w1) w0 += d; else w1 += d; }
console.log(Math.max(w0, w1));`,
        sampleStdin: '4\n3 5 2 4',
        expectedOutput: '9',
      },
    ],
    miniBuild: {
      title: 'TypeScript Mini Build: Strict Concurrent Task Dispatcher',
      description: 'Processes typed batch pipelines and eliminates unhandled outcome bugs.',
      banglaGoal: 'টাইপড টাস্ক ডিসপ্যাচার ও ইউনিয়ন আউটকাম দিয়ে নিরাপদ ব্যাচ প্রসেসিং।',
      combinesChapters: 'Ch 1–13',
      starterCode: `import * as fs from 'fs';
const nums: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
const tasks: Array<() => number> = nums.slice(1, 1 + (nums[0] || 0)).map((x) => () => x);
console.log(tasks.map((f) => f()).reduce((a, b) => a + b, 0));`,
      sampleStdin: '3\n10 20 30',
      expectedOutput: '60',
    },
  },

  html: {
    title: 'HTML5 Chapter 13: Non-Blocking UI, Live Promise.all Dashboard, Loading States & Aria-Live',
    banglaTitle: 'HTML5 অধ্যায় ১৩: নন-ব্লকিং UI, লাইভ Promise.all ড্যাশবোর্ড ও লোডিং স্টেট',
    subtitle: 'Build responsive browser UIs that fire real Promise.all requests, show accessible aria-busy/aria-live feedback, and defer non-critical scripts.',
    zeroIntuition: {
      plainEnglishStory:
        'Inside the browser, HTML rendering and JavaScript share the exact same thread! While a real `Promise.all` request runs asynchronously, your HTML UI updates **`aria-live="polite"`** regions and **`disabled`** button states so users never double-submit forms or stare at a frozen screen.',
      asciiFlowchart: `  BROWSER ASYNC UI FLOW
  [Click "Fetch All"] -> button.disabled = true -> status="Loading..." (aria-live)
         |
         v (Promise.all([jobA, jobB, jobC]) resolves concurrently)
  [Update DOM safely] -> button.disabled = false -> status="Merged sum: 60"`,
      pseudocode: [
        '1. RENDER button and accessible <p id="status" aria-live="polite">',
        '2. FIRE native Promise.all([Promise.resolve(10), Promise.resolve(20), Promise.resolve(30)])',
        '3. UPDATE status textContent immediately upon resolution',
        '4. INCLUDE defer/async script attributes cleanly',
      ],
      banglaZeroToHero: {
        analogyTitle: 'ফর্ম সাবমিটের সময় বাটন লক করা (Double-Click Guard) ও লাইভ স্টেটাস',
        explanation:
          'বিকাশে টাকা পাঠানোর বাটনে ক্লিক করার সাথে সাথে বাটনটি `Processing...` হয়ে ডিজেবল হয়ে যায় কেন? যাতে ইউজার অস্থির হয়ে দুবার ক্লিক করে ২ বার টাকা না কাটে! ব্রাউজারে আসল `Promise.all()` চলাকালে `aria-live="polite"` ও `disabled` স্টেট দিয়ে স্মার্ট ফিডব্যাক দেখাতে হয়।',
        everydayExample:
          'ক্লাউড ড্যাশবোর্ডে ইউজার প্রোফাইল, ব্যালেন্স ও নোটিফিকেশন ৩টি একসাথে লোড হয়ে পর্দায় দেখানো।',
        keyTakeaways: [
          '`<script defer src="app.js">` দিলে HTML পার্সিং আটকায় না এবং DOM রেডি হওয়ার পর সিরিয়াল অনুযায়ী চলে।',
          'অ্যাসিঙ্ক আপডেট স্ক্রিন-রিডারে জানাতে **`aria-live="polite"`** অ্যাট্রিবিউট ব্যবহার করবে।',
          'সব সময় লোডিং স্টেটে বাটন `disabled` করে ডাবল-সাবমিট ঠেকাবে।',
        ],
      },
    },
    codeExamples: [
      {
        id: 'html-13-ex-basic',
        tier: 'Basic',
        title: '1. Basic: Live Promise.all Concurrent Batch Resolver',
        banglaNote: 'ব্রাউজারের ভেতর আসল `Promise.all` দিয়ে ৩টি টাস্ক একসাথে মার্জ করে DOM-এ দেখানো।',
        code: `<!doctype html>
<html><body style="font-family:system-ui;background:#090d16;color:#f8fafc;padding:24px;">
  <h3>Promise.all Concurrent Fetch Demo</h3>
  <p id="status" aria-live="polite" style="font-family:monospace;color:#38bdf8">Loading concurrent tasks...</p>
  <script>
    Promise.all([Promise.resolve(10), Promise.resolve(20), Promise.resolve(30)]).then((vals) => {
      document.getElementById('status').textContent = 'Merged sum: ' + vals.reduce((a, b) => a + b, 0);
    });
  </script>
</body></html>`,
        stdin: '',
        expectedOutput: 'Merged sum: 60',
      },
      {
        id: 'html-13-ex-edge',
        tier: 'Edge-Case',
        title: '2. Edge-Case: Promise.allSettled UI With Graceful Partial Failure',
        banglaNote: 'একটি API ফেইল করলেও বাকিগুলো UI-তে দেখিয়ে এরর ব্যাজ প্রদর্শন।',
        code: `<!doctype html>
<html><body style="font-family:system-ui;background:#090d16;color:#f8fafc;padding:24px;">
  <h3>Partial-Failure Resilient Widget</h3>
  <p id="summary" style="color:#34d399;font-family:monospace"></p>
  <script>
    Promise.allSettled([Promise.resolve(25), Promise.reject('timeout'), Promise.resolve(35)]).then((res) => {
      const okSum = res.filter(r => r.status === 'fulfilled').reduce((a, r) => a + r.value, 0);
      const failed = res.filter(r => r.status === 'rejected').length;
      document.getElementById('summary').textContent = 'OK Sum: ' + okSum + ' | Failed: ' + failed;
    });
  </script>
</body></html>`,
        stdin: '',
        expectedOutput: 'OK Sum: 60 | Failed: 1',
      },
      {
        id: 'html-13-ex-opt',
        tier: 'Optimized',
        title: '3. Optimized: Double-Submit Button Lock During Async Work',
        banglaNote: 'ক্লিক করার পর বাটন `disabled` রেখে কাজ শেষে আবার সচল করার রিয়েল-ওয়ার্ল্ড প্যাটার্ন।',
        code: `<!doctype html>
<html><body style="font-family:system-ui;background:#090d16;color:#f8fafc;padding:24px;">
  <button id="payBtn" style="padding:10px 16px;background:#38bdf8;color:#090d16;border:none;border-radius:6px;font-weight:700;cursor:pointer">Submit Payment</button>
  <p id="msg" aria-live="polite" style="margin-top:12px;color:#34d399">Ready</p>
  <script>
    const btn = document.getElementById('payBtn');
    const msg = document.getElementById('msg');
    btn.addEventListener('click', async () => {
      btn.disabled = true;
      msg.textContent = 'Processing...';
      await Promise.resolve();
      msg.textContent = 'Confirmed #TXN-901';
      btn.disabled = false;
    });
  </script>
</body></html>`,
        stdin: '',
        expectedOutput: 'Submit Payment',
      },
      {
        id: 'html-13-ex-cp',
        tier: 'CP Trick',
        title: '4. CP Trick: Performance-Friendly Chunked Batch via requestAnimationFrame',
        banglaNote: 'UI ফ্রিজে না ফেলে `requestAnimationFrame` দিয়ে ফ্রেম-বাই-ফ্রেম DOM আপডেট।',
        code: `<!doctype html>
<html><body style="font-family:system-ui;background:#090d16;color:#f8fafc;padding:24px;">
  <progress id="bar" value="0" max="100" style="width:240px"></progress>
  <span id="pct" style="margin-left:10px;font-family:monospace">0%</span>
  <script>
    let pct = 0;
    function tick() {
      pct = Math.min(100, pct + 50);
      document.getElementById('bar').value = pct;
      document.getElementById('pct').textContent = pct + '%';
      if (pct < 100) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  </script>
</body></html>`,
        stdin: '',
        expectedOutput: '0%',
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 4',
        codeSnippet: '<p id="status" aria-live="polite">',
        whatItMeans: 'Marks status text as a live region so assistive tech announces async changes.',
        whyItIsThere: 'Async DOM changes are otherwise silent to screen readers.',
        ifDeletedError: 'Accessibility audit fails and users miss live completion updates.',
      },
      {
        lineNumber: 'Line 6',
        codeSnippet: 'Promise.all([Promise.resolve(10), ...]).then(...)',
        whatItMeans: 'Runs all asynchronous promises concurrently and joins results in one callback.',
        whyItIsThere: 'Replaces slow nested callback hell and avoids sequential awaits.',
        ifDeletedError: 'Status stays stuck at "Loading concurrent tasks..." forever.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'Initial HTML paint', memoryOrStack: 'status="Loading concurrent tasks..."', note: 'Immediate responsive paint' },
      { step: 2, state: 'Promise.all queued in Microtask', memoryOrStack: '3 resolved promises [10,20,30]', note: 'Drained after script ends' },
      { step: 3, state: '.then() updates textContent', memoryOrStack: 'status="Merged sum: 60"', note: 'Accessible aria-live trigger' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: Blocking Render With <script> in <head> Without defer',
        brokenCode: '<head><script src="bundle.js"></script></head> <!-- Stops HTML parsing! -->',
        fixedCode: '<head><script defer src="bundle.js"></script></head>',
        whyItBreaks: 'Standard blocking scripts pause DOM construction until downloaded and executed.',
      },
      {
        title: 'Trap 2: Allowing Rapid Double-Clicks on Async Form Submit',
        brokenCode: 'btn.onclick = () => fetch("/order"); // Double-click creates TWO orders!',
        fixedCode: 'btn.disabled = true; try { await fetch("/order"); } finally { btn.disabled = false; }',
        whyItBreaks: 'Without disabling the trigger, users can re-fire the same mutation while the first request is in flight.',
      },
      {
        title: 'Trap 3: Dropping Loading States on Rejected Promises',
        brokenCode: 'showSpinner(); await fetch(url); hideSpinner(); // Spinner spins FOREVER if fetch throws!',
        fixedCode: 'showSpinner(); try { await fetch(url); } finally { hideSpinner(); }',
        whyItBreaks: 'Code after a failed `await` is skipped unless wrapped in `try / finally`.',
      },
    ],
    practiceSheet: [
      {
        id: 'html-ch-13-q1',
        difficulty: 'Easy',
        title: 'Live Promise.all Concurrent Demo',
        prompt: 'Render the Chapter 13 Promise.all live widget cleanly.',
        banglaHint: '`Promise.all` দিয়ে ৬০ যোগফল DOM-এ প্রদর্শন করো।',
        starterCode: `<!doctype html><html><body style="font-family:system-ui;background:#090d16;color:#f8fafc;padding:24px;"><h3>Promise.all Concurrent Fetch Demo</h3><p id="status" style="font-family:monospace;color:#38bdf8">Loading concurrent tasks...</p><script>Promise.all([Promise.resolve(10),Promise.resolve(20),Promise.resolve(30)]).then(v=>{document.getElementById('status').textContent='Merged sum: '+v.reduce((a,b)=>a+b,0);});</script></body></html>`,
        sampleStdin: '',
        expectedOutput: 'Merged sum: 60',
      },
      {
        id: 'html-ch-13-q2',
        difficulty: 'Easy',
        title: 'Accessible Aria-Live Async Region',
        prompt: 'Render an accessible status banner with aria-live="polite".',
        banglaHint: '`aria-live="polite"` অ্যাট্রিবিউট যোগ করো।',
        starterCode: `<!doctype html><html><body style="background:#090d16;color:#f8fafc;padding:20px;"><p aria-live="polite">Ch13 Async UI Ready</p></body></html>`,
        sampleStdin: '',
        expectedOutput: 'Ch13 Async UI Ready',
      },
      {
        id: 'html-ch-13-q3',
        difficulty: 'Medium',
        title: 'Promise.allSettled Resilient Counter',
        prompt: 'Render count of fulfilled promises using Promise.allSettled.',
        banglaHint: '`r.status === "fulfilled"` ফিল্টার করো।',
        starterCode: `<!doctype html><html><body style="background:#090d16;color:#f8fafc;padding:20px;"><p id="out"></p><script>Promise.allSettled([Promise.resolve(1),Promise.reject('x'),Promise.resolve(2)]).then(r=>{document.getElementById('out').textContent='Fulfilled: '+r.filter(x=>x.status==='fulfilled').length;});</script></body></html>`,
        sampleStdin: '',
        expectedOutput: 'Fulfilled: 2',
      },
      {
        id: 'html-ch-13-q4',
        difficulty: 'Medium',
        title: 'Native <progress> Async Indicator',
        prompt: 'Update a <progress> bar to 100% after microtask completion.',
        banglaHint: '`Promise.resolve().then(...)` এর ভেতরে বার আপডেট করো।',
        starterCode: `<!doctype html><html><body style="background:#090d16;color:#f8fafc;padding:20px;"><progress id="p" value="0" max="100"></progress><span id="lbl"></span><script>Promise.resolve(100).then(v=>{document.getElementById('p').value=v;document.getElementById('lbl').textContent='Done '+v+'%';});</script></body></html>`,
        sampleStdin: '',
        expectedOutput: 'Done 100%',
      },
      {
        id: 'html-ch-13-q5',
        difficulty: 'Hard',
        title: 'Double-Click Lock With try/finally Guard',
        prompt: 'Disable action button during microtask execution and re-enable cleanly.',
        banglaHint: '`try { ... } finally { btn.disabled = false; }` ব্যবহার করো।',
        starterCode: `<!doctype html><html><body style="background:#090d16;color:#f8fafc;padding:20px;"><button id="b">Sync</button><p id="s"></p><script>(async()=>{const b=document.getElementById('b');b.disabled=true;try{await Promise.resolve();document.getElementById('s').textContent='Synced Safe';}finally{b.disabled=false;}})();</script></body></html>`,
        sampleStdin: '',
        expectedOutput: 'Synced Safe',
      },
    ],
    miniBuild: {
      title: 'HTML5 Mini Build: Non-Blocking Promise.all Dashboard Widget',
      description: 'Combines concurrent Promise.all resolution with accessible live DOM feedback.',
      banglaGoal: 'ব্রাউজারে লাইভ Promise.all ও অ্যাক্সেসিবল লোডিং ড্যাশবোর্ড বানানো।',
      combinesChapters: 'Ch 1–13',
      starterCode: `<!doctype html>
<html><body style="font-family:system-ui;background:#090d16;color:#f8fafc;padding:24px;">
  <h3>Promise.all Concurrent Fetch Demo</h3>
  <p id="status" style="font-family:monospace;color:#38bdf8">Loading concurrent tasks...</p>
  <script>
    Promise.all([Promise.resolve(10), Promise.resolve(20), Promise.resolve(30)]).then(vals => {
      document.getElementById('status').textContent = 'Merged sum: ' + vals.reduce((a, b) => a + b, 0);
    });
  </script>
</body></html>`,
      sampleStdin: '',
      expectedOutput: 'Merged sum: 60',
    },
  },
};
