import { useState, useEffect, useRef } from 'react'
import openbotLogo from './assets/openbotlogo.svg'

const navigate = (path: string) => { window.history.pushState({}, '', path); window.dispatchEvent(new PopStateEvent('popstate')) }

type Job = {
  role: string
  team: string
  type: string
  location: string
  salary: string
  desc: string
  about: string
  responsibilities: string[]
  requirements: string[]
  nice: string[]
}

const openings: Job[] = [
  {
    role: 'Senior Full-Stack Engineer',
    team: 'Engineering',
    type: 'Full-time',
    location: 'Remote',
    salary: '$120,000 – $160,000',

    desc: 'Help build the core OpenBot runtime, agent orchestration layer, and web interface.',
    about: 'You\'ll own features end-to-end across the stack — from the agent runtime in Node.js to the React interface. You\'ll work closely with the founders and have a direct say in architecture decisions.',
    responsibilities: [
      'Design and build features across the full stack (Node.js, React, TypeScript)',
      'Improve the agent orchestration runtime and task execution pipeline',
      'Collaborate on API design for agent plugins and integrations',
      'Write clean, tested, maintainable code and help define engineering standards',
      'Participate in code reviews and technical planning',
    ],
    requirements: [
      '5+ years of full-stack engineering experience',
      'Strong TypeScript and Node.js skills',
      'Experience with React and modern frontend tooling',
      'Comfortable with async systems and event-driven architecture',
      'Excellent written communication (remote-first team)',
    ],
    nice: [
      'Experience with AI/LLM integrations',
      'Familiarity with agent frameworks or automation tools',
      'Open source contributions',
    ],
  },
  {
    role: 'AI/ML Engineer',
    team: 'Engineering',
    type: 'Full-time',
    location: 'Hybrid',
    salary: '$130,000 – $170,000',
    desc: 'Work on the intelligence layer — prompt engineering, model routing, memory systems, and agent reasoning.',
    about: 'You\'ll work on the parts of OpenBot that make it smart — how it understands user intent, routes tasks to the right agents, manages long-term memory, and improves over time.',
    responsibilities: [
      'Design and improve the prompt layer and model routing logic',
      'Build and maintain the memory and context management system',
      'Evaluate model performance and optimize for accuracy and cost',
      'Research and integrate new LLM capabilities as they emerge',
      'Work with the team to define how agents reason and delegate tasks',
    ],
    requirements: [
      '3+ years working with LLMs in production',
      'Strong understanding of prompt engineering and RAG systems',
      'Experience with OpenAI, Anthropic, or similar APIs',
      'Ability to evaluate and benchmark model performance',
      'Comfortable working in TypeScript or Python',
    ],
    nice: [
      'Experience with vector databases (Pinecone, Chroma, etc.)',
      'Background in ML research or fine-tuning',
      'Knowledge of agentic frameworks (LangChain, AutoGPT, etc.)',
    ],
  },
  {
    role: 'Developer Advocate',
    team: 'Community',
    type: 'Full-time',
    location: 'On-site',
    salary: '$90,000 – $120,000',
    desc: 'Be the bridge between OpenBot and its developer community.',
    about: 'You\'ll represent OpenBot to developers everywhere — creating tutorials, demos, and content that helps people get the most out of the platform. You\'ll also bring developer feedback directly into product decisions.',
    responsibilities: [
      'Create technical content: tutorials, blog posts, demos, and videos',
      'Engage with the community on Discord, GitHub, and social media',
      'Speak at meetups and conferences',
      'Build example agents and integrations that showcase OpenBot\'s capabilities',
      'Act as a feedback channel between users and the product team',
    ],
    requirements: [
      '2+ years in developer advocacy, developer relations, or technical content',
      'Comfortable writing code and explaining technical concepts clearly',
      'Strong written and verbal communication skills',
      'Genuine interest in AI and automation',
    ],
    nice: [
      'Existing developer audience or community presence',
      'Experience with video content creation',
      'Background in building AI-powered tools',
    ],
  },
  {
    role: 'Product Designer',
    team: 'Design',
    type: 'Full-time',
    location: 'Remote',
    salary: '$100,000 – $140,000',
    desc: 'Shape how people interact with AI agents.',
    about: 'You\'ll own the design of OpenBot from end to end — the web interface, agent builder, onboarding flow, and documentation. Your goal is to make something powerful feel simple.',
    responsibilities: [
      'Own the end-to-end design of the OpenBot product',
      'Design the agent builder, task dashboard, and onboarding experience',
      'Work closely with engineers to ship polished, well-considered UI',
      'Create and maintain a consistent design system',
      'Conduct user research and translate insights into design decisions',
    ],
    requirements: [
      '4+ years of product design experience',
      'Strong portfolio with complex product work',
      'Proficient in Figma',
      'Ability to design for both technical and non-technical users',
      'Experience working directly with engineers in a fast-moving environment',
    ],
    nice: [
      'Experience designing for AI or developer tools',
      'Basic front-end skills (HTML/CSS)',
      'Motion design experience',
    ],
  },
]

const perks = [
  'Fully remote team',
  'Competitive salary + equity',
  'Cutting-edge AI agent tech',
  'Async-first culture',
  'Direct impact from day one',
  'Flexible hours',
]

function ApplyDrawer({ job, onClose }: { job: Job; onClose: () => void }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', linkedin: '', coverLetter: '' })
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [visible, setVisible] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)))
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
    }
  }, [onClose])

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const inputCls = "bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none focus:border-white transition-colors w-full"
  const labelCls = "text-xs text-zinc-500 mb-1.5 block"

  return (
    <div className="fixed inset-0 z-50 flex" onClick={onClose}
      style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.25s ease' }}
    >
      {/* Backdrop */}
      <div className="flex-1" style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }} />

      {/* Drawer */}
      <div
        className="relative flex flex-col w-full max-w-xl h-full overflow-y-auto"
        style={{
          background: '#0a0a0a',
          borderLeft: '1px solid rgba(255,255,255,0.08)',
          transform: visible ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4" style={{ background: '#0a0a0a', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div>
            <p className="text-white font-semibold">{job.role}</p>
            <p className="text-zinc-600 text-xs mt-0.5">{job.team} · {job.type} · {job.location}</p>
          </div>
          <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors cursor-pointer ml-4 shrink-0">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="flex flex-col gap-8 px-6 py-8">
          {!submitted ? (
            <>
              {/* Job details */}
              <section>
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-xs font-medium px-3 py-1 rounded-full" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>{job.salary}</span>
                  <span className="text-xs font-medium px-3 py-1 rounded-full" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>{job.location}</span>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed">{job.about}</p>
              </section>

              <section>
                <h3 className="text-sm font-semibold text-white mb-3">Responsibilities</h3>
                <ul className="flex flex-col gap-2">
                  {job.responsibilities.map(r => (
                    <li key={r} className="flex gap-2.5 text-sm text-zinc-500">
                      <svg className="w-4 h-4 text-white shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      {r}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h3 className="text-sm font-semibold text-white mb-3">Requirements</h3>
                <ul className="flex flex-col gap-2">
                  {job.requirements.map(r => (
                    <li key={r} className="flex gap-2.5 text-sm text-zinc-500">
                      <svg className="w-4 h-4 text-white shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      {r}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h3 className="text-sm font-semibold text-white mb-3">Nice to have</h3>
                <ul className="flex flex-col gap-2">
                  {job.nice.map(n => (
                    <li key={n} className="flex gap-2.5 text-sm text-zinc-600">
                      <span className="shrink-0 mt-0.5">+</span>
                      {n}
                    </li>
                  ))}
                </ul>
              </section>

              {/* Divider */}
              <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }} />

              {/* Application form */}
              <section>
                <h3 className="text-base font-semibold text-white mb-6">Apply for this role</h3>
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>Full name *</label>
                      <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Jane Smith" className={inputCls} />
                    </div>
                    <div>
                      <label className={labelCls}>Phone number</label>
                      <input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="+1 555 000 0000" className={inputCls} />
                    </div>
                  </div>

                  <div>
                    <label className={labelCls}>Email address *</label>
                    <input required type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="jane@company.com" className={inputCls} />
                  </div>

                  <div>
                    <label className={labelCls}>LinkedIn profile</label>
                    <input value={form.linkedin} onChange={e => setForm(f => ({ ...f, linkedin: e.target.value }))} placeholder="https://linkedin.com/in/..." className={inputCls} />
                  </div>

                  <div>
                    <label className={labelCls}>CV / Resume *</label>
                    <div
                      className="rounded-xl px-4 py-5 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors"
                      style={{ border: '1px dashed rgba(255,255,255,0.15)', background: cvFile ? 'rgba(255,255,255,0.04)' : 'transparent' }}
                      onClick={() => fileRef.current?.click()}
                    >
                      {cvFile ? (
                        <>
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                          <p className="text-sm text-white">{cvFile.name}</p>
                          <p className="text-xs text-zinc-600">{(cvFile.size / 1024).toFixed(0)} KB · Click to change</p>
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5 text-zinc-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                          <p className="text-sm text-zinc-500">Upload your CV</p>
                          <p className="text-xs text-zinc-700">PDF, DOC up to 10MB</p>
                        </>
                      )}
                      <input ref={fileRef} type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={e => setCvFile(e.target.files?.[0] ?? null)} />
                    </div>
                  </div>

                  <div>
                    <label className={labelCls}>Cover letter</label>
                    <textarea
                      rows={5}
                      value={form.coverLetter}
                      onChange={e => setForm(f => ({ ...f, coverLetter: e.target.value }))}
                      placeholder="Tell us why you'd be a great fit for this role..."
                      className={`${inputCls} resize-none`}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-full py-3 text-sm font-medium transition-all cursor-pointer mt-1"
                    style={{ background: '#fff', color: '#000' }}
                  >
                    Submit Application
                  </button>
                </form>
              </section>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-20">
              <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}>
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Application sent!</h3>
              <p className="text-zinc-500 text-sm mb-8 max-w-xs">Thanks for applying for <span className="text-white">{job.role}</span>. We'll review your application and get back to you soon.</p>
              <button onClick={onClose} className="text-sm text-zinc-500 hover:text-white transition-colors cursor-pointer">Close</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function CareersPage({ onBack }: { onBack: () => void }) {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [search, setSearch] = useState('')
  const [locationFilter, setLocationFilter] = useState('All')

  const locations = ['All', ...Array.from(new Set(openings.map(j => j.location)))]

  const filtered = openings.filter(j => {
    const matchSearch = j.role.toLowerCase().includes(search.toLowerCase()) || j.team.toLowerCase().includes(search.toLowerCase())
    const matchLocation = locationFilter === 'All' || j.location === locationFilter
    return matchSearch && matchLocation
  })

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
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h2 className="text-xl font-semibold">Open Roles</h2>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" /></svg>
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search roles..."
                  className="bg-zinc-900 border border-zinc-800 rounded-full pl-9 pr-4 py-2 text-sm text-white placeholder-zinc-600 outline-none focus:border-white transition-colors w-full sm:w-52"
                />
              </div>
              <select
                value={locationFilter}
                onChange={e => setLocationFilter(e.target.value)}
                className="bg-zinc-900 border border-zinc-800 rounded-full px-4 py-2 text-sm text-white outline-none focus:border-white transition-colors cursor-pointer appearance-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2352525b' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '14px', paddingRight: '32px' }}
              >
                {locations.map(l => <option key={l} value={l} style={{ background: '#18181b' }}>{l === 'All' ? 'All locations' : l}</option>)}
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {filtered.length === 0 ? (
              <div className="text-center py-12 text-zinc-600 text-sm">No roles match your search.</div>
            ) : filtered.map(job => (
              <div key={job.role} className="rounded-2xl p-6 transition-all" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-white font-semibold">{job.role}</h3>
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className="text-zinc-600 text-xs">{job.team}</span>
                      <span className="text-zinc-800">·</span>
                      <span className="text-zinc-600 text-xs">{job.type}</span>
                      <span className="text-zinc-800">·</span>
                      <span className="text-zinc-600 text-xs">{job.location}</span>
                      <span className="text-zinc-800">·</span>
                      <span className="text-zinc-600 text-xs">{job.salary}</span>
                    </div>
                    <p className="text-zinc-500 text-sm mt-3 leading-relaxed">{job.desc}</p>
                  </div>
                  <button
                    onClick={() => setSelectedJob(job)}
                    className="shrink-0 inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-medium text-black bg-white hover:bg-zinc-200 transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* No role */}
        <div className="mt-10 rounded-2xl p-8 text-center" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <h3 className="font-semibold mb-2">Don't see your role?</h3>
          <p className="text-zinc-500 text-sm mb-5">We're always looking for exceptional people. Reach out anyway.</p>
          <a href="https://discord.gg/XYYXvN2ebB" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full px-8 py-3 text-sm font-medium text-black bg-white hover:bg-zinc-200 transition-colors">
            Say hello on Discord
          </a>
        </div>
      </div>

      {selectedJob && <ApplyDrawer job={selectedJob} onClose={() => setSelectedJob(null)} />}

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
