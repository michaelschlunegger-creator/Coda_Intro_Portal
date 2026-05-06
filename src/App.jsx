import { useEffect, useMemo, useState } from 'react'

const mailto = 'mailto:investor@codasol.com?subject=CODASOL%20Investor%20Deck%20Request'


function scrollToPortalTop() {
  if (window.location.hash) {
    return
  }

  const previousScrollBehavior = document.documentElement.style.scrollBehavior
  document.documentElement.style.scrollBehavior = 'auto'
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  document.documentElement.style.scrollBehavior = previousScrollBehavior
}

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
  investment: 125000,
  preMoney: 10000000,
  ctsOwnership: 23.46
}

const groupImageSrc = `${import.meta.env.BASE_URL}Group.png`

function toFiniteNumber(value, defaultValue = 0) {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : defaultValue
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

function formatUsd(value) {
  const safeValue = Math.max(0, toFiniteNumber(value))
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(safeValue)
}

function formatPercent(value, digits = 4) {
  const safeValue = Number.isFinite(value) ? value : 0
  return `${safeValue.toFixed(digits)}%`
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

function GroupStructure() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [imageStatus, setImageStatus] = useState('checking')

  useEffect(() => {
    let isActive = true
    const image = new Image()

    image.onload = () => {
      if (isActive) {
        setImageStatus('available')
      }
    }

    image.onerror = () => {
      if (isActive) {
        setImageStatus('missing')
      }
    }

    image.src = groupImageSrc

    return () => {
      isActive = false
    }
  }, [])

  useEffect(() => {
    if (!isModalOpen) {
      return undefined
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsModalOpen(false)
      }
    }

    document.body.classList.add('modal-open')
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.classList.remove('modal-open')
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isModalOpen])

  const imageAvailable = imageStatus === 'available'

  return (
    <section id='structure'>
      <h2>Group Structure</h2>
      <p>The investor pathway is presented through CTS and its indirect relationship to CODASOL Group. Final structure, ownership, allocation, documentation, and legal terms remain subject to diligence and final documentation.</p>
      <div className='structure-actions'>
        {imageAvailable ? (
          <>
            <button className='btn btn-primary' type='button' onClick={() => setIsModalOpen(true)}>View Group Structure</button>
            <a className='btn btn-secondary' href={groupImageSrc} target='_blank' rel='noopener noreferrer'>Open image</a>
          </>
        ) : imageStatus === 'checking' ? (
          <span className='btn btn-disabled' aria-disabled='true'>Checking group structure image…</span>
        ) : (
          <span className='btn btn-disabled' aria-disabled='true'>Group structure image to be added.</span>
        )}
      </div>

      {isModalOpen && imageAvailable ? (
        <div className='modal-backdrop' role='presentation' onClick={() => setIsModalOpen(false)}>
          <div className='modal-card' role='dialog' aria-modal='true' aria-labelledby='group-structure-title' onClick={(event) => event.stopPropagation()}>
            <div className='modal-header'>
              <h3 id='group-structure-title'>Group Structure</h3>
              <button className='modal-close' type='button' aria-label='Close group structure image' onClick={() => setIsModalOpen(false)}>×</button>
            </div>
            <img className='group-structure-image' src={groupImageSrc} alt='CODASOL group structure diagram' />
          </div>
        </div>
      ) : null}
    </section>
  )
}

function OwnershipCalculator() {
  const [investment, setInvestment] = useState(String(defaultAssumptions.investment))
  const [preMoney, setPreMoney] = useState(String(defaultAssumptions.preMoney))
  const [ctsOwnership, setCtsOwnership] = useState(String(defaultAssumptions.ctsOwnership))

  const result = useMemo(() => {
    const investmentAmount = Math.max(0, toFiniteNumber(investment))
    const ctsPreMoneyValuation = Math.max(0, toFiniteNumber(preMoney, defaultAssumptions.preMoney))
    const ctsOwnershipPercent = clamp(toFiniteNumber(ctsOwnership, defaultAssumptions.ctsOwnership), 0, 100)
    const denominator = ctsPreMoneyValuation + investmentAmount
    const investorOwnershipInCts = denominator > 0 ? investmentAmount / denominator : 0
    const indirectOwnership = investorOwnershipInCts * (ctsOwnershipPercent / 100)

    return {
      investmentAmount,
      investorOwnershipInCtsPercent: investorOwnershipInCts * 100,
      indirectOwnershipPercent: indirectOwnership * 100,
      ctsOwnershipPercent
    }
  }, [investment, preMoney, ctsOwnership])

  const hasInvestmentValue = investment !== '' && result.investmentAmount > 0

  return (
    <section id='calculator' className='calculator-section'>
      <div className='calculator-heading'>
        <h2>Indicative Ownership Calculator</h2>
        <p className='calculation-label'>Indicative only | Non-binding | Subject to final documentation</p>
        <p>Enter a potential USD investment amount to estimate indicative indirect ownership of the full CODASOL group through CTS.</p>
      </div>

      <div className='calculator-shell'>
        <label className='field-card investment-field'>
          <span>Investment amount in USD</span>
          <input
            type='number'
            min='10000'
            step='5000'
            inputMode='decimal'
            value={investment}
            placeholder='Enter investment amount'
            onChange={(event) => setInvestment(event.target.value)}
          />
          <small>{hasInvestmentValue ? `Using ${formatUsd(result.investmentAmount)} for this indication.` : 'Enter an amount to calculate an indicative ownership result.'}</small>
        </label>

        <details className='assumptions-drawer'>
          <summary>Advanced assumptions</summary>
          <div className='grid two calculator-grid'>
            <label className='field-card'>
              <span>CTS pre-money valuation</span>
              <input type='number' min='0' step='100000' inputMode='decimal' value={preMoney} onChange={(event) => setPreMoney(event.target.value)} />
            </label>
            <label className='field-card'>
              <span>CTS ownership in CODASOL Pte Ltd (%)</span>
              <input type='number' min='0' max='100' step='0.01' inputMode='decimal' value={ctsOwnership} onChange={(event) => setCtsOwnership(event.target.value)} />
            </label>
          </div>
        </details>

        <article className='result-card result-card-large'>
          <p className='result-eyebrow'>Indicative CODASOL Group Ownership</p>
          <h3>{formatPercent(result.indirectOwnershipPercent)}</h3>
          <p>{hasInvestmentValue ? 'Based on the current inputs and assumptions.' : 'Enter an investment amount to view an indicative result.'}</p>
        </article>

        <div className='grid three output-grid'>
          <article className='card output-card'>
            <span>Investment Amount</span>
            <strong>{formatUsd(result.investmentAmount)}</strong>
          </article>
          <article className='card output-card'>
            <span>Indicative ownership in CTS</span>
            <strong>{formatPercent(result.investorOwnershipInCtsPercent)}</strong>
          </article>
          <article className='card output-card'>
            <span>Indicative indirect ownership in CODASOL Group</span>
            <strong>{formatPercent(result.indirectOwnershipPercent)}</strong>
          </article>
        </div>

        <div className='calculator-explanation'>
          <p>Because CTS owns a minority interest in CODASOL Pte Ltd, ownership through CTS represents indirect ownership in the CODASOL group.</p>
          <p>Example: 1.00% ownership in CTS = {formatPercent(result.ctsOwnershipPercent * 0.01)} indirect ownership in CODASOL Group.</p>
          <p className='legal-note'>This calculator is for indicative understanding only. Final ownership, share price, valuation, rights, allocation, and investment terms are subject to final legal and financial documentation.</p>
        </div>
      </div>
    </section>
  )
}

export default function App() {
  const [logoLoadError, setLogoLoadError] = useState(false)

  useEffect(() => {
    document.documentElement.classList.add('react-mounted')

    const animationFrameId = window.requestAnimationFrame(() => {
      scrollToPortalTop()
      window.setTimeout(scrollToPortalTop, 0)
    })

    return () => {
      window.cancelAnimationFrame(animationFrameId)
      document.documentElement.classList.remove('react-mounted')
    }
  }, [])

  return (
    <div className='app'>
      <div className='bg-grid' />
      <header className='hero'>
        <div className='logo-top'>
          {logoLoadError ? (
            <span className='logo-fallback'>CODA</span>
          ) : (
            <img
              className='coda-logo'
              src={`${import.meta.env.BASE_URL}coda-logo.png`}
              alt='CODA logo'
              onError={() => setLogoLoadError(true)}
            />
          )}
        </div>
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
          <h2>The Challenge We Solve</h2>
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
          <h2>CODA-AI: Today and the Vision</h2>
          <p>Today, CODASOL combines industrial data experience, MDM delivery knowledge, and domain understanding from asset-intensive operating environments. The vision for CODA-AI is to convert that foundation into a scalable vertical AI-MDM intelligence layer for classification, enrichment, governance, deduplication, asset data quality, and MDM decision support.</p>
          <p>CODA-AI is designed to sit above existing enterprise systems and support them; it does not replace SAP, Oracle, IBM, Microsoft systems, or legacy platforms.</p>
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

        <GroupStructure />

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
