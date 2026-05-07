import { useEffect, useMemo, useState } from 'react'

const mailto = 'mailto:investor@codasol.com?subject=CODASOL%20Investor%20Deck%20Request'
const whatsappHref = 'https://wa.me/971542045869?text=Hello%20CODASOL%20team%2C%20I%20would%20like%20to%20learn%20more%20about%20the%20investor%20opportunity.'
const assistantEmbedHref = `${import.meta.env.BASE_URL}investor-assistant.html`
const websiteHref = 'https://www.codasol.com'

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


const customerReferences = [
  'Michelin',
  'BP',
  'QatarEnergy',
  'AD Ports Group',
  'Shell',
  'Saudi Aramco',
  'Saint-Gobain',
  'Oman LNG',
  'Atlantic',
  'ADNOC',
  'Chevron',
  'NMDC Group'
]

const industrySegments = [
  'Oil & Gas',
  'LNG',
  'Power',
  'Utilities',
  'Mining',
  'Manufacturing',
  'Process Industries',
  'Ports',
  'Infrastructure',
  'Pharma / Chemical',
  'Automotive'
]

const ecosystemReferences = [
  'EY',
  'PwC',
  'SAP',
  'Oracle',
  'IBM',
  'Snowflake',
  'Databricks',
  'Microsoft Fabric'
]

const investorTopics = {
  about: {
    label: 'About CODA',
    eyebrow: 'Company foundation',
    title: 'About CODA',
    intro: 'CODASOL is an industrial data intelligence, Enterprise Master Data Management (MDM), software, and Managed DataOps company for asset-heavy industries. CODASOL combines software, implementation services, managed data operations, industrial domain knowledge, and Artificial Intelligence Master Data Management direction.',
    sections: [
      {
        heading: 'CODASOL combines',
        bullets: [
          'software and platform capability',
          'implementation services',
          'managed data operations',
          'industrial domain knowledge',
          'Artificial Intelligence Master Data Management (AI-MDM) direction'
        ]
      },
      {
        heading: 'Industrial knowledge advantage',
        body: 'CODA’s strength is not only software. The real value is more than 15 years of industrial data experience, real project delivery, industrial terminology, golden-record logic, supplier normalization, asset context, and practical customer delivery knowledge.'
      },
      {
        heading: 'Key points',
        bullets: [
          '15+ years of industrial data and asset management experience',
          '100+ completed customer projects',
          'exposure to 100M+ material records',
          'exposure to 20M+ asset records',
          'exposure to 10M+ supplier, Bill of Materials, service, and operational records',
          'multi-vertical experience across asset-heavy industries and regions'
        ]
      }
    ]
  },
  challenge: {
    label: 'Challenge',
    eyebrow: 'Industrial data pain point',
    title: 'Challenge We Solve',
    intro: 'Asset-heavy companies depend on accurate master data for materials, spare parts, assets, suppliers, services, procurement, maintenance, finance, compliance, and operations. Poor data creates cost, inefficiency, risk, and weak AI readiness.',
    sections: [
      {
        body: 'When this data is incomplete, duplicated, wrongly classified, or inconsistent across Enterprise Resource Planning (ERP) and operational systems, companies lose efficiency, control, margin, and AI readiness.'
      },
      {
        heading: 'CODA helps improve',
        bullets: [
          'data quality',
          'master data governance',
          'duplicate and near-duplicate detection',
          'classification and enrichment',
          'supplier normalization',
          'inventory and procurement efficiency',
          'asset and maintenance data quality',
          'ERP and AI readiness'
        ]
      }
    ]
  },
  industries: {
    label: 'Industries',
    eyebrow: 'Asset-heavy verticals',
    title: 'Industries We Serve',
    intro: 'CODA focuses on asset-heavy and data-heavy industries where poor master data has a direct operational, financial, procurement, maintenance, compliance, and AI-readiness impact. Core industries include Oil & Gas, LNG, Power, Utilities, Mining, Manufacturing, Process Industries, Ports, Infrastructure, Pharma / Chemical, and Automotive.',
    chips: industrySegments
  },
  customers: {
    label: 'Customers',
    eyebrow: 'High-level references',
    title: 'Customers & Credibility',
    intro: 'CODA has delivered work across global industrial and asset-heavy environments. The investor teaser references trusted global leaders and shows customer examples such as Michelin, BP, QatarEnergy, AD Ports Group, Shell, Saudi Aramco, Saint-Gobain, Oman LNG, Atlantic, ADNOC, Chevron, and NMDC Group.',
    badges: customerReferences,
    disclaimer: 'Names are shown for high-level reference only. Detailed customer, contract, project, and commercial information is shared only under the appropriate investor stage.'
  },
  partners: {
    label: 'Partners',
    eyebrow: 'Ecosystem direction',
    title: 'Partners & Ecosystem',
    intro: 'Designed to overlay and integrate with customer environments using systems such as SAP, Oracle, IBM, Snowflake, Databricks, and Microsoft Fabric. Do not imply formal partnership status unless confirmed.',
    chips: ecosystemReferences,
    sections: [
      {
        heading: 'Commercial and advisory ecosystem',
        bullets: ['EY', 'PwC', 'selected consulting and transformation partners']
      },
      {
        heading: 'Technology and platform ecosystem direction',
        bullets: ['SAP', 'Oracle', 'IBM', 'Snowflake', 'Databricks', 'Microsoft Fabric']
      },
      {
        heading: 'Integration direction',
        body: 'Designed to overlay and integrate with customer environments using systems such as SAP, Oracle, IBM, Snowflake, Databricks, and Microsoft Fabric. Do not imply formal partnership status unless confirmed.'
      }
    ]
  },
  future: {
    label: 'CODA-AI',
    eyebrow: 'AI-MDM value jump',
    title: 'CODA-AI Future',
    intro: 'CODA-AI is intended to convert CODA’s 15+ years of industrial data knowledge into scalable Artificial Intelligence Master Data Management products. It is designed to sit above existing customer systems as a vertical AI-MDM intelligence layer, not replace them.',
    sections: [
      {
        body: 'CODA-AI is not designed to replace SAP, Oracle, IBM, or other customer software systems. It is designed to sit above and connect to them as a vertical AI-MDM intelligence layer.'
      },
      {
        heading: 'The idea',
        bullets: [
          'Keep customer systems in place.',
          'Add CODA-AI as a vertical intelligence layer.',
          'Understand industry-specific material descriptions, supplier logic, asset structures, maintenance context, and governance rules.',
          'Help customers clean, enrich, govern, and use their data better.',
          'Enable recurring software and data intelligence revenue.'
        ]
      },
      {
        heading: 'Why this is a game changer',
        body: 'Most data tools are generic. CODA-AI is intended to become verticalized by industry and segmented by use case. This means an LNG customer, mining customer, utility, or port operator can use a CODA-AI interface that speaks the language of that industry.',
        bullets: [
          'LNG interface overlaying SAP or related operational systems',
          'Mining interface overlaying Oracle, IBM, SAP, or other enterprise systems',
          'Utilities interface connecting ERP, maintenance, procurement, and operational databases',
          'Industrial data intelligence layer using Snowflake, Databricks, or Microsoft Fabric environments where relevant'
        ]
      },
      {
        heading: 'Agentic AI direction',
        body: 'CODA-AI can move beyond answering questions. Agentic AI can support controlled data tasks such as:',
        bullets: [
          'cataloguer support',
          'risky record flagging',
          'recommended corrections',
          'monitoring new ERP entries',
          'governance alerts',
          'supplier normalization',
          'value engineering support',
          'continuous data quality improvement'
        ]
      },
      {
        body: 'This moves master data from a static back-office function into an active intelligence layer that supports better decisions across the industrial value chain.'
      }
    ]
  }
}

const exploreTopicOrder = ['about', 'challenge', 'industries', 'customers', 'partners', 'future']

const deepDiveCards = [
  {
    title: 'Vertical AI-MDM Interfaces',
    text: 'Industry-specific CODA-AI modules designed to overlay existing customer systems.',
    topicId: 'future'
  },
  {
    title: 'Data Intelligence Moat',
    text: 'Built from real industrial projects, terminology, golden-record logic, supplier structures, and asset context.',
    topicId: 'about'
  },
  {
    title: 'From Services to Recurring Revenue',
    text: 'CODA-AI can support the shift from project-based services to scalable software, AI, and data intelligence revenue.',
    topicId: 'future'
  }
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

const CURRENT_GROUP_VALUATION_USD = 39000000
const MIN_TOTAL_INVESTMENT_USD = 10000
const MAX_TOTAL_RAISE_USD = 7800000
const MAX_EQUITY_RAISE_USD = 3900000
const MAX_DEBT_RAISE_USD = 3900000
const DEFAULT_TOTAL_INVESTMENT_USD = 1000000
const INVESTMENT_STEP_USD = 5000
const DEFAULT_EQUITY_ALLOCATION_PERCENT = 50
const DEFAULT_DEBT_INTEREST_RATE_PERCENT = 10
const MIN_DEBT_INTEREST_RATE_PERCENT = 8
const MAX_DEBT_INTEREST_RATE_PERCENT = 12
const DEBT_INTEREST_STEP_PERCENT = 0.25
const DEFAULT_INVESTMENT_PERIOD_YEARS = 5
const MIN_INVESTMENT_PERIOD_YEARS = 1
const MAX_INVESTMENT_PERIOD_YEARS = 7
const DEFAULT_FUTURE_GROUP_VALUATION_USD = 500000000
const MAX_FUTURE_GROUP_VALUATION_USD = 1000000000
const FUTURE_VALUATION_STEP_USD = 1000000
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
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(Number(value) || 0).replace('$', 'USD ')
}

function formatPercent(value, digits = 4) {
  const safeValue = Number.isFinite(value) ? value : 0
  return `${safeValue.toFixed(digits)}%`
}

function formatSplitPercent(value) {
  const safeValue = Number.isFinite(value) ? value : 0
  return `${Number.isInteger(safeValue) ? safeValue.toFixed(0) : safeValue.toFixed(2)}%`
}

function formatMultiple(value) {
  const safeValue = Number.isFinite(value) && value >= 0 ? value : 0
  return `${safeValue.toFixed(2)}x`
}

function WhatsAppIcon() {
  return (
    <svg viewBox='0 0 32 32' aria-hidden='true' focusable='false'>
      <path d='M16.04 3.2c-7.02 0-12.73 5.62-12.73 12.54 0 2.21.59 4.37 1.72 6.26L3.2 28.8l6.98-1.79a12.9 12.9 0 0 0 5.86 1.42c7.02 0 12.73-5.62 12.73-12.54S23.06 3.2 16.04 3.2Zm0 22.98c-1.86 0-3.68-.49-5.27-1.42l-.38-.22-4.14 1.06 1.09-4.01-.25-.41a10.13 10.13 0 0 1-1.55-5.44c0-5.67 4.71-10.29 10.5-10.29s10.5 4.62 10.5 10.29-4.71 10.44-10.5 10.44Zm5.76-7.68c-.32-.16-1.86-.9-2.15-1-.29-.11-.5-.16-.71.16-.21.31-.82 1-.99 1.21-.18.21-.36.23-.67.08-.32-.16-1.34-.49-2.55-1.56-.94-.83-1.58-1.85-1.76-2.16-.18-.31-.02-.48.14-.64.14-.14.32-.36.48-.54.16-.18.21-.31.32-.52.11-.21.05-.39-.03-.54-.08-.16-.71-1.69-.98-2.31-.26-.6-.52-.52-.71-.53h-.61c-.21 0-.55.08-.84.39-.29.31-1.1 1.06-1.1 2.58s1.13 3 1.28 3.21c.16.21 2.23 3.34 5.39 4.68.75.32 1.34.51 1.8.65.76.24 1.45.2 2 .12.61-.09 1.86-.75 2.13-1.48.26-.73.26-1.36.18-1.49-.08-.13-.29-.21-.61-.37Z' />
    </svg>
  )
}

function WebsiteIcon() {
  return (
    <svg viewBox='0 0 24 24' aria-hidden='true' focusable='false'>
      <path d='M12 2.25a9.75 9.75 0 1 0 0 19.5 9.75 9.75 0 0 0 0-19.5Zm6.82 9h-3.13a15.64 15.64 0 0 0-1.24-6.07 8.28 8.28 0 0 1 4.37 6.07Zm-6.82-7.5c.7 0 1.78 1.23 2.18 4.13.13.91.2 1.98.21 3.12H9.61c.01-1.14.08-2.21.21-3.12C10.22 4.98 11.3 3.75 12 3.75Zm-2.45 1.43a15.64 15.64 0 0 0-1.24 6.07H5.18a8.28 8.28 0 0 1 4.37-6.07ZM3.77 12.75h4.54c.04 2.56.49 4.73 1.24 6.07a8.28 8.28 0 0 1-5.78-6.07Zm8.23 7.5c-.7 0-1.78-1.23-2.18-4.13a22.5 22.5 0 0 1-.21-3.37h4.78a22.5 22.5 0 0 1-.21 3.37c-.4 2.9-1.48 4.13-2.18 4.13Zm2.45-1.43c.75-1.34 1.2-3.51 1.24-6.07h4.54a8.28 8.28 0 0 1-5.78 6.07Z' />
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

function HeaderWebsiteButton() {
  return (
    <a
      className='header-action-button website-header-button'
      href={websiteHref}
      target='_blank'
      rel='noopener noreferrer'
      aria-label='Visit CODASOL website'
    >
      <span className='header-action-icon website-header-icon' aria-hidden='true'><WebsiteIcon /></span>
      <span className='website-header-label'>codasol.com</span>
    </a>
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

function InvestorAssistantLauncher({ onOpen, isOpen }) {
  return (
    <div className='assistant-launcher'>
      <button
        className='header-action-button assistant-header-button'
        type='button'
        onClick={onOpen}
        aria-haspopup='dialog'
        aria-expanded={isOpen}
        aria-label='Open Investor Assistant'
      >
        <span className='header-action-icon assistant-header-icon' aria-hidden='true'><AssistantIcon /></span>
        <span className='assistant-header-label'>Investor Assistant</span>
      </button>
    </div>
  )
}

function InvestorAssistantModal({ isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) {
      return () => {}
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.body.classList.add('modal-open')
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.classList.remove('modal-open')
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) {
    return null
  }

  return (
    <div className='assistant-modal-backdrop' role='presentation' onClick={onClose}>
      <div
        className='assistant-modal-card'
        role='dialog'
        aria-modal='true'
        aria-labelledby='investor-assistant-title'
        aria-describedby='investor-assistant-subtitle'
        onClick={(event) => event.stopPropagation()}
      >
        <div className='assistant-modal-header'>
          <div>
            <p className='assistant-modal-eyebrow'>CODASOL</p>
            <h2 id='investor-assistant-title'>Investor Assistant</h2>
            <p id='investor-assistant-subtitle'>Ask Stage 1, non-NDA questions about the CODASOL investor opportunity.</p>
          </div>
          <button className='assistant-modal-close' type='button' aria-label='Close Investor Assistant' onClick={onClose}>×</button>
        </div>

        <div className='assistant-iframe-shell'>
          <iframe
            className='assistant-iframe'
            src={assistantEmbedHref}
            title='CODASOL Investor Assistant'
            loading='lazy'
          />
        </div>
      </div>
    </div>
  )
}


function TopicContent({ topic }) {
  return (
    <div className='topic-content'>
      {topic.intro ? <p className='topic-intro'>{topic.intro}</p> : null}

      {topic.chips ? (
        <div className='topic-chip-grid' aria-label={`${topic.title} highlights`}>
          {topic.chips.map((chip) => <span className='topic-chip' key={chip}>{chip}</span>)}
        </div>
      ) : null}

      {topic.badges ? (
        <div className='topic-badge-grid' aria-label='Customer references'>
          {topic.badges.map((badge) => <span className='topic-badge' key={badge}>{badge}</span>)}
        </div>
      ) : null}

      {topic.sections?.map((section, index) => (
        <section className='topic-section' key={`${topic.title}-${index}`}>
          {section.heading ? <h3>{section.heading}</h3> : null}
          {section.body ? <p>{section.body}</p> : null}
          {section.bullets ? (
            <ul>
              {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
            </ul>
          ) : null}
        </section>
      ))}

      {topic.disclaimer ? <p className='topic-disclaimer'>{topic.disclaimer}</p> : null}
    </div>
  )
}

function InvestorTopicModal({ topic, onClose }) {
  useEffect(() => {
    if (!topic) {
      return () => {}
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.body.classList.add('modal-open')
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.classList.remove('modal-open')
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [topic, onClose])

  if (!topic) {
    return null
  }

  return (
    <div className='info-modal-backdrop' role='presentation' onClick={onClose}>
      <div
        className='info-modal-card'
        role='dialog'
        aria-modal='true'
        aria-labelledby='investor-topic-title'
        onClick={(event) => event.stopPropagation()}
      >
        <div className='info-modal-header'>
          <div>
            <p className='info-modal-eyebrow'>{topic.eyebrow}</p>
            <h2 id='investor-topic-title'>{topic.title}</h2>
          </div>
          <button className='info-modal-close' type='button' aria-label={`Close ${topic.title}`} onClick={onClose}>×</button>
        </div>
        <TopicContent topic={topic} />
      </div>
    </div>
  )
}

function ExploreCoda({ onOpenTopic }) {
  return (
    <section className='hero-explore-row' aria-labelledby='explore-coda-title'>
      <p className='hero-explore-label' id='explore-coda-title'>Explore CODASOL</p>
      <div className='hero-explore-buttons' aria-label='Explore CODASOL investor knowledge topics'>
        {exploreTopicOrder.map((topicId) => {
          const topic = investorTopics[topicId]

          return (
            <button className='hero-explore-button' type='button' key={topicId} onClick={() => onOpenTopic(topicId)}>
              {topic.label}
            </button>
          )
        })}
      </div>
    </section>
  )
}

function CodaAiDeepDiveCards({ onOpenTopic }) {
  return (
    <section className='deep-dive-section hero-deep-dive-section' aria-labelledby='deep-dive-title'>
      <div className='deep-dive-heading'>
        <p className='pill'>CODA-AI deep dives</p>
        <h2 id='deep-dive-title'>Compact Stage 1 themes</h2>
      </div>
      <div className='grid three deep-dive-grid'>
        {deepDiveCards.map((card) => (
          <article className='card deep-dive-card hero-deep-dive-card' key={card.title}>
            <h3>{card.title}</h3>
            <p>{card.text}</p>
            <button
              className='btn btn-secondary'
              type='button'
              onClick={() => onOpenTopic(card.topicId)}
              aria-label={`Learn more about ${card.title}`}
            >
              Learn More
            </button>
          </article>
        ))}
      </div>
    </section>
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

function InvestmentReturnCalculator() {
  const [totalInvestmentAmount, setTotalInvestmentAmount] = useState(String(DEFAULT_TOTAL_INVESTMENT_USD))
  const [equitySplitPercent, setEquitySplitPercent] = useState(DEFAULT_EQUITY_ALLOCATION_PERCENT)
  const [annualDebtInterestRate, setAnnualDebtInterestRate] = useState(DEFAULT_DEBT_INTEREST_RATE_PERCENT)
  const [investmentPeriodYears, setInvestmentPeriodYears] = useState(DEFAULT_INVESTMENT_PERIOD_YEARS)
  const [futureGroupValuation, setFutureGroupValuation] = useState(String(DEFAULT_FUTURE_GROUP_VALUATION_USD))

  const result = useMemo(() => {
    const trimmedInvestment = String(totalInvestmentAmount).trim()
    const parsedInvestment = Number(trimmedInvestment)
    const hasValidInvestment = trimmedInvestment !== '' && Number.isFinite(parsedInvestment) && parsedInvestment >= MIN_TOTAL_INVESTMENT_USD
    const totalInvestment = hasValidInvestment ? clamp(parsedInvestment, MIN_TOTAL_INVESTMENT_USD, MAX_TOTAL_RAISE_USD) : 0
    const selectedEquityPercent = clamp(safeNumber(equitySplitPercent, DEFAULT_EQUITY_ALLOCATION_PERCENT), 0, 100)
    const requestedEquityAmount = totalInvestment * (selectedEquityPercent / 100)
    const equityAmount = Math.min(requestedEquityAmount, MAX_EQUITY_RAISE_USD)
    const debtAmount = Math.max(0, totalInvestment - equityAmount)
    const actualEquityPercent = totalInvestment > 0 ? (equityAmount / totalInvestment) * 100 : 0
    const actualDebtPercent = totalInvestment > 0 ? (debtAmount / totalInvestment) * 100 : 0
    const futureValuationInput = safeNumber(futureGroupValuation, CURRENT_GROUP_VALUATION_USD)
    const safeFutureGroupValuation = Math.max(0, futureValuationInput)
    const safePeriodYears = clamp(safeNumber(investmentPeriodYears, DEFAULT_INVESTMENT_PERIOD_YEARS), MIN_INVESTMENT_PERIOD_YEARS, MAX_INVESTMENT_PERIOD_YEARS)
    const safeInterestRatePercent = clamp(safeNumber(annualDebtInterestRate, DEFAULT_DEBT_INTEREST_RATE_PERCENT), MIN_DEBT_INTEREST_RATE_PERCENT, MAX_DEBT_INTEREST_RATE_PERCENT)
    const annualInterestRate = safeInterestRatePercent / 100
    const ctsOwnership = equityAmount > 0 ? equityAmount / (CTS_PRE_MONEY_VALUATION + equityAmount) : 0
    const indirectGroupOwnership = ctsOwnership * CTS_GROUP_OWNERSHIP
    const futureEquityValue = indirectGroupOwnership * safeFutureGroupValuation
    const debtInterestReturn = debtAmount * annualInterestRate * safePeriodYears
    const debtTotalReturn = debtAmount + debtInterestReturn
    const totalProjectedReturn = futureEquityValue + debtTotalReturn
    const totalGain = totalProjectedReturn - totalInvestment
    const returnMultiple = totalInvestment > 0 ? totalProjectedReturn / totalInvestment : 0
    const annualizedReturn = totalInvestment > 0 && safePeriodYears > 0 && totalProjectedReturn >= 0
      ? Math.pow(returnMultiple, 1 / safePeriodYears) - 1
      : 0

    return {
      hasValidInvestment,
      isCappedAtMaximum: hasValidInvestment && parsedInvestment > MAX_TOTAL_RAISE_USD,
      isEquityCapped: hasValidInvestment && requestedEquityAmount > MAX_EQUITY_RAISE_USD,
      isDebtAboveRaiseAssumption: hasValidInvestment && debtAmount > MAX_DEBT_RAISE_USD,
      isFutureValuationBelowReference: Number.isFinite(futureValuationInput) && futureValuationInput < CURRENT_GROUP_VALUATION_USD,
      totalInvestmentAmount: totalInvestment,
      equityAmount,
      debtAmount,
      selectedEquityPercent,
      selectedDebtPercent: 100 - selectedEquityPercent,
      actualEquityPercent,
      actualDebtPercent,
      annualDebtInterestRatePercent: safeInterestRatePercent,
      investmentPeriodYears: safePeriodYears,
      futureGroupValuation: safeFutureGroupValuation,
      ctsPreMoneyValuation: CTS_PRE_MONEY_VALUATION,
      ctsOwnershipPercent: Number.isFinite(ctsOwnership) ? ctsOwnership * 100 : 0,
      indirectGroupOwnershipPercent: Number.isFinite(indirectGroupOwnership) ? indirectGroupOwnership * 100 : 0,
      futureEquityValue,
      debtInterestReturn,
      debtTotalReturn,
      totalProjectedReturn,
      totalGain,
      returnMultiple,
      annualizedReturnPercent: Number.isFinite(annualizedReturn) ? annualizedReturn * 100 : 0
    }
  }, [annualDebtInterestRate, equitySplitPercent, futureGroupValuation, investmentPeriodYears, totalInvestmentAmount])

  const handleTotalInvestmentAmountChange = (value) => {
    if (String(value).trim() === '') {
      setTotalInvestmentAmount('')
      return
    }

    setTotalInvestmentAmount(value)
  }

  const handleFutureGroupValuationChange = (value) => {
    if (String(value).trim() === '') {
      setFutureGroupValuation('')
      return
    }

    const parsedValue = Number(value)
    if (Number.isFinite(parsedValue) && parsedValue > MAX_FUTURE_GROUP_VALUATION_USD) {
      setFutureGroupValuation(String(MAX_FUTURE_GROUP_VALUATION_USD))
      return
    }

    setFutureGroupValuation(value)
  }

  const handleReset = () => {
    setTotalInvestmentAmount(String(DEFAULT_TOTAL_INVESTMENT_USD))
    setEquitySplitPercent(DEFAULT_EQUITY_ALLOCATION_PERCENT)
    setAnnualDebtInterestRate(DEFAULT_DEBT_INTEREST_RATE_PERCENT)
    setInvestmentPeriodYears(DEFAULT_INVESTMENT_PERIOD_YEARS)
    setFutureGroupValuation(String(DEFAULT_FUTURE_GROUP_VALUATION_USD))
  }

  const visibleResult = result.hasValidInvestment
  const totalSliderValue = result.hasValidInvestment
    ? clamp(result.totalInvestmentAmount, MIN_TOTAL_INVESTMENT_USD, MAX_TOTAL_RAISE_USD)
    : DEFAULT_TOTAL_INVESTMENT_USD
  const futureValuationSliderValue = clamp(safeNumber(futureGroupValuation, DEFAULT_FUTURE_GROUP_VALUATION_USD), CURRENT_GROUP_VALUATION_USD, MAX_FUTURE_GROUP_VALUATION_USD)
  const totalHelperText = result.hasValidInvestment
    ? `Current total ticket: ${formatUSD(result.totalInvestmentAmount)}`
    : 'Enter a total investment amount to calculate the scenario.'

  return (
    <section id='calculator' className='calculator-section'>
      <div className='calculator-heading'>
        <span className='calculator-kicker'>Equity / Debt / ROI simulator</span>
        <h2>Indicative ROI & Ownership Calculator</h2>
        <p className='calculation-label'>Indicative only | Non-binding | Subject to final documentation</p>
      </div>

      <div className='calculator-shell' role='region' aria-label='Indicative equity debt ROI simulator'>
        <div className='calculator-input-column'>
          <article className='calculator-card input-card'>
            <div className='calculator-card-header'>
              <div>
                <p className='calculator-card-eyebrow'>Scenario inputs</p>
                <h3>Build the investment ticket</h3>
              </div>
              <strong>{visibleResult ? formatUSD(result.totalInvestmentAmount) : 'USD —'}</strong>
            </div>

            <label className='field-card investment-field'>
              <span>Total Investment Ticket Amount in USD</span>
              <input
                type='number'
                min={MIN_TOTAL_INVESTMENT_USD}
                max={MAX_TOTAL_RAISE_USD}
                step={INVESTMENT_STEP_USD}
                inputMode='decimal'
                value={totalInvestmentAmount}
                placeholder='125000'
                onChange={(event) => handleTotalInvestmentAmountChange(event.target.value)}
              />
              <small>Minimum {formatUSD(MIN_TOTAL_INVESTMENT_USD)}. Current total raise scenario is capped at {formatUSD(MAX_TOTAL_RAISE_USD)}.</small>
            </label>

            <label className='slider-field'>
              <span className='slider-value'>{totalHelperText}</span>
              <input
                className='investment-slider'
                type='range'
                min={MIN_TOTAL_INVESTMENT_USD}
                max={MAX_TOTAL_RAISE_USD}
                step={INVESTMENT_STEP_USD}
                value={totalSliderValue}
                onChange={(event) => handleTotalInvestmentAmountChange(event.target.value)}
                aria-label='Total investment amount slider'
              />
              <span className='slider-limits'>
                <small>{formatUSD(MIN_TOTAL_INVESTMENT_USD)}</small>
                <small>{formatUSD(MAX_TOTAL_RAISE_USD)}</small>
              </span>
            </label>

            <div className='allocation-control'>
              <div className='allocation-control-header'>
                <span>Equity / Debt Split</span>
                <label>
                  <input
                    type='number'
                    min='0'
                    max='100'
                    step='1'
                    value={equitySplitPercent}
                    onChange={(event) => setEquitySplitPercent(clamp(safeNumber(event.target.value, 0), 0, 100))}
                    aria-label='Equity split percentage input'
                  />
                  <span>%</span>
                </label>
              </div>
              <input
                className='investment-slider allocation-slider'
                type='range'
                min='0'
                max='100'
                step='1'
                value={equitySplitPercent}
                onChange={(event) => setEquitySplitPercent(Number(event.target.value))}
                aria-label='Equity debt split slider'
              />
              <div className='allocation-split-bar' aria-hidden='true'>
                <span style={{ width: `${result.actualEquityPercent}%` }} />
              </div>
              <p>Debt allocation is automatically derived as {formatSplitPercent(result.selectedDebtPercent)} of the selected ticket before any equity cap adjustment.</p>
            </div>

            <div className='split-summary' aria-live='polite'>
              <div>
                <span>Equity: {formatSplitPercent(result.actualEquityPercent)} | {visibleResult ? formatUSD(result.equityAmount) : 'USD —'}</span>
                <strong>{visibleResult ? formatUSD(result.equityAmount) : 'USD —'}</strong>
                <small>{formatSplitPercent(result.actualEquityPercent)} of ticket</small>
              </div>
              <div>
                <span>Debt: {formatSplitPercent(result.actualDebtPercent)} | {visibleResult ? formatUSD(result.debtAmount) : 'USD —'}</span>
                <strong>{visibleResult ? formatUSD(result.debtAmount) : 'USD —'}</strong>
                <small>{formatSplitPercent(result.actualDebtPercent)} of ticket</small>
              </div>
            </div>

            <label className='field-card compact-input-field'>
              <span>Annual Interest Rate on Debt Portion</span>
              <input
                type='number'
                min={MIN_DEBT_INTEREST_RATE_PERCENT}
                max={MAX_DEBT_INTEREST_RATE_PERCENT}
                step={DEBT_INTEREST_STEP_PERCENT}
                value={annualDebtInterestRate}
                onChange={(event) => setAnnualDebtInterestRate(clamp(safeNumber(event.target.value, DEFAULT_DEBT_INTEREST_RATE_PERCENT), MIN_DEBT_INTEREST_RATE_PERCENT, MAX_DEBT_INTEREST_RATE_PERCENT))}
              />
              <input
                className='investment-slider'
                type='range'
                min={MIN_DEBT_INTEREST_RATE_PERCENT}
                max={MAX_DEBT_INTEREST_RATE_PERCENT}
                step={DEBT_INTEREST_STEP_PERCENT}
                value={annualDebtInterestRate}
                onChange={(event) => setAnnualDebtInterestRate(Number(event.target.value))}
                aria-label='Annual interest rate on debt portion slider'
              />
              <small>Simple interest modelled at {formatPercent(result.annualDebtInterestRatePercent, 2)} annually.</small>
            </label>

            <label className='field-card compact-input-field'>
              <span>Investment Period</span>
              <input
                type='range'
                min={MIN_INVESTMENT_PERIOD_YEARS}
                max={MAX_INVESTMENT_PERIOD_YEARS}
                step='1'
                value={investmentPeriodYears}
                onChange={(event) => setInvestmentPeriodYears(Number(event.target.value))}
                aria-label='Investment period slider'
                className='investment-slider'
              />
              <strong>{result.investmentPeriodYears} years</strong>
            </label>

            <label className='field-card compact-input-field'>
              <span>Future CODASOL Group Valuation</span>
              <input
                type='number'
                min={CURRENT_GROUP_VALUATION_USD}
                max={MAX_FUTURE_GROUP_VALUATION_USD}
                step={FUTURE_VALUATION_STEP_USD}
                inputMode='decimal'
                value={futureGroupValuation}
                onChange={(event) => handleFutureGroupValuationChange(event.target.value)}
              />
              <strong className='formatted-current-value'>Current future valuation: {formatUSD(result.futureGroupValuation)}</strong>
              <input
                className='investment-slider'
                type='range'
                min={CURRENT_GROUP_VALUATION_USD}
                max={MAX_FUTURE_GROUP_VALUATION_USD}
                step={FUTURE_VALUATION_STEP_USD}
                value={futureValuationSliderValue}
                onChange={(event) => handleFutureGroupValuationChange(event.target.value)}
                aria-label='Future CODASOL Group valuation slider'
              />
              <small>Starting reference valuation: {formatUSD(CURRENT_GROUP_VALUATION_USD)} in 2025.</small>
            </label>

            <div className='calculator-warnings' aria-live='polite'>
              {!visibleResult ? <p className='calculator-note'>Enter a total investment amount to calculate the scenario.</p> : null}
              {result.isCappedAtMaximum ? <p className='calculator-note'>Maximum total raise assumption is {formatUSD(MAX_TOTAL_RAISE_USD)}.</p> : null}
              {result.isEquityCapped ? <p className='calculator-note'>Maximum equity allocation is {formatUSD(MAX_EQUITY_RAISE_USD)} under the current raise structure.</p> : null}
              {result.isDebtAboveRaiseAssumption ? <p className='calculator-note'>Debt allocation exceeds the current {formatUSD(MAX_DEBT_RAISE_USD)} debt raise assumption.</p> : null}
              {result.isFutureValuationBelowReference ? <p className='calculator-note'>Future valuation is below the 2025 reference valuation assumption.</p> : null}
            </div>

            <div className='calculator-actions'>
              <button className='btn btn-secondary' type='button' onClick={handleReset}>Reset scenario</button>
              <a className='btn btn-primary' href={mailto}>Request NDA Deck</a>
            </div>
          </article>

          <div className='assumptions-drawer calculator-card fixed-assumptions'>
            <div className='fixed-assumptions-header'>Fixed assumptions</div>
            <div className='assumptions-grid'>
              <div className='assumption-item'>
                <span>2025 group reference valuation</span>
                <strong>{formatUSD(CURRENT_GROUP_VALUATION_USD)}</strong>
              </div>
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
                <span>Derived CTS pre-money valuation</span>
                <strong>{formatUSD(result.ctsPreMoneyValuation)}</strong>
              </div>
              <div className='assumption-item'>
                <span>CTS ownership in CODASOL Group</span>
                <strong>{formatPercent(CTS_GROUP_OWNERSHIP * 100, 2)}</strong>
              </div>
            </div>
          </div>
        </div>

        <div className='calculator-result-column'>
          <article className='result-card result-card-large roi-result-panel' aria-live='polite'>
            <p className='result-eyebrow'>Total Projected Return</p>
            {visibleResult ? (
              <>
                <h3>{formatUSD(result.totalProjectedReturn)}</h3>
                <div className='roi-hero-metrics'>
                  <div>
                    <span>Return multiple</span>
                    <strong>{formatMultiple(result.returnMultiple)}</strong>
                  </div>
                  <div>
                    <span>Indicative annualized return</span>
                    <strong>{formatPercent(result.annualizedReturnPercent, 2)}</strong>
                  </div>
                </div>
                <div className='result-details roi-result-details'>
                  <div>
                    <span>Total Investment</span>
                    <strong>{formatUSD(result.totalInvestmentAmount)}</strong>
                  </div>
                  <div>
                    <span>Equity Portion</span>
                    <strong>{formatUSD(result.equityAmount)}</strong>
                    <small>{formatSplitPercent(result.actualEquityPercent)} of ticket</small>
                  </div>
                  <div>
                    <span>Debt Portion</span>
                    <strong>{formatUSD(result.debtAmount)}</strong>
                    <small>{formatSplitPercent(result.actualDebtPercent)} of ticket</small>
                  </div>
                  <div>
                    <span>Indicative CTS Ownership</span>
                    <strong>{formatPercent(result.ctsOwnershipPercent)}</strong>
                  </div>
                  <div>
                    <span>Indicative CODASOL Group Ownership</span>
                    <strong>{formatPercent(result.indirectGroupOwnershipPercent)}</strong>
                  </div>
                  <div>
                    <span>Future Equity Value</span>
                    <strong>{formatUSD(result.futureEquityValue)}</strong>
                  </div>
                  <div className='debt-return-card'>
                    <span>Debt Return</span>
                    <strong>{formatUSD(result.debtTotalReturn)}</strong>
                    <small>Principal: {formatUSD(result.debtAmount)}</small>
                    <small>Interest: {formatUSD(result.debtInterestReturn)}</small>
                    <small>Total debt return: {formatUSD(result.debtTotalReturn)}</small>
                  </div>
                  <div>
                    <span>Total Gain</span>
                    <strong>{formatUSD(result.totalGain)}</strong>
                  </div>
                </div>
              </>
            ) : (
              <p className='empty-result'>Enter a total investment amount to calculate the scenario.</p>
            )}
          </article>

          <div className='calculator-explanation'>
            <p>Ownership is calculated only on the equity portion of the investment. The debt portion is modelled separately and does not create ownership.</p>
            <p>Future equity value responds to the future CODASOL Group valuation input, while the debt return responds to the selected simple-interest rate and period.</p>
          </div>
        </div>
      </div>

      <div className='legal-note calculator-legal-note'>
        <p>This calculator is for indicative scenario modelling only. Ownership is calculated only on the equity portion of the investment. The debt portion does not create ownership and is modelled using simple interest. Final ownership, valuation, interest rate, repayment terms, investor rights, allocation, and legal structure are subject to final documentation and approval.</p>
        <p>Future valuation inputs are illustrative and do not represent a guarantee, forecast, or commitment.</p>
      </div>
    </section>
  )
}

export default function App() {
  const [logoLoadError, setLogoLoadError] = useState(false)
  const [isAssistantModalOpen, setIsAssistantModalOpen] = useState(false)
  const [activeInvestorTopic, setActiveInvestorTopic] = useState(null)
  const selectedInvestorTopic = activeInvestorTopic ? investorTopics[activeInvestorTopic] : null

  const handleOpenTopic = (topicId) => {
    setActiveInvestorTopic(topicId)
  }


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
            <HeaderWebsiteButton />
            <InvestorAssistantLauncher onOpen={() => setIsAssistantModalOpen(true)} isOpen={isAssistantModalOpen} />
            <HeaderWhatsAppButton />
          </div>
        </div>
        <p className='pill'>Stage 1 Investor Introduction · Non-NDA</p>
        <h1>CODASOL Investor Introduction Portal</h1>
        <p className='hero-sub'>CODASOL converts 15+ years of industrial data knowledge into scalable AI-MDM intelligence for asset-intensive enterprises.</p>
        <div className='hero-actions'>
          <a className='btn btn-primary' href='#investment'>View Investment Overview</a>
          <a className='btn btn-secondary' href='#team'>Meet the Team</a>
          <a className='btn btn-secondary' href='#calculator'>ROI Calculator</a>
          <a className='btn btn-secondary' href={mailto}>Request NDA Deck</a>
          <div className="hero-knowledge-block">
            <div className="hero-knowledge-label">Explore CODASOL</div>
            <div className="hero-knowledge-buttons">
              <button className="btn btn-secondary knowledge-hero-btn" type="button" onClick={() => handleOpenTopic('about')}>About CODA</button>
              <button className="btn btn-secondary knowledge-hero-btn" type="button" onClick={() => handleOpenTopic('challenge')}>Challenge</button>
              <button className="btn btn-secondary knowledge-hero-btn" type="button" onClick={() => handleOpenTopic('industries')}>Industries</button>
              <button className="btn btn-secondary knowledge-hero-btn" type="button" onClick={() => handleOpenTopic('customers')}>Customers</button>
              <button className="btn btn-secondary knowledge-hero-btn" type="button" onClick={() => handleOpenTopic('partners')}>Partners</button>
              <button className="btn btn-secondary knowledge-hero-btn" type="button" onClick={() => handleOpenTopic('future')}>CODA-AI</button>
            </div>
            <div className="hero-version-marker">Investor Portal UI v48</div>
          </div>
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
              <h3>USD 3,900,000</h3>
              <p>Orderly shareholder payout for selected early shareholders whose investment horizon has been reached.</p>
            </article>
            <article className='card fund'>
              <h3>USD 3,900,000</h3>
              <p>Growth and transformation funding, including working capital and CODA-AI acceleration.</p>
            </article>
          </div>
          <p className='note'>This is teaser-level information only and is not an offer, commitment, or recommendation.</p>
        </section>

        <GroupStructure />

        <InvestmentReturnCalculator />

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

      <InvestorAssistantModal isOpen={isAssistantModalOpen} onClose={() => setIsAssistantModalOpen(false)} />
      <InvestorTopicModal topic={selectedInvestorTopic} onClose={() => setActiveInvestorTopic(null)} />

      <a className='sticky-cta' href={mailto}>Request NDA Deck</a>
    </div>
  )
}
