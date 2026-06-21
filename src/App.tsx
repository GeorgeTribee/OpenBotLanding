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
import workspaceScreen from './assets/screen2.png'

const DOCS_URL = 'https://docs.getopenbot.com'

export function WorkspaceScreenshot() {
  return (
    <div className="relative mx-auto max-w-5xl">
      <div
        className="absolute -inset-4 rounded-2xl opacity-60 blur-2xl pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 80%, rgba(168, 178, 255, 0.12) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="relative rounded-xl border border-border overflow-hidden shadow-[0_0_0_1px_oklch(1_0_0/0.03),0_24px_80px_-12px_rgba(0,0,0,0.8)]">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent pointer-events-none z-10" aria-hidden="true" />

        <div className="relative max-h-[min(640px,70vh)] overflow-hidden">
          <img
            src={workspaceScreen}
            alt="OpenBot workspace coordinating Firecrawl and Remotion agents to generate a promo video"
            className="w-full h-auto block"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  )
}

export function FAQSection() {
  const faqs = [
    {
      q: 'Is OpenBot really local-first?',
      a: 'Yes. OpenBot runs as a local application on your machine. Your API keys, agent configurations, and task data are stored locally and never sent to our servers.'
    },
    {
      q: 'Do I need my own API keys?',
      a: 'Yes, OpenBot is a "Bring Your Own Key" (BYOK) platform. You can connect your OpenAI, Anthropic, Google Gemini, or any other supported provider keys directly.'
    },
    {
      q: 'Can I build my own agents?',
      a: 'Absolutely. We provide a comprehensive SDK and documentation to help you build, test, and deploy your own specialized agents.'
    },
    {
      q: 'How does multi-agent orchestration work?',
      a: 'OpenBot uses a central controller that breaks down your natural language requests into sub-tasks and assigns them to the most capable agents in your workspace.'
    },
    {
      q: 'Is there an enterprise version?',
      a: 'Yes, we offer an Enterprise plan for teams that need advanced features like SSO, audit logs, and dedicated support. Contact us for more details.'
    }
  ]

  return (
    <section id="faq" className="py-24 border-t border-border">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-medium text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-base">
            Everything you need to know about OpenBot.
          </p>
        </div>

        <div className="space-y-8">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-border pb-8">
              <h3 className="text-lg font-medium text-foreground mb-3">{faq.q}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function CommunitySection() {
  return (
    <section className="py-24 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-6">
              Join a growing community of builders
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              OpenBot is powered by a community of developers, researchers, and automation enthusiasts. Join us on Discord to share your agents and get help with your workflows.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="https://discord.gg/XYYXvN2ebB" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-[#5865F2] hover:opacity-90 text-white px-6 py-3 rounded-full font-medium transition-all">
                <SiDiscord size={20} />
                Join Discord
              </a>
              <a href="https://github.com/meetopenbot/openbot" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-secondary hover:bg-accent border border-border text-foreground px-6 py-3 rounded-full font-medium transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" /></svg>
                Star on GitHub
              </a>
            </div>
          </div>
          <div className="lg:w-1/2 grid grid-cols-2 gap-4">
            <div className="p-8 rounded-2xl border border-border bg-secondary/40 text-center">
              <div className="text-4xl font-bold text-foreground mb-2">100%</div>
              <div className="text-muted-foreground text-sm uppercase tracking-widest">Open Source</div>
            </div>
            <div className="p-8 rounded-2xl border border-border bg-secondary/40 text-center">
              <div className="text-4xl font-bold text-foreground mb-2">50+</div>
              <div className="text-muted-foreground text-sm uppercase tracking-widest">Community Agents</div>
            </div>
            <div className="p-8 rounded-2xl border border-border bg-secondary/40 text-center">
              <div className="text-4xl font-bold text-foreground mb-2">24/7</div>
              <div className="text-muted-foreground text-sm uppercase tracking-widest">Expert Support</div>
            </div>
            <div className="p-8 rounded-2xl border border-border bg-secondary/40 text-center">
              <div className="text-4xl font-bold text-foreground mb-2">Local</div>
              <div className="text-muted-foreground text-sm uppercase tracking-widest">Privacy First</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function FeaturesSection() {
  const features = [
    {
      title: 'Local-First Architecture',
      desc: 'Your data stays on your machine. OpenBot runs locally, ensuring maximum privacy and speed.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: 'Multi-Agent Orchestration',
      desc: 'Coordinate multiple specialized agents to handle complex, multi-step workflows automatically.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    },
    {
      title: 'Open Source & Extensible',
      desc: 'Built on open standards. Browse the registry for community agents or build your own with our SDK.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      )
    },
    {
      title: 'Bring Your Own Keys',
      desc: 'Use your own API keys for OpenAI, Anthropic, Google, and more. No middleman markups.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
        </svg>
      )
    },
    {
      title: 'Persistent Memory',
      desc: 'Agents remember context across sessions, allowing for long-running projects and deep research.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: 'Real-time State Tracking',
      desc: 'Monitor every thought, action, and file change as it happens. Full transparency into the AI process.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    }
  ]

  return (
    <section id="features" className="py-24 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-4">
            Built for performance and privacy
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            OpenBot is more than just a chat interface. It's a complete platform for building and running autonomous AI agents.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div key={i} className="p-8 rounded-2xl border border-border bg-secondary/40 hover:bg-accent/60 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-6 text-foreground group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-medium text-foreground mb-3">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function HowItWorksSection() {
  const steps = [
    { title: 'Compose', desc: 'Describe your task in natural language.' },
    { title: 'Orchestrate', desc: 'OpenBot coordinates agents to solve complex workflows.' },
    { title: 'Deliver', desc: 'Results delivered directly to your environment.' },
  ]

  return (
    <section id="how-it-works" className="py-32 border-t border-border">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="flex flex-col md:flex-row gap-16 md:gap-24">
          <div className="md:w-1/3">
            <h2 className="text-3xl font-medium text-foreground sticky top-32">
              How it works
            </h2>
            <p className="mt-4 text-muted-foreground text-sm leading-relaxed">
              OpenBot simplifies complex automation by orchestrating specialized AI agents.
            </p>
          </div>

          <div className="md:w-2/3 flex flex-col gap-16">
            {steps.map((step, i) => (
              <div key={i} className="flex flex-col gap-4 relative">
                <div className="flex items-center gap-4">
                  <span className="text-subtle-foreground text-xs font-medium tabular-nums tracking-widest uppercase">Step 0{i + 1}</span>
                  <div className="h-px flex-1 bg-border" />
                </div>
                <h3 className="text-foreground text-2xl font-medium">{step.title}</h3>
                <p className="text-muted-foreground text-base leading-relaxed max-w-md">
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
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Global Cinematic Background */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        {/* Cinematic background base gradient */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at center, oklch(0.21 0.006 285.8 / 0.4) 0%, var(--background) 100%)' }} />
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
      <header role="banner" aria-label="Site navigation" style={{ backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', background: 'oklch(0.168 0.002 286 / 0.85)', borderBottom: '1px solid var(--border)', transition: 'opacity 0.3s ease, transform 0.3s ease' }} className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
        <nav aria-label="Primary navigation" className="relative flex items-center px-8 md:px-12" style={{ height: 56 }}>
          <a href="/" aria-label="OpenBot home" className="flex items-center gap-2.5">
            <img src={openbotLogo} alt="" aria-hidden="true" width="20" height="20" className="w-5 h-5" />
            <span className="text-foreground text-[15px] font-medium">OpenBot</span>
          </a>
          <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-8">
            <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors" style={{ fontSize: '14px' }}>How it works</a>
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors" style={{ fontSize: '14px' }}>Features</a>
            <a href="#faq" className="text-muted-foreground hover:text-foreground transition-colors" style={{ fontSize: '14px' }}>FAQ</a>
            <a href={DOCS_URL} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" style={{ fontSize: '14px' }}>Docs</a>
          </div>
          <div className="ml-auto">
            <a href="https://openbot.one" target="_blank" rel="noopener noreferrer" className="text-primary-foreground text-sm font-medium rounded-full px-5 py-2 transition-colors bg-primary hover:opacity-90 inline-block">
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
              <span className="text-foreground text-[15px] font-medium">OpenBot</span>
            </a>
            <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-7">
              <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors" style={{ fontSize: '14px' }}>How it works</a>
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors" style={{ fontSize: '14px' }}>Features</a>
              <a href="#faq" className="text-muted-foreground hover:text-foreground transition-colors" style={{ fontSize: '14px' }}>FAQ</a>
              <a href={DOCS_URL} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" style={{ fontSize: '14px' }}>Docs</a>
            </div>
            <div className="ml-auto">
              <a href="https://openbot.one" target="_blank" rel="noopener noreferrer" className="text-primary-foreground text-sm font-medium rounded-full px-5 py-2 transition-colors bg-primary hover:opacity-90 inline-block">
                Login
              </a>
            </div>
          </nav>

          {/* Center content */}
          <div className="relative z-10 flex flex-col items-center text-center px-6 py-20 w-full max-w-4xl mx-auto">
            {/* App icon */}
            <img src={openbotLogo} alt="OpenBot" width="48" height="48" className="w-12 h-12 mb-6" style={{ filter: 'none', boxShadow: 'none' }} />

            {/* Title */}
            <h1 className="text-foreground leading-none tracking-tight mb-4" style={{ fontSize: 'clamp(30px, 7vw, 40px)', fontWeight: 500, textShadow: 'none', filter: 'none' }}>
              What should we work on?
            </h1>
            <p className="mb-8 max-w-2xl text-base text-muted-foreground md:text-lg">
              Stop running agents in isolation. Coordinate specialized agents in one shared, local-first, open-source workspace.
            </p>

            <AgentComposer registry={registry} />
          </div>
        </section>

        {/* Continuous ambient background for the lower sections */}
        <div className="relative">
          <div className="relative z-10">
            <AgentCarousel agents={registry?.agents ?? []} />

            <section className="container mx-auto px-6 py-20">
              <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-medium mb-4 text-foreground">
                    A powerful, local-first workspace
                  </h2>
                  <p className="text-muted-foreground text-base max-w-2xl mx-auto">
                    Experience the full power of OpenBot with our integrated workspace. Coordinate agents, manage state, and track progress in real-time.
                  </p>
                </div>
                <WorkspaceScreenshot />
              </div>
            </section>

            <HowItWorksSection />
            <FeaturesSection />
            <CommunitySection />
            <FAQSection />

            {/* Get Started / CTA Section */}
            <section id="get-started" className="relative py-20 md:py-32">
              <div className="container mx-auto px-6">
                <div className="max-w-3xl mx-auto text-center">
                  <h2 className="text-3xl font-medium mb-16 text-foreground">
                    Get Started in Minutes
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16 relative">
                    {/* Connecting lines for desktop */}
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent -translate-y-1/2 z-0" />

                    {[
                      { step: '01', label: 'login' },
                      { step: '02', label: 'connect runtime' },
                      { step: '03', label: 'byok' },
                      { step: '04', label: 'done', highlight: true }
                    ].map((item, i) => (
                      <div key={i} className="relative z-10 flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-[10px] font-bold mb-4 border ${item.highlight ? 'bg-primary text-primary-foreground border-primary' : 'bg-background text-muted-foreground border-border'}`}>
                          {item.step}
                        </div>
                        <span className={`text-xs uppercase tracking-widest ${item.highlight ? 'text-foreground font-semibold' : 'text-muted-foreground'}`}>
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  <a href="https://openbot.one" target="_blank" rel="noopener noreferrer">
                    <Button size="lg" className="bg-primary text-primary-foreground hover:opacity-90 rounded-full px-10 py-6 h-auto text-sm font-semibold transition-all hover:scale-105">
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
                  <span className="text-xl font-medium text-foreground">OpenBot</span>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                  The multi-agent coordination platform. Browse the registry or build your own agents.
                </p>
                {/* Social icons */}
                <div className="flex gap-3 mt-1">
                  <a href="https://github.com/meetopenbot/openbot" target="_blank" rel="noopener noreferrer"
                    aria-label="OpenBot on GitHub"
                    className="w-9 h-9 rounded-full flex items-center justify-center transition-all border border-border bg-card"
                  >
                    <svg aria-hidden="true" className="w-4 h-4 text-muted-foreground" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="https://discord.gg/XYYXvN2ebB" target="_blank" rel="noopener noreferrer"
                    aria-label="OpenBot on Discord"
                    className="w-9 h-9 rounded-full flex items-center justify-center transition-all border border-border bg-card"
                  >
                    <SiDiscord aria-hidden="true" size={15} className="text-muted-foreground" />
                  </a>
                  <a href="https://x.com/MeetOpenBot" target="_blank" rel="noopener noreferrer"
                    aria-label="OpenBot on X (Twitter)"
                    className="w-9 h-9 rounded-full flex items-center justify-center transition-all border border-border bg-card"
                  >
                    <svg aria-hidden="true" className="w-4 h-4 text-muted-foreground" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Product column */}
              <div className="flex flex-col gap-4">
                <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">Product</p>
                {[
                  { label: 'Features', href: '#features' },
                  { label: 'How it Works', href: '#how-it-works' },
                  { label: 'FAQ', href: '#faq' },
                  { label: 'Documentation', href: DOCS_URL },
                ].map(({ label, href }) => (
                  <a key={label} href={href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors">{label}</a>
                ))}
              </div>

              {/* Community column */}
              <div className="flex flex-col gap-4">
                <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">Community</p>
                {[
                  { label: 'Discord', href: 'https://discord.gg/XYYXvN2ebB' },
                  { label: 'X / Twitter', href: 'https://x.com/MeetOpenBot' },
                  { label: 'GitHub Issues', href: 'https://github.com/meetopenbot/openbot/issues' },
                  { label: 'Contributing', href: 'https://github.com/meetopenbot/openbot/blob/main/CONTRIBUTING.md' },
                ].map(({ label, href }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors">{label}</a>
                ))}
              </div>

              {/* Company column */}
              <div className="flex flex-col gap-4">
                <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">Company</p>
                {[
                  { label: 'About Us', href: '/about' },
                  { label: 'Our Charter', href: '/charter' },
                  { label: 'Foundation', href: '/foundation' },
                  { label: 'Careers', href: '/careers' },
                  { label: 'Brand', href: '/brand' },
                ].map(({ label, href }) => (
                  href.startsWith('/') ? (
                    <button key={label} onClick={() => { window.history.pushState({}, '', href); window.dispatchEvent(new PopStateEvent('popstate')) }} className="text-left text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">{label}</button>
                  ) : (
                    <a key={label} href={href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{label}</a>
                  )
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-border mb-6" />

            {/* Bottom bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-subtle-foreground text-xs">
                © {new Date().getFullYear()} OpenBot. All rights reserved.
              </p>
              <div className="flex items-center gap-5">
                <button onClick={() => { window.history.pushState({}, '', '/terms'); window.dispatchEvent(new PopStateEvent('popstate')) }} className="text-subtle-foreground hover:text-foreground text-xs transition-colors cursor-pointer">Terms of Service</button>
                <button onClick={() => { window.history.pushState({}, '', '/privacy'); window.dispatchEvent(new PopStateEvent('popstate')) }} className="text-subtle-foreground hover:text-foreground text-xs transition-colors cursor-pointer">Privacy Policy</button>
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
