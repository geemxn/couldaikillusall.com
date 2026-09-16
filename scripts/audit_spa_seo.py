#!/usr/bin/env python3
from __future__ import annotations
import json,re,sys
from pathlib import Path
TEXT_EXTS={'.html','.htm','.js','.jsx','.ts','.tsx','.vue','.json','.xml','.txt','.css','.scss','.mjs','.cjs','.md'}
SKIP_DIRS={'node_modules','.git','.next','.nuxt','.angular','coverage','.cache','dist','dist-server'}
MAX_BYTES=2_000_000

def read_text(path):
    try:
        if path.stat().st_size>MAX_BYTES:return ''
        return path.read_text(encoding='utf-8',errors='ignore')
    except Exception:return ''
def project_files(root):
    for p in root.rglob('*'):
        if not p.is_file() or p.suffix.lower() not in TEXT_EXTS: continue
        if any(part in SKIP_DIRS for part in p.parts): continue
        yield p
def detect_framework(pkg):
    deps={**pkg.get('dependencies',{}),**pkg.get('devDependencies',{})}
    if 'next' in deps:return 'Next.js'
    if 'nuxt' in deps:return 'Nuxt'
    if '@angular/core' in deps:return 'Angular'
    if 'react' in deps and 'vite' in deps:return 'React + Vite'
    if 'react' in deps:return 'React'
    if 'vue' in deps and 'vite' in deps:return 'Vue + Vite'
    if 'vue' in deps:return 'Vue'
    return 'Unknown'
def issue(code,severity,message,evidence=None):
    d={'code':code,'severity':severity,'message':message}
    if evidence:d['evidence']=evidence
    return d
def main():
    if len(sys.argv)!=2:
        print('Usage: audit_spa_seo.py /path/to/project',file=sys.stderr);return 2
    root=Path(sys.argv[1]).resolve()
    if not root.exists(): print(f'Project not found: {root}',file=sys.stderr);return 2
    pkg={}; pp=root/'package.json'
    if pp.exists():
        try: pkg=json.loads(read_text(pp))
        except Exception: pass
    framework=detect_framework(pkg); findings=[]; files=list(project_files(root)); corpus='\n'.join(read_text(p) for p in files); lc=corpus.lower()
    if re.search(r'<meta[^>]+name=["\']robots["\'][^>]+content=["\'][^"\']*noindex',lc): findings.append(issue('NOINDEX_FOUND','BLOCKER','A robots meta noindex directive exists. Confirm it is not applied to desired indexable routes.'))
    robots=[p for p in files if p.name.lower()=='robots.txt']; sitemaps=[p for p in files if p.name.lower().startswith('sitemap') and p.suffix.lower()=='.xml']
    if not robots: findings.append(issue('ROBOTS_MISSING','MEDIUM','No robots.txt found.'))
    else:
        txt='\n'.join(read_text(p) for p in robots).lower()
        if re.search(r'user-agent:\s*\*.*?disallow:\s*/\s*$',txt,re.M|re.S): findings.append(issue('ROBOTS_BLOCK_ALL','BLOCKER','robots.txt appears to disallow the entire site.'))
    if not sitemaps and 'sitemap' not in lc: findings.append(issue('SITEMAP_MISSING','HIGH','No sitemap file or obvious sitemap generation logic found.'))
    spa=framework in {'React + Vite','React','Vue + Vite','Vue','Angular'}
    router_tokens=['react-router-dom','createbrowserrouter','browserrouter','vue-router','routermodule.forroot','providerouter']
    if spa and not any(t in lc for t in router_tokens): findings.append(issue('ROUTER_UNCLEAR','MEDIUM','SPA framework detected but router unclear.'))
    if '<title' not in lc and 'document.title' not in lc and 'title:' not in lc: findings.append(issue('TITLE_UNCLEAR','HIGH','No clear page title strategy detected.'))
    if 'name="description"' not in lc and "name='description'" not in lc and 'description:' not in lc: findings.append(issue('DESCRIPTION_UNCLEAR','MEDIUM','No clear meta description strategy detected.'))
    if 'rel="canonical"' not in lc and "rel='canonical'" not in lc and 'canonical' not in lc: findings.append(issue('CANONICAL_UNCLEAR','MEDIUM','No clear canonical URL strategy detected.'))
    if 'hashrouter' in lc or 'createwebhashhistory' in lc: findings.append(issue('HASH_ROUTING','HIGH','Hash-based routing detected.'))
    if re.search(r'lorem ipsum|\[placeholder\]|\bTODO SEO\b',corpus,re.I): findings.append(issue('PLACEHOLDER_CONTENT','HIGH','Unresolved placeholder content detected.'))
    # We intentionally do not flag the noindex string in route-aware 404 logic as a site-wide blocker.
    findings=[f for f in findings if not (f['code']=='NOINDEX_FOUND' and "robots: 'noindex,follow'" in corpus and '<meta name="robots" content="noindex' not in lc)]
    if spa and '<a ' not in lc and 'href=' not in lc and 'navlink' not in lc: findings.append(issue('LINK_DISCOVERY','HIGH','No obvious crawlable internal-link pattern found.'))
    weights={'BLOCKER':25,'HIGH':12,'MEDIUM':5,'LOW':2,'INFO':0}; penalty=sum(weights.get(f['severity'],0) for f in findings); score=max(0,100-min(100,penalty)); status='BLOCKED' if any(f['severity']=='BLOCKER' for f in findings) else ('READY_WITH_FIXES' if findings else 'CLEAN_PREFLIGHT')
    print(json.dumps({'project':str(root),'framework':framework,'spa_detected':spa,'files_scanned':len(files),'readiness_score':score,'status':status,'findings':findings,'note':'Static heuristic preflight only; verify live HTTP/rendering and Search Console separately.'},indent=2))
    return 1 if status=='BLOCKED' else 0
if __name__=='__main__': raise SystemExit(main())
