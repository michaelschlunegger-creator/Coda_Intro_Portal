import { useEffect, useMemo, useState } from 'react'

const mailto = 'mailto:investor@codasol.com?subject=CODASOL%20Investor%20Deck%20Request'
const whatsappHref = 'https://wa.me/971542045869?text=Hello%20CODASOL%20team%2C%20I%20would%20like%20to%20learn%20more%20about%20the%20investor%20opportunity.'
const elfsightScriptSrc = 'https://elfsightcdn.com/platform.js'
const assistantWidgetClassName = 'elfsight-app-cb4a783d-3540-4ff8-8924-7818eaf61af7'
const assistantWidgetMountId = 'investor-assistant-widget'

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

const MIN_TOTAL_INVESTMENT_USD = 10000
const MAX_TOTAL_RAISE_USD = 7800000
const DEFAULT_TOTAL_INVESTMENT_USD = 125000
const INVESTMENT_STEP_USD = 5000
const EQUITY_RATIO = 0.50
const DEBT_RATIO = 0.50
const MAX_EQUITY_RAISE_USD = MAX_TOTAL_RAISE_USD * EQUITY_RATIO
const MAX_DEBT_RAISE_USD = MAX_TOTAL_RAISE_USD * DEBT_RATIO
const FULL_CTS_OWNERSHIP = 0.3968
const CTS_GROUP_OWNERSHIP = 0.2346
const CTS_PRE_MONEY_VALUATION = MAX_EQUITY_RAISE_USD * (1 - FULL_CTS_OWNERSHIP) / FULL_CTS_OWNERSHIP

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

function AssistantIcon() {
  return (
    <svg viewBox='0 0 24 24' aria-hidden='true' focusable='false'>
      <path d='M12 2.75a.75.75 0 0 1 .75.75v1.2a7.32 7.32 0 0 1 6.55 6.55h1.2a.75.75 0 0 1 0 1.5h-1.2a7.32 7.32 0 0 1-6.55 6.55v1.2a.75.75 0 0 1-1.5 0v-1.2a7.32 7.32 0 0 1-6.55-6.55H3.5a.75.75 0 0 1 0-1.5h1.2a7.32 7.32 0 0 1 6.55-6.55V3.5a.75.75 0 0 1 .75-.75Zm0 3.4a5.85 5.85 0 1 0 0 11.7 5.85 5.85 0 0 0 0-11.7Zm-2.55 4.4a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1Zm5.1 0a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1Zm-4.28 3.55a.75.75 0 0 1 1.04.19c.15.22.4.46.69.46s.54-.24.69-.46a.75.75 0 1 1 1.23.85c-.43.63-1.11 1.11-1.92 1.11s-1.49-.48-1.92-1.11a.75.75 0 0 1 .19-1.04Z' />
    </svg>
  )
}

function HeaderWhatsAppButton() {
  return (
    <a
      className='header-action-button whatsapp-header-button'
      href={whatsappHref}
      target='_blank'
      rel='noopener noreferrer'
      aria-label='Chat with CODASOL on WhatsApp'
    >
      <span className='header-action-icon whatsapp-header-icon' aria-hidden='true'><WhatsAppIcon /></span>
      <span className='whatsapp-header-label'>WhatsApp</span>
      <span className='whatsapp-header-label-compact'>WA</span>
    </a>
  )
}

function ensureInvestorAssistantScript() {
  if (typeof document === 'undefined') {
    return
  }

  const existingScript = document.querySelector(`script[src="${elfsightScriptSrc}"]`)
  if (existingScript) {
    existingScript.async = true
    return
  }

  const script = document.createElement('script')
  script.src = elfsightScriptSrc
  script.async = true
  script.dataset.codaAssistantScript = 'true'
  document.head.appendChild(script)
}

function isVisibleElement(element) {
  if (!(element instanceof HTMLElement)) {
    return false
  }

  const style = window.getComputedStyle(element)
  const bounds = element.getBoundingClientRect()

  return (
    style.display !== 'none' &&
    style.visibility !== 'hidden' &&
    Number(style.opacity) !== 0 &&
    bounds.width > 0 &&
    bounds.height > 0
  )
}

function hasInvestorAssistantSignal(element) {
  const signal = [
    element.getAttribute('aria-label'),
    element.getAttribute('title'),
    element.getAttribute('src'),
    element.getAttribute('class'),
    element.textContent
  ].filter(Boolean).join(' ')

  return /elfsight|launcher|assistant|chat|message|support/i.test(signal)
}

function findInvestorAssistantLauncherElement() {
  const widgetMount = document.getElementById(assistantWidgetMountId)
  const candidates = Array.from(document.querySelectorAll([
    'button',
    'a[href]',
    '[role="button"]',
    'iframe',
    '[class*="elfsight" i]',
    '[class*="launcher" i]',
    '[class*="chat" i]',
    '[aria-label*="chat" i]',
    '[aria-label*="assistant" i]'
  ].join(',')))

  return candidates.find((candidate) => {
    if (candidate.closest('.assistant-launcher') || candidate === widgetMount || candidate.classList?.contains(assistantWidgetClassName)) {
      return false
    }

    return hasInvestorAssistantSignal(candidate) && isVisibleElement(candidate)
  })
}

function activateInvestorAssistantWidget() {
  ensureInvestorAssistantScript()

  const widgetMount = document.getElementById(assistantWidgetMountId)
  widgetMount?.removeAttribute('aria-hidden')
  widgetMount?.dispatchEvent(new CustomEvent('coda:investor-assistant-requested', { bubbles: true }))
  window.dispatchEvent(new Event('resize'))

  const launcher = findInvestorAssistantLauncherElement()
  if (launcher) {
    launcher.scrollIntoView({ block: 'nearest', inline: 'nearest' })
    launcher.focus?.({ preventScroll: true })
    launcher.click?.()
    return
  }

  widgetMount?.focus?.({ preventScroll: true })
}

function InvestorAssistantWidgetMount() {
  useEffect(() => {
    ensureInvestorAssistantScript()
  }, [])

  return (
    <div id={assistantWidgetMountId} className='investor-assistant-widget' aria-hidden='true' tabIndex='-1'>
      <div className={assistantWidgetClassName} data-elfsight-app-lazy />
    </div>
  )
}

function InvestorAssistantLauncher() {
  const [wasRequested, setWasRequested] = useState(false)

  function handleClick() {
    setWasRequested(true)
    activateInvestorAssistantWidget()

    window.setTimeout(activateInvestorAssistantWidget, 350)
    window.setTimeout(activateInvestorAssistantWidget, 1200)
  }

  return (
    <div className='assistant-launcher'>
      <button
        type='button'
        className='header-action-button assistant-header-button'
        aria-pressed={wasRequested}
        aria-expanded={wasRequested}
        aria-controls={assistantWidgetMountId}
        onClick={handleClick}
      >
        <span className='header-action-icon assistant-header-icon' aria-hidden='true'><AssistantIcon /></span>
        <span className='assistant-header-label'>Investor Assistant</span>
        <span className='assistant-header-label-compact'>AI</span>
      </button>
    </div>
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
  const [totalInvestmentAmount, setTotalInvestmentAmount] = useState(String(DEFAULT_TOTAL_INVESTMENT_USD))

  const result = useMemo(() => {
    const trimmedInvestment = totalInvestmentAmount.trim()
    const parsedInvestment = Number(trimmedInvestment)
    const hasValidInvestment = trimmedInvestment !== '' && Number.isFinite(parsedInvestment) && parsedInvestment >= MIN_TOTAL_INVESTMENT_USD
    const cappedTotalInvestmentAmount = hasValidInvestment ? clamp(parsedInvestment, MIN_TOTAL_INVESTMENT_USD, MAX_TOTAL_RAISE_USD) : 0
    const equityAmount = cappedTotalInvestmentAmount * EQUITY_RATIO
    const debtAmount = cappedTotalInvestmentAmount * DEBT_RATIO
    const ctsOwnership = hasValidInvestment ? equityAmount / (CTS_PRE_MONEY_VALUATION + equityAmount) : 0
    const indirectGroupOwnership = ctsOwnership * CTS_GROUP_OWNERSHIP

    return {
      hasValidInvestment,
      isCappedAtMaximum: hasValidInvestment && parsedInvestment > MAX_TOTAL_RAISE_USD,
      totalInvestmentAmount: cappedTotalInvestmentAmount,
      equityAmount,
      debtAmount,
      ctsPreMoneyValuation: CTS_PRE_MONEY_VALUATION,
      ctsOwnershipPercent: Number.isFinite(ctsOwnership) ? ctsOwnership * 100 : 0,
      indirectGroupOwnershipPercent: Number.isFinite(indirectGroupOwnership) ? indirectGroupOwnership * 100 : 0
    }
  }, [totalInvestmentAmount])

  const handleTotalInvestmentAmountChange = (value) => {
    if (value.trim() === '') {
      setTotalInvestmentAmount('')
      return
    }

    const parsedValue = Number(value)

    if (Number.isFinite(parsedValue) && parsedValue > MAX_TOTAL_RAISE_USD) {
      setTotalInvestmentAmount(String(MAX_TOTAL_RAISE_USD))
      return
    }

    setTotalInvestmentAmount(value)
  }

  const handleReset = () => {
    setTotalInvestmentAmount(String(DEFAULT_TOTAL_INVESTMENT_USD))
  }

  const visibleResult = result.hasValidInvestment
  const sliderValue = result.hasValidInvestment
    ? clamp(result.totalInvestmentAmount, MIN_TOTAL_INVESTMENT_USD, MAX_TOTAL_RAISE_USD)
    : DEFAULT_TOTAL_INVESTMENT_USD
  const helperText = result.hasValidInvestment
    ? `Current total ticket: ${formatUSD(result.totalInvestmentAmount)}`
    : 'Enter a total investment amount to calculate indicative ownership.'

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
                <h3>Total Investment Ticket Amount in USD</h3>
              </div>
              <strong>{result.hasValidInvestment ? formatUSD(result.totalInvestmentAmount) : 'USD —'}</strong>
            </div>

            <label className='field-card investment-field'>
              <span>Total Investment Ticket Amount in USD</span>
              <input
                type="number"
                min={MIN_TOTAL_INVESTMENT_USD}
                max={MAX_TOTAL_RAISE_USD}
                step={INVESTMENT_STEP_USD}
                inputMode='decimal'
                value={totalInvestmentAmount}
                placeholder='125000'
                onChange={(event) => handleTotalInvestmentAmountChange(event.target.value)}
              />
            </label>

            <div className='split-summary' aria-live='polite'>
              <div>
                <span>Equity portion</span>
                <strong>{visibleResult ? formatUSD(result.equityAmount) : 'USD —'}</strong>
              </div>
              <div>
                <span>Debt portion</span>
                <strong>{visibleResult ? formatUSD(result.debtAmount) : 'USD —'}</strong>
              </div>
            </div>

            <label className='slider-field'>
              <span className='slider-value'>{helperText}</span>
              <input
                className='investment-slider'
                type="range"
                min={MIN_TOTAL_INVESTMENT_USD}
                max={MAX_TOTAL_RAISE_USD}
                step={INVESTMENT_STEP_USD}
                value={sliderValue}
                onChange={(event) => handleTotalInvestmentAmountChange(event.target.value)}
                aria-label='Total investment ticket amount slider'
              />
              <span className='slider-limits'>
                <small>USD 10,000</small>
                <small>USD 7,800,000</small>
              </span>
            </label>

            {result.isCappedAtMaximum ? (
              <p className='calculator-note'>Maximum total raise assumption is USD 7,800,000.</p>
            ) : null}

            <div className='calculator-actions'>
              <button className='btn btn-secondary' type='button' onClick={handleReset}>
                Reset to default value USD 125,000
              </button>
              <a className='btn btn-primary' href={mailto}>Request NDA Deck</a>
            </div>
          </article>

          <div className='assumptions-drawer calculator-card fixed-assumptions'>
            <div className='fixed-assumptions-header'>Fixed assumptions</div>
            <div className='assumptions-grid'>
              <div className='assumption-item'>
                <span>Maximum total raise</span>
                <strong>{formatUSD(MAX_TOTAL_RAISE_USD)}</strong>
              </div>
              <div className='assumption-item'>
                <span>Maximum equity raise</span>
                <strong>{formatUSD(MAX_EQUITY_RAISE_USD)}</strong>
              </div>
              <div className='assumption-item'>
                <span>Maximum debt raise</span>
                <strong>{formatUSD(MAX_DEBT_RAISE_USD)}</strong>
              </div>
              <div className='assumption-item'>
                <span>CTS ownership in CODASOL Group</span>
                <strong>{formatPercent(CTS_GROUP_OWNERSHIP * 100, 2)}</strong>
              </div>
            </div>
          </div>
        </div>

        <div className='calculator-result-column'>
          <article className='result-card result-card-large' aria-live='polite'>
            <p className='result-eyebrow'>Indicative CODASOL Group Ownership</p>
            {visibleResult ? (
              <>
                <h3>{formatPercent(result.indirectGroupOwnershipPercent)}</h3>
                <div className='result-details'>
                  <div>
                    <span>Total investment amount</span>
                    <strong>{formatUSD(result.totalInvestmentAmount)}</strong>
                  </div>
                  <div>
                    <span>Equity amount used for ownership calculation</span>
                    <strong>{formatUSD(result.equityAmount)}</strong>
                  </div>
                  <div>
                    <span>Debt amount, no ownership impact</span>
                    <strong>{formatUSD(result.debtAmount)}</strong>
                  </div>
                  <div>
                    <span>Derived CTS pre-money valuation</span>
                    <strong>{formatUSD(result.ctsPreMoneyValuation)}</strong>
                  </div>
                  <div>
                    <span>Indicative ownership in CTS</span>
                    <strong>{formatPercent(result.ctsOwnershipPercent)}</strong>
                  </div>
                  <div>
                    <span>Indicative indirect ownership in CODASOL Group</span>
                    <strong>{formatPercent(result.indirectGroupOwnershipPercent)}</strong>
                  </div>
                </div>
              </>
            ) : (
              <p className='empty-result'>Enter a total investment amount to calculate indicative ownership.</p>
            )}
          </article>

          <div className='calculator-explanation'>
            <p>Ownership is calculated only on the equity portion of the investment. The investment ticket is assumed to be split 50% equity and 50% debt. The debt component does not create ownership. All values are indicative, non-binding, and subject to final legal documentation.</p>
            <p>Because CTS owns a minority interest in CODASOL Group, ownership through CTS represents indirect ownership in the CODASOL group.</p>
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
          <div className='header-actions' aria-label='Portal contact actions'>
            <InvestorAssistantLauncher />
            <HeaderWhatsAppButton />
          </div>
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
      <InvestorAssistantWidgetMount />
    </div>
  )
}
