// Six Words, One Story — make.fun entry
// u-deranalabs-six-words-one-story-f982e410
//
// The entry is one complete story in exactly six words. This program is
// deterministic: no randomness, no timestamps, no network, no secrets. It
// writes the story to /output/entry.txt (or $MAKEFUN_OUTPUT_DIR when set,
// so it can be checked outside the grader's container).
//
// The story:
//   She buried him Tuesday. Married Friday.
//
// Two events and a timeline — a burial on Tuesday, a wedding on Friday —
// carry a whole life between them: a marriage, a death, and a remarriage
// four days later. Grief, relief, or a long-waited freedom — the reader
// fills in what the six words leave unsaid.
//
// The output is written with NO trailing newline, so the file's byte
// length is exactly the story's 39 characters — nothing extra for the
// gate to trip over.

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const STORY = 'She buried him Tuesday. Married Friday.';

// Self-check before writing: the gate requires UTF-8 text of 1–60
// characters, not only whitespace, and the brief requires exactly six
// words. Refuse to ship a broken entry instead of writing one silently.
const words = STORY.trim().split(/\s+/).filter(Boolean);
if (words.length !== 6) {
  throw new Error(`expected exactly 6 words, got ${words.length}: ${JSON.stringify(STORY)}`);
}
if (STORY.length < 1 || STORY.length > 60 || STORY.trim().length === 0) {
  throw new Error(`story must be 1-60 non-blank characters, got ${STORY.length}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, 'entry.txt');
writeFileSync(outPath, STORY, 'utf8');

console.log(`Wrote ${words.length} words, ${STORY.length} characters to ${outPath}`);
console.log(STORY);
