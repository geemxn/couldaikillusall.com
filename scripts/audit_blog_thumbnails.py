#!/usr/bin/env python3
"""Audit built article HTML for unique representative-image integration."""
from __future__ import annotations
import argparse, csv, json, re
from collections import defaultdict
from pathlib import Path
from urllib.parse import urlparse

ARTICLE_TYPES={'article','blogposting','newsarticle','techarticle'}
GENERIC_HINTS=('logo','default','placeholder','fallback','sitewide','og-default','social-default')

def read(p):
    try:return p.read_text(encoding='utf-8',errors='ignore')
    except:return ''

def meta(h,key,attr='property'):
    for pat in [rf'<meta[^>]+{attr}=["\']{re.escape(key)}["\'][^>]+content=["\']([^"\']+)',rf'<meta[^>]+content=["\']([^"\']+)["\'][^>]+{attr}=["\']{re.escape(key)}["\']']:
        m=re.search(pat,h,re.I)
        if m:return m.group(1).strip()
    return ''

def canonical(h):
    for pat in [r'<link[^>]+rel=["\']canonical["\'][^>]+href=["\']([^"\']+)',r'<link[^>]+href=["\']([^"\']+)["\'][^>]+rel=["\']canonical["\']']:
        m=re.search(pat,h,re.I)
        if m:return m.group(1).strip()
    return ''

def first_img(h):
    m=re.search(r'<img\b([^>]+)>',h,re.I|re.S)
    if not m:return '',''
    a=m.group(1); s=re.search(r'\bsrc=["\']([^"\']+)',a,re.I); alt=re.search(r'\balt=["\']([^"\']*)',a,re.I)
    return (s.group(1).strip() if s else '',alt.group(1).strip() if alt else '')

def jsonld_images(h):
    out=[]
    for m in re.finditer(r'<script[^>]+type=["\']application/ld\+json["\'][^>]*>(.*?)</script>',h,re.I|re.S):
        try:data=json.loads(m.group(1).strip())
        except:continue
        stack=data if isinstance(data,list) else [data]
        while stack:
            x=stack.pop()
            if isinstance(x,dict):
                typ=x.get('@type'); types={str(t).lower() for t in (typ if isinstance(typ,list) else [typ]) if t}
                if types&ARTICLE_TYPES:
                    v=x.get('image'); vals=v if isinstance(v,list) else [v]
                    for y in vals:
                        if isinstance(y,str):out.append(y)
                        elif isinstance(y,dict) and isinstance(y.get('url'),str):out.append(y['url'])
                if isinstance(x.get('@graph'),list):stack.extend(x['@graph'])
            elif isinstance(x,list):stack.extend(x)
    return out

def main():
    ap=argparse.ArgumentParser(); ap.add_argument('root'); ap.add_argument('--output',default='reports/blog-thumbnail-audit.json'); ap.add_argument('--csv',default='reports/blog-thumbnail-audit.csv'); args=ap.parse_args()
    root=Path(args.root).resolve(); pages=[]; image_pages=defaultdict(list)
    for p in root.rglob('*.html'):
        rel='/' + p.relative_to(root).as_posix().lower(); h=read(p)
        if '/articles/' not in rel or rel.endswith('/articles/index.html') or rel.endswith('/articles.html'):continue
        if 'noindex' in meta(h,'robots','name').lower():continue
        og=meta(h,'og:image'); tw=meta(h,'twitter:image','name') or meta(h,'twitter:image'); ld=jsonld_images(h); vis,alt=first_img(h); pref=og or (ld[0] if ld else '') or vis
        issues=[]
        if not pref:issues.append('MISSING_REPRESENTATIVE_IMAGE')
        else:
            image_pages[pref].append(rel)
            if any(x in pref.lower() for x in GENERIC_HINTS):issues.append('GENERIC_IMAGE_HINT')
            u=urlparse(pref)
            if u.scheme and u.scheme not in ('http','https'):issues.append('NON_HTTP_IMAGE_URL')
        if not og:issues.append('MISSING_OG_IMAGE')
        if not ld:issues.append('MISSING_ARTICLE_JSONLD_IMAGE')
        if vis and not alt:issues.append('VISIBLE_IMAGE_EMPTY_ALT_REVIEW')
        pages.append({'page':rel,'canonical':canonical(h),'preferred_image':pref,'og_image':og,'twitter_image':tw,'jsonld_images':'|'.join(ld),'first_visible_image':vis,'first_visible_alt':alt,'issues':issues})
    dup={i:ps for i,ps in image_pages.items() if i and len(ps)>1}
    for r in pages:
        if r['preferred_image'] in dup:r['issues'].append(f'DUPLICATE_PREFERRED_IMAGE:{len(dup[r["preferred_image"]])}')
    result={'root':str(root),'article_pages':len(pages),'clean_pages':sum(not r['issues'] for r in pages),'missing_representative_image':sum('MISSING_REPRESENTATIVE_IMAGE' in r['issues'] for r in pages),'pages_using_duplicate_preferred_image':sum(any(x.startswith('DUPLICATE_PREFERRED_IMAGE:') for x in r['issues']) for r in pages),'duplicate_image_groups':dup,'pages':pages,'note':'Heuristic built-output audit; verify live crawlability and rendering after deployment.'}
    Path(args.output).parent.mkdir(parents=True,exist_ok=True); Path(args.output).write_text(json.dumps(result,indent=2),encoding='utf-8')
    with Path(args.csv).open('w',encoding='utf-8-sig',newline='') as f:
        fields=['page','canonical','preferred_image','og_image','twitter_image','jsonld_images','first_visible_image','first_visible_alt','issues']; w=csv.DictWriter(f,fieldnames=fields); w.writeheader()
        for r in pages:
            x=dict(r);x['issues']='|'.join(x['issues']);w.writerow({k:x.get(k,'') for k in fields})
    print(json.dumps({'article_pages':len(pages),'clean_pages':result['clean_pages'],'missing_representative_image':result['missing_representative_image'],'pages_using_duplicate_preferred_image':result['pages_using_duplicate_preferred_image'],'duplicate_image_groups':len(dup)},indent=2))
    return 1 if result['missing_representative_image'] or result['pages_using_duplicate_preferred_image'] else 0

if __name__=='__main__': raise SystemExit(main())
