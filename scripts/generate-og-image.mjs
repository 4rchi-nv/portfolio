/**
 * Syncs the curated OG image into public/og-image.png.
 * Source of truth: assets/og-image-source.png (may be JPEG bytes with .png name).
 * Ensures a real PNG at 1200×630 so social previews stay consistent.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourcePath = path.join(root, "assets", "og-image-source.png");
const outPath = path.join(root, "public", "og-image.png");

if (!existsSync(sourcePath)) {
  console.error("Missing assets/og-image-source.png — add the curated OG image first.");
  process.exit(1);
}

const input = readFileSync(sourcePath);
const output = await sharp(input)
  .resize(1200, 630, {
    fit: "cover",
    position: "centre",
  })
  .png({ compressionLevel: 9, palette: false })
  .toBuffer();

writeFileSync(outPath, output);

const meta = await sharp(output).metadata();
console.log(
  `Synced public/og-image.png (${meta.width}×${meta.height}, ${output.length} bytes)`,
);
