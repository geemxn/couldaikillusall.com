# Could AI Kill Us All? — React/Vite/Firebase Editorial Site

Production source and prerendered deployment snapshot for **https://couldaikillusall.com/**.

The project is designed as an evidence-first topical authority site around the question **“Could AI kill us all?”**. It contains 12 long-form pillar guides, a source library, glossary, editorial policy, authorship/about page, dedicated book landing page, unique article imagery, route-specific metadata, BlogPosting structured data, XML sitemaps, a real 404 strategy, and Firebase Hosting configuration.

## What is included

- React + Vite application source in `src/`
- React Router clean URL architecture
- SSR/prerender build pipeline (`entry-server.jsx` + `scripts/prerender.mjs`)
- Firebase Hosting configuration with **no blanket SPA rewrite**
- Prebuilt offline prerender in `dist/` for immediate crawlable HTML QA/deployment
- 12 pillar articles, each above 3,000 words
- 36 unique article image variants (16:9, 4:3, 1:1)
- Homepage editorial hero artwork and brand icon
- Route-specific title, description, canonical, OG/Twitter metadata
- `BlogPosting` + `BreadcrumbList` JSON-LD on every article
- `WebSite` + `Organization` JSON-LD on the homepage
- `robots.txt`, `sitemap.xml`, `image-sitemap.xml`, `llms.txt`
- Visible FAQs without deprecated FAQ rich-result markup
- Book CTA integration throughout the site
- Google Bot Friendly verification scripts and reports

## The 12 pillar guides

1. Could AI Kill Us All? The Evidence, the Risk Pathways, and What We Actually Know
2. How Could AI Kill Humanity? Seven Catastrophic Risk Pathways Explained
3. Will AI Kill Us Within 10 Years? What the 2026 Warnings Really Mean
4. The AI Alignment Problem Explained
5. AGI vs. Superintelligence
6. Can AI Become Uncontrollable?
7. AI Cyberattacks and Critical Infrastructure
8. AI Biosecurity Risks
9. Autonomous Weapons and AI War
10. Humanoid Robots: Risk and Safety
11. Is AI Conscious or Sentient?
12. How to Prevent Catastrophic AI Risk

The source verification reports a 3,242–4,227 word range under its Unicode-aware counter, with all 12 pages over the requested 3,000-word floor.

## Book integration

Primary CTA:

`https://www.gptawake.com/products/will-ai-kill-us-illustrated-guide-to-ai-humanoids-consciousness-humanity-s-future`

The supplied Shopify CDN cover and two interior preview images are referenced directly in `src/siteConfig.js` and the prebuilt book page.

## Normal React/Vite build

```bash
npm install
npm run build
```

`npm run build` performs:

1. Vite client build
2. Vite SSR build
3. static prerender of every public route
4. content/image verification

After a normal build, run:

```bash
python3 scripts/audit_spa_seo.py .
python3 scripts/validate_sitemap.py dist/sitemap.xml
python3 scripts/validate_sitemap.py dist/image-sitemap.xml
python3 scripts/audit_blog_thumbnails.py dist
python3 scripts/audit_dist_routes.py dist
```

## Why `dist/` already exists

The current build environment could not resolve `registry.npmjs.org` (`EAI_AGAIN`), so dependencies could not be downloaded here. Rather than claim a Vite build succeeded when it did not, the project includes an **offline prerendered snapshot** generated from the same article source, metadata, route map, CSS, images, canonical URLs, and structured-data strategy.

That snapshot is fully static and crawlable, and all route/image/sitemap audits pass. On a normal network, `npm install && npm run build` should regenerate `dist/` as the hydrated React/Vite prerendered build.

## Firebase deployment

See `DEPLOY_FIREBASE.md` before changing the live domain. The live domain was observed redirecting to the GPTawake book product at audit time, so the custom-domain cutover is an explicit external launch step.

## Search philosophy

The architecture is optimized for crawlability, indexability, topical coverage, search presentation, and people-first usefulness. It intentionally does **not** claim or engineer a guaranteed #1 ranking. Ranking still depends on relevance, competition, authority, links/mentions, user response, freshness where appropriate, and Google's systems.

See `GOOGLE_BOT_FRIENDLY_REPORT.md` for the complete audit.
