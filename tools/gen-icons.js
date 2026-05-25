// Render PNG icons from icon.svg at the sizes needed for PWA / Play / App Store.
// Run from /tools:  node gen-icons.js

import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const src = path.join(root, "icon.svg");
const outDir = path.join(root, "icons");

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

const svg = fs.readFileSync(src);

// Sizes covering: PWA (192, 512), Play (512, 1024), iOS (60, 76, 120, 152, 167, 180, 1024)
const sizes = [48, 72, 96, 120, 144, 152, 167, 180, 192, 256, 384, 512, 1024];

for (const size of sizes) {
  const out = path.join(outDir, `icon-${size}.png`);
  await sharp(svg, { density: 384 })
    .resize(size, size)
    .png({ compressionLevel: 9 })
    .toFile(out);
  console.log(`  ${out.replace(root, ".")}`);
}

// Also render a 1024x500 Play feature graphic from og-image.svg trimmed
const ogSvg = fs.readFileSync(path.join(root, "og-image.svg"));
await sharp(ogSvg, { density: 200 })
  .resize(1024, 500, { fit: "cover", position: "center" })
  .png({ compressionLevel: 9 })
  .toFile(path.join(outDir, "feature-graphic-1024x500.png"));
console.log("  ./icons/feature-graphic-1024x500.png");

// And a 1200x630 PNG copy of the OG image (for Twitter/Facebook unfurlers that don't read SVG)
await sharp(ogSvg, { density: 200 })
  .resize(1200, 630)
  .png({ compressionLevel: 9 })
  .toFile(path.join(root, "og-image.png"));
console.log("  ./og-image.png");

console.log("\nDone.");
