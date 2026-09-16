from pathlib import Path
from xml.sax.saxutils import escape
import re

ROOT=Path('/mnt/data/couldaikillusall-site')
DOMAIN='https://couldaikillusall.com'
launch='2026-09-16'
static=['/','/articles','/about','/editorial-policy','/glossary','/sources','/book']
idx=(ROOT/'src/content/articles/index.js').read_text(encoding='utf8')
blocks=re.findall(r"\{\n\s+slug: '([^']+)',(.*?)(?=\n\s+\},|\n\s+\}\n\];)",idx,re.S)
articles=[]
for slug,block in blocks:
    m=re.search(r"imageAlt: '([^']+)'",block)
    alt=m.group(1) if m else slug.replace('-',' ')
    articles.append((slug,alt))
if len(articles)!=12:
    raise SystemExit(f'Expected 12 articles, got {len(articles)}')

def url(path): return DOMAIN if path=='/' else DOMAIN+path
lines=['<?xml version="1.0" encoding="UTF-8"?>','<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">']
for p in static:
    lines += ['  <url>',f'    <loc>{escape(url(p))}</loc>',f'    <lastmod>{launch}</lastmod>','  </url>']
for slug,alt in articles:
    p=f'/articles/{slug}'; img=f'{DOMAIN}/assets/articles/{slug}-1600x900.webp'
    lines += ['  <url>',f'    <loc>{escape(url(p))}</loc>',f'    <lastmod>{launch}</lastmod>',f'    <image:image><image:loc>{escape(img)}</image:loc><image:caption>{escape(alt)}</image:caption></image:image>','  </url>']
lines.append('</urlset>')
(ROOT/'public/sitemap.xml').write_text('\n'.join(lines)+'\n',encoding='utf8')

ilines=['<?xml version="1.0" encoding="UTF-8"?>','<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">']
for slug,alt in articles:
    p=f'/articles/{slug}'; img=f'{DOMAIN}/assets/articles/{slug}-1600x900.webp'
    ilines += ['  <url>',f'    <loc>{escape(url(p))}</loc>',f'    <image:image><image:loc>{escape(img)}</image:loc><image:caption>{escape(alt)}</image:caption></image:image>','  </url>']
ilines.append('</urlset>')
(ROOT/'public/image-sitemap.xml').write_text('\n'.join(ilines)+'\n',encoding='utf8')
print('wrote',len(static)+len(articles),'sitemap URLs and',len(articles),'image sitemap entries')
