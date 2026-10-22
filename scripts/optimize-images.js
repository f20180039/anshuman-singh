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
  ...projectImages(),
];

/**
 * Case-study screenshots under `projects/`: `<slug>-card` is the grid / featured
 * / hero image (640 wide, like the older cards); `<slug>-<n>` is a gallery
 * image (1280 wide for landscape captures). Portrait phone screenshots are
 * encoded at 720 wide instead: a 1080×1920 shot resized to 1280 wide would be
 * enlarged, and the gallery strip (28rem tall, see CaseStudy.tsx) shows a
 * 9:16 portrait at ~252 CSS px wide, so 720 covers it at 2× and all but
 * exactly at 3×. The strip links each shot to the file itself for a
 * full-size view, which is the encoded size, not the original.
 */
function projectImages() {
  const card = (slug) => ({
    input: `projects/${slug}-card.png`,
    output: `projects/${slug}-card.webp`,
    width: 640,
  });
  const gallery = (slug, n, portrait = false) => ({
    input: `projects/${slug}-${n}.png`,
    output: `projects/${slug}-${n}.webp`,
    width: portrait ? 720 : 1280,
  });
  return [
    card("shaanti"),
    ...[1, 2, 3, 4, 5, 6].map((n) => gallery("shaanti", n, true)),
    card("signal-desk"),
    ...[1, 2, 3].map((n) => gallery("signal-desk", n)),
    card("solarfile-reels"),
    gallery("solarfile-reels", 1),
    gallery("solarfile-reels", 2),
    gallery("solarfile-reels", 3, true),
    card("toodler"),
    ...[1, 2, 3].map((n) => gallery("toodler", n)),
    card("quiz-wizz"),
    // Before/after composite is landscape; the colourised page alone is a
    // 600×853 portrait and stays at its native size (no enlargement).
    card("mangakahue"),
    gallery("mangakahue", 1, true),
    // The full verdict card is a tall portrait render; the flow diagram is an
    // SVG imported directly and never passes through here.
    card("satya-aahar"),
    gallery("satya-aahar", 1, true),
  ];
}

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
        `${(info.size / 1024).toFixed(0).padStart(4)} KB  (-${saved}%)  ${output}`,
    );
  }

  console.log(
    `\nTotal ${(before / 1024).toFixed(0)} KB → ${(after / 1024).toFixed(0)} KB ` +
      `(-${((1 - after / before) * 100).toFixed(0)}%)`,
  );
}

optimize().catch((error) => {
  console.error(error);
  process.exit(1);
});
