import { useEffect, useMemo, useState } from 'react'

const sectionFlow = [
  { id: 'problem', title: 'The industrial data problem' },
  { id: 'substance', title: 'CODASOL substance' },
  { id: 'defensibility', title: 'Why CODASOL is difficult to copy' },
  { id: 'vision', title: 'CODA-AI vision' },
  { id: 'investment', title: 'Investment overview' },
  { id: 'structure', title: 'Group structure' },
  { id: 'team', title: 'Meet the Team' },
  { id: 'faq', title: 'FAQ' },
  { id: 'contact', title: 'Contact / request NDA deck' }
]

const teamMembers = [
  { name: 'Azmat Taufique', role: 'Chairman of the Board of Directors, Coda Group', shortBio: 'Global investment and infrastructure leader with 30+ years of experience across private equity, fund management, and cross-border investments.', fullBio: 'Azmat brings three decades of leadership in infrastructure and investment ecosystems, shaping institutional partnerships and long-horizon strategic growth initiatives.', linkedIn: 'https://www.linkedin.com/in/placeholder', photo: '' },
  { name: 'Philip Ng', role: 'Director and Member of the Board of Directors', shortBio: 'Singapore-based financial leader with 30+ years of experience across audit, finance, governance, and private equity.', fullBio: 'Philip contributes extensive board-level governance and finance discipline, with experience spanning audit controls, private equity evaluation, and enterprise financial stewardship.', linkedIn: 'https://www.linkedin.com/in/placeholder', photo: '' },
  { name: 'Naleem Bukari', role: 'Co-Founder, Managing Director, and Member of the Board of Directors', shortBio: 'Technical and business leader with deep expertise in asset management, material management, ISO 55001, inventory optimization, and master data management.', fullBio: 'Naleem has been central to translating industrial operational complexity into structured data intelligence models and scalable delivery practices.', linkedIn: 'https://www.linkedin.com/in/placeholder', photo: '' },
  { name: 'Michael J. Schlunegger', role: 'Chief Executive Officer (CEO)', shortBio: 'Swiss business leader with 30+ years of experience in business development, sales, and technology products across multiple regions.', fullBio: 'Michael leads commercial strategy and platform growth with a focus on converting CODASOL’s industrial track record into repeatable, global investor-grade expansion.', linkedIn: 'https://www.linkedin.com/in/placeholder', photo: '' },
  { name: 'Rizwan Nawab John', role: 'Co-Founder, Chief Operating Officer (COO), and Member of the Board of Directors', shortBio: 'Operational leader with strong experience in SAP materials management, procurement, vendor development, supply chain management, and project implementation.', fullBio: 'Rizwan oversees operational execution with a strong focus on disciplined project implementation and data-driven transformation in asset-heavy environments.', linkedIn: 'https://www.linkedin.com/in/placeholder', photo: '' },
  { name: 'Marwa Haddar', role: 'Strategic Advisory Board', shortBio: 'Corporate finance and restructuring advisor with experience across Asia, the Middle East, Africa, and infrastructure-related mandates.', fullBio: 'Marwa supports strategic advisory direction in finance and restructuring scenarios, helping align growth decisions with resilient capital frameworks.', linkedIn: 'https://www.linkedin.com/in/placeholder', photo: '' },
  { name: 'James P. Bond', role: 'Executive Advisory Council', shortBio: 'Global finance and infrastructure strategy expert with World Bank Group leadership experience and advisory roles across emerging markets.', fullBio: 'James provides macro-level infrastructure strategy insight, enabling CODASOL to position long-term industrial data value within evolving global investment priorities.', linkedIn: 'https://www.linkedin.com/in/placeholder', photo: '' }
]

const faqItems = [
  { q: 'What does CODASOL do?', a: 'CODASOL provides industrial data intelligence and Master Data Management solutions for asset-heavy industries.' },
  { q: 'What makes CODASOL different?', a: 'CODASOL combines 15+ years of industrial project experience with deep material, asset, supplier, and maintenance data knowledge.' },
  { q: 'What is CODA-AI?', a: 'CODA-AI is CODASOL’s planned vertical AI-MDM intelligence layer designed to improve, govern, and enrich industrial master data.' },
  { q: 'Why is funding being raised?', a: 'The fundraise supports an orderly shareholder payout and growth and transformation funding, including working capital and CODA-AI acceleration.' },
  { q: 'What happens after an investor is interested?', a: 'Qualified investors can request the next-stage investor deck under a suitable Non-Disclosure Agreement.' }
]

function App() {
  const [openFaq, setOpenFaq] = useState(0)
  const [selectedMember, setSelectedMember] = useState(null)
  const mailto = 'mailto:investor@codasol.com?subject=CODASOL%20Investor%20Deck%20Request'

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('in-view')
      })
    }, { threshold: 0.16 })

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const metrics = useMemo(() => [
    '15+ years industrial data experience',
    '100+ completed projects',
    'Exposure to 100M+ material master records',
    'Exposure to 20M+ asset records',
    'Exposure to 10M+ supplier, Bill of Materials, service, and operational records'
  ], [])

  return <div className="app">
    <div className="bg-grid" />
    <header className="hero" id="top">
      <div className="logo-top" aria-label="CODA logo placeholder">CODA</div>
      <div className="pill">Stage 1 Investor Introduction · Non-NDA</div>
      <h1>CODASOL converts 15+ years of industrial data knowledge into scalable AI-MDM intelligence.</h1>
      <p className="hero-sub">A premium investor teaser showcasing the transition from industrial MDM project depth to platform-driven, AI-enabled recurring value.</p>
      <div className="hero-actions">
        <a className="btn btn-primary" href="#investment">View Investment Summary</a>
        <a className="btn btn-secondary" href="#team">Meet the Team</a>
        <a className="btn btn-secondary" href={mailto}>Request NDA Deck</a>
      </div>
      <div className="story-row">{sectionFlow.map((s) => <a key={s.id} href={`#${s.id}`}>{s.title}</a>)}</div>
    </header>
    <main className="container">
      <section id="problem" className="reveal"><h2>The industrial data problem</h2><p>Poor industrial master data creates friction across procurement, maintenance, inventory, compliance, and AI readiness. CODASOL addresses these inefficiencies through structured, domain-native intelligence built in real operating environments.</p></section>
      <section id="substance" className="reveal"><h2>CODASOL substance</h2><div className="grid metrics">{metrics.map((m, i) => <article className="card metric" style={{ animationDelay: `${i * 80}ms` }} key={m}>{m}</article>)}</div><p className="note">Metrics reflect exposure to and processed records in customer environments and do not imply data ownership.</p></section>
      <section id="defensibility" className="reveal"><h2>Why CODASOL is difficult to copy</h2><div className="grid three">{['Industrial data logic learned over 15+ years', 'Vertical taxonomy and classification depth', 'Cross-system harmonization playbooks', 'Asset and material governance context', 'Supplier, service, and maintenance normalization', 'Execution maturity from 100+ projects'].map((it) => <article className="card" key={it}>{it}</article>)}</div></section>
      <section id="vision" className="reveal"><h2>CODA-AI vision</h2><p>CODA-AI is designed as an intelligence layer above current customer systems to improve classification, cleansing, enrichment, and governance, enabling scalable AI-MDM by industry.</p></section>
      <section id="investment" className="reveal"><h2>Investment overview</h2><div className="grid two"><article className="card fund"><h3>USD 3.9M</h3><p>Orderly shareholder payout for selected early shareholders whose investment horizon has been reached.</p></article><article className="card fund"><h3>USD 3.9M</h3><p>Growth and transformation funding, including working capital and CODA-AI acceleration.</p></article></div></section>
      <section id="structure" className="reveal"><h2>Group structure</h2><ul className="list"><li>CTS is the investment vehicle.</li><li>CODASOL Pte Ltd Singapore is the group holding company.</li><li>CODA Technology LLC UAE supports UAE / Middle East.</li><li>CODA US supports the US market.</li><li>CODASOL India is the delivery and execution platform.</li></ul></section>
      <section id="team" className="reveal"><div className="section-header"><h2>Leadership & Advisory Team</h2><a className="btn btn-secondary" href="#team">Meet the Team</a></div><div className="grid team-grid">{teamMembers.map((p) => <article className="team-card card" key={p.name}><div className="avatar">{p.photo ? <img src={p.photo} alt={p.name} /> : <span>{p.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}</span>}</div><h3>{p.name}</h3><p className="role">{p.role}</p><p>{p.shortBio}</p><div className="team-actions"><button className="btn btn-secondary" onClick={() => setSelectedMember(p)}>View Bio</button><a className="btn btn-primary" href={p.linkedIn} target="_blank" rel="noreferrer">LinkedIn</a></div></article>)}</div></section>
      <section id="faq" className="reveal"><h2>FAQ</h2><div className="faq">{faqItems.map((item, i) => <article className={`faq-item ${openFaq === i ? 'open' : ''}`} key={item.q}><button onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>{item.q}</button>{openFaq === i && <p>{item.a}</p>}</article>)}</div></section>
      <section id="contact" className="reveal"><h2>Contact / request NDA deck</h2><p>Qualified investors may request next-stage materials for review under a suitable Non-Disclosure Agreement.</p><div className="hero-actions"><a className="btn btn-primary" href={mailto}>Request NDA Deck</a><a className="btn btn-secondary" href={mailto}>Contact Investor Team</a></div></section>
    </main>
    <a className="sticky-cta" href={mailto}>Request NDA Deck</a>

    {selectedMember && <div className="modal-backdrop" onClick={() => setSelectedMember(null)}><div className="modal" onClick={(e) => e.stopPropagation()}><h3>{selectedMember.name}</h3><p className="role">{selectedMember.role}</p><p>{selectedMember.fullBio}</p><div className="team-actions"><a className="btn btn-primary" href={selectedMember.linkedIn} target="_blank" rel="noreferrer">LinkedIn</a><button className="btn btn-secondary" onClick={() => setSelectedMember(null)}>Close</button></div></div></div>}
  </div>
}

export default App
