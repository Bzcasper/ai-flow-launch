import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

// Simple color quantization: round RGB to the nearest step to build a histogram
function quantizeColor([r, g, b], step = 16) {
  const q = (v) => Math.max(0, Math.min(255, Math.round(v / step) * step));
  return `${q(r)},${q(g)},${q(b)}`;
}

function rgbToHex(r, g, b) {
  const toHex = (v) => v.toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      default: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}

async function extractPaletteForImage(filePath, { sampleSize = 120, quantStep = 24 } = {}) {
  const img = sharp(filePath).resize(sampleSize, sampleSize, { fit: 'inside', withoutEnlargement: true }).removeAlpha();
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const histogram = new Map();
  for (let i = 0; i < data.length; i += 3) {
    const key = quantizeColor([data[i], data[i + 1], data[i + 2]], quantStep);
    histogram.set(key, (histogram.get(key) || 0) + 1);
  }
  const entries = [...histogram.entries()].sort((a, b) => b[1] - a[1]);
  const top = entries.slice(0, 8).map(([key, count]) => {
    const [r, g, b] = key.split(',').map((v) => parseInt(v, 10));
    const hex = rgbToHex(r, g, b);
    const hsl = rgbToHsl(r, g, b);
    return { rgb: { r, g, b }, hex, hsl, count };
  });
  return { width: info.width, height: info.height, colors: top };
}

async function main() {
  const brandingDir = path.resolve(process.cwd(), 'src/assets/branding');
  const files = fs.readdirSync(brandingDir).filter((f) => /\.(png|jpe?g|webp)$/i.test(f));
  const results = {};
  for (const f of files) {
    const fp = path.join(brandingDir, f);
    const palette = await extractPaletteForImage(fp);
    results[f] = palette;
  }
  console.log('Branding Palette (top colors per image):');
  for (const [file, { colors }] of Object.entries(results)) {
    console.log(`\n- ${file}`);
    colors.forEach((c, idx) => {
      const { h, s, l } = c.hsl;
      console.log(`  ${idx + 1}. ${c.hex}  hsl(${h} ${s}% ${l}%)  (freq: ${c.count})`);
    });
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
