import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getPageMeta } from '../lib/seo';

function upsertMeta(selector, attrName, attrValue, content) {
  let node = document.head.querySelector(selector);
  if (!node) {
    node = document.createElement('meta');
    node.setAttribute(attrName, attrValue);
    document.head.appendChild(node);
  }
  node.setAttribute('content', content);
}

function removeMeta(selector) {
  document.head.querySelectorAll(selector).forEach((node) => node.remove());
}

export function SeoClient() {
  const location = useLocation();
  useEffect(() => {
    const meta = getPageMeta(location.pathname);
    document.title = meta.title;
    upsertMeta('meta[name="description"]', 'name', 'description', meta.description);
    upsertMeta('meta[name="robots"]', 'name', 'robots', meta.robots);
    upsertMeta('meta[property="og:site_name"]', 'property', 'og:site_name', 'Could AI Kill Us All?');
    upsertMeta('meta[property="og:type"]', 'property', 'og:type', meta.type);
    upsertMeta('meta[property="og:title"]', 'property', 'og:title', meta.title);
    upsertMeta('meta[property="og:description"]', 'property', 'og:description', meta.description);
    upsertMeta('meta[property="og:url"]', 'property', 'og:url', meta.canonical);
    upsertMeta('meta[property="og:image"]', 'property', 'og:image', meta.image);
    upsertMeta('meta[property="og:image:alt"]', 'property', 'og:image:alt', meta.imageAlt || '');
    upsertMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    upsertMeta('meta[name="twitter:title"]', 'name', 'twitter:title', meta.title);
    upsertMeta('meta[name="twitter:description"]', 'name', 'twitter:description', meta.description);
    upsertMeta('meta[name="twitter:image"]', 'name', 'twitter:image', meta.image);
    upsertMeta('meta[name="twitter:image:alt"]', 'name', 'twitter:image:alt', meta.imageAlt || '');

    removeMeta('meta[property="article:published_time"], meta[property="article:modified_time"]');
    if (meta.published) upsertMeta('meta[property="article:published_time"]', 'property', 'article:published_time', meta.published);
    if (meta.modified) upsertMeta('meta[property="article:modified_time"]', 'property', 'article:modified_time', meta.modified);

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = meta.canonical;

    document.head.querySelectorAll('script[data-route-jsonld="true"]').forEach((node) => node.remove());
    (meta.jsonLd || []).forEach((data) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.dataset.routeJsonld = 'true';
      script.textContent = JSON.stringify(data);
      document.head.appendChild(script);
    });
  }, [location.pathname]);
  return null;
}
