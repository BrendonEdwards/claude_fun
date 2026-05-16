import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { Resvg } from '@resvg/resvg-js';

const __dir = dirname(fileURLToPath(import.meta.url));
const root = join(__dir, '..');

const themes = ['football', 'weather', 'calculator', 'notes'];

for (const theme of themes) {
  const svgPath = join(root, 'public/icons/src', `${theme}.svg`);
  const svg = readFileSync(svgPath, 'utf-8');

  for (const size of [192, 512]) {
    const resvg = new Resvg(svg, {
      fitTo: { mode: 'width', value: size },
    });
    const pngData = resvg.render();
    const pngBuffer = pngData.asPng();
    const pngPath = join(root, 'public/icons', theme, `icon-${size}.png`);
    writeFileSync(pngPath, pngBuffer);
    console.log(`Generated ${theme}/icon-${size}.png`);
  }
}

console.log('All icons generated.');
