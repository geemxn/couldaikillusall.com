import { NavLink } from 'react-router-dom';
import { site } from '../siteConfig';

const navItems = [
  ['/', 'Home'],
  ['/articles', 'Guides'],
  ['/glossary', 'Glossary'],
  ['/sources', 'Sources'],
  ['/book', 'Book'],
  ['/about', 'About']
];

export function Layout({ children }) {
  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="/" aria-label="Could AI Kill Us All? home">
            <span className="brand-mark" aria-hidden="true"><span></span></span>
            <span className="brand-copy">
              <strong>Could AI Kill Us All?</strong>
              <small>Evidence before fear.</small>
            </span>
          </a>
          <nav className="primary-nav" aria-label="Primary navigation">
            {navItems.map(([to, label]) => (
              <NavLink key={to} to={to} end={to === '/'}>{label}</NavLink>
            ))}
          </nav>
          <a className="button button-small button-gold" href={site.productUrl} target="_blank" rel="noreferrer sponsored">
            Read the Book
          </a>
        </div>
      </header>
      <main id="main-content">{children}</main>
      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <a className="brand brand-footer" href="/">
              <span className="brand-mark" aria-hidden="true"><span></span></span>
              <span className="brand-copy"><strong>Could AI Kill Us All?</strong><small>AI risk, humanity & the future.</small></span>
            </a>
            <p className="muted">Independent educational analysis from {site.publisher}. We distinguish documented evidence, expert judgment, uncertainty, and speculation.</p>
          </div>
          <div>
            <h2>Explore</h2>
            <a href="/articles">All guides</a>
            <a href="/glossary">AI safety glossary</a>
            <a href="/sources">Primary sources</a>
          </div>
          <div>
            <h2>Trust</h2>
            <a href="/editorial-policy">Editorial policy</a>
            <a href="/about">About & authorship</a>
            <a href={site.productUrl} target="_blank" rel="noreferrer sponsored">WILL AI KILL US? book</a>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© 2026 {site.publisher}</span>
          <span>Last editorial baseline: September 16, 2026</span>
        </div>
      </footer>
    </div>
  );
}
