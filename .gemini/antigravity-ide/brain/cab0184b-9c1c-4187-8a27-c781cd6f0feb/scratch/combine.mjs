import fs from 'fs';
import path from 'path';

const dirPath = 'c:/Users/rishi/MAJIN/Website/components/scanfeast';
const outPath = 'c:/Users/rishi/MAJIN/Website/scanfeast_combined.txt';

const files = fs.readdirSync(dirPath);

let combinedContent = '';

for (const file of files) {
  const fullPath = path.join(dirPath, file);
  if (fs.statSync(fullPath).isFile()) {
    const content = fs.readFileSync(fullPath, 'utf8');
    combinedContent += `\n\n=======================================================\n`;
    combinedContent += `File: ${fullPath}\n`;
    combinedContent += `=======================================================\n\n`;
    combinedContent += content;
  }
}

fs.writeFileSync(outPath, combinedContent.trim(), 'utf8');
console.log(`Successfully combined files into ${outPath}`);
