import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname } from "node:path";

const greeting = "Hi, you have reached the cat. I am asleep on your laptop. Leave a treat after the beep.";

function assertValidGreeting(text: string): void {
  const charCount = [...text].length;
  if (charCount < 1 || charCount > 120) {
    throw new Error(`greeting must be 1 to 120 characters, got ${charCount}`);
  }
  if (text.trim().length === 0) {
    throw new Error("greeting must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("greeting must be a single line");
  }
}

async function main(): Promise<void> {
  assertValidGreeting(greeting);
  const outputPath = process.env.OUTPUT_PATH ?? "/output/entry.txt";
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, greeting, "utf8");
  const written = await readFile(outputPath, "utf8");
  if (written !== greeting) {
    throw new Error("written output does not match the greeting exactly");
  }
  const roundTripped = Buffer.from(written, "utf8").toString("utf8");
  if (roundTripped !== greeting) {
    throw new Error("greeting did not survive a UTF-8 round trip");
  }
}

await main();
