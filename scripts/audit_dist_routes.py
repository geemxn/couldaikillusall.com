#!/usr/bin/env python3
"""Route-scoped built HTML audit for this Firebase cleanUrls site."""
from __future__ import annotations
import json,re,sys
from pathlib import Path
from urllib.parse import urlparse
import xml.etree.ElementTree as ET

ROOT=Path(sys.argv[1] if len(sys.argv)>1 else 'dist').resolve()
DOMAIN='https://couldaikillusall.com'

def txt(p): return p.read_text(encoding='utf-8',errors='ignore')
def get_attr(h,tag,key,value,attr):
    pats=[rf'<{tag}[^>]+{key}=["\']{re.escape(value)}["\'][^>]+{attr}=["\']([^"\']+)',rf'<{tag}[^>]+{attr}=["\']([^"\']+)["\'][^>]+{key}=["\']{re.escape(value)}["\']']
    for p in pats:
        m=re.search(p,h,re.I)
        if m:return m.group(1).strip()
    return ''
def canonical(h): return get_attr(h,'link','rel','canonical','href')
def meta(h,key,kind='name'): return get_attr(h,'meta',kind,key,'content')
def route_file(path):
    if path=='/': return ROOT/'index.html'
    return ROOT/(path.strip('/')+'.html')

errors=[]; warnings=[]
# sitemap
sm=ET.parse(ROOT/'sitemap.xml').getroot()
ns={'s':'http://www.sitemaps.org/schemas/sitemap/0.9'}
urls=[(n.text or '').strip() for n in sm.findall('.//s:loc',ns)]
# first 19 are route locs; image:loc also has loc local-name, but namespace-specific s:loc selects route loc only.
routes=[]
for u in urls:
    pu=urlparse(u)
    if pu.netloc!='couldaikillusall.com': errors.append(f'Wrong sitemap host: {u}'); continue
    routes.append(pu.path or '/')
known=set(routes)
article_og={}
for route in routes:
    p=route_file(route)
    if not p.exists(): errors.append(f'Missing prerendered HTML for {route}: {p.relative_to(ROOT)}'); continue
    h=txt(p)
    can=canonical(h)
    expected=DOMAIN if route=='/' else DOMAIN+route
    if can!=expected: errors.append(f'Canonical mismatch {route}: {can!r} != {expected!r}')
    robots=meta(h,'robots').lower()
    if 'noindex' in robots: errors.append(f'Indexable sitemap route is noindex: {route}')
    title=re.search(r'<title>(.*?)</title>',h,re.I|re.S)
    if not title or not re.sub(r'<[^>]+>','',title.group(1)).strip(): errors.append(f'Missing title: {route}')
    desc=meta(h,'description')
    if len(desc)<50: warnings.append(f'Short/missing description: {route}')
    h1s=re.findall(r'<h1\b',h,re.I)
    if len(h1s)!=1: errors.append(f'Expected one H1 on {route}, got {len(h1s)}')
    # root-relative link integrity
    for href in re.findall(r'<a\b[^>]+href=["\']([^"\']+)',h,re.I):
        if not href.startswith('/') or href.startswith('//'): continue
        clean=href.split('#',1)[0].split('?',1)[0].rstrip('/') or '/'
        if clean.startswith('/assets/') or clean in {'/favicon.svg','/site.webmanifest'}: continue
        if clean not in known: errors.append(f'Broken internal route link on {route}: {href}')
    if route.startswith('/articles/'):
        og=meta(h,'og:image','property')
        if not og: errors.append(f'Missing og:image on article {route}')
        else: article_og[route]=og
        if '"@type": "BlogPosting"' not in h and '"@type":"BlogPosting"' not in h:
            errors.append(f'Missing BlogPosting JSON-LD: {route}')
        # local wide image must exist and visible image alt should be nonempty
        m=re.search(r'<img\b[^>]+src=["\'](/assets/articles/[^"\']+)["\'][^>]+alt=["\']([^"\']+)',h,re.I|re.S)
        if not m: errors.append(f'Missing visible representative article image/alt: {route}')
        elif not (ROOT/m.group(1).lstrip('/')).exists(): errors.append(f'Missing representative file: {m.group(1)}')
# duplicate article OG
rev={}
for r,i in article_og.items(): rev.setdefault(i,[]).append(r)
for img,rs in rev.items():
    if len(rs)>1: errors.append(f'Duplicate article og:image on {len(rs)} pages: {img}')
# 404 requirements
p404=ROOT/'404.html'
if not p404.exists(): errors.append('Missing 404.html')
else:
    h=txt(p404)
    if 'noindex' not in meta(h,'robots').lower(): errors.append('404.html must be noindex')
# robots requirements
robots=txt(ROOT/'robots.txt') if (ROOT/'robots.txt').exists() else ''
if 'Disallow: /' in robots: errors.append('robots.txt blocks site')
if f'Sitemap: {DOMAIN}/sitemap.xml' not in robots: errors.append('robots.txt missing sitemap declaration')

result={'root':str(ROOT),'indexable_routes':len(routes),'article_routes':sum(r.startswith('/articles/') for r in routes),'unique_article_og_images':len(set(article_og.values())),'errors':errors,'warnings':warnings,'status':'PASS' if not errors else 'FAIL'}
out=Path('reports/dist-route-audit.json');out.parent.mkdir(exist_ok=True);out.write_text(json.dumps(result,indent=2),encoding='utf-8')
print(json.dumps(result,indent=2))
raise SystemExit(1 if errors else 0)
