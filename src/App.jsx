import { useState } from 'react'

const storySteps = [
  'Industrial data complexity',
  'CODASOL substance',
  'Defensible moat',
  'Vertical CODA-AI direction',
  'Structured group model',
  'Investment and growth phase'
]

const problemSignals = [
  'Material and asset duplication',
  'Inconsistent supplier intelligence',
  'Low master-data trust across operations',
  'Delayed maintenance and procurement cycles',
  'Weak AI-readiness due to data quality gaps',
  'Governance and compliance friction'
]

const substanceHighlights = [
  '15+ years of industrial data delivery context',
  '100+ completed engagements across asset-heavy environments',
  'Deep exposure to material, asset, supplier, and maintenance data',
  'Practical governance and enrichment patterns that scale'
]

const moatPillars = [
  'Industrial terminology depth',
  'Golden-record logic tuned for industrial operations',
  'Structured data foundations before AI acceleration',
  'Vertical segmentation strategy by domain and industry'
]

const investmentTiles = [
  {
    title: 'Orderly shareholder payout',
    text: 'For selected early shareholders whose investment horizon and portfolio cycle have been completed.'
  },
  {
    title: 'Growth and transformation funding',
    text: 'To support working capital and accelerate CODA-AI platformization and recurring-value evolution.'
  }
]

const faqItems = [
  {
    q: 'What does CODASOL focus on?',
    a: 'CODASOL focuses on industrial data intelligence, master data management, and AI-guided data quality for asset-heavy sectors.'
  },
  {
    q: 'Is this a public teaser or a full investor deck?',
    a: 'This is a Stage 1 non-NDA teaser. Additional details are shared only in later qualified discussions.'
  },
  {
    q: 'What is CODA-AI in this context?',
    a: 'CODA-AI is the next-phase vertical intelligence direction built on structured industrial data foundations, governance, and domain logic.'
  },
  {
    q: 'What is the transition story?',
    a: 'The business is evolving from project-heavy delivery toward more scalable, recurring, and higher-value intelligence offerings.'
  }
]

function App() {
  const [openFaq, setOpenFaq] = useState(0)
  const mailto = 'mailto:investor@codasol.com?subject=CODASOL%20Investor%20Teaser%20Follow%20Up'

  return (
    <div className="page">
      <div className="ambient ambient-a" aria-hidden="true" />
      <div className="ambient ambient-b" aria-hidden="true" />

      <header className="topbar">
        <a href="#top" className="brand-text">CODASOL</a>
        <div className="logo-chip" aria-label="CODA logo">CODA</div>
      </header>

      <main id="top">
        <section className="hero reveal">
          <p className="eyebrow">Stage 1 Investor Introduction · Non-NDA</p>
          <h1>Industrial data intelligence, reimagined for the AI era.</h1>
          <p className="hero-copy">
            CODASOL combines industrial master data depth and structured intelligence to unlock a verticalized CODA-AI growth trajectory for asset-heavy industries.
          </p>
          <div className="hero-cta">
            <a className="btn btn-primary" href="#investment">Explore Growth Story</a>
            <a className="btn btn-ghost" href={mailto}>Request Next-Stage Access</a>
          </div>
          <div className="story-rail" aria-label="Investor story progression">
            {storySteps.map((step, idx) => (
              <span key={step} style={{ animationDelay: `${idx * 120}ms` }}>{step}</span>
            ))}
          </div>
        </section>

        <section className="chapter reveal">
          <h2>The Industrial Problem</h2>
          <p>When core data is fragmented, every downstream function loses speed, confidence, and decision quality.</p>
          <div className="card-grid three">
            {problemSignals.map((item) => <article className="glass-card" key={item}>{item}</article>)}
          </div>
        </section>

        <section className="chapter reveal">
          <h2>Why CODASOL Has Substance</h2>
          <p>CODASOL is built from real project context, domain understanding, and industrial data execution discipline.</p>
          <div className="card-grid two">
            {substanceHighlights.map((item) => <article className="glass-card stat" key={item}>{item}</article>)}
          </div>
        </section>

        <section className="chapter reveal">
          <h2>Why CODASOL Is Difficult to Copy</h2>
          <p>The moat is not generic software. It is accumulated industrial knowledge, structured data logic, and vertical strategy.</p>
          <div className="card-grid two">
            {moatPillars.map((item) => <article className="glass-card" key={item}>{item}</article>)}
          </div>
        </section>

        <section className="chapter reveal">
          <h2>CODA-AI Vision</h2>
          <p>
            CODA-AI is positioned as a vertical intelligence layer above existing enterprise systems — designed to improve classification,
            enrichment, governance, and recurring data confidence over time.
          </p>
          <div className="timeline">
            <div><strong>Today:</strong> Project and domain execution depth</div>
            <div><strong>Now:</strong> Structured reusable industrial data foundations</div>
            <div><strong>Next:</strong> Verticalized CODA-AI intelligence by segment</div>
          </div>
        </section>

        <section className="chapter reveal">
          <h2>Group Structure at a Glance</h2>
          <p>A simplified structure aligned for the next stage of scale.</p>
          <div className="group-map">
            <article className="node core">CODASOL PTE LTD<br />Singapore · Main Group Layer</article>
            <article className="node">CODA Technology LLC<br />UAE</article>
            <article className="node">CODA US<br />US Market Responsibility</article>
            <article className="node">CODA India<br />Profit Centre</article>
          </div>
        </section>

        <section className="chapter reveal" id="investment">
          <h2>Investment & Growth Story</h2>
          <p>Positioned as a balanced transition: orderly shareholder outcomes and forward growth acceleration.</p>
          <div className="card-grid two">
            {investmentTiles.map((tile) => (
              <article className="glass-card fund" key={tile.title}>
                <h3>{tile.title}</h3>
                <p>{tile.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="chapter reveal">
          <h2>FAQ</h2>
          <div className="faq">
            {faqItems.map((item, i) => (
              <article className={`faq-item ${openFaq === i ? 'open' : ''}`} key={item.q}>
                <button onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>{item.q}</button>
                {openFaq === i && <p>{item.a}</p>}
              </article>
            ))}
          </div>
        </section>

        <section className="chapter reveal cta-panel">
          <h2>Next Step</h2>
          <p>Qualified investors may request next-stage materials and follow-up discussions with the CODASOL investor team.</p>
          <div className="hero-cta">
            <a className="btn btn-primary" href={mailto}>Request Next-Stage Access</a>
            <a className="btn btn-ghost" href={mailto}>Contact investor@codasol.com</a>
          </div>
        </section>
      </main>

      <a className="sticky-mobile-cta" href={mailto}>Request Investor Access</a>

      <footer>
        This material is provided for introductory discussion purposes only. It does not constitute an offer, solicitation, or investment recommendation. Any engagement remains subject to due diligence, legal documentation, and applicable regulatory requirements.
      </footer>
    </div>
  )
}

export default App
