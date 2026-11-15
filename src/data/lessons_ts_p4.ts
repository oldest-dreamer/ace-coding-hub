import type { AtomicLessonOverride } from './atomicLessonTypes';

export const LESSONS_TS_P4: Record<number, AtomicLessonOverride> = {
  16: {
    chapterNumber: 16,
    title: 'Typed References, Readonly & Type Narrowing in TypeScript',
    banglaTitle: 'টাইপড রেফারেন্স, Readonly ও টাইপ ন্যারোয়িং (TypeScript)',
    subtitle: 'readonly properties, ReadonlyArray<T>, discriminated unions, and exhaustive narrowing',
    zeroIntuition: {
      plainEnglishStory:
        'At runtime, TypeScript objects and arrays share heap references just like JavaScript—mutating an aliased array mutates the original. At compile time, however, TypeScript lets you prevent accidental reference mutation using `readonly` modifiers and `ReadonlyArray<T>` (`readonly number[]`), rejecting `.push()` or direct field writes inside pure functions.\n\nWhen working with references that may be `null`, `undefined`, or one of several object shapes, TypeScript’s control-flow type narrowing (`typeof`, `in`, or discriminated union `kind` tags) shrinks broad union types down to exact concrete fields safely.',
      asciiFlowchart:
        'type Result = { kind: "ok"; val: number } | { kind: "err"; msg: string }\nif (res.kind === "ok")  --> narrowed to { kind: "ok"; val: number }\nreadonly number[]       --> blocks .push(), .sort() in-place bugs!',
      pseudocode: ["function sumReadOnly(arr: readonly number[]): number","function handle(r: Result): string -> switch(r.kind)"],
      banglaZeroToHero: {
        analogyTitle: 'লাইব্রেরির "কেবল পড়ার জন্য" স্ট্যাম্প (`readonly`) আর চেকপোস্টে পরিচয় যাচাই (`narrowing`)',
        explanation:
          'রানটাইমে টাইপস্ক্রিপ্ট অবজেক্ট এবং অ্যারে হিপ রেফারেন্সের মাধ্যমেই শেয়ার হয়, তাই এক জায়গায় বদলালে আরেক জায়গায় বদলে যেতে পারে। কিন্তু কম্পাইল টাইমে `readonly` এবং `readonly number[]` ব্যবহার করলে কোনো ফাংশন ভুল করেও কলারের অ্যারেতে `.push()` বা ইন-প্লেস `.sort()` চালাতে পারে না—কম্পাইলার সাথে সাথে এরর দিয়ে থামিয়ে দেয়। আবার যখন কোনো ভ্যারিয়েবল `number | string | null` টাইপের হতে পারে, তখন সরাসরি `.toFixed()` বা `.toUpperCase()` লেখা বিপজ্জনক। এখানে Type Narrowing কাজ করে: `if (typeof x === "string")` বা `if (x !== null)` লিখলেই ওই ব্লকের ভেতর টাইপস্ক্রিপ্ট বুঝতে পারে এখন `x` অবশ্যই স্ট্রিং বা নন-নাল! সবচেয়ে শক্তিশালী প্যাটার্ন হলো Discriminated Union: প্রতিটি অবজেক্টে `kind: "ok" | "err"` এর মতো একটি কমন ট্যাগ রাখলে `if (res.kind === "ok")` লেখার সাথে সাথে ডট চাপে `val` ফিল্ড পাওয়া যায়। এছাড়া ইভেন্ট লিসেনার বা স্টেট প্যারামিটারে `Readonly<Config>` দিলে অবজেক্ট মিউটেশন বাগ একেবারে কমে যায়। এই অধ্যায়ে রিড-অনলি রেফারেন্স ও স্মার্ট টাইপ ন্যারোয়িং শিখবে।',
        everydayExample: 'কোনো নথির ওপর "Read-Only Copy" সিল থাকলে শুধু দেখা যায়, আর পাসপোর্ট দেখে ("student" নাকি "teacher") আলাদা কক্ষে পাঠানো হয়।',
        keyTakeaways: [
          'ইনপুট অ্যারে যেন ফাংশনের ভেতরে মিউটেট না হয় সেজন্য `readonly number[]` প্যারামিটার ব্যবহার করো।',
          '`typeof`, `in` অথবা ডিসক্রিমিনেটেড `kind` ট্যাগ দিয়ে ইউনিয়ন টাইপ ন্যারো করলে রানটাইম টাইপ এরর শূন্যে নামে।',
          '`readonly` কম্পাইল-টাইম গার্ড; নেস্টেড মিউটেশন আটকাতে হলে স্প্রেড কপি বা `structuredClone` ব্যবহার করতে হয়।',
        ],
      },
    },
    topics: [
      {
        id: 'ts-ch16-t1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Readonly Array Guard vs. Mutable Copy',
        englishParagraphs: [
          'Accept `readonly number[]` in a pure helper so the caller’s array cannot be mutated directly, returning a fresh sorted array via `[...arr].sort(...)`.',
        ],
        banglaParagraphs: [
          'পিউর ফাংশনে `readonly number[]` ব্যবহার করে মূল অ্যারে অপরিবর্তিত রেখে `[...arr]` দিয়ে নতুন সর্টেড কপি তৈরি করো।',
        ],
        memoryDiagram: 'nums (readonly) -> [...nums].sort() returns new heap array',
        code: `function sortedCopy(nums: readonly number[]): number[] {\n  return [...nums].sort((a, b) => a - b);\n}\nconst orig: number[] = [30, 10, 20];\nconst sorted = sortedCopy(orig);\nconsole.log(orig.join(',') + ' | ' + sorted.join(','));`,
        stdin: '',
        expectedOutput: '30,10,20 | 10,20,30',
        lineByLine: [
          {"lineNumber":"Line 1","codeSnippet":"function sortedCopy(nums: readonly number[]): number[] {","whatItMeans":"Forbids in-place `.sort()` or `.push()` on `nums` at compile time.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Mutating `nums.sort()` would silently scramble caller `orig`."},
          {"lineNumber":"Line 2","codeSnippet":"  return [...nums].sort((a, b) => a - b);","whatItMeans":"Spreads elements into a fresh array before sorting.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Sorted output is missing."},
        ],
      },
      {
        id: 'ts-ch16-t2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Type Narrowing With typeof & Null Guards',
        englishParagraphs: [
          'Write a helper `formatInput(val: string | number | null): string` narrowing each branch explicitly via `if (val === null)` and `typeof val`.',
        ],
        banglaParagraphs: [
          '`if (val === null)` এবং `typeof val === "number"` দিয়ে ইউনিয়ন টাইপ ন্যারো করে নিরাপদ ফরম্যাটিং করো।',
        ],
        memoryDiagram: 'string | number | null -> narrowed per branch',
        code: `import * as fs from 'fs';\nfunction describe(v: string | number | null): string {\n  if (v === null) return 'EMPTY';\n  if (typeof v === 'number') return 'NUM:' + (v * 2);\n  return 'STR:' + v.toUpperCase();\n}\nconst tok = fs.readFileSync(0, 'utf8').trim();\nconst val: string | number | null = tok === 'null' ? null : (/^-?\\d+$/.test(tok) ? Number(tok) : tok);\nconsole.log(describe(val));`,
        stdin: '21',
        expectedOutput: 'NUM:42',
        lineByLine: [
          {"lineNumber":"Line 3","codeSnippet":"  if (v === null) return 'EMPTY';","whatItMeans":"Eliminates `null` so remaining branches are `string | number`.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Null branch unguarded."},
          {"lineNumber":"Line 4","codeSnippet":"  if (typeof v === 'number') return 'NUM:' + (v * 2);","whatItMeans":"Narrows `v` strictly to `number` enabling numeric multiply.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Numbers fall into string branch."},
        ],
      },
      {
        id: 'ts-ch16-t3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Discriminated Union UI Event Dispatcher',
        englishParagraphs: [
          'Model click and input events with a `kind` literal tag so TypeScript narrows payload fields automatically inside `switch (evt.kind)`.',
        ],
        banglaParagraphs: [
          '`kind` ট্যাগযুক্ত Discriminated Union দিয়ে নিরাপদ ইভেন্ট ডিসপ্যাচার তৈরি করো।',
        ],
        memoryDiagram: 'ClickEvt | KeyEvt -> switch(e.kind) narrows payload fields',
        code: `import * as fs from 'fs';\ninterface ClickEvt { kind: 'click'; points: number; }\ninterface KeyEvt { kind: 'key'; char: string; }\ntype UiEvt = ClickEvt | KeyEvt;\nfunction render(e: UiEvt): string {\n  if (e.kind === 'click') return 'C=' + e.points;\n  return 'K=' + e.char;\n}\nconst parts = fs.readFileSync(0, 'utf8').trim().split(/\\s+/);\nconst evt: UiEvt = parts[0] === 'click' ? { kind: 'click', points: Number(parts[1]) } : { kind: 'key', char: parts[1] };\nconsole.log(render(evt));`,
        stdin: 'click 25',
        expectedOutput: 'C=25',
        lineByLine: [
          {"lineNumber":"Line 4","codeSnippet":"type UiEvt = ClickEvt | KeyEvt;","whatItMeans":"Union discriminated by shared literal `kind` tag.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Events lack shared union contract."},
          {"lineNumber":"Line 6","codeSnippet":"  if (e.kind === 'click') return 'C=' + e.points;","whatItMeans":"Narrows `e` to `ClickEvt`, proving `.points` exists.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Click events misrouted."},
        ],
      },
      {
        id: 'ts-ch16-t4',
        badge: 'Example 4: Bug Trap vs. CP/Production Pattern',
        title: 'Replacing Unsafe `any` Casts with `in` Operator Checks',
        englishParagraphs: [
          'Using `(obj as any).code` bypasses compiler safety. Checking `if ("code" in obj)` proves property existence dynamically.',
        ],
        banglaParagraphs: [
          'অন্ধের মতো `as any` কাস্ট না করে `"code" in obj` গার্ড দিয়ে প্রোপার্টি আছে কি না নিরাপদে পরীক্ষা করো।',
        ],
        memoryDiagram: '"code" in res narrows union safely without `as any`',
        code: `interface OkRes { data: string; }\ninterface ErrRes { code: number; }\ntype ApiRes = OkRes | ErrRes;\nfunction inspect(r: ApiRes): string {\n  if ('code' in r) return 'ERR:' + r.code;\n  return 'OK:' + r.data;\n}\nconsole.log(inspect({ code: 404 }) + ' ' + inspect({ data: 'ready' }));`,
        stdin: '',
        expectedOutput: 'ERR:404 OK:ready',
        lineByLine: [
          {"lineNumber":"Line 5","codeSnippet":"  if ('code' in r) return 'ERR:' + r.code;","whatItMeans":"Narrows union to `ErrRes` safely without type casts.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Accessing `r.code` fails type checking."},
        ],
      },
    ],
    lineByLineAnatomy: [
      {"lineNumber":"Line 1","codeSnippet":"function sortedCopy(nums: readonly number[]): number[] {","whatItMeans":"Marks input reference read-only.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Function undefined."},
      {"lineNumber":"Line 2","codeSnippet":"  return [...nums].sort((a, b) => a - b);","whatItMeans":"Clones elements before sorting.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Returns nothing."},
      {"lineNumber":"Line 4","codeSnippet":"const orig: number[] = [30, 10, 20];","whatItMeans":"Original array reference.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"`orig` missing."},
      {"lineNumber":"Line 6","codeSnippet":"console.log(orig.join(',') + ' | ' + sorted.join(','));","whatItMeans":"Shows `orig` kept `[30,10,20]` unchanged.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"No output."},
    ],
    dryRunTable: [
      { step: 1, state: 'orig = [30,10,20]', memoryOrStack: 'Heap#1=[30,10,20]', note: 'Passed as readonly ref' },
      { step: 2, state: '[...nums]', memoryOrStack: 'Heap#2=[30,10,20]', note: 'Shallow clone allocated' },
      { step: 3, state: '.sort((a,b)=>a-b)', memoryOrStack: 'Heap#2=[10,20,30]', note: 'Mutates Heap#2 only' },
      { step: 4, state: 'console.log', memoryOrStack: '30,10,20 | 10,20,30', note: 'Original order preserved' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: Mutating Input Array Inside `Array.prototype.sort()`',
        brokenCode: 'function top(a: number[]) { return a.sort((x,y) => y - x)[0]; } // mutates caller a!',
        fixedCode: 'function top(a: readonly number[]) { return [...a].sort((x,y) => y - x)[0]; }',
        whyItBreaks: '`.sort()` mutates arrays in place unless spread `[...a]` or `.toSorted()` creates a copy.',
      },
      {
        title: 'Trap 2: Blind `as Type` Assertions Instead of Narrowing',
        brokenCode: 'const val = (maybeNull as string).trim(); // crashes at runtime if null!',
        fixedCode: 'const val = maybeNull !== null ? maybeNull.trim() : "";',
        whyItBreaks: '`as` disables compiler checks without adding any runtime guard.',
      },
      {
        title: 'Trap 3: Shallow `{ ...obj }` Losing Nested Immutability',
        brokenCode: 'const clone = { ...cfg }; clone.tags.push("x");',
        fixedCode: 'const clone = structuredClone(cfg); clone.tags.push("x");',
        whyItBreaks: 'Top-level object spread leaves nested arrays referencing the same memory.',
      },
    ],
    practiceSheet: [
      {
        id: 'ts-ch16-p1',
        difficulty: 'Easy',
        title: 'Readonly Sum & Max Pure Helper',
        prompt: 'Write `summarize(arr: readonly number[]): string` returning `"min max sum"` without mutating `arr`.',
        banglaHint: '`readonly number[]` নিয়ে `Math.min`/`Math.max` বা লুপে হিসাব করো।',
        starterCode: `import * as fs from 'fs';\nfunction summarize(arr: readonly number[]): string {\n  let mn = arr[0], mx = arr[0], sum = 0;\n  for (const x of arr) { if (x < mn) mn = x; if (x > mx) mx = x; sum += x; }\n  return mn + ' ' + mx + ' ' + sum;\n}\nconst nums = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number).slice(1);\nconsole.log(summarize(nums));`,
        sampleStdin: '4\n10 25 5 40',
        expectedOutput: '5 40 80',
      },
      {
        id: 'ts-ch16-p2',
        difficulty: 'Easy',
        title: 'Union Type Formatter',
        prompt: 'Read a token; if purely numeric print `2 * n`, else print uppercased trimmed string using strict type narrowing.',
        banglaHint: '`typeof val === "number"` চেক করে ন্যারো করো।',
        starterCode: `import * as fs from 'fs';\nfunction fmt(v: number | string): string {\n  return typeof v === 'number' ? String(v * 2) : v.toUpperCase();\n}\nconst raw = fs.readFileSync(0, 'utf8').trim();\nconst parsed: number | string = /^-?\\d+$/.test(raw) ? Number(raw) : raw;\nconsole.log(fmt(parsed));`,
        sampleStdin: 'argon',
        expectedOutput: 'ARGON',
      },
      {
        id: 'ts-ch16-p3',
        difficulty: 'Medium',
        title: 'Discriminated Shape Area Union',
        prompt: 'Define `Square | Rect` discriminated union on `kind` and sum areas of `n` parsed shapes.',
        banglaHint: '`switch (s.kind)` ব্যবহার করে `s.side * s.side` বা `s.w * s.h` রিটার্ন করো।',
        starterCode: `import * as fs from 'fs';\ninterface Square { kind: 'S'; a: number; }\ninterface Rect { kind: 'R'; w: number; h: number; }\ntype Shape = Square | Rect;\nfunction area(s: Shape): number { return s.kind === 'S' ? s.a * s.a : s.w * s.h; }\nconst toks = fs.readFileSync(0, 'utf8').trim().split(/\\s+/);\nlet p = 0, n = Number(toks[p++]), tot = 0;\nfor (let i = 0; i < n; i++) {\n  const t = toks[p++];\n  const sh: Shape = t === 'S' ? { kind: 'S', a: Number(toks[p++]) } : { kind: 'R', w: Number(toks[p++]), h: Number(toks[p++]) };\n  tot += area(sh);\n}\nconsole.log(tot);`,
        sampleStdin: '2\nR 4 5\nS 6',
        expectedOutput: '56',
      },
      {
        id: 'ts-ch16-p4',
        difficulty: 'Medium',
        title: 'Nullish Coalescing Deep Clone Guard',
        prompt: 'Clone a nested object with `structuredClone`, apply an optional override if non-null, and verify original stays untouched.',
        banglaHint: '`const next = structuredClone(base);` ব্যবহার করে মূল অবজেক্ট নিরাপদ রাখো।',
        starterCode: `import * as fs from 'fs';\nconst addVal = Number(fs.readFileSync(0, 'utf8').trim());\nconst base = { nested: { list: [1, 2] } };\nconst copy = structuredClone(base);\ncopy.nested.list.push(addVal);\nconsole.log(base.nested.list.length + ' ' + copy.nested.list.length);`,
        sampleStdin: '99',
        expectedOutput: '2 3',
      },
      {
        id: 'ts-ch16-p5',
        difficulty: 'Hard',
        title: 'Exhaustive Result Evaluator via `never` Check',
        prompt: 'Write `evalResult(r: Ok | Fail)` with an exhaustive `switch (r.kind)` and `default: const _: never = r` helper over `n` commands.',
        banglaHint: '`kind` অনুযায়ী `"ok"`-এ মান যোগ এবং `"fail"`-এ জিরো ধরো।',
        starterCode: `import * as fs from 'fs';\ninterface Ok { kind: 'ok'; val: number; }\ninterface Fail { kind: 'fail'; reason: string; }\ntype Res = Ok | Fail;\nfunction valOf(r: Res): number {\n  switch (r.kind) {\n    case 'ok': return r.val;\n    case 'fail': return 0;\n    default: { const _exhaustive: never = r; return _exhaustive; }\n  }\n}\nconst toks = fs.readFileSync(0, 'utf8').trim().split(/\\s+/);\nlet p = 0, n = Number(toks[p++]), sum = 0;\nfor (let i = 0; i < n; i++) {\n  const k = toks[p++];\n  const r: Res = k === 'ok' ? { kind: 'ok', val: Number(toks[p++]) } : { kind: 'fail', reason: toks[p++] };\n  sum += valOf(r);\n}\nconsole.log(sum);`,
        sampleStdin: '3\nok 15\nfail timeout\nok 25',
        expectedOutput: '40',
      },
    ],
    miniBuild: {
      title: 'Mini-Build: Readonly Ledger Snapshot & Union Command Runner',
      description: 'Combine `readonly` array guards with discriminated union actions (`add` / `sub`) to preserve initial state snapshots.',
      banglaGoal: '`readonly` ও ডিসক্রিমিনেটেড ইউনিয়ন একত্রে ব্যবহার করে স্টেট স্ন্যাপশট কমান্ড রানার বানাও।',
      combinesChapters: "Ch 11, 14, 16",
      starterCode: `import * as fs from 'fs';\ninterface AddAct { kind: 'inc'; x: number; }\ninterface SubAct { kind: 'dec'; x: number; }\ntype Act = AddAct | SubAct;\nfunction apply(cur: number, a: Act): number { return a.kind === 'inc' ? cur + a.x : cur - a.x; }\nconst toks = fs.readFileSync(0, 'utf8').trim().split(/\\s+/);\nconst init: readonly number[] = [Number(toks[0])];\nlet val = init[0];\nfor (let i = 1; i + 1 < toks.length; i += 2) {\n  const act: Act = toks[i] === 'inc' ? { kind: 'inc', x: Number(toks[i + 1]) } : { kind: 'dec', x: Number(toks[i + 1]) };\n  val = apply(val, act);\n}\nconsole.log(init[0] + ' -> ' + val);`,
      sampleStdin: '10 inc 5 dec 3',
      expectedOutput: '10 -> 12',
    },
    starterCode: `import * as fs from 'fs';\ninterface AddAct { kind: 'inc'; x: number; }\ninterface SubAct { kind: 'dec'; x: number; }\ntype Act = AddAct | SubAct;\nfunction apply(cur: number, a: Act): number { return a.kind === 'inc' ? cur + a.x : cur - a.x; }\nconst toks = fs.readFileSync(0, 'utf8').trim().split(/\\s+/);\nconst init: readonly number[] = [Number(toks[0])];\nlet val = init[0];\nfor (let i = 1; i + 1 < toks.length; i += 2) {\n  const act: Act = toks[i] === 'inc' ? { kind: 'inc', x: Number(toks[i + 1]) } : { kind: 'dec', x: Number(toks[i + 1]) };\n  val = apply(val, act);\n}\nconsole.log(init[0] + ' -> ' + val);`,
    sampleStdin: '10 inc 5 dec 3',
    expectedSampleOutput: '10 -> 12',
    testCases: [
      { id: 'ts16-t1', input: '10 inc 5 dec 3', expectedOutput: '10 -> 12' },
      { id: 'ts16-t2', input: '0 inc 8 inc 2', expectedOutput: '0 -> 10', isHidden: true },
    ],
  },
  17: {
    chapterNumber: 17,
    title: 'Heap vs. Stack, Closures & Typed WeakMap Memory in TS',
    banglaTitle: 'হিপ বনাম স্ট্যাক, ক্লোজার ও WeakMap মেমোরি (TypeScript)',
    subtitle: 'V8 heap closures, typed Generator iterators, WeakMap<object, T>, and bounded buffers',
    zeroIntuition: {
      plainEnglishStory:
        'Underneath its type system, TypeScript runs on JavaScript’s Stack + Heap model: active call frames and primitive values live briefly on the Call Stack, whereas objects, typed arrays, and closure contexts occupy the GC-managed Heap.\n\nTyped generators (`Generator<number, void, unknown>`) keep iteration memory at `O(1)` rather than allocating large arrays, while `WeakMap<object, Meta>` enforces object-only keys so cached metadata automatically vanishes once keys become unreachable—preventing hidden memory leaks.',
      asciiFlowchart:
        'Stack Frame [ fn ] --closure ref--> Heap [ private state ]\nWeakMap<SessionObj, Meta> -> auto-collected when SessionObj = null',
      pseudocode: ["function makeCounter(n: number): () => number -> heap closure","const meta = new WeakMap<object, number>() -> GC-safe lookup"],
      banglaZeroToHero: {
        analogyTitle: 'স্ট্যাক হলো অস্থায়ী খাতা, আর ক্লোজার ও WeakMap হলো স্মার্ট হিপ সংরক্ষণাগার',
        explanation:
          'টাইপস্ক্রিপ্টের টাইপগুলো কম্পাইল শেষে জাভাস্ক্রিপ্টে রূপান্তরিত হয় বলে রানটাইমে মেমোরি V8 ইঞ্জিনের স্ট্যাক এবং হিপ মডেলেই কাজ করে। প্রতিটি ফাংশন কল হলে কল স্ট্যাকে লোকাল ফ্রেম তৈরি হয় এবং রিটার্ন করলে মুছে যায়, কিন্তু কোনো ফাংশন ভেতর থেকে আরেকটি ফাংশন রিটার্ন করলে (Closure) বাইরের ভ্যারিয়েবলটি হিপে উঠে গিয়ে জীবিত থাকে। বিশাল ডেটা প্রসেস করার সময় পুরো অ্যারে মেমোরিতে লোড না করে টাইপড জেনারেটর ফাংশন (`function*`) ব্যবহার করলে প্রতিবার একটি করে মান তৈরি হয় এবং হিপ খরচ O(1) থাকে। অবজেক্টের সাথে অতিরিক্ত মেটাডেটা বা ক্যাশ সেভ করে রাখার সময় সাধারণ `Map<object, Meta>` ব্যবহার করলে মূল অবজেক্ট বাতিল হলেও `Map` তাকে আটকে রেখে মেমোরি লিক ঘটায়। এর বদলে `WeakMap<object, Meta>` ব্যবহার করলে টাইপস্ক্রিপ্ট শুধু অবজেক্ট কী অনুমোদন করে এবং মূল অবজেক্ট বাদ পড়ার সাথে সাথে GC তা পরিষ্কার করে ফেলে। এছাড়া লুপের মধ্যে স্ট্রিং কনক্যাটেনেশন এড়িয়ে অ্যারে বাফারে পুশ করে `.join()` করা মেমোরির জন্য অনেক স্বাস্থ্যকর। আজকের অধ্যায়ে ক্লোজার, জেনারেটর এবং WeakMap দিয়ে মেমোরি-সাশ্রয়ী টাইপস্ক্রিপ্ট কোড লেখা শিখবে।',
        everydayExample: 'কোনো অতিথির হোটেলের রুম কার্ড তার চেকআউটের সাথে সাথেই অকার্যকর (`WeakMap`) হয়ে যায় যেন পুরোনো কার্ডে জায়গা আটকে না থাকে।',
        keyTakeaways: [
          '`function*` জেনারেটর অযথা বিশাল ইন্টারমিডিয়েট অ্যারে বানানো ছাড়াই O(1) মেমোরিতে স্ট্রিম প্রসেস করে।',
          '`WeakMap<object, T>`-এ কেবল অবজেক্টই কী হতে পারে এবং মূল অবজেক্ট ডিলিট হলে এন্ট্রিও GC-তে মুছে যায়।',
          'টাইট লুপে স্ট্রিং `+` না করে `string[]` বাফারে `.push` করে শেষে `.join()` করলে GC প্রেসার কমে।',
        ],
      },
    },
    topics: [
      {
        id: 'ts-ch17-t1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Typed Heap Closure Factory',
        englishParagraphs: [
          'Return a strictly typed `() => number` closure from `makeCounter`, keeping independent private state on the heap for each instance.',
        ],
        banglaParagraphs: [
          'টাইপ-সেফ ক্লোজার ফ্যাক্টরি বানিয়ে দেখো কীভাবে প্রতিটি ইনস্ট্যান্স আলাদাভাবে নিজের মান মনে রাখে।',
        ],
        memoryDiagram: 'a -> Closure{n:12}, b -> Closure{n:1}',
        code: `function makeCounter(start: number): () => number {\n  let n = start;\n  return () => ++n;\n}\nconst a = makeCounter(10);\nconst b = makeCounter(0);\nconsole.log(a() + ' ' + a() + ' ' + b());`,
        stdin: '',
        expectedOutput: '11 12 1',
        lineByLine: [
          {"lineNumber":"Line 1","codeSnippet":"function makeCounter(start: number): () => number {","whatItMeans":"Declares typed closure factory returning parameterless numeric fn.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Helper missing."},
          {"lineNumber":"Line 2","codeSnippet":"  let n = start;","whatItMeans":"Captured variable lives in heap context across returned calls.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Counter state absent."},
        ],
      },
      {
        id: 'ts-ch17-t2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Lazy Generator Pipeline in O(1) Heap Space',
        englishParagraphs: [
          'Use `function* positives(nums: readonly number[]): Generator<number>` to square positive values lazily without allocating a temporary array.',
        ],
        banglaParagraphs: [
          '`function*` জেনারেটর দিয়ে বাড়তি অ্যারে তৈরি না করেই ইনপুট স্ট্রিম ফিল্টার ও যোগ করো।',
        ],
        memoryDiagram: 'Generator<number> -> yields one square per step',
        code: `import * as fs from 'fs';\nfunction* positives(nums: readonly number[]): Generator<number> {\n  for (const x of nums) {\n    if (x > 0) yield x * x;\n  }\n}\nconst nums = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);\nlet sum = 0;\nfor (const sq of positives(nums)) sum += sq;\nconsole.log(sum);`,
        stdin: '-3 2 0 4 -1 5',
        expectedOutput: '45',
        lineByLine: [
          {"lineNumber":"Line 2","codeSnippet":"function* positives(nums: readonly number[]): Generator<number> {","whatItMeans":"Lazily yields matching values on demand.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Stream helper unavailable."},
          {"lineNumber":"Line 4","codeSnippet":"    if (x > 0) yield x * x;","whatItMeans":"Suspends execution and returns squared value without intermediate array.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Nothing yielded."},
        ],
      },
      {
        id: 'ts-ch17-t3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Typed WeakMap Session Metadata Cache',
        englishParagraphs: [
          'Associate metadata `{ hits: number }` with object handles using `WeakMap<object, { hits: number }>` so GC stays unblocked.',
        ],
        banglaParagraphs: [
          '`WeakMap<object, ...>` দিয়ে অবজেক্টের মেটাডেটা নিরাপদে সংরক্ষণ করো যেন মেমোরি লিক না হয়।',
        ],
        memoryDiagram: 'WeakMap<object, Meta> -> nulling reference frees entry',
        code: `interface Meta { hits: number; }\nconst cache = new WeakMap<object, Meta>();\nlet u1: { id: number } | null = { id: 1 };\nconst u2 = { id: 2 };\ncache.set(u1, { hits: 4 });\ncache.set(u2, { hits: 7 });\nconsole.log((cache.get(u1)?.hits ?? 0) + (cache.get(u2)?.hits ?? 0));\nu1 = null;\nconsole.log(cache.has(u2));`,
        stdin: '',
        expectedOutput: '11\ntrue',
        lineByLine: [
          {"lineNumber":"Line 2","codeSnippet":"const cache = new WeakMap<object, Meta>();","whatItMeans":"Requires object keys and holds weak GC-friendly references.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Strong `Map` could retain dead sessions forever."},
          {"lineNumber":"Line 8","codeSnippet":"u1 = null;","whatItMeans":"Drops last strong ref so `u1` and its metadata become collectable.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Reference stays live."},
        ],
      },
      {
        id: 'ts-ch17-t4',
        badge: 'Example 4: Bug Trap vs. CP/Production Pattern',
        title: 'Low-Allocation Array Join Builder',
        englishParagraphs: [
          'Collect formatted strings in a typed `string[]` array and call `.join("-")` once to minimize temporary heap string allocations.',
        ],
        banglaParagraphs: [
          'লুপে বারবার `+` না করে `string[]` অ্যারেতে রেখে শেষে `.join("-")` করলে মেমোরি চাপ অনেক কমে।',
        ],
        memoryDiagram: 'parts: string[] -> single allocation on parts.join("-")',
        code: `import * as fs from 'fs';\nconst n = Number(fs.readFileSync(0, 'utf8').trim());\nconst parts: string[] = [];\nfor (let i = 1; i <= n; i++) parts.push('#' + i);\nconsole.log(parts.join('-'));`,
        stdin: '4',
        expectedOutput: '#1-#2-#3-#4',
        lineByLine: [
          {"lineNumber":"Line 3","codeSnippet":"const parts: string[] = [];","whatItMeans":"Buffers string pieces prior to single final join.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"No buffer array."},
        ],
      },
    ],
    lineByLineAnatomy: [
      {"lineNumber":"Line 1","codeSnippet":"function makeCounter(start: number): () => number {","whatItMeans":"Factory signature.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Function undefined."},
      {"lineNumber":"Line 2","codeSnippet":"  let n = start;","whatItMeans":"Closure state lifted onto heap.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"`n` undefined."},
      {"lineNumber":"Line 3","codeSnippet":"  return () => ++n;","whatItMeans":"Captures and updates `n` per call.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"No closure returned."},
      {"lineNumber":"Line 7","codeSnippet":"console.log(a() + ' ' + a() + ' ' + b());","whatItMeans":"Invokes independent closures.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"No stdout."},
    ],
    dryRunTable: [
      { step: 1, state: 'a = makeCounter(10)', memoryOrStack: 'a -> Heap{n:10}', note: 'Factory returns; closure keeps n alive' },
      { step: 2, state: 'b = makeCounter(0)', memoryOrStack: 'b -> Heap{n:0}', note: 'Independent heap slot' },
      { step: 3, state: 'a(), a()', memoryOrStack: '11, 12', note: 'Mutates only a closure' },
      { step: 4, state: 'b()', memoryOrStack: '1', note: 'Outputs 11 12 1' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: Using Primitive Strings as Keys Inside `WeakMap`',
        brokenCode: 'const wm = new WeakMap<string, number>(); // Type error + runtime TypeError!',
        fixedCode: 'const m = new Map<string, number>();',
        whyItBreaks: '`WeakMap` keys MUST be garbage-collectable objects, never primitive strings or numbers.',
      },
      {
        title: 'Trap 2: Reusing an Exhausted Generator Without Re-Invoking',
        brokenCode: 'const g = gen(); for (const x of g) {} for (const x of g) {} // second loop runs 0 times!',
        fixedCode: 'for (const x of gen()) {} // invoke generator freshly when needed',
        whyItBreaks: 'Once a generator reaches `done: true`, calling it again yields zero items.',
      },
      {
        title: 'Trap 3: Retaining Dead Closures Inside Global Event Arrays',
        brokenCode: 'const listeners: Array<() => void> = []; // pushed on every mount, never cleared',
        fixedCode: '// unsubscribe or bound size when components unmount',
        whyItBreaks: 'Retained closures pin entire parent lexical scopes on the V8 heap.',
      },
    ],
    practiceSheet: [
      {
        id: 'ts-ch17-p1',
        difficulty: 'Easy',
        title: 'Typed Closure Step Accumulator',
        prompt: 'Write `makeAdder(start: number): (x: number) => number` and print running totals for each subsequent stdin integer.',
        banglaHint: '`let sum = start; return (x: number) => { sum += x; return sum; };` লিখো।',
        starterCode: `import * as fs from 'fs';\nfunction makeAdder(start: number): (x: number) => number {\n  let sum = start;\n  return (x: number) => { sum += x; return sum; };\n}\nconst nums = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);\nconst add = makeAdder(nums[0]);\nconst out: number[] = [];\nfor (let i = 1; i < nums.length; i++) out.push(add(nums[i]));\nconsole.log(out.join(' '));`,
        sampleStdin: '10 3 7 5',
        expectedOutput: '13 20 25',
      },
      {
        id: 'ts-ch17-p2',
        difficulty: 'Easy',
        title: 'Lazy Typed Fibonacci Generator',
        prompt: 'Yield the first `k` Fibonacci numbers (`0, 1, 1, 2, ...`) from a `Generator<number>` and print their sum.',
        banglaHint: '`yield a` দিয়ে `k` বার লুপ চালিয়ে যোগফল বের করো।',
        starterCode: `import * as fs from 'fs';\nfunction* fib(k: number): Generator<number> {\n  let a = 0, b = 1;\n  for (let i = 0; i < k; i++) { yield a; const t = a + b; a = b; b = t; }\n}\nconst k = Number(fs.readFileSync(0, 'utf8').trim());\nlet sum = 0;\nfor (const v of fib(k)) sum += v;\nconsole.log(sum);`,
        sampleStdin: '6',
        expectedOutput: '12',
      },
      {
        id: 'ts-ch17-p3',
        difficulty: 'Medium',
        title: 'WeakMap Typed Node Metadata Sum',
        prompt: 'Attach `{ weight: number }` entries to two temporary objects in `WeakMap<object, { weight: number }>` and print total weight.',
        banglaHint: '`WeakMap<object, { weight: number }>` ব্যবহার করো।',
        starterCode: `import * as fs from 'fs';\nconst [w1, w2] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);\nconst wm = new WeakMap<object, { weight: number }>();\nconst n1 = { id: 1 }, n2 = { id: 2 };\nwm.set(n1, { weight: w1 });\nwm.set(n2, { weight: w2 });\nconsole.log((wm.get(n1)?.weight ?? 0) + (wm.get(n2)?.weight ?? 0));`,
        sampleStdin: '14 28',
        expectedOutput: '42',
      },
      {
        id: 'ts-ch17-p4',
        difficulty: 'Medium',
        title: 'Bounded Ring Buffer Cache',
        prompt: 'Write `m` values into a fixed-length `k` buffer (`buf[i % k] = x`) and output sum of the retained `k` slots.',
        banglaHint: '`const buf: number[] = new Array(k).fill(0);` ব্যবহার করে মডুলো ইনডেক্সে লেখো।',
        starterCode: `import * as fs from 'fs';\nconst nums = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);\nconst k = nums[0];\nconst buf: number[] = new Array(k).fill(0);\nfor (let i = 1; i < nums.length; i++) buf[(i - 1) % k] = nums[i];\nconsole.log(buf.reduce((a, b) => a + b, 0));`,
        sampleStdin: '3 1 2 3 10 20',
        expectedOutput: '33',
      },
      {
        id: 'ts-ch17-p5',
        difficulty: 'Hard',
        title: 'Memoized Closure Helper with Eviction Cap',
        prompt: 'Wrap a closure cache capped at `cap` keys using `Map<number, number>` (`keys().next().value` eviction) and count total cache hits across queries.',
        banglaHint: '`cache.size >= cap` হলে সবচেয়ে পুরোনো `cache.keys().next().value` ডিলিট করো।',
        starterCode: `import * as fs from 'fs';\nconst nums = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);\nconst cap = nums[0];\nconst cache = new Map<number, number>();\nlet hits = 0;\nfor (let i = 1; i < nums.length; i++) {\n  const x = nums[i];\n  if (cache.has(x)) { hits++; }\n  else {\n    if (cache.size >= cap) {\n      const first = cache.keys().next().value;\n      if (first !== undefined) cache.delete(first);\n    }\n    cache.set(x, x * x);\n  }\n}\nconsole.log(hits);`,
        sampleStdin: '2 1 2 1 3 1',
        expectedOutput: '1',
      },
    ],
    miniBuild: {
      title: 'Mini-Build: Zero-Bloat Stream Aggregator',
      description: 'Combine a typed lazy generator with a heap closure stats collector to aggregate positive numbers in O(1) extra space.',
      banglaGoal: 'টাইপড জেনারেটর এবং ক্লোজার স্ট্যাটস ফাংশন মিলিয়ে মেমোরি-সাশ্রয়ী এগ্রিগেটর বানাও।',
      combinesChapters: "Ch 9, 15, 17",
      starterCode: `import * as fs from 'fs';\nfunction* validEvents(nums: readonly number[]): Generator<number> {\n  for (const x of nums) if (x > 0) yield x;\n}\nfunction makeStats() {\n  let cnt = 0, sum = 0;\n  return {\n    push: (x: number) => { cnt++; sum += x; },\n    read: () => cnt + ':' + sum,\n  };\n}\nconst stats = makeStats();\nconst nums = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);\nfor (const v of validEvents(nums)) stats.push(v);\nconsole.log(stats.read());`,
      sampleStdin: '-5 10 0 15 20',
      expectedOutput: '3:45',
    },
    starterCode: `import * as fs from 'fs';\nfunction* validEvents(nums: readonly number[]): Generator<number> {\n  for (const x of nums) if (x > 0) yield x;\n}\nfunction makeStats() {\n  let cnt = 0, sum = 0;\n  return {\n    push: (x: number) => { cnt++; sum += x; },\n    read: () => cnt + ':' + sum,\n  };\n}\nconst stats = makeStats();\nconst nums = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);\nfor (const v of validEvents(nums)) stats.push(v);\nconsole.log(stats.read());`,
    sampleStdin: '-5 10 0 15 20',
    expectedSampleOutput: '3:45',
    testCases: [
      { id: 'ts17-t1', input: '-5 10 0 15 20', expectedOutput: '3:45' },
      { id: 'ts17-t2', input: '1 2 3 -9', expectedOutput: '3:6', isHidden: true },
    ],
  },
  18: {
    chapterNumber: 18,
    title: 'TypeScript Chapter 18: Classes, Private Fields & Invariant Constructors',
    banglaTitle: 'TypeScript অধ্যায় ১৮: ক্লাস, প্রাইভেট ফিল্ড ও কনস্ট্রাক্টর ইনভ্যারিয়েন্ট',
    subtitle: 'Encapsulate mutable state behind private fields, invariant-enforcing constructors, and explicit method return types.',
    zeroIntuition: {
      plainEnglishStory:
        'When plain object literals pass from function to function, any caller can accidentally assign a negative balance or corrupt a counter. TypeScript classes bundle data fields and validated operations into a single blueprint where invariants are checked in one place.\n\nMarking internal properties private prevents external code from mutating state behind the class’s back at compile time, while constructors guarantee every new instance starts valid and every method explicitly types its parameters and return value.',
      asciiFlowchart: `  [ new Wallet(100) ] ---> constructor validates initial >= 0
          |
          +--> private balance: number  (hidden from outside callers)
          +--> deposit(amt) / withdraw(amt) ---> enforces balance >= 0`,
      pseudocode: [
        '1. DECLARE class with private state fields initialized cleanly',
        '2. VALIDATE starting state inside constructor(initialValue)',
        '3. EXPOSE typed methods that guard every state transition',
        '4. RETURN formatted summary via read-only getter method',
      ],
      banglaZeroToHero: {
        analogyTitle: 'লকারওয়ালা ব্যাংকের ভল্ট ও ক্লাস এনক্যাপসুলেশন',
        explanation:
          'ধরো তুমি একটি ই-ওয়ালেট সিস্টেম বানাচ্ছো যেখানে সবার ব্যালেন্স সাধারণ অবজেক্টে খোলা পড়ে আছে। যে কেউ ভুল করে wallet.balance = -500 লিখে দিলে পুরো হিসাব নষ্ট হয়ে যাবে। TypeScript-এর class ঠিক একটি সুরক্ষিত ব্যাংক ভল্টের মতো কাজ করে। এর ভেতরে private ফিল্ড দিলে বাইরের কোনো কোড সরাসরি ব্যালেন্স বদলাতে পারে না। কেবল constructor-এর মাধ্যমে বৈধ প্রাথমিক মান নিয়ে অবজেক্ট তৈরি হয়। এরপর deposit এবং withdraw মেথডের ভেতরে শর্ত যাচাই করে তবেই ব্যালেন্স পরিবর্তন করা যায়। এর ফলে পুরো অ্যাপ্লিকেশনে ডেটার নিরাপত্তা বা invariant সবসময় অটুট থাকে। বড় সফটওয়্যার টিমে কাজ করার সময় কম্পাইলারই ভুল অ্যাক্সেস ধরে দেয় বলে রানটাইম বাগ অনেক কমে যায়। মেথডের রিটার্ন টাইপ স্পষ্ট থাকলে আইডিই অটো-কমপ্লিটও দারুণভাবে সাহায্য করে। সহজ কথায়, ডেটা আর নিয়মকানুনকে একসাথে নিরাপদ বাক্সে ভরে রাখাই ক্লাস এনক্যাপসুলেশন।',
        everydayExample: 'এটিএম মেশিন: সরাসরি ক্যাশ ড্রয়ারে হাত না দিয়ে কেবল পিন ও বাটনের নিয়মে টাকা তোলা যায়।',
        keyTakeaways: [
          'private ফিল্ড বাইরে থেকে সরাসরি পরিবর্তন করা যায় না।',
          'constructor-এ ইনপুট ভ্যালিডেট করলে অবজেক্ট জন্ম থেকেই বৈধ থাকে।',
          'মেথডের রিটার্ন টাইপ দিলে স্টেট আপডেট নিরাপদ ও অনুমানযোগ্য হয়।',
        ],
      },
    },
    topics: [
      {
        id: 'ts-ch-18-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Encapsulated Counter Class With Private State',
        englishParagraphs: [
          'A private field keeps the internal count protected from accidental reassignment outside the class.',
          'Explicit constructor assignment works identically in TypeScript and compiled JavaScript.',
        ],
        banglaParagraphs: [
          'private count ফিল্ড বাইরের সরাসরি পরিবর্তন আটকায়, আর মেথড দিয়ে নিরাপদে মান বাড়ানো যায়।',
        ],
        memoryDiagram: `Heap Instance { count: 0 -> 1 -> 2 } accessed only via inc()/value()`,
        code: `class SafeCounter {
  private count: number = 0;
  constructor(start: number) {
    this.count = start >= 0 ? start : 0;
  }
  inc(step: number): void {
    if (step > 0) this.count += step;
  }
  value(): number {
    return this.count;
  }
}
const c = new SafeCounter(5);
c.inc(3);
console.log(c.value());`,
        stdin: '',
        expectedOutput: '8',
        lineByLine: [
          {
            lineNumber: 'Line 1',
            codeSnippet: 'class SafeCounter {',
            whatItMeans: 'Defines a blueprint for counter instances.',
            whyItIsThere: 'Groups private state and transition methods together.',
            ifDeletedError: 'Cannot instantiate SafeCounter with new.',
          },
          {
            lineNumber: 'Line 2',
            codeSnippet: 'private count: number = 0;',
            whatItMeans: 'Declares an encapsulated numeric field hidden from external callers.',
            whyItIsThere: 'Prevents callers from bypassing inc() validation.',
            ifDeletedError: 'Property count does not exist on type SafeCounter.',
          },
        ],
      },
      {
        id: 'ts-ch-18-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Stdin Wallet Command Processor',
        englishParagraphs: [
          'Read an initial balance and transaction deltas from stdin, rejecting invalid negative withdrawals.',
        ],
        banglaParagraphs: [
          'stdin থেকে শুরু ব্যালেন্স ও লেনদেনের ধাপ পড়ে ক্লাস মেথড দিয়ে নিরাপদ হিসাব রাখো।',
        ],
        memoryDiagram: `Wallet(100) --(+50)--> 150 --(-200 ignored)--> 150 --(-40)--> 110`,
        code: `import * as fs from 'fs';
class Wallet {
  private bal: number = 0;
  constructor(init: number) {
    this.bal = init >= 0 ? init : 0;
  }
  apply(delta: number): void {
    if (this.bal + delta >= 0) this.bal += delta;
  }
  read(): number {
    return this.bal;
  }
}
const nums = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
const w = new Wallet(nums[0] ?? 0);
for (let i = 1; i < nums.length; i++) w.apply(nums[i]);
console.log(w.read());`,
        stdin: '100 50 -200 -40',
        expectedOutput: '110',
        lineByLine: [
          {
            lineNumber: 'Line 7',
            codeSnippet: 'if (this.bal + delta >= 0) this.bal += delta;',
            whatItMeans: 'Invariant guard rejecting overdrafts.',
            whyItIsThere: 'Guarantees balance never drops below zero.',
            ifDeletedError: 'Negative balances slip through invalid withdrawals.',
          },
        ],
      },
      {
        id: 'ts-ch-18-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Bounded Ring Buffer Queue Class',
        englishParagraphs: [
          'Classes cleanly enforce fixed capacity limits for telemetry buffers and task queues.',
        ],
        banglaParagraphs: [
          'নির্দিষ্ট ক্যাপাসিটির মধ্যে লগ বা ইভেন্ট ধরে রাখতে ক্লাস ইনভ্যারিয়েন্ট দারুণ কার্যকর।',
        ],
        memoryDiagram: `BoundedLog(cap=3): [10, 20, 30] (drop oldest on 40) -> [20, 30, 40]`,
        code: `import * as fs from 'fs';
class BoundedLog {
  private cap: number = 1;
  private items: number[] = [];
  constructor(cap: number) {
    this.cap = cap > 0 ? cap : 1;
  }
  push(v: number): void {
    if (this.items.length >= this.cap) this.items.shift();
    this.items.push(v);
  }
  summary(): string {
    return this.items.join(',');
  }
}
const nums = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
const log = new BoundedLog(nums[0]);
for (let i = 1; i < nums.length; i++) log.push(nums[i]);
console.log(log.summary());`,
        stdin: '3 10 20 30 40 50',
        expectedOutput: '30,40,50',
        lineByLine: [
          {
            lineNumber: 'Line 8',
            codeSnippet: 'if (this.items.length >= this.cap) this.items.shift();',
            whatItMeans: 'Evicts oldest item before pushing when full.',
            whyItIsThere: 'Keeps memory bounded at cap elements.',
            ifDeletedError: 'Buffer grows unbounded past capacity.',
          },
        ],
      },
      {
        id: 'ts-ch-18-topic-4',
        badge: 'Example 4: Bug Trap vs. Production Pattern',
        title: 'Immutable Snapshot Method vs. Leaking Internal Array',
        englishParagraphs: [
          'Returning a private array directly lets callers mutate it with .push(). Always copy or aggregate before returning.',
        ],
        banglaParagraphs: [
          'প্রাইভেট অ্যারের সরাসরি রেফারেন্স রিটার্ন করলে বাইরের কোড .push() দিয়ে তা বদলে দিতে পারে; তাই কপি রিটার্ন করো।',
        ],
        memoryDiagram: `this.scores (private) -> slice() copy returned -> external push cannot corrupt class`,
        code: `class GradeBook {
  private scores: number[] = [];
  add(x: number): void {
    if (x >= 0 && x <= 100) this.scores.push(x);
  }
  snapshot(): number[] {
    return this.scores.slice();
  }
}
const gb = new GradeBook();
gb.add(85);
gb.add(92);
const copy = gb.snapshot();
copy.push(999);
console.log(gb.snapshot().join(','));`,
        stdin: '',
        expectedOutput: '85,92',
        lineByLine: [
          {
            lineNumber: 'Line 6',
            codeSnippet: 'return this.scores.slice();',
            whatItMeans: 'Returns a shallow clone instead of the private backing array.',
            whyItIsThere: 'Prevents aliasing bugs from external mutations.',
            ifDeletedError: 'Caller push(999) corrupts internal GradeBook scores.',
          },
        ],
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 1',
        codeSnippet: 'class SafeCounter {',
        whatItMeans: 'Defines a blueprint for counter instances.',
        whyItIsThere: 'Groups private state and transition methods together.',
        ifDeletedError: 'Cannot instantiate SafeCounter with new.',
      },
      {
        lineNumber: 'Line 2',
        codeSnippet: 'private count: number = 0;',
        whatItMeans: 'Declares an encapsulated numeric field hidden from external callers.',
        whyItIsThere: 'Prevents callers from bypassing inc() validation.',
        ifDeletedError: 'Property count does not exist on type SafeCounter.',
      },
      {
        lineNumber: 'Line 3',
        codeSnippet: 'constructor(start: number) {',
        whatItMeans: 'Runs automatically on new SafeCounter(...) to initialize valid state.',
        whyItIsThere: 'Clamps negative starting counts to 0 at creation time.',
        ifDeletedError: 'Constructor arguments cannot initialize instance state.',
      },
      {
        lineNumber: 'Line 6',
        codeSnippet: 'inc(step: number): void {',
        whatItMeans: 'Typed mutator method returning nothing (void).',
        whyItIsThere: 'Enforces positive increment invariants.',
        ifDeletedError: 'Counter has no controlled way to advance.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'new SafeCounter(5)', memoryOrStack: 'Heap { count: 5 }', note: '5 >= 0 passes guard' },
      { step: 2, state: 'c.inc(3)', memoryOrStack: 'Heap { count: 8 }', note: '3 > 0 adds 3' },
      { step: 3, state: 'c.inc(-2)', memoryOrStack: 'Heap { count: 8 }', note: 'Negative step ignored' },
      { step: 4, state: 'c.value()', memoryOrStack: 'returns 8', note: 'Encapsulated read' },
    ],
    harryBugTraps: [
      {
        title: 'Returning Internal Array Reference Without Copying',
        brokenCode: `getItems() { return this.items; }`,
        fixedCode: `getItems(): number[] { return this.items.slice(); }`,
        whyItBreaks: 'Callers mutating the returned array bypass validation and corrupt private state.',
      },
      {
        title: 'Skipping Constructor Invariant Clamping',
        brokenCode: `constructor(n: number) { this.cap = n; }`,
        fixedCode: `constructor(n: number) { this.cap = n > 0 ? n : 1; }`,
        whyItBreaks: 'Zero or negative capacities break queue eviction or divide-by-zero checks later.',
      },
      {
        title: 'Forgetting this. Inside Class Methods',
        brokenCode: `inc(v: number) { count += v; }`,
        fixedCode: `inc(v: number): void { this.count += v; }`,
        whyItBreaks: 'Without this., TypeScript fails with Cannot find name count.',
      },
    ],
    practiceSheet: [
      {
        id: 'ts-ch-18-p1',
        difficulty: 'Easy',
        title: 'Positive Step Accumulator Class',
        prompt: 'Read n space-separated integers into an Accumulator class that adds only positive numbers and prints total.',
        banglaHint: 'ইঙ্গিত: class Accumulator বানিয়ে private total: number = 0 রাখো এবং x > 0 হলে যোগ করো।',
        starterCode: `import * as fs from 'fs';
class Accumulator {
  private total: number = 0;
  add(x: number): void {
    if (x > 0) this.total += x;
  }
  read(): number {
    return this.total;
  }
}
const nums = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
const acc = new Accumulator();
for (const x of nums) acc.add(x);
console.log(acc.read());`,
        sampleStdin: '4 -2 6 0 5',
        expectedOutput: '15',
      },
      {
        id: 'ts-ch-18-p2',
        difficulty: 'Easy',
        title: 'Clamped Thermostat Class',
        prompt: 'Start temperature at 20; clamp every adjustment between 15 and 30 inclusive and print final value.',
        banglaHint: 'ইঙ্গিত: adjust(delta) মেথডে Math.min(30, Math.max(15, this.temp + delta)) ব্যবহার করো।',
        starterCode: `import * as fs from 'fs';
class Thermostat {
  private temp: number = 20;
  adjust(delta: number): void {
    this.temp = Math.min(30, Math.max(15, this.temp + delta));
  }
  read(): number {
    return this.temp;
  }
}
const deltas = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
const t = new Thermostat();
for (const d of deltas) t.adjust(d);
console.log(t.read());`,
        sampleStdin: '5 20 -4',
        expectedOutput: '26',
      },
      {
        id: 'ts-ch-18-p3',
        difficulty: 'Medium',
        title: 'MinStack Class',
        prompt: 'Read operations (P x = push x, O = pop, M = print min). Print M results space-separated.',
        banglaHint: 'ইঙ্গিত: দুটি private অ্যারে stack ও mins রাখো যাতে getMin O(1)-এ কাজ করে।',
        starterCode: `import * as fs from 'fs';
class MinStack {
  private vals: number[] = [];
  private mins: number[] = [];
  push(x: number): void {
    this.vals.push(x);
    const curMin = this.mins.length ? Math.min(this.mins[this.mins.length - 1], x) : x;
    this.mins.push(curMin);
  }
  pop(): void {
    if (this.vals.length) { this.vals.pop(); this.mins.pop(); }
  }
  min(): number {
    return this.mins[this.mins.length - 1];
  }
}
const t = fs.readFileSync(0, 'utf8').trim().split(/\\s+/);
const st = new MinStack();
const out: number[] = [];
let i = 0;
while (i < t.length) {
  if (t[i] === 'P') { st.push(Number(t[i + 1])); i += 2; }
  else if (t[i] === 'O') { st.pop(); i += 1; }
  else { out.push(st.min()); i += 1; }
}
console.log(out.join(' '));`,
        sampleStdin: 'P 5 P 2 M P 1 M O M',
        expectedOutput: '2 1 2',
      },
      {
        id: 'ts-ch-18-p4',
        difficulty: 'Medium',
        title: 'Rate Limiter Window Class',
        prompt: 'Given maxPerSec followed by request timestamps, accept if fewer than maxPerSec occurred within last 10ms, print accepted count.',
        banglaHint: 'ইঙ্গিত: একটি private queue অ্যারে রেখে পুরোনো (ts - 10 >= q[0]) বাদ দাও।',
        starterCode: `import * as fs from 'fs';
class Limiter {
  private limit: number = 1;
  private q: number[] = [];
  constructor(limit: number) { this.limit = limit; }
  allow(ts: number): boolean {
    while (this.q.length && ts - this.q[0] >= 10) this.q.shift();
    if (this.q.length < this.limit) { this.q.push(ts); return true; }
    return false;
  }
}
const nums = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
const lim = new Limiter(nums[0]);
let ok = 0;
for (let i = 1; i < nums.length; i++) if (lim.allow(nums[i])) ok++;
console.log(ok);`,
        sampleStdin: '2 1 3 5 11 12',
        expectedOutput: '3',
      },
      {
        id: 'ts-ch-18-p5',
        difficulty: 'Hard',
        title: 'Bank Ledger With Transfer Guard',
        prompt: 'Start with two balances a b, then operations A->B amount or B->A amount. Print "a b" at end.',
        banglaHint: 'ইঙ্গিত: Ledger ক্লাসে private a, b রেখে transfer() এ পর্যাপ্ত ব্যালেন্স থাকলেই কেবল ট্রান্সফার করো।',
        starterCode: `import * as fs from 'fs';
class Ledger {
  private a: number = 0;
  private b: number = 0;
  constructor(a: number, b: number) { this.a = a; this.b = b; }
  sendAB(amt: number): void { if (amt > 0 && this.a >= amt) { this.a -= amt; this.b += amt; } }
  sendBA(amt: number): void { if (amt > 0 && this.b >= amt) { this.b -= amt; this.a += amt; } }
  read(): string { return this.a + ' ' + this.b; }
}
const t = fs.readFileSync(0, 'utf8').trim().split(/\\s+/);
const led = new Ledger(Number(t[0]), Number(t[1]));
for (let i = 2; i < t.length; i += 2) {
  const amt = Number(t[i + 1]);
  if (t[i] === 'AB') led.sendAB(amt); else led.sendBA(amt);
}
console.log(led.read());`,
        sampleStdin: '100 50 AB 30 AB 90 BA 20',
        expectedOutput: '90 60',
      },
    ],
    miniBuild: {
      title: 'Encapsulated Bank Account Engine',
      description: 'Read initial balance and deposit/withdraw deltas, enforcing non-negative invariant in a private Wallet class.',
      banglaGoal: 'private ফিল্ড ও ইনভ্যারিয়েন্ট-সুরক্ষিত Wallet ক্লাস তৈরি করে নিরাপদ ব্যালেন্স বের করা।',
      combinesChapters: 'Ch 6, 7, 18',
      starterCode: `import * as fs from 'fs';
class Wallet {
  private bal: number = 0;
  constructor(init: number) { this.bal = init >= 0 ? init : 0; }
  apply(delta: number): void { if (this.bal + delta >= 0) this.bal += delta; }
  read(): number { return this.bal; }
}
const nums = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
const w = new Wallet(nums[0] ?? 0);
for (let i = 1; i < nums.length; i++) w.apply(nums[i]);
console.log(w.read());`,
      sampleStdin: '100 50 -200 -40',
      expectedOutput: '110',
    },
    starterCode: `import * as fs from 'fs';
class Wallet {
  private bal: number = 0;
  constructor(init: number) { this.bal = init >= 0 ? init : 0; }
  apply(delta: number): void { if (this.bal + delta >= 0) this.bal += delta; }
  read(): number { return this.bal; }
}
const nums = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
const w = new Wallet(nums[0] ?? 0);
for (let i = 1; i < nums.length; i++) w.apply(nums[i]);
console.log(w.read());`,
    sampleStdin: '100 50 -200 -40',
    expectedSampleOutput: '110',
    testCases: [
      { id: 'ts18-t1', input: '100 50 -200 -40', expectedOutput: '110' },
      { id: 'ts18-t2', input: '20 -30 15', expectedOutput: '35', isHidden: true },
    ],
  },
  19: {
    chapterNumber: 19,
    title: 'TypeScript Chapter 19: Interfaces, Implements & Structural Polymorphism',
    banglaTitle: 'TypeScript অধ্যায় ১৯: ইন্টারফেস, implements ও স্ট্রাকচারাল পলিমরফিজম',
    subtitle: 'Decouple callers from concrete implementations using TypeScript interfaces, implements contracts, and polymorphic arrays.',
    zeroIntuition: {
      plainEnglishStory:
        'An interface in TypeScript defines a behavioral contract—what methods and types an object must provide—without generating any runtime JavaScript overhead. Classes opt into the contract with implements, guaranteeing at compile time that every required method signature matches.\n\nEven better, TypeScript uses structural typing ("duck typing"): any object or class matching the Shape contract can sit inside a single Shape[] array, letting one loop sum areas across Rectangles, Squares, or mock test objects seamlessly.',
      asciiFlowchart: `  [ interface Shape { area(): number } ]  <-- compile-time contract only
          ^                       ^
          | implements            | implements
     [ class Rect ]          [ class Square ]
          \\_______________________/
                      |
            [ shapes: Shape[] ] ---> sum += s.area() (polymorphic dispatch)`,
      pseudocode: [
        '1. DEFINE interface Shape { area(): number } contract',
        '2. IMPLEMENT Shape across Rect and Square classes',
        '3. STORE mixed concrete objects in typed Shape[] array',
        '4. ITERATE Shape[] calling .area() without type branching',
      ],
      banglaZeroToHero: {
        analogyTitle: 'ইউনিভার্সাল প্লাগ ও পলিমরফিক সকেট চুক্তি',
        explanation:
          'ধরো তোমার ঘরে ফ্যান, ল্যাপটপ এবং ফোন চার্জার—তিনটিই একই থ্রি-পিন সকেটে চলে। সকেটের শুধু একটা নিয়ম আছে: প্লাগের পিনগুলোর মাপ ঠিক থাকতে হবে। ভেতরে ফ্যান ঘুরবে নাকি ব্যাটারি চার্জ হবে, তা সকেটের জানার দরকার নেই। TypeScript-এ interface ঠিক সেই প্লাগ-চুক্তি হিসেবে কাজ করে। তুমি যখন interface Shape { area(): number; } লেখো, তখন কম্পাইলার নিশ্চিত করে প্রতিটি আকৃতির ক্লাসে area() মেথড অবশ্যই থাকবে। এরপর Rect আর Square দুটি আলাদা ক্লাস হলেও উভয়কেই একই Shape[] অ্যারেতে রাখা যায়। লুপ চালিয়ে s.area() ডাকলে প্রতিবার সঠিক ক্লাসের হিসাব স্বয়ংক্রিয়ভাবে রান হয়, কোনো বড় if-else ছাড়াই। আর TypeScript কম্পাইল হওয়ার পর interface কোড থেকে পুরোপুরি মুছে যায়, তাই রানটাইমে বাড়তি কোনো মেমোরি খরচও হয় না। নতুন কোনো Triangle ক্লাস যোগ করতে চাইলে পুরোনো যোগফলের ফাংশনে হাতও দিতে হয় না। সফটওয়্যার ডিজাইনে এটাই পলিমরফিজম ও ক্লিন আর্কিটেকচারের মূল শক্তি।',
        everydayExample: 'USB-C পোর্ট: যেকোনো কোম্পানি চার্জার বানাতে পারে, কেবল USB-C ইন্টারফেস মেনে চললেই হলো।',
        keyTakeaways: [
          'interface কেবল কম্পাইল-টাইমে চুক্তি যাচাই করে, রানটাইমে জিরো ওভারহেড।',
          'implements ব্যবহার করলে কোনো মেথড বাদ পড়লে সাথে সাথে এরর দেখায়।',
          'পলিমরফিক অ্যারে (Shape[]) নতুন টাইপ যোগ করা খুব সহজ করে দেয়।',
        ],
      },
    },
    topics: [
      {
        id: 'ts-ch-19-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Shape Interface & Polymorphic Area Sum',
        englishParagraphs: [
          'Both Rect and Square implement Shape, allowing one Shape[] collection to compute the total area uniformly.',
        ],
        banglaParagraphs: [
          'Rect ও Square উভয়ই Shape ইন্টারফেস implement করায় একই অ্যারেতে রেখে area() যোগ করা যায়।',
        ],
        memoryDiagram: `shapes: Shape[] -> [Rect(4,5)->20, Square(6)->36] => total 56`,
        code: `interface Shape { area(): number; }
class Rect implements Shape {
  private w: number = 0;
  private h: number = 0;
  constructor(w: number, h: number) { this.w = w; this.h = h; }
  area(): number { return this.w * this.h; }
}
class Square implements Shape {
  private a: number = 0;
  constructor(a: number) { this.a = a; }
  area(): number { return this.a * this.a; }
}
const shapes: Shape[] = [new Rect(4, 5), new Square(6)];
let total = 0;
for (const s of shapes) total += s.area();
console.log(total);`,
        stdin: '',
        expectedOutput: '56',
        lineByLine: [
          {
            lineNumber: 'Line 1',
            codeSnippet: 'interface Shape { area(): number; }',
            whatItMeans: 'Declares a contract requiring an area() method returning number.',
            whyItIsThere: 'Lets functions depend on behavior instead of concrete classes.',
            ifDeletedError: 'Shape[] type annotation and implements Shape fail to compile.',
          },
          {
            lineNumber: 'Line 2',
            codeSnippet: 'class Rect implements Shape {',
            whatItMeans: 'Tells TypeScript to verify Rect fulfills Shape.',
            whyItIsThere: 'Catches missing or mistyped methods immediately.',
            ifDeletedError: 'Missing contract guarantee between Rect and Shape.',
          },
        ],
      },
      {
        id: 'ts-ch-19-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Polymorphic Shape Parser From Stdin',
        englishParagraphs: [
          'Parse R w h and S a records from stdin into a single Shape[] list and compute total area.',
        ],
        banglaParagraphs: [
          'stdin থেকে R ও S নির্দেশ পড়ে একই Shape[] অ্যারেতে পুশ করে মোট ক্ষেত্রফল হিসাব করো।',
        ],
        memoryDiagram: `stdin -> [Rect, Square] -> Shape[] -> total area`,
        code: `import * as fs from 'fs';
interface Shape { area(): number; }
class Rect implements Shape {
  private w: number = 0;
  private h: number = 0;
  constructor(w: number, h: number) { this.w = w; this.h = h; }
  area(): number { return this.w * this.h; }
}
class Square implements Shape {
  private a: number = 0;
  constructor(a: number) { this.a = a; }
  area(): number { return this.a * this.a; }
}
const t = fs.readFileSync(0, 'utf8').trim().split(/\\s+/);
const n = Number(t[0]);
const shapes: Shape[] = [];
let idx = 1;
for (let i = 0; i < n; i++) {
  if (t[idx] === 'R') { shapes.push(new Rect(Number(t[idx + 1]), Number(t[idx + 2]))); idx += 3; }
  else { shapes.push(new Square(Number(t[idx + 1]))); idx += 2; }
}
console.log(shapes.reduce((acc, s) => acc + s.area(), 0));`,
        stdin: '2\nR 4 5\nS 6',
        expectedOutput: '56',
        lineByLine: [
          {
            lineNumber: 'Line 16',
            codeSnippet: 'const shapes: Shape[] = [];',
            whatItMeans: 'Heterogeneous array typed by interface contract.',
            whyItIsThere: 'Stores both Rect and Square safely in one list.',
            ifDeletedError: 'Array cannot accept mixed Rect and Square without Shape.',
          },
        ],
      },
      {
        id: 'ts-ch-19-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Discount Strategy Interface Pipeline',
        englishParagraphs: [
          'The Strategy pattern swaps pricing rules at runtime by passing any object implementing PricingRule.',
        ],
        banglaParagraphs: [
          'দাম কমানোর নিয়ম বদলাতে চাইলে ক্রেতার কোড না বদলে কেবল নতুন Strategy ক্লাস পাস করলেই চলে।',
        ],
        memoryDiagram: `FlatDiscount(15) & PercentDiscount(10%) both implement PricingRule`,
        code: `interface PricingRule { apply(price: number): number; }
class FlatCut implements PricingRule {
  private cut: number = 0;
  constructor(cut: number) { this.cut = cut; }
  apply(price: number): number { return Math.max(0, price - this.cut); }
}
class PercentCut implements PricingRule {
  private pct: number = 0;
  constructor(pct: number) { this.pct = pct; }
  apply(price: number): number { return Math.trunc(price * (100 - this.pct) / 100); }
}
function checkout(base: number, rules: PricingRule[]): number {
  let cur = base;
  for (const r of rules) cur = r.apply(cur);
  return cur;
}
console.log(checkout(200, [new PercentCut(10), new FlatCut(15)]));`,
        stdin: '',
        expectedOutput: '165',
        lineByLine: [
          {
            lineNumber: 'Line 12',
            codeSnippet: 'function checkout(base: number, rules: PricingRule[]): number {',
            whatItMeans: 'Depends only on PricingRule interface, not concrete classes.',
            whyItIsThere: 'Follows Dependency Inversion so new discounts require zero changes here.',
            ifDeletedError: 'Checkout function disappears.',
          },
        ],
      },
      {
        id: 'ts-ch-19-topic-4',
        badge: 'Example 4: Bug Trap vs. Production Pattern',
        title: 'Structural Plain Objects Satisfying Interfaces',
        englishParagraphs: [
          'TypeScript does not require class boilerplate when a plain object literal already fulfills an interface structurally.',
        ],
        banglaParagraphs: [
          'TypeScript-এ স্ট্রাকচারাল টাইপিং থাকায় সাধারণ অবজেক্ট লিটারেলও ইন্টারফেস পূরণ করতে পারে।',
        ],
        memoryDiagram: `Object literal { run: (x) => x * 2 } structurally matches Transform`,
        code: `interface Transform { run(x: number): number; }
const doubleIt: Transform = { run: (x: number): number => x * 2 };
const addTen: Transform = { run: (x: number): number => x + 10 };
const pipe: Transform[] = [doubleIt, addTen];
let v = 7;
for (const step of pipe) v = step.run(v);
console.log(v);`,
        stdin: '',
        expectedOutput: '24',
        lineByLine: [
          {
            lineNumber: 'Line 2',
            codeSnippet: 'const doubleIt: Transform = { run: (x: number): number => x * 2 };',
            whatItMeans: 'Plain object verified against Transform structurally.',
            whyItIsThere: 'Shows lightweight test doubles and lambdas without heavy classes.',
            ifDeletedError: 'Pipeline step missing.',
          },
        ],
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 1',
        codeSnippet: 'interface Shape { area(): number; }',
        whatItMeans: 'Declares a contract requiring an area() method returning number.',
        whyItIsThere: 'Lets functions depend on behavior instead of concrete classes.',
        ifDeletedError: 'Shape[] type annotation and implements Shape fail to compile.',
      },
      {
        lineNumber: 'Line 2',
        codeSnippet: 'class Rect implements Shape {',
        whatItMeans: 'Tells TypeScript to verify Rect fulfills Shape.',
        whyItIsThere: 'Catches missing or mistyped methods immediately.',
        ifDeletedError: 'Missing contract guarantee between Rect and Shape.',
      },
      {
        lineNumber: 'Line 13',
        codeSnippet: 'const shapes: Shape[] = [new Rect(4, 5), new Square(6)];',
        whatItMeans: 'Collects distinct concrete shapes behind one interface type.',
        whyItIsThere: 'Enables uniform iteration with zero switch/case branching.',
        ifDeletedError: 'No polymorphic array exists to sum.',
      },
      {
        lineNumber: 'Line 15',
        codeSnippet: 'for (const s of shapes) total += s.area();',
        whatItMeans: 'Dispatches .area() to each object’s own implementation.',
        whyItIsThere: 'Computes polymorphic total cleanly.',
        ifDeletedError: 'Total stays 0.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'shapes[0] = Rect(4,5)', memoryOrStack: 'Rect { w:4, h:5 }', note: 'Created from R 4 5' },
      { step: 2, state: 'shapes[1] = Square(6)', memoryOrStack: 'Square { a:6 }', note: 'Created from S 6' },
      { step: 3, state: 's = shapes[0]', memoryOrStack: 'total = 0 + 20 = 20', note: 'Dispatches Rect.area()' },
      { step: 4, state: 's = shapes[1]', memoryOrStack: 'total = 20 + 36 = 56', note: 'Dispatches Square.area()' },
    ],
    harryBugTraps: [
      {
        title: 'Forgetting a Method Required by implements',
        brokenCode: `interface Shape { area(): number; }\nclass Dot implements Shape {}`,
        fixedCode: `class Dot implements Shape { area(): number { return 0; } }`,
        whyItBreaks: 'Compiler rejects Dot because property area is missing.',
      },
      {
        title: 'Using Concrete Types Instead of Interface Parameters',
        brokenCode: `function sum(items: Rect[]) { ... }`,
        fixedCode: `function sum(items: Shape[]): number { ... }`,
        whyItBreaks: 'Typing parameters as Rect[] prevents passing Square or Circle implementations.',
      },
      {
        title: 'Checking typeof s === "Shape" at Runtime',
        brokenCode: `if (s instanceof Shape) {}`,
        fixedCode: `// Interfaces are erased at compile time; call s.area() or use a tag field.`,
        whyItBreaks: 'TypeScript interfaces do not exist at JavaScript runtime.',
      },
    ],
    practiceSheet: [
      {
        id: 'ts-ch-19-p1',
        difficulty: 'Easy',
        title: 'Perimeter Polymorphic Sum',
        prompt: 'Implement perimeter(): number on Shape for Rect and Square and print total perimeter.',
        banglaHint: 'ইঙ্গিত: Rect-এ 2*(w+h) এবং Square-এ 4*a রিটার্ন করো।',
        starterCode: `import * as fs from 'fs';
interface Shape { perimeter(): number; }
class Rect implements Shape {
  private w: number = 0; private h: number = 0;
  constructor(w: number, h: number) { this.w = w; this.h = h; }
  perimeter(): number { return 2 * (this.w + this.h); }
}
class Square implements Shape {
  private a: number = 0;
  constructor(a: number) { this.a = a; }
  perimeter(): number { return 4 * this.a; }
}
const t = fs.readFileSync(0, 'utf8').trim().split(/\\s+/);
const n = Number(t[0]);
const shapes: Shape[] = [];
let idx = 1;
for (let i = 0; i < n; i++) {
  if (t[idx] === 'R') { shapes.push(new Rect(Number(t[idx + 1]), Number(t[idx + 2]))); idx += 3; }
  else { shapes.push(new Square(Number(t[idx + 1]))); idx += 2; }
}
console.log(shapes.reduce((acc, s) => acc + s.perimeter(), 0));`,
        sampleStdin: '2\nR 4 5\nS 6',
        expectedOutput: '42',
      },
      {
        id: 'ts-ch-19-p2',
        difficulty: 'Easy',
        title: 'Formatter Interface',
        prompt: 'Create Formatter interface { fmt(s: string): string } with Upper and Bracket implementations; apply both in order.',
        banglaHint: 'ইঙ্গিত: Upper এ toUpperCase() ও Bracket এ "[" + s + "]" করো।',
        starterCode: `import * as fs from 'fs';
interface Formatter { fmt(s: string): string; }
class Upper implements Formatter { fmt(s: string): string { return s.toUpperCase(); } }
class Bracket implements Formatter { fmt(s: string): string { return '[' + s + ']'; } }
let text = fs.readFileSync(0, 'utf8').trim();
const steps: Formatter[] = [new Upper(), new Bracket()];
for (const st of steps) text = st.fmt(text);
console.log(text);`,
        sampleStdin: 'argon',
        expectedOutput: '[ARGON]',
      },
      {
        id: 'ts-ch-19-p3',
        difficulty: 'Medium',
        title: 'Fee Calculator Strategy',
        prompt: 'Given type ("C"=2% or "F"=flat 5) and amount pairs, compute total fee using FeeRule interface.',
        banglaHint: 'ইঙ্গিত: প্রতিটি পেয়ার অনুযায়ী ক্লাস বেছে FeeRule[] লিস্ট থেকে ফি যোগ করো।',
        starterCode: `import * as fs from 'fs';
interface FeeRule { fee(amt: number): number; }
class PctFee implements FeeRule { fee(amt: number): number { return Math.trunc(amt * 2 / 100); } }
class FlatFee implements FeeRule { fee(_amt: number): number { return 5; } }
const t = fs.readFileSync(0, 'utf8').trim().split(/\\s+/);
let sum = 0;
for (let i = 0; i < t.length; i += 2) {
  const rule: FeeRule = t[i] === 'C' ? new PctFee() : new FlatFee();
  sum += rule.fee(Number(t[i + 1]));
}
console.log(sum);`,
        sampleStdin: 'C 500 F 100 C 250',
        expectedOutput: '20',
      },
      {
        id: 'ts-ch-19-p4',
        difficulty: 'Medium',
        title: 'Notification Router Interface',
        prompt: 'Implement Sender { tag(msg: string): string } for EmailSender and SmsSender; output comma-joined formatted logs.',
        banglaHint: 'ইঙ্গিত: Email:msg আর SMS:msg ফরম্যাটে স্ট্রিং তৈরি করে join করো।',
        starterCode: `import * as fs from 'fs';
interface Sender { tag(msg: string): string; }
class EmailSender implements Sender { tag(msg: string): string { return 'EMAIL:' + msg; } }
class SmsSender implements Sender { tag(msg: string): string { return 'SMS:' + msg; } }
const t = fs.readFileSync(0, 'utf8').trim().split(/\\s+/);
const res: string[] = [];
for (let i = 0; i < t.length; i += 2) {
  const s: Sender = t[i] === 'E' ? new EmailSender() : new SmsSender();
  res.push(s.tag(t[i + 1]));
}
console.log(res.join(','));`,
        sampleStdin: 'E Hi S OTP',
        expectedOutput: 'EMAIL:Hi,SMS:OTP',
      },
      {
        id: 'ts-ch-19-p5',
        difficulty: 'Hard',
        title: 'Composable Operation Pipeline',
        prompt: 'Build Step { apply(x: number): number } with Add(k), Mul(k), and Sub(k) steps, starting from initial value.',
        banglaHint: 'ইঙ্গিত: শুরুর মান পড়ে প্রতিটা কমান্ড অনুযায়ী Step[] বানিয়ে ধারাবাহিকভাবে apply করো।',
        starterCode: `import * as fs from 'fs';
interface Step { apply(x: number): number; }
class AddStep implements Step {
  private k: number = 0; constructor(k: number) { this.k = k; }
  apply(x: number): number { return x + this.k; }
}
class MulStep implements Step {
  private k: number = 1; constructor(k: number) { this.k = k; }
  apply(x: number): number { return x * this.k; }
}
class SubStep implements Step {
  private k: number = 0; constructor(k: number) { this.k = k; }
  apply(x: number): number { return x - this.k; }
}
const t = fs.readFileSync(0, 'utf8').trim().split(/\\s+/);
let val = Number(t[0]);
const steps: Step[] = [];
for (let i = 1; i < t.length; i += 2) {
  const k = Number(t[i + 1]);
  if (t[i] === 'A') steps.push(new AddStep(k));
  else if (t[i] === 'M') steps.push(new MulStep(k));
  else steps.push(new SubStep(k));
}
for (const st of steps) val = st.apply(val);
console.log(val);`,
        sampleStdin: '5 A 3 M 4 S 2',
        expectedOutput: '30',
      },
    ],
    miniBuild: {
      title: 'Polymorphic Shape Area Engine',
      description: 'Read shapes (R w h, S a) into a typed Shape[] interface array and output their total area.',
      banglaGoal: 'Shape ইন্টারফেস ও পলিমরফিক অ্যারে ব্যবহার করে বিভিন্ন আকৃতির মোট ক্ষেত্রফল বের করা।',
      combinesChapters: 'Ch 11, 18, 19',
      starterCode: `import * as fs from 'fs';
interface Shape { area(): number; }
class Rect implements Shape {
  private w: number = 0; private h: number = 0;
  constructor(w: number, h: number) { this.w = w; this.h = h; }
  area(): number { return this.w * this.h; }
}
class Square implements Shape {
  private a: number = 0;
  constructor(a: number) { this.a = a; }
  area(): number { return this.a * this.a; }
}
const t = fs.readFileSync(0, 'utf8').trim().split(/\\s+/);
const n = Number(t[0]);
const shapes: Shape[] = [];
let idx = 1;
for (let i = 0; i < n; i++) {
  if (t[idx] === 'R') { shapes.push(new Rect(Number(t[idx + 1]), Number(t[idx + 2]))); idx += 3; }
  else { shapes.push(new Square(Number(t[idx + 1]))); idx += 2; }
}
console.log(shapes.reduce((acc, s) => acc + s.area(), 0));`,
      sampleStdin: '2\nR 4 5\nS 6',
      expectedOutput: '56',
    },
    starterCode: `import * as fs from 'fs';
interface Shape { area(): number; }
class Rect implements Shape {
  private w: number = 0; private h: number = 0;
  constructor(w: number, h: number) { this.w = w; this.h = h; }
  area(): number { return this.w * this.h; }
}
class Square implements Shape {
  private a: number = 0;
  constructor(a: number) { this.a = a; }
  area(): number { return this.a * this.a; }
}
const t = fs.readFileSync(0, 'utf8').trim().split(/\\s+/);
const n = Number(t[0]);
const shapes: Shape[] = [];
let idx = 1;
for (let i = 0; i < n; i++) {
  if (t[idx] === 'R') { shapes.push(new Rect(Number(t[idx + 1]), Number(t[idx + 2]))); idx += 3; }
  else { shapes.push(new Square(Number(t[idx + 1]))); idx += 2; }
}
console.log(shapes.reduce((acc, s) => acc + s.area(), 0));`,
    sampleStdin: '2\nR 4 5\nS 6',
    expectedSampleOutput: '56',
    testCases: [
      { id: 'ts19-t1', input: '2\nR 4 5\nS 6', expectedOutput: '56' },
      { id: 'ts19-t2', input: '3\nS 2\nS 3\nR 1 10', expectedOutput: '23', isHidden: true },
    ],
  },
  20: {
    chapterNumber: 20,
    isMilestoneMerger: true,
    title: 'TypeScript Chapter 20: Generics, Typed Collections & Utility Types — Merger 4',
    banglaTitle: 'TypeScript অধ্যায় ২০: জেনারিক্স, টাইপড কালেকশন ও ইউটিলিটি টাইপ — মার্জার ৪',
    subtitle: 'Milestone Merger 4: Combine typed collections (Map<K,V>, Set<T>, Array<T>) with Utility Types (Partial, Pick, Record).',
    zeroIntuition: {
      plainEnglishStory:
        'Once an application grows beyond toy scripts, you need reusable collections whose key and value types are strictly verified by the compiler: Map<string, number>, Set<string>, Record<string, number>, and Array<T>. Pair those with built-in TypeScript utility types—Partial<T> for optional patch payloads, Pick<T, K> for safe projection DTOs, and Readonly<T> to block accidental mutation.\n\nIn Milestone Merger 4, you unite classes, interfaces, strongly typed Map/Set collections, and utility-type configuration merges into rock-solid, contest- and production-grade TypeScript pipelines.',
      asciiFlowchart: `  [ interface Config ] ---> type ConfigPatch = Partial<Config>
          |
          +--> new Map<string, number>()  (typed O(1) frequency table)
          +--> new Set<string>()          (typed O(1) deduplication)
          +--> Array<[string, number]>.sort(...)
          |
          v
  [ Merged Config + Sorted Leaderboard Output ]`,
      pseudocode: [
        '1. DEFINE base interface and derive Partial / Pick type aliases',
        '2. INGEST tokens into strongly typed Map<string, number> and Set<string>',
        '3. SORT Array<[string, number]> entries by count descending, key ascending',
        '4. OUTPUT clean deterministic summaries verified by TypeScript strict mode',
      ],
      banglaZeroToHero: {
        analogyTitle: 'স্মার্ট ছাঁচ, টাইপড লেজার ও ইউটিলিটি অ্যাডাপ্টার',
        explanation:
          'ধরো একটি সফটওয়্যারে তোমার User বা Config নামের একটি বড় অবজেক্ট টাইপ আছে, কিন্তু আপডেট ফাংশনে ব্যবহারকারী শুধু একটি বা দুটি ফিল্ড পাঠাতে চায়। পুরো ইন্টারফেস নতুন করে কপি-পেস্ট না করে TypeScript তোমাকে দেয় বিল্ট-ইন Utility Types! Partial<Config> বললেই সব ফিল্ড ঐচ্ছিক হয়ে যায়, আর Pick<Config, "host" | "port"> বললে কেবল নির্দিষ্ট ফিল্ড নিয়ে নতুন টাইপ তৈরি হয়। এর সাথে যখন Map<string, number>, Set<string>, এবং Record<string, number>-এর মতো টাইপড কালেকশন যুক্ত হয়, তখন প্রতিটি কী-ভ্যালু কম্পাইলারে শতভাগ সুরক্ষিত থাকে। কোনো সংখ্যার জায়গায় ভুল করে স্ট্রিং ঢোকানোর সুযোগই থাকে না। মার্জার ৪ অধ্যায়ে আমরা ক্লাস, ইন্টারফেস, টাইপড কালেকশন আর ইউটিলিটি টাইপ একসাথে কাজে লাগিয়ে ফ্রিকোয়েন্সি লিডারবোর্ড ও কনফিগ মার্জ ইঞ্জিন বানাবো। বাস্তব প্রোজেক্টে React প্রপস, API DTO এবং স্টেট ম্যানেজমেন্ট সবখানেই এই প্যাটার্ন অপরিহার্য। কম্পাইল-টাইমে টাইপ চেকিং শেষ হয়ে যাওয়ায় রানটাইমে অতিরিক্ত কোনো মেমোরি বা গতির ক্ষতিও হয় না।',
        everydayExample: 'আসল পাসপোর্ট থেকে ফটোকপি করা ভিসা ফর্ম: Pick দিয়ে কেবল জরুরি তথ্য নিয়ে নিরাপদ কপি তৈরি হয়।',
        keyTakeaways: [
          'Map<K, V> ও Set<T> ডায়নামিক কী-তে Object-এর প্রোটোটাইপ বাগ দূর করে।',
          'Partial<T> আপডেট পেলোড এবং Pick<T, K> নিরাপদ ভিউ টাইপ বানাতে দারুণ।',
          'Array<[string, number]> ও Record<K, V> কোড রিফ্যাক্টরিংকে সহজ করে।',
        ],
      },
    },
    topics: [
      {
        id: 'ts-ch-20-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Utility Types (Partial & Pick) With Typed Map/Set',
        englishParagraphs: [
          'Derive ConfigPatch using Partial<ServerConfig> and SummaryView using Pick, then count active tags with Set<string> and Map<string, number>.',
        ],
        banglaParagraphs: [
          'Partial ও Pick ইউটিলিটি টাইপের সাথে Map<string, number> ও Set<string> ব্যবহার করো।',
        ],
        memoryDiagram: `ServerConfig + Partial<ServerConfig> -> merged config | Map<string, number>`,
        code: `interface ServerConfig { host: string; port: number; retries: number; }
type ConfigPatch = Partial<ServerConfig>;
type PublicInfo = Pick<ServerConfig, 'host' | 'port'>;

function applyPatch(base: ServerConfig, patch: ConfigPatch): PublicInfo {
  const merged: ServerConfig = { ...base, ...patch };
  return { host: merged.host, port: merged.port };
}

const info: PublicInfo = applyPatch({ host: 'localhost', port: 3000, retries: 2 }, { port: 8080 });
const seen = new Set<string>(['ts', 'js', 'ts']);
console.log(info.host + ':' + info.port + ' uniq=' + seen.size);`,
        stdin: '',
        expectedOutput: 'localhost:8080 uniq=2',
        lineByLine: [
          {
            lineNumber: 'Line 2',
            codeSnippet: 'type ConfigPatch = Partial<ServerConfig>;',
            whatItMeans: 'Makes every field in ServerConfig optional for partial updates.',
            whyItIsThere: 'Prevents duplicating optional-field interfaces manually.',
            ifDeletedError: 'ConfigPatch type alias is undefined.',
          },
          {
            lineNumber: 'Line 11',
            codeSnippet: "const seen = new Set<string>(['ts', 'js', 'ts']);",
            whatItMeans: 'Creates a strongly typed Set storing only unique strings.',
            whyItIsThere: 'Guarantees O(1) membership checks and deduplication.',
            ifDeletedError: 'seen variable undefined.',
          },
        ],
      },
      {
        id: 'ts-ch-20-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Map<string, number> Frequency Leaderboard',
        englishParagraphs: [
          'Read n tokens from stdin into Map<string, number> and sort entries by frequency descending then alphabetically.',
        ],
        banglaParagraphs: [
          'Map<string, number>-এ শব্দ গুনে ফ্রিকোয়েন্সি ও নামের ক্রমে সাজানো লিডারবোর্ড প্রিন্ট করো।',
        ],
        memoryDiagram: `Map<string, number> -> Array<[string, number]> -> sorted lines`,
        code: `import * as fs from 'fs';

const toks: string[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/);
const n = Number(toks[0]);
const freq = new Map<string, number>();
for (let i = 1; i <= n; i++) {
  const w = toks[i];
  freq.set(w, (freq.get(w) ?? 0) + 1);
}
const rows: Array<[string, number]> = Array.from(freq.entries()).sort((a, b) =>
  b[1] !== a[1] ? b[1] - a[1] : (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0)
);
console.log(rows.map((r) => r[0] + ':' + r[1]).join('\\n'));`,
        stdin: '5\nts rust ts go rust',
        expectedOutput: 'rust:2\nts:2\ngo:1',
        lineByLine: [
          {
            lineNumber: 'Line 5',
            codeSnippet: 'const freq = new Map<string, number>();',
            whatItMeans: 'Instantiates a typed hash map mapping word -> count.',
            whyItIsThere: 'Rejects accidental non-numeric values at compile time.',
            ifDeletedError: 'freq map disappears.',
          },
        ],
      },
      {
        id: 'ts-ch-20-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Record<string, number> Bucket Aggregator',
        englishParagraphs: [
          'Aggregate typed department budgets into a Record<string, number> dictionary after validating amounts.',
        ],
        banglaParagraphs: [
          'Record<string, number> টাইপ ব্যবহার করে বিভাগভিত্তিক মোট বাজেট নিরাপদে যোগ করো।',
        ],
        memoryDiagram: `Record<string, number> { cloud: 55, ai: 60 }`,
        code: `import * as fs from 'fs';

const t: string[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/);
const totals: Record<string, number> = {};
for (let i = 0; i < t.length; i += 2) {
  const k = t[i], v = Number(t[i + 1]);
  totals[k] = (totals[k] ?? 0) + v;
}
const out = Object.keys(totals).sort().map((k) => k + '=' + totals[k]);
console.log(out.join(' '));`,
        stdin: 'cloud 40 ai 60 cloud 15',
        expectedOutput: 'ai=60 cloud=55',
        lineByLine: [
          {
            lineNumber: 'Line 4',
            codeSnippet: 'const totals: Record<string, number> = {};',
            whatItMeans: 'Types plain object keys as string and values strictly as number.',
            whyItIsThere: 'Prevents assigning strings or undefined into numeric sums.',
            ifDeletedError: 'totals dictionary is untyped or missing.',
          },
        ],
      },
      {
        id: 'ts-ch-20-topic-4',
        badge: 'Example 4: Bug Trap vs. Production Pattern',
        title: 'Explicit Numeric Comparator vs. Untyped .sort()',
        englishParagraphs: [
          'Always supply a numeric comparator and copy readonly inputs with slice() before sorting.',
        ],
        banglaParagraphs: [
          'সবসময় সংখ্যার তুলনার জন্য (a, b) => a - b দাও এবং মূল অ্যারে না বদলাতে slice() করো।',
        ],
        memoryDiagram: `ReadonlyArray<number> -> .slice().sort((a,b) => a - b)`,
        code: `function sortedNumbers(nums: readonly number[]): number[] {
  return nums.slice().sort((a, b) => a - b);
}
const raw: readonly number[] = [10, 2, 100, 25];
console.log(sortedNumbers(raw).join(' ') + ' | orig:' + raw[0]);`,
        stdin: '',
        expectedOutput: '2 10 25 100 | orig:10',
        lineByLine: [
          {
            lineNumber: 'Line 1',
            codeSnippet: 'function sortedNumbers(nums: readonly number[]): number[] {',
            whatItMeans: 'Prevents function body from mutating caller array.',
            whyItIsThere: 'Enforces immutability at compile time.',
            ifDeletedError: 'In-place sort could silently mutate caller state.',
          },
        ],
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 1',
        codeSnippet: 'interface ServerConfig { host: string; port: number; retries: number; }',
        whatItMeans: 'Defines canonical configuration shape.',
        whyItIsThere: 'Serves as single source of truth for derived utility types.',
        ifDeletedError: 'Partial and Pick lose their base type.',
      },
      {
        lineNumber: 'Line 2',
        codeSnippet: 'type ConfigPatch = Partial<ServerConfig>;',
        whatItMeans: 'Makes every field in ServerConfig optional for partial updates.',
        whyItIsThere: 'Prevents duplicating optional-field interfaces manually.',
        ifDeletedError: 'ConfigPatch type alias is undefined.',
      },
      {
        lineNumber: 'Line 3',
        codeSnippet: "type PublicInfo = Pick<ServerConfig, 'host' | 'port'>;",
        whatItMeans: 'Projects only safe public fields from ServerConfig.',
        whyItIsThere: 'Omits internal retries setting from caller-facing summary.',
        ifDeletedError: 'PublicInfo type is undefined.',
      },
      {
        lineNumber: 'Line 11',
        codeSnippet: "const seen = new Set<string>(['ts', 'js', 'ts']);",
        whatItMeans: 'Creates a strongly typed Set storing only unique strings.',
        whyItIsThere: 'Guarantees O(1) membership checks and deduplication.',
        ifDeletedError: 'seen variable undefined.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'Read "ts", "rust", "ts"', memoryOrStack: 'Map { ts=>2, rust=>1 }', note: 'Typed Map<string, number>' },
      { step: 2, state: 'Read "go", "rust"', memoryOrStack: 'Map { ts=>2, rust=>2, go=>1 }', note: '3 entries total' },
      { step: 3, state: 'Sort Array<[string, number]>', memoryOrStack: '[["rust",2],["ts",2],["go",1]]', note: '"rust" < "ts" tie break' },
      { step: 4, state: 'Join lines', memoryOrStack: 'rust:2 / ts:2 / go:1', note: 'Exact deterministic output' },
    ],
    harryBugTraps: [
      {
        title: 'Mutating a readonly Array Parameter with .sort()',
        brokenCode: `function f(a: readonly number[]) { return a.sort((x, y) => x - y); }`,
        fixedCode: `function f(a: readonly number[]): number[] { return a.slice().sort((x, y) => x - y); }`,
        whyItBreaks: 'Property sort does not exist on readonly number[]; copying first keeps callers safe.',
      },
      {
        title: 'Using Object {} Instead of Map<string, number> for Arbitrary Keys',
        brokenCode: `const mp: Record<string, number> = {}; mp['toString']++;`,
        fixedCode: `const mp = new Map<string, number>(); mp.set(k, (mp.get(k) ?? 0) + 1);`,
        whyItBreaks: 'Plain objects collide with Object.prototype keys like toString and constructor.',
      },
      {
        title: 'Forgetting Undefined Check on Map.get(k)',
        brokenCode: `const n: number = freq.get(k); // fails strictNullChecks!`,
        fixedCode: `const n: number = freq.get(k) ?? 0;`,
        whyItBreaks: 'Map<K, V>.get returns V | undefined, causing NaN arithmetic if unguarded.',
      },
    ],
    practiceSheet: [
      {
        id: 'ts-ch-20-p1',
        difficulty: 'Easy',
        title: 'Typed Set Intersection Count',
        prompt: 'Read n, n numbers into Set<number> A, m, m numbers into Set<number> B; print count of shared numbers.',
        banglaHint: 'ইঙ্গিত: Set<number> বানিয়ে setB-এর প্রতিটি সংখ্যা setA.has(x) দিয়ে চেক করো।',
        starterCode: `import * as fs from 'fs';\nconst nums: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);\nconst n = nums[0];\nconst setA = new Set<number>(nums.slice(1, 1 + n));\nconst setB = new Set<number>(nums.slice(2 + n));\nlet common = 0;\nfor (const x of setB) if (setA.has(x)) common++;\nconsole.log(common);`,
        sampleStdin: '4 1 2 2 3 3 2 3 4',
        expectedOutput: '2',
      },
      {
        id: 'ts-ch-20-p2',
        difficulty: 'Easy',
        title: 'Partial Config Merge Utility',
        prompt: 'Merge base { host: "app", port: 80, tls: 0 } with Partial patch tokens (port=443 tls=1) and print host:port:tls.',
        banglaHint: 'ইঙ্গিত: Partial<Cfg> টাইপ ব্যবহার করে কমান্ড থেকে পড়া ফিল্ড ওভাররাইড করো।',
        starterCode: `import * as fs from 'fs';\ninterface Cfg { host: string; port: number; tls: number; }\ntype CfgPatch = Partial<Cfg>;\nconst base: Cfg = { host: 'app', port: 80, tls: 0 };\nconst patch: CfgPatch = {};\nfor (const tok of fs.readFileSync(0, 'utf8').trim().split(/\\s+/)) {\n  const [k, v] = tok.split('=');\n  if (k === 'host') patch.host = v;\n  if (k === 'port') patch.port = Number(v);\n  if (k === 'tls') patch.tls = Number(v);\n}\nconst merged: Cfg = { ...base, ...patch };\nconsole.log(merged.host + ':' + merged.port + ':' + merged.tls);`,
        sampleStdin: 'port=443 tls=1',
        expectedOutput: 'app:443:1',
      },
      {
        id: 'ts-ch-20-p3',
        difficulty: 'Medium',
        title: 'Typed Two-Sum Using Map<number, number>',
        prompt: 'Read target followed by distinct numbers; print "i j" indices summing to target.',
        banglaHint: 'ইঙ্গিত: Map<number, number>-এ value -> index রেখে target - x আগে এসেছে কি না দেখো।',
        starterCode: `import * as fs from 'fs';\nconst nums: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);\nconst target = nums[0], arr = nums.slice(1);\nconst seen = new Map<number, number>();\nfor (let i = 0; i < arr.length; i++) {\n  const need = target - arr[i];\n  const hit = seen.get(need);\n  if (hit !== undefined) { console.log(hit + ' ' + i); break; }\n  seen.set(arr[i], i);\n}`,
        sampleStdin: '9 2 7 11 15',
        expectedOutput: '0 1',
      },
      {
        id: 'ts-ch-20-p4',
        difficulty: 'Medium',
        title: 'Map Modulo Buckets',
        prompt: 'Group numbers by ((x % m) + m) % m into Map<number, number> counts and print sorted "rem:cnt".',
        banglaHint: 'ইঙ্গিত: Map<number, number> দিয়ে রিমাইন্ডার অনুযায়ী কাউন্ট রাখো ও রিমাইন্ডার দিয়ে sort করো।',
        starterCode: `import * as fs from 'fs';\nconst nums: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);\nconst m = nums[0];\nconst mp = new Map<number, number>();\nfor (let i = 1; i < nums.length; i++) {\n  const r = ((nums[i] % m) + m) % m;\n  mp.set(r, (mp.get(r) ?? 0) + 1);\n}\nconst out = Array.from(mp.entries()).sort((a, b) => a[0] - b[0]).map((e) => e[0] + ':' + e[1]);\nconsole.log(out.join(' '));`,
        sampleStdin: '3 4 7 9 10 12',
        expectedOutput: '0:2 1:3',
      },
      {
        id: 'ts-ch-20-p5',
        difficulty: 'Hard',
        title: 'Top-K Word Ranker With Readonly Result',
        prompt: 'Read k and words; print top k words sorted by frequency desc then alphabetically.',
        banglaHint: 'ইঙ্গিত: Map<string, number> থেকে এন্ট্রি সাজিয়ে .slice(0, k) নিয়ে নাম প্রিন্ট করো।',
        starterCode: `import * as fs from 'fs';\nconst t: string[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/);\nconst k = Number(t[0]);\nconst freq = new Map<string, number>();\nfor (let i = 1; i < t.length; i++) freq.set(t[i], (freq.get(t[i]) ?? 0) + 1);\nconst top: readonly string[] = Array.from(freq.entries())\n  .sort((a, b) => b[1] !== a[1] ? b[1] - a[1] : (a[0] < b[0] ? -1 : 1))\n  .slice(0, k).map((e) => e[0]);\nconsole.log(top.join(' '));`,
        sampleStdin: '2 api db api cache db log',
        expectedOutput: 'api db',
      },
    ],
    miniBuild: {
      title: 'Milestone Merger 4: Typed Collections Leaderboard',
      description: 'Combine Map<string, number>, typed tuple arrays, and deterministic multi-key sorting to rank tokens.',
      banglaGoal: 'মার্জার ৪: Map<string, number> ও টাইপড টাপল অ্যারে দিয়ে লিডারবোর্ড তৈরি করা।',
      combinesChapters: 'Ch 11, 14, 18, 20',
      starterCode: `import * as fs from 'fs';\nconst toks: string[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/);\nconst n = Number(toks[0]);\nconst freq = new Map<string, number>();\nfor (let i = 1; i <= n; i++) {\n  const w = toks[i];\n  freq.set(w, (freq.get(w) ?? 0) + 1);\n}\nconst rows: Array<[string, number]> = Array.from(freq.entries()).sort((a, b) =>\n  b[1] !== a[1] ? b[1] - a[1] : (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0)\n);\nconsole.log(rows.map((r) => r[0] + ':' + r[1]).join('\\n'));`,
      sampleStdin: '5\nts rust ts go rust',
      expectedOutput: 'rust:2\nts:2\ngo:1',
    },
    starterCode: `import * as fs from 'fs';\nconst toks: string[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/);\nconst n = Number(toks[0]);\nconst freq = new Map<string, number>();\nfor (let i = 1; i <= n; i++) {\n  const w = toks[i];\n  freq.set(w, (freq.get(w) ?? 0) + 1);\n}\nconst rows: Array<[string, number]> = Array.from(freq.entries()).sort((a, b) =>\n  b[1] !== a[1] ? b[1] - a[1] : (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0)\n);\nconsole.log(rows.map((r) => r[0] + ':' + r[1]).join('\\n'));`,
    sampleStdin: '5\nts rust ts go rust',
    expectedSampleOutput: 'rust:2\nts:2\ngo:1',
    testCases: [
      { id: 'ts20-t1', input: '5\nts rust ts go rust', expectedOutput: 'rust:2\nts:2\ngo:1' },
      { id: 'ts20-t2', input: '3\na a b', expectedOutput: 'a:2\nb:1', isHidden: true },
    ],
  },
};
