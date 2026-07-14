const Tesseract = require('tesseract.js');
const fs = require('fs');
const path = require('path');

const imagesDir = 'C:\\Users\\Dev\\.gemini\\antigravity-ide\\scratch\\images';
const outputFile = 'C:\\Users\\Dev\\.gemini\\antigravity-ide\\scratch\\ocr_results_node.txt';

async function runOCR() {
  // Clear previous output file
  if (fs.existsSync(outputFile)) {
    fs.unlinkSync(outputFile);
  }

  // Get and sort page files
  const files = fs.readdirSync(imagesDir)
    .filter(file => file.endsWith('.png'))
    .sort((a, b) => {
      const matchA = a.match(/page_(\d+)_img_\d+\.png/);
      const matchB = b.match(/page_(\d+)_img_\d+\.png/);
      const numA = matchA ? parseInt(matchA[1], 10) : 0;
      const numB = matchB ? parseInt(matchB[1], 10) : 0;
      return numA - numB;
    });

  console.log(`Starting OCR on ${files.length} images...`);

  for (const file of files) {
    const filePath = path.join(imagesDir, file);
    console.log(`Processing ${file}...`);
    try {
      const result = await Tesseract.recognize(filePath, 'eng');
      const text = result.data.text;
      
      const header = `\n--- ${file} ---\n`;
      fs.appendFileSync(outputFile, header + text, 'utf8');
      console.log(`Saved text for ${file}`);
    } catch (err) {
      console.error(`Error processing ${file}:`, err);
      fs.appendFileSync(outputFile, `\n--- ${file} (Error) ---\n${err.message}\n`, 'utf8');
    }
  }

  console.log('OCR process complete!');
  process.exit(0);
}

runOCR();
