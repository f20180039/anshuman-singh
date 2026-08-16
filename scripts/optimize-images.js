/**
 * Converts raster assets in src/assets to WebP at display size.
 *
 * Only the .webp outputs are committed — the PNG/JPEG originals were removed
 * once converted, since keeping a 600 KB source next to an 18 KB output that
 * nobody regenerates is just weight in the clone.
 *
 * To replace an image: drop the new PNG/JPEG into src/assets under the `input`
 * name below, run `npm run gen:images`, commit the .webp, and delete the
 * source again. Inputs that are absent are skipped, so a partial run is fine.
 */
import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const assetsDir = path.join(__dirname, "../src/assets");

/**
 * `width` is the widest the image is ever displayed (see the Tailwind classes
 * on the consuming component), doubled for retina. Encoding larger than that
 * is bytes nobody sees.
 */
const TARGETS = [
  { input: "snapgram.png", output: "snapgram.webp", width: 640 },
  {
    input: "exploding-production.png",
    output: "exploding-production.webp",
    width: 640,
  },
  { input: "GuessGame.png", output: "GuessGame.webp", width: 640 },
  {
    input: "profile-pic-2-optimized.jpg",
    output: "profile-pic-2-optimized.webp",
    width: 384,
  },
];

async function optimize() {
  let before = 0;
  let after = 0;

  for (const { input, output, width } of TARGETS) {
    const inputPath = path.join(assetsDir, input);
    const outputPath = path.join(assetsDir, output);

    if (!fs.existsSync(inputPath)) {
      console.log(`  skipped  ${input} (not found)`);
      continue;
    }

    const info = await sharp(inputPath)
      .resize(width, null, { fit: "inside", withoutEnlargement: true })
      .webp({ quality: 82, effort: 6 })
      .toFile(outputPath);

    const originalSize = fs.statSync(inputPath).size;
    before += originalSize;
    after += info.size;

    const saved = ((1 - info.size / originalSize) * 100).toFixed(0);
    console.log(
      `  ${input.padEnd(30)} ${(originalSize / 1024).toFixed(0).padStart(5)} KB → ` +
        `${(info.size / 1024).toFixed(0).padStart(4)} KB  (-${saved}%)  ${output}`
    );
  }

  console.log(
    `\nTotal ${(before / 1024).toFixed(0)} KB → ${(after / 1024).toFixed(0)} KB ` +
      `(-${((1 - after / before) * 100).toFixed(0)}%)`
  );
}

optimize().catch((error) => {
  console.error(error);
  process.exit(1);
});
