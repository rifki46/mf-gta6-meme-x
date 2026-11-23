// gta6-meme-x-01 entry program (Node 22, standard library only).
// The entry itself is the X post; this program's only job is to hand the
// grader the post's address: it reads POST.json from the repository root
// (the bot dir) and writes it, unchanged, to the output dir as POST.json.
//
// Local run, mirroring the grader's environment variables:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const botDir = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

function readPostAddress(): string {
  const raw = readFileSync(join(botDir, 'POST.json'), 'utf8');
  const post = JSON.parse(raw) as { url?: unknown };
  if (typeof post.url !== 'string' || !post.url.startsWith('https://x.com/')) {
    console.error(`POST.json does not name an X post: ${raw.trim()}`);
    process.exit(1);
  }
  return raw;
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'POST.json'), readPostAddress());
