import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const assetsDir = path.join(__dirname, '../src/assets');
const imagesToOptimize = [
  { input: 'profile-pic.png', output: 'profile-pic.webp', width: 600 },
  { input: 'profile-pic-2.png', output: 'profile-pic-2.webp', width: 600 },
  { input: 'snapgram.png', output: 'snapgram.webp', width: 800 },
];

async function optimizeImages() {
  console.log('🖼️  Optimizing images...\n');

  for (const { input, output, width } of imagesToOptimize) {
    const inputPath = path.join(assetsDir, input);
    const outputPath = path.join(assetsDir, output);

    if (!fs.existsSync(inputPath)) {
      console.log(`⚠️  Skipping ${input} (not found)`);
      continue;
    }

    try {
      const info = await sharp(inputPath)
        .resize(width, null, {
          fit: 'inside',
          withoutEnlargement: true
        })
        .webp({ quality: 85 })
        .toFile(outputPath);

      const originalSize = fs.statSync(inputPath).size;
      const newSize = info.size;
      const reduction = ((1 - newSize / originalSize) * 100).toFixed(1);

      console.log(`✅ ${input} → ${output}`);
      console.log(`   ${(originalSize / 1024 / 1024).toFixed(2)}MB → ${(newSize / 1024).toFixed(0)}KB (${reduction}% reduction)\n`);
    } catch (error) {
      console.error(`❌ Error optimizing ${input}:`, error.message);
    }
  }

  console.log('✨ Image optimization complete!');
}

optimizeImages();
