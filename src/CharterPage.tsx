import openbotLogo from './assets/openbotlogo.svg'

const navigate = (path: string) => { window.history.pushState({}, '', path); window.dispatchEvent(new PopStateEvent('popstate')) }

export default function CharterPage({ onBack }: { onBack: () => void }) {
  const commitments = [
    {
      title: 'We build in the open.',
      desc: 'OpenBot\'s core is open source. Our code, roadmap, and decisions are visible to anyone. We believe transparency is the foundation of trust.',
    },
    {
      title: 'We put users first.',
      desc: 'We will never sell user data, harvest prompts, or build features that benefit us at the expense of the people using OpenBot. Full stop.',
    },
    {
      title: 'We respect your machine.',
      desc: 'OpenBot is local-first by design. Your API keys, memories, and workflows stay on your device. We don\'t want access to data we don\'t need.',
    },
    {
      title: 'We move with intention.',
      desc: 'Speed matters, but not at the cost of safety. Every agentic action OpenBot takes is auditable, reversible where possible, and scoped to what you\'ve authorized.',
    },
    {
      title: 'We build for everyone.',
      desc: 'The power of AI agents shouldn\'t be reserved for engineers. Our goal is to make OpenBot usable by anyone — regardless of technical background.',
    },
    {
      title: 'We take responsibility.',
      desc: 'We\'re building tools that take real-world action. We take that responsibility seriously. We actively work to prevent misuse and build safeguards into the platform.',
    },
  ]

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

      <div className="container mx-auto px-6 pt-20 pb-16 max-w-3xl">
        <p className="text-xs font-semibold tracking-[0.3em] text-zinc-600 uppercase mb-4">Our Charter</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">The principles we build by.</h1>
        <p className="text-zinc-400 text-lg leading-relaxed mb-16">
          This charter is a public commitment — to our users, our contributors, and ourselves. It defines what OpenBot stands for and how we make decisions when things get hard.
        </p>

        <div className="flex flex-col gap-6">
          {commitments.map((c, i) => (
            <div key={c.title} className="flex gap-6 py-6" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <span className="text-zinc-700 text-sm font-mono mt-1 shrink-0">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h2 className="text-white font-semibold mb-2">{c.title}</h2>
                <p className="text-zinc-500 text-sm leading-relaxed">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-2xl p-8 text-center" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <p className="text-zinc-400 text-sm leading-relaxed">
            This charter is a living document. As OpenBot grows, we will update it — always publicly, always with explanation. If you believe we're not living up to these commitments, <a href="https://discord.gg/XYYXvN2ebB" target="_blank" rel="noopener noreferrer" className="text-white underline hover:text-zinc-300 transition-colors">tell us</a>.
          </p>
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
