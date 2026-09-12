const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const figures = [
  {
    svgPath: path.join(__dirname, 'assets/figure1_bode_mag.svg'),
    jpegPath: path.join(__dirname, 'assets/figure1_bode_mag.jpeg'),
    width: 450,
    height: 380
  },
  {
    svgPath: path.join(__dirname, 'assets/figure2_bode_phase.svg'),
    jpegPath: path.join(__dirname, 'assets/figure2_bode_phase.jpeg'),
    width: 450,
    height: 380
  },
  {
    svgPath: path.join(__dirname, 'assets/sample_spectral.svg'),
    jpegPath: path.join(__dirname, 'assets/sample_spectral.jpeg'),
    width: 900,
    height: 420
  }
];

figures.forEach(fig => {
  const svgContent = fs.readFileSync(fig.svgPath, 'utf8');
  const tempHtmlPath = path.join(__dirname, `temp_${path.basename(fig.svgPath)}.html`);
  const tempPngPath = path.join(__dirname, `temp_${path.basename(fig.svgPath)}.png`);

  const html = `<!DOCTYPE html><html><head><style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { background: #ffffff; width:${fig.width}px; height:${fig.height}px; overflow:hidden; }
  </style></head><body>${svgContent}</body></html>`;

  fs.writeFileSync(tempHtmlPath, html, 'utf8');

  // Take screenshot via headless Chrome
  const cmd = `"${chromePath}" --headless --disable-gpu --window-size=${fig.width},${fig.height} --screenshot="${tempPngPath}" "file://${tempHtmlPath}"`;
  execSync(cmd);

  // Convert PNG to JPEG with sips on macOS
  const sipsCmd = `sips -s format jpeg -s formatOptions 95 "${tempPngPath}" --out "${fig.jpegPath}"`;
  execSync(sipsCmd);

  // Cleanup temps
  if (fs.existsSync(tempHtmlPath)) fs.unlinkSync(tempHtmlPath);
  if (fs.existsSync(tempPngPath)) fs.unlinkSync(tempPngPath);

  console.log(`Rendered light paper JPEG: ${fig.jpegPath}`);
});

console.log('All figures successfully rendered to light/paper background JPEGs.');
