import { site } from '../siteConfig';
import { articleMap, articles } from '../content/articles';
import { readingMinutes, wordCount } from './text';
import { articleSections, articleSectionMap } from '../content/articleSections';

const absolute = (path) => path.startsWith('http') ? path : `${site.domain}${path}`;

function articleJsonLd(article) {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: article.title,
      description: article.description,
      mainEntityOfPage: `${site.domain}/articles/${article.slug}`,
      image: [absolute(article.image.square), absolute(article.image.fourThree), absolute(article.image.wide)],
      datePublished: article.published,
      dateModified: article.modified,
      inLanguage: 'en',
      wordCount: wordCount(article.body),
      timeRequired: `PT${readingMinutes(article.body)}M`,
      author: {
        '@type': 'Person',
        name: site.author,
        url: `${site.domain}/about#wisdom-sage`
      },
      publisher: {
        '@type': 'Organization',
        name: site.publisher,
        url: `${site.domain}/about`,
        logo: {
          '@type': 'ImageObject',
          url: `${site.domain}/assets/brand/site-mark-512.png`,
          width: 512,
          height: 512
        }
      },
      keywords: article.keywords.join(', '),
      about: article.keywords.map((name) => ({ '@type': 'Thing', name }))
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: site.domain },
        { '@type': 'ListItem', position: 2, name: 'Articles', item: `${site.domain}/articles` },
        { '@type': 'ListItem', position: 3, name: article.shortTitle, item: `${site.domain}/articles/${article.slug}` }
      ]
    }
  ];
}

export function getPageMeta(urlPath) {
  const clean = (urlPath || '/').split('?')[0].split('#')[0].replace(/\/$/, '') || '/';
  if (clean.startsWith('/articles/')) {
    const slug = clean.slice('/articles/'.length);
    const article = articleMap[slug];
    if (article) {
      return {
        title: `${article.shortTitle} | Could AI Kill Us All?`,
        description: article.description,
        canonical: `${site.domain}/articles/${article.slug}`,
        robots: 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1',
        image: absolute(article.image.wide),
        imageAlt: article.imageAlt,
        type: 'article',
        published: article.published,
        modified: article.modified,
        jsonLd: articleJsonLd(article)
      };
    }
  }

  // Section pages: /articles/could-ai-kill-us-all/[section]
  if (clean.startsWith('/articles/could-ai-kill-us-all/')) {
    const sectionSlug = clean.slice('/articles/could-ai-kill-us-all/'.length);
    const sectionMeta = articleSectionMap[sectionSlug];
    if (sectionMeta) {
      const sectionUrl = `${site.domain}/articles/could-ai-kill-us-all/${sectionSlug}`;
      const sectionTitle = `${sectionMeta.heading} — Could AI Kill Us All?`;
      return {
        title: sectionTitle,
        description: sectionMeta.description,
        canonical: sectionUrl,
        robots: 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1',
        image: `${site.domain}/assets/articles/could-ai-kill-us-all-1600x900.webp`,
        imageAlt: 'AI risk section from Could AI Kill Us All? — comprehensive guide by Book of Wisdom University.',
        type: 'article',
        published: site.launchDate,
        modified: site.launchDate,
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: sectionTitle,
            description: sectionMeta.description,
            url: sectionUrl,
            isPartOf: { '@type': 'WebPage', url: `${site.domain}/articles/could-ai-kill-us-all` },
            publisher: { '@type': 'Organization', name: site.publisher, url: `${site.domain}/about` }
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: site.domain },
              { '@type': 'ListItem', position: 2, name: 'Articles', item: `${site.domain}/articles` },
              { '@type': 'ListItem', position: 3, name: 'Could AI Kill Us All?', item: `${site.domain}/articles/could-ai-kill-us-all` },
              { '@type': 'ListItem', position: 4, name: sectionMeta.heading, item: sectionUrl }
            ]
          }
        ]
      };
    }
  }

  const pages = {
    '/': {
      title: 'Could AI Kill Us All? Evidence, Scenarios, Safety & Human Control',
      description: 'Could AI kill us all? Explore the evidence, expert disagreement, realistic risk pathways, superintelligence, alignment, humanoids, cyber and bio risks, and the safeguards that matter.',
      canonical: site.domain,
      image: `${site.domain}/assets/brand/could-ai-kill-us-all-hero-1600x900.webp`
    },
    '/articles': {
      title: 'AI Risk Guides: Extinction, Alignment, AGI, Cyber, Biosecurity & Humanoids',
      description: 'Browse 12 in-depth, evidence-first guides on catastrophic AI risk, AGI, superintelligence, alignment, loss of control, cyber risk, biosecurity, autonomous weapons, humanoid robots, consciousness, and safety.',
      canonical: `${site.domain}/articles`,
      image: `${site.domain}/assets/brand/could-ai-kill-us-all-hero-1600x900.webp`
    },
    '/about': {
      title: 'About This Project | Could AI Kill Us All?',
      description: 'Our editorial mission, authorship, evidence standards, update policy, and relationship to Book of Wisdom University and the illustrated WILL AI KILL US? guide.',
      canonical: `${site.domain}/about`,
      image: `${site.domain}/assets/brand/could-ai-kill-us-all-hero-1600x900.webp`
    },
    '/editorial-policy': {
      title: 'Editorial Policy, Corrections & Source Standards | Could AI Kill Us All?',
      description: 'How we separate evidence from speculation, handle uncertain AI-risk claims, cite sources, update articles, correct errors, and avoid sensational or fabricated authority signals.',
      canonical: `${site.domain}/editorial-policy`,
      image: `${site.domain}/assets/brand/could-ai-kill-us-all-hero-1600x900.webp`
    },
    '/glossary': {
      title: 'AI Safety Glossary: AGI, ASI, Alignment, Agents, Loss of Control & More',
      description: 'Clear definitions for AGI, superintelligence, alignment, agentic AI, loss of control, catastrophic risk, frontier models, biosecurity, cyber capability, autonomy, and related terms.',
      canonical: `${site.domain}/glossary`,
      image: `${site.domain}/assets/brand/could-ai-kill-us-all-hero-1600x900.webp`
    },
    '/sources': {
      title: 'Primary Sources & Research Library | Could AI Kill Us All?',
      description: 'Primary reports, frameworks, standards, and research sources used across our AI safety guides, including the International AI Safety Report, NIST, frontier safety frameworks, and public research.',
      canonical: `${site.domain}/sources`,
      image: `${site.domain}/assets/brand/could-ai-kill-us-all-hero-1600x900.webp`
    },
    '/book': {
      title: 'WILL AI KILL US? Illustrated Guide | Book of Wisdom University',
      description: 'Explore the 67-page illustrated WILL AI KILL US? expanded edition covering AI, humanoids, autonomy, consciousness, work, truth, power, safety, and humanity’s choices.',
      canonical: `${site.domain}/book`,
      image: site.productCover
    }
  };

  const meta = pages[clean];
  if (meta) {
    const jsonLd = clean === '/' ? [
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: site.name,
        url: site.domain,
        description: site.description,
        inLanguage: 'en'
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: site.publisher,
        url: `${site.domain}/about`
      }
    ] : [];
    return {
      ...meta,
      robots: 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1',
      imageAlt: site.description,
      type: 'website',
      jsonLd
    };
  }

  return {
    title: 'Page Not Found | Could AI Kill Us All?',
    description: 'The requested page could not be found.',
    canonical: `${site.domain}${clean}`,
    robots: 'noindex,follow',
    image: `${site.domain}/assets/brand/could-ai-kill-us-all-hero-1600x900.webp`,
    imageAlt: site.description,
    type: 'website',
    jsonLd: []
  };
}

export function metaToHead(meta) {
  const esc = (value = '') => String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

  const jsonLd = (meta.jsonLd || []).map((data) =>
    `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`
  ).join('\n');

  return `
<title>${esc(meta.title)}</title>
<meta name="description" content="${esc(meta.description)}" />
<meta name="robots" content="${esc(meta.robots)}" />
<link rel="canonical" href="${esc(meta.canonical)}" />
<meta property="og:site_name" content="${esc(site.name)}" />
<meta property="og:type" content="${esc(meta.type)}" />
<meta property="og:title" content="${esc(meta.title)}" />
<meta property="og:description" content="${esc(meta.description)}" />
<meta property="og:url" content="${esc(meta.canonical)}" />
<meta property="og:image" content="${esc(meta.image)}" />
<meta property="og:image:alt" content="${esc(meta.imageAlt)}" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${esc(meta.title)}" />
<meta name="twitter:description" content="${esc(meta.description)}" />
<meta name="twitter:image" content="${esc(meta.image)}" />
<meta name="twitter:image:alt" content="${esc(meta.imageAlt)}" />
${meta.published ? `<meta property="article:published_time" content="${esc(meta.published)}" />` : ''}
${meta.modified ? `<meta property="article:modified_time" content="${esc(meta.modified)}" />` : ''}
${jsonLd}`;
}

export function getSitemapEntries() {
  const staticPages = ['/', '/articles', '/about', '/editorial-policy', '/glossary', '/sources', '/book'];
  const parentArticle = articleMap['could-ai-kill-us-all'];
  return [
    ...staticPages.map((path) => ({ path, lastmod: site.launchDate })),
    ...articles.map((article) => ({ path: `/articles/${article.slug}`, lastmod: article.modified, image: article.image.wide, imageAlt: article.imageAlt })),
    ...articleSections.map((s) => ({
      path: `/articles/could-ai-kill-us-all/${s.section}`,
      lastmod: site.launchDate,
      image: parentArticle?.image.wide,
      imageAlt: parentArticle?.imageAlt
    }))
  ];
}
