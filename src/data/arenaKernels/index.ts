import type { Problem } from '../../types/academy';
import { ARRAY_WINDOW_KERNELS } from './arrayWindowKernels';
import { DP_GRAPH_TREE_KERNELS } from './dpGraphTreeKernels';
import { MATH_IMPL_KERNELS } from './mathImplKernels';
import { SEARCH_STACK_STRING_KERNELS } from './searchStackStringKernels';
import { buildProblemFromBlueprint, type ArenaKernel, type ProblemBlueprint } from './types';

export type { ArenaKernel, ProblemBlueprint };
export { buildProblemFromBlueprint };

export const ALL_ARENA_KERNELS: Record<string, ArenaKernel> = {
  ...MATH_IMPL_KERNELS,
  ...ARRAY_WINDOW_KERNELS,
  ...SEARCH_STACK_STRING_KERNELS,
  ...DP_GRAPH_TREE_KERNELS,
};

export function instantiateBlueprints(blueprints: ProblemBlueprint[]): Problem[] {
  return blueprints.map((bp) => buildProblemFromBlueprint(bp, ALL_ARENA_KERNELS));
}
