// One Letter for Your Day — entry program.
//
// Writes exactly one letter, A to Z, standing for the word that
// describes the day, to /output/entry.txt. Deterministic, no network,
// no randomness.
//
// Outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: Z, for zombie — the day I was a zombie. The judge sees only
// the letter and must infer the word, so the letter has to carry a word
// that is vivid, funny and true whichever way the judge reads it, and Z
// is the only letter whose whole inference cluster lands in the same
// place: zombie, zero sleep, zonked — every reading is a sharp picture
// of the same exhausted day (RULES.txt criteria 2–4). The letter suits
// its word (criterion 5): Z is the sound of sleep itself, "zzz", and
// zombie opens on the /z/ sound — the initial fits the sound and shape
// of the word, and it is not the obvious pick where a sharper one
// exists.
// Revision: C for chaotic was the frontrunner — the dominant C day-word
// — but it is the obvious pick, which criterion 5 penalises. F for fried
// was close, but F also reads "Friday-feeling" or "fantastic" and the
// cluster splits. H for hangover is vivid, but the judge may infer
// "hectic" first. U for unhinged is funnier, but the judge may infer
// "unproductive", which is vague. D for dumpster fire is the most vivid
// of all, but the judge may infer "dreadful" or "dead". Z has the
// highest floor: there is no dull word behind it.
const ENTRY = "Z";

// Competition rules: exactly 1 character, a letter from A to Z, and not
// only white space. Enforce it here so a bad edit fails loudly.
const codePoints = [...ENTRY].length;
if (codePoints !== 1) {
  throw new Error(`entry must be exactly 1 code point, got ${codePoints}`);
}
if (!/^[A-Z]$/.test(ENTRY)) {
  throw new Error(`entry must be a single letter A-Z, got ${JSON.stringify(ENTRY)}`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
// The rules require a single line: reject any line break outright, so a
// bad edit that introduces one fails loudly instead of shipping a
// two-line entry to a one-line judge.
if (/[\r\n]/.test(ENTRY)) {
  throw new Error("entry must be a single line, got a line break");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");
console.log(`wrote ${codePoints} code point to ${outPath}`);
