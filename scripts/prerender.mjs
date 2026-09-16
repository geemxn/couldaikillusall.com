import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = path.resolve(process.cwd());
const dist = path.join(root, 'dist');
const serverFile = path.join(root, 'dist-server', 'entry-server.js');
const templatePath = path.join(dist, 'index.html');
const template = await fs.readFile(templatePath, 'utf8');
const server = await import(pathToFileURL(serverFile).href + `?v=${Date.now()}`);

const domain = 'https://couldaikillusall.com';
const xmlEscape = (value='') => String(value).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&apos;');

function htmlFor(url) {
  const { appHtml, head } = server.render(url);
  return template.replace('<!--app-head-->', head).replace('<!--app-html-->', appHtml);
}

function outputPath(route) {
  if (route === '/') return path.join(dist, 'index.html');
  return path.join(dist, `${route.slice(1)}.html`);
}

for (const route of server.routes) {
  const file = outputPath(route);
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, htmlFor(route), 'utf8');
}

// Firebase Hosting serves this for unknown paths, preserving a real HTTP 404.
await fs.writeFile(path.join(dist, '404.html'), htmlFor('/this-page-does-not-exist'), 'utf8');

const entries = server.getSitemapEntries();
const urlset = entries.map((entry) => {
  const loc = routeUrl(entry.path);
  const image = entry.image ? `\n    <image:image><image:loc>${xmlEscape(entry.image.startsWith('http') ? entry.image : domain + entry.image)}</image:loc>${entry.imageAlt ? `<image:caption>${xmlEscape(entry.imageAlt)}</image:caption>` : ''}</image:image>` : '';
  return `  <url>\n    <loc>${xmlEscape(loc)}</loc>\n    <lastmod>${xmlEscape(entry.lastmod)}</lastmod>${image}\n  </url>`;
}).join('\n');
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urlset}\n</urlset>\n`;
await fs.writeFile(path.join(dist, 'sitemap.xml'), sitemap, 'utf8');

const imageEntries = entries.filter((e) => e.image).map((entry) => {
  const img = entry.image.startsWith('http') ? entry.image : domain + entry.image;
  return `  <url>\n    <loc>${xmlEscape(routeUrl(entry.path))}</loc>\n    <image:image><image:loc>${xmlEscape(img)}</image:loc><image:caption>${xmlEscape(entry.imageAlt || '')}</image:caption></image:image>\n  </url>`;
}).join('\n');
const imageSitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${imageEntries}\n</urlset>\n`;
await fs.writeFile(path.join(dist, 'image-sitemap.xml'), imageSitemap, 'utf8');

function routeUrl(route) { return route === '/' ? domain : `${domain}${route}`; }

// A small human-readable machine index. It is not treated as a ranking mechanism.
const llms = `# Could AI Kill Us All?\n\nEvidence-first educational guides about advanced AI risk, alignment, AGI, superintelligence, cyber risk, biosecurity, autonomous weapons, humanoid robots, consciousness, and safeguards.\n\nCanonical site: ${domain}\nPrimary source library: ${domain}/sources\nEditorial policy: ${domain}/editorial-policy\n\n## Pillar guides\n${entries.filter(e=>e.path.startsWith('/articles/')).map(e=>`- ${routeUrl(e.path)}`).join('\n')}\n`;
// Ensure Googlebot-Image compliant robots.txt is preserved in dist
await fs.copyFile(path.join(root, 'public', 'robots.txt'), path.join(dist, 'robots.txt'));

console.log(`Prerendered ${server.routes.length} indexable routes + 404; wrote ${entries.length} sitemap URLs and ${entries.filter(e=>e.image).length} image entries.`);
