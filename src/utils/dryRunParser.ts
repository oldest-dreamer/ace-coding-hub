import type { DryRunRow } from '../types/academy';

export interface ParsedMemoryVariable {
  name: string;
  value: string;
  changed: boolean;
}

export interface ParsedMemoryFrame {
  step: number;
  stateLabel: string;
  note: string;
  variables: ParsedMemoryVariable[];
  arrayCells: string[];
  stackFrames: string[];
  rawMemory: string;
}

const KEY_VALUE_REGEX =
  /\b([A-Za-z_][A-Za-z0-9_.\[\]]*)\s*(?:=|:|->)\s*("[^"]*"|'[^']*'|\[[^\]]*\]|\{[^}]*\}|[^\s,;]+(?:\s*\([^\)]*\))?)/g;

const ARRAY_LITERAL_REGEX = /\[([^\]]+)\]/g;
const STACK_FRAME_REGEX = /(?:frame\s*#\d+|[a-zA-Z_][a-zA-Z0-9_]*\([^)]{0,28}\))/g;

function extractKeyValues(source: string): Record<string, string> {
  const result: Record<string, string> = {};
  if (!source) return result;
  KEY_VALUE_REGEX.lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = KEY_VALUE_REGEX.exec(source)) !== null) {
    const key = match[1].trim();
    const val = match[2].trim().replace(/[.,;]+$/, '');
    if (key && val && key.length <= 24) {
      result[key] = val;
    }
  }
  return result;
}

function extractArrayCells(text: string): string[] {
  ARRAY_LITERAL_REGEX.lastIndex = 0;
  const cells: string[] = [];
  let match: RegExpExecArray | null;
  while ((match = ARRAY_LITERAL_REGEX.exec(text)) !== null) {
    const items = match[1]
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    if (items.length >= 2) {
      return items.slice(0, 8);
    }
  }
  // Also handle comma-separated sequences like acc=1,3,6,10,15
  const seqMatch = /\b[A-Za-z_][A-Za-z0-9_]*\s*=\s*([0-9]+(?:\s*,\s*[0-9]+){2,})/.exec(text);
  if (seqMatch) {
    return seqMatch[1]
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
      .slice(0, 8);
  }
  return cells;
}

function extractStackFrames(state: string, memoryOrStack: string): string[] {
  const combined = `${memoryOrStack} | ${state}`;
  STACK_FRAME_REGEX.lastIndex = 0;
  const seen = new Set<string>();
  const frames: string[] = [];
  let match: RegExpExecArray | null;
  while ((match = STACK_FRAME_REGEX.exec(combined)) !== null) {
    const token = match[0].trim();
    if (!seen.has(token) && frames.length < 5) {
      seen.add(token);
      frames.push(token);
    }
  }
  return frames;
}

/**
 * Parses a chapter's DryRunRow[] into structured visual memory frames so the
 * interactive DryRunAnimator can render animated memory cells, changed-value diffs,
 * array bars, and stack frames for any of the 120 chapters.
 */
export function parseDryRunFrames(rows: DryRunRow[]): ParsedMemoryFrame[] {
  let prevVars: Record<string, string> = {};

  return rows.map((row) => {
    const fromState = extractKeyValues(row.state);
    const fromMemory = extractKeyValues(row.memoryOrStack);
    const mergedMap: Record<string, string> = { ...fromState, ...fromMemory };

    const variables: ParsedMemoryVariable[] = Object.entries(mergedMap)
      .slice(0, 6)
      .map(([name, value]) => ({
        name,
        value,
        changed: prevVars[name] !== value,
      }));

    if (variables.length === 0 && row.memoryOrStack.trim()) {
      variables.push({
        name: 'memory',
        value: row.memoryOrStack.trim(),
        changed: prevVars['memory'] !== row.memoryOrStack.trim(),
      });
      mergedMap['memory'] = row.memoryOrStack.trim();
    }

    const arrayCells = extractArrayCells(`${row.memoryOrStack} ${row.state}`);
    const stackFrames = extractStackFrames(row.state, row.memoryOrStack);

    prevVars = { ...prevVars, ...mergedMap };

    return {
      step: row.step,
      stateLabel: row.state,
      note: row.note,
      variables,
      arrayCells,
      stackFrames,
      rawMemory: row.memoryOrStack,
    };
  });
}
