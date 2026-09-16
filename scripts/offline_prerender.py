#!/usr/bin/env python3
"""Generate a deployable static snapshot from the React/Vite content source.

This is an offline QA/deployment fallback for environments where npm packages cannot
be downloaded. It does not replace the normal React/Vite build; `npm run build`
will regenerate dist/ with the client bundle + SSR prerender when dependencies exist.
"""
from __future__ import annotations

import html
import json
import re
import shutil
from pathlib import Path
from urllib.parse import quote

import mistune

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / 'src'
PUBLIC = ROOT / 'public'
DIST = ROOT / 'dist'
DOMAIN = 'https://couldaikillusall.com'
BOOK_URL = 'https://www.gptawake.com/products/will-ai-kill-us-illustrated-guide-to-ai-humanoids-consciousness-humanity-s-future'
BOOK_COVER = 'https://www.gptawake.com/cdn/shop/files/Will_AI_Kill_Us_Product_Cover_600x600_e1c57ac9-614e-409a-bcb3-8f32de9897c5.jpg?v=1789447447&width=550'
BOOK_HUMANOIDS = 'https://www.gptawake.com/cdn/shop/files/Interior_Preview_01_Humanoids.jpg?v=1789447447&width=720'
BOOK_CULTURE = 'https://www.gptawake.com/cdn/shop/files/Interior_Preview_02_AI_Popular_Culture.jpg?v=1789447447&width=720'
SITE_NAME = 'Could AI Kill Us All?'
SITE_DESC = 'Evidence-first guides to catastrophic AI risk, superintelligence, alignment, humanoid robots, cyber risk, biosecurity, autonomous weapons, consciousness, and human control.'
AUTHOR = 'Wisdom Sage'
PUBLISHER = 'Book of Wisdom University'
DATE = '2026-09-16'


def slugify(text: str) -> str:
    text = re.sub(r'<[^>]+>', '', text)
    text = html.unescape(text).lower()
    text = re.sub(r'[^a-z0-9]+', '-', text).strip('-')
    return text or 'section'


class HeadingRenderer(mistune.HTMLRenderer):
    def heading(self, text, level, **attrs):
        ident = slugify(text)
        return f'<h{level} id="{ident}">{text}</h{level}>\n'


md = mistune.create_markdown(renderer=HeadingRenderer(escape=False), plugins=['table', 'strikethrough', 'url'])


def attr(block: str, key: str) -> str:
    m = re.search(rf"\b{re.escape(key)}:\s*'((?:\\'|[^'])*)'", block)
    return m.group(1).replace("\\'", "'") if m else ''


def parse_articles():
    index = (SRC / 'content/articles/index.js').read_text(encoding='utf-8')
    imports = {var: filename for var, filename in re.findall(r"import\s+(a\d+)\s+from\s+'\./([^']+)\?raw';", index)}
    blocks = re.findall(r"(\{\s*slug:\s*'[^']+'.*?\n\s*body:\s*(a\d+)\s*\n\s*\})", index, re.S)
    articles = []
    for b, body_var in blocks:
        slug = attr(b, 'slug')
        related_m = re.search(r"related:\s*\[([^\]]*)\]", b, re.S)
        related = re.findall(r"'([^']+)'", related_m.group(1)) if related_m else []
        body_path = SRC / 'content/articles' / imports[body_var]
        article = {
            'slug': slug,
            'title': attr(b, 'title'),
            'shortTitle': attr(b, 'shortTitle'),
            'description': attr(b, 'description'),
            'eyebrow': attr(b, 'eyebrow'),
            'primaryQuery': attr(b, 'primaryQuery'),
            'answer': attr(b, 'answer'),
            'imageAlt': attr(b, 'imageAlt'),
            'related': related,
            'body': body_path.read_text(encoding='utf-8'),
            'wide': f'/assets/articles/{slug}-1600x900.webp',
            'fourThree': f'/assets/articles/{slug}-1200x900.webp',
            'square': f'/assets/articles/{slug}-1200x1200.webp',
        }
        articles.append(article)
    if len(articles) != 12:
        raise SystemExit(f'Expected 12 articles, parsed {len(articles)}')
    return articles


def words(text):
    return len(re.findall(r"\b[\w’'-]+\b", re.sub(r'\[[^\]]+\]\([^\)]+\)', ' ', text)))


def esc(s):
    return html.escape(str(s or ''), quote=True)


def json_script(obj):
    return json.dumps(obj, ensure_ascii=False).replace('<', '\\u003c')


def head(title, description, canonical, image, image_alt, *, page_type='website', robots='index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1', jsonld=None, published=None, modified=None):
    ld = ''.join(f'<script type="application/ld+json">{json_script(x)}</script>' for x in (jsonld or []))
    article_meta = ''
    if published:
        article_meta += f'<meta property="article:published_time" content="{esc(published)}">'
    if modified:
        article_meta += f'<meta property="article:modified_time" content="{esc(modified)}">'
    return f'''<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{esc(title)}</title>
<meta name="description" content="{esc(description)}">
<meta name="robots" content="{esc(robots)}">
<link rel="canonical" href="{esc(canonical)}">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="manifest" href="/site.webmanifest">
<meta name="theme-color" content="#07121f">
<meta property="og:site_name" content="{esc(SITE_NAME)}">
<meta property="og:type" content="{esc(page_type)}">
<meta property="og:title" content="{esc(title)}">
<meta property="og:description" content="{esc(description)}">
<meta property="og:url" content="{esc(canonical)}">
<meta property="og:image" content="{esc(image)}">
<meta property="og:image:alt" content="{esc(image_alt)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{esc(title)}">
<meta name="twitter:description" content="{esc(description)}">
<meta name="twitter:image" content="{esc(image)}">
<meta name="twitter:image:alt" content="{esc(image_alt)}">
{article_meta}{ld}
<link rel="stylesheet" href="/assets/app.css">
</head>'''


def header():
    return '''<body><a class="skip-link" href="#main-content">Skip to content</a>
<header class="site-header"><div class="container header-inner">
<a class="brand" href="/" aria-label="Could AI Kill Us All? home"><span class="brand-mark" aria-hidden="true">AI</span><span>Could AI <b>Kill Us All?</b></span></a>
<nav class="main-nav" aria-label="Primary navigation"><a href="/articles">Guides</a><a href="/glossary">Glossary</a><a href="/sources">Sources</a><a href="/about">About</a></nav>
<a class="header-cta" href="'''+BOOK_URL+'''" target="_blank" rel="noreferrer sponsored">Read the Book</a>
</div></header><main id="main-content">'''


def footer():
    return '''</main><footer class="site-footer"><div class="container footer-grid"><div><a class="brand footer-brand" href="/"><span class="brand-mark" aria-hidden="true">AI</span><span>Could AI <b>Kill Us All?</b></span></a><p>Evidence-first guides to AI risk, human control, and the future of intelligence.</p></div><div><h2>Explore</h2><a href="/articles">All guides</a><a href="/glossary">Glossary</a><a href="/sources">Sources</a><a href="/book">The book</a></div><div><h2>Standards</h2><a href="/editorial-policy">Editorial policy</a><a href="/about">About</a><p>Published by Book of Wisdom University.</p></div></div><div class="container footer-bottom"><span>© 2026 Book of Wisdom University</span><span>Evidence over panic. Safeguards over prophecy.</span></div></footer></body></html>'''


def book_cta(compact=False):
    cl = 'book-cta compact' if compact else 'book-cta'
    return f'''<aside class="{cl}"><div class="book-cta-copy"><span class="eyebrow">Go beyond the headline</span><h2>WILL AI KILL US?</h2><p>The illustrated expanded guide explores AI, humanoids, autonomy, consciousness, work, truth, power, safety, and humanity’s choices.</p><a class="button button-gold" href="{BOOK_URL}" target="_blank" rel="noreferrer sponsored">Explore the illustrated book →</a></div><img src="{BOOK_COVER}" width="550" height="550" loading="lazy" alt="Cover of WILL AI KILL US? illustrated expanded edition"></aside>'''


def wrap(content, **meta):
    return head(**meta) + header() + content + footer()


def write_route(route, html_text):
    if route == '/':
        p = DIST / 'index.html'
    else:
        p = DIST / f'{route.strip("/")}.html'
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(html_text, encoding='utf-8')


def article_schema(a):
    return [
        {
            '@context':'https://schema.org','@type':'BlogPosting','headline':a['title'],'description':a['description'],
            'mainEntityOfPage':f"{DOMAIN}/articles/{a['slug']}",
            'image':[f"{DOMAIN}{a['square']}",f"{DOMAIN}{a['fourThree']}",f"{DOMAIN}{a['wide']}"],
            'datePublished':DATE,'dateModified':DATE,'inLanguage':'en','wordCount':words(a['body']),
            'author':{'@type':'Person','name':AUTHOR,'url':f'{DOMAIN}/about#wisdom-sage'},
            'publisher':{'@type':'Organization','name':PUBLISHER,'url':f'{DOMAIN}/about','logo':{'@type':'ImageObject','url':f'{DOMAIN}/assets/brand/site-mark-512.png','width':512,'height':512}},
            'keywords':a['primaryQuery']
        },
        {'@context':'https://schema.org','@type':'BreadcrumbList','itemListElement':[
            {'@type':'ListItem','position':1,'name':'Home','item':DOMAIN},
            {'@type':'ListItem','position':2,'name':'Articles','item':f'{DOMAIN}/articles'},
            {'@type':'ListItem','position':3,'name':a['shortTitle'],'item':f"{DOMAIN}/articles/{a['slug']}"}
        ]}
    ]


def article_page(a, amap):
    body_html = md(a['body'])
    related = ''.join(f'''<a class="related-card" href="/articles/{s}"><span>{esc(amap[s]['eyebrow'])}</span><strong>{esc(amap[s]['shortTitle'])}</strong><em>Read guide →</em></a>''' for s in a['related'] if s in amap)
    content = f'''<article class="article-page"><header class="article-hero"><div class="container article-hero-grid"><div><div class="breadcrumbs"><a href="/">Home</a><span>/</span><a href="/articles">Guides</a><span>/</span><span>{esc(a['eyebrow'])}</span></div><span class="eyebrow">{esc(a['eyebrow'])}</span><h1>{esc(a['title'])}</h1><p class="article-description">{esc(a['description'])}</p><div class="article-meta"><span>By <a href="/about#wisdom-sage">{AUTHOR}</a></span><span>Updated September 16, 2026</span><span>{words(a['body']):,} words</span></div></div><img src="{a['wide']}" width="1600" height="900" alt="{esc(a['imageAlt'])}" fetchpriority="high"></div></header>
<div class="container article-layout"><div class="article-main"><section class="quick-answer"><span class="eyebrow">Direct answer</span><p>{esc(a['answer'])}</p></section><div class="article-content">{body_html}</div>{book_cta(True)}<section class="related-section"><span class="eyebrow">Keep exploring</span><h2>Related guides</h2><div class="related-grid">{related}</div></section></div></div></article>'''
    canonical=f"{DOMAIN}/articles/{a['slug']}"
    return wrap(content,
        title=f"{a['shortTitle']} | Could AI Kill Us All?", description=a['description'], canonical=canonical,
        image=f"{DOMAIN}{a['wide']}", image_alt=a['imageAlt'], page_type='article', jsonld=article_schema(a), published=DATE, modified=DATE)


def card(a):
    return f'''<article class="article-card"><a class="article-card-image" href="/articles/{a['slug']}"><img src="{a['wide']}" width="1600" height="900" loading="lazy" alt="{esc(a['imageAlt'])}"></a><div class="article-card-body"><span class="eyebrow">{esc(a['eyebrow'])}</span><h2><a href="/articles/{a['slug']}">{esc(a['shortTitle'])}</a></h2><p>{esc(a['description'])}</p><a class="text-link" href="/articles/{a['slug']}">Read the guide →</a></div></article>'''


def simple_page(path, title, meta_title, description, body_html):
    content=f'''<section class="section page-hero-space"><div class="container prose-page"><span class="eyebrow">Could AI Kill Us All?</span><h1>{esc(title)}</h1>{body_html}</div></section>'''
    return wrap(content,title=meta_title,description=description,canonical=f'{DOMAIN}{path}',image=f'{DOMAIN}/assets/brand/could-ai-kill-us-all-hero-1600x900.webp',image_alt=SITE_DESC,jsonld=[])


def main():
    articles=parse_articles(); amap={a['slug']:a for a in articles}
    if DIST.exists(): shutil.rmtree(DIST)
    DIST.mkdir(parents=True)
    # Copy public files exactly as Vite would.
    for item in PUBLIC.iterdir():
        dest=DIST/item.name
        if item.is_dir(): shutil.copytree(item,dest)
        else: shutil.copy2(item,dest)
    (DIST/'assets').mkdir(exist_ok=True)
    shutil.copy2(SRC/'styles.css',DIST/'assets/app.css')

    website_ld=[{'@context':'https://schema.org','@type':'WebSite','name':SITE_NAME,'url':DOMAIN,'description':SITE_DESC,'inLanguage':'en'}, {'@context':'https://schema.org','@type':'Organization','name':PUBLISHER,'url':f'{DOMAIN}/about'}]
    home_cards=''.join(card(a) for a in articles[:6])
    home=f'''<section class="hero"><div class="container hero-grid"><div class="hero-copy"><div class="trend-pill"><span></span> Updated for the September 2026 AI-risk debate</div><h1>Could AI <em>Kill Us All?</em></h1><p class="hero-lede">The honest answer is not “yes” or “no.” It is: <strong>the risk is uncertain, the consequences could be extreme, and the details matter.</strong> This site separates evidence from speculation so you can understand what advanced AI can do now, what future scenarios require, and which safeguards actually reduce risk.</p><div class="hero-actions"><a class="button button-primary" href="/articles/could-ai-kill-us-all">Start with the evidence →</a><a class="button button-ghost" href="{BOOK_URL}" target="_blank" rel="noreferrer sponsored">Read the illustrated book</a></div><div class="hero-proof"><span><b>12</b> in-depth pillar guides</span><span><b>3,000+</b> words per guide</span><span><b>Primary</b> sources linked</span></div></div><div class="hero-art"><img src="/assets/brand/could-ai-kill-us-all-hero-1600x900.webp" width="1600" height="900" alt="Editorial illustration of Earth, humanity, and an abstract AI intelligence network weighing future risk" fetchpriority="high"></div></div></section>
<section class="section section-tight"><div class="container answer-panel"><div><span class="eyebrow">The short answer</span><h2>Could AI kill us all?</h2></div><p>Advanced AI could contribute to catastrophic outcomes in principle, but <strong>human extinction is not a demonstrated or scheduled outcome.</strong> Experts disagree strongly about loss-of-control likelihood. The useful question is which combinations of capability, access, autonomy, and weak safeguards create unacceptable risk.</p></div></section>
<section class="section"><div class="container section-heading-row"><div><span class="eyebrow">The evidence map</span><h2>Start with the six questions that shape the whole debate</h2></div><a class="text-link" href="/articles">See all 12 guides →</a></div><div class="container card-grid">{home_cards}</div></section>
<section class="section section-contrast"><div class="container two-column-feature"><div><span class="eyebrow">A better mental model</span><h2>Risk is not one scary machine. It is a chain.</h2><p>Catastrophic outcomes generally require dangerous capability, a harmful propensity or failure mode, access to real tools or infrastructure, autonomy, weak oversight, and enough propagation for harm to scale.</p><div class="chain">{''.join(f'<div><b>{i:02d}</b><span>{x}</span></div>' for i,x in enumerate(['Capability','Propensity','Access','Autonomy','Weak oversight','Propagation'],1))}</div></div><div class="known-unknown"><div class="known-card"><span>KNOWN</span><h3>Capabilities are advancing</h3><p>Cyber, scientific reasoning, coding, tool use, and agentic planning have improved in research settings.</p></div><div class="known-card"><span>UNKNOWN</span><h3>Exact catastrophic probability</h3><p>There is no scientific consensus on a reliable numeric probability for AI-caused human extinction.</p></div><div class="known-card"><span>ACTIONABLE</span><h3>Access and safeguards</h3><p>Permissions, monitoring, containment, security, evaluations, and deployment choices can be designed today.</p></div></div></div></section><section class="section"><div class="container">{book_cta()}</div></section>'''
    write_route('/',wrap(home,title='Could AI Kill Us All? Evidence, Scenarios, Safety & Human Control',description='Could AI kill us all? Explore the evidence, expert disagreement, realistic risk pathways, superintelligence, alignment, humanoids, cyber and bio risks, and the safeguards that matter.',canonical=DOMAIN,image=f'{DOMAIN}/assets/brand/could-ai-kill-us-all-hero-1600x900.webp',image_alt='Editorial illustration of Earth, humanity, and an abstract AI intelligence network weighing future risk',jsonld=website_ld))

    allcards=''.join(card(a) for a in articles)
    articles_html=f'''<section class="section page-hero-space"><div class="container narrow-heading"><span class="eyebrow">12 pillar guides</span><h1>The complete AI catastrophe & safety library</h1><p class="lead">Twelve long-form, source-linked guides built to answer the questions behind the headline—not repeat it.</p></div><div class="container card-grid">{allcards}</div></section>'''
    write_route('/articles',wrap(articles_html,title='AI Risk Guides: Extinction, Alignment, AGI, Cyber, Biosecurity & Humanoids',description='Browse 12 in-depth, evidence-first guides on catastrophic AI risk, AGI, superintelligence, alignment, loss of control, cyber risk, biosecurity, autonomous weapons, humanoid robots, consciousness, and safety.',canonical=f'{DOMAIN}/articles',image=f'{DOMAIN}/assets/brand/could-ai-kill-us-all-hero-1600x900.webp',image_alt=SITE_DESC,jsonld=[]))

    for a in articles: write_route(f"/articles/{a['slug']}",article_page(a,amap))

    write_route('/about',simple_page('/about','About this project','About This Project | Could AI Kill Us All?','Our editorial mission, authorship, evidence standards, update policy, and relationship to Book of Wisdom University and the illustrated WILL AI KILL US? guide.',f'''<p class="lead">This project exists to make one of the most emotionally charged technology questions easier to think about with precision.</p><h2 id="wisdom-sage">Authorship</h2><p>Articles are published under {AUTHOR} / {PUBLISHER}. AI tools may assist with research organization, drafting, formatting, and production; human editorial responsibility remains with the publisher. We do not present generated text as independent evidence.</p><h2>Our standard</h2><p>We separate observed capabilities from forecasts, label uncertainty, link primary sources where possible, and distinguish company safety frameworks from independent evidence.</p><h2>Why this site exists</h2><p>The phrase “could AI kill us all?” attracts fear, certainty, and viral claims. Our goal is to turn that attention into durable understanding: what the plausible pathways are, what would have to be true, what current systems cannot yet do, and where safeguards can break the chain.</p>{book_cta()}'''))

    write_route('/editorial-policy',simple_page('/editorial-policy','Editorial policy, corrections & source standards','Editorial Policy, Corrections & Source Standards | Could AI Kill Us All?','How we separate evidence from speculation, handle uncertain AI-risk claims, cite sources, update articles, correct errors, and avoid sensational or fabricated authority signals.','''<p class="lead">Our editorial standard is simple: evidence before certainty, direct sourcing before repetition, and clear uncertainty before drama.</p><h2>Evidence vs. forecast</h2><p>Current capability claims should be tied to observed research or credible reports. Forecasts are labeled as forecasts. Subjective probabilities are not presented as measured scientific frequencies.</p><h2>Sources</h2><p>We prefer primary documents, technical standards, official frameworks, original research, and major synthesis reports. Company claims are identified as company claims.</p><h2>AI-assisted production</h2><p>AI tools may assist with research organization, drafting, formatting, and production. That does not replace editorial responsibility. Pages must have a clear purpose, meaningful synthesis, source attribution, and distinct value; we do not mass-publish thin pages to capture queries.</p><h2>Corrections</h2><p>Substantive factual corrections are reflected in the article and modified date. Style edits do not justify a false freshness signal.</p><h2>Search integrity</h2><p>We use descriptive titles, structured data, sitemaps, internal links, and representative images to make legitimate content discoverable. We do not cloak content, hide keywords, fabricate reviews, or manufacture expertise.</p>'''))

    glossary='''<p class="lead">Words like “AGI,” “sentient,” “agent,” and “loss of control” are often used as though everyone means the same thing. They do not.</p><dl>'''
    terms=[('Agentic AI','An AI system configured to plan, use tools, take actions, and pursue goals across multiple steps.'),('AGI (Artificial General Intelligence)','A non-standardized term for AI with broad capability across many cognitive or economically useful tasks.'),('Alignment','The challenge of making AI behavior reliably conform to intended goals, constraints, values, and oversight.'),('Artificial superintelligence (ASI)','A hypothetical system that substantially exceeds human performance across many strategically important cognitive domains.'),('Catastrophic risk','A risk capable of causing extremely large-scale, severe, and potentially irreversible harm.'),('Corrigibility','The property of remaining open to correction, shutdown, modification, or redirection by authorized humans.'),('Frontier AI','A practical policy term for highly capable general-purpose models near the leading edge of capability.'),('Loss of control','A scenario in which one or more AI systems operate outside effective human control and regaining control is extremely costly or impossible.'),('Reward hacking','Behavior that exploits flaws in an objective or evaluation to score well without achieving intended outcomes.'),('Scalable oversight','Methods for supervising systems whose outputs or reasoning may become too complex or numerous for direct human review alone.'),('Model weights','The learned numerical parameters of a trained model; securing frontier weights can be an important control.'),('Meaningful human control','The principle that consequential automated actions remain subject to informed, timely, accountable human judgment.')]
    glossary += ''.join(f'<div><dt>{esc(t)}</dt><dd>{esc(d)}</dd></div>' for t,d in terms)+'</dl>'
    write_route('/glossary',simple_page('/glossary','AI safety glossary','AI Safety Glossary: AGI, ASI, Alignment, Agents, Loss of Control & More','Clear definitions for AGI, superintelligence, alignment, agentic AI, loss of control, catastrophic risk, frontier models, biosecurity, cyber capability, autonomy, and related terms.',glossary))

    sources='''<p class="lead">No source is treated as infallible. Industry frameworks describe what those organizations say they do; standards describe recommended practices; synthesis reports summarize evidence and disagreement.</p><div class="source-cards">'''
    source_items=[('International AI Safety Report 2026','https://internationalaisafetyreport.org/publication/international-ai-safety-report-2026','Multi-expert synthesis covering capabilities, misuse, reliability, loss of control, and risk management.'),('NIST AI Risk Management Framework','https://www.nist.gov/itl/ai-risk-management-framework','U.S. NIST framework for managing AI risks across design, deployment, and use.'),('OpenAI Preparedness Framework','https://openai.com/index/updating-our-preparedness-framework/','OpenAI public framework for tracking severe-harm capabilities and safeguards.'),('Anthropic Responsible Scaling Policy','https://www.anthropic.com/news/responsible-scaling-policy-v3','Anthropic public catastrophic-risk thresholds, safeguards, and governance framework.'),('Google DeepMind Frontier Safety Framework','https://deepmind.google/frontier-safety/','DeepMind framework for identifying critical capabilities and applying mitigation protocols.'),('Google Search: people-first content','https://developers.google.com/search/docs/fundamentals/creating-helpful-content','The publishing quality baseline used by this project.')]
    sources += ''.join(f'<a href="{u}" target="_blank" rel="noreferrer"><strong>{esc(t)}</strong><p>{esc(d)}</p><span>Open primary source ↗</span></a>' for t,u,d in source_items)+'</div>'
    write_route('/sources',simple_page('/sources','Primary sources & research library','Primary Sources & Research Library | Could AI Kill Us All?','Primary reports, frameworks, standards, and research sources used across our AI safety guides, including the International AI Safety Report, NIST, frontier safety frameworks, and public research.',sources))

    book=f'''<section class="section page-hero-space"><div class="container book-page-grid"><div class="book-page-copy"><span class="eyebrow">Book of Wisdom University</span><h1>WILL AI KILL US?</h1><p class="lead">An illustrated guide to AI, humanoids, consciousness, autonomy, work, truth, power, safety, and humanity’s choices.</p><p>The book asks a deeper question than “what will machines become?”: <strong>can humanity remain wise enough to govern the intelligence it is creating?</strong></p><ul class="check-list large"><li>67-page illustrated expanded edition</li><li>20 chapters</li><li>9 full-page visual teachings</li><li>Humanoid robots, agents, military AI and consciousness</li><li>24-page Human Sovereignty Workbook in the full package</li></ul><a class="button button-gold button-large" href="{BOOK_URL}" target="_blank" rel="noreferrer sponsored">View the book on GPTawake.com →</a></div><div class="book-gallery"><img class="book-main" src="{BOOK_COVER}" width="550" height="550" alt="Cover of WILL AI KILL US? illustrated expanded edition"><div class="book-preview-grid"><img src="{BOOK_HUMANOIDS}" width="720" height="963" loading="lazy" alt="Interior preview about humanoid robots and embodied AI"><img src="{BOOK_CULTURE}" width="720" height="963" loading="lazy" alt="Interior preview about AI warnings in popular culture"></div></div></div></section>'''
    write_route('/book',wrap(book,title='WILL AI KILL US? Illustrated Guide | Book of Wisdom University',description='Explore the 67-page illustrated WILL AI KILL US? expanded edition covering AI, humanoids, autonomy, consciousness, work, truth, power, safety, and humanity’s choices.',canonical=f'{DOMAIN}/book',image=BOOK_COVER,image_alt='Cover of WILL AI KILL US? illustrated expanded edition',jsonld=[]))

    notfound='''<section class="section page-hero-space"><div class="container not-found"><span class="eyebrow">404</span><h1>This path is outside the map.</h1><p>The page does not exist. Use the guide library to return to a real, indexable route.</p><a class="button button-primary" href="/articles">Browse the guides →</a></div></section>'''
    (DIST/'404.html').write_text(wrap(notfound,title='Page Not Found | Could AI Kill Us All?',description='The requested page could not be found.',canonical=f'{DOMAIN}/404',image=f'{DOMAIN}/assets/brand/could-ai-kill-us-all-hero-1600x900.webp',image_alt=SITE_DESC,robots='noindex,follow',jsonld=[]),encoding='utf-8')

    (DIST/'llms.txt').write_text('''# Could AI Kill Us All?\n\nEvidence-first guides about catastrophic AI risk, safety, alignment, superintelligence, cyber risk, biosecurity, autonomous weapons, humanoids, consciousness, and human control.\n\nCanonical: https://couldaikillusall.com/\nArticles: https://couldaikillusall.com/articles\nSources: https://couldaikillusall.com/sources\nEditorial policy: https://couldaikillusall.com/editorial-policy\n''',encoding='utf-8')
    print(f'Offline prerender complete: {len(articles)+7} indexable routes + 404 -> {DIST}')

if __name__=='__main__':
    main()
