import { useEffect, useMemo, useState } from 'react'

const mailto = 'mailto:investor@codasol.com?subject=CODASOL%20Investor%20Deck%20Request'
const whatsappHref = 'https://wa.me/971542045869?text=Hello%20CODASOL%20team%2C%20I%20would%20like%20to%20learn%20more%20about%20the%20investor%20opportunity.'
const elfsightScriptSrc = 'https://elfsightcdn.com/platform.js'


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
  investmentAmount: 125000,
  ctsPreMoneyValuation: 10000000,
  ctsOwnershipPercent: 23.46
}

const groupImageSrc = `${import.meta.env.BASE_URL}Group.png`

function safeNumber(value, defaultValue = 0) {
  if (String(value).trim() === '') {
    return defaultValue
  }

  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : defaultValue
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

function formatUSD(value) {
  const safeValue = Math.max(0, safeNumber(value))
  const formattedValue = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0
  }).format(safeValue)
  return `USD ${formattedValue}`
}

function formatPercent(value, digits = 4) {
  const safeValue = Number.isFinite(value) ? value : 0
  return `${safeValue.toFixed(digits)}%`
}

function WhatsAppIcon() {
  return (
    <svg viewBox='0 0 32 32' aria-hidden='true' focusable='false'>
      <path d='M16.04 3.2c-7.02 0-12.73 5.62-12.73 12.54 0 2.21.59 4.37 1.72 6.26L3.2 28.8l6.98-1.79a12.9 12.9 0 0 0 5.86 1.42c7.02 0 12.73-5.62 12.73-12.54S23.06 3.2 16.04 3.2Zm0 22.98c-1.86 0-3.68-.49-5.27-1.42l-.38-.22-4.14 1.06 1.09-4.01-.25-.41a10.13 10.13 0 0 1-1.55-5.44c0-5.67 4.71-10.29 10.5-10.29s10.5 4.62 10.5 10.29-4.71 10.44-10.5 10.44Zm5.76-7.68c-.32-.16-1.86-.9-2.15-1-.29-.11-.5-.16-.71.16-.21.31-.82 1-.99 1.21-.18.21-.36.23-.67.08-.32-.16-1.34-.49-2.55-1.56-.94-.83-1.58-1.85-1.76-2.16-.18-.31-.02-.48.14-.64.14-.14.32-.36.48-.54.16-.18.21-.31.32-.52.11-.21.05-.39-.03-.54-.08-.16-.71-1.69-.98-2.31-.26-.6-.52-.52-.71-.53h-.61c-.21 0-.55.08-.84.39-.29.31-1.1 1.06-1.1 2.58s1.13 3 1.28 3.21c.16.21 2.23 3.34 5.39 4.68.75.32 1.34.51 1.8.65.76.24 1.45.2 2 .12.61-.09 1.86-.75 2.13-1.48.26-.73.26-1.36.18-1.49-.08-.13-.29-.21-.61-.37Z' />
    </svg>
  )
}

function HeaderWhatsAppButton() {
  return (
    <a
      className='whatsapp-header-button'
      href={whatsappHref}
      target='_blank'
      rel='noopener noreferrer'
      aria-label='Chat with CODASOL on WhatsApp'
    >
      <span className='whatsapp-header-icon' aria-hidden='true'><WhatsAppIcon /></span>
      <span className='whatsapp-header-label'>WhatsApp</span>
      <span className='whatsapp-header-label-compact'>WA</span>
    </a>
  )
}

function WhatsAppContact() {
  useEffect(() => {
    if (document.querySelector(`script[src="${elfsightScriptSrc}"]`)) {
      return () => {}
    }

    const script = document.createElement('script')
    script.src = elfsightScriptSrc
    script.async = true
    script.dataset.codaElfsight = 'whatsapp'
    document.body.appendChild(script)

    return () => {
      script.remove()
    }
  }, [])

  return (
    <>
      <div className='elfsight-app-786a347e-3f3b-4406-9a1e-0356b0f88b46' data-elfsight-app-lazy />
      <a
        className='whatsapp-float'
        href={whatsappHref}
        target='_blank'
        rel='noopener noreferrer'
        aria-label='Chat with CODASOL on WhatsApp'
      >
        <span className='whatsapp-icon'><WhatsAppIcon /></span>
        <span className='whatsapp-label'>Chat with CODASOL</span>
      </a>
    </>
  )
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
      return () => {}
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
  const [investmentAmount, setInvestmentAmount] = useState(String(defaultAssumptions.investmentAmount))
  const [ctsPreMoneyValuation, setCtsPreMoneyValuation] = useState(String(defaultAssumptions.ctsPreMoneyValuation))
  const [ctsOwnershipPercent, setCtsOwnershipPercent] = useState(String(defaultAssumptions.ctsOwnershipPercent))

  const result = useMemo(() => {
    const parsedInvestment = Number(investmentAmount)
    const hasValidInvestment = investmentAmount.trim() !== '' && Number.isFinite(parsedInvestment) && parsedInvestment >= 10000
    const safeInvestmentAmount = hasValidInvestment ? parsedInvestment : 0
    const parsedPreMoney = safeNumber(ctsPreMoneyValuation, defaultAssumptions.ctsPreMoneyValuation)
    const safeCtsPreMoneyValuation = parsedPreMoney > 0 ? parsedPreMoney : defaultAssumptions.ctsPreMoneyValuation
    const safeCtsOwnershipPercent = clamp(safeNumber(ctsOwnershipPercent, defaultAssumptions.ctsOwnershipPercent), 0, 100)
    const denominator = safeCtsPreMoneyValuation + safeInvestmentAmount
    const investorOwnershipCTS = hasValidInvestment && denominator > 0 ? safeInvestmentAmount / denominator : 0
    const indirectOwnershipCODASOL = investorOwnershipCTS * (safeCtsOwnershipPercent / 100)

    return {
      hasValidInvestment,
      investmentAmount: safeInvestmentAmount,
      ctsPreMoneyValuation: safeCtsPreMoneyValuation,
      ctsOwnershipPercent: safeCtsOwnershipPercent,
      investorOwnershipCTSPercent: Number.isFinite(investorOwnershipCTS) ? investorOwnershipCTS * 100 : 0,
      indirectOwnershipCODASOLPercent: Number.isFinite(indirectOwnershipCODASOL) ? indirectOwnershipCODASOL * 100 : 0
    }
  }, [investmentAmount, ctsPreMoneyValuation, ctsOwnershipPercent])

  const handleInvestmentAmountChange = (value) => {
    setInvestmentAmount(value)
  }

  const handleReset = () => {
    setInvestmentAmount(String(defaultAssumptions.investmentAmount))
    setCtsPreMoneyValuation(String(defaultAssumptions.ctsPreMoneyValuation))
    setCtsOwnershipPercent(String(defaultAssumptions.ctsOwnershipPercent))
  }

  const visibleResult = result.hasValidInvestment
  const sliderValue = result.hasValidInvestment
    ? clamp(result.investmentAmount, 10000, 5000000)
    : defaultAssumptions.investmentAmount
  const helperText = result.hasValidInvestment
    ? `Current value: ${formatUSD(result.investmentAmount)}`
    : 'Enter an investment amount to calculate indicative ownership.'

  return (
    <section id='calculator' className='calculator-section'>
      <div className='calculator-heading'>
        <span className='calculator-kicker'>Equity ownership estimator</span>
        <h2>Indicative Ownership Calculator</h2>
        <p className='calculation-label'>Indicative only | Non-binding | Subject to final documentation</p>
      </div>

      <div className='calculator-shell' role='region' aria-label='Indicative ownership calculator'>
        <div className='calculator-input-column'>
          <article className='calculator-card input-card'>
            <div className='calculator-card-header'>
              <div>
                <p className='calculator-card-eyebrow'>Investor input</p>
                <h3>Investment Amount in USD</h3>
              </div>
              <strong>{result.hasValidInvestment ? formatUSD(result.investmentAmount) : 'USD —'}</strong>
            </div>

            <label className='field-card investment-field'>
              <span>Investment Amount in USD</span>
              <input
                type="number"
                min='10000'
                step='5000'
                inputMode='decimal'
                value={investmentAmount}
                placeholder='125000'
                onChange={(event) => handleInvestmentAmountChange(event.target.value)}
              />
            </label>

            <label className='slider-field'>
              <span className='slider-value'>{helperText}</span>
              <input
                className='investment-slider'
                type="range"
                min='10000'
                max='5000000'
                step='5000'
                value={sliderValue}
                onChange={(event) => handleInvestmentAmountChange(event.target.value)}
                aria-label='Investment amount slider'
              />
              <span className='slider-limits'>
                <small>USD 10,000</small>
                <small>USD 5,000,000</small>
              </span>
            </label>

            <div className='calculator-actions'>
              <button className='btn btn-secondary' type='button' onClick={handleReset}>
                Reset
              </button>
              <a className='btn btn-primary' href={mailto}>Request NDA Deck</a>
            </div>
          </article>

          <details className='assumptions-drawer calculator-card' open>
            <summary>Advanced Assumptions</summary>
            <div className='assumptions-grid'>
              <label className='field-card'>
                <span>CTS pre-money valuation</span>
                <input
                  type="number"
                  min='0'
                  step='100000'
                  inputMode='decimal'
                  value={ctsPreMoneyValuation}
                  onChange={(event) => setCtsPreMoneyValuation(event.target.value)}
                />
              </label>
              <label className='field-card'>
                <span>CTS ownership in CODASOL Pte Ltd (%)</span>
                <input
                  type="number"
                  min='0'
                  max='100'
                  step='0.01'
                  inputMode='decimal'
                  value={ctsOwnershipPercent}
                  onChange={(event) => setCtsOwnershipPercent(event.target.value)}
                />
              </label>
            </div>
          </details>
        </div>

        <div className='calculator-result-column'>
          <article className='result-card result-card-large' aria-live='polite'>
            <p className='result-eyebrow'>Indicative CODASOL Group Ownership</p>
            {visibleResult ? (
              <>
                <h3>{formatPercent(result.indirectOwnershipCODASOLPercent)}</h3>
                <div className='result-details'>
                  <div>
                    <span>Investment amount</span>
                    <strong>{formatUSD(result.investmentAmount)}</strong>
                  </div>
                  <div>
                    <span>Indicative ownership in CTS</span>
                    <strong>{formatPercent(result.investorOwnershipCTSPercent)}</strong>
                  </div>
                  <div>
                    <span>Indicative indirect ownership in CODASOL Group</span>
                    <strong>{formatPercent(result.indirectOwnershipCODASOLPercent)}</strong>
                  </div>
                </div>
              </>
            ) : (
              <p className='empty-result'>Enter an investment amount to calculate indicative ownership.</p>
            )}
          </article>

          <div className='calculator-explanation'>
            <p>Because CTS owns a minority interest in CODASOL Pte Ltd, ownership through CTS represents indirect ownership in the CODASOL group.</p>
          </div>
        </div>
      </div>

      <p className='legal-note calculator-legal-note'>This calculator is for indicative understanding only. Final ownership, share price, valuation, rights, allocation, and investment terms are subject to final legal and financial documentation.</p>
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
        <div className='header-bar' role='navigation' aria-label='CODASOL portal header'>
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
          <HeaderWhatsAppButton />
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

      <WhatsAppContact />
      <a className='sticky-cta' href={mailto}>Request NDA Deck</a>
    </div>
  )
}
