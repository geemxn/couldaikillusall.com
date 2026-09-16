import { readingMinutes } from '../lib/text';

export function ArticleCard({ article, priority = false }) {
  return (
    <article className="article-card">
      <a className="article-card-image" href={`/articles/${article.slug}`}>
        <img
          src={article.image.wide}
          width="1600"
          height="900"
          loading={priority ? 'eager' : 'lazy'}
          alt={article.imageAlt}
        />
      </a>
      <div className="article-card-body">
        <div className="card-meta"><span>{article.eyebrow}</span><span>{readingMinutes(article.body)} min read</span></div>
        <h2><a href={`/articles/${article.slug}`}>{article.shortTitle}</a></h2>
        <p>{article.description}</p>
        <a className="text-link" href={`/articles/${article.slug}`}>Read the evidence <span aria-hidden="true">→</span></a>
      </div>
    </article>
  );
}
