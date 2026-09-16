# Firebase Launch Guide — couldaikillusall.com

## 1. Choose your deployment path

### Preferred: React/Vite hydrated prerender

On a machine with normal npm access:

```bash
npm install
npm run build
```

Then rerun the audits documented in `README.md`.

### Immediate fallback: verified static prerender

The included `dist/` is already a fully crawlable pre-rendered snapshot of the editorial site. It can be deployed to Firebase Hosting without waiting for npm dependencies. It does not hydrate React client navigation, but all core pages, navigation, CTAs, FAQs, images, metadata, canonical URLs, sitemaps, and native `<details>` interactions work as static HTML.

## 2. Connect the Firebase project

Copy `.firebaserc.example` to `.firebaserc` and set your real Firebase project ID, or run:

```bash
firebase login
firebase use --add
```

Do not put service-account secrets or private keys in the Vite client source.

## 3. Deploy Hosting

```bash
firebase deploy --only hosting
```

Verify the Firebase preview/temporary hosting URL before changing the production domain.

## 4. Connect the custom domain

In Firebase Hosting, add:

- `couldaikillusall.com` as the canonical production domain
- optionally `www.couldaikillusall.com`, redirected to the apex domain if your DNS/hosting setup supports it

At audit time, `https://couldaikillusall.com/` redirected to the GPTawake product page. Replace that redirect/DNS target only after the Firebase version is verified.

## 5. Production checks before Search Console submission

Verify these exact URLs return their intended status and content:

```text
https://couldaikillusall.com/
https://couldaikillusall.com/articles
https://couldaikillusall.com/articles/could-ai-kill-us-all
https://couldaikillusall.com/articles/how-to-prevent-catastrophic-ai-risk
https://couldaikillusall.com/sitemap.xml
https://couldaikillusall.com/image-sitemap.xml
https://couldaikillusall.com/robots.txt
https://couldaikillusall.com/this-route-does-not-exist
```

Expected behavior:

- real pages: HTTP 200
- nonsense/deleted route: HTTP 404
- no desired page has `noindex`
- 404 page has `noindex,follow`
- canonical host is the HTTPS apex domain
- article HTML already contains its title, description, body, image, canonical and JSON-LD before JavaScript

## 6. Search Console launch actions

After the domain serves the new site:

1. Verify the Domain property in Google Search Console.
2. Submit `https://couldaikillusall.com/sitemap.xml`.
3. Inspect the homepage, the primary pillar, and a few secondary pillars with URL Inspection.
4. Test live URL rendering and confirm the representative image is fetchable.
5. Watch Page indexing, Crawl stats, Core Web Vitals, query/page performance, and canonical selection.
6. Do not repeatedly request indexing for every page; let internal links and the sitemap do discovery work.

## 7. Post-launch growth

Technical eligibility is the foundation, not the finish line. Build real authority by earning relevant editorial references, updating pages when evidence materially changes, publishing original synthesis/data/visual explanations, and expanding only where a new page serves a distinct search/user intent.
