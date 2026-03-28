const JSZip = require('jszip');
const fs = require('fs');
const path = require('path');

const zip = new JSZip();

zip.file('package.json', JSON.stringify({
  name: 'test-pwa-project',
  version: '1.0.0',
  description: 'Test PWA application',
  dependencies: {
    'next': '^15.0.0',
    'react': '^18.0.0',
    'typescript': '^5.0.0',
    'tailwindcss': '^3.0.0'
  }
}, null, 2));

zip.file('README.md', `# Test PWA Project

Toto je testovacia PWA aplikácia s Next.js a React. Aplikácia demonštruje modernú webovú technológiu s offline podporou.

## Features
- Server-side rendering
- Static generation
- Progressive Web App`);

zip.file('src/index.ts', 'export function hello() { console.log("Hello!"); }');

zip.generateAsync({ type: 'nodebuffer' }).then(data => {
  const outPath = path.join(process.env.USERPROFILE || '/c/Users/42195', 'Desktop', 'test-project.zip');
  fs.writeFileSync(outPath, data);
  console.log('✅ test-project.zip vytvorený!');
  console.log('Path:', outPath);
});
