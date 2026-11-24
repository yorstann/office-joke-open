import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One-line entry for make.fun's "Make the AI Judge Laugh: the
// Office Joke Open" bounty. The program writes a single line
// of office comedy to /output/entry.txt (or
// $OUTPUT_DIR/entry.txt). Pass 2: the joke is split where
// its loop closes — ten people standing up to report they
// are blocked by each other — because the recursion is the
// laugh, and the browser-history alternate spends it on a
// meeting instead. This bounty is the open edition, separate
// from the Office Jokes sprint entered earlier the same week.
// buildEntryLine() is the single source of truth for the exact text;
// nothing below duplicates the joke.
const ENTRY_BEATS = [
  "Our daily standup is just ten people standing up to say they're blocked",
  "by someone who's also standing up saying they're blocked.",
] as const;

export function buildEntryLine(): string {
  return ENTRY_BEATS.join(" ");
}

export const ENTRY_LINE = buildEntryLine();

const MAX_CHARS = 200;

export function charCount(text: string): number {
  return [...text].length;
}

export function isValidEntry(text: string): boolean {
  const length = charCount(text);
  return length >= 1 && length <= MAX_CHARS && text.trim().length > 0;
}

if (!isValidEntry(ENTRY_LINE)) {
  throw new Error(
    `entry line must be 1–${MAX_CHARS} characters, got ${charCount(ENTRY_LINE)}`,
  );
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY_LINE, "utf8");
