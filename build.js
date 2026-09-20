// Build de produção: minifica o HTML/CSS e ofusca o JS.
// Roda na Vercel (npm run build) e gera a pasta dist/.
const fs = require('fs');
const JavaScriptObfuscator = require('javascript-obfuscator');
const { minify } = require('html-minifier-terser');

const COPYRIGHT = '<!-- © 2026 Cuoncient (cuoncient.com). Código e design proprietários. Reprodução, cópia ou redistribuição proibidas. -->';

(async () => {
  fs.rmSync('dist', { recursive: true, force: true });
  fs.mkdirSync('dist');

  const html = await minify(fs.readFileSync('index.html', 'utf8'), {
    collapseWhitespace: true,
    removeComments: true,
    minifyCSS: true,
    removeRedundantAttributes: true,
    useShortDoctype: true
  });
  fs.writeFileSync('dist/index.html', html.replace(/^<!doctype html>/i, '<!doctype html>' + COPYRIGHT));

  const js = JavaScriptObfuscator.obfuscate(fs.readFileSync('app.js', 'utf8'), {
    compact: true,
    stringArray: true,
    stringArrayEncoding: ['base64'],
    stringArrayThreshold: 1,
    rotateStringArray: true,
    shuffleStringArray: true,
    identifierNamesGenerator: 'mangled',
    transformObjectKeys: true,
    renameGlobals: false
  }).getObfuscatedCode();
  fs.writeFileSync('dist/app.js', js);

  for (const f of ['robots.txt', 'sitemap.xml', 'favicon.svg', 'site.webmanifest', 'apple-touch-icon.png', 'icone-192.png', 'icone-512.png']) fs.copyFileSync(f, 'dist/' + f);
  console.log('build ok:', fs.readdirSync('dist').join(', '));
})();
