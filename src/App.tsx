import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Copy, Check, Star } from 'lucide-react'
import { SiWhatsapp, SiTelegram, SiDiscord, SiSlack, SiSignal, SiImessage, SiInstagram, SiFacebook, SiLinkedin, SiAnthropic, SiOpenai, SiGooglegemini, SiPerplexity, SiHuggingface, SiGithub, SiX, SiGmail, SiGooglechrome, SiSpotify, SiYoutube, SiObsidian, SiGooglemeet, SiAirbnb, SiWizzair, SiRyanair, SiZoom, SiGooglecalendar, SiExpedia, SiTripadvisor, SiFigma, SiCanva, SiTrello, SiNotion, SiJira, SiAsana, SiLinear, SiDropbox, SiGoogledrive, SiAirtable, SiClickup, SiConfluence, SiUber, SiLyft, SiHotelsdotcom, SiAmazon, SiEbay, SiGlovo } from 'react-icons/si'
import { TbBrandBooking, TbBrandVscode } from 'react-icons/tb'
import openbotLogo from './assets/openbotlogo.svg'
import demoVideo from './assets/PromoVideo.mp4'
import heroBg from './assets/background.jpg'

const GrokIcon = ({ size = 16, style, className }: { size?: number; style?: React.CSSProperties; className?: string }) => (
  <svg width={size} height={size} viewBox="0.36 0.5 33.33 32" fill="currentColor" style={style} className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M13.2371 21.0407L24.3186 12.8506C24.8619 12.4491 25.6384 12.6057 25.8973 13.2294C27.2597 16.5185 26.651 20.4712 23.9403 23.1851C21.2297 25.8989 17.4581 26.4941 14.0108 25.1386L10.2449 26.8843C15.6463 30.5806 22.2053 29.6665 26.304 25.5601C29.5551 22.3051 30.562 17.8683 29.6205 13.8673L29.629 13.8758C28.2637 7.99809 29.9647 5.64871 33.449 0.844576C33.5314 0.730667 33.6139 0.616757 33.6964 0.5L29.1113 5.09055V5.07631L13.2343 21.0436" />
    <path d="M10.9503 23.0313C7.07343 19.3235 7.74185 13.5853 11.0498 10.2763C13.4959 7.82722 17.5036 6.82767 21.0021 8.2971L24.7595 6.55998C24.0826 6.07017 23.215 5.54334 22.2195 5.17313C17.7198 3.31926 12.3326 4.24192 8.67479 7.90126C5.15635 11.4239 4.0499 16.8403 5.94992 21.4622C7.36924 24.9165 5.04257 27.3598 2.69884 29.826C1.86829 30.7002 1.0349 31.5745 0.36364 32.5L10.9474 23.0341" />
  </svg>
)

function TerminalCopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000) }}
      className="p-1.5 rounded text-zinc-600 hover:text-zinc-300 hover:bg-zinc-800 transition-all"
      aria-label="Copy"
    >
      {copied ? <Check className="w-4 h-4 text-purple-400" /> : <Copy className="w-4 h-4" />}
    </button>
  )
}

function QuickStartTerminal() {
  const [tab, setTab] = useState<'npm' | 'pnpm'>('npm')

  const commands = {
    npm: [
      { comment: '# Install the CLI', cmd: 'npm i -g openbot' },
      { comment: '# Configure your model (OpenAI, Anthropic, etc.)', cmd: 'openbot configure' },
      { comment: '# Start the agent server', cmd: 'openbot server', args: ['--openai-api-key', '--anthropic-api-key'] },
      { comment: '# Start the Web Interface', cmd: 'npx openbot-web' },
    ],
    pnpm: [
      { comment: '# Install the CLI', cmd: 'pnpm add -g openbot' },
      { comment: '# Configure your model (OpenAI, Anthropic, etc.)', cmd: 'openbot configure' },
      { comment: '# Start the agent server', cmd: 'openbot server', args: ['--openai-api-key', '--anthropic-api-key'] },
      { comment: '# Start the Web Interface', cmd: 'npx openbot-web' },
    ],
  }

  return (
    <div id="quick-start" className="mt-12">
      <p className="text-xs font-semibold tracking-[0.3em] text-zinc-700 uppercase mb-5">Quick Start</p>

      <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.07)', background: '#000' }}>
        {/* Terminal header */}
        <div className="flex items-center justify-between px-5 py-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-700"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-700"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-700"></div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setTab('npm')}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${tab === 'npm' ? 'bg-white/10 text-white' : 'text-zinc-600 hover:text-zinc-400'}`}
            >
              npm
            </button>
            <button
              onClick={() => setTab('pnpm')}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${tab === 'pnpm' ? 'bg-white/10 text-white' : 'text-zinc-600 hover:text-zinc-400'}`}
            >
              pnpm
            </button>
          </div>
        </div>

        {/* Terminal body */}
        <div className="p-6 space-y-4 font-mono text-sm">
          {commands[tab].map(({ comment, cmd, args }: { comment: string; cmd: string; args?: string[] }) => (
            <div key={cmd}>
              <div className="text-zinc-700 text-xs mb-1">{comment}</div>
              <div className="flex items-center justify-between group">
                <div>
                  <span className="text-zinc-600">$ </span>
                  <span className="text-zinc-300">{cmd}</span>
                  {args && args.map((arg, i) => (
                    <span key={arg}>
                      {i > 0 && <span className="text-zinc-700"> or </span>}
                      {i === 0 && <span> </span>}
                      <span className="text-zinc-500">{arg}</span>
                    </span>
                  ))}
                </div>
                <TerminalCopyBtn text={cmd} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="text-center text-xs text-zinc-700 mt-4">
        Works on macOS & Linux. Windows coming soon.
      </p>

      {/* GitHub Star */}
      <div className="mt-6 text-center">
        <a
          href="https://github.com/meetopenbot/openbot"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 transition-all rounded-full px-5 py-2.5 text-sm text-zinc-500 hover:text-zinc-300"
          style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.03)' }}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
          </svg>
          <span>Star on GitHub</span>
          <Star className="w-3.5 h-3.5 fill-yellow-400" stroke="#facc14" strokeWidth={2} strokeLinejoin="round" />
        </a>
      </div>
    </div>
  )
}


function DocTerminal({ children, copyText }: { children: React.ReactNode; copyText: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-4 font-mono text-sm">
      <span>{children}</span>
      <button
        onClick={() => { navigator.clipboard.writeText(copyText); setCopied(true); setTimeout(() => setCopied(false), 2000) }}
        className="text-zinc-600 hover:text-zinc-300 transition-colors ml-4 shrink-0"
      >
        {copied
          ? <Check className="w-4 h-4 text-green-400" />
          : <Copy className="w-4 h-4" />}
      </button>
    </div>
  )
}

function highlight(text: string, query: string): React.ReactNode {
  const lower = text.toLowerCase()
  const qLower = query.toLowerCase()
  const idx = lower.indexOf(qLower)
  if (idx === -1) return <>{text}</>
  return <>{text.slice(0, idx)}<span className="text-purple-400 font-semibold">{text.slice(idx, idx + query.length)}</span>{text.slice(idx + query.length)}</>
}

function getKeywordSnippet(keywords: string, query: string): string | null {
  const lower = keywords.toLowerCase()
  const idx = lower.indexOf(query.toLowerCase())
  if (idx === -1) return null
  const start = Math.max(0, idx - 25)
  const end = Math.min(keywords.length, idx + query.length + 60)
  return (start > 0 ? '…' : '') + keywords.slice(start, end) + (end < keywords.length ? '…' : '')
}

const searchIndex: { id: string; title: string; section: string; keywords: string; sectionId?: string }[] = [
  { id: 'introduction', title: 'Get Started', section: 'Get started', keywords: 'openbot what is orchestrator local privacy extensible event-driven terminal browser' },
  { id: 'introduction', title: 'What is OpenBot?', section: 'Get started', keywords: 'what is openbot open source assistant actions messages code web files multi-agent architecture', sectionId: 'doc-what' },
  { id: 'introduction', title: 'Why OpenBot?', section: 'Get started', keywords: 'why privacy automation memory model openai anthropic local first', sectionId: 'doc-why' },
  { id: 'introduction', title: 'Installation', section: 'Get started', keywords: 'install npm pnpm package global install-g add openbot', sectionId: 'doc-install' },
  { id: 'introduction', title: 'Running OpenBot', section: 'Get started', keywords: 'run running server openai api key anthropic localhost 3000 start', sectionId: 'doc-run' },
  { id: 'philosophy', title: 'Manager-Agent Philosophy', section: 'Core Concepts', keywords: 'manager agent delegate event bus specialized workers orchestrate philosophy pattern delegate by default' },
  { id: 'manager-agent', title: 'Manager Agent', section: 'Agents', keywords: 'manager orchestrator brain delegateTask coordinate intent analyze summarize' },
  { id: 'manager-agent', title: 'Responsibilities', section: 'Agents · Manager Agent', keywords: 'responsibilities delegate memory coordinate synthesize results', sectionId: 'doc-ma-resp' },
  { id: 'manager-agent', title: 'delegateTask tool', section: 'Agents · Manager Agent', keywords: 'delegateTask tool agent os browser codex task string', sectionId: 'doc-ma-delegate' },
  { id: 'manager-agent', title: 'Memory integration', section: 'Agents · Manager Agent', keywords: 'memory integration brain plugin persist sessions recall context', sectionId: 'doc-ma-memory' },
  { id: 'os-agent', title: 'OS Agent', section: 'Agents', keywords: 'os terminal shell files commands git execute scripts system sandbox' },
  { id: 'os-agent', title: 'OS Agent Capabilities', section: 'Agents · OS Agent', keywords: 'shell commands files directories git scripts system operations', sectionId: 'doc-os-cap' },
  { id: 'browser-agent', title: 'Browser Agent', section: 'Agents', keywords: 'browser web stagehand navigate click forms extract screenshots automation internet' },
  { id: 'browser-agent', title: 'Browser Agent Capabilities', section: 'Agents · Browser Agent', keywords: 'navigate url click buttons fill forms extract data screenshots multi-step', sectionId: 'doc-br-cap' },
  { id: 'topic-agent', title: 'Topic Agent', section: 'Agents', keywords: 'topic title conversation label background utility thread name auto generate' },
  { id: 'codex-agent', title: 'Codex Agent', section: 'Agents', keywords: 'codex code engineer openai refactor debug architecture codebase software' },
  { id: 'codex-agent', title: 'Codex Capabilities', section: 'Agents · Codex Agent', keywords: 'architectural decisions refactoring logic debugging explore modify codebase', sectionId: 'doc-codex-cap' },
  { id: 'mobile', title: 'OpenBot Mobile', section: 'Agents', keywords: 'mobile app HITL notifications pocket coming soon human in the loop' },
  { id: 'memory', title: 'Persistent Brain & Memory', section: 'Memory', keywords: 'memory remember recall journal identity brain persistent store retrieve sessions long-term' },
  { id: 'roadmap', title: 'Planned Agents', section: 'Roadmap', keywords: 'roadmap browser-use researcher devops data scientist social planned future agents' },
  { id: 'extending', title: 'Built to be Extended', section: 'Extending', keywords: 'extend custom yaml agent typescript plugin builder workflow power user' },
  { id: 'extending', title: 'YAML Agents', section: 'Extending', keywords: 'yaml agent no code config file researcher browser file-system system prompt model', sectionId: 'doc-ext-yaml' },
  { id: 'extending', title: 'TS Agent Packages', section: 'Extending', keywords: 'typescript ts agent package custom logic index factory builder llmPlugin event handler', sectionId: 'doc-ext-ts' },
  { id: 'extending', title: 'Custom Plugins', section: 'Extending', keywords: 'plugin custom tool toolbox extend action builder event yield result', sectionId: 'doc-ext-plugin' },
  { id: 'reference', title: 'Direct Command Routing', section: 'Reference', keywords: 'routing direct command prefix slash /os /browser /codex skip manager', sectionId: 'doc-ref-routing' },
  { id: 'reference', title: 'Core Architecture', section: 'Reference', keywords: 'architecture manager plugin registry agent registry SDUI server driven ui dashboard', sectionId: 'doc-ref-arch' },
  { id: 'reference', title: 'Project Structure', section: 'Reference', keywords: 'project structure server web docs folder directory api guides', sectionId: 'doc-ref-structure' },
]

const docsContent: Record<string, { title: string; breadcrumb: string; toc: string[]; content: React.ReactNode }> = {
  introduction: {
    title: 'Get Started',
    breadcrumb: 'Get started',
    toc: ['What is OpenBot?', 'Why OpenBot?', 'Installation', 'Running OpenBot'],
    content: (
      <div>
        <h1 className="text-4xl font-bold mb-3">Get Started</h1>
        <p className="text-zinc-500 text-base mb-10 pl-4 border-l-2 border-zinc-700 italic">Meet OpenBot. Your own personal AI assistant.</p>

        <h2 id="doc-what" className="text-2xl font-bold mb-4">What is OpenBot?</h2>
        <p className="text-zinc-400 mb-4 text-sm leading-relaxed">OpenBot is an open-source AI assistant that goes beyond chatting. It performs real actions on your behalf — sending messages, writing code, browsing the web, managing files, and more — using a powerful multi-agent architecture.</p>
        <p className="text-zinc-400 mb-5 text-sm leading-relaxed">OpenBot is more than just a chatbot. It's an orchestrator that lives in your terminal and browser, delegating complex tasks to specialized agents. It's designed to be local-first, event-driven, and infinitely extensible.</p>
        <div className="grid md:grid-cols-3 gap-3 mb-12">
          {[
            { title: 'Local & Private', desc: 'Runs entirely on your machine. Your data never leaves your device.' },
            { title: 'Multi-Agent', desc: 'A Manager Agent orchestrates specialized workers to handle complex tasks.' },
            { title: 'Open Source', desc: 'Fully transparent, community-driven, and free to use and extend.' },
          ].map(({ title, desc }) => (
            <div key={title} className="rounded-lg border border-zinc-800 p-4 bg-zinc-900/30">
              <div className="font-semibold text-white text-sm mb-2">{title}</div>
              <p className="text-xs text-zinc-500">{desc}</p>
            </div>
          ))}
        </div>

        <h2 id="doc-why" className="text-2xl font-bold mb-4">Why OpenBot?</h2>
        <ul className="space-y-3 mb-12">
          {[
            { title: 'Complete Privacy', desc: 'Unlike cloud-based AI, OpenBot runs locally. No data is sent to third-party servers.' },
            { title: 'Real Automation', desc: 'Not just a chatbot — it executes tasks like running shell commands, browsing the web, and writing code.' },
            { title: 'Persistent Memory', desc: 'Remembers your preferences, past conversations, and context across sessions.' },
            { title: 'Any AI Model', desc: 'Works with OpenAI, Anthropic, Google Gemini, and more. You choose the model.' },
          ].map(({ title, desc }) => (
            <li key={title} className="flex gap-3 items-start text-sm">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-zinc-500 shrink-0" />
              <div>
                <span className="font-semibold text-white">{title}</span>
                <span className="text-zinc-500"> — {desc}</span>
              </div>
            </li>
          ))}
        </ul>

        <h2 id="doc-install" className="text-2xl font-bold mb-4">Installation</h2>
        <p className="text-zinc-400 mb-3 text-sm">Install OpenBot globally using npm or pnpm:</p>
        <div className="space-y-2 mb-12">
          <DocTerminal copyText="npm install -g openbot">
            <span className="text-purple-400">npm</span>
            <span className="text-zinc-300"> install -g openbot</span>
          </DocTerminal>
          <DocTerminal copyText="pnpm add -g openbot">
            <span className="text-purple-400">pnpm</span>
            <span className="text-zinc-300"> add -g openbot</span>
          </DocTerminal>
        </div>

        <h2 id="doc-run" className="text-2xl font-bold mb-4">Running OpenBot</h2>
        <p className="text-zinc-400 mb-3 text-sm">Start the server with your AI provider API key:</p>
        <div className="space-y-2 mb-5">
          <DocTerminal copyText="openbot server --openai-api-key YOUR_KEY">
            <span className="text-purple-400">openbot</span>
            <span className="text-zinc-300"> server </span>
            <span className="text-yellow-400">--openai-api-key</span>
            <span className="text-green-400"> YOUR_KEY</span>
          </DocTerminal>
          <DocTerminal copyText="openbot server --anthropic-api-key YOUR_KEY">
            <span className="text-purple-400">openbot</span>
            <span className="text-zinc-300"> server </span>
            <span className="text-yellow-400">--anthropic-api-key</span>
            <span className="text-green-400"> YOUR_KEY</span>
          </DocTerminal>
        </div>
        <p className="text-zinc-400 mb-3 text-sm">Then open the web interface in your browser:</p>
        <DocTerminal copyText="http://localhost:3000">
          <span className="text-purple-400">http://localhost:3000</span>
        </DocTerminal>
      </div>
    ),
  },
  philosophy: {
    title: 'Manager-Agent Philosophy',
    breadcrumb: 'Core Concepts',
    toc: ['Delegate by Default', 'Manager Agent', 'Specialized Agents', 'Event Bus'],
    content: (
      <div>
        <h1 className="text-4xl font-bold mb-3">The "Manager-Agent" Philosophy</h1>
        <p className="text-zinc-500 mb-8 pl-4 border-l-2 border-zinc-700 italic">OpenBot follows a <span className="text-purple-400 font-semibold">Delegate by Default</span> pattern.</p>
        <div className="space-y-4">
          {[
            { title: 'Manager Agent', desc: 'Your primary interface. It analyzes your intent, manages long-term memory (via the brain plugin), and orchestrates specialized workers.' },
            { title: 'Specialized Agents', desc: 'Workers dedicated to specific domains like os (shell & files), browser (web automation), or any custom agent you define.' },
            { title: 'Event Bus', desc: 'All communication happens asynchronously via events, allowing for complex multi-agent choreography and real-time UI updates.' },
          ].map(({ title, desc }) => (
            <div key={title} className="rounded-lg border border-zinc-800 p-5 bg-zinc-900/30">
              <div className="font-semibold text-white mb-2">{title}</div>
              <p className="text-sm text-zinc-400">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  'manager-agent': {
    title: 'Manager Agent',
    breadcrumb: 'Agents',
    toc: ['Overview', 'Responsibilities', 'delegateTask tool', 'Memory integration'],
    content: (
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div>
            <h1 className="text-4xl font-bold">Manager Agent</h1>
            <code className="text-purple-400 text-sm">The Orchestrator</code>
          </div>
        </div>
        <p className="text-zinc-400 mb-8">The central "brain" of the OpenBot ecosystem. It analyzes user intent, manages long-term memory (via the brain plugin), and coordinates other agents using the <code className="text-purple-300 bg-zinc-800 px-1.5 py-0.5 rounded text-sm">delegateTask</code> tool.</p>
        <h2 id="doc-ma-resp" className="text-xl font-semibold mb-3">Responsibilities</h2>
        <ul className="space-y-2 mb-8">
          {['Analyze user intent and determine which agent to delegate to', 'Manage long-term memory using the brain plugin (remember, recall)', 'Coordinate multiple specialized agents in parallel or sequence', 'Synthesize results and return a concise summary to the user'].map(r => (
            <li key={r} className="flex gap-2 text-sm text-zinc-400"><span className="text-purple-400 mt-0.5">→</span>{r}</li>
          ))}
        </ul>
        <h2 id="doc-ma-delegate" className="text-xl font-semibold mb-3">delegateTask tool</h2>
        <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4 font-mono text-sm text-zinc-300 mb-8">
          <span className="text-blue-400">delegateTask</span>({'{'}<br/>
          &nbsp;&nbsp;<span className="text-yellow-300">agent</span>: <span className="text-green-400">"os"</span> | <span className="text-green-400">"browser"</span> | <span className="text-green-400">"codex"</span> | ...<br/>
          &nbsp;&nbsp;<span className="text-yellow-300">task</span>: <span className="text-green-400">string</span><br/>
          {'}'})
        </div>
        <h2 id="doc-ma-memory" className="text-xl font-semibold mb-3">Memory integration</h2>
        <p className="text-sm text-zinc-400">The Manager Agent uses the brain plugin to persist information across sessions — automatically recalling relevant context before responding to new requests.</p>
      </div>
    ),
  },
  'os-agent': {
    title: 'OS Agent',
    breadcrumb: 'Agents',
    toc: ['Overview', 'Capabilities', 'Access boundaries'],
    content: (
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div>
            <h1 className="text-4xl font-bold">OS Agent</h1>
            <code className="text-purple-400 text-sm">os</code>
          </div>
        </div>
        <p className="text-zinc-400 mb-8">Your specialized terminal and file system companion. It has full access to your local machine (within the boundaries you set). It can execute shell commands, create/read/edit files, manage directories, and handle system-level operations.</p>
        <h2 id="doc-os-cap" className="text-xl font-semibold mb-3">Capabilities</h2>
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {['Execute shell commands', 'Create, read, edit files', 'Manage directories', 'Run git commands', 'Execute scripts', 'System-level operations'].map(c => (
            <div key={c} className="flex gap-2 items-center rounded-lg border border-zinc-800 p-3 text-sm text-zinc-400">
              <span className="text-purple-400">✓</span>{c}
            </div>
          ))}
        </div>
        <h2 className="text-xl font-semibold mb-3">Access boundaries</h2>
        <p className="text-sm text-zinc-400">The OS Agent operates within configurable sandboxing rules. You define which directories and operations are permitted in your OpenBot config.</p>
      </div>
    ),
  },
  'browser-agent': {
    title: 'Browser Agent',
    breadcrumb: 'Agents',
    toc: ['Overview', 'Powered by Stagehand', 'Capabilities', 'Planned: browser-use'],
    content: (
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div>
            <h1 className="text-4xl font-bold">Browser Agent</h1>
            <code className="text-purple-400 text-sm">browser · Stagehand</code>
          </div>
        </div>
        <p className="text-zinc-400 mb-8">A powerful web automation specialist based on Stagehand. It can navigate the internet exactly like a human would — browsing websites, clicking buttons, filling forms, and extracting data.</p>
        <h2 id="doc-br-cap" className="text-xl font-semibold mb-3">Capabilities</h2>
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {['Navigate to any URL', 'Click buttons & links', 'Fill forms', 'Extract page data', 'Take screenshots', 'Multi-step web flows'].map(c => (
            <div key={c} className="flex gap-2 items-center rounded-lg border border-zinc-800 p-3 text-sm text-zinc-400">
              <span className="text-purple-400">✓</span>{c}
            </div>
          ))}
        </div>
        <h2 className="text-xl font-semibold mb-3">Planned: browser-use Agent</h2>
        <div className="rounded-lg border border-dashed border-zinc-700 p-4 text-sm text-zinc-500">
          We also plan to introduce a parallel agent based on <code className="text-purple-300">browser-use</code> for alternative autonomous web navigation strategies with higher-level reasoning.
        </div>
      </div>
    ),
  },
  'topic-agent': {
    title: 'Topic Agent',
    breadcrumb: 'Agents',
    toc: ['Overview', 'How it works'],
    content: (
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div>
            <h1 className="text-4xl font-bold">Topic Agent</h1>
            <code className="text-purple-400 text-sm">topic</code>
          </div>
        </div>
        <p className="text-zinc-400 mb-8">A background utility that works silently to keep your workspace organized. It automatically analyzes the first few messages of a new conversation and generates a concise (3–5 word) title for the thread.</p>
        <h2 className="text-xl font-semibold mb-3">How it works</h2>
        <div className="space-y-3">
          {['Listens for new conversation events via the Event Bus', 'Analyzes the first 2–3 messages for context', 'Generates a concise 3–5 word title', 'Updates the conversation thread label automatically'].map((s, i) => (
            <div key={s} className="flex gap-3 items-start rounded-lg border border-zinc-800 p-4 text-sm text-zinc-400">
              <span className="text-purple-400 font-mono text-xs mt-0.5">{i + 1}.</span>{s}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  'codex-agent': {
    title: 'Codex Agent',
    breadcrumb: 'Agents',
    toc: ['Overview', 'Capabilities', 'File system access'],
    content: (
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div>
            <h1 className="text-4xl font-bold">Codex Agent</h1>
            <code className="text-purple-400 text-sm">codex</code>
          </div>
        </div>
        <p className="text-zinc-400 mb-8">A world-class software engineer and coding assistant powered by OpenAI. It helps with high-level architectural decisions, code refactoring, complex logic implementation, and debugging.</p>
        <h2 id="doc-codex-cap" className="text-xl font-semibold mb-3">Capabilities</h2>
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {['Architectural decisions', 'Code refactoring', 'Complex logic implementation', 'Debugging & analysis', 'Explore & modify codebase', 'Shell & file system access'].map(c => (
            <div key={c} className="flex gap-2 items-center rounded-lg border border-zinc-800 p-3 text-sm text-zinc-400">
              <span className="text-purple-400">✓</span>{c}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  mobile: {
    title: 'OpenBot Mobile',
    breadcrumb: 'Agents',
    toc: ['Overview', 'Planned features'],
    content: (
      <div className="opacity-70">
        <div className="flex items-center gap-3 mb-4">
          <div>
            <h1 className="text-4xl font-bold">OpenBot Mobile</h1>
            <span className="text-xs text-yellow-400 bg-yellow-400/10 border border-yellow-400/30 rounded-full px-2 py-0.5">Coming Soon</span>
          </div>
        </div>
        <p className="text-zinc-400 mb-8">We're bringing the power of OpenBot to your pocket! The upcoming mobile app will keep you connected to your agents anywhere.</p>
        <h2 className="text-xl font-semibold mb-3">Planned features</h2>
        <div className="space-y-3">
          {[
            { title: 'HITL (Human-In-The-Loop)', desc: 'Review and approve sensitive actions on the go.' },
            { title: 'Real-time Notifications', desc: 'Get notified when long-running tasks or agent operations complete.' },
            { title: 'Always-on Agents', desc: 'Your specialized coding and OS agents, always accessible from anywhere.' },
            { title: 'Multi-modal Interaction', desc: 'Seamlessly switch between text, voice, and file uploads.' },
          ].map(({ title, desc }) => (
            <div key={title} className="rounded-lg border border-zinc-800 p-4">
              <div className="font-semibold text-white text-sm mb-1">{title}</div>
              <p className="text-xs text-zinc-500">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  memory: {
    title: 'Persistent Brain & Memory',
    breadcrumb: 'Memory',
    toc: ['Overview', 'remember', 'recall', 'updateIdentity', 'journal'],
    content: (
      <div>
        <h1 className="text-4xl font-bold mb-3">Persistent Brain & Memory</h1>
        <p className="text-zinc-400 mb-8">Unlike most chatbots, OpenBot has long-term memory. It can store and retrieve information across sessions.</p>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { fn: 'remember', desc: 'Store facts, snippets, or preferences for later use in any future conversation.' },
            { fn: 'recall', desc: 'Search its past experiences to provide relevant context for new tasks.' },
            { fn: 'updateIdentity', desc: 'Maintain its own persona and "soul" in a persistent markdown file.' },
            { fn: 'journal', desc: 'Keep a daily log of activities, completed tasks, and insights.' },
          ].map(({ fn, desc }) => (
            <div key={fn} className="rounded-lg border border-zinc-800 p-5 bg-zinc-900/30">
              <code className="text-purple-300 font-mono text-base">{fn}()</code>
              <p className="text-sm text-zinc-500 mt-3">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  extending: {
    title: 'Built to be Extended',
    breadcrumb: 'Extending',
    toc: ['YAML Agents', 'TS Agent Packages', 'Custom Plugins'],
    content: (
      <div>
        <h1 className="text-4xl font-bold mb-3">Built to be Extended</h1>
        <p className="text-zinc-500 text-base mb-10 pl-4 border-l-2 border-zinc-700 italic">OpenBot is designed for power users and builders who want to create their own custom AI workflows without the complexity of building from scratch.</p>

        <h2 id="doc-ext-yaml" className="text-2xl font-bold mb-2">1. YAML Agents <span className="text-sm font-normal text-zinc-500 ml-2">(No Coding Required)</span></h2>
        <p className="text-zinc-400 text-sm mb-4 leading-relaxed">Create specialized agents just by writing a simple YAML file in <code className="text-purple-300 bg-zinc-800 px-1.5 py-0.5 rounded text-xs">~/.openbot/agents/researcher/agent.yaml</code>:</p>
        <pre className="rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-4 text-sm font-mono text-zinc-300 mb-10 overflow-x-auto leading-relaxed"><span className="text-purple-400">name</span><span className="text-zinc-500">:</span> researcher{'\n'}<span className="text-purple-400">description</span><span className="text-zinc-500">:</span> <span className="text-green-400">A specialized agent for gathering information and summarizing articles.</span>{'\n'}<span className="text-purple-400">model</span><span className="text-zinc-500">:</span> <span className="text-green-400">anthropic/claude-3-5-sonnet-20240620</span>{'\n'}<span className="text-purple-400">plugins</span><span className="text-zinc-500">:</span>{'\n'}  <span className="text-zinc-500">-</span> <span className="text-purple-400">name</span><span className="text-zinc-500">:</span> browser{'\n'}  <span className="text-zinc-500">-</span> <span className="text-purple-400">name</span><span className="text-zinc-500">:</span> file-system{'\n'}    <span className="text-purple-400">config</span><span className="text-zinc-500">:</span>{'\n'}      <span className="text-purple-400">baseDir</span><span className="text-zinc-500">:</span> <span className="text-green-400">~/Documents/Research</span>{'\n'}<span className="text-purple-400">systemPrompt</span><span className="text-zinc-500">: |</span>{'\n'}  <span className="text-zinc-400">You are an expert researcher.</span>{'\n'}  <span className="text-zinc-400">Use the browser to gather information and the file-system to save detailed reports.</span>{'\n'}  <span className="text-zinc-400">Always cite your sources and provide a high-level summary.</span></pre>

        <h2 id="doc-ext-ts" className="text-2xl font-bold mb-2">2. TS Agent Packages <span className="text-sm font-normal text-zinc-500 ml-2">(Advanced)</span></h2>
        <p className="text-zinc-400 text-sm mb-4 leading-relaxed">For more complex agents that require custom logic beyond a prompt, you can create a full TypeScript package in <code className="text-purple-300 bg-zinc-800 px-1.5 py-0.5 rounded text-xs">~/.openbot/agents/my-agent/</code>:</p>
        <pre className="rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-4 text-sm font-mono text-zinc-300 mb-10 overflow-x-auto leading-relaxed"><span className="text-zinc-500">{'// ~/.openbot/agents/my-agent/index.ts'}</span>{'\n'}<span className="text-blue-400">export const</span> <span className="text-yellow-300">agent</span> = {'{'}{'\n'}  <span className="text-purple-400">name</span>: <span className="text-green-400">"custom-agent"</span>,{'\n'}  <span className="text-purple-400">description</span>: <span className="text-green-400">"An agent with custom TS logic"</span>,{'\n'}  <span className="text-purple-400">factory</span>: {'({ model }) => (builder) => {'}{'\n'}    <span className="text-zinc-500">{'// Compose plugins and add custom event handlers'}</span>{'\n'}    <span className="text-yellow-300">builder</span>.<span className="text-blue-400">use</span>(<span className="text-yellow-300">llmPlugin</span>({'({'}{'\n'}      <span className="text-purple-400">model</span>,{'\n'}      <span className="text-purple-400">system</span>: <span className="text-green-400">"You are a specialized assistant..."</span>,{'\n'}      <span className="text-zinc-500">{'// ...'}</span>{'\n'}    {'})'}));{'\n'}  {'}'}{'\n'}{'}'}{';'}</pre>

        <h2 id="doc-ext-plugin" className="text-2xl font-bold mb-2">3. Custom Plugins</h2>
        <p className="text-zinc-400 text-sm mb-4 leading-relaxed">For those who want even more control, you can extend the AI's toolbox with custom logic. A plugin defines new tools and reacts to system events.</p>
        <pre className="rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-4 text-sm font-mono text-zinc-300 mb-10 overflow-x-auto leading-relaxed"><span className="text-blue-400">export const</span> <span className="text-yellow-300">myPlugin</span> = <span className="text-blue-400">{`() => (builder) => {`}</span>{'\n'}  <span className="text-yellow-300">builder</span>.<span className="text-blue-400">on</span>(<span className="text-green-400">"action:myTool"</span>, <span className="text-blue-400">async function*</span> (event, {'{ state }'}) {'{'}{'\n'}    <span className="text-zinc-500">{'// Perform custom logic or interact with other systems'}</span>{'\n'}    <span className="text-blue-400">yield</span> {'{ '}<span className="text-purple-400">type</span>: <span className="text-green-400">"action:taskResult"</span>, <span className="text-purple-400">data</span>: {'{ '}<span className="text-purple-400">result</span>: <span className="text-green-400">"Done!"</span> {'}}'};{'\n'}  {'}'});{'\n'}{'}'}{';'}</pre>

      </div>
    ),
  },
  reference: {
    title: 'Reference',
    breadcrumb: 'Reference',
    toc: ['Direct Command Routing', 'Core Architecture', 'Project Structure'],
    content: (
      <div>
        <h1 className="text-4xl font-bold mb-3">Reference</h1>
        <p className="text-zinc-500 text-base mb-10 pl-4 border-l-2 border-zinc-700 italic">Low-level details on how OpenBot routes commands, its internal architecture, and project layout.</p>

        <h2 id="doc-ref-routing" className="text-2xl font-bold mb-3">Direct Command Routing</h2>
        <p className="text-zinc-400 text-sm mb-4 leading-relaxed">Skip the manager's reasoning and talk directly to an agent using prefixes:</p>
        <div className="space-y-2 mb-10">
          {[
            { prefix: '/os', cmd: 'list files in current directory' },
            { prefix: '/browser', cmd: 'search for local weather' },
          ].map(({ prefix, cmd }) => (
            <div key={prefix} className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-5 py-3 font-mono text-sm">
              <span className="text-purple-400 font-semibold">{prefix}</span>
              <span className="text-zinc-300">{cmd}</span>
            </div>
          ))}
        </div>

        <h2 id="doc-ref-arch" className="text-2xl font-bold mb-3">Core Architecture</h2>
        <div className="space-y-3 mb-10">
          {[
            { name: 'Manager', desc: 'Central brain, handles /remember and /recall.' },
            { name: 'Plugin Registry', desc: 'Centralized tool discovery across all agents.' },
            { name: 'Agent Registry', desc: 'Dynamic loading of built-in and user-defined agents.' },
            { name: 'SDUI', desc: 'Server-Driven UI — plugins can emit cards, logs, and status updates that render directly in the web dashboard.' },
          ].map(({ name, desc }) => (
            <div key={name} className="flex gap-4 rounded-lg border border-zinc-800 p-4 bg-zinc-900/30">
              <span className="text-purple-400 font-mono text-sm font-semibold shrink-0 mt-0.5">{name}</span>
              <p className="text-sm text-zinc-400">{desc}</p>
            </div>
          ))}
        </div>

        <h2 id="doc-ref-structure" className="text-2xl font-bold mb-3">Project Structure</h2>
        <div className="space-y-2">
          {[
            { path: '/server', desc: 'Core assistant logic and API server.' },
            { path: '/web', desc: 'Interactive dashboard for your bots.' },
            { path: '/docs', desc: 'Detailed guides on Architecture, Plugins, and Agents.' },
          ].map(({ path, desc }) => (
            <div key={path} className="flex items-start gap-3 rounded-lg border border-zinc-800 px-5 py-3">
              <code className="text-purple-300 font-mono text-sm shrink-0">{path}</code>
              <span className="text-zinc-500 text-sm">{desc}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  roadmap: {
    title: 'Planned Agents',
    breadcrumb: 'Roadmap',
    toc: ['browser-use Agent', 'researcher Agent', 'devops Agent', 'data-scientist Agent', 'social Agent'],
    content: (
      <div>
        <h1 className="text-4xl font-bold mb-3">Roadmap: Planned Agents</h1>
        <p className="text-zinc-400 mb-8">We are constantly expanding the OpenBot ecosystem with specialized agents.</p>
        <div className="space-y-4">
          {[
            { name: 'browser-use Agent', desc: 'A high-level web agent leveraging the browser-use library for more autonomous, multi-step web tasks.' },
            { name: 'researcher Agent', desc: 'An information-gathering specialist that can browse multiple sources, synthesize long-form reports, and cite its findings.' },
            { name: 'devops Agent', desc: 'Focused on CI/CD pipelines, container orchestration (Docker/K8s), and cloud infrastructure management.' },
            { name: 'data-scientist Agent', desc: 'Capable of running local notebooks, performing statistical analysis, and generating visualizations.' },
            { name: 'social Agent', desc: 'Designed to manage social media interactions, schedule posts, and monitor mentions.' },
          ].map(({ name, desc }) => (
            <div key={name} className="flex gap-4 rounded-lg border border-dashed border-zinc-700 p-5">
              <div className="w-2 h-2 rounded-full bg-purple-500 mt-1.5 shrink-0"></div>
              <div>
                <code className="text-purple-400 font-mono text-sm font-semibold">{name}</code>
                <p className="text-sm text-zinc-500 mt-1">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
}

const allCategories: { label: string; description: string; items: { name: string; icon: React.ElementType; color: string; capability: string }[] }[] = [
  {
    label: 'Messaging',
    description: 'it writes to your friends here:',
    items: [
      { name: 'WhatsApp', icon: SiWhatsapp, color: '#25D366', capability: 'Send & receive messages, media, and voice notes' },
      { name: 'Telegram', icon: SiTelegram, color: '#26A5E4', capability: 'Send messages, files, and manage bots' },
      { name: 'Instagram', icon: SiInstagram, color: '#E4405F', capability: 'Send DMs, reply to comments and stories' },
      { name: 'Facebook', icon: SiFacebook, color: '#1877F2', capability: 'Post updates, send messages via Messenger' },
      { name: 'Discord', icon: SiDiscord, color: '#5865F2', capability: 'Send messages, manage servers and channels' },
      { name: 'Signal', icon: SiSignal, color: '#3A76F0', capability: 'Send encrypted messages and media' },
      { name: 'iMessage', icon: SiImessage, color: '#5EBB51', capability: 'Send iMessages and SMS on macOS' },
      { name: 'Twitter / X', icon: SiX, color: '#ffffff', capability: 'Post tweets, reply, and search content' },
      { name: 'LinkedIn', icon: SiLinkedin, color: '#0A66C2', capability: 'Send messages and manage connections' },
    ],
  },
  {
    label: 'AI Models',
    description: 'it runs on any of these AI models:',
    items: [
      { name: 'Claude', icon: SiAnthropic, color: '#C28155', capability: 'Run tasks with Anthropic\'s Claude models' },
      { name: 'GPT', icon: SiOpenai, color: '#a855f7', capability: 'Run tasks with OpenAI\'s GPT models' },
      { name: 'Gemini', icon: SiGooglegemini, color: '#4285F4', capability: 'Run tasks with Google\'s Gemini models' },
      { name: 'Grok', icon: GrokIcon, color: '#ffffff', capability: 'Run tasks with xAI\'s Grok models' },
      { name: 'Perplexity', icon: SiPerplexity, color: '#20808D', capability: 'Search and research with Perplexity AI' },
      { name: 'HuggingFace', icon: SiHuggingface, color: '#FFD21E', capability: 'Use open-source models from HuggingFace' },
    ],
  },
  {
    label: 'Productivity',
    description: 'it works inside your favorite tools and workflows:',
    items: [
      { name: 'Gmail', icon: SiGmail, color: '#EA4335', capability: 'Read, compose, and send emails' },
      { name: 'Slack', icon: SiSlack, color: '#E01E5A', capability: 'Send messages and manage channels' },
      { name: 'Google Calendar', icon: SiGooglecalendar, color: '#4285F4', capability: 'Create, edit, and schedule events' },
      { name: 'Google Drive', icon: SiGoogledrive, color: '#34A853', capability: 'Upload, search, and manage files' },
      { name: 'GitHub', icon: SiGithub, color: '#ffffff', capability: 'Open issues, PRs, and manage repos' },
      { name: 'VS Code', icon: TbBrandVscode, color: '#007ACC', capability: 'Edit code and run commands in the editor' },
      { name: 'Figma', icon: SiFigma, color: '#F24E1E', capability: 'Inspect designs and export assets' },
      { name: 'Canva', icon: SiCanva, color: '#00C4CC', capability: 'Generate and edit designs automatically' },
      { name: 'Notion', icon: SiNotion, color: '#ffffff', capability: 'Create pages, databases, and notes' },
      { name: 'Trello', icon: SiTrello, color: '#0052CC', capability: 'Move cards and manage boards' },
      { name: 'Jira', icon: SiJira, color: '#0052CC', capability: 'Create and track issues and sprints' },
      { name: 'Asana', icon: SiAsana, color: '#F06A6A', capability: 'Manage tasks and projects' },
      { name: 'Linear', icon: SiLinear, color: '#5E6AD2', capability: 'Track issues and manage engineering work' },
      { name: 'ClickUp', icon: SiClickup, color: '#7B68EE', capability: 'Create tasks, docs, and automations' },
      { name: 'Airtable', icon: SiAirtable, color: '#18BFFF', capability: 'Update records and automate workflows' },
      { name: 'Confluence', icon: SiConfluence, color: '#0052CC', capability: 'Create and update documentation pages' },
      { name: 'Dropbox', icon: SiDropbox, color: '#0061FF', capability: 'Upload, search, and share files' },
      { name: 'Obsidian', icon: SiObsidian, color: '#7C3AED', capability: 'Create and link notes in your vault' },
      { name: 'Browser', icon: SiGooglechrome, color: '#4285F4', capability: 'Navigate websites and extract data' },
    ],
  },
  {
    label: 'Meetings',
    description: 'it schedules and joins meetings on:',
    items: [
      { name: 'Google Meet', icon: SiGooglemeet, color: '#00897B', capability: 'Schedule and join video meetings' },
      { name: 'Zoom', icon: SiZoom, color: '#2D8CFF', capability: 'Create and manage Zoom calls' },
    ],
  },
  {
    label: 'Media & Entertainment',
    description: 'it plays music and manages your content on:',
    items: [
      { name: 'YouTube', icon: SiYoutube, color: '#FF0000', capability: 'Search, play, and manage videos' },
      { name: 'Spotify', icon: SiSpotify, color: '#1DB954', capability: 'Play music, manage playlists and queues' },
    ],
  },
  {
    label: 'Food & Shopping',
    description: 'it orders food and shops online on your behalf on:',
    items: [
      { name: 'Uber Eats', icon: SiUber, color: '#ffffff', capability: 'Order food and track deliveries' },
      { name: 'Glovo', icon: SiGlovo, color: '#FFC244', capability: 'Order food and groceries on demand' },
      { name: 'Amazon', icon: SiAmazon, color: '#FF9900', capability: 'Search products and place orders' },
      { name: 'eBay', icon: SiEbay, color: '#E53238', capability: 'Search listings and manage bids' },
    ],
  },
  {
    label: 'Travel & Booking',
    description: 'it searches and books trips on your behalf on:',
    items: [
      { name: 'Airbnb', icon: SiAirbnb, color: '#FF5A5F', capability: 'Search and book accommodations' },
      { name: 'Booking.com', icon: TbBrandBooking, color: '#003580', capability: 'Find and reserve hotels worldwide' },
      { name: 'Hotels.com', icon: SiHotelsdotcom, color: '#D32F2F', capability: 'Compare and book hotels' },
      { name: 'Expedia', icon: SiExpedia, color: '#FFC72C', capability: 'Book flights, hotels, and bundles' },
      { name: 'Tripadvisor', icon: SiTripadvisor, color: '#34E0A1', capability: 'Discover and review travel destinations' },
      { name: 'Uber', icon: SiUber, color: '#ffffff', capability: 'Request rides and track drivers' },
      { name: 'Lyft', icon: SiLyft, color: '#FF00BF', capability: 'Book rides instantly' },
      { name: 'Wizzair', icon: SiWizzair, color: '#C6007E', capability: 'Search and book budget flights' },
      { name: 'Ryanair', icon: SiRyanair, color: '#073590', capability: 'Find cheap flights across Europe' },
    ],
  },
]


function DocsPage({ onBack, initialPage }: { onBack: () => void; initialPage?: string }) {
  const [activeItem, setActiveItem] = useState(initialPage ?? 'introduction')
  const [activeSidebarKey, setActiveSidebarKey] = useState(initialPage ? initialPage + ':' : 'introduction:')
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [darkMode, setDarkMode] = useState(true)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const page = docsContent[activeItem] ?? docsContent['introduction']

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
      if (e.key === 'Escape') { setSearchOpen(false); setSearchQuery('') }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  useEffect(() => {
    if (searchOpen) setTimeout(() => searchInputRef.current?.focus(), 50)
  }, [searchOpen])

  useEffect(() => {
    document.body.style.overflow = searchOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [searchOpen])

  const sidebar = [
    { heading: 'Overview', items: [{ id: 'introduction', label: 'Introduction' }] },
    { heading: 'Core Concepts', items: [{ id: 'philosophy', label: 'Manager-Agent Philosophy' }] },
    { heading: 'Agents', items: [
      { id: 'manager-agent', label: 'Manager Agent' },
      { id: 'os-agent', label: 'OS Agent' },
      { id: 'browser-agent', label: 'Browser Agent' },
      { id: 'topic-agent', label: 'Topic Agent' },
      { id: 'codex-agent', label: 'Codex Agent' },
      { id: 'mobile', label: 'Mobile (Coming Soon)' },
    ]},
    { heading: 'Memory', items: [{ id: 'memory', label: 'Persistent Brain' }] },
    { heading: 'Extending', items: [
      { id: 'extending', label: 'Built to be Extended' },
      { id: 'extending', label: 'YAML Agents', sectionId: 'doc-ext-yaml' },
      { id: 'extending', label: 'TS Agent Packages', sectionId: 'doc-ext-ts' },
      { id: 'extending', label: 'Custom Plugins', sectionId: 'doc-ext-plugin' },
    ]},
    { heading: 'Reference', items: [
      { id: 'reference', label: 'Direct Command Routing', sectionId: 'doc-ref-routing' },
      { id: 'reference', label: 'Core Architecture', sectionId: 'doc-ref-arch' },
      { id: 'reference', label: 'Project Structure', sectionId: 'doc-ref-structure' },
    ]},
    { heading: 'Roadmap', items: [{ id: 'roadmap', label: 'Planned Agents' }] },
  ]

  const bg = darkMode ? '#0a0a0a' : '#ffffff'
  const sidebarBg = darkMode ? '#0a0a0a' : '#f8fafc'
  const borderCls = darkMode ? 'border-zinc-800/80' : 'border-zinc-200'
  const searchCls = darkMode
    ? 'border-zinc-800 bg-zinc-900 text-zinc-500 hover:border-zinc-700'
    : 'border-zinc-200 bg-zinc-50 text-zinc-500 hover:border-zinc-300'
  const searchKbdCls = darkMode ? 'bg-zinc-800 text-zinc-500' : 'bg-zinc-200 text-zinc-500'
  const githubCls = darkMode ? 'text-zinc-400 hover:text-white' : 'text-zinc-500 hover:text-zinc-900'
  const themeBtnCls = darkMode
    ? 'text-zinc-400 hover:text-white hover:bg-zinc-800'
    : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100'
  const sidebarHeadingCls = darkMode ? 'text-zinc-500' : 'text-zinc-400'
  const sidebarInactiveCls = darkMode
    ? 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
    : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
  const separatorCls = darkMode ? 'text-zinc-700' : 'text-zinc-300'
  const tocItemCls = darkMode
    ? 'text-zinc-500 hover:text-white hover:border-zinc-600'
    : 'text-zinc-500 hover:text-zinc-900 hover:border-zinc-400'

  const navItems = [
    { label: 'Get started', ids: ['introduction'], sidebarKeys: ['introduction:'], pageId: 'introduction', scrollTo: '' },
    { label: 'Core Concepts', ids: ['philosophy'], sidebarKeys: ['philosophy:'], pageId: 'philosophy', scrollTo: '' },
    { label: 'Agents', ids: ['manager-agent', 'os-agent', 'browser-agent', 'topic-agent', 'codex-agent', 'mobile'], sidebarKeys: ['manager-agent:', 'os-agent:', 'browser-agent:', 'topic-agent:', 'codex-agent:', 'mobile:'], pageId: 'manager-agent', scrollTo: '' },
    { label: 'Memory', ids: ['memory'], sidebarKeys: ['memory:'], pageId: 'memory', scrollTo: '' },
    { label: 'Extending', ids: ['extending'], sidebarKeys: ['extending:', 'extending:doc-ext-yaml', 'extending:doc-ext-ts', 'extending:doc-ext-plugin'], pageId: 'extending', scrollTo: '' },
    { label: 'Reference', ids: ['reference'], sidebarKeys: ['reference:doc-ref-routing', 'reference:doc-ref-arch', 'reference:doc-ref-structure'], pageId: 'reference', scrollTo: '' },
    { label: 'Roadmap', ids: ['roadmap'], sidebarKeys: ['roadmap:'], pageId: 'roadmap', scrollTo: '' },
  ]
  const activeNav = navItems.find(n => n.sidebarKeys.includes(activeSidebarKey))?.label

  return (
    <div className={`min-h-screen ${darkMode ? 'text-white' : 'text-zinc-900'}`} style={{ background: bg }}>
      {!darkMode && (
        <style>{`
          .docs-content [class*="text-white"]:not([class*="hover:"]) { color: #1e293b !important; }
          .docs-content [class*="text-zinc-300"] { color: #374151 !important; }
          .docs-content [class*="text-zinc-400"] { color: #4b5563 !important; }
          .docs-content [class*="text-zinc-500"] { color: #6b7280 !important; }
          .docs-content [class*="bg-zinc-900"] { background-color: #f1f5f9 !important; }
          .docs-content [class*="bg-zinc-800"] { background-color: #e2e8f0 !important; }
          .docs-content [class*="border-zinc-800"] { border-color: #cbd5e1 !important; }
          .docs-content [class*="border-zinc-700"] { border-color: #cbd5e1 !important; }
        `}</style>
      )}
      <header className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 h-14 border-b ${borderCls}`} style={{ background: bg }}>
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <img src={openbotLogo} alt="OpenBot" className="w-5 h-5" style={darkMode ? {} : { filter: 'invert(1)' }} />
            <span className="text-sm font-medium" style={{ fontFamily: "'Raleway', sans-serif" }}>OpenBot</span>
          </button>
          <span className={`${separatorCls} text-lg`}>|</span>
          <span className="text-zinc-500 text-sm">Docs</span>
        </div>
        <button
          onClick={() => setSearchOpen(true)}
          className={`flex items-center gap-2 px-4 py-1.5 rounded-lg border text-sm w-72 cursor-pointer select-none transition-colors ${searchCls}`}
        >
          <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <span>Search...</span>
          <span className={`ml-auto text-xs px-1.5 py-0.5 rounded ${searchKbdCls}`}>⌘K</span>
        </button>
        <div className="flex items-center gap-3">
          <a href="https://github.com/meetopenbot/openbot" target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 text-sm transition-colors ${githubCls}`}>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
            GitHub
          </a>
          <button
            onClick={() => setDarkMode(d => !d)}
            className={`p-1.5 rounded-md transition-colors ${themeBtnCls}`}
            title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" /></svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
            )}
          </button>
        </div>
      </header>

      {/* Secondary nav */}
      <nav className={`fixed top-14 left-0 right-0 z-40 flex items-center gap-1 px-6 border-b ${borderCls}`} style={{ background: bg }}>
        {navItems.map(({ label, pageId, sidebarKeys, scrollTo }) => {
          const isActive = label === activeNav
          return (
            <button
              key={label}
              onClick={() => {
                setActiveItem(pageId)
                setActiveSidebarKey(sidebarKeys[0])
                if (scrollTo) setTimeout(() => document.getElementById(scrollTo)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80)
              }}
              className={`relative px-3 py-2.5 text-sm transition-colors whitespace-nowrap ${
                isActive
                  ? darkMode ? 'text-white font-medium' : 'text-zinc-900 font-medium'
                  : darkMode ? 'text-zinc-500 hover:text-zinc-300' : 'text-zinc-500 hover:text-zinc-700'
              }`}
            >
              {label}
              {isActive && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500 rounded-t-full" />}
            </button>
          )
        })}
      </nav>

      {searchOpen && (
        <div
          className="fixed inset-0 z-100 flex items-start justify-center pt-24"
          style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
          onClick={() => { setSearchOpen(false); setSearchQuery('') }}
        >
          <div
            className="w-full max-w-lg rounded-xl border border-zinc-700 overflow-hidden shadow-2xl"
            style={{ background: '#18181b' }}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-zinc-700">
              <svg className="w-4 h-4 text-zinc-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search documentation..."
                className="flex-1 bg-transparent text-white placeholder-zinc-500 text-sm outline-none"
              />
              <button onClick={() => { setSearchOpen(false); setSearchQuery('') }} className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors bg-zinc-800 px-1.5 py-0.5 rounded">
                Esc
              </button>
            </div>
            {(() => {
              const results = searchQuery.length >= 3
                ? searchIndex.filter(item =>
                    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    item.keywords.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                : []
              if (searchQuery.length >= 3 && results.length === 0) return (
                <div className="px-4 py-8 text-center text-zinc-500 text-sm">No results for "<span className="text-zinc-300">{searchQuery}</span>"</div>
              )
              if (results.length > 0) return (
                <div className="max-h-80 overflow-y-auto">
                  {results.map(result => (
                    <button
                      key={result.id}
                      onClick={() => {
                        setActiveItem(result.id)
                        setActiveSidebarKey(result.id + ':' + (result.sectionId ?? ''))
                        setSearchOpen(false)
                        setSearchQuery('')
                        if (result.sectionId) {
                          setTimeout(() => {
                            document.getElementById(result.sectionId!)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                          }, 80)
                        }
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-zinc-800 transition-colors border-b border-zinc-800 last:border-0 flex items-center justify-between gap-3"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="text-xs text-zinc-500 mb-0.5 font-mono">{result.section}</div>
                        <div className="text-sm text-white font-medium flex items-center gap-1.5">
                          <span className="text-zinc-600 text-xs font-mono">#</span>
                          <span>{highlight(result.title, searchQuery)}</span>
                        </div>
                        {(() => {
                          const snippet = getKeywordSnippet(result.keywords, searchQuery)
                          if (!snippet) return null
                          return <div className="text-xs text-zinc-500 mt-0.5 truncate font-mono">{highlight(snippet, searchQuery)}</div>
                        })()}
                      </div>
                      <svg className="w-3.5 h-3.5 text-zinc-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </button>
                  ))}
                </div>
              )
              return <div className="px-4 py-8 text-center text-zinc-600 text-sm">Start typing to search the docs...</div>
            })()}
          </div>
        </div>
      )}

      <div className="flex pt-24">
        <aside className={`fixed left-0 top-24 bottom-0 w-60 overflow-y-auto border-r ${borderCls} py-8 px-3`} style={{ background: sidebarBg }}>
          {sidebar.map(({ heading, items }, si) => (
            <div key={si} className="mb-6">
              <div className={`text-xs font-semibold ${sidebarHeadingCls} uppercase tracking-widest px-3 mb-1`}>{heading}</div>
              {items.map(({ id, label, sectionId }: { id: string; label: string; sectionId?: string }, ii) => (
                <button
                  key={si * 100 + ii}
                  onClick={() => {
                    setActiveItem(id)
                    setActiveSidebarKey(id + ':' + (sectionId ?? ''))
                    if (sectionId) {
                      setTimeout(() => {
                        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                      }, 80)
                    }
                  }}
                  className={`w-full text-left px-3 py-1.5 rounded-md text-sm transition-colors mb-0.5 ${
                    activeSidebarKey === id + ':' + (sectionId ?? '') ? 'bg-purple-500/10 text-purple-400 font-medium' : sidebarInactiveCls
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          ))}
        </aside>

        <main className="ml-60 mr-52 flex-1 px-14 py-10 min-w-0">
          <div className="max-w-2xl mx-auto">
            <div className={`text-sm mb-6 ${darkMode ? 'text-zinc-600' : 'text-zinc-400'}`}>
              <button onClick={onBack} className={`transition-colors ${darkMode ? 'hover:text-zinc-400' : 'hover:text-zinc-600'}`}>Home</button>
              <span className="mx-2">/</span>
              <span className="text-zinc-500">{page.breadcrumb}</span>
              <span className="mx-2">/</span>
              <span className={darkMode ? 'text-zinc-300' : 'text-zinc-700'}>{page.title}</span>
            </div>
            <div className="docs-content">{page.content}</div>
          </div>
        </main>

        <aside className={`fixed right-0 top-24 bottom-0 w-52 overflow-y-auto py-8 px-4 border-l ${borderCls}`} style={{ background: sidebarBg }}>
          <div className={`text-xs font-semibold ${sidebarHeadingCls} uppercase tracking-widest mb-3 flex items-center gap-1.5`}>
            <span>≡</span> On this page
          </div>
          {page.toc.map((label) => (
            <div key={label} className={`block w-full text-left text-xs transition-colors py-1.5 pl-2 border-l border-transparent cursor-default ${tocItemCls}`}>
              {label}
            </div>
          ))}
        </aside>
      </div>
    </div>
  )
}

const whyItems = [
  'OpenBot is open source. Transparent, auditable, and built by the community.',
  'It\'s agent-based. Real actions taken on your behalf, not just answers.',
  '100+ built-in agents. From scheduling to coding, shopping to deploying.',
  'Engineered to be efficient. Minimal tokens, maximum output.',
  'Priced for everyone. Low cost, even with heavy daily use.',
  'Built with security first. Controlled access and safe execution.',
]

function WaveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0.45, y: 0.5, active: false })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let time = 0
    // Smoothed mouse + activation strength
    let smX = 0.45
    let smY = 0.5
    let smStrength = 0 // fades in/out when entering/leaving

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = canvas.offsetWidth * dpr
      canvas.height = canvas.offsetHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
        active: true,
      }
    }
    const onMouseLeave = () => { mouseRef.current.active = false }
    canvas.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('mouseleave', onMouseLeave)

    const draw = () => {
      const W = canvas.offsetWidth
      const H = canvas.offsetHeight

      // Smooth mouse position & activation
      if (mouseRef.current.active) {
        smX += (mouseRef.current.x - smX) * 0.08
        smY += (mouseRef.current.y - smY) * 0.08
        smStrength += (1 - smStrength) * 0.06
      } else {
        smStrength += (0 - smStrength) * 0.04
      }

      ctx.fillStyle = '#000'
      ctx.fillRect(0, 0, W, H)

      const cols = 120
      const rows = 24
      const centerY = H * 0.52

      for (let r = 0; r < rows; r++) {
        const rNorm = r / (rows - 1)
        for (let c = 0; c < cols; c++) {
          const cNorm = c / (cols - 1)
          const x = cNorm * W

          // Base mountain envelope
          const mEnv = Math.exp(-Math.pow((cNorm - 0.45) * 2.6, 2))

          // Mouse lift: smooth Gaussian bump centered at cursor X
          // Mouse Y controls lift height (top = more lift, bottom = less)
          const mouseBump = Math.exp(-Math.pow((cNorm - smX) * 5, 2))
            * smStrength * (1 - smY * 0.7)

          // Combined envelope for brightness/visibility
          const totalEnv = Math.min(1, mEnv + mouseBump * 0.65)

          // Base waves (only on base mountain)
          const w1 = Math.sin(c * 0.19 + time) * mEnv
          const w2 = Math.sin(c * 0.1 - time * 0.65 + 1.2) * mEnv * 0.55
          // Mouse lift added directly to Y displacement — no extra sine wave
          const wDisp = (w1 + w2 + mouseBump) * H * 0.22

          const spread = (rNorm - 0.5) * H * 0.75
          const rowInfluence = Math.max(0, 1 - Math.abs(rNorm - 0.5) * 1.8)
          const y = centerY + spread - wDisp * rowInfluence

          const rowBright = Math.max(0, 1 - Math.abs(rNorm - 0.5) * 2.1)
          const edgeFade = Math.min(cNorm * 7, 1) * Math.min((1 - cNorm) * 7, 1)
          // Particles near mouse cursor are slightly brighter
          const alpha = Math.min(1, rowBright * totalEnv * edgeFade * 0.9 * (1 + mouseBump * 0.4))

          if (alpha < 0.015) continue

          ctx.globalAlpha = alpha
          ctx.fillStyle = '#cccccc'
          ctx.beginPath()
          ctx.arc(x, y, 1.2, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      ctx.globalAlpha = 1
      time += 0.012
      animId = requestAnimationFrame(draw)
    }

    draw()
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', onMouseMove)
      canvas.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  return <canvas ref={canvasRef} style={{ width: '100%', height: '230px', display: 'block', cursor: 'crosshair' }} />
}

function WhySection() {
  const introRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLParagraphElement | null)[]>([])
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const animateEl = (el: HTMLElement | null) => {
      if (!el) return
      const centerY = window.innerHeight / 2
      const rect = el.getBoundingClientRect()
      const itemCenterY = (rect.top + rect.bottom) / 2
      const dist = Math.abs(itemCenterY - centerY)
      const range = window.innerHeight * 0.45
      const t = Math.max(0, 1 - dist / range)
      const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
      el.style.opacity = String(0.08 + eased * 0.92)
      el.style.transform = `scale(${0.96 + eased * 0.04})`
    }

    const update = () => {
      animateEl(introRef.current)
      itemRefs.current.forEach(animateEl)
      rafRef.current = null
    }

    const onScroll = () => {
      if (!rafRef.current) rafRef.current = requestAnimationFrame(update)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const itemStyle: React.CSSProperties = {
    fontSize: 'clamp(18px, 2vw, 32px)',
    opacity: 0.08,
    willChange: 'opacity, transform',
    transformOrigin: 'center center',
    maxWidth: '560px',
    padding: '0 2rem',
    lineHeight: 1.45,
  }

  return (
    <div id="why" className="bg-black">
      {/* Intro panel */}
      <div className="flex flex-col items-center justify-center" style={{ height: '100vh' }}>
        <p className="text-xs font-semibold tracking-[0.3em] text-zinc-700 uppercase mb-8">Why OpenBot</p>
        <div
          ref={introRef}
          style={{ opacity: 0.08, willChange: 'opacity, transform', transformOrigin: 'center center', textAlign: 'center', maxWidth: '580px', padding: '0 2rem' }}
        >
          <h2 className="text-white font-light leading-tight" style={{ fontSize: 'clamp(28px, 3.5vw, 52px)' }}>
            Here's what makes<br />it different.
          </h2>
        </div>
      </div>

      {/* Scroll items */}
      {whyItems.map((text, i) => {
        const isLast = i === whyItems.length - 1
        if (isLast) {
          return (
            <div key={i} style={{ height: '50vh', display: 'flex', flexDirection: 'column' }}>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p ref={el => { itemRefs.current[i] = el }} className="text-center text-white font-light" style={itemStyle}>
                  {text}
                </p>
              </div>
              <WaveCanvas />
            </div>
          )
        }
        return (
          <div key={i} className="flex items-center justify-center" style={{ height: '50vh' }}>
            <p ref={el => { itemRefs.current[i] = el }} className="text-center text-white font-light" style={itemStyle}>
              {text}
            </p>
          </div>
        )
      })}
    </div>
  )
}

const canDoItems = [
  { icon: '💬', title: 'Send Messages', desc: 'Message friends, colleagues, or clients on Telegram, WhatsApp, Slack, and more — automatically.' },
  { icon: '📅', title: 'Schedule & Manage Calendar', desc: 'Book meetings, set reminders, and organize your day without lifting a finger.' },
  { icon: '🖥️', title: 'Control Your Computer', desc: 'Run terminal commands, manage files, and automate OS-level tasks hands-free.' },
  { icon: '🌐', title: 'Browse the Web', desc: 'Search, read articles, fill forms, and extract information from any website.' },
  { icon: '💻', title: 'Write & Fix Code', desc: 'Generate, debug, review, and deploy code across any language or framework.' },
  { icon: '🧠', title: 'Remember Everything', desc: 'Store facts, preferences, and context across sessions so it always knows you.' },
  { icon: '📋', title: 'Research & Summarize', desc: 'Gather information from multiple sources and turn it into clear, concise reports.' },
  { icon: '🔌', title: 'Connect Any Tool', desc: 'Plug in Notion, GitHub, Gmail, Google Drive, Jira, and 100+ more integrations.' },
  { icon: '🛠️', title: 'Build Custom Agents', desc: 'Create your own agents with natural language, YAML, or TypeScript — and deploy them on any platform.' },
]

function CanDoBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let time = 0

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = canvas.offsetWidth * dpr
      canvas.height = canvas.offsetHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    const draw = () => {
      const W = canvas.offsetWidth
      const H = canvas.offsetHeight
      ctx.clearRect(0, 0, W, H)

      const spacing = 13 // pixels between particles

      // Draw a vertical wave line at baseX with a horizontal sine displacement
      const drawVertical = (baseX: number, phase: number) => {
        const count = Math.ceil(H / spacing)
        for (let i = 0; i < count; i++) {
          const y = i * spacing
          const yNorm = y / H
          const x = baseX + Math.sin(y * 0.007 + time + phase) * W * 0.016
          const fade = Math.min(yNorm * 12, 1) * Math.min((1 - yNorm) * 12, 1)
          const alpha = 0.2 * fade
          if (alpha < 0.01) continue
          ctx.globalAlpha = alpha
          ctx.fillStyle = '#ffffff'
          ctx.beginPath()
          ctx.arc(x, y, 0.8, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // Draw a horizontal wave line at baseY with a vertical sine displacement
      const drawHorizontal = (baseY: number, phase: number) => {
        const count = Math.ceil(W / spacing)
        for (let i = 0; i < count; i++) {
          const x = i * spacing
          const xNorm = x / W
          const y = baseY + Math.sin(x * 0.009 + time + phase) * H * 0.008
          const fade = Math.min(xNorm * 10, 1) * Math.min((1 - xNorm) * 10, 1)
          const alpha = 0.2 * fade
          if (alpha < 0.01) continue
          ctx.globalAlpha = alpha
          ctx.fillStyle = '#ffffff'
          ctx.beginPath()
          ctx.arc(x, y, 0.8, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // 1 vertical on left corner
      drawVertical(W * 0.06, 0)
      // 1 vertical on right corner
      drawVertical(W * 0.94, 3.2)
      // 1 horizontal at the bottom of the last item
      drawHorizontal(H - spacing * 2, 0)

      ctx.globalAlpha = 1
      time += 0.008
      animId = requestAnimationFrame(draw)
    }

    draw()
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block', pointerEvents: 'none' }}
    />
  )
}

function CanDoSection() {
  const introRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const animateEl = (el: HTMLElement | null, fromRight: boolean) => {
      if (!el) return
      const centerY = window.innerHeight / 2
      const rect = el.getBoundingClientRect()
      const itemCenterY = (rect.top + rect.bottom) / 2
      const dist = Math.abs(itemCenterY - centerY)
      const range = window.innerHeight * 0.45
      const t = Math.max(0, 1 - dist / range)
      const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
      const opacity = 0.08 + eased * 0.92
      const tx = (fromRight ? 60 : -60) * (1 - eased)
      el.style.opacity = String(opacity)
      el.style.transform = `translateX(${tx}px)`
    }

    const update = () => {
      animateEl(introRef.current, false)
      cardRefs.current.forEach((el, i) => animateEl(el, i % 2 === 0))
      rafRef.current = null
    }

    const onScroll = () => {
      if (!rafRef.current) rafRef.current = requestAnimationFrame(update)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div id="what-it-can-do" className="bg-black" style={{ position: 'relative' }}>
      <CanDoBackground />
      {/* Intro panel */}
      <div className="flex flex-col items-center justify-center" style={{ height: '100vh', position: 'relative', zIndex: 1 }}>
        <p className="text-xs font-semibold tracking-[0.3em] text-zinc-700 uppercase mb-8">What it can do</p>
        <div
          ref={introRef}
          style={{ opacity: 0.08, willChange: 'opacity, transform', textAlign: 'center', maxWidth: '580px', padding: '0 2rem' }}
        >
          <h2 className="text-white font-light leading-tight" style={{ fontSize: 'clamp(28px, 3.5vw, 52px)' }}>
            Your AI assistant doesn't just answer questions.<br />It takes real action.
          </h2>
        </div>
      </div>

      {/* Cards stacked vertically, alternating left/right */}
      {canDoItems.map(({ title, desc }, i) => (
        <div key={title} className="flex items-center justify-center" style={{ height: '50vh', position: 'relative', zIndex: 1 }}>
          <div
            ref={(el) => { cardRefs.current[i] = el }}
            style={{
              opacity: 0.08,
              willChange: 'opacity, transform',
              maxWidth: '480px',
              width: '100%',
              margin: '0 2rem',
              transform: i % 2 === 0 ? 'translateX(60px)' : 'translateX(-60px)',
            }}
          >
            <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
            <p className="text-sm text-zinc-500 leading-relaxed">{desc}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function AgentsPage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="background-3d">
        <div className="orb-3d orb-3d-1"></div>
        <div className="orb-3d orb-3d-2"></div>
        <div className="orb-3d orb-3d-3"></div>
        <div className="orb-3d orb-3d-4"></div>
      </div>
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-16">
        <div className="mb-12">
          <a href="/" onClick={(e) => { e.preventDefault(); window.location.hash = ''; setTimeout(() => document.getElementById('works-with')?.scrollIntoView({ behavior: 'smooth' }), 50) }} className="text-zinc-500 hover:text-zinc-300 text-sm transition-colors mb-6 inline-block">← Back to home</a>
          <h1 className="text-4xl font-bold mb-3">Agents & Plugins</h1>
          <p className="text-zinc-400 text-lg">Everything OpenBot can connect to and control on your behalf.</p>
        </div>

        <div className="space-y-12">
          {allCategories.map(({ label, description, items }) => (
            <div key={label}>
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-1">{label}</h2>
                <p className="text-zinc-500 text-sm">{description}</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {items.map(({ name, icon: Icon, color, capability }) => (
                  <div key={name} className="flex flex-col items-center text-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 hover:border-zinc-600 transition-colors cursor-default">
                    <Icon style={{ color }} size={32} />
                    <div>
                      <div className="text-sm font-semibold text-white">{name}</div>
                      <div className="text-xs text-zinc-500 mt-1 leading-relaxed">{capability}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function parseHash() {
  const h = window.location.hash
  if (h === '#docs') return { docs: true, page: undefined }
  if (h.startsWith('#docs/')) return { docs: true, page: h.slice(6) || undefined }
  return { docs: false, page: undefined }
}

function App() {
  const [showDocs, setShowDocs] = useState(() => parseHash().docs)
  const [showAgents, setShowAgents] = useState(() => window.location.hash === '#agents')
  const [docsInitialPage, setDocsInitialPage] = useState<string | undefined>(() => parseHash().page)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleHash = () => {
      const { docs, page } = parseHash()
      setShowDocs(docs)
      if (page) setDocsInitialPage(page)
      setShowAgents(window.location.hash === '#agents')
    }
    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > window.innerHeight - 100)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (showDocs) {
    return <DocsPage onBack={() => { window.location.hash = ''; setShowDocs(false); setDocsInitialPage(undefined) }} initialPage={docsInitialPage} />
  }

  if (showAgents) {
    return <AgentsPage />
  }

  return (
    <div className="min-h-screen bg-black text-white">


      {/* Sticky navbar — appears on scroll */}
      <div className={`fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-6 transition-all duration-300 ${scrolled ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
        <nav className="flex items-center gap-8 rounded-full px-6 py-3" style={{ background: 'rgba(15,15,15,0.75)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}>
          <button onClick={() => { window.location.href = '/' }} className="flex items-center gap-2 mr-2 cursor-pointer">
            <img src={openbotLogo} alt="OpenBot" className="w-5 h-5" />
            <span style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 500, fontSize: '15px' }}>OpenBot</span>
          </button>
          {[['Why OpenBot','why'],['What it can do','what-it-can-do'],['How It Works','how-it-works']].map(([label, id]) => (
            <button key={id} onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })} className="text-zinc-300 hover:text-white transition-colors cursor-pointer" style={{ fontSize: '14px' }}>{label}</button>
          ))}
          <a href="#docs" target="_blank" rel="noopener noreferrer" className="text-zinc-300 hover:text-white transition-colors" style={{ fontSize: '14px' }}>Docs</a>
          <a href="https://github.com/meetopenbot/openbot" target="_blank" rel="noopener noreferrer" className="text-zinc-300 hover:text-white transition-colors" style={{ fontSize: '14px' }}>GitHub</a>
          <button onClick={() => document.getElementById('get-started')?.scrollIntoView({ behavior: 'smooth' })} className="text-white text-sm rounded-full px-5 py-1.5 ml-2 transition-all cursor-pointer" style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)' }}>
            Get Started
          </button>
        </nav>
      </div>

      {/* Main content */}
      <div>

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-6 text-center" style={{ backgroundImage: `url(${heroBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-linear-to-t from-black to-transparent"></div>

        {/* Logo — centered top */}
        <div className="absolute top-0 left-0 right-0 flex justify-center pt-7 z-10 pointer-events-none">
          <button onClick={() => { window.location.href = '/' }} className="flex items-center gap-2.5 pointer-events-auto cursor-pointer">
            <img src={openbotLogo} alt="OpenBot" className="w-7 h-7" />
            <span className="text-xl" style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 500 }}>OpenBot</span>
          </button>
        </div>

        {/* Left nav */}
        <nav className="absolute top-8 left-8 z-10 flex flex-col gap-4">
          {[['Why OpenBot','why'],['What it can do','what-it-can-do'],['How It Works','how-it-works']].map(([label, id]) => (
            <button key={id} onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })} className="text-left text-zinc-300 hover:text-white transition-colors cursor-pointer" style={{ fontSize: '14px' }}>{label}</button>
          ))}
          <a href="#docs" target="_blank" rel="noopener noreferrer" className="text-zinc-300 hover:text-white transition-colors" style={{ fontSize: '14px' }}>Docs</a>
          <a href="https://github.com/meetopenbot/openbot" target="_blank" rel="noopener noreferrer" className="text-zinc-300 hover:text-white transition-colors" style={{ fontSize: '14px' }}>GitHub</a>
        </nav>

        {/* Top right CTA */}
        <div className="absolute top-6 right-8 z-10">
          <button
            onClick={() => document.getElementById('quick-start')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-white text-sm rounded-full px-6 py-2.5 transition-all cursor-pointer"
            style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.18)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
          >
            Get Started
          </button>
        </div>

        <h1 className="relative font-bold leading-[1.05] tracking-tight max-w-5xl" style={{ fontSize: '88px' }}>
          An AI That Gets<br />Work Done for You.
        </h1>

        <button onClick={() => document.getElementById('get-started')?.scrollIntoView({ behavior: 'smooth' })} className="relative mt-14 inline-flex items-center bg-white text-black rounded-full pl-2 pr-7 py-2 hover:bg-zinc-100 transition-colors shadow-lg cursor-pointer">
          <span className="w-10 h-10 rounded-full bg-black flex items-center justify-center shrink-0 mr-4">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </span>
          <span className="text-base font-medium">Start using OpenBot</span>
        </button>
      </section>

      <WhySection />

      <CanDoSection />

      {/* Use Cases Section */}
      <section id="use-cases" className="container mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto">

        {/* Works With Everything */}
        <div id="works-with" className="mt-24">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">What can it work on?</h2>
            <p className="text-xl text-zinc-400">It can work on everything.</p>
          </div>

          {(() => {
            const row1 = [
              ...allCategories[0].items,                          // Messaging (9)
              ...allCategories[1].items.slice(0, 3),             // Claude, GPT, Gemini
              ...allCategories[2].items.slice(0, 4),             // Gmail, Slack, GCal, GDrive
            ]
            const row2 = [
              ...allCategories[1].items.slice(3),               // Grok, Perplexity, HuggingFace
              ...allCategories[2].items.slice(4),               // GitHub, VSCode, Figma, Canva...
              ...allCategories[3].items,                         // Meetings
              ...allCategories[4].items,                         // Media
              ...allCategories[5].items,                         // Food
              ...allCategories[6].items.slice(0, 5),            // Travel
            ]
            const pill = ({ name, icon: Icon, color }: { name: string; icon: React.ElementType; color: string }, i: number) => (
              <div key={i} className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-zinc-800 bg-zinc-900/50 whitespace-nowrap shrink-0">
                <Icon style={{ color }} size={15} />
                <span className="text-sm text-zinc-300">{name}</span>
              </div>
            )
            const maskStyle = { maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)' }
            return (
              <div className="space-y-3" style={maskStyle}>
                <div style={{ display: 'flex', gap: '10px', width: 'max-content', animation: 'marqueeLeft 40s linear infinite' }}>
                  {[...row1, ...row1].map((item, i) => pill(item, i))}
                </div>
                <div style={{ display: 'flex', gap: '10px', width: 'max-content', animation: 'marqueeRight 50s linear infinite' }}>
                  {[...row2, ...row2].map((item, i) => pill(item, i))}
                </div>
              </div>
            )
          })()}

          <div className="flex items-center justify-center gap-6 mt-10">
            <button onClick={() => { window.location.hash = '#agents'; setShowAgents(true) }} className="text-white hover:text-zinc-300 text-sm transition-colors cursor-pointer">
              View all Agents & Plugins →
            </button>
            <span className="text-zinc-700">·</span>
            <button onClick={() => window.open('#docs/extending', '_blank')} className="text-white hover:text-zinc-300 text-sm transition-colors cursor-pointer">
              Build your own agents with natural language for any platform →
            </button>
          </div>
        </div>

        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-zinc-400">Just tell OpenBot what to do</p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="mb-16 rounded-2xl overflow-hidden border border-zinc-700 shadow-2xl shadow-black/60">
            <div className="flex items-center gap-3 px-4 py-3 bg-zinc-800 border-b border-zinc-700">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="flex items-center gap-2 ml-2">
                <svg className="w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                <svg className="w-4 h-4 text-zinc-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </div>
              <div className="flex-1 mx-3">
                <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-700 rounded-md px-3 py-1 max-w-sm mx-auto">
                  <svg className="w-3 h-3 text-zinc-500 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                  <span className="text-xs text-zinc-400 truncate">openbot.ai/demo</span>
                </div>
              </div>
            </div>
            <div className="aspect-video bg-black">
              <video
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                onLoadedData={(e) => e.currentTarget.play().catch(err => console.log('Autoplay failed:', err))}
                src={demoVideo}
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          <QuickStartTerminal />
        </div>
      </section>

      {/* Get Started / CTA Section */}
      <section id="get-started" className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto border border-zinc-800 bg-zinc-950/50 backdrop-blur-sm rounded-3xl p-12 md:p-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Get Started in Minutes.
          </h2>
          <p className="text-xl mb-8 text-zinc-300">
            Install OpenBot, plug in your model API key, and you're ready to automate anything - no subscriptions, no hidden fees.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://github.com/meetopenbot/openbot" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="border-zinc-600 text-white hover:bg-zinc-900 rounded-full px-8">
                View on GitHub
              </Button>
            </a>
          </div>
          <p className="text-sm text-zinc-400 mt-6">
            Install → Add API key → Start automating
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 bg-zinc-950">
        <div className="container mx-auto px-6 py-12 flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <img src={openbotLogo} alt="OpenBot" className="w-7 h-7" />
            <div className="text-2xl font-medium" style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 500 }}>OpenBot</div>
          </div>
          <p className="text-zinc-400 text-sm">An AI That Gets Work Done for You.</p>
          <div className="flex gap-6 mt-2">
            <a href="https://github.com/meetopenbot/openbot" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="https://discord.gg/XYYXvN2ebB" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors">
              <SiDiscord size={20} />
            </a>
            <a href="https://x.com/MeetOpenBot" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
          <p className="text-zinc-600 text-xs mt-2">Built with ❤️ by the OpenBot team.</p>
        </div>
      </footer>
      </div>{/* end ml-52 */}
    </div>
  )
}

export default App
