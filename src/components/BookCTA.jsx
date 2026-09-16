import { site } from '../siteConfig';

export function BookCTA({ compact = false }) {
  return (
    <aside className={`book-cta ${compact ? 'book-cta-compact' : ''}`} aria-label="WILL AI KILL US? illustrated guide">
      <div className="book-cover-wrap">
        <img
          src={site.productCover}
          width="550"
          height="550"
          loading={compact ? 'lazy' : 'eager'}
          alt="Cover of WILL AI KILL US? Illustrated Expanded Edition from Book of Wisdom University"
        />
      </div>
      <div className="book-cta-copy">
        <span className="eyebrow">Go deeper than the headline</span>
        <h2>{site.productTitle}</h2>
        <p>A 67-page illustrated philosophical and practical guide to AI, humanoids, autonomy, consciousness, work, truth, power, safety, and the human choices shaping what comes next.</p>
        {!compact && (
          <ul className="check-list">
            <li>20 chapters + 9 full-page visual teachings</li>
            <li>Humanoids, agents, military AI, consciousness and governance</li>
            <li>24-page Human Sovereignty Workbook in the full package</li>
          </ul>
        )}
        <a className="button button-gold" href={site.productUrl} target="_blank" rel="noreferrer sponsored">
          Explore the Illustrated Guide <span aria-hidden="true">→</span>
        </a>
      </div>
    </aside>
  );
}
