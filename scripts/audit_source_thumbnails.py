#!/usr/bin/env python3
from pathlib import Path
from PIL import Image
import csv, hashlib, json, re

root=Path('.').resolve(); idx=(root/'src/content/articles/index.js').read_text(encoding='utf8'); seo=(root/'src/lib/seo.js').read_text(encoding='utf8')
slugs=re.findall(r"slug: '([^']+)'",idx)
rows=[]; hash_to=[]
seen={}; failures=[]
for slug in slugs:
    rec={'slug':slug,'wide':'','fourThree':'','square':'','wide_size':'','fourThree_size':'','square_size':'','unique':True,'seo_integrated':False,'issues':[]}
    hashes=[]
    for key,suffix,expected in [('wide','1600x900',(1600,900)),('fourThree','1200x900',(1200,900)),('square','1200x1200',(1200,1200))]:
        p=root/'public/assets/articles'/f'{slug}-{suffix}.webp'; rec[key]=str(p.relative_to(root))
        if not p.exists(): rec['issues'].append(f'MISSING_{key.upper()}'); continue
        with Image.open(p) as im:
            rec[f'{key}_size']=f'{im.width}x{im.height}'
            if im.size!=expected: rec['issues'].append(f'WRONG_{key.upper()}_DIMENSIONS')
        h=hashlib.sha256(p.read_bytes()).hexdigest(); hashes.append(h)
        if h in seen: rec['issues'].append(f'DUPLICATE_BYTES_WITH:{seen[h]}'); rec['unique']=False
        seen[h]=p.name
    rec['seo_integrated'] = ('article.image.square' in seo and 'article.image.fourThree' in seo and 'article.image.wide' in seo and 'og:image' in seo)
    if not rec['seo_integrated']: rec['issues'].append('SEO_INTEGRATION_UNCLEAR')
    rows.append(rec)
    failures.extend((slug,x) for x in rec['issues'])

out=root/'reports/source-thumbnail-audit.json'; out.write_text(json.dumps({'article_pages':len(rows),'clean_pages':sum(not r['issues'] for r in rows),'missing':sum(any(i.startswith('MISSING') for i in r['issues']) for r in rows),'duplicate_pages':sum(not r['unique'] for r in rows),'rows':rows},indent=2),encoding='utf8')
with (root/'reports/source-thumbnail-audit.csv').open('w',newline='',encoding='utf-8-sig') as f:
    fields=['slug','wide','wide_size','fourThree','fourThree_size','square','square_size','unique','seo_integrated','issues']; w=csv.DictWriter(f,fieldnames=fields); w.writeheader()
    for r in rows:
        rr=dict(r); rr['issues']='|'.join(rr['issues']); w.writerow({k:rr.get(k,'') for k in fields})
print(json.dumps({'article_pages':len(rows),'clean_pages':sum(not r['issues'] for r in rows),'unique_image_files':len(seen),'failures':len(failures)},indent=2))
raise SystemExit(1 if failures else 0)
