import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://couldaikillusall.com';
const DIST_DIR = path.join(__dirname, 'dist');

if (!fs.existsSync(DIST_DIR)) {
  console.error('Error: dist directory does not exist. Run vite build first.');
  process.exit(1);
}

const templatePath = path.join(DIST_DIR, 'index.html');
const templateHtml = fs.readFileSync(templatePath, 'utf8');

// List of Canonical Pages to Generate
const PAGES = [
  {
    route: '/about/',
    title: 'About Could AI Kill Us All? — Book of Wisdom University',
    description: 'Learn about the mission of Could AI Kill Us All, our editorial principles, and the Book of Wisdom University research initiative exploring existential AI risks.',
    schemaType: 'AboutPage',
    content: `
      <section style="padding: 140px 0 96px 0;">
        <div class="container" style="max-width: 860px;">
          <a href="/" style="color: var(--gold); text-decoration: none; font-size: 14px; font-weight: 700; display: inline-block; margin-bottom: 24px;">&larr; Back to Home</a>
          <h1 style="font-size: clamp(32px, 4vw, 48px); font-weight: 800; margin-bottom: 24px; color: #fff;">About Could AI Kill Us All?</h1>
          <p style="font-size: 18px; line-height: 1.8; color: var(--text-sub); margin-bottom: 24px;">
            <strong>Could AI Kill Us All?</strong> is an educational and philosophical publishing project developed by <strong>Book of Wisdom University</strong>. Our core mission is to provide rigorous, clear-eyed analysis of artificial intelligence, autonomous agent systems, humanoid robotics, and consciousness without succumbing to either apocalyptic hysteria or uncritical corporate hype.
          </p>
          <div style="background: var(--bg-card); border-left: 4px solid var(--gold); padding: 24px; border-radius: 8px; margin: 32px 0;">
            <h3 style="font-size: 20px; font-weight: 700; color: #fff; margin-bottom: 8px;">Our Editorial Philosophy</h3>
            <p style="font-size: 16px; color: var(--text-muted); margin: 0; line-height: 1.7;">
              "The danger is not intelligence itself. The danger is power without proportionate wisdom." We treat AI as a civilizational mirror: what machines become is inextricably linked to what humans choose to prioritize, incentivize, and automate.
            </p>
          </div>
          <h2 style="font-size: 28px; font-weight: 700; color: #fff; margin: 40px 0 16px 0;">The Book of Wisdom University Initiative</h2>
          <p style="font-size: 16px; line-height: 1.75; color: var(--text-sub); margin-bottom: 20px;">
            Book of Wisdom University produces structured curriculum guides, illustrated treatises, and practical companion workbooks designed to elevate human discernment. In an age where automated content generation and algorithmic distribution threaten cognitive autonomy, our focus remains on cultivating irreplaceable human values: dignity, deep ethical judgment, accountability, and spiritual sovereignty.
          </p>
          <h2 style="font-size: 28px; font-weight: 700; color: #fff; margin: 40px 0 16px 0;">Contact & Publishing Information</h2>
          <p style="font-size: 16px; line-height: 1.75; color: var(--text-muted);">
            Book of Wisdom University &bull; Could AI Kill Us All<br>
            14001 N. Dallas Pkwy, #594, Dallas, TX 75240, United States<br>
            Editorial inquiries: <a href="mailto:contact@couldaikillusall.com" style="color: var(--gold);">contact@couldaikillusall.com</a>
          </p>
        </div>
      </section>
    `
  },
  {
    route: '/privacy/',
    title: 'Privacy Policy — Could AI Kill Us All?',
    description: 'Privacy Policy for couldaikillusall.com. Learn how we handle personal data, cookies, analytics, and adhere to GDPR and CCPA privacy regulations.',
    schemaType: 'WebPage',
    content: `
      <section style="padding: 140px 0 96px 0;">
        <div class="container" style="max-width: 860px;">
          <a href="/" style="color: var(--gold); text-decoration: none; font-size: 14px; font-weight: 700; display: inline-block; margin-bottom: 24px;">&larr; Back to Home</a>
          <h1 style="font-size: clamp(32px, 4vw, 48px); font-weight: 800; margin-bottom: 12px; color: #fff;">Privacy Policy</h1>
          <p style="font-size: 14px; color: var(--text-muted); margin-bottom: 32px;">Last updated: September 16, 2026</p>
          
          <h2 style="font-size: 24px; font-weight: 700; color: #fff; margin: 32px 0 14px 0;">1. Information We Collect</h2>
          <p style="font-size: 16px; line-height: 1.75; color: var(--text-sub); margin-bottom: 16px;">
            At couldaikillusall.com, we respect your privacy. We collect minimal information necessary to deliver our website experience, assess aggregate site performance, and protect site security. This may include standard telemetry such as IP address, browser type, referring pages, and interaction timings through Google Analytics and Firebase Analytics.
          </p>

          <h2 style="font-size: 24px; font-weight: 700; color: #fff; margin: 32px 0 14px 0;">2. Cookies & Advertising Technologies</h2>
          <p style="font-size: 16px; line-height: 1.75; color: var(--text-sub); margin-bottom: 16px;">
            We may use cookies and web beacons via Google AdSense to serve non-personalized or personalized advertisements. Google and third-party vendors use cookies to serve ads based on prior visits to our website or other websites. You may opt out of personalized advertising by visiting Google Ad Settings (<a href="https://www.google.com/settings/ads" target="_blank" style="color: var(--gold);">www.google.com/settings/ads</a>).
          </p>

          <h2 style="font-size: 24px; font-weight: 700; color: #fff; margin: 32px 0 14px 0;">3. Third-Party Links & Product Fulfillment</h2>
          <p style="font-size: 16px; line-height: 1.75; color: var(--text-sub); margin-bottom: 16px;">
            Digital book orders and transactions are fulfilled securely through GPTawake.com via Shopify. When you click our outbound order buttons, you are transferred to GPTawake's secure checkout. Please consult Shopify's privacy policy for details regarding order processing and payment data.
          </p>

          <h2 style="font-size: 24px; font-weight: 700; color: #fff; margin: 32px 0 14px 0;">4. Your Privacy Rights (GDPR & CCPA)</h2>
          <p style="font-size: 16px; line-height: 1.75; color: var(--text-sub); margin-bottom: 16px;">
            Under the General Data Protection Regulation (GDPR) and California Consumer Privacy Act (CCPA), you have rights to request access to, deletion of, or limitation of processing of your personal data. To exercise any rights, contact privacy@couldaikillusall.com.
          </p>
        </div>
      </section>
    `
  },
  {
    route: '/terms/',
    title: 'Terms of Service — Could AI Kill Us All?',
    description: 'Terms of Service for couldaikillusall.com. Review our site usage terms, intellectual property protections, disclaimers, and governing law.',
    schemaType: 'WebPage',
    content: `
      <section style="padding: 140px 0 96px 0;">
        <div class="container" style="max-width: 860px;">
          <a href="/" style="color: var(--gold); text-decoration: none; font-size: 14px; font-weight: 700; display: inline-block; margin-bottom: 24px;">&larr; Back to Home</a>
          <h1 style="font-size: clamp(32px, 4vw, 48px); font-weight: 800; margin-bottom: 12px; color: #fff;">Terms of Service</h1>
          <p style="font-size: 14px; color: var(--text-muted); margin-bottom: 32px;">Last updated: September 16, 2026</p>
          
          <h2 style="font-size: 24px; font-weight: 700; color: #fff; margin: 32px 0 14px 0;">1. Agreement to Terms</h2>
          <p style="font-size: 16px; line-height: 1.75; color: var(--text-sub); margin-bottom: 16px;">
            By accessing or using couldaikillusall.com, you agree to be bound by these Terms of Service. If you disagree with any portion, you must cease using the site immediately.
          </p>

          <h2 style="font-size: 24px; font-weight: 700; color: #fff; margin: 32px 0 14px 0;">2. Intellectual Property</h2>
          <p style="font-size: 16px; line-height: 1.75; color: var(--text-sub); margin-bottom: 16px;">
            All texts, illustrations, graphics, visual plates, logos, frameworks, and curriculum materials published on this website and in the "Will AI Kill Us?" illustrated book are the exclusive intellectual property of Book of Wisdom University. Unauthorized reproduction, distribution, scraping, or commercial exploitation is strictly prohibited without prior written consent.
          </p>

          <h2 style="font-size: 24px; font-weight: 700; color: #fff; margin: 32px 0 14px 0;">3. Informational & Educational Disclaimer</h2>
          <p style="font-size: 16px; line-height: 1.75; color: var(--text-sub); margin-bottom: 16px;">
            The materials presented on this site and in our publications are provided solely for educational, philosophical, and analytical purposes. They do not constitute formal legal, technical, cybersecurity, or financial advice. Book of Wisdom University makes no warranties regarding specific individual or institutional outcomes.
          </p>

          <h2 style="font-size: 24px; font-weight: 700; color: #fff; margin: 32px 0 14px 0;">4. Governing Law</h2>
          <p style="font-size: 16px; line-height: 1.75; color: var(--text-sub); margin-bottom: 16px;">
            These terms are governed by and construed in accordance with the laws of the State of Texas, United States, without regard to conflict of law principles.
          </p>
        </div>
      </section>
    `
  },
  {
    route: '/how-to-use/',
    title: 'How to Use This Guide — Could AI Kill Us All?',
    description: 'A comprehensive study guide explaining how to read the 67-page illustrated edition, apply the 24-page Sovereignty Workbook, and implement the Human Covenant.',
    schemaType: 'HowTo',
    content: `
      <section style="padding: 140px 0 96px 0;">
        <div class="container" style="max-width: 860px;">
          <a href="/" style="color: var(--gold); text-decoration: none; font-size: 14px; font-weight: 700; display: inline-block; margin-bottom: 24px;">&larr; Back to Home</a>
          <h1 style="font-size: clamp(32px, 4vw, 48px); font-weight: 800; margin-bottom: 16px; color: #fff;">How to Use This Guide</h1>
          <p style="font-size: 18px; line-height: 1.75; color: var(--text-sub); margin-bottom: 32px;">
            "Will AI Kill Us?" is engineered not simply to be read in a single passive sitting, but to be studied as an operational handbook for navigating the artificial intelligence transition. Here is our recommended study path:
          </p>

          <div style="display: flex; flex-direction: column; gap: 24px; margin-bottom: 40px;">
            <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 12px; padding: 24px;">
              <h3 style="font-size: 20px; font-weight: 700; color: var(--gold); margin-bottom: 8px;">Step 1: Read the 20 Chapters Sequentially</h3>
              <p style="font-size: 15px; color: var(--text-muted); line-height: 1.65; margin: 0;">
                Begin with Chapter 1 through 5 to establish foundational definitions between computation, syntax, mimicry, and genuine consciousness. Understanding the Autonomy Ladder is essential before diving into physical humanoid robotics.
              </p>
            </div>

            <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 12px; padding: 24px;">
              <h3 style="font-size: 20px; font-weight: 700; color: var(--gold); margin-bottom: 8px;">Step 2: Study the 9 Visual Teaching Plates</h3>
              <p style="font-size: 15px; color: var(--text-muted); line-height: 1.65; margin: 0;">
                Pause at each full-page visual plate. Compare the four future scenarios (Catastrophic Divergence vs. Enclosure vs. Synthetic Fragmentation vs. Sovereignty) and assess where your organization or family currently stands.
              </p>
            </div>

            <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 12px; padding: 24px;">
              <h3 style="font-size: 20px; font-weight: 700; color: var(--gold); margin-bottom: 8px;">Step 3: Complete the 24-Page Sovereignty Workbook</h3>
              <p style="font-size: 15px; color: var(--text-muted); line-height: 1.65; margin: 0;">
                Work through the exercises in the companion workbook. Conduct an audit of your digital dependencies: where have you unconsciously delegated critical judgment to predictive algorithms?
              </p>
            </div>

            <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 12px; padding: 24px;">
              <h3 style="font-size: 20px; font-weight: 700; color: var(--gold); margin-bottom: 8px;">Step 4: Ratify The Human Covenant</h3>
              <p style="font-size: 15px; color: var(--text-muted); line-height: 1.65; margin: 0;">
                Adopt the ten operational commitments in your daily life, team, or classroom. Establish clear ethical boundaries around biometric privacy, automated decision appeals, and human primacy.
              </p>
            </div>
          </div>

          <div style="text-align: center; margin-top: 40px;">
            <a href="https://www.gptawake.com/products/will-ai-kill-us-illustrated-guide-to-ai-humanoids-consciousness-humanity-s-future" target="_blank" rel="noopener" class="btn btn-primary btn-large">
              Get Your Copy of The Illustrated Guide &rarr;
            </a>
          </div>
        </div>
      </section>
    `
  }
];

// Generate Legal Pages
for (const page of PAGES) {
  const pageCanonical = `${BASE_URL}${page.route}`;
  const targetDir = path.join(DIST_DIR, page.route.replace(/^\//, ''));
  fs.mkdirSync(targetDir, { recursive: true });

  let html = templateHtml;

  // Replace Title & Description
  html = html.replace(/<title>[^<]*<\/title>/i, `<title>${page.title}</title>`);
  html = html.replace(/<meta name="description" content="[^"]*" \/>/i, `<meta name="description" content="${page.description}" />`);
  html = html.replace(/<link rel="canonical" href="[^"]*" \/>/i, `<link rel="canonical" href="${pageCanonical}" />`);
  html = html.replace(/<meta property="og:url" content="[^"]*" \/>/i, `<meta property="og:url" content="${pageCanonical}" />`);
  html = html.replace(/<meta property="og:title" content="[^"]*" \/>/i, `<meta property="og:title" content="${page.title}" />`);
  html = html.replace(/<meta property="og:description" content="[^"]*" \/>/i, `<meta property="og:description" content="${page.description}" />`);
  html = html.replace(/<meta name="twitter:title" content="[^"]*" \/>/i, `<meta name="twitter:title" content="${page.title}" />`);
  html = html.replace(/<meta name="twitter:description" content="[^"]*" \/>/i, `<meta name="twitter:description" content="${page.description}" />`);

  // Replace Main Content
  html = html.replace(/<main>[\s\S]*?<\/main>/i, `<main>${page.content}</main>`);

  const destFile = path.join(targetDir, 'index.html');
  fs.writeFileSync(destFile, html, 'utf8');
  console.log(`Generated SSG Page: ${page.route} -> ${destFile}`);
}

// Generate sitemap.xml
const sitemapRoutes = ['/', ...PAGES.map(p => p.route)];
const today = new Date().toISOString().split('T')[0];

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapRoutes.map(route => {
  const priority = route === '/' ? '1.0' : '0.8';
  const changefreq = route === '/' ? 'weekly' : 'monthly';
  return `  <url>
    <loc>${BASE_URL}${route}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}).join('\n')}
</urlset>
`;

fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemapXml, 'utf8');
console.log('Generated: dist/sitemap.xml');

// Generate robots.txt
const robotsTxt = `User-agent: *
Allow: /

User-agent: Googlebot-Image
Allow: /

Sitemap: ${BASE_URL}/sitemap.xml
`;

fs.writeFileSync(path.join(DIST_DIR, 'robots.txt'), robotsTxt, 'utf8');
console.log('Generated: dist/robots.txt');

console.log('SSG Post-Build Complete! All physical routes, sitemap, and robots verified.');
