import { useState } from 'react'
import openbotLogo from './assets/openbotlogo.svg'

const APP_URL = 'https://openbot.one'
const DOCS_URL = 'https://docs.getopenbot.com'
const CREDITS_FAQ_URL = `${DOCS_URL}/billing/credits`
const PRO_MONTHLY_PRICE = 60
const TEAM_MONTHLY_PRICE = 200
const PRO_MONTHLY_CREDITS = 2000
const TEAM_MONTHLY_CREDITS = 8000

function navigate(path: string) {
  window.history.pushState({}, '', path)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

function CheckIcon() {
  return (
    <svg className="w-4 h-4 text-foreground flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )
}

function RequestInviteForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    try {
      await fetch('https://formspree.io/f/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email }),
      })
      setStatus('done')
    } catch {
      setStatus('done')
    }
  }

  if (status === 'done') {
    return (
      <div className="flex flex-col items-center gap-2 py-3 text-center animate-in fade-in slide-in-from-bottom-2 duration-500">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 mb-1">
          <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-sm text-foreground font-medium">Request sent</p>
        <p className="text-[11px] text-muted-foreground">We'll reach out to {email}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2.5 w-full">
      <div className="relative group">
        <input
          type="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Enter email for invite"
          className="w-full rounded-xl border border-border/40 bg-background/40 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-foreground/20 transition-all group-hover:border-border/80"
        />
      </div>
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full rounded-xl border border-border/60 bg-background/20 px-4 py-2.5 text-sm font-medium text-foreground transition-all hover:bg-muted hover:border-border active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-3 w-3 text-foreground" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Sending...
          </span>
        ) : 'Request invite'}
      </button>
    </form>
  )
}

export default function PricingPage({ onBack }: { onBack: () => void }) {
  const localFeatures = [
    'Unlimited local runtime',
    'Full provider control (BYOK)',
    'Full agents, channels, and plugins',
    'Always free, MIT open source',
    'Data stays on your machine',
    'Community-driven support',
  ]

  const cloudFeatures = [
    'Managed cloud runtime — zero ops',
    'Included LLM access (credits)',
    'Same features, hosted for you',
    '1 cloud workspace included',
    'Top up credits on demand',
  ]

  const skyFeatures = [
    'Everything in Cloud',
    '3 cloud workspaces included',
    'Team seat management',
    'Shared workspace access',
    'Higher included credit allotment',
    'Top up credits on demand',
  ]

  const orbitFeatures = [
    'Unlimited cloud workspaces',
    'SSO & audit logs (roadmap)',
    'Dedicated support SLAs',
    'Custom credit allotments',
    'Volume-based pricing',
  ]

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Cinematic Background (Synced with App.tsx) */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at center, oklch(0.21 0.006 285.8 / 0.4) 0%, var(--background) 100%)' }} />
        <div className="hero-glow" aria-hidden="true" />
        <div className="hero-grid opacity-20" aria-hidden="true" />
        <div className="background-3d" aria-hidden="true">
          <div className="orb-3d orb-3d-1 opacity-20" />
          <div className="orb-3d orb-3d-4 opacity-10" />
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/60 backdrop-blur-xl">
        <div className="container mx-auto px-6 h-14 flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-2.5 cursor-pointer">
            <img src={openbotLogo} alt="OpenBot" className="w-5 h-5" />
            <span className="text-[15px] font-medium tracking-tight">OpenBot</span>
          </button>
          <button onClick={onBack} className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer flex items-center gap-2">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </button>
        </div>
      </header>

      <div className="relative z-10 container mx-auto px-6 py-20 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[10px] font-bold tracking-[0.4em] text-muted-foreground uppercase mb-6 opacity-80">Pricing</p>
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-6 bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent">
            Run free on your machine.<br />Pay when you want us to run it for you.
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Four tiers, one platform. Local, Cloud, Sky, and Orbit — run free on your machine or let us host it for you.
          </p>
        </div>

        {/* Mental Model Switcher - Polished */}
        <div className="relative flex justify-center mb-24">
          <div className="inline-flex p-1 rounded-2xl bg-muted/20 border border-border/40 backdrop-blur-sm">
            <div className="flex items-center gap-1">
              <div className="px-5 py-4 text-center rounded-xl transition-all">
                <p className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase mb-1">Local</p>
                <p className="text-sm text-foreground font-medium">Your machine, your keys</p>
                <div className="mt-1 h-px w-8 bg-border/60 mx-auto" />
                <p className="text-[10px] text-muted-foreground/60 mt-1 uppercase font-semibold">Free forever</p>
              </div>
              <div className="w-px h-8 bg-border/40" />
              <div className="px-5 py-4 text-center rounded-xl bg-foreground/[0.03] border border-foreground/10 shadow-sm">
                <p className="text-[10px] font-bold tracking-widest text-foreground uppercase mb-1">Cloud</p>
                <p className="text-sm text-foreground font-medium">Hosted, LLM included</p>
                <div className="mt-1 h-px w-8 bg-primary/40 mx-auto" />
                <p className="text-[10px] text-primary mt-1 uppercase font-bold">From ${PRO_MONTHLY_PRICE}/mo</p>
              </div>
              <div className="w-px h-8 bg-border/40" />
              <div className="px-5 py-4 text-center rounded-xl transition-all">
                <p className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase mb-1">Sky</p>
                <p className="text-sm text-foreground font-medium">More workspaces & seats</p>
                <div className="mt-1 h-px w-8 bg-border/60 mx-auto" />
                <p className="text-[10px] text-muted-foreground/60 mt-1 uppercase font-semibold">${TEAM_MONTHLY_PRICE}/mo</p>
              </div>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-24">
          {/* Local */}
          <div className="group relative rounded-3xl border border-border/40 bg-card/40 p-8 flex flex-col gap-8 backdrop-blur-md transition-all hover:border-border/80">
            <div className="flex flex-col gap-1">
              <p className="text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase">Local</p>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-medium tabular-nums">$0</span>
              </div>
              <p className="text-sm text-muted-foreground/80">Open source under MIT license.</p>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-border/40 to-transparent" />

            <ul className="flex flex-col gap-4 flex-1">
              {localFeatures.map(f => (
                <li key={f} className="flex items-center gap-3.5">
                  <div className="mt-1 rounded-full bg-foreground/5 p-0.5">
                    <CheckIcon />
                  </div>
                  <span className="text-sm text-muted-foreground group-hover:text-foreground/90 transition-colors">{f}</span>
                </li>
              ))}
            </ul>

            <a
              href={APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center rounded-2xl border border-border/60 bg-background/40 py-3 text-sm font-medium text-foreground transition-all hover:bg-muted hover:border-border"
            >
              Get started free
            </a>
          </div>

          {/* Cloud (pro) - Recommended */}
          <div className="group relative rounded-3xl border border-foreground/20 bg-card p-8 flex flex-col gap-8 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] xl:scale-[1.03] z-10 transition-all">
            {/* Glossy top border */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/40 to-transparent pointer-events-none" />

            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-[10px] font-bold tracking-[0.2em] text-foreground uppercase">Cloud</p>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-medium tabular-nums">${PRO_MONTHLY_PRICE}</span>
                  <span className="text-muted-foreground text-sm font-medium">/mo</span>
                </div>
                <p className="text-sm font-medium text-foreground/90">Includes {PRO_MONTHLY_CREDITS.toLocaleString()} credits</p>
              </div>
              <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[9px] font-bold tracking-widest text-primary uppercase border border-primary/20">Recommended</span>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />

            <ul className="flex flex-col gap-4 flex-1">
              {cloudFeatures.map(f => (
                <li key={f} className="flex items-center gap-3.5">
                  <div className="mt-1 rounded-full bg-foreground/10 p-0.5">
                    <CheckIcon />
                  </div>
                  <span className="text-sm text-foreground/80">{f}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-3">
              <a
                href={APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center rounded-2xl bg-foreground py-3 text-sm font-bold text-background transition-all hover:bg-foreground/90 hover:scale-[1.02] active:scale-[0.98]"
              >
                Redeem invite
              </a>
              <RequestInviteForm />
              <p className="text-[10px] text-muted-foreground/60 text-center uppercase tracking-widest font-bold">Invite required to subscribe</p>
            </div>
          </div>

          {/* Sky (team) */}
          <div className="group relative rounded-3xl border border-border/40 bg-card/40 p-8 flex flex-col gap-8 backdrop-blur-md transition-all hover:border-border/80">
            <div className="flex flex-col gap-1">
              <p className="text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase">Sky</p>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-medium tabular-nums">${TEAM_MONTHLY_PRICE}</span>
                <span className="text-muted-foreground text-sm font-medium">/mo</span>
              </div>
              <p className="text-sm font-medium text-foreground/90">Includes {TEAM_MONTHLY_CREDITS.toLocaleString()} credits</p>
              <p className="text-sm text-muted-foreground/80">For multi-workspace and collaborative setups.</p>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-border/40 to-transparent" />

            <ul className="flex flex-col gap-4 flex-1">
              {skyFeatures.map(f => (
                <li key={f} className="flex items-center gap-3.5">
                  <div className="mt-1 rounded-full bg-foreground/5 p-0.5">
                    <CheckIcon />
                  </div>
                  <span className="text-sm text-muted-foreground group-hover:text-foreground/90 transition-colors">{f}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-3">
              <a
                href={APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center rounded-2xl border border-border/60 bg-background/40 py-3 text-sm font-medium text-foreground transition-all hover:bg-muted hover:border-border"
              >
                Redeem invite
              </a>
              <RequestInviteForm />
              <p className="text-[10px] text-muted-foreground/60 text-center uppercase tracking-widest font-bold">Invite required to subscribe</p>
            </div>
          </div>

          {/* Orbit (enterprise) */}
          <div className="group relative rounded-3xl border border-border/40 bg-card/40 p-8 flex flex-col gap-8 backdrop-blur-md transition-all hover:border-border/80">
            <div className="flex flex-col gap-1">
              <p className="text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase">Orbit</p>
              <p className="text-[10px] text-muted-foreground/50 uppercase tracking-[0.2em] font-semibold">Enterprise</p>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-5xl font-medium tracking-tight">Custom</span>
              </div>
              <p className="text-sm text-muted-foreground/80">For organizations at scale.</p>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-border/40 to-transparent" />

            <ul className="flex flex-col gap-4 flex-1">
              {orbitFeatures.map(f => (
                <li key={f} className="flex items-center gap-3.5">
                  <div className="mt-1 rounded-full bg-foreground/5 p-0.5">
                    <CheckIcon />
                  </div>
                  <span className="text-sm text-muted-foreground group-hover:text-foreground/90 transition-colors">{f}</span>
                </li>
              ))}
            </ul>

            <a
              href="https://discord.gg/XYYXvN2ebB"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center rounded-2xl border border-border/60 bg-background/40 py-3 text-sm font-medium text-foreground transition-all hover:bg-muted"
            >
              Contact us
            </a>
          </div>
        </div>

        {/* Credits section */}
        <div className="relative max-w-2xl mx-auto mb-32 text-center">
          <h2 className="text-lg font-medium mb-3 tracking-tight">How credits work</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            Credits power agent runs on Cloud and Sky. Usage scales with the models you choose, and you can top up anytime.
          </p>
          <a
            href={CREDITS_FAQ_URL}
            className="text-sm text-foreground underline underline-offset-4 hover:opacity-80 transition-opacity"
          >
            See how credits work
          </a>
        </div>

        {/* FAQ - Refined typography */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-medium mb-12 text-center tracking-tight">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 gap-12">
            {[
              {
                q: 'Do credits reset every month?',
                a: `Yes. Included credits reset at the start of each billing cycle — ${PRO_MONTHLY_CREDITS.toLocaleString()} on Cloud and ${TEAM_MONTHLY_CREDITS.toLocaleString()} on Sky. Unused credits do not roll over.`,
              },
              {
                q: 'When should I choose Sky over Cloud?',
                a: 'Choose Cloud for a single workspace. Choose Sky when you need up to 3 workspaces, shared access, and seat management for collaborators.',
              },
              {
                q: 'What happens if I run out?',
                a: 'You can purchase top-ups instantly to keep running on Cloud or Sky, or switch to your own keys on Local for zero cost.',
              },
              {
                q: 'Can I run Local forever?',
                a: 'Absolutely. Local OpenBot is MIT-licensed and core features will always be free. We only charge for managing the infrastructure for you.',
              },
              {
                q: 'Is there a free trial for hosted plans?',
                a: 'Not currently. Cloud and Sky are invite-only during early access. We focus on providing a high-performance managed runtime for serious builders.',
              },
            ].map(({ q, a }) => (
              <div key={q} className="group space-y-3">
                <h3 className="text-base font-medium text-foreground group-hover:text-primary transition-colors tracking-tight">{q}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className="border-t border-border mt-16">
        <div className="container mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-subtle-foreground text-xs">© {new Date().getFullYear()} OpenBot. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <button onClick={onBack} className="text-subtle-foreground hover:text-muted-foreground text-xs transition-colors cursor-pointer">Home</button>
            <button onClick={() => navigate('/privacy')} className="text-subtle-foreground hover:text-muted-foreground text-xs transition-colors cursor-pointer">Privacy Policy</button>
            <button onClick={() => navigate('/terms')} className="text-subtle-foreground hover:text-muted-foreground text-xs transition-colors cursor-pointer">Terms of Service</button>
            <button onClick={() => navigate('/refund-policy')} className="text-subtle-foreground hover:text-muted-foreground text-xs transition-colors cursor-pointer">Refund Policy</button>
          </div>
        </div>
      </footer>
    </div>
  )
}
