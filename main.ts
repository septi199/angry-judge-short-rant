import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: one short, funny rant about an everyday annoyance.
// Gate: /output/entry.txt must be UTF-8 text of 1 to 400 characters.
// Built from sentence parts so the wording stays reviewable line by line.
function buildEntry(): string {
  const parts = [
    "The self-checkout watched me scan the milk, then screamed 'UNEXPECTED ITEM IN BAGGING AREA' like I'd smuggled a watermelon through customs.",
    "A bored teenager shuffled over, typed a secret code, and glared at me like I was the criminal.",
    "Three items. Twenty minutes.",
    "The staffed lane sat right there, empty, laughing at me.",
  ];
  return parts.join(" ");
}

const ENTRY = buildEntry();

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");

// Byte-level verification: read it back and refuse to pass silently on mismatch.
const back = readFileSync(outPath, "utf8");
if (back !== ENTRY) {
  throw new Error("entry.txt mismatch after write");
}
if (ENTRY.length < 1 || ENTRY.length > 400) {
  throw new Error(`entry length ${ENTRY.length} is outside the 1-400 character gate`);
}

console.log(`wrote ${outPath} (${ENTRY.length} characters)`);
