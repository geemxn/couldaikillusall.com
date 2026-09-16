import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { App } from './App';
import { getPageMeta, metaToHead, getSitemapEntries } from './lib/seo';
import { articles } from './content/articles';

export const routes = ['/', '/articles', '/about', '/editorial-policy', '/glossary', '/sources', '/book', ...articles.map((a) => `/articles/${a.slug}`)];
export { getSitemapEntries };

export function render(url) {
  const appHtml = renderToString(<StaticRouter location={url}><App /></StaticRouter>);
  const meta = getPageMeta(url);
  return { appHtml, head: metaToHead(meta), meta };
}
