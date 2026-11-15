import type { Problem } from '../types/academy';
import { INTERVIEW_200_PART1 } from './interview200_part1';
import { INTERVIEW_200_PART2 } from './interview200_part2';

export { INTERVIEW_200_PART1, INTERVIEW_200_PART2 };

export const INTERVIEW_200_PROBLEMS: Problem[] = [
  ...INTERVIEW_200_PART1,
  ...INTERVIEW_200_PART2,
];
