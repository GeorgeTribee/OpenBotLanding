import openbotLogo from './assets/openbotlogo.svg'

const navigate = (path: string) => { window.history.pushState({}, '', path); window.dispatchEvent(new PopStateEvent('popstate')) }

export default function BrandPage({ onBack }: { onBack: () => void }) {
  const colors = [
    { name: 'White', hex: '#FFFFFF', bg: '#FFFFFF', text: '#000000', desc: 'Primary' },
    { name: 'Black', hex: '#000000', bg: '#000000', text: '#FFFFFF', desc: 'Background', border: true },
    { name: 'Zinc 900', hex: '#18181B', bg: '#18181B', text: '#FFFFFF', desc: 'Surface' },
    { name: 'Zinc 400', hex: '#A1A1AA', bg: '#A1A1AA', text: '#000000', desc: 'Secondary text' },
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
        <p className="text-xs font-semibold tracking-[0.3em] text-subtle-foreground uppercase mb-4">Brand</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Brand guidelines.</h1>
        <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mb-16">
          These assets are for press, community projects, and integrations. Please follow the usage guidelines to keep the OpenBot brand consistent.
        </p>

        {/* Logo */}
        <section className="mb-16">
          <h2 className="text-xl font-semibold mb-6">Logo</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-2xl p-10 flex flex-col items-center gap-4" style={{ background: '#000000', border: '1px solid rgba(255,255,255,0.1)' }}>
              <img src={openbotLogo} alt="OpenBot logo" className="w-14 h-14" />
              <span className="text-subtle-foreground text-xs">On dark</span>
            </div>
            <div className="rounded-2xl p-10 flex flex-col items-center gap-4" style={{ background: '#F4F4F5' }}>
              <img src={openbotLogo} alt="OpenBot logo" className="w-14 h-14" style={{ filter: 'invert(1)' }} />
              <span className="text-muted-foreground text-xs">On light</span>
            </div>
          </div>

          <div className="mt-5 rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <p className="text-muted-foreground text-sm font-semibold mb-3">Usage rules</p>
            <ul className="flex flex-col gap-2 text-muted-foreground text-sm">
              <li className="flex gap-2"><span className="text-foreground shrink-0">✓</span>Use the logo on dark or light backgrounds with sufficient contrast.</li>
              <li className="flex gap-2"><span className="text-foreground shrink-0">✓</span>Maintain clear space equal to the logo height on all sides.</li>
              <li className="flex gap-2"><span className="text-subtle-foreground shrink-0">✗</span>Don't stretch, rotate, recolor, or add effects to the logo.</li>
              <li className="flex gap-2"><span className="text-subtle-foreground shrink-0">✗</span>Don't use the logo in a way that implies endorsement by OpenBot.</li>
            </ul>
          </div>
        </section>

        {/* Colors */}
        <section className="mb-16">
          <h2 className="text-xl font-semibold mb-6">Colors</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {colors.map((c) => (
              <div key={c.name} className="flex flex-col gap-3">
                <div
                  className="rounded-xl h-20 w-full"
                  style={{ background: c.bg, border: c.border ? '1px solid rgba(255,255,255,0.1)' : undefined }}
                />
                <div>
                  <p className="text-foreground text-sm font-medium">{c.name}</p>
                  <p className="text-subtle-foreground text-xs">{c.hex}</p>
                  <p className="text-subtle-foreground text-xs">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Typography */}
        <section className="mb-16">
          <h2 className="text-xl font-semibold mb-6">Typography</h2>
          <div className="rounded-2xl p-6 border border-border bg-secondary/40">
            <p className="text-subtle-foreground text-xs mb-2">UI / Headings / Body</p>
            <p className="text-3xl font-medium font-heading">Plus Jakarta Sans</p>
            <p className="text-muted-foreground text-sm mt-1">Used for headings, body text, UI elements, and the wordmark on the marketing site.</p>
          </div>
        </section>

        {/* Download */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Download Assets</h2>
          <p className="text-muted-foreground text-sm mb-6">Brand assets including logo files, are available on request. Reach out on Discord.</p>
          <a
            href="https://discord.gg/XYYXvN2ebB"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full px-8 py-3 text-sm font-medium text-primary-foreground bg-primary hover:opacity-90 transition-colors"
          >
            Request assets on Discord
          </a>
        </section>
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
