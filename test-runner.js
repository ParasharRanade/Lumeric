const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

async function runTests() {
  console.log('--- Starting Project Lumière Task Architect Automated Verification ---');
  
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  
  const browser = await puppeteer.launch({
    executablePath: edgePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1600,1200']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1600, height: 1200 });

  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
      console.error('BROWSER CONSOLE ERROR:', msg.text());
    } else {
      console.log('BROWSER LOG:', msg.text());
    }
  });

  page.on('pageerror', err => {
    consoleErrors.push(err.toString());
    console.error('PAGE ERROR:', err);
  });

  console.log('1. Navigating to http://localhost:4173...');
  await page.goto('http://localhost:4173', { waitUntil: 'networkidle0' });

  const title = await page.title();
  console.log('Page Title:', title);

  // 2. Check input fields existence including new Project Lumiere fields
  console.log('2. Verifying Project Lumiere Engineering & CS input fields existence...');
  const fields = await page.evaluate(() => {
    return {
      subdomainSelect: !!document.getElementById('subdomainSelect'),
      disciplineSelect: !!document.getElementById('disciplineSelect'),
      subtypeSelect: !!document.getElementById('subtypeSelect'),
      imageInput: !!document.getElementById('imageInput'),
      imageSourceType: !!document.getElementById('imageSourceType'),
      imageLicense: !!document.getElementById('imageLicense'),
      imageDescription: !!document.getElementById('imageDescription'),
      cbNonTransparent: !!document.getElementById('cbNonTransparent'),
      cbNotBioRender: !!document.getElementById('cbNotBioRender'),
      cbOutputFormatImage: !!document.getElementById('cbOutputFormatImage'),
      taskPromptInput: !!document.getElementById('taskPromptInput'),
      promptCharCounter: !!document.getElementById('promptCharCounter'),
      btnInsertClosingSentence: !!document.getElementById('btnInsertClosingSentence'),
      conventionsInput: !!document.getElementById('conventionsInput'),
      cbQuestionOnly: !!document.getElementById('cbQuestionOnly'),
      cbCalculatorSolvable: !!document.getElementById('cbCalculatorSolvable'),
      cbKnowledgeCutoff: !!document.getElementById('cbKnowledgeCutoff'),
      model1Name: !!document.getElementById('model1Name'),
      model1Failed: !!document.getElementById('model1Failed'),
      model2Name: !!document.getElementById('model2Name'),
      model2Failed: !!document.getElementById('model2Failed'),
      stepByStepInput: !!document.getElementById('stepByStepInput'),
      finalAnswerInput: !!document.getElementById('finalAnswerInput'),
      toleranceSelect: !!document.getElementById('toleranceSelect'),
      distractor1: !!document.getElementById('distractor1'),
      distractor2: !!document.getElementById('distractor2'),
      distractor3: !!document.getElementById('distractor3'),
      distractor4: !!document.getElementById('distractor4'),
      distractor5: !!document.getElementById('distractor5'),
      cbMarkdownKatex: !!document.getElementById('cbMarkdownKatex'),
      cbSolvableOnlyWithImage: !!document.getElementById('cbSolvableOnlyWithImage'),
      cbRequiresDomainExpertise: !!document.getElementById('cbRequiresDomainExpertise'),
      cbExactlyOneAnswer: !!document.getElementById('cbExactlyOneAnswer'),
      btnDownloadImage: !!document.getElementById('btnDownloadImage')
    };
  });
  console.log('Fields verification:', fields);

  // 3. KaTeX Check
  const katexCount = await page.evaluate(() => document.querySelectorAll('.katex').length);
  console.log('KaTeX rendered formula elements count:', katexCount);

  // 4. Quality Score & Compliance Audit Check
  const auditStatus = await page.evaluate(() => {
    return {
      scoreNumber: document.getElementById('scoreNumberBadge').innerText,
      badgeText: document.getElementById('scorecardStatusBadge').innerText,
      majorErrors: document.getElementById('majorErrorCount').innerText,
      minorErrors: document.getElementById('minorErrorCount').innerText,
      passedItems: document.querySelectorAll('.audit-item.passed').length,
      totalItems: document.querySelectorAll('.audit-item').length
    };
  });
  console.log('Project Lumiere Quality Scorecard Audit:', auditStatus);

  // 4b. Multi-Image Verification (up to 5 images)
  console.log('4b. Verifying Multi-Image Support (Up to 5 images)...');
  const multiImageStatus = await page.evaluate(() => {
    const thumbs = document.querySelectorAll('.preview-thumb-card').length;
    const cardFigures = document.querySelectorAll('.card-figure-item').length;
    const counterText = document.getElementById('imageCounterBadge').innerText;
    const gridClass = document.getElementById('cardImageGrid').className;
    return { thumbs, cardFigures, counterText, gridClass };
  });
  console.log('Multi-Image Status for electrical_bode preset:', multiImageStatus);

  // Take Dark mode screenshot
  const darkScreenshotPath = path.join(__dirname, 'screenshot-dark.png');
  await page.screenshot({ path: darkScreenshotPath, fullPage: false });
  console.log('Saved dark screenshot to:', darkScreenshotPath);

  // 5. Test unchecking "Output format is image"
  console.log('5. Testing Image Output toggle behavior...');
  await page.click('#cbOutputFormatImage');
  let btnDisabled = await page.evaluate(() => document.getElementById('btnDownloadImage').hasAttribute('disabled'));
  console.log('Is "Download Image" button disabled after unchecking?:', btnDisabled);

  // Re-check "Output format is image"
  await page.click('#cbOutputFormatImage');
  btnDisabled = await page.evaluate(() => document.getElementById('btnDownloadImage').hasAttribute('disabled'));
  console.log('Is "Download Image" button re-enabled after checking?:', !btnDisabled);

  // 6. Test JPEG Image Download action trigger & Format Selector
  console.log('6. Testing Format Selector and JPEG Download action trigger...');
  const initialFormat = await page.evaluate(() => document.getElementById('imageFormatSelect').value);
  const initialBtnLabel = await page.evaluate(() => document.getElementById('btnDownloadImageText').innerText);
  console.log('Initial export format:', initialFormat, '| Button text:', initialBtnLabel);

  await page.click('#btnDownloadImage');
  await new Promise(r => setTimeout(r, 1500));
  let toastText = await page.evaluate(() => document.getElementById('toastMessage').innerText);
  console.log('Toast notification after JPEG image export:', toastText);

  // Test Download Figures
  console.log('6b. Testing "Download Figures" action trigger...');
  await page.click('#btnDownloadFigures');
  await new Promise(r => setTimeout(r, 1000));
  toastText = await page.evaluate(() => document.getElementById('toastMessage').innerText);
  console.log('Toast notification after Figures export:', toastText);

  // Test Switching format to PNG and back to JPEG
  console.log('6c. Testing format selection switch to PNG and back to JPEG...');
  await page.select('#imageFormatSelect', 'png');
  let pngBtnLabel = await page.evaluate(() => document.getElementById('btnDownloadImageText').innerText);
  console.log('Button text after switching to PNG:', pngBtnLabel);

  await page.select('#imageFormatSelect', 'jpeg');
  let jpegBtnLabel = await page.evaluate(() => document.getElementById('btnDownloadImageText').innerText);
  console.log('Button text after switching back to JPEG:', jpegBtnLabel);

  // 6d. Test Card Image Theme Selector (Dark / Light)
  console.log('6d. Testing Card Image Theme Selector (Dark / Light)...');
  const initialCardTheme = await page.evaluate(() => document.getElementById('cardThemeSelect').value);
  console.log('Initial Card Image Theme:', initialCardTheme);

  // Switch to Light Card Theme
  await page.select('#cardThemeSelect', 'light');
  await new Promise(r => setTimeout(r, 400));
  let cardHasLightClass = await page.evaluate(() => document.getElementById('renderedTaskContainer').classList.contains('card-theme-light'));
  console.log('Does card have card-theme-light class?:', cardHasLightClass);

  // Take screenshot of Light Card Theme
  const lightCardScreenshot = path.join(__dirname, 'screenshot-card-light.png');
  await page.screenshot({ path: lightCardScreenshot, fullPage: false });
  console.log('Saved light card screenshot to:', lightCardScreenshot);

  // Switch back to Dark Card Theme
  await page.select('#cardThemeSelect', 'dark');
  await new Promise(r => setTimeout(r, 400));
  let cardHasDarkClass = await page.evaluate(() => document.getElementById('renderedTaskContainer').classList.contains('card-theme-dark'));
  console.log('Does card have card-theme-dark class?:', cardHasDarkClass);

  // 7. Test Tab switching: Markdown spec
  console.log('7. Testing tab switching to Markdown spec...');
  await page.click('#tabBtnMarkdown');
  await new Promise(r => setTimeout(r, 300));
  const markdownContent = await page.evaluate(() => document.getElementById('rawMarkdownOutput').innerText);
  console.log('Markdown contains 1. Task Prompt?:', markdownContent.includes('### 1. Task Prompt'));
  console.log('Markdown contains 2. Step-by-Step Solution?:', markdownContent.includes('### 2. Step-by-Step Solution'));
  console.log('Markdown contains 3. Ground-Truth Final Answer?:', markdownContent.includes('### 3. Ground-Truth Final Answer'));
  console.log('Markdown contains 4. Distractors?:', markdownContent.includes('### 4. Distractors'));
  console.log('Markdown contains 5. Dual Model Stump Verification?:', markdownContent.includes('### 5. Dual Model Stump Verification'));
  console.log('Markdown contains third schedule certification?:', markdownContent.includes('standing submission criteria, third schedule'));

  const mdScreenshotPath = path.join(__dirname, 'screenshot-markdown-tab.png');
  await page.screenshot({ path: mdScreenshotPath, fullPage: false });

  // 8. Test JSON Spec Tab
  await page.click('#tabBtnJSON');
  await new Promise(r => setTimeout(r, 300));
  const jsonContent = await page.evaluate(() => document.getElementById('rawJSONOutput').innerText);
  const parsedJSON = JSON.parse(jsonContent);
  console.log('JSON spec valid benchmark?:', parsedJSON.benchmark, 'Domain:', parsedJSON.domain, 'Distractors length:', parsedJSON.distractors.length);
  console.log('Dual model stump criteria met?:', parsedJSON.dual_model_testing.stump_criteria_met);

  // Switch back to Rendered
  await page.click('#tabBtnRendered');

  // 9. Test Mandatory Closing Sentence Insertion Helper
  console.log('9. Testing Mandatory Closing Sentence Helper...');
  await page.type('#closingUnitInput', '\\text{MHz}');
  await page.click('#btnInsertClosingSentence');
  await new Promise(r => setTimeout(r, 300));
  const updatedPrompt = await page.evaluate(() => document.getElementById('taskPromptInput').value);
  console.log('Prompt contains updated mandatory unit \\text{MHz}?:', updatedPrompt.includes('The answer should be expressed in \\text{MHz}'));

  // 10. Test Theme toggle
  console.log('10. Testing theme toggle...');
  await page.click('#btnThemeToggle');
  await new Promise(r => setTimeout(r, 400));
  const currentTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
  console.log('Theme changed to:', currentTheme);
  const lightScreenshotPath = path.join(__dirname, 'screenshot-light.png');
  await page.screenshot({ path: lightScreenshotPath, fullPage: false });

  // Toggle back to Dark
  await page.click('#btnThemeToggle');

  // 11. Test Engineering Preset Switching
  console.log('11. Testing engineering preset switching (Mechanical Mohr)...');
  await page.select('#presetSelect', 'mech_mohr');
  await page.click('#btnLoadPreset');
  await new Promise(r => setTimeout(r, 400));
  const newFinalAnswer = await page.evaluate(() => document.getElementById('finalAnswerInput').value);
  const newDiscipline = await page.evaluate(() => document.getElementById('cardDisciplineBadge').innerText);
  console.log('New loaded preset final answer:', newFinalAnswer, 'Discipline:', newDiscipline);

  // 12. Test Computer Science Preset Switching
  console.log('12. Testing CS preset switching (Computer Systems Engineering)...');
  await page.select('#presetSelect', 'cs_cache');
  await page.click('#btnLoadPreset');
  await new Promise(r => setTimeout(r, 400));
  const csAnswer = await page.evaluate(() => document.getElementById('finalAnswerInput').value);
  const csSubtype = await page.evaluate(() => document.getElementById('cardSubtypeBadge').innerText);
  console.log('CS preset final answer:', csAnswer, 'Subtype:', csSubtype);

  await browser.close();

  console.log('--- Verification Finished. Total console errors:', consoleErrors.length, '---');
  if (consoleErrors.length > 0) {
    process.exit(1);
  }
}

runTests().catch(err => {
  console.error('Test Runner Failed:', err);
  process.exit(1);
});
