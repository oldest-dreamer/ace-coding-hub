import type { Problem } from '../types/academy';
import { CP500_ATCODER } from './cp500_atcoder';
import { CP500_CODECHEF } from './cp500_codechef';
import { CP500_CODEFORCES } from './cp500_cf';
import { CP500_LEETCODE } from './cp500_leetcode';

export { CP500_CODEFORCES, CP500_CODECHEF, CP500_LEETCODE, CP500_ATCODER };

export const CP_500_PROBLEMS: Problem[] = [
  ...CP500_CODEFORCES,
  ...CP500_CODECHEF,
  ...CP500_LEETCODE,
  ...CP500_ATCODER,
];
