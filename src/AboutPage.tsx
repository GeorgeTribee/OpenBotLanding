import openbotLogo from './assets/openbotlogo.svg'

export default function AboutPage({ onBack }: { onBack: () => void }) {
  const values = [
    {
      title: 'Local-First',
      desc: 'Your data stays on your machine. We believe AI tools should work for you, not harvest from you.',
    },
    {
      title: 'Radical Transparency',
      desc: 'Open source at the core. Every decision OpenBot makes is auditable, inspectable, and yours to understand.',
    },
    {
      title: 'Agent-Native',
      desc: 'We\'re not bolting AI onto old software. OpenBot is built from the ground up for a world run by agents.',
    },
    {
      title: 'Builder-Obsessed',
      desc: 'We build for people who want to get things done — developers, founders, and teams who move fast.',
    },
  ]

  const team = [
    {
      name: 'George Tribee',
      role: 'Co-Founder & CEO',
      bio: 'Obsessed with automation and building tools that give people leverage. Previously built products used by thousands of developers.',
      avatar: 'GT',
    },
    {
      name: 'David Dataselia',
      role: 'Co-Founder & CTO',
      bio: 'Drives the technical vision behind OpenBot. Passionate about building systems that give people real leverage through AI.',
      avatar: 'DD',
    },
    {
      name: 'Mate Tsirekidze',
      role: 'Software Engineer',
      bio: 'Builds the core of OpenBot. Focused on reliability, performance, and making the agent runtime feel effortless.',
      avatar: 'MT',
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white" style={{ fontFamily: "'Outfit', Arial, sans-serif" }}>
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-zinc-900 bg-black/80 backdrop-blur-md">
        <div className="container mx-auto px-6 h-14 flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-2.5 cursor-pointer">
            <img src={openbotLogo} alt="OpenBot" className="w-6 h-6" />
            <span className="text-base font-medium" style={{ fontFamily: "'Raleway', sans-serif" }}>OpenBot</span>
          </button>
          <button onClick={onBack} className="text-sm text-zinc-400 hover:text-white transition-colors cursor-pointer">
            ← Back to home
          </button>
        </div>
      </header>

      {/* Hero */}
      <div className="container mx-auto px-6 pt-20 pb-16 max-w-4xl text-center">
        <p className="text-xs font-semibold tracking-[0.3em] text-zinc-600 uppercase mb-4">About Us</p>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          We're building the OS<br />for AI agents.
        </h1>
        <p className="text-zinc-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
          OpenBot started with a simple belief: the next wave of software won't be written by humans clicking through interfaces — it'll be orchestrated by agents working together, autonomously, on your behalf.
        </p>
      </div>

      {/* Divider */}
      <div className="container mx-auto px-6 max-w-4xl">
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }} />
      </div>

      {/* Vision */}
      <div className="container mx-auto px-6 py-16 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs font-semibold tracking-[0.3em] text-zinc-600 uppercase mb-4">Our Vision</p>
            <h2 className="text-3xl font-bold mb-5">A world where AI works for people, not the other way around.</h2>
          </div>
          <div className="flex flex-col gap-5 text-zinc-400 leading-relaxed">
            <p>
              Today, most AI tools are glorified chat boxes. You type, it answers, you copy-paste the result. That's not intelligence. That's a fancy search engine.
            </p>
            <p>
              We're building something different. OpenBot is an orchestration layer that coordinates specialized AI agents to take real action: sending messages, writing code, browsing the web, managing files, and executing workflows. All without you lifting a finger.
            </p>
            <p>
              Our vision is a future where anyone, regardless of technical skill, can delegate entire workflows to AI agents and trust that the work gets done right.
            </p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="container mx-auto px-6 max-w-4xl">
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }} />
      </div>

      {/* Values */}
      <div className="container mx-auto px-6 py-16 max-w-4xl">
        <p className="text-xs font-semibold tracking-[0.3em] text-zinc-600 uppercase mb-4">What We Believe</p>
        <h2 className="text-3xl font-bold mb-10">Our principles.</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {values.map((v) => (
            <div
              key={v.title}
              className="rounded-2xl p-6"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <h3 className="text-white font-semibold mb-2">{v.title}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="container mx-auto px-6 max-w-4xl">
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }} />
      </div>

      {/* Team */}
      <div className="container mx-auto px-6 py-16 max-w-4xl">
        <p className="text-xs font-semibold tracking-[0.3em] text-zinc-600 uppercase mb-4">The Team</p>
        <h2 className="text-3xl font-bold mb-10">Built by people who care.</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {team.map((member) => (
            <div
              key={member.name}
              className="rounded-2xl p-6 flex flex-col gap-4"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                  style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
                >
                  {member.avatar}
                </div>
                <div>
                  <p className="font-semibold text-white">{member.name}</p>
                  <p className="text-zinc-500 text-sm">{member.role}</p>
                </div>
              </div>
              <p className="text-zinc-500 text-sm leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="container mx-auto px-6 max-w-4xl">
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }} />
      </div>

      {/* CTA */}
      <div className="container mx-auto px-6 py-16 max-w-4xl text-center">
        <h2 className="text-3xl font-bold mb-4">We're just getting started.</h2>
        <p className="text-zinc-400 mb-8">Join us on Discord, follow the build, or just try OpenBot for yourself.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://openbot.one"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full px-8 py-3 text-sm font-medium text-black bg-white hover:bg-zinc-200 transition-colors"
          >
            Try OpenBot
          </a>
          <a
            href="https://discord.gg/XYYXvN2ebB"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full px-8 py-3 text-sm font-medium text-white transition-colors"
            style={{ border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.04)' }}
          >
            Join Discord
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-zinc-900 mt-4">
        <div className="container mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-zinc-600 text-xs">© {new Date().getFullYear()} OpenBot. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <button onClick={onBack} className="text-zinc-600 hover:text-zinc-400 text-xs transition-colors cursor-pointer">Home</button>
            <button onClick={() => { window.history.pushState({}, '', '/terms'); window.dispatchEvent(new PopStateEvent('popstate')) }} className="text-zinc-600 hover:text-zinc-400 text-xs transition-colors cursor-pointer">Terms</button>
            <button onClick={() => { window.history.pushState({}, '', '/privacy'); window.dispatchEvent(new PopStateEvent('popstate')) }} className="text-zinc-600 hover:text-zinc-400 text-xs transition-colors cursor-pointer">Privacy</button>
          </div>
        </div>
      </footer>
    </div>
  )
}
