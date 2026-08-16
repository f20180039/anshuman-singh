/**
 * Generates the favicon set and the Open Graph card into public/.
 *
 * Run manually (`npm run gen:brand`) and commit the output. Deliberately NOT
 * part of `npm run build`: these are SVG-to-raster conversions whose text
 * rendering depends on fonts installed on the machine, and the GitHub Actions
 * runner has a different font set than a dev laptop. Baking the results into
 * the repo keeps CI deterministic.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, "../public");

// Pulled from the dark theme tokens in src/index.css so the icon matches the
// default theme a first-time visitor sees.
const BG = "#030712";
const BG_ALT = "#0e1b30";
const ACCENT = "#67e8f9";
const FG = "#f8fafc";
const MUTED = "#cbd5e1";

const FONT_STACK =
  "Helvetica Neue, Helvetica, Arial, DejaVu Sans, Liberation Sans, sans-serif";

/** Monogram mark. `pad` keeps the glyph clear of maskable-icon safe zones. */
const iconSvg = ({ size, rounded = true, padRatio = 0 }) => {
  const inset = size * padRatio;
  const box = size - inset * 2;
  const radius = rounded ? box * 0.22 : 0;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${BG}"/>
      <stop offset="100%" stop-color="${BG_ALT}"/>
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" fill="${rounded ? "none" : "url(#bg)"}"/>
  <rect x="${inset}" y="${inset}" width="${box}" height="${box}" rx="${radius}" ry="${radius}" fill="url(#bg)"/>
  <rect x="${inset + box * 0.04}" y="${inset + box * 0.04}" width="${box * 0.92}" height="${box * 0.92}" rx="${radius * 0.85}" ry="${radius * 0.85}" fill="none" stroke="${ACCENT}" stroke-opacity="0.35" stroke-width="${Math.max(1, box * 0.03)}"/>
  <text x="${size / 2}" y="${inset + box * 0.72}" font-family="${FONT_STACK}" font-size="${box * 0.62}" font-weight="700" fill="${ACCENT}" text-anchor="middle">A</text>
  <rect x="${inset + box * 0.3}" y="${inset + box * 0.79}" width="${box * 0.4}" height="${Math.max(1, box * 0.07)}" rx="${box * 0.035}" fill="${ACCENT}"/>
</svg>`;
};

const ogSvg = () => `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${BG}"/>
      <stop offset="55%" stop-color="#091220"/>
      <stop offset="100%" stop-color="${BG_ALT}"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.18" cy="0.15" r="0.75">
      <stop offset="0%" stop-color="${ACCENT}" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="${ACCENT}" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M48 0H0V48" fill="none" stroke="${ACCENT}" stroke-opacity="0.07" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <rect x="0" y="0" width="1200" height="6" fill="${ACCENT}"/>

  <rect x="72" y="86" width="104" height="104" rx="24" fill="none" stroke="${ACCENT}" stroke-opacity="0.5" stroke-width="3"/>
  <text x="124" y="160" font-family="${FONT_STACK}" font-size="64" font-weight="700" fill="${ACCENT}" text-anchor="middle">A</text>

  <text x="72" y="300" font-family="${FONT_STACK}" font-size="82" font-weight="700" fill="${FG}">Anshuman Singh</text>
  <text x="72" y="368" font-family="${FONT_STACK}" font-size="40" font-weight="500" fill="${ACCENT}">Frontend Engineer</text>
  <rect x="72" y="404" width="120" height="4" rx="2" fill="${ACCENT}" fill-opacity="0.7"/>
  <text x="72" y="466" font-family="${FONT_STACK}" font-size="30" font-weight="400" fill="${MUTED}">React · TypeScript · AI integrations · Web performance</text>
  <text x="72" y="516" font-family="${FONT_STACK}" font-size="26" font-weight="400" fill="${MUTED}" fill-opacity="0.8">HealthPlix Technologies · Bengaluru, India</text>
  <text x="72" y="576" font-family="${FONT_STACK}" font-size="24" font-weight="500" fill="${ACCENT}" fill-opacity="0.85">f20180039.github.io/anshuman-singh</text>
</svg>`;

/**
 * Packs PNGs into an .ico container. sharp cannot emit ICO, and browsers plus
 * some crawlers still probe /favicon.ico at the site root, so we build the
 * 6-byte header + 16-byte directory entries by hand.
 */
function buildIco(pngs) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(pngs.length, 4);

  let offset = 6 + pngs.length * 16;
  const entries = [];
  for (const { size, data } of pngs) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0); // width (0 means 256)
    entry.writeUInt8(size >= 256 ? 0 : size, 1); // height
    entry.writeUInt8(0, 2); // palette size
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    entries.push(entry);
    offset += data.length;
  }

  return Buffer.concat([header, ...entries, ...pngs.map((p) => p.data)]);
}

const MANIFEST = {
  name: "Anshuman Singh — Frontend Engineer",
  short_name: "A. Singh",
  description:
    "Portfolio of Anshuman Singh, a frontend engineer working in React, TypeScript and AI integrations.",
  start_url: "/anshuman-singh/",
  scope: "/anshuman-singh/",
  display: "standalone",
  background_color: BG,
  theme_color: BG,
  icons: [
    { src: "icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
    { src: "icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
    {
      src: "icon-maskable-512.png",
      sizes: "512x512",
      type: "image/png",
      purpose: "maskable",
    },
  ],
};

async function render(svg, size) {
  return sharp(Buffer.from(svg)).resize(size, size).png({ compressionLevel: 9 }).toBuffer();
}

async function main() {
  fs.mkdirSync(publicDir, { recursive: true });
  const written = [];

  const write = (name, buffer) => {
    fs.writeFileSync(path.join(publicDir, name), buffer);
    written.push([name, buffer.length]);
  };

  // Scalable favicon — preferred by modern browsers, stays crisp at any size.
  write("favicon.svg", Buffer.from(iconSvg({ size: 512 })));

  // Raster favicons.
  const icoSizes = [16, 32, 48];
  const icoPngs = [];
  for (const size of icoSizes) {
    icoPngs.push({ size, data: await render(iconSvg({ size: 512 }), size) });
  }
  write("favicon.ico", buildIco(icoPngs));
  write("favicon-32x32.png", icoPngs[1].data);

  write("apple-touch-icon.png", await render(iconSvg({ size: 512 }), 180));
  write("icon-192.png", await render(iconSvg({ size: 512 }), 192));
  write("icon-512.png", await render(iconSvg({ size: 512 }), 512));
  // Maskable icons get cropped to a circle on Android, so inset the artwork.
  write(
    "icon-maskable-512.png",
    await render(iconSvg({ size: 512, padRatio: 0.14 }), 512)
  );

  write("site.webmanifest", Buffer.from(JSON.stringify(MANIFEST, null, 2)));

  write(
    "og-image.png",
    await sharp(Buffer.from(ogSvg())).png({ compressionLevel: 9 }).toBuffer()
  );

  for (const [name, bytes] of written) {
    console.log(`  ${name.padEnd(26)} ${(bytes / 1024).toFixed(1)} KB`);
  }
  console.log(`\nWrote ${written.length} brand assets to public/`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
