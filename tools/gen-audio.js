#!/usr/bin/env node
/**
 * Generate native-sounding Telugu MP3s for every phrase in the curriculum.
 *
 * Why: the browser's TTS sounds robotic. Pre-recorded audio is the single
 * biggest perceived-quality lift the app can get.
 *
 * Provider: Google Cloud Text-to-Speech (Wavenet voices are excellent for Telugu,
 * and the free tier covers up to 1M Wavenet characters per month — more than
 * enough for the whole 250-phrase corpus several times over).
 *
 * Setup (one-time, ~10 minutes):
 *   1.  Go to https://console.cloud.google.com/
 *   2.  Create a project (or pick an existing one)
 *   3.  APIs & Services -> Library -> "Cloud Text-to-Speech API" -> Enable
 *   4.  APIs & Services -> Credentials -> Create credentials -> API key
 *       (restrict it to only the TTS API for safety)
 *   5.  Copy the API key
 *
 * Run:
 *   cd tools
 *   GOOGLE_TTS_KEY=AIzaSy... node gen-audio.js
 *
 * Options:
 *   --voice=te-IN-Wavenet-A     (default; female. -B male, -C female, -D male)
 *   --limit=N                   (only generate first N missing phrases, for testing)
 *   --dry-run                   (list what would be generated, don't call the API)
 *   --force                     (re-generate even if MP3 already exists)
 *
 * Output:
 *   ../audio/<slug>.mp3        one file per phrase
 *   ../audio/manifest.json     { "<slug>": true, ... } — the app reads this
 *                              at boot to know which phrases have recordings.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const require = createRequire(import.meta.url);

// ---- CLI args ----
const argv = process.argv.slice(2);
function arg(name, def = null) {
  const hit = argv.find(a => a.startsWith("--" + name + "="));
  if (hit) return hit.split("=")[1];
  if (argv.includes("--" + name)) return true;
  return def;
}
const voice    = arg("voice", "te-IN-Wavenet-A");
const limit    = parseInt(arg("limit", "0"), 10);
const dryRun   = !!arg("dry-run");
const force    = !!arg("force");

const apiKey = process.env.GOOGLE_TTS_KEY;
if (!apiKey && !dryRun) {
  console.error("ERROR: set GOOGLE_TTS_KEY in your environment.");
  console.error("       (or run with --dry-run to preview without calling the API)");
  process.exit(1);
}

// ---- Load every unique phrase from the curriculum ----
// lessons.js / scenarios.js use CommonJS module.exports at the bottom,
// so require() is the safest cross-platform loader.
const { LESSONS, PHRASEBOOK } = require(path.join(root, "lessons.js"));
const { SCENARIOS }           = require(path.join(root, "scenarios.js"));

function slug(s) {
  return (s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const seen = new Set();
const phrases = []; // { slug, script, te }

function add(te, script) {
  if (!te || !script) return;
  const s = slug(te);
  if (!s || seen.has(s)) return;
  seen.add(s);
  phrases.push({ slug: s, te, script });
}

// From lessons.js
LESSONS.forEach(lesson => lesson.sections?.forEach(sec => {
  if (sec.type === "phrases") sec.items?.forEach(it => add(it.te, it.script));
  if (sec.type === "dialog")  sec.lines?.forEach(l => add(l.te, l.te)); // dialog lines store te + an internal script
}));

// From scenarios.js
SCENARIOS.forEach(scen => scen.turns?.forEach(turn => {
  if (turn.type === "npc")    add(turn.te, turn.script || turn.te);
  if (turn.type === "choice") turn.options?.forEach(o => add(o.te, o.script || o.te));
}));

console.log(`Found ${phrases.length} unique phrases.\n`);

// ---- Generate ----
const audioDir = path.join(root, "audio");
if (!fs.existsSync(audioDir)) fs.mkdirSync(audioDir);

const manifestPath = path.join(audioDir, "manifest.json");
const manifest = fs.existsSync(manifestPath)
  ? JSON.parse(fs.readFileSync(manifestPath, "utf8"))
  : {};

let toMake = phrases.filter(p => force || !fs.existsSync(path.join(audioDir, p.slug + ".mp3")));
if (limit > 0) toMake = toMake.slice(0, limit);

if (toMake.length === 0) {
  console.log("Nothing to generate — every phrase already has an MP3.");
  console.log("Use --force to re-generate.");
  process.exit(0);
}

console.log(`Will generate ${toMake.length} MP3s with voice ${voice}.`);
if (dryRun) {
  toMake.slice(0, 10).forEach(p => console.log("  ", p.slug, "<-", p.script));
  if (toMake.length > 10) console.log(`  ... and ${toMake.length - 10} more`);
  console.log("\n(dry-run: nothing written)");
  process.exit(0);
}

const endpoint = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`;
let done = 0;
let chars = 0;

for (const p of toMake) {
  const body = {
    input: { text: p.script },
    voice: { languageCode: "te-IN", name: voice },
    audioConfig: { audioEncoding: "MP3", speakingRate: 0.95 }
  };
  try {
    const resp = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    if (!resp.ok) {
      const err = await resp.text();
      throw new Error(`HTTP ${resp.status}: ${err.slice(0, 200)}`);
    }
    const json = await resp.json();
    const mp3 = Buffer.from(json.audioContent, "base64");
    fs.writeFileSync(path.join(audioDir, p.slug + ".mp3"), mp3);
    manifest[p.slug] = true;
    chars += p.script.length;
    done++;
    if (done % 10 === 0) console.log(`  ${done}/${toMake.length}…`);
  } catch (e) {
    console.error(`  FAIL ${p.slug}: ${e.message}`);
  }
}

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
console.log(`\nDone. ${done} files written, ${chars} chars billed.`);
console.log(`Manifest at ${manifestPath}`);
console.log(`\nCommit /audio + manifest.json and the app will start using them.`);
