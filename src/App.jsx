import { useState } from 'react'

const faqItems = [
  {
    q: 'What does CODASOL do?',
    a: 'CODASOL provides industrial data intelligence and Master Data Management solutions for asset-heavy industries.'
  },
  {
    q: 'What makes CODASOL different?',
    a: 'CODASOL combines 15+ years of real industrial project experience with deep material, asset, supplier, and maintenance data knowledge.'
  },
  {
    q: 'What is CODA-AI?',
    a: 'CODA-AI is CODASOL’s planned vertical AI-MDM intelligence layer designed to improve, govern, and enrich industrial master data.'
  },
  {
    q: 'Why is funding being raised?',
    a: 'The fundraise supports an orderly shareholder payout and growth and transformation funding, including working capital and CODA-AI acceleration.'
  },
  {
    q: 'Why are early shareholders being paid out?',
    a: 'Selected early shareholders have reached their investment horizon and portfolio cycle completed milestone.'
  },
  {
    q: 'What happens after an investor is interested?',
    a: 'Qualified investors can request the next-stage investor deck under a suitable Non-Disclosure Agreement.'
  }
]

function App() {
  const [openFaq, setOpenFaq] = useState(0)
  const mailto = 'mailto:investor@codasol.com?subject=CODASOL%20Investor%20Deck%20Request'

  return (
    <div className="app">
      <header className="hero" id="top">
        <div className="hero-glow" />
        <div className="pill">Stage 1 Investor Introduction | Non-NDA</div>
        <div className="wordmark">CODASOL</div>
        <p className="wordmark-sub">Industrial Data Intelligence</p>
        <h1>CODASOL converts 15+ years of industrial data knowledge into scalable AI-MDM intelligence.</h1>
        <p className="hero-sub">An industrial data intelligence company moving from project-based Master Data Management services toward vertical AI-powered recurring revenue.</p>
        <div className="hero-actions">
          <a className="btn btn-primary" href="#investment">View Investment Summary</a>
          <a className="btn btn-secondary" href={mailto}>Request NDA Deck</a>
        </div>
        <p className="version">Investor Teaser Webapp v1.0 | Stage 1 | Non-NDA Information</p>
      </header>

      <main className="container">
        <section>
          <h2>Poor Industrial Master Data Creates Real Business Losses</h2>
          <p>Industrial companies depend on accurate material, asset, supplier, service, and maintenance data. When this data is incomplete, duplicated, wrongly classified, or inconsistent across systems, companies lose efficiency across procurement, maintenance, inventory, operations, finance, compliance, and Artificial Intelligence readiness.</p>
          <div className="grid three">
            {['Duplicate materials', 'Poor asset visibility', 'Procurement inefficiency', 'Inventory waste', 'Weak AI readiness', 'Compliance risk'].map((item) => <article className="card" key={item}>{item}</article>)}
          </div>
        </section>

        <section>
          <h2>Built from Real Industrial Complexity</h2>
          <p>CODASOL’s value is not only software. The real substance comes from years of work inside real industrial environments, with real asset, material, supplier, and maintenance data.</p>
          <div className="grid metrics">
            {['15+ years industrial data experience', '100+ completed projects', '100M+ material master records exposure', '20M+ asset records exposure', '10M+ supplier, Bill of Materials, service, and operational records exposure'].map((item) => <article className="card metric" key={item}>{item}</article>)}
          </div>
          <p className="note">Metrics reflect exposure to and processed records in customer environments and do not imply data ownership.</p>
        </section>

        <section>
          <h2>From Services to Vertical AI-MDM</h2>
          <p>CODA-AI is intended to convert CODASOL’s industrial data knowledge into a scalable Artificial Intelligence Master Data Management layer. It is designed to sit above existing customer systems such as SAP, Oracle, IBM, Microsoft systems, legacy databases, and spreadsheets.</p>
          <div className="grid two">
            {['Does not replace existing systems', 'Adds intelligence above them', 'Supports classification, cleansing, enrichment, and governance', 'Builds toward verticalized AI-MDM by industry'].map((item) => <article className="card" key={item}>{item}</article>)}
          </div>
          <p className="note">Artificial Intelligence Master Data Management (AI-MDM) means using AI to improve, govern, enrich, and continuously strengthen industrial master data.</p>
        </section>

        <section>
          <h2>Software Can Be Built. Industrial Data Knowledge Takes Years.</h2>
          <p>A competitor can build software, but it cannot quickly replicate CODASOL’s years of industrial project learning, data logic, terminology knowledge, and vertical experience.</p>
          <div className="grid three">
            {['15+ years of project learning', 'Industrial terminology knowledge', 'Golden record logic', 'Supplier and material normalization', 'Asset and maintenance context', 'Verticalization by industry', 'Real customer environment exposure'].map((item) => <article className="card" key={item}>{item}</article>)}
          </div>
        </section>

        <section id="investment">
          <h2>Stage 1 Investment Overview</h2>
          <p>CODASOL is preparing a funding round of approximately USD 7.8 million through CODA Technologies Pte Ltd, Singapore / CTS, the investment vehicle. The round is intended to support shareholder restructuring and CODASOL’s next phase of growth.</p>
          <div className="grid two">
            <article className="card fund"><h3>USD 3.9M</h3><p>Orderly shareholder payout for selected early shareholders whose investment horizon has been reached.</p></article>
            <article className="card fund"><h3>USD 3.9M</h3><p>Growth and transformation funding, including working capital and CODA-AI acceleration.</p></article>
          </div>
          <p className="note">Detailed investment terms, share structure, and financial information are shared only with qualified investors under a suitable Non-Disclosure Agreement.</p>
        </section>

        <section>
          <h2>Simple Group Structure</h2>
          <div className="chain">
            <span>Investor</span><span>→</span><span>CTS</span><span>→</span><span>CODASOL Pte Ltd Singapore</span><span>→</span><span>Operating Companies</span>
          </div>
          <ul className="list">
            <li>CODASOL Pte Ltd, Singapore is the group holding company.</li>
            <li>CODA Technologies Pte Ltd / CTS is the investment vehicle.</li>
            <li>CODA Technology LLC, UAE supports UAE / Middle East growth and operations.</li>
            <li>CODA US supports the US market.</li>
            <li>CODASOL India is the delivery and execution platform.</li>
          </ul>
          <p className="note">Investor ownership through CTS represents indirect ownership in the CODASOL group.</p>
        </section>

        <section>
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

        <section>
          <h2>Request Next-Stage Investor Access</h2>
          <p>Qualified investors may request the NDA investor deck and further discussion with the CODASOL investor taskforce.</p>
          <div className="hero-actions">
            <a className="btn btn-primary" href={mailto}>Request NDA Deck</a>
            <a className="btn btn-secondary" href={mailto}>Contact Investor Taskforce</a>
          </div>
          <p className="contact">investor@codasol.com</p>
        </section>
      </main>

      <a className="sticky-cta" href={mailto}>Request NDA Deck</a>

      <footer>
        This material is provided for introductory discussion purposes only. It does not constitute an offer, solicitation, or investment recommendation in any jurisdiction. Any investment discussion is subject to further due diligence, legal documentation, and applicable regulatory requirements. Detailed information will only be shared with qualified parties under a suitable Non-Disclosure Agreement.
      </footer>
    </div>
  )
}

export default App
