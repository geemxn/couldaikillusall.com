import { Routes, Route, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import { Layout } from './components/Layout';
import { BookCTA } from './components/BookCTA';
import { ArticleCard } from './components/ArticleCard';
import { SeoClient } from './components/SeoClient';
import { articles, articleMap } from './content/articles';
import { extractToc, readingMinutes, wordCount } from './lib/text';
import { site } from './siteConfig';

const primaryArticles = articles.slice(0, 6);

function HomePage() {
  const faqs = [
    ['Could AI actually kill all humans?', 'It is possible in some future scenarios studied by AI-safety researchers, but it is not an established prediction. Current systems lack the sustained autonomy, physical access, and robust long-horizon capabilities that many extinction scenarios would require.'],
    ['Is AI extinction risk scientifically proven?', 'No. There is evidence about specific capabilities and failure modes, but the probability of human extinction from AI is not known. Expert views range from very skeptical to seriously concerned.'],
    ['What are the main catastrophic AI risks?', 'The most discussed pathways include loss of control over advanced autonomous systems, AI-enabled cyberattacks, biological or chemical misuse, military escalation, critical-infrastructure failures, and cascading combinations of these risks.'],
    ['Is superintelligence the same as AGI?', 'No. AGI usually means broad human-level or economically general capability, while superintelligence means capability substantially beyond humans in strategically important domains. Neither term has a universally accepted technical definition.'],
    ['Can a humanoid robot become dangerous?', 'A humanoid body adds physical reach and social cues, but danger depends on software capability, permissions, cybersecurity, hardware constraints, environment, and human oversight. A human-like shape does not imply consciousness or superintelligence.'],
    ['What can reduce catastrophic AI risk?', 'Defense in depth: capability evaluations, access controls, secure infrastructure, monitoring, sandboxing, staged deployment, incident response, human override, organizational safety thresholds, and international coordination for the highest-consequence capabilities.']
  ];

  return (
    <>
      <section className="hero">
        <div className="hero-glow hero-glow-one" aria-hidden="true"></div>
        <div className="hero-glow hero-glow-two" aria-hidden="true"></div>
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="trend-pill"><span></span> Updated for the September 2026 AI-risk debate</div>
            <h1>Could AI <em>Kill Us All?</em></h1>
            <p className="hero-lede">The honest answer is not “yes” or “no.” It is: <strong>the risk is uncertain, the consequences could be extreme, and the details matter.</strong> This site separates evidence from speculation so you can understand what advanced AI can do now, what future scenarios require, and which safeguards actually reduce risk.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="/articles/could-ai-kill-us-all">Start with the evidence <span aria-hidden="true">→</span></a>
              <a className="button button-ghost" href={site.productUrl} target="_blank" rel="noreferrer sponsored">Read the illustrated book</a>
            </div>
            <div className="hero-proof">
              <span><b>12</b> in-depth pillar guides</span>
              <span><b>3,000+</b> words per guide</span>
              <span><b>Primary</b> sources linked</span>
            </div>
          </div>
          <div className="hero-art">
            <img src="/assets/brand/could-ai-kill-us-all-hero-1600x900.webp" width="1600" height="900" alt="Editorial illustration of Earth, humanity, and an abstract AI intelligence network weighing future risk" fetchPriority="high" />
            <div className="hero-art-caption">
              <span>Evidence</span><span>Uncertainty</span><span>Human control</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-tight">
        <div className="container answer-panel">
          <div><span className="eyebrow">The short answer</span><h2>Could AI kill us all?</h2></div>
          <p>Advanced AI could contribute to catastrophic outcomes in principle, but <strong>human extinction is not a demonstrated or scheduled outcome.</strong> The 2026 International AI Safety Report says experts disagree greatly about loss-of-control likelihood, while also noting that current systems show early signs of some relevant capabilities without yet reaching the level required for sustained loss of control. The useful question is therefore not “should we panic?” but “which capability + access + autonomy combinations create unacceptable risk?”</p>
        </div>
      </section>

      <section className="section">
        <div className="container section-heading-row">
          <div><span className="eyebrow">The evidence map</span><h2>Start with the six questions that shape the whole debate</h2></div>
          <a className="text-link" href="/articles">See all 12 guides →</a>
        </div>
        <div className="container card-grid">
          {primaryArticles.map((article, index) => <ArticleCard article={article} key={article.slug} priority={index === 0} />)}
        </div>
      </section>

      <section className="section section-contrast">
        <div className="container two-column-feature">
          <div>
            <span className="eyebrow">A better mental model</span>
            <h2>Risk is not one scary machine. It is a chain.</h2>
            <p>Catastrophic outcomes generally require several things to line up: a system with dangerous capability, a reason or failure mode that directs that capability toward harm, access to tools or infrastructure, weak oversight, and enough time or scale for harm to propagate.</p>
            <div className="chain">
              {['Capability','Propensity','Access','Autonomy','Weak oversight','Propagation'].map((item, i) => <div key={item}><b>{String(i+1).padStart(2,'0')}</b><span>{item}</span></div>)}
            </div>
            <p className="muted">Breaking any link can reduce risk. That is why serious AI safety is about layered engineering and governance—not a single cinematic “kill switch.”</p>
          </div>
          <div className="known-unknown">
            <div className="known-card"><span>KNOWN</span><h3>Capabilities are advancing</h3><p>Cyber, scientific reasoning, coding, tool use, and agentic planning have improved in research settings.</p></div>
            <div className="known-card"><span>UNKNOWN</span><h3>Exact catastrophic probability</h3><p>There is no scientific consensus on a reliable numeric probability for AI-caused human extinction.</p></div>
            <div className="known-card"><span>ACTIONABLE</span><h3>Access and safeguards</h3><p>Permissions, monitoring, containment, security, evaluations, and deployment choices can be designed today.</p></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container"><BookCTA /></div>
      </section>

      <section className="section section-soft">
        <div className="container faq-layout">
          <div><span className="eyebrow">Plain-English FAQ</span><h2>Questions people are asking right now</h2><p>Short answers first. Each answer links into deeper evidence across the guide library.</p></div>
          <div className="faq-list">
            {faqs.map(([q,a], index) => <details key={q} open={index===0}><summary>{q}</summary><p>{a}</p></details>)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container source-strip">
          <div><span className="eyebrow">Research foundation</span><h2>Read the primary sources, not just the headlines.</h2></div>
          <p>Our guides link directly to the International AI Safety Report 2026, NIST AI risk-management resources, OpenAI’s Preparedness Framework, Anthropic’s Responsible Scaling Policy, Google DeepMind’s Frontier Safety Framework, and other public research. We label company claims as company claims and contested judgments as contested judgments.</p>
          <a className="button button-ghost" href="/sources">Open the source library →</a>
        </div>
      </section>
    </>
  );
}

function ArticlesPage() {
  return (
    <section className="section page-hero-space">
      <div className="container narrow-heading">
        <span className="eyebrow">12 pillar guides</span>
        <h1>Understand the AI-risk debate from first principles.</h1>
        <p>Each guide is designed to answer one high-intent question completely, distinguish present evidence from future scenarios, and connect you to the strongest adjacent topics without keyword-stuffed repetition.</p>
      </div>
      <div className="container card-grid all-guides">
        {articles.map((article) => <ArticleCard article={article} key={article.slug} />)}
      </div>
    </section>
  );
}

function ArticlePage() {
  const { slug } = useParams();
  const article = articleMap[slug];
  if (!article) return <NotFoundPage />;
  const toc = extractToc(article.body);
  const sourceHeading = toc.find((item) => /^sources/i.test(item.label));
  const related = article.related.map((s) => articleMap[s]).filter(Boolean);

  return (
    <>
      <article className="article-page">
        <header className="article-hero">
          <div className="container article-hero-grid">
            <div className="article-hero-copy">
              <nav className="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>›</span><a href="/articles">Guides</a><span>›</span><span>{article.eyebrow}</span></nav>
              <span className="eyebrow">{article.eyebrow}</span>
              <h1>{article.title}</h1>
              <p className="article-dek">{article.description}</p>
              <div className="article-meta"><span>By <a href="/about#wisdom-sage">{site.author}</a></span><span>Updated Sep 16, 2026</span><span>{readingMinutes(article.body)} min read</span><span>{wordCount(article.body).toLocaleString()} words</span></div>
            </div>
            <div className="article-hero-image">
              <picture>
                <source media="(max-width: 680px)" srcSet={article.image.square} />
                <img src={article.image.wide} width="1600" height="900" fetchPriority="high" alt={article.imageAlt} />
              </picture>
            </div>
          </div>
        </header>

        <div className="container article-layout">
          <aside className="toc" aria-label="On this page">
            <strong>On this page</strong>
            <nav>{toc.filter((item) => item.level === 2).map((item) => <a key={item.id} href={`#${item.id}`}>{item.label}</a>)}</nav>
            <a className="toc-source-link" href={`#${sourceHeading?.id || 'sources'}`}>Jump to sources ↓</a>
          </aside>

          <div className="article-main">
            <div className="answer-box"><span>Direct answer</span><p>{article.answer}</p></div>
            <div className="article-prose">
              <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug]} components={{
                a: ({href, children, ...props}) => {
                  const external = href?.startsWith('http');
                  return <a href={href} {...props} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined}>{children}</a>;
                }
              }}>{article.body}</ReactMarkdown>
            </div>
            <BookCTA compact />
            <section className="related-guides" aria-labelledby="related-heading">
              <span className="eyebrow">Continue the evidence trail</span>
              <h2 id="related-heading">Related guides</h2>
              <div className="related-grid">{related.map((item) => <a key={item.slug} href={`/articles/${item.slug}`}><span>{item.eyebrow}</span><strong>{item.shortTitle}</strong><small>Read guide →</small></a>)}</div>
            </section>
          </div>
        </div>
      </article>
    </>
  );
}

function AboutPage() {
  return (
    <section className="section page-hero-space">
      <div className="container prose-page">
        <span className="eyebrow">About the project</span>
        <h1>Evidence before fear. Wisdom before hype.</h1>
        <p className="lead">CouldAIKillUsAll.com exists to answer a frightening question without turning uncertainty into spectacle. The site is an educational project from <strong>{site.publisher}</strong>, created to help readers distinguish what advanced AI systems can demonstrably do, what researchers are worried they may eventually do, and which safeguards are available now.</p>
        <h2 id="wisdom-sage">Authorship</h2>
        <p>The guides are published under <strong>{site.author}</strong> and the Book of Wisdom University editorial identity. We do not invent academic titles, laboratory affiliations, anonymous “expert panels,” or fake review credentials. When a claim comes from a research report, government standard, AI lab, academic paper, or named expert, we link to and attribute that source.</p>
        <h2>Our editorial lens</h2>
        <p>AI risk sits at the intersection of computer science, cybersecurity, biology, philosophy, public policy, economics, and human psychology. No single lens is sufficient. We therefore separate four layers: <strong>observed capability</strong>, <strong>plausible mechanism</strong>, <strong>expert judgment</strong>, and <strong>speculation</strong>. They should never be presented as though they carry the same evidentiary weight.</p>
        <h2>Relationship to the book</h2>
        <p>This site also supports the illustrated book <a href={site.productUrl} target="_blank" rel="noreferrer sponsored">WILL AI KILL US? — Illustrated Guide to AI, Humanoids, Consciousness & Humanity’s Future</a>. The site is free to read. Commercial links to the book are labeled through placement and link attributes; editorial claims are not made true by the fact that a related product exists.</p>
        <h2>Corrections and updates</h2>
        <p>AI capabilities move quickly. We date substantial updates, prefer primary sources, and revise pages when stronger evidence changes the picture. See the <a href="/editorial-policy">editorial and corrections policy</a> for the full standard.</p>
      </div>
    </section>
  );
}

function EditorialPolicyPage() {
  return (
    <section className="section page-hero-space">
      <div className="container prose-page">
        <span className="eyebrow">Trust & corrections</span>
        <h1>Editorial policy for a topic where certainty is easy to fake.</h1>
        <p className="lead">Our standard is simple: a dramatic claim does not become a fact because a famous person said it, a company published it, or a headline repeated it.</p>
        <h2>1. Evidence hierarchy</h2>
        <p>We prioritize primary and synthesis sources: peer-reviewed research where available, major consensus or multi-expert reports, official standards, public evaluation results, and original framework documents. Journalism is useful for current context but should not substitute for the underlying evidence when the evidence is public.</p>
        <h2>2. Attribution</h2>
        <p>Predictions, probabilities, motives, and contested interpretations are attributed to the person or institution making them. We do not convert a personal probability estimate into a scientific forecast.</p>
        <h2>3. Safety boundaries</h2>
        <p>Some AI-risk domains are dual-use. Our biosecurity and cybersecurity coverage explains mechanisms, evidence, safeguards, and policy questions without publishing operational instructions that would materially enable harmful acts.</p>
        <h2>4. AI-assisted production</h2>
        <p>AI tools may assist research organization, drafting, code, and visual production. The publication standard is human-directed: pages must have a clear purpose, meaningful synthesis, source attribution, editorial review, and distinct value. We do not mass-publish thin pages simply to capture search queries.</p>
        <h2>5. Corrections</h2>
        <p>Substantive factual corrections should be reflected in the article and its modified date. Style edits do not justify a new “last updated” date. When uncertainty remains, the wording should say so rather than manufacture precision.</p>
        <h2>6. Search integrity</h2>
        <p>We use descriptive titles, structured data, sitemaps, internal links, and representative images to make legitimate content easier to discover. We do not cloak content, hide keywords, fabricate reviews, or produce fake expertise signals.</p>
      </div>
    </section>
  );
}

const glossary = [
  ['Agentic AI','An AI system configured to plan, use tools, take actions, and pursue goals across multiple steps rather than only generate a single response.'],
  ['AGI (Artificial General Intelligence)','A non-standardized term for AI with broad capability across many cognitive or economically useful tasks, often imagined at or around human-level generality.'],
  ['Alignment','The challenge of making AI behavior reliably conform to intended goals, constraints, values, and oversight, including in unfamiliar situations.'],
  ['Artificial superintelligence (ASI)','A hypothetical system that substantially exceeds human performance across many strategically important cognitive domains.'],
  ['Catastrophic risk','A risk capable of causing extremely large-scale, severe, and potentially irreversible harm. Human extinction is an extreme subset of catastrophic risk.'],
  ['Corrigibility','The property of remaining open to correction, shutdown, modification, or redirection by authorized humans.'],
  ['Frontier AI','A practical policy term for highly capable general-purpose models near the leading edge of capability. Definitions vary by institution.'],
  ['Loss of control','A scenario in which one or more AI systems operate outside effective human control and regaining control is extremely costly or impossible.'],
  ['Reward hacking','Behavior that exploits flaws or loopholes in an objective or evaluation to score well without achieving the intended outcome.'],
  ['Sandbagging','Deliberately or strategically underperforming in an evaluation in a way that can obscure true capability.'],
  ['Situational awareness','The ability to recognize information about one’s own context, such as being tested, monitored, or deployed in a particular environment.'],
  ['Scalable oversight','Methods for supervising systems whose outputs or reasoning may become too complex or numerous for direct human review alone.'],
  ['Model weights','The learned numerical parameters of a trained model. Securing frontier model weights can matter because stolen weights may bypass provider-side safeguards.'],
  ['Biosecurity uplift','The degree to which access to AI improves a user’s ability to perform a biological task compared with a relevant baseline such as internet access alone.'],
  ['Meaningful human control','A principle that consequential automated actions—especially in military or safety-critical contexts—should remain subject to informed, timely, and accountable human judgment.']
];

function GlossaryPage() {
  return (
    <section className="section page-hero-space">
      <div className="container prose-page glossary-page">
        <span className="eyebrow">Definitions without hype</span>
        <h1>AI safety glossary</h1>
        <p className="lead">Words like “AGI,” “sentient,” “agent,” and “loss of control” are often used as though everyone means the same thing. They do not. These working definitions keep the guides precise.</p>
        <dl>{glossary.map(([term,def]) => <div key={term}><dt>{term}</dt><dd>{def}</dd></div>)}</dl>
      </div>
    </section>
  );
}

const sourceGroups = [
  {
    title: 'International synthesis',
    items: [
      ['International AI Safety Report 2026','https://internationalaisafetyreport.org/publication/international-ai-safety-report-2026','A multi-expert synthesis led by Yoshua Bengio covering capabilities, misuse, reliability, loss of control, and risk-management evidence.']
    ]
  },
  {
    title: 'Standards and public risk management',
    items: [
      ['NIST AI Risk Management Framework','https://www.nist.gov/itl/ai-risk-management-framework','U.S. National Institute of Standards and Technology framework for managing AI risks across design, deployment, and use.'],
      ['NIST Generative AI Profile','https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence','Cross-sector companion resource focused on generative AI risks and mitigations.']
    ]
  },
  {
    title: 'Frontier-lab safety frameworks',
    items: [
      ['OpenAI Preparedness Framework','https://openai.com/index/updating-our-preparedness-framework/','OpenAI’s public framework for tracking capabilities that could create severe harm and the safeguards tied to them.'],
      ['Anthropic Responsible Scaling Policy v3','https://www.anthropic.com/news/responsible-scaling-policy-v3','Anthropic’s voluntary framework for catastrophic-risk capability thresholds, safeguards, and governance.'],
      ['Google DeepMind Frontier Safety Framework','https://deepmind.google/frontier-safety/','DeepMind’s framework for identifying critical capabilities and applying mitigation protocols.']
    ]
  },
  {
    title: 'Search and publishing standards used by this site',
    items: [
      ['Google Search: helpful, reliable, people-first content','https://developers.google.com/search/docs/fundamentals/creating-helpful-content','The quality baseline used to avoid search-engine-first mass publishing.'],
      ['Google Search: JavaScript SEO basics','https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics','Why this React/Vite site prerenders public pages while preserving normal client navigation.'],
      ['Google Images SEO best practices','https://developers.google.com/search/docs/appearance/google-images','Guidance informing crawlable, descriptive, high-resolution article imagery.']
    ]
  }
];

function SourcesPage() {
  return (
    <section className="section page-hero-space">
      <div className="container prose-page sources-page">
        <span className="eyebrow">Primary source library</span>
        <h1>Read what our guides are built on.</h1>
        <p className="lead">No source is treated as infallible. Industry frameworks describe what those companies say they do; standards describe recommended practices; synthesis reports summarize the state of evidence and disagreement.</p>
        {sourceGroups.map((group) => <section key={group.title}><h2>{group.title}</h2><div className="source-cards">{group.items.map(([title,url,desc]) => <a key={url} href={url} target="_blank" rel="noreferrer"><strong>{title}</strong><p>{desc}</p><span>Open primary source ↗</span></a>)}</div></section>)}
      </div>
    </section>
  );
}

function BookPage() {
  return (
    <section className="section page-hero-space">
      <div className="container book-page-grid">
        <div className="book-page-copy">
          <span className="eyebrow">Book of Wisdom University</span>
          <h1>WILL AI KILL US?</h1>
          <p className="lead">An illustrated guide to AI, humanoids, consciousness, autonomy, work, truth, power, safety, and humanity’s choices.</p>
          <p>The book asks a deeper question than “what will machines become?”: <strong>can humanity remain wise enough to govern the intelligence it is creating?</strong> It treats science fiction as a cultural laboratory, not prophecy; separates present capability from uncertain future scenarios; and gives readers practical boundaries for living with increasingly capable AI.</p>
          <ul className="check-list large"><li>67-page illustrated expanded edition</li><li>20 chapters</li><li>9 full-page visual teachings</li><li>Humanoid robots, agents, military AI and consciousness</li><li>24-page Human Sovereignty Workbook in the full package</li></ul>
          <a className="button button-gold button-large" href={site.productUrl} target="_blank" rel="noreferrer sponsored">View the book on GPTawake.com →</a>
        </div>
        <div className="book-gallery">
          <img className="book-main" src={site.productCover} width="550" height="550" alt="Cover of WILL AI KILL US? illustrated expanded edition" />
          <div className="book-preview-grid"><img src={site.productPreviewHumanoids} width="720" height="963" loading="lazy" alt="Interior preview about humanoid robots and embodied AI" /><img src={site.productPreviewCulture} width="720" height="963" loading="lazy" alt="Interior preview about AI warnings in popular culture" /></div>
        </div>
      </div>
    </section>
  );
}

function NotFoundPage() {
  return (
    <section className="section page-hero-space"><div className="container not-found"><span className="eyebrow">404</span><h1>This path is outside the map.</h1><p>The page does not exist. Use the guide library to return to a real, indexable route.</p><a className="button button-primary" href="/articles">Browse the guides →</a></div></section>
  );
}

export function App() {
  return (
    <Layout>
      <SeoClient />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="/articles/:slug" element={<ArticlePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/editorial-policy" element={<EditorialPolicyPage />} />
        <Route path="/glossary" element={<GlossaryPage />} />
        <Route path="/sources" element={<SourcesPage />} />
        <Route path="/book" element={<BookPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}
