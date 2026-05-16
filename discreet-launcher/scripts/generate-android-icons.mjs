import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { Resvg } from '@resvg/resvg-js';

const __dir = dirname(fileURLToPath(import.meta.url));
const root = join(__dir, '..');
const svg = readFileSync(join(root, 'public/icons/src/football.svg'), 'utf-8');

// Android mipmap density → pixel size
const SIZES = {
  'mipmap-mdpi':    48,
  'mipmap-hdpi':    72,
  'mipmap-xhdpi':   96,
  'mipmap-xxhdpi':  144,
  'mipmap-xxxhdpi': 192,
};

const androidRes = join(root, 'android/app/src/main/res');

for (const [dir, size] of Object.entries(SIZES)) {
  const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: size } });
  const png = resvg.render().asPng();
  const path = join(androidRes, dir, 'ic_launcher.png');
  writeFileSync(path, png);
  const roundPath = join(androidRes, dir, 'ic_launcher_round.png');
  writeFileSync(roundPath, png);
  console.log(`${dir}: ${size}px`);
}

// Foreground for adaptive icon (anydpi-v26) — use the full 108dp canvas
const resvgFg = new Resvg(svg, { fitTo: { mode: 'width', value: 432 } });
const fgPng = resvgFg.render().asPng();
writeFileSync(join(androidRes, 'mipmap-xxxhdpi', 'ic_launcher_foreground.png'), fgPng);

console.log('Android icons generated.');
