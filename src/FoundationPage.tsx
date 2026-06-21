import openbotLogo from './assets/openbotlogo.svg'

const navigate = (path: string) => { window.history.pushState({}, '', path); window.dispatchEvent(new PopStateEvent('popstate')) }

export default function FoundationPage({ onBack }: { onBack: () => void }) {
  const pillars = [
    {
      title: 'Open Source Stewardship',
      desc: 'The OpenBot core is and will remain open source. The Foundation ensures the codebase stays community-owned, well-maintained, and free to use, fork, and build upon.',
    },
    {
      title: 'Community Grants',
      desc: 'We fund contributors who build agents, integrations, and tooling that expand the OpenBot ecosystem. If you\'re building something valuable for the community, we want to support you.',
    },
    {
      title: 'Research & Safety',
      desc: 'Agentic AI raises real questions about safety and oversight. The Foundation funds research into responsible agentic behavior, sandboxing, and human-in-the-loop design.',
    },
    {
      title: 'Education & Access',
      desc: 'We believe AI automation should be accessible to everyone. The Foundation supports educational programs and initiatives that help people learn to build with and benefit from AI agents.',
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-6 h-14 flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-2.5 cursor-pointer">
            <img src={openbotLogo} alt="OpenBot" className="w-6 h-6" />
            <span className="text-base font-medium">OpenBot</span>
          </button>
          <button onClick={onBack} className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">← Back to home</button>
        </div>
      </header>

      <div className="container mx-auto px-6 pt-20 pb-16 max-w-4xl">
        <p className="text-xs font-semibold tracking-[0.3em] text-subtle-foreground uppercase mb-4">Foundation</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Built for the community.<br />Governed by it too.</h1>
        <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mb-16">
          The OpenBot Foundation exists to ensure that the project remains open, independent, and in service of the people who use and build it — not just the company behind it.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-16">
          {pillars.map((p) => (
            <div key={p.title} className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <h3 className="text-foreground font-semibold mb-2">{p.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '48px' }}>
          <h2 className="text-2xl font-bold mb-4">Get Involved</h2>
          <p className="text-muted-foreground text-sm leading-relaxed mb-8 max-w-xl">
            The Foundation is in its early stages. If you're interested in contributing, applying for a grant, or helping shape its governance, reach out to us on Discord or GitHub.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="https://discord.gg/XYYXvN2ebB" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full px-8 py-3 text-sm font-medium text-foreground bg-secondary hover:bg-accent border border-border transition-colors">
              Join Discord
            </a>
            <a href="https://github.com/meetopenbot/openbot" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full px-8 py-3 text-sm font-medium text-foreground bg-secondary hover:bg-accent border border-border transition-colors">
              View on GitHub
            </a>
          </div>
        </div>
      </div>

      <footer className="border-t border-border mt-8">
        <div className="container mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-subtle-foreground text-xs">© {new Date().getFullYear()} OpenBot. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <button onClick={onBack} className="text-subtle-foreground hover:text-muted-foreground text-xs transition-colors cursor-pointer">Home</button>
            <button onClick={() => navigate('/about')} className="text-subtle-foreground hover:text-muted-foreground text-xs transition-colors cursor-pointer">About</button>
            <button onClick={() => navigate('/terms')} className="text-subtle-foreground hover:text-muted-foreground text-xs transition-colors cursor-pointer">Terms</button>
            <button onClick={() => navigate('/privacy')} className="text-subtle-foreground hover:text-muted-foreground text-xs transition-colors cursor-pointer">Privacy</button>
          </div>
        </div>
      </footer>
    </div>
  )
}
