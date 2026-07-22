import { useState } from 'react'
import openbotLogo from './assets/openbotlogo.svg'

const APP_URL = 'https://openbot.one'
const DOCS_URL = 'https://docs.getopenbot.com'
const CREDITS_FAQ_URL = `${DOCS_URL}/billing/credits`
const PRO_MONTHLY_PRICE = 60
const MONTHLY_CREDITS = 2000

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
  const selfHostedFeatures = [
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

  const enterpriseFeatures = [
    'Multiple cloud workspaces',
    'Team seat management',
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

      <div className="relative z-10 container mx-auto px-6 py-20 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[10px] font-bold tracking-[0.4em] text-muted-foreground uppercase mb-6 opacity-80">Pricing</p>
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-6 bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent">
            Run free on your machine.<br />Pay when you want us to run it for you.
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            OpenBot splits cleanly into two paths. Run locally for privacy and control, or upgrade to Pro for managed cloud with zero setup.
          </p>
        </div>

        {/* Mental Model Switcher - Polished */}
        <div className="relative flex justify-center mb-24">
          <div className="inline-flex p-1 rounded-2xl bg-muted/20 border border-border/40 backdrop-blur-sm">
            <div className="flex items-center gap-1">
              <div className="px-6 py-4 text-center rounded-xl transition-all">
                <p className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase mb-1">Local</p>
                <p className="text-sm text-foreground font-medium">Your machine, your keys</p>
                <div className="mt-1 h-px w-8 bg-border/60 mx-auto" />
                <p className="text-[10px] text-muted-foreground/60 mt-1 uppercase font-semibold">Free forever</p>
              </div>
              <div className="w-px h-8 bg-border/40" />
              <div className="px-6 py-4 text-center rounded-xl bg-foreground/[0.03] border border-foreground/10 shadow-sm">
                <p className="text-[10px] font-bold tracking-widest text-foreground uppercase mb-1">Cloud</p>
                <p className="text-sm text-foreground font-medium">We run it, LLM included</p>
                <div className="mt-1 h-px w-8 bg-primary/40 mx-auto" />
                <p className="text-[10px] text-primary mt-1 uppercase font-bold">Requires Pro</p>
              </div>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
          {/* Self-hosted */}
          <div className="group relative rounded-3xl border border-border/40 bg-card/40 p-8 flex flex-col gap-8 backdrop-blur-md transition-all hover:border-border/80">
            <div className="flex flex-col gap-1">
              <p className="text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase">Self-hosted</p>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-medium tabular-nums">$0</span>
              </div>
              <p className="text-sm text-muted-foreground/80">Open source under MIT license.</p>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-border/40 to-transparent" />

            <ul className="flex flex-col gap-4 flex-1">
              {selfHostedFeatures.map(f => (
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

          {/* Pro Cloud - Recommended */}
          <div className="group relative rounded-3xl border border-foreground/20 bg-card p-8 flex flex-col gap-8 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] lg:scale-[1.05] z-10 transition-all">
            {/* Glossy top border */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/40 to-transparent pointer-events-none" />

            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-[10px] font-bold tracking-[0.2em] text-foreground uppercase">Pro Cloud</p>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-medium tabular-nums">${PRO_MONTHLY_PRICE}</span>
                  <span className="text-muted-foreground text-sm font-medium">/mo</span>
                </div>
                <p className="text-sm font-medium text-foreground/90">Includes {MONTHLY_CREDITS.toLocaleString()} credits</p>
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

          {/* Enterprise */}
          <div className="group relative rounded-3xl border border-border/40 bg-card/40 p-8 flex flex-col gap-8 backdrop-blur-md transition-all hover:border-border/80">
            <div className="flex flex-col gap-1">
              <p className="text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase">Enterprise</p>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-medium tracking-tight">Custom</span>
              </div>
              <p className="text-sm text-muted-foreground/80">For teams with multi-cloud needs.</p>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-border/40 to-transparent" />

            <ul className="flex flex-col gap-4 flex-1">
              {enterpriseFeatures.map(f => (
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
              Contact support
            </a>
          </div>
        </div>

        {/* Credits section - Polished */}
        <div className="relative max-w-3xl mx-auto mb-32 group">
          <div className="absolute -inset-1 bg-gradient-to-r from-border/20 via-border/40 to-border/20 rounded-[2rem] blur opacity-25" />
          <div className="relative rounded-[2rem] border border-border/40 bg-muted/10 backdrop-blur-sm p-10 text-center">
            <h2 className="text-lg font-medium mb-4 tracking-tight">How credits work</h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12 mb-10">
              <div className="flex flex-col items-center">
                <span className="text-3xl font-medium tabular-nums text-foreground">{MONTHLY_CREDITS.toLocaleString()}</span>
                <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase mt-1">Credits / mo</span>
              </div>
              <div className="hidden md:block w-px h-8 bg-border/40" />
              <div className="flex flex-col items-center">
                <span className="text-3xl font-medium text-foreground">≈ $20</span>
                <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase mt-1">Provider cost</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left border-t border-border/40 pt-10">
              <div className="space-y-2">
                <p className="text-xs font-bold text-foreground/90 uppercase tracking-widest">Fixed Value</p>
                <p className="text-xs text-muted-foreground leading-relaxed">1 credit is always pegged to $0.01 of provider spend. No markups.</p>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-bold text-foreground/90 uppercase tracking-widest">Multi-Model</p>
                <p className="text-xs text-muted-foreground leading-relaxed">Usage scales with model cost. Top-ups available if you hit the limit.</p>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-bold text-foreground/90 uppercase tracking-widest">Usage Based</p>
                <p className="text-xs text-muted-foreground leading-relaxed">Credits cover agent runs, not storage. <a href={CREDITS_FAQ_URL} className="text-foreground underline underline-offset-4 hover:opacity-80 transition-opacity">Learn more</a></p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ - Refined typography */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-medium mb-12 text-center tracking-tight">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 gap-12">
            {[
              {
                q: 'Do credits reset every month?',
                a: `Yes. Your ${MONTHLY_CREDITS.toLocaleString()} included credits reset at the start of each billing cycle. Unused credits do not roll over.`,
              },
              {
                q: 'What happens if I run out?',
                a: 'You can purchase top-ups instantly to keep running on Cloud, or switch to your own keys on Self-hosted for zero cost.',
              },
              {
                q: 'Can I self-host forever?',
                a: 'Absolutely. Self-hosted OpenBot is MIT-licensed and core features will always be free. We only charge for managing the infrastructure for you.',
              },
              {
                q: 'Is there a free trial for Cloud?',
                a: 'Not currently. Cloud is invite-only and requires a Pro subscription. We focus on providing a high-performance managed runtime for serious builders.',
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
