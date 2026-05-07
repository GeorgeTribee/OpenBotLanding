import { useState, useEffect, useRef } from 'react'
import TermsPage from './TermsPage'
import PrivacyPage from './PrivacyPage'
import AboutPage from './AboutPage'
import CharterPage from './CharterPage'
import FoundationPage from './FoundationPage'
import CareersPage from './CareersPage'
import BrandPage from './BrandPage'
import { Button } from '@/components/ui/button'
import { Copy, Check } from 'lucide-react'
import { SiWhatsapp, SiTelegram, SiDiscord, SiSlack, SiSignal, SiImessage, SiInstagram, SiFacebook, SiLinkedin, SiAnthropic, SiOpenai, SiGooglegemini, SiPerplexity, SiHuggingface, SiGithub, SiX, SiGmail, SiGooglechrome, SiSpotify, SiYoutube, SiObsidian, SiGooglemeet, SiAirbnb, SiWizzair, SiRyanair, SiZoom, SiGooglecalendar, SiExpedia, SiTripadvisor, SiFigma, SiCanva, SiTrello, SiNotion, SiJira, SiAsana, SiLinear, SiDropbox, SiGoogledrive, SiAirtable, SiClickup, SiConfluence, SiUber, SiLyft, SiHotelsdotcom, SiAmazon, SiEbay, SiGlovo } from 'react-icons/si'
import { TbBrandBooking, TbBrandVscode } from 'react-icons/tb'
import openbotLogo from './assets/openbotlogo.svg'

const GrokIcon = ({ size = 16, style, className }: { size?: number; style?: React.CSSProperties; className?: string }) => (
  <svg width={size} height={size} viewBox="0.36 0.5 33.33 32" fill="currentColor" style={style} className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M13.2371 21.0407L24.3186 12.8506C24.8619 12.4491 25.6384 12.6057 25.8973 13.2294C27.2597 16.5185 26.651 20.4712 23.9403 23.1851C21.2297 25.8989 17.4581 26.4941 14.0108 25.1386L10.2449 26.8843C15.6463 30.5806 22.2053 29.6665 26.304 25.5601C29.5551 22.3051 30.562 17.8683 29.6205 13.8673L29.629 13.8758C28.2637 7.99809 29.9647 5.64871 33.449 0.844576C33.5314 0.730667 33.6139 0.616757 33.6964 0.5L29.1113 5.09055V5.07631L13.2343 21.0436" />
    <path d="M10.9503 23.0313C7.07343 19.3235 7.74185 13.5853 11.0498 10.2763C13.4959 7.82722 17.5036 6.82767 21.0021 8.2971L24.7595 6.55998C24.0826 6.07017 23.215 5.54334 22.2195 5.17313C17.7198 3.31926 12.3326 4.24192 8.67479 7.90126C5.15635 11.4239 4.0499 16.8403 5.94992 21.4622C7.36924 24.9165 5.04257 27.3598 2.69884 29.826C1.86829 30.7002 1.0349 31.5745 0.36364 32.5L10.9474 23.0341" />
  </svg>
)




function useWindowWidth() {
  const [width, setWidth] = useState(() => window.innerWidth)
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handler, { passive: true })
    return () => window.removeEventListener('resize', handler)
  }, [])
  return width
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
  return <>{text.slice(0, idx)}<span className="text-zinc-200 font-semibold">{text.slice(idx, idx + query.length)}</span>{text.slice(idx + query.length)}</>
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
        <p className="text-zinc-400 mb-4 text-sm leading-relaxed">OpenBot is an AI assistant that goes beyond chatting. It performs real actions on your behalf — sending messages, writing code, browsing the web, managing files, and more — using a powerful multi-agent architecture.</p>
        <p className="text-zinc-400 mb-5 text-sm leading-relaxed">OpenBot is more than just a chatbot. It's an orchestrator that lives in your terminal and browser, delegating complex tasks to specialized agents. It's designed to be local-first, event-driven, and infinitely extensible.</p>
        <div className="grid md:grid-cols-3 gap-3 mb-12">
          {[
            { title: 'Local & Private', desc: 'Runs entirely on your machine. Your data never leaves your device.' },
            { title: 'Multi-Agent', desc: 'A Manager Agent orchestrates specialized workers to handle complex tasks.' },
            { title: 'Local-First', desc: 'Runs on your machine. Your data stays private and never leaves your environment.' },
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
            <span className="text-zinc-200">npm</span>
            <span className="text-zinc-300"> install -g openbot</span>
          </DocTerminal>
          <DocTerminal copyText="pnpm add -g openbot">
            <span className="text-zinc-200">pnpm</span>
            <span className="text-zinc-300"> add -g openbot</span>
          </DocTerminal>
        </div>

        <h2 id="doc-run" className="text-2xl font-bold mb-4">Running OpenBot</h2>
        <p className="text-zinc-400 mb-3 text-sm">Start the server with your AI provider API key:</p>
        <div className="space-y-2 mb-5">
          <DocTerminal copyText="openbot server --openai-api-key YOUR_KEY">
            <span className="text-zinc-200">openbot</span>
            <span className="text-zinc-300"> server </span>
            <span className="text-yellow-400">--openai-api-key</span>
            <span className="text-green-400"> YOUR_KEY</span>
          </DocTerminal>
          <DocTerminal copyText="openbot server --anthropic-api-key YOUR_KEY">
            <span className="text-zinc-200">openbot</span>
            <span className="text-zinc-300"> server </span>
            <span className="text-yellow-400">--anthropic-api-key</span>
            <span className="text-green-400"> YOUR_KEY</span>
          </DocTerminal>
        </div>
        <p className="text-zinc-400 mb-3 text-sm">Then open the web interface in your browser:</p>
        <DocTerminal copyText="http://localhost:3000">
          <span className="text-zinc-200">http://localhost:3000</span>
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
        <p className="text-zinc-500 mb-8 pl-4 border-l-2 border-zinc-700 italic">OpenBot follows a <span className="text-zinc-200 font-semibold">Delegate by Default</span> pattern.</p>
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
            <code className="text-zinc-200 text-sm">The Orchestrator</code>
          </div>
        </div>
        <p className="text-zinc-400 mb-8">The central "brain" of the OpenBot ecosystem. It analyzes user intent, manages long-term memory (via the brain plugin), and coordinates other agents using the <code className="text-zinc-300 bg-zinc-800 px-1.5 py-0.5 rounded text-sm">delegateTask</code> tool.</p>
        <h2 id="doc-ma-resp" className="text-xl font-semibold mb-3">Responsibilities</h2>
        <ul className="space-y-2 mb-8">
          {['Analyze user intent and determine which agent to delegate to', 'Manage long-term memory using the brain plugin (remember, recall)', 'Coordinate multiple specialized agents in parallel or sequence', 'Synthesize results and return a concise summary to the user'].map(r => (
            <li key={r} className="flex gap-2 text-sm text-zinc-400"><span className="text-zinc-200 mt-0.5">→</span>{r}</li>
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
            <code className="text-zinc-200 text-sm">os</code>
          </div>
        </div>
        <p className="text-zinc-400 mb-8">Your specialized terminal and file system companion. It has full access to your local machine (within the boundaries you set). It can execute shell commands, create/read/edit files, manage directories, and handle system-level operations.</p>
        <h2 id="doc-os-cap" className="text-xl font-semibold mb-3">Capabilities</h2>
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {['Execute shell commands', 'Create, read, edit files', 'Manage directories', 'Run git commands', 'Execute scripts', 'System-level operations'].map(c => (
            <div key={c} className="flex gap-2 items-center rounded-lg border border-zinc-800 p-3 text-sm text-zinc-400">
              <span className="text-zinc-200">✓</span>{c}
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
            <code className="text-zinc-200 text-sm">browser · Stagehand</code>
          </div>
        </div>
        <p className="text-zinc-400 mb-8">A powerful web automation specialist based on Stagehand. It can navigate the internet exactly like a human would — browsing websites, clicking buttons, filling forms, and extracting data.</p>
        <h2 id="doc-br-cap" className="text-xl font-semibold mb-3">Capabilities</h2>
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {['Navigate to any URL', 'Click buttons & links', 'Fill forms', 'Extract page data', 'Take screenshots', 'Multi-step web flows'].map(c => (
            <div key={c} className="flex gap-2 items-center rounded-lg border border-zinc-800 p-3 text-sm text-zinc-400">
              <span className="text-zinc-200">✓</span>{c}
            </div>
          ))}
        </div>
        <h2 className="text-xl font-semibold mb-3">Planned: browser-use Agent</h2>
        <div className="rounded-lg border border-dashed border-zinc-700 p-4 text-sm text-zinc-500">
          We also plan to introduce a parallel agent based on <code className="text-zinc-300">browser-use</code> for alternative autonomous web navigation strategies with higher-level reasoning.
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
            <code className="text-zinc-200 text-sm">topic</code>
          </div>
        </div>
        <p className="text-zinc-400 mb-8">A background utility that works silently to keep your workspace organized. It automatically analyzes the first few messages of a new conversation and generates a concise (3–5 word) title for the thread.</p>
        <h2 className="text-xl font-semibold mb-3">How it works</h2>
        <div className="space-y-3">
          {['Listens for new conversation events via the Event Bus', 'Analyzes the first 2–3 messages for context', 'Generates a concise 3–5 word title', 'Updates the conversation thread label automatically'].map((s, i) => (
            <div key={s} className="flex gap-3 items-start rounded-lg border border-zinc-800 p-4 text-sm text-zinc-400">
              <span className="text-zinc-200 font-mono text-xs mt-0.5">{i + 1}.</span>{s}
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
            <code className="text-zinc-200 text-sm">codex</code>
          </div>
        </div>
        <p className="text-zinc-400 mb-8">A world-class software engineer and coding assistant powered by OpenAI. It helps with high-level architectural decisions, code refactoring, complex logic implementation, and debugging.</p>
        <h2 id="doc-codex-cap" className="text-xl font-semibold mb-3">Capabilities</h2>
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {['Architectural decisions', 'Code refactoring', 'Complex logic implementation', 'Debugging & analysis', 'Explore & modify codebase', 'Shell & file system access'].map(c => (
            <div key={c} className="flex gap-2 items-center rounded-lg border border-zinc-800 p-3 text-sm text-zinc-400">
              <span className="text-zinc-200">✓</span>{c}
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
              <code className="text-zinc-300 font-mono text-base">{fn}()</code>
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
        <p className="text-zinc-400 text-sm mb-4 leading-relaxed">Create specialized agents just by writing a simple YAML file in <code className="text-zinc-300 bg-zinc-800 px-1.5 py-0.5 rounded text-xs">~/.openbot/agents/researcher/agent.yaml</code>:</p>
        <pre className="rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-4 text-sm font-mono text-zinc-300 mb-10 overflow-x-auto leading-relaxed"><span className="text-zinc-200">name</span><span className="text-zinc-500">:</span> researcher{'\n'}<span className="text-zinc-200">description</span><span className="text-zinc-500">:</span> <span className="text-green-400">A specialized agent for gathering information and summarizing articles.</span>{'\n'}<span className="text-zinc-200">model</span><span className="text-zinc-500">:</span> <span className="text-green-400">anthropic/claude-3-5-sonnet-20240620</span>{'\n'}<span className="text-zinc-200">plugins</span><span className="text-zinc-500">:</span>{'\n'}  <span className="text-zinc-500">-</span> <span className="text-zinc-200">name</span><span className="text-zinc-500">:</span> browser{'\n'}  <span className="text-zinc-500">-</span> <span className="text-zinc-200">name</span><span className="text-zinc-500">:</span> file-system{'\n'}    <span className="text-zinc-200">config</span><span className="text-zinc-500">:</span>{'\n'}      <span className="text-zinc-200">baseDir</span><span className="text-zinc-500">:</span> <span className="text-green-400">~/Documents/Research</span>{'\n'}<span className="text-zinc-200">systemPrompt</span><span className="text-zinc-500">: |</span>{'\n'}  <span className="text-zinc-400">You are an expert researcher.</span>{'\n'}  <span className="text-zinc-400">Use the browser to gather information and the file-system to save detailed reports.</span>{'\n'}  <span className="text-zinc-400">Always cite your sources and provide a high-level summary.</span></pre>

        <h2 id="doc-ext-ts" className="text-2xl font-bold mb-2">2. TS Agent Packages <span className="text-sm font-normal text-zinc-500 ml-2">(Advanced)</span></h2>
        <p className="text-zinc-400 text-sm mb-4 leading-relaxed">For more complex agents that require custom logic beyond a prompt, you can create a full TypeScript package in <code className="text-zinc-300 bg-zinc-800 px-1.5 py-0.5 rounded text-xs">~/.openbot/agents/my-agent/</code>:</p>
        <pre className="rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-4 text-sm font-mono text-zinc-300 mb-10 overflow-x-auto leading-relaxed"><span className="text-zinc-500">{'// ~/.openbot/agents/my-agent/index.ts'}</span>{'\n'}<span className="text-blue-400">export const</span> <span className="text-yellow-300">agent</span> = {'{'}{'\n'}  <span className="text-zinc-200">name</span>: <span className="text-green-400">"custom-agent"</span>,{'\n'}  <span className="text-zinc-200">description</span>: <span className="text-green-400">"An agent with custom TS logic"</span>,{'\n'}  <span className="text-zinc-200">factory</span>: {'({ model }) => (builder) => {'}{'\n'}    <span className="text-zinc-500">{'// Compose plugins and add custom event handlers'}</span>{'\n'}    <span className="text-yellow-300">builder</span>.<span className="text-blue-400">use</span>(<span className="text-yellow-300">llmPlugin</span>({'({'}{'\n'}      <span className="text-zinc-200">model</span>,{'\n'}      <span className="text-zinc-200">system</span>: <span className="text-green-400">"You are a specialized assistant..."</span>,{'\n'}      <span className="text-zinc-500">{'// ...'}</span>{'\n'}    {'})'}));{'\n'}  {'}'}{'\n'}{'}'}{';'}</pre>

        <h2 id="doc-ext-plugin" className="text-2xl font-bold mb-2">3. Custom Plugins</h2>
        <p className="text-zinc-400 text-sm mb-4 leading-relaxed">For those who want even more control, you can extend the AI's toolbox with custom logic. A plugin defines new tools and reacts to system events.</p>
        <pre className="rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-4 text-sm font-mono text-zinc-300 mb-10 overflow-x-auto leading-relaxed"><span className="text-blue-400">export const</span> <span className="text-yellow-300">myPlugin</span> = <span className="text-blue-400">{`() => (builder) => {`}</span>{'\n'}  <span className="text-yellow-300">builder</span>.<span className="text-blue-400">on</span>(<span className="text-green-400">"action:myTool"</span>, <span className="text-blue-400">async function*</span> (event, {'{ state }'}) {'{'}{'\n'}    <span className="text-zinc-500">{'// Perform custom logic or interact with other systems'}</span>{'\n'}    <span className="text-blue-400">yield</span> {'{ '}<span className="text-zinc-200">type</span>: <span className="text-green-400">"action:taskResult"</span>, <span className="text-zinc-200">data</span>: {'{ '}<span className="text-zinc-200">result</span>: <span className="text-green-400">"Done!"</span> {'}}'};{'\n'}  {'}'});{'\n'}{'}'}{';'}</pre>

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
              <span className="text-zinc-200 font-semibold">{prefix}</span>
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
              <span className="text-zinc-200 font-mono text-sm font-semibold shrink-0 mt-0.5">{name}</span>
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
              <code className="text-zinc-300 font-mono text-sm shrink-0">{path}</code>
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
              <div className="w-2 h-2 rounded-full bg-white mt-1.5 shrink-0"></div>
              <div>
                <code className="text-zinc-200 font-mono text-sm font-semibold">{name}</code>
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
              {isActive && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-t-full" />}
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
                    activeSidebarKey === id + ':' + (sectionId ?? '') ? 'bg-white/10 text-white font-medium' : sidebarInactiveCls
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

  return <canvas ref={canvasRef} style={{ width: '100%', height: '48px', display: 'block', cursor: 'crosshair' }} />
}

function SkyCard({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ borderRadius: 15, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 48px', background: 'linear-gradient(135deg, #012a4a 0%, #01497c 20%, #0369a1 50%, #0284c7 75%, #0ea5e9 100%)' }}>
      {children}
    </div>
  )
}

function WhySection() {
  const vw = useWindowWidth()
  const isMobile = vw < 768
  const isTablet = vw < 1024
  const font = '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", sans-serif'
  const mono = '"SF Mono", "Fira Code", monospace'
  const cardStyle: React.CSSProperties = { background: '#0d0d0d', borderRadius: 14, overflow: 'hidden', boxShadow: '0 40px 100px rgba(0,0,0,0.55)', border: '1px solid rgba(255,255,255,0.08)', fontFamily: font }
  const inputBar = <div style={{ padding: '10px 16px 16px', borderTop: '1px solid rgba(255,255,255,0.06)' }}><div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: '10px 14px', color: '#333', fontSize: 13 }}>Ask OpenBot anything</div></div>

  const actionRow = (label: string, file: string, done = true) => (
    <div style={{ background: '#131313', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 7, padding: '6px 12px', marginBottom: 6, display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12 }}>
      <span><span style={{ color: '#888' }}>{label}</span><span style={{ color: '#444' }}>  {file}</span></span>
      <span style={{ color: done ? '#444' : '#666' }}>✓</span>
    </div>
  )

  const features = [
    {
      title: 'Built to drive real engineering work',
      description: 'From routine pull requests to your hardest problems, OpenBot agents reliably complete tasks end to end — reading files, writing code, opening PRs, and more.',
      flip: false,
      mockup: (
        <div style={{ ...cardStyle, width: '100%', maxWidth: 420 }}>
          <div style={{ padding: '20px 22px' }}>
            {/* User message */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 18 }}>
              <div style={{ background: '#1e1e1e', borderRadius: 12, padding: '10px 14px', maxWidth: '88%', color: '#ddd', fontSize: 13, lineHeight: 1.6 }}>
                <span style={{ color: '#a78bfa', fontWeight: 500 }}>@claude</span> check if <code style={{ background: '#252525', padding: '1px 5px', borderRadius: 3, fontSize: 11.5, color: '#c4b5fd', fontFamily: mono }}>alex@acme.com</code> has access to the repo, then <span style={{ color: '#6ee7b7', fontWeight: 500 }}>@github</span> add them as a collaborator
              </div>
            </div>
            {/* Claude response */}
            <div style={{ fontSize: 12.5, lineHeight: 1.7, color: '#999', marginBottom: 10 }}>
              I'll check the current collaborators list and hand off to <span style={{ color: '#6ee7b7' }}>@github</span> to add access.
            </div>
            <div style={{ marginBottom: 8, fontSize: 12 }}><span style={{ color: '#666' }}>Thought</span><span style={{ color: '#444' }}> 3s</span></div>
            {actionRow('Fetched', 'repo collaborators list')}
            {actionRow('Confirmed', 'alex@acme.com — no access yet')}
            {/* GitHub agent picks up */}
            <div style={{ margin: '12px 0 8px', fontSize: 12 }}>
              <span style={{ color: '#6ee7b7', fontWeight: 600 }}>@github</span>
              <span style={{ color: '#444' }}> — adding collaborator…</span>
            </div>
            {actionRow('Invited', 'alex@acme.com → write access')}
            {actionRow('Sent', 'GitHub invitation email ✓')}
            <p style={{ color: '#777', fontSize: 12.5, marginTop: 10, lineHeight: 1.6 }}>
              Done. <code style={{ background: '#1a1a1a', padding: '1px 5px', borderRadius: 3, fontSize: 11.5, color: '#6ee7b7', fontFamily: mono }}>alex@acme.com</code> has been invited with <span style={{ color: '#a78bfa' }}>write</span> access.
            </p>
          </div>
          {inputBar}
        </div>
      ),
    },
    {
      title: 'Designed for multi-agent workflows',
      description: 'Channels keep your agents organized. Each one has full context, picks up where another left off, and completes work end-to-end — no micromanagement needed.',
      flip: true,
      mockup: (
        <div style={{ ...cardStyle, width: '100%', maxWidth: 260, display: 'flex', flexDirection: 'column' }}>
          {/* Workspace header */}
          <div style={{ height: 46, padding: '0 14px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: 9, flexShrink: 0 }}>
            <img src={openbotLogo} alt="" style={{ width: 22, height: 22 }} />
            <span style={{ color: '#e0e0e0', fontSize: 13.5, fontWeight: 500 }}>Workspace 1</span>
            <svg width="11" height="11" fill="none" stroke="#555" strokeWidth="2.2" viewBox="0 0 24 24" style={{ marginLeft: 'auto' }}><path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6"/></svg>
          </div>
          {/* Channels */}
          <div style={{ flex: 1, padding: '10px 8px', overflowY: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 6px', marginBottom: 6 }}>
              <span style={{ fontSize: 10.5, color: '#3a3a3a', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600 }}>Channels</span>
              <button style={{ background: 'none', border: 'none', color: '#3a3a3a', fontSize: 16, cursor: 'pointer', lineHeight: 1 }}>+</button>
            </div>
            {[
              { name: 'general', active: false },
              { name: 'research', active: false },
              { name: 'coding', active: true },
              { name: 'browser', active: false, dot: true },
            ].map(ch => (
              <div key={ch.name} style={{ display: 'flex', alignItems: 'center', gap: 7, width: '100%', padding: '5px 8px', borderRadius: 6, cursor: 'pointer',
                color: ch.active ? '#fff' : '#555',
                background: ch.active ? 'rgba(255,255,255,0.09)' : 'none',
              }}>
                <span style={{ color: ch.active ? '#888' : '#3a3a3a' }}>#</span>
                <span style={{ fontSize: 13, flex: 1 }}>{ch.name}</span>
                {ch.dot && <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#6366f1', flexShrink: 0 }} />}
              </div>
            ))}
          </div>
          {/* User row */}
          <div style={{ padding: '10px 12px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: 9, flexShrink: 0 }}>
            <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <img src={openbotLogo} alt="" style={{ width: 14, height: 14 }} />
            </div>
            <span style={{ color: '#888', fontSize: 12.5, flex: 1 }}>User</span>
            <svg width="11" height="11" fill="none" stroke="#444" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6"/></svg>
          </div>
        </div>
      ),
    },
    {
      title: 'Works with every tool your team uses',
      description: 'Connect GitHub, Slack, Notion, Figma and more. OpenBot agents don\'t just generate — they act directly inside the tools your team already depends on.',
      flip: false,
      mockup: (
        <div style={{ ...cardStyle, width: '100%', maxWidth: 440 }}>
          <div style={{ padding: '20px 22px 18px' }}>

            {/* Up next */}
            <div style={{ fontSize: 12, color: '#555', marginBottom: 14, fontWeight: 500 }}>Up next</div>
            {[
              { task: 'Review PR changes', agent: '@claude', badge: 'Every 2 hours', status: 'In progress' },
              { task: 'Run test suite', agent: '@codex', badge: 'After review', status: 'Starts in 5m' },
              { task: 'Deploy to staging', agent: '@github', badge: 'After tests', status: 'Starts in 20m' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 13 }}>
                <div className="animate-spin" style={{ width: 16, height: 16, borderRadius: '50%', border: '1.5px solid rgba(255,255,255,0.2)', borderTopColor: '#fff', flexShrink: 0 }} />
                <span style={{ color: '#ddd', fontSize: 12.5, fontWeight: 600, flex: 1 }}>{item.task}</span>
                <span style={{ color: '#555', fontSize: 11.5 }}>{item.agent}</span>
                <span style={{ background: 'rgba(99,102,241,0.25)', color: '#a5b4fc', fontSize: 11, padding: '2px 9px', borderRadius: 20, display: 'flex', alignItems: 'center', gap: 4 }}>
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M23 4v6h-6M1 20v-6h6"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/></svg>
                  {item.badge}
                </span>
                <span style={{ color: '#444', fontSize: 11.5, minWidth: 70, textAlign: 'right' }}>{item.status}</span>
              </div>
            ))}

            {/* Unread */}
            <div style={{ fontSize: 12, color: '#555', margin: '18px 0 14px', fontWeight: 500 }}>Unread</div>
            {[
              { task: 'Review PR changes', agent: '@claude', time: 'Just now' },
              { task: 'Run test suite', agent: '@codex', time: '3m' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 13 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#f87171', flexShrink: 0, margin: '0 4px' }} />
                <span style={{ color: '#ddd', fontSize: 12.5, fontWeight: 600, flex: 1 }}>{item.task}</span>
                <span style={{ color: '#555', fontSize: 11.5 }}>{item.agent}</span>
                <span style={{ color: '#555', fontSize: 11.5, minWidth: 70, textAlign: 'right' }}>{item.time}</span>
              </div>
            ))}

            {/* Completed */}
            <div style={{ fontSize: 12, color: '#555', margin: '18px 0 14px', fontWeight: 500 }}>Completed</div>
            {[
              { task: 'Fetch repo changes', agent: '@github', time: '1h' },
              { task: 'Check for conflicts', agent: '@claude', time: '1h' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 13 }}>
                <div style={{ width: 16, height: 16, borderRadius: '50%', border: '1.5px solid #4ade80', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                </div>
                <span style={{ color: '#ddd', fontSize: 12.5, fontWeight: 600, flex: 1 }}>{item.task}</span>
                <span style={{ color: '#555', fontSize: 11.5 }}>{item.agent}</span>
                <span style={{ color: '#555', fontSize: 11.5, minWidth: 70, textAlign: 'right' }}>{item.time}</span>
              </div>
            ))}

          </div>
        </div>
      ),
    },
  ]

  return (
    <div id="why" style={{ background: '#000' }}>
      {/* Chapter heading */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: isMobile ? '60px 24px 36px' : '80px 72px 48px', textAlign: 'center' }}>
        <h2 style={{ fontSize: isMobile ? 26 : isTablet ? 28 : 35, fontWeight: 600, color: '#fff', lineHeight: 1.2, fontFamily: "'Raleway', sans-serif", letterSpacing: '0.01em' }}>
          Why OpenBot is the best way to build with agents.
        </h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: isMobile ? '0 16px 24px' : '0 30px 30px' }}>
        {features.map((feature, i) => (
          <section key={i} style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', minHeight: isMobile ? 'auto' : '80vh', background: '#000', gap: isMobile ? 24 : 0 }}>
            {feature.flip && !isMobile ? (
              <>
                <div style={{ flex: '0 0 58%', padding: '0 16px 0 0' }}>
                  <SkyCard>{feature.mockup}</SkyCard>
                </div>
                <div style={{ flex: '0 0 42%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: isTablet ? '0 32px 0 28px' : '0 72px 0 52px' }}>
                  <h2 style={{ fontSize: 'clamp(22px, 2.6vw, 44px)', fontWeight: 700, color: '#fff', lineHeight: 1.15, marginBottom: 20, fontFamily: font }}>{feature.title}</h2>
                  <p style={{ fontSize: isTablet ? 15 : 17, color: '#666', lineHeight: 1.75, fontFamily: font }}>{feature.description}</p>
                </div>
              </>
            ) : (
              <>
                <div style={{ flex: isMobile ? 'none' : '0 0 42%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: isMobile ? '32px 8px 0' : isTablet ? '0 28px 0 32px' : '0 52px 0 72px' }}>
                  <h2 style={{ fontSize: isMobile ? 22 : 'clamp(22px, 2.6vw, 44px)', fontWeight: 700, color: '#fff', lineHeight: 1.15, marginBottom: 16, fontFamily: font }}>{feature.title}</h2>
                  <p style={{ fontSize: isMobile ? 15 : isTablet ? 15 : 17, color: '#666', lineHeight: 1.75, fontFamily: font }}>{feature.description}</p>
                </div>
                <div style={{ flex: isMobile ? 'none' : '0 0 58%', padding: isMobile ? '0' : '0 0 0 16px', overflow: 'hidden' }}>
                  <SkyCard>{feature.mockup}</SkyCard>
                </div>
              </>
            )}
          </section>
        ))}
      </div>

      <WaveCanvas />
    </div>
  )
}


function CanDoSection({ onShowAgents }: { onShowAgents: () => void }) {
  const vw = useWindowWidth()
  const isMobile = vw < 640
  const cardGrad = 'linear-gradient(160deg, #012a4a 0%, #01497c 30%, #0369a1 60%, #0ea5e9 100%)'

  const ChatMockup = () => {
    const [step, setStep] = useState(0)
    const actions = [
      { label: 'Searched', detail: 'computer for PDF files' },
      { label: 'Found', detail: 'projects_Q2_2024.pdf' },
      { label: 'Sent', detail: 'to david@gmail.com' },
    ]
    useEffect(() => {
      const delays = [700, 1000, 1100, 1100, 1100]
      if (step > 5) { const t = setTimeout(() => setStep(0), 100); return () => clearTimeout(t) }
      const t = setTimeout(() => setStep(s => s + 1), delays[step] ?? 1800)
      return () => clearTimeout(t)
    }, [step])

    return (
      <div style={{ background: '#0a0a0a', borderRadius: 10, padding: '14px 16px', width: '100%', boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}>
        <div style={{ marginBottom: 12, paddingBottom: 10, borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <span style={{ fontSize: 11, color: '#aaa', fontFamily: 'monospace' }}>OpenBot Chat</span>
        </div>
        {/* User message */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 10, opacity: step >= 1 ? 1 : 0, transition: 'opacity 0.4s ease' }}>
          <div style={{ background: '#0369a1', borderRadius: '12px 12px 2px 12px', padding: '8px 12px', maxWidth: '80%' }}>
            <span style={{ fontSize: 11, color: '#e0f2fe', lineHeight: 1.4 }}>Find projects PDF and send to David on Gmail</span>
          </div>
        </div>
        {/* Agent action rows */}
        {actions.map((action, i) => {
          const visible = step >= i + 2
          const done = step >= i + 3
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '8px 12px', marginBottom: 7, opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(6px)', transition: 'opacity 0.35s ease, transform 0.35s ease', whiteSpace: 'nowrap' }}>
              <span style={{ fontSize: 11, color: '#ddd', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                <span style={{ fontWeight: 700 }}>{action.label}</span>
                <span style={{ color: '#666', marginLeft: 5 }}>{action.detail}</span>
              </span>
              {visible && !done
                ? <div className="animate-spin" style={{ width: 11, height: 11, borderRadius: '50%', border: '1.5px solid rgba(255,255,255,0.15)', borderTopColor: '#aaa', flexShrink: 0, marginLeft: 8 }} />
                : <svg width="11" height="11" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginLeft: 8, opacity: done ? 1 : 0 }}><path stroke="#555" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
              }
            </div>
          )
        })}
      </div>
    )
  }

  const AutomateMockup = () => (
    <div style={{ background: '#0a0a0a', borderRadius: 10, padding: '14px 16px', width: '100%', maxWidth: 300, boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14, paddingBottom: 10, borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <span style={{ fontSize: 11, color: '#aaa', fontFamily: 'monospace' }}>Task Pipeline</span>
      </div>
      {[
        { label: 'Scrape product listings', status: 'done' },
        { label: 'Format data to CSV', status: 'done' },
        { label: 'Upload to Google Sheets', status: 'running' },
        { label: 'Send summary email', status: 'pending' },
        { label: 'Notify on Slack', status: 'pending' },
      ].map((task, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
          {task.status === 'done' && (
            <div style={{ width: 16, height: 16, borderRadius: '50%', border: '1.5px solid #4ade80', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none"><path stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
            </div>
          )}
          {task.status === 'running' && (
            <div className="animate-spin" style={{ width: 16, height: 16, borderRadius: '50%', border: '1.5px solid rgba(255,255,255,0.2)', borderTopColor: '#fff', flexShrink: 0 }} />
          )}
          {task.status === 'pending' && (
            <div style={{ width: 16, height: 16, borderRadius: '50%', border: '1.5px solid rgba(255,255,255,0.15)', flexShrink: 0 }} />
          )}
          <span style={{ fontSize: 11, color: task.status === 'done' ? '#888' : task.status === 'running' ? '#ddd' : '#555' }}>{task.label}</span>
        </div>
      ))}
    </div>
  )

  const IntegrationsMockup = () => (
    <div style={{ background: '#0a0a0a', borderRadius: 10, padding: '14px 16px', width: '100%', maxWidth: 300, boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14, paddingBottom: 10, borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <span style={{ fontSize: 11, color: '#aaa', fontFamily: 'monospace' }}>Connected Tools</span>
      </div>
      {[
        { name: 'GitHub', desc: 'PRs, issues, repos' },
        { name: 'Notion', desc: 'Docs, databases' },
        { name: 'Slack', desc: 'Messages, channels' },
        { name: 'Gmail', desc: 'Email, drafts' },
        { name: 'Linear', desc: 'Tasks, projects' },
        { name: 'Figma', desc: 'Designs, comments' },
      ].map((tool, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
          <span style={{ fontSize: 11, color: '#ddd', fontWeight: 600, minWidth: 52 }}>{tool.name}</span>
          <span style={{ fontSize: 10, color: '#555' }}>{tool.desc}</span>
        </div>
      ))}
    </div>
  )

  const cards = [
    {
      mockup: <ChatMockup />,
      title: 'Chat with your agents',
      desc: 'Talk to your AI in plain English. It reads emails, sends replies, searches the web, and reports back — all in one thread.',
      cta: 'Get started',
      onClick: () => window.open('https://openbot.one', '_blank'),
    },
    {
      mockup: <AutomateMockup />,
      title: 'Automate anything',
      desc: 'Build multi-step pipelines that run on a schedule or on demand. Agents hand off tasks to each other automatically.',
      cta: 'See automations',
      onClick: () => window.open('https://openbot.one', '_blank'),
    },
    {
      mockup: <IntegrationsMockup />,
      title: 'Connect your plugins',
      desc: 'Plug in GitHub, Notion, Slack, Gmail, Linear, and 100+ more. Your agent works across all of them at once.',
      cta: 'View integrations',
      onClick: () => { window.location.hash = '#agents'; onShowAgents() },
    },
  ]

  return (
    <div id="what-it-can-do" style={{ background: '#000', padding: isMobile ? '60px 16px 60px' : '100px 32px 100px' }}>
      <div style={{ textAlign: 'center', marginBottom: isMobile ? 40 : 60 }}>
        <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.25em', color: '#555', textTransform: 'uppercase', marginBottom: 16 }}>What it can do</p>
        <h2 style={{ fontSize: 'clamp(24px, 3vw, 44px)', fontWeight: 300, color: '#fff', lineHeight: 1.2, fontFamily: "'Raleway', sans-serif" }}>
          Your AI doesn't just answer questions.<br />It takes real action.
        </h2>
      </div>

      <div style={{ display: 'flex', gap: 16, maxWidth: 1100, margin: '0 auto', flexWrap: 'wrap' }}>
        {cards.map((card, i) => (
          <div key={i} style={{ flex: isMobile ? '1 1 100%' : '1 1 0', minWidth: 0, borderRadius: 16, background: '#0f0f0f', border: '1px solid rgba(255,255,255,0.07)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            {/* Top gradient area with mockup */}
            <div style={{ background: cardGrad, padding: '36px 28px 28px', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', height: 320 }}>
              {card.mockup}
            </div>
            {/* Bottom text area */}
            <div style={{ padding: '28px 28px 32px', display: 'flex', flexDirection: 'column', gap: 12, flexGrow: 1 }}>
              <h3 style={{ fontSize: 20, fontWeight: 600, color: '#fff', margin: 0, fontFamily: "'Raleway', sans-serif" }}>{card.title}</h3>
              <p style={{ fontSize: 14, color: '#777', lineHeight: 1.6, margin: 0, flexGrow: 1 }}>{card.desc}</p>
              <div>
                <button onClick={card.onClick} style={{ marginTop: 8, background: '#fff', color: '#000', border: 'none', borderRadius: 999, padding: '9px 22px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                  {card.cta} →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
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

type FeedbackPost = {
  source: 'x' | 'reddit'
  name: string
  handle: string
  avatar: string
  color: string
  text: string
  score: string
  time: string
  subreddit?: string
}

const feedbackPosts: FeedbackPost[] = [
  // --- X/Twitter ---
  {
    source: 'x', name: 'Alex Rivera', handle: '@alexbuilds_', avatar: 'AR', color: '#7c3aed',
    text: 'OpenBot just sent 47 emails for me while I was at lunch. This is not a drill. The automation is unreal.',
    score: '284', time: '2h',
  },
  {
    source: 'x', name: 'Sarah Chen', handle: '@sarahtech_', avatar: 'SC', color: '#0891b2',
    text: 'Been using OpenBot for 2 weeks. It scheduled all my meetings, replied to Slack DMs, and pushed 3 PRs. I barely touched my keyboard.',
    score: '538', time: '5h',
  },
  {
    source: 'x', name: 'Marcos Dev', handle: '@marcosdev', avatar: 'MD', color: '#059669',
    text: 'The browser agent is insane. Told it to "book the cheapest flight to NYC next weekend" and it just… did it. Confirmation email in 2 minutes.',
    score: '412', time: '1d',
  },
  {
    source: 'x', name: 'Priya Nair', handle: '@priya_nocode', avatar: 'PN', color: '#db2777',
    text: 'Finally an AI that actually DOES things instead of just talking about things. OpenBot is a different category.',
    score: '891', time: '3h',
  },
  {
    source: 'x', name: 'Xander Builds', handle: '@xander_builds', avatar: 'XB', color: '#d97706',
    text: 'OpenBot ran my entire deployment pipeline while I was sleeping. Woke up to a merged PR and a green CI. Incredible.',
    score: '347', time: '8h',
  },
  {
    source: 'x', name: 'Laura Kim', handle: '@laurakim_ai', avatar: 'LK', color: '#7c3aed',
    text: 'Told it to "clear my inbox". It categorized 200 emails, replied to 12 urgent ones, and unsubscribed from 30 newsletters. In 6 minutes.',
    score: '591', time: '2d',
  },
  {
    source: 'x', name: 'Dan Ops', handle: '@devops_dan', avatar: 'DO', color: '#0891b2',
    text: 'Set up OpenBot with my Anthropic key on Friday. By Monday it had automated 6 workflows I\'d been procrastinating on for months.',
    score: '743', time: '1d',
  },
  {
    source: 'x', name: 'Aisha Codes', handle: '@aishacodes_', avatar: 'AC', color: '#0891b2',
    text: 'OpenBot wrote, tested, and committed a full feature branch while I was in a 3-hour meeting. Local-first, my data never left my machine.',
    score: '476', time: '2d',
  },
  // --- Reddit ---
  {
    source: 'reddit', name: 'u/tinkerer_irl', handle: 'r/selfhosted', avatar: 'TI', color: '#16a34a',
    subreddit: 'r/selfhosted',
    text: 'Just spent the weekend with OpenBot. It\'s the real deal. Set it up with my own Anthropic key, pointed it at my email and calendar, and it\'s been running my mornings for me. No subscription, no nonsense.',
    score: '563', time: '2d',
  },
  {
    source: 'reddit', name: 'u/productivitynerds', handle: 'r/MachineLearning', avatar: 'PN', color: '#d97706',
    subreddit: 'r/MachineLearning',
    text: 'The manager-agent architecture in OpenBot is genuinely well thought out. Manager handles intent and memory, delegates to specialist agents. It\'s not just a wrapper — it\'s real multi-agent orchestration.',
    score: '429', time: '4d',
  },
  {
    source: 'reddit', name: 'u/kai_builds', handle: 'r/LocalLLaMA', avatar: 'KB', color: '#7c3aed',
    subreddit: 'r/LocalLLaMA',
    text: 'This is what agentic AI should feel like. Not a chatbot. An actual agent that takes real action on your behalf. Runs locally, memory persists across sessions. Huge.',
    score: '584', time: '3d',
  },
  {
    source: 'reddit', name: 'u/devtools_daily', handle: 'r/programming', avatar: 'DD', color: '#be185d',
    subreddit: 'r/programming',
    text: 'OpenBot is self-hosted, works with any AI provider, and has 100+ built-in integrations. Why isn\'t this at the top of every dev newsletter? Seriously impressive project.',
    score: '317', time: '1w',
  },
  {
    source: 'reddit', name: 'u/autom8_all_things', handle: 'r/homeautomation', avatar: 'AA', color: '#0891b2',
    subreddit: 'r/homeautomation',
    text: 'Had OpenBot integrated with my smart home in under an hour. It now handles my morning routine, grocery orders, and even sends me a summary of overnight news. The browser agent is a killer feature.',
    score: '987', time: '5d',
  },
  {
    source: 'reddit', name: 'u/indie_hacker_logs', handle: 'r/SideProject', avatar: 'IH', color: '#059669',
    subreddit: 'r/SideProject',
    text: 'Built a custom YAML agent with OpenBot in about 20 minutes that researches product feedback, formats it into a Notion doc, and pings me on Slack. No code, just config. This extensibility is underrated.',
    score: '392', time: '3d',
  },
  {
    source: 'reddit', name: 'u/sysops_weekly', handle: 'r/devops', avatar: 'SW', color: '#d97706',
    subreddit: 'r/devops',
    text: 'We\'ve been trialing OpenBot for automating our incident triage. It reads alerts, checks logs via the OS agent, opens PRs with suggested fixes, and posts a summary to Slack. No vendor lock-in. Really solid.',
    score: '447', time: '6d',
  },
  {
    source: 'reddit', name: 'u/Richa_reacts', handle: 'r/webdev', avatar: 'RR', color: '#7c3aed',
    subreddit: 'r/webdev',
    text: 'Added my OpenAI key, ran one command. It\'s been handling my Notion updates, GitHub PR reviews, and daily standups ever since. The persistent memory is the killer feature — it actually knows my codebase.',
    score: '518', time: '6h',
  },
]

// Split into two interleaved rows so each row has mixed X + Reddit posts
const row1Posts = feedbackPosts.filter((_, i) => i % 2 === 0)
const row2Posts = feedbackPosts.filter((_, i) => i % 2 !== 0)

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function RedditIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
    </svg>
  )
}

function FeedbackCard({ post }: { post: FeedbackPost }) {
  const isReddit = post.source === 'reddit'
  return (
    <div
      className="shrink-0 w-72 rounded-2xl p-4 flex flex-col gap-3 select-none"
      style={{
        background: 'rgba(255,255,255,0.025)',
        border: `1px solid ${isReddit ? 'rgba(255,69,0,0.12)' : 'rgba(255,255,255,0.07)'}`,
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
            style={{ background: post.color }}
          >
            {post.avatar}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white leading-tight truncate">{post.name}</p>
            <p className="text-xs leading-tight truncate" style={{ color: isReddit ? 'rgba(255,69,0,0.7)' : 'rgba(161,161,170,0.7)' }}>
              {isReddit ? post.subreddit : post.handle}
            </p>
          </div>
        </div>
        {isReddit
          ? <RedditIcon className="w-4 h-4 shrink-0" style={{ color: 'rgba(255,69,0,0.5)' } as React.CSSProperties} />
          : <XIcon className="w-4 h-4 text-zinc-600 shrink-0" />
        }
      </div>

      {/* Text */}
      <p className="text-sm text-zinc-300 leading-relaxed flex-1" style={{ display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', overflow: 'hidden' } as React.CSSProperties}>
        {post.text}
      </p>

      {/* Footer */}
      <div className="flex items-center gap-1.5 pt-1">
        {isReddit ? (
          <>
            <svg className="w-3.5 h-3.5" style={{ color: 'rgba(255,69,0,0.45)' }} fill="currentColor" viewBox="0 0 24 24"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" /></svg>
            <span className="text-xs text-zinc-600">{post.score} upvotes</span>
          </>
        ) : (
          <>
            <svg className="w-3.5 h-3.5 text-zinc-700" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
            <span className="text-xs text-zinc-600">{post.score}</span>
          </>
        )}
        <span className="ml-auto text-xs text-zinc-700">{post.time}</span>
      </div>
    </div>
  )
}

const useCaseTabs = [
  {
    label: 'For Developers',
    id: 'developers',
    headline: 'Ship faster. Let agents handle the busywork.',
    desc: 'From debugging to deployment, OpenBot coordinates your dev workflow so you can stay in flow.',
    steps: [
      '@codex finds the bug and @claude writes a test to reproduce it',
      '@codex applies the fix and @github opens a PR with the diff',
      '@claude writes the PR description, changelog, and reviewer notes',
      '@slack pings the reviewer and @linear updates the ticket to "In Review"',
    ],
    workflows: ['Bug fix → PR → review notify', 'Research docs → generate boilerplate', 'Run tests → deploy → post results'],
  },
  {
    label: 'For Founders',
    id: 'founders',
    headline: 'Move at the speed of thought.',
    desc: 'Research, write, analyze, and communicate — all delegated to agents while you focus on decisions.',
    steps: [
      '@tavily researches your top 5 competitors and @browser scrapes their pricing pages',
      '@claude writes a full competitive analysis from the gathered data',
      '@notion saves the report and @figma creates a one-page visual summary',
      '@gmail drafts an investor update and @slack shares a summary with the team',
    ],
    workflows: ['Research → report → publish', 'Monitor metrics → draft update → send', 'Idea → landing page → deploy'],
  },
  {
    label: 'For Teams',
    id: 'teams',
    headline: 'Automate the coordination. Keep the collaboration.',
    desc: 'OpenBot handles repetitive team workflows so your people can focus on the work that matters.',
    steps: [
      '@calendar finds a time that works for everyone and @slack sends the invite',
      '@claude generates the meeting agenda and @notion creates the notes doc',
      '@slack posts the agenda to the channel and @gmail sends it to external attendees',
      '@claude writes the follow-up summary and @linear creates action item tickets',
    ],
    workflows: ['Schedule → agenda → notes → recap', 'Task created → assigned → tracked', 'Report due → gathered → formatted → sent'],
  },
  {
    label: 'For Marketing',
    id: 'marketing',
    headline: 'Launch campaigns while you sleep.',
    desc: 'From research to copy to scheduling — OpenBot runs your marketing workflows end to end.',
    steps: [
      '@tavily researches trending topics and @browser scrapes top-performing competitor content',
      '@claude writes blog posts, ad copy, and social captions from the research',
      '@figma generates visual assets and @notion organizes the content calendar',
      '@gmail schedules the newsletter and @slack notifies the team when it goes live',
    ],
    workflows: ['Research → write → publish → report', 'Trend spotted → content drafted → scheduled', 'Campaign brief → copy → visuals → launch'],
  },
  {
    label: 'For Designers',
    id: 'designers',
    headline: 'Focus on design. Automate everything else.',
    desc: 'Let agents handle feedback loops, file management, and handoffs so you can stay in the creative zone.',
    steps: [
      '@browser collects design inspiration and @claude summarizes key patterns and trends',
      '@figma organizes components and @notion documents the design system changes',
      '@claude writes copy for UI components and @github commits the updated design tokens',
      '@slack sends the design handoff summary and @linear creates dev tickets from specs',
    ],
    workflows: ['Brief → research → concept → present', 'Design done → tokens exported → dev handed off', 'Feedback received → changes logged → iterated'],
  },
]

function UseCasesSection() {
  const [activeTab, setActiveTab] = useState(0)
  const [animating, setAnimating] = useState(false)

  const handleTab = (i: number) => {
    if (i === activeTab) return
    setAnimating(true)
    setTimeout(() => { setActiveTab(i); setAnimating(false) }, 180)
  }

  const tab = useCaseTabs[activeTab]

  return (
    <section id="use-cases" className="container mx-auto px-6 py-12 md:py-20">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold tracking-[0.3em] text-zinc-700 uppercase mb-4">Use Cases</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Built for everyone who gets things done.</h2>
          <p className="text-zinc-400 text-base">Pick your role and see OpenBot in action.</p>
        </div>

        {/* Tab switcher */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center rounded-full p-1" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            {useCaseTabs.map((t, i) => (
              <button
                key={t.id}
                onClick={() => handleTab(i)}
                className="rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap"
                style={{
                  fontSize: 'clamp(10px, 2.5vw, 14px)',
                  padding: 'clamp(4px, 1vw, 8px) clamp(8px, 2vw, 20px)',
                  ...(activeTab === i
                    ? { background: '#fff', color: '#000', fontWeight: 500 }
                    : { color: '#71717a' })
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div
          className="rounded-2xl p-8 md:p-10"
          style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.07)',
            opacity: animating ? 0 : 1,
            transform: animating ? 'translateY(6px)' : 'translateY(0)',
            transition: 'opacity 0.18s ease, transform 0.18s ease',
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            {/* Left: headline + workflow chips */}
            <div>
              <h3 className="text-2xl font-bold mb-3">{tab.headline}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-8">{tab.desc}</p>

              <p className="text-xs font-semibold tracking-widest text-zinc-600 uppercase mb-4">Example workflows</p>
              <div className="flex flex-col gap-2">
                {tab.workflows.map(w => (
                  <div key={w} className="flex items-center gap-2.5 text-sm text-zinc-400">
                    <svg className="w-3.5 h-3.5 text-zinc-600 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                    {w}
                  </div>
                ))}
              </div>
            </div>

            {/* Right: agent step sequence */}
            <div className="flex flex-col gap-3">
              <p className="text-xs font-semibold tracking-widest text-zinc-600 uppercase mb-1">Live example</p>
              {tab.steps.map((step, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-xl px-4 py-3"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <span className="text-zinc-700 font-mono text-xs mt-0.5 shrink-0">{String(i + 1).padStart(2, '0')}</span>
                  <p className="text-sm leading-relaxed">{renderPrompt(step)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function TestimonialsSection() {
  const maskStyle: React.CSSProperties = {
    maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
    WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
    overflow: 'hidden',
  }

  return (
    <section className="py-14 md:py-24 bg-black">
      <div className="text-center mb-8 md:mb-14">
        <p className="text-xs font-semibold tracking-[0.3em] text-zinc-700 uppercase mb-4">What people are saying</p>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Loved by builders.</h2>
        <p className="text-zinc-500 text-base">Real posts from X and Reddit.</p>
      </div>

      <div className="flex flex-col gap-4">
        {/* Row 1 — scrolls left */}
        <div className="tweet-row" style={maskStyle}>
          <div className="tweet-track flex gap-4" style={{ width: 'max-content', animation: 'marqueeLeft 50s linear infinite' }}>
            {[...row1Posts, ...row1Posts].map((p, i) => <FeedbackCard key={i} post={p} />)}
          </div>
        </div>

        {/* Row 2 — scrolls right */}
        <div className="tweet-row" style={maskStyle}>
          <div className="tweet-track flex gap-4" style={{ width: 'max-content', animation: 'marqueeRight 42s linear infinite' }}>
            {[...row2Posts, ...row2Posts].map((p, i) => <FeedbackCard key={i} post={p} />)}
          </div>
        </div>
      </div>
    </section>
  )
}

const pricingPlans = [
  {
    name: 'Free',
    price: { monthly: 0, yearly: 0 },
    desc: 'Try OpenBot with your own API key.',
    features: ['Bring your own API key', '3 agents', '100 tasks / month', '1 AI model', 'Basic integrations', 'Community support'],
    cta: 'Get Started',
    highlighted: false,
  },
  {
    name: 'Plus',
    price: { monthly: 20, yearly: 16 },
    desc: 'For individuals getting started with automation.',
    features: ['5 agents', '300 tasks / month', '3 AI models', '20+ integrations', 'Community support'],
    cta: 'Buy Plus',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: { monthly: 60, yearly: 48 },
    desc: 'For individuals who need more power.',
    features: ['10 agents', '1,000 tasks / month', 'All AI models', '50+ integrations', 'Persistent memory', 'Email support'],
    cta: 'Buy Pro',
    highlighted: true,
  },
  {
    name: 'Max',
    price: { monthly: 200, yearly: 160 },
    desc: 'For power users and small teams.',
    features: ['Unlimited agents', '10,000 tasks / month', 'All AI models', '100+ integrations', 'Persistent memory', 'Custom agents', 'Advanced workflows', 'Priority support'],
    cta: 'Buy Max',
    highlighted: false,
  },
  {
    name: 'Enterprise',
    price: { monthly: null, yearly: null },
    desc: 'For teams that need full control.',
    features: ['Unlimited everything', 'Custom integrations', 'SSO & audit logs', 'On-premise option', 'SLA guarantee', 'Dedicated support'],
    cta: 'Contact Us',
    highlighted: false,
  },
]

function EnterpriseModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' })
  const [sent, setSent] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
    }
  }, [onClose])

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-2xl p-8"
        style={{ background: '#0f0f0f', border: '1px solid rgba(255,255,255,0.1)' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Close */}
        <button onClick={onClose} className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors cursor-pointer">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        {!sent ? (
          <>
            <p className="text-xs font-semibold tracking-[0.3em] text-zinc-600 uppercase mb-2">Enterprise</p>
            <h2 className="text-2xl font-bold mb-1">Let's talk.</h2>
            <p className="text-zinc-400 text-sm mb-6">Tell us about your team and we'll get back to you within 24 hours.</p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-zinc-500">Name</label>
                  <input
                    required
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="Jane Smith"
                    className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-600 outline-none focus:border-white transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-zinc-500">Company</label>
                  <input
                    value={form.company}
                    onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                    placeholder="Acme Inc."
                    className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-600 outline-none focus:border-white transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-zinc-500">Work email</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="jane@company.com"
                  className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-600 outline-none focus:border-white transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-zinc-500">Tell us about your use case</label>
                <textarea
                  rows={3}
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  placeholder="Team size, what you'd like to automate..."
                  className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-600 outline-none focus:border-white transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-full py-2.5 text-sm font-medium transition-all cursor-pointer mt-1"
                style={{ background: '#fff', color: '#000' }}
              >
                Send message
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-6">
            <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            </div>
            <h2 className="text-xl font-bold mb-2">Message sent!</h2>
            <p className="text-zinc-400 text-sm mb-6">We'll get back to you within 24 hours.</p>
            <button onClick={onClose} className="text-sm text-zinc-500 hover:text-white transition-colors cursor-pointer">Close</button>
          </div>
        )}
      </div>
    </div>
  )
}

export function PricingSection() {
  const [yearly, setYearly] = useState(false)
  const [displayYearly, setDisplayYearly] = useState(false)
  const [priceOpacity, setPriceOpacity] = useState(1)
  const [showEnterpriseModal, setShowEnterpriseModal] = useState(false)

  const handleToggle = (val: boolean) => {
    if (val === yearly) return
    setYearly(val)
    setPriceOpacity(0)
    setTimeout(() => {
      setDisplayYearly(val)
      setPriceOpacity(1)
    }, 140)
  }

  return (
    <section id="pricing" className="container mx-auto px-6 py-12 md:py-20">
      <div className="text-center mb-12">
        <p className="text-xs font-semibold tracking-[0.3em] text-zinc-700 uppercase mb-4">Pricing</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-3">Simple, transparent pricing.</h2>
        <p className="text-zinc-400 text-base mb-6">Start free. Scale as you grow.</p>
        <div className="inline-flex items-center gap-3">
          <div className="relative inline-flex items-center bg-zinc-900 border border-zinc-800 rounded-full p-1">
            <div
              className="absolute top-1 bottom-1 rounded-full bg-white"
              style={{
                width: 'calc(50% - 4px)',
                left: yearly ? 'calc(50% + 2px)' : '4px',
                transition: 'left 0.28s cubic-bezier(0.4,0,0.2,1)',
              }}
            />
            <button onClick={() => handleToggle(false)} className={`relative z-10 text-sm px-4 py-1.5 rounded-full cursor-pointer transition-colors duration-200 ${!yearly ? 'text-black font-medium' : 'text-zinc-400'}`}>Monthly</button>
            <button onClick={() => handleToggle(true)} className={`relative z-10 text-sm px-4 py-1.5 rounded-full cursor-pointer transition-colors duration-200 ${yearly ? 'text-black font-medium' : 'text-zinc-400'}`}>Yearly</button>
          </div>
          <span
            className="text-xs text-emerald-400 font-medium"
            style={{
              opacity: yearly ? 1 : 0,
              transform: yearly ? 'translateX(0)' : 'translateX(-6px)',
              transition: 'opacity 0.25s ease, transform 0.25s ease',
              pointerEvents: 'none',
            }}
          >Save 20%</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 max-w-7xl mx-auto">
        {pricingPlans.map((plan) => (
          <div
            key={plan.name}
            className="relative flex flex-col rounded-2xl p-6"
            style={{
              background: plan.highlighted ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.02)',
              border: plan.highlighted ? '1px solid rgba(255,255,255,0.3)' : '1px solid rgba(255,255,255,0.07)',
            }}
          >
            {plan.highlighted && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-white text-black text-xs font-semibold px-3 py-1 rounded-full">Most Popular</span>
              </div>
            )}

            <p className="text-xs font-semibold tracking-widest text-zinc-500 uppercase mb-3">{plan.name}</p>

            <div className="mb-3" style={{ opacity: priceOpacity, transition: 'opacity 0.14s ease' }}>
              {plan.price.monthly === null ? (
                <span className="text-3xl font-bold text-white">Custom</span>
              ) : (
                <>
                  <span className="text-3xl font-bold text-white">${displayYearly ? plan.price.yearly : plan.price.monthly}</span>
                  <span className="text-zinc-500 text-sm ml-1">/ mo</span>
                </>
              )}
            </div>

            <p className="text-zinc-500 text-sm mb-5 leading-relaxed">{plan.desc}</p>

            <ul className="flex flex-col gap-2.5 mb-6 flex-1">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-zinc-300">
                  <svg className="w-4 h-4 text-white shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  {f}
                </li>
              ))}
            </ul>

            <button
              onClick={() => plan.name === 'Enterprise' && setShowEnterpriseModal(true)}
              className="w-full rounded-full py-2.5 text-sm font-medium transition-all cursor-pointer"
              style={plan.highlighted
                ? { background: '#fff', color: '#000' }
                : { background: 'rgba(255,255,255,0.06)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }
              }
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>

      {showEnterpriseModal && <EnterpriseModal onClose={() => setShowEnterpriseModal(false)} />}
    </section>
  )
}

function parseHash() {
  const h = window.location.hash
  if (h === '#docs') return { docs: true, page: undefined }
  if (h.startsWith('#docs/')) return { docs: true, page: h.slice(6) || undefined }
  return { docs: false, page: undefined }
}


const agentColors: Record<string, string> = {
  '@tavily': '#60a5fa',
  '@stitch': '#f472b6',
  '@claude': '#a78bfa',
  '@browser': '#34d399',
  '@slack': '#fb923c',
  '@codex': '#818cf8',
  '@github': '#e2e8f0',
  '@calendar': '#fbbf24',
  '@notion': '#e2e8f0',
  '@linear': '#5e6ad2',
  '@figma': '#f24e1e',
  '@gmail': '#ea4335',
  '@browser-use': '#34d399',
}

function renderPrompt(text: string) {
  const parts = text.split(/(@\w+)/g)
  return parts.map((part, i) => {
    if (part.startsWith('@')) {
      const color = agentColors[part.toLowerCase()] ?? '#a78bfa'
      return <span key={i} style={{ color, fontWeight: 500 }}>{part}</span>
    }
    return <span key={i} className="text-zinc-300">{part}</span>
  })
}


function AppMockup() {
  const [activeThread, setActiveThread] = useState('coding')
  const [inputText, setInputText] = useState('')
  const [showLeft, setShowLeft] = useState(true)
  const [showRight, setShowRight] = useState(true)
  const [activeRightTab, setActiveRightTab] = useState<'Specification' | 'State' | 'Files'>('Specification')

  const font = '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", sans-serif'
  const mono = '"SF Mono", "Fira Code", "Cascadia Code", monospace'
  const iconBtn: React.CSSProperties = { background: 'none', border: 'none', cursor: 'pointer', color: '#555', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3px 5px', borderRadius: 4 }

  type DiffLine = { type: string; code: string }
  type DiffFile = { name: string; added: number; removed: number; lines: DiffLine[] }
  type StateRow = { label: string; value: string; color?: string }
  type PanelData = {
    spec: { title: string; points: string[] } | null
    state: StateRow[] | null
    files: DiffFile[]
  }

  const panelData: Record<string, PanelData> = {
    coding: {
      spec: {
        title: 'Fix auth null-token bug',
        points: [
          'Replace null check with empty string guard',
          'Return structured { valid, reason } error object',
          'Update validateSession() unit tests',
          'Open PR against main branch',
        ],
      },
      state: [
        { label: 'Status', value: 'Completed', color: '#4ade80' },
        { label: 'Agent', value: '@codex' },
        { label: 'Files changed', value: '2' },
        { label: 'Lines added', value: '+5', color: '#4ade80' },
        { label: 'Lines removed', value: '-3', color: '#f87171' },
        { label: 'PR', value: '#47 fix/auth-null-token', color: '#818cf8' },
      ],
      files: [
        {
          name: 'src/auth.ts', added: 4, removed: 2,
          lines: [
            { type: 'ctx', code: 'export function validateSession(token: string) {' },
            { type: 'del', code: '  if (token === null) {' },
            { type: 'del', code: '    return false;' },
            { type: 'add', code: '  if (!token || token.trim() === \'\') {' },
            { type: 'add', code: '    return { valid: false, reason: \'missing_token\' };' },
            { type: 'ctx', code: '  }' },
            { type: 'ctx', code: '  return verifyJWT(token);' },
            { type: 'ctx', code: '}' },
          ],
        },
        {
          name: 'src/auth.test.ts', added: 1, removed: 1,
          lines: [
            { type: 'ctx', code: 'describe(\'validateSession\', () => {' },
            { type: 'del', code: '  it(\'returns false for null\', () => {' },
            { type: 'add', code: '  it(\'returns false for missing token\', () => {' },
            { type: 'ctx', code: '    expect(validateSession(null)).toBe(false);' },
            { type: 'ctx', code: '  });' },
            { type: 'ctx', code: '});' },
          ],
        },
      ],
    },
    browser: {
      spec: {
        title: 'Browser agent tasks',
        points: [
          'Play "Blinding Lights" by The Weeknd on Spotify',
          'Find cheapest NYC → Paris round-trip flights',
          'Compare results across Google Flights & Kayak',
          'Return best deal with booking link',
        ],
      },
      state: [
        { label: 'Status', value: 'Completed', color: '#4ade80' },
        { label: 'Agent', value: '/browser' },
        { label: 'Spotify', value: 'Now playing ♫', color: '#1db954' },
        { label: 'Best flight', value: 'Air France $389', color: '#4ade80' },
        { label: 'Departure', value: 'Fri 22:10 JFK → CDG' },
        { label: 'Return', value: 'Sun 18:40 CDG → JFK' },
      ],
      files: [],
    },
    research: {
      spec: {
        title: 'Byzantine Empire — fall research',
        points: [
          'Key causes of the fall (economic, military, political)',
          'Timeline from 1204 Crusader sack to 1453 siege',
          'Modern historical consensus across scholars',
          'Academic papers via @exa (Gibbon, Norwich, Ostrogorsky)',
          'Web synthesis via @perplexity',
        ],
      },
      state: [
        { label: 'Status', value: 'Completed', color: '#4ade80' },
        { label: 'Agents', value: '@perplexity + @exa' },
        { label: 'Web sources', value: '8' },
        { label: 'Academic papers', value: '12' },
        { label: 'Key themes', value: '3 identified' },
        { label: 'Output', value: 'research/byzantine.md', color: '#a78bfa' },
      ],
      files: [
        {
          name: 'research/byzantine.md', added: 9, removed: 0,
          lines: [
            { type: 'add', code: '# Fall of the Byzantine Empire' },
            { type: 'add', code: '' },
            { type: 'add', code: '## Key Causes' },
            { type: 'add', code: '- Economic exhaustion & trade loss' },
            { type: 'add', code: '- Territorial erosion (Crusades + Turks)' },
            { type: 'add', code: '- Succession crises & civil wars' },
            { type: 'add', code: '' },
            { type: 'add', code: '## Final Event' },
            { type: 'add', code: '1453 — Ottoman siege under Mehmed II' },
          ],
        },
      ],
    },
    general: {
      spec: null,
      state: null,
      files: [],
    },
  }

  return (
    <div style={{ background: '#0a0a0a', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden', fontFamily: font }}>

      {/* macOS title bar */}
      <div style={{ height: 40, background: '#111', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', padding: '0 14px' }}>
        <div style={{ display: 'flex', gap: 6, marginRight: 14 }}>
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f57' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#febc2e' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#28c840' }} />
        </div>
        <span style={{ color: '#555', fontSize: 12.5, margin: '0 auto' }}>openbot.one</span>
      </div>

      {/* Body */}
      <div style={{ display: 'flex', height: 660 }}>

        {/* Sidebar — OpenBot style */}
        <div style={{ width: showLeft ? 240 : 0, overflow: 'hidden', transition: 'width 0.25s ease', background: '#0a0a0a', borderRight: showLeft ? '1px solid rgba(255,255,255,0.07)' : 'none', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>

          {/* Top: workspace */}
          <div style={{ height: 46, padding: '0 14px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: 9 }}>
            <img src={openbotLogo} alt="" style={{ width: 22, height: 22 }} />
            <span style={{ color: '#e0e0e0', fontSize: 13.5, fontWeight: 500 }}>GeorgeTribee</span>
            <svg width="11" height="11" fill="none" stroke="#555" strokeWidth="2.2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6"/></svg>
            <button style={{ ...iconBtn, marginLeft: 'auto' }}>
              <svg width="15" height="15" fill="none" stroke="#666" strokeWidth="1.8" viewBox="0 0 24 24">
                <line x1="3" y1="7" x2="21" y2="7" strokeLinecap="round"/>
                <circle cx="8" cy="7" r="2.5" fill="#0a0a0a" stroke="#666" strokeWidth="1.8"/>
                <line x1="3" y1="17" x2="21" y2="17" strokeLinecap="round"/>
                <circle cx="16" cy="17" r="2.5" fill="#0a0a0a" stroke="#666" strokeWidth="1.8"/>
              </svg>
            </button>
          </div>
          {/* Channels */}
          <div style={{ flex: 1, padding: '10px 8px', overflowY: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 6px', marginBottom: 6 }}>
              <span style={{ fontSize: 10.5, color: '#3a3a3a', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600 }}>Channels</span>
              <button style={{ ...iconBtn, color: '#3a3a3a', fontSize: 16, lineHeight: 1 }}>+</button>
            </div>
            {['general', 'research', 'coding', 'browser'].map(ch => (
              <button key={ch} onClick={() => setActiveThread(ch)}
                style={{ display: 'flex', alignItems: 'center', gap: 7, width: '100%', textAlign: 'left', padding: '5px 8px', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 13,
                  color: activeThread === ch ? '#fff' : '#555',
                  background: activeThread === ch ? 'rgba(255,255,255,0.09)' : 'none',
                }}>
                <span style={{ color: activeThread === ch ? '#888' : '#3a3a3a' }}>#</span>{ch}
              </button>
            ))}
          </div>
          {/* User row */}
          <div style={{ padding: '10px 12px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: 9 }}>
            <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <img src={openbotLogo} alt="" style={{ width: 14, height: 14 }} />
            </div>
            <span style={{ color: '#888', fontSize: 12.5, flex: 1 }}>Giorgi Daraselia</span>
            <svg width="11" height="11" fill="none" stroke="#444" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6"/></svg>
          </div>
        </div>

        {/* Chat column */}
        <div style={{ flex: 1, background: '#080808', display: 'flex', flexDirection: 'column', borderRight: '1px solid rgba(255,255,255,0.06)', minWidth: 0 }}>
          {/* Channel sub-header */}
          <div style={{ height: 38, borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', padding: '0 12px', flexShrink: 0 }}>
            <button style={iconBtn} onClick={() => setShowLeft(v => !v)}>
              <svg width="14" height="14" fill="none" stroke={showLeft ? '#aaa' : '#555'} strokeWidth="1.7" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/></svg>
            </button>
            <div style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.1)', margin: '0 10px' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ color: '#666', fontSize: 14 }}>#</span>
              <span style={{ color: '#bbb', fontSize: 13 }}>{activeThread}</span>
            </div>
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4 }}>
              <button style={iconBtn}>
                <svg width="14" height="14" fill="none" stroke="#555" strokeWidth="1.8" viewBox="0 0 24 24"><circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/></svg>
              </button>
              <div style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.1)', margin: '0 6px' }} />
              <button style={iconBtn} onClick={() => setShowRight(v => !v)}>
                <svg width="14" height="14" fill="none" stroke={showRight ? '#aaa' : '#555'} strokeWidth="1.7" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="18" rx="2"/><line x1="15" y1="3" x2="15" y2="21"/></svg>
              </button>
            </div>
          </div>
          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '22px 28px 10px' }}>

            {/* ── coding ── */}
            {activeThread === 'coding' && <>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 18 }}>
                <div style={{ background: '#1e1e1e', borderRadius: 14, padding: '10px 14px', maxWidth: '80%', color: '#ddd', fontSize: 12.5, lineHeight: 1.55 }}>
                  <span style={{ color: '#818cf8', fontWeight: 500 }}>@codex</span> fix the auth bug in auth.ts,{' '}
                  <span style={{ color: '#34d399', fontWeight: 500 }}>@browser</span> find the error logs, then{' '}
                  <span style={{ color: '#e2e8f0', fontWeight: 500 }}>@github</span> open a PR
                </div>
              </div>
              <div style={{ fontSize: 12.5, lineHeight: 1.7, color: '#bbb' }}>
                <p style={{ marginBottom: 12 }}>I'll inspect the auth module, trace the bug from error logs, apply the fix, and open a pull request.</p>
                <div style={{ marginBottom: 5 }}><span style={{ color: '#777', fontWeight: 600 }}>Thought</span><span style={{ color: '#444' }}> 5s</span></div>
                <div style={{ marginBottom: 8 }}><span style={{ color: '#777', fontWeight: 600 }}>Explored</span><span style={{ color: '#444' }}> 4 files</span></div>
                {[
                  { label: 'Read', file: 'auth.ts' },
                  { label: 'Edited', file: 'auth.ts' },
                  { label: 'Edited', file: 'auth.test.ts' },
                  { label: 'Opened PR', file: 'fix/auth-null-token #47' },
                ].map(({ label, file }, i) => (
                  <div key={i} style={{ background: '#131313', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 7, padding: '7px 12px', marginBottom: 6, display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12 }}>
                    <span><span style={{ color: '#999', fontWeight: 600 }}>{label}</span><span style={{ color: '#555' }}>  {file}</span></span>
                    <span style={{ color: '#444' }}>✓</span>
                  </div>
                ))}
                <p style={{ color: '#bbb', marginTop: 10, fontSize: 12.5 }}>
                  Fixed null token check in <code style={{ background: '#1a1a1a', padding: '1px 5px', borderRadius: 3, fontSize: 11.5, color: '#a5b4fc', fontFamily: mono }}>validateSession()</code> — missing early return when token header absent. PR #47 open for review.
                </p>
              </div>
            </>}

            {/* ── browser ── */}
            {activeThread === 'browser' && <>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 18 }}>
                <div style={{ background: '#1e1e1e', borderRadius: 14, padding: '10px 14px', maxWidth: '80%', color: '#ddd', fontSize: 12.5, lineHeight: 1.55 }}>
                  <span style={{ color: '#34d399', fontWeight: 500 }}>/browser</span> play "Blinding Lights" by The Weeknd on Spotify
                </div>
              </div>
              <div style={{ fontSize: 12.5, lineHeight: 1.7, color: '#bbb', marginBottom: 22 }}>
                <p style={{ marginBottom: 10 }}>Opening Spotify and searching for the track…</p>
                {[
                  { label: 'Navigated', file: 'open.spotify.com' },
                  { label: 'Searched', file: '"Blinding Lights" — The Weeknd' },
                  { label: 'Clicked', file: 'Play button' },
                ].map(({ label, file }, i) => (
                  <div key={i} style={{ background: '#131313', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 7, padding: '7px 12px', marginBottom: 6, display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12 }}>
                    <span><span style={{ color: '#999', fontWeight: 600 }}>{label}</span><span style={{ color: '#555' }}>  {file}</span></span>
                    <span style={{ color: '#444' }}>✓</span>
                  </div>
                ))}
                <p style={{ color: '#bbb', marginTop: 8, fontSize: 12.5 }}>Playing now on Spotify. Enjoy!</p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 18 }}>
                <div style={{ background: '#1e1e1e', borderRadius: 14, padding: '10px 14px', maxWidth: '80%', color: '#ddd', fontSize: 12.5, lineHeight: 1.55 }}>
                  <span style={{ color: '#34d399', fontWeight: 500 }}>/browser</span> find cheapest flights from NYC to Paris for next weekend, round trip
                </div>
              </div>
              <div style={{ fontSize: 12.5, lineHeight: 1.7, color: '#bbb' }}>
                <p style={{ marginBottom: 10 }}>Searching Google Flights and Kayak for the best fares…</p>
                {[
                  { label: 'Navigated', file: 'flights.google.com' },
                  { label: 'Searched', file: 'NYC → CDG, May 10–12' },
                  { label: 'Navigated', file: 'kayak.com' },
                  { label: 'Compared', file: '14 results across 6 airlines' },
                ].map(({ label, file }, i) => (
                  <div key={i} style={{ background: '#131313', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 7, padding: '7px 12px', marginBottom: 6, display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12 }}>
                    <span><span style={{ color: '#999', fontWeight: 600 }}>{label}</span><span style={{ color: '#555' }}>  {file}</span></span>
                    <span style={{ color: '#444' }}>✓</span>
                  </div>
                ))}
                <p style={{ color: '#bbb', marginTop: 8, fontSize: 12.5 }}>
                  Best deal: <code style={{ background: '#1a1a1a', padding: '1px 5px', borderRadius: 3, fontSize: 11.5, color: '#4ade80', fontFamily: mono }}>Air France $389</code> depart Fri 22:10, return Sun 18:40. Link copied to clipboard.
                </p>
              </div>
            </>}

            {/* ── research ── */}
            {activeThread === 'research' && <>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 18 }}>
                <div style={{ background: '#1e1e1e', borderRadius: 14, padding: '10px 14px', maxWidth: '80%', color: '#ddd', fontSize: 12.5, lineHeight: 1.55 }}>
                  <span style={{ color: '#f59e0b', fontWeight: 500 }}>@perplexity</span> <span style={{ color: '#a78bfa', fontWeight: 500 }}>@exa</span> research the fall of the Byzantine Empire — key causes, timeline, and modern historical consensus
                </div>
              </div>
              <div style={{ fontSize: 12.5, lineHeight: 1.7, color: '#bbb' }}>
                <p style={{ marginBottom: 10 }}>Running parallel searches across academic sources and the live web…</p>
                <div style={{ marginBottom: 8 }}><span style={{ color: '#f59e0b', fontWeight: 600 }}>@perplexity</span><span style={{ color: '#444' }}> — web synthesis</span></div>
                {[
                  { label: 'Queried', file: 'Fall of Byzantine Empire causes' },
                  { label: 'Queried', file: 'Ottoman siege of Constantinople 1453' },
                  { label: 'Summarised', file: '8 sources → 3 key themes' },
                ].map(({ label, file }, i) => (
                  <div key={i} style={{ background: '#131313', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 7, padding: '7px 12px', marginBottom: 6, display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12 }}>
                    <span><span style={{ color: '#999', fontWeight: 600 }}>{label}</span><span style={{ color: '#555' }}>  {file}</span></span>
                    <span style={{ color: '#444' }}>✓</span>
                  </div>
                ))}
                <div style={{ margin: '14px 0 8px' }}><span style={{ color: '#a78bfa', fontWeight: 600 }}>@exa</span><span style={{ color: '#444' }}> — academic deep-dive</span></div>
                {[
                  { label: 'Found', file: '12 peer-reviewed papers' },
                  { label: 'Extracted', file: 'Gibbon, Norwich, Ostrogorsky' },
                  { label: 'Ranked', file: 'by citation count' },
                ].map(({ label, file }, i) => (
                  <div key={i} style={{ background: '#131313', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 7, padding: '7px 12px', marginBottom: 6, display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12 }}>
                    <span><span style={{ color: '#999', fontWeight: 600 }}>{label}</span><span style={{ color: '#555' }}>  {file}</span></span>
                    <span style={{ color: '#444' }}>✓</span>
                  </div>
                ))}
                <p style={{ color: '#bbb', marginTop: 10, fontSize: 12.5 }}>
                  Three consensus causes: economic exhaustion, territorial losses to Crusaders &amp; Turks, and internal succession crises. The 1453 Ottoman conquest under Mehmed II was the final blow. Full report saved to <code style={{ background: '#1a1a1a', padding: '1px 5px', borderRadius: 3, fontSize: 11.5, color: '#a78bfa', fontFamily: mono }}>research/byzantine.md</code>.
                </p>
              </div>
            </>}

            {/* ── general ── */}
            {activeThread === 'general' && <>
              <div style={{ display: 'flex', gap: 9, marginBottom: 16, alignItems: 'flex-start' }}>
                <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <img src={openbotLogo} alt="" style={{ width: 14, height: 14 }} />
                </div>
                <div>
                  <span style={{ color: '#666', fontSize: 11, display: 'block', marginBottom: 4 }}>OpenBot <span style={{ color: '#333' }}>9:12 AM</span></span>
                  <div style={{ color: '#bbb', fontSize: 12.5, lineHeight: 1.6 }}>Good morning! Ready when you are. What's on the agenda today?</div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
                <div style={{ background: '#1e1e1e', borderRadius: 14, padding: '10px 14px', maxWidth: '75%', color: '#ddd', fontSize: 12.5, lineHeight: 1.55 }}>
                  Morning! What's the weather in Tbilisi today?
                </div>
              </div>
              <div style={{ display: 'flex', gap: 9, marginBottom: 20, alignItems: 'flex-start' }}>
                <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <img src={openbotLogo} alt="" style={{ width: 14, height: 14 }} />
                </div>
                <div>
                  <span style={{ color: '#666', fontSize: 11, display: 'block', marginBottom: 4 }}>OpenBot <span style={{ color: '#333' }}>9:12 AM</span></span>
                  <div style={{ color: '#bbb', fontSize: 12.5, lineHeight: 1.6 }}>
                    Right now in Tbilisi: <span style={{ color: '#fbbf24' }}>☀ 22°C, mostly sunny.</span> Light wind, low humidity. Great day to be outside!
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
                <div style={{ background: '#1e1e1e', borderRadius: 14, padding: '10px 14px', maxWidth: '75%', color: '#ddd', fontSize: 12.5, lineHeight: 1.55 }}>
                  Nice! I have a team meeting at 3pm and then I want to work on the landing page redesign later.
                </div>
              </div>
              <div style={{ display: 'flex', gap: 9, alignItems: 'flex-start' }}>
                <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <img src={openbotLogo} alt="" style={{ width: 14, height: 14 }} />
                </div>
                <div>
                  <span style={{ color: '#666', fontSize: 11, display: 'block', marginBottom: 4 }}>OpenBot <span style={{ color: '#333' }}>9:13 AM</span></span>
                  <div style={{ color: '#bbb', fontSize: 12.5, lineHeight: 1.6 }}>
                    Got it — I'll remind you at 2:50 PM for the meeting. After that, want me to pull up your latest mockup branch so you can jump straight into the redesign?
                  </div>
                </div>
              </div>
            </>}

          </div>
          {/* Input */}
          <div style={{ padding: '10px 16px 16px', flexShrink: 0 }}>
            <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 10, padding: '11px 14px' }}>
              <input value={inputText} onChange={e => setInputText(e.target.value)}
                placeholder={
                  activeThread === 'browser' ? 'Start with /browser to browse the web…' :
                  activeThread === 'research' ? 'Tag @perplexity or @exa to research…' :
                  activeThread === 'general' ? 'Chat with OpenBot…' :
                  'Type a message, or start with @ to choose an agent..'
                }
                className="placeholder-zinc-700"
                style={{ width: '100%', background: 'none', border: 'none', outline: 'none', color: '#fff', fontSize: 13 }}
              />
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
                <button style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(255,255,255,0.05)', border: 'none', borderRadius: 5, padding: '4px 10px', color: '#555', fontSize: 11.5, cursor: 'pointer' }}>
                  @ <span style={{ color: '#666' }}>Default Agent</span> <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6"/></svg>
                </button>
                <button style={{ width: 28, height: 28, borderRadius: '50%', background: '#fff', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="12" height="12" fill="none" stroke="#000" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5M5 12l7-7 7 7"/></svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div style={{ width: showRight ? 340 : 0, overflow: 'hidden', transition: 'width 0.25s ease', background: '#0a0a0a', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
          {/* Tabs */}
          <div style={{ height: 38, borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', padding: '0 10px', gap: 2, flexShrink: 0 }}>
            {(['Specification', 'State', 'Files'] as const).map(tab => (
              <button key={tab} onClick={() => setActiveRightTab(tab)} style={{ fontSize: 12.5, padding: '4px 10px', borderRadius: 7, border: 'none', cursor: 'pointer', background: 'none',
                color: activeRightTab === tab ? '#fff' : '#555',
                fontWeight: activeRightTab === tab ? 600 : 400,
              }}>{tab}</button>
            ))}
          </div>

          {/* Scrollable body */}
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {(() => {
              const panel = panelData[activeThread] ?? panelData['general']

              /* ── Specification ── */
              if (activeRightTab === 'Specification') {
                if (!panel.spec) return (
                  <div style={{ padding: '28px 18px', color: '#333', fontSize: 12.5, textAlign: 'center' }}>No specification for this channel.</div>
                )
                return (
                  <div style={{ padding: '16px 16px' }}>
                    <div style={{ color: '#ccc', fontSize: 13, fontWeight: 600, marginBottom: 12 }}>{panel.spec.title}</div>
                    {panel.spec.points.map((pt, i) => (
                      <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'flex-start' }}>
                        <span style={{ color: '#444', fontSize: 12, marginTop: 1, flexShrink: 0 }}>•</span>
                        <span style={{ color: '#888', fontSize: 12.5, lineHeight: 1.55 }}>{pt}</span>
                      </div>
                    ))}
                  </div>
                )
              }

              /* ── State ── */
              if (activeRightTab === 'State') {
                if (!panel.state) return (
                  <div style={{ padding: '28px 18px', color: '#333', fontSize: 12.5, textAlign: 'center' }}>No state to display.</div>
                )
                return (
                  <div style={{ padding: '12px 0' }}>
                    {panel.state.map((row, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '7px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                        <span style={{ color: '#555', fontSize: 12 }}>{row.label}</span>
                        <span style={{ color: row.color ?? '#888', fontSize: 12, fontFamily: row.color ? mono : 'inherit', fontWeight: row.color ? 500 : 400 }}>{row.value}</span>
                      </div>
                    ))}
                  </div>
                )
              }

              /* ── Files ── */
              if (panel.files.length === 0) return (
                <div style={{ padding: '28px 18px', color: '#333', fontSize: 12.5, textAlign: 'center' }}>No file changes.</div>
              )
              const totalAdded = panel.files.reduce((s, f) => s + f.added, 0)
              const totalRemoved = panel.files.reduce((s, f) => s + f.removed, 0)
              return (
                <>
                  <div style={{ padding: '10px 14px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
                    <span style={{ color: '#aaa', fontSize: 12.5, fontWeight: 500 }}>
                      {panel.files.length} file{panel.files.length > 1 ? 's' : ''} changed{' '}
                      <span style={{ color: '#4ade80' }}>+{totalAdded}</span>{' '}
                      <span style={{ color: '#f87171' }}>-{totalRemoved}</span>
                    </span>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button style={{ ...iconBtn, color: '#555', fontSize: 14 }}>×</button>
                      <button style={{ ...iconBtn, color: '#555', fontSize: 14 }}>✓</button>
                    </div>
                  </div>
                  {panel.files.map((file: DiffFile, fi: number) => (
                    <div key={fi} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <div style={{ padding: '8px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#0e0e0e' }}>
                        <span style={{ color: '#888', fontSize: 12, fontFamily: mono, fontWeight: 600 }}>
                          {file.name}{' '}
                          <span style={{ color: '#4ade80', fontWeight: 400 }}>+{file.added}</span>{' '}
                          <span style={{ color: '#f87171', fontWeight: 400 }}>-{file.removed}</span>
                        </span>
                        <div style={{ display: 'flex', gap: 8 }}>
                          <button style={{ ...iconBtn, color: '#555', fontSize: 13 }}>×</button>
                          <button style={{ ...iconBtn, color: '#555', fontSize: 13 }}>✓</button>
                        </div>
                      </div>
                      <div style={{ padding: '6px 0' }}>
                        {file.lines.map((line: DiffLine, li: number) => (
                          <div key={li} style={{ display: 'flex', alignItems: 'flex-start',
                            background: line.type === 'del' ? 'rgba(248,113,113,0.08)' : line.type === 'add' ? 'rgba(74,222,128,0.08)' : 'transparent',
                            padding: '1px 14px',
                          }}>
                            <span style={{ color: line.type === 'del' ? '#f87171' : line.type === 'add' ? '#4ade80' : '#3a3a3a', fontSize: 12, fontFamily: mono, marginRight: 8, flexShrink: 0, userSelect: 'none' }}>
                              {line.type === 'del' ? '−' : line.type === 'add' ? '+' : ' '}
                            </span>
                            <span style={{ color: line.type === 'del' ? '#fca5a5' : line.type === 'add' ? '#86efac' : '#666', fontSize: 11.5, fontFamily: mono, whiteSpace: 'pre', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {line.code}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </>
              )
            })()}
          </div>
        </div>

      </div>
    </div>
  )
}

const OPENAI_SVG = `M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.843-3.372 2.02-1.164a.08.08 0 0 1 .071 0l4.83 2.786a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.402-.677zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z`

const SLACK_SVG = `M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z`

function TrustedBySection() {
  const companies: { name: string; slug?: string; svgPath?: string; textOnly?: boolean }[] = [
    { name: 'Miro',      slug: 'miro' },
    { name: 'Google',    slug: 'google' },
    { name: 'OpenAI',    svgPath: OPENAI_SVG },
    { name: 'ANTHROP\\C', slug: 'anthropic' },
    { name: 'Slack',     svgPath: SLACK_SVG },
    { name: 'Vercel',    slug: 'vercel' },
    { name: 'GitHub',    slug: 'github' },
    { name: 'Notion',    slug: 'notion' },
    { name: 'Figma',     slug: 'figma' },
    { name: 'Linear',    slug: 'linear' },
    { name: 'Perplexity', slug: 'perplexity' },
    { name: 'Cisco',     slug: 'cisco' },
  ]

  const perPage = 6
  const totalPages = Math.ceil(companies.length / perPage)
  const [page, setPage] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setPage(p => (p + 1) % totalPages)
        setVisible(true)
      }, 350)
    }, 3000)
    return () => clearInterval(id)
  }, [totalPages])

  const current = companies.slice(page * perPage, (page + 1) * perPage)

  const logoStyle: React.CSSProperties = { width: 40, height: 40, filter: 'brightness(0) invert(1)', opacity: 0.85, flexShrink: 0 }

  const tvw = useWindowWidth()
  const tMobile = tvw < 640

  return (
    <section style={{ background: '#000', padding: tMobile ? '52px 0 60px' : '80px 0 88px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <p style={{ textAlign: 'center', color: '#3a3a3a', fontSize: 13, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: tMobile ? 36 : 56, fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif' }}>
        Available Official Agents
      </p>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: tMobile ? 28 : 64,
        opacity: visible ? 1 : 0, transition: 'opacity 0.35s ease',
        padding: tMobile ? '0 24px' : '0 60px',
      }}>
        {current.map(c => (
          <div key={c.name} style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
            {!c.textOnly && (c.svgPath ? (
              <svg viewBox="0 0 24 24" style={{ ...logoStyle, width: tMobile ? 28 : 40, height: tMobile ? 28 : 40 }} aria-hidden="true">
                <path d={c.svgPath} fill="white" />
              </svg>
            ) : (
              <img src={`https://cdn.simpleicons.org/${c.slug}`} alt={c.name} width={tMobile ? 28 : 40} height={tMobile ? 28 : 40} style={{ ...logoStyle, width: tMobile ? 28 : 40, height: tMobile ? 28 : 40 }} />
            ))}
            <span style={{
              color: '#ffffff',
              fontSize: c.textOnly ? (tMobile ? 16 : 22) : (tMobile ? 18 : 26),
              fontWeight: c.textOnly ? 700 : 500,
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", sans-serif',
              letterSpacing: c.textOnly ? '0.08em' : '0.01em',
              userSelect: 'none',
            }}>{c.name}</span>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 7, marginTop: 48 }}>
        {Array.from({ length: totalPages }).map((_, i) => (
          <div key={i} style={{ width: i === page ? 20 : 6, height: 6, borderRadius: 3, background: i === page ? '#555' : '#1e1e1e', transition: 'all 0.35s ease' }} />
        ))}
      </div>
    </section>
  )
}

function App() {
  const [showDocs, setShowDocs] = useState(() => parseHash().docs)
  const [showAgents, setShowAgents] = useState(() => window.location.hash === '#agents')
  const [docsInitialPage, setDocsInitialPage] = useState<string | undefined>(() => parseHash().page)
  const [scrolled, setScrolled] = useState(false)
  const windowWidth = useWindowWidth()

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
    <div className="min-h-screen bg-black text-white overflow-x-hidden">


      {/* Fixed navbar — appears on scroll */}
      <header role="banner" aria-label="Site navigation" style={{ backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', background: 'rgba(0,0,0,0.85)', borderBottom: '1px solid rgba(255,255,255,0.08)', transition: 'opacity 0.3s ease, transform 0.3s ease' }} className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
        <nav aria-label="Primary navigation" className="flex items-center justify-between px-8 md:px-12" style={{ height: 56 }}>
          <a href="/" aria-label="OpenBot home" className="flex items-center gap-2.5">
            <img src={openbotLogo} alt="" aria-hidden="true" width="20" height="20" className="w-5 h-5" />
            <span className="text-white" style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 500, fontSize: '15px' }}>OpenBot</span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            {([['Why OpenBot','why'],['What it can do','what-it-can-do']] as [string,string][]).map(([label, id]) => (
              <button key={id} onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })} className="text-zinc-400 hover:text-white transition-colors cursor-pointer" style={{ fontSize: '14px', background: 'none', border: 'none' }}>{label}</button>
            ))}
            <a href="#docs" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors" style={{ fontSize: '14px' }}>Docs</a>
            <a href="https://github.com/meetopenbot/openbot" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors" style={{ fontSize: '14px' }}>GitHub</a>
          </div>
          <a href="https://openbot.one" target="_blank" rel="noopener noreferrer" className="text-black text-sm font-medium rounded-full px-5 py-2 transition-colors bg-white hover:bg-zinc-200 inline-block">
            Login
          </a>
        </nav>
      </header>

      {/* Main content */}
      <main id="main-content" aria-label="Main content">

      {/* Hero Section */}
      <section className="relative flex flex-col items-center overflow-hidden" style={{ minHeight: '100vh' }}>
        {/* Cinematic black background */}
        <div className="absolute inset-0" style={{ background: '#000000', zIndex: 0 }} />
        {/* Bottom fade — seamless into dark sections */}
        <div className="absolute bottom-0 left-0 right-0 h-48" style={{ background: 'linear-gradient(to bottom, transparent, #000)', zIndex: 2 }} />

        {/* Horizontal Navbar */}
        <nav aria-label="Primary navigation" className="relative z-10 w-full flex items-center justify-between px-6 md:px-10 pt-6 pb-2">
          <a href="/" aria-label="OpenBot home" className="flex items-center gap-2.5">
            <img src={openbotLogo} alt="" aria-hidden="true" width="22" height="22" className="w-5 h-5" />
            <span className="text-white" style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 500, fontSize: '15px' }}>OpenBot</span>
          </a>
          <div className="hidden md:flex items-center gap-7">
            {([['Why OpenBot','why'],['What it can do','what-it-can-do']] as [string,string][]).map(([label, id]) => (
              <button key={id} onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })} className="text-white hover:text-zinc-300 transition-colors cursor-pointer" style={{ fontSize: '14px', background: 'none', border: 'none' }}>{label}</button>
            ))}
            <a href="#docs" target="_blank" rel="noopener noreferrer" className="text-white hover:text-zinc-300 transition-colors" style={{ fontSize: '14px' }}>Docs</a>
            <a href="https://github.com/meetopenbot/openbot" target="_blank" rel="noopener noreferrer" className="text-white hover:text-zinc-300 transition-colors" style={{ fontSize: '14px' }}>GitHub</a>
          </div>
          <a href="https://openbot.one" target="_blank" rel="noopener noreferrer" className="text-black text-sm font-medium rounded-full px-5 py-2 transition-colors bg-white hover:bg-zinc-200 inline-block">
            Login
          </a>
        </nav>

        {/* Center content */}
        <div className="relative z-10 flex flex-col items-center text-center px-6 mt-24 md:mt-32">
          {/* App icon */}
          <img src={openbotLogo} alt="OpenBot" width="60" height="60" className="w-15 h-15 mb-8" style={{ filter: 'none', boxShadow: 'none' }} />

          {/* Title */}
          <h1 className="text-white leading-none tracking-tight mb-5" style={{ fontSize: 'clamp(34px, 7vw, 49px)', fontFamily: "'Raleway', sans-serif", fontWeight: 500, textShadow: 'none', filter: 'none' }}>
            OpenBot
          </h1>

          {/* Subtitle */}
          <p className="text-white max-w-lg mb-9 leading-relaxed mt-4" style={{ fontSize: 'clamp(14px, 3vw, 16px)', textShadow: 'none', filter: 'none' }}>
            The OS for AI Agents — The Last Tool You'll Ever Need.
          </p>

          {/* CTA */}
          <a
            href="https://openbot.one"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black text-sm font-medium rounded-full px-8 py-3.5 bg-white hover:bg-zinc-200 transition-colors inline-flex items-center gap-2 mb-14"
          >
            Get Started
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
          </a>
        </div>

        {/* App mockup preview */}
        {(() => {
          const scale = Math.min(1, (windowWidth - 32) / 1100)
          return (
            <div className="relative z-10" style={{ width: '100%', overflow: 'hidden', display: 'flex', justifyContent: 'center' }}>
              <div style={{
                width: 1100,
                flexShrink: 0,
                transformOrigin: 'top center',
                transform: scale < 1 ? `scale(${scale})` : 'none',
                marginBottom: scale < 1 ? `${(scale - 1) * 700}px` : 0,
              }}>
                <AppMockup />
              </div>
            </div>
          )
        })()}
      </section>

      <TrustedBySection />

      <WhySection />

      <CanDoSection onShowAgents={() => { window.location.hash = '#agents'; setShowAgents(true) }} />

      {/* Use Cases Section */}
      <section id="use-cases" className="container mx-auto px-6 py-12 md:py-20">
        <div className="max-w-6xl mx-auto">

        {/* Works With Everything */}
        <div id="works-with" className="mt-10 md:mt-24">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What can it work on?</h2>
            <p className="text-base md:text-xl text-zinc-400">It can work on everything.</p>
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
            const maskStyle = { maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)', overflow: 'hidden' }
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

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mt-10">
            <button onClick={() => { window.location.hash = '#agents'; setShowAgents(true) }} className="text-white hover:text-zinc-300 text-sm transition-colors cursor-pointer text-center">
              View all Agents & Plugins →
            </button>
            <span className="hidden sm:inline text-zinc-700">·</span>
            <button onClick={() => window.open('#docs/extending', '_blank')} className="text-white hover:text-zinc-300 text-sm transition-colors cursor-pointer text-center">
              Build your own agents →
            </button>
          </div>
        </div>

        </div>
      </section>


      <UseCasesSection />

      <TestimonialsSection />

      {/* <PricingSection /> */}

      {/* Get Started / CTA Section */}
      <section id="get-started" className="container mx-auto px-6 py-12 md:py-20">
        <div className="max-w-4xl mx-auto border border-zinc-800 bg-zinc-950/50 backdrop-blur-sm rounded-3xl p-6 sm:p-10 md:p-16 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Get Started in Minutes.
          </h2>
          <p className="text-base md:text-xl mb-8 text-zinc-300">
            Login, add your API key, and start automating — free to try, no credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://openbot.one" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-white text-black hover:bg-zinc-200 rounded-full px-8">
                Login
              </Button>
            </a>
          </div>
          <p className="text-sm text-zinc-400 mt-6">
            Login → Add API key → Done
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#050505', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        {/* Top gradient line */}
        <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.15) 30%, rgba(255,255,255,0.15) 60%, transparent)', marginBottom: '-1px' }} />

        <div className="container mx-auto px-6 pt-10 md:pt-16 pb-10">
          {/* Main grid */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-6 md:gap-10 mb-10 md:mb-14">

            {/* Brand column */}
            <div className="md:col-span-2 flex flex-col gap-5">
              <div className="flex items-center gap-2.5">
                <img src={openbotLogo} alt="OpenBot" className="w-7 h-7" />
                <span className="text-xl font-medium" style={{ fontFamily: "'Raleway', sans-serif" }}>OpenBot</span>
              </div>
              <p className="text-zinc-500 text-sm leading-relaxed max-w-xs">
                AI agent platform that takes real action — messaging, coding, browsing, and more.
              </p>
              {/* Social icons */}
              <div className="flex gap-3 mt-1">
                <a href="https://github.com/meetopenbot/openbot" target="_blank" rel="noopener noreferrer"
                  aria-label="OpenBot on GitHub"
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all"
                  style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)', e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)', e.currentTarget.style.background = 'rgba(255,255,255,0.03)')}
                >
                  <svg aria-hidden="true" className="w-4 h-4 text-zinc-400" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="https://discord.gg/XYYXvN2ebB" target="_blank" rel="noopener noreferrer"
                  aria-label="OpenBot on Discord"
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all"
                  style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)', e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)', e.currentTarget.style.background = 'rgba(255,255,255,0.03)')}
                >
                  <SiDiscord aria-hidden="true" size={15} className="text-zinc-400" />
                </a>
                <a href="https://x.com/MeetOpenBot" target="_blank" rel="noopener noreferrer"
                  aria-label="OpenBot on X (Twitter)"
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all"
                  style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)', e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)', e.currentTarget.style.background = 'rgba(255,255,255,0.03)')}
                >
                  <svg aria-hidden="true" className="w-4 h-4 text-zinc-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a href="https://www.linkedin.com/company/meetopenbot" target="_blank" rel="noopener noreferrer"
                  aria-label="OpenBot on LinkedIn"
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all"
                  style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)', e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)', e.currentTarget.style.background = 'rgba(255,255,255,0.03)')}
                >
                  <SiLinkedin aria-hidden="true" size={15} className="text-zinc-400" />
                </a>
                <a href="https://www.youtube.com/@meetopenbot" target="_blank" rel="noopener noreferrer"
                  aria-label="OpenBot on YouTube"
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all"
                  style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)', e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)', e.currentTarget.style.background = 'rgba(255,255,255,0.03)')}
                >
                  <SiYoutube aria-hidden="true" size={15} className="text-zinc-400" />
                </a>
              </div>
            </div>

            {/* Product column */}
            <div className="flex flex-col gap-4">
              <p className="text-xs font-semibold tracking-widest text-zinc-600 uppercase">Product</p>
              {[
                { label: 'Why OpenBot', onClick: () => document.getElementById('why')?.scrollIntoView({ behavior: 'smooth' }) },
                { label: 'What It Can Do', onClick: () => document.getElementById('what-it-can-do')?.scrollIntoView({ behavior: 'smooth' }) },
                { label: 'Agents & Plugins', onClick: () => { window.location.hash = '#agents' } },
              ].map(({ label, onClick }) => (
                <button key={label} onClick={onClick} className="text-left text-sm text-zinc-500 hover:text-white transition-colors cursor-pointer">{label}</button>
              ))}
            </div>

            {/* Developers column */}
            <div className="flex flex-col gap-4">
              <p className="text-xs font-semibold tracking-widest text-zinc-600 uppercase">Developers</p>
              {[
                { label: 'Documentation', href: '#docs' },
                { label: 'Quick Start', href: '#docs/introduction' },
                { label: 'Build Agents', href: '#docs/extending' },
                { label: 'GitHub', href: 'https://github.com/meetopenbot/openbot' },
              ].map(({ label, href }) => (
                <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="text-sm text-zinc-500 hover:text-white transition-colors">{label}</a>
              ))}
            </div>

            {/* Community column */}
            <div className="flex flex-col gap-4">
              <p className="text-xs font-semibold tracking-widest text-zinc-600 uppercase">Community</p>
              {[
                { label: 'Discord', href: 'https://discord.gg/XYYXvN2ebB' },
                { label: 'X / Twitter', href: 'https://x.com/MeetOpenBot' },
                { label: 'GitHub Issues', href: 'https://github.com/meetopenbot/openbot/issues' },
                { label: 'Contributing', href: 'https://github.com/meetopenbot/openbot/blob/main/CONTRIBUTING.md' },
              ].map(({ label, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className="text-sm text-zinc-500 hover:text-white transition-colors">{label}</a>
              ))}
            </div>

            {/* Company column */}
            <div className="flex flex-col gap-4">
              <p className="text-xs font-semibold tracking-widest text-zinc-600 uppercase">Company</p>
              {[
                { label: 'About Us', href: '/about' },
                { label: 'Our Charter', href: '/charter' },
                { label: 'Foundation', href: '/foundation' },
                { label: 'Careers', href: '/careers' },
                { label: 'Brand', href: '/brand' },
              ].map(({ label, href }) => (
                href.startsWith('/') ? (
                  <button key={label} onClick={() => { window.history.pushState({}, '', href); window.dispatchEvent(new PopStateEvent('popstate')) }} className="text-left text-sm text-zinc-500 hover:text-white transition-colors cursor-pointer">{label}</button>
                ) : (
                  <a key={label} href={href} className="text-sm text-zinc-500 hover:text-white transition-colors">{label}</a>
                )
              ))}
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', marginBottom: '24px' }} />

          {/* Bottom bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-zinc-600 text-xs">
              © {new Date().getFullYear()} OpenBot. All rights reserved.
            </p>
            <div className="flex items-center gap-5">
              <button onClick={() => { window.history.pushState({}, '', '/terms'); window.dispatchEvent(new PopStateEvent('popstate')) }} className="text-zinc-600 hover:text-zinc-400 text-xs transition-colors cursor-pointer">Terms of Service</button>
              <button onClick={() => { window.history.pushState({}, '', '/privacy'); window.dispatchEvent(new PopStateEvent('popstate')) }} className="text-zinc-600 hover:text-zinc-400 text-xs transition-colors cursor-pointer">Privacy Policy</button>
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
