import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const GREETING =
  "This is the cat. I'm asleep on your keyboard. Leave a message. It's already typed: pppppppppp.";

const OUTPUT_PATH = "/output/entry.txt";

function ensureParentDir(target: string): void {
  mkdirSync(dirname(target), { recursive: true });
}

function assertValidGreeting(text: string): void {
  if (text.length === 0) {
    throw new Error("greeting must not be empty");
  }
  if (text.length < 1 || text.length > 120) {
    throw new Error(`greeting length ${text.length} outside 1..120`);
  }
  if (text.trim() !== text) {
    throw new Error("greeting must not have leading/trailing whitespace");
  }
}

function persistGreeting(): void {
  assertValidGreeting(GREETING);
  ensureParentDir(OUTPUT_PATH);
  writeFileSync(OUTPUT_PATH, GREETING, "utf8");
}

persistGreeting();
