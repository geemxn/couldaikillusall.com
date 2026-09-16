import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const root = process.cwd();
const articleDir = path.join(root, 'src', 'content', 'articles');
const imageDir = path.join(root, 'public', 'assets', 'articles');
const dist = path.join(root, 'dist');
const articleFiles = fs.readdirSync(articleDir).filter(f => /^\d\d-.*\.md$/.test(f)).sort();
const failures = [];
const wordCount = (text) => (text.match(/[\p{L}\p{N}][\p{L}\p{N}'’\-]*/gu) || []).length;

if (articleFiles.length !== 12) failures.push(`Expected 12 article markdown files, found ${articleFiles.length}`);
for (const file of articleFiles) {
  const text = fs.readFileSync(path.join(articleDir, file),'utf8');
  const words = wordCount(text);
  if (words < 3000) failures.push(`${file}: ${words} words, expected >=3000`);
  if (!/^## Overview/m.test(text)) failures.push(`${file}: missing ## Overview`);
  if (!/^## (?:Frequently asked questions|FAQ)\s*$/m.test(text)) failures.push(`${file}: missing FAQ section`);
  if (!/^## (?:Sources and further reading|Sources)\s*$/m.test(text)) failures.push(`${file}: missing sources section`);
}

const slugs = articleFiles.map(f => f.replace(/^\d\d-/,'').replace(/\.md$/,''));
const imageHashes = new Map();
for (const slug of slugs) {
  for (const suffix of ['1600x900','1200x900','1200x1200']) {
    const p = path.join(imageDir, `${slug}-${suffix}.webp`);
    if (!fs.existsSync(p)) failures.push(`Missing image ${path.relative(root,p)}`);
    else {
      const hash=crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
      if (imageHashes.has(hash)) failures.push(`Duplicate image bytes: ${path.basename(p)} and ${imageHashes.get(hash)}`);
      imageHashes.set(hash,path.basename(p));
    }
  }
}

if (fs.existsSync(dist)) {
  const htmlFiles=[];
  function walk(dir){ for(const entry of fs.readdirSync(dir,{withFileTypes:true})){ const p=path.join(dir,entry.name); if(entry.isDirectory())walk(p); else if(entry.name.endsWith('.html'))htmlFiles.push(p); }}
  walk(dist);
  const canonicals=new Map(); const titles=new Map();
  for(const file of htmlFiles){
    const html=fs.readFileSync(file,'utf8');
    const is404=path.basename(file)==='404.html';
    const title=(html.match(/<title>(.*?)<\/title>/s)||[])[1];
    const canonical=(html.match(/<link rel="canonical" href="([^"]+)"/i)||[])[1];
    if(!title) failures.push(`${path.relative(dist,file)} missing title`);
    if(!canonical) failures.push(`${path.relative(dist,file)} missing canonical`);
    if(!is404 && /name="robots" content="[^"]*noindex/i.test(html)) failures.push(`${path.relative(dist,file)} unexpectedly noindex`);
    if(is404 && !/name="robots" content="[^"]*noindex/i.test(html)) failures.push('404.html should be noindex');
    if(!is404 && canonical){ if(canonicals.has(canonical)) failures.push(`Duplicate canonical ${canonical}`); canonicals.set(canonical,file); }
    if(!is404 && title){ if(titles.has(title)) failures.push(`Duplicate title ${title}`); titles.set(title,file); }
  }
}

console.log(`Verified ${articleFiles.length} articles; word range ${Math.min(...articleFiles.map(f=>wordCount(fs.readFileSync(path.join(articleDir,f),'utf8'))))}-${Math.max(...articleFiles.map(f=>wordCount(fs.readFileSync(path.join(articleDir,f),'utf8'))))}; ${imageHashes.size} unique article image files.`);
if (failures.length) { console.error(failures.map(x=>`FAIL: ${x}`).join('\n')); process.exit(1); }
console.log('Content verification passed.');
