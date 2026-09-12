const puppeteer = require('puppeteer-core');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: true
  });
  const page = await browser.newPage();
  
  // Render figure 1
  const svg1 = fs.readFileSync('c:/Lumeric/assets/figure1_bode_mag.svg', 'utf8');
  await page.setContent('<!DOCTYPE html><html><body style="margin:0; background:#ffffff;">' + svg1 + '</body></html>');
  await page.setViewport({ width: 450, height: 380, deviceScaleFactor: 2 });
  await page.screenshot({ path: 'c:/Lumeric/assets/figure1_bode_mag.jpeg', type: 'jpeg', quality: 95 });

  // Render figure 2
  const svg2 = fs.readFileSync('c:/Lumeric/assets/figure2_bode_phase.svg', 'utf8');
  await page.setContent('<!DOCTYPE html><html><body style="margin:0; background:#ffffff;">' + svg2 + '</body></html>');
  await page.setViewport({ width: 450, height: 380, deviceScaleFactor: 2 });
  await page.screenshot({ path: 'c:/Lumeric/assets/figure2_bode_phase.jpeg', type: 'jpeg', quality: 95 });

  // Render sample spectral
  const svgSample = fs.readFileSync('c:/Lumeric/assets/sample_spectral.svg', 'utf8');
  await page.setContent('<!DOCTYPE html><html><body style="margin:0; background:#ffffff;">' + svgSample + '</body></html>');
  await page.setViewport({ width: 900, height: 420, deviceScaleFactor: 2 });
  await page.screenshot({ path: 'c:/Lumeric/assets/sample_spectral.jpeg', type: 'jpeg', quality: 95 });

  console.log('Successfully generated .jpeg files for all diagram figures');
  await browser.close();
})();
