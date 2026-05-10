import openbotLogo from './assets/openbotlogo.svg'

const navigate = (path: string) => { window.history.pushState({}, '', path); window.dispatchEvent(new PopStateEvent('popstate')) }

const perks = [
  'Fully remote team',
  'Competitive salary + equity',
  'Cutting-edge AI agent tech',
  'Async-first culture',
  'Direct impact from day one',
  'Flexible hours',
]

export default function CareersPage({ onBack }: { onBack: () => void }) {

  return (
    <div className="min-h-screen bg-black text-white" style={{ fontFamily: "'Outfit', Arial, sans-serif" }}>
      <header className="sticky top-0 z-50 border-b border-zinc-900 bg-black/80 backdrop-blur-md">
        <div className="container mx-auto px-6 h-14 flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-2.5 cursor-pointer">
            <img src={openbotLogo} alt="OpenBot" className="w-6 h-6" />
            <span className="text-base font-medium" style={{ fontFamily: "'Raleway', sans-serif" }}>OpenBot</span>
          </button>
          <button onClick={onBack} className="text-sm text-zinc-400 hover:text-white transition-colors cursor-pointer">← Back to home</button>
        </div>
      </header>

      <div className="container mx-auto px-6 pt-20 pb-16 max-w-4xl">
        <p className="text-xs font-semibold tracking-[0.3em] text-zinc-600 uppercase mb-4">Careers</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Help us build the future<br />of AI automation.</h1>
        <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl mb-16">
          We're a small team building something ambitious. If you want to work on hard problems, ship fast, and have real ownership over what you build, you'll fit right in.
        </p>

        {/* Perks */}
        <div className="mb-16">
          <h2 className="text-xl font-semibold mb-6">Why OpenBot</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {perks.map(p => (
              <div key={p} className="flex items-center gap-2.5 rounded-xl px-4 py-3" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <svg className="w-4 h-4 text-white shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                <span className="text-zinc-400 text-sm">{p}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Openings */}
        <div>
          <h2 className="text-xl font-semibold mb-6">Open Roles</h2>
          <div className="rounded-2xl p-12 text-center" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <p className="text-zinc-300 font-medium mb-2">No open positions at the moment</p>
            <p className="text-zinc-600 text-sm mb-8">We're not actively hiring right now, but we're always happy to hear from talented people.</p>
            <a href="https://discord.gg/XYYXvN2ebB" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full px-8 py-3 text-sm font-medium text-black bg-white hover:bg-zinc-200 transition-colors">
              Say hello on Discord
            </a>
          </div>
        </div>
      </div>

      <footer className="border-t border-zinc-900 mt-8">
        <div className="container mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-zinc-600 text-xs">© {new Date().getFullYear()} OpenBot. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <button onClick={onBack} className="text-zinc-600 hover:text-zinc-400 text-xs transition-colors cursor-pointer">Home</button>
            <button onClick={() => navigate('/about')} className="text-zinc-600 hover:text-zinc-400 text-xs transition-colors cursor-pointer">About</button>
            <button onClick={() => navigate('/terms')} className="text-zinc-600 hover:text-zinc-400 text-xs transition-colors cursor-pointer">Terms</button>
            <button onClick={() => navigate('/privacy')} className="text-zinc-600 hover:text-zinc-400 text-xs transition-colors cursor-pointer">Privacy</button>
          </div>
        </div>
      </footer>
    </div>
  )
}
