import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { App } from './App';
import { getPageMeta, metaToHead, getSitemapEntries } from './lib/seo';
import { articles } from './content/articles';
import { articleSections } from './content/articleSections';

const sectionRoutes = articleSections.map((s) => `/articles/could-ai-kill-us-all/${s.section}`);

export const routes = ['/', '/articles', '/about', '/editorial-policy', '/glossary', '/sources', '/book', ...articles.map((a) => `/articles/${a.slug}`), ...sectionRoutes];
export { getSitemapEntries };

export function render(url) {
  const appHtml = renderToString(<StaticRouter location={url}><App /></StaticRouter>);
  const meta = getPageMeta(url);
  return { appHtml, head: metaToHead(meta), meta };
}
