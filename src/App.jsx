import { useEffect, useMemo, useState } from 'react'

const metricsData = [
  { label: 'Years of industrial data experience', value: 15, suffix: '+' },
  { label: 'Completed projects', value: 100, suffix: '+' },
  { label: 'Material master records exposure', value: 100, suffix: 'M+' },
  { label: 'Asset records exposure', value: 20, suffix: 'M+' },
  { label: 'Supplier, Bill of Materials, service, and operational records exposure', value: 10, suffix: 'M+' }
]
const faqData = [
  { q: 'Does 1% in CTS mean 1% in CODASOL Group?', a: 'No. Ownership through CTS is indirect. The calculator shows the indicative relationship based on current working assumptions.' },
  { q: 'Are the calculator results binding?', a: 'No. The calculator is indicative only and subject to final legal and financial documentation.' }
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
const defaultAssumptions = { preMoney: 10000000, ctsOwnership: 23.46 }

export default function App() {
  const mailto = 'mailto:investor@codasol.com?subject=CODASOL%20Investor%20Deck%20Request'
  const [openFaq, setOpenFaq] = useState(0)
  const [selectedMember, setSelectedMember] = useState(null)
  const [mode, setMode] = useState('percent')
  const [ctsPercent, setCtsPercent] = useState(1)
  const [investment, setInvestment] = useState(1000000)
  const [assumptions, setAssumptions] = useState(defaultAssumptions)
  const [advancedOpen, setAdvancedOpen] = useState(false)
  const [counts, setCounts] = useState(metricsData.map(() => 0))

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return undefined

    const ob = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && e.target.classList.add('in-view')), { threshold: 0.14 })
    document.querySelectorAll('.reveal').forEach((el) => ob.observe(el))
    return () => ob.disconnect()
  }, [])
  useEffect(() => {
    let raf
    const start = performance.now()
    const step = (t) => {
      const p = Math.min(1, (t - start) / 1300)
      setCounts(metricsData.map((m) => Math.round(m.value * p)))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [])
  useEffect(() => {
    const onEsc = (e) => e.key === 'Escape' && setSelectedMember(null)
    window.addEventListener('keydown', onEsc)
    return () => window.removeEventListener('keydown', onEsc)
  }, [])

  const indirect = useMemo(() => {
    const ctsOwn = assumptions.ctsOwnership / 100
    if (mode === 'percent') return ((ctsPercent / 100) * ctsOwn * 100)
    return ((investment / (assumptions.preMoney + investment)) * ctsOwn * 100)
  }, [mode, ctsPercent, investment, assumptions])

  return (
    <div className='app'>
      <div className='bg-grid' />
      <header className='hero'>
        <div className='logo-top'>CODA</div>
        <p className='pill'>Stage 1 Investor Introduction · Non-NDA</p>
        <h1>CODASOL converts 15+ years of industrial data knowledge into scalable AI-MDM intelligence.</h1>
        <p className='hero-sub'>A premium investor teaser showcasing the transition from industrial MDM project depth to platform-driven, AI-enabled recurring value.</p>
        <div className='hero-actions'>
          <a className='btn btn-primary' href='#funding'>View Investment Summary</a>
          <a className='btn btn-secondary' href='#team'>Meet the Team</a>
          <a className='btn btn-secondary' href='#calculator'>Ownership Calculator</a>
          <a className='btn btn-secondary' href={mailto}>Request NDA Deck</a>
        </div>
      </header>

      <main className='container'>
        <section className='reveal'>
          <h2>The Problem</h2>
          <p>Poor industrial master data creates procurement, maintenance, inventory, compliance, operational, and AI-readiness issues.</p>
        </section>

        <section className='reveal'>
          <h2>CODASOL Substance</h2>
          <div className='grid metrics'>
            {metricsData.map((m, i) => (
              <article className='card' key={m.label}>
                <h3>{counts[i]}{m.suffix}</h3>
                <p>{m.label}</p>
              </article>
            ))}
          </div>
          <p>Metrics reflect exposure to / processed records only.</p>
        </section>

        <section className='reveal' id='funding'>
          <h2>Fundraise and Use of Funds</h2>
          <div className='grid two'>
            <article className='card'>
              <h3>USD 3.9M</h3>
              <p>Orderly shareholder payout for selected early shareholders whose investment horizon has been reached.</p>
            </article>
            <article className='card'>
              <h3>USD 3.9M</h3>
              <p>Growth and transformation funding, including working capital and CODA-AI acceleration.</p>
            </article>
          </div>
        </section>

        <section className='reveal' id='calculator'>
          <h2>Indicative Ownership Calculator</h2>
          <p>Indicative only | Non-binding | Subject to final legal and financial documentation</p>
          <div className='hero-actions'>
            <button className='btn btn-secondary' onClick={() => setMode('percent')}>I know my CTS %</button>
            <button className='btn btn-secondary' onClick={() => setMode('amount')}>I know my investment amount</button>
          </div>
          {mode === 'percent'
            ? <input type='range' min='0' max='25' step='0.01' value={ctsPercent} onChange={(e) => setCtsPercent(Number(e.target.value))} />
            : <input type='number' value={investment} onChange={(e) => setInvestment(Number(e.target.value) || 0)} />}
          <button className='btn btn-secondary' onClick={() => setAdvancedOpen(!advancedOpen)}>Advanced assumptions</button>
          {advancedOpen && (
            <div>
              <input type='number' value={assumptions.preMoney} onChange={(e) => setAssumptions({ ...assumptions, preMoney: Number(e.target.value) || 0 })} />
              <input type='number' value={assumptions.ctsOwnership} step='0.01' onChange={(e) => setAssumptions({ ...assumptions, ctsOwnership: Number(e.target.value) || 0 })} />
            </div>
          )}
          <h3>{indirect.toFixed(4)}% indirect ownership in CODASOL Group</h3>
        </section>

        <section className='team-section' id='team'>
          <div className='team-heading'>
            <p className='pill'>Stage 1 investor teaser</p>
            <h2>Leadership & Advisory Team</h2>
            <p className='team-intro'>CODASOL combines industrial data expertise, governance experience, operational delivery capability, and strategic investor readiness.</p>
          </div>
          <div className='team-grid' aria-label='Leadership and advisory team members'>
            {teamData.map((person) => {
              const initials = person.name
                .split(' ')
                .filter(Boolean)
                .map((namePart) => namePart[0])
                .slice(0, 2)
                .join('')

              return (
                <article className='team-card' key={person.name}>
                  <div className='team-avatar' aria-hidden='true'>{initials}</div>
                  <div className='team-card-copy'>
                    <h3>{person.name}</h3>
                    <p className='team-role'>{person.role}</p>
                    <p className='team-short-bio'>{person.shortBio}</p>
                  </div>
                  <div className='team-actions'>
                    <button className='btn btn-secondary' type='button' onClick={() => setSelectedMember(person)}>View Bio</button>
                    {person.profileUrl
                      ? (
                        <a className='btn btn-primary' href={person.profileUrl} target='_blank' rel='noopener noreferrer'>
                          {person.profileLabel}
                        </a>
                        )
                      : <span className='btn btn-disabled' aria-disabled='true'>{person.profileLabel}</span>}
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        <section className='reveal'>
          <h2>FAQ</h2>
          {faqData.map((f, i) => (
            <article className='faq-item' key={f.q}>
              <button onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>{f.q}</button>
              {openFaq === i && <p>{f.a}</p>}
            </article>
          ))}
        </section>
      </main>

      <a className='sticky-cta' href={mailto}>Request NDA Deck</a>
      {selectedMember && (
        <div className='modal-backdrop bio-modal' onClick={() => setSelectedMember(null)}>
          <div className='modal bio-modal-panel' role='dialog' aria-modal='true' aria-labelledby='bio-modal-title' onClick={(e) => e.stopPropagation()}>
            <button className='bio-modal-close' type='button' aria-label='Close bio modal' onClick={() => setSelectedMember(null)}>×</button>
            <p className='pill'>Long bio</p>
            <h3 id='bio-modal-title'>{selectedMember.name}</h3>
            <p className='team-role'>{selectedMember.role}</p>
            <p>{selectedMember.longBio}</p>
          </div>
        </div>
      )}
    </div>
  )
}
