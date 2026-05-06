import { useEffect, useMemo, useState } from 'react'

const mailto = 'mailto:investor@codasol.com?subject=CODASOL%20Investor%20Deck%20Request'

const metricsData = [
  { label: 'Years of industrial data experience', value: '15+' },
  { label: 'Completed projects', value: '100+' },
  { label: 'Material master records exposure', value: '100M+' },
  { label: 'Asset records exposure', value: '20M+' },
  { label: 'Supplier, Bill of Materials, service, and operational records exposure', value: '10M+' }
]

const faqData = [
  {
    q: 'What is this portal?',
    a: 'A Stage 1 non-NDA investor introduction to CODASOL, its industrial data foundation, CODA-AI direction, indicative investment structure, and next-step process.'
  },
  {
    q: 'Does 1% in CTS mean 1% in CODASOL Group?',
    a: 'No. Ownership through CTS is indirect. Any result shown by the calculator is indicative only and subject to final legal and financial documentation.'
  },
  {
    q: 'Are calculator results binding?',
    a: 'No. Results are indicative only, non-binding, and subject to final documentation, diligence, valuation, allocation, legal review, and transaction terms.'
  },
  {
    q: 'How can investors receive more information?',
    a: 'Qualified investors can request the NDA deck using the contact link. Detailed financial, legal, technical, and commercial materials are reserved for the NDA stage.'
  }
]

const teamData = [
  {
    name: 'Azmat Taufique',
    role: 'Chairman of the Board of Directors, Coda Group',
    shortBio: 'Global investment and infrastructure leader with 30+ years of experience across private equity, fund management, infrastructure, and cross-border investments.',
    longBio: 'Azmat Taufique brings senior-level investment, governance, and cross-border transaction experience to CODA. His background includes private equity, infrastructure investment, capital structuring, and strategic advisory across international markets. Within the CODA investor story, his role strengthens governance, investor confidence, and capital market readiness.',
    profileUrl: 'https://www.blue-monsoon-capital.com/azmat-taufique/',
    profileLabel: 'Profile'
  },
  {
    name: 'Philip Ng',
    role: 'Director and Member of the Board of Directors',
    shortBio: 'Singapore-based financial leader with 30+ years of experience across audit, finance, governance, and private equity.',
    longBio: 'Philip Ng supports CODA with deep financial, governance, and corporate oversight experience. His background across audit, finance, and private equity strengthens the group’s investor readiness, reporting discipline, and corporate governance foundation.',
    profileUrl: '',
    profileLabel: 'Link to be added'
  },
  {
    name: 'Naleem Bukari',
    role: 'Co-Founder, Managing Director, and Member of the Board of Directors',
    shortBio: 'Technical and business leader with deep expertise in asset management, material management, ISO 55001, inventory optimization, and master data management.',
    longBio: 'Naleem Bukari is one of the driving forces behind CODA’s industrial data and asset management foundation. His experience covers asset management, materials management, ISO 55001, inventory optimization, master data management, and industrial data delivery. He brings the domain knowledge and operational understanding that form the foundation for CODA’s vertical AI-MDM direction.',
    profileUrl: 'https://www.linkedin.com/in/naleem-bukari-66b10323/',
    profileLabel: 'LinkedIn'
  },
  {
    name: 'Michael J. Schlunegger',
    role: 'Chief Executive Officer (CEO)',
    shortBio: 'Swiss business leader with 30+ years of experience in business development, sales, and technology products across multiple regions.',
    longBio: 'Michael J. Schlunegger brings international business development, sales leadership, technology commercialization, and strategic growth experience to CODA. His background combines engineering, business leadership, and market expansion across multiple regions. His role is focused on shaping CODA’s investor story, commercial growth, product positioning, and transition toward scalable AI-driven business models.',
    profileUrl: 'https://www.linkedin.com/in/michael-j-schlunegger-2b475882/',
    profileLabel: 'LinkedIn'
  },
  {
    name: 'Rizwan Nawab',
    role: 'Co-Founder, Chief Operating Officer (COO), and Member of the Board of Directors',
    shortBio: 'Operational leader with strong experience in SAP materials management, procurement, vendor development, supply chain management, and project implementation.',
    longBio: 'Rizwan Nawab supports CODA through strong operational, SAP materials management, procurement, vendor development, supply chain, and project implementation experience. His role is important in connecting CODA’s industrial data expertise with delivery execution and operational discipline.',
    profileUrl: 'https://www.linkedin.com/in/rizwan-nawab-aa336421/',
    profileLabel: 'LinkedIn'
  },
  {
    name: 'Marwa Haddar',
    role: 'Strategic Advisory Board',
    shortBio: 'Corporate finance and restructuring advisor with experience across Asia, the Middle East, Africa, and infrastructure-related mandates.',
    longBio: 'Marwa Haddar supports CODA with corporate finance, restructuring, transaction, and strategic advisory experience. Her background across Asia, the Middle East, Africa, and infrastructure-related mandates helps strengthen CODA’s investor communication, transaction readiness, and disciplined fundraising approach.',
    profileUrl: 'https://www.linkedin.com/in/marwa-haddar-67787a92/',
    profileLabel: 'LinkedIn'
  },
  {
    name: 'James P. Bond',
    role: 'Executive Advisory Council',
    shortBio: 'Global finance and infrastructure strategy expert with World Bank Group leadership experience and advisory roles across emerging markets.',
    longBio: 'James P. Bond brings global finance, infrastructure strategy, and emerging-market advisory experience. His background includes senior international development and finance leadership, supporting CODA’s broader strategic positioning, governance credibility, and growth ambitions.',
    profileUrl: 'https://www.blue-monsoon-capital.com/james-p-bond/',
    profileLabel: 'Profile'
  }
]

const defaultAssumptions = {
  preMoney: 10000000,
  ctsOwnership: 23.46
}

function toFiniteNumber(value, defaultValue = 0) {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : defaultValue
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

function ProfileAction({ person }) {
  if (!person.profileUrl) {
    return <span className='btn btn-disabled' aria-disabled='true'>{person.profileLabel}</span>
  }

  return (
    <a className='btn btn-primary' href={person.profileUrl} target='_blank' rel='noopener noreferrer'>
      {person.profileLabel}
    </a>
  )
}

function TeamCard({ person }) {
  const initials = person.name
    .split(' ')
    .filter(Boolean)
    .map((namePart) => namePart[0])
    .slice(0, 2)
    .join('')

  return (
    <article className='team-card'>
      <div className='team-avatar' aria-hidden='true'>{initials}</div>
      <div className='team-card-copy'>
        <h3>{person.name}</h3>
        <p className='team-role'>{person.role}</p>
        <p className='team-short-bio'>{person.shortBio}</p>
      </div>
      <div className='team-actions'>
        <details className='bio-details'>
          <summary className='btn btn-secondary'>View Bio</summary>
          <p>{person.longBio}</p>
        </details>
        <ProfileAction person={person} />
      </div>
    </article>
  )
}

function OwnershipCalculator() {
  const [ctsPercent, setCtsPercent] = useState(1)
  const [investment, setInvestment] = useState(1000000)
  const [preMoney, setPreMoney] = useState(defaultAssumptions.preMoney)
  const [ctsOwnership, setCtsOwnership] = useState(defaultAssumptions.ctsOwnership)

  const result = useMemo(() => {
    try {
      const safePercent = clamp(toFiniteNumber(ctsPercent), 0, 100)
      const safeInvestment = Math.max(0, toFiniteNumber(investment))
      const safePreMoney = Math.max(1, toFiniteNumber(preMoney, defaultAssumptions.preMoney))
      const safeCtsOwnership = clamp(toFiniteNumber(ctsOwnership, defaultAssumptions.ctsOwnership), 0, 100)
      const directCtsLookThrough = (safePercent / 100) * (safeCtsOwnership / 100) * 100
      const newMoneyLookThrough = (safeInvestment / (safePreMoney + safeInvestment)) * (safeCtsOwnership / 100) * 100

      return {
        directCtsLookThrough,
        newMoneyLookThrough
      }
    } catch {
      return {
        directCtsLookThrough: 0,
        newMoneyLookThrough: 0
      }
    }
  }, [ctsPercent, investment, preMoney, ctsOwnership])

  return (
    <section id='calculator'>
      <h2>Indicative Ownership Calculator</h2>
      <p className='calculation-label'>Indicative only | Non-binding | Subject to final documentation</p>
      <div className='grid two calculator-grid'>
        <label className='field-card'>
          <span>CTS ownership in CODASOL (%)</span>
          <input type='number' min='0' max='100' step='0.01' value={ctsOwnership} onChange={(event) => setCtsOwnership(event.target.value)} />
        </label>
        <label className='field-card'>
          <span>CTS pre-money valuation (USD)</span>
          <input type='number' min='1' step='100000' value={preMoney} onChange={(event) => setPreMoney(event.target.value)} />
        </label>
        <label className='field-card'>
          <span>Investor ownership in CTS (%)</span>
          <input type='number' min='0' max='100' step='0.01' value={ctsPercent} onChange={(event) => setCtsPercent(event.target.value)} />
        </label>
        <label className='field-card'>
          <span>Indicative new investment amount (USD)</span>
          <input type='number' min='0' step='50000' value={investment} onChange={(event) => setInvestment(event.target.value)} />
        </label>
      </div>
      <div className='grid two'>
        <article className='card result-card'>
          <h3>{result.directCtsLookThrough.toFixed(4)}%</h3>
          <p>Indicative indirect CODASOL ownership based on entered CTS percentage.</p>
        </article>
        <article className='card result-card'>
          <h3>{result.newMoneyLookThrough.toFixed(4)}%</h3>
          <p>Indicative indirect CODASOL ownership based on entered investment amount.</p>
        </article>
      </div>
    </section>
  )
}

export default function App() {
  useEffect(() => {
    document.documentElement.classList.add('react-mounted')
    return () => document.documentElement.classList.remove('react-mounted')
  }, [])

  return (
    <div className='app'>
      <div className='bg-grid' />
      <header className='hero'>
        <div className='logo-top'>CODA</div>
        <p className='pill'>Stage 1 Investor Introduction · Non-NDA</p>
        <h1>CODASOL Investor Introduction Portal</h1>
        <p className='hero-sub'>CODASOL converts 15+ years of industrial data knowledge into scalable AI-MDM intelligence for asset-intensive enterprises.</p>
        <div className='hero-actions'>
          <a className='btn btn-primary' href='#investment'>View Investment Overview</a>
          <a className='btn btn-secondary' href='#team'>Meet the Team</a>
          <a className='btn btn-secondary' href='#calculator'>Ownership Calculator</a>
          <a className='btn btn-secondary' href={mailto}>Request NDA Deck</a>
        </div>
      </header>

      <main className='container'>
        <section id='problem'>
          <h2>The Problem</h2>
          <p>Poor industrial master data creates procurement, maintenance, inventory, compliance, operational, and AI-readiness issues. Enterprises need domain-specific data intelligence before automation and AI can deliver reliable outcomes.</p>
        </section>

        <section id='substance'>
          <h2>CODASOL Substance</h2>
          <div className='grid metrics'>
            {metricsData.map((metric) => (
              <article className='card' key={metric.label}>
                <h3>{metric.value}</h3>
                <p>{metric.label}</p>
              </article>
            ))}
          </div>
          <p className='note'>Metrics reflect exposure to and processed industrial records only.</p>
        </section>

        <section id='vision'>
          <h2>CODA-AI Vision</h2>
          <p>CODA-AI is intended to transform CODASOL domain knowledge into repeatable software-enabled intelligence for classification, enrichment, governance, deduplication, asset data quality, and MDM decision support.</p>
          <div className='grid three'>
            <article className='card'><h3>Vertical AI-MDM</h3><p>Purpose-built for complex industrial materials, assets, suppliers, service data, and operational master data.</p></article>
            <article className='card'><h3>Repeatable Intelligence</h3><p>Codified methods can support scalable delivery, recurring revenue potential, and faster customer value creation.</p></article>
            <article className='card'><h3>Data Foundation</h3><p>Cleaner industrial data supports ERP modernization, procurement optimization, maintenance planning, and future AI readiness.</p></article>
          </div>
        </section>

        <section id='investment'>
          <h2>Investment Overview</h2>
          <div className='grid two'>
            <article className='card fund'>
              <h3>USD 3.9M</h3>
              <p>Orderly shareholder payout for selected early shareholders whose investment horizon has been reached.</p>
            </article>
            <article className='card fund'>
              <h3>USD 3.9M</h3>
              <p>Growth and transformation funding, including working capital and CODA-AI acceleration.</p>
            </article>
          </div>
          <p className='note'>This is teaser-level information only and is not an offer, commitment, or recommendation.</p>
        </section>

        <section id='structure'>
          <h2>Group Structure</h2>
          <p>The investor pathway is presented through CTS and its indirect relationship to CODASOL Group. Final structure, ownership, allocation, documentation, and legal terms remain subject to diligence and final documentation.</p>
        </section>

        <OwnershipCalculator />

        <section className='team-section' id='team'>
          <div className='team-heading'>
            <p className='pill'>Stage 1 investor teaser</p>
            <h2>Meet the Team</h2>
            <p className='team-intro'>CODASOL combines industrial data expertise, governance experience, operational delivery capability, and strategic investor readiness.</p>
          </div>
          <div className='team-grid' aria-label='Leadership and advisory team members'>
            {teamData.map((person) => <TeamCard person={person} key={person.name} />)}
          </div>
        </section>

        <section id='faq'>
          <h2>FAQ</h2>
          {faqData.map((faq, index) => (
            <details className='faq-item' key={faq.q} open={index === 0}>
              <summary>{faq.q}</summary>
              <p>{faq.a}</p>
            </details>
          ))}
        </section>

        <section id='contact'>
          <h2>Contact / Request NDA Deck</h2>
          <p>Qualified investors may request the NDA deck and next-step materials after introductory review.</p>
          <a className='btn btn-primary' href={mailto}>Request NDA Deck</a>
        </section>

        <section id='disclaimer'>
          <h2>Disclaimer</h2>
          <p>This portal is Stage 1 non-NDA investor teaser content only. It is provided for introductory discussion purposes and does not constitute an offer to sell securities, a solicitation, investment advice, or a binding commitment. All figures, ownership outputs, transaction structures, and forward-looking statements are indicative only, non-binding, and subject to diligence, final legal documentation, and investor qualification.</p>
        </section>
      </main>

      <a className='sticky-cta' href={mailto}>Request NDA Deck</a>
    </div>
  )
}
