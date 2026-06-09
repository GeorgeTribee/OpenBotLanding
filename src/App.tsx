import { useState, useEffect } from 'react'
import { AgentComposer, REGISTRY_URL, type Registry } from './components/AgentComposer'
import { AgentCarousel } from './components/AgentCarousel'
import TermsPage from './TermsPage'
import PrivacyPage from './PrivacyPage'
import AboutPage from './AboutPage'
import CharterPage from './CharterPage'
import FoundationPage from './FoundationPage'
import CareersPage from './CareersPage'
import BrandPage from './BrandPage'
import { Button } from '@/components/ui/button'
import { SiDiscord } from 'react-icons/si'
import openbotLogo from './assets/openbotlogo.svg'

const DOCS_URL = 'https://docs.getopenbot.com'

const pricingPlans = [
  {
    name: 'Free',
    price: { monthly: 0, yearly: 0 },
    desc: 'Try OpenBot with your own API key.',
    features: ['Bring your own API key', '3 agents', '100 tasks / month', '1 AI model', 'Basic integrations', 'Community support'],
    cta: 'Get Started',
    highlighted: false,
  },
  {
    name: 'Plus',
    price: { monthly: 20, yearly: 16 },
    desc: 'For individuals getting started with automation.',
    features: ['5 agents', '300 tasks / month', '3 AI models', '20+ integrations', 'Community support'],
    cta: 'Buy Plus',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: { monthly: 60, yearly: 48 },
    desc: 'For individuals who need more power.',
    features: ['10 agents', '1,000 tasks / month', 'All AI models', '50+ integrations', 'Persistent memory', 'Email support'],
    cta: 'Buy Pro',
    highlighted: true,
  },
  {
    name: 'Max',
    price: { monthly: 200, yearly: 160 },
    desc: 'For power users and small teams.',
    features: ['Unlimited agents', '10,000 tasks / month', 'All AI models', '100+ integrations', 'Persistent memory', 'Custom agents', 'Advanced workflows', 'Priority support'],
    cta: 'Buy Max',
    highlighted: false,
  },
  {
    name: 'Enterprise',
    price: { monthly: null, yearly: null },
    desc: 'For teams that need full control.',
    features: ['Unlimited everything', 'Custom integrations', 'SSO & audit logs', 'On-premise option', 'SLA guarantee', 'Dedicated support'],
    cta: 'Contact Us',
    highlighted: false,
  },
]

function EnterpriseModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' })
  const [sent, setSent] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
    }
  }, [onClose])

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-2xl p-8"
        style={{ background: '#0f0f0f', border: '1px solid rgba(255,255,255,0.1)' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Close */}
        <button onClick={onClose} className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors cursor-pointer">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        {!sent ? (
          <>
            <p className="text-xs font-semibold tracking-[0.3em] text-zinc-600 uppercase mb-2">Enterprise</p>
            <h2 className="text-2xl font-bold mb-1">Let's talk.</h2>
            <p className="text-zinc-400 text-sm mb-6">Tell us about your team and we'll get back to you within 24 hours.</p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-zinc-500">Name</label>
                  <input
                    required
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="Jane Smith"
                    className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-600 outline-none focus:border-white transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-zinc-500">Company</label>
                  <input
                    value={form.company}
                    onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                    placeholder="Acme Inc."
                    className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-600 outline-none focus:border-white transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-zinc-500">Work email</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="jane@company.com"
                  className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-600 outline-none focus:border-white transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-zinc-500">Tell us about your use case</label>
                <textarea
                  rows={3}
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  placeholder="Team size, what you'd like to automate..."
                  className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-600 outline-none focus:border-white transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-full py-2.5 text-sm font-medium transition-all cursor-pointer mt-1"
                style={{ background: '#fff', color: '#000' }}
              >
                Send message
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-6">
            <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            </div>
            <h2 className="text-xl font-bold mb-2">Message sent!</h2>
            <p className="text-zinc-400 text-sm mb-6">We'll get back to you within 24 hours.</p>
            <button onClick={onClose} className="text-sm text-zinc-500 hover:text-white transition-colors cursor-pointer">Close</button>
          </div>
        )}
      </div>
    </div>
  )
}

export function PricingSection() {
  const [yearly, setYearly] = useState(false)
  const [displayYearly, setDisplayYearly] = useState(false)
  const [priceOpacity, setPriceOpacity] = useState(1)
  const [showEnterpriseModal, setShowEnterpriseModal] = useState(false)

  const handleToggle = (val: boolean) => {
    if (val === yearly) return
    setYearly(val)
    setPriceOpacity(0)
    setTimeout(() => {
      setDisplayYearly(val)
      setPriceOpacity(1)
    }, 140)
  }

  return (
    <section id="pricing" className="container mx-auto px-6 py-12 md:py-20">
      <div className="text-center mb-12">
        <p className="text-xs font-semibold tracking-[0.3em] text-zinc-700 uppercase mb-4">Pricing</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-3">Simple, transparent pricing.</h2>
        <p className="text-zinc-400 text-base mb-6">Start free. Scale as you grow.</p>
        <div className="inline-flex items-center gap-3">
          <div className="relative inline-flex items-center bg-zinc-900 border border-zinc-800 rounded-full p-1">
            <div
              className="absolute top-1 bottom-1 rounded-full bg-white"
              style={{
                width: 'calc(50% - 4px)',
                left: yearly ? 'calc(50% + 2px)' : '4px',
                transition: 'left 0.28s cubic-bezier(0.4,0,0.2,1)',
              }}
            />
            <button onClick={() => handleToggle(false)} className={`relative z-10 text-sm px-4 py-1.5 rounded-full cursor-pointer transition-colors duration-200 ${!yearly ? 'text-black font-medium' : 'text-zinc-400'}`}>Monthly</button>
            <button onClick={() => handleToggle(true)} className={`relative z-10 text-sm px-4 py-1.5 rounded-full cursor-pointer transition-colors duration-200 ${yearly ? 'text-black font-medium' : 'text-zinc-400'}`}>Yearly</button>
          </div>
          <span
            className="text-xs text-emerald-400 font-medium"
            style={{
              opacity: yearly ? 1 : 0,
              transform: yearly ? 'translateX(0)' : 'translateX(-6px)',
              transition: 'opacity 0.25s ease, transform 0.25s ease',
              pointerEvents: 'none',
            }}
          >Save 20%</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 max-w-7xl mx-auto">
        {pricingPlans.map((plan) => (
          <div
            key={plan.name}
            className="relative flex flex-col rounded-2xl p-6"
            style={{
              background: plan.highlighted ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.02)',
              border: plan.highlighted ? '1px solid rgba(255,255,255,0.3)' : '1px solid rgba(255,255,255,0.07)',
            }}
          >
            {plan.highlighted && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-white text-black text-xs font-semibold px-3 py-1 rounded-full">Most Popular</span>
              </div>
            )}

            <p className="text-xs font-semibold tracking-widest text-zinc-500 uppercase mb-3">{plan.name}</p>

            <div className="mb-3" style={{ opacity: priceOpacity, transition: 'opacity 0.14s ease' }}>
              {plan.price.monthly === null ? (
                <span className="text-3xl font-bold text-white">Custom</span>
              ) : (
                <>
                  <span className="text-3xl font-bold text-white">${displayYearly ? plan.price.yearly : plan.price.monthly}</span>
                  <span className="text-zinc-500 text-sm ml-1">/ mo</span>
                </>
              )}
            </div>

            <p className="text-zinc-500 text-sm mb-5 leading-relaxed">{plan.desc}</p>

            <ul className="flex flex-col gap-2.5 mb-6 flex-1">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-zinc-300">
                  <svg className="w-4 h-4 text-white shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  {f}
                </li>
              ))}
            </ul>

            <button
              onClick={() => plan.name === 'Enterprise' && setShowEnterpriseModal(true)}
              className="w-full rounded-full py-2.5 text-sm font-medium transition-all cursor-pointer"
              style={plan.highlighted
                ? { background: '#fff', color: '#000' }
                : { background: 'rgba(255,255,255,0.06)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }
              }
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>

      {showEnterpriseModal && <EnterpriseModal onClose={() => setShowEnterpriseModal(false)} />}
    </section>
  )
}

export function AppMockup() {
  const [activeThread, setActiveThread] = useState('coding')
  const [inputText, setInputText] = useState('')
  const [showLeft, setShowLeft] = useState(true)
  const [showRight, setShowRight] = useState(true)
  const [activeRightTab, setActiveRightTab] = useState<'Specification' | 'State' | 'Files'>('Specification')

  const font = '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", sans-serif'
  const mono = '"SF Mono", "Fira Code", "Cascadia Code", monospace'
  const iconBtn: React.CSSProperties = { background: 'none', border: 'none', cursor: 'pointer', color: '#555', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3px 5px', borderRadius: 4 }

  type DiffLine = { type: string; code: string }
  type DiffFile = { name: string; added: number; removed: number; lines: DiffLine[] }
  type StateRow = { label: string; value: string; color?: string }
  type PanelData = {
    spec: { title: string; points: string[] } | null
    state: StateRow[] | null
    files: DiffFile[]
  }

  const panelData: Record<string, PanelData> = {
    coding: {
      spec: {
        title: 'Fix auth null-token bug',
        points: [
          'Replace null check with empty string guard',
          'Return structured { valid, reason } error object',
          'Update validateSession() unit tests',
          'Open PR against main branch',
        ],
      },
      state: [
        { label: 'Status', value: 'Completed', color: '#4ade80' },
        { label: 'Agent', value: '@codex' },
        { label: 'Files changed', value: '2' },
        { label: 'Lines added', value: '+5', color: '#4ade80' },
        { label: 'Lines removed', value: '-3', color: '#f87171' },
        { label: 'PR', value: '#47 fix/auth-null-token', color: '#818cf8' },
      ],
      files: [
        {
          name: 'src/auth.ts', added: 4, removed: 2,
          lines: [
            { type: 'ctx', code: 'export function validateSession(token: string) {' },
            { type: 'del', code: '  if (token === null) {' },
            { type: 'del', code: '    return false;' },
            { type: 'add', code: '  if (!token || token.trim() === \'\') {' },
            { type: 'add', code: '    return { valid: false, reason: \'missing_token\' };' },
            { type: 'ctx', code: '  }' },
            { type: 'ctx', code: '  return verifyJWT(token);' },
            { type: 'ctx', code: '}' },
          ],
        },
        {
          name: 'src/auth.test.ts', added: 1, removed: 1,
          lines: [
            { type: 'ctx', code: 'describe(\'validateSession\', () => {' },
            { type: 'del', code: '  it(\'returns false for null\', () => {' },
            { type: 'add', code: '  it(\'returns false for missing token\', () => {' },
            { type: 'ctx', code: '    expect(validateSession(null)).toBe(false);' },
            { type: 'ctx', code: '  });' },
            { type: 'ctx', code: '});' },
          ],
        },
      ],
    },
    browser: {
      spec: {
        title: 'Browser agent tasks',
        points: [
          'Play "Blinding Lights" by The Weeknd on Spotify',
          'Find cheapest NYC → Paris round-trip flights',
          'Compare results across Google Flights & Kayak',
          'Return best deal with booking link',
        ],
      },
      state: [
        { label: 'Status', value: 'Completed', color: '#4ade80' },
        { label: 'Agent', value: '/browser' },
        { label: 'Spotify', value: 'Now playing ♫', color: '#1db954' },
        { label: 'Best flight', value: 'Air France $389', color: '#4ade80' },
        { label: 'Departure', value: 'Fri 22:10 JFK → CDG' },
        { label: 'Return', value: 'Sun 18:40 CDG → JFK' },
      ],
      files: [],
    },
    research: {
      spec: {
        title: 'Byzantine Empire — fall research',
        points: [
          'Key causes of the fall (economic, military, political)',
          'Timeline from 1204 Crusader sack to 1453 siege',
          'Modern historical consensus across scholars',
          'Academic papers via @exa (Gibbon, Norwich, Ostrogorsky)',
          'Web synthesis via @perplexity',
        ],
      },
      state: [
        { label: 'Status', value: 'Completed', color: '#4ade80' },
        { label: 'Agents', value: '@perplexity + @exa' },
        { label: 'Web sources', value: '8' },
        { label: 'Academic papers', value: '12' },
        { label: 'Key themes', value: '3 identified' },
        { label: 'Output', value: 'research/byzantine.md', color: '#a78bfa' },
      ],
      files: [
        {
          name: 'research/byzantine.md', added: 9, removed: 0,
          lines: [
            { type: 'add', code: '# Fall of the Byzantine Empire' },
            { type: 'add', code: '' },
            { type: 'add', code: '## Key Causes' },
            { type: 'add', code: '- Economic exhaustion & trade loss' },
            { type: 'add', code: '- Territorial erosion (Crusades + Turks)' },
            { type: 'add', code: '- Succession crises & civil wars' },
            { type: 'add', code: '' },
            { type: 'add', code: '## Final Event' },
            { type: 'add', code: '1453 — Ottoman siege under Mehmed II' },
          ],
        },
      ],
    },
    general: {
      spec: null,
      state: null,
      files: [],
    },
  }

  return (
    <div style={{ background: '#0a0a0a', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden', fontFamily: font }}>

      {/* macOS title bar */}
      <div style={{ height: 40, background: '#111', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', padding: '0 14px' }}>
        <div style={{ display: 'flex', gap: 6, marginRight: 14 }}>
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f57' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#febc2e' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#28c840' }} />
        </div>
        <span style={{ color: '#555', fontSize: 12.5, margin: '0 auto' }}>openbot.one</span>
      </div>

      {/* Body */}
      <div style={{ display: 'flex', height: 660 }}>

        {/* Sidebar — OpenBot style */}
        <div style={{ width: showLeft ? 240 : 0, overflow: 'hidden', transition: 'width 0.25s ease', background: '#0a0a0a', borderRight: showLeft ? '1px solid rgba(255,255,255,0.07)' : 'none', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>

          {/* Top: workspace */}
          <div style={{ height: 46, padding: '0 14px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: 9 }}>
            <img src={openbotLogo} alt="" style={{ width: 22, height: 22 }} />
            <span style={{ color: '#e0e0e0', fontSize: 13.5, fontWeight: 500 }}>GeorgeTribee</span>
            <svg width="11" height="11" fill="none" stroke="#555" strokeWidth="2.2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" /></svg>
            <button style={{ ...iconBtn, marginLeft: 'auto' }}>
              <svg width="15" height="15" fill="none" stroke="#666" strokeWidth="1.8" viewBox="0 0 24 24">
                <line x1="3" y1="7" x2="21" y2="7" strokeLinecap="round" />
                <circle cx="8" cy="7" r="2.5" fill="#0a0a0a" stroke="#666" strokeWidth="1.8" />
                <line x1="3" y1="17" x2="21" y2="17" strokeLinecap="round" />
                <circle cx="16" cy="17" r="2.5" fill="#0a0a0a" stroke="#666" strokeWidth="1.8" />
              </svg>
            </button>
          </div>
          {/* Channels */}
          <div style={{ flex: 1, padding: '10px 8px', overflowY: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 6px', marginBottom: 6 }}>
              <span style={{ fontSize: 10.5, color: '#3a3a3a', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600 }}>Channels</span>
              <button style={{ ...iconBtn, color: '#3a3a3a', fontSize: 16, lineHeight: 1 }}>+</button>
            </div>
            {['general', 'research', 'coding', 'browser'].map(ch => (
              <button key={ch} onClick={() => setActiveThread(ch)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 7, width: '100%', textAlign: 'left', padding: '5px 8px', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 13,
                  color: activeThread === ch ? '#fff' : '#555',
                  background: activeThread === ch ? 'rgba(255,255,255,0.09)' : 'none',
                }}>
                <span style={{ color: activeThread === ch ? '#888' : '#3a3a3a' }}>#</span>{ch}
              </button>
            ))}
          </div>
          {/* User row */}
          <div style={{ padding: '10px 12px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: 9 }}>
            <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <img src={openbotLogo} alt="" style={{ width: 14, height: 14 }} />
            </div>
            <span style={{ color: '#888', fontSize: 12.5, flex: 1 }}>Giorgi Daraselia</span>
            <svg width="11" height="11" fill="none" stroke="#444" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" /></svg>
          </div>
        </div>

        {/* Chat column */}
        <div style={{ flex: 1, background: '#080808', display: 'flex', flexDirection: 'column', borderRight: '1px solid rgba(255,255,255,0.06)', minWidth: 0 }}>
          {/* Channel sub-header */}
          <div style={{ height: 38, borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', padding: '0 12px', flexShrink: 0 }}>
            <button style={iconBtn} onClick={() => setShowLeft(v => !v)}>
              <svg width="14" height="14" fill="none" stroke={showLeft ? '#aaa' : '#555'} strokeWidth="1.7" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="18" rx="2" /><line x1="9" y1="3" x2="9" y2="21" /></svg>
            </button>
            <div style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.1)', margin: '0 10px' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ color: '#666', fontSize: 14 }}>#</span>
              <span style={{ color: '#bbb', fontSize: 13 }}>{activeThread}</span>
            </div>
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4 }}>
              <button style={iconBtn}>
                <svg width="14" height="14" fill="none" stroke="#555" strokeWidth="1.8" viewBox="0 0 24 24"><circle cx="5" cy="12" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /></svg>
              </button>
              <div style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.1)', margin: '0 6px' }} />
              <button style={iconBtn} onClick={() => setShowRight(v => !v)}>
                <svg width="14" height="14" fill="none" stroke={showRight ? '#aaa' : '#555'} strokeWidth="1.7" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="18" rx="2" /><line x1="15" y1="3" x2="15" y2="21" /></svg>
              </button>
            </div>
          </div>
          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '22px 28px 10px' }}>

            {/* ── coding ── */}
            {activeThread === 'coding' && <>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 18 }}>
                <div style={{ background: '#1e1e1e', borderRadius: 14, padding: '10px 14px', maxWidth: '80%', color: '#ddd', fontSize: 12.5, lineHeight: 1.55 }}>
                  <span style={{ color: '#818cf8', fontWeight: 500 }}>@codex</span> fix the auth bug in auth.ts,{' '}
                  <span style={{ color: '#34d399', fontWeight: 500 }}>@browser</span> find the error logs, then{' '}
                  <span style={{ color: '#e2e8f0', fontWeight: 500 }}>@github</span> open a PR
                </div>
              </div>
              <div style={{ fontSize: 12.5, lineHeight: 1.7, color: '#bbb' }}>
                <p style={{ marginBottom: 12 }}>I'll inspect the auth module, trace the bug from error logs, apply the fix, and open a pull request.</p>
                <div style={{ marginBottom: 5 }}><span style={{ color: '#777', fontWeight: 600 }}>Thought</span><span style={{ color: '#444' }}> 5s</span></div>
                <div style={{ marginBottom: 8 }}><span style={{ color: '#777', fontWeight: 600 }}>Explored</span><span style={{ color: '#444' }}> 4 files</span></div>
                {[
                  { label: 'Read', file: 'auth.ts' },
                  { label: 'Edited', file: 'auth.ts' },
                  { label: 'Edited', file: 'auth.test.ts' },
                  { label: 'Opened PR', file: 'fix/auth-null-token #47' },
                ].map(({ label, file }, i) => (
                  <div key={i} style={{ background: '#131313', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 7, padding: '7px 12px', marginBottom: 6, display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12 }}>
                    <span><span style={{ color: '#999', fontWeight: 600 }}>{label}</span><span style={{ color: '#555' }}>  {file}</span></span>
                    <span style={{ color: '#444' }}>✓</span>
                  </div>
                ))}
                <p style={{ color: '#bbb', marginTop: 10, fontSize: 12.5 }}>
                  Fixed null token check in <code style={{ background: '#1a1a1a', padding: '1px 5px', borderRadius: 3, fontSize: 11.5, color: '#a5b4fc', fontFamily: mono }}>validateSession()</code> — missing early return when token header absent. PR #47 open for review.
                </p>
              </div>
            </>}

            {/* ── browser ── */}
            {activeThread === 'browser' && <>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 18 }}>
                <div style={{ background: '#1e1e1e', borderRadius: 14, padding: '10px 14px', maxWidth: '80%', color: '#ddd', fontSize: 12.5, lineHeight: 1.55 }}>
                  <span style={{ color: '#34d399', fontWeight: 500 }}>/browser</span> play "Blinding Lights" by The Weeknd on Spotify
                </div>
              </div>
              <div style={{ fontSize: 12.5, lineHeight: 1.7, color: '#bbb', marginBottom: 22 }}>
                <p style={{ marginBottom: 10 }}>Opening Spotify and searching for the track…</p>
                {[
                  { label: 'Navigated', file: 'open.spotify.com' },
                  { label: 'Searched', file: '"Blinding Lights" — The Weeknd' },
                  { label: 'Clicked', file: 'Play button' },
                ].map(({ label, file }, i) => (
                  <div key={i} style={{ background: '#131313', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 7, padding: '7px 12px', marginBottom: 6, display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12 }}>
                    <span><span style={{ color: '#999', fontWeight: 600 }}>{label}</span><span style={{ color: '#555' }}>  {file}</span></span>
                    <span style={{ color: '#444' }}>✓</span>
                  </div>
                ))}
                <p style={{ color: '#bbb', marginTop: 8, fontSize: 12.5 }}>Playing now on Spotify. Enjoy!</p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 18 }}>
                <div style={{ background: '#1e1e1e', borderRadius: 14, padding: '10px 14px', maxWidth: '80%', color: '#ddd', fontSize: 12.5, lineHeight: 1.55 }}>
                  <span style={{ color: '#34d399', fontWeight: 500 }}>/browser</span> find cheapest flights from NYC to Paris for next weekend, round trip
                </div>
              </div>
              <div style={{ fontSize: 12.5, lineHeight: 1.7, color: '#bbb' }}>
                <p style={{ marginBottom: 10 }}>Searching Google Flights and Kayak for the best fares…</p>
                {[
                  { label: 'Navigated', file: 'flights.google.com' },
                  { label: 'Searched', file: 'NYC → CDG, May 10–12' },
                  { label: 'Navigated', file: 'kayak.com' },
                  { label: 'Compared', file: '14 results across 6 airlines' },
                ].map(({ label, file }, i) => (
                  <div key={i} style={{ background: '#131313', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 7, padding: '7px 12px', marginBottom: 6, display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12 }}>
                    <span><span style={{ color: '#999', fontWeight: 600 }}>{label}</span><span style={{ color: '#555' }}>  {file}</span></span>
                    <span style={{ color: '#444' }}>✓</span>
                  </div>
                ))}
                <p style={{ color: '#bbb', marginTop: 8, fontSize: 12.5 }}>
                  Best deal: <code style={{ background: '#1a1a1a', padding: '1px 5px', borderRadius: 3, fontSize: 11.5, color: '#4ade80', fontFamily: mono }}>Air France $389</code> depart Fri 22:10, return Sun 18:40. Link copied to clipboard.
                </p>
              </div>
            </>}

            {/* ── research ── */}
            {activeThread === 'research' && <>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 18 }}>
                <div style={{ background: '#1e1e1e', borderRadius: 14, padding: '10px 14px', maxWidth: '80%', color: '#ddd', fontSize: 12.5, lineHeight: 1.55 }}>
                  <span style={{ color: '#f59e0b', fontWeight: 500 }}>@perplexity</span> <span style={{ color: '#a78bfa', fontWeight: 500 }}>@exa</span> research the fall of the Byzantine Empire — key causes, timeline, and modern historical consensus
                </div>
              </div>
              <div style={{ fontSize: 12.5, lineHeight: 1.7, color: '#bbb' }}>
                <p style={{ marginBottom: 10 }}>Running parallel searches across academic sources and the live web…</p>
                <div style={{ marginBottom: 8 }}><span style={{ color: '#f59e0b', fontWeight: 600 }}>@perplexity</span><span style={{ color: '#444' }}> — web synthesis</span></div>
                {[
                  { label: 'Queried', file: 'Fall of Byzantine Empire causes' },
                  { label: 'Queried', file: 'Ottoman siege of Constantinople 1453' },
                  { label: 'Summarised', file: '8 sources → 3 key themes' },
                ].map(({ label, file }, i) => (
                  <div key={i} style={{ background: '#131313', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 7, padding: '7px 12px', marginBottom: 6, display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12 }}>
                    <span><span style={{ color: '#999', fontWeight: 600 }}>{label}</span><span style={{ color: '#555' }}>  {file}</span></span>
                    <span style={{ color: '#444' }}>✓</span>
                  </div>
                ))}
                <div style={{ margin: '14px 0 8px' }}><span style={{ color: '#a78bfa', fontWeight: 600 }}>@exa</span><span style={{ color: '#444' }}> — academic deep-dive</span></div>
                {[
                  { label: 'Found', file: '12 peer-reviewed papers' },
                  { label: 'Extracted', file: 'Gibbon, Norwich, Ostrogorsky' },
                  { label: 'Ranked', file: 'by citation count' },
                ].map(({ label, file }, i) => (
                  <div key={i} style={{ background: '#131313', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 7, padding: '7px 12px', marginBottom: 6, display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12 }}>
                    <span><span style={{ color: '#999', fontWeight: 600 }}>{label}</span><span style={{ color: '#555' }}>  {file}</span></span>
                    <span style={{ color: '#444' }}>✓</span>
                  </div>
                ))}
                <p style={{ color: '#bbb', marginTop: 10, fontSize: 12.5 }}>
                  Three consensus causes: economic exhaustion, territorial losses to Crusaders &amp; Turks, and internal succession crises. The 1453 Ottoman conquest under Mehmed II was the final blow. Full report saved to <code style={{ background: '#1a1a1a', padding: '1px 5px', borderRadius: 3, fontSize: 11.5, color: '#a78bfa', fontFamily: mono }}>research/byzantine.md</code>.
                </p>
              </div>
            </>}

            {/* ── general ── */}
            {activeThread === 'general' && <>
              <div style={{ display: 'flex', gap: 9, marginBottom: 16, alignItems: 'flex-start' }}>
                <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <img src={openbotLogo} alt="" style={{ width: 14, height: 14 }} />
                </div>
                <div>
                  <span style={{ color: '#666', fontSize: 11, display: 'block', marginBottom: 4 }}>OpenBot <span style={{ color: '#333' }}>9:12 AM</span></span>
                  <div style={{ color: '#bbb', fontSize: 12.5, lineHeight: 1.6 }}>Good morning! Ready when you are. What's on the agenda today?</div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
                <div style={{ background: '#1e1e1e', borderRadius: 14, padding: '10px 14px', maxWidth: '75%', color: '#ddd', fontSize: 12.5, lineHeight: 1.55 }}>
                  Morning! What's the weather in Tbilisi today?
                </div>
              </div>
              <div style={{ display: 'flex', gap: 9, marginBottom: 20, alignItems: 'flex-start' }}>
                <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <img src={openbotLogo} alt="" style={{ width: 14, height: 14 }} />
                </div>
                <div>
                  <span style={{ color: '#666', fontSize: 11, display: 'block', marginBottom: 4 }}>OpenBot <span style={{ color: '#333' }}>9:12 AM</span></span>
                  <div style={{ color: '#bbb', fontSize: 12.5, lineHeight: 1.6 }}>
                    Right now in Tbilisi: <span style={{ color: '#fbbf24' }}>☀ 22°C, mostly sunny.</span> Light wind, low humidity. Great day to be outside!
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
                <div style={{ background: '#1e1e1e', borderRadius: 14, padding: '10px 14px', maxWidth: '75%', color: '#ddd', fontSize: 12.5, lineHeight: 1.55 }}>
                  Nice! I have a team meeting at 3pm and then I want to work on the landing page redesign later.
                </div>
              </div>
              <div style={{ display: 'flex', gap: 9, alignItems: 'flex-start' }}>
                <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <img src={openbotLogo} alt="" style={{ width: 14, height: 14 }} />
                </div>
                <div>
                  <span style={{ color: '#666', fontSize: 11, display: 'block', marginBottom: 4 }}>OpenBot <span style={{ color: '#333' }}>9:13 AM</span></span>
                  <div style={{ color: '#bbb', fontSize: 12.5, lineHeight: 1.6 }}>
                    Got it — I'll remind you at 2:50 PM for the meeting. After that, want me to pull up your latest mockup branch so you can jump straight into the redesign?
                  </div>
                </div>
              </div>
            </>}

          </div>
          {/* Input */}
          <div style={{ padding: '10px 16px 16px', flexShrink: 0 }}>
            <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 10, padding: '11px 14px' }}>
              <input value={inputText} onChange={e => setInputText(e.target.value)}
                placeholder={
                  activeThread === 'browser' ? 'Start with /browser to browse the web…' :
                    activeThread === 'research' ? 'Tag @perplexity or @exa to research…' :
                      activeThread === 'general' ? 'Chat with OpenBot…' :
                        'Type a message, or start with @ to choose an agent..'
                }
                className="placeholder-zinc-700"
                style={{ width: '100%', background: 'none', border: 'none', outline: 'none', color: '#fff', fontSize: 13 }}
              />
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
                <button style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(255,255,255,0.05)', border: 'none', borderRadius: 5, padding: '4px 10px', color: '#555', fontSize: 11.5, cursor: 'pointer' }}>
                  @ <span style={{ color: '#666' }}>Default Agent</span> <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" /></svg>
                </button>
                <button style={{ width: 28, height: 28, borderRadius: '50%', background: '#fff', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="12" height="12" fill="none" stroke="#000" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5M5 12l7-7 7 7" /></svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div style={{ width: showRight ? 340 : 0, overflow: 'hidden', transition: 'width 0.25s ease', background: '#0a0a0a', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
          {/* Tabs */}
          <div style={{ height: 38, borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', padding: '0 10px', gap: 2, flexShrink: 0 }}>
            {(['Specification', 'State', 'Files'] as const).map(tab => (
              <button key={tab} onClick={() => setActiveRightTab(tab)} style={{
                fontSize: 12.5, padding: '4px 10px', borderRadius: 7, border: 'none', cursor: 'pointer', background: 'none',
                color: activeRightTab === tab ? '#fff' : '#555',
                fontWeight: activeRightTab === tab ? 600 : 400,
              }}>{tab}</button>
            ))}
          </div>

          {/* Scrollable body */}
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {(() => {
              const panel = panelData[activeThread] ?? panelData['general']

              /* ── Specification ── */
              if (activeRightTab === 'Specification') {
                if (!panel.spec) return (
                  <div style={{ padding: '28px 18px', color: '#333', fontSize: 12.5, textAlign: 'center' }}>No specification for this channel.</div>
                )
                return (
                  <div style={{ padding: '16px 16px' }}>
                    <div style={{ color: '#ccc', fontSize: 13, fontWeight: 600, marginBottom: 12 }}>{panel.spec.title}</div>
                    {panel.spec.points.map((pt, i) => (
                      <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'flex-start' }}>
                        <span style={{ color: '#444', fontSize: 12, marginTop: 1, flexShrink: 0 }}>•</span>
                        <span style={{ color: '#888', fontSize: 12.5, lineHeight: 1.55 }}>{pt}</span>
                      </div>
                    ))}
                  </div>
                )
              }

              /* ── State ── */
              if (activeRightTab === 'State') {
                if (!panel.state) return (
                  <div style={{ padding: '28px 18px', color: '#333', fontSize: 12.5, textAlign: 'center' }}>No state to display.</div>
                )
                return (
                  <div style={{ padding: '12px 0' }}>
                    {panel.state.map((row, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '7px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                        <span style={{ color: '#555', fontSize: 12 }}>{row.label}</span>
                        <span style={{ color: row.color ?? '#888', fontSize: 12, fontFamily: row.color ? mono : 'inherit', fontWeight: row.color ? 500 : 400 }}>{row.value}</span>
                      </div>
                    ))}
                  </div>
                )
              }

              /* ── Files ── */
              if (panel.files.length === 0) return (
                <div style={{ padding: '28px 18px', color: '#333', fontSize: 12.5, textAlign: 'center' }}>No file changes.</div>
              )
              const totalAdded = panel.files.reduce((s, f) => s + f.added, 0)
              const totalRemoved = panel.files.reduce((s, f) => s + f.removed, 0)
              return (
                <>
                  <div style={{ padding: '10px 14px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
                    <span style={{ color: '#aaa', fontSize: 12.5, fontWeight: 500 }}>
                      {panel.files.length} file{panel.files.length > 1 ? 's' : ''} changed{' '}
                      <span style={{ color: '#4ade80' }}>+{totalAdded}</span>{' '}
                      <span style={{ color: '#f87171' }}>-{totalRemoved}</span>
                    </span>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button style={{ ...iconBtn, color: '#555', fontSize: 14 }}>×</button>
                      <button style={{ ...iconBtn, color: '#555', fontSize: 14 }}>✓</button>
                    </div>
                  </div>
                  {panel.files.map((file: DiffFile, fi: number) => (
                    <div key={fi} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <div style={{ padding: '8px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#0e0e0e' }}>
                        <span style={{ color: '#888', fontSize: 12, fontFamily: mono, fontWeight: 600 }}>
                          {file.name}{' '}
                          <span style={{ color: '#4ade80', fontWeight: 400 }}>+{file.added}</span>{' '}
                          <span style={{ color: '#f87171', fontWeight: 400 }}>-{file.removed}</span>
                        </span>
                        <div style={{ display: 'flex', gap: 8 }}>
                          <button style={{ ...iconBtn, color: '#555', fontSize: 13 }}>×</button>
                          <button style={{ ...iconBtn, color: '#555', fontSize: 13 }}>✓</button>
                        </div>
                      </div>
                      <div style={{ padding: '6px 0' }}>
                        {file.lines.map((line: DiffLine, li: number) => (
                          <div key={li} style={{
                            display: 'flex', alignItems: 'flex-start',
                            background: line.type === 'del' ? 'rgba(248,113,113,0.08)' : line.type === 'add' ? 'rgba(74,222,128,0.08)' : 'transparent',
                            padding: '1px 14px',
                          }}>
                            <span style={{ color: line.type === 'del' ? '#f87171' : line.type === 'add' ? '#4ade80' : '#3a3a3a', fontSize: 12, fontFamily: mono, marginRight: 8, flexShrink: 0, userSelect: 'none' }}>
                              {line.type === 'del' ? '−' : line.type === 'add' ? '+' : ' '}
                            </span>
                            <span style={{ color: line.type === 'del' ? '#fca5a5' : line.type === 'add' ? '#86efac' : '#666', fontSize: 11.5, fontFamily: mono, whiteSpace: 'pre', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {line.code}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </>
              )
            })()}
          </div>
        </div>

      </div>
    </div>
  )
}

export function HowItWorksSection() {
  const steps = [
    { title: 'Compose', desc: 'Describe your task in natural language.' },
    { title: 'Orchestrate', desc: 'OpenBot coordinates agents to solve complex workflows.' },
    { title: 'Deliver', desc: 'Results delivered directly to your environment.' },
  ]

  return (
    <section id="how-it-works" className="py-32 border-t border-white/5">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="flex flex-col md:flex-row gap-16 md:gap-24">
          <div className="md:w-1/3">
            <h2 className="text-3xl font-medium text-white sticky top-32" style={{ fontFamily: "'Raleway', sans-serif" }}>
              How it works
            </h2>
            <p className="mt-4 text-[oklch(0.65_0.004_80)] text-sm leading-relaxed">
              OpenBot simplifies complex automation by orchestrating specialized AI agents.
            </p>
          </div>
          
          <div className="md:w-2/3 flex flex-col gap-16">
            {steps.map((step, i) => (
              <div key={i} className="flex flex-col gap-4 relative">
                <div className="flex items-center gap-4">
                  <span className="text-[oklch(0.65_0.004_80)] text-xs font-medium tabular-nums tracking-widest uppercase opacity-50">Step 0{i + 1}</span>
                  <div className="h-px flex-1 bg-white/5" />
                </div>
                <h3 className="text-white text-2xl font-medium" style={{ fontFamily: "'Raleway', sans-serif" }}>{step.title}</h3>
                <p className="text-[oklch(0.65_0.004_80)] text-base leading-relaxed max-w-md">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function App() {
  const [registry, setRegistry] = useState<Registry | null>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    fetch(REGISTRY_URL)
      .then(res => res.json())
      .then(data => setRegistry(data))
      .catch(err => console.error('Failed to fetch registry:', err))
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > window.innerHeight - 100)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      {/* Global Cinematic Background */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        {/* Cinematic background base gradient */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at center, oklch(0.17 0.006 80 / 0.4) 0%, var(--background) 100%)' }} />
        {/* Soft top glow */}
        <div className="hero-glow" aria-hidden="true" />
        {/* Masked grid */}
        <div className="hero-grid" aria-hidden="true" />
        {/* Drifting glowing orbs */}
        <div className="background-3d" aria-hidden="true">
          <div className="orb-3d orb-3d-1" />
          <div className="orb-3d orb-3d-2" />
          <div className="orb-3d orb-3d-3" />
          <div className="orb-3d orb-3d-4" />
          <div className="orb-3d orb-3d-5" />
        </div>
      </div>


      {/* Fixed navbar — appears on scroll */}
      <header role="banner" aria-label="Site navigation" style={{ backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', background: 'oklch(0.13 0.005 80 / 0.85)', borderBottom: '1px solid var(--border)', transition: 'opacity 0.3s ease, transform 0.3s ease' }} className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
        <nav aria-label="Primary navigation" className="relative flex items-center px-8 md:px-12" style={{ height: 56 }}>
          <a href="/" aria-label="OpenBot home" className="flex items-center gap-2.5">
            <img src={openbotLogo} alt="" aria-hidden="true" width="20" height="20" className="w-5 h-5" />
            <span className="text-[var(--foreground)]" style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 500, fontSize: '15px' }}>OpenBot</span>
          </a>
          <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-8">
            <a href="#how-it-works" className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors" style={{ fontSize: '14px' }}>How it works</a>
            <a href="https://docs.getopenbot.com/guides/first-agent/" target="_blank" rel="noopener noreferrer" className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors" style={{ fontSize: '14px' }}>Build your agent</a>
            <a href={DOCS_URL} target="_blank" rel="noopener noreferrer" className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors" style={{ fontSize: '14px' }}>Docs</a>
            <a href="https://github.com/meetopenbot/openbot" target="_blank" rel="noopener noreferrer" className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors" style={{ fontSize: '14px' }}>GitHub</a>
          </div>
          <div className="ml-auto">
            <a href="https://openbot.one" target="_blank" rel="noopener noreferrer" className="text-[var(--primary-foreground)] text-sm font-medium rounded-full px-5 py-2 transition-colors bg-[var(--primary)] hover:opacity-90 inline-block">
              Login
            </a>
          </div>
        </nav>
      </header>

      {/* Main content */}
      <main id="main-content" aria-label="Main content" className="relative z-10">

        {/* Hero Section */}
        <section className="relative flex flex-col items-center justify-center overflow-hidden pt-20" style={{ background: 'transparent' }}>
          
          {/* Horizontal Navbar */}
          <nav aria-label="Primary navigation" className="absolute top-0 left-0 right-0 z-20 flex items-center px-6 md:px-10 pt-6 pb-2 w-full">
            <a href="/" aria-label="OpenBot home" className="flex items-center gap-2.5">
              <img src={openbotLogo} alt="" aria-hidden="true" width="22" height="22" className="w-5 h-5" />
              <span className="text-[var(--foreground)]" style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 500, fontSize: '15px' }}>OpenBot</span>
            </a>
            <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-7">
              <a href="#how-it-works" className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors" style={{ fontSize: '14px' }}>How it works</a>
              <a href="https://docs.getopenbot.com/guides/first-agent/" target="_blank" rel="noopener noreferrer" className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors" style={{ fontSize: '14px' }}>Build your agent</a>
              <a href={DOCS_URL} target="_blank" rel="noopener noreferrer" className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors" style={{ fontSize: '14px' }}>Docs</a>
              <a href="https://github.com/meetopenbot/openbot" target="_blank" rel="noopener noreferrer" className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors" style={{ fontSize: '14px' }}>GitHub</a>
            </div>
            <div className="ml-auto">
              <a href="https://openbot.one" target="_blank" rel="noopener noreferrer" className="text-[var(--primary-foreground)] text-sm font-medium rounded-full px-5 py-2 transition-colors bg-[var(--primary)] hover:opacity-90 inline-block">
                Login
              </a>
            </div>
          </nav>

          {/* Center content */}
          <div className="relative z-10 flex flex-col items-center text-center px-6 py-20 w-full max-w-4xl mx-auto">
            {/* App icon */}
            <img src={openbotLogo} alt="OpenBot" width="48" height="48" className="w-12 h-12 mb-6" style={{ filter: 'none', boxShadow: 'none' }} />

            {/* Title */}
            <h1 className="text-[var(--foreground)] leading-none tracking-tight mb-4" style={{ fontSize: 'clamp(30px, 7vw, 40px)', fontFamily: "'Raleway', sans-serif", fontWeight: 500, textShadow: 'none', filter: 'none' }}>
              What should we work on?
            </h1>
            <p className="mb-8 max-w-2xl text-base text-[var(--muted-foreground)] md:text-lg">
              Stop running agents in isolation. Coordinate specialized agents in one shared, local-first, open-source workspace.
            </p>

            <AgentComposer registry={registry} />
          </div>
        </section>

        {/* Continuous ambient background for the lower sections */}
        <div className="relative">
          <div className="relative z-10">
            <AgentCarousel agents={registry?.agents ?? []} />
            <HowItWorksSection />

            {/* <PricingSection /> */}

            {/* Get Started / CTA Section */}
            <section id="get-started" className="relative py-20 md:py-32">
              <div className="container mx-auto px-6">
              <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-medium mb-16 text-[oklch(0.94_0.004_80)]" style={{ fontFamily: "'Raleway', sans-serif" }}>
              Get Started in Minutes
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16 relative">
              {/* Connecting lines for desktop */}
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent -translate-y-1/2 z-0" />

              {[
                { step: '01', label: 'login' },
                { step: '02', label: 'connect runtime' },
                { step: '03', label: 'byok' },
                { step: '04', label: 'done', highlight: true }
              ].map((item, i) => (
                <div key={i} className="relative z-10 flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-[10px] font-bold mb-4 border ${item.highlight ? 'bg-[var(--primary)] text-[var(--primary-foreground)] border-[var(--primary)]' : 'bg-[var(--background)] text-[var(--muted-foreground)] border-[var(--border)]'}`}>
                    {item.step}
                  </div>
                  <span className={`text-xs uppercase tracking-widest ${item.highlight ? 'text-[oklch(0.94_0.004_80)] font-semibold' : 'text-[oklch(0.65_0.004_80)]'}`}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            <a href="https://openbot.one" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-[oklch(0.94_0.004_80)] text-black hover:opacity-90 rounded-full px-10 py-6 h-auto text-sm font-semibold transition-all hover:scale-105">
                Launch App
              </Button>
            </a>
          </div>
              </div>
            </section>
          </div>
        </div>

        {/* Footer */}
        <footer style={{ background: 'transparent', borderTop: '1px solid var(--border)' }}>
          {/* Top gradient line */}
          <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, var(--border) 30%, var(--border) 60%, transparent)', marginBottom: '-1px' }} />

          <div className="container mx-auto px-6 pt-10 md:pt-16 pb-10">
            {/* Main grid */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-10 mb-10 md:mb-14">

              {/* Brand column */}
              <div className="md:col-span-2 flex flex-col gap-5">
                <div className="flex items-center gap-2.5">
                  <img src={openbotLogo} alt="OpenBot" className="w-7 h-7" />
                  <span className="text-xl font-medium text-[oklch(0.94_0.004_80)]" style={{ fontFamily: "'Raleway', sans-serif" }}>OpenBot</span>
                </div>
                <p className="text-[oklch(0.65_0.004_80)] text-sm leading-relaxed max-w-xs">
                  The multi-agent coordination platform. Browse the registry or build your own agents.
                </p>
                {/* Social icons */}
                <div className="flex gap-3 mt-1">
                  <a href="https://github.com/meetopenbot/openbot" target="_blank" rel="noopener noreferrer"
                    aria-label="OpenBot on GitHub"
                    className="w-9 h-9 rounded-full flex items-center justify-center transition-all"
                    style={{ border: '1px solid var(--border)', background: 'var(--card)' }}
                  >
                    <svg aria-hidden="true" className="w-4 h-4 text-[oklch(0.65_0.004_80)]" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="https://discord.gg/XYYXvN2ebB" target="_blank" rel="noopener noreferrer"
                    aria-label="OpenBot on Discord"
                    className="w-9 h-9 rounded-full flex items-center justify-center transition-all"
                    style={{ border: '1px solid var(--border)', background: 'var(--card)' }}
                  >
                    <SiDiscord aria-hidden="true" size={15} className="text-[oklch(0.65_0.004_80)]" />
                  </a>
                  <a href="https://x.com/MeetOpenBot" target="_blank" rel="noopener noreferrer"
                    aria-label="OpenBot on X (Twitter)"
                    className="w-9 h-9 rounded-full flex items-center justify-center transition-all"
                    style={{ border: '1px solid var(--border)', background: 'var(--card)' }}
                  >
                    <svg aria-hidden="true" className="w-4 h-4 text-[oklch(0.65_0.004_80)]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Product column */}
              <div className="flex flex-col gap-4">
                <p className="text-xs font-semibold tracking-widest text-[oklch(0.65_0.004_80)] uppercase">Product</p>
                {[
                  { label: 'Documentation', href: DOCS_URL },
                  { label: 'Quick Start', href: DOCS_URL },
                  { label: 'Build Agents', href: DOCS_URL },
                  { label: 'GitHub', href: 'https://github.com/meetopenbot/openbot' },
                ].map(({ label, href }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    className="text-sm text-[oklch(0.65_0.004_80)] hover:text-[oklch(0.94_0.004_80)] transition-colors">{label}</a>
                ))}
              </div>

              {/* Community column */}
              <div className="flex flex-col gap-4">
                <p className="text-xs font-semibold tracking-widest text-[oklch(0.65_0.004_80)] uppercase">Community</p>
                {[
                  { label: 'Discord', href: 'https://discord.gg/XYYXvN2ebB' },
                  { label: 'X / Twitter', href: 'https://x.com/MeetOpenBot' },
                  { label: 'GitHub Issues', href: 'https://github.com/meetopenbot/openbot/issues' },
                  { label: 'Contributing', href: 'https://github.com/meetopenbot/openbot/blob/main/CONTRIBUTING.md' },
                ].map(({ label, href }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    className="text-sm text-[oklch(0.65_0.004_80)] hover:text-[oklch(0.94_0.004_80)] transition-colors">{label}</a>
                ))}
              </div>

              {/* Company column */}
              <div className="flex flex-col gap-4">
                <p className="text-xs font-semibold tracking-widest text-[oklch(0.65_0.004_80)] uppercase">Company</p>
                {[
                  { label: 'About Us', href: '/about' },
                  { label: 'Our Charter', href: '/charter' },
                  { label: 'Foundation', href: '/foundation' },
                  { label: 'Careers', href: '/careers' },
                  { label: 'Brand', href: '/brand' },
                ].map(({ label, href }) => (
                  href.startsWith('/') ? (
                    <button key={label} onClick={() => { window.history.pushState({}, '', href); window.dispatchEvent(new PopStateEvent('popstate')) }} className="text-left text-sm text-[oklch(0.65_0.004_80)] hover:text-[oklch(0.94_0.004_80)] transition-colors cursor-pointer">{label}</button>
                  ) : (
                    <a key={label} href={href} className="text-sm text-[oklch(0.65_0.004_80)] hover:text-[oklch(0.94_0.004_80)] transition-colors">{label}</a>
                  )
                ))}
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: '1px', background: 'oklch(0.94 0.004 80 / 0.05)', marginBottom: '24px' }} />

            {/* Bottom bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-[oklch(0.65_0.004_80)]/50 text-xs">
                © {new Date().getFullYear()} OpenBot. All rights reserved.
              </p>
              <div className="flex items-center gap-5">
                <button onClick={() => { window.history.pushState({}, '', '/terms'); window.dispatchEvent(new PopStateEvent('popstate')) }} className="text-[oklch(0.65_0.004_80)]/50 hover:text-[oklch(0.94_0.004_80)] text-xs transition-colors cursor-pointer">Terms of Service</button>
                <button onClick={() => { window.history.pushState({}, '', '/privacy'); window.dispatchEvent(new PopStateEvent('popstate')) }} className="text-[oklch(0.65_0.004_80)]/50 hover:text-[oklch(0.94_0.004_80)] text-xs transition-colors cursor-pointer">Privacy Policy</button>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}

function AppRouter() {
  const [pathname, setPathname] = useState(() => window.location.pathname)

  useEffect(() => {
    const handlePop = () => setPathname(window.location.pathname)
    window.addEventListener('popstate', handlePop)
    return () => window.removeEventListener('popstate', handlePop)
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  const goHome = () => { window.history.pushState({}, '', '/'); setPathname('/') }

  if (pathname === '/terms') return <TermsPage onBack={goHome} />
  if (pathname === '/privacy') return <PrivacyPage onBack={goHome} />
  if (pathname === '/about') return <AboutPage onBack={goHome} />
  if (pathname === '/charter') return <CharterPage onBack={goHome} />
  if (pathname === '/foundation') return <FoundationPage onBack={goHome} />
  if (pathname === '/careers') return <CareersPage onBack={goHome} />
  if (pathname === '/brand') return <BrandPage onBack={goHome} />
  return <App />
}

export default AppRouter
