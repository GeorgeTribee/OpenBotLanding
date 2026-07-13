import { useState } from 'react'
import openbotLogo from './assets/openbotlogo.svg'

function navigate(path: string) {
  window.history.pushState({}, '', path)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

function CheckIcon() {
  return (
    <svg className="w-4 h-4 text-foreground flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )
}

function WaitlistForm() {
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
      <div className="flex flex-col items-center gap-3 py-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground/10">
          <svg className="w-5 h-5 text-foreground" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-sm text-foreground font-medium">You're on the list.</p>
        <p className="text-xs text-muted-foreground text-center">We'll reach out to {email} when early access opens.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
      <input
        type="email"
        required
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="you@company.com"
        className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-shadow"
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full rounded-xl bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-colors hover:bg-foreground/90 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'Joining…' : 'Join Early Access Waitlist'}
      </button>
    </form>
  )
}

export default function PricingPage({ onBack }: { onBack: () => void }) {
  const selfHostedFeatures = [
    'Full multi-agent orchestration',
    'Local-first, your data stays on-device',
    'Bring your own API keys (BYOK)',
    '50+ community agents',
    'Open source — self-hostable',
    'Community support (Discord & GitHub)',
  ]

  const cloudFeatures = [
    'Everything in Self-hosted',
    'Managed infrastructure — zero setup',
    'Automatic updates & maintenance',
    'Web-based access from any device',
    'Team workspaces & collaboration',
    'Priority support',
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-6 h-14 flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-2.5 cursor-pointer">
            <img src={openbotLogo} alt="OpenBot" className="w-6 h-6" />
            <span className="text-base font-medium">OpenBot</span>
          </button>
          <button onClick={onBack} className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
            ← Back to home
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-6 py-16 max-w-5xl">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs font-semibold tracking-[0.3em] text-muted-foreground uppercase mb-4">Pricing</p>
          <h1 className="text-4xl font-bold mb-4">Simple, transparent pricing</h1>
          <p className="text-muted-foreground text-base max-w-xl mx-auto">
            Start free with self-hosted. Join the waitlist for our managed cloud — no infrastructure, no setup.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">

          {/* Self-hosted — Free */}
          <div className="rounded-2xl border border-border bg-card p-8 flex flex-col gap-6">
            <div>
              <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-3">Self-hosted</p>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-5xl font-bold">Free</span>
              </div>
              <p className="text-sm text-muted-foreground">Forever. Open source under MIT license.</p>
            </div>

            <div className="h-px bg-border" />

            <ul className="flex flex-col gap-3">
              {selfHostedFeatures.map(f => (
                <li key={f} className="flex items-start gap-3">
                  <CheckIcon />
                  <span className="text-sm text-foreground/90">{f}</span>
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-2 flex flex-col gap-3">
              <a
                href="https://github.com/meetopenbot/openbot"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                View on GitHub
              </a>
              <a
                href="https://openbot.one"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                Launch App
              </a>
            </div>
          </div>

          {/* Cloud — Early Access */}
          <div className="rounded-2xl border border-foreground/20 bg-card p-8 flex flex-col gap-6 relative overflow-hidden">
            {/* Subtle glow */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/30 to-transparent pointer-events-none" />

            <div>
              <div className="flex items-center gap-2 mb-3">
                <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">Cloud</p>
                <span className="rounded-full border border-foreground/20 bg-foreground/10 px-2 py-0.5 text-[10px] font-semibold tracking-widest text-foreground uppercase">Early Access</span>
              </div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-5xl font-bold">TBD</span>
              </div>
              <p className="text-sm text-muted-foreground">Managed, hosted OpenBot. Join the waitlist for pricing details.</p>
            </div>

            <div className="h-px bg-border" />

            <ul className="flex flex-col gap-3">
              {cloudFeatures.map(f => (
                <li key={f} className="flex items-start gap-3">
                  <CheckIcon />
                  <span className="text-sm text-foreground/90">{f}</span>
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-2">
              <WaitlistForm />
            </div>
          </div>
        </div>

        {/* Comparison highlights */}
        <div className="mb-20">
          <h2 className="text-xl font-semibold text-center mb-8">What's the difference?</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 pr-6 text-muted-foreground font-medium w-1/2"></th>
                  <th className="py-3 px-4 text-foreground font-semibold text-center">Self-hosted</th>
                  <th className="py-3 px-4 text-foreground font-semibold text-center">Cloud</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  ['Requires local install', '✓', '✗'],
                  ['Managed infrastructure', '✗', '✓'],
                  ['Automatic updates', '✗', '✓'],
                  ['Bring Your Own API Keys', '✓', '✓'],
                  ['Data stays on your device', '✓', '✗'],
                  ['Web access from any device', '✗', '✓'],
                  ['Team workspaces', '✗', '✓'],
                  ['Open source', '✓', '✓'],
                  ['Free to use', '✓', 'Waitlist'],
                ].map(([label, self, cloud]) => (
                  <tr key={label} className="group hover:bg-muted/30 transition-colors">
                    <td className="py-3 pr-6 text-foreground/80">{label}</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">{self}</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">{cloud}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold mb-8 text-center">Pricing FAQ</h2>
          <div className="flex flex-col gap-8">
            {[
              {
                q: 'When will Cloud be available?',
                a: 'We\'re in early development. Join the waitlist and you\'ll be among the first to know — with early access pricing locked in.',
              },
              {
                q: 'Will self-hosted always be free?',
                a: 'Yes. OpenBot self-hosted is MIT-licensed and will always be free. We will never change that.',
              },
              {
                q: 'Do I still need my own API keys for Cloud?',
                a: 'Yes, Cloud is also Bring Your Own Key. We manage the infrastructure; you keep control of your API providers.',
              },
              {
                q: 'Is there an enterprise plan?',
                a: 'Enterprise plans with SSO, audit logs, and dedicated support are on the roadmap. Reach out on Discord or via email to discuss.',
              },
              {
                q: 'What\'s the refund policy for Cloud?',
                a: 'Cloud subscriptions will include a 30-day no-questions-asked refund window. See our Refund Policy for full details.',
              },
            ].map(({ q, a }) => (
              <div key={q} className="border-b border-border pb-8 last:border-0">
                <h3 className="text-base font-medium text-foreground mb-2">{q}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
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
