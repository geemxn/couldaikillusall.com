#!/usr/bin/env python3
from __future__ import annotations
import re, sys
from pathlib import Path
from urllib.parse import urlparse
import xml.etree.ElementTree as ET

def local(tag): return tag.split('}',1)[-1]
def main():
    if len(sys.argv)!=2:
        print('Usage: validate_sitemap.py path/to/sitemap.xml', file=sys.stderr); return 2
    p=Path(sys.argv[1])
    try: root=ET.parse(p).getroot()
    except Exception as e:
        print(f'ERROR invalid XML: {e}'); return 1
    errors=[]; warnings=[]; urls=[]
    for node in root.iter():
        if local(node.tag)=='url':
            loc=None; lastmod=None
            for c in node:
                if local(c.tag)=='loc': loc=(c.text or '').strip()
                elif local(c.tag)=='lastmod': lastmod=(c.text or '').strip()
            if not loc:
                errors.append('URL entry missing <loc>'); continue
            urls.append(loc); u=urlparse(loc)
            if u.scheme not in ('http','https') or not u.netloc: errors.append(f'Invalid absolute URL: {loc}')
            if '\\' in loc: errors.append(f'Backslash in URL: {loc}')
            if '#' in loc: warnings.append(f'Fragment URL in sitemap: {loc}')
            if lastmod and not re.match(r'^\d{4}-\d{2}-\d{2}(?:T.*)?$',lastmod): warnings.append(f'Unusual lastmod format for {loc}: {lastmod}')
    dupes=sorted({u for u in urls if urls.count(u)>1})
    for u in dupes: errors.append(f'Duplicate sitemap URL: {u}')
    if not urls: warnings.append('No <url> entries found; this may be a sitemap index or an empty sitemap.')
    print(f'URLs: {len(urls)}')
    for e in errors: print('ERROR:',e)
    for w in warnings: print('WARN:',w)
    print(f'Result: {len(errors)} error(s), {len(warnings)} warning(s)')
    return 1 if errors else 0
if __name__=='__main__': raise SystemExit(main())
